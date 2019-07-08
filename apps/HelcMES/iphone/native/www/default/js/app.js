
/* JavaScript content from js/app.js in folder common */
// @require @packageOverrides
var Exit = 0;
var tmpOrg = '';
Ext.Loader.setConfig({

});


Ext.application({
    views: ['Login','Main'],
    controllers: ['ApplicationController','CommonCtr',],
    stores:[],
    name: 'HelcMES',

    launch: function() {
    	/* 汉化日期选择中的月份 */
        Ext.Date.monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        
        /* 汉化提示窗口的按钮 */
        Ext.define("HelcMES.overrides.MessageBox", {
            override: "Ext.MessageBox",
            statics: {
                OK    : {text: '确定', itemId: 'ok',  ui: 'action'},
                YES   : {text: '是',   itemId: 'yes', ui: 'action'},
                NO    : {text: '否',   itemId: 'no'},
                CANCEL: {text: '取消', itemId: 'cancel'},

                INFO    : Ext.baseCSSPrefix + 'msgbox-info',
                WARNING : Ext.baseCSSPrefix + 'msgbox-warning',
                QUESTION: Ext.baseCSSPrefix + 'msgbox-question',
                ERROR   : Ext.baseCSSPrefix + 'msgbox-error',

                OKCANCEL: [
                    {text: '取消', itemId: 'cancel'},
                    {text: '确定', itemId: 'ok',  ui : 'action'}
                ],
                YESNOCANCEL: [
                    {text: '取消', itemId: 'cancel'},
                    {text: '否',   itemId: 'no'},
                    {text: '是',   itemId: 'yes', ui: 'action'}
                ],
                YESNO: [
                    {text: '否', itemId: 'no'},
                    {text: '是', itemId: 'yes', ui: 'action'}
                ]
            }
        });
        
        /* 汉化滚筒选择窗口的按钮 */
        Ext.define("HelcMES.overrides.Picker", {
        	override: "Ext.Picker",
        	config: {
        		doneButton: '确定',
        		cancelButton: '取消',
            }
        });
        
        Ext.define('Ext.Component', {
        	override: 'Ext.Component',
        	show: function (animation) {
        		return this.callParent([false]);
        	},
        	hide: function (animation) {
        		return this.callParent([false]);
        	}
        });
        
        MainCtr = HelcMES.app.getController('ApplicationController');
        
        if (Ext.os.is.iOS) { // 防止ios7标题栏遮盖问题
			if (Ext.os.version.major >= 7) {
				Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);
			}
		}
		if (Ext.os.is.Android) { //andriod软键盘出现时，表单高度调整
			Ext.Viewport.on('painted', function() {
				Ext.Viewport.setHeight(window.innerHeight);
			});
		}
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
        
		//添加MAAS360限制--》
		if(Ext.os.is.Android){
			cordova.exec(function(data){
				if(data != "SDKisSuccess"){
					Ext.Msg.show({
						title: '温馨提示',
						message: '没有安装MaaS360软件，本应用将退出！<br>若已安装MaaS360，请到MaaS360中启动本应用。',
						buttons: Ext.MessageBox.OK,
						fn: function(buttonId) {
							if(buttonId=='ok'){ 
								WL.App.close();
							}
						}
					});
				}else{
					//执行检测MaaS360限制通过的代码，如打开登录界面
					Ext.create('HelcMES.view.Login', {fullscreen: true});
				}
			},function(data){
				Ext.Msg.show({
					title: '温馨提示',
					message: '检测MaaS360软件出错，APP将退出！',
					buttons: Ext.MessageBox.OK,
					fn: function(buttonId) {
						if(buttonId=='ok'){ 
							WL.App.close();
						}
					}
				});
			},'MaaS360Detect','init',[]);
        }else{
        	//执行检测MaaS360限制通过的代码，如打开登录界面
        	Ext.create('HelcMES.view.Login', {fullscreen: true});
        }
		//添加MAAS360限制《--
		
//        Ext.create('HelcMES.view.Login', {fullscreen: true});
        
        //获取可能已记录的用户名和密码并设置到登录界面
        cacheUtil.doRead(function(cvalue){
        	if(cvalue != ''){
        		var tvalue = Ext.JSON.decode(cvalue,true);
            	Ext.getCmp('username').setValue(tvalue['username']);
            	Ext.getCmp('userorg').setValue(tvalue['userorg']);
        	}
        });
        
        //自动登录代码
//		var v_username = Ext.getCmp('username').getValue();
//		var v_userpwd = Ext.getCmp('userpwd').getValue();
//		if(v_username != '' && v_userpwd != ''){
//			var LoginCtr = HaojueParts.app.getController('LoginCtr');
//			LoginCtr.btn_login();
//		}
		//自动登录代码
    }
});
