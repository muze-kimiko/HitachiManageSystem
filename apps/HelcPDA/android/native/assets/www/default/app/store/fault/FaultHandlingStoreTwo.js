
/* JavaScript content from app/store/fault/FaultHandlingStoreTwo.js in folder common */
/**
 * 待处理故障列表 数据仓 已提交  2014-7-10 xcx
 */
Ext.define('HelcPDA.store.fault.FaultHandlingStoreTwo',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.fault.FaultHandlingModel'],
	config:{
		model:'HelcPDA.model.fault.FaultHandlingModel'
	},
});