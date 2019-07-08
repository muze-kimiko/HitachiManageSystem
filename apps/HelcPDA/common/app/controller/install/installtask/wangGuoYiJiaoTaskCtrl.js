Ext.define('HelcPDA.controller.install.installtask.wangGuoYiJiaoTaskCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'wangGuoYiJiaoTaskCtrl_id',
config:{
		control:{
			/************************************************************************************
			 * 完工及移交任务 页面  1 
			 * */

			//获取详细信息
			"list#wangGouYiJiaoList_id":{
		    	itemtap:'init1' 
			},
			
			//返回按钮
			'button#wangGouYiJiao_id_FH_BUTTON':{
				tap:'wangGouYiJiao_id_FH_BUTTON'
			},
			/**
			 **完工及移交任务 页面  1
			 ************************************************************************************/
			
			
			
			/************************************************************************************
			 * 完工及移交任务 页面  2 
			 * */
			//返回按钮
			'button#wangGuoYiJiaoTask_id_FH_BUTTON':{
				tap:'wangGuoYiJiaoTask_id_FH_BUTTON'
			},

			//获取详细信息
			"list#wangGouYiJiaoLISTid":{
				itemtap:'init2'
			},
			/**
			 **完工及移交任务 页面  2
			 ************************************************************************************/
			
		},
},
			/************************************************************************************
			 * 完工及移交任务 页面  1 
			 * */

			//获取详细信息
			init1:function(obj, index, target, record, e, eOpts){
				this.NextView('wangGuoYiJiaoTask_id','HelcPDA.view.install.installtask.wangGuoYiJiaoTask');
				
				var store=Ext.data.StoreManager.get("ZhengFujianStore");
				if(!store){
					store=Ext.create("HelcPDA.store.install.installtask.ZhengFujianStore");
				};
				var ENGCONTRACT_NUMBER=store.getAt(index).get('ENGCONTRACT_NUMBER');
				var objhidden=Ext.getCmp('wangGouYiJiaoHidden_id');
				objhidden.setValue(ENGCONTRACT_NUMBER);
				//	alert(ENGCONTRACT_NUMBER);
				var tcodeId1='wangGuoYiJiao';
				var coll=WL.JSONStore.get(collectionName);
			  	var data={tcode:tcodeId1};
			  	options={
			  	};
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
			        	 if(ENGCONTRACT_NUMBER==list[i].ENGCONTRACT_NUMBER){
			        		 list2[k++]=list[i];
			        	 };
			         };
			         console.log(list2[0]);
			         console.log(list2.length);
			         console.log(list);
			         var store=Ext.data.StoreManager.get("ZhengFujianStore2");
					 if(!store){
							store=Ext.create("HelcPDA.store.install.installtask.ZhengFujianStore2");
					 };
					 store.setData(list2,this);
			 	 }).fail(function(errorObject){
			 		WL.Toast.show('数据读取出错!');
				 });
			},
			
			//返回按钮
			wangGouYiJiao_id_FH_BUTTON:function(){
				this.showBackView('installProject_id','HelcPDA.view.install.installProject');
			},
			/**
			 **完工及移交任务 页面  1
			 ************************************************************************************/

			/************************************************************************************
			 * 完工及移交任务 页面  2 
			 * */
			
			//返回按钮
			wangGuoYiJiaoTask_id_FH_BUTTON:function(){
				this.showBackView('wangGouYiJiao_id','HelcPDA.view.install.installtask.wangGouYiJiao_id');
			},
			
			//获取详细信息
			init2:function(obj1, index, target, record, e, eOpts){
				this_obj=this;
				//数据仓	
				var store=Ext.data.StoreManager.get("ZhengFujianStore2");
				if(!store){
					store=Ext.create("HelcPDA.store.install.installtask.ZhengFujianStore2");
				};
				var ELEVATOR_NO=store.getAt(index).get('ELEVATOR_NO');
				var tcodeId1='wangGuoYiJiao';
				var coll=WL.JSONStore.get(collectionName);
				var data={tcode:tcodeId1};
				var options={
				};
				coll.find(data,options).then(function(arrayResults){
					//跳转
					this_obj.NextView('wangGuoYiJiaoxinqi_id','HelcPDA.view.install.installtask.wangGuoYiJiaoxinqi');	
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
				    console.log(list2[0].FLG);
				    //当时Y时不可提交 xcx  2014-8-1
				    if(list2[0].FLG=='Y'){
				    	var objSave=Ext.getCmp('buttonID');
				    	objSave.setDisabled(true);
				    	alert(23124);
				    };
				    
				    console.log('技监发证日期 '+JSON.stringify(list2[0]));
				    //基本数据
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
				     //	var obj21=Ext.getCmp('LicenceNumber');
				     //	obj21.setValue(list2[0].PERMIT_USE_NO);
				     var obj22=Ext.getCmp('time_id');
				     obj22.setValue(list2[0].SIGNED_TRANSFER_DOC_DATE);
				     var obj23=Ext.getCmp('time_id2');
				     obj23.setValue(list2[0].TRANSFER_COMMENTS);
				     //   var obj24=Ext.getCmp('time_id3');
				     //  obj24.setValue(list2[0].GOV_CHECK_DATE);
				     var obj25=Ext.getCmp('ReportDate_id');
				     obj25.setValue(list2[0].COMPLETION_DATE);
				     var obj25=Ext.getCmp('ReportCompletionDate_id');
				     obj25.setValue(list2[0].REQUEST_COMPLETION_DATE);
				     var obj25=Ext.getCmp('BasedConfirmCompletionStatus_id');
				     obj25.setValue(list2[0].COMPLETION_FLAG);
				     var obj26=Ext.getCmp('Number_id');
				     obj26.setValue(list2[0].FILE_NUMBER);
				     
				     //技监发证日期
				     var JJFZRQ=Ext.getCmp('Test_JJFZRQ');
				     if(list2[0].GOV_CHECK_DATE!=''){
				     };
				     var JFData=list2[0].GOV_CHECK_DATE.split(' ');
				     var JFRQ=JFData[2]+'-'+JFData[0]+'-'+JFData[1];
				     JJFZRQ.setValue(JFRQ);
				     if(list2[0].GOV_CHECK_DATE==''){
				    	 obj22.setDisabled(true);
				     };
				     
				}).fail(function(errorObject){
					WL.Toast.show('数据读取出错!');
				});
			},
			/**
			 **完工及移交任务 页面  2
			 ************************************************************************************/

});