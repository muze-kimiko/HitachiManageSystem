Ext.define('HelcPDA.store.install.installprocess.ProcessListStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.install.installprocess.ProcessListModel'],
	config:{
		model:'HelcPDA.model.install.installprocess.ProcessListModel'
	},
});