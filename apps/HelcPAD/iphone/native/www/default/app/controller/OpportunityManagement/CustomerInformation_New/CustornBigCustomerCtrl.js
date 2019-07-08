
/* JavaScript content from app/controller/OpportunityManagement/CustomerInformation_New/CustornBigCustomerCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.CustomerInformation_New.CustornBigCustomerCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回
			"button#custornBigCustomer_new_id_FH":{
				tap:'custornBigCustomer_new_id_FH'
			},
			
			//确定
			"button#custornBigCustomer_new_id_QD":{
				tap:'custornBigCustomer_new_id_QD'
			},
			
			//查询
			"button#custornBigCustomer_new_id_CX":{
				tap:'custornBigCustomer_new_id_CX'
			},
			
			//list
			"list#custornBigCustomer_new_id_list":{
				itemtap:'custornBigCustomer_new_id_list'
			},
		}
	},
	
	
	//list 唯一
	custornBigCustomer_new_id_list:function(dataview, index, target, record, e, eOpts){
		var sele=document.getElementsByName('groupkung_custornBigCustomer');
		var seleNum=sele.length;
		for(var i=0;i<seleNum;i++){
			var checkbox = sele[i];
			checkbox.style.color='#ccc';
		};
		var checkbox = sele[index];
		checkbox.style.color='#e03a3e';
	},
	
	
	//查询
	custornBigCustomer_new_id_CX:function(){
		var obj=this;
		getResult=function(data){
			//清空数据仓
			if(data==undefined){
				Ext.Msg.alert('提示','您查找的父客户不存在!');
				return;
			};
			var dataLength=data.length;
			cc.log('长度:'+dataLength);
			var DataZ=[];
			//当结果只有一个的时候
			if(dataLength==undefined){
				var khzl={};
				khzl.PrimaryOrganizationId=data.PrimaryOrganizationId;
				khzl.OrgCodeDate2=data.OrgCodeDate2;
				khzl.EBSCustomerName=data.EBSCustomerName;
				khzl.Type=data.Type;
				khzl.BigCustomer=data.BigCustomer;
				khzl.OrgCodeNumber2=data.OrgCodeNumber2;
				khzl.ApproveStatus=data.ApproveStatus;
				khzl.LoginOrganizationId=data.LoginOrganizationId;
				khzl.AccountMPType=data.AccountMPType;
				khzl.AccountStatus=data.AccountStatus;
				khzl.CSN=data.CSN;
				khzl.IsPrimaryMVG=data.ListOfAccount_Organization.Account_Organization.IsPrimaryMVG;
				khzl.BackOfficeSalesOrganization=data.ListOfAccount_Organization.Account_Organization.BackOfficeSalesOrganization;
				khzl.Location2=data.ListOfAccount_Organization.Account_Organization.Location;
				khzl.Organization=data.ListOfAccount_Organization.Account_Organization.Organization;
				khzl.OrganizationIntegrationId=data.ListOfAccount_Organization.Account_Organization.OrganizationIntegrationId;
				khzl.OrganizationId=data.ListOfAccount_Organization.Account_Organization.OrganizationId;
				khzl.BackOfficeDistributionChannel=data.ListOfAccount_Organization.Account_Organization.BackOfficeDistributionChannel;
				khzl.RowId=data.RowId;
				khzl.Location=data.Location;
				khzl.CurrencyCode=data.CurrencyCode;
				khzl.Name=data.Name;
				khzl.AccountAttribute=data.AccountAttribute;
				khzl.ParentAccountName=data.ParentAccountName;
				khzl.AccountSubType=data.AccountSubType;
				khzl.AccountProperty=data.AccountProperty;
				khzl.AccountNumber1=data.AccountNumber1;
				khzl.EBSCustomerNumber=data.EBSCustomerNumber;
				khzl.PrimaryOrganization=data.PrimaryOrganization;
				khzl.EBSCustomerName1=data.EBSCustomerName1;
				khzl.AccountKANumber=data.AccountKANumber;
				//特殊
				khzl.ParentAccountId=data.ParentAccountId;
				//cc.log('khzl.ParentAccountId:'+khzl.ParentAccountId);
				//判断特殊
				if(data.EBSCustomerNumber!=''){//编码 正式
					khzl.EBScn=data.EBSCustomerNumber;
				}else{
					khzl.EBScn==data.AccountNumber1;
				};
				if(data.EBSCustomerName!=''){//名称  正式
					khzl.EBSname=data.EBSCustomerName;
				}else{
					khzl.EBSname=data.EBSCustomerName1;
				};
				DataZ[0]=khzl;
			}else{//当结果有多个的时候
				for(var i=0;i<dataLength;i++){
					var khzl={};
					khzl.PrimaryOrganizationId=data[i].PrimaryOrganizationId;
					khzl.OrgCodeDate2=data[i].OrgCodeDate2;
					khzl.EBSCustomerName=data[i].EBSCustomerName;
					khzl.Type=data[i].Type;
					khzl.BigCustomer=data[i].BigCustomer;
					khzl.OrgCodeNumber2=data[i].OrgCodeNumber2;
					khzl.ApproveStatus=data[i].ApproveStatus;
					khzl.LoginOrganizationId=data[i].LoginOrganizationId;
					khzl.AccountMPType=data[i].AccountMPType;
					khzl.AccountStatus=data[i].AccountStatus;
					khzl.CSN=data[i].CSN;
					khzl.IsPrimaryMVG=data[i].ListOfAccount_Organization.Account_Organization.IsPrimaryMVG;
					khzl.BackOfficeSalesOrganization=data[i].ListOfAccount_Organization.Account_Organization.BackOfficeSalesOrganization;
					khzl.Location2=data[i].ListOfAccount_Organization.Account_Organization.Location;
					khzl.Organization=data[i].ListOfAccount_Organization.Account_Organization.Organization;
					khzl.OrganizationIntegrationId=data[i].ListOfAccount_Organization.Account_Organization.OrganizationIntegrationId;
					khzl.OrganizationId=data[i].ListOfAccount_Organization.Account_Organization.OrganizationId;
					khzl.BackOfficeDistributionChannel=data[i].ListOfAccount_Organization.Account_Organization.BackOfficeDistributionChannel;
					khzl.RowId=data[i].RowId;
					khzl.Location=data[i].Location;
					khzl.CurrencyCode=data[i].CurrencyCode;
					khzl.Name=data[i].Name;
					khzl.AccountAttribute=data[i].AccountAttribute;
					khzl.ParentAccountName=data[i].ParentAccountName;
					khzl.AccountSubType=data[i].AccountSubType;
					khzl.AccountProperty=data[i].AccountProperty;
					khzl.AccountNumber1=data[i].AccountNumber1;
					khzl.EBSCustomerNumber=data[i].EBSCustomerNumber;
					khzl.PrimaryOrganization=data[i].PrimaryOrganization;
					khzl.EBSCustomerName1=data[i].EBSCustomerName1;
					khzl.AccountKANumber=data[i].AccountKANumber;
					//特殊
					khzl.ParentAccountId=data.ParentAccountId;
					//判断特殊
					if(data[i].EBSCustomerNumber!=''){//编码 正式
						khzl.EBScn=data[i].EBSCustomerNumber;
					}else{
						khzl.EBScn==data[i].AccountNumber1;
					};
					if(data[i].EBSCustomerName!=''){//名称  正式
						khzl.EBSname=data[i].EBSCustomerName;
					}else{
						khzl.EBSname=data[i].EBSCustomerName1;
					};
					DataZ[i]=khzl;
				};
			};
			var DataCs=Ext.data.StoreManager.get('ClientStoreF');
			if(!DataCs){
				DataCs=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.ClientStoreF');
			};
			DataCs.setData(DataZ);
			//cc.log('AA'+JSON.stringify(DataZ));
			//强制活动 选中地址页面
			var char=Ext.getCmp('custornBigCustomer_new_id');
			var tab=char.getInnerItems();
			char.setActiveItem(tab[1]);
		};
		//条件
		var khbh=Ext.getCmp('custornBigCustomer_new_id_KHBH').getValue();
		var khmc=Ext.getCmp('custornBigCustomer_new_id_KHMC').getValue();
		var dmorsfz=Ext.getCmp('custornBigCustomer_new_id_dmORsfz').getValue();
		var dkhbm=Ext.getCmp('custornBigCustomer_new_id_dkhbm').getValue();
		var jg='';
		
		if(khbh!=''){
			jg+='([Account.EBS Customer Number] = '+"'"+khbh+"'"+' ) AND ';
		};
		if(khmc!=''){
			jg+='([Account.EBS Customer Name1] like  '+"'*"+khmc+"*'"+'   or  [Account.EBS Customer Name] like   '+"'*"+khmc+"*'"+' ) AND ';
		};
		if(dmorsfz!=''){
			jg+='([Account.Org Code Number1] = '+"'"+dmorsfz+"'"+' or  [Account.Org Code Number2] = '+"'"+dmorsfz+"'"+'  )  AND';
		};
		if(dkhbm!=''){
			jg+='[Account.Account KA Number] like '+"'*"+dkhbm+"*'"+'AND ';
		};
		if(jg==''){
			Ext.Msg.alert('提示','请至少输入一个查询条件!');
			return;
		};
		jg+='([Account.Primary Organization Id] = '+"'"+'1-7D3D'+"'"+' or [Account.Primary Organization Id] = [Account.Login Organization Id])';
		
		jg+=' and  (([Account.Internal Org Flag] &lt;> '+"'"+'Y'+"'"+' or [Account.Partner Flag] &lt;> '+"'"+'N'+"'"+') AND [Account.Account Flag] &lt;> '+"'"+'N'+"'"+')  AND ([Account.Account Status]  = '+"'"+'有效'+"'"+'  OR  [Account.Account Status]  = '+"'"+'潜在'+"'"+')';

		
		var TJdata={};
		TJdata.SearchSpec=jg;
		TJdata.viewmodel='All';
		obj.connectServer_custom(getResult,TJdata,1,userID);
	},
	
	//确定
	custornBigCustomer_new_id_QD:function(){
		//验证一
		var DataCs=Ext.data.StoreManager.get('ClientStoreF');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.ClientStoreF');
		};
		var DataCsnum=DataCs.getCount();
		if(DataCsnum==0){
			Ext.Msg.alert("提示","无可选父客户");
			return;
		};
		//验证二
		var sele=document.getElementsByName('groupkung_custornBigCustomer');
		var seleNum=sele.length;
		var num=0;//长度
		var ZBnum=0;//坐标
		for(var i=0;i<seleNum;i++){
			var checkbox=sele[i];
			 if(checkbox.style.color==''){
				 num++;
	    		 //checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(204, 204, 204)'){
	    		  num++;
	    		  //是未选中的情况下
	    		  //checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(224, 58, 62)'){
	    		  ZBnum=i;
	    		  //是选中的情况下
	    		  //checkbox.style.color='#ccc';
	    	  };
		};
		if(seleNum==num){
			Ext.Msg.alert("提示","请选择父客户");
			return;
		};
		console.log(DataCs.getAt(ZBnum));
		//赋值
		this.showBackView('custominfo_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomInfo');
		//父客户  有点特殊 要考虑下
		Ext.getCmp('S_ParentAccountName').setValue(DataCs.getAt(ZBnum).get('EBSname'));
		//父客户ID
		Ext.getCmp('S_ParentAccountId').setValue(DataCs.getAt(ZBnum).get('ParentAccountId'));
		
	},
	
	//返回
	custornBigCustomer_new_id_FH:function(){
		this.showBackView('custominfo_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomInfo');
	},
	

});