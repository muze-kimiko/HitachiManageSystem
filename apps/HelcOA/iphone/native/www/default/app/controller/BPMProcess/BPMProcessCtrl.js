
/* JavaScript content from app/controller/BPMProcess/BPMProcessCtrl.js in folder common */
 Ext.define('HelcOA.controller.BPMProcess.BPMProcessCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	config:{
		control:{
			//根据条件查询数据
			'button#search_ERP_info':{
				tap:'search_ERP_info',
			},
			//进入查询流程模块
			'button#SearchProcess_ID':{
				tap:'SearchProcess_ID',
			},
			//上一页
			'button#BPMP_arrow_up':{
				tap:'BPMP_arrow_up',
			},
			//下一页
			'button#BPMP_arrow_down':{
				tap:'BPMP_arrow_down',
			},
			//点击list查看详细
			'list#SearchProcess_list':{
				itemtap:'SearchProcess_list',
			},
			//根据分类设置流程
			'selectfield#sp_fenlei':{
				change:'fenlei',
			},
		}	
	},
	
	
	SearchProcess_list : function(obj, index, target, record, e, eOpts){
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
		
		//跳转页面
		if(record.data.proc_name_dist == "工作联络书"){
			obj_this.NextView('yjs_jobContactBook_ID','HelcOA.view.HasEnded.DailyOffice.jobContactBook');
		}
		else if(record.data.proc_name_dist == "出差申请"){
			obj_this.NextView('yjs_travelRequest_ID','HelcOA.view.HasEnded.DailyOffice.travelRequest');
		}
		else if(record.data.proc_name_dist == "合同校正章(1)用印申请"){
			obj_this.NextView('yjs_contractStamp_ID','HelcOA.view.HasEnded.DailyOffice.contractStamp');
		}
		else if(record.data.proc_name_dist == "公务用车联络流程"){
			obj_this.NextView('yjs_governmentCar_ID','HelcOA.view.HasEnded.DailyOffice.governmentCar');
		}
		else if(record.data.proc_name_dist == "用印申请"){
			obj_this.NextView('yjs_useStamp_ID','HelcOA.view.HasEnded.DailyOffice.useStamp');
		}
		else if(record.data.proc_name_dist == "内部法律咨询流程"){
			obj_this.NextView('yjs_InternalLegalAdvisoryElectronFlow_ID','HelcOA.view.HasEnded.DailyOffice.InternalLegalAdvisoryElectronFlow');
		}
		else if(record.data.proc_name_dist == "境外出差申请"){
			obj_this.NextView('yjs_OverseasTrip_ID','HelcOA.view.HasEnded.DailyOffice.OverseasTrip');
		}
		else if(record.data.proc_name_dist == "法人授权"){
			obj_this.NextView('yjs_LegalAuthorization_id','HelcOA.view.HasEnded.DailyOffice.LegalAuthorization');
		}
		else if(record.data.proc_name_dist == "公司对外合同审批流程"){
			obj_this.NextView('yjs_contractExamine_ID','HelcOA.view.HasEnded.DailyOffice.contractExamine');
		}
		else if(record.data.proc_name_dist == "物业公司对外合同审批流程"){
			obj_this.NextView('yjs_propertyContractExamine_ID','HelcOA.view.HasEnded.DailyOffice.propertyContractExamine');
		}
		else if(record.data.proc_name_dist == "会议室申请流程"){
			obj_this.NextView('yjs_MeetingRoomReservationTable_ID','HelcOA.view.HasEnded.DailyOffice.MeetingRoomReservationTable');
		}
		else if(record.data.proc_name_dist == "公司发文流程"){
			obj_this.NextView('yjs_companyOutgoing_ID','HelcOA.view.HasEnded.DailyOffice.companyOutgoing');
		}
		else if(record.data.proc_name_dist == "视频设备申请"){
			obj_this.NextView('yjs_VideoEquipmentApplicationForm_ID','HelcOA.view.HasEnded.DailyOffice.VideoEquipmentApplicationForm');
		}
		else if(record.data.proc_name_dist == "接待客户工作联络流程"){
			obj_this.NextView('yjs_CustomerReception_ID','HelcOA.view.HasEnded.DailyOffice.CustomerReception');
		}
		else if(record.data.proc_name_dist == "公司规章制度审批流程"){
			obj_this.NextView('yjs_rulesAndRegulations_ID','HelcOA.view.HasEnded.DailyOffice.rulesAndRegulations');
		}
		else if(record.data.proc_name_dist == "投资公司经理出差申请流程"){
			obj_this.NextView('yjs_investManager_ID','HelcOA.view.HasEnded.DailyOffice.investManager');
		}
		//分类：营业/工程业务
		else if(record.data.proc_name_dist == "维修改造工程业务联络流程"){
			obj_this.NextView('yjs_MaintainTransformView_ID','HelcOA.view.HasEnded.BusinessService.MaintainTransformView');
		}
		else if(record.data.proc_name_dist == "非标报告作业处理流程"){
			obj_this.NextView('yjs_nonstandardWork_id','HelcOA.view.HasEnded.BusinessService.nonstandardWork');
		}
		else if(record.data.proc_name_dist == "诉讼审批流程"){
			obj_this.NextView('yjs_litigationApprove_id','HelcOA.view.HasEnded.BusinessService.litigationApprove');
		}
		else if(record.data.proc_name_dist == "开具发票"){
			obj_this.NextView('yjs_Invoice_id','HelcOA.view.HasEnded.BusinessService.Invoice');
		}
		//分类：提案管理流程
		else if(record.data.proc_name_dist == "提案管理流程"){
			obj_this.NextView('yjs_PM_TAGLLC_NG_id','HelcOA.view.HasEnded.ProposalManage.PM_TAGLLC_NG');
		}
		//分类：质量控制
		else if(record.data.proc_name_dist == "三包申请报告"){
			obj_this.NextView('yjs_ThreeGuarantees_id','HelcOA.view.HasEnded.QualityControl.ThreeGuarantees');
		}
		//分类：人力资源
		else if(record.data.proc_name_dist == "丧假申请流程（派驻人员专用）"){
			obj_this.NextView('yjs_FuneralLeave_id','HelcOA.view.HasEnded.humanresources.FuneralLeave');
		}
		else{
			Ext.Msg.alert('请在电脑端查看');
			return;
		}
		
		var myParam = [_vt,obj_piid];
		var params = {};
		params.adpName = 'HttpAdapter_BPM';
		params.prodNmae = 'examine';
		params.prmName = myParam;
		obj_this.connectServerComm(getResult,params);
	},
	
	BPMP_arrow_up : function(){
		var fenlei = Ext.getCmp('sp_fenlei').getValue();
		var proc_name = Ext.getCmp('sp_proc_name').getValue();
		var subject = Ext.getCmp('sp_subject').getValue();
		var billno = Ext.getCmp('sp_billno').getValue();
		var df_man = Ext.getCmp('sp_df_man').getValue();
		var store = this.getStore('BPMProcessStore','HelcOA.store.BPMProcess.BPMProcessStore');
		var pageArray = Ext.getCmp('BPMP_page').getText().split('/');
		var startNum = parseInt(pageArray[0]*8)-16;
		var start = startNum.toString();
		if(start <0){
			Ext.Msg.alert('这是第一页!');
			return;
		};
		var page = pageArray[0];
		var limit = '8';
		var getResult=function(res){
			cc.log(res);
			var result = ""+res.total/8+"";
			if(result.indexOf(".")!=-1){
				count = parseInt(res.total/8)+1;
			}else{
				count = parseInt(res.total/8);
			}
			var data = res.data;
			var pages = parseInt(page)-1;
			Ext.getCmp('BPMP_page').setText(pages+'/'+count);
			cc.log(data);
			store.setData(data);
		};
		var params = {};
		params.method = 'GetERPProcess_Info';
		params.parameters = [fenlei,proc_name,subject,billno,df_man,page,start,limit,userkey];
		this.connectServer_BPM(getResult,params);
	},
	
	BPMP_arrow_down : function(){
		var fenlei = Ext.getCmp('sp_fenlei').getValue();
		var proc_name = Ext.getCmp('sp_proc_name').getValue();
		var subject = Ext.getCmp('sp_subject').getValue();
		var billno = Ext.getCmp('sp_billno').getValue();
		var df_man = Ext.getCmp('sp_df_man').getValue();
		var store = this.getStore('BPMProcessStore','HelcOA.store.BPMProcess.BPMProcessStore');
		var pageArray = Ext.getCmp('BPMP_page').getText().split('/');
		var startNum = parseInt(pageArray[0]*8);
		var start = startNum.toString();
		var page = pageArray[0];
		var limit = '8';
		var getResult=function(res){
			cc.log(res);
			if(res.data.length == 0){
				Ext.Msg.alert('这是最后一页了!');
				return;
			}
			var result = ""+res.total/8+"";
			if(result.indexOf(".")!=-1){
				count = parseInt(res.total/8)+1;
			}else{
				count = parseInt(res.total/8);
			}
			var data = res.data;
			var pages = parseInt(page)+1;
			Ext.getCmp('BPMP_page').setText(pages+'/'+count);
			cc.log(data);
			store.setData(data);
		};
		var params = {};
		params.method = 'GetERPProcess_Info';
		params.parameters = [fenlei,proc_name,subject,billno,df_man,page,start,limit,userkey];
		this.connectServer_BPM(getResult,params);
	},
	
	search_ERP_info : function(){
		var obj_this = this;
		var fenlei = Ext.getCmp('sp_fenlei').getValue();
		var proc_name = Ext.getCmp('sp_proc_name').getValue();
		var subject = Ext.getCmp('sp_subject').getValue();
		var billno = Ext.getCmp('sp_billno').getValue();
		var df_man = Ext.getCmp('sp_df_man').getValue();
		var store=obj_this.getStore('BPMProcessStore','HelcOA.store.BPMProcess.BPMProcessStore');
		var page = '1';
		var start = '0';
		var limit = '8';
		if(fenlei==''){
			Ext.Msg.alert('请选择分类');
		}
		if(proc_name==''){
			Ext.Msg.alert('请选择流程名');
		}
		var getResult=function(res){
			cc.log(res);
			var result = ""+res.total/8+"";
			if(result=='NaN' || result=='0'){
				Ext.Msg.alert("查无数据!");
				Ext.getCmp('BPMP_page').setText('0/0');
				store.setData([]);
				return;
			}
			Ext.getCmp('sp_tab').setActiveItem(Ext.getCmp('sp_cont'));
			var count;
			if(result.indexOf(".")!=-1){
				count = parseInt(res.total/8)+1;
			}else{
				count = parseInt(res.total/8);
			}
			if(res.count==0){
				Ext.getCmp('BPMP_page').setText('0/0');
			}else{
				Ext.getCmp('BPMP_page').setText('1/'+count);
			}
			
			store.setData(res.data);
		};
		var params = {};
		params.method = 'GetERPProcess_Info';
		params.parameters = [fenlei,proc_name,subject,billno,df_man,page,start,limit,userkey];
		this.connectServer_BPM(getResult,params);
	},
	
	fenlei : function(obj, newValue, oldValue, eOpts ){
		var obj_this = this;
		var fenlei = newValue;
		var proc_name = '';
		var subject = '';
		var billno = '';
		var df_man = '';
		var page = '1';
		var start = '0';
		var limit = '8';
		var getResult=function(res){
			cc.log(res);
			var data2 = res.data2.unique3();
			var data="[{'value':'','text':'请选择'},";
	   		for(var i=0;i<data2.length;i++){
	   			if(i!=data2.length-1){
	   				data+="{'value':'"+data2[i].id+"','text':'"+data2[i].name+"'},";
	   			}else{
	   				data+="{'value':'"+data2[i].id+"','text':'"+data2[i].name+"'}";
	   			}
	   		 }
	   		data+="]";
	    	var str = eval(data);
			Ext.getCmp('sp_proc_name').setOptions(str);

		};
		var params = {};
		params.method = 'GetERPProcess_Info';
		params.parameters = [fenlei,proc_name,subject,billno,df_man,page,start,limit,userkey];
		this.connectServer_BPM(getResult,params);
	},
	
	
	SearchProcess_ID : function(){
		this.NextView('SearchProcess_id','HelcOA.view.BPMProcess.SearchProcess');
		var store = this.getStore('BPMProcessStore','HelcOA.store.BPMProcess.BPMProcessStore');
		store.setData([]);
		var obj_this = this;
		var fenlei = '';
		var proc_name = '';
		var subject = '';
		var billno = '';
		var df_man = '';
		var page = '1';
		var start = '0';
		var limit = '8';
		var getResult=function(res){
			cc.log(res);
			var data="[{'value':'','text':'请选择'},";
	   		for(var i=0;i<res.data3.length;i++){
	   			if(i!=res.data3.length-1){
	   				data+="{'value':'"+res.data3[i].id+"','text':'"+res.data3[i].name+"'},";
	   			}else{
	   				data+="{'value':'"+res.data3[i].id+"','text':'"+res.data3[i].name+"'}";
	   			}
	   		 }
	   		data+="]";
	    	var str = eval(data);
			Ext.getCmp('sp_fenlei').setOptions(str);

		};
		var params = {};
		params.method = 'GetERPProcess_Info';
		params.parameters = [fenlei,proc_name,subject,billno,df_man,page,start,limit,userkey];
		obj_this.connectServer_BPM(getResult,params);
	},
	
	
}); 
 
 Array.prototype.unique3 = function(){
		var re = [this[0]];
		for(var i=1;i<this.length;i++){
			if(this[i].id !=re[re.length-1].id){
				re.push(this[i]);
			}
		}
		return re;
 };
 