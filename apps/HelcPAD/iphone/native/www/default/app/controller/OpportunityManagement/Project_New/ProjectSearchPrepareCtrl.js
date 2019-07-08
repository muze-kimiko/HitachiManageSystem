
/* JavaScript content from app/controller/OpportunityManagement/Project_New/ProjectSearchPrepareCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.ProjectSearchPrepareCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
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
			 
			 //选择安装地点     不用   2016-4-5
			 /*'button#selectSite':{
				 tap:'selectSite'
			 },*/
		},
	},
	
	//检测
	projectsearchprepare_new_id_JC:function(){
		var obj = this;

		var opportunityName = Ext.getCmp('opportunityName').getValue().trim();
		/*var customerName = Ext.getCmp('customerName').getValue().trim();
		var setPlace = Ext.getCmp('setPlace').getValue().trim();
		var customerCompany = Ext.getCmp('customerCompany').getValue().trim();*/
		if(!opportunityName){
			Ext.Msg.alert('验证提示','商机名称为必填选项，且在新建时无法更改');
			return ;
		}
		
		var condition = "";
		if(opportunityName){
			condition += "([Opportunity.Name] = '"+opportunityName+"') AND [Opportunity.Oppty Type] = '设备商机'";
		}
		/*if(customerName){
			condition += returnCondition(condition);
			condition += "[Opportunity.Account] = '"+customerName+"'";
		}	
		if(setPlace){
			condition += returnCondition(condition);
			condition += "[Opportunity.Oppty Install Site] = '"+setPlace+"'";
			
		}	
		if(customerCompany){
			condition += returnCondition(condition);
			condition += "[Opportunity.Oppty Final User] = '"+customerCompany+"'";
		}	*/
		console.log(condition);
		var param= {
				SearchSpec:condition,
				viewmodel:'Sub-Organization',
				userID:userID,
				diverGgence:'checkOppty'
		};
		var getResult=function(result){
			console.log(result);
			if(!result.ListOfHelEaiAppOpportunity){
				myLoading.hide();
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}
			if(result.NumOutputObjects=="0"){
				myLoading.hide();
				Ext.Msg.alert('提示','该商机不存在，请完善商机的其他信息后提交商机');
				obj.NextView('projectinfo_new_id','HelcPAD.view.OpportunityManagement.Project_New.ProjectInfo');
				object.getController('OpportunityManagement.Project_New.ProjectListCtrl').status = null;
				object.getController('OpportunityManagement.Project_New.ProjectInfoCtrl').toInit();
				Ext.getCmp('salesRep').setValue(usernames);
				//登陆人所拥有的组织
				var organization = object.getController('OpportunityManagement.Agents.ClueCreateAgentCtrl').allAgents;//OrgName
				var organizationField = Ext.getCmp('organization');
				if(organization.length)
					organizationField.setValue(organization[0].OrgName);
				else
					organizationField.setValue(organization.OrgName);
				organizationField.setReadOnly(true);
				var name = Ext.getCmp('Name');
				name.setValue(opportunityName);
				name.setReadOnly(true);
				//安装地图坐标
				Ext.getCmp('InstallMapMark').setRequired(true);
				//创建日期
				Ext.getCmp('created').setRequired(true);
				
				
				/*var opptyForm = Ext.getCmp('projectinfo_new_id');
				var opptyField = opptyForm.query('field');
				for(var i=0;i<opptyField.lnegth;i++){
					try{
						opptyField[i].setRequired(true);
					}catch(e){
						
					}finally{
						continue;
					}
				}*/
			}
			else{
				myLoading.hide();
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
			obj.showBackView('projectlist_new_id','HelcPAD.view.OpportunityManagement.Project_New.ProjectList');
		}else if(CK=='B线'){// ProjectInfo  →  ProjectSearchPrepare →  PADMain
			obj.showBackView('pdamain','HelcPAD.view.login.PADMain');
		}else{
			
		}*/
		
	},
	
	//选择安装地点
	selectSite:function(){
		this.NextView('installSitePanel','HelcPAD.view.OpportunityManagement.Project_New.InstallSiteView');
		Ext.getCmp('installSiteComeSource').setValue('HelcPAD.controller.OpportunityManagement.Project_New.ProjectSearchPrepareCtrl');
		this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.InstallSiteCtrl').toInit('installSite');
	},
	
	
	emptyOrNull:function(value){
		
		if(value==""||value==undefined)
			return true;
		else 
			return false;
	}
});