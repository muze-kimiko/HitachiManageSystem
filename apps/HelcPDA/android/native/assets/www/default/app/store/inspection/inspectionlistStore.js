
/* JavaScript content from app/store/inspection/inspectionlistStore.js in folder common */
Ext.define('HelcPDA.store.inspection.inspectionlistStore',{
	id:'store',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.inspection.inspectionlistModel'],
	config:{
		model:'HelcPDA.model.inspection.inspectionlistModel'
	},
});