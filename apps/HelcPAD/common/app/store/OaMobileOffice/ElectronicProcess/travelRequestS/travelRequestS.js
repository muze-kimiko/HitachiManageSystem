/**
 * 出差申请表
 */
Ext.define("HelcPAD.store.OaMobileOffice.ElectronicProcess.travelRequestS.travelRequestS",{
	extend:'Ext.data.Store',
	id:'travelRequestS_ID',
	requires:["HelcPAD.model.OaMobileOffice.ElectronicProcess.travelRequestM.travelRequestM"],
	config:{
		model:'HelcPAD.model.OaMobileOffice.ElectronicProcess.travelRequestM.travelRequestM',
	}
});

