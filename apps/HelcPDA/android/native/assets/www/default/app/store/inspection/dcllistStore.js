
/* JavaScript content from app/store/inspection/dcllistStore.js in folder common */
Ext.define('HelcPDA.store.inspection.dcllistStore',{
	id:'store',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.inspection.dcllistModel'],
	config:{
		model:'HelcPDA.model.inspection.dcllistModel'
	},
});