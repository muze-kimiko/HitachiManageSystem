
/* JavaScript content from app/controller/TBJ/TBJApproveFinishCtrl.js in folder common */
var data_approveFinish = [];
Ext.define("HelcApprove.controller.TBJ.TBJApproveFinishCtrl", {
	extend : "HelcApprove.controller.ApplicationController",
	config : {
		control : {
			"button#btn_tbj_prepage_completed":{
				tap:'approvefinish_prepage'
			},
			
			"button#btn_tbj_nextpage_completed":{
				tap:'approvefinish_nextpage'
			},
			
			"button#btn_approveFinishSearch":{
				tap:'approvefinish_toSearch'
			},
		}
	},
	
	/**
	 * 上一页
	 */
	approvefinish_prepage: function(obj, e, eOpts) {
		var PageSize = 10;
		var hf_currPagef = parseInt(Ext.getCmp('hf_currPagef').getValue());
		if (hf_currPagef== 0) {
			Ext.Msg.alert('提示', '已经是第一页');
			return ;
		} else if (hf_currPagef == 1) { //当即将要返回第一页的时候就重新查找
			this.toGetTbjApproveFinishList("P", false);
		} else {
			var currRow = (hf_currPagef - 1) * PageSize;
			var size = data_approveFinish.length;
			var index = 0;
			var currData = [];
			for (var i = 0; i < size; i ++) {
				if (i >= currRow) {
					currData[currData.length] = data_approveFinish[i];
					index ++;
					if (index == PageSize) {
						break;
					}
				}
				
			}
			var tbjApproveFinishListStore = Ext.data.StoreManager.lookup('tbjApproveFinishListStore');
			tbjApproveFinishListStore.setData(currData);
			Ext.getCmp('hf_isLastPagef').setValue('N');
			// 更新当前页码
			Ext.getCmp('hf_currPagef').setValue((hf_currPagef - 1));
			Ext.getCmp('ctn_showCurrPagef').setHtml('当前页数：' + (hf_currPagef));
		}
		
	},
	
	/**
	 * 下一页
	 */
	approvefinish_nextpage: function(obj, e, eOpts) {
		var PageSize = 10;
		if (Ext.getCmp('hf_isLastPagef').getValue() == "Y") {
			Ext.Msg.alert('提示', '已经是最后一页');
			return ;
		}
		var hf_currPagef = parseInt(Ext.getCmp('hf_currPagef').getValue());
		var hf_maxPagef = parseInt(Ext.getCmp('hf_maxPagef').getValue());
		if ((hf_currPagef + 1) == hf_maxPagef) {
			this.toGetTbjApproveFinishList("N", false);
		} else { // 取本地
			var currRow = (hf_currPagef + 1) * PageSize;
			var size = data_approveFinish.length;
			var index = 0;
			var currData = [];
			for (var i = 0; i < size; i ++) {
				if (i >= currRow) {
					currData[currData.length] = data_approveFinish[i];
					index ++;
					if (index == PageSize) {
						break;
					}
				}
				
			}
			var tbjApproveFinishListStore = Ext.data.StoreManager.lookup('tbjApproveFinishListStore');
			tbjApproveFinishListStore.setData(currData);
			// 更新当前页码
			Ext.getCmp('hf_currPagef').setValue((hf_currPagef + 1));
			Ext.getCmp('ctn_showCurrPagef').setHtml('当前页数：' + (hf_currPagef + 2));
		}
	},
	
	/**
	 * 点击搜索
	 */
	approvefinish_toSearch: function(obj, e, eOpts) {
		this.toGetTbjApproveFinishList("", true);
	},
	
	/**
	 * 初始化时调用的方法
	 */
	toInitTbjApproveFinish: function() {
		this.toGetTbjApproveFinishList("", true);
	},
	
	/**
	 * 初始化TBJ 列表界面
	 * isChangePage： 是否点击上一页，下一页
	 * isInitSearch： 是否重新初始化列表
	 */
	toGetTbjApproveFinishList: function(ChangePageFlag, isInitSearch) {
		var tbjApproveFinishListStore = Ext.data.StoreManager.lookup('tbjApproveFinishListStore');
		if (tbjApproveFinishListStore.getCount() > 0 && ChangePageFlag == "" && !isInitSearch) {
			return ;
		}
		// 如果是第一次或者重新搜索，则回到第一页
		if (ChangePageFlag == "") {
			Ext.getCmp('hf_currPagef').setValue('0');
			Ext.getCmp('ctn_showCurrPagef').setHtml('当前页数：1');
			Ext.getCmp('hf_maxPagef').setValue('1');
			data_approveFinish = [];
		}
		var PageSize = 10;
		var userid = Ext.getCmp('username').getValue();
		var searchText = Ext.getCmp('sf_approveFinish').getValue();
		var viewMode = "All";
		var currPage = parseInt(Ext.getCmp('hf_currPagef').getValue());
		var hf_startRow = 0;
		if (ChangePageFlag == "N") {
			hf_startRow = (currPage + 1) * PageSize;
		}
		
		var param = {};
		param.isLoading = true;
		param.method = "toQueryTJBAproveFinishListPage";
		if (roleString != "大项目" && roleString != "大客户" && roleString != "营业部") {
			param.parameters = [PageSize, userid, searchText, roleString, viewMode, hf_startRow];
		} else {
			param.parameters = [PageSize, '', searchText, roleString, viewMode, hf_startRow];
		}
		this.connectServer_ws(callBack, param);
		function callBack(result) {
			var data = [];
			if (null == result) {
				Ext.Msg.alert('提示', '获取失败，请稍后重试！');
			}
			data = result.HELHHTBJApproveFinishedwsqpQueryPage_Output.ListOfHelHhTbjApproveFinishedIo.HelHhTbjApproveFinishedEbc;
			tbjApproveFinishListStore.setData(data);
			if (isInitSearch && (data == undefined || data == null || data.length == 0)) {
				Ext.Msg.alert('提示', '暂无已完成数据 ！');
			}
			
			// 如果是最后一页
			if (result.HELHHTBJApproveFinishedwsqpQueryPage_Output.LastPage == "true") {
				Ext.getCmp('hf_isLastPagef').setValue("Y");
			} else {
				Ext.getCmp('hf_isLastPagef').setValue("N");
			}
			
			// 改变页面数，和下一次查询的行数
			if (ChangePageFlag != "") {
				// 如果点击的是下一页
				if(ChangePageFlag == "N") {
					// 当前页+1
					var currPage = parseInt(Ext.getCmp('hf_currPagef').getValue()) + 1;
					Ext.getCmp('hf_currPagef').setValue(currPage);
					Ext.getCmp('ctn_showCurrPagef').setHtml('当前页数：' + (currPage + 1));
					var maxPage = parseInt(Ext.getCmp('hf_maxPagef').getValue());
					Ext.getCmp('hf_maxPagef').setValue((maxPage + 1));
					
				} else if (ChangePageFlag == "P") {// 如果点击的是上一页，且是第一页时
					Ext.getCmp('hf_currPagef').setValue("0");
					Ext.getCmp('ctn_showCurrPagef').setHtml('当前页数：1');
					Ext.getCmp('hf_maxPagef').setValue('1');
					data_approveFinish = [];
				}
			}
			// 把数据加入大数组
			var datas = [];
			if (JSON.stringify(data).indexOf('[') == -1) {
				datas[datas.length] = data;
			} else {
				datas = data;
			}
			var size = datas.length;
			for(var i = 0; i < size; i ++) {
				data_approveFinish[data_approveFinish.length] = datas[i];
			}
		}
	}
});
