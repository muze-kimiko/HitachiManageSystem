
/* JavaScript content from app/store/startTheProcess/DailyOffice/travelRequestS.js in folder common */
/**
 * 出差申请表
 */
Ext.define("HelcOA.store.ForApprovalProcess.DailyOffice.travelRequestS",{
	extend:'Ext.data.Store',
	id:'travelRequestS_ID',
	requires:["HelcOA.model.ForApprovalProcess.DailyOffice.travelRequestM"],
	config:{
		model:'HelcOA.model.ForApprovalProcess.DailyOffice.travelRequestM',
	}
});

