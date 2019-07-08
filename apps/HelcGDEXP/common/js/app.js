var Exit=0;
var ViewArray = [];
//全局变量  
var userid=null;
var copy_userid=null;
var usernames=null;
var class1=null;
var roleid=null;
var rolename=null;
var moduleid=null;
var HQFlag=null;
var modulename=null;enabledflag=null;
var rem1=null;
var sbl_row_id=null;
//登录人ID
var person_id=null;
var ebs_user_id=null;
var init_person_id=null;
//公司ID                
var company_code=null;
//公司名
var company_name=null;
//站点ID
var station_id=null;
//站长
var position_type=null;
var isnewversion=null;
var forceflag=null;
var pw_last_update_date=null;c_time=null;
var isoffline_login=null;
var loginusername=null;
var loginpassword=null,seeatid='1';
var loginuser=null,checktoggle=null;
var picker_show,picker_show1;  
var need_text_id;
var collectionName;
var roleStr;
var isLeader = false;
var commitTask = null;
var isRunningCommit = false;

this.myBusyIndicator=new WL.BusyIndicator('content',{text:"登录中"});
this.myLoading=new WL.BusyIndicator('content',{text:"加载数据中"});



Ext.application({ 
	name : "HelcGDEXP",


	views : [               
             //运单查询
               'TransportSearch',
               'TransportResult',
               ],
	         models : [
	                   ],

 	stores : [
 	                      						 
             ],

	controllers : [
	              //全局
	              'ApplicationController',
	              
	            //物流运单
	              'TransportCtrl',
	              ],
	              
	              
	launch :function() {
		Ext.Viewport.add(Ext.create('HelcGDEXP.view.TransportSearch'));
		/*
		cordova.exec(isOk,isFailure,'CommonPlugin','aaa',[]);
		function isOk(resultdatas) {
			var resultdata = null;
			try {
				resultdata = eval("("+ resultdatas +")");
			}catch (e) {
				resultdata = null;
			}
			if (resultdata != null) {
				var showDeviceNo = document.getElementById('showDeviceNo');
		    	showDeviceNo.innerHTML = resultdata.uuid;
		    	var showImei = document.getElementById('showImei');
		    	showImei.innerHTML = resultdata.imei;
		    	var showImsi = document.getElementById('showImsi');
		    	showImsi.innerHTML = resultdata.imsi;
			}
		};
		function isFailure(data) {
			alert('获取IMEI失败，请重新启动软件！');
		};
		*/
	}

});
