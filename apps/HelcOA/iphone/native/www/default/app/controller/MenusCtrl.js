
/* JavaScript content from app/controller/MenusCtrl.js in folder common */
/**
 * 列表页面
 */
Ext.define('HelcOA.controller.MenusCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'MenusCtrl_id',
	config:{
		control:{
			'list#ForApprovalProcess_ID':{
				itemtap:'ForApprovalProcess'
			},
			'button#WDLZ_ID':{
				tap:'WDLZ',
			 },
		}	
	},
	
    ForApprovalProcess:function(obj, index, target, record, e, eOpts){
    	var obj_this = this;
    	store=this.getStore("MenusS_id","HelcOA.store.MenusS");
    	var data =  record.data;
 
		cc.log("-------------------record--------------------");
		cc.log(record);
    	//判断进入哪个页面
		//分类：日常办公
		if(data.proc_name=='出差申请'){
			this.NextView('travelRequest_ID','HelcOA.view.ForApprovalProcess.DailyOffice.travelRequest');
			Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		}else if(data.proc_name=='工作联络书'){
			this.NextView('jobContactBook_ID','HelcOA.view.ForApprovalProcess.DailyOffice.jobContactBook');
			Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		}else if(data.proc_name=='用印申请'){
			this.NextView('sp_useStamp_id','HelcOA.view.ForApprovalProcess.DailyOffice.useStamp');
			Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		}
		else if(data.proc_name=='会议室申请流程'){
			this.NextView('sp_MeetingRoomReservationTable_id','HelcOA.view.ForApprovalProcess.DailyOffice.MeetingRoomReservationTable');
			Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		}
		else if(data.proc_name=='合同校正章(1)用印申请'){
			returnForm="sp_contractStamp_id";
			//跳转页面
			this.NextView('sp_contractStamp_id','HelcOA.view.ForApprovalProcess.DailyOffice.contractStamp');
			Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		}
		else if(data.proc_name=='公务用车联络流程'){
			returnForm="sp_governmentCar_id";
			//跳转页面
			this.NextView('sp_governmentCar_id','HelcOA.view.ForApprovalProcess.DailyOffice.governmentCar');
			Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		}
		else if(data.proc_name=="公司对外合同审批流程"){
			this.NextView('sp_contractExamine_ID','HelcOA.view.ForApprovalProcess.DailyOffice.contractExamine');
			Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		}else if(data.proc_name=="公司规章制度审批流程"){
			this.NextView('sp_rulesAndRegulations_ID','HelcOA.view.ForApprovalProcess.DailyOffice.rulesAndRegulations');
			Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		}else if(data.proc_name=='公司发文流程'){
			this.NextView('sp_companyOutgoing_ID','HelcOA.view.ForApprovalProcess.DailyOffice.companyOutgoing');
			Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
	    }else if(data.proc_name=='内部法律咨询流程'){
	    	this.NextView('sp_InternalLegalAdvisoryElectronFlow_ID','HelcOA.view.ForApprovalProcess.DailyOffice.InternalLegalAdvisoryElectronFlow');
	    	Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		}else if(data.proc_name=='物业公司对外合同审批流程'){
			this.NextView('sp_propertyContractExamine_ID','HelcOA.view.ForApprovalProcess.DailyOffice.propertyContractExamine');
			Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		}else if(data.proc_name=='接待客户工作联络流程'){
			this.NextView('sp_CustomerReception_ID','HelcOA.view.ForApprovalProcess.DailyOffice.CustomerReception');
			Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		}else if(data.proc_name=='境外出差申请'){
			this.NextView('sp_OverseasTrip_id','HelcOA.view.ForApprovalProcess.DailyOffice.OverseasTrip');
			Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		}else if(data.proc_name=='法人授权'){
			this.NextView('sp_LegalAuthorization_id','HelcOA.view.ForApprovalProcess.DailyOffice.LegalAuthorization');
			Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		}else if(data.proc_name=='投资公司经理出差申请流程'){
			this.NextView('sp_investManager_id','HelcOA.view.ForApprovalProcess.DailyOffice.investManager');
			Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		}else if(data.proc_name=='视频设备申请'){
	    	this.NextView('sp_VideoEquipmentApplicationForm_id','HelcOA.view.ForApprovalProcess.DailyOffice.VideoEquipmentApplicationForm');
	    	Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
	    }else if(data.proc_name=='PO单审核'){
	    	this.NextView('sp_POFormExamine_id','HelcOA.view.ForApprovalProcess.DailyOffice.POFormExamine');
	    	Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
	    	Ext.getCmp('subject').setValue(record.data.subject);
	    //分类：营业/工程业务
	    }else if(data.proc_name=='维修改造工程业务联络流程'){
	    	this.NextView('sp_MaintainTransformView_id','HelcOA.view.ForApprovalProcess.BusinessService.MaintainTransformView');
	    	Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
	    }else if(data.proc_name=='非标报告作业处理流程'){
	    	this.NextView('sp_nonstandardWork_id','HelcOA.view.ForApprovalProcess.BusinessService.nonstandardWork');
	    	Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
	    }else if(data.proc_name=='诉讼审批流程'){
	    	this.NextView('sp_litigationApprove_id','HelcOA.view.ForApprovalProcess.BusinessService.litigationApprove');
	    	Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
	    }else if(data.proc_name=='开具发票'){
	    	this.NextView('sp_Invoice_id','HelcOA.view.ForApprovalProcess.BusinessService.Invoice');
	    	Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
	    //分类：提案管理流程
	    }else if(data.proc_name=='提案管理流程'){
	    	this.NextView('sp_PM_TAGLLC_NG_id','HelcOA.view.ForApprovalProcess.ProposalManage.PM_TAGLLC_NG');
	    	Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
		//分类：质量控制
	    }else if(data.proc_name=='开箱补缺件及不良问题反馈报告'){
	    	this.NextView('sp_KXBQJView_id','HelcOA.view.ForApprovalProcess.QualityControl.KXBQJView');
	    	Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
	    }else if(data.proc_name=='三包申请报告'){
	    	this.NextView('sp_ThreeGuarantees_id','HelcOA.view.ForApprovalProcess.QualityControl.ThreeGuarantees');
	    	Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
	    }else if(data.proc_name=='质量部投诉流程'){
	    	this.NextView('sp_QualityComplain_id','HelcOA.view.ForApprovalProcess.QualityControl.QualityComplain');
	    	Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
	    	//分类：人力资源
	    }else if(data.proc_name=='丧假申请流程（派驻人员专用）'){
	    	this.NextView('sp_FuneralLeave_id','HelcOA.view.ForApprovalProcess.humanresources.FuneralLeave');
	    	Ext.getCmp('surface_ID').setTitle(record.data.proc_name);
	    }
		else{ 
			Ext.Msg.alert('提示','没有此页面！');
			return;
		}
    	var taskid = data.task_id;
        Ext.getCmp("taskid").setValue(taskid);
        cc.log(taskid);
		
        var getResult3=function(res){
        	cc.log("------res-----");
        	cc.log(res);
        	
        	if(typeof(res) !="undefined"){
        		
        		var jsonObj=Ext.JSON.decode(res.ovar);
        		var node_data=Ext.JSON.decode(jsonObj.data.acti);
        		cc.log("---node_data--");
        		cc.log(node_data.node.name);
        		Ext.getCmp('piid').setValue(node_data.piid);
        		if(jsonObj.data.pur=="")jsonObj.data.pur="{}";
        		var purObj=Ext.JSON.decode(jsonObj.data.pur);
        		var status=jsonObj.status;
        		cc.log(purObj);
        		if(status.code == "200"){
        			//状态正常
//        			for(key in jsonObj.data.fdata.mast){
        				try{
        					for(key in purObj){
            					if(purObj[key]==0){
            						if(Ext.getCmp(key)){
            							Ext.getCmp(key).setHidden(true);
            						}
            					}else if(purObj[key]==1){
            						if(Ext.getCmp(key)){
            							Ext.getCmp(key).setHidden(true);
            						}
            					}else if(purObj[key]==2){
            						if(Ext.getCmp(key)){
            							Ext.getCmp(key).setHidden(false);
            							var xtypes = Ext.getCmp(key).getXTypes();
            							if(xtypes.substring(xtypes.length-6,xtypes.length)!='button'){
            								Ext.getCmp(key).setReadOnly(true);
            							}else{
            								Ext.getCmp(key).setDisabled(true);
            							}
            							Ext.getCmp(key).setZIndex(999);
            						}
            					}else if(purObj[key]==3){
            						if(Ext.getCmp(key)){
            							Ext.getCmp(key).setHidden(false);
            							var xtypes = Ext.getCmp(key).getXTypes();
            							if(xtypes.substring(xtypes.length-6,xtypes.length)!='button'){
            								Ext.getCmp(key).setReadOnly(false);
            							}
            						}
            					}
            				}
        					var jsonObj=eval("("+ res.ovar +")");
        					for(key in jsonObj.data.fdata.mast){
        	    				try{
        	    					Ext.getCmp(key).setValue(jsonObj.data.fdata.mast[key]);
        	    				}catch(e){
        	    					cc.log('设值错误数据！'+e+' '+key );
        	    				}
        	    			}
        					Ext.getCmp('node').setValue(node_data.node.name);
        				}catch(e){
        					cc.log('错误数据！'+key);
        				}
//        			}
        			
        			var audit_list_str = JSON.stringify(jsonObj.data.fdata.audit_list);
        			cc.log('----------audit_list_str----------');
        			cc.log(audit_list_str);
        			
        			Ext.getCmp('audit_list').setValue(audit_list_str);
        			
        			var mast_str = JSON.stringify(jsonObj.data.fdata.mast);
        			Ext.getCmp('mast').setValue(mast_str);
        			
        			var audit_list = Ext.getCmp('audit_list').getValue();
        			
        			if(audit_list !=""){
        				cc.log('----------audit_list----------');
        				cc.log(audit_list);
        				var jsonObj = eval("("+ audit_list +")");
        				cc.log('----------jsonObj----------');
        				cc.log(jsonObj);
        				
        				var formPanel = Ext.getCmp('fp');
        				for(var i=0;i<jsonObj.length;i++){
//        					if(jsonObj[i].node!='起草' && jsonObj[i].node!='' && jsonObj[i].node!=undefined &&  jsonObj[i].node!=null){
        					if(jsonObj[i].node!='' && jsonObj[i].node!=undefined &&  jsonObj[i].node!=null){
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
        								        	value: jsonObj[i].idea,
        								        	readOnly: true
        								        }]
        						};
        						
        						formPanel.add(fieldSet1);
        						
        					}
        				}
        				//判断流程类型(特殊情况)
        				if(data.proc_name=='公司发文流程'){
        					console.log('===========Y=========');
        					var dataOne=eval("("+ res.ovar +")");
        					console.log(dataOne.data.curuser.fullname);
        					console.log(dataOne.data.fdata.mast.agentman);
        					Ext.getCmp('bzr').setValue(dataOne.data.fdata.mast.agentman);
        				};
        				if(data.proc_name=='公司规章制度审批流程'){
        					if(hqflag=="否"){
        						Ext.getCmp('hqsl').setHidden(true);
        						for(var i=1;i<=12;i++){
        							Ext.getCmp('hqdep'+i).setHidden(true);
        						}
        					}else{
        						var hqsl = Ext.getCmp('hqsl').getValue();
        						for(var i=++hqsl;i<=12;i++){
        							Ext.getCmp('hqdep'+i).setHidden(true);
        						}
        					}
        					if(fwtype=="制度首发"){
        						Ext.getCmp('oldreadpeo').setHidden(true);
        					}
        				};
        			};
        			if(data.proc_name=='PO单审核'){
        				obj_this.getApplication().getController('ForApprovalProcess.DailyOffice.POFormExamineCtrl').initPOForm();
    				};
    				if(data.proc_name=='质量部投诉流程'&&Ext.getCmp('node').getValue()=="质量部判责"){
    					Ext.getCmp('sj').setReadOnly(false);
    					Ext.getCmp('zp').setReadOnly(false);
    					Ext.getCmp('yh').setReadOnly(false);
    					Ext.getCmp('qt').setReadOnly(false);
    					Ext.getCmp('fxjg_textarea').setReadOnly(false);
    				};
        		}else{
        			//状态不正常，可能是该数据已经处理
        			Ext.Msg.alert(status.msg);
        			WL.Toast.show(status.msg);
        			obj_this.showBackView();
        			obj_this.DestroyPublicId();
        			return;
        		} 
        	}else{
    			//状态不正常，可能是该数据已经处理
        		Ext.Msg.alert("数据异常,请刷新");
    			obj_this.showBackView();
    			obj_this.DestroyPublicId();
    			return;
        	}
    			
        	
			
			
        	
            
		};
		
		var content ={method:'ForApprovalProcess',task_id:data.task_id, piid:data.piid};
		cc.log(content);
		this.connectServer3(getResult3,content);
    },
    
    ininData : function() {
    	var obj5 = this;
    	
    	//添加下拉到底部加载更多数据
    	var store = this.getStore('MenusS','HelcPDA.store.MenusS');
    	var store2 = this.getStore('MenusS2','HelcPDA.store.MenusS2');
    	Ext.getCmp('ForApprovalProcess_ID')._scrollable._scroller.addListener('scrollend',function(obj, x, y, eOpts){
    		if(obj.position.y==obj.maxPosition.y){
    			var Ypos = obj.position.y;
    			var Sflag = store.data.items.length;
    			var data2 = [];
    			var flag = true;
    			for(var i = Sflag;i<Sflag+10;i++){
    				if(typeof(store2.data.items[i])=="undefined"){
    					flag = false;
    					break;
    				}else{
    					data2.push(store2.data.items[i]);
    				}
    			}
    			store.add(data2);
    			if(flag){
    				obj5.Waitting('正在加载...');
        			setTimeout(function(){
        				obj5.HideWaitting();
        			}, 1000);
    			}
    			Ext.getCmp('ForApprovalProcess_ID')._scrollable._scroller.scrollTo(0, Ypos);
    		}
    	},this,{});

		var LI=document.getElementById('xdlz');
		LI.onclick = function (){
			obj5.NextView('qc_StartProcess_id','HelcOA.view.startTheProcess.startTheProcess');
		};
    	
		
		
		//公告
		var GG=document.getElementById('gg');
		GG.onclick = function (){
			obj5.NextView('News_id','HelcOA.view.Affiche.news');
			var store = obj5.getStore('newsStore','HelcOA.store.Affiche.newsStore');
			var getResult=function(res){
				var returnData = eval("("+ res.GETGSGGLISTReturn.CDATA +")");
				
//				for(var i =0;i<returnData.data.length;i++){
//					returnData.data[i].ctime=Ext.Date.format(new Date(returnData.data[i].ctime),"Y-m-d H:m:s");
//				};

				store.setData(returnData.data);
				
				cc.log(returnData);
			};
			
			var params = {};
			params.method = 'GetGSGGList';
			params.parameters = ['001001'];
			obj5.connectServer_OA(getResult,params);
		};
		
		
		//一周活动
		var YZHD=document.getElementById('yzhd');
		YZHD.onclick = function (){
			obj5.NextView('WeekMeet_id','HelcOA.view.WeekMeet.WeekMeet');
			
			var store = obj5.getStore('WeekMeetStore','HelcOA.store.WeekMeet.WeekMeetStore');
			var getResult=function(res){
				var returnData = eval("("+ res.GETWEEKMEETLISTReturn.CDATA +")");
				store.setData(returnData.data);
				cc.log(returnData);
			};
			
			var params = {};
			params.method = 'GetWeekMeetList';
			params.parameters = [];
			obj5.connectServer_OA(getResult,params);
		};
		
		
		
		
		//已结束
		var YJS=document.getElementById('yjs');
		YJS.onclick = function (){
			//set到节点选择页面的数据STORE
			var store=Ext.data.StoreManager.get("HasEndedStore");
			if(!store){
				store=Ext.create("HelcOA.store.HasEnded.HasEndedStore");
			}
			store.setData([]);
			obj5.NextView('HasEnded_id','HelcOA.view.HasEnded.HasEnded');
			
			var getResult=function(res){
				cc.log('----已结束 res----');
				cc.log(res);
			    var d=res.PROCESSDOCReturn.CDATA.replace("\"\"null\"\"","null");
			    var data=d.replace("\"\"null\"\"","null");
				cc.log(data);
				cc.log(d);
				
//				var jsonObj=Ext.JSON.decode(res.msg);
				
				var CDATA_json = eval("("+ data +")");
				
				var userSolist=[];
				var cs = 0;//下标
				for(var i=0;i<CDATA_json.data.length;i++){
					userSolist[cs]=CDATA_json.data[cs];
					cc.log(userSolist[cs]);
					cs++;
				}
				
				
				//判断输出内容
				var listdata=[];
				var cs=0;
				for(var j=0;j<userSolist.length;j++){
					if(userSolist[j].processname=="工作联络书" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="出差申请" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="用印申请" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="合同校正章(1)用印申请" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="公务用车联络流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="内部法律咨询流程" && userSolist[j].subject != "null"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					
					if(userSolist[j].processname=="境外出差申请" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="公司对外合同审批流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}

					if(userSolist[j].processname=="公司规章制度审批流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="PO单审核" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}

					
					if(userSolist[j].processname=="法人授权"&& userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="物业公司对外合同审批流程"&& userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="会议室申请流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="公司发文流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="投资公司经理出差申请流程"&& userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="视频设备申请" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="接待客户工作联络流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					//分类：营业/工程业务
					if(userSolist[j].processname=="维修改造工程业务联络流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="非标报告作业处理流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="诉讼审批流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="开具发票" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					//分类：提案管理流程
					if(userSolist[j].processname=="提案管理流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					//分类：质量控制
					if(userSolist[j].processname=="三包申请报告" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].processname=="开箱补缺件及不良问题反馈报告" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					//人力资源
					if(userSolist[j].processname=="丧假申请流程（派驻人员专用）" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
				}
				store.setData(listdata);
//				store.setData(userSolist);
				
			};
	           
			var myParam = [usernames];
			var params = {};
			params.adpName = 'HttpAdapter_OA';
			params.prodNmae = 'Getenddoc';
			params.prmName = myParam;
			obj5.connectServerComm(getResult,params);
		
		};
		
		//已审批流程
		var YCP=document.getElementById('ycp');
		YCP.onclick = function (){
			obj5.NextView('Approved_id','HelcOA.view.Approved.Approved');
			//set到节点选择页面的数据STORE
			var store=Ext.data.StoreManager.get("ApprovedStore");
			if(!store){
				store=Ext.create("HelcOA.store.Approved.ApprovedStore");
			}
			store.setData([]);
			var getResult=function(res){
				cc.log(res.data);
				var userSolist=[];
				var cs = 0;//下标
				for(var i=0;i<res.data.length;i++){

					//去掉_前面的字符
					if(res.data[cs].app_name!=null && res.data[cs].subject!=undefined){
						var a=res.data[cs].app_name.split('_');
					}

					userSolist[cs]=res.data[cs];
					if(typeof(a)!='undefined'){
						userSolist[cs].app_name=a[1];
					}
						if(res.data[cs].app_name=='日常办公'){
							res.data[cs].icon='O';
							res.data[cs].class='i_Button_List_Icon_2';
							res.data[cs].color='#854107';
						}else if(res.data[cs].app_name=='信息技术'){
							res.data[cs].icon='i';
							res.data[cs].class='i_Button_List_Icon_2';
							res.data[cs].color='#009ddc';
						}else if(res.data[cs].app_name=='营业,工程业务'){
							res.data[cs].icon='b';
							res.data[cs].class='i_Button_List_Icon_2';
							res.data[cs].color='#fbb726';
						}else if(res.data[cs].app_name=='质量控制'){
							res.data[cs].icon='!';
							res.data[cs].class='i_Button_List_Icon_2';
							res.data[cs].color='#e03a3e';
						}else if(res.data[cs].app_name=='人力资源'){
							res.data[cs].icon='|';
							res.data[cs].class='i_Button_List_Icon_2';
							res.data[cs].color='#fcb827';
						}else if(res.data[cs].app_name=='OA_成都'){
							res.data[cs].icon='|';
							res.data[cs].class='i_Button_List_Icon_2';
							res.data[cs].color='#fcb827';
						}else{
							res.data[cs].icon='h';
							res.data[cs].class='i_Button_List_Icon_2';
							res.data[cs].color='#fcb827';
						}
						
//						//判断subject前面是否加 '/'
//						if(res.data[cs].subject=='null' || res.data[cs].subject==undefined){
//							res.data[cs].subject='';
//						}else{
//							res.data[cs].subject='/'+ res.data[cs].subject;
//						}
	        	    	cs++;
	        	    	
				}


//				//判断输出内容
				var listdata=[];
				userSolist=res.data;
				var cs=0;
				for(var j=0;j<userSolist.length;j++){
					if(userSolist[j].proc_name_dist=="工作联络书" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="出差申请" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="用印申请" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="合同校正章(1)用印申请" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="公务用车联络流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="内部法律咨询流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="境外出差申请" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}

					if(userSolist[j].proc_name_dist=="公司发文流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}


					if(userSolist[j].proc_name_dist=="PO单审核" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="公司规章制度审批流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}

					if(userSolist[j].proc_name_dist=="法人授权" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="物业公司对外合同审批流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="公司对外合同审批流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="会议室申请流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="公司发文流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="投资公司经理出差申请流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="视频设备申请" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="接待客户工作联络流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					//分类：营业/工程业务
					if(userSolist[j].proc_name_dist=="维修改造工程业务联络流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="非标报告作业处理流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="诉讼审批流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="开具发票" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					//分类：提案管理流程
					if(userSolist[j].proc_name_dist=="提案管理流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					//分类：质量控制
					if(userSolist[j].proc_name_dist=="三包申请报告" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					if(userSolist[j].proc_name_dist=="开箱补缺件及不良问题反馈报告" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
					//分类：人力资源
					if(userSolist[j].proc_name_dist=="丧假申请流程（派驻人员专用）" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
						listdata[cs]=userSolist[j];
						cs++;
					}
				}
				cc.log(res.data.length);
				cc.log(listdata.length);
				store.setData(listdata);
//				store.setData(userSolist);
				
			};
	           
			var myParam = [_vt,userkey];
			var params = {};
			params.adpName = 'HttpAdapter_BPM';
			params.prodNmae = 'toOvrTodoListRecord';
			params.prmName = myParam;
			obj5.connectServerComm(getResult,params);
		
		};
    },
    
	//我的流程
    WDLZ:function(obj, e, eOpts){
		this.NextView('MyProcess_id','HelcOA.view.MyProcess.MyProcess');
		
		var getResult=function(res){

			var userSolist=[];
			var cs = 0;//下标
			for(var i=0;i<res.data.length;i++){

				//去掉_前面的字符
				if(res.data[cs].app_name!=null && res.data[cs].subject!=undefined){
					var a=res.data[cs].app_name.split('_');
				}

				userSolist[cs]=res.data[cs];
				if(typeof(a)!='undefined'){
					userSolist[cs].app_name=a[1];
				}

					if(res.data[cs].app_name=='日常办公'){
						res.data[cs].icon='O';
						res.data[cs].class='i_Button_List_Icon_2';
						res.data[cs].color='#854107';
					}else if(res.data[cs].app_name=='信息技术'){
						res.data[cs].icon='i';
						res.data[cs].class='i_Button_List_Icon_2';
						res.data[cs].color='#009ddc';
					}else if(res.data[cs].app_name=='营业,工程业务'){
						res.data[cs].icon='b';
						res.data[cs].class='i_Button_List_Icon_2';
						res.data[cs].color='#fbb726';
					}else if(res.data[cs].app_name=='质量控制'){
						res.data[cs].icon='!';
						res.data[cs].class='i_Button_List_Icon_2';
						res.data[cs].color='#e03a3e';
					}else if(res.data[cs].app_name=='人力资源'){
						res.data[cs].icon='|';
						res.data[cs].class='i_Button_List_Icon_2';
						res.data[cs].color='#fcb827';
					}else if(res.data[cs].app_name=='OA_成都'){
						res.data[cs].icon='|';
						res.data[cs].class='i_Button_List_Icon_2';
						res.data[cs].color='#fcb827';
					}else{
						res.data[cs].icon='h';
						res.data[cs].class='i_Button_List_Icon_2';
						res.data[cs].color='#fcb827';
					}
					
//					//判断subject前面是否加 '/'
//					if(res.data[cs].subject=='null' || res.data[cs].subject==undefined){
//						res.data[cs].subject='';
//					}else{
//						res.data[cs].subject='/'+ res.data[cs].subject;
//					}
        	    	cs++;
			}

			//set到节点选择页面的数据STORE
			var store=Ext.data.StoreManager.get("MyProcessStore");
			if(!store){
				store=Ext.create("HelcOA.store.MyProcess.MyProcessStore");
			}

			//判断输出内容
			var listdata=[];
			userSolist=res.data;
			var cs=0;
			for(var j=0;j<userSolist.length;j++){
				//分类：日常办公
				if(userSolist[j].proc_name_dist=="工作联络书" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="出差申请" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="用印申请" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="合同校正章(1)用印申请" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="公务用车联络流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="内部法律咨询流程" && userSolist[j].subject != "null" && userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="境外出差申请" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="法人授权" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="公司规章制度审批流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="物业公司对外合同审批流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="公司对外合同审批流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="会议室申请流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="公司发文流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="投资公司经理出差申请流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="视频设备申请" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="接待客户工作联络流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="PO单审核" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				//分类：营业/工程
				if(userSolist[j].proc_name_dist=="维修改造工程业务联络流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="非标报告作业处理流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="诉讼审批流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="开具发票" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				//分类：提案管理流程
				if(userSolist[j].proc_name_dist=="提案管理流程" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				//分类：质量控制
				if(userSolist[j].proc_name_dist=="三包申请报告" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				if(userSolist[j].proc_name_dist=="开箱补缺件及不良问题反馈报告" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
				//分类：人力资源
				if(userSolist[j].proc_name_dist=="丧假申请流程（派驻人员专用）" && userSolist[j].subject != "null"&& userSolist[j].subject != "-"){
					listdata[cs]=userSolist[j];
					cs++;
				}
			}
			store.setData(listdata);
//			store.setData(userSolist);
			
		};
           
		var myParam = [_vt,userkey];
		var params = {};
		params.adpName = 'HttpAdapter_BPM';
		params.prodNmae = 'toMyTodoListRecord';
		params.prmName = myParam;
		this.connectServerComm(getResult,params);
	},
	
});					