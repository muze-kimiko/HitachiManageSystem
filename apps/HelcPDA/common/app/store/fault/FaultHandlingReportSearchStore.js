/**
 *    搜索故障工号 Store  lgs
 */

Ext.define('HelcPDA.store.fault.FaultHandlingReportSearchStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.fault.FaultHandlingReportSearchModel'],
	config:{
		model:'HelcPDA.model.fault.FaultHandlingReportSearchModel'
	},
});