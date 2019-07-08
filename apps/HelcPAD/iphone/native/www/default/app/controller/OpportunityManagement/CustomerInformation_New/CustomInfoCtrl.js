
/* JavaScript content from app/controller/OpportunityManagement/CustomerInformation_New/CustomInfoCtrl.js in folder common */
//第一次客户资料保存成功的后台返回的ID
var KHZL_PrimaryRowId_id='';
Ext.define('HelcPAD.controller.OpportunityManagement.CustomerInformation_New.CustomInfoCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回按钮
			/*"button#custominfo_new_id_FH":{
				tap:'custominfo_new_id_FH'
			},*/

			//联系人  增加按钮
			/*"button#custominfo_new_id_LXR_ZZ":{
				tap:'custominfo_new_id_LXR_ZZ'
			},*/
			
			//联系人   删除按钮
			/*"button#custominfo_new_id_LXR_SC":{
				tap:'custominfo_new_id_LXR_SC'
			},*/
			
			//联系人 list
			/*"list#custominfo_new_id_list_LXR":{
				itemtap:'custominfo_new_id_list_LXR'
			},*/
			
			//申请使用 按钮
			/*"button#custominfo_new_id_SQSY":{
				tap:'custominfo_new_id_SQSY'
			},*/
			
			//提交申请 按钮
			/*"button#custominfo_new_id_SQTJ":{
				tap:'custominfo_new_id_SQTJ'
			},*/
			
			//同步EBS
			/*"button#custominfo_new_id_TBZEBS":{
				tap:'custominfo_new_id_TBZEBS'
			},*/
			
			//通过选择客户类型获取客户子类型
			"selectfield#S_Type":{
				change:'S_Type'
			},
			
			//通过 大客户 获得 大客户编号
			"selectfield#S_BigCustomer":{
				change:'S_BigCustomer'
			},
			
			//业务联系地址    查询按钮
			"button#S_EBSCustomerSite_CX":{
				tap:'S_EBSCustomerSite_CX'
			},
			
			//特批判断 是否必填
			"selectfield#S_Extraordinary":{
				change:'S_Extraordinary'
			},
			
			//父客户查询
			"button#S_ParentAccountName_CX":{
				tap:'S_ParentAccountName_CX'
			},
			
			
			
			//拍摄照片
			"button#custominfo_new_id_PSZP":{
				tap:'custominfo_new_id_PSZP'
			},
			
			//选取照片
			"button#custominfo_new_id_XQZP":{
				tap:'custominfo_new_id_XQZP'
			},
			
			//点击删除一张图片
			"list#custominfo_new_id_listV":{
				itemtap:'custominfo_new_id_listV'
			},
			
			//上传
			"button#custominfo_new_id_SHANGCHUANG":{
				tap:'custominfo_new_id_SHANGCHUANG'
			},
			
			//判断获得页签
			"tabpanel#tabpanel_custominfo_one":{
				activeitemchange:'tabpanel_custominfo_one'
			},
			
			//子客户查询
			"button#S_Subcustomers_CX":{
				tap:'S_Subcustomers_CX'
			},
			
		}
	},
	
	//子客户查询 
	S_Subcustomers_CX:function(){
		var obj=this;
		var S_ParentAccountId=Ext.getCmp('S_ParentAccountId').getValue();
		var SearchSpec='';
		alert(S_ParentAccountId);
		if(S_ParentAccountId){
			SearchSpec="[Account.Parent Account Id] = '"+1-S_ParentAccountId+"'";
		}else{
			Ext.Msg.alert('温馨提示','请先选择父客户！');
			return;
		};
		var part = {
				userID:userID,
				NewQuery:true,
				PageSize:10,
				SearchSpec:SearchSpec,
				ViewMode:'All',
				StartRowNum:0,
		};
		
		var data = {};
		data.adpName='HttpAdapter_PAD_Custom';
		data.prodName='getSubcustomersSelect';
		data.parameters=part;
		
		var getResult = function(result){
			cc.log(result);
		};
		
		objs.XCX_GG_FF(getResult,data);
		
	},
	
	//自定义按钮
	custom_zdyan:function(obj){
		//上一页 
		var SYY=document.getElementById('custominfo_new_id_SYY');
		SYY.onclick = function (){
			obj.showBackView('customlist_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomList');
			KHZL_PrimaryRowId_id='';
			picture_list=[];
			var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
			store.setData([]);
		};
		
		//提交申请
		var TJSQ=document.getElementById('custominfo_new_id_TJSQ');
		TJSQ.onclick = function (){
			//非空判断
			var BT=['S_Name','S_AccountSort','S_AccountClass','S_AccountAttribute',
			        'S_AccountProperty','S_AccountMPType','S_Type','S_AccountSubType',
			        'S_CertifiAddress','S_EBSCustomerSite','S_Contact','S_MainPhoneNumber','S_PostalCode'];
			var BTYZ=['名称不能为空','','','',
			          '','','','',
			          '证照详细地址不能为空','业务联系地址不能为空','联系人不能为空','主要电话号码不能为空','邮政编码不能为空'];
			var BTnum=BT.length;
			for(var i=0;i<BTnum;i++){
				var YZdata=Ext.getCmp(BT[i]).getValue();   
				if(YZdata==''){
					Ext.Msg.alert('提示',BTYZ[i]);
					return;
				};
			};
			
			Ext.Msg.show({
				   title: '温馨提示',
				   message: '是否执行当前操作?',
				   buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
				   fn: function(buttonId) {
					   if(buttonId == 'yes'){
						 //先保存
							getResult=function(data){
								myLoading.hide();
								KHZL_PrimaryRowId_id=data;
								//判断是否保存成功
								cc.log('保存成功:'+data);
								//return;
								obj.connectServer_custom_TJSQ(getResult2,data);
							};
							//后提交申请
							getResult2=function(data){
								cc.log('提交成功');
								Ext.Msg.alert("提交成功");
								//上传附件
								//上传数据合集
								var num=picture_list.length;
								if(num==0){
									obj.BackView();
									obj.BackView();
									obj.BackView();
									
									KHZL_PrimaryRowId_id='';
									picture_list=[];
									//清空
									var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
									store.setData([]);
									return;
								};
								
								WL.Toast.show('开始附件上传！');
								
								var data=[];
								for(var i=0;i<num;i++){
									var trim={};
									trim.AccntFileExt='jpeg';                  //后缀名  *
									trim.AccntFileName=Ext.Date.now();         //文件名  *
									trim.AccountId=KHZL_PrimaryRowId_id;       //客户ID*
									trim.AccntFileBuffer=picture_list[i].Fsrc;
									data[i]=trim;
								};
								var num2=0;
								try{
									getResult3=function(data,obj){
										num2++;
										if(num!=num2){
											obj.connectServer_custom_FJ_SC(getResult3,obj,data[num2]);
										};
										myLoading.hide();
										Ext.Msg.alert("提示","附件上传成功");
										//
										obj.showBackView('pdamain','HelcPAD.view.login.PADMain');
										KHZL_PrimaryRowId_id='';
										picture_list=[];
										//清空
										var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
										store.setData([]);
										//提交附件
									};
									obj.connectServer_custom_FJ_SC(getResult3,obj,data[num2]);
								}catch(e){
									WL.Toast.show('上传失败！');
									obj.showBackView('pdamain','HelcPAD.view.login.PADMain');
									KHZL_PrimaryRowId_id='';
									picture_list=[];
									//清空
									var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
									store.setData([]);
								};
							};
							
							//上传附件
							getResult3=function(){
								var num=picture_list.length;
								num2++;
								if(num!=num2){
									obj.connectServer_custom_FJ_SC(getResult3,obj,data[num2]);
								};
								myLoading.hide();
								Ext.Msg.alert("提示","提交成功");
							};
							
							//获取客户资料   对照完毕 不必复查    2015-9-7
							var Trim={};
							Trim.ApplyType1=Ext.getCmp('S_ApplyType').getValue();        
							Trim.CSN=Ext.getCmp('S_CSN').getValue();            
							Trim.CertifiAddress1=Ext.getCmp('S_CertifiAddress').getValue();  
							Trim.Extraordinary1=Ext.getCmp('S_Extraordinary').getValue();     
							Trim.OrgCodeNumber1=Ext.getCmp('S_OrgCodeNumber').getValue();    
							var data_s=Ext.getCmp('S_OrgCodeDate').getValue();
							if(data_s!=''){
								var datab=new Date(data_s);
								//月  日  年
								Trim.OrgCodeDate1=Ext.Date.format(datab,'m/d/Y');
							};
							Trim.AccountClass1=Ext.getCmp('S_AccountClass').getValue();       
							Trim.AccountSort1=Ext.getCmp('S_AccountSort').getValue();         
							Trim.TaxRegist1=Ext.getCmp('S_TaxRegist').getValue();      
							Trim.Contact1=Ext.getCmp('S_Contact').getValue();             
							Trim.MainPhoneNumber=Ext.getCmp('S_MainPhoneNumber').getValue();   
							Trim.MainFaxNumber=Ext.getCmp('S_MainFaxNumber').getValue();       
							Trim.AccountAttribute=Ext.getCmp('S_AccountAttribute').getValue();   
							Trim.AccountProperty=Ext.getCmp('S_AccountProperty').getValue();      
							Trim.AccountMPType=Ext.getCmp('S_AccountMPType').getValue();         
							Trim.Name=Ext.getCmp('S_Name').getValue();           
							Trim.Type=Ext.getCmp('S_Type').getValue();           
							//和申请使用 不同 的
							Trim.Organization=Ext.getCmp('S_Organization').getValue();//组织                   
							Trim.AccountStatus=Ext.getCmp('S_AccountStatus').getValue();//状态             
							Trim.ApproveStatus=Ext.getCmp('S_ApproveStatus').getValue();//审核状态     
							//Trim.AccountStatus='潜在';           
							//Trim.ApproveStatus='新建';   

							Trim.AccountSubType=Ext.getCmp('S_AccountSubType').getValue();//客户子类型         
							Trim.BigCustomer=Ext.getCmp('S_BigCustomer').getValue();//大客户        
							Trim.AccountKANumber=Ext.getCmp('S_AccountKANumber').getValue();//大客户编号   
							Trim.BankName1=Ext.getCmp('S_BankName').getValue();//开户银行名称      
							Trim.BankNumber1=Ext.getCmp('S_BankNumber').getValue();//开户银行帐号 
							//是数组的地址集合
							var DataCsTwo=Ext.data.StoreManager.get('CustornAddressTwoStore');
							if(!DataCsTwo){
								DataCsTwo=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.CustornAddressTwoStore');
							};
							var DataCsTwoNum=DataCsTwo.getCount();
							var Account=[];
							for(var i=0;i<DataCsTwoNum;i++){
								var dz={};
								dz.AddressId=DataCsTwo.getAt(i).get('RowId');
								dz.Country=DataCsTwo.getAt(i).get('Country');
								dz.Province=DataCsTwo.getAt(i).get('Province');
								dz.City=DataCsTwo.getAt(i).get('City');
								dz.County=DataCsTwo.getAt(i).get('County');
								dz.StreetAddress=DataCsTwo.getAt(i).get('StreetAddress');
								dz.PostalCode=DataCsTwo.getAt(i).get('PostalCode');
								dz.IsPrimaryMVG='';
								var StreetAddress=Ext.getCmp('S_EBSCustomerSite').getValue();
								if(StreetAddress==dz.StreetAddress){
									dz.IsPrimaryMVG='Y';
									dz.PostalCode=Ext.getCmp('S_PostalCode').getValue();
								};
								Account[i]=dz;
							};
							Trim.Account=Account;
							//特殊的ID
							//组织ID
							Trim.OrganizationId='';
							//客户Userkey 修改的时候会用到
							Trim.PrimaryOrganizationId='';
							//父客户  有点特殊 要考虑下
							Trim.ParentAccountName=Ext.getCmp('S_ParentAccountName').getValue();
							//父客户ID
							Trim.ParentAccountId=Ext.getCmp('S_ParentAccountId').getValue();
							//重复保存更新的id
							cc.log('Trim.Id:'+KHZL_PrimaryRowId_id);
							Trim.Id=KHZL_PrimaryRowId_id;
							cc.log('Trim.Id2:'+Trim.Id);
							//保存
							obj.connectServer_custom_BC(getResult,Trim);
						   
					   }
				   }
			});
		
		};
		
		//申请使用
		var SQSY=document.getElementById('custominfo_new_id_SQSYDiv');
		SQSY.onclick = function (){
			Ext.Msg.show({
				   title: '温馨提示',
				   message: '是否执行当前操作?',
				   buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
				   fn: function(buttonId) {
					   if(buttonId == 'yes'){
						 //结果
							getResult=function(data){
								Ext.Msg.alert("申请成功");
								obj.showBackView('customSearch_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomSearch');
								picture_list=[];
								KHZL_PrimaryRowId_id='';
								var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
								store.setData([]);
							};
							//获取客户资料
							var Trim={};
							//从头客户自行拷贝来自EBS
							Trim.ApplyType1='申请使用';//默认
							Trim.AccountNumber1=Ext.getCmp('E_AccountNumber').getValue();
							Trim.EBSCustomerName1=Ext.getCmp('E_EBSCustomerName').getValue();
							Trim.CertifiAddress1=Ext.getCmp('E_CertifiAddress').getValue();
							Trim.Extraordinary1=Ext.getCmp('E_Extraordinary').getValue();
							Trim.OrgCodeNumber1=Ext.getCmp('E_OrgCodeNumber').getValue();
							Trim.OrgCodeDate1=Ext.getCmp('E_OrgCodeDate').getValue();
							Trim.AccountClass1=Ext.getCmp('E_AccountClass').getValue();
							Trim.AccountSort1=Ext.getCmp('E_AccountSort').getValue();
							Trim.TaxRegist1=Ext.getCmp('E_TaxRegist').getValue();
							Trim.Associate1=Ext.getCmp('E_Associate').getValue();
							Trim.Region1=Ext.getCmp('E_Region').getValue();
							Trim.SmallScaleTaxpayer1=Ext.getCmp('E_SmallScaleTaxpayer').getValue();
							Trim.HQEBSCustomerId1=Ext.getCmp('E_HQEBSCustomerId').getValue();
							Trim.HQEBSCustomerSiteId1=Ext.getCmp('E_HQEBSCustomerSiteId').getValue();
							Trim.AccountGroup1=Ext.getCmp('E_AccountGroup').getValue();
							Trim.HeadStatus='有效';
							Trim.AddressStatus='有效';
							
							//地址层信息手动填写 来自Siebel
							//是数组的地址集合
							var DataCsTwo=Ext.data.StoreManager.get('CustornAddressTwoStore');
							if(!DataCsTwo){
								DataCsTwo=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.CustornAddressTwoStore');
							};
							var DataCsTwoNum=DataCsTwo.getCount();
							var Account=[];
							for(var i=0;i<DataCsTwoNum;i++){
								var dz={};
								dz.AddressId=DataCsTwo.getAt(i).get('RowId');
								dz.Country=DataCsTwo.getAt(i).get('Country');
								dz.Province=DataCsTwo.getAt(i).get('Province');
								dz.City=DataCsTwo.getAt(i).get('City');
								dz.County=DataCsTwo.getAt(i).get('County');
								dz.StreetAddress=DataCsTwo.getAt(i).get('StreetAddress');
								dz.PostalCode=DataCsTwo.getAt(i).get('PostalCode');
								Account[i]=dz;
							};
							Trim.Account=Account;
							
							/*Trim.Country=Ext.getCmp('S_Country').getValue();
							Trim.Province=Ext.getCmp('S_Province').getValue();
							Trim.City=Ext.getCmp('S_City').getValue();
							Trim.StreetAddress=Ext.getCmp('S_EBSCustomerSite').getValue();
							Trim.PostalCode=Ext.getCmp('S_PostalCode').getValue();*/

							
							Trim.Contact1=Ext.getCmp('S_Contact').getValue();
							Trim.MainPhoneNumber=Ext.getCmp('S_MainPhoneNumber').getValue();
							Trim.MainFaxNumber=Ext.getCmp('S_MainFaxNumber').getValue();
							
							//必填
							Trim.AccountAttribute=Ext.getCmp('S_AccountAttribute').getValue();
							Trim.AccountProperty=Ext.getCmp('S_AccountProperty').getValue();
							Trim.AccountMPType=Ext.getCmp('S_AccountMPType').getValue();
							Trim.Name=Ext.getCmp('S_Name').getValue();
							Trim.Type=Ext.getCmp('S_Type').getValue();
							cc.log('必填:'+Trim.AccountAttribute+'   2:'+Trim.AccountProperty+'   3:'+Trim.AccountMPType+'   4:'+Trim.Name+'    5:'+Trim.Type);
							
							//接口有问题暂缓  2015-9-11 提交数据检查过没问题
							obj.connectServer_custom_SQSY(getResult,Trim);
					   }
				   }
			});
		};
		
		//同步EBS
		var TBEBS=document.getElementById('custominfo_new_id_TB');
		TBEBS.onclick = function (){
			var RowId=Ext.getCmp('S_RowId').getValue();
			
			Ext.Msg.show({
				   title: '温馨提示',
				   message: '是否执行当前操作?',
				   buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
				   fn: function(buttonId) {
					   if(buttonId == 'yes'){
						   getResult=function(data){
						   	    Ext.Msg.alert("提交成功");
						   		obj.showBackView('pdamain','HelcPAD.view.login.PADMain');
						   		picture_list=[];
						   		KHZL_PrimaryRowId_id='';
						   		var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
						   		store.setData([]);
						   };
						   obj.connectServer_custom_TBEBS(getResult,RowId);
					   }
				   }
			});
		};
		
		//保存至Siebel
		var BCZSB=document.getElementById('custominfo_new_id_BCZS');
		BCZSB.onclick = function (){
			//非空判断
			var BT=['S_Name','S_AccountSort','S_AccountClass','S_AccountAttribute',
			        'S_AccountProperty','S_AccountMPType','S_Type','S_AccountSubType',
			        'S_CertifiAddress','S_EBSCustomerSite','S_Contact','S_MainPhoneNumber','S_PostalCode'];
			var BTYZ=['名称不能为空','','','',
			          '','','','',
			          '证照详细地址不能为空','业务联系地址不能为空','联系人不能为空','主要电话号码不能为空','邮政编码不能为空'];
			var BTnum=BT.length;
			for(var i=0;i<BTnum;i++){
				var YZdata=Ext.getCmp(BT[i]).getValue();   
				if(YZdata==''){
					Ext.Msg.alert('提示',BTYZ[i]);
					return;
				};
			};
			
			Ext.Msg.show({
				   title: '温馨提示',
				   message: '是否保存到Siebel?',
				   buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
				   fn: function(buttonId) {
					   if(buttonId == 'yes'){
						 //先保存
							getResult=function(data){
								myLoading.hide();
								//判断是否保存成功
								Ext.Msg.alert("保存成功");
								cc.log('保存成功:'+data);
							};
							var Data=obj.getApplication().getController('OpportunityManagement.CustomerInformation_New.CustomListCtrl').CZJG;
							var Trim={};
							//头
							Trim.ApplyType1=Ext.getCmp('S_ApplyType').getValue();//本次申请类型
							Trim.Name=Ext.getCmp('S_Name').getValue();   //客户名称
							Trim.AccountSort1=Ext.getCmp('S_AccountSort').getValue();    //客户分类
							Trim.AccountClass1=Ext.getCmp('S_AccountClass').getValue();  //客户类别
							Trim.CertifiAddress1=Ext.getCmp('S_CertifiAddress').getValue();//证照详细地址
							Trim.Extraordinary1=Ext.getCmp('S_Extraordinary').getValue();  //是否特批
							var data_s=Ext.getCmp('S_OrgCodeDate').getValue();    //组织机构代码/身份证效期
							if(data_s!=''){
								var datab=new Date(data_s);
								Trim.OrgCodeDate1=Ext.Date.format(datab,'m/d/Y');//月  日  年
							};
							Trim.OrgCodeNumber1=Ext.getCmp('S_OrgCodeNumber').getValue(); //组织机构代码/身份证号
							Trim.TaxRegist1=Ext.getCmp('S_TaxRegist').getValue();         //国家税务登记证号
							//中
							Trim.AccountAttribute=Ext.getCmp('S_AccountAttribute').getValue();  //客户属性
							Trim.AccountProperty=Ext.getCmp('S_AccountProperty').getValue();  //客户性质
							Trim.AccountMPType=Ext.getCmp('S_AccountMPType').getValue();     //保养客户标识
							Trim.Type=Ext.getCmp('S_Type').getValue();            //客户类型
							Trim.AccountSubType=Ext.getCmp('S_AccountSubType').getValue();//客户子类型  
							Trim.BigCustomer=Ext.getCmp('S_BigCustomer').getValue();//大客户名称        
							Trim.AccountKANumber=Ext.getCmp('S_AccountKANumber').getValue();//大客户编号 
							Trim.ParentAccountName=Ext.getCmp('S_ParentAccountName').getValue();//父客户  
							Trim.ParentAccountId=Ext.getCmp('S_ParentAccountId').getValue();//父客户ID
							//尾
							//是数组的地址集合
							var DataCsTwo=Ext.data.StoreManager.get('CustornAddressTwoStore');
							if(!DataCsTwo){
								DataCsTwo=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.CustornAddressTwoStore');
							};
							var DataCsTwoNum=DataCsTwo.getCount();
							var Account=[];
							for(var i=0;i<DataCsTwoNum;i++){
								var dz={};
								dz.AddressId=DataCsTwo.getAt(i).get('RowId');
								dz.Country=DataCsTwo.getAt(i).get('Country');
								dz.Province=DataCsTwo.getAt(i).get('Province');
								dz.City=DataCsTwo.getAt(i).get('City');
								dz.County=DataCsTwo.getAt(i).get('County');
								dz.StreetAddress=DataCsTwo.getAt(i).get('StreetAddress');
								dz.PostalCode=DataCsTwo.getAt(i).get('PostalCode');
								dz.IsPrimaryMVG='';
								var StreetAddress=Ext.getCmp('S_EBSCustomerSite').getValue();
								if(StreetAddress==dz.StreetAddress){
									dz.IsPrimaryMVG='Y';
									dz.PostalCode=Ext.getCmp('S_PostalCode').getValue();
								};
								Account[i]=dz;
							};
							Trim.Account=Account;
							Trim.Contact1=Ext.getCmp('S_Contact').getValue();//联系人
							Trim.MainPhoneNumber=Ext.getCmp('S_MainPhoneNumber').getValue();//主要电话号码
							Trim.MainFaxNumber=Ext.getCmp('S_MainFaxNumber').getValue();  //主要传真号码     
							Trim.BankName1=Ext.getCmp('S_BankName').getValue();//开户银行名称      
							Trim.BankNumber1=Ext.getCmp('S_BankNumber').getValue();//开户银行帐号 
							
							//修改必要
							//客户Userkey 修改的时候会用到
							Trim.PrimaryOrganizationId=Data.PrimaryOrganizationId;
							//重复保存更新的id
							Trim.Id=Data.RowId;
							cc.log('Trim.Id:'+Trim.PrimaryOrganizationId);
							cc.log('Trim.Id2:'+Trim.Id);
							cc.log(Trim);
							
							//保存
							obj.connectServer_custom_BC(getResult,Trim);
						   
							//保存会用到的  参照例子 无用  2016-3-16
							/*Trim.CSN=Ext.getCmp('S_CSN').getValue(); //客户编码           
							Trim.Organization=Ext.getCmp('S_Organization').getValue();//组织                   
							Trim.AccountStatus=Ext.getCmp('S_AccountStatus').getValue();//状态             
							Trim.ApproveStatus=Ext.getCmp('S_ApproveStatus').getValue();//审核状态     
							Trim.OrganizationId='';//组织ID*/
					   }
				   }
			});
		
		
		};
		
		//上传
		var SC=document.getElementById('custominfo_new_id_SC');
		SC.onclick = function (){
			Ext.Msg.show({
				   title: '温馨提示',
				   message: '是否上传照片?',
				   buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
				   fn: function(buttonId) {
					   if(buttonId == 'yes'){
						   obj.custominfo_new_id_SHANGCHUANG();
					   }
				   }
			});
		};
		
		
	},

	
	//判断获得页签
	tabpanel_custominfo_one:function(obj,value,oldvalue,eOpts){
		try{
			var itemID=value.getActiveItem().getId();
			var AnNiuPD=Ext.getCmp('AnNiuPD').getValue();
			if('custominfo_new_tabpanel_two'==itemID){
				if(AnNiuPD=='申请使用'){
					document.getElementById("custominfo_new_id_SQSYDiv").style.display='block';
				}else if(AnNiuPD=='同步至EBS'){
					document.getElementById("custominfo_new_id_TB").style.display='block';
				}else{
					return;
				};
				document.getElementById("custominfo_new_id_SC").style.display='none';
			}else{
				if(AnNiuPD=='申请使用'){
					document.getElementById("custominfo_new_id_SQSYDiv").style.display='none';
				}else if(AnNiuPD=='同步至EBS'){
					document.getElementById("custominfo_new_id_TB").style.display='none';
				}else{
					return;
				};
				document.getElementById("custominfo_new_id_SC").style.display='block';
			};
		}catch(e){
			
		};
		//cc.log(itemID);
	},
	
	//上传
	custominfo_new_id_SHANGCHUANG:function(){
		var obj=this;
		var row_id=Ext.getCmp('S_RowId').getValue();
		//alert("row_id: " + row_id);
		//<Comment /> 注释    可用可不用
		//上传数据合集
		var data=[];
		var num=picture_list.length;
		if(num==0){
			Ext.Msg.alert("提示","无上传附件");
			return;
		};
		for(var i=0;i<num;i++){
			var trim={};
			trim.AccntFileExt='jpeg';                  //后缀名  *
			trim.AccntFileName=Ext.Date.now();         //文件名  *
			trim.AccountId=row_id;                     //客户ID*
			trim.AccntFileBuffer=picture_list[i].Fsrc;
			data[i]=trim;
		};
		var num2=0;
		getResult=function(data,obj){
			num2++;
			if(num!=num2){
				obj.connectServer_custom_FJ_SC(getResult,obj,data[num2]);
			};
			myLoading.hide();
			Ext.Msg.alert("提示","提交成功");
		};
		obj.connectServer_custom_FJ_SC(getResult,obj,data[num2]);
	},
	
	//点击删除一张图片
	custominfo_new_id_listV:function(obj, index, target, record, e, eOpts){
    	var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
    	
    	if(event.target.id=="custominfo_new_id_listV_DELETE"){//删除
    		
    		Ext.Msg.show({
 			   title: '温馨提示',
 			   message: '是否执行当前操作?',
 			   buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
 			   fn: function(buttonId) {
 				   if(buttonId == 'yes'){
 					//alert(picture_list[index].src);
 			    		var num2=store.getCount();
 			    		//删除了显示的
 			    		store.removeAt(index);
 			    		//删除上传的
 			    		var num=picture_list.length;
 			    		
 			    		if(num==num2){//没下载的
 			    			picture_list.splice(index, 1);
 			    		}else{//有下载的
 			    			var num3=num2-num;
 			    			if(num3<index){
 			    				var num4=index-num3-1;
 			    				picture_list.splice(num4, 1);
 			    			};
 			    		};
 			    		
 			    		//store.setData(picture_list);
 			    		//如果删除的图片不是下载的而是要上传的话
 				   }
 			   }
 		});
    		
    	}else{
    		this.NextView('custornBigImg_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustornBigImg');
    		Ext.getCmp('custornBigImg_new_id_img').setSrc(store.getAt(index).get('src'));
    	};
    },
	
	//选取照片
	custominfo_new_id_XQZP:function(){
		function fu(obj){
			var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
		    var storeNum=store.getCount();
			var TPImg=[];
		    for(var i=0;i<storeNum;i++){
		    	var trim={};
		    	trim.src=store.getAt(i).get('src');
				trim.fb=store.getAt(i).get('fb');
				trim.Fsrc=store.getAt(i).get('Fsrc');
				TPImg[i]=trim;
		    };
		    store.setData(TPImg);
		    //新
		    var picture_listNum=picture_list.length;
		    var TrimNewImg={};
		    TrimNewImg.Fsrc=picture_list[picture_listNum-1].Fsrc;
		    TrimNewImg.src=picture_list[picture_listNum-1].src;
		    store.addData(TrimNewImg);
		    
		    var length=store.getCount();
		    //alert('length:'+length);
			Ext.getCmp('custominfo_new_id_listV').setHeight(length==0?0:(length+1)*35);
		};
		
		this.PAD_GGFS_XQZP('custominfo_new_id_listV',fu,this);
		
		
		
		
	},
	
	//拍摄照片
	custominfo_new_id_PSZP:function(){
		function fu(obj){
			
			var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
			var storeNum=store.getCount();
			var TPImg=[];
		    for(var i=0;i<storeNum;i++){
		    	var trim={};
		    	trim.src=store.getAt(i).get('src');
				trim.fb=store.getAt(i).get('fb');
				trim.Fsrc=store.getAt(i).get('Fsrc');
				TPImg[i]=trim;
		    };
		    store.setData(TPImg);
		    //新
		    var picture_listNum=picture_list.length;
		    var TrimNewImg={};
		    TrimNewImg.Fsrc=picture_list[picture_listNum-1].Fsrc;
		    TrimNewImg.src=picture_list[picture_listNum-1].src;
		    store.addData(TrimNewImg);
		    
		    var length=store.getCount();

			Ext.getCmp('custominfo_new_id_listV').setHeight(length==0?0:(length+1)*35);
		};
		
		this.PAD_GGFS_PSZP('custominfo_new_id_listV',fu,this);
		
	},
	
	//同步EBS
	custominfo_new_id_TBZEBS:function(){
		var RowId=Ext.getCmp('S_RowId').getValue();
		var obj=this;
		
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否执行当前操作?',
			   buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
					   getResult=function(data){
					   	    Ext.Msg.alert("提交成功");
					   		obj.showBackView('pdamain','HelcPAD.view.login.PADMain');
					   		picture_list=[];
					   		KHZL_PrimaryRowId_id='';
					   		var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
					   		store.setData([]);
					   };
					   obj.connectServer_custom_TBEBS(getResult,RowId);
				   }
			   }
		});
		
	},
	
	//父客户查询
	S_ParentAccountName_CX:function(){
		//申请使用 的状态下不可父查询
		var flag=Ext.getCmp('AnNiuPD').getValue();
		var sclx=Ext.getCmp('S_ApplyType').getValue();
		if(sclx=='客户新增'){//新建时也就是提交申请可以使用父客户查询
			if(flag!='提交申请'){
				return;
			}
		}else{
			if(sclx!='头层地址层变更'){
				return;
			};
		};
	
		this.NextView('custornBigCustomer_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustornBigCustomer');
		var DataCs=Ext.data.StoreManager.get('ClientStoreF');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.ClientStoreF');
		};
		DataCs.setData([]);
	},
	
	//特批判断 是否必填
	S_Extraordinary:function(){
		//组织机构代码/身份证效期		必填，特批为是，就不为必填
		//组织机构代码/身份证号		必填，特批为是，就不为必填
		var Extraordinary=Ext.getCmp('S_Extraordinary').getValue();
		if(Extraordinary=='Y'){
			Ext.getCmp('S_OrgCodeDate').setRequired(false);
			Ext.getCmp('S_OrgCodeNumber').setRequired(false);
		}else if(Extraordinary=='N'){
			Ext.getCmp('S_OrgCodeDate').setRequired(true);
			Ext.getCmp('S_OrgCodeNumber').setRequired(true);
		};
	},
	
	
	
	//业务联系地址    查询按钮
	S_EBSCustomerSite_CX:function(){
		var sclx=Ext.getCmp('S_ApplyType').getValue();
		var flag=Ext.getCmp('AnNiuPD').getValue();
		if(sclx=='客户新增'){
			if(flag!='提交申请'){
				return;
			};
		}else{
			if(!flag){
				return;
			};
			if(sclx!='地址层变更'){
				Ext.Msg.alert("温馨提示","本次申请类型不为地址层变更");
				return;
			};
		};
		
		this.NextView('custornAddress_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustornAddress');
		//判断是否显示新建按钮   当不为提交申请时，无法做新建地址
		if(flag!='提交申请'){
			Ext.getCmp('CustornAddress_new_id_XJ').setHidden(false);
		};
		//省的值列表
		var Country=Ext.getCmp('custornAddress_new_id_Country').getValue();
		this.SSX_SJLD(Country,'','custornAddress_new_id_Province','HEL_PROVINCE','');
		
		//测试  可删
		//this.sssjjj();
		Ext.getCmp('custornAddress_new_id_Province').setValue('广东');
		Ext.getCmp('custornAddress_new_id_City').setValue('广州市');
		Ext.getCmp('custornAddress_new_id_County').setValue('白云区');
	},
	
	
	//通过 大客户 获得 大客户编号
	//{"PAR_LIS_VAL":"美的地产","LAST_UPD":"2014-04-03T00:00:00.000Z","PAR_ROW_ID":"1-EW442Q","ROW_ID":"1-EW442U","LIS_VAL":"KA2014050","ORDER_BY":38,"CREATED":"2014-04-03T00:00:00.000Z","TYPE":"HEL_BIGCODE"}
	S_BigCustomer:function(){
		var DataCs=Ext.data.StoreManager.get('CxAppLovVStore');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.CxAppLovVStore');
		};
		var num=DataCs.getCount();
		var kHLX=Ext.getCmp('S_BigCustomer').getValue();
		
		if(kHLX==''){
			var ssdd='[';
			ssdd+="{'value':'','text':''}";
			ssdd+=']';
			Ext.getCmp('S_AccountKANumber').setOptions(eval(ssdd));
			return;
		};
		
		cc.log('kHLX:'+kHLX);
		var JLid=0;
		for(var i=0;i<num;i++){//获取选择的数据在数据仓中的位置
			if(kHLX==DataCs.getAt(i).get('PAR_LIS_VAL')&&'HEL_BIGCODE'==DataCs.getAt(i).get('TYPE')){
				JLid=i;
			};
		};
		
		var ssdd='[';
		ssdd+="{'value':'"+DataCs.getAt(JLid).get('LIS_VAL')+"','text':'"+DataCs.getAt(JLid).get('LIS_VAL')+"'}";
		ssdd+=']';
		Ext.getCmp('S_AccountKANumber').setOptions(eval(ssdd));
	},
	
	//通过选择客户类型获取客户子类型
	//{"PAR_LIS_VAL":null,"LAST_UPD":"2011-10-17T00:00:00.000Z","PAR_ROW_ID":null,"ROW_ID":"1-4ZJ1","LIS_VAL":"普通客户","ORDER_BY":null,"CREATED":"2011-10-17T00:00:00.000Z","TYPE":"ACCOUNT_TYPE"}
	//{"PAR_LIS_VAL":"普通客户","LAST_UPD":"2012-01-04T00:00:00.000Z","PAR_ROW_ID":"1-4ZJ1","ROW_ID":"1-KTF82","LIS_VAL":"当地大客户","ORDER_BY":1,"CREATED":"2012-01-04T00:00:00.000Z","TYPE":"HEL_ACCOUNT_SUBTYPE"},
	S_Type:function(){
		var DataCs=Ext.data.StoreManager.get('CxAppLovVStore');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.CxAppLovVStore');
		};
		var num=DataCs.getCount();
		var kHLX=Ext.getCmp('S_Type').getValue();
		var LIS_VAL_Data=[];
		var LIS_VAL_num=0;
		for(var j=0;j<num;j++){
			if(kHLX==DataCs.getAt(j).get('PAR_LIS_VAL')&&DataCs.getAt(j).get('TYPE')=='HEL_ACCOUNT_SUBTYPE'){
				cc.log(DataCs.getAt(j).get('LIS_VAL'));
				LIS_VAL_Data[LIS_VAL_num]=DataCs.getAt(j).get('LIS_VAL');
				//cc.log(LIS_VAL_num+'   '+LIS_VAL_Data[LIS_VAL_num]);
				LIS_VAL_num++;
			};
		};
		//为下拉列表添加值
		var LIS_VAL_DataLength=LIS_VAL_Data.length;
		var ssdd='[';
		for(var k=0;k<LIS_VAL_DataLength;k++){
			if(k!=LIS_VAL_DataLength-1){
				ssdd+="{'value':'"+LIS_VAL_Data[k]+"','text':'"+LIS_VAL_Data[k]+"'},";
			}else{
				ssdd+="{'value':'"+LIS_VAL_Data[k]+"','text':'"+LIS_VAL_Data[k]+"'}";
			};
		};
		ssdd+=']';
		Ext.getCmp('S_AccountSubType').setOptions(eval(ssdd));
	},
	
	//提交申请   按钮
	//一次只能新建一位，（当新建的客户提交，修改，保存都成功以后才会新建下一个客户资料）
	custominfo_new_id_SQTJ:function(){
		
		//非空判断
		var BT=['S_Name','S_AccountSort','S_AccountClass','S_AccountAttribute',
		        'S_AccountProperty','S_AccountMPType','S_Type','S_AccountSubType',
		        'S_CertifiAddress','S_EBSCustomerSite','S_Contact','S_MainPhoneNumber','S_PostalCode'];
		var BTYZ=['名称不能为空','','','',
		          '','','','',
		          '证照详细地址不能为空','业务联系地址不能为空','联系人不能为空','主要电话号码不能为空','邮政编码不能为空'];
		var BTnum=BT.length;
		for(var i=0;i<BTnum;i++){
			var YZdata=Ext.getCmp(BT[i]).getValue();   
			if(YZdata==''){
				Ext.Msg.alert('提示',BTYZ[i]);
				return;
			};
		};
		var obj=this;
		
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否执行当前操作?',
			   buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
					 //先保存
						getResult=function(data){
							KHZL_PrimaryRowId_id=data;
							//判断是否保存成功
							cc.log('保存成功:'+data);
							obj.connectServer_custom_TJSQ(getResult2,data);
						};
						//后提交申请
						getResult2=function(data){
							cc.log('提交成功');
							Ext.Msg.alert("提交成功");
							//上传附件
							//上传数据合集
							var num=picture_list.length;
							if(num==0){
								//Ext.Msg.alert("提示","无上传附件");
								//obj.showBackView('pdamain','HelcPAD.view.login.PADMain');
								
								obj.BackView();
								obj.BackView();
								obj.BackView();
								
								KHZL_PrimaryRowId_id='';
								picture_list=[];
								//清空
								var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
								store.setData([]);
								return;
							};
							
							WL.Toast.show('开始附件上传！');
							
							var data=[];
							for(var i=0;i<num;i++){
								var trim={};
								trim.AccntFileExt='jpeg';                  //后缀名  *
								trim.AccntFileName=Ext.Date.now();         //文件名  *
								trim.AccountId=KHZL_PrimaryRowId_id;       //客户ID*
								trim.AccntFileBuffer=picture_list[i].Fsrc;
								data[i]=trim;
							};
							var num2=0;
							try{
								getResult3=function(data,obj){
									num2++;
									if(num!=num2){
										obj.connectServer_custom_FJ_SC(getResult3,obj,data[num2]);
									};
									myLoading.hide();
									Ext.Msg.alert("提示","附件上传成功");
									//
									obj.showBackView('pdamain','HelcPAD.view.login.PADMain');
									KHZL_PrimaryRowId_id='';
									picture_list=[];
									//清空
									var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
									store.setData([]);
									//提交附件
								};
								obj.connectServer_custom_FJ_SC(getResult3,obj,data[num2]);
							}catch(e){
								WL.Toast.show('上传失败！');
								obj.showBackView('pdamain','HelcPAD.view.login.PADMain');
								KHZL_PrimaryRowId_id='';
								picture_list=[];
								//清空
								var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
								store.setData([]);
							};
						};
						
						//上传附件
						getResult3=function(){
							var num=picture_list.length;
							num2++;
							if(num!=num2){
								obj.connectServer_custom_FJ_SC(getResult3,obj,data[num2]);
							};
							myLoading.hide();
							Ext.Msg.alert("提示","提交成功");
						};
						
						//获取客户资料   对照完毕 不必复查    2015-9-7
						var Trim={};
						Trim.ApplyType1=Ext.getCmp('S_ApplyType').getValue();        
						Trim.CSN=Ext.getCmp('S_CSN').getValue();            
						Trim.CertifiAddress1=Ext.getCmp('S_CertifiAddress').getValue();  
						Trim.Extraordinary1=Ext.getCmp('S_Extraordinary').getValue();     
						Trim.OrgCodeNumber1=Ext.getCmp('S_OrgCodeNumber').getValue();    
						var data_s=Ext.getCmp('S_OrgCodeDate').getValue();
						var datab=new Date(data_s);
						//月  日  年
						Trim.OrgCodeDate1=Ext.Date.format(datab,'m/d/Y');
						Trim.AccountClass1=Ext.getCmp('S_AccountClass').getValue();       
						Trim.AccountSort1=Ext.getCmp('S_AccountSort').getValue();         
						Trim.TaxRegist1=Ext.getCmp('S_TaxRegist').getValue();      
						Trim.Contact1=Ext.getCmp('S_Contact').getValue();             
						Trim.MainPhoneNumber=Ext.getCmp('S_MainPhoneNumber').getValue();   
						Trim.MainFaxNumber=Ext.getCmp('S_MainFaxNumber').getValue();       
						Trim.AccountAttribute=Ext.getCmp('S_AccountAttribute').getValue();   
						Trim.AccountProperty=Ext.getCmp('S_AccountProperty').getValue();      
						Trim.AccountMPType=Ext.getCmp('S_AccountMPType').getValue();         
						Trim.Name=Ext.getCmp('S_Name').getValue();           
						Trim.Type=Ext.getCmp('S_Type').getValue();           
						//和申请使用 不同 的
						Trim.Organization=Ext.getCmp('S_Organization').getValue();//组织                   
						Trim.AccountStatus=Ext.getCmp('S_AccountStatus').getValue();//状态             
						Trim.ApproveStatus=Ext.getCmp('S_ApproveStatus').getValue();//审核状态     
						//Trim.AccountStatus='潜在';           
						//Trim.ApproveStatus='新建';   

						Trim.AccountSubType=Ext.getCmp('S_AccountSubType').getValue();//客户子类型         
						Trim.BigCustomer=Ext.getCmp('S_BigCustomer').getValue();//大客户        
						Trim.AccountKANumber=Ext.getCmp('S_AccountKANumber').getValue();//大客户编号   
						Trim.BankName1=Ext.getCmp('S_BankName').getValue();//开户银行名称      
						Trim.BankNumber1=Ext.getCmp('S_BankNumber').getValue();//开户银行帐号 
						//是数组的地址集合
						var DataCsTwo=Ext.data.StoreManager.get('CustornAddressTwoStore');
						if(!DataCsTwo){
							DataCsTwo=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.CustornAddressTwoStore');
						};
						var DataCsTwoNum=DataCsTwo.getCount();
						var Account=[];
						for(var i=0;i<DataCsTwoNum;i++){
							var dz={};
							dz.AddressId=DataCsTwo.getAt(i).get('RowId');
							dz.Country=DataCsTwo.getAt(i).get('Country');
							dz.Province=DataCsTwo.getAt(i).get('Province');
							dz.City=DataCsTwo.getAt(i).get('City');
							dz.County=DataCsTwo.getAt(i).get('County');
							dz.StreetAddress=DataCsTwo.getAt(i).get('StreetAddress');
							dz.PostalCode=DataCsTwo.getAt(i).get('PostalCode');
							dz.IsPrimaryMVG='';
							var StreetAddress=Ext.getCmp('S_EBSCustomerSite').getValue();
							if(StreetAddress==dz.StreetAddress){
								dz.IsPrimaryMVG='Y';
								dz.PostalCode=Ext.getCmp('S_PostalCode').getValue();
							};
							Account[i]=dz;
						};
						Trim.Account=Account;
						//特殊的ID
						//组织ID
						Trim.OrganizationId='';
						//客户Userkey 修改的时候会用到
						Trim.PrimaryOrganizationId='';
						//父客户  有点特殊 要考虑下
						Trim.ParentAccountName=Ext.getCmp('S_ParentAccountName').getValue();
						//父客户ID
						Trim.ParentAccountId=Ext.getCmp('S_ParentAccountId').getValue();
						//重复保存更新的id
						cc.log('Trim.Id:'+KHZL_PrimaryRowId_id);
						Trim.Id=KHZL_PrimaryRowId_id;
						cc.log('Trim.Id2:'+Trim.Id);
						//保存
						obj.connectServer_custom_BC(getResult,Trim);
					   
					   
				   }
			   }
		});
		
		
		//不要的
		/*Trim.Associate1=Ext.getCmp('S_Associate').getValue();
		Trim.Region1=Ext.getCmp('S_Region').getValue();
		Trim.SmallScaleTaxpayer1=Ext.getCmp('S_SmallScaleTaxpayer').getValue();
		Trim.HQEBSCustomerId1=Ext.getCmp('S_HQEBSCustomerId').getValue();
		Trim.HQEBSCustomerSiteId1=Ext.getCmp('S_HQEBSCustomerSiteId').getValue();
		Trim.AccountGroup1=Ext.getCmp('S_AccountGroup').getValue();
		Trim.HeadStatus='有效';
		Trim.AddressStatus='有效';
		Trim.EBSCustomerName1=Ext.getCmp('E_EBSCustomerName').getValue();*/
	},
	
	//申请使用 按钮
	//把EBS的头层数据和Siebel的部分行层数据组合成一个新的数据
	custominfo_new_id_SQSY:function(){
		var obj=this;
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否执行当前操作?',
			   buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
					 //结果
						getResult=function(data){
							Ext.Msg.alert("申请成功");
							obj.showBackView('customSearch_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomSearch');
							picture_list=[];
							KHZL_PrimaryRowId_id='';
							var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
							store.setData([]);
						};
						//获取客户资料
						var Trim={};
						//从头客户自行拷贝来自EBS
						Trim.ApplyType1='申请使用';//默认
						Trim.AccountNumber1=Ext.getCmp('E_AccountNumber').getValue();
						Trim.EBSCustomerName1=Ext.getCmp('E_EBSCustomerName').getValue();
						Trim.CertifiAddress1=Ext.getCmp('E_CertifiAddress').getValue();
						Trim.Extraordinary1=Ext.getCmp('E_Extraordinary').getValue();
						Trim.OrgCodeNumber1=Ext.getCmp('E_OrgCodeNumber').getValue();
						Trim.OrgCodeDate1=Ext.getCmp('E_OrgCodeDate').getValue();
						Trim.AccountClass1=Ext.getCmp('E_AccountClass').getValue();
						Trim.AccountSort1=Ext.getCmp('E_AccountSort').getValue();
						Trim.TaxRegist1=Ext.getCmp('E_TaxRegist').getValue();
						Trim.Associate1=Ext.getCmp('E_Associate').getValue();
						Trim.Region1=Ext.getCmp('E_Region').getValue();
						Trim.SmallScaleTaxpayer1=Ext.getCmp('E_SmallScaleTaxpayer').getValue();
						Trim.HQEBSCustomerId1=Ext.getCmp('E_HQEBSCustomerId').getValue();
						Trim.HQEBSCustomerSiteId1=Ext.getCmp('E_HQEBSCustomerSiteId').getValue();
						Trim.AccountGroup1=Ext.getCmp('E_AccountGroup').getValue();
						Trim.HeadStatus='有效';
						Trim.AddressStatus='有效';
						
						//地址层信息手动填写 来自Siebel
						//是数组的地址集合
						var DataCsTwo=Ext.data.StoreManager.get('CustornAddressTwoStore');
						if(!DataCsTwo){
							DataCsTwo=Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.CustornAddressTwoStore');
						};
						var DataCsTwoNum=DataCsTwo.getCount();
						var Account=[];
						for(var i=0;i<DataCsTwoNum;i++){
							var dz={};
							dz.AddressId=DataCsTwo.getAt(i).get('RowId');
							dz.Country=DataCsTwo.getAt(i).get('Country');
							dz.Province=DataCsTwo.getAt(i).get('Province');
							dz.City=DataCsTwo.getAt(i).get('City');
							dz.County=DataCsTwo.getAt(i).get('County');
							dz.StreetAddress=DataCsTwo.getAt(i).get('StreetAddress');
							dz.PostalCode=DataCsTwo.getAt(i).get('PostalCode');
							Account[i]=dz;
						};
						Trim.Account=Account;
						
						/*Trim.Country=Ext.getCmp('S_Country').getValue();
						Trim.Province=Ext.getCmp('S_Province').getValue();
						Trim.City=Ext.getCmp('S_City').getValue();
						Trim.StreetAddress=Ext.getCmp('S_EBSCustomerSite').getValue();
						Trim.PostalCode=Ext.getCmp('S_PostalCode').getValue();*/

						
						Trim.Contact1=Ext.getCmp('S_Contact').getValue();
						Trim.MainPhoneNumber=Ext.getCmp('S_MainPhoneNumber').getValue();
						Trim.MainFaxNumber=Ext.getCmp('S_MainFaxNumber').getValue();
						
						//必填
						Trim.AccountAttribute=Ext.getCmp('S_AccountAttribute').getValue();
						Trim.AccountProperty=Ext.getCmp('S_AccountProperty').getValue();
						Trim.AccountMPType=Ext.getCmp('S_AccountMPType').getValue();
						Trim.Name=Ext.getCmp('S_Name').getValue();
						Trim.Type=Ext.getCmp('S_Type').getValue();
						cc.log('必填:'+Trim.AccountAttribute+'   2:'+Trim.AccountProperty+'   3:'+Trim.AccountMPType+'   4:'+Trim.Name+'    5:'+Trim.Type);
						
						//接口有问题暂缓  2015-9-11 提交数据检查过没问题
						obj.connectServer_custom_SQSY(getResult,Trim);
					   
					   
				   }
			   }
		});
		
		
	},
	
	//返回按钮
	custominfo_new_id_FH:function(){
		this.showBackView('customlist_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomList');
		KHZL_PrimaryRowId_id='';
		picture_list=[];
		var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
		store.setData([]);
		/*//判断入口
		var RK=Ext.getCmp('custominfo_new_id_ZZZ').getValue();
		if(RK=='新建'){
			this.showBackView('customcreatemain_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomCreateMain');	
		}else if(RK='已有'){
			
		};*/
		
	},
	
	//增加按钮
	custominfo_new_id_LXR_ZZ:function(){
		this.NextView('customcontact_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomContact');
	},
	
	//删除按钮
	custominfo_new_id_LXR_SC:function(){
		/*var this_obj=this;
		var del=document.getElementsByName('groupkung');
		var num=0;//判断是否有选中
		var numWZ=[];//获取选中位置
		for(var i=0;i<del.length;i++){
			var checkbox = del[i];
			if(checkbox.style.color=='rgb(224, 58, 62)'){
				numWZ[num]=i;
				num++;
			};
		};
		//判断复选框是否有选中
		if(num==0){
			alert('请选择删除目标');
			WL.Toast.show("请选择删除目标!");
		}else{
			Ext.Msg.confirm('提示','确定要删除？',function(btn){
				if(btn == 'yes'){
					this_obj.dataDelect_BFF('CsStore','HelcPAD.store.appworkspace.CsStore',numWZ);
					//console.log(JSON.stringify(numWZ));	
				}else{
					return;
				};
			});
		};*/
		
	},
	
	
	//主要联系人 list单击事件
	custominfo_new_id_list_LXR:function(dataview, index, target, record, e, eOpts){
		if(event.target.id!='conkung_custominfo'){
			this.NextView('customcontact_new_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomContact');
		}else{
			var sele=document.getElementsByName('groupkung_custominfo');
			var checkbox = sele[index];
			 if(checkbox.style.color==''){
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(204, 204, 204)'){
	    		  //是未选中的情况下
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(224, 58, 62)'){
	    		//是选中的情况下
	    		  checkbox.style.color='#ccc';
	    	  };
		};
		
	},
	

});

//附件上传
/*function KHZL_SHANGCHUANG_FF(RowId){
	

};*/

//附件查询
function KHZL_CHAXUN_FF(obj,AccntFileExt,AccountId){
	cc.log('进入附件查询');
	getResult=function(data){
		var num=data.length;
		var dataZP=[];
		if(num==undefined){
			var trim={};
			trim.src='data:image/jpeg;base64,'+data.AccntFileBuffer.CDATA;
			trim.fb='Y';
			dataZP[0]=trim;
		};
		if(num>0){
			for(var i=0;i<num;i++){
				var trim={};
				trim.src='data:image/jpeg;base64,'+data[i].AccntFileBuffer.CDATA;
				trim.fb='Y';
				dataZP[i]=trim;
			};
		};
		var store=obj.getStore('PictureStore','HelcPAD.model.OpportunityManagement.Project_New.PictureModel');
		store.setData(dataZP);
		//Ext.Msg.alert("提交成功");
		//WL.Toast.show();
	};
	obj.connectServer_custom_FJ_CX(getResult,AccntFileExt,AccountId);
};