var tbjIsCommitting = false;
var lsbb=[];
var backflag=null;
Ext.define("HelcApprove.controller.TBJ.TBJMainCtrl", {
	extend : "HelcApprove.controller.ApplicationController",
	config : {
		refs : {
		},
		control : {
			"button#btn_tbjlist_back":{
				tap:'btn_tbjlist_back'
			},
			"button#btn_tbjapprove_back":{
				tap:'btn_tbjlist_back'
			},
			
			"button#btn_tbjapprove_agree":{
				tap:'btn_tbjapprove_agree'
			},
			"button#btn_tbjapprove_reservations":{
				tap:'btn_tbjapprove_reservations'
			},
			"button#btn_tbjapprove_reject":{
				tap:'btn_tbjapprove_reject'
			},
			
			"list#list_tbj_completed":{
				itemtap:'list_tbj'
			},
			
			"list#list_tbj_approved":{
				itemtap:'list_tbj'
			},
			
			"list#list_tbj_approval":{
				itemtap:'list_tbj'
			},
			
			"tabpanel#tp_detailPanel" : {
				activeitemchange : 'toTbjDetailChange'
			},
			
		}
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
	
	btn_tbjlist_back:function(obj, e, opt){//btn_tbjlist_back
		var objj = this;
		if (obj.getId() == "btn_tbjlist_back") {
			var tbjListStore = Ext.data.StoreManager.lookup('tbjListStore');
			tbjListStore.setData([]);
			var tbjApproveFinishListStore = Ext.data.StoreManager.lookup('tbjApproveFinishListStore');
			tbjApproveFinishListStore.setData([]);
			var tbjApprovedListStore = Ext.data.StoreManager.lookup('tbjApprovedListStore');
			tbjApprovedListStore.setData([]);
			
			// 刷新跳数
			this.getApplication().getController('HelcApprove.controller.MainMenuCtrl').initTBJPaddingCount();
		}
		if (obj.getId() == "btn_tbjapprove_back") {
			objj.getApplication().getController('HelcApprove.controller.TBJ.TBJListCtrl').toInitTbjApprove();
		  
		}
		if (obj.getId() == "btn_tbjapprove_back" && Ext.getCmp("toCompletedFromPadding").getValue() == "Y") {
			Ext.getCmp("toCompletedFromPadding").setValue("N");
			Ext.getCmp("hf_listTabFlag").setValue("1");
			
			var obj_his = {};
			obj_his.obj = objj;
			//obj_his.attr10 = Ext.getCmp("hf_attr10").getValue();
			obj_his.attr10=backflag;
			obj_his.version = null;
		    obj_his.QUOTE_NUMBER1=Ext.getCmp("QUOTE_NUMBER1").getValue();
		    obj_his.method='null';
			objj.list_tbj(obj_his ,null, null, null, null, null);
		    
		}
		this.BackView();
	},
	
	/**
	 * 插入操作日志
	 */
	InsertOperationLog : function(recordId,operation,successFlag,op_content){
		var obj = this;
		logID = obj.randomWord();
		//记录登录成功
		var params = {};
		params.method = 'insertOperateLog';
		//var deviceNo = Ext.getCmp('DeviceNo').getValue();
		var deviceNo=deviceIdt;
		if(deviceNo == ""){
			deviceNo = "非正常用户";
		}
		var par_obj = [logID,loginuser,recordId,operation,successFlag,op_content,deviceNo,'','','',''
		               ,'','','','',''];
		params.parameters = [par_obj];
		console.log(params);
		obj.connectServer_SQL_APPROVE(callBack,params);
		function callBack(result) {
			console.log('记录成功');
		}
		
	},
	
	/**
	 * 同意
	 */
	btn_tbjapprove_agree:function(){
		var objj = this;
		var name_acceptedFee = document.getElementsByName("name_acceptedFee");
		var isError2 = false;
		for (var i = 0; i < name_acceptedFee.length; i ++) {
			if (name_acceptedFee[i].value == null || name_acceptedFee[i].value == '') {
				Ext.Msg.alert('提示','请填写第'+ (i + 1) +'行TBJ复批 ！');
				isError2 = true;
				break ;
			}
		}
		var tf_adprice = Ext.getCmp('tf_adprice');
		if (tf_adprice.getValue() != null && tf_adprice.getValue() != '') {
			Ext.Msg.alert('提示','同意时，不能填写建议营业设备期望价 ！');
			return ;
		}
		var tf_arate = Ext.getCmp('tf_arate');
		if (tf_arate.getValue() != null && tf_arate.getValue() != '') {
			Ext.Msg.alert('提示','同意时，不能填写建议设备价浮率 ！');
			return ;
		}
		var tf_atprice = Ext.getCmp('tf_atprice');
		if (tf_atprice.getValue() != null && tf_atprice.getValue() != '') {
			Ext.Msg.alert('提示','同意时，不能填写建议运输期望价 ！');
			return ;
		}
		var tf_atrate = Ext.getCmp('tf_atrate');
		if (tf_atrate.getValue() != null && tf_atrate.getValue() != '') {
			Ext.Msg.alert('提示','同意时，不能填写建议运输浮率 ！');
			return ;
		}
		
		var isError = false;
		var ipt_pricepro_txts = document.getElementsByName('ipt_pricepro_txt');
		for (var i = 0; i < ipt_pricepro_txts.length; i ++) {
			if (ipt_pricepro_txts[i].value != null && ipt_pricepro_txts[i].value != '') {
				Ext.Msg.alert('提示','同意时，不能填写建议比例 ！');
				isError = true;
				break ;
			}
		}
		if (isError) {
			return;
		} else if (isError2) { 
			return;
		}
		
		Ext.Msg.confirm("提示", "确定同意审批吗？", function(btn) {
			if (btn == "yes") {
				// 执行数据提交
				var quoteStr = {};
				quoteStr.adprice = Ext.getCmp('tf_adprice').getValue();
				quoteStr.arate = Ext.getCmp('tf_arate').getValue();
				quoteStr.atprice = Ext.getCmp('tf_atprice').getValue();
				quoteStr.atrate = Ext.getCmp('tf_atrate').getValue();
				quoteStr.tbjnote = Ext.getCmp('tf_tbjnote').getValue();
				
				var name_acceptedFee = document.getElementsByName("name_acceptedFee");
				var obj_serviceFee = eval("("+Ext.getCmp('hf_serviceFee').getValue()+")");
				for (var i = 0; i < obj_serviceFee.length; i ++) {
					obj_serviceFee[i].acceptedFee = name_acceptedFee[i].value;
				}
				var ipt_pricepro_txt = document.getElementsByName("ipt_pricepro_txt");
				var obj_payRatio = eval("("+ Ext.getCmp('hf_payRatio').getValue() +")");
				var prsize = obj_payRatio.length;
				for (var i = 0; i < prsize; i ++) {
					obj_payRatio[i].sugproportion = ipt_pricepro_txt[i].value;
				}
				var param = {};
				param.isLoading = true;
				param.method = "approveToPass";
				param.parameters = [Ext.getCmp('username').getValue(), 
				                    Ext.getCmp('password').getValue(), 
				                    Ext.getCmp('hf_attr10').getValue(),
				                    JSON.stringify(obj_serviceFee),
				                    JSON.stringify(obj_payRatio),
				                    JSON.stringify(quoteStr)];
				tbjIsCommitting = true;
				objj.connectServer_ws(callBack, param);
				function callBack(result) {
					tbjIsCommitting = false;
					// 成功时，result为null或者空
					if (null == result) {
						Ext.Msg.alert('提示', '获取失败，请稍后重试！');
						objj.InsertOperationLog(Ext.getCmp('hf_attr10').getValue(), 'APPROVE_PASS', 'N', "审批失败");
					} else if ("success" == result.result) {
//						Ext.Msg.alert('提示', '审批成功！');
						objj.BackView(); // 回待审批列表界面
						//objj.toInitTbjApprove(); // 重新加载待审批列表
						objj.getApplication().getController('HelcApprove.controller.TBJ.TBJListCtrl').toInitTbjApprove();
						objj.InsertOperationLog(Ext.getCmp('hf_attr10').getValue(), 'APPROVE_PASS', 'Y', "审批成功");
						
					} else {
						Ext.Msg.alert('提示', result.result);
						objj.InsertOperationLog(Ext.getCmp('hf_attr10').getValue(), 'APPROVE_PASS', 'N', result.result);
					}
				}
			}
		});
	},
	
	/**
	 * 保留意见
	 */
	btn_tbjapprove_reservations: function(){
		var objj = this;
		var name_acceptedFee = document.getElementsByName("name_acceptedFee");
		var isError = false;
		for (var i = 0; i < name_acceptedFee.length; i ++) {
			if (name_acceptedFee[i].value == null || name_acceptedFee[i].value == '') {
				Ext.Msg.alert('提示','请填写第'+ (i + 1) +'行TBJ复批 ！');
				isError = true;
				break ;
			}
		}
		if (isError) {
			return ;
		}
		
		Ext.Msg.confirm("提示", "确定保留意见吗？", function(btn) {
			if (btn == "yes") {
				// 执行数据提交
				var quoteStr = {};
				quoteStr.adprice = Ext.getCmp('tf_adprice').getValue();
				quoteStr.arate = Ext.getCmp('tf_arate').getValue();
				quoteStr.atprice = Ext.getCmp('tf_atprice').getValue();
				quoteStr.atrate = Ext.getCmp('tf_atrate').getValue();
				quoteStr.tbjnote = Ext.getCmp('tf_tbjnote').getValue();
				quoteStr.dspl = Ext.getCmp("tf_dSPL").getValue();
				
				var obj_serviceFee = eval("("+Ext.getCmp('hf_serviceFee').getValue()+")");
				for (var i = 0; i < obj_serviceFee.length; i ++) {
					obj_serviceFee[i].acceptedFee = name_acceptedFee[i].value;
				}
				
				var ipt_pricepro_txt = document.getElementsByName("ipt_pricepro_txt");
				var obj_payRatio = eval("("+ Ext.getCmp('hf_payRatio').getValue() +")");
				var prsize = obj_payRatio.length;
				for (var i = 0; i < prsize; i ++) {
					obj_payRatio[i].sugproportion = ipt_pricepro_txt[i].value;
				}
				
				var param = {};
				param.isLoading = true;
				param.method = "approveToReserve";
				param.parameters = [Ext.getCmp('username').getValue(), 
				                    Ext.getCmp('password').getValue(), 
				                    Ext.getCmp('hf_attr10').getValue(),
				                    JSON.stringify(obj_serviceFee),
				                    JSON.stringify(obj_payRatio),
				                    JSON.stringify(quoteStr)];
				tbjIsCommitting = true;
				objj.connectServer_ws(callBack, param);
				function callBack(result) {
					tbjIsCommitting = false;
					if (null == result) {
						Ext.Msg.alert('提示', '获取失败，请稍后重试！');
						objj.InsertOperationLog(Ext.getCmp('hf_attr10').getValue(),'APPROVE_RESERVE','N',"审批失败");
					} else if ("success" == result.result) {
//						Ext.Msg.alert('提示', '审批成功！');
						objj.BackView(); // 回待审批列表界面
						//objj.toInitTbjApprove(); // 重新加载待审批列表
						objj.getApplication().getController('HelcApprove.controller.TBJ.TBJListCtrl').toInitTbjApprove();
						objj.InsertOperationLog(Ext.getCmp('hf_attr10').getValue(),'APPROVE_RESERVE','Y',"审批成功");
					} else {
						Ext.Msg.alert('提示', result.result);
						objj.InsertOperationLog(Ext.getCmp('hf_attr10').getValue(),'APPROVE_RESERVE','N',result.result);
					}
				}
			}
		});
	},
	
	/**
	 * 拒绝
	 */
	btn_tbjapprove_reject: function(){
		var objj = this;
		var name_acceptedFee = document.getElementsByName("name_acceptedFee");
		var isError = false;
		for (var i = 0; i < name_acceptedFee.length; i ++) {
			if (name_acceptedFee[i].value == null || name_acceptedFee[i].value == '') {
				Ext.Msg.alert('提示','请填写第'+ (i + 1) +'行TBJ复批 ！');
				isError = true;
				break ;
			}
		}
		if (isError) {
			return ;
		}
		
		var hasValue = false;
		var tf_adprice =  Ext.getCmp("tf_adprice").getValue();
		if (tf_adprice != null && tf_adprice != "") {
			hasValue = true;
		}
		var tf_arate =  Ext.getCmp("tf_arate").getValue();
		if (tf_arate != null && tf_arate != "") {
			hasValue = true;
		}
		var tf_atprice =  Ext.getCmp("tf_atprice").getValue();
		if (tf_atprice != null && tf_atprice != "") {
			hasValue = true;
		}
		var tf_atrate =  Ext.getCmp("tf_atrate").getValue();
		if (tf_atrate != null && tf_atrate != "") {
			hasValue = true;
		}
		var tf_tbjnote =  Ext.getCmp("tf_tbjnote").getValue();
		if (tf_tbjnote != null && tf_tbjnote != "") {
			hasValue = true;
		}
		
		var ipt_pricepro_txt = document.getElementsByName("ipt_pricepro_txt");
		var size = ipt_pricepro_txt.length;
		for (var i = 0; i < size; i ++) {
			var value = ipt_pricepro_txt[i].value.trim();
            if(value != null && value!="") {
            	hasValue = true;
                break;
            }
		}
		if (!hasValue) {
			Ext.Msg.alert('提示','拒绝申请时，必须填写建议设备/运费的价格及浮率、建议付款比例或审批意见！');
			return ;
		}
		
		//检查哪些pricepro被填写过，如果填写过就记录下这一行对应的合同类型
		var ctype = document.getElementsByName("sp_ctype");
		var proportions = document.getElementsByName("sp_proportions");
		var ctypeSum = {};
		size = ctype.length;
		for (var i = 0; i < size; i ++) {
			if(ipt_pricepro_txt[i].value != null && ipt_pricepro_txt[i].value != "") {
                ctypeSum[ctype[i].innerHTML] = 0;
            }
		}
		
		//检查被填过值得合同类型的建议点数总和是否为100
		for(var i=0; i<ctype.length; i++) {
	        if(ctypeSum[ctype[i].innerHTML] != null) {
	           ctypeSum[ctype[i].innerHTML] += Number(ipt_pricepro_txt[i].value);
	        }
	    }
		
		var sumAllRight = true;
		//检查已经填值得合同类型总和是否为100
		var errorMessage = "拒绝申请时，";
        for(var key in ctypeSum) {
            if(ctypeSum[key] != 100) {
                errorMessage += " "+key+" ";
                sumAllRight =  false;
            }
        }
        if(sumAllRight == false) {
            Ext.Msg.alert('提示','拒绝申请时，建议比例之和不等于100！');
            return ;
        } else {
        	//检查所填的付款比例是否有与原比例不同的。若没有不同的项则提示错误
            var hasDiff = false;
            var allEmpty = true;
            for(var key in ctypeSum) {
                //建议付款比例未被填过
                allEmpty = false;
                break;
            }
            //付款比例有被修改过，则需要满足至少有一项与原比例不同
            if(!allEmpty) {
                  for(var i=0; i<proportions.length; i++) {
                   if(ipt_pricepro_txt[i].value != null && ipt_pricepro_txt[i].value != "" && Number(ipt_pricepro_txt[i].value) != Number(proportions[i].innerHTML)) {
                       hasDiff = true;
                       break;
                   }
                }
            }

            if(!allEmpty && !hasDiff) {
                Ext.Msg.alert('提示','拒绝申请时，建议付款比例至少有一项和原比例不同！');
                return ;
            }
        }
        
        Ext.Msg.confirm("提示", "确定拒绝吗？", function(btn) {
			if (btn == "yes") {
				// 执行数据提交
				var quoteStr = {};
				quoteStr.adprice = Ext.getCmp('tf_adprice').getValue();
				quoteStr.arate = Ext.getCmp('tf_arate').getValue();
				quoteStr.atprice = Ext.getCmp('tf_atprice').getValue();
				quoteStr.atrate = Ext.getCmp('tf_atrate').getValue();
				quoteStr.tbjnote = Ext.getCmp('tf_tbjnote').getValue();
				quoteStr.dspl = Ext.getCmp("tf_dSPL").getValue();
				quoteStr.tprice = Ext.getCmp("tf_tprice").getValue();
				quoteStr.dprice = Ext.getCmp("tf_dprice").getValue();
				quoteStr.drate = Ext.getCmp("tf_drate").getValue();
				quoteStr.trate = Ext.getCmp("tf_trate").getValue();
				
				var name_acceptedFee = document.getElementsByName("name_acceptedFee");
				var obj_serviceFee = eval("("+Ext.getCmp('hf_serviceFee').getValue()+")");
				for (var i = 0; i < obj_serviceFee.length; i ++) {
					obj_serviceFee[i].acceptedFee = name_acceptedFee[i].value;
				}
				
				var obj_payRatio = eval("("+ Ext.getCmp('hf_payRatio').getValue() +")");
				var prsize = obj_payRatio.length;
				for (var i = 0; i < prsize; i ++) {
					obj_payRatio[i].sugproportion = ipt_pricepro_txt[i].value;
				}
				
				var param = {};
				param.isLoading = true;
				param.method = "approveToRefuse";
				param.parameters = [Ext.getCmp('username').getValue(), 
				                    Ext.getCmp('password').getValue(), 
				                    Ext.getCmp('hf_attr10').getValue(),
				                    JSON.stringify(obj_serviceFee),
				                    JSON.stringify(obj_payRatio),
				                    JSON.stringify(quoteStr)];
				tbjIsCommitting = true;
				objj.connectServer_ws(callBack, param);
				function callBack(result) {
					tbjIsCommitting = false;
					// 成功时，result为null或者空
					if (null == result) {
						Ext.Msg.alert('提示', '提交数据失败，请稍后重试！');
						objj.InsertOperationLog(Ext.getCmp('hf_attr10').getValue(),'APPROVE_REFUSE','N',"审批失败");
					} else if ("success" == result.result) {
//						Ext.Msg.alert('提示', '审批成功！');
						objj.BackView(); // 回待审批列表界面
						objj.getApplication().getController('HelcApprove.controller.TBJ.TBJListCtrl').toInitTbjApprove();
						objj.InsertOperationLog(Ext.getCmp('hf_attr10').getValue(),'APPROVE_REFUSE','Y',"审批成功");
						//objj.toInitTbjApprove(); // 重新加载待审批列表
					} else {
						Ext.Msg.alert('提示', result.result);
						objj.InsertOperationLog(Ext.getCmp('hf_attr10').getValue(),'APPROVE_REFUSE','N',result.result);
					}
				}
			}
		});
        
	},
	
	/**
	 * 点击TBJ待审批列表
	 */
	list_tbj:function(obk, index, target, record, e, eOpts ){
		var listTabFlag = Ext.getCmp('hf_listTabFlag').getValue();
		var objj = this;
		var ATTR_10 = null;
		var QUOTE_NUMBER1=null; 
		if (record) {
			ATTR_10 = record.get('ATTR_10');
			objj = this;
			QUOTE_NUMBER1=record.get('QUOTE_NUMBER1');
			backflag=record.get('ATTR_10');
		    
		} else {
			ATTR_10 = obk.attr10;
			objj = obk.obj;
			QUOTE_NUMBER1=obk.QUOTE_NUMBER1;
			
			
		}
		objj.NextView('TBJ_Approve','HelcApprove.view.TBJ.TBJ_Approve');
		Ext.getCmp('hf_attr10').setValue(ATTR_10);
		// 加载第一个页签数据
		var param = {};
		param.isLoading = true;
		param.method = "toQueryTJBAprovelPendingDetail";
		if (record) {
			param.parameters = [ATTR_10, null ,null];
		} else {
            if(obk.method =='null')
			param.parameters = [ATTR_10, obk.version ,null];
            else
            param.parameters = ['', obk.version ,QUOTE_NUMBER1];	
		}
		objj.connectServer_ws(callBack, param);
		function callBack(result) {
			if (null == result) {
				Ext.Msg.alert('提示', '获取失败，请稍后重试！');
				return ;
			}
			var dataTitle = result.HELHHTBJApproveMainwsQueryByExample_Output.ListOfHelHhTbjApproveMainIo.HelHhTbjApproveMainEbc;
			if ((dataTitle == null || dataTitle == undefined) && !record) {
				Ext.Msg.alert('提示', '找不到'+ obk.version +'版本的数据！');
				return ;
			}
			// 项目情况
			Ext.getCmp("tf_dpName").setValue(dataTitle.ATTR_05);
			Ext.getCmp("tf_userUnit").setValue(dataTitle.QUOTE_FINAL_USER);
			Ext.getCmp("tf_buyUserName").setValue(dataTitle.OPPORTUNITY_ACCOUNT);
			Ext.getCmp("tf_customerType").setValue(dataTitle.OPPORTUNITY_ACCOUNT_TYPE);
			Ext.getCmp("tf_contType").setValue(dataTitle.BUSINESS_TYPE);
			Ext.getCmp("tf_vElevatorCount").setValue(dataTitle.ELEVATOR_SUM_QUANTITY);
			Ext.getCmp("tf_sElevatorCount").setValue(dataTitle.ESCALATOR_SUM_QUANTITY);
			Ext.getCmp("tf_PlanDelivery").setValue(dataTitle.ATTR_25);
			if (listTabFlag == "1") {
				Ext.getCmp('tf_itmElevator').setHidden(true);
				Ext.getCmp("tf_debugOnly").setHidden(false);
				if (dataTitle.ATTR_11 == 'N') {//95
					Ext.getCmp("tf_debugOnly").setValue(dataTitle.ATTR_11);
				} else {
					Ext.getCmp("tf_debugOnly").setValue("Y");
				}
				
				Ext.getCmp('tf_distDate').setHidden(true);
				Ext.getCmp("tf_dcgrade").setHidden(false);
				Ext.getCmp("tf_dcgrade").setValue(dataTitle.ATTR_17);
			} else if (listTabFlag == "2" || listTabFlag == "3") {
				Ext.getCmp('tf_itmElevator').setHidden(false);
				Ext.getCmp('tf_debugOnly').setHidden(true);
				Ext.getCmp('tf_itmElevator').setValue(dataTitle.ATTR_05);
				
				Ext.getCmp('tf_distDate').setHidden(false);
				Ext.getCmp("tf_dcgrade").setHidden(true);
				Ext.getCmp("tf_distDate").setValue(dataTitle.DELIVERY_CYCLE);
			}
			Ext.getCmp("tf_qgdate").setValue(dataTitle.GUARANTEE_QUALITY_MONTHS);
			if(parseInt(dataTitle.GUARANTEE_QUALITY_MONTHS)>24){
				Ext.getCmp('tf_qgdate').setInputCls("tf_qgdate_ipt");
			}
			Ext.getCmp("tf_contNum").setValue(dataTitle.CONTRACT_ID);
			Ext.getCmp("tf_pNum").setValue(dataTitle.QUOTE_NUMBER1);
			Ext.getCmp("tf_revision").setValue(dataTitle.ATTR_01);
			var bjh1=dataTitle.ATTR_01;
			Ext.getCmp("tf_branchEmployee").setValue(dataTitle.SALES_TEAM);
			Ext.getCmp("tf_hqEmployee").setValue(dataTitle.TECH_APPROVER_NAME);
			Ext.getCmp("tf_followOrg").setValue(dataTitle.ORGANIZATION_OPPTY);
			Ext.getCmp("tf_LargeProjectFlg").setValue(dataTitle.ATTR_06);
			
			// 申请价格总体情况
			Ext.getCmp("tf_dSPL").setValue(parseFloat(dataTitle.EQUIPMENT_PRICE).toFixed(2));
			Ext.getCmp("tf_pSPL").setValue(parseFloat(dataTitle.ENGINEER_PRICE).toFixed(2));
			Ext.getCmp("tf_tSPL").setValue(parseFloat(dataTitle.SHIPPING_PRICE).toFixed(2));
			Ext.getCmp("tf_itm").setValue(parseFloat(dataTitle.ITM_SUM_PRICE).toFixed(2));
			Ext.getCmp("tf_dprice").setValue(parseFloat(dataTitle.EQUIPMENT_FORWARD_PRICE).toFixed(2));
			Ext.getCmp("tf_pprice").setValue(parseFloat(dataTitle.ENGINEER_FORWARD_PRICE).toFixed(2));
			Ext.getCmp("tf_tprice").setValue(parseFloat(dataTitle.SHIPPING_FORWARD_PRICE).toFixed(2));
			Ext.getCmp("tf_sprice").setValue(parseFloat(dataTitle.HEAD_PRICE).toFixed(2));
			if (dataTitle.EQUIPMENT_APPROVE_DISCOUNT != '') {
				Ext.getCmp("tf_drate").setValue(parseFloat(dataTitle.EQUIPMENT_APPROVE_DISCOUNT).toFixed(2) + '');
			}
			if (dataTitle.ENGINEER_APPROVE_DISCOUNT != '') {
				Ext.getCmp("tf_prate").setValue(parseFloat(dataTitle.ENGINEER_APPROVE_DISCOUNT).toFixed(2) + '');
			}
			if (dataTitle.SHIPPING_APPROVE_DISCOUNT != '') {
				Ext.getCmp("tf_trate").setValue(parseFloat(dataTitle.SHIPPING_APPROVE_DISCOUNT).toFixed(2) + '');
			}
			Ext.getCmp("tf_apprice").setValue(parseFloat(dataTitle.HEL_TOTAL_ATTACH_PRICE).toFixed(2));
			
			// 买断合同价格情况
			if (dataTitle.HEL_AGENCY_PRICE != '') {
				Ext.getCmp("tf_cdprice").setValue(parseFloat(dataTitle.HEL_AGENCY_PRICE).toFixed(2));
			} else {
				Ext.getCmp("tf_cdprice").setValue('0.00');
			}
			if (dataTitle.HEL_AGENCY_INSTALL_PRICE) {
				Ext.getCmp("tf_chprice").setValue(parseFloat(dataTitle.HEL_AGENCY_INSTALL_PRICE).toFixed(2));
			} else {
				Ext.getCmp("tf_chprice").setValue('0.00');
			}
			if (dataTitle.ATTR_03) {
				Ext.getCmp("tf_ctprice").setValue(parseFloat(dataTitle.ATTR_03).toFixed(2));
			} else {
				Ext.getCmp("tf_ctprice").setValue('0.00');
			}
			if (dataTitle.ATTR_03) {
				Ext.getCmp("tf_cmprice").setValue(parseFloat(dataTitle.THREE_AGREEMENT_PRICE).toFixed(2));
			} else {
				Ext.getCmp("tf_cmprice").setValue('0.00');
			}
			if (dataTitle.HEL_AGENCY_DISCOUNT != '') {
				Ext.getCmp("tf_crate").setValue(parseFloat(dataTitle.HEL_AGENCY_DISCOUNT).toFixed(2) + '');
			} else {
				Ext.getCmp("tf_crate").setValue('0.00');
			}
			if (dataTitle.HEL_AGENCY_INSTAL_PRICE_DIS != '') {
				Ext.getCmp("tf_chrate").setValue(parseFloat(dataTitle.HEL_AGENCY_INSTAL_PRICE_DIS).toFixed(2) + '');
			} else {
				Ext.getCmp("tf_chrate").setValue('0.00');
			}
			if (dataTitle.ATTR_04 != '') {
				Ext.getCmp("tf_ctrate").setValue(parseFloat(dataTitle.ATTR_04 + '').toFixed(2));
			} else {
				Ext.getCmp("tf_ctrate").setValue('0.00');
			}
			if (dataTitle.THREE_AGREEMENT_PRICE_DISCOUNT != '') {
				Ext.getCmp("tf_cmrate").setValue(parseFloat(dataTitle.THREE_AGREEMENT_PRICE_DISCOUNT + '').toFixed(2));
			} else {
				Ext.getCmp("tf_cmrate").setValue('0.00');
			}
			dataTitle.addedFeeSum = "0";
			dataTitle.acceptedFeeSum = "0";
			dataTitle.research = "";
			if (dataTitle.TOTAL_APPROVE_SERVICE_POINT != null && dataTitle.TOTAL_APPROVE_SERVICE_POINT != '') {
				dataTitle.adsprice = dataTitle.TOTAL_APPROVE_SERVICE_POINT;
			} else {
				dataTitle.adsprice = "0";
			}
			if (dataTitle.DEDUCT_SUGS_POT_EQU_DISCOUNT != null && dataTitle.DEDUCT_SUGS_POT_EQU_DISCOUNT != '') {
				dataTitle.d_rate2 = dataTitle.DEDUCT_SUGS_POT_EQU_DISCOUNT;
			} else {
				dataTitle.d_rate2 = "0";
			}
			if (dataTitle.EQUIPMENT_FORWARD_PRICE != null && dataTitle.EQUIPMENT_FORWARD_PRICE != '') {
				dataTitle.dprice = dataTitle.EQUIPMENT_FORWARD_PRICE;
			} else {
				dataTitle.dprice = "0";
			}
			if (dataTitle.EQUIPMENT_PRICE != null && dataTitle.EQUIPMENT_PRICE != '') {
				dataTitle.dSPL = dataTitle.EQUIPMENT_PRICE;
			} else {
				dataTitle.dSPL = "0";
			}
			if (dataTitle.ATTR_11 != "Y") {
				dataTitle.research = "95";
			}
			dataTitle.priceRightFlag = "";
			dataTitle.proportionRightFlag = "";
			dataTitle.adpriceRightFlag = "";
			dataTitle.tpriceRightFlag = "";
			if (dataTitle.ATTR_09 != "" && dataTitle.ATTR_09 != null) {
				var spAttr09 = dataTitle.ATTR_09.split(',');
				if (spAttr09.length == 4) {
					dataTitle.priceRightFlag = spAttr09[0];
					dataTitle.proportionRightFlag = spAttr09[1];
					dataTitle.adpriceRightFlag = spAttr09[2];//服务费
					dataTitle.tpriceRightFlag = spAttr09[3];
				}
			}
			
			// 服务费审批信息
			var param2 = {isLoading: true, method: "toQueryServiceFee", parameters: [ATTR_10]};
			objj.connectServer_ws(callBack2, param2);
			function callBack2(result2) {
				var dataServiceFeet = result2.HELHHTBJServiceFeewsQueryByExample_Output.ListOfHelHhTbjServiceFeeIo.HelHhTbjServiceFeeEbc;
				//防止错误终止程序
				if(dataServiceFeet!=null)
				{
				var dataServiceFee = [];
				if (JSON.stringify(dataServiceFeet).indexOf('[') == -1) {
					dataServiceFee[dataServiceFee.length] = dataServiceFeet;
				} else {
					dataServiceFee = dataServiceFeet;
				}
				var size = dataServiceFee.length;
				var tbl_ServiceFee = document.getElementById("tbl_ServiceFee");
				var serviceFeeStr = [];
				for (var i = 0; i < size; i ++) {
					var NewRow = tbl_ServiceFee.insertRow(tbl_ServiceFee.rows.length);
					NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value_one">'+dataServiceFee[i].AGENT_NAME+'</td>';
					NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one" name="td_serviceFee_point">'+ parseFloat(dataServiceFee[i].SERVICE_POINT).toFixed(2) +'</td>';
					if (listTabFlag == "1") {
						if (dataServiceFee[i].ATTR_09 != '' && dataServiceFee[i].ATTR_09 != null && dataServiceFee[i].ATTR_01 != '' && dataServiceFee[i].ATTR_01 != null) {
							NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one"><input class="cls_tbj_ipt" id="id_gpoint" name="name_gpoint" type="text" style="height:35px;width:50px;background-color:#CCEEDC;" onchange="nameGpointChange(this, \'ONE\', \''+ i +'\')" disabled="disabled" value="'+ (parseFloat(dataServiceFee[i].ATTR_09) - parseFloat(dataServiceFee[i].ATTR_01)).toFixed(2) +'"/></td>';
						} else {
							NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one"><input class="cls_tbj_ipt" id="id_gpoint" name="name_gpoint" type="text" style="height:35px;width:50px;background-color:#CCEEDC;" onchange="nameGpointChange(this, \'ONE\', \''+ i +'\')" disabled="disabled"/></td>';
						}
					} else if (listTabFlag == "2" || listTabFlag == "3") {
						if (dataServiceFee[i].ATTR_09 != '' && dataServiceFee[i].ATTR_09 != null && dataServiceFee[i].ATTR_09 != undefined && dataServiceFee[i].ATTR_01 != '' && dataServiceFee[i].ATTR_01 != null && dataServiceFee[i].ATTR_01 != undefined) {
							NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">'+ (parseFloat(dataServiceFee[i].ATTR_09) - parseFloat(dataServiceFee[i].ATTR_01)).toFixed(2) +'</td>';
						} else {
							NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">0.00</td>';
						}
					}
					if (dataServiceFee[i].SERVICE_POINT != ''  && dataServiceFee[i].ATTR_01 != null && dataServiceFee[i].ATTR_01 != '') {
						NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one"><span name="sp_addServiceFee">'+ parseFloat(dataServiceFee[i].ATTR_01).toFixed(2) +'</span></td>';
						NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one">'+ (parseFloat(dataServiceFee[i].SERVICE_POINT) + parseFloat(dataServiceFee[i].ATTR_01)).toFixed(2) +'</td>';
					} else {
						NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one"><span name="sp_addServiceFee">0.00</span></td>';
						NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one">0.00</td>';
					}
					if (listTabFlag == "1") {
						if (dataServiceFee[i].ATTR_09 == undefined || dataServiceFee[i].ATTR_09 == '' || dataServiceFee[i].ATTR_09 == null) {
							NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value_one"><input class="cls_tbj_ipt" id="id_acceptedFee" name="name_acceptedFee" onchange="nameGpointChange(this, \'TWO\', \''+ i +'\')" type="text" style="height:35px;width:50px;background-color:#FFF8DC;" value=""/></td>';
						} else {
							NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value_one"><input class="cls_tbj_ipt" id="id_acceptedFee" name="name_acceptedFee" onchange="nameGpointChange(this, \'TWO\', \''+ i +'\')" type="text" style="height:35px;width:50px;background-color:#FFF8DC;" value="'+ parseFloat(dataServiceFee[i].ATTR_09).toFixed(2) +'"/></td>';
						}
						NewRow.insertCell(6).innerHTML = '<td class="tbl_nobr_value_one"><textarea id="id_gdetail" placeholder="请输入批复说明" type="text" style="background:#FFF8DC;height:35px;resize:none;overflow-y:hidden;border:none;margin-top:3px;" value="'+ parseFloat(dataServiceFee[i].APPROVE_COMMENT).toFixed(2) +'"></textarea></td>';
					} else if (listTabFlag == "2" || listTabFlag == "3") {
						if (dataServiceFee[i].ATTR_09 == undefined || dataServiceFee[i].ATTR_09 == '' || dataServiceFee[i].ATTR_09 == null) {
							NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value_one"></td>';
						} else {
							NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value_one">'+ parseFloat(dataServiceFee[i].ATTR_09).toFixed(2) +'</td>';
						}
						NewRow.insertCell(6).innerHTML = '<td class="tbl_nobr_value_one">'+ dataServiceFee[i].APPROVE_COMMENT +'</td>';
					}
					if (dataServiceFee[i].ATTR_09 == null || dataServiceFee[i].ATTR_09 == '') {
						dataServiceFee[i].ATTR_09 = "0";
					}
					if (dataServiceFee[i].ATTR_01 == null || dataServiceFee[i].ATTR_01 == '') {
						dataServiceFee[i].ATTR_01 = "0";
					}
					dataTitle.acceptedFeeSum = parseFloat(dataTitle.acceptedFeeSum) + parseFloat(dataServiceFee[i].ATTR_09);
					dataTitle.addedFeeSum = parseFloat(dataTitle.addedFeeSum) + parseFloat(dataServiceFee[i].ATTR_01);
					dataTitle.adsprice = parseFloat(dataTitle.adsprice) + (parseFloat(dataServiceFee[i].ATTR_09) - parseFloat(dataServiceFee[i].ATTR_01));
					
					var serviceFeet = {};
					serviceFeet.acceptedFee = dataServiceFee[i].ATTR_09;
					serviceFeet.gdetail = dataServiceFee[i].APPROVE_COMMENT;
					serviceFeet.recordId = dataServiceFee[i].ATTR_10;
					serviceFeeStr[serviceFeeStr.length] = serviceFeet;
				}
				Ext.getCmp('hf_serviceFee').setValue(JSON.stringify(serviceFeeStr));
				if (tbl_ServiceFee.rows.length < 2){
					var NewRow = tbl_ServiceFee.insertRow(tbl_ServiceFee.rows.length);
					NewRow.innerHTML = '<td class="tbl_nobr_value_one" colspan="7">没有记录 ！</td>';
				}
				dataTitle.d_rate2 = parseFloat(dataTitle.dprice)*(1-parseFloat(dataTitle.acceptedFeeSum)/100) / parseFloat(dataTitle.dSPL) - 1;

				}
				// 梯种浮率
				var param3 = {isLoading: true, method: "toQueryElevatorC", parameters: [ATTR_10]};
				objj.connectServer_ws(callBack3, param3);
				function callBack3(result3) {
					if (result3 == null) {
						return ;
					}
					var table_elevatorC = document.getElementById("table_elevatorC");
					var dataElevatorCC = result3.HELHHTBJProdRatewsQueryByExample_Output.ListOfHelHhTbjProdRateIo.HelHhTbjProdRateEbc;
					var dataElevatorC = [];
					if (JSON.stringify(dataElevatorCC).indexOf('[') == -1) {
						dataElevatorC[dataElevatorC.length] = dataElevatorCC;
					} else {
						dataElevatorC = dataElevatorCC;
					}
					var size = dataElevatorC.length;
					for (var i = 0; i < size; i ++) {
						var NewRow = table_elevatorC.insertRow(table_elevatorC.rows.length);
						NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value_one">'+dataElevatorC[i].PRODUCT+'</td>';
						NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one">'+dataElevatorC[i].ATTR_01+'</td>';
						NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">'+dataElevatorC[i].QTY+'</td>';
						NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one"><span name="td_ele_spl_price">'+dataElevatorC[i].SPL_PRICE+'</span></td>';
						NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one"><span name="td_ele_expection_price">'+ dataElevatorC[i].EXPECTATION_PRICE +'</span></td>';
						if (dataElevatorC[i].EQU_AVERAGE_SCALE != "" && null != dataElevatorC[i].EQU_AVERAGE_SCALE && dataElevatorC[i].EQU_AVERAGE_SCALE != undefined) {
							NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value_one">'+ parseFloat(dataElevatorC[i].EQU_AVERAGE_SCALE).toFixed(2) +'</td>';
						} else {
							NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value_one"></td>';
						}
						if (dataElevatorC[i].SPL_PRICE != 0 && dataElevatorC[i].SPL_PRICE != '0') {
							NewRow.insertCell(6).innerHTML = '<td class="tbl_nobr_value_one" name="td_ele_sf_rate">'+ ((parseFloat(dataElevatorC[i].EXPECTATION_PRICE)*(1-parseFloat(dataTitle.SERVICE_POINT_TOTAL)/100) / parseFloat(dataElevatorC[i].SPL_PRICE) - 1)*100).toFixed(2)  +'</td>';
						} else {
							NewRow.insertCell(6).innerHTML = '<td class="tbl_nobr_value_one" name="td_ele_sf_rate"></td>';
						}
						NewRow.insertCell(7).innerHTML = '<td class="tbl_nobr_value_one"><span class="cls_tbj_ipt" name="td_ele_jy_rate">'+ ((parseFloat(dataElevatorC[i].EXPECTATION_PRICE)*(1-parseFloat(dataTitle.acceptedFeeSum)/100) / parseFloat(dataElevatorC[i].SPL_PRICE) - 1)*100).toFixed(2) +'</span></td>';
					}
					if (table_elevatorC.rows.length < 2){
						var NewRow = table_elevatorC.insertRow(table_elevatorC.rows.length);
						NewRow.innerHTML = '<td class="tbl_nobr_value_one" colspan="7">没有记录 ！</td>';
					}
				}
				
				// 付款比例
				var param4 = {isLoading: true, method: "toQueryProportion", parameters: [ATTR_10]};
				objj.connectServer_ws(callBack4, param4);
				function callBack4(result4) {
					if (result4 == null) {
						return ;
					}
					var table_proportion = document.getElementById("table_proportion");
					var dataProportionn = result4.HELHHTBJApprovePaywsQueryByExample_Output.ListOfHelHhTbjApprovePayIo.HelHhTbjApprovePayEbc;
					var dataProportion = [];
					if (JSON.stringify(dataProportionn).indexOf('[') == -1) {
						dataProportion[dataProportion.length] = dataProportionn;
					} else {
						dataProportion = dataProportionn;
					}
					var size = dataProportion.length;
					var payRatioStr = [];
					for (var i = 0; i < size; i ++) {
						// <tr height=\'40\'> <td>设备买卖合同</td> <td>排产前合计</td> <td>定金</td> <td>汇款</td> <td>5</td> <td><input type="text" style="height:35px;width:50px;background-color:#FFF8DC"/>%</td> <td></td> </tr> <tr height=\'40\'> <td>设备买卖合同</td> <td>排产前合计</td> <td>预付款</td> <td>汇款</td> <td>25</td> <td><input type="text" style="height:35px;width:50px;background-color:#FFF8DC"/>%</td> <td></td> </tr> <tr height=\'40\'> <td>设备买卖合同</td> <td>提货前合计</td> <td>提货款</td> <td>汇款</td> <td>70</td> <td><input type="text" style="height:35px;width:50px;background-color:#FFF8DC"/>%</td> <td></td> </tr> <tr height=\'40\'> <td>安装工程合同</td> <td>到货后</td> <td>进场款</td> <td>汇款</td> <td>80</td> <td><input type="text" style="height:35px;width:50px;background-color:#FFF8DC"/>%</td> <td></td> </tr> <tr height=\'40\'> <td>安装工程合同</td> <td>安装验收后</td> <td>验收款</td> <td>汇款</td> <td>20</td> <td><input type="text" style="height:35px;width:50px;background-color:#FFF8DC"/>%</td> <td></td> </tr>
						var rIndex = 0;
						var NewRow = table_proportion.insertRow(table_proportion.rows.length);
						NewRow.insertCell(rIndex ++).innerHTML = '<td class="tbl_nobr_value_one"><span name="sp_ctype">'+dataProportion[i].CONTRACT_TYPE+'</span></td>';
						NewRow.insertCell(rIndex ++).innerHTML = '<td class="tbl_nobr_value_one">'+dataProportion[i].PROMPT+'</td>';
						NewRow.insertCell(rIndex ++).innerHTML = '<td class="tbl_nobr_value_one">'+dataProportion[i].FUND_NAME+'</td>';
						NewRow.insertCell(rIndex ++).innerHTML = '<td class="tbl_nobr_value_one">'+ dataProportion[i].ATTR_02 +'</td>';
						if (dataProportion[i].RATIO != "" && null != dataProportion[i].RATIO && dataProportion[i].RATIO != undefined) {
							NewRow.insertCell(rIndex ++).innerHTML = '<td class="tbl_nobr_value_one"><span name="sp_proportions">'+ dataProportion[i].RATIO +'</span></td>';
						} else {
							NewRow.insertCell(rIndex ++).innerHTML = '<td class="tbl_nobr_value_one"><span name="sp_proportions"></span></td>';
						}
						if (listTabFlag == "1") { //待审批时，总揽才有此字段
							document.getElementById("td_pricepro_txt").style.display = "block";
							if (dataProportion[i].ATTR_01 != "" && null != dataProportion[i].ATTR_01 && dataProportion[i].ATTR_01 != undefined) {
								NewRow.insertCell(rIndex ++).innerHTML = '<td class="tbl_nobr_value_one"><input class="cls_tbj_ipt" onchange="iptPriceProChange(this, \''+ i +'\')" name="ipt_pricepro_txt" type="text" style="height:35px;width:50px;background-color:#FFF8DC" value="'+ dataProportion[i].ATTR_01 +'"/></td>';
							} else {
								NewRow.insertCell(rIndex ++).innerHTML = '<td class="tbl_nobr_value_one"><input class="cls_tbj_ipt" onchange="iptPriceProChange(this, \''+ i +'\')" name="ipt_pricepro_txt" type="text" style="height:35px;width:50px;background-color:#FFF8DC"/></td>';
							}
						} else {
							document.getElementById("td_pricepro_txt").style.display = "none";
						}
						NewRow.insertCell(rIndex ++).innerHTML = '<td class="tbl_nobr_value_one">'+ dataProportion[i].DESCRIPTION +'</td>';
						
						var payRatiot = {};
						payRatiot.sugproportion = dataProportion[i].ATTR_01;
						payRatiot.recordId = dataProportion[i].ATTR_10;
						payRatioStr[payRatioStr.length] = payRatiot;
					}
					Ext.getCmp('hf_payRatio').setValue(JSON.stringify(payRatioStr));
					if (table_proportion.rows.length < 2){
						var NewRow = table_proportion.insertRow(table_proportion.rows.length);
						NewRow.innerHTML = '<td class="tbl_nobr_value_one" colspan="7">没有记录 ！</td>';
					}
					
				}
				
				// 设备合同服务费确认书情况
				if ((dataTitle.ATTR_13 == null || dataTitle.ATTR_13 == "") && (dataTitle.ATTR_14 == null || dataTitle.ATTR_14 == "") && (dataTitle.ATTR_15 == null || dataTitle.ATTR_15 == "")) {
					var NewRow = table_confirmed.insertRow(table_confirmed.rows.length);
					NewRow.innerHTML = '<td class="tbl_nobr_value_one" colspan="3">没有记录 ！</td>';
				} else {
					var NewRow = table_confirmed.insertRow(table_confirmed.rows.length);
					NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value_one">'+dataTitle.ATTR_13+'</td>';
					if (dataTitle.ATTR_14 != '' && dataTitle.ATTR_14 != null && dataTitle.ATTR_14 != undefined) {
						NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one">'+ dataTitle.ATTR_14 +'</td>';
					} else {
						NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one">'+ 0.00 +'</td>';
					}
					NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">'+dataTitle.ATTR_15+'</td>';
				}
				
				// 价格审批信息
				Ext.getCmp('tf_asprice').setValue(parseFloat(dataTitle.SERVICE_POINT_TOTAL).toFixed(2));
				Ext.getCmp('tf_addedFeeSum').setValue(parseFloat(dataTitle.addedFeeSum).toFixed(2));
				Ext.getCmp('tf_acceptedFeeSum').setValue(parseFloat(dataTitle.acceptedFeeSum).toFixed(2));
				Ext.getCmp('tf_research').setValue(dataTitle.research);
				if (dataTitle.EQUIPMENT_FORWARD_PRICE2 != "") {
					Ext.getCmp('tf_adprice').setValue(parseFloat(dataTitle.EQUIPMENT_FORWARD_PRICE2).toFixed(2));
				}
				if (dataTitle.ATTR_07 != "") {
					Ext.getCmp('tf_atprice').setValue(parseFloat(dataTitle.ATTR_07).toFixed(2));
				}
				if (dataTitle.RATE_NOAPP_SERVICES != "") {
					Ext.getCmp('tf_d_rate').setValue(parseFloat(dataTitle.RATE_NOAPP_SERVICES).toFixed(2)+ "%");
				}
				if (dataTitle.d_rate2 != "") {
					Ext.getCmp('tf_d_rate2').setValue((parseFloat(dataTitle.d_rate2) * 100).toFixed(2)+ "%");
				}
				if (dataTitle.adsprice != "") {
					Ext.getCmp('tf_adsprice').setValue(parseFloat(dataTitle.adsprice).toFixed(2)+ "");
				}
				if (dataTitle.EQUIPMENT_APPROVE_DISCOUNT2 != "") {
					Ext.getCmp('tf_arate').setValue(parseFloat(dataTitle.EQUIPMENT_APPROVE_DISCOUNT2).toFixed(2));
				}
				if (dataTitle.ATTR_08 != "") {
					Ext.getCmp('tf_atrate').setValue(parseFloat(dataTitle.ATTR_08).toFixed(2)+ "%");
				}
				Ext.getCmp('tf_tbjnote').setValue(dataTitle.TBJ_APPROVED_SUGGESTION);
					
					
					// 历史列表 (版本对比提示)
					
					
					var param6 = {isLoading: true, method: "toQueryHistory", parameters: [ATTR_10,bjh1]};
					if(Ext.getCmp("toCompletedFromPadding").getValue()!="Y")
					objj.connectServer_ws(callBack6, param6);
					function callBack6(result6) {
						//console.log("hehe2"+JSON.stringify(result6));
						if (result6 == null) {
							return ;
						}
						var dataHistoryy = result6.HELHHTBJApproveHistorywsQueryByExample_Output.ListOfHelHhTbjApproveHistoryIo.HelHhTbjApproveHistoryEbc;
						var dataHistory = [];
						if (JSON.stringify(dataHistoryy).indexOf('[') == -1) {
							dataHistory[dataHistory.length] = dataHistoryy;
						} else {
							dataHistory = dataHistoryy;
						}
						lsbb=dataHistory;
						//console.log("dataHistory"+dataHistory[0].ATTR_01+"lsbb"+lsbb[0].ATTR_01)
						
						var size = dataHistory.length;
						for (var i = 0; i < size; i ++) {
							// 版本与当前待审批的版本相同才显示  zhj 10.04
							//if (dataHistory[i].ATTR_01 == Ext.getCmp("tf_revision").getValue()) {
								
								var NewRow = tabel_history.insertRow(tabel_history.rows.length);
								//console.log(tabel_history.rows.length);
								NewRow.onclick = function() {
									var index =window.event.srcElement.id;
									var attr01 =lsbb[index].ATTR_01;
									
									Ext.Msg.confirm("提示", "确定要查看版本"+ attr01 +"的详细吗？", function(btn) {
										if (btn == "yes") {
											Ext.getCmp("hf_listTabFlag").setValue("3");
											Ext.getCmp("toCompletedFromPadding").setValue("Y");
											Ext.getCmp("QUOTE_NUMBER1").setValue(QUOTE_NUMBER1);
											var obj_his = {};
											obj_his.obj = objj;
										    obj_his.attr10 = ATTR_10;
											
										    obj_his.version = attr01;
										    obj_his.QUOTE_NUMBER1=QUOTE_NUMBER1;
										    obj_his.method='toQueryHistory';
										   // alert("attr01"+attr01+"QUOTE_NUMBER1"+QUOTE_NUMBER1);
											objj.list_tbj(obj_his ,null, null, null, null, null);
										}
									});
								}
								NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value_one" ><span style="text-decoration: underline;color:blue;" id="'+i+'" >'+ dataHistory[i].ATTR_01 +'</span></td>';
								NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one">'+ dataHistory[i].APPROVED_BY_NAME +'</td>';
								NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">'+ dataHistory[i].APPROVED_OPERATION +'</td>';
								if (dataHistory[i].ATTR_02 != "" && dataHistory[i].ATTR_02 != null) {
									NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one">'+ parseFloat(dataHistory[i].ATTR_02).toFixed(2) +' %</td>';
								} else {
									NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one"></td>';
								}
								if (dataHistory[i].ATTR_09 != "" && dataHistory[i].ATTR_09 != null) {
									NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one">'+ parseFloat(dataHistory[i].ATTR_09).toFixed(2) +'</td>';
								} else {
									NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one"></td>';
								}
								if (dataHistory[i].ATTR_05 != "" && dataHistory[i].ATTR_05 != null) {
									NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value_one">'+ parseFloat(dataHistory[i].ATTR_05).toFixed(2) +'</td>';
								} else {
									NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value_one"></td>';
								}
								NewRow.insertCell(6).innerHTML = '<td class="tbl_nobr_value_one">无差异</td>';
								if (dataHistory[i].SUGGEST_SERVICE_POINT != "" && dataHistory[i].SUGGEST_SERVICE_POINT != null) {
									NewRow.insertCell(7).innerHTML = '<td class="tbl_nobr_value_one">'+ parseFloat(dataHistory[i].SUGGEST_SERVICE_POINT).toFixed(2) +' %</td>';
								} else {
									NewRow.insertCell(7).innerHTML = '<td class="tbl_nobr_value_one"></td>';
								}
								NewRow.insertCell(8).innerHTML = '<td class="tbl_nobr_value_one">'+ dataHistory[i].APPROVED_SUGGESTION +'</td>';
								//NewRow.insertCell(9).innerHTML = '<td class="tbl_nobr_value_one"><span style="text-decoration: underline;color:blue;" id="'+i+'">点击查看</span></td>';
							//}
						}
						
						if (tabel_history.rows.length < 2) {
							var NewRow = tabel_history.insertRow(tabel_history.rows.length);
							NewRow.innerHTML = '<td class="tbl_nobr_value_one" colspan="9">没有记录 ！</td>';
						}
						if (Ext.getCmp('tf_research').getValue() != "" && Ext.getCmp('tf_research').getValue() != null) {
							obj.getApplication().getController('HelcApprove.controller.TBJ.TBJMainOtherCtrl').onResearchTextChange();
						}
						
						
						// 版本对比提示 new
						var param5 = {isLoading: true, method: "toQueryCompare", parameters: [ATTR_10, dataTitle.QUOTE_NUMBER1]};
						if(Ext.getCmp("toCompletedFromPadding").getValue()!="Y")
						objj.connectServer_ws(callBack5, param5);
						function callBack5(result5) {
							//console.log("hehe1"+JSON.stringify(result5));
							if (result5 == null) {
								return ;
							}
							var tabel_history = document.getElementById("tabel_history");
							if (result5.GetCompareData_Output.bHasQuote != "N") {
								var dataCompare = result5.GetCompareData_Output;
//								if (dataCompare.sQuoteRevision == Ext.getCmp("tf_revision").getValue()) {
									var NewRow = tabel_history.insertRow(tabel_history.rows.length);
									//console.log(tabel_history.rows.length);
									NewRow.onclick = function() {
										Ext.Msg.confirm("提示", "确定要查看版本"+ dataCompare.sQuoteRevision +"的详细吗？", function(btn) {
											if (btn == "yes") {
												Ext.getCmp("hf_listTabFlag").setValue("3");
												Ext.getCmp("toCompletedFromPadding").setValue("Y");
												Ext.getCmp("QUOTE_NUMBER1").setValue(QUOTE_NUMBER1);
												var obj_his = {};
												obj_his.obj = objj;
												//obj_his.attr10 = ATTR_10;
												obj_his.attr10 = dataCompare.sCompQuoteId;
												obj_his.version = dataCompare.sQuoteRevision;
										
												obj_his.method='toQueryCompare';
												obj_his.QUOTE_NUMBER1=QUOTE_NUMBER1;
												objj.list_tbj(obj_his ,null, null, null, null, null);
											}
										});
									}
									NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value_one"><span style="text-decoration: underline;color:blue;" id="'+i+'">'+ dataCompare.sQuoteRevision +'</span></td>';
									NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one">'+ dataCompare.sApproverName +'</td>';
									NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">'+ dataCompare.sApproveOperation +'</td>';
									if (dataCompare.sEquDiscount != "" && dataCompare.sEquDiscount != null && dataCompare.sEquDiscount != undefined) {
										NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one">'+ parseFloat(dataCompare.sEquDiscount).toFixed(2) +' %</td>';
									} else {
										NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one">0.00%</td>';
									}
									if (dataCompare.sEquipAppDiscount != "" && dataCompare.sEquipAppDiscount != null && dataCompare.sEquipAppDiscount != undefined) {
										NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one">'+ parseFloat(dataCompare.sEquipAppDiscount).toFixed(2) +'</td>';
									} else {
										NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one">0.00</td>';
									}
									if (dataCompare.sShipAppDiscount != "" && dataCompare.sShipAppDiscount != null && dataCompare.sShipAppDiscount != undefined) {
										NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value_one">'+ parseFloat(dataCompare.sShipAppDiscount).toFixed(2) +'</td>';
									} else {
										NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value_one">0.00</td>';
									}
									if (dataCompare.bPatternSame != null && dataCompare.bPatternSame =='Y') {
										NewRow.insertCell(6).innerHTML = '<td class="tbl_nobr_value_one">有差异</td>';
									} else {
										NewRow.insertCell(6).innerHTML = '<td class="tbl_nobr_value_one">无差异</td>';
									}
									if (dataCompare.sShipAppDiscount != "" && dataCompare.sShipAppDiscount != null && dataCompare.sShipAppDiscount != undefined) {
										NewRow.insertCell(7).innerHTML = '<td class="tbl_nobr_value_one">'+ parseFloat(dataCompare.sSuggestSevPoint).toFixed(2) +' %</td>';
									} else {
										NewRow.insertCell(7).innerHTML = '<td class="tbl_nobr_value_one"></td>';
									}
									NewRow.insertCell(8).innerHTML = '<td class="tbl_nobr_value_one">'+ dataCompare.sApproveSuggestion +'</td>';
									//NewRow.insertCell(9).innerHTML = '<td class="tbl_nobr_value_one"><span style="text-decoration: underline;color:blue;" id="'+i+'">点击查看</span></td>';
//								}
							}
							
							
							// 上环节权限检验结果
							//alert("flag: " + dataTitle.priceRightFlag);
							if (dataTitle.priceRightFlag == "Y") {
//								Ext.getCmp('tf_priceRightFlag').setStyle("background-color:#EE6A50;");
								Ext.getCmp('tf_priceRightFlag').setStyle("background-color:#C1FFC1;");
//								Ext.getCmp('tf_priceRightFlag').setLabelCls("tbj_label_cls_y");
							} else {
//								Ext.getCmp('tf_priceRightFlag').setStyle("background-color:#C1FFC1;");
								Ext.getCmp('tf_priceRightFlag').setStyle("background-color:#EE6A50;");
//								Ext.getCmp('tf_priceRightFlag').setLabelCls("tbj_label_cls_n");
							}
							//Ext.getCmp('tf_priceRightFlag').setValue(dataTitle.priceRightFlag);
							
							//alert("11: " + dataTitle.tpriceRightFlag);
							if (dataTitle.tpriceRightFlag == "Y") {
								Ext.getCmp('tf_tpriceRightFlag').setStyle("background-color:#C1FFC1;");
//								Ext.getCmp('tf_tpriceRightFlag').setLabelCls("tbj_label_cls_y");
							} else {
								Ext.getCmp('tf_tpriceRightFlag').setStyle("background-color:#EE6A50;");
//								Ext.getCmp('tf_tpriceRightFlag').setLabelCls("tbj_label_cls_n");
							}
							//Ext.getCmp('tf_tpriceRightFlag').setValue(dataTitle.tpriceRightFlag);
							
							//alert("22: " + dataTitle.proportionRightFlag);
							if (dataTitle.proportionRightFlag == "Y") {
								Ext.getCmp('tf_proportionRightFlag').setStyle("background-color:#C1FFC1;");
//								Ext.getCmp('tf_proportionRightFlag').setLabelCls("tbj_label_cls_y");
							} else {
								Ext.getCmp('tf_proportionRightFlag').setStyle("background-color:#EE6A50;");
//								Ext.getCmp('tf_proportionRightFlag').setLabelCls("tbj_label_cls_n");
							}
							//Ext.getCmp('tf_proportionRightFlag').setValue(dataTitle.proportionRightFlag);
							
							//alert("33: " + dataTitle.priceRightFlag);
							if (dataTitle.adpriceRightFlag == "Y") {
								
								Ext.getCmp('tf_adpriceRightFlag').setStyle("background-color:#C1FFC1;");
//								Ext.getCmp('tf_adpriceRightFlag').setLabelCls("tbj_label_cls_y");
							} else {
								Ext.getCmp('tf_adpriceRightFlag').setStyle("background-color:#EE6A50;");
//								Ext.getCmp('tf_adpriceRightFlag').setLabelCls("tbj_label_cls_n");
							}
							//Ext.getCmp('tf_adpriceRightFlag').setValue(dataTitle.priceRightFlag);
							
						}
						
						
						
					}

				
				//alert("listTabFlag:" + listTabFlag);
				if (listTabFlag == "2" || listTabFlag == "3") {
					Ext.getCmp('fs_versionCompare').setHidden(true);
					Ext.getCmp('fs_preCheckResult').setHidden(true);
					Ext.getCmp('ctn_userOption').setHidden(true);
					Ext.getCmp('tf_research').setHidden(true);
					Ext.getCmp('tf_feeToAdd').setHidden(true);
					Ext.getCmp('tf_adprice').setHidden(true);
					Ext.getCmp('tf_arate').setHidden(true);
					Ext.getCmp('tf_atprice').setHidden(true);
					Ext.getCmp('tf_atrate').setHidden(true);
					Ext.getCmp('fs_tbjnote').setHidden(true);
				} else {
					Ext.getCmp('fs_versionCompare').setHidden(false);
					Ext.getCmp('fs_preCheckResult').setHidden(false);
					Ext.getCmp('ctn_userOption').setHidden(false);
					Ext.getCmp('tf_research').setHidden(false);
					Ext.getCmp('tf_feeToAdd').setHidden(false);
					Ext.getCmp('tf_adprice').setHidden(false);
					Ext.getCmp('tf_arate').setHidden(false);
					Ext.getCmp('tf_atprice').setHidden(false);
					Ext.getCmp('tf_atrate').setHidden(false);
					Ext.getCmp('fs_tbjnote').setHidden(false);
				}
			}
			
		}
		
	},
	
	toTbjDetailChange : function(obj, value, oldValue, eOpts) {
		var objj = this;
		var hf_isTo2 = Ext.getCmp("hf_isTo2");
		var hf_isTo3 = Ext.getCmp("hf_isTo3");
		
		if (value.id == "pnl_history" && hf_isTo2.getValue() == "N") {
			touchScroll("div_scroll_history");
			var ATTR_10 = Ext.getCmp('hf_attr10').getValue();
			// 加载第三个页签数据（审批历史）
			var paramtbjhistory = {isLoading: true, method: "toQueryTBJHistory", parameters: [ATTR_10]};
			objj.connectServer_ws(callBackth, paramtbjhistory);
			function callBackth(resultth) {
				if (resultth == null) {
					return ;
				}
				var datatbjhistory = resultth.HELHHTBJApproveHistorywsQueryByExample_Output.ListOfHelHhTbjApproveHistoryIo.HelHhTbjApproveHistoryEbc;
				var size = datatbjhistory.length;
				var tbl_tbjHistory = document.getElementById('tbl_tbjHistory');
				for (var i = 0; i < size; i ++) {
					var NewRow = tbl_tbjHistory.insertRow(tbl_tbjHistory.rows.length);
					NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].ATTR_01 +'</td>';
					NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].APPROVED_BY_NAME +'</td>';
					NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].APPROVED_OPERATION +'</td>';
					NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].SERVICE_POINT +'</td>';
					NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].SUGGEST_SERVICE_POINT +'</td>';
					NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].ATTR_06 +'</td>';
					//之前总点数取数取错
					NewRow.insertCell(6).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].ATTR_08 +'</td>';
					NewRow.insertCell(7).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].ATTR_07 +'</td>';
					NewRow.insertCell(8).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].ATTR_03 +'</td>';
					if (datatbjhistory[i].ATTR_02 != '') {
						NewRow.insertCell(9).innerHTML = '<td class="tbl_nobr_value">'+ parseFloat(datatbjhistory[i].ATTR_02).toFixed(2) +'</td>';
					} else {
						NewRow.insertCell(9).innerHTML = '<td class="tbl_nobr_value"></td>';
					}
					NewRow.insertCell(10).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].ATTR_04 +'</td>';
					if (datatbjhistory[i].ATTR_05 != '') {
						NewRow.insertCell(11).innerHTML = '<td class="tbl_nobr_value">'+ parseFloat(datatbjhistory[i].ATTR_05).toFixed(2) +'</td>';
					} else {
						NewRow.insertCell(11).innerHTML = '<td class="tbl_nobr_value"></td>';
					}
					NewRow.insertCell(12).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].APPROVED_SUGGESTION +'</td>';
					NewRow.insertCell(13).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].APPROVED_DATE +'</td>';
				}
                //new
				if (tbl_tbjHistory.rows.length < 2) {
					var NewRow = tbl_tbjHistory.insertRow(tbl_tbjHistory.rows.length);
					NewRow.innerHTML = '<td height="30" align="center" colspan="14">没有记录 ！</td>';
				}
				hf_isTo2.setValue("Y");
			}
			//old
//			if (tbl_tbjHistory.rows.length < 1) {
//				var NewRow = tbl_tbjHistory.insertRow(tbl_tbjHistory.rows.length);
//				NewRow.innerHTML = '<td height="30" align="center" colspan="14">没有记录 ！</td>';
//			}
//			hf_isTo2.setValue("Y");
		} else if (value.id == "pnl_priceDetail" && hf_isTo3.getValue() == "N") {
			touchScroll("div_scroll_priceDetail");
			var ATTR_10 = Ext.getCmp('hf_attr10').getValue();
			var paramPriceDetail = {isLoading: true, method: "toQueryPriceDetailnew", parameters: [loginuser,ATTR_10,'All']}; 
			//价格合计
			objj.connectServer_ws(callBackpd, paramPriceDetail);
			function callBackpd(resultpd) {
				if (resultpd == null) {
					return ;
				}
				var dataPriceDetaill = resultpd.QuoteUnfoQuery_Output.ListOfHelEaiAppQuoteUnformalLine.Quote.ListOfHelQuoteUnformalLine.HelQuoteUnformalLine;
				if(dataPriceDetaill==null){
					var tabl_priceDetail = document.getElementById('tabl_priceDetail');
					var NewRow = tabl_priceDetail.insertRow(tabl_priceDetail.rows.length);
					NewRow.innerHTML = '<td height="30" align="center" colspan="15">没有记录 ！</td>';
					return;
				}
				var dataPriceDetail = [];
				if (JSON.stringify(dataPriceDetaill).indexOf('[') == -1) {
					dataPriceDetail[dataPriceDetail.length] = dataPriceDetaill;
				} else {
					dataPriceDetail = dataPriceDetaill;
				}
				
				var size = dataPriceDetail.length;
				var tabl_priceDetail = document.getElementById('tabl_priceDetail');
				for (var i = 0; i < size; i ++) {
					var NewRow = tabl_priceDetail.insertRow(tabl_priceDetail.rows.length);
					NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].XAttrib01+'</td>';
					//NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value"></td>';
					NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value"><nobr>'+ dataPriceDetail[i].XAttrib02 +'</nobr></td>';
					NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].XAttrib03 +'</td>';
					NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].XAttrib04 +'</td>';
					NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].XAttrib06 +'</td>';
					NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].XAttrib09 +'</td>';
					if (dataPriceDetail[i].XAttrib12 != '') {
						NewRow.insertCell(6).innerHTML = '<td class="tbl_nobr_value">'+ parseFloat(dataPriceDetail[i].XAttrib12).toFixed(2) +'</td>';
					} else {
						NewRow.insertCell(6).innerHTML = '<td class="tbl_nobr_value"></td>';
					}
					NewRow.insertCell(7).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].XAttrib07 +'</td>';
					NewRow.insertCell(8).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].XAttrib10 +'</td>';
					if (dataPriceDetail[i].XAttrib13 != '') {
						NewRow.insertCell(9).innerHTML = '<td class="tbl_nobr_value">'+ parseFloat(dataPriceDetail[i].XAttrib13).toFixed(2) +'</td>';
					} else {
						NewRow.insertCell(9).innerHTML = '<td class="tbl_nobr_value"></td>';
					}
					//NewRow.insertCell(11).innerHTML = '<td class="tbl_nobr_value"></td>';
					NewRow.insertCell(10).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].XAttrib08 +'</td>';
					NewRow.insertCell(11).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].XAttrib11 +'</td>';
					if (dataPriceDetail[i].XAttrib14 != '') {
						NewRow.insertCell(12).innerHTML = '<td class="tbl_nobr_value">'+ parseFloat(dataPriceDetail[i].XAttrib14).toFixed(2) +'</td>';
					} else {
						NewRow.insertCell(12).innerHTML = '<td class="tbl_nobr_value"></td>';
					}
				}
				//new
				if (tabl_priceDetail.rows.length < 2) {
					var NewRow = tabl_priceDetail.insertRow(tabl_priceDetail.rows.length);
					NewRow.innerHTML = '<td height="30" align="center" colspan="15">没有记录 ！</td>';
				}
				hf_isTo3.setValue("Y");
			}
			// 加载第二个页签数据（价格明细）zhj old
			var paramPriceDetail = {isLoading: true, method: "toQueryPriceDetail", parameters: [ATTR_10]};
			objj.connectServer_ws(callBackpd1, paramPriceDetail);
			function callBackpd1(resultpd) {
				if (resultpd == null) {
					return ;
				}
				var dataPriceDetaill = resultpd.HELHHTBJPriceListwsQueryByExample_Output.ListOfHelHhTbjPriceListIo.HelHhTbjPriceListEbc;
				if(dataPriceDetaill==null){
					var tabl_priceDetail = document.getElementById('tabl_priceDetail_mx');
					var NewRow = tabl_priceDetail.insertRow(tabl_priceDetail.rows.length);
					NewRow.innerHTML = '<td height="30" align="center" colspan="15">没有记录 ！</td>';
					return;
				}
				var dataPriceDetail = [];
				if (JSON.stringify(dataPriceDetaill).indexOf('[') == -1) {
					dataPriceDetail[dataPriceDetail.length] = dataPriceDetaill;
				} else {
					dataPriceDetail = dataPriceDetaill;
				}
				
				var size = dataPriceDetail.length;
				var tabl_priceDetail = document.getElementById('tabl_priceDetail_mx');
				for (var i = 0; i < size; i ++) {
					var NewRow = tabl_priceDetail.insertRow(tabl_priceDetail.rows.length);
					NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].ATTR_02 +'</td>';
					NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].QUOTE_ASSET_NUMBER +'</td>';
					NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value"><nobr>'+ dataPriceDetail[i].SMART_PART_NUMBER +'</nobr></td>';
					NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].ATTR_01 +'</td>';
					NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].GGCS_FTTSGD +'</td>';
					NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].FULL_PRICE +'</td>';
					NewRow.insertCell(6).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].EXPECTATION_PRICE +'</td>';
					if (dataPriceDetail[i].HEL_NET_DISC_PERCENT != '') {
						NewRow.insertCell(7).innerHTML = '<td class="tbl_nobr_value">'+ parseFloat(dataPriceDetail[i].HEL_NET_DISC_PERCENT).toFixed(2) +'</td>';
					} else {
						NewRow.insertCell(7).innerHTML = '<td class="tbl_nobr_value"></td>';
					}
					NewRow.insertCell(8).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].SUM_INSTALLING_PRICE +'</td>';
					NewRow.insertCell(9).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].HEL_INSTAL_PRICE_MANUAL +'</td>';
					if (dataPriceDetail[i].HEL_ITEM_INSTALL_PERCENT != '') {
						NewRow.insertCell(10).innerHTML = '<td class="tbl_nobr_value">'+ parseFloat(dataPriceDetail[i].HEL_ITEM_INSTALL_PERCENT).toFixed(2) +'</td>';
					} else {
						NewRow.insertCell(10).innerHTML = '<td class="tbl_nobr_value"></td>';
					}
					NewRow.insertCell(11).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].ATTACH_PRICE +'</td>';
					NewRow.insertCell(12).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].FINAL_SHIPPING_PRICE +'</td>';
					NewRow.insertCell(13).innerHTML = '<td class="tbl_nobr_value">'+ dataPriceDetail[i].HEL_SHIPPING_PRICE_MANUAL +'</td>';
					if (dataPriceDetail[i].ATTR_03 != '') {
						NewRow.insertCell(14).innerHTML = '<td class="tbl_nobr_value">'+ parseFloat(dataPriceDetail[i].ATTR_03).toFixed(2) +'</td>';
					} else {
						NewRow.insertCell(14).innerHTML = '<td class="tbl_nobr_value"></td>';
					}
				}
				//new
				if (tabl_priceDetail.rows.length < 2) {
					var NewRow = tabl_priceDetail.insertRow(tabl_priceDetail.rows.length);
					NewRow.innerHTML = '<td height="30" align="center" colspan="15">没有记录 ！</td>';
				}
				hf_isTo3.setValue("Y");
			}
			//old
//			if (tabl_priceDetail.rows.length < 1) {
//				var NewRow = tabl_priceDetail.insertRow(tabl_priceDetail.rows.length);
//				NewRow.innerHTML = '<td height="30" align="center" colspan="15">没有记录 ！</td>';
//			}
//			hf_isTo3.setValue("Y");
			
			//zhj 
			document.getElementById("mxinfo").style.display='none';
			
			
		}
	},
	
	
});

function nameGpointChange(innobj, flag, objindex) {
	var name_gpoint = document.getElementsByName("name_gpoint");
	var name_acceptedFee = document.getElementsByName("name_acceptedFee");
	var sp_addServiceFee = document.getElementsByName("sp_addServiceFee");
	
	var acceptedFeeSum = 0.00;
	var adspriceSum = 0.00;
	if (isNaN(innobj.value) || innobj.value == "" || innobj.value == null || innobj.value == undefined) {// 非数字
		Ext.Msg.alert('提示', '第'+ (parseInt(objindex) + 1) +'行服务审批信息请填写数字！');
		innobj.value = (parseFloat(name_gpoint[objindex].value) + parseFloat(sp_addServiceFee[objindex].innerHTML)).toFixed(2);
		innobj.focus();
		return ;
	} else {
		if (flag == "ONE") {
		} else if (flag == "TWO") {
		}
		for (var i = 0; i < name_acceptedFee.length; i ++) {
			acceptedFeeSum += parseFloat(name_acceptedFee[i].value);
			name_gpoint[i].value = (parseFloat(name_acceptedFee[i].value) - parseFloat(sp_addServiceFee[i].innerHTML)).toFixed(2);
			adspriceSum += (parseFloat(name_acceptedFee[i].value) - parseFloat(sp_addServiceFee[i].innerHTML));
			name_acceptedFee[i].value = parseFloat(name_acceptedFee[i].value).toFixed(2);
		}
		
		Ext.getCmp("tf_acceptedFeeSum").setValue(acceptedFeeSum.toFixed(2)); // 服务费批复总点数合计
		Ext.getCmp("tf_adsprice").setValue(adspriceSum.toFixed(2)); // TBJ批复合计
		
		var td_ele_jy_rate = document.getElementsByName("td_ele_jy_rate");
		var td_ele_spl_price = document.getElementsByName("td_ele_spl_price");
		var td_ele_expection_price = document.getElementsByName("td_ele_expection_price");
		for (var i = 0; i < td_ele_jy_rate.length; i ++) { //(设备期望价格*（1-服务费批复总点数合计/100）/设备SPL价 - 1) * 100
			td_ele_jy_rate[i].innerHTML = ((parseFloat(td_ele_expection_price[i].innerHTML)*(1-parseFloat(acceptedFeeSum)/100) / parseFloat(td_ele_spl_price[i].innerHTML) - 1)*100).toFixed(2)
		}
		
		
		Ext.getCmp('tf_d_rate2').setValue(((parseFloat(Ext.getCmp('tf_dprice').getValue())*(1-parseFloat(acceptedFeeSum)/100) / parseFloat(Ext.getCmp('tf_dSPL').getValue()) - 1)*100).toFixed(2));
		
	}
}

function isTouchDevice(){
    try{
        document.createEvent("TouchEvent");
        return true;
    }catch(e){
        return false;
    }
}

function touchScroll(id){
	
    if(isTouchDevice()){ //if touch events exist...
        var el=document.getElementById(id);
        var scrollStartPos=0;
        var scrollStartPosY=0;
        
        el.style.width = window.screen.width;
       //el.style.height = window.screen.height;

        el.addEventListener("touchstart", function(event) {
            scrollStartPos=this.scrollLeft + event.touches[0].pageX;
            scrollStartPosY=this.scrollTop + event.touches[0].pageY;
            event.preventDefault();
        },false);

        el.addEventListener("touchmove", function(event) {
            this.scrollLeft = scrollStartPos - event.touches[0].pageX;
            this.scrollTop = scrollStartPosY - event.touches[0].pageY;
            event.preventDefault();
        },false);
        
        var jgmx= document.getElementById("jgmx");
    	jgmx.addEventListener("touchstart",function(event){
    		document.getElementById("mxinfo").style.display='block';
            event.preventDefault();
    	},false);
        
    }
}

// 付款比例的值改变时
function iptPriceProChange(innobj, objindex) {
	if (isNaN(innobj.value) || innobj.value == "" || innobj.value == null || innobj.value == undefined) {// 非数字
		Ext.Msg.alert("提示", "第"+ (parseInt(objindex) + 1) +"行付款比例请填写数字！");
		innobj.value = "";
		innobj.focus();
		return ;
	}
}
