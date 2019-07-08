 Ext.define('HelcPDA.controller.oa.HasEnded.HasEndedCtrl',{
	extend:'HelcPDA.controller.ApplicationController_OA',
	config:{
		control:{
			"list#yjs_HasEndedList":{
				itemtap:'yjs_HasEndedList'
			},
			'button#yjs_returnHasEnded':{
				tap:'yjs_returnHasEnded',
			 }
		}	
	},
	
	yjs_returnHasEnded : function(){
		this.BackAndDestroy();
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
			obj_this.NextView('yjs_jobContactBook_ID','HelcPDA.view.oa.HasEnded.DailyOffice.jobContactBook');
		}
		if(record.data.processname == "出差申请"){
			obj_this.NextView('yjs_travelRequest_ID','HelcPDA.view.oa.HasEnded.DailyOffice.travelRequest');
		}
		if(record.data.processname == "用印申请"){
			obj_this.NextView('yjs_useStamp_ID','HelcPDA.view.oa.HasEnded.DailyOffice.useStamp');
		}
		//分类：营业/工程业务
		if(record.data.processname == "维修改造工程业务联络流程"){
			obj_this.NextView('yjs_MaintainTransformView_ID','HelcPDA.view.oa.HasEnded.BusinessService.MaintainTransformView');
		}
		if(record.data.processname == "非标报告作业处理流程"){
			obj_this.NextView('yjs_nonstandardWork_id','HelcPDA.view.oa.HasEnded.BusinessService.nonstandardWork');
		}
		if(record.data.processname == "诉讼审批流程"){
			obj_this.NextView('yjs_litigationApprove_id','HelcPDA.view.oa.HasEnded.BusinessService.litigationApprove');
		}
		if(record.data.processname == "开具发票"){
			obj_this.NextView('yjs_Invoice_id','HelcPDA.view.oa.HasEnded.BusinessService.Invoice');
		}
		//分类：提案管理流程
		if(record.data.processname == "提案管理流程"){
			obj_this.NextView('yjs_PM_TAGLLC_NG_id','HelcPDA.view.oa.HasEnded.ProposalManage.PM_TAGLLC_NG');
		}
		//分类：质量控制
		if(record.data.processname == "三包申请报告"){
			obj_this.NextView('yjs_ThreeGuarantees_id','HelcPDA.view.oa.HasEnded.QualityControl.ThreeGuarantees');
		}
		if(record.data.processname == "开箱补缺件及不良问题反馈报告"){
			obj_this.NextView('yjs_KXBQJView_id','HelcPDA.view.oa.HasEnded.QualityControl.KXBQJView');
		}
	}
}); 