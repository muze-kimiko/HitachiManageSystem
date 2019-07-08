var Exit=0;
var ViewArray = [];
//全局变量  
var userid=null;
var copy_userid=null;
var usernames=null;
var class1=null;
var roleid=null;
var phoneno=null;
var rolename=null;
var moduleid=null;
var HQFlag=null;
var modulename=null;enabledflag=null;
var rem1=null;
var sbl_row_id=null;
//登录人ID
var person_id=null;
var ebs_user_id=null;
var init_person_id=null;
//公司ID                
var company_code=null; var Org_Id=null;
var company_code_1=null;
//公司名
var company_name=null;
//站点ID
var station_id=null;
var station_name=null;
//站长
var position_type=null;
var isnewversion=null;
var forceflag=null;
var pw_last_update_date=null;c_time=null;
var isoffline_login=null;
var loginusername=null;
var loginpassword=null,seeatid='1';
var loginuser=null,checktoggle=null;
var picker_show,picker_show1;  
var need_text_id;
var collectionName;
var roleStr;
var isLeader = false;
var commitTask = null;
var isRunningCommit = false;
var RB_page_flag='';
var pdarole='';
var power = "";
var roledata=[];
var phoneinfo = null;
var MainCtr = null;
var MainFaultRecord = null;
//zhj 年检
var njuserid='1647';
//ess变量
//var roleStr;
//站点ID
//var station_id=null;
//公司ID                
//var company_code=null;
//var HQFlag=null;
//var usernames=null;
//var userid=null;
//ess变量

this.myBusyIndicator=new WL.BusyIndicator('content',{text:"登录中"});
this.myLoading=new WL.BusyIndicator('content',{text:"加载数据中"});

/**
 * OA起草
 * ***/
/*//根据HR查找出来的数据会重新赋值
var OA_usernames='t1';//agentman,username,格式:李光祥 00002165,放到data数组提交到OA
var OA_dept='-';	  //和OA_usernames类似

var publicId='t1';
var password = '123';

//如果PDA登录用户有OA账号，OA_df_id,OA_df_usernames,OA_userid会被重新赋值
var OA_df_id='t1';			//ex:00002165
var OA_df_usernames='t1';	//ex:李光祥 00002165
var OA_userid='t1';			//ex:lgx02165
*/
//根据HR查找出来的数据会重新赋值
var OA_usernames='pdapubuser';//agentman,username,格式:李光祥 00002165,放到data数组提交到OA
var OA_dept='-';	  //和OA_usernames类似

var publicId='pdapubuser';
var password = '123';

//如果PDA登录用户有OA账号，OA_df_id,OA_df_usernames,OA_userid会被重新赋值
var OA_df_id='pdapubuser';			//ex:00002165
var OA_df_usernames='pdapubuser';	//ex:李光祥 00002165
var OA_userid='pdapubuser';			//ex:lgx02165

var _vt = null;
var userkey = null;
//全局变量
var actionform = {
	action : "",//string,output,keep:保存，submit:提交
	acti : {},//json string,input,流程及当前结点数据，格式见下面activity描述
	pur : {},//json string,input,当前页面数据显示权限，格式见下面purview描述
	curuser : {},//json
	ivar : "",//json string,input,流程实例变量，格式见下面ivar描述
	data : {},//json string,output,当前页面提交数据，格式见下面描述
	flowto : {},//obj ,output,输出流向，格式见下面描述
	query : {},//json string,output,常用查询数据，格式见下面描述
	notice : "",//json string,output,通知，格式见下面描述
	ovar : "",//json string,output,输出流程实例变量，格式见下面ivar描述
	ext : "" //array string预留扩展参数
};

var personnelList = {};//人员储存
var choosePerson = [];//存储查找出来已勾选的人员

function CC() {
	this.debug = 1;
};
CC.prototype.log = function(msg) {
	if (this.debug == 1) {
		console.log(msg);
	}
};
var _oa_path = "http://oa.bpm.com";

var cc = new CC();
var object=null;
//2016-8-16 xcx 全局
var objectXcx=null;
var ghjuserID=null;

Ext.application({ 
	name : "HelcPDA",
	requires:[
		'ux.SlideActions'
	],

	views : [
	         'New_Home2016',
	         //'maintain.IndexPanel',
	         'maintain.MaintenancePlanPanel',
	       // 'maintain.MaintenanceSigninPanel',
	         'maintain.MaintenancePlanPanelMonth',
	         'maintain.MaintenancePlanDetailPanel',
	        // 'maintain.Main',
	         'common.AutoTextArea',
	         
	         //全局
	         'LoginView',
	         'MenusView',
	         'common.EditNumberView',

	         
	         //合同
	         'compact.CompactBodyInfoPanel',
	         'compact.CompactHeadPanel',
	         'compact.CompactSearchPanel',
	         
	         //故障
	         'fault.FaultHandlingCancelPanel',
	         'fault.FaultHandlingDetailPanel',
	         'fault.FaultHandlingFallbackPanel',
	         'fault.FaultHandlingFeedbackPanel',
	         'fault.FaultHandlingForwardingPanel',
	         'fault.FaultHandlingInputPanel',
	         'fault.FaultHandlingPanel',
	         'fault.FaultHandlingReportPanel',
	         'fault.FaultHandlingReportPanelAccessories',
	         'fault.FaultHandlingReportPanelTCD',
	         'fault.FaultHandlingReportPanelWhy',
	         'fault.FaultHandlingReportPanelWorker',
	         'fault.FaultHandlingSituationPanel',
	         
	         //保养
	         'maintain.maintenance_item',
	         'maintain.maintenance_project',
	         'maintain.maintenance_ready',
	         'maintain.MaintenancePlanDetailPanel',    
	         'maintain.MaintenancePlanPanel',
	         'maintain.MaintenancePlanPanelMonth',
	         'maintain.MaintenanceReplacePanel', 
	         'maintain.MaintenanceSigninPanel', 
	         //保养MUG4新增
	         'maintain.Overlay_Brake',
	         'maintain.New_InstructionBook_PhotoView',
	         'maintain.PhotoView',
	         'maintain.Overlay_Legacy',
	         'maintain.Overlay_New_MeasureRecord',
	         'maintain.New_MeasureRecord',
	         'maintain.New_MeasureItem',
	         'maintain.New_InstructionBook',
	         'maintain.New_InstructionBookL1',
	         'maintain.New_InstructionBookL2',
	        
	         //安装
	       
	         'install.installplan.installPlan',
	         'install.installplan.InstallPlanConditionSynchronization',
	         'install.installplan.InstallPlanMPidQuery',
	         'install.installplan.InstallPlanQuery',
	         'install.installplan.InstallPlanAZZYLR',
	         'install.installplan.InstallPlanAZJHXXHomePage',
	         'install.installplan.InstallPlanAZJHXXTimes',

	         
	          'install.installProject',
	          'install.installtask.installTask',
	          'install.installtask.InstallatoinTasksSynchronousPanel',
	          'install.installtask.InstallatoinTasksListPanel',
	          'install.installtask.InstallatoinTasksIntaion',
	          'install.installtask.InstallatoinTasksTurnPanel',
	          
	          'install.installtask.InstallatoinTasksAssignPanelPanel',
	          'install.installtask.InstallatoinTasksRecordPanel',
	          'install.installtask.InstallatoinTasksSigninPanel',
	          'install.installtask.zhengfujian',
	          'install.installtask.zhengfujianTask',
	          'install.installtask.zhengfujianshuangxixinqi',
	          'install.installtask.wangGouYiJiao',
	          'install.installtask.wangGuoYiJiaoTask',
	          'install.installtask.wangGuoYiJiaoxinqi',
	          'install.FaultDirection',
	          'install.faultInformation',
	          'install.FaultCodeCheckList',
	          'install.installtoproduce.InstallProduce_List_V',
	          'install.installtoproduce.InstallProduce_EnoList_V',
	          'install.installtoproduce.InstallProduce_Detail_V',
	          'install.installtoproduce.InstallProduce_Query_V',
	          
	          'install.sendingbutnoentry.Sending_No_Entry_List_View',
	          'install.sendingbutnoentry.Sending_No_Entry_List_Syn_View',
	          'install.sendingbutnoentry.Sending_No_Entry_List_Search_View',
	          'install.sendingbutnoentry.Sending_No_Entry_JobNo_View',
	          'install.sendingbutnoentry.Sending_No_Entry_Detail_View',
	          'install.sendingbutnoentry.SNEL_Batch_Detail_View',
	          // 箱头
	          'install.installsendbox.InstallSendBox_List_V',
	          'install.installsendbox.InstallSendBox_EnoList_V',

	          //'install.installsendbox.InstallSendBox_Search_V',

	          /*'install.installsendbox.InstallSendBox_Search_V',*/
               
	          
	          //lgs
	          'install.installtoreportcheck.InstallationTasksReportCheckDetailPanel',
	          'install.installdebug.InstallationTasksShakedownPanel',
	          'install.installdebug.InstallationTasksShakedownPanel1',
	          'install.installdebug.InstallationTasksMainShakedownPanel',
	          'install.installtoreportcheck.InstallationTasksReportCheckPanel',
              'install.installtoreportcheck.InstallationTasksReportCheckDetailSawPanel',
              'install.installblu.InstallationTasksShakedownAddListPanel',
              'install.installblu.InstallatoinTasksFactoryAddListPanel', 
              'install.installtoreportcheck.InstallationTasksReportCheckDetailPanel1',
              'install.installSearch.InstallAllSerach',
              'install.installSearch.InstallSearchList',
              'install.installSearch.InstallSearchListDetail',
              'install.installSearch.InstallSearchListDetail_Ts',
              'install.installSearch.InstallSearchListDetail_Cj',
              'install.installProduceSearch.InstallProduceSearchList',
              'install.installProduceSearch.InstallProduceSearchList1',
              'install.installProduceSearch.InstallProduceSearchListDetail',
              'install.installdebug.InstallationTasksShakedownSearch',
              'install.installdebug.InstallationTasksShakedownSearch_1',
              //oa
               'oa.OAMainPanel',
               'oa.OAMenusView',
               'oa.OAReportDetailPanel',

               'oa.OAMainList1',
               //report
               'report.installcomplete.InstallComplete_List_View',
               'report.installcomplete.InstallComplete_Detail_View',
               'report.maintainbb.KeepAchievement_List_View',
               'report.maintainbb.KeepAchievement_Detail_View',
               'report.maintainplanbb.ReportMaintainPlan_list_View',
               'report.maintainplanbb.ReportMaintainPlan_detail_View',
               'report.maintainplanbb.ReportMaintainPlanStation_list_View',
               'report.maintainplanbb.ReportMaintainPlanStation_detail_View',
               'report.faultcount.ReportFaultGZBGHomePage',
               'report.faultcount.ReportFaultGZBGStationPage',
               'report.faultcount.ReportFaultGZBGCount',
               'report.ReportView',
               'report.SetsAmount.ReportSetsAZTLHomePage',      
               'report.SetsAmount.ReportSetsAZTLCount',
               'report.HotLine.ReportHotLineHomePage',
               'report.HotLine.ReportHotLineCount',
               'report.HotLine.ReportHotLineStationPage',
               'install.installsendbox.InstallSendBox_Detail_Volume_V',
               'historyFault.historyFault-V',
               'historyFault.historyFaultList-V',
               'historyFault.historyFaultInformation',
               
               'report.installweekly.InstallWeekly_List_View',
               'report.installweekly.InstallWeekly_List_Detail_View',
               'report.installrecord.InstallRecord_List_View',
               'report.installrecord.InstallRecord_List_Detail_View',
               //pdabbxx
               'report.pdabbxx.Pdabbxx_List_View',
               'report.pdabbxx.Pdabbxx_View',
               'report.PersonKPI.PersonKPICompany',
               'report.PersonKPI.PersonKPIStation',
               'report.PersonKPI.PersonKPIPerson',
               
               //map
               'map.MapAroundPeopleView',
               'map.MapBelowPeopleView',

               'map.MapMainView',
               'customer.customer-v',
               'customer.customerList',
               'customer.customerInformation',
               'ElevatorInformation.ElevatorInformation',
               'ElevatorInformation.ElevatorInformationList',
               'ElevatorInformation.ElevatorInformation-v',
               'map.MapMainView',
               
            // 待提交数据
               'waitingdata.WaitingForCommitData_List_V',
               'cellphoneinfo.InputCellphoneNumber',
               'cellphoneinfo.CellphoneNumberDetail',
               
               //地图
               'androidMap.SendCard',
	           'androidMap.MyView',
	           'androidMap.NearView',
	           'androidMap.WhitePage',
	           'maintain.MaintenaceSendCardPanel',
	           

	           //保养抽查  zhj
	           'selective_examination.CC_Select',
	           'selective_examination.CC_List',
	           'selective_examination.CC_Query',
	           
	           //更换件  2016-8-10 xcx
	           'ghj.GHJSearch',
	           'ghj.GHJList',
	           'ghj.GHJInfo',
	           'ghj.ghjFunction.GHJAssetNumberSelect',
	           'ghj.ghjFunction.GHJAssetNumberSelectDetail',
	           'ghj.ghjFunction.GHJ_SR_Select',
	           'ghj.ghjFunction.GHJ_SR_SelectDetail',
	           
	           //公司通讯录   2015-10-30  xcx
	           'HelcPDA.view.Contacts.TelephoneSearch',
	           'HelcPDA.view.Contacts.TelephoneList',
	           'HelcPDA.view.Contacts.TelephoneDetailed',

	           //新工程文件公告 160815 czq
	           'edoc.edoc_view',
	           
	           //无纸化 zhj
	           'maintain.ChengKeZaiHuo',
	           'maintain.SignPanel',
	          
	           'inspection.inspection',
	           'inspection.inspection_xx',
	           'inspection.inspection_zgxx',
	           'inspection.inspection_fj',
	           

	           //安全考核
	           'kytest.kytestlist',
	           'kytest.kytestkh',
	           'kytest.kysearch',
	           

	           //保障表和接梯表  xcx 2017-2-14
	           'SynchronizationTable.SafeguardOneQuerySearch',
		       'SynchronizationTable.SafeguardOneQueryList',
		       'SynchronizationTable.SafeguardTwoContent',
		       'SynchronizationTable.SafeguardFourRecordContent_FJ_Img',
		       'SynchronizationTable.SafeguardFivelegacyContent_YLWT',
		       'SynchronizationTable.SafeguardFourRecordContent_ZYXM',
		       'SynchronizationTable.Safeguard_GG_XMH',
		       'SynchronizationTable.Safeguard_GG_XMH_Select',
		       'SynchronizationTable.SafeguardFourRecordContent_ZYXM_List',
		       'SynchronizationTable.SafeguardFivelegacyContent_QTBLXM',
		       'SynchronizationTable.SafeguardFivelegacyContent_QTBLXM_List',
		       'SynchronizationTable.Safeguard_GG_People_Select',
		       
		       //定期检查
		       'RegularInspection.RI_PhotoView',
	           'RegularInspection.RI_Item',
	           'RegularInspection.RI_ItemList',
	           'RegularInspection.RI_Main',
	           'RegularInspection.Overlay_RI_SearchList',
	           'RegularInspection.Overlay_RI_SearchElevatorNo',
	           'RegularInspection.Overlay_RI_SearchPerson',
	           'RegularInspection.RI_MainList',

	           //解锁
	           'UnLock.UnLockMain',
               ],
	         models : ['maintain.MaintenaceProtectPrjectModel',
	     	          'maintain.MaintainPlanListModel',
	     	          'maintain.maintenProModel',
	     	          'maintain.DateModel',
	     	          'maintain.ServicePersonnelModel',
	     	          'maintain.DateModel',
	     	          'maintain.MaintainReplacePieceModel',
//	     	          'maintain.ServicePersonnelModel'  
	     	          'maintain.dayModel',
	                   'fault.FaultHandlingReportSearchModel',
	     	          'fault.FaultHandlingReportSearchCustomModel',
	     	     //     'maintain.mainItemSalCtrl',
	     	          
	     	          //xcx的模板
	     	          'fault.HelSblStationModel',
	                   'fault.FaultHandlingModel',
	                   'fault.FaultHandlingReportSearchModel',
	                   'fault.HelHotlineFaultStatusModel',
	                   'fault.WorkerListModel',
	                   'fault.FaultAppearanceModel',
	                   'fault.HelHotlineFaultStatusModel',
	                   'fault.FaultWorkerNumberModel',
	                   
	                   'install.installtask.installtaskModel',
	                   'install.installtask.InstallatoinTasksListPanel',
	                   'install.installtask.InstallatoinTasksIntaion',
	                   'install.installtask.installRecodrModel',
	                   'install.installtask.ZhengFujianModel',
	                   'install.installtask.ZhengFujianModel2',
	                   'install.FaultDirectionModel',
	                   'install.installprocess.InstallProduce_List_M',
	                   'install.installplan.InstallAZZYLRModel',
	                   // 箱头
	                   'install.installsendbox.InstallSendBoxListModel',
	                   'install.sendingbutnoentry.Sending_No_Entry_List_Model',
	                   'install.sendingbutnoentry.Sending_No_Entry_JobNo_Model',
	                   
	                   //report
	                   'report.faultcount.ReportFaultGZBGModel',
	                   'report.SetsAmount.ReportSetsAZTLModel',
	                   'report.HotLine.ReportHotLineModel',
	                   'historyFaultM.historyFaultM',
	                   //pdabbxx
	                   'report.pdabbxx.pdabbxx_List_Model',
	                   
	                   // 消息
	                   'message.MessageModel',

	                   'cellphoneinfo.InputCellphoneNumberModel',
	                   
	                   'selective_examination.CC_LIST_Model',
	                   'selective_examination.HEL_CHANGE_MENU_Model',
	                   'selective_examination.HEL_RUMMAG_HEADER_Model',
	                   'selective_examination.HEL_RUMMAG_LINES_Model',
	                   'selective_examination.MV_CX_MAIN_RAN_INS_Model',

	                   'cellphoneinfo.InputCellphoneNumberModel',
	                   
	                   //更换件   2016-8-12 xcx
	                   'ghj.GhjModel',
	                   'ghj.GHJInfoModel',
	                   'ghj.ghjFunction.GHJAssetNumberSelectModel',
	                   'ghj.ghjFunction.GHJ_SR_SelectModel',
	                   
	                   //公司通讯录   2015-10-30  xcx
	                   'HelcPDA.model.Contacts.TelephoneAddressModel',
	                   
	                   //年检 zhj
	                   'inspection.inspectionlistModel',
	                   'inspection.inspectionzgxxlistModel',
	                   'inspection.inspectionfjlistModel',
	                   'inspection.jobContactBook_Model',
	                   'inspection.dcllistModel',
	                   'inspection.zgllistModel',
	                   
	                   //保障表和接梯表  xcx 2017-2-14
	                   'SynchronizationTable.SynchronizationTableModel',
	                   'SynchronizationTable.SynchronizationTable_YLWT_Model',
	                   'SynchronizationTable.SynchronizationTable_FJ_Model',
	                   'SynchronizationTable.SynchronizationTable_ZYXM_Model',
	                   'SynchronizationTable.SynchronizationTable_ZYXM_List_Model',
	                   'SynchronizationTable.SynchronizationTable_LZXM_Model',
	                   'SynchronizationTable.SynchronizationTable_QTBLXM_Model',
	                   'SynchronizationTable.SynchronizationTable_JTB_list_Model',
	                   'SynchronizationTable.SynchronizationTable_QTBLXM_List_Model',
	                   'SynchronizationTable.SynchronizationTable_ZYXM_JTB_Model',
	                   'SynchronizationTable.Safeguard_GG_People_Select_Model',
	                   
	         ],

 	stores : [
 	          //合同
 	          'compact.CompactBodyStore',
 	          'compact.CompactHeadStore',
 	          'compact.CompactSearchStore',
 	          
 	          //故障
 	          'fault.AccessoriesListStore',
	          'fault.AccessoriesStore',
	          'fault.FaultAppearanceStore',
	          'fault.FaultHandlingReportSearchCustomStore',
	          'fault.FaultHandlingReportSearchStore',
	          'fault.FaultHandlingStore',
	          'fault.FaultHandlingStore2016',
	          'fault.FaultHandlingReportStore2016',
	          'fault.FaultHandlingStoreTwo',
	          'fault.FaultHandlingStoreThree',
	          'fault.FaultHandlingStoreFour',
	          'fault.FaultListStore',
	          'fault.FaultWorkerNumberStore',
	          'fault.HelHotlineFaultStatusStore',
	          'fault.HelSblStationStore',
	          'fault.WorkerListStore',
	          
	          
 	          
	          //保养
	          'maintain.MaintainPlanListHome',
	          'maintain.Date',
 	          'maintain.day',
 	          'maintain.MaintainPlanList',
 	          'maintain.MaintainReplacePieceStore',
 	          'maintain.MaintenaceProtectPrjectStore',
 	          'maintain.MaintenaceProtectPrject_MuCeStore',
 	          'maintain.MaintenaceReplaceStore',
 	          'maintain.maintenProStroe',
 	          'maintain.ServicePersonnel',
 	          'maintain.MaintenacePictureStore',
 	          'maintain.MaintenanceSigninPanelStore',
 	          'maintain.MaintenaceSendCardStore',
 	          'maintain.MaintenaceSendCardStore1',
 	          'maintain.New_InstructionBookStore',
 	          'maintain.New_InstructionBookL1Store',
 	          'maintain.New_InstructionBookL2Store',
 	          'maintain.New_MeasureItemStore',
 	          'maintain.New_MeasureRecordStore',
 	          'maintain.LegacyListStore',
 	          'maintain.New_MeasureRecord_AttachmentStore',
 	          'maintain.New_MeasureRecord_AttStore',
 	          'maintain.BrakeListStore',
 	          
 	          //安装
 	          'install.installcheck.InstallatoinTasksFactoryInfoStore',
 	          'install.installcheck.InstallatoinTasksFactoryStore',
 	          'install.installcheck.TasksFactoryStore',
 	          'install.installcheck.ProListStore',
 	          'install.installcheck.ProListStore0',
 	          'install.installcheck.ProListStore1',
 	          'install.installcheck.ProListStore2',
 	          
 	          // 箱头
 	         'install.installsendbox.InstallSendBox_list_Store',
 	          
 	          //安装过程
 	          'install.installprocess.ProcessListStore',
 	          'install.installprocess.ProcessGHStore',

 	          'install.installplan.HelIntTasksAllStore',
 	          'install.installplan.HelIntTasksAllStoreTwo',
 	          'install.installplan.HelIntTasksAllStoreThree',
 	          'install.installplan.HelIntTasksAllStoreFour',
 	          
 	          'install.installplan.InstallAZZYLRStoreOne',
 	          'install.installplan.InstallAZZYLRStoreTwo',
 	          'install.installplan.InstallAZZYLRStoreThree',
 	          'install.installplan.InstallAZZYLRStoreFour',
 	          'install.installplan.InstallAZZYLRStoreFive',
 	          //lgs
 	          'install.installdebug.InstallatoinTasksShakedownStore',
 	          'install.installdebug.InstallatoinTasksShakedown_1Store',
 	          'install.installtoreportcheck.InstallatoinTasksReportCheckStore',
 	         'install.installtoreportcheck.InstallationTasksReportCheckDetailSawStore',
 	          'install.installtoreportcheck.InstallatoinTasksReportCheck_1Store'
 	          ,'install.installdebug.InstallatoinTasksReportCheck_search_Employee_Store',
 	          'install.installdebug.InstallatoinTasksReportCheck_search_Employee_1_Store'
 	          ,'install.installdebug.InstallatoinTasksReportCheck_search_Employee_2_Store',
 	          'install.installblu.InstallationTasksShakedownAddListStore',
 	          'install.installblu.InstallatoinTasksFactoryAddListStore',
 	         'install.installSearch.InstallSearchList0Store',
 	          //oa
 	          'oa.OAMainListStore',
 	          'oa.OAMainList1Store',
 	          'oa.OAMainList2Store',
 	          
 	          //report MAINTAIN
 	         'report.installcomplete.InstallCompleteStore',
 	         'report.installcomplete.InstallCompleteStore1',
 	         'report.maintainbb.KeepAchievementListStore',
 	         'report.maintainplanbb.ReportMaintainPlanStore',
 	         'report.maintainplanbb.ReportMaintainPlanStore1',
 	         'report.maintainplanbb.ReportMaintainPlanStationStore',
	         'report.maintainplanbb.ReportMaintainPlanStationStore1',
 	          //report
 	         'install.installtask.installtaskStore',
 	         'install.installtask.installtaskStore2',
 	         'install.installtask.InstallatoinTasksListPanelStore3',
 	         'install.installtask.InstallatoinTasksIntaionStore4',
             'install.installtask.installRecodrStore',
             'install.installtask.ZhengFujianStore',
             'install.installtask.ZhengFujianStore2',
	          'install.FaultDirectionStore',
	          'install.installprocess.InstallProduce_List_S',
	          //'install.installprocess.VendorNameStore',
	          'report.installweekly.InstallWeeklyListStore',
	          'report.installrecord.InstallRecordListStore',
	          
	          
	          'install.installprocess.InstVendorNameStore',
	          'install.installprocess.InstPersonNameStore',
	          'install.installprocess.BuildVendorNameStore',
	          'install.installprocess.BuildPersonNameStore',
	          'install.installprocess.InstllVendorNameStore',
	          'install.installprocess.InstllPersonNameStore',
	          'install.installprocess.ZjjPersonStore',
	          'install.installprocess.InstllZzNameStore',
	          
	          //ITM
	          'install.ITM.ITMListStore',
	          'install.ITM.ITMGHStore',
	          'install.installSearch.InstallSearchListStore',
	          'install.installSearch.InstallSearchListStore1',
	          'install.installSearch.InstallSearchListStore2',
	          
	          'install.sendingbutnoentry.Sending_No_Entry_List_Store',
	          'install.sendingbutnoentry.Sending_No_Entry_JobNo_Store',
	          //report
	          'report.faultcount.ReportFaultGZBGStore',
	          'report.faultcount.ReportFaultGZBGStoreTwo',
	          'report.faultcount.ReportFaultGZBGStoreStation',
	          'report.SetsAmount.ReportSetsAZTLStore',
	          'report.SetsAmount.ReportSetsAZTLStoreTwo',
	          'report.HotLine.ReportHotLineStore',
	          'report.HotLine.ReportHotLineStoreTwo',

	          'report.HotLine.ReportHotLineStationStore',

	          
	          //pdabbxx
	          'report.pdabbxx.pdabbxx_List_Store',
	          
	          'report.PersonKPI.PersonKPICompanyStore',
	          'report.PersonKPI.PersonKPIStationStore',
	          'report.PersonKPI.PersonKPIPersonStore',
	     
	          //技术附页
	          'techParams.TechParamsStore',
	          'historyFaultM.historyFaultS',
	          
	          //待办
	          'login.BacklogStore',
	          'login.MaintailPlanBackLogStore',
	          
	          //地图
              'map.MapAroundEmpStore1',
              'map.MapAroundPeopleStore',
              'map.MapBelowEmployeeStore',
              
              // 待提交数据
              'waitingdata.WaitingForCommitDataStore',
              'maintainSpecial.AssetNumStore',
              'maintainSpecial.MmintainSpecialStore',
              
              // 消息
              'message.MessageStore',
              
              //品证整改
              'ProductCertificate.RP_HeadStore','ProductCertificate.RP_LineStore',
              
              //OA起草
              'oa.startTheProcess.startTheProcessS',
              'oa.startTheProcess.startTheProcessStore',
              'oa.startTheProcess.DailyOffice.Idea.approvalOpinionS',
              'oa.startTheProcess.DailyOffice.Idea.personnelSelectionS',
              'oa.startTheProcess.DailyOffice.Idea.qyeryListStore',
              'oa.MyProcess.MyProcessStore',
              'oa.HasEnded.HasEndedStore',
              'cellphoneinfo.InputCellphoneNumberStore',
              
              
              'fitting.CODE_GUIDELINES_Store',

              
              //保养抽查
              'selective_examination.CC_LIST_Store',
              'selective_examination.HEL_CHANGE_MENU_Store',
              'selective_examination.HEL_RUMMAG_HEADER_Store',
              'selective_examination.HEL_RUMMAG_LINES_Store',
              'selective_examination.MV_CX_MAIN_RAN_INS_Store',
              'selective_examination.MV_CX_MAIN_RAN_INS_Store2',

              //跟换件  2016-8-12 xcx
              'ghj.GHJListStore',
              'ghj.ghjFunction.GHJAssetNumberSelectStore',
              'ghj.ghjFunction.GHJ_SR_SelectStore',
              
              //公司通讯录   2015-10-30  xcx
              'HelcPDA.store.Contacts.TelephoneAddressStore',

              //新工程文件公告 160815 czq
              'edoc.EdocStore',
              
              //无纸化 zhj
              'maintain.MyStore',
              'maintain.MyStore1',
              'maintain.MyStore2',
              'maintain.MyStore3',
              'maintain.MyStore4',
              'maintain.MyStore5',
              'maintain.MyStore6',
              'maintain.yhlist',

              //年检 zhj
              'inspection.inspectionlistStore',
              'inspection.inspectionzgxxlistStore',
              'inspection.inspectionfjlistStore',
              'inspection.jobContactBook_Store',
              'inspection.dcllistStore',
              'inspection.zgllistStore',

              
              
              'kytest.kylistStore',
              'kytest.cyzlistStore',
              'kytest.jtdclistStore',
              'kytest.wxydlistStore',
              'kytest.wxyylistStore',
              'kytest.xdmblistStore',

              
              //保障表和接梯表  xcx 2017-2-14
              'SynchronizationTable.SynchronizationTable_BZB_list_Store',
              'SynchronizationTable.SynchronizationTable_YLWT_Store',
              'SynchronizationTable.SynchronizationTable_FJ_Store',
              'SynchronizationTable.SynchronizationTable_ZYXM_Store',
              'SynchronizationTable.SynchronizationTable_XMH_Store',
              'SynchronizationTable.SynchronizationTable_BZB_Stored_list_Store',
              'SynchronizationTable.SynchronizationTable_ZYXM_List_Store',
              'SynchronizationTable.SynchronizationTable_LZXM_Store',
              'SynchronizationTable.SynchronizationTable_QTBLXM_Store',
              'SynchronizationTable.SynchronizationTable_JTB_list_Store',
              'SynchronizationTable.SynchronizationTable_JTB_Stored_list_Store',
              'SynchronizationTable.SynchronizationTable_QTBLXM_List_Store',
              'SynchronizationTable.SynchronizationTable_ZYXM_JTB_Store',
              'SynchronizationTable.Safeguard_GG_People_Select_Store',
              
              //定期检查
              'RegularInspection.ST_RI_Item',
 	          'RegularInspection.ST_RI_MainList',
 	          'RegularInspection.ST_RI_ItemList',
 	          'RegularInspection.ST_RI_Main',
 	          'RegularInspection.ST_Overlay_RI_SearchPerson',
 	          'RegularInspection.ST_Overlay_RI_SearchElevatorNo',

 	          //解锁
 	          'UnLock.UnLockUserStore',
 	          'UnLock.UnLockDevStore',
             ],

	controllers : [
	              //全局
	              'ApplicationController',
	              'ApplicationController_OA',
	              'LoginCtrl',
	              'MenusViewCtrl', 
	              'MaintainPlanBackLogCtrl',
	              'New_Home2016Ctrl',
	              
	              //合同
	              'compact.CompactCtrl',
	              
	              //故障
	              'fault.CommitFaultHandlingFallbackCtrl',
	              'fault.CommitHandlingCancelCtrl',
	              'fault.CommitFaultHandlingForwardingCtrl',
	              'fault.FaultHandlingCancelCtrl',
	              'fault.FaultHandlingDetailPanelCtrl',
	              'fault.FaultHandlingFallbackCtrl',
	              'fault.FaultHandlingFeedbackPanelCtrl',
	              'fault.FaultHandlingForwardingCtrl',
	              'fault.FaultHandlingInputPanelCtrl',
	              'fault.FaultHandlingPanelCtrl',
	              'fault.FaultHandlingReportPanelAccessoriesCtrl',
	              'fault.FaultHandlingReportPanelCtrl',
	              'fault.FaultHandlingReportPanelTCDCtrl',
	              'fault.FaultHandlingReportPanelWhyCtrl',
	              'fault.FaultHandlingReportPanelWorkerCtrl',
	              'fault.FaultHandlingSituationPanelCtrl',
                  
	              //保养
	              'maintain.mainItemSalCtrl',
	              'maintain.MaintenaceCtrl',
	              'maintain.MaintenaceDetailCtrl',
	              'maintain.MaintenaceReplaceCtrl',
	              'maintain.maintenReadyCtrl',
	              'maintain.MyController',
	              'maintain.MaintenaceSendCardCtrl',
	              'maintain.New_InstructionBookCtrl',
	              'maintain.New_MeasureItemCtrl',
	              'maintain.New_MeasureRecordCtrl',

	              //安装
	              'install.InstallProjectCtrl',
	              
	              //厂检
	              'install.installcheck.InstallatoinTasksFactoryPanelCtrl',
	              'install.installcheck.InstallatoinTasksFactoryInfoCtrl',
	              //lgs
	              'install.installdebug.InstallationTasksShakedownCtrl',
                  'install.installtoreportcheck.InstallationTasksReportCheckDetailCtrl',
	              'install.installtoreportcheck.InstallationTasksReportCheckCtrl',
                  'install.installblu.InstallationTasksShakedownAddListCtrl',
	              'install.installSearch.InstallAllSerachCtrl',
                  //lgs
	              //oa
	              'oa.OAMainCtrl',
	              'oa.OAAllAplayDetailPanelCtrl',
	              
	              //report
	              'report.installcomplete.InstallCompleteCtrl',
	              'report.maintainbb.KeepAchievementCtrl',
	              'report.maintainplanbb.ReportMaintainPlanCtrl',
	              'report.maintainplanbb.ReportMaintainPlanStationCtrl',
	              'report.ReportCtrl',
	              
	              //report
	             // 'install.insallCtrl',
                  'install.installtask.installtaskCtrl',
                  'install.installtask.InstallatoinTasksSynchronousPanelCtrl',
                  'install.installtask.InstallatoinTasksListPanel',
                  'install.installtask.InstallatoinTasksIntaionCtrl',  
                  'install.installtask.InstallatoinTasksTurnPanelCtrl',
                  'install.installtask.InstallatoinTasksAssignPanelPanelCtrl',
                   'install.installtask.InstallatoinTasksSigninPanelCtrl',
                   'install.installtask.zhengfujianCtrl',
                   'install.installtask.zhengfujianTaskCtrl',
                   'install.installtask.zhengfujianshuangxixinqiCtrl',
                   'install.installtask.wangGouYiJiaoCtrl',
                   'install.installtask.wangGuoYiJiaoTaskCtrl',
                   'install.installtask.wangGuoYiJiaoxinqiCtrl',
                   'install.FaultDirectionCtrl',
                   'install.FaultCodeCheckListCtrl',
                   'install.installtoproduce.InstallProduce_List_C',
                   'install.installtoproduce.InstallProduce_EnoList_C',
                   'install.installplan.installplanCtrl',
                   'install.installplan.installplanAZZYLRCtrl',
                   'install.installtoproduce.InstallProduce_Detail_C',
	                
	              'install.installprocess.Installprocess_List_Ctrl',
	              'install.installprocess.Installprocess_Other_Ctrl',
	              'install.installprocess.Installprocess_Detail_Ctrl',
	              
	              'report.installweekly.InstallWeeklyCtrl',
	              'report.installrecord.InstallRecordCtrl',
	              
	             
	              //report
	              'report.faultcount.ReportFaultGZBGCtrl',
	              'report.SetsAmount.ReportSetsAZTLCtrl',
	              'report.HotLine.ReportHotLineCtrl',
	              'report.PersonKPI.PersonKPICtrl',
	              
	              // 箱头
	              'install.installsendbox.InstallSendBox_Detail_Ctrl',
	              'install.installsendbox.InstallSendBox_BoxList_Ctrl',
	              'install.installsendbox.InstallSendBox_Selection_Ctrl',
	              'install.installsendbox.InstallSendBox_VolumeDetail_Ctrl',
	              
	              //ITM
	              'install.ITM.ITM_List_Ctrl',
	              'install.ITM.ITM_Detail_Ctrl',
	              'install.ITM.ITM_Batch_Detail_Ctrl',
	              //出货未进场
	              'install.sendingbutnoentry.Sending_No_Entry_List_Ctrl',
	              'install.sendingbutnoentry.SNEL_Detail_Ctrl',
	              'install.sendingbutnoentry.SNEL_Batch_Detail_Ctrl',
		          //技术附页
	              'techParams.TechParams_C',
	              'historyFault.historyFault',
	              'historyFault.historyFaultInformationCtrl',
	              //map
	              'map.MapCtrl',
	              
	              //更多
	              'more.HelpCtrl',
	              'more.UpdatePasswordCtrl',
	              
	              // 待提交数据
	              'waitingdata.WaitingForCommitData_C',
	              'customer-C.customer-C',
	              'ElevatorInformation.ElevatorInformationCtrl',
	              
	              'maintainSpecial.MmintainSpecialListCtrl',
	              'maintainSpecial.MmintainSpecialDetailCtrl',
	              'maintainSpecial.MmintainSpecialAddCtrl',
	              
	              // 消息
	              'message.MessageCtrl',
	              

	              //品证整改
	              'ProductCertificate.Renovate_Project_List_Ctrl',
	              'ProductCertificate.Renovate_Forward_Ctrl',
	              
	              //OA起草
	              'oa.startTheProcess.startTheProcessCtrl',
	              'oa.startTheProcess.startTheProcessNameCtrl',
	              'oa.startTheProcess.ProposalManage.PM_TAGLLC_NGCtrl',
	              'oa.startTheProcess.BusinessService.MaintainTransformCtrl',
	              'oa.startTheProcess.BusinessService.litigationApproveCtrl',
	              'oa.startTheProcess.QualityControl.ThreeGuaranteesCtrl',
	              'oa.startTheProcess.QualityControl.KXBQJCtrl',
	              'oa.startTheProcess.DailyOffice.travelRequestCtrl',
	              'oa.startTheProcess.DailyOffice.Idea.approvalOpinionCtrl',
	              'oa.startTheProcess.DailyOffice.Idea.personnelSelectionCtrl',
	              'oa.startTheProcess.DailyOffice.Idea.qyeryListCtrl',
	              'oa.OAProcessCtrl',
	              'oa.MyProcess.MyProcessCtrl',
	              'oa.HasEnded.HasEndedCtrl',
	              'cellphoneinfo.CellphoneInfoCtrl',
	              
	              //地图
	              'androidMap.AndroidMapCtrl',
	              'androidMap.AndroidMapTbCtrl',
	              
	              'fitting.com_part_Ctrl',
	              'transport.TransportCtrl',
	              
	              //pdabbxx
	              'report.pdabbxx.pdabbxxCtrl',
	              
	              //保养抽查
	              'selective_examination.CC_SelectCtrl',
        
	              //公司通讯录   2015-10-30  xcx
	              'Contacts.TelephoneSearchCtrl',
	              'Contacts.TelephoneListCtrl',
	              'Contacts.TelephoneDetailedCtrl',
	              
	              //更换件
	              'ghj.GHJSearchCtrl',
	              'ghj.GHJListCtrl',
	              'ghj.GHJInfoCtrl',
	              'ghj.ghjFunction.GHJAssetNumberSelectCtrl',
	              'ghj.ghjFunction.GHJ_SR_SelectCtrl',
	              
	              //edoc 新工程文件公告 czq 160815
	              'edoc.EdocCtrl',

	              'inspection.inspectioncon',
	          
	              'kytest.kytestcon',


	              
	              //年检 zhj
	              'inspection.inspectioncon',
	              
	              //保障表和接梯表  xcx 2017-2-14
	              'SynchronizationTable.SafeguardOneQueryListCtrl',
	              'SynchronizationTable.SafeguardTwoContentCtrl',
	              'SynchronizationTable.SafeguardFivelegacyContent_YLWTCtrl',
	              'SynchronizationTable.SafeguardFourRecordContent_ZYXMCtrl',
	              'SynchronizationTable.Safeguard_GG_XMH_Ctrl',
	              'SynchronizationTable.SafeguardFivelegacyContent_QTBLXMCtrl',
	              'SynchronizationTable.Safeguard_GG_People_SelectCtrl',
	              
	              //定期检查
	              'RegularInspection.RegularInspectionCtrl',
	              
	              //解锁
	              'UnLock.UnLockCtrl',
                  ],
	              
	              
	launch :function() {
		/* 汉化日期选择中的月份 */
        Ext.Date.monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        
        /* 汉化提示窗口的按钮 */
        Ext.define("HelcPDA.overrides.MessageBox", {
            override: "Ext.MessageBox",
            statics: {
                OK    : {text: '确定', itemId: 'ok',  ui: 'action'},
                YES   : {text: '是',   itemId: 'yes', ui: 'action'},
                NO    : {text: '否',   itemId: 'no'},
                CANCEL: {text: '取消', itemId: 'cancel'},

                INFO    : Ext.baseCSSPrefix + 'msgbox-info',
                WARNING : Ext.baseCSSPrefix + 'msgbox-warning',
                QUESTION: Ext.baseCSSPrefix + 'msgbox-question',
                ERROR   : Ext.baseCSSPrefix + 'msgbox-error',

                OKCANCEL: [
                    {text: '取消', itemId: 'cancel'},
                    {text: '确定', itemId: 'ok',  ui : 'action'}
                ],
                YESNOCANCEL: [
                    {text: '取消', itemId: 'cancel'},
                    {text: '否',   itemId: 'no'},
                    {text: '是',   itemId: 'yes', ui: 'action'}
                ],
                YESNO: [
                    {text: '否', itemId: 'no'},
                    {text: '是', itemId: 'yes', ui: 'action'}
                ]
            }
        });
        
        /* 汉化滚筒选择窗口的按钮 */
        Ext.define("HelcPDA.overrides.Picker", {
        	override: "Ext.Picker",
        	config: {
        		doneButton: '确定',
        		cancelButton: '取消',
            }
        });
        
//        MainCtr = HelcPDA.app.getController('ApplicationController');
        MainCtr = this.getApplication().getController('ApplicationController');
		
		var obj = this;
		objectXcx=this;
		if(localStorage.page == 'main'){
			PDAflag=localStorage.PDAflag;
			this.getApplication().getController('LoginCtrl').loginButton();
		}else{
			Ext.create('HelcPDA.view.MenusView');
			Ext.Viewport.add(Ext.create('HelcPDA.view.LoginView'));
	
			this.getApplication().getController('LoginCtrl').MaaS360Detect();//检测设备是否安装MaaS360
		
			if(Ext.os.is.Android){
				cordova.exec(isOk,isFailure,'CommonPlugin','aaa',[]);
				function isOk(resultdatas) {
				
					try {
						phoneinfo = eval("("+ resultdatas +")");
					}catch (e) {
						phoneinfo = null;
					}
					if (phoneinfo != null) {
						var showDeviceNo = document.getElementById('showDeviceNo');
				    	showDeviceNo.innerHTML = phoneinfo.uuid;
				    	var showImei = document.getElementById('showImei');
				    	showImei.innerHTML = phoneinfo.imei;
				    	var showImsi = document.getElementById('showImsi');
				    	showImsi.innerHTML = phoneinfo.imsi;
				    	//imsi=phoneinfo.imsi;
					}
				};
				function isFailure(data) {
					alert('获取IMEI失败，请重新启动软件！');
				};
			}
			
		}
	}
});
	
function getUrlParam(name) {
	/*
	 * 
	 alert("开始获取参数");
				var page = getUrlParam('page');
				alert("page: " + page);
				alert("boolean: " + (page == ""));
	 * */
	var result="";
	var url = window.location.href;
	if (url.indexOf("?") != -1) {
		url = url.substr(url.indexOf("?") + 1);
		var strs = url.split("&");
		for(var i = 0; i < strs.length; i ++) {
			var tempArr = strs[i].split("=");
			if(tempArr[0]==name)
			{
				result=decodeURIComponent(tempArr[1]);
				break;
			}
		}
	}
	return result;
}
