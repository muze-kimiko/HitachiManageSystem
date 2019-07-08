Ext.define('HelcPDA.controller.fault.FaultHandlingFallbackCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//进入退单请求的事件
			FaultHandlingFallback:'button[id=faultHandlingFallback]',
			
		},
		control:{
			FaultHandlingFallback:{
				tap:'FaultHandlingFallback'
			}
		},
	},

	FaultHandlingFallback : function(){
        //zhj 退单提示
        var IS_CHARGEBACK =Ext.getCmp("IS_CHARGEBACK").getValue();
       // alert("IS_CHARGEBACK"+IS_CHARGEBACK);
        if(IS_CHARGEBACK=="1"){
        	WL.Toast.show("再调查的单不能退单！");
        	return;
        }
		this.NextView('FaultHandlingFallbackPanel','HelcPDA.view.fault.FaultHandlingFallbackPanel');
        Ext.Viewport.removeMenu('right');
	 	var ACTIVITY_ID=Ext.getCmp("ACTIVITYID").getValue(); 
	  	var content="{'ACTIVITY_ID':'"+ACTIVITY_ID+"'}";
	
	  	var getResult=function(res){
	  		var str=res.rows[0];
	  		
//	  		Ext.getCmp('ACTIVITY_ID').setValue(str.ACTIVITY_ID);
	  		Ext.getCmp('RETRUN_ACTION_REASON').setValue(str.RETRUN_ACTION_REASON);
	  		Ext.getCmp('BRAND_FLAG').setValue(str.BRAND_FLAG);
	  		Ext.getCmp('MAINTAIN_FLAG').setValue(str.MAINTAIN_FLAG);
	  		Ext.getCmp('RETRUN_ACTION_REASON_DETAIL').setValue(str.RETRUN_ACTION_REASON_DETAIL);
	  		
	  	};
	  	this.connectServer(getResult, 'tuidanAction.do?method=toSearchFaultHandling', content);
	  
	},
});