Ext.define("HelcPDA.store.oa.HasEnded.HasEndedStore",{
	extend:'Ext.data.Store',
	requires:["HelcPDA.model.oa.HasEnded.HasEndedModel"],
	config:{
		model:'HelcPDA.model.oa.HasEnded.HasEndedModel',
	}
});