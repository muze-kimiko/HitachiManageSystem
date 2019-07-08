Ext.define('HelcPDA.store.install.installcheck.InstallatoinTasksFactoryStore',{
	id:'installatoinTasksFactoryStore',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.install.installcheck.InstallatoinTasksFactoryModel'],
	config:{
		model:'HelcPDA.model.install.installcheck.InstallatoinTasksFactoryModel'
	},
});