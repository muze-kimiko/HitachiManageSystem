
/* JavaScript content from app/store/report/installweekly/InstallWeeklyListStore.js in folder common */
Ext.define('HelcPDA.store.report.installweekly.InstallWeeklyListStore',{
	id:'installWeeklyStore',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.report.installweekly.InstallWeeklyListModel'],
	config:{
		model:'HelcPDA.model.report.installweekly.InstallWeeklyListModel'
	}
});