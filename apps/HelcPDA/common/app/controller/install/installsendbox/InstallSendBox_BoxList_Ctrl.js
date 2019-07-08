Ext.define('HelcPDA.controller.install.installsendbox.InstallSendBox_BoxList_Ctrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'instsb_blist_ctrl',
	config:{
		refs:{
		},
		control:{
			// 返回到箱头列表
			'button#btn_instsb_boxlistback': {
				tap:'toBackEnoList'
			},
			
			// 转到批量箱头列表
			'button#btn_toVolume_Boxlist': {
				tap:'toVolumeDetail'
			},
			
			// 全选
			'button#btn_toSelAll': {
				tap:'toSelAll'
			},
			
			// 反选
			'button#btn_toSelReverse': {
				tap:'toSelReverse'
			},
			
			// 转到箱头详细列表
			'list#instsb_boxlist': {
				itemtap:'toSendBoxDetail'
			},
			
			// 箱头列表点击
			'list#inst_blist': {
				itemtap:'BoxListItemTap'
			},
			
		}
	},
	toTest: function() {
		alert('aabb');
	},
	// 箱头列表返回
	toBackEnoList: function() {
		var store = Ext.data.StoreManager.get('InstallSendBox_list_Store');
		store.setData([]);
		this.showBackView("instsb_enolist_view","HelcPDA.view.install.installsendbox.InstallSendBox_EnoList_V");
		var obj_v = Ext.getCmp('instsb_enolist_view');
		obj_v.loadDataJST_Eno(Ext.getCmp('hfinstsb_contractno').getValue());
	},
	
	// 箱头详细
	toSendBoxDetail: function(obj, index, target, record, e, eOpts) {
		var objc = this;
		var store = Ext.data.StoreManager.get('InstallSendBox_list_Store');
		var boxname = store.getAt(index).get('MSGTITLE');
		if(event.target.id != 'instsb_bno_checkid'){
			this.NextView("instsb_detail_view","HelcPDA.view.install.installsendbox.InstallSendBox_Detail_V");
			var obj = Ext.getCmp('instsb_detail_view');
			obj.initData(boxname);
		} else {
			objc.checkSelect(boxname,index,'Click');
		}
	},
	
	checkSelect: function(boxname,index,flag) {
		// 验证是否已经提交 
		var selection_find = {tcode:'INSTALL_SENDBOX',tid:boxname};
		var options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			/*if (arrayResults2.length < 1) {
				return true;
			}*/
			var item = arrayResults2[0].json.stext;
			var cb = document.getElementsByName('instsb_bno_check')[index];
			if (item.DATA_SOURCE == "PDA") {
				cb.className ='p_judge_box';
				return false;
			} else {
				if (cb.className == 'p_judge_box' || flag == 'ALL') {
					cb.className = 'p_judge_box_clicked';
				} else if (cb.className == 'p_judge_box' && flag == 'Click') {
					cb.className = 'p_judge_box_clicked';
				} else {
					cb.className = 'p_judge_box';
					if (flag == 'Click') {
						WL.Toast.show('此工号已提交！');
					}
				}
				return true;
			}
		}).fail(function(errorObject){
			return true;
		});
	},
	
	// 全选
	toSelAll: function() {
		var objc = this;
		var store = Ext.data.StoreManager.get('InstallSendBox_list_Store');
		var names = document.getElementsByName('instsb_bno_check');
		var length = names.length;
		for (var i = 0; i < length; i ++) {
			objc.checkSelect(store.getAt(i).get('MSGTITLE'),i,'ALL');
		}
	},
	
	// 反选
	toSelReverse: function() {
		var objc = this;
		var store = Ext.data.StoreManager.get('InstallSendBox_list_Store');
		var names = document.getElementsByName('instsb_bno_check');
		var length = names.length;
		for (var i = 0; i < length; i ++) {
			objc.checkSelect(store.getAt(i).get('MSGTITLE'),i,'');
		}
	},
	
	// 批量箱头
	toVolumeDetail: function() {
		// 拼装选择的箱头
		var store = Ext.data.StoreManager.get('InstallSendBox_list_Store');
		var names = document.getElementsByName('instsb_bno_check');
		var length = names.length;
		var boxname_str = '';
		for (var i = 0; i < length; i ++) {
			if (names[i].className == 'p_judge_box_clicked') {
				if(boxname_str=='') {
					boxname_str += store.getAt(i).get('MSGTITLE');
				} else {
					boxname_str += '_'+store.getAt(i).get('MSGTITLE');					
				}
			}
		}
		if (boxname_str != '') {
			this.NextView("instsb_detail_Volume_view","HelcPDA.view.install.installsendbox.InstallSendBox_Detail_Volume_V");
			var obj = Ext.getCmp('instsb_detail_Volume_view');
			obj.initData(boxname_str,Ext.getCmp('hfinstsb_eno').getValue());
			Ext.getCmp('hfinstsb_VolFlag').setValue('BNO');
		} else {
			WL.Toast.show('没有数据被选中！');
		}
	},
	
});
