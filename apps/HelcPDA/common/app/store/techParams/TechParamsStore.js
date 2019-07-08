Ext.define('HelcPDA.store.techParams.TechParamsStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.techParams.TechParamsModel'],
	config:{
		model:'HelcPDA.model.techParams.TechParamsModel'
	},
});