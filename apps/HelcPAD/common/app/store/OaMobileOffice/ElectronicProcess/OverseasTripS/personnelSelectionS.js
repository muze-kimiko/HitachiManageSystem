/**
 * 审批意见
 */
Ext.define("HelcPAD.store.OaMobileOffice.ElectronicProcess.OverseasTripS.personnelSelectionS",{
	extend:'Ext.data.Store',
	id:'personnelSelectionS_ID',
	requires:["HelcPAD.model.OaMobileOffice.ElectronicProcess.OverseasTripM.personnelSelectionM"],
	config:{
		model:'HelcPAD.model.OaMobileOffice.ElectronicProcess.OverseasTripM.personnelSelectionM',
	}
});