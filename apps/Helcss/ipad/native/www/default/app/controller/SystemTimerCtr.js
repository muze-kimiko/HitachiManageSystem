
/* JavaScript content from app/controller/SystemTimerCtr.js in folder common */
/**
 * SystemTimerCtr
 */
Ext.define("Helcss.controller.SystemTimerCtr", {
	extend : "Helcss.controller.ApplicationController", 
	config : {
		   refs : {  
			   timer_back:'button[id=timer_back]'
				  },
		control : {  
			timer_back:{
				tap : 'timer_back' 
			}
 
		}
	},
	
 
	timer_back : function() { 
		var main = Ext.getCmp('mainmenu');
		if(!main){
			main = Ext.create('Helcss.view.MainMenu');
		}
		Ext.Viewport.setActiveItem(main);
		
		WL.EncryptedCache.read("SetTimer", onReadSuccess, onReadFailure);
	    function onReadSuccess(value){
	    	settime=value;
	    	 console.log('退出定时设置'+settime);
	    }
	    function onReadFailure(status){
		 	   console.log('退出定时设置失败'); 
		} 
		Ext.getCmp('systimer').destroy();
	} 

});