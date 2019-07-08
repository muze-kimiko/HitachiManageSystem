
/* JavaScript content from app/controller/OpportunityManagement/Project_New/BeInChargeOf/ProjectQueryDirectorListCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectQueryDirectorListCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//商机查询部分列表点击
			'list#projectQueryDirectorListOuter':{
				itemtap:'projectQueryDirectorListOuter'
			}
		}
	},
	
	//商机查询界面的list分页查询逻辑处理
	ProjectQueryDirectorPageLogic:function(param){
		cc.log('第一季“对面的BUG看过来”');
		if(this.LastPage)
			return ;
		var scroller = param.scroller;
		var y = param.y;
		//判断是否滑动到页面底部,空白的位置比较
		if(param.scroller.getContainerSize().y+y>param.scroller.getSize().y+100){
			//通过判断sizeY是否第一次滑到底部，sizeY自己定义的
			if(scroller.sizeY){
				param.scroller.differenY = param.scroller.sizeY;
				param.scroller.sizeY = param.scroller.getContainerSize().y+y;
				if(isNaN(parseInt(this.page))){
					param.page = 1;
					this.page = 1;
					this.ProjectQueryDirectorByPage(param);
				}else{
					//ctrl.pageNum+=10;
					param.page = this.page;
					this.ProjectQueryDirectorByPage(param);
				}
			}else{
				param.scroller.sizeY = param.scroller.getContainerSize().y+y;
				if(isNaN(parseInt(this.page))){
					param.page = 1;
					this.page = 1;
					this.ProjectQueryDirectorByPage(param);
				}else{
					param.page = this.page;
					this.ProjectQueryDirectorByPage(param);
				}
			}
		}
	},
	
	//商机查询分页
	ProjectQueryDirectorByPage:function(sendParam){
		cc.log('第二季“看过来”');
		var obj = this;
		var store = this.getStore('DirectorOpptyStore','HelcPAD.store.OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyStore');
		/*var queryDirectCondition = document.getElementById('queryDirectCondition').value.trim();
		var queryDirectOpptyStatus = document.getElementById('queryDirectOpptyStatus').value.trim();
		var queryDirectStartTime = document.getElementById('queryDirectStartTime').value;
		var queryDirectEndTime = document.getElementById('queryDirectEndTime').value;
		queryDirectCondition = queryDirectCondition?'*'+queryDirectCondition+'*':'';
		if(queryDirectStartTime){
			queryDirectStartTime = queryDirectStartTime.split('-');
			for(var i=0;i<queryDirectStartTime.length;i++)
				queryDirectStartTime[i] = queryDirectStartTime[i].trim();
			queryDirectStartTime = queryDirectStartTime[1]+'/'+queryDirectStartTime[2]+'/'+queryDirectStartTime[0];
		}
		if(queryDirectEndTime){
			queryDirectEndTime = queryDirectEndTime.split('-');
			for(var i=0;i<queryDirectEndTime.length;i++)
				queryDirectEndTime[i] = queryDirectEndTime[i].trim();
			queryDirectEndTime = queryDirectEndTime[1]+'/'+queryDirectEndTime[2]+'/'+queryDirectEndTime[0];
		}
		
		var timeCondition = null;
		timeCondition = queryDirectStartTime?" [Opportunity.Updated] &gt; '"+queryDirectStartTime+"' ":null;
		timeCondition?timeCondition+=" AND ":timeCondition=null;
		queryDirectEndTime?timeCondition +=" [Opportunity.Updated] &lt; '"+queryDirectEndTime+"' ":timeCondition=null;
		
		var condition = (queryDirectCondition?"[Opportunity.Name] like '"+queryDirectCondition+"'  or [Opportunity.Account] like '"+queryDirectCondition+"'  or  [Opportunity.Oppty Final User] like '"+queryDirectCondition+"'":"");
		condition +=(queryDirectOpptyStatus?(queryDirectCondition?" AND ":"")+" [Opportunity.Oppty Status] = '"+queryDirectOpptyStatus+"' ":"");
		if(timeCondition)
			condition +=condition?" AND "+timeCondition:timeCondition;
		condition =condition?"("+condition+")":null;
		condition+=condition?' AND ':'';
		condition+=" [Opportunity.Oppty Type] = '设备商机' AND  EXISTS([Opportunity.Sales Login Name] = '"+userID+"' )";*/
		var condition=obj.getApplication().getController('login.PADManagerMainCtrl').statementZG;
		cc.log('下拉刷新查询条件：'+condition);
		var viewMode = 'Manager';
		var param = {
				NewQuery:true,
				userID:userID,
				SearchSpec:condition,
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
				document.getElementById('projectQueryDirectorPagPlugin').innerText = '没有更多数据了，请重新输入查询条件查询';
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
	
	//界面的返回方法
	opptyQueryBackMethod:function(){
		this.BackView();
	},
	
	//点击查询按钮所执行方法
	opptyQueryMethod:function(){
		var obj = this;
		var store = this.getStore('DirectorOpptyStore','HelcPAD.store.OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyStore');
		//请输入商机名称、客户、使用单位
		var queryDirectCondition = document.getElementById('queryDirectCondition').value.trim();
		//商机状态
		var queryDirectOpptyStatus = document.getElementById('queryDirectOpptyStatus').value.trim();
		var queryDirectStartTime = document.getElementById('queryDirectStartTime').value;
		var queryDirectEndTime = document.getElementById('queryDirectEndTime').value;
		//所选职位
		var zw=$("#queryDirectOpptyZW option:selected").val();
		queryDirectCondition = queryDirectCondition?'*'+queryDirectCondition+'*':'';
		if(queryDirectStartTime){
			queryDirectStartTime = queryDirectStartTime.split('-');
			for(var i=0;i<queryDirectStartTime.length;i++)
				queryDirectStartTime[i] = queryDirectStartTime[i].trim();
			queryDirectStartTime = queryDirectStartTime[1]+'/'+queryDirectStartTime[2]+'/'+queryDirectStartTime[0];
		}
		if(queryDirectEndTime){
			queryDirectEndTime = queryDirectEndTime.split('-');
			for(var i=0;i<queryDirectEndTime.length;i++)
				queryDirectEndTime[i] = queryDirectEndTime[i].trim();
			queryDirectEndTime = queryDirectEndTime[1]+'/'+queryDirectEndTime[2]+'/'+queryDirectEndTime[0];
		};
		
		var timeCondition = null;
		timeCondition = queryDirectStartTime?" [Opportunity.Updated] &gt; '"+queryDirectStartTime+"' ":null;
		timeCondition?timeCondition+=" AND ":timeCondition=null;
		queryDirectEndTime?timeCondition +=" [Opportunity.Updated] &lt; '"+queryDirectEndTime+"' ":timeCondition=null;
		
		var condition = (queryDirectCondition?"[Opportunity.Name] like '"+queryDirectCondition+"'  or [Opportunity.Account] like '"+queryDirectCondition+"'  or  [Opportunity.Oppty Final User] like '"+queryDirectCondition+"'":"");
		condition +=(queryDirectOpptyStatus?(queryDirectCondition?" AND ":"")+" [Opportunity.Oppty Status] = '"+queryDirectOpptyStatus+"' ":"");
		if(timeCondition)
			condition +=condition?" AND "+timeCondition:timeCondition;
		condition =condition?"("+condition+")":null;
		condition+=condition?' AND ':'';
		condition+=" [Opportunity.Oppty Type] = '设备商机' ";
		if(queryDirectCondition==''&&queryDirectOpptyStatus==''&&queryDirectStartTime==''&&queryDirectEndTime==''){
			condition=" [Opportunity.Oppty Type] = '设备商机' ";
		};
		cc.log('condition:'+condition);
		//记录查询条件，用于分页查询
		obj.getApplication().getController('login.PADManagerMainCtrl').statementZG=condition;
		cc.log('主管商机查询条件：'+condition);
		
		var zwTwo=obj.getApplication().getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectQueryDirectorListCtrl').zwTwo;
		if(zw==''){
			cx(obj);
		}else if(zw==zwTwo){
			cx(obj);
		}else{
			obj.getApplication().getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectQueryDirectorListCtrl').zwTwo=zw;
			cc.log('进入用户职位修改');
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
				cx(obj);
			};
			
			obj.connectServer_queryOpportunity(getResult,params);
		};
		
		//查询商机
		function cx(obj){
			var viewMode = 'Manager';
			var param = {
					NewQuery:true,
					userID:userID,
					SearchSpec:condition,
					ViewMode:viewMode,
					SortSpec:'Updated(DESCENDING)',
					StartRowNum:1,
					PageSize:'10',
			};
			console.log(param);
			var params = {
					adpName:'HttpAdapter_PAD_Custom',
					prodName:'clueHandleDirector_GLSJ',
					parameters: param
			};
			var getResult = function(result){
				if(result.Fault){
					Ext.Msg.alert('提示',result.Fault.faultstring);
					return ;
				}else if(!result.QueryOpptyPage_Output){
					Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
					return ;
				}else if(result.QueryOpptyPage_Output.ErrorMsg){
					Ext.Msg.alert('提示',result.QueryOpptyPage_Output.ErrorMsg);
					return ;
				}
				var r = result.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity?result.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity.Opportunity:null;
				if(!r){
					Ext.Msg.alert('提示','查询无商机数据，请重新输入查询条件！');
					return ;
				}
				if(!r.length)
					r = [r];
				obj.page = 1;
				store.setData(r);
				//obj.NextView('ProjectQueryDirectorListContainer','HelcPAD.view.OpportunityManagement.Project_New.BeInChargeOf.ProjectQueryDirectorList');
			};
			obj.connectServer_queryOpportunity(getResult,params);
			
		};
		
	},
	//商机查询部分列表点击
	projectQueryDirectorListOuter:function(listself, index, target, record, e, eOpts ){
		var oppty = record.data;
		console.log(oppty);
		var param = {
				userID:userID,
				id:oppty.Id
		};
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
 				prodName:'queryOpportunity',
 				parameters: param
		};
		
		var getResult = function(result){
			if(!result.OpptyDetailQuery_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return;
			}
			var r = result.OpptyDetailQuery_Output.ListOfHelEaiAppOpportunityDetail?result.OpptyDetailQuery_Output.ListOfHelEaiAppOpportunityDetail.Opportunity:null;
			if(!r){
				Ext.Msg.alert('提示','查询出错，请稍后重试！');
				return ;
			}
			object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').toOpptyDatil(r);
			
			Ext.getCmp('predictSign').setReadOnly(true);
		};
		this.connectServer_queryOpportunity(getResult,params);
		
	}
	
});