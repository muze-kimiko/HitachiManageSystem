Ext.define('HelcPDA.controller.install.InstallProjectCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		control:{
			"list#install_project_list":{
				itemtap:'install_project_list'
			},
		}
	},
	
	install_project_list : function(obj,index,target,record,e,eOpts){
		var obj = this;
		var title = record.data.title;
		if(title == '安装任务'){
			obj.NextView('installtask_id','HelcPDA.view.install.installtask.installTask');
			var coll=WL.JSONStore.get(collectionName);
	  	    var options={};
	  	    tcodeId='INSTALL_TASK_ANTRANCE';
	  	    var data={tcode:tcodeId};
	  	    coll.find(data,options).then(function(arrayResults){
	  		if(arrayResults.length==0){
	  			WL.Toast.show('没有数据!');
	  			//alert('没有数据');
	  		}else{
	  			var list3=[];
	  		for(var j=0;j<arrayResults.length;j++){
				list3[j]=arrayResults[j].json;
			}
	  		var str=document.getElementById("title_id").innerHTML;
			if(str=='未进场'){
				str=str+'('+list3.length+')';
				document.getElementById("title_id").innerHTML=str;
			}
	  		var ENGCONTRACT_NUMBER_LIST=[];
				var CUSTOMER_NAME_LIST=[];
				for(var i=0;i<list3.length;i++){
					ENGCONTRACT_NUMBER_LIST[i]=list3[i].stext.ENGCONTRACT_NUMBER;
					console.log(list3[i].stext.ENGCONTRACT_NUMBER);
					CUSTOMER_NAME_LIST[i]=list3[i].stext.CUSTOMER_NAME;
				};
				
				var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
				console.log(JSON.stringify(UNIQ_ENGCONTRACT_NUMBER_LIST));
				var UNIQ_CUSTOMER_NAME=CUSTOMER_NAME_LIST.unique3();
				console.log(JSON.stringify(UNIQ_CUSTOMER_NAME));
				
				var NUM=[];
				for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
					NUM[i]=0;
					for(var j=0;j<list3.length;j++){
						if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==list3[j].stext.ENGCONTRACT_NUMBER){
							NUM[i]++;
						}
					}
				};
				console.log(JSON.stringify(NUM));
				
  				//获取唯一合同对应的地址
  				var DuiYingDiZhi=[];
  				for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
  					//如果安装合同号数组，中的合同号等于，获取唯一安装合同号中的合同
  					//那么客户名称对应客户名称数组中的客户名称
  					for(var j=0;j<arrayResults.length;j++){
  						if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==ENGCONTRACT_NUMBER_LIST[j]){
  							DuiYingDiZhi[i]=CUSTOMER_NAME_LIST[j];
  							break;
	  					};
  					};
  				};
				
  				console.log('JKKLKJ   '+JSON.stringify(DuiYingDiZhi));
  				
				var NEW_NEED_LIST=[];
				for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
					var CNTER_NEED={};
					CNTER_NEED.ENGCONTRACT_NUMBER=UNIQ_ENGCONTRACT_NUMBER_LIST[i];
					//CNTER_NEED.CUSTOMER_NAME=UNIQ_CUSTOMER_NAME[i];
					CNTER_NEED.CUSTOMER_NAME=DuiYingDiZhi[i];
					CNTER_NEED.NUM=NUM[i];
					NEW_NEED_LIST[i]=CNTER_NEED;
				}
				console.log(JSON.stringify(NEW_NEED_LIST));
				console.log(NEW_NEED_LIST.length);
				console.log(NEW_NEED_LIST[0]);
				var store=null;
				if(NEW_NEED_LIST.length>0){
					store=Ext.data.StoreManager.get("installtaskStore");
				if(!store){
					store=Ext.create("HelcPDA.store.install.installtask.installtaskStore");
				}
					store.setData(NEW_NEED_LIST,this);
			 }
	  		}
	  	}).fail(function(errorObject){
	  		WL.Toast.show('保存出错!');
//			alert("保持出错");
		});
	  	 tcodeId1='INSTALL_TASK_ENTRANCE';
	  	 var data={tcode:tcodeId1};
	 	  coll.find(data,options).then(function(arrayResults){
	 		if(arrayResults.length==0){
	 			
	 			WL.Toast.show('没有数据!');
	 			//alert('没有数据');
	 		}else{
	 		  var list3=[];
	 		for(var j=0;j<arrayResults.length;j++){
				list3[j]=arrayResults[j].json;
			}
		    		var str=document.getElementById("title_id2").innerHTML;
		    		if(str=='在制'){
				    str=str+'('+list3.length+')';
				  document.getElementById("title_id2").innerHTML=str;
		    		}
		    	 
	 		var ENGCONTRACT_NUMBER_LIST=[];
				  var CUSTOMER_NAME_LIST=[];
				  for(var i=0;i<list3.length;i++){
					  ENGCONTRACT_NUMBER_LIST[i]=list3[i].stext.ENGCONTRACT_NUMBER;
					  console.log(list3[i].stext.ENGCONTRACT_NUMBER);
					  CUSTOMER_NAME_LIST[i]=list3[i].stext.CUSTOMER_NAME;
				  }
				  var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
				  console.log(JSON.stringify(UNIQ_ENGCONTRACT_NUMBER_LIST));
				  var UNIQ_CUSTOMER_NAME=CUSTOMER_NAME_LIST.unique3();
				  console.log(JSON.stringify(UNIQ_CUSTOMER_NAME));
				  var NUM=[];
				  for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
					  NUM[i]=0;
					  for(var j=0;j<list3.length;j++){
						  
						  if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==list3[j].stext.ENGCONTRACT_NUMBER){
							  NUM[i]++;
							  }
					    }
				  }
				  console.log(JSON.stringify(NUM));
				  var NEW_NEED_LIST=[];
				  for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
					  var CNTER_NEED={};
					  CNTER_NEED.ENGCONTRACT_NUMBER=UNIQ_ENGCONTRACT_NUMBER_LIST[i];
					  CNTER_NEED.CUSTOMER_NAME=UNIQ_CUSTOMER_NAME[i];
					  CNTER_NEED.NUM=NUM[i];
					  NEW_NEED_LIST[i]=CNTER_NEED;
				  }
				  
				  console.log(JSON.stringify(NEW_NEED_LIST));
				  console.log(NEW_NEED_LIST.length);
				  console.log(NEW_NEED_LIST[0]);
				  var store=null;
				
					if(NEW_NEED_LIST.length>0){
						 store=Ext.data.StoreManager.get("installtaskStore2");
						 if(!store){
								store=Ext.create("HelcPDA.store.install.installtask.installtaskStore2");
							}
							store.setData(NEW_NEED_LIST,this);
				 }
		 		}
		 	}).fail(function(errorObject){
		 		WL.Toast.show('保存出错!');
			//	alert("保存出错");
			});
		};
		if(title == '确认排产'){
			obj.NextView('InstallProduce_List_VID','HelcPDA.view.install.installtoproduce.InstallProduce_List_V');
		};
		if(title == '箱头发货'){
			obj.NextView('instsb_list_view','HelcPDA.view.install.installsendbox.InstallSendBox_List_V');
    		var obj_v = Ext.getCmp('instsb_list_view');
			obj_v.loadDataJST();
			Ext.getCmp('hfmenu_daiban_flag').setValue('0');
		};
		if(title == '安装计划'){
			var intallplanDBXMnum=2;
			//var this_obj = obj; 
			//首先页面跳转
			obj.NextView("installplan_id","HelcPDA.view.install.installplan.installPlan");
			
			//判断是从待办进还是安装项目进  1  2
			Ext.getCmp('intallplanDBXMnum').setValue(intallplanDBXMnum);
			
			//首先判断JSONStore中是否有数据，没有
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	var query={tcode:'installplantrue'};
	    	var query2={tcode:'installplanfalse'};
	    	var options={
	    			exacte:false,//默认
	    	};
	    	MaintainList.find(query,options).then(function(arrayResults){
				var num=arrayResults.length;
				var titleZZ=document.getElementById("zz");
				var installTcode='installplantrue';
				Ext.getCmp('installTcode').setValue(installTcode);
				
				titleZZ.innerHTML='在制('+num+')';
				if(num!=0){
					obj.AddListPlan();
				}else{
					WL.Toast.show("本地不存在在制数据！");
				};
				//二次
				MaintainList.find(query2,options).then(function(arrayResults){
					var num=arrayResults.length;
					var titleWJC=document.getElementById("wjc");
					titleWJC.innerHTML='未进场('+num+')';
					var installTcode='installplanfalse';
					Ext.getCmp('installTcode').setValue(installTcode);
					
					if(num!=0){
						obj.AddListPlan();
					}else{
						WL.Toast.show("本地不存在未进场数据！");
					};
				}).fail(function(errorObject){
					console.log("查询数据失败");
				});
				
			}).fail(function(errorObject){
				console.log("查询数据失败");
			});
	    	
	    	
	    	
	    	
		};
		if(title == '安装过程'){
			obj.NextView('installprocess_list_id','HelcPDA.view.install.installprocess.InstallProcess_List_V');
			var store=obj.getStore('ProcessListStore','HelcPDA.model.install.installprocess.ProcessListStore');
			store.setData('');   
			
			var WL_process=WL.JSONStore.get(collectionName);
		       var query={tcode:init_person_id+"process",tid:'process_list'};
		       var options={
		    		   exact:true
		       };       
		       WL_process.find(query,options).then(function(res){
		    	   if(res==''||res==null||typeof(res)=='undefined'||res.length==0){
		    		   WL.Toast.show('找不到本地数据!请同步数据!');
		    	   }else{
		    		   store.setData(res[0].json.stext);
		    		   var NUM=0;
		    		   var list=res[0].json.stext;
		    		   for(var i=0;i<list.length;i++){
		    			   NUM+=list[i].NUM;
		    		   }
		    		   Ext.getCmp('IP_Ecount').setHtml("总台数("+NUM+")");
		    		   WL.Toast.show('如需更新数据，请点击更新数据按钮在服务器获取！');
		    	   }
		       }).fail(function(){
		    	   WL.Toast.show('没有数据!');
		       }); 
		};
		if(title == 'ITM'){
			obj.NextView('ITM_list_id','HelcPDA.view.install.ITM.ITM_List_V');
			var store=obj.getStore('ITMListStore','HelcPDA.store.install.ITM.ITMListStore');;
			store.setData('');   
		       var query={tcode:"ITM_data",tid:"ITM_list"};
		       var options={
		    		   exact:true
		       };       
		       WL.JSONStore.get(collectionName).find(query,options).then(function(res){
		    	   if(res==''||res==null||typeof(res)=='undefined'||res.length==0){
		    		   WL.Toast.show('找不到本地数据!请同步数据!');
		    	   }else{
		    		   store.setData(res[0].json.stext);
		    		   WL.Toast.show('如需更新数据，请点击更新数据按钮在服务器获取！');
		    	   }
		       }).fail(function(){
		    	   WL.Toast.show('没有数据!');
		       }); 
		};
		if(title == '已发货未进场'){
			this.NextView('sending_no_entry_list_ID','HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_List_View');
			var store=obj.getStore("Sending_No_Entry_List_Store","HelcPDA.store.install.sendingbutnoentry.Sending_No_Entry_List_Store");
			store.setData('');
		       var query={tcode:"Sending_No_Entry_Data",tid:"Sending_No_Entry_list"};
		       var options={
		    		   exact:true
		       };
		       //alert(collectionName);
		       WL.JSONStore.get(collectionName).find(query,options).then(function(res){
		    	   if(res==''||res==null||typeof(res)=='undefined'||res.length==0){
		    		   WL.Toast.show('找不到本地数据!请同步数据!');
		    	   }else{
		    		   store.setData(res[0].json.stext);
		    		   WL.Toast.show('如需更新数据，请点击更新数据按钮在服务器获取！');
		    	   }
		       }).fail(function(){
		    	   WL.Toast.show('没有数据!');
		       }); 
		};
		if(title == '调试任务'){
		   obj.NextView('installationTasksShakedownPanel','HelcPDA.view.install.installdebug.InstallationTasksShakedownPanel');
	 	   var store=obj.getStore("InstallatoinTasksShakedownStore","HelcPDA.store.install.installdebug.InstallatoinTasksShakedownStore");
		   store.setData('');
		  //查看缓存
	       var WL_task=WL.JSONStore.get(collectionName);
	       var query={tcode:'_task_list'+ebs_user_id,tid:'tiaoshi_task'};
	       var options={
	    		   exact:true
	       };       
	       WL_task.find(query,options).then(function(res){
	    	   if(res==''||res==null||typeof(res)=='undefined'){
	    		  //Ext.Msg.alert("暂无相关信息"); 
	    	   }else{
	    		   store.setData(res[0].json.stext);
	    		   var NUM=0;
	    		   var list=res[0].json.stext;
	    		   for(var i=0;i<list.length;i++){
	    			   NUM+=list[i].NUM;
	    		   }
	    		   Ext.getCmp('label_ForTai').setHtml("总台数("+NUM+")");
	    	   }
	       }).fail(function(){
	    	   Ext.Msg.alert('查找缓存数据失败');
	       });
		};
		if(title == '报检任务'){
			obj.NextView('installationTasksReportCheckPanel','HelcPDA.view.install.installtoreportcheck.InstallationTasksReportCheckPanel');
			//查看缓存
	        var WL_check=WL.JSONStore.get(collectionName);
	        var query={tcode:'_check_list'+ebs_user_id,tid:'check_task'};
	        var options={
	        		exact:true
	        };       
	        WL_check.find(query,options).then(function(res){
	    	   var store=obj.getStore("InstallatoinTasksReportCheckStore","HelcPDA.store.install.installtoreportcheck.InstallatoinTasksReportCheckStore");
	    	   if(res==''||res==null||typeof(res)=='undefined'){
	    		  //Ext.Msg.alert("暂无相关信息"); 
	    	   }else{
	    		   store.setData(res[0].json.stext);
	    		   var NEW_NEED_LIST=res[0].json.stext;
	    		   var length=NEW_NEED_LIST.length;
					var TotNum=0;
					var TotNum1=0;
					var TotNum2=0;
					for(var i=0;i<length;i++){
						TotNum+=(parseInt(NEW_NEED_LIST[i].NUM5)+parseInt(NEW_NEED_LIST[i].NUM4));//总台数
						TotNum1+=(parseInt(NEW_NEED_LIST[i].NUM5)); //总提交数
						TotNum2+=(parseInt(NEW_NEED_LIST[i].SumSub));
					}
					Ext.getCmp('NUM1').setHtml("总台数("+TotNum+")");;
					Ext.getCmp('NUM2').setHtml("已提交("+TotNum1+")");
					Ext.getCmp('NUM3').setHtml("未提交("+(TotNum-TotNum1)+")");;
				
	    	   }
	        }).fail(function(){
	        	Ext.Msg.alert('查找缓存数据失败');
	        });
		};
		if(title == '厂检任务'){
			obj.NextView('installatoinTasksFactoryPanel','HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel');
		    var store=obj.getStore("InstallatoinTasksFactoryStore","HelcPDA.store.install.installcheck.InstallatoinTasksFactoryStore");
			store.setData('');
			var FactoryStore = obj.getStore("TasksFactoryStore","HelcPDA.store.install.installcheck.TasksFactoryStore");
			FactoryStore.setData('');   
		    var WL_check=WL.JSONStore.get(collectionName);
		       var query={tcode:ebs_user_id+'_check_list',tid:'changjian_check_list'};
		       var options={
		    		   exact:true
		       };       
		       WL_check.find(query,options).then(function(res){
		    	   if(res==''||res==null||typeof(res)=='undefined'||res.length==0){
		    		   WL.Toast.show('找不到本地数据!请同步数据！');
		    	   }else{
		    		   store.setData(res[0].json.stext);
		    		   var NUM=0;
		    		   var list=res[0].json.stext;
		    		   for(var i=0;i<list.length;i++){
		    			   NUM+=list[i].NUM;
		    		   }
		    		   Ext.getCmp('Ecount').setHtml("总台数("+NUM+")");
		    		   WL.Toast.show('如需更新数据，请点击更新数据按钮在服务器获取！');
		    	   }
		       }).fail(function(){
		    	   Ext.Msg.alert('查找缓存数据失败');
		       }); 
		    
		       
		};
		if(title == '政府检任务'){
			//进入
			obj.NextView('zhengfujian_id','HelcPDA.view.install.installtask.zhengfujian');
			var obj45= obj;
			var tcodeId1='zhengfujianTcode';
			var coll=WL.JSONStore.get(collectionName);
		  	var data={tcode:tcodeId1};
		  	options={};
		 	coll.find(data,options).then(function(arrayResults){
		 		console.log(arrayResults.length);
		 		if(arrayResults.length==0){//当JSON中没有数据的时候，查询数据
		 			getResult=function(res){
		 				Ext.getCmp('zhengfucount_id').setValue('总台数:'+res.rows.length);
		 				 console.log(res.rows.length);
		 				 console.log(object);
		 				 var result=[];
		 				 var list=[];
		 				 for(var i=0;i<res.rows.length;i++){
		 					list[i]=res.rows[i].ENGCONTRACT_NUMBER;
		 					result[i]=res.rows[i];
		 				 };
		 				 var tcodeId='zhengfujianTcode';
		 				 var query={tcode:tcodeId};
		 				 console.log(tcodeId);
		 				 //coll.remove(query).then(function(){
		 				 //循环添加每一条到JSONStore
		 				 var ndata=[];
		 				 for(var i=0;i<result.length;i++){
		 					 var query={tid:result[i].ENGCONTRACT_NUMBER+'_'+result[i].ELEVATOR_NO+'_'+result[i].SEQ_NUM,tcode:tcodeId,stext:result[i]};
		 					 ndata[i]=query;
		 				 };
		 				coll.add(ndata).then(function(){
		 					//  alert('ok');
		 				}).fail(function(err){
		 					 Ext.Msg.alert("缓存失败");
		 				});
		 				//}).fail(function(err){Ext.Msg.alert("初始化删除失败");});	
		 			var ss=list.unique3();
		 			var sss=[];
		 			for(var i=0;i<ss.length;i++){
		 				for(var j=0;j<res.rows.length;j++){
		 					if(ss[i]==res.rows[j].ENGCONTRACT_NUMBER){
		 						sss[i]=res.rows[j];
		 					}
		 					
		 				}
		 			}
		 			
		 			for(var i=0;i<sss.length;i++){
		 				var k=0;
		 				for(var j=0;j<list.length;j++){
		 				if(sss[i].ENGCONTRACT_NUMBER==res.rows[j].ENGCONTRACT_NUMBER){
		 					k++;
		 				
		 				}
		 			}
		 				sss[i].sum=k;	
		 			}
		 			console.log(list);
		 			console.log(sss);
		 				 store=Ext.data.StoreManager.get("ZhengFujianStore");
		 					if(!store){
		 						store=Ext.create("HelcPDA.store.install.installtask.ZhengFujianStore");
		 					}
		 					store.setData(sss,this);
		 			 };
		 			var content="{'userid':'"+ebs_user_id+"','init_person_id':'"+init_person_id+"'}";
		 			obj45.connectServer(getResult,'zhengfujianAction.do?method=toSearch',content);
		 		
		 		}else{
		 			  var list=[];
		 			 var object=Ext.getCmp('zhengfucount_id');
	 				 object.setValue('总台数:'+arrayResults.length);
		 			  console.log(arrayResults[0].json.stext);
		 			  for(var i=0;i<arrayResults.length;i++){
		 				  list[i]=arrayResults[i].json.stext.ENGCONTRACT_NUMBER;
		 			  }
		 			 var ss=list.unique3();
			 			var sss=[];
			 			for(var i=0;i<ss.length;i++){
			 				for(var j=0;j<arrayResults.length;j++){
			 					if(ss[i]==arrayResults[j].json.stext.ENGCONTRACT_NUMBER){
			 						sss[i]=arrayResults[j].json.stext;
			 					}
			 				}
			 			}
			 			for(var i=0;i<sss.length;i++){
			 				var k=0;
			 				for(var j=0;j<list.length;j++){
			 				if(sss[i].ENGCONTRACT_NUMBER==arrayResults[j].json.stext.ENGCONTRACT_NUMBER){
			 					k++;
			 				
			 				}
			 			}
			 				sss[i].sum=k;	
			 			}
		 			 store=Ext.data.StoreManager.get("ZhengFujianStore");
						if(!store){
							store=Ext.create("HelcPDA.store.install.installtask.ZhengFujianStore");
						}
						store.setData(sss,this);
		 		  }
		 	 }).fail(function(errorObject){
		 		alert("保持出错");
		 	});
		};
		
		if(title == '移交任务'){
			//清理数据仓
			var store=Ext.data.StoreManager.get("ZhengFujianStore");
			if(!store){
				store=Ext.create("HelcPDA.store.install.installtask.ZhengFujianStore");
			};
			store.setData([]);
			
			var obj45= obj;
			obj.NextView('wangGouYiJiao_id','HelcPDA.view.install.installtask.wangGouYiJiao');
			
			var tcodeId1='wangGuoYiJiao';
			var coll=WL.JSONStore.get(collectionName);
		  	var data={tcode:tcodeId1};
		  	var options={};
		 	coll.find(data,options).then(function(arrayResults){
		 		console.log(arrayResults.length);
		 		if(arrayResults.length==0){
		 			getResult=function(res){
		 				 if (res.rows.length == 0) {
		 					 WL.Toast.show('暂无移交任务数据！');
		 					 return ;
		 				 };
		 				 var result=[];
		 				 console.log(res.length);
		 				 console.log(res);
		 				var list=[];
		 				for(var i=0;i<res.rows.length;i++){
		 					list[i]=res.rows[i].ENGCONTRACT_NUMBER;
		 					result[i]=res.rows[i];
		 				};
		 				var tcodeId='wangGuoYiJiao';
		 				var query={tcode:tcodeId};
		 				console.log(tcodeId);
		 				//删除
		 				coll.remove(query).then(function(){
		 					//循环添加每一条到JSONStore
		 					var ndata=[];
		 					for(var i=0;i<result.length;i++){
		 						var query={tid:result[i].ENGCONTRACT_NUMBER+'_'+result[i].ELEVATOR_NO+'_'+result[i].SEQ_NUM,tcode:tcodeId,stext:result[i]};
		 						ndata[i]=query;
		 					};
		 					coll.add(ndata).then(function(){
		 					}).fail(function(err){
		 						WL.Toast.show('数据保存失败');
		 					});
		 				}).fail(function(err){
		 					console.log('初始化删除失败');
		 				});	
		 				var ss=list.unique3();
		 				var sss=[];
		 				for(var i=0;i<ss.length;i++){
		 					for(var j=0;j<res.rows.length;j++){
		 						if(ss[i]==res.rows[j].ENGCONTRACT_NUMBER){
		 							sss[i]=res.rows[j];
		 						};
		 					};
		 				};
		 				console.log(sss);
		 				var store=Ext.data.StoreManager.get("ZhengFujianStore");
		 				if(!store){
		 					store=Ext.create("HelcPDA.store.install.installtask.ZhengFujianStore");
		 				};
		 				store.setData(sss,this);
		 			};
		 			var content="{'userid':'"+ebs_user_id+"','init_person_id':'"+init_person_id+"'}";
		 			obj45.connectServer(getResult,'wg_yjAction.do?method=toSearch',content);
		 		  }else{
		 			  var list=[];
		 			  console.log(arrayResults[0].json.stext);
		 			  for(var i=0;i<arrayResults.length;i++){
		 				  list[i]=arrayResults[i].json.stext.ENGCONTRACT_NUMBER;
		 				//  console.log(arrayResults[i].json.stext.GOV_CHECK_DATE);
		 			  };
		 			  var ss=list.unique3();
		 			  var sss=[];
		 			  for(var i=0;i<ss.length;i++){
			 				for(var j=0;j<arrayResults.length;j++){
			 					if(ss[i]==arrayResults[j].json.stext.ENGCONTRACT_NUMBER){
			 						sss[i]=arrayResults[j].json.stext;
			 					};
			 				};
			 			};
			 			var store=Ext.data.StoreManager.get("ZhengFujianStore");
						if(!store){
							store=Ext.create("HelcPDA.store.install.installtask.ZhengFujianStore");
						};
						store.setData(sss,this);
		 		  	};
		 	 }).fail(function(errorObject){
		 		WL.Toast.show('本地数据查询失败');
		 	 });
		};
		if(title == '调试菜单纸补录'){
			obj.NextView('installationTasksShakedownAddListPanel','HelcPDA.view.install.installblu.InstallationTasksShakedownAddListPanel');
			var store=obj.getStore('InstallationTasksShakedownAddListStore','HelcPDA.store.install.installblu.InstallationTasksShakedownAddListStore');
			function getResult(res){
				if(res.count==0){
					WL.Toast.show('没有查到符合的数据');
				}
				store.setData(res.rows);
			}
			var content="{'userid':'"+ebs_user_id+"'}";
		  	obj.connectServer(getResult, 'menuAction.do?method=toSearch', content);
		};
		if(title == '厂检菜单纸补录'){
			obj.NextView('installatoinTasksFactoryAddListPanel','HelcPDA.view.install.installblu.InstallatoinTasksFactoryAddListPanel');
			var store=obj.getStore('InstallatoinTasksFactoryAddListStore','HelcPDA.store.install.installblu.InstallatoinTasksFactoryAddListStore');
			function getResult(res){
				console.log(JSON.stringify(res));
				if(res.count==0){
					Ext.Msg.alert('没有查到符合的数据');
				}
				store.setData(res.rows);
			}
			var content="{'userid':'"+ebs_user_id+"'}";
			obj.connectServer(getResult, 'menuAction.do?method=cjSearch', content);
		};
		if(title=='安装数据查询'){
			obj.NextView('installAllSerach','HelcPDA.view.install.installSearch.InstallAllSerach');
		    Ext.getCmp('Choice_Search').addListener('change',function(obk,newValue,oldValue,eOpts){
		    	var ebs_user=Ext.getCmp('ebs_user');
		    	var fac_user=Ext.getCmp('fac_user');
		    	var int_user=Ext.getCmp('int_user');
		    	var box_number=Ext.getCmp('box_number');
		    	if(newValue=='安装数据查询'){
		    		ebs_user.setHidden(false);
		    		fac_user.setHidden(false);
		    		box_number.setHidden(true);
		    		ebs_user.setValue('');
		    		fac_user.setValue('');
		    		int_user.setValue('');
		    		box_number.setValue('');
		    	}else if(newValue=='排产数据查询'){
		    		ebs_user.setHidden(true);
		    		fac_user.setHidden(true);
		    		box_number.setHidden(true);
		    		ebs_user.setValue('');
		    		fac_user.setValue('');
		    		int_user.setValue('');
		    		box_number.setValue('');
		    	}else if(newValue=='箱头数据查询'){
		    		box_number.setHidden(false);
		    		ebs_user.setHidden(true);
		    		fac_user.setHidden(true);
		    		ebs_user.setValue('');
		    		fac_user.setValue('');
		    		int_user.setValue('');
		    	}
		    });
		}
		
	},
	
	AddListPlan:function(){
		console.log('进入AddListPlan');
		var installTcode=Ext.getCmp('installTcode').getValue();
		//获得数据仓
		var MaintList;
		if(installTcode=='installplanfalse'){
			MaintList=Ext.data.StoreManager.get('HelIntTasksAllStore');
			if (!MaintList) { 
				MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStore"); 
			};
		}else if(installTcode=='installplantrue'){
			MaintList=Ext.data.StoreManager.get('HelIntTasksAllStoreThree');
			if (!MaintList) { 
				MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreThree"); 
			};
		}else{
			
		};
		
		//先查出不同的合同号
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:installTcode};
    	console.log('add的installTcode'+installTcode);
		var options={
			exacte:false,//默认
		};
    	MaintainList.find(query,options).then(function(arrayResults){
    		
    		
    		
    		var num=arrayResults.length;
    		var ndata=[];//合同号
    		var ndata2=[];//记录合同号和合同号的地址
    		if(num==0){
    			WL.Toast.show("本地不存在数据！");
    			return;
    		};
    		for(var i=0;i<num;i++){
				ndata[i] = arrayResults[i].json.stext.ENGCONTRACT_NUMBER;
				
				console.log(JSON.stringify(arrayResults[i].json.stext));
				
				var address=arrayResults[i].json.stext.CUSTOMER_NAME;
				var addressAnd={ENGCONTRACT_NUMBER:ndata[i],CUSTOMER_NAME:address};
				ndata2[i]=addressAnd;
				//console.log('JSON '+JSON.stringify(ndata2[i]));
			};
			//获得唯一合同
			var list=ndata.unique3();
			console.log('合同数量:'+list.length+'合同值'+list);
			//获取一个合同所拥有的台数
			var taiNum=[];//记录一个合同的台数
			var listnum=list.length;
			for(var i=0;i<listnum;i++){
				var count=0;
				for(var j=0;j<num;j++){
					if(ndata[j]==list[i]){
						count++;
					}
				};
				taiNum[i]=count;
			};
			//获取合同的地址
			//console.log('listnum:'+listnum+'num:'+num);
			var address2=[];
			for(var i=0;i<listnum;i++){
				
				for(var j=0;j<num;j++){
					
					//console.log('合同列表：'+(list[i]+' '+JSON.stringify(ndata2[j].ENGCONTRACT_NUMBER)));
					if(list[i]==ndata2[j].ENGCONTRACT_NUMBER){
						address2[i]=ndata2[j].CUSTOMER_NAME;
						//console.log('地址: '+JSON.stringify(address2[i]));
						break;
					}
				}
			};
			
			//计算已计划和为计划出的数量
			var YJHNum=[];
			var WJHNum=[];
			for(var i=0;i<listnum;i++){
				var yjh=0;
				var wjh=0;
				
				for(var j=0;j<num;j++){
					var jhData=arrayResults[j].json.stext;
					if(list[i]==jhData.ENGCONTRACT_NUMBER){
						var dataVN=jhData.VERSION_NUM;
						//alert(dataVN);
						if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
							wjh++;
		    			}else{
		    				yjh++;
		    			};
					};
					YJHNum[i]=yjh;
					WJHNum[i]=wjh;

				};
			};
			
			//获取整合后的数据
			var HTH=[]; 
			for(var i=0;i<listnum;i++){
				var Trim={ENGCONTRACT_NUMBER:list[i],NUM:taiNum[i],CUSTOMER_NAME:address2[i],YJH:YJHNum[i],WJH:WJHNum[i]};
				HTH[i]=Trim;
				//console.log(HTH[i]);
			}
			MaintList.setData(HTH);
			WL.Toast.show("数据查询完毕！");
			
    	}).fail(function(errorObject){
			console.log("查询数据失败");
		});
    	
	},
	
});