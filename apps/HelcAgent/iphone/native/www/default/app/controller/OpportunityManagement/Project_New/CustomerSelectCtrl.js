
/* JavaScript content from app/controller/OpportunityManagement/Project_New/CustomerSelectCtrl.js in folder common */
Ext.define('HelcAgent.controller.OpportunityManagement.Project_New.CustomerSelectCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	id:'customerSelectCtrl',
	config:{
		control:{
			//查询符合条件客户
			'button#custornerQuery':{
				tap:'custornerQuery'
			},
			//返回
			'button#customerSelect_back':{
				tap:'customerSelect_back'
			},
			//确认选择客户
			'button#confirmCustomer':{
				tap:'confirmCustomer'
			},
			//列表单击
			'list#custornList':{
				itemtap:'custornList'
			}
		}
	},
	//返回
	customerSelect_back:function(){
		this.BackView();
	},
	//客户查询
	custornerQuery:function(){
		
		var custornerName = Ext.getCmp('custornerName');
		var custornerCSN = Ext.getCmp('custornerCSN');
		var custornerAccountStatus = Ext.getCmp('custornerAccountStatus');
		var organizationId = Ext.getCmp('organizationId');
		//([Account.Name] like '*2015*'  AND  [Account.CSN] like '*BAB005*' AND  [Account.Account Status]  = '潜在' ) AND ([Account.Account Status]  = '有效'  OR  [Account.Account Status]  = '潜在')
		custornerName = custornerName.getValue();
		custornerCSN = custornerCSN.getValue();
		organizationId = organizationId.getValue();
		custornerAccountStatus = custornerAccountStatus.getValue();
		
		var store = Ext.data.StoreManager.get('ClientStore');
		if(!store)
			store = Ext.create('HelcAgent.store.OpportunityManagement.CustomerInformation_New.ClientStore');
		
		var queryCondition = "([Account.Name] like '*"+custornerName+"*'  AND  [Account.CSN] like '*"+custornerCSN+"*' AND [Account.Org Code Number1] like '*"+organizationId+"*') ";
		if(!custornerAccountStatus)
			queryCondition +="AND ([Account.Account Status]  = '有效'  OR  [Account.Account Status]  = '潜在') AND [Account.Type]  ='属下网点' AND (([Account.Internal Org Flag] &lt;&gt; 'Y' or [Account.Partner Flag] &lt;&gt; 'N') AND [Account.Account Flag] &lt;&gt; 'N')";
		else
			queryCondition  +="AND ([Account.Account Status]  = '"+custornerAccountStatus+"'  OR  [Account.Account Status]  = '潜在') AND [Account.Type]  ='属下网点' AND (([Account.Internal Org Flag] &lt;&gt; 'Y' or [Account.Partner Flag] &lt;&gt; 'N') AND [Account.Account Flag] &lt;&gt; 'N')";
			
		var param = {
				SearchSpec:queryCondition,
				userID:userID
		};
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'queryOpptyAccount',
				parameters:param
		};
		
		var getResult = function(result){
			if(!result.QueryOpptyAcc_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}
			store.setData(result.QueryOpptyAcc_Output.ListOfHelEaiAppAccountDetail.Account);
			Ext.getCmp('customerSelect').setActiveItem(Ext.getCmp('custornListContainer'));
			
		};
		
		this.connectServer_queryOpportunity(getResult,params);
		
		
	},
	
	custornList:function( select, index, target, record, e, eOpts ){
		if(event.target.id!='groupkung_custornanalysislist'){
			var account = record;
			var comeSource = Ext.getCmp('comeSource').getValue();
			console.log(account);
			this.BackView();
			if(comeSource=='HelcAgent.controller.OpportunityManagement.Project_New.ProjectInfoCtrl'||this.isEmptyOrNull(comeSource)){
				var accountName = Ext.getCmp('account');
				var accountId = Ext.getCmp('accountId');
				accountName.setValue(account.raw.Name);
				accountId.setValue(account.raw.RowId);
				var opptyFinalUser = Ext.getCmp('opptyFinalUser');
				opptyFinalUser.setValue(account.raw.Name);
				var accountKANumber = Ext.getCmp('accountKANumber');
				console.log('accountKANumber:'+account.raw.AccountKANumber);
				accountKANumber.setValue(account.raw.AccountKANumber);
				accountKANumber.setPlaceHolder('');
				opptyFinalUser.setReadOnly(true);
				accountName.setReadOnly(true);
			}else if(comeSource=='HelcAgent.controller.OpportunityManagement.Project_New.KeyContactCtrl'){
				var keyContactAccount = Ext.getCmp('keyContactAccount');
				keyContactAccount.setValue(account.raw.Name);
				
			}else if(comeSource=='HelcAgent.controller.OpportunityManagement.Project_New.KeyContactConstructCtrl'){
				var keyContactConstructAccount = Ext.getCmp('keyContactConstructAccount');
				keyContactConstructAccount.setValue(account.raw.Name);
				keyContactConstructAccount.setData(account.raw);
			}else if(comeSource=='HelcAgent.controller.OpportunityManagement.Agents.ClueCreateAgentCtrl'){
				var clueCustomer = Ext.getCmp('clueCustomer');
				clueCustomer.setValue(account.raw.Name);
				clueCustomer.setData(account.raw);
				Ext.getCmp('clueCustomerId').setValue(account.raw.RowId);
				Ext.getCmp('clueFinalUser').setValue(account.raw.Name);
				
			}
		}else{
			var sele=document.getElementsByName('groupkung_custornanalysislist');
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
	emptyOrNullValue:function(cmp){
		if(cmp.getValue==''||cmp.getValue()==undefined||cmp.getValue()==null)
			return true;
		else
			return cmp.getValue();
	},isEmptyOrNull:function(value){
		if(value==''||value==undefined||value==null)
			return true;
		else
			return false;
	}
	
});