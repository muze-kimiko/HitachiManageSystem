Ext.define('HelcPAD.controller.OaMobileOffice.ElectronicProcess.startTheProcessNameCtrl',
				{
					extend : 'HelcPAD.controller.ApplicationController',
					id : 'qc_StartprocessNameCtrl_id',
					config : {
						control : {
							"list#qc_StartprocessNameList" : {
								itemtap : 'init1'
							},
							// 进入选择结点
							'button#qc_ToSelectNode' : {
								tap : 'qc_ToSelectNode',
							},
							// 返回上一页
							'button#qc_returnStartTheProcessName_ID' : {
								tap : 'qc_returnStartTheProcessName',
							},
						}
					},

					// 返回到上级页面
					qc_returnStartTheProcessName : function() {
						//this.delProcess();
						//var ViewId = Ext.Viewport.getActiveItem().id;
						this.BackView('installProject_oa_id','HelcPAD.view.OaMobileOffice.installProject');
//						this
//								.showBackView('qc_StartprocessName_id',
//										'HelcOA.view.startTheProcess.startTheProcessName');
//						var store = this
//								.getStore('personnelSelectionS',
//										'HelcOA.store.startTheProcess.DailyOffice.Idea.personnelSelectionS');
//						store.setData([]);
//						var viewName = Ext.getCmp(ViewId);
//						if (viewName) {
//							viewName.destroy();
//						}
					},

					delProcess : function() {
						var obj_this = this;
						var taskid = Ext.getCmp('taskid').getValue();
						var action = "submit";
						var _notice = "";
						var _ext = "";
						var ovar = "";
						var procname = Ext.getCmp('qc_bpdname').getValue();

						// data数据
						var data = {
							"audit" : {
								"userid" : Ext.getCmp('userid').getValue(),
								"dept" : Ext.getCmp('dept').getValue(),
								"type" : Ext.getCmp('type').getValue(),
								"username" : Ext.getCmp('username').getValue(),
								"node" : Ext.getCmp('node').getValue(),
								"taskid" : Ext.getCmp('taskid').getValue()
							},
							"piid" : Ext.getCmp('piid').getValue(),
							"mast" : {}
						};
						// cc.log(dataArray);
						// for(var i=0;i<dataArray.length;i++){
						// var dataId = dataArray[i];
						// cc.log(dataId);
						// var dataMast = Ext.getCmp(dataId).getValue();
						// data.mast[dataId]=dataMast;
						// }
						data.mast.ext1 = "OA_PDA";
						for (key in actionform.data.mast) {
							try {
								data.mast[key] = Ext.getCmp(key).getValue();
							} catch (e) {
							}
						}

						// flowto数据
						_flowto = {};

						_flowto.fork = {};
						_flowto.fork.conds = "del";
						// query数据
						var query = {
							"ext1" : "OA_PDA",
							"piid" : Ext.getCmp('piid').getValue(),
							"billno" : Ext.getCmp('fileno').getValue(),
							"df_name" : Ext.getCmp('agentman').getValue(),
							"df_time" : Ext.getCmp('createdate').getValue(),
							"dep_name" : Ext.getCmp('dept').getValue(),
						};

						_flowto = JSON.stringify(_flowto);
						data = JSON.stringify(data);
						query = JSON.stringify(query);
						JSON.stringify(query);
						var getResult3 = function(res) {
							cc.log("return---res");
							cc.log(res);
							cc.log('返回，取消起草');
						};
						var content = {
							method : 'DrafterSubmit',
							param : [ _vt, taskid, action, _flowto, data,
									query, _notice, _ext, procname ]
						};

						this.connectServer4(getResult3, content, '2');
						cc.log("-------content params-------");
						cc.log(content);

					},

					// 选择结点公共方法
					public_ToSelectNode : function() {
						var obj_this = this;
						var bpdName = Ext.getCmp('qc_bpdname').getValue();
						var conds = Ext.getCmp('conds').getValue();
						var store = this
								.getStore('approvalOpinionS',
										'HelcOA.store.startTheProcess.DailyOffice.Idea.approvalOpinionS');
						store.setData([]);
						var getResult3 = function(res) {
							var jsonObj = Ext.JSON.decode(res.ovar);
							var acti = Ext.JSON.decode(jsonObj.data.acti);
							actionform.acti = acti;
							actionform.pur = jsonObj.data.pur;
							actionform.curuser = jsonObj.data.curuser;
							actionform.query = "";
							actionform.action = "";
							actionform.flowto = {};
							actionform.data = jsonObj.data.fdata;

							var next = Ext.JSON.decode(jsonObj.data.acti.next);
							if (acti.node == undefined || acti.node == null
									|| acti.node == "" || acti.node == {}) {
								Ext.Msg.alert('不存在！');
							} else {
								var lines = acti.node.cfg.lines;
								var userSolist = [];

								for (var nb = 0; nb < lines.length; nb++) {
									var tp_data = {};
									tp_data.to = lines[nb].to;// 节点ID
									tp_data.name = lines[nb].name;// 节点名
									tp_data.conds = lines[nb].conds;// 节点条件
									tp_data.forkname = lines[nb].forkname;// 节点流向分支
									tp_data.nextacti = acti.node.cfg.nextacti;// 选择条件
									tp_data.anyflag = acti.node.cfg.assign.anyflag;// 是否允许任意选择(0|1)
									tp_data.multflag = acti.node.cfg.assign.multflag;// 是否0单选，1多选
									tp_data.multqty = acti.node.cfg.assign.multqty;// 多选最大数量
									tp_data.url = getAjaxOption(lines[nb].to,
											acti);// 获取人员URL
									tp_data.cfg = getNextCFG(lines[nb].to, acti);// 对应节点配置信息
									cc.log(tp_data.cfg);

									// 根据不用流程和流程所提交的数据，对流程结点的显示不同
									if (lines[nb].conds != ""
											&& conds.indexOf(lines[nb].conds) != -1) {
										userSolist.push(tp_data);
									} else if (lines[nb].conds == ""
											&& conds.indexOf("@") != -1) {
										userSolist.push(tp_data);
									} else if (conds == "nocon" || conds == "") {
										userSolist.push(tp_data);
									}
									;
								}
								;

								store.setData(userSolist);
								var ViewId = Ext.Viewport.getActiveItem().id;
								obj_this
										.NextView('qc_approvalOpinion_ID',
												'HelcOA.view.startTheProcess.DailyOffice.Idea.approvalOpinion');
								// 存储页面ID，用于提交数据后销毁
								Ext.getCmp('QC_View_id').setValue(ViewId);
							}
						};
						var taskid = Ext.getCmp('taskid').getValue();
						var piid = Ext.getCmp('piid').getValue();
						var content = {
							method : 'ForApprovalProcess',
							'task_id' : taskid,
							'piid' : piid
						};
						cc.log(content);
						obj_this.connectServer3(getResult3, content);

					},

					// 进入选择结点
					qc_ToSelectNode : function() {
						// 流程名称
						// 分类：日常办公
						var bpdName = Ext.getCmp('qc_bpdname').getValue();
						alert(bpdName);
						if (bpdName == "用印申请") {
							// 验证必填
							var IdArray = [ 'agentman', 'subject', 'fenshu',
									'sqliyou_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						} else if (bpdName == "出差申请") {
							// 验证必填
							var IdArray = [ 'ygh', 'prefee', 'otherfee',
									'feesum', 'phone', 'subject', 'place',
									'starttime', 'rettime', 'reason_textarea',
									'peonum', 'projectno', 'projectname' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							var IdTrave = [ 'ygh', 'sendmobile', 'sendnumber',
									'plant', 'phone_sfz', 'phone' ];
							// 验证出差申请起草是否符合格式
							if (!this.traveRequestCheck(IdTrave)) {
								return;
							}
							this.worry();
							this.getcomufee();
							this
									.getApplication()
									.getController(
											'startTheProcess.DailyOffice.travelRequestCtrl')
									.FreeControl();
							return;

						} else if (bpdName == "工作联络书") {
							// 判断必填
							var IdArray = [ 'subject', 'neirong_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						} else if (bpdName == "公司对外合同审批流程") {
							var IdArray = [ 'subject', 'nextcontractno',
									'addr', 'sqliyou_textarea',
									'caiwureason_textarea', 'paytype', 'lxdh',
									'htfs', 'contractyear' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							this.worry3();
						} else if (bpdName == "公司发文流程") {
							var IdArray = [ 'subject', 'fwtype' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							;
							var ng = Ext.getCmp('nigaoZY').getValue();
							if (!this.GSFW_checkvalue34(ng)) {
								return;
							}
							;

						} else if (bpdName == "公司规章制度审批流程") {
							var IdArray = [ 'fileno', 'subject', 'hqflag',
									'smflag', 'lastdate', 'phone', 'wdbh',
									'bbh' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							// 判断制度首发的话需要输入文档目录
							if (!this.checkvalue34a()) {
								return;
							}
						} else if (bpdName == "会议室申请流程") {
							var IdArray = [ 'phone', 'subject',
									'meetcontect_textarea', 'zcr', 'startdate',
									'shour', 'sminu', 'ehour', 'eminu',
									'meetpeo' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							this
									.getApplication()
									.getController(
											'startTheProcess.DailyOffice.MeetingRoomReservationCtrl')
									.checkvalue52();
						} else if (bpdName == "合同校正章(1)用印申请") {
							var IdArray = [ 'agentman', 'subject', 'fenshu',
									'sqliyou_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						} else if (bpdName == "内部法律咨询流程") {
							var IdArray = [ 'zxlx', 'subject',
									'reason_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						} else if (bpdName == "接待客户工作联络流程") {
							var IdArray = [ 'ccompany', 'num', 'company',
									'subject', 'lfkh', 'pt', 'dh', 'yyy',
									'lfkh', 'zw', 'tel' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						} else if (bpdName == "公务用车联络流程") {
							var IdArray = [ 'agentman', 'subject', 'ycdate',
									'sj', 'ycdate1', 'sj1', 'lxr', 'lxrdh',
									'ycrs', 'place', 'xicheng_textarea',
									'reasion_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							// 检验是否需要短信通知和判断手机号码格式是否正确,传入选择组件id和短息通知号码组件id
							if (!this.sendNumberCheck('sendmobile',
									'sendnumber')) {
								return;
							}
							// 检验联系电话是否正确
							// if(!this.phoneCheck('lxrdh')){
							// return
							// }
						} else if (bpdName == "物业公司对外合同审批流程") {
							var IdArray = [ 'subject', 'nextcontractno',
									'addr', 'sqliyou_textarea',
									'caiwureason_textarea', 'paytype', 'lxdh',
									'htfs', 'contractyear' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							this.worry4();
						} else if (bpdName == "境外出差申请") {
							var IdArray = [ 'ygh', 'dep', 'subject', 'peonum',
									'peonum2', 'peonum3', 'starttime',
									'rettime',
									// 'fysm1','fysm2','fysm3','fysm4','fysm5',
									'qystyle', 'country', 'feesum2', 'addr',
									'otherfee', 'biz', 'reason_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							this.worry2();
							this.FreeInfo();
							this.getApplication().getController(
									'startTheProcess.DailyOffice.OverseasCtrl')
									.FreeControl();
							return;
						} else if (bpdName == "法人授权") {
							var IdArray = [ 'bsqr', 'phone', 'qwwcsj', 'yxnyq',
									'yxnyz', 'subject', 'sqly' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						} else if (bpdName == "投资公司经理出差申请流程") {
							var IdArray = [ 'agentman', 'phone', 'sendreader',
									'subject', 'place', 'starttime',
									'staytime', 'items', 'visitor',
									'reason_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						} else if (bpdName == "视频设备申请") {
							var IdArray = [ 'lxr', 'lxdh', 'subject', 'leader',
									'sdate', 'stime', 'edate', 'etime',
									'summary' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						} else if (bpdName == "接待客户工作联络流程") {
							var IdArray = [ 'ccompany', 'num', 'company',
									'subject', 'lfkh', 'zw', 'tel', 'pt', 'dh',
									'yyy', 'typeq1' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						}
						// 分类：营业/工程业务
						else if (bpdName == "维修改造工程业务联络流程") {
							var IdArray = [ 'apellation', 'address', 'party',
									'phone', 'date', 'count', 'regh', 'phone2',
									'subject', 'report_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							this
									.getApplication()
									.getController(
											'startTheProcess.BusinessService.MaintainTransformCtrl')
									.setvaluedate();
						}
						// 分类：质量控制
						else if (bpdName == "开箱补缺件及不良问题反馈报告") {
							var IdArray = [ 'dpm', 'bjm', 'wtm', 'subject',
									'ts', 'yhmc', 'qwclqx', 'jjdz', 'yb',
									'shr', 'phone', 'shr_2', 'phone_2', 'scgh',
									'azdw', 'azzz', 'hth', 'beizhu_textarea',
									'bgrphone' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							if (!this.getApplication().getController(
									'startTheProcess.QualityControl.KXBQJCtrl')
									.checkvalue18()) {
								return;
							}
							;
						} else if (bpdName == "三包申请报告") {
							var IdArray = [ 'subject', 'bdtype', 'serviceaddr',
									'acceptor', 'acceptno', 'produceno', 'hth',
									'dhdw', 'typeno', 'power', 'checkdate',
									'sertime', 'parts', 'partsxh', 'errdate',
									'errorstatus', 'errcontent', 'textarea',
									'textarea2', 'textarea3' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							if (!this
									.getApplication()
									.getController(
											'startTheProcess.QualityControl.ThreeGuaranteesCtrl')
									.checkvalue()) {

							}
						} else if (bpdName == "质量部投诉流程") {
							var IdArray = [ 'subject', 'customname', 'tsflag',
									'tel', 'contractno', 'tsdate',
									'tscontect_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						}

						else if (bpdName == "非标报告作业处理流程") {
							var IdArray = [ 'createdate', 'phone2', 'subject',
									'report_textarea', 'apellation', 'address',
									'party', 'phone', 'date', 'produceno',
									'model', 'floor', 'date1', 'date2', 'unit',
									'count', 'refermodel' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						} else if (bpdName == "诉讼审批流程") {
							var IdArray = [ 'hth', 'xmxz', 'dwmc1', 'dwdz1',
									'phone1', 'lxr1', 'htdep', 'httype', 'ts1',
									'ts2', 'paymoney', 'reason_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							if (!this
									.getApplication()
									.getController(
											'startTheProcess.BusinessService.litigationApproveCtrl')
									.checkvalue35()) {
								return;
							}
						}
						// 分类：提案管理流程
						else if (bpdName == "提案管理流程") {
							var IdArray = [ 'no', 'sname', 'tel', 'subject',
									'xzzy_textarea', 'gszy_textarea',
									'xgzy_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							if (!this
									.getApplication()
									.getController(
											'startTheProcess.ProposalManage.PM_TAGLLC_NGCtrl')
									.commit()) {
								return;
							}
						}else if(bpdName == "丧假申请流程（派驻人员专用）"){
							var IdArray = [ 'qjr', 'subject', 'level1',
											'kqy', 'startdate','enedate','reason_textarea'];
									if (this.isRequired(IdArray)) {
										return;
									}
									// 检验是否需要短信通知和判断手机号码格式是否正确,传入选择组件id和短息通知号码组件id
									if (!this.sendNumberCheck('sendmobile',
											'sendnumber')) {
										return;
									}		
						}else if(bpdName == "人员转_调岗申请"){
							var IdArray = [];
									if (this.isRequired(IdArray)) {
										return;
									}
									// 检验是否需要短信通知和判断手机号码格式是否正确,传入选择组件id和短息通知号码组件id
									if (!this.sendNumberCheck('sendmobile',
											'sendnumber')) {
										return;
									}		
						}else if(bpdName == "公积金申请"){
							var IdArray = ['subject', 'qwlqsj','ygh','gfsj'];
							if (this.isRequired(IdArray)) {
								return;
							}
							// 检验是否需要短信通知和判断手机号码格式是否正确,传入选择组件id和短息通知号码组件id
							if (!this.sendNumberCheck('sendmobile',
									'sendnumber')) {
								return;
							}
						}
						//信息技术
						else if(bpdName == "PDA系统账号流程"){
							var IdArray = ['subject'];
							if (this.isRequired(IdArray)) {
								return;
							}		
						}else {
							alert('该流程名字有误，请联系管理员');
							return;
						}
						this.public_ToSelectNode();
					},

					init1 : function(obj, index, target, record, e, eOpts) {
						var obj_this = this;
                        
						var ibpd = {
							'appid' : record.data.appid,
							'bpdid' : record.data.bpdid,
							'bpdname' : record.data.bpdname,
							'snapshotid' : record.data.snapshotid
						};
						
						var iarg = {
							'idrafter' : usernames
						};
						cc.log('----iarg----');
						cc.log(iarg);
						var str_ibpd = JSON.stringify(ibpd);
						var str_iarg = JSON.stringify(iarg);
						var bpdname = record.data.bpdname;
						Ext.getCmp('qc_bpdname').setValue(record.data.bpdname);
						// 分类：日常办公
						if (bpdname == '工作联络书') {
							this
									.NextView('qc_jobContactBook_ID',
											'HelcOA.view.startTheProcess.DailyOffice.jobContactBook');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
							Ext.getCmp('qc_bpdname').setValue(
									record.data.bpdname);
						} else if (bpdname == '出差申请') {
							this
									.NextView('travelRequest_ID',
											'HelcOA.view.startTheProcess.DailyOffice.travelRequest');
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
									record.data.bpdname);
						} else if (bpdname == '用印申请') {
							Ext.Msg.alert("请在电脑端起草！");
							return;
							this
									.NextView('qc_useStamp_id',
											'HelcOA.view.startTheProcess.DailyOffice.useStamp');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
						} else if (bpdname == '公司发文流程') {
							Ext.Msg.alert("请在电脑端起草！");
							return;
							this
									.NextView('qc_companyOutgoing_ID',
											'HelcOA.view.startTheProcess.DailyOffice.companyOutgoing');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
							Ext.getCmp('qc_bpdname').setValue(
									record.data.bpdname);
							// 初始化
							Ext.getCmp('bzr').setValue(record.data.bpdname);
							// 选择文档归档位置
							var xzwdgdwz = Ext.getCmp('catalogname');
							xzwdgdwz.setHidden(true);
							// 为ID添加唯一方法
							var fwtype = Ext.getCmp('fwtype');
							fwtype.addListener('change', obj_this.GSFWLC_lclx,
									this, {});
							// 选择正文
							/*
							 * var zwdoc=Ext.getCmp('zwdoc');
							 * zwdoc.addListener('change',obj_this.GSWF_selzw('zwdocunid'),this,{
							 * });
							 */

						} else if (bpdname == "公司对外合同审批流程") {
							Ext.Msg.alert("请在电脑端起草！");
							return;
							this
									.NextView('qc_contractExamine_ID',
											'HelcOA.view.startTheProcess.DailyOffice.contractExamine');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
							Ext.getCmp('qc_bpdname').setValue(
									record.data.bpdname);
						} else if (bpdname == "公司规章制度审批流程") {
							Ext.Msg.alert("请在电脑端起草！");
							return;
							this
									.NextView('qc_rulesAndRegulations_ID',
											'HelcOA.view.startTheProcess.DailyOffice.rulesAndRegulations');
							// var wjml1=Ext.getCmp('wjml');
							// wjml1.addListener('focus',obj_this.wjml,this,{
							// });
							// var button2 = Ext.getCmp('wdbh');
							// button2.addListener('change', function(){
							// Ext.Msg.alert('test');});
							Ext.getCmp('bzsj').setValue(this.getFullDate());
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
							Ext.getCmp('qc_bpdname').setValue(
									record.data.bpdname);
						} else if (bpdname == '会议室申请流程') {
							this
									.NextView(
											'qc_MeetingRoomReservationTable_id',
											'HelcOA.view.startTheProcess.DailyOffice.MeetingRoomReservationTable');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
						} else if (bpdname == "物业公司对外合同审批流程") {
							Ext.Msg.alert("请在电脑端起草！");
							return;
							this
									.NextView('qc_propertyContractExamine_ID',
											'HelcOA.view.startTheProcess.DailyOffice.propertyContractExamine');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
							Ext.getCmp('qc_bpdname').setValue(
									record.data.bpdname);
						} else if (bpdname == '合同校正章(1)用印申请') {
							Ext.Msg.alert("请在电脑端起草！");
							return;
							this
									.NextView('qc_contractStamp_id',
											'HelcOA.view.startTheProcess.DailyOffice.contractStamp');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
							Ext.getCmp('sqliyou_textarea').setValue();
						} else if (bpdname == '内部法律咨询流程') {
							Ext.Msg.alert("请在电脑端起草！");
							return;
							this
									.NextView(
											'qc_InternalLegalAdvisoryElectronFlow_id',
											'HelcOA.view.startTheProcess.DailyOffice.InternalLegalAdvisoryElectronFlow');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
						} else if (bpdname == '公务用车联络流程') {
							this
									.NextView('qc_governmentCar_id',
											'HelcOA.view.startTheProcess.DailyOffice.governmentCar');
							var starttime = Ext.getCmp('ycdate');
							starttime.addListener('change', obj_this.chufa,
									this, {});
							var rettime = Ext.getCmp('ycdate1');
							rettime.addListener('change', obj_this.fanhui,
									this, {});
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
							Ext.getCmp('qc_bpdname').setValue(
									record.data.bpdname);
						} else if (bpdname == '法人授权') {
							this
									.NextView('qc_LegalAuthorization_id',
											'HelcOA.view.startTheProcess.DailyOffice.LegalAuthorization');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
							// Ext.getCmp('sqliyou_textarea').setValue();
							var starttime = Ext.getCmp('yxnyq');
							starttime.addListener('change', obj_this.kaishi,
									this, {});
							var rettime = Ext.getCmp('yxnyz');
							rettime.addListener('change', obj_this.jieshu,
									this, {});
						} else if (bpdname == '接待客户工作联络流程') {
							this
									.NextView('qc_CustomerReception_id',
											'HelcOA.view.startTheProcess.DailyOffice.CustomerReception');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
						} else if (bpdname == '视频设备申请') {
							this
									.NextView(
											'qc_VideoEquipmentApplicationForm_id',
											'HelcOA.view.startTheProcess.DailyOffice.VideoEquipmentApplicationForm');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
						} else if (bpdname == '境外出差申请') {
							this
									.NextView('qc_OverseasTrip_id',
											'HelcOA.view.startTheProcess.DailyOffice.OverseasTrip');
							// 给出发时间和返回时间添加监听器
							var starttime = Ext.getCmp('starttime');
							starttime.addListener('change',
									obj_this.starttime1, this, {});
							var rettime = Ext.getCmp('rettime');
							rettime.addListener('change', obj_this.rettime_jw,
									this, {});
							var projectno = Ext.getCmp('projectno');
							projectno.addListener('change', obj_this.projectno,
									this, {});
							var ygh = Ext.getCmp('ygh');
							ygh.addListener('change', obj_this.ygh2, this, {});
							var otherfee = Ext.getCmp('otherfee');
							otherfee.addListener('change', obj_this.FreeInfo,
									this, {});
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
						} else if (bpdname == '投资公司经理出差申请流程') {
							this
									.NextView('qc_investManager_id',
											'HelcOA.view.startTheProcess.DailyOffice.investManager');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
							// 分类：营业/工程业务
						} else if (bpdname == '维修改造工程业务联络流程') {
							this
									.NextView('qc_MaintainTransformView_id',
											'HelcOA.view.startTheProcess.BusinessService.MaintainTransformView');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
						} else if (bpdname == '开具发票') {
							Ext.Msg.alert("请在电脑端起草！");
							return;
							this
									.NextView('qc_Invoice_id',
											'HelcOA.view.startTheProcess.BusinessService.Invoice');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
							// 分类：质量控制
						} else if (bpdname == '开箱补缺件及不良问题反馈报告') {
							this
									.NextView('qc_KXBQJView_id',
											'HelcOA.view.startTheProcess.QualityControl.KXBQJView');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
						} else if (bpdname == '三包申请报告') {
							this
									.NextView('qc_ThreeGuarantees_id',
											'HelcOA.view.startTheProcess.QualityControl.ThreeGuarantees');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
						} else if (bpdname == '质量部投诉流程') {
							this
									.NextView('qc_QualityComplain_id',
											'HelcOA.view.startTheProcess.QualityControl.QualityComplain');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
							// 分类：提案管理流程
						} else if (bpdname == '提案管理流程') {
							this
									.NextView('qc_PM_TAGLLC_NG_id',
											'HelcOA.view.startTheProcess.ProposalManage.PM_TAGLLC_NG');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
							Ext.getCmp('no').addListener('change',
									obj_this.GetYGInfo, this, {});
						}

						else if (bpdname == '非标报告作业处理流程') {
							this
									.NextView('qc_nonstandardWork_id',
											'HelcOA.view.startTheProcess.BusinessService.nonstandardWork');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
						} else if (bpdname == '诉讼审批流程') {
							Ext.Msg.alert("请在电脑端起草！");
							return;
							this
									.NextView('qc_litigationApprove_id',
											'HelcOA.view.startTheProcess.BusinessService.litigationApprove');
							Ext.getCmp('qc_surface_ID').setTitle(
									record.data.bpdname);
						} else if (bpdname == '丧假申请流程（派驻人员专用）') {
							this
									.NextView('qc_FuneralLeave_id',
											'HelcOA.view.startTheProcess.humanresources.FuneralLeave');
							Ext.getCmp('qc_surface_ID').setTitle(record.data.bpdname);
						} 
						else if (bpdname == '人员转_调岗申请') {
							this
									.NextView('qc_StaffTransfer_id',
											'HelcOA.view.startTheProcess.humanresources.StaffTransfer');
							Ext.getCmp('qc_surface_ID').setTitle(record.data.bpdname);
							var rybh = Ext.getCmp('ygh');
							rybh.addListener('change', obj_this.rybh, this, {});
						}
						else if (bpdname == '公积金申请') {
							this.NextView('qc_FundApply_id','HelcOA.view.startTheProcess.humanresources.FundApply');
							Ext.getCmp('qc_surface_ID').setTitle(record.data.bpdname);
							var ygh = Ext.getCmp('ygh');
							ygh.addListener('change',obj_this.ygh, this, {});
						} 
						//信息技术
						else if (bpdname == 'PDA系统账号流程') {
							this.NextView('qc_PDAaccount_id','HelcOA.view.startTheProcess.InformationTechnology.PDAaccount');
							Ext.getCmp('qc_surface_ID').setTitle(record.data.bpdname);
						} 
						else {
							Ext.Msg.alert('没有此页面！');
						}

						// piid,taskid
						var getResult = function(res) {
							//

							// 获取起草数据
							cc
									.log("-------------res.startProcessResponse.ovar.data---------------");
							var obj_ovar = eval("("
									+ res.startProcessResponse.ovar + ")");
							var data = obj_ovar.data;

							var getResult2 = function(res2) {

								try {
									var jsonObj = Ext.JSON.decode(res2.ovar);
									var jsonObj2 = Ext.JSON
											.decode(jsonObj.data.acti);
									cc.log(jsonObj2.taskid + '  POPO');
									Ext.getCmp("taskid").setValue(
											jsonObj2.taskid);
									Ext.getCmp("node").setValue(
											jsonObj2.node.name);
									var n = 0;
									if (jsonObj.data.pur == "")
										jsonObj.data.pur = "{}";
									var purObj = Ext.JSON
											.decode(jsonObj.data.pur);
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

								// 判断流程类型(特殊情况)
								if (bpdname == '公司发文流程') {
									console.log('===========Y=========');
									var dataOne = eval("(" + res2.ovar + ")");
									console.log(dataOne.data.curuser.fullname);
									console
											.log(dataOne.data.fdata.mast.agentman);
									Ext.getCmp('bzr').setValue(
											dataOne.data.fdata.mast.agentman);
									// 获取流程位置
									var nigao = jsonObj2.node.name;
									Ext.getCmp('nigaoZY').setValue(nigao);
								}
								;
								if (bpdname == '视频设备申请') {
									var dataOne = eval("(" + res2.ovar + ")");
									Ext.getCmp('draftsdate').setValue(
											dataOne.data.fdata.mast.createdate);
								}
								;
								if (bpdname == '接待客户工作联络流程') {
									var dataOne = eval("(" + res2.ovar + ")");
									Ext.getCmp('time').setValue(
											dataOne.data.fdata.mast.createdate);
								}
								;
								if (bpdname == '公司规章制度审批流程') {
									Ext.getCmp('oldreadpeo').setHidden(true);
									Ext.getCmp('hqsl').setHidden(true);
									for (var i = 1; i <= 12; i++) {
										Ext.getCmp('hqdep' + i).setHidden(true);
									}
								}
								;
								if (bpdname == '投资公司经理出差申请流程') {
									var dept = Ext.getCmp('dept').getValue();
									var agentman = Ext.getCmp('agentman')
											.getValue();
									Ext.getCmp('subject').setValue(
											dept + agentman + "异地出差申请");
								}
								;
								if (bpdname == '提案管理流程') {
									Ext.getCmp('zhuanti').setHidden(true);
								}
								;
								if (bpdname == '公积金申请') {
									Ext.getCmp('xyzl').setHidden(false);
									Ext.getCmp('xyzl1').setHidden(true);
									Ext.getCmp('xyzl2').setHidden(true);
									Ext.getCmp('xyzl3').setHidden(true);
									Ext.getCmp('xyzl4').setHidden(true);
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

						var myParam = [ _vt, str_ibpd, str_iarg ];
						cc.log("----myParam = _vt,str_ibpd,str_iarg----");
						cc.log(myParam);
						var params = {};
						params.adpName = 'HttpAdapter_BPM';
						params.prodNmae = 'startTheProcessName';
						params.prmName = myParam;
						obj_this.connectServerComm(getResult, params);
					},

					/**
					 * 各种监听
					 */
					//监听人员调岗流程
					rybh:function(obj,newDate,oldDate,eOpts) {
						var obj_this = this;
						var getResult = function(res) {
							if (res.body != "()") {
								var data1 = res.body.substring(1,
										res.body.length);
								var data2 = data1
										.substring(0, data1.length - 1);
								var data = eval("(" + data2 + ")");
								var data = data.data;
								// 把数据填充到页面
								Ext.getCmp('query_xm').setValue(
										data[0].emp_name);
								Ext.getCmp('query_xb').setValue(
										data[0].sex_id);
								Ext.getCmp('query_nl').setValue(
										data[0].nianlin);
								Ext.getCmp('query_xl').setValue(
										data[0].xueli_job);
								Ext.getCmp('query_zy').setValue(
										data[0].special_majorjob);
								Ext.getCmp('query_bm').setValue(
										data[0].bm7);
								Ext.getCmp('query_gw').setValue(
										data[0].gangwei);
								Ext.getCmp('query_rssj').setValue(
										data[0].toco_dat);
								Ext.getCmp('ybmbbz').setValue(
										data[0].dep_name5);
								Ext.getCmp('ybmbz').setValue(
										data[0].dep_name6);
								Ext.getCmp('ybmkz').setValue(
										data[0].dep_name7);
								Ext.getCmp('subject').setValue(
										data[0].emp_name+"人员转_调岗");
								cc.log(data);
								obj_this.transfer(obj_this);
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

					// 提案流程
					// 工号改变
					GetYGInfo : function(obj, newDate, oldDate, eOpts) {
						var getResult = function(res) {
							if (res.body != "()") {
								var data1 = res.body.substring(1,
										res.body.length);
								var data2 = data1
										.substring(0, data1.length - 1);
								var data = eval("(" + data2 + ")");
								var data = data.data;
								Ext.getCmp('sname').setValue(data[0].emp_name);
								Ext.getCmp('dep').setValue(data[0].bm5);
								Ext.getCmp('dep2').setValue(data[0].bm6);
								Ext.getCmp('dep3').setValue(data[0].bm7);
								Ext.getCmp('gsm').setValue(data[0].corp);
								cc.log(data);
							} else {
								Ext.Msg.alert("找不到你输入的工号");
								WL.Toast.show("找不到你输入的工号，请输入8位员工编号。");
							}
							cc.log("---res---");
							cc.log(res);
						};
						var id = Ext.getCmp('no').getValue();
						this.connectServer_oa(getResult, id);
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

					// 监听公司规章制度选择目录
					wjml : function(obj, newDate, oldDate, eOpts) {
						var obj_this = this;
						var getResult = function(res) {
							if (res.body != "()") {
								// var ff=res.body;
								// var data1 =
								// res.body.substring(1,res.body.length);
								// var data2 =
								// data1.substring(0,data1.length-1);
								// var data = eval("("+ data2 +")");
								// var data = data.data;
								// //把数据填充到页面
								// Ext.getCmp('query_xm').setValue(data[0].emp_name);
								// Ext.getCmp('query_bm').setValue(data[0].bm7);
								// Ext.getCmp('query_zw').setValue(data[0].zhiwu);
								// cc.log(data);
								// obj_this.outside(obj_this);
							} else {
								Ext.Msg.alert("找不到");
								WL.Toast.show("找不到");
							}
							// var va = res.html;
							// window.open(va);
							// alert(va);
							cc.log("---res---");
							cc.log(res);
						};
						var val = Ext.getCmp('cabinet').getValue();
						obj_this.connectServer_oaCompany(getResult, val);
					},
					// 为公司规章制度制度编号添加事件
					button2sj : function(obj, newDate, oldDate, eOpts) {
						var obj_this = this;
						var getResult = function(res) {
							if (res.body != "()") {
								// var ff=res.body;
								// var data1 =
								// res.body.substring(1,res.body.length);
								// var data2 =
								// data1.substring(0,data1.length-1);
								// var data = eval("("+ data2 +")");
								// var data = data.data;
								// //把数据填充到页面
								// Ext.getCmp('query_xm').setValue(data[0].emp_name);
								// Ext.getCmp('query_bm').setValue(data[0].bm7);
								// Ext.getCmp('query_zw').setValue(data[0].zhiwu);
								// cc.log(data);
								// obj_this.outside(obj_this);
							} else {
								Ext.Msg.alert("找不到");
								WL.Toast.show("找不到");
							}
							cc.log("---res---");
							cc.log(res);
						}
						var val = Ext.getCmp('cabinet').getValue();
						obj_this.connectServer_oaCompany(getResult, val);
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

					compareDate : function(first, second, sign) {
						fArray = first.split(sign);
						sArray = second.split(sign);
						var fDate = new Date(fArray[0], fArray[1], fArray[2]);
						var sDate = new Date(sArray[0], sArray[1], sArray[2]);
						var t = Math.abs(fDate.getTime() - sDate.getTime());
						var days = t / (1000 * 60 * 60 * 24) + 1;
						return days;
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
					
					//公积金测试员工编号
					ygh : function(obj, newDate, oldDate, eOpts) {
						var ygh = this;
						var getResult = function(res) {
							if (res.body != "()") {
								var data1 = res.body.substring(1,
										res.body.length);
								var data2 = data1
										.substring(0, data1.length - 1);
								var data = eval("(" + data2 + ")");
								var data = data.data;
								Ext.getCmp('xm').setValue();
								// 把数据填充到页面
								Ext.getCmp('xm').setValue(
										data[0].emp_name);
								Ext.getCmp('dep').setValue(data[0].bm7);
								// Ext.getCmp('query_zw').setValue(data[0].zhiwu);
								Ext.getCmp('subject').setValue(
										data[0].emp_name + "公积金申请流程");

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

					// 出差申请流程
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

					worry : function() {
						this.outside();
						var result = "@";
						var waypath = Ext.getCmp('waypath').getValue();
						if (waypath == "1") {
							result = "y1"; // 这里写路有线条件
						}
						if (waypath == "2") {
							Ext.getCmp('tiaojian01').setValue("y1"); // "y1"
																		// //这里写路有线条件
						}
						if (waypath == "3") {
							Ext.getCmp('tiaojian01').setValue("y2"); // "y2"
																		// //这里写路有线条件
						}
						if (waypath == "4") {
							Ext.getCmp('tiaojian01').setValue("y3"); // "y3"
																		// //这里写路有线条件
						}

						Ext.getCmp('conds').setValue(result);
					},
					worry3 : function() {
						var result = "nocon";
						var zbxm = Ext.getCmp('zbxm').getValue();
						// var contracttype =
						// Ext.getCmp('contracttype').getValue();
						// var hqflag = Ext.getCmp('hqflag').getValue();
						// var frm=document.all;
						// if("$!{acti.node.name}"=="起草"){
						if ((zbxm == "基建、机电工程" || zbxm == "重要设备、原材料等货物的采购")
								&& (Ext.getCmp('contractyear').getValue() >= 500000)) {
							result = "@";
						} else if ((zbxm == "维修项目及施工"
								|| zbxm == "软件及管理项目、工装夹具采购"
								|| zbxm == "办公用品设备或废旧设备、物资项目"
								|| zbxm == "办公用品设备" || zbxm == "废旧设备、物资项目" || zbxm == "其他")
								&& (Ext.getCmp('contractyear').getValue() >= 300000)
								&& (Ext.getCmp('contractyear').getValue() < 500000)) {
							result = "@";
						} else {
							result = "y1";
						}
						// }
						// if("$!{acti.node.name}"=="部长审核"){
						// if((document.all.contractyear.value<=50000)&&(contracttype!="合同撤消")){
						// result="@,y3";
						// }
						// else
						// if((document.all.contractyear.value>50000)&&(contracttype!="合同撤消")){
						// result="@,y2";
						// }
						// else{
						// result="@,y1";
						// }
						//		         
						// }

						// if("$!{acti.node.name}"=="科长审核"){//写环节名
						// if(hqflag=="是"){
						// result="@,y2";//写条件
						// }
						// else{
						// result="@,y1";
						// }
						// }

						// if("$!{acti.node.name}"=="总经理审核"){//写环节名
						// if((document.all.contractyear.value>50000)&&(contracttype!="合同撤消")){
						// result="@,y2";//写条件
						// }
						// else
						// if((document.all.contractyear.value>50000)&&(document.all.contractyear.value<=300000)&&(contracttype=="合同撤消")){
						// result="@,y1";
						// }
						// else {
						// result="@";
						// }
						// }
						Ext.getCmp('conds').setValue(result);
					},
					worry4 : function() {
						var result = "nocon";
						var zbxm = Ext.getCmp('zbxm').getValue();
						// var contracttype =
						// Ext.getCmp('contracttype').getValue();
						var hqflag = Ext.getCmp('hqflag').getValue();

						// if("$!{acti.node.name}"=="起草"){
						if ((zbxm == "基建、机电工程" || zbxm == "重要设备、原材料等货物的采购")
								&& (Ext.getCmp('contractyear').getValue() >= 500000)) {
							result = "@";
						} else if ((zbxm == "维修项目及施工"
								|| zbxm == "软件及管理项目、工装夹具采购"
								|| zbxm == "办公用品设备或废旧设备、物资项目"
								|| zbxm == "办公用品设备" || zbxm == "废旧设备、物资项目" || zbxm == "其他")
								&& (Ext.getCmp('contractyear').getValue() >= 300000)
								&& (Ext.getCmp('contractyear').getValue() < 500000)) {

							result = "@";
						} else {
							result = "y1";
						}
						// }
						// if("$!{acti.node.name}"=="部长审核"){
						// if((document.all.contractyear.value<=50000)&&(contracttype!="合同撤消")){
						// result="@,y3";
						// document.getElementById('tiaojian02').value="y3";
						// }
						// else
						// if((document.all.contractyear.value>50000)&&(contracttype!="合同撤消")){
						// result="@,y2";
						// document.getElementById('tiaojian02').value="y2";
						// }
						// else{
						// result="@,y1";
						// document.getElementById('tiaojian02').value="y1";
						// }
						//	         
						// }
						if (hqflag == "是") {
							Ext.getCmp('tiaojian01').setValue("y2");
						} else {
							Ext.getCmp('tiaojian01').setValue("y1");
						}
						// if("$!{acti.node.name}"=="科长审核"){//写环节名
						// if(hqflag=="是"){
						// result="@,y2";//写条件
						// document.getElementById('tiaojian01').value="y2";
						// }
						// else{
						// result="@,y1";
						// document.getElementById('tiaojian01').value="y1";
						// }
						// }

						// if("$!{acti.node.name}"=="总经理审核"){//写环节名
						// if(contracttype!="合同撤消"){
						// result="@,y2";//写条件
						// }
						// else
						// if((document.all.contractyear.value>50000)&&(document.all.contractyear.value<=300000)&&(contracttype=="合同撤消")){
						// result="@,y1";
						// }
						// else {
						// result="@";
						// }
						// }
						Ext.getCmp('conds').setValue(result);
					},

					transfer:function(obj)//人员转/调申请途径
					{
						var obj=this;
						return;
						
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

					rettime1 : function(obj, newDate, oldDate, eOpts) {
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

					// 监听-公务用车联络流程-出发时间-返回时间
					chufa : function(obj, newDate, oldDate, eOpts) {
						var tempEndTime = Ext.getCmp('ycdate1').getValue()
								+ " " + "00:00:00";
						var tempStartTime = newDate + " " + "00:00:00";
						if (newDate != '') {
							if (Ext.getCmp('ycdate1').getValue() != '') {
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

					fanhui : function(obj, newDate, oldDate, eOpts) {
						var tempEndTime = newDate + " " + "00:00:00";
						var tempStartTime = Ext.getCmp('ycdate').getValue()
								+ " " + "00:00:00";
						if (newDate != '') {
							if (Ext.getCmp('ycdate').getValue() != '') {
								if (Date.parse(tempStartTime) > Date
										.parse(tempEndTime)) {
									Ext.Msg.alert("返回时间不小于出发时间");
									WL.Toast.show("返回时间不小于出发时间");
									obj.setValue(oldDate);
									return;
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

					// ///////////////////////////////////////////////
					// //////////////**********************

					// 2014-9-29 xcx 公司发文流程 流程类型 单击事件
					GSFWLC_lclx : function() {
						// 流程类型
						var lclx = Ext.getCmp('fwtype').getValue();
						if (lclx == '公司发文') {
							// 文件字
							var wjz = Ext.getCmp('writ');
							wjz.setDisabled(false);
							var data = [];
							data[0] = {
								text : '日立电梯（中国）工字',
								value : '日立电梯（中国）工字'
							};
							data[1] = {
								text : '日立电梯（中国）函字',
								value : '日立电梯（中国）函字'
							};
							data[2] = {
								text : '日立电梯（中国）党字',
								value : '日立电梯（中国）党字'
							};
							data[3] = {
								text : '日立电梯（中国）通字',
								value : '日立电梯（中国）通字'
							};
							data[4] = {
								text : '日立电梯（中国）字',
								value : '日立电梯（中国）字'
							};
							Ext.getCmp('writ').setOptions(data);
							// 选择文档归档位置
							var xzwdgdwz = Ext.getCmp('catalogname');
							xzwdgdwz.setHidden(true);
							// alert(Ext.getCmp('writ').getValue());
						} else if (lclx == '规章制度') {
							// 文件字为空
							Ext.getCmp('writ').setOptions();
							// 文件字
							var wjz = Ext.getCmp('writ');
							wjz.setDisabled(true);
							// 选择文档归档位置
							var xzwdgdwz = Ext.getCmp('catalogname');
							xzwdgdwz.setHidden(false);
							// alert(Ext.getCmp('writ').getValue());
						}
						;
					},

					// 监听-公务用车联络流程-出发时间-返回时间
					kaishi : function(obj, newDate, oldDate, eOpts) {
						var tempEndTime = Ext.getCmp('yxnyz').getValue() + " "
								+ "00:00:00";
						var tempStartTime = newDate + " " + "00:00:00";
						if (newDate != '') {
							if (Ext.getCmp('yxnyz').getValue() != '') {
								if (Date.parse(tempStartTime) > Date
										.parse(tempEndTime)) {
									Ext.Msg.alert("开始时间不大于结束时间");
									WL.Toast.show("开始时间不大于结束时间");
									obj.setValue(oldDate);
									return;
								}
							}
						}
					},

					jieshu : function(obj, newDate, oldDate, eOpts) {
						var tempEndTime = newDate + " " + "00:00:00";
						var tempStartTime = Ext.getCmp('yxnyq').getValue()
								+ " " + "00:00:00";
						if (newDate != '') {
							if (Ext.getCmp('yxnyq').getValue() != '') {
								if (Date.parse(tempStartTime) > Date
										.parse(tempEndTime)) {
									Ext.Msg.alert("结束时间不小于开始时间");
									WL.Toast.show("结束时间不小于开始时间");
									obj.setValue(oldDate);
									return;
								}
							} else {
								Ext.Msg.alert("请先完成开始时间");
								WL.Toast.show("请先完成开始时间");
								obj.setValue('');
								return;
							}
						}
					},
					// 境外出差申请隐藏组件赋值
					worry2 : function() {
						var result = "nocon";
						var qz_type = Ext.getCmp('qz_type').getValue();
						// var cc_type=Ext.getCmp('cc_type').getValue();
						var guoji = Ext.getCmp('guoji').getValue();
						if (guoji != "中国") {
							result = "y1";
						} else if (guoji == "中国" && qz_type == "不需办理") {
							result = "y2";
						} else {
							result = "@";
						}
						Ext.getCmp('conds').setValue(result);
					},
					checkvalue34a : function() {
						// var node = Ext.getCmp('node').getValue();
						var fwtype = Ext.getCmp('fwtype').getValue();
						var wjml = Ext.getCmp('wjml').getValue();
						// var wdbh = Ext.getCmp('wdbh').getValue();
						// var bbh = Ext.getCmp('bbh').getValue();
						if (fwtype == "制度首发") {
							if (wjml == "") {
								Ext.Msg.alert("请选择文档目录");
								WL.Toast.show("请选择文档目录");
								return false;
							}
							// if(wdbh==""){
							// Ext.Msg.alert("请输入制度编号");
							// WL.Toast.show("请输入制度编号");
							// return false;
							// }
							// if(bbh==""){
							// Ext.Msg.alert("请输入版本号");
							// WL.Toast.show("请输入版本号");
							// return false;
							// }
						}
						return true;
					},

					// 进入公司发文页面就调用的的方法
					GSFW_checkvalue34 : function(gsfw_data) {
						// alert(username+' '+userkey+' '+usernames);
						// alert(gsfw_data);
						var frm = document.all;
						// 当前时间
						var myDate = new Date();
						var y = myDate.getFullYear();
						var m = myDate.getMonth() + 1;
						if (m < 10) {
							m = "0" + m;
						}
						;
						var d = myDate.getDate();
						// 原本没有var
						var datestr = y + "-" + m + "-" + d;
						// 替换
						var frm_dept_value = Ext.getCmp('dept').getValue();

						var frm_wdbh_value = Ext.getCmp('wdbh').getValue();
						var frm_ngbm_value = Ext.getCmp('ngbm').getValue();
						var frm_miji_value = Ext.getCmp('miji').getValue();
						var frm_showss_value = Ext.getCmp('showss').getValue();
						var frm_bcnx_value = Ext.getCmp('bcnx').getValue();
						var frm_bzr_value = Ext.getCmp('bzr').getValue();
						var frm_bzsj_value = Ext.getCmp('bzsj').getValue();
						var frm_shr_value = Ext.getCmp('shr').getValue();
						var frm_shsj_value = Ext.getCmp('shsj').getValue();
						var frm_pzr_value = Ext.getCmp('pzr').getValue();
						var frm_pzsj_value = Ext.getCmp('pzsj').getValue();
						var frm_zwdoc_value = Ext.getCmp('zwdoc').getValue();
						var frm_arcpath_value = Ext.getCmp('arcpath')
								.getValue();

						var frm_jcacl_value = Ext.getCmp('jcacl').getValue();
						var frm_catalogname_value = Ext.getCmp('catalogname')
								.getValue();
						// var frm_pbsj_value=Ext.getCmp('pbsj').getValue();
						// alert(gsfw_data);

						if (gsfw_data == "拟稿") {
							// alert(frm_dept_value);
							if (frm_dept_value == "秘书科"
									|| frm_dept_value == "综合管理科"
									|| frm_dept_value == "公关宣传科"
									|| frm_dept_value == "总裁办"
									|| frm_dept_value == "总裁办公室") {
								// frm.iszcb.value="1";
								Ext.getCmp('iszcb').setValue('1');
								Ext.getCmp('conds').setValue('y1');
								// document.getElementById('conds').value="y1";
							} else {
								// frm.iszcb.value="0";
								Ext.getCmp('iszcb').setValue('0');
								Ext.getCmp('conds').setValue('@');
								// document.getElementById('conds').value="@";
							}
							;
							// frm.bzsj.value=datestr;
							Ext.getCmp('bzsj').setValue(datestr);
						}
						;
						if (gsfw_data == "总经理审核" || gsfw_data == "总经理审核a") {
							// frm.shsj.value=datestr;
							Ext.getCmp('shsj').setValue(datestr);
							Ext.getCmp('shr').setValue(username);
							// frm.shr.value=_actform.curuser.fullname;
						}
						;
						if (gsfw_data == "总裁审核") {
							// frm.pzsj.value=datestr;
							Ext.getCmp('pzsj').setValue(datestr);
							// frm.pzr.value=_actform.curuser.fullname;
							Ext.getCmp('pzr').setValue(username);
						}
						;
						if (gsfw_data == "排版A" || gsfw_data == "排版B") {
							// frm.bzhsj.value=datestr;
							Ext.getCmp('bzhsj').setValue(datestr);
							// frm.bzh.value=_actform.curuser.fullname;
							Ext.getCmp('bzh').setValue(username);
							if (frm_wdbh_value == "" || frm_ngbm_value == ""
									|| frm_miji_value == ""
									|| frm_showss_value == ""
									|| frm_bcnx_value == ""
									|| frm_bzr_value == ""
									|| frm_bzsj_value == ""
									|| frm_shr_value == ""
									|| frm_shsj_value == ""
									|| frm_pzr_value == ""
									|| frm_pzsj_value == ""
									|| frm_zwdoc_value == ""
									|| frm_arcpath_value == "") {
								alert('请输入相关信息，再提交!');

								/*
								 * frm_wdbh_value.style.background='#e8e8e8';
								 * frm.ngbm.style.background='#e8e8e8';
								 * frm.miji.style.background='#e8e8e8';
								 * frm.showss.style.background='#e8e8e8';
								 * frm.bcnx.style.background='#e8e8e8';
								 * frm.bzr.style.background='#e8e8e8';
								 * frm.bzsj.style.background='#e8e8e8';
								 * frm.shr.style.background='#e8e8e8';
								 * frm.shsj.style.background='#e8e8e8';
								 * frm.pzr.style.background='#e8e8e8';
								 * frm.pzsj.style.background='#e8e8e8';
								 * frm.zwdoc.style.background='#e8e8e8';
								 * frm.arcpath.style.background='#e8e8e8';
								 */
								frm_pzr_value.focus();
								return false;
							}
							;

							/*
							 * if (frm_jcacl_value=="[object]"){ if
							 * (frm.jcacl.value==""){ alert('请选择继承权限，再提交!');
							 * frm.jcacl.style.background='#e8e8e8'; return; };
							 * if (frm.jcacl.value=="不继承" &&
							 * frm.readpeo.value==""){ alert('请选择阅读人员!');
							 * frm.readpeo.style.background='#e8e8e8'; return; }; };
							 */
							if (frm_jcacl_value == "不继承") {
								alert('请选择阅读人员!');
								// frm.readpeo.style.background='#e8e8e8';
								return false;
							}
							;

							/*
							 * var fwtype; for (i=0;i<frm.fwtype.length;i++) {
							 * if (frm.fwtype[i].checked==true) {
							 * fwtype=frm.fwtype[i].value; } }
							 */
							/*
							 * if (frm_fwtype_value=="公司发文" &&
							 * frm.writ.value==""){ alert('请输入相关信息，再提交!');
							 * frm.writ.style.background='#e8e8e8';
							 * frm.writ.focus(); return; }
							 */
							if (frm_fwtype_value == "规章制度"
									&& frm_catalogname_value == "") {
								alert('请输入相关信息，再提交!');
								// frm.catalogname.style.background='#e8e8e8';
								frm_catalogname_value.focus();
								return false;
							}
							var myDate = new Date();
							var datestr = myDate.toLocaleDateString();
							datestr = datestr.replace("年", "/");
							datestr = datestr.replace("月", "/");
							datestr = datestr.replace("日", "");
							frm_pbsj_value = datestr;
						}
						;

						if (Ext.getCmp('writ').getValue().indexOf(",") != "-1") {
							Ext.Msg.alert('文件字号不能多选');
							Ext.getCmp('writ').setValue('');
							// document.getElementById("writ").value="";
							return false;
						}
						;
						return true;
					},

					// 选择正文
					GSWF_selzw : function(fieldn) {
						var url = _oa_path
								+ "/unioa/processtrace.nsf/selectatt?openform&unid="
								+ document.all.piid.value;
						var frm = document.all;
						var result = getURLObj(url);
						var wz = result.indexOf("*");
						frm.zwdoc.value = result.substring(0, wz);
						frm.zwdocunid.value = result.substring(wz + 1,
								result.length);
					},

					// 选择文档归档位置 的一个选择按钮
					GSWF_selectcatalogId : function() {
						var frm = document.all;
						var url = _oa_path
								+ "/oa/workflowgdpz.nsf/selectcatalog?OpenForm&selflag="
								+ frm.noselect.value + "&sjk="
								+ frm.cabinet.value + "&gdsort="
								+ frm.pigeonhole.value
						window.open(url, "", 'height=100,width=350');
					},
					getFullDate : function() {
						var myDate = new Date();
						var y = myDate.getFullYear();
						var m = myDate.getMonth() + 1;
						if (m < 10) {
							m = "0" + m;
						}
						var d = myDate.getDate();
						var datestr = y + "-" + m + "-" + d;
						return datestr;
					},
					monenyChange : function() {
						var hj1 = Ext.getCmp('fyxj1').getValue();
						var hj2 = Ext.getCmp('fyxj2').getValue();
						var hj3 = Ext.getCmp('fyxj3').getValue();
						var hj4 = Ext.getCmp('fyxj4').getValue();
						var hj5 = Ext.getCmp('fyxj5').getValue();
						Ext.getCmp('feesum2').setValue(
								parseFloat(hj1) + parseFloat(hj2)
										+ parseFloat(hj3) + parseFloat(hj4)
										+ parseFloat(hj5));
					},
					test22 : function() {
						var getResult = function(res) {
							// if(res.body != "()"){
							// var data1 =
							// res.body.substring(1,res.body.length);
							// var data2 = data1.substring(0,data1.length-1);
							// var data = eval("("+ data2 +")");
							// var data = data.data;
							// cc.log(data);
							// }else{
							// Ext.Msg.alert("找不到你输入的工号");
							// WL.Toast.show("找不到你输入的工号，请输入8位员工编号。");
							// }
							cc.log("---res---");
							cc.log(res);
						};
						var params = Ext.getCmp('qystyle').getValue();
						// var params = Ext.getCmp('otherfee').getValue();
						// var params ={method:'Getfeiyong',parameters:gj};
						this.connectServer_oaCompany(getResult, params);
					},
					yujiqitaMoneny : function(obj, newDate, oldDate, eOpts) {
						var gj = Ext.getCmp("country").getValue();
						if (Ext.getCmp("peonum").getValue() == "") {
							Ext.Msg.alert("请填写一类人员数量,若无则填写0!");
							WL.Toast.show("请填写一类人员数量,若无则填写0!");
							return false;
						}
						if (Ext.getCmp("peonum2").getValue() == "") {
							Ext.Msg.alert("请填写二类人员数量,若无则填写0!");
							WL.Toast.show("请填写二类人员数量,若无则填写0!");
							return false;
						}
						if (Ext.getCmp("peonum3").getValue() == "") {
							Ext.Msg.alert("请填写三类人员数量,若无则填写0!");
							WL.Toast.show("请填写三类人员数量,若无则填写0!");
							return false;
						}
						if (Ext.getCmp("starttime").getValue() == "") {
							Ext.Msg.alert("请选择出发时间!");
							WL.Toast.show("请选择出发时间!");
							return false;
						}
						if (Ext.getCmp("rettime").getValue() == "") {
							Ext.Msg.alert("请选择返回时间!");
							WL.Toast.show("请选择返回时间!");
							return false;
						}
						if (Ext.getCmp('qystyle').getValue() == "") {
							Ext.Msg.alert("请选择出访地区!");
							WL.Toast.show("请选择出访地区!");
							return false;
						}
						if (gj == "") {
							Ext.Msg.alert("请选择国家!");
							WL.Toast.show("请选择国家!");
							return false;
						}
						Ext.Msg.alert(Ext.getCmp('gwlist').getValue());
						// if(gj!=""){
						// var getResult=function(res){
						// if(res.body != "()"){
						// var data1 = res.body.substring(1,res.body.length);
						// var data2 = data1.substring(0,data1.length-1);
						// var data = eval("("+ data2 +")");
						// var data = data.data;
						// // Ext.getCmp('query_xm').setValue();
						// // //把数据填充到页面
						// // Ext.getCmp('query_xm').setValue(data[0].emp_name);
						// // Ext.getCmp('dep').setValue(data[0].bm7);
						// //// Ext.getCmp('query_zw').setValue(data[0].zhiwu);
						// //
						// Ext.getCmp('subject').setValue(data[0].emp_name+"境外出差申请");
						// // Ext.getCmp('kzno').setValue(data[0].dep_empid7);
						// // Ext.getCmp('kzname').setValue(data[0].dep_name7);
						// // Ext.getCmp('bzno').setValue(data[0].dep_empid6);
						// // Ext.getCmp('bzname').setValue(data[0].dep_name6);
						// // Ext.getCmp('bbzno').setValue(data[0].dep_empid5);
						// // Ext.getCmp('bbzname').setValue(data[0].dep_name5);
						// // Ext.getCmp('zjlno').setValue(data[0].zcno);
						// // Ext.getCmp('zjlname').setValue(data[0].zcname);
						// // Ext.getCmp('guoji').setValue(data[0].guoji);
						// //
						// Ext.getCmp('sendreader').setValue(data[0].emp_name+"
						// "+ygh);
						// //
						// cc.log(data);
						// // obj_this.outside();
						// }else{
						// Ext.Msg.alert("找不到你输入的工号");
						// WL.Toast.show("找不到你输入的工号，请输入8位员工编号。");
						// }
						// cc.log("---res---");
						// cc.log(res);
						// };
						// var params = Ext.getCmp('country').getValue();
						// // var params = Ext.getCmp('otherfee').getValue();
						// // var params ={method:'Getfeiyong',parameters:gj};
						// this.connectServer_oaCompany(getResult,params);
						// }
						// Ext.Msg.alert('成功');
					}
				// //////////////**********************
				// ///////////////////////////////////////////////

				});