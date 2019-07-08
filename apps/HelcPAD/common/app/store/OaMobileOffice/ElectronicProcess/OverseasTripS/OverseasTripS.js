/**
 * 境外出差申请表
 */
Ext.define('HelcPAD.store.OaMobileOffice.ElectronicProcess.OverseasTripS.OverseasTripS', {
	extend:'Ext.data.Store',
	id:'OverseasTripS_ID',
	requires:["HelcPAD.model.OaMobileOffice.ElectronicProcess.OverseasTripM.OverseasTripM"],
	config:{
		model:'HelcPAD.model.OaMobileOffice.ElectronicProcess.OverseasTripM.OverseasTripM',
	}
});