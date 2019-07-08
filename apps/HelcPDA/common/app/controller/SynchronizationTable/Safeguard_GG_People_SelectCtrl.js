Ext.define('HelcPDA.controller.SynchronizationTable.Safeguard_GG_People_SelectCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		
		control:{
			"button#Safeguard_GG_People_Select_id_CX":{
				tap:'Safeguard_GG_People_Select_id_CX'
			},
			
			"button#Safeguard_GG_People_Select_id_QD":{
				tap:'Safeguard_GG_People_Select_id_QD'
			},
			
			"textfield#CompanyName":{
				tap:'CompanyName'
			},
			
			'textfield#StationName':{
				tap:'StationName'
			 },
			 
			'textfield#AreaName':{
				tap:'AreaName'
			 },
			 
			 'textfield#GroupName':{
				 tap:'GroupName'
			 },
			 
			 "list#Safeguard_GG_People_Select_id_list":{
				 itemtap:'Safeguard_GG_People_Select_id_list'
			 },
			 
		}
	},
	
	//确定
	Safeguard_GG_People_Select_id_QD:function(){
		
		if(!PeopleFullName){
			this.getWXTS('请选择！');
			return;
		};
		
		var name=Ext.getCmp('GG_People_Name').getValue();
		var ID=Ext.getCmp('GG_People_Name_ID').getValue();
		this.BackView();
		//名字
		Ext.getCmp(name).setValue(PeopleFullName);
		console.log(ID);
		//ID
		Ext.getCmp(ID).setValue(PeopleFullName_ID);
		//清除痕迹
		var sotre=this.getStore('Safeguard_GG_People_Select_Store','HelcPDA.store.SynchronizationTable.Safeguard_GG_People_Select_Store');
		sotre.removeAll();
		PeopleFullName='';
	},
	
	//结果页签list
	Safeguard_GG_People_Select_id_list:function(obj,index,target,record,e,eOpts){
		//选择的人
		PeopleFullName=record.data.FullName;
		PeopleFullName_ID=record.data.Id;
		//选择
		var sele=document.getElementsByName('GG_PeopleName');
		var num=sele.length;
		for(var i=0;i<num;i++){
			var checkbox = sele[i];
			if(i==index){
				if(checkbox.style.color==''){
					checkbox.style.color='#e03a3e';
				}else if(checkbox.style.color=='rgb(204, 204, 204)'){
					//是未选中的情况下
					checkbox.style.color='#e03a3e';
				}else if(checkbox.style.color=='rgb(224, 58, 62)'){
					//是选中的情况下
					checkbox.style.color='#ccc';
				}
			}else{
				checkbox.style.color = '#ccc';
			}
		};
		
	},
	
	//所属组
	GroupName:function(){
		var obj=this;
		//所属片
		var CompanyName=Ext.getCmp('AreaName').getValue();
		console.log(CompanyName);
		if(!CompanyName){
			obj.getWXTS('请先选择所属片');
			return;
		}
		//条件来源
		objectXcx.getController('SynchronizationTable.Safeguard_GG_People_SelectCtrl').FlagPeople='所属组';
		//jsonStore查询和增加条件
		//所属司
		var CompanyName=Ext.getCmp('CompanyName').getValue();
		//所属司ID
		var sss=Ext.getCmp('CompanyName_ID').getValue();
		//所属站
		var StationName=Ext.getCmp('StationName').getValue();
		//所属站ID
		var ssz=Ext.getCmp('StationName_ID').getValue();
		//所属片
		var AreaName=Ext.getCmp('AreaName').getValue();
		//所属片ID
		var ssp=Ext.getCmp('AreaName_ID').getValue();
		var query={tcode:'Safeguard',tid:sss,ext1:CompanyName,ext2:ssz,ext3:StationName,ext4:ssp,ext5:AreaName};
		//查询数据的方法
		var FangFa=function(obj,query){
			objectXcx.getController('SynchronizationTable.Safeguard_GG_People_SelectCtrl').getGroupName(obj,query);
		};
		//添加数据的方法
		var FangFaTwo=function(result){
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSafeguardFivelegacyContent_QTBLXM_List(result);
		};
		//用于判断在getSafeguardFivelegacyContent_QTBLXM_List 方法中的逻辑
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Flag='B';
		//调用jsonStore查询方法 (传递当前方法所在对象obj,jsonStore查询条件)
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSelectfield(obj,query,FangFa,FangFaTwo);
	},
	
	//所属组调用接口的方法
	getGroupName:function(obj,query){
		
		var tj="[HEL Group.Company Id] = '"+query.tid+"'  AND [HEL Group.Area Id] = '"+query.ext4+"' AND [HEL Group.Status Flag] &lt;> '非活动'" ;
		//传递值
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getHELGroupQuery';
		param.parameters=tj;
	
		var getResult = function(result){
			myLoading.hide();
			console.log(result);
			
			var num=result.Envelope.Body.HELGroupQueryResponse.NumOutputObjects;
			if(num==0){
				obj.getWXTS('查无数据！');
				return;
			}
			
			var Data=result.Envelope.Body.HELGroupQueryResponse.SiebelMessage.ListOfHelPdaMaintainingHelGroupListIo.HelGroup;
			//填值
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSafeguardFivelegacyContent_QTBLXM_List(Data);
			//添加
			query.stext=Data;
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSelectfield_Add(query);
		};
		this.getSafeguard(getResult,param);
	},
	
	
	//所属片
	AreaName:function(){
		var obj=this;
		//所属站
		var CompanyName=Ext.getCmp('StationName').getValue();
		console.log(CompanyName);
		if(!CompanyName){
			obj.getWXTS('请先选择所属站');
			return;
		}
		//条件来源
		objectXcx.getController('SynchronizationTable.Safeguard_GG_People_SelectCtrl').FlagPeople='所属片';
		//jsonStore查询和增加条件
		//所属司
		var CompanyName=Ext.getCmp('CompanyName').getValue();
		//所属司ID
		var sss=Ext.getCmp('CompanyName_ID').getValue();
		//所属站
		var StationName=Ext.getCmp('StationName').getValue();
		//所属站ID
		var ssz=Ext.getCmp('StationName_ID').getValue();
		var query={tcode:'Safeguard',tid:sss,ext1:CompanyName,ext2:ssz,ext3:StationName};
		//查询数据的方法
		var FangFa=function(obj,query){
			objectXcx.getController('SynchronizationTable.Safeguard_GG_People_SelectCtrl').getAreaName(obj,query);
		};
		//添加数据的方法
		var FangFaTwo=function(result){
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSafeguardFivelegacyContent_QTBLXM_List(result);
		};
		//用于判断在getSafeguardFivelegacyContent_QTBLXM_List 方法中的逻辑
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Flag='B';
		//调用jsonStore查询方法 (传递当前方法所在对象obj,jsonStore查询条件)
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSelectfield(obj,query,FangFa,FangFaTwo);
	},
	
	//所属片调用接口的方法
	getAreaName:function(obj,query){
		
		var tj="[HEL Area.Company Id] = '"+query.tid+"' AND [HEL Area.Organization Id] = '"+query.ext2+"' AND  [HEL Area.Status Flag] &lt;> '非活动'  ";
		//传递值
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getHELAreaQuery';
		param.parameters=tj;
	
		var getResult = function(result){
			myLoading.hide();
			console.log(result);
			
			var num=result.Envelope.Body.HELAreaQueryResponse.NumOutputObjects;
			if(num==0){
				obj.getWXTS('查无数据！');
				return;
			}
			var Data=result.Envelope.Body.HELAreaQueryResponse.SiebelMessage.ListOfHelPdaMaintainingHelAreaListIo.HelArea;
			//填值
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSafeguardFivelegacyContent_QTBLXM_List(Data);
			//添加
			query.stext=Data;
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSelectfield_Add(query);
		};
		this.getSafeguard(getResult,param);
	},
	
	/**
	 * ---------所属司和所属站 Start
	 */
	//所属司查询 
	CompanyName:function(){
		var obj=this;
		//条件来源
		objectXcx.getController('SynchronizationTable.Safeguard_GG_People_SelectCtrl').FlagPeople='所属司';
		//jsonStore查询和增加条件
		var query={tcode:'Safeguard',tid:company_code};
		//查询数据的方法
		var FangFa=function(obj,query){
			objectXcx.getController('SynchronizationTable.Safeguard_GG_People_SelectCtrl').getSelectCompanyName(obj,query);
		};
		//添加数据的方法
		var FangFaTwo=function(result){
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSafeguardFivelegacyContent_QTBLXM_List(result);
		};
		//用于判断在getSafeguardFivelegacyContent_QTBLXM_List 方法中的逻辑
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Flag='B';
		//调用jsonStore查询方法 (传递当前方法所在对象obj,jsonStore查询条件)
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSelectfield(obj,query,FangFa,FangFaTwo);
	},
	
	//所属站查询
	StationName:function(){
		var obj=this;
		//所属司
		var CompanyName=Ext.getCmp('CompanyName').getValue();
		console.log(CompanyName);
		if(!CompanyName){
			obj.getWXTS('请先选择所属司');
			return;
		}
		
		//条件来源
		objectXcx.getController('SynchronizationTable.Safeguard_GG_People_SelectCtrl').FlagPeople='所属站';
		//jsonStore查询和增加条件
		var query={tcode:'Safeguard',tid:company_code,ext1:CompanyName};
		//查询数据的方法
		var FangFa=function(obj,query){
			objectXcx.getController('SynchronizationTable.Safeguard_GG_People_SelectCtrl').getSelectCompanyName(obj,query);
		};
		//添加数据的方法
		var FangFaTwo=function(result){
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSafeguardFivelegacyContent_QTBLXM_List(result);
		};
		//用于判断在getSafeguardFivelegacyContent_QTBLXM_List 方法中的逻辑
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').Flag='B';
		//调用jsonStore查询方法 (传递当前方法所在对象obj,jsonStore查询条件)
		objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSelectfield(obj,query,FangFa,FangFaTwo);
	},
	
	
	//查询所属司或查询所属站
	getSelectCompanyName:function(obj,query){
		var tj='';
		var Flag=objectXcx.getController('SynchronizationTable.Safeguard_GG_People_SelectCtrl').FlagPeople;
		if(Flag=='所属司'){
			tj='[Organization.Id] = "'+company_code+'" AND ([Organization.Type] = "一级分公司" OR [Organization.Type]="二级分公司" OR [Organization.Type]="销售公司" OR [Organization.Type]="工程公司" OR [Organization.Type]="销售工程公司")';
			//tj='[Organization.Type] = "一级分公司" OR [Organization.Type]="二级分公司" OR [Organization.Type]="销售公司" OR [Organization.Type]="工程公司" OR [Organization.Type]="销售工程公司"';
		};
		if(Flag=='所属站'){
			tj='[Organization.Parent Organization Id] = "'+company_code+'" AND [Organization.Type] = "维保站"';  
		}
		//传递值
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getHELCompanyStationQuery';
		param.parameters=tj;
	
		var getResult = function(result){
			myLoading.hide();
			console.log(result);
			
			var num=result.Envelope.Body.HELCompanyStationQueryResponse.NumOutputObjects;
			if(num==0){
				obj.getWXTS('查无数据！');
				return;
			}
			var Data=result.Envelope.Body.HELCompanyStationQueryResponse.SiebelMessage.ListOfHelEaiAppOpportunityInstallCompany.Organization;
			//填值
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSafeguardFivelegacyContent_QTBLXM_List(Data);
			//添加
			query.stext=Data;
			objectXcx.getController('SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl').getSelectfield_Add(query);
			/*if(Flag=='所属司'){
			}
			if(Flag=='所属站'){
			}*/
		};
		this.getSafeguard(getResult,param);
	},
	
	/**
	 * ---------所属司和所属站 Start
	 */
	
	
	//查询
	Safeguard_GG_People_Select_id_CX:function(){
		var obj=this;
		//控件
		var SafeguardArray=["Id",
		                    "FullName",
		                    "FM",
		                    "MaintainingPosition",
		                    "MaitainingPersonType",
		                    "JobTitle",
		                    "CompanyName",
		                    "StationName",
		                    "PrimaryOrganizationName",
		                    "AreaName",
		                    "GroupName",
		                    "WorkPhone"];
		var SafeguardMsg=this.getElement(SafeguardArray);

		//验证
		var numMsg=0;
    	for(var i=0;i<SafeguardMsg.length;i++){
    		if(SafeguardMsg[i]== null || SafeguardMsg[i] == ''){
    			numMsg++;
    		}
    	};
    	if(numMsg==SafeguardMsg.length){
    		Ext.Msg.alert('温馨提示','请至少输入一个条件');
    		return;
    	};
    	
    	
		//SQL
		var tj='';
		if(SafeguardMsg[0]){//ID
			tj=getTJ(tj);
			tj+="[Person.Id] = '"+SafeguardMsg[0]+"'";
		}
		if(SafeguardMsg[1]){//姓名
			tj=getTJ(tj);
			tj+="[Person.Full Name] like'*"+SafeguardMsg[1]+"*'";
		}
		if(SafeguardMsg[2]){//性别
			tj=getTJ(tj);
			tj+="[Person.M/F] = '"+SafeguardMsg[2]+"'";
		}
		if(SafeguardMsg[3]){//职位  
			tj=getTJ(tj);
			tj+="[Person.Maintaining Position] = '"+SafeguardMsg[3]+"'";
		}
		if(SafeguardMsg[4]){//人员类型
			tj=getTJ(tj);
			tj+="[Person.Maitaining Person Type]  like '*"+SafeguardMsg[4]+"*'";
		}
		if(SafeguardMsg[5]){//职称
			tj=getTJ(tj);
			tj+="[Person.Job Title] like '*"+SafeguardMsg[5]+"*'";
		}
		if(SafeguardMsg[6]){//所属司
			tj=getTJ(tj);
			tj+="[Person.Company Name] ='"+SafeguardMsg[6]+"'";
			var id=Ext.getCmp('CompanyName_ID').getValue();
			if(id){
				tj+=" and [Person.Company Id] ='"+id+"'";
			}
		}
		if(SafeguardMsg[7]){//所属站
			tj=getTJ(tj);
			tj+="[Person.Station Name] ='*"+SafeguardMsg[7]+"*'";
			var id=Ext.getCmp('StationName_ID').getValue();
			if(id){
				tj+=" and [Person.Station Id] ='"+id+"'";
			}
		}
		if(SafeguardMsg[8]){//所属组织
			tj=getTJ(tj);
			tj+="[Person.Primary Organization Name] =  like '*"+SafeguardMsg[8]+"*'";
		}
		if(SafeguardMsg[9]){//所属片
			tj=getTJ(tj);
			tj+="[Person.Area Name] = '"+SafeguardMsg[9]+"'";
			var id=Ext.getCmp('AreaName_ID').getValue();
			if(id){
				tj+=" and [[Person.Area Id]] ='"+id+"'";
			}
		}
		if(SafeguardMsg[10]){//所属组
			tj=getTJ(tj);
			tj+="[Person.Group Name] = '"+SafeguardMsg[10]+"'";
			var id=Ext.getCmp('GroupName_ID').getValue();
			if(id){
				tj+=" and [Person.Group Id] ='"+id+"'";
			}
		}
		if(SafeguardMsg[11]){//电话号码
			tj=getTJ(tj);
			tj+="[Person.Work Phone #] =  like '*"+SafeguardMsg[11]+"*'";
		}
		
		function getTJ(zhi){
			if(zhi!=''){
				tj+=" AND ";
			}
			return tj;
		}
		
		console.log('-----------------------查询条件');
		console.log(tj);
		//return;
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getMPlanPersonQuery';
		param.parameters=tj;
		var getResult = function(result){
			myLoading.hide();
			console.log(result);
			
			//条件太少，返回的提示
			try{
				var promt=result.Envelope.Body.MPlanPersonQuery_Output.ErrMsg;
				var dp='存在的行比可返回的多';
				if(Msg.indexOf(dp)>0){
					Ext.Msg.alert('温馨提示','获取的数据过多，请增加查询条件！');
				}
				return;
			}catch(e){
				console.log('try一个');
			};
			var num=result.Envelope.Body.MPlanPersonQuery_Output.NumOutputObjects;
			var Data=result.Envelope.Body.MPlanPersonQuery_Output.ListOfHelPdaMaintainingPlanPersonPicklistIo.Person;
			if(num==0){
				Ext.Msg.alert('温馨提示','查无数据！');
				return;
			}
			console.log('Data-------------');
			console.log(Data);
			
			var sotre=obj.getStore('Safeguard_GG_People_Select_Store','HelcPDA.store.SynchronizationTable.Safeguard_GG_People_Select_Store');
			sotre.setData(Data);
			PeopleFullName='';
			//显示按钮
			Ext.getCmp('Safeguard_GG_People_Select_id_QD').setHidden(false);
			//页签跳转
			var tab=Ext.getCmp('Safeguard_GG_People_Select_id_Tabpanel');
			var Inn=tab.getInnerItems();
			tab.setActiveItem(Inn[1]);
		};
		obj.getSafeguard(getResult,param);
	},

	
	//初始化获得所属司
	/*initializationSelect:function(){
		SSSdata='';//所属司
		//定时
		this.getTiming();
		//所属司查询
		this.getSelectCompanyName('所属司');
	},*/
	
	//定时
	/*getTiming:function(){
		var time=window.setInterval(timeFF,1000*2);
		function timeFF(){
			if(SSSdata!=''){
				myLoading.hide();
				myLoading.hide();
				console.log('终结定时');
				clearInterval(time);
			}
		};
	},*/
});