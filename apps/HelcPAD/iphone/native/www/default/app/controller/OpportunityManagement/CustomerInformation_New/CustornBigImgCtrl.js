
/* JavaScript content from app/controller/OpportunityManagement/CustomerInformation_New/CustornBigImgCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.CustomerInformation_New.CustornBigImgCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回
			"button#custornBigImg_new_id_FH":{
				tap:'custornBigImg_new_id_FH'
			},
			
		}
	},
	
	//返回按钮
	custornBigImg_new_id_FH:function(){
		//this.showBackView('custominfo_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomInfo');
		this.BackView();
	},

});