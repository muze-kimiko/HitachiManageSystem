
/* JavaScript content from app/controller/install/ITM/ITM_Batch_Detail_Ctrl.js in folder common */
Ext.define('HelcPDA.controller.install.ITM.ITM_Batch_Detail_Ctrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
		},
		control:{
			//批量
			"button#itm_batch":{
				tap:'itm_batch'
			},
			//批量提交
			"button#Batch_CommitITM":{
				tap:'Batch_CommitITM'
			},
		}
	},
	
	
	//批量
	itm_batch : function(){
		var obj = this;
		var sele=document.getElementsByName('itm_ENO_Checkbox');
		var count=0;
		var counts=0;
		var xb=[];//存储下标
		for( var i = 0; i <sele.length; i++)  {  
		    // 提取控件  
		    var checkbox = sele[i];  
		    // 检查是否是指定的控件  
		    if (checkbox.style.color=='rgb(224, 58, 62)')  
		      {  
		    	xb[counts]=i;
		    	counts++;
		      }else{
		    	  count++;  
		      }
		 };
		 if(count==sele.length){
			 Ext.Msg.alert('请至少选中一个工号');
		 }else{
			 this.NextView('ITM_Batch_Detail_V','HelcPDA.view.install.ITM.ITM_Batch_Detail_V');
			 
		 };
		 
		 var ITM_batch_index=xb;
		 Ext.getCmp('ITM_batch_index').setValue(ITM_batch_index);
		 
		 //设置吊装结束时间不可填
		 Ext.getCmp('itm_LIFT_END_DATE_1').setDisabled(true);
		//时间的限制
			//吊装结束时间填写前需先填写吊装开始时间
			var liftstartdate=Ext.getCmp('itm_LIFT_START_DATE_1');
				liftstartdate.addListener('change',obj.liftstartdate1,this,{
			});
			//吊装结束时间需大于等于吊装开始时间，且不大于当天时间
			var liftenddate=Ext.getCmp('itm_LIFT_END_DATE_1');
				liftenddate.addListener('change',obj.liftenddate1,this,{
			});
			//入场时间不小于吊装结束时间且不大于当天时间
			var entrancedate=Ext.getCmp('itm_ENTRANCE_DATE_1');
				entrancedate.addListener('change',obj.entrancedate1,this,{
			});
			//填写报调日期要先填写入场日期且不大于当天时间
			var reportdebugdate=Ext.getCmp('itm_REPORT_DEBUG_DATE_1');
				reportdebugdate.addListener('change',obj.reportdebugdate1,this,{
			});	
	},
	
	
	
	//批处理提交
	Batch_CommitITM : function(){
		var obj = this;
		ITM_index = Ext.getCmp('ITM_batch_index').getValue();
		var ITM_batch_index = ITM_index.split(',');
		var index = ITM_batch_index;
		var ITMGHStore = obj.getStore("ITMGHStore","HelcPDA.store.install.ITM.ITMGHStore");
		var content=[];
		
		
		//取到合同号下所有工号信息
		var WL_process=WL.JSONStore.get(collectionName);
		var ENGCONTRACT_NUMBER=ITMGHStore.getAt(index[0]).get('ENGCONTRACT_NUMBER');
		var query={tcode:"ITM_data",tid:ENGCONTRACT_NUMBER};
		var options={
	    		   exact:false,
	       }; 
		WL_process.find(query,options).then(function(res_value){
			var statusquery={tcode:"ITM_status",tid:ENGCONTRACT_NUMBER};
			var options={
		    		   exact:false,
		       }; 
			WL_process.find(statusquery,options).then(function(res_status){
			for(var i=0;i<index.length;i++){
				var ELEVATOR_NO=ITMGHStore.getAt(index[i]).get('ELEVATOR_NO');
				var SEQ_NUM=ITMGHStore.getAt(index[i]).get('SEQ_NUM');
				//show.VALUE
				for(var j = 0; j<res_value.length; j++){
					if (ELEVATOR_NO == res_value[j].json.stext.ELEVATOR_NO && SEQ_NUM == res_value[j].json.stext.SEQ_NUM) {
						//用户输入的时间
						var itm_LIFT_START_DATE_1 = "";
						if(Ext.getCmp('itm_LIFT_START_DATE_1').getValue() != null){
							itm_LIFT_START_DATE_1 = Ext.Date.format(Ext.getCmp('itm_LIFT_START_DATE_1').getValue(),'Y-m-d');
						};
						
						var itm_LIFT_END_DATE_1 = "";
						if(Ext.getCmp('itm_LIFT_END_DATE_1').getValue() != null){
							itm_LIFT_END_DATE_1 = Ext.Date.format(Ext.getCmp('itm_LIFT_END_DATE_1').getValue(),'Y-m-d');
						};
						var itm_ENTRANCE_DATE_1 = "";
						if(Ext.getCmp('itm_ENTRANCE_DATE_1').getValue() != null){
							itm_ENTRANCE_DATE_1 = Ext.Date.format(Ext.getCmp('itm_ENTRANCE_DATE_1').getValue(),'Y-m-d');
						};
						
						var itm_ENTRANCE_ENTER_DATE_1 = "";
						if(Ext.getCmp('itm_ENTRANCE_ENTER_DATE_1').getValue() != null){
							ENTRANCE_ENTER_DATE_1 = Ext.getCmp('itm_ENTRANCE_ENTER_DATE_1').getValue();
							if(ENTRANCE_ENTER_DATE_1 == ""){
								itm_ENTRANCE_ENTER_DATE_1 = "";
							}else{
								str = new Date(ENTRANCE_ENTER_DATE_1);
								itm_ENTRANCE_ENTER_DATE_1 = Ext.Date.format(str,'Y-m-d h:m:s');
							};
						};
						
						var itm_REPORT_DEBUG_DATE_1 = "";
						if(Ext.getCmp('itm_REPORT_DEBUG_DATE_1').getValue() != null){
							itm_REPORT_DEBUG_DATE_1 = Ext.Date.format(Ext.getCmp('itm_REPORT_DEBUG_DATE_1').getValue(),'Y-m-d');
						};
						
						var itm_REPORT_DEBUG_ENTER_DATE_1 = "";
						if(Ext.getCmp('itm_REPORT_DEBUG_ENTER_DATE_1').getValue() != null){
							REPORT_DEBUG_ENTER_DATE_1 = Ext.getCmp('itm_REPORT_DEBUG_ENTER_DATE_1').getValue();
							if(REPORT_DEBUG_ENTER_DATE_1 == ""){
								itm_REPORT_DEBUG_ENTER_DATE_1 = "";
							}else{
								str = new Date(REPORT_DEBUG_ENTER_DATE_1);
								itm_REPORT_DEBUG_ENTER_DATE_1 = Ext.Date.format(str,'Y-m-d h:m:s');
							};
						};
						
						
						//把页面上的数据更新到本地
						res_value[j].json.stext.VALUE.LIFT_START_DATE = itm_LIFT_START_DATE_1;
						res_value[j].json.stext.VALUE.LIFT_END_DATE = itm_LIFT_END_DATE_1;
						res_value[j].json.stext.VALUE.ENTRANCE_DATE = itm_ENTRANCE_DATE_1;
						res_value[j].json.stext.VALUE.ENTRANCE_ENTER_DATE = itm_ENTRANCE_ENTER_DATE_1;
						res_value[j].json.stext.VALUE.REPORT_DEBUG_DATE = itm_REPORT_DEBUG_DATE_1;
						res_value[j].json.stext.VALUE.REPORT_DEBUG_ENTER_DATE = itm_REPORT_DEBUG_ENTER_DATE_1;
						
						show = res_value[j].json.stext;
						
						//后台需要数据，但不是用户输入，直接继承数据
						var itm_SUSPEND_VENDOR_ID = show.VALUE.SUSPEND_VENDOR_ID;
						var itm_LIFT_PERSON_ID = show.VALUE.LIFT_PERSON_ID;
						var itm_BUILD_START_DATE = show.VALUE.BUILD_START_DATE;
						var itm_BUILD_END_DATE = show.VALUE.BUILD_END_DATE;
						var itm_BUILD_VENDOR_ID = show.VALUE.BUILD_VENDOR_ID;
						var itm_BUILD_PERSON_ID = show.VALUE.BUILD_PERSON_ID;
						var itm_LIFT_COMMENTS = show.VALUE.LIFT_COMMENTS;
						var itm_INST_VENDOR_ID = show.VALUE.INST_VENDOR_ID;
						var itm_INST_PERSON_ID = show.VALUE.INST_PERSON_ID;
						var itm_REPORT_INSTALL_DATE = show.VALUE.REPORT_INSTALL_DATE;
						var itm_INSTALL_FINISH_DATE = show.VALUE.INSTALL_FINISH_DATE;
						var itm_QA_VALUE = show.VALUE.QA_VALUE;
						var itm_INST_VALUE = show.VALUE.INST_VALUE;
						var itm_ENCIRCLE_VALUE = show.VALUE.ENCIRCLE_VALUE;
						var itm_MID_CHECK_PERSON_ID = show.VALUE.MID_CHECK_PERSON_ID;
						var itm_MID_CHECK_DATE = show.VALUE.MID_CHECK_DATE;
						var itm_KEN_CHECK_RESULT = show.VALUE.KEN_CHECK_RESULT;
						var itm_INSTTALL_COMMENTS = show.VALUE.INSTTALL_COMMENTS;
						
						value={LIFT_START_DATE:itm_LIFT_START_DATE_1,LIFT_END_DATE:itm_LIFT_END_DATE_1,ENTRANCE_DATE:itm_ENTRANCE_DATE_1,
								ENTRANCE_ENTER_DATE:itm_ENTRANCE_ENTER_DATE_1,REPORT_DEBUG_DATE:itm_REPORT_DEBUG_DATE_1,REPORT_DEBUG_ENTER_DATE:itm_REPORT_DEBUG_ENTER_DATE_1,

								SUSPEND_VENDOR_ID:itm_SUSPEND_VENDOR_ID,LIFT_PERSON_ID:itm_LIFT_PERSON_ID,BUILD_START_DATE:itm_BUILD_START_DATE,
								BUILD_END_DATE:itm_BUILD_END_DATE,BUILD_VENDOR_ID:itm_BUILD_VENDOR_ID,BUILD_PERSON_ID:itm_BUILD_PERSON_ID,
								LIFT_COMMENTS:itm_LIFT_COMMENTS,INST_VENDOR_ID:itm_INST_VENDOR_ID,INST_PERSON_ID:itm_INST_PERSON_ID,
								REPORT_INSTALL_DATE:itm_REPORT_INSTALL_DATE,INSTALL_FINISH_DATE:itm_INSTALL_FINISH_DATE,QA_VALUE:itm_QA_VALUE,
								INST_VALUE:itm_INST_VALUE,ENCIRCLE_VALUE:itm_ENCIRCLE_VALUE,MID_CHECK_PERSON_ID:itm_MID_CHECK_PERSON_ID,
								MID_CHECK_DATE:itm_MID_CHECK_DATE,MID_CHECK_DATE:itm_MID_CHECK_DATE,KEN_CHECK_RESULT:itm_KEN_CHECK_RESULT,INSTTALL_COMMENTS:itm_INSTTALL_COMMENTS
						};
						
						var contentdata={init_person_id:init_person_id,show:show,value:value};
						content[j] = contentdata;
						
					}
				};
				
				
				//status
				for (var j = 0;j<res_status.length;j++) {
					var str = res_status[j].json.tid;
					var str1 = str.split('_');
					var status_elevator_no = str1[1];
					var status_seq_num = str1[2];
					if (ELEVATOR_NO == status_elevator_no && SEQ_NUM == status_seq_num) {
						var itm_REPORT_DEBUG_DATE_1 = "";
						if(Ext.getCmp('itm_REPORT_DEBUG_DATE_1').getValue() != null){
							itm_REPORT_DEBUG_DATE_1 = Ext.Date.format(Ext.getCmp('itm_REPORT_DEBUG_DATE_1').getValue(),'Y-m-d');
						};
						var itm_ENTRANCE_DATE_1 = "";
						if(Ext.getCmp('itm_ENTRANCE_DATE_1').getValue() != null){
							itm_ENTRANCE_DATE_1 = Ext.Date.format(Ext.getCmp('itm_ENTRANCE_DATE_1').getValue(),'Y-m-d');
						};
						var itm_LIFT_END_DATE_1 = "";
						if(Ext.getCmp('itm_LIFT_END_DATE_1').getValue() != null){
							itm_LIFT_END_DATE_1 = Ext.Date.format(Ext.getCmp('itm_LIFT_END_DATE_1').getValue(),'Y-m-d');
						};
						
						var status = "";
						if(itm_REPORT_DEBUG_DATE_1 != ""){
							stext = "REPORT_DEBUG_DATE";
						}else if(itm_ENTRANCE_DATE_1 != ""){
							stext = "ENTRANCE_DATE";
						}else if(itm_LIFT_END_DATE_1 != "" ){
							stext = "LIFT_END_DATE";
						}else if(itm_LIFT_END_DATE_1 == "" ){
							stext = "";
						};
						
						res_status[j].json.stext = status;
						break;
						
					}
				}
				
			}
			var getResult=function(res){
				var str = res.msginfo;
				Ext.Msg.alert(str);
				obj.LoadGHlist(ENGCONTRACT_NUMBER);
				obj.NextView('ITM_EnoList_V','HelcPDA.view.install.ITM.ITM_EnoList_V');
			};
			
			obj.connectServer(getResult,'installProcessITMAction.do?method=toVolumeAdd', JSON.stringify(content));
			
			// 刷新JSONSTORE数据
			WL_process.replace(res_value).then(function(arrayResults2){
				WL_process.replace(res_status).then(function(arrayResults2){
					WL.Toast.show('保存成功！');
				}).fail(function(errorObject){
					Ext.Msg.alert("删除本地状态失败");
				});
			}).fail(function(errorObject){
				Ext.Msg.alert("删除本地状态失败");
			});
			
			
			});
		});
		
	},
	
	LoadGHlist : function(ENGCONTRACT_NUMBER){
		var obj = this;
		var datas =[];
		var query={tcode:"ITM_data",tid:ENGCONTRACT_NUMBER};
		var options={
	    		   exact:false,
	    }; 
		WL.JSONStore.get(collectionName).find(query,options).then(function(res){
			var query1={tcode:"ITM_status",tid:ENGCONTRACT_NUMBER};
			var options1={
		    		   exact:false,
		    }; 
			
			WL.JSONStore.get(collectionName).find(query1,options1).then(function(res1){
				for(var i=0;i<res.length;i++){
					var data = {};
					for(var j=0;j<res1.length;j++){
						if(res[i].json.tid == res1[j].json.tid){
							data.ENGCONTRACT_NUMBER=res[i].json.stext.ENGCONTRACT_NUMBER;
							data.SEQ_NUM=res[i].json.stext.SEQ_NUM;
							data.ELEVATOR_NO=res[i].json.stext.ELEVATOR_NO;
							if(res1[j].json.stext == "COMPLEMENT"){
								data.P_STATUS="已完工";
							}else if(res1[j].json.stext == "GOV_CHECK_DATE"){
								data.P_STATUS="技检已发证";
							}else if(res1[j].json.stext == "CHECK_DATE"){
								data.P_STATUS="已验收";
							}else if(res1[j].json.stext == "REPORT_CHECK_DATE"){
								data.P_STATUS="已报检";
							}else if(res1[j].json.stext == "DEBUG_END_DATE"){
								data.P_STATUS="已调试结束";
							}else if(res1[j].json.stext == "REPORT_DEBUG_DATE"){
								data.P_STATUS="已报调";
							}else if(res1[j].json.stext == "ENTRANCE_DATE"){
								data.P_STATUS="已进场";
							}else if(res1[j].json.stext == "LIFT_END_DATE"){
								data.P_STATUS="已吊装";
							}else if(res1[j].json.stext == ""){
								data.P_STATUS="未完成吊装";
							}
							
						}
					}
					datas[i] = data;
				}
				var ITMGHStore = obj.getStore('ITMGHStore','HelcPDA.store.install.ITM.ITMGHStore');
				var softdatas = obj.GHsoft(datas);
				ITMGHStore.setData(softdatas);
			});
			
		});
	},
	
	//排序
	GHsoft : function(datas){
		for(var i = datas.length-1;i>0;i--){
			for(var j=0;j<i;j++){
				if(datas[i].ELEVATOR_NO < datas[j].ELEVATOR_NO){
					var temp = datas[i];
					datas[i] = datas[j];
					datas[j] = temp;
				}
			}
		}
		return datas;
	},
	
	
	
	
	
	//各种监听
	//监听吊装开始时间
    liftstartdate1 : function(obj, newDate, oldDate, eOpts ){
    	var itm_LIFT_START_DATE_1 = Ext.getCmp('itm_LIFT_START_DATE_1').getValue();
    	var Today = new Date();
    	if(Date.parse(itm_LIFT_START_DATE_1)>Date.parse(Today)){
    		if(oldDate != null){
    			Ext.getCmp('itm_LIFT_START_DATE_1').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能大于今天");
    		}else{
    			Ext.getCmp('itm_LIFT_START_DATE_1').setValue(null);
    			WL.Toast.show("填写的日期不能大于今天");
    		}
    	};
    	if(itm_LIFT_START_DATE_1 == null){
    	}else{
    		Ext.getCmp('itm_LIFT_END_DATE_1').setDisabled(false);  
    	}
    	if(newDate == null){
    		Ext.getCmp('itm_LIFT_END_DATE_1').setValue(null);
    		Ext.getCmp('itm_LIFT_END_DATE_1').setDisabled(true);
    	}
    },
    
  //监听吊装结束时间
    liftenddate1 : function(obj, newDate, oldDate, eOpts ){
    	var Today = new Date();
    	if(Date.parse(Ext.getCmp('itm_LIFT_END_DATE_1').getValue())>Date.parse(Today)){
    		if(oldDate != null){
    			Ext.getCmp('itm_LIFT_END_DATE_1').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能大于今天");
    		}else{
    			Ext.getCmp('itm_LIFT_END_DATE_1').setValue(null);
    			WL.Toast.show("填写的日期不能大于今天");
    		}
    	};
    	if(Date.parse(Ext.getCmp('itm_LIFT_START_DATE_1').getValue())>Date.parse(newDate)){
    		Ext.getCmp('itm_LIFT_END_DATE_1').setValue(null);
    		WL.Toast.show("吊装结束时间不能小于吊装开始时间");
    	}
    },
	
    
  //进场时间
    entrancedate1 : function(obj, newDate, oldDate, eOpts ){
    	var Today = new Date();
    	var LIFT_END_DATE_1 = Ext.getCmp('itm_LIFT_END_DATE_1').getValue();
    	if(LIFT_END_DATE_1 == null || LIFT_END_DATE_1 ==  ""|| LIFT_END_DATE_1 =="点击设置时间"){
    		Ext.getCmp('itm_ENTRANCE_DATE_1').setValue(null);
    		WL.Toast.show("请先填写吊装结束日期");
    	}else{
    		Ext.getCmp('itm_ENTRANCE_ENTER_DATE_1').setValue(Ext.Date.format(new Date(),'Y-m-d h:m:s'));
    	};
    	
    	if(Date.parse(newDate)>Date.parse(Today)){
    		Ext.getCmp('itm_ENTRANCE_DATE_1').setValue(oldDate);
			WL.Toast.show("填写的日期不能大于今天");
    	}else{
    		Ext.getCmp('itm_ENTRANCE_ENTER_DATE_1').setValue(Ext.Date.format(new Date(),'Y-m-d h:m:s'));
    		if(Date.parse(newDate)<Date.parse(LIFT_END_DATE_1)){
        		Ext.getCmp('itm_ENTRANCE_DATE_1').setValue(oldDate);
        		WL.Toast.show("入场时间不能小于吊装结束时间");
        	}
        	else{
        		Ext.getCmp('itm_ENTRANCE_DATE_1').setValue(newDate);
        		Ext.getCmp('itm_ENTRANCE_ENTER_DATE_1').setValue(Ext.Date.format(new Date(),'Y-m-d h:m:s'));
        	};
    	};
    	
    	
	},
	
	
	//报调试时间
	reportdebugdate1 : function(obj, newDate, oldDate, eOpts ){
		var Today = new Date();
    	var ENTRANCE_DATE_1 = Ext.getCmp('itm_ENTRANCE_DATE_1').getValue();
    	if(ENTRANCE_DATE_1 == null || ENTRANCE_DATE_1 ==  ""|| ENTRANCE_DATE_1 =="点击设置时间"){
    		Ext.getCmp('itm_REPORT_DEBUG_DATE_1').setValue(null);
    		WL.Toast.show("请先填写进场日期");
    	}else{
    		Ext.getCmp('itm_REPORT_DEBUG_ENTER_DATE_1').setValue(Ext.Date.format(new Date(),'Y-m-d h:m:s'));
    	};
    	
    	
    	if(Date.parse(newDate)>Date.parse(Today)){
    		Ext.getCmp('itm_REPORT_DEBUG_DATE_1').setValue(oldDate);
			WL.Toast.show("填写的日期不能大于今天");
    	}else{
    		Ext.getCmp('itm_REPORT_DEBUG_ENTER_DATE_1').setValue(Ext.Date.format(new Date(),'Y-m-d h:m:s'));
    		if(Date.parse(newDate)<Date.parse(ENTRANCE_DATE_1)){
        		Ext.getCmp('itm_REPORT_DEBUG_DATE_1').setValue(oldDate);
        		WL.Toast.show("入场时间不能小于吊装结束时间");
        	}
        	else{
        		Ext.getCmp('itm_REPORT_DEBUG_DATE_1').setValue(newDate);
        		Ext.getCmp('itm_REPORT_DEBUG_ENTER_DATE_1').setValue(Ext.Date.format(new Date(),'Y-m-d h:m:s'));
        	};
    	};
    	
	},
	
	
	
	
	
	
	
	
});