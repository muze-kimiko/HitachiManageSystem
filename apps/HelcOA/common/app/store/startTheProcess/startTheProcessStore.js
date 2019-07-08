Ext.define("HelcOA.store.startTheProcess.startTheProcessStore",{
	extend:'Ext.data.Store',
	id:'qc_StartprocessStore_id',
	requires:["HelcOA.model.startTheProcess.startTheProcessModel"],
	config:{
		model:'HelcOA.model.startTheProcess.startTheProcessModel',
		
	}
});