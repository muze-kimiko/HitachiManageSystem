Ext.define('HelcAgent.controller.OpportunityManagement.Project_New.BusinessAgentCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	config:{
		control:{
			 //代理商list  返回 
			 'button#businessagentlist_new_id_FH':{
			 	tap:'businessagentlist_new_id_FH',
			 },
			 
			 //代理商业绩list 点击list列表
			 'list#businessagentlist_new_id_list':{
			 	 itemtap:'businessagentlist_new_id_list'
			 },
			 
			 //代理商list  增加
			 'button#businessagentlist_new_id_ZJ':{
				 tap:'businessagentlist_new_id_ZJ'
			 },
			 //提交代理商业绩
			 'button#submitAgentAchieve':{
				 tap:'submitAgentAchieve'
			 },
			 //代理商list  删除
			 'button#businessagentlist_new_id_SC':{
				 tap:'businessagentlist_new_id_SC'
			 },
			 
			 //代理商资料   返回
			 'button#businessagent_new_id_FH':{
				tap:'businessagent_new_id_FH' 
			 },
			 
			 //代理商资料   保存
			 'button#businessagent_new_id_BC':{
				tap:'businessagent_new_id_BC' 
			 },
		},
	},
	
	//代理商资料   保存
	businessagent_new_id_BC:function(){
		var obj = this;
		Ext.Msg.show({
			title:'温馨提示',
			message:'保存代理商业绩？',
			buttons: [{text:'取消',itemId:'no'},{text:'确定',itemId:'yes'}],
			fn:function(buttonId){
				if(buttonId=='yes'){
					var opportunity = Ext.getCmp('businessAgentOppty').getData();
					var businessAgentName = Ext.getCmp('businessAgentName').getValue();
					var agentAchieveId = Ext.getCmp('agentAchieveId').getValue();
					var achievePrecent = Ext.getCmp('achievePrecent').getValue();
					var comments = Ext.getCmp('comments').getValue();
					var primaryField = Ext.getCmp('agentAchievePrimaryField');
					
					
					if(!businessAgentName){
						Ext.Msg.alert('提示','请填写必要的信息后保存！');
						return ;
					}
					if(!comments)
						comments = '';
					if(!primaryField)
						primaryField = '';
					else
						primaryField ='Y';
					
					var helId = '';
					for(var i=0;i<obj.allAgents.length;i++){
						if(obj.allAgents[i].Name==businessAgentName)
							helId = obj.allAgents[i].RowId;
					}
					
					var agentAchieve = {
							agentAchieveId:agentAchieveId,
							helId:helId,
							agent:businessAgentName,
							comments:comments,
							primaryField:primaryField,
							performanceShared:achievePrecent
					};
					var otherMinor = true;
					if(primaryField)
						otherMinor = false;
						
					var array = [];
					array.push(agentAchieve);
					//放置store数据提取
					var store = obj.getStore('BusinessAgentStore','HelcAgent.store.OpportunityManagement.Project_New.BusinessAgentStore');
					var data = store.getData().all;
					
					for(var i=0;i<data.length;i++){
						var agentAchieveItem = {
								helId:data[i].raw.HELId,
								agent:data[i].raw.Agent,
								comments:data[i].raw.Comments,
								performanceShared:data[i].raw.PerformanceShared
						};
						//precent+=parseFloat(data[i].raw.PerformanceShared+'');
						
						if(otherMinor)
							agentAchieveItem.primaryField = data[i].raw.PrimaryField;
						array.push(agentAchieveItem);
					}
					
					var param = {
							userID:userID,
							Id:opportunity.RowId,
							array:array,
							ViewMode:'Organization'
					};
					
					var params = {
			 				adpName:'HttpAdapter_PAD_Custom',
			 				prodName:'agentAchieveSynchronize',
			 				parameters: param
			 		};
				
					var getResult = function(result){
						if(!result.OpptyAgentSynchronize_Output){
							Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
							return;
						}else if(result.OpptyAgentSynchronize_Output.PrimaryRowId){
							Ext.Msg.show({
								title:'提示',
								message:'代理商业绩已保存成功！',
								buttons:[{text:'确定',itemId:'yes'}],
								fn:function(buttonId){
									if(buttonId=='yes'){
										obj.BackView();
										obj.BackView();
										obj.getApplication().getController('HelcAgent.controller.OpportunityManagement.Project_New.ProjectInfoCtrl').projectinfo_new_id_QTXX_DLS();
									}
								}
							});
							
						}
					};
					
					obj.connectServer_queryOpportunity(getResult,params);
				}
			}
		});
		
		
		
	},
	
	//代理商资料   返回
	businessagent_new_id_FH:function(){
		if(!this.record)
			this.BackView();
		else{
			this.getStore('BusinessAgentStore','HelcAgent.store.OpportunityManagement.Project_New.BusinessAgentStore').addData(this.record);
			this.BackView();
		}
		
	},
	
	//代理商list  删除
	businessagentlist_new_id_SC:function(){
		var obj = this;
		var agentAchieveList = Ext.getCmp('businessagentlist_new_id_list');
		var selectItem = agentAchieveList.getSelection();
		if(!selectItem.length){
			Ext.Msg.alert('提示','请选择一条代理商业绩');
			return ;
		}
		
		Ext.Msg.show({
			title:'温馨提示',
			message:'是否删除该项代理商业绩？',
			buttons:[{text:'取消',itemId:'no'},{text:'确定',itemId:'yes'}],
			fn:function(buttonId){
				if(buttonId=='yes'){
					var opportunity = Ext.getCmp('businessAgentOpportunity').getData();
					var store = obj.getStore('BusinessAgentStore','HelcAgent.store.OpportunityManagement.Project_New.BusinessAgentStore');
					store.remove(selectItem[0]);
					var data = store.getData().all;
					var array = [];
					for(var i=0;i<data.length;i++){
						var agentAchieveItem = {
								helId:data[i].raw.HELId,
								agent:data[i].raw.Agent,
								comments:data[i].raw.Comments,
								primaryField:data[i].raw.PrimaryField,
								performanceShared:data[i].raw.PerformanceShared
						};
						
						array.push(agentAchieveItem);
					}
					var param = {
							userID:userID,
							Id:opportunity.RowId,
							array:array,
							ViewMode:'Organization'
					};
					
					var params = {
			 				adpName:'HttpAdapter_PAD_Custom',
			 				prodName:'agentAchieveSynchronize',
			 				parameters: param
			 		};
				
					var getResult = function(result){
						if(!result.OpptyAgentSynchronize_Output){
							Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
							return;
						}else if(result.OpptyAgentSynchronize_Output.PrimaryRowId){
							Ext.Msg.show({
								title:'提示',
								message:'代理商业绩已删除成功！',
								buttons:[{text:'确定',itemId:'yes'}],
								fn:function(buttonId){
									if(buttonId=='yes'){
									}
								}
							});
							
						}
					};
					
					obj.connectServer_queryOpportunity(getResult,params);
				}
			}
		});
		
	},
	
	//代理商list  增加
	businessagentlist_new_id_ZJ:function(){
		var opportunity = Ext.getCmp('businessAgentOpportunity').getData(); 
		this.NextView('businessagent_new_id','HelcAgent.view.OpportunityManagement.Project_New.BusinessAgent');
		Ext.getCmp('businessAgentOppty').setData(opportunity);
		this.toInit();
	},
	//提交代理商业绩
	submitAgentAchieve:function(){
		var obj = this;
		var opptyId = Ext.getCmp('businessAgentOpportunity').getData().RowId;
		var agentStore = this.getStore('BusinessAgentStore','HelcAgent.store.OpportunityManagement.Project_New.BusinessAgentStore');
		var agentAchieve = agentStore.getData();
		var allAgentAchieve = agentAchieve.all;
		var achieve = null;
		var prompt = true;
		var totalShare = 0;
		for(var i=0;i<allAgentAchieve.length;i++){
			if(allAgentAchieve[i].data.LeadStatus=='报备成功'&&parseInt(allAgentAchieve[i].data.PerformanceShared)==0){
				achieve = allAgentAchieve[i].data;
				prompt = false;
			}
			totalShare+=parseFloat(allAgentAchieve[i].data.PerformanceShared);
		}
		console.log(agentAchieve);
		
		
		
		if(totalShare!=1){
			Ext.Msg.alert('提示','该商机的代理商业绩比例总和不为1，请核对后提交！');
			return;
		}
		var param = {
				userID:userID,
				opptyId:opptyId
		};
		
		var params = {
 				adpName:'HttpAdapter_PAD_Custom',
 				prodName:'submitAgentAchieve',
 				parameters: param
 		};
		
		var getResult = function(result){
			console.log(result);
			if(result.SubmitAgentPer_Output){
				if(result.SubmitAgentPer_Output.ErrorMsg){
					Ext.Msg.alert('温馨提示',result.SubmitAgentPer_Output.ErrorMsg);
				}else{
					Ext.Msg.show({
						title:'温馨提示',
						message:'提交代理商业绩完成！',
						buttons:[{text:'确定',itemId:'yes'}],
						fn:function(buttonId){
							if(buttonId=='yes'){
								obj.BacKView();
							}
						}
					});
				}
			}
			
		};
		var message = '提交代理商业绩？';
		if(prompt)
			message = achieve.Agent+'业绩分成为0,继续提交？';
		
		Ext.Msg.show({
			title:'温馨提示',
			message:message,
			buttons:[{text:'取消',itemId:'no'},{text:'确定',itemId:'yes'}],
			fn:function(buttonId){
				if(buttonId=='yes'){
					obj.connectServer_queryOpportunity(getResult,params);
					
				}
			}
		});
		
	},
	//代理商业绩list 点击list列表
	businessagentlist_new_id_list:function(dataview, index, target, record, e, eOpts){
		if(event.target.id!='conkung_businessagentlist'){
			var businessAgentOpportunity = Ext.getCmp('businessAgentOpportunity').getData();
			var store = obj.getStore('BusinessAgentStore','HelcAgent.store.OpportunityManagement.Project_New.BusinessAgentStore');
			store.remove(record);
			this.record = record;
			this.NextView('businessagent_new_id','HelcAgent.view.OpportunityManagement.Project_New.BusinessAgent');
			this.toInit();
			Ext.getCmp('businessAgentOppty').setData(businessAgentOpportunity);
			Ext.getCmp('businessagent_new_id').setRecord(record);
			
			var agentAchievePrimaryField = Ext.getCmp('agentAchievePrimaryField');
			if(record.PrimaryField=='Y')
				agentAchievePrimaryField.setValue(1);
			else
				agentAchievePrimaryField.setValue(0);
			Ext.getCmp('comments').setPlaceHolder('');
			
			
		}else{
			var sele=document.getElementsByName('groupkung_businessagentlist');
			var checkbox = sele[index];
			 if(checkbox.style.color==''){
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(204, 204, 204)'){
	    		  //是未选中的情况下
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(224, 58, 62)'){
	    		//是选中的情况下
	    		  checkbox.style.color='#ccc';
	    	  }
			 if(checkbox.style.color='#e03a3e'){
				 for(var i=0;i<sele.length;i++){
	    			  if(i!=index){
	    				  sele[i].style.color = '#ccc';
	    			  }
	    		  }
			 }
		};
	},
	
	//代理商list  返回 
	businessagentlist_new_id_FH:function(){
		this.BackView();
	},
	toInit:function(){
		
		var obj = this;
		var allAgentName = [];
		var allAgentNameStatement = "([Account.Name] like '**') AND [Account.Account Status]='有效' AND  [Account.Type]  ='属下网点' and (([Account.Internal Org Flag] &lt;&gt; 'Y' or [Account.Partner Flag] &lt;&gt; 'N') AND [Account.Account Flag] &lt;&gt; 'N')";
		
		var param = {
				SearchSpec:allAgentNameStatement,
				ViewMode:'Organization',
				userID:userID
		};
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'queryAgentName',
				parameters:param 
		};
		
		var getResult = function(result){
			console.log(result);
			if(!result.QueryOpptyAcc_Output){
				Ext.Msg.alert('提示','服务器反繁忙，请稍后重试！');
				return ;
			}else if(result.QueryOpptyAcc_Output.NumOutputObjects=='1'){
				allAgentName.push(result.QueryOpptyAcc_Output.ListOfHelEaiAppAccountDetail.Account);
			}else if(result.QueryOpptyAcc_Output.NumOutputObjects=='0'){
				Ext.Msg.alert('提示','服务器端繁忙，请与管理员联系！');
				return ;
			}else{
				allAgentName = result.QueryOpptyAcc_Output.ListOfHelEaiAppAccountDetail.Account;
			}
			obj.allAgents = allAgentName;
			var options  = [];
			var total = 1;
			options[0] = {text:'请选择',value:''};
			for(var i=0;i<allAgentName.length;i++){
				var option = {text:allAgentName[i].Name,value:allAgentName[i].Name};
				options[total++] = option;
			}
			var select = Ext.getCmp('businessAgentName');
			select.setOptions(options);
			console.log(this.record);
			if(this.record)
				select.setValue(this.record.Agent);
		};
		
		this.connectServer_queryOpportunity(getResult,params);
	}
	
});