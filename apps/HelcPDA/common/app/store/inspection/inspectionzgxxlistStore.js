Ext.define('HelcPDA.store.inspection.inspectionfjlistStore',{
	id:'store',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.inspection.inspectionfjlistModel'],
	config:{
		model:'HelcPDA.model.inspection.inspectionfjlistModel'
	},
});