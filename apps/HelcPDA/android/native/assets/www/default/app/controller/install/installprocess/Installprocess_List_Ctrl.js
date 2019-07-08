
/* JavaScript content from app/controller/install/installprocess/Installprocess_List_Ctrl.js in folder common */
Ext.define('HelcPDA.controller.install.installprocess.Installprocess_List_Ctrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
		},
		control:{
			"list#processlist_List":{
				itemtap:'processlist_List'
			},
			//查询
			"button#instpro_searchdata_btn":{
				tap:'instpro_searchdata_btn'
			},
			//同步
			"button#instpro_getdata_btn":{
				tap:'instpro_getdata_btn'
			},
			"button#back_to_processlist":{
				tap:'back_to_processlist'
			},
			"button#back_to_IP_List":{
				tap:'back_to_IP_List'
			},
			//进入同步
			"button#btn_IP_update":{
				tap:'btn_IP_update'
			},
			//进入查询
			"button#btn_IP_search":{
				tap:'btn_IP_search'
			},
			"button#buttonInstallProcess":{
				tap:'buttonInstallProcess'
			},
			"button#ipd_check_all":{
				tap:'ipd_check_all'
			},
			"button#ipd_check_invert":{
				tap:'ipd_check_invert'
			},
			"button#ipd_batch_Init":{
				tap:'ipd_batch_Init'
			},
			"button#ipd_batch_Install":{
				tap:'ipd_batch_Install'
			},
			"button#ipd_batch_Enter":{
				tap:'ipd_batch_Enter'
			},
			"button#back_Instll_project_list":{
				tap:'back_Instll_project_list'
			},
			//提交批吊搭
			"button#commit_batch_init":{
				tap:'commit_batch_init'
			},
			//提交批安装
			"button#commit_batch_install":{
				tap:'commit_batch_install'
			},
			//提交批进场
			"button#commit_batch_enter":{
				tap:'commit_batch_enter'
			},
			//提交安装过程
			"button#CommitInstallProcess":{
				tap:'CommitInstallProcess'
			},
			
		}
	},
	
	
	//安装过程提交
	CommitInstallProcess : function(){
		var obj_this = this;
		//工序
		var gongxu = [];
		var gongxu_value = {};
		var show=[];
		var value={};
		var LIFT_STAFF=[];
		var BUILD_STAFF=[];
		var INSTALL_STAFF=[];
		var INST_STEP_CODE="";
		var ISCHECKED=true;
		
		//工序gongxu数据
		//直梯工序
		if(Ext.getCmp('ipd_ELEVATOR_CLASS_NAME').getValue()=="直梯"){
			if(Ext.getCmp('ZT_TMAZ').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			var dpf_tmaz = ""; // 厅门安装录入时间
			if(Ext.getCmp('dpf_tmaz').getValue() != null){
				dpf_tmaz = Ext.Date.format(Ext.getCmp('dpf_tmaz').getValue(),'Y-m-d');
			};
			gongxu[0]={INST_STEP_CODE:'ZT_TMAZ',ISCHECKED:ISCHECKED, INPUTTIME: dpf_tmaz};
			gongxu_value.ZT_TMAZ = ISCHECKED;
			gongxu_value.ZT_TMAZ_CONFIRM_DATE = dpf_tmaz;
			
			if(Ext.getCmp('ZT_JXDZ').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			var dpf_jxdzaz = ""; // 轿厢、对重安装时间
			if(Ext.getCmp('dpf_jxdzaz').getValue() != null){
				dpf_jxdzaz = Ext.Date.format(Ext.getCmp('dpf_jxdzaz').getValue(),'Y-m-d');
			};
			gongxu[1]={INST_STEP_CODE:'ZT_JXDZ',ISCHECKED:ISCHECKED, INPUTTIME: dpf_jxdzaz};
			gongxu_value.ZT_JXDZ = ISCHECKED;
			gongxu_value.ZT_JXDZ_CONFIRM_DATE = dpf_jxdzaz;
			
			if(Ext.getCmp('ZT_FX').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[2]={INST_STEP_CODE:'ZT_FX',ISCHECKED:ISCHECKED,INPUTTIME: step.ZT_FX};
			gongxu_value.ZT_FX = ISCHECKED;

			
			if(Ext.getCmp('ZT_CJ').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[3]={INST_STEP_CODE:'ZT_CJ',ISCHECKED:ISCHECKED,INPUTTIME: step.ZT_CJ};
			gongxu_value.ZT_CJ = ISCHECKED;
			
			if(Ext.getCmp('ZT_DGAZ').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			var dpf_dgaz = ""; // 导轨安装录入时间
			if(Ext.getCmp('dpf_dgaz').getValue() != null){
				dpf_dgaz = Ext.Date.format(Ext.getCmp('dpf_dgaz').getValue(),'Y-m-d');
			};
			gongxu[4]={INST_STEP_CODE:'ZT_DGAZ',ISCHECKED:ISCHECKED, INPUTTIME: dpf_dgaz};
			gongxu_value.ZT_DGAZ = ISCHECKED;
			gongxu_value.ZT_DGAZ_CONFIRM_DATE = dpf_dgaz;
			
			if(Ext.getCmp('ZT_JF').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[5]={INST_STEP_CODE:'ZT_JF',ISCHECKED:ISCHECKED,INPUTTIME: step.ZT_JF};
			gongxu_value.ZT_JF = ISCHECKED;

			if(Ext.getCmp('ZT_GZJ').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[6]={INST_STEP_CODE:'ZT_GZJ',ISCHECKED:ISCHECKED,INPUTTIME: step.ZT_GZJ};
			gongxu_value.ZT_GZJ = ISCHECKED;
		
			if(Ext.getCmp('ZT_TBMT').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[7]={INST_STEP_CODE:'ZT_TBMT',ISCHECKED:ISCHECKED,INPUTTIME: step.ZT_TBMT};
			gongxu_value.ZT_TBMT = ISCHECKED;
		
			if(Ext.getCmp('ZT_TJSMT').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[8]={INST_STEP_CODE:'ZT_TJSMT',ISCHECKED:ISCHECKED,INPUTTIME: step.ZT_TJSMT};
			gongxu_value.ZT_TJSMT = ISCHECKED;
			
			if(Ext.getCmp('ZT_DQJX').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[9]={INST_STEP_CODE:'ZT_DQJX',ISCHECKED:ISCHECKED,INPUTTIME: step.ZT_DQJX};
			gongxu_value.ZT_DQJX = ISCHECKED;
		
			if(Ext.getCmp('ZT_JDPJCC').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[10]={INST_STEP_CODE:'ZT_JDPJCC',ISCHECKED:ISCHECKED,INPUTTIME: step.ZT_JDPJCC};
			gongxu_value.ZT_JDPJCC = ISCHECKED;
			
			if(Ext.getCmp('ZT_GHCSN').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[11]={INST_STEP_CODE:'ZT_GHCSN',ISCHECKED:ISCHECKED,INPUTTIME: step.ZT_GHCSN};
			gongxu_value.ZT_GHCSN = ISCHECKED;
			
			if(Ext.getCmp('ZT_DLDY').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[12]={INST_STEP_CODE:'ZT_DLDY',ISCHECKED:ISCHECKED,INPUTTIME: step.ZT_DLDY};
			gongxu_value.ZT_DLDY = ISCHECKED;
		}else{
			//扶梯工序
			if(Ext.getCmp('FT_BJ').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[0]={INST_STEP_CODE:'FT_BJ',ISCHECKED:ISCHECKED,INPUTTIME: step.FT_BJ};
			gongxu_value.FT_BJ = ISCHECKED;
			
			if(Ext.getCmp('FT_BLCB').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[1]={INST_STEP_CODE:'FT_BLCB',ISCHECKED:ISCHECKED,INPUTTIME: step.FT_BLCB};
			gongxu_value.FT_BLCB = ISCHECKED;
			
			if(Ext.getCmp('FT_BLM').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[2]={INST_STEP_CODE:'FT_BLM',ISCHECKED:ISCHECKED,INPUTTIME: step.FT_BLM};
			gongxu_value.FT_BLM = ISCHECKED;
	
			if(Ext.getCmp('FT_DGDL').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[3]={INST_STEP_CODE:'FT_DGDL',ISCHECKED:ISCHECKED,INPUTTIME: step.FT_DGDL};
			gongxu_value.FT_DGDL = ISCHECKED;
			
			if(Ext.getCmp('FT_DLDY').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[4]={INST_STEP_CODE:'FT_DLDY',ISCHECKED:ISCHECKED,INPUTTIME: step.FT_DLDY};
			gongxu_value.FT_DLDY = ISCHECKED;
			
			if(Ext.getCmp('FT_DQJX').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[5]={INST_STEP_CODE:'FT_DQJX',ISCHECKED:ISCHECKED,INPUTTIME: step.FT_DQJX};
			gongxu_value.FT_DQJX = ISCHECKED;
			
			if(Ext.getCmp('FT_FSDZJ').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[6]={INST_STEP_CODE:'FT_FSDZJ',ISCHECKED:ISCHECKED,INPUTTIME: step.ZT_FX};
			gongxu_value.FT_FSDZJ = ISCHECKED;
			if(Ext.getCmp('FT_HJYJ').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[7]={INST_STEP_CODE:'FT_HJYJ',ISCHECKED:ISCHECKED,INPUTTIME: step.ZT_FX};
			gongxu_value.FT_HJYJ = ISCHECKED;
			
			if(Ext.getCmp('FT_NGB').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[8]={INST_STEP_CODE:'FT_NGB',ISCHECKED:ISCHECKED,INPUTTIME: step.ZT_FX};
			gongxu_value.FT_NGB = ISCHECKED;
			
			if(Ext.getCmp('FT_QB').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[9]={INST_STEP_CODE:'FT_QB',ISCHECKED:ISCHECKED,INPUTTIME: step.ZT_FX};
			gongxu_value.FT_QB = ISCHECKED;
			
			if(Ext.getCmp('FT_WGB').getValue() ==0){
				ISCHECKED = false;
			}else{
				ISCHECKED = true;
			}
			gongxu[10]={INST_STEP_CODE:'FT_WGB',ISCHECKED:ISCHECKED,INPUTTIME: step.ZT_FX};
			gongxu_value.FT_WGB = ISCHECKED;
			
		}
		
		//shou数据
		var WL_process=WL.JSONStore.get(collectionName);
		var ipd_ENGCONTRACT_NUMBER=Ext.getCmp('ipd_ENGCONTRACT_NUMBER').getValue();
		var ipd_ELEVATOR_NO=Ext.getCmp('ipd_ELEVATOR_NO').getValue();
		var ipd_SEQ_NUM=Ext.getCmp('ipd_SEQ_NUM').getValue();
		var query={tcode:init_person_id+"process",tid:ipd_ELEVATOR_NO+'_'+ipd_SEQ_NUM};
		var options={
	    		   exact:false,
	       }; 
		WL_process.find(query,options).then(function(res){
			show = res[0].json.stext;
			
			//吊装搭棚数据
			var ipd_LIFT_START_DATE = "";
			if(Ext.getCmp('ipd_LIFT_START_DATE').getValue() != null){
				ipd_LIFT_START_DATE = Ext.Date.format(Ext.getCmp('ipd_LIFT_START_DATE').getValue(),'Y-m-d');
			};
			var ipd_LIFT_END_DATE = "";
			if(Ext.getCmp('ipd_LIFT_END_DATE').getValue() != null){
				ipd_LIFT_END_DATE = Ext.Date.format(Ext.getCmp('ipd_LIFT_END_DATE').getValue(),'Y-m-d');
			};
			var ipd_BUILD_START_DATE = "";
			if(Ext.getCmp('ipd_BUILD_START_DATE').getValue() != null){
				ipd_BUILD_START_DATE = Ext.Date.format(Ext.getCmp('ipd_BUILD_START_DATE').getValue(),'Y-m-d');
			};
			var ipd_BUILD_END_DATE = "";
			if(Ext.getCmp('ipd_BUILD_END_DATE').getValue() != null){
				ipd_BUILD_END_DATE = Ext.Date.format(Ext.getCmp('ipd_BUILD_END_DATE').getValue(),'Y-m-d');
			};
			var ipd_InstSUSPEND_VENDOR = Ext.getCmp('ipd_InstSUSPEND_VENDOR').getValue();
			var ipd_SUSPEND_VENDOR_ID = Ext.getCmp('ipd_SUSPEND_VENDOR_ID').getValue();
			var ipd_INST_PERSON_ID = Ext.getCmp('ipd_INST_PERSON').getValue();
			var ipd_BUILD_VENDOR = Ext.getCmp('ipd_BUILD_VENDOR').getValue();
			var ipd_BUILD_VENDOR_ID = Ext.getCmp('ipd_BUILD_VENDOR_ID').getValue();
			var ipd_BUILD_PERSON_ID = Ext.getCmp('ipd_BUILD_PERSON').getValue();
			var ipd_dd_remark = Ext.getCmp('ipd_dd_remark').getValue();
			//出场数据
			var ipd_ENTRANCE_DATE = "";
			if(Ext.getCmp('ipd_ENTRANCE_DATE').getValue() != null){
				ipd_ENTRANCE_DATE = Ext.Date.format(Ext.getCmp('ipd_ENTRANCE_DATE').getValue(),'Y-m-d');
			};
			var ipd_ENTRANCE_ENTER_DATE = "";
			if(Ext.getCmp('ipd_ENTRANCE_ENTER_DATE').getValue() !=""){
				ipd_ENTRANCE_ENTER_DATE = Ext.Date.format(new Date(Ext.getCmp('ipd_ENTRANCE_ENTER_DATE').getValue()),'Y-m-d');
			};
			var ipd_INSTLL_VENDOR = Ext.getCmp('ipd_INSTLL_VENDOR').getValue();
			var ipd_INSTLL_VENDOR_ID = Ext.getCmp('ipd_INSTLL_VENDOR_ID').getValue();
			var ipd_INSTLL_PERSON_ID = Ext.getCmp('ipd_INSTLL_PERSON').getValue();
			var ipd_PLAN_START = "";
			if(Ext.getCmp('ipd_PLAN_START').getValue() != null){
				ipd_PLAN_START = Ext.Date.format(Ext.getCmp('ipd_PLAN_START').getValue(),'Y-m-d');
			};
			var ipd_PLAN_END = "";
			if(Ext.getCmp('ipd_PLAN_END').getValue() != null){
				ipd_PLAN_END = Ext.Date.format(Ext.getCmp('ipd_PLAN_END').getValue(),'Y-m-d');
			};
			var ipd_reportInstll = "";
			if(Ext.getCmp('ipd_reportInstll').getValue() != null){
				ipd_reportInstll = Ext.Date.format(Ext.getCmp('ipd_reportInstll').getValue(),'Y-m-d');
			};
			//安装数据
			var ipd_install_end_date = "";
			if(Ext.getCmp('ipd_install_end_date').getValue() != null){
				ipd_install_end_date = Ext.Date.format(Ext.getCmp('ipd_install_end_date').getValue(),'Y-m-d');
			};
			var ipd_report_test = "";
			if(Ext.getCmp('ipd_report_test').getValue() != null){
				ipd_report_test = Ext.Date.format(Ext.getCmp('ipd_report_test').getValue(),'Y-m-d');
			};
			var ipd_REPORT_DEBUG_ENTER_DATE = "";
			if(Ext.getCmp('ipd_REPORT_DEBUG_ENTER_DATE').getValue() != null){
				REPORT_DEBUG_ENTER_DATE = Ext.getCmp('ipd_REPORT_DEBUG_ENTER_DATE').getValue();
				if(REPORT_DEBUG_ENTER_DATE == ""){
					ipd_REPORT_DEBUG_ENTER_DATE = "";
				}else{
					str = new Date(REPORT_DEBUG_ENTER_DATE);
					ipd_REPORT_DEBUG_ENTER_DATE = Ext.Date.format(str,'Y-m-d');
				};
			};
			var ipd_quality_score = Ext.getCmp('ipd_quality_score').getValue();
			var ipd_stall_score = Ext.getCmp('ipd_stall_score').getValue();
			var ipd_envir_score = Ext.getCmp('ipd_envir_score').getValue();
			var ipd_MID_CHECK_PERSON_ID = Ext.getCmp('ipd_MID_CHECK_PERSON_ID').getValue();
			var ipd_ZJJ_DATE = "";
			if(Ext.getCmp('ipd_ZJJ_DATE').getValue() != null){
				ipd_ZJJ_DATE = Ext.Date.format(Ext.getCmp('ipd_ZJJ_DATE').getValue(),'Y-m-d');
			};
			var ipd_imp_result = Ext.getCmp('ipd_imp_result').getValue();
			var ipd_CB_1 = Ext.getCmp('ipd_CB_1').getValue();
			var ipd_CB_2 = Ext.getCmp('ipd_CB_2').getValue();
			var ipd_CB_3 = Ext.getCmp('ipd_CB_3').getValue();
			var ipd_CB_4 = Ext.getCmp('ipd_CB_4').getValue();
			var ipd_CB_5 = Ext.getCmp('ipd_CB_5').getValue();
			var ipd_ZZ = Ext.getCmp('ipd_ZZ').getValue();
			var ipd_INSTALL_HEADER_ID = Ext.getCmp('ipd_INSTALL_HEADER_ID').getValue();
			var ipd_ZZ_TEL = Ext.getCmp('ipd_ZZ_TEL').getValue();
			var ipd_install_remark = Ext.getCmp('ipd_install_remark').getValue();
			
			LIFT_STAFF = [];
			BUILD_STAFF = [];
			INSTALL_STAFF = [];
			
			//吊装人员列表
			var InstPersonNameStore=obj_this.getStore('InstPersonNameStore','HelcPDA.store.install.installprocess.InstPersonNameStore');
			var instPersonlist = InstPersonNameStore.data.items;
			for(var i=0;i<instPersonlist.length;i++){
				LIFT_STAFF[i] = {id: instPersonlist[i].data.INST_PERSON_ID,name:instPersonlist[i].data.PERSON_NAME};
			};
			//搭棚人员列表
			var BuildPersonNameStore=obj_this.getStore('BuildPersonNameStore','HelcPDA.store.install.installprocess.BuildPersonNameStore');
			var buildPersonlist = BuildPersonNameStore.data.items;
			for(var i=0;i<buildPersonlist.length;i++){
				BUILD_STAFF[i] = {id: buildPersonlist[i].data.BUILD_PERSON_ID,name: buildPersonlist[i].data.PERSON_NAME};
			};
			//安装人员列表
			var InstllPersonNameStore=obj_this.getStore('InstllPersonNameStore','HelcPDA.store.install.installprocess.InstllPersonNameStore');
			var instllPersonlist = InstllPersonNameStore.data.items;
			for(var i=0;i<instllPersonlist.length;i++){
				INSTALL_STAFF[i] = {id: instllPersonlist[i].data.INSTLL_PERSON_ID,name:instllPersonlist[i].data.PERSON_NAME,startDate:instllPersonlist[i].data.PLAN_START,endDate:instllPersonlist[i].data.PLAN_END};
			};
			//插入时间戳，多条数据提交时按这个时间顺序提交
			var Nowtime = obj_this.NowDayTime();
			
			value={LIFT_START_DATE:ipd_LIFT_START_DATE,LIFT_END_DATE:ipd_LIFT_END_DATE,SUSPEND_VENDOR_ID:ipd_SUSPEND_VENDOR_ID,
					LIFT_PERSON_ID:ipd_INST_PERSON_ID,BUILD_PERSON_ID:ipd_BUILD_PERSON_ID,
					BUILD_START_DATE:ipd_BUILD_START_DATE,BUILD_END_DATE:ipd_BUILD_END_DATE,BUILD_VENDOR_ID:ipd_BUILD_VENDOR_ID,
					LIFT_COMMENTS:ipd_dd_remark,
					
					INST_VENDOR_ID:ipd_INSTLL_VENDOR_ID,ENTRANCE_DATE:ipd_ENTRANCE_DATE,
					ENTRANCE_ENTER_DATE:ipd_ENTRANCE_ENTER_DATE,REPORT_INSTALL_DATE:ipd_reportInstll,
					
					INSTALL_FINISH_DATE:ipd_install_end_date,
					QA_VALUE:ipd_quality_score,INST_VALUE:ipd_stall_score,ENCIRCLE_VALUE:ipd_envir_score,MID_CHECK_PERSON_ID:ipd_MID_CHECK_PERSON_ID,
					MID_CHECK_DATE:ipd_ZJJ_DATE,KEN_CHECK_RESULT:ipd_imp_result,REPORT_DEBUG_DATE:ipd_report_test,REPORT_DEBUG_ENTER_DATE:ipd_REPORT_DEBUG_ENTER_DATE,
					INSTTALL_COMMENTS:ipd_install_remark,CB_1:ipd_CB_1,CB_2:ipd_CB_2,CB_3:ipd_CB_3,CB_4:ipd_CB_4,CB_5:ipd_CB_5,
					INSTALL_HEADER_ID:ipd_INSTALL_HEADER_ID,INSTALL_HEADER:ipd_ZZ,TEL:ipd_ZZ_TEL,LIFT_STAFF:LIFT_STAFF,BUILD_STAFF:BUILD_STAFF,INSTALL_STAFF:INSTALL_STAFF
			};
			
			var content={init_person_id:init_person_id,LIFT_VENDOR_ID:ipd_SUSPEND_VENDOR_ID,BUILD_VENDOR_ID:ipd_BUILD_VENDOR_ID,INST_VENDOR_ID:ipd_INSTLL_VENDOR_ID,gongxu:gongxu,show:show,value:value,Nowtime:Nowtime,PDA_flag:"PDA3"};
			//保存数据到本地
			//吊装搭棚
			show.VALUE.LIFT_START_DATE = ipd_LIFT_START_DATE;
			show.VALUE.LIFT_END_DATE = ipd_LIFT_END_DATE;
			show.VALUE.BUILD_START_DATE = ipd_BUILD_START_DATE;
			show.VALUE.BUILD_END_DATE = ipd_BUILD_END_DATE;
			show.VALUE.SUSPEND_VENDOR = ipd_InstSUSPEND_VENDOR;
			show.VALUE.SUSPEND_VENDOR_ID = ipd_SUSPEND_VENDOR_ID;
			show.VALUE.LIFT_PERSON_ID = ipd_INST_PERSON_ID;
			show.VALUE.BUILD_PERSON_ID = ipd_BUILD_PERSON_ID;
			show.VALUE.BUILD_VENDOR_ID = ipd_BUILD_VENDOR_ID;
			show.VALUE.BUILD_VENDOR = ipd_BUILD_VENDOR;
			show.VALUE.LIFT_COMMENTS = ipd_dd_remark;
			show.VALUE.LIFT_STAFF = LIFT_STAFF;
			show.VALUE.BUILD_STAFF = BUILD_STAFF;
			show.VALUE.INSTALL_STAFF = INSTALL_STAFF;
			//进场
			show.VALUE.ENTRANCE_DATE = ipd_ENTRANCE_DATE;
			show.VALUE.INST_VENDOR_ID = ipd_INSTLL_VENDOR_ID;
			show.VALUE.INST_VENDOR = ipd_INSTLL_VENDOR;
			show.VALUE.ENTRANCE_ENTER_DATE = ipd_ENTRANCE_ENTER_DATE;
			show.VALUE.REPORT_INSTALL_DATE = ipd_reportInstll;
			show.VALUE.INSTALL_FINISH_DATE = ipd_install_end_date;
			show.VALUE.REPORT_DEBUG_DATE = ipd_report_test;
			//安装
			show.GONGXU = gongxu;
			show.GONGXU_VALUE = gongxu_value;
			if(typeof(show.VALUE.QA_VALUE) !="undefined"){
				show.VALUE.QA_VALUE=ipd_quality_score;
			};
			if(typeof(show.VALUE.INST_VALUE) !="undefined"){
				show.VALUE.INST_VALUE=ipd_stall_score;
			};
			if(typeof(show.VALUE.ENCIRCLE_VALUE) !="undefined"){
				show.VALUE.ENCIRCLE_VALUE=ipd_envir_score;
			};
			show.VALUE.MID_CHECK_PERSON_ID = ipd_MID_CHECK_PERSON_ID;
			show.VALUE.MID_CHECK_DATE = ipd_ZJJ_DATE;
			show.VALUE.KEN_CHECK_RESULT = ipd_imp_result;
			if(typeof(show.VALUE.CB_1) !="undefined"){
				show.VALUE.CB_1=ipd_CB_1;
			};
			if(typeof(show.VALUE.CB_2) !="undefined"){
				show.VALUE.CB_2=ipd_CB_2;
			};
			if(typeof(show.VALUE.CB_3) !="undefined"){
				show.VALUE.CB_3=ipd_CB_3;
			};
			if(typeof(show.VALUE.CB_4) !="undefined"){
				show.VALUE.CB_4=ipd_CB_4;
			};
			if(typeof(show.VALUE.CB_5) !="undefined"){
				show.VALUE.CB_5=ipd_CB_5;
			};
			show.VALUE.INSTALL_HEADER = ipd_ZZ;
			show.VALUE.INSTALL_HEADER_ID = ipd_INSTALL_HEADER_ID;
			show.VALUE.TEL = ipd_ZZ_TEL;
			show.VALUE.INSTTALL_COMMENTS = ipd_install_remark;
			
			//把数据保存在本地
			res[0].json.stext = show;
			
			
			if(res[0].json.status == 1){
				WL.Toast.show("数据已进入待提交队列，请勿重复提交");
			}else{
				//刷新数据
				var options = {};
				WL.JSONStore.get(collectionName).refresh(res[0],options).then(function(){
					//状态
					var status = "";
					if(ipd_report_test != ""){
						status = "REPORT_DEBUG_DATE";
					}else if(ipd_ENTRANCE_DATE != ""){
						status = "ENTRANCE_DATE";
					}else if(ipd_LIFT_END_DATE != "" && ipd_BUILD_END_DATE != ""){
						status = "BUILD_END_DATE";
					}else if(ipd_LIFT_END_DATE == "" || ipd_BUILD_END_DATE == ""){
						status = "";
					};
					
					
					var query11={tcode:init_person_id+"status",tid:ipd_ENGCONTRACT_NUMBER+'_'+ipd_ELEVATOR_NO+'_'+ipd_SEQ_NUM};
					var options={exact:false};
					WL_process.remove(query11,options).then(function(){
						var query22={tcode:init_person_id+"status",tid:ipd_ENGCONTRACT_NUMBER+'_'+ipd_ELEVATOR_NO+'_'+ipd_SEQ_NUM,stext:status};
						WL_process.add(query22).then(function(){
							//离线提交
							//配置数据
							var ext1={};
							var tempExt={};
							var obj={};
							ext1.url='installProcessAction.do?method=toAdd';
							tempExt.msg_title='安装过程';
							tempExt.msg_body=ipd_ELEVATOR_NO;
							tempExt.msg_result='已进入待提交队列';//'正在等待提交';
							obj=res[0];
							ext1.msg=tempExt;
							ext1.obj = obj;
							ext1.cparam = ipd_ENGCONTRACT_NUMBER;
							ext1.view_id='install.installprocess.Installprocess_List_Ctrl';
							query1={tid:"AZGC",tcode:'UNCOMMIT_AZGC',stext:content,ext1:ext1,status:'1'};
							res[0].json.status = 1; 
							WL.JSONStore.get(collectionName).add(query1).then(function(){
								WL.JSONStore.get(collectionName).refresh(res[0]).then(function(){
									
									WL.Toast.show('已进入待提交队列');
								}).fail(function(){
									Ext.Msg.alert("删除本地数据失败");
								});
								
							});
						}).fail(function(){
							Ext.Msg.alert("删除本地数据失败");
						});
					});
					
				});
			}
			
			
		});
		
		
	},
	
	//批吊搭提交
	commit_batch_init : function(){
		var obj_this = this;
		E_index = Ext.getCmp('ip_E_XB').getValue();
		var newXB = E_index.split(',');
		var index = newXB;
		var obj={};
		var objdata=[];
		//工序
		var gongxu = [];
		var show=[];
		var value={};
		var LIFT_STAFF=[];
		var BUILD_STAFF=[];
		var INSTALL_STAFF=[];
		var INST_STEP_CODE=[];
		var ISCHECKED=[];
		var ProcessGHStore = obj_this.getStore("ProcessGHStore","HelcPDA.store.install.installprocess.ProcessGHStore");
		var content=[];
		var cs = 0;
		
		//取到合同号下所有工号信息
		var WL_process=WL.JSONStore.get(collectionName);
		var ENGCONTRACT_NUMBER=ProcessGHStore.getAt(index[0]).get('ENGCONTRACT_NUMBER');
		var query={tcode:init_person_id+"process",tid:ENGCONTRACT_NUMBER};
		var options={
	    		   exact:false,
	       }; 
		WL_process.find(query,options).then(function(res_value){
			var statusquery={tcode:init_person_id+"status",tid:ENGCONTRACT_NUMBER};
			var options={
		    		   exact:false,
		       }; 
			WL_process.find(statusquery,options).then(function(res_status){
			for(var ai=0;ai<index.length;ai++){
				var ELEVATOR_NO=ProcessGHStore.getAt(index[ai]).get('ELEVATOR_NO');
				var SEQ_NUM=ProcessGHStore.getAt(index[ai]).get('SEQ_NUM');
				//show.VALUE
				for(var j = 0; j<res_value.length; j++){
					if (ELEVATOR_NO == res_value[j].json.stext.ELEVATOR_NO && SEQ_NUM == res_value[j].json.stext.SEQ_NUM) {
						show = res_value[j].json.stext;
						//吊装搭棚数据
						if(Ext.getCmp('ipd_LIFT_START_DATE').getValue() != null){
							show.VALUE.LIFT_START_DATE = Ext.Date.format(Ext.getCmp('ipd_LIFT_START_DATE').getValue(),'Y-m-d');
						};
						if(Ext.getCmp('ipd_LIFT_END_DATE').getValue() != null){
							show.VALUE.LIFT_END_DATE = Ext.Date.format(Ext.getCmp('ipd_LIFT_END_DATE').getValue(),'Y-m-d');
						};
						if(Ext.getCmp('ipd_BUILD_START_DATE').getValue() != null){
							show.VALUE.BUILD_START_DATE = Ext.Date.format(Ext.getCmp('ipd_BUILD_START_DATE').getValue(),'Y-m-d');
						};
						if(Ext.getCmp('ipd_BUILD_END_DATE').getValue() != null){
							show.VALUE.BUILD_END_DATE = Ext.Date.format(Ext.getCmp('ipd_BUILD_END_DATE').getValue(),'Y-m-d');
						};
						if(Ext.getCmp('ipd_INST_PERSON').getValue() !=null){
							show.VALUE.INST_PERSON_ID = Ext.getCmp('ipd_INST_PERSON').getValue();
						}
						if(Ext.getCmp('ipd_BUILD_PERSON').getValue() !=null){
							show.VALUE.BUILD_PERSON_ID = Ext.getCmp('ipd_BUILD_PERSON').getValue();
						}
						//吊装人员列表..
						var InstPersonNameStore=obj_this.getStore('InstPersonNameStore','HelcPDA.store.install.installprocess.InstPersonNameStore');
						var instPersonlist = InstPersonNameStore.data.items;
						if(instPersonlist.length!=0){
							for(var i=0;i<instPersonlist.length;i++){
								LIFT_STAFF[i] = {id: instPersonlist[i].data.INST_PERSON_ID,name:instPersonlist[i].data.PERSON_NAME};
							};
							show.VALUE.LIFT_STAFF = LIFT_STAFF;
						}
						//搭棚人员列表..
						var BuildPersonNameStore=obj_this.getStore('BuildPersonNameStore','HelcPDA.store.install.installprocess.BuildPersonNameStore');
						var buildPersonlist = BuildPersonNameStore.data.items;
						if(buildPersonlist.length!=0){
							for(var i=0;i<buildPersonlist.length;i++){
								BUILD_STAFF[i] = {id: buildPersonlist[i].data.BUILD_PERSON_ID,name: buildPersonlist[i].data.PERSON_NAME};
							}
							show.VALUE.BUILD_STAFF = BUILD_STAFF;
						}
						
						//吊装服务商
						var ipd_SUSPEND_VENDOR_ID = show.LIFT_VENDOR_ID;
						if(show.VALUE.SUSPEND_VENDOR_ID != "" && show.VALUE.SUSPEND_VENDOR_ID != null && typeof(show.VALUE.SUSPEND_VENDOR_ID)!="undefined"){
							ipd_SUSPEND_VENDOR_ID = show.VALUE.SUSPEND_VENDOR_ID;
						}
						if(Ext.getCmp('ipd_SUSPEND_VENDOR_ID').getValue() !=null && Ext.getCmp('ipd_SUSPEND_VENDOR_ID').getValue() !=""){
							show.VALUE.SUSPEND_VENDOR_ID = Ext.getCmp('ipd_SUSPEND_VENDOR_ID').getValue();
							ipd_SUSPEND_VENDOR_ID = Ext.getCmp('ipd_SUSPEND_VENDOR_ID').getValue();
						}
						//搭棚服务商
						var ipd_BUILD_VENDOR_ID = show.BUILD_VENDOR_ID;
						if(show.VALUE.BUILD_VENDOR_ID != "" && show.VALUE.BUILD_VENDOR_ID != null && typeof(show.VALUE.BUILD_VENDOR_ID)!="undefined"){
							ipd_BUILD_VENDOR_ID = show.VALUE.BUILD_VENDOR_ID;
						}
						if(Ext.getCmp('ipd_BUILD_VENDOR_ID').getValue() !=null && Ext.getCmp('ipd_BUILD_VENDOR_ID').getValue() !=""){
							show.VALUE.BUILD_VENDOR_ID = Ext.getCmp('ipd_BUILD_VENDOR_ID').getValue();
							ipd_BUILD_VENDOR_ID = Ext.getCmp('ipd_BUILD_VENDOR_ID').getValue();
						}
						//安装服务商
						var ipd_INSTLL_VENDOR_ID = show.INST_VENDOR_ID;
						if(show.VALUE.INSTLL_VENDOR_ID != "" && show.VALUE.INSTLL_VENDOR_ID != null && typeof(show.VALUE.INSTLL_VENDOR_ID)!="undefined"){
							ipd_INSTLL_VENDOR_ID = show.VALUE.INSTLL_VENDOR_ID;
						}
						
						//吊搭备注
						if(Ext.getCmp('ipd_dd_remark').getValue() !=null && Ext.getCmp('ipd_dd_remark').getValue() !=""){
							show.VALUE.LIFT_COMMENTS = Ext.getCmp('ipd_dd_remark').getValue();
						}
						
						//把页面上的数据更新到本地
						res_value[j].json.stext = show;
						//插入时间戳，多条数据提交时按这个时间顺序提交
						var Nowtime = obj_this.NowDayTime();
						value=show.VALUE;
						var contentdata={init_person_id:init_person_id,LIFT_VENDOR_ID:ipd_SUSPEND_VENDOR_ID,BUILD_VENDOR_ID:ipd_BUILD_VENDOR_ID,INST_VENDOR_ID:ipd_INSTLL_VENDOR_ID,gongxu:gongxu,show:show,value:value,Nowtime:Nowtime,PDA_falg:'PDA3'};
						content[cs] = contentdata;
						
						
						res_value[j].json.status = 1;
						objdata[cs] = res_value[j];
						cs++;
					}
				};
				
				
				
				//status
				for (var j = 0;j<res_status.length;j++) {
					var status_elevator_no = res_status[j].json.tid.substring(9,18);
					var status_seq_num = res_status[j].json.tid.substring(18,19);
					if (ELEVATOR_NO == status_elevator_no && SEQ_NUM == status_seq_num) {
						show = res_value[j].json.stext;
						var ipd_report_test = show.VALUE.REPORT_DEBUG_DATE;
						var ipd_ENTRANCE_DATE = show.VALUE.ENTRANCE_DATE;
						var ipd_LIFT_END_DATE = "";
						if(Ext.getCmp('ipd_LIFT_END_DATE').getValue() != null){
							ipd_LIFT_END_DATE = Ext.Date.format(Ext.getCmp('ipd_LIFT_END_DATE').getValue(),'Y-m-d');
						};
						var ipd_BUILD_END_DATE = "";
						if(Ext.getCmp('ipd_BUILD_END_DATE').getValue() != null){
							ipd_BUILD_END_DATE = Ext.Date.format(Ext.getCmp('ipd_BUILD_END_DATE').getValue(),'Y-m-d');
						};
						
						var status = "";
						if(ipd_report_test != "点击选择时间"){
							status = "REPORT_DEBUG_DATE";
						}else if(ipd_ENTRANCE_DATE != "点击选择时间"){
							status = "ENTRANCE_DATE";
						}else if(ipd_LIFT_END_DATE != ""){
							if(ipd_BUILD_END_DATE != ""){
								status = "BUILD_END_DATE";
							}
						}else if(ipd_LIFT_END_DATE ==""){
							if(ipd_BUILD_END_DATE ==""){
								status = "";
							}
						};
						
						res_status[j].json.stext = status;
						break;
						
					}
				}
				
			}
			
			
			// 刷新JSONSTORE数据
			WL_process.replace(res_value).then(function(arrayResults2){
				WL_process.replace(res_status).then(function(arrayResults2){
					//配置数据
					obj.data = objdata;
					var ext1={};
					var tempExt={};
					tempExt.msg_title='安装过程批吊搭';
					tempExt.msg_body=ELEVATOR_NO;
					tempExt.msg_result='已进入待提交队列';//'正在等待提交';
					obj.isArray = true;
					ext1.url='installProcessAction.do?method=toVolumeAdd';
					ext1.msg=tempExt;
					ext1.obj = obj;
					ext1.cparam = ENGCONTRACT_NUMBER;
					ext1.view_id='install.installprocess.Installprocess_List_Ctrl';
					query1={tid:"CJRW_PDD",tcode:'UNCOMMIT_CJRW_PDD',stext:content,ext1:ext1,status:'1'};
					
					WL.JSONStore.get(collectionName).add(query1).then(function(){
					}).fail(function(){}); 
					
					
					obj_this.NextView('installProcess_EnoList_V','HelcPDA.view.install.installprocess.InstallProcess_EnoList_V');
					obj_this.LoadGHlist(ENGCONTRACT_NUMBER);
					WL.Toast.show('已进入待提交队列');
				}).fail(function(errorObject){
					Ext.Msg.alert("删除本地状态失败");
				});
			}).fail(function(errorObject){
				Ext.Msg.alert("删除本地状态失败");
			});
			
			
			});
		});
		step={};
	},
	
	
	//批进场提交
	commit_batch_enter : function(){
		WL.ClientMessages.loading = "正在处理";
		myLoading = new WL.BusyIndicator('content');
		var obj_this = this;
		E_index = Ext.getCmp('ip_E_XB').getValue();
		var newXB = E_index.split(',');
		var index = newXB;
		var objdata=[];
		var obj={};
		//工序
		var gongxu = [];
		var show=[];
		var value={};
		var LIFT_STAFF=[];
		var BUILD_STAFF=[];
		var INSTALL_STAFF=[];
		var INST_STEP_CODE=[];
		var ISCHECKED=[];
		var UN_enter = 0;
		var ProcessGHStore = obj_this.getStore("ProcessGHStore","HelcPDA.store.install.installprocess.ProcessGHStore");
		var content=[];
		var cs=0;
		
		//取到合同号下所有工号信息
		var WL_process=WL.JSONStore.get(collectionName);
		var ENGCONTRACT_NUMBER=ProcessGHStore.getAt(index[0]).get('ENGCONTRACT_NUMBER')
		var query={tcode:init_person_id+"process",tid:ENGCONTRACT_NUMBER};
		var options={
	    		   exact:false,
	       }; 
		WL_process.find(query,options).then(function(res_value){
			var statusquery={tcode:init_person_id+"status",tid:ENGCONTRACT_NUMBER};
			var options={
		    		   exact:false,
		       }; 
			WL_process.find(statusquery,options).then(function(res_status){
			for(var ai=0;ai<index.length;ai++){
				var ELEVATOR_NO=ProcessGHStore.getAt(index[ai]).get('ELEVATOR_NO');
				var SEQ_NUM=ProcessGHStore.getAt(index[ai]).get('SEQ_NUM');
				//show.VALUE
				for(var j = 0; j<res_value.length; j++){
					if (ELEVATOR_NO == res_value[j].json.stext.ELEVATOR_NO && SEQ_NUM == res_value[j].json.stext.SEQ_NUM) {
						 
						show = res_value[j].json.stext;
						var ipd_INV_OUT_DATE = show.INV_OUT_DATE;
						var ipd_SUSPEND_VENDOR_ID = show.LIFT_VENDOR_ID;
						if(show.VALUE.SUSPEND_VENDOR_ID==""){
							ipd_SUSPEND_VENDOR_ID = Ext.getCmp('ipd_INSTLL_VENDOR').getValue();
						}
						var ipd_BUILD_VENDOR_ID = show.VALUE.BUILD_VENDOR_ID;
						var ipd_INSTLL_VENDOR_ID = show.INST_VENDOR_ID;
						//如果未达到进场要求，填写的数据不保存
						if(ipd_INV_OUT_DATE == "点击选择时间" ||ipd_INV_OUT_DATE==""||ipd_INV_OUT_DATE==null){
							UN_enter++;
						}else{
							//进场数据
							if(Ext.getCmp('ipd_batch_ENTRANCE_DATE').getValue() != null){
								show.VALUE.ENTRANCE_DATE = Ext.Date.format(Ext.getCmp('ipd_batch_ENTRANCE_DATE').getValue(),'Y-m-d');
							};
							if(Ext.getCmp('ipd_batch_ENTRANCE_ENTER_DATE').getValue() !=""){
								show.VALUE.ENTRANCE_ENTER_DATE = Ext.Date.format(new Date(Ext.getCmp('ipd_batch_ENTRANCE_ENTER_DATE').getValue()),'Y-m-d');
							};
							if(Ext.getCmp('ipd_INSTLL_VENDOR').getValue() != null){
								show.VALUE.SUSPEND_VENDOR = Ext.getCmp('ipd_INSTLL_VENDOR').getValue();
							};
							//安装人员列表..
							var InstllPersonNameStore=obj_this.getStore('InstllPersonNameStore','HelcPDA.store.install.installprocess.InstllPersonNameStore');
							var instllPersonlist = InstllPersonNameStore.data.items;
							if(instllPersonlist.length!=0){
								for(var i=0;i<instllPersonlist.length;i++){
									INSTALL_STAFF[i] = {id: instllPersonlist[i].data.INSTLL_PERSON_ID,name:instllPersonlist[i].data.PERSON_NAME,startDate:instllPersonlist[i].data.PLAN_START,endDate:instllPersonlist[i].data.PLAN_END};
								};
								show.VALUE.INSTALL_STAFF = INSTALL_STAFF;
							}
							if(Ext.getCmp('ipd_INSTLL_VENDOR_ID').getValue() != null){
								show.VALUE.SUSPEND_VENDOR_ID = Ext.getCmp('ipd_INSTLL_VENDOR_ID').getValue();
							};
							if(Ext.getCmp('ipd_reportInstll').getValue() != null){
								show.VALUE.REPORT_INSTALL_DATE = Ext.Date.format(Ext.getCmp('ipd_reportInstll').getValue(),'Y-m-d');
							};
							
							
							res_value[j].json.status = 1;
						}
						
						value=show.VALUE;
						//插入时间戳，多条数据提交时按这个时间顺序提交
						var Nowtime = obj_this.NowDayTime();
						var contentdata={init_person_id:init_person_id,LIFT_VENDOR_ID:ipd_SUSPEND_VENDOR_ID,BUILD_VENDOR_ID:ipd_BUILD_VENDOR_ID,INST_VENDOR_ID:ipd_INSTLL_VENDOR_ID,gongxu:gongxu,show:show,value:value,Nowtime:Nowtime,PDA_falg:'PDA3'};
						content[cs] = contentdata;
						
						
						res_value[j].json.stext  = show;
						objdata[cs] = res_value[j];
						cs++;
					}
				};
				
				
				//status
				for (var j = 0;j<res_status.length;j++) {
					var status_elevator_no = res_status[j].json.tid.substring(9,18);
					var status_seq_num = res_status[j].json.tid.substring(18,19);
					if (ELEVATOR_NO == status_elevator_no && SEQ_NUM == status_seq_num) {
						show = res_value[j].json.stext;
						var ipd_report_test = show.VALUE.REPORT_DEBUG_DATE;
						var ipd_ENTRANCE_DATE = "";
						if(Ext.getCmp('ipd_ENTRANCE_DATE').getValue() != null){
							ipd_ENTRANCE_DATE = Ext.Date.format(Ext.getCmp('ipd_ENTRANCE_DATE').getValue(),'Y-m-d');
						};
						var ipd_LIFT_END_DATE = show.VALUE.LIFT_END_DATE;
						var ipd_BUILD_END_DATE = show.VALUE.BUILD_END_DATE;
						
						var status = "";
						if(ipd_report_test != "点击选择时间"){
							status = "REPORT_DEBUG_DATE";
						}else if(ipd_ENTRANCE_DATE != ""){
							if(ipd_LIFT_END_DATE == "点击选择时间" ||ipd_BUILD_END_DATE=="点击选择时间"){
								status = "";
							}else{
								status = "ENTRANCE_DATE";
							}
						}
						
						res_status[j].json.stext = status;
						break;
						
					}
				}
				
			}
			
			// 刷新JSONSTORE数据
			WL_process.replace(res_value).then(function(arrayResults2){
				WL_process.replace(res_status).then(function(arrayResults2){
					//配置数据
					obj.data = objdata;
					var ext1={};
					var tempExt={};
					tempExt.msg_title='安装过程批进场';
					tempExt.msg_body=ELEVATOR_NO;
					tempExt.msg_result='已进入待提交队列';//'正在等待提交';
					obj.isArray = true;
					ext1.url='installProcessAction.do?method=toVolumeAdd';
					ext1.msg=tempExt;
					ext1.obj = obj;
					ext1.cparam = ENGCONTRACT_NUMBER;
					ext1.view_id='install.installprocess.Installprocess_List_Ctrl';
					query1={tid:"CJRW_PJC",tcode:'UNCOMMIT_CJRW_PJC',stext:content,ext1:ext1,status:'1'};
					WL.JSONStore.get(collectionName).add(query1).then(function(){
					}).fail(function(){}); 
					
					obj_this.NextView('installProcess_EnoList_V','HelcPDA.view.install.installprocess.InstallProcess_EnoList_V');
					obj_this.LoadGHlist(ENGCONTRACT_NUMBER);
					if(UN_enter !=0){
						WL.Toast.show('有'+UN_enter+'台电梯未满足进场要求,满足要求电梯已进入待提交队列');
					}else{
						WL.Toast.show('已进入待提交队列');
					}
					
					WL.ClientMessages.loading = "加载数据中";
					myLoading = new WL.BusyIndicator('content');
				}).fail(function(errorObject){
					Ext.Msg.alert("删除本地状态失败");
				});
			}).fail(function(errorObject){
				Ext.Msg.alert("删除本地状态失败");
			});
			
			
			});
		});
		
	},
	
	//批安装提交
	commit_batch_install : function(){
		WL.ClientMessages.loading = "正在处理";
		myLoading = new WL.BusyIndicator('content');
		var obj_this = this;
		E_index = Ext.getCmp('ip_E_XB').getValue();
		var newXB = E_index.split(',');
		var index = newXB;
		var obj={};
		var objdata=[];
		//工序
		var gongxu = [];
		var gongxu_value = {};
		var show=[];
		var value={};
		var LIFT_STAFF=[];
		var BUILD_STAFF=[];
		var INSTALL_STAFF=[];
		var INST_STEP_CODE=[];
		var ISCHECKED=[];
		var UN_install = 0;
		var ProcessGHStore = obj_this.getStore("ProcessGHStore","HelcPDA.store.install.installprocess.ProcessGHStore");
		var content=[];
		var cs=0;
		
		//取到合同号下所有工号信息
		var WL_process=WL.JSONStore.get(collectionName);
		var ENGCONTRACT_NUMBER=ProcessGHStore.getAt(index[0]).get('ENGCONTRACT_NUMBER')
		var query={tcode:init_person_id+"process",tid:ENGCONTRACT_NUMBER};
		var options={
	    		   exact:false,
	       }; 
		WL_process.find(query,options).then(function(res_value){
			var statusquery={tcode:init_person_id+"status",tid:ENGCONTRACT_NUMBER};
			var options={
		    		   exact:false,
		       }; 
			WL_process.find(statusquery,options).then(function(res_status){
			for(var i=0;i<index.length;i++){
				var ELEVATOR_NO=ProcessGHStore.getAt(index[i]).get('ELEVATOR_NO');
				var SEQ_NUM=ProcessGHStore.getAt(index[i]).get('SEQ_NUM');
				//show.VALUE
				for(var j = 0; j<res_value.length; j++){
					if (ELEVATOR_NO == res_value[j].json.stext.ELEVATOR_NO && SEQ_NUM == res_value[j].json.stext.SEQ_NUM) {
						
						show = res_value[j].json.stext;
						var ipd_SUSPEND_VENDOR_ID = show.LIFT_VENDOR_ID;
						if(show.VALUE.SUSPEND_VENDOR_ID==""){
							ipd_SUSPEND_VENDOR_ID = Ext.getCmp('ipd_INSTLL_VENDOR').getValue();
						}
						var ipd_BUILD_VENDOR_ID = show.VALUE.BUILD_VENDOR_ID;
						var ipd_INSTLL_VENDOR_ID = show.INST_VENDOR_ID;
						var ipd_ENTRANCE_DATE = show.VALUE.ENTRANCE_DATE;
						//安装数据
						//如果未达到安装的条件，不保存页面的数据
						if(ipd_ENTRANCE_DATE == "点击选择时间" || ipd_ENTRANCE_DATE == "" ||ipd_ENTRANCE_DATE == null){
							UN_install++;
						}else{
							//工序gongxu数据
							//直梯工序
							if(res_value[j].json.stext.ELEVATOR_CLASS_NAME=="直梯"){
								if(Ext.getCmp('ZT_TMAZ_P').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								var dpf_tmaz = "";
								if(Ext.getCmp('dpf_tmaz_p').getValue() != null){
									dpf_tmaz = Ext.Date.format(Ext.getCmp('dpf_tmaz_p').getValue(),'Y-m-d');
								};
								gongxu[0]={ELEVATOR_CLASS_CODE: "ZT",INST_STEP_CODE:'ZT_TMAZ',INST_STEP_NAME: "直梯_厅门安装",ISCHECKED:ISCHECKED,SEQ: "70", INPUTTIME:dpf_tmaz};
								gongxu_value.ZT_TMAZ = ISCHECKED;
								gongxu_value.ZT_TMAZ_CONFIRM_DATE = dpf_tmaz; 
								
								if(Ext.getCmp('ZT_JXDZ_P').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								var dpf_jxdzaz = "";
								if(Ext.getCmp('dpf_jxdzaz_p').getValue() != null){
									dpf_jxdzaz = Ext.Date.format(Ext.getCmp('dpf_jxdzaz_p').getValue(),'Y-m-d');
								};
								gongxu[1]={ELEVATOR_CLASS_CODE: "ZT",INST_STEP_CODE:'ZT_JXDZ',INST_STEP_NAME: "直梯_轿厢、对重安装",ISCHECKED:ISCHECKED,SEQ: "100", INPUTTIME: dpf_jxdzaz};
								gongxu_value.ZT_JXDZ = ISCHECKED;
								gongxu_value.ZT_JXDZ_CONFIRM_DATE = dpf_jxdzaz;
								
								if(Ext.getCmp('ZT_FX').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[2]={ELEVATOR_CLASS_CODE: "ZT",INST_STEP_CODE:'ZT_FX',INST_STEP_NAME: "直梯_放线",ISCHECKED:ISCHECKED,SEQ: "10",INPUTTIME:step.ZT_FX};
								gongxu_value.ZT_FX = ISCHECKED;
								
								if(Ext.getCmp('ZT_CJ').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[3]={ELEVATOR_CLASS_CODE: "ZT",INST_STEP_CODE:'ZT_CJ',INST_STEP_NAME: "直梯_撑架",ISCHECKED:ISCHECKED,SEQ: "20",INPUTTIME:step.ZT_CJ};
								gongxu_value.ZT_CJ = ISCHECKED;
								
								if(Ext.getCmp('ZT_DGAZ_P').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								var dpf_dgaz = ""; // 导轨安装录入时间
								if(Ext.getCmp('dpf_dgaz_p').getValue() != null){
									dpf_dgaz = Ext.Date.format(Ext.getCmp('dpf_dgaz_p').getValue(),'Y-m-d');
								};
								gongxu[4]={ELEVATOR_CLASS_CODE: "ZT",INST_STEP_CODE:'ZT_DGAZ',INST_STEP_NAME: "直梯_导轨安装",ISCHECKED:ISCHECKED,SEQ: "30", INPUTTIME:dpf_dgaz};
								gongxu_value.ZT_DGAZ = ISCHECKED;
								gongxu_value.ZT_DGAZ_CONFIRM_DATE = dpf_dgaz; 
								
								if(Ext.getCmp('ZT_JF').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[5]={ELEVATOR_CLASS_CODE: "ZT",INST_STEP_CODE:'ZT_JF',INST_STEP_NAME: "直梯_机房",ISCHECKED:ISCHECKED,SEQ: "40",INPUTTIME:step.ZT_JF};
								gongxu_value.ZT_JF = ISCHECKED;
								
								if(Ext.getCmp('ZT_GZJ').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[6]={ELEVATOR_CLASS_CODE: "ZT",INST_STEP_CODE:'ZT_GZJ',INST_STEP_NAME: "直梯_灌主机水泥座",ISCHECKED:ISCHECKED,SEQ: "50",INPUTTIME:step.ZT_GZJ};
								gongxu_value.ZT_GZJ = ISCHECKED;
								
								if(Ext.getCmp('ZT_TBMT').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[7]={ELEVATOR_CLASS_CODE: "ZT",INST_STEP_CODE:'ZT_TBMT',INST_STEP_NAME: "直梯_踏板门套安装",ISCHECKED:ISCHECKED,SEQ: "60",INPUTTIME:step.ZT_TBMT};
								gongxu_value.ZT_TBMT = ISCHECKED;
								
								if(Ext.getCmp('ZT_TJSMT').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[8]={ELEVATOR_CLASS_CODE: "ZT",INST_STEP_CODE:'ZT_TJSMT',INST_STEP_NAME: "直梯_土建塞门套",ISCHECKED:ISCHECKED,SEQ: "80",INPUTTIME:step.ZT_TJSMT};
								gongxu_value.ZT_TJSMT = ISCHECKED;
								
								if(Ext.getCmp('ZT_DQJX').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[9]={ELEVATOR_CLASS_CODE: "ZT",INST_STEP_CODE:'ZT_DQJX',INST_STEP_NAME: "直梯_电器接线",ISCHECKED:ISCHECKED,SEQ: "90",INPUTTIME:step.ZT_DQJX};
								gongxu_value.ZT_DQJX = ISCHECKED;
								
								if(Ext.getCmp('ZT_JDPJCC').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[10]={ELEVATOR_CLASS_CODE: "ZT",INST_STEP_CODE:'ZT_JDPJCC',INST_STEP_NAME: "直梯_井道棚架拆除",ISCHECKED:ISCHECKED,SEQ: "110",INPUTTIME:step.ZT_JDPJCC};
								gongxu_value.ZT_JDPJCC = ISCHECKED;
								
								if(Ext.getCmp('ZT_GHCSN').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[11]={ELEVATOR_CLASS_CODE: "ZT",INST_STEP_CODE:'ZT_GHCSN',INST_STEP_NAME: "直梯_罐缓冲水泥座",ISCHECKED:ISCHECKED,SEQ: "120",INPUTTIME:step.ZT_GHCSN};
								gongxu_value.ZT_GHCSN = ISCHECKED;
								
								if(Ext.getCmp('ZT_DLDY').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[12]={ELEVATOR_CLASS_CODE: "ZT",INST_STEP_CODE:'ZT_DLDY',INST_STEP_NAME: "直梯_动力电源",ISCHECKED:ISCHECKED,SEQ: "130",INPUTTIME:step.ZT_DLDY};
								gongxu_value.ZT_DLDY = ISCHECKED;
							}else{
								//扶梯工序
								if(Ext.getCmp('FT_BJ').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[0]={INST_STEP_CODE:'FT_BJ',INST_STEP_NAME: "扶梯_步级安装",ISCHECKED:ISCHECKED,SEQ: "90",INPUTTIME:step.FT_BJ};
								gongxu_value.FT_BJ = ISCHECKED;
								if(Ext.getCmp('FT_BLCB').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[1]={INST_STEP_CODE:'FT_BLCB',INST_STEP_NAME: "扶梯_玻璃、侧板安装",ISCHECKED:ISCHECKED,SEQ: "50",INPUTTIME:step.FT_BLCB};
								gongxu_value.FT_BLCB = ISCHECKED;
								if(Ext.getCmp('FT_BLM').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[2]={INST_STEP_CODE:'FT_BLM',INST_STEP_NAME: "扶梯_玻璃码安装",ISCHECKED:ISCHECKED,SEQ: "30",INPUTTIME:step.FT_BLM};
								gongxu_value.FT_BLM = ISCHECKED;
								if(Ext.getCmp('FT_DGDL').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[3]={INST_STEP_CODE:'FT_DGDL',INST_STEP_NAME: "扶梯_导轨、大链安装",ISCHECKED:ISCHECKED,SEQ: "20",INPUTTIME:step.FT_DGDL};
								gongxu_value.FT_DGDL = ISCHECKED;
								if(Ext.getCmp('FT_DLDY').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[4]={INST_STEP_CODE:'FT_DLDY',INST_STEP_NAME: "扶梯_动力电源",ISCHECKED:ISCHECKED,SEQ: "110",INPUTTIME:step.FT_DLDY};
								gongxu_value.FT_DLDY = ISCHECKED;
								if(Ext.getCmp('FT_DQJX').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[5]={INST_STEP_CODE:'FT_DQJX',INST_STEP_NAME: "扶梯_电气接线",ISCHECKED:ISCHECKED,SEQ: "60",INPUTTIME:step.FT_DQJX};
								gongxu_value.FT_DQJX = ISCHECKED;
								if(Ext.getCmp('FT_FSDZJ').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[6]={INST_STEP_CODE:'FT_FSDZJ',INST_STEP_NAME: "扶梯_扶手带组件安装",ISCHECKED:ISCHECKED,SEQ: "70",INPUTTIME:step.FT_FSDZJ};
								gongxu_value.FT_FSDZJ = ISCHECKED;
								if(Ext.getCmp('FT_HJYJ').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[7]={INST_STEP_CODE:'FT_HJYJ',INST_STEP_NAME: "扶梯_桁架、样架定位",ISCHECKED:ISCHECKED,SEQ: "10",INPUTTIME:step.FT_HJYJ};
								gongxu_value.FT_HJYJ = ISCHECKED;
								if(Ext.getCmp('FT_NGB').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[8]={INST_STEP_CODE:'FT_NGB',INST_STEP_NAME: "扶梯_内盖板安装",ISCHECKED:ISCHECKED,SEQ: "100",INPUTTIME:step.FT_NGB};
								gongxu_value.FT_NGB = ISCHECKED;
								if(Ext.getCmp('FT_QB').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[9]={INST_STEP_CODE:'FT_QB',INST_STEP_NAME: "扶梯_裙板安装",ISCHECKED:ISCHECKED,SEQ: "80",INPUTTIME:step.FT_QB};
								gongxu_value.FT_QB = ISCHECKED;
								if(Ext.getCmp('FT_WGB').getValue() ==0){
									ISCHECKED = false;
								}else{
									ISCHECKED = true;
								}
								gongxu[10]={INST_STEP_CODE:'FT_WGB',INST_STEP_NAME: "扶梯_外盖板安装",ISCHECKED:ISCHECKED,SEQ: "40",INPUTTIME:step.FT_WGB};
								gongxu_value.FT_WGB = ISCHECKED;
							}
							
							show.GONGXU = gongxu;
							show.GONGXU_VALUE = gongxu_value;
							
							
							if(Ext.getCmp('ipd_install_end_date2').getValue() != null){
								show.VALUE.INSTALL_FINISH_DATE = Ext.Date.format(Ext.getCmp('ipd_install_end_date2').getValue(),'Y-m-d');
							};
							if(Ext.getCmp('ipd_report_test2').getValue() != null){
								show.VALUE.REPORT_DEBUG_DATE = Ext.Date.format(Ext.getCmp('ipd_report_test2').getValue(),'Y-m-d');
							};
							if(Ext.getCmp('ipd_REPORT_DEBUG_ENTER_DATE').getValue() !="" && Ext.getCmp('ipd_REPORT_DEBUG_ENTER_DATE').getValue() !=null){
								show.VALUE.REPORT_DEBUG_ENTER_DATE = Ext.Date.format(new Date(Ext.getCmp('ipd_REPORT_DEBUG_ENTER_DATE').getValue()),'Y-m-d');
							};
							if(Ext.getCmp('ipd_quality_score').getValue() != null && Ext.getCmp('ipd_quality_score').getValue() != ""){
								show.VALUE.QA_VALUE = Ext.getCmp('ipd_quality_score').getValue();
							};
							if(Ext.getCmp('ipd_stall_score').getValue() != null && Ext.getCmp('ipd_stall_score').getValue() != ""){
								show.VALUE.INST_VALUE = Ext.getCmp('ipd_stall_score').getValue();
							};
							if(Ext.getCmp('ipd_envir_score').getValue() != null && Ext.getCmp('ipd_envir_score').getValue() != ""){
								show.VALUE.ENCIRCLE_VALUE = Ext.getCmp('ipd_envir_score').getValue();
							};
							if(Ext.getCmp('ipd_MID_CHECK_PERSON_ID').getValue() != null && Ext.getCmp('ipd_MID_CHECK_PERSON_ID').getValue() != ""){
								show.VALUE.MID_CHECK_PERSON_ID = Ext.getCmp('ipd_MID_CHECK_PERSON_ID').getValue();
							};
							if(Ext.getCmp('ipd_ZJJ_DATE').getValue() != null){
								show.VALUE.MID_CHECK_DATE = Ext.Date.format(Ext.getCmp('ipd_ZJJ_DATE').getValue(),'Y-m-d');
							};
							if(Ext.getCmp('ipd_imp_result').getValue() != null && Ext.getCmp('ipd_imp_result').getValue() != ""){
								show.VALUE.KEN_CHECK_RESULT = Ext.getCmp('ipd_imp_result').getValue();
							};
							if(Ext.getCmp('ipd_CB_1').getValue() != null && Ext.getCmp('ipd_CB_1').getValue() != ""){
								show.VALUE.CB_1 = Ext.getCmp('ipd_CB_1').getValue();
							};
							if(Ext.getCmp('ipd_CB_2').getValue() != null && Ext.getCmp('ipd_CB_2').getValue() != ""){
								show.VALUE.CB_2 = Ext.getCmp('ipd_CB_2').getValue();
							};
							if(Ext.getCmp('ipd_CB_3').getValue() != null && Ext.getCmp('ipd_CB_3').getValue() != ""){
								show.VALUE.CB_3 = Ext.getCmp('ipd_CB_3').getValue();
							};
							if(Ext.getCmp('ipd_CB_4').getValue() != null && Ext.getCmp('ipd_CB_4').getValue() != ""){
								show.VALUE.CB_4 = Ext.getCmp('ipd_CB_4').getValue();
							};
							if(Ext.getCmp('ipd_CB_5').getValue() != null && Ext.getCmp('ipd_CB_5').getValue() != ""){
								show.VALUE.CB_5 = Ext.getCmp('ipd_CB_5').getValue();
							};
							if(Ext.getCmp('ipd_ZZ').getValue() != null && Ext.getCmp('ipd_ZZ').getValue() != ""){
								show.VALUE.INSTALL_HEADER = Ext.getCmp('ipd_ZZ').getValue();
							};
							if(Ext.getCmp('ipd_INSTALL_HEADER_ID').getValue() != null && Ext.getCmp('ipd_INSTALL_HEADER_ID').getValue() != ""){
								show.VALUE.INSTALL_HEADER_ID = Ext.getCmp('ipd_INSTALL_HEADER_ID').getValue();
							};
							if(Ext.getCmp('ipd_ZZ_TEL').getValue() != null && Ext.getCmp('ipd_ZZ_TEL').getValue() != ""){
								show.VALUE.TEL = Ext.getCmp('ipd_ZZ_TEL').getValue();
							};
							if(Ext.getCmp('ipd_install_remark').getValue() != null && Ext.getCmp('ipd_install_remark').getValue() != ""){
								show.VALUE.INSTTALL_COMMENTS = Ext.getCmp('ipd_install_remark').getValue();
							};

							//保存本地
							res_value[j].json.stext  = show;
							res_value[j].json.status = 1;
						};
						
						value=show.VALUE;
						//插入时间戳，多条数据提交时按这个时间顺序提交
						var Nowtime = obj_this.NowDayTime();
						var contentdata={init_person_id:init_person_id,LIFT_VENDOR_ID:ipd_SUSPEND_VENDOR_ID,BUILD_VENDOR_ID:ipd_BUILD_VENDOR_ID,INST_VENDOR_ID:ipd_INSTLL_VENDOR_ID,gongxu:gongxu,show:show,value:value,Nowtime:Nowtime,PDA_falg:'PDA3'};
						content[cs] = contentdata;
						
						
						objdata[cs] = res_value[j];
						cs++;
					}
				};
				
				
				
				//status
				for (var j = 0;j<res_status.length;j++) {
					var status_elevator_no = res_status[j].json.tid.substring(9,18);
					var status_seq_num = res_status[j].json.tid.substring(18,19);
					if (ELEVATOR_NO == status_elevator_no && SEQ_NUM == status_seq_num) {
						show = res_value[j].json.stext;
						var ipd_report_test = show.VALUE.REPORT_DEBUG_DATE;
						var ipd_ENTRANCE_DATE = "";
						if(Ext.getCmp('ipd_ENTRANCE_DATE').getValue() != null){
							ipd_ENTRANCE_DATE = Ext.Date.format(Ext.getCmp('ipd_ENTRANCE_DATE').getValue(),'Y-m-d');
						};
						var ipd_LIFT_END_DATE = show.VALUE.LIFT_END_DATE;
						var ipd_BUILD_END_DATE = show.VALUE.BUILD_END_DATE;
						
						//改成安装的数据
						var status = "";
						if(ipd_LIFT_END_DATE != "点击选择时间" && ipd_BUILD_END_DATE !="点击选择时间"){
							if(ipd_ENTRANCE_DATE != "点击选择时间"){
								status = "REPORT_DEBUG_DATE";
							}else{
								status = "BUILD_END_DATE";
							}
						}else{
							status = "";
						}
						
						res_status[j].json.stext = status;
						break;
						
					}
				}
				
			}
			
			// 刷新JSONSTORE数据
			WL_process.replace(res_value).then(function(arrayResults2){
				WL_process.replace(res_status).then(function(arrayResults2){
					//配置数据
					obj.data = objdata;
					var ext1={};
					var tempExt={};
					tempExt.msg_title='安装过程批安装';
					tempExt.msg_body=ELEVATOR_NO;
					tempExt.msg_result='已进入待提交队列';//'正在等待提交';
					obj.isArray = true;
					ext1.url='installProcessAction.do?method=toVolumeAdd';
					ext1.msg=tempExt;
					ext1.obj = obj;
					ext1.cparam = ENGCONTRACT_NUMBER;
					ext1.view_id='install.installprocess.Installprocess_List_Ctrl';
					query1={tid:"CJRW_PAZ",tcode:'UNCOMMIT_CJRW_PAZ',stext:content,ext1:ext1,status:'1'};
					WL.JSONStore.get(collectionName).add(query1).then(function(){
					}).fail(function(){}); 
					
					obj_this.NextView('installProcess_EnoList_V','HelcPDA.view.install.installprocess.InstallProcess_EnoList_V');
					obj_this.LoadGHlist(ENGCONTRACT_NUMBER);
					if(UN_install !=0){
						WL.Toast.show('有'+UN_install+'台电梯未满足安装要求,满足要求电梯已进入待提交队列');
					}else{
						WL.Toast.show('已进入待提交队列');
					}
					
					WL.ClientMessages.loading = "加载数据中";
					myLoading = new WL.BusyIndicator('content');
				}).fail(function(errorObject){
					Ext.Msg.alert("删除本地状态失败");
				});
			}).fail(function(errorObject){
				Ext.Msg.alert("删除本地状态失败");
			});
			
			
			});
		});
		step={};
	},
	
	//批进场
	ipd_batch_Enter : function(){
		var obj = this;
		var sele=document.getElementsByName('ipd_ENO_Checkbox');
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
			 this.NextView('installProcess_Batch_Enter','HelcPDA.view.install.installprocess.InstallProcess_Batch_Enter');
		 };
		 
		 var newXB=xb;
		 Ext.getCmp('ip_E_XB').setValue(newXB);
		//安装服务商人员
		var InstllPersonNameStore=obj.getStore('InstllPersonNameStore','HelcPDA.store.install.installprocess.InstllPersonNameStore');
		InstllPersonNameStore.setData([]);
		 
		//进场
		Ext.getCmp('ipd_JC_fieldset').setHidden(true);
		
		//入场时间不小于吊搭结束时间且不大于当天时间
		var batchentrancedate=Ext.getCmp('ipd_batch_ENTRANCE_DATE');
			batchentrancedate.addListener('change',obj.batchentrancedate1,this,{
		});
	},
	
	//批安装
	ipd_batch_Install : function(){
		var obj = this;
		var sele=document.getElementsByName('ipd_ENO_Checkbox');
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
			 this.NextView('installProcess_Batch_Install','HelcPDA.view.install.installprocess.InstallProcess_Batch_Install');
		 };
		 
		var newXB=xb;
		Ext.getCmp('ip_E_XB').setValue(newXB);
		var ELEVATOR_ARRAY = [];
		var FT = 0;
		var ZT = 0;
		//判断选中的工号是否属于同一种梯形
		//全为直梯
		var ProcessGHStore = obj.getStore("ProcessGHStore","HelcPDA.store.install.installprocess.ProcessGHStore");
		
		var WL_process=WL.JSONStore.get(collectionName);
		var ENGCONTRACT_NUMBER=ProcessGHStore.getAt(newXB[0]).get('ENGCONTRACT_NUMBER')
		var query={tcode:init_person_id+"process",tid:ENGCONTRACT_NUMBER};
		var options={
	    		   exact:false,
	       }; 
		WL_process.find(query,options).then(function(res_value){
			for(var i=0;i<newXB.length;i++){
				var ELEVATOR_NO=ProcessGHStore.getAt(newXB[i]).get('ELEVATOR_NO');
				for(var j=0;j<res_value.length;j++){
					if(ELEVATOR_NO == res_value[j].json.stext.ELEVATOR_NO){
						ELEVATOR_ARRAY[i] = res_value[j].json.stext.ELEVATOR_CLASS_NAME;
					}
				}
			};
			for(var k =0;k<newXB.length;k++){
				if(ELEVATOR_ARRAY[k]=="扶梯"){
					FT += 1;
				}else{
					ZT +=1;
				}
			}
			
			if(FT == 0){
				//安装完成日期要先完成所有工序
				var installenddate2=Ext.getCmp('ipd_install_end_date2');
					installenddate2.addListener('change',obj.installenddate2,this,{
				});	
			}else if(ZT == 0){
				var installenddate2=Ext.getCmp('ipd_install_end_date2');
				installenddate2.addListener('change',obj.installenddate22,this,{
			});	
			}
			
			
			if(ZT == 0){
				//都是扶梯
				//安装工序（扶梯）
				Ext.getCmp('FT_BJ').setHidden(true);
				Ext.getCmp('FT_BLCB').setHidden(true);
				Ext.getCmp('FT_BLM').setHidden(true);
				Ext.getCmp('FT_DGDL').setHidden(true);
				Ext.getCmp('FT_DLDY').setHidden(true);
				Ext.getCmp('FT_DQJX').setHidden(true);
				Ext.getCmp('FT_FSDZJ').setHidden(true);
				Ext.getCmp('FT_HJYJ').setHidden(true);
				Ext.getCmp('FT_NGB').setHidden(true);
				Ext.getCmp('FT_QB').setHidden(true);
				Ext.getCmp('FT_WGB').setHidden(true);
				Ext.getCmp('ipd_ZT_field').setHidden(true);
			}else if(FT == 0){
				//都是直梯
				//安装工序（直梯）
				Ext.getCmp('ZT_FX').setHidden(true);
				Ext.getCmp('ZT_CJ').setHidden(true);
				Ext.getCmp('ZT_JF').setHidden(true);
				Ext.getCmp('ZT_GZJ').setHidden(true);
				Ext.getCmp('ZT_TBMT').setHidden(true);
				Ext.getCmp('ZT_TJSMT').setHidden(true);
				Ext.getCmp('ZT_DQJX').setHidden(true);
				Ext.getCmp('ZT_JDPJCC').setHidden(true);
				Ext.getCmp('ZT_GHCSN').setHidden(true);
				Ext.getCmp('ZT_DLDY').setHidden(true);
				Ext.getCmp('ipd_FT_field').setHidden(true);
				
				Ext.getCmp('dpf_tmaz_p').setDisabled(true);;
				Ext.getCmp('dpf_jxdzaz_p').setDisabled(true);;
				Ext.getCmp('dpf_dgaz_p').setDisabled(true);;
			}else if (ZT != 0 && FT !=0){
				//有直梯也有扶梯
				WL.Toast.show("选中的工号要为同种梯形");
				return;
			}
		});
		 
		 
		
		//填写报调日期要先填写安装完成日期
		var reporttest=Ext.getCmp('ipd_report_test2');
			reporttest.addListener('change',obj.reporttest2,this,{
		});	
			
		//安装
		Ext.getCmp('ipd_PF_fieldset').setHidden(true);
		Ext.getCmp('ipd_ZJJ_fieldset').setHidden(true);
		Ext.getCmp('ipd_GJJ_fieldset').setHidden(true);
		Ext.getCmp('ipd_CB1_fieldset').setHidden(true);
		Ext.getCmp('ipd_CB2_fieldset').setHidden(true);
		Ext.getCmp('ipd_CB3_fieldset').setHidden(true);
		Ext.getCmp('ipd_CB4_fieldset').setHidden(true);
		Ext.getCmp('ipd_CB5_fieldset').setHidden(true);
		Ext.getCmp('ipd_AZZZ_fieldset').setHidden(true);
		
	},
	
	//批吊搭
	ipd_batch_Init : function(){
		var obj = this;
		var sele=document.getElementsByName('ipd_ENO_Checkbox');
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
			 var viewName=Ext.getCmp('installProcess_Detail_V');
			   if(viewName){
				   viewName.destroy();
			   }
     		 this.NextView('installProcess_Batch_Init','HelcPDA.view.install.installprocess.InstallProcess_Batch_Init');
		 };
		
		 var newXB=xb;
		 Ext.getCmp('ip_E_XB').setValue(newXB);
		 
		//人员列表
		var InstPersonNameStore=obj.getStore('InstPersonNameStore','HelcPDA.store.install.installprocess.InstPersonNameStore');
		InstPersonNameStore.setData([]);
		var BuildPersonNameStore=obj.getStore('BuildPersonNameStore','HelcPDA.store.install.installprocess.BuildPersonNameStore');
		BuildPersonNameStore.setData([]);
		
		Ext.getCmp('ipd_batch_flg').setValue("0");
		Ext.getCmp('ipd_batch_buildflg').setValue("0");
		 
		//吊搭
		Ext.getCmp('ipd_DZ_fieldset').setHidden(true);
		Ext.getCmp('ipd_DP_fieldset').setHidden(true);
		Ext.getCmp('ipd_DDBZ_fieldset').setHidden(true);
		 
		//设置吊装结束时间和搭棚结束时间为不可填
		Ext.getCmp('ipd_LIFT_END_DATE').setDisabled(true);  
		Ext.getCmp('ipd_BUILD_END_DATE').setDisabled(true);  
			
		//吊装结束时间填写前需先填写吊装开始时间
		var liftstartdate=Ext.getCmp('ipd_LIFT_START_DATE');
			liftstartdate.addListener('change',obj.liftstartdate1,this,{
		});
		//搭棚结束时间填写前需先填写搭棚开始时间
		var buildstartdate=Ext.getCmp('ipd_BUILD_START_DATE');
			buildstartdate.addListener('change',obj.buildstartdate1,this,{
		});
				
	},
	
	//工号反选
	ipd_check_invert : function(){
		
		var sele=document.getElementsByName('ipd_ENO_Checkbox');
		 // 遍历 form  
	    for ( var i = 0; i <sele.length; i++)  
	    {  
	      // 提取控件  
	      var checkbox = sele[i];  
	      var color= checkbox.style.color;
	      console.log('color: '+color);
    	  if(checkbox.style.color==''){
    		  checkbox.style.color='#e03a3e';
    	  }else if(checkbox.style.color=='rgb(204, 204, 204)'){
    		  //是未选中的情况下
    		  checkbox.style.color='#e03a3e';
    	  }else if(checkbox.style.color=='rgb(224, 58, 62)'){
    		//是选中的情况下
    		  checkbox.style.color='#ccc';
    	  };
	    }
	},
	
	//工号全选
	ipd_check_all : function(){
		var sele=document.getElementsByName('ipd_ENO_Checkbox');
		console.log(sele.length);
		console.log(sele);
		  // 遍历 form  
	    for ( var i = 0; i <sele.length; i++)  
	    {  
	      // 提取控件  
	      var checkbox = sele[i]; 
	      checkbox.style.color='#e03a3e';
	    }  
	},
	
	back_Instll_project_list : function(){
		this.BackView();
	},
	
	//返回到processlist
	back_to_processlist : function(){
		this.showBackView('installprocess_list_id','HelcPDA.view.install.installprocess.InstallProcess_List_V');
		var ProcessGHStore = this.getStore("ProcessGHStore","HelcPDA.store.install.installprocess.ProcessGHStore");
		ProcessGHStore.setData([]);
	},
	
	//点击list进入工号列表
	processlist_List : function(obj,index,target,record,e,eOpts){
		var obj = this;
		var store = obj.getStore("ProcessListStore","HelcPDA.store.install.installprocess.ProcessListStore");
		var ENGCONTRACT_NUMBER=store.getAt(index).get('ENGCONTRACT_NUMBER');
		obj.LoadGHlist(ENGCONTRACT_NUMBER);
		this.Waitting('正在加载...');
		this.NextView('installProcess_EnoList_V','HelcPDA.view.install.installprocess.InstallProcess_EnoList_V');
		this.HideWaitting();
	},
	
	LoadGHlist : function(ENGCONTRACT_NUMBER){
		var obj = this;
		var datas =[];
		var WL_process=WL.JSONStore.get(collectionName);
		var query={tcode:init_person_id+"process",tid:ENGCONTRACT_NUMBER};
		var options={
	    		   exact:false,
	    }; 
		WL_process.find(query,options).then(function(res){
			var query1={tcode:init_person_id+"status",tid:ENGCONTRACT_NUMBER};
			var options1={
		    		   exact:false,
		    }; 
			
			WL_process.find(query1,options1).then(function(res1){
				for(var i=0;i<res.length;i++){
					var data = {};
					for(var j=0;j<res1.length;j++){
						if(res[i].json.tid == res1[j].json.tid){
							var value = res[i].json.stext.VALUE;
							data.ENGCONTRACT_NUMBER=res[i].json.stext.ENGCONTRACT_NUMBER;
							data.SEQ_NUM=res[i].json.stext.SEQ_NUM;
							data.ELEVATOR_NO=res[i].json.stext.ELEVATOR_NO;
							if(res[i].json.status == 1){
								data.P_STATUS="已进入待提交队列";
							}else if(res1[j].json.stext == "COMPLEMENT"){
								data.P_STATUS="已完工";
							}else if(res1[j].json.stext == "GOV_CHECK_DATE"){
								data.P_STATUS="技检已发证";
							}else if(res1[j].json.stext == "CHECK_DATE"){
								data.P_STATUS="已验收";
							}else if(res1[j].json.stext == "REPORT_CHECK_DATE"){
								data.P_STATUS="已报检";
							}else if(res1[j].json.stext == "DEBUG_END_DATE"){
								data.P_STATUS="已调试结束";
							}else if(value.REPORT_DEBUG_DATE != "" && value.REPORT_DEBUG_DATE != null && typeof(value.REPORT_DEBUG_DATE)!="undefined" && value.REPORT_DEBUG_DATE != "点击选择时间"){
								data.P_STATUS="已报调";
							}else if(value.ENTRANCE_DATE != "" && value.ENTRANCE_DATE != null && typeof(value.ENTRANCE_DATE)!="undefined" && value.ENTRANCE_DATE != "点击选择时间"){
								data.P_STATUS="已进场";
							}else if(value.BUILD_END_DATE != "" && value.BUILD_END_DATE != null && typeof(value.BUILD_END_DATE)!="undefined" && value.BUILD_END_DATE != "点击选择时间"){
								data.P_STATUS="已吊装搭棚";
							}else if(value.BUILD_END_DATE == "" || value.BUILD_END_DATE == null || typeof(value.BUILD_END_DATE)=="undefined" || value.BUILD_END_DATE == "点击选择时间"){
								data.P_STATUS="未吊装搭棚";
							}
						}
					}
					datas[i] = data;
				}
				
				var ProcessGHStore = obj.getStore("ProcessGHStore","HelcPDA.store.install.installprocess.ProcessGHStore");
				
				var search_data = [];
				var search_GH = '';
				if(typeof(Ext.getCmp('ipd_ENTRANCE_ENTER_search'))!='undefined'){
					search_GH = Ext.getCmp('ipd_ENTRANCE_ENTER_search').getValue();
				}
				
				if(search_GH != ""){
					for(var i =0;i<datas.length;i++){
						if(datas[i].ELEVATOR_NO==search_GH){
							search_data[0]=datas[i];
						}
					};
					ProcessGHStore.setData(search_data);
				}else{
					var softdatas = obj.GHsoft(datas);
					ProcessGHStore.setData(softdatas);
				}
				
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
	
	//查询数据
	instpro_searchdata_btn : function(){
		var obj  = this;
		Ext.getCmp('IP_Ecount').setHtml("总台数()");
		var ENGCONTRACT_NUMBER = Ext.getCmp('tf_instpro_con_s').getValue();
		var ELEVATOR_NO = Ext.getCmp('tf_instpro_eno_s').getValue();
		this.showBackView('installprocess_list_id','HelcPDA.view.install.installprocess.InstallProcess_List_V');
		var WL_process=WL.JSONStore.get(collectionName);
		var store=obj.getStore('ProcessListStore','HelcPDA.model.install.installprocess.ProcessListStore');
		var query={tcode:init_person_id+"process"};
		var options={exact:false};
		WL_process.find(query,options).then(function(res){
			var ENGCONTRACT_NUMBER_LIST=[];
			var ELEVATOR_NO_LIST=[];
			var cs = 0;
			for(var i=0;i<res.length-1;i++){
				var json_ENGCONTRACT_NUMBER = res[i].json.stext.ENGCONTRACT_NUMBER;
				var json_ELEVATOR_NO = res[i].json.stext.ELEVATOR_NO;
				if(json_ENGCONTRACT_NUMBER.indexOf(ENGCONTRACT_NUMBER) >=0 && json_ELEVATOR_NO.indexOf(ELEVATOR_NO)>=0){
					ENGCONTRACT_NUMBER_LIST[cs]=json_ENGCONTRACT_NUMBER;
					ELEVATOR_NO_LIST[cs]=json_ELEVATOR_NO;
					cs++;
				};
			};
			var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
			var UNIQ_CUSTOMER_NAME=[];
			var NUM=[];
			for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
				NUM[i]=0;
				for(var j=0;j<res.length;j++){
					if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==res[j].json.stext.ENGCONTRACT_NUMBER){
						NUM[i]++;
						UNIQ_CUSTOMER_NAME[i]=res[j].json.stext.CUSTOMER_NAME;
					}
				}
			}
			var NEW_NEED_LIST=[];
			for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
				var CNTER_NEED={};
			  	CNTER_NEED.ENGCONTRACT_NUMBER=UNIQ_ENGCONTRACT_NUMBER_LIST[i];
			  	CNTER_NEED.CUSTOMER_NAME=UNIQ_CUSTOMER_NAME[i];
			  	CNTER_NEED.NUM=cs;
			  	NEW_NEED_LIST[i]=CNTER_NEED;
			}
			Ext.getCmp('IP_Ecount').setHtml("总台数("+ELEVATOR_NO_LIST.length+")");
			store.setData(NEW_NEED_LIST);
			Ext.getCmp('ipd_ENTRANCE_ENTER_search').setValue(ELEVATOR_NO_LIST[0]);
		});
	},
	
	//同步搜索，保存到本地
	instpro_getdata_btn : function(){
		
		var store=this.getStore('ProcessListStore','HelcPDA.model.install.installprocess.ProcessListStore');
		store.setData([]);
		Ext.getCmp('IP_Ecount').setHtml("总台数()");
		var query={tcode:init_person_id+"process"};
		var options={exact:false};
		WL.JSONStore.get(collectionName).remove(query,options).then(function(){
			query={tcode:init_person_id+"status"};
			options={exact:false};
			WL.JSONStore.get(collectionName).remove(query,options).then(function(){
			}).fail(function(){
				Ext.Msg.alert("删除本地数据失败");
			});
		}).fail(function(){
			Ext.Msg.alert("删除本地数据失败");
		});
		
		var ENGCONTRACT_NUMBER = Ext.getCmp('tf_instpro_con').getValue();
		var ELEVATOR_NO = Ext.getCmp('tf_instpro_eno').getValue();
		var CUSTOMER_NAME = Ext.getCmp('tf_instpro_pro').getValue();
		
		var contentdata={init_person_id:init_person_id,ENGCONTRACT_NUMBER:ENGCONTRACT_NUMBER,ELEVATOR_NO:ELEVATOR_NO,CUSTOMER_NAME:CUSTOMER_NAME};
		var content = JSON.stringify(contentdata);
		this.connectServerMainTain(this.ipd_toSerach,this,'installProcessAction.do?method=toSearchCount', content);
		this.showBackView2('installprocess_list_id','HelcPDA.view.install.installprocess.InstallProcess_List_V');
	},
	
	ipd_toSerach : function(result,thisobj){
		console.log(JSON.stringify(result));
		var instalcount = parseInt((result.count/50)+1);
		//查询起始位置
		var INT_TASK_ID=0;
		var index = 0;
		//条件
		var ENGCONTRACT_NUMBER = Ext.getCmp('tf_instpro_con').getValue();
		var ELEVATOR_NO = Ext.getCmp('tf_instpro_eno').getValue();
		var CUSTOMER_NAME = Ext.getCmp('tf_instpro_pro').getValue();
		var tdata={};
		tdata.ENGCONTRACT_NUMBER=ENGCONTRACT_NUMBER;
		tdata.ELEVATOR_NO=ELEVATOR_NO; 
		tdata.CUSTOMER_NAME=CUSTOMER_NAME; 
		tdata.init_person_id=init_person_id; 
		tdata.INT_TASK_ID=INT_TASK_ID; 
		
		thisobj.connectServerMainTain(handleResult,thisobj,"installProcessAction.do?method=toSearch",JSON.stringify(tdata));
		
		function handleResult(result,obj) {
			index ++;
			tdata.INT_TASK_ID = result.INT_TASK_ID;
			
			obj.AddtoJSONStore(result,obj,(index==instalcount));
			
			if (index < instalcount) {
				obj.connectServerMainTain(handleResult,obj,"installProcessAction.do?method=toSearch",JSON.stringify(tdata));
			} else {
				return ;
			}
		}
	},
	
	AddtoJSONStore : function(result,obj,isToLoad){
		//循环添加每一条到JSONStore
		var ndata=[];
		var statusndata=[];
		var list = result.item;
		var stauts = result.progress;
		for(var i=0;i<list.length;i++){
			var query={tcode:init_person_id+"process",tid:list[i].ENGCONTRACT_NUMBER+'_'+list[i].ELEVATOR_NO+'_'+list[i].SEQ_NUM,stext:list[i]};
			ndata[i]=query;
		}
		for(var j=0;j<stauts.length;j++){
			var query1={tcode:init_person_id+"status",tid:stauts[j].ENGCONTRACT_NUMBER+'_'+stauts[j].ELEVATOR_NO+'_'+stauts[j].SEQ_NUM,stext:stauts[j].P_STATUS};
			statusndata[j]=query1;
		}
		if (ndata.length > 0) {
			// 保存数据
			WL.JSONStore.get(collectionName).add(ndata).then(function(){
				if(statusndata.length >0){
					WL.JSONStore.get(collectionName).add(statusndata).then(function(){
						if (isToLoad) {
							obj.toLoadLocalData(obj);
						}
					}).fail(function(err){
						Ext.Msg.alert("添加数据失败2");
					});
				}else if (isToLoad) {
					obj.toLoadLocalData(obj);
				}
			}).fail(function(err){
				Ext.Msg.alert("添加数据失败1");
			});
		};
		if (ndata.length == 0) {
			obj.toLoadLocalData(obj);
		}
		
	},
	
	//把所有查找的数据添加到本地后，把第一个list保存起来
	toLoadLocalData: function(obj) {
		var store=obj.getStore('ProcessListStore','HelcPDA.store.install.installprocess.ProcessListStore');
		
		var query={tcode:init_person_id+"process"};
		var options={
	    		   exact:false,
	    };
		WL.JSONStore.get(collectionName).find(query,options).then(function(res){
			var list = res;
			var ENGCONTRACT_NUMBER_LIST=[];  
			for(var i=0;i<list.length;i++){
				ENGCONTRACT_NUMBER_LIST[i]=list[i].json.stext.ENGCONTRACT_NUMBER;
			}
			var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
			var UNIQ_CUSTOMER_NAME=[];
			var NUM=[];
			for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
				NUM[i]=0;
				for(var j=0;j<list.length;j++){
					if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==list[j].json.stext.ENGCONTRACT_NUMBER){
						NUM[i]++;
						UNIQ_CUSTOMER_NAME[i]=list[j].json.stext.CUSTOMER_NAME;
					}
				}
			}
			var NEW_NEED_LIST=[];
			for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
				var CNTER_NEED={};
			  	CNTER_NEED.ENGCONTRACT_NUMBER=UNIQ_ENGCONTRACT_NUMBER_LIST[i];
			  	CNTER_NEED.CUSTOMER_NAME=UNIQ_CUSTOMER_NAME[i];
			  	CNTER_NEED.NUM=NUM[i];
			  	NEW_NEED_LIST[i]=CNTER_NEED;
			}
			//按合同号升序排序
			for(var i = NEW_NEED_LIST.length-1;i>0;i--){
				for(var j=0;j<i;j++){
					if(NEW_NEED_LIST[i].ENGCONTRACT_NUMBER < NEW_NEED_LIST[j].ENGCONTRACT_NUMBER){
						var temp = NEW_NEED_LIST[i];
						NEW_NEED_LIST[i] = NEW_NEED_LIST[j];
						NEW_NEED_LIST[j] = temp;
					}
				}
			}
			Ext.getCmp('IP_Ecount').setHtml("总台数("+ENGCONTRACT_NUMBER_LIST.length+")");
			store.setData(NEW_NEED_LIST);
			if(NEW_NEED_LIST.length==0){
				WL.Toast.show("找不到对应数据");
			}else{
				WL.Toast.show("更新成功，已经是最新数据");
			}
			
			var query={tcode:init_person_id+"process",tid:'process_list'};
			var options={exact:true};
			WL.JSONStore.get(collectionName).remove(query,options).then(function(){
				//保存第一张list界面生成的数据放在本地，离线时使用
				var query={tcode:init_person_id+"process",tid:'process_list',stext:NEW_NEED_LIST};
				WL.JSONStore.get(collectionName).add(query).then(function(){
				}).fail(function(err){
					Ext.Msg.alert("第一张list添加失败");
				});
			}).fail(function(){
				Ext.Msg.alert("删除list列表失败");
			});
			
		}); 
	},
	
	
	//返回到安装过程首页
	back_to_IP_List: function(){
		this.showBackView('installprocess_list_id','HelcPDA.view.install.installprocess.InstallProcess_List_V');
	},

	//进入查询页面
	btn_IP_search : function(){
		this.NextView('installprocess_search_vid','HelcPDA.view.install.installprocess.InstallProcess_Search_V');
	},
	//进入同步页面
	btn_IP_update : function(){
		this.NextView('installprocess_sel_vid','HelcPDA.view.install.installprocess.InstallProcess_Selection_V');
	},
	
	//进入安装过程列表
	buttonInstallProcess : function(){
		this.NextView('installprocess_list_id','HelcPDA.view.install.installprocess.InstallProcess_List_V');
		var obj=this;
		var store=obj.getStore('ProcessListStore','HelcPDA.model.install.installprocess.ProcessListStore');
		store.setData('');   
		var WL_process=WL.JSONStore.get(collectionName);
	       var query={tcode:init_person_id+"process",tid:'process_list'};
	       var options={
	    		   exact:true
	       };       
	       WL_process.find(query,options).then(function(res){
	    	   if(res==''||res==null||typeof(res)=='undefined'){
	    	   }else{
	    		   store.setData(res[0].json.stext);
	    	   }
	       }).fail(function(){
	    	   Ext.Msg.alert('查找缓存数据失败');
	       }); 
		
		
	},
	
	
	
	
	//监听
	//监听吊装开始时间
    liftstartdate1 : function(){
    	var ipd_LIFT_START_DATE = Ext.getCmp('ipd_LIFT_START_DATE').getValue();
    	if(ipd_LIFT_START_DATE == null){
    	}else{
    		Ext.getCmp('ipd_LIFT_END_DATE').setDisabled(false);  
    	}
    },
    //监听搭棚开始时间
    buildstartdate1 : function(){
    	var ipd_BUILD_START_DATE = Ext.getCmp('ipd_BUILD_START_DATE').getValue();
    	if(ipd_BUILD_START_DATE == null){
    	}else{
    		Ext.getCmp('ipd_BUILD_END_DATE').setDisabled(false);  
    	}
    },
    //监听报调试日期(批安装)
    reporttest2 : function(obj, newDate, oldDate, eOpts){
    	if(Ext.getCmp('ipd_install_end_date2').getValue()==null){
    		Ext.getCmp('ipd_report_test2').setValue(oldDate);
    		Ext.Msg.alert('请先填写安装完成日期');
    		return;
    	}
    	if(Date.parse(newDate)>Date.parse(Ext.getCmp('ipd_report_test2').getValue())){
    		Ext.Msg.alert('报调试日期应大于安装完成日期');
    		Ext.getCmp('ipd_report_test2').setValue(new Date(oldDate));
    		return;
    	}
    	Ext.getCmp('ipd_REPORT_DEBUG_ENTER_DATE').setValue(new Date());
    },
    
    //监听安装完成日期
    installenddate1 : function(obj, newDate, oldDate, eOpts){
    	var Today = new Date();
    	
    	if(Ext.getCmp('ZT_TMAZ').getValue()==0){
    		Ext.Msg.alert('请先完成厅门安装');
    		Ext.getCmp('ipd_install_end_date').setValue(null);
    		return;
    	}
    	if(Ext.getCmp('ZT_JXDZ').getValue()==0){
    		Ext.getCmp('ipd_install_end_date').setValue(null);
    		Ext.Msg.alert('请先完成轿厢、对重安装');
    		return;
    	}
    	if(Ext.getCmp('ZT_DGAZ').getValue()==0){
    		Ext.getCmp('ipd_install_end_date2').setValue(null);
    		Ext.Msg.alert('请先完成导轨安装');
    		return;
    	}
		if(Date.parse(Ext.getCmp('ipd_install_end_date').getValue())>Date.parse(Today)){
    		if(oldDate != null){
    			Ext.getCmp('ipd_install_end_date').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能大于今天");
    		}else{
    			Ext.getCmp('ipd_install_end_date').setValue(null);
    			WL.Toast.show("填写的日期不能大于今天");
    		}
    		return;
    	};
    	if(Date.parse(Ext.getCmp('ipd_install_end_date').getValue())<=Date.parse(Ext.getCmp('ipd_ENTRANCE_DATE').getValue())){
			Ext.Msg.alert('安装完成日期应大于进场日期');
			Ext.getCmp('ipd_install_end_date').setValue(new Date(oldDate));
			return;
		}
		if(Ext.getCmp('ipd_report_test').getValue()!=""){
			if(Date.parse(newDate)>Date.parse(Ext.getCmp('ipd_report_test').getValue())){
	    		Ext.Msg.alert('安装完成日期应小于报调试日期');
	    		Ext.getCmp('ipd_install_end_date').setValue(oldDate);
	    		return;
	    	}
			return;
		}
		
		Ext.getCmp('ipd_install_end_date').setValue(newDate);
		
    },
    //监听安装完成日期(批安装) 
    installenddate2 : function(obj, newDate, oldDate, eOpts){
    	var Today = new Date();
    	
    	if(Ext.getCmp('ZT_TMAZ_P').getValue()==0){
    		Ext.Msg.alert('请先完成厅门安装');
    		Ext.getCmp('ipd_install_end_date2').setValue(null);
    		return;
    	}
    	if(Ext.getCmp('ZT_JXDZ_P').getValue()==0){
    		Ext.getCmp('ipd_install_end_date2').setValue(null);
    		Ext.Msg.alert('请先完成轿厢、对重安装');
    		return;
    	}
    	if(Ext.getCmp('ZT_DGAZ_P').getValue()==0){
    		Ext.getCmp('ipd_install_end_date2').setValue(null);
    		Ext.Msg.alert('请先完成导轨安装');
    		return;
    	}
    	if(Date.parse(Ext.getCmp('ipd_install_end_date2').getValue())>Date.parse(Today)){
    		if(oldDate != null){
    			Ext.getCmp('ipd_install_end_date2').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能大于今天");
    		}else{
    			Ext.getCmp('ipd_install_end_date2').setValue(null);
    			WL.Toast.show("填写的日期不能大于今天");
    		}
    		return;
    	};
    	if(Ext.getCmp('ipd_report_test2').getValue()!="" && Ext.getCmp('ipd_report_test2').getValue()!=null){
    		if(Date.parse(newDate)>Date.parse(Ext.getCmp('ipd_report_test2').getValue())){
    			Ext.Msg.alert('安装完成日期应小于报调试日期');
    			Ext.getCmp('ipd_install_end_date2').setValue(oldDate);
    			return;
    		}
    		return;
    	}
    	
    	Ext.getCmp('ipd_install_end_date2').setValue(newDate);
    	
    },
    //监听安装完成日期(批安装) 
    installenddate22 : function(obj, newDate, oldDate, eOpts){
    	var Today = new Date();
    	if(Date.parse(Ext.getCmp('ipd_install_end_date2').getValue())>Date.parse(Today)){
    		if(oldDate != null){
    			Ext.getCmp('ipd_install_end_date2').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能大于今天");
    		}else{
    			Ext.getCmp('ipd_install_end_date2').setValue(null);
    			WL.Toast.show("填写的日期不能大于今天");
    		}
    		return;
    	};
		if(Date.parse(newDate)>Date.parse(Ext.getCmp('ipd_report_test2').getValue())){
			Ext.Msg.alert('安装完成日期应小于报调试日期');
			Ext.getCmp('ipd_install_end_date2').setValue(oldDate);
			return;
		}
    	
    },
	
    
    //监听
  //进场录入时间
    batchentrancedate1 : function(obj, newDate, oldDate, eOpts ){
    	var Today = new Date();
    	if(Date.parse(newDate)>Date.parse(Today)){
    		if(oldDate != null){
    			Ext.getCmp('ipd_batch_ENTRANCE_DATE').setValue(new Date(oldDate));
    			WL.Toast.show("填写的日期不能大于今天");
    		}else{
    			Ext.getCmp('ipd_batch_ENTRANCE_DATE').setValue(null);
    			WL.Toast.show("填写的日期不能大于今天");
    		}
    		return;
    	};
    	
    	Ext.getCmp('ipd_batch_ENTRANCE_ENTER_DATE').setValue(new Date());
	},
    
    
    
    
	
});
Array.prototype.unique3 = function(){
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++){
		if(!json[this[i]]){
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res;
};