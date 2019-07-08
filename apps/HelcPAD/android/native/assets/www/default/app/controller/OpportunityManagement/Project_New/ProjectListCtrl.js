
/* JavaScript content from app/controller/OpportunityManagement/Project_New/ProjectListCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.ProjectListCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
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
		this.NextView('projectsearchprepare_new_id','HelcPAD.view.OpportunityManagement.Project_New.ProjectSearchPrepare');
	},
	//返回
	projectListBack:function(){
		this.BackView();
		this.status = null;
	},
	//列表单击
	projectList:function( theList, index, target, record, e, eOpts ){
		cc.log('进入商机资料');
		var data = record.getData();
		//商机详细信息公共方法
		this.projectListTwo(data.RowId);
	},
	
	//商机详细信息公共方法
	projectListTwo:function(RowId){
		//用户查询商机的关注人
		object.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectListCtrl').BusinessID=RowId;//(Ctrl:ProjectInfoCtrl,方法:projectinfo_new_id_GZR)和(ConcernedAboutPeopleCtrl,方法:ConcernedAboutPeople_id_TJ)
		
		var obj = this;
		obj.status = 'detail';//定义从列表进入详细页面
		var param = {
				id:RowId,
				userID:userID
		};
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'queryOpportunity',
				parameters: param
		};
		
		var getResult = function(result){
			myLoading.hide();
			console.log(result);
			if(!result.OpptyDetailQuery_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}
			var r = result.OpptyDetailQuery_Output.ListOfHelEaiAppOpportunityDetail.Opportunity;
			//页面跳转
			obj.NextView('projectinfo_new_id','HelcPAD.view.OpportunityManagement.Project_New.ProjectInfo');
			//数据初始化
			obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectInfoCtrl').toInit();
			//获取商机坐标
			MapX = r.XHeight;
			MapY = r.YCoordinate;
			//obj.getApplication().getController('HelcPAD.controller.map.MapCtrl').MapCtrl_JRDT();
			//setTimeout("object.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectListCtrl').loadData(JSON.parse('"+JSON.stringify(r)+"'));",100);
			
			//长按“主管意见”文本框，弹出框显示文本框内容
			var handlerFn = function(backParam){
				Ext.Msg.alert(backParam.field.getLabel(),backParam.field.getValue());
			};
			obj.setLongTimeTap(Ext.getCmp('managerSuggestion'),2,handlerFn,{field:Ext.getCmp('managerSuggestion')});
    		
			//是按钮三个变为两个的是这个方法,新建商机时已经把保存和提交功能合并为提交功能了,现在这只要保存功能就够了。
			obj.loadData(r);
			//记录商机详细信息
			Ext.getCmp('opportunity').setData(r);
			
			//特殊 感觉没什么用
			object.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectListCtrl').ListZT=r.OpptyStatus;//(Ctrl:ProjectInfoCtrl,方法:getSMandZGYJ)
		};
		
		this.connectServer_queryOpportunity(getResult,params);
	},
	
	//被ProjectInfoCtrl的toInit方法调用
	//接收数据处理后显示
	loadData:function(record){
		//把下拉选择的控件如果是只读状态改为可写入状态。
		var opptyForm = Ext.getCmp('projectinfo_new_id');
		var opptyField = opptyForm.query('field');
		for(var i=0;i<opptyField.lnegth;i++){
			try{
				if(opptyField[i].getRequired())
					opptyField[i].setRequired(false);
			}catch(e){
				continue;
			}
		};
		
		
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
		var opptyDescription = Ext.getCmp('opptyDescription');//商机备注
		var supplierOpportunity	 = Ext.getCmp('supplierOpportunity');//代理商商机状态
		
		var agentPerformanceStatus = Ext.getCmp('agentPerformanceStatus');//代理商业绩状态
		var agentPerformanceConDate = Ext.getCmp('agentPerformanceConDate');//代理商业绩确认日期
		var agentPerformanceSubDate = Ext.getCmp('agentPerformanceSubDate');//代理商业绩提交日期
		var agentPerformanceConPerson = Ext.getCmp('agentPerformanceConPerson');//代理商业绩确认人
		var buildingHeight = Ext.getCmp('buildingHeight');//建筑高度
		var buildingLayer = Ext.getCmp('buildingLayer');//建筑层数
		var managerSuggestion = Ext.getCmp('managerSuggestion');//主管意见
		var agentPerformanceStatus = Ext.getCmp('agentPerformanceStatus');//代理商业绩状态
		
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
		this.selectFieldLoad(accountSubType,record.AccountSubType);
		this.selectFieldLoad(opptyInfoChannel,record.OpptyInfoChannel);
		console.log('0--0-0000000000----'+record.OpptyInfoChannel);
		if(record.ListOfOpportunity_Organization)
			this.textFieldLoad(organization, record.ListOfOpportunity_Organization.Opportunity_Organization.Organization);
		
		//跟单组织
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
		var Opportunity_Position = [] ;
		if(record.ListOfOpportunity_Position)
			Opportunity_Position= !record.ListOfOpportunity_Position.Opportunity_Position?'':record.ListOfOpportunity_Position.Opportunity_Position ;
		else
			Opportunity_Position[0].SalesRep = '';
		for(var i=0;i<Opportunity_Position.length;i++){
			if(Opportunity_Position[i].IsPrimaryMVG=='Y'){
				Opportunity_Position = Opportunity_Position[i];
			}
		}
		this.textFieldLoad(salesRep, Opportunity_Position.SalesRep);
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
		created.setValue(new Date(record.Created));
		this.textFieldLoad(opptyCloseDate,record.OpptyCloseDate);
		if(record.AgentPerformanceStatus)
			agentPerformanceStatus.setHidden(false);
		if(record.AgentPerformanceConDate){
			agentPerformanceConDate.setHidden(false);
			agentPerformanceConDate.setValue(new Date(record.AgentPerformanceConDate));
		}
		if(record.AgentPerformanceSubDate){
			agentPerformanceSubDate.setHidden(false);
			agentPerformanceSubDate.setValue(new Date(record.AgentPerformanceSubDate));
		}
		if(record.AgentPerformanceConPerson)
			agentPerformanceConPerson.setHidden(false);
		this.textFieldLoad(buildingHeight,record.BuildingHeight);
		this.textFieldLoad(buildingLayer,record.BuildingLayer);
		this.textFieldLoad(managerSuggestion,record.OpptyDeclineReason);
		this.textFieldLoad(agentPerformanceStatus,record.AgentPerformanceStatus);
		
		//---------------------大项目关注
		if(!opptyMajorProject){
			opptyMajorProject.check();
		}	
		if(!largeCompositeProject){
			largeCompositeProject.check();
		}	
		if(!opptyInternationalHotel){
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
		
		//商机状态为“流失”  大项目关注中的数据不显示
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
		this.textFieldLoad(opptyDescription,record.Description);
		//this.textFieldLoad(supplierOpportunity,record.SupplierOpportunity);
		MapX = record.XHeight;
		MapY = record.YCoordinate;
		console.log('Map:'+MapX+'--'+MapY);
		
		
		var store = Ext.data.StoreManager.get('CxAppLovVStore');
		if(!store)
			store = Ext.create('HelcPAD.store.CxAppLovVStore');
		
		/*var submitOppty = document.getElementById('saveOpptyInfo');//Ext.getCmp('submitOppty');
		submitOppty.style.display='none';*/
		//隐藏与显示详细选项按钮
		if(record.OpptyStatus == '流失'){
			Ext.getCmp('toSalesRep').setHidden(true);
			Ext.getCmp('toHQSalesRep').setHidden(true);
			Ext.getCmp('toInstallSiteCompany').setHidden(true);
			//Ext.getCmp('toOrganization').setHidden(true);
			Ext.getCmp('toOpptyInstallSite').setHidden(true);
			Ext.getCmp('keyContact').setHidden(true);
			//Ext.getCmp('buttonMenu').setHidden(true);
		}/*else	
			Ext.getCmp('buttonMenu').setHidden(false);*/
		//修正ProjectInfoCtrl的toInit方法对商机详情的限制
		Ext.getCmp('salesRep').setReadOnly(true);
		//Ext.getCmp('submitOppty').setHidden(true);
		
		opptyStatus.setReadOnly(true);
		//opptyStatus.setOptions([{text:record.OpptyStatus,value:record.OpptyStatus}]);
		//opptyBusinessPreapproveStatus.setOptions([{text:record.OpptyBusinessPreapproveStatus,value:record.OpptyBusinessPreapproveStatus}]);
		opptyBusinessPreapproveStatus.setReadOnly(true);
		Ext.getCmp('loseAndExamine').setHidden(false);
		Ext.getCmp('header').setTitle('商机资料');
		opptyContractType.setOptions([{text:'两方合同',value:'两方合同'},{text:'营销司三方合同',value:'营销司三方合同'}]);
		
		//信息渠道为代理商，才会显示代理商(经销商) 详情 按钮
		console.log('================2312312');
		console.log(record.OpptyInfoChannel);
		if(record.OpptyInfoChannel!='代理商'){
			Ext.getCmp('opptyAgent').setHidden(true);
			Ext.getCmp('projectinfo_new_id_QTXX_DLS').setHidden(true);
		}
		
		/*if(this.getApplication().getController('HelcPAD.controller.map.MapCtrl').PADMapAddress)
			Ext.getCmp('InstallMapMark').setValue(this.getApplication().getController('HelcPAD.controller.map.MapCtrl').PADMapAddress);*/
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
		
		//改变按钮的地方在这
		//商机状态不同可执行的操作的不同
		var ExamAble = true,readAble = true;
		var backTbn = document.getElementById('opptyDetailBack');
		var examBtn = document.getElementById('saveAndSubmit');
		var saveBtn = document.getElementById('saveOpptyInfo');
		var gzr=document.getElementById('gzr');
		var zdbj=document.getElementById('zdbj');
		
		//特殊 2017-2-6 xcx
		//1.等于'新建'或者'拒绝' 隐藏  保存并提交按钮
		//3.等于'报价'或者'跟进'  隐藏 保存商机按钮
		//2.不等于 '新建'和'拒绝'和'流失'和'完成'和'报价''跟进'   隐藏 保存商机 和 保存并提交 按钮
		
		//再制 2017-9-18 xcx
		//状态“拒绝”      显示“保存”按钮                                             
		//状态“新建”      显示“保存”按钮和“保存并提交”按钮         
		//状态“报价”      显示“保存并提交”按钮 
		//状态“跟进”      显示“保存并提交”和“自动报价”按钮        
		//其它状态只能看
		//主管无法进入我的商机模块，这个判断没有用
		//object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile!='Manager'
		if((record.OpptyStatus=='拒绝')&&object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile!='Manager'){
			//当状态为新建或者拒绝，并且用户不是主管的时候
			//隐藏  保存并提交按钮
			saveBtn.style.width= '46%';
			backTbn.style.width= '46%';
			examBtn.style.display = 'none';
		}else if((record.OpptyStatus=='新建')&&object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile!='Manager'){
			//不变
		}else if((record.OpptyStatus=='报价')&&object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile!='Manager'){
			//隐藏  保存商机
			saveBtn.style.display = 'none';
			backTbn.style.width = '46%';
			examBtn.style.width = '46%';
		}else if(record.OpptyStatus=='跟进'&&object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile!='Manager'){//才能有自动报价按钮
			//隐藏  保存商机
			saveBtn.style.display = 'none';
			gzr.style.display = 'none';
			examBtn.style.width = '29%';
			zdbj.style.width = '29%';
		}else{ 
			saveBtn.style.display = 'none';
			backTbn.style.width = '96%';
			examBtn.style.display = 'none';
		};
		
		return;
		
		/*if((record.OpptyStatus=='新建'||record.OpptyStatus=='拒绝')&&object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile!='Manager'){
			//当状态为新建或者拒绝，并且用户不是主管的时候
			ExamAble = false;
		}else if((record.OpptyStatus!='流失'&&record.OpptyStatus!='完成'&&opportunity.OpptyStatus!='申请流失')&&object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile!='Manager'){
			//当状态不等于流失和完成和申请流失，，并且用户不是主管的时候
			ExamAble = true;
		}
		if((record.OpptyStatus=='报价'||record.OpptyStatus=='跟进')&&object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile!='Manager')
			readAble = false;
		else
			readAble = true;
		
		if(readAble&&!ExamAble){//隐藏 保存商机按钮
			saveBtn.style.display = 'none';
			backTbn.style.width = '46%';
			examBtn.style.width = '46%';
		}else if(!readAble&&ExamAble){//隐藏  保存并提交按钮
			saveBtn.style.width= '46%';
			backTbn.style.width= '46%';
			examBtn.style.display = 'none';
		}else if(!readAble&&!ExamAble){//隐藏 保存商机 和 保存并提交 按钮
			saveBtn.style.display = 'none';
			backTbn.style.width = '46%';
			examBtn.style.display = 'none';
		};*/
		
		
		
	},
	
	selectFieldLoad:function(check,value){
		if(value==''||value==undefined||this.status =='detail'){
			check.setPlaceHolder('');
		}
		//check.setOptions([{text:value,value:value}]);
		if(!check.getOptions()||!check.getOptions().length){
			check.setOptions([{text:value,value:value}]);
		}else{
			check.setValue(value);
		}
		if(value=='代理商'){//特殊
			console.log('-------------------4');
			check.setOptions([{text:value,value:value}]);
		}		
		if(this.record.OpptyStatus=='流失')
			check.setReadOnly(true);
		
		check.setRequired(false);
	},
	textFieldLoad:function(field,value){
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