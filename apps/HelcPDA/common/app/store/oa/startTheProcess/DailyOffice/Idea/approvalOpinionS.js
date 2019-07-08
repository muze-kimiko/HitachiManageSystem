/**
 * 审批意见
 */
Ext.define("HelcPDA.store.oa.startTheProcess.DailyOffice.Idea.approvalOpinionS",{
	extend:'Ext.data.Store',
	requires:["HelcPDA.model.oa.startTheProcess.DailyOffice.Idea.approvalOpinionM"],
	config:{
		model:'HelcPDA.model.oa.startTheProcess.DailyOffice.Idea.approvalOpinionM',
	}
});