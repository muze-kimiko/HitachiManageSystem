
/* JavaScript content from app/model/report/faultcount/ReportFaultGZBGModel.js in folder common */
/**
 * 故障报告书报表 模板  xcx  2014-5-22
 */
Ext.define('HelcPDA.model.report.faultcount.ReportFaultGZBGModel',{
	extend:'Ext.data.Model',
	config:{
		fields : [
		          'UPDATE_DATE',//时间
		          'PASSED_FAULT_AMOUNT',  //4,     已审核故障单宗数
		          'ENTERED_FAULT_REPORT',//17,   已录入故障报告书宗数
		          'SENTERED_FAULT_REPORT',//19,  应录入故障报告书
		          'PASSED_FAULT_RATE',//19,  应录入故障报告书
		          'ENTERED_FAULT_REPORT_RATE',//19,  已录入故障报告书率
		          'PE_FAULT_REPORT_RATE',//按时录入故障报告书率
		          'COMPANY',//"公司名"},
		          'COMPANY_ID',//"公司id"},
		          'COUNT_REGION',//1是本月，0是上月
		          'STATION_NAME',//站名
		          ]
	}
});
