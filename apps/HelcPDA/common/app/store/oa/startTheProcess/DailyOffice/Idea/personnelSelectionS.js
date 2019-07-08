/**
 * 审批意见
 */
Ext.define("HelcPDA.store.oa.startTheProcess.DailyOffice.Idea.personnelSelectionS",{
	extend:'Ext.data.Store',
	id:'personnelSelectionS_ID',
	requires:["HelcPDA.model.oa.startTheProcess.DailyOffice.Idea.personnelSelectionM"],
	config:{
		model:'HelcPDA.model.oa.startTheProcess.DailyOffice.Idea.personnelSelectionM',
	}
});