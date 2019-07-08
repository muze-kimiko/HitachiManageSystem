Ext.define('HelcPDA.store.report.installrecord.InstallRecordListStore',{
	id:'installRecordStore',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.report.installrecord.InstallRecordListModel'],
	config:{
		model:'HelcPDA.model.report.installrecord.InstallRecordListModel'
	}
});