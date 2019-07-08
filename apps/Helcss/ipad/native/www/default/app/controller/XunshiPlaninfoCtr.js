
/* JavaScript content from app/controller/XunshiPlaninfoCtr.js in folder common */
/**
 * XunshiPlaninfoCtr
 */
Ext.define("Helcss.controller.XunshiPlaninfoCtr", {
	extend : "Helcss.controller.ApplicationController", 
	config : {
		   refs : {  
			   xs_planinfo_back:'button[id=xs_planinfo_back]'
				  },
		control : {  
			xs_planinfo_back:{
				        tap : 'xs_planinfo_back', 
			},
 
		}
	},
	
   xs_planinfo_back : function() { 
		var main = Ext.getCmp('xsplanlist');
		if(!main){
			main = Ext.create('Helcss.view.XunshiPlanlistView');
		}
		Ext.Viewport.setActiveItem(main);
		
		Ext.getCmp('client').setValue(null);
        Ext.getCmp('ele_domain').setValue(null);
        Ext.getCmp('ele_site').setValue(null);
        Ext.getCmp('ele_tino').setValue(null);
        Ext.getCmp('ele_no').setValue(null);
        
        Ext.getCmp('ele_layer').setValue(null);
        Ext.getCmp('person_name1').setValue(null);
        Ext.getCmp('person_name2').setValue(null);
        Ext.getCmp('plan_start_dt').setValue(null);
        Ext.getCmp('plan_year').setValue(null);
        
        Ext.getCmp('plan_month').setValue(null);
        Ext.getCmp('plan_times').setValue(null); 
		
		Ext.getCmp('xunshiplaninfo').destroy();
	}
	
 
});