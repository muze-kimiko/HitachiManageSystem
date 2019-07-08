
/* JavaScript content from app/controller/OpportunityManagement/Project_New/HQSalesRepCtrl.js in folder common */
Ext.define('HelcAgent.controller.OpportunityManagement.Project_New.HQSalesRepCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	config:{
		control:{
			//返回
			'button#HQSalesRepPanelBack':{
				tap:'HQSalesRepPanelBack'
			},
			//查询跟单人员
			'button#HQSalesRepQuery':{
				tap:'HQSalesRepQuery'
			},
			//供选择主要的列表
			'list#HQSalesRepList':{
				itemtap:'HQSalesRepList'
			},
			//选项列表单击
			'list#selectItemlist':{
				itemtap:'selectItemlist'
			},
			//选项列表返回
			'button#selectItemViewBack':{
				tap:'HQSalesRepPanelBack'
			},
			//确认选择按钮
			'button#selectItemViewConfirm':{
				tap:'selectItemViewConfirm'
			},
			//确定使用列表中的人员
			'button#HQSalesRepPanelComplete':{
				tap:'HQSalesRepPanelComplete'
			},
			
			//活动页签
			'tabpanel#HQSalesRepPanel':{
				activeitemchange:'HQSalesRepPanel'
			},
		}
	},
	
	HQSalesRepPanel:function(obj,value,oldValue,eOpts){
		var tp_chart=Ext.getCmp('HQSalesRepPanel');
		var itemid=tp_chart.getActiveItem().getId();
		cc.log(itemid);
		if(itemid=='HQSalesRepPanel_panel'){
			if(!this.storeData||this.storeData.length==0){
				this.storeData = null;
			}else{
				cc.log('12313');
				var store = this.getStore('HQSalesRepStore','HelcAgent.store.OpportunityManagement.Project_New.HQSalesRepStore');
				store.setData(this.storeData);
			};
			
		};
	},
	
	
	//确定使用列表中的人员
	HQSalesRepPanelComplete:function(){
		var selectConfirm = document.getElementsByName('groupkung_HQSalesRepanalysislist');
		var store = this.getStore('HQSalesRepStore','HelcAgent.store.OpportunityManagement.Project_New.HQSalesRepStore');
		var checked = 'null';
		for(var i=0;i<selectConfirm.length;i++){
			if(selectConfirm[i].style.color=='rgb(224, 58, 62)'){
				checked = i;
			}
		}
		if(checked=='null'){
			Ext.Msg.alert('提示','请选择主要跟踪人员');
			return ;
		}
		
		store.getAt(checked).set('isPrimaryMVG','Y');
		var r = [];
		var total = 0;
		for(var i=0;i<store.getData().all.length;i++){
			r[total++] = store.getData().all[i].data; 
		}
		this.storeData = r;
		console.log(this.storeData);
		this.BackView();
		if(this.source){
			var saleRep = store.getAt(checked).data;
			Ext.getCmp(this.source).setValue(saleRep.LastName+saleRep.FirstName);
		}
	},
	//确认将列表中的人员加入待确认列表中
	selectItemViewConfirm:function(){
		var sele=document.getElementsByName('groupkung_selectItemList');
		
		var store = this.getStore('HQSalesRepStore','HelcAgent.store.OpportunityManagement.Project_New.HQSalesRepStore');
		
		var r = [];
		var total = 0;
		for(var i=0;i<sele.length;i++){
			if(sele[i].style.color=='rgb(224, 58, 62)'){
				r[total++] = store.getAt(i).data;
			}
		}
		
		if(!this.storeData)
			this.storeData = r;
		else
			this.storeData = this.storeData.concat(r);
		
		store.setData(this.storeData);
		//cc.log('----------------确认----------------');
		//cc.log(this.storeData);
		this.BackView();
		Ext.getCmp('HQSalesRepPanel').setActiveItem(Ext.getCmp('HQSalesRepListContainer'));
		
	},
	//选项列表单击
	selectItemlist:function( list, index, target, record, e, eOpts ){
		
		var sele=document.getElementsByName('groupkung_selectItemList');
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
	},
	//返回按钮
	HQSalesRepPanelBack:function(){
		this.BackView();
	},
	//总部跟踪人员与跟踪人员
	HQSalesRepQuery:function(){
		var repStore = this.getStore('HQSalesRepStore','HelcAgent.store.OpportunityManagement.Project_New.HQSalesRepStore').getData().all;
		//if(repStore)
		var r = [];
		var total = 0;
		for(var i=0;i<repStore.length;i++){
			r[total++] = repStore[i].data;
		}
		
		this.storeData = r;
		cc.log(r);
		if(!this.storeData||this.storeData.length==0)
			this.storeData = null;
		//[Position.Active Last Name]='张' AND [Position.Active First Name] = '振宇' AND [Position.Active Login Name] = '2155' AND [Position.Org Name] = '营业工程总部, 内部' AND [Position.Position Type] = '销售代表'
		var obj = this;
		var lastName = Ext.getCmp('lastName').getValue().trim();
		var firstName = Ext.getCmp('firstName').getValue().trim();
		var loginName = Ext.getCmp('salesRepLoginName').getValue().trim();
		var positionName = Ext.getCmp('positionName').getValue().trim();
		var division = Ext.getCmp('division').getValue().trim();
		
		var organization = Ext.getCmp('salesRepOrganization').getValue().trim();
		
		var statement = "";
		var ViewMode = "";
		if(Ext.getCmp('division').getHidden()==true){
			ViewMode = "All";
			if(lastName!='')
				statement = "[Position.Active Last Name]= '"+lastName+"' ";
			if(firstName!=''&&statement!='')
				statement += " AND [Position.Active First Name] = '"+firstName+"' ";
			else if(firstName!=''&&statement=='')
				statement += " [Position.Active First Name] = '"+firstName+"'";
			if(loginName!=''&&statement!='')
				statement += " AND [Position.Active Login Name] = '"+loginName+"' ";
			else if(loginName!=''&&statement=='')
				statement += " [Position.Active Login Name] = '"+loginName+"' ";
			
			//statement = "[Position.Active Last Name]='"+lastName+"' AND [Position.Active First Name] = '"+firstName+"' AND [Position.Active Login Name] = '"+loginName+"' AND [Position.Org Name] = '营业工程总部, 内部' AND [Position.Position Type] = '销售代表'";
			//statement = "[Position.Active Last Name]='张' AND [Position.Active First Name] = '振宇' AND [Position.Active Login Name] = '2155' AND [Position.Org Name] = '营业工程总部' AND [Position.Position Type] = '销售代表'";
			if(statement==''){
				statement +="[Position.Org Name] = '营业工程总部' AND [Position.Position Type] = '销售代表'";
			}else
				statement +="AND [Position.Org Name] = '营业工程总部' AND [Position.Position Type] = '销售代表'";
			
			
			var param = {
					SearchSpec:statement,
					ViewMode:ViewMode,
					userID:userID
			};
			var params = {
					adpName:'HttpAdapter_PAD_Custom',
					prodName:'salesRepQuery',
					parameters: param
			};
			
			var getResult = function(result){
				if(!result.QuerySalesRep_Output){
					Ext.Msg.alert('提示信息','服务器繁忙，请稍后重试！');
					return ;
				}
				
				var HQSalesRepStore = Ext.data.StoreManager.get('HQSalesRepStore');
				if(!HQSalesRepStore)
					HQSalesRepStore = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.HQSalesRepStore');
				
				if(result.QuerySalesRep_Output.NumOutputObjects=='0'){
					Ext.Msg.alert('无结果，请重新输入查询条件！');
					return ;
				}else if(result.QuerySalesRep_Output.NumOutputObjects=='1')
					HQSalesRepStore.setData([result.QuerySalesRep_Output.ListOfPositionInterface.Position]);
				else
					HQSalesRepStore.setData(result.QuerySalesRep_Output.ListOfPositionInterface.Position);
				var dataAll = HQSalesRepStore.getData().all;
				cc.log(dataAll);
				for(var i=0;i<this.storeData.length;i++){
					for(var j=0;j<dataAll.length;j++){
						if(dataAll[i].data.Id==obj.storeData[j].Id){
							HQSalesRepStore.remove(HQSalesRepStore.getAt(i));
						};
						//store.remove(store.getAt(i));
								
					};
					//HQSalesRepStore.remove(Ext.create('HelcAgent.model.OpportunityManagement.Project_New.HQSalesRepModel',storeData[i]));
				}
				
				
				if(obj.source){
					obj.NextView('selectItemView','HelcAgent.view.OpportunityManagement.Project_New.SelectItemView');
					
				}
			};
			
			this.connectServer_queryOpportunity(getResult,params);
		}else{
			
			//
			
			//	 orgName division positionType
			statement = this.statementConstructor('[Position.Active Last Name]= \'?\' ',lastName,statement);
			statement = this.statementConstructor('[Position.Active First Name] = \'?\' ',firstName,statement);
			statement = this.statementConstructor('[Position.Active Login Name] = \'?\' ',loginName,statement);
			statement = this.statementConstructor('[Position.Name] = \'?\' ',positionName,statement);
			statement = this.statementConstructor('[Position.Division] = \'?\' ',division,statement);
			//statement = this.statementConstructor('[Position.Position Type] = \'?\' ',positionType,statement);
			statement = this.statementConstructor('[Position.Organization] = \'?\'',organization,statement);
			
			
			
			ViewMode = "Organization";
			//statement = "[Position.Active Last Name]='陆' AND [Position.Active First Name] = '佳慧' AND [Position.Active Login Name] = '6405' AND [Position.Name] = 'HEL_汕头司_报价员' AND [Position.Division] = '汕头分公司' AND [Position.Position Type] = '销售代表' AND [Position.Organization] = '汕头分公司' AND  ";
			
			if(statement!='')
				statement +=" AND ";
				
				statement += " ([Position.Position Type] = '销售代表' AND ([Position.Org Name] = GetProfileAttr('Org.Name') OR ([Position.Org Name] = GetProfileAttr('Org.Parent Organization Name') AND [Position.Org Name]  &lt;> '营业工程总部')) OR [Position.Big Account Quote Position Flag] = 'Y')";
			//statement = " [Position.Active Last Name]='陆' AND [Position.Active First Name] = '佳慧' AND [Position.Active Login Name] = '6405' AND [Position.Name] = 'HEL_汕头司_报价员' AND [Position.Division] = '汕头分公司' AND [Position.Position Type] = '销售代表' AND [Position.Organization] = '汕头分公司' AND ([Position.Position Type] = '销售代表' AND ([Position.Org Name] = GetProfileAttr('Org.Name') OR ([Position.Org Name] = GetProfileAttr('Org.Parent Organization Name') AND [Position.Org Name]  <>'营业工程总部, 内部')) OR [Position.Big Account Quote Position Flag] = 'Y')";
			//statement = "[Position.Active Last Name]='张' AND [Position.Active First Name] = '振宇' AND [Position.Active Login Name] = '2155' AND AND [Position.Position Type] = '销售代表'";
			console.log(statement);	
			var param = {
					SearchSpec:statement,
					ViewMode:ViewMode
			};
			var params = {
					adpName:'HttpAdapter_PAD_Custom',
					prodName:'salesRepQuery',
					parameters: param
			};
			
			var getResult = function(result){
				if(!result.QuerySalesRep_Output){
					Ext.Msg.alert('提示信息','服务器繁忙，请稍后重试！');
					return ;
				}
				var data = result.QuerySalesRep_Output.ListOfPositionInterface.Position;
				var store = Ext.data.StoreManager.get('HQSalesRepStore');
				if(!store)
					store = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.HQSalesRepStore');
				
				
				if(result.QuerySalesRep_Output.NumOutputObjects=='0'){
					Ext.Msg.alert('提示信息','无查询结果，请重新输入查询条件');
					return ;
				}else if(result.QuerySalesRep_Output.NumOutputObjects=='1')
					store.setData([data]);
				else
					store.setData(data);
				var dataAll = store.getData().all;
				if(obj.storeData){
					for(var i=0;i<dataAll.length;i++){
						for(var j=0;j<obj.storeData.length;j++){
							if(dataAll[i].data.Id==obj.storeData[j].Id)
								store.remove(store.getAt(i));
						}
					}
				}
				
				if(obj.source){
					obj.NextView('selectItemView','HelcAgent.view.OpportunityManagement.Project_New.SelectItemView');
					return ;
				}
				
			};
			
			this.connectServer_queryOpportunity(getResult,params);
		}
		
	},
	//列表单击
	HQSalesRepList:function( list, index, target, record, e, eOpts ){
		
		if(!this.source){
			
			if(event.target.id!='groupkung_HQSalesRepanalysislist'){
				var HQSalesRep = Ext.getCmp('HQSalesRepList').getSelection()[0];//record.data;
				
				if(Ext.getCmp('division').getHidden()==true){
						var HQSalesRepFullName = Ext.getCmp('HQSalesRepFullName');
						var HQSalesRepId =Ext.getCmp('HQSalesRepId');
						HQSalesRepFullName.setValue(HQSalesRep.ActiveLastName+' '+HQSalesRep.ActiveFirstName);
						HQSalesRepId.setValue(HQSalesRep.Id);
						HQSalesRepFullName.setReadOnly(true);
						HQSalesRepId.setReadOnly(true);
				}else{
					var salesRep = Ext.getCmp('salesRep');
					var salesRepId = Ext.getCmp('salesRepId');
					salesRep.setValue(HQSalesRep.ActiveLastName+' '+HQSalesRep.ActiveFirstName);
					salesRepId.setValue(HQSalesRep.Id);
					salesRep.setReadOnly(true);
					salesRepId.setReadOnly(true);
				}
				this.BackView();
			}
		
		}else{
			
			var sele=document.getElementsByName('groupkung_HQSalesRepanalysislist');
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
	toSalesRepInit:function(){
		Ext.getCmp('positionName').setHidden(true);
		Ext.getCmp('division').setHidden(true);
		Ext.getCmp('positionType').setHidden(true);
		Ext.getCmp('salesRepLoginName').setHidden(true);
	},
	//构建语句
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