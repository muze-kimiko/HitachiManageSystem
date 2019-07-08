/**
 * 待处理故障列表 数据仓  待提交 2014-4-15 xcx
 */
Ext.define('HelcPDA.store.fault.FaultHandlingStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.fault.FaultHandlingModel'],
	config:{
		model:'HelcPDA.model.fault.FaultHandlingModel'
	},
});