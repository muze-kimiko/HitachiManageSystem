Ext.define('HelcPDA.store.inspection.inspectionlistStore',{
	id:'store',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.inspection.inspectionlistModel'],
	config:{
		model:'HelcPDA.model.inspection.inspectionlistModel'
	},
});