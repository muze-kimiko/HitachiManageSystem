
/* JavaScript content from app/controller/OaMobileOffice/more/UpdatePasswordCtrl.js in folder common */
Ext.define('HelcPAD.controller.OaMobileOffice.more.UpdatePasswordCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//修改密码
			"button#update_pw":{
				tap:'update_pw'
			},
			//返回
			"button#updatePassword_id_FH":{
				tap:'updatePassword_id_FH'
			},
		},
	},
	
	updatePassword_id_FH:function(){
		this.showBackView('more_view_id','HelcPAD.view.OaMobileOffice.more.More_view');
	},
	
	update_pw : function(){
		var obj = this;
		var up_password = Ext.getCmp('up_password').getValue();
		var up_new_password = Ext.getCmp('up_new_password').getValue();
		var up_re_new_password = Ext.getCmp('up_re_new_password').getValue();
		//验证输入
		var reg=new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
		if(up_password ==""){
			//cc.log('请输入原始密码');
			Ext.Msg.alert('提示','请输入原始密码');
			//WL.Toast.show("请输入原始密码");
		}else if(app_passwork!=up_password){
			//cc.log('原始密码输入错误');
			Ext.Msg.alert('提示','原始密码输入错误');
			//WL.Toast.show('原始密码输入错误');
		}else if(up_new_password == ""){
			//cc.log('请输入新密码');
			Ext.Msg.alert('提示','请输入新密码');
			//WL.Toast.show("请输入新密码");
		}else if(up_new_password.length < 6){
			//cc.log('新密码长度至少6位');
			Ext.Msg.alert('提示','新密码长度至少6位！');
			//WL.Toast.show("新密码长度至少6位！");
		}else if(reg.test(up_new_password)==false){
			//cc.log('新密码必须包含数字和字母');
			Ext.Msg.alert('提示','新密码必须包含数字和字母');
			//WL.Toast.show("新密码必须包含数字和字母");
		}else if(up_re_new_password == ""){
			//cc.log('请重复新密码');
			Ext.Msg.alert('提示','请重复新密码');
			//WL.Toast.show("请重复新密码");
		}else
		//验证密码
		if(up_new_password != up_re_new_password){
			//cc.log('两次密码输入不一致');
			Ext.Msg.alert('提示','两次新密码输入不一致');
			//WL.Toast.show("两次密码输入不一致");
		}else if(up_password != ""){
			if(up_password == up_new_password){
				//cc.log('新密码不能与原始密码一致');
				Ext.Msg.alert('提示','新密码不能与原始密码一致');
				//WL.Toast.show("新密码不能与原始密码一致");
			}else{
				navigator.notification.confirm('是否修改密码？',function(btn){
		 			if(btn ==2){
						var contentdata={USERID:username,PWD:up_password,NEW_PWD:up_new_password};
						var getResult=function(res){
							console.log(res);
							var xml=res.ChangePasswordResponse["return"];
							if(window.DOMParser){
			                	parser=new DOMParser();
			                	xmlDoc=parser.parseFromString(xml,"text/xml");
			                }else{
			                	xmlDoc=newActiveXobject("Microsoft.XMLDOM");
			                	xmlDoc.async="false";
			                	xmlDoc.loadXML(xml);
			                }
							try{
								var Msg=xmlDoc.getElementsByTagName("Msg")[0].childNodes[0].nodeValue;
								if(Msg!=undefined){
									Ext.Msg.alert('温馨提示',Msg);
									return;
								}
							}catch(e){
								
							}
							console.log('Msg:'+Msg);
							Ext.Msg.alert('请重新登录',"已成功修改密码!",function(){
								var main = Ext.getCmp('padlogin_id');
					      	 	if(!main){
					      		 main = Ext.create('HelcPAD.view.login.PADLogin');
					      	 	}
					      	 	Ext.Viewport.setActiveItem(main);
					      	 	ViewArray.splice(ViewArray.length-1,1);
					      	 	ViewArray = [];
							});
						};
						obj.connectServer_loginXG(getResult,contentdata);
					}else{
		 				return;
		 			}
		 		},"提示","取消,确定");
				
				/*Ext.Msg.confirm('注意','是否修改密码？',function(btn){
					if (btn == 'yes'){
						var contentdata={USERID:userID,PWD:up_password,NEW_PWD:up_new_password};
						var getResult=function(res){
							Ext.Msg.alert('请重新登录',"已成功修改密码!",function(){
								var main = Ext.getCmp('padlogin_id');
					      	 	if(!main){
					      		 main = Ext.create('HelcPAD.view.login.PADLogin');
					      	 	}
					      	 	Ext.Viewport.setActiveItem(main);
					      	 	ViewArray.splice(ViewArray.length-1,1);
					      	 	ViewArray = [];
							});
						};
						obj.connectServer_loginXG(getResult,contentdata);
					}else{
						return;
					}
				});*/
			}; 
		};
		
	},
	
	
});
