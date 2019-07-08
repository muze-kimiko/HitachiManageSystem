
/* JavaScript content from app/controller/ChaoDianZengFei/CDZFMainCtrl.js in folder common */
var service_recordId = [];
Ext.define("HelcApprove.controller.ChaoDianZengFei.CDZFMainCtrl", {
	extend : "HelcApprove.controller.ApplicationController",
	config : {
		refs : {
		},
		control : {
			"button#btn_cdzflist_back":{
				tap:'btn_cdzflist_back'
			},
			"button#btn_cdzfapprove_back":{
				tap:'btn_cdzfapprove_back'
			},
			"button#btn_cdzf_prepage_approval":{
				tap:'btn_prepage'
			},
			"button#btn_cdzf_nextpage_approval":{
				tap:'btn_nextpage'
			},
			"button#btn_cdzfapprove_agree":{
				tap:'btn_cdzfapprove_agree'
			},
			"button#btn_cdzfapprove_reservations":{
				tap:'btn_cdzfapprove_reservations'
			},
			"button#btn_cdzfapprove_reject":{
				tap:'btn_cdzfapprove_reject'
			},
			
			"list#list_cdzf_approval":{
				itemtap:'list_cdzf'
			},
			"list#list_cdzf_approved":{
				itemtap:'list_cdzf'
			},
			"searchfield#CDZF_ZL_approved":{
				keyup:'CDZF_ZL_approved'
			},
			"searchfield#CDZF_ZL_approved":{
				keyup:'CDZF_ZL_approved'
			},
			//zhj 0225新增两个界面
			"tabpanel#tbj_info" : {
				activeitemchange : 'tbj_info1'
			},
		}
	},
	
	//待审批搜索框
	CDZF_ZL_approved : function(){
		var search_data = [];
		var cs = 0;
		var store = this.getStore('AddServiceApprovedStore','HelcApprove.store.AddService.AddServiceApprovedStore');
		store.setData(approve_data);
		var listArray = store.data.all;
		var search_key = Ext.getCmp('CDZF_ZL_approved').getValue();
		for(var i = 0;i<listArray.length;i++){
			if(listArray[i].data.oPPORTUNITY.indexOf(search_key)!=-1 || listArray[i].data.cONTRACT_ID.indexOf(search_key)!=-1 || listArray[i].data.oPPORTUNITY_ACCOUNT.indexOf(search_key)!=-1 ||
					listArray[i].data.tECH_APPROVER_NAME.indexOf(search_key)!=-1 || listArray[i].data.qUOTE_FINAL_USER.indexOf(search_key)!=-1 || listArray[i].data.oRGANIZATION_OPPTY.indexOf(search_key)!=-1){
				search_data[cs] = listArray[i];
				cs++;
			}
		}
		store.setData(search_data);
	},
	
	btn_cdzflist_back:function(){
		this.showBackView('MainMenu','HelcApprove.view.MainMenu');
		this.getApplication().getController('HelcApprove.controller.MainMenuCtrl').initTBJPaddingCount();
	},
	btn_cdzfapprove_back:function(){
		this.BackView();
	},
	
	modifyAcceptdFee : function(historyadviceFee,historyaddedFee,acceptdFee,feeInput) {
		var obj = this;
	    var tempVal;
	    var sum = 0;
	    if(feeInput.length > 0) {
	        for(var i=0; i<feeInput.length; i++) {
	            tempVal = 0;
	            if(feeInput[i].value != null &&feeInput[i].value != '') {
	                tempVal = feeInput[i].value - historyadviceFee[i].innerHTML - historyaddedFee[i].innerHTML;
	                sum += tempVal;
	                $(acceptdFee[i]).html(obj.changeTwoDecimal(tempVal));
	            } else {
	                $(acceptdFee[i]).html("");
	            }
	        }
	        document.getElementById("div_acceptdFee_input").innerHTML = obj.changeTwoDecimal(sum);
//	        $(acceptdFee[acceptdFee.length - 1]).html(sum+"");
	    }
	    console.log("现批复增加服务费的合计:"+sum);
	},
	
	// 插入操作日志
	OperationHistory : function(recordId,operation,successFlag,op_content){
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
	//同意
	btn_cdzfapprove_agree:function(){
	   var tf_tbjnote_add = Ext.getCmp('tf_tbjnote_add').getValue();
//	   if (tf_tbjnote_add != "" && tf_tbjnote_add != null) {
//		   Ext.Msg.alert("提示", "同意时不能填写审批驳回意见！");
//		   return ;
//	   }
	   var obj = this;
	   var feeInput = document.getElementsByName(addServiceRole+"_input");
	   var appFeeSum = document.getElementsByName("appFeeSum");
	   var valid = true;
	   var errorMsg = "‘同意’操作时，表示同<br/>意确认所申请服务费，如对所<br/>申请服务费有意见时请选择‘拒绝’";
	   console.log("feeInput length :"+feeInput.length);
	   for(var i=0; i<feeInput.length; i++) {
	       if((feeInput[i].value != null && feeInput[i].value != '') && (Number(feeInput[i].value) != Number(appFeeSum[i].innerHTML))) {
	           valid = false;
	           feeInput[i].focus();       
	       } else {
	           feeInput[i].value = appFeeSum[i].innerHTML;
	           $(feeInput[i]).val(appFeeSum[i].innerHTML);
	       }
	   }
	   //TBJ建议服务费(%)
	   var historyadviceFee = document.getElementsByName("adviceFee");
	   //已增加服务费(%)
	   var historyaddedFee = document.getElementsByName("addedFee");
	   //现批复增加服务费
	   var acceptdFee = document.getElementsByName("acceptdFee");
	   this.modifyAcceptdFee(historyadviceFee,historyaddedFee,acceptdFee,feeInput);
	   if(!valid){
		   Ext.Msg.alert('提示',errorMsg);
		   return;
	   }

	   Ext.Msg.confirm("提示", "确定同意审批吗?", function(btn) {
			if (btn == "yes") {
				// 执行数据提交
				var length1 = service_recordId.length;
				var inputArray = document.getElementsByName(addServiceRole+"_input");
			    if(addServiceRole==null||addServiceRole=="")
			    	inputArray = document.getElementsByName("appFeeSum");
				var appFeeSumArray = [];
				
				for(var i=0;i<length1-1;i++){
					var appFeeSumObj = {};
					appFeeSumObj.currentAccept = obj.changeTwoDecimal(parseFloat(inputArray[i].value));
					appFeeSumObj.mainId = Ext.getCmp('CDZF_ARRT_10').getValue();
					appFeeSumObj.refuseComment = tf_tbjnote_add;
					appFeeSumObj.recordId = service_recordId[i+1];
					appFeeSumArray[appFeeSumArray.length] = appFeeSumObj;
				}
				
				// 执行数据提交
				var params = {};
				params.method = 'addServiceToPass';
				params.parameters = [Ext.getCmp('username').getValue(), 
				                     Ext.getCmp('password').getValue(), 
				                     Ext.getCmp('CDZF_ARRT_10').getValue(),
				                     JSON.stringify(appFeeSumArray)];
				obj.connectServer_APPROVE_SP(callBack,params);
				
				function callBack(result) {
					var recordId = Ext.getCmp('CDZF_ARRT_10').getValue();
					console.log("recordId"+recordId);
					if (null == result) {
//						Ext.Msg.alert('提示', '获取失败，请稍后重试！');
//						Ext.Msg.alert('提示','审批成功');
						obj.OperationHistory(recordId,'ADD_SERVICE_POINT_APPROVE_PASS','Y',"审批成功");
						obj.getApplication().getController('MainMenuCtrl').menu_cdzf();
					}else if(result.result == null || result.result == "" || typeof(result.result)=="undefined"){
						obj.OperationHistory(recordId,'ADD_SERVICE_POINT_APPROVE_PASS','Y',"审批成功");
						obj.getApplication().getController('MainMenuCtrl').menu_cdzf();
//						Ext.Msg.alert('提示','审批成功');
					}else{
						obj.OperationHistory(recordId,'ADD_SERVICE_POINT_APPROVE_PASS','N',result.result);
						Ext.Msg.alert('提示',result.result);
					}
				}
			}
		});
	},
	
	//保留意见
	btn_cdzfapprove_reservations:function(){
		var tf_tbjnote_add = Ext.getCmp('tf_tbjnote_add').getValue();
		var obj = this;
		//已有确认书
	    var confirmed = document.getElementById('CDZF_ZL_YYQRS').innerHTML;
	    //已出确认申请点数
	    var confirmedAppRate = document.getElementById('CDZF_ZL_YCQRSDS').innerHTML;
	    //已结算
	    var accountClosed = document.getElementById('CDZF_ZL_YJS').innerHTML;
	    
	   //TBJ建议服务费(%)
	   var historyadviceFee = document.getElementsByName("adviceFee");
	   //已增加服务费(%)
	   var historyaddedFee = document.getElementsByName("addedFee");
	   //现批复增加服务费
	   var acceptdFee = document.getElementsByName("acceptdFee");
	    //服务费批复总点数(TBJ+已增加+现批复)
	   var feeInput = document.getElementsByName(addServiceRole+"_input");
	   var valid = true;
	   var sum = 0;
	   for(var i=0; i<feeInput.length; i++) {
	            if(feeInput[i].value == null || feeInput[i].value =='') {
	                feeInput[i].value = 0.0;
	                $(feeInput[i]).val("0.0");
	            } else {
	                sum += Number(feeInput[i].value);
	            }
	    }
//	    var outputField = checkInputField(false);
//	    $("span[id$='"+outputField+"']").html(sum);
	    
	    //修改现批复增加服务费
	    this.modifyAcceptdFee(historyadviceFee,historyaddedFee,acceptdFee,feeInput);
	    
	    if(confirmed.innerHTML == 'Y' || (confirmedAppRate.innerHTML != null && Number(confirmedAppRate.innerHTML)>0) || (accountClosed.innerHTML != null && accountClosed.innerHTML == 'Y')) {
	        for(var j=0; j<feeInput.length; j++) {
	            if(Number(feeInput[j].value) < Number(historyadviceFee[j].innerHTML) + Number(historyaddedFee[j].innerHTML)) {
	                valid = false;
	                break;
	            }
	        }
	    }
	    if(!valid){
	    	Ext.Msg.alert('提示','无法正常审批,<br/>请联系管理员维护');
			return;
		} 
	    
	    Ext.Msg.confirm("提示", "确定保留意见吗?", function(btn) {
			if (btn == "yes") {
				// 执行数据提交
				var length1 = service_recordId.length;
				var inputArray = document.getElementsByName(addServiceRole+"_input");
				var appFeeSumArray = [];
				
				for(var i=0;i<length1-1;i++){
					var appFeeSumObj = {};
					appFeeSumObj.currentAccept = obj.changeTwoDecimal(parseFloat(inputArray[i].value));
					appFeeSumObj.mainId = Ext.getCmp('CDZF_ARRT_10').getValue();
					appFeeSumObj.refuseComment = tf_tbjnote_add;
					appFeeSumObj.recordId = service_recordId[i+1];
					appFeeSumArray[appFeeSumArray.length] = appFeeSumObj;
				}
				
				var params = {};
				params.method = 'addServiceToProcessReserve';
				params.parameters = [Ext.getCmp('username').getValue(), 
				                     Ext.getCmp('password').getValue(), 
				                     Ext.getCmp('CDZF_ARRT_10').getValue(),
				                     JSON.stringify(appFeeSumArray)];
				obj.connectServer_APPROVE_SP(callBack,params);
				function callBack(result) {
					var recordId = Ext.getCmp('CDZF_ARRT_10').getValue();
					
					if (null == result) {
//						Ext.Msg.alert('提示', '获取失败，请稍后重试！');
//						Ext.Msg.alert('提示','审批成功');
						obj.OperationHistory(recordId,'ADD_SERVICE_POINT_APPROVE_RESERVE','Y',"审批成功");
						obj.getApplication().getController('MainMenuCtrl').menu_cdzf();
					}else if(result.result == null || result.result == "" || typeof(result.result)=="undefined"){
						obj.OperationHistory(recordId,'ADD_SERVICE_POINT_APPROVE_RESERVE','Y',"审批成功");
						obj.getApplication().getController('MainMenuCtrl').menu_cdzf();
//						Ext.Msg.alert('提示','审批成功');
					}else{
						obj.OperationHistory(recordId,'ADD_SERVICE_POINT_APPROVE_RESERVE','N',result.result);
						Ext.Msg.alert('提示',result.result);
					}
				}
			}
		});
	    
		
	},
	
	//拒绝
	btn_cdzfapprove_reject:function(){
		var tf_tbjnote_add = Ext.getCmp('tf_tbjnote_add').getValue();
		/*
		if (tf_tbjnote_add == '' || tf_tbjnote_add == null) {
			Ext.Msg.alert("提示","拒绝时，请填写审批驳回意见！");
			return ;
		}*/
		var obj = this;
		var valid = false;
	    var errorMsg = "拒绝时，请在‘服务费<br/>批复总点数’填写建议点数，或者填写驳回意见！";

	    //服务费批复总点数
	    var feeInput = document.getElementsByName(addServiceRole+"_input");
	   
	    var addRate = document.getElementsByName("addRate");
	   
	    var appFeeSum = document.getElementsByName("appFeeSum");
	   
	    //检查 现申请增加服务费 是否有未填写项
	    for(var i=0; i<feeInput.length; i++) {
	    	if(addRate[i].innerHTML == null || addRate[i].innerHTML == '') {
	    		valid = true;
	    		break;
	    	}
	    }
	    //若没有未填写项目，则比较 服务费申请合计 和 服务费批复总点数
	   var hasDiff = false;
	   var sum = 0;
//	   var outputField = checkInputField(false);
	   if(valid) { //现申请增加服务费有未填项 肯定可以拒绝成功，这里给未填写的 服务费批复总点数 赋默认值
		   for(var i=0; i<feeInput.length; i++) {
			   if(feeInput[i].value == null || feeInput[i].value == '') {
				   $(feeInput[i]).val('0.0');
				   sum += Number(0.0);
			   } else {
				   sum += Number(feeInput[i].value);
			   }
		   }
	     
//		   $("span[id$='"+outputField+"']").html(sum);
		   //TBJ建议服务费(%)
		   var historyadviceFee = document.getElementsByName("adviceFee");;
	       
	       var historyaddedFee = document.getElementsByName("addedFee");
	       //现批复增加服务费
	       var acceptdFee = document.getElementsByName("acceptdFee");
	       //服务费批复总点数(TBJ+已增加+现批复)
	       feeInput = document.getElementsByName(addServiceRole+"_input");
	       //修改现批复增加服务费
	       this.modifyAcceptdFee(historyadviceFee,historyaddedFee,acceptdFee,feeInput);
	       return true;
	  } else { //不一定能提交成功，必须查看是否有填写项目和 服务费申请合计不一样 有则可以提交成功 
	      for(var i=0; i<feeInput.length; i++) {
	          if(feeInput[i].value == null || feeInput[i].value == '') {
	              $(feeInput[i]).val('0.0');
	              sum += Number(0.0);
	          } else if(Number(feeInput[i].value) != Number(appFeeSum[i].innerHTML)) {
	              hasDiff = true;
	              sum += Number(feeInput[i].value);
	          } else {
	              sum += Number(feeInput[i].value);
	          }
	      }
//	      $("span[id$='"+outputField+"']").html(sum);
	      //TBJ建议服务费(%)
	      var historyadviceFee = document.getElementsByName("adviceFee");;
	       
	      var historyaddedFee = document.getElementsByName("addedFee");
	      //现批复增加服务费
	      var acceptdFee = document.getElementsByName("acceptdFee");
	      //服务费批复总点数(TBJ+已增加+现批复)
	      feeInput = document.getElementsByName(addServiceRole+"_input");
	      //修改现批复增加服务费
	      this.modifyAcceptdFee(historyadviceFee,historyaddedFee,acceptdFee,feeInput);
	      
	      if(!hasDiff && (tf_tbjnote_add == null || tf_tbjnote_add == '')) {
	          Ext.Msg.alert('提示',errorMsg);
	          return false;
	      }
	  

	      Ext.Msg.confirm("提示", "确定拒绝审批吗?", function(btn) {
				if (btn == "yes") {
					//执行数据提交
					var length1 = service_recordId.length;
					var inputArray = document.getElementsByName(addServiceRole+"_input");
					if(addServiceRole==null||addServiceRole=="")
				    	inputArray = document.getElementsByName("appFeeSum");
					var appFeeSumArray = [];
					for(var i=0;i<length1-1;i++){
						var appFeeSumObj = {};
						appFeeSumObj.currentAccept = obj.changeTwoDecimal(parseFloat(inputArray[i].value));
						appFeeSumObj.refuseComment = tf_tbjnote_add;
						appFeeSumObj.mainId = Ext.getCmp('CDZF_ARRT_10').getValue();
						appFeeSumObj.recordId = service_recordId[i+1];
						appFeeSumArray[appFeeSumArray.length] = appFeeSumObj;
					}
					
					var params = {};
					params.method = 'addServiceToRefuse';
					params.parameters = [Ext.getCmp('username').getValue(), 
					                     Ext.getCmp('password').getValue(), 
					                     Ext.getCmp('CDZF_ARRT_10').getValue(),
					                     JSON.stringify(appFeeSumArray)];
					obj.connectServer_APPROVE_SP(callBack,params);
					function callBack(result) {
						var recordId = Ext.getCmp('CDZF_ARRT_10').getValue();
						if (null == result) {
//							Ext.Msg.alert('提示', '获取失败，请稍后重试！');
//							Ext.Msg.alert('提示','审批成功');
							obj.OperationHistory(recordId,'ADD_SERVICE_POINT_APPROVE_REFUSE','Y',"审批成功");
							obj.getApplication().getController('MainMenuCtrl').menu_cdzf();
						}else if(result.result == null || result.result == "" || typeof(result.result)=="undefined"){
							obj.OperationHistory(recordId,'ADD_SERVICE_POINT_APPROVE_REFUSE','Y',"审批成功");
							obj.getApplication().getController('MainMenuCtrl').menu_cdzf();
//							Ext.Msg.alert('提示','审批成功');
						}else{
							obj.OperationHistory(recordId,'ADD_SERVICE_POINT_APPROVE_REFUSE','N',result.result);
							Ext.Msg.alert('提示',result.result);
						}
					}
				}
			});
	  }
	},
	
	//增费及超点审批页面页签
	list_cdzf:function(obk, index, target, record, e, eOpts ){
		service_recordId=[];
		var Item_text = Ext.getCmp('CDZF_List').getActiveItem().tab._text;
		var obj = this;
		myLoading.show();
		this.NextView('CDZF_Approve','HelcApprove.view.ChaoDianZengFei.CDZF_Approve');
		//总裁角色或其他角色隐藏‘保留意见’按钮
		if(addServiceRole == "supermo"||addServiceRole==null||addServiceRole==""){
			Ext.getCmp('btn_cdzfapprove_reservations').setHidden(true);
		}
		if(Item_text == "已审批"){
//			Ext.getCmp('CDZF_SCSPLS').setHidden(true);
			Ext.getCmp('CDZF_Idea').setHidden(true);
		}
		var attr_10 = record.data.aTTR_10;
		//设备合同服务费确认书情况
		var getResult=function(res){
//			res = res1.HELHHTBJProdRatewsQueryByExample_Output.ListOfHelHhTbjProdRateIo.HelHhTbjProdRateEbc;
//			var ress = res1.HELHHTBJProdRatewsQueryByExample_Output.ListOfHelHhTbjProdRateIo.HelHhTbjProdRateEbc;
//			var datares = [];
//			if(typeof(res.length)=="undefined"){
//				datares[0] = ress;
//				res = datares;
//			}else{
//				datares = res;
//			}
			
			Ext.getCmp('CDZF_ARRT_10').setValue(attr_10);
			res = res.HELHHTBJApproveMainwsQueryByExample_Output.ListOfHelHhTbjApproveMainIo.HelHhTbjApproveMainEbc;
			var sQuoteId = res.ATTR_10;
			var sQuoteNumber = res.QUOTE_NUMBER1;
			var nVersion = res.ATTR_01;
			var dName = res.ATTR_05;
			var tbjId = res.ATTR_10;
			var contNum = res.CONTRACT_ID;
			var pNum = res.QUOTE_NUMBER1;
			var user = res.QUOTE_FINAL_USER;
			var username = res.OPPORTUNITY_ACCOUNT;
			var usertype = res.OPPORTUNITY_ACCOUNT_TYPE;
			var contType = res.BUSINESS_TYPE;
			var revision = res.ATTR_01;
			var branchEmployee = res.SALES_TEAM;
			var hqEmployee = res.TECH_APPROVER_NAME;
			var largeCustomNum = res.ATTR_12;
			var largeCustomIdentity = res.ATTR_06;
			var dpriceValue = res.EQUIPMENT_FORWARD_PRICE;
			var follow = res.ORGANIZATION_OPPTY;
			var vElevator = res.ELEVATOR_SUM_QUANTITY;
			var sElevator = res.ESCALATOR_SUM_QUANTITY;
			var itmElevator = res.ATTR_02;
			var distDate = res.DELIVERY_CYCLE;
			var pSPL = obj.changeTwoDecimal(res.ENGINEER_PRICE);
			var tSPL = obj.changeTwoDecimal(res.SHIPPING_PRICE);
			
			var dSPL = obj.changeTwoDecimal(res.EQUIPMENT_PRICE);
			var dprice = obj.changeTwoDecimal(res.EQUIPMENT_FORWARD_PRICE);
			Ext.getCmp('dprice').setValue(dprice);
			
			var itm = obj.changeTwoDecimal(res.ITM_SUM_PRICE);
			var pprice = obj.changeTwoDecimal(res.ENGINEER_FORWARD_PRICE);
			var apprice = obj.changeTwoDecimal(res.HEL_TOTAL_ATTACH_PRICE);
			var tprice = obj.changeTwoDecimal(res.SHIPPING_FORWARD_PRICE);
			var sprice = obj.changeTwoDecimal(res.HEAD_PRICE);
			var drate = obj.changeTwoDecimal(res.EQUIPMENT_APPROVE_DISCOUNT);
			var prate = obj.changeTwoDecimal(res.ENGINEER_APPROVE_DISCOUNT);
			var trate = obj.changeTwoDecimal(res.SHIPPING_APPROVE_DISCOUNT);
			var cdprice = obj.changeTwoDecimal(res.HEL_AGENCY_PRICE);
			var chprice = obj.changeTwoDecimal(res.HEL_AGENCY_INSTALL_PRICE);
			var cmprice = obj.changeTwoDecimal(res.THREE_AGREEMENT_PRICE);
			var ctprice	 = obj.changeTwoDecimal(res.ATTR_03);
			var crate = obj.changeTwoDecimal(res.HEL_AGENCY_DISCOUNT);
			var chrate = obj.changeTwoDecimal(res.HEL_AGENCY_INSTAL_PRICE_DIS);
			var cmrate = obj.changeTwoDecimal(res.THREE_AGREEMENT_PRICE_DISCOUNT);
			var ctrate = obj.changeTwoDecimal(res.ATTR_04);
			var asprice = obj.changeTwoDecimal(res.SERVICE_POINT_TOTAL);
			var adsprice = obj.changeTwoDecimal(res.TOTAL_APPROVE_SERVICE_POINT);//ｔｂｊ建议服务费合计adprice
			var adprice = res.EQUIPMENT_APPROVE_DISCOUNT2;
			var tbjnote = res.TBJ_APPROVED_SUGGESTION;
			var atprice = res.ATTR_07;
			var atrate = res.ATTR_08;
			var d_rate = obj.changeTwoDecimal(res.RATE_NOAPP_SERVICES);
			var d_rate2 = obj.changeTwoDecimal(res.DEDUCT_SUGS_POT_EQU_DISCOUNT);
			var arate = res.EQUIPMENT_APPROVE_DISCOUNT2;
			var LargeProjectFlg = res.ATTR_06;
			var atrate = res.ATTR_09;
			var addedFeeSum = 0;			//已增加服务费合计
			var pul_addedFeeSum = 0;
			var acceptedFeeSum = 0;		//服务费批复总点数合计
			//仅调验
			var research = res.ATTR_11;
			if(research != "Y"){
				research = "95";
			}else{
				research = "";	
			}
			var priceRightFlag = res.ATTR_09.split(',')[0];
			var proportionRightFlag = res.ATTR_09.split(',')[1];
			var adpriceRightFlag = res.ATTR_09.split(',')[2];
			var tpriceRightFlag = res.ATTR_09.split(',')[3];
			
			var ebsDevicePrice = obj.changeTwoDecimal(res.ATTR_16);
			var rateA = obj.changeTwoDecimal(res.EQUIPMENT_APPROVE_DISCOUNT);
			var confirmed = res.ATTR_13;
			var confirmedAppRate = obj.changeTwoDecimal(res.ATTR_14);
			var accountClosed = res.ATTR_15;
			
			var pul_responsibility = null;
			var pul_adviceFee = null;
			var pul_addedFee = null;
			var pul_addRate = null;
			var rateA1 = 0;
			var rateA2 = 0;
			var rateA3 = 0;
			
			/*总览*/
			//zhj 02.15
			Ext.getCmp('CDZF_ZL_SJMC').setValue(res.ATTR_05);			//商机名称
			Ext.getCmp('CDZF_ZL_PAY_ACCOUNT').setValue(username);		//买方单位
			Ext.getCmp('CDZF_ZL_USE_ACCOUNT').setValue(user);			//使用单位
			Ext.getCmp('CDZF_ZL_FOLLOW_ACCOUNT').setValue(follow);		//跟单单位
			Ext.getCmp('CDZF_ZL_VERSION').setValue(revision);			//版本号
			Ext.getCmp('CDZF_ZL_DXBBS').setValue(largeCustomIdentity);	//大客户标识
			Ext.getCmp('CDZF_ZL_DKHBH').setValue(largeCustomNum);		//大客户标号
			Ext.getCmp('CDZF_ZL_CONTRACT').setValue(contNum);			//合同号
			Ext.getCmp('CDZF_ZL_HQ_MAN').setValue(hqEmployee);			//总部营业员
			Ext.getCmp('CDZF_ZL_PRICE').setValue(pNum);					//报价号
			
			
			/* 工程费浮率  */
			Ext.getCmp('tf_pSPL_add').setValue(res.ENGINEER_PRICE);					
			Ext.getCmp('tf_pprice_add').setValue(res.ENGINEER_FORWARD_PRICE);					
			if (res.ENGINEER_APPROVE_DISCOUNT != '' && res.ENGINEER_APPROVE_DISCOUNT != null && res.ENGINEER_APPROVE_DISCOUNT != undefined) {
				Ext.getCmp('tf_prate_add').setValue(parseFloat(res.ENGINEER_APPROVE_DISCOUNT).toFixed(2));					
			} else {
				Ext.getCmp('tf_prate_add').setValue("0.00");					
			}
			Ext.getCmp('CDZF_XX_SBSPLJ_ADD').setValue(+obj.changeTwoDecimal(res.EQUIPMENT_PRICE));					
			Ext.getCmp('CDZF_XX_SPQWJ_ADD').setValue(obj.changeTwoDecimal(res.ATTR_16));					
			Ext.getCmp('CDZF_XX_SBFL_ADD').setValue(obj.changeTwoDecimal(res.EQUIPMENT_APPROVE_DISCOUNT));		
			
			
			
			document.getElementById('CDZF_ZL_YYQRS').innerHTML = confirmed;		//已有确认书
			document.getElementById('CDZF_ZL_YCQRSDS').innerHTML = confirmedAppRate;	//已出确认书点数
			document.getElementById('CDZF_ZL_YJS').innerHTML = accountClosed;			//已结算
			
//			if(confirmed == "Y" || accountClosed == "Y"){
//				Ext.Msg.alert("提示","该合同已有确认书/已结算服务费");
//			}
			
			/*TBJ信息*/
			//项目情况
			Ext.getCmp('CDZF_XX_SJMC').setValue(res.ATTR_05);					//商机名称
			Ext.getCmp('CDZF_XX_SYDW').setValue(res.QUOTE_FINAL_USER);			//使用单位
			Ext.getCmp('CDZF_XX_MFDW').setValue(res.OPPORTUNITY_ACCOUNT);		//买方单位
			Ext.getCmp('CDZF_XX_KHLX').setValue(res.OPPORTUNITY_ACCOUNT_TYPE);	//客户类型
			Ext.getCmp('CDZF_XX_HTH').setValue(res.CONTRACT_ID);				//合同号
			Ext.getCmp('CDZF_XX_HTLX').setValue(res.BUSINESS_TYPE);				//合同类型
			Ext.getCmp('CDZF_XX_BJH').setValue(res.QUOTE_NUMBER1);				//报价号
			Ext.getCmp('CDZF_XX_ZTTL').setValue(res.ELEVATOR_SUM_QUANTITY);		//直梯台量
			Ext.getCmp('CDZF_XX_DQBB').setValue(res.ATTR_01);					//当前版本
			Ext.getCmp('CDZF_XX_FTTL').setValue(res.ESCALATOR_SUM_QUANTITY);	//扶梯台量
			Ext.getCmp('CDZF_XX_ITMTL').setValue(res.ITM_SUM_PRICE);			//ITM台量
			Ext.getCmp('CDZF_XX_FGSYYY').setValue(res.SALES_TEAM);				//分公司营业员
			Ext.getCmp('CDZF_XX_ZBYYY').setValue(hqEmployee);				//总部营业员
			Ext.getCmp('CDZF_XX_ZBQ').setValue(res.GUARANTEE_QUALITY_MONTHS);	//质保期
			Ext.getCmp('CDZF_XX_GDZZ').setValue(res.ORGANIZATION_OPPTY);		//跟单组织
			Ext.getCmp('CDZF_XX_DXMBJ').setValue(res.ATTR_11);					//大项目标记
			//申请价格整体情况
			Ext.getCmp('CDZF_XX_SBSPLJ').setValue('￥'+obj.changeTwoDecimal(res.EQUIPMENT_PRICE));			//设备SPL价
			Ext.getCmp('CDZF_XX_SPL').setValue(obj.changeTwoDecimal(res.EQUIPMENT_PRICE));			//设备SPL价
			Ext.getCmp('CDZF_XX_SPQWJ').setValue('￥'+obj.changeTwoDecimal(res.ATTR_16));					//设备期望价
			Ext.getCmp('CDZF_XX_SBFL').setValue(obj.changeTwoDecimal(res.EQUIPMENT_APPROVE_DISCOUNT)+'%');//设备浮率
			Ext.getCmp('CDZF_XX_GCSPLJ').setValue('￥'+obj.changeTwoDecimal(res.ENGINEER_PRICE));			//工程SPL价
			Ext.getCmp('CDZF_XX_GCQWJ').setValue('￥'+obj.changeTwoDecimal(res.ENGINEER_FORWARD_PRICE));	//工程期望价
			Ext.getCmp('CDZF_XX_GCFL').setValue(obj.changeTwoDecimal(res.ENGINEER_APPROVE_DISCOUNT)+'%'); //工程浮率
			Ext.getCmp('CDZF_XX_YSSPLJ').setValue('￥'+obj.changeTwoDecimal(res.SHIPPING_PRICE));			//运输SPL价
			Ext.getCmp('CDZF_XX_YSQWJ').setValue('￥'+obj.changeTwoDecimal(res.SHIPPING_FORWARD_PRICE));	//运输期望价
			Ext.getCmp('CDZF_XX_YSFL').setValue(obj.changeTwoDecimal(res.SHIPPING_APPROVE_DISCOUNT)+'%');	//运输浮率
			Ext.getCmp('CDZF_XX_ITMSBJG').setValue('￥'+obj.changeTwoDecimal(res.ITM_SUM_PRICE));			//ITM设备价格
			Ext.getCmp('CDZF_XX_QWCJZJ').setValue('￥'+obj.changeTwoDecimal(res.HEAD_PRICE));				//期望成交总价
			Ext.getCmp('CDZF_XX_FJGCF').setValue('￥'+obj.changeTwoDecimal(res.HEL_TOTAL_ATTACH_PRICE));	//附加工程费
			//买断合同价格情况
			Ext.getCmp('CDZF_XX_JXSKHSBJG').setValue('￥'+obj.changeTwoDecimal(res.cdprice));	//经销商&客户设备价格
			Ext.getCmp('CDZF_XX_JXSKHSBFL').setValue(obj.changeTwoDecimal(res.chprice)+'%');	//经销商&客户设备浮率
			Ext.getCmp('CDZF_XX_JXSKHAZJG').setValue('￥'+obj.changeTwoDecimal(res.ctprice));	//经销商&客户安装价格
			Ext.getCmp('CDZF_XX_JXSKHAZFL').setValue(obj.changeTwoDecimal(res.cmprice)+'%');	//经销商&客户安装浮率
			Ext.getCmp('CDZF_XX_JXSKHYSJG').setValue('￥'+obj.changeTwoDecimal(res.crate));	//经销商&客户运输价格
			Ext.getCmp('CDZF_XX_JXSKHYSFL').setValue(obj.changeTwoDecimal(res.chate)+'%');	//经销商&客户运输浮率
			Ext.getCmp('CDZF_XX_YXSKHSBJG').setValue('￥'+obj.changeTwoDecimal(res.ctate));	//营销司&客户设备价格
			Ext.getCmp('CDZF_XX_YXSKHSBFL').setValue(obj.changeTwoDecimal(res.cmate)+'%');	//营销司&客户设备浮率
			//价格审批信息
			Ext.getCmp('CDZF_TBJXX_asprice').setValue(obj.changeTwoDecimal(asprice)+'%');			//服务费申请合计（TBJ）
			Ext.getCmp('CDZF_TBJXX_d_rate').setValue(obj.changeTwoDecimal(d_rate)+'%');			//设备浮率（含申请服务费）
			Ext.getCmp('CDZF_TBJXX_addedFeeSum').setValue(obj.changeTwoDecimal(addedFeeSum)+'%');		//历史增费合计
			Ext.getCmp('CDZF_TBJXX_d_rate2').setValue(obj.changeTwoDecimal(d_rate2)+'%');			//设备浮率（含总批复服务费）
//			Ext.getCmp('CDZF_TBJXX_acceptedFeeSum').setValue(obj.changeTwoDecimal(acceptedFeeSum)+'%');	//服务费批复总点数合计
			Ext.getCmp('CDZF_TBJXX_adsprice').setValue(obj.changeTwoDecimal(adsprice)+'%');		//TBJ批复合计
			
			var getResult_Fee=function(res1){
				var res = res1.HELHHTBJServiceFeewsQueryByExample_Output.ListOfHelHhTbjServiceFeeIo.HelHhTbjServiceFeeEbc;
				var ress = res1.HELHHTBJServiceFeewsQueryByExample_Output.ListOfHelHhTbjServiceFeeIo.HelHhTbjServiceFeeEbc;
				var datares = [];
				if(typeof(res.length)=="undefined"){
					datares[0] = ress;
					res = datares;
				}else{
					datares = res;
				}
				var length = res.length;
				var table = document.getElementById('CDZF_ZL_FWFLSJSQ');
				var table1 = document.getElementById('CDZF_ZL_FWFPF');
				var table2 = document.getElementById('CDZF_ZL_SCSPLS');
				var table3 = document.getElementById('CDZF_TBJXX_FWFSPXX');
				var table_ZL_TZFL = document.getElementById('CDZF_ZL_TZFL');
				var table_ZL_SBFL = document.getElementById('CDZF_ZL_SBFL');
				var table_TBJXX_TZFL = document.getElementById('CDZF_TBJXX_TZFL');
				var table_TBJXX_FKBL = document.getElementById('CDZF_TBJXX_FKBL');
				
				var adviceFeeSum = 0;				//TBJ修复服务费总计
				var tbjsq=0;
				var addedFeeSum = 0;					//已添加服务费总计
				var addRateSum = 0;					//现申请添加服务费比例总计
				var appAddFeeSum = 0;				//现申请添加服务费金额总计
				var appFeeSumSum = 0;				//申请服务费总计
				var appFeeSumArray = [];				
				//服务费历史及申请
				for(var i=0;i<=length;i++){
					if(i==length){
						//总览
						var NewRow = table.insertRow(table.rows.length);
						NewRow.insertCell(0).innerHTML = '<td height="30">总计:</td>';
						NewRow.insertCell(1).innerHTML = '<td height="30"><div name="fwfls_zj" align="center">'+obj.changeTwoDecimal(tbjsq)+'</div></td>';
						NewRow.insertCell(2).innerHTML = '<td height="30"><div name="fwfls_zj" align="center">'+obj.changeTwoDecimal(adviceFeeSum)+'</div></td>';
						NewRow.insertCell(3).innerHTML = '<td height="30"><div name="fwfls_zj" align="center">'+obj.changeTwoDecimal(addedFeeSum)+'</div></td>';
						NewRow.insertCell(4).innerHTML = '<td height="30" bgcolor="#FFFF00"><div  name="fwfls_zj" style="background-color:#FFFF00" align="center">'+obj.changeTwoDecimal(addRateSum)+'</div></td>';
						NewRow.insertCell(5).innerHTML = '<td height="30"><div name="fwfls_zj" align="center">'+'￥'+obj.changeTwoDecimal(appAddFeeSum)+'</div></td>';
						//新增逻辑
						if(appFeeSumSum>tbjsq){
						NewRow.insertCell(6).innerHTML = '<td height="30"><div name="fwfls_zj" align="center" style="background-color:#8080ff">'+obj.changeTwoDecimal(appFeeSumSum)+'</div></td>';
						}else{
						NewRow.insertCell(6).innerHTML = '<td height="30"><div name="fwfls_zj" align="center">'+obj.changeTwoDecimal(appFeeSumSum)+'</div></td>';
						}
						NewRow.insertCell(7).innerHTML = '<td height="30"><div align="center"></div></td>';
						pul_responsibility = obj.changeTwoDecimal(appFeeSumSum)//申请服务费合计
						pul_adviceFee = obj.changeTwoDecimal(adviceFeeSum);
						pul_addedFee = obj.changeTwoDecimal(addedFeeSum);
						pul_addRate = obj.changeTwoDecimal(addRateSum);
						
						//设备浮率下的：设备浮率（含总批费） = 总设备期望价dprice（1-服务费批复总点数appFeeSumSum）/总SPL价dSPL -1
						rateA1 = parseFloat(dprice)*(1-parseFloat(appFeeSumSum)/100)/parseFloat(dSPL)-1;
						rateA1 = obj.round_2(rateA1*100,2);
						//(设备期望价*(1-TBJ-已增加服务费)/设备SPL价 -1)
						rateA2 = parseFloat(dprice)*(1-parseFloat(adviceFeeSum)/100-parseFloat(addedFeeSum)/100)/dSPL-1;
						rateA2 = obj.round_2(rateA2*100,2);
						//(设备期望价*(1-TBJ-已增加服务费-现申请增加服务费比例)/设备SPL价 - 1)
						rateA3 =  parseFloat(dprice)*(1-parseFloat(adviceFeeSum)/100-parseFloat(addedFeeSum)/100-parseFloat(addRateSum)/100)/dSPL-1;
						rateA3 = obj.round_2(rateA3*100,2);
						Ext.getCmp('CDZF_TBJXX_acceptedFeeSum').setValue(obj.changeTwoDecimal(pul_adviceFee)+'%');		//历史增费合计
						
						//7.31 zhj
						
						if(addServiceRole.indexOf('financeConductor')!=-1||addServiceRole.indexOf('supermo')!=-1){
						if(addRateSum==0){
							if(confirmed == "Y" || accountClosed == "Y"){
							Ext.Msg.alert('提示','本次流程为<font color="red">超点</font>审批申请<br>合计申请服务费为:'+obj.changeTwoDecimal(appFeeSumSum)+'%<br>该合同已有确认书/已结算服务费');
							}else{
							Ext.Msg.alert('提示','本次流程为<font color="red">超点</font>审批申请<br>合计申请服务费为:'+obj.changeTwoDecimal(appFeeSumSum)+'%');	
							}
							}else{
								if(confirmed == "Y" || accountClosed == "Y"){	
							Ext.Msg.alert('提示','本次流程为<font color="red">增费</font>审批申请<br>原TBJ批复服务费为:'+obj.changeTwoDecimal(adviceFeeSum)+'%<br>本次增加服务费:'+obj.changeTwoDecimal(addRateSum)+'%<br>合计申请服务费:'+obj.changeTwoDecimal(appFeeSumSum)+'%<br>该合同已有确认书/已结算服务费');
								}else{
									Ext.Msg.alert('提示','本次流程为<font color="red">增费</font>审批申请<br>原TBJ批复服务费为:'+obj.changeTwoDecimal(adviceFeeSum)+'%<br>本次增加服务费:'+obj.changeTwoDecimal(addRateSum)+'%<br>合计申请服务费:'+obj.changeTwoDecimal(appFeeSumSum)+'%');	
								}
									
								}
															
						
						}else{
							if(confirmed == "Y" || accountClosed == "Y"){
								Ext.Msg.alert("提示","该合同已有确认书/已结算服务费");
							}
							
						}
						
					}else{
						//总览
						var dept = res[i].AGENT_NAME;
						var adviceFee = obj.changeTwoDecimal(res[i].APPROVE_SERVICE_POINT);
						adviceFeeSum = parseFloat(adviceFeeSum) + parseFloat(adviceFee);				    
						var addedFee = obj.changeTwoDecimal(res[i].ATTR_01);
						addedFeeSum = parseFloat(addedFeeSum) + parseFloat(addedFee);
						var addRate = obj.changeTwoDecimal(res[i].ATTR_02);
						addRateSum = parseFloat(addRateSum) + parseFloat(addRate);
						var appAddFee = obj.changeTwoDecimal((obj.changeTwoDecimal(res[i].ATTR_02)/100)*dpriceValue);
						appAddFeeSum = parseFloat(appAddFeeSum) + parseFloat(appAddFee);
						var appFeeSum = obj.changeTwoDecimal(parseFloat(adviceFee) + parseFloat(addedFee) + parseFloat(addRate));
						appFeeSumSum = parseFloat(appFeeSumSum) + parseFloat(appFeeSum);
						var addFeeComment = res[i].ATTR_03;
						//TBJ申请
						var rpoint = obj.changeTwoDecimal(res[i].SERVICE_POINT);
						tbjsq=parseFloat(tbjsq) + parseFloat(rpoint);
						
						var NewRow = table.insertRow(table.rows.length);
						NewRow.insertCell(0).innerHTML = '<td height="30">'+dept+'</td>';
						NewRow.insertCell(1).innerHTML = '<td height="30"><div name="tbjsq" align="center">'+rpoint+'</div></td>';
						NewRow.insertCell(2).innerHTML = '<td height="30"><div name="adviceFee" align="center">'+adviceFee+'</div></td>';
						NewRow.insertCell(3).innerHTML = '<td height="30"><div name="addedFee" align="center">'+addedFee+'</div></td>';
						NewRow.insertCell(4).innerHTML = '<td height="30" bgcolor="#FFFF00"><div style="background-color:#FFFF00" name="addRate" align="center">'+addRate+'</div></td>';
						NewRow.insertCell(5).innerHTML = '<td height="30"><div align="center">'+'￥'+appAddFee+'</div></td>';
						//新增逻辑
						
						if(parseFloat(appFeeSum)>parseFloat(rpoint)){
						NewRow.insertCell(6).innerHTML = '<td height="30"><div name="appFeeSum" align="center" style="background-color:#8080ff">'+appFeeSum+'</div></td>';
						}else{	
						NewRow.insertCell(6).innerHTML = '<td height="30"><div name="appFeeSum" align="center">'+appFeeSum+'</div></td>';	
						}
						NewRow.insertCell(7).innerHTML = '<td height="30"><div align="center">'+addFeeComment+'</div></td>';
						
						
						//TBJ信息
						var recordId = res[i].ATTR_10;
//						var rpoint = obj.changeTwoDecimal(res[i].SERVICE_POINT);
						var rdetail = "";
						var gdetail = res[i].APPROVE_COMMENT;
						var acceptedFee = obj.changeTwoDecimal(res[i].APPROVE_SERVICE_POINT);
						acceptedFeeSum = parseFloat(acceptedFeeSum) + parseFloat(acceptedFee);
						var gpoint = parseFloat(acceptedFee) - parseFloat(addedFee);
						var feeApplySum = parseFloat(rpoint) + parseFloat(addedFee);
						
						var NewRow = table3.insertRow(table3.rows.length);
						NewRow.insertCell(0).innerHTML = '<td height="30">'+dept+'</td>';
						NewRow.insertCell(1).innerHTML = '<td height="30"><div name="historyadviceFee" align="center">'+rpoint+'</div></td>';
						NewRow.insertCell(2).innerHTML = '<td height="30"><div name="historyaddedFee" align="center">'+obj.changeTwoDecimal(gpoint)+'</div></td>';
						NewRow.insertCell(3).innerHTML = '<td height="30"><div align="center">'+addedFee+'</div></td>';
						NewRow.insertCell(4).innerHTML = '<td height="30"><div align="center">'+obj.changeTwoDecimal(feeApplySum)+'</div></td>';
						NewRow.insertCell(5).innerHTML = '<td height="30"><div align="center">'+acceptedFee+'</div></td>';
						NewRow.insertCell(6).innerHTML = '<td height="30"><div align="center">'+gdetail+'</div></td>';
						
						var appFeeSumObj = {};
						appFeeSumObj.currentAccept = appFeeSum;
						appFeeSumObj.recordId = recordId;
						appFeeSumArray[appFeeSumArray.length] = appFeeSumObj;
						service_recordId[appFeeSumArray.length] = recordId;
						
						
					}
					Ext.getCmp('cdzf_appFeeSumArray').setValue(JSON.stringify(appFeeSumArray));
					
				}

				
				
				var acceptdFeeSum = 0;
				var areaPointSum = 0;
				var saleMinisterSum = 0;
				var saleConductorSum = 0;
				var financeConductorSum = 0;
				var vicePresidentSum=0;
				var supermoSum = 0;
				//服务费批复
				for(var i=0;i<=length;i++){
					if(i==length){
						var NewRow = table1.insertRow(table1.rows.length);
						NewRow.insertCell(0).innerHTML = '<td height="30">总计:</td>';
						NewRow.insertCell(1).innerHTML = '<td height="30"><div id="div_acceptdFee_input" align="center" style="color:blue"><b>'+obj.changeTwoDecimal(acceptdFeeSum)+'</b></div></td>';
						NewRow.insertCell(2).innerHTML = '<td height="30"><div id="div_saleMinister_input" align="center">'+obj.changeTwoDecimal(saleMinisterSum)+'</div></td>';
						NewRow.insertCell(3).innerHTML = '<td height="30"><div id="div_saleConductor_input" align="center">'+obj.changeTwoDecimal(saleConductorSum)+'</div></td>';
						NewRow.insertCell(4).innerHTML = '<td height="30"><div id="div_vicePresidentSum_input" align="center">'+obj.changeTwoDecimal(vicePresidentSum)+'</div></td>';
						NewRow.insertCell(5).innerHTML = '<td height="30"><div id="div_financeConductor_input" align="center">'+obj.changeTwoDecimal(financeConductorSum)+'</div></td>';
						NewRow.insertCell(6).innerHTML = '<td height="30"><div id="div_supermo_input" align="center">'+obj.changeTwoDecimal(supermoSum)+'</div></td>';
						
						//zhj 
						var NewRow = table1.insertRow(table1.rows.length);
						NewRow.insertCell(0).colspan=2;
						NewRow.insertCell(0).innerHTML = '<td height="30" >审批操作:</td>';	
						NewRow.insertCell(2).innerHTML = '<td height="30"><div  align="center">'+res[0].APPRV_OP2+'</div></td>';
						NewRow.insertCell(3).innerHTML = '<td height="30"><div  align="center">'+res[0].APPRV_OP3+'</div></td>';
						NewRow.insertCell(4).innerHTML = '<td height="30"><div  align="center">'+res[0].APPRV_OP6+'</div></td>';
						NewRow.insertCell(5).innerHTML = '<td height="30"><div  align="center">'+res[0].APPRV_OP4+'</div></td>';
						NewRow.insertCell(6).innerHTML = '<td height="30"><div  align="center">'+res[0].APPRV_OP5+'</div></td>';
					
						
						Ext.getCmp('CDZF_TBJXX_addedFeeSum').setValue(obj.changeTwoDecimal(pul_addedFeeSum)+'%');		//历史增费合计
					}else{
						var areaPoint = res[i].ATTR_04;
						var saleMinister = obj.changeTwoDecimal(res[i].ATTR_05); 
						var saleConductor = obj.changeTwoDecimal(res[i].ATTR_06); 
						var financeConductor = obj.changeTwoDecimal(res[i].ATTR_07); 
						var supermo = obj.changeTwoDecimal(res[i].ATTR_08); 
						// 1.20
						var vicePresident=obj.changeTwoDecimal(res[i].APPROVE_ADD_PT6); 
						
//						var appFeeSum = obj.changeTwoDecimal(res[i].ATTR_02)*dpriceValue;//申请服务费合计
						
						var appFeeSum = parseFloat(obj.changeTwoDecimal(res[i].ATTR_01)) + parseFloat(obj.changeTwoDecimal(res[i].ATTR_02)) + parseFloat(obj.changeTwoDecimal(res[i].APPROVE_SERVICE_POINT));
						var adviceFee = obj.changeTwoDecimal(res[i].APPROVE_SERVICE_POINT);//TBJ
						var addedFee = obj.changeTwoDecimal(res[i].ATTR_01);//已增加
						pul_addedFeeSum = parseFloat(obj.changeTwoDecimal(pul_addedFeeSum)) + parseFloat(obj.changeTwoDecimal(addedFee));
						var responsibility = appFeeSum;
//						pul_responsibility = responsibility;
						var currentAccept = appFeeSum;
						var acceptdFee = obj.changeTwoDecimal(parseFloat(responsibility) - parseFloat(adviceFee) - parseFloat(addedFee));
						//新增修改
						var tbjService = table.rows[i+2].cells[2].innerText;		//TBJ批复服务费
						var addService = table.rows[i+2].cells[3].innerText;		//已增加服务费
						
						var input_value = obj.changeTwoDecimal(parseFloat(tbjService) + parseFloat(addService) +parseFloat(acceptdFee));
						
						acceptdFeeSum = parseFloat(acceptdFeeSum) + parseFloat(acceptdFee);
		                areaPointSum = parseFloat(areaPointSum) + parseFloat(areaPoint);
		                
		                //计算服务费审批总点数总计
		                if(addServiceRole == "saleMinister"){
		                	saleMinisterSum = parseFloat(saleMinisterSum) + parseFloat(input_value);
		                }else{
		                	saleMinisterSum = parseFloat(saleMinisterSum) + parseFloat(saleMinister);
		                }
		                if(addServiceRole == "saleConductor"){
		                	saleConductorSum = parseFloat(saleConductorSum) + parseFloat(input_value);
		                }else{
		                	saleConductorSum = parseFloat(saleConductorSum) + parseFloat(saleConductor);
		                }
		                if(addServiceRole == "financeConductor"){
		                	financeConductorSum = parseFloat(financeConductorSum) + parseFloat(input_value);
		                }else{
		                	financeConductorSum = parseFloat(financeConductorSum) + parseFloat(financeConductor);
		                }
		                if(addServiceRole == "supermo"){
		                	supermoSum = parseFloat(supermoSum) + parseFloat(input_value);
		                	
		                }else{
		                	supermoSum = parseFloat(supermoSum) + parseFloat(supermo);
		                }
		                //zhj 1.20
		                if(addServiceRole == "vicePresident"){
		                	vicePresidentSum = parseFloat(vicePresidentSum) + parseFloat(input_value);
		                }else{
		                	
		                	vicePresidentSum = parseFloat(vicePresidentSum) + parseFloat(vicePresident);
		                }
		              
		                
						var NewRow = table1.insertRow(table1.rows.length);
						
						if(addServiceRole == "saleMinister"){
							NewRow.insertCell(0).innerHTML = '<td height="30">'+res[i].AGENT_NAME+'</td>';
							NewRow.insertCell(1).innerHTML = '<td height="30"><div name="acceptdFee" align="center" style="color:blue"><b>'+acceptdFee+'</b></div></td>';
							NewRow.insertCell(2).innerHTML = '<td height="30"><div align="center">       <input name="saleMinister_input" onchange="input_change(this,\'saleMinister_input\','+i+')" type="text" style="background-color:#FFFF00;height:35px;width:60px" value="'+input_value+'	"/>     </div></td>';
							NewRow.insertCell(3).innerHTML = '<td height="30"><div align="center">'+saleConductor+'</div></td>';
							
							NewRow.insertCell(4).innerHTML = '<td height="30"><div align="center">'+vicePresident+'</div></td>';
							NewRow.insertCell(5).innerHTML = '<td height="30"><div align="center">'+financeConductor+'</div></td>';
							NewRow.insertCell(6).innerHTML = '<td height="30"><div align="center">'+supermo+'</div></td>';
						}else if(addServiceRole == "saleConductor"){
							NewRow.insertCell(0).innerHTML = '<td height="30">'+res[i].AGENT_NAME+'</td>';
							NewRow.insertCell(1).innerHTML = '<td height="30"><div name="acceptdFee" align="center" style="color:blue"><b>'+acceptdFee+'</b></div></td>';
							NewRow.insertCell(2).innerHTML = '<td height="30"><div align="center">'+saleMinister+'</div></td>';
							NewRow.insertCell(3).innerHTML = '<td height="30"><div align="center">       <input name="saleConductor_input"  onchange="input_change(this,\'saleConductor_input\','+i+')" type="text" style="background-color:#FFFF00;height:35px;width:60px" value="'+input_value+'	"/>     </div></td>';
							NewRow.insertCell(4).innerHTML = '<td height="30"><div align="center">'+vicePresident+'</div></td>';
							NewRow.insertCell(5).innerHTML = '<td height="30"><div align="center">'+financeConductor+'</div></td>';
							NewRow.insertCell(6).innerHTML = '<td height="30"><div align="center">'+supermo+'</div></td>';
						}else if(addServiceRole == "financeConductor"){
							NewRow.insertCell(0).innerHTML = '<td height="30">'+res[i].AGENT_NAME+'</td>';
							NewRow.insertCell(1).innerHTML = '<td height="30"><div name="acceptdFee" align="center" style="color:blue"><b>'+acceptdFee+'</b></div></td>';
							NewRow.insertCell(2).innerHTML = '<td height="30"><div align="center">'+saleMinister+'</div></td>';
							NewRow.insertCell(3).innerHTML = '<td height="30"><div align="center">'+saleConductor+'</div></td>';
							NewRow.insertCell(4).innerHTML = '<td height="30"><div align="center">'+vicePresident+'</div></td>';
							NewRow.insertCell(5).innerHTML = '<td height="30"><div align="center">       <input name="financeConductor_input"  onchange="input_change(this,\'financeConductor_input\','+i+')" type="text" style="background-color:#FFFF00;height:35px;width:60px" value="'+input_value+'	"/>     </div></td>';
							NewRow.insertCell(6).innerHTML = '<td height="30"><div align="center">'+supermo+'</div></td>';
						}else if(addServiceRole == "supermo"){
							NewRow.insertCell(0).innerHTML = '<td height="30">'+res[i].AGENT_NAME+'</td>';
							NewRow.insertCell(1).innerHTML = '<td height="30"><div name="acceptdFee" align="center" style="color:blue"><b>'+acceptdFee+'</b></div></td>';
							NewRow.insertCell(2).innerHTML = '<td height="30"><div align="center">'+saleMinister+'</div></td>';
							NewRow.insertCell(3).innerHTML = '<td height="30"><div align="center">'+saleConductor+'</div></td>';
							NewRow.insertCell(4).innerHTML = '<td height="30"><div align="center">'+vicePresident+'</div></td>';
							NewRow.insertCell(5).innerHTML = '<td height="30"><div align="center">'+financeConductor+'</div></td>';
							NewRow.insertCell(6).innerHTML = '<td height="30"><div align="center">       <input name="supermo_input" onchange="input_change(this,\'supermo_input\','+i+')" type="text" style="background-color:#FFFF00;height:35px;width:60px" value="'+input_value+'	"/>     </div></td>';
						//zhj 
						}else if(addServiceRole == "vicePresident"){
							NewRow.insertCell(0).innerHTML = '<td height="30">'+res[i].AGENT_NAME+'</td>';
							NewRow.insertCell(1).innerHTML = '<td height="30"><div name="acceptdFee" align="center" style="color:blue"><b>'+acceptdFee+'</b></div></td>';
							NewRow.insertCell(2).innerHTML = '<td height="30"><div align="center">'+saleMinister+'</div></td>';
							NewRow.insertCell(3).innerHTML = '<td height="30"><div align="center">'+saleConductor+'</div></td>';
							NewRow.insertCell(4).innerHTML = '<td height="30"><div align="center">       <input name="vicePresident_input" onchange="input_change(this,\'vicePresident_input\','+i+')" type="text" style="background-color:#FFFF00;height:35px;width:60px" value="'+input_value+'	"/>     </div></td>';
							NewRow.insertCell(5).innerHTML = '<td height="30"><div align="center">'+financeConductor+'</div></td>';
							NewRow.insertCell(6).innerHTML = '<td height="30"><div align="center">'+supermo+'</div></td>';
 
						}else{
							NewRow.insertCell(0).innerHTML = '<td height="30">'+res[i].AGENT_NAME+'</td>';
							NewRow.insertCell(1).innerHTML = '<td height="30"><div name="acceptdFee" align="center" style="color:blue"><b>'+acceptdFee+'</b></div></td>';
							NewRow.insertCell(2).innerHTML = '<td height="30"><div align="center">'+saleMinister+'</div></td>';
							NewRow.insertCell(3).innerHTML = '<td height="30"><div align="center">'+saleConductor+'</div></td>';
							NewRow.insertCell(4).innerHTML = '<td height="30"><div align="center">'+vicePresident+'</div></td>';
							NewRow.insertCell(5).innerHTML = '<td height="30"><div align="center">'+financeConductor+'</div></td>';
							NewRow.insertCell(6).innerHTML = '<td height="30"><div align="center">'+supermo+'</div></td>';
						}
					}
					
				}
				
				
				var SPLS_acceptdFeeSum = 0;
				var SPLS_areaPointSum = 0;
				var SPLS_saleMinisterSum = 0;
				var SPLS_saleConductorSum = 0;
				var SPLS_financeConductorSum = 0;
				//zhj
				var SPLS_vicePresidentSum = 0;
				var SPLS_supermoSum = 0;
				//上次审批历史
				for(var i=0;i<=length;i++){
					if(i==length){
						//增加合计
						var NewRow = table2.insertRow(table2.rows.length);
						NewRow.insertCell(0).innerHTML = '<td height="30">总计:</td>';
						NewRow.insertCell(1).innerHTML = '<td height="30"><div align="center">'+obj.changeTwoDecimal(SPLS_saleMinisterSum)+'</div></td>';
						NewRow.insertCell(2).innerHTML = '<td height="30"><div align="center">'+obj.changeTwoDecimal(SPLS_saleConductorSum)+'</div></td>';
						NewRow.insertCell(3).innerHTML = '<td height="30"><div align="center">'+obj.changeTwoDecimal(SPLS_vicePresidentSum)+'</div></td>';
						NewRow.insertCell(4).innerHTML = '<td height="30"><div align="center">'+obj.changeTwoDecimal(SPLS_financeConductorSum)+'</div></td>';
						NewRow.insertCell(5).innerHTML = '<td height="30"><div align="center">'+obj.changeTwoDecimal(SPLS_supermoSum)+'</div></td>';
						//增加审批意见
						var NewRow = table2.insertRow(table2.rows.length);
						NewRow.insertCell(0).innerHTML = '<td height="30">审批操作:</td>';
						NewRow.insertCell(1).innerHTML = '<td height="30"><div align="center">'+res[0].APPRV_OP2_OLD+'</div></td>';
						NewRow.insertCell(2).innerHTML = '<td height="30"><div align="center">'+res[0].APPRV_OP3_OLD+'</div></td>';
						NewRow.insertCell(3).innerHTML = '<td height="30"><div align="center">'+res[0].APPRV_OP6_OLD+'</div></td>';
						NewRow.insertCell(4).innerHTML = '<td height="30"><div align="center">'+res[0].APPRV_OP4_OLD+'</div></td>';
						
						NewRow.insertCell(5).innerHTML = '<td height="30"><div align="center">'+res[0].APPRV_OP5_OLD+'</div></td>';
					
					}else{
						var dept = res[i].AGENT_NAME;
						var areaPoint = res[i].APPROVE_ADD_PT1_OLD;
						var saleMinister = obj.changeTwoDecimal(res[i].APPROVE_ADD_PT2_OLD);
						var saleConductor = obj.changeTwoDecimal(res[i].APPROVE_ADD_PT3_OLD);
						var financeConductor = obj.changeTwoDecimal(res[i].APPROVE_ADD_PT4_OLD);
						//zhj 1.20
						var vicePresident=obj.changeTwoDecimal(res[i].APPROVE_ADD_PT6_OLD);
						var supermo = obj.changeTwoDecimal(res[i].APPROVE_ADD_PT5_OLD);
						
//						var appFeeSum = obj.changeTwoDecimal(res[i].ATTR_02)*dpriceValue;//申请服务费合计
						var appFeeSum = parseFloat(res[i].ATTR_01) + parseFloat(res[i].ATTR_02) + parseFloat(res[i].APPROVE_SERVICE_POINT);
						var adviceFee = obj.changeTwoDecimal(res[i].APPROVE_SERVICE_POINT);//TBJ
						var addedFee = obj.changeTwoDecimal(res[i].ATTR_01);//已增加
						var responsibility = appFeeSum;
						var currentAccept = appFeeSum;
						var acceptdFee = parseFloat(responsibility) - parseFloat(adviceFee) - parseFloat(addedFee);
						
						SPLS_acceptdFeeSum = parseFloat(SPLS_acceptdFeeSum) + parseFloat(acceptdFee);
						SPLS_areaPointSum = parseFloat(SPLS_areaPointSum) + parseFloat(areaPoint);
						SPLS_saleMinisterSum = parseFloat(SPLS_saleMinisterSum) + parseFloat(saleMinister);
						SPLS_saleConductorSum = parseFloat(SPLS_saleConductorSum) + parseFloat(saleConductor);
						SPLS_financeConductorSum = parseFloat(SPLS_financeConductorSum) + parseFloat();
						SPLS_vicePresidentSum = parseFloat(SPLS_vicePresidentSum) + parseFloat(vicePresident);
						SPLS_supermoSum = parseFloat(SPLS_supermoSum) + parseFloat(supermo);
						
						var NewRow = table2.insertRow(table2.rows.length);
						NewRow.insertCell(0).innerHTML = '<td height="30">'+dept+'</td>';
						NewRow.insertCell(1).innerHTML = '<td height="30"><div align="center">'+saleMinister+'</div></td>';
						NewRow.insertCell(2).innerHTML = '<td height="30"><div align="center">'+saleConductor+'</div></td>';
						NewRow.insertCell(3).innerHTML = '<td height="30"><div align="center">'+vicePresident+'</div></td>';
						NewRow.insertCell(4).innerHTML = '<td height="30"><div align="center">'+financeConductor+'</div></td>';
						NewRow.insertCell(5).innerHTML = '<td height="30"><div align="center">'+supermo+'</div></td>';
					}
				}
				
				//梯种浮率
				var getResult_ProdRate=function(res1){
					console.log("res1",res1);
					res = res1.HELHHTBJProdRatewsQueryByExample_Output.ListOfHelHhTbjProdRateIo.HelHhTbjProdRateEbc;
					var ress = res1.HELHHTBJProdRatewsQueryByExample_Output.ListOfHelHhTbjProdRateIo.HelHhTbjProdRateEbc;
					var datares = [];
					if(typeof(res.length)=="undefined"){
						datares[0] = ress;
						res = datares;
					}else{
						datares = res;
					}
					for(var i = 0;i<datares.length;i++){
						//总览
						var type = res[i].PRODUCT;
						var count = res[i].QTY;
						var signPrice = obj.changeTwoDecimal(res[i].EXPECTATION_PRICE);
						var avgRateA = obj.changeTwoDecimal(res[i].EQU_AVERAGE_SCALE);
						var itemSPL = obj.changeTwoDecimal(res[i].SPL_PRICE);//设备梯种ＳＰＬ价格
						var itemPrice = obj.changeTwoDecimal(res[i].EXPECTATION_PRICE);//梯种设备期望价
						var pifuSum = obj.changeTwoDecimal(pul_responsibility);
						var avgRateA1 = parseFloat(itemPrice)*(1-parseFloat(pifuSum)/100)/parseFloat(itemSPL) - 1;
						avgRateA1 = avgRateA1 * 100;
						var avgRateA2 = 100  * (parseFloat(signPrice) * (1- parseFloat(parseFloat(pul_adviceFee)/100) - parseFloat(parseFloat(pul_addedFee)/100))/parseFloat(itemSPL) - 1);
						var avgRateA3 = 100  * (parseFloat(signPrice) * (1- parseFloat(parseFloat(pul_adviceFee)/100) - parseFloat(parseFloat(pul_addedFee)/100) - parseFloat(parseFloat(pul_addRate)/100))/parseFloat(itemSPL) - 1);
						
						//梯种浮率
						var NewRow = table_ZL_TZFL.insertRow(table_ZL_TZFL.rows.length);
						NewRow.insertCell(0).innerHTML = '<td height="30"><div align="center">'+type+'</div></td>';
						NewRow.insertCell(1).innerHTML = '<td height="30"><div align="center">'+count+'</div></td>';
						NewRow.insertCell(2).innerHTML = '<td height="30"><div align="center">￥'+signPrice+'</div></td>';
						NewRow.insertCell(3).innerHTML = '<td height="30"><div align="center">'+avgRateA+'</div></td>';
						NewRow.insertCell(4).innerHTML = '<td height="30"><div align="center">'+obj.changeTwoDecimal(avgRateA2)+'</div></td>';
						NewRow.insertCell(5).innerHTML = '<td height="30"><div align="center">'+obj.changeTwoDecimal(avgRateA3)+'</div></td>';
						NewRow.insertCell(6).innerHTML = '<td height="30"><div name="tzfl_div" align="center">'+obj.changeTwoDecimal(avgRateA1)+'</div></td>';

						
						//TBJ信息
						var avgC = obj.changeTwoDecimal(res[i].EQU_AVERAGE_SCALE);
						var avgC1 = parseFloat(itemPrice) * (1 - parseFloat(asprice)/100) / parseFloat(itemSPL) - 1;
						avgC1 = obj.changeTwoDecimal(obj.round_2(avgC1*100,2));
						var avgC2 = parseFloat(itemPrice) * (1 - parseFloat(acceptedFeeSum)/100) / parseFloat(itemSPL) - 1;
						avgC2 = obj.changeTwoDecimal(obj.round_2(avgC2*100,2));
						//梯种浮率
						var NewRow = table_TBJXX_TZFL.insertRow(table_TBJXX_TZFL.rows.length);
						NewRow.insertCell(0).innerHTML = '<td height="30"><div align="center">'+type+'</div></td>';
						NewRow.insertCell(1).innerHTML = '<td height="30"><div align="center">'+count+'</div></td>';
						NewRow.insertCell(2).innerHTML = '<td height="30"><div name="itemSPL1" align="center">￥'+itemSPL+'</div></td>';
						NewRow.insertCell(3).innerHTML = '<td height="30"><div name="itemPrice1" align="center">￥'+itemPrice+'</div></td>';
						NewRow.insertCell(4).innerHTML = '<td height="30"><div align="center">'+avgC+'</div></td>';
						NewRow.insertCell(5).innerHTML = '<td height="30"><div align="center">'+avgC1+'</div></td>';
						NewRow.insertCell(6).innerHTML = '<td height="30"><div align="center">'+avgC2+'</div></td>';
						
					}
					//设备浮率
					var NewRow = table_ZL_SBFL.insertRow(table_ZL_SBFL.rows.length);
					NewRow.insertCell(0).innerHTML = '<td height="30"><div align="center">￥'+ebsDevicePrice+'</div></td>';
					NewRow.insertCell(1).innerHTML = '<td height="30"><div align="center">'+rateA+'</div></td>';
					NewRow.insertCell(2).innerHTML = '<td height="30"><div align="center">'+rateA2+'</div></td>';
					NewRow.insertCell(3).innerHTML = '<td height="30"><div align="center">'+rateA3+'</div></td>';
					NewRow.insertCell(4).innerHTML = '<td height="30"><div name="sbfl_div" align="center">'+rateA1+'</div></td>';
					//付款比例
					var getResult_TBJApprovePay=function(res){
						res = res.HELHHTBJApprovePaywsQueryByExample_Output.ListOfHelHhTbjApprovePayIo.HelHhTbjApprovePayEbc;
						for(var i =0;i<res.length;i++){
							var ctype = res[i].CONTRACT_TYPE;
							var deadline = res[i].PROMPT;
							var cname = res[i].FUND_NAME;
							var proportion = res[i].RATIO;
							var sugproportion = res[i].ATTR_01;
							var comment = res[i].DESCRIPTION;
							var fundtype = res[i].ATTR_02;
							
							var NewRow = table_TBJXX_FKBL.insertRow(table_TBJXX_FKBL.rows.length);
							NewRow.insertCell(0).innerHTML = '<td height="30"><div align="center">'+ctype+'</div></td>';
							NewRow.insertCell(1).innerHTML = '<td height="30"><div align="center">'+deadline+'</div></td>';
							NewRow.insertCell(2).innerHTML = '<td height="30"><div align="center">'+cname+'</div></td>';
							NewRow.insertCell(3).innerHTML = '<td height="30"><div align="center">'+fundtype+'</div></td>';
							NewRow.insertCell(4).innerHTML = '<td height="30"><div align="center">'+proportion+'</div></td>';
							NewRow.insertCell(5).innerHTML = '<td height="30"><div align="center">'+comment+'</div></td>';
						}
						
						//TBJ审批历史
						var getResult_TBJApproveHistory=function(res){
							res = res.HELHHTBJApproveHistorywsQueryByExample_Output.ListOfHelHhTbjApproveHistoryIo.HelHhTbjApproveHistoryEbc;
							var TBJSPLS_table = document.getElementById('TBJSPLS_table');
							if(res.length==0){
								var NewRow = TBJSPLS_table.insertRow(TBJSPLS_table.rows.length);
								NewRow.insertCell(0).innerHTML = '<td colspan="11"><div align="center">未找到记录</div></td>';
							}
							for(var i =0;i<res.length;i++){
								var ver = res[i].ATTR_01;
								var name = res[i].APPROVED_BY_NAME;
								var result = res[i].APPROVED_OPERATION;
								var comment = res[i].APPROVED_SUGGESTION;
								var date = res[i].APPROVED_DATE;
								var attr04 = obj.changeTwoDecimal(res[i].ATTR_04);
								var attr05 = obj.changeTwoDecimal(res[i].ATTR_05);
								var point1 = obj.changeTwoDecimal(res[i].SERVICE_POINT);
								var point2 = obj.changeTwoDecimal(res[i].SUGGEST_SERVICE_POINT);
								var sug_prod_rate = obj.changeTwoDecimal(res[i].ATTR_03);
								var sug_prod_price = obj.changeTwoDecimal(res[i].ATTR_02);
								
								var NewRow = TBJSPLS_table.insertRow(TBJSPLS_table.rows.length);
								NewRow.insertCell(0).innerHTML = '<td height="30"><div align="center">'+ver+'</div></td>';
								NewRow.insertCell(1).innerHTML = '<td height="30"><div align="center">'+name+'</div></td>';
								NewRow.insertCell(2).innerHTML = '<td height="30"><div align="center">'+result+'</div></td>';
								NewRow.insertCell(3).innerHTML = '<td height="30"><div align="center">'+point1+'</div></td>';
								NewRow.insertCell(4).innerHTML = '<td height="30"><div align="center">'+point2+'</div></td>';
								NewRow.insertCell(5).innerHTML = '<td height="30"><div align="center">￥'+sug_prod_rate+'</div></td>';
								NewRow.insertCell(6).innerHTML = '<td height="30"><div align="center">'+sug_prod_price+'</div></td>';
								NewRow.insertCell(7).innerHTML = '<td height="30"><div align="center">￥'+attr04+'</div></td>';
								NewRow.insertCell(8).innerHTML = '<td height="30"><div align="center">'+attr05+'</div></td>';
								NewRow.insertCell(9).innerHTML = '<td height="30"><div align="center">'+comment+'</div></td>';
								NewRow.insertCell(10).innerHTML = '<td height="30"><div align="center">'+date+'</div></td>';
							}
					            
						};
						var params = {};
						params.method = 'TBJApproveHistory';
						params.parameters = [attr_10];
						obj.connectServer_APPROVE(getResult_TBJApproveHistory,params);
					};
					var params = {};
					params.method = 'TBJApprovePay';
					params.parameters = [attr_10];
					obj.connectServer_APPROVE(getResult_TBJApprovePay,params);
				};
				var params = {};
				params.method = 'TBJProdRate';
				params.parameters = [attr_10];
				obj.connectServer_APPROVE(getResult_ProdRate,params);
			};
			var params = {};
			params.method = 'TBJServiceFee';
			params.parameters = [attr_10];
			obj.connectServer_APPROVE(getResult_Fee,params);
			
			Ext.getCmp('tf_research_add').setValue(research);
			if (research != "" && research != null) {
				obj.getApplication().getController('HelcApprove.controller.ChaoDianZengFei.CDZFMainOtherCtrl').onResearchTextChangeAdd();
			}
		};
		var params = {};
		params.method = 'TBJApproveMain';
		params.parameters = [attr_10];
		this.connectServer_APPROVE(getResult,params);
	},
	//zhj 新增两界面:价格明细，审批历史
	tbj_info1: function (obj, value, oldValue, eOpts){
	  obj=this;
	  if(value.id=='tbj_priceDetail'){
		var tbj_priceDetail_flag=Ext.getCmp("tbj_priceDetail_flag").getValue();
		  var ATTR_10=Ext.getCmp('CDZF_ARRT_10').getValue();
		// 加载第二个页签数据（价格明细）
			var paramPriceDetail = {isLoading: true, method: "toQueryPriceDetail", parameters: [ATTR_10]};
            if(tbj_priceDetail_flag=='N')
			obj.connectServer_ws(callBackpd, paramPriceDetail);
			function callBackpd(resultpd) {
				if (resultpd == null) {
					return ;
				}
				var dataPriceDetaill = resultpd.HELHHTBJPriceListwsQueryByExample_Output.ListOfHelHhTbjPriceListIo.HelHhTbjPriceListEbc;
				var dataPriceDetail = [];
				if (JSON.stringify(dataPriceDetaill).indexOf('[') == -1) {
					dataPriceDetail[dataPriceDetail.length] = dataPriceDetaill;
				} else {
					dataPriceDetail = dataPriceDetaill;
				}
				
				var size = dataPriceDetail.length;
				var tabl_priceDetail = document.getElementById('table_priceDetail');
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
				if (tabl_priceDetail.rows.length < 2) {
					var NewRow = tabl_priceDetail.insertRow(tabl_priceDetail.rows.length);
					NewRow.innerHTML = '<td height="30" align="center" colspan="15">没有记录 ！</td>';
				}
				Ext.getCmp("tbj_priceDetail_flag").setValue('Y');
			}

			}else if(value.id=='tbj_history'){
			 var CDZF_ZL_PRICE =Ext.getCmp('CDZF_ZL_PRICE').getValue();
			 var CDZF_ZL_VERSION=Ext.getCmp('CDZF_ZL_VERSION').getValue();
			 var tbj_history_flag=Ext.getCmp('tbj_history_flag').getValue();
			 
			 var paramtbjhistory = {isLoading: true, method: "toQueryTBJHistory_zf", parameters: [CDZF_ZL_PRICE,CDZF_ZL_VERSION]};
			 if(tbj_history_flag=='N')
			 obj.connectServer_ws(callBackth, paramtbjhistory);
				function callBackth(resultth) {
					
					if (resultth == null) {
						return ;
					}
					var datatbjhistory = resultth.HELHHADDServiceHISQueryByExampleResponse.SiebelMessage.listOfHelHhAddServiceApprovedHistoryIo.helHhAddServiceApprovedHistoryEbc;
					var size = datatbjhistory.length;
					
					var tbl_tbjHistory = document.getElementById('table_tbjHistory');
					for (var i = 0; i < size; i ++) {
						var NewRow = tbl_tbjHistory.insertRow(tbl_tbjHistory.rows.length);
						NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].quoteRevision +'</td>';
						NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].approvedLastName+datatbjhistory[i].approvedFirstName +'</td>';
						NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].approvedOperation +'</td>';
						NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].suggestServicePoint  +'</td>';
						NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].equDiscountOfSvcFee  +'</td>';
						NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].approveOperation +'</td>';
						NewRow.insertCell(6).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].approveAllServiceFeeAmount +'</td>';
						NewRow.insertCell(7).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].equipmentApproveDiscount  +'</td>';
						NewRow.insertCell(8).innerHTML = '<td class="tbl_nobr_value">'+ datatbjhistory[i].approvedSuggestion +'</td>';
						}
	                //new
					if (tbl_tbjHistory.rows.length < 2) {
						var NewRow = tbl_tbjHistory.insertRow(tbl_tbjHistory.rows.length);
						NewRow.innerHTML = '<td height="30" align="center" colspan="14">没有记录 ！</td>';
					}
					Ext.getCmp('tbj_history_flag').setValue("Y");
				}
		  
	  }
		  
	}
	
});
function input_change(obk,input_name,index){
	var table = document.getElementById('CDZF_ZL_FWFLSJSQ');
	var table1 = document.getElementById('CDZF_ZL_FWFPF');
	//zhj 0614
	var TBJPFFWF = table.rows[index+2].cells[2].innerText;			//TBJ批复服务费
	var TBJPFFWFYZJ = table.rows[index+2].cells[3].innerText;		//已增加服务费
	var inputArray = document.getElementsByName(input_name);
	var fwfls_zj = document.getElementsByName("fwfls_zj");
	var itemSPL1 = document.getElementsByName("itemSPL1");			//设备SPL价
	var itemPrice1 = document.getElementsByName("itemPrice1");		//设备期望价
	var SB_lenght = itemPrice1.length;
	var SPL = Ext.getCmp('CDZF_XX_SPL').getValue();					//总设备SPL价
	var dprice = Ext.getCmp('dprice').getValue();					//总设备期望价

	var inputvalue = inputArray[index].value;						//当前角色输入点数
	if(inputvalue == "" || isNaN(inputvalue)==true){
		inputArray[index].value = "0.00";
	}
	
	var XPFZJFWF = obj.changeTwoDecimal(parseFloat(inputvalue) - parseFloat(TBJPFFWF) - parseFloat(TBJPFFWFYZJ));
	table1.rows[index+2].cells[1].innerHTML = '<td height="30"><div name="acceptdFee" align="center" style="color:blue"><b>'+XPFZJFWF+'</b></div></td>';;
	
	
	//计算当前角色总计
	var sum=0;
	for(var i = 0;i<inputArray.length;i++){
		var value = inputArray[i].value;
		sum = parseFloat(sum) + parseFloat(value);
	}
	document.getElementById("div_"+input_name).innerHTML = sum;
	
	//计算现批复增加服务费和总计
	var FeeArray = document.getElementsByName('acceptdFee');
	var Feesum=0;
	for(var i = 0;i<FeeArray.length;i++){
		var value = FeeArray[i].innerText;
		Feesum = parseFloat(Feesum) + parseFloat(value);
	}
	document.getElementById("div_acceptdFee_input").innerHTML = obj.changeTwoDecimal(Feesum);
	
//计算设备浮率
	for(var j=0;j<SB_lenght;j++){
		//设备浮率下的：设备浮率（含总批费） = 总设备期望价dprice（1-服务费批复总点数appFeeSumSum）/总SPL价dSPL -1
		var rateA1 = parseFloat(dprice)*(1-parseFloat(sum)/100)/parseFloat(SPL)-1;
		rateA1 = obj.round_2(rateA1*100,2);
		
		var sbfl_div = document.getElementsByName("sbfl_div");
		sbfl_div[j].innerHTML = '<div align="center">'+rateA1+'</div>';
		
		//计算梯种浮率
		var itemSPL = (itemSPL1[j].innerHTML).substring(1,itemSPL1[j].innerHTML.length);//设备梯种ＳＰＬ价格
		var itemPrice = (itemPrice1[j].innerHTML).substring(1,itemPrice1[j].innerHTML.length);//梯种设备期望价
		var pifuSum = obj.changeTwoDecimal(sum);
		var avgRateA1 = parseFloat(itemPrice)*(1-parseFloat(pifuSum)/100)/parseFloat(itemSPL) - 1;
		avgRateA1 = avgRateA1 * 100;
		
		var tzfl_div = document.getElementsByName("tzfl_div");
		tzfl_div[j].innerHTML = '<div align="center">'+obj.changeTwoDecimal(avgRateA1)+'</div>';
	}
	

}
