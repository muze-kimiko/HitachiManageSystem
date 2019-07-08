/**
 * 合同资料 用于记录
 */
Ext.define('HelcPAD.store.appworkspace.Contract.ContractHLineStoreJL',{
	extend:'Ext.data.Store',
	requires:['HelcPAD.model.appworkspace.Contract.ContractHLineModel'],
	config:{
		model:'HelcPAD.model.appworkspace.Contract.ContractHLineModel'
	},
});