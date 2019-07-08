/**
 * XunshiSearchCtr
 */
Ext.define("Helcss.controller.XunshiSearchCtr", {
	extend : "Helcss.controller.ApplicationController", 
	config : {
		   refs : {  
			      xs_city_back:'button[id=xs_city_back]'
				  },
		control : {  
			xs_city_back:{
				        tap : 'xs_city_back', 
			},
 
		}
	},
	
 
	    xs_city_back : function() { 
		var main = Ext.getCmp('mainmenu');
		if(!main){
			main = Ext.create('Helcss.view.MainMenu');
		}
		Ext.Viewport.setActiveItem(main);
		
		var store = Ext.data.StoreManager.get("XsSeachStore");  
		store.setData([],this);   
		
		Ext.getCmp('xssearch').destroy();
	}
	
 
});