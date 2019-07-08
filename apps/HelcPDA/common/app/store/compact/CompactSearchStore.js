Ext.define('HelcPDA.store.compact.CompactSearchStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.compact.CompactSearchModel'],
	config:{
		model:'HelcPDA.model.compact.CompactSearchModel'
	},
});