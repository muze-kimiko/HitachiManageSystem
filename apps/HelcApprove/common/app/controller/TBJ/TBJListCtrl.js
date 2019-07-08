var approvedP = [];
var tbjmainObj = null;
Ext.define("HelcApprove.controller.TBJ.TBJListCtrl", {
	extend : "HelcApprove.controller.ApplicationController",
	config : {
		control : {
			
			"tabpanel#TBJ_List" : {
				activeitemchange : 'tbj_tab_change'
			},
			
			"searchfield#sf_approvling" : {
				keyup : 'approvePaddingSearch',
				clearicontap: 'approvePaddingSearchClear'
			},
			
		}
	},
	
	/**
	 * 待审批列表查询
	 */
	approvePaddingSearch: function (obj, e, eOpts) {
		var dataT = [];
		var val = obj.getValue();
		var size = approvedP.length;
		for (var i = 0; i < size; i ++) {
			if (JSON.stringify(approvedP[i]).indexOf(val) != -1) {
				dataT[dataT.length] = approvedP[i];
			}
		}
		var tbjListStore = Ext.data.StoreManager.lookup('tbjListStore');
		tbjListStore.setData(dataT);
	},
	
	// 待审批列表查询框清除时
	approvePaddingSearchClear: function(obj, e, eOpts ) {
		var tbjListStore = Ext.data.StoreManager.lookup('tbjListStore');
		tbjListStore.setData(approvedP);
	},
	
	/* 页签改变事件*/
	tbj_tab_change: function (obj, value, oldValue, eOpts){
		var hf_listTabFlag = Ext.getCmp('hf_listTabFlag');
		var hf_TabContact = Ext.getCmp('hf_TabContact');
		if (value.id == "ctn_approvling") {
			hf_listTabFlag.setValue('1');
			if (hf_TabContact.getValue().indexOf('1') == -1) {
				hf_TabContact.setValue(hf_TabContact.getValue() + "1");
			}
		} else if (value.id == "ctn_approved") {
			hf_listTabFlag.setValue('2');
			if (hf_TabContact.getValue().indexOf('2') == -1) {
				hf_TabContact.setValue(hf_TabContact.getValue() + "2");
			} else {
				return ;
			}
			this.getApplication().getController('HelcApprove.controller.TBJ.TBJApprovedCtrl').toInitTbjApproved();
		} else if (value.id == "ctn_approve_finish") {
			hf_listTabFlag.setValue('3');
			if (hf_TabContact.getValue().indexOf('3') == -1) {
				hf_TabContact.setValue(hf_TabContact.getValue() + "3");
			} else {
				return ;
			}
			this.getApplication().getController('HelcApprove.controller.TBJ.TBJApproveFinishCtrl').toInitTbjApproveFinish();
		}
	},
	
	
	/**
	 * 初始化TBJ 列表界面
	 */
	toInitTbjApprove: function() {
		if (tbjmainObj == null) {
			tbjmainObj = this;
		}
		var param = {};
		param.isLoading = true;
		param.method = "toQueryTJBAprovelPendingList";
		if (roleString != "大项目" && roleString != "大客户" && roleString != "营业部") {
			param.parameters = [Ext.getCmp('username').getValue(), ''];
		} else {
			param.parameters = [Ext.getCmp('username').getValue(), roleString];
		}
		tbjmainObj.connectServer_ws(callBack, param);
		function callBack(result) {
			var data = [];
			if (null == result) {
				Ext.Msg.alert('提示', '获取失败，请稍后重试！');
				return ;
			}
			data = result.HELHHTBJApprovePendingwsQueryByExample_Output.ListOfHelHhTbjApprovePendingIo.HelHhTbjApprovePendingEbc;
			var tbjListStore = Ext.data.StoreManager.lookup('tbjListStore');
			var datas = [];
			if (data == undefined || data == null || data.length == 0) {
				Ext.Msg.alert('提示', '暂无待审批数据 ！');
			} else {
				// 把数据加入大数组
				if (JSON.stringify(data).indexOf('[') == -1) {
					datas[datas.length] = data;
				} else {
					datas = data;
				}
			}
			tbjListStore.setData(datas);
			approvedP = datas;
		}
	}
});
