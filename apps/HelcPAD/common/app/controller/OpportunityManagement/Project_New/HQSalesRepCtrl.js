Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.HQSalesRepCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		//该Controller包含了所有相关跟踪人员的操作（跟踪人员与总部跟踪人员）
		control:{
			/**针对营业员新建商机或者修改商机时所涉及操作 Start */
			//跟踪人员列表红勾的选则
			'list#NewHQSalesRepList':{
				itemtap:'NewHQSalesRepList'
			},
			/**针对营业员新建商机或者修改商机时所涉及操作 End */
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
				tap:'HQSalesRepPanelBack_FH_NEW'
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
			/*'tabpanel#HQSalesRepPanel':{
				activeitemchange:'HQSalesRepPanel'
			},*/
			
		}
	},
	
	//返回  如果没有选择跟踪人  那么还原人员列表
	HQSalesRepPanelBack_FH_NEW:function(){
		this.BackView();
		var store = this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
		var data=object.getController('OpportunityManagement.Project_New.HQSalesRepCtrl').SdataCXQ;
		store.setData(this.storeData);
	},
	
	/**针对营业员新建商机或者修改商机时所涉及操作 Start */
	NewHQSalesRepList:function(list, index, target, record, e, eOpts){
		var sele=document.getElementsByName('newgroupkung_HQSalesRepanalysislist');
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
	},
	//总部跟踪人员查询
	NewHQSalesRepQuery:function(){
		var obj = this;
		//2016-5-11 后期加入
		var statement='';
		
		var lastName = Ext.getCmp('salesRepLastName').getValue().trim();
		var firstName = Ext.getCmp('salesRepFirstName').getValue().trim();
		var loginName = Ext.getCmp('newSalesRepLoginName').getValue().trim();
		ViewMode = "All";
		if(lastName!='')
			statement = "[Position.Active Last Name] like '*"+lastName+"*' ";
		if(firstName!=''&&statement!='')
			statement += " AND [Position.Active First Name] like '*"+firstName+"*' ";
		else if(firstName!=''&&statement=='')
			statement += " [Position.Active First Name] like '*"+firstName+"*'";
		if(loginName!=''&&statement!='')
			statement += " AND [Position.Active Login Name] like '*"+loginName+"*' ";
		else if(loginName!=''&&statement=='')
			statement += " [Position.Active Login Name] like '*"+loginName+"*' ";
		
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
			console.log(result);
			if(!result.QuerySalesRep_Output){
				Ext.Msg.alert('提示信息','服务器繁忙，请稍后重试！');
				return ;
			}
			
			var HQSalesRepStore = obj.getStore('NewHQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.NewHQSalesRepStore');
			if(result.QuerySalesRep_Output.NumOutputObjects=='0'){
				Ext.Msg.alert('提示','未能搜索出结果，请重新输入总部跟踪人员信息！');
				return ;
			}else if(result.QuerySalesRep_Output.NumOutputObjects=='1')
				HQSalesRepStore.setData([result.QuerySalesRep_Output.ListOfPositionInterface.Position]);
			else
				HQSalesRepStore.setData(result.QuerySalesRep_Output.ListOfPositionInterface.Position);
			
		};
		
		this.connectServer_queryOpportunity(getResult,params);
	},
	//确认选择总部跟踪人员
	confirmNewHQSalesRep:function(){
		var items = Ext.getCmp('NewHQSalesRepList').getSelection();
		if(!items.length){
			Ext.Msg.alert('提示','请勾选一项后点击确认！');
			return;
		}
		var title=Ext.getCmp('newSalesRepToolbar').getTitle().getTitle();
		console.log(title);
		this.BackView();
		
		var HQSalesRep = items[0];
		if(title=='关注人'){
			var name=HQSalesRep.get('ActiveLastName')+' '+HQSalesRep.get('ActiveFirstName');
			console.log(name);
			Ext.getCmp('GZRname').setValue(name);
			Ext.getCmp('GZRnameId').setValue(HQSalesRep.get('Id'));
			//职位
			Ext.getCmp('GZRzw').setValue(HQSalesRep.get('ParentPositionName'));
			Ext.getCmp('GZRzwId').setValue(HQSalesRep.get('PositionId'));
		}else{
			var HQSalesRepFullName = Ext.getCmp('HQSalesRepFullName');
			var HQSalesRepId =Ext.getCmp('HQSalesRepId');
			HQSalesRepFullName.setValue(HQSalesRep.get('ActiveLastName')+' '+HQSalesRep.get('ActiveFirstName'));
			HQSalesRepId.setValue(HQSalesRep.get('Id'));
			HQSalesRepFullName.setReadOnly(true);
			HQSalesRepId.setReadOnly(true);
		};
	},
	/**针对营业员新建商机或者修改商机时所涉及操作 End */
	HQSalesRepPanel:function(obj,value,oldValue,eOpts){
		if(!this.source)
			return;
		var tp_chart=Ext.getCmp('HQSalesRepPanel');
		var itemid=tp_chart.getActiveItem().getId();
		cc.log(itemid);
		if(itemid=='HQSalesRepPanel_panel'){
			if(!this.storeData||this.storeData.length==0){
				this.storeData = null;
			}else{
				cc.log('12313');
				var store = this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
				store.setData(this.storeData);
			};
			
		};
	},
	
	
	//确定使用列表中的人员
	HQSalesRepPanelComplete:function(){
		var selectConfirm = document.getElementsByName('groupkung_HQSalesRepanalysislist');
		var store = this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
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
		
		store.getAt(checked).set('IsPrimaryMVG','Y');
		var r = [];
		var total = 0;
		for(var i=0;i<store.getData().all.length;i++){
			r[total++] = store.getData().all[i].data; 
		}
		this.storeData = r;
		//console.log(this.storeData);
		this.BackView();
		if(this.source){
			var saleRep = store.getAt(checked).data;
			Ext.getCmp('salesRep').setValue(saleRep.LastName+saleRep.FirstName);
			Ext.getCmp('salesRep').setData(this.storeData);
		}
	},
	//确认将列表中的人员加入待确认列表中
	selectItemViewConfirm:function(){
		var sele=document.getElementsByName('groupkung_selectItemList');
		
		var store = this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
		
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
		var repStore = this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore').getData().all;
		//记录人员列表 查询前的的数据   xcx 2016-10-12
		this.SdataCXQ=repStore;
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
				statement = "[Position.Active Last Name] like '*"+lastName+"*' ";
			if(firstName!=''&&statement!='')
				statement += " AND [Position.Active First Name] like '*"+firstName+"*' ";
			else if(firstName!=''&&statement=='')
				statement += " [Position.Active First Name] like '*"+firstName+"*'";
			if(loginName!=''&&statement!='')
				statement += " AND [Position.Active Login Name] like '*"+loginName+"*' ";
			else if(loginName!=''&&statement=='')
				statement += " [Position.Active Login Name] like '*"+loginName+"*' ";
			
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
				console.log(result);
				if(!result.QuerySalesRep_Output){
					Ext.Msg.alert('提示信息','服务器繁忙，请稍后重试！');
					return ;
				}
				
				var HQSalesRepStore = Ext.data.StoreManager.get('HQSalesRepStore');
				if(!HQSalesRepStore)
					HQSalesRepStore = Ext.create('HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
				
				if(result.QuerySalesRep_Output.NumOutputObjects=='0'){
					Ext.Msg.alert('提示','未能搜索出结果，请重新输入跟踪人员的查询条件！');
					return ;
				}else if(result.QuerySalesRep_Output.NumOutputObjects=='1')
					HQSalesRepStore.setData([result.QuerySalesRep_Output.ListOfPositionInterface.Position]);
				else
					HQSalesRepStore.setData(result.QuerySalesRep_Output.ListOfPositionInterface.Position);
				var dataAll = HQSalesRepStore.getData().all;
				cc.log(dataAll);
				if(obj.storeData&&obj.source){
					for(var i=0;i<obj.storeData.length;i++){
						for(var j=0;j<dataAll.length;j++){
							if(dataAll[j].data.Id==obj.storeData[i].Id){
								HQSalesRepStore.remove(HQSalesRepStore.getAt(i));
							}
							//store.remove(store.getAt(i));
						}
						//HQSalesRepStore.remove(Ext.create('HelcPAD.model.OpportunityManagement.Project_New.HQSalesRepModel',storeData[i]));
					}
				}
				
				if(obj.source){
					obj.NextView('selectItemView','HelcPAD.view.OpportunityManagement.Project_New.SelectItemView');
					
				}else
					Ext.getCmp('HQSalesRepPanel').setActiveItem(Ext.getCmp('HQSalesRepListContainer'));
			};
			
			this.connectServer_queryOpportunity(getResult,params);
		}else{
			//主管商机跟踪人查询进这里  xcx 2016-10-20
			
			//	 orgName division positionType
			statement = this.statementConstructor('[Position.Active Last Name] like \'*?*\' ',lastName,statement);
			statement = this.statementConstructor('[Position.Active First Name] like \'*?*\' ',firstName,statement);
			statement = this.statementConstructor('[Position.Active Login Name] like \'*?*\' ',loginName,statement);
			statement = this.statementConstructor('[Position.Name] like\'*?*\' ',positionName,statement);
			statement = this.statementConstructor('[Position.Division] like\'*?*\' ',division,statement);
			//statement = this.statementConstructor('[Position.Position Type] = \'?\' ',positionType,statement);
			statement = this.statementConstructor('[Position.Organization] like\'*?*\'',organization,statement);
			
			
			
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
				};
				cc.log('-----------shs-------------');
				cc.log(result);
				var HQSalesRepStore = Ext.data.StoreManager.get('HQSalesRepStore');
				if(!HQSalesRepStore)
					HQSalesRepStore = Ext.create('HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
				
				if(result.QuerySalesRep_Output.NumOutputObjects=='0'){
					Ext.Msg.alert('提示','未能搜索出结果，请重新输入跟踪人员的查询条件！');
					return ;
				}else if(result.QuerySalesRep_Output.NumOutputObjects=='1')
					HQSalesRepStore.setData([result.QuerySalesRep_Output.ListOfPositionInterface.Position]);
				else
					HQSalesRepStore.setData(result.QuerySalesRep_Output.ListOfPositionInterface.Position);
				var dataAll = HQSalesRepStore.getData().all;
				cc.log(dataAll);
				if(obj.storeData&&obj.source){
					for(var i=0;i<obj.storeData.length;i++){
						for(var j=0;j<dataAll.length;j++){
							///if(dataAll[j].data.Id==obj.storeData[i].Id){
								if(dataAll[j].data.PositionId==obj.storeData[i].PositionId){
								HQSalesRepStore.remove(HQSalesRepStore.getAt(j));
							}
							//store.remove(store.getAt(i));
						}
						//HQSalesRepStore.remove(Ext.create('HelcPAD.model.OpportunityManagement.Project_New.HQSalesRepModel',storeData[i]));
					}
				}
				
				if(obj.source){
					obj.NextView('selectItemView','HelcPAD.view.OpportunityManagement.Project_New.SelectItemView');
					
				}else
					Ext.getCmp('HQSalesRepPanel').setActiveItem(Ext.getCmp('HQSalesRepListContainer'));
			};
			
			this.connectServer_queryOpportunity(getResult,params);
		}
		
	},
	//列表单击
	HQSalesRepList:function( list, index, target, record, e, eOpts ){
		
		if(!this.source){
			
			if(event.target.id!='groupkung_HQSalesRepanalysislist'){
				
				var HQSalesRep = record.data;//record.data;
				
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
				this.storeData = null;
				this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore').removeAll();
				this.BackView();
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
		Ext.getCmp('salesRepOrganization').setHidden(true);
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