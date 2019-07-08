Ext.define('HelcPDA.store.SynchronizationTable.SynchronizationTable_XMH_Store',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.SynchronizationTable.SynchronizationTable_XMH_Model'],
	config:{
		model:'HelcPDA.model.SynchronizationTable.SynchronizationTable_XMH_Model'
	},
});