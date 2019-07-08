
Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.GZR.ConcernedAboutPeopleCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config : {
		control:{
			//返回
			'button#ConcernedAboutPeople_id_FH':{
				tap:'ConcernedAboutPeople_id_FH'
			},
			
			//提交
			'button#ConcernedAboutPeople_id_TJ':{
				tap:'ConcernedAboutPeople_id_TJ'
			},
			
			//关注人
			"textfield#GZRname":{
				tap:'GZRname'
			},
		}
	},
	
	//返回
	ConcernedAboutPeople_id_FH:function(){
		this.BackView();
	},
	
	//提交
	ConcernedAboutPeople_id_TJ:function(){
		var obj=this;
		var BusinessID=object.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectListCtrl').BusinessID;
		var character=object.getApplication().getController('HelcPAD.controller.login.PADMainCtrl').character;
		ViewMode = 'All';//主管用
		if(character=='营业员'){
			var ViewMode='Organization';//营业员用
		};
		
		var part = {
				userID:userID,
				Id:BusinessID,
				ViewMode:ViewMode,
				//Position:Ext.getCmp('GZRzw').getValue(),
				//PositionId:Ext.getCmp('GZRzwId').getValue(),
				//SalesRep:Ext.getCmp('GZRname').getValue(),
				SalesRepId:Ext.getCmp('GZRnameId').getValue(),
		};
		
		var data = {};
		data.adpName='HttpAdapter_PAD_Custom';
		data.prodName='getnewGZR';
		data.parameters=part;
		console.log(data);
		//return;
		var getResult = function(result){
			console.log(result);
			try{
				var da=result.OpptyDetailSynchronize_Output.ListOfHelEaiAppOpportunityDetail.Opportunity;
				if(da){
					obj.BackView();
					WL.Toast.show('提交关注人成功');
				};
			}catch(e){
				Ext.Msg.alert('温馨提示','提交关注人失败！');	
			};
			
		};
		
		obj.XCX_GG_FF(getResult,data);
	},
	
	//关注人
	GZRname:function(textfield){
		console.log(textfield);
		console.log(textfield.getReadOnly());
		if(!textfield.getReadOnly()){
			this.NextView('NewHQSalesRepView','HelcPAD.view.OpportunityManagement.Project_New.NewHQSalesRepView');
			var store = this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
			store.setData([]);
			//2016-5-11 后加
			var store2 = this.getStore('NewHQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.NewHQSalesRepStore');
			store2.setData([]);
			//修改列表的长度
			var gd=MapHeight-45-50-170;
			//cc.log('gd:'+gd);
			Ext.getCmp('NewHQSalesRepList').setHeight(gd);
			
			
			//更改标题头
			Ext.getCmp('newSalesRepToolbar').setTitle('关注人');
		};
		
	},
	

	
	
	
});