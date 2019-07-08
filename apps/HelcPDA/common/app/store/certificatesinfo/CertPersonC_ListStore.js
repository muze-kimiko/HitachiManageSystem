Ext.define('HelcPDA.store.certificatesinfo.CertPersonC_ListStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.certificatesinfo.CertPersonC_ListModel'],
	config:{
		model:'HelcPDA.model.certificatesinfo.CertPersonC_ListModel'
	},
});