/**
 * 已结束-工作联络书
 */
Ext.define('HelcOA.controller.HasEnded.DailyOffice.travelRequestCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'travelRequestCtrl_id',
	config:{
		control:{
			'button#yjs_returnHasEnded':{
				tap:'returnHasEnded',
			 }
		}
	},
	
	/**
	 * 返回 已结束-列表
	 **/
	returnHasEnded : function(){
//		this.BackAndDestroy('HasEnded_id','HelcOA.view.HasEnded.HasEnded');
		this.BackAndDestroy();
//		var viewName=Ext.getCmp("yjs_jobContactBook_ID");
//		   if(viewName){
//			   viewName.destroy();
//		   }
	}
});