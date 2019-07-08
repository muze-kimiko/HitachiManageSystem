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
//用户ID
var userID=null;
//用户密码
var app_passwork=null;
//记录成功登陆的用户名
var app_username=null;
//用于“记住账号”控件,来控制是否显示登陆用户
var checktoggle=null;
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

var SYB='上一步';

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
//页面大小
var MapWidth=null;
var MapHeight=null;
//权值界面显示列表
var roleArray = [];
Ext.application({ 
	name : "HelcAgent",
	views : ['login.PADMain',
	         'login.PADLogin',
	         'map.Map',
	       
	         
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
	         'OpportunityManagement.Agents.ClueListAgent',
	         'OpportunityManagement.Agents.CustomerSelectView',

	         //新增的控件
	         'common.AutoTextArea',
			 'common.EditNumberView',
			 
	         //跟踪人员新增加模块
	         'OpportunityManagement.Project_New.SelectItemView',
			 //更替下拉列表界面视图
			 'common.SelectFieldList',
			 //更多
			 'more.About',
			 'more.More_view',
			 'more.UpdatePassword',
	         ],
	         
	models : [
	          'CxAppLovVModel',
	          
	          
	          
	          //商机
	          'OpportunityManagement.EntryOpportunities.OpportunityModel',
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
	          //客户
	          'OpportunityManagement.CustomerInformation_New.ClientModel',
	          
	          //报备
	          'OpportunityManagement.Agents.ClueDetailModel',
	          'OpportunityManagement.Director.ClueDirectorModel',
	          //更替下拉列表界面试图所需model
	          'common.SelectFieldListModel'
	          ],

	          
	          
	stores : [
	          'CxAppLovVStore',
	          
	          
	          
	          //商机
	          'OpportunityManagement.EntryOpportunities.OpportunityStore',
	          'OpportunityManagement.EntryOpportunities.OpptyStore',
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
	          //客户
	          'OpportunityManagement.CustomerInformation_New.ClientStore',
	          
	          //报备
	          'OpportunityManagement.Agents.ClueDetailStore',
	          'OpportunityManagement.Director.ClueDirectorStore',
	          //更替下拉列表界面所需sotre
	          'common.SelectFieldListStore'
	          ],
	         
	controllers : [ 
	                 // 登录Ctrl
	                'ApplicationController',
	                'login.PADLoginCtrl',
	                'login.PADMainCtrl',
	                //'login.PADMain_OA_Ctrl',
	                'map.MapCtrl',
	                
	                //--商机管理
	                
	                //2015-7-22 查找商机 New
	                'OpportunityManagement.Project_New.ProjectCtrl',
	                'OpportunityManagement.Project_New.ProjectSearchPrepareCtrl',
	                'OpportunityManagement.Project_New.ProjectSearchCtrl',
	                'OpportunityManagement.Project_New.ProjectInfoCtrl',
	                'OpportunityManagement.Project_New.BusinessAgentCtrl',
	                'OpportunityManagement.Project_New.CustomerDemandAnalysisCtrl',
	                'OpportunityManagement.Project_New.CompetitorAnalysisCtrl',
	                'OpportunityManagement.Project_New.OpportunityOutflowReasonAnalysisCtrl',
	                'OpportunityManagement.Project_New.BusinessAttachmentCtrl',
	                'OpportunityManagement.Project_New.ProjectListCtrl',
	                
	                
	               
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
	                'OpportunityManagement.Agents.CustomerSelectCtrl',
	                
	                //代理商报备
	                //'OpportunityManagement.Agents.CustomContactCtrl',
	                //更替下拉列表界面的控制器
	                'common.SelectFieldListCtrl',
	                //设置
	                'more.UpdatePasswordCtrl',
	                ],
	launch :function() {
		if (Ext.os.is.Android) {
			//this.getApplication().getController('login.PADLoginCtrl').MaaS360Detect();//检测设备是否安装MaaS360
		}
		
		Ext.define('Ext.Component', {
			override: 'Ext.Component',
		    show: function (animation) {
		        return this.callParent([false]);
		    },
		    hide: function (animation) {
		        return this.callParent([false]);
		    }
		});
		
		Ext.Viewport.add(Ext.create('HelcAgent.view.login.PADLogin'));
		/*Ext.Viewport.add(Ext.create('HelcAgent.view.map.Map'));
		this.getApplication().getController('map.MapCtrl').PADMapKJname='bCIImportAddress';
		this.getApplication().getController('map.MapCtrl').MapCtrl_JRDT();
		this.getApplication().getController('map.MapCtrl').ZBName='cluePosition';*/
		
		//显示登陆账号
		if(checktoggle){
			Ext.getCmp('username').setValue(app_username);
		};
		
		//页面大小
		MapWidth=document.body.scrollWidth;
		MapHeight=document.body.scrollHeight;
		cc.log(MapWidth+' '+MapWidth)
		
		if(Ext.os.is.iOS){
			Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);
			Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
		};
		if (Ext.os.is.Android) { //andriod软键盘出现时，表单高度调整
            Ext.Viewport.on('painted', function() {//固定是个事件
                Ext.Viewport.setHeight(window.innerHeight);
            });
        };
		object = this;
	},
	
	handleOrientationChange: function(viewport, orientation, width, height){
		if(Ext.os.is.iOS){
			document.body.style.marginTop = "20px";
	        Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);
		}
	},
});