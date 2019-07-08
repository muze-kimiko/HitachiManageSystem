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
	
	//创建和打开加密高速缓存
	
	WL.EncryptedCache.open("gshc_helcapprove_key", true, onComplete, onError);
	
	function onComplete(status){
		console.log('创建和打开加密高速缓存成功');
		//获取上次登录账号
		WL.EncryptedCache.read("Loginuser", onReaduserSuccess, onReaduserFailure);
	    function onReaduserSuccess(value){
	    	if(value==null){
	    		console.log('系统未记录登录账号'); 
	    	}else{
	    		loginuser=value;
	    		checktoggle="true";
	    		if(typeof(Ext.getCmp('username'))!='undefined'){
	    			console.log('username is object');
	    			Ext.getCmp('username').setValue(loginuser);
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
	}
	
	// 进入后台 ios
	/*
	WL.App.BackgroundHandler.setOnAppEnteringBackground (function() {
		alert("aa");
	});
	*/
	
	// 从后台运行返回到界面 ios （重新登陆）
	if(Ext.os.is.iOS){
		WL.App.BackgroundHandler.setOnAppEnteringForeground (function () {
		
			// 如果当前页面时登陆页面，则不弹出登陆界面
			if (Ext.Viewport.getActiveItem().id == "login") {
				return ;
			}
			if(!reLoginOvlay){
				reLoginOvlay=Ext.Viewport.add({
		   		     xtype:'container',
		   		     id:'reLoginView',
		   		     style:'height:30%;width:80%;',
			         hideOnMaskTap: false,
			         centered: true,
			         modal: true,
			         items: [{
			                xtype: 'formpanel',
			                id:'login_image_formpanel_rest',
			                height: 260,
			                margin: '100 auto 0 auto',
			                width: 532,
			                scrollable: false,
			                items: [
			                    {
			                        xtype: 'toolbar',
			                        docked: 'top',
			                        title: '请重新登录审批系统'
			                    },
			                    {
			                        xtype: 'fieldset',
			                        id:'login_fieldset_rest',
			                        margin: '30 30 0 30',
			                        items: [
			                            {
			                                xtype: 'passwordfield',
			                                id : 'password_rest', 
			                                label:'K',
										    labelCls: 'login-icon',
										    labelWidth: 80,
			                                placeHolder: '密码',
			                                value: ''
			                            }
			                        ]
			                    },
			                    {
			                        xtype: 'button',
			                        id : "loginButton_rest",
			                        margin: '20 30 0 30',
			                        height: 40,
			                        ui: 'blue',
			                        text: '登　录'
			                    }
			                ]
			            }]
	   		 	});
		   	}
	   		Ext.getCmp("hf_isRestLogin").setValue("1");
			Ext.getCmp("password_rest").setValue('');
	   		reLoginOvlay.show();
		
		});
	}

	
}