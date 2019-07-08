
/* JavaScript content from app/controller/OaMobileOffice/ElectronicProcess/ReceptionCustomers/CustomerReceptionCtrl.js in folder common */

 Ext.define('HelcPAD.controller.OaMobileOffice.ElectronicProcess.ReceptionCustomers.CustomerReceptionCtrl',{
	extend:'HelcPAD.controller.ApplicationController_OA',
	id:'CustomerReceptionCtrl_id',
	config:{
		control:{
			
			//返回
			"button#customerreception_id_FH":{
				tap:'customerreception_id_FH'
			},
			
			//下一步
			"button#customerreception_id_XYB":{
				tap:'customerreception_id_XYB'
			},
			
		}	
	},
	
	//返回
	customerreception_id_FH:function(){
		this.showBackViewG('installProject_ep_id','HelcPAD.view.OaMobileOffice.ElectronicProcess.installProject');
	},
	
	//下一步
	customerreception_id_XYB:function(){
		var IdArray = [ 'ccompany', 'num', 'company',
						'subject', 'lfkh', 'pt', 'dh', 'yyy',
						'lfkh', 'zw', 'tel' ];
		if (this.isRequired(IdArray)) {
			return;
		};
		this.public_ToSelectNode();
	},
	
	// 选择结点公共方法
	public_ToSelectNode : function() {
		var obj_this = this;
		var conds = Ext.getCmp('conds').getValue();
		var store = this.getStore('approvalOpinionS','HelcPAD.store.OaMobileOffice.ElectronicProcess.approvalOpinionS');
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
				obj_this.NextView('qc_approvalOpinion_ID','HelcPAD.view.OaMobileOffice.ElectronicProcess.OverseasTrip.approvalOpinion');
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
	
	//营业员查询
/*	selectPerson:function(textId){
		var ViewId = Ext.Viewport.getActiveItem().id;
		var ViewName = Ext.Viewport.getActiveItem().__proto__.$className;
		var store = this.getStore('PublicPersonnelSelectionS','HelcOA.store.PublicPersonnelSelectionS');
		store.setData([]);
		this.NextView('PublicPersonnelSelection_id','HelcPAD.view.OaMobileOffice.ElectronicProcess.ReceptionCustomers.PublicPersonnelSelection');
		Ext.getCmp('public_ViewId').setValue(ViewId);
		Ext.getCmp('public_ViewName').setValue(ViewName);
		Ext.getCmp('public_text_id').setValue(textId);
	},*/

}); 