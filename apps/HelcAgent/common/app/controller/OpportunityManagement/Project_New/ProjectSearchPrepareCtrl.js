Ext.define('HelcAgent.controller.OpportunityManagement.Project_New.ProjectSearchPrepareCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	config:{
		control:{
			 //返回 
			 'button#projectsearchprepare_new_id_FH':{
			 	tap:'projectsearchprepare_new_id_FH',
			 },
			 
			 //检测
			 'button#projectsearchprepare_new_id_JC':{
				tap:'projectsearchprepare_new_id_JC' 
			 },
			 //选择安装地点
			 'button#selectSite':{
				 tap:'selectSite'
			 },
		},
	},
	
	//检测
	projectsearchprepare_new_id_JC:function(){
		var obj = this;

		var opportunityName = Ext.getCmp('opportunityName').getValue().trim();
		var customerName = Ext.getCmp('customerName').getValue().trim();
		var setPlace = Ext.getCmp('setPlace').getValue().trim();
		var customerCompany = Ext.getCmp('customerCompany').getValue().trim();
		
		if(this.emptyOrNull(opportunityName)&&this.emptyOrNull(customerName)&&this.emptyOrNull(setPlace)&&this.emptyOrNull(customerCompany)){
			Ext.Msg.alert('验证提示','填写一个表单值后方能检测');
			return ;
		}
		
		var condition = "([Opportunity.Name] like '*"+opportunityName+"*' AND [Opportunity.Account]like '*"+customerName+"*' AND [Opportunity.Oppty Install Site] like  '*"+setPlace+"*' AND [Opportunity.Oppty Final User] like '*"+customerCompany+"*' ) AND [Opportunity.Oppty Type] = '设备商机'"; 
		
		var param= {
				SearchSpec:condition,
				viewmodel:'All',
				userID:userID
		};
		var getResult=function(result){
			if(result==undefined){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}
			if(result.NumOutputObjects=="0"){
				Ext.Msg.alert('提示','该商机不存在，请完善商机的其他信息后提交商机');
				obj.NextView('projectinfo_new_id','HelcAgent.view.OpportunityManagement.Project_New.ProjectInfo');
				obj.getApplication().getController('HelcAgent.controller.OpportunityManagement.Project_New.ProjectInfoCtrl').toInit();
				var RK=Ext.getCmp('projectsearchprepare_new_id_XZ').getValue();
				var name = Ext.getCmp('Name');
				name.setValue(opportunityName);
				name.setReadOnly(true);
				if(RK=='A线'){
					Ext.getCmp('projectinfo_new_id_XZ').setValue(RK);
				}else if(RK=='B线'){
					Ext.getCmp('projectinfo_new_id_XZ').setValue(RK);
				};
			}
			else{
				Ext.Msg.alert('商机已存在！');
			}
		};
		
		var data = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'checkOpportunity',
				parameters:param
		};
		
		this.connectServer_checkOpportunity(getResult,data);
		
	},
	
	//返回
	projectsearchprepare_new_id_FH:function(){
		//var obj=this;
		this.BackView();
		/*var CK=Ext.getCmp('projectsearchprepare_new_id_XZ').getValue();
		if(CK=='A线'){// ProjectInfo  →  ProjectSearchPrepare →  ProjectList
			obj.showBackView('projectlist_new_id','HelcAgent.view.OpportunityManagement.Project_New.ProjectList');
		}else if(CK=='B线'){// ProjectInfo  →  ProjectSearchPrepare →  PADMain
			obj.showBackView('pdamain','HelcAgent.view.login.PADMain');
		}else{
			
		}*/
		
	},
	//选择安装地点
	selectSite:function(){
		this.NextView('installSitePanel','HelcAgent.view.OpportunityManagement.Project_New.InstallSiteView');
		Ext.getCmp('installSiteComeSource').setValue('HelcAgent.controller.OpportunityManagement.Project_New.ProjectSearchPrepareCtrl');
		this.getApplication().getController('HelcAgent.controller.OpportunityManagement.Project_New.InstallSiteCtrl').toInit('installSite');
	},
	emptyOrNull:function(value){
		
		if(value==""||value==undefined)
			return true;
		else 
			return false;
	}
});