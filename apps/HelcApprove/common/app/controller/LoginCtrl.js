// ALEX140312: variable for LOGIN form.
var loginView;
var obj = null;
Ext.define("HelcApprove.controller.LoginCtrl", {
	extend : "HelcApprove.controller.ApplicationController",
	config : {
		refs : {
//			loginView :  'vlogin',
//			mainTabView : {
//				selector : 'vmaintab',
//				xtype : 'vmaintab',
//				autoCreate : true
//			},
			loginButton : 'button[id=loginButton]'
		},

		control : {
//			loginView : {
//				initialize : 'onLoginViewInit',
//				evtLogout : "doLogout"
//			},
			loginButton : {
				tap : 'doLogin'
			},
			"button#loginButton_rest": {
				tap: 'doLogin'
			},
//			mainTabView : {
//				evtLogout : "doLogout"
//			}
		}
	},
	// Transitions
	slideLeftTransition : {
		type : 'slide',
		direction : 'left'
	},
	slideRightTransition : {
		type : 'slide',
		direction : 'right'
	},

	doLogin : function() {
		obj = this;
		var username = Ext.getCmp('username').getValue();
		var password = Ext.getCmp('password').getValue();
		
		if (Ext.getCmp('password_rest') != null && Ext.getCmp('password_rest') != undefined && Ext.getCmp('hf_isRestLogin').getValue() == "1") {
			if (Ext.getCmp('password_rest').getValue() != null && Ext.getCmp('password_rest').getValue() != '') {
				password = Ext.getCmp('password_rest').getValue();
			}
			
			if (Ext.getCmp('password_rest').getValue() == "" || Ext.getCmp('password_rest').getValue() == null) {
				Ext.Msg.alert('提示','请输入密码!'); 
				return;
			}
		}
		
		if (username == null || username == '') {
			Ext.Msg.alert('提示','请输入用户名!'); 
			return;
		}
		
		if (password == null || password == '') {
			Ext.Msg.alert('提示','请输入密码!'); 
			return;
		}
		
		// ALEX140312: disable current form(LOGIN), hide the keyboard.
		loginView = Ext.Viewport.getActiveItem();
//		loginView.setDisabled(true);
		
		myBusyIndicator.show();
		
		var invocationData={adapter : 'HttpAdapter_APPROVE',
	            procedure : 'LdapLogin',
	            parameters : [username,password]
         };
		
		 WL.Client.invokeProcedure(invocationData, { 
			onSuccess : LdapLoginSuccess,
	        onFailure : LdapLoginFailure
	     });
		 
		//原型代码
//		this.NextView('mainmenu','HelcApprove.view.MainMenu');
		//LDAP验证
		/*
		var reqURL = '/j_security_check';
		var options = {};
		options.parameters = {
			j_username:username,
			j_password:password
		};
		options.headers = {};
		
		LDAPRealmChallengeHandler.submitLoginForm(reqURL,options,
				LDAPRealmChallengeHandler.submitLoginFormCallback);
		*/
		//LDAP验证
//		var main = Ext.getCmp('mainmenu');
//		if(!main){
//			main = Ext.create('HelcApprove.view.MainMenu');
//		}
		//原型代码
		// ALEX140312: login OK, goto to Mainmenu.
//		Ext.Viewport.setActiveItem(main);
		
		// ALEX140312: re-active Login form for next.
//		loginView.setDisabled(false);
		
		
	}  
});

function  LdapLoginSuccess(result){
	logID = obj.randomWord();
	myBusyIndicator.hide();
	var httpStatusCode = result.status;
	if (200 == httpStatusCode) {
        var invocationResult = result.invocationResult;
        var isSuccessful = invocationResult.isSuccessful;
        if (true == isSuccessful) {
        	var v_result = invocationResult.result;
        	var json = eval("("+v_result+")"); 
     
        	loginuser = Ext.getCmp('username').getValue();
        	if(json.isLogin){
        		loginuser = json.UId;
        		roleString = json.iPadAttr02;
        		if(roleString=="其他职位"||roleString.indexOf("其他")>0)
        			roleString="其它职位";
        		
        		// 检查是否有登陆权限 zhj 
        		if (json.iPadAttr01 != "Y") {
        			Ext.Msg.alert("提示","您没有登录系统的权限，请联系管理员开通权限。请注意用户名须为不少于4位的工号。");
        			return ;
        		}
        		
        		// 检查设备，如果是不存在的设备则插入，如果存在则修改此的最后使用时间
        		//var deviceId = Ext.getCmp('DeviceNo').getValue();
        		
        		var deviceId= deviceIdt;
        		//var deviceId = "A9815426-53A4-4264-A6AF-853CFE8A97B0";
        		
        		var params_searchDev = {};
        		params_searchDev.method = 'checkDevByUser';
        		params_searchDev.parameters = [[deviceId,loginuser]];
        		obj.connectServer_SQL_APPROVE(callBack_searchDev,params_searchDev);
        		function callBack_searchDev(result) {
        			//console.log("sja");
        			var deviceidUUID = createUUID().toUpperCase();
        		
        			// 找到设备信息 
        			//zhj 
        			var flag = false;
        			//var flag = true; 
        			var resultItem = null;
        			if (result.resultSet.length > 0) {
        				flag = true;
        			}
        			
        			//zhj
        			if(Ext.os.is.iOS){
        				if (flag) {
	        				resultItem = result.resultSet[0];
	        				//zhj
	        				if (resultItem.STATUS == 'NEW') {
	        					Ext.Msg.alert("提示", "为保障数据安全性，系统将进行账号与设备的绑定，请联系管理员。绑定后成功无此提示。谢谢！联系人:郑映，公司座机88861；黎明坤，公司座机86835，手机15013137582。");
	        				} else if (resultItem.STATUS == 'REJECT') {
	        					Ext.Msg.alert("提示", "为保障数据安全性，系统将进行账号与设备的绑定，请联系管理员。绑定后成功无此提示。谢谢！联系人:郑映，公司座机88861；黎明坤，公司座机86835，手机15013137582。");
	        				} else {
	        					// 插入设备最后使用时间
	        					var paramsUpdateDevTime = {};
	        					paramsUpdateDevTime.method = 'UpdateDeviceTime';
	                    		var par_updatedevtime = [Ext.Date.format(new Date(), 'Y-m-d H:i:s'), loginuser, resultItem.PUSH_NOTIFICATION_ID];
	                    		paramsUpdateDevTime.parameters = [par_updatedevtime];
	                    		obj.connectServer_SQL_APPROVE(callBack_updateDevTime,paramsUpdateDevTime);
	                    		function callBack_updateDevTime(result) {
	                    			console.log('更新成功！');
	                    		}
	        					toLoginCnt();
	        				}
	        			} else {
	        				// 执行插入设备的语句
	                		var paramsAddDev = {};
	                		paramsAddDev.method = 'InsertDevice';
	                		var par_adddev = [deviceidUUID, loginuser, deviceId, loginuser, loginuser, Ext.Date.format(new Date(), 'Y-m-d H:i:s')];
	                		paramsAddDev.parameters = [par_adddev];
	                		obj.connectServer_SQL_APPROVE(callBack,paramsAddDev);
	                		function callBack(result) {
	                			Ext.Msg.alert("提示", "为保障数据安全性，系统将进行账号与设备的绑定，请联系管理员。绑定后成功无此提示。谢谢！联系人:郑映，公司座机88861；黎明坤，公司座机86835，手机15013137582。");
	                		}
	        			}
        			}else{
						toLoginCnt();
        			}
        		}
        		
        		//记录登录成功
        		function toLoginCnt() {
        			var params = {};
        			params.method = 'InsertLoginLog';
        			var deviceNo = deviceId;
        			if(deviceNo == ""){
        				deviceNo = "非正常用户";
        			}
        			var par_obj = [loginuser,deviceNo,'LOGIN','Y','登录成功','','','',''
        			               ,'','','','','','',logID];
        			params.parameters = [par_obj];
        			console.log(params);
        			obj.connectServer_SQL_APPROVE(callBack,params);
        			function callBack(result) {
        				console.log('记录成功');
        			}
        			//登录成功后判断记录登录账号
        			var checkuser = Ext.getCmp('checkuser').getValue();
        			var username = Ext.getCmp('username').getValue(); 
        			if(checkuser==1){ 
        				WL.EncryptedCache.write("Loginuser", username, onWrite1Success, onWrite1Failure);
        				function onWrite1Success(status){
        					console.log('记录登录账号成功');  
        				} 
        				function onWrite1Failure(status){
        					if(status=WL.EncryptedCache.EOC_CLOSED){ 
        						console.log('记录登录账号失败');  
        					} 
        				} 
        			}else{ 
        				WL.EncryptedCache.write("Loginuser", null, onWrite0Success, onWrite0Failure);
        				function onWrite0Success(status){
        					console.log('删除上上次记录的账号成功');  
        				} 
        				function onWrite0Failure(status){
        					if(status=WL.EncryptedCache.EOC_CLOSED){ 
        						console.log('删除上上次记录的账号失败');  
        					} 
        				} 
        			} 
        			
        			// 如果是从后台返回的重新登陆，则不需要跳转
        			if (Ext.getCmp("hf_isRestLogin").getValue() == "0") {
        				obj.NextView('mainmenu','HelcApprove.view.MainMenu');
        				obj.getApplication().getController('HelcApprove.controller.MainMenuCtrl').initUserRole(json.iPadAttr04);
        				obj.getApplication().getController('HelcApprove.controller.MainMenuCtrl').initTBJPaddingCount();
        			}
        			if(reLoginOvlay){
        				reLoginOvlay.hide();
        			}
        			Ext.getCmp("hf_isRestLogin").setValue("0");
        			var loginDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
        			document.getElementById("spn_logintime").innerHTML = loginDate;
        		}
        	}else{
        		//记录登录失败
        		var params = {};
        		params.method = 'InsertLoginLog';
        		//var deviceNo = Ext.getCmp('DeviceNo').getValue();
        		var deviceNo=deviceIdt;
        		if(deviceNo == ""){
        			deviceNo = "非正常用户";
        		}
        		console.log("~~~~~~~~~~~~~~~~~logID: " + logID);
        		var par_obj = [loginuser,deviceNo,'LOGIN','N','登录失败!'+json.Msg,'','','',''
  		                     ,'','','','','','',logID];
        		params.parameters = [par_obj];
        		obj.connectServer_SQL_APPROVE(callBack,params);
        		function callBack(result) {
        			console.log('记录成功');
        		}
    		    
        		Ext.getCmp('password').setValue("");
        		if (json.Msg == null || json.Msg == '' || json.Msg == undefined) {
        			Ext.Msg.alert("提示", "此用户无登陆权限！");  
        		} else {
        			if(json.Msg.indexOf("密码错误")!=-1)
        			Ext.Msg.alert("提示", "您所输入的密码错误。请注意密码为Siebel系统密码。如需重置密码请联系：信息中心郑映，公司座机88861。");
        			else
        			Ext.Msg.alert("提示", json.Msg);	
        		}
        	}
        } else {
        	Ext.getCmp('password').setValue('');
        	Ext.Msg.alert("提示","连接服务器失败，请检查使用设备的网络情况；或联系管理员检查服务器状况。");  
        }
    } else {
    	Ext.getCmp('password').setValue('');
    	Ext.Msg.alert("提示","数据返回失败，请检查使用设备的网络情况；或联系管理员检查服务器状况。");  
    }
	
	// ALEX140312: re-active Login form for next.
	loginView.setDisabled(false);
}

function LdapLoginFailure(){
	 myBusyIndicator.hide();
	 Ext.Msg.alert("提示","连接服务器失败，请检查使用设备的网络情况；或联系管理员检查服务器状况。");
	 
	// ALEX140312: re-active Login form while login failure.
	 loginView.setDisabled(false);
}


function stringToHex(str){
	var val="";
	var arr = str.split(",");
	for (var i = 0; i < arr.length; i ++) {
		val += arr[i].fromCharCode(i);
	}
	return val;
}

