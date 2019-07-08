
/* JavaScript content from js/main.js in folder common */
function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
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
//				message: '您的网络可能有问题，是否重试？',
//				buttons: [{text:'取消', itemId:'no'},{text:'重试', itemId:'yes'}],
				message: '您的网络可能有问题，APP将重新打开！',
				buttons: [{text:'确定', itemId:'yes'}],
				fn: function(buttonId) {
					if(buttonId == 'yes'){
						WL.Client.reloadApp();
					}
				}
			});
		}
	});
	
	WL.App.overrideBackButton(function(){
		var dateArray = Ext.ComponentQuery.query('datepickerfield');
		for(var i =0;i<dateArray.length;i++){
			if(typeof(dateArray[i].picker) != "undefined"){
				if(!Ext.getCmp(dateArray[i].picker.id).getHidden()){
					Ext.getCmp(dateArray[i].picker.id).setHidden(true);
					return;
				}
			}
		}
		
		var selectArray = Ext.ComponentQuery.query('selectfield');
		for(var i =0;i<selectArray.length;i++){
			if(typeof(selectArray[i].picker) != "undefined"){
				if(!Ext.getCmp(selectArray[i].picker.id).getHidden()){
					Ext.getCmp(selectArray[i].picker.id).setHidden(true);
					return;
				}
			}
		}
		
		var msgArray = Ext.ComponentQuery.query('sheet');
		for(var i =0;i<msgArray.length;i++){
			if(typeof(msgArray[i]) != "undefined"){
				if(!Ext.getCmp(msgArray[i].id).getHidden()){
					Ext.getCmp(msgArray[i].id).setHidden(true);
					return;
				}
			}
		}
		
//		if(picker_show==''||picker_show==null||typeof(picker_show)=='undefined'){
//
//		}else{
//			if(picker_show.getHidden()==false){
//	 			picker_show.hide();
//	 			return;
//	 		}
//		}
		
		var CurrItemId = Ext.Viewport.getActiveItem().id;
		switch(CurrItemId){
		case "login":
			if(Exit==0){
				WL.Toast.show("再按一次  退出应用");
				Exit++;
				var task = Ext.create('Ext.util.DelayedTask', function() {
					Exit = 0;
					task.cancel();
				});
				task.delay(2000);
			}else{
				WL.App.close();
			}
			break;
		case "main":
			var ComCtr = HelcMES.app.getController('CommonCtr');
			ComCtr.btn_quit();
			break;
		default:
			viewUtil.goLast();
			break;
		}
	});
	
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

/* JavaScript content from js/main.js in folder ipad */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}