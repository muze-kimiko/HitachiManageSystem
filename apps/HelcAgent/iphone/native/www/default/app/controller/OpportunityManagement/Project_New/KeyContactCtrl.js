
/* JavaScript content from app/controller/OpportunityManagement/Project_New/KeyContactCtrl.js in folder common */
Ext.define('HelcAgent.controller.OpportunityManagement.Project_New.KeyContactCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	config:{
		control:{
			//返回
			'button#KeyContactPanelback':{
				tap:'KeyContactPanelback'
			},
			//查询
			'button#keyContactQuery':{
				tap:'keyContactQuery'
			},
			//查询客户
			'button#toKeyContactAccount':{
				tap:'toKeyContactAccount'
			},
			//单击联系人列表
			'list#keyContactList':{
				itemtap:'keyContactList'
			},
			//新建联系人
			'button#buildContact':{
				tap:'buildContact'
			}
		}
	},
	//联系人查询
	keyContactQuery:function(){
		var contactLastName = Ext.getCmp('contactLastName').getValue().trim();
		var contactFirstName = Ext.getCmp('contactFirstName').getValue().trim();
		var workPhone = Ext.getCmp('workPhone').getValue().trim();
		var contactSex = Ext.getCmp('contactSex').getValue().trim();
		var jobTitle = Ext.getCmp('jobTitle').getValue().trim();
		var toKeyContactAccount = Ext.getCmp('keyContactAccount').getValue().trim();
		
		var statement = "";
		 
		statement = this.statementConstructor("[Contact.Last Name] like '*?*'",contactLastName,statement);
		statement = this.statementConstructor("[Contact.First Name] like '*?*'",contactFirstName,statement);
		statement = this.statementConstructor("[Contact.M/M] like '*?*'",contactSex,statement);
		statement = this.statementConstructor("[Contact.Job Title] like '*?*'",jobTitle,statement);
		statement = this.statementConstructor("[Contact.Work Phone #] like '*?*'",workPhone,statement);
		statement = this.statementConstructor("exists([Contact.Account] = '?' )",toKeyContactAccount,statement);
		
		//[Contact.Last Name] = '907' and [Contact.First Name] = '907' and [Contact.M/M] = '' and [Contact.Job Title] = '45w3t54w3t' and [Contact.Work Phone #] = '' and exists([Contact.Account] = '20150526V1' )
		//statement = "[Contact.Last Name] like '*"+contactLastName+"*' and [Contact.First Name] like '*"+contactFirstName+"*' and [Contact.M/M] like '*"+contactSex+"*' and [Contact.Job Title] like '*"+jobTitle+"*' and [Contact.Work Phone #] like '*"+workPhone+"*' and exists([Contact.Account] = '20150526V1' )";
		console.log(statement);
		var ViewMode = "Organization";
		
		var param = {
				SearchSpec:statement,
				ViewMode:ViewMode,
				userID:userID
		};
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'keyContactQuery',
				parameters: param
		};
		
		var getResult = function(result){
			
			if(!result.QueryOpptyCont_Output){
				Ext.Msg.alert('提示信息','服务器繁忙，请稍后重试！');
				return ;
			}
			var data = result.QueryOpptyCont_Output.ListOfHelEaiAppOpportunityContact.Contact;
			var store = Ext.data.StoreManager.get('KeyContactStore');
			if(!store)
				store = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.KeyContactStore');
			
			if(result.QueryOpptyCont_Output.NumOutputObjects.NumOutputObjects=='0'){
				Ext.Msg.alert('提示信息','无查询结果，请重新输入查询条件');
				return ;
			}else if(result.QueryOpptyCont_Output.NumOutputObjects.NumOutputObjects=='1')
				store.setData([data]);
			else
				store.setData(data);
				
			Ext.getCmp('keyContactPanel').setActiveItem(Ext.getCmp('keyContactContainer'));
			
			
		};
		
		this.connectServer_queryOpportunity(getResult,params);
		
	},
	//客户选择
	toKeyContactAccount:function(){
		this.NextView('customerSelect','HelcAgent.view.OpportunityManagement.Project_New.CustomerSelectViwe');
		Ext.getCmp('comeSource').setValue('HelcAgent.controller.OpportunityManagement.Project_New.KeyContactCtrl');
	},
	//联系人列表单击
	keyContactList:function(list, index, target, record, e, eOpts ){
		if(event.target.id!='groupkung_keyContactanalysislist'){
			var contact = record.raw;
			this.BackView();
			
			var keyContactLastName = Ext.getCmp('keyContactLastName');
			var keyContactId = Ext.getCmp('keyContactId');
			var keyContactFirstName = Ext.getCmp('keyContactFirstName');
			var keyContactPosition = Ext.getCmp('keyContactPosition');
			var keyContactWorkPhone = Ext.getCmp('keyContactWorkPhone');
			var keyCellularPhone = Ext.getCmp('keyCellularPhone');
			var keyContactDepartment = Ext.getCmp('keyContactDepartment');
			
			keyContactFirstName.setValue(contact.FirstName);
			keyContactId.setValue(contact.RowId);
			keyContactLastName.setValue(contact.LastName);
			keyContactPosition.setValue(contact.JobTitle);
			keyContactWorkPhone.setValue(contact.WorkPhone);
			if(!keyCellularPhone)
				keyCellularPhone.setValue(' ');
			if(!keyContactDepartment)
			keyContactDepartment.setValue(' ');
			
			keyContactLastName.setReadOnly(true);
			keyContactLastName.setPlaceHolder('');
			keyContactId.setReadOnly(true);
			keyContactFirstName.setReadOnly(true);
			keyContactFirstName.setPlaceHolder('');
			keyContactPosition.setReadOnly(true);
			keyContactPosition.setPlaceHolder('');
			keyContactWorkPhone.setReadOnly(true);
			keyContactWorkPhone.setPlaceHolder('');
			keyCellularPhone.setReadOnly(true);
			keyCellularPhone.setPlaceHolder('');
			keyContactDepartment.setReadOnly(true);
			keyContactDepartment.setPlaceHolder('');
		}else{
			var sele=document.getElementsByName('groupkung_keyContactanalysislist');
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
	//联系人新建
	buildContact:function(){
		this.NextView('keyContactConstructPanel','HelcAgent.view.OpportunityManagement.Project_New.KeyContactConstructView');
		
	},
	KeyContactPanelback:function(){
		this.BackView();
	},
	statementConstructor:function(newContent,member,statement){
		if(member==''||member==null||member==undefined)
			return statement;
		newContent = newContent.replace('?',member);
		if(statement=='')
			statement = newContent;
		else if(statement!='')
			statement +=' AND '+newContent;
		return statement ;
	}
});