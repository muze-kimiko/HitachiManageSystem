Ext.define('HelcOA.controller.WeekMeet.WeekMeetCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'WeekMeet_id',
	config:{
		control:{
			"list#WeekMeetList":{
				itemtap:'WeekMeet'
			},
		}	
	},
	WeekMeet : function(obj, index, target, record, e, eOpts){
		this.NextView("WeekMeetCon_id","HelcOA.view.WeekMeet.WeekMeetCon");
		var getResult=function(res){
			var returnData = eval("("+ res.GETWEEKMEETDOCReturn.CDATA +")");
			var time = returnData.data.stime.split('~');
			Ext.getCmp('weekmeet_subject').setHtml(returnData.data.subject);
			Ext.getCmp('startdate').setHtml("日期："+returnData.data.startdate);
			Ext.getCmp('appointmenttype').setHtml("项目："+returnData.data.appointmenttype);
			Ext.getCmp('stime').setHtml("开始时间："+time[0]);
			Ext.getCmp('etime').setHtml("结束时间："+time[1]);
			Ext.getCmp('chair').setHtml("主持人："+returnData.data.chair);
			Ext.getCmp('address').setHtml("地点："+returnData.data.address);
			Ext.getCmp('subject').setHtml("标题："+returnData.data.subject);
			Ext.getCmp('body').setHtml("内容："+returnData.data.body);
			Ext.getCmp('copyto').setHtml("翻译："+returnData.data.copyto);
			Ext.getCmp('notes').setHtml("记录："+returnData.data.notes);
			cc.log(returnData);
		};
		
		var params = {};
		params.method = 'GetWeekMeetDoc';
		params.parameters = [record.data.unid];
		this.connectServer_OA(getResult,params);
		
	}
});