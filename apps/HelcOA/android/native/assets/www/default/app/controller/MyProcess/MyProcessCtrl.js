
/* JavaScript content from app/controller/MyProcess/MyProcessCtrl.js in folder common */
/**
 * 已审批-工作联络书
 */
 Ext.define('HelcOA.controller.MyProcess.MyProcessCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'wdlc_MyProcess_id',
	config:{
		control:{
			"list#wdlc_MyProcessList":{
				itemtap:'wdlc_MyProcessList'
			},
		}	
	},
	wdlc_MyProcessList:function(obj, index, target, record, e, eOpts){
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
//			if(record.data.proc_name_dist == "工作联络书"){
				
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
//			}
				//zhj 10
				var fjstore = Ext.data.StoreManager.get("jobContactBook_ck_Store");
				if (!fjstore) {
					fjstore = Ext.create("HelcOA.store.ForApprovalProcess.DailyOffice.jobContactBook_ck_Store");
				}
				
				var sj=[];
				sj=filenames;
				console.log("zhaaa"+filenames);
//				for(var i=1;i<3;i++){
//				var datas={};
//				datas.base64src='';
//				datas.src='';
//				datas.filename=i+'.jpg';
//				sj[i-1]=datas;
//				}
				var length=sj.length;
//				alert("hehe"+data);
				//fjstore.setData(jsonObj.filename);					
				fjstore.setData(sj);
				//Ext.getCmp('picture_listV_ck').setHeight(length==0?0:(length+1)*35);
				//console.log("haha");
		};
		
		var myParam = [_vt,obj_piid];
		var params = {};
		params.adpName = 'HttpAdapter_BPM';
		params.prodNmae = 'examine';
		params.prmName = myParam;
		obj_this.connectServerComm(getResult,params);
		
		
		//跳转页面
		if(record.data.proc_name_dist == "工作联络书"){
			obj_this.NextView('wdlc_jobContactBook_ID','HelcOA.view.MyProcess.DailyOffice.jobContactBook');
		}
		if(record.data.proc_name_dist == "出差申请"){
			obj_this.NextView('wdlc_travelRequest_ID','HelcOA.view.MyProcess.DailyOffice.travelRequest');
		}
		if(record.data.proc_name_dist == "公务用车联络流程"){
			obj_this.NextView('wdlc_governmentCar_ID','HelcOA.view.MyProcess.DailyOffice.governmentCar');
		}
		if(record.data.proc_name_dist == "合同校正章(1)用印申请"){
			obj_this.NextView('wdlc_contractStamp_ID','HelcOA.view.MyProcess.DailyOffice.contractStamp');
		}
		if(record.data.proc_name_dist == "用印申请"){
			obj_this.NextView('wdlc_useStamp_ID','HelcOA.view.MyProcess.DailyOffice.useStamp');
		}
		if(record.data.proc_name_dist == "内部法律咨询流程"){
			obj_this.NextView('wdlc_InternalLegalAdvisoryElectronFlow_ID','HelcOA.view.MyProcess.DailyOffice.InternalLegalAdvisoryElectronFlow');
		}
		if(record.data.proc_name_dist == "境外出差申请"){
			obj_this.NextView('wdlc_OverseasTrip_ID','HelcOA.view.MyProcess.DailyOffice.OverseasTrip');
		}
		if(record.data.proc_name_dist == "法人授权"){
			obj_this.NextView('wdlc_LegalAuthorization_id','HelcOA.view.MyProcess.DailyOffice.LegalAuthorization');
		}
		if(record.data.proc_name_dist == "公司对外合同审批流程"){
			obj_this.NextView('wdlc_contractExamine_ID','HelcOA.view.MyProcess.DailyOffice.contractExamine');
		}
		if(record.data.proc_name_dist == "物业公司对外合同审批流程"){
			obj_this.NextView('wdlc_propertyContractExamine_ID','HelcOA.view.MyProcess.DailyOffice.propertyContractExamine');
		}
		if(record.data.proc_name_dist == "会议室申请流程"){
			obj_this.NextView('wdlc_MeetingRoomReservationTable_id','HelcOA.view.MyProcess.DailyOffice.MeetingRoomReservationTable');
		}
		if(record.data.proc_name_dist == "公司发文流程"){
			obj_this.NextView('wdlc_companyOutgoing_ID','HelcOA.view.MyProcess.DailyOffice.companyOutgoing');
		}
		if(record.data.proc_name_dist == "视频设备申请"){
			obj_this.NextView('wdlc_VideoEquipmentApplicationForm_ID','HelcOA.view.MyProcess.DailyOffice.VideoEquipmentApplicationForm');
		}
		if(record.data.proc_name_dist == "接待客户工作联络流程"){
			obj_this.NextView('wdlc_CustomerReception_ID','HelcOA.view.MyProcess.DailyOffice.CustomerReception');
		}
		if(record.data.proc_name_dist == "公司规章制度审批流程"){
			obj_this.NextView('wdlc_rulesAndRegulations_ID','HelcOA.view.MyProcess.DailyOffice.rulesAndRegulations');
		}
		if(record.data.proc_name_dist == "投资公司经理出差申请流程"){
			obj_this.NextView('wdlc_investManager_ID','HelcOA.view.MyProcess.DailyOffice.investManager');
		}
		if(record.data.proc_name_dist == "PO单审核"){
			obj_this.NextView('wdlc_POFormExamine_ID','HelcOA.view.MyProcess.POFormExamine');
			obj_this.getApplication().getController('ForApprovalProcess.DailyOffice.POFormExamineCtrl').initPOForm();
		}
		//分类：营业/工程业务
		if(record.data.proc_name_dist == "维修改造工程业务联络流程"){
			obj_this.NextView('wdlc_MaintainTransformView_ID','HelcOA.view.MyProcess.BusinessService.MaintainTransformView');
		}
		if(record.data.proc_name_dist == "非标报告作业处理流程"){
			obj_this.NextView('wdlc_nonstandardWork_id','HelcOA.view.MyProcess.BusinessService.nonstandardWork');
		}
		if(record.data.proc_name_dist == "诉讼审批流程"){
			obj_this.NextView('wdlc_litigationApprove_id','HelcOA.view.MyProcess.BusinessService.litigationApprove');
		}
		if(record.data.proc_name_dist == "开具发票"){
			obj_this.NextView('wdlc_Invoice_id','HelcOA.view.MyProcess.BusinessService.Invoice');
		}
		if(record.data.proc_name_dist == "律师函审批流程"){
			obj_this.NextView('wdlc_litigationApprove_id','HelcOA.view.MyProcess.BusinessService.Legistimate');
		}
		if(record.data.proc_name_dist == "诉讼和解审批流程"){
			obj_this.NextView('wdlc_litigationApplyandRemove_id','HelcOA.view.MyProcess.BusinessService.litigationApplyandRemove');
		}
		if(record.data.proc_name_dist == "短交货期流程"){
			obj_this.NextView('wdlc_bussinessShortDateDelivery_id','HelcOA.view.MyProcess.BusinessService.bussinessShortDateDelivery');
		}
		if(record.data.proc_name_dist == "短安装期联络工作流程"){
			obj_this.NextView('wdlc_bussinessShortDateInstall_id','HelcOA.view.MyProcess.BusinessService.bussinessShortDateInstall');
		}
		if(record.data.proc_name_dist == "电梯_扶梯发货计划"){
			obj_this.NextView('wdlc_elevatordeliveryplan_id','HelcOA.view.MyProcess.BusinessService.elevatordeliveryplan');
		}
		if(record.data.proc_name_dist == "非正常发货要求联络书流程"){
			obj_this.NextView('wdlc_abnormaldelivery_id','HelcOA.view.MyProcess.BusinessService.abnormaldelivery');
		}
		//分类：提案管理流程
		if(record.data.proc_name_dist == "提案管理流程"){
			obj_this.NextView('wdlc_PM_TAGLLC_NG_id','HelcOA.view.MyProcess.ProposalManage.PM_TAGLLC_NG');
		}
		//分类：质量控制
		if(record.data.proc_name_dist == "三包申请报告"){
			obj_this.NextView('wdlc_ThreeGuarantees_id','HelcOA.view.MyProcess.QualityControl.ThreeGuarantees');
		}
		if(record.data.proc_name_dist == "开箱补缺件及不良问题反馈报告"){
			obj_this.NextView('wdlc_KXBQJView_id','HelcOA.view.MyProcess.QualityControl.KXBQJView');
		}
		if(record.data.proc_name_dist == "公司级投诉处理流程"){
			obj_this.NextView('wdlc_ComplatinSheet_id','HelcOA.view.MyProcess.QualityControl.ComplatinSheet');
		}
		if(record.data.proc_name_dist == "欠料发货电子流程"){
			obj_this.NextView('wdlc_StockoutsDelivery_id','HelcOA.view.MyProcess.QualityControl.StockoutsDelivery');
		}
		//分类：人力资源
		if(record.data.proc_name_dist == "丧假申请流程（派驻人员专用）"){
			obj_this.NextView('wdlc_FuneralLeave_id','HelcOA.view.MyProcess.humanresources.FuneralLeave');
		}
		if(record.data.proc_name_dist == "人员转_调岗申请"){
			obj_this.NextView('wdlc_StaffTransfer_id','HelcOA.view.MyProcess.humanresources.StaffTransfer');
		}
		if(record.data.proc_name_dist == "公积金申请"){
			obj_this.NextView('wdlc_FundApply_id','HelcOA.view.MyProcess.humanresources.FundApply');
		}
		if(record.data.proc_name_dist == "培训设施借用流程"){
			obj_this.NextView('wdlc_trainingEquipmentsBorrowing','HelcOA.view.MyProcess.humanresources.trainingEquipmentsBorrowing');
		}
		if(record.data.proc_name_dist == "婚假_产假申请流程（派驻人员专用）"){
			obj_this.NextView('wdlc_MarriageLeave_id','HelcOA.view.MyProcess.humanresources.MarriageLeave');
		}
		if(record.data.proc_name_dist == "探亲假申请流程"){
			obj_this.NextView('wdlc_HomeLeave_id','HelcOA.view.MyProcess.humanresources.HomeLeave');
		}
		//信息技术
		if(record.data.proc_name_dist == "PDA系统账号流程"){
			obj_this.NextView('wdlc_PDAaccount_id','HelcOA.view.MyProcess.InformationTechnology.PDAaccount');
		}
		if(record.data.proc_name_dist == "PDA系统设备新增或维修流程"){
			obj_this.NextView('wdlc_PDAEquipment_id','HelcOA.view.MyProcess.InformationTechnology.PDAEquipment');
		}
		if(record.data.proc_name_dist == "数据维护申请流程"){
			obj_this.NextView('wdlc_DataMaintenance_id','HelcOA.view.MyProcess.InformationTechnology.DataMaintenance');
		}
		if(record.data.proc_name_dist == "应届毕业生实习培训计划流程"){
			obj_this.NextView('wdlc_GraduatesTraining_ID','HelcOA.view.MyProcess.humanresources.GraduatesTraining');
		}
		if(record.data.proc_name_dist == "软件维护申请流程"){
			obj_this.NextView('wdlc_softwarevindicate_id','HelcOA.view.MyProcess.InformationTechnology.softwarevindicate');
		}
		if(record.data.proc_name_dist == "年度计划外培训需求申请流程"){
			obj_this.NextView('wdlc_YearPlan_id','HelcOA.view.MyProcess.humanresources.YearPlan');
		}
		if(record.data.proc_name_dist == "用户权限申请流程"){
			obj_this.NextView('wdlc_Permissions_ID','HelcOA.view.MyProcess.InformationTechnology.Permissions');
		}
		if(record.data.proc_name_dist == "设备_配件借用申请流程"){
			obj_this.NextView('wdlc_ITAccessoriesApplication_id','HelcOA.view.MyProcess.InformationTechnology.ITAccessoriesApplication');
		}
		//天津
		if(record.data.proc_name_dist == "天津合同审批流程"){
			obj_this.NextView('wdlc_Contractaudit_id','HelcOA.view.MyProcess.TianJin.Contractaudit');
		}
		if(record.data.proc_name_dist == "天津公务用车申请流程"){
			obj_this.NextView('wdlc_TJCar_id','HelcOA.view.MyProcess.TianJin.TJCar');
		}
		if(record.data.proc_name_dist == "天津用印申请"){
			obj_this.NextView('wdlc_TJSignet_id','HelcOA.view.MyProcess.TianJin.TJSignet');
		}
		if(record.data.proc_name_dist == "天津设备_配件借用申请流程"){
			obj_this.NextView('wdlc_TJAccessoriesApplication_id','HelcOA.view.MyProcess.TianJin.TJAccessoriesApplication');
		}
		//信息
		if(record.data.proc_name_dist == "档案借阅或复印申请流程"){
			obj_this.NextView('wdlc_FileBorrowingOrCopy_ID','HelcOA.view.MyProcess.Technology.FileBorrowingOrCopy');
		}
		if(record.data.proc_name_dist == "天津公司发文流程"){
			obj_this.NextView('wdlc_TJDispatch_id','HelcOA.view.MyProcess.TianJin.TJDispatch');
		}
		if(record.data.proc_name_dist == "天津合理化提案流程"){
			obj_this.NextView('wdlc_TJProposal_id','HelcOA.view.MyProcess.TianJin.TJProposal');
		}
		if(record.data.proc_name_dist == "天津出差申请"){
			obj_this.NextView('wdlc_TJtravelRequest_ID','HelcOA.view.MyProcess.TianJin.TJtravelRequest');
		}
		if(record.data.proc_name_dist == "天津产品退货流程"){
			obj_this.NextView('wdlc_TJreturn_ID','HelcOA.view.MyProcess.TianJin.TJreturn');
		}
		if(record.data.proc_name_dist == "天津IT故障申告流程"){
			obj_this.NextView('wdlc_TJITBDapplicationForm_ID','HelcOA.view.MyProcess.TianJin.TJITBDapplicationForm');
		}
		if(record.data.proc_name_dist == "天津电脑资料用户申请"){
			obj_this.NextView('wdlc_TJClientInform_ID','HelcOA.view.MyProcess.TianJin.TJClientInform');
		}
		if(record.data.proc_name_dist == "天津信息系统帐号权限申请流程"){
			obj_this.NextView('wdlc_TJInformationAccount_ID','HelcOA.view.MyProcess.TianJin.TJInformationAccount');
		}
		if(record.data.proc_name_dist == "天津软件维护流程"){
			obj_this.NextView('wdlc_TJSoftwareMaintenance_id','HelcOA.view.MyProcess.TianJin.TJSoftwareMaintenance');
		}
		//制造管理
		if(record.data.proc_name_dist == "井道图变更通知单流程"){
			obj_this.NextView('wdlc_JDTchange_ID','HelcOA.view.MyProcess.Manufacture.JDTchange');
		}
		if(record.data.proc_name_dist == "供应商首批供货流程"){
			obj_this.NextView('wdlc_FirstSupply_ID','HelcOA.view.MyProcess.Manufacture.FirstSupply');
		}
		//上海
		if(record.data.proc_name_dist == "上海会议室申请流程"){
			obj_this.NextView('wdlc_SHMeeting_ID','HelcOA.view.MyProcess.ShangHai.SHMeeting');
		}
		if(record.data.proc_name_dist == "上海出差申请"){
			obj_this.NextView('wdlc_SHtravelRequest_ID','HelcOA.view.MyProcess.ShangHai.SHtravelRequest');
		}
		if(record.data.proc_name_dist == "上海印章申请"){
			obj_this.NextView('wdlc_SHSignet_ID','HelcOA.view.MyProcess.ShangHai.SHSignet');
		}
		if(record.data.proc_name_dist == "上海请休假申请流程"){
			obj_this.NextView('wdlc_SHVocation_ID','HelcOA.view.MyProcess.ShangHai.SHVocation');
		}
		if(record.data.proc_name_dist == "上海转岗申请"){
			obj_this.NextView('wdlc_SHTransfer_ID','HelcOA.view.MyProcess.ShangHai.SHTransfer');
		}
		if(record.data.proc_name_dist == "上海合同审批申请"){
			obj_this.NextView('wdlc_SHContractApproval_id','HelcOA.view.MyProcess.ShangHai.SHContractApproval');
		}
		if(record.data.proc_name_dist == "上海用车申请"){
			obj_this.NextView('wdlc_SHApplicationForCar_id','HelcOA.view.MyProcess.ShangHai.SHApplicationForCar');
		}
		if(record.data.proc_name_dist == "上海年度计划外培训申请流程"){
			obj_this.NextView('wdlc_SHOutAnnualPlan_id','HelcOA.view.MyProcess.ShangHai.SHOutAnnualPlan');
		}
		if(record.data.proc_name_dist == "上海品质异常处理流程"){
			obj_this.NextView('wdlc_SHAbnormalQuality_id','HelcOA.view.MyProcess.ShangHai.SHAbnormalQuality');
		}
		//成都
		if(record.data.proc_name_dist == "成都出差申请"){
			obj_this.NextView('wdlc_CDtravelRequest_ID','HelcOA.view.MyProcess.ChengDu.CDtravelRequest');
		}
		if(record.data.proc_name_dist == "成都公务用车申请"){
			obj_this.NextView('wdlc_CDcar_ID','HelcOA.view.MyProcess.ChengDu.CDcar');
		}
		if(record.data.proc_name_dist == "成都会议室申请"){
			obj_this.NextView('wdlc_CDMeeting_ID','HelcOA.view.MyProcess.ChengDu.CDMeeting');
		}
		if(record.data.proc_name_dist == "成都发文流程"){
			obj_this.NextView('wdlc_CDDispatch_ID','HelcOA.view.MyProcess.ChengDu.CDDispatch');
		}
		if(record.data.proc_name_dist == "成都培训设施使用流程"){
			obj_this.NextView('wdlc_CDTrainingFacility_id','HelcOA.view.MyProcess.ChengDu.CDTrainingFacility');
		}
		if(record.data.proc_name_dist == "成都请休假流程"){
			obj_this.NextView('wdlc_CDApplicationForLeave_id','HelcOA.view.MyProcess.ChengDu.CDApplicationForLeave');
		}
		if(record.data.proc_name_dist == "成都年度计划外培训"){
			obj_this.NextView('wdlc_CDOutAnnualPlan_id','HelcOA.view.MyProcess.ChengDu.CDOutAnnualPlan');
		}
		if(record.data.proc_name_dist == "成都合同审批流程"){
			obj_this.NextView('wdlc_CDcontract_ID','HelcOA.view.MyProcess.ChengDu.CDcontract');
		}
		if(record.data.proc_name_dist == "成都接待客户流程"){
			obj_this.NextView('wdlc_CDclientReception_ID','HelcOA.view.MyProcess.ChengDu.CDclientReception');
		}
		if(record.data.proc_name_dist == "成都用印申请流程"){
			obj_this.NextView('wdlc_CDSignature_ID','HelcOA.view.MyProcess.ChengDu.CDSignature');
		}
		if(record.data.proc_name_dist == "成都人员转调岗流程"){
			obj_this.NextView('wdlc_CDStaffTransfer_ID','HelcOA.view.MyProcess.ChengDu.CDStaffTransfer');
		}
		if(record.data.proc_name_dist == "成都档案借阅申请流程"){
			obj_this.NextView('wdlc_CDFileBorrowingOrCopy_ID','HelcOA.view.MyProcess.ChengDu.CDFileBorrowingOrCopy');
		}
		if(record.data.proc_name_dist == "基建报修"){
			obj_this.NextView('wdlc_CDInfrastructure_id','HelcOA.view.MyProcess.ChengDu.CDInfrastructure');
		}
		if(record.data.proc_name_dist == "成都规章制度"){
			obj_this.NextView('wdlc_CDRegulation_id','HelcOA.view.MyProcess.ChengDu.CDRegulation');
		}
		//扶梯
		if(record.data.proc_name_dist == "扶梯出差申请"){
			obj_this.NextView('wdlc_FTtravelRequest_ID','HelcOA.view.MyProcess.FuTi.FTtravelRequest');
		}
		if(record.data.proc_name_dist == "扶梯公积金申请"){
			obj_this.NextView('wdlc_FTFundApply_ID','HelcOA.view.MyProcess.FuTi.FTFundApply');
		}
		if(record.data.proc_name_dist == "扶梯公司发文流程"){
			obj_this.NextView('wdlc_FTDispatch_ID','HelcOA.view.MyProcess.FuTi.FTDispatch');
		}
		if(record.data.proc_name_dist == "扶梯境外出差申请"){
			obj_this.NextView('wdlc_FTOverseasTrip_ID','HelcOA.view.MyProcess.FuTi.FTOverseasTrip');
		}
		if(record.data.proc_name_dist == "扶梯用印申请"){
			obj_this.NextView('wdlc_FTSealApplication_id','HelcOA.view.MyProcess.FuTi.FTSealApplication');
		}
		if(record.data.proc_name_dist == "扶梯供应商首批供货流程"){
			obj_this.NextView('wdlc_FTSupplyInCirculation_id','HelcOA.view.MyProcess.FuTi.FTSupplyInCirculation');
		}
		if(record.data.proc_name_dist == "扶梯采购价格变更审批"){
			obj_this.NextView('wdlc_FTMaterialPurchasing_id','HelcOA.view.MyProcess.FuTi.FTMaterialPurchasing');
		}
		if(record.data.proc_name_dist == "扶梯欠料发货电子流程"){
			obj_this.NextView('wdlc_FTLessMaterial_id','HelcOA.view.MyProcess.FuTi.FTLessMaterial');
		}
		//财务
		if(record.data.proc_name_dist == "用款申请流程"){
			obj_this.NextView('wdlc_CWApplyForFees_id','HelcOA.view.MyProcess.finance.CWApplyForFees');
		}
		if(record.data.proc_name_dist == "营分司固定资产申请流程"){
			obj_this.NextView('wdlc_CWPurchaseOfAssets_id','HelcOA.view.MyProcess.finance.CWPurchaseOfAssets');
		}
		if(record.data.proc_name_dist == "采购价格变更审批管理"){
			obj_this.NextView('wdlc_CWMaterialPurchasing_id','HelcOA.view.MyProcess.finance.CWMaterialPurchasing');
		}
	}
}); 