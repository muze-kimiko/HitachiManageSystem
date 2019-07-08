Ext.define('HelcPDA.store.inspection.ghllistStore',{
	id:'ghllistStore',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.inspection.ghllistModel'],
	config:{
		model:'HelcPDA.model.inspection.ghllistModel'
	},
});