Ext.define('HelcPDA.controller.fault.CommitFaultHandlingFallbackCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//提交退单请求的事件
			ComitFallback:'button[id=comit_fallback]',
			BackDetail:'button[id=back_detail]',
			
		},
		control:{
			ComitFallback:{
				tap:'ComitFallback'
			},
			BackDetail:{
				tap:'BackDetail'
			}
		},
	},

	BackDetail : function(){
//		this.showBackView('FaultFHDP','HelcPDA.view.fault.FaultHandlingDetailPanel');
		MainCtr.BackView();
	},
	
	ComitFallback : function(){
 		  
		var ACTIVITY_ID=Ext.getCmp("ACTIVITYID").getValue();
		var RETRUN_ACTION_REASON=Ext.getCmp("RETRUN_ACTION_REASON").getValue();
		var RETRUN_ACTION_REASON_DETAIL=Ext.getCmp("RETRUN_ACTION_REASON_DETAIL").getValue();
		var BRAND_FLAG=Ext.getCmp("BRAND_FLAG").getValue();
		var MAINTAIN_FLAG=Ext.getCmp("MAINTAIN_FLAG").getValue();
		
	 	var content="{'ACTIVITY_ID':'"+ACTIVITY_ID+"'," +
			"'RETRUN_ACTION_REASON':'"+RETRUN_ACTION_REASON+"'," +
			"'RETRUN_ACTION_REASON_DETAIL':'"+RETRUN_ACTION_REASON_DETAIL+"'," +
			"'BRAND_FLAG':'"+BRAND_FLAG+"'," +
			"'MAINTAIN_FLAG':'"+MAINTAIN_FLAG+"'}";
	 
	 	var getResult=function(res){
	 		var str=res.msginfo;
	 		WL.Toast.show(str);
	 	}
	 	
	  	this.connectServer(getResult, 'tuidanAction.do?method=PDA3_toAdd', content);
	  
	},
});