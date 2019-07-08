Ext.define('HelcPAD.controller.OpportunityManagement.Director.ClueHandleDirector_BCICtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			/*//返回
			"button#clueHandleDirector_BCI_FH":{
				tap:'clueHandleDirector_BCI_FH'
			},
			
			//执行
			"button#clueHandleDirector_BCI_ZX":{
				tap:'clueHandleDirector_BCI_ZX'
			},
			
			//线索跟踪人
			"button#BCI_XSGZR_XZ":{
				tap:'BCI_XSGZR_XZ'
			},
			
			//关联商机
			"button#BCI_GLSJ_XZ":{
				tap:'BCI_GLSJ_XZ'
			}*/
		}
	},
	
	//关联商机     必须是主管操作
	/*BCI_GLSJ_XZ:function(){
		var glsj_ZT=Ext.getCmp('BCI_LeadStatus').getValue();
		if(glsj_ZT!='审批中'){
			Ext.Msg.alert("温馨提示",'线索状态不为审批');
			return;
		};
		var obj=this;
		getResult=function(obj,data){
			cc.log('data:'+data);
			obj.NextView('clueProjectList','HelcPAD.view.OpportunityManagement.Director.ClueProjectList');
			Ext.getCmp('clueProjectList_hidden').setValue('主管使用BCI');
			var DataClue=Ext.data.StoreManager.get('ClueProjectListStore');
			if(!DataClue){
				DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueProjectListStore');
			};
			if(data==undefined){
				//Ext.Msg.alert("温馨提示",'500米内无关联商机');
				var htmel=['<div style="font-size:12px;width:100%">'+
			            	'<div style="float:left;width:100%">查无数据</div>'+
			            	'</div>'];
				Ext.getCmp('clueProjectList_list').setItemTpl(htmel);
			}else{
				DataClue.setData(data);
			};
			
		};
		var clueHandleDirector_BCI = Ext.getCmp('clueHandleDirector_BCI');
		var Cd_BCI=clueHandleDirector_BCI.getRecord();
		var ggZH='';
		if(Cd_BCI.data.XHeight!=''){
			var xx1=Cd_BCI.data.XHeight-(500*0.00900901);
			ggZH+=' [Opportunity.X Height] &gt;='+"'"+xx1+"'"+'   and ';
			var xx2=Cd_BCI.data.XHeight+(500*0.00900901);
			ggZH+=' [Opportunity.X Height] &lt;='+"'"+xx2+"'"+'  and ';
		};
		if(Cd_BCI.data.YCoordinate!=''){
			var yy1=Cd_BCI.data.YCoordinate-(500*0.00900901);
			ggZH+=' [Opportunity.Y Coordinate] &gt;= '+"'"+yy1+"'"+'  and ';
			var yy2=Cd_BCI.data.YCoordinate+(500*0.00900901);
			ggZH+=' [Opportunity.Y Coordinate] &lt;= '+"'"+yy2+"'"+' and ';
		};
		ggZH+=' [Opportunity.Account] = '+"'"+Cd_BCI.data.Account+"'";
		ggZH+=' and  [Opportunity.Oppty Type] = '+"'"+'设备商机'+"'";
		var Trim={
				NewQuery:true,
				SearchSpec:ggZH,
				PageSize:'20',
				SortSpec:'Created(DESCENDING)',
				ViewMode:'Manager',
				StartRowNum:'0',
				userID:'0993',
		};
		cc.log(ggZH);
		MapX=Cd_BCI.data.XHeight;
		MapY=Cd_BCI.data.YCoordinate;
		obj.BCI_GLSJ_GGFF(obj,Trim,getResult,3);
	},*/
	
	//关联商机公共方法
	BCI_GLSJ_GGFF:function(obj,Trim,FangFa,num){
		getResult=function(obj,data){
			FangFa(obj,data);
		};
		obj.ToDoClueDirector_ZG_DCLXS(obj,getResult,Trim,num);
	},
	
	//线索跟踪人  必须是主管操作
	/*BCI_XSGZR_XZ:function(){
		var glsj_ZT=Ext.getCmp('BCI_LeadStatus').getValue();
		if(glsj_ZT!='审批中'){
			Ext.Msg.alert("温馨提示",'线索状态不为审批');
			return;
		};
		//userID='0993';
		this.NextView('HQSalesRepPanel','HelcPAD.view.OpportunityManagement.Project_New.HQSalesRepView');
		var ctrl = this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.HQSalesRepCtrl');
		ctrl.source = 'BCI_XSGZR';
		ctrl.storeData = null;
		this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore').removeAll();
		this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.HQSalesRepCtrl').storeData = null;
		this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore').removeAll();
	},*/
	
	//执行
	/*clueHandleDirector_BCI_ZX:function(){
		var obj=this;
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否执行当前操作?',
			   buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
					   
					   getResult=function(data){
						   cc.log('进来了');
						   var thisobj=data.obj;
						   cc.log(data);
						   thisobj.BackView();
						   this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.HQSalesRepCtrl').storeData = null;
						   this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore').removeAll();
					   };
					   
					   var formValue = Ext.getCmp('clueHandleDirector_BCI').getValues(false,true);
					   //传递去的值
					   var formValueTwo ={
							   OpptyNumber:Ext.getCmp('BCI_GLSJ').getValue(),  //BCI_GLSJ
							   Id:formValue.Id,//审批操作
							   ApproveOperate:formValue.ApproveOperate,//审批操作
							   ManagerRejectComments:formValue.ManagerRejectComments,//主管驳回意见、
					   			
					   };
					   //键
					   var formValueModel = Ext.create('HelcPAD.model.OpportunityManagement.Agents.ClueDetailModel',formValueTwo);
					   //组织
					   var ZG=obj.getApplication().getController('OpportunityManagement.Director.ClueListDirectorCtrl').BCIData;
					   var ZG2=ZG.ListOfHELLead_Organization.HELLead_Organization;
					   cc.log(ZG2.length);
					   //当只有一条数据的时候
					   if(ZG2.length==undefined){
						   ZG2=[ZG2];
					   };
					   cc.log(ZG2);
					   ///cc.log(ZG.ListOfHELLead_Organization.HELLead_Organization);
					   //跟踪人
					   var GZR=obj.getApplication().getController('OpportunityManagement.Project_New.HQSalesRepCtrl').storeData;
					   
					   //return;
					   var param = {
								userID:userID,
								clueModel:formValueTwo,
								fields:formValueModel.getFields().keys,
								position:GZR,//跟踪人
								organization:ZG2,//组织
								ViewMode:'All',
						};
						
						var Trim = {
								adpName:'HttpAdapter_PAD_Custom',
				 				prodName:'clueSynchronize',
				 				parameters: param,
				 				obj:obj,
				 				LoadNum:1
						};
					    //obj.BackView();
					    //Ext.Msg.alert("温馨提示","执行成功");
						obj.ZgClXSXQ_GGFF(Trim,getResult);
				   }
			   },
		});
		
	},*/
	
	ZgClXSXQ_GGFF:function(obj,Trim,FangFa){
		getResult=function(data){
			FangFa(data);
		};
		obj.XCX_GG_FF(getResult,Trim);
	},
	
	//返回
	clueHandleDirector_BCI_FH:function(){
		this.BackView();
		this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.HQSalesRepCtrl').storeData = null;
		this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore').removeAll();
	},

});