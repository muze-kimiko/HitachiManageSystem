
/* JavaScript content from app/controller/elevatormonitor/ElevatorMonitorCtrl.js in folder common */
Ext.define('HelcPDA.controller.MenusViewCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'menusCtrl_id',
	config:{
		refs:{
			menus_id:'button[id=menus_id]'
		},
		control:{
			menus_id:{
				tap:'doMaunPlanDeP'
			},
			"button#FaultDirection_id":{
				tap:'FaultDirection',
			}
		}
	},
	doMaunPlanDeP:function(){
		var obj=Ext.getCmp('Maintainlist');
		if(!obj){
			 obj=Ext.create('HelcPDA.view.maintain.MaintenancePlanPanel');
		}
		 Ext.Viewport.setActiveItem(obj);
	},
	FaultDirection:function(){
		//FaultDirection_id
		//alert('kooo');
		var obj=Ext.getCmp('FaultDirectionID');
		if(!obj){
			 obj=Ext.create('HelcPDA.view.install.FaultDirection');
		}
		 Ext.Viewport.setActiveItem(obj);
	},
	
	
	// 定时任务
	starCommitTask: function() {},
	
	// 定时任务提交,不可传参数，传参数就无法调用
	toCommitWaitingData : function() {},
	
});

