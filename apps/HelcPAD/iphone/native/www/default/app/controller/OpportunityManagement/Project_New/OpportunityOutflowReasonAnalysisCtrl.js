
/* JavaScript content from app/controller/OpportunityManagement/Project_New/OpportunityOutflowReasonAnalysisCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.OpportunityOutflowReasonAnalysisCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
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
			 },
			 //提交商机流失
			 'button#opportunityLose':{
				 tap:'opptyLose'
			 },
		},
	},
	//提交商机流失
	opptyLose:function(){
		var obj = this;
		var getResult = '';
		var opportunity = Ext.getCmp('loseOpportunity').getData();
		var recordId = opportunity.RowId;
		var store = this.getStore('OpportunityOutflowReasonStore','HelcPAD.store.OpportunityManagement.Project_New.OpportunityOutflowReasonStore');
		console.log(store.getData());
		if(!store.getData().all.length){
			Ext.Msg.alert('提示','该商机无流失原因分析，请增加流失原因后再提交！');
			return
		}
		var param = {
				recordId:recordId,
				userID:userID
		};
		
		var data = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'opptyLose',
				parameters:param
		};
		
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否提交商机流失？',
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
		    	 if(opportunity.OpptyStatus!='流失'){
		 			getResult = function(result){
		 				
		 				if(result.OpportunityLose_Output.ErrorMsg){
		 					Ext.Msg.alert('提示',result.OpportunityLose_Output.ErrorMsg);
		 					return ;
		 				}
		 					
		 				if(result.OpportunityLose_Output){
		 					Ext.Msg.alert('提示','提交流失成功！');
		 					var length = ViewArray.length-1;
							for(var i = length;i>-1;i--){
								if(ViewArray[i].ViewId!='projectSearch'){
									ViewArray.splice(ViewArray.length-1,1);
								}	
								else{
									obj.BackView();
									break;
								}	
							}
		 					setTimeout("object.getController('login.PADMainCtrl').opportunity_management(object,1,event.target,{data:{text:'我的商机'}},event,eOpts)",100);
		 					//Ext.Viewport.hideMenu('right');
		 					return ;
		 				}
		 				
		 			};
		 			obj.connectServer_queryOpportunity(getResult,data);
		 		}
				   }
			   }
			});
		
	},
	//商机流失原因分析资料   保存
	opportunityoutflowreasonanalysis_new_id_BC:function(){
		var  AN=Ext.getCmp('opportunityoutflowreasonanalysis_new_id_BC').getText();
		var TS='是否新建商机流失原因？';
		if(AN=='修改'){
			TS='是否修改商机流失原因？';
		};
		var obj = this;
		Ext.Msg.show({
			   title: '温馨提示',
			   message: TS,
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
		    	 var loseReasonId = Ext.getCmp('loseReasonId').getValue().trim()?Ext.getCmp('loseReasonId').getValue().trim():'';
		 		var loseReasonOpptyType = Ext.getCmp('loseReasonOpptyType').getValue().trim()?Ext.getCmp('loseReasonOpptyType').getValue().trim():'';
		 		var loseReasonType = Ext.getCmp('loseReasonType').getValue().trim()?Ext.getCmp('loseReasonType').getValue().trim():'';
		 		var loseReasonText = Ext.getCmp('loseReasonText').getValue().trim()?Ext.getCmp('loseReasonText').getValue().trim():'';
		 		var loseReasonConfirm = Ext.getCmp('loseReasonConfirm').getValue()?Ext.getCmp('loseReasonConfirm').getValue():'';
		 		var loseReasonMarks = Ext.getCmp('loseReasonMarks').getValue().trim()?Ext.getCmp('loseReasonMarks').getValue().trim():'';
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
		 			if(result.Fault){
		 				Ext.Msg.alert('提示','填写资料有误，请仔细查看后填写！');
		 				return ;
		 			}
		 			if(!result.OpptyLosReaSynchronize_Output){
		 				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
		 				return ;
		 			}else if(result.OpptyLosReaSynchronize_Output.ListOfHelEaiAppOpportunityLoseReason.ListOfHelOpportunityLoseReason.HelOpportunityLoseReason){
		 				Ext.Msg.alert('提示','保存流失原因成功！');
		 				obj.BackView();
		 				obj.BackView();
		 				obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectInfoCtrl').projectinfo_new_id_QTXX_SJLSYYFX();
		 			}
		 				
		 		};
		 		
		 		obj.connectServer_queryOpportunity(getResult,params);
				   }
			   }
			});
		
		
	},
	
	//商机流失原因分析资料   返回
	opportunityoutflowreasonanalysis_new_id_FH:function(){
		this.BackView();
	},
	
	//商机流失原因分析list  删除
	opportunityoutflowreasonanalysislist_new_id_SC:function(){
		var obj = this;
		var records = Ext.getCmp('opportunityoutflowreasonanalysislist_new_id_list').getSelection();
		if(records.length==0){
			Ext.Msg.alert('提示','请选择一条流失原因分析项！');
			return ;
		}else if(records[0].get('OpptyType')=='display:none;'){
			return;
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
		    		store = Ext.create('HelcPAD.store.OpportunityManagement.Project_New.OpportunityOutflowReasonStore');
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
		 			console.log(result);
		 			if(!result.OpptyLosReaDelete_Output){
		 				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
		 				return ;
		 			}
		 			else{
		 				Ext.Msg.alert('提示','流失原因删除成功！');
		 				return ;
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
		this.NextView('opportunityoutflowreasonanalysis_new_id','HelcPAD.view.OpportunityManagement.Project_New.OpportunityOutflowReasonAnalysis');
		
		Ext.getCmp('loseReasonOpportunity').setData(loseOpportunity);
		console.log(loseOpportunity);
		this.toInit(loseOpportunity);
		
	},
	
	//商机流失原因分析list 点击list列表
	opportunityoutflowreasonanalysislist_new_id_list:function(dataview, index, target, record, e, eOpts){
		var opportunity = Ext.getCmp('loseOpportunity').getData();
		if(record.get('OpptyType')=='display:none;')
			return;
		if(event.target.id!='conkung_opportunityoutflowreasonanalysislist'){
			this.NextView('opportunityoutflowreasonanalysis_new_id','HelcPAD.view.OpportunityManagement.Project_New.OpportunityOutflowReasonAnalysis');
			//保存变修改
			Ext.getCmp('opportunityoutflowreasonanalysis_new_id_BC').setText('修改');
			if(obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile=='Manager')
				Ext.getCmp('opportunityoutflowreasonanalysis_new_id_BC').setHidden(true);
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
			var power = obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile;
			if(power=='Manager'){
				Ext.getCmp('opportunityoutflowreasonanalysis_new_id_BC').setHidden(true);
			}
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
			 
		}
		
		
	},
	
	//商机流失原因分析list  返回 
	opportunityoutflowreasonanalysislist_new_id_FH:function(){
		this.BackView();
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
	toInit:function(loseOpportunity){
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
		
		console.log(loseOpportunity);
		loseReasonOpptyType.setOptions(loseReasonOpptyTypeOptions);
		loseReasonType.setOptions(loseReasonTypeOptions);
		if(loseOpportunity){
			loseReasonOpptyType.setOptions([{text:loseOpportunity.OpptyType,value:loseOpportunity.OpptyType}]);
		}	
		
    }
	
	
});