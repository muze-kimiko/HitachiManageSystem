
/* JavaScript content from app/controller/install/FaultCodeCheckListCtrl.js in folder common */
Ext.define('HelcPDA.controller.install.FaultCodeCheckListCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'FaultCodeCheckListCtrl_id',
config:{
		//wangGuoYiJiaoxinqiSummit_id
		control:{
			/************************************************************************************
			 * 故障代码查询-列表 页面
			 * */

			//返回按钮
			'button#FaultCodeCheckList_id_FH_BUTTON':{
				tap:'FaultCodeCheckList_id_FH_BUTTON'
			},	
			
			//获取详细信息
			"list#Checklist_id":{
				itemtap:'init2'
			},
			
			/**
			 **故障代码查询-列表 页面
			 ************************************************************************************/
			
			
			/************************************************************************************
			 * 故障详细信息  页面
			 * */

			'button#FaultInformation_id_FH_BUTTON':{
				tap:'FaultInformation_id_FH_BUTTON'
			},

			/**
			 **故障详细信息  页面
			 ************************************************************************************/
			
		},
},

			/************************************************************************************
			 * 故障代码查询-列表 页面
			 * */
			
			//返回按钮
			FaultCodeCheckList_id_FH_BUTTON:function(){
				this.showBackView('FaultDirectionID','HelcPDA.view.install.FaultDirection');
			},

			//获取详细信息
			init2:function(obj, index, target, record, e, eOpts){
				this.NextView('FaultInformation_id','HelcPDA.view.install.faultInformation');
				
				var store=Ext.data.StoreManager.get("FaultDirectionStore");
				if(!store){
						store=Ext.create("HelcPDA.store.install.FaultDirectionStore");
				};
				var ASSET_NUM=store.getAt(index).get('ASSET_NUM');
				var obj2=Ext.getCmp('duZhuangmins_id');
				obj2.setValue(ASSET_NUM);
				console.log(ASSET_NUM);
			},
			
			/**
			 **故障代码查询-列表 页面
			 ************************************************************************************/
			
			
			
			/************************************************************************************
			 * 故障详细信息  页面
			 * */

			FaultInformation_id_FH_BUTTON:function(){
				this.showBackView('FaultCodeCheckList_id','HelcPDA.view.install.FaultCodeCheckList');
			},
			
			/**
			 **故障详细信息  页面
			 ************************************************************************************/

});