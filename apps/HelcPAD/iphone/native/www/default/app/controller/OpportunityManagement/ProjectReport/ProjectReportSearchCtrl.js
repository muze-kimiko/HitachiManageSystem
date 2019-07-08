
/* JavaScript content from app/controller/OpportunityManagement/ProjectReport/ProjectReportSearchCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.ProjectReport.ProjectReportSearchCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//汇总按钮
			"button#ProjectReportSearch_HZ":{
				tap:'ProjectReportSearch_HZ'
			}
		}
	},
	
	//汇总按钮
	ProjectReportSearch_HZ:function(obj, e, eOpts ){
		this.NextView('ProjectReportListId','HelcPAD.view.OpportunityManagement.ProjectReport.ProjectReportList');
		
		this.sssjjj();
	},


});