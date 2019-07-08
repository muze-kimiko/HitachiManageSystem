
/* JavaScript content from app/controller/fault/FaultHandlingReportPanelWorkerCtrl.js in folder common */
var gxx=[];
Ext.define('HelcPDA.controller.fault.FaultHandlingReportPanelWorkerCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			
			Add_worker:'button[id=add_worker]',
			Modify_worker:'button[id=modify_worker]',
			Cancel_worker:'button[id=cancel_worker]',

			Worker:'button[id=worker]',
			FHRW_STATION_ID:'selectfield[id=FHRW_STATION_ID]',
			
			Commitworker:'button[id=Commitworker]',
			WorkerListTap:'list[id=workerList]'
			
		},
		
		control:{
			Add_worker:{
				tap:'Add_worker',
			},
			Modify_worker:{
				tap:'Modify_worker',
			},
			Cancel_worker:{
				tap:'Cancel_worker',
			},
			Worker:{
				tap:'Worker',
			},
			FHRW_STATION_ID:{
				change:'FHRW_STATION_ID',
			},
			WorkerListTap:{
				itemtap:'WorkerListTap'
			},
			Commitworker:{
				tap:'Commitworker'

			},
			//无纸化
			"button#btn_fault_report":{
				tap:'btn_fault_report'
			}, 
//			"list#AList_ChengKeZaiHuo": {
//                itemtap: 'onAList_ChengKeZaiHuoItemTap'
//            },
//            "list#Bist_ChengKeZaiHuo": {
//                itemtap: 'onAList_ChengKeZaiHuoItemTap'
//            },
//            "list#CList_ChengKeZaiHuo": {
//                itemtap: 'onAList_ChengKeZaiHuoItemTap'
//            },
//            "list#DList_ChengKeZaiHuo": {
//                itemtap: 'onAList_ChengKeZaiHuoItemTap'
//            },
//            "list#ZList_ChengKeZaiHuo": {
//                itemtap: 'onAList_ChengKeZaiHuoItemTap'
//            },
//            "button#btn_A_ChengKeZaiHuo_Allright": {
//                tap: 'onbtn_A_ChengKeZaiHuo_AllrightTap'
//            },
//            "button#btn_A_ChengKeZaiHuo_Allno": {
//                tap: 'btn_A_ChengKeZaiHuo_Allno'
//            },
//            "button#btn_B_ChengKeZaiHuo_Allright": {
//                tap: 'onbtn_A_ChengKeZaiHuo_AllrightTap'
//            },
//            "button#btn_B_ChengKeZaiHuo_Allno": {
//                tap: 'btn_A_ChengKeZaiHuo_Allno'
//            },
//            "button#btn_C_ChengKeZaiHuo_Allright": {
//                tap: 'onbtn_A_ChengKeZaiHuo_AllrightTap'
//            },
//            "button#btn_C_ChengKeZaiHuo_Allno": {
//                tap: 'btn_A_ChengKeZaiHuo_Allno'
//            },
//            "button#btn_D_ChengKeZaiHuo_Allright": {
//                tap: 'onbtn_A_ChengKeZaiHuo_AllrightTap'
//            },
//            "button#btn_D_ChengKeZaiHuo_Allno": {
//                tap: 'btn_A_ChengKeZaiHuo_Allno'
//            },
//            "button#btn_Z_ChengKeZaiHuo_Allright": {
//                tap: 'onbtn_A_ChengKeZaiHuo_AllrightTap'
//            },
//            "button#btn_Z_ChengKeZaiHuo_Allno": {
//                tap: 'btn_A_ChengKeZaiHuo_Allno'
//            },
//            "button#ChengKeZaiHuo_commit":{
//            	tap:'ChengKeZaiHuo_commit'
//            },
//            "button#ChengKeZaiHuo_back":{
//            	tap:'ChengKeZaiHuo_back'
//            },
//            "button#button_qd1":{
//            	tap:'button_qd1'
//            },"button#button_qd2":{
//            	tap:'button_qd2'
//            },
//            "button#btn_update_report":{
//            	tap:'btn_update_report'
//            }

		},
	},
	
//提交作业人员
	Commitworker : function(){
		 //检查进入时状态是什么，如果是已提交或者未提交，设置用户是否能操作数据
	   	 /*var fault_listId=Ext.getCmp('fault_list').getActiveItem().getId();
	   	 if(fault_listId=='FaultHandWYSHButton'||fault_listId=='FaultHandWYTJButton'){
	   		//   Ext.getCmp('Commitworker').setDisabled(true);
	   		WL.Toast.show('已提交或已审核,不能提交.');
		    return;
	   	 }*/
		if(this.getJXCL_SubmitVerification('')){
			return;
		}
	   	 var WorkerListStore=this.getStore('WorkerListStore',"HelcPDA.store.fault.WorkerListStore");
	   	 var list=Ext.Array.pluck(WorkerListStore.getData().items,'data');
			var NEW_FHRW_STATION_ID=Ext.getCmp('FHRW_STATION_ID').getValue(); 
		    var NEW_FHRW_PERSON=Ext.getCmp('FHRW_PERSON').getValue(); 
		    var NEW_NAME='';
		      var options=Ext.getCmp('FHRW_PERSON').getOptions();
		      var length=options.length;
		      for(var i=0;i<length;i++){
		    	     if(options[i].PERSON_ID==NEW_FHRW_PERSON){
		    	    	 NEW_NAME=options[i].PERSON_NAME;
		    	     }
		    	 	
		      }

		    var NEW_FHRW_PERSON_REMARK=Ext.getCmp('FHRW_PERSON_REMARK').getValue(); 
		    var newDate={};
		    newDate.STATION_ID=NEW_FHRW_STATION_ID;
		    newDate.EMPOLOYEE_ID=NEW_FHRW_PERSON;
		    newDate.COMMENTS=NEW_FHRW_PERSON_REMARK;
		    newDate.EMPOLOYEE_Name=NEW_NAME;
		    var length1=list.length;
		    var flag=true;
		    for(var i=0;i<length1;i++){
		    	 if(NEW_FHRW_PERSON==list[i].EMPOLOYEE_ID){
 	    			//Ext.Msg.alert('提示','请勿重复添加作业人员,已提交列表中的数据');
 	    			WL.Toast.show('请勿重复添加作业人员,已提交列表中的数据');
 	    			flag=false;
 	    		}
		    
		    }
			 if(flag){
	    		 list.push(newDate);
	    	 }
	  		
		    WorkerListStore.setData(list);

	  	var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
	  	var content="{'rows':"+JSON.stringify(list)+",'ACTIVITY_ID':'"+ACTIVITY_ID+"'}";
	  	
	  	var getResult=function(res){
	  		var str=res.msginfo;
	 		WL.Toast.show(str);
	 		var Fault_WorContainer=document.getElementById('Fault_WorContainer');
	 		if(list.length>0){
	 			Fault_WorContainer.innerHTML="人员信息("+list.length+")";
	 			Fault_WorContainer.style.color='red';
	  		}else{
	  			Fault_WorContainer.innerHTML="人员信息";
	  			Fault_WorContainer.style.color='';
	 		}
	  	};
	  	this.connectServer(getResult, 'gzbaogao_zyryAction.do?method=toAdds', content);
		
	},
	
	
//根据所属站查询所有人员
	FHRW_STATION_ID : function(){
		
		var FHRW_STATION_ID=Ext.getCmp("FHRW_STATION_ID").getValue();
		var content = "{'STATION_ID':'" + FHRW_STATION_ID + "'}";
	  	var getResult=function(res){
	       	 var arr=res.rows;
	    	Ext.getCmp('FHRW_PERSON').setOptions(arr);
	  		
	  	};
	  	this.asyconnectServer(getResult, 'fuwuqingqiuluruAction.do?method=tofind_wbry', content);
	  	
	  	
	},
	
//进入作业人员页面，根据加载作业人员所属站
	Worker: function() {
		var obj=this;
        this.NextView('faultHandlingReportPanelWorker','HelcPDA.view.fault.FaultHandlingReportPanelWorker');
        Ext.Viewport.hideMenu('right');
     //    var COMPANY_ID=Ext.getCmp("COMPANY_ID").getValue();
    	var WorkerListStore=Ext.data.StoreManager.get('WorkerListStore');
	  		if (!WorkerListStore) { 
	  			WorkerListStore = Ext.create("HelcPDA.store.fault.WorkerListStore"); 
	  		}; 
        var list=Ext.Array.pluck(WorkerListStore.getData().items,'data');        
    	var Fault_WorContainer=document.getElementById('Fault_WorContainer');
 		if(list.length>0){
 			Fault_WorContainer.innerHTML="人员信息("+list.length+")";
 			Fault_WorContainer.style.color='red';
  		}else{
  			Fault_WorContainer.innerHTML="人员信息";
  			Fault_WorContainer.style.color='';
 		}
         var content="{'COMPANY_ID':'"+company_code+"'}";
         var getResult=function(res){
        	 var arr=res.rows;
        	Ext.getCmp('FHRW_STATION_ID').setOptions(arr)
        
        	  
     	  	var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
     	  	var content1=JSON.stringify({iswhere:"WHERE ACTIVITY_ID='"+ACTIVITY_ID+"'"});
     	  	var getResult1=function(res){
     	  		var str=res.msginfo;
     	  		var listz=res.rows;
     	  		WorkerListStore.setData(listz);
     	 		var Fault_WorContainer=document.getElementById('Fault_WorContainer');
    	 		if(listz.length>0){
    	 			Fault_WorContainer.innerHTML="人员信息("+listz.length+")";
    	 			Fault_WorContainer.style.color='red';
    	  		}else{
    	  			Fault_WorContainer.innerHTML="人员信息";
    	  			Fault_WorContainer.style.color='';
    	 		}
     	  	};
     	  	setTimeout(load1,2000); 
     	  	function load1(){
     	  		obj.asyconnectServer(getResult1, 'gzbaogao_zyryAction.do?method=toSearch', content1);
     	  	}
     	  	
         };
         
 	  	 this.connectServer(getResult, 'fuwuqingqiuluruAction.do?method=tofind_station', content);
     },
     //添加一个工作人员到list列表
     Add_worker:function(){
      var NEW_FHRW_STATION_ID=Ext.getCmp('FHRW_STATION_ID').getValue(); 
      var NEW_FHRW_PERSON=Ext.getCmp('FHRW_PERSON').getValue(); 
      var NEW_FHRW_PERSON_REMARK=Ext.getCmp('FHRW_PERSON_REMARK').getValue(); 
      var NEW_NAME='';
      var options=Ext.getCmp('FHRW_PERSON').getOptions();
      for(var i=0;i<options.length;i++){
    	     if(options[i].PERSON_ID==NEW_FHRW_PERSON){
    	    	 NEW_NAME=options[i].PERSON_NAME;
    	     }
      }
      
      
      var WorkListStore=Ext.data.StoreManager.get('WorkerListStore');
		if (!WorkListStore) { 
			WorkListStore = Ext.create("HelcPDA.store.fault.WorkerListStore"); 
		};
		var new_data =[];
		var list=Ext.Array.pluck(WorkListStore.getData().items,'data');
		var length_ = list.length;
    	for(var i=0;i<length_;i++){
    		
    		var newdata_item = {};
    		var FHRW_STATION_ID = list[i].STATION_ID;
	    	var FHRW_PERSON=list[i].EMPOLOYEE_ID;
	    	var FHRW_PERSON_REMARK=list[i].COMMENTS;
	    	var NAME=list[i].EMPOLOYEE_Name;
	    	newdata_item.STATION_ID=FHRW_STATION_ID;
	    	newdata_item.EMPOLOYEE_ID=FHRW_PERSON;
	    	newdata_item.COMMENTS=FHRW_PERSON_REMARK;
	    	newdata_item.EMPOLOYEE_Name=NAME;
    		new_data[i]=newdata_item;
    		if(NEW_FHRW_PERSON==list[i].EMPOLOYEE_ID){
    			//Ext.Msg.alert('提示','请勿重复添加作业人员');
    			WL.Toast.show('请勿重复添加作业人员');
    			return;
    		}
    	}
    	new_data[length_] ={STATION_ID:NEW_FHRW_STATION_ID,EMPOLOYEE_ID:NEW_FHRW_PERSON,COMMENTS:NEW_FHRW_PERSON_REMARK,EMPOLOYEE_Name:NEW_NAME};
    	list = new_data; 
		
    	WorkListStore.setData(list);
    	var Fault_WorContainer=document.getElementById('Fault_WorContainer');
 		if(list.length>0){
 			Fault_WorContainer.innerHTML="人员信息("+list.length+")";
 			Fault_WorContainer.style.color='red';
  		}else{
  			Fault_WorContainer.innerHTML="人员信息";
  			Fault_WorContainer.style.color='';
 		}
    	Ext.getCmp('FOR_WorkerList_INDEX').setValue();
		
     },
     //点击list中的一个选项
     WorkerListTap:function(obj,index,target,record,e,eOpts){
    	  var WorkListStore=Ext.data.StoreManager.get('WorkerListStore');
  		if (!WorkListStore) { 
  			WorkListStore = Ext.create("HelcPDA.store.fault.WorkerListStore"); 
  		}; 
		if(event.target.id=="1"){
			WorkListStore.removeAt(index);
		    var list=Ext.Array.pluck(WorkListStore.getData().items,'data');
			var Fault_WorContainer=document.getElementById('Fault_WorContainer');
	 		if(list.length>0){
	 			Fault_WorContainer.innerHTML="人员信息("+list.length+")";
	 			Fault_WorContainer.style.color='red';
	  		}else{
	  			Fault_WorContainer.innerHTML="人员信息";
	  			Fault_WorContainer.style.color='';
	 		}
		}else{
			 Ext.getCmp('FHRW_STATION_ID').setValue(WorkListStore.getAt(index).get('STATION_ID'));
	         Ext.getCmp('FHRW_PERSON').setValue(WorkListStore.getAt(index).get('EMPOLOYEE_ID'));
	         Ext.getCmp('FHRW_PERSON_REMARK').setValue(WorkListStore.getAt(index).get('COMMENTS'));
		     Ext.getCmp('FOR_WorkerList_INDEX').setValue(index);
		     Ext.getCmp('Worker_panel').setActiveItem(0);
		}
     },
     //修改数据
     Modify_worker:function(){
    	 var WorkListStore=Ext.data.StoreManager.get('WorkerListStore');
   		if (!WorkListStore) { 
   			WorkListStore = Ext.create("HelcPDA.store.fault.WorkerListStore"); 
   		}; 
    	 var index= Ext.getCmp('FOR_WorkerList_INDEX').getValue();
    	 var NEW_FHRW_STATION_ID=Ext.getCmp('FHRW_STATION_ID').getValue(); 
         var NEW_FHRW_PERSON=Ext.getCmp('FHRW_PERSON').getValue(); 
         var options=Ext.getCmp('FHRW_PERSON').getOptions();
         for(var i=0;i<options.length;i++){
       	     if(options[i].PERSON_ID==NEW_FHRW_PERSON){
       	    	 NEW_NAME=options[i].PERSON_NAME;
       	     }
         }
         var list=Ext.Array.pluck(WorkListStore.getData().items,'data');
         var NEW_FHRW_PERSON_REMARK=Ext.getCmp('FHRW_PERSON_REMARK').getValue(); 
    	 var newData={STATION_ID:NEW_FHRW_STATION_ID,EMPOLOYEE_ID:NEW_FHRW_PERSON,COMMENTS:NEW_FHRW_PERSON_REMARK,EMPOLOYEE_Name:NEW_NAME};
    	 if(index==''||index==null||typeof(index)=='undefined'){
    		 WL.Toast.show('请先选择要修改的数据');
    		 return;
    	 }else{
    		 //判断要修改的数据是否符合要求
    		var flag=true;
    		var length1=list.length;
 		    for(var i=0;i<length1;i++){
 		    	 if(NEW_FHRW_PERSON==list[i].EMPOLOYEE_ID){
  	    			//Ext.Msg.alert('提示','请勿重复添加作业人员,已提交列表中的数据');
  	    			WL.Toast.show('请勿将作业人员修改的和列表中的作业人员数据相同');
  	    			flag=false;
  	    		}
 		    	 if(i==length1-1){
 		    		 if(flag){
 		 				list.splice(index,1,newData);
 		 			   WorkListStore.setData(list); 
 		 	    	 }
 			    	}
 		    	 
 		    	 }
 		    	 
 		    }
 			

     },
     btn_fault_report:function(){
    	 if(Ext.getCmp('AUDITING_STATUS').getValue()==''){
    		 Ext.Msg.alert('提示','请先提交故障报告书再填写！');
    		 return;
    	 }
		  var obj=this;
		  var ELEVATOR_TYPE=Ext.getCmp('ELEVATOR_TYPE').getValue();
		  var asset_num=Ext.getCmp('ASSET_NUM').getValue();
		//清空store
		  obj.getStore('yhlist','HelcPDA.store.maintain.yhlist').setData(null);
		  yhs=[];
		  console.log("asset_num",asset_num);
		  //先判断是否存在本地数据
		  var query = {formwork: Ext.getCmp('ACTIVITY_ID').getValue()};
		  
		  var MaintenaceJsonStore=WL.JSONStore.get(collectionName);
		  var options={exact: true};
		  MaintenaceJsonStore.find(query, options)
		  .then(function (re) {
			  console.log("sss",re);
			  if(re.length>0){
				  re=re[re.length-1];
				 Ext.Viewport.removeMenu('right');
				 obj.NextView('ChengKeZaiHuo','HelcPDA.view.maintain.ChengKeZaiHuo');
				    Ext.getCmp('AList_ChengKeZaiHuo').getStore().setData(null);
			    	Ext.getCmp('BList_ChengKeZaiHuo').getStore().setData(null);
			    	Ext.getCmp('CList_ChengKeZaiHuo').getStore().setData(null);
			    	Ext.getCmp('DList_ChengKeZaiHuo').getStore().setData(null);
			        Ext.getCmp('EList_ChengKeZaiHuo').getStore().setData(null);
			        Ext.getCmp('FList_ChengKeZaiHuo').getStore().setData(null);
			        Ext.getCmp('ZList_ChengKeZaiHuo').getStore().setData(null);
				    Ext.getCmp('yhlist').getStore().setData(null);
				 
//			    var sj=['USE_ACCNT_NAME','USED_CODE','','DOC_NUMBER','ASSET_NUM1','PRODUCT_NUMBER','ELEVATOR_FLOOR_STOP','DRIVE_MODE','ASSET_LOAD','ASSET_SPEED',
//	    	        'BIAS_ANGLE','ASSET_HEIGHT','STAIR_WIDTH','MAIN_POWER','USE_SECTION_LENGTH','CYLINDER_AMOUNT','JACKING_TYPE','EDIFICE_NAME','ELEVATOR_MARK','EQU_CODE',
//	    	        'ASSET_ADDRESS','START_DT','END_DT','wblx','report_type','MP_ID_rep','PLAN_START_DT_rep','ACTIVITY_ID','START_TIME','ARRIVE_TIME','REPAIR_COMPLETE_TIME',
//	    	        'COMPANY_ID','wbry','js','xm','yhpj','yhyj','signature'];
//			  
			    	Ext.getCmp('USE_ACCNT_NAME').setValue(re.json.USE_ACCNT_NAME);
			    	Ext.getCmp('USED_CODE').setValue(re.json.USED_CODE);
			    	Ext.getCmp('DOC_NUMBER').setValue(re.json.DOC_NUMBER);
			    	Ext.getCmp('ASSET_NUM1').setValue(re.json.ASSET_NUM1);
			    	Ext.getCmp('PRODUCT_NUMBER').setValue(re.json.PRODUCT_NUMBER);
			    	Ext.getCmp('ELEVATOR_FLOOR_STOP').setValue(re.json.ELEVATOR_FLOOR_STOP);
			    	Ext.getCmp('DRIVE_MODE').setValue(re.json.DRIVE_MODE);
			    	Ext.getCmp('ASSET_LOAD').setValue(re.json.ASSET_LOAD);
			    	Ext.getCmp('ASSET_SPEED').setValue(re.json.ASSET_SPEED);
			    	Ext.getCmp('BIAS_ANGLE').setValue(re.json.BIAS_ANGLE);
			    	Ext.getCmp('ASSET_HEIGHT').setValue(re.json.ASSET_HEIGHT);
			    	Ext.getCmp('STAIR_WIDTH').setValue(re.json.STAIR_WIDTH);
			    	Ext.getCmp('MAIN_POWER').setValue(re.json.MAIN_POWER);
			    	Ext.getCmp('USE_SECTION_LENGTH').setValue(re.json.USE_SECTION_LENGTH);
			    	Ext.getCmp('CYLINDER_AMOUNT').setValue(re.json.CYLINDER_AMOUNT);
			    	Ext.getCmp('JACKING_TYPE').setValue(re.json.JACKING_TYPE);
			    	Ext.getCmp('EDIFICE_NAME').setValue(re.json.EDIFICE_NAME);
			    	Ext.getCmp('ELEVATOR_MARK').setValue(re.json.ELEVATOR_MARK);
			    	Ext.getCmp('EQU_CODE').setValue(re.json.EQU_CODE);
			    	Ext.getCmp('ASSET_ADDRESS').setValue(re.json.ASSET_ADDRESS);
			    	Ext.getCmp('START_DT').setValue(re.json.START_DT);
			    	Ext.getCmp('END_DT').setValue(re.json.END_DT);
			    	Ext.getCmp('wblx').setValue(re.json.wblx);
			    	Ext.getCmp('report_type').setValue(re.json.report_type);
			    	Ext.getCmp('MP_ID_rep').setValue(re.json.MP_ID_rep);
			    	Ext.getCmp('PLAN_START_DT_rep').setValue(re.json.PLAN_START_DT_rep);
			    	Ext.getCmp('ACTIVITY_ID').setValue(re.json.ACTIVITY_ID);
			    	Ext.getCmp('START_TIME').setValue(re.json.START_TIME);
			    	Ext.getCmp('ARRIVE_TIME').setValue(re.json.ARRIVE_TIME);
			    	Ext.getCmp('REPAIR_COMPLETE_TIME').setValue(re.json.REPAIR_COMPLETE_TIME);
			    	Ext.getCmp('COMPANY_ID').setValue(re.json.COMPANY_ID);
			    	Ext.getCmp('wbry').setValue(re.json.wbry);
			    	Ext.getCmp('js').setValue(re.json.js);
			    	Ext.getCmp('xm').setValue(re.json.xm);
			    	Ext.getCmp('yhpj').setValue(re.json.yhpj);
			    	Ext.getCmp('yhyj').setValue(re.json.yhyj);
			    	//Ext.getCmp('signature').setValue(re.json.signature);
			    	Ext.getCmp('saveflag').setValue("save");
			    	Ext.getCmp('jsonstoreid').setValue(re._id);
			    	
			    	Ext.getCmp('yhlist').getStore().setData(re.json.yhlist);
			    	Ext.getCmp('AList_ChengKeZaiHuo').getStore().setData(re.json.lista);
			    	Ext.getCmp('BList_ChengKeZaiHuo').getStore().setData(re.json.listb);
			    	Ext.getCmp('CList_ChengKeZaiHuo').getStore().setData(re.json.listc);
			    	Ext.getCmp('DList_ChengKeZaiHuo').getStore().setData(re.json.listd);
			        Ext.getCmp('EList_ChengKeZaiHuo').getStore().setData(re.json.liste);
			        Ext.getCmp('FList_ChengKeZaiHuo').getStore().setData(re.json.listf);
			        Ext.getCmp('ZList_ChengKeZaiHuo').getStore().setData(re.json.listz);
			        
			        Ext.getCmp('yh').setOptions(re.json.yh);
			        Ext.getCmp('tjstatus').setValue(re.json.tjstatus);
			        var type=re.json.report_type;
			        if(type=='ck'){
						report_type='乘客电梯、载货电梯保养维修报告书';
						Ext.getCmp('BIAS_ANGLE').setHidden(true);
						Ext.getCmp('ASSET_HEIGHT').setHidden(true);
						Ext.getCmp('STAIR_WIDTH').setHidden(true);
						Ext.getCmp('MAIN_POWER').setHidden(true);
						Ext.getCmp('USE_SECTION_LENGTH').setHidden(true);
						Ext.getCmp('CYLINDER_AMOUNT').setHidden(true);
						Ext.getCmp('JACKING_TYPE').setHidden(true);
				        //修改
//						Ext.getCmp('DRIVE_MODE').setValue('曳引');
					}
					else if(type=='yy'){
						report_type='液压电梯保养维修报告书';
						Ext.getCmp('BIAS_ANGLE').setHidden(true);
						Ext.getCmp('ASSET_HEIGHT').setHidden(true);
						Ext.getCmp('STAIR_WIDTH').setHidden(true);
						Ext.getCmp('MAIN_POWER').setHidden(true);
						Ext.getCmp('USE_SECTION_LENGTH').setHidden(true);
						//修改
//						Ext.getCmp('DRIVE_MODE').setValue('液压');
					}
					else if(type=='zw'){
						report_type='杂物电梯保养维修报告书';
						Ext.getCmp('BIAS_ANGLE').setHidden(true);
						Ext.getCmp('ASSET_HEIGHT').setHidden(true);
						Ext.getCmp('STAIR_WIDTH').setHidden(true);
						Ext.getCmp('MAIN_POWER').setHidden(true);
						Ext.getCmp('USE_SECTION_LENGTH').setHidden(true);
						Ext.getCmp('CYLINDER_AMOUNT').setHidden(true);
						Ext.getCmp('JACKING_TYPE').setHidden(true);
						//修改
//						Ext.getCmp('DRIVE_MODE').setValue('曳引');
					}
					else if(type=='zd'){
						report_type='自动扶梯、自动人行道保养维修报告书';
						Ext.getCmp('ASSET_LOAD').setHidden(true);
						Ext.getCmp('CYLINDER_AMOUNT').setHidden(true);
						Ext.getCmp('JACKING_TYPE').setHidden(true);
					}
			        
			    	var TASK_NAME="急修";
					Ext.getCmp('wblx').setValue(TASK_NAME);
					var items=Ext.getCmp('report_tab').getTabBar().getInnerItems();

					if(type!='zd'){
						gxx[0]="A";
						gxx[1]="B";
						gxx[2]="C";
						gxx[3]="D";
						items[5].setHidden(true);
						if(type!='ck'){
						items[6].setHidden(true);
						}else{
							gxx[4]="E";	
						}
						items[7].setHidden(true);
					}else{
						items[5].setHidden(true);
						items[7].setHidden(true);
						gxx[0]="A";
						gxx[1]="B";
						gxx[2]="C";
						gxx[3]="D";
						gxx[4]="E";	
					}
			        var query = {formwork: Ext.getCmp('MP_ID').getValue()+"signature"};
			        var options={exact: true};
			        MaintenaceJsonStore.find(query, options)
					  .then(function (re) {
						  re=re[re.length-1];
						  //Ext.getCmp('signature').setValue(re.json.signature);
						  Ext.getCmp('MySign').setSrc(re.json.signature);
						  Ext.getCmp('jsonstoreid2').setValue(re._id);
					  }).fail(function(re){
						  console.log("fail!");
					  })
//			        cordova.exec(isOk,isFailure,'Signature','tobase64',[{
//			    		signature:re.json.signature
//			    	}]);
//			    	function isOk(re) {
//			    		
//			    		var wz=re.indexOf('base64/')+1;
//			    		alert(wz+re);
//			        	var signature=signature.substr(wz);
//			    		Ext.getCmp('signature').setValue(signature);
//			    	}
//			        function isFailure(re){
//			        	alert("失败了！");
//			        }       
                    Ext.getCmp('bgstb').setTitle(report_type);
			        if(Ext.getCmp('tjstatus').getValue()=='ok'){
			        	 Ext.getCmp('yhfy').setHidden(false);
					     Ext.getCmp('wbbg').setDisabled(true);
			         	 Ext.getCmp('button_qd1').setDisabled(true);
			         	 Ext.getCmp('button_qd3').setDisabled(true);
			         	var sc=document.getElementsByName('2');
			         	 for(var i=0;i<sc.length;i++){
			         		sc[i].style.display="none";
			         	 }
			         	 //document.getElementById("2").style.display="none";
			         	 Ext.getCmp('button_qd2').setDisabled(true);
			       	     Ext.getCmp('button_MySign').setDisabled(true);
			       	     Ext.getCmp('yhfy').setDisabled(true);
//			       	     Ext.getCmp('DRIVE_MODE').setReadOnly(true);
			       	     Ext.getCmp('more').setHidden(true);
			       	     var bt=['A','B','C','D','E','F','Z'];
			       	     for(var i=0;i<bt.length;i++){
			       	    	Ext.getCmp('btn_'+bt[i]+'_ChengKeZaiHuo_Allright').setDisabled(true);
			       	    	Ext.getCmp('btn_'+bt[i]+'_ChengKeZaiHuo_Allno').setDisabled(true);
			       	    }
			        }
			        
			    	return;

			  }else{
		  
		  if(ELEVATOR_TYPE=='直梯'){
		  var check_picker;
	        check_picker = Ext.Viewport.add(Ext.create('Ext.Picker', {
	            slots: [
	                {
	                    name:'report_type',
	                    data : [
	                        {text: '乘客电梯、载货电梯保养维修报告书', value:'ck'},
	                        {text: '液压电梯保养维修报告书', value: 'yy'},
	                        {text: '杂物电梯保养维修报告书', value: 'zw'},
	                       // {text: '自动扶梯、自动人行道保养维修报告书', value: 'zd'}
	                    ]
	                }
	            ],
	            listeners:{
	                change:function(obk,values,eOpts){
	                	getReport(values.report_type,obj);
	                	getAssetinfo(asset_num,obj);
	                	
	                	//console.log('07191',Ext.getCmp('report_tab').getTabBar().getInnerItems(),'07192',Ext.getCmp('report_tab').getInnerItems());
	                	//record.set('chk',values.v_chk);
	                },
//	                show:function(){
//	                    //check_picker.setValue({'v_chk':record.get('chk')});
//	                },
	            },
	        }));
	        check_picker.show();
		  }else{
			  getReport('zd',obj);
			  getAssetinfo(asset_num,obj);
		  } 
	}
	})
	.fail(function (errorObject) {
		
	});
  
	  
	function getReport(type,obj){
		var ACTIVITY_ID=Ext.getCmp('ACTIVITY_ID').getValue();
		var START_TIME=Ext.getCmp('SET_OUT_TIME').getValue();
		var ARRIVE_TIME=Ext.getCmp('FR_ARRIVED_TIME').getValue();
		var REPAIR_COMPLETE_TIME=Ext.getCmp('FR_COMPLETED_TIME').getValue();
		var COMPANY_ID=Ext.getCmp('COMPANY_ID').getValue();
		
			
      obj.NextView('ChengKeZaiHuo','HelcPDA.view.maintain.ChengKeZaiHuo');
      Ext.Viewport.removeMenu('right');
      Ext.getCmp('report_type').setValue(type);
	    var report_type=null;
	    if(type=='ck'){
			report_type='乘客电梯、载货电梯保养维修报告书';
			Ext.getCmp('BIAS_ANGLE').setHidden(true);
			Ext.getCmp('ASSET_HEIGHT').setHidden(true);
			Ext.getCmp('STAIR_WIDTH').setHidden(true);
			Ext.getCmp('MAIN_POWER').setHidden(true);
			Ext.getCmp('USE_SECTION_LENGTH').setHidden(true);
			Ext.getCmp('CYLINDER_AMOUNT').setHidden(true);
			Ext.getCmp('JACKING_TYPE').setHidden(true);
	
		}
		else if(type=='yy'){
			report_type='液压电梯保养维修报告书';
			Ext.getCmp('BIAS_ANGLE').setHidden(true);
			Ext.getCmp('ASSET_HEIGHT').setHidden(true);
			Ext.getCmp('STAIR_WIDTH').setHidden(true);
			Ext.getCmp('MAIN_POWER').setHidden(true);
			Ext.getCmp('USE_SECTION_LENGTH').setHidden(true);
			
		}
		else if(type=='zw'){
			report_type='杂物电梯保养维修报告书';
			Ext.getCmp('BIAS_ANGLE').setHidden(true);
			Ext.getCmp('ASSET_HEIGHT').setHidden(true);
			Ext.getCmp('STAIR_WIDTH').setHidden(true);
			Ext.getCmp('MAIN_POWER').setHidden(true);
			Ext.getCmp('USE_SECTION_LENGTH').setHidden(true);
			Ext.getCmp('CYLINDER_AMOUNT').setHidden(true);
			Ext.getCmp('JACKING_TYPE').setHidden(true);
		}
		else if(type=='zd'){
			report_type='自动扶梯、自动人行道保养维修报告书';
			Ext.getCmp('ASSET_LOAD').setHidden(true);
			Ext.getCmp('CYLINDER_AMOUNT').setHidden(true);
			Ext.getCmp('JACKING_TYPE').setHidden(true);
		}
		//根据维保类型自动生成模板		
		var TASK_NAME="急修";
		Ext.getCmp('wblx').setValue(TASK_NAME);
		var query={formwork:report_type,formwork_type:'repair'};
		var options={exact:false};
		var items=Ext.getCmp('report_tab').getTabBar().getInnerItems();
//		if(TASK_NAME.indexOf("半月")!=-1){
//			query={formwork:report_type,formwork_type:'halfmonth'};
//       	items[2].setHidden(true);
//       	items[3].setHidden(true);
//       	items[4].setHidden(true);
//		}else if(TASK_NAME.indexOf("半年")!=-1){
//			query={formwork:report_type,formwork_type:'halfyear'};
//			items[4].setHidden(true);
//		}else if(TASK_NAME.indexOf("季度")!=-1){
//			query={formwork:report_type,formwork_type:'season'};
//			items[3].setHidden(true);
//         	items[4].setHidden(true);
//		}else if(TASK_NAME.indexOf("年度")!=-1){
//			query={formwork:report_type,formwork_type:'fullyear'};
//			
//		}else {
//			query={formwork:report_type,formwork_type:'halfmonth,season,halfyear,fullyear,repair'};
//		}
		if(type!='zd'){
			gxx[0]="A";
			gxx[1]="B";
			gxx[2]="C";
			gxx[3]="D";
			items[5].setHidden(true);
			if(type!='ck'){
			items[6].setHidden(true);
			}else{
				gxx[4]="E";	
			}
			items[7].setHidden(true);
		}else{
			items[5].setHidden(true);
			items[7].setHidden(true);
			gxx[0]="A";
			gxx[1]="B";
			gxx[2]="C";
			gxx[3]="D";
			gxx[4]="E";	
		}

		WL.JSONStore.get(collectionName).find(query,options).then(function(res){
			console.log(res);
			var tmpData = Ext.getCmp('AList_ChengKeZaiHuo').getStore() ;
			var tmpData1 = Ext.getCmp('BList_ChengKeZaiHuo').getStore() ;
			var tmpData2 = Ext.getCmp('CList_ChengKeZaiHuo').getStore() ;
			var tmpData3 = Ext.getCmp('DList_ChengKeZaiHuo').getStore() ;
			var tmpData4 = Ext.getCmp('ZList_ChengKeZaiHuo').getStore() ;
			var tmpData5 = Ext.getCmp('EList_ChengKeZaiHuo').getStore() ;
			var tmpData6 = Ext.getCmp('FList_ChengKeZaiHuo').getStore() ;
			var sdataa=[];
			var sdatab=[];
			var sdatac=[];
			var sdatad=[];
			var sdataz=[];
			var sdatae=[];
			var sdataf=[];
			
			for(var i=0;i<res.length;i++){
				if(res[i].json.project_num.indexOf('A')!=-1){
				var sobj={};
				sobj.formwork_id=res[i].json.formwork_id;
				sobj.num=res[i].json.project_num;
				sobj.con=res[i].json.content;
				sobj.req=res[i].json.demand;
				sobj.chk='';
				sdataa.push(sobj);
				}else if (res[i].json.project_num.indexOf('B')!=-1){
					
					var sobj={};
					sobj.formwork_id=res[i].json.formwork_id;
					sobj.num=res[i].json.project_num;
					sobj.con=res[i].json.content;
					sobj.req=res[i].json.demand;
					sobj.chk='';
					sdatab.push(sobj);	
					
				}else if(res[i].json.project_num.indexOf('C')!=-1){
					var sobj={};
					sobj.formwork_id=res[i].json.formwork_id;
					sobj.num=res[i].json.project_num;
					sobj.con=res[i].json.content;
					sobj.req=res[i].json.demand;
					sobj.chk='';
					sdatac.push(sobj);	
					
				}else if(res[i].json.project_num.indexOf('D')!=-1){
					var sobj={};
					sobj.formwork_id=res[i].json.formwork_id;
					sobj.num=res[i].json.project_num;
					sobj.con=res[i].json.content;
					sobj.req=res[i].json.demand;
					sobj.chk='';
					sdatad.push(sobj);	
				}else if(res[i].json.project_num.indexOf('E')!=-1){
					var sobj={};
					sobj.formwork_id=res[i].json.formwork_id;
					sobj.num=res[i].json.project_num;
					sobj.con=res[i].json.content;
					sobj.req=res[i].json.demand;
					sobj.chk='';
					sdatae.push(sobj);	
					
				}else if(res[i].json.project_num.indexOf('F')!=-1){
					var sobj={};
					sobj.formwork_id=res[i].json.formwork_id;
					sobj.num=res[i].json.project_num;
					sobj.con=res[i].json.content;
					sobj.req=res[i].json.demand;
					sobj.chk='';
					sdataf.push(sobj);	
					
				}else{
					var sobj={};
					sobj.formwork_id=res[i].json.formwork_id;
					sobj.num=res[i].json.project_num;
					sobj.con=res[i].json.content;
					sobj.req=res[i].json.demand;
					sobj.chk='';
					sdataz.push(sobj);	
					
				}
			};
            console.log('sdatab',sdatab);
			tmpData.setData(sdataa);
			tmpData1.setData(sdatab);
			tmpData2.setData(sdatac);
			tmpData3.setData(sdatad);
			tmpData4.setData(sdataz);
			tmpData5.setData(sdatae);
			tmpData6.setData(sdataf);
			
		}).fail(function(err){
			console.log("生成失败！");
		});	
		
		Ext.getCmp('ACTIVITY_ID').setValue(ACTIVITY_ID);
	 	Ext.getCmp('START_TIME').setValue(START_TIME); 
	 	Ext.getCmp('ARRIVE_TIME').setValue(ARRIVE_TIME);
	 	Ext.getCmp('REPAIR_COMPLETE_TIME').setValue(REPAIR_COMPLETE_TIME);
	 	Ext.getCmp('COMPANY_ID').setValue(COMPANY_ID);
	 	Ext.getCmp('START_DT').setValue(ARRIVE_TIME); 
	 	Ext.getCmp('END_DT').setValue(REPAIR_COMPLETE_TIME); 
	    //维保人员
	 	var WorkerListStore=obj.getStore('WorkerListStore',"HelcPDA.store.fault.WorkerListStore");
	 	var wbry=""; 
	 	for(var i=0;i<WorkerListStore.getCount();i++){
	 		wbry=wbry+WorkerListStore.getAt(i).get('EMPOLOYEE_Name')+";";
	 	}
	 
	 	Ext.getCmp('wbry').setValue(wbry);
	 	
	 	
		}	
	
	 function getAssetinfo(asset_num,obj){
		var getResult =function(res){
			var assetinfo=res.assetinfo;
			var domcon=res.domcon;
			Ext.getCmp('USE_ACCNT_NAME').setValue(assetinfo.USE_ACCNT_NAME);
	    	Ext.getCmp('USED_CODE').setValue(assetinfo.USED_CODE);
	    	Ext.getCmp('REGISTER_CODE').setValue(assetinfo.REGISTER_CODE);
	    	Ext.getCmp('ASSET_NUM1').setValue(assetinfo.ASSET_NUM);
	    	Ext.getCmp('PRODUCT_NUMBER').setValue(assetinfo.PRODUCT_NUMBER);
	    	Ext.getCmp('ELEVATOR_FLOOR_STOP').setValue(assetinfo.ELEVATOR_FLOOR_STOP);
	    	Ext.getCmp('DRIVE_MODE').setValue(assetinfo.DRIVE_MODE);
	    	Ext.getCmp('ASSET_LOAD').setValue(assetinfo.ASSET_LOAD);
	    	Ext.getCmp('ASSET_SPEED').setValue(assetinfo.ASSET_SPEED);
	    	Ext.getCmp('EDIFICE_NAME').setValue(assetinfo.EDIFICE_NAME);
	    	Ext.getCmp('ELEVATOR_MARK').setValue(assetinfo.ELEVATOR_MARK);
	    	Ext.getCmp('EQU_CODE').setValue(assetinfo.EQU_CODE); 
	    	Ext.getCmp('DOC_NUMBER').setValue(assetinfo.DOC_NUMBER);
	    	Ext.getCmp('ASSET_ADDRESS').setValue(assetinfo.ASSET_ADDRESS);
	    		    	
	    	
	    	//液压
	    	Ext.getCmp('CYLINDER_AMOUNT').setValue(assetinfo.CYLINDER_AMOUNT);
	    	Ext.getCmp('JACKING_TYPE').setValue(assetinfo.JACKING_TYPE);
	    	//扶梯
	    	Ext.getCmp('BIAS_ANGLE').setValue(assetinfo.BIAS_ANGLE);
	    	Ext.getCmp('ASSET_HEIGHT').setValue(assetinfo.ASSET_HEIGHT);
	    	Ext.getCmp('STAIR_WIDTH').setValue(assetinfo.STAIR_WIDTH);
	    	Ext.getCmp('MAIN_POWER').setValue(assetinfo.MAIN_POWER);
	    	Ext.getCmp('USE_SECTION_LENGTH').setValue(assetinfo.USE_SECTION_LENGTH);
	    	
	    	//客户列表
	    	var yh=[];
	    	yh[0]={text:'请选择',value:''};
	        for(var i=0;i<domcon.length;i++){
	        	var yho={};
	        	yho.text=domcon[i].CONTACT_NAME;
	        	yho.value='{"EMAIL_ADDRESS":"'+domcon[i].EMAIL_ADDRESS+'","CONT_PH_NUM":"'+domcon[i].CONT_PH_NUM+'"}';
	        	yh.push(yho);
	        }
	    	Ext.getCmp('yh').setOptions(yh);
		};
		obj.connectServer(getResult, 'maintainancePlanItemListAction.do?method=getAssetinfo', "{asset_num:"+asset_num+"}");
	 }
	

	},
//
//	onAList_ChengKeZaiHuoItemTap: function(dataview, index, target, record, e, eOpts) {
//       var check_picker;
//       check_picker = Ext.Viewport.add(Ext.create('Ext.Picker', {
//           slots: [
//               {
//                   name:'v_chk',
//                   data : [
//                       {text: '“√”确认正常', value: '√'},
//                       {text: '“○”调整、整备等实施', value: '○'},
//                       {text: '“×”要修理等', value: '×'},
//                       {text: '“—”无此项', value: '—'}
//                   ]
//               }
//           ],
//           listeners:{
//               change:function(obk,values,eOpts){
//                   record.set('chk',values.v_chk);
//               },
//               show:function(){
//                   check_picker.setValue({'v_chk':record.get('chk')});
//               },
//           },
//       }));
//       check_picker.show();
//   },
//
//   onbtn_A_ChengKeZaiHuo_AllrightTap: function(button, e, eOpts) {
//   	var tmpData;
//   	if(button.id=='btn_A_ChengKeZaiHuo_Allright')
//        tmpData = Ext.getCmp('AList_ChengKeZaiHuo').getStore( ) ;
//   	else if(button.id=='btn_B_ChengKeZaiHuo_Allright')
//   		tmpData = Ext.getCmp('BList_ChengKeZaiHuo').getStore( ) ;	
//   	else if(button.id=='btn_C_ChengKeZaiHuo_Allright')
//   		tmpData = Ext.getCmp('CList_ChengKeZaiHuo').getStore( ) ;	
//   	else if(button.id=='btn_D_ChengKeZaiHuo_Allright')
//   		tmpData = Ext.getCmp('DList_ChengKeZaiHuo').getStore( ) ;	
//   	else if(button.id=='btn_Z_ChengKeZaiHuo_Allright')
//   		tmpData = Ext.getCmp('ZList_ChengKeZaiHuo').getStore( ) ;		
//
//       for(var i = 0;i < tmpData.getAllCount();i++){
//           tmpData.getAt(i).set('chk','√');
//       }
//   },
//   btn_A_ChengKeZaiHuo_Allno:function(button, e, eOpts){
//   	var tmpData;
//   	if(button.id=='btn_A_ChengKeZaiHuo_Allno')
//        tmpData = Ext.getCmp('AList_ChengKeZaiHuo').getStore( ) ;
//   	else if(button.id=='btn_B_ChengKeZaiHuo_Allno')
//   		tmpData = Ext.getCmp('BList_ChengKeZaiHuo').getStore( ) ;	
//   	else if(button.id=='btn_C_ChengKeZaiHuo_Allno')
//   		tmpData = Ext.getCmp('CList_ChengKeZaiHuo').getStore( ) ;	
//   	else if(button.id=='btn_D_ChengKeZaiHuo_Allno')
//   		tmpData = Ext.getCmp('DList_ChengKeZaiHuo').getStore( ) ;	
//   	else if(button.id=='btn_Z_ChengKeZaiHuo_Allno')
//   		tmpData = Ext.getCmp('ZList_ChengKeZaiHuo').getStore( ) ;		
//   		
//       for(var i = 0;i < tmpData.getAllCount();i++){
//           tmpData.getAt(i).set('chk','—');
//       }
//   },
//   ChengKeZaiHuo_commit:function(){
//	 //基本信息
//   	var jbxx=['USE_ACCNT_NAME','USED_CODE','REGISTER_CODE','ASSET_NUM','PRODUCT_NUMBER',
//   	          'ELEVATOR_FLOOR_STOP','DRIVE_MODE','ASSET_LOAD','ASSET_SPEED','EDIFICE_NAME',
//   	          'ELEVATOR_MARK','EQU_CODE','ASSET_ADDRESS','START_DT','END_DT','wblx'
//   	          ]
//   	var info=[];
//   	for( var  i=0;i<jbxx.length;i++){
//   		var inobj={};
//   		inobj.jbxx[i]=Ext.getCmp(jbxx[i]).getValue();
//   		info.push(inobj);
//   		
//   	}
//   	
//   	var tmpData = Ext.getCmp('AList_ChengKeZaiHuo').getStore( ) ;
//   	var tmpData1 = Ext.getCmp('BList_ChengKeZaiHuo').getStore( ) ;
//   	var tmpData2 = Ext.getCmp('CList_ChengKeZaiHuo').getStore( ) ;
//   	var tmpData3 = Ext.getCmp('DList_ChengKeZaiHuo').getStore( ) ;
//   	var tmpData4 = Ext.getCmp('ZList_ChengKeZaiHuo').getStore( ) ;
//       //列表
//   	var data=tmpData.getData();
//   	var data1=tmpData1.getData();
//   	var data2=tmpData2.getData();
//   	var data3=tmpData3.getData();
//   	var data4=tmpData4.getData();
//   	var data5=tmpData5.getData();
//   	
//   	//评价
//   	var wbjl=['wbry','js','xm','qz','yh'];
//   	var pj=['yhpj','yhyj','signature'];
//   	var wbin=[];
//   	var pjin=[];
//   	for(var i=0;i<wbjl.length;i++){
//   		var wbob={};
//   		wbob.wbjl[i]=Ext.getCmp(wbjl[i]).getValue();
//   		wbin.push(wbob);
//   		if(i<pj.length){
//   			var pjob=[];
//   			pjob.pj[i]=Ext.getCmp(pj[i]).getValue();
//   			pjin.push(pjob);
//   		}
//   		
//   	}
//   	
//   	var obj=this;
//   	Ext.Msg.show({
//   		title:'温馨提示',
//   	    message:'是否提交?',
//   	    buttons:[{text:'取消',itemId:'cancel'},{text:'确定',itemId:'ok'}],
//   	    fn:function(buttonId){
//   	    	if(buttonId=='ok'){	
//   	    		var cdata={'info':info,'data':data,'data1':data1,'data2':data2,'data3':data3,'data4':data4,'data5':data5,'wbin':wbin,'pjin':pjin};
//   	    		console.log(JSON.stringify(cdata));
//   	    		//obj.connectServer(getResult, 'fuwuqingqiuluruAction.do?method=toaddinfo', JSON.stringify(cdata));
//   	    	}else
//   	    		return;
//   	    	
//   	    }
//   	    	
//
//   	});
//       
//   	function getResult(res){
//   		var res=JSON.stringify(res);
//   		if(res.staus=='ok')
//   			Ext.MSG.alert('ok!');
//   	}
//   	
//   },
//   ChengKeZaiHuo_back:function(){
//   	this.BackView();
//   	
//   },
//   button_qd1:function(){
//
//		Ext.Msg.show({
//		title:'温馨提示：',
//		message:'按进入用户页面按钮以后不能再次修改，如果需要重新调整可以重新填写报告书或者按取消按钮！',
//		modal:true,
//		hideOnMaskTap: true,
//		buttons:[
//		         {
//		        	 text:'确定',
//		        	 itemId:'qdCheck',
//		           
//		          },
//		          {
//			         text:'取消',
//			         itemId:'qxCheck',
//			        
//			      }
//		         ],
//		  fn:function(id){
//			  
//			 if(id=='qdCheck')
//		     {Ext.getCmp('yhfy').setHidden(false);
//        	 Ext.getCmp('button_qd1').setDisabled(true);
//		     }
//		  }       
//			
//		});
//   	
//   },
//   button_qd2:function(){
//
//   Ext.Msg.show({
//   	title:'温馨提示：',
//   	message:'按确定按钮以后不能再次修改，如果需要重新调整可以重新填写报告书或者按取消按钮！',
//		modal:true,
//		hideOnMaskTap: true,
//		buttons:[
//		          {
//		        	 text:'确定',
//		        	 itemId:'qdCheck1',
//		           
//		          },
//		          {
//			         text:'取消',
//			         itemId:'qxCheck1',
//			        
//			      }
//		         ],
//	   fn:function(id){
//		  
//			 if(id=='qdCheck1')
//		     {
//     	    Ext.getCmp('button_qd2').setDisabled(true);
//		     }
//		  }
//			
//		});
//   },
//   btn_update_report:function(){
//	 //报告书zhj 
//	   Ext.Viewport.removeMenu('right');
//            var obj=this;
//	        var getresult=function(res){
//	        	var data=res.content;
//	        	console.log("ressss",data);	        
//	        	var query={formwork_type:'fullyear,repair'};
//	        	var options={exact:false};
//	        	WL.JSONStore.get(collectionName).remove(query,options).then(function(res){
//	        		console.log("成功了！");
//
//		        	var options={};
//		        	WL.JSONStore.get(collectionName).add(data,options).then(function (re){
//		        		console.log("报告书同步成功！");
//		        		Ext.Msg.alert('更新成功！');
//		        		
//		        	}	
//		        	).fail(function(err){
//		        		 console.log("报告书同步失败！"); 
//		        	});
//	        	}).fail(function(err){
//	        		console.log("失败了！");
//	        	});
//	        	
//	        };
//            obj.asyconnectServer(getresult,"maintainancePlanItemListAction.do?method=toReport","");		    	
//	    
//   }

});