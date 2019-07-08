Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.InstallSiteCompanyCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回
			'button#installSiteCompanySelect_back':{
				tap:'installSiteCompanySelect_back'
			},
			//查询分公司
			'button#companyQuery':{
				tap:'companyQuery'
			},
			//选择省后填充新的市
			'selectfield#companyProvince':{
				change:'leadCompanyCity'
			},
			//选择市后填充区/县
			'selectfield#companyCity':{
				change:'leadCompanyCounty'
			},
			//单击列表选项
			'list#companyList':{
				itemtap:'companyList'
			},
			//确认选择分公司
			'button#confirmCompany':{
				tap:'confirmCompany'
			}

		}
	},
	//返回
	installSiteCompanySelect_back:function(){
		this.BackView();
	},
	//查询分公司
	companyQuery:function(){
		var partyId = Ext.getCmp('partyId').getValue().trim();
		var companyName = Ext.getCmp('companyName').getValue().trim();
		var parentOrganizationName = Ext.getCmp('parentOrganizationName').getValue().trim();
		var companyType = Ext.getCmp('companyType').getValue().trim();
		var companyProvince = Ext.getCmp('companyProvince').getValue().trim();
		var companyCity = Ext.getCmp('companyCity').getValue().trim();
		var companyCounty = Ext.getCmp('companyCounty').getValue().trim();
		
		var statement = '';
		if(!this.isEmptyOrNull(partyId))
			statement += "[Organization.Party Id] = '"+partyId+"'";
		if(!this.isEmptyOrNull(companyName)&&!this.isEmptyOrNull(statement))
			statement += "and  [Organization.Name] like '*"+companyName+"*'";
		else if(!this.isEmptyOrNull(companyName)&&this.isEmptyOrNull(statement))
			statement += "[Organization.Name] like '*"+companyName+"*'";
		if(!this.isEmptyOrNull(parentOrganizationName)&&!this.isEmptyOrNull(statement))
			statement += "and  [Organization.Parent Organization Name] like '*"+parentOrganizationName+"*'";
		else if(!this.isEmptyOrNull(parentOrganizationName)&&this.isEmptyOrNull(statement))
			statement += "[Organization.Parent Organization Name] like '*"+parentOrganizationName+"*'";
		if(!this.isEmptyOrNull(companyType)&&!this.isEmptyOrNull(statement))
			statement += "and [Organization.Type] = '"+companyType+"'";
		else if(!this.isEmptyOrNull(companyType)&&this.isEmptyOrNull(statement))
			statement += "[Organization.Type] = '"+companyType+"'";
		if(!this.isEmptyOrNull(companyProvince)&&!this.isEmptyOrNull(statement))
			statement += " and [Organization.Province] = '"+companyProvince+"'";
		else if(!this.isEmptyOrNull(companyProvince)&&this.isEmptyOrNull(statement))
			statement += " [Organization.Province] = '"+companyProvince+"'";
		if(!this.isEmptyOrNull(companyCity)&&!this.isEmptyOrNull(statement))
			statement += "and [Organization.City] = '"+companyCity+"'";
		else if(!this.isEmptyOrNull(companyCity)&&this.isEmptyOrNull(statement))
			statement += " [Organization.City] = '"+companyCity+"'";
		if(!this.isEmptyOrNull(companyCounty)&&!this.isEmptyOrNull(statement))
			statement += " and  [Organization.County] = '"+companyCounty+"'";
		else if(!this.isEmptyOrNull(companyCounty)&&this.isEmptyOrNull(statement))
			statement += " [Organization.County] = '"+companyCounty+"'";

		//[Organization.Party Id] = '1-KO1VE'  and  [Organization.Name] like '*汕头*' and  [Organization.Parent Organization Name] like '*营业工程总部*' and [Organization.Type] = '一级分公司' and [Organization.Province] = '广东' and [Organization.City] = '汕头市' and [Organization.County] = '' and [Organization.Internal Org Flag] = 'Y' AND [Organization.Organization Flag] = 'Y'
		statement += "and [Organization.Internal Org Flag] = 'Y' AND [Organization.Organization Flag] = 'Y'" ;
		console.log(statement);
		var param = {
				SearchSpec:statement,
				userID:userID
		};
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'queryCompany',
				parameters:param
		};
		
		var getResult = function(result){
			console.log(result);
			var companyStore = Ext.data.StoreManager.get('InstallSiteCompanyStore');
			if(result.QueryOpptyOrg_Output.NumOutputObjects=='0'){
				Ext.Msg.alert('查询提示','查询无结果，请重新输入或选择查询条件');
				return ;
			}
			else if(result.QueryOpptyOrg_Output.NumOutputObjects=='1')
				companyStore.setData([result.QueryOpptyOrg_Output.ListOfHelEaiAppOpportunityInstallCompany.Organization]);
			else
				companyStore.setData(result.QueryOpptyOrg_Output.ListOfHelEaiAppOpportunityInstallCompany.Organization);
			Ext.getCmp('installSiteCompanySelect').setActiveItem(Ext.getCmp('companyListContainer'));
				
		};
		this.connectServer_queryOpportunity(getResult,params);
		
		
	},
	//省变化更新市
	leadCompanyCity:function(selectField, newValue, oldValue, eOpts ){
		var companyCity = Ext.getCmp('companyCity');
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
		companyCity.setOptions(r);
	},
	//市变化更新区
	leadCompanyCounty:function(selectField, newValue, oldValue, eOpts ){
		var companyCounty = Ext.getCmp('companyCounty');
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
		companyCounty.setOptions(r);
	},
	//点击列表选项
	companyList:function( list, index, target, record, e, eOpts ){
		var company = record.data;
		console.log(company);
		this.BackView();
		var installSiteCompany = Ext.getCmp('installSiteCompany');
		var installSiteCompanyId = Ext.getCmp('installSiteCompanyId');
		installSiteCompany.setValue(company.Name);
		installSiteCompanyId.setValue(company.PartyId);

		/*if(event.target.id!='groupkung_companyanalysislist'){
		}else{
			var sele=document.getElementsByName('groupkung_companyanalysislist');
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
		};*/
		
	},
	//确认选择分公司
	confirmCompany:function(){
		var company = Ext.getCmp('companyList').getSelection();
		this.BackView();
		var installSiteCompany = Ext.getCmp('installSiteCompany');
		installSiteCompany.setValue(company[0].Name+":"+company[0].PartyId);
		Ext.getCmp('installSiteCompanyId').setValue();
		
	},
	//省级初始化
	toInit:function(){
		var companyProvince = Ext.getCmp('companyProvince');
		var province =  this.extractionData('HEL_PROVINCE');
		var total = 1; 
		var r =[];
		r[0] = {text:'请选择',value:''};
		for(var i =0; i<province.length;i++){
			if(province[i].PAR_LIS_VAL=='华南'||province[i].PAR_LIS_VAL=='华中'||province[i].PAR_LIS_VAL=='华北'||province[i].PAR_LIS_VAL=='华东'||province[i].PAR_LIS_VAL=='东北'||province[i].PAR_LIS_VAL=='西北'||province[i].PAR_LIS_VAL=='西南')
				r[total++] = {text:province[i].LIS_VAL,value:province[i].LIS_VAL};
			
		}
		
		companyProvince.setOptions(r);
	},
	isEmptyOrNull:function(value){
		if(value==''||value==undefined||value==null)
			return true;
		else
			return false;
	}
	
});