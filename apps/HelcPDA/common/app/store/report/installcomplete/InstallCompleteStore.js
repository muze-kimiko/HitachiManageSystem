Ext.define('HelcPDA.store.report.installcomplete.InstallCompleteStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.report.installcomplete.InstallCompleteModel'],
	config:{
		model:'HelcPDA.model.report.installcomplete.InstallCompleteModel'
	},
});