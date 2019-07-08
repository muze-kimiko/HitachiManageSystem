
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
		//分类：人力资源
		if(record.data.processname == "丧假申请流程（派驻人员专用）"){
			obj_this.NextView('yjs_FuneralLeave_id','HelcOA.view.HasEnded.humanresources.FuneralLeave');
		}
	}
}); 