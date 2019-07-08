Ext.define('HelcPDA.store.login.BacklogStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.login.BacklogModel'],
	config:{
		model:'HelcPDA.model.login.BacklogModel'
	},
});