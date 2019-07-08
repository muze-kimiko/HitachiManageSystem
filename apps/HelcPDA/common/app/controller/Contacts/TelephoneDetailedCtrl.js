Ext.define('HelcPDA.controller.Contacts.TelephoneDetailedCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		control:{
			//返回按钮
			"button#telephonedetailed_id_FH":{
				tap:'telephonedetailed_id_FH'
			},
		}
	},
	
	///返回按钮
	telephonedetailed_id_FH:function(){
		this.showBackView('telephonelist_id','HelcPDA.view.Contacts.TelephoneList');
	},
});