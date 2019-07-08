Ext.define('HelcPDA.store.report.maintainplanbb.ReportMaintainPlanStore',{
	id:'store',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.report.maintainplanbb.ReportMaintainPlanModel'],
	config:{
		model:'HelcPDA.model.report.maintainplanbb.ReportMaintainPlanModel'
	},
});