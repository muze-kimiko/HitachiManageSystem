Ext.define('HelcPDA.store.fault.AccessoriesListStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.fault.AccessoriesListModel'],
	config:{
		model:'HelcPDA.model.fault.AccessoriesListModel'
	},
});