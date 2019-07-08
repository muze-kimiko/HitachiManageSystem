var obj_cj = null;
Ext.define('HelcPDA.controller.install.installcheck.InstallatoinTasksFactoryInfoCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//返回
			back_TasksFactory:'button[id=back_TasksFactory]',
			//签名
			btn_CHEK_MAN_SIGN:'button[id=btn_CHEK_MAN_SIGN]',
			btn_CHEK_MAN_SIGN1:'button[id=btn_CHEK_MAN_SIGN1]',
			btn_CHEK_SUPERVISOR_SIGN1:'button[id=btn_CHEK_SUPERVISOR_SIGN1]',
			
			//搜索调试人员
			Search_EBS_PERSON:'button[id=search_EBS_PERSON]',
			//搜索业绩归属人员
			ZP_CHECK_R:'button[id=ZP_CHECK_R]',
			//菜单
			menu_TaskFactory:'button[id=menu_TaskFactory]',
			//保存
			Save_TaskFactory:'button[id=save_TaskFactory]',
			//提交
			Commit_TaskFactory:'button[id=commit_TaskFactory]',
			//跟进遗留添加项目内容
			Add_GJ:'button[id=add_GJ]',
			//修改
			Modify_GJ:'button[id=modify_GJ]',
			//项目list 
			ProList:'list[id=ProList]',
			//员工list(弹出框) 
			ebs_person_List_panel1:'list[id=ebs_person_List_panel1]',
			//员工list(弹出框) 
			ebs_person_List_panel:'list[id=ebs_person_List_panel]',
			//检验员工list
			ebs_person_List:'list[id=ebs_person_List]',
			//业绩员工list
			YJ_list:'list[id=YJ_list]',
			//进入厂检信息页面
			TasksList:'list[id=tasksList]'
		},
		control:{
			//转派提交
			"button#commit_ZP":{
				tap:'Commit_ZP'
			},
			//厂检回滚
			"button#rollback_check":{
				tap:'rollback_check'
			},
			ZP_CHECK_R:{
				tap:'ZP_CHECK_R'
			},
			Search_EBS_PERSON:{
				tap:'Search_EBS_PERSON'
			},
			Modify_GJ:{
				tap:'Modify_GJ'
			},
			Add_GJ:{
				tap:'Add_GJ'
			},
			Commit_TaskFactory:{
				tap:'Commit_TaskFactory'
			},
			Save_TaskFactory:{
				tap:'Save_TaskFactory'
			},
			back_TasksFactory:{
				tap:'back_TasksFactory'
			},
			btn_CHEK_MAN_SIGN:{
				tap:'btn_CHEK_MAN_SIGN'
			},
			btn_CHEK_MAN_SIGN1:{
				tap:'btn_CHEK_MAN_SIGN1'
			},
			btn_CHEK_SUPERVISOR_SIGN1:{
				tap:'btn_CHEK_SUPERVISOR_SIGN1'
			},
			ebs_person_List:{
				itemtap:'ebs_person_List'
			},
			YJ_list:{
				itemtap:'YJ_list'
			},
			ebs_person_List_panel1:{
				itemtap:'ebs_person_List_panel1'
			},
			ebs_person_List_panel:{
				itemtap:'ebs_person_List_panel'
			},
			ProList:{
				itemtap:'ProList'
			},
			TasksList:{
				itemtap:'TasksList'
			},
			menu_TaskFactory:{
				tap:'menu_TaskFactory'
			}
		}
	},
	
	//厂检回滚
	rollback_check : function(){
		var obj = this;
		navigator.notification.confirm('任务数据返回上一个节点？',function(btn){
 			if(btn ==2){
				var ENGCONTRACT_NUMBER = Ext.getCmp('ENGCONTRACT_NUMBER').getValue();
				var ELEVATOR_NO = Ext.getCmp('ELEVATOR_NO').getValue();
				var TASK_PROCESS_ID = Ext.getCmp('TASK_PROCESS_ID').getValue();
				var ORG_ID = Ext.getCmp('ORG_ID').getValue();
				var TASK_ID = Ext.getCmp('TASK_ID').getValue();
				var SEQ_NUM = Ext.getCmp('SEQ_NUM').getValue();
				var USERID = ebs_user_id;
				
				contentdata={
						TASK_PROCESS_ID:TASK_PROCESS_ID,ORG_ID:ORG_ID,TASK_ID:TASK_ID,SEQ_NUM:SEQ_NUM,USERID:USERID
				};
				var content= JSON.stringify(contentdata);
				
				var getResult=function(res){
					WL.Toast.show('厂检数据已回滚');
					
					var WL_check=WL.JSONStore.get(collectionName);
					
					var query={tcode:ebs_user_id+"_check",tid:ENGCONTRACT_NUMBER+ELEVATOR_NO};
					var options={
				    		   exact:false,
				       }; 
					WL_check.remove(query,options).then(function(rres){
						var query={tcode:ebs_user_id+"_check",tid:ENGCONTRACT_NUMBER};
						var options={
					    		   exact:false,
					       }; 
						WL_check.find(query,options).then(function(res){
							var data =[];
							for(var i=0;i<res.length;i++){
								data[i]=res[i].json.stext;
							}
							var FactoryStore = obj.getStore("TasksFactoryStore","HelcPDA.store.install.installcheck.TasksFactoryStore");
							FactoryStore.setData(data);
						});
						
						obj.NextView('installatoinTasksFactoryPanel1','HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel1');
					});
				};
				
				obj.connectServer(getResult, 'changjian2Action.do?method=rollback_data', content);
			
 			}else{
 				return;
 			}
 		},"数据回滚","取消,确定");
		
	},
	
	//厂检提交
	Commit_TaskFactory : function(){
		var obj_this = this;
		
		var ENGCONTRACT_NUMBER = Ext.getCmp('ENGCONTRACT_NUMBER').getValue();
		var ELEVATOR_NO = Ext.getCmp('ELEVATOR_NO').getValue();
		
		//录入验收日期前，必须确保验收状态为‘检验合格’或‘复检合格’
		if((Ext.getCmp('CHECK_DATE').getValue()!=null&&Ext.getCmp('CHECK_DATE').getValue()!="")
			&&(Ext.getCmp('CHECK_ACCEPT_STATUE').getValue()!='检验合格'&&Ext.getCmp('CHECK_ACCEPT_STATUE').getValue()!='复检合格')){
			Ext.Msg.alert("提示","录入验收合格日期即代表该梯验收合格。因此，录入验收合格日期时，必须先确保验收状态为“检验合格”或“复检合格”。");
			return;
		};
      
		//初验收到达日期（检开始时间）不小于派检时间
		if(Ext.getCmp('PLAN_CHECK_DATE').getValue()!=null||Ext.getCmp('PLAN_CHECK_DATE').getValue()!=""){
			if(Date.parse(Ext.getCmp('CHECK_ARRIVE_DATE').getValue())<Date.parse(Ext.getCmp('PLAN_CHECK_DATE').getValue())){
				Ext.Msg.alert("验收到达日期（初检开始时间）不小于派检时间");
				return;
			};
		}
		//验收日期不小于初检开始时间
		if(Date.parse(Ext.getCmp('CHECK_DATE').getValue())<Date.parse(Ext.getCmp('CHECK_ARRIVE_DATE').getValue())){
			Ext.Msg.alert("验收日期不小于初检开始时间");
			return;
		};
		/*171120屏蔽 czq
		//报告签写日期不小于 验收到达日期
		if(Ext.getCmp('REPORT_DATE').getValue()!=null||Ext.getCmp('REPORT_DATE').getValue()!=""){
			if(Date.parse(Ext.getCmp('REPORT_DATE').getValue())<Date.parse(Ext.getCmp('CHECK_ARRIVE_DATE').getValue())){
				Ext.Msg.alert("报告签写日期不小于 验收到达日期");
				return;
			}
		};
		*/
		//退检日期（产生退检时必填且不小于验收到达日期）
		if(Ext.getCmp('AGREE_CHECK_ROLLBACK').getValue()!=null|| Ext.getCmp('AGREE_CHECK_ROLLBACK').getValue()!=""||
				Ext.getCmp('AGREE_RECHECK_BACKCHECK').getValue()!=null|| Ext.getCmp('AGREE_RECHECK_BACKCHECK').getValue()!=""){
			if(Date.parse(Ext.getCmp('CHECK_RETURN_DATE').getValue())<Date.parse(Ext.getCmp('CHECK_ARRIVE_DATE').getValue())){
				Ext.Msg.alert("退检日期（产生退检时必填且不小于验收到达日期）");
				return;
			};
		}
		
		
		//厂检数据
		//初检输入项
		var	CHECK_ARRIVE_DATE=null;
		if(Ext.getCmp('CHECK_ARRIVE_DATE').getValue()!=null){
			CHECK_ARRIVE_DATE = Ext.Date.format(Ext.getCmp('CHECK_ARRIVE_DATE').getValue(),'Y-m-d h:m:s');
		}else{
			CHECK_ARRIVE_DATE = "点击文本设置时间";
		}
		var SETUP_UNIT_SIGN_NAME = Ext.getCmp('SETUP_UNIT_SIGN_NAME').getValue();
		var CHEK_MAN_SIGN = Ext.getCmp('CHEK_MAN_SIGN').getValue();
		var CHECK_MAN_SIGN = Ext.getCmp('CHECK_MAN_SIGN').getValue();
		var	INSTALL_CHECK_END_DATE = null;
		if(Ext.getCmp('INSTALL_CHECK_END_DATE').getValue()!=null){
			INSTALL_CHECK_END_DATE = Ext.Date.format(Ext.getCmp('INSTALL_CHECK_END_DATE').getValue(),'Y-m-d h:m:s');
		}else{
			INSTALL_CHECK_END_DATE = "点击文本设置时间";
		}
		
		//复检输入项
		var	RECHECK_START_DATE = null;
		if(Ext.getCmp('RECHECK_START_DATE').getValue()!=null){
			RECHECK_START_DATE = Ext.Date.format(Ext.getCmp('RECHECK_START_DATE').getValue(),'Y-m-d h:m:s');
		}else{
			RECHECK_START_DATE = "点击文本设置时间";
		}
		var SETUP_UNIT_SIGN1_NAME = Ext.getCmp('SETUP_UNIT_SIGN1_NAME').getValue();
		var CHEK_MAN_SIGN1 = Ext.getCmp('CHEK_MAN_SIGN1').getValue();
		var CHECK_MAN_SIGN1 = Ext.getCmp('CHECK_MAN_SIGN1').getValue();
		var	RECHECK_FINISH_DATE = null;
		if(Ext.getCmp('RECHECK_FINISH_DATE').getValue()!=null){
			RECHECK_FINISH_DATE = Ext.Date.format(Ext.getCmp('RECHECK_FINISH_DATE').getValue(),'Y-m-d h:m:s');
		}else{
			RECHECK_FINISH_DATE = "点击文本设置时间";
		}
		
		//验收输入项
		var	CHECK_DATE = null;
		var	REPORT_DATE = null;
		var	AHEAD_REPORT_DATE = null;
		var	RE_CHECK_DATE = null;
		var	BAD_DELIVERY_DATE = null;
		if(Ext.getCmp('CHECK_DATE').getValue()!=null){
			CHECK_DATE = Ext.Date.format(Ext.getCmp('CHECK_DATE').getValue(),'Y-m-d h:m:s');
		}else{
			CHECK_DATE = "点击文本设置时间";
		}
		if(Ext.getCmp('REPORT_DATE').getValue()!=null){
			REPORT_DATE = Ext.Date.format(Ext.getCmp('REPORT_DATE').getValue(),'Y-m-d h:m:s');
		}else{
			REPORT_DATE = "点击文本设置时间";
		}
		if(Ext.getCmp('AHEAD_REPORT_DATE').getValue()!=null){
			AHEAD_REPORT_DATE = Ext.Date.format(Ext.getCmp('AHEAD_REPORT_DATE').getValue(),'Y-m-d h:m:s');
		}else{
			AHEAD_REPORT_DATE = "点击文本设置时间";
		}
		if(Ext.getCmp('RE_CHECK_DATE').getValue()!=null){
			RE_CHECK_DATE = Ext.Date.format(Ext.getCmp('RE_CHECK_DATE').getValue(),'Y-m-d h:m:s');
		}else{
			RE_CHECK_DATE = "点击文本设置时间";
		}
		if(Ext.getCmp('BAD_DELIVERY_DATE').getValue()!=null){
			BAD_DELIVERY_DATE = Ext.Date.format(Ext.getCmp('BAD_DELIVERY_DATE').getValue(),'Y-m-d h:m:s');
		}else{
			BAD_DELIVERY_DATE = "点击文本设置时间";
		}
		var SERVICE_NUM = Ext.getCmp('SERVICE_NUM').getValue();
		var CHECK_COMMENTS = Ext.getCmp('CHECK_COMMENTS').getValue();
		var CHECK_ACCEPT_STATUE = Ext.getCmp('CHECK_ACCEPT_STATUE').getValue();
	
		//退检数据
		//退检输入项
		var	CHECK_RETURN_DATE = null;
		if(Ext.getCmp('CHECK_RETURN_DATE').getValue()!=null){
			CHECK_RETURN_DATE = Ext.Date.format(Ext.getCmp('CHECK_RETURN_DATE').getValue(),'Y-m-d h:m:s');
		}else{
			CHECK_RETURN_DATE = "点击文本设置时间";
		}
		var CHECK_RETURN_REASON = Ext.getCmp('CHECK_RETURN_REASON').getValue();
		var CHECK_FORFEIT_AMT = Ext.getCmp('CHECK_FORFEIT_AMT').getValue();
		var	CHECK_FORFEIT_DATE = null;
		if(Ext.getCmp('CHECK_FORFEIT_DATE').getValue()!=null){
			CHECK_FORFEIT_DATE = Ext.Date.format(Ext.getCmp('CHECK_FORFEIT_DATE').getValue(),'Y-m-d h:m:s');
		}else{
			CHECK_FORFEIT_DATE = "点击文本设置时间";
		}
		
		//初检退检审批
		var AGREE_CHECK_ROLLBACK = null;
		if(Ext.getCmp('AGREE_CHECK_ROLLBACK').getValue()=="0"){
			AGREE_CHECK_ROLLBACK = "N";
		}
		if(Ext.getCmp('AGREE_CHECK_ROLLBACK').getValue()=="1"){
			AGREE_CHECK_ROLLBACK = "Y";
		}
		var CHECK_PRINCIPAL_SIGN_TXT = Ext.getCmp('CHECK_PRINCIPAL_SIGN_TXT').getValue();
		var	CHECK_PRINCIPAL_SIGN_DATE = null;
		if(Ext.getCmp('CHECK_PRINCIPAL_SIGN_DATE').getValue()!=null){
			CHECK_PRINCIPAL_SIGN_DATE = Ext.Date.format(Ext.getCmp('CHECK_PRINCIPAL_SIGN_DATE').getValue(),'Y-m-d h:m:s');
		}else{
			CHECK_PRINCIPAL_SIGN_DATE = "点击文本设置时间";
		}
		
		//复检退检审批
		var AGREE_RECHECK_BACKCHECK = null;
		if(Ext.getCmp('AGREE_RECHECK_BACKCHECK').getValue()=="0"){
			AGREE_RECHECK_BACKCHECK = "N";
		}
		if(Ext.getCmp('AGREE_RECHECK_BACKCHECK').getValue()=="1"){
			AGREE_RECHECK_BACKCHECK = "Y";
		}
		var CHECKOUT_PRINCIPAL_SIGN_NAME = Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_NAME').getValue();
		var	CHECKOUT_PRINCIPAL_SIGN_DATE = null;
		if(Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_DATE').getValue()!=null){
			CHECKOUT_PRINCIPAL_SIGN_DATE = Ext.Date.format(Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_DATE').getValue(),'Y-m-d h:m:s');
		}else{
			CHECKOUT_PRINCIPAL_SIGN_DATE = "点击文本设置时间";
		}

		//工程输入项
		var PROJECT_PRINCIPAL_SIGN_NAME = Ext.getCmp('PROJECT_PRINCIPAL_SIGN_NAME').getValue();
		var	PROJECT_PRINCIPAL_SIGN_DATE = null;
		if(Ext.getCmp('PROJECT_PRINCIPAL_SIGN_DATE').getValue()!=null){
			PROJECT_PRINCIPAL_SIGN_DATE = Ext.Date.format(Ext.getCmp('PROJECT_PRINCIPAL_SIGN_DATE').getValue(),'Y-m-d h:m:s');
		}else{
			PROJECT_PRINCIPAL_SIGN_DATE = "点击文本设置时间";
		}
		
		//跟进遗留数据
		var AGREE_FOLLOWUP = null;
		if(Ext.getCmp('AGREE_FOLLOWUP').getValue()=="0"){
			AGREE_FOLLOWUP = "N";
		}
		if(Ext.getCmp('AGREE_FOLLOWUP').getValue()=="1"){
			AGREE_FOLLOWUP = "Y";
		}
		var CHECKOUT_APPROVE_SIGN_NAME = Ext.getCmp('CHECKOUT_APPROVE_SIGN_NAME').getValue();
		var	CHECKOUT_APPROVE_SIGN_DATE = null;
		if(Ext.getCmp('CHECKOUT_APPROVE_SIGN_DATE').getValue()!=null){
			CHECKOUT_APPROVE_SIGN_DATE = Ext.Date.format(new Date(Ext.getCmp('CHECKOUT_APPROVE_SIGN_DATE').getValue()),'Y-m-d h:m:s');
		}else{
			CHECKOUT_APPROVE_SIGN_DATE = "点击文本设置时间";
		}

		var WHETER_APPLY_TO_CUSTOMER = null;
		if(Ext.getCmp('WHETER_APPLY_TO_CUSTOMER').getValue()=="0"){
			WHETER_APPLY_TO_CUSTOMER = "N";
		}
		if(Ext.getCmp('WHETER_APPLY_TO_CUSTOMER').getValue()=="1"){
			WHETER_APPLY_TO_CUSTOMER = "Y";
		}
		var TRANSFER_CUSTOMER_NAME = Ext.getCmp('TRANSFER_CUSTOMER_NAME').getValue();
		var TEL1 = Ext.getCmp('TEL1').getValue();
		var	PLAN_FINISH_DATE = null;
		if(Ext.getCmp('PLAN_FINISH_DATE').getValue()!=null){
			PLAN_FINISH_DATE = Ext.Date.format(new Date(Ext.getCmp('PLAN_FINISH_DATE').getValue()),'Y-m-d h:m:s');
		}else{
			PLAN_FINISH_DATE = "点击文本设置时间";
		}

		var CHEK_SUPERVISOR_SIGN1 = Ext.getCmp('CHEK_SUPERVISOR_SIGN1').getValue();
		var SUPERVISOR_SIGN1 = Ext.getCmp('SUPERVISOR_SIGN1').getValue();
		var SURPERVISOR_SIGN_NAME = Ext.getCmp('SURPERVISOR_SIGN_NAME').getValue();
		var SURPERVISOR_SIGN_DATE = null;
		if(Ext.getCmp('SURPERVISOR_SIGN_DATE').getValue()!=null){
			SURPERVISOR_SIGN_DATE = Ext.Date.format(new Date(Ext.getCmp('SURPERVISOR_SIGN_DATE').getValue()),'Y-m-d h:m:s');
		}else{
			SURPERVISOR_SIGN_DATE = "点击文本设置时间";
		}
		
		//后台需要数据
		var USERID = ebs_user_id;
		var TASK_PROCESS_ID = Ext.getCmp('TASK_PROCESS_ID').getValue();
		var ORG_ID = Ext.getCmp('ORG_ID').getValue();
		var TASK_ID = Ext.getCmp('TASK_ID').getValue();
		var SEQ_NUM = Ext.getCmp('SEQ_NUM').getValue();
		var DEBUG_NUM = Ext.getCmp('DEBUG_NUM').getValue();
		var CHECK_NUM = Ext.getCmp('CHECK_NUM').getValue();
		
		//初检开始时间
		var	INSTALL_CHECK_START_DATE = null;
		if(Ext.getCmp('CHECK_ARRIVE_DATE').getValue()!=null){
			INSTALL_CHECK_START_DATE = Ext.Date.format(Ext.getCmp('CHECK_ARRIVE_DATE').getValue(),'Y-m-d h:m:s');
		}else{
			INSTALL_CHECK_START_DATE = "点击文本设置时间";
		}
		
		//记录报告提前签写时间
		var	REPORT_ENTER_DATE_ = Ext.getCmp('REPORT_ENTER_DATE').getValue();
		
		//不良项目是否不产生二次检验费用  (菜单纸)
		var NOT_CREATE_COST =  null;
		
		//跟进遗留
		//项目内容、原因、存放位置
		var menues=[];
		var ProListStore0 = this.getStore("ProListStore0","HelcPDA.store.install.installcheck.ProListStore0");
		var GJYLlist = ProListStore0.data.items;
		for(var i=0;i<GJYLlist.length;i++){
			menues[i] = GJYLlist[i].data;
			menues[i].MATERIAL_ADDRESS = Ext.getCmp('MATERIAL_ADDRESS').getValue();
		};
		
		var ProListStore2 = this.getStore("ProListStore2","HelcPDA.store.install.installcheck.ProListStore2");
		var ebslist1 = ProListStore2.data.items;
		var EBS_PERSON_NAME_R = [];
		for(var j = 0;j<ebslist1.length;j++){
			var EBS_PERSON_NAME = {};
			EBS_PERSON_NAME.TASK_PROCESS_ID = TASK_PROCESS_ID;
			EBS_PERSON_NAME.TASK_ID = TASK_ID;
			EBS_PERSON_NAME.EBS_PERSON_ID = ebslist1[j].data.EBS_PERSON_ID;
			EBS_PERSON_NAME_R[j]=EBS_PERSON_NAME;
		};
		
		
		contentdata={
				USERID:USERID,TASK_PROCESS_ID:TASK_PROCESS_ID,ORG_ID:ORG_ID,TASK_ID:TASK_ID,SEQ_NUM:SEQ_NUM,
				DEBUG_NUM:DEBUG_NUM,CHECK_NUM:CHECK_NUM,REPORT_ENTER_DATE:REPORT_ENTER_DATE_,INSTALL_CHECK_START_DATE:INSTALL_CHECK_START_DATE,
				CHECK_ARRIVE_DATE:CHECK_ARRIVE_DATE,SETUP_UNIT_SIGN_NAME:SETUP_UNIT_SIGN_NAME,
				
				CHECK_MAN_SIGN:CHECK_MAN_SIGN,INSTALL_CHECK_END_DATE:INSTALL_CHECK_END_DATE,RECHECK_START_DATE:RECHECK_START_DATE,
				SETUP_UNIT_SIGN1_NAME:SETUP_UNIT_SIGN1_NAME,CHECK_MAN_SIGN_NAME:CHEK_MAN_SIGN,CHECK_MAN_SIGN1_NAME:CHEK_MAN_SIGN1,CHECK_MAN_SIGN1:CHECK_MAN_SIGN1,RECHECK_FINISH_DATE:RECHECK_FINISH_DATE,
				CHECK_DATE:CHECK_DATE,REPORT_DATE:REPORT_DATE,AHEAD_REPORT_DATE:AHEAD_REPORT_DATE,RE_CHECK_DATE:RE_CHECK_DATE,
				BAD_DELIVERY_DATE:BAD_DELIVERY_DATE,SERVICE_NUM:SERVICE_NUM,CHECK_COMMENTS:CHECK_COMMENTS,CHECK_ACCEPT_STATUE:CHECK_ACCEPT_STATUE,
				CHECK_RETURN_DATE:CHECK_RETURN_DATE,CHECK_RETURN_REASON:CHECK_RETURN_REASON,CHECK_FORFEIT_AMT:CHECK_FORFEIT_AMT,
				CHECK_FORFEIT_DATE:CHECK_FORFEIT_DATE,AGREE_CHECK_ROLLBACK:AGREE_CHECK_ROLLBACK,CHECK_PRINCIPAL_SIGN_TXT:CHECK_PRINCIPAL_SIGN_TXT,
				CHECK_PRINCIPAL_SIGN_DATE:CHECK_PRINCIPAL_SIGN_DATE,AGREE_RECHECK_BACKCHECK:AGREE_RECHECK_BACKCHECK,
				CHECKOUT_PRINCIPAL_SIGN_NAME:CHECKOUT_PRINCIPAL_SIGN_NAME,CHECKOUT_PRINCIPAL_SIGN_DATE:CHECKOUT_PRINCIPAL_SIGN_DATE,
				PROJECT_PRINCIPAL_SIGN_NAME:PROJECT_PRINCIPAL_SIGN_NAME,PROJECT_PRINCIPAL_SIGN_DATE:PROJECT_PRINCIPAL_SIGN_DATE,
				AGREE_FOLLOWUP:AGREE_FOLLOWUP,CHECKOUT_APPROVE_SIGN_NAME:CHECKOUT_APPROVE_SIGN_NAME,CHECKOUT_APPROVE_SIGN_DATE:CHECKOUT_APPROVE_SIGN_DATE,
				WHETER_APPLY_TO_CUSTOMER:WHETER_APPLY_TO_CUSTOMER,TRANSFER_CUSTOMER_NAME:TRANSFER_CUSTOMER_NAME,TEL1:TEL1,
				PLAN_FINISH_DATE:PLAN_FINISH_DATE,PLAN_FINISH_DATE:PLAN_FINISH_DATE,SURPERVISOR_SIGN_NAME:SURPERVISOR_SIGN_NAME,
				SURPERVISOR_SIGN_DATE:SURPERVISOR_SIGN_DATE,SUPERVISOR_SIGN1_NAME:CHEK_SUPERVISOR_SIGN1,SUPERVISOR_SIGN1:SUPERVISOR_SIGN1,
				NOT_CREATE_COST:NOT_CREATE_COST,MENUES:menues,EBS_PERSON_NAME_R:EBS_PERSON_NAME_R};
	
		
		//保存
		var WL_check=WL.JSONStore.get(collectionName);
		//基本信息
		var SEQ_NUM = Ext.getCmp('SEQ_NUM').getValue();
		var query={tid:ELEVATOR_NO+SEQ_NUM,tcode:ebs_user_id+'_check'};
		WL_check.find(query).then(function(res){
			var data = res[0].json.stext;
			//初检输入项
//			data.CHECK_ARRIVE_DATE = Ext.Date.format(Ext.getCmp('CHECK_ARRIVE_DATE').getValue(),'Y-m-d');
			data.CHECK_ARRIVE_DATE = Ext.getCmp('CHECK_ARRIVE_DATE').getValue();
			data.SETUP_UNIT_SIGN_NAME = Ext.getCmp('SETUP_UNIT_SIGN_NAME').getValue();
			data.CHEK_MAN_SIGN = Ext.getCmp('CHEK_MAN_SIGN').getValue();
			data.INSTALL_CHECK_END_DATE = Ext.getCmp('INSTALL_CHECK_END_DATE').getValue();
			
			//复检输入项
			data.RECHECK_START_DATE = Ext.getCmp('RECHECK_START_DATE').getValue();
			data.SETUP_UNIT_SIGN1_NAME = Ext.getCmp('SETUP_UNIT_SIGN1_NAME').getValue();
			data.CHEK_MAN_SIGN1 = Ext.getCmp('CHEK_MAN_SIGN1').getValue();
			data.RECHECK_FINISH_DATE = Ext.getCmp('RECHECK_FINISH_DATE').getValue();
			
			//验收输入项
			data.CHECK_DATE = Ext.getCmp('CHECK_DATE').getValue();
			data.REPORT_DATE = Ext.getCmp('REPORT_DATE').getValue();
			data.REPORT_ENTER_DATE = Ext.getCmp('REPORT_ENTER_DATE').getValue();
			data.AHEAD_REPORT_DATE = Ext.getCmp('AHEAD_REPORT_DATE').getValue();
			data.RE_CHECK_DATE = Ext.getCmp('RE_CHECK_DATE').getValue();
			data.BAD_DELIVERY_DATE = Ext.getCmp('BAD_DELIVERY_DATE').getValue();
			data.SERVICE_NUM = Ext.getCmp('SERVICE_NUM').getValue();
			data.CHECK_COMMENTS = Ext.getCmp('CHECK_COMMENTS').getValue();
			data.CHECK_ACCEPT_STATUE = Ext.getCmp('CHECK_ACCEPT_STATUE').getValue();
			
			//退检输入项
			data.CHECK_RETURN_DATE = Ext.getCmp('CHECK_RETURN_DATE').getValue();
			if(res[0].json.status==1){
				data.CHANG_SATRTUS = "已进入待提交队列";
			}else{
				if(CHECK_DATE == "点击文本设置时间"){
					data.CHANG_SATRTUS = "厂检未到达";
				}else if(CHECK_DATE != "点击文本设置时间" && CHECK_RETURN_DATE != null &&CHECK_RETURN_DATE != "点击文本设置时间"){
					data.CHANG_SATRTUS = '已退检';
				}else {
					data.CHANG_SATRTUS = "检验中";
				}
				
			}
			data.CHECK_RETURN_REASON = Ext.getCmp('CHECK_RETURN_REASON').getValue();
			data.CHECK_FORFEIT_AMT = Ext.getCmp('CHECK_FORFEIT_AMT').getValue();
			data.CHECK_FORFEIT_DATE = Ext.getCmp('CHECK_FORFEIT_DATE').getValue();
			
			//初检退检审批
			data.AGREE_CHECK_ROLLBACK = Ext.getCmp('AGREE_CHECK_ROLLBACK').getValue();
			data.CHECK_PRINCIPAL_SIGN_TXT = Ext.getCmp('CHECK_PRINCIPAL_SIGN_TXT').getValue();
			data.CHECK_PRINCIPAL_SIGN_DATE = Ext.getCmp('CHECK_PRINCIPAL_SIGN_DATE').getValue();
			
			//复检退检审批
			data.AGREE_RECHECK_BACKCHECK = Ext.getCmp('AGREE_RECHECK_BACKCHECK').getValue();
			data.CHECKOUT_PRINCIPAL_SIGN_NAME = Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_NAME').getValue();
			data.CHECKOUT_PRINCIPAL_SIGN_DATE = Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_DATE').getValue();

			//工程输入项
			data.PROJECT_PRINCIPAL_SIGN_NAME = Ext.getCmp('PROJECT_PRINCIPAL_SIGN_NAME').getValue();
			data.PROJECT_PRINCIPAL_SIGN_DATE = Ext.getCmp('PROJECT_PRINCIPAL_SIGN_DATE').getValue();
			
			
			
			res[0].json.stext = data;
			
			if(res[0].json.status == 1){
				WL.Toast.show("数据已进入待提交队列，请勿重复提交");
			}else{
				var options = {};
				WL.JSONStore.get(collectionName).refresh(res[0],options).then(function(){
					WL.Toast.show("保存成功");
					var query2={tcode:ebs_user_id+"_check",tid:ENGCONTRACT_NUMBER+ELEVATOR_NO};
					WL.JSONStore.get(collectionName).find(query2).then(function(rest){
						//配置数据
						var ext1={};
						var tempExt={};
						var obj={};
						ext1.url='changjian2Action.do?method=PDA3_toAdd_changjian';
						tempExt.msg_title='厂检任务';
						tempExt.msg_body=ELEVATOR_NO;
						tempExt.msg_result='已进入待提交队列';//'正在等待提交';
						obj=rest[0];
						ext1.msg=tempExt;
						ext1.obj = obj;
						ext1.cparam = ENGCONTRACT_NUMBER;
						ext1.view_id='install.installcheck.InstallatoinTasksFactoryPanelCtrl';
						query1={tid:"CJRW",tcode:'UNCOMMIT_CJRW',stext:contentdata,ext1:ext1,status:'1'};
						rest[0].json.status = 1;
						WL.JSONStore.get(collectionName).add(query1).then(function(){
							WL.JSONStore.get(collectionName).refresh(rest[0]).then(function(){
								obj_this.getApplication().getController('install.installcheck.InstallatoinTasksFactoryPanelCtrl').LoadGHlist(ENGCONTRACT_NUMBER);
								obj_this.showBackView('installatoinTasksFactoryPanel1','HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel1');
								WL.Toast.show('已进入待提交队列');
							}).fail(function(){});
						}).fail(function(){});
						
					}).fail(function(){});
				}).fail(function(){
					Ext.Msg.alert('刷新失败');
				}); 
			}
		});
		
	},
	
	//转派
	//提交
	Commit_ZP : function(){
		var USERID = userid;
		var TASK_PROCESS_ID = Ext.getCmp('TASK_PROCESS_ID').getValue();
		var ORG_ID = Ext.getCmp('ORG_ID').getValue();
		var TASK_ID = Ext.getCmp('TASK_ID').getValue();
		var SEQ_NUM = Ext.getCmp('SEQ_NUM').getValue();
		var DEBUG_NUM = Ext.getCmp('DEBUG_NUM').getValue();
		var CHECK_NUM = Ext.getCmp('CHECK_NUM').getValue();
		
		var content="{'USERID':'"+USERID+"','TASK_PROCESS_ID':'"+TASK_PROCESS_ID+"','ORG_ID':'"+ORG_ID+"','TASK_ID':'"+TASK_ID+"','SEQ_NUM':'"+SEQ_NUM+"','DEBUG_NUM':'"+DEBUG_NUM+"','CHECK_NUM':'"+CHECK_NUM+"'}";
		
		var getResult=function(res){
			if(res == "Y"){
				WL.Toast.show("该工号已退检，请通知主管在ERP上重新派检后才能继续操作！"); 
				return;
			}
			var person_length = Ext.data.StoreManager.get('ProListStore1').data.length;
			if(person_length==0){
				WL.Toast.show("请添加转派人再提交!");
				return;
			}
			
			var USERID = ebs_user_id;
			var TASK_PROCESS_ID = Ext.getCmp('TASK_PROCESS_ID').getValue();
			var ORG_ID = Ext.getCmp('ORG_ID').getValue();
			var TASK_ID = Ext.getCmp('TASK_ID').getValue();
			var SEQ_NUM = Ext.getCmp('SEQ_NUM').getValue();
			var DEBUG_NUM = Ext.getCmp('DEBUG_NUM').getValue();
			var CHECK_NUM = Ext.getCmp('CHECK_NUM').getValue();
			var EBS_PERSON_ID = Ext.getCmp('EBS_PERSON_ID').getValue();
			
			var content="{'USERID':'"+USERID+"','TASK_PROCESS_ID':'"+TASK_PROCESS_ID+"'," +
					"'ORG_ID':'"+ORG_ID+"','TASK_ID':'"+TASK_ID+"','SEQ_NUM':'"+SEQ_NUM+"'," +
					"'DEBUG_NUM':'"+DEBUG_NUM+"','CHECK_NUM':'"+CHECK_NUM+"',rows:[{'EBS_PERSON_ID':'"+EBS_PERSON_ID+"'}]}";
			
			var getResult=function(res){
				WL.Toast.show("转派成功"); 
			};
			
			this.connectServer(getResult, 'changjian2Action.do?method=toAdds', content);
		};
		
		this.connectServer(getResult, 'changjian2Action.do?method=Chek_commit', content);
	},
	
	//检验人员
	//点击弹出框员工设置到转派页面
	ebs_person_List_panel : function(obj, index, target, record, e, eOpts ){
		var obj = this;
		var ProListStore = obj.getStore("ProListStore","HelcPDA.store.install.installcheck.ProListStore");
		var ProListStore1 = obj.getStore("ProListStore1","HelcPDA.store.install.installcheck.ProListStore1");
		var new_EBS_FULL_NAME=ProListStore.getAt(index).get('EBS_FULL_NAME');
		var new_EBS_EMPLOYEE_NUMBER=ProListStore.getAt(index).get('EBS_EMPLOYEE_NUMBER');
		Ext.getCmp('EBS_PERSON_ID').setValue(ProListStore.getAt(index).get('EBS_PERSON_ID'));
		
		Ext.getCmp('EBS_PERSON_LIST').destroy();
		
		var new_data =[];
		var ebslist = ProListStore1.data.items;
		var length_ = ebslist.length;
		for(var i=0;i<length_;i++){
    		var newdata_item = {};
    		var EBS_FULL_NAME = ebslist[i].data.EBS_FULL_NAME;
	    	var EBS_EMPLOYEE_NUMBER=ebslist[i].data.EBS_EMPLOYEE_NUMBER;
	    	
	    	if(new_EBS_FULL_NAME == ebslist[i].data.EBS_FULL_NAME){
	    		WL.Toast.show("该检验人员已添加"); 
	    		return;
	    	}else{
	    		newdata_item.EBS_FULL_NAME = EBS_FULL_NAME; 
	    		newdata_item.EBS_EMPLOYEE_NUMBER = EBS_EMPLOYEE_NUMBER; 
	    		new_data[i]=newdata_item;
	    	}
    	}
    	
    	new_data[length_] ={EBS_FULL_NAME:new_EBS_FULL_NAME,EBS_EMPLOYEE_NUMBER:new_EBS_EMPLOYEE_NUMBER};
    	ebslist = new_data; 
    	
    	ProListStore1.setData(ebslist);
    	
	},
	
	//检验人员list删除
	ebs_person_List : function(obj, index, target, record, e, eOpts ){
		var ProListStore1 = obj.getStore("ProListStore1","HelcPDA.store.install.installcheck.ProListStore1");
		if(event.target.id=="1"){
			navigator.notification.confirm('删除信息？',function(btn){
	 			if(btn ==2){
	 				ProListStore1.removeAt(index);
		            list.splice(index, 1);
	 			}else{
	 				return;
	 			}
	 		},"提示","取消,确定");
//			Ext.Msg.confirm('你好','删除信息？',function(btn){
//				if (btn == 'yes'){
//					ProListStore1.removeAt(index);
//		            list.splice(index, 1);
//				}else{
//					return;
//				}
//			});
			
		}else{
	         Ext.getCmp('EBS_FULL_NAME').setValue(ProListStore.getAt(index).get('EBS_FULL_NAME'));
	         Ext.getCmp('EBS_EMPLOYEE_NUMBER').setValue(ProListStore.getAt(index).get('EBS_EMPLOYEE_NUMBER'));
	         Ext.getCmp('ebshidddenListIndex').setValue(index);
		}
	},
	
	//查询
	Search_EBS_PERSON : function(){
		var obj = this;
		var EBS_PERSON_NAME = Ext.getCmp('EBS_PERSON_NAME').getValue();
		
		var content="{'EBS_PERSON_NAME':'"+EBS_PERSON_NAME+"'}";
	
		var getResult=function(res){
			var str=res.rows;
			if(str.length==0){
    			Ext.Msg.alert("找不到对应的检验人员名称!");
    		}else{
    			var EBS_PERSON_LIST=Ext.getCmp('EBS_PERSON_LIST');
            	if(EBS_PERSON_LIST){
            		EBS_PERSON_LIST.destroy();
            	}
            	if(!lists){
            		var lists=Ext.Viewport.add({
            		     xtype:'panel',
            		     id:'EBS_PERSON_LIST',
            		     height:300,
            		     width:400,
            		     modal: true,
            		     hideOnMaskTap: true,
         	             centered: true,
            		     items:[
            		            {xtype:'fieldset',
            		            	height:300,
            		            	width:400,
            		            	items:[{
    	        		            	xtype:'list',     		
    	     		        		    id:'ebs_person_List_panel',
    	     		        		    store:'ProListStore',
    	     		        		    height:300,
    	     		        		    width:400,
    	     		        		    itemTpl:[
    	     		        		             	'<div>{EBS_FULL_NAME}_{EBS_EMPLOYEE_NUMBER}<div>'
    	     		        		            ]
            		            	}] 
            		            }]
            	});
            		lists.show();
            	}
            
            	var ProListStore = obj.getStore("ProListStore","HelcPDA.store.install.installcheck.ProListStore");
        		ProListStore.setData(str);
    		}
			
		};
		
		if(EBS_PERSON_NAME==null||EBS_PERSON_NAME==""||typeof(EBS_PERSON_NAME)=="undefined"){
        	Ext.Msg.alert("请输入要查询的检验人员员工编号！");
        	WL.Toast.show("请输入要查询的检验人员员工编号！"); 
        }else{
        	this.connectServer(getResult, 'tiaoshiAction.do?method=Search_zp_user', content);
        }
	},
	
	
	//业绩归属人员
//	点击弹出框员工设置到转派页面
	ebs_person_List_panel1 : function(obj, index, target, record, e, eOpts ){
		var obj = this;
		var ProListStore = obj.getStore("ProListStore","HelcPDA.store.install.installcheck.ProListStore");
		var ProListStore2 = obj.getStore("ProListStore2","HelcPDA.store.install.installcheck.ProListStore2");
		var new_EBS_FULL_NAME=ProListStore.getAt(index).get('EBS_FULL_NAME');
		var new_EBS_EMPLOYEE_NUMBER=ProListStore.getAt(index).get('EBS_EMPLOYEE_NUMBER');
		var new_EBS_PERSON_ID=ProListStore.getAt(index).get('EBS_PERSON_ID');
		
		Ext.getCmp('EBS_PERSON_LIST1').destroy();
		
		var new_data =[];
		var ebslist1 = ProListStore2.data.items;
		var length_ = ebslist1.length;
		for(var i=0;i<length_;i++){
    		var newdata_item = {};
    		var EBS_FULL_NAME = ebslist1[i].data.EBS_FULL_NAME;
	    	var EBS_EMPLOYEE_NUMBER=ebslist1[i].data.EBS_EMPLOYEE_NUMBER;
	    	var EBS_PERSON_ID=ebslist1[i].data.EBS_PERSON_ID;
	    	
	    	if(new_EBS_FULL_NAME == ebslist1[i].data.EBS_FULL_NAME){
	    		WL.Toast.show("该检验人员已添加"); 
	    		return;
	    	}else{
	    		newdata_item.EBS_FULL_NAME = EBS_FULL_NAME; 
	    		newdata_item.EBS_EMPLOYEE_NUMBER = EBS_EMPLOYEE_NUMBER; 
	    		newdata_item.EBS_PERSON_ID = EBS_PERSON_ID; 
	    		new_data[i]=newdata_item;
	    	}
    	}
    	
    	new_data[length_] ={EBS_FULL_NAME:new_EBS_FULL_NAME,EBS_EMPLOYEE_NUMBER:new_EBS_EMPLOYEE_NUMBER,EBS_PERSON_ID:new_EBS_PERSON_ID};
    	ebslist1 = new_data; 
    	
    	ProListStore2.setData(ebslist1);
	},
	
	//检验人员list删除
	YJ_list : function(obj, index, target, record, e, eOpts ){
		var ProListStore2 = obj.getStore("ProListStore2","HelcPDA.store.install.installcheck.ProListStore2");
		if(event.target.id=="1"){
			navigator.notification.confirm('删除信息？',function(btn){
	 			if(btn ==2){
	 				ProListStore2.removeAt(index);
		            list.splice(index, 1);
	 			}else{
	 				return;
	 			}
	 		},"提示","取消,确定");
//			Ext.Msg.confirm('你好','删除信息？',function(btn){
//				if (btn == 'yes'){
//					ProListStore2.removeAt(index);
//		            list.splice(index, 1);
//				}else{
//					return;
//				}
//			});
			
		}else{
	         Ext.getCmp('EBS_FULL_NAME').setValue(ProListStore.getAt(index).get('EBS_FULL_NAME'));
	         Ext.getCmp('EBS_EMPLOYEE_NUMBER').setValue(ProListStore.getAt(index).get('EBS_EMPLOYEE_NUMBER'));
	         Ext.getCmp('yjhidddenListIndex').setValue(index);
		}
	},
	
	//查询
	ZP_CHECK_R : function(){
		var obj = this;
		var EBS_PERSON_NAME1 = Ext.getCmp('EBS_PERSON_NAME1').getValue();
		
		var content="{'EBS_PERSON_NAME':'"+EBS_PERSON_NAME1+"'}";
	
		var getResult=function(res){
			var str=res.rows;
			if(str.length==0){
    			Ext.Msg.alert("找不到对应的检验人员名称!");
    		}else{
    			var EBS_PERSON_LIST1=Ext.getCmp('EBS_PERSON_LIST1');
            	if(EBS_PERSON_LIST1){
            		EBS_PERSON_LIST1.destroy();
            	}
            	if(!lists){
            		var lists=Ext.Viewport.add({
            		     xtype:'panel',
            		     id:'EBS_PERSON_LIST1',
            		     height:300,
            		     width:400,
            		     modal: true,
            		     hideOnMaskTap: true,
         	             centered: true,
            		     items:[
            		            {xtype:'fieldset',
            		            	height:300,
            		            	width:400,
            		            	items:[{
    	        		            	xtype:'list',     		
    	     		        		    id:'ebs_person_List_panel1',
    	     		        		    store:'ProListStore',
    	     		        		    height:300,
    	     		        		    width:400,
    	     		        		    itemTpl:[
    	     		        		             	'<div>{EBS_FULL_NAME}_{EBS_EMPLOYEE_NUMBER}<div>'
    	     		        		            ]
            		            	}] 
            		            }]
            	});
            		lists.show();
            	}
            
            	var ProListStore = obj.getStore("ProListStore","HelcPDA.store.install.installcheck.ProListStore");
        		ProListStore.setData(str);
    		}
			
		};
		
		if(EBS_PERSON_NAME1==null||EBS_PERSON_NAME1==""||typeof(EBS_PERSON_NAME1)=="undefined"){
        	Ext.Msg.alert("请输入要查询的检验人员员工编号！");
        	WL.Toast.show("请输入要查询的检验人员员工编号！"); 
        }else{
        	this.connectServer(getResult, 'tiaoshiAction.do?method=Search_zp_user', content);
        }
	},
	
	//跟进遗留
	//修改
	Modify_GJ : function(){
		var ProListStore0 = this.getStore("ProListStore0","HelcPDA.store.install.installcheck.ProListStore0");
		var GJYLlist = ProListStore0.data.items;	
		var PRO_DETAILS=Ext.getCmp("PRO_DETAILS").getValue();
		var LEAVE_REASON=Ext.getCmp("LEAVE_REASON").getValue();
		
		if(Ext.getCmp('PRO_DETAILS').getValue()==""||Ext.getCmp('PRO_DETAILS').getValue()==null){
			WL.Toast.show('项目内容不能为空'); 
		}else{
			if(Ext.getCmp('LEAVE_REASON').getValue()==""||Ext.getCmp('LEAVE_REASON').getValue()==null){
				WL.Toast.show('遗留原因不能为空'); 
			}
		}
		var GJYLlist = ProListStore0.data.items;
		var length_ = GJYLlist.length;
		
		for(var i=0;i<length_;i++){
			if(PRO_DETAILS==GJYLlist[i].data.PRO_DETAILS){
				WL.Toast.show("项目内容不能重复填写"); 
	    		return;
			}	
		}
		
	    var newData={PRO_DETAILS:PRO_DETAILS,LEAVE_REASON:LEAVE_REASON};
	    
	    var index=Ext.getCmp('ProhidddenListIndex').getValue();
	    //当不经过index选取，保存后直接点击修改时
	    if(index==""||index==null||typeof(index)=="undefined"){
	    	WL.Toast.show("请先选择要修改的对象");
	    	return;
	    }else{
	    	GJYLlist.splice(index,1,newData);
	    }
	
	    
	    ProListStore0.setData(GJYLlist);
	    Ext.getCmp('ProhidddenListIndex').setValue('');
	},
	//删除
	ProList : function(obj, index, target, record, e, eOpts ){
		var ProListStore0 = obj.getStore("ProListStore0","HelcPDA.store.install.installcheck.ProListStore0");
		var GJYLlist = ProListStore0.data.items;
		if(event.target.id=="1"){
			navigator.notification.confirm('删除信息？',function(btn){
	 			if(btn ==2){
	 				ProListStore0.removeAt(index);
					GJYLlist.splice(index, 1);
	 			}else{
	 				return;
	 			}
	 		},"提示","取消,确定");
			
		}else{
	         Ext.getCmp('PRO_DETAILS').setValue(ProListStore0.getAt(index).get('PRO_DETAILS'));
	         Ext.getCmp('LEAVE_REASON').setValue(ProListStore0.getAt(index).get('LEAVE_REASON'));
	         Ext.getCmp('ProhidddenListIndex').setValue(index);
		}
	},
	
	//添加
	Add_GJ :function(){
		var obj = this;
		var ProListStore0 = obj.getStore("ProListStore0","HelcPDA.store.install.installcheck.ProListStore0");
		var new_PRO_DETAILS = Ext.getCmp('PRO_DETAILS').getValue();
		var new_LEAVE_REASON = Ext.getCmp('LEAVE_REASON').getValue();
		if(Ext.getCmp('PRO_DETAILS').getValue()==""||Ext.getCmp('PRO_DETAILS').getValue()==null){
			WL.Toast.show('项目内容不能为空'); 
		}else{
			if(Ext.getCmp('LEAVE_REASON').getValue()==""||Ext.getCmp('LEAVE_REASON').getValue()==null){
				WL.Toast.show('遗留原因不能为空'); 
			}
		}
		var new_data =[];
		var GJYLlist = ProListStore0.data.items;
		var length_ = GJYLlist.length;
		for(var i=0;i<length_;i++){
    		var newdata_item = {};
    		var PRO_DETAILS = GJYLlist[i].data.PRO_DETAILS;
	    	var LEAVE_REASON=GJYLlist[i].data.LEAVE_REASON;
	    	
	    	if(new_PRO_DETAILS == GJYLlist[i].data.PRO_DETAILS){
	    		WL.Toast.show("项目内容不能重复填写"); 
	    		return;
	    	}else{
	    		newdata_item.PRO_DETAILS = PRO_DETAILS; 
	    		newdata_item.LEAVE_REASON = LEAVE_REASON; 
	    		new_data[i]=newdata_item;
	    	}
    	}
    	if(new_PRO_DETAILS!=""&&new_LEAVE_REASON!=""){
    		new_data[length_] ={PRO_DETAILS:new_PRO_DETAILS,LEAVE_REASON:new_LEAVE_REASON};
    		GJYLlist = new_data; 
        	
        	ProListStore0.setData(GJYLlist);
    	}
	},
	
	
	//保存
	Save_TaskFactory : function(){
		var obj_this = this;
		var WL_check=WL.JSONStore.get(collectionName);
		//基本信息
		var ENGCONTRACT_NUMBER = Ext.getCmp('ENGCONTRACT_NUMBER').getValue();
		var ELEVATOR_NO = Ext.getCmp('ELEVATOR_NO').getValue();
		var SEQ_NUM = Ext.getCmp('SEQ_NUM').getValue();
		var query={tid:ELEVATOR_NO+SEQ_NUM,tcode:ebs_user_id+'_check'};
		WL_check.find(query).then(function(res){
			var data = res[0].json.stext;
			//初检输入项
//			data.CHECK_ARRIVE_DATE = Ext.Date.format(Ext.getCmp('CHECK_ARRIVE_DATE').getValue(),'Y-m-d');
			data.CHECK_ARRIVE_DATE = Ext.getCmp('CHECK_ARRIVE_DATE').getValue();
			data.SETUP_UNIT_SIGN_NAME = Ext.getCmp('SETUP_UNIT_SIGN_NAME').getValue();
			data.CHEK_MAN_SIGN = Ext.getCmp('CHEK_MAN_SIGN').getValue();
			data.INSTALL_CHECK_END_DATE = Ext.getCmp('INSTALL_CHECK_END_DATE').getValue();
			
			//复检输入项
			data.RECHECK_START_DATE = Ext.getCmp('RECHECK_START_DATE').getValue();
			data.SETUP_UNIT_SIGN1_NAME = Ext.getCmp('SETUP_UNIT_SIGN1_NAME').getValue();
			data.CHEK_MAN_SIGN1 = Ext.getCmp('CHEK_MAN_SIGN1').getValue();
			data.RECHECK_FINISH_DATE = Ext.getCmp('RECHECK_FINISH_DATE').getValue();
			
			//验收输入项
			data.CHECK_DATE = Ext.getCmp('CHECK_DATE').getValue();
			data.REPORT_DATE = Ext.getCmp('REPORT_DATE').getValue();
			data.AHEAD_REPORT_DATE = Ext.getCmp('AHEAD_REPORT_DATE').getValue();
			data.RE_CHECK_DATE = Ext.getCmp('RE_CHECK_DATE').getValue();
			data.BAD_DELIVERY_DATE = Ext.getCmp('BAD_DELIVERY_DATE').getValue();
			data.SERVICE_NUM = Ext.getCmp('SERVICE_NUM').getValue();
			data.CHECK_COMMENTS = Ext.getCmp('CHECK_COMMENTS').getValue();
			data.CHECK_ACCEPT_STATUE = Ext.getCmp('CHECK_ACCEPT_STATUE').getValue();
			
			//退检输入项
			data.CHECK_RETURN_DATE = Ext.getCmp('CHECK_RETURN_DATE').getValue();
			data.CHECK_RETURN_REASON = Ext.getCmp('CHECK_RETURN_REASON').getValue();
			data.CHECK_FORFEIT_AMT = Ext.getCmp('CHECK_FORFEIT_AMT').getValue();
			data.CHECK_FORFEIT_DATE = Ext.getCmp('CHECK_FORFEIT_DATE').getValue();
			
			//初检退检审批
			data.AGREE_CHECK_ROLLBACK = Ext.getCmp('AGREE_CHECK_ROLLBACK').getValue();
			data.CHECK_PRINCIPAL_SIGN_TXT = Ext.getCmp('CHECK_PRINCIPAL_SIGN_TXT').getValue();
			data.CHECK_PRINCIPAL_SIGN_DATE = Ext.getCmp('CHECK_PRINCIPAL_SIGN_DATE').getValue();
			
			//复检退检审批
			data.AGREE_RECHECK_BACKCHECK = Ext.getCmp('AGREE_RECHECK_BACKCHECK').getValue();
			data.CHECKOUT_PRINCIPAL_SIGN_NAME = Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_NAME').getValue();
			data.CHECKOUT_PRINCIPAL_SIGN_DATE = Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_DATE').getValue();

			//工程输入项
			data.PROJECT_PRINCIPAL_SIGN_NAME = Ext.getCmp('PROJECT_PRINCIPAL_SIGN_NAME').getValue();
			data.PROJECT_PRINCIPAL_SIGN_DATE = Ext.getCmp('PROJECT_PRINCIPAL_SIGN_DATE').getValue();
			
			//跟进遗留
			
			
			
			res[0].json.stext = data;
			
			var options = {};
			WL.JSONStore.get(collectionName).refresh(res[0],options).then(function(){
				WL.Toast.show("保存成功");
				//刷新工号列表
				var WL_check=WL.JSONStore.get(collectionName);
				var query={tcode:ebs_user_id+"_check",tid:ENGCONTRACT_NUMBER};
				var options={
			    		   exact:false,
			       }; 
				WL_check.find(query,options).then(function(res){
					var data =[];
					for(var i=0;i<res.length;i++){
						data[i]=res[i].json.stext;
					}
					var FactoryStore = obj_this.getStore("TasksFactoryStore","HelcPDA.store.install.installcheck.TasksFactoryStore");
					var softdatas = obj_this.GHsoft(data);
					FactoryStore.setData(softdatas);
					myLoading.hide();
				});
				obj_this.showBackView('installatoinTasksFactoryPanel1','HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel1');
			}).fail(function(){
		    	   Ext.Msg.alert('刷新失败');
		       }); 
		});
		  
	},
	
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
	//监理员签名
	btn_CHEK_SUPERVISOR_SIGN1 : function(){
		navigator.notification.confirm('确定签名？',function(btn){
 			if(btn ==2){
 				Ext.getCmp('CHEK_SUPERVISOR_SIGN1').setValue(usernames);
				Ext.getCmp('SUPERVISOR_SIGN1').setValue(ebs_user_id);
 			}else{
 				Ext.getCmp('CHEK_SUPERVISOR_SIGN1').setValue("");
				Ext.getCmp('SUPERVISOR_SIGN1').setValue(ebs_user_id);
 			}
 		},"提示","取消,确定");
//		Ext.Msg.confirm('你好','确定签名吗？',function(btn){
//			if (btn == 'yes'){
//				Ext.getCmp('CHEK_SUPERVISOR_SIGN1').setValue(usernames);
//				Ext.getCmp('SUPERVISOR_SIGN1').setValue(ebs_user_id);
//			}else{
//				Ext.getCmp('CHEK_SUPERVISOR_SIGN1').setValue("");
//				Ext.getCmp('SUPERVISOR_SIGN1').setValue(ebs_user_id);
//			}
//		});
	},
	
	//初检检察员签名
	btn_CHEK_MAN_SIGN : function(){
		navigator.notification.confirm('确定签名？',function(btn){
 			if(btn ==2){
 				Ext.getCmp('CHEK_MAN_SIGN').setValue(usernames);
				Ext.getCmp('CHECK_MAN_SIGN').setValue(ebs_user_id);
 			}else{
 				Ext.getCmp('CHEK_MAN_SIGN').setValue("");
				Ext.getCmp('CHECK_MAN_SIGN').setValue("");
 			}
 		},"提示","取消,确定");
//		Ext.Msg.confirm('你好','确定签名吗？',function(btn){
//			if (btn == 'yes'){
//				Ext.getCmp('CHEK_MAN_SIGN').setValue(usernames);
//				Ext.getCmp('CHECK_MAN_SIGN').setValue(ebs_user_id);
//			}else{
//				Ext.getCmp('CHEK_MAN_SIGN').setValue("");
//				Ext.getCmp('CHECK_MAN_SIGN').setValue("");
//			}
//		});
		
	},
	
//复检检察员签名
	btn_CHEK_MAN_SIGN1 : function(){
		navigator.notification.confirm('确定签名？',function(btn){
 			if(btn ==2){
 				Ext.getCmp('CHEK_MAN_SIGN1').setValue(usernames);
				Ext.getCmp('CHECK_MAN_SIGN1').setValue(ebs_user_id);
 			}else{
 				Ext.getCmp('CHEK_MAN_SIGN1').setValue("");
				Ext.getCmp('CHECK_MAN_SIGN1').setValue(ebs_user_id);
 			}
 		},"提示","取消,确定");
//		Ext.Msg.confirm('你好','确定签名吗？',function(btn){
//			if (btn == 'yes'){
//				Ext.getCmp('CHEK_MAN_SIGN1').setValue(usernames);
//				Ext.getCmp('CHECK_MAN_SIGN1').setValue(ebs_user_id);
//			}else{
//				Ext.getCmp('CHEK_MAN_SIGN1').setValue("");
//				Ext.getCmp('CHECK_MAN_SIGN1').setValue(ebs_user_id);
//			}
//		});
	},
	
	//返回
	back_TasksFactory : function(){
		var obj = this;
//		navigator.notification.confirm('是否保存数据?',function(btn){
//			if (btn == 2){
//				obj.Save_TaskFactory();
//				obj.showBackView("installatoinTasksFactoryPanel1","HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel1");
//			}else{
//				obj.showBackView("installatoinTasksFactoryPanel1","HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel1");
//			}
// 		},"消息","取消,确定");
		
		Ext.Msg.confirm('消息','是否保存数据?',function(btn){
			if (btn == 'yes'){
				obj.Save_TaskFactory();
				obj.showBackView("installatoinTasksFactoryPanel1","HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel1");
			}else{
				obj.showBackView("installatoinTasksFactoryPanel1","HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel1");
			}
		});
	 },
	
	//点击列表进入厂检信息页面
	TasksList : function(obj,index,target,record,e,eOpts){
		var obj = this;
		var ProListStore1 = obj.getStore("ProListStore1","HelcPDA.store.install.installcheck.ProListStore1");
		var ProListStore2 = obj.getStore("ProListStore2","HelcPDA.store.install.installcheck.ProListStore2");
		ProListStore1.setData();
		ProListStore2.setData();
		
		myLoading.show();
		obj.NextView('installatoinTasksFactoryInfoPanel','HelcPDA.view.install.installcheck.InstallatoinTasksFactoryInfoPanel');
		myLoading.hide();
		//左右滑动页签
		var ITF_tab = Ext.getCmp('ITF_tab'); 
		//左右滑动页签
		var i =0;
		Ext.get('ITF_tab').on('swipe',function(e,t){
			
			if (e.direction === 'left' && e.distance >= 20) {
				ITF_tab.setActiveItem(ITF_tab.innerItems[i+1]);
				if(i==ITF_tab.innerItems.length-1){
				}else{
					i++;
				}
		    } else if (e.direction === 'right' && e.distance >= 20) {
		    	ITF_tab.setActiveItem(ITF_tab.innerItems[i-1]);
		    	if(i==0){
		    	}else{
		    		i--;
		    	}
		    }
		});
		
		ITF_tab.addListener('activeitemchange',function(obj,value,oldValue,eOpts  ){
			var itemId = value.id;
			if (itemId == 'M_ZY') {
				i=0;
			}else if (itemId == 'backlog_v') {
				i=1;
			}else if (itemId == 'M_XX') {
				i=2;
			}else if (itemId == 'M_CX') {
				i=3;
			}else if (itemId == 'M_GD') {
				i=4;
			}
		},this,{
		});
		myLoading.hide();
		var WL_check=WL.JSONStore.get(collectionName);
		var store = obj.getStore("TasksFactoryStore","HelcPDA.store.install.installcheck.TasksFactoryStore");
		var ELEVATOR_NO=store.getAt(index).get('ELEVATOR_NO');
		var SEQ_NUM=store.getAt(index).get('SEQ_NUM');
		var check_TASK_PROCESS_ID = store.getAt(index).get('TASK_PROCESS_ID');
		var check_TASK_ID = store.getAt(index).get('TASK_ID');
		//获取已转派的人员
		var content={USERID:userid,TASK_PROCESS_ID:check_TASK_PROCESS_ID,TASK_ID:check_TASK_ID,SEQ_NUM:SEQ_NUM};
		var getResult_zp=function(res_zp){
			var ProListStore1 = obj.getStore("ProListStore1","HelcPDA.store.install.installcheck.ProListStore1");
			ProListStore1.setData([]);
			var datas = res_zp.rows2;
			ProListStore1.setData(datas);
			//获取业务归属人员
			var content_ywgs={TASK_PROCESS_ID:check_TASK_PROCESS_ID};
			var getResult_ywgs=function(res_ywgs){
				var ProListStore2 = obj.getStore("ProListStore2","HelcPDA.store.install.installcheck.ProListStore2");
				ProListStore2.setData([]);
				var data = res_ywgs.rows2;
				ProListStore2.setData(data);
				//获取安装跟进遗留项目描述
				var content_azylxm={TASK_PROCESS_ID:check_TASK_PROCESS_ID};
				var getResult_azylxm=function(res_azylxm){
					if(typeof(res_azylxm.rows[0].PRO_DETAILS)=="undefined"){
						var ProListStore0 = obj.getStore("ProListStore0","HelcPDA.store.install.installcheck.ProListStore0");
						ProListStore0.setData([]);
					}else{
						var ProListStore0 = obj.getStore("ProListStore0","HelcPDA.store.install.installcheck.ProListStore0");
						ProListStore0.setData([]);
						var GJYLdata = res_azylxm.rows;
						ProListStore0.setData(GJYLdata);
					}
					
				};
				obj.connectServer(getResult_azylxm, 'changjian2Action.do?method=search_azylxm',JSON.stringify(content_azylxm));
			};
			obj.connectServer(getResult_ywgs, 'changjian2Action.do?method=Search_ywgs',JSON.stringify(content_ywgs));
			
		};
		this.connectServer(getResult_zp, 'changjian2Action.do?method=Search_zp',JSON.stringify(content));
		
		//查看信息页面
		var query={tcode:ebs_user_id+"_check",tid:ELEVATOR_NO+SEQ_NUM};
		var options={
	    		   exact:false
	       }; 
		WL_check.find(query,options).then(function(res){
			var str = res[0].json.stext;
			Ext.getCmp('TASK_ID').setValue(str.TASK_ID);
			Ext.getCmp('TASK_PROCESS_ID').setValue(str.TASK_PROCESS_ID);
			Ext.getCmp('ORG_ID').setValue(str.ORG_ID);
			Ext.getCmp('CHECK_NUM').setValue(str.CHECK_NUM);

			Ext.getCmp('ENGCONTRACT_NUMBER').setValue(str.ENGCONTRACT_NUMBER);
			Ext.getCmp('ELEVATOR_NO').setValue(str.ELEVATOR_NO);
			Ext.getCmp('CUSTOMER_NAME').setValue(str.CUSTOMER_NAME);
			Ext.getCmp('INSTALL_ADDRESS').setValue(str.INSTALL_ADDRESS);
			Ext.getCmp('PRODUCE_TYPE').setValue(str.PRODUCE_TYPE);
			
			Ext.getCmp('SEQ_NUM').setValue(str.SEQ_NUM);
			Ext.getCmp('EQUIPMENT_NO').setValue(str.EQUIPMENT_NO);
			Ext.getCmp('CM_ELEVATOR_TYPE_NAME').setValue(str.CM_ELEVATOR_TYPE_NAME);
			Ext.getCmp('ELEVATOR_CLASS_NAME').setValue(str.ELEVATOR_CLASS_NAME);
			Ext.getCmp('NST_VENDOR_NAME').setValue(str.NST_VENDOR_NAME);
			Ext.getCmp('LIFT_VENDOR_NAME').setValue(str.LIFT_VENDOR_NAME);
			Ext.getCmp('BUILD_VENDOR_NAME').setValue(str.BUILD_VENDOR_NAME);
			Ext.getCmp('BUDGET_INSTALL_METHOD').setValue(str.BUDGET_INSTALL_METHOD);
			
			Ext.getCmp('PARAM_C_Z_M').setValue(str.PARAM_C_Z_M);
			Ext.getCmp('ZZ').setValue(str.ZZ);
			Ext.getCmp('SD').setValue(str.SD);
			Ext.getCmp('TSGD').setValue(str.TSGD);
			Ext.getCmp('JDZG').setValue(str.JDZG);
			Ext.getCmp('GET_CHECK_DATE').setValue(str.GET_CHECK_DATE);
			Ext.getCmp('PLAN_CHECK_DATE').setValue(str.PLAN_CHECK_DATE);
			
			Ext.getCmp('JL_NAME').setValue(str.JL_NAME);
			Ext.getCmp('CHECK_NAME').setValue(str.CHECK_NAME);
			Ext.getCmp('INST_PERSON_NAME').setValue(str.INST_PERSON_NAME);
			Ext.getCmp('INSTALL_HEADER').setValue(str.INSTALL_HEADER);
			Ext.getCmp('TEL').setValue(str.TEL);
			Ext.getCmp('PLAN_CHECK_FINISH_DATE').setValue(str.PLAN_CHECK_FINISH_DATE);
			Ext.getCmp('CHECK_STATUS').setValue(str.CHECK_STATUS);
			Ext.getCmp('CHECK_APPROVED_BY').setValue(str.CHECK_APPROVED_BY);
			Ext.getCmp('CHECK_APPROVAL_DATE').setValue(str.CHECK_APPROVAL_DATE);
			Ext.getCmp('CHECK_APPROVAL_NOTE').setValue(str.CHECK_APPROVAL_NOTE);
			Ext.getCmp('NO_HETONG').setValue(str.NO_HETONG);
			Ext.getCmp('NO_GONGHAO').setValue(str.NO_GONGHAO);
			Ext.getCmp('NO_PICI').setValue(str.NO_PICI);
			Ext.getCmp('NO_CIDI').setValue(str.NO_CIDI);
			Ext.getCmp('BALANCE_INDEX').setValue(str.BALANCE_INDEX);
			Ext.getCmp('COUNTER_WEIGHT').setValue(str.COUNTER_WEIGHT);
			
			Ext.getCmp('DYDL_UP_0').setValue(str.DYDL_UP_0);
			Ext.getCmp('DYDL_UP_30').setValue(str.DYDL_UP_30);
			Ext.getCmp('DYDL_UP_40').setValue(str.DYDL_UP_40);
			Ext.getCmp('DYDL_UP_45').setValue(str.DYDL_UP_45);
			Ext.getCmp('DYDL_UP_50').setValue(str.DYDL_UP_50);
			Ext.getCmp('DYDL_UP_60').setValue(str.DYDL_UP_60);
			Ext.getCmp('DYDL_UP_100').setValue(str.DYDL_UP_100);
			Ext.getCmp('DYDL_UP_110').setValue(str.DYDL_UP_110);
			Ext.getCmp('DYDL_DOWN_0').setValue(str.DYDL_DOWN_0);
			Ext.getCmp('DYDL_DOWN_30').setValue(str.DYDL_DOWN_30);
			Ext.getCmp('DYDL_DOWN_40').setValue(str.DYDL_DOWN_40);
			Ext.getCmp('DYDL_DOWN_45').setValue(str.DYDL_DOWN_45);
			Ext.getCmp('DYDL_DOWN_50').setValue(str.DYDL_DOWN_50);
			Ext.getCmp('DYDL_DOWN_60').setValue(str.DYDL_DOWN_60);
			Ext.getCmp('DYDL_DOWN_100').setValue(str.DYDL_DOWN_100);
			Ext.getCmp('DYDL_DOWN_110').setValue(str.DYDL_DOWN_110);
			
			Ext.getCmp('DJDL_UP_0').setValue(str.DJDL_UP_0);
			Ext.getCmp('DJDL_UP_30').setValue(str.DJDL_UP_30);
			Ext.getCmp('DJDL_UP_40').setValue(str.DJDL_UP_40);
			Ext.getCmp('DJDL_UP_45').setValue(str.DJDL_UP_45);
			Ext.getCmp('DJDL_UP_50').setValue(str.DJDL_UP_50);
			Ext.getCmp('DJDL_UP_60').setValue(str.DJDL_UP_60);
			Ext.getCmp('DJDL_UP_100').setValue(str.DJDL_UP_100);
			Ext.getCmp('DJDL_UP_110').setValue(str.DJDL_UP_110);
			Ext.getCmp('DJDL_DOWN_0').setValue(str.DJDL_DOWN_0);
			Ext.getCmp('DJDL_DOWN_30').setValue(str.DJDL_DOWN_30);
			Ext.getCmp('DJDL_DOWN_40').setValue(str.DJDL_DOWN_40);
			Ext.getCmp('DJDL_DOWN_45').setValue(str.DJDL_DOWN_45);
			Ext.getCmp('DJDL_DOWN_50').setValue(str.DJDL_DOWN_50);
			Ext.getCmp('DJDL_DOWN_60').setValue(str.DJDL_DOWN_60);
			Ext.getCmp('DJDL_DOWN_100').setValue(str.DJDL_DOWN_100);
			Ext.getCmp('DJDL_DOWN_110').setValue(str.DJDL_DOWN_110);
			
			Ext.getCmp('PCSJ_UP_0').setValue(str.PCSJ_UP_0);
			Ext.getCmp('PCSJ_UP_30').setValue(str.PCSJ_UP_30);
			Ext.getCmp('PCSJ_UP_40').setValue(str.PCSJ_UP_40);
			Ext.getCmp('PCSJ_UP_45').setValue(str.PCSJ_UP_45);
			Ext.getCmp('PCSJ_UP_50').setValue(str.PCSJ_UP_50);
			Ext.getCmp('PCSJ_UP_60').setValue(str.PCSJ_UP_60);
			Ext.getCmp('PCSJ_UP_100').setValue(str.PCSJ_UP_100);
			Ext.getCmp('PCSJ_UP_110').setValue(str.PCSJ_UP_110);
			Ext.getCmp('PCSJ_DOWN_0').setValue(str.PCSJ_DOWN_0);
			Ext.getCmp('PCSJ_DOWN_30').setValue(str.PCSJ_DOWN_30);
			Ext.getCmp('PCSJ_DOWN_40').setValue(str.PCSJ_DOWN_40);
			Ext.getCmp('PCSJ_DOWN_45').setValue(str.PCSJ_DOWN_45);
			Ext.getCmp('PCSJ_DOWN_50').setValue(str.PCSJ_DOWN_50);
			Ext.getCmp('PCSJ_DOWN_60').setValue(str.PCSJ_DOWN_60);
			Ext.getCmp('PCSJ_DOWN_100').setValue(str.PCSJ_DOWN_100);
			Ext.getCmp('PCSJ_DOWN_110').setValue(str.PCSJ_DOWN_110);
			
			Ext.getCmp('DYDY_UP_0').setValue(str.DYDY_UP_0);
			Ext.getCmp('DYDY_UP_30').setValue(str.DYDY_UP_30);
			Ext.getCmp('DYDY_UP_40').setValue(str.DYDY_UP_40);
			Ext.getCmp('DYDY_UP_45').setValue(str.DYDY_UP_45);
			Ext.getCmp('DYDY_UP_50').setValue(str.DYDY_UP_50);
			Ext.getCmp('DYDY_UP_60').setValue(str.DYDY_UP_60);
			Ext.getCmp('DYDY_UP_100').setValue(str.DYDY_UP_100);
			Ext.getCmp('DYDY_UP_110').setValue(str.DYDY_UP_110);
			Ext.getCmp('DYDY_DOWN_0').setValue(str.DYDY_DOWN_0);
			Ext.getCmp('DYDY_DOWN_30').setValue(str.DYDY_DOWN_30);
			Ext.getCmp('DYDY_DOWN_40').setValue(str.DYDY_DOWN_40);
			Ext.getCmp('DYDY_DOWN_45').setValue(str.DYDY_DOWN_45);
			Ext.getCmp('DYDY_DOWN_50').setValue(str.DYDY_DOWN_50);
			Ext.getCmp('DYDY_DOWN_60').setValue(str.DYDY_DOWN_60);
			Ext.getCmp('DYDY_DOWN_100').setValue(str.DYDY_DOWN_100);
			Ext.getCmp('DYDY_DOWN_110').setValue(str.DYDY_DOWN_110);
			
			
			//厂检和退检
//			var WL_check=WL.JSONStore.get(collectionName);
//			var ELEVATOR_NO1 = Ext.getCmp('ELEVATOR_NO').getValue();
//			var query={tid:ELEVATOR_NO1,tcode:ebs_user_id+'_check'};
//			var options={
//					exact:true
//			};
//			WL_check.find(query,options).then(function(res){
//				if(res.length!=0){
//				var str = res[0].json.stext;
				
				if(str.CHECK_ARRIVE_DATE==null || str.CHECK_ARRIVE_DATE== ""){
					Ext.getCmp('CHECK_ARRIVE_DATE').setValue(null);
				}else{
					Ext.getCmp('CHECK_ARRIVE_DATE').setValue(new Date(str.CHECK_ARRIVE_DATE));
				}
				Ext.getCmp('SETUP_UNIT_SIGN_NAME').setValue(str.SETUP_UNIT_SIGN_NAME);
				Ext.getCmp('CHEK_MAN_SIGN').setValue(str.CHEK_MAN_SIGN);
				if(str.INSTALL_CHECK_END_DATE==null || str.INSTALL_CHECK_END_DATE==""){
					Ext.getCmp('INSTALL_CHECK_END_DATE').setValue(null);
				}else{
					Ext.getCmp('INSTALL_CHECK_END_DATE').setValue(new Date(str.INSTALL_CHECK_END_DATE));
				}
				
				if(str.RECHECK_START_DATE==null ||str.RECHECK_START_DATE==""){
					Ext.getCmp('RECHECK_START_DATE').setValue(null);
				}else{
					Ext.getCmp('RECHECK_START_DATE').setValue(new Date(str.RECHECK_START_DATE));
				}
				Ext.getCmp('SETUP_UNIT_SIGN1_NAME').setValue(str.SETUP_UNIT_SIGN1_NAME);
				Ext.getCmp('CHEK_MAN_SIGN1').setValue(str.CHEK_MAN_SIGN1);
				if(str.RECHECK_FINISH_DATE==null ||str.RECHECK_FINISH_DATE==""){
					Ext.getCmp('RECHECK_FINISH_DATE').setValue(null);
				}else{
					Ext.getCmp('RECHECK_FINISH_DATE').setValue(new Date(str.RECHECK_FINISH_DATE));
				}
				
				if(str.CHECK_DATE==null||str.CHECK_DATE==""){
					Ext.getCmp('CHECK_DATE').setValue(null);
				}else{
					Ext.getCmp('CHECK_DATE').setValue(new Date(str.CHECK_DATE));
				}
				if(str.REPORT_DATE==null||str.REPORT_DATE==""){
					Ext.getCmp('REPORT_DATE').setValue(null);
				}else{
					Ext.getCmp('REPORT_DATE').setValue(new Date(str.REPORT_DATE));
				}
				if(str.REPORT_ENTER_DATE==null||str.REPORT_ENTER_DATE==""||str.REPORT_ENTER_DATE=="null"){
					Ext.getCmp('REPORT_ENTER_DATE').setValue(null);
				}else{
					Ext.getCmp('REPORT_ENTER_DATE').setValue(Ext.Date.format(new Date(str.REPORT_ENTER_DATE),'Y-m-d h:m:s'));
				}
				if(str.AHEAD_REPORT_DATE==null||str.AHEAD_REPORT_DATE==""){
					Ext.getCmp('AHEAD_REPORT_DATE').setValue(null);
				}else{
					Ext.getCmp('AHEAD_REPORT_DATE').setValue(new Date(str.AHEAD_REPORT_DATE));
				}
				if(str.RE_CHECK_DATE==null||str.RE_CHECK_DATE==""){
					Ext.getCmp('RE_CHECK_DATE').setValue(null);
				}else{
					Ext.getCmp('RE_CHECK_DATE').setValue(new Date(str.RE_CHECK_DATE));
				}
				if(str.BAD_DELIVERY_DATE==null||str.BAD_DELIVERY_DATE==""){
					Ext.getCmp('BAD_DELIVERY_DATE').setValue(null);
				}else{
					Ext.getCmp('BAD_DELIVERY_DATE').setValue(new Date(str.BAD_DELIVERY_DATE));
				}
				
				Ext.getCmp('SERVICE_NUM').setValue(str.SERVICE_NUM);
				Ext.getCmp('CHECK_COMMENTS').setValue(str.CHECK_COMMENTS);
				Ext.getCmp('CHECK_ACCEPT_STATUE').setValue(str.CHECK_ACCEPT_STATUE);
				
				if(str.CHECK_RETURN_DATE==null||str.CHECK_RETURN_DATE==""){
					Ext.getCmp('CHECK_RETURN_DATE').setValue(null);
				}else{
					Ext.getCmp('CHECK_RETURN_DATE').setValue(new Date(str.CHECK_RETURN_DATE));
				}
				Ext.getCmp('CHECK_RETURN_REASON').setValue(str.CHECK_RETURN_REASON);
				Ext.getCmp('CHECK_FORFEIT_AMT').setValue(str.CHECK_FORFEIT_AMT);
				if(str.CHECK_FORFEIT_DATE==null||str.CHECK_FORFEIT_DATE==""){
					Ext.getCmp('CHECK_FORFEIT_DATE').setValue(null);
				}else{
					Ext.getCmp('CHECK_FORFEIT_DATE').setValue(new Date(str.CHECK_FORFEIT_DATE));
				}
				
				Ext.getCmp('AGREE_CHECK_ROLLBACK').setValue(str.AGREE_CHECK_ROLLBACK);
				Ext.getCmp('CHECK_PRINCIPAL_SIGN_TXT').setValue(str.CHECK_PRINCIPAL_SIGN_TXT);
				if(str.CHECK_PRINCIPAL_SIGN_DATE==null||str.CHECK_PRINCIPAL_SIGN_DATE==""){
					Ext.getCmp('CHECK_PRINCIPAL_SIGN_DATE').setValue(null);
				}else{
					Ext.getCmp('CHECK_PRINCIPAL_SIGN_DATE').setValue(new Date(str.CHECK_PRINCIPAL_SIGN_DATE));
				}
				
				Ext.getCmp('AGREE_RECHECK_BACKCHECK').setValue(str.AGREE_RECHECK_BACKCHECK);
				Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_NAME').setValue(str.CHECKOUT_PRINCIPAL_SIGN_NAME);
				if(str.CHECKOUT_PRINCIPAL_SIGN_DATE==null||str.CHECKOUT_PRINCIPAL_SIGN_DATE==""){
					Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_DATE').setValue(null);
				}else{
					Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_DATE').setValue(new Date(str.CHECKOUT_PRINCIPAL_SIGN_DATE));
				}
				
				Ext.getCmp('PROJECT_PRINCIPAL_SIGN_NAME').setValue(str.PROJECT_PRINCIPAL_SIGN_NAME);
				if(str.PROJECT_PRINCIPAL_SIGN_DATE==null||str.PROJECT_PRINCIPAL_SIGN_DATE==""){
					Ext.getCmp('PROJECT_PRINCIPAL_SIGN_DATE').setValue(null);
				}else{
					Ext.getCmp('PROJECT_PRINCIPAL_SIGN_DATE').setValue(new Date(str.PROJECT_PRINCIPAL_SIGN_DATE));
				}
				
//				};
//			});
			
			
			//提前签写报告日期
			if(str.AHEAD_REPORT_DATE == null||str.AHEAD_REPORT_DATE ==""||typeof(str.AHEAD_REPORT_DATE) =="undefined"){
				Ext.getCmp('AHEAD_REPORT_DATE').setValue(null);
			}else{
				Ext.getCmp('AHEAD_REPORT_DATE').setValue(new Date(str.AHEAD_REPORT_DATE));
			}
			//售后服务号
			Ext.getCmp('SERVICE_NUM').setValue(str.SERVICE_NUM);
			//验收时间
//			var checkdate=Ext.getCmp('CHECK_DATE');
//				checkdate.addListener('change',checkdate1,this,{
//			});
			if(str.CHECK_DATE == null||str.CHECK_DATE ==""||typeof(str.CHECK_DATE) =="undefined"){
				Ext.getCmp('CHECK_DATE').setValue(null);
			}else{
				Ext.getCmp('CHECK_DATE').setValue(new Date(str.CHECK_DATE));
			}
			
			
			//如果不是监理人员
			if(init_person_id == null||init_person_id ==""||typeof(init_person_id) =="undefined"){
				
				
			
			
			
			//厂检
			//判断是初检还是复检
			if(Ext.getCmp('RECHECK_START_DATE').getValue()==null || Ext.getCmp('RECHECK_START_DATE').getValue()==""){
				//初检
				if(str.CHECK_ARRIVE_DATE == null||str.CHECK_ARRIVE_DATE ==""||typeof(str.CHECK_ARRIVE_DATE) =="undefined"){
					Ext.getCmp('CHECK_ARRIVE_DATE').setValue(null);
				}else{
					Ext.getCmp('CHECK_ARRIVE_DATE').setValue(new Date(str.CHECK_ARRIVE_DATE));
				}
				
				var checkdate=Ext.getCmp('CHECK_ARRIVE_DATE');
					checkdate.addListener('change',obj.checkdate1,this,{
			  	   });
				
				//判断验收到达日期
				if(Ext.getCmp('CHECK_ARRIVE_DATE').getValue()==null){
					Ext.getCmp('SETUP_UNIT_SIGN_NAME').setDisabled(true);
					Ext.getCmp('CHEK_MAN_SIGN').setDisabled(true);
					Ext.getCmp('btn_CHEK_MAN_SIGN').setDisabled(true);
				}else{
					Ext.getCmp('SETUP_UNIT_SIGN_NAME').setDisabled(false);
					Ext.getCmp('CHEK_MAN_SIGN').setDisabled(false);
					Ext.getCmp('btn_CHEK_MAN_SIGN').setDisabled(false);
				}
				
				var setupunitsignname=Ext.getCmp('SETUP_UNIT_SIGN_NAME');
					setupunitsignname.addListener('change',obj.setupunitsignname1,this,{
					});
				var checkmansign=Ext.getCmp('CHEK_MAN_SIGN');
					checkmansign.addListener('change',obj.checkmansign1,this,{
					});
				//判断初检签名
				if(Ext.getCmp('SETUP_UNIT_SIGN_NAME').getValue() == "" && Ext.getCmp('CHEK_MAN_SIGN').getValue() == ""){
					Ext.getCmp('INSTALL_CHECK_END_DATE').setDisabled(true);
				}else{
					Ext.getCmp('INSTALL_CHECK_END_DATE').setDisabled(false);
				}
				
				//设置复检不可输入
				Ext.getCmp('RECHECK_START_DATE').setDisabled(true);
				Ext.getCmp('SETUP_UNIT_SIGN1_NAME').setDisabled(true);
				Ext.getCmp('CHEK_MAN_SIGN1').setDisabled(true);
				Ext.getCmp('btn_CHEK_MAN_SIGN1').setDisabled(true);
				Ext.getCmp('RECHECK_FINISH_DATE').setDisabled(true);  
				
				//报告签写日期不可输入
//				Ext.getCmp('REPORT_DATE').setDisabled(true); 
//				Ext.getCmp('REPORT_ENTER_DATE').setValue(null);
				
				//复检开始时间
				//判断复检签名
				//当初检完成时间设置，再次进入时，设置复检开始开始时间可填
				if(Ext.getCmp('INSTALL_CHECK_END_DATE').getValue == null){
					Ext.getCmp('RECHECK_START_DATE').setDisabled(true);
				}else{
					Ext.getCmp('RECHECK_START_DATE').setDisabled(false);
				}
				var installcheckenddate=Ext.getCmp('INSTALL_CHECK_END_DATE');
					installcheckenddate.addListener('change',obj.installcheckenddate1,this,{
					});
//				var installcheckenddate1=Ext.getCmp('INSTALL_CHECK_END_DATE');
//					installcheckenddate1.addListener('disabledchange',installcheckenddate11,this,{
//					});
				var recheckstartdate=Ext.getCmp('RECHECK_START_DATE');
					recheckstartdate.addListener('change',obj.recheckstartdate1,this,{
				});
				
				if(Ext.getCmp('RECHECK_START_DATE').getValue()==null){
					Ext.getCmp('SETUP_UNIT_SIGN1_NAME').setDisabled(true);
					Ext.getCmp('CHEK_MAN_SIGN1').setDisabled(true);
				}else{
					Ext.getCmp('SETUP_UNIT_SIGN1_NAME').setDisabled(false);
					Ext.getCmp('CHEK_MAN_SIGN1').setDisabled(false);
				}
				
				var setupunitsign1name=Ext.getCmp('SETUP_UNIT_SIGN1_NAME');
					setupunitsign1name.addListener('change',obj.setupunitsign1name1,this,{
				});
				var chekmansign1=Ext.getCmp('CHEK_MAN_SIGN1');
					chekmansign1.addListener('change',obj.chekmansign11,this,{
				});
				//判断复检完成时间
				if(Ext.getCmp('SETUP_UNIT_SIGN1_NAME').getValue() == "" && Ext.getCmp('CHEK_MAN_SIGN1').getValue() == ""){
					Ext.getCmp('RECHECK_FINISH_DATE').setDisabled(true);
				}else{
					Ext.getCmp('RECHECK_FINISH_DATE').setDisabled(false);
				}
				
				var recheckfinishdate=Ext.getCmp('RECHECK_FINISH_DATE');
					recheckfinishdate.addListener('change',obj.recheckfinishdate1,this,{
				});
				
				var checkacceptstatue=Ext.getCmp('CHECK_ACCEPT_STATUE');
					checkacceptstatue.addListener('change',obj.checkacceptstatue1,this,{
				});
				var REPORT_DATE=Ext.getCmp('REPORT_DATE');
					REPORT_DATE.addListener('change',obj.REPORT_DATE1,this,{
				});
			}else{
				//报告签写日期不可输入
				Ext.getCmp('REPORT_DATE').setDisabled(false);
				var REPORT_DATE=Ext.getCmp('REPORT_DATE');
					REPORT_DATE.addListener('change',obj.REPORT_DATE1,this,{
				});
				//复检,设置初检不可输
				Ext.getCmp('CHECK_ARRIVE_DATE').setDisabled(true);
				Ext.getCmp('SETUP_UNIT_SIGN_NAME').setDisabled(true);
				Ext.getCmp('CHEK_MAN_SIGN').setDisabled(true);
				Ext.getCmp('INSTALL_CHECK_END_DATE').setDisabled(true);
				//复检开始时间
				//判断复检签名
				var installcheckenddate=Ext.getCmp('INSTALL_CHECK_END_DATE');
					installcheckenddate.addListener('change',obj.installcheckenddate1,this,{
					});
				var recheckstartdate=Ext.getCmp('RECHECK_START_DATE');
					recheckstartdate.addListener('change',obj.recheckstartdate1,this,{
				});
				
				if(Ext.getCmp('RECHECK_START_DATE').getValue()==null){
					Ext.getCmp('SETUP_UNIT_SIGN1_NAME').setDisabled(true);
					Ext.getCmp('CHEK_MAN_SIGN1').setDisabled(true);
				}else{
					Ext.getCmp('SETUP_UNIT_SIGN1_NAME').setDisabled(false);
					Ext.getCmp('CHEK_MAN_SIGN1').setDisabled(false);
				}
				
				var setupunitsign1name=Ext.getCmp('SETUP_UNIT_SIGN1_NAME');
					setupunitsign1name.addListener('change',obj.setupunitsign1name1,this,{
				});
				var chekmansign1=Ext.getCmp('CHEK_MAN_SIGN1');
					chekmansign1.addListener('change',obj.chekmansign11,this,{
				});
				//判断复检完成时间
				if(Ext.getCmp('SETUP_UNIT_SIGN1_NAME').getValue() == "" && Ext.getCmp('CHEK_MAN_SIGN1').getValue() == ""){
					Ext.getCmp('RECHECK_FINISH_DATE').setDisabled(true);
				}else{
					Ext.getCmp('RECHECK_FINISH_DATE').setDisabled(false);
				}
				
				var recheckfinishdate=Ext.getCmp('RECHECK_FINISH_DATE');
					recheckfinishdate.addListener('change',obj.recheckfinishdate1,this,{
				});
				
//				var checkacceptstatue=Ext.getCmp('CHECK_ACCEPT_STATUE');
//					checkacceptstatue.addListener('change',obj.checkacceptstatue1,this,{
//				});
				
			}
			
		//退检
			//当填写初检完成保存再次进入时，设置初检退检项可填
			if(Ext.getCmp('INSTALL_CHECK_END_DATE').getValue()!=null && Ext.getCmp('RECHECK_START_DATE').getValue()==null){
				Ext.getCmp('AGREE_CHECK_ROLLBACK').setDisabled(false);         //同意初检退检 
				Ext.getCmp('CHECK_PRINCIPAL_SIGN_TXT').setDisabled(false);     //初检检验负责人签名
				Ext.getCmp('CHECK_PRINCIPAL_SIGN_DATE').setDisabled(false);    //检检验负责人签名日期
			}else{
				Ext.getCmp('AGREE_CHECK_ROLLBACK').setDisabled(true);     //同意初检退检
				Ext.getCmp('CHECK_PRINCIPAL_SIGN_TXT').setDisabled(true); //初检检验负责人签名
				Ext.getCmp('CHECK_PRINCIPAL_SIGN_DATE').setDisabled(true); //初检检验负责人签名日期
			}
			
				
			Ext.getCmp('AGREE_RECHECK_BACKCHECK').setDisabled(true);      //同意复检退检(复检退检审批)
			Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_NAME').setDisabled(true); //检验负责人签名（复检退检审批）
			Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_DATE').setDisabled(true); //检验负责人签名日期（复检退检审批）
			
			Ext.getCmp('PROJECT_PRINCIPAL_SIGN_NAME').setDisabled(true);  //工程负责人签名（复检退检审批）
			Ext.getCmp('PROJECT_PRINCIPAL_SIGN_DATE').setDisabled(true);  //工程负责人签名日期（复检退检审批）	
				
			
			//跟进遗留
			Ext.getCmp('MATERIAL_ADDRESS').setDisabled(true);  //物料存放位置（监理填）	
			Ext.getCmp('AGREE_FOLLOWUP').setDisabled(true);  //同意安装跟进
			Ext.getCmp('CHECKOUT_APPROVE_fieldset').setDisabled(true);  //检验审核人签名     和    检验审核人日期（安装跟进审核）

			Ext.getCmp('WHETER_APPLY_TO_CUSTOMER').setDisabled(true);  //遗留项目需客户配合的内容和要求是否提供给客户
			Ext.getCmp('CUSTOMER_fieldset').setDisabled(true);  //客户	和	计划完成时间

			Ext.getCmp('CHEK_SUPERVISOR_fieldset').setDisabled(true);  //监理签名       和	监理负责人签名
			
			
			}else{
				Ext.getCmp('add_GJ').setDisabled(true);
				Ext.getCmp('PRO_DETAILS').setDisabled(true);
				Ext.getCmp('LEAVE_REASON').setDisabled(true);
				Ext.getCmp('check_formpanel').setDisabled(true);
				Ext.getCmp('return_formpanel').setDisabled(true);
				Ext.getCmp('AGREE_FOLLOWUP').setDisabled(true);
				Ext.getCmp('CHECKOUT_APPROVE_fieldset').setDisabled(true);
			}
		
			
			//如果工号已退检，录入字段不可填，并提示已退检
			if(str.CHECK_DATE != "" && str.CHECK_RETURN_DATE != "" && str.CHECK_RETURN_DATE != "点击文本设置时间" && str.CHECK_RETURN_DATE != null){
				Ext.getCmp('menu_button').setDisabled(true);
				Ext.getCmp('itf_CJ').setDisabled(true);
				Ext.getCmp('itf_TJ').setDisabled(true);
				Ext.getCmp('itf_GJYL').setDisabled(true);
				Ext.getCmp('itf_ZP').setDisabled(true);
				WL.Toast.show("该工号已退检，请通知主管重新派工");
			}
			
		});
	},
	
	// 进入菜单纸
	menu_TaskFactory:function () {
		Ext.Viewport.removeMenu('right');
//		var tCtr = HelcPDA.app.getController('InstallatoinTasksFactoryInfoCtrl');
		var tCtr = this;
		if(Ext.getCmp('CHECK_ARRIVE_DATE').getValue()==null||Ext.getCmp('CHECK_ARRIVE_DATE').getValue()==""){
			WL.Toast.show("请先完成验收到达时间");
			return;
		}
		
		Ext.Msg.show({
			title:'温馨提示',
			message:'请选择菜单类型',
			modal:true,
			hideOnMaskTap: true,
			buttons:[{text:'初检',itemId:'Fcheck'},{text:'复检',itemId:'Dcheck'}],
			fn:function(buttonId){
				var moduleFlag = "CJ";
				var title = '初检';
				if(buttonId == 'Dcheck'){
					moduleFlag = "FJ";// 复检
					title = "复检";
				}
				
				// 获取必要信息
				var TASK_ID = Ext.getCmp('TASK_ID').getValue();
				var TASK_PROCESS_ID = Ext.getCmp('TASK_PROCESS_ID').getValue();
				var SEQ_NUM = Ext.getCmp('SEQ_NUM').getValue();
				var ORG_ID = Ext.getCmp("ORG_ID").getValue();
				var DEBUG_NUM = Ext.getCmp("CHECK_NUM").getValue();
				var SD=Ext.getCmp('SD').getValue();
				var TID = '';
				var ELEVATOR_CLASS_NAME = Ext.getCmp('ELEVATOR_CLASS_NAME').getValue();
				var fileMDate = '';
				var obj = MainCtr;
				obj_cj = this;
				var fileName = 'MENUPAPER';
				
				// 检查直扶梯
				if (ELEVATOR_CLASS_NAME.indexOf("直") != -1) {//判断直梯还是扶梯
		      			fileName += "_ZT";
		      			title += "直梯";
		      			if (SD != '') {
		      				if ((SD/60) < 4) {
								fileName += "4D";
								title += "(V < 4m/s)";
							} else {
								fileName += "4U";
								title += "(V ≥ 4m/s)";
							}
		      			}
		      	} else if (ELEVATOR_CLASS_NAME.indexOf("扶") != -1) {
		      			fileName += "_FT";
		      			title += "扶梯";
		      	} else {
		      			fileName = "MENUPAPER_ZT4U";
		      			title += "直梯";
		      	}
		      	
				
				// 查找文件最后更新日期
				var selection={tcode:'XML_VERSION',tid:fileName};
				var options = {};
				WL.JSONStore.get(collectionName).find(selection,options).then(function(arrayResults){
					if (arrayResults.length > 0) {
						fileMDate = arrayResults[0].json.stext.fileMDate;
					}
					// 检查服务器文件更新
			 		obj.connectServer(handlerResult,"instllMenudPaperAction.do?method=toSearchXML_PDA3","{DATA:{TASK_PROCESS_ID:'"+ TASK_PROCESS_ID +"'},FILENAME:'"+ fileName +"',fileMDate:'"+ fileMDate +"'}");
			 		function handlerResult(result) {
			 			if (!result.isexits) {
			 				WL.Toast.show('暂无此项目！');
			 				return ;
						}
						if (result.filedt != "NOFILE" && arrayResults.length > 0) {
							// 刷新最新的文件版本进JSONSTORE
							var nstext = arrayResults[0].json.stext;
							nstext.fileMDate = result.last_mdate;
							var ndata = {tcode:'XML_VERSION',tid:fileName,stext:nstext};
							var udata = {_id:arrayResults[0]._id, json:ndata};
							WL.JSONStore.get(collectionName).refresh(udata,options).then(function(arrayResults2){
							}).fail(function(errorObject){
								alert(errorObject);
							});
						} else if (result.filedt != "NOFILE") {
							// 保存文件版本进JSONSTORE
									var nstext = {fileMDate:result.last_mdate};
									var ndata = {tcode:'XML_VERSION',tid:fileName,stext:nstext};
									WL.JSONStore.get(collectionName).add(ndata,options).then(function(arrayResults2){
									}).fail(function(errorObject){
										alert(errorObject);
									});					
						}
						// 查询以往填过的菜单
						var selection_find = {tcode:'MENU_PITEM_'+fileName,tid:TASK_ID+'_'+SEQ_NUM};
						options = {};
						WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
								var sdata_id = 'NOT';
								var sdata = [];
								if (arrayResults2.length > 0) {
									sdata_id = ''+arrayResults2[0]._id;
									sdata = arrayResults2[0].json.stext;
								}
								// 判断服务器上的数据是否比本地新
								var itemValue = result.itemValue;
								var DATA_LAST_UPDATE_DATE = result.LAST_UPDATE_DATE;
								if (DATA_LAST_UPDATE_DATE != '' && arrayResults2.length>0) {
									var date_server = new Date(DATA_LAST_UPDATE_DATE.replace("-","/"));
									var date_local = new Date(sdata.LAST_UPDATE_DATE);
									if (date_server > date_local) {
										sdata = result.itemValue;
									}
								} else if (DATA_LAST_UPDATE_DATE != '' && arrayResults2.length<1) {
									sdata = result.itemValue;
								}
								WL.Toast.show('正在进入菜单纸,请稍等...');
								// 进入文件
				 				var param = {SDATA:JSON.stringify(sdata),filedata:result.filedt,filename:fileName,
				 				task_id:TASK_ID,task_process_id:TASK_PROCESS_ID,seq_num:SEQ_NUM,sd:SD,org_id:ORG_ID,
				 				elevator_class_name:ELEVATOR_CLASS_NAME,moduleFlag:moduleFlag,data_id:sdata_id,title:title,
				 				debug_num:DEBUG_NUM,init_person_id:init_person_id,ebs_user_id:ebs_user_id,collectionName:collectionName};
				 				
								WL.NativePage.show('com.gzunicorn.operation.menupaper.InstallPaper', tCtr.handlerActionResult, param);
						}).fail(function(errorObject){
								alert(errorObject);
						});
						
				};
				}).fail(function(errorObject){
					alert(errorObject);
				});
			}
		});
		
		/*
		// 获取必要信息
		var moduleFlag = "CJ";
		var RECHECK_START_DATE = Ext.getCmp('RECHECK_START_DATE').getValue();
		var TASK_ID = Ext.getCmp('TASK_ID').getValue();
		var TASK_PROCESS_ID = Ext.getCmp('TASK_PROCESS_ID').getValue();
		var SEQ_NUM = Ext.getCmp('SEQ_NUM').getValue();
		var ORG_ID = Ext.getCmp("ORG_ID").getValue();
		var DEBUG_NUM = Ext.getCmp("DEBUG_NUM").getValue();
		var SD=Ext.getCmp('SD').getValue();
		var TID = '';
		var title = '初检';
		var ELEVATOR_CLASS_NAME = Ext.getCmp('ELEVATOR_CLASS_NAME').getValue();
		var fileMDate = '';
		var obj = this;
		obj_cj = this;
		var fileName = 'MENUPAPER';
		
		// 标志是否复检
		if (RECHECK_START_DATE != null) {
			var str_daaa = Ext.Date.format(RECHECK_START_DATE,'Y-m-d');
			if (str_daaa.indexOf('-') != -1) {
				moduleFlag = "FJ";// 复检
				title = "复检";
			}
		}
		// 检查直扶梯
		if (ELEVATOR_CLASS_NAME.indexOf("直") != -1) {//判断直梯还是扶梯
      			fileName += "_ZT";
      			title += "直梯";
      			if (SD != '') {
      				if ((SD/60) < 4) {
						fileName += "4D";
						title += "(V < 4m/s)";
					} else {
						fileName += "4U";
						title += "(V ≥ 4m/s)";
					}
      			}
      	} else if (ELEVATOR_CLASS_NAME.indexOf("扶") != -1) {
      			fileName += "_FT";
      			title += "扶梯";
      	} else {
      			fileName = "MENUPAPER_ZT4U";
      			title += "直梯";
      	}
      	
		
		// 查找文件最后更新日期
		var selection={tcode:'XML_VERSION',tid:fileName};
		var options = {};
		WL.JSONStore.get(collectionName).find(selection,options).then(function(arrayResults){
			if (arrayResults.length > 0) {
				fileMDate = arrayResults[0].json.stext.fileMDate;
			}
			// 检查服务器文件更新
	 		obj.connectServer(handlerResult,"instllMenudPaperAction.do?method=toSearchXML_PDA3","{DATA:{TASK_PROCESS_ID:'"+ TASK_PROCESS_ID +"'},FILENAME:'"+ fileName +"',fileMDate:'"+ fileMDate +"'}");
	 		function handlerResult(result) {
	 			if (!result.isexits) {
	 				WL.Toast.show('暂无此项目！');
	 				return ;
				}
				if (result.filedt != "NOFILE" && arrayResults.length > 0) {
					// 刷新最新的文件版本进JSONSTORE
					var nstext = arrayResults[0].json.stext;
					nstext.fileMDate = result.last_mdate;
					var ndata = {tcode:'XML_VERSION',tid:fileName,stext:nstext};
					var udata = {_id:arrayResults[0]._id, json:ndata};
					WL.JSONStore.get(collectionName).refresh(udata,options).then(function(arrayResults2){
					}).fail(function(errorObject){
						alert(errorObject);
					});
				} else if (result.filedt != "NOFILE") {
					// 保存文件版本进JSONSTORE
							var nstext = {fileMDate:result.last_mdate};
							var ndata = {tcode:'XML_VERSION',tid:fileName,stext:nstext};
							WL.JSONStore.get(collectionName).add(ndata,options).then(function(arrayResults2){
							}).fail(function(errorObject){
								alert(errorObject);
							});					
				}
				// 查询以往填过的菜单
				var selection_find = {tcode:'MENU_PITEM_'+fileName,tid:TASK_ID+'_'+SEQ_NUM};
				options = {};
				WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
						var sdata_id = 'NOT';
						var sdata = [];
						if (arrayResults2.length > 0) {
							sdata_id = ''+arrayResults2[0]._id;
							sdata = arrayResults2[0].json.stext;
						}
						// 判断服务器上的数据是否比本地新
						var itemValue = result.itemValue;
						var DATA_LAST_UPDATE_DATE = result.LAST_UPDATE_DATE;
						if (DATA_LAST_UPDATE_DATE != '' && arrayResults2.length>0) {
							var date_server = new Date(DATA_LAST_UPDATE_DATE.replace("-","/"));
							var date_local = new Date(sdata.LAST_UPDATE_DATE);
							if (date_server > date_local) {
								sdata = result.itemValue;
							}
						} else if (DATA_LAST_UPDATE_DATE != '' && arrayResults2.length<1) {
							sdata = result.itemValue;
						}
						WL.Toast.show('正在进入菜单纸,请稍等...');
						// 进入文件
		 				var param = {SDATA:JSON.stringify(sdata),filedata:result.filedt,filename:fileName,
		 				task_id:TASK_ID,task_process_id:TASK_PROCESS_ID,seq_num:SEQ_NUM,sd:SD,org_id:ORG_ID,
		 				elevator_class_name:ELEVATOR_CLASS_NAME,moduleFlag:moduleFlag,data_id:sdata_id,title:title,
		 				debug_num:DEBUG_NUM,init_person_id:init_person_id,ebs_user_id:ebs_user_id,collectionName:collectionName};
						WL.NativePage.show('com.gzunicorn.operation.menupaper.InstallPaper', obj.handlerActionResult, param);
				}).fail(function(errorObject){
						alert(errorObject);
				});
				
		};
		}).fail(function(errorObject){
			alert(errorObject);
		});
		*/
},

	 handlerActionResult: function(data) {
	 	var json_data = eval("("+ data.sdata +")");
	 	var json_data_stext = eval("("+ json_data.stext +")");
	 	try {
		 	if (data.data_id == "NOT") {
		 		// 保存进JSONSTORE
				var ndata = {tcode:json_data.tcode,tid:json_data.tid,stext:json_data_stext};
				var options = {};
				WL.JSONStore.get(collectionName).add(ndata,options).then(function(arrayResults2){
					WL.Toast.show('保存成功！');
					if(data.returnStatus != 'NOVALUE') {
//						obj_cj.handleFromMenuPaper(data.returnStatus);
						Ext.getCmp('CHECK_ACCEPT_STATUE').setValue(data.returnStatus);
					}
					// 刷新列表状态
				}).fail(function(errorObject){
					alert(errorObject);
				});	
		 	} else {
		 		// 更新进JSONSTORE
				var ndata = {tcode:json_data.tcode,tid:json_data.tid,stext:json_data_stext};
				var options = {};
				var udata = {_id:data.data_id, json:ndata};
				WL.JSONStore.get(collectionName).refresh(udata,options).then(function(arrayResults2){
					WL.Toast.show('保存成功！');
					if(data.returnStatus != 'NOVALUE') {
//						obj_cj.handleFromMenuPaper(data.returnStatus);
						Ext.getCmp('CHECK_ACCEPT_STATUE').setValue(data.returnStatus);
					}
				}).fail(function(errorObject){
					alert(errorObject);
				});	
		 	}
	 	} catch (e) {
	 	}
	 },
	 
	 handleFromMenuPaper: function(status) {
	 	Ext.getCmp('CHECK_ACCEPT_STATUE').setValue(status);
	 },

	 
	//监听验收到达日期
	 checkdate1 : function(){
		 if(Ext.getCmp('CHECK_ARRIVE_DATE').getValue()==""){
				Ext.getCmp('SETUP_UNIT_SIGN_NAME').setDisabled(true);
				Ext.getCmp('CHEK_MAN_SIGN').setDisabled(true);
				Ext.getCmp('btn_CHEK_MAN_SIGN').setDisabled(true);
			}else{
				Ext.getCmp('SETUP_UNIT_SIGN_NAME').setDisabled(false);
				Ext.getCmp('CHEK_MAN_SIGN').setDisabled(false);
				Ext.getCmp('btn_CHEK_MAN_SIGN').setDisabled(false);
			}
	 },
	 
	//监听初检安装组签名
	setupunitsignname1 : function(){
		if(Ext.getCmp('SETUP_UNIT_SIGN_NAME').getValue() != "" && Ext.getCmp('CHEK_MAN_SIGN').getValue() != ""){
			Ext.getCmp('INSTALL_CHECK_END_DATE').setDisabled(false);
			if(Ext.getCmp('INSTALL_CHECK_END_DATE').getValue()!=null){
				Ext.getCmp('RECHECK_START_DATE').setDisabled(false);
				//退检，初检退检
				Ext.getCmp('AGREE_CHECK_ROLLBACK').setDisabled(false);
				Ext.getCmp('CHECK_PRINCIPAL_SIGN_TXT').setDisabled(false);
				Ext.getCmp('CHECK_PRINCIPAL_SIGN_DATE').setDisabled(false);
			}
		}else{
			Ext.getCmp('INSTALL_CHECK_END_DATE').setDisabled(true);
			if(Ext.getCmp('INSTALL_CHECK_END_DATE').isDisabled()==true){
				Ext.getCmp('RECHECK_START_DATE').setDisabled(true);
				//退检，初检退检
				Ext.getCmp('AGREE_CHECK_ROLLBACK').setDisabled(true);
				Ext.getCmp('CHECK_PRINCIPAL_SIGN_TXT').setDisabled(true);
				Ext.getCmp('CHECK_PRINCIPAL_SIGN_DATE').setDisabled(true);
			}
		}
	},
	
	//监听初检检验员签名
	checkmansign1 : function(){
		if(Ext.getCmp('SETUP_UNIT_SIGN_NAME').getValue() != "" && Ext.getCmp('CHEK_MAN_SIGN').getValue() != ""){
			Ext.getCmp('INSTALL_CHECK_END_DATE').setDisabled(false);
			if(Ext.getCmp('INSTALL_CHECK_END_DATE').getValue()!=null){
				Ext.getCmp('RECHECK_START_DATE').setDisabled(false);
			}
		}else{
			Ext.getCmp('INSTALL_CHECK_END_DATE').setDisabled(true);
			if(Ext.getCmp('INSTALL_CHECK_END_DATE').isDisabled()==true){
				Ext.getCmp('RECHECK_START_DATE').setDisabled(true);
			}
		}
	},
	
	//监听初检完成时间
	installcheckenddate1 : function(){
		if(Ext.getCmp('INSTALL_CHECK_END_DATE').isDisabled()==true){
			Ext.getCmp('RECHECK_START_DATE').setDisabled(true);
		}
		if(Ext.getCmp('INSTALL_CHECK_END_DATE')!=null){
			if (Ext.getCmp('CHECK_ACCEPT_STATUE').getValue()=="初检退检") {
				Ext.Msg.alert("菜单纸检查结果为初检退检，请填写退检信息!!");
				Ext.getCmp('RECHECK_START_DATE').setDisabled(true);
			} else {
				Ext.getCmp('RECHECK_START_DATE').setDisabled(false);
				Ext.getCmp('AGREE_CHECK_ROLLBACK').setDisabled(false);         //同意初检退检 
				Ext.getCmp('CHECK_PRINCIPAL_SIGN_TXT').setDisabled(false);     //初检检验负责人签名
				Ext.getCmp('CHECK_PRINCIPAL_SIGN_DATE').setDisabled(false);    //检检验负责人签名日期 
				
			}
		}else{
			Ext.getCmp('RECHECK_START_DATE').setDisabled(true);
			Ext.getCmp('AGREE_CHECK_ROLLBACK').setDisabled(true);         //同意初检退检 
			Ext.getCmp('CHECK_PRINCIPAL_SIGN_TXT').setDisabled(true);     //初检检验负责人签名
			Ext.getCmp('CHECK_PRINCIPAL_SIGN_DATE').setDisabled(true);    //检检验负责人签名日期
		}
		
	},
	 
	//监听复检开始时间
	recheckstartdate1 : function(){
		//设置初检不可填
		Ext.getCmp('CHECK_ARRIVE_DATE').setDisabled(true);
		Ext.getCmp('SETUP_UNIT_SIGN_NAME').setDisabled(true);
		Ext.getCmp('CHEK_MAN_SIGN').setDisabled(true);
		Ext.getCmp('INSTALL_CHECK_END_DATE').setDisabled(true);
		
		if(Ext.getCmp('RECHECK_START_DATE').getValue()==null){
			Ext.getCmp('SETUP_UNIT_SIGN1_NAME').setDisabled(true);
			Ext.getCmp('CHEK_MAN_SIGN1').setDisabled(true);
		}else{
			Ext.getCmp('AGREE_CHECK_ROLLBACK').setDisabled(true);     //同意初检退检
			Ext.getCmp('CHECK_PRINCIPAL_SIGN_TXT').setDisabled(true); //初检检验负责人签名
			Ext.getCmp('CHECK_PRINCIPAL_SIGN_DATE').setDisabled(true); //初检检验负责人签名日期
			
			Ext.getCmp('SETUP_UNIT_SIGN1_NAME').setDisabled(false);
			Ext.getCmp('CHEK_MAN_SIGN1').setDisabled(false);
			Ext.getCmp('btn_CHEK_MAN_SIGN1').setDisabled(false);
		}
	},
	
	//监听复检安装组签名
	setupunitsign1name1 : function(){
		if(Ext.getCmp('SETUP_UNIT_SIGN1_NAME').getValue() == "" && Ext.getCmp('CHEK_MAN_SIGN1').getValue() == ""){
			Ext.getCmp('RECHECK_FINISH_DATE').setDisabled(true);
		}else{
			Ext.getCmp('RECHECK_FINISH_DATE').setDisabled(false);
			//退检，检验输入（复检），工程负责
			Ext.getCmp('AGREE_RECHECK_BACKCHECK').setDisabled(false);
			Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_NAME').setDisabled(false);
			Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_DATE').setDisabled(false);
	
			Ext.getCmp('PROJECT_PRINCIPAL_SIGN_NAME').setDisabled(false);
			Ext.getCmp('PROJECT_PRINCIPAL_SIGN_DATE').setDisabled(false);
		}
		if(Ext.getCmp('SETUP_UNIT_SIGN1_NAME').getValue() == "" || Ext.getCmp('CHEK_MAN_SIGN1').getValue() == ""){
			Ext.getCmp('RECHECK_FINISH_DATE').setDisabled(true);
			//退检，检验输入（复检），工程负责
			Ext.getCmp('AGREE_RECHECK_BACKCHECK').setDisabled(true);
			Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_NAME').setDisabled(true);
			Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_DATE').setDisabled(true);
	
			Ext.getCmp('PROJECT_PRINCIPAL_SIGN_NAME').setDisabled(true);
			Ext.getCmp('PROJECT_PRINCIPAL_SIGN_DATE').setDisabled(true);
		}
	},
	
	//监听复检检验员签名
	chekmansign11 : function(){
		if(Ext.getCmp('SETUP_UNIT_SIGN1_NAME').getValue() == "" && Ext.getCmp('CHEK_MAN_SIGN1').getValue() == ""){
			Ext.getCmp('RECHECK_FINISH_DATE').setDisabled(true);
		}else{
			Ext.getCmp('RECHECK_FINISH_DATE').setDisabled(false);
		}
		if(Ext.getCmp('SETUP_UNIT_SIGN1_NAME').getValue() == "" || Ext.getCmp('CHEK_MAN_SIGN1').getValue() == ""){
			Ext.getCmp('RECHECK_FINISH_DATE').setDisabled(true);
		}
	},
	
	//监听复检完成时间
	recheckfinishdate1 : function(){
		if(Ext.getCmp('RECHECK_FINISH_DATE')!=null){
			Ext.getCmp('AGREE_RECHECK_BACKCHECK').setDisabled(false);      //同意复检退检(复检退检审批)
			Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_NAME').setDisabled(false); //检验负责人签名（复检退检审批）
			Ext.getCmp('CHECKOUT_PRINCIPAL_SIGN_DATE').setDisabled(false); //检验负责人签名日期（复检退检审批）
	
			Ext.getCmp('PROJECT_PRINCIPAL_SIGN_NAME').setDisabled(false);  //工程负责人签名（复检退检审批）
			Ext.getCmp('PROJECT_PRINCIPAL_SIGN_DATE').setDisabled(false);  //工程负责人签名日期（复检退检审批）
		}
	},
	
	
//监听验收状态
	checkacceptstatue1 : function(){
		if(Ext.getCmp('INSTALL_CHECK_END_DATE')!=null){
			if(Ext.getCmp('CHECK_ACCEPT_STATUE').getValue()=="初检退检"){
				WL.Toast.show("菜单纸检查结果为初检退检，请填写退检信息!!"); 
			}
		}
		if(Ext.getCmp('CHECK_ACCEPT_STATUE')=="检验合格"){
//			Ext.getCmp('REPORT_DATE').setDisabled(true); aa
		}else if(Ext.getCmp('CHECK_ACCEPT_STATUE')=="复检合格") {
//			Ext.getCmp('REPORT_DATE').setDisabled(true);  aa
		}else if(Ext.getCmp('CHECK_ACCEPT_STATUE')=="安装跟进") {
			if(Ext.getCmp('AGREE_FOLLOWUP').getValue()==1 && !(Ext.getCmp('CHECKOUT_APPROVE_SIGN_NAME').getValue()=="" && list.length>0)){
//				Ext.getCmp('REPORT_DATE').setDisabled(true); aa
			}else{
				Ext.getCmp('REPORT_DATE').setDisabled(false);
			};
		}else{
			Ext.getCmp('REPORT_DATE').setDisabled(false);
		};
	},
	
	
	//存储报告签写录入时间
	REPORT_DATE1 : function(obj, newValue, oldValue, eOpts){
		if(newValue != null){
			Ext.getCmp('REPORT_ENTER_DATE').setValue(Ext.Date.format(new Date(),'Y-m-d h:m:s'));
		}
	}
	
	
	
});