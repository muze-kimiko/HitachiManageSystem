
/* JavaScript content from app/controller/OpportunityManagement/Agents/ClueCreateAgentCtrl.js in folder common */
Ext.define('HelcAgent.controller.OpportunityManagement.Agents.ClueCreateAgentCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	config:{
		control:{
			//大客户选择
			'selectfield#clueAccountKAName':{
				change:'clueAccountKAName'
			},
			//返回按钮
			'button#clueCreateBack':{
				tap:'clueCreateBack'
			},
			//执行操作
			'button#execOperation':{
				tap:'execOperation'
			},
			//商机类型与子类型级联关系
			'selectfield#opptyType':{
				change:'leadOpptySubTypeC'
			},
			//报备地址选择
			/*'button#toStreetAddress':{
				tap:'toStreetAddress'
			},*/
			//省于市级联关系
			/*'selectfield#clueProvince':{
				change:'leadCityC'
			},
			市与区级联关系
			'selectfield#clueCity':{
				change:'leadDistrictC'
			},*/
			//选择客户
			'button#toClueCustomer':{
				tap:'toClueCustomer'
			},
			//地图定位
			'button#toCluePosition':{
				tap:'toCluePosition'
			},
			//省级数据变化影响区域变化
			'textfield#clueProvince':{
				change:'clueProvinceChange'
			},
			//跟踪人员选择
			'button#toClueFollwoer':{
				tap:'toClueFollwoer'
			},
			//代理商名称变化
			'selectfield#supplierName':{
				change:'supplierName'
			},
			//客户全称 查询
			'button#clueCustomer_CX':{
				tap:'clueCustomer_CX'
			},
		}
	},
	
	//客户全称   查询
	clueCustomer_CX:function(){
		this.NextView('customerSelectXJ','HelcAgent.view.OpportunityManagement.Agents.CustomerSelectView');
		var h=MapHeight-45-45-60;
		cc.log('长度：'+h);
		Ext.getCmp('custornListXJ').setHeight(h);
	},
	
	//删除报备
	deleteClue:function(parameters){
		var obj = this;
		Ext.Msg.show({
			title: '温馨提示',
			message: '删除线索?',
			buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			fn: function(buttonId) {
				if(buttonId == 'yes'){
					var clueSelf = Ext.getCmp('clueSelf').getData();
					cc.log('点击list传递过去的值2');
					cc.log(clueSelf);
					var param = {
							userID:userID,
							clueId:clueSelf.Id
					};
					var params = {
							adpName:'HttpAdapter_PAD_Custom',
							prodName:'deleteClue',
							parameters:param,
					};
					var getResult = function(result){
						cc.log('删除线索：'+result.DeleteRegiste_Output.ErrorCode);
						if(result.DeleteRegiste_Output.ErrorCode=='0x0'){
							Ext.Msg.alert('提示','删除线索完成！');
							obj.BackView();
							object.getApplication().getController('map.MapCtrl').PADMapXG=null;
						}else if(!result.DeleteRegiste){
							Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
						}else if(result.DeleteRegiste.ErrorMsg){
							Ext.Msg.alert('提示 ',result.DeleteRegiste.ErrorMsg);
						};
					};
					
					obj.connectServer_queryOpportunity(getResult,params);
				};
			},
		});
		
		
	},
	//主界面切换至报备界面时获取代理商信息
	mainCarousel:function(id){
		
			var obj = this;
			var allAgentName = [];
			//测试是代理商， 正式是经销商
			var allAgentNameStatement = "EXISTS([Position.Login Name] = '"+userID+"') AND [Position.Position Type] = '经销商' AND [Position.Oppty Agent Name] is not null ";//"([Account.Name] like '**') AND [Account.Account Status]='有效' AND  [Account.Type]  ='属下网点' and (([Account.Internal Org Flag] &lt;&gt; 'Y' or [Account.Partner Flag] &lt;&gt; 'N') AND [Account.Account Flag] &lt;&gt; 'N')";
			
			var param = {
					SearchSpec:allAgentNameStatement,
					ViewMode:'All',
					userID:id
			};
			console.log(param);
			var params = {
					adpName:'HttpAdapter_PAD_Custom',
					prodName:'salesRepQueryTwo',
					parameters:param,
					special:true
			};
			
			var getResult = function(result){
				
				myLogining.hide();
				
				cc.log('验证返回=========');
				console.log(result);
				if(!result.QuerySalesRep_Output){
					Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
					obj.BackView();
					return ;
				}else if(result.QuerySalesRep_Output.NumOutputObjects=='1'){
					allAgentName.push(result.QuerySalesRep_Output.ListOfPositionInterface.Position);
				}else if(result.QuerySalesRep_Output.NumOutputObjects=='0'){
					Ext.Msg.alert('提示','该账号siebel端无所在组织信息，请确认后尝试再次登录！');
					obj.BackView();
					return ;
				}else{
					allAgentName = result.QuerySalesRep_Output.ListOfPositionInterface.Position;
					if(allAgentName.length>1)
						allAgentName.push(allAgentName[0]);
				}
				obj.allAgents = allAgentName;
				//obj.getApplication().getController('HelcAgent.controller.login.PADMainCtrl').supplierModule(null,null,null,{data:{text:'新建报备'}},null,null);
			};
			
			this.connectServer_queryOpportunity(getResult,params);
		
	},
	//代理商名称变化改变代理商id
	supplierName:function( selectfield, newValue, oldValue, eOpts ){
		var obj = this;
		var helId = '';
		if(obj.allAgents){
			for(var i=0;i<obj.allAgents.length;i++){
				if(obj.allAgents[i].OpptyAgentName==newValue){
					helId = obj.allAgents[i].OpptyAgentId;
					Ext.getCmp('agentId').setValue(helId);
					return;
				}	
			}
		}
	},
	//定位
	toCluePosition:function(){
		var clueSelf = Ext.getCmp('clueSelf').getData();
		cc.log('clueSelf:'+clueSelf);
		 this.NextView('map_id','HelcAgent.view.map.Map');
		 if(clueSelf){
			MapX=clueSelf.XHeight;
			MapY=clueSelf.YCoordinate;
		 }
		this.getApplication().getController('map.MapCtrl').PADMapKJname='bCIImportAddress';
		this.getApplication().getController('map.MapCtrl').MapCtrl_JRDT();
		this.getApplication().getController('map.MapCtrl').ZBName='cluePosition';
	},
	//大客户选择
	clueAccountKAName:function( selectfield, newValue, oldValue, eOpts ){
		var bigAccountNumber = this.extractionData('HEL_BIGCODE');
		
		for(var i=0;i<bigAccountNumber.length;i++){
			if(bigAccountNumber[i].PAR_LIS_VAL==newValue){
				Ext.getCmp('clueAccountKANumber').setValue(bigAccountNumber[i].LIS_VAL);
				return;
			}
		}
	},
	//跟踪人员选择
	toClueFollwoer:function(){
		this.NextView('HQSalesRepPanel','HelcAgent.view.OpportunityManagement.Project_New.HQSalesRepView');
		this.getApplication().getController('HelcAgent.controller.OpportunityManagement.Project_New.HQSalesRepCtrl').source = 'clueFollower';
		this.getStore('HQSalesRepStore','HelcAgent.store.OpportunityManagement.Project_New.HQSalesRepStore').removeAll();
	},
	//省级数据变化影响区域变化
	clueProvinceChange:function( textField, newValue, oldValue, eOpts ){
		var province = this.extractionData('HEL_PROVINCE');
		for(var i=0;i<province.length;i++){
			if(newValue==province[i].LIS_VAL){
				Ext.getCmp('clueArea').setValue(province[i].PAR_LIS_VAL);
			}
		}
	},
	//客户选择
	toClueCustomer:function(){
		this.NextView('customerSelect','HelcAgent.view.OpportunityManagement.Project_New.CustomerSelectView');
		Ext.getCmp('comeSource').setValue('HelcAgent.controller.OpportunityManagement.Agents.ClueCreateAgentCtrl');
		Ext.Msg.alert('提示','查询结果后点击每项即可选中，勾选可使用选中删除！');
	},
	//返回按钮
	clueCreateBack:function(){
		var obj=this;
		Ext.Msg.show({
			title: '温馨提示',
			message: '是否返回主界面,数据将丢失，请先保存数据！',
			buttons: [{text:'取消', itemId:'no'},{text:'确认', itemId:'yes'},],
			fn: function(buttonId) {
				if(buttonId == 'yes'){
					obj.BackView();
					MapX = null;
					MapY = null;
					object.getApplication().getController('map.MapCtrl').PADMapXG=null;
				};
			}
		});
	},
	//提交报备
	submitClue:function(){
		var obj = this;
		var clue = Ext.getCmp('clueSelf').getData();
		var param = {
				userID:userID,
				clueId:clue.Id
		};
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
 				prodName:'submitClue',
 				parameters: param,
 				obj:this
 				
		};
		var getResult = function(result){
			
			console.log(result);
			if(result.Fault){
				Ext.Msg.alert('提示',result.Fault.faultstring);
				return ;
			}
			if(!result.SubmitRegiste_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return;
			}else{
				Ext.Msg.alert('提示','提交线索完成！');
				obj.BackView();
				MapX = null;
				MapY = null;
				obj.getApplication().getController('map.MapCtrl').PADMapXG=null;
			}
				
		};
		
		this.connectServer_queryOpportunity(getResult,params);
	},
	//取消报备（真：收回报备）
	cancelClue:function(){
		var obj = this;
		var clue = Ext.getCmp('clueSelf').getData();
		param = {
				userID:userID,
				clueId:clue.Id
		};
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
 				prodName:'cancelClue',
 				parameters: param,
 				obj:this
 				
		};
		var getResult = function(result){
			if(!result.CancelRegiste_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}else if(result.CancelRegiste_Output.ErrorMsg){
				Ext.Msg.alert('提示 ',result.CancelRegiste_Output.ErrorMsg);
			}else{
				Ext.Msg.alert('提示','取消线索完成！');
				obj.BackView();
				object.getApplication().getController('map.MapCtrl').PADMapXG=null;
			}
		};
		
		this.connectServer_queryOpportunity(getResult,params);
		
		
	},
	
	//执行操作
	execOperation:function(){
		/*测试用
		 * Ext.getCmp('bCIImportAddress').setValue('广东省广州市荔湾区鱿鱼大厦');
		Ext.getCmp('cluePosition').setValue('广东省广州市荔湾区鱿鱼大厦');
		MapX='1.1234567';
		MapY='2.2345678';*/
		//操作
		var operation = Ext.getCmp('clueOperation').getValue();//(线索状态按钮)
		var obj = this;
		//页面中name的值
		var formValue = Ext.getCmp('clueCreateAgent').getValues(false,false);
		
		//console.log(formValue);
		if(!formValue.BuildingHeight&&!isNaN(parseInt(formValue.BuildingHeight)))
			formValue.BuildingHeight = '0';
		if(!formValue.BuildingLayer&&!isNaN(parseInt(formValue.BuildingLayer)))
			formValue.BuildingLayer = '0';
		if(!formValue.EvaluateElevatorQuantity&&!isNaN(parseInt(formValue.EvaluateElevatorQuantity)))
			formValue.EvaluateElevatorQuantity = '0';
		if(!formValue.EvaluateEscalatorQuantity&&!isNaN(parseInt(formValue.EvaluateEscalatorQuantity)))
			formValue.EvaluateEscalatorQuantity = '0';
			
		if(formValue.LeadImportDemand)
			formValue.LeadImportDemand = 'Y';
		if(MapX!=null&&MapY!=null){
			Ext.getCmp('clueMapX').setValue(MapX);
			Ext.getCmp('clueMapY').setValue(MapY);
		}
		if(formValue.LeadMajorProjet)
			formValue.LeadMajorProjet = 'Y';
		
		var formValueModel = Ext.create('HelcAgent.model.OpportunityManagement.Agents.ClueDetailModel',formValue);
		//console.log(formValueModel);
		
		/*
		 * 公用注意
		 */
		if(Ext.getCmp('clueSelf').getData()){
			if(operation=='提交报备'){
				Ext.Msg.show({
					   title: '温馨提示',
					   message: '提交线索?',
					   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
					   fn: function(buttonId) {
						   if(buttonId == 'yes'){
							   obj.submitClue();
							   //obj.connectServer_queryOpportunity(getResult,params);
							   //window.setTimeout("Ext.Msg.alert('温馨提示','"+operation+"完成！');",100);
						   }
					   }
					});
				
			}else if(operation=='取消报备'){
				Ext.Msg.show({
					   title: '温馨提示',
					   message: '取消线索?',
					   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
					   fn: function(buttonId) {
						   if(buttonId == 'yes'){
							   obj.cancelClue();
							   //obj.connectServer_queryOpportunity(getResult,params);
							   //window.setTimeout("Ext.Msg.alert('温馨提示','"+operation+"完成！');",100);
						   }
					   }
					});
				
			};
			return ;
		};
		/**
		 * -------------------------------------
		 */
		
		//验证
		if(obj.execOperationYZ()){
			return;
		};
		
		if(MapX!=null&&MapY!=null){
			//alert(MapX+'-'+MapY);
			formValue.XHeight=MapX+'';
			formValue.YCoordinate=MapY+'';
		};
			
		if(!Ext.getCmp('clueSelf').getData()){
			if(!formValueModel.get('XHeight')){
				formValueModel.set('XHeight',MapX);
				formValueModel.set('YCoordinate',MapY);
				
			};
			/*if(!formValueModel.get('AccountId')||!formValueModel.get('AgentId')||!formValueModel.get('ProjectName')||!formValueModel.get('XHeight')||!formValueModel.get('YCoordinate')){
				Ext.Msg.alert('提示','请填写必要的信息后提交！');
				return;
			}*/
		};
		
		var param = {
				userID:userID,
				clueModel:formValue,
				fields:formValueModel.getFields().keys,
				ViewMode:'Organization',

		};
		cc.log('------------------------------param');
		console.log(param);
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
 				//prodName:'clueSynchronize',
 				prodName:'clueSynchronizeNew',
 				parameters: param,
 				obj:this
 				
		};
		
		//新建线索
		var getResult = function(result){
			if(!result.LeadSynchronize_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return;
			}else if(result.LeadSynchronize_Output.ErrorMsg){
				Ext.Msg.alert('提示',result.LeadSynchronize_Output.ErrorMsg);
				return;
			}else if(result.LeadSynchronize_Output.ListOfHelEaiAppLeadDetail.HelLead){
				obj.BackView();
				Ext.Msg.alert('提示','新建线索成功！');
				object.getApplication().getController('map.MapCtrl').PADMapXG=null;
			};
			//cc.log(result.LeadSynchronize_Output.ListOfHelEaiAppLeadDetail.HelLead);
			//cc.log(result.LeadSynchronize_Output.PrimaryRowId);
			//cc.log(result);
			var Id=result.LeadSynchronize_Output.PrimaryRowId;
			//后台偷偷做提交报备的功能
			var param = {
					userID:userID,
					clueId:Id
			};
			var invocationData={
					adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
				    procedure : 'submitClue',  //Adapter方法名
				    parameters : [param]	
			};
		
			try {
				WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					cc.log('提交报备返回结果:'+JSON.stringify(result));
				},  
				onFailure : function (result) {
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
			} catch (e) {
			};
			
		};
		
		Ext.Msg.show({
			title: '温馨提示',
			message: '新建线索?',
			buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			fn: function(buttonId) {
				if(buttonId == 'yes'){
					obj.connectServer_queryOpportunity(getResult,params);
					//window.setTimeout("Ext.Msg.alert('温馨提示','"+operation+"完成！');",100);
				};
			},
		});
		
	},
	
	//新建验证
	execOperationYZ:function(){
		var Flag=false;
		var IdData=['projectName','leadAccount','clueFinalUser','bCIImportAddress','cluePosition',
		            'opptyCategory','opptySubCategory','builderHeight','builderFloor','planVelevatorNum',
		            'planHelevatorNum','cluePredictSignYear','cluePredictSignMonth'];
		var NameData=['项目名称','线索客户','使用单位','线索地址','定位坐标',
		              '线索类型','线索子类型','建筑高度(m)','建筑层数','预估直梯台数',
		              '预估扶梯台数','预计签约年','预计签约月'];
		//线索状态 为默认，不需要判断
		for(var i=0;i<13;i++){
			var data=Ext.getCmp(IdData[i]).getValue();
			cc.log(data);
			if(data==null||data==''){
				Ext.Msg.alert('温馨提示','请输入'+NameData[i]+'!');
				Flag=true;
				break;
			};
		};
		return Flag;
	},

	
	//页面初始化时操作
	toInit:function(agentName,clue){
		cc.log('新建报备初始化传递的数值');
		cc.log(agentName);
		cc.log(clue);
		var agents = this.allAgents!=null?this.allAgents:[];
		cc.log('----------------------11');
		cc.log(agents);
		var options  = [];
		var total = 0;
		for(var i=0;i<agents.length;i++){
			var option = {text:agents[i].OpptyAgentName,value:agents[i].OpptyAgentName};
			options[total++] = option;
		}
		var select = Ext.getCmp('supplierName');
		select.setOptions(options);
		select.setValue(agents[0].OpptyAgentName);
		var opptyType= this.extractionData('HEL_OPPTY_CATEGORY');
		//var province = this.extractionData('HEL_PROVINCE');
		var clueAccountKAName = this.extractionData('HEL_BIGCUSTOMER');
		var agentPerformanceStatus = this.extractionData('HEL_AGENT_PERFORMANCE_STATUS');
		var r = [];
		var total = 1;
		r[0] = clue?{text:'',value:''}:{text:'请选择',value:''};
		
		for(var i=0;i<opptyType.length;i++){
			r[total++] = { text:opptyType[i].LIS_VAL,value:opptyType[i].LIS_VAL};
		}
		
		Ext.getCmp('opptyCategory').setOptions(r);
		
		r = [];
		total = 1;
		r[0] = clue?{text:'',value:''}:{text:'请选择',value:''};
		for(var i=0;i<clueAccountKAName.length;i++){
			r[total++] = { text:clueAccountKAName[i].LIS_VAL,value:clueAccountKAName[i].LIS_VAL};
		}
		Ext.getCmp('clueAccountKAName').setOptions(r);
		
		r = [];
		total  =1;
		r[0] = clue?{text:'',value:''}:{text:'请选择',value:''};
		for(var i=0;i<agentPerformanceStatus.length;i++){
			r[total++] = {text:agentPerformanceStatus[i].LIS_VAL,value:agentPerformanceStatus[i].LIS_VAL};
		}
		Ext.getCmp('supplierStatus').setOptions(r);
		
		
		Ext.getCmp('reportPerson').setPlaceHolder('当前用户');
		Ext.getCmp('reportPerson').setReadOnly(true);
		
		//坐标
		if(clue!=undefined){
			Ext.getCmp('cluePosition').setValue(clue.XHeight+','+clue.YCoordinate);
		};
		
		if(clue){
			Ext.getCmp('clueDealWithTime').setHidden(false);
			var correlationOppty = Ext.getCmp('correlationOppty');
			correlationOppty.setWidth('100%');
			Ext.getCmp('toCorrelationOppty').setHidden(true);
			//Ext.getCmp('correlationOpptyStatus').setHidden('100%');
			Ext.getCmp('clueFollower').setWidth('100%');
			
			Ext.getCmp('toClueFollwoer').setHidden(true);
			Ext.getCmp('clueStatus').setReadOnly(true);
			//Ext.getCmp('execOperation').setHidden(false);
			Ext.getCmp('supplierStatus').setReadOnly(true);
		}else{
			Ext.getCmp('reportPerson').setValue(usernames);
			Ext.getCmp('supplierStatus').setHidden(true);
			var clueStatus = Ext.getCmp('clueStatus');
			clueStatus.setValue('新建');
			clueStatus.setReadOnly(true);
			Ext.getCmp('clueSource').setValue('经销商');
			Ext.getCmp('correlationOppty').setHidden(true);
			Ext.getCmp('toCorrelationOppty').setHidden(true);
			Ext.getCmp('correlationOpptyStatus').setHidden(true);
			Ext.getCmp('clueFollower').setHidden(true);
			Ext.getCmp('toClueFollwoer').setHidden(true);
			var directorOppose = Ext.getCmp('directorOppose');
			directorOppose.setHidden(true);
		};	
		
	},
	
	
	//商机类型与子类型级联关系
	leadOpptySubTypeC:function(selectfield,newValue,oldValue,eOpts){
		var opptySubType = this.extractionData('HEL_OPPTY_SUB_CATEGORY');
		
		var total = 1;
		var r = [];
		r[0] = {text:'请选择',value:''};
		for(var i=0;i<opptySubType.length;i++){
			if(opptySubType[i].PAR_LIS_VAL==newValue)
				r[total++] = {text:opptySubType[i].LIS_VAL,value:opptySubType[i].LIS_VAL};
		}
		Ext.getCmp('opptySubType').setOptions(r);
	},
	//报备地址选择
	toStreetAddress:function(){
		this.NextView('installSitePanel','HelcAgent.view.OpportunityManagement.Project_New.InstallSiteView');
		this.getApplication().getController('HelcAgent.controller.OpportunityManagement.Project_New.InstallSiteCtrl').toInit('installSite');
		Ext.getCmp('installSiteComeSource').setValue('HelcAgent.controller.OpportunityManagement.Agents.ClueCreateAgentCtrl');
	},
	
	//省与市的级联关系
	leadCityC:function(selectfield,newValue,oldValue,eOpts){
		var city = this.extractionData('HEL_CITY');
		var province = this.extractionData('HEL_PROVINCE');
		
		var total = 1;
		var r = [];
		r[0] = {text:'请选择',value:''};
		for(var i=0;i<city.length;i++){
			if(city[i].PAR_LIS_VAL==newValue)
				r[total++] = {text:city[i].LIS_VAL,value:city[i].LIS_VAL};
		}
		//对区域做修改
		var area = Ext.getCmp('clueArea');
		Ext.getCmp('clueCity').setOptions(r);
		for(var j=0;j<province.length;j++){
			if(newValue==province[j].LIS_VAL){
				area.setValue(province[j].PAR_LIS_VAL);
				break;
			}
		}
		area.setReadOnly(true);
	},
	//市与区的级联关系
	leadDistrictC:function(selectfield,newValue,oldVAlue,eOpts){
		var District = this.extractionData('HEL_COUNTY');
		
		var total = 1;
		var r = [];
		r[0] = {text:'请选择',value:''};
		for(var i=0;i<District.length;i++){
			if(District[i].PAR_LIS_VAL==newValue)
				r[total++] = {text:District[i].LIS_VAL,value:District[i].LIS_VAL};
		}
		Ext.getCmp('clueDistrict').setOptions(r);
	}
	
});