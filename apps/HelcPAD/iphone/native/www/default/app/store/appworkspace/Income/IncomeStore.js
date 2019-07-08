
/* JavaScript content from app/store/appworkspace/Income/IncomeStore.js in folder common */
Ext.define("HelcPAD.store.appworkspace.Income.IncomeStore",{
	extend:'Ext.data.Store',
	id:'listStore_id',
	requires:["HelcPAD.model.appworkspace.Income.IncomeModel"],
	config:{
		model:'HelcPAD.model.appworkspace.Income.IncomeModel',
	}
});