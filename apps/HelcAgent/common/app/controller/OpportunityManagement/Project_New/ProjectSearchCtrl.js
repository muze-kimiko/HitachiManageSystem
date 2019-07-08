Ext.define('HelcAgent.controller.OpportunityManagement.Project_New.ProjectSearchCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	config : {
		control:{
			'button#projectSearchBack':{
				tap:'projectSearchBack'
			},
			'button#projectsearch_new_id_CX':{
				tap:'projectsearch_new_id_CX'
			}
		}
	},
	//返回
	projectSearchBack:function(){
		this.BackView();
	},
	
	projectsearch_new_id_CX:function(){
		
		var condition = Ext.getCmp('condition').getValue().trim();
		
		if(this.isEmptyOrNull(condition)){
			Ext.Msg.alert('提示','请输入必要的查询条件');
			return ;
		}
		var statement = "";
		
		
		
		statement = "([Opportunity.Name] like '*"+condition+"*'  or [Opportunity.Account] like '*"+condition+"*'  or  [Opportunity.Oppty Final User] like '*"+condition+"*' )   and  [Opportunity.Oppty Type] = '设备商机'  and  EXISTS([Opportunity.Sales Login Name] = '"+userID+"' )";
		var param = {
			SearchSpec:statement,
			userID:userID,
			ViewMode:'Organization'
		};
		console.log(statement);
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'queryOpportunityList',
				parameters: param
		};
		
		var getResult =function(result){
			if(!result.QueryOppty_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}
			
			var r = result.QueryOppty_Output.ListOfHelEaiAppOpportunity.Opportunity;
			if(result.QueryOppty_Output.NumOutputObjects=='0'){
				Ext.Msg.alert('提示','无结果，请重新输入搜索条件');
				return ;
			}
				
			obj.NextView('projectListContainer','HelcAgentHelcAgent.view.OpportunityManagement.Project_New.ProjectList');
			var opportunityStore=Ext.data.StoreManager.get('OpptyStore');
			if(!opportunityStore){
				opportunityStore=Ext.create('HelcAgent.store.OpportunityManagement.EntryOpportunities.OpptyStore');
			};
			
			opportunityStore.setData(r);
			
		};
		
		this.connectServer_queryOpportunity(getResult,params);
		
		
	},

	isEmptyOrNull:function(value){
		if(value==''||value==undefined||value==null)
			return true;
		else
			return false;
	}
	
	
});