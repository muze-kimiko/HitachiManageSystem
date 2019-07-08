Ext.define('HelcAgent.store.OpportunityManagement.CustomerInformation_New.ClientStore',{
	extend:'Ext.data.Store',
	requires:['HelcAgent.model.OpportunityManagement.CustomerInformation_New.ClientModel'],
	config:{
		model:'HelcAgent.model.OpportunityManagement.CustomerInformation_New.ClientModel'
	},
});