
/* JavaScript content from js/mqttCordovaClient.js in folder common */
/* JavaScript content from js/mqttCordovaClient.js in folder android */
/*!
 * ============================================================================
 * Licensed Materials - Property of IBM
 * 
 * 5747-SM3
 * 
 * (C) Copyright IBM Corp. 1999, 2014 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 * ============================================================================
 */
	
// Only expose a single object name in the global namespace.
// Everything must go through this module. Global Messaging module
// only has a single public function, client, which returns
// a Messaging client object given connection details.

/**
 * Messaging send and receiving message using Cordova plugin.
 * <p>
 * This programming interface allows a JavaScript client application to use the
 * MQTT V3.1 protocol to connect to an MQTT-supporting messaging server.
 * 
 * The function supported includes:
 * <ol>
 * <li>Connecting to and disconnecting from a server. The server is identified
 * by its host name and port number.
 * <li>Specifying options that relate to the communications link with the
 * server, for example the frequency of keep-alive heartbeats, and whether
 * SSL/TLS is required.
 * <li>Subscribing to and receiving messages from MQTT Topics.
 * <li>Publishing messages to MQTT Topics.
 * </ol>
 * <p>
 * <b>The API consists of two main objects:</b>
 * <dl>
 * <dt><b>{@link Messaging.Client}</b></dt>
 * <dd> This contains methods that provide the functionality of the API,
 * including provision of callbacks that notify the application
 * when a message arrives from or is delivered to the messaging server,
 * or when the status of its connection to the messaging server changes.</dd>
 *
 * <dt><b>{@link Messaging.Message}</b></dt>
 * <dd>This encapsulates the payload of the message along with various attributes
 * associated with its delivery, in particular the destination to which it has
 * been (or is about to be) sent. </dd>
 * </dl>
 * <p>
 * The programming interface validates parameters passed to it, and will throw
 * an Error containing an error message intended for developer use 
 * or pass the error message to an Failure callback if set,
 * if it detects an error with any parameter.
 * <p>
 * <b>Example:</b>
 * 
 * <code><pre>
 * client = new Messaging.Client(location.hostname, Number(location.port),&quot;clientId&quot;);
 * client.onConnectionLost = onConnectionLost;
 * client.onMessageArrived = onMessageArrived;
 * client.trace = onTrace;
 * client.connect({
 * 	onSuccess : onConnect
 * });
 * 
 * function onConnect() {
 * 	// Once a connection has been made, make a subscription and send a message.
 * 	console.log(&quot;onConnect&quot;);
 * 	client.subscribe(&quot;/World&quot;);
 * 	message = new Messaging.Message(&quot;Hello&quot;);
 * 	message.destinationName = &quot;/World&quot;;
 * 	client.send(message);
 * };
 * function onConnectionLost(responseObject) {
 * 	if (responseObject.errorCode !== 0)
 * 		console.log(&quot;onConnectionLost:&quot; + responseObject.errorMessage);
 * };
 * function onMessageArrived(message) {
 * 	console.log(&quot;onMessageArrived:&quot; + message.payloadString);
 * 	client.disconnect();
 * };
 * function onTrace(err){
 *	console.log('['+ err.severity+']:'+err.message)	;
 * };
 * </pre></code>
 * @namespace  Messaging 
 */
Messaging = (function (global) {

    // Private variables below, these are only visible inside the function
	// closure
    // which is used to define the module.

	var version = "@VERSION@";
	var buildLevel = "@BUILDLEVEL@";
  
    // Collection of utility methods used to simplify module code
    // and promote the DRY pattern.

    /**
	 * Validate an object's parameter names to ensure they match a list of
	 * expected variables name for this option type. Used to ensure option
	 * object passed into the API don't contain erroneous parameters.
	 * Report error with onFailure callback or throw error values if invalid 
	 * option parameter found.
	 * 
	 * @param {Object} obj - User options object
	 * @param {Object} keys - Valid keys and types that may exist in obj. 
	 * @param {Object} callback - Validation failure callback. 
	 *
	 * @private
	 */
    var validate = function(obj, keys,callback) {
        for(key in obj) {
        	if (obj.hasOwnProperty(key)) {
        	    if (keys.hasOwnProperty(key)) {
        	        if (typeof obj[key] !== keys[key])
        		       //throw new Error(format(ERROR.INVALID_TYPE, [typeof obj[key], key]));
        		   		reportError(ERROR.INVALID_TYPE.code,format(ERROR.INVALID_TYPE, [typeof obj[key], key]),callback);
        	    } else {
            	    var errorStr = "Unknown property, " + key + ". Valid properties are:";
            	    for (key in keys)
            		    if (keys.hasOwnProperty(key))
            		        errorStr = errorStr+" "+key;
            	    //throw new Error(errorStr);
            	    reportError(null,errorStr,callback);
                }
        	}
        }
    };

    /**
	 * Unique message type identifiers, with associated associated integer
	 * values.
	 * 
	 * @private
	 */
    var ERROR = {
    	OK: {code:0, text:"AMQJSC0000I OK."},
    	CONNECT_TIMEOUT: {code:1, text:"AMQJSC0001E Connect timed out."},
        SUBSCRIBE_TIMEOUT: {code:2, text:"AMQJS0002E Subscribe timed out."},
        UNSUBSCRIBE_TIMEOUT: {code:3, text:"AMQJS0003E Unsubscribe timed out."},
        PING_TIMEOUT: {code:4, text:"AMQJS0004E Ping timed out."},
        INTERNAL_ERROR: {code:5, text:"AMQJS0005E Internal error."},
        CONNACK_RETURNCODE: {code:6, text:"AMQJS0006E Bad Connack return code:{0} {1}."},
        SOCKET_ERROR: {code:7, text:"AMQJS0007E Socket error:{0}."},
        SOCKET_CLOSE: {code:8, text:"AMQJS0008I Socket closed."},
        MALFORMED_UTF: {code:9, text:"AMQJS0009E Malformed UTF data:{0} {1} {2}."},
        UNSUPPORTED: {code:10, text:"AMQJS0010E {0} is not supported by this browser."},
        INVALID_STATE: {code:11, text:"AMQJS0011E Invalid state {0}."},
        INVALID_TYPE: {code:12, text:"AMQJS0012E Invalid type {0} for {1}."},
        INVALID_ARGUMENT: {code:13, text:"AMQJS0013E Invalid argument {0} for {1}."},
        UNSUPPORTED_OPERATION: {code:14, text:"AMQJS0014E Unsupported operation."},
        INVALID_STORED_DATA: {code:15, text:"AMQJS0015E Invalid data in local storage key={0} value={1}."},
        INVALID_MQTT_MESSAGE_TYPE: {code:16, text:"AMQJS0016E Invalid MQTT message type {0}."},
        MALFORMED_UNICODE: {code:17, text:"AMQJS0017E Malformed Unicode string:{0} {1}."}
    };

     /**
	 * Report error with onFailure callback or throw error values.
	 * @private
	 * @param {errorCode} 
	 *			ERROR.KEY.code value above.
	 * @param {errorMessage} 
	 *			text describing the error.
	 * @param {callback}  
	 *			onFailure callback
	 * 
	 */
    var reportError = function(errorCode,errorMessage,callback){
		if(callback && typeof callback === "function"){
			callback({errorCode:errorCode,
				errorMessage:errorMessage
			});
		}else{
			throw new Error(errorMessage);
		}
	};

    /**
	 * Format an error message text.
	 * 
	 * @private
	 * @param {error}
	 *            ERROR.KEY value above.
	 * @param {substitutions}
	 *            [array] substituted into the text.
	 * @return the text with the substitutions made.
	 */
    var format = function(error, substitutions) {
    	var text = error.text;
    	if (substitutions) {
    	  for (var i=0; i<substitutions.length; i++) {
    		field = "{"+i+"}";
    		start = text.indexOf(field);
    		if(start > 0) {
    			var part1 = text.substring(0,start);
    			var part2 = text.substring(start+field.length);
    			text = part1+substitutions[i]+part2;
    		}
    	  }
    	}
    	return text;
    };

    /**
	 * Takes a String and calculates its length in bytes when encoded in UTF8.
	 * 
	 * @private
	 */
    function UTF8Length(input) {
    	var output = 0;
    	for (var i = 0; i<input.length; i++) 
    	{
    		var charCode = input.charCodeAt(i);
                if (charCode > 0x7FF)
                   {
                      // Surrogate pair means it's a 4 byte character
                      if (0xD800 <= charCode && charCode <= 0xDBFF)
                        {
                          i++;
                          output++;
                        }
    		       output +=3;
                   }
    		else if (charCode > 0x7F)
    			output +=2;
    		else
    			output++;
    	} 
    	return output;
    }
    
    /**
	 * Takes a String and writes it into an array as UTF8 encoded bytes.
	 * 
	 * @private
	 */
    function stringToUTF8(input, output, start) {
    	var pos = start;
    	for (var i = 0; i<input.length; i++) {
    		var charCode = input.charCodeAt(i);
    		
    		// Check for a surrogate pair.
    		if (0xD800 <= charCode && charCode <= 0xDBFF) {
    	        lowCharCode = input.charCodeAt(++i);
    	        if (isNaN(lowCharCode)) {
    	        	throw new Error(format(ERROR.MALFORMED_UNICODE, [charCode, lowCharCode]));
    	        }
    	        charCode = ((charCode - 0xD800)<<10) + (lowCharCode - 0xDC00) + 0x10000;
    	    
    	    }
    		
    		if (charCode <= 0x7F) {
    			output[pos++] = charCode;
    		} else if (charCode <= 0x7FF) {
    			output[pos++] = charCode>>6  & 0x1F | 0xC0;
    			output[pos++] = charCode     & 0x3F | 0x80;
    		} else if (charCode <= 0xFFFF) {    				    
    	        output[pos++] = charCode>>12 & 0x0F | 0xE0;
        		output[pos++] = charCode>>6  & 0x3F | 0x80;   
        		output[pos++] = charCode     & 0x3F | 0x80;   
    		} else {
    			output[pos++] = charCode>>18 & 0x07 | 0xF0;
        		output[pos++] = charCode>>12 & 0x3F | 0x80;
        		output[pos++] = charCode>>6  & 0x3F | 0x80;
        		output[pos++] = charCode     & 0x3F | 0x80;
    		};
    	} 
    	return output;
    }

    function parseUTF8(input, offset, length) {
    	var output = "";
    	var utf16;
    	var pos = offset;

    	while (pos < offset+length)
    	{
    		var byte1 = input[pos++];
    		if (byte1 < 128)
    			utf16 = byte1;
    		else 
    		{
    			var byte2 = input[pos++]-128;
    			if (byte2 < 0) 
    				throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16),""]));
    			if (byte1 < 0xE0)             // 2 byte character
    				utf16 = 64*(byte1-0xC0) + byte2;
    			else 
    			{ 
    				var byte3 = input[pos++]-128;
    				if (byte3 < 0) 
    					throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16)]));
    				if (byte1 < 0xF0)        // 3 byte character
    					utf16 = 4096*(byte1-0xE0) + 64*byte2 + byte3;
                                else
                                {
                                   var byte4 = input[pos++]-128;
                                   if (byte4 < 0) 
    					throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
                                   if (byte1 < 0xF8)        // 4 byte character
                                           utf16 = 262144*(byte1-0xF0) + 4096*byte2 + 64*byte3 + byte4;
    				   else                     // longer encodings are not
												// supported
    					throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
                                }
    			}
    		}  

                if (utf16 > 0xFFFF)   // 4 byte character - express as a
										// surrogate pair
                  {
                     utf16 -= 0x10000;
                     output += String.fromCharCode(0xD800 + (utf16 >> 10)); // lead
																			// character
                     utf16 = 0xDC00 + (utf16 & 0x3FF);  // trail character
                  }
    		output += String.fromCharCode(utf16);
    	}
    	return output;
    }

// =========================================================================================================================
	/*
	 * Internal implementation of the Cordova-based MQTT V3.1 client.
	 * 
	 * @name Messaging.ClientImpl
	 * @constructor 
	 * @param {String} host the DNS name of the host. 
	 * @param {Number} port the port number on the host.
	 * @param {String} clientId the MQ client identifier.
	 */
	var ClientImpl = function(host, port, clientId) {
		this._trace("Messaging.Client", host, port, clientId);

		this.host = host;
		this.port = port;
        // this.clientId = clientId || generateClientId();
		this.clientId = clientId;  // missing client Ids no longer supported.
		
		// Establish the Trace callback
		
		var context = this; // the callback may run in another scope, so we need
							// access to "this"
		
		var traceCallback = function(arg) {
			if (context.traceFunction) {
				context.traceFunction(arg);
			}
		};

		cordova.exec(traceCallback, traceCallback, "MqttPlugin",
				PLUGIN_ACTION.SET_TRACE_CALLBACK, []);
	};

	// plugin actions - see MqttPlugin.java
	var PLUGIN_ACTION = {
			SEND_ACTION : "send",
			ACKNOWLEDGE_RECEIPT_ACTION : "acknowledgeReceipt",
			UNSUBSCRIBE_ACTION : "unsubscribe",
			SUBSCRIBE_ACTION : "subscribe",
			DISCONNECT_ACTION : "disconnect",
			CONNECT_ACTION : "connect",
			GET_CLIENT_ACTION : "getClient",
			SET_ON_CONNECTIONLOST_CALLBACK : "setOnConnectionLostCallback",
			SET_ON_MESSAGE_ARRIVED_CALLBACK : "setOnMessageArrivedCallback",
			SET_ON_MESSAGE_DELIVERED_CALLBACK : "setOnMessageDeliveredCallback",
			SET_TRACE_CALLBACK : "setTraceCallback",
			SET_TRACE_ENABLED : "setTraceEnabled",
			SET_TRACE_DISABLED : "setTraceDisabled"
	};

	// Messaging Client public instance members.
	ClientImpl.prototype.host;
	ClientImpl.prototype.port;
	ClientImpl.prototype.clientId;
	ClientImpl.prototype.clientHandle;
	ClientImpl.prototype.globalTimeout;

	// Messaging Client private instance members.
	ClientImpl.prototype.connectOptions;
	ClientImpl.prototype.serviceStarted = false;
	ClientImpl.prototype.connected = false;
	ClientImpl.prototype.clientHandle;

	// Messaging client callback functions
	ClientImpl.prototype.onConnectionLost;
	ClientImpl.prototype.onMessageDelivered;
	ClientImpl.prototype.onMessageArrived;
	ClientImpl.prototype.traceFunction;
	
	ClientImpl.prototype._setTrace = function(trace) {
		if (typeof trace === "function") {
			this.traceFunction = trace;
			this.enable_trace();
		} else if (trace == null) {
			this.traceFunction = null;
			this.disable_trace();
		} else
			//throw new Error(format(ERROR.INVALID_ARGUMENT, [trace, "trace"])); 
			reportError(ERROR.INVALID_ARGUMENT.code,format(ERROR.INVALID_ARGUMENT, [trace, "trace"]));
	};

	// convert a message as returned by the plugin to a Messaging message object
	ClientImpl.prototype.messageFromPluginMessage = function(pluginMessage) {

		var returnMessage = new Message(pluginMessage.payload);
		
		returnMessage.qos = pluginMessage.qos;
		returnMessage.duplicate = pluginMessage.duplicate;
		returnMessage.retained = pluginMessage.retained;

		// destinationName isn't available in the onMessageDelivered case
		returnMessage.destinationName = pluginMessage.destinationName || "";
		return returnMessage;
	};

	ClientImpl.prototype.enable_trace = function() {
		cordova.exec(null, null, "MqttPlugin", PLUGIN_ACTION.SET_TRACE_ENABLED,
				[this.clientHandle]);
	};

	ClientImpl.prototype.disable_trace = function() {
		cordova.exec(null, null, "MqttPlugin",
				PLUGIN_ACTION.SET_TRACE_DISABLED, [this.clientHandle]);
	};

	// Connect to the client using the specified options
	ClientImpl.prototype.connect = function(connectOptions) {
		this._trace("Client.connect", connectOptions, this.socket, this.connected);
	 
		if (this.connected) 
        	//throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));
        	reportError(ERROR.INVALID_STATE.code,format(ERROR.INVALID_STATE, ["already connected"]),connectOptions.onFailure);
	
		this.connected = false;

		// Now call getClient to retrieve a suitable clientHandle from the
		// plugin
		// and store it in our context. If this succeeds it will then call
		// _connect to perform the actual MQTT connect operation.

		this.getClient(connectOptions);
		this._trace("Exit from Client.connect");
	};

	// The actual call to the plugin to connect to an mqtt server
	ClientImpl.prototype._connect = function(connectOptions) {
		this._trace("Client._connect", connectOptions, this.connected);
		var context = this; // callbacks may run in another scope, so we need
							// access to "this"

		var timeout = 30;                        // 30 seconds
		if (connectOptions.timeout) {
			timeout = connectOptions.timeout;
		}
		context.globalTimeout = timeout;

		var cleanSession = false;
		if (connectOptions.cleanSession) {
			cleanSession = connectOptions.cleanSession;
		}

		var userName = "";
		if (connectOptions.userName) {
			userName = connectOptions.userName;
		}

		var password = "";
		if (connectOptions.password) {
			password = connectOptions.password;
		}

		var willMessage = null;
		if (connectOptions.willMessage) {

			willMessage = {
					payload : connectOptions.willMessage._getPayloadArray(),
					destinationName : connectOptions.willMessage.destinationName,
					qos : connectOptions.willMessage.qos,
					retained : connectOptions.willMessage.retained,
					duplicate : connectOptions.willMessage.duplicate
			};
		}

		var successCallback;
		if (connectOptions.onSuccess) {
			successCallback = function(response) {
				context.connected = true;
				context._trace("connect - succeeded");
				connectOptions.onSuccess(response);
			};
		} else {
			successCallback = function(response) {
				context.connected = true;
				context._trace("connect - succeeded");
			};
		}

		var failureCallback;
		if (connectOptions.onFailure) {
			failureCallback = function(response) {
				context._trace("connect - failed : " + JSON.stringify(response));
				connectOptions.onFailure(response);
			};
		} else {
			failureCallback = function(response) {
				context._trace("connect - failed : " + JSON.stringify(response));
      		};
		}

		var sslProperties = connectOptions.sslProperties || {};

		var invocationContext = connectOptions.invocationContext || {};

		cordova
		.exec(successCallback, failureCallback, "MqttPlugin",
				PLUGIN_ACTION.CONNECT_ACTION, [ this.clientHandle,
				                                timeout, cleanSession, userName, password,
				                                connectOptions.keepAliveInterval, willMessage, connectOptions.useSSL || false,
				                                sslProperties, invocationContext ]);
	};

	// call to the plugin to allocate a java client object and return a "handle"
	// to it
	ClientImpl.prototype.getClient = function(connectOptions) {
		this._trace("Client.getClient");
		var context = this; // callbacks may run in another scope, so we need
							// access to "this"
							
		var successCallback = function(clientHandle) {
			// on success, we store the handle,
			// and set up our wrappers for the external
			// client's "unsolicited" callbacks
			context.clientHandle = clientHandle;
			context._trace("Client.getClient succeeded - " + clientHandle);

			var onConnectionLostImpl = function(why) {
				// normal disconnection
				if (why.errorCode == 0){ 
					why.errorMessage = ERROR.OK.text;
				}
				context._trace("onConnectionLost - " + JSON.stringify(why));
				context.connected = false;
				if (context.onConnectionLost) {
					context.onConnectionLost(why);
				}
			};

			var onMessageDeliveredImpl = function(message) {
				message = message || {};
				context._trace("onMessageDelivered {" + message.payload + "}");
				if (context.onMessageDelivered) {
					context.onMessageDelivered(context
							.messageFromPluginMessage(message));
				}
			};

			var onMessageArrivedImpl = function(message) {
				message = message || {};
				context._trace("onMessageArrived {" + message.payload + "}");
				if (context.onMessageArrived) {
					context.onMessageArrived(context
							.messageFromPluginMessage(message));
				}
				cordova.exec(null, null, "MqttPlugin",
				  PLUGIN_ACTION.ACKNOWLEDGE_RECEIPT_ACTION, [clientHandle, message.messageId]);
				
			};

			cordova.exec(onConnectionLostImpl, onConnectionLostImpl,
					"MqttPlugin", PLUGIN_ACTION.SET_ON_CONNECTIONLOST_CALLBACK,
					[ clientHandle ]);
			cordova.exec(onMessageDeliveredImpl, onMessageDeliveredImpl,
					"MqttPlugin",
					PLUGIN_ACTION.SET_ON_MESSAGE_DELIVERED_CALLBACK,
					[ clientHandle ]);
			cordova.exec(onMessageArrivedImpl, onMessageArrivedImpl,
					"MqttPlugin",
					PLUGIN_ACTION.SET_ON_MESSAGE_ARRIVED_CALLBACK,
					[ clientHandle ]);

			// Now actually attempt to connect
			context._connect(connectOptions);
		};

		var failureCallback;
   		if (connectOptions.onFailure) {
			failureCallback = function(e) {
				context._trace("Client.getClient() failed " + e + "!");	
				connectOptions.onFailure({
					invocationContext : connectOptions.invocationContext,
					errorMessage : e,
					errorCode : -1
				});
			}
		}else{
      		failureCallback = function(e){
        	   context._trace("Client.getClient() failed " + e + "!"); 
        	}
        }
		cordova.exec(successCallback, failureCallback, "MqttPlugin",
				PLUGIN_ACTION.GET_CLIENT_ACTION, [ this.host, this.port, this.clientId, connectOptions.useSSL || false ]);
	};

	// call to the plugin to subscribe to a topic (possibly wildcarded)
	// with specific options
	ClientImpl.prototype.subscribe = function(filter, subscribeOptions) {
		var current_operation = "Client.subscribe";
		this._trace(current_operation, filter, subscribeOptions);
		
		if (!this.connected)
    	    //throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));
			reportError(ERROR.INVALID_STATE.code,format(ERROR.INVALID_STATE, ["not connected"]),subscribeOptions.onFailure);
		var context = this; // callbacks may run in another scope, so we need
		// access to "this"

		var qos = 0;
		if (typeof subscribeOptions.qos !== "undefined") {
			qos = subscribeOptions.qos;
		}

		var successCallback;
		if (subscribeOptions.onSuccess) {
			successCallback = subscribeOptions.onSuccess;
		} else {
			successCallback = function(response) {
				context._trace(current_operation
						+ " succeeded - invocationContext {"
						+ response.invocationContext + "}");
			};
		}

		var failureCallback;
		if (subscribeOptions.onFailure) {
			failureCallback = subscribeOptions.onFailure;
		} else {
			failureCallback = function(e) {
				context._trace(current_operation + " Failed - response {" + e
						+ "}");
			};
		}

		var invocationContext = subscribeOptions.invocationContext;

		cordova.exec(successCallback, failureCallback, "MqttPlugin",
				PLUGIN_ACTION.SUBSCRIBE_ACTION, [ this.clientHandle, filter,
				                                  qos, invocationContext ]);

	};

	// call to the plugin to unsubscribe from a topic (possibly wildcarded)
	// with specific options
	ClientImpl.prototype.unsubscribe = function(filter, unsubscribeOptions) {
		var current_operation = "Client.unsubscribe";
		this._trace(current_operation, filter, unsubscribeOptions);
		
		if (!this.connected)
    	    //throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));
    		reportError(ERROR.INVALID_STATE.code,format(ERROR.INVALID_STATE, ["not connected"]),unsubscribeOptions.onFalure);
		
		var context = this; // callbacks may run in another scope, so we need
		// access to "this"

		var successCallback;
		if (unsubscribeOptions.onSuccess) {
			successCallback = unsubscribeOptions.onSuccess;
		} else {
			successCallback = function() {
				context._trace(current_operation + " succeeded");
			};
		}

		var failureCallback;
		if (unsubscribeOptions.onFailure) {
			failureCallback = unsubscribeOptions.onFailure;
		} else {
			failureCallback = function(e) {
				context._trace(current_operation + " Failed - response {" + e
						+ "}");
			};
		}

		var invocationContext = unsubscribeOptions.invocationContext;

		cordova.exec(successCallback, failureCallback, "MqttPlugin",
				PLUGIN_ACTION.UNSUBSCRIBE_ACTION, [ this.clientHandle, filter,
				                                    invocationContext ]);

	};

	// call to the plugin to send an message with specific options
	ClientImpl.prototype.send = function(message, sendOptions) {
		var current_operation = "Client.send";
		this._trace(current_operation, message, sendOptions);
		
		if (!this.connected)
    	    //throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));
			reportError(ERROR.INVALID_STATE.code,format(ERROR.INVALID_STATE, ["not connected"]),sendOptions.onFailure);

		var context = this; // callbacks may run in another scope, so we need
		// access to "this"

		var successCallback;
		if (sendOptions.onSuccess) {
			successCallback = sendOptions.onSuccess;
		} else {
			successCallback = function() {
				context._trace(current_operation + " succeeded");
			};
		}

		var failureCallback;
		if (sendOptions.onFailure) {
			failureCallback = sendOptions.onFailure;
		} else {
			failureCallback = function(e) {
				context._trace(current_operation + " Failed - response {" + e
						+ "}");
			};
		}

		var invocationContext = sendOptions.invocationContext;
		
		var messageToPlugin = {
				payload : message._getPayloadArray(),
				destinationName : message.destinationName,
				qos : message.qos,
				retained : message.retained,
				duplicate : message.duplicate
		};

		cordova.exec(successCallback, failureCallback, "MqttPlugin",
				PLUGIN_ACTION.SEND_ACTION, [ this.clientHandle,
				                             messageToPlugin, invocationContext ]);

	};

	// call to the plugin to disconnect from the server
	ClientImpl.prototype.disconnect = function(disconnectOptions) {
		var current_operation = "Client.disconnect";
		this._trace(current_operation);
		var context = this; // callbacks may run in another scope, so we need
		// access to "this"

		var successCallback;
		if (disconnectOptions.onSuccess) {
			successCallback = disconnectOptions.onSuccess;
		} else {
			successCallback = function() {
				context._trace("disconnect - succeeded");
			};
		}

		var failureCallback;
		if (disconnectOptions.onFailure) {
			failureCallback = disconnectOptions.onFailure;
		} else {
			failureCallback = function(e) {
				context._trace("disconnect - failed : " + e);
			};
		}

		var invocationContext = disconnectOptions.invocationContext || {};

		if (!this.connected) {
			successCallback({
				invocationContext : invocationContext
			});
			return;
		}

		cordova.exec(successCallback, failureCallback, "MqttPlugin",
				PLUGIN_ACTION.DISCONNECT_ACTION, [ this.clientHandle,
				                                   invocationContext ]);

	};

	// tracing support
	ClientImpl.prototype._traceBuffer = null;
	ClientImpl.prototype._MAX_TRACE_ENTRIES = 100;

	ClientImpl.prototype.getTraceLog = function() {
		if (this._traceBuffer !== null) {
			this._trace("Client.getTraceLog", new Date());
			return this._traceBuffer;
		};
	};

	ClientImpl.prototype.startTrace = function() {
		if (this._traceBuffer === null) {
			this._traceBuffer = [];
		}
		this._trace("Client.startTrace", new Date());
	};

	ClientImpl.prototype.stopTrace = function() {
		delete this._traceBuffer;
	};

	ClientImpl.prototype._trace = function() {
		
		// Pass trace message back to client's callback function
		if (this.traceFunction) {
			for (i in arguments)
			{	
				if (typeof arguments[i] !== "undefined")
					arguments[i] = JSON.stringify(arguments[i]);
			}
			var record = Array.prototype.slice.call(arguments).join("");
			this.traceFunction ({severity: "debug", message: record	});
		}
		
		// Old trace buffer code
	
			if (this._traceBuffer !== null) {
			for ( var i = 0, max = arguments.length; i < max; i++) {
				if (this._traceBuffer == this._MAX_TRACE_ENTRIES) {
					this._traceBuffer.shift();
				}
				if (i === 0)
					this._traceBuffer.push(arguments[i]);
				else if (typeof arguments[i] === "undefined")
					this._traceBuffer.push(arguments[i]);
				else
					this._traceBuffer.push("  " + JSON.stringify(arguments[i]));
			}
		}
		
	};
// ==========================================================================================================

    // ------------------------------------------------------------------------
    // Public Programming interface.
    // ------------------------------------------------------------------------
    
    /**
	 * The JavaScript application communicates to the server using a
	 * Messaging.Client object.
	 * <p>
	 * Other programming languages, <big>Java</big>,<big>C</big>.
	 * <p>
	 * Most applications will create just one Client object and then call its
	 * connect() method, however applications can create more than one Client
	 * object if they wish. In this case the combination of host, port and
	 * clientId attributes must be different for each Client object.
	 * <p>
	 * The send, subscribe and unsubscribe methods are implemented as
	 * asynchronous JavaScript methods (even though the underlying protocol
	 * exchange might be synchronous in nature). This means they signal their
	 * completion by calling back to the application, via Success or Failure
	 * callback functions provided by the application on the method in question.
	 * Such callbacks are called at most once per method invocation and do not
	 * persist beyond the lifetime of the script that made the invocation.
	 * <p>
	 * In contrast there are some callback functions most notably<i>
	 * <b>onMessageArrived</b>,<b>trace</b></i> that are defined on the Messaging.Client object.
	 * These may get called multiple times, and aren't directly related to
	 * specific method invocations made by the client.
	 * 
	 * Creates a Messaging.Client object that can be used to communicate with a Messaging server,
	 * it throws errors if host/port are wrong.
	 * 
	 * @name Messaging.Client
	 * 
	 * @constructor 
	 * 
	 * @param {string}
	 *            host The address of the messaging server, as a DNS name or
	 *            dotted decimal IP address.
	 * @param {number}
	 *            port The port number in the host to connect to.
	 * @param {string}
	 *            clientId The Messaging client identifier, between 1 and 23
	 *            characters in length.
	 * 
	 * @property {string} host <i>read only</i> The server's DNS hostname or
	 *           dotted decimal IP address.
	 * @property {number} port <i>read only</i> The server's port.
	 * @property {string} clientId <i>read only</i> used when connecting to the
	 *           server.
	 * @property {function} onConnectionLost called when a connection has been
	 *           lost, after a connect() method has succeeded. Establish the
	 *           call back used when a connection has been lost. The connection
	 *           may be lost because the client initiates a disconnect or
	 *           because the server or network cause the client to be
	 *           disconnected. The disconnect call back may be called without
	 *           the connectionComplete call back being invoked if, for example
	 *           the client fails to connect. A single response object parameter
	 *           is passed to the onConnectionLost callback containing the
	 *           following fields:
	 *           <ol>
	 *           <li>errorCode
	 *           <li>errorMessage
	 *           </ol>
	 * @property {function} onMessageDelivered called when a message has been
	 *           delivered. All processing that this Client will ever do has
	 *           been completed. So, for example, in the case of a Qos=2 message
	 *           sent by this client, the PubComp flow has been received from
	 *           the server and the message has been removed from persistent
	 *           storage before this callback is invoked. Parameters passed to
	 *           the onMessageDelivered callback are:
	 *           <ol>
	 *           <li>Messaging.Message that was delivered.
	 *           </ol>
	 * @property {function} onMessageArrived called when a message has arrived
	 *           in this Messaging.client. Parameters passed to the
	 *           onMessageArrived callback are:
	 *           <ol>
	 *           <li>Messaging.Message that has arrived.
	 *           </ol>
	 * @property {function} trace called when Android service, Cordova plugin 
	 *			 or this client library generate trace msessage. Parameters passed to the
	 *           trace callback is object:
	 *           <ol>
	 *           <li>severity
	 *           <li>message
	 *           </ol>
	 */
    var Client = function (host, port, clientId) {
    	if (typeof host !== "string")
        	//throw new Error(format(ERROR.INVALID_TYPE, [typeof host, "host"]));
        	reportError(ERROR.INVALID_TYPE.code,format(ERROR.INVALID_TYPE, [typeof host, "host"]));
    	if (typeof port !== "number" || port < 0)
        	//throw new Error(format(ERROR.INVALID_TYPE, [typeof port, "port"]));
    		reportError(ERROR.INVALID_TYPE.code,format(ERROR.INVALID_TYPE, [typeof port, "port"]));
    	var clientIdLength = 0;
    	for (var i = 0; i<clientId.length; i++) {
    		var charCode = clientId.charCodeAt(i);                   
    		if (0xD800 <= charCode && charCode <= 0xDBFF)  {    			
                 i++; // Surrogate pair.
            }   		   
    		clientIdLength++;
    	}     	   	
        if (typeof clientId !== "string" || clientIdLength < 1 | clientIdLength > 23)
        	//throw new Error(format(ERROR.INVALID_ARGUMENT, [clientId, "clientId"])); 
        	reportError(ERROR.INVALID_TYPE.code,format(ERROR.INVALID_ARGUMENT, [clientId, "clientId"]));
    	
        var client = new ClientImpl(host, port, clientId);
        this._getHost =  function() { return client.host; };
    	this._setHost = function() { //throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
    		reportError(ERROR.UNSUPPORTED_OPERATION.code,format(ERROR.UNSUPPORTED_OPERATION));
    	 };
         	
        this._getPort = function() { return client.port; };
    	this._setPort = function() {// throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
    		reportError(ERROR.UNSUPPORTED_OPERATION.code,format(ERROR.UNSUPPORTED_OPERATION));
    	};
    	
    	this._getClientId = function() { return client.clientId; };
    	this._setClientId = function() { //throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
    		reportError(ERROR.UNSUPPORTED_OPERATION.code,format(ERROR.UNSUPPORTED_OPERATION));
    	};
        
        this._getOnConnectionLost = function() { return client.onConnectionLost; };
        this._setOnConnectionLost = function(newOnConnectionLost) { 
            if (typeof newOnConnectionLost === "function")
            	client.onConnectionLost = newOnConnectionLost;
            else 
				//throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnectionLost, "onConnectionLost"]));
				reportError(ERROR.INVALID_TYPE.code,format(ERROR.INVALID_TYPE,[typeof newOnConnectionLost, "onConnectionLost"]));
        };

        this._getOnMessageDelivered = function() { return client.onMessageDelivered; };
    	this._setOnMessageDelivered = function(newOnMessageDelivered) { 
    	    if (typeof newOnMessageDelivered === "function")
    			client.onMessageDelivered = newOnMessageDelivered;
	    	else 
    		//throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageDelivered, "onMessageDelivered"]));
    			reportError(ERROR.INVALID_TYPE.code,format(ERROR.INVALID_TYPE,[typeof newOnMessageDelivered, "onMessageDelivered"]));

	};

    	this._getOnMessageArrived = function() { return client.onMessageArrived; };
    	this._setOnMessageArrived = function(newOnMessageArrived) { 
    		if (typeof newOnMessageArrived === "function")
    			client.onMessageArrived = newOnMessageArrived;
    		else 
    			//throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageArrived, "onMessageArrived"]));
    			reportError(ERROR.INVALID_TYPE.code,format(ERROR.INVALID_TYPE,[typeof newOnMessageArrived, "onMessageArrived"]));
    	};
        
    	this._getTrace = function() { return client.traceFunction; };
    	this._setTrace = function(trace) { return client._setTrace(trace); };
	
        /**
		 * Connect this Messaging client to its server.
		 * 
		 * @name Messaging.Client#connect
		 * @function
		 * @param {Object} [connectOptions] attributes used with the connection.
		 * @param {number} [connectOptions.timeout] If the connect has not succeeded within
		 *         this number of seconds, it is deemed to have failed. The
		 *         default is 30 seconds. <br>It is also used as global timeout,
		 *		   If set Failure callback in subscribe or unsubscribe. 
         * @param {string} [connectOptions.userName] Authentication username for this connection.
		 * @param {string} [connectOptions.password] Authentication password for this connection.
		 * @param {Messaging.Message} [connectOptions.willMessage] sent by the server when the
		 *         client disconnects abnormally.
		 * @param {Number} [connectOptions.keepAliveInterval] the server disconnects this
		 *         client if there is no activity for this number of seconds.
		 *         The default value of 60 seconds is assumed if not set.
		 * @param {boolean} [connectOptions.cleanSession] if true(default) the client and
		 *         server persistent state is deleted on successful connect.
		 * @param {boolean} [connectOptions.useSSL] if present and true, use an TLS connection.
         * @param {object} [connectOptions.sslProperties] SSL properties for the SSL connection.
         *                 <br>It contains the following fields:
         *                   <ol>
         *                   <li>keyStorePath: a string indicate the path of key store file. Relative path in assets.
         *                   <li>keyStorePassword : key store password.
         *                   </ol>
		 * @param {object} [connectOptions.invocationContext] passed to the onSuccess callback
		 *         or onFailure callback.
		 * @param {function} [connectOptions.onSuccess] called when the connect
		 *         acknowledgement has been received from the server. A single
		 *         response object parameter is passed to the onSuccess callback
		 *         containing the following fields:
		 *         <ol>
		 *         <li>invocationContext as passed in to the onSuccess method
		 *         in the connectOptions.
		 *         </ol>
		 * @param {function} [connectOptions.onFailure] called when the connect request has
		 *         failed or timed out. A single response object parameter is
		 *         passed to the onFailure callback containing the following
		 *         fields:
		 *         <ol>
		 *         <li>invocationContext as passed in to the onFailure method
		 *         in the connectOptions.
		 *         <li>errorCode a number indicating the nature of the error.
		 *         <li>errorMessage text describing the error.
		 *         </ol>
		 * @config {Array} [connectOptions.hosts] If present this set of hostnames is tried in
		 *         order in place of the host and port parameter on the
		 *         constructor. The hosts and the matching ports are tried one
		 *         at at time in order until one of them succeeds.
		 * @config {Array} [connectOptions.ports] If present this is the set of port numbers
		 *         matching the host parameters.
		 * @throws {InvalidState}
		 *             if the client is not in disconnected state  and not set Failure callback.
		 *             The client must have received connectionLost or disconnected before
		 *             calling connect for a second or subsequent time.
		 */
        this.connect = function (connectOptions) {
        	connectOptions = connectOptions || {} ;
        	validate(connectOptions,  {timeout:"number",
				userName:"string", 
				password:"string", 
				willMessage:"object", 
				keepAliveInterval:"number", 
				cleanSession:"boolean", 
				useSSL:"boolean",
				sslProperties : "object",
				invocationContext:"object", 
				onSuccess:"function", 
				onFailure:"function",
	            hosts:"object",
      		    ports:"object"});

        	// If no keep alive interval is set, assume 60 seconds.
            if (connectOptions.keepAliveInterval === undefined)
            	connectOptions.keepAliveInterval = 60;

        	if (connectOptions.willMessage) {
                if (!(connectOptions.willMessage instanceof Message))
            	   // throw new Error(format(ERROR.INVALID_TYPE, [connectOptions.willMessage, "connectOptions.willMessage"]));
            		reportError(ERROR.INVALID_TYPE.code,
            					format(ERROR.INVALID_TYPE, [connectOptions.willMessage, "connectOptions.willMessage"]),
            					connectOptions.onFailure);
                // The will message must have a payload that can be represented
				// as a string.
                // Cause the willMessage to throw an exception if this is not
				// the case.
		  
            	connectOptions.willMessage.stringPayload;
            	
            	if (typeof connectOptions.willMessage.destinationName === "undefined")
                	reportError(ERROR.INVALID_TYPE.code,
                		format(ERROR.INVALID_TYPE, [typeof connectOptions.willMessage.destinationName, "connectOptions.willMessage.destinationName"]),
                		connectOptions.onFailure);
        	}
        	if (typeof connectOptions.cleanSession === "undefined")
        		connectOptions.cleanSession = true;
    		if (connectOptions.sslProperties) {
                validate(connectOptions.sslProperties, {
                    keyStorePath : "string",
                    keyStorePassword : "string",
                },connectOptions.onFailure);
		    }

        	if (connectOptions.hosts) {
        		if (!connectOptions.ports)
        			//throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
        			reportError(ERROR.INVALID_ARGUMENT.code,format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]),connectOptions.onFailure);
        		if (!(connectOptions.hosts instanceof Array) )
        			//throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));
        			reportError(ERROR.INVALID_ARGUMENT.code,format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]),connectOptions.onFailure);
        		if (!(connectOptions.ports instanceof Array) )
        			//throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
        			reportError(ERROR.INVALID_ARGUMENT.code,format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]),connectOptions.onFailure);
        		if (connectOptions.hosts.length <1 )
        			//throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));
        			reportError(ERROR.INVALID_ARGUMENT.code,format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]),connectOptions.onFailure);
        		if (connectOptions.hosts.length != connectOptions.ports.length)
        			//throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
        			reportError(ERROR.INVALID_ARGUMENT.code,format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]),connectOptions.onFailure);
        		for (var i = 0; i<connectOptions.hosts.length; i++) {
        			if (typeof connectOptions.hosts[i] !== "string")
        	        	//throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
        	        	reportError(ERROR.INVALID_TYPE.code,format(ERROR.INVALID_TYPE, [typeof connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]),connectOptions.onFailure);
        			if (typeof connectOptions.ports[i] !== "number" || connectOptions.ports[i] < 0)
        	        	//throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.ports[i], "connectOptions.ports["+i+"]"]));
        	        	reportError(ERROR.INVALID_TYPE.code,format(ERROR.INVALID_TYPE, [typeof connectOptions.ports[i], "connectOptions.ports["+i+"]"]),connectOptions.onFailure);
        	    }
        	}

			if (/\s/.test(connectOptions.userName))  // Check for whitespace
		    	  //throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.userName, "connectOptions.userName"]));	
		    	  reportError(ERROR.INVALID_ARGUMENT.code,format(ERROR.INVALID_ARGUMENT, [connectOptions.userName, "connectOptions.userName"]),connectOptions.onFailure);	
			
        	client.connect(connectOptions);
        };
     
        /**
		 * Subscribe for messages, request receipt of a copy of messages sent to
		 * the destinations described by the filter.
		 * 
		 * @name Messaging.Client#subscribe
		 * @function
		 * @param {string}
		 *            filter describing the destinations to receive messages
		 *            from. <br>
		 * @param {object}
		 *            [subscribeOptions] used to control the subscription, as
		 *            follows:
		 *            <p>
		 * @param {number} [subscribeOptions.qos] the maiximum qos of any publications sent as a
		 *         result of making this subscription.
		 * @param {object} [subscribeOptions.invocationContext] passed to the onSuccess callback
		 *         or onFailure callback.
		 * @param {function} [subscribeOptions.onSuccess] called when the subscribe
		 *         acknowledgement has been received from the server. A single
		 *         response object parameter is passed to the onSuccess callback
		 *         containing the following fields:
		 *         <ol>
		 *         <li>invocationContext if set in the subscribeOptions.
		 *         </ol>
		 * @param {function} [subscribeOptions.onFailure] called when the subscribe request has
		 *         failed or timed out. A single response object parameter is
		 *         passed to the onFailure callback containing the following
		 *         fields:
		 *         <ol>
		 *         <li>invocationContext if set in the subscribeOptions.
		 *         <li>errorCode a number indicating the nature of the error.
		 *         <li>errorMessage text describing the error.
		 *         </ol>
		 * @throws {InvalidState}
		 *             if the client is not in connected state and not set Failure callback.
		 */
        this.subscribe = function (filter, subscribeOptions) {
        	if (typeof filter !== "string")
        		//throw new Error(format(ERROR.INVALID_ARGUMENT, [filter]));
        		reportError(ERROR.INVALID_ARGUMENT.code,format(ERROR.INVALID_ARGUMENT, [filter]),subscribeOptions.onFailure);
        	subscribeOptions = subscribeOptions || {} ;
        	validate(subscribeOptions,  {qos:"number", 
        		                         invocationContext:"object", 
        		                         onSuccess:"function", 
        		                         onFailure:"function",
        		                        });
										
        	if (typeof subscribeOptions.qos !== "undefined" 
        		&& !(subscribeOptions.qos === 0 || subscribeOptions.qos === 1 || subscribeOptions.qos === 2 ))
    			//throw new Error(format(ERROR.INVALID_ARGUMENT, [subscribeOptions.qos, "subscribeOptions.qos"]));
    			reportError(ERROR.INVALID_ARGUMENT.code,format(ERROR.INVALID_ARGUMENT, [subscribeOptions.qos, "subscribeOptions.qos"]),subscribeOptions.onFailure);
            client.subscribe(filter, subscribeOptions);
        };

        /**
		 * Unsubscribe for messages, stop receiving messages sent to
		 * destinations described by the filter.
		 * 
		 * @name Messaging.Client#unsubscribe
		 * @function
		 * @param {string}
		 *            filter describing the destinations to receive messages
		 *            from.
		 * @param {object}
		 *            [unsubscribeOptions] used to control the subscription, as
		 *            follows:
		 *            <p>
		 * @param {object} [unsubscribeOptions.invocationContext] passed to the onSuccess callback
		 *         or onFailure callback.
		 * @param {function} [unsubscribeOptions.onSuccess] called when the unsubscribe
		 *         acknowledgement has been receive dfrom the server. A single
		 *         response object parameter is passed to the onSuccess callback
		 *         containing the following fields:
		 *         <ol>
		 *         <li>invocationContext if set in the unsubscribeOptions.
		 *         </ol>
		 * @param {function} [unsubscribeOptions.onFailure] called when the unsubscribe request
		 *         has failed or timed out. A single response object parameter
		 *         is passed to the onFailure callback containing the following
		 *         fields:
		 *         <ol>
		 *         <li>invocationContext if set in the unsubscribeOptions.
		 *         <li>errorCode a number indicating the nature of the error.
		 *         <li>errorMessage text describing the error.
		 *         </ol>
		 * @throws {InvalidState}
		 *             if the client is not in connected state and not set Failure callback.
		 */
        this.unsubscribe = function (filter, unsubscribeOptions) {
        	if (typeof filter !== "string")
        		//throw new Error(format(ERROR.INVALID_ARGUMENT, [filter]));
        		reportError(ERROR.INVALID_ARGUMENT.code,format(ERROR.INVALID_ARGUMENT, [filter]),unsubscribeOptions.onFailure);
        	unsubscribeOptions = unsubscribeOptions || {} ;
        	validate(unsubscribeOptions,  {invocationContext:"object", 
        		                           onSuccess:"function", 
        		                           onFailure:"function",
        		                          });
										  
            client.unsubscribe(filter, unsubscribeOptions);
        };

        /**
		 * Send a message to the consumers of the destination in the Message.
		 * 
		 * @name Messaging.Client#send
		 * @function
		 * @param {object}
		 *            [sendOptions] used with the operation, as follows:
		 *            <p>
		 * @param {object} [sendOptions.invocationContext] passed to the onSuccess callback
		 *         or onFailure callback.
		 * @param {function} [sendOptions.onSuccess] called when the send has been
		 *         performed by the client (NB at this stage the message has not
		 *         necessarily been received by the server).
		 * @param {function} [sendOptions.onFailure] called when the send has failed or
		 *         timed out.
		 * @throws {InvalidState}
		 *             if the client is not in connected state and not set Failure callback.
		 */
		this.send = function(message, sendOptions) {
			sendOptions = sendOptions || {};
			validate(sendOptions, {
				invocationContext : "object",
				onSuccess : "function",
				onFailure : "function"
			});

            if (!(message instanceof Message))
               // throw new Error("Invalid argument:"+typeof message);
           		reportError(ERROR.INVALID_ARGUMENT.code,format(ERROR.INVALID_ARGUMENT, [typeof message,"message"]),sendOptions.onFailure);
            if (typeof message.destinationName === "undefined")
            	//throw new Error("Invalid parameter Message.destinationName:"+message.destinationName);
            	reportError(ERROR.INVALID_ARGUMENT.code,format(ERROR.INVALID_ARGUMENT, [typeof message.destinationName,"destinationName"]),sendOptions.onFailure);
           
			client.send(message, sendOptions);
        };
        
        /**
		 * Normal disconnect of this Messaging client from its server.
		 * 
		 * @name Messaging.Client#disconnect
		 * @function
		 * @param {object} [disconnectOptions] used with the operation, as follows:
		 * @param {object} [disconnectOptions.invocationContext] passed to the onSuccess callback
		 *         or onFailure callback.
		 * @param {function} [disconnectOptions.onSuccess] called when the operation has been
		 *         performed by the client
		 * @param {function} [disconnectOptions.onFailure] called when the operation has failed
		 *         or timed out.
		 */
		this.disconnect = function(disconnectOptions) {
			disconnectOptions = disconnectOptions || {};
			validate(disconnectOptions, {
				invocationContext : "object",
				onSuccess : "function",
				onFailure : "function"
			});

			client.disconnect(disconnectOptions);
		};

        /**
		 * Get the contents of the trace log.
		 * 
		 * @name Messaging.Client#getTraceLog
		 * @function
		 * @return {Object[]} tracebuffer containing the time ordered trace
		 *         records.
		 */
        this.getTraceLog = function () {
        	return client.getTraceLog();
        }
        
        /**
		 * Start tracing.
		 * 
		 * @name Messaging.Client#startTrace
		 * @function
		 */
        this.startTrace = function () {
        	client.startTrace();
        };
        
        /**
		 * Stop tracing.
		 * 
		 * @name Messaging.Client#stopTrace
		 * @function
		 */
        this.stopTrace = function () {
            client.stopTrace();
        };
    };

    Client.prototype = {
        get host() { return this._getHost(); },
        set host(newHost) { this._setHost(newHost); },
        	
        get port() { return this._getPort(); },
        set port(newPort) { this._setPort(newPort); },
        	
        get clientId() { return this._getClientId(); },
        set clientId(newClientId) { this._setClientId(newClientId); },

        get onConnectionLost() { return this._getOnConnectionLost(); },
        set onConnectionLost(newOnConnectionLost) { this._setOnConnectionLost(newOnConnectionLost); },

        get onMessageDelivered() { return this._getOnMessageDelivered(); },
        set onMessageDelivered(newOnMessageDelivered) { this._setOnMessageDelivered(newOnMessageDelivered); },
        
        get onMessageArrived() { return this._getOnMessageArrived(); },
        set onMessageArrived(newOnMessageArrived) { this._setOnMessageArrived(newOnMessageArrived); },

        get trace() { return this._getTrace(); },
        set trace(newTraceFunction) { this._setTrace(newTraceFunction); }	
    };

    /**
	 * An application message, sent or received.
	 * <p>
	 * All attributes may be null, which implies the default values.
	 * 
	 * @name Messaging.Message
	 * @constructor
	 * @param {String|ArrayBuffer|Array} payload The message data to be sent.
	 *            <p>
	 * @property {string} payloadString <i>read only</i> The payload as a
	 *           string if the payload consists of valid UTF-8 characters.
	 * @property {ArrayBuffer} payloadBytes <i>read only</i> The payload as an
	 *           ArrayBuffer (or an Array of numbers if ArrayBuffers aren't
	 *           supported)
	 *           <p>
	 * @property {string} destinationName <b>mandatory</b> The name of the
	 *           destination to which the message is to be sent (for messages
	 *           about to be sent) or the name of the destination from which the
	 *           message has been received. (for messages received by the
	 *           onMessage function).
	 *           <p>
	 * @property {number} qos The Quality of Service used to deliver the
	 *           message.
	 *           <ol>
	 *           <li>0 Best effort (default).</li>
	 *           <li>1 At least once.</li>
	 *           <li>2 Exactly once.</li>
	 *           </ol>
	 *           <p>
	 * @property {Boolean} retained If true, the message is to be retained by
	 *           the server and delivered to both current and future
	 *           subscriptions. If false the server only delivers the message to
	 *           current subscribers, this is the default for new Messages. A
	 *           received message has the retained boolean set to true if the
	 *           message was published with the retained boolean set to true and
	 *           the subscription was made after the message has been published.
	 *           <p>
	 * @property {Boolean} duplicate <i>read only</i> If true, this message
	 *           might be a duplicate of one which has already been received.
	 *           This is only set on messages received from the server.
	 * 
	 */


    var Message = function (newPayload) {  
    	var payload;
		var arrayBufferSupported = false;

		if ("ArrayBuffer" in global && global["ArrayBuffer"] !== null)
			arrayBufferSupported = true;

		try
		{
    	  if ( typeof newPayload === "string" 
    		|| newPayload instanceof Array
    		|| newPayload instanceof ArrayBuffer
    		|| newPayload instanceof Int8Array
    		|| newPayload instanceof Uint8Array
    		|| newPayload instanceof Int16Array
    		|| newPayload instanceof Uint16Array
    		|| newPayload instanceof Int32Array
    		|| newPayload instanceof Uint32Array
    		|| newPayload instanceof Float32Array
    		|| newPayload instanceof Float64Array
    	  ) {
    		  payload = newPayload;
    	  } else {
    		  throw (format(ERROR.INVALID_ARGUMENT, [newPayload, "newPayload"]));
    	  }
		} catch(Error)   // if the environment doesn't support one of the
							// Array types
		{
			throw (format(ERROR.INVALID_ARGUMENT, [newPayload, "newPayload"])); 
		}

		// return the payload as a string, if possible. Will throw an error if
		// this isn't possible
    	this._getPayloadString = function () {
    		if (typeof payload === "string")
       			return payload;
       		else
       			return parseUTF8(payload, 0, payload.length); 
    	};

		// return the payload as an ArrayBuffer (if supported), else a
		// conventional Array of numbers
    	this._getPayloadBytes = function() {
			if (arrayBufferSupported) {	
				if (typeof payload === "string") {
					var byteStream = new Uint8Array(UTF8Length(payload)); 
					stringToUTF8(payload, byteStream, 0);
					return byteStream;
				} 
				else if (typeof payload === "Array")	{
					var byteStream = new Uint8Array(payload); 
					return byteStream;
				}
				else
					return payload;
			}
			else
				return this._getPayloadArray();
		};

		// Internal function to return the payload as a conventional Array of
		// numbers.
		// Makes a copy of the original payload

		this._getPayloadArray = function() {
			if (typeof payload === "string") {
				var byteStream = new Array();
				stringToUTF8(payload, byteStream, 0);
				return byteStream;
			} else {
				return Array.apply(null, payload);
			};
		};

    	var destinationName = undefined;
    	this._getDestinationName = function() { return destinationName; };
    	this._setDestinationName = function(newDestinationName) { 
    		if (typeof newDestinationName === "string")
    		    destinationName = newDestinationName;
    		else 
    			throw new Error(format(ERROR.INVALID_ARGUMENT, [newDestinationName, "newDestinationName"]));
    	};
    	    	
    	var qos = 0;
    	this._getQos = function() { return qos; };
    	this._setQos = function(newQos) { 
    		if (newQos === 0 || newQos === 1 || newQos === 2 )
    			qos = newQos;
    		else 
    			throw new Error("Invalid argument:"+newQos);
    	};

    	var retained = false;
    	this._getRetained = function() { return retained; };
    	this._setRetained = function(newRetained) { 
    		if (typeof newRetained === "boolean")
    		    retained = newRetained;
    		else 
    			throw new Error(format(ERROR.INVALID_ARGUMENT, [newRetained, "newRetained"]));
    	};
    	
    	var duplicate = false;
    	this._getDuplicate = function() { return duplicate; };
    	this._setDuplicate = function(newDuplicate) { duplicate = newDuplicate; };
    };
    
    Message.prototype = {
    	get payloadString() { return this._getPayloadString(); },
    	get payloadBytes() { return this._getPayloadBytes(); },
    	
    	get destinationName() { return this._getDestinationName(); },
    	set destinationName(newDestinationName) { this._setDestinationName(newDestinationName); },
    	
    	get qos() { return this._getQos(); },
    	set qos(newQos) { this._setQos(newQos); },

    	get retained() { return this._getRetained(); },
    	set retained(newRetained) { this._setRetained(newRetained); },

    	get duplicate() { return this._getDuplicate(); },
    	set duplicate(newDuplicate) { this._setDuplicate(newDuplicate); }
    };
       
    // Module contents.
    return {
        Client: Client,
        Message: Message
    };
})(window);

//**** Adapter Code *** Made this Plugin the same as iOS one. Remove below code if official iOS plugin release.
var MQTTPlugin = function(url, port, clientId){
	var that = {};
	console.log(url + "," + port);
	var client = new Messaging.Client(url, port, clientId);
	//Enable trace.
//	client.startTrace();
	
	//Set essential options for mobile application.
	var connectionOptions = new Object();
	connectionOptions.cleanSession = false;
	connectionOptions.keepAliveInterval = 60;
	
	that.connect = function(mqttOptions, onsuccess, onfailure){
		connectionOptions.onSuccess = onsuccess;
		connectionOptions.onFailure = onfailure;
		console.log("Connect to client....");
		client.connect(connectionOptions);
	};
	
	that.setMessageCallback = function(callback){
		client.onMessageArrived = function(data){
			data.topic = data.destinationName;
			//Add topic field to isloate the change.
			callback(data);
		};
	};
	
	that.setBinaryTopic = function(topic, extension){	
		var clientHandle = url + ":" + port + ":" + clientId;
		console.log("setBinaryTopic is called. clientHandle = " + clientHandle);
		cordova.exec(null, error, "MqttPlugin",
				"setBinaryTopic", [clientHandle, topic, extension]);
	};
	
	function error(data){
		console.log(JSON.stringify(data));
	}
	
	that.disconnect = function(){
		client.disconnect();
	};
	
	that.subscribe = function(topics, qoss){
		var i;
		if(topics.length != qoss.length){
			throw new Error("Error! Length of topics and qoss are different.");
		}
		console.log("Start to subscribe topic one by one.");
		var subscriptionOptions = {};		
		for(i = 0; i < topics.length; ++i){
			subscriptionOptions.qos = qoss[i];
			client.subscribe(topics[i], subscriptionOptions);
		}
	};
	
	that.unsubscribe = function(topics){
		var i;
		for(i = 0; i < topics.length; ++i){			
			client.unsubscribe(topics[i]);
		}
	};
	
	that.publish = function(topic, message, qos, onsuccess, onfailure){
//		console.log("Trace:\n" + client.getTraceLog());
//		client.startTrace();
		var msg = new Messaging.Message(message);
		msg.destinationName = topic;
		msg.qos = qos;
		msg.isBinary = false;
		
		var sendOptions = {};
		sendOptions.onSuccess = onsuccess;
		sendOptions.onFailure = onfailure;
		console.log("Publish message....");
		client.send(msg, sendOptions);
	};	
	
	that.publishBinaryFile = function(topic, filePath, qos, onsuccess, onfailure){
		var msg = new Messaging.Message(filePath);
		msg.destinationName = topic;
		msg.qos = qos;
		msg.isBinary = true;
		
		var sendOptions = {};
		sendOptions.onSuccess = onsuccess;
		sendOptions.onFailure = onfailure;
		console.log("Publish message from file....");
		client.send(msg, sendOptions);
	};
	
	return that;
};