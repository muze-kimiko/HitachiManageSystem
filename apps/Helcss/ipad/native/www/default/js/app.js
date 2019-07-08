
/* JavaScript content from js/app.js in folder common */
//全局变量
var curChat;
var loginuser;
var loginusername,loginpassword;
var msgUnread = 0;
var js_ele_no,update_time;
var xs_city,xs_domain,xs_ele_no,xs_plan_id;
var settime=300000;
var stopjs_Interval,stopxs_Interval;
var loginuser=null,checktoggle=null;
var ovlay,ovlay_emplist=null;
var thread_id=null;
var vopen=null,vclose=null,vup=null,vdown=null,vtrapped_people=null,voverhaul=null,vpower_err=null,visstart=null,vdoor_err=null;
var vupOrdown=null,vfloor=null,vchangepick=null;
var jk_address=null,jk_ele_no=null;
var ssjkflg='start';
var jkflg=null;
var cdate = new Date();
var SRYM = cdate.getFullYear()+"-";
var BUYM = cdate.getFullYear()+"-";
var RLYM = cdate.getFullYear()+"-";
var SRY = cdate.getFullYear();
var BUY = cdate.getFullYear();
var RLY = cdate.getFullYear();
if(cdate.getMonth()+1<10){
	SRYM += "0";
	BUYM += "0";
	RLYM += "0";
}
SRYM += (cdate.getMonth()+1);
BUYM += (cdate.getMonth()+1);
RLYM += (cdate.getMonth()+1);
var current_report = 0;
var txt = new Array('受信统计报表','困人统计报表','困人故障排行榜');
var all_rep_btn_txt = new Array(new Array('受信月度数据','受信年度数据'),new Array('困人月度数据','困人年度数据'),new Array('困人故障月度排行榜','困人故障年度排行榜'));

this.myBusyIndicator=new WL.BusyIndicator('content',{text:"登录中"});
this.myLoading=new WL.BusyIndicator('content',{text:"加载数据中"});
this.myProcessing=new WL.BusyIndicator('content',{text:"处理中"});

//判断软件所在平台
var PDsystem=0;

Ext.application({ 
	name : "Helcss",
	views : ['LoginView','MainMenu','JianshiinfoView','XunshiSearchView','XunshidomainView','XunshiPlanlistView','XunshiPlaninfoView','SystemTimerView','JianKongView'
	         ,'ChartView', 'chart.fault.FaultView', 'chart.boxup.BoxUpView', 'map.MapView'
	         ,'install.InstallCityListView','install.InstallPNameView','install.InstallInfoListView','install.InstInfoDetailView'
	         ,'SRChartView', 'chart.fault.SRFaultViewByMonth', 'chart.fault.SRFaultViewByYear'
	         ,'chart.boxup.BoxUpViewByMonth','chart.boxup.BoxUpViewByYear'
	         ,'chart.ranklist.RankListViewByMonth','chart.ranklist.RankListViewByYear'
	         ,'AutoTextArea','install.InstInfoDetailView_AZ','JianshiinfoView_AZ'],
	         
 	stores : ['JsStore','JS_baoyang_Store','XsSeachStore','XunshidomainStore','Xs_ghlistStore','XunshiPlanlistStore'
 	          ,'ChartStore','chart.fault.FaultStore','chart.fault.FaultDetailStore','chart.fault.FaultChartStore','chart.boxup.BoxUpStore','chart.boxup.BoxUpDetailStore','chart.boxup.BoxUpChartStore',
 	         'install.InstallPNameListStore','install.InstallCityListStore','install.InstallInfoListStore','map.MapAroundEmpStore'
 	         ,'chart.fault.SRFaultByMonthStore','chart.fault.SRFaultByMonthDetailStore','chart.fault.SRFaultByMonthChartStore'
 	         ,'chart.fault.SRFaultByYearStore','chart.fault.SRFaultByYearDetailStore','chart.fault.SRFaultByYearChartStore'
 	         ,'chart.boxup.BoxUpByMonthStore','chart.boxup.BoxUpByMonthDetailStore','chart.boxup.BoxUpByMonthChartStore'
 	         ,'chart.boxup.BoxUpByYearStore','chart.boxup.BoxUpByYearDetailStore','chart.boxup.BoxUpByYearChartStore'
 	         ,'chart.ranklist.RankListByMonthDomainStore','chart.ranklist.RankListByMonthElevatorStore'],
 	          
	models : ['JsModel','XunshiSearchModel','XunshidomainModel','XunshighModel','XunshiPlanlistModel'
	          ,'ChartModel','chart.fault.FaultModel','chart.fault.FaultDetailModel','chart.fault.FaultChartModel',,'chart.boxup.BoxUpModel','chart.boxup.BoxUpDetailModel','chart.boxup.BoxUpChartModel',
	          'install.InstallPNameListModel','install.InstallInfoListModel','map.MapAroundEmpModel'
	          ,'chart.fault.SRFaultByMonthModel','chart.fault.SRFaultByMonthDetailModel','chart.fault.SRFaultByMonthChartModel'
	          ,'chart.fault.SRFaultByYearModel','chart.fault.SRFaultByYearDetailModel','chart.fault.SRFaultByYearChartModel'
	          ,'chart.boxup.BoxUpByMonthModel','chart.boxup.BoxUpByMonthDetailModel','chart.boxup.BoxUpByMonthChartModel'
	          ,'chart.boxup.BoxUpByYearModel','chart.boxup.BoxUpByYearDetailModel','chart.boxup.BoxUpByYearChartModel'
	          ,'chart.ranklist.RankListByMonthDomainModel','chart.ranklist.RankListByMonthElevatorModel'],
	
	controllers : ["LoginCtrl","MainMenuCtr","UpdatePassworCtr","JianshiCtr","JianshiinfoCtr",'XunshiSearchCtr','XunshidomainCtr','XunshighlistCtr','XunshiPlanlistCtr','XunshiPlaninfoCtr','SystemTimerCtr','JianKongCtr'
	               ,"ChartCtr",'InstallCtr',"MapCtr"],
 
	userinfo : null,
	localStorage : window.localStorage,
	launch : function() {
		this.pdSystem();
		Ext.Viewport.add(Ext.create('Helcss.view.LoginView'));
		/*Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 15);*/
//		var me = this;
//		var data = {
//				adapter : 'LoginAdapter',
//				procedure : 'getACK',
//				parameters : [ 'worklight' ]
//			};
//
//			this.getApplication().getAdapterProcess("", null, data, false, function(items) {
//				console.log('getACK:' ,items);
//				me.hideLoading();
//				if (items.result == '0') {
//					me.getController('LoginCtrl').loginSuccess(items.userinfo);
//				}else{
//					Ext.Viewport.add('vlogin');
//				}
//
//			});
//		
//		var str = '';
//		for(var i in WL.StaticAppProps){
//			str += '\n'+(i+':'+WL.StaticAppProps[i]);
//		}
//		alert(str);
//		
	},

	getUserNameById : function(empUid) {
		var me = this;
		var user = Ext.getStore("SessionStore").findRecord('empUid', empUid, 0, false, true, true);
		if (!user) {
			var data = {
				adapter : 'ContactsAdapter',
				procedure : 'findEmpDetail',
				parameters : [ empUid ]
			};

			me.getApplication().getAdapterProcess("", null, data, false, function(items) {
				// console.log(items);
				if (items.empUid == null || items.empUid == '') {
					// me.getApplication().showMsg('用户不存在.');
					return;
				}

				var ssto = Ext.getStore("SessionStore");
				// check if user is cached.
				var data = ssto.findRecord('empUid', items.empUid, 0, false, true, true);
				if (data != null) {
					data.set('empName', items.empName);
					data.setDirty();
				} else {
					// user never chat.
					ssto.add({
						empUid : items.empUid,
						empName : items.empName,
						dtime : new Date(),
						lastmsg : ''
					});
				}
				ssto.sync();

			});
			return empUid;
		} else {
			return user.data.empName;
		}
	},

	/**
	 * 从适配器 查 数据
	 * 
	 * @param {String}
	 *            storeName 数据存储到store
	 * @param {Object}
	 *            listEntity 获取数据后，展示列表
	 * @param {Object}
	 *            data 适配器参数
	 * @param {Boolean}
	 *            objectshowNullMessage 获取数据为空时，是否弹出提示
	 * @param {String}
	 *            showView 获取数据后，需要跳转的View名
	 * @param {Func}
	 *            callFunc 回调函数
	 */
	getAdapterProcess : function(storeName, listEntity, data, showNullMessage, callFunc) {
		console.log("start getAdapterProcess");
		var app = this.getApplication();
		var store = null;
		app.showLoading();
		WL.Client.invokeProcedure(data, {
			onSuccess : function(response) {
				var items = response.invocationResult.Items;
				// console.log(response);
				if (items.length == 0 && showNullMessage) {
					app.showMsg('查询结果为空');
				} else {
					if (storeName != "") {
						store = Ext.getStore(storeName).load();
						store.setData(items);
					}
					if (listEntity != null) {
						listEntity.setStore(store);
					}
					if (callFunc != null) {
						callFunc(items);
					}
					console.log("end getAdapterProcess successfully");
				}
				app.hideLoading();
			},
			onFailure : function() {
				console.log("end getAdapterProcess failed");
				app.showMsg('获取数据超时，请重试');
				app.hideLoading();
			}
		});
	},

	/**
	 * 弹出消息框
	 * 
	 * @param {String}
	 *            Msg 消息内容
	 */
	showMsg : function(Msg) {
		if (typeof WL === 'undefined') {
			Ext.Msg.alert('提示', Msg);
		} else {
			WL.SimpleDialog.show("提示", Msg, [ {
				text : "确定"
			} ]);
		}
	},

	/**
	 * 显示加载动画
	 */
	showLoading : function() {
		Ext.Viewport.setMasked({
			xtype : 'loadmask',
			message : '请稍候...'
		});
	},

	/**
	 * 显示加载动画
	 */
	hideLoading : function() {
//		console.log('hideLoding');
		Ext.Viewport.setMasked(false);
		// Ext.fly('loadingIndicator').hide();
	},

	/**
	 * 联系人列表模板
	 */
	contactListTemplate : function() {
		return '<div class="list-item-title">{empName}</div>' + '<div class="list-item-narrative"><span>部门：{empDepartment}</span></div>'
				+ '<div class="list-item-narrative"><span>电话：{mobile}</span> <span>邮箱：{email}</span></div>';
	},

	/**
	 * 添加Menu Badge
	 */
	setBadge : function(num) {
		var tabpanel = Ext.getCmp("vmaintab");
		var tabbar = tabpanel.getTabBar();
		var tab = tabbar.down('.tab[title=EChat]');
		tab.setBadgeText(num);
	},

	/**
	 * 判断系统
	 */
	pdSystem:function(){
		PDsystem=1;
		console.log('进入系统判断');
		if (Ext.os.is.Android) {
			PDsystem=1;
			console.log('是安卓');
		    //alert('是安卓31');
		}else if (Ext.os.is.MacOS) {
			Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 15);
			console.log('是OS');
		    //alert('是OS');
		}else if (Ext.os.is.iPad) {
			Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 15);
			console.log('是苹果');
		   // alert('是苹果');
		};
	},
	
});
