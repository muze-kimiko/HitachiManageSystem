
/* JavaScript content from app/controller/XunshidomainCtr.js in folder common */
/**
 * XunshidomainCtr
 */
Ext.define("Helcss.controller.XunshidomainCtr", {
	extend : "Helcss.controller.ApplicationController", 
	config : {
		   refs : {  
			       xs_domain_back:'button[id=xs_domain_back]'
				  },
		control : {  
			xs_domain_back:{
				        tap : 'xs_domain_back', 
			},
 
		}
	},
	
 
	    xs_domain_back : function() { 
		var main = Ext.getCmp('xssearch');
		if(!main){
			main = Ext.create('Helcss.view.XunshiSearchView');
		}
		Ext.Viewport.setActiveItem(main);
		
		var store = Ext.data.StoreManager.get("XunshidomainStore");  
		store.setData([],this);   
		
		Ext.getCmp('xsdomain').destroy();
	}
	
 
});