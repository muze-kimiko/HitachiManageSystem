
/* JavaScript content from app/controller/OpportunityManagement/CustomerInformation_New/CustornAddressAdddCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.CustomerInformation_New.CustornAddressAdddCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回
			"button#custornAddressAddd_new_id_FH":{
				tap:'custornAddressAddd_new_id_FH'
			},
			
			//保存
			"button#custornAddressAddd_new_id_BC":{
				tap:'custornAddressAddd_new_id_BC'
			},
		
			//通过省获得对应的  市
			"selectfield#custornAddressAddd_new_id_Province":{
				change:'custornAddressAddd_new_id_Province'
			},
			
			//通过市获得对应的  县区
			"selectfield#custornAddressAddd_new_id_City":{
				change:'custornAddressAddd_new_id_City'
			},
			
		}
	},
	
	
	//通过市获得对应的 县 区
	custornAddressAddd_new_id_City:function(){
		this.SSX_SJLD('','custornAddressAddd_new_id_City','custornAddressAddd_new_id_County','HEL_CITY','HEL_COUNTY');
	},
	
	//通过省获得对应的  市
	custornAddressAddd_new_id_Province:function(){
		this.SSX_SJLD('','custornAddressAddd_new_id_Province','custornAddressAddd_new_id_City','HEL_PROVINCE','HEL_CITY');
	},
	
	//保存
	custornAddressAddd_new_id_BC:function(){
		//非空验证
		var StreetAddress=Ext.getCmp('custornAddressAddd_new_id_StreetAddress').getValue();
		if(StreetAddress==''){
			Ext.Msg.alert("详细地址不能为空");
			return;
		};
		var obj=this;
		//结果
		getResult=function(data){
			var DataCsTwo=Ext.data.StoreManager.get('CustornAddressTwoStore');
			if(!DataCsTwo){
				DataCsTwo=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.CustornAddressTwoStore');
			};
			DataCsTwo.addData(data);
			
			obj.showBackView('custornAddress_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustornAddress');
			
			
			//强制活动 选中地址页面
			var char=Ext.getCmp('custornAddress_new_id');
			var tab=char.getInnerItems();
			char.setActiveItem(tab[1]);
			
			var sele=document.getElementsByName('groupkung_custornAddress');
			var selenum=sele.length;
			for(var i=0;i<selenum;i++){
				var checkbox2 = sele[i];
				checkbox2.style.color='#ccc';
			};
			var checkbox = sele[selenum-1];
			checkbox.style.color='#e03a3e';
		};
		var Trim={};
		Trim.Country=Ext.getCmp('custornAddressAddd_new_id_Country').getValue();
		Trim.Province=Ext.getCmp('custornAddressAddd_new_id_Province').getValue();
		Trim.City=Ext.getCmp('custornAddressAddd_new_id_City').getValue();
		Trim.County=Ext.getCmp('custornAddressAddd_new_id_County').getValue();
		Trim.StreetAddress=Ext.getCmp('custornAddressAddd_new_id_StreetAddress').getValue();
		Trim.StartDate=Ext.getCmp('custornAddressAddd_new_id_StartDate').getValue();
		Trim.EndDate=Ext.getCmp('custornAddressAddd_new_id_EndDate').getValue();
		Trim.PostalCode=Ext.getCmp('custornAddressAddd_new_id_PostalCode').getValue();
		
    	obj.connectServer_custom_address_add(getResult,Trim);
		
	},
	
	//返回
	custornAddressAddd_new_id_FH:function(){
		this.showBackView('custornAddress_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomInfo');
	},



});
