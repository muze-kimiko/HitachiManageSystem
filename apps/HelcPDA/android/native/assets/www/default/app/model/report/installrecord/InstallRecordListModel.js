
/* JavaScript content from app/model/report/installrecord/InstallRecordListModel.js in folder common */
/**
 * 
 */
Ext.define('HelcPDA.model.report.installrecord.InstallRecordListModel', {
	extend : 'Ext.data.Model',
	config : {
		// 安装业务录入报表
		fields : [ 'ORG_ID', 'COMPANY_NAME', 'DELIVERY_APPROCH',
				'PROCESS', 'MONTH_SHIPMENT', 'IN_THE_ENTRY',
				'IN_THE_RATE_OF', 'AT_THE_ENTRY','AT_THE_RATE_OF','DEBUGGING_T0_ENTRY','DEBUGGING_RATE',
				'ADJUSTABLE_BACK','DEBUGGING_COMPLETED_ENTRY','DEBUG_COMPLETION','ACCEPTANCE_TO_ENTRY',
				'INSPECTION_RATE','CHECK_BACK','THE_INSPECTION_COMPLETION','CHECK_COMPLETION','SCORE'
				]

	}
});