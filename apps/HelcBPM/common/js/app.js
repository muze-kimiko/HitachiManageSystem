// @require @packageOverrides
var Exit = 0;
var tmpOrg = '';
var token='';
var reLoginOvlay;
var h_nextActivityData;
var empNum='';
Ext.Loader.setConfig({

});
//this.myBusyIndicator=new WL.BusyIndicator('content',{text:"登录中"});
//this.myLoading=new WL.BusyIndicator('content',{text:"加载数据中"});
//this.myProcessing=new WL.BusyIndicator('content',{text:"处理中"});

Ext.application({
    views: [
    	'AutoTextArea',
        'LoginView',
        'Main_List',
        'PdfView',
        'install.INS_Approve',
        'SparepartSell.SparepartSell_Approve',
        'SparepartSell.PartDetail',
        'Maintain.Maintain_Approve',
        'Maintain.MaterialDetail',
        'Remould.Remould_Approve',
        'Remould.AssetDetail'
        
    ],
    controllers: [
        'ApplicationController',
        'CommonCtr',
        'install.INSMainCtrl',
        'SparepartSell.SPSMainCtrl',
        'Maintain.MaintainMainCtrl',
        'Remould.RemouldMainCtrl'
    ],
    stores:[
        'ApproveStore',
        'ApprovedListStore',
        'ApproveFinishListStore',
        'install.qtkxListStore',
        'install.ghmxListStore',
        'SparepartSell.pjbjmxListStore',
        'Maintain.M_ghbjmxListStore',
        'Maintain.M_MaterialDetailListStore',
        'Remould.R_ghbjmxListStore',
        'Remould.R_AssetDetail_WLBJListStore',
        'Remould.R_AssetDetail_QTWLBJListStore',
        'Remould.R_AssetDetail_GZGFListStore',
        'Remould.R_AssetDetail_QTKXListStore',
    ],
    name: 'HelcBPM',

    launch: function() {
    	/* 汉化日期选择中的月份 */
        Ext.Date.monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        
        /* 汉化提示窗口的按钮 */
        Ext.define("HelcBPM.overrides.MessageBox", {
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
        Ext.define("HelcBPM.overrides.Picker", {
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
        
        MainCtr = HelcBPM.app.getController('ApplicationController');
        
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
					Ext.create('HelcBPM.view.LoginView', {fullscreen: true});
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
        	Ext.create('HelcBPM.view.LoginView', {fullscreen: true});
//        	Ext.create('HelcBPM.view.Remould.AssetDetail', {fullscreen: true});
//        	return;
        }
		//添加MAAS360限制《--
		
//        Ext.create('HelcMES.view.Login', {fullscreen: true});
        
        //获取可能已记录的用户名和密码并设置到登录界面
        cacheUtil.doRead(function(cvalue){
        	if(cvalue != ''){
        		var tvalue = Ext.JSON.decode(cvalue,true);
            	Ext.getCmp('username').setValue(tvalue['username']);
            	if (!(Ext.os.is.iOS || Ext.os.is.Android)){
            		Ext.getCmp('userpwd').setValue(tvalue['userpwd']);
            	}
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
