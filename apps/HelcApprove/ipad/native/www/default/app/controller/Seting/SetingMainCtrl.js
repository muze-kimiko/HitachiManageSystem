
/* JavaScript content from app/controller/Seting/SetingMainCtrl.js in folder common */
Ext.define("HelcApprove.controller.Seting.SetingMainCtrl", {
	extend : "HelcApprove.controller.ApplicationController",
	config : {
		refs : {
		},
		control : {
			"button#btn_seting_back":{
				tap:'btn_seting_back'
			},
			"button#btn_loginhistory_back":{
				tap:'btn_seting_back'
			},
			"button#btn_operationhistory_back":{
				tap:'btn_seting_back'
			},
			"button#btn_userhistory_back":{
				tap:'btn_seting_back'
			},
			"button#btn_changepassword_back":{
				tap:'btn_seting_back'
			},
			"button#btn_changepassword_cancel":{
				tap:'btn_changepassword_cancel'
			},
			"button#btn_changepassword_confirm":{
				tap:'btn_changepassword_confirm'
			},
			"list#list_seting":{
				itemtap:'list_seting'
			},
		}
	},
	
	btn_seting_back:function(){
		this.BackView();
	},
	
	btn_changepassword_cancel:function(){
		Ext.getCmp('old_password').setValue("");
		Ext.getCmp('new_password').setValue("");
		Ext.getCmp('conf_password').setValue("");
	},
	
	btn_changepassword_confirm:function(){
		var obj = this;
		var v_old_pwd = Ext.getCmp('old_password').getValue();
		var v_new_pwd = Ext.getCmp('new_password').getValue();
		var v_con_pwd = Ext.getCmp('conf_password').getValue();
		if(v_old_pwd == ""){
			Ext.Msg.alert('提示','请输入旧密码!');
			return false;
		}
		if(v_new_pwd == ""){
			Ext.Msg.alert('提示','请输入新密码!');
			return false;
		}
		if(v_con_pwd == ""){
			Ext.Msg.alert('提示','请输入新密码确认!');
			return false;
		}
		if(v_new_pwd != v_con_pwd){
			Ext.Msg.alert('提示','两次输入的新密码不相同，请重新输入!');
			Ext.getCmp('new_password').setValue("");
			Ext.getCmp('conf_password').setValue("");
			return false;
		}
		
		myBusyIndicator.show();
		
		var invocationData={adapter : 'HttpAdapter_APPROVE',
	            procedure : 'LdapUpdatePwd',
	            parameters : [loginuser,v_old_pwd,v_new_pwd]
         };
		
		 WL.Client.invokeProcedure(invocationData, { 
			onSuccess : LdapUpdatePwdSuccess,
	        onFailure : LdapUpdatePwdFailure
	     });
		 
		 myBusyIndicator.hide();
		
//		 Ext.Msg.alert('提示','修改密码操作!');
	},
	
	list_seting:function(obk, index, target, record, e, eOpts ){
		var obj = this;
		myLoading.show();
		var list=Ext.getCmp('list_seting');
		var text=JSON.stringify(list.getData()[index].text);
		if(text=='"登录历史查看"'){
			this.NextView('LoginHistory','HelcApprove.view.Seting.LoginHistory');
			//获取上次登录时间
			var params = {};
		    params.method = 'lastLoginLog';
		    params.parameters = [loginuser];
		    this.connectServer_SQL_APPROVE(callBack0,params);
		    function callBack0(result) {
		    	var res = result.resultSet;
		    	var lasttime = res[0].TIME;
		    	//var DeviceNo = Ext.getCmp('DeviceNo').getValue();
		    	var DeviceNo=deviceIdt;
			    DeviceNo_no = DeviceNo.substring(DeviceNo.length-8,DeviceNo.length);
			    document.getElementById('loginHistoryFont').innerHTML="1、您上次登录本系统的时间为‘"+lasttime+"’。您当前的设备标识后8位为..."+DeviceNo_no+"!<br /> 2、以下显示记录为该用户或者该设备曾经的使用情况，解除指定锁定后将无法再次使用指定用户在指定设备上登录。若需要再次启用，请联系管理员。</font><font color='#FF0000'><br /> 3、若您想知道所有的推送历史，请联系系统管理员导出！";
			    
				var params = {};
			    params.method = 'loginInfo';
			    params.parameters = [loginuser];
			    obj.connectServer_SQL_APPROVE(callBack1,params);
			    function callBack1(result) {
			 	   var res = result.resultSet;
				   if (res.length == 0) {
					   Ext.Msg.alert('提示', '没有数据');
				   }else{
					   for(var i=0;i<res.length;i++){
						   var isLocal = "是";
						   //var DeviceNo = Ext.getCmp('DeviceNo').getValue();
						   var DeviceNo=deviceIdt;
						   if(DeviceNo != res[i].MAC_NUM){
							   isLocal = "否";
						   }
						   var loginlogTable = document.getElementById('loginlogTable');
						   var NewRow = loginlogTable.insertRow(loginlogTable.rows.length);
						   NewRow.insertCell(0).innerHTML = '<td height="30">'+res[i].TIME+'</td>';
						   if(res[i].LOGIN_TYPE=="LOGIN"){
							   NewRow.insertCell(1).innerHTML = '<td height="30">登录</td>';
						   }else{
							   NewRow.insertCell(1).innerHTML = '<td height="30">登出</td>';
						   }
						   if(res[i].SUCCESS_FLG=="Y"){
							   NewRow.insertCell(2).innerHTML = '<td height="30">是</td>';
						   }else{
							   NewRow.insertCell(2).innerHTML = '<td height="30">否</td>';
						   }
						   var mac_num = res[i].MAC_NUM;
						   mac_num = mac_num.substring(mac_num.length-8,mac_num.length);
						   NewRow.insertCell(3).innerHTML = '<td height="30">...'+mac_num+'</td>';
						   NewRow.insertCell(4).innerHTML = '<td height="30">'+isLocal+'</td>';
						   NewRow.insertCell(5).innerHTML = '<td height="30">'+res[i].MSG+'</td>';
					   }
				   }
			    }
		    }
		    
		};
		if(text=='"操作历史查看"'){
			this.NextView('OperationHistory','HelcApprove.view.Seting.OperationHistory');
			var params = {};
		    params.method = 'operateLog';
		    params.parameters = [loginuser];
		    //var DeviceNo = Ext.getCmp('DeviceNo').getValue();
		    var DeviceNo=deviceIdt;
		    DeviceNo_no = DeviceNo.substring(DeviceNo.length-8,DeviceNo.length);
		    document.getElementById('poerationHistoryFont').innerHTML="1、您当前的设备标识后8位为..."+DeviceNo_no+"!<br /> 2、以下显示记录为该用户或者该设备曾经的使用情况，解除指定锁定后将无法再次使用指定用户在指定设备上登录。若需要再次启用，请联系管理员。</font><font color='#FF0000'><br /> 3、若您想知道所有的推送历史，请联系系统管理员导出！";
		    this.connectServer_SQL_APPROVE(callBack2,params);
		    function callBack2(result) {
		 	   var res = result.resultSet;
			   if (res.length == 0) {
				   Ext.Msg.alert('提示', '没有数据');
			   }else{
				   for(var i=0;i<res.length;i++){
					   var isLocal = "是";
					   if(DeviceNo != res[i].ATTR_01){
						   isLocal = "否";
					   }
					   var operationHistoryTable = document.getElementById('operationHistoryTable');
					   var NewRow = operationHistoryTable.insertRow(operationHistoryTable.rows.length);
					   NewRow.insertCell(0).innerHTML = '<td height="30">'+res[i].TIME+'</td>';
					   if(res[i].OP_TYPE=="APPROVE_PASS"){
						   NewRow.insertCell(1).innerHTML = '<td height="30">TBJ审批同意</td>';
					   }else if(res[i].OP_TYPE=="APPROVE_REFUSE"){
						   NewRow.insertCell(1).innerHTML = '<td height="30">TBJ审批拒绝</td>';
					   }else if(res[i].OP_TYPE=="APPROVE_RESERVE"){
						   NewRow.insertCell(1).innerHTML = '<td height="30">TBJ审批保留意见</td>';
					   }else if(res[i].OP_TYPE=="ADD_SERVICE_POINT_APPROVE_PASS"){
							   NewRow.insertCell(1).innerHTML = '<td height="30">增费审批同意</td>'; 
					   }else if(res[i].OP_TYPE=="ADD_SERVICE_POINT_APPROVE_REFUSE"){
								   NewRow.insertCell(1).innerHTML = '<td height="30">增费审批拒绝</td>'; 
					   }else if(res[i].OP_TYPE=="ADD_SERVICE_POINT_APPROVE_RESERVE"){
						   NewRow.insertCell(1).innerHTML = '<td height="30">增费审批保留意见</td>'; 
					   }else{
						   NewRow.insertCell(1).innerHTML = '<td height="30"></td>';
					   }
					   if(res[i].SUCCESS_FLG=="Y"){
						   NewRow.insertCell(2).innerHTML = '<td height="30">是</td>';
					   }else{
						   NewRow.insertCell(2).innerHTML = '<td height="30">否</td>';
					   }
					   NewRow.insertCell(3).innerHTML = '<td height="30">'+res[i].RECORD_ID+'</td>'
					   var mac_num = res[i].ATTR_01;
					   mac_num = mac_num.substring(mac_num.length-8,mac_num.length);
					   NewRow.insertCell(4).innerHTML = '<td height="30">...'+mac_num+'</td>';
					   NewRow.insertCell(5).innerHTML = '<td height="30">'+isLocal+'</td>';
					   NewRow.insertCell(6).innerHTML = '<td height="30">'+res[i].OP_CONTENT+'</td>';
				   }
			   }
		    }
		};
		if(text=='"设备用户查看"'){checkUserInfo()};
		if(text=='"修改密码"'){
			this.NextView('ChangePassword','HelcApprove.view.Seting.ChangePassword');
			document.getElementById('spn_changePwd_userid').innerHTML = loginuser;
		};
		if(text=='"退出系统"'){
			this.NextView('login','HelcApprove.view.LoginView');
			for(var x in ViewArray){
				if(ViewArray[x].ViewId != "login"){
					var view_id = Ext.getCmp(ViewArray[x].ViewId);
					if(view_id){
						view_id.destroy();
					}
				}
			}
			
			// 找上次记住用户信息
			//创建和打开加密高速缓存
			WL.EncryptedCache.open("gshc_helcapprove_key", true, onComplete, onError);
			function onComplete(status){
				console.log('创建和打开加密高速缓存成功');
				//获取上次登录账号
				WL.EncryptedCache.read("Loginuser", onReaduserSuccess, onReaduserFailure);
			    function onReaduserSuccess(value){
			    	if(value==null){
			    		console.log('系统未记录登录账号'); 
			    		Ext.getCmp('checkuser').setValue(0);
			    	}else{
			    		loginuser=value;
			    		checktoggle="true";
			    		if(typeof(Ext.getCmp('username'))!='undefined'){
			    			console.log('username is object');
			    			Ext.getCmp('username').setValue(loginuser);
				    		Ext.getCmp('checkuser').setValue(1);
			    		}
			    		console.log('系统获取上次登录账号成功：'+value);
			    	} 
			    }
			    
			    function onReaduserFailure(status){
			 	   console.log('系统获取上次登录账号失败'); 
			    }  
			} 
			function onError(status){
				switch(status){
				case WL.EncryptedCache.ERROR_KEY_CREATION_IN_PROGRESS:
					console.log('ERROR:KEY_CREATION_IN_PROGRESS');   
					break;
				case WL.EncryptedCache.ERROR_LOCAL_STORAGE_NOT_SUPPORTED:
					console.log('ERROR:LOCAL_STORAGE_NOT_SUPPORTED');   
					break;
				case WL.EncryptedCache.ERROR_NO_EOC:
					console.log('ERROR:NO_EOC');   
					break;
				case WL.EncryptedCache.ERROR_COULD_NOT_GENERATE_KEY:
					console.log('ERROR:COULD_NOT_GENERATE_KEY');   
					break;
				case WL.EncryptedCache.ERROR_CREDENTIALS_MISMATCH:
					console.log('ERROR:CREDENTIALS_MISMATCH');   
					break;  
				} 
			}
			
			//记录登出
    		var params = {};
    		params.method = 'InsertLoginLog';
    		//var deviceNo = Ext.getCmp('DeviceNo').getValue();
    		var deviceNo=deviceIdt;
    		if(deviceNo == ""){
    			deviceNo = "非正常用户";
    		}
    		var par_obj = [loginuser,deviceNo,'LOGOUT','Y','退出成功!','','','',''
		                     ,'','','','','','',logID];
    		params.parameters = [par_obj];
    		obj.connectServer_SQL_APPROVE(callBack,params);
    		function callBack(result) {
    			console.log('记录成功');
    		}
		};
		myLoading.hide();
	},
});

function checkUserInfo(){
	obj.NextView('UserHistory','HelcApprove.view.Seting.UserHistory');
	var params = {};
    params.method = 'deviceuser';
    params.parameters = [loginuser];
    obj.connectServer_SQL_APPROVE(callBack3,params);
    //var DeviceNo = Ext.getCmp('DeviceNo').getValue();
    var DeviceNo=deviceIdt;
    DeviceNo_no = DeviceNo.substring(DeviceNo.length-8,DeviceNo.length);
    document.getElementById('userHistoryFont').innerHTML="1、您当前的设备标识后8位为..."+DeviceNo_no+"!<br /> 2、以下显示记录为该用户或者该设备曾经的使用情况，解除指定锁定后将无法再次使用指定用户在指定设备上登录。若需要再次启用，请联系管理员。</font><font color='#FF0000'><br /> 3、若您想知道所有的推送历史，请联系系统管理员导出！";
    function callBack3(result) {
 	   var res = result.resultSet;
 	   console.log("res:"+JSON.stringify(res))
	   if (res.length == 0) {
		   Ext.Msg.alert('提示', '没有数据');
	   }else{
		   for(var i=0;i<res.length;i++){
			   var isLocal = "是";
//			   if(DeviceNo != res[i].PUSH_NOTIFICATION_ID){
//				   isLocal = "否";
//			   }
			   if(DeviceNo != res[i].DEVICE_ID){
				   isLocal = "否";
			   }
			   var userHistoryTable = document.getElementById('userHistoryTable');
			   var NewRow = userHistoryTable.insertRow(userHistoryTable.rows.length);
			   NewRow.insertCell(0).innerHTML = '<td height="30" width="30">'+res[i].TIME+'</td>';
			   NewRow.insertCell(1).innerHTML = '<td height="30">'+res[i].OWNER_NAME+'</td>';
			   var DEVICE_ID = res[i].DEVICE_ID;
			   var mac_num = res[i].DEVICE_ID;
			   mac_num = mac_num.substring(mac_num.length-8,mac_num.length);
			   NewRow.insertCell(2).innerHTML = '<td height="30">...'+mac_num+'</td>';
			   NewRow.insertCell(3).innerHTML = '<td height="30">'+isLocal+'</td>';
			   if(res[i].DEVICE_DESCRIPTION ==null){
				   NewRow.insertCell(4).innerHTML = '<td height="30"></td>';
			   }else{
				   NewRow.insertCell(4).innerHTML = '<td height="30">'+res[i].DEVICE_DESCRIPTION+'</td>';
			   }
			   NewRow.insertCell(5).innerHTML = '<td height="30">'+res[i].LASTTIME+'</td>';
			   var status = "";
			   if(res[i].STATUS=="ALLOW"){
				   status="允许";
			   }else if(res[i].STATUS=="REJECT"){
				   status="拒绝";
			   }else{
				   status="新";
			   }
			   NewRow.insertCell(6).innerHTML = '<td height="30">'+status+'</td>';
			   if(res[i].STATUS=="ALLOW"){
				   NewRow.insertCell(7).innerHTML = '<td height="30"><div align="center">  <input id="remove_bing" onclick="remove_even(this,\''+DEVICE_ID+'\')"  type="button" value="解除绑定" class="x-button"/>         </div></td>';
			   }else{
				   NewRow.insertCell(7).innerHTML = '<td height="30"><div align="center">   </div></td>';
			   }
		   }
	   }
    }
}

function  LdapUpdatePwdSuccess(result){
	console.log("result"+result); 
	myBusyIndicator.hide();
	var httpStatusCode = result.status;
	if (200 == httpStatusCode) {
        var invocationResult = result.invocationResult;
        var isSuccessful = invocationResult.isSuccessful;
        if (true == isSuccessful) {
        	var v_result = invocationResult.result;
        	var json = eval("("+v_result+")"); 
        	if(json.isUpdate){
        		Ext.Msg.alert("提示",json.Msg);
        		obj.NextView('login','HelcApprove.view.LoginView');
        		for(var x in ViewArray){
    				if(ViewArray[x].ViewId != "login"){
    					var view_id = Ext.getCmp(ViewArray[x].ViewId);
    					if(view_id){
    						view_id.destroy();
    					}
    				}
    			}
        	}else{
        		Ext.getCmp('old_password').setValue("");
        		Ext.getCmp('new_password').setValue("");
        		Ext.getCmp('conf_password').setValue("");
        		Ext.Msg.alert("提示",json.Msg);  
        	}
        } else {
        	Ext.getCmp('old_password').setValue("");
    		Ext.getCmp('new_password').setValue("");
    		Ext.getCmp('conf_password').setValue("");
        	Ext.Msg.alert("提示","服务器出错！");  
        }
    } else {
    	Ext.getCmp('old_password').setValue("");
		Ext.getCmp('new_password').setValue("");
		Ext.getCmp('conf_password').setValue("");
    	Ext.Msg.alert("提示","发送请求失败！");  
    }
	
	// ALEX140312: re-active Login form for next.
//	loginView.setDisabled(false);
}

function LdapUpdatePwdFailure(){
	 myBusyIndicator.hide();
	 Ext.Msg.alert("提示","服务器出错！");
	 
	// ALEX140312: re-active Login form while login failure.
//	 loginView.setDisabled(false);
}

function remove_even(objj,DEVICE_ID){
	var params = {};
    params.method = 'removeDevice';
    params.parameters = [DEVICE_ID];
    obj.connectServer_SQL_APPROVE(callBack,params);
    function callBack(result) {
    	checkUserInfo();
    }
}
