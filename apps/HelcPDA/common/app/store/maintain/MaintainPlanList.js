Ext.define('HelcPDA.store.maintain.MaintainPlanList',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.maintain.MaintainPlanListModel'],
	config:{
		model:'HelcPDA.model.maintain.MaintainPlanListModel'
	},
});