/**
 *  受信故障状态 数据仓   xcx 2014-4-21
 */
Ext.define('HelcPDA.store.fault.HelHotlineFaultStatusStore',{
	id:'FaultHHFSStore',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.fault.HelHotlineFaultStatusModel'],
	config:{
		model:'HelcPDA.model.fault.HelHotlineFaultStatusModel'
	},
});