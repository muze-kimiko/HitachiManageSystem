
/* JavaScript content from app/controller/loginCtrl.js in folder common */
Ext.define('HelcOA.controller.loginCtrl', {
	extend : 'HelcOA.controller.ApplicationController',
	id : 'loginCtrl_id',
	config : {
		control : {
			"button#loginID" : {
				tap : 'init1'
			},
		}
	},
	init1 : function() {
		var obj = this;
		object = obj;
		//屏蔽当前输入域以隐藏键盘
		var actItem = Ext.Viewport.getActiveItem();
		actItem.setDisabled(true);

		var obj5 = this;
		var userid = Ext.getCmp('username_id').getValue();
		usernames = userid;
		password = Ext.getCmp('password_id').getValue();
		console.log("usernames : "+usernames);
		console.log("password : "+password);
		getResult = function(res) {
			cc.log(res);
			if(typeof(res)=="undefined"){
				Ext.Msg.alert("服务器出错!");
//				WL.Toast.show("服务器出错!");
			} else if (res.isSuccessful == false) {
				Ext.Msg.alert('用户名或者密码错误!');
//				WL.Toast.show('用户名或者密码错误!');
			} else if (res.isSuccessful == true) {
				username = res.data.username;
				_vt = res.data._vt;
				userkey = res.data.userkey;

				//调用刷新首页列表
				obj.loadMenus(_vt,'WebServiceTest',0);

				obj5.NextView('Menus_id', 'HelcOA.view.Menus');
				obj5.getApplication().getController(
						'HelcOA.controller.MenusCtrl').ininData();

				//登录成功后判断记录登录账号			
				var checkuser = 1;//Ext.getCmp('checkuser').getValue();
				if (checkuser == 1) {
					WL.EncryptedCache.write("Loginuser", userid,
							onWrite1Success, onWrite1Failure);
					function onWrite1Success(status) {
						console.log('记录登录账号成功');
						console.log('userid : ' + userid);
					}
					function onWrite1Failure(status) {
						if (status = WL.EncryptedCache.EOC_CLOSED) {
							console.log('记录登录账号失败');
						}
					}

				} else {
					WL.EncryptedCache.write("Loginuser", null, onWrite0Success,
							onWrite0Failure);
					function onWrite0Success(status) {
						console.log('删除上上次记录的账号成功');
					}
					function onWrite0Failure(status) {
						if (status = WL.EncryptedCache.EOC_CLOSED) {
							console.log('删除上上次记录的账号失败');
						}
					}
				}
				
				//订阅推送通知
//				doSubscribe();

			}
			actItem.setDisabled(false);  //恢复输入能力
		};
		var content = {
			name : usernames,
			password : password
		};
		this.connectServer2(getResult, content);
	},
	
	
	loadMenus : function(name,method,flag){
		var obj = this;
		var store = obj.getStore('MenusS','HelcPDA.store.MenusS');
		var store2 = obj.getStore('MenusS2','HelcPDA.store.MenusS2');
		store.setData([]);
		getResult2 = function(result) {
			var toDoListResponse = result.toDoListResponse;
			var tdr_str = result.toDoListResponse.ovar;
			tdr_str = tdr_str.replace('\"股神\"', '股神');
			tdr_str = tdr_str.replace('\"123\"', '123');
			//					tdr_str = "{'out':{name:'TOME'}}";	

			var tdr_ovar = eval("(" + tdr_str + ")");
			cc.log('tdr_ovar.status.code | '+tdr_ovar.status.code);
			cc.log('result.isSuccessful | '+result.isSuccessful);
			if(tdr_ovar.status.code!=200 && result.isSuccessful==true){
				Ext.Msg.alert(tdr_ovar.status.msg+",请重新登录");
				WL.Toast.show(tdr_ovar.status.msg+",请重新登录");
				return;
			}
			_vt = tdr_ovar._nvt;
			var list = [];
			//					var list2=[];

			for (var i = 0; i < tdr_ovar.data.length; i++) {

				var a = tdr_ovar.data[i].app_name.split('_');

				list[i] = tdr_ovar.data[i];

				list[i].app_name = a[1];
				var b = tdr_ovar.data[i].proc_name.split(':');
				list[i].proc_name = b[0];

				if (list[i].app_name == '日常办公') {
					list[i].icon = 'O';
					list[i].class = 'i_Button_List_Icon_2';
					list[i].color = '#854107';
				} else if (list[i].app_name == '信息技术') {
					list[i].icon = 'i';
					list[i].class = 'i_Button_List_Icon_2';
					list[i].color = '#009ddc';
				} else if (list[i].app_name == '营业,工程业务') {
					list[i].icon = 'b';
					list[i].class = 'i_Button_List_Icon_2';
					list[i].color = '#fbb726';
				} else if (list[i].app_name == '质量控制') {
					list[i].icon = '!';
					list[i].class = 'i_Button_List_Icon_2';
					list[i].color = '#e03a3e';
				} else if (list[i].app_name == '人力资源') {
					list[i].icon = '|';
					list[i].class = 'i_Button_List_Icon_2';
					list[i].color = '#fcb827';
				} else {
					list[i].icon = 'h';
					list[i].class = 'i_Button_List_Icon_2';
					list[i].color = '#fcb827';
				}

				if (list[i].subject == 'null'
						|| list[i].subject == undefined) {
					list[i].subject = '(无标题)';
				} else {
					//								list[i].subject='/'+list[i].subject ;
				}
			}

			//判断输出内容
			var listdata = [];
			var cs = 0;
			for (var j = 0; j < list.length; j++) {
				//分类：日常办公
				if (list[j].proc_name == "工作联络书" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				if (list[j].proc_name == "出差申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				if (list[j].proc_name == "用印申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				if (list[j].proc_name == "合同校正章(1)用印申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				if (list[j].proc_name == "公务用车联络流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}

				if(list[j].proc_name=="公司发文流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs]=list[j];
					cs++;
				}
				if(list[j].proc_name=="公司对外合同审批流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-"){
					listdata[cs]=list[j];
					cs++;
				}
				if (list[j].proc_name == "公司规章制度审批流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs]=list[j];
					cs++;
				}
				if(list[j].proc_name=="会议室申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs]=list[j];
					cs++;
				}
				if(list[j].proc_name=="视频设备申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs]=list[j];
					cs++;
				}
				if (list[j].proc_name == "内部法律咨询流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs]=list[j];
					cs++;
				}
				if (list[j].proc_name == "法人授权" && list[j].subject != "(无标题)"&& list[j].flag != "null") {
					listdata[cs]=list[j];
					cs++;
				}
				if(list[j].proc_name=="接待客户工作联络流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs]=list[j];
					cs++;
				}
				if(list[j].proc_name=="物业公司对外合同审批流程" && list[j].flag != "null" && list[j].subject != "-"){
					listdata[cs]=list[j];
					cs++;
				}
				if (list[j].proc_name == "境外出差申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
						listdata[cs] = list[j];
						cs++;
				}
				if(list[j].proc_name == "PO单审核") {
					listdata[cs] = list[j];
					cs++;
				}
				if (list[j].proc_name == "投资公司经理出差申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				//分类：营业/工程业务
				if (list[j].proc_name == "维修改造工程业务联络流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				if (list[j].proc_name == "非标报告作业处理流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				if (list[j].proc_name == "诉讼审批流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				if (list[j].proc_name == "开具发票" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				//分类：提案管理流程
				if (list[j].proc_name == "提案管理流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				//分类：质量控制
				if (list[j].proc_name == "开箱补缺件及不良问题反馈报告" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
//				if (list[j].proc_name == "质量部投诉流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
//					listdata[cs] = list[j];
//					cs++;
//				}
				if (list[j].proc_name == "三包申请报告" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				
				//分类：人力资源
				if (list[j].proc_name == "丧假申请流程（派驻人员专用）" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
			}
			store2.setData(listdata);
			var init_data = [];
			for(var ii=0;ii<10;ii++){
				if(typeof(listdata[ii])=="undefined"){
					break;
				}else{
					init_data.push(listdata[ii]);
				}
			}
			store.setData(init_data);
			cc.log("---list.length---");
			cc.log(list.length);
			cc.log(listdata.length);
			obj.getApplication().getController('HelcOA.controller.MenusCtrl').ininData();
			if(typeof(flag)!="undefined" && flag==1){
//				obj.NextView('Menus_id', 'HelcOA.view.Menus');
			}
		};
		
		var content = {
			name : name,
			method : method
		};
		obj.connectServer(getResult2, content);
	},
	
	
});
