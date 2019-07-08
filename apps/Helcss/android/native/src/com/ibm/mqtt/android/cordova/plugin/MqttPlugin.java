/*
============================================================================ 
Licensed Materials - Property of IBM

5747-SM3
 
(C) Copyright IBM Corp. 1999, 2013 All Rights Reserved.
 
US Government Users Restricted Rights - Use, duplication or
disclosure restricted by GSA ADP Schedule Contract with
IBM Corp.
============================================================================
 */
package com.ibm.mqtt.android.cordova.plugin;

import java.io.InputStream;
import java.util.HashMap;

import javax.net.ssl.SSLSocketFactory;

import org.apache.cordova.CallbackContext;
//import org.apache.cordova.api.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.android.service.MqttTraceHandler;
import org.eclipse.paho.android.service.ParcelableMqttMessage;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;
/**
 * Cordova plugin to support MQTT usage on Android
 * 
 */
public class MqttPlugin extends CordovaPlugin implements MqttTraceHandler {

	// Identifier for use in log messages, etc.
	private static final String TAG = "MqttPlugin";

	// Actions sent by the JavaScript code
	private static final String SEND_ACTION = "send";
	private static final String ACKNOWLEDGE_RECEIPT_ACTION = "acknowledgeReceipt";
	private static final String UNSUBSCRIBE_ACTION = "unsubscribe";
	private static final String SUBSCRIBE_ACTION = "subscribe";
	private static final String DISCONNECT_ACTION = "disconnect";
	private static final String CONNECT_ACTION = "connect";
	private static final String GET_CLIENT_ACTION = "getClient";
	private static final String SET_ON_CONNECTIONLOST_CALLBACK = "setOnConnectionLostCallback";
	private static final String SET_ON_MESSAGE_ARRIVED_CALLBACK = "setOnMessageArrivedCallback";
	private static final String SET_ON_MESSAGE_DELIVERED_CALLBACK = "setOnMessageDeliveredCallback";
	private static final String SET_TRACE_CALLBACK = "setTraceCallback";
	private static final String SET_TRACE_ENABLED = "setTraceEnabled";
	private static final String SET_TRACE_DISABLED = "setTraceDisabled";

	// Attribute names in JSONObjects used by the JavaScript code
	private static final String DUPLICATE = "duplicate";
	private static final String RETAINED = "retained";
	private static final String QOS = "qos";
	private static final String PAYLOAD = "payload";
	private static final String DESTINATION_NAME = "destinationName";
	private static final String MESSAGE_ID = "messageId";
	
	// Error messages
	private static final String ERROR_HANDLE = "Invalid clientHandle";
	private static final String ERROR_ACK    = "Unable to acknowledge message";
	private static final int generalError = -1;
    
	// Hashmaps of objects used by the plugin
	private HashMap<String/* clientHandle */, MqttAndroidClient> clientMap = new HashMap<String, MqttAndroidClient>();
	private HashMap<String/* clientHandle */, ClientCallbackHandler> handlerMap = new HashMap<String, ClientCallbackHandler>();
	private HashMap<IMqttDeliveryToken, JSONObject /* Message */> sentMessageMap = new HashMap<IMqttDeliveryToken, JSONObject>();

	// callback context for tracing
	private CallbackContext traceCallback = null;
	// state of tracing
	private boolean traceEnabled = false;

	
	@Override
	/**
	 * This method, and the subroutine methods that follow it, take a command passed through from JavaScript via 
	 * "cordova.exec". They then call through to the MQTT API provided by the Android Service
	 * 
	 * A few of these calls are synchronous and in those cases this method returns a result to JavaScript 
	 * when it completes.
	 * 
	 * Most of the calls are asynchronous. These either 
	 * i) Return a single response at some later time when the command is complete, as is the case with connect(), or 
	 * ii) Register an event handler with the MQTT api, which might receive multiple responses over time
	 * 
	 * In case i) this method returns immediately to JavaScript without sending a result at all. The result is then sent 
	 * later when the MQTT call completes.
	 * In case ii) this method returns immediately to JavaScript, sending Status.NO_RESULT.
	 * The relevant callback is then invoked one or more times, when there is data to be returned 
	 * 
	 * @param action the action to be performed 
	 * @param args the parameters specified by the JavaScript code
	 * @param callbackContext
	 * 		the Cordova context which can be used to invoke the success/failure callbacks
	 * 
	 * This Java code catches any errors/exceptions that could be caused by the application programmer and 
	 * returns appropriate failures to the JavaScript portion of the plugin. It does not attempt to detect 
	 * failures caused by errors in the JavaScript plugin code (e.g. insufficient parameters passed in the 
	 * args array). These could result in JSONExceptions which are thrown by this method (and which will result
	 * in JavaScript failure callbacks being invoked).    
	 * 		
	 */
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		traceDebug(TAG, "execute(" + action + ",{" + args + "}," + callbackContext.getCallbackId() + ")");
		
		// Our first Action is related to Trace

		if (action.equals(SET_TRACE_CALLBACK)) {
			traceCallback = callbackContext;
			PluginResult result = new PluginResult(Status.NO_RESULT);  
			result.setKeepCallback(true);  // Keep the callback for use when there's something to be traced
			callbackContext.sendPluginResult(result);
			return true;
		}

		// GetClient sets up the association with the underlying MQTT client. Note that we could be 
		// running multiple independent MQTT client instances
		// This is a simple operation and we do it synchronously
		if (action.equals(GET_CLIENT_ACTION)) {

			String clientHandle;

			String host = args.getString(0);
			int port = args.getInt(1);
			String clientId = args.getString(2);
			boolean useSSL = args.getBoolean(3);
			String serverURI = null;
			if(useSSL){
				serverURI = "ssl://" + host + ":" + port;
			}else{
				serverURI = "tcp://" + host + ":" + port;
			}

			clientHandle = serverURI + ":" + clientId;

			// get an MQTT client object
			MqttAndroidClient client = new MqttAndroidClient(
					cordova.getActivity(), serverURI, clientId, MqttAndroidClient.Ack.MANUAL_ACK);

			// get a callback handler and register it with the client to receive responses
			ClientCallbackHandler handler = new ClientCallbackHandler();
			client.setCallback(handler);

			// store the client and handler in Maps so we can retrieve them easily
			clientMap.put(clientHandle, client);
			handlerMap.put(clientHandle, handler);
			client.setTraceEnabled(traceEnabled);
			client.setTraceCallback(this);
			
			// We return a clientHandle to the JavaScript code,
			// which it can use to identify the client on subsequent calls
			callbackContext.success(clientHandle);

			return true;
		}

		// All remaining actions have a clientHandle as their first argument
		// so we need to get the client and the associated handler

		String clientHandle = args.getString(0);
		MqttAndroidClient client = clientMap.get(clientHandle);
		ClientCallbackHandler handler = handlerMap.get(clientHandle);
		
		// Our next two Actions are related to Trace. It is valid for there to be no client when these are called

		if (action.equals(SET_TRACE_ENABLED)) {
			traceEnabled = true;
			if (client != null)
			  client.setTraceEnabled(true);
			callbackContext.success();
			return true;
		}

		if (action.equals(SET_TRACE_DISABLED)) {
			traceEnabled = false;
			if (client != null)
			  client.setTraceEnabled(false);
			callbackContext.success();
			return true;
		}

		// For all remaining actions there should always be a client object corresponding to the handle. 
		// It is an error in the JavaScript part of the plugin if that isn't the case. 

		if (client == null) {
			callbackContext.error(ERROR_HANDLE);
		}
		

		// Our next action is message acknowledgment. This is called by the JavaScript code to indicate that
		// it has successfully processed an incoming message.
		// We process this synchronously, unlike the actions that follow which are all asynchronous
		else if (action.equals(ACKNOWLEDGE_RECEIPT_ACTION)) {
			String msgId = args.getString(1);
			if (client.acknowledgeMessage(msgId)==true)
				callbackContext.success();
			else 
				callbackContext.error(ERROR_ACK);
			return true;
		}

		// The next 5 actions are the verbs from the MQTT api itself
		else if (action.equals(CONNECT_ACTION)) {
			doConnect(args, callbackContext, client);
		}

		else if (action.equals(DISCONNECT_ACTION)) {
			doDisconnect(args, callbackContext, clientHandle, client, handler);
		}

		else if (action.equals(SEND_ACTION)) {
			doSend(args, callbackContext, client);
		}

		else if (action.equals(SUBSCRIBE_ACTION)) {
			doSubscribe(args, callbackContext, client);
		}

		else if (action.equals(UNSUBSCRIBE_ACTION)) {
			doUnsubscribe(args, callbackContext, client);
		}

		// The remaining actions are used to register callbacks for "unsolicited" events coming from MQTT
		
		else if (action.equals(SET_ON_CONNECTIONLOST_CALLBACK)) {
			handler.setConnectionLostCallback(callbackContext);
			PluginResult result = new PluginResult(Status.NO_RESULT);
			result.setKeepCallback(true); // keep it around
			callbackContext.sendPluginResult(result);
		}
		else if (action.equals(SET_ON_MESSAGE_DELIVERED_CALLBACK)) {
			handler.setDeliveryCompleteCallback(callbackContext);
			PluginResult result = new PluginResult(Status.NO_RESULT);
			result.setKeepCallback(true); // keep it around
			callbackContext.sendPluginResult(result);
		}
		else if (action.equals(SET_ON_MESSAGE_ARRIVED_CALLBACK)) {
			handler.setMessageArrivedCallback(callbackContext);
			PluginResult result = new PluginResult(Status.NO_RESULT);
			result.setKeepCallback(true); // keep it around
			callbackContext.sendPluginResult(result);
		}
		else  { // invalid action
			traceError(TAG, "Unrecognised action '" + action	+ "'");
			return false;
		}
		return true;
	}

	@Override
	public void onDestroy() {
		super.onDestroy();
		for(MqttAndroidClient client: clientMap.values()){
			client.unregisterResources();
		}
	}

	/*
	 * The following five methods make MQTT api calls against the underlying client object.
	 * They collect the api call arguments from the incoming JSONArray args and pass them on the MQTT call
	 * 
	 * They use the "with callback" variant of the Asynch MQTT api calls, and they create a separate instance
	 * of a callback listener for each invocation of the api. Each JavaScript invocation can supply an invocationContext
	 * object. This is passed into the callback instance, rather than being passed to the MQTT api call itself.
	 * 
	 */
	private void doUnsubscribe(JSONArray args, CallbackContext callbackContext,
			MqttAndroidClient client) throws JSONException {
		String topicFilter = args.getString(1);
		final JSONObject invocationContext = args.optJSONObject(2);
		try {
			client.unsubscribe(topicFilter, null,
					new GeneralCallback(invocationContext, callbackContext));
		
		} catch (MqttException exception) {
			callbackContext.error(createError(exception, invocationContext));
		}
	}

	private void doSubscribe(JSONArray args, CallbackContext callbackContext,
			MqttAndroidClient client) throws JSONException {
		String topicFilter = args.getString(1);
		int qos = args.getInt(2);
		final JSONObject invocationContext = args.optJSONObject(3);
		try {
			client.subscribe(topicFilter, qos, null,
					new GeneralCallback(invocationContext, callbackContext));
		} catch (MqttException exception) {
			callbackContext.error(createError(exception, invocationContext));
		}
	}

	private void doSend(JSONArray args, CallbackContext callbackContext, MqttAndroidClient client) throws JSONException {
		JSONObject jsMsg = args.getJSONObject(1);
		MqttMessage msg = messageFromJSON(jsMsg);
		String topic = jsMsg.getString(DESTINATION_NAME);
		final JSONObject invocationContext = args.optJSONObject(2);
		try {
			IMqttDeliveryToken token = client.publish(topic, msg, null, 
			  new GeneralCallback(invocationContext, callbackContext));
			sentMessageMap.put(token, jsMsg);
		
		} catch (MqttException exception) {
			callbackContext.error(createError(exception, invocationContext));
		}
	}

	private void doDisconnect(JSONArray args, CallbackContext callbackContext,
		String clientHandle, MqttAndroidClient client,
		ClientCallbackHandler handler) throws JSONException {
		
		final JSONObject invocationContext = args.optJSONObject(1);
		final ClientCallbackHandler handlerCopy = handler;
		final String clientHandleCopy = clientHandle;
		try {
			client.disconnect(null, new GeneralCallback(
					invocationContext, callbackContext) {
				@Override
				public void onSuccess(IMqttToken asyncActionToken) {
					super.onSuccess(asyncActionToken);
					handlerCopy.connectionLost(null);  // added for compatibility with mqttws31.js
					handlerCopy.cleanup();
					handlerMap.remove(clientHandleCopy);
					clientMap.remove(clientHandleCopy);
				}
			});
		} catch (MqttException exception) {
			callbackContext.error(createError(exception, invocationContext));
		}
	}

	private void doConnect(JSONArray args, CallbackContext callbackContext,
			MqttAndroidClient client) throws JSONException {
		int timeout = args.getInt(1);
		boolean cleanSession = args.getBoolean(2);
		String userName = args.getString(3);
		String password = args.getString(4);
		int keepAliveInterval = args.getInt(5);
		JSONObject jsWillMsg = args.optJSONObject(6);


		 boolean useSSL = args.getBoolean(7);

		 JSONObject jsSslProperties = args.getJSONObject(8);
		// SSLSocketFactory sslFactory = null;
		
		final JSONObject invocationContext = args.optJSONObject(9);

		try {
			MqttConnectOptions options = new MqttConnectOptions();
			options.setCleanSession(cleanSession);
			options.setConnectionTimeout(timeout);
			options.setKeepAliveInterval(keepAliveInterval);
			if (userName.length() > 0)
				options.setUserName(userName);
			if (password.length() > 0)
				options.setPassword(password.toCharArray());

			if (jsWillMsg != null) {
				MqttMessage willMessage = messageFromJSON(jsWillMsg);
				String willTopic = jsWillMsg.getString(DESTINATION_NAME);
				options.setWill(willTopic, willMessage.getPayload(),
						willMessage.getQos(), willMessage.isRetained());
			}

			if (useSSL == true) {
				// get ssl socket factory
				String keyPath = jsSslProperties.getString("keyStorePath")
						.trim();
				String keyPassword = jsSslProperties
						.getString("keyStorePassword");
				InputStream keyStore = cordova.getActivity().getAssets().open(keyPath);
		   
				SSLSocketFactory sslFactory = client.getSSLSocketFactory(
						keyStore,keyPassword);
				options.setSocketFactory(sslFactory);			
			}

			client.connect(options, null, new GeneralCallback(
					invocationContext, callbackContext));
		} catch (Exception exception) {
			Log.e("exception","ex");
			callbackContext.error(createError(exception, invocationContext));
			traceException("sslconn", "ssl", exception);
		}
	}

	
	// Create an error result object (this is used by the preceding methods)
	private JSONObject createError(Exception exception, JSONObject invocationContext) throws JSONException {

		JSONObject callbackResult = new JSONObject();
		try {
			callbackResult.put("invocationContext", invocationContext);
			String errorMessage = exception.getLocalizedMessage();
			if (errorMessage == null)
				errorMessage = exception.toString();
			callbackResult.put("errorMessage", errorMessage);
			if (exception instanceof MqttException)
			{
				int errorNumber = ((MqttException) exception).getReasonCode();
				callbackResult.put("errorCode", errorNumber);
			}
			else
				callbackResult.put("errorCode", generalError);
				
		} catch (JSONException e) {
			traceError(TAG, e.getMessage());
		}
		return callbackResult;
	}

	// Create a message from the JSONObject we've been passed
	private MqttMessage messageFromJSON(JSONObject jsMsg) {
		MqttMessage result = null;
		try {
			// There seems no good way to turn a JSONArray (of number)
			// into a Java byte array, so use brute force
			JSONArray jsPayload = jsMsg.getJSONArray(PAYLOAD);
			byte[] payload = new byte[jsPayload.length()];
			for (int i = 0; i < jsPayload.length(); i++) {
				payload[i] = (byte) jsPayload.getInt(i);
			}
			result = new MqttMessage(payload);
			result.setQos(jsMsg.optInt(QOS, 0));
			result.setRetained(jsMsg.optBoolean(RETAINED, false));
		} catch (JSONException e) {
			traceException(TAG, "messageFromJSON", e);
		}

		return result;
	}

	// Methods for tracing by making a callback to JavaScript 

	public void traceDebug(String tag, String message) {
		makeTraceCallback(Status.OK, tag + " " + message, -1, "debug");
	}

	public void traceError(String tag, String message) {
		makeTraceCallback(Status.ERROR, tag + " " + message, -1, "error");
	}

	public void traceException(String tag, String message, Exception tr) {
		makeTraceCallback(Status.ERROR,
				tag + " " + message + ":" + Log.getStackTraceString(tr), -1, "error");
	}

	private void makeTraceCallback(Status status, String message,
			int errorCode, String severity) {
	
		if ((traceCallback != null) && (traceEnabled)) {
			JSONObject callbackResult = new JSONObject();
			try {
				callbackResult.put("severity", severity);
				callbackResult.put("message", message);
				callbackResult.put("errorCode", errorCode);
			} catch (JSONException e) {
				Log.e(TAG, "failed to build callback result", e);
			}
			PluginResult pluginResult = new PluginResult(status, callbackResult);
			pluginResult.setKeepCallback(true);
			traceCallback.sendPluginResult(pluginResult);
		}
	}

	private class GeneralCallback implements IMqttActionListener {
		private final JSONObject invocationContext;
		private final CallbackContext cordovaCallback;
		
		private GeneralCallback(JSONObject invocationContext, CallbackContext callback) {
			this.invocationContext = invocationContext;
			this.cordovaCallback = callback;
		}

		@Override
		public void onSuccess(IMqttToken asyncActionToken) {
			JSONObject callbackResult = new JSONObject();
			try {
    		  callbackResult.put("invocationContext", invocationContext);
			} catch (JSONException e) {
				cordovaCallback.error(e.getMessage());
			}
			traceDebug(TAG, "operation Success(" + cordovaCallback + ")");
			cordovaCallback.success(callbackResult);
		}

		@Override
		public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
			int errorNumber = -1;
			if (exception instanceof MqttException) {
				errorNumber = ((MqttException) exception).getReasonCode();
			}
			JSONObject callbackResult = new JSONObject();
			try {
				callbackResult.put("invocationContext", invocationContext);
				String errorMessage = "null";
				if(errorMessage != null){
					//In case exception is null here.
					errorMessage = exception.getLocalizedMessage();
				}
				callbackResult.put("errorMessage", errorMessage);
				callbackResult.put("errorCode", errorNumber);
				traceDebug(TAG, "operation failure(" + cordovaCallback + ", {" + callbackResult + "})");
				cordovaCallback.error(callbackResult);
			} catch (JSONException e) {
				cordovaCallback.error(e.getMessage());
			}
		}
	}
	
	/**
	 * This class handles the three "unsolicited callbacks" from the MQTT client.
	 *  - connectionLost
	 *  - messageArrived
	 *  - deliveryComplete
	 * The callback events are passed back to their respective JavaScript handlers. The 
	 * JavaScript callback handler is kept alive so that it can receive further events
	 *
	 */

	private class ClientCallbackHandler implements MqttCallback {

		private CallbackContext connectionLostCallback;
		private CallbackContext messageArrivedCallback;
		private CallbackContext deliveryCompleteCallback;

		// Methods used to register to the Cordova callbacks with this class
		public void setConnectionLostCallback(CallbackContext connectionLostCallback) {
			this.connectionLostCallback = connectionLostCallback;
		}

		public void setMessageArrivedCallback(CallbackContext messageArrivedCallback) {
			this.messageArrivedCallback = messageArrivedCallback;
		}

		public void setDeliveryCompleteCallback(CallbackContext deliveryCompleteCallback) {
			this.deliveryCompleteCallback = deliveryCompleteCallback;
		}
		

		// Method to close and deregister all three Cordova callbacks
		public void cleanup() {
			// force Cordova to discard the callbacks by making
			// NO_RESULT calls without setting keepCallback
			PluginResult result = new PluginResult(Status.NO_RESULT);
			if (connectionLostCallback != null) {
				connectionLostCallback.sendPluginResult(result);
				connectionLostCallback = null;
			}
			if (messageArrivedCallback != null) {
				messageArrivedCallback.sendPluginResult(result);
				messageArrivedCallback = null;
			}
			if (deliveryCompleteCallback != null) {
				deliveryCompleteCallback.sendPluginResult(result);
				deliveryCompleteCallback = null;
			}
		}

		// Callback handlers that get registered with the MQTT client.
		// These receive callbacks from the MQTT client and forward them on to JavaScript
		@Override
		public void connectionLost(Throwable cause) {
			if (connectionLostCallback != null) {
				int errorNumber = -1;
				
				if (cause == null)  {    // client initiated disconnect
					errorNumber = 0;
				}
				
				if (cause instanceof MqttException) {
					errorNumber = ((MqttException) cause).getReasonCode();
				}
				JSONObject callbackResult = new JSONObject();
				PluginResult result;
				try {
					callbackResult.put("errorMessage",
							(cause != null) ? cause.getLocalizedMessage() : "none");
					callbackResult.put("errorCode", errorNumber);
					traceDebug(TAG, "connectionLost(" + callbackResult + ")");
					result = new PluginResult(Status.OK, callbackResult);
				}
				catch (JSONException e) {
					traceDebug(TAG, "connectionLost(" + e + ")");
					result = new PluginResult(Status.ERROR, e.toString());
				}
				result.setKeepCallback(true);
				connectionLostCallback.sendPluginResult(result);
			}
		}

		@Override
		public void messageArrived(String topic, MqttMessage message)
				throws Exception {
			if (messageArrivedCallback != null) {
				JSONObject jsMsg = new JSONObject();
				try {
					byte[] payload = message.getPayload();
					JSONArray jsPayload = new JSONArray();
					for (byte b : payload) {
						jsPayload.put(b & 0xff);  // make it an unsigned integer
					}
					jsMsg.put(PAYLOAD, jsPayload);
					jsMsg.put(DESTINATION_NAME, topic);
					jsMsg.put(QOS, message.getQos());
					jsMsg.put(RETAINED, message.isRetained());
					jsMsg.put(DUPLICATE, message.isDuplicate());
					if (message instanceof ParcelableMqttMessage)
					  jsMsg.put(MESSAGE_ID, ((ParcelableMqttMessage)message).getMessageId());
				} catch (JSONException e) {
					traceException(TAG, "failed to build result message", e);
				}
				traceDebug(TAG, "messageArrived(" + jsMsg + ")");
				PluginResult result = new PluginResult(Status.OK, jsMsg);
				result.setKeepCallback(true);
				messageArrivedCallback.sendPluginResult(result);
			}
		}

		@Override
		public void deliveryComplete(IMqttDeliveryToken token) {
			if (deliveryCompleteCallback != null) {
				JSONObject jsMsg = sentMessageMap.remove(token);
				PluginResult result = new PluginResult(Status.OK, jsMsg);
				result.setKeepCallback(true);
				deliveryCompleteCallback.sendPluginResult(result);
			}
		}

	}
}
