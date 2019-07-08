/**
 * 审批意见
 */
Ext.define("HelcOA.store.ForApprovalProcess.DailyOffice.Idea.approvalOpinionS",{
	extend:'Ext.data.Store',
	id:'approvalOpinionS_ID',
	requires:["HelcOA.model.startTheProcess.DailyOffice.Idea.approvalOpinionM"],
	config:{
		model:'HelcOA.model.startTheProcess.DailyOffice.Idea.approvalOpinionM',
	}
});