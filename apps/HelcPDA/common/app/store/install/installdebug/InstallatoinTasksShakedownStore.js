Ext.define('HelcPDA.store.install.installdebug.InstallatoinTasksShakedownStore',{
	id:'store',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.install.installdebug.InstallatoinTasksShakedownModel'],
	config:{
		model:'HelcPDA.model.install.installdebug.InstallatoinTasksShakedownModel'
	},
});