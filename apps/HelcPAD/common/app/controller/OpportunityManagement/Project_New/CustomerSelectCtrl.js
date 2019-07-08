Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.CustomerSelectCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
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
	//确认选择客户
	confirmCustomer:function(){
		var items = Ext.getCmp('custornList').getSelection();
		if(!items.length){
			Ext.Msg.alert('提示','请选中一项后再确认！');
			return;
		}
		var account = items[0];
		var comeSource = Ext.getCmp('comeSource').getValue();
		console.log(account);
		this.BackView();
		if(comeSource=='HelcPAD.controller.OpportunityManagement.Project_New.ProjectInfoCtrl'||this.isEmptyOrNull(comeSource)){
			var accountName = Ext.getCmp('account');
			var accountId = Ext.getCmp('accountId');
			var accountAttribute = Ext.getCmp('accountAttribute');//客户属性
			var accountProperty = Ext.getCmp('accountProperty');//客户性质
			var accountType = Ext.getCmp('accountType');//客户类型
			//var accountSubType = Ext.getCmp('accountSubType');//客户子类型
			accountName.setValue(account.raw.Name);
			accountId.setValue(account.raw.RowId);
			var opptyFinalUser = Ext.getCmp('opptyFinalUser');
			opptyFinalUser.setValue(account.raw.Name);
			var accountKANumber = Ext.getCmp('accountKANumber');
			console.log('accountKANumber:'+account.raw.AccountKANumber);
			accountKANumber.setValue(account.raw.AccountKANumber);
			accountKANumber.setPlaceHolder('');
			//opptyFinalUser.setReadOnly(true);
			accountName.setReadOnly(true);
			accountAttribute.setOptions({text:account.raw.AccountAttribute,value:account.raw.AccountAttribute});
			accountProperty.setOptions({text:account.raw.AccountProperty,value:account.raw.AccountProperty});
			accountType.setValue(account.raw.Type);
			//accountSubType.setValue(account.raw.AccountSubType);
			setTimeout('Ext.getCmp(\'accountSubType\').setValue(\''+account.raw.AccountSubType+'\');',100);
			
		}else if(comeSource=='HelcPAD.controller.OpportunityManagement.Project_New.KeyContactCtrl'){
			var keyContactAccount = Ext.getCmp('keyContactAccount');
			keyContactAccount.setValue(account.raw.Name);
			
		}else if(comeSource=='HelcPAD.controller.OpportunityManagement.Project_New.KeyContactConstructCtrl'){
			var keyContactConstructAccount = Ext.getCmp('keyContactConstructAccount');
			keyContactConstructAccount.setValue(account.raw.Name);
			keyContactConstructAccount.setData(account.raw);
		}else if(comeSource=='HelcPAD.controller.OpportunityManagement.Agents.ClueCreateAgentCtrl'){
			var clueCustomer = Ext.getCmp('clueCustomer');
			clueCustomer.setValue(account.raw.Name);
			clueCustomer.setData(account.raw);
			Ext.getCmp('clueCustomerId').setValue(account.raw.RowId);
			Ext.getCmp('clueFinalUser').setValue(account.raw.Name);
			
		}else if(comeSource=='HelcPAD.controller.OpportunityManagement.Director.ClueHandleDirectorCtrl'){
			var LeadSource=obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').LeadSource;
			cc.log('获取到的客户：'+account.raw.Name);
			if(LeadSource=='经销商'){
				Ext.getCmp('Clue_Account').setValue(account.raw.Name);
			}else if(LeadSource=='外部线索'){
				//Ext.getCmp('BCI_LeadAccount').setValue(account.raw.Name);
			};
		};
	
		
	},
	//返回
	customerSelect_back:function(){
		this.BackView();
	},
	//客户查询
	custornerQuery:function(){
		//给予高度
		var height=MapHeight-210-50-45;
		Ext.getCmp('custornList').setHeight(height);
		
		var custornerName = Ext.getCmp('custornerName').getValue().trim();
		var custornerCSN = Ext.getCmp('custornerCSN').getValue().trim();
		var custornerAccountStatus = Ext.getCmp('custornerAccountStatus');
		var organizationId = Ext.getCmp('organizationId').getValue().trim();
		//([Account.Name] like '*2015*'  AND  [Account.CSN] like '*BAB005*' AND  [Account.Account Status]  = '潜在' ) AND ([Account.Account Status]  = '有效'  OR  [Account.Account Status]  = '潜在')
		custornerAccountStatus = custornerAccountStatus.getValue();
		
		var store = Ext.data.StoreManager.get('ClientStore');
		if(!store)
			store = Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.ClientStore');
		
		/*var queryCondition = "([Account.Name] like '*"+custornerName+"*'  AND  [Account.CSN] like '*"+custornerCSN+"*' AND [Account.Org Code Number1] like '*"+organizationId+"*') ";
		if(!custornerAccountStatus)
			queryCondition +="AND ([Account.Account Status]  = '有效'  OR  [Account.Account Status]  = '潜在') AND (([Account.Internal Org Flag] &lt;&gt; 'Y' or [Account.Partner Flag] &lt;&gt; 'N') AND [Account.Account Flag] &lt;&gt; 'N')";
		else
			queryCondition  +="AND ([Account.Account Status]  = '"+custornerAccountStatus+"') AND (([Account.Internal Org Flag] &lt;&gt; 'Y' or [Account.Partner Flag] &lt;&gt; 'N') AND [Account.Account Flag] &lt;&gt; 'N')";
			*/
		var queryCondition='';
		if(custornerName!=''){
			queryCondition+="([Account.Name] like '*"+custornerName+"*' ) AND  ";
		};
		if(custornerCSN!=''){
			queryCondition+="([Account.CSN] like '*"+custornerCSN+"*' ) AND  ";
		};
		if(organizationId!=''){
			queryCondition+="([Account.Org Code Number1] like '*"+organizationId+"*' ) AND  ";
		};
		if(custornerAccountStatus!='任意'){
			queryCondition+="([Account.Account Status] like '*"+custornerAccountStatus+"*' ) AND  ";
		};
		queryCondition+="(([Account.Internal Org Flag] &lt;&gt; 'Y' or [Account.Partner Flag] &lt;&gt; 'N') AND [Account.Account Flag] &lt;&gt; 'N')";
		cc.log('QQ:'+queryCondition);
	
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
				Ext.Msg.alert('温馨提示','服务器繁忙，请稍后重试！');
				return ;
			}
			if(result.QueryOpptyAcc_Output.NumOutputObjects=='0'){
				Ext.Msg.alert('温馨提示','未能搜索出结果，请重新输入查询客户的条件！');
				return ;
			}
			store.setData(result.QueryOpptyAcc_Output.ListOfHelEaiAppAccountDetail.Account);
			//Ext.getCmp('customerSelect').setActiveItem(Ext.getCmp('custornListContainer'));
			
		};
		
		this.connectServer_queryOpportunity(getResult,params);
		
		
	},
	
	custornList:function( select, index, target, record, e, eOpts ){
		/*if(event.target.id!='groupkung_custornanalysislist'){
			var account = record;
			var comeSource = Ext.getCmp('comeSource').getValue();
			console.log(account);
			this.BackView();
			if(comeSource=='HelcPAD.controller.OpportunityManagement.Project_New.ProjectInfoCtrl'||this.isEmptyOrNull(comeSource)){
				var accountName = Ext.getCmp('account');
				var accountId = Ext.getCmp('accountId');
				var accountAttribute = Ext.getCmp('accountAttribute');//客户属性
				var accountProperty = Ext.getCmp('accountProperty');//客户性质
				var accountType = Ext.getCmp('accountType');//客户类型
				var accountSubType = Ext.getCmp('accountSubType');//客户子类型
				accountName.setValue(account.raw.Name);
				accountId.setValue(account.raw.RowId);
				var opptyFinalUser = Ext.getCmp('opptyFinalUser');
				opptyFinalUser.setValue(account.raw.Name);
				var accountKANumber = Ext.getCmp('accountKANumber');
				console.log('accountKANumber:'+account.raw.AccountKANumber);
				accountKANumber.setValue(account.raw.AccountKANumber);
				accountKANumber.setPlaceHolder('');
				//opptyFinalUser.setReadOnly(true);
				accountName.setReadOnly(true);
				accountAttribute.setOptions({text:account.raw.AccountAttribute,value:account.raw.AccountAttribute});
				accountProperty.setOptions({text:account.raw.AccountProperty,value:account.raw.AccountProperty});
				accountType.setOptions({text:account.raw.Type,value:account.raw.Type});
				accountSubType.seOptions({text:account.raw.AccountSubType,value:account.raw.AccountSubType});
				
			}else if(comeSource=='HelcPAD.controller.OpportunityManagement.Project_New.KeyContactCtrl'){
				var keyContactAccount = Ext.getCmp('keyContactAccount');
				keyContactAccount.setValue(account.raw.Name);
				
			}else if(comeSource=='HelcPAD.controller.OpportunityManagement.Project_New.KeyContactConstructCtrl'){
				var keyContactConstructAccount = Ext.getCmp('keyContactConstructAccount');
				keyContactConstructAccount.setValue(account.raw.Name);
				keyContactConstructAccount.setData(account.raw);
			}else if(comeSource=='HelcPAD.controller.OpportunityManagement.Agents.ClueCreateAgentCtrl'){
				var clueCustomer = Ext.getCmp('clueCustomer');
				clueCustomer.setValue(account.raw.Name);
				clueCustomer.setData(account.raw);
				Ext.getCmp('clueCustomerId').setValue(account.raw.RowId);
				Ext.getCmp('clueFinalUser').setValue(account.raw.Name);
				
			}
		}else{*/
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
		//}
		
	},
	//该部分不使用
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