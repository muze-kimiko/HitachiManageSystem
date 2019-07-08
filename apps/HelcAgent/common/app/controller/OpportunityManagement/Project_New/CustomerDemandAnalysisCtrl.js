Ext.define('HelcAgent.controller.OpportunityManagement.Project_New.CustomerDemandAnalysisCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	config:{
		control:{
			 //商机客户需求分析list  返回 
			 'button#customerdemandanalysislist_new_id_FH':{
			 	tap:'customerdemandanalysislist_new_id_FH',
			 },
			 
			 //商机客户需求分析list 点击list列表
			 'list#customerdemandanalysislist_new_id_list':{
			 	 itemtap:'customerdemandanalysislist_new_id_list'
			 },
			 
			 //商机客户需求分析list  增加
			 'button#customerdemandanalysislist_new_id_ZJ':{
				 tap:'customerdemandanalysislist_new_id_ZJ'
			 },
			 
			 //商机客户需求分析list  删除
			 'button#customerdemandanalysislist_new_id_SC':{
				 tap:'customerdemandanalysislist_new_id_SC'
			 },
			 
			 //商机客户需求分析资料   返回
			 'button#customerdemandanalysis_new_id_FH':{
				tap:'customerdemandanalysis_new_id_FH' 
			 },
			 
			 //商机客户需求分析资料   保存
			 'button#customerdemandanalysis_new_id_BC':{
				tap:'customerdemandanalysis_new_id_BC' 
			 },
			 //客户需求类型变化与客户需求的级联变化
			 'selectfield#customerDemandType':{
				 change:'customerDemandTypeChange'
			 }
		},
	},
	
	//代理商资料   保存
	customerdemandanalysis_new_id_BC:function(){
		var obj = this;
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否保存商机客户需求？',
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				 if(buttonId == 'yes'){
		    	 var opportunity = Ext.getCmp('customerDemandOpportunity').getData();
		 		
		 		var customerDemandId = Ext.getCmp('customerDemandId').getValue();
		 		var customerDemandType = Ext.getCmp('customerDemandType').getValue().trim();
		 		var customerDemandItem = Ext.getCmp('customerDemandItem').getValue().trim();
		 		
		 		if(!customerDemandType){
		 			Ext.Msg.alert('提示','请选择客户需求类型');
		 			return ;
		 		}
		 		
		 		if(!customerDemandItem){
		 			Ext.Msg.alert('提示','请选择客户具体需求');
		 			return;
		 		}
		 		var store = Ext.data.StoreManager.get('CustomerDemandStore');
		 		if(!store)
		 			store = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.CustomerDemandStore');
		 		
		 		var data = store.getData().all;
		 		console.log(data);
		 		var customerDemand = [];
		 		
		 		for(var i=0;i<data.length;i++){
		 			
		 			customerDemand[i] = {
		 					demandId:data[i].data.Id,
		 					demandType:data[i].data.DemandType,
		 					demandItem:data[i].data.DemandItem,
		 			};
		 		}
		 		
		 		customerDemand[data.length] = {
		 				demandType:customerDemandType,
		 				demandItem:customerDemandItem,
		 		};
		 		
		 		if(customerDemandId)
		 			customerDemand[data.length].demandId = customerDemandId;
		 		
		 		var param = {
		 				opptyId:opportunity.RowId,
		 				opptyType:opportunity.OpptyType,
		 				userID:userID,
		 				store:customerDemand
		 		};
		 		
		 		var params = {
		 				adpName:'HttpAdapter_PAD_Custom',
		 				prodName:'buildCustomerDemand',
		 				parameters:param
		 		};
		 		
		 		console.log(param);
		 		
		 		var getResult = function(result){
		 			if(!result.OpptyDemAnalySynchronize_Output){
		 				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
		 				return ;
		 			}
		 			if(result.OpptyDemAnalySynchronize_Output.ListOfHelEaiAppOpportunityDemandAnalysis.Opportunity.Id){
		 				Ext.Msg.alert('提示','保存客户需求成功！');
		 				obj.BackView();
		 				obj.BackView();
		 				obj.getApplication().getController('HelcAgent.controller.OpportunityManagement.Project_New.ProjectInfoCtrl').projectinfo_new_id_QTXX_KHXQFX();
		 				return ;
		 			}else
		 				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
		 				
		 		};
		 		
		 		obj.connectServer_queryOpportunity(getResult,params);
		     }
		   }
		});
	
	},
	
	//代理商资料   返回
	customerdemandanalysis_new_id_FH:function(){
		this.BackView();
		//this.showBackView('customerdemandanalysislist_new_id','HelcAgent.view.OpportunityManagement.Project_New.CustomerDemandAnalysisList');
	},
	
	//商机客户需求分析list  删除
	customerdemandanalysislist_new_id_SC:function(){
		var obj = this;
		var customerDemandan = Ext.getCmp('customerdemandanalysislist_new_id_list').getSelection();
		if(customerDemandan.length==0){
			Ext.Msg.alert('提示','请选择一条客户需求分析项');
			return;
		}
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否执行当前操作？',
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
		    	 var opportunity = Ext.getCmp('customerDemandOppty').getData();
		    	 
		    	 var store = Ext.data.StoreManager.get('CustomerDemandStore');
		 		if(!store)
		 			store = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.CustomerDemandStore');
		 		var customerDemandan = Ext.getCmp('customerdemandanalysislist_new_id_list').getSelection();
		 		store.remove(customerDemandan[0]);
		 		
		 		var data = store.getData().all;
		 		var customerDemand = [];
		 		console.log(data);
		 		for(var i=0;i<data.length;i++){
		 			customerDemand[i] = {
		 					demandId:data[i].data.Id,
		 					demandType:data[i].data.DemandType,
		 					demandItem:data[i].data.DemandItem,
		 			};
		 		}		 		
		 		
		 		var param = {
		 				opptyId:opportunity.RowId,
		 				opptyType:opportunity.OpptyType,
		 				userID:userID,
		 				store:customerDemand
		 		};
		 		
		 		var params = {
		 				adpName:'HttpAdapter_PAD_Custom',
		 				prodName:'buildCustomerDemand',
		 				parameters:param
		 		};
		 		
		 		var getResult = function(result){
		 			console.log(result);
		 			if(!result.OpptyDemAnalySynchronize_Output){
		 				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
		 				return ;
		 			}
		 			if(result.OpptyDemAnalySynchronize_Output.ListOfHelEaiAppOpportunityDemandAnalysis.Opportunity.Id){
		 				return ;
		 			}
		 		};
		 		
		 		obj.connectServer_queryOpportunity(getResult,params);
				   }
			   }
			});
		
	},
	
	//商机客户需求分析list  增加
	customerdemandanalysislist_new_id_ZJ:function(){
		var customerDemandOppty = Ext.getCmp('customerDemandOppty').getData();
		this.NextView('customerdemandanalysis_new_id','HelcAgent.view.OpportunityManagement.Project_New.CustomerDemandAnalysis');
		Ext.getCmp('customerDemandOpportunity').setData(customerDemandOppty);
		this.toInit();
	},
	
	//商机客户需求分析list 点击list列表
	customerdemandanalysislist_new_id_list:function(dataview, index, target, record, e, eOpts){
		if(event.target.id!='conkung_customerdemandanalysislist'){
			var opportunity = Ext.getCmp('customerDemandOpportunity').getData(); 
			this.NextView('customerdemandanalysis_new_id','HelcAgent.view.OpportunityManagement.Project_New.CustomerDemandAnalysis');
			var customerDemand = record.raw;
			
			Ext.getCmp('customerDemandType').setOptions([{text:customerDemand.DemandType,value:customerDemand.DemandType}]);
			Ext.getCmp('customerDemandItem').setValue([{text:customerDemand.DemandItem,value:customerDemand.DemandItem}]);
			Ext.getCmp('customerDemandId').setValue([{text:customerDemand.Id,value:customerDemand.Id}]);
			Ext.getCmp('customerDemandOpportunity').setData(opportunity);
			
			
		}else{
			var sele=document.getElementsByName('groupkung_customerdemandanalysislist');
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
	//客户需求类型与客户需求级联变化
	customerDemandTypeChange:function(selectField, newValue, oldValue, eOpts){
		var customerDemandItem = Ext.getCmp('customerDemandItem');
		var customerDemandAnalysis = this.extractionData('HEL_OPPTY_DEMAND_ANALYSIS_TYPE');
		
		var total = 1;
		var r = [];
		r[0] = {text:'请选择',value:''};
		for(var i=0;i<customerDemandAnalysis.length;i++){
			if(customerDemandAnalysis[i].PAR_LIS_VAL==newValue){
				r[total++] = {text:customerDemandAnalysis[i].LIS_VAL,value:customerDemandAnalysis[i].LIS_VAL};
			}
		}
		customerDemandItem.setOptions(r);
	},
	//商机客户需求分析list 返回 
	customerdemandanalysislist_new_id_FH:function(){
		this.showBackView('projectinfo_new_id','HelcAgent.view.OpportunityManagement.Project_New.ProjectInfo');
	},
	//初始化新增客户需求页面选项框
	toInit:function(){
		var customerDemandType = Ext.getCmp('customerDemandType');
		var customerDemandAnalysisType = this.extractionData('HEL_OPPTY_DEMAND_ANALYSIS');
		
		var getOptions = function(array){
			var r = [];
			r[0] = {text:'请选择',value:''}; 
			for(var i=1;i<array.length;i++){
				r[i] = {text:array[i].LIS_VAL,value:array[i].LIS_VAL};
			}
			return r;
		};
		
		var r = customerDemandAnalysisType = getOptions(customerDemandAnalysisType);
		customerDemandType.setOptions(r);
		
		
	}
	
});