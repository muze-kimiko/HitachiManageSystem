
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
	
	//用于更新
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
	
	
	// Common initialization code goes here
	WL.App.overrideBackButton(backFunc);
	function backFunc(){
		/*var num=ViewArray.length;
		if(num>0){
			var length = ViewArray.length-1;
			var viewId = ViewArray[length].ViewId;
			var ViewName = ViewArray[length].ViewName;
			
			var activeViewId = Ext.Viewport.getActiveItem().id;
			
			var main = Ext.getCmp(viewId);
			if(!main){
				 main = Ext.create(ViewName);
			}
			Ext.Viewport.setActiveItem(main);
			var activeView = Ext.getCmp(activeViewId);
			if(activeView)
				activeView.destroy();
			ViewArray.splice(ViewArray.length-1,1);
		}else{*/
			navigator.notification.confirm('退出系统？',function(btn){
				if(btn ==2){
					WL.App.close();
					/*var main = Ext.getCmp('padlogin_id');
		      	 	if(!main){
		      		 main = Ext.create('HelcPAD.view.login.PADLogin');
		      	 	}
		      	 	Ext.Viewport.setActiveItem(main);
		      	 	ViewArray.splice(ViewArray.length-1,1);
		      	 	ViewArray = [];*/
				}else{
					return;
				};
			},"营业移动信息化平台","取消,确定");
		//}
	}
	
WL.EncryptedCache.open("gshc_key", true, onComplete, onError);
	
	function onComplete(status){
		console.log('创建和打开加密高速缓存成功');
		//获取上次登录设置的定时时间
		WL.EncryptedCache.read("SetTimer", onReadSuccess, onReadFailure);
	    function onReadSuccess(value){
	    	if(value==null){
	    		console.log('系统启动获取上次登录设置的定时时间成功,但上次未设置，故使用默认值：'); 
	    	}else{
	    		settime=value;
	    		console.log('系统启动获取上次登录设置的定时时间成功：'+value); 
	    	} 
	    }
	    
	    function onReadFailure(status){
	 	   console.log('系统启动获取上次登录设置的定时时间失败'); 
	    }
	    
	  //获取上次登录账号
		WL.EncryptedCache.read("Loginuser", onReaduserSuccess, onReaduserFailure);
	    function onReaduserSuccess(value){
	    	if(value==null){
	    		console.log('系统未记录登录账号'); 
	    	}else{
	    		app_username=value;
	    		checktoggle=true;
	    		//用于退回登陆界面使用
	    		cc.log(typeof(Ext.getCmp('username')));
	    		if(typeof(Ext.getCmp('username'))!='undefined'){
	    			console.log('username is object');
	    			Ext.getCmp('username').setValue(app_username);
	    			//显示记住状态
		    		Ext.getCmp('checkuser').toggle();
	    		}
	    		console.log('系统获取上次登录账号成功：'+value);
	    	} 
	    }
	    
	    function onReaduserFailure(status){
	 	   console.log('系统获取上次登录账号失败'); 
	    }  
	} 
	function onError(status){
//		busyIndicator.hide();
		switch(status){
		case WL.EncryptedCache.ERROR_KEY_CREATION_IN_PROGRESS:
			//alert('ERROR:KEY_CREATION_IN_PROGRESS');
			console.log('ERROR:KEY_CREATION_IN_PROGRESS');   
			break;
		case WL.EncryptedCache.ERROR_LOCAL_STORAGE_NOT_SUPPORTED:
			//alert('ERROR:LOCAL_STORAGE_NOT_SUPPORTED');
			console.log('ERROR:LOCAL_STORAGE_NOT_SUPPORTED');   
			break;
		case WL.EncryptedCache.ERROR_NO_EOC:
			//alert('ERROR:NO_EOC');
			console.log('ERROR:NO_EOC');   
			break;
		case WL.EncryptedCache.ERROR_COULD_NOT_GENERATE_KEY:
			//alert('ERROR:COULD_NOT_GENERATE_KEY');
			console.log('ERROR:COULD_NOT_GENERATE_KEY');   
			break;
		case WL.EncryptedCache.ERROR_CREDENTIALS_MISMATCH:
			//alert('ERROR:CREDENTIALS_MISMATCH');
			console.log('ERROR:CREDENTIALS_MISMATCH');   
			break;  
		} 
	}
	
	
}

/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}