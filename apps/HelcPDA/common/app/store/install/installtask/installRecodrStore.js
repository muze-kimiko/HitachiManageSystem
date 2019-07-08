
Ext.define("HelcPDA.store.install.installtask.installRecodrStore",{
	extend:'Ext.data.Store',
	id:'installRecodrStore_id',
	requires:["HelcPDA.model.install.installtask.installRecodrModel"],
	config:{
		model:'HelcPDA.model.install.installtask.installRecodrModel',

	}
});