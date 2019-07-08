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

	WL.EncryptedCache.open("HelcBPM_key", true, onComplete, onError);

	WL.Client.connect({
		onSuccess: function(){
//			Ext.toast('服务器连接正常！');
		},
		onFailure: function(){
			Ext.Msg.show({
				title: '温馨提示',
				message: '您的网络可能有问题，是否重试？',
				buttons: [{text:'取消', itemId:'no'},{text:'重试', itemId:'yes'}],
				fn: function(buttonId) {
					if(buttonId == 'yes'){
						WL.Client.reloadApp();
					}
				}
			});
		}
	});

	
	function onComplete(status) {
		console.log('创建和打开加密高速缓存成功');
		//获取上次登录设置的定时时间
		/*
		WL.EncryptedCache.read("SetTimer", onReadSuccess, onReadFailure);
		function onReadSuccess(value) {
			if (value == null) {
				console.log('系统启动获取上次登录设置的定时时间成功,但上次未设置，故使用默认值：');
			} else {
				settime = value;
				console.log('系统启动获取上次登录设置的定时时间成功：' + value);
			}
		}

		function onReadFailure(status) {
			console.log('系统启动获取上次登录设置的定时时间失败');
		}
		*/

		//获取上次登录账号
		WL.EncryptedCache.read("Loginuser", onReaduserSuccess, onReaduserFailure);
		function onReaduserSuccess(value) {
			if (value == null) {
				console.log('系统未记录登录账号');
			} else {
				loginuser = value;
				checktoggle = "true";
				if (typeof (Ext.getCmp('username_id')) != 'undefined') {
					console.log('username is object');
					Ext.getCmp('username_id').setValue(loginuser);
					Ext.getCmp('checkuser').toggle();
				}
				console.log('系统获取上次登录账号成功：' + value);
			}
		}

		function onReaduserFailure(status) {
			console.log('系统获取上次登录账号失败');
		}
	}
	function onError(status) {
		//    		busyIndicator.hide();
		switch (status) {
		case WL.EncryptedCache.ERROR_KEY_CREATION_IN_PROGRESS:
			//    			alert('ERROR:KEY_CREATION_IN_PROGRESS');
			console.log('ERROR:KEY_CREATION_IN_PROGRESS');
			break;
		case WL.EncryptedCache.ERROR_LOCAL_STORAGE_NOT_SUPPORTED:
			//    			alert('ERROR:LOCAL_STORAGE_NOT_SUPPORTED');
			console.log('ERROR:LOCAL_STORAGE_NOT_SUPPORTED');
			break;
		case WL.EncryptedCache.ERROR_NO_EOC:
			//    			alert('ERROR:NO_EOC');
			console.log('ERROR:NO_EOC');
			break;
		case WL.EncryptedCache.ERROR_COULD_NOT_GENERATE_KEY:
			//    			alert('ERROR:COULD_NOT_GENERATE_KEY');
			console.log('ERROR:COULD_NOT_GENERATE_KEY');
			break;
		case WL.EncryptedCache.ERROR_CREDENTIALS_MISMATCH:
			//    			alert('ERROR:CREDENTIALS_MISMATCH');
			console.log('ERROR:CREDENTIALS_MISMATCH');
			break;
		}
	}

	
	
}
WL.App.overrideBackButton(backFunc);
function backFunc(){
	navigator.notification.confirm("退出",function(btn){
			if(btn ==2){
	 			WL.App.close();
			}else{
				return;
			}
		},"OA审批流程系统","取消,确定");	
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

