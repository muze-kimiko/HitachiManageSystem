
/* JavaScript content from app/store/ForApprovalProcess/DailyOffice/Idea/personnelSelectionS.js in folder common */
/**
 * 审批意见
 */
Ext.define("HelcOA.store.ForApprovalProcess.DailyOffice.Idea.personnelSelectionS",{
	extend:'Ext.data.Store',
	id:'personnelSelectionS_ID',
	requires:["HelcOA.model.startTheProcess.DailyOffice.Idea.personnelSelectionM"],
	config:{
		model:'HelcOA.model.startTheProcess.DailyOffice.Idea.personnelSelectionM',
	}
});