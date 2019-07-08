
/* JavaScript content from app/controller/install/installcheck/InstallatoinTasksFactoryPanelCtrl.js in folder common */
Ext.define('HelcPDA.controller.install.installcheck.InstallatoinTasksFactoryPanelCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
		},
		control:{
			//返回合同层
			"button#back_to_check":{
				tap:'back_to_check'
			},
			//进入厂检页面
			"button#buttonInstall":{
				tap:'buttonInstall'
			},
			//返回到安装项目
			"button#back_to_install":{
				tap:'back_to_install'
			},
			//返回主页
			"button#back_Menu":{
				tap:'back_Menu'
			},
			//返回到厂检首页
			"button#back_to_ITf_List":{
				tap:'back_to_ITf_List'
			},
			//进入同步页面
			"button#ic_UPDATE_Install":{
				tap:'ic_UPDATE_Install'
			},
			//进入查询页面
			"button#ic_SEARCH_Install":{
				tap:'ic_SEARCH_Install'
			},
			//同步
			"button#itf_getdata_btn":{
				tap:'itf_getdata_btn'
			},
			//查询
			"button#ITF_searchdata_btn":{
				tap:'ITF_searchdata_btn'
			},
			//在工号层跳转到待提交数据
			"button#GoToWaittingData":{
				tap:'GoToWaittingData'
			},
			//点击合同,进入工号层
			"list#installList":{
				itemtap:'installList'
			},
		},
	},
	
	GoToWaittingData : function(){
		this.NextView('wfc_list_view','HelcPDA.view.waitingdata.WaitingForCommitData_List_V');
	},
	
	ic_SEARCH_Install : function(){
		this.NextView('ITF_search_vid','HelcPDA.view.install.installcheck.InstallatoinTasksFactory_Search_V');
	},
	
	back_to_ITf_List : function(){
		this.showBackView("installatoinTasksFactoryPanel","HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel");
	},
	
	ic_UPDATE_Install : function(){
		this.NextView('ITF_sel_vid','HelcPDA.view.install.installcheck.InstallatoinTasksFactory_Selection_V');
	},

	back_to_install : function(){
		this.showBackView("installProject_id","HelcPDA.view.install.installProject");
		GJYLlist = [];
		obj_cj = null;
	},
	
	back_Menu : function(){
		this.showBackView("MenusView_id","HelcPDA.view.MenusView");
	},
	
	 //回到第一个list
	 back_to_check : function(){
		 this.showBackView('installatoinTasksFactoryPanel','HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel');
		 var TasksFactoryStore = this.getStore('TasksFactoryStore','HelcPDA.store.install.installcheck.TasksFactoryStore');
		 TasksFactoryStore.setData([]);
	 },
	//进入第二个list
	installList : function(obj,index,target,record,e,eOpts){
		myLoading.show();
		var obj = this;
		var store = obj.getStore("InstallatoinTasksFactoryStore","HelcPDA.store.install.installcheck.InstallatoinTasksFactoryStore");
		var ENGCONTRACT_NUMBER=store.getAt(index).get('ENGCONTRACT_NUMBER');
		obj.LoadGHlist(ENGCONTRACT_NUMBER);
		obj.NextView('installatoinTasksFactoryPanel1','HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel1');
	},
	 
	
	LoadGHlist : function(ENGCONTRACT_NUMBER){
		var obj = this;
		var WL_check=WL.JSONStore.get(collectionName);
		var query={tcode:ebs_user_id+"_check",tid:ENGCONTRACT_NUMBER};
		var options={
	    		   exact:false,
	       }; 
		WL_check.find(query,options).then(function(res){
			var data =[];
			for(var i=0;i<res.length;i++){
				data[i]=res[i].json.stext;
				if(res[i].json.status == 1){
					data[i].CHANG_SATRTUS = "已进入待提交队列";
				}else {
					if(res[i].json.stext.CHECK_ARRIVE_DATE == ""){
						data[i].CHANG_SATRTUS = "厂检未到达";
					}else if(res[i].json.stext.CHECK_DATE != "" && res[i].json.stext.CHECK_RETURN_DATE != "" && res[i].json.stext.CHECK_RETURN_DATE != null){
						data[i].CHANG_SATRTUS = '已退检';
					}else if(res[i].json.stext.CHECK_ARRIVE_DATE != "" && res[i].json.stext.CHECK_RETURN_DATE == ""){
						data[i].CHANG_SATRTUS = "检验中";
					}else if(res[i].json.stext.CHECK_ARRIVE_DATE != "" && res[i].json.stext.CHECK_RETURN_DATE == null){
						data[i].CHANG_SATRTUS = "检验中";
					}
				}
				
			}
			
			var FactoryStore = obj.getStore("TasksFactoryStore","HelcPDA.store.install.installcheck.TasksFactoryStore");
			
			var search_data = [];
			var search_GH = '';
			if(typeof(Ext.getCmp('itf_ENTRANCE_ENTER_search'))!='undefined'){
				search_GH = Ext.getCmp('itf_ENTRANCE_ENTER_search').getValue();
			}
			
			if(search_GH != ""){
				for(var i =0;i<data.length;i++){
					if(data[i].ELEVATOR_NO==search_GH){
						search_data[0]=data[i];
					}
				};
				FactoryStore.setData(search_data);
			}else{
				var softdatas = obj.GHsoft(data);
				FactoryStore.setData(softdatas);
			}
			
			myLoading.hide();
		});
		
	},
	
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
	
	buttonInstall: function() {
		var obj=this;
		var installatoinTasksFactoryPanel=Ext.getCmp('installatoinTasksFactoryPanel');
		   if(installatoinTasksFactoryPanel){
			   installatoinTasksFactoryPanel.destroy();
		   }
	    Ext.Viewport.setActiveItem(Ext.create('HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel'));
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
	    	   if(res==''||res==null||typeof(res)=='undefined'){
	    	   }else{
	    		   store.setData(res[0].json.stext);
	    		   var NUM=0;
	    		   var list=res[0].json.stext;
	    		   for(var i=0;i<list.length;i++){
	    			   NUM+=list[i].NUM;
	    		   }
	    		   Ext.getCmp('Ecount').setHtml("总台数("+NUM+")");
	    	   }
	       }).fail(function(){
	    	   Ext.Msg.alert('查找缓存数据失败');
	       }); 
	    
	       WL.Toast.show('如需更新数据，请点击更新数据按钮在服务器获取！');
	},
	
	
	//查询数据
	ITF_searchdata_btn : function(){
		var store=this.getStore('InstallatoinTasksFactoryStore','HelcPDA.store.install.installcheck.InstallatoinTasksFactoryStore');
		store.setData([]);
		Ext.getCmp('Ecount').setHtml("总台数()");
		var ENGCONTRACT_NUMBER = Ext.getCmp('itf_con_s').getValue();
		var ELEVATOR_NO = Ext.getCmp('itf_eno_s').getValue();
		this.showBackView('installatoinTasksFactoryPanel','HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel');
		var query={tcode:ebs_user_id+"_check"};
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
			  	CNTER_NEED.NUM=cs;
			  	NEW_NEED_LIST[i]=CNTER_NEED;
			}
			Ext.getCmp('Ecount').setHtml("总台数("+ELEVATOR_NO_LIST.length+")");
			store.setData(NEW_NEED_LIST);
			Ext.getCmp('itf_ENTRANCE_ENTER_search').setValue(ELEVATOR_NO_LIST[0]);
		});
	},
	
	
	itf_getdata_btn : function(){
			 var store=this.getStore('InstallatoinTasksFactoryStore','HelcPDA.store.install.installcheck.InstallatoinTasksFactoryStore');
			 store.setData([]);
			 Ext.getCmp('Ecount').setHtml("总台数()");
			 var ENGCONTRACT_NUMBER = Ext.getCmp('itf_con').getValue();
			 var ELEVATOR_NO = Ext.getCmp('itf_eno').getValue();
			 this.showBackView('installatoinTasksFactoryPanel','HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel');
	  		 var obj=this;
			 var getResult=function(res){
				  var list=res.rows;
				  var WL_check=WL.JSONStore.get(collectionName);
				  var store=obj.getStore("InstallatoinTasksFactoryStore","HelcPDA.store.install.installcheck.InstallatoinTasksFactoryStore");
				  Ext.getCmp('Ecount').setHtml("总台数("+list.length+")");
				  
				  //当用户点击更新的时候，要清除掉当前缓存的数据，重新赋值
				  var query={tcode:ebs_user_id+"_check"};
				  WL_check.remove(query).then(function(){
					//循环添加每一条到JSONStore
					  var ndata=[];
					  for(var i=0;i<list.length;i++){
						    if(list[i].CHECK_DATE != "" && list[i].CHECK_RETURN_DATE != "" && list[i].CHECK_RETURN_DATE != null){
								list[i].CHANG_SATRTUS = '已退检';
							}else if(list[i].CHECK_ARRIVE_DATE != "" && list[i].CHECK_RETURN_DATE == ""){
								list[i].CHANG_SATRTUS = "检验中";
							}else if(list[i].CHECK_ARRIVE_DATE != "" && list[i].CHECK_RETURN_DATE == null){
								list[i].CHANG_SATRTUS = "检验中";
							}else if(list[i].CHECK_ARRIVE_DATE == ""){
								list[i].CHANG_SATRTUS = "厂检未到达";
							}
						 var query={tid:list[i].ENGCONTRACT_NUMBER+list[i].ELEVATOR_NO+list[i].SEQ_NUM,tcode:ebs_user_id+"_check",stext:list[i]};
					       ndata[i]=query;
					  } 
					  if(ndata.length==0){
						  WL.Toast.show("找不到对应数据");
					  }else{
						  WL_check.add(ndata).then(function(){
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
							  
							  var query={tcode:ebs_user_id+'_check_list',tid:'changjian_check_list'};
							  var options={exact:true};
							  WL_check.remove(query,options).then(function(){
								  //保存第一张list界面生成的数据放在本地，离线时使用
								  var query={tid:'changjian_check_list',tcode:ebs_user_id+'_check_list',stext:NEW_NEED_LIST};
								  WL_check.add(query).then(function(){
								  }).fail(function(err){
									  Ext.Msg.alert("第一张list添加失败");
								  });
							  }).fail(function(){
								  Ext.Msg.alert("删除list列表失败");
							  });
						  }).fail(function(err){
							  Ext.Msg.alert("缓存失败");
						  });
					  }
				  }).fail(function(err){Ext.Msg.alert("初始化删除失败");});
				  
			 };
			 var contentdata={userid:ebs_user_id,init_person_id:init_person_id,CONTRACT_NO:ENGCONTRACT_NUMBER,ELEVATOR_NO:ELEVATOR_NO,version
:"PDA3"};
			 var content = JSON.stringify(contentdata);
			 this.connectServer(getResult, 'changjian2Action.do?method=toSearch', content);
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