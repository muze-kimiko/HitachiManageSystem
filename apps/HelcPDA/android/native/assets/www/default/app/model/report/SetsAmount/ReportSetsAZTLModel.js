
/* JavaScript content from app/model/report/SetsAmount/ReportSetsAZTLModel.js in folder common */
/**
 *  安装台量  模板  xcx 2014-5-23
 */
Ext.define('HelcPDA.model.report.SetsAmount.ReportSetsAZTLModel',{
	extend:'Ext.data.Model',
	config:{
		fields : [
		          'INST',//安装中
		          'GOV_CHECK',//技检中
		          'DEBUG_',//调试中
		          'COMP_FILE',//完工资料准备
		          'CHANJIAN_GOV_WU',//厂检中(无技监发证)
		          'CHANJIAN_GOV_YOU',//厂检中(有技监发证)
		          'MAKE_ING',//在制
		          
		          'YIFAHUO_NOENTER',//已发货未进场
		          'IN_THE_ENTRY',//当月已进场
		          'COMPLETE_COUNT',//当月已完工
		          'HT_NAME', //北京日立电梯工程有限   公司
		          'COUNT_DATE',//2014-05-23 11:29:17.0   日期
		          ]
	}
});