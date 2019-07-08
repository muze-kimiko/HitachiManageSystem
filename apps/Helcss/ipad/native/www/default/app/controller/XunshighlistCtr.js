
/* JavaScript content from app/controller/XunshighlistCtr.js in folder common */
/**
 * XunshighlistCtr
 */
Ext.define("Helcss.controller.XunshighlistCtr", {
	extend : "Helcss.controller.ApplicationController", 
	config : {
		   refs : {  
			       xs_ghlist_back:'button[id=xs_ghlist_back]',
			       xs_ghlist_topback:'button[id=xs_ghlist_topback]'
				  },
		control : {  
			xs_ghlist_back:{
				        tap : 'xs_ghlist_back', 
			},
			xs_ghlist_topback:{
				        tap : 'xs_ghlist_topback', 
			}
 
		}
	},
	
	xs_ghlist_back : function() { 
		var main = Ext.getCmp('xsdomain');
		if(!main){
			main = Ext.create('Helcss.view.XunshidomainView');
		}
		Ext.Viewport.setActiveItem(main); 
		
		var store = Ext.data.StoreManager.get("Xs_ghlistStore");  
		store.setData([],this);   
		
		clearInterval(stopxs_Interval);
		stopxs_Interval=undefined;
		Ext.getCmp('xsghlist').destroy();
	},
	
	xs_ghlist_topback : function() { 
		var main = Ext.getCmp('mainmenu');
		if(!main){
			main = Ext.create('Helcss.view.MainMenu');
		}
		Ext.Viewport.setActiveItem(main); 
		
		//地盘
		var domainstore = Ext.data.StoreManager.get("XunshidomainStore");  
		domainstore.setData([],this);  
		Ext.getCmp('xsdomain').destroy();
		
		//城市
		var citystore = Ext.data.StoreManager.get("XsSeachStore");  
		citystore.setData([],this);    
		Ext.getCmp('xssearch').destroy();
		
		//工号列表
		var store = Ext.data.StoreManager.get("Xs_ghlistStore");  
		store.setData([],this);   
		
		clearInterval(stopxs_Interval);
		stopxs_Interval=undefined;
		Ext.getCmp('xsghlist').destroy();
	}
	
 
});