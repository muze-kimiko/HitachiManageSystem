/**
 * 合同资料
 */
Ext.define('HelcPAD.store.appworkspace.Contract.ContractHLineStore',{
	extend:'Ext.data.Store',
	requires:['HelcPAD.model.appworkspace.Contract.ContractHLineModel'],
	config:{
		model:'HelcPAD.model.appworkspace.Contract.ContractHLineModel'
	},
});