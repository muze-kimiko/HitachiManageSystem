Ext.define("HelcPDA.store.install.FaultDirectionStore",{
	extend:'Ext.data.Store',
	id:'FaultDirectionStore_id',
	requires:["HelcPDA.model.install.FaultDirectionModel"],
	config:{
		model:'HelcPDA.model.install.FaultDirectionModel',
	

	}
});