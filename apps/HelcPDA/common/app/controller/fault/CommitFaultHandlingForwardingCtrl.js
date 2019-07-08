Ext.define('HelcPDA.controller.fault.CommitFaultHandlingForwardingCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//提交转派的事件
			FHFW_commit:'button[id=FHFW_commit]',
			
		},
		control:{
			FHFW_commit:{
				tap:'FHFW_commit'
			}
		},
	},

	FHFW_commit : function(){
 		
		var USERID = person_id;
		var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue();
		var DISPLACE_PERSON_ID=Ext.getCmp("person").getValue();
		var STATION_ID=Ext.getCmp("FHF_STATION_ID").getValue();
		if(DISPLACE_PERSON_ID == "" || DISPLACE_PERSON_ID==null){
			alert("请先选择派工人员");
			WL.Toast.show("请先选择派工人员");
			return
		}
		if(typeof(STATION_ID)=="undefined"){
			STATION_ID="";
		}
		

	  	var content="{'ACTIVITY_ID':'"+ACTIVITY_ID+"'," +
	  			"'USERID':'"+USERID+"'," +
	  			"'DISPLACE_PERSON_ID':'"+DISPLACE_PERSON_ID+"'," +
	  			"'STATION_ID':'"+STATION_ID+"'}";
	
	  	var getResult=function(res){
	 		var str=res.msginfo;
//	 		Ext.Msg.alert(str);
	 		WL.Toast.show(str);
	 	};
	  	
	  	this.connectServer(getResult, 'zhuanPaiAction.do?method=toAdd', content);
	  
	},
});