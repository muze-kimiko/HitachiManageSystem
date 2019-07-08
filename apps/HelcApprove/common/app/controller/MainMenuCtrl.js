Ext.define("HelcApprove.controller.MainMenuCtrl", {
	extend : "HelcApprove.controller.ApplicationController",
	config : {
		refs : {
		},
		control : {
			"button#menu_seting":{
				tap:'menu_seting'
			},
			"button#menu_tbj":{
				tap:'menu_tbj'
			},
			"button#menu_cdzf":{
				tap:'menu_cdzf'
			},
		}
	},
	
	menu_seting:function(){
		//跳转页面     
		this.NextView('SetingMain','HelcApprove.view.Seting.SetingMain');
		
	},
	menu_tbj:function(){
		// 跳转页面     
		this.NextView('TBJ_List','HelcApprove.view.TBJ.TBJ_List');
		// 初始化拿数据
		this.getApplication().getController('HelcApprove.controller.TBJ.TBJListCtrl').toInitTbjApprove();
	},
	
	menu_cdzf:function(){
		var obj = this;
		myLoading.show();
		//跳转页面
		var store = obj.getStore('AddServiceApprovedStore','HelcApprove.store.AddService.AddServiceApprovedStore');
		store.setData([]);
		this.NextView('CDZF_List','HelcApprove.view.ChaoDianZengFei.CDZF_List');
		
		var getResult=function(res){
			var resArray = res.HELHHADDSVCQueryByExample_Output.listOfHelHhAddServiceApprovePendingIo.helHhAddServiceApprovePendingEbc;
			if (resArray == undefined || resArray == null || resArray.length == 0) {
				Ext.Msg.alert('提示', '增费暂无待审批数据 ！');
			}
			var _data = [];
			if(resArray.length){
				for(var i = 0;i < resArray.length;i++){
					_data.push({
						aDD_SVC_APPROVE_STATUS:resArray[i].aDD_SVC_APPROVE_STATUS,
						aPPROVEDBY_NAME:resArray[i].aPPROVEDBY_NAME,
						aTTR_01:resArray[i].aTTR_01,
						aTTR_02:resArray[i].aTTR_02,
						aTTR_03:resArray[i].aTTR_03,
						aTTR_04:resArray[i].aTTR_04,
						aTTR_05:resArray[i].aTTR_05,
						aTTR_06:resArray[i].aTTR_06,
						aTTR_07:resArray[i].aTTR_07,
						aTTR_08:resArray[i].aTTR_08,
						aTTR_09:resArray[i].aTTR_09,
						aTTR_10:resArray[i].aTTR_10,
						bUSINESS_TYPE:resArray[i].bUSINESS_TYPE,
						cONTRACT_ID:resArray[i].cONTRACT_ID,
						dELIVERY_CYCLE:resArray[i].dELIVERY_CYCLE,
						lOGIN_ID:resArray[i].lOGIN_ID,
						oPPORTUNITY:resArray[i].oPPORTUNITY,
						oPPORTUNITY_ACCOUNT:resArray[i].oPPORTUNITY_ACCOUNT,
						oPPORTUNITY_ACCOUNT_TYPE:resArray[i].oPPORTUNITY_ACCOUNT_TYPE,
						oRGANIZATION_OPPTY:resArray[i].oRGANIZATION_OPPTY,
						qUOTE_FINAL_USER:resArray[i].qUOTE_FINAL_USER,
						qUOTE_NUMBER1:resArray[i].qUOTE_NUMBER1,
						rEVISION:resArray[i].rEVISION,
						tBJ_APPROVED_DATE:resArray[i].tBJ_APPROVED_DATE,
						tECH_APPROVER_NAME:resArray[i].tECH_APPROVER_NAME,
						tO_BE_APP_POSTN_ID:resArray[i].tO_BE_APP_POSTN_ID,
						isOverDate:Ext.Date.diff(Ext.Date.parse(resArray[i].tBJ_APPROVED_DATE,"Y-m-d"),new Date(),Ext.Date.DAY) > 7?1:0,
					});
				}
			}else{
				_data.push({
					aDD_SVC_APPROVE_STATUS:resArray.aDD_SVC_APPROVE_STATUS,
					aPPROVEDBY_NAME:resArray.aPPROVEDBY_NAME,
					aTTR_01:resArray.aTTR_01,
					aTTR_02:resArray.aTTR_02,
					aTTR_03:resArray.aTTR_03,
					aTTR_04:resArray.aTTR_04,
					aTTR_05:resArray.aTTR_05,
					aTTR_06:resArray.aTTR_06,
					aTTR_07:resArray.aTTR_07,
					aTTR_08:resArray.aTTR_08,
					aTTR_09:resArray.aTTR_09,
					aTTR_10:resArray.aTTR_10,
					bUSINESS_TYPE:resArray.bUSINESS_TYPE,
					cONTRACT_ID:resArray.cONTRACT_ID,
					dELIVERY_CYCLE:resArray.dELIVERY_CYCLE,
					lOGIN_ID:resArray.lOGIN_ID,
					oPPORTUNITY:resArray.oPPORTUNITY,
					oPPORTUNITY_ACCOUNT:resArray.oPPORTUNITY_ACCOUNT,
					oPPORTUNITY_ACCOUNT_TYPE:resArray.oPPORTUNITY_ACCOUNT_TYPE,
					oRGANIZATION_OPPTY:resArray.oRGANIZATION_OPPTY,
					qUOTE_FINAL_USER:resArray.qUOTE_FINAL_USER,
					qUOTE_NUMBER1:resArray.qUOTE_NUMBER1,
					rEVISION:resArray.rEVISION,
					tBJ_APPROVED_DATE:resArray.tBJ_APPROVED_DATE,
					tECH_APPROVER_NAME:resArray.tECH_APPROVER_NAME,
					tO_BE_APP_POSTN_ID:resArray.tO_BE_APP_POSTN_ID,
					isOverDate:Ext.Date.diff(Ext.Date.parse(resArray.tBJ_APPROVED_DATE,"Y-m-d"),new Date(),Ext.Date.DAY) > 7?1:0,
				});
			}
			store.setData(_data);
			approve_data=_data;
			
			//获取权限
			var invocationData={adapter : 'HttpAdapter_APPROVE',
		            procedure : 'getStsyemInfo',
		            parameters : ["permission"]
	         };
			
			 WL.Client.invokeProcedure(invocationData, { 
                 
				onSuccess : function(res){
					var resultString = res.invocationResult.result;
					
					var result = resultString.split('#');
					for(var i =0;i<result.length;i++){
						if(result[i].indexOf(loginuser) != -1){
							var roleS = result[i].split(':');
							addServiceRole=roleS[0];
							
						}
					}
				},
		        onFailure : function(result){
		        	alert("失败了");
		        }
		     });
		};
		
		var params = {};
		params.method = 'AddServiceApprovePending';
		if (roleString != "大项目" && roleString != "大客户" && roleString != "营业部") {
			params.parameters = [Ext.getCmp('username').getValue(), ''];
		} else {
			params.parameters = [Ext.getCmp('username').getValue(), roleString];
		}
//		params.parameters = [loginuser];
		this.connectServer_APPROVE(getResult,params);
		
		var fwtype=Ext.getCmp('CDZF_ZL_approved');
			fwtype.addListener('clearicontap',obj.CDZF_ZL_approved,this,{
		});
	},
	
	/**
	 * 初始化用户模块权限
	 */
	initUserRole: function(myRole) {
		var emptyRole = "0x0000000000000000";
		var tbjRole = "0x000000000000FFFF";
		var addRole = "0x0000FFFF00000000";
		
		var menu_tbj = Ext.getCmp("menu_tbj");
		var menu_cdzf = Ext.getCmp("menu_cdzf");
		
		myRole = "0x"+myRole;
		if (parseInt(myRole) ==  (parseInt(addRole) + parseInt(tbjRole))) { // 当TBJ与增费的权限都有时
			menu_tbj.setHidden(false);
			menu_cdzf.setHidden(false);
		} else if (parseInt(myRole) == parseInt(tbjRole) || parseInt(myRole) == parseInt(emptyRole)) { // 只有TBJ权限
			menu_tbj.setHidden(false);
			menu_cdzf.setHidden(true);
		} else if (parseInt(myRole) == parseInt(addRole)) { // 只有增费权限
			menu_cdzf.setHidden(false);
			menu_tbj.setHidden(true);
		} else { // 隐藏全部菜单
			menu_tbj.setHidden(true);
			menu_cdzf.setHidden(true);
		}
	},
	
	/**
	 * 初始化TBJ的数量
	 */
	initTBJPaddingCount: function() {
		var cnt_showLoadCount = Ext.getCmp('cnt_showLoadCount');
		cnt_showLoadCount.setHidden(false);
		document.getElementById('sp_tbj_paddeing_count').innerHTML = "";
		document.getElementById('sp_addService_paddeing_count').innerHTML = "";
		
		var param = {};
		param.isLoading = false;
		param.method = "toQueryTJBAprovelPendingCount";
		if (roleString != "大项目" && roleString != "大客户" && roleString != "营业部" && roleString !="其它职位") {
			param.parameters = [Ext.getCmp('username').getValue(), ''];
		} else {
			param.parameters = [Ext.getCmp('username').getValue(), roleString];
		}
		this.connectServer_ws(callBack, param);
		function callBack(result) {
			cnt_showLoadCount.setHidden(true);
			var count = 0;
			var addServicecount = 0;
			if (result == null){
				//Ext.Msg.alert("提示","获取TBJ数量失败！");
			} else {
				var res = result.HELHHTBJApprovePendingCountwsQueryByExample_Output.ListOfHelHhTbjApprovePendingCountIo.HelHhTbjApprovePendingCountEbc;
				var ress = result.HELHHTBJApprovePendingCountwsQueryByExample_Output.ListOfHelHhTbjApprovePendingCountIo.HelHhTbjApprovePendingCountEbc;
				var data = [];
				if(typeof(res.length)=="undefined"){
					data[0] = ress;
				}else{
					data = res;
				}
				for (var i = 0; i < data.length; i ++) {
					if (roleString == data[i].LoginRole) {
						if (data[i] != undefined && data[i].PdCount != null && data[i].PdCount != "" && data[i].PdCount != undefined) {
							count = data[i].PdCount;
						}
						if (data[i] != undefined && data[i].Attr01 != null && data[i].Attr01 != "" && data[i].Attr01 != undefined) {
							addServicecount = data[i].Attr01;
						}
						document.getElementById('sp_tbj_paddeing_count').innerHTML = count;
						document.getElementById('sp_addService_paddeing_count').innerHTML = addServicecount;
						//WL.Badge.setNumber在ios上也不生效，待查
						console.log(Number(count)+Number(addServicecount));
						WL.Badge.setNumber(Number(count)+Number(addServicecount));
					}
				}
			}
		}
	},
	
	CDZF_ZL_approved:function(){
		var store = this.getStore('AddServiceApprovedStore','HelcApprove.store.AddService.AddServiceApprovedStore');
		store.setData(approve_data);
	}
});
