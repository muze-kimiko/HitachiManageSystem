
/* JavaScript content from app/controller/OaMobileOffice/ElectronicProcess/InstallProjectCtrl.js in folder common */
Ext.define('HelcPAD.controller.OaMobileOffice.ElectronicProcess.InstallProjectCtrl',{
	extend:'HelcPAD.controller.ApplicationController_OA',
	config:{
		control:{
		
			//我的流程
			"button#installProject_ep_id_MyLC":{
				tap:'installProject_ep_id_MyLC'
			},
			
			//选择电子办公流程
			"list#install_project_list_ep":{
				itemtap:'install_project_list_ep'
			},
			
		}
	},
	
	
	//我的流程
	installProject_ep_id_MyLC:function(){
		this.NextView('MyProcess_id','HelcPAD.view.OaMobileOffice.ElectronicProcess.MyProcess');
		
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
						res.data[cs].class='oa_i_Button_List_Icon_2';
						res.data[cs].color='#854107';
					}else if(res.data[cs].app_name=='信息技术'){
						res.data[cs].icon='i';
						res.data[cs].class='oa_i_Button_List_Icon_2';
						res.data[cs].color='#009ddc';
					}else if(res.data[cs].app_name=='营业,工程业务'){
						res.data[cs].icon='b';
						res.data[cs].class='oa_i_Button_List_Icon_2';
						res.data[cs].color='#fbb726';
					}else if(res.data[cs].app_name=='质量控制'){
						res.data[cs].icon='!';
						res.data[cs].class='oa_i_Button_List_Icon_2';
						res.data[cs].color='#e03a3e';
					}else if(res.data[cs].app_name=='人力资源'){
						res.data[cs].icon='|';
						res.data[cs].class='oa_i_Button_List_Icon_2';
						res.data[cs].color='#fcb827';
					}else if(res.data[cs].app_name=='OA_成都'){
						res.data[cs].icon='|';
						res.data[cs].class='oa_i_Button_List_Icon_2';
						res.data[cs].color='#fcb827';
					}else{
						res.data[cs].icon='h';
						res.data[cs].class='oa_i_Button_List_Icon_2';
						res.data[cs].color='#fcb827';
					}
					
//					//判断subject前面是否加 '/'
//					if(res.data[cs].subject=='null' || res.data[cs].subject==undefined){
//						res.data[cs].subject='';
//					}else{
//						res.data[cs].subject='/'+ res.data[cs].subject;
//					}
        	    	cs++;
			}
			 
			//set到节点选择页面的数据STORE
			var store=Ext.data.StoreManager.get("MyProcessStore");
			if(!store){
				store=Ext.create("HelcOA.store.MyProcess.MyProcessStore");
			}
            
			//判断输出内容
			var listdata=[];
			userSolist=res.data;
			
			var cs=0;
			for(var j=0;j<userSolist.length;j++){
				//分类：日常办公
				if(userSolist[j].proc_name_dist=="工作联络书" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
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
				if(userSolist[j].proc_name_dist=="合同校正章(1)用印申请" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="公务用车联络流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="内部法律咨询流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="境外出差申请" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="法人授权" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="公司规章制度审批流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="物业公司对外合同审批流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="公司对外合同审批流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="会议室申请流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="公司发文流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="投资公司经理出差申请流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="视频设备申请" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="接待客户工作联络流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="PO单审核" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
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
				//分类：提案管理流程
				if(userSolist[j].proc_name_dist=="提案管理流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
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
				}
				//分类：人力资源
				if(userSolist[j].proc_name_dist=="丧假申请流程（派驻人员专用）" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="人员转_调岗申请" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="公积金申请" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				//信息技术
				if(userSolist[j].proc_name_dist=="PDA系统账号流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
			}
			store.setData(listdata);
//			store.setData(userSolist);
			
		};
           
		var myParam = [_vt,userkey];
		var params = {};
		params.adpName = 'HttpAdapter_BPM';
		params.prodNmae = 'toMyTodoListRecord';
		params.prmName = myParam;
		this.connectServerComm(getResult,params);
	},
	
	//选择OA移动办公
	install_project_list_ep : function(obj,index,target,record,e,eOpts){
		var obj_this = this;
		var title = record.data.title;
		if(title == '出差申请'){
			this.NextView('travelRequest_ID','HelcPAD.view.OaMobileOffice.ElectronicProcess.travelRequest.travelRequest');

			// 给出发时间和返回时间添加监听器
			var starttime = Ext.getCmp('starttime');
			starttime.addListener('change',
					obj_this.starttime1, this, {});
			var rettime = Ext.getCmp('rettime');
			rettime.addListener('change', obj_this.rettime,
					this, {});
			var otherfee = Ext.getCmp('otherfee');
			otherfee.addListener('change', obj_this.getcomufee,
					this, {});
			var projectno = Ext.getCmp('projectno');
			projectno.addListener('change', obj_this.projectno,
					this, {});
			var ygh = Ext.getCmp('ygh');
			ygh.addListener('change', obj_this.ygh1, this, {});
			var plant = Ext.getCmp('plant');
			plant.addListener('change', obj_this.outside, this,
					{});
			var area = Ext.getCmp('area');
			area.addListener('change', obj_this.outside, this,
					{});
			Ext.getCmp('qc_surface_ID').setTitle(
				record.data.title);

//////////////////////////////////////////////
			var store=Ext.data.StoreManager.get("startTheProcessStore");
			if(!store){
				store=Ext.create("HelcPAD.store.OaMobileOffice.ElectronicProcess.startTheProcessStore");
			}

			var ibpd = {
				'appid' : store.getAt(0).get('appid'),
				'bpdid' : store.getAt(0).get('bpdid'),
				'bpdname' : store.getAt(0).get('bpdname'),
				'snapshotid' : store.getAt(0).get('snapshotid'),
			};

			var iarg = {'idrafter' : OA_df_usernames};

			var str_ibpd = JSON.stringify(ibpd);
			var str_iarg = JSON.stringify(iarg);
			cc.log(str_ibpd);

			var getResult_1 = function(res) {
				// 获取起草数据
				cc.log("-------------res.startProcessResponse.ovar.data---------------");
				var obj_ovar = eval("("+ res.startProcessResponse.ovar + ")");
				var data = obj_ovar.data;
				var getResult2 = function(res2) {
					try {
						var jsonObj = Ext.JSON.decode(res2.ovar);
						var jsonObj2 = Ext.JSON.decode(jsonObj.data.acti);
						cc.log(jsonObj2.taskid + '  POPO');
						Ext.getCmp("taskid").setValue(jsonObj2.taskid);
						Ext.getCmp("node").setValue(jsonObj2.node.name);
						var n = 0;
						if (jsonObj.data.pur == "")
							jsonObj.data.pur = "{}";
						var purObj = Ext.JSON.decode(jsonObj.data.pur);
						cc.log(purObj + 'ODD');
					} catch (e) {
						cc.log('错误数据！' + e);
					};

					try {
						// for(key in jsonObj.data.fdata.mast){
						for (key in purObj) {
							if(purObj[key] == 0) {
								if (Ext.getCmp(key)) {
									Ext.getCmp(key).setHidden(true);
								};
							}else if (purObj[key] == 1) {
								if (Ext.getCmp(key)) {
									Ext.getCmp(key).setHidden(true);
								}
							} else if (purObj[key] == 2) {
								if (Ext.getCmp(key)) {
									Ext.getCmp(key).setHidden(false);
									var xtypes = Ext.getCmp(key).getXTypes();
									if (xtypes.substring(xtypes.length - 6,xtypes.length) != 'button') {
										Ext.getCmp(key).setReadOnly(true);
									}else {
										Ext.getCmp(key).setDisabled(true);
									};
									Ext.getCmp(key).setZIndex(999);
								};
							} else if (purObj[key] == 3) {
									if (Ext.getCmp(key)) {
										Ext.getCmp(key).setHidden(false);
										var xtypes = Ext.getCmp(key).getXTypes();
										if (xtypes.substring(xtypes.length - 6,xtypes.length) != 'button') {
											Ext.getCmp(key).setReadOnly(false);
										};
									};
							};
						};
					} catch (e) {
						cc.log('权限错误数据！' + e);
					};

					var jsonObj = eval("(" + res2.ovar + ")");
					for (key in jsonObj.data.fdata.mast) {
						try {
							Ext.getCmp(key).setValue(
									jsonObj.data.fdata.mast[key]);
						} catch (e) {
							cc.log('设值错误数据！' + e + ' ' + key);
						};
					};

				};

			var content = {
				method : 'ForApprovalProcess',
				task_id : data.taskid,
				piid : data.piid
			};
			cc.log(content);
			obj_this.connectServer3(getResult2, content);
		};

		var myParam_1 = [ _vt, str_ibpd, str_iarg ];
		cc.log("----myParam = _vt,str_ibpd,str_iarg----");
		cc.log(myParam_1);
		var params1 = {};
		params1.adpName = 'HttpAdapter_BPM';
		params1.prodNmae = 'startTheProcessName';
		params1.prmName = myParam_1;
		obj_this.connectServerComm(getResult_1, params1);

		}else if(title=='接待客户工作联络流程'){
			object = this;
			var obj_this = this;
			var ibpd = {
				'appid' : record.data.appid,
				'bpdid' : record.data.bpdid,
				'bpdname' : record.data.title,
				'snapshotid' : record.data.snapshotid
			};
			var iarg = {
				'idrafter' : usernames
			};
			console.log('测试1：'+JSON.stringify(ibpd));
			console.log('测试2：'+JSON.stringify(iarg));
			var str_ibpd = JSON.stringify(ibpd);
			var str_iarg = JSON.stringify(iarg);
			var bpdname = record.data.title;
			// piid,taskid
			var getResult = function(res) {
				// 获取起草数据
				cc.log("-------------res.startProcessResponse.ovar.data---------------");
				var obj_ovar = eval("("+ res.startProcessResponse.ovar + ")");
				var data = obj_ovar.data;
				console.log('data'+data);
				var getResult2 = function(res2) {
					
					try {
						var jsonObj = Ext.JSON.decode(res2.ovar);
						cc.log('jsonObj:'+jsonObj);
						var jsonObj2 = Ext.JSON.decode(jsonObj.data.acti);
						cc.log(jsonObj2.taskid + '  POPO');
						Ext.getCmp("taskid").setValue(jsonObj2.taskid);
						Ext.getCmp("node").setValue(jsonObj2.node.name);
						var n = 0;
						if (jsonObj.data.pur == "")
							jsonObj.data.pur = "{}";
						var purObj = Ext.JSON.decode(jsonObj.data.pur);
						cc.log(purObj + 'ODD');
					} catch (e) {
						cc.log('错误数据！' + e);
					}
					
					try {
						for (key in purObj) {
							if (purObj[key] == 0) {
								if (Ext.getCmp(key)) {
									Ext.getCmp(key).setHidden(true);
								}
							} else if (purObj[key] == 1) {
								if (Ext.getCmp(key)) {
									Ext.getCmp(key).setHidden(true);
								}
							} else if (purObj[key] == 2) {
								if (Ext.getCmp(key)) {
									Ext.getCmp(key)
											.setHidden(false);
									var xtypes = Ext.getCmp(key)
											.getXTypes();
									if (xtypes.substring(
											xtypes.length - 6,
											xtypes.length) != 'button') {
										Ext.getCmp(key)
												.setReadOnly(true);
									} else {
										Ext.getCmp(key)
												.setDisabled(true);
									}
									Ext.getCmp(key).setZIndex(999);
								}
							} else if (purObj[key] == 3) {
								if (Ext.getCmp(key)) {
									Ext.getCmp(key)
											.setHidden(false);
									var xtypes = Ext.getCmp(key)
											.getXTypes();
									if (xtypes.substring(
											xtypes.length - 6,
											xtypes.length) != 'button') {
										Ext.getCmp(key)
												.setReadOnly(false);
									}
								}
							}
						}
					} catch (e) {
						cc.log('权限错误数据！' + e);
					};
					
					try{
						var jsonObj = eval("(" + res2.ovar + ")");
						for (key in jsonObj.data.fdata.mast) {
							try {
								Ext.getCmp(key).setValue(jsonObj.data.fdata.mast[key]);
							} catch (e) {
								cc.log('设值错误数据！' + e + ' ' + key);
							}
						};
					}catch(e){
						cc.log('权限错误数据！' + e);
					};
					
					
					
				};
			
				var content = {
					method : 'ForApprovalProcess',
					task_id : data.taskid,
					piid : data.piid
				};
			
				cc.log(content);
				obj_this.connectServer3(getResult2, content);
			
			};
			
			var myParam = [ _vt, str_ibpd, str_iarg ];
			cc.log("----myParam = _vt,str_ibpd,str_iarg----");
			cc.log(myParam);
			var params = {};
			params.adpName = 'HttpAdapter_BPM';
			params.prodNmae = 'startTheProcessName';
			params.prmName = myParam;
			obj_this.connectServerComm(getResult, params);

			this.NextView('customerreception_id','HelcPAD.view.OaMobileOffice.ElectronicProcess.ReceptionCustomers.CustomerReception');
			//var aa=Ext.getCmp('wdlc_surface_ID').getTitle(); 
			//console.log('aa');
			
		}else if(title=='境外出差申请'){
		    this.NextView('qc_OverseasTrip_id','HelcPAD.view.OaMobileOffice.ElectronicProcess.OverseasTrip.OverseasTrip');

		    // 给出发时间和返回时间添加监听器
			var starttime = Ext.getCmp('starttime');
			starttime.addListener('change',obj_this.starttime1, this, {});
			var rettime = Ext.getCmp('rettime');
			rettime.addListener('change', obj_this.rettime_jw,this, {});
			var projectno = Ext.getCmp('projectno');
			projectno.addListener('change', obj_this.projectno,this, {});
			var ygh = Ext.getCmp('ygh');
			ygh.addListener('change', obj_this.ygh2, this, {});
			var otherfee = Ext.getCmp('otherfee');
			otherfee.addListener('change', obj_this.FreeInfo,this, {});
			Ext.getCmp('qc_surface_ID').setTitle(record.data.bpdname);

			//////////////////////////////////////////////
			var store=Ext.data.StoreManager.get("startTheProcessStore");
			if(!store){
				store=Ext.create("HelcPAD.store.OaMobileOffice.ElectronicProcess.startTheProcessStore");
			};

			var ibpd = {
				'appid' : store.getAt(0).get('appid'),
				'bpdid' : store.getAt(0).get('bpdid'),
				'bpdname' : store.getAt(0).get('bpdname'),
				'snapshotid' : store.getAt(0).get('snapshotid'),
			};

			var iarg = {'idrafter' : OA_df_usernames};
			var str_ibpd = JSON.stringify(ibpd);
			var str_iarg = JSON.stringify(iarg);
			cc.log(str_ibpd);
			var getResult_1 = function(res) {
				// 获取起草数据
				cc.log("-------------res.startProcessResponse.ovar.data---------------");
				var obj_ovar = eval("("+ res.startProcessResponse.ovar + ")");
				var data = obj_ovar.data;
				var getResult2 = function(res2) {
				try {
					var jsonObj = Ext.JSON.decode(res2.ovar);
					var jsonObj2 = Ext.JSON.decode(jsonObj.data.acti);
					cc.log(jsonObj2.taskid + '  POPO');
					Ext.getCmp("taskid").setValue(jsonObj2.taskid);
					Ext.getCmp("node").setValue(jsonObj2.node.name);
					var n = 0;
					if (jsonObj.data.pur == "")
						jsonObj.data.pur = "{}";
					var purObj = Ext.JSON.decode(jsonObj.data.pur);
					cc.log(purObj + 'ODD');

				} catch (e) {
					cc.log('错误数据！' + e);
				}
				try {
					// for(key in jsonObj.data.fdata.mast){
					for (key in purObj) {
						
						if (purObj[key] == 0) {
							if (Ext.getCmp(key)) {
								Ext.getCmp(key).setHidden(true);
							}
						} else if (purObj[key] == 1) {
							if (Ext.getCmp(key)) {
								Ext.getCmp(key).setHidden(true);
							}
						} else if (purObj[key] == 2) {
							if (Ext.getCmp(key)) {
								Ext.getCmp(key)
										.setHidden(false);
								var xtypes = Ext.getCmp(key)
										.getXTypes();
								if (xtypes.substring(
										xtypes.length - 6,
										xtypes.length) != 'button') {
									Ext.getCmp(key)
											.setReadOnly(true);
								} else {
									Ext.getCmp(key)
											.setDisabled(true);
								}
								Ext.getCmp(key).setZIndex(999);
							}
						} else if (purObj[key] == 3) {
							if (Ext.getCmp(key)) {
								Ext.getCmp(key)
										.setHidden(false);
								var xtypes = Ext.getCmp(key)
										.getXTypes();
								if (xtypes.substring(
										xtypes.length - 6,
										xtypes.length) != 'button') {
									Ext.getCmp(key)
											.setReadOnly(false);
								}
							}
						}
					}
				} catch (e) {
					cc.log('权限错误数据！' + e);
				}

				var jsonObj = eval("(" + res2.ovar + ")");
				for (key in jsonObj.data.fdata.mast) {
					try {
						Ext.getCmp(key).setValue(
								jsonObj.data.fdata.mast[key]);
					} catch (e) {
						cc.log('设值错误数据！' + e + ' ' + key);
					}
				}

			};

			var content = {
				method : 'ForApprovalProcess',
				task_id : data.taskid,
				piid : data.piid
			};
			cc.log(content);
			obj_this.connectServer3(getResult2, content);

		};

		var myParam_1 = [ _vt, str_ibpd, str_iarg ];
		cc.log("----myParam = _vt,str_ibpd,str_iarg----");
		cc.log(myParam_1);
		var params1 = {};
		params1.adpName = 'HttpAdapter_BPM';
		params1.prodNmae = 'startTheProcessName';
		params1.prmName = myParam_1;
		obj_this.connectServerComm(getResult_1, params1);

			
			
		};
	},
	
	// 监听-出差申请-出发时间
	starttime1 : function(obj, newDate, oldDate, eOpts) {
		var tempEndTime = Ext.getCmp('rettime').getValue()
				+ " " + "00:00:00";
		var tempStartTime = newDate + " " + "00:00:00";
		if (newDate != '') {
			if (Ext.getCmp('rettime').getValue() != '') {
				if (Date.parse(tempStartTime) > Date
						.parse(tempEndTime)) {
					Ext.Msg.alert("出发时间不大于返回时间");
					WL.Toast.show("出发时间不大于返回时间");
					obj.setValue(oldDate);
					return;
				}
			}
		}
	},
	
	// 境外出差
	rettime_jw : function(obj, newDate, oldDate, eOpts) {
		var obj_this = this;
		var tempEndTime = newDate + " " + "00:00:00";
		var tempStartTime = Ext.getCmp('starttime').getValue()
				+ " " + "00:00:00";
		if (newDate != '') {
			if (Ext.getCmp('starttime').getValue() != '') {
				if (Date.parse(tempStartTime) > Date
						.parse(tempEndTime)) {
					Ext.Msg.alert("返回时间不小于出发时间");
					WL.Toast.show("返回时间不小于出发时间");
					obj.setValue(oldDate);
					return;
				} else {
					obj_this.FreeInfo();
				}
			} else {
				Ext.Msg.alert("请先完成预计出发时间");
				WL.Toast.show("请先完成预计出发时间");
				obj.setValue('');
				return;
			}
		}

	},
	
	
	// 境外出差
	FreeInfo : function() {
		var obj_this = this;
		var IdArray = [ 'peonum', 'peonum2', 'peonum3',
				'starttime', 'rettime', 'country' ];
		if (this.isRequired(IdArray)) {
			return;
		}
		var gj = Ext.getCmp('country').getValue();
		gj = encodeURIComponent(gj);
		var pcode = '/unioa/processdata.nsf/getjwbt?openagent&unid='
				+ gj + '&_dc=&callback=';
		var getResult = function(res) {
			if (res.html.body != '()') {
				var data3 = eval(res.html.body);
				var data = data3.data;
				cc.log(data);
				var bz = data[0].bz;

				var peonum = parseFloat(Ext.getCmp('peonum')
						.getValue());
				var peonum2 = parseFloat(Ext.getCmp('peonum2')
						.getValue());
				var peonum3 = parseFloat(Ext.getCmp('peonum3')
						.getValue());
				var starttime = Ext.getCmp('starttime')
						.getValue();
				var rdate = Ext.getCmp('rettime').getValue();

				var days = obj_this.compareDate(rdate,
						starttime, "-");

				var fs1 = parseFloat(data[0].fs1);
				var fs2 = parseFloat(data[0].fs2);
				var fs3 = parseFloat(data[0].fs3);

				var zs1 = parseFloat(data[0].zs1);
				var zs2 = parseFloat(data[0].zs2);
				var zs3 = parseFloat(data[0].zs3);

				var bt1 = parseFloat(data[0].bt1);
				var bt2 = parseFloat(data[0].bt2);
				var bt3 = parseFloat(data[0].bt3);
				var feesum = days * peonum * (fs1 + zs1 + bt1)
						+ days * peonum2 * (fs2 + zs2 + bt2)
						+ days * peonum3 * (fs3 + zs3 + bt3);
				Ext.getCmp('biz').setValue(bz);
				Ext.getCmp('prefee').setValue(feesum);
				Ext
						.getCmp('feesum')
						.setValue(
								feesum
										+ parseFloat(Ext
												.getCmp(
														'otherfee')
												.getValue()));
			}
		};

		var params = {};
		params.method = 'OverseasFree';
		params.parameters = [ pcode ];
		cc.log(params);
		this.connectServer_OA(getResult, params);
	},
	
	
	rettime : function(obj, newDate, oldDate, eOpts) {
		var obj_this = this;
		var tempEndTime = newDate + " " + "00:00:00";
		var tempStartTime = Ext.getCmp('starttime').getValue()
				+ " " + "00:00:00";
		if (newDate != '') {
			if (Ext.getCmp('starttime').getValue() != '') {
				if (Date.parse(tempStartTime) > Date
						.parse(tempEndTime)) {
					Ext.Msg.alert("返回时间不小于出发时间");
					WL.Toast.show("返回时间不小于出发时间");
					obj.setValue(oldDate);
					return;
				} else {
					obj_this.getcomufee();
				}
			} else {
				Ext.Msg.alert("请先完成预计出发时间");
				WL.Toast.show("请先完成预计出发时间");
				obj.setValue('');
				return;
			}
		}

	},
	getcomufee : function() {
		var ygh = Ext.getCmp('ygh').getValue();
		var node = Ext.getCmp('node').getValue();
		if (node == "起草") {
			if (ygh == "") {
				Ext.Msg.alert("请输入出差人员工编号!");
				return false;
			}
			if (ygh != "") {
				this.getfee();
			}
		}
	},
	projectno : function(obj, newDate, oldDate, eOpts) {
		if (Ext.getCmp('ifyfxm').getValue() == "否") {
			return;
		}
		;
		var getResult = function(res) {
			if (res.body != "()") {
				var data3 = eval(res.html.body);
				var data = data3.data;

				if (data[0].Success == "true") {
					Ext.getCmp('projectname').setValue(
							data[0].ProjectCode);
				} else {
					Ext.Msg.alert('此项目号不存在');
					Ext.getCmp('projectname').setValue('');
				}
			}
			cc.log("---res---");
			cc.log(res);
		};
		var projectno = Ext.getCmp('projectno').getValue();
		var params = {};
		params.method = 'ProjectNoInfo';
		params.parameters = [ projectno ];
		this.connectServer_OA(getResult, params);
	},
	// 监听出差申请，工号改变
	ygh1 : function(obj, newDate, oldDate, eOpts) {
		var obj_this = this;
		var getResult = function(res) {
			if (res.body != "()") {
				var data1 = res.body.substring(1,
						res.body.length);
				var data2 = data1
						.substring(0, data1.length - 1);
				var data = eval("(" + data2 + ")");
				var data = data.data;
				Ext.getCmp('query_xm').setValue();
				// 把数据填充到页面
				Ext.getCmp('query_xm').setValue(
						data[0].emp_name);
				Ext.getCmp('query_bm').setValue(data[0].bm7);
				Ext.getCmp('query_zw').setValue(data[0].zhiwu);
				Ext.getCmp('subject').setValue(
						data[0].emp_name + "出差申请");
				Ext.getCmp('kzno').setValue(data[0].dep_empid7);
				Ext.getCmp('kzname')
						.setValue(data[0].dep_name7);
				Ext.getCmp('bzno').setValue(data[0].dep_empid6);
				Ext.getCmp('bzname')
						.setValue(data[0].dep_name6);
				Ext.getCmp('bbzno')
						.setValue(data[0].dep_empid5);
				Ext.getCmp('bbzname').setValue(
						data[0].dep_name5);
				Ext.getCmp('zjlno').setValue(data[0].zcno);
				Ext.getCmp('zjlname').setValue(data[0].zcname);
				cc.log(data);
				obj_this.outside(obj_this);
			} else {
				Ext.Msg.alert("找不到你输入的工号");
				WL.Toast.show("找不到你输入的工号，请输入8位员工编号。");
			}
			cc.log("---res---");
			cc.log(res);
		}
		var id = Ext.getCmp('ygh').getValue();
		this.connectServer_oa(getResult, id);
	},
	
	// 监听(境外出差申请)，工号改变
	ygh2 : function(obj, newDate, oldDate, eOpts) {
		var obj_this = this;
		var getResult = function(res) {
			if (res.body != "()") {
				var data1 = res.body.substring(1,
						res.body.length);
				var data2 = data1
						.substring(0, data1.length - 1);
				var data = eval("(" + data2 + ")");
				var data = data.data;
				Ext.getCmp('query_xm').setValue();
				// 把数据填充到页面
				Ext.getCmp('query_xm').setValue(
						data[0].emp_name);
				Ext.getCmp('dep').setValue(data[0].bm7);
				// Ext.getCmp('query_zw').setValue(data[0].zhiwu);
				Ext.getCmp('subject').setValue(
						data[0].emp_name + "境外出差申请");
				Ext.getCmp('kzno').setValue(data[0].dep_empid7);
				Ext.getCmp('kzname')
						.setValue(data[0].dep_name7);
				Ext.getCmp('bzno').setValue(data[0].dep_empid6);
				Ext.getCmp('bzname')
						.setValue(data[0].dep_name6);
				Ext.getCmp('bbzno')
						.setValue(data[0].dep_empid5);
				Ext.getCmp('bbzname').setValue(
						data[0].dep_name5);
				Ext.getCmp('zjlno').setValue(data[0].zcno);
				Ext.getCmp('zjlname').setValue(data[0].zcname);
				Ext.getCmp('guoji').setValue(data[0].guoji);
				Ext.getCmp('sendreader').setValue(
						data[0].emp_name + " " + ygh);

				cc.log(data);
				// obj_this.outside();
			} else {
				Ext.Msg.alert("找不到你输入的工号");
				WL.Toast.show("找不到你输入的工号，请输入8位员工编号。");
			}
			cc.log("---res---");
			cc.log(res);
		}
		var id = Ext.getCmp('ygh').getValue();
		var params = {};
		params.method = 'GetygbhData';
		params.parameters = [ id ];
		// Ext.Msg.alert(paramss.parameters[id]);
		// this.connectServer_OA(getResult,params);
		this.connectServer_oa(getResult, id);
	},
	
	
	outside : function(obj) // 出差申请计算审批途径
	{
		var obj = this;
		// 定义相关变量
		var frm = document.all;
		var zw = Ext.getCmp('query_zw').getValue();
		var zjl = Ext.getCmp('zjlname').getValue();
		var zjlno = Ext.getCmp('zjlno').getValue();
		var bbz = Ext.getCmp('bbzname').getValue();
		var bbzno = Ext.getCmp('bbzno').getValue();
		var bz = Ext.getCmp('bzname').getValue();
		var bzno = Ext.getCmp('bzno').getValue();
		var kz = Ext.getCmp('kzname').getValue();
		var kzno = Ext.getCmp('kzno').getValue();
		var starttime = Ext.getCmp('starttime').getValue();
		var rdate = Ext.getCmp('rettime').getValue();
		var staytime = obj.compareDate(rdate, starttime, "-")
		var ygbh = Ext.getCmp('ygh').getValue();
		var area = Ext.getCmp('area').getValue();
		obj.getcomufee();
		var plant = Ext.getCmp('plant').getValue();

		var tmp1 = "";
		var tmp2 = "";
		var tmp3 = "";
		var tmp4 = "";
		// 定义完毕

		if (zw == "总裁" || zw == "副总裁") { // 总裁级出差
			Ext.Msg.alert('总裁、副总裁出差不需要填写本流程！');
			return false;
		} else if (zw == "总经理" || zw == "主任" || zw == "主席"
				|| ygbh == "00001323") { // 总经理级出差，总裁审批
			if (zjl == "") {
				Ext.Msg.alert('总裁角色提取失败，请联系信息技术科！');
				return false;
			} else {
				Ext.getCmp('way').setValue(zjl + " " + zjlno);
				Ext.getCmp('waypath').setValue("1");
				Ext.getCmp('firflow').setValue(
						zjl + " " + zjlno);
				return false;
			}
		} else if (zw == "部长" || zw == "副部长" || zw == "总监"
				|| zw == "副总监" || zw == "总经理助理") { // 部长级出差
			if (area == "省内") { // 部长级境内出差
				if (bbz != "") {
					Ext.getCmp('way').setValue(
							bbz + " " + bbzno);
					Ext.getCmp('waypath').setValue("1");
					Ext.getCmp('firflow').setValue(
							bbz + " " + bbzno);
					return false;
				} else {
					Ext.Msg.alert('不能查询到您的直属领导，请联系信息技术科！');
					return false;
				}
			}
			if (area == "省外") { // 部长级境外出差
				if (bbz != "" && zjl != "") {
					tmp1 = bbz + " " + bbzno;
					tmp2 = zjl + " " + zjlno;
					Ext.getCmp('way').setValue(tmp1);
					Ext.getCmp('waypath').setValue("1");
					Ext.getCmp('firflow').setValue(tmp1);
					return false;
				} else {
					Ext.Msg.alert('不能查询到您的直属领导，请联系信息技术科！');
					return false;
				}
			}
		} else if (zw == "科长" || zw == "经理" || zw == "部长助理"
				|| zw == "总监助理") { // 科长级出差
			if (area == "省内") { // 科长级境内出差
				if (plant == "否") { // 不须乘机
					if (bz != "") { // 存在部长级领导提交部长级审批
						Ext.getCmp('way').setValue(
								bz + " " + bzno);
						Ext.getCmp('waypath').setValue("1");
						Ext.getCmp('firflow').setValue(
								bz + " " + bzno);
						return false;
					} else {
						if (bbz != "") { // 不存在部长级领导提交本部长级审批
							Ext.getCmp('way').setValue(
									bbz + " " + bbzno);
							Ext.getCmp('waypath').setValue("1");
							Ext.getCmp('firflow').setValue(
									bbz + " " + bbzno);
							return false;
						} else {
							Ext.Msg
									.alert('不能查询到您的直属领导，请联系信息技术科！');
							return false;
						}
					}
				}
				if (plant == "是") { // 须要乘机
					if (bz != "" && bbz != "") { // 存在部长级领导提交部长及本部长审批
						tmp1 = bz + " " + bzno;
						tmp2 = bbz + " " + bbzno;
						Ext.getCmp('way').setValue(
								tmp1 + "-->" + tmp2);
						Ext.getCmp('waypath').setValue("2");
						Ext.getCmp('firflow').setValue(tmp1);
						Ext.getCmp('secflow').setValue(tmp2);
						return false;
					} else if (bz == "" && bbz != "") { // 不存在部长级领导提交本部长审批
						Ext.getCmp('way').setValue(
								bbz + " " + bbzno);
						Ext.getCmp('waypath').setValue("1");
						Ext.getCmp('firflow').setValue(
								bbz + " " + bbzno);
						return false;
					} else {
						Ext.Msg.alert('不能查询到您的直属领导，请联系信息技术科！');
					}
				}
			}
			if (area == "省外") { // 科长级境外出差
				if (bz != "" && bbz != "" && zjl != "") { // 存在部长级领导提交部长、本部长、总裁审批
					tmp1 = bz + " " + bzno;
					tmp2 = bbz + " " + bbzno;

					Ext.getCmp('way').setValue(
							tmp1 + "-->" + tmp2);
					Ext.getCmp('waypath').setValue("2");
					Ext.getCmp('firflow').setValue(tmp1);
					Ext.getCmp('secflow').setValue(tmp2);
					return false;
				} else if (bz == "" && bbz != "" && zjl != "") { // 不存在部长级领导提交本部长、总裁审批
					tmp1 = bbz + " " + bbzno;
					Ext.getCmp('way').setValue(tmp1);
					Ext.getCmp('waypath').setValue("2");
					Ext.getCmp('firflow').setValue(tmp1);
					return false;
				} else {
					Ext.Msg.alert('不能查询到您的直属领导或总经理，请联系信息技术科！');
				}
			}
		} else {
			if (area == "省内") { // 普通员工境内出差
				if (plant == "否") { // 不须乘机
					if (staytime > 1) { // 发生费用或非当日出差
						if (kz != "" && bz != "") { // 提交科长、部长审批
							tmp1 = kz + " " + kzno;
							tmp2 = bz + " " + bzno;
							Ext.getCmp('way').setValue(
									tmp1 + "-->" + tmp2);
							Ext.getCmp('waypath').setValue("2");
							Ext.getCmp('firflow')
									.setValue(tmp1);
							Ext.getCmp('secflow')
									.setValue(tmp2);
							return false;
						} else if (kz == "" && bz != "") { // 科长为空，提交部长审批
							Ext.getCmp('way').setValue(
									bz + " " + bzno);
							Ext.getCmp('waypath').setValue("1");
							Ext.getCmp('firflow').setValue(
									bz + " " + bzno);
							return false;
						} else {
							Ext.Msg
									.alert('不能查询到您的直属领导或部领导，请联系信息技术科！');
						}
					} else { // 不发生费用且当日出差
						if (kz != "") { // 提交科长审批
							Ext.getCmp('way').setValue(
									kz + " " + kzno);
							Ext.getCmp('waypath').setValue("1");
							Ext.getCmp('firflow').setValue(
									kz + " " + kzno);
							return false;
						} else if (kz == "" && bz != "") { // 科长为空，提交部长审批
							Ext.getCmp('way').setValue(
									bz + " " + bzno);
							Ext.getCmp('waypath').setValue("1");
							Ext.getCmp('firflow').setValue(
									bz + " " + bzno);
							obj.worry();
							return false;
						} else {
							Ext.Msg
									.alert('不能查询到您的直属领导或部领导，请联系信息技术科！');
						}
					}
				}
				if (plant == "是") { // 须要乘机
					if (kz != "" && bz != "" && bbz != "") { // 提交科长、部长、本部长审批
						tmp1 = kz + " " + kzno;
						tmp2 = bz + " " + bzno;
						tmp3 = bbz + " " + bbzno;
						Ext.getCmp('way').setValue(
								tmp1 + "-->" + tmp2 + "-->"
										+ tmp3);
						Ext.getCmp('waypath').setValue("3");
						Ext.getCmp('firflow').setValue(tmp1);
						Ext.getCmp('secflow').setValue(tmp2);
						Ext.getCmp('thiflow').setValue(tmp3);
						return false;
					} else if (kz == "" && bz != ""
							&& bbz != "") { // 科长为空，提交部长、本部长审批
						tmp1 = bz + " " + bzno;
						tmp2 = bbz + " " + bbzno;
						Ext.getCmp('way').setValue(
								tmp1 + "-->" + tmp2);
						Ext.getCmp('waypath').setValue("2");
						Ext.getCmp('firflow').setValue(tmp1);
						Ext.getCmp('secflow').setValue(tmp2);
						return false;
					} else if (kz == "" && bz == ""
							&& bbz != "") { // 科长、部长为空，提交本部长审批
						Ext.getCmp('way').setValue(
								bbz + " " + bbzno);
						Ext.getCmp('waypath').setValue("1");
						Ext.getCmp('firflow').setValue(
								bbz + " " + bbzno);
						return false;
					} else {
						Ext.Msg
								.alert('不能查询到您的直属领导或部领导，请联系信息技术科！');
					}
				}
			}
			if (area == "省外") { // 普通员工境外出差
				if (kz != "" && bz != "" && bbz != ""
						&& zjl != "") { // 提交科长、部长、本部长、总裁审批
					tmp1 = kz + " " + kzno;
					tmp2 = bz + " " + bzno;
					tmp3 = bbz + " " + bbzno;
					tmp4 = zjl + " " + zjlno;
					Ext.getCmp('way').setValue(
							tmp1 + "-->" + tmp2 + "-->" + tmp3);
					Ext.getCmp('waypath').setValue("3");
					Ext.getCmp('firflow').setValue(tmp1);
					Ext.getCmp('secflow').setValue(tmp2);
					Ext.getCmp('thiflow').setValue(tmp3);
					return false;
				} else if (kz == "" && bz != "" && bbz != ""
						&& zjl != "") { // 科长为空，提交部长、本部长、总裁审批
					tmp1 = bz + " " + bzno;
					tmp2 = bbz + " " + bbzno;

					Ext.getCmp('way').setValue(
							tmp1 + "-->" + tmp2);
					Ext.getCmp('waypath').setValue("2");
					Ext.getCmp('firflow').setValue(tmp1);
					Ext.getCmp('secflow').setValue(tmp2);
					return false;
				} else if (kz == "" && bz == "" && bbz != ""
						&& zjl != "") { // 科长、部长为空，提交本部长、总裁审批
					tmp1 = bbz + " " + bbzno;

					Ext.getCmp('way').setValue(tmp1);
					Ext.getCmp('waypath').setValue("1");
					Ext.getCmp('firflow').setValue(tmp1);
					return false;
				} else {
					Ext.Msg.alert('不能查询到您的直属领导或部领导，请联系信息技术科！');
				}
			}
		}

	},
	getfee : function() {
		var obj_this = this;
		var ygh = Ext.getCmp('ygh').getValue();
		var zw = Ext.getCmp('query_zw').getValue();
		var place = Ext.getCmp('place').getValue();
		var area = Ext.getCmp('area').getValue();
		var jt;
		var getResult = function(res) {
			cc.log(res);
			if (res.body != "()") {
				var data1 = res.body.substring(1,
						res.body.length);
				var data2 = data1
						.substring(0, data1.length - 1);
				var data3 = eval("(" + data2 + ")");
				var data = data3.data;
				cc.log(data);
				if (area == "省内") {
					jt = 200;
				} else {
					jt = 1600;
				}

				country = data[0].guoji;
				if (country == "日本") {
					level = "1"; // 级别为总经理成员or日方人员
					zs = 650;
					bt = 120;
				} else {
					if (zw == "总裁" || zw == "副总裁"
							|| zw == "总经理" || zw == "副总经理"
							|| zw == "主任" || zw == "主席") {
						level = "1";
						zs = 650;
						bt = 120;
					} else if (zw == "部长" || zw == "副部长"
							|| zw == "总监" || zw == "副总监"
							|| zw == "总经理助理") {
						level = "2";
						zs = 500;
						bt = 100;
					}

					else {
						level = "3";
						zs = 400;
						bt = 80;
					}
				}
				var starttime = Ext.getCmp('starttime')
						.getValue();
				var rdate = Ext.getCmp('rettime').getValue();
				var peonum = Ext.getCmp('peonum').getValue();
				var days = obj_this.compareDate(rdate,
						starttime, "-");
				prefee = (jt + zs * (days - 1) + bt * days)
						* peonum;
				// alert("交通费："+jt+"住宿：" + zs + "补贴："+bt + "天数："
				// + days);
				Ext.getCmp('prefee').setValue(prefee);
				Ext.getCmp('feesum')
						.setValue(
								prefee
										+ parseInt(Ext.getCmp(
												'otherfee')
												.getValue()));
			}
		};

		this.connectServer_oa(getResult, ygh);
	},
	compareDate : function(first, second, sign) {
		fArray = first.split(sign);
		sArray = second.split(sign);
		var fDate = new Date(fArray[0], fArray[1], fArray[2]);
		var sDate = new Date(sArray[0], sArray[1], sArray[2]);
		var t = Math.abs(fDate.getTime() - sDate.getTime());
		var days = t / (1000 * 60 * 60 * 24) + 1;
		return days;
	},
	
});