Ext.define('HelcOA.controller.ForApprovalProcess.BusinessService.nonstandardWorkCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'qc_nonstandardWorkCtrl_id',
	config:{
		control:{
//			//查找
//			"button#CheckMeetRoom":{
//				tap:'CheckMeetRoom'
//			},
		}
	},
	
	checkvalue10 : function() {
		if (Ext.getCmp('node').getValue()=="营分司处理方案") {
	        //if (frm.newmeasure_textarea.value=="" || frm.phone3.value=="") {
	        if ( Ext.getCmp('phone3').getValue()=="") {
	            Ext.Msg.alert("请输入处理方案信息");
				WL.Toast.show("请输入处理方案信息");
	            //frm.newmeasure_textarea.style.background='#e8e8e8';
	            Ext.getCmp('phone3').setRequired(true);
	            Ext.getCmp('newmeasure_textarea').focus();
	            return false;
	        }
	    }
		return true;
	}
	
	
});