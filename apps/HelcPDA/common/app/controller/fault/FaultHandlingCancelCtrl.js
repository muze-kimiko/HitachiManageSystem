Ext.define('HelcPDA.controller.fault.FaultHandlingCancelCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//进入退单请求的事件
			FaultHandlingCancel:'button[id=faultHandlingCancel]',
			
		},
		control:{
			FaultHandlingCancel:{
				tap:'FaultHandlingCancel'
			}
		},
	},

	FaultHandlingCancel : function(){
		this.NextView('FaultHandlingCancelPanel','HelcPDA.view.fault.FaultHandlingCancelPanel');
		Ext.Viewport.removeMenu('right');
		
		var SR_NUMBER = Ext.getCmp("SR_NUMBER").getValue();
	  	var content="{'SR_NUMBER':'"+SR_NUMBER+"'}";
	
	  	var getResult=function(res){
	  		var str=res.rows[0];
	  		if(res.rows.length!=0){
	  			Ext.getCmp('FHC_SR_NUMBER').setValue(str.SR_NUMBER);
		  		Ext.getCmp('FHC_MAINTAIN_FLAG').setValue(str.MAINTAIN_FLAG);
		  		Ext.getCmp('FHC_BRAND_FLAG').setValue(str.BRAND_FLAG);
		  		Ext.getCmp('FHC_REASON').setValue(str.REASON);
		  		Ext.getCmp('comit_handlingCancel').setDisabled(true);
	  		}
	  		
	  		var SR_NUMBER = Ext.getCmp("SR_NUMBER").getValue();
	  		Ext.getCmp('FHC_SR_NUMBER').setValue(SR_NUMBER);
	  	};
	  	this.connectServer(getResult, 'fuwuqingqiuluruAction.do?method=Search_Cancel', content);
	  
	},
});