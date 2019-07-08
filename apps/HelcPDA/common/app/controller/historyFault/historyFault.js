Ext.define('HelcPDA.controller.historyFault.historyFault',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'historyfault',
	config:{
		control:{
			/************************************************************************************
			 * 历史故障查询 页面
			 * */
			//查询按钮
			"button#SEARCHid":{
				tap:'init2'
			},

			//返回按钮已有公共的方法
			/**
			 **历史故障查询 页面
			 ************************************************************************************/
			
			//进入历史故障查询页面
			/*"list#informationList_id":{
				itemtap:'init1'
			},*/
		}	
	},
	
	
	/************************************************************************************
	 * 历史故障查询 页面
	 * */
	init2:function(){
		this_obj=this;
		//获取查询条件
		var obj=Ext.getCmp('FaultCodeID');
		var ACTIVITY_ID=obj.getValue();
		var obj=Ext.getCmp('ElevatorModelID');
		var Fault_Domain=obj.getValue();
		var iswhere="WHERE ACTIVITY_ID LIKE '%"+ ACTIVITY_ID +"%' AND FAULT_DOMAIN LIKE '%"+ Fault_Domain +"%'";

		var getResult=function(res){
			this_obj.NextView('historyFaultList-VID','HelcPDA.view.historyFault.historyFaultList-V');
			
			console.log(res);
			var list=[];
			//alert(res.rows.length);
			if(res.rows.length==0){
				WL.Toast.show('数据不存在!');
			}else{
				for(var i=0;i<res.rows.length;i++){
						list[i]=res.rows[i];
						res[i]=res.rows[i];
					//	console.log(res.rows[i].ASSET_NUM+'/'+res.rows[i].DOMAIN_ID);
				};
				console.log(res.rows[0].DOMAIN_ID);
				var store=Ext.data.StoreManager.get("historyFaultS");
				if(!store){
					store=Ext.create("HelcPDA.store.historyFaultM.historyFaultS");
				};
				store.setData(list,this);
					
				var tcodeId='historyFault';
	 			var query={tcode:tcodeId};
	 			console.log(tcodeId);
	 			var coll=WL.JSONStore.get(collectionName);
	 			coll.remove(query).then(function(){
		 			//循环添加每一条到JSONStore
		 			var ndata=[];
		 			for(var i=0;i<list.length;i++){
		 				var query={tid:list[i].ASSET_NUM,tcode:tcodeId,stext:list[i]};
		 				ndata[i]=query;
		 			};
		 			coll.add(ndata).then(function(){
		 				WL.Toast.show('数据已成功导入');
		 			}).fail(function(err){
		 				WL.Toast.show('数据导入失败');
		 			});
	 			}).fail(function(err){
	 				WL.Toast.show('数据导入失败');
	 			});	
			};
		};
		var content="{'userid':'"+userid+"','count':'','tcode':'','iswhere':"+iswhere+"}";
		this_obj.connectServer(getResult,'lscxAction.do?method=toSearch',content);
	},

	/**
	 **历史故障查询 页面
	 ************************************************************************************/
	
	//进入历史故障查询页面
	init1:function(obk, index, target, record, e, eOpts ){
		var list=Ext.getCmp('informationList_id');
		var title=JSON.stringify(list.getData()[index].title);
		if(title=='"历史故障"'){
			this.NextView('historyFault-VID','HelcPDA.view.historyFault.historyFault-V');
		};
	},

});
