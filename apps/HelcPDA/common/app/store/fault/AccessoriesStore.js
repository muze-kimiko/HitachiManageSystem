Ext.define('HelcPDA.store.fault.AccessoriesStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.fault.AccessoriesModel'],
	config:{
		model:'HelcPDA.model.fault.AccessoriesModel'
	},
});