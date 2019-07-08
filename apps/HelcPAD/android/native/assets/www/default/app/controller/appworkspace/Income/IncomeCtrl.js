
/* JavaScript content from app/controller/appworkspace/Income/IncomeCtrl.js in folder common */
/**
 * 列表页面
 */
Ext.define('HelcPAD.controller.appworkspace.Income.IncomeCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			'button#btn_ContractSearchForIncomeId':{
				tap:'toContractSearchForIncomeId',
			 },
				 
			 //合同资料页面  返回按钮
			 'button#btn_ContractListForIncome_two':{
				 	tap:'toContractListForIncome',
			 },
				 
			 //收款款项明细信息页面  返回按钮
			 'button#btn_BackIncomeList':{
				 	tap:'toBackIncomeList',
			 },
				 
			 'list#ContractListForIncomeNews':{
				 itemtap:'toContractListForIncomeNews',
			 },
			 
			 //收款款项明细信息页面  list
			 'list#IncomeListId_list':{
				 itemtap:'IncomeListId_list',
			 },
			 
			 'button#btn_IncomeList':{
				 	tap:'toIncomeList',
			 },
			 
			 'button#btn_IncomeSplit':{
				 tap:'toIncomeSplit',
			 },
		}	
	},
	
	toContractSearchForIncomeId: function(obj, e, eOpts ) {
		this.NextView('IncomeListId','HelcPAD.view.appworkspace.Income.IncomeList');
		//获取工号和合同号
		var hetonghao=Ext.getCmp('hetonghao').getValue();		
		var gonghao=Ext.getCmp('gonghao').getValue();
		var e=[];
		e[0]={name:hetonghao,com:gonghao};
		var IncomeStore = Ext.data.StoreManager.get('IncomeStore');
		IncomeStore.setData(e);
	},
	
	////合同资料页面  返回按钮
	toContractListForIncome: function(obj, e, eOpts ) {
		this.showBackView('IncomeListId','HelcPAD.view.appworkspace.Income.IncomeList');
	},
	
	//收款款项明细信息页面  返回按钮
	toBackIncomeList: function(obj, e, eOpts ) {
		this.showBackView('ContractSearchForIncomeId','HelcPAD.view.appworkspace.Income.ContractSearchForIncome');
	},
	
	
	//收款款项明细信息页面  list
	IncomeListId_list:function(obj,index,target,record,e,eOpts){
		if(event.target.id!='conkung_conlist'){
			this.NextView('ContractListForIncomeId','HelcPAD.view.appworkspace.Income.ContractListForIncome');
		}else{
			var sele=document.getElementsByName('groupkung_conlist');
			var checkbox = sele[index];
			 if(checkbox.style.color==''){
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(204, 204, 204)'){
	    		  //是未选中的情况下
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(224, 58, 62)'){
	    		//是选中的情况下
	    		  checkbox.style.color='#ccc';
	    	  };
		};
	},
	
	toContractListForIncomeNews: function(obj, e, eOpts ) {
	},
	
	toIncomeList: function(obj, e, eOpts ) {
		this.NextView('IncomeSplitId','HelcPAD.view.appworkspace.Income.IncomeSplit');
	},
	
	toIncomeSplit: function(obj, e, eOpts ) {
		this.NextView('IncomeListId','HelcPAD.view.appworkspace.Income.IncomeList');
	}
});	



