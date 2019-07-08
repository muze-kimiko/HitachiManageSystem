
/* JavaScript content from app/controller/ElevatorInformation/ElevatorInformationCtrl.js in folder common */
Ext.define('HelcPDA.controller.ElevatorInformation.ElevatorInformationCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'ElevatorInformation——ID',
	config:{
		control:{
			//查询模块 判断是否进行电梯信息查询
			/*"list#informationList_id":{
				itemtap:'init1'
			},*/
			
			/************************************************************************************
			 * 电梯信息查询页面
			 * */
			//返回方法公共的
			
			//查询按钮
			"button#searCH_ID":{
				tap:'init2'
			},
			
			/**
			 **电梯信息查询页面
			 ************************************************************************************/
			

			/************************************************************************************
			 * 电梯查询-列表 页面
			 * */
			//获取详细信息
			"list#ElevatorInformationlist":{
				itemtap:'init3'
			},

			//返回按钮
			'button#ElevatorInformationList_id_FH_BUTTON':{
				tap:'ElevatorInformationList_id_FH_BUTTON'
			},
			/**
			 **电梯查询-列表 页面
			 ************************************************************************************/
			
			
			/************************************************************************************
			 * 电梯详细信息 页面
			 * */

			//返回按钮
			'button#ElevatorInformation-v_id_FH_BUTTON':{
				tap:'ElevatorInformation_v_id_FH_BUTTON'
			},
			
			/**
			 **电梯详细信息 页面
			 ************************************************************************************/
			
		}	
	},
	
	//查询模块 判断是否进行电梯信息查询
	init1:function(obk, index, target, record, e, eOpts ){
		var list=Ext.getCmp('informationList_id');
		var title=JSON.stringify(list.getData()[index].title);
		if(title=='"电梯信息"'){
			this.NextView('ElevatorInformation_id','HelcPDA.view.ElevatorInformation.ElevatorInformation');
		};
	},
	
	
	/************************************************************************************
	 * 电梯信息查询页面
	 * */

	//查询按钮
	init2:function(){
		this_obj=this;
		var obj=Ext.getCmp('Elevator_id');
		var ASSET_NUM=obj.getValue();
		var object=Ext.getCmp('CustomerID2');
		var USE_ACCNT_NAME=object.getValue();
		var iswhere="WHERE ASSET_NUM LIKE '%"+ ASSET_NUM +"%' AND USE_ACCNT_NAME LIKE '%"+ USE_ACCNT_NAME +"%'";
		var getResult=function(res){
			//跳转
			this_obj.NextView('ElevatorInformationList_id','HelcPDA.view.ElevatorInformation.ElevatorInformationList');
			
			//console.log(res.rows.length);
			//console.log(res);
			var list=[];
			if(res.rows.length==0){
				WL.Toast.show('数据不存在!');
			}else{
				for(var i=0;i<res.rows.length;i++){
					list[i]=res.rows[i];
					res[i]=res.rows[i];
				};
				var store=Ext.data.StoreManager.get("historyFaultS");
				if(!store){
					store=Ext.create("HelcPDA.store.historyFaultM.historyFaultS");
				};
				store.setData(list,this);
				//console.log(list);
				//console.log(list.length);
				var tcodeId='ElevatorInformation111';
	 			var data={tcode:tcodeId};
	 			var options={};
	 			//console.log(tcodeId);
	 			var coll=WL.JSONStore.get(collectionName);
	 			coll.remove(data).then(function(){
	 				//循环添加每一条到JSONStore
	 				 var ndata=[];
	 				 for(var i=0;i<list.length;i++){
	 					 var query={tid:list[i].ASSET_NUM,tcode:tcodeId,stext:list[i]};
	 					 ndata[i]=query;
	 				 };
	 				 coll.add(ndata).then(function(){
	 					 coll.find(data,options).then(function(result){
	 						 //console.log(result.length);
	 						 //console.log(result);
	 					  }).fail(function(err){
	 						 WL.Toast.show('显示数据失败!');
	 					  });
	 				  }).fail(function(err){
	 					  WL.Toast.show('显示数据失败!');
	 				  });
	 			 }).fail(function(err){
	 					WL.Toast.show('显示数据失败!');
	 			  });	
			};
		};
		var content="{'userid':'"+userid+"','count':'','tcode':'','iswhere':"+iswhere+"}";
		this_obj.connectServer(getResult,'elevatorAction.do?method=toSearch',content);
	},
	
	/**
	 **电梯信息查询页面
	 ************************************************************************************/
	

	
	/************************************************************************************
	 * 电梯查询-列表 页面
	 * */
	//获取详细信息
	init3:function(obk, index, target, record, e, eOpts ){
		//跳转
		this.NextView('ElevatorInformation-v_id','HelcPDA.view.ElevatorInformation.ElevatorInformation-v'); 
		
		var store=Ext.data.StoreManager.get("historyFaultS");
		if(!store){
			store=Ext.create("HelcPDA.store.historyFaultM.historyFaultS");
		};
		var ASSET_NUM=store.getAt(index).get('ASSET_NUM');
	    //console.log(ASSET_NUM);
	    var tcodeId='ElevatorInformation111';
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
			   if(list[i].ASSET_NUM==ASSET_NUM){
				   list2[k++]=list[i];
			   };
		   };
		   //console.log(list2);
		   //console.log(list2.length);
		   var obj1=Ext.getCmp('ACCOUNT_ID');
		//   obj1.setValue(list2[0].ACCOUNT_ID);
		   var obj2=Ext.getCmp('AGREE_ID');
		 //  obj2.setValue(list2[0].AGREE_ID);
		   var obj3=Ext.getCmp('AREA_ID');
		   if(list2[0].AREA_ID==''){
			   obj3.setValue();
		   }else{
			   obj3.setValue(list2[0].AREA_ID);
			   
		   };
		   
		   var obj4=Ext.getCmp('ASSET_DOOR');
	//	   obj4.setValue(list2[0].ASSET_DOOR);
		   var obj5=Ext.getCmp('ASSET_HEIGHT');
		   obj5.setValue(list2[0].ASSET_HEIGHT);
		   var obj6=Ext.getCmp('ASSET_ID');
		//   obj6.setValue(list2[0].ASSET_ID);
		   var obj7=Ext.getCmp('ASSET_LOAD');
		   obj7.setValue(list2[0].ASSET_LOAD);
		   var obj8=Ext.getCmp('ASSET_NUM');
		   obj8.setValue(list2[0].ASSET_NUM);
		   var obj9=Ext.getCmp('ASSET_SPEED');
		   obj9.setValue(list2[0].ASSET_SPEED);
		   var obj10=Ext.getCmp('BRAND');
		   obj10.setValue(list2[0].BRAND);
		   var obj11=Ext.getCmp('CITY');
		//   obj11.setValue(list2[0].CITY);
		   var obj12=Ext.getCmp('COMPANY_ID');
		   obj12.setValue(list2[0].COMPANY_ID);
		   var obj13=Ext.getCmp('COMPANY_ORG');
		 //  obj13.setValue(list2[0].COMPANY_ORG);
		   var obj14=Ext.getCmp('DOMAIN_ID');
		   obj14.setValue(list2[0].DOMAIN_ID);
		   var obj15=Ext.getCmp('EDIFICE_NAME');
		   obj15.setValue(list2[0].EDIFICE_NAME);
		   var obj16=Ext.getCmp('ELEVATOR_FLOOR');
		   obj16.setValue(list2[0].ELEVATOR_FLOOR);
		   var obj17=Ext.getCmp('ELEVATOR_MARK');
		   obj17.setValue(list2[0].ELEVATOR_MARK);
		   var obj18=Ext.getCmp('ELEVATOR_STOP');
		   obj18.setValue(list2[0].ELEVATOR_STOP);
		   var obj19=Ext.getCmp('ELEVATOR_TYPE');
		   obj19.setValue(list2[0].ELEVATOR_TYPE);
		   var obj20=Ext.getCmp('EQU_CODE');
		//   obj20.setValue(list2[0].EQU_CODE);
		   var obj21=Ext.getCmp('GROUP_ID');
		   //obj21.setValue(list2[0].GROUP_ID);
		   var obj22=Ext.getCmp('GROUP_NAME');
		 //  obj22.setValue(list2[0].GROUP_NAME);
		   var obj23=Ext.getCmp('HIS_COUNT');
		   obj23.setValue(list2[0].HIS_COUNT);
		   var obj24=Ext.getCmp('IMPORTED_ASSET_NUM');
		//   obj24.setValue(list2[0].IMPORTED_ASSET_NUM);
		   var obj25=Ext.getCmp('INSPECT_DAY');
		  // obj25.setValue(list2[0].INSPECT_DAY);
		   var obj26=Ext.getCmp('INSPECT_MONTH');
		 //  obj26.setValue(list2[0].INSPECT_MONTH);
		   var obj27=Ext.getCmp('INSPECT_YEAR');
		 //  obj27.setValue(list2[0].INSPECT_YEAR);
		   var obj28=Ext.getCmp('INSTALL_CONTR_NUM');
		  // obj28.setValue(list2[0].INSTALL_CONTR_NUM);
		   var obj29=Ext.getCmp('PRODUCT');
		   obj29.setValue(list2[0].PRODUCT);
		   var obj30=Ext.getCmp('RUN_ENV');
		   obj30.setValue(list2[0].RUN_ENV);
		   var obj31=Ext.getCmp('RUN_FREQ');
		   obj31.setValue(list2[0].RUN_FREQ);
		   var obj32=Ext.getCmp('SBL_CREATION_DATE');
		//   obj32.setValue(list2[0].SBL_CREATION_DATE);
		   var obj33=Ext.getCmp('SBL_LAST_UPD_DATE');
		 //  obj33.setValue(list2[0].SBL_LAST_UPD_DATE);
		   var obj34=Ext.getCmp('SBL_ROW_ID');
		 //  obj34.setValue(list2[0].SBL_ROW_ID);
		   var obj35=Ext.getCmp('SPC_REQ');
		   obj35.setValue(list2[0].SPC_REQ);
		   var obj36=Ext.getCmp('SPECIAL_SIGN');
		   obj36.setValue(list2[0].SPECIAL_SIGN);
		   var obj37=Ext.getCmp('STATION_ID');
		   obj37.setValue(list2[0].STATION_ID);
		   var obj38=Ext.getCmp('STATION_ORG');
		 //  obj38.setValue(list2[0].STATION_ORG);
		   var obj39=Ext.getCmp('SVC_NUMBER');
		 //  obj39.setValue(list2[0].SVC_NUMBER);
		   var obj40=Ext.getCmp('SYNC_FLG');
		 //  obj40.setValue(list2[0].SYNC_FLG);
		   var obj41=Ext.getCmp('TECH_CERT_TIME');
		  // obj41.setValue(list2[0].TECH_CERT_TIME);
		   var obj42=Ext.getCmp('USED_CODE');
		   //obj42.setValue(list2[0].USED_CODE);
		   var obj43=Ext.getCmp('USE_ACCNT_CODE');
		 //  obj43.setValue(list2[0].USE_ACCNT_CODE);
		   var obj44=Ext.getCmp('SBL_ROW_ID');
		   //obj44.setValue(list2[0].USE_ACCNT_NAME);
		//   var obj6=Ext.getCmp('MAIN_PHONE_NUM');
		 //  obj6.setValue(list2[0].MAIN_PHONE_NUM);
		}).fail(function(err){
			//Ext.Msg.alert("查找失败");
			WL.Toast.show('查找失败!');
		});
	},

	//返回按钮
	ElevatorInformationList_id_FH_BUTTON:function(){
		this.showBackView('ElevatorInformation_id','HelcPDA.view.ElevatorInformation.ElevatorInformation');
	},
	/**
	 **电梯查询-列表 页面
	 ************************************************************************************/
	
	
	
	/************************************************************************************
	 * 电梯详细信息 页面
	 * */

	//返回按钮
	ElevatorInformation_v_id_FH_BUTTON:function(){
		this.showBackView('ElevatorInformationList_id','HelcPDA.view.ElevatorInformation.ElevatorInformationList'); 
	},
	
	/**
	 **电梯详细信息 页面
	 ************************************************************************************/
	
});
