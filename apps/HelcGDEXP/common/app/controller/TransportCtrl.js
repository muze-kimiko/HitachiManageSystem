Ext.define('HelcGDEXP.controller.TransportCtrl',{
	extend:'HelcGDEXP.controller.ApplicationController',
	config:{
		refs:{
		},
		control:{
			
			"button#btn_Back_TS":{
				tap:'btn_Back_TS'
			},
			"button#btn_Search_TS":{
				tap:'btn_Search_TS'
			},
			
			"button#btn_Back_TR":{
				tap:'btn_Back_TR'
			},
			/*
			"button#btn_Back_C":{
				tap:'btn_Back_C'
			},
			"button#btn_Search":{
				tap:'btn_Search'
			},
			*/
			//进入持证查询页面
			"list#informationList_id":{
				itemtap:'in_certificatesinfo'
			},
			/*
			"list#CertPersonList":{
				itemtap:'in_CertPersonList'
			},
			"list#CertPersonC_List":{
				itemtap:'in_CertPersonC_List'
			},
			*/
		}
	},
	
	btn_Back_TS:function(){
		//跳转页面     
		this.showBackView("MenusView_id","HelcGDEXP.view.MenusView");
	},
	
	btn_Back_TR:function(){
		//跳转页面     
		this.showBackView("TransportSearch","HelcGDEXP.view.TransportSearch");
	},
	/*
	btn_Back_P:function(){
		//跳转页面     
		this.showBackView("CertificatesInfo_List","HelcPDA.view.certificatesinfo.CertificatesInfo_List");
	},
	
	btn_Back_C:function(){
		//跳转页面     
		this.showBackView("CertificatesInfo_P","HelcPDA.view.certificatesinfo.CertificatesInfo_P");
	},
	*/
	//进入历史故障查询页面
	in_certificatesinfo:function(obk, index, target, record, e, eOpts ){
		var list=Ext.getCmp('informationList_id');
		var title=JSON.stringify(list.getData()[index].title);
		if(title=='"物流运单"'){
			this.NextView('TransportSearch','HelcGDEXP.view.TransportSearch');
		};
	},
	
	btn_Search_TS:function(){
		console.log('查询运单');
		var v_tsid = Ext.getCmp('TSID').getValue();
		if(v_tsid == ''){
			Ext.Msg.alert("请输入物流运单号！");
			return false;
		}
		
		var obj = this;
		
		//跳转页面     
		this.NextView('TransportResult','HelcGDEXP.view.TransportResult');
		
		obj.Load_Result(obj,v_tsid);
	},
	
	Load_Result:function(obj,contentdata){
		
		var getResult=function(res){
			
			res = res.split("<table");
			res = '<table ' + res[5].split("</table>")[0] + '</table>';
			console.log(res);
//			alert(res);
			Ext.getCmp('PanelResult').setHtml(res);
//			Ext.getCmp('PanelResult').setTpl(res);
			/*
        	var data = res.rows;
        	var count = res.count;
        	if(count>100){
        		Ext.Msg.alert("查询结果太多","请输入更多的条件！");
    			return false;
        	}
        	var storeData = [];
        	for(var i = 0; i<data.length; i++){
        		var temp={};
        		temp.VENDOR_NAME = data[i].VENDOR_NAME;
        		temp.PERSON_NAME = data[i].PERSON_NAME;
        		temp.CERT_NO = data[i].CERT_NO;
        		temp.JOB_TYPE_CODE = data[i].JOB_TYPE_CODE;
        		temp.INST_PERSON_ID = data[i].INST_PERSON_ID;
        		storeData[i] = temp;
        	}
        	*/
        	
		};
		
		this.connectGDEXP(getResult,contentdata);
	},
	/*
	in_CertPersonList:function(obj,index){
		var obj = this;
		console.log('人员列表点击人员');
		var v_Store = obj.getStore('CertPersonListStore','HelcPDA.store.certificatesinfo.CertPersonListStore');
		var INST_PERSON_ID=v_Store.getAt(index).get('INST_PERSON_ID');
		
		var contentdata = {INST_PERSON_ID:INST_PERSON_ID};
		obj.NextView('CertificatesInfo_P','HelcPDA.view.certificatesinfo.CertificatesInfo_P');
		
		console.log('INST_PERSON_ID:'+INST_PERSON_ID);
		
		var getResult=function(res){
			console.log(res);
			Ext.getCmp('PERSON_NAME').setValue(res.PERSON_NAME);
			Ext.getCmp('VENDOR_NAME').setValue(res.VENDOR_NAME);
			Ext.getCmp('CERT_NO').setValue(res.CERT_NO);
			Ext.getCmp('WORK_ADDRESS').setValue(res.WORK_ADDRESS);
			Ext.getCmp('EXPERIENCE_YEAR').setValue(res.EXPERIENCE_YEAR);
			Ext.getCmp('JOB_TYPE_CODE').setValue(res.JOB_TYPE_CODE);
			Ext.getCmp('JOB_POSITION').setValue(res.JOB_POSITION);
			
        	var data = res.rows;
        	var storeData = [];
        	for(var i = 0; i<data.length; i++){
        		var temp={};
        		temp.CERT_NAME_CODE = data[i].CERT_NAME_CODE;
        		temp.CERT_NO = data[i].CERT_NO;
        		temp.CERT_DATE = data[i].CERT_DATE;
        		temp.DISABLED_DATE = data[i].DISABLED_DATE;
        		temp.CERT_ORGANIZATION = data[i].CERT_ORGANIZATION;
        		temp.OBJECT_VERSION_NUMBER = data[i].OBJECT_VERSION_NUMBER;
        		temp.COMMENTS = data[i].COMMENTS;
        		storeData[i] = temp;
        	}
        	
        	var v_Store = obj.getStore('CertPersonC_ListStore','HelcPDA.model.certificatesinfo.CertPersonC_ListStore');
        	v_Store.setData(storeData);
		};
		
		obj.connectServer(getResult, 'certificatesInfoAction.do?method=toGet_Inst_Person_Info', JSON.stringify(contentdata));
	},
	
	in_CertPersonC_List:function(obj,index){
		var obj = this;
		console.log('证件列表点击证件');
		var v_Store = obj.getStore('CertPersonC_ListStore','HelcPDA.store.certificatesinfo.CertPersonC_ListStore');
		
		obj.NextView('CertificatesInfo_C','HelcPDA.view.certificatesinfo.CertificatesInfo_C');
		
		Ext.getCmp('CERT_NAME_CODE').setValue(v_Store.getAt(index).get('CERT_NAME_CODE'));
		Ext.getCmp('CERT_NO').setValue(v_Store.getAt(index).get('CERT_NO'));
		Ext.getCmp('CERT_DATE').setValue(v_Store.getAt(index).get('CERT_DATE'));
		Ext.getCmp('DISABLED_DATE').setValue(v_Store.getAt(index).get('DISABLED_DATE'));
		Ext.getCmp('CERT_ORGANIZATION').setValue(v_Store.getAt(index).get('CERT_ORGANIZATION'));
		Ext.getCmp('OBJECT_VERSION_NUMBER').setValue(v_Store.getAt(index).get('OBJECT_VERSION_NUMBER'));
		Ext.getCmp('COMMENTS').setValue(v_Store.getAt(index).get('COMMENTS'));
	},
	*/
});