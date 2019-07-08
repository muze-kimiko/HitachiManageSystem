
/* JavaScript content from app/controller/OaMobileOffice/ElectronicProcess/OverseasTripCtrl/OverseasTripCtrl.js in folder common */
Ext.define('HelcPAD.controller.OaMobileOffice.ElectronicProcess.OverseasTripCtrl.OverseasTripCtrl',{
	extend:'HelcPAD.controller.ApplicationController_OA',
	config:{
		control:{
			//返回按钮
			"button#returnStartTheProcessName_id":{
				tap:'returnStartTheProcessName_id',
			},
			
			// 进入选择结点
			'button#nqc_ToSelectNode':{
				tap:'qc_ToSelectNode'
			}
		}
	},
	
	//返回按钮
	returnStartTheProcessName_id:function(){
		this.showBackView('installProject_ep_id','HelcPAD.view.OaMobileOffice.ElectronicProcess.installProject');
	},
	
	
	//经过费控
	FreeControl : function(){
		var obj = this;
		var myDate=new Date();
	    var y=myDate.getFullYear();
	    var m=myDate.getMonth()+1;
	    var d=myDate.getDay();
	    var dep=Ext.getCmp('dep').getValue();
	    var projectno=Ext.getCmp('projectno').getValue();
	    var feesum=Ext.getCmp('feesum').getValue();
	    var ifyfxm=Ext.getCmp('ifyfxm').getValue();
	    var biz=Ext.getCmp('biz').getValue();
	    var cc_type=Ext.getCmp('cc_type').getValue();
	    var pcode="";
	    
	    if (ifyfxm=="是") {
	       ifyfxm="项目国外差旅费";
	    }else {
	        if (cc_type=="出差") {
	        	ifyfxm="国外出差差旅费";
	        }else {
	        	ifyfxm="出国研修差旅费";
	        }
	    }
	    
	    pcode=pcode+"<?xml version="+'"1.0"' +" encoding="+'"utf-8"'+"?>"+"<OABudgetParameter"+" xmlns="+'"www.epochsoft.com.cn"'+" xmlns:xsi="+'"http://www.w3.org/2001/XMLSchema-instance"'+" xmlns:xsd="+'"http://www.w3.org/2001/XMLSchema"'+">";
	    pcode=pcode+"<ApplicantDept>"+dep+"</ApplicantDept>"+"<DimAccount>"+ifyfxm+"</DimAccount>"+"<DimEntity>"+dep+"</DimEntity>";
	    pcode=pcode+"<DimProject>"+projectno+"</DimProject>"+"<FormName>"+"普通业务报销单据"+"</FormName>"+"<DimYear>"+y+"</DimYear>"+"<DimPeriod>"+m+"</DimPeriod>";
	    pcode=pcode+"<Amount>"+feesum+"</Amount>"+"<Quantity>"+"1"+"</Quantity>"+"<BillName>"+"境外出差申请单"+"</BillName>"+"<Currency>"+biz+"</Currency>"+"</OABudgetParameter>";//将表单内容拼成xml组成一个参数
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
//				obj.getApplication().getController('startTheProcess.startTheProcessNameCtrl').public_ToSelectNode();
				obj.public_ToSelectNode();
//			};
		};
		
		var params = {};
		params.method = 'FreeControl';
		params.parameters = [pcode];
		cc.log(params);
		this.connectServer_OA(getResult,params);
	},
	
	qc_ToSelectNode : function() {
		// 流程名称
		// 分类：日常办公
			// 验证必填
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
						'OaMobileOffice.ElectronicProcess.OverseasTripCtrl.OverseasTripCtrl')
						.FreeControl();
				return;
		},
	
		
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
							'HelcPAD.store.OaMobileOffice.ElectronicProcess.OverseasTripS.approvalOpinionS');
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
									'HelcPAD.view.OaMobileOffice.ElectronicProcess.OverseasTrip.approvalOpinion');
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