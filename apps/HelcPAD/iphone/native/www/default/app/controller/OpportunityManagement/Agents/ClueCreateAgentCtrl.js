
/* JavaScript content from app/controller/OpportunityManagement/Agents/ClueCreateAgentCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Agents.ClueCreateAgentCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
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
			'button#toStreetAddress':{
				tap:'toStreetAddress'
			},
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
			
			
		}
	},
	

	
	//作为获取人员所在组织的公共方法
	mainCarousel:function(id){
		
		
		var obj = this;
		var allAgentName = [];
		var allAgentNameStatement = "EXISTS([Position.Login Name] = '"+userID+"')";//"([Account.Name] like '**') AND [Account.Account Status]='有效' AND  [Account.Type]  ='属下网点' and (([Account.Internal Org Flag] &lt;&gt; 'Y' or [Account.Partner Flag] &lt;&gt; 'N') AND [Account.Account Flag] &lt;&gt; 'N')";
		
		var param = {
				SearchSpec:allAgentNameStatement,
				ViewMode:'All',
				userID:id,
		};

		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'salesRepQuery',
				parameters:param,
				special:true
		};
		
		var getResult = function(result){
			console.log(result);
			if(!result.QuerySalesRep_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				obj.BackView();
				return ;
			}else if(result.QuerySalesRep_Output.NumOutputObjects=='1'){
				allAgentName.push(result.QuerySalesRep_Output.ListOfPositionInterface.Position);
			}else if(result.QuerySalesRep_Output.NumOutputObjects=='0'){
				Ext.Msg.alert('提示','服务器端繁忙，请继续操作！');
				return ;
			}else{
				allAgentName = result.QuerySalesRep_Output.ListOfPositionInterface.Position;
			}
			obj.allAgents = allAgentName;
			cc.log('所在组织--------');
			cc.log(obj.allAgents);
			//console.clear();
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
		
		 this.NextView('map_id','HelcPAD.view.map.Map');
		 if(clueSelf){
			MapX=clueSelf.XHeight;
			MapY=clueSelf.YCoordinate;
		 }
		this.getApplication().getController('map.MapCtrl').PADMapKJname='cluePosition';
		this.getApplication().getController('map.MapCtrl').MapCtrl_JRDT();
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
		this.NextView('HQSalesRepPanel','HelcPAD.view.OpportunityManagement.Project_New.HQSalesRepView');
		this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.HQSalesRepCtrl').source = 'clueFollower';
		this.getStore('HQSalesRepStore','HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore').removeAll();
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
		this.NextView('customerSelect','HelcPAD.view.OpportunityManagement.Project_New.CustomerSelectView');
		Ext.getCmp('comeSource').setValue('HelcPAD.controller.OpportunityManagement.Agents.ClueCreateAgentCtrl');
		Ext.Msg.alert('提示','查询结果后点击每项即可选中，勾选可使用选中删除！');
	},
	//返回按钮
	clueCreateBack:function(){
		this.BackView();
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
			if(!result.SubmitRegiste_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return;
			}else{
				Ext.Msg.alert('提示','提交报备完成！');
				obj.BackView();
				//obj.NextView('pdamain','HelcPAD.view.login.PADMain');
			}
				
		};
		
		this.connectServer_queryOpportunity(getResult,params);
	},
	//取消报备
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
				Ext.Msg.alert('提示',result.CancelRegiste_Output.ErrorMsg);
			}else{
				Ext.Msg.alert('提示','取消报备完成！');
				obj.NextView('pdamain','HelcAgent.view.login.PADMain');
			}
		};
		
		this.connectServer_queryOpportunity(getResult,params);
		
		
	},
	//执行操作
	execOperation:function(){
		var operation = Ext.getCmp('clueOperation').getValue();
		
		var obj = this;
		var formValue = Ext.getCmp('clueCreateAgent').getValues(false,false);
		
		//console.log(formValue);
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
		if(Ext.getCmp('clueSelf').getData()){
			if(operation=='提交报备'){
				Ext.Msg.show({
					   title: '温馨提示',
					   message: operation+'?',
					   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
					   fn: function(buttonId) {
						   if(buttonId == 'yes'){
							   obj.submitClue();
							   //obj.connectServer_queryOpportunity(getResult,params);
							   //window.setTimeout("Ext.Msg.alert('温馨提示','"+operation+"完成！');",100);
						   }
					   }
					});
				
				return ;
			}else if(operation=='取消报备'){
				Ext.Msg.show({
					   title: '温馨提示',
					   message: operation+'?',
					   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
					   fn: function(buttonId) {
						   if(buttonId == 'yes'){
							   obj.cancelClue();
							   //obj.connectServer_queryOpportunity(getResult,params);
							   //window.setTimeout("Ext.Msg.alert('温馨提示','"+operation+"完成！');",100);
						   }
					   }
					});
				
				return;
			}
		}	
		
		if(MapX!=null&&MapY!=null){
			//alert(MapX+'-'+MapY);
			formValueModel.set('XHeight',MapX+'');
			formValueModel.set('YCoordinate',MapY+'');
		}
		if(!Ext.getCmp('clueSelf').getData()){
			if(!formValueModel.get('AccountId')||!formValueModel.get('AgentId')||!formValueModel.get('ProjectName')||!formValueModel.get('XHeight')||!formValueModel.get('YCoordinate')){
				Ext.Msg.alert('提示','请填写必要的信息后提交！');
				return;
			}
		}
		
		var param = {
				userID:userID,
				clueModel:formValue,
				fields:formValueModel.getFields().keys,
				ViewMode:'Organization',

		};
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
 				prodName:'clueSynchronize',
 				parameters: param,
 				obj:this
 				
		};
		
		var getResult = function(result){
			if(!result.LeadSynchronize_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return;
			}else if(result.LeadSynchronize_Output.ListOfHelEaiAppLeadDetail.HelLead){
				obj.BackView();
				Ext.Msg.alert('提示',operation+'成功！');
			}
			
		};
		
		Ext.Msg.show({
			   title: '温馨提示',
			   message: operation+'?',
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
					   
					   obj.connectServer_queryOpportunity(getResult,params);
					   //window.setTimeout("Ext.Msg.alert('温馨提示','"+operation+"完成！');",100);
				   }
			   }
			});
		
	},
	//页面初始化时操作
	toInit:function(agentName,clue){
		
		var agents = this.allAgents!=null?this.allAgents:[];

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
		r[0] = {text:'请选择',value:''};
		
		for(var i=0;i<opptyType.length;i++){
			r[total++] = { text:opptyType[i].LIS_VAL,value:opptyType[i].LIS_VAL};
		}
		
		Ext.getCmp('opptyCategory').setOptions(r);
		
		r = [];
		total = 1;
		r[0] = {text:'请选择',value:''};
		for(var i=0;i<clueAccountKAName.length;i++){
			r[total++] = { text:clueAccountKAName[i].LIS_VAL,value:clueAccountKAName[i].LIS_VAL};
		}
		Ext.getCmp('clueAccountKAName').setOptions(r);
		
		r = [];
		total  =1;
		r[0] = {text:'请选择',value:''};
		for(var i=0;i<agentPerformanceStatus.length;i++){
			r[total++] = {text:agentPerformanceStatus[i].LIS_VAL,value:agentPerformanceStatus[i].LIS_VAL};
		}
		Ext.getCmp('supplierStatus').setOptions(r);
		
		
		Ext.getCmp('reportPerson').setPlaceHolder('当前用户');
		Ext.getCmp('reportPerson').setReadOnly(true);
		
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
			Ext.getCmp('clueSource').setValue('代理商');
			Ext.getCmp('correlationOppty').setHidden(true);
			Ext.getCmp('toCorrelationOppty').setHidden(true);
			Ext.getCmp('correlationOpptyStatus').setHidden(true);
			Ext.getCmp('clueFollower').setHidden(true);
			Ext.getCmp('toClueFollwoer').setHidden(true);
			var directorOppose = Ext.getCmp('directorOppose');
			directorOppose.setHidden(true);
		}	
		
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
		this.NextView('installSitePanel','HelcPAD.view.OpportunityManagement.Project_New.InstallSiteView');
		this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.InstallSiteCtrl').toInit('installSite');
		Ext.getCmp('installSiteComeSource').setValue('HelcPAD.controller.OpportunityManagement.Agents.ClueCreateAgentCtrl');
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