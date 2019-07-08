
/* JavaScript content from app/controller/SynchronizationTable/SafeguardFivelegacyContent_QTBLXMCtrl.js in folder common */
Ext.define('HelcPDA.controller.SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		
		control:{
			"button#SafeguardFivelegacyContent_QTBLXM_id_QD":{
				tap:'SafeguardFivelegacyContent_QTBLXM_id_QD'
			},
			
			"textfield#MeasureBadItemResponseDivision":{
				tap:'MeasureBadItemResponseDivision'
			},
			
			"textfield#MeasureBadItemZGDivision":{
				tap:'MeasureBadItemZGDivision'
			},
			
			"textfield#MeasureBadItemRepPersonFullName":{
				tap:'MeasureBadItemRepPersonFullName'
			},
			
			"list#SafeguardFivelegacyContent_QTBLXM_List_id_list":{
				itemtap:'SafeguardFivelegacyContent_QTBLXM_List_id_list'
			},
			
			//来自Safeguard_GG_People_Select 页面的职位
			"textfield#MaintainingPosition":{
				tap:'MaintainingPosition'
			},
			
			
		}
	},

	//其他不良项目 删除
	SafeguardFivelegacyContent_QTBLXM_Delete:function(index,ID){
		var obj=this;
		
		Ext.Msg.confirm("注意","是否确认删除？",function(n){
			if(n=='no')return;
			
			if(ID==undefined){
				//遗留问题
				var QTBLXMlist=Ext.data.StoreManager.get('SynchronizationTable_QTBLXM_Store');
				if (!QTBLXMlist) { 
					QTBLXMlist = Ext.create("HelcPDA.store.SynchronizationTable.SynchronizationTable_QTBLXM_Store"); 
				};
				QTBLXMlist.removeAt(index);
				objectXcx.getController('SynchronizationTable.SafeguardOneQueryListCtrl').QTBLXMDelete='';
			}else{
				obj.SafeguardFivelegacyContent_QTBLXM_Delete_Original(obj,index,ID);
			}
		});
	},
	
	//其他不良项目 特殊删除
	SafeguardFivelegacyContent_QTBLXM_Delete_Original:function(obj,index,ID){
		//console.log('ID:'+ID);
		//传递值
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getHELMeasureOtherBadItemDelete';
		param.parameters=ID;
	
		var getResult = function(result){
			myLoading.hide();
			console.log(result);
			var Msg=result.Envelope.Body.HELMeasureOtherBadItemDelete_Output.ErrorMsg;
			if(Msg==''){
				//其他不良项目
				var QTBLXMstore=obj.getStore('SynchronizationTable_QTBLXM_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_QTBLXM_Store');
				QTBLXMstore.removeAt(index);
				objectXcx.getController('SynchronizationTable.SafeguardOneQueryListCtrl').QTBLXMDelete='';
			}else{
				obj.getWXTS('删除其他不良项目失败');
			}
			
		};
		obj.getSafeguard(getResult,param);
	},
	
	//确定
	SafeguardFivelegacyContent_QTBLXM_id_QD:function(){
	    var obj=this;
		var tj=Ext.getCmp('SafeguardFivelegacyContent_QTBLXM_id_QD').getText();
		cc.log(tj);
		//其他不良项目
		var QTBLXMstore=this.getStore('SynchronizationTable_QTBLXM_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_QTBLXM_Store');
		//取值
		var MeasureBadItemDesc=Ext.getCmp('MeasureBadItemDesc').getValue();
		var MeasureBadItemResponseDivision=Ext.getCmp('MeasureBadItemResponseDivision').getValue();
		var MeasureBadItemZGCompleteDatetime=Ext.getCmp('MeasureBadItemZGCompleteDatetime').getValue();
		var MeasureBadItemWorkTime=Ext.getCmp('MeasureBadItemWorkTime').getValue();
		var MeasureBadItemZGDivision=Ext.getCmp('MeasureBadItemZGDivision').getValue();
		var MeasureBadItemRepPersonFullName=Ext.getCmp('MeasureBadItemRepPersonFullName').getValue();
		var MeasureBadItemRepPersonFullName_ID=Ext.getCmp('MeasureBadItemRepPersonFullName_ID').getValue();
		var MeasureBadItemReCheckDatetime=Ext.getCmp('MeasureBadItemReCheckDatetime').getValue();
		var MeasureBadItemComments=Ext.getCmp('MeasureBadItemComments').getValue();
		//位置
		var index=Ext.getCmp('QTBLXM_Hidden_index').getValue();
		
		if(tj=='修改'){
			QTBLXMstore.getAt(index).set('MeasureBadItemDesc',MeasureBadItemDesc);
			QTBLXMstore.getAt(index).set('MeasureBadItemResponseDivision',MeasureBadItemResponseDivision);
			QTBLXMstore.getAt(index).set('MeasureBadItemZGCompleteDatetime',MeasureBadItemZGCompleteDatetime);
			QTBLXMstore.getAt(index).set('MeasureBadItemWorkTime',MeasureBadItemWorkTime);
			QTBLXMstore.getAt(index).set('MeasureBadItemZGDivision',MeasureBadItemZGDivision);
			QTBLXMstore.getAt(index).set('MeasureBadItemRepPersonFullName',MeasureBadItemRepPersonFullName);
			QTBLXMstore.getAt(index).set('MeasureBadItemResponsePersonId',MeasureBadItemRepPersonFullName_ID);
			QTBLXMstore.getAt(index).set('MeasureBadItemReCheckDatetime',MeasureBadItemReCheckDatetime);
			QTBLXMstore.getAt(index).set('MeasureBadItemComments',MeasureBadItemComments);
		}else if(tj=='保存'){
			QTBLXMstore.addData({
				MeasureBadItemDesc:MeasureBadItemDesc,
				MeasureBadItemResponseDivision:MeasureBadItemResponseDivision,
				MeasureBadItemZGCompleteDatetime:MeasureBadItemZGCompleteDatetime,
				MeasureBadItemWorkTime:MeasureBadItemWorkTime,
				MeasureBadItemZGDivision:MeasureBadItemZGDivision,
				MeasureBadItemRepPersonFullName:MeasureBadItemRepPersonFullName,
				MeasureBadItemResponsePersonId:MeasureBadItemRepPersonFullName_ID,
				MeasureBadItemReCheckDatetime:MeasureBadItemReCheckDatetime,
				MeasureBadItemComments:MeasureBadItemComments,
			});
		};
		this.BackView();
	},
	
	/**
	 * ---------------------责任和整改和职位 Start
	 */
	
	//责任部门
	MeasureBadItemResponseDivision:function(textfield){
		var obj=this;
		//jsonStore查询和增加条件
		var query={tcode:'Safeguard',tid:'HEL_MEAITEM_REPDIV'};
		//查询数据的方法
		var FangFa=function(obj,query){
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getResponsibleDepartment_AND_RectificationDepartment(obj,query);
		};
		//添加数据的方法
		var FangFaTwo=function(result){
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSafeguardFivelegacyContent_QTBLXM_List(result);
		};
		//接口查询条件
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').TypeFive='HEL_MEAITEM_REPDIV';
		//返回值所在位置
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Name='MeasureBadItemResponseDivision';
		//用于判断在getSafeguardFivelegacyContent_QTBLXM_List 方法中的逻辑
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Flag='A';
		//调用jsonStore查询方法 (传递当前方法所在对象obj,jsonStore查询条件)
		obj.getSelectfield(obj,query,FangFa,FangFaTwo);
	},
	
	//整改部门
	MeasureBadItemZGDivision:function(textfield){
		var obj=this;
		//jsonStore查询和增加条件
		var query={tcode:'Safeguard',tid:'HEL_MEAITEM_ZGDIV'};
		//查询数据的方法
		var FangFa=function(obj,query){
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getResponsibleDepartment_AND_RectificationDepartment(obj,query);
		};
		//添加数据的方法
		var FangFaTwo=function(result){
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSafeguardFivelegacyContent_QTBLXM_List(result);
		};
		//接口查询条件
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').TypeFive='HEL_MEAITEM_ZGDIV';
		//返回值所在位置
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Name='MeasureBadItemZGDivision';
		//用于判断在getSafeguardFivelegacyContent_QTBLXM_List 方法中的逻辑
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Flag='A';
		//调用jsonStore查询方法 (传递当前方法所在对象obj,jsonStore查询条件)
		obj.getSelectfield(obj,query,FangFa,FangFaTwo);
	},
	
	//Safeguard_GG_People_Select页面  职位
	MaintainingPosition:function(){
		var obj=this;
		//jsonStore查询和增加条件
		var query={tcode:'Safeguard',tid:'HEL_MAINTAINING_POSITION'};
		//查询数据的方法
		var FangFa=function(obj,query){
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getResponsibleDepartment_AND_RectificationDepartment(obj,query);
		};
		//添加数据的方法
		var FangFaTwo=function(result){
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSafeguardFivelegacyContent_QTBLXM_List(result);
		};
		//接口查询条件
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').TypeFive='HEL_MAINTAINING_POSITION';
		//返回值所在位置
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Name='MaintainingPosition';
		//用于判断在getSafeguardFivelegacyContent_QTBLXM_List 方法中的逻辑
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Flag='A';
		//调用jsonStore查询方法 (传递当前方法所在对象obj,jsonStore查询条件)
		obj.getSelectfield(obj,query,FangFa,FangFaTwo);
	},
	
	//公共方法
	getResponsibleDepartment_AND_RectificationDepartment:function(obj,query){
		console.log('------------111111');
		console.log(query);
		//参数
		var paramData={};
		paramData.Type=query.tid;
		//传递值
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getEAILOVGetListOfValues';
		param.parameters=paramData;
		
		console.log('提交的值----------------');
		console.log(param);
		var getResult = function(result){
			myLoading.hide();
			console.log(result);
			//填值
			obj.getSafeguardFivelegacyContent_QTBLXM_List(result);
			//添加
			query.stext=result;
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSelectfield_Add(query);
		};
		obj.getSafeguard(getResult,param);
	},
	
	
	/**
	 * ---------------------责任和整改和职位 End
	 */
	
	
	//整改责任人
	MeasureBadItemRepPersonFullName:function(textfield){
		this.NextView('Safeguard_GG_People_Select_id','HelcPDA.view.SynchronizationTable.Safeguard_GG_People_Select');
		Ext.getCmp('Safeguard_GG_People_Select_id_Toolbar').setTitle('整改责任人查询');
		Ext.getCmp('GG_People_Name').setValue('MeasureBadItemRepPersonFullName');
		Ext.getCmp('GG_People_Name_ID').setValue('MeasureBadItemRepPersonFullName_ID');
	},

	/**
	 * 公共下拉列表页面   Start
	 */
	//添加下拉列表的值
	getSelectfield:function(obj,query,FangFa,FangFaTwo){
		var obj=this;
		var MaintainList=WL.JSONStore.get(collectionName);
		var options={
			exacte:false,//默认
		};
		console.log('------------22222');
		console.log(query);
		MaintainList.find(query,options).then(function(arrayResults){
			console.log('第一步,判断所求数据是否存在jsonStore中');
			var dataNum=arrayResults.length;
			if(dataNum==0){
				console.log('如果不存在,那么调用传递过来的查询方法');
				FangFa(obj,query);
			}else{
				console.log('如果存在,那么调用传递过来的填值方法');
				console.log(arrayResults[0].json.stext);
				var result=arrayResults[0].json.stext
				FangFaTwo(result);
			};
			console.log(dataNum);
			console.log(arrayResults);
		}).fail(function(errorObject){
			console.log('JsonStore失败,重新查询');
			FangFa(obj,query);
			//WL.Toast.show("JsonStore失败,重新查询！");
		});
	},
	
	getSelectfield_Add:function(query){
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
		MaintainList.add(query).then(function(){
			console.log('添加下拉值成功');
		}).fail(function(errorObject){
			console.log('添加下拉列表值失败');
			//WL.Toast.show("添加下拉列表值失败！");
		});
	},
	
	//在 SafeguardFivelegacyContent_QTBLXM_List 显示下拉列表的值
	getSafeguardFivelegacyContent_QTBLXM_List:function(result){
		this.NextView('SafeguardFivelegacyContent_QTBLXM_List_id','HelcPDA.view.SynchronizationTable.SafeguardFivelegacyContent_QTBLXM_List');
		var Flag=objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Flag;
		//填值
		var list=this.getStore('SynchronizationTable_QTBLXM_List_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_QTBLXM_List_Store');
		if(Flag=='A'){//责任和整改和职位
			var Data=result.Envelope.Body.EAILOVGetListOfValues_Output.ListsResult.ListResult.ListValuesResult.ListValueResult;
			list.setData(Data);
			var TypeFive=objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').TypeFive;
			console.log(TypeFive);
			if(TypeFive=='HEL_MEAITEM_REPDIV'){//责任
				Ext.getCmp('SafeguardFivelegacyContent_QTBLXM_List_id_toolbar').setTitle('责任部门');
			};
			if(TypeFive=='HEL_MEAITEM_ZGDIV'){//整改
				Ext.getCmp('SafeguardFivelegacyContent_QTBLXM_List_id_toolbar').setTitle('整改部门');
			};
			if(TypeFive=='HEL_MAINTAINING_POSITION'){//职位
				Ext.getCmp('SafeguardFivelegacyContent_QTBLXM_List_id_toolbar').setTitle('职位');
			};
		};
		if(Flag=='B'){//所属司和所属站
			var FlagPeople=objectXcx.getController('SynchronizationTable.Safeguard_GG_People_SelectCtrl').FlagPeople;
			if(FlagPeople=='所属司'){
				Ext.getCmp('SafeguardFivelegacyContent_QTBLXM_List_id_toolbar').setTitle('所属司');
			};
			if(FlagPeople=='所属站'){
				Ext.getCmp('SafeguardFivelegacyContent_QTBLXM_List_id_toolbar').setTitle('所属站');
			}
			if(FlagPeople=='所属片'){
				Ext.getCmp('SafeguardFivelegacyContent_QTBLXM_List_id_toolbar').setTitle('所属片');
			}
			if(FlagPeople=='所属组'){
				Ext.getCmp('SafeguardFivelegacyContent_QTBLXM_List_id_toolbar').setTitle('所属组');
			}
			console.log(FlagPeople+'----------');
			console.log(result);
			list.setData(result);
		};
	},

	//SafeguardFivelegacyContent_QTBLXM_List 返回值
	SafeguardFivelegacyContent_QTBLXM_List_id_list:function(obj,index,target,record,e,eOpts){
		this.BackView();
		
		var Flag=objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Flag;
		if(Flag=='A'){//责任和整改和职位
			console.log(record.data.DisplayValue);
			var name=objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Name;
			Ext.getCmp(name).setValue(record.data.DisplayValue);
		}else if(Flag=='B'){
			console.log(record.data.Name);
			var FlagPeople=objectXcx.getController('SynchronizationTable.Safeguard_GG_People_SelectCtrl').FlagPeople;
			if(FlagPeople=='所属司'){
				Ext.getCmp('CompanyName').setValue(record.data.Name);
				Ext.getCmp('CompanyName_ID').setValue(record.data.Id);
			}
			if(FlagPeople=='所属站'){
				Ext.getCmp('StationName').setValue(record.data.Name);
				Ext.getCmp('StationName_ID').setValue(record.data.Id);
			}
			if(FlagPeople=='所属片'){
				Ext.getCmp('AreaName').setValue(record.data.AreaName);
				Ext.getCmp('AreaName_ID').setValue(record.data.Id);
			}
			if(FlagPeople=='所属组'){
				Ext.getCmp('GroupName').setValue(record.data.GroupName);
				Ext.getCmp('GroupName_ID').setValue(record.data.Id);
			}
		};
		//清楚数据，确保来源正确
		var list=obj.getStore('SynchronizationTable_QTBLXM_List_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_QTBLXM_List_Store');
		list.removeAll();
	},
	
	/**
	 * 公共下拉列表页面   End
	 */
});