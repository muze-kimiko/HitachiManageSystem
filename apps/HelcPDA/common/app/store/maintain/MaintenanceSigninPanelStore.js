//签到专用数据仓
Ext.define('HelcPDA.store.maintain.MaintenanceSigninPanelStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.maintain.MaintainPlanListModel'],
	config:{
		model:'HelcPDA.model.maintain.MaintainPlanListModel'
	},
});