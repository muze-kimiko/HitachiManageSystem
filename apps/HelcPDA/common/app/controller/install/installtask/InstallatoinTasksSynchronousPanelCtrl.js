Ext.define('HelcPDA.controller.install.installtask.InstallatoinTasksSynchronousPanelCtrl',{
extend:'HelcPDA.controller.ApplicationController',
   config:{
	   refs:{
			/************************************************************************************
			 * 安装任务 同步页面
			 * */
		    //同步按钮
		   	TAOSHU:'button[id=taoshu_id]',

			//返回按钮
		   	InstallatoinTasksSynchronousPanel_id_FH_BUTTON:'button[id=InstallatoinTasksSynchronousPanel_id_FH_BUTTON]',
		   /**
		    **安装任务 同步页面
		    ************************************************************************************/
		   
		   	
		  /************************************************************************************
		    * 安装任务  查询页面
		    * */
		   	
		  //搜索按钮
		  SEARCH_ID:'button[id=InstallatoinTasksSearchPanel_id_Search_id]',

			
	      /**
	       ** 安装任务  查询页面
		  ************************************************************************************/
		   
		    
		    //前同步 现已没用
		   BUTTON_ID:'button[id=Synchronous_id]',
		   
		   
	   },
	   control:{
		   
	  		  /************************************************************************************
			    * 安装任务 同步页面
				* */
	  		  //同步按钮
		  	  TAOSHU:{
		  			tap:'queryinstalPlanTBButtton'
		  	  },  
		  	  
		  	  //返回按钮
		  	  InstallatoinTasksSynchronousPanel_id_FH_BUTTON:{
		  		  tap:'InstallatoinTasksSynchronousPanel_id_FH_BUTTON'
		  	  },
			  /**
				**安装任务 同步页面
				************************************************************************************/
		  	 
             
             
		  	 /************************************************************************************
				 * 安装任务  查询页面
				 * */
		  	 
		  	//搜索按钮
			SEARCH_ID:{
				tap:'search',
			},

			//返回按钮
			'button#InstallatoinTasksSearchPanel_id_FH_BUTTON':{
				tap:'InstallatoinTasksSearchPanel_id_FH_BUTTON'
			},
				
			/**
			 ** 安装任务  查询页面
			 ************************************************************************************/
			  	
			  	  //前同步 现已没用
			  	   BUTTON_ID:{
				  		  tap:'Inquiry',
				  	},
	   },
	   
   },
   
	/************************************************************************************
	 * 安装任务 同步页面
	 * */
   //同步按钮
   queryinstalPlanTBButtton:function(){
	   var this_obj=this;
	   console.log('同步远程查询1');
	   //获取查询数据的条数
	   var IS_ENTRANCE=null;
	   var INT_TASK_ID=0;
	   var objID=Ext.getCmp('tabpanel_id');
	   var itemid=objID.getActiveItem().getId();
	   if(itemid=='NoAdmission_id'){
		   IS_ENTRANCE=false;
	   }else if(itemid=='InTheSystem_id'){
		   IS_ENTRANCE=true;
	   };
	   //安装合同号
	   var ENGCONTRACT_NUMBER=Ext.getCmp('InstallationContractNo_id').getValue();
	   //工号
	   var ELEVATOR_NO=Ext.getCmp('JobNumber_id').getValue();
	   //客户
	   var CUSTOMER_NAME=Ext.getCmp('Project_id').getValue();
	   console.log('同步条件:'+ENGCONTRACT_NUMBER+' '+ELEVATOR_NO+' '+CUSTOMER_NAME);
	   //同步后的结果
	   getResult=function(result){
		   //当查询不到结果时,清空list
		   if(result.count==0){
			  WL.Toast.show('数据不存在！');
			  return;
		   };
		   var instalcount=parseInt((result.count/100)+1);
		   console.log('安装任务长度： '+result.count);
		   console.log('安装任务查询次数： '+instalcount);
		   //查询起始位置
		   INT_TASK_ID=0;
		   var index = 0;
		   var list=[];
		   //条件
		   var k=0;
		   getResult2=function(result2){
			   console.log('==========================================');
			   console.log(JSON.stringify(result2));
			   console.log(result2.item);
	  		   console.log(result2.item.length);
	  		   for(var i=0;i<result2.item.length;i++){
	  				 list[k++]=result2.item[i];
	  		   };
	  		   console.log(list.length);
	  		   index ++;
	  		   INT_TASK_ID = result2.INT_TASK_ID;
	  		   if (index < instalcount) {
	  				var content="{'ENGCONTRACT_NUMBER':'"+ENGCONTRACT_NUMBER+"','ELEVATOR_NO':'"+ELEVATOR_NO+"','CUSTOMER_NAME':'"+CUSTOMER_NAME+"','IS_ENTRANCE':'"+IS_ENTRANCE+"','userid':'"+userid+"','sbl_row_id':'"+sbl_row_id+"','person_id':'"+person_id+"','ebs_user_id':'"+ebs_user_id+"','init_person_id':'"+init_person_id+"','username':'"+username1+"','INT_TASK_ID':'"+INT_TASK_ID+"'}";
	  				this.connectServer(getResult2,'installtaskAction.do?method=toSearch',content);
	  		   }else {
	  		   	   	console.log('全部执行完后的长度');
	  		   	    console.log(list.length);
	  				//console.log(JSON.stringify(list));
	  				//判断是同步的是未进场或是在制
	  				if(itemid=='NoAdmission_id'){
	  	  				 var str=document.getElementById("title_id").innerHTML;
	  	  				 if(str=='未进场'){
	  	  					 str=str+'('+list.length+')';
	  	  					 document.getElementById("title_id").innerHTML=str;
	  	  				 };
	  	  	    	 }else if(itemid=='InTheSystem_id'){
	  	  	    		 var str=document.getElementById("title_id2").innerHTML;
	  	  	    		 if(str=='在制'){
	  	  	    			 str=str+'('+list.length+')';
	  	  	    			 document.getElementById("title_id2").innerHTML=str;
	  	  	    		 };
	  	  	    	 };
	  	  			 var str=document.getElementById("title_id2").innerHTML;
	  	  			 tr=str+'('+list.length+')';
	  	  			 
	  	  			 //返回安装任务页面
	  		  		this_obj.showBackView('installtask_id','HelcPDA.view.install.installtask.installTask');

	  		  		//数据转换
	  		  		//安装合同号数组
	  	  			var ENGCONTRACT_NUMBER_LIST=[];
	  	  			//客户名称数组
	  				var CUSTOMER_NAME_LIST=[];
	  				//把数据中的所以安装合同号和客户名称分别放入两个数组中
	  				for(var i=0;i<list.length;i++){
	  					ENGCONTRACT_NUMBER_LIST[i]=list[i].ENGCONTRACT_NUMBER;
	  					CUSTOMER_NAME_LIST[i]=list[i].CUSTOMER_NAME;
	  				};
	  				//获取唯一安装合同号
	  				var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
	  				console.log('唯一安装合同号：'+JSON.stringify(UNIQ_ENGCONTRACT_NUMBER_LIST));
	  				//唯一客户名称
	  				var UNIQ_CUSTOMER_NAME=CUSTOMER_NAME_LIST.unique3();
	  				console.log('唯一客户名称： '+JSON.stringify(UNIQ_CUSTOMER_NAME));
	  				
	  				//获取相同合同号的数量
	  				var NUM=[];
	  				for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
	  					NUM[i]=0;
	  					for(var j=0;j<list.length;j++){
	  						if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==list[j].ENGCONTRACT_NUMBER){
	  							NUM[i]++;
	  						};
	  					 };
	  				};
	  				console.log('每天合同号的数量： '+JSON.stringify(NUM));
	  				
	  				//获取唯一合同对应的地址
	  				var DuiYingDiZhi=[];
	  				for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
	  					//如果安装合同号数组，中的合同号等于，获取唯一安装合同号中的合同
	  					//那么客户名称对应客户名称数组中的客户名称
	  					for(var j=0;j<list.length;j++){
	  						if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==ENGCONTRACT_NUMBER_LIST[j]){
	  							DuiYingDiZhi[i]=CUSTOMER_NAME_LIST[j];
	  							break;
		  					};
	  					};
	  				};
	  				
	  				
	  				var NEW_NEED_LIST=[];
	  				for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
	  					var CNTER_NEED={};
	  					//合同号
	  					CNTER_NEED.ENGCONTRACT_NUMBER=UNIQ_ENGCONTRACT_NUMBER_LIST[i];
	  					//CNTER_NEED.CUSTOMER_NAME=UNIQ_CUSTOMER_NAME[i];
	  					CNTER_NEED.CUSTOMER_NAME=DuiYingDiZhi[i];
	  					CNTER_NEED.NUM=NUM[i];
	  					NEW_NEED_LIST[i]=CNTER_NEED;
	  				};
	  				  
	  				console.log(JSON.stringify(NEW_NEED_LIST));
	  				console.log(NEW_NEED_LIST.length);
	  				console.log(NEW_NEED_LIST[0]);
	  				var store=null;
	  				var tcodeId=null;
	  				
	  				
	  	  			if(NEW_NEED_LIST.length>0){
	  	  				if(itemid=='NoAdmission_id'){
	  	  					tcodeId='INSTALL_TASK_ANTRANCE';
	  						store=Ext.data.StoreManager.get("installtaskStore");
	  						if(!store){
	  							store=Ext.create("HelcPDA.store.install.installtask.installtaskStore");
	  						};
	  						store.setData(NEW_NEED_LIST,this);
	  	  				}else if(itemid=='InTheSystem_id'){
	  	  					tcodeId='INSTALL_TASK_ENTRANCE';
	  	  					store=Ext.data.StoreManager.get("installtaskStore2");
	  	  					if(!store){
	  	  						store=Ext.create("HelcPDA.store.install.installtask.installtaskStore2");
	  	  					};
	  	  					store.setData(NEW_NEED_LIST,this);
	  	  				};
	  	  				var query={tcode:tcodeId};
	  	  				console.log(tcodeId);
	  					var coll=WL.JSONStore.get(collectionName);
	  					coll.remove(query).then(function(){
	  						//循环添加每一条到JSONStore
	  						var ndata=[];
	  						for(var i=0;i<list.length;i++){
	  							var query={tid:list[i].ENGCONTRACT_NUMBER+'_'+list[i].ELEVATOR_NO+'_'+list[i].SEQ_NUM,tcode:tcodeId,stext:list[i]};
	  							ndata[i]=query;
	  						};
	  						coll.add(ndata).then(function(){
	  							WL.Toast.show('同步成功！');
	  						}).fail(function(err){
	  								WL.Toast.show('同步失败');
	  						});
	  					}).fail(function(err) {
	  						WL.Toast.show('同步失败');
	  					});	
	  	    	 }else{
	  	    		WL.Toast.show('提示','巡视没有查到符合的数据!');
	  	    	 };
			 };
		 };
		 //查数据
		 var content="{'ENGCONTRACT_NUMBER':'"+ENGCONTRACT_NUMBER+"','ELEVATOR_NO':'"+ELEVATOR_NO+"','CUSTOMER_NAME':'"+CUSTOMER_NAME+"','IS_ENTRANCE':'"+IS_ENTRANCE+"','userid':'"+userid+"','sbl_row_id':'"+sbl_row_id+"','person_id':'"+person_id+"','ebs_user_id':'"+ebs_user_id+"','init_person_id':'"+init_person_id+"','username':'"+username1+"','INT_TASK_ID':'"+INT_TASK_ID+"'}";
		 this_obj.connectServer(getResult2,'installtaskAction.do?method=toSearch',content);
	   };
	   //查长度
	   var content="{'ENGCONTRACT_NUMBER':'"+ENGCONTRACT_NUMBER+"','ELEVATOR_NO':'"+ELEVATOR_NO+"','CUSTOMER_NAME':'"+CUSTOMER_NAME+"','IS_ENTRANCE':'"+IS_ENTRANCE+"','userid':'"+userid+"','sbl_row_id':'"+sbl_row_id+"','person_id':'"+person_id+"','ebs_user_id':'"+ebs_user_id+"','init_person_id':'"+init_person_id+"','username':'"+username1+"','INT_TASK_ID':'"+INT_TASK_ID+"'}";  		
	   this_obj.connectServer(getResult,"installtaskAction.do?method=toSearchCount",content);
	},

	//返回按钮
	InstallatoinTasksSynchronousPanel_id_FH_BUTTON:function(){
		this.showBackView('installtask_id','HelcPDA.view.install.installtask.installTask');
	},
	/**
	 **安装任务 同步页面
	 ************************************************************************************/
   
	
	
	
	/************************************************************************************
	 * 安装任务  查询页面
	 * */

	//搜索按钮
    search:function(){
    	this_obj=this;
    	//获取标签的ID
    	var objID=Ext.getCmp('tabpanel_id');
   	  	var itemid=objID.getActiveItem().getId();
   	  	console.log(itemid);  
   	  	var tcodeId=null;
   	  	if(itemid=='NoAdmission_id'){
				tcodeId='INSTALL_TASK_ANTRANCE';
   	  	}else if(itemid=='InTheSystem_id'){
				tcodeId='INSTALL_TASK_ENTRANCE';
   	  	};
   	  	console.log(tcodeId);
   	  	
   	  	//获取搜索条件
   	  	var obj1=Ext.getCmp('SInstallationContractNo_id');
   	  	var ENGCONTRACT_NUMBER=obj1.getValue();
   	  	console.log(ENGCONTRACT_NUMBER);
   	  	var obj2=Ext.getCmp('SJobNumber_id');
   	  	var ELEVATOR_NO=obj2.getValue();
   	  	console.log(ELEVATOR_NO);
   	  	var obj3=Ext.getCmp('SProject_id');
   	  	var CUSTOMER_NAME=obj3.getValue();
   	  	console.log(CUSTOMER_NAME);
  	  
   	  	//判断项目是否为空
   	  	if(CUSTOMER_NAME==''){
  		  console.log('fjkdlsfj');
   	  	};
   	  	
   	  	//本地JSON中查找
   	  	var coll=WL.JSONStore.get(collectionName);
   	  	var options={};
   	  	var data={tcode:tcodeId};
   	  	coll.find(data,options).then(function(arrayResults){
   	  		//判断本地是否有数据
   	  		if(arrayResults.length==0){
  			  WL.Toast.show('任务不存在！');
   	  		}else{
   	  			var list=[];
   	  			var list2=[];
   	  			var list3=[];
   	  			var list4=[];
   	  			var m=0;
   	  			var k=0;
   	  			var l=0;
   	  			for(var j=0;j<arrayResults.length;j++){
   	  				list[j]=arrayResults[j].json;
   	  			};
   	  			console.log(list);
   	  			console.log(list[0]);
   	  			console.log(list[0].tid);
   	  			//用两个参数查找
   	  			if(ENGCONTRACT_NUMBER!=''&&ELEVATOR_NO!=''){
              	 for(var n=0;n<list.length;n++){
                	if(((list[n].stext.ENGCONTRACT_NUMBER.indexOf(ENGCONTRACT_NUMBER))!=-1)&&((list[n].stext.ELEVATOR_NO.indexOf(ELEVATOR_NO))!=-1)){
                		list3[k++]=list[n];
                	}else{
                		WL.Toast.show('找不到数据');
                		var store=Ext.data.StoreManager.get("installtaskStore");
                		if(!store){
                			store=Ext.create("HelcPDA.store.install.installtask.installtaskStore");
         				};
         				store.setData(list3,this_obj);
                	};
                  };
                  
                  //返回安装任务页面
              	  this_obj.showBackView('installtask_id','HelcPDA.view.install.installtask.installTask');
              		 
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
     					  };
     				   };
     			  };
     			  console.log(JSON.stringify(NUM));
     			  
     			//获取唯一合同对应的地址
    				var DuiYingDiZhi=[];
    				for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
    					//如果安装合同号数组，中的合同号等于，获取唯一安装合同号中的合同
    					//那么客户名称对应客户名称数组中的客户名称
    					for(var j=0;j<list.length;j++){
    						if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==ENGCONTRACT_NUMBER_LIST[j]){
    							DuiYingDiZhi[i]=CUSTOMER_NAME_LIST[j];
    							break;
  	  					};
    					};
    				};
     			  
     			  var NEW_NEED_LIST=[];
     			  for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
     				  var CNTER_NEED={};
     				  CNTER_NEED.ENGCONTRACT_NUMBER=UNIQ_ENGCONTRACT_NUMBER_LIST[i];
     				  //CNTER_NEED.CUSTOMER_NAME=UNIQ_CUSTOMER_NAME[i];
     				 CNTER_NEED.CUSTOMER_NAME=DuiYingDiZhi[i];
     				  CNTER_NEED.NUM=NUM[i];
     				  NEW_NEED_LIST[i]=CNTER_NEED;
     			  };
     			  
     			  console.log(JSON.stringify(NEW_NEED_LIST));
     			  console.log(NEW_NEED_LIST.length);
     			  console.log(NEW_NEED_LIST[0]);
     			  var store=null;
     			  if(NEW_NEED_LIST.length>0){
     				  if(itemid=='NoAdmission_id'){
     					  store=Ext.data.StoreManager.get("installtaskStore");
     					  if(!store){
     							store=Ext.create("HelcPDA.store.install.installtask.installtaskStore");
     				      };
     					  store.setData(NEW_NEED_LIST,this_obj);
      				  }else if(itemid=='InTheSystem_id'){
      					  store=Ext.data.StoreManager.get("installtaskStore2");
      					  if(!store){
      						  store=Ext.create("HelcPDA.store.install.installtask.installtaskStore2");
      					  };
      					  store.setData(NEW_NEED_LIST,this_obj);
      				  };
     			  };
               };
               
               //用一个参数查找
               if(ENGCONTRACT_NUMBER!=''&&ELEVATOR_NO==''){
            	   console.log('12345677890');
            	   for(var n=0;n<list.length;n++){
            		   if((list[n].stext.ENGCONTRACT_NUMBER.indexOf(ENGCONTRACT_NUMBER))!=-1){
            			   list2[m++]=list[n];
            		   }else{
            			   WL.Toast.show('找不到数据');
            			   var store=Ext.data.StoreManager.get("installtaskStore");
            			   if(!store){
            				   store=Ext.create("HelcPDA.store.install.installtask.installtaskStore");
            			   };
            			   store.setData(list3,this_obj);
            		   };
            	   };
            	   
            	   var ENGCONTRACT_NUMBER_LIST=[];
            	   var CUSTOMER_NAME_LIST=[];
            	   for(var i=0;i<list2.length;i++){
  				   ENGCONTRACT_NUMBER_LIST[i]=list2[i].stext.ENGCONTRACT_NUMBER;
  				   		console.log(list2[i].stext.ENGCONTRACT_NUMBER);
  				   		CUSTOMER_NAME_LIST[i]=list2[i].stext.CUSTOMER_NAME;
            	   };
            	   var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
            	   console.log(JSON.stringify(UNIQ_ENGCONTRACT_NUMBER_LIST));
            	   var UNIQ_CUSTOMER_NAME=CUSTOMER_NAME_LIST.unique3();
            	   console.log(JSON.stringify(UNIQ_CUSTOMER_NAME));
            	   var NUM=[];
            	   for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
            		   NUM[i]=0;
            		   for(var j=0;j<list2.length;j++){
            			   if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==list2[j].stext.ENGCONTRACT_NUMBER){
            				   NUM[i]++;
  						  };
            		   };
            	   };
            	   console.log(JSON.stringify(NUM));
            	   
        			//获取唯一合同对应的地址
   				var DuiYingDiZhi=[];
   				for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
   					//如果安装合同号数组，中的合同号等于，获取唯一安装合同号中的合同
   					//那么客户名称对应客户名称数组中的客户名称
   					for(var j=0;j<list.length;j++){
   						if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==ENGCONTRACT_NUMBER_LIST[j]){
   							DuiYingDiZhi[i]=CUSTOMER_NAME_LIST[j];
   							break;
 	  					};
   					};
   				};
            	   
            	   var NEW_NEED_LIST=[];
            	   for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
            		   var CNTER_NEED={};
            		   CNTER_NEED.ENGCONTRACT_NUMBER=UNIQ_ENGCONTRACT_NUMBER_LIST[i];
            		   //CNTER_NEED.CUSTOMER_NAME=UNIQ_CUSTOMER_NAME[i];
            		   CNTER_NEED.CUSTOMER_NAME=DuiYingDiZhi[i];
            		   CNTER_NEED.NUM=NUM[i];
            		   NEW_NEED_LIST[i]=CNTER_NEED;
            	   };
  			  
            	   console.log(JSON.stringify(NEW_NEED_LIST));
            	   console.log(NEW_NEED_LIST.length);
            	   console.log(NEW_NEED_LIST[0]);
            	   var store=null;
   				   if(NEW_NEED_LIST.length>0){
   					   if(itemid=='NoAdmission_id'){
   						   store=Ext.data.StoreManager.get("installtaskStore");
   						   if(!store){
   							   store=Ext.create("HelcPDA.store.install.installtask.installtaskStore");
   						   };
  						   store.setData(NEW_NEED_LIST,this_obj);
   					   }else if(itemid=='InTheSystem_id'){
   						   store=Ext.data.StoreManager.get("installtaskStore2");
   						   if(!store){
   							   store=Ext.create("HelcPDA.store.install.installtask.installtaskStore2");
   						   };
   						   store.setData(NEW_NEED_LIST,this_obj);
   					   };
   				   };
               };
               
               //用一个参数查找
               if(ENGCONTRACT_NUMBER==''&&ELEVATOR_NO!=''){
            	   console.log('12345677890');
            	   for(var n=0;n<list.length;n++){
            		   if((list[n].stext.ELEVATOR_NO.indexOf(ELEVATOR_NO))!=-1){
            			   list4[l++]=list[n];
            		   }else{
            			   WL.Toast.show('找不到数据');
            			   store=Ext.data.StoreManager.get("installtaskStore");
            			   if(!store){
            				   store=Ext.create("HelcPDA.store.install.installtask.installtaskStore");
            			   };
            			   store.setData(list4,this_obj);
            		   };
            	   };
            	   var ENGCONTRACT_NUMBER_LIST=[];
            	   var CUSTOMER_NAME_LIST=[];
            	   for(var i=0;i<list4.length;i++){
            		   ENGCONTRACT_NUMBER_LIST[i]=list4[i].stext.ENGCONTRACT_NUMBER;
            		   console.log(list4[i].stext.ENGCONTRACT_NUMBER);
            		   CUSTOMER_NAME_LIST[i]=list4[i].stext.CUSTOMER_NAME;
            	   };
            	   var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
            	   console.log(JSON.stringify(UNIQ_ENGCONTRACT_NUMBER_LIST));
            	   var UNIQ_CUSTOMER_NAME=CUSTOMER_NAME_LIST.unique3();
            	   console.log(JSON.stringify(UNIQ_CUSTOMER_NAME));
            	   var NUM=[];
            	   for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
            		   NUM[i]=0;
            		   for(var j=0;j<list4.length;j++){
            			   if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==list4[j].stext.ENGCONTRACT_NUMBER){
            				   NUM[i]++;
  						   };
            		   };
            	   };
            	   console.log(JSON.stringify(NUM));
            	   
       			//获取唯一合同对应的地址
      				var DuiYingDiZhi=[];
      				for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
      					//如果安装合同号数组，中的合同号等于，获取唯一安装合同号中的合同
      					//那么客户名称对应客户名称数组中的客户名称
      					for(var j=0;j<list.length;j++){
      						if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==ENGCONTRACT_NUMBER_LIST[j]){
      							DuiYingDiZhi[i]=CUSTOMER_NAME_LIST[j];
      							break;
    	  					};
      					};
      				};
      				
            	   var NEW_NEED_LIST=[];
            	   for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
            		   var CNTER_NEED={};
            		   CNTER_NEED.ENGCONTRACT_NUMBER=UNIQ_ENGCONTRACT_NUMBER_LIST[i];
            		   //CNTER_NEED.CUSTOMER_NAME=UNIQ_CUSTOMER_NAME[i];
            		   CNTER_NEED.CUSTOMER_NAME=DuiYingDiZhi[i];
            		   CNTER_NEED.NUM=NUM[i];
            		   NEW_NEED_LIST[i]=CNTER_NEED;
            	   };
  			  
            	   console.log(JSON.stringify(NEW_NEED_LIST));
            	   console.log(NEW_NEED_LIST.length);
            	   console.log(NEW_NEED_LIST[0]);
            	   var store=null;
   				   if(NEW_NEED_LIST.length>0){
   					   if(itemid=='NoAdmission_id'){
   						   store=Ext.data.StoreManager.get("installtaskStore");
   						   if(!store){
   							   store=Ext.create("HelcPDA.store.install.installtask.installtaskStore");
   						   };
  						   store.setData(NEW_NEED_LIST,this_obj);
   					   }else if(itemid=='InTheSystem_id'){
   						   store=Ext.data.StoreManager.get("installtaskStore2");
   						   if(!store){
   							   store=Ext.create("HelcPDA.store.install.installtask.installtaskStore2");
   						   };
   						   store.setData(NEW_NEED_LIST,this_obj);
   					   };
   				   };
               };
               
               console.log(list[0].stext.ENGCONTRACT_NUMBER);
               
               //返回安装计划页面
        	   this_obj.showBackView('installtask_id','HelcPDA.view.install.installtask.installTask');
        	   
        	   console.log('aajjj');
        	   if(ENGCONTRACT_NUMBER==''&&ELEVATOR_NO==''&&CUSTOMER_NAME==''){
        		   console.log('aajjjvvcc');
       			   var ENGCONTRACT_NUMBER_LIST=[];
    			   var CUSTOMER_NAME_LIST=[];
    			   for(var i=0;i<list.length;i++){
    				   ENGCONTRACT_NUMBER_LIST[i]=list[i].stext.ENGCONTRACT_NUMBER;
    				   console.log(list[i].stext.ENGCONTRACT_NUMBER);
    				   CUSTOMER_NAME_LIST[i]=list[i].stext.CUSTOMER_NAME;
    			   };
    			   var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
    			   console.log(JSON.stringify(UNIQ_ENGCONTRACT_NUMBER_LIST));
    			   var UNIQ_CUSTOMER_NAME=CUSTOMER_NAME_LIST.unique3();
    			   console.log(JSON.stringify(UNIQ_CUSTOMER_NAME));
    			   var NUM=[];
    			   for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
    				  NUM[i]=0;
    				  for(var j=0;j<list.length;j++){
    					  if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==list[j].stext.ENGCONTRACT_NUMBER){
    						  NUM[i]++;
    					  };
    				   };
    			   	};
    			   	console.log(JSON.stringify(NUM));
    			   	
           			//获取唯一合同对应的地址
      				var DuiYingDiZhi=[];
      				for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
      					//如果安装合同号数组，中的合同号等于，获取唯一安装合同号中的合同
      					//那么客户名称对应客户名称数组中的客户名称
      					for(var j=0;j<list.length;j++){
      						if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==ENGCONTRACT_NUMBER_LIST[j]){
      							DuiYingDiZhi[i]=CUSTOMER_NAME_LIST[j];
      							break;
    	  					};
      					};
      				};
    			   	
    			   	var NEW_NEED_LIST=[];
    			   	for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
    			   		var CNTER_NEED={};
    				    CNTER_NEED.ENGCONTRACT_NUMBER=UNIQ_ENGCONTRACT_NUMBER_LIST[i];
    				    //CNTER_NEED.CUSTOMER_NAME=UNIQ_CUSTOMER_NAME[i];
    				    CNTER_NEED.CUSTOMER_NAME=DuiYingDiZhi[i];
    				    CNTER_NEED.NUM=NUM[i];
    				    NEW_NEED_LIST[i]=CNTER_NEED;
    			   	};
    			  
    			   	console.log(JSON.stringify(NEW_NEED_LIST));
    			   	console.log(NEW_NEED_LIST.length);
    			   	console.log(NEW_NEED_LIST[0]);
    			   	var store=null;
      				if(NEW_NEED_LIST.length>0){
      					if(itemid=='NoAdmission_id'){
      						store=Ext.data.StoreManager.get("installtaskStore");
      						if(!store){
    							store=Ext.create("HelcPDA.store.install.installtask.installtaskStore");
      						};
    						store.setData(NEW_NEED_LIST,this_obj);
      					}else if(itemid=='InTheSystem_id'){
      						store=Ext.data.StoreManager.get("installtaskStore2");
      						if(!store){
      							store=Ext.create("HelcPDA.store.install.installtask.installtaskStore2");
      						};
      						store.setData(NEW_NEED_LIST,this_obj);
      					};
      				};
       		 	};
  		  };
  	  }).fail(function(errorObject){
  		  WL.Toast.show('搜索出错!');
	  });
   },

	//返回按钮
   InstallatoinTasksSearchPanel_id_FH_BUTTON:function(){
	   this.showBackView('installtask_id','HelcPDA.view.install.installtask.installTask');
   },
	/**
	 ** 安装任务  查询页面
	 ************************************************************************************/
	
	
	 //前同步 现已没用
      Inquiry:function(){
    	  var IS_ENTRANCE=null;
    	  var objID=Ext.getCmp('tabpanel_id');
    	 var itemid=objID.getActiveItem().getId();
    	 if(itemid=='NoAdmission_id'){
    		 IS_ENTRANCE=false;
    	 }else if(itemid=='InTheSystem_id'){
    		 IS_ENTRANCE=true;
    	 }
    	 console.log(itemid);
    	 console.log( IS_ENTRANCE);
    	  var INT_TASK_ID=0;
    	
    	  var obj1=Ext.getCmp('InstallationContractNo_id');
    	  var ENGCONTRACT_NUMBER=obj1.getValue();
    	  var obj2=Ext.getCmp('JobNumber_id');
    	  var ELEVATOR_NO=obj2.getValue();
    	  var obj3=Ext.getCmp('Project_id');
    	  var CUSTOMER_NAME=obj3.getValue();
  		var obj=Ext.getCmp('installtask_id');
  		if(!obj){
  			 obj=Ext.create('HelcPDA.view.install.installtask.installTask');
  		}
  		 Ext.Viewport.setActiveItem(obj);
  		 getResult=function(res){
  			     list = res.item;
  			   if(itemid=='NoAdmission_id'){
  				 var str=document.getElementById("title_id").innerHTML;
  				 if(str=='未进场'){
   			    str=str+'('+list.length+')';
   			  document.getElementById("title_id").innerHTML=str;
  				 }
  	    	 }else if(itemid=='InTheSystem_id'){
  	    		var str=document.getElementById("title_id2").innerHTML;
  	    		 if(str=='在制'){
  	    		
  			    str=str+'('+list.length+')';
  			  document.getElementById("title_id2").innerHTML=str;
  	    		 }
  	    	 }
  			   var str=document.getElementById("title_id2").innerHTML;
  			    str=str+'('+list.length+')';
  			  // alert(str);
  			     //var objTotal=Ext.getCmp('InTheSystem_id');
  			   //  alert(document.getElementById("title_id2").innerHTML);
  			  //   console.log(objTotal.getTitle());
  			  //   alert(objTotal.getTitle());
  			   //  alert(objTotal);
  			     console.log(list);
  			  var ENGCONTRACT_NUMBER_LIST=[];
			  var CUSTOMER_NAME_LIST=[];
			  for(var i=0;i<list.length;i++){
				  ENGCONTRACT_NUMBER_LIST[i]=list[i].ENGCONTRACT_NUMBER;
				  CUSTOMER_NAME_LIST[i]=list[i].CUSTOMER_NAME;
			  }
			  var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
			  console.log(JSON.stringify(UNIQ_ENGCONTRACT_NUMBER_LIST));
			  var UNIQ_CUSTOMER_NAME=CUSTOMER_NAME_LIST.unique3();
			  console.log(JSON.stringify(UNIQ_CUSTOMER_NAME));
			  var NUM=[];
			  for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
				  NUM[i]=0;
				  for(var j=0;j<list.length;j++){
					  
					  if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==list[j].ENGCONTRACT_NUMBER){
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
			  var tcodeId=null;
  				if(NEW_NEED_LIST.length>0){
  					if(itemid=='NoAdmission_id'){
  						tcodeId='INSTALL_TASK_ANTRANCE';
					 store=Ext.data.StoreManager.get("installtaskStore");
					 if(!store){
							store=Ext.create("HelcPDA.store.install.installtask.installtaskStore");
						}
						store.setData(NEW_NEED_LIST,this);
						
  					}else if(itemid=='InTheSystem_id'){
  						tcodeId='INSTALL_TASK_ENTRANCE';
  						 store=Ext.data.StoreManager.get("installtaskStore2");
  						if(!store){
  							store=Ext.create("HelcPDA.store.install.installtask.installtaskStore2");
  						}
  						store.setData(NEW_NEED_LIST,this);
  					}
  					var query={tcode:tcodeId};
  					console.log(tcodeId);
					var coll=WL.JSONStore.get(collectionName);
					coll.remove(query).then(function(){
						//循环添加每一条到JSONStore
						  var ndata=[];
						 
						  for(var i=0;i<list.length;i++){
							 var query={tid:list[i].ENGCONTRACT_NUMBER+'_'+list[i].ELEVATOR_NO+'_'+list[i].SEQ_NUM,tcode:tcodeId,stext:list[i]};
						       ndata[i]=query;
						  }
						  coll.add(ndata).then(function(){
							  
						  }).fail(function(err){
								WL.Toast.show('缓存失败！');
							//  Ext.Msg.alert("缓存失败");
						  });
					  }).fail(function(err){
						  WL.Toast.show('初始化删除失败');
						  //Ext.Msg.alert("初始化删除失败");
						  });	
					
				
    	 }else{
    		 WL.Toast.show('提示','巡视没有查到符合的数据!');
    		// Ext.Msg.alert('提示','巡视没有查到符合的数据!');  
    		   
    	 } 
  			};
  			//'ENGCONTRACT_NUMBER':'AH1203404','ELEVATOR_NO':'12G031204','CUSTOMER_NAME':'',
  			var content="{'ENGCONTRACT_NUMBER':'"+ENGCONTRACT_NUMBER+"','ELEVATOR_NO':'"+ELEVATOR_NO+"','CUSTOMER_NAME':'"+CUSTOMER_NAME+"','IS_ENTRANCE':'"+IS_ENTRANCE+"','userid':'"+userid+"','sbl_row_id':'"+sbl_row_id+"','person_id':'"+person_id+"','ebs_user_id':'"+ebs_user_id+"','init_person_id':'"+init_person_id+"','username':'"+username1+"','INT_TASK_ID':'"+INT_TASK_ID+"'}";
  			this.connectServer(getResult,'installtaskAction.do?method=toSearch',content);
      },
      
  	
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


