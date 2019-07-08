
/* JavaScript content from app/controller/OpportunityManagement/Project_New/BeInChargeOf/ProjectLookForCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectLookForCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//商机查看中子模块变换
			/*'tabpanel#lookForOpptyPanel':{
				 activeitemchange:'lookForOpptyPanel'
			 },*/
			 //界面回退
			 'button#projectLookForListBack':{
				 tap:'projectLookForListBack'
			 },
			 //跟踪人员跟踪商机数列表
			 'list#projectdirectormain_new_id__SJCK_list':{
				 itemtap:'followOppty'
			 },
			 //职位列表点击
			 'list#projectdirectormain_new_id__ZW_list':{
				 itemtap:'positionListTap'
			 },
			 //搜索框的搜索
			 /*'searchfield#lookOpptyDirector':{
				 keyup:'lookOpptyDirector'
			 },*/
			 
		}
	},
	//对人员信息进行过滤
	/*lookOpptyDirector:function(searchfield,e,eOpts){
		var searchValue = searchfield.getValue();
		var obj = this;
		var store = this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
		if(store.getData().all.length){
			if(store.getData().all[0].data.ActiveLastName=='该职位下无人员信息')
				return ;
		}
		if(!searchValue){
			store.setData(obj.RYList);
			return;
		}
		var suitItem = [];
		for(var i=0;i<obj.RYList.length;i++){
			if(obj.RYList[i].ActiveLastName==searchValue||obj.RYList[i].ActiveFirstName==searchValue)
				suitItem.push(obj.RYList[i]);
		}
		store.setData(suitItem);
	},*/
	//职位列表点击
	positionListTap:function(list,index,target,record,e,eOpts){
		var obj = this;
		if(obj.clickNum == 1){
			obj.followOppty(list,index,target,record,e,eOpts);
			return ;
		}
			
		var data = record.data;
		//var item = Ext.getCmp('RYContainer');
		//item.setDisabled(false);
		//var parentPanel = Ext.getCmp('lookForOpptyPanel');
		var store = this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
		
		var positionId = data.PositionId;
		if(positionId==''){
			data.ActiveFirstName = '该职位下无人员信息';
			data.ActiveLastName = '';
			data.CalOptyNumb = 'x';
			store.setData([data]);
			//parentPanel.setActiveItem(item);
			return;
		}
		var statement = " [Position.Parent Position Id] = '"+positionId+"'";
		console.log(statement);
		var param = {
				userID:userID,
				SearchSpec:statement,
				ViewMode:'All',
		};
		console.log(param);
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
 				prodName:'salesRepQuery',
 				parameters: param
		};
		var getResult = function(result){
			console.log(result);
			if(!result.QuerySalesRep_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return;
			}else if(result.NumOutputObject=='0'){

				var nullData = {
						ActiveFirstName :'该职位下无人员信息',
						ActiveLastName : '',
						CalOptyNumb : 'x'
				};
				store.setData([nullData]);
			
			}
			var resultData = result.QuerySalesRep_Output.ListOfPositionInterface.Position;
			if(result.NumOutputObject=='1'){
				store.setData([resultData]);
				obj.RYList = [resultData];
			}else{
				store.setData(resultData);
				obj.RYList = resultData;
			}
			var tpl = '<div>{Name}_{ActiveLastName}{ActiveFirstName}&nbsp;&nbsp;&nbsp;<tpl if="CalOptyNumb==\'x\'"></tpl><tpl if="CalOptyNumb==\'\'">(0)</tpl><tpl if="CalOptyNumb!=\'\'&&CalOptyNumb!=\'x\'">({CalOptyNumb})</tpl></div>';
			list.setItemTpl(tpl);
			if(obj.clickNum == 'null'){
				obj.clickNum  = 1;
				document.getElementById('opptyLookForListBack').innerText='上一级';
				var position = record.get('Name');
				Ext.getCmp('projectLookForListContainerToolbar').setTitle(position);
			}	
			//parentPanel.setActiveItem(item);
		};
		this.connectServer_queryOpportunity(getResult,params);
		
	},
	//查询跟踪人员跟踪商机数列表
	followOppty:function(list,index,target,record,e,eOpts){
		var loginName = record.get('LoginName');
		var statement = " EXISTS([Opportunity.Sales Login Name] = '"+loginName+"' ) AND [Opportunity.Oppty Type] = '设备商机'";
		var viewMode = 'All';
		var param = {
				NewQuery:true,
				userID:userID,
				SearchSpec:statement,
				ViewMode:viewMode,
				SortSpec:'Updated(DESCENDING)',
				StartRowNum:0,
				PageSize:'10',
		};
		console.log(param);
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
 				prodName:'clueHandleDirector_GLSJ',
 				parameters: param
		};
		var store = this.getStore('DirectorOpptyStore','HelcPAD.store.OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyStore');
		var getResult = function(result){
			console.log(result);
			if(result.Fault){
				Ext.Msg.alert('提示',result.Fault.faultstring);
				return ;
			}else if(!result.QueryOpptyPage_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}else if(result.QueryOpptyPage_Output.ErrorMsg){
				Ext.Msg.alert('提示',result.QueryOpptyPage_Output.ErrorMsg);
				return ;
			}else if(result.QueryOpptyPage_Output.NumOutputObjects=='0'){
				Ext.Msg.alert('提示','该下属无商机信息！');
				return ;
			}else if(result.QueryOpptyPage_Output.NumOutputObjects=='1')
				store.setData([result.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity.Opportunity]);
			else
				store.setData(result.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity.Opportunity);
			obj.NextView('ProjectDirectorLookForListContainer','HelcPAD.view.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorLookForPage');
			var list = Ext.getCmp('projectDirectorLookForListOuter');
			console.log(Ext.getCmp('projectDirectorLookForListPagPlugin'));
			var pagingCmpId = Ext.getCmp('projectDirectorLookForListPagPlugin')._loadMoreCmp._itemId;
			$('#'+pagingCmpId).css('display','block !important');
			Ext.getCmp('projectDirectorLookForListPagPlugin').setHidden(false);
			Ext.Msg.alert('提示','数据已部分加载，更多数据请上拉查看');
			var ctrl = object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorResultCtrl');
			var scroller = list.getScrollable().getScroller();
			scroller.setListeners({
				scroll:function(scrollerSelf,x,y,eOpts){
					var param = {
							scroller:scrollerSelf,
							x:x,
							y:y,
							userId:loginName
					};
					ctrl.projectLookForPageLogic(param);
				}
			});
		};
		
		this.connectServer_queryOpportunity(getResult,params);
		
	},
	//界面回退
	projectLookForListBack:function(){
		var store = this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
		if(this.clickNum == 1){
			if(this.ZWList){
				store.setData(this.ZWList.length?this.ZWList:[this.ZWList]);
			}else{
				store.setData([Ext.create('HelcPAD.model.OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyModel',{
					ActiveLastName:'无职位信息',
					CalOptyNumb:'x',
					ActiveFirstName:''
				})]);
			}
			Ext.getCmp('projectdirectormain_new_id__ZW_list').setItemTpl('<div>{Name}_{LastName}{FirstName}</div>');
			this.clickNum = 'null';
			document.getElementById('opptyLookForListBack').innerText=SYB;
			Ext.getCmp('projectLookForListContainerToolbar').setTitle('商机查看');
		}else if(this.clickNum =='null'){
			this.BackView();
			this.clickNum = null;
		}	
	},
	//商机查看中子模块变换
	/*lookForOpptyPanel:function( tabpanel, value, oldValue, eOpts ){
		var text = event.target.innerText;
		if(!text)
			return ;
		if(text.indexOf('职位列表')!=-1){
			Ext.getCmp('RYContainer').setDisabled(true);
			if(this.ZWList){
				this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore').setData(this.ZWList);
			}else{
				this.forPositionInfo();
			}
		}
		
	},*/
	//查询职位信息
	forPositionInfo:function(){
		var store = this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
		var statement = " EXISTS([Position.Login Name] = '"+userID+"')";
		var viewMode = 'All';
		var param = {
				userID:userID,
				SearchSpec:statement,
				ViewMode:viewMode
		};
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
 				prodName:'salesRepQuery',
 				parameters: param
		};
		
		var getResult = function(result){
			console.log(result);
			if(!result.QuerySalesRep_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return;
			}
			var data = result.QuerySalesRep_Output.ListOfPositionInterface.Position;
			obj.NextView('projectLookForListContainer','HelcPAD.view.OpportunityManagement.Project_New.BeInChargeOf.ProjectLookForList');
			//Ext.getCmp('RYContainer').setDisabled(true);
			if(result.NumOutputObjects=='1'){
				store.setData([data]);
				object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectLookForCtrl').ZWList = [data];
			}else if(result.NumOutputObjects=='0'){
				var nullData = {
						ActiveLastName:'无职位信息',
						CalOptyNumb:'x',
						ActiveFirstName:''
				};
				nullData = Ext.create('HelcPAD.model.OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyModel',nullData);
				store.setData([nullData]);
			}else{
				store.setData(data);
				object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectLookForCtrl').ZWList = data;
			}
			
		};
		
		this.connectServer_queryOpportunity(getResult,params);
	}
});