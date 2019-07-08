//全局变量
var actionform = {
	action : "", //string,output,keep:保存，submit:提交
	acti : {}, //json string,input,流程及当前结点数据，格式见下面activity描述
	pur : {}, //json string,input,当前页面数据显示权限，格式见下面purview描述
	curuser : {}, //json
	ivar : "", //json string,input,流程实例变量，格式见下面ivar描述
	data : {}, //json string,output,当前页面提交数据，格式见下面描述
	flowto : {}, //obj ,output,输出流向，格式见下面描述
	query : {}, //json string,output,常用查询数据，格式见下面描述
	notice : "", //json string,output,通知，格式见下面描述
	ovar : "", //json string,output,输出流程实例变量，格式见下面ivar描述
	ext : "" //array string预留扩展参数
};
var personnelList = {}; //人员储存
var choosePerson = []; //存储查找出来已勾选的人员
var returnForm = null;
var object = null; //作为公共对象，用于在页面调用控制器的方法
var ViewArray = [];
function CC() { this.debug = 1; };
CC.prototype.log = function (msg) { if (this.debug == 1) { console.log(msg); } };
//var _oa_path = "http://oa.hitachi-helc.com";

var cc = new CC();

this.myBusyIndicator = new WL.BusyIndicator('content', { text : "登录中" });
this.myLoading = new WL.BusyIndicator('content', { text : "加载数据中" });

var username = null;
var password = null;
var _vt = null;
var userkey = null;
var usernames = null;

Ext.application({
	name : "HelcOA",
	controllers : [
		'ApplicationController',
		'loginCtrl',
		'ReportPasswordCtrl',
		'Affiche.newsCtrl',
		'MenusCtrl',
		'WeekMeet.WeekMeetCtrl',
		'ForApprovalProcess.DailyOffice.forApprovalProcessCtrl',
		'ForApprovalProcess.DailyOffice.Idea.approvalOpinionCtrl',
		'ForApprovalProcess.DailyOffice.Idea.personnelSelectionCtrl',
		'ForApprovalProcess.DailyOffice.Idea.qyeryListCtrl',
		'ForApprovalProcess.BusinessService.nonstandardWorkCtrl',
		'ForApprovalProcess.DailyOffice.POFormExamineCtrl',
		'ForApprovalProcess.DailyOffice.jobContactBookCtrl',
		'BPMProcess.BPMProcessCtrl',
		'PublicPersonnelSelectionC',
		'Approved.ApprovedCtrl', 
		'Approved.DailyOffice.travelRequestCtrl',
		'MyProcess.MyProcessCtrl',
		'MyProcess.DailyOffice.travelRequestCtrl',
		
		'HasEnded.HasEndedCtrl',
		'HasEnded.DailyOffice.travelRequestCtrl',
		
		'yuyue.StaffController',

	],

	views : [
		'login',
		'Menus',
		'ReportPassword',
		
		'ForApprovalProcess.DailyOffice.travelRequest',
		'ForApprovalProcess.DailyOffice.jobContactBook',
		'ForApprovalProcess.DailyOffice.Idea.approvalOpinion',
		'ForApprovalProcess.DailyOffice.Idea.personnelSelection',
		'ForApprovalProcess.DailyOffice.Idea.qyeryList',
		'common.AutoTextArea',
		'common.EditNumberView',
		'Affiche.news',
		'Affiche.newsCon',

		'Approved.Approved',
		'Approved.DailyOffice.jobContactBook',
		'Approved.DailyOffice.companyOutgoing',
		'Approved.ApproveLog',
		'Approved.ProcessName',
		
		'MyProcess.MyProcess',
		'MyProcess.DailyOffice.jobContactBook',
		'MyProcess.DailyOffice.companyOutgoing',
		
		'HasEnded.HasEnded',
		'HasEnded.DailyOffice.jobContactBook',
		'HasEnded.DailyOffice.companyOutgoing',
		//预约
		'yuyue.Home',
		'yuyue.Booking1',
		'yuyue.Booking2',
	],

	models : ['MenusM',
		'ForApprovalProcess.DailyOffice.travelRequestM',
		'ForApprovalProcess.DailyOffice.Idea.approvalOpinionM',
		'ForApprovalProcess.DailyOffice.Idea.personnelSelectionM', ,
		'ForApprovalProcess.DailyOffice.Idea.qyeryListModel',
		'MyProcess.MyProcessModel',
		'HasEnded.HasEndedModel',
		'Approved.ApprovedModel',

		'ForApprovalProcess.DailyOffice.jobContactBook_ck_Model',
		'ForApprovalProcess.DailyOffice.Base64_Model',
	],

	stores : [
		'MenusS', 
		'MenusS2',
		'BPMProcess.BPMProcessStore',
		'ForApprovalProcess.DailyOffice.travelRequestS',
		'ForApprovalProcess.DailyOffice.Idea.approvalOpinionS',
		'ForApprovalProcess.DailyOffice.Idea.personnelSelectionS',
		'ForApprovalProcess.DailyOffice.Idea.qyeryListStore',
		'PublicPersonnelSelectionS',
		'PublicQyeryListStore',
		'MyProcess.MyProcessStore',
		'HasEnded.HasEndedStore',
		'Approved.ApprovedStore',
		'Affiche.newsStore',
		'WeekMeet.WeekMeetStore',
		'ForApprovalProcess.DailyOffice.jobContactBook_ck_Store',
		'ForApprovalProcess.DailyOffice.Base64_Store',
		//预约
		'yuyue.Home_Confirmed_lsit',
		'yuyue.Home_Unconfirmed_lsit'
	],

	launch : function () {

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
					Ext.Viewport.add(Ext.create('HelcOA.view.login'));
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
        	Ext.Viewport.add(Ext.create('HelcOA.view.login'));
        }


		
		if (Ext.os.is.iOS) { // 防止ios7标题栏遮盖问题
			if (Ext.os.version.major >= 7) {
				Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);
			}
		}
		if (Ext.os.is.Android) { //andriod软键盘出现时，表单高度调整
			Ext.Viewport.on('painted', function () {
				Ext.Viewport.setHeight(window.innerHeight);
			});
		}
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, { buffer : 50 });

		

		// 设置首页
		//获取上次登录账号
		WL.EncryptedCache.read("Loginuser", onReaduserSuccess,
			onReaduserFailure);
		function onReaduserSuccess(value) {
			if (value == null) {
				console.log('系统未记录登录账号');
			} else {
				loginuser = value;
				checktoggle = "true";
				console.log('username is object111' + Ext.getCmp('username_id'));
				if (typeof(Ext.getCmp('username_id')) != 'undefined') {
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
	},

	handleOrientationChange : function (viewport, orientation, width, height) {
		if (Ext.os.is.iOS) {
			if (Ext.os.version.major >= 7) {
				document.body.style.marginTop = "20px";
				Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);
			}
		}
	}

});

//获取用户列表
function getAjaxOption(to, next) {
	return getNextUserAssign(to, next); //+"&callback=?";

}
//获取下一个节点用户信息
function getNextUserAssign(to, acti) {
	try {
		var _next = acti.next; //monishuju
		for (var x = 0; x < _next.length; x++) {
			cc.log(_next[x].id == to);
			if (_next[x].id == to) {

				var assign = _next[x].cfg.assign;
				var assigntype = assign.users[0].assigntype;
				var assignto = assign.users[0].assignto;
				var multflag = assign.multflag;
				var multqty = assign.multqty;
				var anyflag = assign.anyflag;
				cc.log("anyflag:" + anyflag);
				cc.log("assignto:" + assignto);
				cc.log("assigntype:" + assigntype);
				cc.log("age:" + age);

				var age = "{assigntype:'" + assigntype + "',assignto:'"
					 + assignto + "' ,piid:'" + acti.piid + "', anyflag:'"
					 + anyflag + "', multflag:'" + multflag
					 + "', multqty : '" + multqty + "'}";

				if (assigntype == '4') {
					age = "{assigntype:'" + assigntype + "',assignto:'"
						 + Ext.getCmp(assignto).getValue() + "' ,piid:'"
						 + acti.piid + "', anyflag:'" + anyflag
						 + "', multflag:'" + multflag + "', multqty : '"
						 + multqty + "'}";
				} else if (assigntype == '5' || assigntype == '6') {
					age = "{assigntype:'" + assigntype + "',assignto:'"
						 + username + "' ,piid:'" + acti.piid
						 + "', anyflag:'" + anyflag + "', multflag:'"
						 + multflag + "', multqty : '" + multqty + "'}";
				}

				var jsonusertmpe = {};
				jsonusertmpe = eval("(" + age + ")");
				cc.log(jsonusertmpe);
				if (assigntype == '1' || assigntype == '4') {

					age = '/unioa/processtrace.nsf/getuserbygroup?openagent&unid='
						 + encodeURI(jsonusertmpe.assignto);

				} else if (assigntype == '3') {

					age = '/unioa/processtrace.nsf/getuserbyfield?openagent&unid='
						 + encodeURI(jsonusertmpe.assignto)
						 + '&piid='
						 + jsonusertmpe.piid;

				} else if (assigntype == '2') { //  用getleader1做测试
					age = '/unioa/processtrace.nsf/'
						 + encodeURI(jsonusertmpe.assignto)
						 + '?openagent&piid=' + jsonusertmpe.piid;
				} else if (assigntype == '5') {
					age = '/unioa/processtrace.nsf/getleaderbyuser?openagent&unid='
						 + encodeURI(jsonusertmpe.assignto);
				} else if (assigntype == '6') {
					age = '/unioa/processtrace.nsf/getpeosbyuser?openagent&unid='
						 + encodeURI(jsonusertmpe.assignto);
				} else { //人员设置为空时
					age = '/unioa/processtrace.nsf/getuserbygroup?openagent&unid=qwertyuioasdfghjkxcvbhjnk';
				}
				age += '&callback=';
				cc.log("s4ertyu");
				cc.log(age);
				return age;
			} // endif
		} // endfor
	} catch (e) {
		cc.log(e);
	}
	return '/unioa/processtrace.nsf/getuserbygroup?openagent&unid=qwertyuioasdfghjkxcvbhjnk';
}
//提取下一个节点User配置
function getNextAssign(to, next) {
	var _next = next; //monishuju
	for (var x = 0; x < _next.length; x++) {

		if (_next[x].id == to) {
			return _next[x].cfg.assign;
		} // endif
	} // endfor
	return {};
}
//提取下一个节点CFG配置
function getNextCFG(to, acti) {

	var _next = acti.next; //monishuju
	for (var _x = 0; _x < _next.length; _x++) {

		if (_next[_x].id == to) {
			return _next[_x];
		} // endif
	} // endfor
	return {};
}
//getNextacti
function getNextacti(to, next) {
	var _next = next; //
	for (var x = 0; x < _next.length; x++) {

		if (_next[x].id == to) {
			return _next[x];
		} // endif
	} // endfor
	return {};
}
