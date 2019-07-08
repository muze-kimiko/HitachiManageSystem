
/* JavaScript content from app/controller/OpportunityManagement/Project_New/OpportunityOutflowReasonAnalysisCtrl.js in folder common */
Ext.define('HelcAgent.controller.OpportunityManagement.Project_New.OpportunityOutflowReasonAnalysisCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	config:{
		control:{
			 //商机流失原因分析list  返回 
			 'button#opportunityoutflowreasonanalysislist_new_id_FH':{
			 	tap:'opportunityoutflowreasonanalysislist_new_id_FH',
			 },
			 //商机流失原因分析list 点击list列表
			 'list#opportunityoutflowreasonanalysislist_new_id_list':{
			 	 itemtap:'opportunityoutflowreasonanalysislist_new_id_list'
			 },
			 //商机流失原因分析list  增加
			 'button#opportunityoutflowreasonanalysislist_new_id_ZJ':{
				 tap:'opportunityoutflowreasonanalysislist_new_id_ZJ'
			 },
			 //商机流失原因分析list  删除
			 'button#opportunityoutflowreasonanalysislist_new_id_SC':{
				 tap:'opportunityoutflowreasonanalysislist_new_id_SC'
			 },
			 //商机流失原因分析资料   返回
			 'button#opportunityoutflowreasonanalysis_new_id_FH':{
				tap:'opportunityoutflowreasonanalysis_new_id_FH' 
			 },
			 //商机流失原因分析资料   保存
			 'button#opportunityoutflowreasonanalysis_new_id_BC':{
				tap:'opportunityoutflowreasonanalysis_new_id_BC' 
			 },
			 //流失原因类型变化后改变流失原因
			 'selectfield#loseReasonType':{
				 change:'loseReasonTypeChange'
			 }
		},
	},
	
	//商机流失原因分析资料   保存
	opportunityoutflowreasonanalysis_new_id_BC:function(){
		var obj = this;
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否新建商机流失原因？',
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
		    	 var loseReasonId = Ext.getCmp('loseReasonId').getValue().trim();
		 		var loseReasonOpptyType = Ext.getCmp('loseReasonOpptyType').getValue().trim();
		 		var loseReasonType = Ext.getCmp('loseReasonType').getValue().trim();
		 		var loseReasonText = Ext.getCmp('loseReasonText').getValue().trim();
		 		var loseReasonConfirm = Ext.getCmp('loseReasonConfirm').getValue();
		 		var loseReasonMarks = Ext.getCmp('loseReasonMarks').getValue().trim();
		 		var opptyId = Ext.getCmp('loseReasonOpportunity').getData().RowId;
		 		console.log(Ext.getCmp('loseReasonOpportunity').getData());
		 		
		 		
		 		loseReasonConfirm = 'Y';
		 		if(!loseReasonMarks)
		 			loseReasonMarks = ' ';
		 		
		 		var param = {
		 				checkFlag:loseReasonConfirm,
		 				opptyLoseReasonType:loseReasonType,
		 				opptyLoseReason:loseReasonText,
		 				opptyId:opptyId,
		 				loseReasonMarks:loseReasonMarks,
		 				opptyType:loseReasonOpptyType,
		 				userID:userID
		 		};
		 		
		 		if(loseReasonId)
		 			param.id = loseReasonId;
		 		
		 		var params = {
		 				adpName:'HttpAdapter_PAD_Custom',
		 				prodName:'buildOpptyLoseReason',
		 				parameters:param
		 		};
		 		
		 		var getResult = function(result){
		 			if(!result.OpptyLosReaSynchronize_Output){
		 				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
		 				return ;
		 			}else if(result.OpptyLosReaSynchronize_Output.ListOfHelEaiAppOpportunityLoseReason.ListOfHelOpportunityLoseReason.HelOpportunityLoseReason){
		 				Ext.Msg.alert('提示','保存流失原因成功！');
		 				obj.BackView();
		 				obj.BackView();
		 				obj.getApplication().getController('HelcAgent.controller.OpportunityManagement.Project_New.ProjectInfoCtrl').projectinfo_new_id_QTXX_SJLSYYFX();
		 			}
		 				
		 		};
		 		
		 		obj.connectServer_queryOpportunity(getResult,params);
				   }
			   }
			});
		
		
	},
	
	//商机流失原因分析资料   返回
	opportunityoutflowreasonanalysis_new_id_FH:function(){
		this.showBackView('opportunityoutflowreasonanalysislist_new_id','HelcAgent.view.OpportunityManagement.Project_New.OpportunityOutflowReasonAnalysisList');
	},
	
	//商机流失原因分析list  删除
	opportunityoutflowreasonanalysislist_new_id_SC:function(){
		var obj = this;
		var records = Ext.getCmp('opportunityoutflowreasonanalysislist_new_id_list').getSelection();
		if(records.length==0){
			Ext.Msg.alert('提示','请选择一条流失原因分析项！');
		}
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否删除流失原因？',
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
		    	var loseOpportunity = Ext.getCmp('loseOpportunity').getData();
		    	var store = Ext.data.StoreManager.get('OpportunityOutflowReasonStore');
		    	if(!store)
		    		store = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.OpportunityOutflowReasonStore');
		    	store.remove(records[0]);
		 		var param = {
		 				Id:records[0].data.Id,
		 				opptyId:loseOpportunity.RowId,
		 				userID:userID
		 		};
		 		
		 		console.log(param);
		 		var params = {
		 				adpName:'HttpAdapter_PAD_Custom',
		 				prodName:'deleteLoseReason',
		 				parameters:param
		 		};
		 		
		 		var getResult = function(result){
		 			if(!result.OpptyLosReaDelete_Output){
		 				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
		 			}
		 		};
		 		obj.connectServer_queryOpportunity(getResult,params);
				   }
			   }
			});
		
		
	},
	
	//商机流失原因分析list  增加
	opportunityoutflowreasonanalysislist_new_id_ZJ:function(){
		var loseOpportunity = Ext.getCmp('loseOpportunity').getData();
		this.NextView('opportunityoutflowreasonanalysis_new_id','HelcAgent.view.OpportunityManagement.Project_New.OpportunityOutflowReasonAnalysis');
		
		Ext.getCmp('loseReasonOpportunity').setData(loseOpportunity);
		this.toInit();
		
	},
	
	//商机流失原因分析list 点击list列表
	opportunityoutflowreasonanalysislist_new_id_list:function(dataview, index, target, record, e, eOpts){
		var opportunity = Ext.getCmp('loseOpportunity').getData();
		if(event.target.id!='conkung_opportunityoutflowreasonanalysislist'){
			this.NextView('opportunityoutflowreasonanalysis_new_id','HelcAgent.view.OpportunityManagement.Project_New.OpportunityOutflowReasonAnalysis');
			
			var loseReason = record.raw;
			Ext.getCmp('loseReasonId').setValue(loseReason.Id);
			
			var loseReasonOpptyType = Ext.getCmp('loseReasonOpptyType');
			var loseReasonType = Ext.getCmp('loseReasonType');
			var loseReasonText = Ext.getCmp('loseReasonText');
			var loseReasonConfirm = Ext.getCmp('loseReasonConfirm');
			var loseReasonMarks = Ext.getCmp('loseReasonMarks');
			
			
			loseReasonOpptyType.setOptions([{text:loseReason.OpptyType,value:loseReason.OpptyType}]);
			loseReasonType.setOptions([{text:loseReason.OpptyLoseReasonType,value:loseReason.OpptyLoseReasonType}]);
			loseReasonText.setOptions([{text:loseReason.OpptyLoseReason,value:loseReason.OpptyLoseReason}]);
			if(loseReason.CheckFlag=='Y')
				loseReasonConfirm.setValue(1);
			else
				loseReasonConfirm.setValue(0);
			loseReasonMarks.setValue(loseReason.OpptyLoseComments);
			
			loseReasonOpptyType.setReadOnly(true);
			loseReasonType.setReadOnly(true);
			loseReasonText.setReadOnly(true);
			loseReasonMarks.setReadOnly(true);
			loseReasonMarks.setPlaceHolder('');
			if(opportunity.OpptyStatus=='流失')
				Ext.getCmp('opportunityoutflowreasonanalysis_new_id_BC').setHidden(true);
			
			Ext.getCmp('loseReasonOpportunity').setData(opportunity);
		}else{
			var sele=document.getElementsByName('groupkung_opportunityoutflowreasonanalysislist');
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
		}
		
		
	},
	
	//商机流失原因分析list  返回 
	opportunityoutflowreasonanalysislist_new_id_FH:function(){
		this.showBackView('projectinfo_new_id','HelcAgent.view.OpportunityManagement.Project_New.ProjectInfo');
	},
	loseReasonTypeChange:function(selectField, newValue, oldValue, eOpts ){
		var loseReasonText = Ext.getCmp('loseReasonText');
		var reason = this.extractionData('HEL_OPPTY_LOSE_REASON');
		var total = 1;
		var r = [];
		r[0] = {text:'请选择',value:''};
		for(var i=0;i<reason.length;i++){
			if(reason[i].PAR_LIS_VAL==newValue){
				r[total++] = {text:reason[i].LIS_VAL,value:reason[i].LIS_VAL};
			}
		}
		loseReasonText.setOptions(r);
		
	},
	//流失原因增加界面初始化
	toInit:function(){
		var loseReasonOpptyType = Ext.getCmp('loseReasonOpptyType');
		var loseReasonType = Ext.getCmp('loseReasonType');
		
		
		var loseReasonOpptyTypeOptions = this.extractionData('HEL_OPPTY_TYPE');
		var loseReasonTypeOptions = this.extractionData('HEL_OPPTY_LOSE_REASON_TYPE');
		
		
		var getOptions = function(array){
			var r = [];
			r[0] = {text:'请选择',value:''}; 
			for(var i=1;i<array.length;i++){
				r[i] = {text:array[i].LIS_VAL,value:array[i].LIS_VAL};
			}
			return r;
		};
		
		loseReasonOpptyTypeOptions =  getOptions(loseReasonOpptyTypeOptions);
		loseReasonTypeOptions = getOptions(loseReasonTypeOptions);
		
		
		loseReasonOpptyType.setOptions(loseReasonOpptyTypeOptions);
		loseReasonType.setOptions(loseReasonTypeOptions);
		
		
    }
	
	
});