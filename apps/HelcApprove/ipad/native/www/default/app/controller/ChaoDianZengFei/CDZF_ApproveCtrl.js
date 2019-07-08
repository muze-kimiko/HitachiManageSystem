
/* JavaScript content from app/controller/ChaoDianZengFei/CDZF_ApproveCtrl.js in folder common */
var approve_data = [];
Ext.define("HelcApprove.controller.ChaoDianZengFei.CDZF_ApproveCtrl", {
	extend : "HelcApprove.controller.ApplicationController",
	config : {
		refs : {
		},
		control : {
			"tabpanel#CDZF_List":{
				activeitemchange:'CDZF_List'
			},
			"button#btn_cdzf_prepage_approved":{
				tap:'btn_prepage'
			},
			"button#btn_cdzf_nextpage_approved":{
				tap:'btn_nextpage'
			},
			"button#btn_CDZF_TBJXX_approvedSearch":{
				tap:'btn_CDZF_TBJXX_approvedSearch'
			},
		}
	},
	
	//已审批搜索
	btn_CDZF_TBJXX_approvedSearch : function(){
		var obj = this;
		var CDZF_Store = this.getStore('CDZFApprovedStore','HelcApprove.store.AddService.CDZFApprovedStore');
		var searchSpec = Ext.getCmp('CDZF_TBJXX_approved').getValue();
		var pageSize = "10";
		var startRowNum = "0";
		var viewMode = "All";
		var getResult=function(res){
			var LastPage = res.HELHHAddSvcAppedQueryPage_Output.LastPage;
			res = res.HELHHAddSvcAppedQueryPage_Output.listOfHelHhAddServiceApprovedIo.helHhAddServiceApprovedEbc;
			CDZF_Store.setData(res);
			Ext.getCmp('cdzf_currPage').setValue("0");
//			Ext.getCmp('CDZF_LastPage').setValue(LastPage);
		};
		var params = {};
		params.method = 'AddServiceApprove';
		if (roleString != "大项目" && roleString != "大客户" && roleString != "营业部") {
			params.parameters = [loginuser,'',searchSpec,pageSize,startRowNum,viewMode];
		} else {
			params.parameters = [loginuser,roleString,searchSpec,pageSize,startRowNum,viewMode];
		}
		obj.connectServer_APPROVE(getResult,params);
	},
	
	//上一页
	btn_prepage:function(){
		var PageSize = 10;
		var hf_currPage = parseInt(Ext.getCmp('cdzf_currPage').getValue());
		if (hf_currPage == 0) {
			Ext.Msg.alert('提示', '已经是第一页');
			return ;
		} else if (hf_currPage == 1) { //当即将要返回第一页的时候就重新查找
			this.toGetCdzfApprovedList("P", false);
		} else {
			var currRow = (hf_currPage - 1) * PageSize;
			var size = approve_data.length;
			var index = 0;
			var currData = [];
			for (var i = 0; i < size; i ++) {
				if (i >= currRow) {
					currData[currData.length] = approve_data[i];
					index ++;
					if (index == PageSize) {
						break;
					}
				}
				
			}
			var cdzfApprovedListStore = Ext.data.StoreManager.lookup('CDZFApprovedStore');
			cdzfApprovedListStore.setData(currData);
			Ext.getCmp('cdzf_isLastPage').setValue('N');
			// 更新当前页码
			Ext.getCmp('cdzf_currPage').setValue((hf_currPage - 1));
			Ext.getCmp('ctn_showCurrPage').setHtml('当前页数：' + (hf_currPage));
		}
		
	},
	
	//下一页
	btn_nextpage:function(){
		var PageSize = 10;
		if (Ext.getCmp('cdzf_isLastPage').getValue() == "Y") {
			Ext.Msg.alert('提示', '已经是最后一页');
			return ;
		}
		var hf_currPage = parseInt(Ext.getCmp('cdzf_currPage').getValue());
		var hf_maxPage = parseInt(Ext.getCmp('cdzf_maxPage').getValue());
		if ((hf_currPage + 1) == hf_maxPage) {
			this.toGetCdzfApprovedList("N", false);
		} else { // 取本地
			var currRow = (hf_currPage + 1) * PageSize;
			var size = approve_data.length;
			var index = 0;
			var currData = [];
			for (var i = 0; i < size; i ++) {
				if (i >= currRow) {
					currData[currData.length] = approve_data[i];
					index ++;
					if (index == PageSize) {
						break;
					}
				}
				
			}
			var cdzfApprovedListStore = Ext.data.StoreManager.lookup('CDZFApprovedStore');
			cdzfApprovedListStore.setData(currData);
			// 更新当前页码
			Ext.getCmp('cdzf_currPage').setValue((hf_currPage + 1));
			Ext.getCmp('ctn_showCurrPage').setHtml('当前页数：' + (hf_currPage + 2));
		}
	},
	
	
	CDZF_List : function(obk, value, oldValue, eOpts ){
		var searchSpec = "";
		var pageSize = "10";
		var startRowNum = "0";
		var viewMode = "All";
		var obj = this;
		var CDZF_Store = this.getStore('CDZFApprovedStore','HelcApprove.store.AddService.CDZFApprovedStore');
		
		if(value==0){
			return;
		}
		
		if(value.tab._text == "已审批" && CDZF_Store._data.items.length==0){
			var getResult=function(res){
				var LastPage = res.HELHHAddSvcAppedQueryPage_Output.LastPage;
				res = res.HELHHAddSvcAppedQueryPage_Output.listOfHelHhAddServiceApprovedIo.helHhAddServiceApprovedEbc;
				CDZF_Store.setData(res);
				approve_data = res;
			};
			var params = {};
			params.method = 'AddServiceApprove';
			if (roleString != "大项目" && roleString != "大客户" && roleString != "营业部") {
				params.parameters = [loginuser,'',searchSpec,pageSize,startRowNum,viewMode];
			} else {
				params.parameters = [loginuser,roleString,searchSpec,pageSize,startRowNum,viewMode];
			}
			obj.connectServer_APPROVE(getResult,params);
		}
	},
		
	
	/**
	 * 初始化超点增费 列表界面
	 * isChangePage： 是否点击上一页，下一页
	 * isInitSearch： 是否重新初始化列表
	 */
	toGetCdzfApprovedList: function(ChangePageFlag, isInitSearch) {
		var CdzfApprovedListStore = Ext.data.StoreManager.lookup('CDZFApprovedStore');
		if (CdzfApprovedListStore.getCount() > 0 && ChangePageFlag == "" && !isInitSearch) {
			return ;
		}
		// 如果是第一次或者重新搜索，则回到第一页
		if (ChangePageFlag == "") {
			Ext.getCmp('cdzf_currPage').setValue('0');
			Ext.getCmp('ctn_showCurrPage').setHtml('当前页数：1');
			Ext.getCmp('cdzf_maxPage').setValue('1');
			approve_data = [];
		}
		var PageSize = 10;
		var userid = Ext.getCmp('username').getValue();
		var searchText = Ext.getCmp('CDZF_TBJXX_approved').getValue();
		var viewMode = "All";
		var currPage = parseInt(Ext.getCmp('cdzf_currPage').getValue());
		var hf_startRow = 0;
		if (ChangePageFlag == "N") {
			hf_startRow = (currPage + 1) * PageSize;
		}
		
		var param = {};
		param.isLoading = true;
		param.method = "AddServiceApprove";
		if (roleString != "大项目" && roleString != "大客户" && roleString != "营业部") {
			param.parameters = [userid,'',searchText,PageSize,hf_startRow,viewMode];
		} else {
			param.parameters = [userid,roleString,searchText,PageSize,hf_startRow,viewMode];
		}
		this.connectServer_APPROVE(callBack, param);
		function callBack(result) {
			var data = [];
			if (null == result) {
				Ext.Msg.alert('提示', '获取失败，请稍后重试！');
			}
			data = result.HELHHAddSvcAppedQueryPage_Output.listOfHelHhAddServiceApprovedIo.helHhAddServiceApprovedEbc;
			CdzfApprovedListStore.setData(data);
			
			
			// 如果是最后一页
			if (result.HELHHAddSvcAppedQueryPage_Output.LastPage == "true") {
				Ext.getCmp('cdzf_isLastPage').setValue("Y");
			} else {
				Ext.getCmp('cdzf_isLastPage').setValue("N");
			}
			
			// 改变页面数，和下一次查询的行数
			if (ChangePageFlag != "") {
				// 如果点击的是下一页
				if(ChangePageFlag == "N") {
					// 当前页+1
					var currPage = parseInt(Ext.getCmp('cdzf_currPage').getValue()) + 1;
					Ext.getCmp('cdzf_currPage').setValue(currPage);
					Ext.getCmp('ctn_showCurrPage').setHtml('当前页数：' + (currPage + 1));
					var maxPage = parseInt(Ext.getCmp('cdzf_maxPage').getValue());
					Ext.getCmp('cdzf_maxPage').setValue((maxPage + 1));
					
				} else if (ChangePageFlag == "P") {// 如果点击的是上一页，且是第一页时
					Ext.getCmp('cdzf_currPage').setValue("0");
					Ext.getCmp('ctn_showCurrPage').setHtml('当前页数：1');
					Ext.getCmp('cdzf_maxPage').setValue('1');
					approve_data = [];
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
				approve_data[approve_data.length] = datas[i];
			}
		}
	}
	
});