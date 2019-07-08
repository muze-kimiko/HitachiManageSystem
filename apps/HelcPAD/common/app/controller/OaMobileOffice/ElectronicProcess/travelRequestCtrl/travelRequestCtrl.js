Ext.define('HelcPAD.controller.OaMobileOffice.ElectronicProcess.travelRequestCtrl.travelRequestCtrl',{
	extend:'HelcPAD.controller.ApplicationController_OA',
	config:{
		control:{
			'button#qc_returnStartTheProcessName_ID':{
				tap:'qc_returnStartTheProcessName_ID'
			},
			'button#qc_ToSelectNode':{
				tap:'qc_ToSelectNode'
			}
		}
	},
	
	
	//经过费控
	FreeControl : function(){
		var obj = this;
		var myDate=new Date();
	    var y=myDate.getFullYear();
	    var m=myDate.getMonth()+1;
	    var d=myDate.getDay();
	    var ifyfxm=Ext.getCmp('ifyfxm').getValue();
	    var query_bm=Ext.getCmp('query_bm').getValue();
	    var projectno=Ext.getCmp('projectno').getValue();
	    var feesum=Ext.getCmp('feesum').getValue();
	    var pcode="";
	    if (ifyfxm=="是") {
	        ifyfxm="项目国内差旅费";
	    }else{
	        ifyfxm="业务差旅费";
	    } 
	    
	    pcode=pcode+"<?xml version="+'"1.0"' +" encoding="+'"utf-8"'+"?>"+"<OABudgetParameter"+" xmlns="+'"www.epochsoft.com.cn"'+" xmlns:xsi="+'"http://www.w3.org/2001/XMLSchema-instance"'+" xmlns:xsd="+'"http://www.w3.org/2001/XMLSchema"'+">";
	    pcode=pcode+"<ApplicantDept>"+query_bm+"</ApplicantDept>"+"<DimAccount>"+ifyfxm+"</DimAccount>"+"<DimEntity>"+query_bm+"</DimEntity>";
	    pcode=pcode+"<DimProject>"+projectno+"</DimProject>"+"<FormName>"+"普通业务报销单据"+"</FormName>"+"<DimYear>"+y+"</DimYear>"+"<DimPeriod>"+m+"</DimPeriod>";
	    pcode=pcode+"<Amount>"+feesum+"</Amount>"+"<Quantity>"+""+"</Quantity>"+"<BillName>"+"境内出差申请单"+"</BillName>"+"<Currency>"+"人民币"+"</Currency>"+"</OABudgetParameter>";//将表单内容拼成xml组成一个参数
	    pcode=encodeURIComponent(pcode);
	    
	    var getResult=function(res){
     
//	    	var data3 = eval(res.html.body);
//			var data = data3.data;
//			if(data[0].State=='3'){
//				Ext.Msg.alert('已超预算，请追加预算');
//				return;
//			}else{
//				if(data[0].State=='2'){
//					Ext.Msg.alert(data[0].WarningMessage);
//				}
	    	//obj.getApplication().getController('OaMobileOffice.ElectronicProcess.travelRequestCtrl.travelRequestCtrl').public_ToSelectNode();
			obj.public_ToSelectNode();
	    	//};
		};
		
		var params = {};
		params.method = 'FreeControl';
		params.parameters = [pcode];
		cc.log(params);
		this.connectServer_OA(getResult,params);
	},
	
	qc_returnStartTheProcessName_ID:function(){
		this.BackView('installProject_oa_id','HelcPAD.view.OaMobileOffice.installProject');
	},
	
	qc_ToSelectNode : function() {
		// 流程名称
		// 分类：日常办公
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
							'OaMobileOffice.ElectronicProcess.travelRequestCtrl.travelRequestCtrl')
					.FreeControl();
			return;
		},
		////////////////////////////////////////////////////////////
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
		
		/////////////////////////////////////////////////////////
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
			var staytime = obj.compareDate(rdate, starttime, "-");
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
		compareDate : function(first, second, sign) {
			fArray = first.split(sign);
			sArray = second.split(sign);
			var fDate = new Date(fArray[0], fArray[1], fArray[2]);
			var sDate = new Date(sArray[0], sArray[1], sArray[2]);
			var t = Math.abs(fDate.getTime() - sDate.getTime());
			var days = t / (1000 * 60 * 60 * 24) + 1;
			return days;
		},
		
//////////////////////////////////////////////////////////////////////
		// 选择结点公共方法
		public_ToSelectNode:function() {
			var obj_this = this;

			//var bpdName = Ext.getCmp('qc_bpdname').getValue();
			var conds = Ext.getCmp('conds').getValue();
			var store = this
					.getStore('approvalOpinionS',
							'HelcPAD.store.OaMobileOffice.ElectronicProcess.travelRequestS.approvalOpinionS');
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
									'HelcPAD.view.OaMobileOffice.ElectronicProcess.travelRequest.approvalOpinion');
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

});