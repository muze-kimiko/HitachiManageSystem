
/* JavaScript content from app/controller/common/SelectFieldListCtrl.js in folder common */
Ext.define('HelcPAD.controller.common.SelectFieldListCtrl', {
	extend:'HelcPAD.controller.ApplicationController',

	config: {
        control: {
        	//返回
			'button#selectFieldList_FH':{
				tap:'selectFieldList_FH'
			},
			
			//list
			'list#selectFieldList_list':{
				itemsingletap:'selectFieldList_list'
			},
        }
	},
		
	
	//返回
	selectFieldList_FH:function(){
		this.BackView();
	},
		
	//list
	selectFieldList_list:function(dataview, index, target, record, e, eOpts){
		var text = record.data.value;
		cc.log(record);
		cc.log(this.Id);
		this.BackView();
		Ext.getCmp(this.Id).setValue(text);
		Ext.getCmp(this.Id).blur();
		
		
		/*//用于客户管理的“申请类型”
		if(record.data.value=="客户新增"){
			return
		}else if(record.data.value=="申请使用"){
			return;
		}else if(record.data.value=="地址层变更"){
			KHBG_ff(false,true);
		}else if(record.data.value=="头层地址层变更"){
			KHBG_ff(true,false);
			var sb=Ext.getCmp('S_BigCustomer').getValue();
			cc.log('SB:'+sb);
			if(sb==''){
				var DataCs=Ext.data.StoreManager.get('CxAppLovVStore');
				if(!DataCs){
					DataCs=Ext.create('HelcPAD.store.CxAppLovVStore');
				};
				var DataLength=DataCs.getCount();
				
				var seleData=[];
				var selenum=0;
				for(var i=0;i<DataLength;i++){
					if(DataCs.getAt(i).get('TYPE')=='HEL_BIGCUSTOMER'){
						seleData[selenum]=DataCs.getAt(i).get('LIS_VAL');
						selenum++;
					};
				};
				//插入数据
				var DataLength2=seleData.length;
				var ssdd='[';
				ssdd+="{'value':'','text':''},";
				for(var j=0;j<DataLength2;j++){
					if(j!=DataLength2-1){
						ssdd+="{'value':'"+seleData[j]+"','text':'"+seleData[j]+"'},";
					}else{
						ssdd+="{'value':'"+seleData[j]+"','text':'"+seleData[j]+"'}";
					};
				};
				ssdd+=']';
				Ext.getCmp('S_BigCustomer').setOptions(eval(ssdd));
			};
			
		}else if(record.data.value=="头层失效"){
			KHBG_ff(false,true);
		}else if(record.data.value=="地址层失效"){
			KHBG_ff(true,false);
		};
		//false 为只读
		function KHBG_ff(flat1,flat2){
			cc.log('改变了');
			//头
			//下拉列表
			var Tbg=['S_AccountSort','S_AccountClass','S_AccountAttribute','S_AccountProperty',
			         'S_AccountMPType','S_Type','S_AccountSubType','S_Extraordinary',
			         'S_BigCustomer','S_AccountKANumber'];
			//文本框
			var TbgF=['S_Name','S_CertifiAddress','S_OrgCodeNumber','S_TaxRegist'];
			for(var i=0;i<Tbg.length;i++){
				if(flat1){
					Ext.getCmp(Tbg[i]).setInputCls('cusInfo_test');
				}else{
					Ext.getCmp(Tbg[i]).setInputCls('ROCls');
				};
			};
			for(var ii=0;ii<TbgF.length;ii++){
				if(flat1){
					Ext.getCmp(TbgF[ii]).setInputCls('');
					Ext.getCmp(TbgF[ii]).setReadOnly(false);
				}else{
					Ext.getCmp(TbgF[ii]).setInputCls('ROCls');
				};
			};
			//时间控件
			if(flat1){
				Ext.getCmp('S_OrgCodeDate').setInputCls('');
			}else{
				Ext.getCmp('S_OrgCodeDate').setInputCls('ROCls');
			};
			
			//特殊 父客户
			//S_ParentAccountName_CX
			var DZbg=['S_PostalCode','S_Contact','S_MainPhoneNumber','S_MainFaxNumber','S_BankName','S_BankNumber'];
			for(var i=0;i<DZbg.length;i++){
				if(flat2){
					Ext.getCmp(DZbg[i]).setReadOnly(false);
					Ext.getCmp(DZbg[i]).setInputCls('');
				}else{
					Ext.getCmp(DZbg[i]).setReadOnly(true);
					Ext.getCmp(DZbg[i]).setInputCls('ROCls');
				};
			};
		};*/
	},
	
	//公共的进入方法
	SelectFieldList_GGFF:function(obj,Files){
		var tb=Files.getLabel();
		var id=Files.getId();
		var Data=Files.getOptions();
		if(Data[0].text=='请选择'){
			Data = Data.slice(1);
		}else if(Data[0].text==''){
			Data = Data.slice(1);
		};
		obj.NextView('selectFieldList_id','HelcPAD.view.common.SelectFieldList');
		Ext.getCmp('selectFieldList_id_tb').setTitle(tb);
		object.getController('common.SelectFieldListCtrl').Id=id;
		var SFdata=Ext.data.StoreManager.get('SelectFieldListStore');
	    if(!SFdata) {
	    	SFdata = Ext.create("HelcPAD.store.common.SelectFieldListStore");
	    };
	    SFdata.setData(Data);
	},
});