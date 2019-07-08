Ext.define('HelcAgent.controller.OpportunityManagement.Project_New.ProjectListCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	config:{
		control:{
			'button#projectListBack':{
				tap:'projectListBack'
			},
			'list#projectList':{
				itemtap:'projectList'
			},
			//再商机查询出的列表页面到商机新建的检测页面
			'button#projectlist_new_oppty':{
				tap:'projectlist_new_oppty'
			}
		}
	},
	projectlist_new_oppty:function(){
		this.NextView('projectsearchprepare_new_id','HelcAgent.view.OpportunityManagement.Project_New.ProjectSearchPrepare');
	},
	//返回
	projectListBack:function(){
		this.BackView();
	},
	//列表单击
	projectList:function( theList, index, target, record, e, eOpts ){
		
		var data = record.getData();
		var obj = this;
		var param = {
				id:data.RowId,
				userID:userID
		};
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'queryOpportunity',
				parameters: param
		};
		
		var getResult = function(result){
			console.log(result);
			if(!result.OpptyDetailQuery_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}
			var r = result.OpptyDetailQuery_Output.ListOfHelEaiAppOpportunityDetail.Opportunity;
			obj.NextView('projectinfo_new_id','HelcAgent.view.OpportunityManagement.Project_New.ProjectInfo');
			obj.getApplication().getController('HelcAgent.controller.OpportunityManagement.Project_New.ProjectInfoCtrl').toInit();
			obj.status = 'detail';
			obj.loadData(r);
			Ext.getCmp('opportunity').setData(record.raw);
		};
		
		this.connectServer_queryOpportunity(getResult,params);
		
	},
	//接收数据处理后显示
	loadData:function(record){
		
		
		this.record = record;
		//-----商机资料
		var name = Ext.getCmp('Name');//商机名称
		var account = Ext.getCmp('account');//客户
		var opptyCategory = Ext.getCmp('opptyCategory');//商机类型
		var opptySubCategory = Ext.getCmp('opptySubCategory');//商机子类型
		var opptyAttribute = Ext.getCmp('opptyAttribute');//商机属性
		var businessType = Ext.getCmp('businessType');//合同类型
		var opptyContractType = Ext.getCmp('opptyContractType');//合同属性
		var opptyBuildingPhase = Ext.getCmp('opptyBuildingPhase');//土建进度
		var accountType = Ext.getCmp('accountType');//客户类型
		var accountSubType = Ext.getCmp('accountSubType');//客户子类型
		var opptyInfoChannel = Ext.getCmp('opptyInfoChannel');//信息渠道
		var organization = Ext.getCmp('organization');//跟单组织
		var opptyInstallSite = Ext.getCmp('opptyInstallSite');//安装地点
		//------------------------商机信息
		var opptyFinalUser = Ext.getCmp('opptyFinalUser');//使用单位
		var predictSign = Ext.getCmp('predictSign');//预计签约时间
		var opptyStatus = Ext.getCmp('opptyStatus');//商机状态
		var opptyPhase = Ext.getCmp('opptyPhase');//商机阶段
		var opptyBusinessPreapproveStatus = Ext.getCmp('opptyBusinessPreapproveStatus');//商机预审状态
		var evaluateElevatorQuantity = Ext.getCmp('evaluateElevatorQuantity');//预估直梯台量
		var evaluateEscalatorQuantity = Ext.getCmp('evaluateEscalatorQuantity');//预估扶梯台量
		var salesRep = Ext.getCmp('salesRep');//跟踪人员
		var HQSalesRepFullName = Ext.getCmp('HQSalesRepFullName');//总部跟踪人员
		var primaryRevenueAmount = Ext.getCmp('primaryRevenueAmount');//项目资金（万元）
		var frameProtocolNum = Ext.getCmp('frameProtocolNum');//框架协议编号
		var biding = Ext.getCmp('biding');//是否招标
		//-----------------联系人信息
		var keyContactLastName = Ext.getCmp('keyContactLastName');
		var keyContactFirstName  = Ext.getCmp('keyContactFirstName');
		var keyContactDepartment = Ext.getCmp('keyContactDepartment');
		var keyContactPosition = Ext.getCmp('keyContactPosition');
		var keyContactWorkPhone = Ext.getCmp('keyContactWorkPhone');
		var keyCellularPhone  = Ext.getCmp('keyCellularPhone');
		//-----------------项目地址信息
		var installSiteCompany = Ext.getCmp('installSiteCompany');
		var siteState = Ext.getCmp('siteState');//省/直辖市
		var siteCity = Ext.getCmp('siteCity');//市
		var siteCounty = Ext.getCmp('siteCounty');//区/县
		//----------------------日期信息
		var created = Ext.getCmp('created');//创建日期
		var opptyCloseDate = Ext.getCmp('opptyCloseDate');//关闭日期
		//---------------------大项目关注
		var opptyMajorProject = Ext.getCmp('opptyMajorProject');//其它
		var largeCompositeProject = Ext.getCmp('largeCompositeProject');//大型综合项目
		var opptyInternationalHotel  = Ext.getCmp('opptyInternationalHotel');//五星级酒店
		var topBDC = Ext.getCmp('topBDC');//甲级写字楼
		var symbolicBuilding = Ext.getCmp('symbolicBuilding');//地标性建筑
		var luxuriousResidence	 = Ext.getCmp('luxuriousResidence');//高档住宅
		var opptyImportDemand = Ext.getCmp('opptyImportDemand');//进口大部件需求
		//-------------客户信息
		var accountKANumber = Ext.getCmp('accountKANumber');//大客户编号
		var accountProperty = Ext.getCmp('accountProperty');//客户性质
		var accountAttribute = Ext.getCmp('accountAttribute');//客户属性
		var supplierOpportunity	 = Ext.getCmp('supplierOpportunity');//代理商商机状态
		//数据存储
		Ext.getCmp('opportunity').setData(record);
		//数据填充
		//---------------商机资料
		this.textFieldLoad(name, record.Name);
		this.textFieldLoad(account, record.Account);
		if(record.OpptyStatus == '流失'){
			Ext.getCmp('toAccount').setHidden(true);
			account.setWidth('100%');
			account.setLabelWidth('40%');
		}
		this.selectFieldLoad(opptyCategory,record.OpptyCategory);
		this.selectFieldLoad(opptySubCategory,record.OpptySubCategory);
		this.selectFieldLoad(opptyAttribute,record.OpptyAttribute);
		this.selectFieldLoad(businessType,record.BusinessType);
		this.selectFieldLoad(opptyContractType,record.OpptyContractType);
		this.selectFieldLoad(opptyBuildingPhase,record.OpptyBuildingPhase);
		this.selectFieldLoad(accountType,record.AccountType);
		this.selectFieldLoad(accountSubType,record.accountSubType);
		this.selectFieldLoad(opptyInfoChannel,record.OpptyInfoChannel);
		if(record.ListOfOpportunity_Organization)
			this.textFieldLoad(organization, record.ListOfOpportunity_Organization.Opportunity_Organization.Organization);
		
		organization.setWidth('100%');
		this.textFieldLoad(opptyFinalUser, record.OpptyFinalUser);
		predictSign.setValue(record.PredictSignYear+'-'+record.PredictSignMonth);
		predictSign.setWidth('100%');
		predictSign.setLabelWidth('40%');
		if(record.OpptyStatus=='流失')
			predictSign.setReadOnly(true);
		predictSign.setRequired(false);
		this.textFieldLoad(opptyInstallSite, record.OpptyInstallSite);
		opptyInstallSite.setData(record.OpptyProjectArea);
		if(record.OpptyStatus == '流失'){
			opptyInstallSite.setWidth('100%');
			opptyInstallSite.setLabelWidth('40%');
		}
		//----------------商机信息
		this.selectFieldLoad(opptyStatus, record.OpptyStatus);
		this.selectFieldLoad(opptyPhase, record.OpptyPhase);
		this.selectFieldLoad(opptyBusinessPreapproveStatus, record.OpptyBusinessPreapproveStatus);
		var Opportunity_Position = {} ;
		if(record.ListOfOpportunity_Position)
			Opportunity_Position= record.ListOfOpportunity_Position.Opportunity_Position==null?'':record.ListOfOpportunity_Position.Opportunity_Position ;
		else
			Opportunity_Position.salesRep = '';
		this.textFieldLoad(salesRep, Opportunity_Position.salesRep);
		this.textFieldLoad(HQSalesRepFullName, record.HQSalesRepFullName);
		this.textFieldLoad(evaluateElevatorQuantity,record.EvaluateElevatorQuantity);
		this.textFieldLoad(evaluateEscalatorQuantity,record.EvaluateEscalatorQuantity);
		if(record.OpptyStatus == '流失'){
			salesRep.setWidth('100%');
			HQSalesRepFullName.setWidth('100%');
			salesRep.setLabelWidth('40%');
			HQSalesRepFullName.setLabelWidth('40%');
		}
		
		this.textFieldLoad(primaryRevenueAmount, record.PrimaryRevenueAmount);
		this.textFieldLoad(frameProtocolNum, record.FrameProtocolNum);
		if(record.Biding!='')
			biding.setValue([{text:'否',value:'否'}]);
		else
			biding.setOptions([{text:'是',value:'是'}]);
		biding.setReadOnly(true);
		//-----------------联系人信息
		var keyContact = {};
		if(record.ListOfOpportunity_FINContact){
			keyContact = record.ListOfOpportunity_FINContact.Opportunity_FINContact;
			if(keyContact==undefined||keyContact==''||keyContact==null)
				keyContact = '';
			
		}
		this.textFieldLoad(keyContactLastName, keyContact.KeyContactLastName);
		this.textFieldLoad(keyContactFirstName, keyContact.KeyContactFirstName);
		this.textFieldLoad(keyContactDepartment, keyContact.KeyContactDepartment);
		this.textFieldLoad(keyContactPosition, keyContact.KeyContactPosition);
		this.textFieldLoad(keyContactWorkPhone, keyContact.KeyContactWorkPhone);
		this.textFieldLoad(keyCellularPhone, keyContact.KeyCellularPhone);
		if(record.OpptyStatus == '流失'){
			keyContactLastName.setWidth('100%');
			Ext.getCmp('keyContact').setHidden(true);
		}	
		
		
		//-----------------项目地址信息
		this.textFieldLoad(installSiteCompany,record.InstallSiteCompany);
		if(record.OpptyStatus == '流失'){
			installSiteCompany.setWidth('100%');
			installSiteCompany.setLabelWidth('40%');
		}	
		this.textFieldLoad(siteState,record.SiteState);
		this.textFieldLoad(siteCity,record.SiteCity);
		this.textFieldLoad(siteCounty,record.SiteCounty);
		
		//----------------------日期信息
		created.setOptions({text:Ext.Date.parse(record.Created, "Y-M-d h:i:s"),value:record.Created});
		this.textFieldLoad(opptyCloseDate,record.OpptyCloseDate);
		
		//---------------------大项目关注
		if(!opptyMajorProject){
			opptyMajorProject.check();
		}	
		if(!largeCompositeProject){
			largeCompositeProject.check();
		}	
		if(opptyInternationalHotel){
			opptyInternationalHotel.check();
		}	
		if(!topBDC){
			topBDC.check();
		}	
		if(!symbolicBuilding){
			symbolicBuilding.check();
		}	
		if(!luxuriousResidence){
			luxuriousResidence.check();
		}	
		if(!opptyImportDemand){
			opptyImportDemand.check();
		}	
		
		if(record.OpptyStatus == '流失'){
			opptyMajorProject.disable();
			largeCompositeProject.disable();
			opptyInternationalHotel.disable();
			topBDC.disable();
			symbolicBuilding.disable();
			luxuriousResidence.disable();
			opptyImportDemand.disable();
		}
		//-------------客户信息
		this.textFieldLoad(accountKANumber,record.AccountKANumber);
		this.selectFieldLoad(accountProperty,record.AccountProperty);
		this.selectFieldLoad(accountAttribute,record.AccountAttribute);
		//this.textFieldLoad(supplierOpportunity,record.SupplierOpportunity);
		MapX = record.XHeight;
		MapY = record.YCoordinate;
		console.log('Map:'+MapX+'--'+MapY);
		
		
		var store = Ext.data.StoreManager.get('CxAppLovVStore');
		if(!store)
			store = Ext.create('HelcAgent.store.CxAppLovVStore');
		
		var submitOppty = Ext.getCmp('submitOppty');
		submitOppty.setHidden(true);
		//隐藏与显示详细选项按钮
		if(record.OpptyStatus == '流失'){
			Ext.getCmp('toSalesRep').setHidden(true);
			Ext.getCmp('toHQSalesRep').setHidden(true);
			Ext.getCmp('toInstallSiteCompany').setHidden(true);
			//Ext.getCmp('toOrganization').setHidden(true);
			Ext.getCmp('toOpptyInstallSite').setHidden(true);
			Ext.getCmp('keyContact').setHidden(true);
			Ext.getCmp('buttonMenu').setHidden(true);
		}else	
			Ext.getCmp('buttonMenu').setHidden(false);
		//修正ProjectInfoCtrl的toInit方法对商机详情的限制
		Ext.getCmp('salesRep').setReadOnly(true);
		Ext.getCmp('submitOppty').setHidden(true);
		
		opptyStatus.setReadOnly(true);
		//opptyStatus.setOptions([{text:record.OpptyStatus,value:record.OpptyStatus}]);
		//opptyBusinessPreapproveStatus.setOptions([{text:record.OpptyBusinessPreapproveStatus,value:record.OpptyBusinessPreapproveStatus}]);
		opptyBusinessPreapproveStatus.setReadOnly(true);
		Ext.getCmp('loseAndExamine').setHidden(false);
		Ext.getCmp('header').setTitle('商机资料');
		opptyContractType.setOptions([{text:'两方合同',value:'两方合同'},{text:'营销司三方合同',value:'营销司三方合同'}]);
		//信息渠道为代理商，才会显示代理商详情操作
		if(record.OpptyInfoChannel!='代理商'){
			Ext.getCmp('opptyAgent').setHidden(true);
			Ext.getCmp('projectinfo_new_id_QTXX_DLS').setHidden(true);
		}
		
		//进入后不允许修改的部分
		name.setReadOnly(true);
		opptyCategory.setReadOnly(true);
		opptySubCategory.setReadOnly(true);
		opptyAttribute.setReadOnly(true);
		businessType.setReadOnly(true);
		opptyContractType.setReadOnly(true);
		opptyBuildingPhase.setReadOnly(true);
		accountType.setReadOnly(true);
		accountSubType.setReadOnly(true);
		opptyInfoChannel.setReadOnly(true);
		opptyStatus.setReadOnly(true);
		opptyPhase.setReadOnly(true);
		opptyBusinessPreapproveStatus.setReadOnly(true);
		salesRep.setReadOnly(true);
		frameProtocolNum.setReadOnly(true);
		created.setReadOnly(true);
		businessType.setReadOnly(true);
		
		
	},selectFieldLoad:function(check,value){
		
		if(value==''||value==undefined){
			check.setPlaceHolder('');
		}
		//check.setOptions([{text:value,value:value}]);
		check.setValue(value);
		if(this.record.OpptyStatus=='流失')
			check.setReadOnly(true);
		check.setRequired(false);
	},textFieldLoad:function(field,value){
		if(value!=''&&value!=undefined)
			field.setValue(value);
		else
			field.setPlaceHolder('');
		field.setRequired(false);
		if(this.record.OpptyStatus=='流失')
			field.setReadOnly(true);
		field.setPlaceHolder('');
	}
});