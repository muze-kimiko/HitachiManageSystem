/**
 * 安装计划模块 监视器
 * 2014-4-29 xcx
 */
//定义便于查询的公共变量

//用于查询数量 同下
/*var INT_TASK_ID;*/
//循环的次数 已处理好 暂时留着 随时可删
/*var instalcount;*/

//2014-5-4 xcx
/*//动态的tcode;
var installTcode;*/

/*//用于批量  按钮  的合同号
var PLselectHTH;*/
//用于批量  按钮  的工号
/*var PLselectGH;*/
//用于获取选中数据仓的下标
/*var newXb;*/
//2014-5-12
//用于批量判断是否直梯和扶梯
/*var PLtzType;*/
//判断是批量还是单个
/*var plnum;*/

//批量添加 用的数组
/*var  INSTALLPLTJ;*/

//单个添加 用的JSONStore条件
/*var installaddDGTJ;*/

//资源录入需要的数据  工号 从JSON中获取的
/*var  installplanZYLR_RESULT_XY;*/

//判断是从待办进还是安装项目进  1  2
/*var  intallplanDBXMnum;*/

//测试进入安装详细计划用
/*var AZXXJH_JINRU_index=0;
var AZXXJH_JINRU_FLAG=false;
*/
//标志 1不可改变 0可
var azjhflag=0;
Ext.define('HelcPDA.controller.install.installplan.installplanCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//跳转到安装计划首页
			install_Plan:'button[id=install_Plan]',
			
			/************************************************************************************
			 * 安装计划 页面
			 * */

			//安装计划首页    返回按钮
			installplan_FH_Button:'button[id=installplan_FH_Button]',
			
			//跳转到安装计划同步页面
			installplan_TBAN_Button:'button[id=installplan_TBAN_Button]',
			
			//跳转到安装计划查询页面
			installplan_CXAN_Button:'button[id=installplan_CXAN_Button]',
			/**
			 **
			 ************************************************************************************/

			
			/************************************************************************************
			 * 安装计划同步页面
			 * */
			
			//同步按钮
			instalPlanTBButtton:'button[id=instalPlanTBButtton]',
			
			//同步页面 返回按钮
			InstallPlanConditionSynchronization_id_FH_Button:'button[id=InstallPlanConditionSynchronization_id_FH_Button]',

			/**
			 **
			 ************************************************************************************/
			
			
			/************************************************************************************
			 * 安装计划 查询页面
			 * */

			//搜索按钮（JSONStore中查找）
			instalPlanSSButtton:'button[id=instalPlanSSButtton]',
			
			//查询页面 返回按钮
			InstallPlanQuery_FH_BUTTON:'button[id=InstallPlanQuery_FH_BUTTON]',
			
			/**
			 **
			 ************************************************************************************/
			
			
			/************************************************************************************
			 * 安装计划查询-工号列表  页面
			 * */
			//安装计划查询－工号列表 页面  返回按钮
			installPlanMPQ_FH_Button:'button[id=installPlanMPQ_FH_Button]',
			
			//安装计划查询－工号列表 页面 全选按钮
			installplanMQ_QXButton:'button[id=installplanMQ_QXButton]',
			
			//安装计划查询－工号列表 页面 反选按钮
			installplanMQ_FXButton:'button[id=installplanMQ_FXButton]',

			//安装计划查询－工号列表 页面 批量按钮
			installplanMQ_PLButton:'button[id=installplanMQ_PLButton]',
			
			//安装计划查询－工号列表 页面  批安装资源按钮
			installplanMQ_PAZZYButton:'button[id=installplanMQ_PAZZYButton]',
			
			/**
			 **安装计划查询-工号列表  页面
			 ************************************************************************************/
			
			
			/************************************************************************************
			 * 安装计划详细页面
			 * */
			
			//安装计划详细-首页  返回按钮
			instalPlan_HomePage_Button:'button[id=instalPlan_HomePage_Button]',

			//安装计划详细-首页  实绩按钮
			instalPlan_HomePage_SJ_Button:'button[id=instalPlan_HomePage_SJ_Button]',
			
			//安装计划详细-首页  提交按钮
			instalPlan_HomePage_TJ_Button:'button[id=instalPlan_HomePage_TJ_Button]',
			
			/**
			 **安装计划详细页面
			 ************************************************************************************/
			
			
			/************************************************************************************
			 * 安装计划  批量页面
			 * */
			
			//安装计划  批量页面 返回按钮
			installplan_AZJHXXTimes_FH_Button:'button[id=installplan_AZJHXXTimes_FH_Button]',

			//批量页面的 提交按钮
			installplan_AZJHXXTimes_TJ_Button:'button[id=installplan_AZJHXXTimes_TJ_Button]',
			
			/**
			  **
		      ************************************************************************************/	
			
			
			/************************************************************************************
			 * 安装计划与实绩 页面
			 * */

			//安装计划之实绩页面  返回按钮
			InstallPlanSJ_id_FH_Button:'button[id=InstallPlanSJ_id_FH_Button]',
			
			/**
			 **安装计划与实绩 页面
			 ************************************************************************************/
			
		},
		
		control:{
			//跳转到安装计划首页
			install_Plan:{
				tap:'install_Plan'
			},
			
			/************************************************************************************
			 * 安装计划 页面
			 * */
			
			//安装计划首页返回按钮
			'button#installplan_FH_Button':{
				tap:'installplan_FH_Button'
			},
			
			//跳转到安装计划同步页面
			'button#installplan_TBAN_Button':{
				tap:'installplan_TBAN_Button'
			},
			
			//跳转到安装计划查询页面
			'button#installplan_CXAN_Button':{
				tap:'installplan_CXAN_Button'
			},
			
			//判断未进场和在制
			'tabpanel#tabpanel_id':{
				activeitemchange:'tabpanel_id'
					
			},
			
			//单击未进场的值
			'list#instalPlanMylist':{
				itemtap:'instalPlanList'
			},
			
			//单击在制的值
			'list#instalPlanMylistTwo':{
				itemtap:'instalPlanListTwo'
			},
			/**
			 **安装计划 页面
			 ************************************************************************************/
			
			
			
			
			/************************************************************************************
			 * 安装计划 同步页面
			 * */
			
			//同步按钮
			'button#instalPlanTBButtton':{
				tap:'instalPlanTBButtton'
			},
			
			//同步页面 返回按钮
			'button#InstallPlanConditionSynchronization_id_FH_Button':{
				tap:'InstallPlanConditionSynchronization_id_FH_Button'
			},

			/**
			 **
			 ************************************************************************************/


			/************************************************************************************
			 * 安装计划 查询页面
			 * */
			
			//查询页面 返回按钮
			'button#InstallPlanQuery_FH_BUTTON':{
				tap:'InstallPlanQuery_FH_BUTTON'
			},

			//搜索（JSONStore中查找）
			'button#instalPlanSSButtton':{
				tap:'instalPlanSSButtton'
			},
			/**
			 **
			 ************************************************************************************/

			
			/************************************************************************************
			 * 安装计划查询-工号列表  页面
			 * */
			//安装计划查询－工号列表 页面  返回按钮
			'button#installPlanMPQ_FH_Button':{
				tap:'installPlanMPQ_FH_Button'
			},

			//安装计划查询－工号列表 页面 全选按钮
			'button#installplanMQ_QXButton':{
				tap:'installplanMQ_QXButton'
			},
			
			//安装计划查询－工号列表 页面 反选按钮
			'button#installplanMQ_FXButton':{
				tap:'installplanMQ_FXButton'
			},
			
			//安装计划查询－工号列表 页面 批量按钮
			'button#installplanMQ_PLButton':{
				tap:'installplanMQ_PLButton'
			},
			
			//安装计划查询－工号列表 页面  批安装资源按钮    2014-5-29
			'button#installplanMQ_PAZZYButton':{
				tap:'installplanMQ_PAZZYButton'
			},
			
			//安装计划查询－工号列表 页面  单击工号列表中的值获取详细信息
			'list#MPid_mylist':{
				itemtap:'MPid_mylist'
			},
			
			//进入待提交页面
			'button#installplan_MQ_JRDTJ':{
				tap:'installplan_MQ_JRDTJ'
			},
			/**
			 **
			 ************************************************************************************/

			
			/************************************************************************************
			 * 安装计划详细页面
			 * */
			
			//安装计划详细-首页    返回按钮
			'button#instalPlan_HomePage_Button':{
				tap:'instalPlan_HomePage_Button'
			},

			//安装计划详细 实绩按钮
			'button#instalPlan_HomePage_SJ_Button':{
				tap:'instalPlan_HomePage_SJ_Button'
			},
			
			//安装计划详细-首页  提交按钮
			'button#instalPlan_HomePage_TJ_Button':{
				tap:'instalPlan_HomePage_TJ_Button'
			},
			
			//安装计划详细  页面    活动判断
			'tabpanel#tabpanel_instalPlan_HomePage':{
				activeitemchange:'tabpanel_instalPlan_HomePage'
			},
			
			/***************************************************************************
			 * 单个页面
			 * 
			 * **************************************************************************
			 */			
						//安装计划详细   录入数据  直梯  起始时间
						//进场
						'textfield#ZT_PJDS_START_TIME':{
							change:'ZT_PJDS_START_TIME'
						},
						'textfield#ZT_PJDS_END_TIME':{
							change:'StartAndEnd'
						},
						
						'textfield#ZT_DTFH_START_TIME':{
							change:'StartAndEnd'
						},
						'textfield#ZT_DTFH_END_TIME':{
							change:'StartAndEnd'
						},
						//放样
						'textfield#ZT_DTDZ_START_TIME':{
							change:'StartAndEnd'
						},
						'textfield#ZT_DTDZ_END_TIME':{
							change:'StartAndEnd'
						},
						//安装撑架
						'textfield#ZT_JCFX_START_TIME':{
							change:'StartAndEnd'
						},
						'textfield#ZT_JCFX_END_TIME':{
							change:'StartAndEnd'
						},
						//定主机
						'textfield#ZT_ZJDG_START_TIME':{
							change:'StartAndEnd'
						},
						'textfield#ZT_ZJDG_END_TIME':{
							change:'StartAndEnd'
						},
						//安装轿架及轿厢
						'textfield#ZT_MTMT_START_TIME':{
							change:'StartAndEnd'
						},
						'textfield#ZT_MTMT_END_TIME':{
							change:'StartAndEnd'
						},
						//电气接线
						'textfield#ZT_JFAZJX_START_TIME':{
							change:'StartAndEnd'
						},
						'textfield#ZT_JFAZJX_END_TIME':{
							change:'StartAndEnd'
						},
						//报调日期
						'textfield#ZT_JJJXPJ_START_TIME':{
							change:'StartAndEnd'
						},
						'textfield#ZT_JJJXPJ_END_TIME':{
							change:'StartAndEnd'
						},
						//报检日期
						'textfield#ZT_CP_START_TIME':{
							change:'StartAndEnd'
						},
						'textfield#ZT_CP_END_TIME':{
							change:'StartAndEnd'
						},
						//验收完成日期
						'textfield#ZT_DKSB_START_TIME':{
							change:'StartAndEnd'
						},
						'textfield#ZT_DKSB_END_TIME':{
							change:'StartAndEnd'
						},
						//技检日期
						'textfield#ZT_DTTS_START_TIME':{
							change:'StartAndEnd'
						},
						'textfield#ZT_DTTS_END_TIME':{
							change:'StartAndEnd'
						},
						//完工日期
						'textfield#ZT_CJ_START_TIME':{
							change:'StartAndEnd'
						},
						'textfield#ZT_CJ_END_TIME':{
							change:'StartAndEnd'
						},
						//移交客户日期
						'textfield#ZT_ZFJ_START_TIME':{
							change:'StartAndEnd'
						},
						'textfield#ZT_ZFJ_END_TIME':{
							change:'StartAndEnd'
						},'selectfield#Construction_methods':{
							change:'Construction_methods'
						},
						
						//安装计划详细   录入数据  扶梯  起始时间
						//进场
						'textfield#FT_AZ_START_TIME':{
							change:'FT_AZ_START_TIME'
						},
						'textfield#FT_AZ_END_TIME':{
							change:'StartAndEnd'
						},
						//桁架样架定位
						'textfield#FT_TS_START_TIME':{
							change:'StartAndEnd'
						},
						'textfield#FT_TS_END_TIME':{
							change:'StartAndEnd'
						},
						//玻璃侧板安装
						'textfield#FT_CJ_START_TIME':{
							change:'StartAndEnd'
						},
						'textfield#FT_CJ_END_TIME':{
							change:'StartAndEnd'
						},
						//扶手带组件安装
						'textfield#FT_ZJ_START_TIME':{
							change:'StartAndEnd'
						},
						'textfield#FT_ZJ_END_TIME':{
							change:'StartAndEnd'
						},
						//步级安装
						'textfield#FT_bjaz_START_TIME':{
							change:'StartAndEnd'
						},
						//动力电源
						'textfield#FT_dldy_START_TIME':{
							change:'StartAndEnd'
						},
						//报调日期
						'textfield#FT_bt_START_TIME':{
							change:'StartAndEnd'
						},
						//报检日期
						'textfield#FT_bj_START_TIME':{
							change:'StartAndEnd'
						},
						//验收完成日期
						'textfield#FT_yswc_START_TIME':{
							change:'StartAndEnd'
						},
						//技检
						'textfield#FT_jj_START_TIME':{
							change:'StartAndEnd'
						},
						//完工
						'textfield#FT_wg_START_TIME':{
							change:'StartAndEnd'
						},
						//移交客户日期
						'textfield#FT_yjkh_START_TIME':{
							change:'StartAndEnd'
						},
						//itm
						//进场
						'textfield#ITM_JC_START_TIME':{
							change:'StartAndEnd'
						},
						//完工
						'textfield#ITM_WG_START_TIME':{
							change:'StartAndEnd'
						},
						//移交客户日期
						'textfield#ITM_YJKH_START_TIME':{
							change:'StartAndEnd'
						},
						
						
			/**
			 **安装计划详细页面
			 ************************************************************************************/
			
						
						
			/************************************************************************************
			 * 安装计划  批量页面
			 * */
			
			//安装计划  批量页面 返回按钮
			'button#installplan_AZJHXXTimes_FH_Button':{
				tap:'installplan_AZJHXXTimes_FH_Button'
			},

			//批量页面的 提交按钮
			'button#installplan_AZJHXXTimes_TJ_Button':{
				tap:'installplan_AZJHXXTimes_TJ_Button'
			},
					
			/***************************************************************************
			 * 批量页面
			 */			
						//安装计划详细   录入数据  直梯  起始时间
						//棚架搭设
						'textfield#ZT_PJDS_START_TIME_TWO':{
							change:'ZT_PJDS_START_TIME_TWO'
						},
						'textfield#ZT_PJDS_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//电梯发货
						'textfield#ZT_DTFH_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#ZT_DTFH_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//电梯吊装
						'textfield#ZT_DTDZ_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#ZT_DTDZ_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//安装进场放线
						'textfield#ZT_JCFX_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#ZT_JCFX_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//安装支架导轨
						'textfield#ZT_ZJDG_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#ZT_ZJDG_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//门套及厅门安装
						'textfield#ZT_MTMT_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#ZT_MTMT_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//机房设备安装、机房放线接线
						'textfield#ZT_JFAZJX_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#ZT_JFAZJX_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//桥架、桥厢拼装
						'textfield#ZT_JJJXPJ_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#ZT_JJJXPJ_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//拆棚
						'textfield#ZT_CP_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#ZT_CP_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//底坑设备
						'textfield#ZT_DKSB_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#ZT_DKSB_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//电梯调度
						'textfield#ZT_DTTS_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#ZT_DTTS_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//厂检
						'textfield#ZT_CJ_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#ZT_CJ_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//政府部门验收
						'textfield#ZT_ZFJ_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#ZT_ZFJ_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						
						//安装计划详细   录入数据  扶梯  起始时间
						//安装
						'textfield#FT_AZ_START_TIME_TWO':{
							change:'FT_AZ_START_TIME_TWO'
						},
						'textfield#FT_AZ_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//调试
						'textfield#FT_TS_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#FT_TS_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//厂检
						'textfield#FT_CJ_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#FT_CJ_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//政府检
						'textfield#FT_ZJ_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#FT_ZJ_END_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						//0605
						'textfield#FT_bjaz_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#FT_dldy_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#FT_bt_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#FT_bj_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#FT_yswc_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#FT_jj_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#FT_wg_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#FT_yjkh_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#FT_yjkh_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#ITM_JC_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#ITM_WG_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
						'textfield#ITM_YJKH_START_TIME_TWO':{
							change:'StartAndEndTWO'
						},
			/**
			  **
		      ************************************************************************************/			
			
						
						
			/************************************************************************************
			 * 安装计划与实绩 页面
			 * */
			
			//安装计划之实绩页面  返回按钮
			'button#InstallPlanSJ_id_FH_Button':{
				tap:'InstallPlanSJ_id_FH_Button'
			},

			/**
			  **安装计划与实绩 页面
			  ************************************************************************************/			
			
		},
	},
	
	/**
	 * 要求:
	 * 显示的数据除了同步,其它都要从JSONStore中查找
	 * 未进场（false）和在制(ture)传递的区别除了方法还有字段IS_ENTRANCE 
	 * JSONStore 中的tcode的值区分未进场和在制 
	 * tid的值是合同号加工号加批次
	 * 一个合同号后面可能有多个工号
	 * 一个工号后面可能有多个批次
	 * 安装计划查询-工号列表中的数据是从JSONStore中获取的
	 * 按同步按钮远程获取数据，进来从JSONStore中获取数据
	 */
	
	//跳转到安装计划首页
	install_Plan:function(){
		var this_obj = this; 
		//首先页面跳转
		this.NextView("installplan_id","HelcPDA.view.install.installplan.installPlan");
		//首先判断JSONStore中是否有数据，没有
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:'installplantrue'};
    	var query2={tcode:'installplanfalse'};
    	var options={
    			exacte:false,//默认
    	};
    	MaintainList.find(query,options).then(function(arrayResults){
			var num=arrayResults.length;
			var titleZZ=document.getElementById("zz");
			var installTcode='installplantrue';
			Ext.getCmp('installTcode').setValue(installTcode);
			titleZZ.innerHTML='在制('+num+')';
			if(num!=0){
    			this_obj.AddListPlan();
			}else{
				WL.Toast.show("本地不存在在制数据！");
			};
			//二次
			MaintainList.find(query2,options).then(function(arrayResults){
				var num=arrayResults.length;
				var titleWJC=document.getElementById("wjc");
				titleWJC.innerHTML='未进场('+num+')';
				var installTcode='installplanfalse';
				Ext.getCmp('installTcode').setValue(installTcode);
				if(num!=0){
	    			this_obj.AddListPlan();
				}else{
					WL.Toast.show("本地不存在未进场数据！");
				};
			}).fail(function(errorObject){
				console.log("查询数据失败");
			});
			
		}).fail(function(errorObject){
			console.log("查询数据失败");
		});
	},
	
	/************************************************************************************
	 * 安装计划 页面
	 * */
	//安装计划首页返回按钮 
	installplan_FH_Button:function(){
		//判断是从待办进还是安装项目进  1  2
		var intallplanDBXMnum=Ext.getCmp('intallplanDBXMnum').getValue();
		
		//判断是从待办进来还是从安装项目进来
		if(intallplanDBXMnum==1){//待办
			this.BackView();
//			this.showBackView("MenusView_id","HelcPDA.view.MenusView");
		}else if(intallplanDBXMnum==2){//安装项目
			this.BackView();
//			this.showBackView("installProject_id","HelcPDA.view.install.installProject");
		};
		
		//清空安装计划数据仓
		var MaintList=Ext.data.StoreManager.get('HelIntTasksAllStore');
		if (!MaintList) { 
			MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStore"); 
		};
		var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreThree');
		if (!MaintList2) { 
			MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreThree"); 
		};
		//先清空数据仓
		var record=[];
		MaintList.setData(record, this);
		MaintList2.setData(record, this);
	},
	
	//跳转到安装计划同步页面
	installplan_TBAN_Button:function(){
		this.NextView('InstallPlanConditionSynchronization_id','HelcPDA.view.install.installplan.InstallPlanConditionSynchronization');
	},
	
	//跳转到安装计划查询页面
	installplan_CXAN_Button:function(){
		this.NextView('InstallPlanQuery_id','HelcPDA.view.install.installplan.InstallPlanQuery');
	},
	
	//判断未进场和在制
	tabpanel_id:function( obj,value,oldValue,eOpts  ){
			var tp_chart = Ext.getCmp("tabpanel_id");
			var itemId = tp_chart.getActiveItem().getId();
			var installTcode='';
			if (itemId == 'instalPlanWJCButton') {
				installTcode='installplantrue';
				console.log('在制');
			} else if (itemId == 'instalPlanZZButton') {
				installTcode='installplanfalse';
				console.log('未进场');
			};
			
			var tocde=Ext.getCmp('installTcode');
			if(tocde==undefined){
				return;
			};
			tocde.setValue(installTcode);
	},
	
	//获取同一合同号的不同工号  未进场
	instalPlanList:function(dataview, index, target, record, e, eOpts){
		//跳转到安装计划查询页面
		this.NextView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
		
		var MaintList=Ext.data.StoreManager.get('HelIntTasksAllStore');
		if (!MaintList) { 
			MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStore"); 
		};
		var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
		if (!MaintList2) { 
			MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
		};
		//先清空数据仓
		var record=[];
		MaintList2.setData(record, this);
		
		var recordData=[];
		
		//获取要查询的合同号
		var HT=MaintList.getAt(index).get('ENGCONTRACT_NUMBER');
		
		var PLselectHTH=HT;
		//用于提交按钮的 合同号
		Ext.getCmp('PLselectHTH').setValue(PLselectHTH);
		
		//未进场和在制的判断
		var installTcode=Ext.getCmp('installTcode').getValue();
		
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:installTcode,tid:HT};
		var options={
			exacte:false,//默认
		};
		var ZT;//状态
    	MaintainList.find(query,options).then(function(arrayResults){
    		var num=arrayResults.length;
    		console.log('instalPlanMylist7拥有的台数: '+num);
    		for(var i=0;i<num;i++){
    			var data=arrayResults[i].json.stext;
    			console.log("data",data);
    			var dataVN=data.VERSION_NUM;
    			var dataBBH=data.VERSION_NUM;
    			if(arrayResults[i].json.status == 1) {
    				ZT='已进入待提交列表';
    			} else {
    				if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
    					if(arrayResults[i].json.status==""||typeof(arrayResults[i].json.status)=='undefined'){
            				ZT='未计划';
            				dataBBH='无';
        					}else{
        				    ZT='已计划';	
        					}
        			}else{
        				ZT='已计划';
        			};    				
    			}
    			//工号     批次    类型  版本号  状态（未计划，已计划）合同号 工法
    			var trim={ELEVATOR_NO:data.ELEVATOR_NO,SEQ_NUM:data.SEQ_NUM,
    					ELEVATOR_CLASS_NAME:data.ELEVATOR_CLASS_NAME,
    					VERSION_NUM:dataBBH,STATUS:ZT,ENGCONTRACT_NUMBER:data.ENGCONTRACT_NUMBER,
    					TASK_PROCESS_ID:data.TASK_PROCESS_ID,TASK_ID:data.TASK_ID,BUDGET_INSTALL_METHOD:data.BUDGET_INSTALL_METHOD};
    			recordData[i]=trim;
    			console.log("trim",JSON.stringify(trim));
    		};
    		MaintList2.setData(recordData, this);
    	}).fail(function(errorObject){
			console.log("查询数据失败");
		});
	},
	
	//获取同一合同号的不同工号  在制
	instalPlanListTwo:function(dataview, index, target, record, e, eOpts){
		//跳转到安装计划查询页面
		this.NextView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
		
		var MaintList=Ext.data.StoreManager.get('HelIntTasksAllStoreThree');
		if (!MaintList) { 
			MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreThree"); 
		};
		var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
		if (!MaintList2) { 
			MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
		};
		//先清空数据仓
		var record=[];
		MaintList2.setData(record, this);
		//console.log('要清理的数据:'+JSON.stringify(record));
		var recordData=[];
		//获取要查询的合同号
		var HT=MaintList.getAt(index).get('ENGCONTRACT_NUMBER');
		
		var PLselectHTH=HT;
		//用于提交按钮的 合同号
		Ext.getCmp('PLselectHTH').setValue(PLselectHTH);
		
		//未进场和在制的判断
		var installTcode=Ext.getCmp('installTcode').getValue();
		
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:installTcode,tid:HT};
		var options={
			exacte:false,//默认
		};
		var ZT;//状态
    	MaintainList.find(query,options).then(function(arrayResults){
    		var num=arrayResults.length;
    		console.log('instalPlanMylist7拥有的台数: '+num);
    		for(var i=0;i<num;i++){
    			var data=arrayResults[i].json.stext;
    			var dataVN=data.VERSION_NUM;
    			var dataBBH=data.VERSION_NUM;
    			if(arrayResults[i].json.status == 1) {
    				ZT='已进入待提交列表';
    			} else {
    				if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
    					if(arrayResults[i].json.status==""||typeof(arrayResults[i].json.status)=='undefined'){
            				ZT='未计划';
            				dataBBH='无';
        					}else{
        				    ZT='已计划';	
        					}
        			}else{
        				ZT='已计划';
        			};    				
    			}
    			//工号     批次    类型  版本号  状态（未计划，已计划）  合同号
    			var trim={ELEVATOR_NO:data.ELEVATOR_NO,
    					SEQ_NUM:data.SEQ_NUM,
    					ELEVATOR_CLASS_NAME:data.ELEVATOR_CLASS_NAME,
    					VERSION_NUM:dataBBH,
    					STATUS:ZT,
    					ENGCONTRACT_NUMBER:data.ENGCONTRACT_NUMBER,
    					TASK_PROCESS_ID:data.TASK_PROCESS_ID,
    					TASK_ID:data.TASK_ID,
    					BUDGET_INSTALL_METHOD:data.BUDGET_INSTALL_METHOD};
    			recordData[i]=trim;
    			console.log(JSON.stringify(trim));
    		};
    		MaintList2.setData(recordData, this);
    	}).fail(function(errorObject){
			console.log("查询数据失败");
		});
	},
	
	/**
	 **
	 ************************************************************************************/
	
	
	/************************************************************************************
	 * 安装计划  同步页面
	 * */
	//同步按钮方法，单击同步按钮获取数据
	//先删除安装计划页面数据仓的数据  在查找在添加
	instalPlanTBButtton:function(){
		//未进场和在制的判断
		var installTcode=Ext.getCmp('installTcode').getValue();
		console.log('判断：'+installTcode);
		
		if(installTcode=='installplanfalse'){
			MaintList=Ext.data.StoreManager.get('HelIntTasksAllStore');
			if (!MaintList) { 
				MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStore"); 
			};
			MaintList.setData([]);
		}else if(installTcode=='installplantrue'){
			MaintList=Ext.data.StoreManager.get('HelIntTasksAllStoreThree');
			if (!MaintList) { 
				MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreThree"); 
			};
			MaintList.setData([]);
		};
		this.deleteinstalPlanTBButtton();
	},
	
	//删除JSON中的数据
	//根据installTcode 选择删除
	deleteinstalPlanTBButtton:function(){
		//未进场和在制的判断
		var installTcode=Ext.getCmp('installTcode').getValue();
		
		var this_obj = this;
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var instalplan={tcode:installTcode};
    	var options={exacte:true};//默认是false
		MaintainList.remove(instalplan,options).then(function(){
			console.log(installTcode+'删除成功');
			this_obj.queryinstalPlanTBButtton();
		}).fail(function(){
			console.log(installTcode+'删除失败');
		});
	},
	
	//查询数据库中的数据
	queryinstalPlanTBButtton:function(){
		console.log('同步远程查询');
		
		//未进场和在制的判断
		var installTcode=Ext.getCmp('installTcode').getValue();
		
		//获取查询数据的条数
		var flag='';
		if(installTcode=='installplanfalse'){
			console.log('installplanfalse');
			flag=false;
		}else if(installTcode=='installplantrue'){
			console.log('installplantrue');
			flag=true;
		};
		var ENGCONTRACT_NUMBER=Ext.getCmp('ENGCONTRACT_NUMBER').getValue();
		//工号
		var ELEVATOR_NO=Ext.getCmp('ELEVATOR_NO').getValue();
		//客户
		var CUSTOMER_NAME=Ext.getCmp('CUSTOMER_NAME').getValue();
	
		var Trim="{'IS_ENTRANCE':'"+flag+"','init_person_id':'"+init_person_id+"',ENGCONTRACT_NUMBER:'"+ENGCONTRACT_NUMBER+"',ELEVATOR_NO:'"+ELEVATOR_NO+"',CUSTOMER_NAME:'"+CUSTOMER_NAME+"'}";
		WL.ClientMessages.loading = "正在获取数据";
		myLoading = new WL.BusyIndicator('content');
		this.connectServerMainTain(this.queryinstalPlanTBButtton2,this,"installPlanAction.do?method=toSearchCount",Trim);
	},
	
	//未进场和在制的数量查询
	queryinstalPlanTBButtton2:function(result,obj){
		if(result.count==0){
			WL.Toast.show("数据不存在");
			return;
		};
		console.log(JSON.stringify(result));
		var allCount = result.count;
//		var arrCno = result.arrCno;
//		var tempArr = arrCno.slice(5000,10000);
		//11.03
		var instalcount=parseInt((result.count/100)+1);
		console.log("instalcount:"+instalcount+"allCount"+allCount);
		//查询起始位置
		var INT_TASK_ID=0;
		var index = 0;
		//条件
		//安装合同号
		var ENGCONTRACT_NUMBER=Ext.getCmp('ENGCONTRACT_NUMBER').getValue();
		//工号
		var ELEVATOR_NO=Ext.getCmp('ELEVATOR_NO').getValue();
		//客户
		var CUSTOMER_NAME=Ext.getCmp('CUSTOMER_NAME').getValue();
		
		//跳转回 安装计划页面
		obj.showBackView("installplan_id","HelcPDA.view.install.installplan.installPlan");
		
		var td={};
		td.ENGCONTRACT_NUMBER=ENGCONTRACT_NUMBER;
		td.ELEVATOR_NO=ELEVATOR_NO; 
		td.CUSTOMER_NAME=CUSTOMER_NAME; 
		td.init_person_id=init_person_id; 
		td.IsNewVersion=true;
		td.INT_TASK_ID=INT_TASK_ID;
		
		//未进场和在制的判断
		var installTcode=Ext.getCmp('installTcode').getValue();
		
		if(installTcode=='installplanfalse'){
			td.IS_ENTRANCE=false; 
		}else if(installTcode=='installplantrue'){
			td.IS_ENTRANCE=true; 
		};
		
		//清楚显示查询数据条数
		if(installTcode=='installplanfalse'){
			var titleWJC=document.getElementById("wjc");
			titleWJC.innerHTML='未进场';
			
			//让查询数据页活动
    		var tp_chart = Ext.getCmp("tabpanel_id");
    		var tab=tp_chart.getInnerItems(); 
    		tp_chart.setActiveItem(tab[0]);
    		
		}else if(installTcode=='installplantrue'){
			var titleZZ=document.getElementById("zz");
			titleZZ.innerHTML='在制';
			
			var tp_chart = Ext.getCmp("tabpanel_id");
    		var tab=tp_chart.getInnerItems(); 
    		tp_chart.setActiveItem(tab[1]);
		};
		
		
		//装查询到的数据
		var resultData=[];
		try{
			var loadedCount = 0;
			WL.ClientMessages.loading = "共"+ allCount +"条，已加载：" + (100*index);
			myLoading = new WL.BusyIndicator('content');
//			var tempArr = arrCno.slice(index*5,(index + 1)*5);
//			td.arrCno = tempArr; 
			obj.connectServerMainTain(handleResult,obj,"installPlanAction.do?method=toSearch",JSON.stringify(td));
			function handleResult(result,obj) {
				//alert(index);
				resultData[index]=result;
//				loadedCount += result.item.length;
				index ++;
				td.INT_TASK_ID = result.INT_TASK_ID;
				console.log("index:"+index+"zhazha:"+JSON.stringify(td));
//				td.INT_TASK_ID = 0;
				/*tempArr = arrCno.slice(index*5,(index + 1)*5);
				td.arrCno = tempArr;
				*/ 
//				if (tempArr.length > 0) {
				if (index < instalcount) {
					console.log("allCount:"+allCount+"index:"+index);
					WL.ClientMessages.loading = "共"+ allCount +"条，已加载：" + (100*index);
					myLoading = new WL.BusyIndicator('content');
					obj.connectServerMainTain(handleResult,obj,"installPlanAction.do?method=toSearch",JSON.stringify(td));
				} else {
					//全部查询完后，在显示数据
					//alert('resultData:'+resultData.length);
					console.log("resultdata:"+JSON.stringify(resultData)+"hehe:"+resultData.length);
					obj.AddListPlan2(resultData);
					return ;
				};
			};
		}catch(err){
			Ext.Msg.alert('查询出错');
		}
		
		
	},
	
	//根据工号查询服务商的方法   废弃的 2014-12-4
/*	SelectFWS:function(result,obj){
		//长度
		var length=result.item.length;
		if(length>0){
			var ghData=[];
			var ghi=0;
		function stationFWS(json){
			console.log('ghi  '+ghi);
			var trims={};
			var data=[];
			data=json.items;
			trims.ELEVATOR_NO=result.item[ghi].ELEVATOR_NO;
			for(var i=0;i<data.length;i++){
				if(data[i].PERSON_TYPE=='LIFT'){
					//吊装
					trims.dzNAME=data[i].VENDOR_NAME;
					trims.LIFT_VENDOR_ID=data[i].VENDOR_ID;
				}else if(data[i].PERSON_TYPE=='BUILD'){
					//搭棚
					trims.dpNAME=data[i].VENDOR_NAME;
					trims.BUILD_VENDOR_ID=data[i].VENDOR_ID;
				}else if(data[i].PERSON_TYPE=='INSTALL'){
					//安装
					trims.dwNAME=data[i].VENDOR_NAME;
					trims.INST_VENDOR_ID=data[i].VENDOR_ID;
				};
			};
			ghData[ghi]=trims;
			alert('ghi'+ghi+'   '+length);
			ghi++;
			if(ghi<length){
				var trim={};
				trim.ELEVATOR_NO=result.item[ghi].ELEVATOR_NO;
				console.log(result.item[ghi].ELEVATOR_NO);
				obj.connectServer(stationFWS,"installProcessAction.do?method=toSearchFWS",JSON.stringify(trim));
			}else{
				alert('jijijij');
				ghi=0;
				obj.addinstalPlanTBButtton(result,ghData,obj);
				
			};
		};
		var trim={};
		trim.ELEVATOR_NO=result.item[ghi].ELEVATOR_NO;
		obj.connectServer(stationFWS,"installProcessAction.do?method=toSearchFWS",JSON.stringify(trim));
	};
		

	},*/
	
	//添加JSON
	//可多次调用
/*	addinstalPlanTBButtton:function(result,obj){
		//console.log("查询到的东西    "+JSON.stringify(result));
		//console.log("查询到的东西2    "+JSON.stringify(ghData));
		//console.log("=========================================");
		//未进场和在制的判断
		//var installTcode=Ext.getCmp('installTcode').getValue();
		//console.log('查询installplan');	
		var length=result.item.length;
		
		var AZJH=[];
		alert('length '+length);
		for(var i=0;i<length;i++){
			alert(1);
			//条件
			var gh=result.item[i].ELEVATOR_NO;
			alert(gh);
			var fws=obj.SelectFWS(obj,gh);
			
			alert('出来了'+fws);
			if(fws!=undefined){
				alert('进来了');
				//吊装
				result.item[i].dzNAME=fws.dzNAME;
				result.item[i].LIFT_VENDOR_ID=fws.LIFT_VENDOR_ID;
				//搭棚
				result.item[i].dpNAME=fws.dpNAME;
				result.item[i].BUILD_VENDOR_ID=fws.BUILD_VENDOR_ID;
				//安装
				result.item[i].dwNAME=fws.dwNAME;
				result.item[i].INST_VENDOR_ID=fws.INST_VENDOR_ID;
			};
			
			//合同号    工号   批次
			var id=result.item[i].ENGCONTRACT_NUMBER+'/'+result.item[i].ELEVATOR_NO+'/'+result.item[i].SEQ_NUM;
			var plan={tcode:installTcode,tid:id,stext:result.item[i],ext1:result.progress[i]};
			AZJH[i]=plan;
		};
		
		//清空同步页面  条件文本框
		//obj.install_TBYM_WengBengKuangQK();
		alert('AZJH.length  '+AZJH.length);
		if(AZJH.length==0){
			return;
		};
		//添加
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	MaintainList.add(AZJH).then(function(){
    		alert('添加进来了');
    		console.log('installplan添加进来了');
    	}).fail(function(errorObject){
       		console.log('添加installplan出错');	
   		});
	},*/
	
	//用于同步 xcx  2015-1-16
	AddListPlan2:function(resultData){
		console.log('进不来吗?');
		var installTcode=Ext.getCmp('installTcode').getValue();
		//获得数据仓
		var MaintList='';
		if(installTcode=='installplanfalse'){
			MaintList=Ext.data.StoreManager.get('HelIntTasksAllStore');
			if (!MaintList) { 
				MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStore"); 
			};
		}else if(installTcode=='installplantrue'){
			MaintList=Ext.data.StoreManager.get('HelIntTasksAllStoreThree');
			if (!MaintList) { 
				MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreThree"); 
			};
		};
		
		//计算
		var resNum=resultData.length;
		//alert(' resNum'  +resNum);
		var AZJH=[];
		//var length=0;
		var length2=0;
		for(var y=0;y<resNum;y++){
			//alert('resultData[y].item.length:  '+resultData[y].item.length);
			/*if(resultData[y].item.length==0){
				alert('为零');
				return;
			};*/
			var length=resultData[y].item.length;
			//alert('length  '+length);
			for(var i=0;i<length;i++){
				//length2=length;
				//合同号    工号   批次
				var id=resultData[y].item[i].ENGCONTRACT_NUMBER+'/'+resultData[y].item[i].ELEVATOR_NO+'/'+resultData[y].item[i].SEQ_NUM;
				var plan={tcode:installTcode,tid:id,stext:resultData[y].item[i],ext1:resultData[y].progress[i]};
				AZJH[length2]=plan;
				length2++;
			};
		};
		
		//alert('出来了');
		
		//重JSON中查找数据
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:installTcode};
    	console.log('add的installTcode'+installTcode);
		var options={
			exacte:false,//默认
		};
		MaintainList.add(AZJH).then(function(){
    		//alert('添加进来了');
    		//console.log('installplan添加进来了');
    	
    	MaintainList.find(query,options).then(function(arrayResults){
    		//alert('查询到了');
    		var num=arrayResults.length;
    		//获取未进场和在制的数量
    		if(installTcode=='installplanfalse'){
    			var titleWJC=document.getElementById("wjc");
    			titleWJC.innerHTML='未进场('+num+')';
    			
    			//让查询数据页活动
	    		var tp_chart = Ext.getCmp("tabpanel_id");
	    		var tab=tp_chart.getInnerItems(); 
	    		tp_chart.setActiveItem(tab[0]);
	    		
    		}else if(installTcode=='installplantrue'){
    			var titleZZ=document.getElementById("zz");
    			titleZZ.innerHTML='在制('+num+')';
    			
    			var tp_chart = Ext.getCmp("tabpanel_id");
	    		var tab=tp_chart.getInnerItems(); 
	    		tp_chart.setActiveItem(tab[1]);
    		};
    		
    		//先查出不同的合同号
    		var ndata=[];//合同号
    		var ndata2=[];//记录合同号和合同号的地址
    		if(num==0){
    			WL.Toast.show("本地不存在数据！");
    			return;
    		};
    		for(var i=0;i<num;i++){
				ndata[i] = arrayResults[i].json.stext.ENGCONTRACT_NUMBER;
				var address=arrayResults[i].json.stext.CUSTOMER_NAME;
				var addressAnd={ENGCONTRACT_NUMBER:ndata[i],CUSTOMER_NAME:address};
				ndata2[i]=addressAnd;
			};
			//获得唯一合同
			var list=ndata.unique3();
			console.log('合同数量:'+list.length+'合同值'+list);
			//获取一个合同所拥有的台数
			var taiNum=[];//记录一个合同的台数
			var listnum=list.length;
			for(var i=0;i<listnum;i++){
				var count=0;
				for(var j=0;j<num;j++){
					if(ndata[j]==list[i]){
						count++;
					}
				};
				taiNum[i]=count;
			};
			
			//获取合同的地址
			var address2=[];
			for(var i=0;i<listnum;i++){
				for(var j=0;j<num;j++){
					if(list[i]==ndata2[j].ENGCONTRACT_NUMBER){
						address2[i]=ndata2[j].CUSTOMER_NAME;
						break;
					};
				};
			};
			
			//计算已计划和为计划出的数量
			var YJHNum=[];
			var WJHNum=[];
			for(var i=0;i<listnum;i++){
				var yjh=0;
				var wjh=0;
				
				for(var j=0;j<num;j++){
					var jhData=arrayResults[j].json.stext;
					if(list[i]==jhData.ENGCONTRACT_NUMBER){
						var dataVN=jhData.VERSION_NUM;
						if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
							wjh++;
		    			}else{
		    				yjh++;
		    			};
					};
					YJHNum[i]=yjh;
					WJHNum[i]=wjh;
				};
			};
			
			//获取整合后的数据
			var HTH=[]; 
			for(var i=0;i<listnum;i++){
				var Trim={ENGCONTRACT_NUMBER:list[i],NUM:taiNum[i],CUSTOMER_NAME:address2[i],YJH:YJHNum[i],WJH:WJHNum[i]};
				HTH[i]=Trim;
			}
			MaintList.setData(HTH, this);
			WL.Toast.show("数据查询完毕！");
			
    	}).fail(function(errorObject){
    		//alert('查询数据失败');
    		WL.Toast.show("数据查询失败");
		});
    	
		}).fail(function(errorObject){
			WL.Toast.show("数据2次查询失败");
       		console.log('添加installplan出错');	
   		});
	},
	
	//list1页面添加
	//把不同的合同号显示出来   ENGCONTRACT_NUMBER
	//工号台数
	//地址       PROJECT_NAME
	AddListPlan:function(){
		//alert('进入AddListPlan');
		var installTcode=Ext.getCmp('installTcode').getValue();
		//获得数据仓
		var MaintList='';
		if(installTcode=='installplanfalse'){
			MaintList=Ext.data.StoreManager.get('HelIntTasksAllStore');
			if (!MaintList) { 
				MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStore"); 
			};
		}else if(installTcode=='installplantrue'){
			MaintList=Ext.data.StoreManager.get('HelIntTasksAllStoreThree');
			if (!MaintList) { 
				MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreThree"); 
			};
		};
		
		//重JSON中查找数据
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:installTcode};
    	console.log('add的installTcode'+installTcode);
		var options={
			exacte:false,//默认
		};
    	MaintainList.find(query,options).then(function(arrayResults){
    		var num=arrayResults.length;
    		//获取未进场和在制的数量
    		if(installTcode=='installplanfalse'){
    			var titleWJC=document.getElementById("wjc");
    			titleWJC.innerHTML='未进场('+num+')';
    			
    			//让查询数据页活动
	    		var tp_chart = Ext.getCmp("tabpanel_id");
	    		var tab=tp_chart.getInnerItems(); 
	    		tp_chart.setActiveItem(tab[0]);
	    		
    		}else if(installTcode=='installplantrue'){
    			var titleZZ=document.getElementById("zz");
    			titleZZ.innerHTML='在制('+num+')';
    			
    			var tp_chart = Ext.getCmp("tabpanel_id");
	    		var tab=tp_chart.getInnerItems(); 
	    		tp_chart.setActiveItem(tab[1]);
    		};
    		
    		//先查出不同的合同号
    		var ndata=[];//合同号
    		var ndata2=[];//记录合同号和合同号的地址
    		if(num==0){
    			WL.Toast.show("本地不存在数据！");
    			return;
    		};
    		for(var i=0;i<num;i++){
				ndata[i] = arrayResults[i].json.stext.ENGCONTRACT_NUMBER;
				var address=arrayResults[i].json.stext.CUSTOMER_NAME;
				var addressAnd={ENGCONTRACT_NUMBER:ndata[i],CUSTOMER_NAME:address};
				ndata2[i]=addressAnd;
			};
			//获得唯一合同
			var list=ndata.unique3();
			console.log('合同数量:'+list.length+'合同值'+list);
			//获取一个合同所拥有的台数
			var taiNum=[];//记录一个合同的台数
			var listnum=list.length;
			for(var i=0;i<listnum;i++){
				var count=0;
				for(var j=0;j<num;j++){
					if(ndata[j]==list[i]){
						count++;
					}
				};
				taiNum[i]=count;
			};
			
			//获取合同的地址
			var address2=[];
			for(var i=0;i<listnum;i++){
				for(var j=0;j<num;j++){
					if(list[i]==ndata2[j].ENGCONTRACT_NUMBER){
						address2[i]=ndata2[j].CUSTOMER_NAME;
						break;
					};
				};
			};
			
			//计算已计划和为计划出的数量
			var YJHNum=[];
			var WJHNum=[];
			for(var i=0;i<listnum;i++){
				var yjh=0;
				var wjh=0;
				
				for(var j=0;j<num;j++){
					var jhData=arrayResults[j].json.stext;
					if(list[i]==jhData.ENGCONTRACT_NUMBER){
						var dataVN=jhData.VERSION_NUM;
						if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
							wjh++;
		    			}else{
		    				yjh++;
		    			};
					};
					YJHNum[i]=yjh;
					WJHNum[i]=wjh;
				};
			};
			
			//获取整合后的数据
			var HTH=[]; 
			for(var i=0;i<listnum;i++){
				var Trim={ENGCONTRACT_NUMBER:list[i],NUM:taiNum[i],CUSTOMER_NAME:address2[i],YJH:YJHNum[i],WJH:WJHNum[i]};
				HTH[i]=Trim;
			}
			MaintList.setData(HTH, this);
			WL.Toast.show("数据查询完毕！");
			
    	}).fail(function(errorObject){
    		alert('查询数据失败');
    		WL.Toast.show("数据查询失败");
		});
    	
	},
	
	//同步页面返回 按钮
	InstallPlanConditionSynchronization_id_FH_Button:function(){
		//清空同步页面  条件文本框
		this.install_TBYM_WengBengKuangQK();
		//跳转回 安装计划页面
		this.showBackView("installplan_id","HelcPDA.view.install.installplan.installPlan");
	},
	
	//同步页面文本框清空
	install_TBYM_WengBengKuangQK:function(){
		Ext.getCmp('ENGCONTRACT_NUMBER').setValue('');
		Ext.getCmp('ELEVATOR_NO').setValue('');
		Ext.getCmp('CUSTOMER_NAME').setValue('');
	},
	
	/**
	 **
	 ************************************************************************************/


	/************************************************************************************
	 * 安装计划 查询页面
	 * */
	//查询页面 返回按钮
	InstallPlanQuery_FH_BUTTON:function(){
		//查询页面文本框清空
		this.install_CXYM_WengBengKuangQK();
		//跳转回 安装计划页面
		this.showBackView("installplan_id","HelcPDA.view.install.installplan.installPlan");
	},

	//查询页面文本框清空
	install_CXYM_WengBengKuangQK:function(){
		Ext.getCmp('SS_ENGCONTRACT_NUMBER').setValue('');
		Ext.getCmp('SS_ELEVATOR_NO').setValue('');
		Ext.getCmp('SS_CUSTOMER_NAME').setValue('');
	},
	
	//搜索（JSONStore中查找）
	instalPlanSSButtton:function(){
    	var this_obj=this;
		console.log('进入instalPlanSSButtton');
		
		//未进场和在制的判断
		var installTcode=Ext.getCmp('installTcode').getValue();
		
		//获得数据仓
		var MaintList='';
		if(installTcode=='installplanfalse'){
			MaintList=Ext.data.StoreManager.get('HelIntTasksAllStore');
			if (!MaintList) { 
				MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStore"); 
			};
		}else if(installTcode=='installplantrue'){
			MaintList=Ext.data.StoreManager.get('HelIntTasksAllStoreThree');
			if (!MaintList) { 
				MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreThree"); 
			};
		};
		
		//安装合同号
		var ENGCONTRACT_NUMBER=Ext.getCmp('SS_ENGCONTRACT_NUMBER').getValue();
		//工号
		var ELEVATOR_NO=Ext.getCmp('SS_ELEVATOR_NO').getValue();
		//合同号    工号   批次
		var id='';
		if(ENGCONTRACT_NUMBER!=''){
			id=ENGCONTRACT_NUMBER;
		}else if(ELEVATOR_NO!=''){
			id=ELEVATOR_NO;
		}else if(ENGCONTRACT_NUMBER!=''&&ELEVATOR_NO!=''){
			 id=ENGCONTRACT_NUMBER+'/'+ELEVATOR_NO;
		};
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:installTcode,tid:id};
    	console.log('add的installTcode'+installTcode);
		var options={
			exacte:false,//默认
		};
    	MaintainList.find(query,options).then(function(arrayResults){
    		var num=arrayResults.length;
    		console.log('num: '+num+'arrayResults: '+JSON.stringify(arrayResults));
    		var ndata=[];//合同号
    		var ndata2=[];//记录合同号和合同号的地址
    		if(num==0){
    			WL.Toast.show("本地不存在数据！");
    			return;
    		};
    		for(var i=0;i<num;i++){
				ndata[i] = arrayResults[i].json.stext.ENGCONTRACT_NUMBER;
				var address=arrayResults[i].json.stext.CUSTOMER_NAME;
				var addressAnd={ENGCONTRACT_NUMBER:ndata[i],CUSTOMER_NAME:address};
				ndata2[i]=addressAnd;
				console.log('JSON '+JSON.stringify(ndata2[i]));
			};
			//获得唯一合同
			var list=ndata.unique3();
			console.log('合同数量:'+list.length+'合同值'+list);
			//获取一个合同所拥有的台数
			var taiNum=[];//记录一个合同的台数
			var listnum=list.length;
			for(var i=0;i<listnum;i++){
				var count=0;
				for(var j=0;j<num;j++){
					if(ndata[j]==list[i]){
						count++;
					}
				};
				taiNum[i]=count;
			};
			//获取合同的地址
			console.log('listnum:'+listnum+'num:'+num);
			var address2=[];
			for(var i=0;i<listnum;i++){
				for(var j=0;j<num;j++){
					console.log('合同列表：'+(list[i]+' '+JSON.stringify(ndata2[j].ENGCONTRACT_NUMBER)));
					if(list[i]==ndata2[j].ENGCONTRACT_NUMBER){
						address2[i]=ndata2[j].CUSTOMER_NAME;
						console.log('地址: '+JSON.stringify(address2[i]));
						break;
					}
				}
			};
			//获取整合后的数据
			var HTH=[]; 
			for(var i=0;i<listnum;i++){
				var Trim={ENGCONTRACT_NUMBER:list[i],NUM:taiNum[i],CUSTOMER_NAME:address2[i]};
				HTH[i]=Trim;
				console.log(HTH[i]);
			}
			MaintList.setData(HTH, this);
			WL.Toast.show("数据查询完毕！");
			
			//跳回安装计划页面
			this_obj.showBackView("installplan_id","HelcPDA.view.install.installplan.installPlan");
    	}).fail(function(){
			console.log(installTcode+'查询失败');
		});
    	
	},
	
	/**
	 **
	 ************************************************************************************/
	
	
	
	/************************************************************************************
	 * 安装计划查询-工号列表  页面
	 * */

	//安装计划查询－工号列表 页面  返回按钮
	installPlanMPQ_FH_Button:function(){
		this.showBackView("installplan_id","HelcPDA.view.install.installplan.installPlan");
		//测试进入安装详细计划用 1
		var AZXXJH_JINRU_index=0;
		Ext.getCmp('AZXXJH_JINRU_index').setValue(AZXXJH_JINRU_index);
		this.AddListPlan();
	},

	//安装计划查询－工号列表 页面 全选按钮
	installplanMQ_QXButton:function(){
		var sele=document.getElementsByName('groupCheckboxinstall');
	    for ( var i = 0; i <sele.length; i++)  
	    {  
	      // 提取控件  
	      var checkbox = sele[i]; 
	      checkbox.style.color='#e03a3e';
	    };
	},
	
	//安装计划查询－工号列表 页面 反选按钮
	installplanMQ_FXButton:function(){
		var sele=document.getElementsByName('groupCheckboxinstall');
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
	    };
	},
	
	//安装计划查询－工号列表 页面 批量按钮
	installplanMQ_PLButton:function(){
		console.log('批量按钮');
		//判断
		var sele=document.getElementsByName('groupCheckboxinstall');
		var count=0;
		var counts=0;
		var xb=[];//存储下标
		for( var i = 0; i <sele.length; i++)  {  
		    // 提取控件  
		    var checkbox = sele[i];  
			 if(checkbox.style.color==''){
	    		  count++; 
	    	  }else if(checkbox.style.color=='rgb(204, 204, 204)'){
	    		  count++; 
	    	  }else if(checkbox.style.color=='rgb(224, 58, 62)'){
	    		  xb[counts]=i;
	    		  counts++;   
	    	  };
		 };
		 if(count==sele.length){
			 WL.Toast.show("请至少选中一个");
			 return;
		 }else{
     		 this.NextView("installplan_AZJHXXTimes","HelcPDA.view.install.installplan.InstallPlanAZJHXXTimes");
		 };
		 
		//根据下标取得电梯类型
		var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
		if (!MaintList2) { 
			MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
		};
		var count=xb.length;
		var ztNum=0;
		var ftNum=0;
		var itmNUm=0;
		for(var i=0;i<count;i++){
			var tx=MaintList2.getAt(xb[i]).get('ELEVATOR_CLASS_NAME');
			if(tx=='直梯'){
				ztNum++;
			}else if(tx=='扶梯'){
				ftNum++;
			}else if(tx=='ITM'){
				itmNUm++;
			};
		};
		var ztlx1=0;
		var ztlx2=0;
		var ztlx3=0;
		var ftlx=0;
		var itm=0;
		for(var i=0;i<count;i++){
			var tx=MaintList2.getAt(xb[i]).get('BUDGET_INSTALL_METHOD');
			if(tx=='传统搭棚'){
				ztlx1++;
			}else if(tx=='AN2'){
				ztlx2++;
			}else if(tx=='吊篮'){
				ztlx3++;
			}else if(tx=='扶梯'){
				ftlx++;
			}else if(tx=='ITM'){
				itm++;
			}
		};
		if(ztNum>0&&ftNum==0&&itmNUm==0){
			if(ztlx1>0&&ztlx2==0&&ztlx3==0){
				Ext.getCmp('HP_INST_METHOD').setValue('传统搭棚');
			}else if(ztlx1==0&&ztlx2>0&&ztlx3==0) 
				Ext.getCmp('HP_INST_METHOD').setValue('AN2');
			
			else if(ztlx1==0&&ztlx2==0&&ztlx3>0) 
				Ext.getCmp('HP_INST_METHOD').setValue('吊篮');
			
			else{
				WL.Toast.show("请选择相同安装工法的电梯工号！");
				this.BackView();
				return;
			}
			
			Ext.getCmp('HP_CM_ELEVATOR_TYPE_NAME').setValue('直梯');
			
			var newXb=JSON.stringify(xb);
			//用于获取选中数据仓的下标
			 Ext.getCmp('newXb').setValue(newXb);
			 
			var PLtzType='直梯';
			//用于批量判断是否直梯和扶梯
			Ext.getCmp('PLtzType').setValue(PLtzType);
			
			var nview = Ext.getCmp('installplan_AZJHXXTimes');
			nview.initDataEnd();
			
			//判定是批量
			var plnum=1;
			//判断是批量还是单个
			Ext.getCmp('plnum').setValue(plnum);
			
			//显示提交按钮
			var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
			H_TIME.setDisabled(true);
			//判断结束时间是否可选择
			//棚架搭设
			var Q_TIME=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('ZT_PJDS_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};
			//电梯发货
			var Q_TIME=Ext.getCmp('ZT_DTFH_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('ZT_DTFH_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};
			//电梯吊装
			var Q_TIME=Ext.getCmp('ZT_DTDZ_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('ZT_DTDZ_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};
			//安装进场放线
			var Q_TIME=Ext.getCmp('ZT_JCFX_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('ZT_JCFX_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};	
			//安装支架导轨
			var Q_TIME=Ext.getCmp('ZT_ZJDG_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('ZT_ZJDG_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};	
			//门套及厅门安装
			var Q_TIME=Ext.getCmp('ZT_MTMT_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('ZT_MTMT_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};	
			//机房设备安装、机房放线接线
			var Q_TIME=Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('ZT_JFAZJX_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};	
			//桥架、桥厢拼装
			var Q_TIME=Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('ZT_JJJXPJ_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};	
			//拆棚
			var Q_TIME=Ext.getCmp('ZT_CP_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('ZT_CP_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};	
			//底坑设备
			var Q_TIME=Ext.getCmp('ZT_DKSB_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('ZT_DKSB_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};	
			//电梯调度
			var Q_TIME=Ext.getCmp('ZT_DTTS_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('ZT_DTTS_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};	
			//厂检
			var Q_TIME=Ext.getCmp('ZT_CJ_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('ZT_CJ_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};	
			//政府部门验收
//			var Q_TIME=Ext.getCmp('ZT_ZFJ_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('ZT_ZFJ_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};	
			
			var Q_TIME=Ext.getCmp('ZGQ_START_TIME_TWO');
			var H_TIME=Ext.getCmp('ZGQ_END_TIME_TWO');
			Q_TIME.setDisabled(true);
			H_TIME.setDisabled(true);
			
			//隐藏
			var az=Ext.getCmp('FT_AZ_TIME_TWO');
			az.setHidden(true);
			var ts=Ext.getCmp('FT_TS_TIME_TWO');
			ts.setHidden(true);
			var cj=Ext.getCmp('FT_CJ_TIME_TWO');
			cj.setHidden(true);
			var zj=Ext.getCmp('FT_ZJ_TIME_TWO');
			zj.setHidden(true);
			var zgq=Ext.getCmp('FT_ZGQ_TIME_TWO');
			zgq.setHidden(true);
			
			//zhj 
			var bjaz=Ext.getCmp('FT_bjaz_TIME_TWO');
			bjaz.setHidden(true);
			var dldy=Ext.getCmp('FT_dldy_TIME_TWO');
			dldy.setHidden(true);
			var bt=Ext.getCmp('FT_bt_TIME_TWO');
			bt.setHidden(true);
			var bj=Ext.getCmp('FT_bj_TIME_TWO');
			bj.setHidden(true);
			var yswc=Ext.getCmp('FT_yswc_TIME_TWO');
			yswc.setHidden(true);
			var jj=Ext.getCmp('FT_jj_TIME_TWO');
			jj.setHidden(true);
			var wg=Ext.getCmp('FT_wg_TIME_TWO');
			wg.setHidden(true);
			var yjkh=Ext.getCmp('FT_yjkh_TIME_TWO');
			yjkh.setHidden(true);
			
			//隐藏ITM
			var tt=Ext.getCmp('ITM_JC_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ITM_WG_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ITM_YJKH_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ITM_ZGQ_TIME_TWO');
			tt.setHidden(true);
			
			//显示直梯
			var tt=Ext.getCmp('ZT_PJDS_TIME_TWO');
			tt.setHidden(false);
			var tt=Ext.getCmp('ZT_DTFH_TIME_TWO');
			tt.setHidden(false);
			var tt=Ext.getCmp('ZT_DTDZ_TIME_TWO');
			tt.setHidden(false);
			var tt=Ext.getCmp('ZT_JCFX_TIME_TWO');
			tt.setHidden(false);
			var tt=Ext.getCmp('ZT_ZJDG_TIME_TWO');
			tt.setHidden(false);
			var tt=Ext.getCmp('ZT_MTMT_TIME_TWO');
			tt.setHidden(false);
			var tt=Ext.getCmp('ZT_JFAZJX_TIME_TWO');
			tt.setHidden(false);
			var tt=Ext.getCmp('ZT_JJJXPJ_TIME_TWO');
			tt.setHidden(false);
			var tt=Ext.getCmp('ZT_CP_TIME_TWO');
			tt.setHidden(false);
			var tt=Ext.getCmp('ZT_DKSB_TIME_TWO');
			tt.setHidden(false);
			var tt=Ext.getCmp('ZT_DTTS_TIME_TWO');
			tt.setHidden(false);
			var tt=Ext.getCmp('ZT_CJ_TIME_TWO');
			tt.setHidden(false);
//			var tt=Ext.getCmp('ZT_ZFJ_TIME_TWO');
//			tt.setHidden(false);
			var tt=Ext.getCmp('ZGQ_TIME_TWO');
			tt.setHidden(false);
			
			
		}else if(ztNum==0&&ftNum>0&&itmNUm==0){
	        //安装工法
			Ext.getCmp('HP_INST_METHOD').setValue('扶梯');
			Ext.getCmp('HP_CM_ELEVATOR_TYPE_NAME').setValue('扶梯');
			
			var newXb=JSON.stringify(xb);
			//用于获取选中数据仓的下标
			 Ext.getCmp('newXb').setValue(newXb);
			 
			PLtzType='扶梯';
			//用于批量判断是否直梯和扶梯
			Ext.getCmp('PLtzType').setValue(PLtzType);
			
			var nview = Ext.getCmp('installplan_AZJHXXTimes');
			nview.initDataEnd();
			
			var plnum=1;
			//判断是批量还是单个
			Ext.getCmp('plnum').setValue(plnum);
			
			var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
			H_TIME.setDisabled(true);
			//判断结束时间是否可选择
			//安装
			var Q_TIME=Ext.getCmp('FT_AZ_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('FT_AZ_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};
			//调试
			var Q_TIME=Ext.getCmp('FT_TS_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('FT_TS_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};
			//厂检
			var Q_TIME=Ext.getCmp('FT_CJ_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('FT_CJ_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};
			//政府检
			var Q_TIME=Ext.getCmp('FT_ZJ_START_TIME_TWO').getValue();
//			var H_TIME=Ext.getCmp('FT_ZJ_END_TIME_TWO');
//			if(Q_TIME==''||Q_TIME==null||typeof(Q_TIME)=='undefined'){
//				H_TIME.setDisabled(true);
//			};
			//总工期
			var Q_TIME=Ext.getCmp('FT_ZGQ_START_TIME_TWO');
			var H_TIME=Ext.getCmp('FT_ZGQ_END_TIME_TWO');
			Q_TIME.setDisabled(true);
			H_TIME.setDisabled(true);
			
			
			//隐藏直梯
			var tt=Ext.getCmp('ZT_PJDS_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_DTFH_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_DTDZ_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_JCFX_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_ZJDG_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_MTMT_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_JFAZJX_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_JJJXPJ_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_CP_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_DKSB_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_DTTS_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_CJ_TIME_TWO');
			tt.setHidden(true);
//			var tt=Ext.getCmp('ZT_ZFJ_TIME_TWO');
//			tt.setHidden(true);
			var tt=Ext.getCmp('ZGQ_TIME_TWO');
			tt.setHidden(true);
			
			//隐藏ITM
			var tt=Ext.getCmp('ITM_JC_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ITM_WG_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ITM_YJKH_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ITM_ZGQ_TIME_TWO');
			tt.setHidden(true);
			
			//显示扶梯
			var az=Ext.getCmp('FT_AZ_TIME_TWO');
			az.setHidden(false);
			var ts=Ext.getCmp('FT_TS_TIME_TWO');
			ts.setHidden(false);
			var cj=Ext.getCmp('FT_CJ_TIME_TWO');
			cj.setHidden(false);
			var zj=Ext.getCmp('FT_ZJ_TIME_TWO');
			zj.setHidden(false);
			var bjaz=Ext.getCmp('FT_bjaz_TIME_TWO');
			bjaz.setHidden(false);
			var dldy=Ext.getCmp('FT_dldy_TIME_TWO');
			dldy.setHidden(false);
			var bt=Ext.getCmp('FT_bt_TIME_TWO');
			bt.setHidden(false);
			var bj=Ext.getCmp('FT_bj_TIME_TWO');
			bj.setHidden(false);
			var yswc=Ext.getCmp('FT_yswc_TIME_TWO');
			yswc.setHidden(false);
			var jj=Ext.getCmp('FT_jj_TIME_TWO');
			jj.setHidden(false);
			var wg=Ext.getCmp('FT_wg_TIME_TWO');
			wg.setHidden(false);
			var yjkh=Ext.getCmp('FT_yjkh_TIME_TWO');
			yjkh.setHidden(false);
			var zgq=Ext.getCmp('FT_ZGQ_TIME_TWO');
			zgq.setHidden(false);
			
			
			
			
			
		}else if(ztNum==0&&ftNum==0&&itmNUm>0){
			//安装工法
			Ext.getCmp('HP_INST_METHOD').setValue('ITM');
			Ext.getCmp('HP_CM_ELEVATOR_TYPE_NAME').setValue('ITM');
		    
			//隐藏直梯
			var tt=Ext.getCmp('ZT_PJDS_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_DTFH_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_DTDZ_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_JCFX_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_ZJDG_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_MTMT_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_JFAZJX_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_JJJXPJ_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_CP_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_DKSB_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_DTTS_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ZT_CJ_TIME_TWO');
			tt.setHidden(true);
//			var tt=Ext.getCmp('ZT_ZFJ_TIME_TWO');
//			tt.setHidden(true);
			var tt=Ext.getCmp('ZGQ_TIME_TWO');
			tt.setHidden(true);
			
			//隐藏
			var az=Ext.getCmp('FT_AZ_TIME_TWO');
			az.setHidden(true);
			var ts=Ext.getCmp('FT_TS_TIME_TWO');
			ts.setHidden(true);
			var cj=Ext.getCmp('FT_CJ_TIME_TWO');
			cj.setHidden(true);
			var zj=Ext.getCmp('FT_ZJ_TIME_TWO');
			zj.setHidden(true);
			var zgq=Ext.getCmp('FT_ZGQ_TIME_TWO');
			zgq.setHidden(true);
			
			//zhj 
			var bjaz=Ext.getCmp('FT_bjaz_TIME_TWO');
			bjaz.setHidden(true);
			var dldy=Ext.getCmp('FT_dldy_TIME_TWO');
			dldy.setHidden(true);
			var bt=Ext.getCmp('FT_bt_TIME_TWO');
			bt.setHidden(true);
			var bj=Ext.getCmp('FT_bj_TIME_TWO');
			bj.setHidden(true);
			var yswc=Ext.getCmp('FT_yswc_TIME_TWO');
			yswc.setHidden(true);
			var jj=Ext.getCmp('FT_jj_TIME_TWO');
			jj.setHidden(true);
			var wg=Ext.getCmp('FT_wg_TIME_TWO');
			wg.setHidden(true);
			var yjkh=Ext.getCmp('FT_yjkh_TIME_TWO');
			yjkh.setHidden(true);
			
			
			//ITM
			var tt=Ext.getCmp('ITM_JC_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ITM_WG_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ITM_YJKH_TIME_TWO');
			tt.setHidden(true);
			var tt=Ext.getCmp('ITM_ZGQ_TIME_TWO');
			tt.setHidden(true);
			
			
		
		}else
		{
			WL.Toast.show("请选择同一种工号类型！");
			this.BackView();
		}
	},
	
	//安装计划查询－工号列表 页面  批安装资源按钮
	installplanMQ_PAZZYButton:function(){
		console.log('批安装资源按钮');
		var sele=document.getElementsByName('groupCheckboxinstall');
		var count=0;
		var countS=0;
		var installplan_PLZYLR_FXK_SHUZU=[];
	    for ( var i = 0; i <sele.length; i++)  
	    {  
	      // 提取控件  
	      var checkbox = sele[i];  
    	  if(checkbox.style.color==''){
    		  count++;
    	  }else if(checkbox.style.color=='rgb(204, 204, 204)'){
    		  count++;
    	  }else if(checkbox.style.color=='rgb(224, 58, 62)'){
    		  installplan_PLZYLR_FXK_SHUZU[countS]=i;
    		  countS++;
    	  };
	    };
		 if(count==sele.length){
			 WL.Toast.show('请至少选中一个');
		 }else{
			 var installplan_AZZYLR_Ctrl_num=2;
			 Ext.getCmp('installplan_AZZYLR_Ctrl_num').setValue(installplan_AZZYLR_Ctrl_num);
			 this.NextView("installplan_AZZYLR","HelcPDA.view.install.installplan.InstallPlanAZZYLR");
			 installplan_PLZYLR_FXK_SHUZU=JSON.stringify(installplan_PLZYLR_FXK_SHUZU);
			 Ext.getCmp('installplan_PLZYLR_FXK_SHUZU').setValue(installplan_PLZYLR_FXK_SHUZU);
			 installplan_AZZYLR_QingKongTEXT();
		 };
	},
	
	//安装计划查询－工号列表 页面  单击工号列表中的值获取详细信息
	MPid_mylist:function(obj, index, target, record, e, eOpts ){
		//installplan_AZZYLR_IFEliminate=1;
		 
		if(event.target.id!='pid'){
			//从数据仓中获取需要的数据
			var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
			if (!MaintList2) { 
				MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
			};
			var status=MaintList2.getAt(index).get('STATUS');
			if(status=='已进入待提交列表'){
				WL.Toast.show("数据已进入待提交队列，请勿反复提交！");
				return;
			};
			
			//单个是0
			var plnum=0;
			//判断是批量还是单个
			Ext.getCmp('plnum').setValue(plnum);
			
			//测试进入安装详细计划用 1
			var AZXXJH_JINRU_index=Ext.getCmp('AZXXJH_JINRU_index').getValue();
			AZXXJH_JINRU_index++;
			Ext.getCmp('AZXXJH_JINRU_index').setValue(AZXXJH_JINRU_index);
			
			this.NextView("installplan_AZJHXXHomePage","HelcPDA.view.install.installplan.InstallPlanAZJHXXHomePage");
		
    		//封死判断
			var nview = Ext.getCmp('installplan_AZJHXXHomePage');
			nview.initData();
			
			//按钮的显示和隐藏
			var SJ=Ext.getCmp('instalPlan_HomePage_SJ_Button');
			var ZY=Ext.getCmp('instalPlan_HomePage_ZY_Button');
			var TJ=Ext.getCmp('instalPlan_HomePage_TJ_Button');
			SJ.setHidden(false);
			ZY.setHidden(true);
			TJ.setHidden(true);
			
			//页面跳转
			//从数据仓中获取需要的数据
			var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
			if (!MaintList2) { 
				MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
			};
			
			//合同号
			var ht=MaintList2.getAt(index).get('ENGCONTRACT_NUMBER');
			//工号
			var gh=MaintList2.getAt(index).get('ELEVATOR_NO');
			//批次
			var pc=MaintList2.getAt(index).get('SEQ_NUM');
			
			//未进场和在制的判断
			var installTcode=Ext.getCmp('installTcode').getValue();
			
			//从JSONStore中查询数据
			var trim=ht+'/'+gh+'/'+pc;
			console.log('安装计划详细查询条件:'+trim);
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	var query={tcode:installTcode,tid:trim};
			var options={
				exacte:false,//默认
			};
	    	MaintainList.find(query,options).then(function(arrayResults){
	    		//2014-6-17
	    		var installplanZYLR_RESULT_XY=JSON.stringify(arrayResults);
	    		
	    		//资源录入需要的数据  工号 从JSON中获取的
	    		Ext.getCmp('installplanZYLR_RESULT_XY').setValue(installplanZYLR_RESULT_XY);
	    		
	    		var num=arrayResults.length;
	    		console.log('查询到的台数: '+num);
	    		var item=arrayResults[num-1].json.stext;
	    		var progress=arrayResults[num-1].json.ext1;
	    		
	    		console.log(JSON.stringify(item));
	    		console.log('    -------  '+JSON.stringify(progress));
	    		
	    		/*dzNAME:吊装
	    		dpNAME:搭棚
	    		dwNAME:安装*/
	    		Ext.getCmp('HP_ENGCONTRACT_NUMBER').setValue(item.ENGCONTRACT_NUMBER);
	    		Ext.getCmp('HP_CUSTOMER_NAME').setValue(item.CUSTOMER_NAME);
	    		Ext.getCmp('HP_INSTALL_ADDRESS').setValue(item.INSTALL_ADDRESS);
	    		Ext.getCmp('HP_CONTRACT_CYCLE_DAY').setValue(item.CONTRACT_CYCLE_DAY);
	    		Ext.getCmp('HP_ELEVATOR_NO').setValue(item.ELEVATOR_NO);
	    		Ext.getCmp('HP_EQUIPMENT_NO').setValue(item.EQUIPMENT_NO);
	    		Ext.getCmp('HP_SEQ_NUM').setValue(item.SEQ_NUM);
	    		Ext.getCmp('HP_CM_ELEVATOR_TYPE_NAME').setValue(item.ELEVATOR_CLASS_NAME);
	    		Ext.getCmp('HP_ELEVATOR_CLASS_NAME').setValue(item.CM_ELEVATOR_TYPE_NAME);
	    		var czm=item.PARAM_C+'/'+item.PARAM_Z+'/'+item.PARAM_M;
	    		Ext.getCmp('HP_CZM').setValue(czm);
	    		Ext.getCmp('HP_LIFT_VENDOR').setValue(item.dzNAME);
	    		Ext.getCmp('HP_BUILD_VENDOR').setValue(item.dpNAME);
	    		Ext.getCmp('HP_INST_VENDOR').setValue(item.dwNAME);
	    		Ext.getCmp('HP_PLAN_CONSIGN_DATE').setValue(item.PLAN_CONSIGN_DATE);
	    		Ext.getCmp('HP_INV_OUT_DATE').setValue(item.INV_OUT_DATE);
	    		Ext.getCmp('HP_VERSION_NUM_HOME').setValue(item.HP_VERSION_NUM);
	    		Ext.getCmp('HP_CCRQ').setValue(item.CCRQ);
	    		
	    		Ext.getCmp('HP_TASK_ID').setValue(item.TASK_ID);
	    		
	    		//都放在Item中
	    		Ext.getCmp('HP_ENTRANCE_DATE').setValue(item.ENTRANCE_DATE);
		    	Ext.getCmp('HP_REPORT_DEBUG_DATE').setValue(item.REPORT_DEBUG_DATE);
		    	Ext.getCmp('HP_REPORT_CHECK_DATE').setValue(item.REPORT_CHECK_DATE);
		    	Ext.getCmp('HP_REPORT_DATE_HOME').setValue(item.REPORT_DATE);
		    	//Ext.getCmp('HP_VERSION_NUM').setValue(item.VERSION_NUM);	
		    	
	    		/*if(typeof(progress.ENTRANCE_DATE)!='undefined'){
	    			
	    		};
	    		*/
	    		Ext.getCmp('HP_COMPLETION_DATE').setValue(item.COMPLETION_DATE);
	    		Ext.getCmp('HP_SIGNED_TRANSFER_DOC_DATE').setValue(item.SIGNED_TRANSFER_DOC_DATE);
	    		//zhj 05.09 安装工法
	    		Ext.getCmp('HP_INST_METHOD').setValue(item.BUDGET_INSTALL_METHOD);
	    		
	    		
	    		//判断安装计划详细的时间
	    		//有两种电梯类型, 时间也不相同
	    		var pc=MaintList2.getAt(index).get('STATUS');
	    		var lx=MaintList2.getAt(index).get('ELEVATOR_CLASS_NAME');
	    		
	    		var num =0;
	    		if(item.DATE==undefined){
	    			num=0;
	    		}else{
	    			 num =item.DATE.length;
	    		};
	    		azjhflag=1;
	    		console.log("zhj1");
	    		//-----------先判断查看的梯子是什么类型
	    		if(lx=='直梯'){
	    			var JHtime=item.DATE;
	    			//判断是否有时间
	    			var flag=0;
	    			for(var i=0;i<num;i++){
	    				if(JHtime[i].PLAN_START_DATE!=''){
	    					flag++;
	    				};
	    			};
	    			
	    			var gf=item.BUDGET_INSTALL_METHOD;
	    			if(gf!="传统搭棚"&&gf!=null&&gf!=''){
	    				Ext.getCmp('ZT_JCFX_TIME').setTitle("定主机");
	    			    Ext.getCmp('ZT_ZJDG_TIME').setTitle("安装轿架");
	    			    Ext.getCmp('ZT_MTMT_TIME').setTitle("安装撑架和导轨");
	    				
	    			}
	    				
	    			
	    			//-------------在判断梯子是否有数据
	    			if((pc=='已计划')||(pc=='未计划'&&flag>0)){
	        			console.log('时间:'+JSON.stringify(JHtime));
	        			//进场
	        			if(JHtime[0].PLAN_START_DATE==''){
	        				Ext.getCmp('ZT_PJDS_START_TIME').setValue();
	            			//Ext.getCmp('ZT_PJDS_END_TIME').setValue();
	        			}else{
	        				Ext.getCmp('ZT_PJDS_START_TIME').setValue(JHtime[0].PLAN_START_DATE);
	            			//Ext.getCmp('ZT_PJDS_END_TIME').setValue(JHtime[0].PLAN_END_DATE);
	            			//总工期
	            			Ext.getCmp('ZGQ_START_TIME').setValue(JHtime[0].PLAN_START_DATE);
	        			};
	        			
			
	        			// zhj
	        			for(var i=1;i<num;i++){
	        				var WORK_STEP_CODE=JHtime[i].WORK_STEP_CODE;
	        				
	        				if(WORK_STEP_CODE=='ZT_MTMT'){
	        				
	        					//放样
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('ZT_DTDZ_START_TIME').setValue('');
	    	            			//Ext.getCmp('ZT_DTDZ_END_TIME').setValue('');
	    	        			}else{
	    	            			Ext.getCmp('ZT_DTDZ_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('ZT_DTDZ_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_DKSB'){
	        					//安装撑架和导轨
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				if(gf=="传统搭棚")
	    	        				Ext.getCmp('ZT_JCFX_START_TIME').setValue('');
	    	        				else 
	    	        				Ext.getCmp('ZT_MTMT_START_TIME').setValue('');	
	    	            			//Ext.getCmp('ZT_JCFX_END_TIME').setValue('');
	    	        			}else{
	    	        				if(gf=="传统搭棚")
	    	            			Ext.getCmp('ZT_JCFX_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	        				else
	    	        				Ext.getCmp('ZT_MTMT_START_TIME').setValue(JHtime[i].PLAN_START_DATE);	
	    	        				//Ext.getCmp('ZT_JCFX_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_JFAZJX'){
	        					//定主机
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				if(gf=="传统搭棚")
	    	        				Ext.getCmp('ZT_ZJDG_START_TIME').setValue('');
	    	        				else
	    	        				Ext.getCmp('ZT_JCFX_START_TIME').setValue('');	
	    	            			//Ext.getCmp('ZT_ZJDG_END_TIME').setValue('');
	    	        			}else{
	    	        				if(gf=="传统搭棚")
	    	            			Ext.getCmp('ZT_ZJDG_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	        				else
	    	        			    Ext.getCmp('ZT_JCFX_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	        				//Ext.getCmp('ZT_ZJDG_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_JJJXPJ' &&gf!="传统搭棚"){
	        					//轿架
	        					console.log('ZT_JJJXPJ1');
	    	        			if(JHtime[i].PLAN_START_DATE==''){
		    	        				Ext.getCmp('ZT_ZJDG_START_TIME').setValue('');
	    	            			//Ext.getCmp('ZT_ZJDG_END_TIME').setValue('');
	    	        			}else{
	    	        			    Ext.getCmp('ZT_ZJDG_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	        				//Ext.getCmp('ZT_ZJDG_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	        			};	
	    	        		    	
	    	        			
	        				}else if(WORK_STEP_CODE=='ZT_JJJXPJ'&&gf=="传统搭棚"){
	        					//及轿厢
	        					console.log('ZT_JJJXPJ2');
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('ZT_MTMT_START_TIME').setValue('');
	    	            			//Ext.getCmp('ZT_MTMT_END_TIME').setValue('');
	    	        			}else{
	    	            			Ext.getCmp('ZT_MTMT_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('ZT_MTMT_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_DTFH'){
	        					//电气接线
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('ZT_JFAZJX_START_TIME').setValue('');
	    	            			//Ext.getCmp('ZT_JFAZJX_END_TIME').setValue('');
	    	        			}else{
	    	            			Ext.getCmp('ZT_JFAZJX_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('ZT_JFAZJX_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_DTTS'){
	        					//报调日期
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue('');
	    	            			//Ext.getCmp('ZT_JJJXPJ_END_TIME').setValue('');
	    	        			}else{
	    	            			Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('ZT_JJJXPJ_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_PJDS'){
	        					//报检日期
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('ZT_CP_START_TIME').setValue('');
	    	            			//Ext.getCmp('ZT_CP_END_TIME').setValue('');
	    	        			}else{
	    	            			Ext.getCmp('ZT_CP_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('ZT_CP_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_CJ'){
	        					//验收完成日期
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('ZT_DKSB_START_TIME').setValue('');
	    	            			//Ext.getCmp('ZT_DKSB_END_TIME').setValue('');
	    	        			}else{
	    	            			Ext.getCmp('ZT_DKSB_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('ZT_DKSB_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_ZFJ'){
	        					//技检日期
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('ZT_DTTS_START_TIME').setValue('');
	    	            			//Ext.getCmp('ZT_DTTS_END_TIME').setValue('');
	    	        			}else{
	    	            			Ext.getCmp('ZT_DTTS_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('ZT_DTTS_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_JHWG'){
	        					//完工日期
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('ZT_CJ_START_TIME').setValue('');
	    	            			//Ext.getCmp('ZT_CJ_END_TIME').setValue('');
	    	        			}else{
	    	            			Ext.getCmp('ZT_CJ_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('ZT_CJ_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_ZJDG'){
	        					//移交客户日期
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('ZT_ZFJ_START_TIME').setValue('');
	    	            			//Ext.getCmp('ZT_ZFJ_END_TIME').setValue('');
	    	        		}else{
	    	        				
	    	            			Ext.getCmp('ZT_ZFJ_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('ZT_ZFJ_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	            			
	    	            			//总工期
	    	            			Ext.getCmp('ZGQ_END_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	        			};
	        				};
	        			};
	            		//计划总天数
						var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
						var ZGQ_END=Ext.getCmp('ZGQ_END_TIME').getValue();
						var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
						titleWJC.innerHTML='';
						if(PJDS_start!=''&&ZGQ_END!=''&&ZGQ_END!=null){
							var startDay;
							var startEnd;
							startDay=PJDS_start;
							var newDate=Ext.getCmp('ZT_ZFJ_START_TIME').getValue();
							startEnd=newDate;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
							titleWJC.innerHTML='总工期('+Zday+'天)';
						};
	        		}else{
	        			//棚架搭设
	        			Ext.getCmp('ZT_PJDS_START_TIME').setValue('');
	        			//Ext.getCmp('ZT_PJDS_END_TIME').setValue('');
	        			//电梯吊装
	        			Ext.getCmp('ZT_DTDZ_START_TIME').setValue('');
	        			//Ext.getCmp('ZT_DTDZ_END_TIME').setValue('');
	        			//安装进场放线
	        			Ext.getCmp('ZT_JCFX_START_TIME').setValue('');
	        			//Ext.getCmp('ZT_JCFX_END_TIME').setValue('');
	        			//安装支架导轨
	        			Ext.getCmp('ZT_ZJDG_START_TIME').setValue('');
	        			//Ext.getCmp('ZT_ZJDG_END_TIME').setValue('');
	        			//门套及厅门安装
	        			Ext.getCmp('ZT_MTMT_START_TIME').setValue('');
	        			//Ext.getCmp('ZT_MTMT_END_TIME').setValue('');
	        			//机房设备安装、机房放线接线
	        			Ext.getCmp('ZT_JFAZJX_START_TIME').setValue('');
	        			//Ext.getCmp('ZT_JFAZJX_END_TIME').setValue('');
	        			//桥架、桥厢拼装
	        			Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue('');
	        			//Ext.getCmp('ZT_JJJXPJ_END_TIME').setValue('');
	        			//拆棚
	        			Ext.getCmp('ZT_CP_START_TIME').setValue('');
	        			//Ext.getCmp('ZT_CP_END_TIME').setValue('');
	        			//底坑设备
	        			Ext.getCmp('ZT_DKSB_START_TIME').setValue('');
	        			//Ext.getCmp('ZT_DKSB_END_TIME').setValue('');
	        			//电梯调度
	        			Ext.getCmp('ZT_DTTS_START_TIME').setValue('');
	        			//Ext.getCmp('ZT_DTTS_END_TIME').setValue('');
	        			//厂检
	        			Ext.getCmp('ZT_CJ_START_TIME').setValue('');
	        			//Ext.getCmp('ZT_CJ_END_TIME').setValue('');
	        			//政府部门验收
	        			Ext.getCmp('ZT_ZFJ_START_TIME').setValue('');
	        			//Ext.getCmp('ZT_ZFJ_END_TIME').setValue('');
	        			//总工期
	        			Ext.getCmp('ZGQ_START_TIME').setValue('');
	        			Ext.getCmp('ZGQ_END_TIME').setValue('');
	        			
	        			/*//无法提交
	        			var Q_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
						Q_TIME.setDisabled(true);*/
	        			var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
						titleWJC.innerHTML='总工期';
	        		}
	    			//
	    			
	    			
	    			
	    		}else if(lx=='扶梯'){
	    			var JHtime=item.DATE;
	    			var flag=0;
	    			for(var i=0;i<num;i++){
	    				if(JHtime[i].PLAN_START_DATE!=''){
	    					flag++;
	    				};
	    			};
	    			if((pc=='已计划')||(pc=='未计划'&&flag>0)){
	        			console.log('时间:'+JSON.stringify(JHtime));
	        			//进场
	        			if(JHtime[0].PLAN_START_DATE==''){
	        				Ext.getCmp('FT_AZ_START_TIME').setValue('');
	            			//Ext.getCmp('FT_AZ_END_TIME').setValue('');
	        			}else{
	        				Ext.getCmp('FT_AZ_START_TIME').setValue(JHtime[0].PLAN_START_DATE);
	            			//Ext.getCmp('FT_AZ_END_TIME').setValue(JHtime[0].PLAN_END_DATE);
	            			
	            			//总工期
	            			Ext.getCmp('FT_ZGQ_START_TIME').setValue(JHtime[0].PLAN_START_DATE);
	        			};
	        			
	        			for(var i=1;i<num;i++){
	        				var WORK_STEP_CODE=JHtime[i].WORK_STEP_CODE;
	        				if(WORK_STEP_CODE=='FT_AZ'){
	        					//桁架样架定位
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('FT_TS_START_TIME').setValue('');
	    	            			//Ext.getCmp('FT_TS_END_TIME').setValue('');
	    	        			}else{
	    	            			Ext.getCmp('FT_TS_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('FT_TS_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	        			};
	        				}else if(WORK_STEP_CODE=='FT_CJ'){
	        					//玻璃侧板安装
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('FT_CJ_START_TIME').setValue('');
	    	            			//Ext.getCmp('FT_CJ_END_TIME').setValue('');
	    	        			}else{
	    	            			Ext.getCmp('FT_CJ_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('FT_CJ_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	        			};
	        				}else if(WORK_STEP_CODE=='FT_TS'){
	        					//扶手带组件安装
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('FT_ZJ_START_TIME').setValue('');
	    	            			//Ext.getCmp('FT_ZJ_END_TIME').setValue('');
	    	            			
	    	        			}else{
	    	            			Ext.getCmp('FT_ZJ_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('FT_ZJ_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	            			
	    	        			};
	        				}else if(WORK_STEP_CODE=='FT_ZJ'){
	        					//步级安装
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('FT_bjaz_START_TIME').setValue('');
	    	            			//Ext.getCmp('FT_bjaz_END_TIME').setValue('');
	    	        
	    	        			}else{
	    	            			Ext.getCmp('FT_bjaz_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('FT_bjaz_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	            		
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_CP'){
	        					//动力电源
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('FT_dldy_START_TIME').setValue('');
	    	            			//Ext.getCmp('FT_dldy_END_TIME').setValue('');
	    	            			
	    	        			}else{
	    	            			Ext.getCmp('FT_dldy_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('FT_dldy_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	            			
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_DTTS'){
	        					//报调日期
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('FT_bt_START_TIME').setValue('');
	    	            			//Ext.getCmp('FT_bt_START_TIME').setValue('');
	    	            			
	    	        			}else{
	    	            			Ext.getCmp('FT_bt_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('FT_bt_START_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	            			
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_PJDS'){
	        					//报检日期
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('FT_bj_START_TIME').setValue('');
	    	            			//Ext.getCmp('FT_bj_END_TIME').setValue('');
	    	            			
	    	        			}else{
	    	            			Ext.getCmp('FT_bj_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('FT_bj_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	            			
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_CJ'){
	        					//验收完成日期
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('FT_yswc_START_TIME').setValue('');
	    	            			//Ext.getCmp('FT_yswc_END_TIME').setValue('');
	    	            		
	    	        			}else{
	    	            			Ext.getCmp('FT_yswc_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('FT_yswc_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	            			
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_ZFJ'){
	        					//技检日期
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('FT_jj_START_TIME').setValue('');
	    	            			//Ext.getCmp('FT_jj_END_TIME').setValue('');
	    	            			
	    	        			}else{
	    	            			Ext.getCmp('FT_jj_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('FT_jj_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	            			
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_JHWG'){
	        					//完工日期
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('').setValue('');
	    	            			//Ext.getCmp('FT_wg_END_TIME').setValue('');
	    	            		
	    	        			}else{
	    	            			Ext.getCmp('FT_wg_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('FT_wg_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	            			
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_ZJDG'){
	        					//移交客户日期
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('FT_yjkh_START_TIME').setValue('');
	    	            			//Ext.getCmp('FT_yjkh_END_TIME').setValue('');
	    	            			
	    	            			//Ext.getCmp('FT_ZGQ_END_TIME').setValue('');
	    	        			}else{
	    	            			Ext.getCmp('FT_yjkh_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('FT_yjkh_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	            			//总工期
	    	            			Ext.getCmp('FT_ZGQ_END_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	        			};
	        				};
	        			};
	        			
	            		var PJDS_start=Ext.getCmp('FT_AZ_START_TIME').getValue();
	            		var FT_ZGQ=Ext.getCmp('FT_ZGQ_END_TIME').getValue();
	            		if(PJDS_start!=''&&FT_ZGQ!=''&&PJDS_start!=null&&FT_ZGQ!=null){
	            			//计划总天数
							var startDay;
							var startEnd;
							startDay = PJDS_start;
							var newDate=Ext.getCmp('FT_yjkh_START_TIME').getValue();
							startEnd = newDate;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
							titleWJC.innerHTML='总工期('+Zday+'天)';
	            		};
	            		
	        		}else{
	        			Ext.getCmp('FT_AZ_START_TIME').setValue('');
	        			//Ext.getCmp('FT_AZ_END_TIME').setValue('');
	        			
	        			Ext.getCmp('FT_TS_START_TIME').setValue('');
	        			//Ext.getCmp('FT_TS_END_TIME').setValue('');
	        			
	        			Ext.getCmp('FT_CJ_START_TIME').setValue('');
	        			//Ext.getCmp('FT_CJ_END_TIME').setValue('');
	        			
	        			Ext.getCmp('FT_ZJ_START_TIME').setValue('');
	        			//Ext.getCmp('FT_ZJ_END_TIME').setValue('');
	        			
	        			Ext.getCmp('FT_ZGQ_START_TIME').setValue('');
	        			//Ext.getCmp('FT_ZGQ_END_TIME').setValue('');
	        			
	        			//zhj
	        			Ext.getCmp('FT_bjaz_START_TIME').setValue('');
	        			//Ext.getCmp('FT_bjaz_END_TIME').setValue('');
	        			
	        			Ext.getCmp('FT_dldy_START_TIME').setValue('');
	        			//Ext.getCmp('FT_dldy_END_TIME').setValue('');
	        			
	        			Ext.getCmp('FT_bt_START_TIME').setValue('');
	        			//Ext.getCmp('FT_bt_END_TIME').setValue('');
	        			
	        			Ext.getCmp('FT_bj_START_TIME').setValue('');
	        			//Ext.getCmp('FT_bj_END_TIME').setValue('');
	        			
	        			Ext.getCmp('FT_yswc_START_TIME').setValue('');
	        			//Ext.getCmp('FT_yswc_END_TIME').setValue('');
	        			
	        			Ext.getCmp('FT_jj_START_TIME').setValue('');
	        			//Ext.getCmp('FT_jj_END_TIME').setValue('');
	        			
	        			Ext.getCmp('FT_wg_START_TIME').setValue('');
	        			//Ext.getCmp('FT_wg_END_TIME').setValue('');
	        			
	        			Ext.getCmp('FT_yjkh_START_TIME').setValue('');
	        			//Ext.getCmp('FT_yjkh_END_TIME').setValue('');
	        			
	        			
	        			
	        			var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
						titleWJC.innerHTML='总工期';
	        		};
	    			//ZHJ
	    		}else if(lx=="ITM"){
	    			var JHtime=item.DATE;
	    			var flag=0;
	    			for(var i=0;i<num;i++){
	    				if(JHtime[i].PLAN_START_DATE!=''){
	    					flag++;
	    				};
	    			};
	    			if((pc=='已计划')||(pc=='未计划'&&flag>0)){
	        			console.log('时间:'+JSON.stringify(JHtime));
	        			//进场
	        			if(JHtime[0].PLAN_START_DATE==''){
	        				Ext.getCmp('ITM_JC_START_TIME').setValue('');
	            			//Ext.getCmp('FT_AZ_END_TIME').setValue('');
	        			}else{
	        				Ext.getCmp('ITM_JC_START_TIME').setValue(JHtime[0].PLAN_START_DATE);
	            			//Ext.getCmp('FT_AZ_END_TIME').setValue(JHtime[0].PLAN_END_DATE);
	            			
	            			//总工期
	            			Ext.getCmp('ITM_ZGQ_START_TIME').setValue(JHtime[0].PLAN_START_DATE);
	        			};
	        			
	        			for(var i=1;i<num;i++){
	        				var WORK_STEP_CODE=JHtime[i].WORK_STEP_CODE;
	        				if(WORK_STEP_CODE=='ZT_JHWG'){
	        					//完工
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('ITM_WG_START_TIME').setValue('');
	    	            			//Ext.getCmp('FT_TS_END_TIME').setValue('');
	    	        			}else{
	    	            			Ext.getCmp('ITM_WG_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('FT_TS_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	        			};
	        				}else if(WORK_STEP_CODE=='ZT_ZJDG'){
	        					//移交客户
	    	        			if(JHtime[i].PLAN_START_DATE==''){
	    	        				Ext.getCmp('ITM_YJKH_START_TIME').setValue('');
	    	            			//Ext.getCmp('FT_CJ_END_TIME').setValue('');
	    	        			}else{
	    	            			Ext.getCmp('ITM_YJKH_START_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	            			//Ext.getCmp('FT_CJ_END_TIME').setValue(JHtime[i].PLAN_END_DATE);
	    	            			Ext.getCmp('ITM_ZGQ_END_TIME').setValue(JHtime[i].PLAN_START_DATE);
	    	        			};
	        				}
	        			};
	        			
	            		var PJDS_start=Ext.getCmp('ITM_JC_START_TIME').getValue();
	            		var FT_ZGQ=Ext.getCmp('ITM_ZGQ_START_TIME').getValue();
	            		if(PJDS_start!=''&&FT_ZGQ!=''&&PJDS_start!=null&&FT_ZGQ!=null){
	            			//计划总天数
							var startDay;
							var startEnd;
							startDay = PJDS_start;
							var newDate=Ext.getCmp('ITM_YJKH_START_TIME').getValue();
							startEnd = newDate;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
							titleWJC.innerHTML='总工期('+Zday+'天)';
	            		};
	            		
	        		}else{
	        			Ext.getCmp('ITM_JC_START_TIME').setValue('');
	        			
	        			Ext.getCmp('ITM_WG_START_TIME').setValue('');
	        			        			
	        			Ext.getCmp('ITM_YJKH_START_TIME').setValue('');
	        			
	        			var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
						titleWJC.innerHTML='总工期';
	        		};
	    		};
	    		console.log("zhj2");
	    		azjhflag=0;
	    		//-----------------通过判断是直梯还是扶梯让其对应的控件显示和隐藏
	    		//判断是直梯还是扶梯
				var lx=MaintList2.getAt(index).get('ELEVATOR_CLASS_NAME');
			    console.log("lx:"+lx);
				if('直梯'==lx){
					//判断结束时间是否可选择
					
					var Q_TIME=Ext.getCmp('ZGQ_START_TIME');
					var H_TIME=Ext.getCmp('ZGQ_END_TIME');
					Q_TIME.setDisabled(true);
					H_TIME.setDisabled(true);
					
					
					//隐藏扶梯
					var az=Ext.getCmp('FT_AZ_TIME');
					az.setHidden(true);
					var ts=Ext.getCmp('FT_TS_TIME');
					ts.setHidden(true);
					var cj=Ext.getCmp('FT_CJ_TIME');
					cj.setHidden(true);
					var zj=Ext.getCmp('FT_ZJ_TIME');
					zj.setHidden(true);
					var zgq=Ext.getCmp('FT_ZGQ_TIME');
					zgq.setHidden(true);
					//zhj 
					var bjaz=Ext.getCmp('FT_bjaz_TIME');
					bjaz.setHidden(true);
					var dldy=Ext.getCmp('FT_dldy_TIME');
					dldy.setHidden(true);
					var bt=Ext.getCmp('FT_bt_TIME');
					bt.setHidden(true);
					var bj=Ext.getCmp('FT_bj_TIME');
					bj.setHidden(true);
					var yswc=Ext.getCmp('FT_yswc_TIME');
					yswc.setHidden(true);
					var jj=Ext.getCmp('FT_jj_TIME');
					jj.setHidden(true);
					var wg=Ext.getCmp('FT_wg_TIME');
					wg.setHidden(true);
					var yjkh=Ext.getCmp('FT_yjkh_TIME');
					yjkh.setHidden(true);
					
					//隐藏ITM
					var tt=Ext.getCmp('ITM_JC_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ITM_WG_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ITM_YJKH_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ITM_ZGQ_TIME');
					tt.setHidden(true);
					
					
					
					//显示直梯
					var tt=Ext.getCmp('ZT_PJDS_TIME');
					tt.setHidden(false);

					var tt=Ext.getCmp('ZT_DTDZ_TIME');
					tt.setHidden(false);
					var tt=Ext.getCmp('ZT_JCFX_TIME');
					tt.setHidden(false);
					var tt=Ext.getCmp('ZT_ZJDG_TIME');
					tt.setHidden(false);
					var tt=Ext.getCmp('ZT_MTMT_TIME');
					tt.setHidden(false);
					var tt=Ext.getCmp('ZT_JFAZJX_TIME');
					tt.setHidden(false);
					var tt=Ext.getCmp('ZT_JJJXPJ_TIME');
					tt.setHidden(false);
					var tt=Ext.getCmp('ZT_CP_TIME');
					tt.setHidden(false);
					var tt=Ext.getCmp('ZT_DKSB_TIME');
					tt.setHidden(false);
					var tt=Ext.getCmp('ZT_DTTS_TIME');
					tt.setHidden(false);
					var tt=Ext.getCmp('ZT_CJ_TIME');
					tt.setHidden(false);
					var tt=Ext.getCmp('ZT_ZFJ_TIME');
					tt.setHidden(false);
					var tt=Ext.getCmp('ZGQ_TIME');
					tt.setHidden(false);
				}else if('扶梯'==lx){
					//判断结束时间是否可选择
					
					var Q_TIME=Ext.getCmp('FT_ZGQ_START_TIME');
					var H_TIME=Ext.getCmp('FT_ZGQ_END_TIME');
					Q_TIME.setDisabled(true);
					H_TIME.setDisabled(true);

					//隐藏直梯
					var tt=Ext.getCmp('ZT_PJDS_TIME');
					tt.setHidden(true);
//					var tt=Ext.getCmp('');
//					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_DTDZ_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_JCFX_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_ZJDG_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_MTMT_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_JFAZJX_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_JJJXPJ_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_CP_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_DKSB_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_DTTS_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_CJ_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_ZFJ_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZGQ_TIME');
					tt.setHidden(true);
					
					//隐藏ITM
					var tt=Ext.getCmp('ITM_JC_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ITM_WG_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ITM_YJKH_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ITM_ZGQ_TIME');
					tt.setHidden(true);
					
					//显示扶梯
					var az=Ext.getCmp('FT_AZ_TIME');
					az.setHidden(false);
					var ts=Ext.getCmp('FT_TS_TIME');
					ts.setHidden(false);
					var cj=Ext.getCmp('FT_CJ_TIME');
					cj.setHidden(false);
					var zj=Ext.getCmp('FT_ZJ_TIME');
					zj.setHidden(false);
					var zgq=Ext.getCmp('FT_ZGQ_TIME');
					zgq.setHidden(false);
					//zhj 
					var bjaz=Ext.getCmp('FT_bjaz_TIME');
					bjaz.setHidden(false);
					var dldy=Ext.getCmp('FT_dldy_TIME');
					dldy.setHidden(false);
					var bt=Ext.getCmp('FT_bt_TIME');
					bt.setHidden(false);
					var bj=Ext.getCmp('FT_bj_TIME');
					bj.setHidden(false);
					var yswc=Ext.getCmp('FT_yswc_TIME');
					yswc.setHidden(false);
					var jj=Ext.getCmp('FT_jj_TIME');
					jj.setHidden(false);
					var wg=Ext.getCmp('FT_wg_TIME');
					wg.setHidden(false);
					var yjkh=Ext.getCmp('FT_yjkh_TIME');
					yjkh.setHidden(false);
					
				}else if(lx=='ITM'){
					var Q_TIME=Ext.getCmp('ITM_ZGQ_START_TIME');
					var H_TIME=Ext.getCmp('ITM_ZGQ_END_TIME');
					Q_TIME.setDisabled(true);
					H_TIME.setDisabled(true);

					//隐藏直梯
					var tt=Ext.getCmp('ZT_PJDS_TIME');
					tt.setHidden(true);
//					var tt=Ext.getCmp('');
//					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_DTDZ_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_JCFX_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_ZJDG_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_MTMT_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_JFAZJX_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_JJJXPJ_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_CP_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_DKSB_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_DTTS_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_CJ_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZT_ZFJ_TIME');
					tt.setHidden(true);
					var tt=Ext.getCmp('ZGQ_TIME');
					tt.setHidden(true);
					
					//隐藏扶梯
					var az=Ext.getCmp('FT_AZ_TIME');
					az.setHidden(true);
					var ts=Ext.getCmp('FT_TS_TIME');
					ts.setHidden(true);
					var cj=Ext.getCmp('FT_CJ_TIME');
					cj.setHidden(true);
					var zj=Ext.getCmp('FT_ZJ_TIME');
					zj.setHidden(true);
					var zgq=Ext.getCmp('FT_ZGQ_TIME');
					zgq.setHidden(true);
					var bjaz=Ext.getCmp('FT_bjaz_TIME');
					bjaz.setHidden(true);
					var dldy=Ext.getCmp('FT_dldy_TIME');
					dldy.setHidden(true);
					var bt=Ext.getCmp('FT_bt_TIME');
					bt.setHidden(true);
					var bj=Ext.getCmp('FT_bj_TIME');
					bj.setHidden(true);
					var yswc=Ext.getCmp('FT_yswc_TIME');
					yswc.setHidden(true);
					var jj=Ext.getCmp('FT_jj_TIME');
					jj.setHidden(true);
					var wg=Ext.getCmp('FT_wg_TIME');
					wg.setHidden(true);
					var yjkh=Ext.getCmp('FT_yjkh_TIME');
					yjkh.setHidden(true);
					
					//显示ITM
					var tt=Ext.getCmp('ITM_JC_TIME');
					tt.setHidden(false);
					var tt=Ext.getCmp('ITM_WG_TIME');
					tt.setHidden(false);
					var tt=Ext.getCmp('ITM_YJKH_TIME');
					tt.setHidden(false);
					var tt=Ext.getCmp('ITM_ZGQ_TIME');
					tt.setHidden(false);
				}
	    
	    	}).fail(function(errorObject){
				console.log("查询数据失败");
			});
		}else if(event.target.id=='pid'){
			
			//从数据仓中获取需要的数据
			var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
			if (!MaintList2) { 
				MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
			};
			var status=MaintList2.getAt(index).get('STATUS');
			if(status=='已进入待提交列表'){
				WL.Toast.show("数据已进入待提交队列，请勿反复提交！");
				var sele=document.getElementsByName('groupCheckboxinstall');
				console.log(sele.length);
				 var checkbox = sele[index];
				 checkbox.style.color='#ccc';
				return;
			};
			var sele=document.getElementsByName('groupCheckboxinstall');
			console.log(sele.length);
			 var checkbox = sele[index];
			 if(checkbox.style.color==''){
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(204, 204, 204)'){
	    		  //是未选中的情况下
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(224, 58, 62)'){
	    		//是选中的情况下
	    		  checkbox.style.color='#ccc';
	    	  };
		};
		
	},
	
	//进入待提交页面
	installplan_MQ_JRDTJ:function(){
		this.NextView('wfc_list_view','HelcPDA.view.waitingdata.WaitingForCommitData_List_V');
	},
	/**
	 **
	 ************************************************************************************/
	
	

	/************************************************************************************
	 * 安装计划详细页面
	 * */
	//返回按钮
	//把修改后的时间保存在本地
	instalPlan_HomePage_Button:function(){
		obj=this;
		console.log('安装计划详细 首页 返回按钮');
		
		//合同号    工号   批次
		var HT=Ext.getCmp('HP_ENGCONTRACT_NUMBER').getValue();
		var GH=Ext.getCmp('HP_ELEVATOR_NO').getValue();
		var PC=Ext.getCmp('HP_SEQ_NUM').getValue();
		//判断是直梯还是扶梯
		var lx=Ext.getCmp('HP_ELEVATOR_CLASS_NAME').getValue();
		
		//返回安装计划查询-工号列表  页面
		obj.showBackView('installplan_MQ','HelcPDA.view.install.installplan.InstallPlanMPidQuery');
		
		var AZXXJH_JINRU_index=1;
		//测试进入安装详细计划用 1
		Ext.getCmp('AZXXJH_JINRU_index').setValue(AZXXJH_JINRU_index);
		
		var AZXXJH_JINRU_FLAG='false';
		//测试进入安装详细计划用 2
		Ext.getCmp('AZXXJH_JINRU_FLAG').setValue(AZXXJH_JINRU_FLAG);
		
		//把按钮初始化
		var sele=document.getElementsByName('groupCheckboxinstall');
	    for ( var i = 0; i <sele.length; i++)  
	    {  
	      // 提取控件  
	      var checkbox = sele[i];  
	      checkbox.style.color='#ccc';
	    };
	    
	  //未进场和在制的判断
		var installTcode=Ext.getCmp('installTcode').getValue();
		
		//获取要查询的数据条件
		
		var tiaojian=HT+'/'+GH+'/'+PC;
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:installTcode,tid:tiaojian};
		var options={
			exacte:false,//默认
		};
    	MaintainList.find(query,options).then(function(arrayResults){
    		var num=arrayResults.length;
    		var data=arrayResults[num-1].json.stext;
    		var pro=arrayResults[num-1].json.ext1;
    		var dateTime=data.DATE;
    		//在JSONStore中的唯一下标
    		var dataId=arrayResults[num-1]._id;
    		console.log('返回:'+JSON.stringify(data));
    		console.log('唯一标识ID: '+dataId);
    		console.log('progress的长度: '+dateTime.length);
    		console.log('dataTime修改前: '+JSON.stringify(dateTime));
    		
    		
			if('直梯'==lx){
				//进场日期
				var ZT_PJDS_END_TIME=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[0]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JCFX","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('ZT_PJDS_START_TIME').getValue())};
				}else{
					dateTime[0]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JCFX","PLAN_START_DATE":""};
				};
				
				//放样
				var ZT_PJDS_END_TIME=Ext.getCmp('ZT_DTDZ_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[1]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_MTMT","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('ZT_DTDZ_START_TIME').getValue())};
				}else{
					dateTime[1]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_MTMT","PLAN_START_DATE":""};
				};
				//安装撑架和导轨
				var ZT_PJDS_END_TIME=Ext.getCmp('ZT_JCFX_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[2]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_DKSB","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('ZT_JCFX_START_TIME').getValue())};
				}else{
					dateTime[2]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_DKSB","PLAN_START_DATE":""};
				};
				//定主机
				var ZT_PJDS_END_TIME=Ext.getCmp('ZT_ZJDG_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[3]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JFAZJX","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('ZT_ZJDG_START_TIME').getValue())};
				}else{
					dateTime[3]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JFAZJX","PLAN_START_DATE":""};
				};
				//安装轿架及轿厢
				var ZT_PJDS_END_TIME=Ext.getCmp('ZT_MTMT_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[4]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JJJXPJ","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('ZT_MTMT_START_TIME').getValue())};
				}else{
					dateTime[4]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JJJXPJ","PLAN_START_DATE":""};
				};
				//电气接线
				var ZT_PJDS_END_TIME=Ext.getCmp('ZT_JFAZJX_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[5]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_DTFH","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('ZT_JFAZJX_START_TIME').getValue())};
				}else{
					dateTime[5]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_DTFH","PLAN_START_DATE":""};
				};
				//报调日期
				var ZT_PJDS_END_TIME=Ext.getCmp('ZT_JJJXPJ_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[6]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_DTTS","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('ZT_JJJXPJ_START_TIME').getValue())};
				}else{
					dateTime[6]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_DTTS","PLAN_START_DATE":""};
				};
				//报检日期
				var ZT_PJDS_END_TIME=Ext.getCmp('ZT_CP_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[7]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_PJDS","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('ZT_CP_START_TIME').getValue())};
				}else{
					dateTime[7]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_PJDS","PLAN_START_DATE":""};
				};
				//验收完成日期
				var ZT_PJDS_END_TIME=Ext.getCmp('ZT_DKSB_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[8]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_CJ","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('ZT_DKSB_START_TIME').getValue())};
				}else{
					dateTime[8]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_CJ","PLAN_START_DATE":""};
				};
				//技检日期
				var ZT_PJDS_END_TIME=Ext.getCmp('ZT_DTTS_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[9]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_ZFJ","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('ZT_DTTS_START_TIME').getValue())};
				}else{
					dateTime[9]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_ZFJ","PLAN_START_DATE":""};
				};
				//完工日期
				var ZT_PJDS_END_TIME=Ext.getCmp('ZT_CJ_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[10]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JHWG","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('ZT_CJ_START_TIME').getValue())};
				}else{
					dateTime[10]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JHWG","PLAN_START_DATE":""};
				};
				//移交客户日期
				var ZT_PJDS_END_TIME=Ext.getCmp('ZT_ZFJ_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[11]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_ZJDG","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('ZT_ZFJ_START_TIME').getValue())};
				}else{
					dateTime[11]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_ZJDG","PLAN_START_DATE":""};
				};
	    		
	    		console.log('dataTime修改后: '+JSON.stringify(dateTime));
			}else if('扶梯'==lx){
				//进场
				var ZT_PJDS_END_TIME=Ext.getCmp('FT_AZ_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[0]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JCFX","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('FT_AZ_START_TIME').getValue())};
				}else{
					dateTime[0]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JCFX","PLAN_START_DATE":""};
				};
				//桁架样架定位
				var ZT_PJDS_END_TIME=Ext.getCmp('FT_TS_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[1]={"PLAN_END_DATE":"","WORK_STEP_CODE":"FT_AZ","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('FT_TS_START_TIME').getValue())};
				}else{
					dateTime[1]={"PLAN_END_DATE":"","WORK_STEP_CODE":"FT_AZ","PLAN_START_DATE":""};
				};
				//玻璃侧板安装
				var ZT_PJDS_END_TIME=Ext.getCmp('FT_CJ_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[2]={"PLAN_END_DATE":"","WORK_STEP_CODE":"FT_CJ","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('FT_CJ_START_TIME').getValue())};
				}else{
					dateTime[2]={"PLAN_END_DATE":"","WORK_STEP_CODE":"FT_CJ","PLAN_START_DATE":""};
				};
				//扶手带组件安装
				var ZT_PJDS_END_TIME=Ext.getCmp('FT_ZJ_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[3]={"PLAN_END_DATE":"","WORK_STEP_CODE":"FT_TS","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('FT_ZJ_START_TIME').getValue())};
				}else{
					dateTime[3]={"PLAN_END_DATE":"","WORK_STEP_CODE":"FT_TS","PLAN_START_DATE":""};
				};
				//步级安装
				var ZT_PJDS_END_TIME=Ext.getCmp('FT_bjaz_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[4]={"PLAN_END_DATE":"","WORK_STEP_CODE":"FT_ZJ","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('FT_bjaz_START_TIME').getValue())};
				}else{
					dateTime[4]={"PLAN_END_DATE":"","WORK_STEP_CODE":"FT_ZJ","PLAN_START_DATE":""};
				};
				//动力电源
				var ZT_PJDS_END_TIME=Ext.getCmp('FT_dldy_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[5]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_CP","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('FT_dldy_START_TIME').getValue())};
				}else{
					dateTime[5]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_CP","PLAN_START_DATE":""};
				};
				//报调日期
				var ZT_PJDS_END_TIME=Ext.getCmp('FT_bt_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[6]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_DTTS","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('FT_bt_START_TIME').getValue())};
				}else{
					dateTime[6]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_DTTS","PLAN_START_DATE":""};
				};
				//报检日期
				var ZT_PJDS_END_TIME=Ext.getCmp('FT_bj_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[7]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_PJDS","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('FT_bj_START_TIME').getValue())};
				}else{
					dateTime[7]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_PJDS","PLAN_START_DATE":""};
				};
				//验收完成日期
				var ZT_PJDS_END_TIME=Ext.getCmp('FT_yswc_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[8]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_CJ","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('FT_yswc_START_TIME').getValue())};
				}else{
					dateTime[8]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_CJ","PLAN_START_DATE":""};
				};
				//技检日期
				var ZT_PJDS_END_TIME=Ext.getCmp('FT_jj_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[9]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_ZFJ","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('FT_jj_START_TIME').getValue())};
				}else{
					dateTime[9]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_ZFJ","PLAN_START_DATE":""};
				};
				//完工日期
				var ZT_PJDS_END_TIME=Ext.getCmp('FT_wg_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[10]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JHWG","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('FT_wg_START_TIME').getValue())};
				}else{
					dateTime[10]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JHWG","PLAN_START_DATE":""};
				};
				//移交客户日期
				var ZT_PJDS_END_TIME=Ext.getCmp('FT_yjkh_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[11]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_ZJDG","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('FT_yjkh_START_TIME').getValue())};
				}else{
					dateTime[11]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_ZJDG","PLAN_START_DATE":""};
				};
				
				
			}else if('ITM'==lx){
				//进场
				var ZT_PJDS_END_TIME=Ext.getCmp('ITM_JC_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[0]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JCFX","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('ITM_JC_START_TIME').getValue())};
				}else{
					dateTime[0]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JCFX","PLAN_START_DATE":""};
				};
				//完工
				var ZT_PJDS_END_TIME=Ext.getCmp('ITM_WG_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[1]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JHWG","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('ITM_WG_START_TIME').getValue())};
				}else{
					dateTime[1]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_JHWG","PLAN_START_DATE":""};
				};
				//移交客户
				var ZT_PJDS_END_TIME=Ext.getCmp('ITM_YJKH_START_TIME').getValue();
				if(ZT_PJDS_END_TIME!=''){
					dateTime[2]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_ZJDG","PLAN_START_DATE":instalPlan_HP(Ext.getCmp('ITM_YJKH_START_TIME').getValue())};
				}else{
					dateTime[2]={"PLAN_END_DATE":"","WORK_STEP_CODE":"ZT_ZJDG","PLAN_START_DATE":""};
				};
			};
    		//修改获取的时间
    		function instalPlan_HP(time){
    			var date=new Date(time);
    			var newmonth=date.getMonth()+1;
    			var newday=date.getDate();
    			if(newmonth<10){
    				newmonth='0'+newmonth; 
    			};
    			if(newday<10){
    				newday='0'+newday;
    			};
    			var newdate=date.getFullYear()+"-"+newmonth+"-"+newday;
    			return newdate;
    		};
    		
    		data.DATE=dateTime;
    		var document={_id:dataId,json:{tcode:installTcode,tid:tiaojian,stext:data,ext1:pro}};
    		var options={};//默认
    		MaintainList.replace(document,options).then(function(){
    			WL.Toast.show('本地保存');
    		}).fail(function(){
    			WL.Toast.show('本地保存失败');
    		});
    	}).fail(function(errorObject){
			console.log("查询数据失败");
		});
			
	},

	//安装计划详细 实绩按钮
	instalPlan_HomePage_SJ_Button:function(){
		//判断是直梯还是扶梯
		var TypeTX=Ext.getCmp('HP_CM_ELEVATOR_TYPE_NAME').getValue();
		//进场
		var JC='';
		//调试
		var TS='';
		//厂检
		var CJ='';
		//政检
		var ZJ='';
		//总工期
		var ZGQ='';
		if(TypeTX=='直梯'){
			JC=Ext.getCmp('ZT_JCFX_END_TIME').getValue();
			TS=Ext.getCmp('ZT_DTTS_END_TIME').getValue();
			CJ=Ext.getCmp('ZT_CJ_END_TIME').getValue();
			ZJ=Ext.getCmp('ZT_ZFJ_END_TIME').getValue();
			ZGQ=Ext.getCmp('ZGQ_END_TIME').getValue();
		}else if(TypeTX=='扶梯'){
			JC=Ext.getCmp('FT_AZ_END_TIME').getValue();
			TS=Ext.getCmp('FT_TS_END_TIME').getValue();
			CJ=Ext.getCmp('FT_CJ_END_TIME').getValue();
			ZJ=Ext.getCmp('FT_ZJ_END_TIME').getValue();
			ZGQ=Ext.getCmp('FT_ZGQ_END_TIME').getValue();
		};
		
		//进入实绩页面
		this.NextView("InstallPlanSJ_id","HelcPDA.view.install.installplan.InstallPlanSJ");

		//计划
		Ext.getCmp('InstallPlanSJ_JC_JH').setValue(JC);
		Ext.getCmp('InstallPlanSJ_TSWC_JH').setValue(TS);
		Ext.getCmp('InstallPlanSJ_CJWC_JH').setValue(CJ);
		Ext.getCmp('InstallPlanSJ_ZFJFZ_JH').setValue(ZJ);
		Ext.getCmp('InstallPlanSJ_ZGQ_JH').setValue(ZGQ);
		
		//查询
		var TASK_ID=Ext.getCmp('HP_TASK_ID').getValue();
		var getResult=function(res){
			console.log('实绩需要的数据'+JSON.stringify(res));
			//DEBUG_END_DATE 调试完成日期
			//GOV_CHECK_DATE 技监发证日期
			//CHECK_DATE  验收日期
			//ENTRANCE_DATE 进场日期
			
			//实绩
			Ext.getCmp('InstallPlanSJ_JC_SJ').setValue(res.item.ENTRANCE_DATE);
			Ext.getCmp('InstallPlanSJ_TSWC_SJ').setValue(res.item.CHECK_DATE);
			Ext.getCmp('InstallPlanSJ_CJWC_SJ').setValue(res.item.GOV_CHECK_DATE);
			Ext.getCmp('InstallPlanSJ_ZFJFZ_SJ').setValue(res.item.DEBUG_END_DATE);
			Ext.getCmp('InstallPlanSJ_ZGQ_SJ').setValue();
			
		};
		var Trim="{'TASK_ID':'"+TASK_ID+"'}";
		this.connectServer(getResult,'installPlanAction.do?method=toSJselectXCX',Trim);
	},
	
	//根据页面活动判断按钮是显示还是隐藏
	tabpanel_instalPlan_HomePage:function( obj,value,oldValue,eOpts  ){
		//测试进入安装详细计划用 1
		var AZXXJH_JINRU_index=Ext.getCmp('AZXXJH_JINRU_index').getValue();
		//测试进入安装详细计划用 2
		var AZXXJH_JINRU_FLAG=Ext.getCmp('AZXXJH_JINRU_FLAG').getValue();
		
		if(AZXXJH_JINRU_index==1){//第一次
			XSandYC();
		}else if(AZXXJH_JINRU_index!=1){//第一次后
			if(AZXXJH_JINRU_FLAG=='false'){
				AZXXJH_JINRU_FLAG='true';
				//测试进入安装详细计划用 2
				Ext.getCmp('AZXXJH_JINRU_FLAG').setValue(AZXXJH_JINRU_FLAG);
				XSandYC();
			}else if(AZXXJH_JINRU_FLAG=='true'){
				XSandYC();
			};
		};
		
		function XSandYC(){
			//alert('进入XSandYC');
			//alert('根据页面活动判断按钮是显示还是隐藏');
			var tp_chart = Ext.getCmp("tabpanel_instalPlan_HomePage");
			
			var itemId = tp_chart.getActiveItem().getId();
			var SJ=Ext.getCmp('instalPlan_HomePage_SJ_Button');
			var ZY=Ext.getCmp('instalPlan_HomePage_ZY_Button');
			var TJ=Ext.getCmp('instalPlan_HomePage_TJ_Button');
			
			//如果当前页面没有此控件那么返回
			if(SJ==undefined){
				return;
			};
			
			if (itemId == 'tabpanel_instalPlan_HomePage_CKSJ') {
				var faa=SJ.getHidden();
				if(faa==true){
					SJ.setHidden(false);
				}else{
					SJ.setHidden(true);
				};
				//SJ.setHidden(true);
				ZY.setHidden(false);
				TJ.setHidden(false);
				
				//TJ.setDisabled(true);
				var dd=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
				if(dd!=null){
					TJ.setDisabled(false);
				};
				//棚架搭设判断
				
				//解除封锁
				var nview = Ext.getCmp('installplan_AZJHXXHomePage');
				nview.initDataEnd();
			} else if (itemId == 'tabpanel_instalPlan_HomePage_LRSJ') {
				
				SJ.setHidden(false);
				ZY.setHidden(true);
				TJ.setHidden(true);
			};
		};
		
	},
	
	//安装计划详细   录入数据   直梯 起始时间
	ZT_PJDS_START_TIME:function(){
		var newDate_str=Ext.getCmp('ZT_PJDS_START_TIME').getValue();

		//判断是批量还是单个
		var obj=this;
		var  plnum=Ext.getCmp('plnum').getValue();
		
		//alert('进入直梯的时间');
		var flag=Ext.getCmp('FLAG').getValue();
	   //alert('直梯flag:'+flag);
		flag=1;
		if(flag==1){
			//alert('进入直梯的时间2');
			//单个提交 添加封锁
			if(plnum==0){
				var nview = Ext.getCmp('installplan_AZJHXXHomePage');
				nview.initData();
			}else if(plnum==1){
				var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
				nview2.initData();
			};
			
			//获取棚架搭设开始时间
			var startDay;
			var startEnd;
	        
			//清除
			if(newDate_str==''){
			
			}else if(newDate_str!=''&&azjhflag==0){//添加数据
				//清空其他日期 06 22
				azjhflag=1;
				Ext.getCmp('ZT_DTDZ_START_TIME').setValue('');
				Ext.getCmp('ZT_JCFX_START_TIME').setValue('');
				Ext.getCmp('ZT_ZJDG_START_TIME').setValue('');
				Ext.getCmp('ZT_MTMT_START_TIME').setValue('');
				Ext.getCmp('ZT_JFAZJX_START_TIME').setValue('');
				Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue('');
				Ext.getCmp('ZT_CP_START_TIME').setValue('');
				Ext.getCmp('ZT_DKSB_START_TIME').setValue('');
				Ext.getCmp('ZT_DTTS_START_TIME').setValue('');
				Ext.getCmp('ZT_CJ_START_TIME').setValue('');
				Ext.getCmp('ZT_ZFJ_START_TIME').setValue('');
				Ext.getCmp('ZGQ_START_TIME').setValue(newDate_str);
				Ext.getCmp('ZGQ_END_TIME').setValue('');
				Ext.getCmp('anjh_node').setValue('ZT_PJDS_START_TIME');
				azjhflag=0;
				
			 if(azjhflag==0&&(Ext.getCmp('ZT_CJ_START_TIME').getValue()==null||Ext.getCmp('ZT_CJ_START_TIME').getValue()=="")){
	        	Ext.Msg.alert("请输入完工时间！");
	        	return;
	        }
				
				startDay=newDate_str;
				var gf =Ext.getCmp("HP_INST_METHOD").getValue();
				var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
				var day=DateDiff(startDay.trim(),ed);
				
				//工法
				var params={};
				if(gf=="传统搭棚"){
			    params.gongfa="P1";
			    params.gongxu="A1";
			    params.day=day;
				}else if(gf=="AN2"||gf=="吊篮"){
				params.gongfa="P2";
				params.gongxu="B1";
				params.day=day;
				}
					
			    //obj.connectServerMainTain(getResult,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
			    function getResult(res,obj){
			    //alert("ss"+JSON.stringify(res));	
			    res =res.item[0];
			    azjhflag=1;
				//进场
//			    var newDate_str=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
//			    var date_temp = new Date(newDate_str.replace(/-/g,"/"));
//				date_temp.setDate(date_temp.getDate()+parseInt(res.Entry_Time));
//				var newDate_str = Ext.Date.format(date_temp,'Y-m-d').trim();
//				Ext.getCmp('ZT_PJDS_END_TIME').setValue(newDate_str);
			
				//放样
			    var newDate=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
				var date_temp = new Date(newDate.replace(/-/g,"/"));
				date_temp.setDate(date_temp.getDate()+parseInt(res.Setting_Time));
				var newDate_str = Ext.Date.format(date_temp,'Y-m-d');
				Ext.getCmp('ZT_DTDZ_START_TIME').setValue(newDate_str);
	
				
				//安装撑架和导轨
				var newDate=Ext.getCmp('ZT_DTDZ_START_TIME').getValue();
				var date_temp = new Date(newDate.replace(/-/g,"/"));
				date_temp.setDate(date_temp.getDate()+parseInt(res.Guide_Time));
				var newDate_str = Ext.Date.format(date_temp,'Y-m-d');
				Ext.getCmp('ZT_JCFX_START_TIME').setValue(newDate_str);
				
				//定主机
				var newDate=Ext.getCmp('ZT_JCFX_START_TIME').getValue();
				var date = new Date(newDate.replace(/-/g,"/"));
				date.setDate(date.getDate()+parseInt(res.Engine_Time));
				var newDate_str = Ext.Date.format(date,'Y-m-d');
				Ext.getCmp('ZT_ZJDG_START_TIME').setValue(newDate_str);
//								
				//安装轿架及
				var newDate=Ext.getCmp('ZT_ZJDG_START_TIME').getValue();
				var date = new Date(newDate.replace(/-/g,"/"));
				date.setDate(date.getDate()+parseInt(res.Frame_Time));
				var newDate_str = Ext.Date.format(date,'Y-m-d');
				Ext.getCmp('ZT_MTMT_START_TIME').setValue(newDate_str);
				
								
				//电气接线
				var newDate=Ext.getCmp('ZT_MTMT_START_TIME').getValue();
				var date = new Date(newDate.replace(/-/g,"/"));
				date.setDate(date.getDate()+parseInt(res.Electric_Time));
				var newDate_str = Ext.Date.format(date,'Y-m-d');
				Ext.getCmp('ZT_JFAZJX_START_TIME').setValue(newDate_str);
//				
				
				//报调日期
				var newDate=Ext.getCmp('ZT_JFAZJX_START_TIME').getValue();
				var date = new Date(newDate.replace(/-/g,"/"));
				date.setDate(date.getDate()+parseInt(res.Adjustable_Time));
				var newDate_str = Ext.Date.format(date,'Y-m-d');
				Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue(newDate_str);

				
				//报检
				var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME').getValue();
				var date = new Date(newDate.replace(/-/g,"/"));
				date.setDate(date.getDate()+parseInt(res.Examine_Time));
				var newDate_str = Ext.Date.format(date,'Y-m-d');
				Ext.getCmp('ZT_CP_START_TIME').setValue(newDate_str);
				

				//验收
				var newDate=Ext.getCmp('ZT_CP_START_TIME').getValue();
				var date = new Date(newDate.replace(/-/g,"/"));
				date.setDate(date.getDate()+parseInt(res.Accept_Time));
				var newDate_str = Ext.Date.format(date,'Y-m-d');
				Ext.getCmp('ZT_DKSB_START_TIME').setValue(newDate_str);
		
				
				//技检
				var newDate=Ext.getCmp('ZT_DKSB_START_TIME').getValue();
				var date = new Date(newDate.replace(/-/g,"/"));
				date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
				var newDate_str = Ext.Date.format(date,'Y-m-d');
				Ext.getCmp('ZT_DTTS_START_TIME').setValue(newDate_str);
						
				//总工期
				Ext.getCmp('ZGQ_START_TIME').setValue(startDay);
				var newDate=Ext.getCmp('ZT_ZFJ_START_TIME').getValue();
				var date = new Date(newDate.replace(/-/g,"/"));
				var newDate_str = Ext.Date.format(date,'Y-m-d');
				Ext.getCmp('ZGQ_END_TIME').setValue(newDate_str);
				
				startEnd=newDate_str;
					
					if(plnum==1){
						var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
						H_TIME.setDisabled(false);	
						
						var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
						nview2.initDataEnd();
						
						//计算工程日期
						var Zday=DateDiff(startDay.trim(),startEnd.trim());
						var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T");
						titleWJC.innerHTML='总工期('+Zday+'天)';
						
					}else if(plnum==0){
						var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
						H_TIME.setDisabled(false);	
						
						var nview = Ext.getCmp('installplan_AZJHXXHomePage');
						nview.initDataEnd();
						
						
						//计算工程日期
						var Zday=DateDiff(startDay.trim(),startEnd.trim());
						var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
						titleWJC.innerHTML='总工期('+Zday+'天)';
					};
					azjhflag=0;
			    }
				
				
		
			};

			//修改获取的时间
			function instalPlan_HP(time){
				var date=new Date(time);
				var newmonth=date.getMonth()+1;
				var newday=date.getDate();
				if(newmonth<10){
					newmonth='0'+newmonth; 
				};
				if(newday<10){
					newday='0'+newday;
				};
				var newdate=date.getFullYear()+"-"+newmonth+"-"+newday;
				return newdate;
			};
			
		};
	},
	
	//公共的判断结束时间要大于开始时间  zhj
	StartAndEnd:function(obj, newDate, oldDate, eOpts ){
		//判断是批量还是单个
		var  plnum=Ext.getCmp('plnum').getValue();
		
		var flag=Ext.getCmp('FLAG').getValue();
		console.log("newDate:"+newDate+"oldDate:"+oldDate);
		//用于批量判断是否直梯和扶梯
		var PLtzType=Ext.getCmp('HP_CM_ELEVATOR_TYPE_NAME').getValue();
		
		flag=1;
		if(flag==1){
			
			//时间控件修改  添加封锁
			if(plnum==0){
				var nview = Ext.getCmp('installplan_AZJHXXHomePage');
				nview.initData();
			}else if(plnum==1){
				var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
				nview2.initData();
			};
			
			//判断是直梯还是扶梯
			var lx=PLtzType;
			//=Ext.getCmp('HP_ELEVATOR_CLASS_NAME').getValue();
            /*if(plnum==1){
				lx=PLtzType;
			}else{
				lx=Ext.getCmp('HP_ELEVATOR_CLASS_NAME').getValue();
			};
			*/
			//判端点击标志
			
			if('直梯'==lx){
				//结束日期不能大于开始日期，   2014-6-20 大于  2014-6-21
				//开始日期改变结束日期也跟着改变
				
				if(obj.getId()=='ZT_DTDZ_START_TIME'&&azjhflag==0){
					//放样
					if(newDate!=''){
						
						azjhflag=1;
						Ext.getCmp('ZT_JCFX_START_TIME').setValue('');
						Ext.getCmp('ZT_ZJDG_START_TIME').setValue('');
						Ext.getCmp('ZT_MTMT_START_TIME').setValue('');
						Ext.getCmp('ZT_JFAZJX_START_TIME').setValue('');
						Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue('');
						Ext.getCmp('ZT_CP_START_TIME').setValue('');
						Ext.getCmp('ZT_DKSB_START_TIME').setValue('');
						Ext.getCmp('ZT_DTTS_START_TIME').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME').setValue('');
						Ext.getCmp('ZT_ZFJ_START_TIME').setValue('');
						Ext.getCmp('ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_DTDZ_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_CJ_START_TIME").getValue()==null||Ext.getCmp("ZT_CJ_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						 
							
					};
				}
				//安装撑架和导轨
				else if(obj.getId()=='ZT_JCFX_START_TIME'&&azjhflag==0){
					
					if(newDate!=''){
						
						azjhflag=1;
			
						Ext.getCmp('ZT_ZJDG_START_TIME').setValue('');
						Ext.getCmp('ZT_MTMT_START_TIME').setValue('');
						Ext.getCmp('ZT_JFAZJX_START_TIME').setValue('');
						Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue('');
						Ext.getCmp('ZT_CP_START_TIME').setValue('');
						Ext.getCmp('ZT_DKSB_START_TIME').setValue('');
						Ext.getCmp('ZT_DTTS_START_TIME').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME').setValue('');
						Ext.getCmp('ZT_ZFJ_START_TIME').setValue('');
						Ext.getCmp('ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_JCFX_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_CJ_START_TIME").getValue()==null||Ext.getCmp("ZT_CJ_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
					
					  
					};
				}
				//定主机
				else if(obj.getId()=='ZT_ZJDG_START_TIME'&&azjhflag==0){
					
					if(newDate!=''){
						
						azjhflag=1;
						Ext.getCmp('ZT_MTMT_START_TIME').setValue('');
						Ext.getCmp('ZT_JFAZJX_START_TIME').setValue('');
						Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue('');
						Ext.getCmp('ZT_CP_START_TIME').setValue('');
						Ext.getCmp('ZT_DKSB_START_TIME').setValue('');
						Ext.getCmp('ZT_DTTS_START_TIME').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME').setValue('');
						Ext.getCmp('ZT_ZFJ_START_TIME').setValue('');
						Ext.getCmp('ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_ZJDG_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_CJ_START_TIME").getValue()==null||Ext.getCmp("ZT_CJ_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}

						
					  
					};
				}
				//安装轿架及轿厢
				else if(obj.getId()=='ZT_MTMT_START_TIME'&&azjhflag==0){
					
					if(newDate!=''){
					
						azjhflag=1;
						Ext.getCmp('ZT_JFAZJX_START_TIME').setValue('');
						Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue('');
						Ext.getCmp('ZT_CP_START_TIME').setValue('');
						Ext.getCmp('ZT_DKSB_START_TIME').setValue('');
						Ext.getCmp('ZT_DTTS_START_TIME').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME').setValue('');
						Ext.getCmp('ZT_ZFJ_START_TIME').setValue('');
						Ext.getCmp('ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_MTMT_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_CJ_START_TIME").getValue()==null||Ext.getCmp("ZT_CJ_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
					};
				}
				//电气接线
				else if(obj.getId()=='ZT_JFAZJX_START_TIME'&&azjhflag==0){
					
					if(newDate!=''){
						azjhflag=1;
						Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue('');
						Ext.getCmp('ZT_CP_START_TIME').setValue('');
						Ext.getCmp('ZT_DKSB_START_TIME').setValue('');
						Ext.getCmp('ZT_DTTS_START_TIME').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME').setValue('');
						Ext.getCmp('ZT_ZFJ_START_TIME').setValue('');
						Ext.getCmp('ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_JFAZJX_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_CJ_START_TIME").getValue()==null||Ext.getCmp("ZT_CJ_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
					  
					};
				}
				//报调日期
				else if(obj.getId()=='ZT_JJJXPJ_START_TIME'&&azjhflag==0){
					
					if(newDate!=''){
					
						azjhflag=1;
						Ext.getCmp('ZT_CP_START_TIME').setValue('');
						Ext.getCmp('ZT_DKSB_START_TIME').setValue('');
						Ext.getCmp('ZT_DTTS_START_TIME').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME').setValue('');
						Ext.getCmp('ZT_ZFJ_START_TIME').setValue('');
						Ext.getCmp('ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_JJJXPJ_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_CJ_START_TIME").getValue()==null||Ext.getCmp("ZT_CJ_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
											
					};
				}
				//报检日期
				else if(obj.getId()=='ZT_CP_START_TIME'&&azjhflag==0){
					
					if(newDate!=''){
						
						
						azjhflag=1;
						Ext.getCmp('ZT_DKSB_START_TIME').setValue('');
						Ext.getCmp('ZT_DTTS_START_TIME').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME').setValue('');
						Ext.getCmp('ZT_ZFJ_START_TIME').setValue('');
						Ext.getCmp('ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_CP_START_TIME');
						azjhflag=0;
						if(Ext.getCmp("ZT_CJ_START_TIME").getValue()==null||Ext.getCmp("ZT_CJ_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
					
						
					};
			  //验收完成日期
				}else if(obj.getId()=='ZT_DKSB_START_TIME'&&azjhflag==0){
					
					if(newDate!=''){
						
						azjhflag=1;
						Ext.getCmp('ZT_DTTS_START_TIME').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME').setValue('');
						Ext.getCmp('ZT_ZFJ_START_TIME').setValue('');
						Ext.getCmp('ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_DKSB_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_CJ_START_TIME").getValue()==null||Ext.getCmp("ZT_CJ_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
					};
			   //技检
				}else if(obj.getId()=='ZT_DTTS_START_TIME'&&azjhflag==0){
					if(newDate!=''){
						
						azjhflag=1;
						Ext.getCmp('ZT_CJ_START_TIME').setValue('');
						Ext.getCmp('ZT_ZFJ_START_TIME').setValue('');
						Ext.getCmp('ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_DTTS_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_CJ_START_TIME").getValue()==null||Ext.getCmp("ZT_CJ_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
						

					};
				//完工
				}else if(obj.getId()=='ZT_CJ_START_TIME'&&azjhflag==0){
//					if(Ext.getCmp("ZT_PJDS_START_TIME").getValue()==null||Ext.getCmp("ZT_PJDS_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入进场时间！");
//						return;
//					}	
					if(newDate!=''){
						
						
						var node =Ext.getCmp('anjh_node').getValue();
						
						//进场
						if(node=='ZT_PJDS_START_TIME'){
						//Ext.getCmp('ZT_CJ_START_TIME').setValue(newDate);
						var st =Ext.getCmp('ZT_PJDS_START_TIME').getValue().trim() ;
						var gf =Ext.getCmp("HP_INST_METHOD").getValue();
						//工法
						var day=DateDiff(st,newDate.trim() );
						
						var params={};
						if(gf=="传统搭棚"){
					    params.gongfa="P1";
					    params.gongxu="A1";
					    params.day=day;
						}else if(gf=="AN2"||gf=="吊篮"){
						params.gongfa="P2";
						params.gongxu="B1";
						params.day=day;
						}	
					    this.connectServerMainTain(getResult9,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
						//放样
						}else if(node=='ZT_DTDZ_START_TIME'){

							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_DTDZ_START_TIME').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A2";
						    params.day=day;
							}else if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B2";
							params.day=day;
							}	
						 this.connectServerMainTain(getResult,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
								
						 //安装撑架和导轨或AN2定主机	
						}else if(node=='ZT_JCFX_START_TIME'){
							
							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_JCFX_START_TIME').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A3";
						    params.day=day;
							}else if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B3";
							params.day=day;
							}	
						    
						   this.connectServerMainTain(getResult1,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
						   
						 //定主机或安装轿架
						}else if(node=='ZT_ZJDG_START_TIME'){
							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_ZJDG_START_TIME').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A4";
						    params.day=day;
							}else if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B4";
							params.day=day;
							}	
						   this.connectServerMainTain(getResult2,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
							
						//安装轿架或安装撑架	
						}else if(node=='ZT_MTMT_START_TIME'){
							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_MTMT_START_TIME').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A5";
						    params.day=day;
							}else if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B5";
							params.day=day;
							}	
						   this.connectServerMainTain(getResult3,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
							
						  
							
						//电气接线	
						}else if(node=='ZT_JFAZJX_START_TIME'){
							
							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_JFAZJX_START_TIME').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A6";
						    params.day=day;
							}else if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B6";
							params.day=day;
							}	
						    this.connectServerMainTain(getResult4,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
							
							
						//报调日期	
						}else if(node=='ZT_JJJXPJ_START_TIME'){
							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_JJJXPJ_START_TIME').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A7";
						    params.day=day;
							}else if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B7";
							params.day=day;
							}	
						    this.connectServerMainTain(getResult5,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
						//报检日期	
						}else if(node=='ZT_CP_START_TIME'){
							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_CP_START_TIME').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A8";
						    params.day=day;
							}else if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B8";
							params.day=day;
							}	
						   this.connectServerMainTain(getResult6,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
							
						 
					    //验收完成日期
						}else if(node=='ZT_DKSB_START_TIME'){
							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_CP_START_TIME').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A9";
						    params.day=day;
							}else  if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B9";
							params.day=day;
							}	
						    this.connectServerMainTain(getResult7,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
							
						}	
						//技检日期	
						else if(node=='ZT_DTTS_START_TIME'){
						
							var newDate=Ext.getCmp('ZT_CJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZFJ_START_TIME').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
							Ext.getCmp('ZGQ_START_TIME').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_ZFJ_START_TIME').getValue();
							Ext.getCmp('ZGQ_END_TIME').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
						
						}
						console.log("day"+day);
//					    //完工日期
//						else if(node=='ZT_CJ_START_TIME'){
//						
//						}
					    //进场
					    function getResult9(res,obj){
						   res=res.item[0];
						   azjhflag=1;	
						  
						    //放样
						    var newDate=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Setting_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DTDZ_START_TIME').setValue(newDate_str);
							
						    var gf=Ext.getCmp("HP_INST_METHOD").getValue();
						   //安装撑架和导轨或定主机
							var newDate=Ext.getCmp('ZT_DTDZ_START_TIME').getValue();
							var date_temp = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							date_temp.setDate(date_temp.getDate()+parseInt(res.Guide_Time));
							}else{
							date_temp.setDate(date_temp.getDate()+parseInt(res.Engine_Time));	
							}
							var newDate_str = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('ZT_JCFX_START_TIME').setValue(newDate_str); 
																
							//定主机或安装桥架 
							var newDate=Ext.getCmp('ZT_JCFX_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							 date.setDate(date.getDate()+parseInt(res.Engine_Time));
							 }else {	    
							 date.setDate(date.getDate()+parseInt(res.Frame_Time)); 
							 }
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZJDG_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_ZJDG_END_TIME').setValue(newDate_str);
							
							//安装轿架或安装撑架
							var newDate=Ext.getCmp('ZT_ZJDG_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							date.setDate(date.getDate()+parseInt(res.Frame_Time));
							} else{
						    date.setDate(date.getDate()+parseInt(res.Guide_Time));	
							}
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_MTMT_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_MTMT_END_TIME').setValue(newDate_str);					
							
							//电气接线
							var newDate=Ext.getCmp('ZT_MTMT_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Electric_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JFAZJX_START_TIME').setValue(newDate_str);
							
							//报调日期
							var newDate=Ext.getCmp('ZT_JFAZJX_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Adjustable_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue(newDate_str);

		
							//报检
							var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Examine_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CP_START_TIME').setValue(newDate_str);
							
							//验收
							var newDate=Ext.getCmp('ZT_CP_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							//技检
							var newDate=Ext.getCmp('ZT_DKSB_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DTTS_START_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZFJ_START_TIME').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
							Ext.getCmp('ZGQ_START_TIME').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_ZFJ_START_TIME').getValue();
							Ext.getCmp('ZGQ_END_TIME').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							azjhflag=0;
		   
					   };
					   //放样
					   function getResult(res,obj){
						   res=res.item[0];
						   azjhflag=1;
						   var gf=Ext.getCmp("HP_INST_METHOD").getValue();
						   //安装撑架和导轨或定主机
							var newDate=Ext.getCmp('ZT_DTDZ_START_TIME').getValue();
							var date_temp = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							date_temp.setDate(date_temp.getDate()+parseInt(res.Guide_Time));
							}else{
							date_temp.setDate(date_temp.getDate()+parseInt(res.Engine_Time));	
							}
							var newDate_str = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('ZT_JCFX_START_TIME').setValue(newDate_str); 
																
							//定主机或安装桥架 
							var newDate=Ext.getCmp('ZT_JCFX_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							 date.setDate(date.getDate()+parseInt(res.Engine_Time));
							 }else {	    
							 date.setDate(date.getDate()+parseInt(res.Frame_Time)); 
							 }
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZJDG_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_ZJDG_END_TIME').setValue(newDate_str);
							
							//安装轿架或安装撑架
							var newDate=Ext.getCmp('ZT_ZJDG_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							date.setDate(date.getDate()+parseInt(res.Frame_Time));
							} else{
						    date.setDate(date.getDate()+parseInt(res.Guide_Time));	
							}
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_MTMT_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_MTMT_END_TIME').setValue(newDate_str);	
							
							var newDate=Ext.getCmp('ZT_MTMT_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Electric_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JFAZJX_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_JFAZJX_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JFAZJX_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Adjustable_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_JJJXPJ_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Examine_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CP_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_CP_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CP_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_DKSB_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DTTS_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZFJ_START_TIME').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
							Ext.getCmp('ZGQ_START_TIME').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_ZFJ_START_TIME').getValue();
							Ext.getCmp('ZGQ_END_TIME').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							azjhflag=0;
		   
					   }
					   //安装撑架和导轨或an2定主机
					   function getResult1(res,obj){					  	
						   res=res.item[0];
						   azjhflag=1;
						   //安装撑架或安装桥架 
						    var gf=Ext.getCmp("HP_INST_METHOD").getValue();
							var newDate=Ext.getCmp('ZT_JCFX_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							 date.setDate(date.getDate()+parseInt(res.Engine_Time));
							 }else {	    
							 date.setDate(date.getDate()+parseInt(res.Frame_Time)); 
							 }
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZJDG_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_ZJDG_END_TIME').setValue(newDate_str);
							
							//安装轿架或安装撑架
							var newDate=Ext.getCmp('ZT_ZJDG_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							date.setDate(date.getDate()+parseInt(res.Frame_Time));
							} else{
						    date.setDate(date.getDate()+parseInt(res.Guide_Time));	
							}
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_MTMT_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_MTMT_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_MTMT_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Electric_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JFAZJX_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_JFAZJX_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JFAZJX_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Adjustable_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_JJJXPJ_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Examine_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CP_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_CP_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CP_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_DKSB_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DTTS_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZFJ_START_TIME').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
							Ext.getCmp('ZGQ_START_TIME').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_ZFJ_START_TIME').getValue();
							Ext.getCmp('ZGQ_END_TIME').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							
							azjhflag=0;
		   
					   }
					   //定主机
					   function getResult2(res,obj){
						   res=res.item[0];
						   azjhflag=1;
						    var gf=Ext.getCmp("HP_INST_METHOD").getValue();
						
							//安装轿架或安装撑架
							var newDate=Ext.getCmp('ZT_ZJDG_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							date.setDate(date.getDate()+parseInt(res.Frame_Time));
							} else{
						    date.setDate(date.getDate()+parseInt(res.Guide_Time));	
							}
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_MTMT_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_MTMT_END_TIME').setValue(newDate_str);
							
							
							var newDate=Ext.getCmp('ZT_MTMT_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Electric_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JFAZJX_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_JFAZJX_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JFAZJX_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Adjustable_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_JJJXPJ_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Examine_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CP_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_CP_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CP_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_DKSB_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DTTS_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZFJ_START_TIME').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
							Ext.getCmp('ZGQ_START_TIME').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_ZFJ_START_TIME').getValue();
							Ext.getCmp('ZGQ_END_TIME').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							azjhflag=0;
		   
					   }
						//安装轿架及轿厢 
					   function getResult3(res,obj){
						   res=res.item[0];
						   azjhflag=1;

							var newDate=Ext.getCmp('ZT_MTMT_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Electric_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JFAZJX_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_JFAZJX_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JFAZJX_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Adjustable_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_JJJXPJ_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Examine_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CP_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_CP_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CP_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_DKSB_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DTTS_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);
														
							var newDate=Ext.getCmp('ZT_CJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZFJ_START_TIME').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
							Ext.getCmp('ZGQ_START_TIME').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_ZFJ_START_TIME').getValue();
							Ext.getCmp('ZGQ_END_TIME').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							azjhflag=0;
		   
					   }
					 //电气接线 
					   function getResult4(res,obj){
						   res=res.item[0];
						   azjhflag=1;
					
							var newDate=Ext.getCmp('ZT_JFAZJX_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Adjustable_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_JJJXPJ_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Examine_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CP_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_CP_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CP_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_DKSB_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DTTS_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);

							
							var newDate=Ext.getCmp('ZT_CJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZFJ_START_TIME').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
							Ext.getCmp('ZGQ_START_TIME').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_ZFJ_START_TIME').getValue();
							Ext.getCmp('ZGQ_END_TIME').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							azjhflag=0;
		   
					   }
					 //报调日期
					   function getResult5(res,obj){
						   res=res.item[0];
						   azjhflag=1;
						   
							var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Examine_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CP_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_CP_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CP_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_DKSB_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DTTS_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZFJ_START_TIME').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
							Ext.getCmp('ZGQ_START_TIME').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_ZFJ_START_TIME').getValue();
							Ext.getCmp('ZGQ_END_TIME').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							
							azjhflag=0;
					   }
					 //报检日期
					   function getResult6(res,obj){
						   res=res.item[0];
						   azjhflag=1;
					
							var newDate=Ext.getCmp('ZT_CP_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_DKSB_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DTTS_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);
								
							
							var newDate=Ext.getCmp('ZT_CJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZFJ_START_TIME').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
							Ext.getCmp('ZGQ_START_TIME').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_ZFJ_START_TIME').getValue();
							Ext.getCmp('ZGQ_END_TIME').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							
							azjhflag=0;
					   }
					   //验收完成日期
					   function getResult7(res,obj){
						   res=res.item[0];
						   azjhflag=1;
					
							var newDate=Ext.getCmp('ZT_DKSB_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DTTS_START_TIME').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);
						
							var newDate=Ext.getCmp('ZT_CJ_START_TIME').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZFJ_START_TIME').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
							Ext.getCmp('ZGQ_START_TIME').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_ZFJ_START_TIME').getValue();
							Ext.getCmp('ZGQ_END_TIME').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							azjhflag=0;
		   
					   }
					   //
					   
					   
					};
				}else if(obj.getId()=='ZT_ZFJ_START_TIME'&&azjhflag==0){
					if(newDate!=''){
						if(Ext.getCmp("ZT_CJ_START_TIME").getValue()==null||Ext.getCmp("ZT_CJ_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}

						var qssj=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
						Ext.getCmp('ZGQ_START_TIME').setValue(qssj);
						Ext.getCmp('ZGQ_END_TIME').setValue(newDate);
						//nameDate_H.setDisabled(false);
						
						var startDay;
						var startEnd;
						var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
						startDay=PJDS_start;
						var newDateS=Ext.getCmp('ZT_ZFJ_START_TIME').getValue();
						startEnd=newDateS;
						var Zday=DateDiff(startDay.trim(),startEnd.trim());
						if(plnum==0){
								//计划总天数
								var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
								titleWJC.innerHTML='总工期('+Zday+'天)';
						}else if(plnum==1){
								var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T");
								titleWJC.innerHTML='总工期('+Zday+'天)';
						};
					}
				}
	
			}else if('扶梯'==lx){
				if(obj.getId()=='FT_TS_START_TIME'&&azjhflag==0){
					//样架
					if(newDate!=''){	
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_CJ_START_TIME').setValue('');
						Ext.getCmp('FT_ZJ_START_TIME').setValue('');
						Ext.getCmp('FT_bjaz_START_TIME').setValue('');
						Ext.getCmp('FT_dldy_START_TIME').setValue('');
						Ext.getCmp('FT_bt_START_TIME').setValue('');
						Ext.getCmp('FT_bj_START_TIME').setValue('');
						Ext.getCmp('FT_yswc_START_TIME').setValue('');
						Ext.getCmp('FT_jj_START_TIME').setValue('');
						Ext.getCmp('FT_wg_START_TIME').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_TS_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
 
						
					};
				}else if(obj.getId()=='FT_CJ_START_TIME'&&azjhflag==0){
					//玻璃	
					if(newDate!=''){
						
						
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_ZJ_START_TIME').setValue('');
						Ext.getCmp('FT_bjaz_START_TIME').setValue('');
						Ext.getCmp('FT_dldy_START_TIME').setValue('');
						Ext.getCmp('FT_bt_START_TIME').setValue('');
						Ext.getCmp('FT_bj_START_TIME').setValue('');
						Ext.getCmp('FT_yswc_START_TIME').setValue('');
						Ext.getCmp('FT_jj_START_TIME').setValue('');
						Ext.getCmp('FT_wg_START_TIME').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_CJ_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
												

					};
				}else if(obj.getId()=='FT_ZJ_START_TIME'&&azjhflag==0){
					//扶手
//					if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入完工时间！");
//						return;
//					}
					if(newDate!=''){
						
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_bjaz_START_TIME').setValue('');
						Ext.getCmp('FT_dldy_START_TIME').setValue('');
						Ext.getCmp('FT_bt_START_TIME').setValue('');
						Ext.getCmp('FT_bj_START_TIME').setValue('');
						Ext.getCmp('FT_yswc_START_TIME').setValue('');
						Ext.getCmp('FT_jj_START_TIME').setValue('');
						Ext.getCmp('FT_wg_START_TIME').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_ZJ_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
						
					};
					
				}else if(obj.getId()=='FT_bjaz_START_TIME'&&azjhflag==0){
					//步级
//					if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入完工时间！");
//						return;
//					}
					if(newDate!=''){
						
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_dldy_START_TIME').setValue('');
						Ext.getCmp('FT_bt_START_TIME').setValue('');
						Ext.getCmp('FT_bj_START_TIME').setValue('');
						Ext.getCmp('FT_yswc_START_TIME').setValue('');
						Ext.getCmp('FT_jj_START_TIME').setValue('');
						Ext.getCmp('FT_wg_START_TIME').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_bjaz_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
						
					};
					
				}else if(obj.getId()=='FT_dldy_START_TIME'&&azjhflag==0){
					//动力电源
//					if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入完工时间！");
//						return;
//					}
					if(newDate!=''){
						
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_bt_START_TIME').setValue('');
						Ext.getCmp('FT_bj_START_TIME').setValue('');
						Ext.getCmp('FT_yswc_START_TIME').setValue('');
						Ext.getCmp('FT_jj_START_TIME').setValue('');
						Ext.getCmp('FT_wg_START_TIME').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_dldy_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						

					};
					
				}else if(obj.getId()=='FT_bt_START_TIME'&&azjhflag==0){
					//报调
//					if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入完工时间！");
//						return;
//					}
					if(newDate!=''){
						
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_bj_START_TIME').setValue('');
						Ext.getCmp('FT_yswc_START_TIME').setValue('');
						Ext.getCmp('FT_jj_START_TIME').setValue('');
						Ext.getCmp('FT_wg_START_TIME').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_bt_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
							
					
					};
					
				}else if(obj.getId()=='FT_bj_START_TIME'&&azjhflag==0){
					//报检
					if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
					{
						Ext.Msg.alert("请输入完工时间！");
						return;
					}
					if(newDate!=''){
						
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_yswc_START_TIME').setValue('');
						Ext.getCmp('FT_jj_START_TIME').setValue('');
						Ext.getCmp('FT_wg_START_TIME').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_bj_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
					
					};
					
				}else if(obj.getId()=='FT_yswc_START_TIME'&&azjhflag==0){
					//验收
//					if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入完工时间！");
//						return;
//					}
					if(newDate!=''){
						
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_jj_START_TIME').setValue('');
						Ext.getCmp('FT_wg_START_TIME').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_yswc_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
					 
					};
					
				}else if(obj.getId()=='FT_jj_START_TIME'&&azjhflag==0){
					//技检
//					if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入完工时间！");
//						return;
//					}
					if(newDate!=''){
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_wg_START_TIME').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_jj_START_TIME');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
					};
					
				}else if(obj.getId()=='FT_wg_START_TIME'&&azjhflag==0){
					//完工
//					if(Ext.getCmp("FT_AZ_START_TIME").getValue()==null||Ext.getCmp("FT_AZ_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入进场时间！");
//						return;
//					}
					//进场
					if(newDate!=''){	
						var node =Ext.getCmp('anjh_node').getValue();
						console.log('anjh_node',node);
						if(node=='FT_AZ_START_TIME'){
							var st=Ext.getCmp('FT_AZ_START_TIME').getValue();
							//var endd=Ext.getCmp("FT_wg_START_TIME").getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C1";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult18,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						 //样架   
						}else if(node=='FT_TS_START_TIME'){

							var st=Ext.getCmp('FT_TS_START_TIME').getValue();
							//var endd=Ext.getCmp("FT_wg_START_TIME").getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C2";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult10,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						   
							
						//玻璃	
						}else if(node=='FT_CJ_START_TIME'){
							var st=Ext.getCmp('FT_CJ_START_TIME').getValue();
							//var endd=Ext.getCmp("FT_wg_START_TIME").getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C3";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult11,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	

						//扶手	
						}else if(node=='FT_ZJ_START_TIME'){
							var st=Ext.getCmp('FT_ZJ_START_TIME').getValue();
							//var endd=Ext.getCmp("FT_wg_START_TIME").getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C4";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult12,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						    
							
						}else if(node=='FT_bjaz_START_TIME'){
							var st=Ext.getCmp('FT_ZJ_START_TIME').getValue();
							//var endd=Ext.getCmp("FT_wg_START_TIME").getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C5";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult13,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						    
							
							
						}else if(node=='FT_dldy_START_TIME'){
							var st=Ext.getCmp('FT_dldy_START_TIME').getValue();
							//var endd=Ext.getCmp("FT_wg_START_TIME").getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C6";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult14,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						    
							
						}else if(node=='FT_bt_START_TIME'){
							
							
							var st=Ext.getCmp('FT_bt_START_TIME').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C7";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult15,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						    
							
							
						}else if(node=='FT_bj_START_TIME'){
							
							var st=Ext.getCmp('FT_bj_START_TIME').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C8";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult16,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						    
							
						}else if(node=='FT_yswc_START_TIME'){
							
							var st=Ext.getCmp('FT_yswc_START_TIME').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C9";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult17,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						   
						}else if(node=='FT_jj_START_TIME'){
							azjhflag=1;
							var newdate =Ext.getCmp('FT_wg_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME').setValue(newDate_st);
						    
							//总工期
							var startDay=Ext.getCmp('FT_AZ_START_TIME').getValue();
							Ext.getCmp('FT_ZGQ_START_TIME').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME').getValue();
							var startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME').setValue(newDate_st);
							
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							
							 azjhflag=0;
						
						}
						console.log('day',day,node);
						function getResult17(res,obj){
						    res =res.item[0];
						    azjhflag=1;
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
							
							var startEnd;	
							var startDay=Ext.getCmp("FT_AZ_START_TIME").getValue();
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							 azjhflag=0;
						  }
						
						
						
						function getResult16(res,obj){
						    res =res.item[0];
						    azjhflag=1;
							//验收
							var newdate =Ext.getCmp('FT_bj_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yswc_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
								
							var startDay=Ext.getCmp("FT_AZ_START_TIME").getValue();
							var startEnd;
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							 azjhflag=0;
						  }
						
						
						function getResult15(res,obj){
						    res =res.item[0];
						    azjhflag=1;
							//报检
							var newdate =Ext.getCmp('FT_bt_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Examine_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bj_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_bj_END_TIME').setValue(newDate_st);
							//验收
							var newdate =Ext.getCmp('FT_bj_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yswc_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
								
							var startDay=Ext.getCmp("FT_AZ_START_TIME").getValue();
							var startEnd;
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							 azjhflag=0;
						  }
						
						
						function getResult14(res,obj){
						    res =res.item[0];
						    azjhflag=1;
							//报调
							var newdate =Ext.getCmp('FT_dldy_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Adjustable_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bt_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_bt_END_TIME').setValue(newDate_st);
							//报检
							var newdate =Ext.getCmp('FT_bt_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Examine_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bj_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_bj_END_TIME').setValue(newDate_st);
							//验收
							var newdate =Ext.getCmp('FT_bj_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yswc_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
								
							var startDay=Ext.getCmp("FT_AZ_START_TIME").getValue();
							var startEnd;
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};

							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							 azjhflag=0;
						  }
						
						function getResult13(res,obj){
						    res =res.item[0];
						    azjhflag=1;
							//动力电源
							var newdate =Ext.getCmp('FT_bjaz_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_dldy_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_dldy_END_TIME').setValue(newDate_st);
							//报调
							var newdate =Ext.getCmp('FT_dldy_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Adjustable_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bt_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_bt_END_TIME').setValue(newDate_st);
							//报检
							var newdate =Ext.getCmp('FT_bt_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Examine_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bj_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_bj_END_TIME').setValue(newDate_st);
							//验收
							var newdate =Ext.getCmp('FT_bj_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yswc_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
								
							var startDay=Ext.getCmp("FT_AZ_START_TIME").getValue();
							var startEnd;
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							 azjhflag=0;
						  }
				
					    function getResult18(res,obj){
					    console.log("0629");
					    res =res.item[0];
					    azjhflag=1;
					    //样架
						var newDate=Ext.getCmp('FT_AZ_START_TIME').getValue();
						var date_temp = new Date(newDate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Girder_Time));
						var newDate_str = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_TS_START_TIME').setValue(newDate_str);
						//Ext.getCmp('FT_TS_END_TIME').setValue(newDate_str);
						
						//玻璃
						var newdate=Ext.getCmp('FT_TS_START_TIME').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Glass_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_CJ_START_TIME').setValue(newDate_st);
						//Ext.getCmp('FT_CJ_END_TIME').setValue(newDate_st);
						
						//扶手
						var newdate=Ext.getCmp('FT_CJ_START_TIME').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Handrail_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_ZJ_START_TIME').setValue(newDate_st);
						
						//步级
						var newdate =Ext.getCmp('FT_ZJ_START_TIME').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Stairs_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_bjaz_START_TIME').setValue(newDate_st);
						//Ext.getCmp('FT_bjaz_END_TIME').setValue(newDate_st);
						//动力电源
						var newdate =Ext.getCmp('FT_bjaz_START_TIME').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_dldy_START_TIME').setValue(newDate_st);
						//Ext.getCmp('FT_dldy_END_TIME').setValue(newDate_st);
						//报调
						var newdate =Ext.getCmp('FT_dldy_START_TIME').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Adjustable_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_bt_START_TIME').setValue(newDate_st);
						//Ext.getCmp('FT_bt_END_TIME').setValue(newDate_st);
						//报检
						var newdate =Ext.getCmp('FT_bt_START_TIME').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Examine_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_bj_START_TIME').setValue(newDate_st);
						//Ext.getCmp('FT_bj_END_TIME').setValue(newDate_st);
						//验收
						var newdate =Ext.getCmp('FT_bj_START_TIME').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_yswc_START_TIME').setValue(newDate_st);
						//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
						//技检
						var newdate =Ext.getCmp('FT_yswc_START_TIME').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_jj_START_TIME').setValue(newDate_st);
				

						
						//移交客户
						var newdate =Ext.getCmp('FT_wg_START_TIME').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+30);
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_yjkh_START_TIME').setValue(newDate_st);
				
							
						var startDay=Ext.getCmp("FT_AZ_START_TIME").getValue();
						var startEnd;
						//总工期
						Ext.getCmp('FT_ZGQ_START_TIME').setValue(startDay);
						var newdate = Ext.getCmp('FT_yjkh_START_TIME').getValue();
						 startEnd =newdate;
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_ZGQ_END_TIME').setValue(newDate_st);
						
						//提交按钮
							//解除限制
						if(plnum==1){
							var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
							H_TIME.setDisabled(false);
							
							var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
							nview2.initDataEnd();
							
							if(startDay==''||startEnd==''){
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							
							
						}else if(plnum==0){
							var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
							H_TIME.setDisabled(false);	
							
							var nview = Ext.getCmp('installplan_AZJHXXHomePage');
							nview.initDataEnd();
							
							if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
						};	
						 azjhflag=0;
						 console.log('Zday',Zday,'startEnd',startEnd);
					  }
					    
					    function getResult10(res,obj){
						    //alert("ss"+JSON.stringify(res));	
						    res =res.item[0];
						    azjhflag=1;
							//玻璃
							var newdate=Ext.getCmp('FT_TS_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Glass_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_CJ_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_CJ_END_TIME').setValue(newDate_st);
							
							//扶手
							var newdate=Ext.getCmp('FT_CJ_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Handrail_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZJ_START_TIME').setValue(newDate_st);
							
							//步级
							var newdate =Ext.getCmp('FT_ZJ_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Stairs_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bjaz_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_bjaz_END_TIME').setValue(newDate_st);
							//动力电源
							var newdate =Ext.getCmp('FT_bjaz_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_dldy_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_dldy_END_TIME').setValue(newDate_st);
							//报调
							var newdate =Ext.getCmp('FT_dldy_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Adjustable_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bt_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_bt_END_TIME').setValue(newDate_st);
							//报检
							var newdate =Ext.getCmp('FT_bt_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Examine_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bj_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_bj_END_TIME').setValue(newDate_st);
							//验收
							var newdate =Ext.getCmp('FT_bj_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yswc_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
								
							var startDay=Ext.getCmp("FT_AZ_START_TIME").getValue();
							var startEnd;
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							azjhflag=0;
						  }
					    
					    function getResult11(res,obj){
						    res =res.item[0];
						    azjhflag=1;
							//扶手
							var newdate=Ext.getCmp('FT_CJ_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Handrail_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZJ_START_TIME').setValue(newDate_st);
							
							//步级
							var newdate =Ext.getCmp('FT_ZJ_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Stairs_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bjaz_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_bjaz_END_TIME').setValue(newDate_st);
							//动力电源
							var newdate =Ext.getCmp('FT_bjaz_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_dldy_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_dldy_END_TIME').setValue(newDate_st);
							//报调
							var newdate =Ext.getCmp('FT_dldy_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Adjustable_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bt_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_bt_END_TIME').setValue(newDate_st);
							//报检
							var newdate =Ext.getCmp('FT_bt_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Examine_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bj_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_bj_END_TIME').setValue(newDate_st);
							//验收
							var newdate =Ext.getCmp('FT_bj_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yswc_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
								
							var startDay=Ext.getCmp("FT_AZ_START_TIME").getValue();
							var startEnd;
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							 azjhflag=0;
						  }
					    
					    function getResult12(res,obj){
						    res =res.item[0];
						    azjhflag=1;
							
							//步级
							var newdate =Ext.getCmp('FT_ZJ_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Stairs_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bjaz_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_bjaz_END_TIME').setValue(newDate_st);
							//动力电源
							var newdate =Ext.getCmp('FT_bjaz_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_dldy_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_dldy_END_TIME').setValue(newDate_st);
							//报调
							var newdate =Ext.getCmp('FT_dldy_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Adjustable_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bt_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_bt_END_TIME').setValue(newDate_st);
							//报检
							var newdate =Ext.getCmp('FT_bt_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Examine_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bj_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_bj_END_TIME').setValue(newDate_st);
							//验收
							var newdate =Ext.getCmp('FT_bj_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yswc_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
								
							var startDay=Ext.getCmp("FT_AZ_START_TIME").getValue();
							var startEnd;
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							 azjhflag=0;
						  }
					    
					    
					};
					
				}else if(obj.getId()=='FT_yjkh_START_TIME'&&azjhflag==0){
					//移交客户
					if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
					{
						Ext.Msg.alert("请输入完工时间！");
						return;
					}
					if(newDate!=''){
						var startDay=Ext.getCmp("FT_AZ_START_TIME").getValue();
						//总工期
						Ext.getCmp('FT_ZGQ_START_TIME').setValue(startDay);
						var newdate = Ext.getCmp('FT_yjkh_START_TIME').getValue();
						startEnd =newdate;
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_ZGQ_END_TIME').setValue(newDate_st);
						
						//提交按钮
							//解除限制
						if(plnum==1){
							var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
							H_TIME.setDisabled(false);
							
							var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
							nview2.initDataEnd();
							
							if(startDay==''||startEnd==''){
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							
							
						}else if(plnum==0){
							var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
							H_TIME.setDisabled(false);	
							
							var nview = Ext.getCmp('installplan_AZJHXXHomePage');
							nview.initDataEnd();
							
							if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
						};	
					};
					
				}
	
			}else if('ITM'==lx){
				if(obj.getId()=='ITM_WG_START_TIME'&&azjhflag==0){
					//移交客户
					if(Ext.getCmp("ITM_JC_START_TIME").getValue()==null||Ext.getCmp("ITM_JC_START_TIME").getValue()=="")
					{
						Ext.Msg.alert("请输入进场时间！");
						return;
					}
					if(newDate!=''){
					
						//移交客户
						var newdate =Ext.getCmp('ITM_WG_START_TIME').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+30);
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('ITM_YJKH_START_TIME').setValue(newDate_st);
						
						
						var startDay=Ext.getCmp("ITM_JC_START_TIME").getValue();
						//总工期
						Ext.getCmp('ITM_ZGQ_START_TIME').setValue(startDay);
						var newdate = Ext.getCmp('ITM_YJKH_START_TIME').getValue();
						startEnd =newdate;
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('ITM_ZGQ_END_TIME').setValue(newDate_st);
						
						//提交按钮
							//解除限制
						if(plnum==1){
							var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
							H_TIME.setDisabled(false);
							
							var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
							nview2.initDataEnd();
							
							if(startDay==''||startEnd==''){
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							
							
						}else if(plnum==0){
							var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
							H_TIME.setDisabled(false);	
							
							var nview = Ext.getCmp('installplan_AZJHXXHomePage');
							nview.initDataEnd();
							
							if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
						};	
					};
					
				}else if(obj.getId()=='ITM_YJKH_TIME'&&azjhflag==0){
					//移交客户
					if(Ext.getCmp("ITM_WG_START_TIME").getValue()==null||Ext.getCmp("ITM_WG_START_TIME").getValue()=="")
					{
						Ext.Msg.alert("请输入完工时间！");
						return;
					}
					if(newDate!=''){
						var startDay=Ext.getCmp("ITM_JC_START_TIME").getValue();
						//总工期
						Ext.getCmp('ITM_ZGQ_END_TIME').setValue(startDay);
						var newdate = Ext.getCmp('ITM_YJKH_START_TIME').getValue();
						startEnd =newdate;
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('ITM_ZGQ_END_TIME').setValue(newDate_st);
						
						//提交按钮
							//解除限制
						if(plnum==1){
							var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
							H_TIME.setDisabled(false);
							
							var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
							nview2.initDataEnd();
							
							if(startDay==''||startEnd==''){
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							
							
						}else if(plnum==0){
							var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
							H_TIME.setDisabled(false);	
							
							var nview = Ext.getCmp('installplan_AZJHXXHomePage');
							nview.initDataEnd();
							
							if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
						};	
					};
					
				}
			};
			
			//时间控件修改  解除封锁
			if(plnum==0){
				var nview = Ext.getCmp('installplan_AZJHXXHomePage');
				nview.initDataEnd();
			}else if(plnum==1){
				var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
				nview2.initDataEnd();
			};
			
		////flag底部	
		}else{
			
		};
	},
	
	//安装计划详细   录入数据   扶梯  起始时间
	FT_AZ_START_TIME:function(){
		obj=this;
		//判断是批量还是单个
		var  plnum=Ext.getCmp('plnum').getValue();
		
		var flag=Ext.getCmp('FLAG').getValue();
		//alert('进入扶梯的时间   '+flag);
		flag=1;
		if(flag==1){
			//alert('进入扶梯的时间2');
			//添加限制  
 			if(plnum==0){
				var nview = Ext.getCmp('installplan_AZJHXXHomePage');
				nview.initData();
			}else if(plnum==1){
				var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
				nview2.initData();
			};
			
			var startDay='';
			var startEnd='';
			//进场
			var PJDS_start=Ext.getCmp('FT_AZ_START_TIME').getValue();
			if(PJDS_start==''){
				/*Ext.getCmp('FT_AZ_START_TIME').setValue('');
    			Ext.getCmp('FT_AZ_END_TIME').setValue('');
    			
    			Ext.getCmp('FT_TS_START_TIME').setValue('');
    			Ext.getCmp('FT_TS_END_TIME').setValue('');
    			
    			Ext.getCmp('FT_CJ_START_TIME').setValue('');
    			Ext.getCmp('FT_CJ_END_TIME').setValue('');
    			
    			Ext.getCmp('FT_ZJ_START_TIME').setValue('');
    			Ext.getCmp('FT_ZJ_END_TIME').setValue('');
    			
    			Ext.getCmp('FT_ZGQ_START_TIME').setValue('');
    			Ext.getCmp('FT_ZGQ_END_TIME').setValue('');*/
    			
			}else if(PJDS_start!=''&&azjhflag==0){
//				
	
				//清空日期
				azjhflag=1;
				Ext.getCmp('FT_TS_START_TIME').setValue('');
				Ext.getCmp('FT_CJ_START_TIME').setValue('');
				Ext.getCmp('FT_ZJ_START_TIME').setValue('');
				Ext.getCmp('FT_bjaz_START_TIME').setValue('');
				Ext.getCmp('FT_dldy_START_TIME').setValue('');
				Ext.getCmp('FT_bt_START_TIME').setValue('');
				Ext.getCmp('FT_bj_START_TIME').setValue('');
				Ext.getCmp('FT_yswc_START_TIME').setValue('');
				Ext.getCmp('FT_jj_START_TIME').setValue('');
				Ext.getCmp('FT_wg_START_TIME').setValue('');
				Ext.getCmp('FT_yjkh_START_TIME').setValue('');
				Ext.getCmp('FT_ZGQ_START_TIME').setValue(PJDS_start);
				Ext.getCmp('FT_ZGQ_END_TIME').setValue('');
				Ext.getCmp('anjh_node').setValue('FT_AZ_START_TIME');
				azjhflag=0;
				
				if(azjhflag==0&&(Ext.getCmp("FT_wg_START_TIME").getValue()==""||Ext.getCmp("FT_wg_START_TIME").getValue()==null))
				{
					Ext.Msg.alert("请输入完工时间！");
					return;
				}
				
				startDay=PJDS_start;
				var endd=Ext.getCmp("FT_wg_START_TIME").getValue();
				var day=DateDiff(startDay.trim(),endd);
				//zhj
				var params={};
			    params.gongfa="P3";
			    params.gongxu="C1";
			    params.day=day;
			    
			    //this.connectServerMainTain(getResult,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
			    function getResult(res,obj){
			    //alert("ss"+JSON.stringify(res));	
			    res =res.item[0];
			    azjhflag=1;
				//样架
				var newDate=Ext.getCmp('FT_AZ_START_TIME').getValue();
				var date_temp = new Date(newDate.replace(/-/g,"/"));
				date_temp.setDate(date_temp.getDate()+parseInt(res.Guide_Time));
				var newDate_str = Ext.Date.format(date_temp,'Y-m-d');
				Ext.getCmp('FT_TS_START_TIME').setValue(newDate_str);
				//Ext.getCmp('FT_TS_END_TIME').setValue(newDate_str);
				
				//玻璃
				var newdate=Ext.getCmp('FT_TS_START_TIME').getValue();
				var date_temp = new Date(newdate.replace(/-/g,"/"));
				date_temp.setDate(date_temp.getDate()+parseInt(res.Glass_Time));
				var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
				Ext.getCmp('FT_CJ_START_TIME').setValue(newDate_st);
				//Ext.getCmp('FT_CJ_END_TIME').setValue(newDate_st);
				
				//扶手
				var newdate=Ext.getCmp('FT_CJ_START_TIME').getValue();
				var date_temp = new Date(newdate.replace(/-/g,"/"));
				date_temp.setDate(date_temp.getDate()+parseInt(res.Handrail_Time));
				var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
				Ext.getCmp('FT_ZJ_START_TIME').setValue(newDate_st);
				
				//步级
				var newdate =Ext.getCmp('FT_ZJ_START_TIME').getValue();
				var date_temp = new Date(newdate.replace(/-/g,"/"));
				date_temp.setDate(date_temp.getDate()+parseInt(res.Stairs_Time));
				var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
				Ext.getCmp('FT_bjaz_START_TIME').setValue(newDate_st);
				//Ext.getCmp('FT_bjaz_END_TIME').setValue(newDate_st);
				//动力电源
				var newdate =Ext.getCmp('FT_bjaz_START_TIME').getValue();
				var date_temp = new Date(newdate.replace(/-/g,"/"));
				date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
				var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
				Ext.getCmp('FT_dldy_START_TIME').setValue(newDate_st);
				//Ext.getCmp('FT_dldy_END_TIME').setValue(newDate_st);
				//报调
				var newdate =Ext.getCmp('FT_dldy_START_TIME').getValue();
				var date_temp = new Date(newdate.replace(/-/g,"/"));
				date_temp.setDate(date_temp.getDate()+parseInt(res.Adjustable_Time));
				var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
				Ext.getCmp('FT_bt_START_TIME').setValue(newDate_st);
				//Ext.getCmp('FT_bt_END_TIME').setValue(newDate_st);
				//报检
				var newdate =Ext.getCmp('FT_bt_START_TIME').getValue();
				var date_temp = new Date(newdate.replace(/-/g,"/"));
				date_temp.setDate(date_temp.getDate()+parseInt(res.Examine_Time));
				var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
				Ext.getCmp('FT_bj_START_TIME').setValue(newDate_st);
				//Ext.getCmp('FT_bj_END_TIME').setValue(newDate_st);
				//验收
				var newdate =Ext.getCmp('FT_bj_START_TIME').getValue();
				var date_temp = new Date(newdate.replace(/-/g,"/"));
				date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
				var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
				Ext.getCmp('FT_yswc_START_TIME').setValue(newDate_st);
				//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
				//技检
				var newdate =Ext.getCmp('FT_yswc_START_TIME').getValue();
				var date_temp = new Date(newdate.replace(/-/g,"/"));
				date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
				var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
				Ext.getCmp('FT_jj_START_TIME').setValue(newDate_st);
				//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//				//完工
//				var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//				var date_temp = new Date(newdate.replace(/-/g,"/"));
//				date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//				var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//				Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//				//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
				//移交客户
				var newdate =Ext.getCmp('FT_wg_START_TIME').getValue();
				var date_temp = new Date(newdate.replace(/-/g,"/"));
				date_temp.setDate(date_temp.getDate()+30);
				var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
				Ext.getCmp('FT_yjkh_START_TIME').setValue(newDate_st);
				//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
					
				
				//总工期
				Ext.getCmp('FT_ZGQ_START_TIME').setValue(startDay);
				var newdate = Ext.getCmp('FT_yjkh_START_TIME').getValue();
				startEnd =newdate;
				var date_temp = new Date(newdate.replace(/-/g,"/"));
				var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
				Ext.getCmp('FT_ZGQ_END_TIME').setValue(newDate_st);
				
				//提交按钮
					//解除限制
				if(plnum==1){
					var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
					H_TIME.setDisabled(false);
					
					var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
					nview2.initDataEnd();
					
					if(startDay==''||startEnd==''){
						var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
						titleWJC.innerHTML='总工期';
					}else{
						//计划总天数
						var Zday=DateDiff(startDay.trim(),startEnd.trim());
						var titleWJC=document.getElementById("install_azihxx_zgq_FT_T");
						titleWJC.innerHTML='总工期('+Zday+'天)';
					};
					
					
				}else if(plnum==0){
					var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
					H_TIME.setDisabled(false);	
					
					var nview = Ext.getCmp('installplan_AZJHXXHomePage');
					nview.initDataEnd();
					
					if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
						var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
						titleWJC.innerHTML='总工期';
					}else{
						//计划总天数
						var Zday=DateDiff(startDay.trim(),startEnd.trim());
						var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP");
						titleWJC.innerHTML='总工期('+Zday+'天)';
					};
				};	
				 azjhflag=0;
			  }
			};
			
			
		};
	},
	
	//安装计划详细-首页  提交按钮
	instalPlan_HomePage_TJ_Button:function(){
		//未进场和在制的判断
		var installTcode=Ext.getCmp('installTcode').getValue();
		//alert('进入提交');
		this_obj=this;
		//判断提交的梯子类型
		var lx=Ext.getCmp('HP_CM_ELEVATOR_TYPE_NAME').getValue();
		//alert(lx);
		if('直梯'==lx){
			//判断填写时间（前两个必填）
			//棚架搭设
			var ZT_PJDS_START_TIME=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
			var ZT_CJ_START_TIME=Ext.getCmp('ZT_CJ_START_TIME').getValue();
			
			if(ZT_PJDS_START_TIME==''||ZT_CJ_START_TIME==''){
				WL.Toast.show("请填写进场时间和完工时间");
				return ;
				}
//			}else if(ZT_PJDS_END_TIME!=''&&ZT_PJDS_START_TIME==''){
//				WL.Toast.show("请填写进场时间");
//				return ;
//			}else if(ZT_PJDS_START_TIME==''&&ZT_PJDS_END_TIME==''){
//				WL.Toast.show("请填写进场时间");
//				return ;
//			};
			//电梯发货(特殊)
//            var ZT_DTFH_START_TIME=Ext.getCmp('ZT_DTFH_START_TIME').getValue();
//			var ZT_DTFH_END_TIME=Ext.getCmp('ZT_DTFH_END_TIME').getValue();
//			if(ZT_DTFH_START_TIME!=''&&ZT_DTFH_END_TIME==''){
//				WL.Toast.show("请填写完电梯发货时间");
//				return ;
//			}else if(ZT_DTFH_END_TIME!=''&&ZT_DTFH_START_TIME==''){
//				WL.Toast.show("请填写完电梯发货时间");
//				return ;
//			}else if(ZT_DTFH_START_TIME==''&&ZT_DTFH_END_TIME==''){
//				WL.Toast.show("请填写完电梯发货时间");
//				return ;
//			};
		
			
			//从JSONStore中获取数据
			//合同号    工号   批次
			var HT=Ext.getCmp('HP_ENGCONTRACT_NUMBER').getValue();
			var GH=Ext.getCmp('HP_ELEVATOR_NO').getValue();
			var PC=Ext.getCmp('HP_SEQ_NUM').getValue();
			var tiaojian=HT+'/'+GH+'/'+PC;
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	var query={tcode:installTcode,tid:tiaojian};
	    	var installaddDGTJ=JSON.stringify(query);
	    	//单个添加 用的JSONStore条件
	    	Ext.getCmp('installaddDGTJ').setValue(installaddDGTJ);
	    	//alert(234);
	    	
	    	var options={
				exacte:false,//默认
			};
	    	MaintainList.find(query,options).then(function(arrayResults){
	    		var num=arrayResults.length;
	    		var data=arrayResults[num-1].json.stext;
	    		//条件一
	    		var show={};
	    		show.TASK_ID=data.TASK_ID;
	    		show.ORG_ID=data.ORG_ID;
	    		show.SEQ_NUM=data.SEQ_NUM;
	    		show.ELEVATOR_ID=data.ELEVATOR_ID;
	    		//条件二
	    		//进场
	    		var gf=Ext.getCmp("HP_INST_METHOD").getValue();
	    		var GONGXU=[];
	    		var Q_TIME=Ext.getCmp('ZT_PJDS_START_TIME').getValue();
				var H_TIME="";
				
				var gon={};
				gon.WORK_STEP=10;
				gon.ELEVATOR_CLASS_CODE='ZT';
				gon.WORK_STEP_CODE='ZT_JCFX';
				gon.PLAN_START_DATE=Q_TIME;
				gon.PLAN_END_DATE=H_TIME;
				GONGXU[0]=gon;
				
		
			
				var countTime=1;
				
				//放样
				var Q_TIME=Ext.getCmp('ZT_DTDZ_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=''){
					
					var gon={};
					gon.WORK_STEP=20;
					gon.ELEVATOR_CLASS_CODE='ZT';
					gon.WORK_STEP_CODE='ZT_MTMT';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//安装撑架和导轨 an2定主机
				var Q_TIME=Ext.getCmp('ZT_JCFX_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=''){
					
					var gon={};
					gon.WORK_STEP=30;
					gon.ELEVATOR_CLASS_CODE='ZT';
					if(gf=="传统搭棚")
					gon.WORK_STEP_CODE='ZT_DKSB';
					else
					gon.WORK_STEP_CODE='ZT_JFAZJX';	
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//定主机 an2轿架
				var Q_TIME=Ext.getCmp('ZT_ZJDG_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=''){
					
					var gon={};
					gon.WORK_STEP=40;
					gon.ELEVATOR_CLASS_CODE='ZT';
					if(gf=="传统搭棚")
					gon.WORK_STEP_CODE='ZT_JFAZJX';
					else
					gon.WORK_STEP_CODE='ZT_JJJXPJ';	
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				}
				
				//安装轿架及轿厢  an2撑架
				var Q_TIME=Ext.getCmp('ZT_MTMT_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=''){
					
					var gon={};
					gon.WORK_STEP=50;
					gon.ELEVATOR_CLASS_CODE='ZT';
					if(gf=="传统搭棚")
					gon.WORK_STEP_CODE='ZT_JJJXPJ';
					else
					gon.WORK_STEP_CODE='ZT_DKSB';	
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//电气接线
				var Q_TIME=Ext.getCmp('ZT_JFAZJX_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=''){
					
					var gon={};
					gon.WORK_STEP=60;
					gon.ELEVATOR_CLASS_CODE='ZT';
					gon.WORK_STEP_CODE='ZT_DTFH';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;	
					countTime++;
				};
				
				//报调日期
				var Q_TIME=Ext.getCmp('ZT_JJJXPJ_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=''){
					
					var gon={};
					gon.WORK_STEP=70;
					gon.ELEVATOR_CLASS_CODE='ZT';
					gon.WORK_STEP_CODE='ZT_DTTS';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//报检日期
				var Q_TIME=Ext.getCmp('ZT_CP_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=''){
					
					var gon={};
					gon.WORK_STEP=80;
					gon.ELEVATOR_CLASS_CODE='ZT';
					gon.WORK_STEP_CODE='ZT_PJDS';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//验收完成日期
				var Q_TIME=Ext.getCmp('ZT_DKSB_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=''){
					
					var gon={};
					gon.WORK_STEP=90;
					gon.ELEVATOR_CLASS_CODE='ZT';
					gon.WORK_STEP_CODE='ZT_CJ';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
					
				//技检日期
				var Q_TIME=Ext.getCmp('ZT_DTTS_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=''){
					
					var gon={};
					gon.WORK_STEP=100;
					gon.ELEVATOR_CLASS_CODE='ZT';
					gon.WORK_STEP_CODE='ZT_ZFJ';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//完工日期
				var Q_TIME=Ext.getCmp('ZT_CJ_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=''){
					
					var gon={};
					gon.WORK_STEP=110;
					gon.ELEVATOR_CLASS_CODE='ZT';
					gon.WORK_STEP_CODE='ZT_JHWG';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//移交客户日期
				var Q_TIME=Ext.getCmp('ZT_ZFJ_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=''){
					
					var gon={};
					gon.WORK_STEP=120;
					gon.ELEVATOR_CLASS_CODE='ZT';
					gon.WORK_STEP_CODE='ZT_ZJDG';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
	    		
				
				var trim={};
				trim.SHOW=show;
				trim.GONGXU=GONGXU;
				trim.init_person_id=init_person_id;
				var INSTALLPLTJ=[];
				INSTALLPLTJ[0]=trim;
				
				INSTALLPLTJ=JSON.stringify(INSTALLPLTJ);
				//批量添加 用的数组
				Ext.getCmp('INSTALLPLTJ').setValue(INSTALLPLTJ);
				
				//console.log('INSTALLPLTJ检查： '+JSON.stringify(INSTALLPLTJ[0]));
				//修改本地数据 2014-5-26
				//this_obj.install_modificationANDshow(query,GONGXU,trim,this_obj);
				//
				//console.log(JSON.stringify(GONGXU));
				
				//修改为离线提交方法  2014-6-24  xcx
				
				var Maintain=collectionName;
		    	var MaintainList=WL.JSONStore.get(Maintain);
		    	var TrimLX={tid:'AZXM_DG_ZT',tcode:'UNCOMMIT_AZJH',};
		    	var options={
					exacte:false,//默认
				};
		    	MaintainList.find(TrimLX,options).then(function(array){
						var ext1={};
						ext1.url='installPlanAction.do?method=toUpdate';
						var msg={};
						msg.msg_title='安装计划';
						msg.msg_body=GH;//工号
						msg.msg_result='正在等待提交';//'正在等待提交';
						ext1.msg=msg;
						var stextData=arrayResults[0].json.stext;
			    		
						arrayResults[0].json.stext.DATE=GONGXU;
						if(parseInt(stextData.VERSION_NUM)>=1){
			    			stextData.VERSION_NUM= parseInt(stextData.VERSION_NUM)   +   parseInt(1);  
			    		}else{
			    			stextData.VERSION_NUM=1;
			    		};
						ext1.obj=arrayResults[0];
						ext1.cparam = HT;
						ext1.view_id='HelcPDA.controller.install.installplan.installplanCtrl';
						var TrimLX={tid:'AZXM_DG_ZT',tcode:'UNCOMMIT_AZJH',stext:trim,ext1:ext1,status:'1'};
						MaintainList.add(TrimLX).then(function(){
							WL.Toast.show("数据提交成功");
							
							this_obj.DangGeJR(this_obj,tiaojian);
							
						}).fail(function(errorObject){
				    		WL.Toast.show("数据提交失败");
						});
					
		    	}).fail(function(errorObject){
		    		WL.Toast.show("查询数据失败");
				});
				
				//this_obj.connectServerMainTain(this_obj.instalPlan_HomePage_TJ_Button_JG,this_obj,"installPlanAction.do?method=toUpdate",JSON.stringify(trim));
	    	}).fail(function(errorObject){
				console.log("查询数据失败");
			});
			
		}else if('扶梯'==lx){
			//从JSONStore中获取数据
			//合同号    工号   批次
			var HT=Ext.getCmp('HP_ENGCONTRACT_NUMBER').getValue();
			var GH=Ext.getCmp('HP_ELEVATOR_NO').getValue();
			var PC=Ext.getCmp('HP_SEQ_NUM').getValue();
			var tiaojian=HT+'/'+GH+'/'+PC;
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	var query={tcode:installTcode,tid:tiaojian};
	    	var installaddDGTJ=JSON.stringify(query);
	    	
	    	//单个添加 用的JSONStore条件
	    	Ext.getCmp('installaddDGTJ').setValue(installaddDGTJ);
	    	
			var options={
				exacte:false,//默认
			};
	    	MaintainList.find(query,options).then(function(arrayResults){
	    		var num=arrayResults.length;
	    		var data=arrayResults[num-1].json.stext;
	    		//条件一
	    		var show={};
	    		show.TASK_ID=data.TASK_ID;
	    		show.ORG_ID=data.ORG_ID;
	    		show.SEQ_NUM=data.SEQ_NUM;
	    		show.ELEVATOR_ID=data.ELEVATOR_ID;
	    		//条件二
	    		var GONGXU=[];
	    		//进场
	    		var Q_TIME=Ext.getCmp('FT_AZ_START_TIME').getValue();
				var H_TIME="";
				
				var gon={};
				gon.WORK_STEP=10;
				gon.ELEVATOR_CLASS_CODE='FT';
				gon.WORK_STEP_CODE='ZT_JCFX';
				gon.PLAN_START_DATE=Q_TIME;
				gon.PLAN_END_DATE=H_TIME;
				GONGXU[0]=gon;
				
				var countTime=1;
				//桁架样架定位
				var Q_TIME=Ext.getCmp('FT_TS_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=20;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='FT_AZ';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//玻璃侧板安装
				var Q_TIME=Ext.getCmp('FT_CJ_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=30;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='FT_CJ';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//扶手带组件安装
				var Q_TIME=Ext.getCmp('FT_ZJ_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=40;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='FT_TS';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//步级安装
				var Q_TIME=Ext.getCmp('FT_bjaz_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=50;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='FT_ZJ';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//动力电源
				var Q_TIME=Ext.getCmp('FT_dldy_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=60;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='ZT_CP';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				
				//报调日期
				var Q_TIME=Ext.getCmp('FT_bt_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=70;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='ZT_DTTS';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				
				//报检日期
				var Q_TIME=Ext.getCmp('FT_bj_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=80;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='ZT_PJDS';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//验收完成日期
				var Q_TIME=Ext.getCmp('FT_yswc_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=90;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='ZT_CJ';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//技检日期
				var Q_TIME=Ext.getCmp('FT_jj_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=100;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='ZT_ZFJ';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//完工日期
				var Q_TIME=Ext.getCmp('FT_wg_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=110;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='ZT_JHWG';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//移交客户日期
				var Q_TIME=Ext.getCmp('FT_yjkh_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=120;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='ZT_ZJDG';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				
				var trim={};
				trim.SHOW=show;
				trim.GONGXU=GONGXU;
				trim.init_person_id=init_person_id;
				
				var INSTALLPLTJ=[];
				INSTALLPLTJ[0]=trim;
				
				INSTALLPLTJ=JSON.stringify(INSTALLPLTJ);
				//批量添加 用的数组
				Ext.getCmp('INSTALLPLTJ').setValue(INSTALLPLTJ);
				
				//console.log(JSON.stringify(GONGXU));
			
				//修改本地数据 2014-5-26
				//this_obj.install_modificationANDshow(query,GONGXU,trim,this_obj);
				//
				
				//修改为离线提交方法  2014-6-24  xcx
				
				var Maintain=collectionName;
		    	var MaintainList=WL.JSONStore.get(Maintain);
		    	var TrimLX={tid:'AZXM_DG_FT',tcode:'UNCOMMIT_AZJH',};
		    	var options={
					exacte:false,//默认
				};
		    	MaintainList.find(TrimLX,options).then(function(array){
		    		
						var ext1={};
						ext1.url='installPlanAction.do?method=toUpdate';
						var msg={};
						msg.msg_title='安装计划';
						msg.msg_body=GH;//工号
						msg.msg_result='正在等待提交';//'正在等待提交';
						ext1.msg=msg;
						var stextData=arrayResults[0].json.stext;
						
						arrayResults[0].json.stext.DATE=GONGXU;
						if(parseInt(stextData.VERSION_NUM)>=1){
			    			stextData.VERSION_NUM= parseInt(stextData.VERSION_NUM)   +   parseInt(1);  
			    		}else{
			    			stextData.VERSION_NUM=1;
			    		};
						ext1.obj=arrayResults[0];
						ext1.view_id='HelcPDA.controller.install.installplan.installplanCtrl';
						ext1.cparam = HT;
						var TrimLX={tid:'AZXM_DG_FT',tcode:'UNCOMMIT_AZJH',stext:trim,ext1:ext1,status:'1'};
						MaintainList.add(TrimLX).then(function(){
							WL.Toast.show("数据提交成功");
							
							this_obj.DangGeJR(this_obj,tiaojian);
							
						}).fail(function(errorObject){
				    		WL.Toast.show("数据提交失败");
						});
					
		    	}).fail(function(errorObject){
		    		WL.Toast.show("查询数据失败");
				});
				
				
				//this_obj.connectServerMainTain(this_obj.instalPlan_HomePage_TJ_Button_JG,this_obj,"installPlanAction.do?method=toUpdate",JSON.stringify(trim));
	    	}).fail(function(errorObject){
				console.log("查询数据失败");
			});
		}if('ITM'==lx){
			//从JSONStore中获取数据
			//合同号    工号   批次
			var HT=Ext.getCmp('HP_ENGCONTRACT_NUMBER').getValue();
			var GH=Ext.getCmp('HP_ELEVATOR_NO').getValue();
			var PC=Ext.getCmp('HP_SEQ_NUM').getValue();
			var tiaojian=HT+'/'+GH+'/'+PC;
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	var query={tcode:installTcode,tid:tiaojian};
	    	var installaddDGTJ=JSON.stringify(query);
	    	
	    	//单个添加 用的JSONStore条件
	    	Ext.getCmp('installaddDGTJ').setValue(installaddDGTJ);
	    	
			var options={
				exacte:false,//默认
			};
	    	MaintainList.find(query,options).then(function(arrayResults){
	    		var num=arrayResults.length;
	    		var data=arrayResults[num-1].json.stext;
	    		//条件一
	    		var show={};
	    		show.TASK_ID=data.TASK_ID;
	    		show.ORG_ID=data.ORG_ID;
	    		show.SEQ_NUM=data.SEQ_NUM;
	    		show.ELEVATOR_ID=data.ELEVATOR_ID;
	    		//条件二
	    		var GONGXU=[];
	    		//进场
	    		var Q_TIME=Ext.getCmp('ITM_JC_START_TIME').getValue();
				var H_TIME="";
				
				var gon={};
				gon.WORK_STEP=10;
				gon.ELEVATOR_CLASS_CODE='ITM';
				gon.WORK_STEP_CODE='ZT_JCFX';
				gon.PLAN_START_DATE=Q_TIME;
				gon.PLAN_END_DATE=H_TIME;
				GONGXU[0]=gon;
				
				var countTime=1;
				
				//完工日期
				var Q_TIME=Ext.getCmp('ITM_WG_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=20;
					gon.ELEVATOR_CLASS_CODE='ITM';
					gon.WORK_STEP_CODE='ZT_JHWG';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//移交客户日期
				var Q_TIME=Ext.getCmp('ITM_YJKH_START_TIME').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=30;
					gon.ELEVATOR_CLASS_CODE='ITM';
					gon.WORK_STEP_CODE='ZT_ZJDG';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				
				var trim={};
				trim.SHOW=show;
				trim.GONGXU=GONGXU;
				trim.init_person_id=init_person_id;
				
				var INSTALLPLTJ=[];
				INSTALLPLTJ[0]=trim;
				
				INSTALLPLTJ=JSON.stringify(INSTALLPLTJ);
				//批量添加 用的数组
				Ext.getCmp('INSTALLPLTJ').setValue(INSTALLPLTJ);				
				
				var Maintain=collectionName;
		    	var MaintainList=WL.JSONStore.get(Maintain);
		    	var TrimLX={tid:'AZXM_DG_FT',tcode:'UNCOMMIT_AZJH',};
		    	var options={
					exacte:false,//默认
				};
		    	MaintainList.find(TrimLX,options).then(function(array){
		    		
						var ext1={};
						ext1.url='installPlanAction.do?method=toUpdate';
						var msg={};
						msg.msg_title='安装计划';
						msg.msg_body=GH;//工号
						msg.msg_result='正在等待提交';//'正在等待提交';
						ext1.msg=msg;
						var stextData=arrayResults[0].json.stext;
						
						arrayResults[0].json.stext.DATE=GONGXU;
						if(parseInt(stextData.VERSION_NUM)>=1){
			    			stextData.VERSION_NUM= parseInt(stextData.VERSION_NUM)   +   parseInt(1);  
			    		}else{
			    			stextData.VERSION_NUM=1;
			    		};
						ext1.obj=arrayResults[0];
						ext1.view_id='HelcPDA.controller.install.installplan.installplanCtrl';
						ext1.cparam = HT;
						var TrimLX={tid:'AZXM_DG_FT',tcode:'UNCOMMIT_AZJH',stext:trim,ext1:ext1,status:'1'};
						MaintainList.add(TrimLX).then(function(){
							WL.Toast.show("数据提交成功");
							
							this_obj.DangGeJR(this_obj,tiaojian);
							
						}).fail(function(errorObject){
				    		WL.Toast.show("数据提交失败");
						});
					
		    	}).fail(function(errorObject){
		    		WL.Toast.show("查询数据失败");
				});
				
				
				//this_obj.connectServerMainTain(this_obj.instalPlan_HomePage_TJ_Button_JG,this_obj,"installPlanAction.do?method=toUpdate",JSON.stringify(trim));
	    	}).fail(function(errorObject){
				console.log("查询数据失败");
			});
		}
	},
	
	//单个提交  进入待机界面  2014-6-24
	DangGeJR:function(obj,tiaojian){
		//alert('直梯提交更新4');
		//未进场和在制的判断
		var installTcode=Ext.getCmp('installTcode').getValue();
		
		//用于批量判断是否直梯和扶梯
		var PLtzType=Ext.getCmp('HP_CM_ELEVATOR_TYPE_NAME').getValue();
		
		if(PLtzType=='直梯'){
			install_QingKongShiJianKongJian_ZT();
		}else if(PLtzType=='扶梯'){
			install_QingKongShiJianKongJian_FT();
		};
		obj.showBackView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
		
		//单个添加 用的JSONStore条件
    	var installaddDGTJ=Ext.getCmp('installaddDGTJ').getValue();
		
		//用于提交按钮的 合同号
		var PLselectHTH=Ext.getCmp('PLselectHTH').getValue();
		
		//批量添加 用的数组
		var INSTALLPLTJ=Ext.getCmp('INSTALLPLTJ').getValue();
		
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
		var options={
			exacte:false,//默认
		};
		
		/*alert('installTcode   '+installTcode);
		alert('PLtzType   '+PLtzType);
		alert('installaddDGTJ   '+JSON.stringify(installaddDGTJ));
		alert('PLselectHTH   '+PLselectHTH);
		console.log('INSTALLPLTJ   '+INSTALLPLTJ);
		alert('INSTALLPLTJ   '+INSTALLPLTJ[0].GONGXU[0].WORK_STEP);*/
		
		//转化
		INSTALLPLTJ=eval("("+ INSTALLPLTJ +")");
		installaddDGTJ=eval("("+ installaddDGTJ +")");
		
    	MaintainList.find(installaddDGTJ,options).then(function(arrayResults){
    		//alert('进入提交列表');
    		
    		var data=arrayResults[0].json;
    		var stextData=data.stext;
    		//data.DATE=GONGXU;
    		var pro=data.ext1;
    		if( parseInt(stextData.VERSION_NUM)>=1){
    			stextData.VERSION_NUM= parseInt(stextData.VERSION_NUM)   +   parseInt(1);  
    		}else{
    			stextData.VERSION_NUM=1;
    		};
    		stextData.STATU='进入提交队列';
//    		data.status = 1;
    		arrayResults[0].json = data;
    		/*if(stextData.STATUS=='未计划'){
    			
    		};*/
    		stextData.DATE=INSTALLPLTJ[0].GONGXU;
    		
    		var jsondata={status:1,tcode:data.tcode,tid:data.tid,stext:stextData,ext1:pro};
    		var udata = {_id:arrayResults[0]._id, json:jsondata};
    		WL.JSONStore.get(collectionName).refresh(udata,options).then(function(arrayResults2){
    			//WL.Toast.show('提交成功！');
    			console.log('JSONStore更新成功');
    			//this_obj.connectServerMainTain(this_obj.instalPlan_HomePage_TJ_Button_JG,this_obj,"installPlanAction.do?method=toUpdate",JSON.stringify(trim));
    			
    			if (installTcode == 'installplanfalse') {
    				//跳转到安装计划查询页面
    				//this.showNextView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
    				
    				var MaintList=Ext.data.StoreManager.get('HelIntTasksAllStore');
    				if (!MaintList) { 
    					MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStore"); 
    				};
    				var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
    				if (!MaintList2) { 
    					MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
    				};
    				//先清空数据仓
    				var record=[];
    				MaintList2.setData(record, this);
    				
    				var recordData=[];
    				//获取要查询的合同号
    				var Maintain=collectionName;
    		    	var MaintainList=WL.JSONStore.get(Maintain);
    		    	var query={tcode:installTcode,tid:PLselectHTH};
    				var options={
    					exacte:false,//默认
    				};
    				var ZT;//状态
    		    	MaintainList.find(query,options).then(function(arrayResults){
    		    		var num=arrayResults.length;
    		    		console.log('instalPlanMylist7拥有的台数: '+num);
    		    		for(var i=0;i<num;i++){
    		    			var data=arrayResults[i].json.stext;
    		    			var status = arrayResults[i].json.status;
    		    			var dataVN=data.VERSION_NUM;
    		    			var dataBBH=data.VERSION_NUM;
    		    			if (status == 1) {
    		    				ZT='已进入待提交列表';
    		    				if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
        		    				dataBBH='无';
        		    			};
    		    			} else {
    		    				//alert('status:'+status);
    		    				if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
        		    				ZT='未计划';
        		    				dataBBH='无';
        		    			}else{
        		    				ZT='已计划';
        		    			};
    		    			}
    		    			//工号     批次    类型  版本号  状态（未计划，已计划）合同号
    		    			var trim={ELEVATOR_NO:data.ELEVATOR_NO,SEQ_NUM:data.SEQ_NUM,ELEVATOR_CLASS_NAME:data.ELEVATOR_CLASS_NAME,VERSION_NUM:dataBBH,STATUS:ZT,ENGCONTRACT_NUMBER:data.ENGCONTRACT_NUMBER};
    		    			recordData[i]=trim;
    		    			console.log(JSON.stringify(trim));
    		    		};
    		    		MaintList2.setData(recordData, this);
    		    		myLoading.hide();
    		    	}).fail(function(errorObject){
    					console.log("查询数据失败");
    				});
    			} else if (installTcode == 'installplantrue') {
    				//跳转到安装计划查询页面
    			//	this.showNextView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
    				
    				var MaintList=Ext.data.StoreManager.get('HelIntTasksAllStoreThree');
    				if (!MaintList) { 
    					MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreThree"); 
    				};
    				var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
    				if (!MaintList2) { 
    					MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
    				};
    				//先清空数据仓
    				var record=[];
    				MaintList2.setData(record, this);
    				
    				var recordData=[];
    				//获取要查询的合同号
    			//	var HT=MaintList.getAt(index).get('ENGCONTRACT_NUMBER');
    				
    			//	PLselectHTH=HT;
    				
    				var Maintain=collectionName;
    		    	var MaintainList=WL.JSONStore.get(Maintain);
    		    	var query={tcode:installTcode,tid:PLselectHTH};
    				var options={
    					exacte:false,//默认
    				};
    				var ZT;//状态
    		    	MaintainList.find(query,options).then(function(arrayResults){
    		    		var num=arrayResults.length;
    		    		console.log('instalPlanMylist7拥有的台数: '+num);
    		    		for(var i=0;i<num;i++){
    		    			var data=arrayResults[i].json.stext;
    		    			var dataVN=data.VERSION_NUM;
    		    			var dataBBH=data.VERSION_NUM;
    		    			if (arrayResults[i].json.status == 1) {
    		    				ZT='已进入待提交列表';
    		    			} else {
    		    				if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
    			    				ZT='未计划';
    			    				dataBBH='无';
    			    			}else{
    			    				ZT='已计划';
    			    			};
    		    			}
    		    			//工号     批次    类型  版本号  状态（未计划，已计划）  合同号
    		    			var trim={ELEVATOR_NO:data.ELEVATOR_NO,SEQ_NUM:data.SEQ_NUM,ELEVATOR_CLASS_NAME:data.ELEVATOR_CLASS_NAME,VERSION_NUM:dataBBH,STATUS:ZT,ENGCONTRACT_NUMBER:data.ENGCONTRACT_NUMBER};
    		    			recordData[i]=trim;
    		    			console.log(JSON.stringify(trim));
    		    		};
    		    		MaintList2.setData(recordData, this);
    		    		myLoading.hide();
    		    	}).fail(function(errorObject){
    					console.log("查询数据失败");
    				});
    			};
    			
    		}).fail(function(errorObject){
    			console.log(errorObject);
    		});	
    	}).fail(function(errorObject){
			console.log(errorObject);
		});	
	},
	
	/**
	 **安装计划详细页面
	 ************************************************************************************/

	

	/************************************************************************************
	 * 安装计划  批量页面
	 * */
	
	//安装计划  批量页面 返回按钮
	installplan_AZJHXXTimes_FH_Button:function(){
		
		//用于批量判断是否直梯和扶梯
		var PLtzType=Ext.getCmp('PLtzType').getValue();
		
		//判断是直梯还是扶梯
	    if(PLtzType=='直梯'){
	    	 install_QingKongShiJianKongJian_ZT();
	    }else if(PLtzType=='扶梯'){
	    	install_QingKongShiJianKongJian_FT();
	    };
	    
	    var nview = Ext.getCmp('installplan_AZJHXXTimes');
		nview.initData();
	    
	    this.showBackView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
		
		var sele=document.getElementsByName('groupCheckboxinstall');
	    for ( var i = 0; i <sele.length; i++)  
	    {  
	      // 提取控件  
	      var checkbox = sele[i];  
	      checkbox.style.color='#ccc';
	    };


	},

	//批量页面的 提交按钮 installplan_AZJHXXTimes
	installplan_AZJHXXTimes_TJ_Button:function(){
		//未进场和在制的判断
		var installTcode=Ext.getCmp('installTcode').getValue();
		
		this_obj=this;
		
		//安装计划查询－工号列表页面的数据仓
		var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
		if (!MaintList2) { 
			MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
		};
		
		//用于获取选中数据仓的下标
		var newXb=Ext.getCmp('newXb').getValue();
		newXb=eval("("+ newXb +")");
		console.log(newXb[0]);
		console.log(newXb);
		
		var XBlength=newXb.length;
		
		//用于批量判断是否直梯和扶梯
		var PLtzType=Ext.getCmp('PLtzType').getValue();
		
		//判断提交的梯子类型
		if('直梯'==PLtzType){
			//判断电梯发货是否填写时间
			//棚架搭设
			var ZT_PJDS_START_TIME=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
			var ZT_PJDS_END_TIME=Ext.getCmp('ZT_DTTS_START_TIME_TWO').getValue();
			if(ZT_PJDS_START_TIME!=null&&ZT_PJDS_END_TIME==null){
				WL.Toast.show("请填写进场时间和完工时间");
				return ;
			}
//			}else if(ZT_PJDS_END_TIME!=null&&ZT_PJDS_START_TIME==null){
//				WL.Toast.show("请填写棚架搭设时间");
//				return ;
//			}else if(ZT_PJDS_START_TIME==null&&ZT_PJDS_END_TIME==null){
//				WL.Toast.show("请填写棚架搭设时间");
//				return ;
//			};
			//电梯发货(特殊)
//			var ZT_DTFH_START_TIME=Ext.getCmp('ZT_DTFH_START_TIME_TWO').getValue();
//			var ZT_DTFH_END_TIME=Ext.getCmp('ZT_DTFH_END_TIME_TWO').getValue();
//			if(ZT_DTFH_START_TIME!=null&&ZT_DTFH_END_TIME==null){
//				WL.Toast.show("请填写完电梯发货时间");
//				return ;
//			}else if(ZT_DTFH_END_TIME!=null&&ZT_DTFH_START_TIME==null){
//				WL.Toast.show("请填写完电梯发货时间");
//				return ;
//			}else if(ZT_DTFH_START_TIME==null&&ZT_DTFH_END_TIME==null){
//				WL.Toast.show("请填写完电梯发货时间");
//				return ;
//			};
			
			//总合集
			var INSTALLPLTJ=[];
			//先把同一合同号的数据查询出来，在选择需要的
			var HT=MaintList2.getAt(0).get('ENGCONTRACT_NUMBER');
			//从JSONStore中获取数据
			//合同号    工号   批次
			var tiaojian=HT;
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	var query={tcode:installTcode,tid:tiaojian};
			var options={
				exacte:false,//默认
			};
			var tiaojians=[];
	    	MaintainList.find(query,options).then(function(arrayResults){
	    		for(var i=0;i<XBlength;i++){
	    			var num=arrayResults.length;
	    			var data=arrayResults[newXb[i]].json.stext;
	    			console.log('批量中tid: '+ JSON.stringify(arrayResults[newXb[i]]));
	    			
	    			//用于判断哪些是提交的
	    			tiaojians[i]=arrayResults[newXb[i]].json.tid;
	    			
	    			//条件一
		    		var show={};
		    		show.TASK_ID=data.TASK_ID;
		    		show.ORG_ID=data.ORG_ID;
		    		show.SEQ_NUM=data.SEQ_NUM;
		    		show.ELEVATOR_ID=data.ELEVATOR_ID;
		    		//条件二
		    		//进场
		    		var gf=Ext.getCmp("HP_INST_METHOD").getValue();
		    		var GONGXU=[];
		    		var Q_TIME=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
					var H_TIME="";
					
					var gon={};
					gon.WORK_STEP=10;
					gon.ELEVATOR_CLASS_CODE='ZT';
					gon.WORK_STEP_CODE='ZT_JCFX';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[0]=gon;
					//放样
					var Q_TIME=Ext.getCmp('ZT_DTFH_START_TIME_TWO').getValue();
					var H_TIME="";
					
					var gon={};
					gon.WORK_STEP=20;
					gon.ELEVATOR_CLASS_CODE='ZT';
					gon.WORK_STEP_CODE='ZT_MTMT';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[1]=gon;
					
					//可提交可不提交的
					var countTime=1;
					
					//安装撑架和导轨 an2定主机
					var Q_TIME=Ext.getCmp('ZT_DTDZ_START_TIME_TWO').getValue();
					var H_TIME="";
					if(Q_TIME!=null&&H_TIME!=null){
						
						var gon={};
						gon.WORK_STEP=30;
						gon.ELEVATOR_CLASS_CODE='ZT';
						if(gf=="传统搭棚")
						gon.WORK_STEP_CODE='ZT_DKSB';
						else
						gon.WORK_STEP_CODE='ZT_JFAZJX';	
						gon.PLAN_START_DATE=Q_TIME;
						gon.PLAN_END_DATE=H_TIME;
						GONGXU[countTime]=gon;
						countTime++;
					};
					
					//定主机 an2轿架
					var Q_TIME=Ext.getCmp('ZT_JCFX_START_TIME_TWO').getValue();
					var H_TIME="";
					if(Q_TIME!=null&&H_TIME!=null){
						
						var gon={};
						gon.WORK_STEP=40;
						gon.ELEVATOR_CLASS_CODE='ZT';
						if(gf=="传统搭棚")
						gon.WORK_STEP_CODE='ZT_JFAZJX';
						else
						gon.WORK_STEP_CODE='ZT_JJJXPJ';	
						gon.PLAN_START_DATE=Q_TIME;
						gon.PLAN_END_DATE=H_TIME;
						GONGXU[countTime]=gon;
						countTime++;
					};
					
					//安装轿架及轿厢  an2撑架
					var Q_TIME=Ext.getCmp('ZT_ZJDG_START_TIME_TWO').getValue();
					var H_TIME="";
					if(Q_TIME!=null&&H_TIME!=null){
						
						var gon={};
						gon.WORK_STEP=50;
						gon.ELEVATOR_CLASS_CODE='ZT';
						if(gf=="传统搭棚")
						gon.WORK_STEP_CODE='ZT_JJJXPJ';
						else
						gon.WORK_STEP_CODE='ZT_DKSB';	
						gon.PLAN_START_DATE=Q_TIME;
						gon.PLAN_END_DATE=H_TIME;
						GONGXU[countTime]=gon;
						countTime++;
					};
					
					//电气接线
					var Q_TIME=Ext.getCmp('ZT_MTMT_START_TIME_TWO').getValue();
					var H_TIME="";
					if(Q_TIME!=null&&H_TIME!=null){
						
						var gon={};
						gon.WORK_STEP=60;
						gon.ELEVATOR_CLASS_CODE='ZT';
						gon.WORK_STEP_CODE='ZT_DTFH';
						gon.PLAN_START_DATE=Q_TIME;
						gon.PLAN_END_DATE=H_TIME;
						GONGXU[countTime]=gon;	
						countTime++;
					};
					
					//机房设备安装、机房放线接线
					var Q_TIME=Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').getValue();
					var H_TIME="";
					if(Q_TIME!=null&&H_TIME!=null){
						
						var gon={};
						gon.WORK_STEP=70;
						gon.ELEVATOR_CLASS_CODE='ZT';
						gon.WORK_STEP_CODE='ZT_JFAZJX';
						gon.PLAN_START_DATE=Q_TIME;
						gon.PLAN_END_DATE=H_TIME;
						GONGXU[countTime]=gon;	
						countTime++;
					};
					
					//桥架、桥厢拼装
					var Q_TIME=Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').getValue();
					var H_TIME="";
					if(Q_TIME!=null&&H_TIME!=null){
						
						var gon={};
						gon.WORK_STEP=80;
						gon.ELEVATOR_CLASS_CODE='ZT';
						gon.WORK_STEP_CODE='ZT_JFAZJX';
						gon.PLAN_START_DATE=Q_TIME;
						gon.PLAN_END_DATE=H_TIME;
						GONGXU[countTime]=gon;
						countTime++;
					};
					
					//验收完成日期
					var Q_TIME=Ext.getCmp('ZT_CP_START_TIME_TWO').getValue();
					var H_TIME="";
					if(Q_TIME!=null&&H_TIME!=null){
						
					var gon={};
					gon.WORK_STEP=90;
					gon.ELEVATOR_CLASS_CODE='ZT';
					gon.WORK_STEP_CODE='ZT_CJ';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
					};
					
					//技检日期
					var Q_TIME=Ext.getCmp('ZT_DKSB_START_TIME_TWO').getValue();
					var H_TIME="";
					if(Q_TIME!=null&&H_TIME!=null){
						
					var gon={};
					gon.WORK_STEP=100;
					gon.ELEVATOR_CLASS_CODE='ZT';
					gon.WORK_STEP_CODE='ZT_ZFJ';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
					};
						
					//完工日期
					var Q_TIME=Ext.getCmp('ZT_DTTS_START_TIME_TWO').getValue();
					var H_TIME="";
					if(Q_TIME!=null&&H_TIME!=null){
				
					var gon={};
					gon.WORK_STEP=110;
					gon.ELEVATOR_CLASS_CODE='ZT';
					gon.WORK_STEP_CODE='ZT_JHWG';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
					};
					
					//移交客户日期
					var Q_TIME=Ext.getCmp('ZT_CJ_START_TIME_TWO').getValue();
					var H_TIME="";
					if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=120;
					gon.ELEVATOR_CLASS_CODE='ZT';
					gon.WORK_STEP_CODE='ZT_ZJDG';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
					};
					
//					//政府部门验收
//					var Q_TIME=Ext.getCmp('ZT_ZFJ_START_TIME_TWO').getValue();
//					var H_TIME=Ext.getCmp('ZT_ZFJ_END_TIME_TWO').getValue();
//					if(Q_TIME!=null&&H_TIME!=null){
//						
//						var gon={};
//						gon.WORK_STEP=130;
//						gon.ELEVATOR_CLASS_CODE='ZT';
//						gon.WORK_STEP_CODE='ZT_ZFJ';
//						gon.PLAN_START_DATE=Q_TIME;
//						gon.PLAN_END_DATE=H_TIME;
//						GONGXU[countTime]=gon;
//						countTime++;
//					};
//					
					//
					var trim={};
					trim.SHOW=show;
					trim.GONGXU=GONGXU;
					trim.init_person_id=init_person_id;
					//
					INSTALLPLTJ[i]=trim;
	    		};
	    		console.log('INSTALLPLTJ '+JSON.stringify(INSTALLPLTJ));
	    		
	    		//批量添加 用的数组
	    		var JSON_INSTALLPLTJ=JSON.stringify(INSTALLPLTJ);
	    		Ext.getCmp('INSTALLPLTJ').setValue(JSON_INSTALLPLTJ);
	    		
	    		//修改为离线提交方法  2014-6-24  xcx
				
				var Maintain=collectionName;
		    	var MaintainList=WL.JSONStore.get(Maintain);
		    	var TrimLX={tid:'AZXM_PL_ZT',tcode:'UNCOMMIT_AZJH',};
		    	var options={
					exacte:false,//默认
				};
		    	MaintainList.find(TrimLX,options).then(function(array){
		    		
						var ext1={};
						ext1.url='installPlanAction.do?method=toVolumeBoxAdd';
						var msg={};
						msg.msg_title='安装计划';
						msg.msg_body=HT;//合同号
						msg.msg_result='正在等待提交';//'正在等待提交';
						ext1.msg=msg;
						
						var ext1_obj=[];
						for(var u=0;u<XBlength;u++){
						//	console.log('里面有没有数值：'+JSON.stringif(arrayResults)+'   里面有');
							var stextData=arrayResults[newXb[u]].json.stext;
							if(typeof(stextData.VERSION_NUM)!="undefined"){
							if(parseInt(stextData.VERSION_NUM)>=1){
				    			stextData.VERSION_NUM= parseInt(stextData.VERSION_NUM)   +   parseInt(1);  
				    		}else{
				    			stextData.VERSION_NUM=1;
				    		};
				    		};
				    		arrayResults[newXb[u]].json.stext.DATE=INSTALLPLTJ[u].GONGXU;
				    		ext1_obj[u]=arrayResults[newXb[u]];
				    		
						};
						console.log('提交打印： '+JSON.stringify(ext1_obj)+'  bkjooomjo');
						ext1.cparam = HT;
						var obj_t = {};
						obj_t.isArray = true;
						obj_t.data = ext1_obj;
						ext1.obj = obj_t;
						
						ext1.view_id='HelcPDA.controller.install.installplan.installplanCtrl';
						var TrimLX={tid:'AZXM_PL_ZT',tcode:'UNCOMMIT_AZJH',stext:INSTALLPLTJ,ext1:ext1,status:'1'};
						MaintainList.add(TrimLX).then(function(){
							WL.Toast.show("数据提交成功");
							this_obj.DuoGeJR(this_obj,tiaojians);
						}).fail(function(errorObject){
				    		WL.Toast.show("数据提交失败");
						});
				
		    	}).fail(function(errorObject){
		    		WL.Toast.show("查询数据失败");
				});
	    		
	    		//this_obj.install_modificationANDshowDG(INSTALLPLTJ,this_obj);
	    		//this_obj.connectServerMainTain(this_obj.instalPlan_HomePage_TJ_Button_JGDG,this_obj,"installPlanAction.do?method=toVolumeBoxAdd",JSON.stringify(INSTALLPLTJ));
	    	}).fail(function(errorObject){
				console.log("查询数据失败");
			});
			
		}else if('扶梯'==PLtzType){
			
			//总合集
			var INSTALLPLTJ=[];
			//先把同一合同号的数据查询出来，在选择需要的
			var HT=MaintList2.getAt(0).get('ENGCONTRACT_NUMBER');
			//从JSONStore中获取数据
			//合同号    工号   批次
			var tiaojian=HT;
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	var query={tcode:installTcode,tid:tiaojian};
			var options={
				exacte:false,//默认
			};
			var tiaojians=[];
	    	MaintainList.find(query,options).then(function(arrayResults){
	    		for(var i=0;i<XBlength;i++){
	    			var num=arrayResults.length;
	    			var data=arrayResults[newXb[i]].json.stext;
	    			
	    			//用于判断哪些是提交的
	    			tiaojians[i]=arrayResults[newXb[i]].json.tid;
	    			
		    		//条件一
		    		var show={};
		    		show.TASK_ID=data.TASK_ID;
		    		show.ORG_ID=data.ORG_ID;
		    		show.SEQ_NUM=data.SEQ_NUM;
		    		show.ELEVATOR_ID=data.ELEVATOR_ID;
		    		//条件二
		    		var GONGXU=[];
		    			    		//进场
	    		var Q_TIME=Ext.getCmp('FT_AZ_START_TIME_TWO').getValue();
				var H_TIME="";
				
				var gon={};
				gon.WORK_STEP=10;
				gon.ELEVATOR_CLASS_CODE='FT';
				gon.WORK_STEP_CODE='ZT_JCFX';
				gon.PLAN_START_DATE=Q_TIME;
				gon.PLAN_END_DATE=H_TIME;
				GONGXU[0]=gon;
				
				var countTime=1;
				//桁架样架定位
				var Q_TIME=Ext.getCmp('FT_TS_START_TIME_TWO').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=20;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='FT_AZ';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//玻璃侧板安装
				var Q_TIME=Ext.getCmp('FT_CJ_START_TIME_TWO').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=30;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='FT_CJ';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//扶手带组件安装
				var Q_TIME=Ext.getCmp('FT_ZJ_START_TIME_TWO').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=40;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='FT_TS';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//步级安装
				var Q_TIME=Ext.getCmp('FT_bjaz_START_TIME_TWO').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=50;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='FT_ZJ';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//动力电源
				var Q_TIME=Ext.getCmp('FT_dldy_START_TIME_TWO').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=60;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='ZT_CP';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				
				//报调日期
				var Q_TIME=Ext.getCmp('FT_bt_START_TIME_TWO').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=70;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='ZT_DTTS';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				
				//报检日期
				var Q_TIME=Ext.getCmp('FT_bj_START_TIME_TWO').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=80;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='ZT_PJDS';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//验收完成日期
				var Q_TIME=Ext.getCmp('FT_yswc_START_TIME_TWO').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=90;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='ZT_CJ';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//技检日期
				var Q_TIME=Ext.getCmp('FT_jj_START_TIME_TWO').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=100;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='ZT_ZFJ';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//完工日期
				var Q_TIME=Ext.getCmp('FT_wg_START_TIME_TWO').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=110;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='ZT_JHWG';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//移交客户日期
				var Q_TIME=Ext.getCmp('FT_yjkh_START_TIME_TWO').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=120;
					gon.ELEVATOR_CLASS_CODE='FT';
					gon.WORK_STEP_CODE='ZT_ZJDG';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
					
					//
					var trim={};
					trim.SHOW=show;
					trim.GONGXU=GONGXU;
					trim.init_person_id=init_person_id;
					//
					INSTALLPLTJ[i]=trim;
	    		};
	    		
	    		//批量添加 用的数组
				var  JSON_INSTALLPLTJ=JSON.stringify(INSTALLPLTJ);
	    		Ext.getCmp('INSTALLPLTJ').setValue(JSON_INSTALLPLTJ);
	    		
	    		//修改为离线提交方法  2014-6-24  xcx
				
				var Maintain=collectionName;
		    	var MaintainList=WL.JSONStore.get(Maintain);
		    	var TrimLX={tid:'AZXM_PL_FT',tcode:'UNCOMMIT_AZJH',};
		    	var options={
					exacte:false,//默认
				};
		    	MaintainList.find(TrimLX,options).then(function(array){
		    		
						var ext1={};
						ext1.url='installPlanAction.do?method=toVolumeBoxAdd';
						var msg={};
						msg.msg_title='安装计划';
						msg.msg_body=HT;//合同号
						msg.msg_result='正在等待提交';//'正在等待提交';
						
						var ext1_obj=[];
						for(var u=0;u<XBlength;u++){
								var stextData=arrayResults[newXb[u]].json.stext;
								if(typeof(stextData.VERSION_NUM)!="undefined"){
								if(parseInt(stextData.VERSION_NUM)>=1){
					    			stextData.VERSION_NUM= parseInt(stextData.VERSION_NUM)   +   parseInt(1);  
					    		}else{
					    			stextData.VERSION_NUM=1;
					    		};
					    		};
					    		arrayResults[newXb[u]].json.stext.DATE=INSTALLPLTJ[u].GONGXU;
					    		ext1_obj[u]=arrayResults[newXb[u]];
					    		
						};
						
						
						
							ext1.cparam = HT;
							var obj_t = {};
							obj_t.isArray = true;
							obj_t.data = ext1_obj;
							ext1.obj = obj_t;
						
						ext1.msg=msg;
						ext1.view_id='HelcPDA.controller.install.installplan.installplanCtrl';
						var TrimLX={tid:'AZXM_PL_FT',tcode:'UNCOMMIT_AZJH',stext:INSTALLPLTJ,ext1:ext1,status:'1'};
						MaintainList.add(TrimLX).then(function(){
							WL.Toast.show("数据提交成功");
							
							this_obj.DuoGeJR(this_obj,tiaojians);
							
						}).fail(function(errorObject){
				    		WL.Toast.show("数据提交失败");
						});
					
		    	}).fail(function(errorObject){
		    		WL.Toast.show("查询数据失败");
				});
	    		
	    		console.log('INSTALLPLTJ '+JSON.stringify(INSTALLPLTJ));
	    		//this_obj.install_modificationANDshowDG(INSTALLPLTJ,this_obj);
	    		//this_obj.(this_obj.instalPlan_HomePage_TJ_Button_JGDG,this_obj,"installPlanAction.do?method=toVolumeBoxAdd",JSON.stringify(INSTALLPLTJ));
	    	}).fail(function(errorObject){
				console.log("查询数据失败");
			});
		}else if('ITM'==lx){
			//从JSONStore中获取数据
			//合同号    工号   批次
			var HT=Ext.getCmp('HP_ENGCONTRACT_NUMBER').getValue();
			var GH=Ext.getCmp('HP_ELEVATOR_NO').getValue();
			var PC=Ext.getCmp('HP_SEQ_NUM').getValue();
			var tiaojian=HT+'/'+GH+'/'+PC;
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	var query={tcode:installTcode,tid:tiaojian};
	    	var installaddDGTJ=JSON.stringify(query);
	    	
	    	//单个添加 用的JSONStore条件
	    	Ext.getCmp('installaddDGTJ').setValue(installaddDGTJ);
	    	
			var options={
				exacte:false,//默认
			};
	    	MaintainList.find(query,options).then(function(arrayResults){
	    		var num=arrayResults.length;
	    		var data=arrayResults[num-1].json.stext;
	    		//条件一
	    		var show={};
	    		show.TASK_ID=data.TASK_ID;
	    		show.ORG_ID=data.ORG_ID;
	    		show.SEQ_NUM=data.SEQ_NUM;
	    		show.ELEVATOR_ID=data.ELEVATOR_ID;
	    		//条件二
	    		var GONGXU=[];
	    		//进场
	    		var Q_TIME=Ext.getCmp('ITM_JC_START_TIME_TWO').getValue();
				var H_TIME="";
				
				var gon={};
				gon.WORK_STEP=10;
				gon.ELEVATOR_CLASS_CODE='ITM';
				gon.WORK_STEP_CODE='ZT_JCFX';
				gon.PLAN_START_DATE=Q_TIME;
				gon.PLAN_END_DATE=H_TIME;
				GONGXU[0]=gon;
				
				var countTime=1;
				
				//完工日期
				var Q_TIME=Ext.getCmp('ITM_WG_START_TIME_TWO').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=20;
					gon.ELEVATOR_CLASS_CODE='ITM';
					gon.WORK_STEP_CODE='ZT_JHWG';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				//移交客户日期
				var Q_TIME=Ext.getCmp('ITM_YJKH_START_TIME_TWO').getValue();
				var H_TIME="";
				if(Q_TIME!=null&&H_TIME!=null){
					
					var gon={};
					gon.WORK_STEP=30;
					gon.ELEVATOR_CLASS_CODE='ITM';
					gon.WORK_STEP_CODE='ZT_ZJDG';
					gon.PLAN_START_DATE=Q_TIME;
					gon.PLAN_END_DATE=H_TIME;
					GONGXU[countTime]=gon;
					countTime++;
				};
				
				var trim={};
				trim.SHOW=show;
				trim.GONGXU=GONGXU;
				trim.init_person_id=init_person_id;
				
				var INSTALLPLTJ=[];
				INSTALLPLTJ[0]=trim;
				
				INSTALLPLTJ=JSON.stringify(INSTALLPLTJ);
				//批量添加 用的数组
				Ext.getCmp('INSTALLPLTJ').setValue(INSTALLPLTJ);
				
				//console.log(JSON.stringify(GONGXU));
			
				//修改本地数据 2014-5-26
				//this_obj.install_modificationANDshow(query,GONGXU,trim,this_obj);
				//
				
				//修改为离线提交方法  2014-6-24  xcx
				
				var Maintain=collectionName;
		    	var MaintainList=WL.JSONStore.get(Maintain);
		    	var TrimLX={tid:'AZXM_DG_FT',tcode:'UNCOMMIT_AZJH',};
		    	var options={
					exacte:false,//默认
				};
		    	MaintainList.find(TrimLX,options).then(function(array){
		    		
						var ext1={};
						ext1.url='installPlanAction.do?method=toUpdate';
						var msg={};
						msg.msg_title='安装计划';
						msg.msg_body=GH;//工号
						msg.msg_result='正在等待提交';//'正在等待提交';
						ext1.msg=msg;
						var stextData=arrayResults[0].json.stext;
						
						arrayResults[0].json.stext.DATE=GONGXU;
						if(parseInt(stextData.VERSION_NUM)>=1){
			    			stextData.VERSION_NUM= parseInt(stextData.VERSION_NUM)   +   parseInt(1);  
			    		}else{
			    			stextData.VERSION_NUM=1;
			    		};
						ext1.obj=arrayResults[0];
						ext1.view_id='HelcPDA.controller.install.installplan.installplanCtrl';
						ext1.cparam = HT;
						var TrimLX={tid:'AZXM_DG_FT',tcode:'UNCOMMIT_AZJH',stext:trim,ext1:ext1,status:'1'};
						MaintainList.add(TrimLX).then(function(){
							WL.Toast.show("数据提交成功");
							
							this_obj.DangGeJR(this_obj,tiaojian);
							
						}).fail(function(errorObject){
				    		WL.Toast.show("数据提交失败");
						});
					
		    	}).fail(function(errorObject){
		    		WL.Toast.show("查询数据失败");
				});
				
				
				//this_obj.connectServerMainTain(this_obj.instalPlan_HomePage_TJ_Button_JG,this_obj,"installPlanAction.do?method=toUpdate",JSON.stringify(trim));
	    	}).fail(function(errorObject){
				console.log("查询数据失败");
			});
		}
	},
				
	//多个提交  进入待机界面  2014-6-24
	DuoGeJR:function(obj,tiaojians){
		//未进场和在制的判断
		var installTcode=Ext.getCmp('installTcode').getValue();
		
		//用于批量判断是否直梯和扶梯
		var PLtzType=Ext.getCmp('PLtzType').getValue();
		
		if(PLtzType=='直梯'){
			install_QingKongShiJianKongJian_ZT();
		}else if(PLtzType=='扶梯'){
			install_QingKongShiJianKongJian_FT();
		};
		
		//返回  安装计划查询－工号列表
		obj.showBackView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
	
		//批量添加 用的数组
		var INSTALLPLTJ=Ext.getCmp('INSTALLPLTJ').getValue();
		INSTALLPLTJ=eval("("+ INSTALLPLTJ +")");
		
		//用于获取选中数据仓的下标
		var newXb=Ext.getCmp('newXb').getValue();
		newXb=eval("("+ newXb +")");
		
		//用于提交按钮的 合同号
		var PLselectHTH=Ext.getCmp('PLselectHTH').getValue();
		
		//安装计划查询－工号列表 数据仓
		var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
		if (!MaintList2) { 
			MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
		};
		var HT=MaintList2.getAt(0).get('ENGCONTRACT_NUMBER');
		
		//从JSONStore中获取数据
		//合同号    工号   批次
		var tiaojian=HT;
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:installTcode,tid:tiaojian};
		var options={
			exacte:false,//默认
		};
    	MaintainList.find(query,options).then(function(arrayResults){
    		var XGdata=[];
    		var XBlength=newXb.length;
    		for(var i=0;i<XBlength;i++){
    			var num=arrayResults.length;
    			var data=arrayResults[newXb[i]].json;
    			console.log('data: '+JSON.stringify(data));
    			var stextData=data.stext;
    			var pro=data.ext1;
    			//if(typeof(stextData.VERSION_NUM)!="undefined"){
        		if( parseInt(stextData.VERSION_NUM)>=1){
        			stextData.VERSION_NUM= parseInt(stextData.VERSION_NUM)   +   parseInt(1);  
        		}else{
        			stextData.VERSION_NUM=1;
        		};
        		//};
        		stextData.STATU='进入提交队列';
        		stextData.DATE=INSTALLPLTJ[i].GONGXU;
        		var jsondata={status:1,tcode:data.tcode,tid:data.tid,stext:stextData,ext1:pro};
        		var udata = {_id:arrayResults[newXb[i]]._id, json:jsondata};
        		XGdata[i]=udata;
    		};
    		
    		MaintainList.refresh(XGdata,options).then(function(arrayResults2){
    			console.log('修改成功');
    			
    			if (installTcode == 'installplanfalse') {
    				var MaintList=Ext.data.StoreManager.get('HelIntTasksAllStore');
    				if (!MaintList) { 
    					MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStore"); 
    				};
    				var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
    				if (!MaintList2) { 
    					MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
    				};
    				//先清空数据仓
    				var record=[];
    				MaintList2.setData(record, this);
    				var recordData=[];
    				
    				var Maintain=collectionName;
    		    	var MaintainList=WL.JSONStore.get(Maintain);
    		    	var query={tcode:installTcode,tid:PLselectHTH};
    				var options={
    					exacte:false,//默认
    				};
    				var ZT;//状态
    		    	MaintainList.find(query,options).then(function(arrayResults){
    		    		var num=arrayResults.length;
    		    		console.log('instalPlanMylist7拥有的台数: '+num);
    		    		for(var i=0;i<num;i++){
    		    			var data=arrayResults[i].json.stext;
    		    			var dataVN=data.VERSION_NUM;
    		    			var dataBBH=data.VERSION_NUM;
    		    			
    		    			var status = arrayResults[i].json.status;
    		    			//alert('批量status：'+status);
    		    			if (status == 1) {
    		    				ZT='已进入待提交列表';
    		    				if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
        		    				dataBBH='无';
        		    			}
    		    			} else {
    		    				//alert('status:'+status);
    		    				if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
        		    				ZT='未计划';
        		    				dataBBH='无';
        		    			}else{
        		    				ZT='已计划';
        		    			};
    		    			}
    		    			//工号     批次    类型  版本号  状态（未计划，已计划）合同号
    		    			var trim={ELEVATOR_NO:data.ELEVATOR_NO,SEQ_NUM:data.SEQ_NUM,ELEVATOR_CLASS_NAME:data.ELEVATOR_CLASS_NAME,VERSION_NUM:dataBBH,STATUS:ZT,ENGCONTRACT_NUMBER:data.ENGCONTRACT_NUMBER};
    		    			recordData[i]=trim;
    		    			console.log(JSON.stringify(trim));
    		    		};
    		    		MaintList2.setData(recordData, this);
    		    		
    		    	}).fail(function(errorObject){
    		    		WL.Toast.show("查询数据失败");
    				});
    			} else if (installTcode == 'installplantrue') {
    				var MaintList=Ext.data.StoreManager.get('HelIntTasksAllStoreThree');
    				if (!MaintList) { 
    					MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreThree"); 
    				};
    				var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
    				if (!MaintList2) { 
    					MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
    				};
    				//先清空数据仓
    				var record=[];
    				MaintList2.setData(record, this);
    				var recordData=[];
    				var Maintain=collectionName;
    		    	var MaintainList=WL.JSONStore.get(Maintain);
    		    	var query={tcode:installTcode,tid:PLselectHTH};
    				var options={
    					exacte:false,//默认
    				};
    				var ZT;//状态
    		    	MaintainList.find(query,options).then(function(arrayResults){
    		    		var num=arrayResults.length;
    		    		console.log('instalPlanMylist7拥有的台数: '+num);
    		    		for(var i=0;i<num;i++){
    		    			var data=arrayResults[i].json.stext;
    		    			var dataVN=data.VERSION_NUM;
    		    			var dataBBH=data.VERSION_NUM;
//    		    			if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
//    		    				ZT='未计划';
//    		    				dataBBH='无';
//    		    			}else{
//    		    				ZT='已计划';
//    		    			};
    		    			var status = arrayResults[i].json.status;
    		    			//alert('批量status：'+status);
    		    			if (status == 1) {
    		    				ZT='已进入待提交列表';
    		    				if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
        		    				dataBBH='无';
        		    			}
    		    			} else {
    		    				//alert('status:'+status);
    		    				if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
        		    				ZT='未计划';
        		    				dataBBH='无';
        		    			}else{
        		    				ZT='已计划';
        		    			};
    		    			}
    		    			//工号     批次    类型  版本号  状态（未计划，已计划）  合同号
    		    			var trim={ELEVATOR_NO:data.ELEVATOR_NO,SEQ_NUM:data.SEQ_NUM,ELEVATOR_CLASS_NAME:data.ELEVATOR_CLASS_NAME,VERSION_NUM:dataBBH,STATUS:ZT,ENGCONTRACT_NUMBER:data.ENGCONTRACT_NUMBER};
    		    			recordData[i]=trim;
    		    			console.log(JSON.stringify(trim));
    		    		};
    		    		MaintList2.setData(recordData, this);
    		    	}).fail(function(errorObject){
    					console.log("查询数据失败");
    				});
    			};
    			
    		}).fail(function(errorObject){
        		console.log('修改失败');
    		});
    	}).fail(function(errorObject){
    		console.log('查询失败');
		});	
	
	},
	
	/*************************************************************************
	 * 批量部分  头
	 * ************************************************************************
	 */	
		
	//批量   录入数据   直梯 起始时间
	ZT_PJDS_START_TIME_TWO:function(){
		
		var flag=Ext.getCmp('FLAG').getValue();
		//alert('进入直梯的时间  '+flag);
		//判断是批量还是单个
		var  plnum=Ext.getCmp('plnum').getValue();
		
		if(flag==1){
			//alert('进入直梯的时间2');
			//单个提交 添加封锁
/*			if(plnum==0){
				var nview = Ext.getCmp('installplan_AZJHXXHomePage');
				nview.initData();
			}else if(plnum==1){
				
			};*/
			
			var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
			nview2.initData();
			
			//获取棚架搭设开始时间
			var startDay='';
			var startEnd='';
			var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
			//清除
	
			if(PJDS_start==''){
			
			}else if(PJDS_start!=''){
				//清空其他日期 06 22
				azjhflag=1;
				Ext.getCmp('ZT_DTFH_START_TIME_TWO').setValue('');
				Ext.getCmp('ZT_DTDZ_START_TIME_TWO').setValue('');
				Ext.getCmp('ZT_JCFX_START_TIME_TWO').setValue('');
				Ext.getCmp('ZT_ZJDG_START_TIME_TWO').setValue('');
				Ext.getCmp('ZT_MTMT_START_TIME_TWO').setValue('');
				Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').setValue('');
				Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').setValue('');
				Ext.getCmp('ZT_CP_START_TIME_TWO').setValue('');
				Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue('');
				Ext.getCmp('ZT_DTTS_START_TIME_TWO').setValue('');
				Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue('');
				Ext.getCmp('ZGQ_START_TIME_TWO').setValue(PJDS_start);
				Ext.getCmp('ZGQ_END_TIME_TWO').setValue('');
				Ext.getCmp('anjh_node').setValue('ZT_PJDS_START_TIME_TWO');
				azjhflag=0;
				
			 if(azjhflag==0&&(Ext.getCmp('ZT_DTTS_START_TIME_TWO').getValue()==null||Ext.getCmp('ZT_DTTS_START_TIME_TWO').getValue()=="")){
	        	Ext.Msg.alert("请输入完工时间！");
	        	return;
	        }
				
			};
		};
	},
	
	
	//公共的判断结束时间要大于开始时间
	StartAndEndTWO:function(obj, newDate, oldDate, eOpts ){
		var flag=Ext.getCmp('FLAG').getValue();
		
		//用于批量判断是否直梯和扶梯
		var PLtzType=Ext.getCmp('PLtzType').getValue();
		
		//判断是批量还是单个
		var  plnum=Ext.getCmp('plnum').getValue();
//		alert('批量页面'+PLtzType);
//		alert('进入批量判断'+flag);
		flag=1;
		if(flag==1){
			//alert('进入批量判断2');
/*			//时间控件修改  添加封锁
			if(plnum==0){
				var nview = Ext.getCmp('installplan_AZJHXXHomePage');
				nview.initData();
			}else if(plnum==1){
				
			};*/
			var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
			nview2.initData();
			//判断是直梯还是扶梯
			var lx=PLtzType;
			//=Ext.getCmp('HP_ELEVATOR_CLASS_NAME').getValue();
			/*if(plnum==1){
				lx=PLtzType;
			}else{
				lx=Ext.getCmp('HP_ELEVATOR_CLASS_NAME').getValue();
			}*/
			if('直梯'==lx){
				console.log("sss1");
				if(obj.getId()=='ZT_DTFH_START_TIME_TWO'&&azjhflag==0){
					//放样
					if(newDate!=''){
						
						azjhflag=1;
						Ext.getCmp('ZT_DTDZ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_JCFX_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_ZJDG_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_MTMT_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_CP_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_DTTS_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_DTFH_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_DTTS_START_TIME_TWO").getValue()==null||Ext.getCmp("ZT_DTTS_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						 
							
					};
				}
				//安装撑架和导轨
				else if(obj.getId()=='ZT_DTDZ_START_TIME_TWO'&&azjhflag==0){
					
					if(newDate!=''){
						
						azjhflag=1;
			
						Ext.getCmp('ZT_JCFX_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_ZJDG_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_MTMT_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_CP_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_DTTS_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_DTDZ_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_DTDZ_START_TIME_TWO").getValue()==null||Ext.getCmp("ZT_DTDZ_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
					
					  
					};
				}
				//定主机
				else if(obj.getId()=='ZT_JCFX_START_TIME_TWO'&&azjhflag==0){
					
					if(newDate!=''){
						
						azjhflag=1;
						Ext.getCmp('ZT_ZJDG_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_MTMT_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_CP_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_DTTS_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_JCFX_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_DTDZ_START_TIME_TWO").getValue()==null||Ext.getCmp("ZT_DTDZ_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}

						
					  
					};
				}
				//安装轿架及轿厢
				else if(obj.getId()=='ZT_ZJDG_START_TIME_TWO'&&azjhflag==0){
					
					if(newDate!=''){
					
						azjhflag=1;
						Ext.getCmp('ZT_MTMT_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_CP_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_DTTS_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_ZJDG_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_DTTS_START_TIME_TWO").getValue()==null||Ext.getCmp("ZT_DTTS_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
					};
				}
				//电气接线
				else if(obj.getId()=='ZT_MTMT_START_TIME_TWO'&&azjhflag==0){
					
					if(newDate!=''){
						azjhflag=1;
						Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_CP_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_DTTS_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_MTMT_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_DTTS_START_TIME_TWO").getValue()==null||Ext.getCmp("ZT_DTTS_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
					  
					};
				}
				//报调日期
				else if(obj.getId()=='ZT_JFAZJX_START_TIME_TWO'&&azjhflag==0){
					
					if(newDate!=''){
					
						azjhflag=1;
						Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_CP_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_DTTS_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_JFAZJX_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_DTTS_START_TIME_TWO").getValue()==null||Ext.getCmp("ZT_DTTS_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
											
					};
				}
				//报检日期
				else if(obj.getId()=='ZT_JJJXPJ_START_TIME_TWO'&&azjhflag==0){
					
					if(newDate!=''){
						
						
						azjhflag=1;
						Ext.getCmp('ZT_CP_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_DTTS_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_JJJXPJ_START_TIME_TWO');
						azjhflag=0;
						if(Ext.getCmp("ZT_DTTS_START_TIME_TWO").getValue()==null||Ext.getCmp("ZT_DTTS_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
					
						
					};
			  //验收完成日期
				}else if(obj.getId()=='ZT_CP_START_TIME_TWO'&&azjhflag==0){
					
					if(newDate!=''){
						
						azjhflag=1;
						Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_DTTS_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_CP_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_DTTS_START_TIME_TWO").getValue()==null||Ext.getCmp("ZT_DTTS_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
					};
			   //技检
				}else if(obj.getId()=='ZT_DKSB_START_TIME_TWO'&&azjhflag==0){
					if(newDate!=''){
						
						azjhflag=1;
						Ext.getCmp('ZT_DTTS_START_TIME_TWO').setValue('');
						Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue('');
						Ext.getCmp('ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('ZT_DKSB_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("ZT_CJ_START_TIME").getValue()==null||Ext.getCmp("ZT_CJ_START_TIME").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
						

					};
				//完工
				}else if(obj.getId()=='ZT_DTTS_START_TIME_TWO'&&azjhflag==0){
//					if(Ext.getCmp("ZT_PJDS_START_TIME").getValue()==null||Ext.getCmp("ZT_PJDS_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入进场时间！");
//						return;
//					}	
					if(newDate!=''){						
						var node =Ext.getCmp('anjh_node').getValue();
					
						//进场
						if(node=='ZT_PJDS_START_TIME_TWO'){
						var st =Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue().trim() ;
						var gf =Ext.getCmp("HP_INST_METHOD").getValue();
						//工法
						var day=DateDiff(st,newDate.trim() );
						
						var params={};
						if(gf=="传统搭棚"){
					    params.gongfa="P1";
					    params.gongxu="A1";
					    params.day=day;
						}else if(gf=="AN2"||gf=="吊篮"){
						params.gongfa="P2";
						params.gongxu="B1";
						params.day=day;
						}	
					    this.connectServerMainTain(getResult9,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
						//放样
						}else if(node=='ZT_DTFH_START_TIME_TWO'){

							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_DTFH_START_TIME_TWO').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A2";
						    params.day=day;
							}else if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B2";
							params.day=day;
							}	
						 this.connectServerMainTain(getResult,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
								
						 //安装撑架和导轨或AN2定主机	
						}else if(node=='ZT_DTDZ_START_TIME_TWO'){
							
							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_DTDZ_START_TIME_TWO').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A3";
						    params.day=day;
							}else if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B3";
							params.day=day;
							}	
						    
						   this.connectServerMainTain(getResult1,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
						   
						 //定主机或安装轿架
						}else if(node=='ZT_JCFX_START_TIME_TWO'){
							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_JCFX_START_TIME_TWO').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A4";
						    params.day=day;
							}else if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B4";
							params.day=day;
							}	
						   this.connectServerMainTain(getResult2,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
							
						//安装轿架或安装撑架	
						}else if(node=='ZT_ZJDG_START_TIME_TWO'){
							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_ZJDG_START_TIME_TWO').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A5";
						    params.day=day;
							}else if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B5";
							params.day=day;
							}	
						   this.connectServerMainTain(getResult3,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
							
						  
							
						//电气接线	
						}else if(node=='ZT_MTMT_START_TIME_TWO'){
							
							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_MTMT_START_TIME_TWO').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A6";
						    params.day=day;
							}else if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B6";
							params.day=day;
							}	
						    this.connectServerMainTain(getResult4,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
							
							
						//报调日期	
						}else if(node=='ZT_JFAZJX_START_TIME_TWO'){
							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A7";
						    params.day=day;
							}else if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B7";
							params.day=day;
							}	
						    this.connectServerMainTain(getResult5,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
						//报检日期	
						}else if(node=='ZT_JJJXPJ_START_TIME_TWO'){
							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A8";
						    params.day=day;
							}else if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B8";
							params.day=day;
							}	
						   this.connectServerMainTain(getResult6,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));
							
						 
					    //验收完成日期
						}else if(node=='ZT_CP_START_TIME_TWO'){
							var gf =Ext.getCmp("HP_INST_METHOD").getValue();
							//var ed=Ext.getCmp("ZT_CJ_START_TIME").getValue();
							var st =Ext.getCmp('ZT_CP_START_TIME_TWO').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							//工法
							var params={};
							if(gf=="传统搭棚"){
						    params.gongfa="P1";
						    params.gongxu="A9";
						    params.day=day;
							}else  if(gf=="AN2"||gf=="吊篮"){
							params.gongfa="P2";
							params.gongxu="B9";
							params.day=day;
							}	
						    this.connectServerMainTain(getResult7,this,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
							
						}	
						//技检日期	
						else if(node=='ZT_DKSB_START_TIME_TWO'){
						
							var newDate=Ext.getCmp('ZT_DTTS_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_START_TIME_TWO').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_CJ_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_END_TIME_TWO').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
						
						}
						console.log("day"+day);
						
						//zhj 根据以前逻辑新增
						var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
						H_TIME.setDisabled(false);
						
//					    //完工日期
//						else if(node=='ZT_CJ_START_TIME'){
//						
//						}
					    //进场
					    function getResult9(res,obj){
						   res=res.item[0];
						   azjhflag=1;	
						  
						    //放样
						    var newDate=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Setting_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DTFH_START_TIME_TWO').setValue(newDate_str);
							
						    var gf=Ext.getCmp("HP_INST_METHOD").getValue();
						   //安装撑架和导轨或定主机
							var newDate=Ext.getCmp('ZT_DTFH_START_TIME_TWO').getValue();
							var date_temp = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							date_temp.setDate(date_temp.getDate()+parseInt(res.Guide_Time));
							}else{
							date_temp.setDate(date_temp.getDate()+parseInt(res.Engine_Time));	
							}
							var newDate_str = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('ZT_DTDZ_START_TIME_TWO').setValue(newDate_str); 
																
							//定主机或安装桥架 
							var newDate=Ext.getCmp('ZT_DTDZ_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							 date.setDate(date.getDate()+parseInt(res.Engine_Time));
							 }else {	    
							 date.setDate(date.getDate()+parseInt(res.Frame_Time)); 
							 }
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JCFX_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_ZJDG_END_TIME').setValue(newDate_str);
							
							//安装轿架或安装撑架
							var newDate=Ext.getCmp('ZT_JCFX_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							date.setDate(date.getDate()+parseInt(res.Frame_Time));
							} else{
						    date.setDate(date.getDate()+parseInt(res.Guide_Time));	
							}
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZJDG_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_MTMT_END_TIME').setValue(newDate_str);					
							
							//电气接线
							var newDate=Ext.getCmp('ZT_ZJDG_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Electric_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_MTMT_START_TIME_TWO').setValue(newDate_str);
							
							//报调日期
							var newDate=Ext.getCmp('ZT_MTMT_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Adjustable_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').setValue(newDate_str);

		
							//报检
							var newDate=Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Examine_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').setValue(newDate_str);
							
							//验收
							var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CP_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							//技检
							var newDate=Ext.getCmp('ZT_CP_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_DTTS_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_START_TIME_TWO').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_CJ_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_END_TIME_TWO').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							azjhflag=0;
		   
					   };
					   //放样
					   function getResult(res,obj){
						   res=res.item[0];
						   azjhflag=1;
						   var gf=Ext.getCmp("HP_INST_METHOD").getValue();
						   //安装撑架和导轨或定主机
							var newDate=Ext.getCmp('ZT_DTFH_START_TIME_TWO').getValue();
							var date_temp = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							date_temp.setDate(date_temp.getDate()+parseInt(res.Guide_Time));
							}else{
							date_temp.setDate(date_temp.getDate()+parseInt(res.Engine_Time));	
							}
							var newDate_str = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('ZT_DTDZ_START_TIME_TWO').setValue(newDate_str); 
																
							//定主机或安装桥架 
							var newDate=Ext.getCmp('ZT_DTDZ_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							 date.setDate(date.getDate()+parseInt(res.Engine_Time));
							 }else {	    
							 date.setDate(date.getDate()+parseInt(res.Frame_Time)); 
							 }
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JCFX_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_ZJDG_END_TIME').setValue(newDate_str);
							
							//安装轿架或安装撑架
							var newDate=Ext.getCmp('ZT_JCFX_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							date.setDate(date.getDate()+parseInt(res.Frame_Time));
							} else{
						    date.setDate(date.getDate()+parseInt(res.Guide_Time));	
							}
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZJDG_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_MTMT_END_TIME').setValue(newDate_str);	
							
							var newDate=Ext.getCmp('ZT_ZJDG_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Electric_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_MTMT_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_JFAZJX_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_MTMT_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Adjustable_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_JJJXPJ_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Examine_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_CP_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CP_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CP_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_DTTS_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_START_TIME_TWO').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_CJ_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_END_TIME_TWO').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							azjhflag=0;
		   
					   }
					   //安装撑架和导轨或an2定主机
					   function getResult1(res,obj){					  	
						   res=res.item[0];
						   azjhflag=1;
						   //安装撑架或安装桥架 
						    var gf=Ext.getCmp("HP_INST_METHOD").getValue();
							var newDate=Ext.getCmp('ZT_DTDZ_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							 date.setDate(date.getDate()+parseInt(res.Engine_Time));
							 }else {	    
							 date.setDate(date.getDate()+parseInt(res.Frame_Time)); 
							 }
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JCFX_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_ZJDG_END_TIME').setValue(newDate_str);
							
							//安装轿架或安装撑架
							var newDate=Ext.getCmp('ZT_JCFX_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							date.setDate(date.getDate()+parseInt(res.Frame_Time));
							} else{
						    date.setDate(date.getDate()+parseInt(res.Guide_Time));	
							}
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZJDG_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_MTMT_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_ZJDG_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Electric_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_MTMT_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_JFAZJX_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_MTMT_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Adjustable_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_JJJXPJ_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Examine_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_CP_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CP_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CP_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_DTTS_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_START_TIME_TWO').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_CJ_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_END_TIME_TWO').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							
							azjhflag=0;
		   
					   }
					   //定主机
					   function getResult2(res,obj){
						   res=res.item[0];
						   azjhflag=1;
						    var gf=Ext.getCmp("HP_INST_METHOD").getValue();
						
							//安装轿架或安装撑架
							var newDate=Ext.getCmp('ZT_JCFX_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							if(gf=="传统搭棚"){
							date.setDate(date.getDate()+parseInt(res.Frame_Time));
							} else{
						    date.setDate(date.getDate()+parseInt(res.Guide_Time));	
							}
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_ZJDG_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_MTMT_END_TIME').setValue(newDate_str);
							
							
							var newDate=Ext.getCmp('ZT_ZJDG_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Electric_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_MTMT_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_JFAZJX_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_MTMT_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Adjustable_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_JJJXPJ_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Examine_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_CP_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CP_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CP_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_DTTS_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_START_TIME_TWO').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_CJ_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_END_TIME_TWO').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							azjhflag=0;
		   
					   }
						//安装轿架及轿厢 
					   function getResult3(res,obj){
						   res=res.item[0];
						   azjhflag=1;

							var newDate=Ext.getCmp('ZT_ZJDG_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Electric_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_MTMT_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_JFAZJX_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_MTMT_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Adjustable_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_JJJXPJ_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Examine_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_CP_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CP_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CP_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);
														
							var newDate=Ext.getCmp('ZT_DTTS_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_START_TIME_TWO').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_CJ_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_END_TIME_TWO').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							azjhflag=0;
		   
					   }
					 //电气接线 
					   function getResult4(res,obj){
						   res=res.item[0];
						   azjhflag=1;
					
							var newDate=Ext.getCmp('ZT_MTMT_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Adjustable_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_JJJXPJ_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Examine_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_CP_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CP_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CP_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);

							
							var newDate=Ext.getCmp('ZT_DTTS_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_START_TIME_TWO').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_CJ_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_END_TIME_TWO').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							azjhflag=0;
		   
					   }
					 //报调日期
					   function getResult5(res,obj){
						   res=res.item[0];
						   azjhflag=1;
						   
							var newDate=Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Examine_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_CP_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CP_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CP_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_DTTS_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_START_TIME_TWO').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_CJ_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_END_TIME_TWO').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							
							azjhflag=0;
					   }
					 //报检日期
					   function getResult6(res,obj){
						   res=res.item[0];
						   azjhflag=1;
					
							var newDate=Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Accept_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CP_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DKSB_END_TIME').setValue(newDate_str);
							
							var newDate=Ext.getCmp('ZT_CP_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);
								
							
							var newDate=Ext.getCmp('ZT_DTTS_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_START_TIME_TWO').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_CJ_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_END_TIME_TWO').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							
							azjhflag=0;
					   }
					   //验收完成日期
					   function getResult7(res,obj){
						   res=res.item[0];
						   azjhflag=1;
					
							var newDate=Ext.getCmp('ZT_CP_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue(newDate_str);
							//Ext.getCmp('ZT_DTTS_END_TIME').setValue(newDate_str);
						
							var newDate=Ext.getCmp('ZT_DTTS_START_TIME_TWO').getValue();
							var date = new Date(newDate.replace(/-/g,"/"));
							date.setDate(date.getDate()+30);
							var newDate_str = Ext.Date.format(date,'Y-m-d');
							Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue(newDate_str);
										
							var startDay;
							var startEnd;
							var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_START_TIME_TWO').setValue(PJDS_start);
							startDay=PJDS_start;
							var newDateS=Ext.getCmp('ZT_CJ_START_TIME_TWO').getValue();
							Ext.getCmp('ZGQ_END_TIME_TWO').setValue(newDateS);
							startEnd=newDateS;
							var Zday=DateDiff(startDay.trim(),startEnd.trim());
							if(plnum==0){
									//计划总天数
									var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							}else if(plnum==1){
									var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							azjhflag=0;
		   
					   }
					   //
					   
					   
					};
				}else if(obj.getId()=='ZT_CJ_START_TIME_TWO'&&azjhflag==0){
					if(newDate!=''){
						if(Ext.getCmp("ZT_DTTS_START_TIME_TWO").getValue()==null||Ext.getCmp("ZT_DTTS_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}

						var qssj=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
						Ext.getCmp('ZGQ_START_TIME_TWO').setValue(qssj);
						Ext.getCmp('ZGQ_END_TIME_TWO').setValue(newDate);
						//nameDate_H.setDisabled(false);
						
						var startDay;
						var startEnd;
						var PJDS_start=Ext.getCmp('ZT_PJDS_START_TIME_TWO').getValue();
						startDay=PJDS_start;
						var newDateS=Ext.getCmp('ZT_CJ_START_TIME_TWO').getValue();
						startEnd=newDateS;
						var Zday=DateDiff(startDay.trim(),startEnd.trim());
						if(plnum==0){
								//计划总天数
								var titleWJC=document.getElementById("install_azihxx_zgq_zt_HP_TWO");
								titleWJC.innerHTML='总工期('+Zday+'天)';
						}else if(plnum==1){
								var titleWJC=document.getElementById("install_azihxx_zgq_ZT_T_TWO");
								titleWJC.innerHTML='总工期('+Zday+'天)';
						};
					}
				}
			}else if('扶梯'==lx){

				if(obj.getId()=='FT_TS_START_TIME_TWO'&&azjhflag==0){
					//样架
					if(newDate!=''){	
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_CJ_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_ZJ_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_bjaz_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_dldy_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_bt_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_bj_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_yswc_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_jj_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_wg_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_TS_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME_TWO").getValue()==null||Ext.getCmp("FT_wg_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
 
						
					};
				}else if(obj.getId()=='FT_CJ_START_TIME_TWO'&&azjhflag==0){
					//玻璃	
					if(newDate!=''){
						
						
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_ZJ_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_bjaz_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_dldy_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_bt_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_bj_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_yswc_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_jj_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_wg_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_CJ_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME_TWO").getValue()==null||Ext.getCmp("FT_wg_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
												

					};
				}else if(obj.getId()=='FT_ZJ_START_TIME_TWO'&&azjhflag==0){
					//扶手
//					if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入完工时间！");
//						return;
//					}
					if(newDate!=''){
						
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_bjaz_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_dldy_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_bt_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_bj_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_yswc_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_jj_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_wg_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_ZJ_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME_TWO").getValue()==null||Ext.getCmp("FT_wg_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
						
					};
					
				}else if(obj.getId()=='FT_bjaz_START_TIME_TWO'&&azjhflag==0){
					//步级
//					if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入完工时间！");
//						return;
//					}
					if(newDate!=''){
						
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_dldy_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_bt_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_bj_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_yswc_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_jj_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_wg_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_bjaz_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME_TWO").getValue()==null||Ext.getCmp("FT_wg_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
						
					};
					
				}else if(obj.getId()=='FT_dldy_START_TIME_TWO'&&azjhflag==0){
					//动力电源
//					if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入完工时间！");
//						return;
//					}
					if(newDate!=''){
						
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_bt_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_bj_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_yswc_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_jj_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_wg_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_dldy_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME_TWO").getValue()==null||Ext.getCmp("FT_wg_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						

					};
					
				}else if(obj.getId()=='FT_bt_START_TIME_TWO'&&azjhflag==0){
					//报调
//					if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入完工时间！");
//						return;
//					}
					if(newDate!=''){
						
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_bj_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_yswc_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_jj_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_wg_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_bt_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME_TWO").getValue()==null||Ext.getCmp("FT_wg_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
							
					
					};
					
				}else if(obj.getId()=='FT_bj_START_TIME_TWO'&&azjhflag==0){
					//报检
					if(Ext.getCmp("FT_wg_START_TIME_TWO").getValue()==null||Ext.getCmp("FT_wg_START_TIME_TWO").getValue()=="")
					{
						Ext.Msg.alert("请输入完工时间！");
						return;
					}
					if(newDate!=''){
						
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_yswc_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_jj_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_wg_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_bj_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME_TWO").getValue()==null||Ext.getCmp("FT_wg_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
					
					};
					
				}else if(obj.getId()=='FT_yswc_START_TIME_TWO'&&azjhflag==0){
					//验收
//					if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入完工时间！");
//						return;
//					}
					if(newDate!=''){
						
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_jj_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_wg_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_yswc_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME_TWO").getValue()==null||Ext.getCmp("FT_wg_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
					 
					};
					
				}else if(obj.getId()=='FT_jj_START_TIME_TWO'&&azjhflag==0){
					//技检
//					if(Ext.getCmp("FT_wg_START_TIME").getValue()==null||Ext.getCmp("FT_wg_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入完工时间！");
//						return;
//					}
					if(newDate!=''){
						//清空日期
						azjhflag=1;
						Ext.getCmp('FT_wg_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue('');
						Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue('');
						Ext.getCmp('anjh_node').setValue('FT_jj_START_TIME_TWO');
						azjhflag=0;
						
						if(Ext.getCmp("FT_wg_START_TIME_TWO").getValue()==null||Ext.getCmp("FT_wg_START_TIME_TWO").getValue()=="")
						{
							Ext.Msg.alert("请输入完工时间！");
							return;
						}
						
					};
					
				}else if(obj.getId()=='FT_wg_START_TIME_TWO'&&azjhflag==0){
				
					//完工
//					if(Ext.getCmp("FT_AZ_START_TIME").getValue()==null||Ext.getCmp("FT_AZ_START_TIME").getValue()=="")
//					{
//						Ext.Msg.alert("请输入进场时间！");
//						return;
//					}
					//进场
					if(newDate!=''){	
						var node =Ext.getCmp('anjh_node').getValue();
						console.log('anjh_node',node);
						if(node=='FT_AZ_START_TIME_TWO'){
							var st=Ext.getCmp('FT_AZ_START_TIME_TWO').getValue();
							//var endd=Ext.getCmp("FT_wg_START_TIME").getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C1";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult18,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						 //样架   
						}else if(node=='FT_TS_START_TIME_TWO'){

							var st=Ext.getCmp('FT_TS_START_TIME_TWO').getValue();
							//var endd=Ext.getCmp("FT_wg_START_TIME").getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C2";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult10,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						   
							
						//玻璃	
						}else if(node=='FT_CJ_START_TIME_TWO'){
							var st=Ext.getCmp('FT_CJ_START_TIME_TWO').getValue();
							//var endd=Ext.getCmp("FT_wg_START_TIME").getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C3";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult11,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	

						//扶手	
						}else if(node=='FT_ZJ_START_TIME_TWO'){
							var st=Ext.getCmp('FT_ZJ_START_TIME_TWO').getValue();
							//var endd=Ext.getCmp("FT_wg_START_TIME").getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C4";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult12,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						    
							
						}else if(node=='FT_bjaz_START_TIME_TWO'){
							var st=Ext.getCmp('FT_ZJ_START_TIME_TWO').getValue();
							//var endd=Ext.getCmp("FT_wg_START_TIME").getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C5";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult13,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						    
							
							
						}else if(node=='FT_dldy_START_TIME_TWO'){
							var st=Ext.getCmp('FT_dldy_START_TIME_TWO').getValue();
							//var endd=Ext.getCmp("FT_wg_START_TIME").getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C6";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult14,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						    
							
						}else if(node=='FT_bt_START_TIME_TWO'){
							
							
							var st=Ext.getCmp('FT_bt_START_TIME_TWO').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C7";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult15,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						    
							
							
						}else if(node=='FT_bj_START_TIME_TWO'){
							
							var st=Ext.getCmp('FT_bj_START_TIME_TWO').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C8";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult16,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						    
							
						}else if(node=='FT_yswc_START_TIME_TWO'){
							
							var st=Ext.getCmp('FT_yswc_START_TIME_TWO').getValue();
							var day=DateDiff(st.trim(),newDate.trim());
							var params={};
						    params.gongfa="P3";
						    params.gongxu="C9";
						    params.day=day;
						    
						    this.connectServerMainTain(getResult17,obj,"installPlanAction.do?method=getInstallPlanDay",JSON.stringify(params));	
						   
						}else if(node=='FT_jj_START_TIME_TWO'){
							azjhflag=1;
							var newdate =Ext.getCmp('FT_wg_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue(newDate_st);
						    
							//总工期
							var startDay=Ext.getCmp('FT_AZ_START_TIME_TWO').getValue();
							Ext.getCmp('FT_ZGQ_START_TIME_TWO').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME_TWO').getValue();
							var startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue(newDate_st);
							
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							
							 azjhflag=0;
						
						}
						console.log('day',day,node);
						function getResult17(res,obj){
						    res =res.item[0];
						    azjhflag=1;
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
							
							var startEnd;	
							var startDay=Ext.getCmp("FT_AZ_START_TIME_TWO").getValue();
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME_TWO').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME_TWO').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							 azjhflag=0;
						  }
						
						
						
						function getResult16(res,obj){
						    res =res.item[0];
						    azjhflag=1;
							//验收
							var newdate =Ext.getCmp('FT_bj_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yswc_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
								
							var startDay=Ext.getCmp("FT_AZ_START_TIME_TWO").getValue();
							var startEnd;
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME_TWO').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME_TWO').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							 azjhflag=0;
						  }
						
						
						function getResult15(res,obj){
						    res =res.item[0];
						    azjhflag=1;
							//报检
							var newdate =Ext.getCmp('FT_bt_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Examine_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bj_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_bj_END_TIME').setValue(newDate_st);
							//验收
							var newdate =Ext.getCmp('FT_bj_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yswc_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
								
							var startDay=Ext.getCmp("FT_AZ_START_TIME_TWO").getValue();
							var startEnd;
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME_TWO').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME_TWO').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							 azjhflag=0;
						  }
						
						
						function getResult14(res,obj){
						    res =res.item[0];
						    azjhflag=1;
							//报调
							var newdate =Ext.getCmp('FT_dldy_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Adjustable_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bt_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_bt_END_TIME').setValue(newDate_st);
							//报检
							var newdate =Ext.getCmp('FT_bt_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Examine_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bj_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_bj_END_TIME').setValue(newDate_st);
							//验收
							var newdate =Ext.getCmp('FT_bj_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yswc_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
								
							var startDay=Ext.getCmp("FT_AZ_START_TIME_TWO").getValue();
							var startEnd;
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME_TWO').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME_TWO').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};

							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							 azjhflag=0;
						  }
						
						function getResult13(res,obj){
						    res =res.item[0];
						    azjhflag=1;
							//动力电源
							var newdate =Ext.getCmp('FT_bjaz_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_dldy_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_dldy_END_TIME').setValue(newDate_st);
							//报调
							var newdate =Ext.getCmp('FT_dldy_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Adjustable_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bt_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_bt_END_TIME').setValue(newDate_st);
							//报检
							var newdate =Ext.getCmp('FT_bt_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Examine_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bj_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_bj_END_TIME').setValue(newDate_st);
							//验收
							var newdate =Ext.getCmp('FT_bj_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yswc_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
								
							var startDay=Ext.getCmp("FT_AZ_START_TIME_TWO").getValue();
							var startEnd;
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME_TWO').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							 azjhflag=0;
						  }
				
					    function getResult18(res,obj){
					    console.log("0629");
					    res =res.item[0];
					    azjhflag=1;
					    //样架
						var newDate=Ext.getCmp('FT_AZ_START_TIME_TWO').getValue();
						var date_temp = new Date(newDate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Girder_Time));
						var newDate_str = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_TS_START_TIME_TWO').setValue(newDate_str);
						//Ext.getCmp('FT_TS_END_TIME').setValue(newDate_str);
						
						//玻璃
						var newdate=Ext.getCmp('FT_TS_START_TIME_TWO').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Glass_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_CJ_START_TIME_TWO').setValue(newDate_st);
						//Ext.getCmp('FT_CJ_END_TIME').setValue(newDate_st);
						
						//扶手
						var newdate=Ext.getCmp('FT_CJ_START_TIME_TWO').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Handrail_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_ZJ_START_TIME_TWO').setValue(newDate_st);
						
						//步级
						var newdate =Ext.getCmp('FT_ZJ_START_TIME_TWO').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Stairs_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_bjaz_START_TIME_TWO').setValue(newDate_st);
						//Ext.getCmp('FT_bjaz_END_TIME').setValue(newDate_st);
						//动力电源
						var newdate =Ext.getCmp('FT_bjaz_START_TIME_TWO').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_dldy_START_TIME_TWO').setValue(newDate_st);
						//Ext.getCmp('FT_dldy_END_TIME').setValue(newDate_st);
						//报调
						var newdate =Ext.getCmp('FT_dldy_START_TIME_TWO').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Adjustable_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_bt_START_TIME_TWO').setValue(newDate_st);
						//Ext.getCmp('FT_bt_END_TIME').setValue(newDate_st);
						//报检
						var newdate =Ext.getCmp('FT_bt_START_TIME_TWO').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Examine_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_bj_START_TIME_TWO').setValue(newDate_st);
						//Ext.getCmp('FT_bj_END_TIME').setValue(newDate_st);
						//验收
						var newdate =Ext.getCmp('FT_bj_START_TIME_TWO').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_yswc_START_TIME_TWO').setValue(newDate_st);
						//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
						//技检
						var newdate =Ext.getCmp('FT_yswc_START_TIME_TWO').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_jj_START_TIME_TWO').setValue(newDate_st);
				

						
						//移交客户
						var newdate =Ext.getCmp('FT_wg_START_TIME_TWO').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+30);
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue(newDate_st);
				
							
						var startDay=Ext.getCmp("FT_AZ_START_TIME_TWO").getValue();
						var startEnd;
						//总工期
						Ext.getCmp('FT_ZGQ_START_TIME_TWO').setValue(startDay);
						var newdate = Ext.getCmp('FT_yjkh_START_TIME_TWO').getValue();
						 startEnd =newdate;
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue(newDate_st);
						
						//提交按钮
							//解除限制
						if(plnum==1){
							var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
							H_TIME.setDisabled(false);
							
							var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
							nview2.initDataEnd();
							
							if(startDay==''||startEnd==''){
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							
							
						}else if(plnum==0){
							var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
							H_TIME.setDisabled(false);	
							
							var nview = Ext.getCmp('installplan_AZJHXXHomePage');
							nview.initDataEnd();
							
							if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
						};	
						 azjhflag=0;
						 console.log('Zday',Zday,'startEnd',startEnd);
					  }
					    
					    function getResult10(res,obj){
						    //alert("ss"+JSON.stringify(res));	
						    res =res.item[0];
						    azjhflag=1;
							//玻璃
							var newdate=Ext.getCmp('FT_TS_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Glass_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_CJ_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_CJ_END_TIME').setValue(newDate_st);
							
							//扶手
							var newdate=Ext.getCmp('FT_CJ_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Handrail_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZJ_START_TIME_TWO').setValue(newDate_st);
							
							//步级
							var newdate =Ext.getCmp('FT_ZJ_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Stairs_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bjaz_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_bjaz_END_TIME').setValue(newDate_st);
							//动力电源
							var newdate =Ext.getCmp('FT_bjaz_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_dldy_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_dldy_END_TIME').setValue(newDate_st);
							//报调
							var newdate =Ext.getCmp('FT_dldy_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Adjustable_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bt_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_bt_END_TIME').setValue(newDate_st);
							//报检
							var newdate =Ext.getCmp('FT_bt_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Examine_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bj_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_bj_END_TIME').setValue(newDate_st);
							//验收
							var newdate =Ext.getCmp('FT_bj_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yswc_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
								
							var startDay=Ext.getCmp("FT_AZ_START_TIME_TWO").getValue();
							var startEnd;
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME_TWO').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME_TWO').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							azjhflag=0;
						  }
					    
					    function getResult11(res,obj){
						    res =res.item[0];
						    azjhflag=1;
							//扶手
							var newdate=Ext.getCmp('FT_CJ_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Handrail_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZJ_START_TIME_TWO').setValue(newDate_st);
							
							//步级
							var newdate =Ext.getCmp('FT_ZJ_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Stairs_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bjaz_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_bjaz_END_TIME').setValue(newDate_st);
							//动力电源
							var newdate =Ext.getCmp('FT_bjaz_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_dldy_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_dldy_END_TIME').setValue(newDate_st);
							//报调
							var newdate =Ext.getCmp('FT_dldy_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Adjustable_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bt_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_bt_END_TIME').setValue(newDate_st);
							//报检
							var newdate =Ext.getCmp('FT_bt_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Examine_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bj_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_bj_END_TIME').setValue(newDate_st);
							//验收
							var newdate =Ext.getCmp('FT_bj_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yswc_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
								
							var startDay=Ext.getCmp("FT_AZ_START_TIME_TWO").getValue();
							var startEnd;
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME_TWO').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME_TWO').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							 azjhflag=0;
						  }
					    
					    function getResult12(res,obj){
						    res =res.item[0];
						    azjhflag=1;
							
							//步级
							var newdate =Ext.getCmp('FT_ZJ_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Stairs_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bjaz_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_bjaz_END_TIME').setValue(newDate_st);
							//动力电源
							var newdate =Ext.getCmp('FT_bjaz_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_dldy_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_dldy_END_TIME').setValue(newDate_st);
							//报调
							var newdate =Ext.getCmp('FT_dldy_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Adjustable_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bt_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_bt_END_TIME').setValue(newDate_st);
							//报检
							var newdate =Ext.getCmp('FT_bt_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Examine_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_bj_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_bj_END_TIME').setValue(newDate_st);
							//验收
							var newdate =Ext.getCmp('FT_bj_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Accept_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yswc_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_yswc_END_TIME').setValue(newDate_st);
							//技检
							var newdate =Ext.getCmp('FT_yswc_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+parseInt(res.Technical_Check_Time));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_jj_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_jj_END_TIME').setValue(newDate_st);
//							//完工
//							var newdate =Ext.getCmp('FT_jj_START_TIME').getValue();
//							var date_temp = new Date(newdate.replace(/-/g,"/"));
//							date_temp.setDate(date_temp.getDate()+parseInt(res.Completion_Time));
//							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
//							Ext.getCmp('FT_wg_START_TIME').setValue(newdate);
//							//Ext.getCmp('FT_wg_END_TIME').setValue(newDate_st);
							//移交客户
							var newdate =Ext.getCmp('FT_wg_START_TIME_TWO').getValue();
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							date_temp.setDate(date_temp.getDate()+30);
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue(newDate_st);
							//Ext.getCmp('FT_yjkh_END_TIME').setValue(newDate_st);
								
							var startDay=Ext.getCmp("FT_AZ_START_TIME_TWO").getValue();
							var startEnd;
							//总工期
							Ext.getCmp('FT_ZGQ_START_TIME_TWO').setValue(startDay);
							var newdate = Ext.getCmp('FT_yjkh_START_TIME_TWO').getValue();
							startEnd =newdate;
							var date_temp = new Date(newdate.replace(/-/g,"/"));
							var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
							Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue(newDate_st);
							
							//提交按钮
								//解除限制
							if(plnum==1){
								var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
								H_TIME.setDisabled(false);
								
								var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
								nview2.initDataEnd();
								
								if(startDay==''||startEnd==''){
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
								
								
							}else if(plnum==0){
								var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
								H_TIME.setDisabled(false);	
								
								var nview = Ext.getCmp('installplan_AZJHXXHomePage');
								nview.initDataEnd();
								
								if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期';
								}else{
									//计划总天数
									var Zday=DateDiff(startDay.trim(),startEnd.trim());
									var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
									titleWJC.innerHTML='总工期('+Zday+'天)';
								};
							};	
							 azjhflag=0;
						  }
					    
					    
					};
					
				}else if(obj.getId()=='FT_yjkh_START_TIME_TWO'&&azjhflag==0){
					//移交客户
					if(Ext.getCmp("FT_wg_START_TIME_TWO").getValue()==null||Ext.getCmp("FT_wg_START_TIME_TWO").getValue()=="")
					{
						Ext.Msg.alert("请输入完工时间！");
						return;
					}
					if(newDate!=''){
						var startDay=Ext.getCmp("FT_AZ_START_TIME_TWO").getValue();
						//总工期
						Ext.getCmp('FT_ZGQ_START_TIME_TWO').setValue(startDay);
						var newdate = Ext.getCmp('FT_yjkh_START_TIME_TWO').getValue();
						startEnd =newdate;
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue(newDate_st);
						
						//提交按钮
							//解除限制
						if(plnum==1){
							var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
							H_TIME.setDisabled(false);
							
							var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
							nview2.initDataEnd();
							
							if(startDay==''||startEnd==''){
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							
							
						}else if(plnum==0){
							var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
							H_TIME.setDisabled(false);	
							
							var nview = Ext.getCmp('installplan_AZJHXXHomePage');
							nview.initDataEnd();
							
							if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
						};	
					};
					
				}
	
			}else if('ITM'==lx){
				if(obj.getId()=='ITM_WG_START_TIME_TWO'&&azjhflag==0){
					//移交客户
					if(Ext.getCmp("ITM_JC_START_TIME_TWO").getValue()==null||Ext.getCmp("ITM_JC_START_TIME_TWO").getValue()=="")
					{
						Ext.Msg.alert("请输入进场时间！");
						return;
					}
					if(newDate!=''){
					
						//移交客户
						var newdate =Ext.getCmp('ITM_WG_START_TIME_TWO').getValue();
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						date_temp.setDate(date_temp.getDate()+30);
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('ITM_YJKH_START_TIME_TWO').setValue(newDate_st);
						
						
						var startDay=Ext.getCmp("ITM_JC_START_TIME_TWO").getValue();
						//总工期
						Ext.getCmp('ITM_ZGQ_START_TIME_TWO').setValue(startDay);
						var newdate = Ext.getCmp('ITM_YJKH_START_TIME_TWO').getValue();
						startEnd =newdate;
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('ITM_ZGQ_END_TIME_TWO').setValue(newDate_st);
						
						//提交按钮
							//解除限制
						if(plnum==1){
							var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
							H_TIME.setDisabled(false);
							
							var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
							nview2.initDataEnd();
							
							if(startDay==''||startEnd==''){
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							
							
						}else if(plnum==0){
							var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
							H_TIME.setDisabled(false);	
							
							var nview = Ext.getCmp('installplan_AZJHXXHomePage');
							nview.initDataEnd();
							
							if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
						};	
					};
					
				}else if(obj.getId()=='ITM_YJKH_TIME_TWO'&&azjhflag==0){
					//移交客户
					if(Ext.getCmp("ITM_WG_START_TIME_TWO").getValue()==null||Ext.getCmp("ITM_WG_START_TIME_TWO").getValue()=="")
					{
						Ext.Msg.alert("请输入完工时间！");
						return;
					}
					if(newDate!=''){
						var startDay=Ext.getCmp("ITM_JC_START_TIME_TWO").getValue();
						//总工期
						Ext.getCmp('ITM_ZGQ_END_TIME_TWO').setValue(startDay);
						var newdate = Ext.getCmp('ITM_YJKH_START_TIME_TWO').getValue();
						startEnd =newdate;
						var date_temp = new Date(newdate.replace(/-/g,"/"));
						var newDate_st = Ext.Date.format(date_temp,'Y-m-d');
						Ext.getCmp('ITM_ZGQ_END_TIME_TWO').setValue(newDate_st);
						
						//提交按钮
							//解除限制
						if(plnum==1){
							var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
							H_TIME.setDisabled(false);
							
							var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
							nview2.initDataEnd();
							
							if(startDay==''||startEnd==''){
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
							
							
						}else if(plnum==0){
							var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
							H_TIME.setDisabled(false);	
							
							var nview = Ext.getCmp('installplan_AZJHXXHomePage');
							nview.initDataEnd();
							
							if(startDay==''||startEnd==''||startDay==undefined||startEnd==undefined){
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
								titleWJC.innerHTML='总工期';
							}else{
								//计划总天数
								var Zday=DateDiff(startDay.trim(),startEnd.trim());
								var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
								titleWJC.innerHTML='总工期('+Zday+'天)';
							};
						};	
					};
					
				}
			};
			
			//时间控件修改  解除封锁
			if(plnum==0){
				var nview = Ext.getCmp('installplan_AZJHXXHomePage');
				nview.initDataEnd();
			}else if(plnum==1){
				var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
				nview2.initDataEnd();
			};
		////flag底部	
		}else{
		};
	},
	
	//批量   录入数据   扶梯  起始时间
	FT_AZ_START_TIME_TWO:function(){
		var flag=Ext.getCmp('FLAG').getValue();
		
		//判断是批量还是单个
		var  plnum=Ext.getCmp('plnum').getValue();
		
		//alert('进入扶梯的时间'+flag);
		if(flag==1){
			//alert('进入扶梯的时间2');
			//添加限制  
 			if(plnum==0){
				var nview = Ext.getCmp('installplan_AZJHXXHomePage');
				nview.initData();
			}else if(plnum==1){
				var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
				nview2.initData();
			};
			var startDay='';
			var startEnd='';
			//安装
			var PJDS_start=Ext.getCmp('FT_AZ_START_TIME_TWO').getValue();
			if(PJDS_start==''){
				/*//安装
				Ext.getCmp('FT_AZ_START_TIME_TWO').getValue();
				Ext.getCmp('FT_AZ_END_TIME_TWO').setValue(date_temp);
				//调试
				Ext.getCmp('FT_TS_START_TIME_TWO').setValue(date_temp);
				Ext.getCmp('FT_TS_END_TIME_TWO').setValue(date_temp);
				//厂检
				Ext.getCmp('FT_CJ_START_TIME_TWO').setValue(date_temp);
				Ext.getCmp('FT_CJ_END_TIME_TWO').setValue(date_temp);
				//政府检
				Ext.getCmp('FT_ZJ_START_TIME_TWO').setValue(date_temp);
				Ext.getCmp('FT_ZJ_END_TIME_TWO').setValue(date_temp);
				//总工期
				Ext.getCmp('FT_ZGQ_START_TIME_TWO').setValue(PJDS_start);
				Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue(date_temp);
				
				var titleWJC=document.getElementById("install_azihxx_zgq_FT_T_TWO");
				titleWJC.innerHTML='总工期';*/
			}else if(PJDS_start!=''){
				//清空其他日期 06 05
				azjhflag=1;
				Ext.getCmp('FT_TS_START_TIME_TWO').setValue('');
				Ext.getCmp('FT_CJ_START_TIME_TWO').setValue('');
				Ext.getCmp('FT_ZJ_START_TIME_TWO').setValue('');
				Ext.getCmp('FT_bjaz_START_TIME_TWO').setValue('');
				Ext.getCmp('FT_dldy_START_TIME_TWO').setValue('');
				Ext.getCmp('FT_bt_START_TIME_TWO').setValue('');
				Ext.getCmp('FT_bj_START_TIME_TWO').setValue('');
				Ext.getCmp('FT_yswc_START_TIME_TWO').setValue('');
				Ext.getCmp('FT_jj_START_TIME_TWO').setValue('');
				Ext.getCmp('FT_wg_START_TIME_TWO').setValue('');
				Ext.getCmp('FT_yjkh_START_TIME_TWO').setValue('');
				Ext.getCmp('FT_ZGQ_START_TIME_TWO').setValue(PJDS_start);
				Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue('');
				Ext.getCmp('anjh_node').setValue('FT_AZ_START_TIME_TWO');
				azjhflag=0;
				
				if(Ext.getCmp("FT_wg_START_TIME_TWO").getValue()==null||Ext.getCmp("FT_wg_START_TIME_TWO").getValue()=="")
				{
					Ext.Msg.alert("请输入完工时间！");
					return;
				}
			
			};
			
			//解除结束时间的封锁
			/**/
			var H_TIME=Ext.getCmp('FT_AZ_END_TIME_TWO');
			H_TIME.setDisabled(false);
	
			var H_TIME=Ext.getCmp('FT_TS_END_TIME_TWO');
				H_TIME.setDisabled(false);
		
			var H_TIME=Ext.getCmp('FT_CJ_END_TIME_TWO');
				H_TIME.setDisabled(false);
		
			var H_TIME=Ext.getCmp('FT_ZJ_END_TIME_TWO');
				H_TIME.setDisabled(false);
				
			//提交按钮
				//解除限制
			if(plnum==1){
				var H_TIME=Ext.getCmp('installplan_AZJHXXTimes_TJ_Button');
				H_TIME.setDisabled(false);
				
				var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
				nview2.initDataEnd();
				
			}/*else if(plnum==0){
				var H_TIME=Ext.getCmp('instalPlan_HomePage_TJ_Button');
				H_TIME.setDisabled(false);	
				
				var nview = Ext.getCmp('installplan_AZJHXXHomePage');
				nview.initDataEnd();
				
				
				//计划总天数
				var Zday=DateDiff(startDay.trim(),startEnd.trim());
				var titleWJC=document.getElementById("install_azihxx_zgq_ft_HP_TWO");
				titleWJC.innerHTML='总工期('+Zday+'天)';
				
			}*/;	
				
			//修改获取的时间
			/*function instalPlan_HP(time){
				var date=new Date(time);
				var newmonth=date.getMonth()+1;
				var newday=date.getDate();
				if(newmonth<10){
					newmonth='0'+newmonth; 
				};
				if(newday<10){
					newday='0'+newday;
				};
				var newdate=date.getFullYear()+"-"+newmonth+"-"+newday;
				return newdate;
			};*/
		}else{
			
		};
	},
	
	/**
	  **安装计划  批量页面
      ************************************************************************************/	
	


	/************************************************************************************
	 * 安装计划与实绩 页面
	 * */

	//安装计划与实绩页面  返回按钮
	InstallPlanSJ_id_FH_Button:function(){
		this.showBackView("installplan_AZJHXXHomePage","HelcPDA.view.install.installplan.InstallPlanAZJHXXHomePage");
	},
	
	/**
	 **安装计划与实绩 页面
	 ************************************************************************************/

	

	
	
	

	
	/**
	 * 安装计划详细 首页
	 * 2014-5-6 xcx
	 */
	
	/*//进入返回的修改  2014-6-9
	fanhuiXiuGai:function(){
		if (installTcode == 'installplanfalse') {
			//跳转到安装计划查询页面
			//this.showNextView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
			
			var MaintList=Ext.data.StoreManager.get('HelIntTasksAllStore');
			if (!MaintList) { 
				MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStore"); 
			};
			var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
			if (!MaintList2) { 
				MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
			};
			//先清空数据仓
			var record=[];
			MaintList2.setData(record, this);
			
			var recordData=[];
			
			//获取要查询的合同号
			
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	var query={tcode:installTcode,tid:PLselectHTH};
			var options={
				exacte:false,//默认
			};
			var ZT;//状态
	    	MaintainList.find(query,options).then(function(arrayResults){
	    		var num=arrayResults.length;
	    		console.log('instalPlanMylist7拥有的台数: '+num);
	    		for(var i=0;i<num;i++){
	    			var data=arrayResults[i].json.stext;
	    			var dataVN=data.VERSION_NUM;
	    			var dataBBH=data.VERSION_NUM;
	    			if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
	    				ZT='未计划';
	    				dataBBH='无';
	    			}else{
	    				ZT='已计划';
	    			};
	    			//工号     批次    类型  版本号  状态（未计划，已计划）合同号
	    			var trim={ELEVATOR_NO:data.ELEVATOR_NO,SEQ_NUM:data.SEQ_NUM,ELEVATOR_CLASS_NAME:data.ELEVATOR_CLASS_NAME,VERSION_NUM:dataBBH,STATUS:ZT,ENGCONTRACT_NUMBER:data.ENGCONTRACT_NUMBER};
	    			recordData[i]=trim;
	    			console.log(JSON.stringify(trim));
	    		};
	    		MaintList2.setData(recordData, this);
	    	}).fail(function(errorObject){
				console.log("查询数据失败");
			});
		} else if (installTcode == 'installplantrue') {
			//跳转到安装计划查询页面
		//	this.showNextView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
			
			var MaintList=Ext.data.StoreManager.get('HelIntTasksAllStoreThree');
			if (!MaintList) { 
				MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreThree"); 
			};
			var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
			if (!MaintList2) { 
				MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
			};
			//先清空数据仓
			var record=[];
			MaintList2.setData(record, this);
			
			var recordData=[];
			//获取要查询的合同号
		//	var HT=MaintList.getAt(index).get('ENGCONTRACT_NUMBER');
			
		//	PLselectHTH=HT;
			
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	var query={tcode:installTcode,tid:PLselectHTH};
			var options={
				exacte:false,//默认
			};
			var ZT;//状态
	    	MaintainList.find(query,options).then(function(arrayResults){
	    		var num=arrayResults.length;
	    		console.log('instalPlanMylist7拥有的台数: '+num);
	    		for(var i=0;i<num;i++){
	    			var data=arrayResults[i].json.stext;
	    			var dataVN=data.VERSION_NUM;
	    			var dataBBH=data.VERSION_NUM;
	    			if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
	    				ZT='未计划';
	    				dataBBH='无';
	    			}else{
	    				ZT='已计划';
	    			};
	    			//工号     批次    类型  版本号  状态（未计划，已计划）  合同号
	    			var trim={ELEVATOR_NO:data.ELEVATOR_NO,SEQ_NUM:data.SEQ_NUM,ELEVATOR_CLASS_NAME:data.ELEVATOR_CLASS_NAME,VERSION_NUM:dataBBH,STATUS:ZT,ENGCONTRACT_NUMBER:data.ENGCONTRACT_NUMBER};
	    			recordData[i]=trim;
	    			console.log(JSON.stringify(trim));
	    		};
	    		MaintList2.setData(recordData, this);
	    	}).fail(function(errorObject){
				console.log("查询数据失败");
			});
		};
		
		if(PLtzType=='直梯'){
			install_QingKongShiJianKongJian_ZT();
		}else if(PLtzType=='扶梯'){
			install_QingKongShiJianKongJian_FT();
		};
		
		//obj.showNextView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
		var sele=document.getElementsByName('installPlangroupCheckbox');
		console.log(sele.length);
		  // 遍历 form  
	    for ( var i = 0; i <sele.length; i++)  
	    {  
	      // 提取控件  
	      var checkbox = sele[i];  
	      // 检查是否是指定的控件  
	      if (checkbox.name === "installPlangroupCheckbox" && checkbox.type === "checkbox"){  
	        checkbox.checked = false;  
	      };  
	    };
	},*/
	
	

	

	
/*	//录入数据  提交  结果
	instalPlan_HomePage_TJ_Button_JG:function(result,obj){
		WL.Toast.show(result.msginfo);
		console.log(result.msginfo);
		plnum=0;
		
		if(result.msginfo!='保存成功'){
			return;
		};
		
		obj.install_modificationANDshow(obj);
	},*/
	
	
	//安装计划的刷新方法    2014-6-24
	LoadGHlist:function(HT){
		//未进场和在制的判断
		var installTcode=Ext.getCmp('installTcode').getValue();
		
		obj=this;
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:installTcode,tid:HT};
		var options={
			exacte:false,//默认
		};
		var ZT;//状态
    	MaintainList.find(query,options).then(function(arrayResults){
    		var num=arrayResults.length;
    		console.log('instalPlanMylist7拥有的台数: '+num);
    		var recordData = [];
    		for(var i=0;i<num;i++){
    			var data=arrayResults[i].json.stext;
    			var dataVN=data.VERSION_NUM;
    			var dataBBH=data.VERSION_NUM;
    			if (arrayResults[i].json.status == 1) {
    				ZT='已进入待提交列表';
    			} else {
    				if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
	    				ZT='未计划';
	    				dataBBH='无';
	    			}else{
	    				ZT='已计划';
	    			};
    			}
    			//工号     批次    类型  版本号  状态（未计划，已计划）合同号
    			var trim={ELEVATOR_NO:data.ELEVATOR_NO,SEQ_NUM:data.SEQ_NUM,
    					ELEVATOR_CLASS_NAME:data.ELEVATOR_CLASS_NAME,
    					VERSION_NUM:dataBBH,STATUS:ZT,ENGCONTRACT_NUMBER:data.ENGCONTRACT_NUMBER,
    					TASK_PROCESS_ID:data.TASK_PROCESS_ID,TASK_ID:data.TASK_ID};
    			recordData[i]=trim;
    			console.log(JSON.stringify(trim));
    		};
    		var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
			if (!MaintList2) { 
				MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
			};
    		MaintList2.setData(recordData, this);
    	}).fail(function(errorObject){
			console.log("查询数据失败");
		});
	},
	
	
	

	
	//录入数据批量  提交  结果    不用了
	instalPlan_HomePage_TJ_Button_JGDG:function(result,obj){
		WL.Toast.show(result.msginfo);
		console.log(result.msginfo);
		var plnum=1;
		//判断是批量还是单个
		Ext.getCmp('plnum').setValue(plnum);
		
		if(result.msginfo!='保存成功'){
			return;
		};
		//修改JSONStore
		obj.install_modificationANDshowDG(obj);
	},
	
	
	//提交单个后修改JSONStore数据的方法       不用了
	install_modificationANDshow:function(obj){
		//未进场和在制的判断
		var installTcode=Ext.getCmp('installTcode').getValue();
		
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
		var options={
			exacte:false,//默认
		};
		
		//用于提交按钮的 合同号
		var PLselectHTH=Ext.getCmp('PLselectHTH').getValue();
		//用于批量判断是否直梯和扶梯
		var PLtzType=Ext.getCmp('PLtzType').getValue();
		//批量添加 用的数组
		var INSTALLPLTJ=Ext.getCmp('INSTALLPLTJ').getValue();
		INSTALLPLTJ=eval("("+ INSTALLPLTJ +")");
		
		//单个添加 用的JSONStore条件
    	var installaddDGTJ=Ext.getCmp('installaddDGTJ').getValue();
		
    	MaintainList.find(installaddDGTJ,options).then(function(arrayResults){
    		var data=arrayResults[0].json;
    		var stextData=data.stext;
    		var pro=data.ext1;
    		if( parseInt(stextData.VERSION_NUM)>=1){
    			stextData.VERSION_NUM= parseInt(stextData.VERSION_NUM)   +   parseInt(1);  
    		}else{
    			stextData.VERSION_NUM=1;
    		};
    		stextData.STATU='已计划';
    		/*if(stextData.STATUS=='未计划'){
    			
    		};*/
    		stextData.DATE=INSTALLPLTJ[0].GONGXU;
    		
    		var jsondata={tcode:data.tcode,tid:data.tid,stext:stextData,ext1:pro};
    		var udata = {_id:arrayResults[0]._id, json:jsondata};
    		WL.JSONStore.get(collectionName).refresh(udata,options).then(function(arrayResults2){
    			WL.Toast.show('提交成功！');
    			console.log('JSONStore更新成功');
    			//this_obj.connectServerMainTain(this_obj.instalPlan_HomePage_TJ_Button_JG,this_obj,"installPlanAction.do?method=toUpdate",JSON.stringify(trim));
    			
    			if (installTcode == 'installplanfalse') {
    				//跳转到安装计划查询页面
    				//this.showNextView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
    				
    				var MaintList=Ext.data.StoreManager.get('HelIntTasksAllStore');
    				if (!MaintList) { 
    					MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStore"); 
    				};
    				var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
    				if (!MaintList2) { 
    					MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
    				};
    				//先清空数据仓
    				var record=[];
    				MaintList2.setData(record, this);
    				
    				var recordData=[];
    				
    				//获取要查询的合同号
    				
    				var Maintain=collectionName;
    		    	var MaintainList=WL.JSONStore.get(Maintain);
    		    	var query={tcode:installTcode,tid:PLselectHTH};
    				var options={
    					exacte:false,//默认
    				};
    				var ZT;//状态
    		    	MaintainList.find(query,options).then(function(arrayResults){
    		    		var num=arrayResults.length;
    		    		console.log('instalPlanMylist7拥有的台数: '+num);
    		    		for(var i=0;i<num;i++){
    		    			var data=arrayResults[i].json.stext;
    		    			var dataVN=data.VERSION_NUM;
    		    			var dataBBH=data.VERSION_NUM;
    		    			if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
    		    				ZT='未计划';
    		    				dataBBH='无';
    		    			}else{
    		    				ZT='已计划';
    		    			};
    		    			//工号     批次    类型  版本号  状态（未计划，已计划）合同号
    		    			var trim={ELEVATOR_NO:data.ELEVATOR_NO,SEQ_NUM:data.SEQ_NUM,ELEVATOR_CLASS_NAME:data.ELEVATOR_CLASS_NAME,VERSION_NUM:dataBBH,STATUS:ZT,ENGCONTRACT_NUMBER:data.ENGCONTRACT_NUMBER};
    		    			recordData[i]=trim;
    		    			console.log(JSON.stringify(trim));
    		    		};
    		    		MaintList2.setData(recordData, this);
    		    	}).fail(function(errorObject){
    					console.log("查询数据失败");
    				});
    			} else if (installTcode == 'installplantrue') {
    				//跳转到安装计划查询页面
    			//	this.showNextView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
    				
    				var MaintList=Ext.data.StoreManager.get('HelIntTasksAllStoreThree');
    				if (!MaintList) { 
    					MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreThree"); 
    				};
    				var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
    				if (!MaintList2) { 
    					MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
    				};
    				//先清空数据仓
    				var record=[];
    				MaintList2.setData(record, this);
    				
    				var recordData=[];
    				//获取要查询的合同号
    			//	var HT=MaintList.getAt(index).get('ENGCONTRACT_NUMBER');
    				
    			//	PLselectHTH=HT;
    				
    				var Maintain=collectionName;
    		    	var MaintainList=WL.JSONStore.get(Maintain);
    		    	var query={tcode:installTcode,tid:PLselectHTH};
    				var options={
    					exacte:false,//默认
    				};
    				var ZT;//状态
    		    	MaintainList.find(query,options).then(function(arrayResults){
    		    		var num=arrayResults.length;
    		    		console.log('instalPlanMylist7拥有的台数: '+num);
    		    		for(var i=0;i<num;i++){
    		    			var data=arrayResults[i].json.stext;
    		    			var dataVN=data.VERSION_NUM;
    		    			var dataBBH=data.VERSION_NUM;
    		    			if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
    		    				ZT='未计划';
    		    				dataBBH='无';
    		    			}else{
    		    				ZT='已计划';
    		    			};
    		    			//工号     批次    类型  版本号  状态（未计划，已计划）  合同号
    		    			var trim={ELEVATOR_NO:data.ELEVATOR_NO,SEQ_NUM:data.SEQ_NUM,ELEVATOR_CLASS_NAME:data.ELEVATOR_CLASS_NAME,VERSION_NUM:dataBBH,STATUS:ZT,ENGCONTRACT_NUMBER:data.ENGCONTRACT_NUMBER};
    		    			recordData[i]=trim;
    		    			console.log(JSON.stringify(trim));
    		    		};
    		    		MaintList2.setData(recordData, this);
    		    	}).fail(function(errorObject){
    					console.log("查询数据失败");
    				});
    			};
    			
    			if(PLtzType=='直梯'){
    				install_QingKongShiJianKongJian_ZT();
    			}else if(PLtzType=='扶梯'){
    				install_QingKongShiJianKongJian_FT();
    			};
    			
    			obj.showBackView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
    			/*var sele=document.getElementsByName('installPlangroupCheckbox');
    			console.log(sele.length);
    			  // 遍历 form  
    		    for ( var i = 0; i <sele.length; i++)  
    		    {  
    		      // 提取控件  
    		      var checkbox = sele[i];  
    		      // 检查是否是指定的控件  
    		      if (checkbox.name === "installPlangroupCheckbox" && checkbox.type === "checkbox"){  
    		        checkbox.checked = false;  
    		      };  
    		    };*/
    			
    			
    		}).fail(function(errorObject){
    			console.log(errorObject);
    		});	
    	}).fail(function(errorObject){
			console.log(errorObject);
		});	

	},
	
	//提交多个后修改JSONStore数据的方法     不用了
	install_modificationANDshowDG:function(obj){
		//未进场和在制的判断
		var installTcode=Ext.getCmp('installTcode').getValue();
		
		var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
		if (!MaintList2) { 
			MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
		};
		var HT=MaintList2.getAt(0).get('ENGCONTRACT_NUMBER');
		
		//用于提交按钮的 合同号
		var PLselectHTH=Ext.getCmp('PLselectHTH').getValue();
		
		//用于获取选中数据仓的下标
		var newXb=Ext.getCmp('newXb').getValue();
		newXb=eval("("+ newXb +")");
		
		//用于批量判断是否直梯和扶梯
		var PLtzType=Ext.getCmp('PLtzType').getValue();
		
		//批量添加 用的数组
		var INSTALLPLTJ=Ext.getCmp('INSTALLPLTJ').getValue();
		INSTALLPLTJ=eval("("+ INSTALLPLTJ +")");
		
		//从JSONStore中获取数据
		//合同号    工号   批次
		var tiaojian=HT;
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:installTcode,tid:tiaojian};
		var options={
			exacte:false,//默认
		};
    	MaintainList.find(query,options).then(function(arrayResults){
    		var XGdata=[];
    		var XBlength=newXb.length;
    		for(var i=0;i<XBlength;i++){
    			var num=arrayResults.length;
    			var data=arrayResults[newXb[i]].json;
    			console.log('data: '+JSON.stringify(data));
    			var stextData=data.stext;
    			var pro=data.ext1;
        		if( parseInt(stextData.VERSION_NUM)>=1){
        			stextData.VERSION_NUM= parseInt(stextData.VERSION_NUM)   +   parseInt(1);  
        		}else{
        			stextData.VERSION_NUM=1;
        		};
        		stextData.STATU='已计划';
        		stextData.DATE=INSTALLPLTJ[i].GONGXU;
        		var jsondata={tcode:data.tcode,tid:data.tid,stext:stextData,ext1:pro};
        		var udata = {_id:arrayResults[newXb[i]]._id, json:jsondata};
        		XGdata[i]=udata;
    		};
    		
    		MaintainList.refresh(XGdata,options).then(function(arrayResults2){
    			console.log('修改成功');
    			
    			if (installTcode == 'installplanfalse') {
    				var MaintList=Ext.data.StoreManager.get('HelIntTasksAllStore');
    				if (!MaintList) { 
    					MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStore"); 
    				};
    				var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
    				if (!MaintList2) { 
    					MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
    				};
    				//先清空数据仓
    				var record=[];
    				MaintList2.setData(record, this);
    				var recordData=[];
    				
    				var Maintain=collectionName;
    		    	var MaintainList=WL.JSONStore.get(Maintain);
    		    	var query={tcode:installTcode,tid:PLselectHTH};
    				var options={
    					exacte:false,//默认
    				};
    				var ZT;//状态
    		    	MaintainList.find(query,options).then(function(arrayResults){
    		    		var num=arrayResults.length;
    		    		console.log('instalPlanMylist7拥有的台数: '+num);
    		    		for(var i=0;i<num;i++){
    		    			var data=arrayResults[i].json.stext;
    		    			var dataVN=data.VERSION_NUM;
    		    			var dataBBH=data.VERSION_NUM;
    		    			if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
    		    				ZT='未计划';
    		    				dataBBH='无';
    		    			}else{
    		    				ZT='已计划';
    		    			};
    		    			//工号     批次    类型  版本号  状态（未计划，已计划）合同号
    		    			var trim={ELEVATOR_NO:data.ELEVATOR_NO,SEQ_NUM:data.SEQ_NUM,ELEVATOR_CLASS_NAME:data.ELEVATOR_CLASS_NAME,VERSION_NUM:dataBBH,STATUS:ZT,ENGCONTRACT_NUMBER:data.ENGCONTRACT_NUMBER};
    		    			recordData[i]=trim;
    		    			console.log(JSON.stringify(trim));
    		    		};
    		    		MaintList2.setData(recordData, this);
    		    		
    		    		
    		    	}).fail(function(errorObject){
    		    		WL.Toast.show("查询数据失败");
    				});
    			} else if (installTcode == 'installplantrue') {
    				var MaintList=Ext.data.StoreManager.get('HelIntTasksAllStoreThree');
    				if (!MaintList) { 
    					MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreThree"); 
    				};
    				var MaintList2=Ext.data.StoreManager.get('HelIntTasksAllStoreTwo');
    				if (!MaintList2) { 
    					MaintList2 = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreTwo"); 
    				};
    				//先清空数据仓
    				var record=[];
    				MaintList2.setData(record, this);
    				var recordData=[];
    				var Maintain=collectionName;
    		    	var MaintainList=WL.JSONStore.get(Maintain);
    		    	var query={tcode:installTcode,tid:PLselectHTH};
    				var options={
    					exacte:false,//默认
    				};
    				var ZT;//状态
    		    	MaintainList.find(query,options).then(function(arrayResults){
    		    		var num=arrayResults.length;
    		    		console.log('instalPlanMylist7拥有的台数: '+num);
    		    		for(var i=0;i<num;i++){
    		    			var data=arrayResults[i].json.stext;
    		    			var dataVN=data.VERSION_NUM;
    		    			var dataBBH=data.VERSION_NUM;
    		    			if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
    		    				ZT='未计划';
    		    				dataBBH='无';
    		    			}else{
    		    				ZT='已计划';
    		    			};
    		    			//工号     批次    类型  版本号  状态（未计划，已计划）  合同号
    		    			var trim={ELEVATOR_NO:data.ELEVATOR_NO,SEQ_NUM:data.SEQ_NUM,ELEVATOR_CLASS_NAME:data.ELEVATOR_CLASS_NAME,VERSION_NUM:dataBBH,STATUS:ZT,ENGCONTRACT_NUMBER:data.ENGCONTRACT_NUMBER};
    		    			recordData[i]=trim;
    		    			console.log(JSON.stringify(trim));
    		    		};
    		    		MaintList2.setData(recordData, this);
    		    	}).fail(function(errorObject){
    					console.log("查询数据失败");
    				});
    			};
    			
    			if(PLtzType=='直梯'){
    				install_QingKongShiJianKongJian_ZT();
    			}else if(PLtzType=='扶梯'){
    				install_QingKongShiJianKongJian_FT();
    			};
    			
    			obj.showBackView("installplan_MQ","HelcPDA.view.install.installplan.InstallPlanMPidQuery");
    			var sele=document.getElementsByName('installPlangroupCheckbox');
    			console.log(sele.length);
    			  // 遍历 form  
    		    for ( var i = 0; i <sele.length; i++)  
    		    {  
    		      // 提取控件  
    		      var checkbox = sele[i];  
    		      // 检查是否是指定的控件  
    		      if (checkbox.name === "installPlangroupCheckbox" && checkbox.type === "checkbox"){  
    		        checkbox.checked = false;  
    		      };  
    		    };
    		}).fail(function(errorObject){
        		console.log('修改失败');
    		});
    	}).fail(function(errorObject){
    		console.log('查询失败');
		});	
	},
	

	
// zhj 
	Construction_methods:function ( obj, newValue, oldValue, eOpts){
		var gf=Ext.getCmp('Construction_methods').getValue();
		if(gf=='an2'){
	    Ext.getCmp('ZT_JCFX_TIME').setTitle("定主机");
	    Ext.getCmp('ZT_ZJDG_TIME').setTitle("安装轿架");
	    Ext.getCmp('ZT_MTMT_TIME').setTitle("安装撑架和导轨");

		}
	}
	
});

//直梯时间清空
function install_QingKongShiJianKongJian_ZT(){
	//判断是批量还是单个
	var  plnum=Ext.getCmp('plnum').getValue();
	
	if(plnum==0){
		var nview = Ext.getCmp('installplan_AZJHXXHomePage');
		nview.initData();
		azjhflag=1;
		//棚架搭设
		Ext.getCmp('ZT_PJDS_START_TIME').setValue('');
		//Ext.getCmp('ZT_PJDS_END_TIME').setValue('');
		
		//电梯吊装
		Ext.getCmp('ZT_DTDZ_START_TIME').setValue('');
		//Ext.getCmp('ZT_DTDZ_END_TIME').setValue('');
		
		//安装进场放线
		Ext.getCmp('ZT_JCFX_START_TIME').setValue('');
		//Ext.getCmp('ZT_JCFX_END_TIME').setValue('');

		//安装支架导轨
		Ext.getCmp('ZT_ZJDG_START_TIME').setValue('');
		//Ext.getCmp('ZT_ZJDG_END_TIME').setValue('');
		
		//门套及厅门安装
		Ext.getCmp('ZT_MTMT_START_TIME').setValue('');
		//Ext.getCmp('ZT_MTMT_END_TIME').setValue('');
		
		//机房设备安装、机房放线接线
		Ext.getCmp('ZT_JFAZJX_START_TIME').setValue('');
		//Ext.getCmp('ZT_JFAZJX_END_TIME').setValue('');
		
		//桥架、桥厢拼装
		Ext.getCmp('ZT_JJJXPJ_START_TIME').setValue('');
		//Ext.getCmp('ZT_JJJXPJ_END_TIME').setValue('');
		
		//拆棚
		Ext.getCmp('ZT_CP_START_TIME').setValue('');
		//Ext.getCmp('ZT_CP_END_TIME').setValue('');
		
		//底坑设备
		Ext.getCmp('ZT_DKSB_START_TIME').setValue('');
		//Ext.getCmp('ZT_DKSB_END_TIME').setValue('');

		//电梯调度
		Ext.getCmp('ZT_DTTS_START_TIME').setValue('');
		//Ext.getCmp('ZT_DTTS_END_TIME').setValue('');
		
		//厂检
		Ext.getCmp('ZT_CJ_START_TIME').setValue('');
		//Ext.getCmp('ZT_CJ_END_TIME').setValue('');
		
		//政府部门验收
		//Ext.getCmp('ZT_ZFJ_START_TIME').setValue('');
		//Ext.getCmp('ZT_ZFJ_END_TIME').setValue('');
		azjhflag=0;
		//总工期
		Ext.getCmp('ZGQ_START_TIME').setValue('');
		Ext.getCmp('ZGQ_END_TIME').setValue('');
	}else if(plnum==1){
		var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
		nview2.initData();
		azjhflag=1;
		//棚架搭设
		Ext.getCmp('ZT_PJDS_START_TIME_TWO').setValue('');
		//Ext.getCmp('ZT_PJDS_END_TIME_TWO').setValue('');

		//电梯吊装
		Ext.getCmp('ZT_DTDZ_START_TIME_TWO').setValue('');
		//Ext.getCmp('ZT_DTDZ_END_TIME_TWO').setValue('');
		
		//安装进场放线
		Ext.getCmp('ZT_JCFX_START_TIME_TWO').setValue('');
		//Ext.getCmp('ZT_JCFX_END_TIME_TWO').setValue('');

		//安装支架导轨
		Ext.getCmp('ZT_ZJDG_START_TIME_TWO').setValue('');
		//Ext.getCmp('ZT_ZJDG_END_TIME_TWO').setValue('');
		
		//门套及厅门安装
		Ext.getCmp('ZT_MTMT_START_TIME_TWO').setValue('');
		//Ext.getCmp('ZT_MTMT_END_TIME_TWO').setValue('');
		
		//机房设备安装、机房放线接线
		Ext.getCmp('ZT_JFAZJX_START_TIME_TWO').setValue('');
		//Ext.getCmp('ZT_JFAZJX_END_TIME_TWO').setValue('');
		
		//桥架、桥厢拼装
		Ext.getCmp('ZT_JJJXPJ_START_TIME_TWO').setValue('');
		//Ext.getCmp('ZT_JJJXPJ_END_TIME_TWO').setValue('');
		
		//拆棚
		Ext.getCmp('ZT_CP_START_TIME_TWO').setValue('');
		//Ext.getCmp('ZT_CP_END_TIME_TWO').setValue('');
		
		//底坑设备
		Ext.getCmp('ZT_DKSB_START_TIME_TWO').setValue('');
		//Ext.getCmp('ZT_DKSB_END_TIME_TWO').setValue('');

		//电梯调度
		Ext.getCmp('ZT_DTTS_START_TIME_TWO').setValue('');
		//Ext.getCmp('ZT_DTTS_END_TIME_TWO').setValue('');
		
		//厂检
		Ext.getCmp('ZT_CJ_START_TIME_TWO').setValue('');
		//Ext.getCmp('ZT_CJ_END_TIME_TWO').setValue('');
		
		//政府部门验收
		//Ext.getCmp('ZT_ZFJ_START_TIME_TWO').setValue('');
		//Ext.getCmp('ZT_ZFJ_END_TIME_TWO').setValue('');
		azjhflag=0;
		//总工期
		Ext.getCmp('ZGQ_START_TIME_TWO').setValue('');
		Ext.getCmp('ZGQ_END_TIME_TWO').setValue('');
	};
	
	

};

//扶梯时间清空
function install_QingKongShiJianKongJian_FT(){
	//判断是批量还是单个
	var  plnum=Ext.getCmp('plnum').getValue();
	
	if(plnum==0){
		var nview = Ext.getCmp('installplan_AZJHXXHomePage');
		nview.initData();
		azjhflag=1;
		//安装
		Ext.getCmp('FT_AZ_START_TIME').setValue('');
		//Ext.getCmp('FT_AZ_END_TIME').setValue('');
		
		//调试
		Ext.getCmp('FT_TS_START_TIME').setValue('');
		//Ext.getCmp('FT_TS_END_TIME').setValue('');
		
		//厂检
		Ext.getCmp('FT_CJ_START_TIME').setValue('');
		//Ext.getCmp('FT_CJ_END_TIME').setValue('');
		
		//政府检
		Ext.getCmp('FT_ZJ_START_TIME').setValue('');
		//Ext.getCmp('FT_ZJ_END_TIME').setValue('');
		azjhflag=0;
		//总工期
		Ext.getCmp('FT_ZGQ_START_TIME').setValue('');
		Ext.getCmp('FT_ZGQ_END_TIME').setValue('');
	}else if(plnum==1){
		var nview2 = Ext.getCmp('installplan_AZJHXXTimes');
		nview2.initData();
		azjhflag=1;
		//安装
		Ext.getCmp('FT_AZ_START_TIME_TWO').setValue('');
		//Ext.getCmp('FT_AZ_END_TIME_TWO').setValue('');
		
		//调试
		Ext.getCmp('FT_TS_START_TIME_TWO').setValue('');
		//Ext.getCmp('FT_TS_END_TIME_TWO').setValue('');
		
		//厂检
		Ext.getCmp('FT_CJ_START_TIME_TWO').setValue('');
		//Ext.getCmp('FT_CJ_END_TIME_TWO').setValue('');
		
		//政府检
		Ext.getCmp('FT_ZJ_START_TIME_TWO').setValue('');
		//Ext.getCmp('FT_ZJ_END_TIME_TWO').setValue('');
		azjhflag=0;
		//总工期
		Ext.getCmp('FT_ZGQ_START_TIME_TWO').setValue('');
		Ext.getCmp('FT_ZGQ_END_TIME_TWO').setValue('');
	};
	
	
};

//计算日期相差天数
function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式  
       var  aDate,  oDate1,  oDate2,  iDays;  
       aDate  =  sDate1.split("-");  
       oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]); //转换为12-18-2006格式  
       aDate  =  sDate2.split("-");  
       oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);  
       iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24); //把相差的毫秒数转换为天数  
       return  iDays; 
};   

//特殊方法
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

//从待办处进来的公共方法
//删除JSON中的数据
function installplan_AZJH_DB_HHFF(obj,installTcodeOld,flag){
	//未进场和在制的判断
	Ext.getCmp('installTcode').setValue(installTcodeOld);
	var installTcode=installTcodeOld;
	//
	var Maintain=collectionName;
	var MaintainList=WL.JSONStore.get(Maintain);
	var instalplan={tcode:installTcode};
	var options={exacte:true};//默认是false
	MaintainList.remove(instalplan,options).then(function(){
		console.log(installTcode+'删除成功');
		installplan_AZJH_DB_HHFF2(obj,flag);
	}).fail(function(){
		console.log(installTcode+'删除失败');
	});
};

//查询数据
function installplan_AZJH_DB_HHFF2(obj,flag){
	console.log('同步远程查询');
/*	//获取查询数据的条数
	if(installTcode=='installplanfalse'){
		console.log('installplanfalse');
		flag=false;
	}else if(installTcode=='installplantrue'){
		console.log('installplantrue');
		flag=true;
	};*/
	var ENGCONTRACT_NUMBER='';
	//工号
	var ELEVATOR_NO='';
	//客户
	var CUSTOMER_NAME='';

	//init_person_id='22602';
	
	var Trim="{'IS_ENTRANCE':'"+flag+"','init_person_id':'"+init_person_id+"',ENGCONTRACT_NUMBER:'"+ENGCONTRACT_NUMBER+"',ELEVATOR_NO:'"+ELEVATOR_NO+"',CUSTOMER_NAME:'"+CUSTOMER_NAME+"'}";
	
	console.log('Trim: '+Trim);

	obj.connectServerMainTain(installplan_AZJH_DB_HHFF3,obj,"installPlanAction.do?method=toSearchCount",Trim);
};

//进场或在制的查询
function installplan_AZJH_DB_HHFF3(result,obj){
	//未进场和在制的判断
	var installTcode=Ext.getCmp('installTcode').getValue();
	
	console.log(JSON.stringify(result));
	var instalcount=parseInt((result.count/100)+1);
	console.log(instalcount);
	//查询起始位置
	var INT_TASK_ID=0;
	var index = 0;
	//条件
	//安装合同号
	var ENGCONTRACT_NUMBER='';
	//工号
	var ELEVATOR_NO='';
	//客户
	var CUSTOMER_NAME='';
	
	var td={};
	td.ENGCONTRACT_NUMBER=ENGCONTRACT_NUMBER;
	td.ELEVATOR_NO=ELEVATOR_NO; 
	td.CUSTOMER_NAME=CUSTOMER_NAME; 
	td.init_person_id=init_person_id; 
	td.IsNewVersion=true;
	td.INT_TASK_ID=INT_TASK_ID;
	
	if(installTcode=='installplanfalse'){
		td.IS_ENTRANCE=false; 
	}else if(installTcode=='installplantrue'){
		td.IS_ENTRANCE=true; 
	}
	
	obj.connectServerMainTain(handleResult,obj,"installPlanAction.do?method=toSearch",JSON.stringify(td));
	function handleResult(result,obj) {
		index ++;
		td.INT_TASK_ID = result.INT_TASK_ID;
		
		installplan_AZJH_DB_HHFF4(result,obj);
		
		if (index <= instalcount) {
			obj.connectServerMainTain(handleResult,obj,"installPlanAction.do?method=toSearch",JSON.stringify(td));
		} else {
			installplan_AZJH_DB_HHFF5(obj);
			return ;
		}
	}
};

//添加到JSON
function installplan_AZJH_DB_HHFF4(result,obj){
	//未进场和在制的判断
	var installTcode=Ext.getCmp('installTcode').getValue();
	
	var length=result.item.length;
	var AZJH=[];
	for(var i=0;i<length;i++){
		//合同号    工号   批次
		var id=result.item[i].ENGCONTRACT_NUMBER+'/'+result.item[i].ELEVATOR_NO+'/'+result.item[i].SEQ_NUM;
		var plan={tcode:installTcode,tid:id,stext:result.item[i],ext1:result.progress[i]};
		AZJH[i]=plan;
	};
	
	if(AZJH.length==0){
		WL.Toast.show("数据不存在");
	}else{
		//获取未进场和在制的数量
	/*	if(installTcode=='installplanfalse'){
			var titleWJC=document.getElementById("wjc");
			titleWJC.innerHTML='未进场('+length+')';
		}else if(installTcode=='installplantrue'){
			var titleZZ=document.getElementById("zz");
			titleZZ.innerHTML='在制('+length+')';
		};*/
		
		var Maintain=collectionName;
		var MaintainList=WL.JSONStore.get(Maintain);
		MaintainList.add(AZJH).then(function(){
			console.log('installplan添加进来了');
			//INT_TASK_ID=result.INT_TASK_ID;
		}).fail(function(errorObject){
			console.log('添加installplan出错');	
		});
	};
};


function installplan_AZJH_DB_HHFF5(obj){
	//未进场和在制的判断
	var installTcode=Ext.getCmp('installTcode').getValue();
	
	console.log('进入AddListPlan');
	//获得数据仓
	var MaintList;
	if(installTcode=='installplanfalse'){
		MaintList=Ext.data.StoreManager.get('HelIntTasksAllStore');
		if (!MaintList) { 
			MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStore"); 
		};
	}else if(installTcode=='installplantrue'){
		MaintList=Ext.data.StoreManager.get('HelIntTasksAllStoreThree');
		if (!MaintList) { 
			MaintList = Ext.create("HelcPDA.store.install.installplan.HelIntTasksAllStoreThree"); 
		};
	};
	//先查出不同的合同号
	var Maintain=collectionName;
	var MaintainList=WL.JSONStore.get(Maintain);
	var query={tcode:installTcode};
	console.log('add的installTcode'+installTcode);
	var options={
		exacte:false,//默认
	};
	MaintainList.find(query,options).then(function(arrayResults){
		var num=arrayResults.length;
		
		if(installTcode=='installplanfalse'){
			var titleWJC=document.getElementById("wjc");
			titleWJC.innerHTML='未进场('+num+')';
		}else if(installTcode=='installplantrue'){
			var titleZZ=document.getElementById("zz");
			titleZZ.innerHTML='在制('+num+')';
		};
		
		var ndata=[];//合同号
		var ndata2=[];//记录合同号和合同号的地址
		if(num==0){
			WL.Toast.show("本地不存在数据！");
			return;
		};
		for(var i=0;i<num;i++){
			ndata[i] = arrayResults[i].json.stext.ENGCONTRACT_NUMBER;
			var address=arrayResults[i].json.stext.CUSTOMER_NAME;
			var addressAnd={ENGCONTRACT_NUMBER:ndata[i],CUSTOMER_NAME:address};
			ndata2[i]=addressAnd;
		};
		//获得唯一合同
		var list=ndata.unique3();
		console.log('合同数量:'+list.length+'合同值'+list);
		//获取一个合同所拥有的台数
		var taiNum=[];//记录一个合同的台数
		var listnum=list.length;
		for(var i=0;i<listnum;i++){
			var count=0;
			for(var j=0;j<num;j++){
				if(ndata[j]==list[i]){
					count++;
				}
			};
			taiNum[i]=count;
		};
		var address2=[];
		for(var i=0;i<listnum;i++){
			for(var j=0;j<num;j++){
				if(list[i]==ndata2[j].ENGCONTRACT_NUMBER){
					address2[i]=ndata2[j].CUSTOMER_NAME;
					break;
				}
			}
		};
		//计算已计划和为计划出的数量
		var YJHNum=[];
		var WJHNum=[];
		for(var i=0;i<listnum;i++){
			var yjh=0;
			var wjh=0;
			for(var j=0;j<num;j++){
				var jhData=arrayResults[j].json.stext;
				if(list[i]==jhData.ENGCONTRACT_NUMBER){
					var dataVN=jhData.VERSION_NUM;
					if(dataVN==''||dataVN==null||typeof(dataVN)=='undefined'){
						wjh++;
	    			}else{
	    				yjh++;
	    			};
				};
				YJHNum[i]=yjh;
				WJHNum[i]=wjh;
			};
		};
		//获取整合后的数据
		var HTH=[]; 
		for(var i=0;i<listnum;i++){
			var Trim={ENGCONTRACT_NUMBER:list[i],NUM:taiNum[i],CUSTOMER_NAME:address2[i],YJH:YJHNum[i],WJH:WJHNum[i]};
			HTH[i]=Trim;
		};
		MaintList.setData(HTH);
		WL.Toast.show("数据查询完毕！");
		if(installTcode=='installplanfalse'){
			//让查询数据页活动
    		var tp_chart = Ext.getCmp("tabpanel_id");
    		var tab=tp_chart.getInnerItems(); 
    		tp_chart.setActiveItem(tab[0]);
			installplan_AZJH_DB_HHFF(obj,'installplantrue',true);
		};
	}).fail(function(errorObject){
		console.log("查询数据失败");
	});
		
};

