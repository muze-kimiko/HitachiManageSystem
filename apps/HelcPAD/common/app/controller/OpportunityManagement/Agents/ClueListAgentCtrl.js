Ext.define('HelcPAD.controller.OpportunityManagement.Agents.ClueListAgentCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		//列表界面和查询界面公用此控制器
		control:{
			//列表返回
			'button#clueListAgentBack':{
				tap:'clueListAgentBack'
			},
			//前往查找界面
			'button#clueListAgentQuery':{
				tap:'clueListAgentQuery'
			},
			//查询界面返回
			'button#clueSearchAgentBack':{
				tap:'clueListAgentBack'
			},
			//列表点击
			'list#clueList':{
				itemtap:'clueList'
			},
			//查找线索
			'button#clueSearchAgentLookUp':{
				tap:'clueSearchAgentLookUp'
			}
		}
	},
	clueListAgentBack:function(){
		this.BackView();
	},
	clueListAgentQuery:function(){
		this.NextView('clueSearchAgent','HelcPAD.view.OpportunityManagement.Agents.ClueSearchAgent');
	},
	clueSearchAgentLookUp:function(btn,eOpts){
		var obj = this;
		var store = this.getStore('ClueDirectorStore','HelcPAD.store.OpportunityManagement.Agents.ClueDirectorStore');
		/*store.addData({
			clueNumber:68639,//线索编号
	        submitTime:'2015-09-23',//提交时间
	        projectName:'沃尔玛扶梯',//项目名称
	        clueStatus:'新建',//线索状态
	        projectAddress:'冷水滩区凤凰园沃尔玛广场',//项目地址
	        clueFollower:'陈妍希'//线索跟踪
		});*/
		
		var clueSearchStatus = Ext.getCmp('clueSearchStatus');
		var clueSearchNumber = Ext.getCmp('clueSearchNumber');
		var projectSearchName = Ext.getCmp('projectSearchName');
		
		if(clueSearchStatus){
			clueSearchStatus = Ext.getCmp('clueSearchStatus').getValue();
			clueSearchNumber = Ext.getCmp('clueSearchNumber').getValue();
			projectSearchName = Ext.getCmp('projectSearchName').getValue();
		}
		
		clueSearchStatus = clueSearchStatus==null?'':clueSearchStatus;
		clueSearchNumber = clueSearchNumber==null?'':clueSearchNumber;
		projectSearchName = projectSearchName==null?'':projectSearchName;
		
		var condition = "[HEL Lead.Project Name] like '*"+projectSearchName+"*' and [HEL Lead.Lead Status] like  '*"+clueSearchStatus+"*' and  [HEL Lead.Id] like '*"+clueSearchNumber+"*'";
		this.pageNum = isNaN(btn)?0:btn; 
		var param = {
				NewQuery:true,
				userID:userID,
				SearchSpec:condition,
				ViewMode:'Organization',
				SortSpec:'Created(DESCENDING)',
				StartRowNum:isNaN(btn)?0:btn,
				PageSize:'10',
				
		};
		console.log(param);
		console.log(btn);
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
 				prodName:'clueListQuery',
 				parameters: param
		};
		
		var getResult = function(result){
			console.log(result);
			if(!result.QueryLeadPage_Output){
				Ext.Msg.alert('温馨提示','服务器繁忙，请稍后重试！');
				return ;
			}else if(result.QueryLeadPage_Output.NumOutputObjects=='0'){
				Ext.Msg.alert('温馨提示','无查找结果，请重新输入查找条件！');
			}else if(result.QueryLeadPage_Output.NumOutputObjects=='1'){
				if(isNaN(btn))
					store.setData([result.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead]);
				else
					store.addData([result.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead]);
			}	
			else{
				if(isNaN(btn))
					store.setData(result.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead);
				else
					store.addData(result.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead);
			}
			if(btn.id)
				obj.BackView();
				
		};
		
		this.connectServer_queryOpportunity(getResult,params);
		
	},
	//列表单击
	clueList:function( list, index, target, record, e, eOpts){
		var obj = this;
		var clueId = record.data.Id;
		
		var param = {
				userID:userID,
				id:clueId
		};
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'clueDetail',
				parameters:param 
		};
		
		var getResult = function(result){
			console.log(result);
			if(!result.LeadQueryById_Output){
				Ext.Msg.alert('提示','服务器繁忙,请稍后重试！');
				return ;
			}
			var clue = result.LeadQueryById_Output.ListOfHelEaiAppLeadDetail.HelLead;
			var clueSecond = clue;
			
			if(clue.LeadMajorProjet=='Y')
				clue.LeadMajorProjet = 1;
			if(clue.LeadImportDemand=='Y')
				clue.LeadImportDemand = 1;
			clue.PredictSignYear = clue.PredictSignYear;
			clue.PredictSignMonth = clue.PredictSignMonth;
			if(clue.ListOfHELLead_AgentPosition){
				if(clue.ListOfHELLead_AgentPosition.HELLead_AgentPosition){
					var position = clue.ListOfHELLead_AgentPosition.HELLead_AgentPosition;
					if(position.length){
						for(var i=0;i<position.length;i++){
							if(position[i].IsPrimaryMVG=='Y')
								clue.ListOfHELLead_AgentPosition=position[i].AgentSalesRep;
						}
					}else
						clue.ListOfHELLead_AgentPosition=position.AgentSalesRep;
				}
			}
			
			obj.NextView('clueCreateAgent','HelcPAD.view.OpportunityManagement.Agents.ClueCreateAgent');
			Ext.getCmp('clueCreateAgentToolbar').setTitle('报备详情');
			Ext.getCmp('clueSelf').setData(clueSecond);
			var formSet =  Ext.getCmp('clueCreateAgent').query('selectfield[name]').concat(Ext.getCmp('clueCreateAgent').query('textfield[name]'));
					
			for(var i=0;i<formSet.length;i++){
				if(formSet[i].getPlaceHolder()!='')
					formSet[i].setPlaceHolder('');
			}
			obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Agents.ClueCreateAgentCtrl').toInit(clue.AgentName,clue);
			obj.fillFormValue('clueCreateAgent','HelcPAD.model.OpportunityManagement.Agents.ClueDetailModel',clue);
			Ext.getCmp('clueCity').setValue(clue.City);
			Ext.getCmp('clueDistrict').setValue(clue.County);
			if(clue.LeadStatus=='新建')
				Ext.getCmp('clueOperation').setOptions([{text:'提交报备',value:'提交报备'}]);
			else if(clue.LeadStatus =='审批中')
				Ext.getCmp('clueOperation').setOptions([{text:'取消报备',value:'取消报备'}]);
			else
				Ext.getCmp('clueOperation').setOptions([{text:'保存报备',value:'保存报备'}]);
		};
		this.connectServer_queryOpportunity(getResult,params);
		
	}
});