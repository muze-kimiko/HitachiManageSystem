
/* JavaScript content from app/controller/install/ITM/ITM_List_Ctrl.js in folder common */
Ext.define('HelcPDA.controller.install.ITM.ITM_List_Ctrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
		},
		control:{
			//进入到同步页面
			"button#btn_ITM_update":{
				tap:'btn_ITM_update'
			},
			//同步
			"button#itm_getdata_btn":{
				tap:'itm_getdata_btn'
			},
			//进入到查询页面
			"button#btn_ITM_search":{
				tap:'btn_ITM_search'
			},
			//查询
			"button#ITM_searchdata_btn":{
				tap:'ITM_searchdata_btn'
			},
			//返回到ITM首页
			"button#back_to_ITM_List":{
				tap:'back_to_ITM_List'
			},
			//点击第一个list进入合同层
			"list#ITM_List":{
				itemtap:'ITM_List'
			},
			//工号反选
			"button#itm_check_invert":{
				tap:'itm_check_invert'
			},
			//工号全选
			"button#itm_check_all":{
				tap:'itm_check_all'
			},
			//提交ITM
			"button#CommitITM":{
				tap:'CommitITM'
			},
		}
	},
	
	
	//进入到查询页面
	btn_ITM_search : function(){
		this.NextView('ITM_search_vid','HelcPDA.view.install.ITM.ITM_Search_V');
	},
	
	
	//查询
	ITM_searchdata_btn : function(){
		var obj  = this;
		var ENGCONTRACT_NUMBER = Ext.getCmp('itm_instpro_con_s').getValue();
		var ELEVATOR_NO = Ext.getCmp('itm_instpro_eno_s').getValue();
		this.showBackView('ITM_list_id','HelcPDA.view.install.ITM.ITM_List_V');
		var store=obj.getStore('ITMListStore','HelcPDA.model.install.ITM.ITMListStore');
		var query={tcode:"ITM_data"};
		var options={exact:false};
		WL.JSONStore.get(collectionName).find(query,options).then(function(res){
			var ENGCONTRACT_NUMBER_LIST=[];
			var ELEVATOR_NO_LIST=[];
			var cs = 0;
			for(var i=0;i<res.length-1;i++){
				var json_ENGCONTRACT_NUMBER = res[i].json.stext.ENGCONTRACT_NUMBER;
				var json_ELEVATOR_NO = res[i].json.stext.ELEVATOR_NO;
				if(json_ENGCONTRACT_NUMBER.indexOf(ENGCONTRACT_NUMBER) >=0 && json_ELEVATOR_NO.indexOf(ELEVATOR_NO)>=0){
					ENGCONTRACT_NUMBER_LIST[cs]=json_ENGCONTRACT_NUMBER;
					ELEVATOR_NO_LIST[cs]=json_ELEVATOR_NO;
					cs++;
				};
			};
			var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
			var UNIQ_CUSTOMER_NAME=[];
			var NUM=[];
			for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
				NUM[i]=0;
				for(var j=0;j<res.length;j++){
					if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==res[j].json.stext.ENGCONTRACT_NUMBER){
						NUM[i]++;
						UNIQ_CUSTOMER_NAME[i]=res[j].json.stext.CUSTOMER_NAME;
					}
				}
			}
			var NEW_NEED_LIST=[];
			for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
				var CNTER_NEED={};
			  	CNTER_NEED.ENGCONTRACT_NUMBER=UNIQ_ENGCONTRACT_NUMBER_LIST[i];
			  	CNTER_NEED.CUSTOMER_NAME=UNIQ_CUSTOMER_NAME[i];
			  	CNTER_NEED.NUM=NUM[i];
			  	NEW_NEED_LIST[i]=CNTER_NEED;
			}
			store.setData(NEW_NEED_LIST);
		});
	},
	
	//进入到同步页面
	btn_ITM_update : function(){
		this.NextView('ITM_sel_vid','HelcPDA.view.install.ITM.ITM_Selection_V');
	},
	
	//ITM同步
	itm_getdata_btn : function(){
		var obj = this;
		var store=this.getStore('ITMListStore','HelcPDA.store.install.ITM.ITMListStore');
		store.setData([]);
		var removequery={tcode:"ITM"};
		var removeoptions={exact:false};
		WL.JSONStore.get(collectionName).remove(removequery,removeoptions).then(function(){
		}).fail(function(){
			Ext.Msg.alert("删除本地数据失败");
		});
		
		var ENGCONTRACT_NUMBER = Ext.getCmp('itm_con').getValue();
		var ELEVATOR_NO = Ext.getCmp('itm_eno').getValue();
		var CUSTOMER_NAME = Ext.getCmp('itm_pro').getValue();
		obj.showBackView('ITM_list_id','HelcPDA.view.install.ITM.ITM_List_V');
		var contentdata={init_person_id:init_person_id,ENGCONTRACT_NUMBER:ENGCONTRACT_NUMBER,ELEVATOR_NO:ELEVATOR_NO,CUSTOMER_NAME:CUSTOMER_NAME};
		var content = JSON.stringify(contentdata);
		
		function getResult(res){
			if(res.item.length ==0){
				WL.Toast.show("找不到对应数据");
			}else{
				//循环添加每一条到JSONStore
				var ndata=[];
				var statusndata=[];
				var list = res.item;
				var stauts = res.progress;
				for(var i=0;i<list.length;i++){
					var query={tcode:"ITM_data",tid:list[i].ENGCONTRACT_NUMBER+'_'+list[i].ELEVATOR_NO+'_'+list[i].SEQ_NUM,stext:list[i]};
					ndata[i]=query;
					var query1={tcode:"ITM_status",tid:list[i].ENGCONTRACT_NUMBER+'_'+list[i].ELEVATOR_NO+'_'+list[i].SEQ_NUM,stext:stauts[i].P_STATUS};
					statusndata[i]=query1;
				}
				if(ndata.length==0){
					 WL.Toast.show("找不到对应数据");
				}else{
					WL.JSONStore.get(collectionName).add(ndata).then(function(){
						WL.JSONStore.get(collectionName).add(statusndata).then(function(){
							//保存成功后，另存一个list给第一次进来ITM显示用
							var query2={tcode:"ITM_data"};
							var options2={
									exact:true,
							};
							WL.JSONStore.get(collectionName).find(query2,options2).then(function(res){
								var list = res;
								var ENGCONTRACT_NUMBER_LIST=[];  
								for(var i=0;i<list.length;i++){
									ENGCONTRACT_NUMBER_LIST[i]=list[i].json.stext.ENGCONTRACT_NUMBER;
								}
								var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
								var UNIQ_CUSTOMER_NAME=[];
								var NUM=[];
								for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
									NUM[i]=0;
									for(var j=0;j<list.length;j++){
										if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==list[j].json.stext.ENGCONTRACT_NUMBER){
											NUM[i]++;
											UNIQ_CUSTOMER_NAME[i]=list[j].json.stext.CUSTOMER_NAME;
										}
									}
								}
								var NEW_NEED_LIST=[];
								for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
									var CNTER_NEED={};
									CNTER_NEED.ENGCONTRACT_NUMBER=UNIQ_ENGCONTRACT_NUMBER_LIST[i];
									CNTER_NEED.CUSTOMER_NAME=UNIQ_CUSTOMER_NAME[i];
									CNTER_NEED.NUM=NUM[i];
									NEW_NEED_LIST[i]=CNTER_NEED;
								}
								
								store.setData(NEW_NEED_LIST);
								WL.Toast.show("更新成功，已经是最新数据");
								
								var query={tcode:"ITM_data",tid:"ITM_list"};
								var options={exact:true};
								WL.JSONStore.get(collectionName).remove(query,options).then(function(){
									//保存第一张list界面生成的数据放在本地，离线时使用
									var query={tcode:"ITM_data",tid:"ITM_list",stext:NEW_NEED_LIST};
									WL.JSONStore.get(collectionName).add(query).then(function(){
									}).fail(function(err){
										Ext.Msg.alert("第一张list添加失败");
									});
								}).fail(function(){
									Ext.Msg.alert("删除list列表失败");
								});
								
							}); 
						}).fail(function(err){
							Ext.Msg.alert("添加数据失败2");
						});
					}).fail(function(err){
						Ext.Msg.alert("添加数据失败1");
					});
				}
			}
			
		}
		this.connectServer(getResult,'installProcessITMAction.do?method=toSearch', content);
	},
	
	
	//返回到ITM首页
	back_to_ITM_List : function(){
		this.showBackView('ITM_list_id','HelcPDA.view.install.ITM.ITM_List_V');
		var ITMGHStore = this.getStore("ITMGHStore","HelcPDA.store.install.ITM.ITMGHStore");
		ITMGHStore.setData([]);
	},
	
	
	//点击第一个list进入工号层
	ITM_List : function(obj,index,target,record,e,eOpts){
		var obj = this;
		var store=obj.getStore('ITMListStore','HelcPDA.store.install.ITM.ITMListStore');
		var ENGCONTRACT_NUMBER=store.getAt(index).get('ENGCONTRACT_NUMBER');
		
		obj.LoadGHlist(ENGCONTRACT_NUMBER);
		
		this.NextView('ITM_EnoList_V','HelcPDA.view.install.ITM.ITM_EnoList_V');
		
	},
	
	LoadGHlist : function(ENGCONTRACT_NUMBER){
		var obj = this;
		var datas =[];
		var query={tcode:"ITM_data",tid:ENGCONTRACT_NUMBER};
		var options={
	    		   exact:false,
	    }; 
		WL.JSONStore.get(collectionName).find(query,options).then(function(res){
			var query1={tcode:"ITM_status",tid:ENGCONTRACT_NUMBER};
			var options1={
		    		   exact:false,
		    }; 
			
			WL.JSONStore.get(collectionName).find(query1,options1).then(function(res1){
				for(var i=0;i<res.length;i++){
					var data = {};
					for(var j=0;j<res1.length;j++){
						if(res[i].json.tid == res1[j].json.tid){
							data.ENGCONTRACT_NUMBER=res[i].json.stext.ENGCONTRACT_NUMBER;
							data.SEQ_NUM=res[i].json.stext.SEQ_NUM;
							data.ELEVATOR_NO=res[i].json.stext.ELEVATOR_NO;
							if(res1[j].json.stext == "COMPLEMENT"){
								data.P_STATUS="已完工";
							}else if(res1[j].json.stext == "GOV_CHECK_DATE"){
								data.P_STATUS="技检已发证";
							}else if(res1[j].json.stext == "CHECK_DATE"){
								data.P_STATUS="已验收";
							}else if(res1[j].json.stext == "REPORT_CHECK_DATE"){
								data.P_STATUS="已报检";
							}else if(res1[j].json.stext == "DEBUG_END_DATE"){
								data.P_STATUS="已调试结束";
							}else if(res1[j].json.stext == "REPORT_DEBUG_DATE"){
								data.P_STATUS="已报调";
							}else if(res1[j].json.stext == "ENTRANCE_DATE"){
								data.P_STATUS="已进场";
							}else if(res1[j].json.stext == "LIFT_END_DATE"){
								data.P_STATUS="已吊装";
							}else if(res1[j].json.stext == ""){
								data.P_STATUS="未完成吊装";
							}
							
						}
					}
					datas[i] = data;
				}
				var ITMGHStore = obj.getStore('ITMGHStore','HelcPDA.store.install.ITM.ITMGHStore');
				var softdatas = obj.GHsoft(datas);
				ITMGHStore.setData(softdatas);
			});
			
		});
	},
	
	//排序
	GHsoft : function(datas){
		for(var i = datas.length-1;i>0;i--){
			for(var j=0;j<i;j++){
				if(datas[i].ELEVATOR_NO < datas[j].ELEVATOR_NO){
					var temp = datas[i];
					datas[i] = datas[j];
					datas[j] = temp;
				}
			}
		}
		return datas;
	},
	
	
	//工号反选
	itm_check_invert : function(){
		
		var sele=document.getElementsByName('itm_ENO_Checkbox');
		 // 遍历 form  
	    for ( var i = 0; i <sele.length; i++)  
	    {  
	      // 提取控件  
	      var checkbox = sele[i];  
	      var color= checkbox.style.color;
	      console.log('color: '+color);
    	  if(checkbox.style.color==''){
    		  checkbox.style.color='#e03a3e';
    	  }else if(checkbox.style.color=='rgb(204, 204, 204)'){
    		  //是未选中的情况下
    		  checkbox.style.color='#e03a3e';
    	  }else if(checkbox.style.color=='rgb(224, 58, 62)'){
    		//是选中的情况下
    		  checkbox.style.color='#ccc';
    	  };
	    }
	},
	
	
	//工号全选
	itm_check_all : function(){
		var sele=document.getElementsByName('itm_ENO_Checkbox');
		console.log(sele.length);
		console.log(sele);
		  // 遍历 form  
	    for ( var i = 0; i <sele.length; i++)  
	    {  
	      // 提取控件  
	      var checkbox = sele[i]; 
	      checkbox.style.color='#e03a3e';
	    }  
	},
	
	
	//提交ITM
	CommitITM : function(){
		var obj = this;
		var show={};
		var value={};
		
		
		//show数据
		var ENGCONTRACT_NUMBER = Ext.getCmp('itm_ENGCONTRACT_NUMBER').getValue();
		var ELEVATOR_NO = Ext.getCmp('itm_ELEVATOR_NO').getValue();
		var SEQ_NUM=Ext.getCmp('itm_SEQ_NUM').getValue();
		var query={tcode:"ITM_data",tid:ELEVATOR_NO+'_'+SEQ_NUM};
		var options={
	    		   exact:false,
	       }; 
		WL.JSONStore.get(collectionName).find(query,options).then(function(res){
			show = res[0].json.stext;
			//value数据
			var itm_LIFT_START_DATE = "";
			if(Ext.getCmp('itm_LIFT_START_DATE').getValue() != null){
				itm_LIFT_START_DATE = Ext.Date.format(Ext.getCmp('itm_LIFT_START_DATE').getValue(),'Y-m-d');
			};
			
			var itm_LIFT_END_DATE = "";
			if(Ext.getCmp('itm_LIFT_END_DATE').getValue() != null){
				itm_LIFT_END_DATE = Ext.Date.format(Ext.getCmp('itm_LIFT_END_DATE').getValue(),'Y-m-d');
			};
			
			var itm_ENTRANCE_DATE = "";
			if(Ext.getCmp('itm_ENTRANCE_DATE').getValue() != null){
				itm_ENTRANCE_DATE = Ext.Date.format(Ext.getCmp('itm_ENTRANCE_DATE').getValue(),'Y-m-d');
			};
			
			var itm_ENTRANCE_ENTER_DATE = "";
			if(Ext.getCmp('itm_ENTRANCE_ENTER_DATE').getValue() != null){
				ENTRANCE_ENTER_DATE = Ext.getCmp('itm_ENTRANCE_ENTER_DATE').getValue();
				if(ENTRANCE_ENTER_DATE == ""){
					itm_ENTRANCE_ENTER_DATE = "";
				}else{
					str = new Date(ENTRANCE_ENTER_DATE);
					itm_ENTRANCE_ENTER_DATE = Ext.Date.format(str,'Y-m-d h:m:s');
				};
			};
			
			var itm_REPORT_DEBUG_DATE = "";
			if(Ext.getCmp('itm_REPORT_DEBUG_DATE').getValue() != null){
				itm_REPORT_DEBUG_DATE = Ext.Date.format(Ext.getCmp('itm_REPORT_DEBUG_DATE').getValue(),'Y-m-d');
			};
			
			var itm_REPORT_DEBUG_ENTER_DATE = "";
			if(Ext.getCmp('itm_REPORT_DEBUG_ENTER_DATE').getValue() != null){
				REPORT_DEBUG_ENTER_DATE = Ext.getCmp('itm_REPORT_DEBUG_ENTER_DATE').getValue();
				if(REPORT_DEBUG_ENTER_DATE == ""){
					itm_REPORT_DEBUG_ENTER_DATE = "";
				}else{
					str = new Date(REPORT_DEBUG_ENTER_DATE);
					itm_REPORT_DEBUG_ENTER_DATE = Ext.Date.format(str,'Y-m-d h:m:s');
				};
			};
			//后台需要数据，但不是用户输入，直接继承数据
			var itm_SUSPEND_VENDOR_ID = show.VALUE.SUSPEND_VENDOR_ID;
			var itm_LIFT_PERSON_ID = show.VALUE.LIFT_PERSON_ID;
			var itm_BUILD_START_DATE = show.VALUE.BUILD_START_DATE;
			var itm_BUILD_END_DATE = show.VALUE.BUILD_END_DATE;
			var itm_BUILD_VENDOR_ID = show.VALUE.BUILD_VENDOR_ID;
			var itm_BUILD_PERSON_ID = show.VALUE.BUILD_PERSON_ID;
			var itm_LIFT_COMMENTS = show.VALUE.LIFT_COMMENTS;
			var itm_INST_VENDOR_ID = show.VALUE.INST_VENDOR_ID;
			var itm_INST_PERSON_ID = show.VALUE.INST_PERSON_ID;
			var itm_REPORT_INSTALL_DATE = show.VALUE.REPORT_INSTALL_DATE;
			var itm_INSTALL_FINISH_DATE = show.VALUE.INSTALL_FINISH_DATE;
			var itm_QA_VALUE = show.VALUE.QA_VALUE;
			var itm_INST_VALUE = show.VALUE.INST_VALUE;
			var itm_ENCIRCLE_VALUE = show.VALUE.ENCIRCLE_VALUE;
			var itm_MID_CHECK_PERSON_ID = show.VALUE.MID_CHECK_PERSON_ID;
			var itm_MID_CHECK_DATE = show.VALUE.MID_CHECK_DATE;
			var itm_KEN_CHECK_RESULT = show.VALUE.KEN_CHECK_RESULT;
			var itm_INSTTALL_COMMENTS = show.VALUE.INSTTALL_COMMENTS;
			
			
			value={
					LIFT_START_DATE:itm_LIFT_START_DATE,LIFT_END_DATE:itm_LIFT_END_DATE,ENTRANCE_DATE:itm_ENTRANCE_DATE,
					ENTRANCE_ENTER_DATE:itm_ENTRANCE_ENTER_DATE,REPORT_DEBUG_DATE:itm_REPORT_DEBUG_DATE,REPORT_DEBUG_ENTER_DATE:itm_REPORT_DEBUG_ENTER_DATE,

					SUSPEND_VENDOR_ID:itm_SUSPEND_VENDOR_ID,LIFT_PERSON_ID:itm_LIFT_PERSON_ID,BUILD_START_DATE:itm_BUILD_START_DATE,
					BUILD_END_DATE:itm_BUILD_END_DATE,BUILD_VENDOR_ID:itm_BUILD_VENDOR_ID,BUILD_PERSON_ID:itm_BUILD_PERSON_ID,
					LIFT_COMMENTS:itm_LIFT_COMMENTS,INST_VENDOR_ID:itm_INST_VENDOR_ID,INST_PERSON_ID:itm_INST_PERSON_ID,
					REPORT_INSTALL_DATE:itm_REPORT_INSTALL_DATE,INSTALL_FINISH_DATE:itm_INSTALL_FINISH_DATE,QA_VALUE:itm_QA_VALUE,
					INST_VALUE:itm_INST_VALUE,ENCIRCLE_VALUE:itm_ENCIRCLE_VALUE,MID_CHECK_PERSON_ID:itm_MID_CHECK_PERSON_ID,
					MID_CHECK_DATE:itm_MID_CHECK_DATE,MID_CHECK_DATE:itm_MID_CHECK_DATE,KEN_CHECK_RESULT:itm_KEN_CHECK_RESULT,INSTTALL_COMMENTS:itm_INSTTALL_COMMENTS
			};
			
			var contentdata={init_person_id:init_person_id,show:show,value:value};
			var content = JSON.stringify(contentdata);
			
			var getResult=function(res){
				WL.Toast.show("提交成功"); 
				
				
				//保存成功后把数据保存在本地
				show.VALUE.LIFT_START_DATE = itm_LIFT_START_DATE;
				show.VALUE.LIFT_END_DATE = itm_LIFT_END_DATE;
				show.VALUE.ENTRANCE_DATE = itm_ENTRANCE_DATE;
				show.VALUE.ENTRANCE_ENTER_DATE = itm_ENTRANCE_ENTER_DATE;
				show.VALUE.REPORT_DEBUG_DATE = itm_REPORT_DEBUG_DATE;
				show.VALUE.REPORT_DEBUG_ENTER_DATE = itm_REPORT_DEBUG_ENTER_DATE;
				//数据
				var query1={tcode:"ITM_data",tid:ENGCONTRACT_NUMBER+'_'+ELEVATOR_NO+'_'+SEQ_NUM};
				var options={exact:false};
				WL.JSONStore.get(collectionName).remove(query1,options).then(function(){
					var query2={tcode:"ITM_data",tid:ENGCONTRACT_NUMBER+'_'+ELEVATOR_NO+'_'+SEQ_NUM,stext:show};
					WL.JSONStore.get(collectionName).add(query2).then(function(){
						console.log('保存更改数据成功');  
					}).fail(function(){
						Ext.Msg.alert("删除本地数据失败");
					});
				
				});
				//状态
				var query={tcode:"ITM_status",tid:ENGCONTRACT_NUMBER+'_'+ELEVATOR_NO+'_'+SEQ_NUM};
				var options={
			    		   exact:false,
			       }; 
				WL.JSONStore.get(collectionName).find(query,options).then(function(res){
					var _id = res[0]._id;
					var Startstatus = res[0].json.stext;
					var status = "";
					if(itm_REPORT_DEBUG_DATE != ""){
						status = "REPORT_DEBUG_DATE";
					}else if(itm_ENTRANCE_DATE != ""){
						status = "ENTRANCE_DATE";
					}else if(itm_LIFT_END_DATE != "" ){
						status = "LIFT_END_DATE";
					}else if(itm_LIFT_END_DATE == "" ){
						status = "";
					};
					
					res[0].json.stext = status;
//					var requey0 = {_id:res[0]._id,json:{tcode:"ITM_status",tid:ENGCONTRACT_NUMBER+'_'+ELEVATOR_NO+'_'+SEQ_NUM,stext:stext}};
//					WL.JSONStore.get(collectionName).refresh(res).then(function(arrayResults2){
//						WL.JSONStore.get(collectionName).find(query).then(function(res){
//							var status = res;
//						});
//						WL.Toast.show('保存成功！');
//						alert("状态更新成功");
//						obj.LoadGHlist(ENGCONTRACT_NUMBER);
//						obj.NextView('ITM_EnoList_V','HelcPDA.view.install.ITM.ITM_EnoList_V');
//					}).fail(function(errorObject){
//						Ext.Msg.alert("删除本地状态失败");
//					});
					
					var query1={tcode:"ITM_status",tid:ENGCONTRACT_NUMBER+'_'+ELEVATOR_NO+'_'+SEQ_NUM,stext:Startstatus};
					WL.JSONStore.get(collectionName).remove(query1).then(function(){
						var query2={tcode:"ITM_status",tid:ENGCONTRACT_NUMBER+'_'+ELEVATOR_NO+'_'+SEQ_NUM,stext:status};
						WL.JSONStore.get(collectionName).add(query2).then(function(){
							WL.JSONStore.get(collectionName).find(query).then(function(res){
								var s=res;
							});
							obj.LoadGHlist(ENGCONTRACT_NUMBER);
							obj.NextView('ITM_EnoList_V','HelcPDA.view.install.ITM.ITM_EnoList_V');
						}).fail(function(){
							Ext.Msg.alert("删除本地数据失败");
						});
					});
					
					
					
				});
				
				
			};
			
			obj.connectServer(getResult,'installProcessITMAction.do?method=toAdd', content);
			
		});
			
	},
});
