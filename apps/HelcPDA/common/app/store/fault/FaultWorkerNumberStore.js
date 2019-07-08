/**
 * 服务请求录入  查询用 2014-4-22 xcx
 */
Ext.define('HelcPDA.store.fault.FaultWorkerNumberStore',{
	id:'FaultFWNStore',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.fault.FaultWorkerNumberModel'],
	config:{
		model:'HelcPDA.model.fault.FaultWorkerNumberModel'
	},
});