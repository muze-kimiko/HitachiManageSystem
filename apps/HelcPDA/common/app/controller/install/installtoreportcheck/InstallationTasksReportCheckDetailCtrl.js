var list_CheckReport=[];
var bjflag=0;
Ext.define('HelcPDA.controller.install.installtoreportcheck.InstallationTasksReportCheckDetailCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//进入录入detail界面，进行初始化数据
			InstallationTasksReportCheckDetailCtrl_toReportDetailCheck:'button[id=toReportDetailCheck]'
			,//保存页面数据
			InstallationTasksReportCheckDetailCtrl_REPORT_CHECK_SAVE:'button[id=REPORT_CHECK_SAVE]',
		    //提交数据
			InstallationTasksReportCheckDetailCtrl_REPORT_CHECK_SUBMIT:'button[id=REPORT_CHECK_SUBMIT]',
			//点击查看
			InstallationTasksReportCheckDetailCtrl_REPORT_CHECK_CHECKINFO:'button[id=REPORT_CHECK_CHECKINFO]',
			//报检回滚
			InstallationTasksReportCheckDetailCtrl_REPORT_ROLL_BACK:'button[id=REPORT_ROLL_BACK]'
		},
		control:{
			InstallationTasksReportCheckDetailCtrl_toReportDetailCheck:{
				tap:'toReportDetailCheck'
			},
			InstallationTasksReportCheckDetailCtrl_REPORT_CHECK_SAVE:{
				tap:'REPORT_CHECK_SAVE'
			},
			InstallationTasksReportCheckDetailCtrl_REPORT_CHECK_SUBMIT:{
				tap:'REPORT_CHECK_SUBMIT'
			},
			InstallationTasksReportCheckDetailCtrl_REPORT_CHECK_CHECKINFO:{
				tap:'REPORT_CHECK_CHECKINFO'
			},
			InstallationTasksReportCheckDetailCtrl_REPORT_ROLL_BACK:{
				tap:'REPORT_ROLL_BACK'
			}
		}
	},
	toReportDetailCheck:function(){
		 this.NextView('installationTasksReportCheckDetailPanel1','HelcPDA.view.install.installtoreportcheck.InstallationTasksReportCheckDetailPanel1');
		 var store=this.getStore('InstallatoinTasksReportCheck_1Store','HelcPDA.store.install.installtoreportcheck.InstallatoinTasksReportCheck_1Store');
	     var count= store.getCount();
	     WL_taskCheck=WL.JSONStore.get(collectionName);
	     var ELEVATOR_LIST=[];
		 for(var i=0;i<count;i++){
			var ELEVATOR_NO=store.getAt(i).get('ELEVATOR_NO');
			ELEVATOR_LIST[i]=ELEVATOR_NO;
			var css=document.getElementById(ELEVATOR_NO);
		    if(css.className=="p_judge_box"){
		    	ELEVATOR_LIST.splice(i,1);
			}	 
				 
			 }
			 var query={tcode:ebs_user_id+"_check"};
			 WL_taskCheck.find(query).then(function(res){
				 list_CheckReport=[];
				 var length=res.length;
				 for(var i=0;i<ELEVATOR_LIST.length;i++){
					 for(var j=0;j<length;j++){
						 if(res[j].json.stext.ELEVATOR_NO==ELEVATOR_LIST[i]){
							 list_CheckReport[i]=res[j];
							 if(res[j].json.stext.REPORT_CHECK_DATE==''||res[j].json.stext.REPORT_CHECK_DATE=="点击文本设置时间"){
									Ext.getCmp('REPORT_CHECK_REPORT_CHECK_DATE').setValue(res[j].json.stext.REPORT_CHECK_DATE);
								}else{
									Ext.getCmp('REPORT_CHECK_REPORT_CHECK_DATE').setValue(Ext.Date.format(new Date(res[j].json.stext.REPORT_CHECK_DATE),'Y-m-d'));
								}
						 }
				 }
				  }
			 }).fail(function(){
				 WL.Toast.show('未找到相关信息');
			 });  
		
	 },
//保存当前的字段
   REPORT_CHECK_SAVE:function(){
	   //zhj
	   var i;
	   for(i=0;i<list_CheckReport.length;i++){
	   if(list_CheckReport[i]!=null){
	   	
	   if(list_CheckReport[i].json.stext.FLGS=='已提交'){
	   	WL.Toast.show('请勿重复操作！');
	      return;
	   };
	   };
	   };

	   saveAll();


	   
},
//提交当前数据
REPORT_CHECK_SUBMIT:function(){
	var obj=this;
	var REPORT_CHECK_DATE=Ext.getCmp('REPORT_CHECK_REPORT_CHECK_DATE').getValue();
	if(REPORT_CHECK_DATE==''||REPORT_CHECK_DATE==null||REPORT_CHECK_DATE=='点击文本设置时间'){
		REPORT_CHECK_DATE='点击文本设置时间';
	}else{
		REPORT_CHECK_DATE=Ext.Date.format(new Date(REPORT_CHECK_DATE),'Y-m-d h:m:s');
	}
	var rows=[];
	var num=0;
	for(var i=0;i<list_CheckReport.length;i++){
		if(list_CheckReport[i]!=null){
		var a=comptime(Ext.Date.format(new Date(list_CheckReport[i].json.stext.DEBUG_END_DATE+' 00:00:00'),'Y-m-d h:m:s'),REPORT_CHECK_DATE);
	    if(a<0){
		     WL.Toast.show('工号为:'+list_CheckReport[i].json.stext.ELEVATOR_NO+'的梯的报检日期，大于了调试完成日期');
		     return;
		}

		list_CheckReport[i].json.stext.REPORT_CHECK_DATE=REPORT_CHECK_DATE;
		var temp={};
		temp.TASK_PROCESS_ID=list_CheckReport[i].json.stext.TASK_PROCESS_ID;
		temp.ORG_ID=list_CheckReport[i].json.stext.ORG_ID;
		temp.TASK_ID=list_CheckReport[i].json.stext.TASK_ID;
		temp.SEQ_NUM=list_CheckReport[i].json.stext.SEQ_NUM;
		temp.DEBUG_NUM=list_CheckReport[i].json.stext.DEBUG_NUM;
		temp.CHECK_NUM=list_CheckReport[i].json.stext.CHECK_NUM;
		rows[num]=temp;
		num++;
	
		}
	}
	function getResult(res){
		if(res.msginfo=='提交成功'){
			saveAll('提交成功');
			obj.BackView();
		}
	}
var	RE_DEBUG_DATE="点击文本设置时间";	
var content="{'USERID':'"+((init_person_id==null || init_person_id=="")?ebs_user_id:init_person_id)+"','USER_NAME':'"+usernames+"'," +
		"'RE_DEBUG_DATE':'"+RE_DEBUG_DATE+"','REPORT_CHECK_DATE':'"+REPORT_CHECK_DATE+"','rows':"+JSON.stringify(rows)+"}";
console.log("content="+content);
//zhj
var i;
for(i=0;i<list_CheckReport.length;i++){
if(list_CheckReport[i]!=null){
	
if(list_CheckReport[i].json.stext.FLGS=='已提交'){
	WL.Toast.show('请勿重复操作！');
   return;
};
};
};
this.connectServer(getResult,'baojianAction.do?method=toAdd',content);

},
//点击查看，进入查看界面，初始化数据
REPORT_CHECK_CHECKINFO:function(){
	var obj=this;
	var InstallationTasksReportCheckDetailSawPanel=Ext.getCmp('installationTasksReportCheckDetailSawPanel');
	if(InstallationTasksReportCheckDetailSawPanel){
		InstallationTasksReportCheckDetailSawPanel.destroy();
	}
 	Ext.Viewport.setActiveItem(Ext.create('HelcPDA.view.install.installtoreportcheck.InstallationTasksReportCheckDetailSawPanel'));
 	function getResult(res){
	Ext.getCmp('REPORT_DYDL_UP_0').setValue(res.rows[0].DYDL_UP_0);
	Ext.getCmp('REPORT_DYDL_DOWN_0').setValue(res.rows[0].DYDL_DOWN_0);
	Ext.getCmp('REPORT_DYDL_UP_30').setValue(res.rows[0].DYDL_UP_30);
	Ext.getCmp('REPORT_DYDL_DOWN_30').setValue(res.rows[0].DYDL_DOWN_30);
	Ext.getCmp('REPORT_DYDL_UP_40').setValue(res.rows[0].DYDL_UP_40);
	Ext.getCmp('REPORT_DYDL_DOWN_40').setValue(res.rows[0].DYDL_DOWN_40);
	Ext.getCmp('REPORT_DYDL_UP_45').setValue(res.rows[0].DYDL_UP_45);
	Ext.getCmp('REPORT_DYDL_DOWN_45').setValue(res.rows[0].DYDL_DOWN_45);
	Ext.getCmp('REPORT_DYDL_UP_50').setValue(res.rows[0].DYDL_UP_50);
	Ext.getCmp('REPORT_DYDL_DOWN_50').setValue(res.rows[0].DYDL_DOWN_50);
	Ext.getCmp('REPORT_DYDL_UP_60').setValue(res.rows[0].DYDL_UP_60);
	Ext.getCmp('REPORT_DYDL_DOWN_60').setValue(res.rows[0].DYDL_DOWN_60);
	Ext.getCmp('REPORT_DYDL_UP_100').setValue(res.rows[0].DYDL_UP_100);
	Ext.getCmp('REPORT_DYDL_DOWN_100').setValue(res.rows[0].DYDL_DOWN_100);
	Ext.getCmp('REPORT_DYDL_UP_110').setValue(res.rows[0].DYDL_UP_110);
	Ext.getCmp('REPORT_DYDL_DOWN_110').setValue(res.rows[0].DYDL_DOWN_110);
	
	Ext.getCmp('REPORT_DYDJ_UP_0').setValue(res.rows[0].DYDJ_UP_0);
	Ext.getCmp('REPORT_DYDJ_DOWN_0').setValue(res.rows[0].DYDJ_DOWN_0);
	Ext.getCmp('REPORT_DYDJ_UP_30').setValue(res.rows[0].DYDJ_UP_30);
	Ext.getCmp('REPORT_DYDJ_DOWN_30').setValue(res.rows[0].DYDJ_DOWN_30);
	Ext.getCmp('REPORT_DYDJ_UP_40').setValue(res.rows[0].DYDJ_UP_40);
	Ext.getCmp('REPORT_DYDJ_DOWN_40').setValue(res.rows[0].DYDJ_DOWN_40);
	Ext.getCmp('REPORT_DYDJ_UP_45').setValue(res.rows[0].DYDJ_UP_45);
	Ext.getCmp('REPORT_DYDJ_DOWN_45').setValue(res.rows[0].DYDJ_DOWN_45);
	Ext.getCmp('REPORT_DYDJ_UP_50').setValue(res.rows[0].DYDJ_UP_50);
	Ext.getCmp('REPORT_DYDJ_DOWN_50').setValue(res.rows[0].DYDJ_DOWN_50);
	Ext.getCmp('REPORT_DYDJ_UP_60').setValue(res.rows[0].DYDJ_UP_60);
	Ext.getCmp('REPORT_DYDJ_DOWN_60').setValue(res.rows[0].DYDJ_DOWN_60);
	Ext.getCmp('REPORT_DYDJ_UP_100').setValue(res.rows[0].DYDJ_UP_100);
	Ext.getCmp('REPORT_DYDJ_DOWN_100').setValue(res.rows[0].DYDJ_DOWN_100);
	Ext.getCmp('REPORT_DYDJ_UP_110').setValue(res.rows[0].DYDJ_UP_110);
	Ext.getCmp('REPORT_DYDJ_DOWN_110').setValue(res.rows[0].DYDJ_DOWN_110);
	
	Ext.getCmp('REPORT_PCSJ_UP_0').setValue(res.rows[0].PCSJ_UP_0);
	Ext.getCmp('REPORT_PCSJ_DOWN_0').setValue(res.rows[0].PCSJ_DOWN_0);
	Ext.getCmp('REPORT_PCSJ_UP_30').setValue(res.rows[0].PCSJ_UP_30);
	Ext.getCmp('REPORT_PCSJ_DOWN_30').setValue(res.rows[0].PCSJ_DOWN_30);
	Ext.getCmp('REPORT_PCSJ_UP_40').setValue(res.rows[0].PCSJ_UP_40);
	Ext.getCmp('REPORT_PCSJ_DOWN_40').setValue(res.rows[0].PCSJ_DOWN_40);
	Ext.getCmp('REPORT_PCSJ_UP_45').setValue(res.rows[0].PCSJ_UP_45);
	Ext.getCmp('REPORT_PCSJ_DOWN_45').setValue(res.rows[0].PCSJ_DOWN_45);
	Ext.getCmp('REPORT_PCSJ_UP_50').setValue(res.rows[0].PCSJ_UP_50);
	Ext.getCmp('REPORT_PCSJ_DOWN_50').setValue(res.rows[0].PCSJ_DOWN_50);
	Ext.getCmp('REPORT_PCSJ_UP_60').setValue(res.rows[0].PCSJ_UP_60);
	Ext.getCmp('REPORT_PCSJ_DOWN_60').setValue(res.rows[0].PCSJ_DOWN_60);
	Ext.getCmp('REPORT_PCSJ_UP_100').setValue(res.rows[0].PCSJ_UP_100);
	Ext.getCmp('REPORT_PCSJ_DOWN_100').setValue(res.rows[0].PCSJ_DOWN_100);
	Ext.getCmp('REPORT_PCSJ_UP_110').setValue(res.rows[0].PCSJ_UP_110);
	Ext.getCmp('REPORT_PCSJ_DOWN_110').setValue(res.rows[0].PCSJ_DOWN_110);
	
	Ext.getCmp('REPORT_DYDY_UP_0').setValue(res.rows[0].DYDY_UP_0);
	Ext.getCmp('REPORT_DYDY_DOWN_0').setValue(res.rows[0].DYDY_DOWN_0);
	Ext.getCmp('REPORT_DYDY_UP_30').setValue(res.rows[0].DYDY_UP_30);
	Ext.getCmp('REPORT_DYDY_DOWN_30').setValue(res.rows[0].DYDY_DOWN_30);
	Ext.getCmp('REPORT_DYDY_UP_40').setValue(res.rows[0].DYDY_UP_40);
	Ext.getCmp('REPORT_DYDY_DOWN_45').setValue(res.rows[0].DYDY_DOWN_45);
	Ext.getCmp('REPORT_DYDY_UP_45').setValue(res.rows[0].DYDY_UP_45);
	Ext.getCmp('REPORT_DYDY_DOWN_40').setValue(res.rows[0].DYDY_DOWN_40);
	Ext.getCmp('REPORT_DYDY_UP_50').setValue(res.rows[0].DYDY_UP_50);
	Ext.getCmp('REPORT_DYDY_DOWN_50').setValue(res.rows[0].DYDY_DOWN_50);
	Ext.getCmp('REPORT_DYDY_UP_60').setValue(res.rows[0].DYDY_UP_60);
	Ext.getCmp('REPORT_DYDY_DOWN_60').setValue(res.rows[0].DYDY_DOWN_60);
	Ext.getCmp('REPORT_DYDY_UP_100').setValue(res.rows[0].DYDY_UP_100);
	Ext.getCmp('REPORT_DYDY_DOWN_100').setValue(res.rows[0].DYDY_DOWN_100);
	Ext.getCmp('REPORT_DYDY_UP_110').setValue(res.rows[0].DYDY_UP_110);
	Ext.getCmp('REPORT_DYDY_DOWN_110').setValue(res.rows[0].DYDY_DOWN_110);
	
	//信息
	Ext.getCmp('REPORT_PLAN_DEBUG_DATE0').setValue(res.rows[0].PLAN_DEBUG_DATE);
	Ext.getCmp('REPORT_DEBUG_ARRIVE_DATE0').setValue(res.rows[0].DEBUG_ARRIVE_DATE);
	Ext.getCmp('REPORT_THREE_GUARANTEE_BAD0').setValue(res.rows[0].THREE_GUARANTEE_BAD);
	Ext.getCmp('REPORT_EQUILIBRIUM_COEFFICIENT0').setValue(res.rows[0].EQUILIBRIUM_COEFFICIENT);
	Ext.getCmp('REPORT_COUNTER_WEIGHT_PIECE0').setValue(res.rows[0].COUNTER_WEIGHT_PIECE);
	
	if(res.rows[0].NEED_SECOND_TEST_WEIGHT=="Y"){
		Ext.getCmp('REPORT_NEED_SECOND_TEST_WEIGHT0').setValue(1);
	}else{
		Ext.getCmp('REPORT_NEED_SECOND_TEST_WEIGHT0').setValue(0);
	}
	if(res.rows[0].NOT_ACHIEVE_STANDARD=="Y"){
		Ext.getCmp('REPORT_NOT_ACHIEVE_STANDARD0').setValue(1);
	}else{
		Ext.getCmp('REPORT_NOT_ACHIEVE_STANDARD0').setValue(0);
	}
	if(res.rows[0].ACHIEVE_PUTIN_CHECK_STARDARD=="Y"){
		Ext.getCmp('REPORT_ACHIEVE_PUTIN_CHECK_STARDARD0').setValue(1);
	}else{
		Ext.getCmp('REPORT_ACHIEVE_PUTIN_CHECK_STARDARD0').setValue(0);
	}
	
	Ext.getCmp('REPORT_DEBUG_MAN_NAME0').setValue(res.rows[0].DEBUG_MAN_NAME);
	Ext.getCmp('REPORT_DEBUG_END_DATE0').setValue(res.rows[0].DEBUG_END_DATE);
	Ext.getCmp('REPORT_SUPERVISOR_SIGN2_NAME0').setValue(res.rows[0].SUPERVISOR_SIGN2_NAME);
	Ext.getCmp('REPORT_DATE30').setValue(res.rows[0].DATE3);
	
	//菜单
	var store=obj.getStore('InstallationTasksReportCheckDetailSawStore','HelcPDA.store.install.installtoreportcheck.InstallationTasksReportCheckDetailSawStore');
	if(res.rows2){
		store.setData(res.rows2);
	}else{
		store.setData('');
	}
	}
	var TASK_PROCESS_ID='';
	var TASK_ID='';
	var SEQ_NUM='';
	var DEBUG_NUM='';
	var CHECK_NUM='';
for(var i=0;i<list_CheckReport.length;i++){
	if(list_CheckReport[i]!=null){
		 TASK_PROCESS_ID=list_CheckReport[i].json.stext.TASK_PROCESS_ID;
		 TASK_ID=list_CheckReport[i].json.stext.TASK_ID;
		 SEQ_NUM=list_CheckReport[i].json.stext.SEQ_NUM;
		 DEBUG_NUM=list_CheckReport[i].json.stext.DEBUG_NUM;
		 CHECK_NUM=list_CheckReport[i].json.stext.CHECK_NUM;
	}
}
var content="{'TASK_PROCESS_ID':'"+TASK_PROCESS_ID+"','TASK_ID':'"+TASK_ID+"','SEQ_NUM':'"+SEQ_NUM+"','DEBUG_NUM':'"+DEBUG_NUM+"','CHECK_NUM':'"+CHECK_NUM+"'}";    					
this.connectServer(getResult,'baojianAction.do?method=Search_ts_info',content);	
},
//回滚信息
REPORT_ROLL_BACK:function(){
	var obj=this;
	var k=0;
	var rows=[];
	for(var i=0;i<list_CheckReport.length;i++){
		if(list_CheckReport[i]!=null){
			var temp={};
			temp.TASK_PROCESS_ID=list_CheckReport[i].json.stext.TASK_PROCESS_ID;
			temp.TASK_ID=list_CheckReport[i].json.stext.TASK_ID;
			temp.SEQ_NUM=list_CheckReport[i].json.stext.SEQ_NUM;
			temp.DEBUG_NUM=list_CheckReport[i].json.stext.DEBUG_NUM;
			temp.CHECK_NUM=list_CheckReport[i].json.stext.CHECK_NUM;
			temp.ORG_ID=list_CheckReport[i].json.stext.ORG_ID;
			rows[k]=temp;
			k++;
		}
	}
	var content={};
	if(ebs_user_id == ''){
		Ext.Msg.alert('提示',"用户未配置EBS人员id，请联系PDA运维人员进行配置。");
		return;
	}
	if(init_person_id!=null){
		 content='{"USERID":"'+init_person_id+'","USER_NAME":"'+usernames+'","rows":'+JSON.stringify(rows)+'}';
	}
	if(ebs_user_id!=null){
		 content='{"USERID":"'+ebs_user_id+'","USER_NAME":"'+usernames+'","rows":'+JSON.stringify(rows)+'}';
	}
	
	function getResult(res){
		if(res.msginfo=='提交成功'){
			WL.Toast.show('回滚成功');
		}else{
			WL.Toast.show('回滚失败');
		}
	}
	
	navigator.notification.confirm('确定删除当前节点信息，回滚到上一环节？',function(btn){
			if(btn ==2){
				this.connectServer(getResult,'baojianAction.do?method=rollback_data',content);
			}else{
				return;
			}
		},"提示","取消,确定");
//	Ext.Msg.confirm('你好','确认要回滚吗？',function(btn){
//		if (btn == 'yes'){
//			alert(JSON.stringify(content));
//			console.log(JSON.stringify(content));
//			this.connectServer(getResult,'baojianAction.do?method=rollback_data',content);	
//		}else{
//			
//			return;
//		}
//});
	
	
}
});

function setElemet(res){
	Ext.getCmp('REPORT_CHECK_ENGCONTRACT_NUMBER').setValue(res.json.stext.ENGCONTRACT_NUMBER);
	Ext.getCmp('REPORT_CHECK_ELEVATOR_NO').setValue(res.json.stext.ELEVATOR_NO);

	Ext.getCmp('REPORT_CHECK_CUSTOMER_NAME').setValue(res.json.stext.CUSTOMER_NAME);
	Ext.getCmp('REPORT_CHECK_INSTALL_ADDRESS').setValue(res.json.stext.INSTALL_ADDRESS);
	Ext.getCmp('REPORT_CHECK_PRODUCE_TYPE').setValue(res.json.stext.PRODUCE_TYPE);
	Ext.getCmp('REPORT_CHECK_SEQ_NUM').setValue(res.json.stext.SEQ_NUM);
	Ext.getCmp('REPORT_CHECK_EQUIPMENT_NO').setValue(res.json.stext.EQUIPMENT_NO);
	Ext.getCmp('REPORT_CHECK_CM_ELEVATOR_TYPE_NAME').setValue(res.json.stext.CM_ELEVATOR_TYPE_NAME);
	Ext.getCmp('REPORT_CHECK_ELEVATOR_CLASS_NAME').setValue(res.json.stext.ELEVATOR_CLASS_NAME);
	Ext.getCmp('REPORT_CHECK_NST_VENDOR_NAME').setValue(res.json.stext.NST_VENDOR_NAME);
	Ext.getCmp('REPORT_CHECK_LIFT_VENDOR_NAME').setValue(res.json.stext.LIFT_VENDOR_NAME);
	Ext.getCmp('REPORT_CHECK_BUILD_VENDOR_NAME').setValue(res.json.stext.BUILD_VENDOR_NAME);
	Ext.getCmp('REPORT_CHECK_PARAM_C_M_Z').setValue(res.json.stext.PARAM_C_M_Z);
	Ext.getCmp('REPORT_CHECK_ZZ').setValue(res.json.stext.ZZ);
	Ext.getCmp('REPORT_CHECK_SD').setValue(res.json.stext.SD);
	Ext.getCmp('REPORT_CHECK_TSGD').setValue(res.json.stext.TSGD);
	Ext.getCmp('REPORT_CHECK_JDZG').setValue(res.json.stext.JDZG);
	Ext.getCmp('REPORT_CHECK_CCRQ').setValue(res.json.stext.CCRQ);
	Ext.getCmp('REPORT_DEBUG_END_DATE').setValue(res.json.stext.DEBUG_END_DATE);
    //安装工法
	Ext.getCmp('REPORT_BUDGET_INSTALL_METHOD').setValue(res.json.stext.BUDGET_INSTALL_METHOD)
	//退检日期
	if(res.json.stext.REPORT_CHECK_DATE==''||res.json.stext.REPORT_CHECK_DATE=="点击文本设置时间"){
		Ext.getCmp('REPORT_CHECK_REPORT_CHECK_DATE').setValue(res.json.stext.REPORT_CHECK_DATE);
	}else{
		Ext.getCmp('REPORT_CHECK_REPORT_CHECK_DATE').setValue(Ext.Date.format(new Date(res.json.stext.REPORT_CHECK_DATE),'Y-m-d'));
	}
};



function saveAll(submit){
	  function getStore(storeName,FullNAME){
		  var store=Ext.data.StoreManager.get(storeName);
	 		if (!store) { 
	 			store = Ext.create(FullNAME); 
	 		}; 
	 		return store;
	  }
	var store=getStore("InstallatoinTasksReportCheckStore","HelcPDA.store.install.installtoreportcheck.InstallatoinTasksReportCheckStore");
	var store1=getStore("InstallatoinTasksReportCheck_1Store","HelcPDA.store.install.installtoreportcheck.InstallatoinTasksReportCheck_1Store");
	// ...........
	var REPORT_CHECK_DATE=Ext.getCmp('REPORT_CHECK_REPORT_CHECK_DATE').getValue();
	if(REPORT_CHECK_DATE==''||REPORT_CHECK_DATE==null){
		REPORT_CHECK_DATE='点击文本设置时间';
	}
	WL_taskCheck=WL.JSONStore.get(collectionName);
	var query=[];
	var temp=0;
	for(var i=0;i<list_CheckReport.length;i++){
		if(list_CheckReport[i]!=null){
			if(submit=="提交成功"){
				list_CheckReport[i].json.stext.FLGS='已提交';
			}
			list_CheckReport[i].json.stext.REPORT_CHECK_DATE=REPORT_CHECK_DATE;
			var query1={_id:list_CheckReport[i]._id,json:{stext:list_CheckReport[i].json.stext,tcode:list_CheckReport[i].json.tcode,tid:list_CheckReport[i].json.tid}};
		    query[temp]=query1;
		    temp++;
		}
	}
	WL_taskCheck.refresh(query).then(function(){
		//开始刷新第二个list列表
		var ENGCONTRACT_NUMBER=Ext.getCmp('hidden_ENGCONTRACT_NUMBER').getValue();
		 var query={tcode:ebs_user_id+"_check",tid:JSON.stringify(ENGCONTRACT_NUMBER)};
		 WL_taskCheck.find(query).then(function(res){
		        var list=[];
		        var length=res.length;
		        var tempNUM4=0;
		        var tempNUM5=0;
		    	for(var i=0;i<length;i++){
		    		if(ENGCONTRACT_NUMBER==res[i].json.stext.ENGCONTRACT_NUMBER){
		    			if(res[i].json.stext.FLGS=="未提交"){
		    				tempNUM4++;
		    			}else{
		    				tempNUM5++;
		    			}
		    		}
		    		list[i]=res[i].json.stext;
		    	}
		    	store1.setData(list);
		    	//开始刷新第一个list列表
		    	var  query1={tcode:'_check_list'+ebs_user_id,tid:'check_task'};
		    	WL_taskCheck.find(query1).then(function(res){
		    		var templist=[];
		    		templist=res[0].json.stext;
		    		var length=templist.length;
		    		var SumSub=0;
		    		for(var i=0;i<length;i++){
		    			if(templist[i].ENGCONTRACT_NUMBER==ENGCONTRACT_NUMBER){
		    				templist[i].NUM4=tempNUM4;
		    				templist[i].NUM5=tempNUM5;
		    			}
		    		}
		    		for(var j=0;j<length;j++){
		    			SumSub+=templist[j].NUM4;
		    		}
		    		for(var k=0;k<length;k++){
		    			templist[k].SumSub=SumSub;
		    		}
		    		res[0].json.stext=templist;
		    		store.setData(res[0].json.stext);
		    		var query2={_id:res[0]._id,json:{tcode:'_check_list'+ebs_user_id,tid:'check_task',stext:templist}};
		    		WL_taskCheck.refresh(query2).then(function(){}).fail(function(){});
		    		    var NEW_NEED_LIST=res[0].json.stext;
		    		    var length=NEW_NEED_LIST.length;
						var TotNum=0;
						var TotNum1=0;
						var TotNum2=0;
						for(var i=0;i<length;i++){
							TotNum+=(parseInt(NEW_NEED_LIST[i].NUM5)+parseInt(NEW_NEED_LIST[i].NUM4));//总台数
							TotNum1+=(parseInt(NEW_NEED_LIST[i].NUM5)); //总提交数
							TotNum2+=(parseInt(NEW_NEED_LIST[i].SumSub));
						}
						Ext.getCmp('NUM1').setHtml("总台数("+TotNum+")");;
						Ext.getCmp('NUM2').setHtml("已提交("+TotNum1+")");
						Ext.getCmp('NUM3').setHtml("未提交("+(TotNum-TotNum1)+")");;
					
					    WL.Toast.show('保存成功');
					    bjflag=1;
					  	//对报检状态的颜色进行区分，如果是已退调，就为红色
//				    	var colorList=document.getElementsByName("BAO_SATRTUS_COLOR");
//				    	var length=colorList.length;
//				    	for(var i=0;i<length;i++){
//				    		if(colorList[i].innerHTML=='已提交'){
//				    			colorList[i].className="p_submit_yes";
//				    		}else{
//				    			colorList[i].className="p_submit_no";
//				    		}
//				    	}
		    	}).fail(function(){

		    	});
		    }).fail(function(err){
		    	WL.Toast.show("查找缓存失败");
		    });
		
		
	}).fail(function(){
		WL.Toast.show('保存失败');
	});
}

function comptime(beginTime,endTime) {
    var beginTimes = beginTime.substring(0, 10).split('-');
    var endTimes = endTime.substring(0, 10).split('-');

    beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);

 //   alert(beginTime + "aaa" + endTime);
//    alert(Date.parse(endTime));
//   alert(Date.parse(beginTime));
    var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
    if (a < 0) {
        return a;
    } else if (a > 0) {
        return a;
    } else if (a == 0) {
        return a;
    } else {
        return 'exception';
    }
}


