Ext.define('HelcPDA.store.map.MapBelowEmployeeStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.map.MapAroundPeopleModel'],
	config:{
		model:'HelcPDA.model.map.MapAroundPeopleModel'
	},
});