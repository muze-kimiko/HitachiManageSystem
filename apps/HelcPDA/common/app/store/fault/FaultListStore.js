Ext.define('HelcPDA.store.fault.FaultListStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.fault.FaultListModel'],
	config:{
		model:'HelcPDA.model.fault.FaultListModel'
	},
});