/**
 * 起草-人员查询列表
 */
Ext.define("HelcOA.store.ForApprovalProcess.DailyOffice.Idea.qyeryListStore",{
	extend:'Ext.data.Store',
	id:'qyeryListStore_ID',
	requires:["HelcOA.model.ForApprovalProcess.DailyOffice.Idea.qyeryListModel"],
	config:{
		model:'HelcOA.model.ForApprovalProcess.DailyOffice.Idea.qyeryListModel',
	}
});