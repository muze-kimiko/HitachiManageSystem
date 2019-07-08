/**
 * 起草-人员查询列表
 */
Ext.define("HelcOA.store.startTheProcess.DailyOffice.Idea.qyeryListStore",{
	extend:'Ext.data.Store',
	id:'qc_qyeryListStore_ID',
	requires:["HelcOA.model.startTheProcess.DailyOffice.Idea.qyeryListModel"],
	config:{
		model:'HelcOA.model.startTheProcess.DailyOffice.Idea.qyeryListModel',
	}
});