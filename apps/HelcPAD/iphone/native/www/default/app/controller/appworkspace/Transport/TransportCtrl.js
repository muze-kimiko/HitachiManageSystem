
/* JavaScript content from app/controller/appworkspace/Transport/TransportCtrl.js in folder common */
/**
 * 列表页面
 */
Ext.define('HelcPAD.controller.appworkspace.Transport.TransportCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			'button#btn_TransportSearch':{
				tap:'toTransportSearch',
			 },
				 
			 'button#TransportListReturn':{
				 	tap:'TransportListReturn',
			 },
				 
			 'button#to_list':{
				 	tap:'to_list',
			 },
				 
			 'list#TransportListNews':{
				 itemtap:'toTransportListNews',
			 }
		}	
	},
	
	toTransportSearch: function(obj, e, eOpts ) {
		this.NextView('TransportListId','HelcPAD.view.appworkspace.Transport.TransportList');
		
		//获取工号和合同号
		var hetonghao=Ext.getCmp('hetonghao').getValue();		
		var gonghao=Ext.getCmp('gonghao').getValue();
		var b=[];
		b[0]={name:hetonghao,com:gonghao};
		var TransportStore = Ext.data.StoreManager.get('TransportStore');
		TransportStore.setData(b);
	},
	
	TransportListReturn: function(obj, e, eOpts ) {
		this.showBackView('TransportSearchId','HelcPAD.view.appworkspace.Transport.TransportSearch');
	},
	
	to_list: function(obj, e, eOpts ) {
		this.NextView('TransportListId','HelcPAD.view.appworkspace.Transport.TransportList');
	},
	
	toTransportListNews: function(obj, e, eOpts ) {
		this.NextView('TransportInfoId','HelcPAD.view.appworkspace.Transport.TransportInfo');
	}
});	



