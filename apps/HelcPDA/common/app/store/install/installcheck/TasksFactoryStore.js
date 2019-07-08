Ext.define('HelcPDA.store.install.installcheck.TasksFactoryStore',{
	id:'TasksFactoryStore',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.install.installcheck.TasksFactoryModel'],
	config:{
		model:'HelcPDA.model.install.installcheck.TasksFactoryModel'
	},
});