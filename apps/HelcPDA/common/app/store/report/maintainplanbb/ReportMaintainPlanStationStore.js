Ext.define('HelcPDA.store.report.maintainplanbb.ReportMaintainPlanStationStore',{
	id:'staStore',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.report.maintainplanbb.ReportMaintainPlanStationModel'],
	config:{
		model:'HelcPDA.model.report.maintainplanbb.ReportMaintainPlanStationModel'
	}
});