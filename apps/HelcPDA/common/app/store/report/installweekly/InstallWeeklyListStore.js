Ext.define('HelcPDA.store.report.installweekly.InstallWeeklyListStore',{
	id:'installWeeklyStore',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.report.installweekly.InstallWeeklyListModel'],
	config:{
		model:'HelcPDA.model.report.installweekly.InstallWeeklyListModel'
	}
});