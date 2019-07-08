Ext.define('HelcPDA.model.report.installweekly.InstallWeeklyListModel', {
	extend : 'Ext.data.Model',
	config : {
		// 安装周期报表
		fields : [ 'ORG_ID', 'OPERATING_UNIT', 'ENTER_CYCLE',
				'REPORT_INST_CYCLE', 'REPORT_DEBUG_CYCLE', 'BAO_REPORT_CYCLE',
				'BAO_CHECK_CYCLE', 'GOV_CHECK_CYCLE', 'CHECK_COMPLETE_CYCLE',
				'CCRQ_COMPLETE_CYCLE', 'TRANFER_DATE']
	}
});