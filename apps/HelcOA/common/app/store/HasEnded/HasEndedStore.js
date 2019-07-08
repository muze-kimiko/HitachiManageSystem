Ext.define("HelcOA.store.HasEnded.HasEndedStore",{
	extend:'Ext.data.Store',
	id:'HasEndedStore_id',
	requires:["HelcOA.model.HasEnded.HasEndedModel"],
	config:{
		model:'HelcOA.model.HasEnded.HasEndedModel',
	}
});