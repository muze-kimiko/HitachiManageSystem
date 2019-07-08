Ext.define('HelcPDA.store.SynchronizationTable.SynchronizationTable_QTBLXM_Store',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.SynchronizationTable.SynchronizationTable_QTBLXM_Model'],
	config:{
		model:'HelcPDA.model.SynchronizationTable.SynchronizationTable_QTBLXM_Model'
	},
});