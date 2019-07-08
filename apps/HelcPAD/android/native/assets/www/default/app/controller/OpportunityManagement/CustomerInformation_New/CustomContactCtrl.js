
/* JavaScript content from app/controller/OpportunityManagement/CustomerInformation_New/CustomContactCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.CustomerInformation_New.CustomContactCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回
			"button#customcontact_new_id_FH":{
				tap:'customcontact_new_id_FH'
			},
			
			//保存
			"button#customcontact_new_id_BC":{
				tap:'customcontact_new_id_BC'
			},

			
		}
	},
	
	//返回按钮
	customcontact_new_id_FH:function(){
		this.showBackView('custominfo_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomInfo');
	},
	
	//保存
	customcontact_new_id_BC:function(){
	},


});