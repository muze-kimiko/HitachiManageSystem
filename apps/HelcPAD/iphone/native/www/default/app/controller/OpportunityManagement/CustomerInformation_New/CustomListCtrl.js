
/* JavaScript content from app/controller/OpportunityManagement/CustomerInformation_New/CustomListCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.CustomerInformation_New.CustomListCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回按钮
			"button#customlist_new_id_FH":{
				tap:'customlist_new_id_FH'
			},
			
			//新建客户
			"button#customlist_new_id_XJKH":{
				tap:'customlist_new_id_XJKH'
			},

			//list单击事件
			"list#customlist_new_id_list":{
				itemtap:'customlist_new_id_list'
			},
			
			
		}
	},
	
	//公共值列表
	GG_ZLB:function(type,kjname){
			var DataCs=Ext.data.StoreManager.get('CxAppLovVStore');
			if(!DataCs){
				DataCs=Ext.create('HelcPAD.store.CxAppLovVStore');
			};
			var DataLength=DataCs.getCount();
			
			var seleData=[];
			var selenum=0;
			for(var i=0;i<DataLength;i++){
				if(DataCs.getAt(i).get('TYPE')==type){
					/*cc.log(DataCs.getAt(i).get('CREATED'));
					cc.log(DataCs.getAt(i).get('LAST_UPD'));
					cc.log(DataCs.getAt(i).get('LIS_VAL'));
					cc.log(DataCs.getAt(i).get('ORDER_BY'));
					cc.log(DataCs.getAt(i).get('PAR_LIS_VAL'));
					cc.log(DataCs.getAt(i).get('PAR_ROW_ID'));
					cc.log(DataCs.getAt(i).get('ROW_ID'));*/
				
					seleData[selenum]=DataCs.getAt(i).get('LIS_VAL');
					selenum++;
				};
			};
			//插入数据
			var DataLength2=seleData.length;
			var ssdd='[';
			for(var j=0;j<DataLength2;j++){
				if(j!=DataLength2-1){
					ssdd+="{'value':'"+seleData[j]+"','text':'"+seleData[j]+"'},";
				}else{
					ssdd+="{'value':'"+seleData[j]+"','text':'"+seleData[j]+"'}";
				};
			};
			ssdd+=']';
			Ext.getCmp(kjname).setOptions(eval(ssdd));
			
	},
	
	//返回按钮
	customlist_new_id_FH:function(){
		this.showBackView('customSearch_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomSearch');
	},
	
	//新建客户
	customlist_new_id_XJKH:function(){
		this.NextView('custominfo_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomInfo');
		Ext.getCmp('AnNiuPD').setValue('提交申请');
		//填充下拉列表
		var ssdd='[';
		ssdd+="{'value':'客户新增','text':'客户新增'},";
		ssdd+=']';
		Ext.getCmp('S_ApplyType').setOptions(eval(ssdd));
		//隐藏EBS页签
		var tab=Ext.getCmp('custominfo_new_tabpanel_two');
		tab.getTabBar().getComponent(1).hide();
		//添加必填
		var BT=['S_Name','S_AccountSort','S_AccountClass','S_AccountAttribute',
		        'S_AccountProperty','S_AccountMPType','S_Type','S_AccountSubType',
		        'S_CertifiAddress','S_EBSCustomerSite','S_Contact','S_MainPhoneNumber','S_PostalCode'];
		for(var i=0;i<BT.length;i++){
			Ext.getCmp(BT[i]).setRequired(true);
		};
		
		//显示自定义按钮
		obj.getApplication().getController('OpportunityManagement.CustomerInformation_New.CustomInfoCtrl').custom_zdyan(obj.getApplication().getController('OpportunityManagement.CustomerInformation_New.CustomInfoCtrl'));
		document.getElementById("custominfo_new_id_TJSQ").style.display='block';
		document.getElementById("custominfo_new_id_SYY").className="kOne ysZhOne anThree";
		
		
		/*Ext.getCmp('S_Name').setRequired(true);//名称        
		Ext.getCmp('S_AccountSort').setRequired(true);//客户分类
		Ext.getCmp('S_AccountClass').setRequired(true);//客户类别
		Ext.getCmp('S_AccountAttribute').setRequired(true);//客户属性
		Ext.getCmp('S_AccountProperty').setRequired(true);//客户性质
		Ext.getCmp('S_AccountMPType').setRequired(true);//保养客户标识
		Ext.getCmp('S_Type').setRequired(true);//客户类型
		Ext.getCmp('S_AccountSubType').setRequired(true);//客户子类型
		Ext.getCmp('S_CertifiAddress').setRequired(true);//证照详细地址
		Ext.getCmp('S_EBSCustomerSite').setRequired(true);//业务联系地址
		Ext.getCmp('S_Contact').setRequired(true);//联系人
		Ext.getCmp('S_MainPhoneNumber').setRequired(true);//主要电话号码
*/		
		
		//默认
		//Ext.getCmp('S_AccountStatus').setValue('潜在');//状态    
		//Ext.getCmp('S_ApproveStatus').setValue('新建');//审核状态
		Ext.getCmp('S_AccountStatus').setReadOnly(true);
		Ext.getCmp('S_ApproveStatus').setReadOnly(true);
		
		//客户编码  保存时,客户自动生成
		Ext.getCmp('S_CSN').setReadOnly(true);
		//组织后台默认给，现阶段不能填写    2015-9-6
		Ext.getCmp('S_Organization').setReadOnly(true);
		//为下拉列表添加值
		var DatType=['HEL_ACCOUNT_SORT_TYPE',
		             'HEL_ACCOUNT_CLASS_TYPE',
		             'HEL_ACCOUNT_ATTRIBUTE',
		             'HEL_ACCOUNT_PROPERTY',
		             'HEL_ACCOUNT_MPTYPE',
		             'ACCOUNT_TYPE',
		             'HEL_BIGCUSTOMER'];
		var DataKJ=['S_AccountSort',
		            'S_AccountClass',
		            'S_AccountAttribute',
					'S_AccountProperty',
					'S_AccountMPType',
					'S_Type',
					'S_BigCustomer']; 
		for(var i=0;i<DatType.length;i++){
			this.GG_ZLB(DatType[i],DataKJ[i]);
		};
		//默认只读,通过选择来更改
		Ext.getCmp('S_Country').setReadOnly(true);
		Ext.getCmp('S_Province').setReadOnly(true);
		Ext.getCmp('S_City').setReadOnly(true);
		//Ext.getCmp('S_EBSCustomerSite').setReadOnly(true);
		Ext.getCmp('S_ParentAccountName').setReadOnly(true);
		
		
		//给下拉列表底色
		Ext.getCmp('S_ApplyType').setInputCls('cusInfo_test');
		Ext.getCmp('S_AccountSort').setInputCls('cusInfo_test');
		Ext.getCmp('S_AccountClass').setInputCls('cusInfo_test');
		Ext.getCmp('S_AccountAttribute').setInputCls('cusInfo_test');
		Ext.getCmp('S_AccountProperty').setInputCls('cusInfo_test');
		Ext.getCmp('S_AccountMPType').setInputCls('cusInfo_test');
		Ext.getCmp('S_Type').setInputCls('cusInfo_test');
		Ext.getCmp('S_AccountSubType').setInputCls('cusInfo_test');
		Ext.getCmp('S_Extraordinary').setInputCls('cusInfo_test');
		Ext.getCmp('S_BigCustomer').setInputCls('cusInfo_test');
		Ext.getCmp('S_AccountKANumber').setInputCls('cusInfo_test');
		
		//取消时间只读
		var sjcc="Ext.getCmp('S_OrgCodeDate').setInputCls('')";
		setTimeout(sjcc,300);
		//测试，可删除
		/*Ext.getCmp('S_Name').setValue('飞飞城市快线有限责任公司');
		Ext.getCmp('S_CertifiAddress').setValue('证照详细地址测试123');//证照详细地址
		Ext.getCmp('S_OrgCodeNumber').setValue('组织机构代码/身份证号测试123');//组织机构代码/身份证号
		Ext.getCmp('S_TaxRegist').setValue('SW123');//国家税务登记证号
*/
		//客户行层信息
		/*Ext.getCmp('S_PostalCode').setValue('100000');//邮政编码
		Ext.getCmp('S_Contact').setValue('测试联系人');//联系人
		Ext.getCmp('S_MainPhoneNumber').setValue('15914687510');//主要电话号码
		Ext.getCmp('S_MainFaxNumber').setValue('1232131');//主要传真号码
		Ext.getCmp('S_BankName').setValue('中国银行');//开户银行名称
		Ext.getCmp('S_BankNumber').setValue('1233213321321321321321');//开户银行帐号
*/		
	},


	
	
	/*判断客户资料list,看看 是否有总公司和分公司。
	1。如果有总公司和分公司的话，点击分公司进入详细信息页面只有“EBS按钮”，点击总公司则什么都没有，“EBS按钮”需要做
	两部分，先把数据“保存“，在做“同步EBS”
	2。如果只有总公司的话，点击总公司进入详细信息页面会出现“申请使用按钮”.
	3。数据是siebel块只有客户行层信息可以填写。*/
	
	/**
	 * 2016-3-3   六种状态
	 * 1.新建客户 状态默认为潜在,申请类型只有“客户新增”                        完成
	   2.查看客户资料 状态是“潜在”EBS没有数据，要跳到Siebel                   完成
	   3.组织是“总公司”，申请类型只有“申请使用”                              完成
	   4.组织是“分公司”，申请类型除了“客户新增”，其它类型都有，申请类型如果是“头层变更”那么客户        完成
		 头层信息可以修改，如果申请类型是“头层地址变更”那么客户行信息可以修改。如果是其它呢？可以先选
	     择“头层变更”，修改好头层信息，在选择“头层地址变更”“然后把头层地址变更修改吗？
	  1.查出组织是“分公司”，可直接使用 
      2.潜在状态的，可继续编辑和提交
	 */
	//list单击事件
	customlist_new_id_list:function(dataview, index, target, record, e, eOpts){
		var obj=this;
		var EBS=record.data.EBSname;
		if(EBS=='1'){
			return;
		};
		//结果
		getResult=function(data){
			//存放查找到的客户资料
			obj.CZJG=data;
			obj.NextView('custominfo_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomInfo');
			obj.getApplication().getController('OpportunityManagement.CustomerInformation_New.CustomInfoCtrl').custom_zdyan(obj.getApplication().getController('OpportunityManagement.CustomerInformation_New.CustomInfoCtrl'));
			
			//状态判断
			if(record.data.AccountStatus!='潜在'){
				//强制选择标签处于活动状态
			    var tp_chart=Ext.getCmp('custominfo_new_tabpanel_two');
			    var itemid=tp_chart.getActiveItem().getId();
			    cc.log('itemid:'+itemid);
			    var tab=tp_chart.getInnerItems();
			    tp_chart.setActiveItem(tab[1]);	
			};
		    
			//为下拉列表添加值
			var DatType=['HEL_ACCOUNT_SORT_TYPE',
			             'HEL_ACCOUNT_CLASS_TYPE',
			             'HEL_ACCOUNT_ATTRIBUTE',
			             'HEL_ACCOUNT_PROPERTY',
			             'HEL_ACCOUNT_MPTYPE',
			             'ACCOUNT_TYPE',
			             'HEL_BIGCUSTOMER'];
			var DataKJ=['S_AccountSort',
			            'S_AccountClass',
			            'S_AccountAttribute',
						'S_AccountProperty',
						'S_AccountMPType',
						'S_Type',
						'S_BigCustomer']; 
			for(var i=0;i<DatType.length;i++){
				obj.GG_ZLB(DatType[i],DataKJ[i]);
			};
			
			//对数据仓进行判断，从而选择按钮和只读控件
			//判断选中的是总公司还是分公司
			var Organization=DataCs.getAt(index).get('Organization');
			//客户编号
			var EBScn=DataCs.getAt(index).get('EBScn');
			//当选择总公司时
			cc.log('Organization:'+Organization);
			
			//1.客户编码 有总公司有分公司  进入总公司无任何操作,Siebel无数据
			//2.客户编码 有总公司有分公司  进入分公司同步EBS
			//3.客户编码 有总公司无分公司 进入总工司“申请使用”
			//4.当分公司和总公司同有的情况下，只出现分公司 
			if(Organization=='营业工程总部'){
				document.getElementById("custominfo_new_id_SQSYDiv").style.display='block';
				document.getElementById("custominfo_new_id_SQSYDiv").className="kOne ysZhFour anThree";
				document.getElementById("custominfo_new_id_SYY").className="kOne ysZhOne anThree";
				document.getElementById("custominfo_new_id_SC").className="kOne ysZhTwo anThree";
					var ssdd='[';
					ssdd+="{'value':'申请使用','text':'申请使用'}";
					ssdd+=']';
					Ext.getCmp('S_ApplyType').setOptions(eval(ssdd));
					Ext.getCmp('AnNiuPD').setValue('申请使用');s
					
					//EBS的申请类型
					Ext.getCmp('E_ApplyType').setValue(data.ApplyType2);
					Ext.getCmp('E_ApplyType').setReadOnly(true);
			}else{//当选择分公司的时候，EBS同步
				document.getElementById("custominfo_new_id_TB").style.display='block';
				document.getElementById("custominfo_new_id_BCZS").style.display='block';
				Ext.getCmp('AnNiuPD').setValue('同步至EBS');
				//下拉列表
				var ssdd='[';
				ssdd+="{'value':'','text':'请选择'},";
				
				if(Organization=='营业工程总部'){
					ssdd+="{'value':'申请使用','text':'申请使用'},";
				};
				ssdd+="{'value':'地址层变更','text':'地址层变更'},";
				ssdd+="{'value':'头层失效','text':'头层失效'},";
				ssdd+="{'value':'地址层失效','text':'地址层失效'},";
				ssdd+="{'value':'头层地址层变更','text':'头层地址层变更'}";
				ssdd+=']';
				Ext.getCmp('S_ApplyType').setOptions(eval(ssdd));
				Ext.getCmp('E_ApplyType').setReadOnly(true);
				Ext.getCmp('E_ApplyType').setLabel('上次申请类型');
				Ext.getCmp('E_ApplyType').setValue(data.ApplyType1);
			};
			
			//只读判断
			//Siebel头层和EBS永久只读
			//Siebel
			var SnameKJ=['S_Organization','S_CSN','S_Name',
			            'S_AccountStatus','S_ApproveStatus','S_AccountSort','S_AccountClass',
			            'S_AccountAttribute','S_AccountProperty','S_AccountMPType','S_Type',
			            'S_AccountSubType','S_CertifiAddress','S_Extraordinary','S_OrgCodeDate',
			            'S_OrgCodeNumber','S_BigCustomer','S_AccountKANumber','S_ParentAccountName',
			            'S_TaxRegist','S_Country','S_Province','S_City',
			            'S_EBSCustomerSite','S_PostalCode','S_Contact','S_MainPhoneNumber',
			            'S_MainFaxNumber','S_BankName','S_BankNumber'];
			
			//EBS
			var EnameKJ=['E_Organization','E_CSN','E_Name',
			            'E_AccountStatus','E_ApproveStatus','E_AccountSort','E_AccountClass',
			            'E_AccountAttribute','E_AccountProperty','E_AccountMPType','E_Type',
			            'E_AccountSubType','E_CertifiAddress','E_Extraordinary','E_OrgCodeDate',
			            'E_OrgCodeNumber','E_BigCustomer','E_AccountKANumber','E_ParentAccountName',
			            'E_TaxRegist','E_Country','E_Province','E_City',
			            'E_EBSCustomerSite','E_PostalCode','E_Contact','E_MainPhoneNumber',
			            'E_MainFaxNumber','E_BankName','E_BankNumber'];
			//有些字段没有，所以要做存在判断。EBS永久只读
			if(Organization=='营业工程总部'){//siebel只读
				for(var i=0;i<SnameKJ.length;i++){
					Ext.getCmp(SnameKJ[i]).setReadOnly(true);
				};
			}else{//Siebel部分只读
				for(var i=0;i<20;i++){
					Ext.getCmp(SnameKJ[i]).setReadOnly(true);
				};
			};
			//EBS只读
			for(var i=0;i<EnameKJ.length;i++){
				Ext.getCmp(EnameKJ[i]).setReadOnly(true);
			};
			
			//为控件添加值
			Ext.getCmp('S_RowId').setValue(data.RowId);
			//2015-11-20   总公司
			//if(ZD==1){
			if(Organization=='营业工程总部'){
				cc.log('siebel无');
				
				//按钮隐藏
				//父客户
				Ext.getCmp('S_ParentAccountName_CX').setHidden(true);
				Ext.getCmp('S_ParentAccountName').setWidth('100%');
				Ext.getCmp('S_ParentAccountName').setLabelWidth('40%');
				Ext.getCmp('S_EBSCustomerSite_CX').setHidden(true);
				Ext.getCmp('S_EBSCustomerSite').setWidth('100%');
				Ext.getCmp('S_EBSCustomerSite').setLabelWidth('40%');
			}else{
				cc.log('siebel有');
			};
			
			//进入总公司和分公司 公有
			//Siebel
			//客户头层信息
			//组织
			try{
				Ext.getCmp('S_Organization').setValue(data.ListOfAccount_Organization.Account_Organization.Organization);
			}catch(e){
				Ext.getCmp('S_Organization').setValue('');
			};
			//组织ID   
			try{
				Ext.getCmp('S_OrganizationId').setValue(data.ListOfAccount_Organization.Account_Organization.OrganizationId);
			}catch(e){
				Ext.getCmp('S_OrganizationId').setValue('');
			};
			Ext.getCmp('S_CSN').setValue(data.CSN);//头层的客户编码,申请使用时 用不到
			Ext.getCmp('S_Name').setValue(data.Name);
			Ext.getCmp('S_AccountStatus').setValue(data.AccountStatus);//状态
			Ext.getCmp('S_ApproveStatus').setValue(data.ApproveStatus);
			Ext.getCmp('S_AccountAttribute').setValue(data.AccountAttribute);
			Ext.getCmp('S_AccountProperty').setValue(data.AccountProperty);
			Ext.getCmp('S_AccountMPType').setValue(data.AccountMPType);
			Ext.getCmp('S_Type').setValue(data.Type);
			Ext.getCmp('S_AccountSubType').setValue(data.AccountSubType);
			Ext.getCmp('S_ParentAccountName').setValue(data.ParentAccountName);
			Ext.getCmp('S_ParentAccountId').setValue(data.ParentAccountId);
			//客户行层
			//客户行层的客户编码
			Ext.getCmp('S_AccountNumber').setValue(data.AccountNumber1);
			Ext.getCmp('S_ApplyType').setValue(data.ApplyType1);
			Ext.getCmp('S_AccountSort').setValue(data.AccountSort1);   
			Ext.getCmp('S_AccountClass').setValue(data.AccountClass1); 
			Ext.getCmp('S_CertifiAddress').setValue(data.CertifiAddress1);
			if(data.Extraordinary1==''){
				Ext.getCmp('S_Extraordinary').setValue('N');
			}else{
				Ext.getCmp('S_Extraordinary').setValue(data.Extraordinary1);
			};
			Ext.getCmp('S_OrgCodeDate').setValue(data.OrgCodeDate1);
			Ext.getCmp('S_OrgCodeNumber').setValue(data.OrgCodeNumber1);
			Ext.getCmp('S_TaxRegist').setValue(data.TaxRegist1);
			//地址
			var DataCsTwo=Ext.data.StoreManager.get('CustornAddressTwoStore');
			if(!DataCsTwo){
				DataCsTwo=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.CustornAddressTwoStore');
			};
			var dataT=data.ListOfAccount_BusinessAddress.Account_BusinessAddress;
			DataCsTwo.setData(dataT);
			var DataCsTwoNum=DataCsTwo.getCount();
			//cc.log('DataCsTwoNum:'+DataCsTwoNum);
			for(var i=0;i<DataCsTwoNum;i++){
				var yOrn='';
				if(DataCsTwoNum>1){
					yOrn=dataT[i].IsPrimaryMVG;	
				}else{
					yOrn=dataT.IsPrimaryMVG;
				}
				//cc.log('yOrn:'+yOrn);
				if(yOrn=='Y'){
					cc.log(DataCsTwo.getAt(i).get('Country'));
					Ext.getCmp('S_Country').setValue(DataCsTwo.getAt(i).get('Country'));
					Ext.getCmp('S_Province').setValue(DataCsTwo.getAt(i).get('Province'));
					Ext.getCmp('S_City').setValue(DataCsTwo.getAt(i).get('City'));
					Ext.getCmp('S_EBSCustomerSite').setValue(DataCsTwo.getAt(i).get('StreetAddress'));
					Ext.getCmp('S_PostalCode').setValue(DataCsTwo.getAt(i).get('PostalCode'));
					break;
				};
			};
	
			Ext.getCmp('S_Contact').setValue(data.Contact1);
			Ext.getCmp('S_MainPhoneNumber').setValue(data.MainPhoneNumber);
			Ext.getCmp('S_MainFaxNumber').setValue(data.MainFaxNumber);
			Ext.getCmp('S_BankName').setValue(data.BankName1);
			Ext.getCmp('S_BankNumber').setValue(data.BankNumber1);
			//特殊的
			Ext.getCmp('S_Associate').setValue(data.Associate1);
			Ext.getCmp('S_Region').setValue(data.Region1);
			Ext.getCmp('S_SmallScaleTaxpayer').setValue(data.SmallScaleTaxpayer1);
			Ext.getCmp('S_HQEBSCustomerId').setValue(data.HQEBSCustomerId1);
			Ext.getCmp('S_HQEBSCustomerSiteId').setValue(data.HQEBSCustomerSiteId1);
			Ext.getCmp('S_AccountGroup').setValue(data.AccountGroup1);
			Ext.getCmp('S_EBSCustomerName').setValue(data.EBSCustomerName1);
		
			
			//EBS
			//公用的
			Ext.getCmp('E_CSN').setValue(data.CSN);//头层的客户编码,申请使用时 用不到
			Ext.getCmp('E_Name').setValue(data.Name);
			Ext.getCmp('E_AccountStatus').setValue(data.AccountStatus);
			Ext.getCmp('E_ApproveStatus').setValue(data.ApproveStatus);
			Ext.getCmp('E_AccountAttribute').setValue(data.AccountAttribute);
			Ext.getCmp('E_AccountProperty').setValue(data.AccountProperty);
			Ext.getCmp('E_AccountMPType').setValue(data.AccountMPType);
			Ext.getCmp('E_Type').setValue(data.Type);
			Ext.getCmp('E_AccountSubType').setValue(data.AccountSubType);
			Ext.getCmp('E_ParentAccountName').setValue(data.ParentAccountName);
			Ext.getCmp('E_ParentAccountId').setValue(data.ParentAccountId);

			//客户行层的客户编码
			//组织ID   
			try{
				Ext.getCmp('E_Organization').setValue(data.ListOfAccount_Organization.Account_Organization.Organization);
			}catch(e){
				Ext.getCmp('E_Organization').setValue('');
			};
			Ext.getCmp('E_AccountNumber').setValue(data.EBSCustomerNumber);
			//Ext.getCmp('E_ApplyType').setValue(data.ApplyType2);
			Ext.getCmp('E_AccountSort').setValue(data.AccountSort2);
			Ext.getCmp('E_AccountClass').setValue(data.AccountClass2);
			Ext.getCmp('E_CertifiAddress').setValue(data.CertifiAddress2);
			if(data.Extraordinary2==''){
				Ext.getCmp('E_Extraordinary').setValue('N');
			}else{
				Ext.getCmp('E_Extraordinary').setValue(data.Extraordinary2);
			};
			Ext.getCmp('E_OrgCodeDate').setValue(data.OrgCodeDate2);
			Ext.getCmp('E_OrgCodeNumber').setValue(data.OrgCodeNumber2);
			Ext.getCmp('E_TaxRegist').setValue(data.TaxRegist2);
			//地址
			Ext.getCmp('E_PostalCode').setValue(data.PostalCode2);
			Ext.getCmp('E_Province').setValue(data.Province2);
			Ext.getCmp('E_City').setValue(data.City2);
			Ext.getCmp('E_Country').setValue(data.Country2);
			//
			Ext.getCmp('E_Contact').setValue(data.Contact2);
			Ext.getCmp('E_MainPhoneNumber').setValue(data.MainPhoneNumber2);
			Ext.getCmp('E_MainFaxNumber').setValue(data.MainFaxNumber2);
			Ext.getCmp('E_BankName').setValue(data.BankName2);
			Ext.getCmp('E_BankNumber').setValue(data.BankNumber2);
			//特殊的
			Ext.getCmp('E_Associate').setValue(data.Associate2);
			Ext.getCmp('E_Region').setValue(data.Region2);
			Ext.getCmp('E_SmallScaleTaxpayer').setValue(data.SmallScaleTaxpayer2);
			Ext.getCmp('E_AccountGroup').setValue(data.AccountGroup2);
			Ext.getCmp('E_HQEBSCustomerId').setValue(data.HQEBSCustomerId);
			Ext.getCmp('E_HQEBSCustomerSiteId').setValue(data.HQEBSCustomerSiteId);
			Ext.getCmp('E_EBSCustomerName').setValue(data.EBSCustomerName);
			
			
			//显示“头层状态”和“地址层状态” 2016-3-14
			Ext.getCmp('S_HeadStatus').setHidden(false);
			Ext.getCmp('S_AddressStatus').setHidden(false);
			Ext.getCmp('E_HeadStatus').setHidden(false);
			Ext.getCmp('E_AddressStatus').setHidden(false);
			
			//Sieble
			//客户头层状态
			Ext.getCmp('S_HeadStatus').setValue(data.HeadStatus);
			//客户地址层状态
			Ext.getCmp('S_AddressStatus').setValue(data.AddressStatus);
			
			//EBS
			//客户头层状态
			Ext.getCmp('E_HeadStatus').setValue(data.HeadStatus);
			//客户地址层状态
			Ext.getCmp('E_AddressStatus').setValue(data.AddressStatus);
			
			//分公司和总公司 共有的  一部分下拉列表 有无数值判断
			//有值显示值，无指显示空值,当“本次申请类型”是“头层地址变更”,重新为值列表添加值
			//“大客户名称”和“大客户编号”不是必填下拉列表,所以要判断
			var FBTname=['S_BigCustomer','S_AccountKANumber']; 
			var FBTdata=[data.BigCustomer,data.AccountKANumber];
			for(var f=0;f<2;f++){
				if(FBTdata[f]!=''){
					Ext.getCmp(FBTname[f]).setValue(FBTdata[f]);
				}else{
					Ext.getCmp(FBTname[f]).setOptions([{'value':'','text':''}]);
				};
			};
			Ext.getCmp('E_BigCustomer').setValue(data.BigCustomer);
			Ext.getCmp('E_AccountKANumber').setValue(data.AccountKANumber);
			cc.log('Big:'+data.BigCustomer+'----'+data.AccountKANumber);
			
			//
			
			//附件查询
			KHZL_CHAXUN_FF(obj,'jpeg',data.RowId);
			
		};
		//获取条件
		var DataCs=Ext.data.StoreManager.get('ClientStore');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.ClientStore');
		};
		var id=DataCs.getAt(index).get('RowId');
		cc.log('id:'+id);
		//整合条件
		var TJdata={};
		TJdata.rowid=id;
		TJdata.viewmodel='ALL';
		obj.connectServer_custom(getResult,TJdata,2,userID);
		
		
		//上面稍有修改--------------------------------------------------------------------------------
		return;
		
		var obj=this;
		//结果
		getResult=function(data){
			//cc.log('看来:'+JSON.stringify(data));
			//cc.log(data.AccountAttribute);
			
			obj.NextView('custominfo_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomInfo');
			//强制选择标签处于活动状态
		    var tp_chart=Ext.getCmp('custominfo_new_tabpanel_two');
		    var itemid=tp_chart.getActiveItem().getId();
		    cc.log('itemid:'+itemid);
		    var tab=tp_chart.getInnerItems();
		    tp_chart.setActiveItem(tab[1]);
		    
			//为下拉列表添加值
			var DatType=['HEL_ACCOUNT_SORT_TYPE',
			             'HEL_ACCOUNT_CLASS_TYPE',
			             'HEL_ACCOUNT_ATTRIBUTE',
			             'HEL_ACCOUNT_PROPERTY',
			             'HEL_ACCOUNT_MPTYPE',
			             'ACCOUNT_TYPE',
			             'HEL_BIGCUSTOMER'];
			var DataKJ=['S_AccountSort',
			            'S_AccountClass',
			            'S_AccountAttribute',
						'S_AccountProperty',
						'S_AccountMPType',
						'S_Type',
						'S_BigCustomer']; 
			for(var i=0;i<DatType.length;i++){
				obj.GG_ZLB(DatType[i],DataKJ[i]);
			};
			
			//对数据仓进行判断，从而选择按钮和只读控件
			//查看客户详细资料,只有总公司，进入总公司是0,有总公司有分公司,进入总公司是1
			var ZD=0;
			//判断选中的是总公司还是分公司
			var Organization=DataCs.getAt(index).get('Organization');
			//客户编号
			var EBScn=DataCs.getAt(index).get('EBScn');
			//当选择总公司时
			cc.log('Organization:'+Organization);
			
			//1.客户编码 有总公司有分公司  进入总公司无任何操作,Siebel无数据
			//2.客户编码 有总公司有分公司  进入分公司同步EBS
			//3.客户编码 有总公司无分公司 进入总工司“申请使用”
			 
			if(Organization=='营业工程总部'){
				//判断是否有分公司
				var num=DataCs.getCount();
				var numGS=0;
				for(var i=0;i<num;i++){
					var Organization2=DataCs.getAt(i).get('Organization');
					var EBScn2=DataCs.getAt(i).get('EBScn');
					if(Organization!=Organization2&&EBScn2==EBScn){
						//当有分公司时，不显示“申请使用”按钮
						numGS++;
						ZD=1;
					}else{
						//当没有分公司的时候
					};
				};
				//没有分公司，显示“申请使用按钮”按钮
				if(numGS==0){
					Ext.getCmp('custominfo_new_id_SQSY').setHidden(false);
					Ext.getCmp('custominfo_new_id_TBZEBS').setHidden(true);
					var ssdd='[';
					ssdd+="{'value':'申请使用','text':'申请使用'}";
					ssdd+=']';
					Ext.getCmp('S_ApplyType').setOptions(eval(ssdd));
					Ext.getCmp('AnNiuPD').setValue('申请使用');
					
					//EBS的申请类型
					Ext.getCmp('E_ApplyType').setValue(data.ApplyType2);
					Ext.getCmp('E_ApplyType').setReadOnly(true);
				};
			}else{//当选择分公司的时候，EBS同步
				Ext.getCmp('custominfo_new_id_TBZEBS').setHidden(false);
				Ext.getCmp('custominfo_new_id_SQSY').setHidden(true);
				Ext.getCmp('AnNiuPD').setValue('同步至EBS');
				//Ext.getCmp('custominfo_new_id_SQSY').setHidden(false);
				//下拉列表
				var ssdd='[';
				ssdd+="{'value':'申请使用','text':'申请使用'},";
				ssdd+="{'value':'地址层变更','text':'地址层变更'},";
				//后加
				ssdd+="{'value':'客户新增','text':'客户新增'},";
				ssdd+="{'value':'头层失效','text':'头层失效'},";
				ssdd+="{'value':'地址层失效','text':'地址层失效'},";
				ssdd+="{'value':'头层地址层变更','text':'头层地址层变更'}";
				ssdd+=']';
				Ext.getCmp('S_ApplyType').setOptions(eval(ssdd));
				//Ext.getCmp('S_ApplyType').setReadOnly(true);
				Ext.getCmp('E_ApplyType').setReadOnly(true);
				Ext.getCmp('E_ApplyType').setLabel('上次申请类型');
				Ext.getCmp('E_ApplyType').setValue(data.ApplyType1);
			};
			
			//只读判断
			//Siebel头层和EBS永久只读
			//Siebel
			var SnameKJ=['S_Organization','S_CSN','S_Name',
			            'S_AccountStatus','S_ApproveStatus','S_AccountSort','S_AccountClass',
			            'S_AccountAttribute','S_AccountProperty','S_AccountMPType','S_Type',
			            'S_AccountSubType','S_CertifiAddress','S_Extraordinary','S_OrgCodeDate',
			            'S_OrgCodeNumber','S_BigCustomer','S_AccountKANumber','S_ParentAccountName',
			            'S_TaxRegist','S_Country','S_Province','S_City',
			            'S_EBSCustomerSite','S_PostalCode','S_Contact','S_MainPhoneNumber',
			            'S_MainFaxNumber','S_BankName','S_BankNumber'];
			
			//EBS
			var EnameKJ=['E_Organization','E_CSN','E_Name',
			            'E_AccountStatus','E_ApproveStatus','E_AccountSort','E_AccountClass',
			            'E_AccountAttribute','E_AccountProperty','E_AccountMPType','E_Type',
			            'E_AccountSubType','E_CertifiAddress','E_Extraordinary','E_OrgCodeDate',
			            'E_OrgCodeNumber','E_BigCustomer','E_AccountKANumber','E_ParentAccountName',
			            'E_TaxRegist','E_Country','E_Province','E_City',
			            'E_EBSCustomerSite','E_PostalCode','E_Contact','E_MainPhoneNumber',
			            'E_MainFaxNumber','E_BankName','E_BankNumber'];
			//有些字段没有，所以要做存在判断。EBS永久只读
			if(ZD==0){//siebel可编辑，
				//Siebel部分只读
				for(var i=0;i<19;i++){
					Ext.getCmp(SnameKJ[i]).setReadOnly(true);
				};
			}else if(ZD==1){//siebel只读
				//Siebel只读
				for(var i=0;i<SnameKJ.length;i++){
					Ext.getCmp(SnameKJ[i]).setReadOnly(true);
				};
			};
			//EBS只读
			for(var i=0;i<EnameKJ.length;i++){
				Ext.getCmp(EnameKJ[i]).setReadOnly(true);
			};
			
			//为控件添加值
			Ext.getCmp('S_RowId').setValue(data.RowId);
			//独有的
			//组织
			/*   "ListOfAccount_Organization":
				{"Account_Organization":
				{"Location":"",
				//	"Organization":"汕头分公司",
				//	"OrganizationId":"1-KO1VE"
						}
			    },*/
			
			//2015-11-20  当
			if(ZD==1){
				cc.log('siebel无');
				//组织
				try{
					Ext.getCmp('S_Organization').setValue(data.ListOfAccount_Organization.Account_Organization.Organization);
				}catch(e){
					Ext.getCmp('S_Organization').setValue('');
				};
				//组织ID   
				try{
					Ext.getCmp('S_OrganizationId').setValue(data.ListOfAccount_Organization.Account_Organization.OrganizationId);
				}catch(e){
					Ext.getCmp('S_OrganizationId').setValue('');
				};
				
				//状态
				Ext.getCmp('S_AccountStatus').setValue(data.AccountStatus);
				
				
				//公用的
				Ext.getCmp('E_CSN').setValue(data.CSN);//头层的客户编码,申请使用时 用不到
				Ext.getCmp('E_Name').setValue(data.Name);
				Ext.getCmp('E_AccountStatus').setValue(data.AccountStatus);
				Ext.getCmp('E_ApproveStatus').setValue(data.ApproveStatus);
				Ext.getCmp('E_AccountAttribute').setValue(data.AccountAttribute);
				Ext.getCmp('E_AccountProperty').setValue(data.AccountProperty);
				Ext.getCmp('E_AccountMPType').setValue(data.AccountMPType);
				Ext.getCmp('E_Type').setValue(data.Type);
				Ext.getCmp('E_AccountSubType').setValue(data.AccountSubType);
				Ext.getCmp('E_BigCustomer').setValue(data.BigCustomer);
				Ext.getCmp('E_AccountKANumber').setValue(data.AccountKANumber);
				Ext.getCmp('E_ParentAccountName').setValue(data.ParentAccountName);
				Ext.getCmp('E_ParentAccountId').setValue(data.ParentAccountId);
				
			
				    
				//EBS
				//客户行层的客户编码
				//组织ID   
				try{
					Ext.getCmp('E_Organization').setValue(data.ListOfAccount_Organization.Account_Organization.Organization);
				}catch(e){
					Ext.getCmp('E_Organization').setValue('');
				};
				Ext.getCmp('E_AccountNumber').setValue(data.EBSCustomerNumber);
				//Ext.getCmp('E_ApplyType').setValue(data.ApplyType2);
				Ext.getCmp('E_AccountSort').setValue(data.AccountSort2);
				Ext.getCmp('E_AccountClass').setValue(data.AccountClass2);
				Ext.getCmp('E_CertifiAddress').setValue(data.CertifiAddress2);
				if(data.Extraordinary2==''){
					Ext.getCmp('E_Extraordinary').setValue('N');
				}else{
					Ext.getCmp('E_Extraordinary').setValue(data.Extraordinary2);
				};
				Ext.getCmp('E_OrgCodeDate').setValue(data.OrgCodeDate2);
				Ext.getCmp('E_OrgCodeNumber').setValue(data.OrgCodeNumber2);
				Ext.getCmp('E_TaxRegist').setValue(data.TaxRegist2);
				//地址
				Ext.getCmp('E_PostalCode').setValue(data.PostalCode2);
				Ext.getCmp('E_Province').setValue(data.Province2);
				Ext.getCmp('E_City').setValue(data.City2);
				Ext.getCmp('E_Country').setValue(data.Country2);
				//
				Ext.getCmp('E_Contact').setValue(data.Contact2);
				Ext.getCmp('E_MainPhoneNumber').setValue(data.MainPhoneNumber2);
				Ext.getCmp('E_MainFaxNumber').setValue(data.MainFaxNumber2);
				Ext.getCmp('E_BankName').setValue(data.BankName2);
				Ext.getCmp('E_BankNumber').setValue(data.BankNumber2);
				//特殊的
				Ext.getCmp('E_Associate').setValue(data.Associate2);
				Ext.getCmp('E_Region').setValue(data.Region2);
				Ext.getCmp('E_SmallScaleTaxpayer').setValue(data.SmallScaleTaxpayer2);
				Ext.getCmp('E_AccountGroup').setValue(data.AccountGroup2);
				Ext.getCmp('E_HQEBSCustomerId').setValue(data.HQEBSCustomerId);
				Ext.getCmp('E_HQEBSCustomerSiteId').setValue(data.HQEBSCustomerSiteId);
				Ext.getCmp('E_EBSCustomerName').setValue(data.EBSCustomerName);
				//暂时用不到的字段
				//"BranchRegionalTranspFc2":"",
				//"Remark2":"",
				
				//按钮隐藏
				Ext.getCmp('S_ParentAccountName_CX').setHidden(true);
				Ext.getCmp('S_EBSCustomerSite_CX').setHidden(true);
			}else{
				cc.log('siebel有');
				try{
					Ext.getCmp('S_Organization').setValue(data.ListOfAccount_Organization.Account_Organization.Organization);
				}catch(e){
					Ext.getCmp('S_Organization').setValue('');
				};
				//组织ID   
				try{
					Ext.getCmp('S_OrganizationId').setValue(data.ListOfAccount_Organization.Account_Organization.OrganizationId);
				}catch(e){
					Ext.getCmp('S_OrganizationId').setValue('');
				};
				Ext.getCmp('S_CSN').setValue(data.CSN);//头层的客户编码,申请使用时 用不到
				Ext.getCmp('S_Name').setValue(data.Name);
				Ext.getCmp('S_AccountStatus').setValue(data.AccountStatus);
				Ext.getCmp('S_ApproveStatus').setValue(data.ApproveStatus);
				Ext.getCmp('S_AccountAttribute').setValue(data.AccountAttribute);
				Ext.getCmp('S_AccountProperty').setValue(data.AccountProperty);
				Ext.getCmp('S_AccountMPType').setValue(data.AccountMPType);
				Ext.getCmp('S_Type').setValue(data.Type);
				Ext.getCmp('S_AccountSubType').setValue(data.AccountSubType);
				Ext.getCmp('S_BigCustomer').setValue(data.BigCustomer);
				Ext.getCmp('S_AccountKANumber').setValue(data.AccountKANumber);
				Ext.getCmp('S_ParentAccountName').setValue(data.ParentAccountName);
				Ext.getCmp('S_ParentAccountId').setValue(data.ParentAccountId);
				//客户头层状态
				Ext.getCmp('S_HeadStatus').setValue(data.HeadStatus);
				//客户地址层状态
				Ext.getCmp('S_AddressStatus').setValue(data.AddressStatus);
				
				//公用的
				Ext.getCmp('E_CSN').setValue(data.CSN);//头层的客户编码,申请使用时 用不到
				Ext.getCmp('E_Name').setValue(data.Name);
				Ext.getCmp('E_AccountStatus').setValue(data.AccountStatus);
				Ext.getCmp('E_ApproveStatus').setValue(data.ApproveStatus);
				Ext.getCmp('E_AccountAttribute').setValue(data.AccountAttribute);
				Ext.getCmp('E_AccountProperty').setValue(data.AccountProperty);
				Ext.getCmp('E_AccountMPType').setValue(data.AccountMPType);
				Ext.getCmp('E_Type').setValue(data.Type);
				Ext.getCmp('E_AccountSubType').setValue(data.AccountSubType);
				Ext.getCmp('E_BigCustomer').setValue(data.BigCustomer);
				Ext.getCmp('E_AccountKANumber').setValue(data.AccountKANumber);
				Ext.getCmp('E_ParentAccountName').setValue(data.ParentAccountName);
				Ext.getCmp('E_ParentAccountId').setValue(data.ParentAccountId);
				
				//暂时用不到的字段
				//"ADLStatus":"",
				//"Location":"",
				//"EBSCustomerId":"",
				//"CurrencyCode":"CNY",
				//"PrimaryOrganizationId":"1-KO1VE",
				//"PartnerFlag":"N",
				//"RowId":"1-QWF75L",
				//"PrimaryOrganization":"汕头分公司",
				//"Relationship":"",
				//"CustomerSiteId":"",
				//"ApproveSuggestion":"",
				//"AccountFlag":"Y",
				//"InProcessFlag":"",
				//"EBSCustomerSite":"",
				    
				    
				//Siebel
				//客户行层的客户编码
				Ext.getCmp('S_AccountNumber').setValue(data.AccountNumber1);
				Ext.getCmp('S_ApplyType').setValue(data.ApplyType1);
				Ext.getCmp('S_AccountSort').setValue(data.AccountSort1);   
				Ext.getCmp('S_AccountClass').setValue(data.AccountClass1); 
				Ext.getCmp('S_CertifiAddress').setValue(data.CertifiAddress1);
				if(data.Extraordinary1==''){
					Ext.getCmp('S_Extraordinary').setValue('N');
				}else{
					Ext.getCmp('S_Extraordinary').setValue(data.Extraordinary1);
				};
				Ext.getCmp('S_OrgCodeDate').setValue(data.OrgCodeDate1);
				Ext.getCmp('S_OrgCodeNumber').setValue(data.OrgCodeNumber1);
				Ext.getCmp('S_TaxRegist').setValue(data.TaxRegist1);
				//地址
				var DataCsTwo=Ext.data.StoreManager.get('CustornAddressTwoStore');
				if(!DataCsTwo){
					DataCsTwo=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.CustornAddressTwoStore');
				};
				var dataT=data.ListOfAccount_BusinessAddress.Account_BusinessAddress;
				DataCsTwo.setData(dataT);
				var DataCsTwoNum=DataCsTwo.getCount();
				//cc.log('DataCsTwoNum:'+DataCsTwoNum);
				for(var i=0;i<DataCsTwoNum;i++){
					var yOrn='';
					if(DataCsTwoNum>1){
						yOrn=dataT[i].IsPrimaryMVG;	
					}else{
						yOrn=dataT.IsPrimaryMVG;
					}
					//cc.log('yOrn:'+yOrn);
					if(yOrn=='Y'){
						cc.log(DataCsTwo.getAt(i).get('Country'));
						Ext.getCmp('S_Country').setValue(DataCsTwo.getAt(i).get('Country'));
						Ext.getCmp('S_Province').setValue(DataCsTwo.getAt(i).get('Province'));
						Ext.getCmp('S_City').setValue(DataCsTwo.getAt(i).get('City'));
						Ext.getCmp('S_EBSCustomerSite').setValue(DataCsTwo.getAt(i).get('StreetAddress'));
						Ext.getCmp('S_PostalCode').setValue(DataCsTwo.getAt(i).get('PostalCode'));
						break;
					};
				};
				//cc.log('跳出循环了');
			    /*"ListOfAccount_BusinessAddress":
			    {"Account_BusinessAddress":
			    	[
			    	 {"PostalCode":"",
			    		 "County":"北湖区",
			    		 "IsPrimaryMVG":"N",
			    		 "State":"",
			    		 "Province":"湖南",
			    		 "Country":"中国",
			    		 "StreetAddress":"郴州市北湖区武广铁路站前大道东侧乾通时代广场",
			    		 "City":"郴州市"
			    	  },
			    	  {"PostalCode":"",
			    		  "County":"北湖区",
			    		  "IsPrimaryMVG":"Y",
			    		  "State":"",
			    		  "Province":"湖南",
			    		  "Country":"中国",
			    		  "StreetAddress":"郴州市北湖区健康路北湖新世界A幢601号房",
			    		  "City":"郴州市"
			    	  }
			    	]
			   },*/
				//
				Ext.getCmp('S_Contact').setValue(data.Contact1);
				Ext.getCmp('S_MainPhoneNumber').setValue(data.MainPhoneNumber);
				Ext.getCmp('S_MainFaxNumber').setValue(data.MainFaxNumber);
				Ext.getCmp('S_BankName').setValue(data.BankName1);
				Ext.getCmp('S_BankNumber').setValue(data.BankNumber1);
				//特殊的
				Ext.getCmp('S_Associate').setValue(data.Associate1);
				Ext.getCmp('S_Region').setValue(data.Region1);
				Ext.getCmp('S_SmallScaleTaxpayer').setValue(data.SmallScaleTaxpayer1);
				Ext.getCmp('S_HQEBSCustomerId').setValue(data.HQEBSCustomerId1);
				Ext.getCmp('S_HQEBSCustomerSiteId').setValue(data.HQEBSCustomerSiteId1);
				Ext.getCmp('S_AccountGroup').setValue(data.AccountGroup1);
				Ext.getCmp('S_EBSCustomerName').setValue(data.EBSCustomerName1);
				//暂时用不到的字段
				//"Remark1":"",
				//"BranchRegionalTranspFc1":"",
				
				
				//EBS
				//客户行层的客户编码
				//组织ID   
				try{
					Ext.getCmp('E_Organization').setValue(data.ListOfAccount_Organization.Account_Organization.Organization);
				}catch(e){
					Ext.getCmp('E_Organization').setValue('');
				};
				Ext.getCmp('E_AccountNumber').setValue(data.EBSCustomerNumber);
				//Ext.getCmp('E_ApplyType').setValue(data.ApplyType2);
				Ext.getCmp('E_AccountSort').setValue(data.AccountSort2);
				Ext.getCmp('E_AccountClass').setValue(data.AccountClass2);
				Ext.getCmp('E_CertifiAddress').setValue(data.CertifiAddress2);
				if(data.Extraordinary2==''){
					Ext.getCmp('E_Extraordinary').setValue('N');
				}else{
					Ext.getCmp('E_Extraordinary').setValue(data.Extraordinary2);
				};
				Ext.getCmp('E_OrgCodeDate').setValue(data.OrgCodeDate2);
				Ext.getCmp('E_OrgCodeNumber').setValue(data.OrgCodeNumber2);
				Ext.getCmp('E_TaxRegist').setValue(data.TaxRegist2);
				//地址
				Ext.getCmp('E_PostalCode').setValue(data.PostalCode2);
				Ext.getCmp('E_Province').setValue(data.Province2);
				Ext.getCmp('E_City').setValue(data.City2);
				Ext.getCmp('E_Country').setValue(data.Country2);
				//
				Ext.getCmp('E_Contact').setValue(data.Contact2);
				Ext.getCmp('E_MainPhoneNumber').setValue(data.MainPhoneNumber2);
				Ext.getCmp('E_MainFaxNumber').setValue(data.MainFaxNumber2);
				Ext.getCmp('E_BankName').setValue(data.BankName2);
				Ext.getCmp('E_BankNumber').setValue(data.BankNumber2);
				//特殊的
				Ext.getCmp('E_Associate').setValue(data.Associate2);
				Ext.getCmp('E_Region').setValue(data.Region2);
				Ext.getCmp('E_SmallScaleTaxpayer').setValue(data.SmallScaleTaxpayer2);
				Ext.getCmp('E_AccountGroup').setValue(data.AccountGroup2);
				Ext.getCmp('E_HQEBSCustomerId').setValue(data.HQEBSCustomerId);
				Ext.getCmp('E_HQEBSCustomerSiteId').setValue(data.HQEBSCustomerSiteId);
				Ext.getCmp('E_EBSCustomerName').setValue(data.EBSCustomerName);
			};
			
			//附件查询
			KHZL_CHAXUN_FF(obj,'jpeg',data.RowId);
			
		};
		//获取条件
		var DataCs=Ext.data.StoreManager.get('ClientStore');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.ClientStore');
		};
		var id=DataCs.getAt(index).get('RowId');
		//cc.log('id:'+id);
		//整合条件
		var TJdata={};
		TJdata.rowid=id;
		TJdata.viewmodel='ALL';
		obj.connectServer_custom(getResult,TJdata,2,userID);
	},
	

});