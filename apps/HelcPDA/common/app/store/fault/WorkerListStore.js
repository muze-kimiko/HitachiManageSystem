Ext.define('HelcPDA.store.fault.WorkerListStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.fault.WorkerListModel'],
	config:{
		model:'HelcPDA.model.fault.WorkerListModel'
	},
});