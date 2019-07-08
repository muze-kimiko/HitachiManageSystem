
/* JavaScript content from app/controller/more/UpdatePasswordCtrl.js in folder common */
Ext.define('HelcPDA.controller.more.UpdatePasswordCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		control:{
			"button#update_pw":{
				tap:'update_pw'
			},
		},
	},
	
	update_pw : function(){
		var obj = this;
		var up_password = Ext.getCmp('up_password').getValue();
		var up_new_password = Ext.getCmp('up_new_password').getValue();
		var up_re_new_password = Ext.getCmp('up_re_new_password').getValue();
		//验证输入
		var reg=new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
		if(up_password ==""){
			WL.Toast.show("请输入原始密码");
		}else if(up_new_password == ""){
			WL.Toast.show("请输入新密码");
		}else if(up_new_password.length < 6){
			WL.Toast.show("新密码长度至少6位！");
		}else if(reg.test(up_new_password)==false){
			WL.Toast.show("新密码必须包含数字和字母");
		}else if(up_re_new_password == ""){
			WL.Toast.show("请重复新密码");
		}else 
		//验证密码
		if(up_new_password != up_re_new_password){
			WL.Toast.show("两次密码输入不一致");
		}else if(up_password != ""){
			if(up_password == up_new_password){
				WL.Toast.show("新密码不能与原始密码一致");
			}else{
				navigator.notification.confirm('是否修改密码？',function(btn){
		 			if(btn ==2){
						contentdata={USERID:userid,PWD:up_password,NEW_PWD:up_new_password};
						var content= JSON.stringify(contentdata);
						var getResult=function(res){
							Ext.Msg.alert('请重新登录',"已成功修改密码!",function(){
								obj.NextView('loginView','HelcPDA.view.LoginView');
							});
						};
						obj.connectServer(getResult, 'loginAction.do?method=toUpdatePassword', content);
					}else{
		 				return;
		 			}
		 		},"提示","取消,确定");
//				Ext.Msg.confirm('注意','是否修改密码？',function(btn){
//					if (btn == 'yes'){
//						contentdata={USERID:userid,PWD:up_password,NEW_PWD:up_new_password};
//						var content= JSON.stringify(contentdata);
//						var getResult=function(res){
//							Ext.Msg.alert('请重新登录',"已成功修改密码!",function(){
//								obj.NextView('loginView','HelcPDA.view.LoginView');
//							});
//						};
//						obj.connectServer(getResult, 'loginAction.do?method=toUpdatePassword', content);
//					}else{
//						return;
//					}
//				});
			} 
		}
		
		
		
		
		
		
	}
	
	
});
