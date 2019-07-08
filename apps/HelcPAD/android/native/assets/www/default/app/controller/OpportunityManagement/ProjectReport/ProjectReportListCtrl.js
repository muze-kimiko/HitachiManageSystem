
/* JavaScript content from app/controller/OpportunityManagement/ProjectReport/ProjectReportListCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.ProjectReport.ProjectReportListCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回按钮
			"button#ProjectReportList_FH":{
				tap:'ProjectReportList_FH'
			},
			
			//跳转至跟进情况
//			"list#ProjectReportList_id_SJGJ":{
//				itemtap:'ProjectReportList_id_SJGJ'
//			},

			
			
		}
	},
	
	//返回按钮
	ProjectReportList_FH:function(){
		this.showBackView('ProjectReportSearchId','HelcPAD.view.OpportunityManagement.ProjectReport.ProjectReportSearch');
	},
	
//	ProjectReportList_id_SJGJ:function(){
//		this.NextView('ProjectFollowSearchId','HelcPAD.view.appworkspace.ProjectFollow.ProjectFollowSearch');
//	},

	
	

});