
/* JavaScript content from app/controller/install/installtask/zhengfujianCtrl.js in folder common */
Ext.define('HelcPDA.controller.install.installtask.zhengfujianCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'zhengfujianCtrl_id',
	config:{
		refs:{
			//不用了
			ZhengFujian:'button[id=ZhengFujianId]'
		},
		control:{
			//不用了
			ZhengFujian:{
				tap:'init1'
			},
			/*"button#buttonFaultHandle":{
				tap:'toFaultHandle',
			}*/
			
			/************************************************************************************
			 * 政府检任务 1 页面
			 * */
			
			//政府检任务 1   返回按钮
			'button#zhengfujian_id_FH_BUTTON':{
				tap:'zhengfujian_id_FH_BUTTON'
			},

			//政府检任务 1  详细信息
			"list#zhengfujianList_id":{
		    	itemtap:'init112' 
			},
			
			/**
			 **政府检任务 1 页面
			 ************************************************************************************/
		}
	},
	
	
	
	/************************************************************************************
	 * 政府检任务 1 页面
	 * */
	
	//政府检任务 1   返回按钮
	zhengfujian_id_FH_BUTTON:function(){
		this.showBackView('installProject_id','HelcPDA.view.install.installProject');
	},

	init112:function(obj, index, target, record, e, eOpts){
		this.NextView('zhengfujianTask_id','HelcPDA.view.install.installtask.zhengfujianTask');
				
		var store=Ext.data.StoreManager.get("ZhengFujianStore");
		if(!store){
			store=Ext.create("HelcPDA.store.install.installtask.ZhengFujianStore");
		};
		var ENGCONTRACT_NUMBER=store.getAt(index).get('ENGCONTRACT_NUMBER');
		var objhidden=Ext.getCmp('zhengfuHidden_id');
		objhidden.setValue(ENGCONTRACT_NUMBER);
		//	alert(ENGCONTRACT_NUMBER);
		var tcodeId1='zhengfujianTcode';
		var coll=WL.JSONStore.get(collectionName);
		var data={tcode:tcodeId1};
		var options={};
		coll.find(data,options).then(function(arrayResults){
			console.log(arrayResults);
		    console.log(arrayResults.length);
		    console.log(arrayResults[0].json.stext);
		    var list=[];
		    var list2=[];
		    for(var i=0;i<arrayResults.length;i++){
		    	list[i]=arrayResults[i].json.stext;
		    };
		    var k=0;
		    for(var i=0;i<list.length;i++){
		    	if(ENGCONTRACT_NUMBER==list[i].ENGCONTRACT_NUMBER){
		    		list2[k++]=list[i];
		        };
		    };
		    console.log(list2[0]);
		    console.log(list2.length);
		    console.log(list);
		    var store=Ext.data.StoreManager.get("ZhengFujianStore2");
		    if(!store){
		    	store=Ext.create("HelcPDA.store.install.installtask.ZhengFujianStore2");
		    };
		    store.setData(list2,this);
		}).fail(function(errorObject){
			WL.Toast.show('保存出错!');
		});
	},
	/**
	 **政府检任务 1 页面
	 ************************************************************************************/
	
	

	
	
	
	
	
	
	
	
	
	
	
	//不用了
	init1:function(){
	var obj45= this;
		var obj=Ext.getCmp('zhengfujian_id');
		if(!obj){
			obj=Ext.create('HelcPDA.view.install.installtask.zhengfujian');
		}
		Ext.Viewport.setActiveItem(obj);
		var tcodeId1='zhengfujianTcode';
		var coll=WL.JSONStore.get(collectionName);
	  	 var data={tcode:tcodeId1};
	  	 options={
	  			 
	  	 };
	 	  coll.find(data,options).then(function(arrayResults){
	 		  console.log(arrayResults.length);
	 		  if(arrayResults.length==0){
	 			  alert('o1111111k');
	 			 getResult=function(res){
	 				 alert('okkkkk');
	 				 var object=Ext.getCmp('zhengfucount_id');
	 				 console.log('1111111111'+object.getValue());
	 				 console.log(res.row.length);
	 				 console.log(object);
	 				 object.setValue(res.rows.length);
	 				 var result=[];
	 				var list=[];
	 				for(var i=0;i<res.rows.length;i++){
	 					list[i]=res.rows[i].ENGCONTRACT_NUMBER;
	 					result[i]=res.rows[i];
	 				
	 				}
	 				 var tcodeId='zhengfujianTcode';
	 				 var query={tcode:tcodeId};
	 					console.log(tcodeId);
	 					
	 					coll.remove(query).then(function(){
	 						//循环添加每一条到JSONStore
	 						  var ndata=[];
	 						 
	 						  for(var i=0;i<result.length;i++){
	 							 var query={tid:result[i].ENGCONTRACT_NUMBER+'_'+result[i].ELEVATOR_NO+'_'+result[i].SEQ_NUM,tcode:tcodeId,stext:result[i]};
	 						       ndata[i]=query;
	 						  }
	 						  coll.add(ndata).then(function(){
	 							//  alert('ok');
	 						  }).fail(function(err){
	 							 WL.Toast.show('缓存失败');
//	 							  Ext.Msg.alert("缓存失败");
	 						  });
	 					  }).fail(function(err){
	 						 WL.Toast.show('初始化删除失败');
//	 						  Ext.Msg.alert("初始化删除失败");
	 						  });	
	 			var ss=list.unique3();
	 			var sss=[];
	 			for(var i=0;i<ss.length;i++){
	 				for(var j=0;j<res.rows.length;j++){
	 					if(ss[i]==res.rows[j].ENGCONTRACT_NUMBER){
	 						sss[i]=res.rows[j];
	 					}
	 					
	 				}
	 			}
	 			
	 			//zhengfucount_id
	 			console.log(sss);
	 				 store=Ext.data.StoreManager.get("ZhengFujianStore");
	 					if(!store){
	 						store=Ext.create("HelcPDA.store.install.installtask.ZhengFujianStore");
	 					}
	 					store.setData(sss,this);
	 			 };
	 			var content="{'userid':'"+userid+"','init_person_id':'"+init_person_id+"'}";
	 			obj45.connectServer(getResult,'zhengfujianAction.do?method=toSearch',content);
	 		  }else{
	 			  var list=[];
	 			 var object=Ext.getCmp('zhengfucount_id');
 				 object.setValue('总台数:'+arrayResults.length);
	 			  console.log(arrayResults[0].json.stext);
	 			  for(var i=0;i<arrayResults.length;i++){
	 				  list[i]=arrayResults[i].json.stext.ENGCONTRACT_NUMBER;
	 				//  console.log(arrayResults[i].json.stext.GOV_CHECK_DATE);
	 				
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
	 			 store=Ext.data.StoreManager.get("ZhengFujianStore");
					if(!store){
						store=Ext.create("HelcPDA.store.install.installtask.ZhengFujianStore");
					}
					store.setData(sss,this);
	 		  }
	 		  
	 	 }).fail(function(errorObject){
	 		 WL.Toast.show('保存出警!');
//	 		alert("保持出错");
	 	});
		
		
	}
	
});
Array.prototype.unique3 = function(){
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++){
		if(!json[this[i]]){
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res;
};