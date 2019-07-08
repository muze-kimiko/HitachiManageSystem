
/* JavaScript content from app/controller/OpportunityManagement/Project_New/ProjectSearchCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.ProjectSearchCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config : {
		control:{
			'button#projectSearchBack':{
				tap:'projectSearchBack'
			},
			//搜索
			'button#projectsearch_new_id_CX':{
				tap:'projectsearch_new_id_CX'
			}
		}
	},
	
	//返回
	projectSearchBack:function(){
		this.BackView();
	},
	//分页查询前的逻辑处理
	projectSearchQueryLogic:function(param){
		if(obj.getApplication().getController('OpportunityManagement.Project_New.ProjectSearchCtrl').scrollerFlag){
			return;
		};
		var y = param.y;
		if(param.scroller.getContainerSize().y+y>param.scroller.getSize().y+100){
			obj.getApplication().getController('OpportunityManagement.Project_New.ProjectSearchCtrl').scrollerFlag=true;
			this.proejctSearchQueryByPage(param);
		}
	},
	
	//我的商机中的分页查询
	proejctSearchQueryByPage:function(sendParam){
		var obj = this;
		var store = this.getStore('OpptyStore','HelcPAD.store.OpportunityManagement.EntryOpportunities.OpptyStore');
		//查询数量
		var strnum=store.getCount()+10;
		var condition = document.getElementById('searchCondition').value.trim();
		var status = document.getElementById('searchOpptyStatus').value.trim();
		statement = (condition?"[Opportunity.Name] like '*"+condition+"*'  or [Opportunity.Account] like '*"+condition+"*'  or  [Opportunity.Oppty Final User] like '*"+condition+"*' ":"")+(status?" AND [Opportunity.Oppty Status] = '"+status+"' ":"");
		statement = statement?"("+statement+")":'';
		statement +=statement?" AND ":"";
		statement +="[Opportunity.Oppty Type] = '设备商机'  AND  EXISTS([Opportunity.Sales Login Name] = '"+userID+"' )";
		var param = {
				NewQuery:true,
				userID:userID,
				SearchSpec:statement,
				ViewMode:'Sales Rep',
				SortSpec:'Updated(DESCENDING)',
				StartRowNum:strnum,//sendParam.page*10,
				PageSize:'10',
		};
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'clueHandleDirector_GLSJ',
				parameters: param
		};
		var getResult = function(result){
			console.log(result);
			obj.getApplication().getController('OpportunityManagement.Project_New.ProjectSearchCtrl').scrollerFlag=false;
			var aaa = result.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity.Opportunity;
			console.log(aaa);
			if(result.Fault){
				Ext.Msg.alert('提示',result.Fault.faultstring);
				return ;
			}else if(!result.QueryOpptyPage_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}else if(result.QueryOpptyPage_Output.ErrorMsg){
				Ext.Msg.alert('提示',result.QueryOpptyPage_Output.ErrorMsg);
				return ;
			}else if(result.QueryOpptyPage_Output.LastPage==true||result.QueryOpptyPage_Output.NumOutputObjects=='0'){
				var r = result.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity.Opportunity;
				if(r){
					if(!r.length)
						r = [r];
					store.addData(r);
				}
				document.getElementById('projectSearchPagPlugin').innerText = '没有更多数据了，请重新输入查询条件查询';
				obj.LastPage = true;
				Ext.Msg.alert('提示','没有更多商机数据了');
				return ;
			}else{
				if(sendParam.scroller.sizeY&&sendParam.scroller.differenY)
					sendParam.scroller.sizeY=sendParam.scroller.differenY;
				this.page++;
				var r = result.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity.Opportunity;
				if(!r.length)
					r = [r];
				store.addData(r);
			}
			
		};
		
		this.connectServer_queryOpportunity(getResult,params);
	},
	
	
	//搜索商机
	projectsearch_new_id_CX:function(){
		var obj = this;
		obj.getApplication().getController('OpportunityManagement.Project_New.ProjectSearchCtrl').scrollerFlagscrollerFlag=true;
		var condition = document.getElementById('searchCondition').value.trim();//Ext.getCmp('condition').getValue().trim();
		var status = document.getElementById('searchOpptyStatus').value.trim();
		/*if(!condition&&!status){
			Ext.Msg.alert('提示','请输入必要的查询条件');
			return ;
		};
		condition = !condition?'':condition;
		status = !status?'':status;*/
		
		var suit = [];
		var total = 0;
		var listStore = this.getStore('OpptyStore','HelcPAD.store.OpportunityManagement.EntryOpportunities.OpptyStore'); 
		var storeData = this.tempOppty;
		cc.log('storeData:'+storeData);
		
		var zw=$("#projectSearchZW option:selected").val();
		var xz=obj.getApplication().getController('OpportunityManagement.Project_New.ProjectSearchCtrl').zwXZ;
		cc.log('选择：'+xz);
		//判断是选择新职位还是选择旧职位
		if(xz==zw){
			if(storeData!=undefined){
				for(var i=0;i<storeData.length;i++){
					if((storeData[i].Name.indexOf(condition)!=-1||storeData[i].Account.indexOf(condition)!=-1||storeData[i].OpportunityNumber.indexOf(condition)!=-1)&&storeData[i].OpptyStatus==status){
						suit[total++] = storeData[i];
					};
				};
				cc.log('友好交涉');
				cc.log(suit);
			};
		};

		if(suit.length==0){
			Ext.Msg.show({
				   title: '温馨提示',
				   message: '列表中无搜索商机，是否从数据库再次查找？',
				   buttons: [{text:'否', itemId:'no'},{text:'是', itemId:'yes'}],
				   fn: function(buttonId) {
					   if(buttonId == 'yes'){
						   var length=positionData.length;
							if(length!=0){
								//var zw = document.getElementById('projectSearchZW').value.trim();
								/**
		 						* 根据职位查找
		 						*/
								cc.log('选中：'+zw);
								if(zw==''){//没有选择职位
									ss(obj);
								}else{//选择职位
									var xz=obj.getApplication().getController('OpportunityManagement.Project_New.ProjectSearchCtrl').zwXZ;
									cc.log('选择：'+xz);
									//判断是选择新职位还是选择旧职位
									if(xz==zw){
										ss(obj);
									}else{
										obj.getApplication().getController('OpportunityManagement.Project_New.ProjectSearchCtrl').zwXZ=zw;
										cc.log('进入用户职位查找');
										var param = {
												userID:userID,
												positionDataId:zw,
												PositionID:PositionID,
										};
										var params = {
												adpName:'HttpAdapter_PAD_Custom',
												prodName:'xgPosition',
												parameters:param,
												special:true
										};
										
										var getResult = function(result){
											try{
												var flag=result.ChangePosition_Output.isSuccessful;
											}catch(e){
												WL.Toast.show('修改职位出错');
											};
											cc.log('修改结果');
											console.log(result);
											ss(obj);
										};
										
										obj.connectServer_queryOpportunity(getResult,params);
									};
								};
								
								/**
								 * 根据职位查找  尾部
								 */
							}else{
								ss(obj);
							};
						   
							function ss(obj){
								cc.log('进入商机查询');
								var statement = "";
								if(condition!=''){
									statement+="([Opportunity.Name] like '*"+condition+"*'  or [Opportunity.Account] like '*"+condition+"*' or  [Opportunity.Oppty Final User] like '*"+condition+"*' ) AND ";
								};
								if(status!=''){
									statement+="([Opportunity.Oppty Status] = '"+status+"') and ";
								};
								statement+= "([Opportunity.Oppty Type] = '设备商机')  and  EXISTS([Opportunity.Sales Login Name] = '"+userID+"' )";
								
								//statement = "([Opportunity.Name] like '*"+condition+"*'  or [Opportunity.Account] like '*"+condition+"*'  or  [Opportunity.Oppty Final User] like '*"+condition+"*' "+(status?" AND [Opportunity.Oppty Status] = '"+status+"' ":"")+" )   and  [Opportunity.Oppty Type] = '设备商机'  and  EXISTS([Opportunity.Sales Login Name] = '"+userID+"' )";
								//statement+= "[Opportunity.Oppty Type] = '设备商机'"; 
								//statement+="([Opportunity.Oppty Status] = '"+status+"')";
								//statement+="EXISTS([Opportunity.Sales Login Name] = '"+userID+"' )";
								cc.log('我的商机查询条件：'+statement);
								var param = {
										SearchSpec:statement,
										userID:userID,
										ViewMode:'Organization'
								};
								
								var params = {
										adpName:'HttpAdapter_PAD_Custom',
										prodName:'queryOpportunityList',
										parameters: param
								};
								
								var getResult =function(result){
									if(!result.QueryOppty_Output){
										Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
										return ;
									}
									
									var r = result.QueryOppty_Output.ListOfHelEaiAppOpportunity.Opportunity;
									if(result.QueryOppty_Output.NumOutputObjects=='0'){
										Ext.Msg.alert('提示','无结果，请重新输入搜索条件');
										return ;
									}
									
									//obj.NextView('projectListContainer','HelcPAD.view.OpportunityManagement.Project_New.ProjectList');
									var opportunityStore=Ext.data.StoreManager.get('OpptyStore');
									if(!opportunityStore){
										opportunityStore=Ext.create('HelcPAD.store.OpportunityManagement.EntryOpportunities.OpptyStore');
									};
									if(r.length){
										opportunityStore.setData(r);
										obj.tempOppty = r;
									}else{
										opportunityStore.setData([r]);
										obj.tempOppty = [r];
									}
									obj.page = 1;
									
								};
								obj.connectServer_queryOpportunity(getResult,params);
							};
					  }
				   }
				});
		}else{
			this.tempOppty = suit;
			listStore.setData(suit);
		}
		
	},
	
	
	//用于操作后更新我的商机中内容的方法
	queryOpptyAfterOperation:function(parameters){
		var obj = this;
		statement = "[Opportunity.Oppty Type] = '设备商机'  and  EXISTS([Opportunity.Sales Login Name] = '"+userID+"' )";
		var param = {
				NewQuery:true,
				userID:userID,
				SearchSpec:statement,
				ViewMode:'Sales Rep',
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
			if(!result.QueryOpptyPage_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}
			/*var r = result.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity?result.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity.Opportunity:null;
			if(!r.length)
				r = [r];*/
			
			//var r = result.QueryOppty_Output.ListOfHelEaiAppOpportunity.Opportunity;
			var r = result.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity.Opportunity
			               
			if(result.QueryOpptyPage_Output.NumOutputObjects=='0'){
				Ext.Msg.alert('提示','无结果，请重新输入搜索条件');
				return ;
			}
			
			var opportunityStore = obj.getStore('OpptyStore','HelcPAD.store.OpportunityManagement.EntryOpportunities.OpptyStore');
		
			if(r.length){
				opportunityStore.setData(r);
			}else{
				opportunityStore.setData([r]);
			}
		};
		
		this.connectServer_queryOpportunity(getResult,params);
	}
	
	
});