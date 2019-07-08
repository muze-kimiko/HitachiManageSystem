//全局变量
var loginuser = null;
var checktoggle = null;
var ViewArray = [];
var roleString = null;
var addServiceRole = null;
var reLoginOvlay = null;
var logID = "UNKONW";
var deviceIdt=null;
/*
var LDAPRealmChallengeHandler = WL.Client.createChallengeHandler("LDAPRealm");

LDAPRealmChallengeHandler.isCustomResponse = function(response){
	console.log('LDAPRealmChallengeHandler.isCustomResponse');
	if(!response || !response.responseText){
		console.log('!response || !response.responseText');
		return false;
	}
	var idx = response.responseText.indexOf("j_security_check");
	console.log('idx = ' + idx);
	if(idx >= 0){
		console.log('idx >= 0');
		return true;
	}
	return false;
};

LDAPRealmChallengeHandler.handleChallenge = function(response){
	console.log('LDAPRealmChallengeHandler.handleChallenge');
	
};

LDAPRealmChallengeHandler.submitLoginFormCallback = function(response){
	console.log('LDAPRealmChallengeHandler.submitLoginFormCallback');
	var isLoginFormResponse = LDAPRealmChallengeHandler.isCustomResponse(response);
	if(isLoginFormResponse){
		console.log('isLoginFormResponse = true');
		LDAPRealmChallengeHandler.handleChallenge(response);
	}else{
		console.log('isLoginFormResponse = false');
		LDAPRealmChallengeHandler.submitSuccess();
		console.log('Login OK');
	}
};
*/

this.myBusyIndicator=new WL.BusyIndicator('content',{text:"登录中"});
this.myLoading=new WL.BusyIndicator('content',{text:"加载数据中"});
this.myProcessing=new WL.BusyIndicator('content',{text:"处理中"});

Ext.application({ 
	name : "HelcApprove",
	views : ['LoginView','MainMenu',
	         'Seting.SetingMain',
	         'Seting.LoginHistory',
	         'Seting.OperationHistory',
	         'Seting.UserHistory',
	         'Seting.ChangePassword',
	         
	         'TBJ.TBJ_List',
	         'TBJ.TBJ_Approve',
	         
	         'ChaoDianZengFei.CDZF_List',
	         'ChaoDianZengFei.CDZF_Approve',],
	         
 	stores : [
 	          'AddService.AddServiceApprovedStore',
 	          'AddService.CDZFApprovedStore',
 	          'tbj.tbjListStore',
 	          'tbj.tbjApprovedListStore',
 	          'tbj.tbjApproveFinishListStore'
 	          ],
 	          
	models : [],
	
	controllers : ["LoginCtrl","MainMenuCtrl",
	               "Seting.SetingMainCtrl",
	               
	               "TBJ.TBJMainCtrl",
	               "TBJ.TBJListCtrl",
	               "TBJ.TBJMainOtherCtrl",
	               "TBJ.TBJApprovedCtrl",
	               "TBJ.TBJApproveFinishCtrl",
	               
	               "ChaoDianZengFei.CDZFMainCtrl",
	               "ChaoDianZengFei.CDZF_ApproveCtrl",
	               "ChaoDianZengFei.CDZFMainOtherCtrl",
	               ],
 
	launch : function() {
		//Ext.Viewport.add(Ext.create('HelcApprove.view.testView'));
		//return ;
		Ext.Viewport.add(Ext.create('HelcApprove.view.LoginView'));
		Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
		
		function show(i){
			alert(i);
		}
		//创建和打开加密高速缓存
		/*WL.EncryptedCache.open("gshc_helcapprove_key", true, onComplete, onError);
		
		function onComplete(status){
			console.log('创建和打开加密高速缓存成功');
			//获取上次登录账号
			WL.EncryptedCache.read("Loginuser", onReaduserSuccess, onReaduserFailure);
		    function onReaduserSuccess(value){
		    	if(value==null){
		    		console.log('系统未记录登录账号'); 
		    		Ext.getCmp('checkuser').setValue(0);
		    	}else{
		    		loginuser=value;
		    		checktoggle="true";
		    		if(typeof(Ext.getCmp('username'))!='undefined'){
		    			console.log('username is object');
		    			Ext.getCmp('username').setValue(loginuser);
			    		Ext.getCmp('checkuser').setValue(1);
		    		}
		    		console.log('系统获取上次登录账号成功：'+value);
		    	} 
		    }
		    
		    function onReaduserFailure(status){
		 	   console.log('系统获取上次登录账号失败'); 
		    }  
		} 
		function onError(status){
			switch(status){
			case WL.EncryptedCache.ERROR_KEY_CREATION_IN_PROGRESS:
				console.log('ERROR:KEY_CREATION_IN_PROGRESS');   
				break;
			case WL.EncryptedCache.ERROR_LOCAL_STORAGE_NOT_SUPPORTED:
				console.log('ERROR:LOCAL_STORAGE_NOT_SUPPORTED');   
				break;
			case WL.EncryptedCache.ERROR_NO_EOC:
				console.log('ERROR:NO_EOC');   
				break;
			case WL.EncryptedCache.ERROR_COULD_NOT_GENERATE_KEY:
				console.log('ERROR:COULD_NOT_GENERATE_KEY');   
				break;
			case WL.EncryptedCache.ERROR_CREDENTIALS_MISMATCH:
				console.log('ERROR:CREDENTIALS_MISMATCH');   
				break;  
			} 
		}*/
		
		/**/
		//zhj
		//var deviceId = device.uuid;
		if(Ext.os.is.iOS){
			deviceIdt = device.uuid;
			//alert("测试:"+deviceIdt);
			//deviceIdt="12645";
			//var deviceId='A9815426-53A4-4264-A6AF-853CFE8A37B0';
			Ext.getCmp('DeviceNo').setValue(deviceIdt);
		}
//		var deviceId = device.uuid;
	},
	
	handleOrientationChange: function(viewport, orientation, width, height){
            document.body.style.marginTop = "20px";
            Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);
	},
	
});
