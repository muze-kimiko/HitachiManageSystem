/**
 *    搜索客户 Store  lgs
 */

Ext.define('HelcPDA.store.fault.FaultHandlingReportSearchCustomStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.fault.FaultHandlingReportSearchCustomModel'],
	config:{
		model:'HelcPDA.model.fault.FaultHandlingReportSearchCustomModel'
	},
});