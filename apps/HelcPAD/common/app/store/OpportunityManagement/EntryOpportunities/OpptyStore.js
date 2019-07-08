Ext.define('HelcPAD.store.OpportunityManagement.EntryOpportunities.OpptyStore',{
	extend:'Ext.data.Store',
	requires:['HelcPAD.model.OpportunityManagement.EntryOpportunities.OpptyModel'],
	config:{
		model:'HelcPAD.model.OpportunityManagement.EntryOpportunities.OpptyModel',
	}
});