Ext.define('HelcPAD.controller.OpportunityManagement.CustomerInformation_New.CustornAddressCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回
			"button#CustornAddress_new_id_FH":{
				tap:'CustornAddress_new_id_FH'
			},
			
			//查询
			"button#custornAddress_new_id_CX":{
				tap:'custornAddress_new_id_CX'
			},
			
			//通过省获得对应的  市
			"selectfield#custornAddress_new_id_Province":{
				change:'custornAddress_new_id_Province'
			},

			//通过市获得对应的 县 区
			"selectfield#custornAddress_new_id_City":{
				change:'custornAddress_new_id_City'
			},
			
			//list
			"list#custornAddress_new_id_list":{
				itemtap:'custornAddress_new_id_list'
			},
			
			//选中删除
			"button#custornAddress_new_id_DGSC":{
				tap:'custornAddress_new_id_DGSC'
			},
			
			//全部删除
			"button#custornAddress_new_id_QBSC":{
				tap:'custornAddress_new_id_QBSC'
			},
			
			//新建
			"button#CustornAddress_new_id_XJ":{
				tap:'CustornAddress_new_id_XJ'
			},
			
			//确定
			"button#CustornAddress_new_id_QD":{
				tap:'CustornAddress_new_id_QD'
			},
			
		}
	},
	
	//确定
	CustornAddress_new_id_QD:function(){
		var index=0;
		var wz=0;
		var sele=document.getElementsByName('groupkung_custornAddress');
		var selenum=sele.length;
		for(var i=0;i<selenum;i++){
			var checkbox = sele[i];
			if(checkbox.style.color=='rgb(224, 58, 62)'){
				wz=i;
				index++;
				break;
			};
		};
		if(index==0){
			Ext.Msg.alert('温馨提示','请选择业务联系地址');
			return;
		};
		//cc.log('wz:'+wz);
		this.showBackView('custominfo_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomInfo');
		var DataCsTwo=Ext.data.StoreManager.get('CustornAddressTwoStore');
		if(!DataCsTwo){
			DataCsTwo=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.CustornAddressTwoStore');
		};
		
		var DataCsTwoNum=DataCsTwo.getCount();
		if(DataCsTwoNum==0){
			return;
		};
		
		//var country=Ext.getCmp('S_Country').getValue();
		//if(country==''){
			Ext.getCmp('S_Country').setValue(DataCsTwo.getAt(wz).get('Country'));
			Ext.getCmp('S_Province').setValue(DataCsTwo.getAt(wz).get('Province'));
			Ext.getCmp('S_City').setValue(DataCsTwo.getAt(wz).get('City'));
			Ext.getCmp('S_EBSCustomerSite').setValue(DataCsTwo.getAt(wz).get('StreetAddress'));
			Ext.getCmp('S_PostalCode').setValue(DataCsTwo.getAt(wz).get('PostalCode'));
		//};
	},
	
	//新建
	CustornAddress_new_id_XJ:function(){
		this.NextView('custornAddressAddd_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustornAddressAddd');
		//省的值列表
		var Country=Ext.getCmp('custornAddressAddd_new_id_Country').getValue();
		this.SSX_SJLD(Country,'','custornAddressAddd_new_id_Province','HEL_PROVINCE','');
		var datab=new Date();
		var datab2=Ext.Date.format(datab,'Y-m-d');
		Ext.getCmp('custornAddressAddd_new_id_StartDate').setValue(datab2);
		
		//测试用
		Ext.getCmp('custornAddressAddd_new_id_Province').setValue('广东');
		Ext.getCmp('custornAddressAddd_new_id_City').setValue('广州市');
		Ext.getCmp('custornAddressAddd_new_id_County').setValue('百云区');
	},
	
	//全部删除
	custornAddress_new_id_QBSC:function(){
		var DataCsTwo=Ext.data.StoreManager.get('CustornAddressTwoStore');
		if(!DataCsTwo){
			DataCsTwo=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.CustornAddressTwoStore');
		};
		DataCsTwo.setData([]);
	},
	
	//选中删除
	custornAddress_new_id_DGSC:function(){
		//判断是否选中，选中不加，
		var DataCsTwo=Ext.data.StoreManager.get('CustornAddressTwoStore');
		if(!DataCsTwo){
			DataCsTwo=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.CustornAddressTwoStore');
		};
		var dataTwo=DataCsTwo.getData();
		
		var sele=document.getElementsByName('groupkung_custornAddress');
		var selenum=sele.length;
		
		var newDataTwo=[];
		var newDataTwoNum=0;
		for(var i=0;i<selenum;i++){
			var checkbox = sele[i];
			
			if(checkbox.style.color==''){
				newDataTwo[newDataTwoNum]=dataTwo.items[i].data;
				newDataTwoNum++;
			}else if(checkbox.style.color=='rgb(204, 204, 204)'){
				newDataTwo[newDataTwoNum]=dataTwo.items[i].data;
				newDataTwoNum++;
	    	};
		};
		DataCsTwo.setData(newDataTwo);
		if(newDataTwo.length==0){
			return;
		};
		if(selenum>1){
			var checkbox2=sele[0];
			checkbox2.style.color='#e03a3e';
		};
		
	},
	
	//list
	custornAddress_new_id_list:function(dataview, index, target, record, e, eOpts){
		var sele=document.getElementsByName('groupkung_custornAddress');
		var checkbox = sele[index];
		var selenum=sele.length;
		
		if(checkbox.style.color==''){
	   		checkbox.style.color='#e03a3e';
	   	}else if(checkbox.style.color=='rgb(204, 204, 204)'){
	   		//是未选中的情况下
	   		checkbox.style.color='#e03a3e';
	   	}else if(checkbox.style.color=='rgb(224, 58, 62)'){
	   		//是选中的情况下
	   		checkbox.style.color='#ccc';
	   	};
	   	
	   	//只显示一个
	   	for(var i=0;i<selenum;i++){
	   		if(i!=index){
	   			sele[i].style.color='#ccc';
	   		}
	   	}
	   	return;
	   	//判断是否最后一个红
	   	/*var pdnum=0;
	   	for(var i=0;i<selenum;i++){
	   		var checkbox2=sele[i];
	   		if(checkbox2.style.color==''){
	   			pdnum++;
	   		}else if(checkbox2.style.color=='rgb(204, 204, 204)'){
	   			pdnum++;
	   		};
	   	};
	   	if(pdnum==selenum){
	   		checkbox.style.color='#e03a3e';
	   	};*/
	},
	
	//通过市获得对应的 县 区
	custornAddress_new_id_City:function(){
		this.SSX_SJLD('','custornAddress_new_id_City','custornAddress_new_id_County','HEL_CITY','HEL_COUNTY');
	},
	
	//通过省获得对应的  市
	custornAddress_new_id_Province:function(){
		this.SSX_SJLD('','custornAddress_new_id_Province','custornAddress_new_id_City','HEL_PROVINCE','HEL_CITY');
	},
	
	//返回
	CustornAddress_new_id_FH:function(){
		this.showBackView('custominfo_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomInfo');
	},
	
	//查询
	custornAddress_new_id_CX:function(){
		//验证
		var Data=['custornAddress_new_id_Province','custornAddress_new_id_City',
		          'custornAddress_new_id_County','custornAddress_new_id_StreetAddress'];
		//判断是否有填值
		var Datalength=Data.length;
		var num=0;
		for(var i=0;i<Datalength;i++){
			var dd=Ext.getCmp(Data[i]).getValue();
			if(dd!=''){
				num++;
			};
		};
		if(num==0){
			Ext.Msg.alert("请至少输入一个查询条件");
			return;
		};
		var obj=this;
		getResult=function(data){
			if(data==undefined){
				Ext.Msg.alert("查无数据");
				return;
			};
			//添加数据
			var DataCs=Ext.data.StoreManager.get('CustornAddressStore');
			if(!DataCs){
				DataCs=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.CustornAddressStore');
			};
			DataCs.setData([]);
			DataCs.setData(data);
			
			obj.NextView('custornAddressList_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustornAddressList');
		};
		var Trim={};
		Trim.Country=Ext.getCmp('custornAddress_new_id_Country').getValue();
		Trim.Province=Ext.getCmp('custornAddress_new_id_Province').getValue();
		Trim.City=Ext.getCmp('custornAddress_new_id_City').getValue();
		Trim.County=Ext.getCmp('custornAddress_new_id_County').getValue();
		Trim.StreetAddress=Ext.getCmp('custornAddress_new_id_StreetAddress').getValue();
		cc.log(JSON.stringify(Trim));
		obj.connectServer_custom_address(getResult,Trim);
	},


});