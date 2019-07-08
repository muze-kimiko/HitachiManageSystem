Ext.define('HelcPDA.model.report.maintainplanbb.ReportMaintainPlanStationModel',{
	extend:'Ext.data.Model',
	config:{
		
		fields : [
			'PLAINTED_PLAN',
			'UPDATE_DATE',
			'ENTERED_AP',
			'PUNCTUAL_AP_RATE',
			'PUNCTUAL_AP',
			'ELV_AMOUNT',
			'TOTAL_RATE',
			'LuR_RATE',
			'ANS_RATE',
			'STATION_ID',
			'STATION'
		]
	}
});