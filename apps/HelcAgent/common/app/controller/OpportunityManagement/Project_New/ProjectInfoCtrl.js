Ext.define('HelcAgent.controller.OpportunityManagement.Project_New.ProjectInfoCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	config:{
		control:{
			 //提交流失商机
			 'button#opportunityLose':{
				 tap:'opptyLose'
			 },
			 //提交商机审核
			 'button#opportunityExamine':{
				 tap:'opptyExamine'
			 },
			 //新建商机
			 'button#submitOppty':{
				 tap:'submitOppty'
			 },
			 //保存商机
			 'button#saveOppty':{
				 tap:'submitOppty' 
			 },
			 //商机资料3  返回 
			 'button#projectinfo_new_id_FH':{
			 	tap:'projectinfo_new_id_FH',
			 },
			 //客户选择
			 'button#toAccount':{
				tap:'toAccount' 
			 },
			 //跟踪人员
			 'button#toSalesRep':{
				 tap:'toSalesRep'
			 },
			 //总部跟踪人员
			 'button#toHQSalesRep':{
				 tap:'toHQSalesRep'
			 },
			 //安装地点
			 'button#toOpptyInstallSite':{
				 tap:'toOpptyInstallSite'
			 },
			 //安装所在分公司
			 'button#toInstallSiteCompany':{
				 tap:'toInstallSiteCompany'
			 },
			 //联系人
			 'button#keyContact':{
				tap:'keyContact' 
			 },
			 //代理商
			 'button#projectinfo_new_id_QTXX_DLS':{
				tap:'projectinfo_new_id_QTXX_DLS' 
			 },
			 
			 //客户需求分析
			 'button#projectinfo_new_id_QTXX_KHXQFX':{
				tap:'projectinfo_new_id_QTXX_KHXQFX' 
			 },
			 
			 //竞争对手分析
			 'button#projectinfo_new_id_QTXX_JZDSFX':{
				 tap:'projectinfo_new_id_QTXX_JZDSFX'
			 },
			 
			 //商机流失原因分析
			 'button#projectinfo_new_id_QTXX_SJLSYYFX':{
				tap:'projectinfo_new_id_QTXX_SJLSYYFX' 
			 },
			 
			 //附件
			 'button#projectinfo_new_id_QTXX_FJ':{
				tap:'projectinfo_new_id_QTXX_FJ'
			 },
			 
			 //安装地点地图标示
			 'button#projectinfo_new_id_KHXX_AZDDDTBS':{
				tap:'projectinfo_new_id_KHXX_AZDDDTBS' 
			 },
			 //商机类型变化使商机子类型变化
			 'selectfield#opptyCategory':{
				 change:'leadOpptySubCategoryC'
			 },
			 //客户类型变化使客户子类型变化
			 'selectfield#accountType':{
				 change:'leadAccountSubTypeC'
			 }
			
		},
	},
	//客户类型变化使客户子类型变化
	leadAccountSubTypeC:function( selectField, newValue, oldValue, eOpts){
		var accountSubType = this.extractionData('HEL_ACCOUNT_SUBTYPE');
		var r = [];
		var total = 1;
		r[0] = {text:'请选择',value:''};
		for(var i=0;i<accountSubType.length;i++){
			if(accountSubType[i].PAR_LIS_VAL==newValue){
				r[total] = {text:accountSubType[i].LIS_VAL,value:accountSubType[i].LIS_VAL};
				total++;
			}
		}
		
		Ext.getCmp('accountSubType').setOptions(r);
	},
	//商机类型变化影响商机子类型变化
	leadOpptySubCategoryC:function( selectField, newValue, oldValue, eOpts ){
		var opptySubCategory = this.extractionData('HEL_OPPTY_SUB_CATEGORY');
		var r= [];
		var total = 1;
		r[0] = {text:'请选择',value:''};
		for(var i=0;i<opptySubCategory.length;i++){
			if(opptySubCategory[i].PAR_LIS_VAL==newValue){
				r[total] = {text:opptySubCategory[i].LIS_VAL,value:opptySubCategory[i].LIS_VAL};
				total++;
			}
		}
		Ext.getCmp('opptySubCategory').setOptions(r);
		
	},
	//商机流失
	opptyLose:function(){
		var obj = this;
		var getResult = '';
		var opportunity = Ext.getCmp('opportunity').getData();
		var recordId = opportunity.RowId;
		var param = {
				recordId:recordId,
				userID:userID
		};
		
		var data = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'opptyLose',
				parameters:param
		};
		
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否提交商机流失？',
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
		    	 if(opportunity.OpptyStatus!='流失'){
		 			getResult = function(result){
		 				
		 				if(result.OpportunityLose_Output){
		 					Ext.Msg.alert('提交流失成功！');
		 					Ext.Viewport.hideMenu('right');
		 					obj.BackView();
		 					obj.BackView();
		 					obj.getApplication().getController('HelcAgent.controller.OpportunityManagement.Project_New.ProjectSearchCtrl').projectsearch_new_id_CX();
		 					return ;
		 				}
		 					
		 				if(!result.ErrorMsg){
		 					Ext.Msg.alert('错误信息',result.ErrorMsg);
		 					return ;
		 				}
		 			};
		 			obj.connectServer_queryOpportunity(getResult,data);
		 		}
				   }
			   }
			});
		
	},
	//商机审核
	opptyExamine:function(){
		var opportunity = Ext.getCmp('opportunity').getData();
		var recordId = opportunity.RowId;
		var param = {
				recordId:recordId,
				userID:userID
		};
		
		var data = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'opptyExamine',
				parameters:param
		};
		
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否提交审核？',
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
		    	 var getResult = function(result){
		 			
		 			if(result.OpptyDemAnalyQuery_Output){
		 				Ext.Msg.alert('提审核失成功！');
		 				Ext.Viewport.hideMenu('right');
		 				obj.BackView();
		 				obj.BackView();
		 				obj.getApplication().getController('HelcAgent.controller.OpportunityManagement.Project_New.ProjectSearchCtrl').projectsearch_new_id_CX();
		 				return ;
		 			}
		 				
		 			if(!result.ErrorMsg){
		 				Ext.Msg.alert('错误信息',result.ErrorMsg);
		 				return ;
		 			}
		 			
		 		};
		 		obj.connectServer_queryOpportunity(getResult,data);
		    	 
				   }
			   }
			});
		
	},
	//新建商机
	submitOppty:function(){
		var obj = this;
		var oppty = this.formValue();
		var simpleOppty = this.simpleGetFormValue();
		/*console.log(oppty);
		console.log(simpleOppty);
		if(oppty==simpleOppty){
			Ext.Msg.alert('提示','deference');
			return ;
		}else{
			Ext.Msg.alert('提示','alike');
			return ;
		}*/	
		console.log(simpleOppty);
		oppty = simpleOppty;
		if(!oppty)
			return ;
		
		oppty.userID = userID;
		var opportunity = Ext.getCmp('opportunity').getData();
			
		var msg = '是否新建商机？';
		var rMsg = '商机新建完成！';
		
		if(opportunity){
			msg = '是否保存商机？';
			rMsg = '商机保存完成！';
			oppty.id = opportunity.RowId;
			oppty.opptyProjectArea = Ext.getCmp('opptyInstallSite').getData();
			 
		
		oppty.XHeight = MapX==undefined?'':MapX;
		oppty.YCoordinate = MapY==undefined?'':MapY;
		}
		var predictSign = Ext.getCmp('predictSign').getValue();
		var opptyMajorProject = Ext.getCmp('opptyMajorProject');//其它
		var largeCompositeProject = Ext.getCmp('largeCompositeProject');//大型综合项目
		var opptyInternationalHotel  = Ext.getCmp('opptyInternationalHotel');//五星级酒店
		var topBDC = Ext.getCmp('topBDC');//甲级写字楼
		var symbolicBuilding = Ext.getCmp('symbolicBuilding');//地标性建筑
		var luxuriousResidence	 = Ext.getCmp('luxuriousResidence');//高档住宅
		var opptyImportDemand = Ext.getCmp('opptyImportDemand');//进口大部件需求
		oppty.XHeight = MapX==undefined?'':MapX;
		oppty.YCoordinate = MapY==undefined?'':MapY;
		
		
		var date =predictSign.split('-'); 
		var year = date[0];
		var month = date[1];
		
		//复选框
		oppty.opptyMajorProject = this.checkboxValue(opptyMajorProject);
		oppty.largeCompositeProject = this.checkboxValue(largeCompositeProject);
		oppty.opptyInternationalHotel = this.checkboxValue(opptyInternationalHotel);
		oppty.topBDC = this.checkboxValue(topBDC);
		oppty.symbolicBuilding = this.checkboxValue(symbolicBuilding);
		oppty.luxuriousResidence = this.checkboxValue(luxuriousResidence);
		oppty.opptyImportDemand = this.checkboxValue(opptyImportDemand);
		oppty.supplierOpportunity = '';
		
		oppty.year = year;
		oppty.month = month;
		oppty.opptySource = '设备商机';
		oppty.opptyType = '设备商机';
		
		Ext.Msg.show({
			   title: '温馨提示',
			   message: msg,
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){

		 		var params = {
		 				adpName:'HttpAdapter_PAD_Custom',
		 				prodName:'buildNewOppty',
		 				parameters: oppty
		 		};
		 		var getResult = function(result){
		 		
		 			if(result.OpptyDetailSynchronize_Output){
		 				if(result.OpptyDetailSynchronize_Output.PrimaryRowId){
		 					Ext.Msg.alert('提示',rMsg);
		 					obj.NextView('pdamain','HelcAgent.view.login.PADMain');
		 					ViewArray = [];
		 					Ext.Viewport.hideMenu('right');
		 				}
		 					
		 			}
		 		};
		 		
		 		obj.connectServer_queryOpportunity(getResult,params);
				   }
			   }
			});
		
	},
	
	//客户选择
	toAccount:function(){
		this.NextView('customerSelect','HelcAgent.view.OpportunityManagement.Project_New.CustomerSelectView');
		Ext.getCmp('comeSource').setValue('HelcAgent.controller.OpportunityManagement.Project_New.ProjectInfoCtrl');
	},
	//跟踪人员
	toSalesRep:function(){
		this.NextView('HQSalesRepPanel','HelcAgent.view.OpportunityManagement.Project_New.HQSalesRepView');
		Ext.getCmp('salesRepToolbar').setTitle('跟踪人员');
	},
	//总部跟单人员
	toHQSalesRep:function(){
		this.NextView('HQSalesRepPanel','HelcAgent.view.OpportunityManagement.Project_New.HQSalesRepView');
		this.getApplication().getController('HelcAgent.controller.OpportunityManagement.Project_New.HQSalesRepCtrl').toSalesRepInit();
		
	},
	//安装地点
	toOpptyInstallSite:function(){
		this.NextView('installSitePanel','HelcAgent.view.OpportunityManagement.Project_New.InstallSiteView');
		Ext.getCmp('installSiteComeSource').setValue('HelcAgent.controller.OpportunityManagement.Project_New.ProjectInfoCtrl');
		this.getApplication().getController('HelcAgent.controller.OpportunityManagement.Project_New.InstallSiteCtrl').toInit('installSite');
	},
	//安装所在分公司
	toInstallSiteCompany:function(){
		
		this.NextView('installSiteCompanySelect','HelcAgent.view.OpportunityManagement.Project_New.InstallSiteCompanyView');
		this.getApplication().getController('HelcAgent.controller.OpportunityManagement.Project_New.InstallSiteCompanyCtrl').toInit();
	},
	//安装地点地图标示
	projectinfo_new_id_KHXX_AZDDDTBS:function(){
		var opportunity = Ext.getCmp('opportunity').getData();
		
		this.NextView('map_id','HelcAgent.view.map.Map');
		if(opportunity){
			MapCtrl_JRDT(1);
		}else{
			MapCtrl_JRDT(2);
		};
	},
	
	//附件
	projectinfo_new_id_QTXX_FJ:function(){
		var opportunity = Ext.getCmp('opportunity').getData();
		this.NextView('businessattachment_new_id','HelcAgent.view.OpportunityManagement.Project_New.BusinessAttachment');
		Ext.getCmp('businessattchmentOpportunity').setData(opportunity);
		
		this.getApplication().getController('HelcAgent.controller.OpportunityManagement.Project_New.BusinessAttachmentCtrl').toInit();
		
	},
	
	//商机流失原因分析*******
	projectinfo_new_id_QTXX_SJLSYYFX:function(){
		
		var getResult = '';
		var obj = this;
		var opportunity = Ext.getCmp('opportunity').getData();
		
		var params = {};
		if(opportunity.OpptyStatus){
			var param = {
					opptyId:opportunity.RowId,
					userID:userID
			};
			params = {
					adpName:'HttpAdapter_PAD_Custom',
					prodName:'queryLoseReason',
					parameters:param 
			};
			
			getResult = function(result){
				
				if(!result.OpptyLosReaQuery_Output){
					Ext.Msg.alert('提示信息','服务器繁忙，请稍后重试！');
					return ;
				}
				var loseReason = result.OpptyLosReaQuery_Output.ListOfHelEaiAppOpportunityLoseReason.ListOfHelOpportunityLoseReason.HelOpportunityLoseReason;
				
				obj.NextView('opportunityoutflowreasonanalysislist_new_id','HelcPAD.view.OpportunityManagement.Project_New.OpportunityOutflowReasonAnalysisList');
				if(opportunity.OpptyStatus=='流失')
					Ext.getCmp('buildAndDelete').setHidden(true);
				else
					Ext.getCmp('buildAndDelete').setHidden(false);
				Ext.getCmp('loseOpportunity').setData(opportunity);
				var store = Ext.data.StoreManager.get('OpportunityOutflowReasonStore');
				if(!store){
					store = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.OpportunityOutflowReasonStore');
				}
				if(result.OpptyLosReaQuery_Output.NumOutputObjects=='0'){
					Ext.Msg.alert('提示信息','该商机无流失原因，请仔细查看后选择');
					return ;
				}else if(result.OpptyLosReaQuery_Output.NumOutputObjects=='1'){
					store.setData([loseReason]);
				}else{
					store.setData(loseReason);
				}
				var list = Ext.getCmp('opportunityoutflowreasonanalysislist_new_id_list');
				
				var tpl = '<table border=0 width=100% style="color:#666" class="textf">'+
				'  <tr>'+
				'     <td width=10% rowspan="3">'+
				'        <div name="groupkung_opportunityoutflowreasonanalysislist" class="p_judge_box2" id="conkung_opportunityoutflowreasonanalysislist">3</div>'+
				'     </td>'+
				'     <td width=80%>{OpptyType}	{OpptyLoseReasonType }	{OpptyLoseReason }	</td>'+
				'     <td width=10%></td>'+
				'  </tr>'+
				'</table>';
				
				list.setTpl(tpl);
				
				Ext.getCmp('loseOpportunity').setData(opportunity);
				
			};
			this.connectServer_queryOpportunity(getResult,params);
		}
			
	},
	
	//竞争对手分析
	projectinfo_new_id_QTXX_JZDSFX:function(){
		var opportunity = Ext.getCmp('opportunity').getData();
		this.NextView('competitoranalysislist_new_id','HelcAgent.view.OpportunityManagement.Project_New.CompetitorAnalysisList');
		
		if(opportunity.OpptyStatus!='大项目部退回'&&opportunity.OpptyStatus!='申请流失'&&opportunity.OpptyStatus!='提交大项目部'&&opportunity.OpptyStatus!='完成'&&opportunity.OpptyStatus!='流失'&&opportunity.OpptyStatus!='已提交')
			Ext.getCmp('competitorSegment').setHidden(false);
		else
			Ext.getCmp('competitorSegment').setHidden(true);
		var param = {
				parRowId:opportunity.RowId,
				userID:userID
		};
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'queryCompetitor',
				parameters:param 
		};
		
		var getResult = function(result){
			
			if(!result.OpptyCompQuery_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
			}else if(result.OpptyCompQuery_Output.NumOutputObjects=='1'||result.OpptyCompQuery_Output.NumOutputObjects=='0')
				Ext.Msg.alert('提示','该商机无竞争对手分析！');
			var store = Ext.data.StoreManager.get('CompetitorStore'); 
			var data = result.OpptyCompQuery_Output.ListOfHelEaiAppOpportunityCompetitor.ListOfHelCompetitor.HelCompetitor;
			if(result.OpptyCompQuery_Output.NumOutputObjects=='1')
				store.setData([data]);
			else if(result.OpptyCompQuery_Output.NumOutputObjects=='0'){
				
			}else
				store.setData(data);
				
		}; 
		
		this.connectServer_queryOpportunity(getResult,params);
		Ext.getCmp('comOpportunity').setData(opportunity);
		
	},
	
	//客户需求分析
	projectinfo_new_id_QTXX_KHXQFX:function(){
		var opportunity = Ext.getCmp('opportunity').getData();
		this.NextView('customerdemandanalysislist_new_id','HelcAgent.view.OpportunityManagement.Project_New.CustomerDemandAnalysisList');
		
		if(opportunity.OpptyStatus!='大项目部退回'&&opportunity.OpptyStatus!='申请流失'&&opportunity.OpptyStatus!='提交大项目部'&&opportunity.OpptyStatus!='完成'&&opportunity.OpptyStatus!='流失'&&opportunity.OpptyStatus!='已提交')
			Ext.getCmp('customerDemandrSegment').setHidden(false);
		else
			Ext.getCmp('customerDemandrSegment').setHidden(true);
		
		var store = Ext.data.StoreManager.get('CustomerDemandStore');
		if(!store)
			store = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.CustomerDemandStore');
		
		var param = {
				opptyId:opportunity.RowId,
				opptyType:opportunity.OpptyType,
				userID:userID
		};
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'queryCustomerDemand',
				parameters:param 
		};
		var getResult = function(result){			
			if(!result.OpptyDemAnalyQuery_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}else if(result.OpptyDemAnalyQuery_Output.NumOutputObjects=='0'){
				Ext.Msg.alert('提示','该商机无客户需求分析！');
				return ;
			}
				
			var data = result.OpptyDemAnalyQuery_Output.ListOfHelEaiAppOpportunityDemandAnalysis.Opportunity.ListOfHelOpptyDemandAnalysis.HelOpptyDemandAnalysis;
			if(!data){
				
			}else if(!data.length){
				store.setData([data]);
			}else
				store.setData(data);
				
		};
		
		this.connectServer_queryOpportunity(getResult,params);
		Ext.getCmp('customerDemandOppty').setData(opportunity);
		
	},
	//联系人
	keyContact:function(){
		this.NextView('keyContactPanel','HelcAgent.view.OpportunityManagement.Project_New.KeyContactView');
	},
	//代理商
	projectinfo_new_id_QTXX_DLS:function(){
		var obj = this;
		var opportunity = Ext.getCmp('opportunity').getData();
		this.NextView('toDoPerformanceAgentList','HelcAgent.view.OpportunityManagement.Project_New.BusinessAgentList');
		Ext.getCmp('businessAgentOpportunity').setData(opportunity);
		if(opportunity.AgentPerformanceStatus=='修改中'||opportunity.AgentPerformanceStatus=='新建'){
			Ext.getCmp('submitAgentAchieve').setHidden(false);
		}
		var param = {
				id:opportunity.RowId,
				userID:userID,
		};
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'queryAgentAchieve',
				parameters:param 
		};
		
		var getResult = function(result){
			console.log(result);
			if(!result.OpptyAgentQuery_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}else if(!result.OpptyAgentQuery_Output.ListOfHelEaiAppOpportunityHelAgent.Opportunity.ListOfHelAgent){
				Ext.Msg.alert('提示','该商机无代理商信息！');
			}else{
				var r = result.OpptyAgentQuery_Output.ListOfHelEaiAppOpportunityHelAgent.Opportunity.ListOfHelAgent.HelAgent;
				var store = obj.getStore('BusinessAgentStore','HelcAgent.store.OpportunityManagement.Project_New.BusinessAgentStore');
				if(r.length)
					store.setData(r);
				else
					store.setData([r]);
			}
		};
		
		this.connectServer_queryOpportunity(getResult,params);
	},
	
	//商机资料3 返回
	projectinfo_new_id_FH:function(){
		this.BackView();
	},
	//进入添加商机页面的选项值设定操作
	toInit:function(){
		var opptyCategory = Ext.getCmp('opptyCategory');//商机类型
		var opptyAttribute = Ext.getCmp('opptyAttribute');//商机属性
		var businessType = Ext.getCmp('businessType');//合同类型
		var opptyContractType = Ext.getCmp('opptyContractType');//合同属性
		var opptyBuildingPhase = Ext.getCmp('opptyBuildingPhase');//土建进度
		var accountType = Ext.getCmp('accountType');//客户类型
		var accountSubType = Ext.getCmp('accountSubType');//客户子类型
		var opptyInfoChannel = Ext.getCmp('opptyInfoChannel');//信息渠道
		//------------------------商机信息
		var opptyStatus = Ext.getCmp('opptyStatus');//商机状态
		var opptyPhase = Ext.getCmp('opptyPhase');//商机阶段
		var opptyBusinessPreapproveStatus = Ext.getCmp('opptyBusinessPreapproveStatus');//商机预审状态
		//客户信息
		var accountProperty = Ext.getCmp('accountProperty');
		var accountAttribute = Ext.getCmp('accountAttribute');
		//var supplierOpportunity = Ext.getCmp('supplierOpportunity');
		
		
		this.selectGetData(opptyCategory,'HEL_OPPTY_CATEGORY');
		this.selectGetData(opptyAttribute,'HEL_OPPTY_ATTRIBUTE');//选择order by<4的
		this.selectGetData(businessType,'HEL_OPPTY_TYPE');//该处再值列表中为为商机类型（流失原因分析）
		this.selectGetData(opptyBuildingPhase,'HEL_OPPTY_BUILDING_PHASE');
		this.selectGetData(accountType,'ACCOUNT_TYPE');
		this.selectGetData(accountSubType,'HEL_ACCOUNT_SUBTYPE');
		this.selectGetData(opptyInfoChannel,'HEL_OPPTY_SOURCE');
		this.selectGetData(accountProperty,'HEL_ACCOUNT_PROPERTY');
		this.selectGetData(accountAttribute,'HEL_ACCOUNT_ATTRIBUTE');
		//this.selectGetData(supplierOpportunity,'BILL_PREPAID_TOPUP_STATUS');
		
		this.selectGetData(opptyPhase,'HEL_OPPTY_PHASE');
		Ext.getCmp('buttonMenu').setHidden(true);
		Ext.getCmp('salesRep').setReadOnly(true);
		
		opptyStatus.setReadOnly(true);
		opptyStatus.setOptions([{text:'新建',value:'新建'}]);
		opptyBusinessPreapproveStatus.setOptions([{text:'新建',value:'新建'}]);
		opptyBusinessPreapproveStatus.setReadOnly(true);
		Ext.getCmp('loseAndExamine').setHidden(true);
		Ext.getCmp('header').setTitle('新建商机');
		opptyContractType.setOptions([{text:'两方合同',value:'两方合同'},{text:'营销司三方合同',value:'营销司三方合同'}]);
		
	},
	//提取装载进选项框的数据
	selectGetData:function(select,type){
		var store = Ext.data.StoreManager.get('CxAppLovVStore');
		if(!store)
			store = Ext.create('HelcAgent.store.CxAppLovVStore');
		var r= [];
		var storeData = store.getData().all;
		var total = 1;
		r[0] = {text:'请选择',value:''};
		if(type=='HEL_OPPTY_ATTRIBUTE'){
			for(var i=0;i<storeData.length;i++){
				if(storeData[i].data.TYPE==type&&storeData[i].data.ORDER_BY<4){
					r [total]= {text:storeData[i].data.LIS_VAL,value:storeData[i].data.LIS_VAL};
					total++;
				}
			}
		}else{
			for(var i=0;i<storeData.length;i++){
				if(storeData[i].data.TYPE==type){
					r [total]= {text:storeData[i].data.LIS_VAL,value:storeData[i].data.LIS_VAL};
					total++;
				}
			}
		}
		
		select.setOptions(r);
	},
	//获取各个表单组件的值
	formValue:function(){
		
		
		//-----商机资料
		var name = Ext.getCmp('Name').getValue().trim();//商机名称
		var account = Ext.getCmp('account').getValue().trim();//客户
		var accountId = Ext.getCmp('accountId').getValue().trim();//--
		var opptyCategory = Ext.getCmp('opptyCategory').getValue();//商机类型
		var opptySubCategory = Ext.getCmp('opptySubCategory').getValue();//商机子类型
		var opptyAttribute = Ext.getCmp('opptyAttribute').getValue();//商机属性
		var businessType = Ext.getCmp('businessType').getValue();//合同类型
		var opptyContractType = Ext.getCmp('opptyContractType').getValue();//合同属性
		var opptyBuildingPhase = Ext.getCmp('opptyBuildingPhase').getValue();//土建进度
		var accountType = Ext.getCmp('accountType').getValue();//客户类型
		var accountSubType = Ext.getCmp('accountSubType').getValue();//客户子类型
		var opptyInfoChannel = Ext.getCmp('opptyInfoChannel').getValue();//信息渠道
		//------------------------
		
		var opptyInstallSite = Ext.getCmp('opptyInstallSite').getValue().trim();//安装地点
		var opptyInstallSiteId = Ext.getCmp('opptyInstallSiteId').getValue().trim();//--
		//------------------------商机信息
		var opptyFinalUser = Ext.getCmp('opptyFinalUser').getValue().trim();//使用单位
		var predictSign = Ext.getCmp('predictSign').getValue();//预计签约时间
		
		var opptyStatus = Ext.getCmp('opptyStatus').getValue();//商机状态
		var opptyPhase = Ext.getCmp('opptyPhase').getValue().trim();//商机阶段
		var evaluateElevatorQuantity = Ext.getCmp('evaluateElevatorQuantity').getValue();//预估直梯数
		var evaluateEscalatorQuantity = Ext.getCmp('evaluateEscalatorQuantity').getValue(); //预估扶梯数
		if(isNaN(evaluateElevatorQuantity)||isNaN(evaluateEscalatorQuantity)){
			Ext.Msg.alert('提示','请在预估直梯数量与预估扶梯数量中输入数字');
			return ;
		}
		if(!evaluateElevatorQuantity)
			evaluateElevatorQuantity = 0;
		if(!evaluateEscalatorQuantity)
			evaluateEscalatorQuantity = 0;
			
		var opptyBusinessPreapproveStatus = Ext.getCmp('opptyBusinessPreapproveStatus').getValue();//商机预审状态
		var salesRep = Ext.getCmp('salesRep').getValue().trim();//跟踪人员
		var HQSalesRepFullName = Ext.getCmp('HQSalesRepFullName').getValue().trim();//总部跟踪人员全名
		var HQSalesRepId = Ext.getCmp('HQSalesRepId').getValue().trim();//--
		var primaryRevenueAmount = Ext.getCmp('primaryRevenueAmount').getValue();//项目资金（万元）
		var frameProtocolNum = Ext.getCmp('frameProtocolNum').getValue();//框架协议编号
		
		var biding = Ext.getCmp('biding').getValue().trim();//是否招标
		//当前版本固定为否
		biding = '否';
		//-----------------联系人信息***********
		var keyContactId = Ext.getCmp('keyContactId').getValue();//选择联系人id
		//-----------------项目地址信息
		var installSiteCompany = Ext.getCmp('installSiteCompany').getValue().trim();//安装所在地分公司
		var installSiteCompanyId = Ext.getCmp('installSiteCompanyId').getValue().trim();//安装所在地分公司id--
		var siteState = Ext.getCmp('siteState').getValue().trim();//省/直辖市
		var siteCity = Ext.getCmp('siteCity').getValue().trim();//市
		var siteCounty = Ext.getCmp('siteCounty').getValue().trim();//区/县
		//----------------------日期信息
		//var created = Ext.getCmp('created').getValue().trim();//创建日期
		var opptyCloseDate = Ext.getCmp('opptyCloseDate').getFormattedValue('m/d/Y');//关闭日期
		//---------------------大项目关注
		var opptyMajorProject = Ext.getCmp('opptyMajorProject');//其它
		var largeCompositeProject = Ext.getCmp('largeCompositeProject');//大型综合项目
		var opptyInternationalHotel  = Ext.getCmp('opptyInternationalHotel');//五星级酒店
		var topBDC = Ext.getCmp('topBDC');//甲级写字楼
		var symbolicBuilding = Ext.getCmp('symbolicBuilding');//地标性建筑
		var luxuriousResidence	 = Ext.getCmp('luxuriousResidence');//高档住宅
		var opptyImportDemand = Ext.getCmp('opptyImportDemand');//进口大部件需求
		//-------------客户信息
		var accountKANumber = Ext.getCmp('accountKANumber').getValue().trim();//大客户编号
		var accountProperty = Ext.getCmp('accountProperty').getValue().trim();//客户性质
		var accountAttribute = Ext.getCmp('accountAttribute').getValue().trim();//客户属性
		//代理商商机状态的列表值BILL_PREPAID_TOPUP_STATUS
		//var supplierOpportunity	 = Ext.getCmp('supplierOpportunity').getValue();//代理商商机状态
		
		//必填字段：商机名称，商机类型，商机子类型，商机属性，信息渠道，合同类型，安装地点，客户，使用单位,预计签约时间（年）（月）
		//,安装地址地区
		//opptySubCategory,opptyAttribute,opptyInfoChannel,businessType,opptyInstallSite
		
		console.log(name+'-'+account+'-'+accountId+'-'+opptyCategory+'-'+predictSign+'-'+opptySubCategory+'-'+opptyAttribute+'-'+opptyInfoChannel+'-'+businessType+'-'+opptyInstallSiteId);
		
		if(this.isNullOrEmpty(name)||this.isNullOrEmpty(account)||this.isNullOrEmpty(accountId)||this.isNullOrEmpty(opptyCategory)||this.isNullOrEmpty(predictSign)){
			if(Ext.getCmp('opportunity').getData()){
				
			}else{
				Ext.Msg.alert('提示','请填写必要的商机资料');
				return ;
			}	
		}
		if(this.isNullOrEmpty(opptySubCategory)||this.isNullOrEmpty(opptyAttribute)||this.isNullOrEmpty(opptyInfoChannel)||this.isNullOrEmpty(businessType)||this.isNullOrEmpty(opptyInstallSiteId)){
			if(Ext.getCmp('opportunity').getData()){
				if(this.isNullOrEmpty(opptyCategory)||this.isNullOrEmpty(opptySubCategory)||this.isNullOrEmpty(opptyAttribute)||this.isNullOrEmpty(businessType)){
					Ext.Msg.alert('提示','请填写必要的商机资料');
					return ;
				}
					
			}else{
				Ext.Msg.alert('提示信息','请填写必要的商机资料');
				return ;
			}	
		}
		
		
		//需特殊处理数据
		var opptyInstallSiteObject = Ext.getCmp('opptyInstallSiteObject').getData();
		
		var opptyProjectArea = '';
		if(opptyInstallSiteObject)
			opptyProjectArea  = opptyInstallSiteObject.HELProject_Area;
		
		var date =predictSign.split('-'); 
		var year = date[0];
		var month = date[1];
		
		//复选框
		opptyMajorProject = this.checkboxValue(opptyMajorProject);
		largeCompositeProject = this.checkboxValue(largeCompositeProject);
		opptyInternationalHotel = this.checkboxValue(opptyInternationalHotel);
		topBDC = this.checkboxValue(topBDC);
		symbolicBuilding = this.checkboxValue(symbolicBuilding);
		luxuriousResidence = this.checkboxValue(luxuriousResidence);
		opptyImportDemand = this.checkboxValue(opptyImportDemand);
		
		//代理商商机状态SupplierOpportunity暂时不要求    XHeight  YCoordinate 写为固定值
		
		var oppty = {
				name:name,
				account:account,
				accountId:accountId,
				opptyCategory:opptyCategory,
				opptySubCategory:opptySubCategory,
				opptyAttribute:opptyAttribute,
				businessType:businessType,
				opptyContractType:opptyContractType,
				opptyBuildingPhase:opptyBuildingPhase,
				accountType:accountType,
				accountSubType:accountSubType,
				opptyInfoChannel:opptyInfoChannel,
				opptyInstallSite:opptyInstallSite,
				opptyInstallSiteId:opptyInstallSiteId,
				opptyFinalUser:opptyFinalUser,
				opptyStatus:opptyStatus,
				opptyPhase:opptyPhase,
				opptyType:'设备商机',
				evaluateElevatorQuantity:evaluateElevatorQuantity,
				evaluateEscalatorQuantity:evaluateEscalatorQuantity,
				opptyBusinessPreapproveStatus:opptyBusinessPreapproveStatus,
				salesRep:salesRep,
				HQSalesRepFullName:HQSalesRepFullName,
				HQSalesRepId:HQSalesRepId,
				primaryRevenueAmount:primaryRevenueAmount,
				frameProtocolNum:frameProtocolNum,
				biding:biding,
				opptyCloseDate:opptyCloseDate,
				siteState:siteState,
				siteCity:siteCity,
				siteCounty:siteCounty,
				year:year,
				month:month,
				opptyProjectArea:opptyProjectArea,
				opptyMajorProject:opptyMajorProject,
				largeCompositeProject:largeCompositeProject,
				opptyInternationalHotel:opptyInternationalHotel,
				topBDC:topBDC,
				symbolicBuilding:symbolicBuilding,
				luxuriousResidence:luxuriousResidence,
				opptyImportDemand:opptyImportDemand,
				accountKANumber:accountKANumber,
				accountProperty:accountProperty,
				accountAttribute:accountAttribute,
				XHeight:MapX==null?'':MapX,
				YCoordinate:MapY==null?'':MapY,
				supplierOpportunity:'',
				keyContactId:keyContactId,
				installSiteCompanyId:installSiteCompanyId,
				installSiteCompany:installSiteCompany,
				opptySource:'设备商机'
		};
		
		
		return oppty;
		
	},
	simpleGetFormValue:function(){
		var formPanelData = Ext.getCmp('projectinfo_new_id').getValues(true,false);
		formPanelData.opptyType='设备商机';
		formPanelData.opptySource='设备商机';
		
		if(!formPanelData.name||!formPanelData.account||!formPanelData.accountId||!formPanelData.opptyCategory||!formPanelData.predictSign){
			if(Ext.getCmp('opportunity').getData()){
				
			}else{
				Ext.Msg.alert('提示','请填写必要的商机资料');
				return ;
			}	
		}
		if(!formPanelData.opptySubCategory||!formPanelData.opptyAttribute||!formPanelData.opptyInfoChannel||!formPanelData.businessType||!formPanelData.opptyInstallSiteId){
			if(Ext.getCmp('opportunity').getData()){
				if(!formPanelData.opptyCategory||!formPanelData.opptySubCategory||!formPanelData.opptyAttribute||!formPanelData.businessType){
					Ext.Msg.alert('提示','请填写必要的商机资料1');
					return ;
				}
					
			}else{
				Ext.Msg.alert('提示信息','请填写必要的商机资料2');
				return ;
			}	
		}
		//需要特殊处理的数据
		var year = formPanelData.predictSign.split('-')[0];
		var month = formPanelData.predictSign.split('-')[1];
		formPanelData.year = year;
		formPanelData.month = month;
		
		var opptyInstallSiteObject = Ext.getCmp('opptyInstallSiteObject').getData();
		
		var opptyProjectArea = '';
		if(opptyInstallSiteObject)
			opptyProjectArea  = opptyInstallSiteObject.HELProject_Area;
		formPanelData.opptyProjectArea = opptyProjectArea;
		
		return formPanelData;
	},
	isNullOrEmpty:function(value){
		if(value==undefined||value==''||value==null)
			return true;
		else
			return false;
	},
	checkboxValue:function(checkbox){
		if(checkbox.isChecked())
			return 'Y';
		else 
			return '';
	},
});