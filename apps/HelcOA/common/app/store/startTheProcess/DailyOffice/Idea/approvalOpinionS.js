/**
 * 审批意见
 */
Ext.define("HelcOA.store.startTheProcess.DailyOffice.Idea.approvalOpinionS",{
	extend:'Ext.data.Store',
	id:'approvalOpinionS_ID',
	requires:["HelcOA.model.ForApprovalProcess.DailyOffice.Idea.approvalOpinionM"],
	config:{
		model:'HelcOA.model.ForApprovalProcess.DailyOffice.Idea.approvalOpinionM',
	}
});