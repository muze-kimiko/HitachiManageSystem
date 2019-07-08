Ext.define('HelcPDA.store.Contacts.TelephoneAddressStore',{
	extend:'Ext.data.Store',
	requires:['HelcPDA.model.Contacts.TelephoneAddressModel'],
	config:{
		model:'HelcPDA.model.Contacts.TelephoneAddressModel'
	},
});