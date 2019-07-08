
/* JavaScript content from app/store/install/installsendbox/InstallSendBox_list_Store.js in folder common */
Ext.define("HelcPDA.store.install.installsendbox.InstallSendBox_list_Store",{
	extend:'Ext.data.Store',
	id:'instsb_list_store',
	requires:["HelcPDA.model.install.installsendbox.InstallSendBoxListModel"],
	config:{
		model:'HelcPDA.model.install.installsendbox.InstallSendBoxListModel',

	}
});