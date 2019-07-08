
/* JavaScript content from app/controller/Approved/ApprovedCtrl.js in folder common */
/**
 * 已审批-工作联络书
 */
 Ext.define('HelcOA.controller.Approved.ApprovedCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'ysp_Approved_id',
	config:{
		control:{
			"list#ysp_ApprovedList":{
				itemtap:'ysp_ApprovedList'
			},
		}	
	},
	ysp_ApprovedList:function(obj, index, target, record, e, eOpts){
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
				if(record.data.proc_name_dist=='系统网络账号权限申请'){
					cc.log("test"+Ext.getCmp('zhtype').getValue());
					cc.log("------+++++++++++_______");
					var outcome=[];
					outcome=Ext.getCmp('zhtype').getValue().split(",");
					for(var i=0;i<outcome.length;i++) {
						if(outcome[i]=='1'){
							outcome[i]='网络帐号';
						}else if(outcome[i]=='2'){
							outcome[i]='OA邮件帐号';
						}else if(outcome[i]=='3'){
							outcome[i]='OA邮件外发权限';
						}else if(outcome[i]=='15'){
							outcome[i]='ERP账号';
						}else if(outcome[i]=='13'){
							outcome[i]='技术联络单系统帐号';
						}else if(outcome[i]=='24'){
							outcome[i]='日立智能装饰选型系统';
						}else if(outcome[i]=='9'){
							outcome[i]='彩色打印权限';
						}else if(outcome[i]=='10'){
							outcome[i]='PLM系统帐号';
						}else if(outcome[i]=='16'){
							outcome[i]='视频网络帐号';
						}else if(outcome[i]=='21'){
							outcome[i]='彩色复印权限';
						}else if(outcome[i]=='17'){
							outcome[i]='井道图系统';
						}else if(outcome[i]=='12'){
							outcome[i]='Siebel系统帐号';
						}else if(outcome[i]=='19'){
							outcome[i]='EPD参数化系统';
						}else if(outcome[i]=='14'){
							outcome[i]='MRP2账号';
						}else if(outcome[i]=='18'){
							outcome[i]='HEDS系统';
						}else if(outcome[i]=='25'){
							outcome[i]='edoc文档系统';
						}else if(outcome[i]=='7'){
							outcome[i]='远程终端帐号';
						}else if(outcome[i]=='4'){
							outcome[i]='公用机Internet浏览权限';
						}
					}
					Ext.getCmp('zhtype').setValue(outcome);
					if(Ext.getCmp('zhtype1').getValue()=='20'){
						Ext.getCmp('zhtype1').setValue('RDMP研发管理平台');
					}
					if(Ext.getCmp('zhtype2').getValue()=='22'){
						Ext.getCmp('zhtype2').setValue("E-HR系统");
					}
					if(Ext.getCmp('zhtype3').getValue()=='23'){
						Ext.getCmp('zhtype3').setValue("财务预算系统");
					}
				};
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
				console.log("haha");
				
		};
		
		var myParam = [_vt,obj_piid];
		var params = {};
		params.adpName = 'HttpAdapter_BPM';
		params.prodNmae = 'examine';
		params.prmName = myParam;
		obj_this.connectServerComm(getResult,params);
		
		//跳转页面
		//分类:日常办公
		if(record.data.proc_name_dist == "工作联络书"){
			obj_this.NextView('ysp_jobContactBook_ID','HelcOA.view.Approved.DailyOffice.jobContactBook');
		}
		if(record.data.proc_name_dist == "出差申请"){
			obj_this.NextView('ysp_travelRequest_ID','HelcOA.view.Approved.DailyOffice.travelRequest');
		}
		if(record.data.proc_name_dist == "公务用车联络流程"){
			obj_this.NextView('ysp_governmentCar_ID','HelcOA.view.Approved.DailyOffice.governmentCar');
		}
		if(record.data.proc_name_dist == "合同校正章(1)用印申请"){
			obj_this.NextView('ysp_contractStamp_ID','HelcOA.view.Approved.DailyOffice.contractStamp');
		}
		if(record.data.proc_name_dist == "用印申请"){
			obj_this.NextView('ysp_useStamp_ID','HelcOA.view.Approved.DailyOffice.useStamp');
		}
		if(record.data.proc_name_dist == "内部法律咨询流程"){
			obj_this.NextView('ysp_InternalLegalAdvisoryElectronFlow_ID','HelcOA.view.Approved.DailyOffice.InternalLegalAdvisoryElectronFlow');
		}
		if(record.data.proc_name_dist == "境外出差申请"){
			obj_this.NextView('ysp_OverseasTrip_ID','HelcOA.view.Approved.DailyOffice.OverseasTrip');
		}
		if(record.data.proc_name_dist == "法人授权"){
			obj_this.NextView('ysp_LegalAuthorization_id','HelcOA.view.Approved.DailyOffice.LegalAuthorization');
		}
		if(record.data.proc_name_dist == "公司对外合同审批流程"){
			obj_this.NextView('ysp_contractExamine_ID','HelcOA.view.Approved.DailyOffice.contractExamine');
		}
		if(record.data.proc_name_dist == "物业公司对外合同审批流程"){
			obj_this.NextView('ysp_propertyContractExamine_ID','HelcOA.view.Approved.DailyOffice.propertyContractExamine');
		}
		if(record.data.proc_name_dist == "会议室申请流程"){
			obj_this.NextView('ysp_MeetingRoomReservationTable_ID','HelcOA.view.Approved.DailyOffice.MeetingRoomReservationTable');
		}
		if(record.data.proc_name_dist == "公司发文流程"){
			obj_this.NextView('ysp_companyOutgoing_ID','HelcOA.view.Approved.DailyOffice.companyOutgoing');
		}
		if(record.data.proc_name_dist == "视频设备申请"){
			obj_this.NextView('ysp_VideoEquipmentApplicationForm_ID','HelcOA.view.Approved.DailyOffice.VideoEquipmentApplicationForm');
		}
		if(record.data.proc_name_dist == "接待客户工作联络流程"){
			obj_this.NextView('ysp_CustomerReception_ID','HelcOA.view.Approved.DailyOffice.CustomerReception');
		}
		if(record.data.proc_name_dist == "公司规章制度审批流程"){
			obj_this.NextView('ysp_rulesAndRegulations_ID','HelcOA.view.Approved.DailyOffice.rulesAndRegulations');
		}
		if(record.data.proc_name_dist == "投资公司经理出差申请流程"){
			obj_this.NextView('ysp_investManager_ID','HelcOA.view.Approved.DailyOffice.investManager');
		}
		if(record.data.proc_name_dist == "PO单审核"){
			obj_this.NextView('ysp_POFormExamine_ID','HelcOA.view.Approved.POFormExamine');
			obj_this.getApplication().getController('ForApprovalProcess.DailyOffice.POFormExamineCtrl').initPOForm();
		}
		//分类：营业/工程业务
		if(record.data.proc_name_dist == "维修改造工程业务联络流程"){
			obj_this.NextView('ysp_MaintainTransformView_ID','HelcOA.view.Approved.BusinessService.MaintainTransformView');
		}
		if(record.data.proc_name_dist == "非标报告作业处理流程"){
			obj_this.NextView('ysp_nonstandardWork_id','HelcOA.view.Approved.BusinessService.nonstandardWork');
		}
		if(record.data.proc_name_dist == "诉讼审批流程"){
			obj_this.NextView('ysp_litigationApprove_id','HelcOA.view.Approved.BusinessService.litigationApprove');
		}
		if(record.data.proc_name_dist == "开具发票"){
			obj_this.NextView('ysp_Invoice_id','HelcOA.view.Approved.BusinessService.Invoice');
		}
		if(record.data.proc_name_dist == "律师函审批流程"){
			obj_this.NextView('ysp_Legistimate_id','HelcOA.view.Approved.BusinessService.Legistimate');
		}
		if(record.data.proc_name_dist == "诉讼和解审批流程"){
			obj_this.NextView('ysp_litigationApplyandRemove_id','HelcOA.view.Approved.BusinessService.litigationApplyandRemove');
		}
		if(record.data.proc_name_dist == "短交货期流程"){
			obj_this.NextView('ysp_bussinessShortDateDelivery_id','HelcOA.view.Approved.BusinessService.bussinessShortDateDelivery');
		}
		if(record.data.proc_name_dist == "短安装期联络工作流程"){
			obj_this.NextView('ysp_bussinessShortDateInstall_id','HelcOA.view.Approved.BusinessService.bussinessShortDateInstall');
		}
		if(record.data.proc_name_dist == "电梯_扶梯发货计划"){
			obj_this.NextView('ysp_elevatordeliveryplan_id','HelcOA.view.Approved.BusinessService.elevatordeliveryplan');
		}
		if(record.data.proc_name_dist == "非正常发货要求联络书流程"){
			obj_this.NextView('ysp_abnormaldelivery_id','HelcOA.view.Approved.BusinessService.abnormaldelivery');
		}
		//分类：提案管理流程
		if(record.data.proc_name_dist == "提案管理流程"){
			obj_this.NextView('ysp_PM_TAGLLC_NG_id','HelcOA.view.Approved.ProposalManage.PM_TAGLLC_NG');
		}
		//分类：质量控制
		if(record.data.proc_name_dist == "三包申请报告"){
			obj_this.NextView('ysp_ThreeGuarantees_id','HelcOA.view.Approved.QualityControl.ThreeGuarantees');
		}
		if(record.data.proc_name_dist == "开箱补缺件及不良问题反馈报告"){
			obj_this.NextView('ysp_KXBQJView_id','HelcOA.view.Approved.QualityControl.KXBQJView');
		}
		if(record.data.proc_name_dist == "公司级投诉处理流程"){
			obj_this.NextView('ysp_ComplatinSheet_id','HelcOA.view.Approved.QualityControl.ComplatinSheet');
		}
		if(record.data.proc_name_dist == "欠料发货电子流程"){
			obj_this.NextView('ysp_StockoutsDelivery_id','HelcOA.view.Approved.QualityControl.StockoutsDelivery');
		}
		//分类：人力资源
		if(record.data.proc_name_dist == "丧假申请流程（派驻人员专用）"){
			obj_this.NextView('ysp_FuneralLeave_id','HelcOA.view.Approved.humanresources.FuneralLeave');
		}
		if(record.data.proc_name_dist == "人员转_调岗申请"){
			obj_this.NextView('ysp_StaffTransfer_id','HelcOA.view.Approved.humanresources.StaffTransfer');
		}
		if(record.data.proc_name_dist == "公积金申请"){
			obj_this.NextView('ysp_FundApply_id','HelcOA.view.Approved.humanresources.FundApply');
		}
		if(record.data.proc_name_dist == "培训设施借用流程"){
			obj_this.NextView('ysp_trainingEquipmentsBorrowing_id','HelcOA.view.Approved.humanresources.trainingEquipmentsBorrowing');
		}
		if(record.data.proc_name_dist == "应届毕业生实习培训计划流程"){
			obj_this.NextView('ysp_GraduatesTraining_ID','HelcOA.view.Approved.humanresources.GraduatesTraining');
		}
		if(record.data.proc_name_dist == "婚假_产假申请流程（派驻人员专用）"){
			obj_this.NextView('ysp_MarriageLeave_id','HelcOA.view.Approved.humanresources.MarriageLeave');
		}
		if(record.data.proc_name_dist == "年度计划外培训需求申请流程"){
			obj_this.NextView('ysp_YearPlan_id','HelcOA.view.Approved.humanresources.YearPlan');
		}
		if(record.data.proc_name_dist == "探亲假申请流程"){
			obj_this.NextView('ysp_HomeLeave_id','HelcOA.view.Approved.humanresources.HomeLeave');
		}
		//信息技术
		if(record.data.proc_name_dist == "PDA系统账号流程"){
			obj_this.NextView('ysp_PDAaccount_id','HelcOA.view.Approved.InformationTechnology.PDAaccount');
		}
		if(record.data.proc_name_dist == "数据维护申请流程"){
			obj_this.NextView('ysp_DataMaintenance_id','HelcOA.view.Approved.InformationTechnology.DataMaintenance');
		}
		if(record.data.proc_name_dist == "系统网络账号权限申请"){
			obj_this.NextView('ysp_systemAccount_ID','HelcOA.view.Approved.InformationTechnology.systemAccount');
		}
		if(record.data.proc_name_dist == "供应商信息维护流程"){
			obj_this.NextView('ysp_supplyment_ID','HelcOA.view.Approved.InformationTechnology.supplyment');
		}
		if(record.data.proc_name_dist == "IT故障申请流程"){
			obj_this.NextView('ysp_ITBDapplicationForm_ID','HelcOA.view.Approved.InformationTechnology.ITBDapplicationForm');
		}
		if(record.data.proc_name_dist == "数据恢复申请流程"){
			obj_this.NextView('ysp_DataRecovery_ID','HelcOA.view.Approved.InformationTechnology.DataRecovery');
		}
		if(record.data.proc_name_dist == "客户信息维护流程"){
			obj_this.NextView('ysp_clientInformation_ID','HelcOA.view.Approved.InformationTechnology.clientInformation');
		}
		if(record.data.proc_name_dist == "PDA系统设备新增或维修流程"){
			obj_this.NextView('ysp_PDAEquipment_id','HelcOA.view.Approved.InformationTechnology.PDAEquipment');
		}
		if(record.data.proc_name_dist == "软件维护申请流程"){
			obj_this.NextView('ysp_softwarevindicate_id','HelcOA.view.Approved.InformationTechnology.softwarevindicate');
		}
		if(record.data.proc_name_dist == "用户权限申请流程"){
			obj_this.NextView('ysp_surface_ID','HelcOA.view.Approved.InformationTechnology.Permissions');
		}
		if(record.data.proc_name_dist == "设备_配件借用申请流程"){
			obj_this.NextView('ysp_ITAccessoriesApplication_id','HelcOA.view.Approved.InformationTechnology.ITAccessoriesApplication');
		}
		//天津
		if(record.data.proc_name_dist == "天津公务用车申请流程"){
			obj_this.NextView('ysp_TJCar_id','HelcOA.view.Approved.TianJin.TJCar');
		}
		if(record.data.proc_name_dist == "天津合同审批流程"){
			obj_this.NextView('ysp_Contractaudit_id','HelcOA.view.Approved.TianJin.Contractaudit');
		}
		if(record.data.proc_name_dist == "天津用印申请"){
			obj_this.NextView('ysp_TJSignet_id','HelcOA.view.Approved.TianJin.TJSignet');
		}
		if(record.data.proc_name_dist == "天津公司发文流程"){
			obj_this.NextView('ysp_TJDispatch_id','HelcOA.view.Approved.TianJin.TJDispatch');
		}
		if(record.data.proc_name_dist == "天津设备_配件借用申请流程"){
			obj_this.NextView('ysp_TJAccessoriesApplication_id','HelcOA.view.Approved.TianJin.TJAccessoriesApplication');
		}
		//信息
		if(record.data.proc_name_dist == "档案借阅或复印申请流程"){
			obj_this.NextView('ysp_Contractaudit_id','HelcOA.view.Approved.TianJin.Contractaudit');
		}
		if(record.data.proc_name_dist == "天津合理化提案流程"){
			obj_this.NextView('ysp_TJProposal_id','HelcOA.view.Approved.TianJin.TJProposal');
		}
		if(record.data.proc_name_dist == "天津出差申请"){
			obj_this.NextView('ysp_TJtravelRequest_ID','HelcOA.view.Approved.TianJin.TJtravelRequest');
		}
		if(record.data.proc_name_dist == "天津产品退货流程"){
			obj_this.NextView('ysp_TJreturn_ID','HelcOA.view.Approved.TianJin.TJreturn');
		}
		if(record.data.proc_name_dist == "天津IT故障申告流程"){
			obj_this.NextView('ysp_TJITBDapplicationForm_ID','HelcOA.view.Approved.TianJin.TJITBDapplicationForm');
		}
		if(record.data.proc_name_dist == "天津电脑资料用户申请"){
			obj_this.NextView('ysp_TJClientInform_ID','HelcOA.view.Approved.TianJin.TJClientInform_ID');
		}
		if(record.data.proc_name_dist == "天津信息系统帐号权限申请流程"){
			obj_this.NextView('ysp_TJInformationAccount_ID','HelcOA.view.Approved.TianJin.TJInformationAccount');
		}
		if(record.data.proc_name_dist == "天津软件维护流程"){
			obj_this.NextView('ysp_TJSoftwareMaintenance_id','HelcOA.view.Approved.TianJin.TJSoftwareMaintenance');
		}

		//制造管理
		if(record.data.proc_name_dist == "井道图变更通知单流程"){
			obj_this.NextView('ysp_JDTchange_ID','HelcOA.view.Approved.Manufacture.JDTchange');
		}
		if(record.data.proc_name_dist == "供应商首批供货流程"){
			obj_this.NextView('ysp_FirstSupply_ID','HelcOA.view.Approved.Manufacture.FirstSupply');
		}
		//上海
		if(record.data.proc_name_dist == "上海会议室申请流程"){
			obj_this.NextView('ysp_SHMeeting_ID','HelcOA.view.Approved.ShangHai.SHMeeting');
		}
		if(record.data.proc_name_dist == "上海出差申请"){
			obj_this.NextView('ysp_SHtravelRequest_ID','HelcOA.view.Approved.ShangHai.SHtravelRequest');
		}
		if(record.data.proc_name_dist == "上海印章申请"){
			obj_this.NextView('ysp_SHSignet_ID','HelcOA.view.Approved.ShangHai.SHSignet');
		}
		if(record.data.proc_name_dist == "上海请休假申请流程"){
			obj_this.NextView('ysp_SHVocation_ID','HelcOA.view.Approved.ShangHai.SHVocation');
		}
		if(record.data.proc_name_dist == "上海转岗申请"){
			obj_this.NextView('ysp_SHTransfer_ID','HelcOA.view.Approved.ShangHai.SHTransfer');
		}
		if(record.data.proc_name_dist == "上海合同审批申请"){
			obj_this.NextView('ysp_SHContractApproval_id','HelcOA.view.Approved.ShangHai.SHContractApproval');
		}
		if(record.data.proc_name_dist == "上海用车申请"){
			obj_this.NextView('ysp_SHApplicationForCar_id','HelcOA.view.Approved.ShangHai.SHApplicationForCar');
		}
		if(record.data.proc_name_dist == "上海年度计划外培训申请流程"){
			obj_this.NextView('ysp_SHOutAnnualPlan_id','HelcOA.view.Approved.ShangHai.SHOutAnnualPlan');
		}
		if(record.data.proc_name_dist == "上海品质异常处理流程"){
			obj_this.NextView('ysp_SHAbnormalQuality_id','HelcOA.view.Approved.ShangHai.SHAbnormalQuality');
		}
		//成都
		if(record.data.proc_name_dist == "成都出差申请"){
			obj_this.NextView('ysp_CDtravelRequest_ID','HelcOA.view.Approved.ChengDu.CDtravelRequest');
		}
		if(record.data.proc_name_dist == "成都公务用车申请"){
			obj_this.NextView('ysp_CDcar_ID','HelcOA.view.Approved.ChengDu.CDcar');
		}
		if(record.data.proc_name_dist == "成都会议室申请"){
			obj_this.NextView('ysp_CDMeeting_ID','HelcOA.view.Approved.ChengDu.CDMeeting');
		}
		if(record.data.proc_name_dist == "成都发文流程"){
			obj_this.NextView('ysp_CDDispatch_ID','HelcOA.view.Approved.ChengDu.CDDispatch');
		}
		if(record.data.proc_name_dist == "成都培训设施使用流程"){
			obj_this.NextView('ysp_CDTrainingFacility_id','HelcOA.view.Approved.ChengDu.CDTrainingFacility');
		}
		if(record.data.proc_name_dist == "成都请休假流程"){
			obj_this.NextView('ysp_CDApplicationForLeave_id','HelcOA.view.Approved.ChengDu.CDApplicationForLeave');
		}
		if(record.data.proc_name_dist == "成都年度计划外培训"){
			obj_this.NextView('ysp_CDOutAnnualPlan_id','HelcOA.view.Approved.ChengDu.CDOutAnnualPlan');
		}
		if(record.data.proc_name_dist == "成都合同审批流程"){
			obj_this.NextView('ysp_CDcontract_ID','HelcOA.view.Approved.ChengDu.CDcontract');
		}
		if(record.data.proc_name_dist == "成都合同审批流程"){
			obj_this.NextView('ysp_CDclientReception_ID','HelcOA.view.Approved.ChengDu.CDclientReception');
		}
		if(record.data.proc_name_dist == "基建报修"){
			obj_this.NextView('ysp_CDInfrastructure_id','HelcOA.view.Approved.ChengDu.CDInfrastructure');
		}
		if(record.data.proc_name_dist == "成都规章制度"){
			obj_this.NextView('ysp_CDRegulation_id','HelcOA.view.Approved.ChengDu.CDRegulation');
		}
		if(record.data.proc_name_dist == "成都档案借阅申请流程"){
			obj_this.NextView('ysp_CDFileBorrowingOrCopy_id','HelcOA.view.Approved.ChengDu.CDFileBorrowingOrCopy');
		}
		if(record.data.proc_name_dist == "成都用印申请流程"){
			obj_this.NextView('ysp_CDSignature_id','HelcOA.view.Approved.ChengDu.CDSignature');
		}
		if(record.data.proc_name_dist == "成都人员转调岗流程"){
			obj_this.NextView('ysp_CDStaffTransfer_id','HelcOA.view.Approved.ChengDu.CDStaffTransfer');
		}
		//扶梯
		if(record.data.proc_name_dist == "扶梯出差申请"){
			obj_this.NextView('ysp_FTtravelRequest_ID','HelcOA.view.Approved.FuTi.FTtravelRequest');
		}
		if(record.data.proc_name_dist == "扶梯境外出差申请"){
			obj_this.NextView('ysp_FTOverseasTrip_ID','HelcOA.view.Approved.FuTi.FTOverseasTrip');
		}
		if(record.data.proc_name_dist == "扶梯公积金申请"){
			obj_this.NextView('ysp_FTFundApply_ID','HelcOA.view.Approved.FuTi.FTFundApply');
		}
		if(record.data.proc_name_dist == "扶梯公司发文流程"){
			obj_this.NextView('ysp_FTDispatch_ID','HelcOA.view.Approved.FuTi.FTDispatch');
		}
		if(record.data.proc_name_dist == "扶梯用印申请"){
			obj_this.NextView('ysp_FTSealApplication_id','HelcOA.view.Approved.FuTi.FTSealApplication');
		}
		if(record.data.proc_name_dist == "扶梯供应商首批供货流程"){
			obj_this.NextView('ysp_FTSupplyInCirculation_id','HelcOA.view.Approved.FuTi.FTSupplyInCirculation');
		}
		if(record.data.proc_name_dist == "扶梯采购价格变更审批"){
			obj_this.NextView('ysp_FTMaterialPurchasing_id','HelcOA.view.Approved.FuTi.FTMaterialPurchasing');
		}
		if(record.data.proc_name_dist == "扶梯欠料发货电子流程"){
			obj_this.NextView('ysp_FTLessMaterial_id','HelcOA.view.Approved.FuTi.FTLessMaterial');
		}
		//财务
		if(record.data.proc_name_dist == "用款申请流程"){
			obj_this.NextView('ysp_CWApplyForFees_id','HelcOA.view.Approved.finance.CWApplyForFees');
		}
		if(record.data.proc_name_dist == "营分司固定资产申请流程"){
			obj_this.NextView('ysp_CWPurchaseOfAssets_id','HelcOA.view.Approved.finance.CWPurchaseOfAssets');
		}

		if(record.data.proc_name_dist == "采购价格变更审批管理"){
			obj_this.NextView('ysp_CWMaterialPurchasing_id','HelcOA.view.Approved.finance.CWMaterialPurchasing');
		}
	},
	
}); 