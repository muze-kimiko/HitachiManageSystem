
/* JavaScript content from app/controller/OpportunityManagement/Project_New/BeInChargeOf/ProjectWaitForLoseCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectWaitForLoseCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//带流失商机列表点击
			'list#waitForLoseOpptyList':{
				itemtap:'waitForLoseOpptyList'
			},
			//页面返回
			'button#projectWaitForLoseListBack':{
				tap:'projectWaitForLoseListBack'
			},
			//待处理商机的返回方法（均衡使用）
			'button#projectdirectormain_new_idBack':{
				tap:'projectdirectormain_new_idBack'
			},
			
		}
	},
	//带流失商机列表点击
	waitForLoseOpptyList:function(dataview, index, target, record, e, eOpts){
		//调用待处理商机的列表点击事件
		record.source = 'forLose';
		object.getController('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').projectdirectormain_new_id__DSP_list(dataview, index, target, record, e, eOpts);
		
	},
	projectWaitForLoseListBack:function(){
		var store = this.getStore('DirectorOpptyStore','HelcPAD.store.OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyStore');
		var count = store.getCount();
		this.BackView();
		var domCount = document.getElementById('waitForLoseOppty').innerText;
		if(count!=domCount){
			object.getController('login.PADMainCtrl').remindNumber();
		}
		
	},
	//待处理商机的返回方法
	projectdirectormain_new_idBack:function(){
		var store = this.getStore('DirectorOpptyStore','HelcPAD.store.OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyStore');
		var count = store.getCount();
		this.BackView();
		var domCount = document.getElementById('waitForHandlerOppty').innerText;
		if(count!=domCount){
			object.getController('login.PADMainCtrl').remindNumber();
		}
		
	}
});