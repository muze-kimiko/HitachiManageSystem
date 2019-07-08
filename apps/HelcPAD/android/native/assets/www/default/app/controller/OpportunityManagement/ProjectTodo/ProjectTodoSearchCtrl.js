
/* JavaScript content from app/controller/OpportunityManagement/ProjectTodo/ProjectTodoSearchCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.ProjectTodo.ProjectTodoSearchCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			
			
			//发送提醒信息list
			"list#ProjectTodoSearch_id_SJGJ":{
				itemtap:'ProjectTodoSearch_id_SJGJ'
			},
			
		}
	},
	
	
	ProjectTodoSearch_id_SJGJ:function(dataview, index, target, record, e, eOpts){
		if(event.target.id!='conkung_conlist'){
			//this.NextView('ProjectFollowSearchId','HelcPAD.view.appworkspace.ProjectFollow.ProjectFollowSearch');
		}else{
			var sele=document.getElementsByName('groupkung_conlist');
			var checkbox = sele[index];
			 if(checkbox.style.color==''){
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(204, 204, 204)'){
	    		  //是未选中的情况下
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(224, 58, 62)'){
	    		//是选中的情况下
	    		  checkbox.style.color='#ccc';
	    	  };
		};
	},
});