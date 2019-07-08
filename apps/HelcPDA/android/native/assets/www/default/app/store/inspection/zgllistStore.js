
/* JavaScript content from app/store/inspection/zgllistStore.js in folder common */
Ext.define('HelcPDA.store.inspection.zgllistStore',{
	id:'zgllistStore',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.inspection.zgllistModel'],
	config:{
		model:'HelcPDA.model.inspection.zgllistModel'
	},
});