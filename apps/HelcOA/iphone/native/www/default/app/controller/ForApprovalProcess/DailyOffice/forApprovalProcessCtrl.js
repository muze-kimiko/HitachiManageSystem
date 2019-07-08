
/* JavaScript content from app/controller/ForApprovalProcess/DailyOffice/forApprovalProcessCtrl.js in folder common */
/**
 * 审批
 */

Ext
		.define(
				'HelcOA.controller.ForApprovalProcess.DailyOffice.forApprovalProcessCtrl',
				{
					extend : 'HelcOA.controller.ApplicationController',
					config : {
						control : {
							'button#returnHome_ID' : {
								tap : 'returnHome',
							},
							'button#idea_ID' : {
								tap : 'sp_ToSelectNode',
							},
						}
					},

					/**
					 * 返回首页
					 */
					returnHome : function() {
						var id = Ext.Viewport.getActiveItem().id;
						this.showBackView('Menus_id', 'HelcOA.view.Menus');
						var viewName = Ext.getCmp(id);
						if (viewName) {
							viewName.destroy();
						}
						var store = this
								.getStore('personnelSelectionS',
										'HelcOA.store.ForApprovalProcess.DailyOffice.Idea.personnelSelectionS');
						store.setData([]);
					},

					// 选择结点公共方法
					public_ToSelectNode : function() {
						var obj_this = this;
						var conds = Ext.getCmp('conds').getValue();
						var bpdName = Ext.getCmp('surface_ID').getTitle()._title;
						var approvalOpinionS = this
								.getStore('approvalOpinionS',
										'HelcOA.store.startTheProcess.DailyOffice.Idea.approvalOpinionS');
						approvalOpinionS.setData([]);
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

									if (lines[nb].conds != ""
											&& conds.indexOf(lines[nb].conds) != -1) {
										userSolist.push(tp_data);
									} else if (lines[nb].conds == ""
											&& conds.indexOf("@") != -1) {
										userSolist.push(tp_data);
									} else if (conds == "nocon" || conds == "") {
										userSolist.push(tp_data);
									}

								}
								// set到节点选择页面的数据STORE
								approvalOpinionS.setData(userSolist);
							}
							;
						};
						var taskid = Ext.getCmp('taskid').getValue();
						var piid = Ext.getCmp('piid').getValue();
						var content = {
							method : 'ForApprovalProcess',
							task_id : taskid,
							piid : piid
						};
						cc.log(content);
						obj_this.connectServer3(getResult3, content);
						var ViewId = Ext.Viewport.getActiveItem().id;
						obj_this
								.NextView('approvalOpinion_ID',
										'HelcOA.view.ForApprovalProcess.DailyOffice.Idea.approvalOpinion');
						// 存储页面ID，用于提交数据后销毁
						Ext.getCmp('SP_View_id').setValue(ViewId);

					},

					/**
					 * 进入选择结点
					 */
					sp_ToSelectNode : function(obj, e, eOpts) {
						var obj_this = this;
						var bpdName = Ext.getCmp('surface_ID').getTitle()._title;
						// 分类：日常办公
						if (bpdName == "用印申请") {
							// 验证必填
							var IdArray = [ 'agentman', 'subject', 'fenshu',
									'sqliyou_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						} else if (bpdName == "合同校正章(1)用印申请") {
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
							obj_this.worry();
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
							obj_this.worry3();
						} else if (bpdName == "公司发文流程") {
							var IdArray = [ 'subject', 'fwtype' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						} else if (bpdName == "公司规章制度审批流程") {
							var IdArray = [ 'subject', 'fwtype', 'hqflag',
									'smflag', 'phone', 'wjml', 'wdbh' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							obj_this.formload34a();
							obj_this.rulesWorry();
						} else if (bpdName == "会议室申请流程") {
							var IdArray = [ 'phone', 'subject',
									'meetcontect_textarea', 'zcr', 'startdate',
									'shour', 'sminu', 'ehour', 'eminu',
									'meetpeo' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							;
							this
									.getApplication()
									.getController(
											'startTheProcess.DailyOffice.MeetingRoomReservationCtrl')
									.worry();
						} else if (bpdName == "内部法律咨询流程") {
							var IdArray = [ 'zxlx', 'subject' ];
							if (this.isRequired(IdArray)) {
								return;
							}

						} else if (bpdName == "公务用车联络流程") {
							var IdArray = [ 'agentman', 'subject', 'ycdate',
									'ycdate1', 'sj', 'sj1', 'lxr', 'ycrs',
									'lxrdh', 'xicheng_textarea',
									'reasion_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}

						} else if (bpdName == "物业公司对外合同审批流程") {
							var IdArray = [ 'subject', 'nextcontractno',
									'addr', 'sqliyou_textarea',
									'caiwureason_textarea', 'paytype', 'lxdh',
									'htfs', 'contractyear' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							obj_this.worry4();
						} else if (bpdName == "接待客户工作联络流程") {
							var IdArray = [ 'ccompany', 'num', 'company',
									'subject', 'lfkh', 'pt', 'dh', 'yyy',
									'lfkh', 'zw', 'tel' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						} else if (bpdName == "境外出差申请") {
							var IdArray = [ 'ygh', 'dep', 'subject', 'peonum',
									'peonum2', 'peonum3', 'starttime',
									'rettime', 'qystyle', 'country', 'addr',
									'feesum2', 'otherfee', 'biz',
									'reason_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							obj_this.worry2();
						} else if (bpdName == "法人授权") {
							var IdArray = [ 'bsqr', 'phone', 'qwwcsj', 'yxnyq',
									'yxnyz', 'subject', 'sqly' ];
							;
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
						} else if (bpdName == "PO单审核") {
							var IdArray = [ 'vendor_site_code' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							var store = this
									.getStore('POFormStore',
											'HelcOA.store.startTheProcess.DailyOffice.POFormStore');
							if (store.data.items.length == 0) {
								Ext.Msg.alert('无法提交', '没有订单明细');
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
							obj_this
									.getApplication()
									.getController(
											'startTheProcess.BusinessService.MaintainTransformCtrl')
									.setvaluedate();
						} else if (bpdName == "开具发票") {
							var IdArray = [ 'hth', 'gh', 'subject', 'kpje',
									'kpjegc', 'kpjeyf', 'kpbl', 'htzxqksm',
									'yyyq_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						} else if (bpdName == "非标报告作业处理流程") {
							var IdArray = [ 'createdate', 'phone2', 'subject',
									'report_textarea', 'apellation', 'address',
									'party', 'phone', 'date', 'produceno',
									'model', 'floor', 'date1', 'date2', 'unit',
									'count', 'refermodel' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							if (!obj_this
									.getApplication()
									.getController(
											'ForApprovalProcess.BusinessService.nonstandardWorkCtrl')
									.checkvalue10()) {
								return;
							}
						} else if (bpdName == "诉讼审批流程") {
							var IdArray = [ 'hth', 'xmxz', 'dwmc1', 'dwdz1',
									'phone1', 'lxr1', 'htdep', 'httype', 'ts1',
									'ts2', 'paymoney', 'reason_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							obj_this
									.getApplication()
									.getController(
											'startTheProcess.BusinessService.litigationApproveCtrl')
									.worry();
							if (!obj_this
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
							if (!obj_this
									.getApplication()
									.getController(
											'startTheProcess.ProposalManage.PM_TAGLLC_NGCtrl')
									.commit()) {
								return;
							}
						}
						// 分类：质量控制
						else if (bpdName == "三包申请报告") {
							var IdArray = [ 'subject', 'bdtype', 'serviceaddr',
									'acceptor', 'acceptno', 'produceno', 'hth',
									'dhdw', 'typeno', 'power', 'checkdate',
									'parts', 'partsxh', 'errdate',
									'errorstatus', 'errcontent', 'textarea',
									'textarea2', 'textarea3' ];
							// sertime
							if (this.isRequired(IdArray)) {
								return;
							}
						} else if (bpdName == "开箱补缺件及不良问题反馈报告") {
							var IdArray = [ 'dpm', 'bjm', 'wtm', 'subject',
									'ts', 'yhmc', 'qwclqx', 'jjdz', 'yb',
									'level', 'type1', 'shr', 'phone', 'shr_2',
									'phone_2', 'scgh', 'azdw', 'azzz', 'hth',
									'beizhu_textarea', 'bgrphone' ];
							if (this.isRequired(IdArray)) {
								return;
							}
							if (!this.getApplication().getController(
									'startTheProcess.QualityControl.KXBQJCtrl')
									.checkvalue18()) {
								return;
							}
							;
							obj_this.getApplication().getController(
									'startTheProcess.QualityControl.KXBQJCtrl')
									.worry();
						}
						// 分类：人力资源
						else if (bpdName == "丧假申请流程（派驻人员专用）") {
							var IdArray = [ 'qjr', 'subject', 'level1', 'kqy',
									'startdate', 'enedate', 'reason_textarea' ];
							if (this.isRequired(IdArray)) {
								return;
							}
						}
						// else if(bpdName == "质量部投诉流程"){
						// var IdArray =
						// ['subject','customname','tsflag','tel','contractno','tsdate','tscontect_textarea'];
						// if(this.isRequired(IdArray)){
						// return;
						// }
						// var blfl="";
						// if(Ext.getCmp('sj').getValue()=='1'){
						// blfl += "设计,";
						// }
						// if(Ext.getCmp('zp').getValue()=='1'){
						// blfl += "制品,";
						// }
						// if(Ext.getCmp('yh').getValue()=='1'){
						// blfl += "用户,";
						// }
						// if(Ext.getCmp('qt').getValue()=='1'){
						// blfl += "其他,";
						// }
						// if(blfl)
						// }
						else {
							alert('该流程名字有误，请联系管理员');
							return;
						}

						this.public_ToSelectNode();

					},

					worry : function() {
						var result = "@";
						var waypath = Ext.getCmp('waypath').getValue();
						if (Ext.getCmp('node').getValue() == "一级审批1") {
							if (waypath == "2") {
								result = result + ",y1"; // 这里写路有线条件
							}
							if (waypath == "3") {
								result = result + ",y2"; // 这里写路有线条件
							}
							if (waypath == "4") {
								result = result + ",y3"; // 这里写路有线条件
							}
							Ext.getCmp('conds').setValue(result);
						}
					},

					// 境外出差申请隐藏组件赋值
					worry2 : function() {
						var result = 'nocon';
						var qz_type = Ext.getCmp('qz_type').getValue();
						var cc_type = Ext.getCmp('cc_type').getValue();
						var guoji = Ext.getCmp('guoji').getValue();
						var nodeValue = Ext.getCmp('node').getValue();
						if (nodeValue == "起草") {
							// var guoji = Ext.getCmp('guoji').getValue();
							if (guoji != "中国") {
								result = "y1";
							} else if (guoji == "中国" && qz_type == "不需办理") {
								result = "y2";
							} else {
								result = "@";
							}
						}
						if (nodeValue == "立项部门总经理审批") {

							if (guoji != "中国") {
								result = "@,y1";
							} else if (guoji == "中国" && qz_type == "需办理") {
								result = "@,y3";
							} else if (guoji == "中国" && qz_type == "不需办理") {
								result = "@,y2";
							} else {
								result = "@";
							}
						}

						if (nodeValue == "总裁办主任审批") {
							if (guoji != "中国" && cc_type == "培训") {
								result = "@,y5";
							} else if (guoji == "中国" && cc_type == "出差") {
								result = "@,y2";
							} else if (guoji != "中国" || qz_type == "不需办理") {
								result = "@,y4";
							} else if (guoji == "中国" && qz_type == "不需办理") {
								result = "@,y3";
							} else if (guoji == "中国" && qz_type == "需办理") {
								result = "@,y1";
							} else if (guoji != "中国") {
								result = "@,y6";
							} else {
								result = "@";
							}

						}
						Ext.getCmp('conds').setValue(result);
					},
					// 公司对外合同审批流程 的 审核流程转向
					worry3 : function() {
						var result = "nocon";
						// var zbxm = Ext.getCmp('zbxm').getValue();
						var contracttype = Ext.getCmp('contracttype')
								.getValue();
						var hqflag = Ext.getCmp('hqflag').getValue();
						if ((Ext.getCmp('contractyear').getValue() <= 50000)
								&& (contracttype != "合同撤消")) {
							Ext.getCmp('tiaojian02').setValue("y3");
						} else if ((Ext.getCmp('contractyear').getValue() > 50000)
								&& (contracttype != "合同撤消")) {
							Ext.getCmp('tiaojian02').setValue("y2");
						} else {
							Ext.getCmp('tiaojian02').setValue("y1");
							;
						}

						if (hqflag == "是") {
							Ext.getCmp('tiaojian01').setValue("y2");
							;// 写条件
						} else {
							Ext.getCmp('tiaojian01').setValue("y1");
							;
						}
						if (Ext.getCmp('node').getValue() == "部长审核") {
							if ((Ext.getCmp('contractyear').getValue() <= 50000)
									&& (contracttype != "合同撤消")) {
								result = "@,y3";
							} else if ((Ext.getCmp('contractyear').getValue() > 50000)
									&& (contracttype != "合同撤消")) {
								result = "@,y2";
							} else {
								result = "@,y1";
							}

						}

						if (Ext.getCmp('node').getValue() == "科长审核") {// 写环节名
							if (hqflag == "是") {
								result = "@,y2";// 写条件
							} else {
								result = "@,y1";
							}
						}

						if (Ext.getCmp('node').getValue() == "总经理审核") {// 写环节名
							if ((Ext.getCmp('contractyear').getValue() > 50000)
									&& (contracttype != "合同撤消")) {
								result = "@,y2";// 写条件
							} else if ((Ext.getCmp('contractyear').getValue() > 50000)
									&& (Ext.getCmp('contractyear').getValue() <= 300000)
									&& (contracttype == "合同撤消")) {
								result = "@,y1";
							} else {
								result = "@";
							}
						}
						Ext.getCmp('conds').setValue(result);
					},
					worry4 : function() {
						var result = "nocon";
						// var zbxm=Ext.getCmp('zbxm').getValue();
						var contracttype = Ext.getCmp('contracttype')
								.getValue();
						var hqflag = Ext.getCmp('hqflag').getValue();
						if (Ext.getCmp('node').getValue() == "部长审核") {
							if ((Ext.getCmp('contractyear').getValue() <= 50000)
									&& (contracttype != "合同撤消")) {
								result = "@,y3";
								Ext.getCmp('tiaojian02').setValue("y3");
							} else if ((Ext.getCmp('contractyear').getValue())
									&& (contracttype != "合同撤消")) {
								result = "@,y2";
								Ext.getCmp('tiaojian02').setValue("y2");
							} else {
								result = "@,y1";
								Ext.getCmp('tiaojian02').setValue("y1");
							}

						}
						if (hqflag == "是") {

							Ext.getCmp('tiaojian01').setValue("y2");
						} else {

							Ext.getCmp('tiaojian01').setValue("y1");
						}
						if (Ext.getCmp('node').getValue() == "科长审核") {// 写环节名
							if (hqflag == "是") {
								result = "@,y2";// 写条件
								Ext.getCmp('tiaojian01').setValue("y2");
							} else {
								result = "@,y1";
								Ext.getCmp('tiaojian01').setValue("y1");
							}
						}

						if (Ext.getCmp('node').getValue() == "总经理审核") {// 写环节名
							if (contracttype != "合同撤消") {
								result = "@,y2";// 写条件
							} else if ((Ext.getCmp('contractyear').getValue() > 50000)
									&& (Ext.getCmp('contractyear').getValue() <= 300000)
									&& (contracttype == "合同撤消")) {
								result = "@,y1";
							} else {
								result = "@";
							}
						}
						Ext.getCmp('conds').setValue(result);
					},
					rulesWorry : function() {
						var result = "nocon";
						var hqflag = Ext.getCmp('hqflag').getValue();
						var node = Ext.getCmp('node').getValue();
						var fwtype = Ext.getCmp('fwtype').getValue();
						if (node == "部门总经理审核") {
							if (hqflag == "是") {
								result = "@,y1";
							}
							if (hqflag == "否") {
								result = "@,y2";
							}
						}
						if (node == "会签部门1") {
							if (Ext.getCmp('hqdep2').getValue() != "") {
								result = "@,y1";
							}
							if (Ext.getCmp('hqdep2').getValue() == "") {
								result = "@,y2";
							}
						}

						if (node == "会签部门2") {
							if (Ext.getCmp('hqdep3').getValue() != "") {
								result = "@,y1";
							}
							if (Ext.getCmp('hqdep3').getValue() == "") {
								result = "@,y2";
							}
						}

						if (node == "会签部门3") {
							if (Ext.getCmp('hqdep4').getValue() != "") {
								result = "@,y1";
							}
							if (Ext.getCmp('hqdep4').getValue() == "") {
								result = "@,y2";
							}
						}

						if (node == "会签部门4") {
							if (Ext.getCmp('hqdep5').getValue() != "") {
								result = "@,y1";
							}
							if (Ext.getCmp('hqdep5').getValue() == "") {
								result = "@,y2";
							}
						}

						if (node == "会签部门5") {
							if (Ext.getCmp('hqdep6').getValue() != "") {
								result = "@,y1";
							}
							if (Ext.getCmp('hqdep6').getValue() == "") {
								result = "@,y2";
							}
						}

						if (node == "会签部门6") {
							if (Ext.getCmp('hqdep7').getValue() != "") {
								result = "@,y1";
							}
							if (Ext.getCmp('hqdep7').getValue() == "") {
								result = "@,y2";
							}
						}

						if (node == "会签部门7") {
							if (Ext.getCmp('hqdep8').getValue() != "") {
								result = "@,y1";
							}
							if (Ext.getCmp('hqdep8').getValue() == "") {
								result = "@,y2";
							}
						}

						if (node == "会签部门8") {
							if (Ext.getCmp('hqdep9').getValue() != "") {
								result = "@,y1";
							}
							if (Ext.getCmp('hqdep9').getValue() == "") {
								result = "@,y2";
							}
						}

						if (node == "会签部门9") {
							if (Ext.getCmp('hqdep10').getValue() != "") {
								result = "@,y1";
							}
							if (Ext.getCmp('hqdep10').getValue() == "") {
								result = "@,y2";
							}
						}

						if (node == "会签部门10") {
							if (Ext.getCmp('hqdep11').getValue() != "") {
								result = "@,y1";
							}
							if (Ext.getCmp('hqdep11').getValue() == "") {
								result = "@,y2";
							}
						}

						if (node == "会签部门11") {
							if (Ext.getCmp('hqdep12').getValue() != "") {
								result = "@,y1";
							}
							if (Ext.getCmp('hqdep12').getValue() == "") {
								result = "@,y2";
							}
						}
						if (node == "人力资源总部总经理审") {

							if (fwtype == "制度修改B") {
								result = "@,y2";
							} else {
								result = "@,y1";
							}

						}
						if (node == "部门总经理审核" || node.indexOf("部门会签") != -1
								|| node == "总裁办主任审核"
								|| (node == "人力资源总部总经理审" && fwtype != "制度修改B")) {
							if (Ext.getCmp('shr').getValue() == "") {
								Ext.getCmp('shr').setValue(username);
							} else {
								if (Ext.getCmp('shr').getValue().indexOf(
										username + ",") != -1) {
									Ext
											.getCmp('shr')
											.setValue(
													Ext
															.getCmp('shr')
															.getValue()
															.replace(
																	username
																			+ ",",
																	""));
								}
								if (Ext.getCmp('shr').getValue().indexOf(
										username) != -1) {
									Ext.getCmp('shr').setValue(
											Ext.getCmp('shr').getValue()
													.replace(username, ""));
								}
								Ext.getCmp('shr').setValue(
										Ext.getCmp('shr').getValue() + ","
												+ username);
							}
						}
						if (node == "部门总经理审核" || node.indexOf("部门会签") != -1
								|| node == "总裁办主任审核") {
							Ext.getCmp('shsj').setValue(this.getFullDate());
							// frm.shr.value=_actform.curuser.fullname; //本来
						}

						if (node == "总裁审批") {
							Ext.getCmp('pzsj').setValue(this.getFullDate());
							Ext.getCmp('pzr').setValue(username);
						}
						if (fwtype == "制度修改B" && node == "人力资源总部总经理审") {
							Ext.getCmp('pzr').setValue(username); // frm.WF_UserName.value;
							Ext.getCmp('pzsj').setValue(this.getFullDate());
						}
						if (node == "制度管理员归档") {
							Ext.getCmp('bzhsj').setValue(this.getFullDate());
							Ext.getCmp('bzh').setValue(username);
						}
						Ext.getCmp('conds').setValue(result);
					},
					formload34a : function() {
						var node = Ext.getCmp('node').getValue();
						if (node == "部门总经理审核") {
							Ext.getCmp('shr').setValue("");
						}
						if (node == "制度管理员归档") {
							Ext.getCmp('wjmc').setValue(
									Ext.getCmp('subject').getValue());
						}
						// getflowinfoa();
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
				});