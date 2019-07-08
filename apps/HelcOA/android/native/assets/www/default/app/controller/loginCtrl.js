
/* JavaScript content from app/controller/loginCtrl.js in folder common */
/* JavaScript content from app/controller/loginCtrl.js in folder common */
var MaaS360Info="";
var IsEnrollMaaS360="Y";
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
	
	MaaS360Detect : function() {
		cordova.exec(isOk,isFailure,'MaaS360Detect','init',[]);
		function isOk(resultdatas) {
			if(resultdatas != "SDKisSuccess"){
				MaaS360Info = resultdatas;
				IsEnrollMaaS360="N";
			}else{
				IsEnrollMaaS360="Y";
			}
		}
		function isFailure(data) {
			alert('MaaS360检测失败了!');
		};
	},
	
	init1 : function() {
		var obj = this;
		object = obj;
		if (Ext.os.is.Android && IsEnrollMaaS360 == "N") {
			alert(MaaS360Info);
			return null;
		}

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
			} else if (res.isSuccessful == false) {
				Ext.Msg.alert('用户名或者密码错误!');
			} else if (res.isSuccessful == true) {
				username = res.data.username;
				_vt = res.data._vt;
				userkey = res.data.userkey;
				
				//调用刷新首页列表
				console.log("_vt:"+_vt);
				console.log("userkey:"+userkey);
				obj.loadMenus(_vt,'WebServiceTest',0);
				obj5.NextView('Menus_id', 'HelcOA.view.Menus');
				obj5.getApplication().getController( 'HelcOA.controller.MenusCtrl' ).ininData();
				
				//登录成功后判断记录登录账号	
				var checkuser = Ext.getCmp('checkuser').getValue();
				if (checkuser == 1) {
					WL.EncryptedCache.write("Loginuser", userid, onWrite1Success, onWrite1Failure);
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
					WL.EncryptedCache.write("Loginuser", null, onWrite0Success,onWrite0Failure);
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
		var content = {name : usernames,password : password};
		obj.connectServer2(getResult, content);

	},
	
	
	loadMenus : function(name,method,flag){
		var obj = this;
		var store = obj.getStore('MenusS','HelcPDA.store.MenusS');
		var store2 = obj.getStore('MenusS2','HelcPDA.store.MenusS2');
		store.setData([]);
		getResult2 = function(result) {
			var toDoListResponse = result.toDoListResponse;
			var tdr_str = result.toDoListResponse.ovar;
//			tdr_str = tdr_str.replace('\"股神\"', '股神');
//			tdr_str = tdr_str.replace('\"123\"', '123');
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
				} else if (list[j].proc_name == "出差申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "用印申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "合同校正章(1)用印申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "公务用车联络流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if(list[j].proc_name=="公司发文流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs]=list[j];
					cs++;
				} else if(list[j].proc_name=="公司对外合同审批流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-"){
					listdata[cs]=list[j];
					cs++;
				} else if (list[j].proc_name == "公司规章制度审批流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs]=list[j];
					cs++;
				} else if(list[j].proc_name=="会议室申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs]=list[j];
					cs++;
				} else if(list[j].proc_name=="视频设备申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs]=list[j];
					cs++;
				} else if (list[j].proc_name == "内部法律咨询流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs]=list[j];
					cs++;
				} else if (list[j].proc_name == "法人授权" && list[j].subject != "(无标题)"&& list[j].flag != "null") {
					listdata[cs]=list[j];
					cs++;
				} else if(list[j].proc_name=="接待客户工作联络流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs]=list[j];
					cs++;
				} else if(list[j].proc_name=="物业公司对外合同审批流程" && list[j].flag != "null" && list[j].subject != "-"){
					listdata[cs]=list[j];
					cs++;
				} else if (list[j].proc_name == "境外出差申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
						listdata[cs] = list[j];
						cs++;
				} else if(list[j].proc_name == "PO单审核") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "投资公司经理出差申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else
				//分类：营业/工程业务
				if (list[j].proc_name == "维修改造工程业务联络流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "非标报告作业处理流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "诉讼审批流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "开具发票" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "律师函审批流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "诉讼和解审批流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "短交货期流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "短安装期联络工作流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "电梯_扶梯发货计划" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "非正常发货要求联络书流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "质量保函申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "承兑汇票申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "提前开票申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}else if (list[j].proc_name == "外经证申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				//分类：提案管理流程
				else if (list[j].proc_name == "提案管理流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				//分类：质量控制
				if (list[j].proc_name == "开箱补缺件及不良问题反馈报告" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else //if (list[j].proc_name == "质量部投诉流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
//					listdata[cs] = list[j];
//					cs++;
//				} else 
				if (list[j].proc_name == "三包申请报告" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "公司级投诉处理流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "欠料发货电子流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else 
				
				//分类：人力资源
				if (list[j].proc_name == "丧假申请流程（派驻人员专用）" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "公积金申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "人员转_调岗申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "培训设施借用流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "探亲假申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];					
					cs++;
				} else if (list[j].proc_name == "应届毕业生实习培训计划流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "婚假_产假申请流程（派驻人员专用）" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "年度计划外培训需求申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else 
				//信息技术
				if (list[j].proc_name == "PDA系统账号流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "PDA系统设备新增或维修流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "软件维护申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "IT故障申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "数据恢复申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "数据维护申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "系统网络账号权限申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "供应商信息维护流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "客户信息维护流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "用户权限申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "设备_配件借用申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else 
				//信息
				if (list[j].proc_name == "档案借阅或复印申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				//天津
				if (list[j].proc_name == "天津合同审批流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "天津公务用车申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "天津设备_配件借用申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "天津公司发文流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "天津合理化提案流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "天津出差申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "天津产品退货流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "天津IT故障申告流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "天津电脑资料用户申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "天津电脑资料用户申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "天津信息系统帐号权限申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "天津软件维护流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else 
				//制造管理
				if (list[j].proc_name == "井道图变更通知单流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "供应商首批供货流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else 
				
				//上海
				if (list[j].proc_name == "上海会议室申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "上海出差申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "上海印章申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "上海请休假申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "上海转岗申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "上海合同审批申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "上海用车申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "上海年度计划外培训申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "上海品质异常处理流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else 
				//成都
				if (list[j].proc_name == "成都出差申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "成都会议室申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "成都公务用车申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "成都发文流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "成都培训设施使用流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "成都请休假流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "成都年度计划外培训" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "成都合同审批流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "成都接待客户流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "成都用印申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "成都人员转调岗流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "成都档案借阅申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "成都规章制度" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "基建报修" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else 
				//扶梯
				if (list[j].proc_name == "扶梯出差申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "扶梯公积金申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "扶梯公司发文流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "扶梯境外出差申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "扶梯用印申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "扶梯供应商首批供货流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "扶梯采购价格变更审批" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "扶梯欠料发货电子流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else 
				//财务
				if (list[j].proc_name == "用款申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "营分司固定资产申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "采购价格变更审批管理" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else 
				//HB日滨类流程
				if (list[j].proc_name == "HB_出差申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "HB_加班申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "HB_考勤补登申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "HB_离司手续办理" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "HB_离职申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "HB_请假申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "HB_人力需求申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "HB_外派人员补贴申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "HB_外出申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "HB_用印申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "HB_用车申请表" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "HB_证书借阅使用申请表" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "HB_员工寄件申请审批表" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}else if (list[j].proc_name == "HB_非生产使用物资申购表" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}else if (list[j].proc_name == "HB_网络资源申请表" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				else if (list[j].proc_name == "HB_班车交通补贴申请撤销申请单" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				else if (list[j].proc_name == "HB_施工许可申请危险作业申请审批表" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				else if (list[j].proc_name == "HB_物资电子放行条" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				else if (list[j].proc_name == "HB_物资需求申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				else if (list[j].proc_name == "HB_生产物料供应比例设置修改申请表" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				else if (list[j].proc_name == "HB_供应商调拨申请单" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				else if (list[j].proc_name == "HB_客户产品返销申请单" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				else if (list[j].proc_name == "HB_销售价格价目表申请流程" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				else if (list[j].proc_name == "HB_空进空出申请表" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				else if (list[j].proc_name == "HB_ERP系统采购信息变更申请表" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				else if (list[j].proc_name == "HB_工装生产治具设备配件采购申请单" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				
				else if (list[j].proc_name == "HB_产品租赁出库申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					
					listdata[cs] = list[j];
					cs++;
				}
               else if (list[j].proc_name == "HB_客户新增及资料变更申请" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
               else if (list[j].proc_name == "HB_物流平台合同及需财务审批文件用印申请表" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
               else if (list[j].proc_name == "HB_访客参观申请表" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}

               else if (list[j].proc_name == "HB_培训过程记录及试用期鉴定" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}
				/* else if (list[j].proc_name == "" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				} else if (list[j].proc_name == "" && list[j].subject != "(无标题)"&& list[j].flag != "null" && list[j].subject != "-") {
					listdata[cs] = list[j];
					cs++;
				}*/

				console.log("control Test");

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
