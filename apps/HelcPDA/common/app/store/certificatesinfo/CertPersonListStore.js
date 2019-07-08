Ext.define('HelcPDA.store.certificatesinfo.CertPersonListStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.certificatesinfo.CertPersonListModel'],
	config:{
		model:'HelcPDA.model.certificatesinfo.CertPersonListModel'
	},
});