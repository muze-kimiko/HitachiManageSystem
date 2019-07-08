
/* JavaScript content from app/controller/OpportunityManagement/Project_New/CompetitorAnalysisCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.CompetitorAnalysisCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			 //竞争对手分析list  返回 
			 'button#competitoranalysislist_new_id_FH':{
			 	tap:'competitoranalysislist_new_id_FH',
			 },
			 
			 //竞争对手分析list 点击list列表
			 'list#competitoranalysislist_new_id_list':{
			 	 itemtap:'competitoranalysislist_new_id_list'
			 },
			 
			 //竞争对手分析list  增加
			 'button#competitoranalysislist_new_id_ZJ':{
				 tap:'competitoranalysislist_new_id_ZJ'
			 },
			 
			 //竞争对手分析list  删除
			 'button#competitoranalysislist_new_id_SC':{
				 tap:'competitoranalysislist_new_id_SC'
			 },
			 
			 //竞争对手分析资料   返回
			 'button#competitoranalysis_new_id_FH':{
				tap:'competitoranalysis_new_id_FH' 
			 },
			 
			 //竞争对手分析资料   保存
			 'button#competitoranalysis_new_id_BC':{
				tap:'competitoranalysis_new_id_BC' 
			 },
		},
	},
	
	//竞争对手分析资料   保存
	competitoranalysis_new_id_BC:function(){
		var AN=Ext.getCmp('competitoranalysis_new_id_BC').getText();
		var TS='是否保存竞争对手分析资料？';
		if(AN=='修改'){
			TS='是否修改竞争对手分析资料？';
		};
		var obj = this;
		Ext.Msg.show({
			   title: '温馨提示',
			   message: TS,
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
		    		var competitorId = Ext.getCmp('competitorId').getValue();
		    		var opportunity = Ext.getCmp('competitorOpportunity').getData();
		    		
		    		var competitorName = Ext.getCmp('competitorName').getValue();
		    		var competitorProduct = Ext.getCmp('competitorProduct').getValue();
		    		var competitordDeliveryDate = Ext.getCmp('competitordDeliveryDate').getValue();
		    		var competitordPayAmount = Ext.getCmp('competitordPayAmount').getValue();
		    		var competitordQuantity = Ext.getCmp('competitordQuantity').getValue();
		    		var competitordComments = Ext.getCmp('competitordComments').getValue();
		    		
		    		if(!competitordComments)
		    			competitordComments = ' ';
		    		
		    		var param = {
		    				userID:userID,
		    				comments2:competitordComments,
		    				comtName:competitorName,
		    				comtProduct:competitorProduct,
		    				deliveryDate:competitordDeliveryDate,
		    				opptyStatus:opportunity.OpptyStatus,
		    				payAmount:competitordPayAmount,
		    				quantity:competitordQuantity,
		    				parRowId:opportunity.RowId
		    		};
		    		if(competitorId)
		    			param.Id = competitorId;
		    		
		    		var params = {
		    				adpName:'HttpAdapter_PAD_Custom',
		    				prodName:'buildCompetitor',
		    				parameters: param
		    		};
		    		
		    		var getResult = function(result){
		    			if(!result.OpptyCompSynchronize_Output){
		    				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
		    				return ;
		    			}else{
		    				Ext.Msg.alert('提示','竞争对手已保存！');
		    				obj.BackView();
		    				obj.BackView();
		    				obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectInfoCtrl').projectinfo_new_id_QTXX_JZDSFX();
		    			}
		    		};
		    		
		    		obj.connectServer_queryOpportunity(getResult,params);
				   }
			   }
			});
	
	},
	
	//竞争对手分析资料   返回
	competitoranalysis_new_id_FH:function(){
		this.BackView();
		//this.showBackView('competitoranalysislist_new_id','HelcPAD.view.OpportunityManagement.Project_New.CompetitorAnalysisList');
	},
	
	//竞争对手分析list  删除
	competitoranalysislist_new_id_SC:function(){
		var obj = this;
		var competitors = Ext.getCmp('competitoranalysislist_new_id_list').getSelection();
		if(competitors.length==0){
			Ext.Msg.alert('提示','请选择一条竞争对手分析项');
			return;
		}else if(competitors[0].get('DeliveryDate')=='display:none;'){
			return;
		};
			
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否删除竞争对手分析？',
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
		    	 var comOpportunity = Ext.getCmp('comOpportunity').getData();
		    	 
		    	 var store = Ext.data.StoreManager.get('CompetitorStore');
		    	 if(!store)
		    		 store = Ext.create('HelcPAD.store.OpportunityManagement.Project_New.CompetitorStore');
		    	 
		    	 store.remove(competitors[0]);			 	 
		    	 var param = {
		    			 userID:userID,
		    			 Id:competitors[0].data.Id,
		    			 opptyId:comOpportunity.RowId
		    	 };
		    	 console.log(param);
		    	 var params = {
		    			adpName:'HttpAdapter_PAD_Custom',
		 				prodName:'deleteCompetitor',
		 				parameters:param
		    	 };
		    	 
		    	 var getResult =function(result){
		    		 if(!result.OpptyCompDelete_Output){
		    			Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
		    		 }
		    	 };
		    	 
		    	 obj.connectServer_queryOpportunity(getResult,params);
		    	 
				 }
			  }
		});
		
	},
	
	//竞争对手分析list  进入增加界面
	competitoranalysislist_new_id_ZJ:function(){
		var opportunity = Ext.getCmp('comOpportunity').getData();
		this.NextView('competitoranalysis_new_id','HelcPAD.view.OpportunityManagement.Project_New.CompetitorAnalysis');
		this.toInit();
		Ext.getCmp('competitorOpportunity').setData(opportunity);
	},
	
	//竞争对手分析list 点击list列表
	competitoranalysislist_new_id_list:function(dataview, index, target, record, e, eOpts){
		if(record.get('DeliveryDate')=='display:none;')
			return ;
		if(event.target.id!='conkung_competitoranalysislist'){
			var opportunity = Ext.getCmp('comOpportunity').getData();
			var competitor = record.raw;
			
			this.NextView('competitoranalysis_new_id','HelcPAD.view.OpportunityManagement.Project_New.CompetitorAnalysis');
			//按钮变为修改
			Ext.getCmp('competitoranalysis_new_id_BC').setText('修改');
			
			Ext.getCmp('competitorOpportunity').setData(opportunity);
			Ext.getCmp('competitorId').setValue(competitor.Id);
			
			Ext.getCmp('competitorName').setValue(competitor.ComtName);
			Ext.getCmp('competitorProduct').setValue(competitor.ComtProduct);
			Ext.getCmp('competitordDeliveryDate').setValue(competitor.DeliveryDate);
			Ext.getCmp('competitordPayAmount').setValue(competitor.PayAmount);
			Ext.getCmp('competitordQuantity').setValue(competitor.Quantity);
			Ext.getCmp('competitordComments').setValue(competitor.Comments2);
			var power = obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile;
			//主管无法修改竞争对手分析 ，只有属于商机的营业员才能修改
			if(power=='Manager'){
				Ext.getCmp('competitoranalysis_new_id_BC').setHidden(true);
			};
			
			
		}else{
			var sele=document.getElementsByName('groupkung_competitoranalysislist');
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
	
	//竞争对手分析list  返回 
	competitoranalysislist_new_id_FH:function(){
		this.BackView();
		//this.showBackView('projectinfo_new_id','HelcPAD.view.OpportunityManagement.Project_New.ProjectInfo');
	},
	//进入保存页面的初始化
	toInit:function(){
		var competitorName = Ext.getCmp('competitorName');
		var competitor = this.extractionData('HEL_COMT_NAME');
		var total = 1;
		var r = [];
		r[0] = {text:'请选择',value:''};
		
		for(var i=0;i<competitor.length;i++){
			r[total++] = {text:competitor[i].LIS_VAL,value:competitor[i].LIS_VAL};
		}
		competitorName.setOptions(r);
		var comOpportunity = Ext.getCmp('comOpportunity').getData();
		if(comOpportunity.OpptyStatus!='大项目部退回'&&comOpportunity.OpptyStatus!='申请流失'&&comOpportunity.OpptyStatus!='提交大项目部'&&comOpportunity.OpptyStatus!='完成'&&comOpportunity.OpptyStatus!='流失'&&comOpportunity.OpptyStatus!='已提交')
			Ext.getCmp('competitorSegment').setHidden(false);
		else
			Ext.getCmp('competitorSegment').setHidden(true);
	}
	
	
});