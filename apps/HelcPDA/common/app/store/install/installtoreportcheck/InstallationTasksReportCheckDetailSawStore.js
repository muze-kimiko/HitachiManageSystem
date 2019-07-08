Ext.define('HelcPDA.store.install.installtoreportcheck.InstallationTasksReportCheckDetailSawStore',{
	id:'store',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.install.installtoreportcheck.InstallationTasksReportCheckDetailSawModel'],
	config:{
		model:'HelcPDA.model.install.installtoreportcheck.InstallationTasksReportCheckDetailSawModel'
	},
});