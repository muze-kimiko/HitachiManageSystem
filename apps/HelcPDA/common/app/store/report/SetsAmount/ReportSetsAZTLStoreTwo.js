/**
 * 安装台量 数据仓2 xcx 2014-5-23
 */
Ext.define('HelcPDA.store.report.SetsAmount.ReportSetsAZTLStoreTwo',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.report.SetsAmount.ReportSetsAZTLModel'],
	config:{
		model:'HelcPDA.model.report.SetsAmount.ReportSetsAZTLModel'
	},
});