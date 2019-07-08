/**
 * 已审批-工作联络书
 */
Ext.define('HelcOA.controller.Approved.DailyOffice.travelRequestCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'travelRequestCtrl_id',
	config:{
		control:{
			'button#ysp_returnApproved':{
				tap:'returnApproved',
			 }
		}
	},
	
	/**
	 * 返回已审批列表
	 **/
	returnApproved : function(){
		this.BackAndDestroy('Approved_id','HelcOA.view.Approved.Approved');
//		var viewName=Ext.getCmp("ysp_jobContactBook_ID");
//		   if(viewName){
//			   viewName.destroy();
//		   }
	}
});