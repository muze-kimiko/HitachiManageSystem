Ext.define('HelcAgent.controller.OpportunityManagement.Project_New.KeyContactConstructCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	
	config:{
		control:{
			//返回
			'button#keyContactConstructBack':{
				tap:'keyContactConstructBack'
			},
			//联系人新建
			'button#keyContactConstruct':{
				tap:'keyContactConstruct'
			},
			//关联客户
			'button#toKeyContactConstructAccount':{
				tap:'toKeyContactConstructAccount'
			}
		}
	},
	//返回
	keyContactConstructBack:function(){
		this.BackView();
	},
	//新建联系人
	keyContactConstruct:function(){
		var obj = this;
		
		var contactConstructLastName = Ext.getCmp('contactConstructLastName').getValue().trim();
		var contactConstructFirstName = Ext.getCmp('contactConstructFirstName').getValue().trim();
		var contactConstructSex = Ext.getCmp('contactConstructSex').getValue().trim();
		var ConstructjobTitle = Ext.getCmp('constructjobTitle').getValue().trim();
		var constructWorkPhone = Ext.getCmp('constructWorkPhone').getValue().trim();
		var keyContactConstructAccount = Ext.getCmp('keyContactConstructAccount').getData();
		
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否新建联系人？',
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
		    	 if(!keyContactConstructAccount){
		 			Ext.Msg.alert('提示信息','请关联客户信息');
		 			return ;
		 		}
		 			
		 		if(!contactConstructFirstName||!contactConstructLastName||!ConstructjobTitle){
		 			Ext.Msg.alert('提示信息','请填写必要的联系人信息');
		 		}
		 		
		 		
		 		var keyConcat = {
		 				lastName:contactConstructLastName,
		 				firstName:contactConstructFirstName,
		 				jobTitle:ConstructjobTitle,
		 				contactAccount:keyContactConstructAccount
		 		};
		 		
		 		if(ConstructjobTitle)
		 			keyConcat.sex = contactConstructSex;
		 		else
		 			keyConcat.sex = '';
		 		
		 		if(constructWorkPhone)
		 			keyConcat.workPhone = constructWorkPhone;
		 		else 
		 			keyConcat.workPhone = '';
		 		
		 		keyContact.userID = userID;
		 		var params = {
		 				adpName:'HttpAdapter_PAD_Custom',
		 				prodName:'keyContactBuild',
		 				parameters: keyConcat
		 		};
		 		
		 		var getResult = function(result){
		 			
		 			if(!result.OpptyContactSynchronize_Output){
		 				Ext.Msg.alert('提示信息','服务器繁忙，请稍后重试！');
		 				return ;
		 			}else
		 				Ext.Msg.alert('新建联系人成功，您可选择该联系人或重新查找！');
		 				
		 			var contant = result.OpptyContactSynchronize_Output.ListOfHelEaiAppOpportunityContact.Contact;
		 			
		 			
		 			obj.BackView();
		 			var store = Ext.data.storeManager.get('KeyContactStore');
		 			if(!store)
		 				store = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.KeyContactStore');
		 			
		 			store.setData([contant]);
		 			Ext.getCmp('keyContactPanel').setActiveItem(Ext.getCmp('keyContactContainer'));
		 			
		 		};
		 		
		 		obj.connectServer_queryOpportunity(getResult,params);
				   }
			   }
			});
		
		
		
	},
	//关联客户
	toKeyContactConstructAccount:function(){
		this.NextView('customerSelect','HelcAgent.view.OpportunityManagement.Project_New.CustomerSelectView');
		Ext.getCmp('comeSource').setValue('HelcAgent.controller.OpportunityManagement.Project_New.KeyContactConstructCtrl');
		
	}
		
});