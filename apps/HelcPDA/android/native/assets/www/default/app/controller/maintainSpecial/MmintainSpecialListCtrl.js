
/* JavaScript content from app/controller/maintainSpecial/MmintainSpecialListCtrl.js in folder common */
Ext.define('HelcPDA.controller.maintainSpecial.MmintainSpecialListCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		control:{
			//返回主页
			"button#ZXBZ_back_to_menu":{
				tap:'ZXBZ_back_to_menu'
			},
			//进入查询页面
			"button#btn_ZXBZ_search":{
				tap:'btn_ZXBZ_search'
			},
			//返回到专项保障首页
			"button#back_to_MSList":{
				tap:'back_to_MSList'
			},
			//按条件查找符合的数据
			"button#ms_search_info":{
				tap:'ms_search_info'
			},
			//已工号作为条件确定搜索
			"button#ms_sureSearch":{
				tap:'ms_sureSearch'
			},
			//点击list填写到文本框中
			"list#serach_AssetNumList":{
				itemtap:'serach_AssetNumList'
			},
			//查询的开始时间
			"datepickerfield#ms_START_DATE":{
				change:'ms_START_DATE'
			},
			//查询的结束时间
			"datepickerfield#ms_END_DATE":{
				change:'ms_END_DATE'
			},
			
		}
	},
	
	ms_START_DATE : function(obj, newDate, oldDate, eOpts){
		var END_DATE = Ext.getCmp("ms_END_DATE").getValue();
		if(Date.parse(newDate)>Date.parse(END_DATE)){
			WL.Toast.show("开始时间不能大于结束时间");
			Ext.getCmp("ms_START_DATE").setValue(oldDate);
			return;
		}
	},
	
	ms_END_DATE : function(obj, newDate, oldDate, eOpts){
		var START_DATE = Ext.getCmp("ms_START_DATE").getValue();
		if(Date.parse(newDate)<Date.parse(START_DATE)){
			WL.Toast.show("结束时间不能小于开始时间");
			Ext.getCmp("ms_END_DATE").setValue(oldDate);
			return;
		}
		if(Date.parse(newDate)>Date.parse(new Date())){
			WL.Toast.show("结束时间不能大于当前时间");
			Ext.getCmp("ms_END_DATE").setValue(oldDate);
			return;
		}
	},
	
	ZXBZ_back_to_menu : function(){
		this.BackView();
//		this.showBackView("MenusView_id","HelcPDA.view.MenusView");
	},
	
	btn_ZXBZ_search : function(){
		this.NextView('MmintainSpecialSearch_V_id','HelcPDA.view.maintainSpecial.MmintainSpecialSearch_V');
	},
	
	back_to_MSList : function(){
		this.showBackView("MmintainSpecialList_V_id","HelcPDA.view.maintainSpecial.MmintainSpecialList_V");
	},
	
	ms_search_info : function(){
		var obj = this;
		var AGREE_NUM = Ext.getCmp('ms_AGREE_NUM').getValue();
		var ASSET_NUM = Ext.getCmp('ms_ASSET_NUM').getValue();
		var ACCNT = Ext.getCmp('ms_ACCNT').getValue();
		var DOMAIN = Ext.getCmp('ms_DOMAIN').getValue();
		var COMPANY = Ext.getCmp('ms_COMPANY').getValue();
		var STATION = Ext.getCmp('ms_STATION').getValue();
		var FAULT_TYPE=Ext.getCmp('ms_FAULT_TYPE').getValue();
		var START_DATE = "";
		var END_DATE = "";
		if(Ext.getCmp('ms_START_DATE').getValue()!=null){
			START_DATE = Ext.Date.format(Ext.getCmp('ms_START_DATE').getValue(),'Y-m-d');
		}
		if(Ext.getCmp('ms_END_DATE').getValue()!=null){
			END_DATE = Ext.Date.format(Ext.getCmp('ms_END_DATE').getValue(),'Y-m-d');
		}
		
		contentdata={FAULT_TYPE:FAULT_TYPE,HQFlag:HQFlag,AGREE_NUM:AGREE_NUM,ASSET_NUM:ASSET_NUM,ACCNT:ACCNT,DOMAIN:DOMAIN,
				COMPANY:COMPANY,STATION:STATION,USERID:userid,START_DATE:START_DATE,END_DATE:END_DATE};
		var content= JSON.stringify(contentdata);
		
		var getResult=function(res){
			if(res.rows.length==0){
				WL.Toast.show("找不到对应数据！");
				return;
			};
			
			var PanelId='AssetNumlistPanel';
        	var ListArray={};
        	ListArray.id='serach_AssetNumList';
        	ListArray.StoreName='AssetNumStore';
        	ListArray.StoreFullName='HelcPDA.store.maintainSpecial.AssetNumStore';
        	ListArray.StoreParam=["ASSET_NUM"];
        	var Data=res.rows;
        	obj.getList(PanelId,ListArray,Data);
         };
		
		this.connectServer(getResult, 'maintainSpecialAction.do?method=toSearch_Asset_num', content);
	},
	
	ms_sureSearch : function(){
		var obj = this;
		var ASSET_NUM = Ext.getCmp('ms_ASSET_NUM').getValue();
		var FAULT_TYPE=Ext.getCmp('ms_FAULT_TYPE').getValue();
		if(ASSET_NUM==""){
			WL.Toast.show('请输入工号');
			return;
		}
		obj.BackView();
		obj.LoadList(obj,ASSET_NUM,FAULT_TYPE);
	},
	
	
	LoadList : function(obj,ASSET_NUM,FAULT_TYPE){
		var MmintainSpecialStore = this.getStore('MmintainSpecialStore','HelcPDA.store.maintainSpecial.MmintainSpecialStore');
		//MmintainSpecialStore.setData([]);
		
		contentdata={ASSET_NUM:ASSET_NUM,FAULT_TYPE:FAULT_TYPE};
		var getResult=function(res){
        	var data = res.rows;
        	var storeData = [];
        	for(var i = 0; i<data.length; i++){
        		var temp={};
        		if(typeof(data[i].ACTUAL_DATE)=="undefined"){
        			temp.ACTUAL_DATE = "";
        		}else{
        			temp.ACTUAL_DATE = Ext.Date.format(new Date(data[i].ACTUAL_DATE),'Y-m-d');
        		}
        		temp.ASSET_NUM = data[i].ASSET_NUM;
        		temp.AGREE_NUM = data[i].AGREE_NUM;
        		temp.JMJX_FLAG = data[i].JMJX_FLAG;
        		temp.JMJX_SCORE = data[i].JMJX_SCORE;
        		temp.TM_FLAG = data[i].TM_FLAG;
        		temp.TM_SCORE = data[i].TM_SCORE;
        		temp.AQHL_FLAG = data[i].AQHL_FLAG;
        		temp.AQHL_SCORE = data[i].AQHL_SCORE;
        		temp.KZG_FLAG = data[i].KZG_FLAG;
        		temp.KZG_SCORE = data[i].KZG_SCORE;
        		temp.ACTUAL_EMP_ID1 = data[i].ACTUAL_EMP_ID1;
        		temp.ACTUAL_EMP_ID2 = data[i].ACTUAL_EMP_ID2;
        		temp.ACTUAL_EMP_NAME1 = data[i].ACTUAL_EMP_NAME1;
        		temp.ACTUAL_EMP_NAME2 = data[i].ACTUAL_EMP_NAME2;
        		temp.ACTUAL_EMP_STATION_ID1 = data[i].ACTUAL_EMP_STATION_ID1;
        		temp.ACTUAL_EMP_STATION_ID2 = data[i].ACTUAL_EMP_STATION_ID2;
        		temp.ROW_ID = data[i].ROW_ID;
        		temp.FAULT_TYPE=data[i].FAULT_TYPE;
        		temp.DOMAIN=data[i].DOMAIN;
        		if(data[i].FINISH_FLAG==0){
        			temp.FINISH_FLAG = "未完成";
        		}else if(data[i].FINISH_FLAG==1){
        			temp.FINISH_FLAG = "已完成";
        		}
        		storeData[i] = temp;
        	}
        	MmintainSpecialStore = obj.getStore('MmintainSpecialStore','HelcPDA.store.maintainSpecial.MmintainSpecialStore');
        	MmintainSpecialStore.setData(storeData);
		};
		
		this.connectServer(getResult, 'maintainSpecialAction.do?method=toSearchList', JSON.stringify(contentdata));
	},
	
	serach_AssetNumList : function(obj,index,target,record,e,eOpts){
		var obj = this;
		var store = obj.getStore("AssetNumStore","HelcPDA.store.maintainSpecial.AssetNumStore");
		var ASSET_NUM=store.getAt(index).get('ASSET_NUM');
		var Array = ASSET_NUM.split('/');
		Ext.getCmp('ms_ASSET_NUM').setValue(Array[0]);
		Ext.getCmp('ms_AGREE_NUM').setValue(Array[1]);
		Ext.getCmp('ms_ACCNT').setValue(Array[2]);
		Ext.getCmp('ms_DOMAIN').setValue(Array[3]);
		Ext.getCmp('ms_COMPANY').setValue(Array[4]);
		Ext.getCmp('ms_STATION').setValue(Array[5]);
		Ext.getCmp('Panel_List_Id').destroy();
	}
	
	
	
	
	
	
	
	
	
	
	
});