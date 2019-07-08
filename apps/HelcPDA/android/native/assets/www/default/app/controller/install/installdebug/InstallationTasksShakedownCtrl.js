
/* JavaScript content from app/controller/install/installdebug/InstallationTasksShakedownCtrl.js in folder common */
var lists=[];
Ext.define('HelcPDA.controller.install.installdebug.InstallationTasksShakedownCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//进去to——task页面时处                  
			InstallatoinTasksShakedownPanel_toTask:'button[id=DebuggingTasks_id]',
			//进入搜索页面
			InstallatoinTasksShakedownPanel_toUpdate_page:'button[id=toUpdate_page]',
			//进入离线查询界面
			InstallatoinTasksShakedownPanel_toLiXian_page:'button[id=toLiXian_page]',
			//离线查询
			InstallatoinTasksShakedownPanel_toSearch_lixian:'button[id=toSearch_lixian]',
			//更新
			InstallatoinTasksShakedownPanel_toUpdate_task:'button[id=toUpdate_task]',
			//点击第一个list中的一条数据,在第二个list中显示所在的值
			InstallatoinTasksShakedownPanel_task_list1:'list[id=task_list1]',
		    //点击查询工号
		    InstallatoinTasksShakedownPanel_Serach_ELEVATOR_NO:'button[id=Serach_ELEVATOR_NO]'
		    //点击第二个list的一条数据，触发事件
		   ,InstallatoinTasksShakedownPanel_task_list2:'list[id=task_list2]'
		    //保存页面信息
		   ,InstallatoinTasksShakedownPanel_save_task:'button[id=save_task]'
		   ,//点击查找员工列表
		   InstallatoinTasksShakedownPanel_serach_Employee_task:'button[id=serach_Employee_task]'
		   ,//点击员工list列表，选择其中一个成员
		   InstallatoinTasksShakedownPanel_serach_Employee_list:'list[id=serach_Employee_list]',
		   //点击list对数据进行删除操作
		   InstallatoinTasksShakedownPanel_serach_Employee_list_del:'list[id=Employee_list_del]'
		   ,//点击第二个搜索
		   InstallatoinTasksShakedownPanel_serach_Employee_task1:'button[id=serach_Employee_task1]',
		   //点击列表的list
		   InstallatoinTasksShakedownPanel_serach_Employee_list1:'list[id=serach_Employee_list1]',
		   //删除第二个表的数据
		   InstallatoinTasksShakedownPanel_Employee_list_del1:'list[id=Employee_list_del1]'
		   //提交员工编号
		  ,InstallatoinTasksShakedownPanel_submit_Employee:'button[id=submit_Employee]'
		   //提交所有的数据
		  ,InstallatoinTasksShakedownPanel_submit_All_task:'button[id=submit_All_task]'
	      //签名
	     // ,InstallatoinTasksShakedownPanel_FOR_FULL_NAME:'button[id=FOR_FULL_NAME]'
		  //菜单
	      ,InstallatoinTasksShakedownPanel_check_detail:'button[id=check_detail]',
	      //回滚
	      InstallatoinTasksShakedownPanel_rollback:'button[id=rollback]',
		  //主页返回
	      debugmainBack:'button[id=debugmainBack]',
	      //list1返回到模块选择页面
	      debugList1:'button[id=debugList1]',
	      //返回到第一个list
	      debugbackList1:'button[id=debugbackList1]',
	      //查找返回
	      debugbackList:'button[id=debugbackList]',
	      //查找返回
	      debugSearchBack:'button[id=debugSearchBack]',
	      //待提交
	      dbugwait_submit:'button[id=dbugwait_submit]'
		},
		control:{
			InstallatoinTasksShakedownPanel_toTask:{
				  tap:'toTask'
			},
			InstallatoinTasksShakedownPanel_toUpdate_task:{
				  tap:'toUpdate_task'
			},
			InstallatoinTasksShakedownPanel_task_list1:{
				  itemtap:'Itemtap_task_list1'
			},
			InstallatoinTasksShakedownPanel_Serach_ELEVATOR_NO:{
				  tap:'Serach_ELEVATOR_NO'
			},InstallatoinTasksShakedownPanel_task_list2:{
				  itemtap:'task_list2'
			},InstallatoinTasksShakedownPanel_save_task:{
				  tap:'save_task'
			},
			InstallatoinTasksShakedownPanel_serach_Employee_task:{
				  tap:'serach_Employee_task'
			},
			InstallatoinTasksShakedownPanel_serach_Employee_list:{
				  itemtap:'serach_Employee_list'
			},InstallatoinTasksShakedownPanel_serach_Employee_list_del:{
				  itemtap:'Employee_list_del'
			},
			InstallatoinTasksShakedownPanel_serach_Employee_task1:{
				  tap:'serach_Employee_task1'
			},InstallatoinTasksShakedownPanel_serach_Employee_list1:{
				  itemtap:'serach_Employee_list1'
			},InstallatoinTasksShakedownPanel_Employee_list_del1:{
				  itemtap:'Employee_list_del1'
			},
			InstallatoinTasksShakedownPanel_submit_Employee:{
				  tap:'submit_Employee'
			},
			InstallatoinTasksShakedownPanel_submit_All_task:{
				tap:'submit_All_task'
			},
//			InstallatoinTasksShakedownPanel_FOR_FULL_NAME:{
//				tap:'FOR_FULL_NAME'
//			},
			InstallatoinTasksShakedownPanel_check_detail:{
				tap:'check_detail'
			},
			InstallatoinTasksShakedownPanel_rollback:{
				tap:'rollback'
			},
			InstallatoinTasksShakedownPanel_toUpdate_page:{
				tap:'toUpdate_page'
			},
			InstallatoinTasksShakedownPanel_toLiXian_page:{
				tap:'toLiXian_page'
			},InstallatoinTasksShakedownPanel_toSearch_lixian:{
				tap:'toSearch_lixian'
			},
			debugmainBack:{
				tap:'debugmainBack'
			},
			debugList1:{
				tap:'debugList1'
			},
			debugbackList1:{
				tap:'debugbackList1'
			},
			debugbackList:{
				tap:'debugbackList'
			},
			debugSearchBack:{
				tap:'debugSearchBack'
			},
			dbugwait_submit:{
				tap:'dbugwait_submit'
			}
		}
	},
	dbugwait_submit:function(){
		this.NextView('wfc_list_view','HelcPDA.view.waitingdata.WaitingForCommitData_List_V');
		var obj_v = Ext.getCmp('wfc_list_view');
		obj_v.loadDataJST();
	},
	debugSearchBack:function(){
		this.BackView();
	},
	debugbackList:function(){
		this.BackView();
	},
	//返回到list1
	debugbackList1:function(){
		this.BackView();
	},
	//返回到大页面
	debugList1:function(){
		this.BackView();
	},
	//主页返回
	debugmainBack:function(){
		this.BackView();
	},
	toUpdate_page:function(){
	  this.NextView('installationTasksShakedownSearch','HelcPDA.view.install.installdebug.InstallationTasksShakedownSearch');	
	},
	toLiXian_page:function(){
	  this.NextView('installationTasksShakedownSearch_1','HelcPDA.view.install.installdebug.InstallationTasksShakedownSearch_1');	
	},
	toSearch_lixian:function(){
		var obj=this;
	  var WL_task=WL.JSONStore.get(collectionName);
	  var ENGCONTRACT_NUMBER=Ext.getCmp('ENGCONTRACT_NUMBER').getValue();
	  var ELEVATOR_NO=Ext.getCmp('ELEVATOR_NO').getValue();
	  var store=obj.getStore("InstallatoinTasksShakedownStore","HelcPDA.store.install.installdebug.InstallatoinTasksShakedownStore");
	  if(ENGCONTRACT_NUMBER!=''&&ELEVATOR_NO==''){
		 var  query1={tcode:'_task_list'+ebs_user_id,tid:'tiaoshi_task'};
		 var options={
	    		   exact:true
	       }; 
		 WL_task.find(query1,options).then(function(res){
			  if(res[0]==''||res[0]==null||typeof(res[0])=='undefined'){
				  WL.Toast.show('没有查找到相关信息');
	    	   }else{
	    		   var list=res[0].json.stext;
	    		   var length=list.length;
	    		   var templist=[];
	    		   for(var i=0;i<length;i++){
	    			   if(list[i].ENGCONTRACT_NUMBER==ENGCONTRACT_NUMBER){
	    				   templist.push(list[i]);
	    			   }
	    		   }
	    		   if(templist.length==0){
	    			   WL.Toast.show('没有查找到相关合同号信息');
	    		   }else{
	    			   store.setData(templist);
		    		   Ext.getCmp('label_ForTai').setHtml("总台数("+templist[0].NUM+")");
		    		   obj.BackView();
	    		   }
	    	   }
		 }).fail(function(){});
		  
	  }else if(ENGCONTRACT_NUMBER==''&&ELEVATOR_NO!=''){
		  var query={tcode:ebs_user_id+"_task"};
		  WL_task.find(query).then(function(res){
			  if(res[0]==''||res[0]==null||typeof(res[0])=='undefined'){
				  WL.Toast.show('没有查找到相关信息');
	    	   }else{		
	    		   var length=res.length;
	    		   var tempENGCONTRACT_NUMBER=null;
	    		   for(var i=0;i<length;i++){
	    			   var templist=res[i].json.stext;
	    			   if(Ext.isArray(templist)){
	    				   
	    			   }else{
	    				   if(templist.ELEVATOR_NO==ELEVATOR_NO){
	    					   tempENGCONTRACT_NUMBER=templist.ENGCONTRACT_NUMBER;
	    				   }
	    			   }
	    		   }
	    		   var  query1={tcode:'_task_list'+ebs_user_id,tid:'tiaoshi_task'};
	    			 var options={
	    		    		   exact:true
	    		       }; 
	    			 WL_task.find(query1,options).then(function(res){
	    				  if(res[0]==''||res[0]==null||typeof(res[0])=='undefined'){
	    					  WL.Toast.show('没有查找到相关信息');
	    		    	   }else{
	    		    		   var list=res[0].json.stext;
	    		    		   var length=list.length;
	    		    		   var templist=[];
	    		    		   for(var i=0;i<length;i++){
	    		    			   if(list[i].ENGCONTRACT_NUMBER==tempENGCONTRACT_NUMBER){
	    		    				   templist.push(list[i]);
	    		    			   }
	    		    		   }
	    		    		   if(templist.length==0){
	    		    			   WL.Toast.show('没有查找到相关工号信息');
	    		    		   }else{
	    		    			   Ext.getCmp('ENLEVETOR_NUM').setValue(ELEVATOR_NO);
	    		    			   templist[0].NUM=1;
	    		    			   store.setData(templist);
	    			    		   Ext.getCmp('label_ForTai').setHtml("总台数("+templist[0].NUM+")");
	    			    		   obj.BackView();
	    		    		   }
	    		    	   }
	    			 }).fail(function(){});
	    			  
	    	   
	    	   }
			  
		  }).fail(function(){});
		  
	  }else if(ENGCONTRACT_NUMBER!=''&&ELEVATOR_NO!=''){
			 var  query1={tcode:'_task_list'+ebs_user_id,tid:'tiaoshi_task'};
			 var options={
		    		   exact:true
		       }; 
			 WL_task.find(query1,options).then(function(res){
				  if(res[0]==''||res[0]==null||typeof(res[0])=='undefined'){
					  WL.Toast.show('没有查找到相关信息');
		    	   }else{
		    		   var list=res[0].json.stext;
		    		   var length=list.length;
		    		   var templist=[];
		    		   for(var i=0;i<length;i++){
		    			   if(list[i].ENGCONTRACT_NUMBER==ENGCONTRACT_NUMBER){
		    				   templist.push(list[i]);
		    			   }
		    		   }
		    		   if(templist.length==0){
		    			   var query={tcode:ebs_user_id+"_task"};
		    				  WL_task.find(query).then(function(res){
		    					  if(res[0]==''||res[0]==null||typeof(res[0])=='undefined'){
		    						  WL.Toast.show('没有查找到相关信息');
		    			    	   }else{		
		    			    		   var length=res.length;
		    			    		   var tempENGCONTRACT_NUMBER=null;
		    			    		   for(var i=0;i<length;i++){
		    			    			   var templist=res[i].json.stext;
		    			    			   if(Ext.isArray(templist)){
		    			    				   
		    			    			   }else{
		    			    				   if(templist.ELEVATOR_NO==ELEVATOR_NO){
		    			    					   tempENGCONTRACT_NUMBER=templist.ENGCONTRACT_NUMBER;
		    			    				   }
		    			    			   }
		    			    		   }
		    			    		   var  query1={tcode:'_task_list'+ebs_user_id,tid:'tiaoshi_task'};
		    			    			 var options={
		    			    		    		   exact:true
		    			    		       }; 
		    			    			 WL_task.find(query1,options).then(function(res){
		    			    				  if(res[0]==''||res[0]==null||typeof(res[0])=='undefined'){
		    			    					  WL.Toast.show('没有查找到相关信息');
		    			    		    	   }else{
		    			    		    		   var list=res[0].json.stext;
		    			    		    		   var length=list.length;
		    			    		    		   var templist=[];
		    			    		    		   for(var i=0;i<length;i++){
		    			    		    			   if(list[i].ENGCONTRACT_NUMBER==tempENGCONTRACT_NUMBER){
		    			    		    				   templist.push(list[i]);
		    			    		    			   }
		    			    		    		   }
		    			    		    		   if(templist.length==0){
		    			    		    			   WL.Toast.show('没有查找到相关合同号和工号信息');
		    			    		    		   }else{
		    			    		    			   Ext.getCmp('ENLEVETOR_NUM').setValue(ELEVATOR_NO);
		    			    		    			   templist[0].NUM=1;
		    			    		    			   store.setData(templist);
		    			    			    		   Ext.getCmp('label_ForTai').setHtml("总台数("+templist[0].NUM+")");
		    			    			    		   obj.BackView();
		    			    		    		   }
		    			    		    	   }
		    			    			 }).fail(function(){});
		    			    			  
		    			    	   
		    			    	   }
		    					  
		    				  }).fail(function(){});
		    		   }else{
		    			   store.setData(templist);
			    		   Ext.getCmp('label_ForTai').setHtml("总台数("+templist[0].NUM+")");
			    		   obj.BackView();
			    		   return;
		    		   }
		    	   }
			 }).fail(function(){});
			  
	  }else{
		  var WL_task=WL.JSONStore.get(collectionName);
	       var query={tcode:'_task_list'+ebs_user_id,tid:'tiaoshi_task'};
	       var options={
	    		   exact:true
	       };       
	       WL_task.find(query,options).then(function(res){
	    	   if(res[0]==''||res[0]==null||typeof(res[0])=='undefined'){
	    		   WL.Toast.show('没有查找到相关信息');
	    	   }else{
	    		   store.setData(res[0].json.stext);
	    		   var NUM=0;
	    		   var list=res[0].json.stext;
	    		   for(var i=0;i<list.length;i++){
	    			   NUM+=list[i].NUM;
	    		   }
	    		   Ext.getCmp('label_ForTai').setHtml("总台数("+NUM+")");
	    		   obj.BackView();
	    	   }
	       }).fail(function(){
	    	   WL.Toast.show('查找缓存数据失败');
	       }); 
		  
	  }
	},
	toTask:function(){
	   var obj=this;
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
    	   WL.Toast.show('查找缓存数据失败');
       });
       
	},
	toUpdate_task:function(){
		var obj=this;
		var getResult=function(res){
			if(res.rows==''||res.rows==null||typeof(res.rows)=='undefined'){
				 WL.Toast.show("暂无新的信息");
				 return;
			}
			  var list=[];
			  list=res.rows;
			  var store=obj.getStore("InstallatoinTasksShakedownStore","HelcPDA.store.install.installdebug.InstallatoinTasksShakedownStore");  
			  Ext.getCmp('label_ForTai').setHtml("总台数("+(list.length)+")");
			  //对相应数据进行排序，处理处第一次list的值
			  var ENGCONTRACT_NUMBER_LIST=[];
			  for(var i=0;i<list.length;i++){
				  ENGCONTRACT_NUMBER_LIST[i]=list[i].ENGCONTRACT_NUMBER;
			  }
			  var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
			  var UNIQ_CUSTOMER_NAME=[];
			  var NUM=[];
			  for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
				  NUM[i]=0;
				  for(var j=0;j<list.length;j++){
					  if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==list[j].ENGCONTRACT_NUMBER){
						  NUM[i]++;
						  UNIQ_CUSTOMER_NAME[i]=list[j].CUSTOMER_NAME;
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
			
			  var WL_task=WL.JSONStore.get(collectionName);
			 
			  
			  var query={tcode:'_task_list'+ebs_user_id,tid:'tiaoshi_task'};
			  WL_task.find(query).then(function(res){
				  if(!(res==''||res==null||typeof(res)=='undefined')){
					   WL_task.remove(query).then(function(){  
					    	
						     var query={tcode:ebs_user_id+"_task"};
			                 WL_task.find(query).then(function(res){
							  if(!(res==''||res==null||typeof(res)=='undefined')){
								  WL_task.remove(query).then(function(){  
								    	addData();
								  }).fail(function(){WL.Toast.show("删除多个list列表失败");});
								 }
			                 });
					  }).fail(function(){WL.Toast.show("删除单个list列表失败");});
					  
				  }else{
					  addData();
				  }
				  });
			  
			  function  addData(){
				  //保存第一张list界面生成的数据
				  var  query1={tcode:'_task_list'+ebs_user_id,tid:'tiaoshi_task',stext:NEW_NEED_LIST};
				  WL_task.add(query1).then(function(){
					//循环添加每一条到JSONStore
				  	  //当用户点击更新的时候，要清楚掉当前缓存的数据，重新赋值
						  var ndata=[];
						  var length=list.length;
						  for(var i=0;i<length;i++){
								var TIAO_SATRTUS=list[i].TIAO_SATRTUS;
					    		var DEBUG_RETURN_REASON1=list[i].DEBUG_RETURN_REASON;
					    		var DEBUG_RETURN_DATE1=list[i].DEBUG_RETURN_DATE;
					    		var DEBUG_ARRIVE_DATE=list[i].DEBUG_ARRIVE_DATE;
					    		var DEBUG_END_DATE=list[i].DEBUG_END_DATE; 
					    		if(TIAO_SATRTUS==''){
					        			 if(DEBUG_ARRIVE_DATE==''||DEBUG_ARRIVE_DATE==null||typeof(DEBUG_ARRIVE_DATE)=='undefined'){
					        				 list[i].TIAO_SATRTUS='调试未到达';
					        				 //清理掉退调数据
					        			 }else{
					        				 if(DEBUG_END_DATE==''||DEBUG_END_DATE==null||typeof(DEBUG_END_DATE)=='undefined'){
					        					 list[i].TIAO_SATRTUS='调试中';
					        				 }else{
					        					 list[i].TIAO_SATRTUS='已提交'; 
					        				 }
					        			 }
					    		}else if(TIAO_SATRTUS=='已进入待提交队列'){
					    			 if((DEBUG_RETURN_REASON1=='')&&(DEBUG_RETURN_DATE1=='')){
					    				 if(DEBUG_ARRIVE_DATE==''||DEBUG_ARRIVE_DATE==null||typeof(DEBUG_ARRIVE_DATE)=='undefined'){
					        				 list[i].TIAO_SATRTUS='调试未到达';
					        			 }else{
					        				 if(DEBUG_END_DATE==''||DEBUG_END_DATE==null||typeof(DEBUG_END_DATE)=='undefined'){
					        					 list[i].TIAO_SATRTUS='调试中';	
					        				 }else{
					        					 list[i].TIAO_SATRTUS='已提交'; 
					        				 }
					        			 }
				        			 }else{
				        				 list[i].TIAO_SATRTUS='已退调';
				        			 }
					    		}else if(TIAO_SATRTUS=='调试未到达'){
					    		}else if(TIAO_SATRTUS=='调试中'){
					    		}else{
					    			 list[i].TIAO_SATRTUS='已退调';
					    		}
							  var query={};
							  query={tcode:ebs_user_id+"_task",tid:JSON.stringify(list[i].ENGCONTRACT_NUMBER),stext:list[i]};
						      ndata[i]=query;
						  }
					      obj.BackView();
						  WL_task.add(ndata).then(function(){
						  }).fail(function(err){
							  WL.Toast.show("缓存失败");
						  });
				  }).fail(function(err){
					  WL.Toast.show("第一张list添加失败");
				  });
				  
				  
			  }
			  
			  
		 };
		     var ENGCONTRACT_NUMBER=Ext.getCmp('ENGCONTRACT_NUMBER').getValue();
		     var ELEVATOR_NO=Ext.getCmp('ELEVATOR_NO').getValue();
			 var content="{'userid':'"+ebs_user_id+"','init_person_id':'"+init_person_id+"','ENGCONTRACT_NUMBER':'"+ENGCONTRACT_NUMBER+"','ELEVATOR_NO':'"+ELEVATOR_NO+"','PDA3':'PDA3'}";    					
			 this.connectServer(getResult,'tiaoshi2Action.do?method=toSearch',content);
	},
	//点击第一个list 的一个属性
	Itemtap_task_list1:function(obk,index,target,record,e,eOpts){
    var obj=this;   
	var store=obj.getStore("InstallatoinTasksShakedownStore","HelcPDA.store.install.installdebug.InstallatoinTasksShakedownStore");  
    var ENGCONTRACT_NUMBER=store.getAt(index).get("ENGCONTRACT_NUMBER");	
    var ENLEVETOR_NUM=Ext.getCmp('ENLEVETOR_NUM').getValue();
    //开始查找对应的第二list
    obj.NextView('installationTasksShakedownPanel1','HelcPDA.view.install.installdebug.InstallationTasksShakedownPanel1');
    var WL_task=WL.JSONStore.get(collectionName);
    
    var query={tcode:ebs_user_id+"_task",tid:JSON.stringify(ENGCONTRACT_NUMBER)};
    WL_task.find(query).then(function(res){
        var list=[];
    	for(var i=0;i<res.length;i++){
    		list[i]=res[i].json.stext;
    		if(res[i].json.status=="1"){
    			res[i].json.TIAO_SATRTUS=='已进入待提交队列';
    		}else{
    			var TIAO_SATRTUS=list[i].TIAO_SATRTUS;
	    		var DEBUG_RETURN_REASON1=list[i].DEBUG_RETURN_REASON;
	    		var DEBUG_RETURN_DATE1=list[i].DEBUG_RETURN_DATE;
	    		var DEBUG_ARRIVE_DATE=list[i].DEBUG_ARRIVE_DATE;
	    		var DEBUG_END_DATE=list[i].DEBUG_END_DATE; 
	    		if(TIAO_SATRTUS==''){
       			 if(DEBUG_ARRIVE_DATE==''||DEBUG_ARRIVE_DATE==null||typeof(DEBUG_ARRIVE_DATE)=='undefined'){
       				 list[i].TIAO_SATRTUS='调试未到达';
       			 }else{
       				 if(DEBUG_END_DATE==''||DEBUG_END_DATE==null||typeof(DEBUG_END_DATE)=='undefined'){
       					 list[i].TIAO_SATRTUS='调试中';
       				 }else{
       					 list[i].TIAO_SATRTUS='已提交'; 
       				 }
       			 }
   		    }else if(TIAO_SATRTUS=='已进入待提交队列'){
   			 if((DEBUG_RETURN_REASON1=='')&&(DEBUG_RETURN_DATE1=='')){
   				 if(DEBUG_ARRIVE_DATE==''||DEBUG_ARRIVE_DATE==null||typeof(DEBUG_ARRIVE_DATE)=='undefined'){
    				 list[i].TIAO_SATRTUS='调试未到达';
    			 }else{
    				 if(DEBUG_END_DATE==''||DEBUG_END_DATE==null||typeof(DEBUG_END_DATE)=='undefined'){
    					 list[i].TIAO_SATRTUS='调试中';
    				 }else{
    					 list[i].TIAO_SATRTUS='已提交'; 
    				 }
    			 }
   			 }else{
   				 
   				 list[i].TIAO_SATRTUS='已退调';
   			 }
   		}else if(TIAO_SATRTUS=='调试未到达'){
   		}else if(TIAO_SATRTUS=='调试中'){
   		}else{
   			 list[i].TIAO_SATRTUS='已退调';
   		}
    		}
    		if(ENLEVETOR_NUM!=''){
    			if(list[i].ELEVATOR_NO==ENLEVETOR_NUM){
    				lists[0]=res[i];
    			}
    		}else{
    			lists[i]=res[i];
    		}
    	}
    	var templist=[];
    	var length=list.length;
    	for(var i=0;i<length;i++){
    		if(ENLEVETOR_NUM==list[i].ELEVATOR_NO){
    			templist[0]=list[i];
    		}
    		
    	}
    	if(templist.length>0){
    		list=templist;
    	}
    	var store1=obj.getStore("InstallatoinTasksShakedown_1Store","HelcPDA.store.install.installdebug.InstallatoinTasksShakedown_1Store");  
    	store1.setData(list);
    }).fail(function(err){
    	WL.Toast.show("查找缓存失败");
    });
    
    var text=Ext.getCmp('ELEVATOR_NO_Text');
    text.addListener('keyup',Serach_NUM,this,{
   	    buffer: 1000 //间隔1秒响应，在响应前点击无效
	   });
    text.addListener('change',Serach_NUM,this,{
  	    buffer: 1000 //间隔1秒响应，在响应前点击无效
	   });
    
	},
	//根据工号查询数据
	Serach_ELEVATOR_NO:function(){
		Serach_NUM();
},
	//点击第二个list触发的事件
	task_list2:function(obk,index,target,record,e,eOpts){
		var obj=this;
		obj.NextView('installationTasksMainShakedownPanel','HelcPDA.view.install.installdebug.InstallationTasksMainShakedownPanel');
		//var ELEVATOR_NO=store.getAt(index).get("ELEVATOR_NO");	
		WL_task=WL.JSONStore.get(collectionName);
		var query={_id:lists[index]._id};
		//对监理人员进行功能屏蔽  监理人员不能转派
		if(init_person_id==''||init_person_id==null||typeof(init_person_id)=='undefined'){
    		    Ext.getCmp('submit_Employee').setDisabled(false);
        	}else{
        		WL.Toast.show('监理不能进行调试操作');
    			Ext.getCmp('submit_Employee').setDisabled(true);
    		}
		//功能屏蔽结束
		
		//左右滑动页签
		var ITF_tab = Ext.getCmp('tab_panel'); 
		//左右滑动页签
		var i =0;
		Ext.get('tab_panel').on('swipe',function(e,t){
			
			if (e.direction === 'left' && e.distance >= 20) {
				ITF_tab.setActiveItem(ITF_tab.innerItems[i+1]);
				if(i==ITF_tab.innerItems.length-1){
				}else{
					i++;
				}
		    } else if (e.direction === 'right' && e.distance >= 20) {
		    	ITF_tab.setActiveItem(ITF_tab.innerItems[i-1]);
		    	if(i==0){
		    	}else{
		    		i--;
		    	}
		    }
		});
		
		ITF_tab.addListener('activeitemchange',function(obj,value,oldValue,eOpts  ){
			var itemId = value.id;
			if (itemId == 'containner_1') {
				i=0;
			}else if (itemId == 'containner_2') {
				i=1;
			}else if (itemId == 'containner_3') {
				i=2;
			}else if (itemId == 'containner_4') {
				i=3;
			}else{
				
			}
		},this,{
		});
		
		
		Ext.getCmp('task_id').setValue(lists[index]._id);
		WL_task.find(query).then(function(res){
			if(res==''||res==null||typeof(res)=='undefined'){
				 WL.Toast.show("查找缓存信息失败");
				 return;
			}
	
			 //对调试增加监听事件
		    var arr_time=Ext.getCmp('TASK_DEBUG_ARRIVE_DATE');
		    var slow_time=Ext.getCmp('TASK_SLOW_TRAIN_ENTER_DATE');
		    var fast_time=Ext.getCmp('TASK_FAST_TRAIN_ENTER_DATE');
		    var banlac_index=Ext.getCmp('TASK_BALANCE_INDEX');
		    var counter_weight=Ext.getCmp('TASK_COUNTER_WEIGHT');
		    var lb_machine=Ext.getCmp('TASK_LB_MACHINE_FLAG');
		    var function_flag=Ext.getCmp('TASK_FUCTION_TEST_FLAG');
		    var need_second=Ext.getCmp('TASK_NEED_SECOND_TEST_WEIGHT');
		    var three_bad=Ext.getCmp('TASK_THREE_GUARANTEE_BAD');
		    var debug_end=Ext.getCmp('TASK_DEBUG_END_DATE');
		    var ebs_full=Ext.getCmp('TASK_EBS_FULL_NAME');
		   
		    arr_time.addListener('change',function(){
		    	var value=arr_time.getValue();
		    	if(value==''||value==null||typeof(value)=='undefined'){
		    		slow_time.setDisabled(true);
		    		fast_time.setDisabled(true);
		    		banlac_index.setDisabled(true);
		    		counter_weight.setDisabled(true);
		    		lb_machine.setDisabled(true);
		    		function_flag.setDisabled(true);
		    		need_second.setDisabled(true);
		    		three_bad.setDisabled(true);
		    		debug_end.setDisabled(true);
		    		ebs_full.setDisabled(true);
		    	}else{
		    		slow_time.setDisabled(false);
		    	}
		    });
		    slow_time.addListener('change',function(){
		    	var value=slow_time.getValue();
		    	var arr_value=arr_time.getValue();
		    	if(value==''||value==null||typeof(value)=='undefined'){
		    		fast_time.setDisabled(true);
		    		banlac_index.setDisabled(true);
		    		counter_weight.setDisabled(true);
		    		lb_machine.setDisabled(true);
		    		function_flag.setDisabled(true);
		    		need_second.setDisabled(true);
		    		three_bad.setDisabled(true);
		    		debug_end.setDisabled(true);
		    		ebs_full.setDisabled(true);
		    	}else{
		    		var arvt=Ext.Date.format(new Date(arr_value),'Y-m-d');
		    		var slov=Ext.Date.format(new Date(value),'Y-m-d');
		    		var a=comptime(arvt,slov);
		    		 if(a<0){
		    			 WL.Toast.show("慢车时间必须大于或等于调试到达日期");
		    			slow_time.setValue();
		    			 return ;
		    		 }
		    		 fast_time.setDisabled(false);
		    	}
		    });
		    fast_time.addListener('change',function(){
		    	var value=fast_time.getValue();
		    	var slow_value=slow_time.getValue();
		    	if(value==''||value==null||typeof(value)=='undefined'){
		    		banlac_index.setDisabled(true);
		    		counter_weight.setDisabled(true);
		    		lb_machine.setDisabled(true);
		    		function_flag.setDisabled(true);
		    		need_second.setDisabled(true);
		    		three_bad.setDisabled(true);
		    		debug_end.setDisabled(true);
		    		ebs_full.setDisabled(true);
		    	}else{
		    		var slov=Ext.Date.format(new Date(slow_value),'Y-m-d');
		    		var fast_t=Ext.Date.format(new Date(value),'Y-m-d');
		    		var a=comptime(slov,fast_t);
		    		 if(a<0){
		    			 WL.Toast.show("快车时间必须大于或等于慢车时间");
		    			fast_time.setValue();
		    			 return ;
		    		 }
		    		banlac_index.setDisabled(false);
		    		counter_weight.setDisabled(false);
		    	}
		    });
		    
		    counter_weight.addListener('change',function(){
		    	var value=counter_weight.getValue();
		    	if(value==''||value==null||typeof(value)=='undefined'){
		    		lb_machine.setDisabled(true);
		    		function_flag.setDisabled(true);
		    		need_second.setDisabled(true);
		    		three_bad.setDisabled(true);
		    		debug_end.setDisabled(true);
		    		ebs_full.setDisabled(true);
		    	}else{
		    		lb_machine.setDisabled(false);
		    	}
		    });
		    
		    lb_machine.addListener('change',function(){
		    	var value=lb_machine.getValue();
		    	if(value==0||value==null||typeof(value)=='undefined'){
		    		function_flag.setDisabled(true);
		    		need_second.setDisabled(true);
		    		three_bad.setDisabled(true);
		    		debug_end.setDisabled(true);
		    		ebs_full.setDisabled(true);
		    	}else{
		    		function_flag.setDisabled(false);
		    		need_second.setDisabled(false);
		    		three_bad.setDisabled(false);
		    	}
		    });
		    
		    //退调验证
		    var debug_return_date=Ext.getCmp('TASK_DEBUG_RETURN_DATE1');
		    var debug_return_reason=Ext.getCmp('TASK_DEBUG_RETURN_REASON1');
		    var debug_forfeit_amt=Ext.getCmp('TASK_DEBUG_FORFEIT_AMT1');
		    var debug_forfeit_date=Ext.getCmp('TASK_DEBUG_FORFEIT_DATE1');
		    var not_achieve_standard=Ext.getCmp('TASK_NOT_ACHIEVE_STANDARD');
		    
		    debug_return_date.addListener('change',function(){
		    	var return_date=debug_return_date.getValue();
		    	var value_lb=function_flag.getValue();
		    	var value_need_second=need_second.getValue();
		    	var value_three_bad=three_bad.getValue();
		    	if(return_date==''&&value_lb!=0&&value_need_second!=''&&value_three_bad!=''){
		    		debug_end.setDisabled(false);
		    	}else{
		    		//debug_end.setValue('');
		    		debug_end.setDisabled(true);
		    	}
		    });
		    debug_return_reason.addListener('change',function(){
		    	var return_reason=debug_return_reason.getValue();
		    	var value_lb=function_flag.getValue();
		    	var value_need_second=need_second.getValue();
		    	var value_three_bad=three_bad.getValue();
		    	if(return_reason==''&&value_lb!=0&&value_need_second!=''&&value_three_bad!=''){
		    		debug_end.setDisabled(false);
		    	}else{
		    		//debug_end.setValue('');
		    		debug_end.setDisabled(true);
		    	}
		    });
		    debug_forfeit_amt.addListener('change',function(){
		    	var forfeit_amt=debug_forfeit_amt.getValue();
		    	var value_lb=function_flag.getValue();
		    	var value_need_second=need_second.getValue();
		    	var value_three_bad=three_bad.getValue();
		    	if(forfeit_amt==''&&value_lb!=0&&value_need_second!=''&&value_three_bad!=''){
		    		debug_end.setDisabled(false);
		    	}else{
		    		//debug_end.setValue('');
		    		debug_end.setDisabled(true);
		    	}
		    });
		    debug_forfeit_date.addListener('change',function(){
		    	var forfeit_date=debug_forfeit_date.getValue();
		    	var value_lb=function_flag.getValue();
		    	var value_need_second=need_second.getValue();
		    	var value_three_bad=three_bad.getValue();
		    	if(forfeit_date==''&&value_lb!=0&&value_need_second!=''&&value_three_bad!=''){
		    		debug_end.setDisabled(false);
		    	}else{
		    		//debug_end.setValue('');
		    		debug_end.setDisabled(true);
		    	}
		    });
		    not_achieve_standard.addListener('change',function(){
		    	var value_debug=not_achieve_standard.getValue();
		    	var value_lb=function_flag.getValue();
		    	var value_need_second=need_second.getValue();
		    	var value_three_bad=three_bad.getValue();
		    	if(value_debug==0&&value_lb!=0&&value_need_second!=''&&value_three_bad!=''){
		    		debug_end.setDisabled(false);
		    	}else{
		    		//debug_end.setValue('');
		    		debug_end.setDisabled(true);
		    	}
		    });
		    
		    
		    //疯狂的监听
		    function_flag.addListener('change',function(){
		    	var debug_date=debug_return_date.getValue();
		    	var debug_return=debug_return_reason.getValue();
		    	var debug_forfeit=debug_forfeit_amt.getValue();
		    	var forfeit_date=debug_forfeit_date.getValue();
		    	var not_achieve=not_achieve_standard.getValue();
		    	var value_lb=function_flag.getValue();
		    	var value_need_second=need_second.getValue();
		    	var value_three_bad=three_bad.getValue();
		    	if(value_lb==0||value_lb==null||typeof(value_lb)=='undefined'){
		    		//ebs_full.setValue('');
		    	}else{
		    	}
		    	if(debug_date==''&&debug_return==''&&debug_forfeit==''&&forfeit_date==''&&not_achieve==0&&value_lb!=0&&value_need_second!=''&&value_three_bad!=''){
		    		debug_end.setDisabled(false);
		    	}else{
		    		debug_end.setDisabled(true);
		    	}
		    });
		    
		    three_bad.addListener('change',function(){
		    	var debug_date=debug_return_date.getValue();
		    	var debug_return=debug_return_reason.getValue();
		    	var debug_forfeit=debug_forfeit_amt.getValue();
		    	var forfeit_date=debug_forfeit_date.getValue();
		    	var not_achieve=not_achieve_standard.getValue();
		    	var value_lb=function_flag.getValue();
		    	var value_need_second=need_second.getValue();
		    	var value_three_bad=three_bad.getValue();
		    	if(debug_date==''&&debug_return==''&&debug_forfeit==''&&forfeit_date==''&&not_achieve==0&&value_lb!=0&&value_need_second!=''&&value_three_bad!=''){
		    		debug_end.setDisabled(false);
		    	}else{
		    		//debug_end.setValue('');
		    		debug_end.setDisabled(true);
		    	}
		    	if(value_lb==0||value_lb==null||typeof(value_lb)=='undefined'){
		    		//ebs_full.setValue('');
		    	}else{
		    	}
		    });
		    
		    
		    need_second.addListener('change',function(){
		    	var debug_date=debug_return_date.getValue();
		    	var debug_return=debug_return_reason.getValue();
		    	var debug_forfeit=debug_forfeit_amt.getValue();
		    	var forfeit_date=debug_forfeit_date.getValue();
		    	var not_achieve=not_achieve_standard.getValue();
		    	var value_lb=function_flag.getValue();
		    	var value_need_second=need_second.getValue();
		    	var value_three_bad=three_bad.getValue();
		    	if(debug_date==''&&debug_return==''&&debug_forfeit==''&&forfeit_date==''&&not_achieve==0&&value_lb!=0&&value_need_second!=''&&value_three_bad!=''){
		    		debug_end.setDisabled(false);
		    	}else{
		    		//debug_end.setValue('');
		    		debug_end.setDisabled(true);
		    	}
		    	if(value_lb==0||value_lb==null||typeof(value_lb)=='undefined'){
		    		//ebs_full.setValue('');
		    	}else{
		    	}
		    });
		    
		    debug_end.addListener('change',function(){
		    	var value=debug_end.getValue();
		    	var fast_tv=fast_time.getValue();
	    		if(value==''||value==null||typeof(value)=='undefined'){
	    			 Ext.getCmp('TASK_ACHIEVE_PUTIN_CHECK_STARDARD').setValue(0);
	    		}else{
	    			var fast_t=Ext.Date.format(new Date(fast_tv),'Y-m-d');
		    		var debug_time=Ext.Date.format(new Date(value),'Y-m-d');
	    			var a=comptime(fast_t,debug_time);
	    			 if(a<0){
	 	    			WL.Toast.show("调试完成时间必须大于或等于快车时间");
	 	    			debug_end.setValue();
	 	    			 return ;
	 	    		 }
	    			 Ext.getCmp('TASK_ACHIEVE_PUTIN_CHECK_STARDARD').setValue(1);
	    		}
	    	
		    	
		    });
			
		    Ext.getCmp('TASK_ENGCONTRACT_NUMBER').setValue(res[0].json.stext.ENGCONTRACT_NUMBER);
		    Ext.getCmp('TASK_ELEVATOR_NO').setValue(res[0].json.stext.ELEVATOR_NO);
		    Ext.getCmp('TASK_CUSTOMER_NAME').setValue(res[0].json.stext.CUSTOMER_NAME);
		    Ext.getCmp('TASK_INSTALL_ADDRESS').setValue(res[0].json.stext.INSTALL_ADDRESS);
		    Ext.getCmp('TASK_PRODUCE_TYPE').setValue(res[0].json.stext.PRODUCE_TYPE);
		    Ext.getCmp('TASK_SEQ_NUM').setValue(res[0].json.stext.SEQ_NUM);
		    Ext.getCmp('TASK_EQUIPMENT_NO').setValue(res[0].json.stext.EQUIPMENT_NO);
		    Ext.getCmp('TASK_CM_ELEVATOR_TYPE_NAME').setValue(res[0].json.stext.CM_ELEVATOR_TYPE_NAME);
		    Ext.getCmp('TASK_ELEVATOR_CLASS_NAME').setValue(res[0].json.stext.ELEVATOR_CLASS_NAME);
		    Ext.getCmp('TASK_NST_VENDOR_NAME').setValue(res[0].json.stext.NST_VENDOR_NAME);
		    Ext.getCmp('TASK_LIFT_VENDOR_NAME').setValue(res[0].json.stext.LIFT_VENDOR_NAME);
		    Ext.getCmp('TASK_BUILD_VENDOR_NAME').setValue(res[0].json.stext.BUILD_VENDOR_NAME);
		    Ext.getCmp('TASK_BUDGET_INSTALL_METHOD').setValue(res[0].json.stext.BUDGET_INSTALL_METHOD);
		    Ext.getCmp('TASK_PARAM_C_M_Z').setValue(res[0].json.stext.PARAM_C_M_Z);
		    Ext.getCmp('TASK_PARAM_ZZ').setValue(res[0].json.stext.PARAM_ZZ);
		    Ext.getCmp('TASK_PARAM_SD').setValue(res[0].json.stext.PARAM_SD);
		    Ext.getCmp('TASK_PARAM_TSGD').setValue(res[0].json.stext.PARAM_TSGD);
		    Ext.getCmp('TASK_PARAM_JDZG').setValue(res[0].json.stext.PARAM_JDZG);
		    Ext.getCmp('TASK_GET_DEBUG_DATE').setValue(res[0].json.stext.GET_DEBUG_DATE);
		    Ext.getCmp('TASK_PLAN_DEBUG_DATE').setValue(res[0].json.stext.PLAN_DEBUG_DATE);
		    Ext.getCmp('TASK_JL_NAME').setValue(res[0].json.stext.JL_NAME);
		    
		    Ext.getCmp('TASK_INST_PERSON_NAME').setValue(res[0].json.stext.INST_PERSON_NAME);
		    Ext.getCmp('TASK_DEBUG_NUM').setValue(res[0].json.stext.DEBUG_NUM);
		    Ext.getCmp('TASK_PLAN_DEBUG_FINISH_DATE').setValue(res[0].json.stext.PLAN_DEBUG_FINISH_DATE);
		   
		    Ext.getCmp('TASK_DEBUG_FORFEIT_AMT').setValue(res[0].json.stext.DEBUG_FORFEIT_AMT);
		    if(res[0].json.stext.DEBUG_FORFEIT_DATE==''||res[0].json.stext.DEBUG_FORFEIT_DATE==null||typeof(res[0].json.stext.DEBUG_FORFEIT_DATE)=='undefined'){
		    	Ext.getCmp('TASK_DEBUG_FORFEIT_DATE').setValue(res[0].json.stext.DEBUG_FORFEIT_DATE);
		    }else{
		    	Ext.getCmp('TASK_DEBUG_FORFEIT_DATE').setValue(Ext.Date.format(new Date(res[0].json.stext.DEBUG_FORFEIT_DATE),'Y-m-d'));
		    }
		    if(res[0].json.stext.DEBUG_RETURN_DATE==''||res[0].json.stext.DEBUG_RETURN_DATE==null||typeof(res[0].json.stext.DEBUG_RETURN_DATE)=='undefined'){
		    	Ext.getCmp('TASK_DEBUG_RETURN_DATE').setValue(res[0].json.stext.DEBUG_RETURN_DATE);
		    }else{
		    	Ext.getCmp('TASK_DEBUG_RETURN_DATE').setValue(Ext.Date.format(new Date(res[0].json.stext.DEBUG_RETURN_DATE),'Y-m-d'));
		    }
		    Ext.getCmp('TASK_DEBUG_RETURN_REASON').setValue(res[0].json.stext.DEBUG_RETURN_REASON);
		    //安装组长 及电话
		    Ext.getCmp('TASK_INSTALL_HEADER').setValue(res[0].json.stext.INSTALL_HEADER);
		    Ext.getCmp('TASK_TEL').setValue(res[0].json.stext.TEL);
		    
		    //调试
		    if(res[0].json.stext.DEBUG_ARRIVE_DATE==""||res[0].json.stext.DEBUG_ARRIVE_DATE==null||typeof(res[0].json.stext.DEBUG_ARRIVE_DATE)=='undefined'){
		    	Ext.getCmp('TASK_DEBUG_ARRIVE_DATE').setValue('');
		    }else{
		    	Ext.getCmp('TASK_DEBUG_ARRIVE_DATE').setValue(Ext.Date.format(new Date(res[0].json.stext.DEBUG_ARRIVE_DATE),'Y-m-d'));
		    }
		    if(res[0].json.stext.SLOW_TRAIN_ENTER_DATE==""||res[0].json.stext.SLOW_TRAIN_ENTER_DATE==null||typeof(res[0].json.stext.SLOW_TRAIN_ENTER_DATE)=='undefined'){
		    	Ext.getCmp('TASK_SLOW_TRAIN_ENTER_DATE').setValue('');
		    }else{
		    	var FullDate=res[0].json.stext.SLOW_TRAIN_ENTER_DATE;
		    	var date=res[0].json.stext.SLOW_TRAIN_ENTER_DATE.split(" ");
		    	if(FullDate.indexOf("-")>0){
		    	}else{
		    		var month=date[0];
			    	var day=null;
			    	var year=null;
			    	for(var i=0;i<date.length;i++){
			    		if(date[i].length<4){
			    			day=date[i];
			    			if(day.length==1){
			    				day="0"+day;
			    			}
			    		}
			    		if(date[i].length==4){
			    			year=date[i];
			    		}
			    	}
			    	 FullDate=year+"-"+month+"-"+day;
		    	}
		    	Ext.getCmp('TASK_SLOW_TRAIN_ENTER_DATE').setValue(Ext.Date.format(new Date(FullDate),'Y-m-d'));
		    }
		    if(res[0].json.stext.FAST_TRAIN_ENTER_DATE==""||res[0].json.stext.FAST_TRAIN_ENTER_DATE==null||typeof(res[0].json.stext.FAST_TRAIN_ENTER_DATE)=='undefined'){
		    	Ext.getCmp('TASK_FAST_TRAIN_ENTER_DATE').setValue('');
		    }else{
		    	var FullDate=res[0].json.stext.FAST_TRAIN_ENTER_DATE;
		    	var date=res[0].json.stext.FAST_TRAIN_ENTER_DATE.split(" ");
		    	if(FullDate.indexOf("-")>0){
		    	}else{
		    		var month=date[0];
			    	var day=null;
			    	var year=null;
			    	for(var i=0;i<date.length;i++){
			    		if(date[i].length<4){
			    			day=date[i];
			    			if(day.length==1){
			    				day="0"+day;
			    			}
			    		}
			    		if(date[i].length==4){
			    			year=date[i];
			    		}
			    	}
			    	 FullDate=year+"-"+month+"-"+day;
		    	}
		    	Ext.getCmp('TASK_FAST_TRAIN_ENTER_DATE').setValue(Ext.Date.format(new Date(FullDate),'Y-m-d'));
		    }
		 
		    
		    Ext.getCmp('TASK_BALANCE_INDEX').setValue(res[0].json.stext.BALANCE_INDEX);
		    Ext.getCmp('TASK_COUNTER_WEIGHT').setValue(res[0].json.stext.COUNTER_WEIGHT);
		    Ext.getCmp('TASK_LB_MACHINE_FLAG').setValue(res[0].json.stext.LB_MACHINE_FLAG);
		    Ext.getCmp('TASK_FUCTION_TEST_FLAG').setValue(res[0].json.stext.FUCTION_TEST_FLAG);
		    Ext.getCmp('TASK_NEED_SECOND_TEST_WEIGHT').setValue(res[0].json.stext.NEED_SECOND_TEST_WEIGHT);
		    Ext.getCmp('TASK_THREE_GUARANTEE_BAD').setValue(res[0].json.stext.THREE_GUARANTEE_BAD);
		    if(res[0].json.stext.DEBUG_END_DATE==""||res[0].json.stext.DEBUG_END_DATE==null||typeof(res[0].json.stext.DEBUG_END_DATE)=='undefined'){
		    	Ext.getCmp('TASK_DEBUG_END_DATE').setValue('');
		    }else{
		        Ext.getCmp('TASK_DEBUG_END_DATE').setValue(Ext.Date.format(new Date(res[0].json.stext.DEBUG_END_DATE),'Y-m-d'));
		    }
		    Ext.getCmp('TASK_ACHIEVE_PUTIN_CHECK_STARDARD').setValue(res[0].json.stext.ACHIEVE_PUTIN_CHECK_STARDARD);
		    Ext.getCmp('TASK_COMMENTS').setValue(res[0].json.stext.COMMENTS);
		   //签名暂时不设置名字
			if(init_person_id==''||init_person_id==null||typeof(init_person_id)=='undefined'){
		         Ext.getCmp('TASK_EBS_FULL_NAME').setValue(usernames);
			}else{
				Ext.getCmp('TASK_EBS_FULL_NAME').setValue(res[0].json.stext.DEBUG_MAN);
			}
		    //电源电流
		    Ext.getCmp('TASK_DYDL_UP_0').setValue(res[0].json.stext.DYDL_UP_0);
		    Ext.getCmp('TASK_DYDL_UP_30').setValue(res[0].json.stext.DYDL_UP_30);
		    Ext.getCmp('TASK_DYDL_UP_40').setValue(res[0].json.stext.DYDL_UP_40);
		    Ext.getCmp('TASK_DYDL_UP_45').setValue(res[0].json.stext.DYDL_UP_45);
		    Ext.getCmp('TASK_DYDL_UP_50').setValue(res[0].json.stext.DYDL_UP_50);
		    Ext.getCmp('TASK_DYDL_UP_60').setValue(res[0].json.stext.DYDL_UP_60);
		    Ext.getCmp('TASK_DYDL_UP_90').setValue(res[0].json.stext.DYDL_UP_90);
		    Ext.getCmp('TASK_DYDL_UP_100').setValue(res[0].json.stext.DYDL_UP_100);
		    Ext.getCmp('TASK_DYDL_UP_110').setValue(res[0].json.stext.DYDL_UP_110);
		    
		    Ext.getCmp('TASK_DYDL_DOWN_0').setValue(res[0].json.stext.DYDL_DOWN_0);
		    Ext.getCmp('TASK_DYDL_DOWN_30').setValue(res[0].json.stext.DYDL_DOWN_30);
		    Ext.getCmp('TASK_DYDL_DOWN_40').setValue(res[0].json.stext.DYDL_DOWN_40);
		    Ext.getCmp('TASK_DYDL_DOWN_45').setValue(res[0].json.stext.DYDL_DOWN_45);
		    Ext.getCmp('TASK_DYDL_DOWN_50').setValue(res[0].json.stext.DYDL_DOWN_50);
		    Ext.getCmp('TASK_DYDL_DOWN_60').setValue(res[0].json.stext.DYDL_DOWN_60);
		    Ext.getCmp('TASK_DYDL_DOWN_90').setValue(res[0].json.stext.DYDL_DOWN_90);
		    Ext.getCmp('TASK_DYDL_DOWN_100').setValue(res[0].json.stext.DYDL_DOWN_100);
		    Ext.getCmp('TASK_DYDL_DOWN_110').setValue(res[0].json.stext.DYDL_DOWN_110);
	        
		    //电机电流
		    Ext.getCmp('TASK_DJDL_UP_0').setValue(res[0].json.stext.DJDL_UP_0);
		    Ext.getCmp('TASK_DJDL_UP_30').setValue(res[0].json.stext.DJDL_UP_30);
		    Ext.getCmp('TASK_DJDL_UP_40').setValue(res[0].json.stext.DJDL_UP_40);
		    Ext.getCmp('TASK_DJDL_UP_45').setValue(res[0].json.stext.DJDL_UP_45);
		    Ext.getCmp('TASK_DJDL_UP_50').setValue(res[0].json.stext.DJDL_UP_50);
		    Ext.getCmp('TASK_DJDL_UP_60').setValue(res[0].json.stext.DJDL_UP_60);
		    Ext.getCmp('TASK_DJDL_UP_90').setValue(res[0].json.stext.DJDL_UP_90);
		    Ext.getCmp('TASK_DJDL_UP_100').setValue(res[0].json.stext.DJDL_UP_100);
		    Ext.getCmp('TASK_DJDL_UP_110').setValue(res[0].json.stext.DJDL_UP_110);
		    
		    Ext.getCmp('TASK_DJDL_DOWN_0').setValue(res[0].json.stext.DJDL_DOWN_0);
		    Ext.getCmp('TASK_DJDL_DOWN_30').setValue(res[0].json.stext.DJDL_DOWN_30);
		    Ext.getCmp('TASK_DJDL_DOWN_40').setValue(res[0].json.stext.DJDL_DOWN_40);
		    Ext.getCmp('TASK_DJDL_DOWN_45').setValue(res[0].json.stext.DJDL_DOWN_45);
		    Ext.getCmp('TASK_DJDL_DOWN_50').setValue(res[0].json.stext.DJDL_DOWN_50);
		    Ext.getCmp('TASK_DJDL_DOWN_60').setValue(res[0].json.stext.DJDL_DOWN_60);
		    Ext.getCmp('TASK_DJDL_DOWN_90').setValue(res[0].json.stext.DJDL_DOWN_90);
		    Ext.getCmp('TASK_DJDL_DOWN_100').setValue(res[0].json.stext.DJDL_DOWN_100);
		    Ext.getCmp('TASK_DJDL_DOWN_110').setValue(res[0].json.stext.DJDL_DOWN_110);
		    
		    //平层数据
		    Ext.getCmp('TASK_PCSJ_UP_0').setValue(res[0].json.stext.PCSJ_UP_0);
		    Ext.getCmp('TASK_PCSJ_UP_30').setValue(res[0].json.stext.PCSJ_UP_30);
		    Ext.getCmp('TASK_PCSJ_UP_40').setValue(res[0].json.stext.PCSJ_UP_40);
		    Ext.getCmp('TASK_PCSJ_UP_45').setValue(res[0].json.stext.PCSJ_UP_45);
		    Ext.getCmp('TASK_PCSJ_UP_50').setValue(res[0].json.stext.PCSJ_UP_50);
		    Ext.getCmp('TASK_PCSJ_UP_60').setValue(res[0].json.stext.PCSJ_UP_60);
		    Ext.getCmp('TASK_PCSJ_UP_90').setValue(res[0].json.stext.PCSJ_UP_90);
		    Ext.getCmp('TASK_PCSJ_UP_100').setValue(res[0].json.stext.PCSJ_UP_100);
		    Ext.getCmp('TASK_PCSJ_UP_110').setValue(res[0].json.stext.PCSJ_UP_110);
		    
		    Ext.getCmp('TASK_PCSJ_DOWN_0').setValue(res[0].json.stext.PCSJ_DOWN_0);
		    Ext.getCmp('TASK_PCSJ_DOWN_30').setValue(res[0].json.stext.PCSJ_DOWN_30);
		    Ext.getCmp('TASK_PCSJ_DOWN_40').setValue(res[0].json.stext.PCSJ_DOWN_40);
		    Ext.getCmp('TASK_PCSJ_DOWN_45').setValue(res[0].json.stext.PCSJ_DOWN_45);
		    Ext.getCmp('TASK_PCSJ_DOWN_50').setValue(res[0].json.stext.PCSJ_DOWN_50);
		    Ext.getCmp('TASK_PCSJ_DOWN_60').setValue(res[0].json.stext.PCSJ_DOWN_60);
		    Ext.getCmp('TASK_PCSJ_DOWN_90').setValue(res[0].json.stext.PCSJ_DOWN_90);
		    Ext.getCmp('TASK_PCSJ_DOWN_100').setValue(res[0].json.stext.PCSJ_DOWN_100);
		    Ext.getCmp('TASK_PCSJ_DOWN_110').setValue(res[0].json.stext.PCSJ_DOWN_110);
		    
		    //电源电压
		    Ext.getCmp('TASK_DYDY_UP_0').setValue(res[0].json.stext.DYDY_UP_0);
		    Ext.getCmp('TASK_DYDY_UP_30').setValue(res[0].json.stext.DYDY_UP_30);
		    Ext.getCmp('TASK_DYDY_UP_40').setValue(res[0].json.stext.DYDY_UP_40);
		    Ext.getCmp('TASK_DYDY_UP_45').setValue(res[0].json.stext.DYDY_UP_45);
		    Ext.getCmp('TASK_DYDY_UP_50').setValue(res[0].json.stext.DYDY_UP_50);
		    Ext.getCmp('TASK_DYDY_UP_60').setValue(res[0].json.stext.DYDY_UP_60);
		    Ext.getCmp('TASK_DYDY_UP_90').setValue(res[0].json.stext.DYDY_UP_90);
		    Ext.getCmp('TASK_DYDY_UP_90').setValue(res[0].json.stext.DYDY_UP_90);
		    Ext.getCmp('TASK_DYDY_UP_100').setValue(res[0].json.stext.DYDY_UP_100);
		    Ext.getCmp('TASK_DYDY_UP_110').setValue(res[0].json.stext.DYDY_UP_110);
		    
		    Ext.getCmp('TASK_DYDY_DOWN_0').setValue(res[0].json.stext.DYDY_DOWN_0);
		    Ext.getCmp('TASK_DYDY_DOWN_30').setValue(res[0].json.stext.DYDY_DOWN_30);
		    Ext.getCmp('TASK_DYDY_DOWN_40').setValue(res[0].json.stext.DYDY_DOWN_40);
		    Ext.getCmp('TASK_DYDY_DOWN_45').setValue(res[0].json.stext.DYDY_DOWN_45);
		    Ext.getCmp('TASK_DYDY_DOWN_50').setValue(res[0].json.stext.DYDY_DOWN_50);
		    Ext.getCmp('TASK_DYDY_DOWN_60').setValue(res[0].json.stext.DYDY_DOWN_60);
		    Ext.getCmp('TASK_DYDY_DOWN_90').setValue(res[0].json.stext.DYDY_DOWN_90);
		    Ext.getCmp('TASK_DYDY_DOWN_100').setValue(res[0].json.stext.DYDY_DOWN_100);
		    Ext.getCmp('TASK_DYDY_DOWN_110').setValue(res[0].json.stext.DYDY_DOWN_110);
		    
		    //不知作用数据
		    Ext.getCmp('PLAN_DEBUG_DATE2').setValue(res[0].json.stext.PLAN_DEBUG_DATE2);
		    Ext.getCmp('TASK_TIAO_SATRTUS').setValue(res[0].json.stext.TIAO_SATRTUS);
		    //退调
		    if(res[0].json.stext.DEBUG_RETURN_DATE==""||res[0].json.stext.DEBUG_RETURN_DATE==null||typeof(res[0].json.stext.DEBUG_RETURN_DATE)=='undefined'){
		    	Ext.getCmp('TASK_DEBUG_RETURN_DATE1').setValue('');
		    }else{
		    	   Ext.getCmp('TASK_DEBUG_RETURN_DATE1').setValue(Ext.Date.format(new Date(res[0].json.stext.DEBUG_RETURN_DATE),'Y-m-d'));
		    }
		    Ext.getCmp('TASK_DEBUG_RETURN_REASON1').setValue(res[0].json.stext.DEBUG_RETURN_REASON);
		    Ext.getCmp('TASK_DEBUG_FORFEIT_AMT1').setValue(res[0].json.stext.DEBUG_FORFEIT_AMT);
		    if(res[0].json.stext.DEBUG_FORFEIT_DATE==""||res[0].json.stext.DEBUG_FORFEIT_DATE==null||typeof(res[0].json.stext.DEBUG_FORFEIT_DATE)=='undefined'){
		    	Ext.getCmp('TASK_DEBUG_FORFEIT_DATE1').setValue('');
		    }else{
		    	 Ext.getCmp('TASK_DEBUG_FORFEIT_DATE1').setValue(Ext.Date.format(new Date(res[0].json.stext.DEBUG_FORFEIT_DATE),'Y-m-d'));
		    }
		   
		    Ext.getCmp('TASK_NOT_ACHIEVE_STANDARD').setValue(res[0].json.stext.NOT_ACHIEVE_STANDARD);
		    
		    //  Ext.getCmp('TASK_TEL').setValue(res[0].json.stext.TEL);
		    //转派
		    Ext.getCmp('TASK_PROCESS_ID').setValue(res[0].json.stext.TASK_PROCESS_ID);
		    Ext.getCmp('ORG_ID').setValue(res[0].json.stext.ORG_ID);
		    Ext.getCmp('CHECK_NUM').setValue(res[0].json.stext.CHECK_NUM);
		    Ext.getCmp('TASK_ID').setValue(res[0].json.stext.TASK_ID);
		    
		    //隐藏
		    Ext.getCmp('TASK_LB_MACHINE_DATE').setValue(res[0].json.stext.TASK_LB_MACHINE_DATE);
		    
		    //新增字段赋值
		    Ext.getCmp('BUILD_UNIT_NUM').setValue(res[0].json.stext.BUILD_UNIT_NUM?res[0].json.stext.BUILD_UNIT_NUM:'');
		    Ext.getCmp('DATA_CART_NUM').setValue(res[0].json.stext.DATA_CART_NUM?res[0].json.stext.DATA_CART_NUM:'');
		    Ext.getCmp('PORT_NUM').setValue(res[0].json.stext.PORT_NUM?res[0].json.stext.PORT_NUM:'');
			if(res[0].json.stext.TIAO_SATRTUS=='已退调'){
				Ext.getCmp('install_debug').setHidden(true);
				Ext.getCmp('submit_Employee').setDisabled(true);
			}else if(res[0].json.stext.TIAO_SATRTUS=='调试未到达'){
				doClearTT();
			}else if(res[0].json.stext.TIAO_SATRTUS=='调试中'){
				doClearTT();
			}else{
				doClearTT();
			}
		    
		    //初始化查找员工编号的list
		    var getResult=function(resz){
		    	var list_Employee=resz.rows2;	  
		    	var store1=obj.getStore('InstallatoinTasksReportCheck_search_Employee_1_Store','HelcPDA.store.install.installdebug.InstallatoinTasksReportCheck_search_Employee_1_Store');
		    	//设置调试人员名字
		    	var length=list_Employee.length;
                var name=res[0].json.stext.EBS_FULL_NAME;
                if(length!=0){
                	name=res[0].json.stext.EBS_FULL_NAME+',';
                }
		    	for (var i=0;i<length;i++){
		    		    if((res[0].json.stext.EBS_FULL_NAME+',')==list_Employee[i].EBS_FULL_NAME){
		    		    	continue;
		    		    }
		    			name=name+list_Employee[i].EBS_FULL_NAME;
		    	}
		    	Ext.getCmp('TASK_DEBUG_EMPLOYEE_NAME').setValue(name);
		    	store1.setData(list_Employee);
		    	
		    	//初始化查找员工福利编号
				var getResult1=function(rest){
			    	var list_Employee1=rest.rows2;	  
			    	var store1=obj.getStore('InstallatoinTasksReportCheck_search_Employee_2_Store','HelcPDA.store.install.installdebug.InstallatoinTasksReportCheck_search_Employee_2_Store');
			    	store1.setData(list_Employee1);
			    };
			    setTimeout(load1,2000); 
			    function load1(){
			    	obj.connectServer(getResult1,'tiaoshi2Action.do?method=Search_ywgs', content);
			    }
				
		    };
		    var content="{'USERID':'"+ebs_user_id+"','TASK_ID':'"+res[0].json.stext.TASK_ID+"','TASK_PROCESS_ID':'"+res[0].json.stext.TASK_PROCESS_ID+"','SEQ_NUM':'"+res[0].json.stext.SEQ_NUM+"'}";
			obj.connectServer(getResult,'tiaoshi2Action.do?method=Search_zp', content);
		    
		
		}).fail(function(){
			
		});
	}
//搜索员工列表
,serach_Employee_task:function(){
	var obj=this;
    var EBS_PERSON_NAME=Ext.getCmp('TASK_EBS_PERSON_NAME').getValue();
    if(EBS_PERSON_NAME==''||EBS_PERSON_NAME==null||typeof(EBS_PERSON_NAME)=='undefined'){
    	WL.Toast.show('员工编号不能空');
    	return;
    }
	
 var getResult=function(res){
	var PanelId='listEmployee';
 	var ListArray={};
 	ListArray.id='serach_Employee_list';
 	ListArray.StoreName='InstallatoinTasksReportCheck_search_Employee_Store';
 	ListArray.StoreFullName='HelcPDA.store.install.installdebug.InstallatoinTasksReportCheck_search_Employee_Store';
 	ListArray.StoreParam=["EBS_EMPLOYEE_NUMBER","EBS_FULL_NAME"];
 	var Data=res.rows;
 	obj.getList(PanelId,ListArray,Data);
  };
    var content="{'EBS_PERSON_NAME':'"+EBS_PERSON_NAME+"'}";
    obj.connectServer(getResult, 'tiaoshi2Action.do?method=Search_zp_user', content);
}
//点击list列表中的数据，生成需要的数据
,serach_Employee_list:function(obk,index,target,record,e,eOpts){
	var obj=this;
	var store=obj.getStore('InstallatoinTasksReportCheck_search_Employee_Store','HelcPDA.store.install.installdebug.InstallatoinTasksReportCheck_search_Employee_Store');
	var store1=obj.getStore('InstallatoinTasksReportCheck_search_Employee_1_Store','HelcPDA.store.install.installdebug.InstallatoinTasksReportCheck_search_Employee_1_Store');
	var list_Employee=Ext.Array.pluck(store1.getData().items,'data');
	var EBS_PERSON_ID=store.getAt(index).get('EBS_PERSON_ID');
	var EBS_EMPLOYEE_NUMBER=store.getAt(index).get('EBS_EMPLOYEE_NUMBER');
	var EBS_FULL_NAME=store.getAt(index).get('EBS_FULL_NAME');
	var NEED_EMPLOYEE_LIST=[];
	for(var i=0;i<list_Employee.length;i++){
		var EE={};
		EE.EBS_PERSON_ID=list_Employee[i].EBS_PERSON_ID;
		EE.EBS_EMPLOYEE_NUMBER=list_Employee[i].EBS_EMPLOYEE_NUMBER;
		EE.EBS_FULL_NAME=list_Employee[i].EBS_FULL_NAME;
		NEED_EMPLOYEE_LIST[i]=EE;
	}
	NEED_EMPLOYEE_LIST[NEED_EMPLOYEE_LIST.length]={EBS_PERSON_ID:EBS_PERSON_ID,EBS_EMPLOYEE_NUMBER:EBS_EMPLOYEE_NUMBER,EBS_FULL_NAME:EBS_FULL_NAME};
	list_Employee=NEED_EMPLOYEE_LIST;
	  var listEmp=Ext.getCmp('Panel_List_Id');
	  	if(listEmp){
	  		listEmp.destroy();
	  	}
	 store1.setData(list_Employee);
	
}
,
//删除员工列表的东西
Employee_list_del:function(obk,index,target,record,e,eOpts){
	var obj=this;
	var store=obj.getStore('InstallatoinTasksReportCheck_search_Employee_1_Store','HelcPDA.store.install.installdebug.InstallatoinTasksReportCheck_search_Employee_1_Store');
	if(event.target.id=="1"){
		store.removeAt(index);
	}
}
,//第二个list搜索
serach_Employee_task1:function(){
	var obj=this;
	  var EBS_PERSON_NAME=Ext.getCmp('TASK_EBS_PERSON_NAME1').getValue();
	  if(EBS_PERSON_NAME==''||EBS_PERSON_NAME==null||typeof(EBS_PERSON_NAME)=='undefined'){
	    	WL.Toast.show('员工编号不能空');
	    	return;
	    }
	
	 var getResult=function(res){
		 var PanelId='listEmployee1';
		 var ListArray={};
		 	ListArray.id='serach_Employee_list1';
		 	ListArray.StoreName='InstallatoinTasksReportCheck_search_Employee_Store';
		 	ListArray.StoreFullName='install.installdebug.InstallatoinTasksReportCheck_search_Employee_Store';
		 	ListArray.StoreParam=["EBS_EMPLOYEE_NUMBER","EBS_FULL_NAME"];
		 	var Data=res.rows;
		 	obj.getList(PanelId,ListArray,Data);
		 
	  };
	    var content="{'EBS_PERSON_NAME':'"+EBS_PERSON_NAME+"'}";
	    obj.connectServer(getResult, 'tiaoshi2Action.do?method=Search_zp_user', content);
},
serach_Employee_list1:function(obk,index,target,record,e,eOpts){
	var obj=this;
	var store=obj.getStore('InstallatoinTasksReportCheck_search_Employee_Store','HelcPDA.store.install.installdebug.InstallatoinTasksReportCheck_search_Employee_Store');
	var store1=obj.getStore('InstallatoinTasksReportCheck_search_Employee_2_Store','HelcPDA.store.install.installdebug.InstallatoinTasksReportCheck_search_Employee_2_Store');
	var list_Employee1=Ext.Array.pluck(store1.getData().items,'data');
	var EBS_PERSON_ID=store.getAt(index).get('EBS_PERSON_ID');
	var EBS_EMPLOYEE_NUMBER=store.getAt(index).get('EBS_EMPLOYEE_NUMBER');
	var EBS_FULL_NAME=store.getAt(index).get('EBS_FULL_NAME');
	var NEED_EMPLOYEE_LIST=[];
	for(var i=0;i<list_Employee1.length;i++){
		var EE={};
		EE.EBS_PERSON_ID=list_Employee1[i].EBS_PERSON_ID;
		EE.EBS_EMPLOYEE_NUMBER=list_Employee1[i].EBS_EMPLOYEE_NUMBER;
		EE.EBS_FULL_NAME=list_Employee1[i].EBS_FULL_NAME;
		NEED_EMPLOYEE_LIST[i]=EE;
	}
	NEED_EMPLOYEE_LIST[NEED_EMPLOYEE_LIST.length]={EBS_PERSON_ID:EBS_PERSON_ID,EBS_EMPLOYEE_NUMBER:EBS_EMPLOYEE_NUMBER,EBS_FULL_NAME:EBS_FULL_NAME};
	list_Employee1=NEED_EMPLOYEE_LIST;
	  var listEmp1=Ext.getCmp('Panel_List_Id');
	  	if(listEmp1){
	  		listEmp1.destroy();
	  	}
	 store1.setData(list_Employee1);
},
//删除第二个list 的数据
Employee_list_del1:function(obk,index,target,record,e,eOpts){
	var obj=this;
	var store=obj.getStore('InstallatoinTasksReportCheck_search_Employee_2_Store','HelcPDA.store.install.installdebug.InstallatoinTasksReportCheck_search_Employee_2_Store');
	if(event.target.id=="1"){
		store.removeAt(index);
	}
},

//保存所有信息
save_task:function(ak,content){
	var obj=this;
	 var DEBUG_ARRIVE_DATE=Ext.getCmp('TASK_DEBUG_ARRIVE_DATE').getValue();
	 var SLOW_TRAIN_ENTER_DATE= Ext.getCmp('TASK_SLOW_TRAIN_ENTER_DATE').getValue();
	 var FAST_TRAIN_ENTER_DATE= Ext.getCmp('TASK_FAST_TRAIN_ENTER_DATE').getValue();
	 var BALANCE_INDEX=Ext.getCmp('TASK_BALANCE_INDEX').getValue();
	 var COUNTER_WEIGHT=Ext.getCmp('TASK_COUNTER_WEIGHT').getValue();
	 var LB_MACHINE_FLAG=Ext.getCmp('TASK_LB_MACHINE_FLAG').getValue();
	 var FUCTION_TEST_FLAG=Ext.getCmp('TASK_FUCTION_TEST_FLAG').getValue();
	 var NEED_SECOND_TEST_WEIGHT=Ext.getCmp('TASK_NEED_SECOND_TEST_WEIGHT').getValue();
	 var THREE_GUARANTEE_BAD=Ext.getCmp('TASK_THREE_GUARANTEE_BAD').getValue();
	 var DEBUG_END_DATE=Ext.getCmp('TASK_DEBUG_END_DATE').getValue();
	 var ACHIEVE_PUTIN_CHECK_STARDARD=Ext.getCmp('TASK_ACHIEVE_PUTIN_CHECK_STARDARD').getValue();
	 var COMMENTS=Ext.getCmp('TASK_COMMENTS').getValue();
	 var EBS_FULL_NAME=Ext.getCmp('TASK_EBS_FULL_NAME').getValue();
	   
	 //电源电流
	 var DYDL_UP_0=Ext.getCmp('TASK_DYDL_UP_0').getValue();
	 var DYDL_UP_30=Ext.getCmp('TASK_DYDL_UP_30').getValue();
	 var DYDL_UP_40=Ext.getCmp('TASK_DYDL_UP_40').getValue();
	 var DYDL_UP_45=Ext.getCmp('TASK_DYDL_UP_45').getValue();
	 var DYDL_UP_50=Ext.getCmp('TASK_DYDL_UP_50').getValue();
	 var DYDL_UP_60=Ext.getCmp('TASK_DYDL_UP_60').getValue();
	 var DYDL_UP_90=Ext.getCmp('TASK_DYDL_UP_90').getValue();
	 var DYDL_UP_100=Ext.getCmp('TASK_DYDL_UP_100').getValue();
	 var DYDL_UP_110=Ext.getCmp('TASK_DYDL_UP_110').getValue();
	    
	 var DYDL_DOWN_0=Ext.getCmp('TASK_DYDL_DOWN_0').getValue();
	 var DYDL_DOWN_30=Ext.getCmp('TASK_DYDL_DOWN_30').getValue();
	 var DYDL_DOWN_40=Ext.getCmp('TASK_DYDL_DOWN_40').getValue();
	 var DYDL_DOWN_45=Ext.getCmp('TASK_DYDL_DOWN_45').getValue();
	 var DYDL_DOWN_50=Ext.getCmp('TASK_DYDL_DOWN_50').getValue();
	 var DYDL_DOWN_60=Ext.getCmp('TASK_DYDL_DOWN_60').getValue();
	 var DYDL_DOWN_90=Ext.getCmp('TASK_DYDL_DOWN_90').getValue();
	 var DYDL_DOWN_100=Ext.getCmp('TASK_DYDL_DOWN_100').getValue();
	 var DYDL_DOWN_110=Ext.getCmp('TASK_DYDL_DOWN_110').getValue();
       
	    //电机电流
	 var DJDL_UP_0=Ext.getCmp('TASK_DJDL_UP_0').getValue();
	 var DJDL_UP_30=Ext.getCmp('TASK_DJDL_UP_30').getValue();
	 var DJDL_UP_40=Ext.getCmp('TASK_DJDL_UP_40').getValue();
	 var DJDL_UP_45=Ext.getCmp('TASK_DJDL_UP_45').getValue();
	 var DJDL_UP_50=Ext.getCmp('TASK_DJDL_UP_50').getValue();
	 var DJDL_UP_60=Ext.getCmp('TASK_DJDL_UP_60').getValue();
	 var DJDL_UP_90=Ext.getCmp('TASK_DJDL_UP_90').getValue();
	 var DJDL_UP_100=Ext.getCmp('TASK_DJDL_UP_100').getValue();
	 var DJDL_UP_110=Ext.getCmp('TASK_DJDL_UP_110').getValue();
	    
	 var DJDL_DOWN_0=Ext.getCmp('TASK_DJDL_DOWN_0').getValue();
	 var DJDL_DOWN_30=Ext.getCmp('TASK_DJDL_DOWN_30').getValue();
	 var DJDL_DOWN_40=Ext.getCmp('TASK_DJDL_DOWN_40').getValue();
	 var DJDL_DOWN_45=Ext.getCmp('TASK_DJDL_DOWN_45').getValue();
	 var DJDL_DOWN_50=Ext.getCmp('TASK_DJDL_DOWN_50').getValue();
	 var DJDL_DOWN_60=Ext.getCmp('TASK_DJDL_DOWN_60').getValue();
	 var DJDL_DOWN_90=Ext.getCmp('TASK_DJDL_DOWN_90').getValue();
	 var DJDL_DOWN_100=Ext.getCmp('TASK_DJDL_DOWN_100').getValue();
	 var DJDL_DOWN_110=Ext.getCmp('TASK_DJDL_DOWN_110').getValue();
	    
	    //平层数据
	 var PCSJ_UP_0=Ext.getCmp('TASK_PCSJ_UP_0').getValue();
	 var PCSJ_UP_30=Ext.getCmp('TASK_PCSJ_UP_30').getValue();
	 var PCSJ_UP_40=Ext.getCmp('TASK_PCSJ_UP_40').getValue();
	 var PCSJ_UP_45=Ext.getCmp('TASK_PCSJ_UP_45').getValue();
	 var PCSJ_UP_50=Ext.getCmp('TASK_PCSJ_UP_50').getValue();
	 var PCSJ_UP_60=Ext.getCmp('TASK_PCSJ_UP_60').getValue();
	 var PCSJ_UP_90=Ext.getCmp('TASK_PCSJ_UP_90').getValue();
	 var PCSJ_UP_100=Ext.getCmp('TASK_PCSJ_UP_100').getValue();
	 var PCSJ_UP_110=Ext.getCmp('TASK_PCSJ_UP_110').getValue();
	    
	 var PCSJ_DOWN_0=Ext.getCmp('TASK_PCSJ_DOWN_0').getValue();
	 var PCSJ_DOWN_30=Ext.getCmp('TASK_PCSJ_DOWN_30').getValue();
	 var PCSJ_DOWN_40=Ext.getCmp('TASK_PCSJ_DOWN_40').getValue();
	 var PCSJ_DOWN_45=Ext.getCmp('TASK_PCSJ_DOWN_45').getValue();
	 var PCSJ_DOWN_50=Ext.getCmp('TASK_PCSJ_DOWN_50').getValue();
	 var PCSJ_DOWN_60=Ext.getCmp('TASK_PCSJ_DOWN_60').getValue();
	 var PCSJ_DOWN_90=Ext.getCmp('TASK_PCSJ_DOWN_90').getValue();
	 var PCSJ_DOWN_100=Ext.getCmp('TASK_PCSJ_DOWN_100').getValue();
	 var PCSJ_DOWN_110=Ext.getCmp('TASK_PCSJ_DOWN_110').getValue();
	    
	    //电源电压
	 var DYDY_UP_0=Ext.getCmp('TASK_DYDY_UP_0').getValue();
	 var DYDY_UP_30=Ext.getCmp('TASK_DYDY_UP_30').getValue();
	 var DYDY_UP_40=Ext.getCmp('TASK_DYDY_UP_40').getValue();
	 var DYDY_UP_45=Ext.getCmp('TASK_DYDY_UP_45').getValue();
	 var DYDY_UP_50=Ext.getCmp('TASK_DYDY_UP_50').getValue();
	 var DYDY_UP_60=Ext.getCmp('TASK_DYDY_UP_60').getValue();
	 var DYDY_UP_90=Ext.getCmp('TASK_DYDY_UP_90').getValue();
	 var DYDY_UP_100=Ext.getCmp('TASK_DYDY_UP_100').getValue();
	 var DYDY_UP_110=Ext.getCmp('TASK_DYDY_UP_110').getValue();
	    
	 var DYDY_DOWN_0=Ext.getCmp('TASK_DYDY_DOWN_0').getValue();
	 var DYDY_DOWN_30=Ext.getCmp('TASK_DYDY_DOWN_30').getValue();
	 var DYDY_DOWN_40=Ext.getCmp('TASK_DYDY_DOWN_40').getValue();
	 var DYDY_DOWN_45=Ext.getCmp('TASK_DYDY_DOWN_45').getValue();
	 var DYDY_DOWN_50=Ext.getCmp('TASK_DYDY_DOWN_50').getValue();
	 var DYDY_DOWN_60=Ext.getCmp('TASK_DYDY_DOWN_60').getValue();
	 var DYDY_DOWN_90=Ext.getCmp('TASK_DYDY_DOWN_90').getValue();
	 var DYDY_DOWN_100=Ext.getCmp('TASK_DYDY_DOWN_100').getValue();
	 var DYDY_DOWN_110=Ext.getCmp('TASK_DYDY_DOWN_110').getValue();
        
	    //退调
	 var DEBUG_RETURN_DATE1=Ext.getCmp('TASK_DEBUG_RETURN_DATE1').getValue();
	 var DEBUG_RETURN_REASON1=Ext.getCmp('TASK_DEBUG_RETURN_REASON1').getValue();
	 var DEBUG_FORFEIT_AMT1=Ext.getCmp('TASK_DEBUG_FORFEIT_AMT1').getValue();
	 var DEBUG_FORFEIT_DATE1=Ext.getCmp('TASK_DEBUG_FORFEIT_DATE1').getValue();
	 var NOT_ACHIEVE_STANDARD=Ext.getCmp('TASK_NOT_ACHIEVE_STANDARD').getValue();
	 //不变动。

	 var ENGCONTRACT_NUMBER=Ext.getCmp('TASK_ENGCONTRACT_NUMBER').getValue();
	 var ELEVATOR_NO=Ext.getCmp('TASK_ELEVATOR_NO').getValue();
	 var CUSTOMER_NAME=Ext.getCmp('TASK_CUSTOMER_NAME').getValue();
	 var INSTALL_ADDRESS=Ext.getCmp('TASK_INSTALL_ADDRESS').getValue();
	 var PRODUCE_TYPE=Ext.getCmp('TASK_PRODUCE_TYPE').getValue();
	 var SEQ_NUM=Ext.getCmp('TASK_SEQ_NUM').getValue();
	 var EQUIPMENT_NO=Ext.getCmp('TASK_EQUIPMENT_NO').getValue();
	 var CM_ELEVATOR_TYPE_NAME=Ext.getCmp('TASK_CM_ELEVATOR_TYPE_NAME').getValue();
	 var ELEVATOR_CLASS_NAME=Ext.getCmp('TASK_ELEVATOR_CLASS_NAME').getValue();
	 var NST_VENDOR_NAME=Ext.getCmp('TASK_NST_VENDOR_NAME').getValue();
	 var VENDOR_NAME=Ext.getCmp('TASK_LIFT_VENDOR_NAME').getValue();
	 var BUILD_VENDOR_NAME=Ext.getCmp('TASK_BUILD_VENDOR_NAME').getValue();
	 var BUDGET_INSTALL_METHOD=Ext.getCmp('TASK_BUDGET_INSTALL_METHOD').getValue();
	 var PARAM_C_M_Z=Ext.getCmp('TASK_PARAM_C_M_Z').getValue();
	 var PARAM_ZZ=Ext.getCmp('TASK_PARAM_ZZ').getValue();
	 var PARAM_SD=Ext.getCmp('TASK_PARAM_SD').getValue();
	 var PARAM_TSGD=Ext.getCmp('TASK_PARAM_TSGD').getValue();
	 var PARAM_JDZG=Ext.getCmp('TASK_PARAM_JDZG').getValue();
	 var GET_DEBUG_DATE=Ext.getCmp('TASK_GET_DEBUG_DATE').getValue();
	 var PLAN_DEBUG_DATE=Ext.getCmp('TASK_PLAN_DEBUG_DATE').getValue();
	 var JL_NAME=Ext.getCmp('TASK_JL_NAME').getValue();
	    
	 var INST_PERSON_NAME=Ext.getCmp('TASK_INST_PERSON_NAME').getValue();
	 var DEBUG_NUM=Ext.getCmp('TASK_DEBUG_NUM').getValue();
	 var PLAN_DEBUG_FINISH_DATE=Ext.getCmp('TASK_PLAN_DEBUG_FINISH_DATE').getValue();
	 var DEBUG_EMPLOYEE_NAME=Ext.getCmp('TASK_DEBUG_EMPLOYEE_NAME').getValue();
	    //安装组长 及电话
	 var INSTALL_HEADER=Ext.getCmp('TASK_INSTALL_HEADER').getValue();
	 var TEL=Ext.getCmp('TASK_TEL').getValue();
	 //隐藏提取
	 var TASK_PROCESS_ID=Ext.getCmp('TASK_PROCESS_ID').getValue();
	 var TASK_ID=Ext.getCmp('TASK_ID').getValue();
	 var ORG_ID=Ext.getCmp('ORG_ID').getValue();
	 var CHECK_NUM=Ext.getCmp('CHECK_NUM').getValue();
	 var LB_MACHINE_DATE=Ext.getCmp('TASK_LB_MACHINE_DATE').getValue();
	 //添加的新字段
	 
	 
	 var BUILD_UNIT_NUM=Ext.getCmp('BUILD_UNIT_NUM').getValue();
	 var DATA_CART_NUM=Ext.getCmp('DATA_CART_NUM').getValue();
	 var PORT_NUM=Ext.getCmp('PORT_NUM').getValue();
	 
	 //点击提交的时候，查看是否退调,是否在调试中
	 var TIAO_SATRTUS=Ext.getCmp('TASK_TIAO_SATRTUS').getValue();; 
	 if(ak=='保存成功'){
		 TIAO_SATRTUS='已进入待提交队列';
	 }
	 var temp={DEBUG_ARRIVE_DATE:DEBUG_ARRIVE_DATE,SLOW_TRAIN_ENTER_DATE:SLOW_TRAIN_ENTER_DATE,
			 FAST_TRAIN_ENTER_DATE:FAST_TRAIN_ENTER_DATE,BALANCE_INDEX:BALANCE_INDEX,
			 COUNTER_WEIGHT:COUNTER_WEIGHT,LB_MACHINE_FLAG:LB_MACHINE_FLAG,
			 FUCTION_TEST_FLAG:FUCTION_TEST_FLAG,NEED_SECOND_TEST_WEIGHT:NEED_SECOND_TEST_WEIGHT,
			 THREE_GUARANTEE_BAD:THREE_GUARANTEE_BAD,DEBUG_END_DATE:DEBUG_END_DATE,
			 ACHIEVE_PUTIN_CHECK_STARDARD:ACHIEVE_PUTIN_CHECK_STARDARD,COMMENTS:COMMENTS,
			 EBS_FULL_NAME:EBS_FULL_NAME,DYDL_UP_0:DYDL_UP_0,DYDL_UP_30:DYDL_UP_30,
			 DYDL_UP_40:DYDL_UP_40,DYDL_UP_45:DYDL_UP_45,DYDL_UP_50:DYDL_UP_50,
			 DYDL_UP_60:DYDL_UP_60,DYDL_UP_90:DYDL_UP_90,DYDL_UP_100:DYDL_UP_100,
			 DYDL_UP_110:DYDL_UP_110,DYDL_DOWN_0:DYDL_DOWN_0,DYDL_DOWN_30:DYDL_DOWN_30,
			 DYDL_DOWN_40:DYDL_DOWN_40,DYDL_DOWN_45:DYDL_DOWN_45,DYDL_DOWN_50:DYDL_DOWN_50,
			 DYDL_DOWN_60:DYDL_DOWN_60,DYDL_DOWN_90:DYDL_DOWN_90,DYDL_DOWN_100:DYDL_DOWN_100,
			 DYDL_DOWN_110:DYDL_DOWN_110,DJDL_UP_0:DJDL_UP_0,DJDL_UP_30:DJDL_UP_30,
			 DJDL_UP_40:DJDL_UP_40,DJDL_UP_45:DJDL_UP_45,DJDL_UP_50:DJDL_UP_50,
			 DJDL_UP_60:DJDL_UP_60,DJDL_UP_90:DJDL_UP_90,DJDL_UP_100:DJDL_UP_100,
			 DJDL_UP_110:DJDL_UP_110,DJDL_DOWN_0:DJDL_DOWN_0,DJDL_DOWN_30:DJDL_DOWN_30,
			 DJDL_DOWN_40:DJDL_DOWN_40,DJDL_DOWN_45:DJDL_DOWN_45,DJDL_DOWN_50:DJDL_DOWN_50,
			 DJDL_DOWN_60:DJDL_DOWN_60,DJDL_DOWN_90:DJDL_DOWN_90,DJDL_DOWN_100:DJDL_DOWN_100,
			 DJDL_DOWN_110:DJDL_DOWN_110,PCSJ_UP_0:PCSJ_UP_0,PCSJ_UP_30:PCSJ_UP_30,
			 PCSJ_UP_40:PCSJ_UP_40,PCSJ_UP_45:PCSJ_UP_45,PCSJ_UP_50:PCSJ_UP_50,
			 PCSJ_UP_60:PCSJ_UP_60,PCSJ_UP_90:PCSJ_UP_90,PCSJ_UP_100:PCSJ_UP_100,
			 PCSJ_UP_110:PCSJ_UP_110,PCSJ_DOWN_0:PCSJ_DOWN_0,PCSJ_DOWN_30:PCSJ_DOWN_30,
			 PCSJ_DOWN_40:PCSJ_DOWN_40,PCSJ_DOWN_45:PCSJ_DOWN_45,PCSJ_DOWN_50:PCSJ_DOWN_50,
			 PCSJ_DOWN_60:PCSJ_DOWN_60,PCSJ_DOWN_90:PCSJ_DOWN_90,PCSJ_DOWN_100:PCSJ_DOWN_100,
			 PCSJ_DOWN_110:PCSJ_DOWN_110,DYDY_UP_0:DYDY_UP_0,DYDY_UP_30:DYDY_UP_30,
			 DYDY_UP_40:DYDY_UP_40,DYDY_UP_45:DYDY_UP_45,DYDY_UP_50:DYDY_UP_50,
			 DYDY_UP_60:DYDY_UP_60,DYDY_UP_90:DYDY_UP_90,DYDY_UP_100:DYDY_UP_100,
			 DYDY_UP_110:DYDY_UP_110,DYDY_DOWN_0:DYDY_DOWN_0,DYDY_DOWN_30:DYDY_DOWN_30,
			 DYDY_DOWN_40:DYDY_DOWN_40,DYDY_DOWN_45:DYDY_DOWN_45,DYDY_DOWN_50:DYDY_DOWN_50,
			 DYDY_DOWN_60:DYDY_DOWN_60,DYDY_DOWN_90:DYDY_DOWN_90,DYDY_DOWN_100:DYDY_DOWN_100,
			 DYDY_DOWN_110:DYDY_DOWN_110,DEBUG_RETURN_DATE:DEBUG_RETURN_DATE1,
			 DEBUG_RETURN_REASON:DEBUG_RETURN_REASON1,DEBUG_FORFEIT_AMT:DEBUG_FORFEIT_AMT1,
			 DEBUG_FORFEIT_DATE:DEBUG_FORFEIT_DATE1,NOT_ACHIEVE_STANDARD:NOT_ACHIEVE_STANDARD,
	         //...........
			 ENGCONTRACT_NUMBER:ENGCONTRACT_NUMBER,ELEVATOR_NO:ELEVATOR_NO,
			 CUSTOMER_NAME:CUSTOMER_NAME,INSTALL_ADDRESS:INSTALL_ADDRESS,
			 PRODUCE_TYPE:PRODUCE_TYPE,SEQ_NUM:SEQ_NUM,EQUIPMENT_NO:EQUIPMENT_NO,
			 CM_ELEVATOR_TYPE_NAME:CM_ELEVATOR_TYPE_NAME,ELEVATOR_CLASS_NAME:ELEVATOR_CLASS_NAME,
			 NST_VENDOR_NAME:NST_VENDOR_NAME,VENDOR_NAME:VENDOR_NAME,
			 BUILD_VENDOR_NAME:BUILD_VENDOR_NAME,BUDGET_INSTALL_METHOD:BUDGET_INSTALL_METHOD,
			 PARAM_C_M_Z:PARAM_C_M_Z,PARAM_ZZ:PARAM_ZZ,PARAM_SD:PARAM_SD,
			 PARAM_TSGD:PARAM_TSGD,PARAM_JDZG:PARAM_JDZG,GET_DEBUG_DATE:GET_DEBUG_DATE,
			 PLAN_DEBUG_DATE:PLAN_DEBUG_DATE,JL_NAME:JL_NAME,
			 INST_PERSON_NAME:INST_PERSON_NAME,DEBUG_NUM:DEBUG_NUM,
			 PLAN_DEBUG_FINISH_DATE:PLAN_DEBUG_FINISH_DATE,DEBUG_EMPLOYEE_NAME:DEBUG_EMPLOYEE_NAME,
			 INSTALL_HEADER:INSTALL_HEADER,TEL:TEL,
			 
			 //隐藏
			 TASK_PROCESS_ID:TASK_PROCESS_ID,TASK_ID:TASK_ID,
			 ORG_ID:ORG_ID,CHECK_NUM:CHECK_NUM,LB_MACHINE_DATE:LB_MACHINE_DATE,
			 // 是否退调
			 TIAO_SATRTUS:TIAO_SATRTUS,
			 //添加的新字段
			 BUILD_UNIT_NUM:BUILD_UNIT_NUM,DATA_CART_NUM:DATA_CART_NUM,
			 PORT_NUM:PORT_NUM
			  
	 };
	 
    var _id=parseInt(Ext.getCmp('task_id').getValue());
	WL_task=WL.JSONStore.get(collectionName);	
	var query={_id:_id};
	WL_task.find(query).then(function(res){
	var query={_id:_id,json:{tid:res[0].json.tid,tcode:res[0].json.tcode,stext:temp}};
	if(ak=='保存成功'){
		 query={_id:_id,json:{tid:res[0].json.tid,tcode:res[0].json.tcode,stext:temp,status:'1'}};
	}
	WL_task.refresh(query).then(function(){
    	//WL.toast.show("保存数据成功");
    	//数据保存成功以后重置list页面数据，
    	var store1=obj.getStore('InstallatoinTasksShakedown_1Store','HelcPDA.store.install.installdebug.InstallatoinTasksShakedown_1Store');
    	var ENGCONTRACT_NUMBER=store1.getAt(0).get('ENGCONTRACT_NUMBER');
    	var ENLEVETOR_NUM=Ext.getCmp('ENLEVETOR_NUM').getValue();
    	var query={tcode:ebs_user_id+"_task",tid:JSON.stringify(ENGCONTRACT_NUMBER)};
    	    WL_task.find(query).then(function(res){
    	        var list=[];
    	    	for(var i=0;i<res.length;i++){
    	    		list[i]=res[i].json.stext;
    	    		lists[i]=res[i];
    	    		if(ak=='保存成功'){
    	    			if(res[i].json.status=="1"){
        	    			list[i].TIAO_SATRTUS=='已进入待提交队列';
        	    		}else{
        	    			var TIAO_SATRTUS=list[i].TIAO_SATRTUS;
        		    		var DEBUG_RETURN_REASON1=list[i].DEBUG_RETURN_REASON;
        		    		var DEBUG_RETURN_DATE1=list[i].DEBUG_RETURN_DATE;
        		    		var DEBUG_ARRIVE_DATE=list[i].DEBUG_ARRIVE_DATE;
        		    		var DEBUG_END_DATE=list[i].DEBUG_END_DATE; 
        		    		
        		    		if(TIAO_SATRTUS==''){
			        			 if(DEBUG_ARRIVE_DATE==''||DEBUG_ARRIVE_DATE==null||typeof(DEBUG_ARRIVE_DATE)=='undefined'){
			        				 list[i].TIAO_SATRTUS='调试未到达';
			        			 }else{
			        				 if(DEBUG_END_DATE==''||DEBUG_END_DATE==null||typeof(DEBUG_END_DATE)=='undefined'){
			        					 list[i].TIAO_SATRTUS='调试中';
			        				 }else{
			        					 list[i].TIAO_SATRTUS='已提交'; 
			        				 }
			        			 }
			    		}else if(TIAO_SATRTUS=='已进入待提交队列'){
			    			 if((DEBUG_RETURN_REASON1=='')&&(DEBUG_RETURN_DATE1=='')){
			    				 if(DEBUG_ARRIVE_DATE==''||DEBUG_ARRIVE_DATE==null||typeof(DEBUG_ARRIVE_DATE)=='undefined'){
			        				 list[i].TIAO_SATRTUS='调试未到达';
			        			 }else{
			        				 if(DEBUG_END_DATE==''||DEBUG_END_DATE==null||typeof(DEBUG_END_DATE)=='undefined'){
			        					 list[i].TIAO_SATRTUS='调试中';
			        				 }else{
			        					 list[i].TIAO_SATRTUS='已提交'; 
			        				 }
			        			 }
		        			 }else{
		        				 list[i].TIAO_SATRTUS='已退调';
		        			 }
			    		}else if(TIAO_SATRTUS=='调试未到达'){
			    		}else if(TIAO_SATRTUS=='调试中'){
			    		}else{
			    			 list[i].TIAO_SATRTUS='已退调';
			    		}
        	    		}
    	    		}
    	    	}
    	    	
    	    	if(ENLEVETOR_NUM!=''){
    	    	var templist=[];
        	    var length=list.length;
    	    	for(var i=0;i<length;i++){
    	    		if(ENLEVETOR_NUM==list[i].ELEVATOR_NO){
        	    		templist[0]=list[i];
        	    	}	
    	    	}
    	    	list=templist;
    	    	}
    	    	store1.setData(list);
    	    	WL.Toast.show('保存成功');
    	    	if(ak=='保存成功'){
    	    		obj.load1(content);
    	    		obj.BackView();
    	    		//obj.NextView('installationTasksShakedownPanel1','HelcPDA.view.install.installdebug.InstallationTasksShakedownPanel1');
    	    	}
    	    }).fail(function(err){
    	    	WL.Toast.show("查找缓存失败");
    	    });
    	
    }).fail(function(){
    	WL.Toast.show("保存数据失败");
    });
		
	}).fail(function(err){
	});	
		
},
//提交员工编号
submit_Employee:function(){
	var obj=this;
	var getResult=function(res){
		WL.Toast.show(res.msginfo);
	};
	var TASK_PROCESS_ID=Ext.getCmp('TASK_PROCESS_ID').getValue();
    var TASK_ID=Ext.getCmp('TASK_ID').getValue();
    var ORG_ID=Ext.getCmp('ORG_ID').getValue();
    var SEQ_NUM=Ext.getCmp('TASK_SEQ_NUM').getValue();
    var DEBUG_NUM=Ext.getCmp('TASK_DEBUG_NUM').getValue();
    var CHECK_NUM=Ext.getCmp('CHECK_NUM').getValue();
    var store1=obj.getStore('InstallatoinTasksReportCheck_search_Employee_1_Store','HelcPDA.store.install.installdebug.InstallatoinTasksReportCheck_search_Employee_1_Store');
    var list_Employee=Ext.Array.pluck(store1.getData().items,'data');
    var rows=[];
    var length=list_Employee.length;
    for(var i=0;i<length;i++){
    	for(var j=0;j<length;j++){
    		if(i==j){
    			
    		}else{
    		if(list_Employee[i].EBS_FULL_NAME==list_Employee[j].EBS_FULL_NAME){
	                WL.Toast.show('请清除重复的转派人员');
	                return;
              }   
    		}
    	}
    }
    for(var i=0;i<length;i++){
    	var listz={};
    	listz.EBS_PERSON_ID=list_Employee[i].EBS_PERSON_ID;
    	listz.EBS_FULL_NAME=list_Employee[i].EBS_FULL_NAME;
    	rows[i]=listz;
    }
    var content=null;
//    if(init_person_id==''||init_person_id==null||typeof(init_person_id)=='undefined'){
    	 content="{'USERID':'"+ebs_user_id+"','TASK_ID':'"+TASK_ID+"','TASK_PROCESS_ID':'"+TASK_PROCESS_ID+"','ORG_ID':'"+ORG_ID+"','SEQ_NUM':'"+SEQ_NUM+"','DEBUG_NUM':'"+DEBUG_NUM+"','CHECK_NUM':'"+CHECK_NUM+"','rows':"+JSON.stringify(rows)+"}";
//    }else{
//    	 content="{'USERID':'"+init_person_id+"','TASK_ID':'"+TASK_ID+"','TASK_PROCESS_ID':'"+TASK_PROCESS_ID+"','ORG_ID':'"+ORG_ID+"','SEQ_NUM':'"+SEQ_NUM+"','DEBUG_NUM':'"+DEBUG_NUM+"','CHECK_NUM':'"+CHECK_NUM+"','rows':"+JSON.stringify(rows)+"}";   	
//    }
    function getRes(res){
    	if(res.flg=="Y"){
    		WL.Toast.show('已退调，请联系主管重新派发');
    		return;
    	}else{
    		obj.connectServer(getResult, 'tiaoshi2Action.do?method=toAdds', content);
    	}
    	
    }
    obj.connectServer(getRes, 'tiaoshi2Action.do?method=Chek_commit', content);
	
	
}
,//提交所有data到服务器
submit_All_task:function(){
	var obj=this;
    //提交验证区
	 var isTt=obj.checkBackTt();
	 var isSus;
	 if(isTt){
		 return;
	 }else{
		 isSus=obj.checkBackTs();
	 }
	 if(isSus){
			return;
		}
	 var DEBUG_ARRIVE_DATE=Ext.getCmp('TASK_DEBUG_ARRIVE_DATE').getValue();
	 var SLOW_TRAIN_ENTER_DATE= Ext.getCmp('TASK_SLOW_TRAIN_ENTER_DATE').getValue();
	 var FAST_TRAIN_ENTER_DATE= Ext.getCmp('TASK_FAST_TRAIN_ENTER_DATE').getValue();
	 
	 
	// return;
	 var BALANCE_INDEX=Ext.getCmp('TASK_BALANCE_INDEX').getValue();
	 var COUNTER_WEIGHT=Ext.getCmp('TASK_COUNTER_WEIGHT').getValue();
	 var LB_MACHINE_FLAG=Ext.getCmp('TASK_LB_MACHINE_FLAG').getValue();
	 var FUCTION_TEST_FLAG___YYY=Ext.getCmp('TASK_FUCTION_TEST_FLAG').getValue();
	 var NEED_SECOND_TEST_WEIGHT=Ext.getCmp('TASK_NEED_SECOND_TEST_WEIGHT').getValue();	
	 
	 var THREE_GUARANTEE_BAD=Ext.getCmp('TASK_THREE_GUARANTEE_BAD').getValue();
	 var DEBUG_END_DATE=Ext.getCmp('TASK_DEBUG_END_DATE').getValue();
	 var ACHIEVE_PUTIN_CHECK_STARDARD=Ext.getCmp('TASK_ACHIEVE_PUTIN_CHECK_STARDARD').getValue();
	 var COMMENTS=Ext.getCmp('TASK_COMMENTS').getValue();
	 var EBS_FULL_NAME=Ext.getCmp('TASK_EBS_FULL_NAME').getValue();
	   
	 //电源电流
	 var DYDL_UP_0=Ext.getCmp('TASK_DYDL_UP_0').getValue();
	 var DYDL_UP_30=Ext.getCmp('TASK_DYDL_UP_30').getValue();
	 var DYDL_UP_40=Ext.getCmp('TASK_DYDL_UP_40').getValue();
	 var DYDL_UP_45=Ext.getCmp('TASK_DYDL_UP_45').getValue();
	 var DYDL_UP_50=Ext.getCmp('TASK_DYDL_UP_50').getValue();
	 var DYDL_UP_60=Ext.getCmp('TASK_DYDL_UP_60').getValue();
	 var DYDL_UP_90=Ext.getCmp('TASK_DYDL_UP_90').getValue();
	 var DYDL_UP_100=Ext.getCmp('TASK_DYDL_UP_100').getValue();
	 var DYDL_UP_110=Ext.getCmp('TASK_DYDL_UP_110').getValue();
	    
	 var DYDL_DOWN_0=Ext.getCmp('TASK_DYDL_DOWN_0').getValue();
	 var DYDL_DOWN_30=Ext.getCmp('TASK_DYDL_DOWN_30').getValue();
	 var DYDL_DOWN_40=Ext.getCmp('TASK_DYDL_DOWN_40').getValue();
	 var DYDL_DOWN_45=Ext.getCmp('TASK_DYDL_DOWN_45').getValue();
	 var DYDL_DOWN_50=Ext.getCmp('TASK_DYDL_DOWN_50').getValue();
	 var DYDL_DOWN_60=Ext.getCmp('TASK_DYDL_DOWN_60').getValue();
	 var DYDL_DOWN_90=Ext.getCmp('TASK_DYDL_DOWN_90').getValue();
	 var DYDL_DOWN_100=Ext.getCmp('TASK_DYDL_DOWN_100').getValue();
	 var DYDL_DOWN_110=Ext.getCmp('TASK_DYDL_DOWN_110').getValue();
       
	    //电机电流
	 var DJDL_UP_0=Ext.getCmp('TASK_DJDL_UP_0').getValue();
	 var DJDL_UP_30=Ext.getCmp('TASK_DJDL_UP_30').getValue();
	 var DJDL_UP_40=Ext.getCmp('TASK_DJDL_UP_40').getValue();
	 var DJDL_UP_45=Ext.getCmp('TASK_DJDL_UP_45').getValue();
	 var DJDL_UP_50=Ext.getCmp('TASK_DJDL_UP_50').getValue();
	 var DJDL_UP_60=Ext.getCmp('TASK_DJDL_UP_60').getValue();
	 var DJDL_UP_90=Ext.getCmp('TASK_DJDL_UP_90').getValue();
	 var DJDL_UP_100=Ext.getCmp('TASK_DJDL_UP_100').getValue();
	 var DJDL_UP_110=Ext.getCmp('TASK_DJDL_UP_110').getValue();
	    
	 var DJDL_DOWN_0=Ext.getCmp('TASK_DJDL_DOWN_0').getValue();
	 var DJDL_DOWN_30=Ext.getCmp('TASK_DJDL_DOWN_30').getValue();
	 var DJDL_DOWN_40=Ext.getCmp('TASK_DJDL_DOWN_40').getValue();
	 var DJDL_DOWN_45=Ext.getCmp('TASK_DJDL_DOWN_45').getValue();
	 var DJDL_DOWN_50=Ext.getCmp('TASK_DJDL_DOWN_50').getValue();
	 var DJDL_DOWN_60=Ext.getCmp('TASK_DJDL_DOWN_60').getValue();
	 var DJDL_DOWN_90=Ext.getCmp('TASK_DJDL_DOWN_90').getValue();
	 var DJDL_DOWN_100=Ext.getCmp('TASK_DJDL_DOWN_100').getValue();
	 var DJDL_DOWN_110=Ext.getCmp('TASK_DJDL_DOWN_110').getValue();
	    
	    //平层数据
	 var PCSJ_UP_0=Ext.getCmp('TASK_PCSJ_UP_0').getValue();
	 var PCSJ_UP_30=Ext.getCmp('TASK_PCSJ_UP_30').getValue();
	 var PCSJ_UP_40=Ext.getCmp('TASK_PCSJ_UP_40').getValue();
	 var PCSJ_UP_45=Ext.getCmp('TASK_PCSJ_UP_45').getValue();
	 var PCSJ_UP_50=Ext.getCmp('TASK_PCSJ_UP_50').getValue();
	 var PCSJ_UP_60=Ext.getCmp('TASK_PCSJ_UP_60').getValue();
	 var PCSJ_UP_90=Ext.getCmp('TASK_PCSJ_UP_90').getValue();
	 var PCSJ_UP_100=Ext.getCmp('TASK_PCSJ_UP_100').getValue();
	 var PCSJ_UP_110=Ext.getCmp('TASK_PCSJ_UP_110').getValue();
	    
	 var PCSJ_DOWN_0=Ext.getCmp('TASK_PCSJ_DOWN_0').getValue();
	 var PCSJ_DOWN_30=Ext.getCmp('TASK_PCSJ_DOWN_30').getValue();
	 var PCSJ_DOWN_40=Ext.getCmp('TASK_PCSJ_DOWN_40').getValue();
	 var PCSJ_DOWN_45=Ext.getCmp('TASK_PCSJ_DOWN_45').getValue();
	 var PCSJ_DOWN_50=Ext.getCmp('TASK_PCSJ_DOWN_50').getValue();
	 var PCSJ_DOWN_60=Ext.getCmp('TASK_PCSJ_DOWN_60').getValue();
	 var PCSJ_DOWN_90=Ext.getCmp('TASK_PCSJ_DOWN_90').getValue();
	 var PCSJ_DOWN_100=Ext.getCmp('TASK_PCSJ_DOWN_100').getValue();
	 var PCSJ_DOWN_110=Ext.getCmp('TASK_PCSJ_DOWN_110').getValue();
	    
	    //电源电压
	 var DYDY_UP_0=Ext.getCmp('TASK_DYDY_UP_0').getValue();
	 var DYDY_UP_30=Ext.getCmp('TASK_DYDY_UP_30').getValue();
	 var DYDY_UP_40=Ext.getCmp('TASK_DYDY_UP_40').getValue();
	 var DYDY_UP_45=Ext.getCmp('TASK_DYDY_UP_45').getValue();
	 var DYDY_UP_50=Ext.getCmp('TASK_DYDY_UP_50').getValue();
	 var DYDY_UP_60=Ext.getCmp('TASK_DYDY_UP_60').getValue();
	 var DYDY_UP_90=Ext.getCmp('TASK_DYDY_UP_90').getValue();
	 var DYDY_UP_100=Ext.getCmp('TASK_DYDY_UP_100').getValue();
	 var DYDY_UP_110=Ext.getCmp('TASK_DYDY_UP_110').getValue();
	    
	 var DYDY_DOWN_0=Ext.getCmp('TASK_DYDY_DOWN_0').getValue();
	 var DYDY_DOWN_30=Ext.getCmp('TASK_DYDY_DOWN_30').getValue();
	 var DYDY_DOWN_40=Ext.getCmp('TASK_DYDY_DOWN_40').getValue();
	 var DYDY_DOWN_45=Ext.getCmp('TASK_DYDY_DOWN_45').getValue();
	 var DYDY_DOWN_50=Ext.getCmp('TASK_DYDY_DOWN_50').getValue();
	 var DYDY_DOWN_60=Ext.getCmp('TASK_DYDY_DOWN_60').getValue();
	 var DYDY_DOWN_90=Ext.getCmp('TASK_DYDY_DOWN_90').getValue();
	 var DYDY_DOWN_100=Ext.getCmp('TASK_DYDY_DOWN_100').getValue();
	 var DYDY_DOWN_110=Ext.getCmp('TASK_DYDY_DOWN_110').getValue();
        
	    //退调
	 var DEBUG_RETURN_DATE1=Ext.getCmp('TASK_DEBUG_RETURN_DATE1').getValue();
	 var DEBUG_RETURN_REASON1=Ext.getCmp('TASK_DEBUG_RETURN_REASON1').getValue();
	 var DEBUG_FORFEIT_AMT1=Ext.getCmp('TASK_DEBUG_FORFEIT_AMT1').getValue();
	 var DEBUG_FORFEIT_DATE1=Ext.getCmp('TASK_DEBUG_FORFEIT_DATE1').getValue();
	 var NOT_ACHIEVE_STANDARD=Ext.getCmp('TASK_NOT_ACHIEVE_STANDARD').getValue();
	 //不变动。

	 var ENGCONTRACT_NUMBER=Ext.getCmp('TASK_ENGCONTRACT_NUMBER').getValue();
	 var ELEVATOR_NO=Ext.getCmp('TASK_ELEVATOR_NO').getValue();
	 var CUSTOMER_NAME=Ext.getCmp('TASK_CUSTOMER_NAME').getValue();
	 var INSTALL_ADDRESS=Ext.getCmp('TASK_INSTALL_ADDRESS').getValue();
	 var PRODUCE_TYPE=Ext.getCmp('TASK_PRODUCE_TYPE').getValue();
	// var SEQ_NUM=Ext.getCmp('TASK_SEQ_NUM').getValue();
	 var EQUIPMENT_NO=Ext.getCmp('TASK_EQUIPMENT_NO').getValue();
	 var CM_ELEVATOR_TYPE_NAME=Ext.getCmp('TASK_CM_ELEVATOR_TYPE_NAME').getValue();
	 var ELEVATOR_CLASS_NAME=Ext.getCmp('TASK_ELEVATOR_CLASS_NAME').getValue();
	 var NST_VENDOR_NAME=Ext.getCmp('TASK_NST_VENDOR_NAME').getValue();
	 var VENDOR_NAME=Ext.getCmp('TASK_LIFT_VENDOR_NAME').getValue();
	 var BUILD_VENDOR_NAME=Ext.getCmp('TASK_BUILD_VENDOR_NAME').getValue();
	 var BUDGET_INSTALL_METHOD=Ext.getCmp('TASK_BUDGET_INSTALL_METHOD').getValue();
	 var PARAM_C_M_Z=Ext.getCmp('TASK_PARAM_C_M_Z').getValue();
	 var PARAM_ZZ=Ext.getCmp('TASK_PARAM_ZZ').getValue();
	 var PARAM_SD=Ext.getCmp('TASK_PARAM_SD').getValue();
	 var PARAM_TSGD=Ext.getCmp('TASK_PARAM_TSGD').getValue();
	 var PARAM_JDZG=Ext.getCmp('TASK_PARAM_JDZG').getValue();
	 var GET_DEBUG_DATE=Ext.getCmp('TASK_GET_DEBUG_DATE').getValue();
	 var PLAN_DEBUG_DATE=Ext.getCmp('TASK_PLAN_DEBUG_DATE').getValue();
	 var JL_NAME=Ext.getCmp('TASK_JL_NAME').getValue();
	    
	 var INST_PERSON_NAME=Ext.getCmp('TASK_INST_PERSON_NAME').getValue();
	// var DEBUG_NUM=Ext.getCmp('TASK_DEBUG_NUM').getValue();
	 var PLAN_DEBUG_FINISH_DATE=Ext.getCmp('TASK_PLAN_DEBUG_FINISH_DATE').getValue();
	 var DEBUG_EMPLOYEE_NAME=Ext.getCmp('TASK_DEBUG_EMPLOYEE_NAME').getValue();
	    //安装组长 及电话
	 var INSTALL_HEADER=Ext.getCmp('TASK_INSTALL_HEADER').getValue();
	 var TEL=Ext.getCmp('TASK_TEL').getValue();
	 //获取隐藏时间
	 var LB_MACHINE_DATE=Ext.getCmp('TASK_LB_MACHINE_DATE').getValue();
	 //
	 var TASK_PROCESS_ID=Ext.getCmp('TASK_PROCESS_ID').getValue();
	 var TASK_ID=Ext.getCmp('TASK_ID').getValue();
	 var ORG_ID=Ext.getCmp('ORG_ID').getValue();
	 var SEQ_NUM=Ext.getCmp('TASK_SEQ_NUM').getValue();
	 var DEBUG_NUM=Ext.getCmp('TASK_DEBUG_NUM').getValue();
	 var CHECK_NUM=Ext.getCmp('CHECK_NUM').getValue();
	    
        	    
	    //PLAN_DEBUG_DATE2 暂时不知道干啥用
	    var PLAN_DEBUG_DATE2=Ext.getCmp('PLAN_DEBUG_DATE2').getValue();
	   
	    //模拟后台需要数据
	    if(NEED_SECOND_TEST_WEIGHT=="是"){
	    	NEED_SECOND_TEST_WEIGHT="Y";
	    }else if(NEED_SECOND_TEST_WEIGHT=="否"){
	    	NEED_SECOND_TEST_WEIGHT=="N";
	    }else{
	    	NEED_SECOND_TEST_WEIGHT=="";
	    }
	    var SLOW_TRAIN_FLAG=null;
	    if(SLOW_TRAIN_ENTER_DATE==''||SLOW_TRAIN_ENTER_DATE==null||typeof(SLOW_TRAIN_ENTER_DATE)=='undefined'){
	    	SLOW_TRAIN_FLAG="N";
	    }else{
	    	SLOW_TRAIN_FLAG='Y';
	    }
	    var FAST_TRAIN_FLAG=null;
	    if(FAST_TRAIN_ENTER_DATE==''||FAST_TRAIN_ENTER_DATE==null||typeof(FAST_TRAIN_ENTER_DATE)=='undefined'){
	    	FAST_TRAIN_FLAG="N";
	    }else{
	    	FAST_TRAIN_FLAG='Y';
	    }
	    var LB_MACHINE_ENTER_DATE=new Date();
	    if(LB_MACHINE_FLAG==0||LB_MACHINE_FLAG==null||typeof(LB_MACHINE_FLAG)=='undefined'){
	    	LB_MACHINE_FLAG="N";
	    	LB_MACHINE_ENTER_DATE='';
	    }else{
	    	LB_MACHINE_FLAG='Y';
	        var date=new Date();
	        LB_MACHINE_ENTER_DATE=Ext.Date.format(date,'Y-m-d H:i:s');
	    }
	    var FUCTION_TEST_FLAG=null;
	    var FUCTION_TEST_ENTER_DATE=null;
	    if(FUCTION_TEST_FLAG___YYY==0||FUCTION_TEST_FLAG___YYY==null||typeof(FUCTION_TEST_FLAG___YYY)=='undefined'){
	    	 FUCTION_TEST_FLAG="N";
	    	 FUCTION_TEST_ENTER_DATE='';
	    }else{
	    	FUCTION_TEST_FLAG='Y';
	    	var date=new Date();
	   	   FUCTION_TEST_ENTER_DATE=Ext.Date.format(date,'Y-m-d H:i:s');
	    }
	    //签名
	    var DEBUG_MAN=ebs_user_id;
	    var DEBUG_MAN_NAME=EBS_FULL_NAME;
	    
	    
	    var store1=obj.getStore('InstallatoinTasksReportCheck_search_Employee_2_Store','HelcPDA.store.install.installdebug.InstallatoinTasksReportCheck_search_Employee_2_Store');
		var list_Employee1=Ext.Array.pluck(store1.getData().items,'data');
	    //获取store
	    var EBS_PERSON_NAME_R=[];
	    for(var i=0;i<list_Employee1.length;i++){
	    	var item={};
	    	item.EBS_PERSON_ID=list_Employee1[i].EBS_PERSON_ID;
	    	item.TASK_PROCESS_ID=TASK_PROCESS_ID;
	    	item.TASK_ID=TASK_ID;
	    	EBS_PERSON_NAME_R[i]=item;
	    }
	    //隐藏的，不存在的Date3
	    var DATE3=new Date();
	    
	    //快车完成日期和磅机完成日期  ，页面没有磅机完成日期，后台需要，补上
	   var FAST_TRAIN_DATE=FAST_TRAIN_ENTER_DATE;
	   //NOT_ACHIEVE_STANDARD                   将0,1数据变成N，Y数据
	   if(NOT_ACHIEVE_STANDARD==0){
		   NOT_ACHIEVE_STANDARD='N';
	   }else{
		   NOT_ACHIEVE_STANDARD="Y";
	   }
	   if(ACHIEVE_PUTIN_CHECK_STARDARD==0){
		   ACHIEVE_PUTIN_CHECK_STARDARD="N";
	   }else{
		   ACHIEVE_PUTIN_CHECK_STARDARD="Y";
	   }
	   
	   //对日期进行sting=null 处理
	  if(DEBUG_END_DATE==''||DEBUG_END_DATE==null||typeof(DEBUG_END_DATE)=='undefined'){
		  DEBUG_END_DATE='';
	  }
	  if(DEBUG_RETURN_REASON1=="请选择"){
		  DEBUG_RETURN_REASON1='';
	  }
	  //对时间格式进行处理
	  if(DEBUG_ARRIVE_DATE==""||DEBUG_ARRIVE_DATE=="null"||DEBUG_ARRIVE_DATE==null||typeof(DEBUG_ARRIVE_DATE)=='undefined')
		 {
		  DEBUG_ARRIVE_DATE='';
		 }else{
			 DEBUG_ARRIVE_DATE=Ext.Date.format(new Date(DEBUG_ARRIVE_DATE),'Y-m-d');
		 }
	  if(DEBUG_FORFEIT_DATE1==""||DEBUG_FORFEIT_DATE1=="null"||DEBUG_FORFEIT_DATE1==null||typeof(DEBUG_FORFEIT_DATE1)=='undefined')
		 {
		 DEBUG_FORFEIT_DATE1='';
		 }else{
		DEBUG_FORFEIT_DATE1=Ext.Date.format(new Date(DEBUG_FORFEIT_DATE1),'Y-m-d H:i:s');
		 }
	  if(DEBUG_RETURN_DATE1==""||DEBUG_RETURN_DATE1==null||typeof(DEBUG_RETURN_DATE1)=='undefined')
		 {
		  DEBUG_RETURN_DATE1='';
		 }else{
		 DEBUG_RETURN_DATE1=Ext.Date.format(new Date(DEBUG_RETURN_DATE1),'Y-m-d H:i:s');
		 }
	  if(DEBUG_END_DATE==""||DEBUG_END_DATE==null||typeof(DEBUG_END_DATE)=='undefined')
		 {
		  DEBUG_END_DATE='';
		 }else{  
			 DEBUG_END_DATE=Ext.Date.format(new Date(DEBUG_END_DATE),'Y-m-d H:i:s');
		 }
	  if(FAST_TRAIN_ENTER_DATE==""||FAST_TRAIN_ENTER_DATE==null||typeof(FAST_TRAIN_ENTER_DATE)=='undefined')
		 {
		
		  FAST_TRAIN_ENTER_DATE='';
		 }else{  
			 FAST_TRAIN_ENTER_DATE=Ext.Date.format(new Date(FAST_TRAIN_ENTER_DATE),'Y-m-d H:i:s');
		 }
	  if(SLOW_TRAIN_ENTER_DATE==""||SLOW_TRAIN_ENTER_DATE==null||typeof(SLOW_TRAIN_ENTER_DATE)=='undefined')
		 {
		  SLOW_TRAIN_ENTER_DATE=null;
		 }else{   
			 SLOW_TRAIN_ENTER_DATE=Ext.Date.format(new Date(SLOW_TRAIN_ENTER_DATE),'Y-m-d H:i:s');
		 }
	  if(FAST_TRAIN_DATE==""||FAST_TRAIN_DATE==null||typeof(FAST_TRAIN_DATE)=='undefined')
		 {
		  FAST_TRAIN_DATE='';
		 }else{  
			  FAST_TRAIN_DATE=Ext.Date.format(new Date(FAST_TRAIN_DATE),'Y-m-d H:i:s');
		 }
	  if(DATE3==""||DATE3==null||typeof(DATE3)=='undefined')
		 {
		  DATE3=null;
		 }else{  
			  DATE3=Ext.Date.format(DATE3,'Y-m-d H:i:s');
		 }
	  //当退调时，退调原因和退调日期，一个不为空的时候，那么提交时，填写的罚款金额和罚款日期是不会产生退调的，但是还是会保存到缓存中，但是不会保存到数据库
	  if(DEBUG_RETURN_REASON1==''||DEBUG_RETURN_DATE1==''){
		  DEBUG_FORFEIT_AMT1='';
		  DEBUG_FORFEIT_DATE1='';
	  }
	  
	  //隐藏字段
	    var BUILD_UNIT_NUM=Ext.getCmp('BUILD_UNIT_NUM').getValue();
		 var DATA_CART_NUM=Ext.getCmp('DATA_CART_NUM').getValue();
		 var PORT_NUM=Ext.getCmp('PORT_NUM').getValue();
		 
	 var content1={DEBUG_ARRIVE_DATE:DEBUG_ARRIVE_DATE,SLOW_TRAIN_ENTER_DATE:SLOW_TRAIN_ENTER_DATE,
			 FAST_TRAIN_ENTER_DATE:FAST_TRAIN_ENTER_DATE,BALANCE_INDEX:BALANCE_INDEX,
			 COUNTER_WEIGHT:COUNTER_WEIGHT,LB_MACHINE_ENTER_DATE:LB_MACHINE_ENTER_DATE,
			 FUCTION_TEST_FLAG:FUCTION_TEST_FLAG,NEED_SECOND_TEST_WEIGHT:NEED_SECOND_TEST_WEIGHT,
			 THREE_GUARANTEE_BAD:THREE_GUARANTEE_BAD,DEBUG_END_DATE:DEBUG_END_DATE,
			 ACHIEVE_PUTIN_CHECK_STARDARD:ACHIEVE_PUTIN_CHECK_STARDARD,COMMENTS:COMMENTS,
			 EBS_FULL_NAME:EBS_FULL_NAME,
			 // 电流，电压
			 DYDL_UP_0:DYDL_UP_0,DYDL_UP_30:DYDL_UP_30,
			 DYDL_UP_40:DYDL_UP_40,DYDL_UP_45:DYDL_UP_45,DYDL_UP_50:DYDL_UP_50,
			 DYDL_UP_60:DYDL_UP_60,DYDL_UP_90:DYDL_UP_90,DYDL_UP_100:DYDL_UP_100,
			 DYDL_UP_110:DYDL_UP_110,DYDL_DOWN_0:DYDL_DOWN_0,DYDL_DOWN_30:DYDL_DOWN_30,
			 DYDL_DOWN_40:DYDL_DOWN_40,DYDL_DOWN_45:DYDL_DOWN_45,DYDL_DOWN_50:DYDL_DOWN_50,
			 DYDL_DOWN_60:DYDL_DOWN_60,DYDL_DOWN_90:DYDL_DOWN_90,DYDL_DOWN_100:DYDL_DOWN_100,
			 DYDL_DOWN_110:DYDL_DOWN_110,DJDL_UP_0:DJDL_UP_0,DJDL_UP_30:DJDL_UP_30,
			 DJDL_UP_40:DJDL_UP_40,DJDL_UP_45:DJDL_UP_45,DJDL_UP_50:DJDL_UP_50,
			 DJDL_UP_60:DJDL_UP_60,DJDL_UP_90:DJDL_UP_90,DJDL_UP_100:DJDL_UP_100,
			 DJDL_UP_110:DJDL_UP_110,DJDL_DOWN_0:DJDL_DOWN_0,DJDL_DOWN_30:DJDL_DOWN_30,
			 DJDL_DOWN_40:DJDL_DOWN_40,DJDL_DOWN_45:DJDL_DOWN_45,DJDL_DOWN_50:DJDL_DOWN_50,
			 DJDL_DOWN_60:DJDL_DOWN_60,DJDL_DOWN_90:DJDL_DOWN_90,DJDL_DOWN_100:DJDL_DOWN_100,
			 DJDL_DOWN_110:DJDL_DOWN_110,PCSJ_UP_0:PCSJ_UP_0,PCSJ_UP_30:PCSJ_UP_30,
			 PCSJ_UP_40:PCSJ_UP_40,PCSJ_UP_45:PCSJ_UP_45,PCSJ_UP_50:PCSJ_UP_50,
			 PCSJ_UP_60:PCSJ_UP_60,PCSJ_UP_90:PCSJ_UP_90,PCSJ_UP_100:PCSJ_UP_100,
			 PCSJ_UP_110:PCSJ_UP_110,PCSJ_DOWN_0:PCSJ_DOWN_0,PCSJ_DOWN_30:PCSJ_DOWN_30,
			 PCSJ_DOWN_40:PCSJ_DOWN_40,PCSJ_DOWN_45:PCSJ_DOWN_45,PCSJ_DOWN_50:PCSJ_DOWN_50,
			 PCSJ_DOWN_60:PCSJ_DOWN_60,PCSJ_DOWN_90:PCSJ_DOWN_90,PCSJ_DOWN_100:PCSJ_DOWN_100,
			 PCSJ_DOWN_110:PCSJ_DOWN_110,DYDY_UP_0:DYDY_UP_0,DYDY_UP_30:DYDY_UP_30,
			 DYDY_UP_40:DYDY_UP_40,DYDY_UP_45:DYDY_UP_45,DYDY_UP_50:DYDY_UP_50,
			 DYDY_UP_60:DYDY_UP_60,DYDY_UP_90:DYDY_UP_90,DYDY_UP_100:DYDY_UP_100,
			 DYDY_UP_110:DYDY_UP_110,DYDY_DOWN_0:DYDY_DOWN_0,DYDY_DOWN_30:DYDY_DOWN_30,
			 DYDY_DOWN_40:DYDY_DOWN_40,DYDY_DOWN_45:DYDY_DOWN_45,DYDY_DOWN_50:DYDY_DOWN_50,
			 DYDY_DOWN_60:DYDY_DOWN_60,DYDY_DOWN_90:DYDY_DOWN_90,DYDY_DOWN_100:DYDY_DOWN_100,
			 DYDY_DOWN_110:DYDY_DOWN_110,
			 //退调
			 DEBUG_RETURN_REASON:DEBUG_RETURN_REASON1,
			 T_DEBUG_RETURN_DATE:DEBUG_RETURN_DATE1,
			 T_DEBUG_RETURN_REASON:DEBUG_RETURN_REASON1,T_DEBUG_FORFEIT_AMT:DEBUG_FORFEIT_AMT1,
			 T_DEBUG_FORFEIT_DATE:DEBUG_FORFEIT_DATE1,NOT_ACHIEVE_STANDARD:NOT_ACHIEVE_STANDARD,
	         //...........不变的
			 ENGCONTRACT_NUMBER:ENGCONTRACT_NUMBER,ELEVATOR_NO:ELEVATOR_NO,
			 CUSTOMER_NAME:CUSTOMER_NAME,INSTALL_ADDRESS:INSTALL_ADDRESS,
			 PRODUCE_TYPE:PRODUCE_TYPE,SEQ_NUM:SEQ_NUM,EQUIPMENT_NO:EQUIPMENT_NO,
			 CM_ELEVATOR_TYPE_NAME:CM_ELEVATOR_TYPE_NAME,ELEVATOR_CLASS_NAME:ELEVATOR_CLASS_NAME,
			 NST_VENDOR_NAME:NST_VENDOR_NAME,VENDOR_NAME:VENDOR_NAME,
			 BUILD_VENDOR_NAME:BUILD_VENDOR_NAME,BUDGET_INSTALL_METHOD:BUDGET_INSTALL_METHOD,
			 PARAM_C_M_Z:PARAM_C_M_Z,PARAM_ZZ:PARAM_ZZ,PARAM_SD:PARAM_SD,
			 PARAM_TSGD:PARAM_TSGD,PARAM_JDZG:PARAM_JDZG,GET_DEBUG_DATE:GET_DEBUG_DATE,
			 PLAN_DEBUG_DATE:PLAN_DEBUG_DATE,JL_NAME:JL_NAME,
			 INST_PERSON_NAME:INST_PERSON_NAME,DEBUG_NUM:DEBUG_NUM,
			 PLAN_DEBUG_FINISH_DATE:PLAN_DEBUG_FINISH_DATE,DEBUG_EMPLOYEE_NAME:DEBUG_EMPLOYEE_NAME,
			 INSTALL_HEADER:INSTALL_HEADER,TEL:TEL,
			 //TASK_PROCESS_ID TASK_ID ORG_ID CHECK_NUM ebs_user_id 以下都是后台坑。。没法啊！
			 TASK_PROCESS_ID:TASK_PROCESS_ID,TASK_ID:TASK_ID,ORG_ID:ORG_ID,
			 CHECK_NUM:CHECK_NUM,ebs_user_id:ebs_user_id,
			 //EBS_PERSON_NAME_R
			 EBS_PERSON_NAME_R:EBS_PERSON_NAME_R,
			 //USERID
			 USERID:ebs_user_id,
			 //flag 
			 SLOW_TRAIN_FLAG:SLOW_TRAIN_FLAG,FAST_TRAIN_FLAG:FAST_TRAIN_FLAG,
			 LB_MACHINE_FLAG:LB_MACHINE_FLAG,FUCTION_TEST_ENTER_DATE:FUCTION_TEST_ENTER_DATE
			 //没使用
			 ,PLAN_DEBUG_DATE2:PLAN_DEBUG_DATE2,
			 //签名
			 DEBUG_MAN:DEBUG_MAN,DEBUG_MAN_NAME:DEBUG_MAN_NAME,
			 //不存在的DATE3
			 DATE3:DATE3,
			 //快车完成日期，磅机完成日期，  磅机完成日期不存在。
			 FAST_TRAIN_DATE:FAST_TRAIN_DATE,LB_MACHINE_DATE:LB_MACHINE_DATE,
			 //隐藏字段
			 BUILD_UNIT_NUM:BUILD_UNIT_NUM,DATA_CART_NUM:DATA_CART_NUM,
			 PORT_NUM:PORT_NUM
	 }; 

    function getRes(res){
    	if(res.flg=="Y"){
    		WL.Toast.show('已退调，请联系主管重新派发');
    		return;
    	}else{
    		 obj.save_task("保存成功",content1);
    		//obj.connectServer(getResult,'tiaoshi2Action.do?method=toAdd_tiaoshi',JSON.stringify(content1));
    	}
    }
    var content="{'USERID':'"+ebs_user_id+"','TASK_ID':'"+TASK_ID+"','TASK_PROCESS_ID':'"+TASK_PROCESS_ID+"','ORG_ID':'"+ORG_ID+"','SEQ_NUM':'"+SEQ_NUM+"','DEBUG_NUM':'"+DEBUG_NUM+"','CHECK_NUM':'"+CHECK_NUM+"'}";
    obj.connectServer(getRes,'tiaoshi2Action.do?method=Chek_commit',content);
},


// 访问菜单纸
check_detail:function(){
    
	 var TASK_DEBUG_ARRIVE_DATE=Ext.getCmp('TASK_DEBUG_ARRIVE_DATE').getValue();
	 if(TASK_DEBUG_ARRIVE_DATE==''||TASK_DEBUG_ARRIVE_DATE==null){
		 WL.Toast.show("请填写调试到达日期");
		 //Ext.Msg.alert("请填写调试完成日期");
		 return;
	 }
	
	
	// 获取必要信息
	var moduleFlag = "TS";
	var TASK_ID = Ext.getCmp('task_id').getValue();
	var TASK_PROCESS_ID = Ext.getCmp('TASK_PROCESS_ID').getValue();
	var SEQ_NUM = Ext.getCmp('TASK_SEQ_NUM').getValue();
	var ORG_ID = Ext.getCmp("ORG_ID").getValue();
	var CHECK_NUM = Ext.getCmp("CHECK_NUM").getValue();
	var SD=Ext.getCmp('TASK_PARAM_SD').getValue();
	var TID = '';
	var title = '调试';
	var ELEVATOR_CLASS_NAME = Ext.getCmp('TASK_ELEVATOR_CLASS_NAME').getValue();
	var fileMDate = '';
	var obj = this;
	var fileName = 'MENUPAPER';
	
	// 检查直扶梯
	if (ELEVATOR_CLASS_NAME.indexOf("直") != -1) {//判断直梯还是扶梯
  			fileName += "_ZT";
  			title += "直梯";
  			if (SD != '') {
  				if ((SD/60) < 4) {
					fileName += "4D";
					title += "(V < 4m/s)";
				} else {
					fileName += "4U";
					title += "(V ≥ 4m/s)";
				}
  			}
  	} else if (ELEVATOR_CLASS_NAME.indexOf("扶") != -1) {
  			fileName += "_FT";
  			title += "扶梯";
  	} else {
  			fileName = "MENUPAPER_ZT4U";
  			title += "直梯";
  	}
	
	// 查找文件最后更新日期
	var selection={tcode:'XML_VERSION',tid:fileName};
	var options = {};
	WL.JSONStore.get(collectionName).find(selection,options).then(function(arrayResults){
		if (arrayResults.length > 0) {
			fileMDate = arrayResults[0].json.stext.fileMDate;
		}
		// 检查服务器文件更新
 		obj.connectServer(handlerResult,"instllMenudPaperAction.do?method=toSearchXML_PDA3","{DATA:{TASK_PROCESS_ID:'"+ TASK_PROCESS_ID +"'},FILENAME:'"+ fileName +"',fileMDate:'"+ fileMDate +"'}");
 		function handlerResult(result) {
 			if (!result.isexits) {
 				WL.Toast.show('暂无此项目！');
 				return ;
			}
			if (result.filedt != "NOFILE" && arrayResults.length > 0) {
				// 刷新最新的文件版本进JSONSTORE
				var nstext = arrayResults[0].json.stext;
				nstext.fileMDate = result.last_mdate;
				var ndata = {tcode:'XML_VERSION',tid:fileName,stext:nstext};
				var udata = {_id:arrayResults[0]._id, json:ndata};
				WL.JSONStore.get(collectionName).refresh(udata,options).then(function(arrayResults2){
				}).fail(function(errorObject){
					WL.Toast.show(errorObject);
				});
			} else if (result.filedt != "NOFILE") {
				// 保存文件版本进JSONSTORE
						var nstext = {fileMDate:result.last_mdate};
						var ndata = {tcode:'XML_VERSION',tid:fileName,stext:nstext};
						WL.JSONStore.get(collectionName).add(ndata,options).then(function(arrayResults2){
						}).fail(function(errorObject){
							WL.Toast.show(errorObject);
						});					
			}
			// 查询以往填过的菜单
			var selection_find = {tcode:'MENU_PITEM_'+fileName,tid:TASK_ID+'_'+SEQ_NUM};
			options = {};
			WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
					var sdata_id = 'NOT';
					var sdata = [];
					if (arrayResults2.length > 0) {
						sdata_id = ''+arrayResults2[0]._id;
						sdata = arrayResults2[0].json.stext;
					}
					// 判断服务器上的数据是否比本地新
					var itemValue = result.itemValue;
					var DATA_LAST_UPDATE_DATE = result.LAST_UPDATE_DATE;
					if (DATA_LAST_UPDATE_DATE != '' && arrayResults2.length>0) {
						var date_server = new Date(DATA_LAST_UPDATE_DATE.replace("-","/"));
						var date_local = new Date(sdata.LAST_UPDATE_DATE);
						if (date_server > date_local) {
							sdata = result.itemValue;
						}
					} else if (DATA_LAST_UPDATE_DATE != '' && arrayResults2.length<1) {
						sdata = result.itemValue;
					}
					WL.Toast.show('正在进入菜单纸,请稍等...');
					// 进入文件
	 				var param = {SDATA:JSON.stringify(sdata),filedata:result.filedt,filename:fileName,
	 				task_id:TASK_ID,task_process_id:TASK_PROCESS_ID,seq_num:SEQ_NUM,sd:SD,org_id:ORG_ID,
	 				elevator_class_name:ELEVATOR_CLASS_NAME,moduleFlag:moduleFlag,data_id:sdata_id,title:title,
	 				debug_num:CHECK_NUM,init_person_id:init_person_id,ebs_user_id:ebs_user_id,collectionName:collectionName};
					WL.NativePage.show('com.gzunicorn.operation.menupaper.InstallPaper', obj.handlerActionResult_Debug, param);
			}).fail(function(errorObject){
				WL.Toast.show(errorObject);
			});
			
	};
	}).fail(function(errorObject){
		WL.Toast.show(errorObject);
	});
	
},
handlerActionResult_Debug: function(data) {
 	var json_data = eval("("+ data.sdata +")");
 	var json_data_stext = eval("("+ json_data.stext +")");
 	if (data.data_id == "NOT") {
 		// 保存进JSONSTORE
		var ndata = {tcode:json_data.tcode,tid:json_data.tid,stext:json_data_stext};
		var options = {};
		WL.JSONStore.get(collectionName).add(ndata,options).then(function(arrayResults2){
			WL.Toast.show('保存成功！');
			if(data.returnStatus != 'NOVALUE') {
				handleFromMenuPaper_Debug(data.returnStatus);
			}
			// 刷新列表状态
		}).fail(function(errorObject){
			WL.Toast.show(errorObject);
		});	
 	} else {
 		// 更新进JSONSTORE
		var ndata = {tcode:json_data.tcode,tid:json_data.tid,stext:json_data_stext};
		var options = {};
		var udata = {_id:data.data_id, json:ndata};
		WL.JSONStore.get(collectionName).refresh(udata,options).then(function(arrayResults2){
			WL.Toast.show('保存成功！');
			if(data.returnStatus != 'NOVALUE') {
				handleFromMenuPaper_Debug(data.returnStatus);
			}
		}).fail(function(errorObject){
			WL.Toast.show(errorObject);
		});	
 	}
	 	
},
handleFromMenuPaper_Debug: function(status) {
}

,//验证退调区是否填写数值，用以确定正常情况下提交的验证是否必须
checkBackTt:function(){
	 var DEBUG_RETURN_DATE1=Ext.getCmp('TASK_DEBUG_RETURN_DATE1').getValue();
	 var DEBUG_RETURN_REASON1=Ext.getCmp('TASK_DEBUG_RETURN_REASON1').getValue();
	
	 //调试到达，慢车，快车
	 var DEBUG_ARRIVE_DATE=Ext.getCmp('TASK_DEBUG_ARRIVE_DATE').getValue();
	 var SLOW_TRAIN_ENTER_DATE= Ext.getCmp('TASK_SLOW_TRAIN_ENTER_DATE').getValue();
	 var FAST_TRAIN_ENTER_DATE= Ext.getCmp('TASK_FAST_TRAIN_ENTER_DATE').getValue();
	 var isTt=false;
	if(DEBUG_RETURN_REASON1!=''||DEBUG_RETURN_DATE1!=''){
	if(DEBUG_RETURN_REASON1!=''&&DEBUG_RETURN_DATE1==''){
			WL.Toast.show('请选择退调日期');
			return true;
		}
	if(DEBUG_RETURN_DATE1!=''&&DEBUG_RETURN_REASON1==''){
			WL.Toast.show('请选择退调原因');
			return true;
	 }
	//验证退调日期和快车，慢车，调试到达日期之间的关系
	 var arrivedate=Ext.Date.format(new Date(DEBUG_ARRIVE_DATE),'Y-m-d');
	 var slowTrandate=Ext.Date.format(new Date(SLOW_TRAIN_ENTER_DATE),'Y-m-d');
	 var fastTrandate=Ext.Date.format(new Date(FAST_TRAIN_ENTER_DATE),'Y-m-d');
	 var debug_return_date=Ext.Date.format(new Date(DEBUG_RETURN_DATE1),'Y-m-d');
	 //快车时间存在，验证快车和退调日期的日期进行对比
	 if(FAST_TRAIN_ENTER_DATE!=''&&FAST_TRAIN_ENTER_DATE!=null&&typeof(FAST_TRAIN_ENTER_DATE)!='undefined'){
		 var a=comptime(fastTrandate,debug_return_date);  
		 if(a<0){
			 WL.Toast.show('退调日期必须大于或等于快车日期');
			 return true;
		 }
		 
	 }else{
		 //慢车时间存在，退调日期和慢车时间进行对比
		 if(SLOW_TRAIN_ENTER_DATE!=''&&SLOW_TRAIN_ENTER_DATE!=null&&typeof(SLOW_TRAIN_ENTER_DATE)!='undefined'){
			 var b=comptime(slowTrandate,debug_return_date);  
			 if(b<0){
				 WL.Toast.show('退调日期必须大于或等于慢车日期');
				 return true;
			 }
		 }else{
          //当慢车时间和快车时间都不存在的情况下，退调日期和到达日期进行对比
			 if(DEBUG_ARRIVE_DATE!=''&&DEBUG_ARRIVE_DATE!=null&&typeof(DEBUG_ARRIVE_DATE)!='undefined'){
				 var c=comptime(arrivedate,debug_return_date);  
				 if(c<0){
					 WL.Toast.show('退调日期必须大于或等于调试到达日期');
					 return true;
				 }
				 
		 }else{
			 //当调试到达，快车，慢车时间都不存在时提示
			 WL.Toast.show('请填写调试到达日期，否则不能进行退调');
			 return true;
			 }
		 }
	 }
	}
	 return isTt;
},
//当没有退调的情况下，对是否正常调试提交进行验证
checkBackTs:function(){
	 var isSus=true; 
	 var DEBUG_ARRIVE_DATE=Ext.getCmp('TASK_DEBUG_ARRIVE_DATE').getValue();
	 var SLOW_TRAIN_ENTER_DATE= Ext.getCmp('TASK_SLOW_TRAIN_ENTER_DATE').getValue();
	 var FAST_TRAIN_ENTER_DATE= Ext.getCmp('TASK_FAST_TRAIN_ENTER_DATE').getValue();
	 var BALANCE_INDEX=Ext.getCmp('TASK_BALANCE_INDEX').getValue();
	 var COUNTER_WEIGHT=Ext.getCmp('TASK_COUNTER_WEIGHT').getValue();
	 var LB_MACHINE_FLAG=Ext.getCmp('TASK_LB_MACHINE_FLAG').getValue();
	 var FUCTION_TEST_FLAG___YYY=Ext.getCmp('TASK_FUCTION_TEST_FLAG').getValue();
	 var NEED_SECOND_TEST_WEIGHT=Ext.getCmp('TASK_NEED_SECOND_TEST_WEIGHT').getValue();	
	 
	 var THREE_GUARANTEE_BAD=Ext.getCmp('TASK_THREE_GUARANTEE_BAD').getValue();
	 var DEBUG_END_DATE=Ext.getCmp('TASK_DEBUG_END_DATE').getValue();
	 var EBS_FULL_NAME=Ext.getCmp('TASK_EBS_FULL_NAME').getValue();
	
	 if(SLOW_TRAIN_ENTER_DATE!=''&&SLOW_TRAIN_ENTER_DATE!=null&&typeof(SLOW_TRAIN_ENTER_DATE)!='undefined'){
		 var arrivedate=Ext.Date.format(new Date(DEBUG_ARRIVE_DATE),'Y-m-d');
		 var slowTrandate=Ext.Date.format(new Date(SLOW_TRAIN_ENTER_DATE),'Y-m-d');
		 var a=comptime(arrivedate,slowTrandate);
		 if(a<0){
			 WL.Toast.show("慢车时间必须大于或等于到调试到达日期");
			 return isSus;
		 }
	 }
	 if(FAST_TRAIN_ENTER_DATE!=''&&FAST_TRAIN_ENTER_DATE!=null&&typeof(FAST_TRAIN_ENTER_DATE)!='undefined'){
		 if(SLOW_TRAIN_ENTER_DATE==''||SLOW_TRAIN_ENTER_DATE==null||typeof(SLOW_TRAIN_ENTER_DATE)=='undefined'){
		    	WL.Toast.show('慢车完成日期不能空');
		    	return isSus;
		   }
		 var slowTrandate=Ext.Date.format(new Date(SLOW_TRAIN_ENTER_DATE),'Y-m-d');
		 var fastTrandate=Ext.Date.format(new Date(FAST_TRAIN_ENTER_DATE),'Y-m-d');
		 var b=comptime(slowTrandate,fastTrandate);
		 if(b<0){
			 WL.Toast.show('快车时间必须大于或等于慢车时间');
			 return isSus;
		 }
	 }
	 //当调试结束日期不为空时，验证所有必填项是否满足要求
	 if(DEBUG_END_DATE!=''&&DEBUG_END_DATE!=null&&typeof(DEBUG_END_DATE)!='undefined'){
	
	 if(DEBUG_ARRIVE_DATE==''||DEBUG_ARRIVE_DATE==null||typeof(DEBUG_ARRIVE_DATE)=='undefined'){
		    	WL.Toast.show('调试到达日期不能空');
		    	return isSus;
	  }
	 if(FAST_TRAIN_ENTER_DATE==''||FAST_TRAIN_ENTER_DATE==null||typeof(FAST_TRAIN_ENTER_DATE)=='undefined'){
	    	WL.Toast.show('快车完成日期不能空');
	    	return isSus;
	   }
	 if(BALANCE_INDEX==''||BALANCE_INDEX==null||typeof(BALANCE_INDEX)=='undefined'){
	    	WL.Toast.show('平衡系数不能空');
	    	return isSus;
	   }
	 if(COUNTER_WEIGHT==''||COUNTER_WEIGHT==null||typeof(COUNTER_WEIGHT)=='undefined'){
	    	WL.Toast.show('对重块不能空');
	    	return isSus;
	   }
	 if(LB_MACHINE_FLAG==''||LB_MACHINE_FLAG==null||typeof(LB_MACHINE_FLAG)=='undefined'){
	    	WL.Toast.show('磅机不能空');
	    	return isSus;
	   }
	 if(FUCTION_TEST_FLAG___YYY==''||FUCTION_TEST_FLAG___YYY==null||typeof(FUCTION_TEST_FLAG___YYY)=='undefined'){
	    	WL.Toast.show('功能试验不能空');
	    	return isSus;
	   }
	 if(NEED_SECOND_TEST_WEIGHT==''||NEED_SECOND_TEST_WEIGHT==null||typeof(NEED_SECOND_TEST_WEIGHT)=='undefined'){
	    	WL.Toast.show('二次试重不能空');
	    	return isSus;
	   }
	 if(THREE_GUARANTEE_BAD==''||THREE_GUARANTEE_BAD==null||typeof(THREE_GUARANTEE_BAD)=='undefined'){
	    	WL.Toast.show('非标三包不良不能空');
	    	return isSus;
	   }
	 if(DEBUG_END_DATE==''||DEBUG_END_DATE==null||typeof(DEBUG_END_DATE)=='undefined'){
	    	WL.Toast.show('调试完成日期不能空');
	    	return isSus;
	   }
	 if(EBS_FULL_NAME==''||EBS_FULL_NAME==null||typeof(EBS_FULL_NAME)=='undefined'){
	    	WL.Toast.show('调试人员签名不能空');
	    	return isSus;
	   }	
	 //验证调试到达日期，慢车，快车到达日期是否符合要求
	 var arrivedate=Ext.Date.format(new Date(DEBUG_ARRIVE_DATE),'Y-m-d');
	 var slowTrandate=Ext.Date.format(new Date(SLOW_TRAIN_ENTER_DATE),'Y-m-d');
	 var fastTrandate=Ext.Date.format(new Date(FAST_TRAIN_ENTER_DATE),'Y-m-d');
	 var debug_end_date=Ext.Date.format(new Date(DEBUG_END_DATE),'Y-m-d');
	 
	 var a=comptime(arrivedate,slowTrandate);
	 var b=comptime(slowTrandate,fastTrandate);
	 var c=comptime(fastTrandate,debug_end_date);
	 if(a<0){
		 WL.Toast.show("慢车时间必须大于或等于调试到达日期");
		 return isSus;
	 }
	 if(b<0){
		 WL.Toast.show('快车时间必须大于或等于慢车时间');
		 return isSus;
	 }
	 if(c<0){
		 WL.Toast.show('调试完成时间必须大于或等于快车时间');
		 return isSus;
	 }
	
	 
	 }
	 return false;
},
//回滚功能
rollback:function(){
	 var obj=this;
	 var TASK_PROCESS_ID=Ext.getCmp('TASK_PROCESS_ID').getValue();
	 var TASK_ID=Ext.getCmp('TASK_ID').getValue();
	 var ORG_ID=Ext.getCmp('ORG_ID').getValue();
	 var SEQ_NUM=Ext.getCmp('TASK_SEQ_NUM').getValue();
	 var DEBUG_NUM=Ext.getCmp('TASK_DEBUG_NUM').getValue();
	 var CHECK_NUM=Ext.getCmp('CHECK_NUM').getValue();
	 var content='{"TASK_PROCESS_ID":"'+TASK_PROCESS_ID+'","TASK_ID":"'+TASK_ID+'","ORG_ID":"'+ORG_ID+'","SEQ_NUM":"'+SEQ_NUM+'","DEBUG_NUM":"'+DEBUG_NUM+'","CHECK_NUM":"'+CHECK_NUM+'","USERID":"'+userid+'","USER_NAME":"'+usernames+'",}';
	 var WL_task=WL.JSONStore.get(collectionName);
	 function getRes(res){
		if(res.msginfo=='提交成功'){
			WL.Toast.show("回滚成功");
			var _id=Ext.getCmp('task_id').getValue();
			var query={_id:parseInt(_id)};
			WL_task.find(query).then(function(res){
				if(typeof(res[0])=='undefined'){
					
				}else{
					var query1={_id:res[0]._id};
					WL_task.remove(query1).then(function(){
						//跳回第二list页面，刷新store。
						  var  ENGCONTRACT_NUMBER=Ext.getCmp('TASK_ENGCONTRACT_NUMBER').getValue();
					    var query={tcode:ebs_user_id+"_task",tid:JSON.stringify(ENGCONTRACT_NUMBER)};
					    WL_task.find(query).then(function(res){
					        var list=[];
					    	for(var i=0;i<res.length;i++){
					    		list[i]=res[i].json.stext;
					    		if(res[i].json.status=="1"){
					    			res[i].json.TIAO_SATRTUS=='已进入待提交队列';
					    		}else{
					    			var TIAO_SATRTUS=list[i].TIAO_SATRTUS;
						    		var DEBUG_RETURN_REASON1=list[i].DEBUG_RETURN_REASON;
						    		var DEBUG_RETURN_DATE1=list[i].DEBUG_RETURN_DATE;
						    		var DEBUG_ARRIVE_DATE=list[i].DEBUG_ARRIVE_DATE;
						    		var DEBUG_END_DATE=list[i].DEBUG_END_DATE; 
						    		if(TIAO_SATRTUS==''){
					        			 if(DEBUG_ARRIVE_DATE==''||DEBUG_ARRIVE_DATE==null||typeof(DEBUG_ARRIVE_DATE)=='undefined'){
					        				 list[i].TIAO_SATRTUS='调试未到达';
					        			 }else{
					        				 if(DEBUG_END_DATE==''||DEBUG_END_DATE==null||typeof(DEBUG_END_DATE)=='undefined'){
					        					 list[i].TIAO_SATRTUS='调试中';
					        				 }else{
					        					 list[i].TIAO_SATRTUS='已提交'; 
					        				 }
					        			 }
					    		}else if(TIAO_SATRTUS=='已进入待提交队列'){
					    			 if((DEBUG_RETURN_REASON1=='')&&(DEBUG_RETURN_DATE1=='')){
					    				 if(DEBUG_ARRIVE_DATE==''||DEBUG_ARRIVE_DATE==null||typeof(DEBUG_ARRIVE_DATE)=='undefined'){
					        				 list[i].TIAO_SATRTUS='调试未到达';
					        			 }else{
					        				 if(DEBUG_END_DATE==''||DEBUG_END_DATE==null||typeof(DEBUG_END_DATE)=='undefined'){
					        					 list[i].TIAO_SATRTUS='调试中';
					        				 }else{
					        					 list[i].TIAO_SATRTUS='已提交'; 
					        				 }
					        			 }
				        			 }else{
				        				 list[i].TIAO_SATRTUS='已退调';
				        			 }
					    		}else if(TIAO_SATRTUS=='调试未到达'){
					    		}else if(TIAO_SATRTUS=='调试中'){
					    		}else{
					    			 list[i].TIAO_SATRTUS='已退调';
					    		}
					    		}
					    		lists[i]=res[i];
					    	}
					    	var store1=obj.getStore("InstallatoinTasksShakedown_1Store","HelcPDA.store.install.installdebug.InstallatoinTasksShakedown_1Store");  
					    	store1.setData(list);
					    	//判定当前页面是否有数据，有就退，没有，继续退。
					    	if(res.length>0){
					    		 obj.BackView();
					    	}else{
					    		 obj.BackView();
					    	}
					      //刷新第一list页面
					    	var store=obj.getStore("InstallatoinTasksShakedownStore","HelcPDA.store.install.installdebug.InstallatoinTasksShakedownStore");
					        var query={tcode:'_task_list'+ebs_user_id,tid:'tiaoshi_task'};
					        var options={
					     		   exact:true
					        };       
					        WL_task.find(query,options).then(function(res){
					        	var list1=res[0].json.stext;
					        	if(res==''||res==null||typeof(res)=='undefined'){
							     }else{
							     		   if(list.length==0){
							     			   var length=list1.length;
							     			  for(var i=0;i<length;i++){
								     			   if(ENGCONTRACT_NUMBER==list1[i].ENGCONTRACT_NUMBER){
								     				     list1.splice(i,1);
								     				     break;
								     			   }
								     		   }
							     			  res[0].json.stext=list1;
							     			  var query={_id:res[0]._id,json:res[0].json};
							     			   WL_task.refresh(query).then(function(){
							     			      var NUM=0;
							     			      var length=list1.length;
									     		   for(var i=0;i<length;i++){
									     			   NUM+=list1[i].NUM;
									     		   }
							     			    Ext.getCmp('label_ForTai').setHtml("总台数("+(NUM)+")");
							     			    store.setData(list1);
							     			   }).fail(function(){});
							     			   
							     		   }else{
									     		   store.setData(res[0].json.stext);
									     		   var temp= Ext.getCmp('label_ForTai').getHtml();
									     		   var value = temp.replace(/[^0-9]/ig,""); 
									     		   Ext.getCmp('label_ForTai').setHtml("总台数("+(parseInt(value)-1)+")");
							     		   }
							     		   
							     	   }
					        	
					     	   
					        }).fail(function(){
					     	   WL.Toast.show('查找缓存数据失败');
					        });
					    	
					    
					    }).fail(function(err){
					    	WL.Toast.show("查找缓存失败");
					    });
					}).fail(function(){});
				}
			}).fail(function(){});
		}else{
			WL.Toast.show("回滚失败");
		} 
	 }
	 navigator.notification.confirm('确认要回滚吗？回滚后,系统将退回监理环节,请通知监理重新填写报调日期.',function(btn){
			if(btn ==2){
				obj.connectServer(getRes,'tiaoshi2Action.do?method=rollback_data',content);
			}else{
				return;
			}
		},"提示","取消,确定");
	
//	Ext.Msg.confirm('你好','确认要回滚吗？',function(btn){
//	if (btn == 'yes'){
//		 obj.connectServer(getRes,'tiaoshi2Action.do?method=rollback_data',content);
//	}else{
//		return;
//	}
//});
	
},
load1:function(content1){
//	Ext.Viewport.setActiveItem(Ext.getCmp('installationTasksShakedownPanel1'));
//	var colorList=document.getElementsByName("TIAO_SATRTUS_COLOR");
//	var length=colorList.length;
//	for(var i=0;i<length;i++){
//		if(colorList[i].innerHTML=='已退调'){
//			colorList[i].className="p_submit_yes";
//		}else{
//			colorList[i].className="p_submit_no";
//		}
//	}
	    var _id=parseInt(Ext.getCmp('task_id').getValue());
		var ELEVATOR_NO=Ext.getCmp('TASK_ELEVATOR_NO').getValue();
		var query={_id:_id};
		var WL_task=WL.JSONStore.get(collectionName);
		
		WL_task.find({tid:ELEVATOR_NO+"_Submit",tcode:'UNCOMMIT_TSRW'}).then(function(res){
			if(res.length>0){
				if(res[0].json.status=='1'){
					WL.Toast.show('数据已进入待提交队列，请勿反复提交');
				}
				else{
					WL_task.find(query).then(function(rest){
		    			var ext1={};
		    			var tempExt={};
		    			ext1.url='tiaoshi2Action.do?method=toAdd_tiaoshi';
		    			tempExt.msg_title='调试任务';
		    			tempExt.msg_body=ELEVATOR_NO;
		    			tempExt.msg_result='';//'正在等待提交';
		    			ext1.obj=rest[0];
		    			ext1.msg=tempExt;
		    			ext1.view_id='HelcPDA.controller.install.installdebug.InstallationTasksShakedownCtrl';
		    			ext1.cparam = {_id:_id};
		    			query1={tid:ELEVATOR_NO+"_Submit",tcode:'UNCOMMIT_TSRW',stext:content1,ext1:ext1,status:'1'};
		    			WL_task.add(query1).then(function(){
		    				WL.Toast.show('已进入数据提交队列');
		    			}).fail(function(){});
		    				
		    		}).fail(function(){});
				}
			}else{
	    		WL_task.find(query).then(function(rest){
	    			var ext1={};
	    			var tempExt={};
	    			ext1.url='tiaoshi2Action.do?method=toAdd_tiaoshi';
	    			tempExt.msg_title='调试任务';
	    			tempExt.msg_body=ELEVATOR_NO;
	    			tempExt.msg_result='';//'正在等待提交';
	    			ext1.obj=rest[0];
	    			ext1.msg=tempExt;
	    			ext1.view_id='HelcPDA.controller.install.installdebug.InstallationTasksShakedownCtrl';
	    			ext1.cparam = {_id:_id};
	    			query1={tid:ELEVATOR_NO+"_Submit",tcode:'UNCOMMIT_TSRW',stext:content1,ext1:ext1,status:'1'};
	    			WL_task.add(query1).then(function(){
	    				WL.Toast.show('已进入数据提交队列');
	    			}).fail(function(){});
	    		}).fail(function(){});
			}
		}).fail(function(){});
				
   }
,//刷新list的方法
LoadGHlist:function(object){
	var obj=this;
    var _id=object._id;
	WL_task=WL.JSONStore.get(collectionName);	
	var query={_id:_id};
	WL_task.find(query).then(function(res){
		console.log("res:"+JSON.stringify(res));
    	//WL.toast.show("保存数据成功");
    	//数据保存成功以后重置list页面数据，
		var ENGCONTRACT_NUMBER=res[0].json.stext.ENGCONTRACT_NUMBER;
		var ENLEVETOR_NUM=Ext.getCmp('ENLEVETOR_NUM');
		var store1=obj.getStore('InstallatoinTasksShakedown_1Store','HelcPDA.store.install.installdebug.InstallatoinTasksShakedown_1Store');
        	 var query={tcode:ebs_user_id+"_task",tid:JSON.stringify(ENGCONTRACT_NUMBER)};
        	    WL_task.find(query).then(function(res){
        	        var list=[];
        	        for(var i=0;i<res.length;i++){
        	    		list[i]=res[i].json.stext;
        	    		if(res[i].json.status=="1"){
        	    			list[i].TIAO_SATRTUS=='已进入待提交队列';
        	    		}else{
        	    			var TIAO_SATRTUS=list[i].TIAO_SATRTUS;
        		    		var DEBUG_RETURN_REASON1=list[i].DEBUG_RETURN_REASON;
        		    		var DEBUG_RETURN_DATE1=list[i].DEBUG_RETURN_DATE;
        		    		var DEBUG_ARRIVE_DATE=list[i].DEBUG_ARRIVE_DATE;
        		    		var DEBUG_END_DATE=list[i].DEBUG_END_DATE; 
        		    		if(TIAO_SATRTUS==''){
			        			 if(DEBUG_ARRIVE_DATE==''||DEBUG_ARRIVE_DATE==null||typeof(DEBUG_ARRIVE_DATE)=='undefined'){
			        				 list[i].TIAO_SATRTUS='调试未到达';
			        			 }else{
			        				 if(DEBUG_END_DATE==''||DEBUG_END_DATE==null||typeof(DEBUG_END_DATE)=='undefined'){
			        					 list[i].TIAO_SATRTUS='调试中';
			        				 }else{
			        					 list[i].TIAO_SATRTUS='已提交'; 
			        				 }
			        			 }
			    		}else if(TIAO_SATRTUS=='已进入待提交队列'){
			    			 if((DEBUG_RETURN_REASON1=='')&&(DEBUG_RETURN_DATE1=='')){
			    				 if(DEBUG_ARRIVE_DATE==''||DEBUG_ARRIVE_DATE==null||typeof(DEBUG_ARRIVE_DATE)=='undefined'){
			        				 list[i].TIAO_SATRTUS='调试未到达';
			        			 }else{
			        				 if(DEBUG_END_DATE==''||DEBUG_END_DATE==null||typeof(DEBUG_END_DATE)=='undefined'){
			        					 list[i].TIAO_SATRTUS='调试中';
			        				 }else{
			        					 list[i].TIAO_SATRTUS='已提交'; 
			        				 }
			        			 }
		        			 }else{
		        				 list[i].TIAO_SATRTUS='已退调';
		        			 }
			    		}else if(TIAO_SATRTUS=='调试未到达'){
			    		}else if(TIAO_SATRTUS=='调试中'){
			    		}else{
			    			 list[i].TIAO_SATRTUS='已退调';
			    		}
        	    		}
        	    	}
        	    	if(typeof(ENLEVETOR_NUM)!='undefined'){
        				ENLEVETOR_NUM=ENLEVETOR_NUM.getValue();
        				var templist=[];
                	    var length=list.length;
            	    	for(var i=0;i<length;i++){
            	    		if(ENLEVETOR_NUM==list[i].ELEVATOR_NO){
                	    		templist[0]=list[i];
                	    	}	
            	    	}
            	    	list=templist;
        			}
        	    	store1.setData(list);
        	    }).fail(function(err){
        	    	WL.Toast.show("查找缓存失败");
        	    });
        	
		
		
		
		//}).fail(function(){});
    		
    			
    		
		
	}).fail(function(err){
	});	
}
});
//清理退调的方法
function doClearTT(){
	Ext.getCmp('TASK_DEBUG_RETURN_DATE1').setValue('');
	Ext.getCmp('TASK_DEBUG_RETURN_REASON1').setValue('');
	Ext.getCmp('TASK_DEBUG_FORFEIT_AMT1').setValue('');
	Ext.getCmp('TASK_DEBUG_FORFEIT_DATE1').setValue('');
	Ext.getCmp('TASK_NOT_ACHIEVE_STANDARD').setValue(0);
}
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

function findEach(sFind,vData)   
{   
        var nPos;   
       var vResult = [];   
            
        for(var i in vData){   
            var sTxt=vData[i]||'';  
            nPos = find(sFind, sTxt);   
            //nPos=sTxt.indexOf(sFind);   
            if(nPos>=0){   
                vResult[vResult.length] = sTxt;   
            }   
        }   
    
        return vResult;   
}   
function find(sFind, sObj)   
{   
    var nSize = sFind.length;   
    var nLen = sObj.length;    
    var sCompare;   
    
    if(nSize <= nLen ){   
        for(var i = 0; i <= nLen - nSize + 1; i++){   
            sCompare = sObj.substring(i, i + nSize);   
            if(sCompare == sFind){   
                return i;   
            }   
        }   
    }   
    return -1;   
} 

function Serach_NUM(){  
	 var obj=this;
	 var store1=obj.getStore("InstallatoinTasksShakedown_1Store","HelcPDA.store.install.installdebug.InstallatoinTasksShakedown_1Store");
      var ELEVATOR_NO=Ext.getCmp('ELEVATOR_NO_Text').getValue();		
       if(lists==''||lists==null||typeof(lists)=='undefined'){	
           WL.Toast.show("请先选择主页的信息");
           return;
        }
       if(ELEVATOR_NO==''||ELEVATOR_NO==null||typeof(ELEVATOR_NO)=='undefined'){	
    	   var list2=[];
    	   for(var i=0;i<lists.length;i++){
    		   list2[i]=lists[i].json.stext;
    	   }
    	   store1.setData(list2);
           return;
        }
       var list=[];
       for(var i=0;i<lists.length;i++){
         list[i]=lists[i].json.stext.ELEVATOR_NO;	   
       }
       var vResult=findEach(ELEVATOR_NO,list);
       var list1=[];
        for(var i=0;i<vResult.length;i++){
        	for(var j=0;j<lists.length;j++){
        		if(vResult[i]==lists[j].json.stext.ELEVATOR_NO){
        			list1[i]=lists[j].json.stext;
        		}
        	}
        }
    	  
    	if(vResult.length>0){
    		store1.setData(list1);
    	}
    	}

function comptime(beginTime,endTime) {
    var beginTimes = beginTime.substring(0, 10).split('-');
    var endTimes = endTime.substring(0, 10).split('-');

    beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);

    var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
    if (a < 0) {
        return a;
    } else if (a > 0) {
        return a;
    } else if (a == 0) {
        return a;
    } else {
        return 'exception';
    }
}


