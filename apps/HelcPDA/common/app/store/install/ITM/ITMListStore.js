Ext.define('HelcPDA.store.install.ITM.ITMListStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.install.ITM.ITMListModel'],
	config:{
		model:'HelcPDA.model.install.ITM.ITMListModel'
	},
});