
/* JavaScript content from app/controller/installtoproduce/InstallProduce_EnoList_C.js in folder common */
Ext.define('HelcPAD.controller.installtoproduce.InstallProduce_EnoList_C',{
	extend:'HelcPAD.controller.ApplicationController',
	id:'InstallProduce_List_C_id',
config:{
		//wangGuoYiJiaoxinqiSummit_id
		control:{
			
			/************************************************************************************
			 * 排产列表页面
			 * */
			
			//返回按钮
			'button#InstallProduce_EnoList_VID_FH_BUTTON':{
				tap:'InstallProduce_EnoList_VID_FH_BUTTON'
			},

			//获得排产详细信息
			"list#EnoList":{
				itemtap:'init1'
			},
			
			/**
			 **排产列表页面
			 ************************************************************************************/
			
			
		}
},

		/************************************************************************************
		 * 排产列表页面
		 * */
		
		//返回按钮
		InstallProduce_EnoList_VID_FH_BUTTON:function(){
			this.showBackView('InstallProduce_List_VID','HelcPDA.view.install.installtoproduce.InstallProduce_List_V');
		},

		//2014-6-30 xcx
		//数据提交后显示已提交，并且不能再次进入 排产 数据提交页面
		//当排产刷新后，已提交的数据不能显示
		init1:function(obj, index, target, record, e, eOpts){
//			alert('ok');
			var hiddenOBJ=Ext.getCmp('HiddenID');
			var hidValue=hiddenOBJ.getValue();
			store=Ext.data.StoreManager.get("InstallProduce_List_S");
			if(!store){
				store=Ext.create("HelcPDA.store.install.installprocess.InstallProduce_List_S");
			};
			
			//2014-6-30  xcx
			var QRPC_STATUS=store.getAt(index).get('QRPC_STATUS');
			if(QRPC_STATUS=='已提交'){
				WL.Toast.show("已提交！");
				//alert('已提交');
				return;
			};
			
			//页面跳转
			this.NextView('InstallProduce_Detail_VID','HelcPDA.view.install.installtoproduce.InstallProduce_Detail_V');
			
/*			 var obj=Ext.getCmp('InstallProduce_Detail_VID');
			 if(!obj){
				 obj=Ext.create('HelcPDA.view.install.installtoproduce.InstallProduce_Detail_V');
			 }
			 Ext.Viewport.setActiveItem(obj);*/
			 
			var ELEVATOR_NO=store.getAt(index).get('ELEVATOR_NO');

			 
			 Ext.getCmp('TimeID').setValue();
			 
			 var coll=WL.JSONStore.get(collectionName);
			   var options={};
			   var Tid=hidValue+'_'+ELEVATOR_NO;
			 var tcodeId='ConfirmedScheduling';
			  var data={tcode:tcodeId,tid:Tid};
			  coll.find(data,options).then(function(arrayResults){
				  console.log(arrayResults);
				  console.log(arrayResults.length);
				  var list=[];
				  for(var i=0;i<arrayResults.length;i++){
					  list[i]=arrayResults[i].json.stext;
				  }
				console.log(list);
				  
				  var obj1=Ext.getCmp('CONTRACT_NO');
				  obj1.setValue(list[0].CONTRACT_NO);
				  var obj2=Ext.getCmp('ELEVATOR_NO');
				  obj2.setValue(list[0].ELEVATOR_NO);
				  var obj3=Ext.getCmp('ELEVATOR_CLASS');
				  obj3.setValue(list[0].ELEVATOR_CLASS);
				  var obj4=Ext.getCmp('IS_CHANGED');
				  obj4.setValue(list[0].IS_CHANGED);
				  var obj5=Ext.getCmp('FROM_ELEVATOR');
				  obj5.setValue(list[0].FROM_ELEVATOR);
				  var obj555=Ext.getCmp('DELIVERY_DATE');
				  obj555.setValue(list[0].DELIVERY_DATE);
				  var obj6=Ext.getCmp('TMPELV_DELIVERY_DATE');
				  obj6.setValue(list[0].TMPELV_DELIVERY_DATE);
				  var obj7=Ext.getCmp('REFERENCE_DATE');
				  obj7.setValue(list[0].REFERENCE_DATE);
				  var obj8=Ext.getCmp('PRESCHEDULE_CONFIRM_DATE');
				  obj8.setValue(list[0].PRESCHEDULE_CONFIRM_DATE);
				  var obj9=Ext.getCmp('PRESCHEDULE_DATE');
				  obj9.setValue(list[0].PRESCHEDULE_DATE);
				  var obj10=Ext.getCmp('NODE_NAME');
				  obj10.setValue(list[0].NODE_NAME);
				  
				  //后期添加 xcx
				  var obj210=Ext.getCmp('NODE_NAME_TWO');
				  obj210.setValue(list[0].NODE_NAME);
				  
				  var obj11=Ext.getCmp('LIST_PUBLISHED_DATE');
				  obj11.setValue(list[0].LIST_PUBLISHED_DATE);
				  var obj12=Ext.getCmp('ATO_PROCESS');
				  obj12.setValue(list[0].ATO_PROCESS);
				  var obj13=Ext.getCmp('BRANCH_CABLE_STATUS');
				  obj13.setValue(list[0].BRANCH_CABLE_STATUS);
				  var obj14=Ext.getCmp('PROCESS_NAME');
				  obj14.setValue(list[0].PROCESS_NAME);
				  var obj15=Ext.getCmp('PRE_NODE_NODE_NAME');
				  obj15.setValue(list[0].PRE_NODE_NODE_NAME);
				  var obj16=Ext.getCmp('PRE_NODE_CONFIRM_DATE');
				  obj16.setValue(list[0].PRE_NODE_CONFIRM_DATE);
				  var obj17=Ext.getCmp('SOURCE_TYPE');
			//	  obj17.setValue(list[0].SOURCE_TYPE);
				  if(list[0].SOURCE_TYPE=='C'){
					  obj17.setValue('下游节点取消');
					  var HID=Ext.getCmp('HIDDenID');
					  HID.setHidden(false);
					  var hid=Ext.getCmp('HID_ID');
					  hid.setHidden(true);
					  if(list[0].STATUS=='IGNORED'){
						  var obj1=Ext.getCmp('selectfieldID');
						  obj1.setValue('处理');
						
					  }
				  }else if(list[0].SOURCE_TYPE=='I'){
					  var HID=Ext.getCmp('HIDDenID');
					  obj17.setValue('上游节点下达');
					  HID.setHidden(true);
					  var hid=Ext.getCmp('HID_ID');
					  hid.setHidden(false);
				  }
				  var obj18=Ext.getCmp('RESTRICT_DAY');
				  obj18.setValue(list[0].RESTRICT_DAY);
				  var obj19=Ext.getCmp('FINAL_CONFIRM_DATE');
				  obj19.setValue(list[0].FINAL_CONFIRM_DATE);
				  var OBJ=Ext.getCmp('TimeID');
				  console.log(list[0].CONFIRM_DATE);
				  if(list[0].CONFIRM_DATE!=''){
					OBJ.setValue(new Date(list[0].CONFIRM_DATE));
				  };
				  
				  //说明
				  var sm=Ext.getCmp('RESTRICT_DAY_SHUOMING');
				  sm.setValue('1、 撤销：下达撤销后，排产流程将返回上一节点，常用于对电梯排产的撤销。');
				  var sm2=Ext.getCmp('RESTRICT_DAY_SHUOMING_TWO');
				  sm2.setValue('2、 不处理：下达不处理后，本节点的操作权将返回至ERP，常用于下一节点撤销排产，但实际上只是修改排产日期，而不是撤销电梯排产。');
				  
				  //获取当前日期  
				  var oldTime = (new Date()).getTime();
				  //获取制造周期
				  var ZZZQ=list[0].RESTRICT_DAY;
				  if (ZZZQ == '' || ZZZQ == null) {
					  ZZZQ = 16;
				  }
			
				  //获取当前日期    加上  制造周期  (和期)
				  var oldTime_AND_ZZZQ=oldTime+ZZZQ*24*60*60*1000;
				  //把和期转化为Y-m-d格式
				  var hq=new Date(oldTime_AND_ZZZQ);

				  var hq2=Ext.Date.format(hq,'Y-m-d');
				  
				  var most_new_time = new Date(hq2.replace(/-/g,"/"));
				  most_new_time.setDate(most_new_time.getDate()+1);
				 var hq3=Ext.Date.format(most_new_time,'Y-m-d');
				 
				 //判断当前节点状态  2014-8-21
				 var gc='工程二次确认';
				 var bc='补充排产工程确认';
				 //当前排产节点
				 var dcPCJD=list[0].NODE_NAME;
				 //判断节点
				 if(dcPCJD.indexOf(gc) >= 0 ){
					 //日期判断  最快下达日期小于上一节点确认日期
					 var zkxdrq=new Date(hq3);
					 var syjdqrrq=new Date(list[0].PRE_NODE_CONFIRM_DATE);
					 if(zkxdrq>syjdqrrq){
						 Ext.getCmp('NODE_ZKXDRQ').setValue(hq3);
					 }else{
						 Ext.getCmp('NODE_ZKXDRQ').setValue(list[0].PRE_NODE_CONFIRM_DATE);
					 };
				 }else if(dcPCJD.indexOf(bc) >= 0 ){
					//最快下达日期
					  Ext.getCmp('NODE_ZKXDRQ').setValue(hq3);
				 };      
				
				  
			  }).fail(function(err){
				  WL.Toast.show("查找失败！");
				  //Ext.Msg.alert("查找失败");
			  });	
		},
		
		/**
		 **排产列表页面
		 ************************************************************************************/

});