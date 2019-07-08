
/* JavaScript content from app/store/appworkspace/Transport/TransportStore.js in folder common */
Ext.define("HelcPAD.store.appworkspace.Transport.TransportStore",{
	extend:'Ext.data.Store',
	id:'listStore_id',
	requires:["HelcPAD.model.appworkspace.Transport.TransportModel"],
	config:{
		model:'HelcPAD.model.appworkspace.Transport.TransportModel',
	}
});