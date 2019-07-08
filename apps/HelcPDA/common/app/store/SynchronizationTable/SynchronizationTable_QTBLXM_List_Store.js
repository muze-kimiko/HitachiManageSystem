Ext.define('HelcPDA.store.SynchronizationTable.SynchronizationTable_QTBLXM_List_Store',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.SynchronizationTable.SynchronizationTable_QTBLXM_List_Model'],
	config:{
		model:'HelcPDA.model.SynchronizationTable.SynchronizationTable_QTBLXM_List_Model'
	},
});