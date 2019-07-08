
/* JavaScript content from app/store/Approved/ApprovedStore.js in folder common */
Ext.define("HelcOA.store.Approved.ApprovedStore",{
	extend:'Ext.data.Store',
	id:'ApprovedStore_id',
	requires:["HelcOA.model.Approved.ApprovedModel"],
	config:{
		model:'HelcOA.model.Approved.ApprovedModel',
	}
});