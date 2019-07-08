Ext.define('HelcOA.controller.ReportPasswordCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'ReportPasswordCtrl_id',
	config:{
		control:{
			"button#ofSure_id":{
				tap:'init1'
			},
		}	
	},
	init1:function(){
		//oldPassword_id newPassword_id surePassword_id
		var obj1=Ext.getCmp('oldPassword_id');
		var oldpassword=obj1.getValue();
		var obj2=Ext.getCmp('newPassword_id');
		var newPassword=obj2.getValue();
		var obj3=Ext.getCmp('surePassword_id');
		var surePassword=obj3.getValue();
		console.log(oldpassword);
		console.log(newPassword);
		console.log(surePassword);
        if(newPassword!=surePassword){
        	alert('输入新密码不相同');
        }
	}
});