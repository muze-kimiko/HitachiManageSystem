Ext.define('HelcPAD.store.OpportunityManagement.EntryOpportunities.OpportunityStore',{
	extend:'Ext.data.Store',
	requires:'HelcPAD.model.OpportunityManagement.EntryOpportunities.OpportunityModel',
	config:{
		model:'HelcPAD.model.OpportunityManagement.EntryOpportunities.OpportunityModel'
	}
});