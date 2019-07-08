Ext.define('HelcPDA.controller.install.installsendbox.InstallSendBox_VolumeDetail_Ctrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'instsb_detail_ctrl',
	config:{
		refs:{
		},
		control:{
			
			/*'#btn_instsb_detailback': {
				tap:'toBackBoxList'
			},
			
			'#dpf_DEMAND_ARRIVE_DATE': {
				change:'ARRIVE_DATE_CHAGE'
			},
			
			'#sf_instsb_ENG_REASONS': {
				change:'ENG_REASONS_CHANGE'
			},
			
			'#sf_instsb_DATA_STATUS': {
				change:'DATA_STATUS_CHANGE'
			},*/
			
			'button#btn_vol_commit': {
				tap: 'toVolCommit'
			},
			
		}
	},
	
	/*toSave: function() {
		
	},
	
	// 箱头列表返回
	toBackBoxList: function() {
		myLoading.show();
		this.showNextView("instsb_boxlist_view","HelcPDA.view.install.installsendbox.InstallSendBox_BoxList_V");
		var obj_v = Ext.getCmp('instsb_boxlist_view');
		obj_v.loadDataJST_BoxList(Ext.getCmp('hfinstsb_eno').getValue());
		myLoading.hide();
	},
	
	ARRIVE_DATE_CHAGE: function(obj, newValue, oldValue, eOpts) {
		var fast_date = Ext.getCmp('tf_instsb_FAST_ARRIVE_DATE').getValue();
		var most_new_time = new Date(fast_date.replace(/-/g,"/"));
		if(newValue < most_new_time && newValue != '' && newValue != null && newValue != 'null') {
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
	},*/
	
	toVolCommit: function() {
		var obj = this;
		var shows = eval("("+Ext.getCmp('hf_instsb_shows').getValue()+")");
		var sle_status = Ext.getCmp('sf_instsb_DATA_STATUS').getValue();
		var sf_instsb_ENG_REASONS = Ext.getCmp('sf_instsb_ENG_REASONS').getValue();
		var dpf_DEMAND_ARRIVE_DATE = Ext.getCmp('dpf_DEMAND_ARRIVE_DATE').getValue();
		var stext_value = {};
		stext_value.STATUSCODE = sle_status;
		stext_value.ENG_REASONS = sf_instsb_ENG_REASONS;
		if (sle_status == 'ISSUED') { // 当是下达，而且要求运抵日期为空时
			if (null == dpf_DEMAND_ARRIVE_DATE || 'null' == dpf_DEMAND_ARRIVE_DATE || "" == dpf_DEMAND_ARRIVE_DATE) {
				WL.Toast.show("要求运抵日期不能为空！");
				return ;
			}
			var dpf_DEMAND_ARRIVE_DATE_ = new Date(dpf_DEMAND_ARRIVE_DATE.replace(/-/g,"/"));
			stext_value.DEMAND_ARRIVE_DATE = Ext.Date.format(dpf_DEMAND_ARRIVE_DATE_,'Y-m-d');
		}
		// 保存输入的值
		var datas = obj.save_value(shows,stext_value);
		obj.connectServer(handleResult,"installBoxAction.do?method=toVolumeBoxAdd",JSON.stringify(datas));
		function handleResult(result) {
			if (result.msgid == 0) {
				// 刷新JSONSTORE的状态
				var length_show = shows.length;
				for (var i = 0; i < length_show; i ++) {
					shows[i].json.stext.DATA_SOURCE = 'PDA';
				}
				var options = {};
				WL.JSONStore.get(collectionName).refresh(shows,options).then(function(arrayResults){
					var flag = Ext.getCmp('hfinstsb_VolFlag').getValue();
					if (flag == 'BNO') {
						obj.showBackView("instsb_boxlist_view","HelcPDA.view.install.installsendbox.InstallSendBox_BoxList_V");
						var obj_v = Ext.getCmp('instsb_boxlist_view');
						obj_v.loadDataJST_BoxList(Ext.getCmp('hfinstsb_eno').getValue());
					} else {
						obj.showBackView("instsb_enolist_view","HelcPDA.view.install.installsendbox.InstallSendBox_EnoList_V");
						var obj_v = Ext.getCmp('instsb_enolist_view');
						obj_v.loadDataJST_Eno(Ext.getCmp('hfinstsb_contractno').getValue());
					}
				}).fail(function(errorObject){
					alert('箱头数据已提交，本地数据更新异常，请同步数据后重试！');
					//alert(errorObject);
				});	
			}
			
		}
	},
	
	// 保存数据的值
	save_value: function(show,obj) {
		var values = eval("("+Ext.getCmp('hf_instsb_values').getValue()+")");
		var datas = [];
		var length_show = show.length;
		var length_value = values.length;
		var pUpdateData = [];
		for (var i = 0; i < length_show; i ++) {
			var item = show[i].json;
			var isExit = false;
			for (var j = 0; j < length_value; j ++) {
				var item_value = values[j];
				if ((item_value.json.tid).indexOf(item.stext.ELVBOX_NAME)) {
					// 更新进入JSONSTORE
					var ndata = {tcode:'INSTALL_VALUE_SENDBOX',tid:item_value.json.tid,stext:obj};
					var options = {};
					var udata = {_id:item_value._id,json:ndata};
					pUpdateData[pUpdateData.length] = udata; 
				}
			}
			
			if (!isExit) {// 保存进入JSONSTORE
				var ndata = {tcode:'INSTALL_VALUE_SENDBOX',tid:item.tid,stext:obj};
				var options = {};
				WL.JSONStore.get(collectionName).add(ndata,options).then(function(arrayResults2){
				}).fail(function(errorObject){
					alert('2:'+errorObject);
				});
			}
			
			// 组装提交的数据
			var data = {};
			data.show = item.stext;
			data.value = obj;
			data.reason = {};
			data.userid = userid;
			data.init_person_id = init_person_id;
			data.INST_PERSON_ID = init_person_id;
			datas[i] = data;
		}
		if (pUpdateData.length > 0) {
			try {
				WL.JSONStore.get(collectionName).refresh(pUpdateData,{}).then(function(arrayResults3){
				}).fail(function(errorObject){
					alert('1：'+errorObject);
				});
			} catch (err) {
				alert('更新出错！');
			}
		}
		return datas;
	}

});
