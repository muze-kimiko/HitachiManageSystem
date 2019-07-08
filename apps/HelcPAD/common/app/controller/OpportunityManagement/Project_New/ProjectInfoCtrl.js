Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.ProjectInfoCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			 
			 //提交商机审核
			 'button#opportunityExamine':{
				 tap:'opptyExamine'
			 },
			 
			 //新建商机
			 /*'button#submitOppty':{
				 tap:'submitOppty'
			 },*/
			 
			 //保存商机
			 /*'button#saveOppty':{
				 tap:'submitOppty' 
			 },*/
			 
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
			 },
			 
			 //说明字段的文本框
			 'button#opptyDescription_Button':{
				 tap:'opptyDescription_Button'
		     },
			 
			 //主管意见的文库框
		     'button#managerSuggestion_Button':{
		    	 tap:'managerSuggestion_Button'
			 },
			 
			 //关注人
			 /*'button#projectinfo_new_id_GZR':{
		    	 tap:'projectinfo_new_id_GZR'
			 },*/
			 
		},
	},
	
	//自动报价(状态为跟进才有) 接口有问题 
	projectinfo_new_id_ZDBJ:function(){
		var objs=this;
		var BusinessID=object.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectListCtrl').BusinessID;
		var part = {
				userID:userID,
				Id:BusinessID,
		};
		
		var data = {};
		data.adpName='HttpAdapter_PAD_Custom';
		data.prodName='getZDBJ';
		data.parameters=part;
		
		var getResult = function(result){
			myLoading.hide();
			//cc.log(result);
			var msg=result.OpptyAutoQuote_Output.ErrMsg;
			if(msg){
				Ext.Msg.alert('温馨提示',msg);
				return;
			};
			WL.Toast.show("自动报价成功！");
			objs.BackView();
			object.getController('OpportunityManagement.Project_New.ProjectSearchCtrl').projectsearch_new_id_CX();
		};
		
		objs.XCX_GG_FF(getResult,data);
	},
	
	
	//关注人     xcx 不属于这个模块。暂时不用
	projectinfo_new_id_GZR:function(){
		var objs=this;
		var BusinessID=object.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectListCtrl').BusinessID;
		var part = {
				userID:userID,
				id:BusinessID,
		};
		
		var data = {};
		data.adpName='HttpAdapter_PAD_Custom';
		data.prodName='getDetailedGZR';
		data.parameters=part;
		
		var getResult = function(result){
			//cc.log(result);
			var gzr=result.OpptyDetailQuery_Output.ListOfHelEaiAppOpportunityDetail.Opportunity["ListOfOpportunity_Position-Attention"]["Opportunity_Position-Attention"];
			//console.log(result.OpptyDetailQuery_Output);
			//console.log(result.OpptyDetailQuery_Output.ListOfHelEaiAppOpportunityDetail);
			//console.log(result.OpptyDetailQuery_Output.ListOfHelEaiAppOpportunityDetail.Opportunity);
			console.log(gzr);
			//825商机流失测试03
			obj.NextView('ConcernedAboutPeople_id','HelcPAD.view.OpportunityManagement.Project_New.GZR.ConcernedAboutPeople');
			if(gzr){
				Ext.getCmp('GZRname').setValue(gzr["SalesRep-Attention"]);
				Ext.getCmp('GZRname').setReadOnly(true);
				Ext.getCmp('ConcernedAboutPeople_id_TJ').setHidden(true);
			}
		};
		
		objs.XCX_GG_FF(getResult,data);
		
	},
	
	//说明字段的文本框
	opptyDescription_Button:function(){
		/* 汉化提示窗口的按钮 */
        Ext.define("HelcPDA.overrides.MessageBox", {
            override: "Ext.MessageBox",
            statics: {
                OK    : {text: '确定', itemId: 'ok',  ui: 'action'},
                YES   : {text: '是',   itemId: 'yes', ui: 'action'},
                NO    : {text: '否',   itemId: 'no'},
                CANCEL: {text: '取消', itemId: 'cancel'},

                INFO    : Ext.baseCSSPrefix + 'msgbox-info',
                WARNING : Ext.baseCSSPrefix + 'msgbox-warning',
                QUESTION: Ext.baseCSSPrefix + 'msgbox-question',
                ERROR   : Ext.baseCSSPrefix + 'msgbox-error',

                OKCANCEL: [
                    {text: '取消', itemId: 'cancel'},
                    {text: '确定', itemId: 'ok',  ui : 'action'}
                ],
                YESNOCANCEL: [
                    {text: '取消', itemId: 'cancel'},
                    {text: '否',   itemId: 'no'},
                    {text: '是',   itemId: 'yes', ui: 'action'}
                ],
                YESNO: [
                    {text: '否', itemId: 'no'},
                    {text: '是', itemId: 'yes', ui: 'action'}
                ]
            }
        });
		var flag=Ext.getCmp('opptyDescription').getReadOnly();
		var values=Ext.getCmp('opptyDescription');
		Ext.Msg.prompt('说明', '',
			function(buttonId,value) {
            	if(buttonId=='ok'){
            		if(!flag){
            			values.setValue(value);
            		}
                }
            },
            this,
            true,
            values.getValue() || '',
            {
            	autoCapitalize: true,
                placeHolder: '请输入说明内容',
            }
	    );
	},
	
	//主管意见的文库框
	managerSuggestion_Button:function(){
		/* 汉化提示窗口的按钮 */
        Ext.define("HelcPDA.overrides.MessageBox", {
            override: "Ext.MessageBox",
            statics: {
                OK    : {text: '确定', itemId: 'ok',  ui: 'action'},
                YES   : {text: '是',   itemId: 'yes', ui: 'action'},
                NO    : {text: '否',   itemId: 'no'},
                CANCEL: {text: '取消', itemId: 'cancel'},

                INFO    : Ext.baseCSSPrefix + 'msgbox-info',
                WARNING : Ext.baseCSSPrefix + 'msgbox-warning',
                QUESTION: Ext.baseCSSPrefix + 'msgbox-question',
                ERROR   : Ext.baseCSSPrefix + 'msgbox-error',

                OKCANCEL: [
                    {text: '取消', itemId: 'cancel'},
                    {text: '确定', itemId: 'ok',  ui : 'action'}
                ],
                YESNOCANCEL: [
                    {text: '取消', itemId: 'cancel'},
                    {text: '否',   itemId: 'no'},
                    {text: '是',   itemId: 'yes', ui: 'action'}
                ],
                YESNO: [
                    {text: '否', itemId: 'no'},
                    {text: '是', itemId: 'yes', ui: 'action'}
                ]
            }
        });
		var flag=Ext.getCmp('managerSuggestion').getReadOnly();
		var values=Ext.getCmp('managerSuggestion');
		Ext.Msg.prompt('主管意见', '',
			function(buttonId,value) {
            	if(buttonId=='ok'){
            		if(!flag){
            			values.setValue(value);
            		}
                }
            },
            this,
            true,
            values.getValue() || '',
            {
            	autoCapitalize: true,
                placeHolder: '请输入主管意见',
            }
	    );
	},
	
	
	//为申请流失商机做的界面构建修改
	forLoseOpptyReasonList:function(){
		var forLoseOpptyContainer = Ext.getCmp('forLoseOpptyContainer');
		var openOpptyLoseReasonBtn = document.getElementById('openOpptyLoseReasonBtn');
		var opptyLoseReasonListData = object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').opptyLoseReasonListData;
		var fieldSetContent = [];
		var loseReasonItem = null;
		console.log();
		if(opptyLoseReasonListData[0].OpptyType=='display:none;'){
			openOpptyLoseReasonBtn.style.background = 'none repeat scroll 0 0 #F31212';
			openOpptyLoseReasonBtn.innerText = '无流失原因';
			return ;
		}
		if(openOpptyLoseReasonBtn.innerText == '展开'){
			for(var i=0;i<opptyLoseReasonListData.length;i++){
				loseReasonItem = {
						xtype:'textfield',
						labelWidth:'0%',
						style:'float:left;',
						width:'100%',
						value:'   '+opptyLoseReasonListData[i].OpptyLoseReasonType+'    '+opptyLoseReasonListData[i].OpptyLoseReason,
						readOnly:true
				};
				fieldSetContent.push(loseReasonItem);
			}
			forLoseOpptyContainer.setItems(fieldSetContent);
			openOpptyLoseReasonBtn.innerText='收起';
		}else if(openOpptyLoseReasonBtn.innerText =='收起'){
			forLoseOpptyContainer.setItems([]);
			openOpptyLoseReasonBtn.innerText='展开';
		}else
			return;
	},
	//客户类型变化使客户子类型变化
	leadAccountSubTypeC:function( selectField, newValue, oldValue, eOpts){
		var accountSubType = this.extractionData('HEL_ACCOUNT_SUBTYPE');
		var r = [];
		var total = 1;
		if(this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectListCtrl').status == 'detail')
			r[0] = {text:'',value:''};
		else
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
		if(this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectListCtrl').status == 'detail')
			r[0] = {text:'',value:''};
		else
			r[0] = {text:'请选择',value:''};
		for(var i=0;i<opptySubCategory.length;i++){
			if(opptySubCategory[i].PAR_LIS_VAL==newValue){
				r[total] = {text:opptySubCategory[i].LIS_VAL,value:opptySubCategory[i].LIS_VAL};
				total++;
			}
		}
		Ext.getCmp('opptySubCategory').setOptions(r);
		
	},
	
	//商机审核
	opptyExamine:function(){
		var opportunity = Ext.getCmp('opportunity').getData();
		console.log(opportunity);
		var recordId = opportunity.Id;
		if(!recordId)
			record = opportunity['RowId'];
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
				    		if(result.SubmitOpt_Output.ErrorMsg){
				 				Ext.Msg.alert('错误信息',result.SubmitOpt_Output.ErrorMsg);
				 				return ;
				 			}
				 			if(result.SubmitOpt_Output){
				 				Ext.Msg.alert('提示','提交审核成功！');
				 				var length = ViewArray.length-1;
								for(var i = length;i>-1;i--){
									if(ViewArray[i].ViewId!='projectSearch'){
										ViewArray.splice(ViewArray.length-1,1);
									}	
									else{
										obj.BackView();
										break;
									}	
								}
								object.getController('OpportunityManagement.Project_New.ProjectSearchCtrl').queryOpptyAfterOperation();
				 				//setTimeout("object.getController('OpportunityManagement.Project_New.ProjectSearchCtrl').projectsearch_new_id_CX()",100);
				 				return ;
				 			}
				 			
				 		};
			 		obj.connectServer_queryOpportunity(getResult,data);
		    	 
				   }
			   }
			});
		
	},
	
	//新建商机
	//新建商机页面的  "保存商机"就是新建商机,"保存并提交"是指新建商机后立马去审核商机
	submitOppty:function(whetherSubmit){
		var obj = this;
		var oppty ;//= this.formValue();
		//必填验证
		var simpleOppty = this.simpleGetFormValue();
		//cc.log('第一个');
		//console.log(simpleOppty);
		
		oppty = simpleOppty;
		if(!oppty){
			return ;
		};
		
		oppty.userID = userID;
		var opportunity = Ext.getCmp('opportunity').getData();
		//cc.log('这是');
		//cc.log(opportunity);
		var msg = '是否新建商机？';
		var rMsg = '商机新建完成！';
		
		if(opportunity){
			msg = '是否保存商机？';
			rMsg = '商机保存完成！';
			oppty.Id = opportunity.RowId;
			oppty.OpptyProjectArea = Ext.getCmp('opptyInstallSite').getData();
			oppty.XHeight = MapX;
			oppty.YCoordinate = MapY;
		}else{
			oppty.XHeight = MapX;
			oppty.YCoordinate = MapY;
		}
		
		/*var numberfield = Ext.getCmp('projectinfo_new_id').query('numberfield');
		var breaking = false;
		for(var i=0;i<numberfield.length;i++){
			if(isNaN(numberfield[i].getValue()))
				breaking = true;	
		}
		if(breaking){
			Ext.Msg.alert('提示','请在数字项中输入数字！');
			return;
		}*/
		
		var predictSign = Ext.getCmp('predictSign').getValue();
		var opptyMajorProject = Ext.getCmp('opptyMajorProject');//其它
		var largeCompositeProject = Ext.getCmp('largeCompositeProject');//大型综合项目
		var opptyInternationalHotel  = Ext.getCmp('opptyInternationalHotel');//五星级酒店
		var topBDC = Ext.getCmp('topBDC');//甲级写字楼
		var symbolicBuilding = Ext.getCmp('symbolicBuilding');//地标性建筑
		var luxuriousResidence	 = Ext.getCmp('luxuriousResidence');//高档住宅
		var opptyImportDemand = Ext.getCmp('opptyImportDemand');//进口大部件需求
		
		var FDKContractFlag = Ext.getCmp('FDKContractFlag');//菲迪克合同标识
		var importMainEngine = Ext.getCmp('importMainEngine');//进口主机
		var importControllingMachine = Ext.getCmp('importControllingMachine');//进口控制柜
		var importDoorMachine = Ext.getCmp('importDoorMachine');//进口门机
		
		oppty.OpptyCloseDate = oppty.OpptyCloseDate.replace('-','/');
		oppty.OpptyCloseDate = '';
		var date =predictSign.split('-'); 
		var year = date[0];
		var month = date[1];
		
		//复选框
		oppty.OpptyMajorProject = this.checkboxValue(opptyMajorProject);
		oppty.LargeCompositeProject = this.checkboxValue(largeCompositeProject);
		oppty.OpptyInternationalHotel = this.checkboxValue(opptyInternationalHotel);
		oppty.TopBDC = this.checkboxValue(topBDC);
		oppty.SymbolicBuilding = this.checkboxValue(symbolicBuilding);
		oppty.LuxuriousResidence = this.checkboxValue(luxuriousResidence);
		oppty.OpptyImportDemand = this.checkboxValue(opptyImportDemand);
		oppty.FDKContractFlag = this.checkboxValue(FDKContractFlag);
		oppty.ImportMainEngine = this.checkboxValue(importMainEngine);
		oppty.ImportControllingMachine = this.checkboxValue(importControllingMachine);
		oppty.ImportDoorMachine = this.checkboxValue(importDoorMachine);
		
		oppty.SupplierOpportunity = '';
		
		oppty.Year = year;
		oppty.Month = parseInt(month);
		oppty.OppptySource = '设备商机';
		oppty.OpptyType = '设备商机';
		
		//2016-12-13 xcx
		//说明
		oppty.Description=Ext.getCmp('opptyDescription').getValue();
		//主管建议
		oppty.OpptyDeclineReason=Ext.getCmp('managerSuggestion').getValue();
		cc.log('第二个，是提交的参数');
		console.log(oppty);
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
			 			console.log(result);
			 			if(result.Fault){
			 				if(result.Fault.faultstring=="对于集成组件 '' 的实例（使用用户密码 ''），具有相同值的记录在 Siebel 数据库中已存在。↵↵请确保输入消息中的字段值是唯一的。(SBL-EAI-04381)"){
			 					Ext.Msg.alert('提示','所选的安装地址不为唯一,请重新选择');
			 				}else{
			 					Ext.Msg.alert('提示',result.Fault.faultstring);
			 				}
			 				return ;
			 			}
			 				
			 			if(result.OpptyDetailSynchronize_Output){
			 				if(result.OpptyDetailSynchronize_Output&&result.OpptyDetailSynchronize_Output.ListOfHelEaiAppOpportunityDetail&&result.OpptyDetailSynchronize_Output.ListOfHelEaiAppOpportunityDetail.Opportunity){
			 					
			 					if(whetherSubmit){//保存后审核
			 						result.OpptyDetailSynchronize_Output.ListOfHelEaiAppOpportunityDetail.Opportunity.Id = result.OpptyDetailSynchronize_Output.PrimaryRowId;
			 						Ext.getCmp('opportunity').setData(result.OpptyDetailSynchronize_Output.ListOfHelEaiAppOpportunityDetail.Opportunity);
			 						obj.opptyExamine();
			 						return ;
			 					}else{
				 					Ext.Msg.alert('提示',rMsg);
				 					var length = ViewArray.length-1;
									//console.log('长度——————:'+length);
									var JG=object.getApplication().getController('HelcPAD.controller.Remind.RemindListCtrl').LY;
									if(JG=='提醒'){
										object.getApplication().getController('HelcPAD.controller.Remind.RemindListCtrl').LY='非提醒';
										obj.BackView();
									}else{
										for(var i = length;i>-1;i--){
											if(ViewArray[i].ViewId!='projectSearch'){
												ViewArray.splice(ViewArray.length-1,1);
											}	
											else{
												obj.BackView();
												break;
											}	
										}
									}
									object.getController('OpportunityManagement.Project_New.ProjectSearchCtrl').queryOpptyAfterOperation();
				 					MapX = null;
				 					MapY = null;
				 					object.getController('map.MapCtrl').PADMapXG=null;
			 					}	
			 					//Ext.Viewport.hideMenu('right');
			 				}else if(result.OpptyDetailSynchronize_Output.ErrorMsg){
			 					Ext.Msg.alert('提示',result.OpptyDetailSynchronize_Output.ErrorMsg);
			 					return;
			 				}else{
			 					Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
			 					return;
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
		this.NextView('customerSelect','HelcPAD.view.OpportunityManagement.Project_New.CustomerSelectView');
		Ext.getCmp('comeSource').setValue('HelcPAD.controller.OpportunityManagement.Project_New.ProjectInfoCtrl');
		//修改列表的长度
		var gd=MapHeight-45-50-210;
		//cc.log('gd:'+gd);
		Ext.getCmp('custornList').setHeight(gd);
	},
	//跟踪人员    不用了  2016-4-5 之前跟踪人员和总部跟踪人员是要查询的，不过现在跟踪人员进入页面的时候直接带出来了，
	//不需要在去查找了，不过监视器不能删，里面有些代码“总部跟踪人员” 会用到
	toSalesRep:function(){
		this.NextView('HQSalesRepPanel','HelcPAD.view.OpportunityManagement.Project_New.HQSalesRepView');
		object.getController('OpportunityManagement.Project_New.HQSalesRepCtrl').source = 'salesRep';
		Ext.getCmp('salesRepToolbar').setTitle('跟踪人员');


		var repData = Ext.getCmp('salesRep').getData();
		var HQSalesRepStore = Ext.data.StoreManager.get('HQSalesRepStore');
		if(!HQSalesRepStore){
			HQSalesRepStore = Ext.create('HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
		};
		//如果有跟踪人返回值，那么直接显示跟踪人返回值
		if(repData){
			//填充数据
			HQSalesRepStore.setData(repData);
		}else{//如果没有跟踪人返回值，那么直接显示详细信息自带的值
			var data=Ext.getCmp('opportunity').getData();
			data=data.ListOfOpportunity_Position.Opportunity_Position;
			var zh=[];
			for(var i=0;i<data.length;i++){
				//为了list显示
				var name=data[i].FullName.split(' ');
				data[i].LastName=name[0];
				data[i].FirstName=name[1];
				data[i].Division=Ext.getCmp('organization').getValue();
				data[i].Name=data[i].Position;
				zh[i]=data[i];
			};
			HQSalesRepStore.setData(zh);
		};
		
		//强制转页
		var char=Ext.getCmp('HQSalesRepPanel');
		var tab=char.getInnerItems();
		char.setActiveItem(tab[1]);
	},
	
	
	//总部跟踪人员
	toHQSalesRep:function(){
		this.NextView('NewHQSalesRepView','HelcPAD.view.OpportunityManagement.Project_New.NewHQSalesRepView');
		var store = this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
		store.setData([]);
		//2016-5-11 后加
		var store2 = this.getStore('NewHQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.NewHQSalesRepStore');
		store2.setData([]);
		//修改列表的长度
		var gd=MapHeight-45-50-170;
		//cc.log('gd:'+gd);
		Ext.getCmp('NewHQSalesRepList').setHeight(gd);

		
		
		/*this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.HQSalesRepCtrl').toSalesRepInit();
		object.getController('OpportunityManagement.Project_New.HQSalesRepCtrl').source = null;
		Ext.getCmp('HQSalesRepPanelComplete').setHidden(true);*/
		
	},
	//安装地点
	toOpptyInstallSite:function(){
		this.NextView('installSitePanel','HelcPAD.view.OpportunityManagement.Project_New.InstallSiteView');
		Ext.getCmp('installSiteComeSource').setValue('HelcPAD.controller.OpportunityManagement.Project_New.ProjectInfoCtrl');
		this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.InstallSiteCtrl').toInit('installSite');
		//页面样式
		var zz=MapHeight-45-310-10;
		Ext.getCmp('installSiteList').setHeight(zz);
	},
	//安装所在分公司
	toInstallSiteCompany:function(){
		this.NextView('installSiteCompanySelect','HelcPAD.view.OpportunityManagement.Project_New.InstallSiteCompanyView');
		this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.InstallSiteCompanyCtrl').toInit();
		//登陆人所在公司
		var organization = object.getController('OpportunityManagement.Agents.ClueCreateAgentCtrl').allAgents;//OrgName
		if(organization==undefined){
			Ext.getCmp('companyName').setValue(organization);
		}
		if(organization.length){
			Ext.getCmp('companyName').setValue(organization[0].OrgName);
		}else{
			Ext.getCmp('companyName').setValue(organization.OrgName);
		};
		
	},
	//安装地点地图标示
	projectinfo_new_id_KHXX_AZDDDTBS:function(){
		var opportunity = Ext.getCmp('opportunity').getData();
		var siteState = Ext.getCmp('siteState').getValue();
		var siteCity = Ext.getCmp('siteCity').getValue();
		var siteCounty = Ext.getCmp('siteCounty').getValue();
		this.NextView('map_id','HelcPAD.view.map.Map');
		
		if(opportunity){
			MapX = opportunity.XHeight;
			MapY = opportunity.YCoordinate;
		}
		var  mapCtrl = object.getController('map.MapCtrl');
		mapCtrl.Saddress = siteState;
		mapCtrl.SHaddress = siteState+siteCity+siteCounty;
		mapCtrl.PADMapKJname='InstallMapMark';
		mapCtrl.MapCtrl_JRDT();
	},
	
	//附件
	projectinfo_new_id_QTXX_FJ:function(){
		var opportunity = Ext.getCmp('opportunity').getData();
		this.NextView('businessattachment_new_id','HelcPAD.view.OpportunityManagement.Project_New.BusinessAttachment');
		Ext.getCmp('businessattchmentOpportunity').setData(opportunity);
		
		this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.BusinessAttachmentCtrl').toInit();
		
	},
	
	//商机流失原因分析*******
	projectinfo_new_id_QTXX_SJLSYYFX:function(){
		
		var getResult = '';
		var obj = this;
		//记录商机详细信息
		var opportunity = Ext.getCmp('opportunity').getData();
		console.log('--------------//记录商机详细信息');
		console.log(opportunity);
		var params = {};
		if(opportunity.OpptyStatus){//判断是否有商机状态,没什么用
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
				//console.log('---------------------流失原因');
				//console.log(result);
				if(!result.OpptyLosReaQuery_Output){
					Ext.Msg.alert('提示信息','服务器繁忙，请稍后重试！');
					return ;
				}
				
				//查询结果
				var loseReason = result.OpptyLosReaQuery_Output.ListOfHelEaiAppOpportunityLoseReason.ListOfHelOpportunityLoseReason.HelOpportunityLoseReason;
				//console.log(loseReason);
				
				obj.NextView('opportunityoutflowreasonanalysislist_new_id','HelcPAD.view.OpportunityManagement.Project_New.OpportunityOutflowReasonAnalysisList');
				
				
				
				//存放商机详细信息
				Ext.getCmp('loseOpportunity').setData(opportunity);
				
				var store = Ext.data.StoreManager.get('OpportunityOutflowReasonStore');
				if(!store){
					store = Ext.create('HelcPAD.store.OpportunityManagement.Project_New.OpportunityOutflowReasonStore');
				}
				
				if(!loseReason){//没有数据
					Ext.getCmp('opportunityoutflowreasonanalysislist_new_id_list').setOnItemDisclosure(false);
					store.setData([{OpptyType:'display:none;',OpptyLoseReasonType:'该商机无流失原因',OpptyLoseReason:'' }]);
				}else if(!loseReason.length){//只有一条数据
					store.setData([loseReason]);
				}else{
					store.setData(loseReason);
				}
				
				
				//判断商机状态
				var IfStat=opportunity.OpptyStatus;
				console.log('IfStat：'+IfStat);
				if(IfStat=='流失'||IfStat=='完成'||IfStat=='申请流失'||IfStat=='已提交'||IfStat=='拒绝'){
					console.log('隐藏 添加 和删除和隐藏“提交商机流失” 默认隐藏');
					//隐藏 添加 和删除
					Ext.getCmp('buildAndDelete').setHidden(true);
					//隐藏“提交商机流失” 默认隐藏
				}else{
					console.log('显示');
					//显示 添加 和删除  默认显示  默认显示
					//显示  “提交商机流失” 
					Ext.getCmp('opportunityLose').setHidden(false);
				}
				
				
				//判断职位 (单主管没法进入商机,还是稳妥点)
				if(character=='主管和营业员'||character=='主管'){
					if(opportunity.OpptyStatus=='申请流失'){
						// 显示“商机流失操作”按钮
						Ext.getCmp('managerOPerationLoseReason').setHidden(false);
						
					}
				}
				
				return;
				
				//这一句的意思和下一句一样
				//object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile='12323123';
				var power = obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile;
				//console.log(power);
				
				
				//如果商机状态为流失，那么不可以添加 和删除 商机流失原因分析
				console.log(opportunity.OpptyStatus);
				if(opportunity.OpptyStatus=='流失')
					Ext.getCmp('buildAndDelete').setHidden(true);
				else
					Ext.getCmp('buildAndDelete').setHidden(false);
				
				var lose = true;
				//判断是否主管访问
				if(power=='Manager'){//但是主管不会进入我的商机，这判断没用
					if(opportunity.OpptyStatus=='已提交'){
						lose = true;
					}else if(opportunity.OpptyStatus=='大项目部退回'){
						lose = true;
					}else if(opportunity.OpptyStatus=='申请流失'){
						lose = false;
					}
					//隐藏 添加 和删除 按钮
					Ext.getCmp('buildAndDelete').setHidden(true);
					
					//当商机状态为‘申请流失’ 显示“商机流失操作”按钮
					Ext.getCmp('managerOPerationLoseReason').setHidden(lose);
				}else{//当职位有营业员，状态满足判断条件，显示显示“提交商机流失”按钮
					if(opportunity.OpptyStatus!='流失'
						&&opportunity.OpptyStatus!='完成'
							&&opportunity.OpptyStatus!='申请流失')
						Ext.getCmp('opportunityLose').setHidden(false);
				}
					
			};
			this.connectServer_queryOpportunity(getResult,params);
		}
			
	},
	
	//竞争对手分析
	projectinfo_new_id_QTXX_JZDSFX:function(){
		var opportunity = Ext.getCmp('opportunity').getData();
		this.NextView('competitoranalysislist_new_id','HelcPAD.view.OpportunityManagement.Project_New.CompetitorAnalysisList');
		
		if(opportunity.OpptyStatus!='大项目部退回'
			&&opportunity.OpptyStatus!='申请流失'
				&&opportunity.OpptyStatus!='提交大项目部'
					&&opportunity.OpptyStatus!='完成'
						&&opportunity.OpptyStatus!='流失'
							&&opportunity.OpptyStatus!='已提交')
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
			}
			var store = Ext.data.StoreManager.get('CompetitorStore'); 
			var data = result.OpptyCompQuery_Output.ListOfHelEaiAppOpportunityCompetitor.ListOfHelCompetitor.HelCompetitor;
				
			if(!data){
				Ext.getCmp('competitoranalysislist_new_id_list').setOnItemDisclosure(false);
				store.setData([{ComtName:'该商机无竞争对手分析信息',DeliveryDate:'display:none;',PayAmount:'',Quantity:''}]);	
			}else if(!data.length)
				store.setData([data]);
			else
				store.setData(data);
			
		}; 
		
		this.connectServer_queryOpportunity(getResult,params);
		Ext.getCmp('comOpportunity').setData(opportunity);
		
	},
	
	//客户需求分析
	projectinfo_new_id_QTXX_KHXQFX:function(){
		var opportunity = Ext.getCmp('opportunity').getData();
		this.NextView('customerdemandanalysislist_new_id','HelcPAD.view.OpportunityManagement.Project_New.CustomerDemandAnalysisList');
		
		if(opportunity.OpptyStatus!='大项目部退回'&&
				opportunity.OpptyStatus!='申请流失'
					&&opportunity.OpptyStatus!='提交大项目部'
						&&opportunity.OpptyStatus!='完成'
							&&opportunity.OpptyStatus!='流失'
								&&opportunity.OpptyStatus!='已提交')
			Ext.getCmp('customerDemandrSegment').setHidden(false);
		else
			Ext.getCmp('customerDemandrSegment').setHidden(true);
		if(obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile=='Manager'){
			Ext.getCmp('customerDemandrSegment').setHidden(true);
		}
		var store = Ext.data.StoreManager.get('CustomerDemandStore');
		if(!store)
			store = Ext.create('HelcPAD.store.OpportunityManagement.Project_New.CustomerDemandStore');
		
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
				Ext.getCmp('customerdemandanalysislist_new_id_list').setOnItemDisclosure(false);
				store.setData([{DemandType:'该商机无客户需求信息', DemandItem:'display:none;'}]);
			}else if(!data.length){
				store.setData([data]);
			}else
				store.setData(data);
				
		};
		
		this.connectServer_queryOpportunity(getResult,params);
		//客户需求分析列表页面 存放商机详细
		Ext.getCmp('customerDemandOppty').setData(opportunity);
		
	},
	//联系人
	keyContact:function(){
		this.NextView('keyContactPanel','HelcPAD.view.OpportunityManagement.Project_New.KeyContactView');
	},
	//代理商
	projectinfo_new_id_QTXX_DLS:function(){
		var obj = this;
		var opportunity = Ext.getCmp('opportunity').getData();
		this.NextView('toDoPerformanceAgentList','HelcPAD.view.OpportunityManagement.Project_New.BusinessAgentList');
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
			}else if(result.OpptyAgentQuery_Output.ErrorMsg){
				Ext.Msg.alert('提示',result.OpptyAgentQuery_Output.ErrorMsg);
				return;
			}else{
				var r = result.OpptyAgentQuery_Output.ListOfHelEaiAppOpportunityHelAgent.Opportunity.ListOfHelAgent.HelAgent;
				var store = obj.getStore('BusinessAgentStore','HelcPAD.store.OpportunityManagement.Project_New.BusinessAgentStore');
				if(!r){
					store.setData([{LeadStatus:'display:none;',LineNumber:'该商机无代理商业绩数据'}]);
				}else if(r.length){
					for(var i=0;i<r.length;i++){
						if(r[i].RegistrationDate){
							r[i].RegistrationDate = Ext.Date.format(Ext.Date.parse(r[i].RegistrationDate,'m/d/Y H:i:s'),'Y-m-d H:i:s');
						}
					}
					store.setData(r);
				}	
				else{
					if(r.RegistrationDate)
						r.RegistrationDate = Ext.Date.format(Ext.Date.parse(r.RegistrationDate,'m/d/Y H:i:s'),'Y-m-d H:i:s');
					store.setData([r]);
				}	
			}
		};
		
		this.connectServer_queryOpportunity(getResult,params);
	},
	
	//商机资料3 返回
	projectinfo_new_id_FH:function(){
		var obj=this;
		Ext.Msg.show({
			title: '温馨提示',
			message: '是否确认返回上一步，数据将丢失，请先保存你所填写内容！',
			buttons: [{text:'否', itemId:'no'},{text:'是', itemId:'yes'}],
			fn: function(buttonId) {
				if(buttonId == 'yes'){
					obj.BackView();
					MapX = null;
					MapY = null;
					object.getApplication().getController('map.MapCtrl').PADMapXG=null;
					var container = Ext.getCmp('projectdirectormain_new_id');
					if(container)
						container.setHidden(false);
				};
			}
		});
		
	},
	
	//ProjectListCtrl 的projectListTwo方法引用了改方法
	//进入添加商机页面的选项值设定操作
	toInit:function(record){
		//console.log('toInit----------------------');
		//console.log(record);
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
		//------------------------客户信息
		var accountProperty = Ext.getCmp('accountProperty');//客户性质
		var accountAttribute = Ext.getCmp('accountAttribute');//客户属性
		
		//经销商商机状态   已屏蔽  暂不删除
		/*var supplierOpportunity = Ext.getCmp('supplierOpportunity');
		this.selectGetData(supplierOpportunity,'BILL_PREPAID_TOPUP_STATUS');*/
		
		//下拉列表赋值
		this.selectGetData(opptyCategory,'HEL_OPPTY_CATEGORY');
		this.selectGetData(opptyAttribute,'HEL_OPPTY_ATTRIBUTE');//选择order by<4的
		this.selectGetData(businessType,'HEL_OPPTY_TYPE');//该处再值列表中为为商机类型（流失原因分析）
		this.selectGetData(opptyBuildingPhase,'HEL_OPPTY_BUILDING_PHASE');
		this.selectGetData(accountType,'ACCOUNT_TYPE');
		this.selectGetData(accountSubType,'HEL_ACCOUNT_SUBTYPE');
		this.selectGetData(opptyInfoChannel,'HEL_OPPTY_SOURCE');
		this.selectGetData(accountProperty,'HEL_ACCOUNT_PROPERTY');
		this.selectGetData(accountAttribute,'HEL_ACCOUNT_ATTRIBUTE');	
		this.selectGetData(opptyPhase,'HEL_OPPTY_PHASE');
		
		//'跟踪人员'就是跟进人 只读不能修改
		Ext.getCmp('salesRep').setReadOnly(true);
		
		//从列表进入
		if(this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectListCtrl').status == 'detail'){
			//合同属性
			opptyContractType.setOptions([{text:'两方合同',value:'两方合同'},{text:'营销司三方合同',value:'营销司三方合同'}]);
			//在页面显示数据
			if(record){
				object.getController('OpportunityManagement.Project_New.ProjectListCtrl').loadData(record);
			}
		}else{//新建商机时进入
			opptyStatus.setReadOnly(true);
			opptyStatus.setOptions([{text:'新建',value:'新建'}]);
			opptyBusinessPreapproveStatus.setOptions([{text:'新建',value:'新建'}]);
			opptyBusinessPreapproveStatus.setReadOnly(true);
			
			//隐藏  经销商
			Ext.getCmp('opptyAgent').setHidden(true);
			Ext.getCmp('projectinfo_new_id_QTXX_DLS').setHidden(true);
			//隐藏  客户需求分析
			Ext.getCmp('opptyDemand').setHidden(true);
			Ext.getCmp('projectinfo_new_id_QTXX_KHXQFX').setHidden(true);
			//隐藏  竞争对手分析
			Ext.getCmp('opptyCompetitor').setHidden(true);
			Ext.getCmp('projectinfo_new_id_QTXX_JZDSFX').setHidden(true);
			//隐藏  流失原因分析
			Ext.getCmp('opptyLoseReason').setHidden(true);
			Ext.getCmp('projectinfo_new_id_QTXX_SJLSYYFX').setHidden(true);
			//隐藏  附件
			Ext.getCmp('opptyFile').setHidden(true);
			Ext.getCmp('projectinfo_new_id_QTXX_FJ').setHidden(true);
			
			//标题头
			Ext.getCmp('header').setTitle('新建商机');
			//合同属性
			opptyContractType.setOptions([{text:'两方合同',value:'两方合同'},{text:'营销司三方合同',value:'营销司三方合同'}]);
		};
		this.getSMandZGYJ();
	},
	
	//xcx  2017-9-18 感觉没什么用
	//营业员或主管的说明和意见显示和写入    xcx  2016-12-12
	//行       新建  已提交   跟进 报价   已拒绝
	//不行   流失  完成    提交大项目部  申请流失    
	//暂时没法测试的    大项目跟进    大项目报价   大项目退回  拒绝   已废弃
	getSMandZGYJ:function(){
		var statr=object.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectListCtrl').ListZT;
		cc.log('statr-----------------------');
		cc.log(statr);
		//列表
		//从我的商机（ProjectSearch）页面点击列表进入商机资料（ProjectInfo）页面将会给
		//this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectListCtrl').status 赋值为 'detail'
		if(this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectListCtrl').status == 'detail'){
			var flag=false;
			if(statr=='提交大项目部'||statr=='已提交'){
				flag=true;
			};
			
			//managerSuggestion  主管意见
			//opptyDescription   说明
			if(character=='主管'){//只有主管职位是没法单独进入“我的商机”
				//商机状态为'提交大项目部'或着为'已提交'，职位为‘主管’
				//可以填写主管意见
				/*if(flag){
					Ext.getCmp('managerSuggestion').setReadOnly(false);
				}*/
			}else if(character=='主管和营业员'){
				//商机状态为'提交大项目部'或着为'已提交'，职位为‘主管和营业员’
				//可以填写说明
				//可以填写主管意见
				Ext.getCmp('opptyDescription').setReadOnly(false);
				if(flag){
					Ext.getCmp('managerSuggestion').setReadOnly(false);
				}
			}else if(character=='营业员'){
				//商机状态为'提交大项目部'或着为'已提交'，职位为‘主管和营业员’
				//可以填写说明
				if(flag){
					Ext.getCmp('opptyDescription').setReadOnly(false);
				}
			};
		}else{//新建商机时判断判断是否显示
			if(character=='主管'){
				
			}else if(character=='主管和营业员'){
				Ext.getCmp('managerSuggestion').setReadOnly(false);
				Ext.getCmp('opptyDescription').setReadOnly(false);
			}else if(character=='营业员'){
				Ext.getCmp('opptyDescription').setReadOnly(false);
			};
		};
		
		
	},
	
	//提取装载进选项框的数据
	selectGetData:function(select,type){
		var store = Ext.data.StoreManager.get('CxAppLovVStore');
		if(!store)
			store = Ext.create('HelcPAD.store.CxAppLovVStore');
		var r= [];
		var storeData = store.getData().all;
		var total = 1;
		if(this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectListCtrl').status == 'detail')
			r[0] = {text:'',value:''};
		else{
			r[0] = {text:'请选择',value:''};
		}	
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
			
		cc.log('预估直梯：'+evaluateElevatorQuantity+'  预估扶梯：'+evaluateEscalatorQuantity);
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
		var opptyCloseDate = Ext.getCmp('opptyCloseDate').getValue();//.getFormattedValue('m/d/Y');//关闭日期
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
		var opptyDescription = Ext.getCmp('opptyDescription').getValue().trim();//商机备注
		//代理商商机状态的列表值BILL_PREPAID_TOPUP_STATUS
		//var supplierOpportunity	 = Ext.getCmp('supplierOpportunity').getValue();//代理商商机状态
		
		//必填字段：商机名称，商机类型，商机子类型，商机属性，信息渠道，合同类型，安装地点，客户，使用单位,预计签约时间（年）（月）
		//,安装地址地区
		//opptySubCategory,opptyAttribute,opptyInfoChannel,businessType,opptyInstallSite
		
		console.log(name+'*'+account+'*'+accountId+'*'+opptyCategory+'*'+predictSign+'*'+opptySubCategory+'*'+opptyAttribute+'*'+opptyInfoChannel+'*'+businessType+'*'+opptyInstallSiteId);
		
		if(!name||!account||!accountId||!opptyCategory||!predictSign){
			if(Ext.getCmp('opportunity').getData()){
				
			}else{
				Ext.Msg.alert('提示','请填写必要的商机资料');
				return ;
			}	
		}
		if(!opptySubCategory||!opptyAttribute||!opptyInfoChannel||!businessType||!opptyInstallSiteId){
			if(Ext.getCmp('opportunity').getData()){
					
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
		opptyCloseDate = opptyCloseDate.replace('-','/');
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
				opptySource:'设备商机',
				description:opptyDescription
		};
		
		
		return oppty;
		
	},
	simpleGetFormValue:function(){
		var formPanelData = Ext.getCmp('projectinfo_new_id').getValues(true,false);
		formPanelData.OpptyType='设备商机';
		formPanelData.OpptySource='设备商机';
		//cc.log('第零个');
		//console.log(formPanelData);
		
		//需要特殊处理的数据
		var year = formPanelData.PredictSign.split('-')[0];
		var month = formPanelData.PredictSign.split('-')[1];
		formPanelData.Year = year;
		formPanelData.Month = parseInt(month);
		var opptyInstallSiteObject = Ext.getCmp('opptyInstallSiteObject').getData();
		
		var opptyProjectArea = '';
		if(opptyInstallSiteObject)
			opptyProjectArea  = opptyInstallSiteObject.HELProject_Area;
		formPanelData.OpptyProjectArea = opptyProjectArea;
		formPanelData.EvaluateElevatorQuantity = !isNaN(parseInt(formPanelData.EvaluateElevatorQuantity))?formPanelData.EvaluateElevatorQuantity+'':'';
		formPanelData.EvaluateEscalatorQuantity = !isNaN(parseInt(formPanelData.EvaluateEscalatorQuantity))?formPanelData.EvaluateEscalatorQuantity+'':'';
		formPanelData.BuildingHeight = !isNaN(parseInt(formPanelData.BuildingHeight))?formPanelData.BuildingHeight+'':'';
		formPanelData.BuildingLayer = !isNaN(parseInt(formPanelData.BuildingLayer))?formPanelData.BuildingLayer+'':'';
		
		
		if(!formPanelData.Name){
			if(getNumFlag('请输入商机名称!')){
				return ;
			};
		};
		if(!formPanelData.AccountId){
			if(getNumFlag('请选择客户!')){
				return ;
			};
		};
		if(!formPanelData.OpptyCategory){
			if(getNumFlag('请选择商机类型!')){
				return ;
			};
		};
		if(!formPanelData.PredictSign){
			if(getNumFlag('请选择预计签约时间!')){
				return ;
			};
		};
		if(!formPanelData.OpptyFinalUser){
			if(getNumFlag('请选择使用单位!')){
				return ;
			};
		};
		if(!formPanelData.OpptyBuildingPhase){
			if(getNumFlag('请选择土建进度!')){
				return ;
			};
		};
		
		if(!formPanelData.OpptyProjectArea){
			if(getNumFlag('请选择安装地点!')){
				return ;
			};
		};
		if(!formPanelData.OpptyInstallSiteId){
			if(getNumFlag('请选择安装地点!')){
				return ;
			};
		};
		if(!formPanelData.OpptySubCategory){
			if(getNumFlag('请选择商机子类型!')){
				return ;
			};
		};
		if(!formPanelData.EquipmentOpptyAttribute){
			if(getNumFlag('请选择商机属性!')){
				return ;
			};
		};
		if(!formPanelData.OpptyInfoChannel){
			if(getNumFlag('请选择信息渠道!')){
				return ;
			};
		};
		if(!formPanelData.BusinessType){
			if(getNumFlag('请选择合同类型!')){
				return ;
			};
		};
		
		
		if(!formPanelData.EvaluateElevatorQuantity){
			if(getNumFlag('请输入预估直梯数量!')){
				return ;
			};
		};
		if(!formPanelData.EvaluateEscalatorQuantity){
			if(getNumFlag('请输入预估扶梯台量!')){
				return ;
			};
		};
		if(!formPanelData.BuildingHeight){
			if(getNumFlag('请输入建筑高度!')){
				return ;
			};
		};
		if(!formPanelData.BuildingLayer){
			if(getNumFlag('请输入建筑层数!')){
				return ;
			};
		};
		
		function getNumFlag(num){
			if(Ext.getCmp('opportunity').getData()){
				return false;
			}else{
				Ext.Msg.alert('提示',num);
				return true;
			}	
		}
		
		if(MapX==null||MapY==null){
			if(Ext.getCmp('opportunity').getData()){
				
			}else{
				Ext.Msg.alert('提示','地图标识为必填项，请进入地图选择安装地点地图标识！');
				return ;
			}
		}
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