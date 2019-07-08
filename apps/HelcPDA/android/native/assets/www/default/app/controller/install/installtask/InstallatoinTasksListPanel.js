
/* JavaScript content from app/controller/install/installtask/InstallatoinTasksListPanel.js in folder common */
Ext.define('HelcPDA.controller.install.installtask.InstallatoinTasksListPanel',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'installtaskCtrl_id',
	config:{
		
		control:{
			/************************************************************************************
			 * 安装任务 页面
			 * */
			//未进场 详细信息
			"list#installtask_id_list":{
		    	itemtap:'onListItemtap' 
			},

			//在制 详细信息
			"list#installtask_id_list2":{
				itemtap:'onListItemtap2' 
			},
			
			//返回按钮
			'button#installtask_id_FH_BUTTON':{
				tap:'installtask_id_FH_BUTTON'
			},
			
			//同步按钮
			'button#installtask_id_TB_BUTTON':{
				tap:'installtask_id_TB_BUTTON'
			},
			
			//查询按钮
			'button#installtask_id_CX_BUTTON':{
				tap:'installtask_id_CX_BUTTON'
			},
			/**
			 **安装任务 页面
			 ************************************************************************************/

			//签到（已没用）
			"button#compose_id":{
				tap:'compose'
			}
			
		}
	},
	
	/************************************************************************************
	 * 安装任务 页面
	 * */
	
	//未进场详细信息
	onListItemtap:function(obj, index, target, record, e, eOpts){
		//跳转到工号列表页面
		this.NextView('InstallatoinTasksListPanel_id','HelcPDA.view.install.installtask.InstallatoinTasksListPanel');
		//数据仓
		var store=Ext.data.StoreManager.get("installtaskStore");
		if(!store){
			store=Ext.create("HelcPDA.store.install.installtask.installtaskStore");
		};

		 var ENGCONTRACT_NUMBER=store.getAt(index).get('ENGCONTRACT_NUMBER');
		 var hiddenobj=Ext.getCmp('hiddenId');
		 console.log(hiddenobj);
		 hiddenobj.setValue(ENGCONTRACT_NUMBER);
		 console.log(hiddenobj.getValue());
		
		 var coll=WL.JSONStore.get(collectionName);
	  	 var options={};
	  	 tcodeId='INSTALL_TASK_ANTRANCE';
	  	 var data={tcode:tcodeId};
	  	 coll.find(data,options).then(function(arrayResults){
	  		  var list=[];
	  		  var list2=[];
	  		  var k=0;
	  		  for(var i=0;i<arrayResults.length;i++){
	  			  list[i]=arrayResults[i].json;
	  		  };
	  		  //alert(list[0].stext.ENGCONTRACT_NUMBER);
	  		  console.log(list[0]);
	  		  for(var j=0;j<list.length;j++){
	  			  if(list[j].stext.ENGCONTRACT_NUMBER==ENGCONTRACT_NUMBER){
	  				  list2[k++]=list[j].stext;
	  			  };
	  		  };
	  		  console.log(list2.length);
	  		  console.log(list2[0]);
	  		  console.log(list2[0].CM_ELEVATOR_TYPE_NAME);
	  		  //数据仓添加数据
	  		  var store=Ext.data.StoreManager.get("InstallatoinTasksListPanelStore3");
	  		  if(!store){
	  			  store=Ext.create("HelcPDA.store.install.installtask.InstallatoinTasksListPanelStore3");
	  		  };
	  		  store.setData(list2,this);
	  	}).fail(function(errorObject){
	  		WL.Toast.show("读取数据出错!");
		});
	},

	//在制 详细信息
	onListItemtap2:function(obj, index, target, record, e, eOpts){
		//跳转到工号列表页面
		this.NextView('InstallatoinTasksListPanel_id','HelcPDA.view.install.installtask.InstallatoinTasksListPanel');
		
		var store=Ext.data.StoreManager.get("installtaskStore2");
		if(!store){
			store=Ext.create("HelcPDA.store.install.installtask.installtaskStore2");
		};

		var ENGCONTRACT_NUMBER=store.getAt(index).get('ENGCONTRACT_NUMBER');
		var coll=WL.JSONStore.get(collectionName);
	  	var options={};
	  	tcodeId='INSTALL_TASK_ENTRANCE';
	  	var data={tcode:tcodeId};
	  	coll.find(data,options).then(function(arrayResults){
	  		var list=[];
	  		var list2=[];
	  		var k=0;
	  		for(var i=0;i<arrayResults.length;i++){
	  			list[i]=arrayResults[i].json;
	  		};
	  		console.log(list[0]);
	  		for(var j=0;j<list.length;j++){
	  			if(list[j].stext.ENGCONTRACT_NUMBER==ENGCONTRACT_NUMBER){
	  				list2[k++]=list[j].stext;
	  			 };
	  		 };
	  		 console.log(list2.length);
	  		 console.log(list2[0]);
	  		 console.log(list2[0].CM_ELEVATOR_TYPE_NAME);
	  		 var store=Ext.data.StoreManager.get("InstallatoinTasksListPanelStore3");
	  		 if(!store){
	  			 store=Ext.create("HelcPDA.store.install.installtask.InstallatoinTasksListPanelStore3");
	  		 };
	  		 store.setData(list2,this);
	  	}).fail(function(errorObject){
	  		WL.Toast.show('读取数据出错！');
		});
	},
	
	//返回按钮
	installtask_id_FH_BUTTON:function(){
		this.showBackView('installProject_id','HelcPDA.view.install.installProject');
	},
	
	//同步按钮
	installtask_id_TB_BUTTON:function(){
		this.NextView('InstallatoinTasksSynchronousPanel_id','HelcPDA.view.install.installtask.InstallatoinTasksSynchronousPanel');
	},
	
	//查询按钮
	installtask_id_CX_BUTTON:function(){
		this.NextView('InstallatoinTasksSearchPanel_id','HelcPDA.view.install.installtask.InstallatoinTasksSearchPanel');
	},
	/**
	 **安装任务 页面
	 ************************************************************************************/
	
	
	compose:function(){
		var obj=Ext.getCmp('InstallatoinTasksSigninPanel_id');
        if(!obj){
        	obj=Ext.create('HelcPDA.view.install.installtask.InstallatoinTasksSigninPanel');
        }
        Ext.Viewport.setActiveItem(obj);
		//alert('ok');
	}
});
