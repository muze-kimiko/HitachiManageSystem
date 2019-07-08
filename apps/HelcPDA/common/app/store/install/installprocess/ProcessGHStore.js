Ext.define('HelcPDA.store.install.installprocess.ProcessGHStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.install.installprocess.ProcessGHModel'],
	config:{
		model:'HelcPDA.model.install.installprocess.ProcessGHModel'
	},
//	sorters:'ELEVATOR_NO'
});