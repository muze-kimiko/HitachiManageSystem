Ext.define("HelcOA.store.MyProcess.MyProcessStore",{
	extend:'Ext.data.Store',
	id:'MyProcessStore_id',
	requires:["HelcOA.model.MyProcess.MyProcessModel"],
	config:{
		model:'HelcOA.model.MyProcess.MyProcessModel',
		
		
	}
});