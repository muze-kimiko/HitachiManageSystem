
/* JavaScript content from app/store/appworkspace/BatchApply/BatchListStore.js in folder common */
/**
 * 待审批单
 */
Ext.define('HelcPAD.store.appworkspace.BatchApply.BatchListStore',{
	extend:'Ext.data.Store',
	requires:['HelcPAD.model.appworkspace.BatchApply.BatchListModel'],
	config:{
		model:'HelcPAD.model.appworkspace.BatchApply.BatchListModel'
	},
});