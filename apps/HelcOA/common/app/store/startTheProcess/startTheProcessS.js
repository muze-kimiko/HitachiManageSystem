Ext.define("HelcOA.store.startTheProcess.startTheProcessS",{
	extend:'Ext.data.Store',
	id:'qc_StartProcessS_id',
	requires:["HelcOA.model.startTheProcess.startTheProcessM"],
	config:{
		model:'HelcOA.model.startTheProcess.startTheProcessM',
	}
});