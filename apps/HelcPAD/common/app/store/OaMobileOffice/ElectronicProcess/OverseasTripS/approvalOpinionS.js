/**
 * 审批意见
 */
Ext.define("HelcPAD.store.OaMobileOffice.ElectronicProcess.OverseasTripS.approvalOpinionS",{
	extend:'Ext.data.Store',
	id:'approvalOpinionS_ID',
	requires:["HelcPAD.model.OaMobileOffice.ElectronicProcess.OverseasTripM.approvalOpinionM"],
	config:{
		model:'HelcPAD.model.OaMobileOffice.ElectronicProcess.OverseasTripM.approvalOpinionM',
	}
});