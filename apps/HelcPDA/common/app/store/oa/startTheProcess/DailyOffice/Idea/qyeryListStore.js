/**
 * 起草-人员查询列表
 */
Ext.define("HelcPDA.store.oa.startTheProcess.DailyOffice.Idea.qyeryListStore",{
	extend:'Ext.data.Store',
	requires:["HelcPDA.model.oa.startTheProcess.DailyOffice.Idea.qyeryListModel"],
	config:{
		model:'HelcPDA.model.oa.startTheProcess.DailyOffice.Idea.qyeryListModel',
	}
});