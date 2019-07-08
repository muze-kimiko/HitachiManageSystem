Ext.define("HelcPDA.store.historyFaultM.historyFaultS",{
	extend:'Ext.data.Store',
	id:'historyFaultS',
	requires:["HelcPDA.model.historyFaultM.historyFaultM"],
	config:{
		model:'HelcPDA.model.historyFaultM.historyFaultM',
	

	}
});