/**
 * 待处理故障列表 数据仓 已审核  2014-7-10 xcx
 */
Ext.define('HelcPDA.store.fault.FaultHandlingStoreFour',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.fault.FaultHandlingModel'],
	config:{
		model:'HelcPDA.model.fault.FaultHandlingModel'
	},
});