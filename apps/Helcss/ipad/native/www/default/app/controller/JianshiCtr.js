
/* JavaScript content from app/controller/JianshiCtr.js in folder common */
/**
 * JianshiCtr
 */
Ext.define("Helcss.controller.JianshiCtr", {
	extend : "Helcss.controller.ApplicationController", 
	config : {
		   refs : {  
			       js_back:'button[id=js_back]'
				  },
		control : {  
			js_back:{
				tap : 'js_back'
			}
 
		}
	},
	
 
	js_back : function() { 
		var main = Ext.getCmp('mainmenu');
		if(!main){
			main = Ext.create('Helcss.view.MainMenu');
		}
		Ext.Viewport.setActiveItem(main);
		
		//清除 store 数据
		  var gzstore = Ext.data.StoreManager.get("JsStore"); 
		  var bystore = Ext.data.StoreManager.get("JS_baoyang_Store");
		  gzstore.setData([],this);   
		  bystore.setData([],this);   
		
//		console.log('监视Ctr stopjs_Interval：'+stopjs_Interval);  
		clearInterval(stopjs_Interval);
		stopjs_Interval=undefined;
		Ext.getCmp('jianshiList').destroy();
	} 

});