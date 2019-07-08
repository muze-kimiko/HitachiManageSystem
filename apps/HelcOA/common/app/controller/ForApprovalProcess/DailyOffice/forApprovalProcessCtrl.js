/*Sured by QiuXL 20170605*/
Ext.define(
	'HelcOA.controller.ForApprovalProcess.DailyOffice.forApprovalProcessCtrl', {
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
	returnHome : function () {
		var id = Ext.Viewport.getActiveItem().id;
		this.showBackView('Menus_id', 'HelcOA.view.Menus');
		var viewName = Ext.getCmp(id);
		if (viewName) {
			viewName.destroy();
		}
		var store = this.getStore('personnelSelectionS', 'HelcOA.store.ForApprovalProcess.DailyOffice.Idea.personnelSelectionS');
		store.setData([]);
	},

	// 选择结点公共方法
	public_ToSelectNode : function () {
		var obj_this = this;
		var conds = Ext.getCmp('conds').getValue();
		var bpdName = Ext.getCmp('surface_ID').getTitle()._title;
		var approvalOpinionS = this
			.getStore('approvalOpinionS',
				'HelcOA.store.startTheProcess.DailyOffice.Idea.approvalOpinionS');
		approvalOpinionS.setData([]);
		var getResult3 = function (res) {
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
					tp_data.to = lines[nb].to; // 节点ID
					tp_data.name = lines[nb].name; // 节点名
					tp_data.conds = lines[nb].conds; // 节点条件
					tp_data.forkname = lines[nb].forkname; // 节点流向分支
					tp_data.nextacti = acti.node.cfg.nextacti; // 选择条件
					tp_data.anyflag = acti.node.cfg.assign.anyflag; // 是否允许任意选择(0|1)
					tp_data.multflag = acti.node.cfg.assign.multflag; // 是否0单选，1多选
					tp_data.multqty = acti.node.cfg.assign.multqty; // 多选最大数量
					tp_data.url = getAjaxOption(lines[nb].to,
							acti); // 获取人员URL
					tp_data.cfg = getNextCFG(lines[nb].to, acti); // 对应节点配置信息
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
			};
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
		obj_this.NextView('approvalOpinion_ID','HelcOA.view.ForApprovalProcess.DailyOffice.Idea.approvalOpinion');
		// 存储页面ID，用于提交数据后销毁
		Ext.getCmp('SP_View_id').setValue(ViewId);

	},

	/**
	 * 进入选择结点
	 */
	sp_ToSelectNode : function (obj, e, eOpts) {
		var obj_this = this;
		var bpdName = Ext.getCmp('surface_ID').getTitle()._title;
		
		// 分类：日常办公
		if (bpdName == "出差申请") {
			obj_this.zbtrworry();
		} else if (bpdName == "用印申请") {
			obj_this.yysqworry();
		} else if (bpdName == "合同校正章(1)用印申请") {

		} else if (bpdName == "工作联络书") {

		} else if (bpdName == "公司对外合同审批流程") {
			obj_this.worry3();
		} else if (bpdName == "公司发文流程") {
			obj_this.GSFWworry();
		} else if (bpdName == "公司规章制度审批流程") {
			var IdArray = ['subject', 'fwtype', 'hqflag', 'smflag', 'phone', 'wjml', 'wdbh'];
			if (this.isRequired(IdArray)) { return; }
			obj_this.formload34a();
			obj_this.rulesWorry();
		} else if (bpdName == "会议室申请流程") {
			obj_this.Meetingworry();
		} else if (bpdName == "内部法律咨询流程") {

		} else if (bpdName == "公务用车联络流程") {

		} else if (bpdName == "物业公司对外合同审批流程") {
			obj_this.wyhtworry();
		} else if (bpdName == "境外出差申请") {
			obj_this.JWTRworry();
		} else if (bpdName == "法人授权") {

		} else if (bpdName == "投资公司经理出差申请流程") {

		} else if (bpdName == "视频设备申请") {

		} else if (bpdName == "接待客户工作联络流程") {
			//var IdArray = ['ccompany', 'num', 'company', 'subject', 'lfkh', 'pt', 'dh', 'yyy', 'lfkh', 'zw', 'tel'];
			//if (this.isRequired(IdArray)) { return; }
		} 
		
		// 分类：营业/工程业务
		else if (bpdName == "承兑汇票申请") {
			obj_this.AcceptanceDraft();
		}else if (bpdName == "提前开票申请") {
			obj_this.advanceBilling();
		}else if (bpdName == "质量保函申请") {
			obj_this.qualityLG();
		}else if (bpdName == "维修改造工程业务联络流程") {
			obj_this.setvaluedate();
		} else if (bpdName == "开具发票") {

		}else if (bpdName == "外经证申请") {

		} else if (bpdName == "律师函审批流程") {

		} else if (bpdName == "诉讼和解审批流程") {

		} else if (bpdName == "短交货期流程") {

		} else if (bpdName == "短安装期联络工作流程") {

		} else if (bpdName == "电梯_扶梯发货计划") {

		} else if (bpdName == "非正常发货要求联络书流程") {

		} else if (bpdName == "非标报告作业处理流程") {
			if (Ext.getCmp('node').getValue()=="营分司处理方案") {
				if ( Ext.getCmp('phone3').getValue()=="") {
					Ext.Msg.alert("请输入处理方案信息");
					WL.Toast.show("请输入处理方案信息");
					Ext.getCmp('phone3').setRequired(true);
					Ext.getCmp('newmeasure_textarea').focus();
					return false;
				}
			}
			return true;
		} else if (bpdName == "诉讼审批流程") {
			if (Ext.getCmp('node').getValue()=="营业总部总经理审批") {
				if ( Ext.getCmp('zjlyj').getValue()=="") {
					Ext.Msg.alert("请选择是否同意诉讼/仲裁");
					Ext.getCmp('zjlyj').focus();
					Ext.getCmp('zjlyj').setRequired(true);
					return false;
				}
			}
			if (Ext.getCmp('node').getValue()=="总裁审批") {
				if ( Ext.getCmp('zcyj').getValue()=="") {
					Ext.Msg.alert("请选择是否同意诉讼/仲裁");
					Ext.getCmp('zcyj').setRequired(true);
					Ext.getCmp('zcyj').focus();
					return false;
				}
			}
			obj_this.SSSPworry();
		}

		// 分类：提案管理流程
		else if (bpdName == "提案管理流程") {
			//var IdArray = ['no','sname','tel','subject','xzzy_textarea','gszy_textarea','xgzy_textarea'];
			//if (this.isRequired(IdArray)) { return; }
			if (!obj_this.getApplication().getController('startTheProcess.ProposalManage.PM_TAGLLC_NGCtrl').commit()) {
				return;
			}
		}
		
		// 分类：质量控制
		else if (bpdName == "三包申请报告") {
			Ext.Msg.alert("待IT部门后续更新完才能进行手机审批!");
			WL.Toast.show("待IT部门后续更新完才能进行手机审批!");
			return;
			/*var node = Ext.getCmp("node").getValue();
			if (node == '报告者退还旧件') {
				IdArray.splice(-1, 0, 'oldno', 'oldreturndate', 'oldreturnno');
			}*/
		} else if (bpdName == "开箱补缺件及不良问题反馈报告") {
			Ext.Msg.alert("待IT部门后续更新完才能进行手机审批!");
			WL.Toast.show("待IT部门后续更新完才能进行手机审批!");
			return;
			/*if (!this.getApplication().getController('startTheProcess.QualityControl.KXBQJCtrl').checkvalue18()) {
				return;
			};
			obj_this.getApplication().getController('startTheProcess.QualityControl.KXBQJCtrl').worry();*/
		} else if (bpdName == "公司级投诉处理流程") {
			Ext.Msg.alert("待IT部门后续更新完才能进行手机审批!");
			WL.Toast.show("待IT部门后续更新完才能进行手机审批!");
			/*if (obj_this.worry9()) {
				return;
			}
			obj_this.worry9();*/
		} else if (bpdName == "欠料发货电子流程") {

		}

		// 分类：人力资源
		else if (bpdName == "丧假申请流程（派驻人员专用）") {

		} else if (bpdName == "人员转_调岗申请") {

		} else if (bpdName == "公积金申请") {

		} else if (bpdName == "培训设施借用流程") {

		} else if (bpdName == "探亲假申请流程") {

		}  else if (bpdName == "应届毕业生实习培训计划流程") {

		} else if (bpdName == "年度计划外培训需求申请流程") {

		} else if (bpdName == "婚假/产假申请") {

		} 
		
		// 信息技术
		else if (bpdName == "PDA系统账号流程") {
			//var IdArray = ['subject', 'sqtype', 'zhtype', 'sqyy1_textarea'];
			//if (this.isRequired(IdArray)) { return; }
		} else if (bpdName == "IT故障申请流程") {

		} else if (bpdName == "数据恢复申请流程") {

		} else if (bpdName == "数据维护申请流程") {
			//var IdArray = ['createdate', 'phone', 'finishdate', 'subject', 'sysname', 'reason1', 'reason2', 'reason3', 'reason4'];
			//if (this.isRequired(IdArray)) { return; }
		} else if (bpdName == "系统网络账号权限申请") {
			//var IdArray = ['subject', 'phone', 'zhtype', 'sqyy1'];
			obj_this.worry8();
			//if (this.isRequired(IdArray)) { return; }
		} else if (bpdName == "供应商信息维护流程") {

		} else if (bpdName == "客户信息维护流程") {

		} else if (bpdName == "PDA系统设备新增或维修流程") {
			//var IdArray = ['subject', 'phone', 'ygh', 'weizhi', 'lctype', 'wtms_textarea'];
			//if (this.isRequired(IdArray)) { return; }
		} else if (bpdName == "软件维护申请流程") {
			obj_this.ruan();
		} else if (bpdName == "用户权限申请流程") {

		} else if (bpdName == "设备_配件借用申请流程") {
			
		}

		// 天津
		else if (bpdName == "天津出差申请") {
			obj_this.TJtrworry();
		} else if (bpdName == "天津合理化提案流程") {
			obj_this.TJProposal();
		} else if (bpdName == "天津合同审批流程") {

		} else if (bpdName == "天津公务用车申请流程") {

		} else if (bpdName == "天津用印申请") {

		} else if (bpdName == "天津公司发文流程") {
			obj_this.TJDispatch();
		} else if (bpdName == "天津产品退货流程") {

		} else if (bpdName == "天津IT故障申告流程") {

		} else if (bpdName == "天津电脑资料用户申请") {

		} else if (bpdName == "天津电脑资料用户申请") {

		} else if (bpdName == "天津信息系统帐号权限申请流程") {

		} else if (bpdName == "天津软件维护流程") {

		} else if (bpdName == "天津设备_配件借用申请流程") {

		}
		
		// 技术
		else if (bpdName == "档案借阅或复印申请流程") {
			if (obj_this.MJSP()) { return; }
			obj_this.MJSP();
		}
		
		// 财务
		else if (bpdName == "营分司固定资产申请流程") {
			var Temp = Ext.getCmp('node').getValue();
			if(Temp == "财务主管审批") {
				var IdArray = ['sendaddr','lxdh','ghdw','faxno','jyaddr','dh','account'];
				if (this.isRequired(IdArray)) { return; }
			}
			obj_this.yfsGDZworry();
		} else if (bpdName == "用款申请流程") {

		} else if (bpdName == "采购价格变更审批管理") {

		}
		
		// 制造管理
		else if (bpdName == "井道图变更通知单流程") {

		} else if (bpdName == "供应商首批供货流程") {
			if (obj_this.isFirstSupply()) { return; }
			obj_this.FirstSupply();
		}

		// 上海
		else if (bpdName == "上海会议室申请流程") {
			obj_this.SHMeetingworry();
		} else if (bpdName == "上海出差申请") {
			obj_this.SHworry();
		} else if (bpdName == "上海印章申请") {
			obj_this.SHYZworry();
		} else if (bpdName == "上海请休假申请流程") {

		} else if (bpdName == "上海转岗申请") {

		} else if (bpdName == "上海合同审批申请") {
			obj_this.SHhtworry();
		} else if (bpdName == "上海用车申请") {

		} else if (bpdName == "上海年度计划外培训申请流程") {

		} else if (bpdName == "上海品质异常处理流程") {

		}

		// 成都
		else if (bpdName == "成都出差申请") {
			obj_this.cdtrworry();
		} else if (bpdName == "成都公务用车申请") {
			if (this.CDcar()) { return; }
		} else if (bpdName == "成都会议室申请") {
			if (this.CDMeeting()) { return; }
		} else if (bpdName == "成都发文流程") {

		} else if (bpdName == "成都合同审批流程") {

		} else if (bpdName == "成都培训设施使用流程") {

		} else if (bpdName == "成都请休假流程") {

		} else if (bpdName == "成都年度计划外培训") {

		} else if (bpdName == "成都接待客户流程") {

		} else if (bpdName == "成都用印申请流程") {

		} else if (bpdName == "成都人员转调岗流程") {

		} else if (bpdName == "基建报修") {

		} else if (bpdName == "成都规章制度") {

		} else if (bpdName == "成都档案借阅申请流程") {
			if (obj_this.MJSP()) { return; }
			obj_this.MJSP();
		}
		
		// 扶梯
		else if (bpdName == "扶梯出差申请") {
			obj_this.worry();
		} else if (bpdName == "扶梯公积金申请") {

		} else if (bpdName == "扶梯公司发文流程") {

		} else if (bpdName == "扶梯境外出差申请") {

		} else if (bpdName == "扶梯用印申请") {

		} else if (bpdName == "扶梯供应商首批供货流程") {

		} else if (bpdName == "扶梯采购价格变更审批") {

		} else if (bpdName == "扶梯欠料发货电子流程") {

		}
		//
		else if (bpdName == "HB_出差申请") {
			var Temp = Ext.getCmp('node').getValue();
			if(Temp == "申请人确认") {
				var IdArray = ['jpfee','jtfee','zsfee','btfee'];
				if (this.isRequired(IdArray)) { return; }
			}
			obj_this.HB_A2_worry();
		} else if (bpdName == "HB_加班申请") {
			obj_this.HB_A3_worry();
		} else if (bpdName == "HB_考勤补登申请") {
			
		} else if (bpdName == "HB_离司手续办理") {
			var Temp = Ext.getCmp('node').getValue();
			if(Temp == "行政科人员处理") {
				var IdArray = ['scyx'];
				if (this.isRequired(IdArray)) { return; }
			}
			obj_this.HB_A5_worry();
		} else if (bpdName == "HB_离职申请") {
			
		} else if (bpdName == "HB_请假申请") {
			obj_this.HB_A10_worry();
		} else if (bpdName == "HB_人力需求申请") {
			
		} else if (bpdName == "HB_外派人员补贴申请") {
			obj_this.HB_A13_worry();
		} else if (bpdName == "HB_外出申请") {
			
		} else if (bpdName == "HB_用印申请") {
			obj_this.HB_A16_worry();
		} else if (bpdName == "HB_用车申请表") {
			var Temp = Ext.getCmp('node').getValue();
			if(Temp == "派车人") {
				var IdArray = ['driver', 'car'];
				if (this.isRequired(IdArray)) { return; }
			} else if(Temp == "申请人") {
				var IdArray = ['actualcardate', 'actenddate1'];
				if (this.isRequired(IdArray)) { return; }
           }
		} else if (bpdName == "HB_证书借阅使用申请表") {
		
		} else if (bpdName == "HB_员工寄件申请审批表") {
			
		}else if (bpdName == "HB_非生产使用物资申购表") {
			
		} else if (bpdName == "HB_网络资源申请表") {
			
		} else if (bpdName == "HB_班车交通补贴申请撤销申请单") {
			
		} else if (bpdName == "HB_施工许可申请危险作业申请审批表") {
			var Temp = Ext.getCmp('node').getValue();
			if(Temp == "申请人") {
				var IdArray = ['zyfkqk', 'sjqzdate','sjzyqk','iftype'];
				if (this.isRequired(IdArray)) { return; }
			} else if(Temp == "项目监督管理人意见") {
				var IdArray = ['checkqk', 'sjazdate','chaicdate','fanghucs','sfwqcc'];
				if (this.isRequired(IdArray)) { return; }
           }
		} else if (bpdName == "HB_物资电子放行条") {
			
		} else if (bpdName == "HB_物资需求申请") {
			obj_this.HB_H1worry();
		} 
		else if (bpdName == "HB_生产物料供应比例设置修改申请表") {
		
		} 
		else if (bpdName == "HB_供应商调拨申请单") {
			
		} 
         else if (bpdName == "HB_客户产品返销申请单") {
        	var Temp = Ext.getCmp('node').getValue();
 			if(Temp == "仓库接收") {
 				var IdArray = ['ifrepair'];
 				if (this.isRequired(IdArray)) { return; }
 			} 
 			
 			obj_this.HB_H8worry();
		} 
         else if (bpdName == "HB_销售价格价目表申请流程") {
         	
  			obj_this.HB_H11worry();
 		} 
         else if (bpdName == "HB_空进空出申请表") {
          	
   			obj_this.HB_H12worry();
  		} 
         else if (bpdName == "HB_ERP系统采购信息变更申请表") {
           	
    		
   		} 
         else if (bpdName == "HB_工装生产治具设备配件采购申请单") {
        	 var Temp = Ext.getCmp('node').getValue();
  			 if(Temp == "采购报价处理") {
  				var IdArray = ['sum'];
  				if (this.isRequired(IdArray)) { return; }
  			 } 
    			obj_this.HB_H22worry();
   		} 
         else if (bpdName == "HB_产品租赁出库申请") {
            	
     		
    		} 
         else if (bpdName == "HB_客户新增及资料变更申请") {
         	
      		
 		} 
         else if (bpdName == "HB_物流平台合同及需财务审批文件用印申请表") {
          	
        	 obj_this.HB_E5worry();
  		} 
         else if (bpdName == "HB_访客参观申请表") {
        	 var Temp = Ext.getCmp('node').getValue();
  			 if(Temp == "接待员审核1" || Temp == "接待员审核2") {
  				var IdArray = ['notice', 'openinglight','environmentalpatrol','receptionexplanation','accompany','salutatory','sendnewsletters','takepictures', 'openelevator','closeout'];
  				if (this.isRequired(IdArray)) { return; }
  			 } 
   		} 
         else if (bpdName == "HB_培训过程记录及试用期鉴定") {
           	
        	 obj_this.HB_A7worry();
  		} 
		  else {
			alert('该流程名字有误，请联系管理员');
			return;
		}

		this.public_ToSelectNode();
	},
	
	//日常办公类
	//总部出差申请~
	zbtrworry : function () {
		var result = "nocon";
		var waypath = Ext.getCmp('waypath').getValue();
		if (Ext.getCmp('node').getValue() == "一级审批1") {
			if (waypath == "2") {
				result = "@,y1";
			} else if (waypath == "3") {
				result = "@,y2";
			} else if (waypath == "4") {
				result = "@,y3";
			}
		}
		Ext.getCmp('conds').setValue(result);
	},
	//用印申请~
	yysqworry : function () {
		var result = "nocon";
		var yytype = Ext.getCmp('yytype').getValue();
		if (Ext.getCmp('node').getValue() == "部长审批") {
			if (yytype == "其他") {
				result = "@,y2";
			} else {
				result = "@,y1";
			}
			Ext.getCmp('conds').setValue(result);
		}
	},
	// 境外出差申请~
	JWTRworry : function () {
		var result = 'nocon';
		var cc_type = Ext.getCmp('cc_type').getValue();
		var qz_type = Ext.getCmp('qz_type').getValue();
		var guoji = Ext.getCmp('guoji').getValue();
		var trflag = Ext.getCmp('trflag').getValue();
		var nodeValue = Ext.getCmp('node').getValue();
		if (nodeValue == "资料复核") {
			if(trflag=="1"){
				result = "@,y3";
			} else {
				if(guoji=="中国"){
					result = "@,y1";
				} else {
					result = "@,y2";
				}
			}
		} else if (nodeValue == "立项部门总经理审批") {
			if(guoji=="中国"){
				result = "@,y2";
			} else {
				result = "@,y1";
			}
		} else if (nodeValue == "主管正副总裁审批") {
			result = "@,y1";
		} else if (nodeValue == "综合管理科审批") {
			if(guoji=="中国" && qz_type=="需办理"){
				result = "@,y1";
			} else {
				result = "@,y2";
			}
		}
		Ext.getCmp('conds').setValue(result);
	},
	// 公司对外合同审批流程~
	worry3 : function () {
		var result = "nocon";
		// var zbxm = Ext.getCmp('zbxm').getValue();
		var contracttype = Ext.getCmp('contracttype').getValue();
		var hqflag = Ext.getCmp('hqflag').getValue();
		if (Ext.getCmp('node').getValue() == "科长审核") {
			if (hqflag[1].checked) {
				result = "@,y2";
			} else {
				result = "@,y1";
			}
		} else if (Ext.getCmp('node').getValue() == "总经理审核") { // 写环节名
			result = "@,y2";
		} else if (Ext.getCmp('node').getValue() == "财务审核A") {
			var temp = Ext.getCmp('contractyear').getValue()
			if((username=="钟喆 00003252"||username=="邱幸林 00029195"||username=="admin") && temp >= 500000){
				result = "@,y2,y3";
			} else {
				result = "@,y1,y2";
			}
		}
		Ext.getCmp('conds').setValue(result);
	},
	//公司发文流程
	GSFWworry : function () {
		var result = "nocon";
		var fwtype = Ext.getCmp('fwtype').getValue();
		if(Ext.getCmp('node').getValue() == "总裁审核"){
			if(fwtype == "规章制度"){ result="@,y1"; }
			else if(fwtype=="公司发文"){ result="@,y2"; }
		}
		Ext.getCmp('conds').setValue(result);
	},
	Meetingworry : function () {
		var result = "nocon";
		var address = Ext.getCmp('address').getValue();
		if(Ext.getCmp('node').getValue() == "科长审批"){
			if(address=="中信"){ result="@,y1"; }
			else if(address=="大石"){ result="@,y2"; }
			else { result="@,y3"; }
		}
		Ext.getCmp('conds').setValue(result);
	},
	//物业公司对外合同审批~
	wyhtworry : function () {
		var result = "nocon";
		var contracttype = Ext.getCmp('contracttype').getValue();
		var hqflag = Ext.getCmp('hqflag').getValue();
		if (Ext.getCmp('node').getValue() == "部长审核") {
			if ((Ext.getCmp('contractyear').getValue() <= 50000) && (contracttype != "合同撤消")) {
				result = "@,y3";
				Ext.getCmp('tiaojian02').setValue("y3");
			} else if ((Ext.getCmp('contractyear').getValue()) && (contracttype != "合同撤消")) {
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
		if (Ext.getCmp('node').getValue() == "科长审核") { // 写环节名
			if (hqflag == "是") {
				result = "@,y2"; // 写条件
				Ext.getCmp('tiaojian01').setValue("y2");
			} else {
				result = "@,y1";
				Ext.getCmp('tiaojian01').setValue("y1");
			}
		}
		if (Ext.getCmp('node').getValue() == "总经理审核") { // 写环节名
			if (contracttype != "合同撤消") {
				result = "@,y2"; // 写条件
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
	//规章制度发文~
	rulesWorry : function () {
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
		} else if (node == "会签部门1") {
			if (Ext.getCmp('hqdep2').getValue() != "") {
				result = "@,y1";
			}
			if (Ext.getCmp('hqdep2').getValue() == "") {
				result = "@,y2";
			}
		} else if (node == "会签部门2") {
			if (Ext.getCmp('hqdep3').getValue() != "") {
				result = "@,y1";
			}
			if (Ext.getCmp('hqdep3').getValue() == "") {
				result = "@,y2";
			}
		} else if (node == "会签部门3") {
			if (Ext.getCmp('hqdep4').getValue() != "") {
				result = "@,y1";
			}
			if (Ext.getCmp('hqdep4').getValue() == "") {
				result = "@,y2";
			}
		} else if (node == "会签部门4") {
			if (Ext.getCmp('hqdep5').getValue() != "") {
				result = "@,y1";
			}
			if (Ext.getCmp('hqdep5').getValue() == "") {
				result = "@,y2";
			}
		} else if (node == "会签部门5") {
			if (Ext.getCmp('hqdep6').getValue() != "") {
				result = "@,y1";
			}
			if (Ext.getCmp('hqdep6').getValue() == "") {
				result = "@,y2";
			}
		} else if (node == "会签部门6") {
			if (Ext.getCmp('hqdep7').getValue() != "") {
				result = "@,y1";
			}
			if (Ext.getCmp('hqdep7').getValue() == "") {
				result = "@,y2";
			}
		} else if (node == "会签部门7") {
			if (Ext.getCmp('hqdep8').getValue() != "") {
				result = "@,y1";
			}
			if (Ext.getCmp('hqdep8').getValue() == "") {
				result = "@,y2";
			}
		} else if (node == "会签部门8") {
			if (Ext.getCmp('hqdep9').getValue() != "") {
				result = "@,y1";
			}
			if (Ext.getCmp('hqdep9').getValue() == "") {
				result = "@,y2";
			}
		} else if (node == "会签部门9") {
			if (Ext.getCmp('hqdep10').getValue() != "") {
				result = "@,y1";
			}
			if (Ext.getCmp('hqdep10').getValue() == "") {
				result = "@,y2";
			}
		} else if (node == "会签部门10") {
			if (Ext.getCmp('hqdep11').getValue() != "") {
				result = "@,y1";
			}
			if (Ext.getCmp('hqdep11').getValue() == "") {
				result = "@,y2";
			}
		} else if (node == "会签部门11") {
			if (Ext.getCmp('hqdep12').getValue() != "") {
				result = "@,y1";
			}
			if (Ext.getCmp('hqdep12').getValue() == "") {
				result = "@,y2";
			}
		} else if (node == "人力资源总部总经理审") {

			if (fwtype == "制度修改B") {
				result = "@,y2";
			} else {
				result = "@,y1";
			}

		} else if (node == "部门总经理审核" || node.indexOf("部门会签") != -1
			 || node == "总裁办主任审核"
			 || (node == "人力资源总部总经理审" && fwtype != "制度修改B")) {
			if (Ext.getCmp('shr').getValue() == "") {
				Ext.getCmp('shr').setValue(username);
			} else {
				if (Ext.getCmp('shr').getValue().indexOf(username + ",") != -1) {
					Ext.getCmp('shr').setValue(Ext.getCmp('shr').getValue().replace(username + ",",""));
				}
				if (Ext.getCmp('shr').getValue().indexOf(username) != -1) {
					Ext.getCmp('shr').setValue(Ext.getCmp('shr').getValue().replace(username, ""));
				}
				Ext.getCmp('shr').setValue(Ext.getCmp('shr').getValue() + "," + username);
			}
		}
		if (node == "部门总经理审核" || node.indexOf("部门会签") != -1 || node == "总裁办主任审核") {
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
	formload34a : function () {
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
	
	getFullDate : function () {
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

	//信息技术类流程
	//系统网络账号~
	worry8 : function () {
		var result = "nocon";
		var flagg;
		var flagg1;
		var flagg2;
		var flagg3;
		var j = 0;
		var sysname;
		var otherduty;
		var zhtype1;
		var zhtype2;
		var zhtype;
		var depid;

		var outcome1 = [];
		outcome1 = Ext.getCmp('zhtype').getValue().split(",");
		for (var i = 0; i < outcome1.length; i++) {
			if (outcome1[i] == '网络帐号') {
				outcome1[i] = '1';
			} else if (outcome1[i] == 'OA邮件帐号') {
				outcome1[i] = '2';
			} else if (outcome1[i] == 'OA邮件外发权限') {
				outcome1[i] = '3';
			} else if (outcome1[i] == 'ERP账号') {
				outcome1[i] = '15';
			} else if (outcome1[i] == '技术联络单系统帐号') {
				outcome1[i] = '13';
			} else if (outcome1[i] == '日立智能装饰选型系统') {
				outcome1[i] = '24';
			} else if (outcome1[i] == '彩色打印权限') {
				outcome1[i] = '9';
			} else if (outcome1[i] == 'PLM系统帐号') {
				outcome1[i] = '10';
			} else if (outcome1[i] == '视频网络帐号') {
				outcome1[i] = '16';
			} else if (outcome1[i] == '彩色复印权限') {
				outcome1[i] = '21';
			} else if (outcome1[i] == '井道图系统') {
				outcome1[i] = '17';
			} else if (outcome1[i] == 'Siebel系统帐号') {
				outcome1[i] = '12';
			} else if (outcome1[i] == 'EPD参数化系统') {
				outcome1[i] = '19';
			} else if (outcome1[i] == 'MRP2账号') {
				outcome1[i] = '14';
			} else if (outcome1[i] == 'HEDS系统') {
				outcome1[i] = '18';
			} else if (outcome1[i] == 'edoc文档系统') {
				outcome1[i] = '25';
			} else if (outcome1[i] == '远程终端帐号') {
				outcome1[i] = '7';
			} else if (outcome1[i] == '公用机Internet浏览权限') {
				outcome1[i] = '4';
			}
		}
		Ext.getCmp('zhtype').setValue(outcome1);
		if (Ext.getCmp('zhtype1').getValue() == 'RDMP研发管理平台') {
			Ext.getCmp('zhtype1').setValue('20');
		}
		if (Ext.getCmp('zhtype2').getValue() == 'E-HR系统') {
			Ext.getCmp('zhtype2').setValue("22");
		}
		if (Ext.getCmp('zhtype3').getValue() == '财务预算系统') {
			Ext.getCmp('zhtype3').setValue("23");
		}

		depid = Ext.getCmp('depid').getValue();

		sysname = Ext.getCmp('sysname').getValue();

		other_name = Ext.getCmp('other_name').getValue();

		zhtype1 = Ext.getCmp('zhtype1').getValue();

		zhtype2 = Ext.getCmp('zhtype2').getValue();

		var outcome = [];
		outcome = Ext.getCmp('zhtype').getValue().split(",");
		for (var i = 0; i < outcome.length; i++) {
			j = i + 1;
			zhtype = outcome[i];
			if (outcome[i] == '13') {
				flagg1 = 1;
			}
			if (outcome[i] == '10') {
				flagg2 = 2;
			}
			if (outcome[i] == '3') {
				flagg3 = 4;
			}
		}

		if (sysname != "绩效考勤系统"
			 || sysname == "人力资源系统"
			 && sysname != "部长批"
			 && (depid == "007010" || depid == "007012"
				 || depid == "007020"
				 || depid == "007023" || depid == "007016")
			 && otherduty == "是") {

			Ext.getCmp('tiaojian01').setValue('10');
		}

		if (sysname != "绩效考勤系统"
			 || sysname == "人力资源系统"
			 && sysname != "部长批"
			 && (depid == "007010" || depid == "007012"
				 || depid == "007020"
				 || depid == "007023" || depid == "007016")
			 && otherduty == "否") {
			Ext.getCmp('tiaojian01').setValue('y3');

		}

		if ((sysname != "绩效考勤系统" || sysname == "人力资源系统" || zhtype1 != "20")
			 && sysname != "部长批"
			 && depid != "007010"
			 && depid != "007012"
			 && depid != "007020"
			 && depid != "007023"
			 && depid != "007016"
			 && otherduty == "是") {
			Ext.getCmp('tiaojian01').setValue('y9');
		}

		if (flagg1 == 1) {
			Ext.getCmp('tiaojian01').setValue('y4');
		}

		if (flagg2 == 2) {
			Ext.getCmp('tiaojian01').setValue('y5');
		}

		if ((sysname != "绩效考勤系统" || sysname == "人力资源系统" || zhtype1 != "20")
			 && sysname != "部长批"
			 && depid != "007010"
			 && depid != "007012"
			 && depid != "007020"
			 && depid != "007023"
			 && depid != "007016"
			 && otherduty == "否") {
			Ext.getCmp('tiaojian01').setValue('y2');
		}

		if (zhtype1 == "20") {
			Ext.getCmp('tiaojian01').setValue('y7');
		}

		if ((sysname == "绩效考勤系统" || sysname == "人力资源系统" || zhtype1 != "20")
			 || flagg == 3) {
			Ext.getCmp('tiaojian01').setValue('y8');
		}

		if (sysname == "部长批") {

			Ext.getCmp('tiaojian01').setValue('y1');
		}

		if (Ext.getCmp('node').getValue() == "直系领导审批") {
			if (sysname != "绩效考勤系统"
				 || sysname == "人力资源系统"
				 && sysname != "部长批"
				 && (depid == "007010" || depid == "007012"
					 || depid == "007020"
					 || depid == "007023" || depid == "007016")
				 && otherduty == "是") {
				result = "@,10";
			}

			if (sysname != "绩效考勤系统"
				 || sysname == "人力资源系统"
				 && sysname != "部长批"
				 && (depid == "007010" || depid == "007012"
					 || depid == "007020"
					 || depid == "007023" || depid == "007016")
				 && otherduty == "否") {

				result = "@,y3";
			}

			if ((sysname != "绩效考勤系统" || sysname == "人力资源系统" || zhtype1 != "20")
				 && sysname != "部长批"
				 && depid != "007010"
				 && depid != "007012"
				 && depid != "007020"
				 && depid != "007023"
				 && depid != "007016"
				 && otherduty == "是") {
				result = "@,y9";
			}

			if (flagg1 == 1) {
				result = "@,y4";
			}

			if (flagg2 == 2) {
				result = "@,y5";
			}

			if ((sysname != "绩效考勤系统" || sysname == "人力资源系统" || zhtype1 != "20")
				 && sysname != "部长批"
				 && depid != "007010"
				 && depid != "007012"
				 && depid != "007020"
				 && depid != "007023"
				 && depid != "007016"
				 && otherduty == "否") {
				result = "@,y2";
			}

			if (zhtype1 == "20") {
				result = "@,y7";
			}

			if ((sysname == "绩效考勤系统" || sysname == "人力资源系统" || zhtype1 != "20")
				 || flagg == 3) {
				result = "@,y8";
			}

			if (sysname == "部长批") {
				result = "@,y1";
			}
		}

		if (Ext.getCmp('node').getValue() == "部长审批") {
			if (depid != "007010" && depid != "007012"
				 && depid != "007020") {
				result = "@,y1";
			}

			if (depid == "007010" || depid == "007012"
				 || depid == "007020") {
				result = "@,y2";
			}
		}

		if (Ext.getCmp('node').getValue() == "网络工厂实施员分析") {
			if (flagg3 == 4) {
				result = "y3";
			}

			if (zhtype == "1") {
				result = "@";
			}

			if (flagg3 != 4) {
				result = "y1";
			}

			if (otherduty == "否") {
				result = "y2";
			}

			if (otherduty == "是") {
				result = "y4";
			}
		}

		cc.log("conds+++++" + Ext.getCmp('conds').getValue());
		Ext.getCmp('conds').setValue(result);
	},
	//软件维护单~
	ruan : function () {
		var result = "nocon";
		var other_name = Ext.getCmp('other_name').getValue();
		var depid = Ext.getCmp('depid').getValue();
		var threecheck = Ext.getCmp('threecheck').getValue();
		if (Ext.getCmp('node').getValue() == "网络工厂信息科长") {
			if (other_name != "ERP") {
				result = "@,y2";
			} else if (other_name == "ERP") {
				result = "@,y1";
			}
		}
		if (Ext.getCmp('node').getValue() == "实施员业务分析与方案设计") {
			if (depid != "007010" && depid != "007012"
				 && depid != "007020" && other_name == "ERP") {
				result = "y2";
			} else if (depid != "007010" && depid != "007012"
				 && other_name != "ERP") {
				result = "y1";
			}
			if (depid == "007010" || depid == "007012"
				 || depid == "007020") {
				result = "y3";
			} else {
				result = "@";
			}
		}
		if (Ext.getCmp('node').getValue() == "用户确认") {
			if (threecheck == "否") {
				result = "y2";
			} else if (threecheck == "是") {
				result = "y1";
			} else {
				result = "@";
			}
		}
		Ext.getCmp('conds').setValue(result);
	},
	// 供应商首批供货流程
	FirstSupply : function () {
		var result = "nocon";
		var zbtype = Ext.getCmp('zbtype').getValue();
		var sjtype = Ext.getCmp('sjtype').getValue();
		var Temp = Ext.getCmp('node').getValue();
		Ext.getCmp('agentpeofdep').setValue(username);
		cc.log(Ext.getCmp('agentpeofdep').getValue());
		if (Temp == "部品质保科科长审核1") {
			if (zbtype == "合格(需要转设计开发质保科)") {
				result = "y2,@";
			}
			if (zbtype == "合格(不需要转设计开发保科)" || zbtype == "不合格") {
				result = "y1,@";
			}
		}
		if (Temp == "设计开发质保科长审核") {
			if (sjtype == "转部品质保科") {
				result = "y1,@";
			}
			if (sjtype == "合格") {
				result = "y2,@";
			}
		}
		Ext.getCmp('conds').setValue(result);
	},
	isFirstSupply : function () {
		var zbtype = Ext.getCmp('zbtype').getValue();
		var sjtype = Ext.getCmp('sjtype').getValue();
		var Temp = Ext.getCmp('node').getValue();
		var planno = Ext.getCmp('planno').getValue();
		var wzdm = Ext.getCmp('wzdm').getValue();
		if (Temp == "计划科科员处理") {
			if (planno == "" || wzdm == "") {
				alert("计划号和物资代码都不能为空！")
				return true;
			}
		}
		if (Temp == "部品质保科科员处理") {
			if (zbtype == "") {
				alert('请选择，再提交！');
				return true;
			}
		}
		if (Temp == "设计开发质保科处理") {
			if (sjtype == "") {
				alert('请选择，再提交！');
				return true;
			}
		}
		return false;
	},
	//数据维护申请流程
	SJWHworry : function () {
		var Temp = Ext.getCmp('node').getValue();
		var usetype = Ext.getCmp('usetype').getValue();
		var result = "nocon";
		if(Temp == "实施员评估"){
			if (usetype == "导出") {
				result = "@,y3,y4";
			} else {
				result = "@,y1,y2,y4";
			}
		}
		Ext.getCmp('conds').setValue(result);
	},

	// 公司级投诉流程~待定
	worry9 : function () {
		var Temp = Ext.getCmp('node').getValue();
		if (Temp == "品证分派任务") {
			if (Ext.getCmp('gsdw').getValue() == "") {
				Ext.Msg.alert('请填写归属单位');
				return true;
			}
			if (Ext.getCmp('ts_again').getValue() == "") {
				Ext.Msg.alert('请选择投诉类型');
				return true;
			}
			if (Ext.getCmp('tsjb').getValue() == "") {
				Ext.Msg.alert('请选择投诉级别');
				return true;
			}
		}
		if (Temp == "总部品证跟进") {
			if (Ext.getCmp('sendreader').getValue() == "") {
				Ext.Msg.alert('请填写抄送人员');
				return true;
			}
		}
		// Ext.Msg.alert(Temp);
		if (Temp == "投诉处理完成") {
			// Ext.Msg.alert("test1103"+Ext.getCmp('rensonfx_textarea').getValue());
			if (Ext.getCmp('rensonfx_textarea').getValue() == "") {
				alert('请填写跟进处理情况及原因分析');
				return true;
			}
			if (Ext.getCmp('cuoshi_textarea').getValue() == "") {
				alert('请填写处理办法/纠正预防措施');
				return true;
			}
			if (Ext.getCmp('jieguo_textarea').getValue() == "") {
				alert('请填写处理结果(或客户意见)');
				return true;
			}
		}
		if (Temp == "最终确认") {
			if (Ext.getCmp('resdept').getValue() == "") {
				alert('请填写主责处理部门');
				return true;
			}
			if (Ext.getCmp('tsjbhd').getValue() == "") {
				alert('请填写投诉级别核定');
				return true;
			}
			if (Ext.getCmp('checkv').getValue() == "") {
				alert('请填写售后状况');
				return true;
			}
			// dateCompare("","");
			aDate = Ext.getCmp('checkdate').getValue().split(
					"-");
			oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-'
					 + aDate[0]); // 转换为12-18-2002格式
			aDate = Ext.getCmp('ckadatejs').getValue().split(
					"-");
			oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-'
					 + aDate[0]);
			iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 /60 / 24); // 把相差的毫秒数转换为天数
			Ext.getCmp('zq').setValue(iDays);
		}
	},
	
	MJSP : function () {
		var Temp = Ext.getCmp('node').getValue();
		if (Temp == "信息核查与资料确认") {
			if (Ext.getCmp('mjxz').getValue() == "") {
				alert('请填写密级选择');
				return true;
			}
		}
	},
	
	//营业类流程worry
	//维修改造业务
	setvaluedate : function() {
        var myDate = new Date();
        var datestr=myDate.toLocaleDateString();
        var timestr=myDate.toTimeString();
        datestr=datestr.replace("年","-");
        datestr=datestr.replace("月","-");
        datestr=datestr.replace("日","");
        timestr=timestr.replace(" UTC+0800","");
        datestr=datestr+" "+timestr;
	    var node = Ext.getCmp('node').getValue();
	    if (node=="业务科市场分析员审核确认") {
	    	Ext.getCmp('qwdate').setValue(datestr);
	    }
	    if (node=="技术科科长审核处理" || node=="技术科工程师进行处理") {
	    	Ext.getCmp('qwdate2').setValue(datestr);
	    }
	    if (node=="业务科市场分析员确认") {
	    	Ext.getCmp('qwdate3').setValue(datestr);
	    }
	    if (node=="分公司工程部长或以上审核确认") {
	    	Ext.getCmp('qwdategcbz').setValue(datestr);
	    }
	    if (node=="分公司确认完工") {
	    	Ext.getCmp('qwdatebgr').setValue(datestr);
	    }
	},
	//承兑汇票
	AcceptanceDraft : function () {
		var Temp = Ext.getCmp('node').getValue();
		var result = "nocon";
		if(Temp=="起草申请"){
			if(Ext.getCmp('dept').getValue()=="合同销售科"){ result = "y1";
			}else{ result = "@"; }
		}else if(Temp=="分公司财务主管审核"){
			Ext.getCmp('lx').setValue("0");
		}else if(Temp=="分公司总经理审核"){
			Ext.getCmp('lx').setValue("1");
		}else if(Temp=="销售科科长审核"){
			Ext.getCmp('lx').setValue("2");
		}else if(Temp=="合同部长审核"){
			Ext.getCmp('lx').setValue("3");
		}else if(Temp=="营业部领导审核"){
			Ext.getCmp('lx').setValue("4");
		}else if(Temp=="资金管理科审核"){
			Ext.getCmp('lx').setValue("5");
		}else if(Temp=="财务部长审核"){
			Ext.getCmp('lx').setValue("6");
		}else if(Temp=="合同销售科相关区域人员审核"){
			Ext.getCmp('lx').setValue("7");
		}else if(Temp=="资金管理科相关区域人员审核"){
			Ext.getCmp('lx').setValue("8");
		}else if(Temp=="驳回申请人修改"){
			if(Ext.getCmp('lx').getValue()=="0"||Ext.getCmp('lx').getValue()==""){
				result="@";
			}else{ result = "y" + Ext.getCmp('lx').getValue(); }
		}
		Ext.getCmp('conds').setValue(result);
	},
	//提前开票申请流程
	advanceBilling : function (){
		var Temp = Ext.getCmp('node').getValue();
		var lx = Ext.getCmp('lx').getValue();
		var sfzp = Ext.getCmp('sfzp').getValue();
		//sfzp
		var result = "nocon";
		if(Temp=="分公司财务审核"){
			Ext.getCmp('lx').setValue("0");
		}else if(Temp=="分公司总经理审核"){
			Ext.getCmp('lx').setValue("1");
		}else if(Temp=="销售科科长审核"){
			Ext.getCmp('lx').setValue("2");
		}else if(Temp=="合同部长审核"){
			Ext.getCmp('lx').setValue("3");
			if(sfzp=="是"){
				result = "@,y1,y2";
			}else{
				result = "y1,y2,y3";
			}
		}else if(Temp=="营业总部领导审核"){
			Ext.getCmp('lx').setValue("4");
		}else if(Temp=="合同销售科相关区域人员审核"){
			Ext.getCmp('lx').setValue("5");
		}else if(Temp=="资金管理科相关区域人员审核"){
			Ext.getCmp('lx').setValue("6");
			Ext.getCmp('xg').setValue(username);
		}else if(Temp=="资金管理科审核"){
			Ext.getCmp('lx').setValue("7");
		}else if(Temp=="财务部长审核"){
			Ext.getCmp('lx').setValue("8");
		}else if(Temp=="驳回申请人修改"||Temp=="起草申请"){
			if(lx=="0"||lx==""){
				result="@";
			}else{
				result = "y" + lx;
			}
		}
		Ext.getCmp('conds').setValue(result);
	},
	//质量保函申请
	qualityLG : function (){
		var Temp = Ext.getCmp('node').getValue();
		var lx = Ext.getCmp('lx').getValue();
		var xztype = Ext.getCmp('xztype').getValue();	/* xztype=0为总公司签订质量保函，1为营分司签订质量保函 */
		var bhje = Ext.getCmp('bhje').getValue().replace(",","");
		var result = "nocon";
		if (Temp == "起草申请") {
			if(depid=="BA00"){ result = "@"; }	/*总部则提交合同销售科*/
			else{ result = "y1"; }			/*分司则提交分司营业负责人*/
		} else if(Temp == "销售科科长审核"){
			if(xztype==0){ result = "@,y1,y2"; }/*为0时提交合同部长*/
			else{ result="@,y1,y3"; }		/*为1时提交分司营业负责人*/
			lx = "y2";
		} else if(Temp == "营分司营业负责人"){
			result = "@,y1,y2";		/*提交财务主管*/
			lx = "@";
		} else if(Temp == "营业总经理审批"){
			if(xztype==0){ 
				if(bhje >= 500000){ result = "@,y1,y4"; }	/*为0时且大于等于50W提交副总裁*/
				else { result = "@,y1,y2"; }			/*为0时且小于50W提交结算管理科长*/
			} else { result = "@,y1,y3"; }		/*为1时提交投资管理科长*/
			lx = "y4";
		} else if(Temp == "副总裁审批"){
			if(bhje < 1000000){ result = "@,y1"; }	/*小于100W提交结算管理科长*/
			else { result = "@,y2"; }			/*大于等于于100W提交总裁*/
		} else if(Temp == "总部财务管理部部长"){
			if(bhje >= 500000){ result = "@,y1,y3"; }	/*大于等于50W提交营业总经理*/
			else { result = "@,y1,y2"; }			/*小于50W提交投资管理科长*/
			lx = "y9";
		} else if(Temp == "结算管理科科长审核"){
			if(bhje >= 500000){ result = "@,y1,y3"; }	/*大于等于50W提交财务总经理*/
			else { result = "@,y1,y2"; }		/*小于50W提交合同销售科处理*/
			lx = "y5";
		} else if(Temp == "分公司总经理审核"){
			if(xztype==0){ result = "@,y1,y2"; }/*为0时提交销售科长*/
			else{ result="@,y1,y3"; }		/*为1时提交总部财务部长*/
			lx = "y1";
		} else if(Temp == "合同部长审核"){
			lx = "y3";
		} else if(Temp == "合同销售科审核"){
			lx = "y6";
		} else if(Temp == "营业部门负责人审核"){
			lx = "y7";
		} else if(Temp == "分公司财务主管审核"){
			lx = "y8";
		} else if(Temp == "投资管理科科长审核"){
			lx = "y10";
		} else if(Temp == "投资管理科相关人员审核"){
			lx = "y11";
		} else if(Temp == "驳回申请人修改"){
			result = lx;
		}
		Ext.getCmp('lx').setValue(lx);
		Ext.getCmp('conds').setValue(result);
	},
	//诉讼审批
	SSSPworry : function () {
		var result="nocon";
		var temp = Ext.getCmp('node').getValue();
		var isapply = Ext.getCmp('isapply').getValue();
		var httype = Ext.getCmp('httype').getValue();
		var zjlyj=Ext.getCmp('zjlyj').getValue();
		var zcyj=Ext.getCmp('zcyj').getValue();
		if (temp == "法务科复核信息") {
			result = "@,y1,y3";
		} else if (temp == "营业总部直属部长审批") {
			if(httype == "买卖合同" || httype == "买卖附带安装合同" || httype == "营销司三方合同") {
				result = "y1";
			} else {
				result = "@,y1";	
			}
			
		} else if (temp == "营业总部总经理审批") {
			if(zjlyj == "是" ) {
				result = "y1";
			} else {
				result = "@";	
			}
			
		}
		else if (temp == "总裁审批") {
			if(zcyj == "是" ) {
				result = "y1";
			} else {
				result = "@";	
			}
			
		}
		Ext.getCmp('conds').setValue(result);
	},
	
	//财务类流程worry
	// 营分司固定资产
	yfsGDZworry : function () {
		var Temp = Ext.getCmp('node').getValue();
		var result = "nocon";
		var xz_type = Ext.getCmp('xz_type').getValue();
		var ysgz = Ext.getCmp('ysgz').getValue();
		if(xz_type=="其他"){xz_type = "0";}
		else if(xz_type=="台式电脑"){xz_type = "1";}
		else if(xz_type=="工程用汽车、房屋、单项5万以上"){xz_type = "2";}
		else if(xz_type=="其他部门汽车、房屋、单项5万以上"){xz_type = "3";}
		else if(xz_type=="工程用影仪、等离子电视、手提电脑、3000元以上数码相机"){xz_type = "4";}
		else if(xz_type=="其他部门影仪、等离子电视、手提电脑、3000元以上数码相机"){xz_type = "5";}
		if (Temp == "营分司总经理审批") {
			if(ysgz == "预算内购置" && xz_type == "0"){
				result = "@,y4";// 预算内、其他直接过
			}else if(xz_type == "1" || xz_type == "4" || xz_type == "5"){
				result = "@,y2";// 其设备类到信息中心
			}else if(xz_type == "2"){
				result = "@,y3";// 工程用到工程老总
			}else{
				result = "@,y1";// 其他的用到营业老总
			}
		} else if(Temp == "信息中心审核") {
			if(xz_type == "1" && ysgz == "预算内购置"){
				result = "@,y3,y4";// 预算内台式机直接过
			}else if(xz_type == "1" && ysgz == "预算外购置"){
				result = "@,y1,y3";// 预算外台式机给营业老总
			}else if(xz_type == "4"){
				result = "@,y3,y5";// 工程部门用给工程老总
			}else if(xz_type == "5"){
				result = "@,y1,y3";// 其他部门用给营业老总
			}else{
				result = "@,y2,y3";// 其他给李部批
			}
		} else if(Temp == "信息中心部长审批") {
			if(xz_type == "4"){
				result = "@,y2";// 工程部门用给工程老总
			}else{
				result = "@,y1";// 其他部门用给营业老总
			}
		} else if(Temp == "总裁审批") {
			if(xz_type == "1" || xz_type == "4" || xz_type == "5"){
				result = "@,y2";
			}else{
				result = "@,y1";
			}
		}
		Ext.getCmp('conds').setValue(result);
	},
	
	//上海类流程和worry
	//上海合同审批~
	SHhtworry : function () {
		var Temp = Ext.getCmp('node').getValue();
		var result = "nocon";
		var ysflag = Ext.getCmp('ysflag').getValue();
		var htje = Ext.getCmp('htje').getValue();
		if (Temp == "财务部长审核") {
			if (ysflag == "否" || htje>=200000) {
				result = "@,y1";
			} else {
				result = "@,y2";
			}
		}
		Ext.getCmp('conds').setValue(result);
	},
	// 上海出差审批~
	SHworry : function () {
		var result = "nocon";
		var T = Ext.getCmp('node').getValue();
		var plant = Ext.getCmp('plant').getValue();
		var iswai = Ext.getCmp('iswai').getValue();
		var waypath = Ext.getCmp('waypath').getValue();
		if (T == "一级审批1") {
			if (waypath == "2") { result = "@,y1"; }
			else if (waypath == "3") { result = "@,y2"; }
			else if (waypath == "4") { result = "@,y3"; }
		} else if (T == "一级审批2") {
			if (iswai == "是") { result = "@,y3"; }
			else if (plant == "是") { result = "@,y2"; }
			else { result = "@,y1"; }
		} else if (T == "二级审批1") {
			if (iswai == "是") { result = "@,y3"; }
			else if (plant == "是") { result = "@,y2"; }
			else { result = "@,y1"; }
		} else if (T == "三级审批1") {
			if (iswai == "是") { result = "@,y3"; }
			else if (plant == "是") { result = "@,y2"; }
			else { result = "@,y1"; }
		} else if (T == "四级审批") {
			if (iswai == "是") { result = "@,y3"; }
			else if (plant == "是") { result = "@,y2"; }
			else { result = "@,y1"; }
		} else if (T == "总经办审批") {
			if (plant == "否") { result = "@";
			} else { result = "y1"; }
		}
		Ext.getCmp('conds').setValue(result);
	},
	//上海印章~
	SHYZworry : function () {
		var result = "nocon";
		var Temp = Ext.getCmp('node').getValue();
		var yztype = Ext.getCmp('yztype').getValue();
		var depflag = Ext.getCmp('depflag').getValue();
		if(Temp=="科长审批"){
		   if(depflag=="2" && yztype!="法人章"){
		      result="@,y1";
		    } else if(depflag=="2" && yztype=="法人章"){
		      result="@,y2";
		    } else if(depflag!="2"){        
		            result="@,y3";
		    }
		} else if(Temp=="部长审批"){
		   if(depflag=="1" || yztype!="法人章"){
		      result="@,y1";
		    } else if(depflag=="0" && yztype=="法人章"){
		      result="@,y2";
		    }
		}
		Ext.getCmp('conds').setValue(result);
	},
	//上海会议室申请流程
	SHMeetingworry : function(){
		var result="nocon";
		var address=Ext.getCmp('address').getValue();
		if(Ext.getCmp('node').getValue()=="科长审批"){
		   if(address=="培训楼"){
		      result="@,y3";
		    }
		    else if(address=="办公楼"){

		      result="@,y2";
		    }
		    else 
		        {        
		            result="@,y1";
		         }
		}
		Ext.getCmp('conds').setValue(result);
	},
	
	//天津类流程worry方法
	//天津出差
	TJtrworry : function () {
		var result = "nocon";
		var node_name = Ext.getCmp('node').getValue();
		var waypath = Ext.getCmp('waypath').getValue();
		var plant = Ext.getCmp('plant').getValue();
		if (node_name == "一级审批1") {
			if (waypath == "2") {
				result = "@,y1";
			}
			if (waypath == "3") {
				result = "@,y2";
			}
			if (waypath == "4") {
				result = "@,y3";
			}
			Ext.getCmp('conds').setValue(result);
		} else if (node_name == "一级审批2" || node_name == "二级审批1" || node_name == "三级审批1" || node_name == "四级审批" ){
			if(plant=="是"){
				result = "@,y2";
			} else {
				result = "@,y1";
			}
		}
		Ext.getCmp('conds').setValue(result);
	},
	// 天津发文流程~
	TJDispatch : function () {
		var result = "nocon";
		var ghflag = Ext.getCmp('ghflag').getValue();
		if (Ext.getCmp('node').getValue() == "部门主管审核") {
			if (ghflag == "否") {
				result = "@,y1";
			}
			if (ghflag == "是") {
				result = "@,y2";
			}
		}
		Ext.getCmp('conds').setValue(result);
	},
	
	// 天津合理化提案流程~
	TJProposal : function () {
		var result = "nocon";
		var bmflag = Ext.getCmp('bmflag').getValue();
		if (Ext.getCmp('node').getValue() == "科长审核") {
			if (bmflag == "1") {
				result = "@,y1";
			} else {
				result = "@,y2";
			}
		}
		Ext.getCmp('conds').setValue(result);
	},
	
	//成都类流程worry
	// 成都公务用车流程~
	CDcar : function () {
		var Temp = Ext.getCmp('node').getValue();
		var carno = Ext.getCmp('carno').getValue();
		var sjname = Ext.getCmp('sjname').getValue();
		if (Temp == "车辆管理员派车") {
			if (carno == "" || sjname == "") {
				alert("车号和司机不能空不能为空！")
				return true;
			} else {
				return false;
			}
		}
		cc.log(Ext.getCmp('conds').getValue());
	},
	//
	cdtrworry : function () {
		var result = "nocon";
		var waypath = Ext.getCmp('waypath').getValue();
		if (Ext.getCmp('node').getValue() == "一级审批1") {
			if (waypath == "2") {
				result = "@,y1";
			} else if (waypath == "3") {
				result = "@,y2";
			} else if (waypath == "4") {
				result = "@,y3";
			}
		}
		Ext.getCmp('conds').setValue(result);
	},
	// 成都会议室流程~
	CDMeeting : function () {
		var Temp = Ext.getCmp('node').getValue();
		var a = Ext.getCmp('fjh1_textarea').getValue();
		if (Temp == "前台安排") {
			if (a == "") {
				alert("请填入房间号！")
				return true;
			} else {
				return false;
			}
		}
		cc.log(Ext.getCmp('conds').getValue());
	},
	// 日滨出差流程~
	//日滨出差申请
	HB_A2_worry : function () {
		var result = "nocon";
		var inst = Ext.getCmp('inst').getValue();//frm.ssss.value
		var bm = Ext.getCmp('bm').getValue();
		var zhiwu = Ext.getCmp('zhiwu').getValue();
		var bl  = Ext.getCmp('ifbl').getValue();
		var stayd = Ext.getCmp('stayd').getValue();
		var Temp = Ext.getCmp('node').getValue();
		if(Temp == "科长审批"){
			if(stayd > 3 || inst.indexOf("飞机")>-1){
				result = "@,y1";	//超过3天或者坐飞机提交部长
			} else {
				if(bl=="是") {
					result = "@,y2";	//不良出差提交质管审核
				} else {
					result = "@,y3";
				}
			}
		} else if(Temp == "部长审批"){
			if(bl=="是") {
				result = "@,y1";	//不良出差提交质管审核
			} else {
				if(stayd > 5){
					if(bm == "制造部" || bm == "质量管理部"){
						result = "@,y2";	//提交分管副总
					} else {
						result = "@,y3";	//提交常务副总
					}
				} else {
					if(bm == "制造部" || bm == "质量管理部"){
						result = "@,y2";	//提交分管副总
					} else {
						result = "@,y4";
					}
				}
			}
		} else if(Temp == "质量管理科长审批") {
			if(stayd > 5){
				if(bm == "制造部" || bm == "质量管理部"){
					result = "@,y1";	//提交分管副总
				} else {
					result = "@,y2";	//提交常务副总
				}
			} else {
				if(bm == "制造部" || bm == "质量管理部"){
					result = "@,y1";	//提交分管副总
				} else {
					result = "@,y3";	//申请人填写费用
				}
			}
		}
		
		Ext.getCmp('conds').setValue(result);
	},
	//日滨加班申请
	HB_A3_worry : function () {
		var result = "nocon";
		var ifpx = Ext.getCmp('ifpx').getValue();
		var zw = Ext.getCmp('zhiwu').getValue();
		var jbtype = Ext.getCmp('jbtype').getValue();
		var jbfs = Ext.getCmp('jbfs').getValue();
		var Temp = Ext.getCmp('node').getValue();
		if(Temp == "科长审批"){
			if(jbtype == "国家规定的节日加班"||jbfs=="外勤加班"||jbfs=="出差加班") {
				result = "@,y1,y3";
			} else {
				result = "@,y2,y3";
			}
		}
		Ext.getCmp('conds').setValue(result);
	},
	//日滨离司手续
	HB_A5_worry : function () {
		var result = "nocon";
		var scyx = Ext.getCmp('scyx').getValue();
		var Temp = Ext.getCmp('node').getValue();
		if(Temp == "行政科人员处理"){
			if(scyx == "生产一线人员") {
				result = "y1,y2,y3,y4";
			} else {
				result = "y1,y2,y3,y4,y5,y6,y7,y8,y9";
			}
		}
		Ext.getCmp('conds').setValue(result);
	},
	
	//日滨请假申请
	HB_A10_worry : function () {
		var result = "nocon";
		var ts = Ext.getCmp('ts').getValue();
		var zhiwu = Ext.getCmp('zhiwu').getValue();
		var Temp = Ext.getCmp('node').getValue();
		if(Temp == "行政科人力资源组"){
			if(zhiwu == "部长") {
				result = "@,y3";
			} else if(zhiwu == "科长") {
				result = "@,y2";
			} else {
				result = "@,y1";
			}
		} else if(Temp == "科长审批"){
			if( ts > 1 ) {result = "@,y1,y2";} else {result = "@,y1,y3";}
		} else if(Temp == "部长审批"){
			if( ts > 3 ) {result = "@,y2";} else {result = "@,y1";}
		}
		Ext.getCmp('conds').setValue(result);
	},
	
	//日滨外派人员补贴申请
	HB_A13_worry : function () {
		var result = "nocon";
		var bm = Ext.getCmp('bm').getValue();
		var Temp = Ext.getCmp('node').getValue();
		if(Temp == "管理部"){
			if(bm == "管理部" || bm == "开发设计部" || bm == "企业发展部" || bm == "市场部") {
				result = "y1";
			}else{
				result = "@";
			}
		}
		Ext.getCmp('conds').setValue(result);
	},
	//日滨用印申请
	HB_A16_worry : function () {
		var result = "nocon";
		var Temp = Ext.getCmp('node').getValue();
		var yymc = Ext.getCmp('yymc').getValue();
		var yytype = Ext.getCmp('yytype').getValue();
		//修改时间：2017-12-20
		//var ifwl = Ext.getCmp('ifwl').getValue();
		if(Temp == "部长审批"){
			/* 物流平台合同章和公章提交财务 */
		    if( yytype == "个人证明"){result = "@,y1"; }
			/* 业务专用章提交经办人处理 */
			else if(yymc != "业务专用章" &&  yytype != "个人证明"){result = "@,y2"; }
			/* 其他提交常务副总审批 */
			else { result = "@,y3"; }
		} else if(Temp == "常务副总审批"){
			/* 物流平台合同章和公章提交财务 */
		   if((yymc=="公章"||yymc=="合同专用章")&&(yytype=="产品销售合同"||yytype=="产品销售合同"||yytype=="工程项目类"||yytype=="技术开发合同"))
		   { result = "@,y2"; }
		   else { result = "@,y1"; }
		} 
		Ext.getCmp('conds').setValue(result);
	},
	//日滨用车
	usecarworry : function () {
		var result = "nocon";
		var gangwei = Ext.getCmp('zhiwu').getValue();
		if(Ext.getCmp('node').getValue() == "起草"){
			if(gangwei == "部长"){ 
				result="@,y2"; }
			else{ 
				result="@,y1"; }
		}
		Ext.getCmp('conds').setValue(result);
	},
	//日滨物资需求
	HB_H1worry : function () {
		var result = "nocon";
		var consumptiontime = Ext.getCmp('consumptiontime').getValue();
		var ssum= Ext.getCmp('sum').getValue();
		var m= Ext.getCmp('count300').getValue();
		
		if(Ext.getCmp('node').getValue() == "部长审核"){
			if(consumptiontime == "3个月内可消耗"  && ssum<2000 && m<1){ 
				result="@,y1"; }
			else if(consumptiontime=="3个月内可消耗" &&  (ssum>=2000 || m>=1) ) {
				result = "@,y3";
			}
			else{ 
				result="@,y2"; }
			Ext.getCmp('conds').setValue(result);
		}
		if(Ext.getCmp('node').getValue() == "制造部审核"){
			if(ssum<2000 && m<1){ 
				 result = "@,y2"; }
			else{ 
				result="@,y1"; }
			Ext.getCmp('conds').setValue(result);
		}
		
		if(Ext.getCmp('node').getValue() == "生产管理科处理"){
			var materialattributes=Ext.getCmp('materialattributes').getValue();
			if(materialattributes=="采购"){ 
				 result =  "y1,y2"; }
			else{ 
				result="y3,y2"; }
			Ext.getCmp('conds').setValue(result);
		}
		
	},
	//
	HB_H8worry : function () {
		var result = "nocon";
		var ssum= Ext.getCmp('sum').getValue();
		var m= Ext.getCmp('count300').getValue();
		
		if(Ext.getCmp('node').getValue() == "质量管理部长" || Ext.getCmp('node').getValue() =="制造管理部长" ){
			if (ssum<=2000 && m<1) {
		         result = "@,y2,y3";
		    } else {
		          result = "@,y1,y3";
		      }
			Ext.getCmp('conds').setValue(result);
		}
		if(Ext.getCmp('node').getValue() == "仓库接收"){
		    var ifrepair= Ext.getCmp('ifrepair').getValue();
			 if ( ifrepair=="是") {
		           result = "y1";
		        }
		       else {  
		           result = "y2";
		        } 
			  Ext.getCmp('conds').setValue(result);
		}
	},
	//
	HB_H11worry : function () {
		var result = "nocon";
		var applytype= Ext.getCmp('applytype').getValue();
		if(Ext.getCmp('node').getValue() == "制造部部长"  ){
			if (applytype=="制造部专用特殊产品") {
				 result = "y1";
		    } else {
		    	 result = "@";
		      }
			Ext.getCmp('conds').setValue(result);
		}
		
	},
	//空进空出
	HB_H12worry : function () {
		var result = "nocon";
		var applytype= Ext.getCmp('applytype').getValue();
		if(Ext.getCmp('node').getValue() == "科长审核"  ){
			if (applytype=="外协发料") {
				 result = "y2,y3";
		    } else {
		    	result = "y1,y3";
		      }
			Ext.getCmp('conds').setValue(result);
		}
		if(Ext.getCmp('node').getValue() == "质量工程师确认"  ){
			 if (applytype=="销售发货"  ) { 
				   result = "@,y1,y4"; 
				   }
				else if  (applytype=="外协发料"  ) {
				    result = "@,y3,y4";
				}
				 else {
				   result = "@,y2,y4";
				}
			Ext.getCmp('conds').setValue(result);
		}
		
	},
	//
	HB_H22worry : function () {
		var result = "nocon";
		var applytype= Ext.getCmp('applytype').getValue();
		if(Ext.getCmp('node').getValue() == "采购报价处理"  ){
			if (applytype=="试制" ) { 
				   result = "@,y1";
				} else {
				   result = "@,y2";
				}
			Ext.getCmp('conds').setValue(result);
		}
		if(Ext.getCmp('node').getValue() == "制造部部长审批"  ){
			var m= Ext.getCmp('sum').getValue();
			 if ( m<=10000) {
				   result = "@,y1";
				} else {
				   result = "@,y2";
				}
			Ext.getCmp('conds').setValue(result);
		}
		
	},
	//
	HB_E5worry : function () {
		var result = "nocon";
		var  kftype= Ext.getCmp('ytype').getValue();
		    
		if(Ext.getCmp('node').getValue() == "部长审批"  ){
			  if ( kftype=="技术开发合同" ) { 
				 
				   result = "@,y2"; 
				   }
				 else {
					
				   result = "@,y1";
				}
			  Ext.getCmp('conds').setValue(result);
		}
	},
	//
	HB_A7worry : function () {
		var result = "nocon";
		var  kftype= Ext.getCmp('ifly').getValue();
		    
		if(Ext.getCmp('node').getValue() == "协同办理1"  ){
			if(kftype=="不留用")
			   {result = "@";}
			else 
			{result = "y1";}
			  Ext.getCmp('conds').setValue(result);
		}
		if(Ext.getCmp('node').getValue() == "管理部长审批"  ){
			var  bm= Ext.getCmp('bm').getValue();
			if(kftype=="建议提前" && (bm=="质量管理部" ||bm=="制造部" ))
			   {result = "y1";}
			else if( (kftype=="建议提前" || kftype=="不留用") && (bm=="开发设计部" ||bm=="企业发展部" ||bm=="市场部" ||bm=="管理部" )){
				result = "y2";
			}
			else 
			{result = "y3";}
			  Ext.getCmp('conds').setValue(result);
		}
	},
	//
});