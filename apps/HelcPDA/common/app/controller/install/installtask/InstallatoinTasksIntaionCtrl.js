Ext.define('HelcPDA.controller.install.installtask.InstallatoinTasksIntaionCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'installtaskCtrl_id3',
	config:{
		
		control:{
			/************************************************************************************
			 * 安装计划 工号列表页面
			 * */
			//获取详细信息
			"list#InstallatoinTasksListPanel_id_list3":{
		    	itemtap:'onList3Itemtap' 
			},
			
			//返回按钮
			'button#InstallatoinTasksListPanel_id_FH_BUTTON':{
				tap:'InstallatoinTasksListPanel_id_FH_BUTTON'
			},
			
			//转派
			"button#refresh_id":{
				tap:'onButtonItemtap'
			},
			/**
			 **安装计划 工号列表页面
			 ************************************************************************************/
			
			
			
			/************************************************************************************
			 * 安装计划 安装任务信息页面
			 * */
			
			//返回按钮
			'button#buttonbk_id':{
				tap:'buttonbk_id'
			},
			
			/**
			 **安装计划 安装任务信息页面
			 ************************************************************************************/
		},
	},
	
	/************************************************************************************
	 * 安装计划 工号列表页面
	 * */
	//获取详细信息
	onList3Itemtap:function(obj, index, target, record, e, eOpts){
		//页面跳转
		this.NextView('InstallatoinTasksIntaion_id','HelcPDA.view.install.installtask.InstallatoinTasksIntaion');
        //判断是哪个标签
        var objID=Ext.getCmp('tabpanel_id');
        var itemid=objID.getActiveItem().getId();
        var tcodeId=null;
        if(itemid=='NoAdmission_id'){
        	tcodeId='INSTALL_TASK_ANTRANCE';
        }else if(itemid=='InTheSystem_id'){
        	tcodeId='INSTALL_TASK_ENTRANCE';
        };
        console.log(tcodeId);
        var store=Ext.data.StoreManager.get("InstallatoinTasksListPanelStore3");
        if(!store){
			store=Ext.create("HelcPDA.store.install.installtask.InstallatoinTasksListPanelStore3");
		};
		var ENGCONTRACT_NUMBER=store.getAt(index).get('ENGCONTRACT_NUMBER');
		console.log(ENGCONTRACT_NUMBER);
		var ELEVATOR_NO=store.getAt(index).get('ELEVATOR_NO');
		console.log(ELEVATOR_NO);
		var coll=WL.JSONStore.get(collectionName);
		var options={};
		var data={tcode:tcodeId};
		coll.find(data,options).then(function(arrayResults){
			console.log(arrayResults.length);
			var list=[];
  		  	var list2=[];
  		  	var k=0;
  		  	for(var i=0;i<arrayResults.length;i++){
  		  		list[i]=arrayResults[i].json;
  		  	};
  		  	//alert(list[0].stext.ENGCONTRACT_NUMBER);
  		  	console.log(list[0]);
  		  	for(var j=0;j<list.length;j++){
  		  		if((list[j].stext.ENGCONTRACT_NUMBER==ENGCONTRACT_NUMBER)&&(list[j].stext.ELEVATOR_NO==ELEVATOR_NO)){
  		  			list2[k++]=list[j].stext;
  		  		};
  		  	};
  		  	console.log(list2.length);
  		  	console.log(list2[0].ELEVATOR_NO);
  		  	console.log(list2[0].INSTALL_ADDRESS);
  		  	console.log(list2[0]);
  		  	console.log(list2[0].dwNAME);
  		  	console.log(list2[0].dzNAME);
  		  	console.log(list2[0].dpNAME);
  		  	
  		  	//赋值
  		  	var obj=Ext.getCmp('ENGCONTRACT_NUMBER_id');
  		  	obj.setValue(list2[0].ENGCONTRACT_NUMBER);
  		  	var obj2=Ext.getCmp('ELEVATOR_NO_id');
  		  	obj2.setValue(list2[0].ELEVATOR_NO);
  		  	var obj3=Ext.getCmp('CUSTOMER_NAME_id');
  		  	obj3.setValue(list2[0].CUSTOMER_NAME);
  		  	var obj4=Ext.getCmp('INSTALL_ADDRESS_id');
  		  	obj4.setValue(list2[0].INSTALL_ADDRESS);
  		  	var obj5=Ext.getCmp('PRODUCE_TYPE_id');
  		  	obj5.setValue(list2[0].PRODUCE_TYPE);
  		  	var obj6=Ext.getCmp('SEQ_NUM_id');
  		  	obj6.setValue(list2[0].SEQ_NUM);
  		  	var obj7=Ext.getCmp('EQUIPMENT_NO_id');
  		  	obj7.setValue(list2[0].EQUIPMENT_NO);
  		  	var obj8=Ext.getCmp('CM_ELEVATOR_TYPE_NAME_id');
  		  	obj8.setValue(list2[0].CM_ELEVATOR_TYPE_NAME);
  		  	var obj9=Ext.getCmp('ELEVATOR_CLASS_NAME_id');
  		  	obj9.setValue(list2[0].ELEVATOR_CLASS_NAME);
  		  	var obj10=Ext.getCmp('dwNAME_id');
  		  	obj10.setValue(list2[0].dwNAME);
  		  	var obj11=Ext.getCmp('dzNAME_id');
  		  	obj11.setValue(list2[0].dzNAME);
  		  	var obj12=Ext.getCmp('dpNAME_id');
  		  	obj12.setValue(list2[0].dpNAME);
  		  	var obj13=Ext.getCmp('dpNAME_id');
  		  	obj13.setValue(list2[0].dpNAME);
  		  	var obj14=Ext.getCmp('BUDGET_INSTALL_METHOD_id');
  		  	obj14.setValue(list2[0].BUDGET_INSTALL_METHOD);
  		  	var obj15=Ext.getCmp('PARAM_C_id');
  		  	var str=list2[0].PARAM_C+'/'+list2[0].PARAM_Z+'/'+list2[0].PARAM_M;
  		  	obj15.setValue(str);
  		  	var obj16=Ext.getCmp('PARAM_ZZ_id');
  		  	obj16.setValue(list2[0].PARAM_ZZ);
  		  	var obj17=Ext.getCmp('PARAM_SD_id');
  		  	obj17.setValue(list2[0].PARAM_SD);
  		  	var obj18=Ext.getCmp('PARAM_TSGD_id');
  		  	obj18.setValue(list2[0].PARAM_TSGD);
  		  	var obj19=Ext.getCmp('PARAM_JDZG_id');
  		  	obj19.setValue(list2[0].PARAM_JDZG);
  		  	var obj20=Ext.getCmp('CONTRACT_CYCLE_DAY_id');
  		  	obj20.setValue(list2[0].CONTRACT_CYCLE_DAY);
  		  	var obj21=Ext.getCmp('DELIVERY_DATE_id');
  		  	obj21.setValue(list2[0].DELIVERY_DATE);
		
  		  	var store=Ext.data.StoreManager.get("InstallatoinTasksIntaionStore4");
  		  	if(!store){
  		  		store=Ext.create("HelcPDA.store.install.installtask.InstallatoinTasksIntaionStore4");
  		  	};
  		  	store.setData(list2,this);
		}).fail(function(errorObject){
			WL.Toast.show('导出数据错误');
		});
	},

	//返回按钮
	InstallatoinTasksListPanel_id_FH_BUTTON:function(){
		this.showBackView('installtask_id','HelcPDA.view.install.installtask.installTask');
	},
	
	//转派按钮
	onButtonItemtap:function(){
		this.NextView('InstallatoinTasksTurnPanel_id','HelcPDA.view.install.installtask.InstallatoinTasksTurnPanel');
	},
	/**
	 **安装计划 工号列表页面
	 ************************************************************************************/

	
	/************************************************************************************
	 * 安装计划 安装任务信息页面
	 * */
	
	//返回按钮
	buttonbk_id:function(){
		this.showBackView('InstallatoinTasksListPanel_id','HelcPDA.view.install.installtask.InstallatoinTasksListPanel');
	},
	
	/**
	 **安装计划 安装任务信息页面
	 ************************************************************************************/
	
});