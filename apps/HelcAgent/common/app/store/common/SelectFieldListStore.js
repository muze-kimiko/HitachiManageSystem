Ext.define('HelcAgent.store.common.SelectFieldListStore',{
	extend:'Ext.data.Store',
	requires:['HelcAgent.model.common.SelectFieldListModel'],
	config:{
		model:'HelcAgent.model.common.SelectFieldListModel',
	},
});