/**
 * 列表页面
 */
Ext.define('HelcOA.controller.MenusCtrl',{
	extend : 'HelcOA.controller.ApplicationController',
	id : 'MenusCtrl_id',
	config : {
		control : {
			'list#ForApprovalProcess_ID' : {
				itemtap : 'ForApprovalProcess'
			},
			'button#WDLZ_ID' : {
				tap : 'WDLZ',
			},
		}
	},
	
	ForApprovalProcess : function(obj, index, target, record, e, eOpts) {
			var obj_this = this;
			store = this.getStore("MenusS_id", "HelcOA.store.MenusS");
			var data = record.data;

			cc.log("-------------------record--------------------");
			cc.log(record);

			// 判断进入哪个页面
			// 分类：日常办公
			if (data.proc_name == '出差申请') {
				this.NextView('travelRequest_ID', 'HelcOA.view.ForApprovalProcess.DailyOffice.travelRequest');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '工作联络书') {
				this.NextView('jobContactBook_ID','HelcOA.view.ForApprovalProcess.DailyOffice.jobContactBook');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '用印申请') {
				this.NextView('sp_useStamp_id', 'HelcOA.view.ForApprovalProcess.DailyOffice.useStamp');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '会议室申请流程') {
				this.NextView('sp_MeetingRoomReservationTable_id', 'HelcOA.view.ForApprovalProcess.DailyOffice.MeetingRoomReservationTable');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '合同校正章(1)用印申请') {
				returnForm = "sp_contractStamp_id";
				this.NextView('sp_contractStamp_id', 'HelcOA.view.ForApprovalProcess.DailyOffice.contractStamp');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '公务用车联络流程') {
				returnForm = "sp_governmentCar_id";
				this.NextView('sp_governmentCar_id', 'HelcOA.view.ForApprovalProcess.DailyOffice.governmentCar');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == "公司对外合同审批流程") {
				this.NextView('sp_contractExamine_ID', 'HelcOA.view.ForApprovalProcess.DailyOffice.contractExamine');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == "公司规章制度审批流程") {
				this.NextView('sp_rulesAndRegulations_ID', 'HelcOA.view.ForApprovalProcess.DailyOffice.rulesAndRegulations');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '公司发文流程') {
				this.NextView('sp_companyOutgoing_ID', 'HelcOA.view.ForApprovalProcess.DailyOffice.companyOutgoing');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '内部法律咨询流程') {
				this.NextView('sp_InternalLegalAdvisoryElectronFlow_ID', 'HelcOA.view.ForApprovalProcess.DailyOffice.InternalLegalAdvisoryElectronFlow');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '物业公司对外合同审批流程') {
				this.NextView('sp_propertyContractExamine_ID', 'HelcOA.view.ForApprovalProcess.DailyOffice.propertyContractExamine');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '接待客户工作联络流程') {
				this.NextView('sp_CustomerReception_ID', 'HelcOA.view.ForApprovalProcess.DailyOffice.CustomerReception');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '境外出差申请') {
				this.NextView('sp_OverseasTrip_id', 'HelcOA.view.ForApprovalProcess.DailyOffice.OverseasTrip');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '法人授权') {
				this.NextView('sp_LegalAuthorization_id', 'HelcOA.view.ForApprovalProcess.DailyOffice.LegalAuthorization');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '投资公司经理出差申请流程') {
				this.NextView('sp_investManager_id', 'HelcOA.view.ForApprovalProcess.DailyOffice.investManager');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '视频设备申请') {
				this.NextView('sp_VideoEquipmentApplicationForm_id', 'HelcOA.view.ForApprovalProcess.DailyOffice.VideoEquipmentApplicationForm');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == 'PO单审核') {
				this.NextView('sp_POFormExamine_id', 'HelcOA.view.ForApprovalProcess.DailyOffice.POFormExamine');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
				Ext.getCmp('subject').setValue(record.data.subject);
				// 分类：营业/工程业务
			} else if (data.proc_name == '维修改造工程业务联络流程') {
				this.NextView('sp_MaintainTransformView_id', 'HelcOA.view.ForApprovalProcess.BusinessService.MaintainTransformView');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '非标报告作业处理流程') {
				this.NextView('sp_nonstandardWork_id', 'HelcOA.view.ForApprovalProcess.BusinessService.nonstandardWork');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '诉讼审批流程') {
				this.NextView('sp_litigationApprove_id', 'HelcOA.view.ForApprovalProcess.BusinessService.litigationApprove');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '开具发票') {
				this.NextView('sp_Invoice_id', 'HelcOA.view.ForApprovalProcess.BusinessService.Invoice');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '律师函审批流程') {
				this.NextView('sp_Legistimate_id', 'HelcOA.view.ForApprovalProcess.BusinessService.Legistimate');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '诉讼和解审批流程') {
				this.NextView('sp_litigationApplyandRemove_id', 'HelcOA.view.ForApprovalProcess.BusinessService.litigationApplyandRemove');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '短交货期流程') {
				this.NextView('sp_bussinessShortDateDelivery_id', 'HelcOA.view.ForApprovalProcess.BusinessService.bussinessShortDateDelivery');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '短安装期联络工作流程') {
				this.NextView('sp_bussinessShortDateInstall_id', 'HelcOA.view.ForApprovalProcess.BusinessService.bussinessShortDateInstall');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '电梯_扶梯发货计划') {
				this.NextView('sp_elevatordeliveryplan_id', 'HelcOA.view.ForApprovalProcess.BusinessService.elevatordeliveryplan');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '非正常发货要求联络书流程') {
				this.NextView('sp_abnormaldelivery_id', 'HelcOA.view.ForApprovalProcess.BusinessService.abnormaldelivery');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}else if(data.proc_name == '提前开票申请'){
				//添加人：xkc 添加日期:2017-12-18
				this.NextView('sp_advanceBilling_id', 'HelcOA.view.ForApprovalProcess.BusinessService.advanceBilling');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}else if(data.proc_name == '承兑汇票申请'){
				//添加人：xkc 添加日期:2017-12-18
				this.NextView('sp_acceptancebill_id', 'HelcOA.view.ForApprovalProcess.BusinessService.acceptancebill');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}
			else if(data.proc_name == '外经证申请'){
				//添加人：xkc 添加日期:2017-12-18
				this.NextView('sp_Externalmeridiansyndrome_id', 'HelcOA.view.ForApprovalProcess.BusinessService.Externalmeridiansyndrome');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}else if(data.proc_name == '质量保函申请'){
				//添加人：xkc 添加日期:2017-12-18
				this.NextView('sp_qualityguarantee_id', 'HelcOA.view.ForApprovalProcess.BusinessService.qualityguarantee');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}
			// 分类：提案管理流程
			else if (data.proc_name == '提案管理流程') {
				this.NextView('sp_PM_TAGLLC_NG_id', 'HelcOA.view.ForApprovalProcess.ProposalManage.PM_TAGLLC_NG');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
				
			}
			// 分类：质量控制
			else if (data.proc_name == '开箱补缺件及不良问题反馈报告') {
				this.NextView('sp_KXBQJView_id', 'HelcOA.view.ForApprovalProcess.QualityControl.KXBQJView');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '三包申请报告') {
				this.NextView('sp_ThreeGuarantees_id', 'HelcOA.view.ForApprovalProcess.QualityControl.ThreeGuarantees');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '质量部投诉流程') {
				this.NextView('sp_QualityComplain_id', 'HelcOA.view.ForApprovalProcess.QualityControl.QualityComplain');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '公司级投诉处理流程') {
				this.NextView('sp_ComplatinSheet_id', 'HelcOA.view.ForApprovalProcess.QualityControl.ComplatinSheet');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '欠料发货电子流程') {
				this.NextView('sp_StockoutsDelivery_id', 'HelcOA.view.ForApprovalProcess.QualityControl.StockoutsDelivery');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}
			// 分类：人力资源
			else if (data.proc_name == '丧假申请流程（派驻人员专用）') {
				this.NextView('sp_FuneralLeave_id', 'HelcOA.view.ForApprovalProcess.humanresources.FuneralLeave');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '人员转_调岗申请') {
				this.NextView('sp_StaffTransfer_id', 'HelcOA.view.ForApprovalProcess.humanresources.StaffTransfer');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '公积金申请') {
				this.NextView('sp_FundApply_id', 'HelcOA.view.ForApprovalProcess.humanresources.FundApply');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '培训设施借用流程') {
				this.NextView('sp_trainingEquipmentsBorrowing_id', 'HelcOA.view.ForApprovalProcess.humanresources.trainingEquipmentsBorrowing');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '探亲假申请流程') {
				this.NextView('sp_HomeLeave_id', 'HelcOA.view.ForApprovalProcess.humanresources.HomeLeave');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}
			// 信息技术
			else if (data.proc_name == 'PDA系统账号流程') {
				this.NextView('sp_PDAaccount_id', 'HelcOA.view.ForApprovalProcess.InformationTechnology.PDAaccount');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == 'PDA系统设备新增或维修流程') {
				this.NextView('sp_PDAEquipment_id', 'HelcOA.view.ForApprovalProcess.InformationTechnology.PDAEquipment');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '软件维护申请流程') {
				this.NextView('sp_softwarevindicate_id', 'HelcOA.view.ForApprovalProcess.InformationTechnology.softwarevindicate');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == 'IT故障申请流程') {
				this.NextView('sp_ITBDapplicationForm_id', 'HelcOA.view.ForApprovalProcess.InformationTechnology.ITBDapplicationForm');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '数据恢复申请流程') {
				this.NextView('sp_DataRecovery_id', 'HelcOA.view.ForApprovalProcess.InformationTechnology.DataRecovery');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '数据维护申请流程') {
				this.NextView('sp_DataMaintenance_id', 'HelcOA.view.ForApprovalProcess.InformationTechnology.DataMaintenance');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '系统网络账号权限申请') {
				this.NextView('sp_systemAccount_id', 'HelcOA.view.ForApprovalProcess.InformationTechnology.systemAccount');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '供应商信息维护流程') {
				this.NextView('sp_supplyment_id', 'HelcOA.view.ForApprovalProcess.InformationTechnology.supplyment');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '客户信息维护流程') {
				this.NextView('sp_clientInformation_id', 'HelcOA.view.ForApprovalProcess.InformationTechnology.clientInformation');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '应届毕业生实习培训计划流程') {
				this.NextView('sp_GraduatesTraining_id', 'HelcOA.view.ForApprovalProcess.humanresources.GraduatesTraining');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '婚假_产假申请流程（派驻人员专用）') {
				this.NextView('sp_MarriageLeave_id', 'HelcOA.view.ForApprovalProcess.humanresources.MarriageLeave');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '年度计划外培训需求申请流程') {
				this.NextView('sp_YearPlan_id', 'HelcOA.view.ForApprovalProcess.humanresources.YearPlan');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '用户权限申请流程') {
				this.NextView('sp_Permissions_ID', 'HelcOA.view.ForApprovalProcess.InformationTechnology.Permissions');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '设备_配件借用申请流程') {
				this.NextView('sp_ITAccessoriesApplication_id', 'HelcOA.view.ForApprovalProcess.InformationTechnology.ITAccessoriesApplication');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}
			// 天津
			else if (data.proc_name == '天津合同审批流程') {
				this.NextView('sp_Contractaudit_id', 'HelcOA.view.ForApprovalProcess.TianJin.Contractaudit');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '天津公务用车申请流程') {
				this.NextView('sp_TJCar_id', 'HelcOA.view.ForApprovalProcess.TianJin.TJCar');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '天津用印申请') {
				this.NextView('sp_TJSignet_id', 'HelcOA.view.ForApprovalProcess.TianJin.TJSignet');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '天津设备_配件借用申请流程') {
				this.NextView('sp_TJAccessoriesApplication_id', 'HelcOA.view.ForApprovalProcess.TianJin.TJAccessoriesApplication');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '天津公司发文流程') {
				this.NextView('sp_TJDispatch_id', 'HelcOA.view.ForApprovalProcess.TianJin.TJDispatch');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '天津合理化提案流程') {
				this.NextView('sp_TJProposal_id', 'HelcOA.view.ForApprovalProcess.TianJin.TJProposal');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '天津出差申请') {
				this.NextView('TJtravelRequest_ID', 'HelcOA.view.ForApprovalProcess.TianJin.TJtravelRequest');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '天津产品退货流程') {
				this.NextView('sp_TJreturn_ID', 'HelcOA.view.ForApprovalProcess.TianJin.TJreturn');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '天津IT故障申告流程') {
				this.NextView('sp_ITBDapplicationForm_ID', 'HelcOA.view.ForApprovalProcess.TianJin.TJITBDapplicationForm');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '天津电脑资料用户申请') {
				this.NextView('sp_TJClientInform_id', 'HelcOA.view.ForApprovalProcess.TianJin.TJClientInform');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '天津信息系统帐号权限申请流程') {
				this.NextView('sp_TJInformationAccount_id', 'HelcOA.view.ForApprovalProcess.TianJin.TJInformationAccount');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '天津软件维护流程') {
				this.NextView('sp_TJSoftwareMaintenance_id', 'HelcOA.view.ForApprovalProcess.TianJin.TJSoftwareMaintenance');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}
			// 信息
			else if (data.proc_name == '档案借阅或复印申请流程') {
				this.NextView('sp_FileBorrowingOrCopy_id', 'HelcOA.view.ForApprovalProcess.Technology.FileBorrowingOrCopy');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}
			// 制造管理
			else if (data.proc_name == '井道图变更通知单流程') {
				this.NextView('sp_JDTchange_ID', 'HelcOA.view.ForApprovalProcess.Manufacture.JDTchange');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '供应商首批供货流程') {
				this.NextView('sp_FirstSupply_ID', 'HelcOA.view.ForApprovalProcess.Manufacture.FirstSupply');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}
			// 上海
			else if (data.proc_name == '上海会议室申请流程') {
				this.NextView('sp_SHMeeting_ID', 'HelcOA.view.ForApprovalProcess.ShangHai.SHMeeting');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '上海出差申请') {
				this.NextView('sp_SHtravelRequest_ID', 'HelcOA.view.ForApprovalProcess.ShangHai.SHtravelRequest');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '上海印章申请') {
				this.NextView('sp_SHSignet_ID', 'HelcOA.view.ForApprovalProcess.ShangHai.SHSignet');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '上海请休假申请流程') {
				this.NextView('sp_SHVocation_ID', 'HelcOA.view.ForApprovalProcess.ShangHai.SHVocation');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '上海转岗申请') {
				this.NextView('sp_SHTransfer_ID', 'HelcOA.view.ForApprovalProcess.ShangHai.SHTransfer');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '上海合同审批申请') {
				this.NextView('sp_SHContractApproval_id', 'HelcOA.view.ForApprovalProcess.ShangHai.SHContractApproval');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '上海用车申请') {
				this.NextView('sp_SHApplicationForCar_id', 'HelcOA.view.ForApprovalProcess.ShangHai.SHApplicationForCar');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '上海年度计划外培训申请流程') {
				this.NextView('sp_SHOutAnnualPlan_id', 'HelcOA.view.ForApprovalProcess.ShangHai.SHOutAnnualPlan');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '上海品质异常处理流程') {
				this.NextView('sp_SHAbnormalQuality_id', 'HelcOA.view.ForApprovalProcess.ShangHai.SHAbnormalQuality');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}
			// 成都
			else if (data.proc_name == '成都出差申请') {
				this.NextView('sp_CDtravelRequest_ID', 'HelcOA.view.ForApprovalProcess.ChengDu.CDtravelRequest');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '成都公务用车申请') {
				this.NextView('sp_CDCar_ID', 'HelcOA.view.ForApprovalProcess.ChengDu.CDcar');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '成都会议室申请') {
				this.NextView('sp_CDMeeting_ID', 'HelcOA.view.ForApprovalProcess.ChengDu.CDMeeting');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '成都发文流程') {
				this.NextView('sp_CDDispatch_ID', 'HelcOA.view.ForApprovalProcess.ChengDu.CDDispatch');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '成都培训设施使用流程') {
				this.NextView('sp_CDTrainingFacility_id', 'HelcOA.view.ForApprovalProcess.ChengDu.CDTrainingFacility');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '成都请休假流程') {
				this.NextView('sp_CDApplicationForLeave_id', 'HelcOA.view.ForApprovalProcess.ChengDu.CDApplicationForLeave');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '成都年度计划外培训') {
				this.NextView('sp_CDOutAnnualPlan_id', 'HelcOA.view.ForApprovalProcess.ChengDu.CDOutAnnualPlan');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '成都合同审批流程') {
				this.NextView('sp_CDcontract_ID', 'HelcOA.view.ForApprovalProcess.ChengDu.CDcontract');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '成都接待客户流程') {
				this.NextView('sp_CDcontract_ID', 'HelcOA.view.ForApprovalProcess.ChengDu.CDclientReception');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '基建报修') {
				this.NextView('sp_CDInfrastructure_id', 'HelcOA.view.ForApprovalProcess.ChengDu.CDInfrastructure');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '成都规章制度') {
				this.NextView('sp_CDRegulation_id', 'HelcOA.view.ForApprovalProcess.ChengDu.CDRegulation');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}else if (data.proc_name == '成都用印申请流程') {
				this.NextView('sp_CDSignature_ID','HelcOA.view.ForApprovalProcess.ChengDu.CDSignature');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '成都人员转调岗流程') {
				this.NextView('sp_CDStaffTransfer_ID','HelcOA.view.ForApprovalProcess.ChengDu.CDStaffTransfer');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} 
			else if (data.proc_name == '成都档案借阅申请流程') {
				this.NextView('sp_CDFileBorrowingOrCopy_id', 'HelcOA.view.ForApprovalProcess.ChengDu.CDFileBorrowingOrCopy');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}
			// 扶梯
			else if (data.proc_name == '扶梯出差申请') {
				this.NextView('sp_FTtravelRequest_ID', 'HelcOA.view.ForApprovalProcess.FuTi.FTtravelRequest');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '扶梯公积金申请') {
				this.NextView('sp_CDCar_ID', 'HelcOA.view.ForApprovalProcess.FuTi.FTFundApply');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '扶梯公司发文流程') {
				this.NextView('sp_CDMeeting_ID', 'HelcOA.view.ForApprovalProcess.FuTi.FTDispatch');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '扶梯境外出差申请') {
				this.NextView('sp_FTOverseasTrip_ID', 'HelcOA.view.ForApprovalProcess.FuTi.FTOverseasTrip');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '扶梯用印申请') {
				this.NextView('sp_FTSealApplication_id', 'HelcOA.view.ForApprovalProcess.FuTi.FTSealApplication');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '扶梯供应商首批供货流程') {
				this.NextView('sp_FTSupplyInCirculation_id', 'HelcOA.view.ForApprovalProcess.FuTi.FTSupplyInCirculation');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '扶梯采购价格变更审批') {
				this.NextView('sp_FTMaterialPurchasing_id', 'HelcOA.view.ForApprovalProcess.FuTi.FTMaterialPurchasing');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '扶梯欠料发货电子流程') {
				this.NextView('sp_FTLessMaterial_id', 'HelcOA.view.ForApprovalProcess.FuTi.FTLessMaterial');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}
			// 财务
			else if (data.proc_name == '用款申请流程') {
				this.NextView('sp_CWApplyForFees_id', 'HelcOA.view.ForApprovalProcess.finance.CWApplyForFees');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '营分司固定资产申请流程') {
				this.NextView('sp_CWPurchaseOfAssets_id', 'HelcOA.view.ForApprovalProcess.finance.CWPurchaseOfAssets');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == '采购价格变更审批管理') {
				this.NextView('sp_CWMaterialPurchasing_id', 'HelcOA.view.ForApprovalProcess.finance.CWMaterialPurchasing');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}
			//日滨类流程
			else if (data.proc_name == 'HB_出差申请') {
				this.NextView('sp_HB_A2_id', 'HelcOA.view.ForApprovalProcess.HB.HB_A2');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == 'HB_加班申请') {
				this.NextView('sp_HB_A3_id', 'HelcOA.view.ForApprovalProcess.HB.HB_A3');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == 'HB_考勤补登申请') {
				this.NextView('sp_HB_A4_id', 'HelcOA.view.ForApprovalProcess.HB.HB_A4');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == 'HB_离司手续办理') {
				this.NextView('sp_HB_A5_id', 'HelcOA.view.ForApprovalProcess.HB.HB_A5');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == 'HB_离职申请') {
				this.NextView('sp_HB_A6_id', 'HelcOA.view.ForApprovalProcess.HB.HB_A6');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == 'HB_请假申请') {
				this.NextView('sp_HB_A10_id', 'HelcOA.view.ForApprovalProcess.HB.HB_A10');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == 'HB_人力需求申请') {
				this.NextView('sp_HB_A11_id', 'HelcOA.view.ForApprovalProcess.HB.HB_A11');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == 'HB_外派人员补贴申请') {
				this.NextView('sp_HB_A13_id', 'HelcOA.view.ForApprovalProcess.HB.HB_A13');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == 'HB_外出申请') {
				this.NextView('sp_HB_A15_id', 'HelcOA.view.ForApprovalProcess.HB.HB_A15');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == 'HB_用印申请') {
				this.NextView('sp_HB_A16_id', 'HelcOA.view.ForApprovalProcess.HB.HB_A16');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}else if (data.proc_name == 'HB_用车申请表') {
				this.NextView('sp_HB_D7_id', 'HelcOA.view.ForApprovalProcess.HB.HB_D7');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == 'HB_证书借阅使用申请表') {
				this.NextView('sp_HB_D8_id', 'HelcOA.view.ForApprovalProcess.HB.HB_D8');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == 'HB_员工寄件申请审批表') {
				
				this.NextView('sp_HB_D9_id', 'HelcOA.view.ForApprovalProcess.HB.HB_D9');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			} else if (data.proc_name == 'HB_非生产使用物资申购表') {
				
				this.NextView('sp_HB_D10_id', 'HelcOA.view.ForApprovalProcess.HB.HB_D10');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}else if (data.proc_name == 'HB_网络资源申请表') {
				
				this.NextView('sp_HB_G6_id', 'HelcOA.view.ForApprovalProcess.HB.HB_G6');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}else if (data.proc_name == 'HB_班车交通补贴申请撤销申请单') {
				
				this.NextView('sp_HB_J1_id', 'HelcOA.view.ForApprovalProcess.HB.HB_J1');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}else if (data.proc_name == 'HB_施工许可申请危险作业申请审批表') {
				
				this.NextView('sp_HB_J2_id', 'HelcOA.view.ForApprovalProcess.HB.HB_J2');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}
                else if (data.proc_name == 'HB_物资电子放行条') {
				
				this.NextView('sp_HB_J3_id', 'HelcOA.view.ForApprovalProcess.HB.HB_J3');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
			}
                else if (data.proc_name == 'HB_物资需求申请') {
    				this.NextView('sp_HB_H1_id', 'HelcOA.view.ForApprovalProcess.HB.HB_H1');
    				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
    			}
                else if (data.proc_name == 'HB_生产物料供应比例设置修改申请表') {
    				this.NextView('sp_HB_H3_id', 'HelcOA.view.ForApprovalProcess.HB.HB_H3');
    				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
    			}
             else if (data.proc_name == 'HB_供应商调拨申请单') {
    				this.NextView('sp_HB_H6_id', 'HelcOA.view.ForApprovalProcess.HB.HB_H6');
    				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
    		}else if (data.proc_name == 'HB_客户产品返销申请单') {
				this.NextView('sp_HB_H8_id', 'HelcOA.view.ForApprovalProcess.HB.HB_H8');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		     }
    		else if (data.proc_name == 'HB_销售价格价目表申请流程') {
				this.NextView('sp_HB_H11_id', 'HelcOA.view.ForApprovalProcess.HB.HB_H11');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		     }
    		else if (data.proc_name == 'HB_空进空出申请表') {
				this.NextView('sp_HB_H12_id', 'HelcOA.view.ForApprovalProcess.HB.HB_H12');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		     }
    		else if (data.proc_name == 'HB_ERP系统采购信息变更申请表') {
				this.NextView('sp_HB_H15_id', 'HelcOA.view.ForApprovalProcess.HB.HB_H15');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		     }
    		else if (data.proc_name == 'HB_工装生产治具设备配件采购申请单') {
				this.NextView('sp_HB_H22_id', 'HelcOA.view.ForApprovalProcess.HB.HB_H22');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		     }
		
    		else if (data.proc_name == 'HB_产品租赁出库申请') {
    			
				this.NextView('sp_HB_E1_id', 'HelcOA.view.ForApprovalProcess.HB.HB_E1');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		     }
            else if (data.proc_name == 'HB_客户新增及资料变更申请') {
    			
				this.NextView('sp_HB_E2_id', 'HelcOA.view.ForApprovalProcess.HB.HB_E2');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		     }
            else if (data.proc_name == 'HB_物流平台合同及需财务审批文件用印申请表') {
    			
				this.NextView('sp_HB_E5_id', 'HelcOA.view.ForApprovalProcess.HB.HB_E5');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		     }
            else if (data.proc_name == 'HB_访客参观申请表') {
				this.NextView('sp_HB_D2_id', 'HelcOA.view.ForApprovalProcess.HB.HB_D2');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		     }
            else if (data.proc_name == 'HB_培训过程记录及试用期鉴定') {
				this.NextView('sp_HB_A7_id', 'HelcOA.view.ForApprovalProcess.HB.HB_A7');
				Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		     }
			  else {
				Ext.Msg.alert('提示', '没有此流程页面！');
				return;
			}
			var taskid = data.task_id;
			Ext.getCmp("taskid").setValue(taskid);
			cc.log(taskid);
			var getResult3 = function(res) {
				cc.log("------res-----");
				cc.log(res);
				if (typeof (res) != "undefined") {
					var jsonObj = Ext.JSON.decode(res.ovar);
					var node_data = Ext.JSON.decode(jsonObj.data.acti);
					cc.log("---node_data--");
					cc.log(node_data.node.name);
					Ext.getCmp('piid').setValue(node_data.piid);
					if (jsonObj.data.pur == "")
						jsonObj.data.pur = "{}";
					var purObj = Ext.JSON.decode(jsonObj.data.pur);
					var status = jsonObj.status;
					cc.log(purObj);
					if (status.code == "200") {
						// 状态正常
						try {
							for (key in purObj) {
								if (purObj[key] == 0) {
									if (Ext.getCmp(key)) {
										Ext.getCmp(key).setHidden(true);
									}
								} else if (purObj[key] == 1) {
									if (Ext.getCmp(key)) {
										Ext.getCmp(key).setHidden(true);
									}
								} else if (purObj[key] == 2) {
									if (Ext.getCmp(key)) {
										Ext.getCmp(key).setHidden(false);
										var xtypes = Ext.getCmp(key).getXTypes();
										if (xtypes.substring(xtypes.length - 6,xtypes.length) != 'button') {
											Ext.getCmp(key).setReadOnly(true);
										} else {
											Ext.getCmp(key).setDisabled(true);
										}
										Ext.getCmp(key).setZIndex(999);
									}
								} else if (purObj[key] == 3) {
									if (Ext.getCmp(key)) {
										Ext.getCmp(key).setHidden(false);
										var xtypes = Ext.getCmp(key).getXTypes();
										if (xtypes.substring(xtypes.length - 6,xtypes.length) != 'button') {
											Ext.getCmp(key).setReadOnly(false);
										}
									}
								}
							}

							var jsonObj = eval("(" + res.ovar + ")");
							for (key in jsonObj.data.fdata.mast) {
								try {
									Ext.getCmp(key).setValue(jsonObj.data.fdata.mast[key]);
								} catch (e) {
									cc.log('设值错误数据！' + e + ' ' + key);
								}
							}
							Ext.getCmp('node').setValue(
									node_data.node.name);
						} catch (e) {
							cc.log('错误数据！' + key);
						}
						var audit_list_str = JSON.stringify(jsonObj.data.fdata.audit_list);
						var filenames = jsonObj.data.fdata.filenames;

						cc.log('----------audit_list_str----------');
						cc.log(audit_list_str);

						Ext.getCmp('audit_list').setValue(audit_list_str);
						var mast_str = JSON.stringify(jsonObj.data.fdata.mast);
						Ext.getCmp('mast').setValue(mast_str);
						var audit_list = Ext.getCmp('audit_list').getValue();

						if (audit_list != "") {
							cc.log('----------audit_list----------');
							cc.log(audit_list);
							var jsonObj = eval("(" + audit_list + ")");
							cc.log('----------jsonObj----------');
							cc.log(jsonObj);

							var formPanel = Ext.getCmp('fp');
							for (var i = 0; i < jsonObj.length; i++) {
								if (jsonObj[i].node != '' && jsonObj[i].node != undefined && jsonObj[i].node != null) {
									var fieldSet1 = {
										xtype : 'fieldset',
										id : 'fp' + i,
										title : jsonObj[i].node,
										items : [
												{
													xtype : 'textfield',
													label : '姓名',
													value : jsonObj[i].username,
													readOnly : true,
												},
												{
													xtype : 'textfield',
													label : '部门',
													value : jsonObj[i].dept,
													readOnly : true,
												},
												{
													xtype : 'textfield',
													label : '时间',
													value : jsonObj[i].ctime,
													readOnly : true,
												},
												{
													xtype : 'autoTextArea',
													label : '内容',
													id : 'idea_'
															+ i,
													readOnly : true
												} ]
									};
									formPanel.add(fieldSet1);
									Ext.getCmp('idea_' + i).setValue( jsonObj[i].idea);
								}
							}
							
							var fjstore = Ext.data.StoreManager.get("jobContactBook_ck_Store");
							if (!fjstore) {
								fjstore = Ext.create("HelcOA.store.ForApprovalProcess.DailyOffice.jobContactBook_ck_Store");
							}
							
							/*
							var sj = [];
							sj = filenames;
							console.log("zhaaa" + filenames);
							var length = sj.length;
							fjstore.setData(sj);
							*/
							
							// 判断流程类型(特殊情况)
							if (data.proc_name == '公司发文流程') {
								console.log('===========Y=========');
								var dataOne = eval("(" + res.ovar + ")");
								console.log(dataOne.data.curuser.fullname);
								console.log(dataOne.data.fdata.mast.agentman);
								Ext.getCmp('bzr').setValue( dataOne.data.fdata.mast.agentman);
							}
							;
							if (data.proc_name == '公司规章制度审批流程') {
								if (hqflag == "否") {
									Ext.getCmp('hqsl').setHidden(true);
									for (var i = 1; i <= 12; i++) {
										Ext.getCmp('hqdep' + i).setHidden(true);
									}
								} else {
									var hqsl = Ext.getCmp('hqsl').getValue();
									for (var i = ++hqsl; i <= 12; i++) {
										Ext.getCmp('hqdep' + i).setHidden(true);
									}
								}
								if (fwtype == "制度首发") {
									Ext.getCmp('oldreadpeo').setHidden(true);
								}
							}
							;
						}
						;
						if (data.proc_name == 'PO单审核') {
							obj_this.getApplication().getController('ForApprovalProcess.DailyOffice.POFormExamineCtrl').initPOForm();
						}
						;
						if (data.proc_name == '质量部投诉流程' && Ext.getCmp('node').getValue() == "质量部判责") {
							Ext.getCmp('sj').setReadOnly(false);
							Ext.getCmp('zp').setReadOnly(false);
							Ext.getCmp('yh').setReadOnly(false);
							Ext.getCmp('qt').setReadOnly(false);
							Ext.getCmp('fxjg_textarea').setReadOnly(false);
						}
						;
						if (data.proc_name == '系统网络账号权限申请') {
							var outcome = [];
							outcome = Ext.getCmp('zhtype')
									.getValue().split(",");
							for (var i = 0; i < outcome.length; i++) {
								if (outcome[i] == '1') {
									outcome[i] = '网络帐号';
								} else if (outcome[i] == '2') {
									outcome[i] = 'OA邮件帐号';
								} else if (outcome[i] == '3') {
									outcome[i] = 'OA邮件外发权限';
								} else if (outcome[i] == '15') {
									outcome[i] = 'ERP账号';
								} else if (outcome[i] == '13') {
									outcome[i] = '技术联络单系统帐号';
								} else if (outcome[i] == '24') {
									outcome[i] = '日立智能装饰选型系统';
								} else if (outcome[i] == '9') {
									outcome[i] = '彩色打印权限';
								} else if (outcome[i] == '10') {
									outcome[i] = 'PLM系统帐号';
								} else if (outcome[i] == '16') {
									outcome[i] = '视频网络帐号';
								} else if (outcome[i] == '21') {
									outcome[i] = '彩色复印权限';
								} else if (outcome[i] == '17') {
									outcome[i] = '井道图系统';
								} else if (outcome[i] == '12') {
									outcome[i] = 'Siebel系统帐号';
								} else if (outcome[i] == '19') {
									outcome[i] = 'EPD参数化系统';
								} else if (outcome[i] == '14') {
									outcome[i] = 'MRP2账号';
								} else if (outcome[i] == '18') {
									outcome[i] = 'HEDS系统';
								} else if (outcome[i] == '25') {
									outcome[i] = 'edoc文档系统';
								} else if (outcome[i] == '7') {
									outcome[i] = '远程终端帐号';
								} else if (outcome[i] == '4') {
									outcome[i] = '公用机Internet浏览权限';
								}
							}
							Ext.getCmp('zhtype').setValue(outcome);
							if (Ext.getCmp('zhtype1').getValue() == '20') {
								Ext.getCmp('zhtype1').setValue(
										'RDMP研发管理平台');
							}
							if (Ext.getCmp('zhtype2').getValue() == '22') {
								Ext.getCmp('zhtype2').setValue(
										"E-HR系统");
							}
							if (Ext.getCmp('zhtype3').getValue() == '23') {
								Ext.getCmp('zhtype3').setValue(
										"财务预算系统");
							}
						}
						;
					} else {
						// 状态不正常，可能是该数据已经处理
						Ext.Msg.alert(status.msg);
						WL.Toast.show(status.msg);
						obj_this.showBackView();
						obj_this.DestroyPublicId();
						return;
					}
				} else {
					// 状态不正常，可能是该数据已经处理
					Ext.Msg.alert("数据异常,请刷新");
					obj_this.showBackView();
					obj_this.DestroyPublicId();
					return;
				}

			};

			var content = {
				method : 'ForApprovalProcess',
				task_id : data.task_id,
				piid : data.piid
			};
			cc.log(content);
			this.connectServer3(getResult3, content);
		},

	ininData : function() {
		var obj5 = this;

		// 添加下拉到底部加载更多数据
		var store = this.getStore('MenusS', 'HelcPDA.store.MenusS');
		var store2 = this.getStore('MenusS2', 'HelcPDA.store.MenusS2');
		Ext.getCmp('ForApprovalProcess_ID')._scrollable._scroller.addListener('scrollend',
			function(obj, x, y, eOpts) {
				if (obj.position.y == obj.maxPosition.y) {
					var Ypos = obj.position.y;
					var Sflag = store.data.items.length;
					var data2 = [];
					var flag = true;
					for (var i = Sflag; i < Sflag + 10; i++) {
						if (typeof (store2.data.items[i]) == "undefined") {
							flag = false;
							break;
						} else {
							data2.push(store2.data.items[i]);
						}
					}
					store.add(data2);
					if (flag) {
						obj5.Waitting('正在加载...');
						setTimeout(function() {
							obj5.HideWaitting();
						}, 1000);
					}
					Ext.getCmp('ForApprovalProcess_ID')._scrollable._scroller.scrollTo(0, Ypos);
				}
			}, this, {}
		);

		var LI = document.getElementById('xdlz');
		LI.onclick = function() {
			Ext.Msg.alert("请在电脑端起草！");
		};

		// 公告
		var GG = document.getElementById('gg');
		GG.onclick = function() {
			obj5.NextView('News_id', 'HelcOA.view.Affiche.news');
			var store = obj5.getStore('newsStore', 'HelcOA.store.Affiche.newsStore');
			var getResult = function(res) {
				if(res.GETGSGGLISTReturn.CDATA){
					var returnData = eval("(" + res.GETGSGGLISTReturn.CDATA + ")");
				}else{
					var returnData = eval("(" + res.GETGSGGLISTReturn + ")");
				}
				store.setData(returnData.data);
			};

			console.log("------------GetGSGGLists--------------");
			var params = {};
			params.method = 'GetGSGGList';
			params.parameters = [ '001001' ];
			obj5.connectServer_OA(getResult, params);
			
		};

		// 一周活动
		var YZHD = document.getElementById('yzhd');
		YZHD.onclick = function() {
			obj5.NextView('WeekMeet_id','HelcOA.view.WeekMeet.WeekMeet');
			var store = obj5.getStore('WeekMeetStore','HelcOA.store.WeekMeet.WeekMeetStore');
			var getResult = function(res) {
				var returnData = eval("(" + res.GETWEEKMEETLISTReturn.CDATA + ")");
				store.setData(returnData.data);
				cc.log(returnData);
			};

			var params = {};
			params.method = 'GetWeekMeetList';
			params.parameters = [];
			obj5.connectServer_OA(getResult, params);
		};

		// 已结束
		var YJS = document.getElementById('yjs');
		YJS.onclick = function() {
			// set到节点选择页面的数据STORE
			var store = Ext.data.StoreManager.get("HasEndedStore");
			if (!store) {
				store = Ext.create("HelcOA.store.HasEnded.HasEndedStore");
			}
			store.setData([]);
			obj5.NextView('HasEnded_id', 'HelcOA.view.HasEnded.HasEnded');

			var getResult = function(res) {
				cc.log('----已结束 res----');
				cc.log(res);
				var d = res.PROCESSDOCReturn.CDATA.replace( "\"\"null\"\"", "null");
				var data = d.replace("\"\"null\"\"", "null");
				cc.log(data);
				cc.log(d);

				var CDATA_json = eval("(" + data + ")");

				var userSolist = [];
				var cs = 0;// 下标
				for (var i = 0; i < CDATA_json.data.length; i++) {
					userSolist[cs] = CDATA_json.data[cs];
					cc.log(userSolist[cs]);
					cs++;
				}

				// 判断输出内容
				var listdata = [];
				var cs = 0;
				for (var j = 0; j < userSolist.length; j++) {
					if (userSolist[j].subject != "null" && userSolist[j].subject != "-") {
						listdata[cs] = userSolist[j]; cs++;
					}
				}
				store.setData(listdata);

			};

			var myParam = [ usernames ];
			var params = {};
			params.adpName = 'HttpAdapter_OA';
			params.prodNmae = 'Getenddoc';
			params.prmName = myParam;
			obj5.connectServerComm(getResult, params);

		};

		// 已审批流程
		var YCP = document.getElementById('ycp');
		YCP.onclick = function() {
			obj5.NextView('Approved_id', 'HelcOA.view.Approved.Approved');
			// set到节点选择页面的数据STORE
			var store = Ext.data.StoreManager.get("ApprovedStore");
			if (!store) {
				store = Ext.create("HelcOA.store.Approved.ApprovedStore");
			}
			store.setData([]);
			var getResult = function(res) {
				cc.log(res.data);
				var userSolist = [];
				var cs = 0;// 下标
				for (var i = 0; i < res.data.length; i++) {

					// 去掉_前面的字符
					if (res.data[cs].app_name != null
							&& res.data[cs].subject != undefined) {
						var a = res.data[cs].app_name
								.split('_');
					}

					userSolist[cs] = res.data[cs];
					if (typeof (a) != 'undefined') {
						userSolist[cs].app_name = a[1];
					}
					if (res.data[cs].app_name == '日常办公') {
						res.data[cs].icon = 'O';
						res.data[cs].class = 'i_Button_List_Icon_2';
						res.data[cs].color = '#854107';
					} else if (res.data[cs].app_name == '信息技术') {
						res.data[cs].icon = 'i';
						res.data[cs].class = 'i_Button_List_Icon_2';
						res.data[cs].color = '#009ddc';
					} else if (res.data[cs].app_name == '营业,工程业务') {
						res.data[cs].icon = 'b';
						res.data[cs].class = 'i_Button_List_Icon_2';
						res.data[cs].color = '#fbb726';
					} else if (res.data[cs].app_name == '质量控制') {
						res.data[cs].icon = '!';
						res.data[cs].class = 'i_Button_List_Icon_2';
						res.data[cs].color = '#e03a3e';
					} else if (res.data[cs].app_name == '人力资源') {
						res.data[cs].icon = '|';
						res.data[cs].class = 'i_Button_List_Icon_2';
						res.data[cs].color = '#fcb827';
					} else if (res.data[cs].app_name == 'OA_成都') {
						res.data[cs].icon = '|';
						res.data[cs].class = 'i_Button_List_Icon_2';
						res.data[cs].color = '#fcb827';
					} else {
						res.data[cs].icon = 'h';
						res.data[cs].class = 'i_Button_List_Icon_2';
						res.data[cs].color = '#fcb827';
					}
					cs++;
				}

				// //判断输出内容
				var listdata = [];
				userSolist = res.data;
				var cs = 0;
				for (var j = 0; j < userSolist.length; j++) {
					if (userSolist[j].subject != "null" && userSolist[j].subject != "-") {
						listdata[cs] = userSolist[j]; cs++;
					}
				}
				cc.log(res.data.length);
				cc.log(listdata.length);
				store.setData(listdata);
			};

			var myParam = [ _vt, userkey ];
			var params = {};
			params.adpName = 'HttpAdapter_BPM';
			params.prodNmae = 'toOvrTodoListRecord';
			params.prmName = myParam;
			obj5.connectServerComm(getResult, params);

		};
		//预约系统
		var yy = document.getElementById('yyxt');
		yy.onclick=function(){
			obj5.NextView("yuyuehome","HelcOA.view.yuyue.Home");
	  var storew = Ext.data.StoreManager.get("Home_Unconfirmed_lsit");
	  if (!storew) {
		storew = Ext.create("HelcOA.store.yuyue.Home_Unconfirmed_lsit");
	  }	
	  var storey = Ext.data.StoreManager.get("Home_Confirmed_lsit");
	  if (!storey) {
		storey = Ext.create("HelcOA.store.yuyue.Home_Confirmed_lsit");
	  }	
        var getResult=function(result){
        	if(result==null)
        		return;
        	var wdata=eval("("+result.YUYUEDOCReturn.CDATA+")").wdata;
        	var ydata=eval("("+result.YUYUEDOCReturn.CDATA+")").ydata;
        	var w=[];
        	
        	for(var i=0;i<wdata.length;i++){
        	var ws={};
        	ws.title=wdata[i].subject;
        	ws.company=wdata[i].company;
        	if(wdata[i].yylx=="接待")
	        	ws.date=wdata[i].startdate;
	        	else
	        	ws.date=wdata[i].ccdate;	
        	ws.cacceptman=wdata[i].cacceptman;
        	ws.jdr=wdata[i].jdr;
        	ws.address=wdata[i].address;
        	ws.rs=wdata[i].rs;
        	ws.yijian=wdata[i].yijian;
        	ws.peo1=wdata[i].peo1;
        	ws.sex1=wdata[i].sex1;
        	ws.job1=wdata[i].job1;
        	ws.peo2=wdata[i].peo2;
        	ws.sex2=wdata[i].sex2;
        	ws.job2=wdata[i].job2;
        	ws.peo3=wdata[i].peo3;
        	ws.sex3=wdata[i].sex3;
        	ws.FileNo=wdata[i].FileNo;
        	ws.type=wdata[i].type;
        	ws.ccdate=wdata[i].ccdate;
        	ws.yylx=wdata[i].yylx;
        	w.push(ws);	

        	}
        	storew.setData(w);
        	
            var y=[];
        	
        	for(var i=0;i<ydata.length;i++){
        	var ws={};
        	ws.title=ydata[i].subject;
        	ws.company=ydata[i].company;
        	if(ydata[i].yylx=="接待")
        	ws.date=ydata[i].startdate;
        	else
        	ws.date=ydata[i].ccdate;	
        	ws.cacceptman=ydata[i].cacceptman;
        	ws.jdr=ydata[i].jdr;
        	ws.address=ydata[i].address;
        	ws.rs=ydata[i].rs;
        	ws.yijian=ydata[i].yijian;
        	ws.peo1=ydata[i].peo1;
        	ws.sex1=ydata[i].sex1;
        	ws.job1=ydata[i].job1;
        	ws.peo2=ydata[i].peo2;
        	ws.sex2=ydata[i].sex2;
        	ws.job2=ydata[i].job2;
        	ws.peo3=ydata[i].peo3;
        	ws.sex3=ydata[i].sex3;
        	ws.job3=ydata[i].job3;
        	ws.FileNo=ydata[i].FileNo;
        	ws.ststime=ydata[i].ststime;
        	ws.edtime=ydata[i].edtime;
        	ws.jdqk=ydata[i].jdqk;
        	ws.type=ydata[i].type;
        	ws.ccdate=ydata[i].ccdate;
        	ws.yylx=ydata[i].yylx;
        	y.push(ws);	
        	}
        	
        	storey.setData(y);
        };
      
		var params = {};
		params.adpName = 'HttpAdapter_OA';
		params.prodNmae = 'yuyuedocbyjdr';
		params.prmName = [username];
		obj5.connectServerComm(getResult, params);
		};
	},

	// 我的流程
	WDLZ : function(obj, e, eOpts) {
		this.NextView('MyProcess_id', 'HelcOA.view.MyProcess.MyProcess');
		var getResult = function(res) {
			var userSolist = [];
			var cs = 0;// 下标
			for (var i = 0; i < res.data.length; i++) {
				// 去掉_前面的字符
				if (res.data[cs].app_name != null && res.data[cs].subject != undefined) {
					var a = res.data[cs].app_name.split('_');
				}

				userSolist[cs] = res.data[cs];
				if (typeof (a) != 'undefined') {
					userSolist[cs].app_name = a[1];
				}

				if (res.data[cs].app_name == '日常办公') {
					res.data[cs].icon = 'O';
					res.data[cs].class = 'i_Button_List_Icon_2';
					res.data[cs].color = '#854107';
				} else if (res.data[cs].app_name == '信息技术') {
					res.data[cs].icon = 'i';
					res.data[cs].class = 'i_Button_List_Icon_2';
					res.data[cs].color = '#009ddc';
				} else if (res.data[cs].app_name == '营业,工程业务') {
					res.data[cs].icon = 'b';
					res.data[cs].class = 'i_Button_List_Icon_2';
					res.data[cs].color = '#fbb726';
				} else if (res.data[cs].app_name == '质量控制') {
					res.data[cs].icon = '!';
					res.data[cs].class = 'i_Button_List_Icon_2';
					res.data[cs].color = '#e03a3e';
				} else if (res.data[cs].app_name == '人力资源') {
					res.data[cs].icon = '|';
					res.data[cs].class = 'i_Button_List_Icon_2';
					res.data[cs].color = '#fcb827';
				} else if (res.data[cs].app_name == 'OA_成都') {
					res.data[cs].icon = '|';
					res.data[cs].class = 'i_Button_List_Icon_2';
					res.data[cs].color = '#fcb827';
				} else {
					res.data[cs].icon = 'h';
					res.data[cs].class = 'i_Button_List_Icon_2';
					res.data[cs].color = '#fcb827';
				}
				cs++;
			}

			// set到节点选择页面的数据STORE
			var store = Ext.data.StoreManager.get("MyProcessStore");
			if (!store) {
				store = Ext.create("HelcOA.store.MyProcess.MyProcessStore");
			}

			// 判断输出内容
			var listdata = [];
			userSolist = res.data;
			var cs = 0;
			for (var j = 0; j < userSolist.length; j++) {
				// 分类：日常办公
				if (userSolist[j].subject != "null" && userSolist[j].subject != "-") {
					listdata[cs] = userSolist[j]; cs++;
				}
			}
			store.setData(listdata);
		};
		console.log('_vt:' + _vt);
		console.log('userkey:' + userkey);
		var myParam = [ _vt, userkey ];
		var params = {};
		params.adpName = 'HttpAdapter_BPM';
		params.prodNmae = 'toMyTodoListRecord';
		params.prmName = myParam;
		this.connectServerComm(getResult, params);
	},

});