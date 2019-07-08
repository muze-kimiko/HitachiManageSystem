
/* JavaScript content from app/controller/install/installtask/zhengfujianTaskCtrl.js in folder common */
Ext.define('HelcPDA.controller.install.installtask.zhengfujianTaskCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'zhengfujianTaskCtrl_id',
	config:{
		control:{

		/************************************************************************************
		 * 政府检任务 2页面
		 * */
			
			//政府检任务 2   返回按钮
			'button#zhengfujianTask_id_FH_BUTTON':{
				tap:'zhengfujianTask_id_FH_BUTTON'
			},

			//政府检任务 2  详细信息
			"list#zhengfujianTaskList_id":{
		    	itemtap:'initTask' 
			},
		/**
		 **政府检任务 2页面
		 ************************************************************************************/
		},
	},

	
	/************************************************************************************
	 * 政府检任务 2页面
	 * */
	
	//政府检任务 2   返回按钮
	zhengfujianTask_id_FH_BUTTON:function(){
		this.showBackView('zhengfujian_id','HelcPDA.view.install.installtask.zhengfujian');
	},

	//政府检任务 2  详细信息
	initTask:function(obj, index, target, record, e, eOpts){
		//进入
		this.NextView('zhengfujianshuangxixinqi_id','HelcPDA.view.install.installtask.zhengfujianshuangxixinqi');
		//数据仓	
		var store=Ext.data.StoreManager.get("ZhengFujianStore2");
		if(!store){
			store=Ext.create("HelcPDA.store.install.installtask.ZhengFujianStore2");
		};
		var ELEVATOR_NO=store.getAt(index).get('ELEVATOR_NO');
		var tcodeId1='zhengfujianTcode';
		var coll=WL.JSONStore.get(collectionName);
		var data={tcode:tcodeId1};
		var options={ };
		coll.find(data,options).then(function(arrayResults){
			console.log(arrayResults);
		    console.log(arrayResults.length);
		    console.log(arrayResults[0].json.stext);
		    var list=[];
		    var list2=[];
		    for(var i=0;i<arrayResults.length;i++){
		    	list[i]=arrayResults[i].json.stext;
		    };
		    var k=0;
		    for(var i=0;i<list.length;i++){
		    	if(ELEVATOR_NO==list[i].ELEVATOR_NO){
		    		list2[k++]=list[i];
		        };
		     };
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
		     obj10.setValue(list2[0].NST_VENDOR_NAME);
		     var obj11=Ext.getCmp('dzNAME_id');
		     obj11.setValue(list2[0].LIFT_VENDOR_NAME);
		     var obj12=Ext.getCmp('dpNAME_id');
		     obj12.setValue(list2[0].BUILD_VENDOR_NAME);
		     	//	var obj13=Ext.getCmp('dpNAME_id');
		     	//	obj13.setValue(list2[0].dpNAME);
		     var obj14=Ext.getCmp('BUDGET_INSTALL_METHOD_id');
		     obj14.setValue(list2[0].BUDGET_INSTALL_METHOD);
		     var obj15=Ext.getCmp('PARAM_C_id');
		     		//var str=list2[0].PARAM_C+'/'+list2[0].PARAM_Z+'/'+list2[0].PARAM_M;
		     obj15.setValue(list2[0].PARAM_C_M_Z);
		     var obj16=Ext.getCmp('PARAM_ZZ_id');
		     obj16.setValue(list2[0].ZZ);
		     var obj17=Ext.getCmp('PARAM_SD_id');
		     obj17.setValue(list2[0].SD);
		     var obj18=Ext.getCmp('PARAM_TSGD_id');
		     obj18.setValue(list2[0].TSGD);
		     var obj19=Ext.getCmp('PARAM_JDZG_id');
		     obj19.setValue(list2[0].JDZG);
		     var obj20=Ext.getCmp('outDay_id');
		     obj20.setValue(list2[0].CCRQ);
		     var obj21=Ext.getCmp('LicenceNumber');
		     obj21.setValue(list2[0].PERMIT_USE_NO);
		     var obj22=Ext.getCmp('time_id_BJJRQ');
		     console.log(obj22);
		     console.log(obj22.getValue());
		           //  alert(list2[0].GOV_DATE);
		     //alert(list2[0].GOV_DATE);
		     if(list2[0].GOV_DATE=='点击文本设置时间'){
		    	 list2[0].GOV_DATE='';
		         obj22.setValue(list2[0].GOV_DATE);
		     }else{
		          //obj22.setValue(new Date(list2[0].GOV_DATE));
		          obj22.setValue(list2[0].GOV_DATE);
	         };
		     console.log(obj22.getValue());
		     var obj23=Ext.getCmp('time_id2');
		            // obj23.setValue(list2[0].GOV_CHECK_END_DATE);
		     if(list2[0].GOV_CHECK_END_DATE=='点击文本设置时间'){
		    	 list2[0].GOV_CHECK_END_DATE='';
		         obj23.setValue(list2[0].GOV_CHECK_END_DATE);
		      }else{
		          //obj23.setValue(new Date(list2[0].GOV_CHECK_END_DATE));
		          obj23.setValue(list2[0].GOV_CHECK_END_DATE);
		      };
		      var obj24=Ext.getCmp('time_id3');
		      obj24.setValue(list2[0].GOV_CHECK_DATE);
		      var obj25=Ext.getCmp('DEBUG_END_DATE');
		      obj25.setValue(list2[0].DEBUG_END_DATE);
		}).fail(function(errorObject){
			 WL.Toast.whow('读取出错!');
		});
	 },
	/**
	 **政府检任务 2页面
	 ************************************************************************************/

});