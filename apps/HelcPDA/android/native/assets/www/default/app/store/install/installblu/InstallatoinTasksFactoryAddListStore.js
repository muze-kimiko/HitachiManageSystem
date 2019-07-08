
/* JavaScript content from app/store/install/installblu/InstallatoinTasksFactoryAddListStore.js in folder common */
Ext.define('HelcPDA.store.install.installblu.InstallatoinTasksFactoryAddListStore',{
	id:'store',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.install.installblu.InstallationTasksShakedownAddListModel'],
	config:{
		model:'HelcPDA.model.install.installblu.InstallationTasksShakedownAddListModel'
	},
});