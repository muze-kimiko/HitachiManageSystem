
/* JavaScript content from app/controller/OpportunityManagement/Agents/CustomerSelectCtrl.js in folder common */
Ext.define('HelcAgent.controller.OpportunityManagement.Agents.CustomerSelectCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	id:'customerSelectCtrl',
	config:{
		control:{
			//列表单击
			'list#custornListXJ':{
				itemtap:'custornListXJ'
			}
		}
	},
	//确认选择客户
	confirmCustomer:function(){
		var items = Ext.getCmp('custornListXJ').getSelection();
		if(!items.length){
			Ext.Msg.alert('提示','请选中一项后再确认！');
			return;
		}
		var account = items[0];
		console.log(account);
		this.BackView();
		Ext.getCmp('clueCustomer').setValue(account.data.Name);
		
	},
	//返回
	customerSelect_back:function(){
		this.BackView();
	},
	//客户查询
	custornerQuery:function(){
		var custornerName = Ext.getCmp('custornerName').getValue().trim();
		
		var store = Ext.data.StoreManager.get('ClientStore');
		if(!store){
			store = Ext.create('HelcAgent.store.OpportunityManagement.CustomerInformation_New.ClientStore');
		};
		//条件
		var queryCondition = "([Account.Name] like '*"+custornerName+"*' ) ";
		//var queryCondition = "([Account.Name] like '*"+custornerName+"*'  AND  [Account.CSN] like '*"+custornerCSN+"*' AND [Account.Org Code Number1] like '*"+organizationId+"*') ";
			queryCondition +="AND ([Account.Account Status]  = '有效'  OR  [Account.Account Status]  = '潜在') AND (([Account.Internal Org Flag] &lt;&gt; 'Y' or [Account.Partner Flag] &lt;&gt; 'N') AND [Account.Account Flag] &lt;&gt; 'N')";
			
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
				Ext.Msg.alert('服务器繁忙，请稍后重试！');
				return ;
			}
			if(result.QueryOpptyAcc_Output.NumOutputObjects=='0'){
				Ext.Msg.alert('提示','未能搜索出结果，请重新输入查询客户的条件！');
				return ;
			}
			store.setData(result.QueryOpptyAcc_Output.ListOfHelEaiAppAccountDetail.Account);
			//Ext.getCmp('customerSelect').setActiveItem(Ext.getCmp('custornListContainer'));
			
		};
		this.connectServer_queryOpportunity(getResult,params);
		
		
	},
	
	custornListXJ:function( select, index, target, record, e, eOpts ){
		var sele=document.getElementsByName('groupkung_custornanalysislistXJ');
		var checkbox = sele[index];
		if(checkbox.style.color==''){
	    		 checkbox.style.color='#e03a3e';
	    }else if(checkbox.style.color=='rgb(204, 204, 204)'){
	    		//是未选中的情况下
	    		checkbox.style.color='#e03a3e';
	    		 
	    }else if(checkbox.style.color=='rgb(224, 58, 62)'){
	    		//是选中的情况下
	    		 checkbox.style.color='#ccc';
	    };
		if(checkbox.style.color='#e03a3e'){
			for(var i=0;i<sele.length;i++){
				if(i!=index){
	    			 sele[i].style.color = '#ccc';
	    		};
	    	};
		};
	},

	
});