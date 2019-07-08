Ext.define("HelcMES.controller.CommonCtr", {
	extend:'HelcMES.controller.ApplicationController',
	config : {
		control : {
			"button#btn_login":{
				tap:'btn_login'
			},
			"button#btn_quit":{
				tap:'btn_quit'
			},
			"button#btn_ScanShopOrder_Start":{
				tap:'btn_ScanShopOrder_Start'
			},
			"button#btn_ScanShopOrder_End":{
				tap:'btn_ScanShopOrder_End'
			},
			"button#btn_ScanBreakOrder_Start":{
				tap:'btn_ScanBreakOrder_Start'
			},
			"button#btn_ScanBreakOrder_End":{
				tap:'btn_ScanBreakOrder_End'
			},
			"button#btn_ScanKeyPart":{
				tap:'btn_ScanKeyPart'
			},
			"button#btn_ConfirmShopOrder":{
				tap:'btn_ConfirmShopOrder'
			},
		}
	},
	
	btn_ScanBreakOrder_Start : function(button,e,eOpts){
		if(Ext.os.is.iOS || Ext.os.is.Android){
			//手机执行cordova操作
			cordova.exec(function(data){
				//扫描正常返回
				//data.cancelled(0代表正常返回扫描值，1表示取消扫描) 
				//data.text(扫描后获取的值) 
				//data.format(被扫描条码的格式)
				if(!data.cancelled){
					var tmpbarcode = data.text;
					tmpbarcode = tmpbarcode.replace("&","_AND_");
					var tmporder = tmpbarcode.split('/').pop();
					var getResult = function(res){
						var resp = res.OrderScanOperationResponse.OrderScanOperationResult;
						if(resp){
							var respo = Ext.JSON.decode(resp);
							Ext.getCmp('D_ShopOrder').setValue(tmporder);
							Ext.Msg.show({
								title: '温馨提示',
								message: respo.op_msg+'<br>当前订单已改变为'+tmporder+'！',
								buttons: Ext.MessageBox.OK,
								fn: function(buttonId) {
								}
							});
						}else{
							Ext.toast('扫描处理失败，请稍后重试！',2000);
							return;
						}
					}

					var parameters = {
						procedure : 'OrderScanOperation',
						isLoading : true,
						Barcode : tmpbarcode,
						Id : Ext.getCmp('H_Id').getValue(),
						WorkCenterId : Ext.getCmp('SF_WorkCenter').getValue(),
						Type : 'pausestart',
					};
										
					MainCtr.getDataFromServer(getResult,parameters);
				}
			},function(data){
				//扫描功能失败 	   
			},"BarcodeScanner","scan",[{showTorchButton:true}]);
		}else{
			//浏览器调试操作
			var tmpbarcode = 'ZZ31255130/TXZ460138/16C000299/XYMLYCXL/EG1-FT/Process:8084514#99b1fe15-62fe-43f4-8899-0b00cee3c9b9/8084514';
			var tmporder = tmpbarcode.split('/').pop();
			var getResult = function(res){
				var resp = res.OrderScanOperationResponse.OrderScanOperationResult;
				if(resp){
					var respo = Ext.JSON.decode(resp);
					Ext.getCmp('D_ShopOrder').setValue(tmporder);
					Ext.Msg.show({
						title: '温馨提示',
						message: respo.op_msg+'<br>当前订单已改变为'+tmporder+'！',
						buttons: Ext.MessageBox.OK,
						fn: function(buttonId) {
						}
					});
				}else{
					Ext.toast('扫描处理失败，请稍后重试！',2000);
					return;
				}
			}

			var parameters = {
				procedure : 'OrderScanOperation',
				isLoading : true,
				Barcode : tmpbarcode,
				Id : Ext.getCmp('H_Id').getValue(),
				WorkCenterId : Ext.getCmp('SF_WorkCenter').getValue(),
				Type : 'pausestart',
			};
								
			MainCtr.getDataFromServer(getResult,parameters);
		}
	},
	
	btn_ScanBreakOrder_End : function(button,e,eOpts){
		if(Ext.os.is.iOS || Ext.os.is.Android){
			//手机执行cordova操作
			cordova.exec(function(data){
				//扫描正常返回
				//data.cancelled(0代表正常返回扫描值，1表示取消扫描) 
				//data.text(扫描后获取的值) 
				//data.format(被扫描条码的格式)
				if(!data.cancelled){
					var tmpbarcode = data.text;
					tmpbarcode = tmpbarcode.replace("&","_AND_");
					var tmporder = tmpbarcode.split('/').pop();
					var getResult = function(res){
						var resp = res.OrderScanOperationResponse.OrderScanOperationResult;
						if(resp){
							var respo = Ext.JSON.decode(resp);
							Ext.getCmp('D_ShopOrder').setValue(tmporder);
							Ext.Msg.show({
								title: '温馨提示',
								message: respo.op_msg+'<br>当前订单已改变为'+tmporder+'！',
								buttons: Ext.MessageBox.OK,
								fn: function(buttonId) {
								}
							});
						}else{
							Ext.toast('扫描处理失败，请稍后重试！',2000);
							return;
						}
					}

					var parameters = {
						procedure : 'OrderScanOperation',
						isLoading : true,
						Barcode : tmpbarcode,
						Id : Ext.getCmp('H_Id').getValue(),
						WorkCenterId : Ext.getCmp('SF_WorkCenter').getValue(),
						Type : 'pauseend',
					};
										
					MainCtr.getDataFromServer(getResult,parameters);
				}
			},function(data){
				//扫描功能失败 	   
			},"BarcodeScanner","scan",[{showTorchButton:true}]);
		}else{
			//浏览器调试操作
			var tmpbarcode = 'ZZ31255130/TXZ460138/16C000299/XYMLYCXL/EG1-FT/Process:8084514#99b1fe15-62fe-43f4-8899-0b00cee3c9b9/8084514';
			var tmporder = tmpbarcode.split('/').pop();
			var getResult = function(res){
				var resp = res.OrderScanOperationResponse.OrderScanOperationResult;
				if(resp){
					var respo = Ext.JSON.decode(resp);
					Ext.getCmp('D_ShopOrder').setValue(tmporder);
					Ext.Msg.show({
						title: '温馨提示',
						message: respo.op_msg+'<br>当前订单已改变为'+tmporder+'！',
						buttons: Ext.MessageBox.OK,
						fn: function(buttonId) {
						}
					});
				}else{
					Ext.toast('扫描处理失败，请稍后重试！',2000);
					return;
				}
			}

			var parameters = {
				procedure : 'OrderScanOperation',
				isLoading : true,
				Barcode : tmpbarcode,
				Id : Ext.getCmp('H_Id').getValue(),
				WorkCenterId : Ext.getCmp('SF_WorkCenter').getValue(),
				Type : 'pauseend',
			};
								
			MainCtr.getDataFromServer(getResult,parameters);
		}
	},
	
	btn_ConfirmShopOrder : function(button,e,eOpts){

		if(Ext.os.is.iOS || Ext.os.is.Android){
			//手机执行cordova操作
			cordova.exec(function(data){
				//扫描正常返回
				//data.cancelled(0代表正常返回扫描值，1表示取消扫描) 
				//data.text(扫描后获取的值) 
				//data.format(被扫描条码的格式)
				if(!data.cancelled){
					var tmpbarcode = data.text;
					tmpbarcode = tmpbarcode.replace("&","_AND_");
					var tmporder = tmpbarcode.split('/').pop();
					Ext.getCmp('D_ShopOrder').setValue(tmporder);
					Ext.Msg.show({
						title: '温馨提示',
						message: '当前订单已改变为'+tmporder+'<br>继续扫描？',
						buttons: [{text:'取消', itemId:'cancel'},{text:'切换订单扫描', itemId:'no'},{text:'关键件扫描', itemId:'yes'}],
						fn: function(buttonId) {
							if(buttonId == 'yes'){
								HelcMES.app.getController('CommonCtr').btn_ScanKeyPart();
							}
							if(buttonId == 'no'){
								HelcMES.app.getController('CommonCtr').btn_ConfirmShopOrder();
							}
						}
					});
				}
			},function(data){
				//扫描功能失败 	   
			},"BarcodeScanner","scan",[{showTorchButton:true}]);
		}else{
			//浏览器调试操作
			var tmpbarcode = 'G6990102/TXZ200069/16C000300/XYMLYCXL/EG1-FT/Process:8084885#54b6818f-4079-4384-a4be-3d8acabea611/8084885';
			tmpbarcode = tmpbarcode.replace("&","_AND_");
			var tmporder = tmpbarcode.split('/').pop();
			Ext.getCmp('D_ShopOrder').setValue(tmporder);
			Ext.Msg.show({
				title: '温馨提示',
				message: '当前订单已改变为'+tmporder+'<br>继续扫描？',
				buttons: [{text:'取消', itemId:'cancel'},{text:'切换订单扫描', itemId:'no'},{text:'关键件扫描', itemId:'yes'}],
				fn: function(buttonId) {
					if(buttonId == 'yes'){
						HelcMES.app.getController('CommonCtr').btn_ScanKeyPart();
					}
					if(buttonId == 'no'){
						HelcMES.app.getController('CommonCtr').btn_ConfirmShopOrder();
					}
				}
			});
		}
	},
	
	btn_ScanKeyPart : function(button,e,eOpts){
		if(Ext.getCmp('D_ShopOrder').getValue() == ''){
			Ext.Msg.alert('温馨提示', '请先进行切换订单扫描以确认当前订单！');
			return;
		}
		if(Ext.os.is.iOS || Ext.os.is.Android){
			//手机执行cordova操作
			cordova.exec(function(data){
				//扫描正常返回
				//data.cancelled(0代表正常返回扫描值，1表示取消扫描) 
				//data.text(扫描后获取的值) 
				//data.format(被扫描条码的格式)
				if(!data.cancelled){
					var tmpbarcode = data.text;
					tmpbarcode = tmpbarcode.replace("&","_AND_");
					var getResult = function(res){
						var resp = res.KeyPartScanOperationResponse.KeyPartScanOperationResult;
						if(resp){
							var respo = Ext.JSON.decode(resp);
//							Ext.getCmp('D_ShopOrder').setValue(tmpbarcode.split('/').pop());
							Ext.Msg.show({
								title: '温馨提示',
								message: respo.op_msg+'<br>继续扫描？',
								buttons: [{text:'取消', itemId:'cancel'},{text:'切换订单扫描', itemId:'no'},{text:'关键件扫描', itemId:'yes'}],
								fn: function(buttonId) {
									if(buttonId == 'yes'){
										HelcMES.app.getController('CommonCtr').btn_ScanKeyPart();
									}
									if(buttonId == 'no'){
										HelcMES.app.getController('CommonCtr').btn_ConfirmShopOrder();
									}
								}
							});
						}else{
							Ext.toast('扫描处理失败，请稍后重试！',2000);
							return;
						}
					}

					var parameters = {
						procedure : 'KeyPartScanOperation',
						isLoading : true,
						Barcode : tmpbarcode,
						Id : Ext.getCmp('H_Id').getValue(),
						WorkCenterId : Ext.getCmp('SF_WorkCenter').getValue(),
						ShopOrder : Ext.getCmp('D_ShopOrder').getValue(),
					};
										
					MainCtr.getDataFromServer(getResult,parameters);
				}
			},function(data){
				//扫描功能失败 	   
			},"BarcodeScanner","scan",[{showTorchButton:true}]);
		}else{
			//浏览器调试操作
			var tmpbarcode = 'G6990102/TXZ200069/16C000300/XYMLYCXL/EG1-FT/Process:8084885#54b6818f-4079-4384-a4be-3d8acabea611/8084885';
			var getResult = function(res){
				var resp = res.KeyPartScanOperationResponse.KeyPartScanOperationResult;
				if(resp){
					var respo = Ext.JSON.decode(resp);
//					Ext.getCmp('D_ShopOrder').setValue(tmpbarcode.split('/').pop());
					Ext.Msg.show({
						title: '温馨提示',
						message: respo.op_msg+'<br>继续扫描？',
						buttons: [{text:'取消', itemId:'cancel'},{text:'切换订单扫描', itemId:'no'},{text:'关键件扫描', itemId:'yes'}],
						fn: function(buttonId) {
							if(buttonId == 'yes'){
								HelcMES.app.getController('CommonCtr').btn_ScanKeyPart();
							}
							if(buttonId == 'no'){
								HelcMES.app.getController('CommonCtr').btn_ConfirmShopOrder();
							}
						}
					});
				}else{
					Ext.toast('扫描处理失败，请稍后重试！',2000);
					return;
				}
			}

			var parameters = {
				procedure : 'KeyPartScanOperation',
				isLoading : true,
				Barcode : tmpbarcode,
				Id : Ext.getCmp('H_Id').getValue(),
				WorkCenterId : Ext.getCmp('SF_WorkCenter').getValue(),
				ShopOrder : Ext.getCmp('D_ShopOrder').getValue(),
			};
								
			MainCtr.getDataFromServer(getResult,parameters);
		}
	},
	
	btn_ScanShopOrder_Start : function(button,e,eOpts){
		if(Ext.os.is.iOS || Ext.os.is.Android){
			//手机执行cordova操作
			cordova.exec(function(data){
				//扫描正常返回
				//data.cancelled(0代表正常返回扫描值，1表示取消扫描) 
				//data.text(扫描后获取的值) 
				//data.format(被扫描条码的格式)
				if(!data.cancelled){
					var tmpbarcode = data.text;
					tmpbarcode = tmpbarcode.replace("&","_AND_");
					var tmporder = tmpbarcode.split('/').pop();
					var getResult = function(res){
						var resp = res.OrderScanOperationResponse.OrderScanOperationResult;
						if(resp){
							var respo = Ext.JSON.decode(resp);
							Ext.getCmp('D_ShopOrder').setValue(tmporder);
							Ext.Msg.show({
								title: '温馨提示',
								message: respo.op_msg+'<br>当前订单已改变为'+tmporder+'<br>继续扫描？',
								buttons: [{text:'取消', itemId:'cancel'},{text:'工序结束扫描', itemId:'no'},{text:'工序开始扫描', itemId:'yes'}],
								fn: function(buttonId) {
									if(buttonId == 'yes'){
										HelcMES.app.getController('CommonCtr').btn_ScanShopOrder_Start();
									}
									if(buttonId == 'no'){
										HelcMES.app.getController('CommonCtr').btn_ScanShopOrder_End();
									}
								}
							});
						}else{
							Ext.toast('扫描处理失败，请稍后重试！',2000);
							return;
						}
					}

					var parameters = {
						procedure : 'OrderScanOperation',
						isLoading : true,
						Barcode : tmpbarcode,
						Id : Ext.getCmp('H_Id').getValue(),
						WorkCenterId : Ext.getCmp('SF_WorkCenter').getValue(),
						Type : 'start',
					};
										
					MainCtr.getDataFromServer(getResult,parameters);
				}
			},function(data){
				//扫描功能失败 	   
			},"BarcodeScanner","scan",[{showTorchButton:true}]);
		}else{
			//浏览器调试操作
			var tmpbarcode = 'ZZ31255130/TXZ460138/16C000299/XYMLYCXL/EG1-FT/Process:8084514#99b1fe15-62fe-43f4-8899-0b00cee3c9b9/8084514';
			var tmporder = tmpbarcode.split('/').pop();
			var getResult = function(res){
				var resp = res.OrderScanOperationResponse.OrderScanOperationResult;
				if(resp){
					var respo = Ext.JSON.decode(resp);
					Ext.getCmp('D_ShopOrder').setValue(tmporder);
					Ext.Msg.show({
						title: '温馨提示',
						message: respo.op_msg+'<br>当前订单已改变为'+tmporder+'<br>继续扫描？',
						buttons: [{text:'取消', itemId:'cancel'},{text:'工序结束扫描', itemId:'no'},{text:'工序开始扫描', itemId:'yes'}],
						fn: function(buttonId) {
							if(buttonId == 'yes'){
								HelcMES.app.getController('CommonCtr').btn_ScanShopOrder_Start();
							}
							if(buttonId == 'no'){
								HelcMES.app.getController('CommonCtr').btn_ScanShopOrder_End();
							}
						}
					});
				}else{
					Ext.toast('扫描处理失败，请稍后重试！',2000);
					return;
				}
			}

			var parameters = {
				procedure : 'OrderScanOperation',
				isLoading : true,
				Barcode : tmpbarcode,
				Id : Ext.getCmp('H_Id').getValue(),
				WorkCenterId : Ext.getCmp('SF_WorkCenter').getValue(),
				Type : 'start',
			};
								
			MainCtr.getDataFromServer(getResult,parameters);
		}
	},
	
	btn_ScanShopOrder_End : function(button,e,eOpts){
		if(Ext.os.is.iOS || Ext.os.is.Android){
			//手机执行cordova操作
			cordova.exec(function(data){
				//扫描正常返回
				//data.cancelled(0代表正常返回扫描值，1表示取消扫描) 
				//data.text(扫描后获取的值) 
				//data.format(被扫描条码的格式)
				if(!data.cancelled){
					var tmpbarcode = data.text;
					tmpbarcode = tmpbarcode.replace("&","_AND_");
					var tmporder = tmpbarcode.split('/').pop();
					var getResult = function(res){
						var resp = res.OrderScanOperationResponse.OrderScanOperationResult;
						if(resp){
							var respo = Ext.JSON.decode(resp);
							Ext.getCmp('D_ShopOrder').setValue(tmporder);
							Ext.Msg.show({
								title: '温馨提示',
								message: respo.op_msg+'<br>当前订单已改变为'+tmporder+'<br>继续扫描？',
								buttons: [{text:'取消', itemId:'cancel'},{text:'工序开始扫描', itemId:'yes'},{text:'工序结束扫描', itemId:'no'}],
								fn: function(buttonId) {
									if(buttonId == 'yes'){
										HelcMES.app.getController('CommonCtr').btn_ScanShopOrder_Start();
									}
									if(buttonId == 'no'){
										HelcMES.app.getController('CommonCtr').btn_ScanShopOrder_End();
									}
								}
							});
						}else{
							Ext.toast('扫描处理失败，请稍后重试！',2000);
							return;
						}
					}

					var parameters = {
						procedure : 'OrderScanOperation',
						isLoading : true,
						Barcode : tmpbarcode,
						Id : Ext.getCmp('H_Id').getValue(),
						WorkCenterId : Ext.getCmp('SF_WorkCenter').getValue(),
						Type : 'end',
					};
										
					MainCtr.getDataFromServer(getResult,parameters);
				}
			},function(data){
				//扫描功能失败 	   
			},"BarcodeScanner","scan",[{showTorchButton:true}]);
		}else{
			//浏览器调试操作
			var tmpbarcode = 'ZZ31255130/TXZ460138/16C000299/XYMLYCXL/EG1-FT/Process:8084514#99b1fe15-62fe-43f4-8899-0b00cee3c9b9/8084514';
			var tmporder = tmpbarcode.split('/').pop();
			var getResult = function(res){
				var resp = res.OrderScanOperationResponse.OrderScanOperationResult;
				if(resp){
					var respo = Ext.JSON.decode(resp);
					Ext.getCmp('D_ShopOrder').setValue(tmporder);
					Ext.Msg.show({
						title: '温馨提示',
						message: respo.op_msg+'<br>当前订单已改变为'+tmporder+'<br>继续扫描？',
						buttons: [{text:'取消', itemId:'cancel'},{text:'工序开始扫描', itemId:'yes'},{text:'工序结束扫描', itemId:'no'}],
						fn: function(buttonId) {
							if(buttonId == 'yes'){
								HelcMES.app.getController('CommonCtr').btn_ScanShopOrder_Start();
							}
							if(buttonId == 'no'){
								HelcMES.app.getController('CommonCtr').btn_ScanShopOrder_End();
							}
						}
					});
				}else{
					Ext.toast('扫描处理失败，请稍后重试！',2000);
					return;
				}
			}

			var parameters = {
				procedure : 'OrderScanOperation',
				isLoading : true,
				Barcode : tmpbarcode,
				Id : Ext.getCmp('H_Id').getValue(),
				WorkCenterId : Ext.getCmp('SF_WorkCenter').getValue(),
				Type : 'end',
			};
								
			MainCtr.getDataFromServer(getResult,parameters);
		}
	},
	
	btn_quit : function(button,e,eOpts){
		Ext.Msg.show({
			title: '温馨提示',
			message: '是否退出系统？',
			buttons: [{text:'取消', itemId:'no'},{text:'退出', itemId:'yes'}],
			fn: function(buttonId) {
				if(buttonId=='yes'){ 
					viewUtil.goLast();
					Ext.getCmp('userorg').setValue('');
					Ext.getCmp('username').setValue('');
					Ext.getCmp('userpwd').setValue('');
				}
			}
		});
	},

	btn_login : function(button,e,eOpts) {
//		this.BackView();
		var sleepTime = 100;
		if(Ext.os.is.Android){
			sleepTime = 300;
		}
		
		if(Ext.getCmp('username').isFocused){
			Ext.getCmp('username').blur();
		}
		if(Ext.getCmp('userpwd').isFocused){
			Ext.getCmp('userpwd').blur();
		}
		
		var v_userorg = Ext.getCmp('userorg').getValue();
		tmpOrg = v_userorg;
		var v_username = Ext.getCmp('username').getValue();
		var v_userpwd = Ext.getCmp('userpwd').getValue();
		
		if(v_userorg==''){
			Ext.Msg.alert('温馨提示', '请选择组织');
			return false;
		}
		
		if(v_username==''){
			Ext.Msg.alert('温馨提示', '请输入用户名');
			return false;
		}
		
		if(v_userpwd==''){
			Ext.Msg.alert('温馨提示', '请输入密码');
			return false;
		}
		
		setTimeout(HelcMES.app.getController('CommonCtr').doLogin(),sleepTime);
		/*
		var getResult = function(res){
			var resp = res.UserLoginResponse.UserLoginResult;
			if(resp){
				var respo = Ext.JSON.decode(resp);
				if(respo.op_code == '1'){
					Ext.toast(respo.op_msg,2000);
					return;
				}else{
					var v_workcenter = [];
					if(respo.workCenter.length){
						for(var i = 0;i < respo.workCenter.length;i++){
							v_workcenter.push({
								text:respo.workCenter[i],
								value:respo.workCenter[i],
							});
						}
					}else{
						v_workcenter.push({
							text:respo.workCenter,
							value:respo.workCenter,
						});
					}
					viewUtil.goNext('Main');
					Ext.getCmp('D_UserName').setValue(respo.displayname);
					Ext.getCmp('SF_WorkCenter').setOptions(v_workcenter);
					Ext.getCmp('H_Id').setValue(respo.s95id);
					var tmp = [{key:'LoginUserId',value:respo.s95id}];
					cacheUtil.doWrite(tmp);
				}
			}else{
				Ext.toast('登录失败，请稍后重试！',2000);
				return;
			}
		}

		var parameters = {
			procedure : 'UserLogin',
			isLoading : true,
			UserName : v_username,
			UserPwd : v_userpwd
		};
							
		MainCtr.getDataFromServer(getResult,parameters);
		*/
	},
	
	doLogin : function(){
		var loginView = Ext.Viewport.getActiveItem();
		loginView.setDisabled(true);
		
		var getResult = function(res){
			var resp = res.UserLoginResponse.UserLoginResult;
			if(resp){
				var respo = Ext.JSON.decode(resp);
				if(respo.op_code == '1'){
					Ext.toast(respo.op_msg,2000);
				}else{
					var v_workcenter = [];
					if(respo.workCenter.length){
						for(var i = 0;i < respo.workCenter.length;i++){
							v_workcenter.push({
								text:respo.workCenter[i],
								value:respo.workCenter[i],
							});
						}
					}else{
						v_workcenter.push({
							text:respo.workCenter,
							value:respo.workCenter,
						});
					}
					viewUtil.goNext('Main');
					Ext.getCmp('D_UserName').setValue(respo.displayname);
					Ext.getCmp('SF_WorkCenter').setOptions(v_workcenter);
					Ext.getCmp('H_Id').setValue(respo.s95id);
					
					var keys = [
		        	    {ckey:'username',cvalue:respo.s95id},
		        	    {ckey:'userorg', cvalue:Ext.getCmp('userorg').getValue()}
		        	];
					cacheUtil.doWrite(keys);
				}
			}else{
				Ext.toast('登录失败，请稍后重试！',2000);
			}
			loginView.setDisabled(false);
		}

		var parameters = {
			procedure : 'UserLogin',
			isLoading : true,
			UserName : Ext.getCmp('username').getValue(),
			UserPwd : Ext.getCmp('userpwd').getValue()
		};
							
		MainCtr.getDataFromServer(getResult,parameters);
	}
}); 
