/**2017-3-7 对项目的理解
 * 备注：
 * 1.保障表的作业内容在手机上是获取的，没法手动新建，对获取的作业内容添加作业前和作业后
 * 2.在要使用SafeguardName字段的监视器都会有这段,SafeguardName=objectXcx.getController('HelcPDA.controller.MenusViewCtrl').SafeguardName;
 */
Ext.define('HelcPDA.controller.SynchronizationTable.SafeguardOneQueryListCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		
		control:{
			"button#Safeguard_FH":{
				tap:'Safeguard_FH_TS'
			},
			
			"list#SafeguardOneQueryList_id_List":{
				itemtap:'SafeguardOneQueryList_id_List'
			},
			
			"button#SafeguardTwoContent_id_FH":{
				tap:'Safeguard_FH'
			},
			
			"button#SafeguardFivelegacyContent_YLWT_id_FH":{
				tap:'Safeguard_FH'
			},
			
			"button#Safeguard_GG_XMH_Select_id_FH":{
				tap:'Safeguard_FH'
			},
			
			"button#Safeguard_GG_XMH_id_FH":{
				tap:'Safeguard_FH'
			},
			
			"button#SafeguardFourRecordContent_ZYXM_id_FH":{
				tap:'Safeguard_FH'
			},
			
			"button#SafeguardFourRecordContent_ZYXM_List_id_FH":{
				tap:'Safeguard_FH'
			},
			
			"button#SafeguardFourRecordContent_FJ_Img_id_FH":{
				tap:'Safeguard_FH'
			},
			
			"button#SafeguardFivelegacyContent_QTBLXM_id_FH":{
				tap:'Safeguard_FH'
			},
			
			"button#SafeguardFivelegacyContent_QTBLXM_List_id_FH":{
				tap:'Safeguard_FH'
			},
			
			"button#Safeguard_GG_People_Select_id_FH":{
				tap:'Safeguard_FH'
			},
			"button#Safeguard_GG_No_Select_id_FH":{
				tap:'Safeguard_FH'
			},
			
			"button#SafeguardOneQuerySearch_id_FH":{
				tap:'Safeguard_FH'
			},
			
			"button#SafeguardOneQuerySearch_id_FH":{
				tap:'Safeguard_FH'
			},
			
			"button#SafeguardOneQuerySearch_id_CX":{
				tap:'SafeguardOneQuerySearch_id_CX'
			},
			
			
		}
	},

	
	//返回特殊 SafeguardOneQueryList独用
	Safeguard_FH_TS:function(){
		if(Safeguard_FH_TEXT=='上一级'){
			//显示
			var store;
			if(SafeguardName=='保障表'){
				store=this.getStore('SynchronizationTable_BZB_list_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_BZB_list_Store');
			}else if(SafeguardName=='接梯表'){
				store=this.getStore('SynchronizationTable_JTB_list_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_JTB_list_Store');
			};
			store.setData(NewTaskName);
			Safeguard_FH_TEXT='返回';
			Ext.getCmp('Safeguard_FH').setText('返回');
		}else{
			this.BackView();
		};
		
	},
	
	//返回  整个模块公用
	Safeguard_FH:function(){
		this.BackView();
	},
	
	/**
	 * -----------表页面初始化 Star
	 */
	
	//表页面初始化
	SafeguardOneQueryListInitialization : function(){
		var obj=this;
		obj.NextView('SafeguardOneQuerySearch_id','HelcPDA.view.SynchronizationTable.SafeguardOneQuerySearch');
		
		if(SafeguardName=='保障表'){
			Ext.getCmp('SafeguardOneQuerySearch_id_toolbar').setTitle('查询保障表');
		}else if(SafeguardName=='接梯表'){
			Ext.getCmp('SafeguardOneQuerySearch_id_toolbar').setTitle('查询接梯表');
		};
		
	},
	
	//查询
	SafeguardOneQuerySearch_id_CX:function(){
		var obj=this;
		var AgreementNumber=Ext.getCmp('AgreementNumber').getValue();
		var AssetNumber=Ext.getCmp('AssetNumber').getValue();
		var StationName=Ext.getCmp('StationName').getValue();
		
		//userid='1-OU80SB';
		
		/*var tj="[HEL Maintaining Plan Action Task.HEL AgreementNumber]='ZKT1704001' AND "+
		  "[HEL Maintaining Plan Action Task.HEL Asset Number]='zkt170401' AND  "+
		 "[HEL Maintaining Plan Action Task.Hold Station Name] ='昌平站'  AND   "+
		 "[HEL Maintaining Plan Action Task.Task Type]='保障表' AND "+
		  "[HEL Maintaining Plan Action Task.Task Status]='未完成' AND"+
		 "[HEL Maintaining Plan Action Task.HEL BZ Per Id] = '1-OU80SB'";*/
		
		var tj='';
		if(SafeguardName=='保障表'){
			tj+="[HEL Maintaining Plan Action Task.Task Type]='保障表' AND ";
		}else if(SafeguardName=='接梯表'){
			tj+="[HEL Maintaining Plan Action Task.Task Type]='接梯表' AND ";
		};
		tj+="[HEL Maintaining Plan Action Task.Task Status]='未完成' AND "+
		    "[HEL Maintaining Plan Action Task.HEL BZ Per Id] = '"+userid+"'";
		 
		if(AgreementNumber){
			tj+=" AND [HEL Maintaining Plan Action Task.HEL AgreementNumber] like '*"+AgreementNumber+"*'";
		}
		if(AssetNumber){
			tj+=" AND [HEL Maintaining Plan Action Task.HEL Asset Number] like '*"+AssetNumber+"*'";
		}
		if(StationName){
			tj+=" AND [HEL Maintaining Plan Action Task.Hold Station Name] like '*"+StationName+"*'";
		}
		
		//条件
		var param={};
		if(SafeguardName=='保障表'){
			param=obj.SafeguardOneQueryListInitialization_BZB_Condition();
		}else if(SafeguardName=='接梯表'){
			param=obj.SafeguardOneQueryListInitialization_JTB_Condition();
		};
		param.parameters.SearchSpec=tj;
		var getResult = function(result){
			myLoading.hide();
			console.log(result);
			obj.NextView('SafeguardOneQueryList_id','HelcPDA.view.SynchronizationTable.SafeguardOneQueryList');
			//全局  分辨是保障表还是阶梯表
			SafeguardName=objectXcx.getController('HelcPDA.controller.MenusViewCtrl').SafeguardName;
			//全局  分辨是返回还是返回上一层
			Safeguard_FH_TEXT=Ext.getCmp('Safeguard_FH').getText();
			
			if(SafeguardName=='保障表'){
				obj.SafeguardOneQueryListInitialization_BZB_Result(obj,result);
			}else if(SafeguardName=='接梯表'){
				obj.SafeguardOneQueryListInitialization_JTB_Result(obj,result);
			};
			
		};
		
		console.log('条件-------------');
		console.log(param);
		//return;
		obj.getSafeguard(getResult,param);
	},
	
	//保障表 条件
	SafeguardOneQueryListInitialization_BZB_Condition:function(){
		//条件
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getBZMeasureQuery';
		param.parameters={
			SearchSpec:'',
			ViewMode:'All',
		};
		return param;
	},
	
	//阶梯表 条件
	SafeguardOneQueryListInitialization_JTB_Condition:function(){
		//条件
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getJTMeasureQuery';
		param.parameters={
			SearchSpec:'',
			ViewMode:'All',
		};
		return param;
	},
	
	//保障表 结果
	SafeguardOneQueryListInitialization_BZB_Result:function(obj,result){
		Ext.getCmp('Safeguard1QueryList_id_Toolbar').setTitle('保障列表');
		//显示
		var store = Ext.data.StoreManager.get('SynchronizationTable_BZB_list_Store');
		if(!store){
			store = Ext.create('HelcPDA.store.SynchronizationTable.SynchronizationTable_BZB_list_Store');
		};
		var Data=[];
		store.setData(Data);
		//列表
		var list=Ext.getCmp('SafeguardOneQueryList_id_List');
		var tpl=[
                 '<div>'+
                 '<div style="width:100%;float:left;font-size:13px;">{TaskName}</div>'+
                 '</div>',
             ];
		list.setItemTpl(tpl);
		list.setStore('SynchronizationTable_BZB_list_Store');
		
		try{
			var num=result.Envelope.Body.BZMeasureQuery_Output.NumOutputObjects;
			if(num==0){
				obj.getWXTS('查无数据');
				return;
			};
			if(num==1){
				Data=[result.Envelope.Body.BZMeasureQuery_Output.ListOfHelMeasureLiftelevatorBz.HelMaintainingPlanActionTask];
			}else{
				Data=result.Envelope.Body.BZMeasureQuery_Output.ListOfHelMeasureLiftelevatorBz.HelMaintainingPlanActionTask;
			};
			
		}catch(e){
			WL.Toast.show('服务器繁忙,查询数据出错，请稍后重试！');
			obj.BackView();
			return;
		};
		
		//存放
		var Stored=obj.getStore('SynchronizationTable_BZB_Stored_list_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_BZB_Stored_list_Store');
		Stored.setData(Data);
		//全局  查询出的数据
		Stored_CF=Data;
		
		//去重复
		var TaskNameNumber=[];
		for(var i=0;i<num;i++){
			TaskNameNumber[i]=Data[i].TaskName;
		};
		//console.log(num);
		var OnlyTaskName=TaskNameNumber.unique3();
		//全局  装载第一层数据
		NewTaskName=[];
		for(var j=0;j<OnlyTaskName.length;j++){
			NewTaskName[j]={'TaskName':OnlyTaskName[j]};
		};
		
		store.setData(NewTaskName);
	},
	
	//阶梯表 结果
	SafeguardOneQueryListInitialization_JTB_Result:function(obj,result){
		Ext.getCmp('Safeguard1QueryList_id_Toolbar').setTitle('接梯列表');
		//显示
		var store = Ext.data.StoreManager.get('SynchronizationTable_JTB_list_Store');
		if(!store){
			store = Ext.create('HelcPDA.store.SynchronizationTable.SynchronizationTable_JTB_list_Store');
		};
		var Data=[];
		store.setData(Data);
		
		//显示
		var list=Ext.getCmp('SafeguardOneQueryList_id_List');
		var tpl=[
                 '<div>'+
                 '<div style="width:100%;float:left;font-size:13px;">{TaskName}</div>'+
                 '</div>',
             ];
		list.setItemTpl(tpl);
		list.setStore('SynchronizationTable_JTB_list_Store');
		
		try{
			var num=result.Envelope.Body.JTMeasureQuery_Output.NumOutputObjects;
			if(num==0){
				obj.getWXTS('查无数据');
				return;
			};
			if(num==1){
				Data=[result.Envelope.Body.JTMeasureQuery_Output.ListOfHelEaiPdaMeasure.HelMeasureList];
			}else{
				Data=result.Envelope.Body.JTMeasureQuery_Output.ListOfHelEaiPdaMeasure.HelMeasureList;
			};
			
		}catch(e){
			WL.Toast.show('服务器繁忙,查询数据出错，请稍后重试！');
			obj.BackView();
			return;
		};
		
		//存放
		var Stored=obj.getStore('SynchronizationTable_JTB_Stored_list_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_JTB_Stored_list_Store');
		Stored.setData(Data);
		//全局  查询出的数据
		Stored_CF=Data;
		
		//去重复
		var TaskNameNumber=[];
		for(var i=0;i<num;i++){
			TaskNameNumber[i]=Data[i].TaskName;
		};
		//console.log(num);
		var OnlyTaskName=TaskNameNumber.unique3();
		//全局  装载第一层数据
		NewTaskName=[];
		for(var j=0;j<OnlyTaskName.length;j++){
			NewTaskName[j]={'TaskName':OnlyTaskName[j]};
		};
		
		store.setData(NewTaskName);

	},
	
	/**
	 * -----------表页面初始化 End
	 */
	
	
	//list
	SafeguardOneQueryList_id_List:function(obj,index,target,record,e,eOpts){
		
		var obj=this;
		if(Safeguard_FH_TEXT=='返回'){
			//全局  分辨是返回还是返回上一层
			Safeguard_FH_TEXT='上一级';
			Ext.getCmp('Safeguard_FH').setText('上一级');
			
			
			if(SafeguardName=='保障表'){
				getBZB(obj);
			}else if(SafeguardName=='接梯表'){
				getJTB(obj);
			};
			
			//保障表
			function getBZB(obj){
				//存放
				var Stored=obj.getStore('SynchronizationTable_BZB_Stored_list_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_BZB_Stored_list_Store');
				//显示
				var store=obj.getStore('SynchronizationTable_BZB_list_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_BZB_list_Store');
				//console.log(Stored.getData());
				var xs=[];
				var num=0;
				for(var i=0;i<Stored.getCount();i++){
					//console.log(Stored.getData().items[i].data.TaskName);
					if(Stored.getData().items[i].data.TaskName==record.data.TaskName){
						xs[num]=Stored.getData().items[i].data;
						num++;
					}
				};
				//console.log('-------------------------------------');
				//console.log(Stored.getData().items[0].data.TaskName);
				//console.log(record.data.TaskName);
				//console.log(xs);
				store.setData(xs);
			};
			
			//阶梯表
			function getJTB(obj){
				//存放
				var Stored=obj.getStore('SynchronizationTable_JTB_Stored_list_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_JTB_Stored_list_Store');
				//显示
				var store=obj.getStore('SynchronizationTable_JTB_list_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_JTB_list_Store');
				var xs=[];
				var num=0;
				for(var i=0;i<Stored.getCount();i++){
					if(Stored.getData().items[i].data.TaskName==record.data.TaskName){
						xs[num]=Stored.getData().items[i].data;
						num++;
					}
				};
				store.setData(xs);
			};
			
			return;
		};
		
		obj.NextView('SafeguardTwoContent_id','HelcPDA.view.SynchronizationTable.SafeguardTwoContent');
		console.log(record);
		/**
		 * 信息内容
		 */
		//ID
		Ext.getCmp('SafeguardTwoContent_Hidden_ID').setValue(record.data.Id);
		//alert(record.data.Id);
		//测量标名
		Ext.getCmp('SafeguardTwoContent_TaskName').setValue(record.data.TaskName);
		//类型
		Ext.getCmp('SafeguardTwoContent_TaskType').setValue(record.data.TaskType);
		//来源
		Ext.getCmp('SafeguardTwoContent_MeasureSource').setValue(record.data.MeasureSource);
		//页面格式变化
		this.getTabpanelBaryiety();
		//填充值
		this.getTableValue(record);
		//激活表判断
		objectXcx.getController('SynchronizationTable.SafeguardTwoContentCtrl').getBzbandJsq();
		
	},

	//页面格式变化
	getTabpanelBaryiety:function(){
		//显示页签
		var Table=Ext.getCmp('SafeguardTwoContent_id_Container_Tabpanel');
		var tab=Table.getInnerItems();
		Table.setActiveItem(tab[0]);
		
		if(SafeguardName=='保障表'){
			Ext.getCmp('SafeguardTwoContent_id_toolbar').setTitle('保障表内容');
			Table.getTabBar().getComponent(2).show();
			
			//作业项目 列表
			var list=Ext.getCmp('SafeguardTwoContent_id_list_ZYXM');
			var tpl=[
			         '<div>{MeasureItemName}</div>'
	             ];
			list.setItemTpl(tpl);
			list.setStore('SynchronizationTable_ZYXM_Store');
			
		}else if(SafeguardName=='接梯表'){
			Ext.getCmp('SafeguardTwoContent_id_toolbar').setTitle('接梯表内容');
			Table.getTabBar().getComponent(3).show();
			
			//作业项目 列表
			var list=Ext.getCmp('SafeguardTwoContent_id_list_ZYXM');
			var tpl=[
			         '<div>{MeasureItemContent}</div>'
	             ];
			list.setItemTpl(tpl);
			list.setStore('SynchronizationTable_ZYXM_JTB_Store');
		}
	},

	//填充值
	getTableValue:function(record){
		if(SafeguardName=='保障表'){
			/**
			 * 作业项目
			 */
			try{
				var ZYXMlist=Ext.data.StoreManager.get('SynchronizationTable_ZYXM_Store');
				if (!ZYXMlist) { 
					ZYXMlist = Ext.create("HelcPDA.store.SynchronizationTable.SynchronizationTable_ZYXM_Store"); 
				};
				
				var ZYXMData=record.data.ListOfHelMeasureItemList.HelMeasureItemList;
				
				//console.log(ZYXMData);
				var ZYXMDataNum=ZYXMData.length;
				//console.log('作业项目的长度：'+ZYXMDataNum);
				var ZYXMNumber=[];//作业项目
				/*//单个
				if(ZYXMDataNum==undefined){
					//作业项目
					ZYXMNumber[0]=record.data.ListOfHelMeasureItemList.HelMeasureItemList;
				}
				//多个
				var num=0;
				for(var i=0;i<ZYXMDataNum;i++){
					ZYXMNumber[num]=ZYXMData[i];
					num++;
				};*/
				ZYXMlist.setData(ZYXMData);
				
				//console.log('作业项目-----------');
				//console.log(ZYXMNumber);
				//console.log(ZYXMNumber.length);
				
			}catch(e){
				//WL.Toast.show('获取作业项目数据出错，请重试!');
				console.log('获取作业项目数据出错，请重试!');
			}
			
			
			/**
			 * 遗留问题
			 */
			try{
				//console.log('遗留问题--------------');
				//console.log(record.data.ListOfHelMeasureLegacy);
				var YLWTlist=Ext.data.StoreManager.get('SynchronizationTable_YLWT_Store');
				if (!YLWTlist) { 
					YLWTlist = Ext.create("HelcPDA.store.SynchronizationTable.SynchronizationTable_YLWT_Store"); 
				};
				YLWTlist.setData(record.data.ListOfHelMeasureLegacy.HelMeasureLegacy);
				
				//遗留问题list 左滑删除
				var YLWT_LeftDelete = Ext.getCmp('SafeguardTwoContent_id_list_YLWT');
				YLWT_LeftDelete.setPlugins(
					//左滑动
					{
						xclass: 'ux.SlideActions',
		                openPosition: 100,
		                buttons:[{
		                	xtype: 'button',
		                	baseCls: 'x-button liftnet-list-button liftnet-bgColor-blue',
		                	text: '删除',
		                	initial: function(button) {
		                	},
		                	listeners: {
		                		tap: function(button, e){
		                			//删除
		                			objectXcx.getController('SynchronizationTable.SafeguardOneQueryListCtrl').YLWTDelete='删除';
		                            //用于回退，防止单击会调用list的方法
		                            //e.stopPropagation();
		                            //return false;
		                		},
		                		scope: this
		                	},
		                	//按钮单击
		                	handler: function(button, e) {
		                		YLWT_LeftDelete.fireEvent('hide'); // 隐藏列表的滑动按钮组
		                	}
		            },]
		        });
			}catch(e){
				WL.Toast.show('获取遗留问题数据出错，请重试!');
			}
			
		}else if(SafeguardName=='接梯表'){
			/**
			 * 作业项目
			 */
			try{
				console.log('作业项目--------------');
				var ZYXM_JTBstore=this.getStore('SynchronizationTable_ZYXM_JTB_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_ZYXM_JTB_Store');
				ZYXM_JTBstore.setData(record.data.ListOfHelMeasureItemList.HelMeasureItemList);
			}catch(e){
				WL.Toast.show('获取作业项目数据出错，请重试!');
			}
			/**
			 * 其他不良项目
			 */
			try{
				console.log('其他不良项目--------------');
				var QTBLXMstore=this.getStore('SynchronizationTable_QTBLXM_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_QTBLXM_Store');
				QTBLXMstore.setData(record.data.ListOfHelMeasureBaditemList.HelMeasureBaditemList);
				//其他不良项目list 左滑删除
				var QTBLXM_LeftDelete = Ext.getCmp('SafeguardTwoContent_id_list_QTBLXM');
				QTBLXM_LeftDelete.setPlugins(
					//左滑动
					{
						xclass: 'ux.SlideActions',
		                openPosition: 100,
		                buttons:[{
		                	xtype: 'button',
		                	baseCls: 'x-button liftnet-list-button liftnet-bgColor-blue',
		                	text: '删除',
		                	initial: function(button) {
		                	},
		                	listeners: {
		                		tap: function(button, e){
		                			//删除
		                			objectXcx.getController('SynchronizationTable.SafeguardOneQueryListCtrl').QTBLXMDelete='删除';
		                            //用于回退，防止单击会调用list的方法
		                            //e.stopPropagation();
		                            //return false;
		                		},
		                		scope: this
		                	},
		                	//按钮单击
		                	handler: function(button, e) {
		                		QTBLXM_LeftDelete.fireEvent('hide'); // 隐藏列表的滑动按钮组
		                	}
		            },]
		        });
				
			}catch(e){
				WL.Toast.show('获取其他不良项目数据出错，请重试!');
			}
			
		};
	},
	
	
});

Array.prototype.unique3 = function(){
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++){
		if(!json[this[i]]){
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res;
};