
/* JavaScript content from app/controller/login/PADMainCtrl.js in folder common */
/**
 * Made by lgs
 */
Ext.define('HelcAgent.controller.login.PADMainCtrl', {
	extend:'HelcAgent.controller.ApplicationController',

	config: {
        control: {
			
    		'dataview#supplierModule':{
    			itemtap:'supplierModule'
    		},
			
        }
    },
    
    //登陆权限判断
    newMainView:function(power){
    	var num = 0;
    	if(!power.length){
        	Ext.Msg.alert('提示','该用户无任何权限，请与管理员联系！');
        	myLogining.hide();
        	this.BackView();
        	return;
        }
    	for(var i=0;i<power.length;i++){
    		if(power[i]=='ClueCreateAgent'||power[i]=='ClueListAgent')
    			num++;
    	}
    	if(num!=2){
    		Ext.Msg.alert('提示','该账号无权限操作，请核对账号后再次登录！');
    		this.BackView();
    		myLogining.hide();
    		return ;
    	}
    	
    	PADZlbZJcz(obj);
    },
 
    
    //代理商list
    supplierModule:function(list,index,target,record,e,eOpts){
    	var obj = this;
    	var text = record.data.text;
    	if(text=='新建线索'){
    		this.NextView('clueCreateAgent','HelcAgent.view.OpportunityManagement.Agents.ClueCreateAgent');
    		//屏蔽 客户全称
    		Ext.getCmp('clueCustomer').setHidden(true);
    		Ext.getCmp('clueCustomer_CX').setHidden(true);
    		
    		var yearCheck = Ext.getCmp('cluePredictSignYear');
    		yearCheck.addListener({
    			change:function(selectField, newValue, oldValue, eOpts){
            		if(newValue=='2015'){
            			var cluePredictSignMonth = Ext.getCmp('cluePredictSignMonth');
            			var months = [];
                		months[0] = {text:'请选择',value:''};
                		for(var i=1;i<3;i++){
                			var month = {text:10+i+'月',value:10+i};
                			months[i] = month;
                		}
            			cluePredictSignMonth.setOptions(months);
            		}else{
            			var cluePredictSignMonth = Ext.getCmp('cluePredictSignMonth');
            			var months = [];
                		months[0] = {text:'请选择',value:''};
                		for(var i=1;i<13;i++){
                			var month = {text:i+'月',value:i};
                			months[i] = month;
                		}
                		if(cluePredictSignMonth)
                			cluePredictSignMonth.setOptions(months);
            		}
            	}
    		});
    		
    		
    		//操作
			var clueOpration = Ext.getCmp('clueOperation');
    		clueOpration.setOptions([{text:'新建线索',value:'新建报备'}]);
    		//页面初始化时操作
    		var ctrl = this.getApplication().getController('HelcAgent.controller.OpportunityManagement.Agents.ClueCreateAgentCtrl');
    		ctrl.toInit(ctrl.allAgents);
    	}else if(text=='线索查阅'){
    		var store = this.getStore('ClueDirectorStore','HelcAgent.store.OpportunityManagement.Director.ClueDirectorStore');
    		var condition = "[HEL Lead.Lead Status] like '**'";

    		//查询条件
    		obj.cxtj=condition;
    		//查询数量
    		obj.cxsl=10;
    		
    		var param = {
    				NewQuery:true,
    				userID:userID,
    				SearchSpec:condition,
    				ViewMode:'Organization',
    				SortSpec:'Created(DESCENDING)',
    				StartRowNum:0,
    				PageSize:'10',
    				
    		};
    		
    		var params = {
    				adpName:'HttpAdapter_PAD_Custom',
     				prodName:'clueListQuery',
     				parameters: param
    		};
    		
    		var getResult = function(result){
    			console.log(result);
    			if(!result.QueryLeadPage_Output){
    				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
    				return;
    			}else if(result.QueryLeadPage_Output.NumOutputObjects=='0'){
    				var list = Ext.getCmp('clueList');
    				var plugins = list.getPlugins();
    				plugins[0].setLoadMoreText('没有更多数据了');
    				return ;
    			}else if(result.QueryLeadPage_Output.NumOutputObjects=='1'){
    				store.setData([result.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead]);
    				obj.getApplication().getController('OpportunityManagement.Agents.ClueListAgentCtrl').pageNum = 0;
    			}else{
    				store.setData(result.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead);
    				obj.getApplication().getController('OpportunityManagement.Agents.ClueListAgentCtrl').pageNum = 0;
    			}
    			obj.NextView('clueListAgent','HelcAgent.view.OpportunityManagement.Agents.ClueListAgent');
    			
    			//报备类型
    			var XSZT=obj.extractionData('HEL_LEAD_STATUS');
    			var sel = document.getElementById("clueSearchStatus");
    			var num=0;
    			for(var i=0;i<XSZT.length;i++){
    				var option = new Option(XSZT[i].LIS_VAL, XSZT[i].LIS_VAL); 
    				//默认选中
    				/*if(XSZT[i].LIS_VAL=='新建'){
    					num=i+1;
    				};*/
    			    sel.options.add(option);  
    			};
    			//sel.options[num].selected=true;  
    			
    			
    			/*var list = Ext.getCmp('clueList');
    			var scroller = list.getScrollable().getScroller();
    			scroller.setListeners({
    				scroll:function(scrollerSelf,x,y,eOpts){
    					if(scroller.getContainerSize().y+y>scroller.getSize().y+100){
    						var ctrl = obj.getApplication().getController('HelcAgent.controller.OpportunityManagement.Agents.ClueListAgentCtrl');
	    					if(this.sizeY){
	    						if(scroller.getContainerSize().y+y>this.sizeY+50){
	    							this.differenY = this.sizeY;
	    							this.sizeY = scroller.getContainerSize().y+y;
			       					if(isNaN(parseInt(ctrl.pageNum)))
			       					    ctrl.clueSearchAgentLookUp(0,this);
			       					else{
			       						//ctrl.pageNum+=10;
			       						ctrl.clueSearchAgentLookUp(ctrl.pageNum,this);
			       					}
	    						}
	    					}else{
	    						this.sizeY = scroller.getContainerSize().y+y;
		       					if(isNaN(parseInt(ctrl.pageNum)))
		       					    ctrl.clueSearchAgentLookUp(0);
		       					else{
		       						//ctrl.pageNum+=10;
		       						ctrl.clueSearchAgentLookUp(ctrl.pageNum);
		       					}
	    					}
    					}
    				}
    			});*/
    		};
    		
    		this.connectServer_queryOpportunity(getResult,params);
    		
    	}else if(record.data.text=='退出登录'){
			var main = Ext.getCmp('padlogin_id');
      	 	if(!main){
      	 		main = Ext.create('HelcPAD.view.login.PADLogin');
      	 	}
      	 	Ext.Viewport.setActiveItem(main);
      	 	ViewArray = [];
		}else if(record.data.text=='设置'){
			obj.NextView('more_view_id','HelcAgent.view.more.More_view');
			
			//更多页签
			//关于PDA
			var LI=document.getElementById('about');
			LI.onclick = function (){
				obj.NextView('about_id','HelcAgent.view.more.About');
			};
			//修改密码
			var LI=document.getElementById('Cpassword');
			LI.onclick = function (){
				obj.NextView('updatePassword_id','HelcAgent.view.more.UpdatePassword');
				Ext.getCmp('up_username').setValue(usernames);
			};
			
		};
    }
});