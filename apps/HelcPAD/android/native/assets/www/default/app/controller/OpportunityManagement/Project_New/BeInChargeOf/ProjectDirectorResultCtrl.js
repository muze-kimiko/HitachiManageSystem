
/* JavaScript content from app/controller/OpportunityManagement/Project_New/BeInChargeOf/ProjectDirectorResultCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorResultCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			 //查找结果   返回
			 'button#projectdirectorresult_new_id_FH':{
			 	tap:'projectdirectorresult_new_id_FH',
			 },
			 	 
			 //查找结果    list（该处未使用）
			 'list#projectdirectorresult_new_id_list':{
				 itemtap:'projectdirectorresult_new_id_list'
			 },
			 
			 //源商机   进入
			 'list#projectdirectorresult_new_id_JR':{
				 itemtap:'projectdirectorresult_new_id_JR'
			 },
			 //相似查找结果进入
			 'list#similarOpptyQueryList':{
				 itemtap:'projectdirectorresult_new_id_list'
			 }
		},	
	},
	//商机查看模块中的分页
	projectLookForPageLogic:function(param){
		if(this.LastPage)
			return ;
		var scroller = param.scroller;
		var y = param.y;
		if(param.scroller.getContainerSize().y+y>param.scroller.getSize().y+100){
			if(scroller.sizeY){
				param.scroller.differenY = param.scroller.sizeY;
				param.scroller.sizeY = param.scroller.getContainerSize().y+y;
				if(isNaN(parseInt(param.page))){
					param.page = 1;
					this.page = 1;
					this.proejctLookForByPage(param);
				}else{
					//ctrl.pageNum+=10;
					param.page = this.page;
					this.proejctLookForByPage(param);
				}
			}else{
				param.scroller.sizeY = param.scroller.getContainerSize().y+y;
				if(isNaN(parseInt(param.page))){
					param.page = 1;
					this.page = 1;
					this.proejctLookForByPage(param);
				}else{
					param.page = this.page;
					this.proejctLookForByPage(param);
				}
			}
		}
	},
	//商机查看分页
	proejctLookForByPage:function(sendParam){
		var obj = this;
		var statement = " EXISTS([Opportunity.Sales Login Name] = '"+sendParam.userId+"' ) AND [Opportunity.Oppty Type] = '设备商机'";
		var viewMode = 'All';
		var param = {
				NewQuery:true,
				userID:userID,
				SearchSpec:statement,
				ViewMode:viewMode,
				SortSpec:'Updated(DESCENDING)',
				StartRowNum:sendParam.page*10,
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
			}else if(result.QueryOpptyPage_Output.LastPage=='true'||result.QueryOpptyPage_Output.NumOutputObjects=='0'){
				var r = result.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity.Opportunity;
				if(r){
					if(!r.length)
						r = [r];
					store.addData(r);
				}
				document.getElementById('projectDirectorResultPagPlugin').innerText='没有更多数据了';
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
	//源商机   进入
	projectdirectorresult_new_id_JR:function(list, index, target, record, e, eOpts){
		//#####该处修改源商机的获取方式，修改源商机的显示形式
		var obj = this;
		
		var opportunity = record.raw;//button.getData();
		console.log(opportunity);
		var param = {
				userID:userID,
				id:opportunity.Id
		};
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
 				prodName:'queryOpportunity',
 				parameters: param
		};
		var getResult = function(result){
			console.log(result);
			if(!result.OpptyDetailQuery_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}
			var oppty = result.OpptyDetailQuery_Output.ListOfHelEaiAppOpportunityDetail.Opportunity;
			obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').toOpptyDatil(oppty);
			var containerToolbar = Ext.getCmp('opptyContainerToolbar');
			var toolbarContentOther = '';
			toolbarContentOther = '<div style="width=100%">'+
					       	  '<div class="anOneDiv">'+
								'<div class="ysZhOne anOne" style="width:96%;" onclick="object.getController(\'OpportunityManagement.Project_New.ProjectInfoCtrl\').projectinfo_new_id_FH();">'+SYB+'</div>'+
							  '</div>'+
						 '</div>';
			containerToolbar.setHtml(toolbarContentOther);
			containerToolbar.setHeight('6%');
		};
		
		this.connectServer_queryOpportunity(getResult,params);
		
	},
	//查找结果    list
	projectdirectorresult_new_id_list:function(dataview, index, target, record, e, eOpts){
		var opportunity = record.data;
		object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorSearchCtrl').sourceOpportunity = record;
		var oppty = null;
		var param = {
				userID:userID,
				id:opportunity.Id
		};
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
 				prodName:'queryOpportunity',
 				parameters: param
		};
		var getResult = function(result){
			console.log(result);
			if(!result.OpptyDetailQuery_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return;
			}
			oppty = result.OpptyDetailQuery_Output.ListOfHelEaiAppOpportunityDetail.Opportunity;
			obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').toOpptyDatil(oppty);
			var containerToolbar = Ext.getCmp('opptyContainerToolbar');
			var toolbarContentOther = '';
			toolbarContentOther = '<div style="width=100%">'+
					       	  '<div class="anOneDiv">'+
								'<div class="ysZhOne anOne" style="width:96%;" onclick="object.getController(\'OpportunityManagement.Project_New.ProjectInfoCtrl\').projectinfo_new_id_FH();">'+SYB+'</div>'+
							  '</div>'+
						 '</div>';
			containerToolbar.setHtml(toolbarContentOther);
			containerToolbar.setHeight('6%');
		};
		this.connectServer_queryOpportunity(getResult,params);
		//this.NextView('projectinfo_new_id','HelcPAD.view.OpportunityManagement.Project_New.ProjectInfo');
		
		
	},
	
	//查找结果   返回
	projectdirectorresult_new_id_FH:function(){
		this.BackView();
	},

	
});	



