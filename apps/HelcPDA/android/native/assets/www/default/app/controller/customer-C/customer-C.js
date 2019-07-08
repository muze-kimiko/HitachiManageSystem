
/* JavaScript content from app/controller/customer-C/customer-C.js in folder common */
Ext.define('HelcPDA.controller.customer-C.customer-C',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'customer-CID',
	config:{
		control:{
			/************************************************************************************
			 * 客户信息 查询页面
			 * */
			//查询按钮
			"button#searCHID":{
				tap:'init2'
			},

			//返回有公共的方法，来自合同模块
			/**
			 **客户信息 查询页面
			 ************************************************************************************/
			
			
			/************************************************************************************
			 * 客户查询-列表 页面
			 * */
			//返回按钮
			'button#customerList-VID_FH_BUTTON':{
				tap:'customerList_VID_FH_BUTTON'
			},

			//客户查询-列表 详细信息
			"list#customerlist":{
				itemtap:'init3'
			},
			/**
			 **客户查询-列表 页面
			 ************************************************************************************/
			
			
			/************************************************************************************
			 * 客户详细信息 页面
			 * */
			
			//返回按钮
			'button#customerInformation_id_FH_BUTTON':{
				tap:'customerInformation_id_FH_BUTTON'
			},

			/**
			 **客户详细信息 页面
			 ************************************************************************************/
			
			//首页下面导航条的 查询模块 进入客户查询的方法
			/*"list#informationList_id":{
				itemtap:'init1'
			},*/


		},	
	},
	
	/************************************************************************************
	 * 客户信息 查询页面
	 * */
	
	//查询方法
	init2:function(){
		this_obj=this;
		var obj=Ext.getCmp('CustomerID');
		var name=obj.getValue();
		var iswhere="WHERE ACCNT_NAME LIKE '%"+ name +"%'";
		var getResult=function(res){
			//跳转
			this_obj.NextView('customerList-VID','HelcPDA.view.customer.customerList');
			
			//console.log(res.length);
			//console.log(res);
			var list=[];
			//alert(res.rows.length);
			if(res.rows.length==0){
				WL.Toast.show('用户不存在!');
			}else{
				for(var i=0;i<res.rows.length;i++){
						list[i]=res.rows[i];
						res[i]=res.rows[i];
					//	console.log(res.rows[i].ASSET_NUM+'/'+res.rows[i].DOMAIN_ID);
				};
				//	console.log(res.rows[0].DOMAIN_ID);
				var store=Ext.data.StoreManager.get("historyFaultS");
				if(!store){
						store=Ext.create("HelcPDA.store.historyFaultM.historyFaultS");
				};
				store.setData(list,this);
				//console.log(list);
				//console.log(list.length);
				var tcodeId='customerinformat';
	 			var data={tcode:tcodeId};
	 			var options={};
	 			//console.log(tcodeId);
	 			var coll=WL.JSONStore.get(collectionName);
	 			coll.remove(data).then(function(){
	 				//循环添加每一条到JSONStore
	 				var ndata=[];
	 				for(var i=0;i<list.length;i++){
	 					var query={tid:list[i].ACCOUNT_ID,tcode:tcodeId,stext:list[i]};
	 					ndata[i]=query;
	 				};
	 				coll.add(ndata).then(function(){
	 					coll.find(data,options).then(function(result){
	 						//console.log(result.length);
	 						//console.log(result);
	 					}).fail(function(err){
	 						console.log(err);
	 					});
	 				}).fail(function(err){
	 					// Ext.Msg.alert("缓存失败");
	 					WL.Toast.show('增加失败!');
	 				});
	 			}).fail(function(err){
	 				//Ext.Msg.alert("初始化删除失败");
	 				WL.Toast.show('删除失败!');
	 			});	
			};
		};
		var content="{'userid':'"+userid+"','count':'','tcode':'','iswhere':"+iswhere+"}";
		this_obj.connectServer(getResult,'customerAction.do?method=toSearch',content);
	},

	/**
	 **客户信息 查询页面
	 ************************************************************************************/
	
	
	/************************************************************************************
	 * 客户查询-列表 页面
	 * */
	
	//返回按钮
	customerList_VID_FH_BUTTON:function(){
		this.showBackView('customer-vid','HelcPDA.view.customer.customer-v');
	},
	
	//客户查询-列表 详细信息
	init3:function(obk, index, target, record, e, eOpts ){
		//跳转
		this.NextView('customerInformation_id','HelcPDA.view.customer.customerInformation');

		var store=Ext.data.StoreManager.get("historyFaultS");
		if(!store){
			store=Ext.create("HelcPDA.store.historyFaultM.historyFaultS");
		};
		var ACCNT_NAME=store.getAt(index).get('ACCNT_NAME');
		//console.log(ACCNT_NAME);
		var tcodeId='customerinformat';
		var data={tcode:tcodeId};
		var options={};
		var coll=WL.JSONStore.get(collectionName);
		coll.find(data,options).then(function(res){
			//console.log(res);
			//console.log(res.length);
			var list=[];
			for(var i=0;i<res.length;i++){
				list[i]=res[i].json.stext;
			};
			//console.log(list);
			//console.log(list.length);
			var list2=[];
			var k=0;
		   for(var i=0;i<list.length;i++){
			   if(list[i].ACCNT_NAME==ACCNT_NAME){
				   list2[k++]=list[i];
			   };
		   };
		   //console.log(list2);
		   //console.log(list2.length);
		   var obj1=Ext.getCmp('ACCNT_ATTR');
		   obj1.setValue(list2[0].ACCNT_ATTR);
		   var obj2=Ext.getCmp('ACCNT_CODE');
		   obj2.setValue(list2[0].ACCNT_CODE);
		   var obj3=Ext.getCmp('ACCNT_TYPE');
		   obj3.setValue(list2[0].ACCNT_TYPE);
		   var obj4=Ext.getCmp('COMPANY_ID');
		   obj4.setValue(list2[0].COMPANY_ID);
		   var obj5=Ext.getCmp('STATUS');
		   obj5.setValue(list2[0].STATUS);
		   var obj6=Ext.getCmp('MAIN_PHONE_NUM');
		   obj6.setValue(list2[0].MAIN_PHONE_NUM);
		}).fail(function(err){
			//Ext.Msg.alert("查找失败");
			WL.Toast.show('数据获取失败');
		});
	},
	
	/**
	 **客户查询-列表 页面
	 ************************************************************************************/
	
	
	/************************************************************************************
	 * 客户详细信息 页面
	 * */
	//返回按钮
	customerInformation_id_FH_BUTTON:function(){
		this.showBackView('customerList-VID','HelcPDA.view.customer.customerList');
	},

	/**
	 **客户详细信息 页面
	 ************************************************************************************/
	
	//首页下面导航条的 查询模块 进入客户查询的方法
	init1:function(obk, index, target, record, e, eOpts ){
		var list=Ext.getCmp('informationList_id');
		var title=JSON.stringify(list.getData()[index].title);
		if(title=='"客户信息"'){
			this.NextView('customer-vid','HelcPDA.view.customer.customer-v');
		};
		if(title=='"合同信息"'){
			this.NextView('Compactlist','HelcPDA.view.compact.CompactSearchPanel');
		};
	},
	
});
