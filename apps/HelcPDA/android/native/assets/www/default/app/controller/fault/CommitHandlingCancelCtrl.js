
/* JavaScript content from app/controller/fault/CommitHandlingCancelCtrl.js in folder common */
Ext.define('HelcPDA.controller.fault.CommitHandlingCancelCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//提交退单请求的事件
			ComitHandlingCancel:'button[id=comit_handlingCancel]',
			
		},
		control:{
			ComitHandlingCancel:{
				tap:'ComitHandlingCancel'
			}
		},
	},

	ComitHandlingCancel : function(){
 		
		 var SERVICE_REQUEST_SOURCE=Ext.getCmp('SERVICE_REQUEST_SOURCE').getValue();
	        if(SERVICE_REQUEST_SOURCE!='PDA'){
	        	WL.Toast.show('不能取消.请联系总部取消.');
	        	return;
	        }
		var USERID = person_id;
		var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue();
		var SR_NUMBER=Ext.getCmp("FHC_SR_NUMBER").getValue();
		var REASON=Ext.getCmp("FHC_REASON").getValue();
		var BRAND_FLAG=Ext.getCmp("FHC_BRAND_FLAG").getValue();
		var MAINTAIN_FLAG=Ext.getCmp("FHC_MAINTAIN_FLAG").getValue();

	  	var content="{'ACTIVITY_ID':'"+ACTIVITY_ID+"'," +
	  			"'USERID':'"+USERID+"'," +
	  			"'SR_NUMBER':'"+SR_NUMBER+"'," +
	  			"'REASON':'"+REASON+"'," +
	  			"'BRAND_FLAG':'"+BRAND_FLAG+"'," +
	  			"'MAINTAIN_FLAG':'"+MAINTAIN_FLAG+"'}";
	
	  	var getResult=function(res){
	 		var str=res.msginfo;
	 		WL.Toast.show(str);
	 	}
	  	
	  	this.connectServer(getResult, 'fuwuqingqiuluruAction.do?method=PDA3_toCancel', content);
	  
	},
});