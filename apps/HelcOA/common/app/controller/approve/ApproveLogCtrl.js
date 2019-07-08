Ext.define('HelcOA.controller.approve.ApproveLogCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'ApproveLogCtrl_id',
	config:{
		control:{
			"list#approval_processList":{
				itemtap:'init1'
			},
		}	
	},
	init1:function(obj, index, target, record, e, eOpts){
		var obj=Ext.getCmp('ProcessName_id');
		if(!obj){
			obj=Ext.create('HelcOA.view.Approved.ProcessName');
		}
		Ext.Viewport.setActiveItem(obj);
	}
});