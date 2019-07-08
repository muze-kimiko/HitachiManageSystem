/**
 * 已审批-工作联络书
 */
 Ext.define('HelcPAD.controller.OaMobileOffice.ElectronicProcess.MyProcessCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	id:'wdlc_MyProcess_id',
	config:{
		control:{
			
			//返回
			"button#returnHome_ID":{
				tap:'returnHome_ID'
			},
			
			//获取草起信息
			"list#wdlc_MyProcessList":{
				itemtap:'wdlc_MyProcessList'
			},
		}	
	},
	
	//返回
	returnHome_ID:function(){
		this.showBackView('installProject_ep_id','HelcPAD.view.OaMobileOffice.ElectronicProcess.installProject');
	},
	
	//
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
								        	xtype: 'textareafield',
								        	label: '内容',
								        	value: jsonObj[i].idea,
								        	readOnly: true
								        }]
						};
						
						formPanel.add(fieldSet1);
						
					}
				}
//			}
		
			
			
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
		//信息技术
		if(record.data.proc_name_dist == "PDA系统账号流程"){
			obj_this.NextView('wdlc_PDAaccount_id','HelcOA.view.MyProcess.InformationTechnology.PDAaccount');
		}
	}
}); 