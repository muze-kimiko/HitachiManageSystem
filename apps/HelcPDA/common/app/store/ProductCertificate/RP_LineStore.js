Ext.define('HelcPDA.store.ProductCertificate.RP_LineStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.ProductCertificate.RP_LineModel'],
	config:{
		model:'HelcPDA.model.ProductCertificate.RP_LineModel'
	},
});