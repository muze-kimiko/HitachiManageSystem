
/* JavaScript content from js/app.js in folder common */
var ViewArray = [];
this.myLoading=new WL.BusyIndicator('content',{text:"加载数据中"});
this.myLogining=new WL.BusyIndicator('content',{text:"登录中"});

/**
 * OA起草
 * ***/
//根据HR查找出来的数据会重新赋值
var OA_usernames='t1';//agentman,username,格式:李光祥 00002165,放到data数组提交到OA
var OA_dept='-';	  //和OA_usernames类似

var publicId='t1';
var password = '123';

//如果PDA登录用户有OA账号，OA_df_id,OA_df_usernames,OA_userid会被重新赋值
var OA_df_id='t1';			//ex:00002165
var OA_df_usernames='t1';	//ex:李光祥 00002165
var OA_userid='t1';			//ex:lgx02165

//每次登陆获取的随机数
var _vt = null;
var userkey = null;

//用户名
var usernames = null;
//登陆用户名
var username=null;
//用户ID
var userID=null;
//用户ID 8 位
var userIDeight=null;
//关联ERP账户
var ERPuserID=null;
//暂时不知这ID有什么用
var PERSONuserID=null;
//用户密码
var app_passwork=null;
//cc公共方法
function CC() {
	this.debug = 1;
};
CC.prototype.log = function(msg) {
	if (this.debug == 1) {
		console.log(msg);
	}
};

var cc = new CC();
//控制台的使用问题
if(!window.console){
	console = {};
	console.debug = function(){};
	console.log = function(){};
	console.eooro = function(){};
}
var object=null;//作为公共对象，用于在页面调用控制器的方法

//用户ID
var userID=null;
//坐标
var MapX=null;
var MapY=null;
//获取拍照地址
var picture_list=[];
//页面大小
var MapWidth=null;
var MapHeight=null;
//用于记录登陆账号
var loginuser=null;
//用于“记住账号”控件,来控制是否显示登陆用户
var checktoggle=null;
//登陆用户所属角色
var character=null; 
//职位ID
var PositionID=null;
//职位数组
var positionData=[];
//定时任务
var commitTask=null;

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

//JSONStore
var collectionName=null;

//存放MaaS360标示
var PADflag = null;

//地图
var mapli=null;
//全局
var object=null;
//坐标
var point=null;
//地图页面大小height
var MapHeight=null;
//地图页面大小width
var MapWidth=null;
//下拉刷新
var xlsxNum=0;
//权值界面显示列表
var roleArray = [];
//上一步
var SYB='上一步';


Ext.application({ 
	name : "HelcPAD",
	requires:[
	  		'ux.SlideActions',
	  		'ux.DateTime'
	],
	views : ['login.PADMain',
	         'login.PADLogin',
	         'map.Map',
	         'login.PADManagerMain',
	         'common.Hang',
	         'common.SelectFieldList',
	         //----商机管理
	         
	         //2016-3-30  客户管理    ZH
	         'OpportunityManagement.CustomerInformation_New.CustomSearch',
	         'OpportunityManagement.CustomerInformation_New.CustomList',
	         'OpportunityManagement.CustomerInformation_New.CustomInfo',
	         'OpportunityManagement.CustomerInformation_New.CustornBigCustomer',
	         'OpportunityManagement.CustomerInformation_New.CustornAddress',
	         'OpportunityManagement.CustomerInformation_New.CustornAddressAddd',
	         'OpportunityManagement.CustomerInformation_New.CustornAddressList',
	         'OpportunityManagement.CustomerInformation_New.CustornBigImg',
	         
	         //联系人页面，现已不用  2016-3-30
	         'OpportunityManagement.CustomerInformation_New.CustomContact',
	         
	         
	         //2015-7-22 查找商机 New
	         'OpportunityManagement.Project_New.ProjectSearch',
	         'OpportunityManagement.Project_New.ProjectList',
	         'OpportunityManagement.Project_New.ProjectInfo',
	         'OpportunityManagement.Project_New.ProjectSearchPrepare',
	         'OpportunityManagement.Project_New.BusinessAgentList',
	         'OpportunityManagement.Project_New.BusinessAgent',
	         'OpportunityManagement.Project_New.CustomerDemandAnalysisList',
	         'OpportunityManagement.Project_New.CustomerDemandAnalysis',
	         'OpportunityManagement.Project_New.CompetitorAnalysisList',
	         'OpportunityManagement.Project_New.CompetitorAnalysis',
	         'OpportunityManagement.Project_New.OpportunityOutflowReasonAnalysisList',
	         'OpportunityManagement.Project_New.OpportunityOutflowReasonAnalysis',
	         'OpportunityManagement.Project_New.BusinessAttachment',
	         'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMain',
	         'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorSearch',
	         'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorResult',
	         'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorList',
	         
	         //录入客户
	         'OpportunityManagement.EntryClient.CustomCreate',
	         
	         //选择客户列表
	         'OpportunityManagement.Project_New.CustomerSelectView',
	         //分公司
	         'OpportunityManagement.Project_New.InstallSiteCompanyView',
	         //总部跟踪人员
	         'OpportunityManagement.Project_New.HQSalesRepView',
	         //联系人查询
	         'OpportunityManagement.Project_New.KeyContactView',
	         //联系人新建
	         'OpportunityManagement.Project_New.KeyContactConstructView',
	         //安装地点
	         'OpportunityManagement.Project_New.InstallSiteView',
	         'OpportunityManagement.Project_New.InstallSiteBuildView',
	         
	         //代理商报备
	         'OpportunityManagement.Agents.ClueCreateAgent',
	         'OpportunityManagement.Agents.ClueSearchAgent',
	         'OpportunityManagement.Agents.ClueListAgent',
	         //录入商机
	         'OpportunityManagement.EntryOpportunities.ProjectCreate',
	         
	         //汇总商机
	         'OpportunityManagement.ProjectReport.ProjectReportSearch',
	         'OpportunityManagement.ProjectReport.ProjectReportList',
	         
	         //发送提醒信息
	         'OpportunityManagement.ProjectTodo.ProjectTodoSearch',
	         
	         //--移动工作台
	         //查找合同
	         'appworkspace.Contract.ContractDetail_erp',
	         
	         //Siebel查询    ZH
	         'appworkspace.Contract.ContractSearch',
	         'appworkspace.Contract.ContractList',
	         
	         
	         'appworkspace.BatchApply.BatchList',
	         //申请分批单
	         'appworkspace.BatchApply.BatchApplyDetail',
	         'appworkspace.BatchApply.BatchApply',
	         //特殊分批单
	         'appworkspace.BatchApply.SpecialBatchApply',
	         'appworkspace.BatchApply.SpecialBatchApplySecond',
	         'appworkspace.BatchApply.SpecialBatchApplyDetail',
	         
	         
	         'appworkspace.Contract.ContractDetail',
	         'appworkspace.Contract.ProduceApply',
	         'appworkspace.Contract.BoxInfo',
	         'appworkspace.Contract.ContractHang',
	         'appworkspace.Contract.ContractSkillPrice_Siebel',
	         'appworkspace.Contract.ContractBusiness_Siebel',

	         'appworkspace.Contract.BoxInfo_zt',


	         'appworkspace.Contract.ContractDetailList_erp',
	         //技术附页
	         'appworkspace.Contract.techParams.TechParams_Search_V',
	         'appworkspace.Contract.techParams.TechParams_Wllc_V',

	         //申请发票结算单
	         'appworkspace.VoucherApply.VoucherApply',
	         'appworkspace.VoucherApply.VoucherApplyDetail',
	         
	         
	         
	         //申请特殊排产
	         'appworkspace.SpecialApply.SpecialApplyDetail',
	         'appworkspace.SpecialApply.SpecialApply',
	         
	         
	         
	         //出库信息
	         'appworkspace.Transport.TransportSearch',
	         'appworkspace.Transport.TransportList',
	         'appworkspace.Transport.TransportInfo',

	         //实际收款
	         'appworkspace.Income.ContractSearchForIncome',
	         'appworkspace.Income.IncomeSplit',
	         'appworkspace.Income.IncomeList',
	         'appworkspace.Income.ContractListForIncome',
	         

	         //--OA移动办公
	         //查阅公司通讯录
	         'OaMobileOffice.Contacts.TelephoneSearch',
	         
	         //联系人
	         'OaMobileOffice.Contacts.TelephoneList',
	         
	         //详细信息
	         'OaMobileOffice.Contacts.TelephoneDetailed',
	         
	         //OA电子流程
	         'OaMobileOffice.ElectronicProcess.installProject',
	         
	         //我的流程
	         'OaMobileOffice.ElectronicProcess.MyProcess',

	         //新增的控件
	         'common.AutoTextArea',
			 'common.EditNumberView',
			 
	         //出差申请

	         'OaMobileOffice.ElectronicProcess.travelRequest.travelRequest',
             'OaMobileOffice.ElectronicProcess.travelRequest.approvalOpinion',
             'OaMobileOffice.ElectronicProcess.travelRequest.personnelSelection',

	         'OaMobileOffice.ElectronicProcess.travelRequest.travelRequest',

			 //接待客户工作联络流程
	         'OaMobileOffice.ElectronicProcess.ReceptionCustomers.CustomerReception',

	         //人员选择
	         'OaMobileOffice.ElectronicProcess.ReceptionCustomers.PublicPersonnelSelection',
	         'OaMobileOffice.ElectronicProcess.ReceptionCustomers.PublicQyeryList',
	         //境外出差申请
			 'OaMobileOffice.ElectronicProcess.OverseasTrip.OverseasTrip',
			 'OaMobileOffice.ElectronicProcess.OverseasTrip.approvalOpinion',
			 'OaMobileOffice.ElectronicProcess.OverseasTrip.personnelSelection',
			 'OaMobileOffice.ElectronicProcess.OverseasTrip.qyeryList',
			 
			 //--帮助
	         'OaMobileOffice.more.More_view',
	         'OaMobileOffice.more.About',
	         'OaMobileOffice.more.UpdatePassword',
	         
	         //主管线索
	         //待处理线索
	        
	         'OpportunityManagement.Director.ToDoClueNew',
	         //线索查询
	         
	         'OpportunityManagement.Director.ClueProjectList',
	         'OpportunityManagement.Director.ClueHandleDirector',
	         'OpportunityManagement.Director.ClueProjectListSearch',
	         'OpportunityManagement.Director.PerformanceAgentConfirm',
	         'OpportunityManagement.Director.PerformanceAgentConfirmHang',
	         'OpportunityManagement.Director.ClueHandleDirector_BCI',
	         'OpportunityManagement.Director.ClueNew',
	         //待确认代理商业绩
	         
	         
	         'OpportunityManagement.Director.ToDoPerformanceNew',
	         //跟踪人员新增加模块
	         'OpportunityManagement.Project_New.SelectItemView',
	         
	         //主管跟踪人员和团队成员
	         'OpportunityManagement.Director.Clue.CluePeopleSelectView',
	         'OpportunityManagement.Director.Clue.ClueItemView',
	         
	         //提醒
	         'Remind.RemindList',
	         
	         //下单排产
	         'installtoproduce.InstallProduce_Query_V',
	         'installtoproduce.InstallProduce_List_V',
	         'installtoproduce.InstallProduce_EnoList_V',
	         'installtoproduce.InstallProduce_Detail_V',
	         
	         //主管模块
	         'OpportunityManagement.Project_New.BeInChargeOf.ProjectWaitForLoseList',
	         'OpportunityManagement.Project_New.BeInChargeOf.ProjectLookForList',
	         'OpportunityManagement.Project_New.BeInChargeOf.ProjectQueryDirectorList',
	         //修改后新增的跟踪人员界面 
	         'OpportunityManagement.Project_New.NewHQSalesRepView',
	         //商机查看的商机列表界面
	         'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorLookForPage',
	         //关注人
	         'OpportunityManagement.Project_New.GZR.ConcernedAboutPeople',
	         ],
	         
	models : [
	          'CxAppLovVModel',
	          'common.SelectFieldListModel',
	          
	          'appworkspace.CsModel',
	          'appworkspace.Transport.TransportModel',
	          //合同资料
	          'appworkspace.Contract.ContractModel',
	          'appworkspace.Contract.ContractHLineModel',
	          'appworkspace.Contract.techParams.TechParamsModel',
	          'Apply.ApplyModel',
	          
	          'appworkspace.Income.IncomeModel',
	          
	          //OA移动办工
	          'OaMobileOffice.Contacts.TelephoneAddressModel',
	          
	          //我的流程
	          'OaMobileOffice.ElectronicProcess.MyProcessModel',

	          //出差申请
              'OaMobileOffice.ElectronicProcess.startTheProcessModel',
              
	          'OaMobileOffice.ElectronicProcess.travelRequestM.approvalOpinionM',
	          'OaMobileOffice.ElectronicProcess.travelRequestM.travelRequestM',
	          'OaMobileOffice.ElectronicProcess.travelRequestM.personnelSelectionM',
              'OaMobileOffice.ElectronicProcess.travelRequestM.PublicQyeryListModel',


	          //下一步
	          'OaMobileOffice.ElectronicProcess.approvalOpinionM',
	          'OaMobileOffice.ElectronicProcess.ReceptionCustomers.PublicPersonnelSelectionM',
	          
	          //境外出差申请
	          'OaMobileOffice.ElectronicProcess.OverseasTripM.OverseasTripM',
	          'OaMobileOffice.ElectronicProcess.OverseasTripM.approvalOpinionM',
	          'OaMobileOffice.ElectronicProcess.OverseasTripM.personnelSelectionM',
	          'OaMobileOffice.ElectronicProcess.OverseasTripM.qyeryListModel',
	          
	          //相片
	          'OpportunityManagement.Project_New.PictureModel',
	          'OpportunityManagement.CustomerInformation_New.ClientModel',
	          //地址
	          'OpportunityManagement.CustomerInformation_New.CustornAddressModel',
	          
	          //商机
	          'OpportunityManagement.EntryOpportunities.OpportunityModel',
	          //主管商机
	          'OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyModel',
	          //分公司
	          'OpportunityManagement.Project_New.InstallSiteCompanyModel',
	          //总部跟踪人员与跟踪人员
	          'OpportunityManagement.Project_New.HQSalesRepModel',
	          //联系人
	          'OpportunityManagement.Project_New.KeyContactModel',
	          //安装地点
	          'OpportunityManagement.Project_New.InstallSiteModel',
	          //流失原因
	          'OpportunityManagement.Project_New.OpportunityOutflowReasonModel',
	          //客户需求
	          'OpportunityManagement.Project_New.CustomerDemandModel',
	          //竞争对手
	          'OpportunityManagement.Project_New.CompetitorModel',
	          //商机附件
	          'OpportunityManagement.Project_New.OpptyPictureModel',
	          //代理商业绩
	          'OpportunityManagement.Project_New.BusinessAgentModel',
	          
	          //待处理线索
	          'OpportunityManagement.Director.ClueDirectorModel',
	          'OpportunityManagement.Director.ClueProjectListModel',
	          'OpportunityManagement.Director.PerformanceAgentConfirmModel',
	          'OpportunityManagement.Director.ToDoPerformanceAgentListModel',
	          
	          //线索
	          'OpportunityManagement.Agents.ClueDetailModel',
	          'OpportunityManagement.Agents.ClueCreateAgentModel',
	          
	          //提醒
	          'Remind.RemindListModel',
	          
	          //排产下单
	          'installtoproduce.installtaskModel',
	          'installtoproduce.InstallProduce_List_M',
	          
	          //待审批单
	          'appworkspace.BatchApply.BatchListModel',
	          'appworkspace.BatchApply.BatchApplyModel',
	          'appworkspace.BatchApply.BatchApplyDetailModel',
	          'appworkspace.BatchApply.SpecialBatchApplyDetailModel',
	          'appworkspace.BatchApply.SpecialBatchApplySecondModel',
	          ],

	          
	          
	stores : [
	          'CxAppLovVStore',
	          'common.SelectFieldListStore',
	          
	          'appworkspace.CsStore',
	          'appworkspace.Transport.TransportStore',
	          'Apply.ApplyStore',
	          'appworkspace.Income.IncomeStore',
	          //合同资料
	          'appworkspace.Contract.ContractStore_erp_sql',
	          'appworkspace.Contract.ContractStore_erp_BoxInfo_search',
	          'appworkspace.Contract.ContractStore_erp_BoxInfo',
	          'appworkspace.Contract.ContractStore_erp_elebox_list',
	          'appworkspace.Contract.ContractStore_erp_search',
	          'appworkspace.Contract.ContractStore',
	          'appworkspace.Contract.ContractStore_erp_Headers',
	          'appworkspace.Contract.ContractStore_erp_Nolist',
	          'appworkspace.Contract.ContractpcjlList_pcjl',

	          //合同行
	          'appworkspace.Contract.ContractHLineStore',
	          'appworkspace.Contract.ContractHLineStoreJL',
	          'appworkspace.Contract.techParams.TechParamsStore',
	          //OA移动办工
	          'OaMobileOffice.Contacts.TelephoneAddressStore',
	          
	          //我的流程
              'OaMobileOffice.ElectronicProcess.MyProcessStore',

	          //出差申请
	          'OaMobileOffice.ElectronicProcess.travelRequestS.travelRequestS',
              'OaMobileOffice.ElectronicProcess.startTheProcessStore',
              'OaMobileOffice.ElectronicProcess.travelRequestS.approvalOpinionS',
              'OaMobileOffice.ElectronicProcess.travelRequestS.personnelSelectionS',
	          'OaMobileOffice.ElectronicProcess.travelRequestS.travelRequestS',
	          
	          //下一步
	          'OaMobileOffice.ElectronicProcess.approvalOpinionS',
	          'OaMobileOffice.ElectronicProcess.ReceptionCustomers.PublicPersonnelSelectionS',
	          'OaMobileOffice.ElectronicProcess.travelRequestS.PublicQyeryListStore',
              //境外出差申请
              'OaMobileOffice.ElectronicProcess.OverseasTripS.OverseasTripS',
	          'OaMobileOffice.ElectronicProcess.OverseasTripS.approvalOpinionS',
              'OaMobileOffice.ElectronicProcess.OverseasTripS.personnelSelectionS',
	          'OaMobileOffice.ElectronicProcess.OverseasTripS.qyeryListStore',
	          
	          //相片
	          'OpportunityManagement.Project_New.PictureStore',
	          
	          'OpportunityManagement.CustomerInformation_New.ClientStore',
	          'OpportunityManagement.CustomerInformation_New.ClientStoreF',
	          'OpportunityManagement.CustomerInformation_New.CustornAddressStore',
	          'OpportunityManagement.CustomerInformation_New.CustornAddressTwoStore',
	          
	          //商机
	          'OpportunityManagement.EntryOpportunities.OpportunityStore',
	          'OpportunityManagement.EntryOpportunities.OpptyStore',
	          //主管商机
	          'OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyStore',
	          //分公司
	          'OpportunityManagement.Project_New.InstallSiteCompanyStore',
	          //跟踪人员
	          'OpportunityManagement.Project_New.HQSalesRepStore',
	          //联系人
	          'OpportunityManagement.Project_New.KeyContactStore',
	          //安装地点
	          'OpportunityManagement.Project_New.InstallSiteStore',
	          //流失原因
	          'OpportunityManagement.Project_New.OpportunityOutflowReasonStore',
	          //客户需求
	          'OpportunityManagement.Project_New.CustomerDemandStore',
	          //竞争对手
	          'OpportunityManagement.Project_New.CompetitorStore',
	          //商机附件
	          'OpportunityManagement.Project_New.OpptyPictureStore',
	          //代理商业绩
	          'OpportunityManagement.Project_New.BusinessAgentStore',
	          
	          //待处理线索
	          'OpportunityManagement.Director.ClueDirectorStore',
	          'OpportunityManagement.Director.ClueDirectorXSCXStore',
	          'OpportunityManagement.Director.ClueProjectListStore',
	          'OpportunityManagement.Director.PerformanceAgentConfirmStore',
	          'OpportunityManagement.Director.ToDoPerformanceAgentListStore', 
	          
	          //线索
	          'OpportunityManagement.Agents.ClueDetailStore',
	          'OpportunityManagement.Agents.ClueCreateAgentStore',
	          
	          //主管线索人
	          'OpportunityManagement.Director.Clue.ClueSelectStore',
	          'OpportunityManagement.Director.Clue.ClueResultStore',
	          
	          //提醒
	          'Remind.RemindListStore',
	          
	          //排产下单
	          'installtoproduce.installtaskStore2',
	          'installtoproduce.InstallProduce_List_S',
	          
	          
	          //查找商机结果
	          'OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyResultStore',
	          //修改后新增的跟踪人员界面
	          'OpportunityManagement.Project_New.NewHQSalesRepStore',
	          //待审批单
	          'appworkspace.BatchApply.BatchListStore',
	          'appworkspace.BatchApply.BatchApplyStore',
	          'appworkspace.BatchApply.BatchApplyDetailStore',
	          'appworkspace.BatchApply.SpecialBatchApplyDetailStore',
	          'appworkspace.BatchApply.SpecialBatchApplySecondStore',
	          ],
	         
	controllers : [ 
	                 // 登录Ctrl
	                'ApplicationController',
	                //'ApplicationController_OA',
	                'login.PADLoginCtrl',
	                'login.PADMainCtrl',
	                //'login.PADMain_OA_Ctrl',
	                //主管部分
	                'login.PADManagerMainCtrl',
	                'map.MapCtrl',
	                'common.HangCtrl',
	                'common.SelectFieldListCtrl',
	                
	                //客户管理   2016-3-30  ZH
	                'OpportunityManagement.CustomerInformation_New.CustomSearchCtrl',
	                'OpportunityManagement.CustomerInformation_New.CustomListCtrl',
	                'OpportunityManagement.CustomerInformation_New.CustomInfoCtrl',
	                'OpportunityManagement.CustomerInformation_New.CustornBigCustomerCtrl',
	                'OpportunityManagement.CustomerInformation_New.CustornAddressCtrl',
	                'OpportunityManagement.CustomerInformation_New.CustornAddressAdddCtrl',
	                'OpportunityManagement.CustomerInformation_New.CustornAddressListCtrl',
	                'OpportunityManagement.CustomerInformation_New.CustornBigImgCtrl',
	                
	                //联系人监视器，现已不用  2016-3-30
	                'OpportunityManagement.CustomerInformation_New.CustomContactCtrl',
	                
	                //2015-7-22 查找商机 New
	                'OpportunityManagement.Project_New.ProjectSearchPrepareCtrl',
	                'OpportunityManagement.Project_New.ProjectSearchCtrl',
	                'OpportunityManagement.Project_New.ProjectInfoCtrl',
	                'OpportunityManagement.Project_New.BusinessAgentCtrl',
	                'OpportunityManagement.Project_New.CustomerDemandAnalysisCtrl',
	                'OpportunityManagement.Project_New.CompetitorAnalysisCtrl',
	                'OpportunityManagement.Project_New.OpportunityOutflowReasonAnalysisCtrl',
	                'OpportunityManagement.Project_New.BusinessAttachmentCtrl',
	                'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl',
	                'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorSearchCtrl',
	                'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorResultCtrl',
	                'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorListCtrl',
	                'OpportunityManagement.Project_New.ProjectListCtrl',
	                
	                //录入客户
	                'OpportunityManagement.EntryClient.CustomCreateCtrl',
	               
	                //新建商机（客户选择）
	                'OpportunityManagement.Project_New.CustomerSelectCtrl',
	                //分公司
	                'OpportunityManagement.Project_New.InstallSiteCompanyCtrl',
	                //总部跟踪人员与跟踪人员
	                'OpportunityManagement.Project_New.HQSalesRepCtrl',
	                //联系人查询
	                'OpportunityManagement.Project_New.KeyContactCtrl',
	                //联系人新建
	                'OpportunityManagement.Project_New.KeyContactConstructCtrl',
	                //安装地点
	                'OpportunityManagement.Project_New.InstallSiteCtrl',
	                //代理商
	                'OpportunityManagement.Agents.ClueCreateAgentCtrl',
	                'OpportunityManagement.Agents.ClueListAgentCtrl',
	                
	                //代理商报备
	                //'OpportunityManagement.Agents.CustomContactCtrl',
	                
	                //录入商机
	                'OpportunityManagement.EntryOpportunities.ProjectCreateCtrl',
	                
	                //查找商机
	                /*'OpportunityManagement.Project.ProjectCtrl',
	                'OpportunityManagement.Project.ProjectListCtrl',*/
	                
	                //汇总商机
	                'OpportunityManagement.ProjectReport.ProjectReportSearchCtrl',
	                'OpportunityManagement.ProjectReport.ProjectReportListCtrl',
	                
	                //发送提醒信息
	                'OpportunityManagement.ProjectTodo.ProjectTodoSearchCtrl',
	                
	                //申请分批单
	                'appworkspace.BatchApply.BatchListCtrl',
	                'appworkspace.BatchApply.BatchApplyCtrl',
	                'appworkspace.BatchApply.SpecialBatchApplyCtrl',
	                
	                
	                //--移动工作台Ctrl
	                
	                //Siebel查询  ZH
	                'appworkspace.Contract.ContractCtrl',
	                
	                //技术附页
	                'appworkspace.Contract.techParams.TechParams_C',
	                
	                //申请发票结算单
	                'appworkspace.VoucherApply.VoucherApplyCtrl',
	                
	                
	                
	                //申请特殊排产
	                'appworkspace.SpecialApply.SpecialApplyCtrl',
	                
	                //出库信息
	                'appworkspace.Transport.TransportCtrl',
	                
	                //实际收款
	                'appworkspace.Income.IncomeCtrl',
	                
	                
	                //--OA移动办公
	                //'OaMobileOffice.InstallProjectCtrl',
	                
	                //查阅公司通讯录
	                'OaMobileOffice.Contacts.TelephoneSearchCtrl',
	                
	                //联系人
	                'OaMobileOffice.Contacts.TelephoneListCtrl',
	                
	                //详细信息
	                'OaMobileOffice.Contacts.TelephoneDetailedCtrl',
	                
	                //OA电子流程
	                'OaMobileOffice.ElectronicProcess.InstallProjectCtrl',
	                
	                //出差申请
	                'OaMobileOffice.ElectronicProcess.travelRequestCtrl.travelRequestCtrl',
                    'OaMobileOffice.ElectronicProcess.travelRequestCtrl.approvalOpinionCtrl',
	                'OaMobileOffice.ElectronicProcess.travelRequestCtrl.personnelSelectionCtrl',

	                //我的流程
	                'OaMobileOffice.ElectronicProcess.MyProcessCtrl',
	                
	                //接待客户公共流程
	                'OaMobileOffice.ElectronicProcess.ReceptionCustomers.CustomerReceptionCtrl',

	                'OaMobileOffice.ElectronicProcess.ReceptionCustomers.PublicPersonnelSelectionC',

	                //境外出差申请
	                'OaMobileOffice.ElectronicProcess.OverseasTripCtrl.OverseasTripCtrl',
	                'OaMobileOffice.ElectronicProcess.OverseasTripCtrl.approvalOpinionCtrl',
	                'OaMobileOffice.ElectronicProcess.OverseasTripCtrl.personnelSelectionCtrl',
	                'OaMobileOffice.ElectronicProcess.OverseasTripCtrl.qyeryListCtrl',
	                //--帮助
	                'OaMobileOffice.more.UpdatePasswordCtrl',
	                
	                //主管线索
	   	         	//待处理线索
	                
	               
	                'OpportunityManagement.Director.ToDoClueNewCtrl',
	                //线索查询

	                
	                'OpportunityManagement.Director.ClueProjectListCtrl',
	                'OpportunityManagement.Director.ClueHandleDirectorCtrl',
	                'OpportunityManagement.Director.ClueProjectListSearchCtrl',
	                'OpportunityManagement.Director.PerformanceAgentConfirmCtrl',
	                'OpportunityManagement.Director.PerformanceAgentConfirmHangCtrl',
	                'OpportunityManagement.Director.ClueHandleDirector_BCICtrl',
	                'OpportunityManagement.Director.ClueNewCtrl',
	                //待确认代理商业绩
	                
	                
	                'OpportunityManagement.Director.ToDoPerformanceNewCtrl',
	                //主管线索人
	                'OpportunityManagement.Director.Clue.CluePeopleSelectViewCtrl',
	                'OpportunityManagement.Director.Clue.ClueItemViewCtrl',
	                'OpportunityManagement.Director.PublicCluesCtrl',
	                
	                //提醒
	                'Remind.RemindListCtrl',
	                
	                //排产下单   暂时隐藏，给测试用
	                /*'installtoproduce.InstallProduce_Detail_C',
	                'installtoproduce.InstallProduce_EnoList_C',
	                'installtoproduce.InstallProduce_List_C',*/
	                
	                'installtoproduce.InstallProduceCSCtrl',
	                
	                //主管模块
	                'OpportunityManagement.Project_New.BeInChargeOf.ProjectLookForCtrl',
	                'OpportunityManagement.Project_New.BeInChargeOf.ProjectWaitForLoseCtrl',
	                'OpportunityManagement.Project_New.BeInChargeOf.ProjectQueryDirectorListCtrl',
	                //关注人
	                'OpportunityManagement.Project_New.GZR.ConcernedAboutPeopleCtrl',
	                ],
	                
	launch :function() {
			
		//Ext.Viewport.add(Ext.create('HelcPAD.view.appworkspace.Contract.ContractDetail'));
		//return;
		if (Ext.os.is.Android) {
			//this.getApplication().getController('login.PADLoginCtrl').MaaS360Detect();//检测设备是否安装MaaS360
		};
		
		
		if(Ext.os.is.Android){
			cordova.exec(function(data){
				if(data != "SDKisSuccess"){
					Ext.Msg.show({
						title: '温馨提示',
						message: '没有安装MaaS360软件，本应用将退出！<br>若已安装MaaS360，请到MaaS360中启动本应用。',
						buttons: Ext.MessageBox.OK,
						fn: function(buttonId) {
							if(buttonId=='ok'){ 
								WL.App.close();
							}
						}
					});
				}else{
					//执行检测MaaS360限制通过的代码，如打开登录界面
					Ext.Viewport.add(Ext.create('HelcPAD.view.login.PADLogin'));
				}
			},function(data){
				Ext.Msg.show({
					title: '温馨提示',
					message: '检测MaaS360软件出错，APP将退出！',
					buttons: Ext.MessageBox.OK,
					fn: function(buttonId) {
						if(buttonId=='ok'){ 
							WL.App.close();
						}
					}
				});
			},'MaaS360Detect','init',[]);
        }else{
        	//执行检测MaaS360限制通过的代码，如打开登录界面
        	Ext.Viewport.add(Ext.create('HelcPAD.view.login.PADLogin'));
        }

		//防止动画干扰，背后控件
		Ext.Msg.defaultAllowedConfig.showAnimation = false;
        	
        	/*//时间控件优化
			Ext.Date.monthNames = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
	         汉化提示窗口的按钮 
	        Ext.define("HelcPAD.overrides.MessageBox", {
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
	        
	        Ext.define("HelcPAD.overrides.picker.Picker", {
	            override: "Ext.picker.Picker",
	            config: {
	                doneButton: '确定',
	                cancelButton: '取消',
	                height:320,
	            }
	        });*/
	        
        	
		
		
		//显示账号
		if(checktoggle){
			console.log('显示账号-------------------------'+loginuser);
			Ext.getCmp('username').setValue(loginuser);
		};
		//页面大小
		MapWidth=document.body.scrollWidth;
		MapHeight=document.body.scrollHeight;
	
		//防止输入法遮挡待输入文本框
		if(Ext.os.is.iOS){
			console.log('iOS',true);
			Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);
			Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
		};
		
		if (Ext.os.is.Android) { //andriod软键盘出现时，表单高度调整
			console.log('Android',true);
            Ext.Viewport.on('painted', function() {//固定是个事件
                Ext.Viewport.setHeight(window.innerHeight);
            });
        };
        object=this;
	},
	
	handleOrientationChange: function(viewport, orientation, width, height){
		if(Ext.os.is.iOS){
			document.body.style.marginTop = "20px";
	        Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);
		}
	},
});