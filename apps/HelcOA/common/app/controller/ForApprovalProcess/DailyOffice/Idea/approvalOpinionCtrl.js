/**
 * 审批意见
 */
Ext.define('HelcOA.controller.ForApprovalProcess.DailyOffice.Idea.approvalOpinionCtrl', {
	extend : 'HelcOA.controller.ApplicationController',
	id : 'approvalOpinionCtrl_ID',
	config : {
		control : {
			'button#returnTravelRequest_ID' : {
				tap : 'returnTravelRequest',
			},
			'button#submitTravelRequest_ID' : {
				tap : 'submitTravelRequest',
			},
			"list#reutingList_ID" : {
				itemtap : 'select'
			},
			"selectfield#select_ideaCon" : {
				change : 'select_ideaCon'
			},
		}
	},

	// 改变常用意见给意见赋值
	select_ideaCon : function (obj, newValue, oldValue, eOpts) {
		var idea = Ext.getCmp('ideaCon_ID').getValue();
		if (newValue != "") {
			if (idea != "" && idea != null) {
				Ext.Msg.confirm('确定', '意见栏已有意见，确定覆盖吗？',
					function (btn) {
					if (btn == 'yes') {
						Ext.getCmp('ideaCon_ID').setValue(newValue);
					} else {
						return;
					}
				});
			} else {
				Ext.getCmp('ideaCon_ID').setValue(newValue);
			}
		}
	},

	// 返回上一页
	returnTravelRequest : function (obj, e, eOpts) {
		this.showBackView();
		var _obj = Ext.getCmp(returnForm);
		Ext.Viewport.setActiveItem(_obj);
		personnelList.name = null;
		personnelList = {};
		choosePerson = [];
	},

	// 进入选人界面与选择流程
	select : function (obj, index, target, record, e, eOpts) {
		var obj_this = this;
		var sbenoCheck = document.getElementsByName('groupCheckbox2');
		var assign = record.raw.cfg.cfg.assign;
		// 单选、多选(单选=fo,多选=fm,全选=fa)
		var obj_nextacti = record._data.nextacti;
		var obj_conds = record._data.conds;
		if (obj_nextacti == "fo") {
			// 单选
			for (var i = 0; i < sbenoCheck.length; i++) {
				if (index != i) {
					sbenoCheck[i].className = 'p_judge_box';
				} else {
					cc.log(record.data.forkname + "test1");
					actionform.flowto = {};
					actionform.flowto[record.data.forkname] = {};
					actionform.flowto[record.data.forkname].conds = record.data.conds;
					actionform.flowto[record.data.forkname].users = [];
				}
			}
		} else if (obj_nextacti == "fm") {
			// 多选
		} else if (obj_nextacti == "fa") {
			// 全选
		}
		var hasuser = record.raw.cfg.cfg.hasuser;

		Ext.getCmp('nextacti').setValue(obj_nextacti);
		Ext.getCmp('conds').setValue(obj_conds);
		Ext.getCmp('LY_index').setValue(index);
		Ext.getCmp('forkname').setValue(record.data.forkname);

		if (event.target.id != 'pid') {
			if (hasuser == 1) {
				cc.log(1111);
				aa(assign, record.data, index);
				cc.log(2222);
			} else {
				if (sbenoCheck[index].className == 'p_judge_box_clicked') {
					sbenoCheck[index].className = 'p_judge_box';
				} else {
					sbenoCheck[index].className = 'p_judge_box_clicked';
					cc.log(record.data.forkname + "test2");
					actionform.flowto = {};
					actionform.flowto[record.data.forkname] = {};
					actionform.flowto[record.data.forkname].conds = record.data.conds;
					actionform.flowto[record.data.forkname].users = [];
				}
			}

		} else if (event.target.id == 'pid' && sbenoCheck[index].className == 'p_judge_box_clicked') {
			sbenoCheck[index].className = 'p_judge_box';
		} else {
			if (hasuser == 1) {
				aa(record.data, index);
			} else {
				sbenoCheck[index].className = 'p_judge_box_clicked';
				cc.log(record.data.forkname + "test3");
				actionform.flowto = {};
				actionform.flowto[record.data.forkname] = {};
				actionform.flowto[record.data.forkname].conds = record.data.conds;
				actionform.flowto[record.data.forkname].users = [];
			}
		}

		// 进入选人界面
		function aa(assign, vdata, idx) {
			cc.log("aa()");
			var url = record.raw.url;
			var store = Ext.data.StoreManager.get("personnelSelectionS");
			if (!store) {
				store = Ext.create("HelcOA.store.ForApprovalProcess.DailyOffice.Idea.personnelSelectionS");
			}
			if (typeof(personnelList["SP_" + vdata.name]) != undefined && personnelList["SP_" + vdata.name] != null && personnelList["SP_" + vdata.name] == "SP_" + vdata.name) {
				obj_this.showBackView('personnelSelection_id','HelcOA.view.ForApprovalProcess.DailyOffice.Idea.personnelSelection');
				store.setData(personnelList["SP_" + vdata.name + "data"]);
				var sbenoCheck = document.getElementsByName('p_judge_color3');
				for (var i = 0; i < personnelList["SP_" + vdata.name + "check"].length; i++) {
					sbenoCheck[personnelList["SP_" + vdata.name + "check"][i]].className = 'p_judge_box_clicked';
				}
				Ext.getCmp('inquireCon_ID').setValue();
				Ext.getCmp('SP_name').setValue("SP_" + vdata.name);
			} else {
				cc.log("testtest5");
				function getResult(result) {
					var userSolist = [];
					cc.log(result);
					var jsonP = eval(result.text);
					
					cc.log("jsonP:"+jsonP);
					if (jsonP != null && jsonP != undefined) {
						cc.log("jsonP----------------------");
						// 给personnelSelectionS循环传入数据
						for (var nb = 0; nb < jsonP.data.length; nb++) {
							var tp_data = {};
							tp_data.key = jsonP.data[nb].key;
							tp_data.forkname = vdata.forkname;
							tp_data.conds = vdata.conds;
							tp_data.value = jsonP.data[nb].value;
							tp_data.idx = idx;
							var t = new Object();
							Ext.apply(t, actionform.flowto);
							tp_data.fork = t;
							userSolist.push(tp_data);
						}
						cc.log(userSolist);
						store.setData(userSolist);
					}
					obj_this.NextView('personnelSelection_id','HelcOA.view.ForApprovalProcess.DailyOffice.Idea.personnelSelection');
					// 默认选中带出来的所有人
					if (userSolist.length != 0) {
						var sbenoCheck = document.getElementsByName('p_judge_color3');
						for (var nb = 0; nb < userSolist.length; nb++) {
							sbenoCheck[nb].className = 'p_judge_box_clicked';
							var personnelSelectionS = obj_this.getStore('personnelSelectionS','HelcOA.store.ForApprovalProcess.DailyOffice.Idea.personnelSelectionS');
							var recordData = personnelSelectionS.data.items[nb].data;
							if (actionform.flowto[recordData.forkname] == undefined) {
								cc.log("test430a");
								actionform.flowto[recordData.forkname] = {};
							}
							actionform.flowto[recordData.forkname].conds = record.data.conds;
							if (actionform.flowto[recordData.forkname].users == undefined || actionform.flowto[recordData.forkname].users == "" || actionform.flowto[recordData.forkname].users == null) {
								actionform.flowto[recordData.forkname].users = [];
								cc.log("test430b");
							}
							actionform.flowto[recordData.forkname].users.push(recordData.key);

							cc.log('-------actionform.flowto-----------');
							cc.log(actionform.flowto);
						}
					};

					// 等于1的时候可以任意选人，即有搜索功能
					if (assign.anyflag == '0') {
						Ext.getCmp('select_person_TB_SP').setHidden(true);
					}

					// 判断多选时用--当multflag等于1的时候可以多选，multqty为多选时最多可以选择的最大人数
					Ext.getCmp('SP_multflag').setValue(assign.multflag);
					Ext.getCmp('SP_multqty').setValue(assign.multqty);
					Ext.getCmp('SP_name').setValue("SP_" + vdata.name);
					Ext.getCmp('SP_forkname').setValue(vdata.forkname);
					Ext.getCmp('SP_conds').setValue(vdata.conds);
					Ext.getCmp('SP_idx').setValue(idx);

				};
				var myParam = [url];
				var params = {};
				params.adpName = 'HttpAdapter_OA';
				params.prodNmae = 'getStories_datas';
				params.prmName = myParam;
				obj_this.connectServerComm(getResult, params);
			}

		}
	},

	// 提交审批意见
	submitTravelRequest : function (obj, e, eOpts) {
		var bpdname = Ext.getCmp('surface_ID').getTitle()._title;
		// 分类：日常办公
		if (bpdname == "工作联络书") {
			var dataArray = ['phone','e_date','neirong_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "出差申请") {
			var dataArray = ['ygh'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "用印申请") {
			var dataArray = ['fileno', 'createdate', 'fenshu', 'sqliyou_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "合同校正章(1)用印申请") {
			var dataArray = ['fileno', 'createdate', 'fenshu', 'sqliyou_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "公司对外合同审批流程") {
			var dataArray = ['fileno'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "会议室申请流程") {
			var dataArray = ['zcr', 'startdate', 'shour',
				'sminu', 'eminu', 'ehour', 'usehour',
				'meetcontect_textarea', 'meetpeo',
				'meetpeo1', 'rs', 'address', 'meetsocure1',
				'meetsocure2', 'meetsocure3',
				'meetsocure4', 'meetsocure5',
				'meetsocure6', 'nextsoure', 'meetclass',
				'pfr', 'fhtjfalg', 'meetingids',
				'meetsubject', 'selclassid', 'selfalg',
				'startwz', 'sycd'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "公务用车联络流程") {
			var dataArray = ['ext1', 'fileno', 
				'agentman', 'dept', 'ycdate', 'sj',
				'ycdate1', 'sj1', 'lxr', 'ycrs', 'place',
				'ch', 'sj2', 'sjtel', 'sendmobile',
				'sendnumber', 'xicheng_textarea',
				'reasion_textarea', 'lxrdh', 'createdate'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "公司发文流程") {
			// 判断流程类型
			var lx = Ext.getCmp('fwtype').getValue();
			var dataArray = '';
			if (lx == '公司发文') {
				dataArray = [ 'fwtype', 'writ',
					'wdbh', 'ngbm', 'miji', 'showss',
					'bcnx', 'fwfj', 'fs', 'zs', 'cs', 'cb',
					'bzr', 'bzsj', 'shr', 'shsj', 'pzr',
					'pzsj', 'bzh', 'bzhsj',
					'zhaiyao_textarea', 'zwdoc', 'jcacl',
					'readpeo'];
			} else if (lx == '规章制度') {
				dataArray = [ 'fwtype', 'writ',
					'wdbh', 'ngbm', 'miji', 'showss',
					'bcnx', 'fwfj', 'fs', 'zs', 'cs', 'cb',
					'bzr', 'bzsj', 'shr', 'shsj', 'pzr',
					'pzsj', 'bzh', 'bzhsj',
					'zhaiyao_textarea', 'zwdoc', 'jcacl',
					'readpeo', 'catalogname'];
			};
			this.setDataFromIds(dataArray);
		} else if (bpdname == "公司规章制度审批流程") {
			var dataArray = ['piid', 'fileno', 'createdate',
				 'fwtype', 'hqflag', 'smflag',
				'hqsl', 'hqdep1', 'hqdep2', 'hqdep3',
				'hqdep4', 'hqdep5', 'lastdate', 'phone',
				'wjml', 'wdbh', 'bbh', 'dep', 'bzsj',
				'zhaiyao_textarea', 'zcbzr', 'zcbsj',
				'agentman', 'dept', 'arcpathid',
				'pigeonhole', 'cabinet', 'shr', 'shsj',
				'pzr', 'pzsj', 'bzh', 'bzhsj', 'sxdate',
				'miji', 'showss', 'bcnx', 'jcacl',
				'inherit', 'managerman_1', 'editman_1',
				'printer_1', 'readman_1', 'listuser_1',
				'zwdocunid', 'mlid', 'ofileid', 'zwflag'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "内部法律咨询流程") {
			var dataArray = ['fileno', 'dept', 'agentman',
				'createdate', 'zxlx', 
				'reason_textarea', 'tel', 'email',
				'sendreader', 'completeddate', 'recycle'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "物业公司对外合同审批流程") {
			var dataArray = ['fileno', 'tiaojian01',
				'tiaojian02',  'mycontractno',
				'nextcontractno', 'contracttype', 'addr',
				'zbflag', 'zbxm', 'contractyear',
				'paytype', 'threeflag', 'htfs', 'beianno',
				'lxdh', 'sqliyou_textarea', 'dept',
				'caiwureason_textarea', 'zfpage', 'zfname',
				'hqflag', 'hqleader', 'reportdate',
				'agentman', 'createdate', 'cwflag',
				'fwflag', 'fjflag'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "接待客户工作联络流程") {
			var dataArray = ['fileno', 'ccompany'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "境外出差申请") {
			var dataArray = ['piid', 'fileno', 'ygh','query_xm', 'dep', 'createdate'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "法人授权") {
			var dataArray = ['fileno', 'agentman', 'dept',
				'createdate', 'bsqr', 'phone', 'qwwcsj',
				'zms', 'yxnyq', 'yxnyz',  'sqly'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "投资公司经理出差申请流程") {
			var dataArray = ['fileno', 'agentman', 'dept',
				'phone', 'sendreader',  'place',
				'starttime', 'staytime', 'items',
				'visitor', 'reason_textarea',
				'report_form', 'kzname', 'kzno', 'bzname',
				'bzno', 'bbzname', 'bbzno', 'zjlname',
				'zjlno', 'waypath', 'firflow', 'secflow',
				'thiflow', 'forflow', 'createdate'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "视频设备申请") {
			var dataArray = ['addrmain', 'agentman', 'hytype',
				'createdate', 'dept', 'draftsdate',
				'edate', 'etime', 'fileno', 'leader',
				'lxdh', 'lxr', 'meetingrooms', 'sdate',
				'sendreader', 'stime', 
				'summary', 'zjdep'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "PO单审核") {
			var dataArray = ['fileno', 'create_by', 'emp_no',
				'sent_time', 'vendor_site_code',
				'vendor_name', 'po_number', 'po_header_id'];
			this.setDataFromIds_PO(dataArray);
		}
		
		// 分类：营业/工程业务
		 else if (bpdname == "维修改造工程业务联络流程") {
			var dataArray = ['fileno', 'apellation',
				'address', 'party', 'phone', 'date',
				'count', 'regh', 'refermodel', 'refercz',
				'referhigh', 'leibie', 'type',
				'sendmobile', 'agentman', 'dept',
				'createdate', 'phone2', 
				'ywtype', 'report_textarea', 'qwsjdate',
				'qwdate', 'tecdocid', 'remark', 'qwdate2',
				'sendreader', 'createbypda',
				'nextprocessuser', 'Fnextprocess',
				'qwdategcbz', 'qwdate3', 'qwdatebgr'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "开具发票") {
			var dataArray = ['fileno', 'sendmobile',
				'sendnumber', 'agentman', 'dept', 'hth',
				'gh',  'pjlx', 'pjqk', 'zfrq',
				'kpje', 'kpbl', 'kpjegc', 'kpdf', 'kpjeyf',
				'htzxqksm', 'yyyq_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "律师函审批流程") {
			var dataArray = ['piid', 'fileno', 'dept',
				'agentman', 'createdate', 
				'yddep', 'yyleader', 'hth', 'xmxz', 'bydw',
				'dwmc1', 'fzr1', 'lxr1', 'phone1', 'dwdz1',
				'yb1', 'dwmc2', 'fzr2', 'lxr2', 'dwdz2',
				'phone2', 'yb2', 'ts1', 'ts2', 'htmoney1',
				'paymoney1', 'notpaymoney1', 'money1',
				'money2', 'money3', 'money4', 'money5',
				'money6', 'date1', 'htmoney2', 'paymoney2',
				'money11', 'money12', 'money13', 'money14',
				'date2', 'money15', 'htmoney3',
				'paymoney3', 'notpaymoney3', 'money21',
				'htmoney4', 'paymoney4', 'notpaymoney4',
				'money31', 'paymoney', 'ortherdate1',
				'ortherdate2', 'ortherdate3', 'paydate',
				'iskeep', 'bcsm_textarea',
				'reason_textarea', 'htdep', 'date',
				'httype'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "诉讼和解审批流程") {
			var dataArray = [ 'fileno', 'dwmc',
				'hth', 'htzj2', 'qhbj1', 'qhbj2', 'bj',
				'bjje', 'qwyj', 'wyj', 'wyjje', 'szcb',
				'szf', 'lsf', 'qtfe', 'lssws', 'dlls',
				'reason_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "短交货期流程") {
			var dataArray = ['fileno',  'phone',
				'ssqy', 'jxdw', 'jhdate', 'htmf', 'htno',
				'xhgg', 'sqzl', 'checkbox', 'checkbox2',
				'checkbox3', 'reqdate', 'textarea_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "短安装期联络工作流程") {
			var dataArray = ['fileno',  'lxdh',
				'ssqy', 'jxdw', 'jhdate', 'htmf', 'htno',
				'xh1', 'czm1', 'remart1', 'ts1', 'gq1',
				'yjdate1', 'xh2', 'czm2', 'remart2', 'ts2',
				'gq2', 'yjdate2', 'xh3', 'czm3', 'remart3',
				'ts3', 'gq3', 'yjdate3', 'xh4', 'czm4',
				'remart4', 'ts4', 'gq4', 'yjdate4',
				'reqdate', 'textarea_textarea', 'sbtype',
				'checkbox2', 'checkbox3', 'sendmobile'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "电梯_扶梯发货计划") {
			var dataArray = ['fileno',  'dept',
				'agentman', 'sendmobile', 'sendnumber',
				'reason_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "非正常发货要求联络书流程") {
			var dataArray = ['piid', 'name3922', 'fileno',
				'htmf', 'fqqk', 'ssqy', 
				'usedep', 'appdep', 'phone', 'fax',
				'cbdate', 'jhdate', 'seller', 'hfdate',
				'scgh1', 'tz1', 'yqrq1', 'bcrq1', 'tcrq1',
				'ccrq1', 'yqtqrq1', 'scgh2', 'tz2',
				'yqrq2', 'bcrq2', 'tcrq2', 'ccrq2',
				'yqtqrq2', 'scgh3', 'tz3', 'yqrq3',
				'bcrq3', 'tcrq3', 'ccrq3', 'yqtqrq3',
				'scgh4', 'tz4', 'yqrq4', 'bcrq4', 'tcrq4',
				'ccrq4', 'yqtqrq4', 'scgh5', 'tz5',
				'yqrq5', 'bcrq5', 'tcrq5', 'ccrq5',
				'yqtqrq5', 'yqnrcs_textarea', 'dscgh1',
				'designfdate1', 'reptqdate1', 'remart1',
				'dscgh2', 'designfdate2', 'reptqdate2',
				'remart2', 'dscgh3', 'designfdate3',
				'reptqdate3', 'remart3', 'dscgh4',
				'designfdate4', 'reptqdate4', 'remart4',
				'dscgh5', 'designfdate5', 'reptqdate5',
				'remart5', 'name24'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "非标报告作业处理流程") {
			var dataArray = ['piid', 'fileno', 'apellation',
				'address', 'party', 'phone', 'date',
				'model', 'floor', 'produceno', 'date1',
				'unit', 'date2', 'count', 'refermodel',
				'duty', 'type', 'sendmobile', 'sendnumber',
				'agentman', 'dept', 'phone2', 
				'report_textarea', 'newmeasure_textarea',
				'phone3', 'assort', 'sendreader',
				'createdate', 'createbypda',
				'nextprocessuser', 'Fnextprocess'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "诉讼审批流程") {
			var dataArray = ['piid', 'fileno', 'dept',
				'agentman', 'createdate', 
				'yyleader', 'isapply', 'applytime',
				'lshfileno', 'hth', 'xmxz', 'bydw',
				'dwmc1', 'fzr1', 'lxr1', 'dwdz1', 'phone1',
				'yb1', 'dwmc2', 'fzr2', 'lxr2', 'dwdz2',
				'phone2', 'yb2', 'htdep', 'httype', 'date',
				'ts1', 'ts2', 'htmoney1', 'paymoney1',
				'notpaymoney1', 'money1', 'money2',
				'money3', 'money4', 'money5', 'money6',
				'date1', 'htmoney2', 'paymoney2',
				'notpaymoney2', 'money11', 'money12',
				'money13', 'money14', 'money15',
				'htmoney3', 'paymoney3', 'notpaymoney3',
				'money21', 'htmoney4', 'paymoney4',
				'notpaymoney4', 'money31', 'ortherdate1',
				'ortherdate2', 'ortherdate3', 'paydate',
				'paymoney', 'iskeep', 'bcsm_textarea',
				'reason_textarea','zjlyj','zcyj'];
			this.setDataFromIds(dataArray);
		}
		 else if (bpdname == "提前开票申请") {
				var dataArray = ['piid', 'fileno', 'agentman', 'dept', 'createdate',
					'subject', 'ydbm', 'zsbz', 'htno', 'mfmc', 'qkwq',
					'sbgz', 'fhqkp', 'shsj', 'sfzp', 'lkyz',
					'bz_textarea', 'lx', 'xg', 'htzj', 'htykp', 'htysk',
					'htwsk', 'bckpje', 'ext1'];
				this.setDataFromIds(dataArray);
			} 
		 else if (bpdname == "质量保函申请") {
				var dataArray = ['piid', 'fileno', 'agentman', 'dept', 'createdate',
					'subject', 'ydbm', 'zsbz', 'htno', 'mfmc'];
				this.setDataFromIds(dataArray);
			} 
		 else if (bpdname == "承兑汇票申请") {
				var dataArray = ['piid', 'fileno', 'agentman', 'dept', 'createdate',
					'subject', 'ydbm', 'zsbz', 'htno', 'mfmc', 'htyd', 'zs',
					'hphm', 'xz', 'kpsj', 'zfkx', 'cs', 'dqsj','kpbank', 'kpje', 
					'hphm1','kpbank1', 'kpje1', 'xz1', 'kpsj1', 'zfkx1', 'cs1', 'dqsj1',
					'hphm2', 'xz2', 'kpsj2', 'zfkx2','cs2','dqsj2','kpbank2','kpje2'];
				this.setDataFromIds(dataArray);
			} 
		// 分类：提案管理流程
		 else if (bpdname == "提案管理流程") {
			var dataArray = ['cheoss', 'ext1', 'fileno',
				'agentman', 'no', 'sname', 'createdate',
				'gsm', 'dep', 'dep2', 'dep3', 'tel', 'hzr',
				'taly', 'titype', 'zhuanti', 
				'xzzy_textarea', 'gszy_textarea',
				'xgzy_textarea', 'leibie', 'xingshi',
				'riqi1', 'ishg', 'iscn1', 'ssy', 'iscn',
				'xmzrr', 'gsqzy', 'gsqzy1', 'gsqzy2',
				'gsqzy3', 'fena', 'fenb', 'jsx', 'cxx',
				'yjnd', 'syx', 'zongfen', 'pingji',
				'conds', 'userid', 'username', 'node',
				'ctime', 'piid', 'processname',
				'curauthor', 'dealmen', 'ygbh', 'form',
				'arcpath', 'arcdate', 'endprocessdate'];
			this.setDataFromIds(dataArray);
		}
		// 分类：质量控制
		 else if (bpdname == "三包申请报告") {
			var dataArray = ["acceptno", "acceptor",
				"agentman", "checkdate", "bdtype", "depid",
				"drawno", "errcontent", "errdate",
				"errorstatus", "ffway", "ffway2", "fhdw",
				"fileno", "fnextprocess", "fpzr", "zd",
				"ifsb", "ifzd", "isagree2",
				"isneedtocreate", "issb", "isxs", "isyz",
				"isyz2", "iszdxm", "jjcd", "judge",
				"mapno", "mapzyno", "newno",
				"nextprocessuser", "oldbackdate",
				"oldbackno", "oldno", "oldoutno",
				"oldreturndate", "oldreturnno",
				"otherinfo", "parts", "partsxh", "partxh",
				"phone", "produceno", "qtpart", "reportdate",
				"sbdh", "scjd", "secoutno", "sendmobile",
				"sendnumber", "sersenddate", "sersendno",
				"sertime", "hth", "serviceaddr",
				"servicecause", "shrphone", "subject",
				"textarea", "textarea2", "textarea3",
				"textarea4", "tjaddr", "typeno",
				"usersname", "wlcom", "worktel",
				"worktel2", "wzcode", "zzjudge",
				"createdate"];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "开箱补缺件及不良问题反馈报告") {
			var dataArray = ['fileno',  'bjsx',
				'zd', 'ts', 'bldate', 'type1', 'yhmc',
				'qwclqx', 'level', 'dpm', 'bjm', 'wtm',
				'jjdz', 'yb', 'shr', 'phone', 'shr_2',
				'phone_2', 'scgh', 'azdw', 'azzz',
				'elastatus', 'dftxh', 'hth', 'jcrq', 'sgh',
				'kxy', 'xh_1', 'dhrq_1', 'ym_1', 'xuh_1',
				'lbjmc_1', 'thzy_1', 'gg_1', 'dw_1',
				'zxsl_1', 'qdsl_1', 'qhsl_1', 'xh_2',
				'dhrq_2', 'ym_2', 'xuh_2', 'lbjmc_2',
				'thzy_2', 'gg_2', 'dw_2', 'zxsl_2',
				'qdsl_2', 'qhsl_2', 'xh_3', 'dhrq_3',
				'ym_3', 'xuh_3', 'lbjmc_3', 'thzy_3',
				'gg_3', 'dw_3', 'zxsl_3', 'qdsl_3',
				'qhsl_3', 'xh_4', 'dhrq_4', 'ym_4',
				'xuh_4', 'lbjmc_4', 'thzy_4', 'gg_4',
				'dw_4', 'zxsl_4', 'qdsl_4', 'qhsl_4',
				'xh_5', 'dhrq_5', 'ym_5', 'xuh_5',
				'lbjmc_5', 'thzy_5', 'gg_5', 'dw_5',
				'zxsl_5', 'qdsl_5', 'qhsl_5', 'xh_6',
				'dhrq_6', 'ym_6', 'xuh_6', 'lbjmc_6',
				'thzy_6', 'gg_6', 'dw_6', 'zxsl_6',
				'qdsl_6', 'qhsl_6', 'xh_7', 'dhrq_7',
				'ym_7', 'xuh_7', 'lbjmc_7', 'thzy_7',
				'gg_7', 'dw_7', 'zxsl_7', 'qdsl_7',
				'qhsl_7', 'xh_8', 'dhrq_8', 'ym_8',
				'xuh_8', 'lbjmc_8', 'thzy_8', 'gg_8',
				'dw_8', 'zxsl_8', 'qdsl_8', 'qhsl_8',
				'beizhu_textarea', 'agentman', 'dept',
				'createdate', 'bgrphone', 'scjd', 'gb',
				'implement_date', 'gb_leader', 'gb_list',
				'tldh', 'tldate', 'qaleader', 'sj_list',
				'nextprocessuser', 'fnextprocess',
				'wlgc_1', 'wlgc_2', 'wlgc_3', 'wlgc_4',
				'wlgc_5', 'wlgc_6', 'wlgc_7', 'wlgc_8',
				'decision', 'sj', 'sj_leader', 'bjmc_1',
				'xha_1', 'blxz_1', 'zrdep_1', 'blyy_1',
				'qrr_1', 'blfl_1', 'xs_1', 'tz_1',
				'bjmc_2', 'xha_2', 'blxz_2', 'zrdep_2',
				'blyy_2', 'qrr_2', 'blfl_2', 'xs_2',
				'tz_2', 'bjmc_3', 'xha_3', 'blxz_3',
				'zrdep_3', 'blyy_3', 'qrr_3', 'blfl_3',
				'xs_3', 'tz_3', 'bjmc_4', 'xha_4',
				'blxz_4', 'zrdep_4', 'blyy_4', 'qrr_4',
				'blfl_4', 'xs_4', 'tz_4', 'bjmc_5',
				'xha_5', 'blxz_5', 'zrdep_5', 'blyy_5',
				'qrr_5', 'blfl_5', 'xs_5', 'tz_5',
				'bjmc_6', 'xha_6', 'blxz_6', 'zrdep_6',
				'blyy_6', 'qrr_6', 'blfl_6', 'xs_6',
				'tz_6', 'bjmc_7', 'xha_7', 'blxz_7',
				'zrdep_7', 'blyy_7', 'qrr_7', 'blfl_7',
				'xs_7', 'tz_7', 'bjmc_8', 'xha_8',
				'blxz_8', 'zrdep_8', 'blyy_8', 'qrr_8',
				'blfl_8', 'xs_8', 'tz_8', ];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "公司级投诉处理流程") {
			var dataArray = ['ext1', 'fileno', 'dept',
				'agentman', 'createdate', 'clientname',
				'comdh', 'htid','reason_textarea', 'ckadatejs', 'gsdw',
				'ts_again', 'gsdw2', 'tsjb', 'sendmobile',
				'sendreader', 'rensonfx_textarea',
				'cuoshi_textarea', 'jieguo_textarea',
				'checkdate', 'resdept', 'zq', 'tsjbhd',
				'xzbm', 'gczr', 'zzreason_textarea',
				'sjzr', 'sj_detail_textarea', 'zpzr',
				'zp_detail_textarea', 'yhzr',
				'yh_detail_textarea', 'qtzr',
				'qt_detail_textarea', 'checkv',
				'beizhu_textarea', 'sendnumber'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "欠料发货电子流程") {
			var dataArray = ['address', 'agentman', 'count1',
				'count2', 'count3', 'count4', 'count5',
				'createdate', 'date1', 'date2', 'date3',
				'date4', 'date5', 'dept', 'fhbh', 'fileno',
				'gh1', 'gh2', 'gh3', 'gh4', 'gh5', 'hth1',
				'hth2', 'hth3', 'hth4', 'hth5', 'jsr',
				'liftmodel1', 'liftmodel2', 'liftmodel3',
				'liftmodel4', 'liftmodel5', 'model1',
				'model2', 'model3', 'model4', 'model5',
				'orderunit1', 'orderunit2', 'orderunit3',
				'orderunit4', 'orderunit5', 'phone',
				'plandate1', 'plandate2', 'plandate3',
				'plandate4', 'plandate5', 'qlmc1', 'qlmc2',
				'qlmc3', 'qlmc4', 'qlmc5', 'reason',
				'remark1', 'remark2', 'remark3', 'remark4',
				'remark5', 'shr',  'th1', 'th2',
				'th3', 'th4', 'th5', 'time1', 'time2',
				'ts1', 'ts2', 'ts3', 'ts4', 'ts5', 'tzbm',
				'unit1', 'unit2', 'unit3', 'unit4',
				'unit5', 'zy1', 'zy2', 'zy3', 'zy4', 'zy5'];
			this.setDataFromIds(dataArray);
		}
		
		// 分类:人力资源
		 else if (bpdname == "丧假申请流程（派驻人员专用）") {
			var dataArray = ['agentman', 'dept', 'qjr',
				 'level1', 'kqy', 'phone',
				'sendmobile', 'sendnumber', 'startdate',
				'enedate', 'reason_textarea', 'sjsdate',
				'sjstime', 'sjedate', 'sjetime'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "人员转_调岗申请") {
			var dataArray = ['fileno', 'xqbm', 'xqgw',
				'whys_xq', 'ygh', 'query_xm', 'query_xb',
				'query_nl', 'query_xl', 'query_zy',
				'query_bm', 'query_gw', 'query_rssj',
				'whys_y', 'xqbmbz', 'xqbmbbz', 'ybmkz',
				'ybmbz', 'ybmbbz', 'query_sgz', 'rztj',
				'sendmobile', 'sendnumber', 'yqdgsj',
				 'phone', 'reason_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "培训设施借用流程") {
			var dataArray = ['agentman', 'dept', 'createdate'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "公积金申请") {
			var dataArray = ['piid', 'fileno', 'agentman',
				'dept', 'ygh', 'xm', 'dep', 'sendmobile',
				'sendnumber', 'phone', 'sqyy', 'xyzl',
				'xyzl1', 'xyzl2', 'xyzl3', 'xyzl4', 'gfsj',
				'sczqsj', 'qwlqsj',  'yhzfsj',
				'remark_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "应届毕业生实习培训计划流程") {
			var dataArray = ['ygh',  'sqbm', 'xm',
				'jrzgw', 'sxbmmc', 'phone', 'sendmobile',
				'sendnumber', 'startdate', 'enddate',
				'sxyq_textarea', 'lxr', 'lxdh1', 'sxgw1',
				'pxnr1', 'pxsj1', 'pxsj1e', 'zdls1'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "婚假/产假申请") {
			var dataArray = ['agentman', 'dept', 'qjr',
				'level1',  'jqlx', 'kqy',
				'sendmobile', 'sendnumber', 'phone',
				'begindate', 'stime', 'enddate', 'etime',
				'reason_textarea', 'sjsdate', 'sjstime',
				'sjedate', 'sjetime'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "探亲假申请流程") {
			var dataArray = ['fileno', 'agentman', 'dept',
				'createdate', 'xm', 'address', 'phone',
				'dxxm1', 'relation1', 'xxdz1', 'tqdd',
				 'tqsdate', 'tqedate',
				'daynumber', 'stayhome', 'ontrain', 'kqy',
				'sendmobile', 'sendnumber', 'wpsdate',
				'wpedate', 'jqsdate', 'jqedate',
				'sh_stayhome', 'sh_ontrain', 'del_yxj',
				'sj_yxj', 'sjsdate', 'sjedate', 'bxje',
				'bxrq'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "年度计划外培训需求申请流程") {
			var dataArray = ['fileno', 'fileno', 'dept',
				'createdate', 'renshu', 'sdate', 'stime',
				'edate', 'etime',  'pxlx',
				'feiyong', 'phone', 'sendmobile',
				'sendnumber', 'didian', 'pxjgmc',
				'jutididian', 'lxr', 'lxrdh',
				'pxnr_textarea', 'sqliyou_textarea',
				'fx_yn'];
			this.setDataFromIds(dataArray);
		}

		// 分类:信息技术
		else if (bpdname == "PDA系统账号流程") {
			var dataArray = ['piid', 'fileno', 
				'agentman', 'createdate', 'dept', 'phone',
				'sqtype', 'zhtype', 'proletype',
				'groletype', 'usedep', 'gangwei', 'ygh',
				'query_xm', 'sqyy1_textarea', 'imei',
				'imsi', 'shortname'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "IT故障申请流程") {
			var dataArray = ['fileno', 'dept', 'createdate',
				'phone', 'zcbh', 'weizhi', 'sendmobile',
				'sendnumber', 'cputype', 
				'mencapacity', 'hdcapacity',
				'wtms_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "数据恢复申请流程") {
			var dataArray = ['fileno','dept','agentman','sendmobile','sendnumber','phone','reason_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "数据维护申请流程") {
			var dataArray = ['fileno', 'agentman', 'createdate', 'dept'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "系统网络账号权限申请") {
			var dataArray = ['fileno',  'agentman', 'createdate', 'dept'];
			this.getApplication().getController('ForApprovalProcess.DailyOffice.forApprovalProcessCtrl').worry8();
			this.setDataFromIds(dataArray);
		} else if (bpdname == "供应商信息维护流程") {
			var dataArray = ['fileno',  'agentman', 'createdate', 'dept'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "客户信息维护流程") {
			var dataArray = ['fileno',  'agentman', 'createdate', 'dept'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "PDA系统设备新增或维修流程") {
			var dataArray = ['fileno', 'agentman', 'createdate', 'dept'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "软件维护申请流程") {
			var dataArray = ['piid', 'uprate', 'delwork', 'savetime', 'savet1',
				'savet2', 'adventure', 'arrange', 'partner', 'grade', 
				'textarea2_textarea', 'ywychioce', 'plandate', 'wtfl',
				'threecheck', 'threenm', 'kfgs', 'fzpeo', 'sjgs',];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "用户权限申请流程") {
			var dataArray = ['fileno',  'agentman', 'createdate', 'dept'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "设备_配件借用申请流程") {
			var dataArray = ['fileno', 'agentman', 'createdate', 'dept'];
			this.setDataFromIds(dataArray);
		}
		// 分类:天津
		 else if (bpdname == "天津合同审批流程") {
			var dataArray = ['piid', 'fileno', 
				'agentman', 'createdate', 'dept', 'htbh',
				'htje', 'htxz', 'isysn', 'tel', 'mail',
				'shm_textarea', 'hzmc', 'lxr', 'lxdh',
				'email'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "天津公务用车申请流程") {
			// 打包封装数据
			var dataArray = ['piid', 'fileno', 
				'agentman', 'createdate', 'dept', 'dep',
				'peonum', 'ycdate', 'sj', 'ycdate1', 'sj1',
				'reasion_textarea', 'lxr', 'phoneno',
				'xicheng_textarea', 'carremark_textarea',
				'remark_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "天津用印申请") {
			// 打包封装数据
			var dataArray = ['fileno', 'dept', 'agentman',
				'createdate',  'fenshu',
				'sqliyou_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "天津公司发文流程") {
			// 打包封装数据
			var dataArray = [ 'fwtype', 'ghflag',
				'writ', 'wdbh', 'ngbm', 'miji', 'showss',
				'bcnx', 'fwfj', 'fs', 'zs', 'cs', 'cb',
				'bzsj', 'zhaiyao_textarea', 'hqpeo',
				'sendreader', 'conds', 'userid',
				'username', 'node', 'ctime', 'piid',
				'processname', 'curauthor', 'dealmen',
				'form', 'arcpath', 'arcdate',
				'endprocessdate', 'needzc', 'idea', 'dept',
				'createdate', 'agentman', 'ext1', 'pbsj',
				'zcbzr', 'zcbsj', 'iszcb', 'arcpathid',
				'catalogid', 'pigeonhole', 'cabinet',
				'noselect', 'inherit', 'managerman_1',
				'editman_1', 'printer_1', 'readman_1',
				'listuser_1', 'zwdocunid'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "天津合理化提案流程") {
			// 打包封装数据
			var dataArray = ['createdate', 'dep', 'agentman',
				'peopleno', 'fileno', 'csz', 'czrq',
				 'taphone', 'joinpeople',
				'xianzhuang_textarea', 'celue_textarea',
				'yugu_textarea', 'yj', 'ssdep', 'zq',
				'reason_textarea', 'fs1', 'zfs', 'fs2',
				'fs3', 'fs4', 'fs5', 'pddj', 'fs6', 'tamc',
				'result', 'ext1', 'bm', 'jlflag', 'bmflag'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "天津出差申请") {
			var dataArray = ['fileno',  'agentman',
				'dept', 'createdate', 'phoneno', 'gys1',
				'gys2', 'wldm1', 'tuh1', 'wlmc1', 'sl1',
				'cgdh1', 'jsflag1', 'thdh1', 'wldm2',
				'tuh2', 'wlmc2', 'sl2', 'cgdh2', 'jsflag2',
				'thdh2', 'wldm3', 'tuh3', 'wlmc3', 'sl3',
				'cgdh3', 'jsflag3', 'thdh3', 'wldm4',
				'tuh4', 'wlmc4', 'sl4', 'cgdh4', 'jsflag4',
				'thdh4', 'wldm5', 'tuh5', 'wlmc5', 'sl5',
				'cgdh5', 'jsflag5', 'thdh5', 'wldm6',
				'tuh6', 'wlmc6', 'sl6', 'cgdh6', 'jsflag6',
				'thdh6', 'wldm7', 'tuh7', 'wlmc7', 'sl7',
				'cgdh7', 'jsflag7', 'thdh7', 'wldm8',
				'tuh8', 'wlmc8', 'sl8', 'cgdh8', 'jsflag8',
				'thdh8', 'wldm9', 'tuh9', 'wlmc9', 'sl9',
				'cgdh9', 'jsflag9', 'thdh9', 'wldm10',
				'tuh10', 'wlmc10', 'sl10', 'cgdh10',
				'jsflag10', 'thdh10', 'conds', 'userid',
				'type', 'username', 'node', 'ctime',
				'piid', 'processname', 'curauthor',
				'dealmen', 'form', 'arcpath', 'arcdate',
				'endprocessdate', 'needzc', 'idea', 'ygbh',
				'ext1'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "天津产品退货流程") {
			var dataArray = ['createdate', 'dep', 'agentman',
				'peopleno', 'fileno', 'csz', 'czrq',
				 'taphone', 'joinpeople',
				'xianzhuang_textarea', 'celue_textarea',
				'yugu_textarea', 'yj', 'ssdep', 'zq',
				'reason_textarea', 'fs1', 'zfs', 'fs2',
				'fs3', 'fs4', 'fs5', 'pddj', 'fs6', 'tamc',
				'result', 'ext1', 'bm', 'jlflag', 'bmflag'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "天津IT故障申告流程") {
			var dataArray = ['fileno', 'dept', 'createdate',
				'phone', 'zcbh', 'weizhi', 'sendmobile',
				'sendnumber', 'cputype', 
				'mencapacity', 'hdcapacity',
				'wtms_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "天津电脑资料用户申请") {
			var dataArray = ['agentman', 'dept', 'fileno',
				'phone', 'leixing', 'sendmobile',
				'sendnumber',  'liyou_textarea',
				'conds', 'userid', 'type', 'username',
				'node', 'ctime', 'piid', 'processname',
				'curauthor', 'dealmen', 'form', 'arcpath',
				'arcdate', 'endprocessdate', 'needzc',
				'idea', 'ygbh', 'createdate', 'ext1'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "天津信息系统帐号权限申请流程") {
			var dataArray = ['fileno',  'agentman',
				'createdate', 'dept', 'phone', 'syrbh',
				'sysname', 'sysmaname', 'sqyy', 'sqyy1',
				'sqyy2', 'sqdepyijian', 'sqdepyijian1',
				'sqdepyijian2', 'conds', 'userid', 'type',
				'username', 'node', 'ctime', 'piid',
				'processname', 'curauthor', 'dealmen',
				'form', 'arcpath', 'arcdate',
				'endprocessdate', 'needzc', 'idea', 'ygbh',
				'ext1', 'plmname', 'isplm', 'depid'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "天津软件维护流程") {
			var dataArray = ['fileno', 'dept', 'createdate',
				'completedate', 'sysname', 'menunm',
				'agentman', 'tel', 'sendmobile',
				'sendnumber', 
				'discribe_textarea', 'require_textarea',
				'uprate', 'delwork', 'savetime', 'effect',
				'plandate'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "天津设备_配件借用申请流程") {
			var dataArray = ['fileno', 'agentman',
				'createdate', 'dept', 'phone', 'sbname',
				 'sdate', 'edate', 'sdate2',
				'jyyy_textarea'];
			this.setDataFromIds(dataArray);
		}
		
		// 分类：信息
		 else if (bpdname == "档案借阅或复印申请流程") {
			var dataArray = ['piid', 'fileno', 'agentman',
				'dept', 'phone2', 'sqtype', 'createdate',
				'date',  'sqcontent_textarea',
				'mjxz', 'nextprocessuser', 'fnextprocess',
				'bh', 'zcdno', 'ifag', 'mj', 'ifyf',
				'ifty', 'txz', 'page', 'date1', 'date12',
				'bh2', 'zcdno2', 'ifag2', 'mj2', 'ifyf2',
				'ifty2', 'txz2', 'page2', 'date2',
				'date22', 'bh3', 'zcdno3', 'ifag3', 'mj3',
				'ifyf3', 'ifty3', 'txz3', 'page3', 'date3',
				'date32', 'bh4', 'zcdno4', 'ifag4', 'mj4',
				'ifyf4', 'ifty4', 'txz4', 'page4', 'date4',
				'date42', 'bh5', 'zcdno5', 'ifag5', 'mj5',
				'ifyf5', 'ifty5', 'txz5', 'page5', 'date5',
				'date52', 'bh6', 'zcdno6', 'ifag6', 'mj6',
				'ifyf6', 'ifty6', 'txz6', 'page6', 'date6',
				'date62', 'bh7', 'zcdno7', 'ifag7', 'mj7',
				'ifyf7', 'ifty7', 'txz7', 'page7', 'date7',
				'date72', 'bh8', 'zcdno8', 'ifag8', 'mj8',
				'ifyf8', 'ifty8', 'txz8', 'page8', 'date8',
				'date82', 'bh9', 'zcdno9', 'ifag9', 'mj9',
				'ifyf9', 'ifty9', 'txz9', 'page9', 'date9',
				'date92', 'bh10', 'zcdno10', 'ifag10',
				'mj10', 'ifyf10', 'ifty10', 'txz10',
				'page10', 'date10', 'date102'];
			this.setDataFromIds(dataArray);
		} 
		// 财务
		 else if (bpdname == "用款申请流程") {
			var dataArray = ['fileno', 'sqdw', 
				'je', 'reason_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "营分司固定资产申请流程") {
			var dataArray = ['fileno', 'bm', 
				'reason_textarea', 'ysgz', 'je', 'xz_type',
				'sendreader'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "采购价格变更审批管理") {
			var dataArray = ['createdate', 'fileno',
				'agentman', 'dep',  'suptype',
				'wlsupply', 'bgq', 'bgh', 'ssfd',
				'zckztype', 'zcbztype', 'hsjgtype'];
			this.setDataFromIds(dataArray);
		}
		
		// 分类：制造管理
		 else if (bpdname == "井道图变更通知单流程") {
			var dataArray = ['fileno', 'dept', 'agentman',
				'createdate',  'isneed', 'tip',
				'tno', 'htno', 'newno', 'gno', 'saveno',
				'delno', 'altertime', 'beizhu_textarea',
				'm', 'addr', 'ext1'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "供应商首批供货流程") {
			var dataArray = ['piid', 'fileno', 
				'gysdm', 'gysmc', 'lctype', 'wjbh',
				'buysl', 'lifttype', 'wzmc', 'thzy',
				'xhgg', 'neirong_textarea', 'planno',
				'wzdm', 'zbtype', 'sjtype'];
			this.setDataFromIds(dataArray);
		}

		// 分类：上海
		 else if (bpdname == "上海会议室申请流程") {
			var dataArray = ['piid', 'fileno', 'dept',
				'agentman', 'createdate', 
				'phone', 'zcr', 'startdate', 'shour',
				'sminu', 'eminu', 'ehour', 'usehour',
				'meetcontect', 'meetpeo', 'meetpeo1', 'rs',
				'address', 'meetsocure1', 'meetsocure2',
				'meetsocure3', 'meetsocure4',
				'meetsocure5', 'meetsocure6', 'nextsoure',
				'meetclass', 'pfr', 'fhtjfalg',
				'meetingids', 'meetsubject', 'selclassid',
				'selfalg', 'startwz', 'sycd'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "上海出差申请") {
			var dataArray = ['ygh'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "上海印章申请") {
			var dataArray = ['agentman', 'dept', 'createdate',
				 'fs', 'reason_textarea',
				'yztype', 'remark_textarea', 'conds',
				'userid', 'username', 'node', 'ctime',
				'piid', 'processname', 'curauthor',
				'dealmen', 'form', 'arcpath', 'arcdate',
				'endprocessdate', 'needzc', 'idea', 'ygbh',
				'ext1', 'agentpeofdep', 'depflag'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "上海请休假申请流程") {
			var dataArray = ['tiaojian01', 'agentman', 'dept',
				'qjr',  'xjtype', 'phone',
				'kqname', 'starttime', 'starthour',
				'startminu', 'endtime', 'endhour',
				'endminu', 'ts', 'reason_textarea',
				'stime1', 'shour1', 'sminu1', 'etime1',
				'ehour1', 'eminu1', 'ts1', 'conds',
				'userid', 'username', 'node', 'ctime',
				'piid', 'processname', 'curauthor',
				'dealmen', 'ygbh', 'createdate', 'form',
				'arcpath', 'arcdate', 'endprocessdate',
				'idea', 'ext1', 'agentpeofdep', 'depflag'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "上海转岗申请") {
			var dataArray = [ 'agentman', 'xqbm',
				'xqgw', 'ddrygh', 'ddryname', 'ddrysex',
				'ddryage', 'ddryxl', 'ddryzy', 'ddryxbm',
				'ddryxgw', 'ddryrssj', 'dgsj', 'phone',
				'conds', 'userid', 'type', 'username',
				'node', 'ctime', 'piid', 'processname',
				'curauthor', 'dealmen', 'form', 'arcpath',
				'arcdate', 'endprocessdate', 'needzc',
				'idea', 'ygbh', 'createdate', 'ext1',
				'agentpeofdep', 'depflag', 'agentdep',
				'depflag1', 'dept', 'gwlist'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "上海合同审批申请") {
			var dataArray = ['fileno', 
				'contractno', 'dept', 'htje',
				'contracttype', 'ysflag', 'agentman',
				'xmphone', 'xmmailaddr',
				'contect_textarea', 'hzname', 'hzaddr',
				'lxname', 'lxphone', 'lxmailaddr', 'cwlx'];
			this.setDataFromIds(dataArray);
		}
		if (bpdname == "上海用车申请") {
			var dataArray = ['fileno', 'dept', 'agentman',
				 'carflag', 'lxr', 'phone',
				'ycrs', 'begindate', 'shour', 'sminu',
				'enddate', 'ehour', 'eminu',
				'xingcheng_textarea', 'reason_textarea',
				'carno', 'sjname', 'sjphone'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "上海年度计划外培训申请流程") {
			var dataArray = [ 'agentman', 'dept',
				'createdate', 'fyje', 'kcmc',
				'pxry_textarea', 'pxdd', 'pxaddr', 'pxjg',
				'pxjs', 'lxdh', 'pxsj1', 'pxsj2', 'kss',
				'reason_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "上海品质异常处理流程") {
			var dataArray = ['fileno', 'agentman',
				'createdate', 'date', 'phone2', 
				'zcdno', 'wlno', 'wlremark', 'txz', 'gxh',
				'ycsl', 'ycqk', 'ifyf', 'wlxz',
				'yxqk_textarea', 'ifsjbl', 'jy1',
				'fxqk_textarea', 'ifgy', 'jy2', 'jy3',
				'zrbm'];
			this.setDataFromIds(dataArray);
		}
		
		// 分类：成都
		 else if (bpdname == "成都出差申请") {
			var dataArray = ['ygh', 'tiaojian01', 'peonum',
				'query_xm', 'query_bm', 'phone',
				'query_zw', 'phone_sfz', 'place',
				'starttime', 'rettime', 'plant', 'area',
				'sendmobile', 'prefee', 'book_money',
				'yyje', 'otherfee', 'feesum', 'ifyfxm',
				'projectno', 'projectname',
				'reason_textarea', 'report_form', 'way',
				 'sendnumber', 'pdano', 'ifbl',
				'kzname', 'kzno', 'bzname', 'bzno',
				'bbzname', 'bbzno', 'zjlname', 'zjlno',
				'waypath', 'firflow', 'secflow', 'thiflow',
				'forflow', 'sta', ];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "成都公务用车申请") {
			var dataArray = ['fileno', 'dept', 'agentman',
				 'begindate', 'shour', 'sminu',
				'enddate', 'ehour', 'eminu', 'lxr',
				'phone', 'ycrs', 'xingcheng_textarea',
				'reason_textarea', 'carno', 'sjname',
				'sjphone', 'conds', 'userid', 'type',
				'username', 'node', 'ctime', 'piid',
				'processname', 'curauthor', 'dealmen',
				'form', 'arcpath', 'arcdate',
				'endprocessdate', 'idea', 'ygbh', 'ext1'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "成都会议室申请") {
			var dataArray = ['fileno', 'dept', 'agentman',
				'phone1', 'stime1', 'shour', 'sminu',
				'etime1', 'shr1', 'smu1', 'peoples1',
				 'createdate', 'sbname1', 'qt1',
				'fjh1_textarea', 'conds', 'userid', 'type',
				'username', 'node', 'ctime', 'piid',
				'processname', 'curauthor', 'dealmen',
				'form', 'arcpath', 'arcdate',
				'endprocessdate', 'idea', 'ygbh', 'ext1'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "成都发文流程") {
			var dataArray = ['fileno',  'fwtype',
				'writ', 'wdbh', 'jcacl', 'zwdoc',
				'catalogname', 'ngbm', 'miji', 'showss',
				'bcnx', 'fwfj', 'fs', 'zs', 'cs', 'cb',
				'bzsj', 'zhaiyao_textarea', 'sendreader',
				'conds', 'userid', 'username', 'node',
				'ctime', 'piid', 'processname',
				'curauthor', 'dealmen', 'form', 'arcpath',
				'arcdate', 'endprocessdate', 'needzc',
				'idea', 'ygbh', 'ext1', 'pbsj', 'zcbzr',
				'zcbsj', 'agentman', 'dep', 'iszcb',
				'arcpathid', 'catalogid', 'pigeonhole',
				'cabinet', 'noselect', 'inherit',
				'managerman_1', 'editman_1', 'printer_1',
				'readman_1', 'listuser_1', 'zwdocunid',
				'depflag'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "成都培训设施使用流程") {
			var dataArray = ['fileno', 'agentman', 'dept',
				'createdate', 'ygh', 'sendmobile',
				'sendnumber', 'phone', 'renshu', 'sdate',
				'stime', 'edate', 'etime', 'keshi',
				'yongtu',  'reason_textarea'];
			this.setDataFromIds(dataArray);
		}
		if (bpdname == "成都请休假流程") {
			var dataArray = ['fileno', 'agentman', 'dept',
				'qjr',  'xjtype', 'phone',
				'starttime', 'starthour', 'startminu',
				'endtime', 'endhour', 'endminu',
				'reason_textarea', 'ljts', 'ts', 'stime1',
				'shour1', 'sminu1', 'etime1', 'ehour1',
				'eminu1', 'ts1'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "成都年度计划外培训") {
			var dataArray = [ 'agentman', 'dept',
				'createdate', 'fyje', 'kcmc',
				'pxry_textarea', 'pxdd', 'pxaddr', 'pxjg',
				'pxjs', 'lxdh', 'pxsj1', 'pxsj2', 'kss',
				'reason_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "成都合同审批流程") {
			var dataArray = ['tiaojian01', 'fileno',
				 'contractno', 'dept', 'htje',
				'contracttype', 'ysflag', 'xmfzr',
				'xmphone', 'xmmailaddr',
				'contect_textarea', 'hzname', 'hzaddr',
				'lxname', 'lxphone', 'lxmailaddr',
				'reamrk_textarea', 'conds', 'userid',
				'username', 'node', 'ctime', 'piid',
				'processname', 'curauthor', 'dealmen',
				'form', 'arcpath', 'arcdate',
				'endprocessdate', 'needzc', 'idea', 'ygbh',
				'ext1', 'agentpeofdep', 'agentman',
				'depflag', 'phone'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "成都接待客户流程") {
			var dataArray = ['fileno', 'ccompany', 'ssbm',
				'num',  'lfkh', 'zw', 'tel',
				'lfkh1', 'zw1', 'tel1', 'lfkh2', 'zw2',
				'tel2', 'pt', 'dh', 'qtqk', 'type',
				'isneed1', 'jdate', 'stime',
				'call_textarea', 'hb', 'etime', 'isneed2',
				'cdate', 'time2', 'isneed3', 'czdate',
				'time3', 'isneed4', 'ycdate', 'time4',
				'hbthing_textarea', 'isneed5', 'ycdate1',
				'hotel', 'sendreader', 'ycdate2', 'room',
				'zftype', 'agentman', 'createdate',
				'jsname', 'cphao', 'slname', 'lxtel',
				'ccdate', 'didian', 'sltime', 'lxr',
				'lxrdh', 'conds', 'userid', 'username',
				'node', 'ctime', 'piid', 'processname',
				'curauthor', 'dealmen', 'form', 'arcpath',
				'arcdate', 'endprocessdate', 'needzc',
				'idea', 'ygbh', 'dept', 'ext1', 'xhts'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "成都用印申请流程") {
			var dataArray = ['fileno', 'agentman', 'dept', 'createdate',  'fs', 'reason_textarea', 'yztype', 'remark_textarea',
				'conds', 'userid', 'username', 'node', 'ctime', 'piid', 'processname', 'curauthor', 'dealmen', 'form', 'arcpath', 'arcdate', 'endprocessdate', 'needzc', 'idea', 'ygbh', 'ext1', 'agentpeofdep', 'depflag'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "成都人员转调岗流程") {
			var dataArray = ['fileno', 'xqbm', 'xqgw', 'ygh', 'query_xm', 'query_xb', 'query_nl', 'query_xl', 'query_zy', 'query_bm', 'query_gw', 'query_rzsj', 'query_rssj', 'xqbmbz', 'xqbmbbz', 'ybmkz', 'ybmbz', 'query_sgz',  'yqdgsj', 'phone', 'rztj', 'reason_textarea', 'tydlrq', 'conds', 'userid', 'type', 'username', 'node', 'ctime', 'piid', 'processname', 'curauthor', 'dealmen', 'form', 'arcpath', 'arcdate', 'endprocessdate', 'needzc', 'idea', 'ygbh',
				'ext1', 'gwlist'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "成都档案借阅申请流程") {
			var dataArray = ['piid', 'fileno', 'agentman',
				'dept', 'phone2', 'sqtype', 'createdate',
				'date',  'sqcontent_textarea',
				'mjxz', 'nextprocessuser', 'fnextprocess',
				'bh', 'zcdno', 'ifag', 'mj', 'ifyf',
				'ifty', 'txz', 'page', 'date1', 'date12',
				'bh2', 'zcdno2', 'ifag2', 'mj2', 'ifyf2',
				'ifty2', 'txz2', 'page2', 'date2',
				'date22', 'bh3', 'zcdno3', 'ifag3', 'mj3',
				'ifyf3', 'ifty3', 'txz3', 'page3', 'date3',
				'date32', 'bh4', 'zcdno4', 'ifag4', 'mj4',
				'ifyf4', 'ifty4', 'txz4', 'page4', 'date4',
				'date42', 'bh5', 'zcdno5', 'ifag5', 'mj5',
				'ifyf5', 'ifty5', 'txz5', 'page5', 'date5',
				'date52', 'bh6', 'zcdno6', 'ifag6', 'mj6',
				'ifyf6', 'ifty6', 'txz6', 'page6', 'date6',
				'date62', 'bh7', 'zcdno7', 'ifag7', 'mj7',
				'ifyf7', 'ifty7', 'txz7', 'page7', 'date7',
				'date72', 'bh8', 'zcdno8', 'ifag8', 'mj8',
				'ifyf8', 'ifty8', 'txz8', 'page8', 'date8',
				'date82', 'bh9', 'zcdno9', 'ifag9', 'mj9',
				'ifyf9', 'ifty9', 'txz9', 'page9', 'date9',
				'date92', 'bh10', 'zcdno10', 'ifag10',
				'mj10', 'ifyf10', 'ifty10', 'txz10',
				'page10', 'date10', 'date102'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "基建报修") {
			var dataArray = ['fileno', 'dept', 'agentman',
				'createdate', 'enddate', 
				'description_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "成都规章制度") {
			var dataArray = ['fileno',  'fwtype',
				'hqflag', 'wdbh1', 'hqsl', 'hqdep1',
				'hqdep2', 'hqdep3', 'hqdep4', 'hqdep5',
				'hqdep6', 'ngbm', 'miji', 'showss', 'bcnx',
				'fwfj', 'fs', 'lastdate', 'phone', 'wdbh',
				'bbh', 'oldreadpeo', 'readpeo', 'zs', 'cs',
				'cb', 'agentman', 'bzsj',
				'zhaiyao_textarea'];
			this.setDataFromIds(dataArray);
		}
		
		// 分类：扶梯
		 else if (bpdname == "扶梯出差申请") {
			var dataArray = ['ygh', 'tiaojian01', 'peonum',
				'query_xm', 'query_bm', 'phone',
				'query_zw', 'phone_sfz', 'place',
				'starttime', 'rettime', 'plant', 'area',
				'sendmobile', 'prefee', 'book_money',
				'yyje', 'otherfee', 'feesum', 'ifyfxm',
				'projectno', 'projectname',
				'reason_textarea', 'report_form', 'way',
				 'sendnumber', 'pdano', 'ifbl',
				'kzname', 'kzno', 'bzname', 'bzno',
				'bbzname', 'bbzno', 'zjlname', 'zjlno',
				'waypath', 'firflow', 'secflow', 'thiflow',
				'forflow', 'sta', ];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "扶梯公积金申请") {
			var dataArray = ['piid', 'fileno', 'ygh', 'xm',
				'bm', 'sendmobile', 'sendnumber', 'phone',
				'sqyy', 'xyzl', 'xyzl1', 'xyzl2', 'xyzl3',
				'xyzl4', 'gfsj', 'sczqsj', 'qwlqsj',
				 'yhzfsj', 'remark_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "扶梯公司发文流程") {
			var dataArray = ['piid', 'fileno', 'agentman',
				 'createdate', 'wirt',
				'memo_textarea', 'dept', 'miji', 'sxrq',
				'timelimit'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "扶梯境外出差申请") {
			var dataArray = ['piid', 'fileno', 'ygh',
				'query_xm', 'dep', 'createdate', 'peonum',
				'peonum2', 'peonum3', 
				'starttime', 'rettime', 'qz_type',
				'qystyle', 'country', 'button206', 'addr',
				'ifbl', 'cc_type', 'biz', 'plant', 'fee',
				'prefee', 'otherfee', 'feesum',
				'book_money', 'yyje', 'feesum2', 'ifyfxm',
				'projectno', 'projectname',
				'reason_textarea', 'radio113', 'gscorp'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "扶梯用印申请") {
			var dataArray = ['fileno', 'agentman', 'dept',
				'createdate',  'fenshu',
				'sqliyou_textarea'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "扶梯供应商首批供货流程") {
			var dataArray = ['fileno',  'gysdm',
				'gysmc', 'sysname', 'wjbh', 'buysl',
				'lifttype', 'wzmc', 'thzy', 'xhgg',
				'neirong_textarea', 'planno', 'wzdm',
				'zbtype', 'sjtype'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "扶梯采购价格变更审批") {
			var dataArray = ['createdate', 'fileno',
				'agentman', 'dep',  'suptype',
				'wlsupply', 'bgq', 'bgh', 'ssfd',
				'reason_textarea', 'zckztype', 'zcbztype',
				'hssf', 'cgyx', 'hsjgtype'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "扶梯欠料发货电子流程") {
			var dataArray = ['fileno',  'tzbm',
				'agentman', 'dept', 'createdate', 'phone',
				'reason_textarea', 'gh1', 'ts1', 'hth1',
				'liftmodel1', 'orderunit1', 'plandate1',
				'qlmc1', 'th1', 'zy1', 'model1', 'count1',
				'unit1', 'date1', 'remark1', 'time1',
				'jsr', 'address', 'time2', 'shr', 'fhbh'];
			this.setDataFromIds(dataArray);
		}
		//日滨类HB
		/**/
		else if (bpdname == "HB_出差申请") {
			//需要填写存储的字段
			var dataArray = ['jpfee','jtfee','zsfee','btfee','qtfee'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "HB_加班申请") {
			var dataArray = ['fileno','agentman','dept','createdate'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "HB_考勤补登申请") {
			var dataArray = ['fileno','agentman','dept','createdate'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "HB_离司手续办理") {
			var dataArray = ['scyx'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "HB_离职申请") {
			var dataArray = ['fileno','agentman','dept','createdate'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "HB_请假申请") {
			var dataArray = ['fileno','agentman','dept','createdate'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "HB_人力需求申请") {
			var dataArray = ['fileno','agentman','dept','createdate'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "HB_外派人员补贴申请") {
			var dataArray = ['ydbt','zsbt','jtbt'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "HB_外出申请") {
			var dataArray = ['fileno','agentman','dept','createdate'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "HB_用印申请") {
			var dataArray = ['fileno','agentman','dept','createdate'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "HB_用车申请表") {
			var dataArray = ['driver', 'car', 'actualcardate', 'actenddate1'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "HB_证书借阅使用申请表") {
			var dataArray = ['fileno','agentman','dept','createdate'];
			this.setDataFromIds(dataArray);
		} else if (bpdname == "HB_员工寄件申请审批表") {
			var dataArray = ['fileno','agentman','dept','createdate'];
			this.setDataFromIds(dataArray);
		}
		  else if (bpdname == "HB_非生产使用物资申购表") {
			var dataArray = ['fileno','agentman','dept','createdate'];
			this.setDataFromIds(dataArray);
		}
		  else if (bpdname == "HB_网络资源申请表") {
				var dataArray = ['fileno','agentman','dept','createdate'];
				this.setDataFromIds(dataArray);
			}
		  else if (bpdname == "HB_班车交通补贴申请撤销申请单") {
				var dataArray = ['fileno','agentman','dept','createdate'];
				this.setDataFromIds(dataArray);
			}
		  else if (bpdname == "HB_施工许可申请危险作业申请审批表") {
				//var dataArray = ['fileno','agentman','dept','createdate','zyfkqk','sjqzdate','sjzyqk','iftype','xiangxqk','checkqk','sjazdate','chaicdate','fanghucs','sfwqcc','sgjsdate'];
				var dataArray = ['fileno','agentman','dept','createdate'];
				this.setDataFromIds(dataArray);
			}
		  else if (bpdname == "HB_物资电子放行条") {
				//var dataArray = ['fileno','agentman','dept','createdate','zyfkqk','sjqzdate','sjzyqk','iftype','xiangxqk','checkqk','sjazdate','chaicdate','fanghucs','sfwqcc','sgjsdate'];
				var dataArray = ['fileno','agentman','dept','createdate'];
				this.setDataFromIds(dataArray);
			}
		  else if (bpdname == "HB_物资需求申请") {
				//var dataArray = ['fileno','agentman','dept','createdate','zyfkqk','sjqzdate','sjzyqk','iftype','xiangxqk','checkqk','sjazdate','chaicdate','fanghucs','sfwqcc','sgjsdate'];
				var dataArray = ['fileno','agentman','dept','createdate'];
				this.setDataFromIds(dataArray);
			}
		  else if (bpdname == "HB_生产物料供应比例设置修改申请表") {
				var dataArray = ['fileno','agentman','dept','createdate'];
				this.setDataFromIds(dataArray);
			}
		  else if (bpdname == "HB_供应商调拨申请单") {
				var dataArray = ['fileno','agentman','dept','createdate'];
				this.setDataFromIds(dataArray);
			}
		  else if (bpdname == "HB_客户产品返销申请单") {
				var dataArray = ['fileno','agentman','dept','createdate','ifrepair'];
				this.setDataFromIds(dataArray);
			}
		  else if (bpdname == "HB_销售价格价目表申请流程") {
				var dataArray = ['fileno','agentman','dept','createdate'];
				this.setDataFromIds(dataArray);
			}
		  else if (bpdname == "HB_空进空出申请表") {
				var dataArray = ['fileno','agentman','dept','createdate'];
				this.setDataFromIds(dataArray);
			}
		  else if (bpdname == "HB_ERP系统采购信息变更申请表") {
				var dataArray = ['fileno','agentman','dept','createdate'];
				this.setDataFromIds(dataArray);
			}
		  else if (bpdname == "HB_工装生产治具设备配件采购申请单") {
				var dataArray = ['fileno','agentman','dept','createdate','sum'];
				this.setDataFromIds(dataArray);
			}
		
		  else if (bpdname == "HB_产品租赁出库申请") {
			 
				var dataArray = ['fileno','agentman','dept','createdate'];
				this.setDataFromIds(dataArray);
			}
		  else if (bpdname == "HB_客户新增及资料变更申请") {
				var dataArray = ['fileno','agentman','dept','createdate','khnum'];
				this.setDataFromIds(dataArray);
			}
		  else if (bpdname == "HB_物流平台合同及需财务审批文件用印申请表") {
				var dataArray = ['fileno','agentman','dept','createdate'];
				this.setDataFromIds(dataArray);
			}
		  else if (bpdname == "HB_访客参观申请表") {
				var dataArray = ['fileno','agentman','dept','createdate','notice', 'openinglight','environmentalpatrol','receptionexplanation','accompany','salutatory','sendnewsletters','takepictures', 'openelevator','closeout'];
				this.setDataFromIds(dataArray);
			}
		  else if (bpdname == "HB_培训过程记录及试用期鉴定") {
				var dataArray = ['fileno'];
				this.setDataFromIds(dataArray);
			}
	},

	// 提交的data数据组装
	setDataFromIds : function (dataArray) {
		var obj_this = this;
		cc.log('--------------actionform------------');
		cc.log(actionform);
		var idea = Ext.getCmp('ideaCon_ID').getValue();
		var taskid = Ext.getCmp('taskid').getValue();
		var action = "submit";
		var data = {
			"audit" : {
				"userid" : usernames,
				"idea" : idea,
				"dept" : Ext.getCmp('dept').getValue(),
				"type" : actionform.acti.node.name,
				"username" : actionform.curuser.fullname,
				"node" : actionform.acti.node.name,
				"taskid" : Ext.getCmp('taskid').getValue()
			},
			"piid" : Ext.getCmp('piid').getValue(),
			"mast" : {}
		};
		for (var i = 0; i < dataArray.length; i++) {
			var dataId = dataArray[i];
			cc.log(dataId);
			if (Ext.getCmp(dataId)) {
				var dataMast = Ext.getCmp(dataId).getValue();
				data.mast[dataId] = dataMast;
			}
		}
		data.mast.ext1 = Ext.getCmp('ext1').getValue();
		for (key in actionform.data.mast) {
			try {
				data.mast[key] = Ext.getCmp(key).getValue();
			} catch (e) {}
		}
		data = JSON.stringify(data);
		cc.log("-------------data--------------");
		cc.log(data);

		var dataOne = eval("(" + data + ")");
		cc.log(dataOne.audit.node.name);
		// _flowto=actionform.flowto;
		// var new_flowto={fork:''};
		// new_flowto.fork = _flowto.fork;
		// _flowto = JSON.stringify(new_flowto);
		// cc.log("-------------_flowto--------------1");
		// cc.log(_flowto);

		// 临时处理，有时间再归纳
		_flowto = actionform.flowto;
		var new_flowto = {
			fork : '',
			fork01 : '',
			fork02 : ''
		};
		if (_flowto.fork != "undefined"
			 && typeof(_flowto.fork) != "undefined") {
			new_flowto.fork = _flowto.fork;
		}
		if (_flowto.fork01 != "undefined"
			 && typeof(_flowto.fork01) != "undefined") {
			new_flowto.fork01 = _flowto.fork01;
		}
		if (_flowto.fork02 != "undefined"
			 && typeof(_flowto.fork02) != "undefined") {
			new_flowto.fork02 = _flowto.fork02;
		}
		_flowto = JSON.stringify(new_flowto);
		cc.log("-------------_flowto--------------1");
		cc.log(_flowto);

		var query = {
			"ext1" : Ext.getCmp('ext1').getValue(),
			"df_id" : Ext.getCmp('ygbh').getValue(),
			"piid" : Ext.getCmp('piid').getValue(),
			"billno" : Ext.getCmp('fileno').getValue(),
			"subject" : Ext.getCmp('subject').getValue(),
			"df_name" : Ext.getCmp('agentman').getValue(),
			"df_time" : Ext.getCmp('createdate').getValue(),
			"dep_name" : Ext.getCmp('dept').getValue(),
		};

		query = JSON.stringify(query);
		cc.log("-------------query--------------");
		cc.log(query);

		var _notice = "";
		var _ext = "";
		var ovar = "";
		var procname = Ext.getCmp('surface_ID').getTitle();

		cc.log('----procname----');
		cc.log(procname._title);
		procname = procname._title;

		var backFunc = function (obj2) {
			Ext.Msg.confirm(
				'',
				'确定提交？',
				function (btn) {
					if (btn == 'yes') {
						var getResult3 = function (res) {
							cc.log("res:"+res);
							cc.log("haha:" + JSON.stringify(res));
							var jsonObj = Ext.JSON.decode(res.msg);
							if (jsonObj.status.code != "200") {
								cc.log('错误信息，无法提交!');
								cc.log(jsonObj.status.msg);
								Ext.Msg.alert(jsonObj.status.msg);
								WL.Toast.show(jsonObj.status.msg);
								return;
							} else {
								cc.log('提交成功，正在等待返回...');
								WL.Toast.show("提交成功，正在等待返回...");
								setTimeout(
									function () {
									obj_this.NextView('Menus_id','HelcOA.view.Menus');
									obj_this.getApplication().getController('loginCtrl').loadMenus(_vt,'WebServiceTest',1);
									var ViewId = Ext.getCmp('SP_View_id').getValue();
									var viewName = Ext.getCmp(ViewId);
									if (viewName) {
										viewName.destroy();
									}
								}, 500);
								personnelList = {};
								choosePerson = [];
							}
						};
						var content = {
							method : 'ApprovalProcess',
							param : [_vt, taskid,action,_flowto,data,query,_notice,_ext,procname]
						};
						obj2.connectServer4(getResult3,content, 1);
						cc.log("-------params-------");
						cc.log(content);
					} else {
						return;
					}
				}
			);

			cc.log(obj2);
		};
		var blag = false;
		var sbenoCheck = document
			.getElementsByName('groupCheckbox2');
		for (var i = 0; i < sbenoCheck.length; i++) {
			if (sbenoCheck[i].className == 'p_judge_box_clicked') {
				blag = true;
			}

		}

		if (idea == "" || idea == null || idea == undefined) {
			Ext.Msg.alert('提示', '请填写意见');
		} else if (!blag) {
			Ext.Msg.alert('提示', '请选择流程');
		} else {
			backFunc(this);
		}
	},

	// 提交的data数据组装
	setDataFromIds_PO : function (dataArray) {
		var obj_this = this;
		cc.log('--------------actionform------------');
		cc.log(actionform);
		var idea = Ext.getCmp('ideaCon_ID').getValue();
		var taskid = Ext.getCmp('taskid').getValue();
		var action = "submit";
		var data = {
			"audit" : {
				"userid" : usernames,
				"idea" : idea,
				"dept" : Ext.getCmp('dept').getValue(),
				"type" : actionform.acti.node.name,
				"username" : actionform.curuser.fullname,
				"node" : actionform.acti.node.name,
				"taskid" : Ext.getCmp('taskid').getValue()
			},
			"piid" : Ext.getCmp('piid').getValue(),
			"mast" : {}
		};
		for (var i = 0; i < dataArray.length; i++) {
			var dataId = dataArray[i];
			var dataMast = Ext.getCmp(dataId).getValue();
			data.mast[dataId] = dataMast;
		}
		data.mast.ext1 = "ERP_PC";
		for (key in actionform.data.mast) {
			try {
				data.mast[key] = Ext.getCmp(key).getValue();
			} catch (e) {}
		}
		data = JSON.stringify(data);
		cc.log("-------------data--------------");
		cc.log(data);
		_flowto = actionform.flowto;
		_flowto = JSON.stringify(_flowto);
		cc.log("-------------_flowto--------------");
		cc.log(_flowto);
		var query = {
			"ext1" : "ERP_PC",
			"piid" : Ext.getCmp('piid').getValue(),
			"subject" : Ext.getCmp('subject').getValue(),
		};
		query = JSON.stringify(query);
		cc.log("-------------query--------------");
		cc.log(query);
		var _notice = "";
		var _ext = "";
		var ovar = "";
		var procname = Ext.getCmp('surface_ID').getTitle();
		cc.log('----procname----');
		cc.log(procname._title);
		procname = procname._title;
		var backFunc = function (obj2) {
			Ext.Msg.confirm(
				'',
				'确定提交？',
				function (btn) {
				if (btn == 'yes') {
					var getResult3 = function (res) {
						cc.log("-----res----");
						cc.log(res);
						var jsonObj = Ext.JSON.decode(res.msg);
						if (jsonObj.status.code != "200") {
							cc.log('错误信息，无法提交');
							cc.log(jsonObj.status.msg);
							Ext.Msg.alert(jsonObj.status.msg);
							WL.Toast.show(jsonObj.status.msg);
							return;
						} else {
							cc.log('提交成功，正在等待返回...');
							WL.Toast.show("提交成功，正在等待返回...");
							setTimeout(
								function () {
								obj_this.NextView('Menus_id','HelcOA.view.Menus');
								obj_this.getApplication().getController('loginCtrl').loadMenus('WebServiceTest',1);
								var ViewId = Ext.getCmp('SP_View_id').getValue();
								var viewName = Ext.getCmp(ViewId);
								if (viewName) {
									viewName.destroy();
								}
							}, 500);
							personnelList = {};
							choosePerson = [];
						}
					};
					var content = {
						method : 'ApprovalProcess',
						param : [_vt, taskid, action, _flowto, data, query, _notice, _ext, procname]
					};
					obj2.connectServer4(getResult3,content, 1);
					cc.log("-------params-------");
					cc.log(content);
				} else {
					return;
				}
			});
			cc.log(obj2);
		};
		var blag = false;
		var sbenoCheck = document.getElementsByName('groupCheckbox2');
		for (var i = 0; i < sbenoCheck.length; i++) {
			if (sbenoCheck[i].className == 'p_judge_box_clicked') {
				blag = true;
			}
		}

		if (idea == "" || idea == null || idea == undefined) {
			Ext.Msg.alert('提示', '请填写意见');
		} else if (!blag) {
			Ext.Msg.alert('提示', '请选择流程');
		} else {
			backFunc(this);
		}
	},
});