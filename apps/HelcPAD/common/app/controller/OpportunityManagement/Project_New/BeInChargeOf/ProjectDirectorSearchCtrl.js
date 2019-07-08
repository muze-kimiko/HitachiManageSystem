Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorSearchCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			 //相似条件查找   返回
			 'button#projectdirectorsearch_new_id_FH':{
			 	tap:'projectdirectorsearch_new_id_FH',
			 },
			 //按关键字查找
			 'button#keyFound':{
				 tap:'keyFound'
			 },
			 //周边范围查找
			 'button#aroundFound':{
				 tap:'aroundFound'
			 },
			 
		},	
	},
	//周边范围查找
	aroundFound:function(wether){
		var obj = this;
		var round = document.getElementById('aroundPlace').value;//Ext.getCmp('aroundPlace').getValue().trim();
		var directorSearchOpportunity = Ext.getCmp('directorSearchOpportunity').getData();
		if(!round){
			Ext.Msg.alert('提示','请选择范围后查找！');
			return;
		}
		if(!directorSearchOpportunity.YCoordinate||!directorSearchOpportunity.XHeight){
			Ext.Msg.show({
				title: '温馨提示',
				message: '该商机并无地图坐标，确定查找？',
				buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
				fn:function(buttonId){
					if(buttonId=='yes'){
						var param = {
								userID:userID,
								DitH:round,
								LatY:directorSearchOpportunity.YCoordinate,
								LonX:directorSearchOpportunity.XHeight,
								ViewMode:'All'
						};
						
						var params = {
								adpName:'HttpAdapter_PAD_Custom',
				 				prodName:'SameOpptyQueryByXY',
				 				parameters: param
						};
						obj.publicFound(params);
					}
				}
			});
		}else{
			var param = {
					userID:userID,
					DitH:round,
					LatY:directorSearchOpportunity.YCoordinate,
					LonX:directorSearchOpportunity.XHeight,
					ViewMode:'All',
					operation:'aroundFound',
					unicorn:(wether?true:null)
			};
			
			var params = {
					adpName:'HttpAdapter_PAD_Custom',
	 				prodName:'SameOpptyQueryByXY',
	 				parameters: param,
	 				
			};
			obj.publicFound(params);
		}
		
	},
	//关键字查找
	keyFound:function(){
		var letterKey = document.getElementById('letterKey').value;//Ext.getCmp('letterKey').getValue().trim();
		if(!letterKey){
			Ext.Msg.alert('提示','请输入关键字后点击关键字查询！');
			return;
		}
		var condition = (letterKey?"([Opportunity.Account]like '*"+letterKey+"*' OR [Opportunity.Oppty Final User] like '*"+letterKey+"*'":"")+" OR [Opportunity.Name] like '*"+letterKey+"*')";
		condition+=condition?' AND ':'';
		condition+=" [Opportunity.Oppty Type] = '设备商机'";
		
		//([Opportunity.Name] like '*sdfs*'  or [Opportunity.Account] like '*sdfs*'  or  [Opportunity.Oppty Final User] like '*sdfs*' AND  [Opportunity.Oppty Status] = '已提交' ) AND  [Opportunity.Oppty Type] = '设备商机'  
		
		var param = {
				userID : userID,
				SearchSpec:condition,
				ViewMode:'All',
				operation:'keyFound'
		};
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
 				prodName:'queryOpportunityList',
 				parameters: param
		};
		
		this.publicFound(params);
	},
	
	
	//相似条件查找   返回
	projectdirectorsearch_new_id_FH: function() {
		if(this.sameQueryCount)
			this.sameQueryCount = null;
		var sourceOpportunity = Ext.getCmp('directorSearchOpportunity').getData();
		this.BackView();
		var store = this.getStore('DirectorOpptyStore','HelcPAD.store.OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyStore');
		var resultList = Ext.getCmp('projectdirectorresult_new_id_list');
		resultList?resultList.setStore(store):'';
		sourceOpportunity.directorSearchFlag = true;
		object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').toOpptyDatil(sourceOpportunity);
		var activeItemView = Ext.Viewport.getActiveItem();
		var selectNeedLister = activeItemView.query('selectfield');
		for(var i=0;i<selectNeedLister.length;i++){
  	    	try{
  	    		selectNeedLister[i].setListeners({
  	    			focus:function(field,e,eOpts){
  	    				var cls = field.getInputCls();
  	    				if(cls=='cusInfo_test'){
  	    					object.getController('common.SelectFieldListCtrl').SelectFieldList_GGFF(applicationController,field);
  	    				};
  	    			}
  	    		});
  	    	}catch(e){
  	    		continue;
  	    	}
  	    }
  	    //该部分为延迟改变组件的颜色并禁用selectfield的默认界面显示
  	 	var exec = "var activeItem = Ext.Viewport.getActiveItem();"+
  	 		"var defineInputfield =  activeItem.query('field');" +
  	 		"for(var i=0;i<defineInputfield.length;i++){" +
  	 		"	try{" +
  	 		"		if(defineInputfield[i].getReadOnly())" +
  	 		"			defineInputfield[i].setInputCls('ROCls');" +
  	 		"		else if(defineInputfield[i].isXType('selectfield'))" +
  	 		"			defineInputfield[i].setInputCls('cusInfo_test')" +
  	 		"	}catch(e){" +
  	 		"		continue;"+
  	 		"	}finally{" +
  	 		"		if(defineInputfield[i].isXType('selectfield'))" +
  	 		"			defineInputfield[i].setReadOnly(true);"+
  	 		"	}" +
  	 		"}";
  	 	setTimeout(exec,200);
	},
	//公共的查找方法
	publicFound:function(params){
		//cc.log(params);
		var obj = this;
		if(!this.sameQueryCount)
			this.sameQueryCount = 1;
		//var directorSearchOpportunity = Ext.getCmp('directorSearchOpportunity').getData();
		var keyWords = document.getElementById('letterKey').value;//Ext.getCmp('letterKey').getValue().trim();
		var resultData = [];
		var total = 0;
		var getResult = function(result){
			//console.log(result);
			if(result.Fault){
				if(result.Fault.detail.errorstack.error.errormsg.indexOf('Error: Login failed attempting to connect to')){
					Ext.Msg.alert('提示','服务器关闭，请确认服务器启动后重试！');
					return ;
				};
			};
			var store = obj.getStore('DirectorOpptyResultStore','HelcPAD.store.OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyResultStore');
			var data = [];
			if(params.parameters.DitH){
				if(!result.QueryXYOpty_Output){
					Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
					return;
				}
				else if(result.QueryXYOpty_Output.ErrorMsg){
					Ext.Msg.alert('提示',result.QueryXYOpty_Output.ErrorMsg);
					return;
				}else if(result.QueryXYOpty_Output.NumOutputObjects=='0'){
					Ext.Msg.alert('提示','无商机数据，请重新查找！');
					return;
				}
				data = result.QueryXYOpty_Output.ListOfHelEaiAppOpportunity.Opportunity;
			}else{
				if(!result.QueryOppty_Output){
					Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
					return;
				}else if(result.QueryOppty_Output.ErrorMsg){
					Ext.Msg.alert('提示',result.QueryOppty_Output.ErrorMsg);
					return;
				}else if(result.QueryOppty_Output.NumOutputObjects=='0'){
					Ext.Msg.alert('提示','无商机数据，请重新查找！');
					return;
				}
				data = result.QueryOppty_Output.ListOfHelEaiAppOpportunity.Opportunity;
			};
			
			//cc.log('data有没有数据');
			//cc.log(data);
			if(params.parameters.unicorn&&!keyWords){
				if(data.length){
					for(var i =0;i<data.length;i++){
						if(data[i].Name.indexOf(keyWords)||data[i].Account.indexOf(keyWords)!=-1||data[i].OpptyFinalUser.indexOf(keyWords)!=-1)
							resultData[total++]  = data[i];
					}
				}else{
					if(data.Name.indexOf(keyWords)||data.Account.indexOf(keyWords)!=-1||data.OpptyFinalUser.indexOf(keyWords)!=-1)
						resultData[0] = data;
				}
			}else{
				if(data.length)
					resultData = resultData.concat(data);
				else
					resultData.push(data);
			}	
			
			store.setData(resultData);
			if(resultData.length==0){
				Ext.Msg.alert('提示','无商机信息，请重新输入商机查找条件！');
				return ;
			}
				
			//obj.NextView('projectdirectorresult_new_id','HelcPAD.view.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorResult');
			/*Ext.getCmp('sourceOpptyName').setValue(directorSearchOpportunity.Name);
			Ext.getCmp('projectdirectorresult_new_id_JR').setData(directorSearchOpportunity);*/
			//Ext.getCmp('projectdirectorresult_new_id_JR').setData([directorSearchOpportunity]);
		};
		
		this.connectServer_queryOpportunity(getResult,params);
	}
	
});	



