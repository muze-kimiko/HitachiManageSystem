
/* JavaScript content from app/controller/oa/OAProcessCtrl.js in folder common */
Ext.define('HelcPDA.controller.oa.OAProcessCtrl',{
	extend:'HelcPDA.controller.ApplicationController_OA',
	config:{
		control:{
			//返回首页
			"button#OA_back":{
				tap:'OA_back'
			},
			//进入起草流程
			"button#btn_startProcess":{
				tap:'btn_startProcess'
			},
			//标签切换到已结束加载已结束流程
			"tabpanel#OA_tabpanel":{
				activeitemchange:'OA_tabpanel'
			},
		}
	},
	
	OA_back : function(){
		this.BackView();
//		this.showBackView('MenusView_id','HelcPDA.view.MenusView');
	},
	
	btn_startProcess : function(){
		this.NextView('qc_StartProcess_id','HelcPDA.view.oa.startTheProcess.startTheProcess');
	},
	
	//已结束
	OA_tabpanel : function(obj, value, oldValue, eOpts ){
		var obj_this = this;
		if(value.id=="OA_yjs_cont"){
			var store = obj_this.getStore('HasEndedStore','HelcPDA.store.oa.HasEnded.HasEndedStore');
			if(store.data.items.length==0){
				var getResult=function(res){
					cc.log('----已结束 res----');
					cc.log(res);
				    var d=res.PROCESSDOCReturn.CDATA.replace("\"\"null\"\"","null");
				    var data=d.replace("\"\"null\"\"","null");
					cc.log(data);
					cc.log(d);
					
					
					var CDATA_json = eval("("+ data +")");
					
					var userSolist=[];
					var cs = 0;//下标
					for(var i=0;i<CDATA_json.data.length;i++){
						userSolist[cs]=CDATA_json.data[cs];
						cc.log(userSolist[cs]);
						cs++;
					}
					
					
					//判断输出内容
					var listdata=[];
					var cs=0;
					for(var j=0;j<userSolist.length;j++){
						/*if(userSolist[j].processname=="工作联络书" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
							listdata[cs]=userSolist[j];
							cs++;
						}
						if(userSolist[j].processname=="出差申请" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
							listdata[cs]=userSolist[j];
							cs++;
						}
						if(userSolist[j].processname=="用印申请" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
							listdata[cs]=userSolist[j];
							cs++;
						}
						//分类：营业/工程业务
						if(userSolist[j].processname=="维修改造工程业务联络流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
							listdata[cs]=userSolist[j];
							cs++;
						}
						if(userSolist[j].processname=="非标报告作业处理流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
							listdata[cs]=userSolist[j];
							cs++;
						}
						if(userSolist[j].processname=="诉讼审批流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
							listdata[cs]=userSolist[j];
							cs++;
						}
						if(userSolist[j].processname=="开具发票" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
							listdata[cs]=userSolist[j];
							cs++;
						}
						//分类：质量控制
						if(userSolist[j].processname=="三包申请报告" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
							listdata[cs]=userSolist[j];
							cs++;
						}
						if(userSolist[j].processname=="开箱补缺件及不良问题反馈报告" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
							listdata[cs]=userSolist[j];
							cs++;
						}*/
						//分类：提案管理流程
						if(userSolist[j].processname=="提案管理流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
							listdata[cs]=userSolist[j];
							cs++;
						}
					}
					store.setData(listdata);
					
				};
		           
				var myParam = [OA_usernames];
				var params = {};
				params.adpName = 'HttpAdapter_OA';
				params.prodNmae = 'Getenddoc';
				params.prmName = myParam;
				obj_this.connectServerComm(getResult,params);
			}
		}
	},
	
	
	//我的流程
	WDLZ:function(obj, e, eOpts){
		var obj_this = this;
		//set到节点选择页面的数据STORE
		var store= obj_this.getStore('MyProcessStore','HelcPDA.store.oa.MyProcess.MyProcessStore');
		store.setData([]);
		var HasEndedStore = obj_this.getStore('HasEndedStore','HelcPDA.store.oa.HasEnded.HasEndedStore');
		HasEndedStore.setData([]);
		var getResult=function(res){
			var userSolist=[];
			var cs = 0;//下标
			for(var i=0;i<res.data.length;i++){

				//去掉_前面的字符
				if(res.data[cs].app_name!=null && res.data[cs].subject!=undefined){
					var a=res.data[cs].app_name.split('_');
				}

				userSolist[cs]=res.data[cs];
				if(typeof(a)!='undefined'){
					userSolist[cs].app_name=a[1];
				}

					if(res.data[cs].app_name=='日常办公'){
						res.data[cs].icon='O';
						res.data[cs].class='i_Button_List_Icon_2';
						res.data[cs].color='#854107';
					}else if(res.data[cs].app_name=='信息技术'){
						res.data[cs].icon='i';
						res.data[cs].class='i_Button_List_Icon_2';
						res.data[cs].color='#009ddc';
					}else if(res.data[cs].app_name=='营业,工程业务'){
						res.data[cs].icon='b';
						res.data[cs].class='i_Button_List_Icon_2';
						res.data[cs].color='#fbb726';
					}else if(res.data[cs].app_name=='质量控制'){
						res.data[cs].icon='!';
						res.data[cs].class='i_Button_List_Icon_2';
						res.data[cs].color='#e03a3e';
					}else if(res.data[cs].app_name=='人力资源'){
						res.data[cs].icon='|';
						res.data[cs].class='i_Button_List_Icon_2';
						res.data[cs].color='#fcb827';
					}else if(res.data[cs].app_name=='OA_成都'){
						res.data[cs].icon='|';
						res.data[cs].class='i_Button_List_Icon_2';
						res.data[cs].color='#fcb827';
					}else{
						res.data[cs].icon='h';
						res.data[cs].class='i_Button_List_Icon_2';
						res.data[cs].color='#fcb827';
					}
					
        	    	cs++;
			}

			//判断输出内容
			var listdata=[];
			userSolist=res.data;
			var cs=0;
			for(var j=0;j<userSolist.length;j++){
				//分类：日常办公
				/*if(userSolist[j].proc_name_dist=="工作联络书" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="出差申请" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="用印申请" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				//分类：营业/工程
				if(userSolist[j].proc_name_dist=="维修改造工程业务联络流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="非标报告作业处理流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="诉讼审批流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="开具发票" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				//分类：质量控制
				if(userSolist[j].proc_name_dist=="三包申请报告" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="开箱补缺件及不良问题反馈报告" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}*/
				//分类：提案管理流程
				if(userSolist[j].proc_name_dist=="提案管理流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
			}
			store.setData(listdata);
			
		};
           
		var myParam = [_vt,userkey,OA_ygbh];
		var params = {};
		params.adpName = 'HttpAdapter_BPM';
		params.prodNmae = 'toMyTodoListRecord';
		params.prmName = myParam;
		this.connectServerComm(getResult,params);
	},
	
	//1、判断是否有OA账号 ,如果有，把OA公共账号信息改成该登录用户信息 2、如果该PDA登录人员已经离职，则进不了OA模块
	CheckOaAcCount : function(){
		var obj = this;
		var getResult=function(res){
			var returnData = eval("("+ res.CHECKOAACCOUNTReturn.CDATA +")");
			cc.log(returnData);
			//该PDA登录用户已经离司
			if(returnData.data.flag=="LZ"){
				WL.Toast.show("该用户无OA权限或已离职");
				return;
			}
			if(returnData.data.flag=="OA"){
				cc.log("有OA账号");
				OA_usernames = returnData.data.agentman;
				OA_dept = returnData.data.dept;
				OA_userid = returnData.data.df_id;
				OA_df_usernames = returnData.data.agentman;
				OA_df_id = OA_ygbh;
			}
			if(returnData.data.flag=="-"){
				cc.log("无OA账号");
				OA_usernames = returnData.data.agentman;
				OA_dept = returnData.data.dept;

				OA_df_usernames = returnData.data.agentman;
				OA_df_id = OA_ygbh;
			}
			obj.login();
		};
		
		var ygbh_String = "00000000"+userid;
		OA_ygbh = ygbh_String.substring(ygbh_String.length-8,ygbh_String.length);
//		OA_ygbh = '00000019';
		var params = {};
		params.method = 'CheckOaAcCount';
		params.parameters = [OA_ygbh];
		this.connectServer_OA(getResult,params);
	},
	
	//登录OA
	login : function() {
		var obj = this;
		getResult = function(res) {
			cc.log(res);
			if(typeof(res)=="undefined"){
				WL.Toast.show("服务器出错!");
			} else if (res.isSuccessful == false) {
				WL.Toast.show('用户名或者密码错误!');
			} else if (res.isSuccessful == true) {
				_vt = res.data._vt;
				userkey = res.data.userkey;
				obj.NextView('OAProcess_id','HelcPDA.view.oa.OAProcess');
				obj.WDLZ();
			}
		};
		var content = {
			name : 'pdapubuser',
			password : password
		};
		cc.log('!!')
		cc.log(content)
		this.connectServer2(getResult, content);
	},
	
});