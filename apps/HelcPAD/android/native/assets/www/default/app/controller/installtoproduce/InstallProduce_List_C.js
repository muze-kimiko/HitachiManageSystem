
/* JavaScript content from app/controller/installtoproduce/InstallProduce_List_C.js in folder common */
Ext.define('HelcPAD.controller.installtoproduce.InstallProduce_List_C',{
	extend:'HelcPAD.controller.ApplicationController',
	id:'InstallProduce_List_C_id',
config:{

		control:{
			/************************************************************************************
			 * 排产 查询页面
			 * */
			
			//搜索按钮
			"button#searchId":{
				tap:'init2'
			},

			//返回按钮
			'button#InstallProduce_Query_FH_BUTTON':{
				tap:'InstallProduce_Query_FH_BUTTON'
			},
			
			/**
			 ** 排产 查询页面
			 ************************************************************************************/
			
			
			
			/************************************************************************************
			 * 排产页面
			 * */
			
			//进入对应的排产信息
			"list#List_VID":{
				itemtap:'init3'
			},
			
			//进入查询页面
			'button#searchId_old':{
				tap:'searchId_old'
			},
			
			//返回安装项目页面
			'button#InstallProduce_List_VID_FH_BUTTON':{
				tap:'InstallProduce_List_VID_FH_BUTTON'
			},
			
			/**
			 ** 排产页面
			 ************************************************************************************/
			
		}
},


		/************************************************************************************
		 * 排产页面
		 * */
		
		//进入对应的排产信息
		init3:function(obj, index, target, record, e, eOpts){
			//进入排产列表
			this.NextView('InstallProduce_EnoList_VID','HelcPAD.view..installtoproduce.InstallProduce_EnoList_V');
			
			var store=Ext.data.StoreManager.get("installtaskStore2");
			if(!store){
					store=Ext.create("HelcPAD.store.installtoproduce.installtaskStore2");
			};
			// Ext.Msg.alert(store.getAt(index).get('ENGCONTRACT_NUMBER'));
			var CONTRACT_NO=store.getAt(index).get('CONTRACT_NO');
			var hiddenObj=Ext.getCmp('HiddenID');
			hiddenObj.setValue(CONTRACT_NO);
			
			
			var coll=WL.JSONStore.get(collectionName);
		  	var options={};
		  	var tcodeId='ConfirmedScheduling';
		  	var data={tcode:tcodeId};
		  	
		  	coll.find(data,options).then(function(arrayResults){
			  	console.log(arrayResults);
			    var list=[];
			  	var list2=[];
			  	var k=0;
			  	for(var i=0;i<arrayResults.length;i++){
			  		  list[i]=arrayResults[i].json;
			  	 };
			  	 //alert(list[0].stext.ENGCONTRACT_NUMBER);
			  	 console.log(list[0]);
			  	 for(var j=0;j<list.length;j++){
			  		if(list[j].stext.CONTRACT_NO==CONTRACT_NO){
			  			if(list[j].stext.QRPC_STATUS=='未提交'){
			  					 list2[k++]=list[j].stext;
			  			};
			  		 };
			  	  };
			  	  
			  	  console.log(list2.length);
			  	  console.log(list2[0]);
			  		
			  	  var store=Ext.data.StoreManager.get("InstallProduce_List_S");
				  if(!store){
						store=Ext.create("HelcPDA.store.install.installprocess.InstallProduce_List_S");
				  };
				  store.setData(list2,this);
				  
		  	  }).fail(function(err){
		  		WL.Toast.show("查找失败！");
		  		  //Ext.Msg.alert("查找失败");
		  	  });	
		},

		//进入查询页面              OK
		searchId_old:function(){
			this.NextView('InstallProduce_Query_id','HelcPAD.view.installtoproduce.InstallProduce_Query_V');
		},
		
		//返回安装项目页面        OK
		InstallProduce_List_VID_FH_BUTTON:function(){
			//清空数据仓
			var store=Ext.data.StoreManager.get("installtaskStore2");
			if(!store){
				store=Ext.create("HelcPAD.store.installtoproduce.installtaskStore2");
			};
			store.setData([],this);
			
			this.BackView();
		},
		/**
		 ** 排产页面
		 ************************************************************************************/


		
		/************************************************************************************
		 * 排产 查询页面
		 * */

		//注:排产状态是自己添加上的。完成的排产是查找不出来的。
		//搜索按钮
		init2:function(){
			
			//alert('进入提交页面');
			var obj=this;
			//获取输入的合同号 ''
			var CONTRACT_NOOBJ=Ext.getCmp('SInstallationContractNo_id2').getValue();
			//工号
			var ELEVATOR_NO=Ext.getCmp('SInstallationContractNo_id3').getValue();
			//跳回排产查询页面
			obj.showBackView("InstallProduce_List_VID","HelcPDA.view.install.installtoproduce.InstallProduce_List_V");
			
			
			//删除JSON中的数据
			var tcodeId='ConfirmedScheduling';
			var query={tcode:tcodeId};
			var options={};
			var coll=WL.JSONStore.get(collectionName);
			
		/*	//添加一个离线功能
			coll.find(query,options).then(function(arrayResults){
				var arrNum=arrayResults.length;
				 if(arrNum==0){
					 
				 }
			 }).fail(function(err){
				 WL.Toast.show("离线获取数据失败！");
				 Ext.Msg.alert("离线获取失败");
			 });	*/
			
			
			coll.remove(query).then(function(){
				//获取远程数据
				getResult=function(res){
					console.log(JSON.stringify(res));
					var resID=res.item.length;
					if(resID==0){
						return;
					};
					//装载排产集合
					var list=[];
					for(var i=0;i<resID;i++){
						list[i]=res.item[i];
						console.log(i+'      '+JSON.stringify(list[i]));
					};
					//装载合同号的集合
					var ENGCONTRACT_NUMBER_LIST=[];
					//装载地址的集合
					var CUSTOMER_NAME_LIST=[];
					//获取
					for(var i=0;i<list.length;i++){
						  ENGCONTRACT_NUMBER_LIST[i]=list[i].CONTRACT_NO;
						  CUSTOMER_NAME_LIST[i]=list[i].CUSTOMER_NAME;
					 };
					 //获取集合中格的唯一数
					 var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
					 console.log(JSON.stringify('合同号    '+UNIQ_ENGCONTRACT_NUMBER_LIST));
					 var UNIQ_CUSTOMER_NAME=CUSTOMER_NAME_LIST.unique3();
					 console.log(JSON.stringify('地址  '+UNIQ_CUSTOMER_NAME));
					 //计算相同的合同号数量
					 var NUM=[];
					 for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
						  NUM[i]=0;
						  for(var j=0;j<list.length;j++){
							  if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==list[j].CONTRACT_NO){
								  NUM[i]++;
							  };
						   };
					  };
					  //为数据仓添加显示数据
					  var NEW_NEED_LIST=[];
					  for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
						  var CNTER_NEED={};
						  CNTER_NEED.CONTRACT_NO=UNIQ_ENGCONTRACT_NUMBER_LIST[i];
						  CNTER_NEED.CUSTOMER_NAME=UNIQ_CUSTOMER_NAME[i];
						  CNTER_NEED.NUM=NUM[i];
						  NEW_NEED_LIST[i]=CNTER_NEED;
					  };
					  store=Ext.data.StoreManager.get("installtaskStore2");
					  if(!store){
						store=Ext.create("HelcPDA.store.install.installtask.installtaskStore2");
					  };
					  store.setData([],this);
					  store.setData(NEW_NEED_LIST,this);
					  //在JSON中添加数据
					  var ndata=[];
					  for(var i=0;i<list.length;i++){
						 list[i].QRPC_STATUS = '未提交';
						 var query={tid:list[i].CONTRACT_NO+'_'+list[i].ELEVATOR_NO,tcode:tcodeId,stext:list[i]};
					     ndata[i]=query;
					  };
					  coll.add(ndata).then(function(){
						 // Ext.Msg.alert("添加成功");
					  }).fail(function(err){
						  WL.Toast.show("缓存失败！");
						  //Ext.Msg.alert("缓存失败");
					  });
				};
				var content="{'CONTRACT_NO':'"+CONTRACT_NOOBJ+"','ELEVATOR_NO':'"+ELEVATOR_NO+"','userid':'"+userid+"','init_person_id':'"+init_person_id+"','ebs_user_id':'"+ebs_user_id+"','person_id':'"+person_id+"','person_id':'"+person_id+"','username':'"+username+"'}";
				
				console.log(JSON.stringify(content));
				obj.connectServer(getResult,'installQRPCAction.do?method=toSearch',content);
				
			 }).fail(function(err){
				 WL.Toast.show("初始化删除失败！");
				 //Ext.Msg.alert("初始化删除失败");
			 });	
			
		},

		//返回
		InstallProduce_Query_FH_BUTTON:function(){
			this.showBackView('InstallProduce_List_VID','HelcPDA.view.install.installtoproduce.InstallProduce_List_V');
		},
		
		/**
		 ** 排产 查询页面
		 ************************************************************************************/

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
