Ext.define('HelcPAD.controller.OpportunityManagement.Director.ClueHandleDirectorCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			/*//返回
			"button#clueHandleDirector_FH":{
				tap:'clueHandleDirector_FH'
			},
			
			//执行
			"button#clueHandleDirector_ZX":{
				tap:'clueHandleDirector_ZX'
			},*/
			
			//关联商机
			/*"button#Clue_GLSJ_XZ":{
				tap:'Clue_GLSJ_XZ'
			},*/
			
			//线索跟踪人
			/*"button#Clue_XSGZR_XZ":{
				tap:'Clue_XSGZR_XZ'
			},*/
			
			//团队成员
			/*"button#Clue_TDCY_XZ":{
				tap:'Clue_TDCY_XZ'
			},*/
		}
	},
	
	//自定义按钮
	//三个判断 线索来源 线索状态 入口
	/**
	 * 
	1.主管
	状态：审核中      已解决
	主：关联商机 
	  副：选中 加入已有商机
	
	无所谓，就不做主管的“转建新商机”

	状态：审核中      已解决
	主：线索跟踪人
	  副：分派营业员

	状态：已接收     已解决
	主：终止线索 
	
	最新规定 主管也不能做，只有总部数据管理员能做  状态：审核中
	功能：“关闭线索”	
	
	2.营业员
	状态：处理中   经销商的已测试,BCI已测试
	副： 转建新商机
	线索地址  BCI
	商机地址  经销商
	
	状态：处理中  已解决
	主：关联商机
	  副：选中 加入已有商机
	
	状态：处理中   已解决
	主：退回主管  
	
	 */
	clueHandleDirectorDJFF:function(obj){
		cc.log('----------------进入按钮初始化方法-------------------');
		var LeadSource=obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').LeadSource;
		cc.log('线索来源：'+LeadSource);
		var LeadStatus=obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').LeadStatus;
		cc.log('线索状态:'+LeadStatus);
		var RK=obj.getApplication().getController('login.PADMainCtrl').RK;
		cc.log('线索入口:'+RK);
		
		var BCIImportAddress=obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').BCIImportAddress;
		cc.log('线索地址:'+BCIImportAddress);
		//面板
		var MB;
		//按钮
		var html='';
		if(LeadSource=='经销商'){
			MB=Ext.getCmp('clueHandleDirector_toolbar');
		}else if(LeadSource=='外部线索'){
			MB=Ext.getCmp('BCI_clueHandleDirector_toolbar');
		};
		if(RK=='主管线索'){
	    	if(LeadStatus=='审批中'){
	    		 html='<div style="width=100%">'+
	     			  '<div class="anTwoDiv">'+
	     			  	'<div class="kThree ysZhOne anOne" id="clueHandleDirector_SYY">'+SYB+'</div>'+
	     			  	'<div class="kThree ysZhThree anOne" id="clueHandleDirector_GLSJ">关联商机</div>'+
	     			  	'<div class="kThree ysZhFour anOne" id="clueHandleDirector_XSGZ">线索跟踪人</div>'+
	     			  '</div>'+
		    		 /*'<div class="anTwoDiv">'+
		 			 	'<div class="kOne ysZhOne anOne" id="clueHandleDirector_SYY">'+SYB+'</div>'+
		 			 	'<div class="kOne ysZhTwo anOne" id="clueHandleDirector_GBXS">关闭线索</div>'+
		 			 '</div>'+
		 			 '<div class="anTwoDiv">'+
					 	'<div class="kOne ysZhThree anOne" id="clueHandleDirector_GLSJ">关联商机</div>'+
					 	'<div class="kOne ysZhFour anOne" id="clueHandleDirector_XSGZ">线索跟踪人</div>'+
					 '</div>'+*/
	     			  '</div>';
	    		 //MB.setHeight(85);
			}else if(LeadStatus=='已接收'){
				html='<div style="width=100%">'+
   			  		 '<div class="anTwoDiv">'+
   			  		 	'<div style="width:46%;background: none repeat scroll 0 0 #7AC5A5;" class="anOne"  id="clueHandleDirector_SYY">'+SYB+'</div>'+
   			  		 	'<div class="kOne ysZhFour anOne" id="clueHandleDirector_ZZXS">终止线索</div>'+
   			  		 '</div>'+
   			  		 '</div>';
			}else{
				html='<div style="width=100%">'+
   			  		 	'<div class="anTwoDiv">'+
   			  		 	'<div class="kTwo ysZhOne anOne" id="clueHandleDirector_SYY">'+SYB+'</div>'+
   			  		 	'</div>'+
   			  		 '</div>';
			};
			cc.log(html);
	    	MB.setHtml(html);
	    	MB.setHeight(48);
	    	
	    	
		}else if(RK=='营业员线索'){
			//alert(LeadStatus);
			if(LeadStatus=='处理中'){
				html+='<div style="width=100%">'+
		  		 '<div class="anTwoDiv">'+
		  		 	'<div class="anTwoDiv">'+
		  		 		'<div class="kThree ysZhOne anOne" id="clueHandleDirector_SYY">'+SYB+'</div>'+
		  		 		'<div class="kThree ysZhTwo anOne" id="clueHandleDirector_ZJXSJ">转建新商机</div>';
		  		 		if(LeadSource=='经销商'){
		  		 			html+='<div class="kThree ysZhTwo anOne" id="clueHandleDirector_KHCX">客户查询</div>';
		  				}else if(LeadSource=='外部线索'){
		  					html+='<div class="kThree ysZhThree anOne" id="clueHandleDirector_SJDZCX">商机地址查询</div>';
		  				};
		  		html+='</div>'+
	 			 	'<div class="anTwoDiv">';
		 			 	if(LeadSource=='经销商'){
		 			 		html+='<div class="kThree ysZhThree anOne" id="clueHandleDirector_GLSJ">关联商机</div>'+
		 			 		'<div class="kThree ysZhFour anOne" id="clueHandleDirector_THZG">退回主管</div>'+
		 			 		'<div class="kThree ysZhThree anOne" id="clueHandleDirector_SJDZCX">商机地址查询</div>';
		 			 	}else{
		 			 		html+='<div class="kOne ysZhThree anOne" id="clueHandleDirector_GLSJ">关联商机</div>'+
		 			 		'<div class="kOne ysZhFour anOne" id="clueHandleDirector_THZG">退回主管</div>';
		 			 	};
					'</div>'+
		  		 '</div>';
				MB.setHeight(85);
			}else{
				html='<div style="width=100%">'+
		  		 	'<div class="anTwoDiv">'+
		  		 	'<div class="kTwo ysZhOne anOne" id="clueHandleDirector_SYY">'+SYB+'</div>'+
		  		 	/*'<div class="kOne ysZhFour anOne" id="clueHandleDirector_ZJXSJ">转建新商机</div>'+*/
		  		 	'</div>'+
		  		 '</div>';
				MB.setHeight(48);
			};
			cc.log(html);
	    	MB.setHtml(html);
	    	
		};
		
		//上一页  
		var SYY=document.getElementById('clueHandleDirector_SYY');
		SYY.onclick = function (){
			obj.BackView();
			obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.HQSalesRepCtrl').storeData = null;
			obj.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore').removeAll();
			//清理线索跟踪人和团队成员
			obj.getStore('ClueResultStore','HelcPAD.store.OpportunityManagement.Director.Clue.ClueResultStore').setData([]);
			//关联商机
			var DataClue=Ext.data.StoreManager.get('ClueProjectListStore');
			if(!DataClue){
				DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueProjectListStore');
			};
			DataClue.setData([]);
		};
		
		if(RK=='主管线索'){
			if(LeadStatus=='审批中'){
				//线索跟踪人
			    var XSGZ=document.getElementById('clueHandleDirector_XSGZ');
			    XSGZ.onclick = function (){
			    	var glsj_ZT='';
			    	var XsGzr='';
			    	var CFID='';
			    	var ZYID='';
			    	if(LeadSource=='经销商'){
			    		glsj_ZT=Ext.getCmp('Clue_LeadStatus').getValue();
			    		//判断是否有线索跟踪人,虽然没有必要
						XsGzr=Ext.getCmp('clueHandleDirector_XSGZR').getValue();
						CFID='clueHandleDirector_XSGZR';
				    	ZYID='Clue_XSGZR';
			    	}else if(LeadSource=='外部线索'){
			    		glsj_ZT=Ext.getCmp('BCI_LeadStatus').getValue();
			    		//判断是否有线索跟踪人,虽然没有必要
						 XsGzr=Ext.getCmp('BCI_clueHandleDirector_XSGZR').getValue();
						 CFID='BCI_clueHandleDirector_XSGZR';
					     ZYID='BCI_XSGZR';
			    	};
					if(glsj_ZT!='审批中'){
						Ext.Msg.alert("温馨提示",'线索状态不为审批');
						return;
					};
					cc.log('查看线索跟踪人:'+XsGzr);
					var bb=eval("("+ XsGzr+")");
					cc.log(bb);
					//cc.log(bb[0].ActiveLoginName);
					obj.NextView('cluePeopleSelectView','HelcPAD.view.OpportunityManagement.Director.Clue.CluePeopleSelectView');
					//按钮初始化
					obj.getApplication().getController('OpportunityManagement.Director.ClueHandleDirectorCtrl').clueHandleDirectorXSGZR(obj);
					//
					Ext.getCmp('cluePeopleSelectViewToolbar').setTitle('线索跟踪人');
					obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Director.Clue.CluePeopleSelectViewCtrl').CFID =CFID; 
					obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Director.Clue.CluePeopleSelectViewCtrl').ZYID = ZYID;
					
					if(XsGzr!='[]'){
						obj.getStore('ClueResultStore','HelcPAD.store.OpportunityManagement.Director.Clue.ClueResultStore').setData(bb);
						//强制选择标签处于活动状态
					    var tp_chart=Ext.getCmp('cluePeopleSelectView');
					    cc.log(tp_chart);
					    var itemid=tp_chart.getActiveItem().getId();
					    cc.log('itemid:'+itemid);
					    var tab=tp_chart.getInnerItems();
					    tp_chart.setActiveItem(tab[1]);
					};
			    };
			    
			  //关联商机
			    var GLSJ=document.getElementById('clueHandleDirector_GLSJ');
			    GLSJ.onclick = function (){
			    	var clueHandleDirector = '';
			    	if(LeadSource=='经销商'){
			    		clueHandleDirector = Ext.getCmp('clueHandleDirector');
			    	}else if(LeadSource=='外部线索'){
			    		clueHandleDirector = Ext.getCmp('clueHandleDirector_BCI');
			    	};
					
					//获取当前页面
					var Cd_BCI=clueHandleDirector.getRecord();
					cc.log('页面详细信息');
					cc.log(Cd_BCI);
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
					
					getResult=function(obj,data){
						cc.log('data:'+data);
						obj.NextView('clueProjectList','HelcPAD.view.OpportunityManagement.Director.ClueProjectList');
						//按钮初始化
						obj.getApplication().getController('OpportunityManagement.Director.ClueHandleDirectorCtrl').clueHandleDirectorGLSJ(obj);
						//数据
						var DataClue=Ext.data.StoreManager.get('ClueProjectListStore');
						if(!DataClue){
							DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueProjectListStore');
						};
						//Ext.getCmp('clueProjectList_hidden').setValue('主管使用');
						if(data==undefined){
							//Ext.Msg.alert("温馨提示",'500米内无关联商机');
							var htmel=['<div style="font-size:12px;width:100%">'+
						            	'<div style="float:left;width:100%">当前范围搜寻不到关联商机</div>'+
						            	'</div>'];
							Ext.getCmp('clueProjectList_list').setItemTpl(htmel);
							
							DataClue.setData([{Name:'没有'}]);
						}else{
							DataClue.setData(data);
						};
						//记录查询条件
						Ext.getCmp('clueProjectList_hidden_TJ').setValue(ggZH);
					};
					var Trim={
							NewQuery:true,
							SearchSpec:ggZH,
							PageSize:'20',
							SortSpec:'Created(DESCENDING)',
							ViewMode:'Manager',
							StartRowNum:'0',
							userID:userID,
					};
					cc.log(ggZH);
					obj.MapX=Cd_BCI.data.XHeight;
					obj.MapY=Cd_BCI.data.YCoordinate;
					cc.log('MapX:'+obj.MapX+'  MapY:'+obj.MapY);
					obj.getApplication().getController('OpportunityManagement.Director.ClueHandleDirector_BCICtrl').BCI_GLSJ_GGFF(obj,Trim,getResult,3);
			    };
			    
			    
			}else if(LeadStatus=='已接收'){
				//终止线索
				var ZZXS=document.getElementById('clueHandleDirector_ZZXS');
				ZZXS.onclick = function (){
					Ext.Msg.show({
						title: '温馨提示',
						message: '是否确认终止线索！',
						buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
						fn: function(buttonId) {
							if(buttonId == 'yes'){
								if(LeadSource=='经销商'){
									Ext.getCmp('Clue_ApproveOperate').setValue('终止线索');
								}else if(LeadSource=='外部线索'){
									Ext.getCmp('BCI_ApproveOperate').setValue('终止线索');
								};
								obj.ZXDGGFF(obj);
							};
						}
					});
				};
			};
		}else if(RK=='营业员线索'){
			if(LeadStatus=='处理中'){
				
				if(LeadSource=='经销商'){
					//客户查询
					var KHCX=document.getElementById('clueHandleDirector_KHCX');
					KHCX.onclick = function (){
						//使用我的商机模块中的客户查询
						obj.NextView('customerSelect','HelcPAD.view.OpportunityManagement.Project_New.CustomerSelectView');
						Ext.getCmp('comeSource').setValue('HelcPAD.controller.OpportunityManagement.Director.ClueHandleDirectorCtrl');
						//修改列表的长度
						var gd=MapHeight-45-50-210;
						//cc.log('gd:'+gd);
						Ext.getCmp('custornList').setHeight(gd);
					};
				}else if(LeadSource=='外部线索'){
					
				};
				//商机地址查询
				var SJDZCX=document.getElementById('clueHandleDirector_SJDZCX');
				SJDZCX.onclick = function (){
					obj.NextView('installSitePanel','HelcPAD.view.OpportunityManagement.Project_New.InstallSiteView');
					Ext.getCmp('installSiteComeSource').setValue('HelcPAD.controller.OpportunityManagement.Director.ClueHandleDirectorCtrl');
					obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.InstallSiteCtrl').toInit('installSite');
					//页面样式
					//var zz=MapHeight-45-310-10-10;
					//Ext.getCmp('installSiteList').setHeight(zz);
					//标题名
					Ext.getCmp('installSitePanel_toolbar').setTitle('选择商机地址');
				};
			    
				
				
				//退回主管
				var ZZXS=document.getElementById('clueHandleDirector_THZG');
				ZZXS.onclick = function (){
					Ext.Msg.show({
						title: '温馨提示',
						message: '是否确认将此线索退回主管！',
						buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
						fn: function(buttonId) {
							if(buttonId == 'yes'){
								if(LeadSource=='经销商'){
									Ext.getCmp('Clue_ApproveOperate').setValue('退回主管');
								}else if(LeadSource=='外部线索'){
									Ext.getCmp('BCI_ApproveOperate').setValue('退回主管');
								};
								obj.ZXDGGFF(obj);
							};
						}
					});
				};
				
				//关联商机
			    var GLSJ=document.getElementById('clueHandleDirector_GLSJ');
			    GLSJ.onclick = function (){
			    	var clueHandleDirector = '';
			    	if(LeadSource=='经销商'){
			    		clueHandleDirector = Ext.getCmp('clueHandleDirector');
			    	}else if(LeadSource=='外部线索'){
			    		clueHandleDirector = Ext.getCmp('clueHandleDirector_BCI');
			    	};
					
					//获取当前页面
					var Cd_BCI=clueHandleDirector.getRecord();
					cc.log('页面详细信息');
					cc.log(Cd_BCI);
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
					
					getResult=function(obj,data){
						cc.log('data:'+data);
						obj.NextView('clueProjectList','HelcPAD.view.OpportunityManagement.Director.ClueProjectList');
						//按钮初始化
						obj.getApplication().getController('OpportunityManagement.Director.ClueHandleDirectorCtrl').clueHandleDirectorGLSJ(obj);
						//数据
						var DataClue=Ext.data.StoreManager.get('ClueProjectListStore');
						if(!DataClue){
							DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueProjectListStore');
						};
						//Ext.getCmp('clueProjectList_hidden').setValue('主管使用');
						if(data==undefined){
							//Ext.Msg.alert("温馨提示",'500米内无关联商机');
							var htmel=['<div style="font-size:12px;width:100%">'+
						            	'<div style="float:left;width:100%">当前范围搜寻不到关联商机</div>'+
						            	'</div>'];
							Ext.getCmp('clueProjectList_list').setItemTpl(htmel);
							
							DataClue.setData([{Name:'没有'}]);
						}else{
							DataClue.setData(data);
						};
						//记录查询条件
						Ext.getCmp('clueProjectList_hidden_TJ').setValue(ggZH);
					};
					var Trim={
							NewQuery:true,
							SearchSpec:ggZH,
							PageSize:'20',
							SortSpec:'Created(DESCENDING)',
							ViewMode:'Manager',
							StartRowNum:'0',
							userID:userID,
					};
					cc.log(ggZH);
					obj.MapX=Cd_BCI.data.XHeight;
					obj.MapY=Cd_BCI.data.YCoordinate;
					cc.log('MapX:'+obj.MapX+'  MapY:'+obj.MapY);
					obj.getApplication().getController('OpportunityManagement.Director.ClueHandleDirector_BCICtrl').BCI_GLSJ_GGFF(obj,Trim,getResult,3);
			    };
				
			    //转建新商机
				var ZJXSJ=document.getElementById('clueHandleDirector_ZJXSJ');
				ZJXSJ.onclick = function (){
					//alert('暂时回退');
					//return;
					if(LeadSource=='经销商'){
						Ext.getCmp('Clue_ApproveOperate').setValue('转建新商机');
					}else if(LeadSource=='外部线索'){
						Ext.getCmp('BCI_ApproveOperate').setValue('转建新商机');
					};
					obj.ZXDGGFF(obj);
				};
				
			};
			
		};
		
		
	    //关闭线索
		   /* var GBXS=document.getElementById('clueHandleDirector_GBXS');
		    GBXS.onclick = function (){
		    	Ext.Msg.show({
					title: '温馨提示',
					message: '是否确认关闭线索',
					buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
					fn: function(buttonId) {
						if(buttonId == 'yes'){
							if(LeadSource=='经销商'){
								Ext.getCmp('Clue_ApproveOperate').setValue('关闭线索');
							}else if(LeadSource=='外部线索'){
								Ext.getCmp('BCI_ApproveOperate').setValue('关闭线索');
							};
							obj.ZXDGGFF(obj);
						};
					}
				});
			};*/
		
		
				//转建新商机
				/*var ZJXSJ=document.getElementById('clueHandleDirector_ZJXSJ');
				ZJXSJ.onclick = function (){
					if(LeadSource=='经销商'){
						var StreetAddress=obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').StreetAddress;
						cc.log('商机地址:'+StreetAddress);
						if(StreetAddress!=''&&StreetAddress!=null&&StreetAddress!=undefined){
							xuanzheba(obj);
						}else{
							Ext.Msg.alert("温馨提示","请选择商机地址！");
						};
			    	}else if(LeadSource=='外部线索'){
			    		//var BCIImportAddress=obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').BCIImportAddress;
			    		var BCIImportAddress=Ext.getCmp('BCI_BCIImportAddress').getValue();
			    		cc.log('线索地址:'+BCIImportAddress);
						if(BCIImportAddress!=''&&BCIImportAddress!=null&&BCIImportAddress!=undefined){
							xuanzheba(obj);
						}else{
							Ext.Msg.alert("温馨提示","请选择线索地址！");
						};
			    	};
			    	function xuanzheba(obj){
			    		Ext.Msg.show({
							title: '温馨提示',
							message: '是否执行当前操作？',
							buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
							fn: function(buttonId) {
								if(buttonId == 'yes'){
									if(LeadSource=='经销商'){
										Ext.getCmp('Clue_ApproveOperate').setValue('转建新商机');
									}else if(LeadSource=='外部线索'){
										Ext.getCmp('BCI_ApproveOperate').setValue('转建新商机');
									};
									obj.ZXDGGFF(obj);
								};
							}
						});
			    	};
			    	
				};*/
				
				/*if(LeadSource=='经销商'){
					//商机地址
					var SJDZ=document.getElementById('clueHandleDirector_SJDZ');
					SJDZ.onclick = function (){
						obj.NextView('installSitePanel','HelcPAD.view.OpportunityManagement.Project_New.InstallSiteView');
						Ext.getCmp('installSiteComeSource').setValue('HelcPAD.controller.OpportunityManagement.Director.ClueHandleDirectorCtrl');
						obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.InstallSiteCtrl').toInit('installSite');
						//页面样式
						var zz=MapHeight-45-310-10;
						Ext.getCmp('installSiteList').setHeight(zz);
						//标题名
						Ext.getCmp('installSitePanel_toolbar').setTitle('选择商机地址');
						
					};
				};*/

	    
	},
	
	//关联商机的方法
	//主管    副：选中 加入已有商机
	//营业员  副：选中 加入已有商机
	clueHandleDirectorGLSJ:function(obj){
		var MB=Ext.getCmp('clueProjectList_toolbar');
		var RK=obj.getApplication().getController('login.PADMainCtrl').RK;
		cc.log('线索入口:'+RK);
		var LeadSource=obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').LeadSource;
		cc.log('线索来源3：'+LeadSource);
		if(RK=='主管线索'){
			html='<div style="width=100%">'+
			  '<div class="anTwoDiv">'+
			  	'<div class="kThree ysZhOne anOne" id="clueProjectList_SYY">'+SYB+'</div>'+
			  	'<div class="kThree ysZhThree anOne" id="clueProjectList_SS">搜索</div>'+
			  	'<div class="kThree ysZhFour anOne" id="clueProjectList_JRYYSJ">加入已有商机</div>'+
			  '</div>'+
			 '</div>';
			cc.log(html);
			MB.setHtml(html);
			MB.setHeight(48);
			
		}else if(RK=='营业员线索'){
			html='<div style="width=100%">'+
	 			 '<div class="anTwoDiv">'+
	 			 	'<div class="kThree ysZhOne anOne" id="clueProjectList_SYY">'+SYB+'</div>'+
	 			 	'<div class="kThree ysZhTwo anOne" id="clueProjectList_SS">搜索</div>'+
				 	'<div class="kThree ysZhThree anOne" id="clueProjectList_JRYYSJ">加入已有商机</div>'+
				 '</div>'+
			 '</div>';
			cc.log(html);
			MB.setHtml(html);
			MB.setHeight(48);
			
		};
		
		//上一步
		var SYY=document.getElementById('clueProjectList_SYY');
		SYY.onclick = function (){
			obj.BackView();
		};
		
		//搜索
		var SS=document.getElementById('clueProjectList_SS');
		SS.onclick = function (){
			obj.getApplication().getController('OpportunityManagement.Director.ClueHandleDirectorCtrl').clueHandleDirectorSSSJ(obj);
		};
		
		//加入已有商机
		var JRYYSJ=document.getElementById('clueProjectList_JRYYSJ');
		JRYYSJ.onclick = function (){
			var ss=document.getElementById("clueProjectList_SS"). innerHTML;
			if(ss=='搜索'){
				Ext.Msg.alert("温馨提示",'请选择关联商机');
				return;
			};
			
			if(LeadSource=='经销商'){
				Ext.getCmp('Clue_ApproveOperate').setValue('加入已有商机');
			}else if(LeadSource=='外部线索'){
				Ext.getCmp('BCI_ApproveOperate').setValue('加入已有商机');
			};
			obj.ZXDGGFF(obj);
		};
		
		
	},
	
	//搜索商机
	clueHandleDirectorSSSJ:function(obj){
		obj.NextView('clueProjectListSearch','HelcPAD.view.OpportunityManagement.Director.ClueProjectListSearch');
		var MB=Ext.getCmp('clueProjectListSearch_toolbar');
		html='<div style="width=100%">'+
 			  '<div class="anTwoDiv">'+
 			  	'<div class="kOne ysZhOne anOne" id="clueProjectListSearch_SYY">'+SYB+'</div>'+
 			  	'<div class="kOne ysZhThree anOne" id="clueProjectListSearch_CX">查询</div>'+
 			  '</div>'+
 			  '</div>';
		cc.log(html);
		MB.setHtml(html);
		MB.setHeight(48);
		
		//上一步
		var SYY=document.getElementById('clueProjectListSearch_SYY');
		SYY.onclick = function (){
			obj.getApplication().getController('OpportunityManagement.Director.ClueProjectListSearchCtrl').clueProjectListSearch_FH();
		};
		
		//查询
		var CX=document.getElementById('clueProjectListSearch_CX');
		CX.onclick = function (){
			obj.getApplication().getController('OpportunityManagement.Director.ClueProjectListSearchCtrl').clueProjectListSearch_CX();
		};
	},
	
	//线索跟踪人
	//副：分派营业员
	clueHandleDirectorXSGZR:function(obj){
		var MB=Ext.getCmp('cluePeopleSelectView_toolbar');
		html='<div style="width=100%">'+
 			  '<div class="anTwoDiv">'+
 			  	'<div class="kOne ysZhOne anOne" id="cluePeopleSelectView_SYY">'+SYB+'</div>'+
 			  	'<div class="kOne ysZhThree anOne" id="cluePeopleSelectView_FPYYY">分派营业员</div>'+
 			  '</div>'+
 			  '</div>';
		cc.log(html);
		MB.setHtml(html);
		MB.setHeight(48);
		
		var LeadSource=obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').LeadSource;
		cc.log('线索来源4：'+LeadSource);
		
		//上一步
		var SYY=document.getElementById('cluePeopleSelectView_SYY');
		SYY.onclick = function (){
			obj.getApplication().getController('OpportunityManagement.Director.Clue.CluePeopleSelectViewCtrl').cluePeopleSelectView_FH();
		};
		
		//分派营业员
		var FPYYY=document.getElementById('cluePeopleSelectView_FPYYY');
		FPYYY.onclick = function (){
			
			if(LeadSource=='经销商'){
				Ext.getCmp('Clue_ApproveOperate').setValue('分派营业员');
			}else if(LeadSource=='外部线索'){
				Ext.getCmp('BCI_ApproveOperate').setValue('分派营业员');
			};
			obj.getApplication().getController('OpportunityManagement.Director.Clue.CluePeopleSelectViewCtrl').cluePeopleSelectView_QR(obj);
		};
		
	},
	
	//执行的公共方法
	ZXDGGFF:function(obj){
		var LeadSource=obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').LeadSource;
		cc.log('线索来源2：'+LeadSource);
		getResult=function(data){
			   cc.log('进来了'+data);
			   //return;
			   
			   var thisobj=data.obj;
			   //var msg=data.Fault.faultstring;
			   cc.log(data);
			   
			   var xsbh='';
			   if(LeadSource=='经销商'){
				   xsbh=Ext.getCmp('Clue_ID').getValue();
			   }else if(LeadSource=='外部线索'){
				   xsbh=Ext.getCmp('BCI_ID').getValue();
			   };
			   cc.log('执行2:'+xsbh);
			   thisobj.ZXDGGFF_Two(thisobj,xsbh);
		};
		if(LeadSource=='经销商'){
			//当前文本的所有控件   
			var formValue = Ext.getCmp('clueHandleDirector').getValues(false,true);
			//传递去的值
			//主管只能修改商机，跟踪人，组织，审批操作这几个字段
			var formValueTwo ={};
			formValueTwo.OpptyNumber=Ext.getCmp('Clue_GLSJ').getValue(); //商机编号 //BCI_GLSJ
			formValueTwo.OpptyId=Ext.getCmp('Clue_OpptyId').getValue();//商机ID
			formValueTwo.Id=formValue.Id;//线索编号
			var AO=Ext.getCmp('Clue_ApproveOperate').getValue();
			formValueTwo.ApproveOperate=AO;//审批操作
			//状态
			formValueTwo.status='修改';
			//formValueTwo.LeadFinalUser=formValue.LeadFinalUser;//使用单位
			//主管驳回意见、
			//cc.log('formValueTwo.ManagerRejectComments:'+formValueTwo.ManagerRejectComments);
			var MRC=Ext.getCmp('Clue_ManagerRejectComments').getValue();
			if(MRC!='请选择'){
				formValueTwo.ManagerRejectComments=MRC;
			};
			 //当线索状态为营业
			var LeadStatus=Ext.getCmp('Clue_LeadStatus').getValue();
			if(LeadStatus=='处理中'){
				formValueTwo.ProjectArea=Ext.getCmp('Clue_ProjectArea').getValue();
				formValueTwo.Province=Ext.getCmp('Clue_Province').getValue();
				formValueTwo.City=Ext.getCmp('Clue_City').getValue();
				formValueTwo.County=Ext.getCmp('Clue_County').getValue();
				formValueTwo.StreetAddress=Ext.getCmp('Clue_StreetAddress').getValue();
			};
			
			//营业员专用
			var RK=obj.getApplication().getController('login.PADMainCtrl').RK;
			cc.log('线索入口:'+RK);
			if(RK=='营业员线索'&&AO=='转建新商机'){
				//商机客户
				formValueTwo.Account=Ext.getCmp('Clue_Account').getValue();
			};
			
			cc.log('--------------详细信息');
			cc.log(formValueTwo);
			
			//键
			var formValueModel = Ext.create('HelcPAD.model.OpportunityManagement.Agents.ClueDetailModel',formValueTwo);
			//组织
			var ZG=obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').BCIData;
			var ZG2=ZG.ListOfHELLead_Organization.HELLead_Organization;
			//当只有一条数据的时候
			if(ZG2.length==undefined){
				ZG2=[ZG2];
			};
			cc.log('组织============');
			cc.log(ZG2);   
			//跟踪人 2016-2-25  如果线索跟踪人不发生改变，就不会提交上去
			var GZR=Ext.getCmp('clueHandleDirector_XSGZR').getValue();
			GZR=eval("("+ GZR+")");
			//团队成员
			var TdCy=Ext.getCmp('clueHandleDirector_TDCY').getValue();
			cc.log(TdCy);
			TdCy=eval("("+ TdCy+")");
			var param = {};
			param.userID=userID;
			param.clueModel=formValueTwo;
			param.fields=formValueModel.getFields().keys;
			if(GZR!=''&&GZR!=null&&GZR!=undefined){
				param.position=GZR;//跟踪人
			};
			param.organization=ZG2;//组织			  
			   //param.ViewMode='All';
			   if(AO=='分派营业员'){
				   cc.log('团队成员分派前');
				   cc.log(TdCy);
				   cc.log(GZR);
				   var numGZR=GZR.length;//线索跟踪人
				   var numTdCy=TdCy.length;//团队成员
				   for(var i=0;i<numGZR;i++){
					   var xs=GZR[i];
					   var trim={};
					   trim.ActiveLastName=xs.ActiveLastName; //"陆 佳慧"
					   trim.ActiveFirstName=xs.ActiveFirstName;
					   trim.LastName=xs.LastName; //"陆 佳慧"
					   trim.FirstName=xs.FirstName;
						
					   trim.IsPrimaryMVG=xs.IsPrimaryMVG; //"Y";
					   trim.Id=xs.Id;                      //团队成员职位ID
					   trim.PrimaryEmployeeId=xs.PrimaryEmployeeId;      //"1-QYKBIK"
					   trim.Name=xs.Name;//: "HEL_汕头司_报价员"
					   trim.Division=xs.Division;  //所属司
					   trim.ActiveLoginName=xs.ActiveLoginName;
					   TdCy[numTdCy]=trim;
					   numTdCy++;
				   };
				   cc.log('团队成员分派后');
				   cc.log(TdCy);
				   param.HLPosition=TdCy; //团队成员
			   };
			   param.ViewMode='Organization';
			   cc.log('---------HH----------------');
			   cc.log(param);
			   var Trim = {
			   		   adpName:'HttpAdapter_PAD_Custom',
			   		   prodName:'clueSynchronize',
			   		   parameters: param,
			   		   obj:obj,
			   		   LoadNum:2
			   };
			   object.getApplication().getController('OpportunityManagement.Director.ClueHandleDirector_BCICtrl').ZgClXSXQ_GGFF(obj,Trim,getResult);
			   
    	}else if(LeadSource=='外部线索'){
    		//当前文本的所有控件   
    		var formValue = Ext.getCmp('clueHandleDirector_BCI').getValues(false,true);
    		//传递去的值
    		//主管只能修改商机，跟踪人，组织，审批操作这几个字段
    		var formValueTwo ={};
    		formValueTwo.OpptyNumber=Ext.getCmp('BCI_GLSJ').getValue(); //商机编号 //BCI_GLSJ
    		formValueTwo.OpptyId=Ext.getCmp('BCI_OpptyId').getValue();//商机ID
    		formValueTwo.Id=formValue.Id;//线索编号
    		//状态
			formValueTwo.status='修改';
    		var AO=Ext.getCmp('BCI_ApproveOperate').getValue();
    		if(AO!='请选择'){
    			formValueTwo.ApproveOperate=AO;//审批操作
    		};
    		
    		//主管驳回意见、
    		//cc.log('formValueTwo.ManagerRejectComments:'+formValueTwo.ManagerRejectComments);
    		var MRC=Ext.getCmp('BCI_ManagerRejectComments').getValue();
    		if(MRC!='请选择'){
    			formValueTwo.ManagerRejectComments=MRC;
    		};
    		var LeadStatus=Ext.getCmp('BCI_LeadStatus').getValue();
			if(LeadStatus=='处理中'){
				//线索地址
				formValueTwo.BCIImportAddress=Ext.getCmp('BCI_BCIImportAddress').getValue();
			};
			
			//营业员专用  转建新商机
			var RK=obj.getApplication().getController('login.PADMainCtrl').RK;
			cc.log('线索入口:'+RK);
			if(LeadStatus=='处理中'&&AO=='转建新商机'&&RK=='营业员线索'){
				formValueTwo.ProjectArea=Ext.getCmp('BCI_ProjectArea').getValue();
				formValueTwo.Province=Ext.getCmp('BCI_Province').getValue();
				formValueTwo.City=Ext.getCmp('BCI_City').getValue();
				formValueTwo.County=Ext.getCmp('BCI_County').getValue();
				formValueTwo.StreetAddress=Ext.getCmp('BCI_StreetAddress').getValue();
				//使用单位
				formValueTwo.LeadFinalUser=Ext.getCmp('BCI_LeadFinalUser').getValue();
			};
			
			
    		cc.log('--------------详细信息');
    		cc.log(formValueTwo);
    		
    		//键
    		var formValueModel = Ext.create('HelcPAD.model.OpportunityManagement.Agents.ClueDetailModel',formValueTwo);
    		//组织
    		var ZG=obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').BCIData;
    		var ZG2=ZG.ListOfHELLead_Organization.HELLead_Organization;
    		//当只有一条数据的时候
    		if(ZG2.length==undefined){
    			ZG2=[ZG2];
    		};
    		cc.log('组织============');
    		cc.log(ZG2);   
    		//跟踪人 2016-2-25  如果线索跟踪人不发生改变，就不会提交上去
    		var GZR=Ext.getCmp('BCI_clueHandleDirector_XSGZR').getValue();
    		GZR=eval("("+ GZR+")");
    		//团队成员
    		var TdCy=Ext.getCmp('BCI_clueHandleDirector_TDCY').getValue();
    		cc.log(TdCy);
    		TdCy=eval("("+ TdCy+")");
    		
    		var param = {};
    		param.userID=userID;
    		param.clueModel=formValueTwo;
    		param.fields=formValueModel.getFields().keys;
    		if(GZR!=''&&GZR!=null&&GZR!=undefined){
    			param.position=GZR;//跟踪人
    		};
    		param.organization=ZG2;//组织
    		
    		if(AO=='分派营业员'){
				   cc.log('团队成员分派前');
				   cc.log(TdCy);
				   cc.log(GZR);
				   var numGZR=GZR.length;//线索跟踪人
				   var numTdCy=TdCy.length;//团队成员
				   for(var i=0;i<numGZR;i++){
					   var xs=GZR[i];
					   var trim={};
					   trim.ActiveLastName=xs.ActiveLastName; //"陆 佳慧"
					   trim.ActiveFirstName=xs.ActiveFirstName;
					   trim.LastName=xs.LastName; //"陆 佳慧"
					   trim.FirstName=xs.FirstName;
						
					   trim.IsPrimaryMVG=xs.IsPrimaryMVG; //"Y";
					   trim.Id=xs.Id;                      //团队成员职位ID
					   trim.PrimaryEmployeeId=xs.PrimaryEmployeeId;      //"1-QYKBIK"
					   trim.Name=xs.Name;//: "HEL_汕头司_报价员"
					   trim.Division=xs.Division;  //所属司
					   trim.ActiveLoginName=xs.ActiveLoginName;
					   TdCy[numTdCy]=trim;
					   numTdCy++;
				   };
				   cc.log('团队成员分派后');
				   cc.log(TdCy);
				   param.HLPosition=TdCy; //团队成员
			};  
			   
    		//param.HLPosition=TdCy; //团队成员
    		//param.ViewMode='All';
    		   param.ViewMode='Organization';
    		   cc.log('---------HH----------------');
    		   cc.log(param);
    		   var Trim = {
    		   		   adpName:'HttpAdapter_PAD_Custom',
    		   		   prodName:'clueSynchronize',
    		   		   parameters: param,
    		   		   obj:obj,
    		   		   LoadNum:2
    		   };
    		   object.getApplication().getController('OpportunityManagement.Director.ClueHandleDirector_BCICtrl').ZgClXSXQ_GGFF(obj,Trim,getResult);
    		   
    	};
		
	},
	
	
	//公共方法第二步
	ZXDGGFF_Two:function(obj,id){
		getResult=function(data){
			var Msg=data.Approve_Output.ErrorMsg;
			cc.log(Msg);
			if(Msg){
				Ext.Msg.alert("温馨提示",Msg);
				return;
			};
			Ext.Msg.alert("温馨提示","执行成功");
			var LeadStatus=obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').LeadStatus;
			cc.log('线索状态2:'+LeadStatus);
			if(LeadStatus=='已接收'){
				data.obj.BackView();
			}else{
				data.obj.BackView();
				data.obj.BackView();
			};
			
			data.obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.HQSalesRepCtrl').storeData = null;
			data.obj.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore').removeAll();
			
			//清理线索跟踪人
			data.obj.getStore('ClueResultStore','HelcPAD.store.OpportunityManagement.Director.Clue.ClueResultStore').setData([]);
			
			//清空关联商机数据
			var DataClue=Ext.data.StoreManager.get('ClueProjectListStore');
			if(!DataClue){
					DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueProjectListStore');
			};
			DataClue.removeAll(true);
			
			//只对待处理线索有效
			//清空list的待处理线索
			var index=obj.getApplication().getController('OpportunityManagement.Director.ToDoClueNewCtrl').TDlistNum;
			cc.log('index:'+index);
			//判断是“线索查询”还是“待处理线索”
			var SSLY=obj.getApplication().getController('login.PADManagerMainCtrl').SSLY;
			if(SSLY=='待处理线索'){
				var DataClue=Ext.data.StoreManager.get('ClueDirectorStore');
				if(!DataClue){
					DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueDirectorStore');
				};
				DataClue.removeAt(index);
				//更新待审核线索数量
				obj.getApplication().getController('OpportunityManagement.Director.ToDoClueNewCtrl').tdcn_Public(obj.getApplication().getController('login.PADMainCtrl'),true);
			}else if(SSLY=='线索查询'){
				var DataClue=Ext.data.StoreManager.get('ClueDirectorXSCXStore');
				if(!DataClue){
					DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueDirectorXSCXStore');
				};
				DataClue.removeAt(index);
			};
		
			
		};
		
		var param = {};
		param.userID=userID;
		param.LeadId=id;
		var Trim = {
		   		   adpName:'HttpAdapter_PAD_Custom',
		   		   prodName:'clueSynchronizeTwo',
		   		   parameters: param,
		   		   obj:obj,
		   		   LoadNum:1
		};
		object.getApplication().getController('OpportunityManagement.Director.ClueHandleDirector_BCICtrl').ZgClXSXQ_GGFF(obj,Trim,getResult);
		   
	},
	
	//返回
	/*clueHandleDirector_FH:function(){
		this.BackView();
		this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.HQSalesRepCtrl').storeData = null;
		this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore').removeAll();
		//清理线索跟踪人和团队成员
		this.getStore('ClueResultStore','HelcPAD.store.OpportunityManagement.Director.Clue.ClueResultStore').setData([]);
		//关联商机
		var DataClue=Ext.data.StoreManager.get('ClueProjectListStore');
		if(!DataClue){
			DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueProjectListStore');
		};
		DataClue.setData([]);
	},*/
	
	//团队成员
	/*Clue_TDCY_XZ:function(){
		var glsj_ZT=Ext.getCmp('Clue_LeadStatus').getValue();
		if(glsj_ZT!='审批中'){
			Ext.Msg.alert("温馨提示",'线索状态不为审批');
			return;
		};
		//userID='0993';
		//判断是否有团队人员,虽然没有必要
		var TdRy=Ext.getCmp('clueHandleDirector_TDCY').getValue();
		cc.log('查看团队成员:'+TdRy);
		var bb=eval("("+ TdRy+")");
		cc.log(bb);
		cc.log(bb[0].ActiveLoginName);
		this.NextView('cluePeopleSelectView','HelcPAD.view.OpportunityManagement.Director.Clue.CluePeopleSelectView');
		Ext.getCmp('cluePeopleSelectViewToolbar').setTitle('团队成员');
		this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Director.Clue.CluePeopleSelectViewCtrl').CFID ='clueHandleDirector_TDCY'; 
		this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Director.Clue.CluePeopleSelectViewCtrl').ZYID = 'Clue_TDCY';
		//return;
		
		if(TdRy){
			this.getStore('ClueResultStore','HelcPAD.store.OpportunityManagement.Director.Clue.ClueResultStore').setData(bb);
			//强制选择标签处于活动状态
		    var tp_chart=Ext.getCmp('cluePeopleSelectView');
		    cc.log(tp_chart);
		    var itemid=tp_chart.getActiveItem().getId();
		    cc.log('itemid:'+itemid);
		    var tab=tp_chart.getInnerItems();
		    tp_chart.setActiveItem(tab[1]);
		};
	},*/
	
	//线索跟踪人
	/*Clue_XSGZR_XZ:function(){
		var glsj_ZT=Ext.getCmp('Clue_LeadStatus').getValue();
		if(glsj_ZT!='审批中'){
			Ext.Msg.alert("温馨提示",'线索状态不为审批');
			return;
		};
		//userID='0993';
		//判断是否有线索跟踪人,虽然没有必要
		var XsGzr=Ext.getCmp('clueHandleDirector_XSGZR').getValue();
		cc.log('查看线索跟踪人:'+XsGzr);
		var bb=eval("("+ XsGzr+")");
		cc.log(bb);
		//cc.log(bb[0].ActiveLoginName);
		this.NextView('cluePeopleSelectView','HelcPAD.view.OpportunityManagement.Director.Clue.CluePeopleSelectView');
		Ext.getCmp('cluePeopleSelectViewToolbar').setTitle('线索跟踪人');
		this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Director.Clue.CluePeopleSelectViewCtrl').CFID ='clueHandleDirector_XSGZR'; 
		this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Director.Clue.CluePeopleSelectViewCtrl').ZYID = 'Clue_XSGZR';
		
		if(XsGzr!='[]'){
			this.getStore('ClueResultStore','HelcPAD.store.OpportunityManagement.Director.Clue.ClueResultStore').setData(bb);
			//强制选择标签处于活动状态
		    var tp_chart=Ext.getCmp('cluePeopleSelectView');
		    cc.log(tp_chart);
		    var itemid=tp_chart.getActiveItem().getId();
		    cc.log('itemid:'+itemid);
		    var tab=tp_chart.getInnerItems();
		    tp_chart.setActiveItem(tab[1]);
		};
	
	},*/
	
	//关联商机
	/*Clue_GLSJ_XZ:function(){
		var glsj_ZT=Ext.getCmp('Clue_LeadStatus').getValue();
		if(glsj_ZT!='审批中'){
			Ext.Msg.alert("温馨提示",'线索状态不为审批');
			return;
		};
		
		var obj=this;
		var clueHandleDirector = Ext.getCmp('clueHandleDirector');
		//获取当前页面
		var Cd_BCI=clueHandleDirector.getRecord();
		cc.log(Cd_BCI);
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
		
		getResult=function(obj,data){
			cc.log('data:'+data);
			obj.NextView('clueProjectList','HelcPAD.view.OpportunityManagement.Director.ClueProjectList');
			var DataClue=Ext.data.StoreManager.get('ClueProjectListStore');
			if(!DataClue){
				DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueProjectListStore');
			};
			Ext.getCmp('clueProjectList_hidden').setValue('主管使用');
			if(data==undefined){
				//Ext.Msg.alert("温馨提示",'500米内无关联商机');
				var htmel=['<div style="font-size:12px;width:100%">'+
			            	'<div style="float:left;width:100%">当前范围搜寻不到关联商机</div>'+
			            	'</div>'];
				Ext.getCmp('clueProjectList_list').setItemTpl(htmel);
				
				DataClue.setData([{Name:'没有'}]);
			}else{
				DataClue.setData(data);
			};
			//记录查询条件
			Ext.getCmp('clueProjectList_hidden_TJ').setValue(ggZH);
		};
		var Trim={
				NewQuery:true,
				SearchSpec:ggZH,
				PageSize:'20',
				SortSpec:'Created(DESCENDING)',
				ViewMode:'Manager',
				StartRowNum:'0',
				userID:userID,
		};
		cc.log(ggZH);
		this.MapX=Cd_BCI.data.XHeight;
		this.MapY=Cd_BCI.data.YCoordinate;
		cc.log('MapX:'+this.MapX+'  MapY:'+this.MapY);
		obj.getApplication().getController('OpportunityManagement.Director.ClueHandleDirector_BCICtrl').BCI_GLSJ_GGFF(obj,Trim,getResult,3);
	},*/
	
	
	//旧
	/*YanZhen:function(){
		//线索详细
		var Data=this.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').BCIData;
		//主管操作   就是审批操作
		var ZGCZ=Ext.getCmp('Clue_ApproveOperate').getValue();
		//商机状态
		//var SJZT=Ext.getCmp('Clue_OpptyStatus').getValue();
		//主管驳回意见
		var ZGBHYJ=Ext.getCmp('Clue_ManagerRejectComments').getValue();
		//线索状态
		var XSZT=Ext.getCmp('Clue_LeadStatus').getValue();
		
		if(ZGCZ=='请选择'){
			Ext.Msg.alert("温馨提示","请选择主管操作");
			return true;
		};
		
		if(XSZT=='审批中'){
			if(ZGCZ=='同意报备新建商机'){
				//cc.log('--------------');
				//cc.log(Data);
				//线索跟踪人1
				var XSGZR=Data.ListOfHELLead_AgentPosition;
				//cc.log(XSGZR);
				//线索跟踪人2
				var gzr = this.getStore('ClueResultStore','HelcPAD.store.OpportunityManagement.Director.Clue.ClueResultStore');
				if(XSGZR==""){
					//cc.log(gzr.getCount());
					if(gzr.getCount()>0){
						return false;
					};
					Ext.Msg.alert("温馨提示","线索跟踪人为空");
					return true;
				};
				//归属营公司
				var fgs=Data.ListOfHELLead_Organization.HELLead_Organization.Organization;
				if(fgs==undefined){
					Ext.Msg.alert("温馨提示","归属营分司为空");
					return true;
				};
			};
			
		
			if(ZGCZ=='报备加入已有商机'){
				if(Data.Id==''&&Data.Id==null){
					Ext.Msg.alert("温馨提示","线索编号为空");
					return true;
				};
			};
			
			//商机编号
			var SJBH=Ext.getCmp('Clue_GLSJ').getValue();
			cc.log('SJBH:'+SJBH);
			if(ZGCZ=='加入商机拒绝报备'){
				if(!SJBH){
					Ext.Msg.alert("温馨提示","关联商机为空");
					return true;
				}
			};
			
			if(ZGCZ=='驳回线索'){
				if(ZGBHYJ=='请选择'){
					Ext.Msg.alert("温馨提示","主管驳回意见为空");
					return true;
				};
				if(ZGBHYJ=='此项目已报备'||ZGBHYJ=='无需继续此项目跟踪'){
					Ext.Msg.alert("温馨提示","不允许主管驳回意见");
					return true;
				};
			};
			
			if(ZGCZ=='确认关联商机'){
				if(!SJBH){
					Ext.Msg.alert("温馨提示","关联商机为空");
					return true;
				};
			};
		}else if(XSZT=='报备成功'){
			if(ZGCZ=='移出报备'){
				return true;
			};
		};
		
		return false;
	},*/

});