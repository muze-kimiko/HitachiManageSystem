Ext.define('HelcPDA.store.inspection.inspectionzgxxlistStore',{
	id:'store',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.inspection.inspectionzgxxlistModel'],
	config:{
		model:'HelcPDA.model.inspection.inspectionzgxxlistModel'
	},
});