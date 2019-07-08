
/* JavaScript content from js/main.js in folder common */
function wlCommonInit(){

	/*
	 * Application is started in offline mode as defined by a connectOnStartup property in initOptions.js file.
	 * In order to begin communicating with Worklight Server you need to either:
	 * 
	 * 1. Change connectOnStartup property in initOptions.js to true. 
	 *    This will make Worklight framework automatically attempt to connect to Worklight Server as a part of application start-up.
	 *    Keep in mind - this may increase application start-up time.
	 *    
	 * 2. Use WL.Client.connect() API once connectivity to a Worklight Server is required. 
	 *    This API needs to be called only once, before any other WL.Client methods that communicate with the Worklight Server.
	 *    Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here

	

	
	
}

function isPushSupported() {
	var isSupported = false;
	if (WL.Client.Push){
		isSupported = WL.Client.Push.isPushSupported();
	}	
	alert(isSupported);
}

function isPushSubscribed() {
	var isSubscribed = false;
	if (WL.Client.Push){
		isSubscribed = WL.Client.Push.isSubscribed('myPush');
	}
	alert(isSubscribed);
}

//---------------------------- Set up push notifications -------------------------------
if (WL.Client.Push) {	
	WL.Client.Push.onReadyToSubscribe = function() {
		alert("onReadyToSubscribe");
		
//		$('#SubscribeButton').removeAttr('disabled');
//		$('#UnsubscribeButton').removeAttr('disabled');

		WL.Client.Push.registerEventSourceCallback(
			"myPush", 
			"PushAdapter_BPM", 
			"PushEventSource_BPM", 
			pushNotificationReceived);
	};
}

// --------------------------------- Subscribe ------------------------------------
function doSubscribe() {
	alert('in do!');
	WL.Client.Push.subscribe("myPush", {
		onSuccess: doSubscribeSuccess,
		onFailure: doSubscribeFailure
	});
}

function doSubscribeSuccess() {
	alert("doSubscribeSuccess");
}

function doSubscribeFailure() {
	alert("doSubscribeFailure");
}

//------------------------------- Unsubscribe ---------------------------------------
function doUnsubscribe() {
	WL.Client.Push.unsubscribe("myPush", {
		onSuccess: doUnsubscribeSuccess,
		onFailure: doUnsubscribeFailure
	});
}

function doUnsubscribeSuccess() {
	alert("doUnsubscribeSuccess");
}

function doUnsubscribeFailure() {
	alert("doUnsubscribeFailure");
}

//------------------------------- Handle received notification ---------------------------------------
function pushNotificationReceived(props, payload) {
	alert("pushNotificationReceived invoked");
	alert("props :: " + JSON.stringify(props));
	alert("payload :: " + JSON.stringify(payload));
}


/* JavaScript content from js/main.js in folder iphone */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}