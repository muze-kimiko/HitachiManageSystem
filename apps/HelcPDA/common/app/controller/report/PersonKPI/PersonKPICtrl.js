Ext.define('HelcPDA.controller.report.PersonKPI.PersonKPICtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		control:{
			//作业人员业绩	公司页面	单击获取详细信息
			'list#li_PersonKPICompany':{
				itemtap:'li_PersonKPICompany'
			},
			
			//作业人员业绩	站页面	单击获取详细信息
			'list#li_PersonKPIStation':{
				itemtap:'li_PersonKPIStation'
			},
			
			//作业人员业绩	本、上月开关按钮
			'button#btn_switch_PersonKPIPerson':{
				tap:'btn_switch_PersonKPIPerson'
			},
			
			//作业人员业绩	公司页面 返回
			'button#btn_Back_PersonKPICompany':{
				tap:'btn_Back_PersonKPICompany'
			},
			
			//作业人员业绩	站页面	返回
			'button#btn_Back_PersonKPIStation':{
				tap:'btn_Back_PersonKPIStation'
			},
			
			//作业人员业绩	人员页面	返回
			'button#btn_Back_PersonKPIPerson':{
				tap:'btn_Back_PersonKPIPerson'
			},
		},
	},
	
	InitData:function(){
		console.log('InitData');
		console.log('HQFlag',HQFlag);
		console.log('company_code_1',company_code_1);
		console.log('station_id',station_id);
		console.log('position_type',position_type);
		if(HQFlag == 'Y'){//总部人员
			this.NextView('PersonKPICompany','HelcPDA.view.report.PersonKPI.PersonKPICompany');
			this.getCompanyData('1','');
		}else if(company_code_1 != '' && 
		(position_type.indexOf('工程部长') > -1 
		|| position_type.indexOf('维保部长') > -1
		|| position_type.indexOf('维保科长') > -1
		|| position_type.indexOf('司信息管理员') > -1
		|| position_type.indexOf('经理') > -1)){
			this.NextView('PersonKPICompany','HelcPDA.view.report.PersonKPI.PersonKPICompany');
			this.getCompanyData('1',company_code_1);
		}else if(company_code_1 != '' && station_id != '' && position_type.indexOf('站长') > -1 ){
			this.NextView('PersonKPIStation','HelcPDA.view.report.PersonKPI.PersonKPIStation');
			this.getStationData('1',company_code_1,station_id);
		}else{
			Ext.toast('您无权访问此数据！',2000);
		}
	},
	
	li_PersonKPICompany:function(obj, index, target, record, e, eOpts){
		this.NextView('PersonKPIStation','HelcPDA.view.report.PersonKPI.PersonKPIStation');
		this.getStationData('1',record.data.COMPANY_ID,'');
	},
	
	li_PersonKPIStation:function(obj, index, target, record, e, eOpts){
		this.NextView('PersonKPIPerson','HelcPDA.view.report.PersonKPI.PersonKPIPerson');
		Ext.getCmp('h_station_id_PersonKPIPerson').setValue(record.data.STATION_ID);
		this.getPersonData('1',record.data.STATION_ID);
	},
	
	getCompanyData:function(region,company_id){
		var data="{'region':'"+region+"','company_id':'"+company_id+"'}";
		
		function CallbackFunc(result,obj){
			console.log('result',result);
			Ext.getCmp('li_PersonKPICompany').getStore().setData([]);
			if(result.item.rows.length > 0){
				Ext.getCmp('li_PersonKPICompany').getStore().setData(result.item.rows);
			}
		};
		
		this.connectServerMainTain(CallbackFunc,this,"PersonKPIAction.do?method=getCompanyData",data);
	},
	
	getStationData:function(region,company_id,station_id){
		var data="{'region':'"+region+"','company_id':'"+company_id+"','station_id':'"+station_id+"'}";
		
		function CallbackFunc(result,obj){
			console.log('result',result);
			Ext.getCmp('li_PersonKPIStation').getStore().setData([]);
			if(result.item.rows.length > 0){
				Ext.getCmp('li_PersonKPIStation').getStore().setData(result.item.rows);
			}
		};
		
		this.connectServerMainTain(CallbackFunc,this,"PersonKPIAction.do?method=getStationData",data);
	},
	
	getPersonData:function(region,station_id){
		var data="{'region':'"+region+"','station_id':'"+station_id+"'}";
		
		function CallbackFunc(result,obj){
			console.log('result',result);
			Ext.getCmp('li_PersonKPIPerson').getStore().setData([]);
			if(result.item.rows.length > 0){
				Ext.getCmp('li_PersonKPIPerson').getStore().setData(result.item.rows);
			}
		};
		
		this.connectServerMainTain(CallbackFunc,this,"PersonKPIAction.do?method=getPersonData",data);
	},
	
	btn_switch_PersonKPIPerson:function(obj, e, eOpts){
		var _Region = Ext.getCmp('h_Region').getValue();
		if(_Region == '1'){
			Ext.getCmp('h_Region').setValue('0');
			Ext.getCmp('btn_switch_PersonKPIPerson').setText('本月');
			this.getPersonData('0',Ext.getCmp('h_station_id_PersonKPIPerson').getValue());
		}else{
			Ext.getCmp('h_Region').setValue('1');
			Ext.getCmp('btn_switch_PersonKPIPerson').setText('上月');
			this.getPersonData('1',Ext.getCmp('h_station_id_PersonKPIPerson').getValue());
		}
	},
	
	//作业人员业绩公司页面 返回
	btn_Back_PersonKPICompany:function(){
		Ext.getCmp('li_PersonKPICompany').getStore().setData([]);
		this.BackView();
	},
	
	//作业人员业绩站页面 返回
	btn_Back_PersonKPIStation:function(){
		Ext.getCmp('li_PersonKPIStation').getStore().setData([]);
		this.BackView();
	},
	
	//作业人员业绩页面 返回
	btn_Back_PersonKPIPerson:function(){
		Ext.getCmp('li_PersonKPIPerson').getStore().setData([]);
		this.BackView();
	},
});