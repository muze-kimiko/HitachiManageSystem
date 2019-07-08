Ext.define('HelcPDA.store.oa.OAMainList1Store',{
	id:'store',
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.oa.OAMainListModel'],
	config:{
		model:'HelcPDA.model.oa.OAMainListModel'
	},
});