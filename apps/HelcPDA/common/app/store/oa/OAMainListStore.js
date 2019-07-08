Ext.define('HelcPDA.store.oa.OAMainListStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.oa.OAMainListModel'],
	config:{
		model:'HelcPDA.model.oa.OAMainListModel'
	},
});