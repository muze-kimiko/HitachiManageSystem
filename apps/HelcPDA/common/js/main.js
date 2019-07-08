var currentUrl;
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
	
WL.App.overrideBackButton(backFunc);
function stopService(){
		cordova.exec(function(res) {
			//WL.Toast.show('结束定时任务');
		}, function(err) {
			WL.Toast.show("错误:"+err);
		},"JSMapMain","关闭被动定位",[{USERID:userid,DeviceNo:(device.uuid).toUpperCase()}]); 
}
function backFunc(){ 
	// 首先判断如果正在Loadding就关闭Loadding
	/*
	 * 
	var lm_loadding = Ext.getCmp('lm_loadding');
	alert('bo1:'+lm_loadding.getHidden()+'   bo2:'+lm_loadding.isHidden());
	if(!lm_loadding.getHidden()) {
		lm_loadding.setHidden(true);
		return ;
	}
	
	if (myLoading.isVisible()){
		myLoading.hide();
		return;
	}*/
		if(typeof currentUrl!='undefined' && currentUrl!="" && currentUrl!=null)
		{
			var currentView;
			if(currentUrl!="")
			{
				var filename=currentUrl.substr(currentUrl.lastIndexOf('/')+1);
				var arr=filename.split('.');
				currentView=arr[0];
			}
			
			//alert(currentView);
			switch(currentView)
			{
				case "main":
					document.getElementById("exit").click();
					break;
				case "realtime":
					if(currentUrl.indexOf('from')>-1)
					{
						document.getElementById("realtime-external-back").click();
					}
					else
					{
						history.back();
					}
					break;
				case "ActivateTest":
					if(currentUrl.indexOf('from')>-1)
					{
						document.getElementById("ActivateTes-external-back").click();
					}
					else
					{
						history.back();
					}			
					break;
				default:
					history.back();
					break;
			};
	}
		else
	{

 	if(ViewArray.length==0){
 		if(Exit==0){
 			WL.Toast.show("再按一次  退出程序");
 			Exit++;
 			setInterval(function(){
 				Exit = 0;
 			},1000*2);
 		}else{
 			stopService();
 			WL.App.close();
 		}
 		
	 	}else if(ViewArray.length==1){
	 		var msg = '退出系统？';
	 		if(document.getElementById('menu_wtd_count') == null){
	 			if(Ext.getCmp('modules_dataview_id')._data[0].data != "0" && Ext.getCmp('modules_dataview_id')._data[0].data != "" && Ext.getCmp('modules_dataview_id')._data[0].data != "none" ){
	 				msg = '存在未提交数据！确定要退出系统？！';
	 			}
	 		}else{
	 			if (document.getElementById('menu_wtd_count').innerHTML != '0' && document.getElementById('menu_wtd_count').innerHTML != '') {
	 				msg = '存在未提交数据！确定要退出系统？！';
	 			}
	 		}
	 		
	 		navigator.notification.confirm(msg,function(btn){
	 			if(btn ==2){
	 				
	 				var query={tcode:userid+"help",tid:"help"};
	            	WL.JSONStore.get(collectionName).remove(query).then(function(){
					});
	 
	            	var main = Ext.getCmp('loginView');
	           	 	if(!main){
	           		 main = Ext.create('HelcPDA.view.LoginView');
	           	 	}
	           	    
	           	 	// 关闭定位
            		cordova.exec(function(rds){},function(){},'CommonPlugin','CloseGPS',[]);
            		
	           	 	// 销毁返回前的页面
	    			var ViewId = Ext.Viewport.getActiveItem().id;
	    			var viewName=Ext.getCmp(ViewId);
	    			if(viewName){
	    				viewName.destroy();
	    			}
                    
	           	 	Ext.Viewport.setActiveItem(main);
	           	 	ViewArray.splice(ViewArray.length-1,1);
	           	    
	           	 	if (commitTask!=null) {
	           	 		window.clearInterval(commitTask);
	           	 		commitTask = null;
	           	 	}
	           	 	
	           	 	stopService();
	           	 	// 取消MQTT订阅
	           	 	if (Ext.os.is.Android) {
	           	 		unsubscribeUser(userid);
	           	 	}
	 			}else{
	 				return;
	 			}
	 		},"日立办公系统","取消,确定");
 		}else{
 			//隐藏已打开的picker
 			var dateArray = Ext.ComponentQuery.query('datepickerfield');
 			for(var i =0;i<dateArray.length;i++){
 				if(typeof(Ext.getCmp(dateArray[i]._picker.id))=="undefined" || Ext.getCmp(dateArray[i]._picker.id).getHidden()==true){
 				}else{
 					Ext.getCmp(dateArray[i]._picker.id).setHidden(true);
 					return;
 				}
 			}
 			if(picker_show==''||picker_show==null||typeof(picker_show)=='undefined'){
					
 			}else{
 				if(picker_show.getHidden()==false){
 	 				picker_show.hide();
 	 				return;
 	 			}
 			}
            if(picker_show1==''||picker_show1==null||typeof(picker_show1)=='undefined'){
            		
            }else{
            	if(picker_show1.getHidden()==false){
     				picker_show1.hide();
     				return;
     			}
            }  		
 			
            //销毁已打开的，弹出显示查询结果的panel
            var Panel=Ext.getCmp('Panel_List_Id');
    		if(Panel){
    			Panel.destroy();
    			return;
    		}
 			
	 		var length = ViewArray.length-1;
	 		var viewId = ViewArray[length].ViewId;
	 		var ViewName = ViewArray[length].ViewName;
			var main = Ext.getCmp(viewId);
			if(!main){
				main = Ext.create(ViewName);
			}
		
			//销毁返回前的页面
			var ViewId = Ext.Viewport.getActiveItem().id;
			var viewName=Ext.getCmp(ViewId);
			if(viewName){
				viewName.destroy();
			}
			
			Ext.Viewport.setActiveItem(main);
			ViewArray.splice(ViewArray.length-1,1);
			
			if(ViewId=='SignPanel'){
				screen.lockOrientation('portrait-primary');
			}
 		};
 		

	}
	 	
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
//		busyIndicator.hide();
		switch(status){
		case WL.EncryptedCache.ERROR_KEY_CREATION_IN_PROGRESS:
//			alert('ERROR:KEY_CREATION_IN_PROGRESS');
			console.log('ERROR:KEY_CREATION_IN_PROGRESS');   
			break;
		case WL.EncryptedCache.ERROR_LOCAL_STORAGE_NOT_SUPPORTED:
//			alert('ERROR:LOCAL_STORAGE_NOT_SUPPORTED');
			console.log('ERROR:LOCAL_STORAGE_NOT_SUPPORTED');   
			break;
		case WL.EncryptedCache.ERROR_NO_EOC:
//			alert('ERROR:NO_EOC');
			console.log('ERROR:NO_EOC');   
			break;
		case WL.EncryptedCache.ERROR_COULD_NOT_GENERATE_KEY:
//			alert('ERROR:COULD_NOT_GENERATE_KEY');
			console.log('ERROR:COULD_NOT_GENERATE_KEY');   
			break;
		case WL.EncryptedCache.ERROR_CREDENTIALS_MISMATCH:
//			alert('ERROR:CREDENTIALS_MISMATCH');
			console.log('ERROR:CREDENTIALS_MISMATCH');   
			break;  
		} 
	}
}

//设备相关类
var Phone = {

    createNew: function() {

        var phone = {};

        /*
          * 获得照片
         * 参数:
          * callback - 回调方法，成功回调照片文件、或base64编码串
         * source  - 相机或相册，CAMEAR/ALBUM
          * direction - 前镜头或后镜头，FRONT/BACK
          * width height- 尺寸
         *
          */
         phone.takePhoto = function(parm) {

            var callbackfn = parm.callback;
             if(!callbackfn || typeof(callbackfn) !== "function") return;

            parm.source    = parm.source || 'CAMERA';
             parm.direction = parm.direction || 'BACK' ;
             parm.width     = parm.width  || 640;
             parm.height    = parm.height || 640;

            // 来源：相机、相册
            var sourceType;
             switch(parm.source.toUpperCase()) {
                 case 'ALBUM':
                     sourceType = 2;
                     break;

                default:
                     sourceType = 1;
                     break;
             }

            // 相机方向
            var direction;
             switch(parm.direction.toUpperCase()) {
                 case 'FRONT':
                     direction = 1;
                     break;

                default:
                     direction = 0;
                     break;
             }

            // 相片大小
            var width  = parm.width;
             var height = parm.height;

            if(navigator.camera) {

                navigator.camera.getPicture(
                     function(data) {
                         callbackfn(/*'data:image/jpeg;base64,' + */data);
                     },
                     function(e) {
                         console.log("Error getting picture: ", e);
                         callbackfn('');
                     },
                     {
                         quality: 95,

                        destinationType: 0,

                        sourceType : sourceType,

                        allowEdit : true,

                        encodingType: 0,

                        targetWidth  : width,
                         targetHeight : height,

                        correctOrientation: true,

                        saveToPhotoAlbum: false,

                        cameraDirection: direction
                     }
                 );

            } else {
                 // 没有相机
                var filename = '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';
                 callbackfn(filename);
             }
         };


         return phone;

    }
 };
 var phone = Phone.createNew();
 


