/**
 * 起草-人员查询列表
 */
Ext.define("HelcPAD.store.OaMobileOffice.ElectronicProcess.OverseasTripS.qyeryListStore",{
	extend:'Ext.data.Store',
	id:'qc_qyeryListStore_ID',
	requires:["HelcPAD.model.OaMobileOffice.ElectronicProcess.OverseasTripM.qyeryListModel"],
	config:{
		model:'HelcPAD.model.OaMobileOffice.ElectronicProcess.OverseasTripM.qyeryListModel',
	}
});