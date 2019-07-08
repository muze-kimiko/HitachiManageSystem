
/* JavaScript content from app/controller/OpportunityManagement/Project_New/InstallSiteCtrl.js in folder common */
Ext.define('HelcAgent.controller.OpportunityManagement.Project_New.InstallSiteCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	config:{
		//该控制器被安装地点查询与安装定点新建公用
		control:{
			//返回按钮
			'button#installSiteBack':{
				tap:'installSiteBack'
			},
			//新建界面返回
			'button#installSiteBuildBack':{
				tap:'installSiteBack'
			},
			//查询安装地点
			'button#installSiteQuery':{
				tap:'installSiteQuery'
			},
			//省变化更新市
			'selectfield#installSiteProvince':{
				change:'leadInstallSiteCity'
			},
			'selectfield#installSiteBuildProvince':{
				change:'leadInstallSiteCity'
			},
			//市变化更新区
			'selectfield#installSiteCity':{
				change:'leadInstallSiteCounty'
			},
			'selectfield#installSiteBuildCity':{
				change:'leadInstallSiteCounty'
			},
			//列表单击
			'list#installSiteList':{
				itemtap:'installSiteList'
			},
			//跳至安装地新建按钮
			'button#toInstallSiteBuild':{
				tap:'toInstallSiteBuild'
			},
			//安装地点新建
			'button#installSiteBuildBtn':{
				tap:'installSiteBuildBtn'
			},
			//区域变化更新省
			'selectfield#installSiteProjectArea':{
				change:'leadProvinceChange'
			},
			'selectfield#installSiteBuildProjectArea':{
				change:'leadProvinceChange'
			}
			
		}
	},
	//返回按钮
	installSiteBack:function(){
		this.BackView();
	},
	//查询安装地点
	installSiteQuery:function(){
		
		var installSiteCountry = Ext.getCmp('installSiteCountry').getValue();
		var installSiteProvince = Ext.getCmp('installSiteProvince').getValue();
		var installSiteCity = Ext.getCmp('installSiteCity').getValue();
		var installSiteCounty = Ext.getCmp('installSiteCounty').getValue();
		var installSiteProjectArea = Ext.getCmp('installSiteProjectArea').getValue();
		var installSiteAddress = Ext.getCmp('installSiteAddress').getValue();
		
		if(installSiteAddress)
			installSiteAddress = installSiteAddress.trim();
		
		var installSite = {
				address:installSiteAddress,
				city:installSiteCity,
				country:installSiteCountry,
				county:installSiteCounty,
				province:installSiteProvince.province,
				project_Area:installSiteProjectArea,
				userID:userID
		};
		
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'queryOpptyInstallSite',
				parameters: installSite
		};
		
		var getResult = function(result){
			if(result.Fault){
				Ext.Msg.alert('提示信息','您选择的范围过于广泛，请细化选择的地址信息');
				return ;
			}
			var data = result.OpptyInsSitQuery_Output.ListOfHelEaiAppOpportunityInstallSite.HelInstallSite;
			var store = Ext.data.StoreManager.get('InstallSiteStore');
			if(!store)
				store = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.InstallSiteStore');
			
			if(result.OpptyInsSitQuery_Output.NumOutputObjects=='0'){
				Ext.Msg.alert('提示信息','无查询结果，请重新填写查询条件！');
			}else if(result.OpptyInsSitQuery_Output.NumOutputObjects=='1')
				store.setData([data]);
			else
				store.setData(data);
			Ext.getCmp('installSitePanel').setActiveItem(Ext.getCmp('installSiteListContainer'));
			
		};
		
		
		this.connectServer_queryOpportunity(getResult,params);
		
		
		
	},
	//区域变化更新省
	leadProvinceChange:function(selectField, newValue, oldValue, eOpts ){
		var installSiteProvince ;
		if(selectField.getId()=='installSiteProjectArea')
			installSiteProvince = Ext.getCmp('installSiteProvince');
		else
			installSiteProvince = Ext.getCmp('installSiteBuildProvince');
		
		var total = 1;
		var r = [];
		r[0] = {text:'请选择',value:''};
		for(var i=0;i<this.province.length;i++){
			if(this.province[i].PAR_LIS_VAL==newValue)
				r[total++] = {text:this.province[i].LIS_VAL,value:this.province[i].LIS_VAL};
		}
		installSiteProvince.setOptions(r);
	},
	//省变化更新市
	leadInstallSiteCity:function(selectField, newValue, oldValue, eOpts ){
		var installSiteCity ;
		if(selectField.getId()=='installSiteProvince')
			installSiteCity = Ext.getCmp('installSiteCity');
		else
			installSiteCity = Ext.getCmp('installSiteBuildCity'); 
		var city  = this.extractionData('HEL_CITY');
		var total = 1; 
		var r =[];
		r[0] = {text:'请选择',value:''};
		for(var i =0; i<city.length;i++){
			if(city[i].PAR_LIS_VAL==newValue){
				r[total] = {text:city[i].LIS_VAL,value:city[i].LIS_VAL};
				total++;
			}	
		}
		/*var area = [{}];
		var province =  this.extractionData('HEL_PROVINCE');
		for(var i =0; i<province.length;i++){
			if(province[i].LIS_VAL==newValue){
				area[0].text = province[i].PAR_LIS_VAL;
				area[0].value = province[i].PAR_LIS_VAL;
			}	
		}
		
		
		if(selectField.getId()=='installSiteProvince'){
			Ext.getCmp('installSiteProjectArea').setOptions(area);
			Ext.getCmp('installSiteProjectArea').setValue(area[0].value);
		}	
		else{
			Ext.getCmp('installSiteBuildProjectArea').setOptions(area);
			Ext.getCmp('installSiteBuildProjectArea').setValue(area[0].value);
		}*/
		installSiteCity.setOptions(r);
	},
	//市变化更新区
	leadInstallSiteCounty:function(selectField, newValue, oldValue, eOpts ){
		var installSiteCounty ;
		if(selectField.getId()=='installSiteCity')
			installSiteCounty = Ext.getCmp('installSiteCounty');
		else
			installSiteCounty = Ext.getCmp('installSiteBuildCounty');
		var county = this.extractionData('HEL_COUNTY');
		var total = 1;
		var r = [];
		r[0] = {text:'请选择',value:''};
		for(var i=0;i<county.length;i++){
			if(county[i].PAR_LIS_VAL==newValue){
				r[total] = {text:county[i].LIS_VAL,value:county[i].LIS_VAL};
				total++;
			}
		}
		installSiteCounty.setOptions(r);
	},
	//列表单击
	installSiteList:function(list, index, target, record, e, eOpts ){
		if(event.target.id!='groupkung_installSiteanalysislist'){
			var installSite = record.raw;
			var installSiteComeSource = Ext.getCmp('installSiteComeSource').getValue();
			this.BackView();
			
			if(installSiteComeSource=='HelcAgent.controller.OpportunityManagement.Project_New.ProjectInfoCtrl'){
				Ext.getCmp('opptyInstallSite').setValue(installSite.HELAddress);
				Ext.getCmp('opptyInstallSiteObject').setData(installSite);
				Ext.getCmp('opptyInstallSiteId').setValue(installSite.Id);
				Ext.getCmp('siteState').setValue(installSite.HELProvince);
				Ext.getCmp('siteCity').setValue(installSite.HELCity);
				Ext.getCmp('siteCounty').setValue(installSite.HELCounty);
				
			}else if(installSiteComeSource=='HelcAgent.controller.OpportunityManagement.Project_New.ProjectSearchPrepareCtrl'){
				Ext.getCmp('setPlace').setValue(installSite.HELAddress);
			}else if(installSiteComeSource=='HelcAgent.controller.OpportunityManagement.Agents.ClueCreateAgentCtrl'){
				Ext.getCmp('clueProvince').setValue(installSite.HELProvince);
				Ext.getCmp('clueCity').setValue(installSite.HELCity);
				Ext.getCmp('clueDistrict').setValue(installSite.HELCounty);
				Ext.getCmp('projectAddress').setValue(installSite.HELAddress);
			}
		}else{
			var sele=document.getElementsByName('groupkung_installSiteanalysislist');
			var checkbox = sele[index];
			if(checkbox.style.color==''){
	    		  checkbox.style.color='#e03a3e';
	    	}else if(checkbox.style.color=='rgb(204, 204, 204)'){
	    		//是未选中的情况下
	    		checkbox.style.color='#e03a3e';
	    		 
	    	}else if(checkbox.style.color=='rgb(224, 58, 62)'){
	    		//是选中的情况下
	    		 checkbox.style.color='#ccc';
	    	}
			if(checkbox.style.color='#e03a3e'){
				for(var i=0;i<sele.length;i++){
	    			 if(i!=index){
	    				 sele[i].style.color = '#ccc';
	    			 }
	    		}
			}
		
		}
		
	},
	//安装地点新建
	installSiteBuildBtn:function(){
		var obj = this;
		
		var installSiteCountry = Ext.getCmp('installSiteBuildCountry').getValue();
		var installSiteProvince = Ext.getCmp('installSiteBuildProvince').getValue();
		var installSiteCity = Ext.getCmp('installSiteBuildCity').getValue();
		var installSiteCounty = Ext.getCmp('installSiteBuildCounty').getValue();
		var installSiteProjectArea = Ext.getCmp('installSiteBuildProjectArea').getValue();
		var installSiteAddress = Ext.getCmp('installSiteBuildAddress').getValue();
		

		Ext.Msg.show({
			   title: '温馨提示',
			   message: '是否新建安装地点？',
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
		    	 if(!installSiteCountry||!installSiteProvince||!installSiteCity||!installSiteCounty||!installSiteProjectArea||!installSiteAddress){
		 			Ext.Msg.alert('提示信息','请将地址信息填写完整再提交！');
		 			return ;
		 		}
		 		
		 		var installSite = {
		 				address:installSiteAddress,
		 				city:installSiteCity,
		 				country:installSiteCountry,
		 				county:installSiteCounty,
		 				province:installSiteProvince,
		 				project_Area:installSiteProjectArea,
		 				userID:userID
		 		};
		 		
		 		var params = {
		 				adpName:'HttpAdapter_PAD_Custom',
		 				prodName:'bulidOpptyInstallSite',
		 				parameters: installSite
		 		};
		 		
		 		var getResult = function(result){
		 			if(result.Fault){
		 				Ext.Msg.alert('提示信息','您填写的地址信息已存在！');
		 				return ;
		 			}
		 			if(!result.OpptyInsSitSynchronize_Output){
		 				Ext.Msg.alert('提示信息','服务器繁忙，请稍后重试！');
		 				return ;
		 			}
		 			obj.BackView();
		 			var HelInstallSite = result.OpptyInsSitSynchronize_Output.ListOfHelEaiAppOpportunityInstallSite.HelInstallSite;
		 			HelInstallSite.Id = result.OpptyInsSitSynchronize_Output.PrimaryRowId;
		 			var store = Ext.data.StoreManager.get('InstallSiteStore');
		 			if(!store)
		 				store = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.InstallSiteStore');
		 			
		 			store.setData([HelInstallSite]);
		 			Ext.getCmp('installSitePanel').setActiveItem(Ext.getCmp('installSiteListContainer'));
		 			
		 		};
		 		
		 		obj.connectServer_queryOpportunity(getResult,params);
		    	 
				   }
			   }
			});
		
		
	},
	//进入界面填充下拉列表值
	toInit:function(aim){
		//var installArea;
		var installSiteProvince ;
		if(aim=='installSite')
			installSiteProvince = Ext.getCmp('installSiteProvince');
		else
			installSiteProvince = Ext.getCmp('installSiteBuildProvince');
		
		var province =  this.extractionData('HEL_PROVINCE');
			
		var total = 0; 
		var r =[];
		//r[0] = {text:'请选择',value:''};
		for(var i =0; i<province.length;i++){
			if(province[i].PAR_LIS_VAL=='华南'||province[i].PAR_LIS_VAL=='华中'||province[i].PAR_LIS_VAL=='华北'||province[i].PAR_LIS_VAL=='华东'||province[i].PAR_LIS_VAL=='东北'||province[i].PAR_LIS_VAL=='西北'||province[i].PAR_LIS_VAL=='西南')
				r[total++] = province[i];//{text:province[i].LIS_VAL,value:province[i].LIS_VAL};
		}
		if(installSiteProvince)
			this.province = r;
		//installSiteProvince.setOptions(r);
	},
	//安装地新建
	toInstallSiteBuild:function(){
		this.NextView('installSiteBuildPanel','HelcAgent.view.OpportunityManagement.Project_New.InstallSiteBuildView');
		this.toInit('installSiteBuild');
	}
	
});