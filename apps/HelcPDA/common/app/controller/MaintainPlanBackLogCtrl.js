Ext.define('HelcPDA.controller.MaintainPlanBackLogCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		control:{
			"button#backToBackLog":{
				tap:'backToBackLog',
			},
			"list#MaintainPlanBackLogList":{
				itemtap:'MaintainPlanBackLogList',
			}
		}
	},
	
	backToBackLog : function(){
		var obj = this;
		obj.BackView();
	},
	
	MaintainPlanBackLogList : function(obj, index, target, record, e, eOpts ){
		var obj = this;
		obj.NextView('Maintainlist','HelcPDA.view.maintain.MaintenancePlanPanel');
		//清空数据
		var MaintList=Ext.data.StoreManager.get('MaintainPlanList');
		if (!MaintList) { 
			MaintList = Ext.create("HelcPDA.store.maintain.MaintainPlanList"); 
		};
		MaintList.setData([]);
		//获取日期
		var date = record.data.PLAN_START_DT;
		var dates = [];
		dates = date.split('-');
		var new_date = dates[0]+'年'+dates[1]+'月'+dates[2]+'日';
		Ext.getCmp('MPPDateButton').setText(new_date);
		Ext.getCmp('MppmYear').setValue(dates[0]);
		Ext.getCmp('MppnMonth').setValue(dates[1]);
		ceshiyongchaxu(obj,date);
	}
});

