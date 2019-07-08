
/* JavaScript content from app/controller/maintain/MaintenaceCtrl.js in folder common */
/**
 * 保养模板的事件
 */

//全局对象
var ovlay_MainTain;
//签到字段写死的属性
/**
 * Y轴坐标
 * var latitude;
 * X轴坐标
 * var longitude;
*/

Ext.define('HelcPDA.controller.maintain.MaintenaceCtrl',{
	id:'Maintenacecontroller',
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			
			//登录保养模块触发的事件
			buttonMaintain:'image[id=buttonMaintain]',
			
			
			/************************************************************************************
			 * 保养计划页面
			 * */
			
			//跳回首页
			HomePageButton:'button[id=HomePageButton]',
			
			//进入保养计划-日历页面
			MPPDateButton:'button[id=MPPDateButton]',
			
			//获取上一天的保养信息 xcx  2014-4-12
			MppLeftButton:'button[id=MppLeftButton]',	
			
			//获取下一天的保养信息 xcx  2014-4-12	
			MppRightButton:'button[id=MppRightButton]',
			
			//保养更新 xcx   2014-4-11
			MPPupdate:'button[id=MPPupdate]',
			
			//签到
			MPP_QD:'button[id=MPP_QD]',
			
			//	整月   2014-6-5
			MPP_WholeMonth:'button[id=MPP_WholeMonth]',
			
			//站长按钮 xcx 2014-4-14
			MPPstation:'button[id=MPPstation]',
			
			//是否一整天显示保养工具提示框  2014-6-17
			Main_PLAN_BYGJ:'button[id=Main_PLAN_BYGJ]',
			
			/**
			 **保养计划页面
			 ************************************************************************************/
			
			
			
			/************************************************************************************
			 * 保养计划之日历  页面
			 * */
			//日历页面返回List
			RLButtonReturrn:'button[id=RLButtonReturrn]',

			//获取上一个月的保养信息
			MPPMLeftButton:'button[id=MPPMLeftButton]',
				
			//获取下一个月的保养信息
			MPPMRightButton:'button[id=MPPMRightButton]',	
			
			//通过日期控件查询保养计划
			LabelTimeRL:'button[id=LabelTimeRL]',
			
			/**
			 **保养计划之日历  页面
			 ************************************************************************************/
			
			
			
			/************************************************************************************
			 * 签到页面
			 * */
			//2014-4-25
			//从签到页面跳回list页面
			MSPgoBack:'button[id=MSPgoBack]',

			//全选
			MSPSelect:'button[id=MSPSelect]',
			
			//反选
			MSPAntiElection:'button[id=MSPAntiElection]',
			
			//确认签到
			MSPaffirm:'button[id=MSPaffirm]',
			
			//签到全部
			MSPwhole:'button[id=MSPwhole]',
			
			//已签到
			MSPyqd:'button[id=MSPyqd]',
			
			//未签到
			MSPwqd:'button[id=MSPwqd]',
			/**
			 **签到页面
			 ************************************************************************************/
			

		},
		control:{
			
			/************************************************************************************
			 * 保养计划页面
			 * */
			
			//首页返回 xcx 2014-4-14
			'button#HomePageButton':{
				tap:'HomePageButton'
			},
			
			//进入保养计划-日历页面  按月查询  2014-4-9 xcx
			'button#MPPDateButton':{
				tap:'MPPDateButton'
			},
			
			//获取上一天的保养信息 xcx  2014-4-12
			'button#MppLeftButton':{
				tap:'MppLeftButton'
			},
			
			//获取下一天的保养信息 xcx  2014-4-12	
			'button#MppRightButton':{
				tap:'MppRightButton'
			},
			
			//保养更新 xcx 2014-4-11
			'button#MPPupdate':{
				tap:'MPPupdate'
			},
			
			//跳转到签到页面
			'button#MPP_QD':{
				tap:'MPP_QD'
			},
			
			//	整月   2014-6-5
			'button#MPP_WholeMonth':{
				tap:'MPP_WholeMonth'
			},
			
			//站长按钮 xcx 2014-4-14
			'button#MPPstation':{
				tap:'MPPstation'
			},
			
			//是否一整天显示保养工具提示框  2014-6-17
			'button#Main_PLAN_BYGJ':{
				tap:'Main_PLAN_BYGJ'
			},
			
			//当站长选择维保人员时，查看维保人员的维保信息  xcx 2014-4-14
			'#ServiceMPP':{
				itemtap:'ServiceMPP'
			},
			
			/**
			 **保养计划页面
			 ************************************************************************************/
			
			
			/************************************************************************************
			 * 保养计划之日历  页面
			 * */
			//日历页面返回List xcx  2014-4-11
			'button#RLButtonReturrn':{
				tap:'RLButtonReturrn'
			},

			//获取上一个月的保养信息
			'button#MPPMLeftButton':{
				tap:'MPPMLeftButton'
			},
				
			//获取下一个月的保养信息
			'button#MPPMRightButton':{
				tap:'MPPMRightButton'
			},
			
			//从日历中获取时间查询 xcx  2014-4-11
			'dataview#MPPMRLSelect':{
				itemtap:'MPPMRLDay'
			},
			
			//通过日期控件选中查询的日期
			'button#LabelTimeRL':{
				tap:'MainTainMonth'
			},
			
			
			/**
			 **保养计划之日历  页面
			 ************************************************************************************/
			
			
			/************************************************************************************
			 * 签到页面
			 * */
			//从签到页面跳回list页面  2014-4-25
			'button#MSPgoBack':{
				tap:'MSPgoBack'
			},

			//全选
			'button#MSPSelect':{
				tap:'MSPSelect'
			},
			
			//反选
			'button#MSPAntiElection':{
				tap:'MSPAntiElection'
			},
			
			//选中和不选
			'list#MaintainSP_itemTpl':{
				itemtap:'MaintainSP_itemTpl'
			},
			
			//确认签到
			'button#MSPaffirm':{
				tap:'MSPaffirm'
			},
			
			//签到全部
			'button#MSPwhole':{
				tap:'MSPwhole'
			},
			
			//已签到
			'button#MSPyqd':{
				tap:'MSPyqd'
			},
			
			//未签到
			'button#MSPwqd':{
				tap:'MSPwqd'
			},
			/**
			 **签到页面
			 ************************************************************************************/
			
			
			//按日查
			buttonMaintain:{
				tap:'buttonMaintain'
			},

			//按年月查
			'#hiddenpicker':{
				//tap:'MainTainMonth'
			},
			
			

		},
	},
	
	
	/************************************************************************************
	 * 保养计划页面
	 * */
	
	//保养计划页面  主页按钮
	HomePageButton:function(){
		console.log('返回首页');
		ViewArray = [];
		console.log(ViewArray);
		//czq 保养计划界面返回主页
		if("PDA管理员角色"==pdarole){
			//拥有管理员权限
			ViewArray.push({ViewId:"loginView",ViewName:"HelcPDA.view.LoginView"},{ViewId:"New_Admin_view_id",ViewName:"HelcPDA.view.New_Admin_view"});
			this.showBackView('New_Admin_view_id','HelcPDA.view.New_Admin_view');
//			ViewArray.push({ViewId:"loginView",ViewName:"HelcPDA.view.LoginView"},{ViewId:"New_Home2016",ViewName:"HelcPDA.view.New_Home2016"});
//			this.showBackView('New_Home2016','HelcPDA.view.New_Home2016');
		}else if(power=="anzhuangguocheng" || power=="anzhuangguochenganzhuangguocheng"){
			//安装人员权限
			ViewArray.push({ViewId:"loginView",ViewName:"HelcPDA.view.LoginView"},{ViewId:"New_Install_view_id",ViewName:"HelcPDA.view.New_Install_view"});
			this.showBackView('New_Install_view_id','HelcPDA.view.New_Install_view');
		}else if(power=="baoyangjihua"){
			//维保人员权限
//			ViewArray.push({ViewId:"loginView",ViewName:"HelcPDA.view.LoginView"},{ViewId:"New_Maintain_view_id",ViewName:"HelcPDA.view.New_Maintain_view"});
//			this.showBackView('New_Maintain_view_id','HelcPDA.view.New_Maintain_view');
			ViewArray.push({ViewId:"loginView",ViewName:"HelcPDA.view.LoginView"},{ViewId:"New_Home2016",ViewName:"HelcPDA.view.New_Home2016"});
			this.showBackView('New_Home2016','HelcPDA.view.New_Home2016');
		}
			
			//调用首页的方法 （不是我写的）
//		var obj_menu = Ext.getCmp('MenusView_id');
//			this.refresh_wtd();
//		}
	},

	
	/**
	 * 单击日历按钮时默认显示当月日期 按月查询
	 * 在线获取 ，不用本地获取
	 * 要求更新 2014-12-18
	 * 进入保养计划模块显示当前日期
	 * 进入日历模块查找当前月份
	 * 从日历模块选中日期返回时显示选中日期
	 * 重新进入日历页面显示获取到的日期
	 */
	//进入保养计划-日历页面  按月查询
	MPPDateButton:function(){
		//跳转到日历页面
		this.NextView("MainPlanPlanM","HelcPDA.view.maintain.MaintenancePlanPanelMonth");
		//判断当前当前List是否有数据
		var MaintList=Ext.data.StoreManager.get('MaintainPlanList');
		if (!MaintList) { 
			MaintList = Ext.create("HelcPDA.store.maintain.MaintainPlanList"); 
		};
		//var count=MaintList.getCount();
		
		//获取日期
		var nian='';
		var yue='';
		var fm2='';
		var yy='';
		var rr='';
		var RI='';
		var RIZF='';
		var RIXB='';
		//从日滨页面返回回来
		var page = localStorage.page;
		if(page != "" && page != null && typeof(page) != "undefined"){
			var timeArray = MaintainTime.split('-');
			nian = timeArray[0];
			yue = timeArray[1];
			
			//保养计划-日历 页面 年月显示控件
			fm2=nian+'年'+yue+'月';
			Ext.getCmp('LabelTimeRL').setText(fm2);
	    	
			RIXB=timeArray[2];
			Ext.create('HelcPDA.view.maintain.MaintenancePlanPanel');
			Ext.getCmp('MainRL_XuanZhongXB').setValue(RIXB);
		}else{
			var day=Ext.getCmp('MPPDateButton').getText();
			var one=day.split('年');
			nian=one[0];
			var two=one[1].split('月');
			var three=two[0].split('');
			if(three[0]==0){
				yue=three[1];
			}else{
				yue=two[0];
			};
			
			//保养计划-日历 页面 年月显示控件
			fm2=nian+'年'+yue+'月';
			Ext.getCmp('LabelTimeRL').setText(fm2);
	    	
			yy=day.split('月');
			rr=yy[1].split('日');
			RI=rr[0];
			RIZF=RI.split('');
			RIXB=RI;
			if(RIZF[0]==0){
				RIXB=RIZF[1];
			};
			Ext.getCmp('MainRL_XuanZhongXB').setValue(RIXB);
		}
		
		
    	//先写死日期  xcx 2014-4-9
		//seeatid='1-1P72JN';
    	//MppmYear='2013';
    	//MppnMonth='4';
    	
    	console.log('+++++单击日历显示：'+seeatid+" "+nian+" "+yue);
    	
    	//给隐藏控件赋予全职变量
		Ext.getCmp('MppmYear').setValue(nian);
		Ext.getCmp('MppnMonth').setValue(yue);
		console.log("日历的参数：{'month':'"+yue+"','year':'"+nian+"','person_id':'"+person_id+"','position_type':'"+position_type+"'}");
//		this.connectServerMainTain(this.mppmaddcalendar,this,"maintainancePlanItemListAction.do?method=toSearchMonthInfo","{'month':'"+yue+"','year':'"+nian+"','person_id':'"+person_id+"','position_type':'"+position_type+"'}");
		var v_CurrentMonthFirstDay = nian+'-'+yue+'-01';
		var parameters = {
			procedure : 'PlanListQuery',
			isLoading : true,
			contentStr : "{\"person_id\":\""+seeatid+"\"}",
			isToDoCount : 'Y',
			startD : Ext.Date.format(new Date(v_CurrentMonthFirstDay),'m/d/Y'),
			endD : Ext.Date.format(Ext.Date.add(new Date(v_CurrentMonthFirstDay), Ext.Date.MONTH, 1),'m/d/Y')
		};
					
		MainCtr.getDataFromServer(this.mppmaddcalendar,parameters);
	},
	
	//获取上一天
	MppLeftButton:function(){
		this.MppLeftButtonAndMppRightButton_GGFF(1);
	},
	
	//获取下一天的日期 xcx  2014-4-12
	MppRightButton:function(){
		this.MppLeftButtonAndMppRightButton_GGFF(2);
	},

	//上一天和下一天的公共方法
	MppLeftButtonAndMppRightButton_GGFF:function(id){
		//拆分显示日期
		var day=new Array();
		var MaintainAloneTime= Ext.getCmp('MaintainAloneTime').getValue();
		day=MaintainAloneTime.split('-');
		console.log('获取下一天日期'+day[0]+day[1]+day[2]);
		//拆分月份
		var mm=new Array();
		mm=day[1].split("",2);
		console.log('拆分后的月'+mm[0]+" "+mm[1]);
		//拆分日期
		var dd=new Array();
		dd=day[2].split("",2);
		console.log('拆分后的天'+dd[0]+" "+dd[1]);
		
		//日
		if(dd[0]==0){
			day[2]=dd[1];
		};
		//月
		if(mm[0]==0){
			day[1]=mm[1];
		};
		
		//判断是上一天还是下一天
		if(id==1){
			//获取当天年月的天数
			day[2]=day[2]-1;
			if(day[2]<=0){
				day[1]=day[1]-1;
				if(day[1]<=0){
					day[1]= 12;
					day[0]=day[0]-1;
				};
				day[2]=this.countDay(day[0],day[1]);
			};
			
		}else if(id==2){
			//获取当天年月的天数
			day[2]=Number(day[2]) + Number(1);
			//这个月的天数
			var addday=this.countDay(day[0],day[1]);
			console.log('当月天数: '+ addday+"日期:"+day[2]);
			if(day[2]>addday){
				day[1]=Number(day[1])+Number(1);
				if(day[1]>12){
					day[1]= 1;
					day[0]=Number(day[0])+Number(1);
				};
				day[2]=1;
			};
			
		};
		//日历显示下标
		Ext.getCmp('MainRL_XuanZhongXB').setValue(day[2]);
		
		//如果年和月都小于10补上0
		if(day[1]<10){
			day[1]='0'+day[1]; 
		};
		if(day[2]<10){
			day[2]='0'+day[2];
		};
		//给显示用
		var MainttainTime=day[0]+'年'+day[1]+'月'+day[2]+'日';
		Ext.getCmp('MPPDateButton').setText(MainttainTime);
		//给公共变量
		MaintainAloneTime=day[0]+'-'+day[1]+'-'+day[2];
		Ext.getCmp('MaintainAloneTime').setValue(MaintainAloneTime);
		this.commonalitySelect(this,MaintainAloneTime);
	},
	
	/**
	 * 保养模块更新
	 * 2014-4-11 xcx
	 * 
	 * 保养模块更新,BUG修改
	 * 2014-4-28 xcx
	 */
	MPPupdate:function(){
		console.log('---进入更新模块');
		//更新日期是对选中日期进行更新，而不是对当天进行更新
		//更新只关联登录用户的ID
		seeatid=person_id;
		console.log('登录用户的id: '+seeatid);
		//删除当天的记录mainfields  mainitem
		var MaintainAloneTime= Ext.getCmp('MaintainAloneTime').getValue();
		this.updateNewDay(this,MaintainAloneTime);
	},
	
	/**
	 * 2012-4-24 补签到模块
	 * 首先判断list是否有数据，没数据就跳过，有数据取JSONStort中去找，
	 * 判断JSONStort中是否有数据，没有就添加，有就比较list和JSONStort的区别
	 */
	MPP_QD:function(){
		//2014-7-1 更新
		//获得数据仓 保养计划
		var MaintList=Ext.data.StoreManager.get('MaintainPlanList');
		if (!MaintList) { 
			MaintList = Ext.create("HelcPDA.store.maintain.MaintainPlanList"); 
		};
		var num=MaintList.getData().length;
		
		//获得条件日期
		var MaintainAloneTime= Ext.getCmp('MaintainAloneTime').getValue();
		
		//判断是否有数据签到
		if(num==0){
			WL.Toast.show("今天没有工号可签到，请更新试试！");
		}else if(num>0){
			//跳转
			this.NextView("MainMSingPan","HelcPDA.view.maintain.MaintenanceSigninPanel");
			
			//判断JSON是否有数据如果有那么把JSON中的数据和数据仓的数据进行比较得出综合数据并存储到JSON中和显示出来
			//如果JSON中没有数据那么直接把数据存入JSON中，并显示出来
			//签到 数据仓
			var MaintList2=Ext.data.StoreManager.get('MaintenanceSigninPanelStore');
			if (!MaintList2) { 
				MaintList2 = Ext.create("HelcPDA.store.maintain.MaintenanceSigninPanelStore"); 
			};
			
			var MaintainList=WL.JSONStore.get(collectionName);
	    	var query={tcode:'mainregister',tid:MaintainAloneTime};
			var options={
				exacte:false,//默认
			};
			MaintainList.find(query,options).then(function(arrayResults){
				var dataNum=arrayResults.length;
				//判断有无数据
				if(dataNum==0){//无
					var ghqd=[];
					for(var i=0;i<num;i++){
						var qiandao={};
						qiandao.PLAN_START_DT=MaintList.getAt(i).get('PLAN_START_DT');
						qiandao.ASSET_NUM=MaintList.getAt(i).get('ASSET_NUM');
						qiandao.DOMAIN_NAME=MaintList.getAt(i).get('DOMAIN_NAME');
						qiandao.REGISTRATION='';
						qiandao.MP_ID=MaintList.getAt(i).get('MP_ID');
						ghqd[i]=qiandao;
						console.log('签到会用到的数据：'+JSON.stringify(qiandao));
					};
					MaintList2.setData(ghqd, this);
					//将数据添加到JSON中
					var trim={tcode:'mainregister',tid:MaintainAloneTime,stext:ghqd};
					MaintainList.add(trim).then(function(){
						console.log('签到数据添加成功');
					}).fail(function(errorObject){
						console.log('签到数据添加失败');
					});
				}else if(dataNum>0){//有
					//记录数据仓和JSON中唯一的签到数据
					console.log(JSON.stringify(arrayResults));
					var sjCount=arrayResults[0].json.stext.length;
					var newData=[];
					var index=0;
					for(var i=0;i<num;i++){//数据仓
						var sjc=MaintList.getAt(i).get('MP_ID');
						var cesiNum=0;
						for(var j=0;j<sjCount;j++){//JSON
							var json=arrayResults[0].json.stext[j].MP_ID;
							//数据仓中的数据是否和JSON中的数据相等
							if(sjc==json){
								newData[index]=arrayResults[0].json.stext[j];
							}else if(sjc!=json){
								cesiNum++;
							};
							//当JSON中没有数据仓的这个数的时候
							if(cesiNum==sjCount){
								var qiandao={};
								qiandao.PLAN_START_DT=MaintList.getAt(i).get('PLAN_START_DT');
								qiandao.ASSET_NUM=MaintList.getAt(i).get('ASSET_NUM');
								qiandao.DOMAIN_NAME=MaintList.getAt(i).get('DOMAIN_NAME');
								qiandao.REGISTRATION='';
								qiandao.MP_ID=MaintList.getAt(i).get('MP_ID');
								newData[index]=qiandao;
								console.log('签到JSON没有的数据：'+JSON.stringify(qiandao));
							};
						};
						index++;
					};
					//修改JSON
					console.log('newData: '+JSON.stringify(newData));
					var trim={tcode:'mainregister',tid:MaintainAloneTime,stext:newData};
					var document={_id:arrayResults[0]._id,json:trim};
					var optionX={
							exacte:false,//默认
						};
					MaintainList.replace(document,optionX).then(function(){
						console.log('JSON修该成功');
						//显示数据
						MaintList2.setData(newData, this);
					}).fail(function(errorObject){
						console.log('JSON修该失败');
					});
				};
			}).fail(function(errorObject){
				console.log('JSON中没有签到数据');
				//WL.Toast.show("查询数据失败！");
			});
		};

	},
	
	//	整月   2014-6-5
	MPP_WholeMonth:function(){
		var MppmYear= Ext.getCmp('MppmYear').getValue();
		var MppnMonth=Ext.getCmp('MppnMonth').getValue();
		console.log('整月  '+MppnMonth+'     '+MppmYear);
		var v_CurrentMonthFirstDay = MppmYear+'-'+MppnMonth+'-01';
		//先查询出这个月有保养计划的日期
//		this.connectServerMainTain(this.MPP_WholeMonth2,this,"maintainancePlanItemListAction.do?method=toSearchMonthInfo","{'month':'"+MppnMonth+"','year':'"+MppmYear+"','person_id':'"+seeatid+"','position_type':'"+position_type+"'}");
		var parameters = {
				procedure : 'PlanListQuery',
				isLoading : true,
				contentStr : "{\"person_id\":\""+seeatid+"\"}",
				startD : Ext.Date.format(new Date(v_CurrentMonthFirstDay),'m/d/Y'),
				endD : Ext.Date.format(Ext.Date.add(new Date(v_CurrentMonthFirstDay), Ext.Date.MONTH, 1),'m/d/Y')
		};
		
		MainCtr.getDataFromServer(this.InserMonthData,parameters);
	},
	
	InserMonthData : function(res){
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
		var v_mainfields = {tcode:'mainfields'};
    	var options={exact:true};
    	
		MaintainList.remove(v_mainfields,options).then(function(){
			var resp = res.PlanListQuery_Output;
			if(resp.NumOutputObjects > 0){
				var respo = resp.ListOfHelPdaMaintainingPlanListIo.HelMaintainPlan;
				var ndata = [];
				var id;
				var MainAdd;
				//bbbb
				if(respo.length){
					for(var i = 0;i < respo.length;i++){
				   		id = respo[i].Id+'/'+Ext.Date.format(new Date(respo[i].PlanStartDate),'Y-m-d H:i');
				   		MainAdd = {tcode:'mainfields',tid:id,stext:respo[i]};
				   		ndata[i] = MainAdd;
				   	};
				}else{
					id = respo.Id+'/'+Ext.Date.format(new Date(respo.PlanStartDate),'Y-m-d H:i');
			   		MainAdd = {tcode:'mainfields',tid:id,stext:respo};
			   		ndata[0] = MainAdd;
				}
			}
		   	
		   	MaintainList.add(ndata).then(function(){
		   		Ext.toast("更新整月数据成功！");
		   	}).fail(function(errorObject){
		   		Ext.toast("更新整月数据（插入离线数据）失败！");
		   	});
		}).fail(function(errorObject){
			Ext.toast("更新整月数据（删除离线数据）失败！");
		});
	},
	
	//获取这个月的保养日期
	MPP_WholeMonth2:function(result,obj){
		//新MUG4保养计划弃用此方法
		return;
		var MppmYear= Ext.getCmp('MppmYear').getValue();
		var MppnMonth=Ext.getCmp('MppnMonth').getValue();
			var lang=result.monthItem.length;
		
			//获取保养日期封装成一个数组
			if(lang>0){
				//删除JSON中的数据
				var Maintain=collectionName;
		    	var MaintainList=WL.JSONStore.get(Maintain);
		    	var month=MppnMonth;
		    		if(month<10){
		    			month='0'+month; 
		    		};
		    	var tt={tcode:'mainfields',tid:MppmYear+'-'+month};
		    	
		    	var options={exacte:true};
				MaintainList.remove(tt,options).then(function(){
					console.log('删除成功');
					
			    	var Maintxml={tcode:'mainxmlName'};
					MaintainList.remove(Maintxml,options).then(function(){
						console.log('Maintxml删除成功');
						
						var MainAdd={tcode:'MAINITEM',stext:MppmYear+'-'+month};
						MaintainList.remove(MainAdd,options).then(function(){
							console.log('MAINITEM删除成功');
							
							var num=[];
							for(var i=0;i<lang;i++){
								num[i]=result.monthItem[i];
							};
							console.log('整月  '+JSON.stringify(num));
							obj.MPP_WholeMonth3(num,obj);
						}).fail(function(){
							console.log('MAINITEM删除失败');
						});
						
					}).fail(function(){
						console.log('Maintxml删除失败');
					});

				}).fail(function(errorObject){
		    		WL.Toast.show("删除失败");
		   		});
			}else{
				WL.Toast.show("当月无保养计划！");
				return;
			};
	},
	
	//递归算法
	MPP_WholeMonth3:function(num,obj){
		var count=num.length;
		var flag=0;

		obj.connectServerMainTain(zhengrichaxun,obj,"maintainancePlanItemListAction.do?method=toSearchDetail2","{'person_id':'"+seeatid+"','date':'"+num[flag]+"','position_type':'"+position_type+"'}");
		function zhengrichaxun(result,obj){
			flag++;
			obj.MPP_WholeMonth4(result);
			if(flag<count){
				obj.connectServerMainTain(zhengrichaxun,obj,"maintainancePlanItemListAction.do?method=toSearchDetail2","{'person_id':'"+seeatid+"','date':'"+num[flag]+"','position_type':'"+position_type+"'}");
			}else{
				return;
			};
		}
	},
	
	MPP_WholeMonth4:function(result){
		var length = result.fields.length;
		var ndata=[];
		if(length>0){
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	
			var Maintxml={tcode:'mainxmlName',stext:result.xmlName};
			MaintainList.add(Maintxml).then(function(){
				console.log('添加mainxmlName成功');
				
				/////
				for(var i=0;i<length;i++){
			   		var id=result.fields[i].MP_ID+'/'+result.fields[i].PLAN_START_DT;
			   		var MainAdd={tcode:'mainfields',tid:id,stext:result.fields[i]};
			   		ndata[i] = MainAdd; 
			   	};   	
			   	
		    	MaintainList.add(ndata).then(function(){
		    		var length = result.item.length;
		    		if(length==0){
		    			return;
		    		};
		    			var ndata2=[];
					    for(var i=0;i<length;i++){
					    	var id=result.item[i].MP_ID+'/'+result.item[i].TASK_ROW_ID;
					    	var MainAdd={tcode:'MAINITEM',tid:id,stext:result.item[i]};
					    	ndata2[i] = MainAdd; 
					    }; 
					    
					    //2014-7-5
						Ext.getCmp('MainPlan_MAINMAINITEM_CZ').setValue(JSON.stringify(ndata2));
						
				    	MaintainList.add(ndata2).then(function(){
				    		console.log('进添加来了mainitem');
				    	}).fail(function(errorObject){
				    		console.log('添加进添加来了mainitem出错');	
	    	    		});
					
		    	}).fail(function(errorObject){
		    		console.log('添加mainfields出错');	
		   		});
				/////
			}).fail(function(errorObject){
	    		console.log('添加进添加来了mainxmlName出错');	
    		});
		}
	},
	
	//站长按钮  
	MPPstation:function(){
		//console.log('站长登录'+position_type+" "+station_id);
		console.log('获取站长登录ID: '+station_id);
		//查询条件
		term="{'station_id':'"+station_id+"'}";
		//查询数据
		var station=function(json){
			if(!ovlay_MainTain){
				console.log('进来list来了');
				ovlay_MainTain=Ext.Viewport.add({
					xtype:'panel',
					id:'statPanel',
					height:'70%',
					width:'90%',
       		     	hideOnMaskTap: true,
       		     	//scrollable: true,
       		     	centered: true,
       		     	modal: true,
       		     	items:[{
       		     		xtype:'fieldset',
    		            height:'100%',
    		            width:'100%',
    		            items:[{
    		               xtype:'list',     		
 		        		   id:'ServiceMPP',
 		        		   store:'ServicePersonnel',
 		        		   height:'100%',
 		        		   width:'100%',
 		        		   itemTpl:
 		        			   [
 		        		          '<div>{PERSON_NAME}<div>',
 		        		          '<input type="hidden" name="servicePM" value="{PERSON_ID}">'
 		        		       ]
    		            }] 	
    		         }]
				});
				//
			}else{
				//console.log('要显示吗？');
				ovlay_MainTain.show();
			};
			/*var listPanel=Ext.getCmp('statPanel');
			listPanel.show();
			var listPanel2=Ext.getCmp('ServiceMPP');
			listPanel2.show();*/
			//为数据仓添加数据
			var datads=Ext.data.StoreManager.get('ServicePersonnel');
			if(!datads){
				datads=Ext.create('HelcPDA.store.maintain.ServicePersonnel');
			}
			datads.setData(json.person);
			//console.log('数据:'+json.PERSON_NAME);
		};
		//显示
		//调用方法
		this.connectServer(station,"maintainancePlanItemListAction.do?method=toSearchEMP",term);
	
	},
	
	//是否一整天显示保养工具提示框  2014-6-17
	Main_PLAN_BYGJ:function(){
		var num=Ext.getCmp('Main_togglefield').getValue();
		if(num==1){
			disp_confirm();
		}else if(num==0){
			var statPanel3=Ext.getCmp('statPanel3');
			if(statPanel3){
				statPanel3.destroy();
			};
		};
	},
	
	//获取选中维保人员的信息
	ServiceMPP:function(dataview, index, target, record, e, eOpts){
		var SPDate = Ext.data.StoreManager.get("ServicePersonnel"); 
		if (!SPDate) { 
			SPDate = Ext.create("HelcPDA.store.maintain.ServicePersonnel"); 
		}
		//获取维保人员ID
		var day=SPDate.getAt(index).get('PERSON_ID');
		console.log("选中的维保人ID:"+day);
		//修改公共ID
		seeatid=day;
		console.log("选中维保人的person_id:"+seeatid);
		
		//获得条件日期
		var MaintainAloneTime= Ext.getCmp('MaintainAloneTime').getValue();
		
		//运行在线查找维保人员的当天保养信息
		this.updateNewDay(this,MaintainAloneTime);
		
		var listPanel=Ext.getCmp('statPanel');
		listPanel.hide();
	},
	
	/**
	 **保养计划页面
	 ************************************************************************************/
	
	
	

	/************************************************************************************
	 * 保养计划之 日历页面
	 * */
	
	/**
	 * 日历页面返回  xcx 2014-4-11
	 */
	RLButtonReturrn:function(){
		console.log('日历返回进来');
		//跳转页面     
		this.showBackView("Maintainlist","HelcPDA.view.maintain.MaintenancePlanPanel");
	},

	//上个月
	MPPMLeftButton:function(){
		this.MPPMRightGGFF(1);
	},
	
	//下个月
	MPPMRightButton:function(){
		this.MPPMRightGGFF(2);
	},
	
	//上个月和下个月的公共方法
	MPPMRightGGFF:function(num){
		//日历显示下标
		Ext.getCmp('MainRL_XuanZhongXB').setValue(0);
		
		var MppmYear= Ext.getCmp('MppmYear').getValue();
		var MppnMonth=Ext.getCmp('MppnMonth').getValue();
		
		if(num==1){
			MppnMonth=MppnMonth-1;
			if(MppnMonth<=0){
				MppnMonth=12;
				MppmYear=MppmYear-1;
			};
		}else if(num==2){
			MppnMonth=Number(MppnMonth)+Number(1);
			if(MppnMonth>12){
				MppnMonth=1;
				MppmYear=Number(MppmYear)+Number(1);
			};
		};
		
		//给显示的全局变量
		var MainttainTimeRL=MppmYear+'年'+MppnMonth+'月';
		Ext.getCmp('LabelTimeRL').setText(MainttainTimeRL);
		
		Ext.getCmp('MppmYear').setValue(MppmYear);
		Ext.getCmp('MppnMonth').setValue(MppnMonth);
//		this.connectServerMainTain(this.mppmaddcalendar,this,"maintainancePlanItemListAction.do?method=toSearchMonthInfo","{'month':'"+MppnMonth+"','year':'"+MppmYear+"','person_id':'"+seeatid+"','position_type':'"+position_type+"'}");
		var v_CurrentMonthFirstDay = MppmYear + '-' + MppnMonth + '-01';
		var parameters = {
			procedure : 'PlanListQuery',
			isLoading : true,
			contentStr : "{\"person_id\":\""+seeatid+"\"}",
			isToDoCount : 'Y',
			startD : Ext.Date.format(new Date(v_CurrentMonthFirstDay),'m/d/Y'),
			endD : Ext.Date.format(Ext.Date.add(new Date(v_CurrentMonthFirstDay), Ext.Date.MONTH, 1),'m/d/Y')
		};
					
		MainCtr.getDataFromServer(this.mppmaddcalendar,parameters);
	},
	
	
	/**
	 * xcx  2014-4-11
	 * 单击日历中的日期,进行判断
	 * 日历查询添加显示
	 * 
	 */
	MPPMRLDay:function(dataview, index, target, record, e, eOpts){
//		//从日滨页面返回回来
		var page = localStorage.page;
		if(page != "" && page != null && typeof(page) != "undefined"){
			index = listIndex;
			if(localStorage.YDYJ_flag == "2"){
				localStorage.YDYJ_flag = '';
				localStorage.page = '';
			}
		}
		this_obj=this;
		var RLDate = Ext.data.StoreManager.get("Date"); 
		if (!RLDate) { 
			RLDate = Ext.create("HelcPDA.store.maintain.Date"); 
		}
		var day=RLDate.getAt(index).get('day');
		var dayRLXB=RLDate.getAt(index).get('num');
		
//		var page = getUrlParam('page');
//		if(page != "" && page != null && typeof(page) != "undefined"){
//			day = MaintainTime;
//			var maintaintime = MaintainTime.split('-');
//			dayRLXB = maintaintime[2];
//		}
		
		Ext.getCmp('MainRL_XuanZhongXB').setValue(dayRLXB);
	
		//alert('下标'+dayRLXB);
		if(day==null){
			if(!isNaN(dayRLXB)&&dayRLXB>0){
				console.log('是数字');
				 if(dayRLXB<10){
					 dayRLXB='0'+dayRLXB;
				 };
				 var MppmYear= Ext.getCmp('MppmYear').getValue();
				 var MppnMonth=Ext.getCmp('MppnMonth').getValue();
				 if(MppnMonth<10){
					 MppnMonth='0'+MppnMonth;
				 };
				 day=MppmYear+'-'+MppnMonth+'-'+dayRLXB;
				 YBYJH(index,day,this_obj);
				 /*
				 Ext.Msg.confirm('消息','当天没有保养计划？',function(btn){
					 if (btn == 'yes'){
							 console.log('是数字');
							 if(dayRLXB<10){
								 dayRLXB='0'+dayRLXB;
							 };
							 var MppmYear= Ext.getCmp('MppmYear').getValue();
							 var MppnMonth=Ext.getCmp('MppnMonth').getValue();
							 if(MppnMonth<10){
								 MppnMonth='0'+MppnMonth;
							 };
							 day=MppmYear+'-'+MppnMonth+'-'+dayRLXB;
							 YBYJH(index,day,this_obj);
						}else{
							return;
						};
				});
				*/
			 }else{
				 console.log('不是数字');
					return;
			 };
		}else{
			console.log('当天有保养计划');
			YBYJH(index,day,this_obj);
		};
		
		 function  YBYJH(index,day,this_obj){
			 console.log('PPPPP   '+day);
			var MaintainAloneTime=day;
			//获得条件日期
			Ext.getCmp('MaintainAloneTime').setValue(MaintainAloneTime);
			//显示选中的日历
			var dayRL=new Array();
			dayRL=day.split('-');
			var MainttainTime=dayRL[0]+"年"+dayRL[1]+"月"+dayRL[2]+"日";
			Ext.getCmp('MPPDateButton').setText(MainttainTime);
			this_obj.commonalitySelect(this_obj,day);
			//跳转页面     
			this_obj.showBackView("Maintainlist","HelcPDA.view.maintain.MaintenancePlanPanel");
			Ext.getCmp('listIndex').setValue(index);
		};
		
		
		
		
	},
	
	/**
	 * 选择日期，按月查询 ，在线获取，不用读取本地
	 * 2014-4-11 xcx
	 */
	MainTainMonth:function(){
		this_obj=this;
		var date=new Date();
    	var mypicker=Ext.getCmp('mypick');
    	if(mypicker){
    		mypicker.destroy();
    	};
    	
    	var v_yeardata = [];
    	var v_fullyear = date.getFullYear();
    	for(var i = -5;i < 4;i++){
    		v_yeardata.push({
    			text: (v_fullyear + i)+'年',
    			value:v_fullyear + i,
    		});
    	}
    	
    	this_obj.picker = Ext.Viewport.add({
                xtype: 'picker',
                hidden: true,
                id:'mypick',
                doneButton: '确定',
                listeners: {
                	change:function() {
                	
                		Ext.getCmp('MainRL_XuanZhongXB').setValue(0);
                		
                		//获取Data中所以数据
                		var mon20=Ext.getCmp('picklotMonth').getData();
                		console.log('mon20'+mon20[1].value);
                		
                		//获取选中年月,键名是name
                		var pick=Ext.getCmp('mypick').getValues();
                		//修改全局变量
                		var MppmYear=pick.ayear;
                		var MppnMonth=pick.amonth;
                		//给隐藏控件赋予全职变量
						Ext.getCmp('MppmYear').setValue(MppmYear);
						Ext.getCmp('MppnMonth').setValue(MppnMonth);
                		//alert(pick.MyPickerSlot+"  "+pick.MyPickerSlot1);
                		//单击确定时触发写入事件,写入的不能每次相同 
                		var myDate = new Date();
                		var mm=myDate.getMilliseconds(); 
                		var ff=myDate.getMinutes();
                		var fm=ff+mm;
                		console.log('按月查询时获取秒'+fm);
                		Ext.getCmp('hiddenpicker').setValue(fm);
                		//显示当前选中的日期
                		var fm2=MppmYear+'年'+MppnMonth+'月';
                		Ext.getCmp('LabelTimeRL').setHtml(fm2);
                		
                		var MppmYear = null;
                		var MppnMonth = null;
                		//日滨返回
                		//从日滨页面返回回来
						var page = RB_page_flag;
						if(page != "" && page != null && typeof(page) != "undefined"){
							var timeArray = MaintainTime.split('-');
							MppmYear = timeArray[0];
							MppnMonth = timeArray[1];
						}else{
							MppmYear= Ext.getCmp('MppmYear').getValue();
							MppnMonth=Ext.getCmp('MppnMonth').getValue();
						}
                	
                		console.log('获取选中的年和月'+MppmYear+" "+MppnMonth);
                		//先定死，后期可改
                		//seeatid='1-1P72JN';
                	
//                		this_obj.connectServerMainTain(this_obj.mppmaddcalendar,this_obj,"maintainancePlanItemListAction.do?method=toSearchMonthInfo","{'month':'"+MppnMonth+"','year':'"+MppmYear+"','person_id':'"+seeatid+"','position_type':'"+position_type+"'}");
                		var v_CurrentMonthFirstDay = MppmYear + '-' + MppnMonth + '-01';
                		var parameters = {
                			procedure : 'PlanListQuery',
                			isLoading : true,
                			contentStr : "{\"person_id\":\""+seeatid+"\"}",
                			isToDoCount : 'Y',
                			startD : Ext.Date.format(new Date(v_CurrentMonthFirstDay),'m/d/Y'),
                			endD : Ext.Date.format(Ext.Date.add(new Date(v_CurrentMonthFirstDay), Ext.Date.MONTH, 1),'m/d/Y')
                		};
                					
                		MainCtr.getDataFromServer(this_obj.mppmaddcalendar,parameters);
                	}
                },
               
                cancelButton: '取消',
                slots: [
                {
                	id:'picklotYear',
                    xtype: 'pickerslot',   
                    data:v_yeardata,
                    align: 'center',
                    name: 'ayear',
                    title: '',
                   
                },
                {
                    xtype: 'pickerslot',
                    id:'picklotMonth',
                    data: [
                    {text: '1月',value: 1},
                    {text: '2月',value: 2},
                    {text: '3月',value: 3},
                    {text: '4月',value: 4},
                    {text: '5月',value: 5},
                    {text: '6月',value: 6},
                    {text: '7月',value: 7},
                    {text: '8月',value: 8},
                    {text: '9月',value: 9},
                    {text: '10月',value: 10},
                    {text: '11月',value: 11},
                    {text: '12月',value: 12}
                    ],
                    align: 'center',
                    name: 'amonth',
                    title: '',
                }
                ]
            });
        this.picker.show();
        var slots1=Ext.getCmp('mypick');
        slots1.setValue({ayear: parseInt(Ext.getCmp('MppmYear').getValue())},false);
        slots1.setValue({amonth: parseInt(Ext.getCmp('MppnMonth').getValue())},false);
		
		return;
	},
	
	/**
	 **保养计划之 日历页面
	 ************************************************************************************/
	
	
	/************************************************************************************
	 * 签到页面
	 * */
	
	//从签到页面返回保养页面
	MSPgoBack:function(){
		//获得条件日期
		var MaintainAloneTime= Ext.getCmp('MaintainAloneTime').getValue();
		console.log('返回现实时间:',MaintainAloneTime);
		this.showBackView("Maintainlist","HelcPDA.view.maintain.MaintenancePlanPanel");
	},

	//签到页面的全选按钮
	MSPSelect:function(){
		var sbenoCheck=document.getElementsByName('groupCheckbox');
		var length=sbenoCheck.length;
		for(var i=0;i<length;i++){
			if(sbenoCheck[i].className=='p_judge_box')
	          {
	              sbenoCheck[i].className = 'p_judge_box_clicked';
	          };
		};
	},
	
	//签到页面的反选按钮 
	MSPAntiElection:function(){
		var sbenoCheck=document.getElementsByName('groupCheckbox');
		for(var i=0;i<sbenoCheck.length;i++){
			if(sbenoCheck[i].className=='p_judge_box')
		      {
		          sbenoCheck[i].className = 'p_judge_box_clicked';
		      }
		      else
		      {
		          sbenoCheck[i].className = 'p_judge_box';
		      };
		};
	},
	
	//选中和不选
	MaintainSP_itemTpl:function(dataview, index, target, record, e, eOpts){
		var sbenoCheck=document.getElementsByName('groupCheckbox');
		if(sbenoCheck[index].className=='p_judge_box')
      {
          sbenoCheck[index].className = 'p_judge_box_clicked';
      }
      else
      {
          sbenoCheck[index].className = 'p_judge_box';
      };
	},

	//确认签到
	MSPaffirm:function(){
		//获得条件日期
		var MaintainAloneTime= Ext.getCmp('MaintainAloneTime').getValue();
		obj=this;
		//从JSON中获取数据
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
		var Maintxml={tcode:'mainregister',tid:MaintainAloneTime};
		var options={
				exacte:false,//默认
				};
		MaintainList.find(Maintxml,options).then(function(arrayResults){
			var DataQD=arrayResults[0];
			//获取签到的数据
			console.log(JSON.stringify(DataQD));
			var ghqd=[];
			//坐标
			var zb=0;
			//计数
			var count=0;
			//修改
			var sbenoCheck=document.getElementsByName('groupCheckbox');
			var length=sbenoCheck.length;
			
			//获得多个工号
			var dataASSET_NUM=[];
			//获得多个日期
			var psd=[];
		    //获得多个MP_ID
			var mpid_QD=[];
			
			for(var i=0;i<length;i++){
				if(sbenoCheck[i].className=='p_judge_box_clicked')
		          {
					  ghqd[i]=DataQD.json.stext[i];
					  ghqd[i].REGISTRATION='已签到';
					  
			    	  dataASSET_NUM[zb]=ghqd[i].ASSET_NUM;
			    	  psd[zb]=ghqd[i].PLAN_START_DT;
			    	  mpid_QD[zb]=ghqd[i].MP_ID;
			    	  zb++;
		          }else{
		        	  ghqd[i]=DataQD.json.stext[i];
		        	  count++;
		          };
			};
			
			//获得多个工号
			dataASSET_NUM=JSON.stringify(dataASSET_NUM);
			Ext.getCmp('dataASSET_NUM').setValue(dataASSET_NUM);
			//获得多个日期
			psd=JSON.stringify(psd);
			Ext.getCmp('psd').setValue(psd);
			//获得多个MP_ID
			mpid_QD=JSON.stringify(mpid_QD);
			Ext.getCmp('mpid_QD').setValue(mpid_QD);
			
			if(count==length){
				WL.Toast.show("至少选中一项！");
				return;
			};
			
			ghqd=JSON.stringify(ghqd);
			 Ext.getCmp('CGQD').setValue(ghqd);
			//测试用
			//var id='95E5FD9190833EEC';
			var id=WL.Device.getID();
			var trim="{'UUID':'"+id+"'}";
			obj.connectServerMainTain(obj.MSPaffirmone,obj,"empLocationAction.do?method=toSearchNearEmp",trim);
		}).fail(function(errorObject){
    		console.log('签到数据查询成功');	
		});
	},
	
	//获取签到信息
	MSPaffirmone:function(result,obj){
		var data=result.item;
		console.log('获取坐标xy'+data.MLAT+" "+data.MLON);
	
/*		//Y轴坐标
		latitude='23.01133';
		//X轴坐标
		longitude='113.13382';
		//设备号
		deviceno='95E5FD9190833EEC';*/
		
		longitude=data.MLAT;
		latitude=data.MLON;
		var deviceno=WL.Device.getID();
		var ext3='MAINTAIN';
		
		//获得多个工号
		var dataASSET_NUM=Ext.getCmp('dataASSET_NUM').getValue();
		dataASSET_NUM=eval("("+ dataASSET_NUM +")");
		
		//获得多个日期
		var psd=Ext.getCmp('psd').getValue();
		psd=eval("("+ psd +")");
		
		//获得多个MP_ID
		var mpid_QD=Ext.getCmp('mpid_QD').getValue();
		mpid_QD=eval("("+ mpid_QD +")");
		
		var trim="{'latitude':'"+latitude+"','longitude':'"+longitude+"'," +
				"'userid':'"+userid+"','ext2':'"+dataASSET_NUM+"','ext3':'"+ext3+"'," +
				"'PLAN_START_DT':'"+psd+"','deviceno':'"+deviceno+"'," +
				"'person_id':'"+person_id+"','MP_ID':'"+mpid_QD+"'}";
		obj.connectServerMainTain(obj.MSPaffirm3,obj,"usersLocationAction.do?method=toSignIn",trim);
	},
	
	//进入从修改进入删除
	MSPaffirm3:function(result,obj){
		WL.Toast.show(result.msginfo);
		console.log('进入方法MSPaffirm3'+JSON.stringify(result));
		if(result.msgid==0){
			obj.MainQidanAdd();
		};
	},
	
	//签到页面从JSONStore中添加数据    (先删后加)
	MainQidanAdd:function(){
		//成功的签到
		var CGQD=Ext.getCmp('CGQD').getValue();
		CGQD=eval("("+ CGQD +")");
		
		//获得条件日期
		var MaintainAloneTime= Ext.getCmp('MaintainAloneTime').getValue();
		
		var MaintList2=Ext.data.StoreManager.get('MaintenanceSigninPanelStore');
		if (!MaintList2) { 
			MaintList2 = Ext.create("HelcPDA.store.maintain.MaintenanceSigninPanelStore"); 
		};
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var MaintSC={tcode:'mainregister',tid:MaintainAloneTime};
    	var MaintTJ={tcode:'mainregister',tid:MaintainAloneTime,stext:CGQD};
    	var options={};
    	MaintainList.remove(MaintSC,options).then(function(){
    		
    		MaintainList.add(MaintTJ).then(function(){
    			console.log('进添加来了mainregister');
    			MaintList2.setData(CGQD, this);
    			
    		}).fail(function(errorObject){
        		console.log('添加进添加来了mainregister出错');	
    		});
    	}).fail(function(errorObject){
    		console.log('删除签到数据成功');	
		});
	},
	
	//全部（签到）  
	MSPwhole:function(){
		//获得条件日期
		var MaintainAloneTime= Ext.getCmp('MaintainAloneTime').getValue();
		
		var MaintList2=Ext.data.StoreManager.get('MaintenanceSigninPanelStore');
		if (!MaintList2) { 
			MaintList2 = Ext.create("HelcPDA.store.maintain.MaintenanceSigninPanelStore"); 
		};
		
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
		var Maintxml={tcode:'mainregister',tid:MaintainAloneTime};
		var options={
				exacte:false,//默认
				};
		MaintainList.find(Maintxml,options).then(function(arrayResults){
			MaintList2.setData(arrayResults[0].json.stext, this);
		}).fail(function(errorObject){
			console.log('签到数据查询失败');
		});
	},
	
	//已签到
	MSPyqd:function(){
		this.judgeYandW('已签到');
	},
	
	//未签到
	MSPwqd:function(){
		this.judgeYandW('');
	},
	
	//显示已签到和未签到的方法  2014-7-1
	judgeYandW:function(tiaojian){
		//获得条件日期
		var MaintainAloneTime= Ext.getCmp('MaintainAloneTime').getValue();
		
		var MaintList2=Ext.data.StoreManager.get('MaintenanceSigninPanelStore');
		if (!MaintList2) { 
			MaintList2 = Ext.create("HelcPDA.store.maintain.MaintenanceSigninPanelStore"); 
		};
		
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
		var Maintxml={tcode:'mainregister',tid:MaintainAloneTime};
		var options={
				exacte:false,//默认
				};
		MaintainList.find(Maintxml,options).then(function(arrayResults){
			var dataSJ=[];
			var count=arrayResults[0].json.stext.length;
			var index=0;
			for(var i=0;i<count;i++){
				if(arrayResults[0].json.stext[i].REGISTRATION==tiaojian){
					dataSJ[index]=arrayResults[0].json.stext[i];
					index++;
				};
			};
			MaintList2.setData(dataSJ, this);
		}).fail(function(errorObject){
			console.log('签到数据查询失败');
		});
	},
	
	/**
	 **签到页面
	 ************************************************************************************/
	
	
	/************************************************************************************
	 * 公共方法 
	 * */
	
	//获取从远程数据库中查找的当月保养日期 (公共方法)
	mppmaddcalendar:function(result,obj){
		var num = '';
		var days = '';
		var resp = result.PlanListQuery_Output;
		if(resp.NumOutputObjects > 0){
			var respo = resp.ListOfHelPdaMaintainingPlanListIo.HelMaintainPlan;
			if(respo.length){
				//可能需要将respo按日期排序。
				num = Ext.Date.format(new Date(respo[0].PlanStartDate),'Y-m-d');
				for(var i = 1;i < respo.length;i++){
					days = Ext.Date.format(new Date(respo[i].PlanStartDate),'Y-m-d');
					if(num.indexOf(days) < 0){
						num += ','+days;
					}
				}
			}else{
				num = Ext.Date.format(new Date(respo.PlanStartDate),'Y-m-d');
			}
		}else{
			console.log('没有保养计划');
		}
		
		//获取年和月,在计算天数
		var MppmYear= '';
		var MppnMonth= '';
		//如果是从日滨页面跳转过来，就跳过登录页面直接登录
		var page = localStorage.page;
		if(page != "" && page != null && typeof(page) != "undefined"){
			var timeArray = MaintainTime.split('-');
			MppmYear = timeArray[0];
			MppnMonth = timeArray[1];
		}else{
			MppmYear = Ext.getCmp('MppmYear').getValue();
			MppnMonth = Ext.getCmp('MppnMonth').getValue();
		}
		
//    	var day=this.countDay(MppmYear,MppnMonth);
    	var day = HelcPDA.app.getController('ApplicationController').countDay(MppmYear,MppnMonth);
    	var yearandmonth=MppmYear+'-'+MppnMonth;
    	//2014-5-12 方法改变
//		var newRL=obj.calendarAdd(num,day,yearandmonth);
		var newRL = HelcPDA.app.getController('ApplicationController').calendarAdd(num,day,yearandmonth);
		console.log('最后获取的值: '+newRL);
		var RLDate=Ext.data.StoreManager.get('Date');
		if (!RLDate) { 
			RLDate = Ext.create("HelcPDA.store.maintain.Date"); 
		};
		RLDate.setData(newRL);
		
		var page = localStorage.page;
		if(page != "" && page != null && typeof(page) != "undefined"){
			RB_page_flag = 'main_end';
//			obj.getApplication().getController('maintain.MaintenaceCtrl').MPPMRLDay();
			HelcPDA.app.getController('maintain.MaintenaceCtrl').MPPMRLDay();
		}
	},

	
	//判断是读取本地还是远程下载
	todayisgood:function (data,obj){
		var aa=data.length;
		console.log("本地数据是否有数据:"+JSON.stringify(aa));
		
		//测试用 可删除 2014-4-2 xcx
		var MaintainAloneTime=Ext.getCmp('MaintainAloneTime').getValue();
		console.log('MaintainAloneTime的时间是:'+MaintainAloneTime);
		console.log('todayisgoods的seeatid: '+seeatid);
		if(aa<=0){
			//特殊的两个 字段,每次从远程数据库中读取数据时，先删除，在添加
			var Maintain=collectionName;
	    	var MaintainList=WL.JSONStore.get(Maintain);
	    	var Maintxml={tcode:'mainxmlName'};
	    	var options={exact:true};//默认是false
				MaintainList.remove(Maintxml,options).then(function(){
					console.log('Maintxml删除成功');
					//ID要改为获取全局的  2014-4-2 xcx
//					obj.connectServerMainTain(obj.handleResult,obj,"maintainancePlanItemListAction.do?method=toSearchDetail2","{'person_id':'"+seeatid+"','date':'"+MaintainAloneTime+"','position_type':'"+position_type+"'}");
					var parameters = {
							procedure : 'PlanListQuery',
							isLoading : true,
							contentStr : "{\"person_id\":\""+seeatid+"\"}",
							startD : Ext.Date.format(new Date(MaintainAloneTime),'m/d/Y'),
							endD : Ext.Date.format(Ext.Date.add(new Date(MaintainAloneTime),Ext.Date.DAY,1),'m/d/Y')
					};
								
					MainCtr.getDataFromServer(obj.handleResult,parameters);
				}).fail(function(){
					console.log('Maintxml删除失败');
				});
		}else{
			console.log("查询数据存在");
			obj.GainMainTainList();
		};
		
	},
	
	/**
	 **公共方法
	 ************************************************************************************/
	
	
/**
 * MaintenancePlanPanel 按当天查询的方法的方法
 * 是通过工号和当前日期查出员工的保养计划，在把查询到了数据中的MP_ID 和 PLAN_START_DT作为条件
 */	
/*	buttonMaintain:function(){
		MainRL_XuanZhongXB=0;
		//获取当前时间按
    	var myDate = new Date();
    	var yue=myDate.getMonth()+1;
    	
		//给予条件正确的判断
		var newmonth=myDate.getMonth()+1;
		var newday=myDate.getDate();
		if(newmonth<10){
			newmonth='0'+newmonth; 
		};
		if(newday<10){
			newday='0'+newday;
		};
		
		//服务器查询用时间
		var data3=myDate.getFullYear()+"-"+newmonth+"-"+newday;
		console.log('服务器判断用的正确格式时间:'+data3);
		
		//不变的当天时间 xcx  2014-5-16
		bbtime=data3;
		
		 MppmYear=myDate.getFullYear();
    	 MppnMonth=newmonth;
		
		//获取查询日期
		MaintainAloneTime=data3;
		
		//方法在这，暂时锁死   2014-4-3
		//公共查询日的方法
		this.commonalitySelect(this,MaintainAloneTime);
		
		//登录用户的ID
		seeatid=person_id;
		console.log('buttonMaintain的seeatid: '+seeatid);

		//跳转页面     
		this.NextView("Maintainlist","HelcPDA.view.maintain.MaintenancePlanPanel");
		
	/////////	
	},*/
	
	
	
	
	
	//将远程下载的数据添加到JSONStore中
	handleResult: function(result,obj) {
	   	//将查询到的数据放入JSONStore
    	//声明JSONStote
		console.log('---更新成功：'+JSON.stringify(result));
		
    	var MaintainList=WL.JSONStore.get(collectionName);
		//
    	var dataMsg=result.secmsg;
    	// var json = eval("("+ dataMsg +")");
    	var dataMsg2=JSON.stringify(result.secmsg);

    	if(dataMsg!=null){
        	var dataM=dataMsg.PNAME;
        	//如果当月有保养项目是不为undefined
        	if(dataMsg2!='{}'&&JSON.stringify(result.secmsg)!='null'&&dataM!=undefined&&dataM!=null&&dataM.length>0){
       /* 		if(){
        			
        	    	if(){
        	    		if(){
    	    	    		if(){*/
    	    	    		  	var  dataSecMsg=[];
    	    	    			var nn=dataM.length;
    	    	            	for(var i=0;i<nn;i++){
    	    	            		var Maintmsg={};
    	    	            		if(dataM[i]=='半年度'){
    	    	            			Maintmsg={tcode:'mainsecmsg',tid:'BND',stext:dataMsg.半年度};
    	    	            		}else if(dataM[i]=='半月'){
    	    	            			Maintmsg={tcode:'mainsecmsg',tid:'BY',stext:dataMsg.半月};
    	    	            		}else{
    	    	            			Maintmsg={tcode:'mainsecmsg',tid:'',stext:''};
    	    	            		};
    	    	            		dataSecMsg[i]=Maintmsg;
    	    	            	};
    	    	            	MaintainList.add(dataSecMsg).then(function(){
    	    	            		addSecMsg(obj);
    	    	        		    /*var Maintmsg={tcode:'mainsecmsg',tid:'BND'};
    		    	        		var options={};
    		    	            	MaintainList.find(Maintmsg,options).then(function(arrayResults){
    		    	        				
    		    	        		}).fail(function(errorObject){
    			    	        	});*/
    	    	            	}).fail(function(errorObject){
    	    	            		WL.Toast.show("添加出错！");
    	    	        		});
    	    	            	/*function getss(Maintmsg,options){
    	    	            	}*/
    	/*    	    		};
        	    		}
        	    	};
            	};*/
        	}else{
        		addSecMsg(obj);
        	};
    	}else{
    		addSecMsg(obj);
    	};


    	
    	
    	function addSecMsg(obj){
    		var Maintxml={tcode:'mainxmlName',stext:result.xmlName};
    		MaintainList.add(Maintxml).then(function(){
//    			var length = result.fields.length;
    			var length = result.PlanListQuery_Output.NumOutputObjects
				var ndata=[];
				if(length>0){
					var v_result = result.PlanListQuery_Output.ListOfHelPdaMaintainingPlanListIo.HelMaintainPlan;
					
					//增加遥监信息 开始 czq
					var v_DeviceNos;
					if(v_result.length){
						v_DeviceNos = '*'+v_result[0].AssetNumber+'*';
						for(var i = 1;i < v_result.length;i++){
							v_DeviceNos += ',*'+v_result[i].AssetNumber+'*';
						}
					}else{
						v_DeviceNos = '*'+v_result.AssetNumber+'*';
					}
					
					var getEssResult = function(res){
						var id;
						var MainAdd;
						//czq
						if(v_result.length){
							for(var i = 0;i < v_result.length;i++){
								v_result[i].ISACTIVE = res.ess_list[0][v_result[i].AssetNumber];
								id = v_result[i].Id+'/'+Ext.Date.format(new Date(v_result[i].PlanStartDate),'Y-m-d H:i');
								MainAdd = {tcode:'mainfields',tid:id,stext:v_result[i]};
								ndata[i] = MainAdd;
							}
						}else{
							v_result.ISACTIVE = res.ess_list[0][v_result.AssetNumber];
							id = v_result.Id+'/'+Ext.Date.format(new Date(v_result.PlanStartDate),'Y-m-d H:i');
							MainAdd={tcode:'mainfields',tid:id,stext:v_result};
							ndata[0] = MainAdd; 
						}
						/* 旧的保养计划
							for(var i=0;i<length;i++){
					    		var id=result.fields[i].MP_ID+'/'+result.fields[i].PLAN_START_DT;
					    		var MainAdd={tcode:'mainfields',tid:id,stext:result.fields[i]};
					    		ndata[i] = MainAdd; 
					    	};   	
					    */
				    	MaintainList.add(ndata).then(function(){
				    		/*旧的保养计划czq
				    		var length = result.item.length;
				    		if(length>0){
				    			var ndata2=[];
							    for(var i=0;i<length;i++){
							    	var id=result.item[i].MP_ID+'/'+result.item[i].TASK_ROW_ID;
							    	var MainAdd={tcode:'MAINITEM',tid:id,stext:result.item[i]};
							    	ndata2[i] = MainAdd; 
							    }; 
							    
							    //2014-7-5
								Ext.getCmp('MainPlan_MAINMAINITEM_CZ').setValue(JSON.stringify(ndata2));
						    	
								MaintainList.add(ndata2).then(function(){
						    		
						    		obj.GainMainTainList();
						    	}).fail(function(errorObject){
						    		console.log('添加进添加来了mainitem出错');	
			    	    		});
				    		}else{
				    			obj.GainMainTainList();
				    		};
				    		*/

				    		HelcPDA.app.getController('maintain.MaintenaceCtrl').GainMainTainList();
				    	}).fail(function(errorObject){
				    		console.log('添加mainfields出错');	
				   		});
					}
					
					MainCtr.asyconnectServer(getEssResult,"maintainancePlanItemListAction.do?method=toSearchESS","{'DeviceNos':'"+v_DeviceNos+"'}");
					
				}else{
		    		var MaintList=Ext.data.StoreManager.get('MaintainPlanList');
		    		if (!MaintList) { 
		    			MaintList = Ext.create("HelcPDA.store.maintain.MaintainPlanList"); 
		    		};
		    		MaintList.setData(ndata, this);
		    		WL.Toast.show("当天暂无保养计划或已完成！");
		    	}   
			}).fail(function(errorObject){
				WL.Toast.show("添加出错！");
			});
    		
    	};
    	
    ////////////
	},
	
	//为保养计划添加数据仓
	GainMainTainList:function(){
		console.log('GainMainTainList方法');
	
		//为数据仓添加数据
		var MaintList=Ext.data.StoreManager.get('MaintainPlanList');
		if (!MaintList) { 
			MaintList = Ext.create("HelcPDA.store.maintain.MaintainPlanList"); 
		};
		
		//获得条件日期
		var MaintainAloneTime= Ext.getCmp('MaintainAloneTime').getValue();
		console.log('MaintainAloneTime:'+MaintainAloneTime);
		console.log('为数据仓添加数据');
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:'mainfields',tid:MaintainAloneTime};
		var options={
			exacte:false,//默认
		};
		MaintainList.find(query,options).then(function(arrayResults){
			console.log('保养页面查询到了'+JSON.stringify(arrayResults));
			
			//2014-7-5
			Ext.getCmp('MainPlan_MAINFIELD_CZ').setValue(JSON.stringify(arrayResults));
			
			var data=arrayResults.length;
			var ndata = [];
			//2014-5-16  工具提示
			var gjts=[];
			//判断当天是否有数据  2014-4-12 xcx
			if(data>0){
				for(var i=0;i<data;i++){
					
//					var time=arrayResults[i].json.stext.PLAN_START_DT.split(' ');
					var time=Ext.Date.format(new Date(arrayResults[i].json.stext.PlanStartDate),'Y-m-d H:i').split(' ');
					console.log('time[0]:  '+time[0]);
					console.log('time[1]:  '+time[1]);
					
					var trim={};
					/*旧的保养计划czq 开始
					trim.PLAN_START_DT=arrayResults[i].json.stext.PLAN_START_DT;
					trim.ASSET_NUM=arrayResults[i].json.stext.ASSET_NUM;
					trim.DOMAIN_NAME=arrayResults[i].json.stext.DOMAIN_NAME;
					trim.PNAME1=arrayResults[i].json.stext.PNAME1;
					trim.PNAME2=arrayResults[i].json.stext.PNAME2;
					trim.PNAME3=arrayResults[i].json.stext.PNAME3;
					trim.TASK_NAME=arrayResults[i].json.stext.TASK_NAME;
					trim.PLAN_STATUS=arrayResults[i].json.stext.PLAN_STATUS;
					trim.PLAN_EMP_IDS=arrayResults[i].json.stext.PLAN_EMP_IDS;
					trim.MP_ID=arrayResults[i].json.stext.MP_ID;
					trim.REGISTRATION=arrayResults[i].json.stext.REGISTRATION;
					if(typeof(arrayResults[i].json.stext.PDA_UPD_DATE) != "undefined" ){
						trim.PDA_UPD_DATE=arrayResults[i].json.stext.PDA_UPD_DATE.substr(5);
					}else{
						trim.PDA_UPD_DATE='';
					}
					if(arrayResults[i].json.stext.ISACTIVE=='1'){
						trim.ISACTIVE='遥监已激活';
					}else if(arrayResults[i].json.stext.ISACTIVE=='0'){
						trim.ISACTIVE='遥监未激活';
					}else{
						trim.ISACTIVE='遥监未安装';
					}
					if(arrayResults[i].json.stext.PLAN_STATUS=='已计划'){
						trim.BYCSS='p_submit_yes';
					}else if(arrayResults[i].json.stext.PLAN_STATUS=='已完成'){
						trim.BYCSS='p_submit_no';
					}else{
						trim.BYCSS='NNNNNNNNNUUUUUUUU';
					};
					
					//
					trim.HHMMTime=time[1];
					
//					ndata[i] = arrayResults[i].json.stext;
					ndata[i]=trim;
					gjts[i]=arrayResults[i].json.stext.PLAN_TOOLS;
					*/
					trim.PLAN_START_DT=Ext.Date.format(new Date(arrayResults[i].json.stext.PlanStartDate),'Y-m-d H:i');
					trim.ASSET_NUM=arrayResults[i].json.stext.AssetNumber;
					trim.DOMAIN_NAME=arrayResults[i].json.stext.DomainName;
					trim.PNAME1=arrayResults[i].json.stext.Employee1;
					trim.PNAME2=arrayResults[i].json.stext.Employee2;
					trim.PNAME3=arrayResults[i].json.stext.Employee3;
//					trim.TASK_NAME=arrayResults[i].json.stext.TASK_NAME;//保养项目名称
					trim.PLAN_STATUS=arrayResults[i].json.stext.PlanStatus;
					trim.PDA_UPD_DATE=arrayResults[i].json.stext.PDAUpdateDate==''?'':Ext.Date.format(new Date(arrayResults[i].json.stext.PDAUpdateDate),'Y-m-d H:i');
					var v_plan_emp_names;
					if(trim.PNAME1!=''){
						v_plan_emp_names = trim.PNAME1;
					}
					if(trim.PNAME2!=''){
						v_plan_emp_names += '/'+trim.PNAME2;
					}
					if(trim.PNAME3!=''){
						v_plan_emp_names += '/'+trim.PNAME3;
					}
					trim.PLAN_EMP_IDS=v_plan_emp_names;
					trim.MP_ID=arrayResults[i].json.stext.Id;
//					trim.REGISTRATION=arrayResults[i].json.stext.REGISTRATION;//不明字段
					if(arrayResults[i].json.stext.ISACTIVE==true){//遥监字段
		                trim.ISACTIVE='遥监已激活';
					}else if(arrayResults[i].json.stext.ISACTIVE==false){
		                trim.ISACTIVE='遥监未激活';
					}else{
		                trim.ISACTIVE='遥监未安装';
					}
					if(arrayResults[i].json.stext.PlanStatus=='已计划'){
//						trim.BYCSS='p_submit_yes';
						trim.BYCSS='p_submit_no';
					}else if(arrayResults[i].json.stext.PlanStatus=='已完成'){
//						trim.BYCSS='p_submit_no';
						trim.BYCSS='p_submit_yes';
					}else{
						trim.BYCSS='NNNNNNNNNUUUUUUUU';
					};
					trim.HHMMTime=time[1];
					ndata[i]=trim;
					gjts[i]=arrayResults[i].json.stext.PlanTools;
				};	
			}else{
				/*console.log('添加无明显显示');
				WL.Toast.show("当天暂无保养计划或已完成！");  */
			};
			
			var query={tcode:'_Value',tid:'_Value'};
			var optionsValue={};
			MaintainList.find(query,optionsValue).then(function(arrayResults){
				console.log('_value查询到了'+JSON.stringify(arrayResults));
				var count=arrayResults.length;
				if(count!=0){
					for(var i=0;i<data;i++){
						for(var j=0;j<count;j++){
							var trim=ndata[i].MP_ID+'/'+ndata[i].PLAN_START_DT+'_Value';
							var array_tid=arrayResults[j].json.tid;
							var array_tcode=arrayResults[j].json.tcode;
							
							if((trim==array_tid)&&(trim==array_tcode)){
								if(arrayResults[j].json.status==''){
									ndata[i].PLAN_STATUS='已计划';
								}else if(arrayResults[j].json.status==undefined){
									ndata[i].PLAN_STATUS='已计划';
								}else if(arrayResults[j].json.status==1){
									ndata[i].PLAN_STATUS='正在等待提交';
								}else if(arrayResults[j].json.status==2){
									ndata[i].PLAN_STATUS='已提交';
								};
								
								
								if(arrayResults[j].json.status==''){
									ndata[i].BYCSS='p_submit_yes';
								}else if(arrayResults[j].json.status==undefined){
									ndata[i].BYCSS='p_submit_yes';
								}else if(arrayResults[j].json.status==2){
									ndata[i].BYCSS='p_submit_no';
								}else if(arrayResults[j].json.status==1){
									ndata[i].BYCSS='p_submit_yes';
								}else{
									ndata[i].BYCSS='NNNNNNNNNUUUUUUUU';
								};
								
							};
						};
					};
					
				};
				
				//在添加新的数据
				MaintList.setData(ndata, this);
				//判断
				if(gjts[0]!=''){
					var ss='';
					for(var i=0;i<gjts.length;i++){
						ss+=gjts[i]+'\n';
					};
					var list=gjts.unique3();
					var xs='';
					
					for(var i=0;i<list.length;i++){
						var fj=list[i].split('、');
						if(fj==0){
							xs+=list[i]+'<br>';
						}else{
							for(var j=0;j<fj.length;j++){
								xs+=fj[j]+'<br>';
							};
						};
						
					};
					
					//不变的当天时间 xcx  2014-5-16
					var bbtime=Ext.getCmp('bbtime').getValue();
					
					var query={tid:bbtime,tcode:MaintainAloneTime};
					MaintainList.find(query,options).then(function(arrayResults){
						var num=arrayResults.length;
						if(num==0){
							ovlay_MainTain3=Ext.Viewport.add({
								xtype:'panel',
								id:'statPanel3',
								height:'80%',
						     	width: '90%',
								hideOnMaskTap: false,
					 	            centered: true,
							     	modal: true,
							     	style: 'background:#ccc',
							        items: [{
							                xtype: 'container',
							                id: 'xx1',
							                height: '100%',
							                margin: '0 auto 0 auto',
							                padding: '',
							                style: 'background:#fff',
							                width: '100%',
							                layout: 'vbox',
							                items: [
							                    {
							                        xtype: 'toolbar',
							                        docked: 'top',
							                        title: '保养工具',
							                        items: [
							                            {
							                                xtype: 'spacer'
							                            },
							                            {
							                                xtype: 'button',
							                                iconCls: 'delete',
							                                text: '',
							                                id:'Main_PLAN_BYGJ',
							                            }
							                        ]
							                    },
							                    {
							                        xtype: 'formpanel',
							                        padding: 10,
							                        height: '80%',
							                        items: [
							                            {
							                                xtype: 'label',
							                                height: '100%',
							                                html: '<div id="plan_tools"></div>',
							                                margin: '0 0 10 0'
							                            }
							                        ]
							                    },
							                    {
			                                        xtype: 'formpanel',
			                                        height: '10%',
			                                        layout: 'hbox',
			                                        items: [
			                                            {
			                                                xtype: 'label',
			                                             
			                                                width: '74%',
			                                                html: '&nbsp&nbsp请确认是否填写KY，如无请前往！',
			                                                id:'kylabel',

			                                            },
			                                            {
			                                                xtype: 'button',
			                                          
			                                                style: 'border:0;',
			                                                width: '10%',
			                                                iconCls: 'arrow_right',
			                                                id:'gotoky',
			                                                text: '前往'
			                                            }
			                                        ]
			                                    },
							                    {
					                                xtype: 'togglefield',
					                                height: '10%',
					                                label: '今天不再显示',
					                                labelWidth: '74%',
					                                id:'Main_togglefield',
					                                name: '',
					                            },
							                ]
							            }]
							});
							
							document.getElementById("plan_tools").innerHTML=xs;
							var bygjHeight=gjts.length;
							document.getElementById("plan_tools").style.height=(22*bygjHeight)+'px';
						};
						
						//查找MAINITEM
						var MAINITEMAdd={tcode:'MAINITEM'};
						var optionsMAINI={};
						MaintainList.find(MAINITEMAdd,optionsMAINI).then(function(arrayResults){
							  //2014-7-5
							Ext.getCmp('MainPlan_MAINMAINITEM_CZ').setValue(JSON.stringify(arrayResults));
							console.log('查询成功');
						}).fail(function(errorObject){
							WL.Toast.show("查询数据失败！");
						});
						
					}).fail(function(errorObject){
						WL.Toast.show("查询数据失败！");
					});
				};

			}).fail(function(errorObject){
				WL.Toast.show("查询数据失败！");
			});

		}).fail(function(errorObject){
			WL.Toast.show("查询数据失败！");
		});
	////////////
	},
	

	////////////////////////////////////////////
	
	//2014-6-23 yk要的刷新方法
	LoadGHlist : function(time){
		var times=time.split(' ');
		var day='';
		if(times.length!=2){
			day=times.split('-');
		}else if(times.length==2){
			 day=times[0].split('-');
		};
		var mm=day[1];
		var mm2=mm.split('');
		if(mm2.length!=2){
			mm='0'+mm; 
		};
		var dd=day[2];
		var dd2=dd.split('');
		if(dd2.length!=2){
			dd='0'+dd; 
		};
		var newtime=day[0]+'-'+mm+'-'+dd;
		
		//为数据仓添加数据
		var MaintList=Ext.data.StoreManager.get('MaintainPlanList');
		if (!MaintList) { 
			MaintList = Ext.create("HelcPDA.store.maintain.MaintainPlanList"); 
		};
		console.log('为数据仓添加数据');
		var Maintain=collectionName;
		var MaintainList=WL.JSONStore.get(Maintain);
		var query={tcode:'mainfields',tid:newtime};
		var options={
			exacte:false,//默认
		};
		MaintainList.find(query,options).then(function(arrayResults){
			var data=arrayResults.length;
			var ndata = [];
			//2014-5-16  工具提示
			var gjts=[];
			//判断当天是否有数据  2014-4-12 xcx
			if(data>0){
				for(var i=0;i<data;i++){
					
					var time=arrayResults[i].json.stext.PLAN_START_DT.split(' ');
					console.log('time[0]:  '+time[0]);
					console.log('time[1]:  '+time[1]);
					
					var trim={};
					trim.PLAN_START_DT=arrayResults[i].json.stext.PLAN_START_DT;
					trim.ASSET_NUM=arrayResults[i].json.stext.ASSET_NUM;
					trim.DOMAIN_NAME=arrayResults[i].json.stext.DOMAIN_NAME;
					trim.PNAME1=arrayResults[i].json.stext.PNAME1;
					trim.PNAME2=arrayResults[i].json.stext.PNAME2;
					trim.PNAME3=arrayResults[i].json.stext.PNAME3;
					trim.TASK_NAME=arrayResults[i].json.stext.TASK_NAME;
					trim.PLAN_STATUS=arrayResults[i].json.stext.PLAN_STATUS;
					trim.PLAN_EMP_IDS=arrayResults[i].json.stext.PLAN_EMP_IDS;
					trim.MP_ID=arrayResults[i].json.stext.MP_ID;
					trim.REGISTRATION=arrayResults[i].json.stext.REGISTRATION;
					////
       			    if(arrayResults[i].json.stext.ISACTIVE=='1'){
	                trim.ISACTIVE='遥监已激活';
                    }else if(arrayResults[i].json.stext.ISACTIVE=='0'){
	                trim.ISACTIVE='遥监未激活';
                    }else{
	                trim.ISACTIVE='遥监未安装';
                    }
					if(arrayResults[i].json.stext.PLAN_STATUS=='已计划'){
						trim.BYCSS='p_submit_yes';
					}else if(arrayResults[i].json.stext.PLAN_STATUS=='已完成'){
						trim.BYCSS='p_submit_no';
					}else{
						trim.BYCSS='NNNNNNNNNUUUUUUUU';
					};
					//
					trim.HHMMTime=time[1];
					ndata[i]=trim;
					gjts[i]=arrayResults[i].json.stext.PLAN_TOOLS;
				};	
			}else{
				/*console.log('添加无明显显示');
				WL.Toast.show("当天暂无保养计划或已完成！");  */
			}
			
			var query={tcode:'_Value',tid:'_Value'};
			var optionsValue={};
			MaintainList.find(query,optionsValue).then(function(arrayResults){
				console.log('_value查询到了'+JSON.stringify(arrayResults));
				var count=arrayResults.length;
				if(count!=0){
					for(var i=0;i<data;i++){
						for(var j=0;j<count;j++){
							var trim=ndata[i].MP_ID+'/'+ndata[i].PLAN_START_DT+'_Value';
							var array_tid=arrayResults[j].json.tid;
							var array_tcode=arrayResults[j].json.tcode;
							if((trim==array_tid)&&(trim==array_tcode)){
								/*if(arrayResults[j].json.status==''){
									ndata[i].PLAN_STATUS='已计划';
								}else if(arrayResults[j].json.status==undefined){
									ndata[i].PLAN_STATUS='已计划';
								}else*/ if(arrayResults[j].json.status==1){
									ndata[i].PLAN_STATUS='正在等待提交';
									arrayResults[j].json.stext.PLAN_STATUS='正在等待提交';
									MaintainList.refresh(arrayResults[j]).then(function(){
									}).fail(function(){});
									
								}else if(arrayResults[j].json.status==2){
									ndata[i].PLAN_STATUS='已提交';
									arrayResults[j].json.stext.PLAN_STATUS='已提交';
									MaintainList.refresh(arrayResults[j]).then(function(){
									}).fail(function(){});
									
								};
								
								if(arrayResults[j].json.status==''){
									ndata[i].BYCSS='p_submit_yes';
								}else if(arrayResults[j].json.status==undefined){
									ndata[i].BYCSS='p_submit_yes';
								}else if(arrayResults[j].json.status==2){
									ndata[i].BYCSS='p_submit_no';
								}else if(arrayResults[j].json.status==1){
									ndata[i].BYCSS='p_submit_yes';
								}else{
									ndata[i].BYCSS='NNNNNNNNNUUUUUUUU';
								};
								
							};
						
						};
					};
					MaintList.setData(ndata, this);
				};
				
					}).fail(function(errorObject){
						WL.Toast.show("查询数据失败");
					});
				
			}).fail(function(errorObject){
				WL.Toast.show("查询数据失败");
			});
			
	}
	
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

//添加列表框不显示的时间
function disp_confirm()
{
	//获得条件日期
	var MaintainAloneTime= Ext.getCmp('MaintainAloneTime').getValue();
	
	//不变的当天时间 xcx  2014-5-16
	var bbtime=Ext.getCmp('bbtime').getValue();
	
	var Maintain=collectionName;
 	var MaintainList=WL.JSONStore.get(Maintain);
 	var Maintmsg={tid:bbtime,tcode:MaintainAloneTime};
 	MaintainList.add(Maintmsg).then(function(){
 		console.log('disp_confirm添加成功了');
 	}).fail(function(errorObject){
			console.log("查询数据失败");
		});
	 
		var statPanel3=Ext.getCmp('statPanel3');
		if(statPanel3){
			statPanel3.destroy();
		};
};


//待办进入保养模块     2014-6-2
function ceshiyongchaxu(obj,time){
	//登录用户的ID
	seeatid=person_id;
	//alert(time);
/*	var myDate = new Date();
	var yue=myDate.getMonth()+1;
	var data=myDate.getFullYear()+"年"+yue+"月"+myDate.getDate()+"日";*/
	
	//不变的当天时间 xcx  2014-5-16
	Ext.getCmp('bbtime').setValue(time);
	
	//查询年-月-日  获取查询日期
	Ext.getCmp('MaintainAloneTime').setValue(time);
	
	var Maintain=collectionName;
	var MaintainList=WL.JSONStore.get(Maintain);
	var query={tcode:'mainfields',tid:time};
	var options={
		exacte:false,//默认
	};
	//Ext.getCmp('labelTime').setHtml(data);
	MaintainList.find(query,options).then(function(arrayResults){
		ceshiyongchaxu2(arrayResults,obj);
	}).fail(function(arrayResults){
		WL.Toast.show("查询数据失败");
	});
};

//判断JSON中是否有数据
function ceshiyongchaxu2(data,obj){
	//获得条件日期
	var MaintainAloneTime= Ext.getCmp('MaintainAloneTime').getValue();
	
	var aa=data.length;
	if(aa<=0){
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var Maintxml={tcode:'mainxmlName'};
    	var options={exacte:true};//默认是false
		MaintainList.remove(Maintxml,options).then(function(){
			console.log('Maintxml删除成功');
			//czq
//			obj.connectServerMainTain(ceshiyongchaxu4,obj,"maintainancePlanItemListAction.do?method=toSearchDetail2","{'person_id':'"+seeatid+"','date':'"+MaintainAloneTime+"','position_type':'"+position_type+"'}");
			console.log('---新接口'+Ext.Date.format(new Date(MaintainAloneTime),'m/d/Y'));
			var parameters = {
					procedure : 'PlanListQuery',
					isLoading : true,
					contentStr : "{\"person_id\":\""+seeatid+"\"}",
					startD : Ext.Date.format(new Date(MaintainAloneTime),'m/d/Y'),
					endD : Ext.Date.format(Ext.Date.add(new Date(MaintainAloneTime),Ext.Date.DAY,1),'m/d/Y')
			};
			
			MainCtr.getDataFromServer(ceshiyongchaxu4,parameters);
		}).fail(function(){
			WL.Toast.show("删除失败");
		});
	}else{
		console.log("查询数据存在");
		ceshiyongchaxu3();
	};
};

//当JSON中有数据的情况下
function ceshiyongchaxu3(){
	//获得条件日期
	var MaintainAloneTime= Ext.getCmp('MaintainAloneTime').getValue();
	console.log('ceshiyongchaxu3方法');
	//为数据仓添加数据
	var MaintList=Ext.data.StoreManager.get('MaintainPlanList');
	if (!MaintList) { 
		MaintList = Ext.create("HelcPDA.store.maintain.MaintainPlanList"); 
	};
	console.log('为数据仓添加数据');
	var Maintain=collectionName;
	var MaintainList=WL.JSONStore.get(Maintain);
	var query={tcode:'mainfields',tid:MaintainAloneTime};
	var options={
		exacte:false,//默认
	};
	MaintainList.find(query,options).then(function(arrayResults){
		var data=arrayResults.length;
		
		//2014-7-5
		Ext.getCmp('MainPlan_MAINFIELD_CZ').setValue(JSON.stringify(arrayResults));
		
		var ndata = [];
		//2014-5-16  工具提示
		var gjts=[];
		//判断当天是否有数据  2014-4-12 xcx
		if(data>0){
			for(var i=0;i<data;i++){
				
//				var time=arrayResults[i].json.stext.PLAN_START_DT.split(' ');
				var time=Ext.Date.format(new Date(arrayResults[i].json.stext.PlanStartDate),'Y-m-d H:i').split(' ');
				console.log('time[0]:  '+time[0]);
				console.log('time[1]:  '+time[1]);
				
				var trim={};
				//保养计划旧的 开始
				/*
				trim.PLAN_START_DT=arrayResults[i].json.stext.PLAN_START_DT;
				trim.ASSET_NUM=arrayResults[i].json.stext.ASSET_NUM;
				trim.DOMAIN_NAME=arrayResults[i].json.stext.DOMAIN_NAME;
				trim.PNAME1=arrayResults[i].json.stext.PNAME1;
				trim.PNAME2=arrayResults[i].json.stext.PNAME2;
				trim.PNAME3=arrayResults[i].json.stext.PNAME3;
				trim.TASK_NAME=arrayResults[i].json.stext.TASK_NAME;
				trim.PLAN_STATUS=arrayResults[i].json.stext.PLAN_STATUS;
				trim.PLAN_EMP_IDS=arrayResults[i].json.stext.PLAN_EMP_IDS;
				trim.MP_ID=arrayResults[i].json.stext.MP_ID;
				trim.REGISTRATION=arrayResults[i].json.stext.REGISTRATION;
				if(arrayResults[i].json.stext.ISACTIVE=='1'){
	                trim.ISACTIVE='遥监已激活';
                    }else if(arrayResults[i].json.stext.ISACTIVE=='0'){
	                trim.ISACTIVE='遥监未激活';
                    }else{
	                trim.ISACTIVE='遥监未安装';
                    }
				if(arrayResults[i].json.stext.PLAN_STATUS=='已计划'){
					trim.BYCSS='p_submit_yes';
				}else if(arrayResults[i].json.stext.PLAN_STATUS=='已完成'){
					trim.BYCSS='p_submit_no';
				}else{
					trim.BYCSS='NNNNNNNNNUUUUUUUU';
				};
				//
				trim.HHMMTime=time[1];
				ndata[i]=trim;
				gjts[i]=arrayResults[i].json.stext.PLAN_TOOLS;
				*/
				//保养计划旧的 结束
				trim.PLAN_START_DT=Ext.Date.format(new Date(arrayResults[i].json.stext.PlanStartDate),'Y-m-d H:i');
				trim.ASSET_NUM=arrayResults[i].json.stext.AssetNumber;
				trim.DOMAIN_NAME=arrayResults[i].json.stext.DomainName;
				trim.PNAME1=arrayResults[i].json.stext.Employee1;
				trim.PNAME2=arrayResults[i].json.stext.Employee2;
				trim.PNAME3=arrayResults[i].json.stext.Employee3;
//				trim.TASK_NAME=arrayResults[i].json.stext.TASK_NAME;//保养项目名称
				trim.PLAN_STATUS=arrayResults[i].json.stext.PlanStatus;
				var v_plan_emp_names;
				if(trim.PNAME1!=''){
					v_plan_emp_names = trim.PNAME1;
				}
				if(trim.PNAME2!=''){
					v_plan_emp_names += '/'+trim.PNAME2;
				}
				if(trim.PNAME3!=''){
					v_plan_emp_names += '/'+trim.PNAME3;
				}
				trim.PLAN_EMP_IDS=v_plan_emp_names;
				trim.MP_ID=arrayResults[i].json.stext.Id;
//				trim.REGISTRATION=arrayResults[i].json.stext.REGISTRATION;//不明字段
				if(arrayResults[i].json.stext.ISACTIVE==true){//遥监字段
	                trim.ISACTIVE='遥监已激活';
				}else if(arrayResults[i].json.stext.ISACTIVE==false){
	                trim.ISACTIVE='遥监未激活';
				}else{
	                trim.ISACTIVE='遥监未安装';
				}
				if(arrayResults[i].json.stext.PlanStatus=='已计划'){
//					trim.BYCSS='p_submit_yes';
					trim.BYCSS='p_submit_no';
				}else if(arrayResults[i].json.stext.PlanStatus=='已完成'){
//					trim.BYCSS='p_submit_no';
					trim.BYCSS='p_submit_yes';
				}else{
					trim.BYCSS='NNNNNNNNNUUUUUUUU';
				};
				trim.HHMMTime=time[1];
				ndata[i]=trim;
				gjts[i]=arrayResults[i].json.stext.PlanTools;
			};	
		}else{
			/*console.log('添加无明显显示');
			WL.Toast.show("当天暂无保养计划或已完成！");  */
		};
		
		var query={tcode:'_Value',tid:'_Value'};
		var optionsValue={};
		MaintainList.find(query,optionsValue).then(function(arrayResults){
			console.log('_value查询到了'+JSON.stringify(arrayResults));
			var count=arrayResults.length;
			if(count!=0){
				for(var i=0;i<data;i++){
					for(var j=0;j<count;j++){
						var trim=ndata[i].MP_ID+'/'+ndata[i].PLAN_START_DT+'_Value';
						var array_tid=arrayResults[j].json.tid;
						var array_tcode=arrayResults[j].json.tcode;
						if((trim==array_tid)&&(trim==array_tcode)){
							if(arrayResults[j].json.status==''){
								ndata[i].PLAN_STATUS='已计划';
							}else if(arrayResults[j].json.status==undefined){
								ndata[i].PLAN_STATUS='已计划';
							}else if(arrayResults[j].json.status==1){
								ndata[i].PLAN_STATUS='正在等待提交';
							}else if(arrayResults[j].json.status==2){
								ndata[i].PLAN_STATUS='已提交';
							};
							
							
							if(arrayResults[j].json.status==''){
								ndata[i].BYCSS='p_submit_yes';
							}else if(arrayResults[j].json.status==undefined){
								ndata[i].BYCSS='p_submit_yes';
							}else if(arrayResults[j].json.status==2){
								ndata[i].BYCSS='p_submit_no';
							}else if(arrayResults[j].json.status==1){
								ndata[i].BYCSS='p_submit_yes';
							}else{
								ndata[i].BYCSS='NNNNNNNNNUUUUUUUU';
							};
							
						};
						
					};
				};
				
			};
			
			
			//在添加新的数据
			MaintList.setData(ndata, this);
			//判断
			
			if(gjts[0]!=''){
				var ss='';
				for(var i=0;i<gjts.length;i++){
					ss+=gjts[i]+'\n';
				};
				var list=gjts.unique3();
				var xs='';
				for(var i=0;i<list.length;i++){
					var fj=list[i].split('、');
					if(fj==0){
						xs+=list[i]+'<br>';
					}else{
						for(var j=0;j<fj.length;j++){
							xs+=fj[j]+'<br>';
						}
					}
				};
				
				//不变的当天时间 xcx  2014-5-16
				var bbtime=Ext.getCmp('bbtime').getValue();
				var query={tid:bbtime,tcode:MaintainAloneTime};
				MaintainList.find(query,options).then(function(arrayResults){
					var num=arrayResults.length;
					if(num==0){
						ovlay_MainTain3=Ext.Viewport.add({
							xtype:'panel',
							id:'statPanel3',
							hideOnMaskTap: false,
						     	/*style:'height:60%;width:90%;',*/
				 	            centered: true,
						     	modal: true,
						     	height:'80%',
						     	width: '90%',
						     	/*items:[{
						     		xtype:'container',
						     		html:'<div style="height:100%;width:100%;">'+
						     				'<div style="width:100%;height:100%;padding-top:30px">'+
						     					'<div style="width:100%;height:5%;text-align:center;">保养工具</div>'+ 
						     					'<div id="plan_tools" style="width:100%;height:220px;text-align:left;padding-left:10px;" ></div>'+
						     					'<div style="width:100%;height:10%;" >'+
						     						'<div style="width:100%;text-align:center;" >'+
						     						'<input id="fd" name="Fruit" type="checkbox" />'+
						     						'今天不在显示</div>'+
						     						'<div style="width:100%;text-align:center" >'+
						     						'<input type="button" name="BYGJone" value="确定" onclick="disp_confirm()"/>'+
						     						'</div>'+
						     					'</div>'+
						     				'</div>'+
						     				'</div>',
					         }]*/
						     	style: 'background:#ccc',
						        items: [{
						                xtype: 'container',
						                id: 'xx2',
						                height: '100%',
						                margin: '0 auto 0 auto',
						                padding: '',
						                style: 'background:#fff',
						                width: '100%',
						                layout: 'vbox',
						                items: [
						                    {
						                        xtype: 'toolbar',
						                        docked: 'top',
						                        title: '保养工具',
						                        items: [
						                            {
						                                xtype: 'spacer'
						                            },
						                            {
						                                xtype: 'button',
						                                iconCls: 'delete',
						                                text: '',
						                                id:'Main_PLAN_BYGJ',
						                            }
						                        ]
						                    },
						                    {
						                        xtype: 'formpanel',
						                        padding: 10,
						                        height: '80%',
						                        items: [
						                            {
						                                xtype: 'label',
						                                height: '100%',
						                                html: '<div id="plan_tools"></div>',
						                                margin: '0 0 10 0'
						                            }
						                        ]
						                    },
						                    {
		                                        xtype: 'panel',
		                                        height: '10%',
		                                        layout: 'hbox',
		                                        items: [
		                                            {
		                                                xtype: 'label',
		                                             
		                                                width: '90%',
		                                                html: '&nbsp&nbsp请确认是否填写KY，如无请前往！',
		                                                id:'kylabel',

		                                            },
		                                            {
		                                                xtype: 'button',
		                                          
		                                                style: 'border:0;',
		                                                width: '10%',
		                                                iconCls: 'arrow_right',
		                                                id:'gotoky',
		                                                text: '前往'
		                                            }
		                                        ]
		                                    },
						                    {
				                                xtype: 'togglefield',
				                                height: '10%',
				                                label: '今天不再显示',
				                                labelWidth: '74%',
				                                id:'Main_togglefield',
				                                name: '',
				                            },
						                ]
						            }]
						});
						document.getElementById("plan_tools").innerHTML=xs;
					};
					
					//查找MAINITEM
					var MAINITEMAdd={tcode:'MAINITEM'};
					var optionsMAINI={};
					MaintainList.find(MAINITEMAdd,optionsMAINI).then(function(arrayResults){
						  //2014-7-5
						Ext.getCmp('MainPlan_MAINMAINITEM_CZ').setValue(JSON.stringify(arrayResults));
						console.log('查询成功');
					}).fail(function(errorObject){
						WL.Toast.show("查询数据失败！");
					});
					
				}).fail(function(errorObject){
					WL.Toast.show("查询数据失败");
				});
			}
			
			
			
		}).fail(function(errorObject){
			WL.Toast.show("查询数据失败");
		});
		
		
	}).fail(function(errorObject){
		WL.Toast.show("查询数据失败");
	});
};

//当JSON中没有数据的情况下
function ceshiyongchaxu4(result,obj){
	//alert('ceshiyongchaxu4');
	//声明JSONStote
	console.log('ceshiyongchaxu4'+JSON.stringify(result));
	var Maintain=collectionName;
	var MaintainList=WL.JSONStore.get(Maintain);
	//
	var  dataSecMsg=[];
	var dataMsg=result.secmsg;
	
	if(dataMsg!=null){
		var dataMsg2=JSON.stringify(result.secmsg);
		var dataM=dataMsg.PNAME;
		//如果当月有保养项目是不为undefined
		/*if(dataMsg2!='{}'){*/

			/*if(JSON.stringify(result.secmsg)!='null'){*/
				
		    	if(dataMsg2!='{}'&&JSON.stringify(result.secmsg)!='null'&&dataM!=undefined&&dataM!=null&&dataM.length>0){
		    		//alert('11111');
		    		/*if(dataM!=null){
	    	    		if(dataM.length>0){*/
	    	    			var nn=dataM.length;
	    	            	for(var i=0;i<nn;i++){
	    	            		var Maintmsg={};
	    	            		if(dataM[i]=='半年度'){
	    	            			Maintmsg={tcode:'mainsecmsg',tid:'BND',stext:dataMsg.半年度};
	    	            		}else if(dataM[i]=='半月'){
	    	            			Maintmsg={tcode:'mainsecmsg',tid:'BY',stext:dataMsg.半月};
	    	            		}else{
	    	            			Maintmsg={tcode:'mainsecmsg',tid:'',stext:''};
	    	            		};
	    	            		dataSecMsg[i]=Maintmsg;
	    	            	};
	    	            	MaintainList.add(dataSecMsg).then(function(){
	    	        			console.log('进添加来了Maintmsg');
	    	        			addSecMsg(obj);
	    	            	}).fail(function(errorObject){
	    	            		WL.Toast.show("查询数据失败"+errorObject);
	    	        		});
	    	    	/*	};
		    		}*/
		/*    	};
	    	};*/
		}else{
			addSecMsg(obj);
		};
	}else{
		addSecMsg(obj);
	};

	
	function addSecMsg(obj){
		var Maintxml={tcode:'mainxmlName',stext:result.xmlName};
		MaintainList.add(Maintxml).then(function(){
			console.log('---进添加来了mainxmlName');
			console.log(result);
			//var length = result.fields.length;
			var length = result.PlanListQuery_Output.NumOutputObjects
			//把添加的六个条件合成一个 
			var ndata=[];
			console.log('公共方法添加：'+length);
			//当查询到的数据不存在时
			if(length>0){
				var v_result = result.PlanListQuery_Output.ListOfHelPdaMaintainingPlanListIo.HelMaintainPlan;
				
				//增加遥监信息 开始 czq
				var v_DeviceNos;
				if(v_result.length){
					v_DeviceNos = '*'+v_result[0].AssetNumber+'*';
					for(var i = 1;i < v_result.length;i++){
						v_DeviceNos += ',*'+v_result[i].AssetNumber+'*';
					}
				}else{
					v_DeviceNos = '*'+v_result.AssetNumber+'*';
				}
				
				var getEssResult = function(res){
					//czq
					if(v_result.length){
						var id;
						var MainAdd;
						for(var i = 0;i < v_result.length;i++){
							v_result[i].ISACTIVE = res.ess_list[0][v_result[i].AssetNumber];
							id = v_result[i].Id+'/'+Ext.Date.format(new Date(v_result[i].PlanStartDate),'Y-m-d H:i');
							MainAdd = {tcode:'mainfields',tid:id,stext:v_result[i]};
							ndata[i] = MainAdd;
						}
					}else{
						v_result = result.PlanListQuery_Output.ListOfHelPdaMaintainingPlanListIo.HelMaintainPlan;
						v_result.ISACTIVE = res.ess_list[0][v_result.AssetNumber];
						var id = v_result.Id+'/'+Ext.Date.format(new Date(v_result.PlanStartDate),'Y-m-d H:i');
						var MainAdd={tcode:'mainfields',tid:id,stext:v_result};
						ndata[0] = MainAdd; 
					}
					
					//添加保养项目 旧的开始
					/*
					for(var i=0;i<length;i++){
				  		//添加的JSON
						var id=result.fields[i].MP_ID+'/'+result.fields[i].PLAN_START_DT;
						var MainAdd={tcode:'mainfields',tid:id,stext:result.fields[i]};
						ndata[i] = MainAdd; 
					};   	
					console.log("添加进mainfields的数量为:"+length);
					console.log('添加条件:  '+ndata);
					*/
					//添加保养项目 旧的开始

					//添加mainfields
					MaintainList.add(ndata).then(function(){
						//czq
						ceshiyongchaxu3();
						
						
						//添加保养项目 旧的开始
						/*
						console.log('进添加来了mainfields');
						//名字是*********mainitem***********  保养项目
						var length = result.item.length;
						console.log("添加进mainitme的数量为:"+length);
						//把添加的六个条件合成一个 
						if(length>0){
							var ndata2=[];
						    for(var i=0;i<length;i++){
						    	//添加的JSON
						    	var id=result.item[i].MP_ID+'/'+result.item[i].TASK_ROW_ID;
						    	console.log('mainitem的id:'+id);	
						    	var MainAdd={tcode:'MAINITEM',tid:id,stext:result.item[i]};
						    	console.log('mainitem数据测试中:'+JSON.stringify(result.item[i]));
						    	ndata2[i] = MainAdd; 
						    }; 
						    
						    //2014-7-5
							Ext.getCmp('MainPlan_MAINMAINITEM_CZ').setValue(JSON.stringify(ndata2));
					    	
							MaintainList.add(ndata2).then(function(){
					    		console.log('进添加来了mainitem');
		
					    		ceshiyongchaxu3();
					    		
					    	}).fail(function(errorObject){
					    		console.log('添加进添加来了mainitem出错');	
				    		});
						};
						*/
						//添加保养项目 旧的结束
					/*		}else{
								obj.GainMainTainList();
							};*/
					}).fail(function(errorObject){
					   	console.log('添加mainfields出错');	
					});
				}
				
				MainCtr.asyconnectServer(getEssResult,"maintainancePlanItemListAction.do?method=toSearchESS","{'DeviceNos':'"+v_DeviceNos+"'}");
				
				//增加遥监信息 结束 czq
			}else{
			    //为数据仓添加数据
	    		var MaintList=Ext.data.StoreManager.get('MaintainPlanList');
	    		if (!MaintList) { 
	    			MaintList = Ext.create("HelcPDA.store.maintain.MaintainPlanList"); 
	    		};
	    		MaintList.setData(ndata, this);
	    		console.log('查找不到数据');
	    		WL.Toast.show("当天暂无保养计划或已完成！");
			 };   
		}).fail(function(errorObject){
			WL.Toast.show("查询数据失败"+errorObject);
		});
	};
	
};

/***
 * 全局变量 2014-7-16 xcx
 */
//修改
function MainQJBL_amend(Name,data){
	var MaintainList=WL.JSONStore.get(collectionName);
	var options={
			exacte:false,//默认
	};
	var query={tid:Name,tcode:'QJBL'};
	MaintainList.find(query,options).then(function(arrayResults){
		console.log('全局变量查询成功');
		var num=arrayResults.length;
		if(num>0){
			for(var i=0;i<num;i++){
				var json=arrayResults[i].json.tid;
				if(Name==json){
					var _id=arrayResults[i]._id;
					var trim={tcode:'QJBL',tid:Name,stext:data};
					var document={_id:_id,json:trim};
					MaintainList.replace(document,options).then(function(){
						console.log('全局变量修改成功');
					}).fail(function(errorObject){
						console.log('全局变量修改失败');
					});
					break;
				};
			};
		};
	}).fail(function(errorObject){
		console.log('全局变量查询失败');
	});
};

//查询
function MainQJBL_Select(Name){
	var MaintainList=WL.JSONStore.get(collectionName);
	var options={
			exacte:false,//默认
	};
	var query={tid:Name,tcode:'QJBL'};
	MaintainList.find(query,options).then(function(arrayResults){
		console.log('全局变量查询成功');
		console.log(JSON.stringify(arrayResults));
		var num=arrayResults.length;
		var data='';
		if(num>0){
			for(var i=0;i<num;i++){
				var json=arrayResults[i].json.tid;
				if(Name==json){
					data=arrayResults[i].json.stext;
					break;
				};
			};
		};
	}).fail(function(errorObject){
		console.log('全局变量查询失败');
	});
};
