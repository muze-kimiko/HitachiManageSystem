Ext.define('HelcPAD.store.common.SelectFieldListStore',{
	extend:'Ext.data.Store',
	requires:['HelcPAD.model.common.SelectFieldListModel'],
	config:{
		model:'HelcPAD.model.common.SelectFieldListModel',
	},
});