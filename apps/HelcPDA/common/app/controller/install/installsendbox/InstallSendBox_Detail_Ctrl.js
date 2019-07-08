Ext.define('HelcPDA.controller.install.installsendbox.InstallSendBox_Detail_Ctrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'instsb_detail_ctrl',
	config:{
		refs:{
		},
		control:{
			
			'button#btn_instsb_detailback': {
				tap:'toBackBoxList'
			},
			
			'textfield#dpf_DEMAND_ARRIVE_DATE': {
				change:'ARRIVE_DATE_CHAGE'
			},
			
			'selectfield#sf_instsb_ENG_REASONS': {
				change:'ENG_REASONS_CHANGE'
			},
			
			'selectfield#sf_instsb_DATA_STATUS': {
				change:'DATA_STATUS_CHANGE'
			},
			
			'button#btn_commit': {
				tap: 'toCommit'
			},
			
			'button#btn_save': {
				tap: 'toSave'
			}
		}
	},
	
	toSave: function() {
		
	},
	
	// 工号或者箱头列表返回
	toBackBoxList: function() {
		var flag = Ext.getCmp('hfinstsb_VolFlag').getValue();
		if (flag == 'ENO') {
			var store = Ext.data.StoreManager.get('InstallSendBox_list_Store');
			store.setData([]);
			this.showBackView("instsb_enolist_view","HelcPDA.view.install.installsendbox.InstallSendBox_EnoList_V");
			var obj_v = Ext.getCmp('instsb_enolist_view');
			obj_v.loadDataJST_Eno(Ext.getCmp('hfinstsb_contractno').getValue());
		} else {
			this.showBackView("instsb_boxlist_view","HelcPDA.view.install.installsendbox.InstallSendBox_BoxList_V");
			var obj_v = Ext.getCmp('instsb_boxlist_view');
			obj_v.loadDataJST_BoxList(Ext.getCmp('hfinstsb_eno').getValue());			
		}
	},
	
	ARRIVE_DATE_CHAGE: function(obj, newValue, oldValue, eOpts) {
		var fast_date = Ext.getCmp('tf_instsb_FAST_ARRIVE_DATE').getValue();
		var most_new_time = new Date(fast_date.replace(/-/g,"/"));
		var newValue_time = new Date(newValue.replace(/-/g,"/"));
		if(newValue_time < most_new_time && newValue_time != '' && newValue_time != null && newValue_time != 'null') {
			WL.Toast.show("要求运抵日期不能小于"+fast_date);
			if (oldValue != '' && oldValue != 'null') {
				Ext.getCmp('dpf_DEMAND_ARRIVE_DATE').setValue(oldValue);				
			} else {
				Ext.getCmp('dpf_DEMAND_ARRIVE_DATE').setValue('');
			}
		}
	},
	
	ENG_REASONS_CHANGE: function(obj, newValue, oldValue, eOpts) {
		var most_new_time = Ext.getCmp('hfinstsb_most_new_time').getValue();
		var targettime = Ext.getCmp('hfinstsb_targettime').getValue();
		if(newValue != "0") {
			Ext.getCmp('tf_instsb_FAST_ARRIVE_DATE').setValue(targettime);
		} else {
			Ext.getCmp('tf_instsb_FAST_ARRIVE_DATE').setValue(most_new_time);
		}
		if ('BATCHOTHERS'.indexOf(oldValue)!=-1 && 'BATCHOTHERS'.indexOf(newValue)!=-1) {
		} else {
			Ext.getCmp('dpf_DEMAND_ARRIVE_DATE').setValue("");			
		}
	},
	
	DATA_STATUS_CHANGE: function(obj, newValue, oldValue, eOpts) {
		var pnl_value = Ext.getCmp('pnl_value');
		if (newValue == 'ISSUED') {
			pnl_value.setHidden(false);
		} else {
			pnl_value.setHidden(true);
		}
	},
	
	toCommit: function() {
		if (Ext.getCmp('tf_instsb_STATUS').getValue() == 'Y') {
			WL.Toast.show('该箱头已提交！');
			return ;
		}
		
		var sle_status = Ext.getCmp('sf_instsb_DATA_STATUS').getValue();
		var sf_instsb_ENG_REASONS = Ext.getCmp('sf_instsb_ENG_REASONS').getValue();
		var dpf_DEMAND_ARRIVE_DATE = Ext.getCmp('dpf_DEMAND_ARRIVE_DATE').getValue();
		if (sle_status == 'ISSUED') {
			if (null == dpf_DEMAND_ARRIVE_DATE || 'null' == dpf_DEMAND_ARRIVE_DATE || "" == dpf_DEMAND_ARRIVE_DATE) {
				WL.Toast.show("要求运抵日期不能为空！");
				return ;
			}
		}
		var hfinstsb_value_id = Ext.getCmp('hfinstsb_value_id').getValue();
		var cno = Ext.getCmp('tf_instsb_CONTRACT_NO').getValue();
		var eno = Ext.getCmp('hfinstsb_eno').getValue();
		var bno = Ext.getCmp('tf_instsb_ELVBOX_NAME').getValue();
		var stext_value = {};
		stext_value.DATA_STATUS = sle_status;
		stext_value.ENG_REASONS = sf_instsb_ENG_REASONS;
		stext_value.DEMAND_ARRIVE_DATE = dpf_DEMAND_ARRIVE_DATE;
		stext_value.CONTRACT_NO = cno;
		stext_value.ELEVATOR_NO = eno;
		stext_value.ELVBOX_NAME = bno;
		if (hfinstsb_value_id == '') {
			var ndata = {tcode:'INSTALL_VALUE_SENDBOX',tid:cno+'_'+eno+'_'+bno,stext:stext_value};
			var options = {};
			WL.JSONStore.get(collectionName).add(ndata,options).then(function(arrayResults2){
				//WL.Toast.show('保存成功！');
			}).fail(function(errorObject){
				alert(errorObject);
			});	
		} else {
			var ndata = {tcode:'INSTALL_VALUE_SENDBOX',tid:cno+'_'+eno+'_'+bno,stext:stext_value};
			var options = {};
			var udata = {_id:hfinstsb_value_id,json:ndata};
			WL.JSONStore.get(collectionName).refresh(udata,options).then(function(arrayResults2){
				//WL.Toast.show('保存成功！');
			}).fail(function(errorObject){
				alert(errorObject);
			});	
		}
		
		var obj = this;
		var sle_status = Ext.getCmp('sf_instsb_DATA_STATUS').getValue();
		var sf_instsb_ENG_REASONS = Ext.getCmp('sf_instsb_ENG_REASONS').getValue();
		var dpf_DEMAND_ARRIVE_DATE = Ext.getCmp('dpf_DEMAND_ARRIVE_DATE').getValue();
		var boxName = Ext.getCmp('tf_instsb_ELVBOX_NAME').getValue();
		var selection_find = {tcode:'INSTALL_SENDBOX',tid:boxName};
		var options = {exact : false};
		var result_json;
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var length = arrayResults2.length;
			if (length < 1) {
				WL.Toast.show('找不到本地数据，无法提交！请同步重试');
				return ;
			}
			result_json = arrayResults2[0];
			var data = {};
			var value = {};
			if (sle_status == 'ISSUED') {
				
				var dpf_DEMAND_ARRIVE_DATE_ = new Date(dpf_DEMAND_ARRIVE_DATE.replace(/-/g,"/"));
				value.DEMAND_ARRIVE_DATE = Ext.Date.format(dpf_DEMAND_ARRIVE_DATE_,'Y-m-d');
			}
			value.STATUSCODE = sle_status;
			value.ENG_REASONS = sf_instsb_ENG_REASONS;
			
			data.show = result_json.json.stext;
			data.value = value;
			data.reason = {};
			data.userid = userid;
			data.init_person_id = init_person_id;
			data.INST_PERSON_ID = init_person_id;
			obj.connectServer(handleResult,"installBoxAction.do?method=toUpdate",JSON.stringify(data));
//			obj.toInWaittingList(data);
		}).fail(function(errorObject){
		});
		
		function handleResult(result) {
			if (result.msgid == 0) {
				// 刷新JSONSTORE的状态
				result_json.json.stext.DATA_SOURCE = 'PDA';
				var options = {};
				WL.JSONStore.get(collectionName).refresh(result_json,options).then(function(arrayResults){
					obj.showBackView("instsb_boxlist_view","HelcPDA.view.install.installsendbox.InstallSendBox_BoxList_V");
					var obj_v = Ext.getCmp('instsb_boxlist_view');
					obj_v.loadDataJST_BoxList(Ext.getCmp('hfinstsb_eno').getValue());
				}).fail(function(errorObject){
					alert(errorObject);
				});	
			}
			
		}
	},
	
	toInWaittingList : function(data) {
		var obj = this;
		var msg = {};
		msg.msg_title = '箱头发货';
		msg.msg_body = data.show.ELVBOX_NAME;
		msg.msg_result = '正在等待提交..';
		var ext1 = {};
		ext1.msg = msg;
		ext1.url = 'installBoxAction.do?method=toUpdate';
		var datas = {tcode:'UNCOMMIT_BOX', tid:'BB', stext:data, ext1:ext1, status:'1'};
		var options = {};
		WL.JSONStore.get(collectionName).add(datas,options).then(function(arrayResults){
			obj.showNextView("instsb_boxlist_view","HelcPDA.view.install.installsendbox.InstallSendBox_BoxList_V");
			var obj_v = Ext.getCmp('instsb_boxlist_view');
			obj_v.loadDataJST_BoxList(Ext.getCmp('hfinstsb_eno').getValue());
		}).fail(function(errorObject){
			alert(errorObject);
		});
	}

});
