
/* JavaScript content from app/store/fault/FaultHandlingReportSearchCustomStore.js in folder common */
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