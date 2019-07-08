
/* JavaScript content from app/controller/XunshiPlanlistCtr.js in folder common */
/**
 * XunshiPlanlistCtr
 */
Ext.define("Helcss.controller.XunshiPlanlistCtr", {
	extend : "Helcss.controller.ApplicationController", 
	config : {
		   refs : {  
			      xs_planlist_back:'button[id=xs_planlist_back]'
				  },
		control : {  
			xs_planlist_back:{
				        tap : 'xs_planlist_back', 
			},
 
		}
	},
	
	xs_planlist_back : function() { 
		var main = Ext.getCmp('xsghlist');
		if(!main){
			main = Ext.create('Helcss.view.XunshighListView');
		}
		Ext.Viewport.setActiveItem(main);
		
		var store = Ext.data.StoreManager.get("XunshiPlanlistStore");  
		store.setData([],this);   
		
		Ext.getCmp('xsplanlist').destroy();
	}
	
 
});