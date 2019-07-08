/**
 * 基本上已经没有什么用了 xcx  2014-7-31
 */

Ext.define('HelcPDA.controller.install.installtask.wangGouYiJiaoCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'wangGouYiJiaoCtrl_id',
	config:{
		refs:{
			ZhengFujian:'button[id=wangGouYiJiaoId]'
		},
		control:{
			ZhengFujian:{
				tap:'init1'
			},
			/*"button#buttonFaultHandle":{
				tap:'toFaultHandle',
			}*/
		}
	},
	init1:function(){
		var obj45= this;
		var obj=Ext.getCmp('wangGouYiJiao_id');
		if(!obj){
			obj=Ext.create('HelcPDA.view.install.installtask.wangGouYiJiao');
		}
		Ext.Viewport.setActiveItem(obj);
		var tcodeId1='wangGuoYiJiao';
		var coll=WL.JSONStore.get(collectionName);
	  	 var data={tcode:tcodeId1};
	  	 options={
	  			 
	  	 };
	 	  coll.find(data,options).then(function(arrayResults){
	 		  console.log(arrayResults.length);
	 		  if(arrayResults.length==0){
	 			//  alert('ok');
	 			 getResult=function(res){
	 				 var result=[];
	 				 console.log(res.length);
	 				 console.log(res);
	 				var list=[];
	 				for(var i=0;i<res.rows.length;i++){
	 					list[i]=res.rows[i].ENGCONTRACT_NUMBER;
	 					result[i]=res.rows[i];
	 				
	 				}
	 				 var tcodeId='wangGuoYiJiao';
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
	 							 // Ext.Msg.alert("缓存失败");
	 						  });
	 					  }).fail(function(err){
	 						 WL.Toast.show('初始化删除失败');
	 						  //Ext.Msg.alert("初始化删除失败");
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
	 			console.log(sss);
	 				 store=Ext.data.StoreManager.get("ZhengFujianStore");
	 					if(!store){
	 						store=Ext.create("HelcPDA.store.install.installtask.ZhengFujianStore");
	 					}
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
	 		WL.Toast.show('保存出错!');
	 		//alert("保持出错");
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