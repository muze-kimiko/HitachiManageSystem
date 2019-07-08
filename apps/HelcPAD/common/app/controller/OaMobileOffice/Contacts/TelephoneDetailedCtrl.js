Ext.define('HelcPAD.controller.OaMobileOffice.Contacts.TelephoneDetailedCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
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
		this.showBackView('telephonelist_id','HelcPAD.view.OaMobileOffice.Contacts.TelephoneList');
	},
});