
/* JavaScript content from app/controller/OpportunityManagement/CustomerInformation_New/CustomSearchCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.CustomerInformation_New.CustomSearchCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//查询按钮
			"button#customSearch_new_id_CX":{
				tap:'customSearch_new_id_CX'
			},

			//返回
			"button#customSearch_new_id_FH":{
				tap:'customSearch_new_id_FH'
			},
			
			//大客户名称
			"selectfield#customSearch_new_id_dkhmc":{
				change:'customSearch_new_id_dkhmc'
			},
		}
	},
	
	customSearch_new_id_dkhmc:function(){
		var DataCs=Ext.data.StoreManager.get('CxAppLovVStore');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.CxAppLovVStore');
		};
		var num=DataCs.getCount();
		var kHLX=Ext.getCmp('customSearch_new_id_dkhmc').getValue();
		cc.log('kHLX:'+kHLX);
		var JLid=0;
		for(var i=0;i<num;i++){//获取选择的数据在数据仓中的位置
			if(kHLX==DataCs.getAt(i).get('PAR_LIS_VAL')&&'HEL_BIGCODE'==DataCs.getAt(i).get('TYPE')){
				JLid=i;
			};
		};

		var ssdd='[';
		if(JLid==0){
			ssdd+="{'value':'','text':'请选择'},";
		}else{
			ssdd+="{'value':'"+DataCs.getAt(JLid).get('LIS_VAL')+"','text':'"+DataCs.getAt(JLid).get('LIS_VAL')+"'}";
		};
		ssdd+=']';
		Ext.getCmp('customSearch_new_id_dkhbm').setOptions(eval(ssdd));
	},
	
	//返回
	customSearch_new_id_FH:function(){
		this.BackView();
	},
	
	//查询按钮
	customSearch_new_id_CX:function(){
		var obj=this;
		getResult=function(data){
			if(data==undefined){
				//清空数据仓
				var DataCs=Ext.data.StoreManager.get('ClientStore');
				if(!DataCs){
					DataCs=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.ClientStore');
				};
				DataCs.setData([{EBSname:'1'}]);
				//Ext.Msg.alert('提示','您查找的客户不存在!');
				obj.NextView('customlist_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomList');
				
				var htmel=['<div style="font-size:18px;width:100%">'+
            	'<div style="float:left;width:100%;text-align:center">查无数据</div>'+
            	'</div>'];
				Ext.getCmp('customlist_new_id_list').setItemTpl(htmel);
				Ext.getCmp('customlist_new_id_list').setOnItemDisclosure(false);
				//显示新建按钮
				//Ext.getCmp('customlist_new_id_XJKH').setHidden(false);
				return;
			};
			obj.NextView('customlist_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomList');
			Ext.getCmp('customlist_new_id_list').setOnItemDisclosure(true);
			var dataLength=data.length;
			//cc.log('长度:'+dataLength);
			var DataZ=[];
			//当结果只有一个的时候
			if(dataLength==undefined){
				if(data.AccountStatus=='失效'){
					var htmel=['<div style="font-size:12px;width:100%">'+
				            	'<div style="float:left;width:100%">查无数据</div>'+
				            	'</div>'];
					Ext.getCmp('customlist_new_id_list').setItemTpl(htmel);
				};
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
				var dataLengthNumFgs=0;
				var dataLengthNumZgs=0;
				var dataLengthBF=0;
				var Datazgs=[];//总公司
				var Datafgs=[];//分公司
				var DataBF=[]; //备份
				for(var i=0;i<dataLength;i++){
					if(data[i].AccountStatus!='失效'){
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
						
						//备份
						DataBF[dataLengthBF]=khzl;
						dataLengthBF++;
						//2016-2-19 新增判断
						//1.列表数据分公司优先
						//2.客户编码相同的情况下，只显示分公司，不显示总公司
						if(khzl.Organization=='营业工程总部'){
							Datazgs[dataLengthNumZgs]=khzl;
							dataLengthNumZgs++;
						}else{
							Datafgs[dataLengthNumFgs]=khzl;
							dataLengthNumFgs++;
						};
					};
				};
				
				try{
					var zz=dataLengthNumZgs;
					var ff=dataLengthNumFgs;
					for(var ii=0;ii<ff;ii++){
						var EBScnZ=Datazgs[ii].EBScn;
						var EBScnF=Datafgs[ii].EBScn;
						if(EBScnZ==undefined||EBScnF==undefined){
							break;	
						};
						//cc.log(EBScnZ+'  '+EBScnF);
						for(var jj=0;jj<zz;jj++){
							if(EBScnZ==EBScnF){
								Datazgs.splice(jj,1);									
							};
						};
						zz=Datazgs.length;
					};
					DataZ = Datafgs.concat(Datazgs);
					cc.log('数组组合');
					cc.log(DataZ);
					Datazgs=Datafgs=null;
				}catch(e){
					cc.log('剔除法出错');
					DataZ=DataBF;
					DataBF=null;
				};
			};
			var DataCs=Ext.data.StoreManager.get('ClientStore');
			if(!DataCs){
				DataCs=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.ClientStore');
			};
			DataCs.setData(DataZ);
			//var aa=data[0].PrimaryOrganizationId;
			//cc.log('进来了'+aa);
			//cc.log(JSON.stringify(data));
		};
		//条件
		var khbh=Ext.getCmp('customSearch_new_id_KHBH').getValue();
		var khmc=Ext.getCmp('customSearch_new_id_KHMC').getValue();
		var dmorsfz=Ext.getCmp('customSearch_new_id_dmORsfz').getValue();
		//大客户名称
		var dkhmc=Ext.getCmp('customSearch_new_id_dkhmc').getValue();
		//大客户编码
		var dkhbm=Ext.getCmp('customSearch_new_id_dkhbm').getValue();
		
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
		if(dkhmc!=''){
			jg+='[Account.Big Customer]  like  '+"'*"+dkhmc+"*'"+' AND ';
		};
		if(dkhbm!=''){
			jg+='[Account.Account KA Number] like '+"'*"+dkhbm+"*'"+' AND ';
		};
		cc.log(jg);
		if(jg==''){
			Ext.Msg.alert('提示','请至少输入一个查询条件!');
			return;
		};
		jg+=' ([Account.Primary Organization Id] = '+"'"+'1-7D3D'+"'"+' or [Account.Primary Organization Id] = [Account.Login Organization Id])';
		
		jg+=' and (([Account.Internal Org Flag] &lt;>  '+"'"+'Y'+"'"+' or [Account.Partner Flag] &lt;>  '+"'"+'N'+"'"+' ) AND [Account.Account Flag] &lt;>  '+"'"+'N'+"'"+')';
	
		var TJdata={};
		TJdata.SearchSpec=jg;
		TJdata.viewmodel='All';
		obj.connectServer_custom(getResult,TJdata,1,userID);
		
	},


});