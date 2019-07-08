/**
 * 审批意见
 */
Ext.define("HelcOA.store.PublicPersonnelSelectionS",{
	extend:'Ext.data.Store',
	requires:["HelcOA.model.PublicPersonnelSelectionM"],
	config:{
		model:'HelcOA.model.PublicPersonnelSelectionM',
	}
});