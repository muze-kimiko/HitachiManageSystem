//故障引导模块 xcx  2014-7-29
Ext.define('HelcPDA.controller.install.FaultDirectionCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'FaultDirectionCtrlID',
config:{
		control:{
			
			/************************************************************************************
			 * 故障代码查询 页面
			 * */
			
			//返回按钮
			'button#FaultDirectionID_FH_BUTTON':{
				tap:'FaultDirectionID_FH_BUTTON'
			},
			
			//查询按钮
			"button#SEARCHBYID":{
				tap:'init2'
			},

			/**
			 **故障代码查询 页面
			 ************************************************************************************/

		},
},
		/************************************************************************************
		 * 故障代码查询 页面
		 * */

		//返回按钮
		FaultDirectionID_FH_BUTTON:function(){
			this.BackView();
		},
		
		//查询按钮
		init2:function(){
			 this.NextView('FaultCodeCheckList_id','HelcPDA.view.install.FaultCodeCheckList');
			 
			 var DOMAIN_ID=1;
//			 WHERE USE_ACCNT_NAME LIKE '%a%' AND ASSET_NUM='bb'
			 var objASSET_NUM=Ext.getCmp('ElevatorModel_id');
			 var ASSET_NUM=objASSET_NUM.getValue();
			 
			 var objUSE_ACCNT_NAME=Ext.getCmp('FaultCode_id');
			 var USE_ACCNT_NAME=objUSE_ACCNT_NAME.getValue();
			 console.log(objASSET_NUM.getValue());
			 //AND ASSET_NUM LIKE '%ASSET_NUM%'
			 var iswhere="WHERE USE_ACCNT_NAME LIKE '%"+ USE_ACCNT_NAME +"%' AND ASSET_NUM LIKE '%"+ ASSET_NUM +"%'";
			 getResult=function(res){
				 console.log('okk');
				console.log(res); 
				if(res.rows.length==0){
					WL.Toast.whow('找不到数据!');
					//alert('找不到数据!');
				}else{
					for(var i=0;i<res.rows.length;i++){
							list[i]=res.rows[i];
							res[i]=res.rows[i];
							console.log(res.rows[i].ASSET_NUM+'/'+res.rows[i].DOMAIN_ID);
					};
					console.log(res.rows[0].DOMAIN_ID);
					store=Ext.data.StoreManager.get("FaultDirectionStore");
					if(!store){
						store=Ext.create("HelcPDA.store.install.FaultDirectionStore");
					};
					store.setData(list,this);
				};
			 };
			 var content="{'userid':'"+userid+"','count':'','tcode':'','DOMAIN_ID':'"+DOMAIN_ID+"','iswhere':"+iswhere+"}";
			this.connectServer(getResult,'gzzyinAction.do?method=toSearch',content);
		},
		/**
		 **故障代码查询 页面
		 ************************************************************************************/
		
});