var data_approved = [];
Ext.define("HelcApprove.controller.TBJ.TBJApprovedCtrl", {
	extend : "HelcApprove.controller.ApplicationController",
	config : {
		refs : {
		},
		control : {
			"button#btn_tbj_prepage_approved":{
				tap:'approved_prepage'
			},
			
			"button#btn_tbj_nextpage_approved":{
				tap:'approved_nextpage'
			},
			
			"button#btn_approvedSearch":{
				tap:'approved_toSearch'
			},
			
		}
	},
	
	/**
	 * 上一页
	 */
	approved_prepage: function(obj, e, eOpts) {
		var PageSize = 10;
		var hf_currPage = parseInt(Ext.getCmp('hf_currPage').getValue());
		if (hf_currPage == 0) {
			Ext.Msg.alert('提示', '已经是第一页');
			return ;
		} else if (hf_currPage == 1) { //当即将要返回第一页的时候就重新查找
			this.toGetTbjApprovedList("P", false);
		} else {
			var currRow = (hf_currPage - 1) * PageSize;
			var size = data_approved.length;
			var index = 0;
			var currData = [];
			for (var i = 0; i < size; i ++) {
				if (i >= currRow) {
					currData[currData.length] = data_approved[i];
					index ++;
					if (index == PageSize) {
						break;
					}
				}
				
			}
			var tbjApprovedListStore = Ext.data.StoreManager.lookup('tbjApprovedListStore');
			tbjApprovedListStore.setData(currData);
			Ext.getCmp('hf_isLastPage').setValue('N');
			// 更新当前页码
			Ext.getCmp('hf_currPage').setValue((hf_currPage - 1));
			Ext.getCmp('ctn_showCurrPage').setHtml('当前页数：' + (hf_currPage));
		}
		
	},
	
	/**
	 * 下一页
	 */
	approved_nextpage: function(obj, e, eOpts) {
		var PageSize = 10;
		if (Ext.getCmp('hf_isLastPage').getValue() == "Y") {
			Ext.Msg.alert('提示', '已经是最后一页');
			return ;
		}
		var hf_currPage = parseInt(Ext.getCmp('hf_currPage').getValue());
		var hf_maxPage = parseInt(Ext.getCmp('hf_maxPage').getValue());
		if ((hf_currPage + 1) == hf_maxPage) {
			this.toGetTbjApprovedList("N", false);
		} else { // 取本地
			var currRow = (hf_currPage + 1) * PageSize;
			var size = data_approved.length;
			var index = 0;
			var currData = [];
			for (var i = 0; i < size; i ++) {
				if (i >= currRow) {
					currData[currData.length] = data_approved[i];
					index ++;
					if (index == PageSize) {
						break;
					}
				}
				
			}
			var tbjApprovedListStore = Ext.data.StoreManager.lookup('tbjApprovedListStore');
			tbjApprovedListStore.setData(currData);
			// 更新当前页码
			Ext.getCmp('hf_currPage').setValue((hf_currPage + 1));
			Ext.getCmp('ctn_showCurrPage').setHtml('当前页数：' + (hf_currPage + 2));
		}
	},
	
	/**
	 * 点击搜索
	 */
	approved_toSearch: function(obj, e, eOpts) {
		this.toGetTbjApprovedList("", true);
	},
	
	/**
	 * 初始化时调用的方法
	 */
	toInitTbjApproved: function() {
		this.toGetTbjApprovedList("", true);
	},
	
	/**
	 * 初始化TBJ 列表界面
	 * isChangePage： 是否点击上一页，下一页
	 * isInitSearch： 是否重新初始化列表
	 */
	toGetTbjApprovedList: function(ChangePageFlag, isInitSearch) {
		var tbjApprovedListStore = Ext.data.StoreManager.lookup('tbjApprovedListStore');
		if (tbjApprovedListStore.getCount() > 0 && ChangePageFlag == "" && !isInitSearch) {
			return ;
		}
		// 如果是第一次或者重新搜索，则回到第一页
		if (ChangePageFlag == "") {
			Ext.getCmp('hf_currPage').setValue('0');
			Ext.getCmp('ctn_showCurrPage').setHtml('当前页数：1');
			Ext.getCmp('hf_maxPage').setValue('1');
			data_approved = [];
		}
		var PageSize = 10;
		var userid = Ext.getCmp('username').getValue();
		var searchText = Ext.getCmp('sf_approved').getValue();
		var viewMode = "All";
		var currPage = parseInt(Ext.getCmp('hf_currPage').getValue());
		var hf_startRow = 0;
		if (ChangePageFlag == "N") {
			hf_startRow = (currPage + 1) * PageSize;
		}
		
		var param = {};
		param.isLoading = true;
		param.method = "toQueryTJBAprovedListPage";
		if (roleString != "大项目" && roleString != "大客户" && roleString != "营业部") {
			param.parameters = [PageSize, userid, searchText, '', viewMode, hf_startRow];
		} else {
			param.parameters = [PageSize, userid, searchText, roleString, viewMode, hf_startRow];
		}
		this.connectServer_ws(callBack, param);
		function callBack(result) {
			var data = [];
			if (null == result) {
				Ext.Msg.alert('提示', '获取失败，请稍后重试！');
			}
			data = result.HELHHTBJApprovedwsqpQueryPage_Output.ListOfHelHhTbjApprovedIo.HelHhTbjApprovedEbc;
			tbjApprovedListStore.setData(data);
			
			
			// 如果是最后一页
			if (result.HELHHTBJApprovedwsqpQueryPage_Output.LastPage == "true") {
				Ext.getCmp('hf_isLastPage').setValue("Y");
			} else {
				Ext.getCmp('hf_isLastPage').setValue("N");
			}
			
			// 改变页面数，和下一次查询的行数
			if (ChangePageFlag != "") {
				// 如果点击的是下一页
				if(ChangePageFlag == "N") {
					// 当前页+1
					var currPage = parseInt(Ext.getCmp('hf_currPage').getValue()) + 1;
					Ext.getCmp('hf_currPage').setValue(currPage);
					Ext.getCmp('ctn_showCurrPage').setHtml('当前页数：' + (currPage + 1));
					var maxPage = parseInt(Ext.getCmp('hf_maxPage').getValue());
					Ext.getCmp('hf_maxPage').setValue((maxPage + 1));
					
				} else if (ChangePageFlag == "P") {// 如果点击的是上一页，且是第一页时
					Ext.getCmp('hf_currPage').setValue("0");
					Ext.getCmp('ctn_showCurrPage').setHtml('当前页数：1');
					Ext.getCmp('hf_maxPage').setValue('1');
					data_approved = [];
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
				data_approved[data_approved.length] = datas[i];
			}
		}
	}
});
