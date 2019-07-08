
/* JavaScript content from app/controller/OpportunityManagement/Project_New/CustomerDemandAnalysisCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.CustomerDemandAnalysisCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
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
	
	//代理商资料   保存or修改(名字不同，功能一样)
	//保存or修改商机需求不是保存or修改当前这条，而是会把所有已经保存的需求在保存一遍
	customerdemandanalysis_new_id_BC:function(){
		//判断提示需求
		var ANname=Ext.getCmp('customerdemandanalysis_new_id_BC').getText();
		var TS='是否保存商机客户需求';
		if(ANname=='修改'){
			TS='是否修改商机客户需求';
		};
		
		var obj = this;
		Ext.Msg.show({
			   title: '温馨提示',
			   message: TS,
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				if(buttonId == 'yes'){
				//放入商机详细信息
		    	var opportunity = Ext.getCmp('customerDemandOpportunity').getData();
		 		//该商机需求ID   保存or修改 这个字段接口都没用上啊
		 		var customerDemandId = Ext.getCmp('customerDemandId').getValue();
		 		//cc.log('需求ID'+customerDemandId);
		 		//需求类型
		 		var customerDemandType = Ext.getCmp('customerDemandType').getValue().trim();
		 		//需求项
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
		 			store = Ext.create('HelcPAD.store.OpportunityManagement.Project_New.CustomerDemandStore');
		 		
		 		var data = store.getData().all;
		 		console.log(data);
		 		var customerDemand = [];
		 		
		 		for(var i=0;i<data.length;i++){
		 			
		 			customerDemand[i] = {
		 					demandId:data[i].data.Id,
		 					demandType:data[i].data.DemandType,
		 					demandItem:data[i].data.DemandItem,
		 			};
		 		};
		 
		 		if(ANname=='修改'){
		 			var index=Ext.getCmp('customerDemandZB').getValue();
		 			customerDemand[index].demandType=customerDemandType;
		 			customerDemand[index].demandItem=customerDemandItem;
		 			customerDemand[index].demandId=customerDemandId;
		 		}else{
		 			customerDemand[data.length] = {
		 					demandType:customerDemandType,
		 					demandItem:customerDemandItem,
		 			};
		 			
		 			if(customerDemandId){
		 				customerDemand[data.length].demandId = customerDemandId;
		 			};
		 			
		 		};
		 		
		 		//cc.log('提交需求数据');
		 		//cc.log(customerDemand);
		 		
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
		 		
		 		//console.log(param);
		 		
		 		var getResult = function(result){
		 			if(!result.OpptyDemAnalySynchronize_Output){
		 				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
		 				return ;
		 			}
		 			if(result.OpptyDemAnalySynchronize_Output.ListOfHelEaiAppOpportunityDemandAnalysis.Opportunity.Id){
		 				Ext.Msg.alert('提示','保存客户需求成功！');
		 				obj.BackView();
		 				obj.BackView();
		 				obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectInfoCtrl').projectinfo_new_id_QTXX_KHXQFX();
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
		//this.showBackView('customerdemandanalysislist_new_id','HelcPAD.view.OpportunityManagement.Project_New.CustomerDemandAnalysisList');
	},
	
	//商机客户需求分析list  删除
	customerdemandanalysislist_new_id_SC:function(){
		var obj = this;
		//获取选中的那天数据
		var customerDemandan = Ext.getCmp('customerdemandanalysislist_new_id_list').getSelection()[0];
		cc.log('1');
		cc.log(customerDemandan);
		if(customerDemandan==undefined){
			Ext.Msg.alert('提示','请选择一条客户需求分析项');
			return;
		}
		if(customerDemandan.get('DemandItem')=='display:none;')
			return;
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否执行当前操作？',
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
					   //商机详细信息
					   var opportunity = Ext.getCmp('customerDemandOppty').getData();
		    	 
					   var store = Ext.data.StoreManager.get('CustomerDemandStore');
					   if(!store)
						   store = Ext.create('HelcPAD.store.OpportunityManagement.Project_New.CustomerDemandStore');
					  
					   //删除list中选中的数据
					   var customerDemandan = Ext.getCmp('customerdemandanalysislist_new_id_list').getSelection();
					   store.remove(customerDemandan[0]);
		 		
					   var data = store.getData().all;
					   var customerDemand = [];
					   cc.log('2');
					   console.log(data);
					   cc.log(data.length);
					   for(var i=0;i<data.length;i++){
						   customerDemand[i] = {
								   demandId:data[i].data.Id,
								   demandType:data[i].data.DemandType,
								   demandItem:data[i].data.DemandItem,
						   };
					   };		 		
					   cc.log('3');
					   cc.log(customerDemand);
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
						   };
						   if(result.OpptyDemAnalySynchronize_Output.ListOfHelEaiAppOpportunityDemandAnalysis.Opportunity.Id){
							   Ext.Msg.alert('提示','删除成功');
							   return ;
						   };
		 		};
		 		
		 		obj.connectServer_queryOpportunity(getResult,params);
				   }
			   }
			});
		
	},
	
	//商机客户需求分析list  进入增加界面
	customerdemandanalysislist_new_id_ZJ:function(){
		//商机详细信息
		var customerDemandOppty = Ext.getCmp('customerDemandOppty').getData();
		this.NextView('customerdemandanalysis_new_id','HelcPAD.view.OpportunityManagement.Project_New.CustomerDemandAnalysis');
		//放入商机详细信息
		Ext.getCmp('customerDemandOpportunity').setData(customerDemandOppty);
		//初始化 需求类型
		this.toInit();
	},
	
	//商机客户需求分析list 点击list列表
	customerdemandanalysislist_new_id_list:function(dataview, index, target, record, e, eOpts){
		if(record.get('DemandItem')=='display:none;')
			return;
		if(event.target.id!='conkung_customerdemandanalysislist'){
			//商机详细
			var opportunity = Ext.getCmp('customerDemandOppty').getData();
			this.NextView('customerdemandanalysis_new_id','HelcPAD.view.OpportunityManagement.Project_New.CustomerDemandAnalysis');
			//放入坐标
			Ext.getCmp('customerDemandZB').setValue(index);
			//把保存按钮变为 修改
			Ext.getCmp('customerdemandanalysis_new_id_BC').setText('修改');
			//list的值
			var customerDemand = record.raw;
			//cc.log('测试测试：');
			//cc.log(customerDemand);
			//初始化 需求类型
			this.toInit();
			//放入当前的需求类型
			Ext.getCmp('customerDemandType').setValue(customerDemand.DemandType);
			//放入 需求项
			Ext.getCmp('customerDemandItem').setValue(customerDemand.DemandItem);
			//放入当条需求分析的 ID
			Ext.getCmp('customerDemandId').setValue(customerDemand.Id);
			//存放商机详细
			Ext.getCmp('customerDemandOpportunity').setData(opportunity);
			//判断是主管进入还是属于这条商机的营业员进入,营业员可以修改，主管只能查看
			var power = obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile;
			if(power=='Manager'){
				Ext.getCmp('customerdemandanalysis_new_id_BC').setHidden(true);
			};
			
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
		this.BackView();
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