
/* JavaScript content from app/controller/HasEnded/HasEndedCtrl.js in folder common */
 Ext.define('HelcOA.controller.HasEnded.HasEndedCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'ysp_HasEnded_id',
	config:{
		control:{
			"list#yjs_HasEndedList":{
				itemtap:'yjs_HasEndedList'
			},
		}	
	},
	yjs_HasEndedList:function(obj, index, target, record, e, eOpts){
		var obj_this = this;
		
		cc.log("-------------------record--------------------");
		cc.log(record);
		cc.log(record.data.piid);
		var obj_piid = record.data.piid; 
		
        var getResult=function(res){
        	cc.log("----------------------------");
        	cc.log(res);
        	
			var jsonObj=Ext.JSON.decode(res.getPiDataResponse.ovar);
			cc.log(jsonObj);
			cc.log(jsonObj.data.mast);
			
			for(key in jsonObj.data.mast){
				try{
					Ext.getCmp(key).setValue(jsonObj.data.mast[key]);
				}catch(e){
					//alert('错误数据！'+key);
				}
            }
				
			//审批意见 循环输出
			var audit_list_str = JSON.stringify(jsonObj.data.audit_list);
			//zhj 10
			var filenames=jsonObj.data.filenames;
			
			Ext.getCmp('audit_list').setValue(audit_list_str);
			var audit_list = Ext.getCmp('audit_list').getValue(); 
			var jsonObj = eval("("+ audit_list +")");
			var formPanel = Ext.getCmp('fp');
			for(var i=0;i<jsonObj.length;i++){
				if(jsonObj[i].node!='起草'){
					
					var fieldSet1 = {
							xtype: 'fieldset',
							id: 'fp'+i,
							title:  jsonObj[i].node,
							items: [
							        {
							        	xtype: 'textfield',
							        	label: '姓名',
							        	value: jsonObj[i].username,
							        	readOnly: true,
							        },{
							        	xtype: 'textfield',
							        	label: '部门',
							        	value: jsonObj[i].dept,
							        	readOnly: true,
							        },{
							        	xtype: 'textfield',
							        	label: '时间',
							        	value: jsonObj[i].ctime,
							        	readOnly: true,
							        },{
							        	xtype: 'autoTextArea',
							        	label: '内容',
							        	id:'idea_'+i, 
							        	readOnly: true
							        }]
					};
					formPanel.add(fieldSet1);
					Ext.getCmp('idea_'+i).setValue(jsonObj[i].idea);
				}
			}
			//zhj 10
			var fjstore = Ext.data.StoreManager.get("jobContactBook_ck_Store");
			if (!fjstore) {
				fjstore = Ext.create("HelcOA.store.ForApprovalProcess.DailyOffice.jobContactBook_ck_Store");
			}
			
			var sj=[];
			sj=filenames;
			console.log("zhaaa"+filenames);
//			for(var i=1;i<3;i++){
//			var datas={};
//			datas.base64src='';
//			datas.src='';
//			datas.filename=i+'.jpg';
//			sj[i-1]=datas;
//			}
			var length=sj.length;
//			alert("hehe"+data);
			//fjstore.setData(jsonObj.filename);					
			fjstore.setData(sj);
			//Ext.getCmp('picture_listV_ck').setHeight(length==0?0:(length+1)*35);
			console.log("haha");
			
		};		
		
		var myParam = [_vt,obj_piid];
		var params = {};
		params.adpName = 'HttpAdapter_BPM';
		params.prodNmae = 'examine';
		params.prmName = myParam;
		obj_this.connectServerComm(getResult,params);
		
		
		//跳转页面
		if(record.data.processname == "工作联络书"){
			obj_this.NextView('yjs_jobContactBook_ID','HelcOA.view.HasEnded.DailyOffice.jobContactBook');
		}
		if(record.data.processname == "出差申请"){
			obj_this.NextView('yjs_travelRequest_ID','HelcOA.view.HasEnded.DailyOffice.travelRequest');
		}
		if(record.data.processname == "合同校正章(1)用印申请"){
			obj_this.NextView('yjs_contractStamp_ID','HelcOA.view.HasEnded.DailyOffice.contractStamp');
		}
		if(record.data.processname == "公务用车联络流程"){
			obj_this.NextView('yjs_governmentCar_ID','HelcOA.view.HasEnded.DailyOffice.governmentCar');
		}
		if(record.data.processname == "用印申请"){
			obj_this.NextView('yjs_useStamp_ID','HelcOA.view.HasEnded.DailyOffice.useStamp');
		}
		if(record.data.processname == "内部法律咨询流程"){
			obj_this.NextView('yjs_InternalLegalAdvisoryElectronFlow_ID','HelcOA.view.HasEnded.DailyOffice.InternalLegalAdvisoryElectronFlow');
		}
		if(record.data.processname == "境外出差申请"){
			obj_this.NextView('yjs_OverseasTrip_ID','HelcOA.view.HasEnded.DailyOffice.OverseasTrip');
		}
		if(record.data.processname == "法人授权"){
			obj_this.NextView('yjs_LegalAuthorization_id','HelcOA.view.HasEnded.DailyOffice.LegalAuthorization');
		}
		if(record.data.processname == "公司对外合同审批流程"){
			obj_this.NextView('yjs_contractExamine_ID','HelcOA.view.HasEnded.DailyOffice.contractExamine');
		}
		if(record.data.processname == "物业公司对外合同审批流程"){
			obj_this.NextView('yjs_propertyContractExamine_ID','HelcOA.view.HasEnded.DailyOffice.propertyContractExamine');
		}
		if(record.data.processname == "会议室申请流程"){
			obj_this.NextView('yjs_MeetingRoomReservationTable_ID','HelcOA.view.HasEnded.DailyOffice.MeetingRoomReservationTable');
		}
		if(record.data.processname == "公司发文流程"){
			obj_this.NextView('yjs_companyOutgoing_ID','HelcOA.view.HasEnded.DailyOffice.companyOutgoing');
		}
		if(record.data.processname == "视频设备申请"){
			obj_this.NextView('yjs_VideoEquipmentApplicationForm_ID','HelcOA.view.HasEnded.DailyOffice.VideoEquipmentApplicationForm');
		}
		if(record.data.processname == "接待客户工作联络流程"){
			obj_this.NextView('yjs_CustomerReception_ID','HelcOA.view.HasEnded.DailyOffice.CustomerReception');
		}
		if(record.data.processname == "公司规章制度审批流程"){
			obj_this.NextView('yjs_rulesAndRegulations_ID','HelcOA.view.HasEnded.DailyOffice.rulesAndRegulations');
		}
		if(record.data.processname == "投资公司经理出差申请流程"){
			obj_this.NextView('yjs_investManager_ID','HelcOA.view.HasEnded.DailyOffice.investManager');
		}
		if(record.data.processname == "PO单审核"){
			obj_this.NextView('yjs_POFormExamine_ID','HelcOA.view.HasEnded.POFormExamine');
			obj_this.getApplication().getController('ForApprovalProcess.DailyOffice.POFormExamineCtrl').initPOForm();
		}
		//分类：营业/工程业务
		if(record.data.processname == "维修改造工程业务联络流程"){
			obj_this.NextView('yjs_MaintainTransformView_ID','HelcOA.view.HasEnded.BusinessService.MaintainTransformView');
		}
		if(record.data.processname == "非标报告作业处理流程"){
			obj_this.NextView('yjs_nonstandardWork_id','HelcOA.view.HasEnded.BusinessService.nonstandardWork');
		}
		if(record.data.processname == "诉讼审批流程"){
			obj_this.NextView('yjs_litigationApprove_id','HelcOA.view.HasEnded.BusinessService.litigationApprove');
		}
		if(record.data.processname == "开具发票"){
			obj_this.NextView('yjs_Invoice_id','HelcOA.view.HasEnded.BusinessService.Invoice');
		}
		if(record.data.processname == "律师函审批流程"){
			obj_this.NextView('yjs_Legistimate_id','HelcOA.view.HasEnded.BusinessService.Legistimate');
		}
		if(record.data.processname == "诉讼和解审批流程"){
			obj_this.NextView('yjs_litigationApplyandRemove_id','HelcOA.view.HasEnded.BusinessService.litigationApplyandRemove');
		}
		if(record.data.processname == "短交货期流程"){
			obj_this.NextView('yjs_bussinessShortDateDelivery_id','HelcOA.view.HasEnded.BusinessService.bussinessShortDateDelivery');
		}
		if(record.data.processname == "短安装期联络工作流程"){
			obj_this.NextView('yjs_bussinessShortDateInstall_id','HelcOA.view.HasEnded.BusinessService.bussinessShortDateInstall');
		}
		if(record.data.processname == "电梯_扶梯发货计划"){
			obj_this.NextView('yjs_elevatordeliveryplan_id','HelcOA.view.HasEnded.BusinessService.elevatordeliveryplan');
		}
		if(record.data.processname == "非正常发货要求联络书流程"){
			obj_this.NextView('yjs_abnormaldelivery_id','HelcOA.view.HasEnded.BusinessService.abnormaldelivery');
		}
		//分类：提案管理流程
		if(record.data.processname == "提案管理流程"){
			obj_this.NextView('yjs_PM_TAGLLC_NG_id','HelcOA.view.HasEnded.ProposalManage.PM_TAGLLC_NG');
		}
		//分类：质量控制
		if(record.data.processname == "三包申请报告"){
			obj_this.NextView('yjs_ThreeGuarantees_id','HelcOA.view.HasEnded.QualityControl.ThreeGuarantees');
		}
		if(record.data.processname == "开箱补缺件及不良问题反馈报告"){
			obj_this.NextView('yjs_KXBQJView_id','HelcOA.view.HasEnded.QualityControl.KXBQJView');
		}
		if(record.data.processname == "欠料发货电子流程"){
			obj_this.NextView('yjs_StockoutsDelivery_ID','HelcOA.view.HasEnded.QualityControl.StockoutsDelivery');
		}
		if(record.data.processname == "公司级投诉处理流程"){
			obj_this.NextView('yjs_ComplatinSheet_ID','HelcOA.view.HasEnded.QualityControl.ComplatinSheet');
		}
		//分类：人力资源
		if(record.data.processname == "丧假申请流程（派驻人员专用）"){
			obj_this.NextView('yjs_FuneralLeave_id','HelcOA.view.HasEnded.humanresources.FuneralLeave');
		}
		if(record.data.processname == "人员转_调岗申请"){
			obj_this.NextView('yjs_StaffTransfer_id','HelcOA.view.HasEnded.humanresources.StaffTransfer');
		}
		if(record.data.processname == "公积金申请"){
			obj_this.NextView('yjs_FundApply_id','HelcOA.view.HasEnded.humanresources.FundApply');
		}
		if(record.data.processname == "培训设施借用流程"){
			obj_this.NextView('yjs_trainingEquipmentsBorrowing_id','HelcOA.view.HasEnded.humanresources.trainingEquipmentsBorrowing');
		}
		if(record.data.processname == "应届毕业生实习培训计划流程"){
			obj_this.NextView('yjs_GraduatesTraining_ID','HelcOA.view.HasEnded.humanresources.GraduatesTraining');
		}
		if(record.data.processname == "婚假_产假申请流程（派驻人员专用）"){
			obj_this.NextView('yjs_MarriageLeave_id','HelcOA.view.HasEnded.humanresources.MarriageLeave');
		}
		if(record.data.processname == "年度计划外培训需求申请流程"){
			obj_this.NextView('yjs_YearPlan_id','HelcOA.view.HasEnded.humanresources.YearPlan');
		}
		if(record.data.processname == "探亲假申请流程"){
			obj_this.NextView('yjs_HomeLeave_id','HelcOA.view.HasEnded.humanresources.HomeLeave');
		}
		//信息技术
		if(record.data.processname == "PDA系统账号流程"){
			obj_this.NextView('yjs_PDAaccount_id','HelcOA.view.HasEnded.InformationTechnology.PDAaccount');
		}
		if(record.data.processname == "IT故障申请流程"){
			obj_this.NextView('yjs_ITBDapplicationForm_id','HelcOA.view.HasEnded.InformationTechnology.ITBDapplicationForm');
		}
		if(record.data.processname == "数据恢复申请流程"){
			obj_this.NextView('yjs_DataRecovery_id','HelcOA.view.HasEnded.InformationTechnology.DataRecovery');
		}
		if(record.data.processname == "数据维护申请流程"){
			obj_this.NextView('yjs_DataMaintenance_id','HelcOA.view.HasEnded.InformationTechnology.DataMaintenance');
		}
		if(record.data.processname == "系统网络账号权限申请"){
			obj_this.NextView('yjs_systemAccount_id','HelcOA.view.HasEnded.InformationTechnology.systemAccount');
		}
		if(record.data.processname == "供应商信息维护流程"){
			obj_this.NextView('yjs_supplyment_id','HelcOA.view.HasEnded.InformationTechnology.supplyment');
		}
		if(record.data.processname == "PDA系统设备新增或维修流程"){
			obj_this.NextView('yjs_PDAEquipment_id','HelcOA.view.HasEnded.InformationTechnology.PDAEquipment');
		}
		if(record.data.processname == "软件维护申请流程"){
			obj_this.NextView('yjs_softwarevindicate_id','HelcOA.view.HasEnded.InformationTechnology.softwarevindicate');
		}
		if(record.data.processname == "用户权限申请流程"){
			obj_this.NextView('yjs_Permissions_ID','HelcOA.view.HasEnded.InformationTechnology.Permissions');
		}
		if(record.data.processname == "客户信息维护流程"){
			obj_this.NextView('yjs_clientInformation_ID','HelcOA.view.HasEnded.InformationTechnology.clientInformation');
		}
		if(record.data.processname == "设备_配件借用申请流程"){
			obj_this.NextView('yjs_ITAccessoriesApplication_id','HelcOA.view.HasEnded.InformationTechnology.ITAccessoriesApplication');
		}
		//天津
		if(record.data.processname == "天津合同审批流程"){
			obj_this.NextView('yjs_Contractaudit_id','HelcOA.view.HasEnded.TianJin.Contractaudit');
		}
		if(record.data.processname == "天津公务用车申请流程"){
			obj_this.NextView('yjs_TJCar_id','HelcOA.view.HasEnded.TianJin.TJCar');
		}
		if(record.data.processname == "天津用印申请"){
			obj_this.NextView('yjs_TJSignet_id','HelcOA.view.HasEnded.TianJin.TJSignet');
		}
		if(record.data.processname == "天津设备_配件借用申请流程"){
			obj_this.NextView('yjs_TJAccessoriesApplication_id','HelcOA.view.HasEnded.TianJin.TJAccessoriesApplication');
		}
		//信息
		if(record.data.processname == "档案借阅或复印申请流程"){
			obj_this.NextView('yjs_FileBorrowingOrCopy_id','HelcOA.view.HasEnded.Technology.FileBorrowingOrCopy');
		}
		if(record.data.processname == "天津公司发文流程"){
			obj_this.NextView('yjs_TJDispatch_id','HelcOA.view.HasEnded.TianJin.TJDispatch');
		}
		if(record.data.processname == "天津合理化提案流程"){
			obj_this.NextView('yjs_TJProposal_id','HelcOA.view.HasEnded.TianJin.TJProposal');
		}
		if(record.data.processname == "天津出差申请"){
			obj_this.NextView('yjs_TJtravelRequest_ID','HelcOA.view.HasEnded.TianJin.TJtravelRequest');
		}
		if(record.data.processname == "天津产品退货流程"){
			obj_this.NextView('yjs_TJreturn_ID','HelcOA.view.HasEnded.TianJin.TJreturn');
		}
		if(record.data.processname == "天津IT故障申告流程"){
			obj_this.NextView('yjs_TJITBDapplicationForm_ID','HelcOA.view.HasEnded.TianJin.TJITBDapplicationForm');
		}
		if(record.data.processname == "天津电脑资料用户申请"){
			obj_this.NextView('yjs_TJClientInform_ID','HelcOA.view.HasEnded.TianJin.TJClientInform');
		}
		if(record.data.processname == "天津信息系统帐号权限申请流程"){
			obj_this.NextView('yjs_TJInformationAccount_ID','HelcOA.view.HasEnded.TianJin.TJInformationAccount');
		}
		if(record.data.processname == "天津软件维护流程"){
			obj_this.NextView('yjs_TJSoftwareMaintenance_id','HelcOA.view.HasEnded.TianJin.TJSoftwareMaintenance');
		}

		//制造管理
		if(record.data.processname == "井道图变更通知单流程"){
			obj_this.NextView('yjs_JDTchange_ID','HelcOA.view.HasEnded.Manufacture.JDTchange');
		}
		if(record.data.processname == "供应商首批供货流程"){
			obj_this.NextView('yjs_FirstSupply_ID','HelcOA.view.HasEnded.Manufacture.FirstSupply');
		}
		//上海
		if(record.data.processname == "上海会议室申请流程"){
			obj_this.NextView('yjs_SHMeeting_ID','HelcOA.view.HasEnded.ShangHai.SHMeeting');
		}
		if(record.data.processname == "上海出差申请"){
			obj_this.NextView('yjs_SHtravelRequest_ID','HelcOA.view.HasEnded.ShangHai.SHtravelRequest');
		}
		if(record.data.processname == "上海印章申请"){
			obj_this.NextView('yjs_SHSignet_ID','HelcOA.view.HasEnded.ShangHai.SHSignet');
		}
		if(record.data.processname == "上海请休假申请流程"){
			obj_this.NextView('yjs_SHVocation_ID','HelcOA.view.HasEnded.ShangHai.SHVocation');
		}
		if(record.data.processname == "上海转岗申请"){
			obj_this.NextView('yjs_SHTransfer_ID','HelcOA.view.HasEnded.ShangHai.SHTransfer');
		}
		if(record.data.processname == "上海合同审批申请"){
			obj_this.NextView('yjs_SHContractApproval_id','HelcOA.view.HasEnded.ShangHai.SHContractApproval');
		}
		if(record.data.processname == "上海用车申请"){
			obj_this.NextView('yjs_SHApplicationForCar_id','HelcOA.view.HasEnded.ShangHai.SHApplicationForCar');
		}
		if(record.data.processname == "上海年度计划外培训申请流程"){
			obj_this.NextView('yjs_SHOutAnnualPlan_id','HelcOA.view.HasEnded.ShangHai.SHOutAnnualPlan');
		}
		if(record.data.processname == "上海品质异常处理流程"){
			obj_this.NextView('yjs_SHAbnormalQuality_id','HelcOA.view.HasEnded.ShangHai.SHAbnormalQuality');
		}
		//成都
		if(record.data.processname == "成都出差申请"){
			obj_this.NextView('yjs_CDtravelRequest_ID','HelcOA.view.HasEnded.ChengDu.CDtravelRequest');
		}
		if(record.data.processname == "成都公务用车申请"){
			obj_this.NextView('yjs_CDcar_ID','HelcOA.view.HasEnded.ChengDu.CDcar');
		}
		if(record.data.processname == "成都会议室申请"){
			obj_this.NextView('yjs_CDMeeting_ID','HelcOA.view.HasEnded.ChengDu.CDMeeting');
		}
		if(record.data.processname == "成都发文流程"){
			obj_this.NextView('yjs_CDDispatch_ID','HelcOA.view.HasEnded.ChengDu.CDDispatch');
		}
		if(record.data.processname == "成都培训设施使用流程"){
			obj_this.NextView('yjs_CDTrainingFacility_id','HelcOA.view.HasEnded.ChengDu.CDTrainingFacility');
		}
		if(record.data.processname == "成都请休假流程"){
			obj_this.NextView('yjs_CDApplicationForLeave_id','HelcOA.view.HasEnded.ChengDu.CDApplicationForLeave');
		}
		if(record.data.processname == "成都年度计划外培训"){
			obj_this.NextView('yjs_CDOutAnnualPlan_id','HelcOA.view.HasEnded.ChengDu.CDOutAnnualPlan');
		}
		if(record.data.processname == "成都合同审批流程"){
			obj_this.NextView('yjs_CDcontract_ID','HelcOA.view.HasEnded.ChengDu.CDcontract');
		}
		if(record.data.processname == "成都接待客户流程"){
			obj_this.NextView('yjs_CDclientReception_ID','HelcOA.view.HasEnded.ChengDu.CDclientReception');
		}
		if(record.data.processname == "成都用印申请流程"){
			obj_this.NextView('yjs_CDSignature_ID','HelcOA.view.HasEnded.ChengDu.CDSignature');
		}
		if(record.data.processname == "成都人员转调岗流程"){
			obj_this.NextView('yjs_CDStaffTransfer_ID','HelcOA.view.HasEnded.ChengDu.CDStaffTransfer');
		}
		if(record.data.processname == "成都档案借阅申请流程"){
			obj_this.NextView('yjs_CDFileBorrowingOrCopy_id','HelcOA.view.HasEnded.ChengDu.CDFileBorrowingOrCopy');
		}
		if(record.data.processname == "基建报修"){
			obj_this.NextView('yjs_CDInfrastructure_id','HelcOA.view.HasEnded.ChengDu.CDInfrastructure');
		}
		if(record.data.processname == "成都规章制度"){
			obj_this.NextView('yjs_CDRegulation_id','HelcOA.view.HasEnded.ChengDu.CDRegulation');
		}
		//扶梯
		if(record.data.processname == "扶梯出差申请"){
			obj_this.NextView('yjs_FTtravelRequest_ID','HelcOA.view.HasEnded.FuTi.FTtravelRequest');
		}
		if(record.data.processname == "扶梯公积金申请"){
			obj_this.NextView('yjs_FTFundApply_ID','HelcOA.view.HasEnded.FuTi.FTFundApply');
		}
		if(record.data.processname == "扶梯公司发文流程"){
			obj_this.NextView('yjs_FTDispatch_ID','HelcOA.view.HasEnded.FuTi.FTDispatch');
		}
		if(record.data.processname == "扶梯境外出差申请"){
			obj_this.NextView('yjs_FTOverseasTrip_ID','HelcOA.view.HasEnded.FuTi.FTOverseasTrip');
		}
		if(record.data.processname == "扶梯用印申请"){
			obj_this.NextView('yjs_FTSealApplication_id','HelcOA.view.HasEnded.FuTi.FTSealApplication');
		}
		if(record.data.processname == "扶梯供应商首批供货流程"){
			obj_this.NextView('yjs_FTSupplyInCirculation_id','HelcOA.view.HasEnded.FuTi.FTSupplyInCirculation');
		}
		if(record.data.processname == "扶梯采购价格变更审批"){
			obj_this.NextView('yjs_FTMaterialPurchasing_id','HelcOA.view.HasEnded.FuTi.FTMaterialPurchasing');
		}
		if(record.data.processname == "扶梯欠料发货电子流程"){
			obj_this.NextView('yjs_FTLessMaterial_id','HelcOA.view.HasEnded.FuTi.FTLessMaterial');
		}
		//财经
		if(record.data.processname == "营分司用款申请流程"){
			obj_this.NextView('yjs_CWApplyForFees_id','HelcOA.view.HasEnded.finance.CWApplyForFees');
		}
		if(record.data.processname == "营分司固定资产申请流程"){
			obj_this.NextView('yjs_CWPurchaseOfAssets_id','HelcOA.view.HasEnded.finance.CWPurchaseOfAssets');
		}

		if(record.data.processname == "采购价格变更审批管理"){
			obj_this.NextView('yjs_CWMaterialPurchasing_id','HelcOA.view.HasEnded.finance.CWMaterialPurchasing');
		}
	}
}); 