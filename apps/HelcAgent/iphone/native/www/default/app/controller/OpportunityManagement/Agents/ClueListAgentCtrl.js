
/* JavaScript content from app/controller/OpportunityManagement/Agents/ClueListAgentCtrl.js in folder common */
Ext.define('HelcAgent.controller.OpportunityManagement.Agents.ClueListAgentCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
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
	
	//刷新数据按钮
	clueSXSJ:function(){
		var obj=this;
		//判断是否新的条件
		var clueSearchStatus = document.getElementById('clueSearchStatus');//Ext.getCmp('clueSearchStatus');
		var clueSearchNumber = null;
		var projectSearchName = null;
		if(clueSearchStatus){
			clueSearchStatus = document.getElementById('clueSearchStatus').value.trim();
			clueSearchNumber = document.getElementById('clueSearchNumber').value.trim();
			projectSearchName = document.getElementById('projectSearchName').value.trim();
		};
		
		projectSearchName = projectSearchName?"[HEL Lead.Project Name] like '*"+projectSearchName+"*' ":'';
		clueSearchStatus = clueSearchStatus?"[HEL Lead.Lead Status] like  '*"+clueSearchStatus+"*' ":'';
		clueSearchNumber = clueSearchNumber?"[HEL Lead.Id] like '*"+clueSearchNumber+"*'":'';
		
		var condition=''; 
		var and=" AND ";
		if(projectSearchName){
			if(condition){
				condition+=and+projectSearchName;
			}else{
				condition+=projectSearchName;
			};
		};
		if(clueSearchStatus){
			if(condition){
				condition+=and+clueSearchStatus;
			}else{
				condition+=clueSearchStatus;
			};
		};
		if(clueSearchNumber){
			if(condition){
				condition+=and+clueSearchNumber;
			}else{
				condition+=clueSearchNumber;
			};
		};
		
		cc.log('查询条件：'+condition);
		var oldcondition=this.getApplication().getController('HelcAgent.controller.login.PADMainCtrl').cxtj;
		if(condition==oldcondition){
			//记录查询条件，用于刷新数据验证
			var cxtj=this.getApplication().getController('HelcAgent.controller.login.PADMainCtrl').cxtj;
			//清空查询数量
			obj.getApplication().getController('HelcAgent.controller.login.PADMainCtrl').cxsl=obj.getApplication().getController('HelcAgent.controller.login.PADMainCtrl').cxsl+10;
			
			var store = this.getStore('ClueDirectorStore','HelcAgent.store.OpportunityManagement.Director.ClueDirectorStore');
			var param = {
					NewQuery:true,
					userID:userID,
					SearchSpec:cxtj,
					ViewMode:'Organization',
					SortSpec:'Created(DESCENDING)',
					StartRowNum:obj.getApplication().getController('HelcAgent.controller.login.PADMainCtrl').cxsl,
					PageSize:'10',
					
			};
			console.log(param);
			var params = {
					adpName:'HttpAdapter_PAD_Custom',
	 				prodName:'clueListQuery',
	 				parameters: param
			};
			
			var getResult = function(result){
				console.log(result);
				if(!result.QueryLeadPage_Output){
					Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
					return ;
				}else if(result.QueryLeadPage_Output.LastPage=='true'&&result.QueryLeadPage_Output.NumOutputObjects=='0'){
					if(result.QueryLeadPage_Output.NumOutputObjects=='0'){
						Ext.Msg.alert('提示','没有更多数据了！');
						obj.getApplication().getController('HelcAgent.controller.login.PADMainCtrl').cxsl=0;						
					};
					return ;
				}else if(result.QueryLeadPage_Output.NumOutputObjects=='1'){
					store.setData([result.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead]);
				}else{
					store.setData(result.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead);
				};
			};
			
			obj.connectServer_queryOpportunity(getResult,params);
		}else{
			Ext.Msg.alert('温馨提示','请先查询！');
		};
		
		return;
	},
	
	clueListAgentBack:function(){
		this.BackView();
	},
	
	clueListAgentQuery:function(){
		this.NextView('clueSearchAgent','HelcAgent.view.OpportunityManagement.Agents.ClueSearchAgent');
	},
	
	clueSearchAgentLookUp:function(btn,eOpts){
		var obj = this;
		var store = this.getStore('ClueDirectorStore','HelcAgent.store.OpportunityManagement.Agents.ClueDirectorStore');
		/*store.addData({
			clueNumber:68639,//线索编号
	        submitTime:'2015-09-23',//提交时间
	        projectName:'沃尔玛扶梯',//项目名称
	        clueStatus:'新建',//线索状态
	        projectAddress:'冷水滩区凤凰园沃尔玛广场',//项目地址
	        clueFollower:'陈妍希'//线索跟踪
		});*/
		
		var clueSearchStatus = document.getElementById('clueSearchStatus');//Ext.getCmp('clueSearchStatus');
		var clueSearchNumber = null;
		var projectSearchName = null;
		if(clueSearchStatus){
			clueSearchStatus = document.getElementById('clueSearchStatus').value.trim();
			clueSearchNumber = document.getElementById('clueSearchNumber').value.trim();
			projectSearchName = document.getElementById('projectSearchName').value.trim();
		}
		
		projectSearchName = projectSearchName?"[HEL Lead.Project Name] like '*"+projectSearchName+"*' ":'';
		clueSearchStatus = clueSearchStatus?"[HEL Lead.Lead Status] like  '*"+clueSearchStatus+"*' ":'';
		clueSearchNumber = clueSearchNumber?"[HEL Lead.Id] like '*"+clueSearchNumber+"*'":'';
		
		
		var condition=''; //= (projectSearchName? " ":''+projectSearchName)+(clueSearchStatus? " AND ":''+clueSearchStatus)+(clueSearchNumber? " AND ":''+clueSearchNumber);
		var and=" AND ";
		if(projectSearchName){
			if(condition){
				condition+=and+projectSearchName;
			}else{
				condition+=projectSearchName;
			};
		};
		if(clueSearchStatus){
			if(condition){
				condition+=and+clueSearchStatus;
			}else{
				condition+=clueSearchStatus;
			};
		};
		if(clueSearchNumber){
			if(condition){
				condition+=and+clueSearchNumber;
			}else{
				condition+=clueSearchNumber;
			};
		};
		
		cc.log('查询条件：'+condition);
		//记录查询条件，用于刷新数据验证
		this.getApplication().getController('HelcAgent.controller.login.PADMainCtrl').cxtj=condition;
		//清空查询数量
		this.getApplication().getController('HelcAgent.controller.login.PADMainCtrl').cxsl=10;
		
		this.pageNum = isNaN(parseInt(btn))?0:btn; 
		var param = {
				NewQuery:true,
				userID:userID,
				SearchSpec:condition,
				ViewMode:'Organization',
				SortSpec:'Created(DESCENDING)',
				StartRowNum:isNaN(parseInt(btn))?0:btn,
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
				/*if(eOpts){
					if(eOpts.sizeY&&eOpts.differenY)
						eOpts.sizeY=eOpts.differenY;
				}*/
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}else if(result.QueryLeadPage_Output.LastPage=='true'&&result.QueryLeadPage_Output.NumOutputObjects=='0'){
				/*if(eOpts){
					if(eOpts.sizeY&&eOpts.differenY)
						eOpts.sizeY=eOpts.differenY;
				}*/
				if(result.QueryLeadPage_Output.NumOutputObjects=='0'&&!clueSearchStatus)
					Ext.Msg.alert('提示','没有更多数据了！');
				else if(result.QueryLeadPage_Output.NumOutputObjects=='0'&&clueSearchStatus)
					Ext.Msg.alert('提示','无查找结果，请重新输入查找条件');
				return ;
			}else if(result.QueryLeadPage_Output.NumOutputObjects=='1'){
				if(isNaN(parseInt(btn)))
					store.setData([result.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead]);
				else{
					store.addData([result.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead]);
					obj.pageNum +=10;
				}	
			}	
			else{
				if(isNaN(parseInt(btn)))
					store.setData(result.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead);
				else{
					store.addData(result.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead);
					obj.pageNum +=10;
				}	
			}
			/*if(btn.id)
				obj.BackView();*/
				
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
			if(result.Fault){
				Ext.Msg.alert('提示',result.Fault.faultstring);
				return ;
			}
			if(result.LeadQueryById_Output.ErrorMsg){
				Ext.Msg.alert('提示',result.LeadQueryById_Output.ErrorMsg);
				return ;
			}
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
			
			obj.NextView('clueCreateAgent','HelcAgent.view.OpportunityManagement.Agents.ClueCreateAgent');
			
			//线索状态
			cc.log('-----------------231---------------------'+clue.LeadStatus);
			var zz=[{text:clue.LeadStatus,value:clue.LeadStatus}];
			Ext.getCmp('clueStatus').setOptions(zz);
			
			
			//“关联商机”
			Ext.getCmp('correlationOppty').setHidden(true);
			Ext.getCmp('toCorrelationOppty').setHidden(true);
			//“商机状态”
			Ext.getCmp('correlationOpptyStatus').setHidden(true);
			//“经销商状态”
			Ext.getCmp('supplierStatus').setHidden(true);
			//定位
			Ext.getCmp('Cluefd').setHidden(true);
			
			//修改页面
			Ext.getCmp('clueCustomer').setWidth('100%');
			Ext.getCmp('clueCustomer_CX').setHidden(true);
			
			Ext.getCmp('clueCreateAgentToolbar').setTitle('线索详情');
			cc.log('点击list传递过去的值');
			cc.log(clueSecond);
			Ext.getCmp('clueSelf').setData(clueSecond);
			var formSet =  Ext.getCmp('clueCreateAgent').query('selectfield[name]').concat(Ext.getCmp('clueCreateAgent').query('textfield[name]'));
			for(var i=0;i<formSet.length;i++){
				if(formSet[i].getPlaceHolder()!='')
					formSet[i].setPlaceHolder('');
			};
			
			obj.getApplication().getController('HelcAgent.controller.OpportunityManagement.Agents.ClueCreateAgentCtrl').toInit(clue.AgentName,clue);
			obj.fillFormValue('clueCreateAgent','HelcAgent.model.OpportunityManagement.Agents.ClueDetailModel',clue);
			Ext.getCmp('clueCity').setValue(clue.City);
			Ext.getCmp('clueDistrict').setValue(clue.County);
			var clueCrateAgentToolbar = Ext.getCmp('clueCrateAgentDefineToolbar');
			var toolbarContent = "";
			var activeView  = Ext.getCmp('clueCreateAgent');
			var allField = activeView.query('field');
			for(var i=0;i<allField.length;i++){
				try{
					if(allField[i].getRequired()==true)
						allField[i].setRequired(false);
					else
						continue;
				}catch(e){
					console.log(e);
				}
			}
			if(clue.LeadStatus=='新建'){
				Ext.getCmp('clueOperation').setOptions([{text:'提交线索',value:'提交报备'}]);
				toolbarContent = '<div style="width:100%">'+
			         	  '<div class="anOneDiv">'+
			    			'<div class="ysZhOne anOne" style="width:29%;" onclick="object.getController(\'OpportunityManagement.Agents.ClueCreateAgentCtrl\').clueCreateBack();">返回主界面</div>'+
			    			'<div class="ysZhTwo anOne" style="width:29%;" onclick="object.getController(\'OpportunityManagement.Agents.ClueCreateAgentCtrl\').execOperation();">提交线索</div>'+
			    			'<div class="ysZhThree anOne" style="width:29%;" onclick="object.getController(\'OpportunityManagement.Agents.ClueCreateAgentCtrl\').deleteClue();">删除线索</div>'+
			    			'</div>'+
		    	      '</div>';
			}else if(clue.LeadStatus =='审批中'){
				//只改名字，不改传递过去的值
				Ext.getCmp('clueOperation').setOptions([{text:'收回线索',value:'取消报备'}]);
				toolbarContent = '<div style="width:100%">'+
						'<div class="anOneDiv">'+
							'<div class="ysZhOne anOne" style="width:46%;" onclick="object.getController(\'OpportunityManagement.Agents.ClueCreateAgentCtrl\').clueCreateBack();">返回主界面</div>'+
							'<div class="ysZhTwo anOne" style="width:46%;" onclick="object.getController(\'OpportunityManagement.Agents.ClueCreateAgentCtrl\').execOperation();" >收回线索</div>'+
						'</div>'+	
					'</div>';
			}else{
				//Ext.getCmp('clueOperation').setOptions([{text:'保存线索',value:'保存报备'}]);
				toolbarContent = '<div style="width:100%;">'+
						'<div class="anOneDiv">'+
							'<div class="ysZhOne anOne" style="width:96%;" onclick="object.getController(\'OpportunityManagement.Agents.ClueCreateAgentCtrl\').clueCreateBack();">返回主界面</div>'+
							/*'<div class="ysZhTwo anOne" style="width:46%;" onclick="object.getController(\'OpportunityManagement.Agents.ClueCreateAgentCtrl\').execOperation();">保存线索</div>'+*/
						'</div>'+
					'</div>';
			}
			clueCrateAgentToolbar.setHtml(toolbarContent);
		};
		this.connectServer_queryOpportunity(getResult,params);
		
	}
});