Ext.define('HelcPDA.controller.historyFault.historyFaultInformationCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'historyFaultInformationCtrl_id',
	config:{
		control:{
			/************************************************************************************
			 * 历史故障查询-列表  页面
			 * */
			
			//进入详细信息页面
			"list#historylist":{
				itemtap:'init1'
			},

			//返回按钮
			'button#historyFaultList-VID_FH_BUTTON':{
				tap:'historyFaultList_VID_FH_BUTTON'
			},

			/**
			 **历史故障查询-列表  页面
			 ************************************************************************************/
			
			
			/************************************************************************************
			 * 历史故障详细信息  页面
			 * */
			
			//返回按钮
			'button#historyFaultInformation_id_FH_BUTTON':{
				tap:'historyFaultInformation_id_FH_BUTTON'
			},
			
			/**
			 **历史故障详细信息  页面
			 ************************************************************************************/


		}	
	},
	
			/************************************************************************************
			 * 历史故障查询-列表  页面
			 * */
	
			//进入详细信息页面
			init1:function(obj, index, target, record, e, eOpts){
				//进入
				this.NextView('historyFaultInformation_id','HelcPDA.view.historyFault.historyFaultInformation');
				
				var store=Ext.data.StoreManager.get("historyFaultS");
				if(!store){
					store=Ext.create("HelcPDA.store.historyFaultM.historyFaultS");
				}
				var ASSET_NUM=store.getAt(index).get('ASSET_NUM');
			
				var Tcode="historyFault";
				var data={tcode:Tcode};
				var options={};
				var coll=WL.JSONStore.get(collectionName);
				coll.find(options,data).then(function(res){
					console.log(res);
					console.log(res.length);
					var list=[];
					for(var i=0;i<res.length;i++){
						list[i]=res[i].json.stext;
					};
					var list2=[];
					var k=0;
				   for(var i=0;i<list.length;i++){
					   if(list[i].ASSET_NUM==ASSET_NUM){
						   list2[k++]=list[i];
					   };
				   };
				   console.log(JSON.stringify(list2));
				   
					var obj1=Ext.getCmp('ACTIVITY_ID');
					if(list2[0].ACTIVITY_ID==''){
						obj1.setValue();
					}else{
						obj1.setValue(list2[0].ACTIVITY_ID);
					};
					
					var obj2=Ext.getCmp('ASSET_NUM');
					obj2.setValue(list2[0].ASSET_NUM);
					var obj3=Ext.getCmp('PERSON_NAME');
					obj3.setValue(list2[0].PERSON_NAME);
					var obj4=Ext.getCmp('STATION_NAME');
					obj4.setValue(list2[0].STATION_NAME);
					var obj5=Ext.getCmp('FAULT_DOMAIN');
					obj5.setValue(list2[0].FAULT_DOMAIN);
					var obj6=Ext.getCmp('FAULT_EDIFICE');
					obj6.setValue(list2[0].FAULT_EDIFICE);
					var obj7=Ext.getCmp('FAULT_ADDRESS');
					obj7.setValue(list2[0].FAULT_ADDRESS);
					var obj8=Ext.getCmp('ABSTRACT');
					obj8.setValue(list2[0].ABSTRACT);
					var obj9=Ext.getCmp('START_TIME');
					obj9.setValue(list2[0].START_TIME);
					var obj10=Ext.getCmp('HAPPEN_TIME');
					obj10.setValue(list2[0].HAPPEN_TIME);
					var obj11=Ext.getCmp('CONTACT_NAME');
					obj11.setValue(list2[0].CONTACT_NAME);
					var obj12=Ext.getCmp('CONTACT_PHONE');
					obj12.setValue(list2[0].CONTACT_PHONE);
					var obj13=Ext.getCmp('BOX_UP');
					obj13.setValue(list2[0].BOX_UP);
					var obj14=Ext.getCmp('HOTLINE_FAULT_STATUS');
					obj14.setValue(list2[0].HOTLINE_FAULT_STATUS);
					var obj15=Ext.getCmp('BOOKING_TIME');
					obj15.setValue(list2[0].BOOKING_TIME);
					var obj16=Ext.getCmp('AREA');
					obj16.setValue(list2[0].AREA);
					var obj17=Ext.getCmp('SERVICE_REQUEST_SOURCE');
					obj17.setValue(list2[0].SERVICE_REQUEST_SOURCE);
					var obj18=Ext.getCmp('ASSIGN_TIME');
					obj18.setValue(list2[0].ASSIGN_TIME);
				}).fail(function(err){
					WL.Toast.show("查找数据失败");
				});	
			},
		
			//返回按钮
			historyFaultList_VID_FH_BUTTON:function(){
				this.showBackView('historyFault-VID','HelcPDA.view.historyFault.historyFault-V');
			},
			
			/**
			 **历史故障查询-列表  页面
			 ************************************************************************************/

			
			/************************************************************************************
			 * 历史故障详细信息  页面
			 * */
			
			historyFaultInformation_id_FH_BUTTON:function(){
				this.showBackView('historyFaultList-VID','HelcPDA.view.historyFault.historyFaultList-V');
			},
			
			/**
			 **历史故障详细信息  页面
			 ************************************************************************************/
});