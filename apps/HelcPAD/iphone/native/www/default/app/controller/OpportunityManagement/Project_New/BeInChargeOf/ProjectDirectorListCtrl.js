
/* JavaScript content from app/controller/OpportunityManagement/Project_New/BeInChargeOf/ProjectDirectorListCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorListCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//商机列表   返回
			'button#projectdirectorlist_new_id_FH':{
				tap:'projectdirectorlist_new_id_FH',
			},
			
			//商机列表  list
			'list#projectdirectorlist_new_id_list':{
				itemtap:'projectdirectorlist_new_id_list'
			},
			//该处为商机查看部分的列表点击
			'list#projectDirectorLookForListOuter':{
				itemtap:'projectDirectorLookForListOuter'
			}
			 	 
		},	
	},
	//该处为商机查看部分的列表点击
	projectDirectorLookForListOuter:function(dataview, index, target, record, e, eOpts){
		object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').projectdirectormain_new_id__DSP_list(dataview, index, target, record, e, eOpts);
	},
	//商机列表  list
	projectdirectorlist_new_id_list:function(dataview, index, target, record, e, eOpts){
		//直接进入商机详细
		this.NextView('projectinfo_new_id','HelcPAD.view.OpportunityManagement.Project_New.ProjectInfo');
		Ext.getCmp('projectinfo_new_id_XZ').setValue('F线');
	},
	
	//商机列表   返回
	projectdirectorlist_new_id_FH:function(){
		this.BackView();
	},
	

	
});	



