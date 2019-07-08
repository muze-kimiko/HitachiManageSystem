Ext.define('HelcPDA.store.SynchronizationTable.SynchronizationTable_JTB_Stored_list_Store',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.SynchronizationTable.SynchronizationTable_JTB_list_Model'],
	config:{
		model:'HelcPDA.model.SynchronizationTable.SynchronizationTable_JTB_list_Model'
	},
});