/**
 * 我的流程-工作联络书
 */
Ext.define('HelcOA.controller.MyProcess.DailyOffice.travelRequestCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'travelRequestCtrl_id',
	config:{
		control:{
			'button#wdlc_returnMyProcess':{
				tap:'returnMyProcess',
			 }
		}
	},
	
	/**
	 * 返回 我的流程-列表
	 **/
	returnMyProcess : function(){
		this.BackAndDestroy('MyProcess_id','HelcOA.view.MyProcess.MyProcess');
//		var viewName=Ext.getCmp("wdlc_jobContactBook_ID");
//		   if(viewName){
//			   viewName.destroy();
//		   }
	}
});