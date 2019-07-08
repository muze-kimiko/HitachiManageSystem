Ext.define('HelcAgent.store.OpportunityManagement.EntryOpportunities.OpptyStore',{
	extend:'Ext.data.Store',
	requires:['HelcAgent.model.OpportunityManagement.EntryOpportunities.OpptyModel'],
	config:{
		model:'HelcAgent.model.OpportunityManagement.EntryOpportunities.OpptyModel'
	}
});