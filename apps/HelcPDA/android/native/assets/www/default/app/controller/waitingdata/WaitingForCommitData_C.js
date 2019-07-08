
/* JavaScript content from app/controller/waitingdata/WaitingForCommitData_C.js in folder common */
Ext.define('HelcPDA.controller.waitingdata.WaitingForCommitData_C',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
		},
		control:{
			"button#btn_wfcd_commit":{
				tap:'toCommitData'
			},
			
			"button#btn_clearData":{
				tap:'toClearData'
			},
			
			"list#wfcd_list": {
                itemtaphold: 'onWfcdListTapHold'
            },
			
		}
	},

	
	// 提交数据
	toCommitData : function(){
		if (isRunningCommit) {
			WL.Toast.show('同步程序正在运行，请稍后重试');
			return ;
		}
		var selection_find = [{tcode:'UNCOMMIT',status:'1'},{tcode:'UNCOMMIT',status:'4'}];
		options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var length = arrayResults2.length;
			if (length < 1) {
				WL.Toast.show('找不到需要提交的数据！');
				return ;
			}
			this.getApplication().getController('HelcPDA.controller.MenusViewCtrl').toCommitWaitingData();
		}).fail(function(errorObject){
			this.getApplication().getController('HelcPDA.controller.MenusViewCtrl').toCommitWaitingData();
		});
	},
	
	toClearData : function() {
		var selection_find = {tcode:''};
		var option = {exact:false};
		WL.JSONStore.get(collectionName).remove(selection_find,option).then(function(arrayResults2){
			WL.Toast.show('清理完成！');
			var obj_v = Ext.getCmp('wfc_list_view');
			obj_v.loadDataJST();
		}).fail(function(errorObject){
		});
	},
	
	onWfcdListTapHold: function(obj, index, target, record, e, eOpts) {
		var this_obj = this;
		if (isRunningCommit) {
			WL.Toast.show('同步程序正在运行，请稍后重试');
			return ;
		}
		/**/
		navigator.notification.confirm("提示",function(btn){
 			if(btn ==2){
 			
 				//刷新真实列表
 				var selection_find = {_id:record.get('id')};
 				var options = {exact : false};
 				WL.JSONStore.get(collectionName).find(selection_find, options).then(function(arrres){
 					var items_t = [];
 					var item_t = arrres[0].json.ext1.obj;
 					if(item_t.isArray) {//当是批量的时候
						for (var i = 0; i < item_t.data.length; i ++) {
							item_t.data[i].json.status = '';
							items_t[items_t.length] = item_t.data[i];
						}
					} else {
						item_t.json.status = '';
						items_t[items_t.length] = item_t;
					}
 					WL.JSONStore.get(collectionName).refresh(items_t,{}).then(function(arrayResults2){
						// 删除待提交数据指定数据
	 	            	WL.JSONStore.get(collectionName).remove(record.get('id'),{}).then(function(){
	 	            		WL.Toast.show('删除成功！');
	 	            		// 刷新数据
//	 	            		var obj_menu = Ext.getCmp('MenusView_id');
	 						this_obj.refresh_wtd();
	 						
	 						// 刷新列表
	 						var wfc_list_view = Ext.getCmp('wfc_list_view');
	 						wfc_list_view.loadDataJST();
	 						
	 					}).fail(function(errorObject){
							WL.Toast.show('删除失败，请重试！');
						});
					}).fail(function(errorObject){
						WL.Toast.show('删除失败，请重试！');
					});
				}).fail(function(errorObject){
					WL.Toast.show('删除失败，请重试！');
				});
 				/**/
 			}else{
 				return;
 			}
 		},"确定要删除此消息？","取消,确定");
 		
    }

});