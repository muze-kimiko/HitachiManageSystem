Ext.define('HelcPDA.store.maintain.ServicePersonnel',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.maintain.ServicePersonnelModel'],
	config:{
		model:'HelcPDA.model.maintain.ServicePersonnelModel'
	},
});