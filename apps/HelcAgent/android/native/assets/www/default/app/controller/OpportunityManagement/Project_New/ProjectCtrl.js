
/* JavaScript content from app/controller/OpportunityManagement/Project_New/ProjectCtrl.js in folder common */
Ext.define('HelcAgent.controller.OpportunityManagement.Project_New.ProjectCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	config:{
		control:{ 	 
			 //商机资料 返回
			 'button#projectlist_new_id_FH':{
			 	 tap:'projectlist_new_id_FH',
			 },
			
			 //商机资料2 list
			 'list#projectlist_new_id_list':{
				 itemtap:'projectlist_new_id_list'
			 },
			 //商机资料2 新建
			 'button#projectlist_new_id_XZ':{
				 tap:'projectlist_new_id_XZ'
			 },
		},
	},
	
	//商机资料2 新建   (list没有数据才显示)
	projectlist_new_id_XZ:function(){
		this.NextView('projectinfo_new_id','HelcAgent.view.OpportunityManagement.Project_New.ProjectSearchPrepare');
		Ext.getCmp('projectsearchprepare_new_id_XZ').setValue('A线');
	},
	//商机资料  返回
	projectlist_new_id_FH:function(){
		this.showBackView('projectsearch_new_id','HelcAgent.view.OpportunityManagement.Project_New.ProjectSearch');
	},
	
	//商机资料 list
	projectlist_new_id_list:function(dataview, index, target, record, e, eOpts){
		if(event.target.id!='conkung_projectlist'){
			this.NextView('projectinfo_new_id','HelcAgent.view.OpportunityManagement.Project_New.ProjectInfo');
			Ext.getCmp('projectinfo_new_id_XZ').setValue('C线');
		}else{
			var sele=document.getElementsByName('groupkung_projectlist');
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
		}
		
		
		
	},
	//商机流失原因
	projectinfo_new_id_QTXX_SJLSYYFX:function(){

	},
	
	
	
});	



