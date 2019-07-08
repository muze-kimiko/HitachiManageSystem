Ext.define('HelcPAD.controller.login.PADManagerMainCtrl',{
									 
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			"dataview#opportunityManager":{
				itemtap:'opportunityManager'
			},
		},
	},


	//主管商机界面的点击选项
	opportunityManager:function(list, index, target, record, e, eOpts){
			var obj = this;
			var text = record.data.text;
			if(text=='返回'){
				obj.BackView();
			}else if(text=='待处理商机'){
				var condition = "([Opportunity.Oppty Status] = '已提交' OR [Opportunity.Oppty Status] = '大项目部退回') AND [Opportunity.Oppty Type] = '设备商机'";
				
				var param = {
						userID:userID,
						SearchSpec:condition,
	    				ViewMode:'Manager',	
				};
				console.log(param);
				var params = {
	    				adpName:'HttpAdapter_PAD_Custom',
	     				prodName:'queryOpportunityList',
	     				parameters: param
	    		};
				var getResult = function(result){
					console.log(result);
					if(!result.QueryOppty_Output){
						Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
						return ;
					}
					if(result.QueryOppty_Output.NumOutputObjects=='0'){
						Ext.Msg.alert('提示','该用户无待处理商机！');
						return;
					}
					var data = result.QueryOppty_Output.ListOfHelEaiAppOpportunity.Opportunity;
					var store = obj.getStore('DirectorOpptyStore','HelcPAD.store.OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyStore');
					
					if(data.length){
						store.setData(data);
						object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').RYList = data;
						object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').dealWithOpptyNum = data.length;
					}	
					else{
						store.setData([data]);
						object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').RYList = [data];
						object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').dealWithOpptyNum = 1;
					};
					obj.NextView('projectdirectormain_new_id','HelcPAD.view.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMain');
					
					/*var list = Ext.getCmp('projectdirectormain_new_id__DSP_list');
					list.setStore(store);*/
				};
				
				obj.connectServer_queryOpportunity(getResult,params);
			}else if(text=='待流失商机'){

				var condition = "([Opportunity.Oppty Status] = '申请流失') AND [Opportunity.Oppty Type] = '设备商机'";
				
				var param = {
						userID:userID,
						SearchSpec:condition,
	    				ViewMode:'Manager',	
				};
				var params = {
	    				adpName:'HttpAdapter_PAD_Custom',
	     				prodName:'queryOpportunityList',
	     				parameters: param
	    		};
				console.log(params);
				var getResult = function(result){
					console.log(result);
					if(result.Fault||!result.QueryOppty_Output){
						Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
						return ;
					}
					if(result.QueryOppty_Output.NumOutputObjects=='0'){
						Ext.Msg.alert('提示','该用户无待流失商机！');
						return ;
					}
					var data = result.QueryOppty_Output.ListOfHelEaiAppOpportunity.Opportunity;
					var store = obj.getStore('DirectorOpptyStore','HelcPAD.store.OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyStore');
					
						
					if(data.length){
						store.setData(data);
						object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectWaitForLoseCtrl').waitForLoseOpptyNum = data.length;
					}	
					else{
						store.setData([data]);
						object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectWaitForLoseCtrl').waitForLoseOpptyNum = data.length;
					}	
					obj.NextView('projectWaitForLoseListContainer','HelcPAD.view.OpportunityManagement.Project_New.BeInChargeOf.ProjectWaitForLoseList');
					
					/*var list = Ext.getCmp('projectdirectormain_new_id__DSP_list');
					list.setStore(store);*/
				};
				
				obj.connectServer_queryOpportunity(getResult,params);
			
			}else if(text=='商机查看'){
				var store = this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
				var statement = " EXISTS([Position.Login Name] = '"+userID+"')";
				var viewMode = 'All';
				var lookCtrl = object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectLookForCtrl');
				lookCtrl.clickNum = 'null';
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
					if(result.NumOutputObjects=='0'){
						var nullData = {
								ActiveLastName:'无职位信息',
								CalOptyNumb:'x',
								ActiveFirstName:''
						};
						nullData = Ext.create('HelcPAD.model.OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyModel',nullData);
						store.setData([nullData]);
						return ;
					}
					var data = result.QuerySalesRep_Output.ListOfPositionInterface.Position;
					obj.NextView('projectLookForListContainer','HelcPAD.view.OpportunityManagement.Project_New.BeInChargeOf.ProjectLookForList');
					//Ext.getCmp('RYContainer').setDisabled(true);
					if(result.NumOutputObjects=='1'){
						store.setData([data]);
						lookCtrl.ZWList = [data];
					}else{
						store.setData(data);
						lookCtrl.ZWList = data;
					}
					
				};
				
				this.connectServer_queryOpportunity(getResult,params);
			
			}else if(text=='待处理线索'){
				obj.getApplication().getController('login.PADManagerMainCtrl').SSLY='待处理线索';
				obj.NextView('toDoClueDirector','HelcPAD.view.OpportunityManagement.Director.ToDoClueNew');
				obj.getApplication().getController('OpportunityManagement.Director.ToDoClueNewCtrl').ToDoClueNewDivFa(obj);
			}else if(text=='线索查询'){
				obj.getApplication().getController('login.PADManagerMainCtrl').SSLY='线索查询';
				obj.NextView('ClueNew_id','HelcPAD.view.OpportunityManagement.Director.ClueNew');
				obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').ClueNew_onClack(obj,true);
				//为线索状态填值
				var XSZT=obj.extractionData('HEL_LEAD_STATUS');
				var sel = document.getElementById("ClueNew_id_select");
				for(var i=0;i<XSZT.length;i++){
					var option = new Option(XSZT[i].LIS_VAL, XSZT[i].LIS_VAL); 
					//默认选中
					if(XSZT[i].LIS_VAL=='处理中'){
						sel.options[i].selected=true;   
					};
				    sel.options.add(option);  
				};
				//修改重复进来默认值
				var DataClue=Ext.data.StoreManager.get('ClueDirectorXSCXStore');
				if(!DataClue){
					DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueDirectorXSCXStore');
				};
				var num=DataClue.getCount();
				if(num>0){
					var zt=DataClue.getAt(index).get('LeadStatus');
					document.getElementById("ClueNew_id_select").value=zt;
				};
			}
			/*else if(text=='经销商业绩'){
				//obj.NextView('toDoPerformanceAgentSearch','HelcPAD.view.OpportunityManagement.Director.ToDoPerformanceAgentSearch');
				obj.NextView('ToDoPerformanceNew_id','HelcPAD.view.OpportunityManagement.Director.ToDoPerformanceNew');
				obj.getApplication().getController('OpportunityManagement.Director.ToDoPerformanceNewCtrl').ToDoPerformanceNew_Public(obj.getApplication().getController('OpportunityManagement.Director.ToDoPerformanceNewCtrl'));
			}*/
			else if(text=='商机查询'){
				obj.statementZG = "[Opportunity.Oppty Type] = '设备商机' ";
				cc.log('主管商机查询条件：'+obj.statementZG);
				var param = {
						NewQuery:true,
	    				userID:userID,
	    				SearchSpec:obj.statementZG,
	    				ViewMode:'Manager',
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
				var getResult = function(result){
					obj.NextView('ProjectQueryDirectorListContainer','HelcPAD.view.OpportunityManagement.Project_New.BeInChargeOf.ProjectQueryDirectorList');
					//状态
					var searchOpptyStatus = document.getElementById('queryDirectOpptyStatus');
					var options ='<option value="">请选择商机状态</option>'+ 
					'<option value="新建">新建</option>'+
					'<option value="已提交">已提交</option>'+
					'<option value="跟进">跟进</option>'+
					'<option value="报价">报价</option>'+
					'<option value="流失">流失</option>'+
					'<option value="提交大项目部">提交大项目部</option>'+
					'<option value="大项目部报价">大项目部报价</option>'+
					'<option value="大项目部跟进">大项目部跟进</option>'+
					'<option value="大项目部退回">大项目部退回</option>'+
					'<option value="拒绝">拒绝</option>'+
					'<option value="申请流失">申请流失</option>';
					searchOpptyStatus.innerHTML = options ;
					//职位
					cc.log('职位数量');
					var length=positionData.length;
					if(length!=0){
						var searchOpptyStatus = document.getElementById('queryDirectOpptyZW');
						var options ='<option  value="" selected="selected">请选择职位</option>';
						for(var i=0;i<length;i++){
							options+='<option value="'+positionData[i].Id+'">'+positionData[i].Name+'</option>';
						};
						searchOpptyStatus.innerHTML = options ;
						Ext.getCmp('ProjectQueryDirectorListContainer_toolbar').setHeight(200);
						
						//修改列表的长度
						var gd=MapHeight-45-200;
						//cc.log('gd:'+gd);
						Ext.getCmp('projectQueryDirectorListOuter').setHeight(gd);
					}else{
						//修改列表的长度
						var gd=MapHeight-45-165;
						//cc.log('gd:'+gd);
						Ext.getCmp('projectQueryDirectorListOuter').setHeight(gd);
					};
					
					if(result.Fault){
						Ext.Msg.alert('提示',result.Fault.faultstring);
					}else if(!result.QueryOpptyPage_Output){
						Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
					}else if(result.QueryOpptyPage_Output.ErrorMsg){
						Ext.Msg.alert('提示',result.QueryOpptyPage_Output.ErrorMsg);
					}else if(result.QueryOpptyPage_Output.NumOutputObjects=='0'){
						Ext.Msg.alert('提示','无商机信息，请确认后进入！');
					}
					var r = null;
					r = result.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity?result.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity.Opportunity:"";
					if(!r){
						Ext.Msg.alert('提示','查询出错，请稍后重试！');
					}
					var store = obj.getStore('DirectorOpptyStore','HelcPAD.store.OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyStore');
					if(!r.length)
						r = [r];
					store.setData(r);
					var list = Ext.getCmp('projectQueryDirectorListOuter');
					var ctrl = object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectQueryDirectorListCtrl');
					var scroller = list.getScrollable().getScroller();
					Ext.Msg.alert('提示','数据已部分加载，更多数据请上拉查看');
					//Ext.getCmp('projectQueryDirectorListPagPlugin').setHidden(false);
					scroller.setListeners({
						scroll:function(scrollerSelf,x,y,eOpts){
							var param = {
									scroller:scrollerSelf,
									x:x,
									y:y,
							};
							ctrl.ProjectQueryDirectorPageLogic(param);
						}
					});
					
				};
				obj.connectServer_queryOpportunity(getResult,params);
			};

		}
});