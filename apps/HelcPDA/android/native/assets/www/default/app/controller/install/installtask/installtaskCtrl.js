
/* JavaScript content from app/controller/install/installtask/installtaskCtrl.js in folder common */
Ext.define('HelcPDA.controller.install.installtask.installtaskCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'installtaskCtrl_id',
	config:{
		refs:{
			installtaskCtrl_id:'button[id=InstallationTasks_id]'
		},
		control:{
			installtaskCtrl_id:{
				tap:'doMaunPlanDeP'
			},
			/*"button#buttonFaultHandle":{
				tap:'toFaultHandle',
			}*/
		}
	},
	doMaunPlanDeP:function(){
		var INT_TASK_ID=0;
	//	var objID=Ext.getCmp('tabpanel_id');
   	//  var itemid=objID.getActiveItem().getId();
		var obj=Ext.getCmp('installtask_id');
		if(!obj){
			 obj=Ext.create('HelcPDA.view.install.installtask.installTask');
		}
		 Ext.Viewport.setActiveItem(obj);
		 var coll=WL.JSONStore.get(collectionName);
  	   var options={};
  	   tcodeId='INSTALL_TASK_ANTRANCE';
  	  var data={tcode:tcodeId};
  	  coll.find(data,options).then(function(arrayResults){
  		if(arrayResults.length==0){
  			WL.Toast.show('没有数据');
  			alert('没有数据11');
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
					//if(itemid=='NoAdmission_id'){
						
					 store=Ext.data.StoreManager.get("installtaskStore");
					 if(!store){
							store=Ext.create("HelcPDA.store.install.installtask.installtaskStore");
						}
						store.setData(NEW_NEED_LIST,this);
				
		 }
  		}
  	}).fail(function(errorObject){
  		WL.Toast.show('保存出错!');
		//alert("保持出错");
	});
  	 tcodeId1='INSTALL_TASK_ENTRANCE';
  	 var data={tcode:tcodeId1};
 	  coll.find(data,options).then(function(arrayResults){
 		if(arrayResults.length==0){
 			WL.Toast.show('没有数据!');
 			alert('没有数据22');
 		}else{
 		  var list3=[];
 		for(var j=0;j<arrayResults.length;j++){
			list3[j]=arrayResults[j].json;
		}
 		  var objID=Ext.getCmp('tabpanel_id');
     	  var itemid=objID.getActiveItem().getId();
 	
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
					//if(itemid=='NoAdmission_id'){
						
					 store=Ext.data.StoreManager.get("installtaskStore2");
					 if(!store){
							store=Ext.create("HelcPDA.store.install.installtask.installtaskStore2");
						}
						store.setData(NEW_NEED_LIST,this);
				
		 }
 		}
 	}).fail(function(errorObject){
 		WL.Toast.show('保存出错!');
		//alert("保持出错");
	});
		
	},
});
