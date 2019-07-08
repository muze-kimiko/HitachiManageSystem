
/* JavaScript content from app/store/OaMobileOffice/ElectronicProcess/approvalOpinionS.js in folder common */
/**
 * 审批意见
 */
Ext.define("HelcPAD.store.OaMobileOffice.ElectronicProcess.approvalOpinionS",{
	extend:'Ext.data.Store',
	id:'approvalOpinionS_ID',
	requires:["HelcPAD.model.OaMobileOffice.ElectronicProcess.approvalOpinionM"],
	config:{
		model:'HelcPAD.model.OaMobileOffice.ElectronicProcess.approvalOpinionM',
	}
});