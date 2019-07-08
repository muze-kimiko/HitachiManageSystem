/**
 * 合同资料
 */
Ext.define('HelcPAD.store.appworkspace.Contract.ContractStore',{
	extend:'Ext.data.Store',
	requires:['HelcPAD.model.appworkspace.Contract.ContractModel'],
	config:{
		model:'HelcPAD.model.appworkspace.Contract.ContractModel'
	},
});