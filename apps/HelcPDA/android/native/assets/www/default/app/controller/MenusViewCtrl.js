
/* JavaScript content from app/controller/MenusViewCtrl.js in folder common */
var count_index=0;
var menu_obj = null;
Ext.define('HelcPDA.controller.MenusViewCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'menusCtrl_id',
	config:{
		refs:{
			menus_id:'button[id=menus_id]'
		},
		control:{
			menus_id:{
				tap:'doMaunPlanDeP'
			},
//			"carousel#news_carousel":{
//				activeitemchange:'news_carousel',
//			},
			"button#FaultDirection_id":{
				tap:'FaultDirection',
			},
			//根据权限加载的模块，点击进入模块
			"dataview#modules_dataview_id":{
				itemtap:'modules_dataview',
			},
			//待办列表中的模块 
			"dataview#new_Todo_dataview":{
				itemtap:'new_Todo_dataview',
			},
			//统计数据列表(管理者)
			"dataview#new_admin_report_dataview":{
				itemtap:'new_admin_report_dataview',
			},
			//统计数据列表(维保人员)
			"dataview#new_maintain_report_dataview":{
				itemtap:'new_admin_report_dataview',
			},
		}
	},
	
	//统计数据列表
	new_admin_report_dataview : function(obj,index,target,record,e,eOpts){
		var obj = this;
		if(event.target.id=="more"){
			if(record.data.text=="保养计划业绩" || record.data.text=="保养计划"){
				obj.getApplication().getController('HelcPDA.controller.report.maintainplanbb.ReportMaintainPlanCtrl').to_list();
			}else if(record.data.text=="故障处理过程反馈" || record.data.text=="故障处理时间录入"){
				obj.NextView('report_hotline_sxrxHomePage','HelcPDA.view.report.HotLine.ReportHotLineHomePage');
				//删除JSON数据
				var Maintain=collectionName;
		    	var MaintainList=WL.JSONStore.get(Maintain);
		    	var Maintxml={tcode:'SXRX/'+userid+'/'+1};
		    	var options={exact:true};//默认是false
		    	MaintainList.remove(Maintxml,options).then(function(){
		    		console.log('SXRX删除成功');
		    		var data="{'key1':'"+userid+"','key':'"+1+"'}";
		    		reportHotlineIFMonth=1;
		    		
		    		function Rep_hotline_HTData(result,obj){
		    			var Maintain=collectionName;
		    	    	var MaintainList=WL.JSONStore.get(Maintain);
		    	    	
		    			var num=result.item.rows.length;
		    			if(result.item.rows.length==1&&result.item.rows[0].COMPANY_NAME=='合计'){
		    				var hotLineStore = obj.getStore('ReportHotLineStoreTwo','HelcPDA.store.report.HotLine.ReportHotLineStoreTwo');
		    				var rData = {};
		    				rData.sumtiring = '无受信热线数据';
		    				rData.sumfault = '';
		    				rData.sumarrival = '';
		    				rData.sumfinished = '';
		    				rData.sumsaving = '';
		    				rData.sumarrivalam = '';
		    				rData.sumfinishedam = '';
		    				rData.sumsavingam = '';
		    				rData.sumpearrivalam = '';
		    				rData.sumpefinishedam = '';
		    				rData.sumpeenteredsavingam = '';
		    				Ext.getCmp('report_hotline_sxrxHomePageToolOne').setHidden(true);
		    				Ext.getCmp('report_hotline_sxrxHomePageToolTwo').setHidden(true);
		    				var listHotLine= Ext.getCmp('rep_HotLineSXRXStoreTwo');
		    				listHotLine.setItemTpl('<div>{sumtiring}</div>');
		    				listHotLine.setOnItemDisclosure(false);
		    				hotLineStore.setData([rData]);
		    				
		    				return ;
		    			}
		    			//本月数据
		    			var sj='本月数据总共：'+(num-1)+'条';
		    			Ext.getCmp('rep_sxrx_ZG').setHtml(sj);
		    			//数据生成时间
		    			var SCtime=result.item.rows[0].UPDATE_DATE;
		    			//var scsj='数据生成时间：'+SCtime;
		    			Ext.getCmp('rep_sxrx_time').setHtml(SCtime);
		    			if(num==2){//分公司
		    				var datads=Ext.data.StoreManager.get('ReportHotLineStore');
		    				if(!datads){
		    					datads=Ext.create('HelcPDA.store.report.HotLine.ReportHotLineStore');
		    				}
		    				var Sdata=result.item.rows[0];
		    				if(Sdata==null){
		    					return;
		    				};
		    				datads.setData(Sdata);
		    				
		    				//JSONStore添加时间
		    				var SHdata=[];
		    				var MainAdd={tcode:'SXRX/'+userid+'/'+reportHotlineIFMonth,tid:result.item.rows[0].COMPANY,stext:result.item.rows[0]};
		    				SHdata[0]=MainAdd;
		    				MaintainList.add(SHdata).then(function(){
		    					console.log('受信热线数据成功添加');
		    				}).fail(function(errorObject){
		    					console.log('受信热线报告数据添加失败');	
		    				});
		    			}else if(num>2){//总公司
		    				var datads=Ext.data.StoreManager.get('ReportHotLineStore');
		    				if(!datads){
		    					datads=Ext.create('HelcPDA.store.report.HotLine.ReportHotLineStore');
		    				};
		    				var Sdata=result.item.rows[num-1];
		    				if(Sdata==null){
		    					return;
		    				}else if(Sdata!=null){
		    					datads.setData(Sdata);
		    				};
		    				
		    				var datads=Ext.data.StoreManager.get('ReportHotLineStoreTwo');
		    				if(!datads){
		    					datads=Ext.create('HelcPDA.store.report.HotLine.ReportHotLineStoreTwo');
		    				};
		    				var zgs=[];
		    				console.log('LL '+JSON.stringify(result.item.rows));
		    				for(var i=0;i<num-1;i++){
		    					zgs[i]=result.item.rows[i];
		    					if(zgs[i].sumtiring==''){
		    						zgs[i].sumtiring=0;
		    					}else if(zgs[i].sumtiring==undefined){
		    						zgs[i].sumtiring=0;
		    					};
		    				};
		    				datads.setData(zgs);
		    				
		    				//JSONStore添加时间
		    				var SHdata=[];
		    				//var sun=num-1;
		    				for(var i=0;i<num;i++){
		    					var MainAdd={tcode:'SXRX/'+userid+'/'+reportHotlineIFMonth,tid:result.item.rows[i].COMPANY,stext:result.item.rows[i]};
		    					SHdata[i]=MainAdd;
		    				};
		    				MaintainList.add(SHdata).then(function(){
		    					console.log('受信热线数据成功添加');
		    				}).fail(function(errorObject){
		    					console.log('受信热线数据添加失败');	
		    				});
		    			};
		    		};
		    		obj.connectServerMainTain(Rep_hotline_HTData,obj,"rexianshouxinAction..do?method=toSearch",data);
		    	}).fail(function(){
					console.log('GZBG删除失败');
				});
			}else if(record.data.text=="故障报告书"){
				obj.NextView('falut_gzbgHomePage','HelcPDA.view.report.faultcount.ReportFaultGZBGHomePage');
				//删除JSON数据
				var Maintain=collectionName;
		    	var MaintainList=WL.JSONStore.get(Maintain);
		    	var Maintxml={tcode:'GZBG/'+userid+'/'+1};
		    	var options={exacte:true};//默认是false
		    	MaintainList.remove(Maintxml,options).then(function(){
		    		console.log('GZBG删除成功');
		    		var data="{'key1':'"+userid+"','key':'"+1+"'}";
		    		gzbgsbbBySy=1;
		    		
		    		function RepFaultData(result,obj){
		    			var Maintain=collectionName;
		    	    	var MaintainList=WL.JSONStore.get(Maintain);
		    	    	
		    			var num=result.item.rows.length;
		    			if(result.item.rows.length==1&&result.item.rows[0].COMPANY=='合计'){
		    				var gzbgStore = obj.getStore('ReportFaultGZBGStoreTwo','HelcPDA.store.report.faultcount.ReportFaultGZBGStoreTwo');
		    				var rData = {};
		    				rData.PASSED_FAULT_AMOUNT = '无故障报告书数据';
		    				rData.SENTERED_FAULT_REPORT = '';
		    				rData.ENTERED_FAULT_REPORT = '';
		    				rData.PE_FAULT_REPORT = '';
		    				Ext.getCmp('falut_gzbgHomePageToolOne').setHidden(true);
		    				Ext.getCmp('falut_gzbgHomePageToolTwo').setHidden(true);
		    				var listFaultGZBG =Ext.getCmp('rep_FaultGZBGStoreTwo');
		    				listFaultGZBG.setItemTpl('<div>{PASSED_FAULT_AMOUNT}</div>');
		    				listFaultGZBG.setOnItemDisclosure(false);
		    				gzbgStore.setData([rData]);
		    				return ;
		    			}
		    			//本月数据
		    			var sj='本月数据('+(num-1)+')';
		    			Ext.getCmp('rep_gzbgHP_BYSJ').setHtml(sj);
		    			//数据生成时间
		    			var SCtime=result.item.rows[0].UPDATE_DATE;
		    			Ext.getCmp('rep_gzbgHP_SCSJ').setHtml(SCtime);
		    			if(num==2){//分公司
		    				var datads=Ext.data.StoreManager.get('ReportFaultGZBGStore');
		    				if(!datads){
		    					datads=Ext.create('HelcPDA.store.report.faultcount.ReportFaultGZBGStore');
		    				}
		    				var Sdata=result.item.rows[0];
		    				if(Sdata.PASSED_FAULT_AMOUNT==''){
		    					Sdata.PASSED_FAULT_AMOUNT=0;
		    				}
		    				datads.setData(Sdata);
		    				
		    				//JSONStore添加时间
		    				var SHdata=[];
		    				/*var sun=num-1;
		    				for(var i=0;i<sun;i++){
		    					var MainAdd={tcode:'FGS_GZBG/'+userid+'/'+gzbgsbbBySy,tid:result.item.rows[i].COMPANY,stext:result.item.rows[i]};
		    					SHdata[i]=MainAdd;
		    				};*/
		    				var MainAdd={tcode:'GZBG/'+userid+'/'+gzbgsbbBySy,tid:result.item.rows[0].COMPANY,stext:result.item.rows[0]};
		    				SHdata[0]=MainAdd;
		    				MaintainList.add(SHdata).then(function(){
		    					console.log('故障报告数据成功添加');
		    				}).fail(function(errorObject){
		    					console.log('故障报告数据添加失败');	
		    				});
		    				
		    			}else if(num>2){//总公司
		    				var datads=Ext.data.StoreManager.get('ReportFaultGZBGStore');
		    				if(!datads){
		    					datads=Ext.create('HelcPDA.store.report.faultcount.ReportFaultGZBGStore');
		    				}
		    				var Sdata=result.item.rows[num-1];
		    				if(Sdata.PASSED_FAULT_AMOUNT==''){
		    					Sdata.PASSED_FAULT_AMOUNT=0;
		    				}
		    				datads.setData(Sdata);
		    				
		    				var datads=Ext.data.StoreManager.get('ReportFaultGZBGStoreTwo');
		    				if(!datads){
		    					datads=Ext.create('HelcPDA.store.report.faultcount.ReportFaultGZBGStoreTwo');
		    				};
		    				var zgs=[];
		    				for(var i=0;i<num-1;i++){
		    					zgs[i]=result.item.rows[i];
		    					if(zgs[i].PASSED_FAULT_AMOUNT==''){
		    						zgs[i].PASSED_FAULT_AMOUNT=0;
		    					}
		    				};
		    				datads.setData(zgs);
		    				
		    				//JSONStore添加时间
		    				var SHdata=[];
		    				//var sun=num-1;
		    				for(var i=0;i<num;i++){
		    					var MainAdd={tcode:'GZBG/'+userid+'/'+gzbgsbbBySy,tid:result.item.rows[i].COMPANY,stext:result.item.rows[i]};
		    					SHdata[i]=MainAdd;
		    				};
		    				MaintainList.add(SHdata).then(function(){
		    					console.log('故障报告数据成功添加');
		    				}).fail(function(errorObject){
		    					console.log('故障报告数据添加失败');	
		    				});
		    			};
		    		};
		    		obj.connectServerMainTain(RepFaultData,obj,"gzbgsAction.do?method=toSearch",data);
		    	}).fail(function(){
					console.log('GZBG删除失败');
				});
			}else if(record.data.text=="作业人员业绩"){
				console.log('作业人员业绩');
				obj.getApplication().getController('HelcPDA.controller.report.PersonKPI.PersonKPICtrl').InitData();
//				obj.NextView('PersonKPICompany','HelcPDA.view.report.PersonKPI.PersonKPICompany');
				
			}
	 	}
	},
	
	doMaunPlanDeP:function(){
		var obj=Ext.getCmp('Maintainlist');
		if(!obj){
			 obj=Ext.create('HelcPDA.view.maintain.MaintenancePlanPanel');
		}
		 Ext.Viewport.setActiveItem(obj);
	},
	FaultDirection:function(){
		//FaultDirection_id
		//alert('kooo');
		var obj=Ext.getCmp('FaultDirectionID');
		if(!obj){
			 obj=Ext.create('HelcPDA.view.install.FaultDirection');
		}
		 Ext.Viewport.setActiveItem(obj);
	},
	               
	
/*	toFaultHandle:function(){
		Ext.Viewport.setActiveItem(Ext.create('HelcPDA.view.fault.FaultHandlingPanel'));
	}*/
	
	// 定时任务
	starCommitTask: function() {
		menu_obj = this;
		if (commitTask!=null) {
   	 		window.clearInterval(commitTask);
   	 		commitTask = null;
   	 	}
		commitTask = window.setInterval(menu_obj.toCommitWaitingData,1000*50*1);
	},
	
	// 定时任务提交,不可传参数，传参数就无法调用
	toCommitWaitingData : function() {
		var this_obj = this;
		//alert('开始:'+isRunningCommit);
		console.log('aaa:'+count_index++);
		if (isRunningCommit) { // 当上一次还么提交完的时候就跳过此次提交数据,防止重复提交
			return ;
		} else {
			isRunningCommit = true;
		}
		var selection_find = {tcode:'UNCOMMIT',status:'1'};
		var options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var length = arrayResults2.length;
			var item_msgs = [];
			if (length < 1) {
				isRunningCommit = false;
				return ;
			}
			
			// 第二种方式：按顺序排队提交所有待提交数据
			try {
			var allIndex = 0;
			var item = arrayResults2[allIndex];
			menu_obj.asyconnectServer_(handleResult,item,item.json.ext1.url,JSON.stringify(item.json.stext));
			var items = [];
			var items_t = [];
			function handleResult(result,item) {
				// 改变真实列表的值
				var item_t = item.json.ext1.obj;
				if (result != null && result.msgid == 0) { // 2正常返回
					item.json.status = '2';
					if(item_t.isArray) {//当是批量的时候
						for (var i = 0; i < item_t.data.length; i ++) {
							item_t.data[i].json.status = '2';
							items_t[items_t.length] = item_t.data[i];
						}
					} else {
						item_t.json.status = '2';
						items_t[items_t.length] = item_t;
					}
				} else if (result == null) { // 当时访问不到服务器不正常返回时|| result.msgid == 1
					item.json.ext1.msg.msg_result = "<span>提交失败，正在等待下一次重试！</span>";
					item_msgs[item_msgs.length] = item.json.ext1.msg;
					if (item_t.isArray) {
						for (var i = 0; i < item_t.data.length; i ++) {
							item_t.data[i].json.status = '1';
							items_t[items_t.length] = item_t.data[i];
						}
					} else {
						item_t.json.status = '1';
						items_t[items_t.length] = item_t;										
					}
				} else if (result.msgid == 1) {
					item.json.ext1.msg.msg_result = "<span style='color:#ff0000'>提交失败，请手动删除本数据后重新提交！</span>";
					item.json.status = '4';
					item_msgs[item_msgs.length] = item.json.ext1.msg;
					if(item_t.isArray) {//当是批量的时候
						for (var i = 0; i < item_t.data.length; i ++) {
							item_t.data[i].json.status = '4';
							items_t[items_t.length] = item_t.data[i];
						}
					} else {
						item_t.json.status = '4';
						items_t[items_t.length] = item_t;
					}
				}
				items[items.length] = item;
				// 改变原数据的状态,用数组是考虑批量的情况，单挑长度则为1
				WL.JSONStore.get(collectionName).refresh(items_t).then(function(){// 刷新真实列表的状态
					// 每成功一条都实时刷新列表的状态
					try{
						var rctrl = menu_obj.getApplication().getController(item.json.ext1.view_id);
						if (rctrl != undefined) {
							rctrl.LoadGHlist(item.json.ext1.cparam);
						}
					} catch(e1) {
						alert('出错！');
						//isRunningCommit = false;
					}
					
					// 刷新待提交列表里的数据
					try{
						var toDelId = item._id;
						if(item.json.status == '2') { //如果是正常完成
							WL.JSONStore.get(collectionName).remove(toDelId).then(function(arrayResults2){
								// 刷新界面数据，页面存在的时候才去刷
								var view = Ext.getCmp('wfc_list_view');
								if (view) {
									var store = Ext.data.StoreManager.get("WaitingForCommitDataStore");
									if (!store) {
										store = Ext.create("HelcPDA.store.waitingdata.WaitingForCommitDataStore");
									}
									store.setData(item_msgs);
									//WL.Toast.show('数据提交完成！');
								}
								//czq
//								this_obj.refresh_wtd();
								MainCtr.refresh_wtd2016();
							}).fail(function(errorObject){
								WL.Toast.show('删除失败d');
							});
						} else { // 否则刷新
							WL.JSONStore.get(collectionName).refresh(item).then(function(arrayResults2){
								// 刷新界面数据，页面存在的时候才去刷
								var view = Ext.getCmp('wfc_list_view');
								if (view) {
									var store = Ext.data.StoreManager.get("WaitingForCommitDataStore");
									if (!store) {
										store = Ext.create("HelcPDA.store.waitingdata.WaitingForCommitDataStore");
									}
									store.setData(item_msgs);
									//WL.Toast.show('数据提交完成！');
								}
//								var obj_menu = Ext.getCmp('MenusView_id');
								//czq
//								this_obj.refresh_wtd();
								MainCtr.refresh_wtd2016();
							}).fail(function(errorObject){
								WL.Toast.show('刷新失败');
							});
						}
						
						// 不管上一条失败还是成功，立即执行提交第二条带提交数据 (不写在外面是为了保证allIndex没有累加)
						allIndex ++;
						if (allIndex > length - 1) {
							WL.Toast.show('数据提交完成！');
							isRunningCommit = false;
							return ;
						} else {
							item = arrayResults2[allIndex];
							menu_obj.asyconnectServer_(handleResult,item,item.json.ext1.url,JSON.stringify(item.json.stext));
						}
					} catch(e) {
						WL.Toast.show('刷新出错！');
						isRunningCommit = false;
					}
				}).fail(function(errorObject){
					// 如果刷新真实列表出错，也要刷新待提交列表的数据
					try {
						var options = {};
						var toDelId = item._id;
						if(item.json.status == '2') { //如果是正常完成
							WL.JSONStore.get(collectionName).remove(toDelId).then(function(arrayResults2){
								// 刷新界面数据，页面存在的时候才去刷
								var view = Ext.getCmp('wfc_list_view');
								if (view) {
									var store = Ext.data.StoreManager.get("WaitingForCommitDataStore");
									if (!store) {
										store = Ext.create("HelcPDA.store.waitingdata.WaitingForCommitDataStore");
									}
									store.setData(item_msgs);
									//WL.Toast.show('数据提交完成！');
								}
								//czq
//								this_obj.refresh_wtd();
								MainCtr.refresh_wtd2016();
							}).fail(function(errorObject){
								WL.Toast.show('删除失败d');
							});
						} else { // 否则刷新
							WL.JSONStore.get(collectionName).refresh(item).then(function(arrayResults2){
								// 刷新界面数据，页面存在的时候才去刷
								var view = Ext.getCmp('wfc_list_view');
								if (view) {
									var store = Ext.data.StoreManager.get("WaitingForCommitDataStore");
									if (!store) {
										store = Ext.create("HelcPDA.store.waitingdata.WaitingForCommitDataStore");
									}
									store.setData(item_msgs);
									//WL.Toast.show('数据提交完成！');
								}
//							var obj_menu = Ext.getCmp('MenusView_id');
								//czq
//								this_obj.refresh_wtd();
								MainCtr.refresh_wtd2016();
							}).fail(function(errorObject){
								WL.Toast.show('刷新失败');
							});
						}
					} catch (e) {
						WL.Toast.show('刷新出错！');
						isRunningCommit = false;
					}
					
					// 如果刷新真实列表出错，也去行提交第二条带提交数据 (不写在外面是为了保证allIndex没有累加)
					allIndex ++;
					if (allIndex > length - 1) {
						WL.Toast.show('数据提交完成！');
						isRunningCommit = false;
						return ;
					} else {
						item = arrayResults2[allIndex];
						menu_obj.asyconnectServer_(handleResult,item,item.json.ext1.url,JSON.stringify(item.json.stext));					
					}
				});
				
			}
			} catch(err) { //out catch
				isRunningCommit = false;
				return ;
			}
			
		}).fail(function(errorObject){
			isRunningCommit = false;
			return ;
		});
	},
	
	OldView_power: function(result,obj){
		var json = result;
		//根据用户权限动态显示页面功能
    	var BYJH = document.getElementById('BYJH');
    	var JXCL = document.getElementById('JXCL');
    	var AZXM = document.getElementById('AZXM');
    	var BGLC = document.getElementById('BGLC');
    	var TJBB = document.getElementById('TJBB');
    	var GZYD = document.getElementById('GZYD');
    	var KHXX = document.getElementById('KHXX');
    	var HTXX = document.getElementById('HTXX');
    	var DTXX = document.getElementById('DTXX');
    	var JSFY = document.getElementById('JSFY');
    	var GHP = document.getElementById('GHP');
    	var DTJSJ = document.getElementById('DTJSJ');
    	var DTView=document.getElementById('DTView');
    	var WZXX=document.getElementById('WZXX');
    	var BYCC= document.getElementById('BYCC');
    	var CCZG_CC=document.getElementById('CCZG_CC');
    	for(var k = 0 ;k<json.role.length;k++){
    		//保养计划
    		if(json.role[k]=='baoyangjihua'){
    			BYJH.style.display = 'block';
        	}
    		if(json.role[k]=='baoyangjihua'){
    			ZXBZ.style.display = 'block';
    		}
    		//急修处理
    		if(json.role[k]=='guzhangchuli'){
    			JXCL.style.display = 'block';
    		}
    		//安装项目
    		if(json.role[k]=='anzhuangguocheng'){
    			AZXM.style.display = 'block';
    		}
//    		//办公流程
//    		if(json.role[k]=='OAluicheng'){
//    			BGLC.style.display = 'block';
//    		}
    		//统计报表
    		if(json.role[k]=='report_pda'){
    			TJBB.style.display = 'block';
    		}
    		//故障引导
    		if(json.role[k]=='guzhangzhiyin'){
    			GZYD.style.display = 'block';
    		}
    		//客户信息
    		if(json.role[k]=='kehuxinxi'){
    			Ext.getCmp('XX_container').setHidden(false);
    			KHXX.style.display = 'block';
    		}
    		//合同信息
    		if(json.role[k]=='hetongxinxi'){
    			Ext.getCmp('XX_container').setHidden(false);
    			HTXX.style.display = 'block';
    		}
    		//电梯信息
    		if(json.role[k]=='diantixinxi'){
    			Ext.getCmp('XX_container').setHidden(false);
    			DTXX.style.display = 'block';
    		}
    		//技术附页
    		if(json.role[k]=='techparams'){
    			Ext.getCmp('XX_container').setHidden(false);
    			JSFY.style.display = 'block';
    		}
    		//技术附页
    		if(json.role[k]=='GHP'){
    			GHP.style.display = 'block';
    		}
    		
    		//位置信息
    		/*
    		if(json.role[k]=='weizhixinxi'){
    			WZXX.style.display = 'block';
				cordova.exec(function(res) {
					}, function(err) {
						WL.Toast.show("错误:"+err);
					},"JSMapMain","开启被动定位",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase()}]);
					
    		}
    	*/
    		
    		if(json.role[k]=='weizhixinxibd'){
    			DTView.style.display='block';
    			/**/
				cordova.exec(function(res) {
					}, function(err) {
						WL.Toast.show("错误:"+err);
					},"JSMapMain","开启被动定位",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase()}]); 
    		}
    		//保养抽查
    		if(json.role[k]=='baoyangchoucha'){
    			BYCC.style.display = 'none';
    		}
    		//抽查整改
    		if(json.role[k]=='chouchazhenggai'){
    			CCZG_CC.style.display = 'none';
    		}
    	};
    	//设置最后一行的class
    	if(GZYD.style.display = 'block'){
    		GZYD.className = "i_Button_List i_Button_List_NoBorder";
    	}else if(TJBB.style.display = 'block'){
    		TJBB.className = "i_Button_List i_Button_List_NoBorder";
    	}else if(DTJSJ.style.display = 'block'){
    		DTJSJ.className = "i_Button_List i_Button_List_NoBorder";
    	}
    	if(JSFY.style.display = 'block'){
    		JSFY.className = "i_Button_List i_Button_List_NoBorder";
    	}else if(DTXX.style.display = 'block'){
    		DTXX.className = "i_Button_List i_Button_List_NoBorder";
    	}else if(HTXX.style.display = 'block'){
    		HTXX.className = "i_Button_List i_Button_List_NoBorder";
    	}else if(KHXX.style.display = 'block'){
    		KHXX.className = "i_Button_List i_Button_List_NoBorder";
    	}
    	
//    	if(CCZG_CC.style.display = 'block'){
//    		//BYCC.className = "i_Button_List i_Button_List_NoBorder";
//    		CCZG_CC.className = "i_Button_List i_Button_List_NoBorder";
//    	}
//    	if(GHP.style.display == 'none'&&BYJH.style.display=='none'){
//    		WZXX.className = "i_Button_List i_Button_List_NoBorder";
//    		WZXX.style.display='none';
//    	}
    	
    	
    	var informationList_data  = [];//信息查询列表数据
		//安装任务
		if(roleStr.indexOf('kehuxinxi')>=0){
			informationList_data.push(
					{
						title: '客户信息',
                        color: '#62bb47',
                        icon: 's'
                    }
			);
    	}
		if(roleStr.indexOf('hetongxinxi')>=0){
			informationList_data.push(
					{
						title: '合同信息',
                        color: '#fbb726',
                        icon: 's'
					}
			);
		}
		if(roleStr.indexOf('diantixinxi')>=0){
			informationList_data.push(
					{
						title: '电梯信息',
                        color: '#f6821f',
                        icon: 's'
					}
			);
		}
		if(roleStr.indexOf('lishiguzhang')>=0){
			informationList_data.push(
					{
						title: '历史故障',
                        id:'historyFault_id',
                        color: '#e03a3e',
                        icon: 's'
					}
			);
		}
		if(roleStr.indexOf('certificatesinfo')>=0){
			informationList_data.push(
					{
						title: '证件信息',
                        id:'certificatesinfo_s',
                        color: '#62bb47',
                        icon: 's'
					}
			);
		}
		if(roleStr.indexOf('transport')>=0){
			informationList_data.push(
					{
						title: '物流运单',
                        id:'transport_s',
                        color: '#fbb726',
                        icon: 's'
					}
			);
		}
		if(informationList_data.length > 0) {
			Ext.getCmp('informationList_id').setData(informationList_data);
		}
	   //登录成功后判断记录登录账号
		var checkuser = Ext.getCmp('checkuser').getValue();
		if(checkuser==1){ 
			WL.EncryptedCache.write("Loginuser", userid, onWrite1Success, onWrite1Failure);
	             function onWrite1Success(status){
	        	   console.log('记录登录账号成功');  
	        	   console.log('userid : '+userid);  
	        	   console.log('person_id : '+person_id);  
	        	   console.log('init_person_id : '+init_person_id);  
	        	   console.log('userid : '+userid);  
	        	   console.log('ebs_user_id : '+ebs_user_id);  
	        	   console.log('username : '+username);  
	        	   console.log('roleStr : '+roleStr);  
	        	   console.log('rolename : '+rolename);  
	            } 
            function onWrite1Failure(status){
           	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
           		   console.log('记录登录账号失败');  
           	   } 
	           } 
			
		}else{ 
			WL.EncryptedCache.write("Loginuser", null, onWrite0Success, onWrite0Failure);
	             function onWrite0Success(status){
	        	   console.log('删除上上次记录的账号成功');  
	            } 
           function onWrite0Failure(status){
          	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
          		   console.log('删除上上次记录的账号失败');  
          	   } 
	           } 
		};
		
//	//首页功能列表,部分机型切换不了，强制跳转到页面
//	var MenusView = Ext.getCmp('MenusView_id'); 
//	MenusView.addListener('activeitemchange',function(obj,value,oldValue,eOpts  ){
//		var itemId = value.id;
//		if (itemId == 'M_ZY') {
//			MenusView.setActiveItem(Ext.getCmp('M_ZY'));
//		}else if (itemId == 'backlog_v') {
//			MenusView.setActiveItem(Ext.getCmp('backlog_v'));
//		}else if (itemId == 'M_XX') {
//			MenusView.setActiveItem(Ext.getCmp('M_XX'));
//		}else if (itemId == 'M_CX') {
//			MenusView.setActiveItem(Ext.getCmp('M_CX'));
//		}else if (itemId == 'M_GD') {
//			MenusView.setActiveItem(Ext.getCmp('M_GD'));
//		}
//	},this,{
//	});
//		
	
	//监听首页tab，当切换至  ‘更多’时，刷新通话时长
	/*
	var installenddate=Ext.getCmp('MenusView_id');
	installenddate.addListener('activeitemchange',obj.CallLog(),this,{
	});*/
		//OA起草
		var LI=document.getElementById('OALC');
		LI.onclick = function (){
			obj.getApplication().getController('oa.OAProcessCtrl').CheckOaAcCount();
//			obj.getApplication().getController('oa.OAProcessCtrl').login();
//			obj.NextView('OAProcess_id','HelcPDA.view.oa.OAProcess');
		};
		//品证整改
		var LI=document.getElementById('PZZG');
		LI.onclick = function (){
			obj.NextView('Renovate_Project_HeaderList_id','HelcPDA.view.ProductCertificate.Renovate_Project_HeaderList');
			var store=obj.getStore('RP_HeadStore','HelcPDA.store.ProductCertificate.RP_HeadStore');
			store.setData([]);   
		       var query={tcode:"ProductCertificate_data",tid:"ProductCertificate_list"};
		       var options={
		    		   exact:true
		       };       
		       WL.JSONStore.get(collectionName).find(query,options).then(function(res){
		    	   if(res==''||res==null||typeof(res)=='undefined'||res.length==0){
		    		   WL.Toast.show('找不到本地数据!请同步数据!');
		    	   }else{
		    		   store.setData(res[0].json.stext);
		    		   WL.Toast.show('如需更新数据，请同步数据！');
		    	   }
		       }).fail(function(){
		    	   WL.Toast.show('没有数据!');
		       }); 
		};
		//保养计划
		var LI=document.getElementById('BYJH');
		LI.onclick = function (){
			
			///////////////////////////////////////////////
			//清空数据仓
			//为数据仓添加数据
			var MaintList=Ext.data.StoreManager.get('MaintainPlanList');
			if (!MaintList) { 
				MaintList = Ext.create("HelcPDA.store.maintain.MaintainPlanList"); 
			};
			MaintList.setData([]);
			
			//获取当前时间按
	    	var myDate = new Date();
	    	
			//给予条件正确的判断
			var newmonth=myDate.getMonth()+1;
			var newday=myDate.getDate();
			if(newmonth<10){
				newmonth='0'+newmonth; 
			};
			if(newday<10){
				newday='0'+newday;
			};
			
			//页面显示
			var data=myDate.getFullYear()+"年"+newmonth+"月"+newday+"日";
			
			//服务器查询用时间
			var data3=myDate.getFullYear()+"-"+newmonth+"-"+newday;
			console.log('服务器判断用的正确格式时间:'+data3);
			
			/*//不变的当天时间 xcx  2014-5-16
			bbtime=data3;*/
			obj.NextView("Maintainlist","HelcPDA.view.maintain.MaintenancePlanPanel");
			
			//保养页面 时间显示按钮
			Ext.getCmp('MPPDateButton').setText(data);
			
			//给隐藏控件赋予全职变量
			Ext.getCmp('MppmYear').setValue(myDate.getFullYear());
			Ext.getCmp('MppnMonth').setValue(newmonth);
			
			//给隐藏控件赋予日历下标变量
			Ext.getCmp('MainRL_XuanZhongXB').setValue(0);
			//调用全局方法
			ceshiyongchaxu(obj,data3);
			///////////////////////////////////////////////
	
		};
		//急修处理
		var LI=document.getElementById('JXCL');
		LI.onclick = function (){
		
			obj.NextView('faultHLP','HelcPDA.view.fault.FaultHandlingPanel');
			faultHandingPC_NEW(obj);
		};
		
		//安装项目
		var LI=document.getElementById('AZXM');
		LI.onclick = function (){
			obj.NextView('installProject_id','HelcPDA.view.install.installProject');
			//进入安装项目模块，根据权限显示模块
			var install_project_list_data  = [];//安装项目子模块列表
    		//安装任务
    		if(roleStr.indexOf('anzhuangrenwu')>=0){
    			install_project_list_data.push(
    					{
                              title: '安装任务',
                              color: '#62bb47',
                              number: '1',
                              icon: 'l'
                        }
    			);
        	}
    		if(roleStr.indexOf('querenpaichan')>=0){
    			install_project_list_data.push(
    					{
    						  title: '确认排产',
                              color: '#fbb726',
                              number: '1',
                              icon: '3'
    					}
    			);
    		}
    		if(roleStr.indexOf('xiangtoufahuo')>=0){
    			install_project_list_data.push(
    					{
	                        title: '箱头发货',
	                        color: '#f6821f',
	                        number: '3',
	                        icon: 'X'
    					}
    			);
    		}
    		if(roleStr.indexOf('anzhuangjihua')>=0){
    			install_project_list_data.push(
    					{
    						title: '安装计划',
                            color: '#e03a3e',
                            number: '1',
                            icon: '\\'
    					}
    			);
    		}
    		if(roleStr.indexOf('anzhuangguocheng')>=0){
    			var AZGC = 0;
    			for(var i =0;i<install_project_list_data.length;i++){
    				if(install_project_list_data[i].title =="安装过程"){
    					AZGC++;
    				}
    			}
    			if(AZGC ==0){
    				install_project_list_data.push(
        					{
        						 title: '安装过程',
                                 color: '#953c96',
                               	 number: '2',
                               	 icon: '7'
        					}
        			);
    			}
    		}
    		//所有人都有的权限
			install_project_list_data.push(
			{
                  title: 'ITM',
                  color: '#009ddc',
                  number: '3',
                  icon: '7'
              },
              {
                  title: '已发货未进场',
                  color: '#62bb47',
                  number: '1',
                  icon: 'x'
              }
			);
			if(roleStr.indexOf('tiaoshirenwu')>=0){
    			install_project_list_data.push(
    					{
    						title: '调试任务',
    						color: '#fbb726',
                          	number: '2',
                          	icon: 'W'
    					}
    			);
    		}
    		if(roleStr.indexOf('baojianrenwu')>=0){
    			install_project_list_data.push(
    					{
    						title: '报检任务',
    						color: '#e03a3e',
                          	number: '2',
                          	icon: 'W'
    					}
    			);
    		}
    		if(roleStr.indexOf('changjianrenwu')>=0){
    			install_project_list_data.push(
    					{
    						title: '厂检任务',
    						color: '#e03a3e',
                          	number: '2',
                          	icon: 'W'
    					}
    			);
    		}
    		if(roleStr.indexOf('zhengfujianrenwu')>=0){
    			install_project_list_data.push(
    					{
    						title: '政府检任务',
    						color: '#009ddc',
                          	number: '2',
                          	icon: 'W'
    					}
    			);
    		}
    		if(roleStr.indexOf('wangongjiyijiao')>=0){
    			install_project_list_data.push(
    					{
    						title: '移交任务',
    						color: '#62bb47',
                          	number: '2',
                          	icon: '^'
    					}
    			);
    		}
    		if(roleStr.indexOf('tsdabl')>=0){
    			install_project_list_data.push(
    					{
    						title: '调试菜单纸补录',
    						color: '#fbb726',
                          	number: '2',
                          	icon: 'p'
    					}
    			);
    		}
    		if(roleStr.indexOf('cjcdbl')>=0){
    			install_project_list_data.push(
    					{
    						title: '厂检菜单纸补录',
                          	color: '#f6821f',
                          	number: '2',
                          	icon: 'p'
    					}
    			);
    		}	
    		install_project_list_data.push(
					{
						title: '安装数据查询',
                      	color: '#953c96',
                      	number: '2',
                      	icon: 's'
					}
			);
    		
        	
        	Ext.getCmp('install_project_list').setData(install_project_list_data);
		};
		//专项保障
		var LI=document.getElementById('ZXBZ');
		LI.onclick = function (){
			obj.NextView('MmintainSpecialList_V_id','HelcPDA.view.maintainSpecial.MmintainSpecialList_V');
		};
		//统计报表
		var LI=document.getElementById('TJBB');
		LI.onclick = function (){
			obj.NextView('reportview_homepage','HelcPDA.view.report.ReportView');
			//进入统计报表模块，根据权限显示模块
			var report_list_data  = [];//安装项目子模块列表
    		//故障过程处理报表
    		if(roleStr.indexOf('report_rxsx')>=0){
    			report_list_data.push(
    					{
    	                       title: '故障过程处理报表',
    	                       color: '#62bb47',
    	                       number: '1',
    	                       icon: 'Z'
    	                 }
    			);
        	}
    		//保养计划报表
    		if(roleStr.indexOf('report_byjh')>=0){
    			report_list_data.push(
    					{
    						  title: '保养计划报表',
                              color: '#fbb726',
                              number: '1',
                              icon: 'Z'
    					}
    			);
    		}
    		//故障报告书报表
    		if(roleStr.indexOf('report_gzbgs')>=0){
    			report_list_data.push(
    					{
    						  title: '故障报告书报表',
                              color: '#f6821f',
                              number: '3',
                              icon: 'Z'
    					}
    			);
    		}
    		//安装台量报表
    		if(roleStr.indexOf('report_install')>=0){
    			report_list_data.push(
    					{
    						  title: '安装台量报表',
                              color: '#e03a3e',
                              number: '1',
                              icon: 'Z'
    					}
    			);
    		}
    		//安装周期报表
    		if(roleStr.indexOf('report_azzq')>=0){
    			report_list_data.push(
    					{
    						  title: '安装周期报表',
                              color: '#963d97',
                              number: '2',
                              icon: 'Z'
    					}
    			);
    		}
    		//安装录入情况报表
    		if(roleStr.indexOf('report_azbsrecord')>=0){
    			report_list_data.push(
    					{
    						  title: '安装录入情况报表',
                              color: '#009ddc',
                              number: '3',
                              icon: 'Z'
    					}
    			);
    		}
    		//安装完工情况报表
    		if(roleStr.indexOf('report_instcompleted')>=0){
    			report_list_data.push(
    					{
    						  title: '安装完工情况报表',
                              color: '#62bb47',
                              number: '1',
                              icon: 'Z'
    					}
    			);
    		}
    		//维保业绩
    		if(roleStr.indexOf('report_maintainAhm')>=0){
    			report_list_data.push(
    					{
    						  title: '维保业绩',
                              color: '#fbb726',
                              number: '2',
                              icon: 'Z'
    					}
    			);
    		}
    		
    		Ext.getCmp('report_list').setData(report_list_data);
		};
		//故障引导
		var LI=document.getElementById('GZYD');
		LI.onclick = function (){
			obj.NextView('FaultDirectionID','HelcPDA.view.install.FaultDirection');
		};
		//客户信息
		var LI=document.getElementById('KHXX');
		LI.onclick = function (){
			obj.NextView('customer-vid','HelcPDA.view.customer.customer-v');
		};
		//合同信息
		var LI=document.getElementById('HTXX');
		LI.onclick = function (){
			obj.NextView("Compactlist","HelcPDA.view.compact.CompactSearchPanel");
		};
		//电梯信息
		var LI=document.getElementById('DTXX');
		LI.onclick = function (){
			alert('电梯信息');
//		
		};
		//技术附页
		var LI=document.getElementById('JSFY');
		LI.onclick = function (){
			obj.NextView('techParams_Search_V','HelcPDA.view.techParams.TechParams_Search_V');
			Ext.getCmp('formpanel_FT').setHidden(true);
			Ext.getCmp('formpanel_ZT').setHidden(true);
		};
	
		//保养抽查
//		var LI=document.getElementById('BYCC');
//		LI.onclick = function (){
//			obj.NextView('CC_Select_id','HelcPDA.view.selective_examination.CC_Select');
//			//隐藏 “整改内容”
//			var bycccxTabPanel = Ext.getCmp("CC_Select_id_tabpanel");
//			bycccxTabPanel.removeAt(3);
//			//抽查单状态
//			Ext.getCmp('CC_SEL_STATUS').setValue('待提交');
//			//清空抽查选项
//			var datads_CC=Ext.data.StoreManager.get('HEL_RUMMAG_LINES_Store');
//			if(!datads_CC){
//				datads_CC=Ext.create('HelcPDA.store.selective_examination.HEL_RUMMAG_LINES_Store');
//			};
//			datads_CC.setData([]);
//			
//			//隐藏抽查单头ID
//			Ext.getCmp('CC_SEL_HEADER_ID').setHidden(true);
//			//隐藏抽查日期
//			Ext.getCmp('CC_SEL_RUMMAGER_DATE').setHidden(true);
//			//隐藏提交时间
//			Ext.getCmp('CC_SEL_SUBMIT_DATE').setHidden(true);
//			//隐藏数据来源
//			Ext.getCmp('CC_SEL_DATA_SOURCE').setHidden(true);
//			//隐藏导入状态
//			Ext.getCmp('CC_SEL_IMPORT_STATUS').setHidden(true);
//			//隐藏记录创建时间
//			Ext.getCmp('CC_SEL_CREATION_DATE').setHidden(true);
//			//隐藏最后更新时间
//			Ext.getCmp('CC_SEL_LAST_UPDATE_DATE').setHidden(true);
//			
//		};
//		
//		//抽查整改
//		var LI=document.getElementById('CCZG_CC');
//		LI.onclick = function (){
//			obj.NextView('CC_Query_id','HelcPDA.view.selective_examination.CC_Query');
//			
//			function station_JRDT(json){
//				//把单头数据放入数据仓中
//				var datads=Ext.data.StoreManager.get('HEL_RUMMAG_HEADER_Store');
//				if(!datads){
//					datads=Ext.create('HelcPDA.store.selective_examination.HEL_RUMMAG_HEADER_Store');
//				};
//				datads.setData(json.DT);
//				//console.log('DH的数据：   '+JSON.stringify(json.DH));
//				//把查找到的数据放入JSONStores
//				var MaintainList=WL.JSONStore.get(collectionName);
//				var Maintxml={tcode:'DTDH',stext:json};
//				var deletemainfields={tcode:'DTDH'};
//				var options={exacte:true};//默认是false
//				//先删后加
//				MaintainList.remove(deletemainfields,options).then(function(){
//					console.log('删除数据成功');
//					MaintainList.add(Maintxml).then(function(){
//						console.log('成功保存数据');
//					}).fail(function(errorObject){
//						WL.Toast.show('没有获取数据');	
//			   		});
//				}).fail(function(errorObject){
//					WL.Toast.show('没有获取数据');	
//		   		});
//			};
//			obj.connectServer(station_JRDT,"baoYangChouChaAction.do?method=toSearchZGDTandZGDH");
//		
//		};
		
		//待提交数据
		DTJSJ.onclick = function (){
			obj.NextView('wfc_list_view','HelcPDA.view.waitingdata.WaitingForCommitData_List_V');
			var wfc_list_view = Ext.getCmp('wfc_list_view');
			wfc_list_view.loadDataJST();
		};
		
		var AZCXX=document.getElementById('AZCX');
		AZCXX.onclick = function (){
			obj.NextView('installAllSerach','HelcPDA.view.install.installSearch.InstallAllSerach');
		    Ext.getCmp('Choice_Search').addListener('change',function(obk,newValue,oldValue,eOpts){
		    	var ebs_user=Ext.getCmp('ebs_user');
		    	var fac_user=Ext.getCmp('fac_user');
		    	var int_user=Ext.getCmp('int_user');
		    	var box_number=Ext.getCmp('box_number');
		    	if(newValue=='安装数据查询'){
		    		ebs_user.setHidden(false);
		    		fac_user.setHidden(false);
		    		box_number.setHidden(true);
		    		ebs_user.setValue('');
		    		fac_user.setValue('');
		    		int_user.setValue('');
		    		box_number.setValue('');
		    	}else if(newValue=='排产数据查询'){
		    		ebs_user.setHidden(true);
		    		fac_user.setHidden(true);
		    		box_number.setHidden(true);
		    		ebs_user.setValue('');
		    		fac_user.setValue('');
		    		int_user.setValue('');
		    		box_number.setValue('');
		    	}else if(newValue=='箱头数据查询'){
		    		box_number.setHidden(false);
		    		ebs_user.setHidden(true);
		    		fac_user.setHidden(true);
		    		ebs_user.setValue('');
		    		fac_user.setValue('');
		    		int_user.setValue('');
		    	}
		    });
			
		};
		//位置信息
		/*
		WZXX.onclick = function (){
		       cordova.exec(function(res) {
				}, function(err) {
					WL.Toast.show("错误:"+err);
				},"MapMain","initmapbar",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase()}]);
		};
		*/
		
		DTView.onclick=function(){
			obj.NextView('whitePage','HelcPDA.view.androidMap.WhitePage');
			cordova.exec(function(res) {
					jsData=res;
					if("正常返回"==res[0].LocationFlag){
						obj.BackView();
				}else if("周围的人"==res[0].LocationFlag){
					obj.BackView();
					obj.NextView('nearView','HelcPDA.view.androidMap.NearView');
				}else if("我的信息"==res[0].LocationFlag){
					obj.BackView();
					obj.NextView('selfMyView','HelcPDA.view.androidMap.MyView');
				}else if("返回主页"==res[0].LocationFlag){
					obj.BackView();
				}else if("工号打卡"==res[0].LocationFlag){
					obj.BackView();
					obj.NextView('sendCard','HelcPDA.view.androidMap.SendCard');
				    var MaintenaceSendCardStore=obj.getStore('MaintenaceSendCardStore','HelcPDA.store.maintain.MaintenaceSendCardStore');
				    MaintenaceSendCardStore.setData([]); 
				}else if("电梯打卡"==res[0].LocationFlag){
					obj.BackView();
					obj.NextView('maintenaceSendCardPanel','HelcPDA.view.maintain.MaintenaceSendCardPanel');
				    var debugReturnList=Ext.getCmp('debugReturnList');
				    debugReturnList.setText("地图");
				}
				else{
				}
				}, function(err) {
					WL.Toast.show("错误:"+err);
				},"JSMapMain","进入地图",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase()}]);  
		};
		
		// 安装数据查询
		var AZCXX=document.getElementById('AZCX');
		AZCXX.onclick = function (){
			obj.NextView('installAllSerach','HelcPDA.view.install.installSearch.InstallAllSerach');
		    Ext.getCmp('Choice_Search').addListener('change',function(obk,newValue,oldValue,eOpts){
		    	var ebs_user=Ext.getCmp('ebs_user');
		    	var fac_user=Ext.getCmp('fac_user');
		    	var int_user=Ext.getCmp('int_user');
		    	var box_number=Ext.getCmp('box_number');
		    	if(newValue=='安装数据查询'){
		    		ebs_user.setHidden(false);
		    		fac_user.setHidden(false);
		    		box_number.setHidden(true);
		    		ebs_user.setValue('');
		    		fac_user.setValue('');
		    		int_user.setValue('');
		    		box_number.setValue('');
		    	}else if(newValue=='排产数据查询'){
		    		ebs_user.setHidden(true);
		    		fac_user.setHidden(true);
		    		box_number.setHidden(true);
		    		ebs_user.setValue('');
		    		fac_user.setValue('');
		    		int_user.setValue('');
		    		box_number.setValue('');
		    	}else if(newValue=='箱头数据查询'){
		    		box_number.setHidden(false);
		    		ebs_user.setHidden(true);
		    		fac_user.setHidden(true);
		    		ebs_user.setValue('');
		    		fac_user.setValue('');
		    		int_user.setValue('');
		    	}
		    });
			
		};
		
		//下载GHP应用
		var LI=document.getElementById('GHP');
		LI.onclick = function (){
			obj.NextView('GHPDownLoadView_id','HelcPDA.view.GHPDownLoadView');
		};
		
		//提案文化在线
		/*
		var LI=document.getElementById('TAZX');
		LI.onclick = function (){
			obj.NextView('TAZXView_id','HelcPDA.view.TAZXView');
		};*/
//		var XZPDA=document.getElementById('XZPDA');
//		XZPDA.onclick = function (){
//			WL.App.openURL("http://elecloud.sinaapp.com");
//		};
		
		
		//更多页签
		//关于PDA
		var LI=document.getElementById('about');
		LI.onclick = function (){
			obj.NextView('About_id','HelcPDA.view.more.About');
			Ext.getCmp('text_RJKF').setValue('广州市华越友联科技发展有限公司');
		};
//		//设置
//		var LI=document.getElementById('set');
//		LI.onclick = function (){
//			alert('设置');
//		};
		//修改密码
		var LI=document.getElementById('Cpassword');
		LI.onclick = function (){
			obj.NextView('UpdatePassword_id','HelcPDA.view.more.UpdatePassword');
			Ext.getCmp('up_username').setValue(usernames);
		};
		//帮助
		var LI=document.getElementById('help');
		LI.onclick = function (){
			obj.NextView('help_vid','HelcPDA.view.more.Help');
			Ext.getCmp('help_send_button').setDisabled(true);
			//显示聊天记录
			var query={tcode:userid+"help",tid:"help"};
			WL.JSONStore.get(collectionName).find(query).then(function(res){
				if(res.length == 0){
					//如果是第一次进帮助，或者是退出后再次进去(退出会消除聊天记录)，会有一句欢迎语
					contentdata={CONTENT_KEY:'welcome'};
					var content= JSON.stringify(contentdata);
					var getResult=function(res){
						var chatYou = res.item[0].CONTENT;
						var newmsg="<div class='chatItem you'>     <div class='chatItemContent'> <img class='avatar' src='images/you_head_portrait.jpg'>       <div class='cloud cloudText'>         <div class='cloudPannel' style=''>           <div class='sendStatus'> </div>           <div class='cloudBody'>             <div class='cloudContent'>               <pre style='white-space:pre-wrap'><div onclick='HelpDanji(this);'>"+chatYou+"</div></pre>             </div>           </div>           <div class='cloudArrow '></div>         </div>       </div>     </div>   </div>";				
						document.getElementById("chatcontainer").innerHTML += newmsg ;
					};
					obj.asyconnectServer(getResult, 'helpAction.do?method=toSearchWelcome', content);
				}else{
					document.getElementById("chatcontainer").innerHTML = res[0].json.stext;
				}
			});
			setTimeout(obj.hold, 500);
			Ext.getCmp('chat_container').getScrollable().getScroller().scrollToEnd();
			//监听输入框
			var helpchattext=Ext.getCmp('help_chat_text');
				helpchattext.addListener('change',obj.helpchattext1,this,{
		    });
				
		};
		// 关于本机
//		var aboutDev=document.getElementById('aboutDev');
//		aboutDev.onclick = function () {
//			obj.NextView('AboutDevices_id','HelcPDA.view.more.AboutDevices');
//			Ext.getCmp('tf_deviceNo').setValue(document.getElementById('showDeviceNo').innerHTML);
//			Ext.getCmp('tf_imei').setValue(document.getElementById('showImei').innerHTML);
//			Ext.getCmp('tf_imsi').setValue(document.getElementById('showImsi').innerHTML);
//		};
		


		
		//获取 事项
		contentdata={person_id:person_id,ebs_user_id:ebs_user_id,init_person_id:init_person_id,roleStr:roleStr};
		var content= JSON.stringify(contentdata);
		var getResult=function(res){
			var items = res.items;
			//把各事项对应的图标和颜色一起放进store
			var backlogDate = [];
			var cs = 0;
			var sum = 0;
			for(var i = 0 ; i < items.length ; i++){
				var temp={};
				if(items[i].COUNT != 0){
					temp.COUNT=items[i].COUNT;
//					temp.PLAN_START_DT=items[i].PLAN_START_DT;
					temp.TASK_ID=items[i].TASK_ID;
					temp.TASK_NAME=items[i].TASK_NAME;
					//判断事项，给不同的事项添加不同的图标和颜色
					if(items[i].TASK_ID=="MAINTAIN_PLAN"){
						temp.icon = '\\';
						temp.color = '#62bb47';
					};
					if(items[i].TASK_ID=="REPAIR"){
						temp.icon = 'x';
						temp.color = '#fbb726';
					};
					if(items[i].TASK_ID=="INST_PLAN"){
						temp.icon = '\\';
						temp.color = '#f6821f';
					};
					if(items[i].TASK_ID=="INST_SCHEDULE"){
						temp.icon = '3';
						temp.color = '#e03a3e';
					};
					if(items[i].TASK_ID=="INST_WSH"){
						temp.icon = 'X';
						temp.color = '#963d97';
					};
					if(items[i].TASK_ID=="INST_REPORT_CHECK"){
						temp.icon = 'w';
						temp.color = '#009ddc';
					};
					if(items[i].TASK_ID=="INST_FOLLOWUP"){
						temp.icon = '7';
						temp.color = '#62bb47';
					};
					if(items[i].TASK_ID=="INST_TRANSFER"){
						temp.icon = '^';
						temp.color = '#fbb726';
					};
					if(items[i].TASK_ID=="INST_DEBUG_RETURN"){
						temp.icon = 'F';
						temp.color = '#f6821f';
					};
					if(items[i].TASK_ID=="INST_CHECK_RETURN"){
						temp.icon = 'F';
						temp.color = '#e03a3e';
					};
					if(items[i].TASK_ID=="INST_OUT_NOENT"){
						temp.icon = 'R';
						temp.color = '#963d97';
					};
					if(items[i].TASK_ID=="INST_DEBUG_MENU"){
						temp.icon = 'p';
						temp.color = '#009ddc';
					};
					if(items[i].TASK_ID=="INST_CHECK_MENU"){
						temp.icon = 'p';
						temp.color = '#62bb47';
					};
					backlogDate[cs]=temp;
					cs++;
					sum = sum + items[i].COUNT;
				}
			};
			var sele=document.getElementsByName('sumDB');
			if(sum == 0){
				sele[0].innerHTML="";
			}else{
				sele[0].innerHTML=sum;
			}
			var store=obj.getStore('BacklogStore','HelcPDA.store.login.BacklogStore');
			store.setData(backlogDate);
		};
		obj.asyconnectServer(getResult, 'loginAction.do?method=getToDoCount', content);
		
	},
	
	//czq 根据权限显示模块（旧）
	NewView_power : function(power){
		var obj = this;
		//新首页页面对模块显示的权限
    	var modules_dataview_data  = [];//安装项目子模块列表
    	//全部用户都有的模块
    	
    	modules_dataview_data.push(
				{
            	   	text: '保障表',
            	   	data: 'none',
            	   	icon: 'Z',
            	   	color: '#5F9BE6'
               	}
		);
    	modules_dataview_data.push(
				{
            	   	text: '接梯表',
            	   	data: 'none',
            	   	icon: 'Z',
            	   	color: '#fbb726'
               	}
		);
    	
    	
    	modules_dataview_data.push(
				{
            	   	text: '待提交数',
            	   	data: 'none',
            	   	icon: 'c',
            	   	color: 'green'
               	}
		);
    	
//    	modules_dataview_data.push(
//    			{
//                    text: '待办任务',
//                    data: 'none',
//                    icon: 'n',
//                    color: '#BB6247'
//                }
//    	);
    	
    	modules_dataview_data.push(
    			{
    				text: '移动遥监',
    				data: 'none',
    				icon: 'L',
    				color: '#854107'
    			}
    	);
    	
    	modules_dataview_data.push(
    			{
    				text: 'OA起草',
    				data: 'none',
    				icon: 'O',
    				color: '#854107'
    			}
    	);
    	modules_dataview_data.push(
    			{
                    text: '品证整改',
                    data: 'none',
                    icon: 'h',
                    color: '#ff6666'
                }
    	);
    	modules_dataview_data.push(
				{
            	   	text: '更换件',
            	   	data: 'none',
            	   	icon: 'U',
            	   	color: '#5F9BE6'
               	}
		);
		//保养计划
		if(roleStr.indexOf('baoyangjihua')>=0){
			modules_dataview_data.push(
					{
                    	text: '保养计划',
                    	data: 'none',
                    	icon: '\\',
                    	color: '#9669DC'
                    }
			);
    	}
		if(roleStr.indexOf('guzhangchuli')>=0){
			modules_dataview_data.push(
					{
                    	text: '急修处理',
                    	data: 'none',
                    	icon: 'e',
                    	color: '#5F9BE6'
                    }
			);
		}
		if(roleStr.indexOf('anzhuangguocheng')>=0){
			modules_dataview_data.push(
					{
	                    text: '安装项目',
	                    data: 'none',
	                    icon: 'b',
	                    color: 'red'
	                }
			);
		}
		if(roleStr.indexOf('baoyangjihua')>=0){
			modules_dataview_data.push(
					{
                    	text: '专项保障',
                    	data: 'none',
                    	icon: ';',
                    	color: '#FFA54B'
                    }
			);
		}
		if(roleStr.indexOf('guzhangzhiyin')>=0){
			modules_dataview_data.push(
					{
                    	text: '故障引导',
                    	data: 'none',
                    	icon: '!',
                    	color: '#fbb726'
                    }
			);
		}
		if(roleStr.indexOf('kehuxinxi')>=0){
			modules_dataview_data.push(
					{
                    	text: '客户信息',
                    	data: 'none',
                    	icon: 'F',
                    	color: '#009ddc'
                    }
			);
		}
		if(roleStr.indexOf('hetongxinxi')>=0){
			modules_dataview_data.push(
					{
                    	text: '合同信息',
                    	data: 'none',
                    	icon: 'F',
                    	color: '#62bb47'
                    }
			);
		}
		if(roleStr.indexOf('diantixinxi')>=0){
			modules_dataview_data.push(
					{
                    	text: '电梯信息',
                    	data: 'none',
                    	icon: 'F',
                    	color: '#f6821f'
                    }
			);
		}
		if(roleStr.indexOf('techparams')>=0){
			modules_dataview_data.push(
					{
                        text: '技术附页',
                        data: 'none',
                        icon: 'F',
                        color: '#9669DC'
                    }
			);
		}
		if(roleStr.indexOf('weizhixinxibd')>=0){
			modules_dataview_data.push(
					{
                        text: '位置信息',
                        data: 'none',
                        icon: '@',
                        color: '#5F9BE6'
                    }
			);
			// 有权限时，开启被动定位
			/*
			cordova.exec(function(res) {
			}, function(err) {
				WL.Toast.show("错误:"+err);
			},"JSMapMain","开启被动定位",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase()}]);
			*/
		}
		if(roleStr.indexOf('report_pda')>=0){
			modules_dataview_data.push(
					{
                        text: '统计报表',
                        data: 'none',
                        icon: 'Z',
                        color: '#CBC811'
                    }
			);
		}
		if(roleStr.indexOf('GHP')>=0){
			modules_dataview_data.push(
					{
                    	text: 'GHP应用',
                    	data: 'none',
                    	icon: '~',
                    	color: '#f6821f'
                    }
			);
		};
		
		//if(roleStr.indexOf('baoyangchoucha')>=0){
			modules_dataview_data.push(
					{
                        text: '保养抽查',
                        data: 'none',
                        icon: 'F',
                        color: '#9669DC'
                    }
			);
		//};
		
			modules_dataview_data.push(
					{
                        text: '抽查整改',
                        data: 'none',
                        icon: 'F',
                        color: '#9669DC'
                    }
			);
		//公共模块
		modules_dataview_data.push(
    			{
    				text: '消息',
    				data: 'none',
    				icon: 'w',
    				color: 'green'
    			}
    	);
		
		//czq 160815 edoc
    	modules_dataview_data.push(
				{
            	   	text: '工程文件',
            	   	data: 'none',
            	   	icon: 'N',
            	   	color: 'green'
               	}
		);

		modules_dataview_data.push(
				{
            	   	text: '公司通讯录',
            	   	data: 'none',
            	   	icon: 'U',
            	   	color: '#5F9BE6'
               	}
		);
		
		modules_dataview_data.push(
				{
                	text: '安装查询',
                	data: 'none',
                	icon: 's',
                	color: '#FA82A5'
                }
		);
		//添加人：xkc 添加日期：2015-03-02
		modules_dataview_data.push(
				{
					text: '配件信息',
					data: 'none',
					color: '#FFA54B',
					icon: 's'
				}
		);
		 //zhj0617
		modules_dataview_data.push(
				{
					text: '年检信息',
					data: 'none',
                    //id:'cellPhone_s',
                    color: '#9669DC',
                    icon: 's'
				}
		);
		 //zhj0223
		modules_dataview_data.push(
				{
					text: '安全考核',
					data: 'none',
                    //id:'cellPhone_s',
                    color: '#9669DC',
                    icon: 's'
				}
		);
		modules_dataview_data.push(
				{
					text: '手机号码信息',
					data: 'none',
                    //id:'cellPhone_s',
                    color: '#9669DC',
                    icon: 's'
				}
		);
		
		//用户/设备解锁
		if(roleStr.indexOf('unlock') >= 0){
			modules_dataview_data.push(
				{
	            	text: '解锁',
	            	data: 'none',
	            	icon: ')',
	            	color: 'green'
	            }
			);
    	}
		
		modules_dataview_data.push(
				{
                    text: '更多',
                    data: 'none',
                    icon: '.',
                    color: 'grey'
                }
		);
		//赋值权限
		Ext.getCmp('modules_dataview_id').setData(modules_dataview_data);
		//登录成功后判断记录登录账号
		//从日滨页面返回回来
		var page = RB_page_flag;
		if(page != "" && page != null && typeof(page) != "undefined"){
			
		}else{
			if(loginpassword == null){
				var checkuser = Ext.getCmp('checkuser').getValue();
				if(checkuser==1){ 
					WL.EncryptedCache.write("Loginuser", userid, onWrite1Success, onWrite1Failure);
					function onWrite1Success(status){
						console.log('记录登录账号成功');  
						console.log('company_code : '+company_code);  
						console.log('station_id : '+station_id);  
						console.log('userid : '+userid);  
						console.log('person_id : '+person_id);  
						console.log('init_person_id : '+init_person_id);  
						console.log('userid : '+userid);  
						console.log('ebs_user_id : '+ebs_user_id);  
						console.log('username : '+username);  
						console.log('roleStr : '+roleStr);  
						console.log('rolename : '+rolename);
					} 
					function onWrite1Failure(status){
						if(status=WL.EncryptedCache.EOC_CLOSED){ 
							console.log('记录登录账号失败');  
						} 
					} 
					
				}else{ 
					WL.EncryptedCache.write("Loginuser", null, onWrite0Success, onWrite0Failure);
					function onWrite0Success(status){
						console.log('删除上上次记录的账号成功');  
					} 
					function onWrite0Failure(status){
						if(status=WL.EncryptedCache.EOC_CLOSED){ 
							console.log('删除上上次记录的账号失败');  
						} 
					} 
				};
			}
		}
		
		//获取安装待办事项
		contentdata={person_id:person_id,ebs_user_id:ebs_user_id,init_person_id:init_person_id,roleStr:roleStr};
		var content= JSON.stringify(contentdata);
		var getResult=function(res){
			var items = res.items;
			//把各事项对应的图标和颜色一起放进store
			var backlogDate = [];
			var backlogDate_list = [];
			var cs = 0;
			var sum = 0;
			
			for(var i = 0 ; i < items.length ; i++){
				var temp={};
				var temp_list={};
				if(items[i].COUNT != 0){
					//判断事项，给不同的事项添加不同的图标和颜色
					//安装人员或者管理人员
					if(power!="baoyangjihua"){
						if(items[i].TASK_ID=="INST_PLAN"){
							temp.text= items[i].TASK_NAME,
							temp.color= '#e03a3e',
							temp.TASK_ID= items[i].TASK_ID,
							temp.data= items[i].COUNT,
							temp.icon = '\\';
							
							backlogDate[cs]=temp;
							sum = sum + items[i].COUNT;
							
							temp_list.COUNT=items[i].COUNT;
							temp_list.TASK_ID=items[i].TASK_ID;
							temp_list.TASK_NAME=items[i].TASK_NAME;
							temp_list.icon = '\\';
							temp_list.color = '#f6821f';
							backlogDate_list[cs]=temp_list;
							cs++;
						};
						if(items[i].TASK_ID=="INST_SCHEDULE"){
							temp.text= items[i].TASK_NAME,
							temp.color= '#fbb726',
							temp.TASK_ID= items[i].TASK_ID,
							temp.data= items[i].COUNT,
							temp.icon = '3';
							
							backlogDate[cs]=temp;
							sum = sum + items[i].COUNT;
							
							temp_list.COUNT=items[i].COUNT;
							temp_list.TASK_ID=items[i].TASK_ID;
							temp_list.TASK_NAME=items[i].TASK_NAME;
							temp_list.icon = '3';
							temp_list.color = '#e03a3e';
							backlogDate_list[cs]=temp_list;
							cs++;
						};
						if(items[i].TASK_ID=="INST_WSH"){
							temp.text= items[i].TASK_NAME,
							temp.color= '#f6821f',
							temp.TASK_ID= items[i].TASK_ID,
							temp.data= items[i].COUNT,
							temp.icon = 'X';
							
							backlogDate[cs]=temp;
							sum = sum + items[i].COUNT;
							
							temp_list.COUNT=items[i].COUNT;
							temp_list.TASK_ID=items[i].TASK_ID;
							temp_list.TASK_NAME=items[i].TASK_NAME;
							temp_list.icon = 'X';
							temp_list.color = '#963d97';
							backlogDate_list[cs]=temp_list;
							cs++;
						};
						if(items[i].TASK_ID=="INST_REPORT_CHECK"){
							temp.text= items[i].TASK_NAME,
							temp.color= '#e03a3e',
							temp.TASK_ID= items[i].TASK_ID,
							temp.data= items[i].COUNT,
							temp.icon = 'W';
							
							backlogDate[cs]=temp;
							sum = sum + items[i].COUNT;
							
							temp_list.COUNT=items[i].COUNT;
							temp_list.TASK_ID=items[i].TASK_ID;
							temp_list.TASK_NAME=items[i].TASK_NAME;
							temp_list.icon = 'w';
							temp_list.color = '#009ddc';
							backlogDate_list[cs]=temp_list;
							cs++;
						};
						if(items[i].TASK_ID=="INST_FOLLOWUP"){
							temp.text= items[i].TASK_NAME,
							temp.color= '#e03a3e',
							temp.TASK_ID= items[i].TASK_ID,
							temp.data= items[i].COUNT,
							temp.icon = 'W';
							
							backlogDate[cs]=temp;
							sum = sum + items[i].COUNT;
							
							temp_list.COUNT=items[i].COUNT;
							temp_list.TASK_ID=items[i].TASK_ID;
							temp_list.TASK_NAME=items[i].TASK_NAME;
							temp_list.icon = '7';
							temp_list.color = '#62bb47';
							backlogDate_list[cs]=temp_list;
							cs++;
						};
						if(items[i].TASK_ID=="INST_TRANSFER"){
							temp.text= items[i].TASK_NAME,
							temp.color= '#62bb47',
							temp.TASK_ID= items[i].TASK_ID,
							temp.data= items[i].COUNT,
							temp.icon = '^';
							
							backlogDate[cs]=temp;
							sum = sum + items[i].COUNT;
							
							temp_list.COUNT=items[i].COUNT;
							temp_list.TASK_ID=items[i].TASK_ID;
							temp_list.TASK_NAME=items[i].TASK_NAME;
							temp_list.icon = '^';
							temp_list.color = '#fbb726';
							backlogDate_list[cs]=temp_list;
							cs++;
						};
						if(items[i].TASK_ID=="INST_DEBUG_RETURN"){
							temp.text= items[i].TASK_NAME,
							temp.color= '#fbb726',
							temp.TASK_ID= items[i].TASK_ID,
							temp.data= items[i].COUNT,
							temp.icon = 'W';
							
							backlogDate[cs]=temp;
							sum = sum + items[i].COUNT;
							
							temp_list.COUNT=items[i].COUNT;
							temp_list.TASK_ID=items[i].TASK_ID;
							temp_list.TASK_NAME=items[i].TASK_NAME;
							temp_list.icon = 'F';
							temp_list.color = '#f6821f';
							backlogDate_list[cs]=temp_list;
							cs++;
						};
						if(items[i].TASK_ID=="INST_CHECK_RETURN"){
							temp.text= items[i].TASK_NAME,
							temp.color= '#fbb726',
							temp.TASK_ID= items[i].TASK_ID,
							temp.data= items[i].COUNT,
							temp.icon = 'W';
							
							backlogDate[cs]=temp;
							sum = sum + items[i].COUNT;
							
							temp_list.COUNT=items[i].COUNT;
							temp_list.TASK_ID=items[i].TASK_ID;
							temp_list.TASK_NAME=items[i].TASK_NAME;
							temp_list.icon = 'F';
							temp_list.color = '#e03a3e';
							backlogDate_list[cs]=temp_list;
							cs++;
						};
						if(items[i].TASK_ID=="INST_OUT_NOENT"){
							temp.text= items[i].TASK_NAME,
							temp.color= '#62bb47',
							temp.TASK_ID= items[i].TASK_ID,
							temp.data= items[i].COUNT,
							temp.icon = 'x';
							
							backlogDate[cs]=temp;
							sum = sum + items[i].COUNT;
							
							temp_list.COUNT=items[i].COUNT;
							temp_list.TASK_ID=items[i].TASK_ID;
							temp_list.TASK_NAME=items[i].TASK_NAME;
							temp_list.icon = 'R';
							temp_list.color = '#963d97';
							backlogDate_list[cs]=temp_list;
							cs++;
						};
						if(items[i].TASK_ID=="INST_DEBUG_MENU"){
							temp.text= items[i].TASK_NAME,
							temp.color= '#fbb726',
							temp.TASK_ID= items[i].TASK_ID,
							temp.data= items[i].COUNT,
							temp.icon = 'p';
							
							backlogDate[cs]=temp;
							sum = sum + items[i].COUNT;
							
							temp_list.COUNT=items[i].COUNT;
							temp_list.TASK_ID=items[i].TASK_ID;
							temp_list.TASK_NAME=items[i].TASK_NAME;
							temp_list.icon = 'p';
							temp_list.color = '#009ddc';
							backlogDate_list[cs]=temp_list;
							cs++;
						};
						if(items[i].TASK_ID=="INST_CHECK_MENU"){
							temp.text= items[i].TASK_NAME,
							temp.color= '#f6821f',
							temp.TASK_ID= items[i].TASK_ID,
							temp.data= items[i].COUNT,
							temp.icon = 'p';
							
							backlogDate[cs]=temp;
							sum = sum + items[i].COUNT;
							
							temp_list.COUNT=items[i].COUNT;
							temp_list.TASK_ID=items[i].TASK_ID;
							temp_list.TASK_NAME=items[i].TASK_NAME;
							temp_list.icon = 'p';
							temp_list.color = '#62bb47';
							backlogDate_list[cs]=temp_list;
							cs++;
						};
						
					}
					
					//维保人员或者管理员
					if(power!="anzhuangguocheng"){
						if(items[i].TASK_ID=="REPAIR"){
							temp.text= items[i].TASK_NAME,
							temp.color= '#EB6368',
							temp.TASK_ID= items[i].TASK_ID,
							temp.data= items[i].COUNT,
							temp.icon = 'x';
							
							backlogDate[cs]=temp;
							sum = sum + items[i].COUNT;
							
							temp_list.COUNT=items[i].COUNT;
							temp_list.TASK_ID=items[i].TASK_ID;
							temp_list.TASK_NAME=items[i].TASK_NAME;
							temp_list.icon = 'x';
							temp_list.color = '#EB6368';
							backlogDate_list[cs]=temp_list;
							cs++;
						};
						
						/*
						if(items[i].TASK_ID=="MAINTAIN_PLAN"){
							temp.text= items[i].TASK_NAME,
							temp.color= '#F4A933',
							temp.TASK_ID= items[i].TASK_ID,
							temp.data= items[i].COUNT,
							temp.icon = '\\';
							
							backlogDate[cs]=temp;
							sum = sum + items[i].COUNT;
							
							temp_list.COUNT=items[i].COUNT;
							temp_list.TASK_ID=items[i].TASK_ID;
							temp_list.TASK_NAME=items[i].TASK_NAME;
							temp_list.icon = '\\';
							temp_list.color = '#62bb47';
							backlogDate_list[cs]=temp_list;
							cs++;
						};
						*/
					}
					
				}
			};
			
			if(power!="anzhuangguocheng"){
				temp={};
				temp_list={};
				var getResult = function(res){
					var v_startD = Ext.Date.format(Ext.Date.add(new Date(res.ServerDT),Ext.Date.DAY,-100),'m/d/Y');
					var v_endD = Ext.Date.format(Ext.Date.add(new Date(res.ServerDT),Ext.Date.DAY,+1),'m/d/Y');
					
					var getResult = function(res){
						var response = res.PlanListQuery_Output;
						if(response.NumOutputObjects != "0"){
							temp.text= '保养计划',
							temp.color= '#F4A933',
							temp.TASK_ID= 'MAINTAIN_PLAN',
							temp.data= response.NumOutputObjects,
							temp.icon = '\\';
							
							backlogDate[cs]=temp;
							sum = sum + response.NumOutputObjects;
							
							temp_list.COUNT=response.NumOutputObjects;
							temp_list.TASK_ID='MAINTAIN_PLAN';
							temp_list.TASK_NAME='保养计划';
							temp_list.icon = '\\';
							temp_list.color = '#62bb47';
							backlogDate_list[cs]=temp_list;
							cs++;
							
							var grouptemp = []
							var tempdt;
							var v_find;
							for(var i = 0;i < response.NumOutputObjects;i++){
								tempdt = response.ListOfHelPdaMaintainingPlanListIo.HelMaintainPlan.length?
										Ext.Date.format(new Date(response.ListOfHelPdaMaintainingPlanListIo.HelMaintainPlan[i].PlanStartDate),'Y-m-d'):
										Ext.Date.format(new Date(response.ListOfHelPdaMaintainingPlanListIo.HelMaintainPlan.PlanStartDate),'Y-m-d');
								v_find = false;
								for(var ii = 0;ii < grouptemp.length;ii++){
									if(grouptemp[ii].PLAN_START_DT == tempdt){
										grouptemp.splice(ii,1,{
											TASK_ID:'MAINTAIN_PLAN',
											TASK_NAME:'保养计划',
											PLAN_START_DT:tempdt,
											COUNT:grouptemp[ii].COUNT+1}
										);
										v_find = true;
										break;
									}
								}
								if(!v_find){
									grouptemp.push({
										TASK_ID:'MAINTAIN_PLAN',
										TASK_NAME:'保养计划',
										PLAN_START_DT:tempdt,
										COUNT:1,
									})
								}
							}
							
							var MaintailPlanBackLogStore = obj.getStore('MaintailPlanBackLogStore','HelcPDA.store.login.MaintailPlanBackLogStore');
							MaintailPlanBackLogStore.setData(grouptemp);
							MaintailPlanBackLogStore.sort('PLAN_START_DT','DESC');
						}
						
						//设置待办
						if(sum!=0){
//							Ext.getCmp('modules_dataview_id')._data[1].data = sum.toString();
//							Ext.getCmp('modules_dataview_id')._store._data.all[1].data.data = sum.toString();
//							Ext.getCmp('modules_dataview_id').refresh();
//							if(power=="anzhuangguocheng"||power=="baoyangjihua"||power=="anzhuangguochenganzhuangguocheng"){
								Ext.getCmp('new_Todo_dataview').setData(backlogDate);
								var height = 0;
								if((backlogDate.length%2)!=0){
									height = ((backlogDate.length+1)/2)*63;
								}else{
									height = (backlogDate.length/2)*63;
								}
								Ext.getCmp('new_Todo_dataview').setHeight(height);
								
								//维保人员或者管理员
								var report_height = 0;
								if(power=="baoyangjihuaanzhuangguochenganzhuangguocheng"){
									//拥有管理员权限
									report_height = Ext.getCmp('new_admin_report_dataview').getHeight();
								}else if(power=="anzhuangguocheng" || power=="anzhuangguochenganzhuangguocheng"){
									//安装人员权限
									report_height = Ext.getCmp('new_install_report_dataview').getHeight();
								}else if(power=="baoyangjihua"){
									//维保人员权限
									report_height = Ext.getCmp('new_maintain_report_dataview').getHeight();
								}else{
									// 其它角色都暂时给管理员权限
									report_height = Ext.getCmp('new_admin_report_dataview').getHeight();
								}
								var panel_height = height + 189 + report_height;			//首页高度
								Ext.getCmp('new_view_panel').setHeight(panel_height+10);
								
//							}
							
							var store=obj.getStore('BacklogStore','HelcPDA.store.login.BacklogStore');
							store.setData(backlogDate_list);
							
						}
						//obj.news_panel();
					};
					
					var parameters = {
							procedure : 'PlanListQuery',
							isLoading : false,
							contentStr : content,
							startD : v_startD,
							endD : v_endD,
							isToDoCount : 'Y',
					};
					
					MainCtr.getDataFromServer(getResult,parameters);
				};
				
				var parameters = {
						procedure : 'getServerDT',
						isLoading : false,
				};
				
				MainCtr.getDataFromServer(getResult,parameters);
				
				
			}
			
			/***********
			//设置待办
					if(sum!=0){
//						Ext.getCmp('modules_dataview_id')._data[1].data = sum.toString();
//						Ext.getCmp('modules_dataview_id')._store._data.all[1].data.data = sum.toString();
//						Ext.getCmp('modules_dataview_id').refresh();
//						if(power=="anzhuangguocheng"||power=="baoyangjihua"||power=="anzhuangguochenganzhuangguocheng"){
							Ext.getCmp('new_Todo_dataview').setData(backlogDate);
							var height = 0;
							if((backlogDate.length%2)!=0){
								height = ((backlogDate.length+1)/2)*63;
							}else{
								height = (backlogDate.length/2)*63;
							}
							Ext.getCmp('new_Todo_dataview').setHeight(height);
							
							//维保人员或者管理员
							var report_height = 0;
							if(power=="baoyangjihuaanzhuangguochenganzhuangguocheng"){
								//拥有管理员权限
								report_height = Ext.getCmp('new_admin_report_dataview').getHeight();
							}else if(power=="anzhuangguocheng" || power=="anzhuangguochenganzhuangguocheng"){
								//安装人员权限
								report_height = Ext.getCmp('new_install_report_dataview').getHeight();
							}else if(power=="baoyangjihua"){
								//维保人员权限
								report_height = Ext.getCmp('new_maintain_report_dataview').getHeight();
							}else{
								// 其它角色都暂时给管理员权限
								report_height = Ext.getCmp('new_admin_report_dataview').getHeight();
							}
							var panel_height = height + 189 + report_height;			//首页高度
							Ext.getCmp('new_view_panel').setHeight(panel_height+10);
							
//						}
						
						var store=obj.getStore('BacklogStore','HelcPDA.store.login.BacklogStore');
						store.setData(backlogDate_list);
						
					}
					//obj.news_panel(); 
			
			 */
			
		};
		this.asyconnectServer(getResult, 'loginAction.do?method=getToDoCount', content);
//		this.connectServer(getResult, 'loginAction.do?method=getToDoCount', content);
		this.new_view_report();
		this.news_panel();
		
	},
	
//	news_carousel : function(obj, value, oldValue, eOpts){
//		var obj_this = this;
//		var panelId = value.id;
//		var index = panelId.substring(panelId.length-1,panelId.length);
//		var LI=document.getElementById(panelId);
//		LI.onclick = function (){
//			var unidId = "news_unid"+index;
//			if(document.getElementById(unidId) == null){
//			}else{
//				var unid = document.getElementById(unidId).innerText;
//				var getResult=function(res){
//					obj_this.NextView('newsCon_id','HelcPDA.view.newsCon');
//					var returnData = eval("("+ res.GETGSGGDOCReturn.CDATA +")");
//					Ext.getCmp('news_subject').setHtml(returnData.data.subject);
//					Ext.getCmp('news_doc').setHtml(returnData.data.body);
//				};
//				
//				var params = {};
//				params.method = 'GetGSGGDoc';
//				params.parameters = [unid];
//				obj_this.getApplication().getController('ApplicationController_OA').connectServer_OA(getResult,params);
//			}
//			
//		};
//	},
	
	news_panel : function(){
		var obj_this = this;
		var getResult=function(res){
//			obj_this.new_view_report();
			if (res == '' || res == null || res == undefined) {
				return ;
			}
			var items = [];
			var returnData;
			if(res.GETGSGGLISTReturn.CDATA){
				returnData = eval("("+ res.GETGSGGLISTReturn.CDATA +")");
			}else{
				returnData = eval("("+ res.GETGSGGLISTReturn +")");
			}
			var length = returnData.data.length;
			
			/**
			 * 公告只要当前日期前15天直今
			 * */
			var news_Data = [];
			var curDate = new Date();
			var preDate = new Date(curDate.getTime() - 24*60*60*1000*15);
			var Tdate = Ext.Date.format(preDate,'Y-m-d');
			for(var i=0;i<length;i++){
				var ctime = returnData.data[i].ctime;
				var date = Ext.Date.format(new Date(ctime),'Y-m-d');
				if(date > Tdate){
					news_Data.push(returnData.data[i]);
				}
			}
			if(news_Data.length==0){
				Ext.getCmp('news_carousel').setHidden(true);
//				items.push({
//					xtype: 'panel',
//					id: 'news_panel',
//					html: '<div name="news_panel" id="news_panel"><div id="news_unid" style="display:none">no_unid</div><div ></div><div style="text-align:center;font-size:0.5em;">欢迎登录日立移动办公软件</div></div>',
//					width: '98%',
//				});
			}else{
				for(var i=0;i<news_Data.length;i++){
					items.push({
						xtype: 'panel',
						id: 'news_panel'+i,
						html: '<div name="news_panel" id="news_panel'+i+'" onclick="news_show('+i+')"><div id="news_unid'+i+'" style="display:none">'+news_Data[i].unid+'</div><div class="news_title">'+news_Data[i].subject+'</div><div class="news_content">'+news_Data[i].ctime+'</div></div>',
						width: '98%',
						items:[{
							xtype:'hiddenfield',
							id: 'news_unid'+i,
							value:news_Data[i].unid
						}]
					});
				}
			}
			
			Ext.getCmp('news_carousel').setItems(items);
			
		};
		var params = {};
		params.method = 'GetGSGGList';
		params.parameters = ['001006'];
		this.getApplication().getController('ApplicationController_OA').asy_connectServer_OA(getResult,params);
	},
	
	new_view_report : function(){
		var getResult=function(res){
			console.log('new_view_report',res);
			var new_maintain_report_dataview = Ext.getCmp('new_maintain_report_dataview');
			var new_admin_report_dataview = Ext.getCmp('new_admin_report_dataview');
			var new_install_report_dataview = Ext.getCmp('new_install_report_dataview');
			var ENTERED_AP_RATE = null;				//录入实绩率
			var PLAINTED_MP_RATE = null;			//已编制保养计划率
			var ENTERED_ARRIVAL_RATE = null;		//录入到达时间比例
			var ENTERED_SAVING_RATE = null;			//录入救人时间率
			var ENTERED_FINISHED_RATE = null;		//录入完工时间宗数比例
			var ENTERED_FAULT_REPORT_RATE = null;	//录入故障报告书率
			var PASSED_FAULT_RATE = null;			//已审核故障单率
			//isAdmin==1:PDA管理人员;isHQ==1:总部人员
			if(res.isAdmin==1 || power=="baoyangjihuaanzhuangguochenganzhuangguocheng"){
				//保养计划
				var maintainArray = res.RATE[0];
				var ELV_AMOUNT = "0.0000001";				//应编制计划
				var ENTERED_AP = "0";						//已录入实绩
				var PLAINTED_PLAN = "0";					//已编计划
				for(var i =0;i<maintainArray.length;i++){
					ELV_AMOUNT = parseFloat(ELV_AMOUNT) + parseFloat(maintainArray[i].ELV_AMOUNT);
					ENTERED_AP = parseFloat(ENTERED_AP) + parseFloat(maintainArray[i].ENTERED_AP);
					PLAINTED_PLAN = parseFloat(PLAINTED_PLAN) + parseFloat(maintainArray[i].PLAINTED_PLAN);
				}
//				ENTERED_AP_RATE = parseInt((ENTERED_AP/ELV_AMOUNT)*100)+"%";
//				PLAINTED_MP_RATE = parseInt((PLAINTED_PLAN/ELV_AMOUNT)*100)+"%";
				ENTERED_AP_RATE = maintainArray[i].LuR_RATE+"%";
				PLAINTED_MP_RATE = maintainArray[i].TOTAL_RATE+"%";
				if(typeof(res.RATE.LuR_RATE) == "undefined"){
						new_maintain_report_dataview._store._data.all[1].data.data = "0%";
					}else{
						new_maintain_report_dataview._store._data.all[1].data.data = res.RATE.LuR_RATE+"%";
					}
				new_admin_report_dataview._store._data.all[1].data.data = PLAINTED_MP_RATE;
				new_admin_report_dataview._store._data.all[2].data.data = ENTERED_AP_RATE;
				
				console.log("已编制保养计划率(全部):"+PLAINTED_MP_RATE);
				console.log("录入实绩率(全部):"+ENTERED_AP_RATE);
				
				//故障处理时间录入
				var hotlineArray = res.RATE[1];
				var FAULT_AMOUNT = "0.0000001";				//受信宗数
				var ENTERED_ARRIVAL_AMOUNT = "0";			//录入到达时间宗数
				var ENTERED_FINISHED_AMOUNT = "0";			//录入完工时间宗数
				var TIRING_AMOUNT = "0.0000001";			//困人宗数
				var ENTERED_SAVING_AMOUNT = "0";			//录入救人时间宗数
				for(var j = 0;j<hotlineArray.length;j++){
					FAULT_AMOUNT = parseFloat(FAULT_AMOUNT) + parseFloat(hotlineArray[j].FAULT_AMOUNT);
					ENTERED_ARRIVAL_AMOUNT = parseFloat(ENTERED_ARRIVAL_AMOUNT) + parseFloat(hotlineArray[j].ENTERED_ARRIVAL_AMOUNT);
					ENTERED_FINISHED_AMOUNT = parseFloat(ENTERED_FINISHED_AMOUNT) + parseFloat(hotlineArray[j].ENTERED_FINISHED_AMOUNT);
					TIRING_AMOUNT = parseFloat(TIRING_AMOUNT) + parseFloat(hotlineArray[j].TIRING_AMOUNT);
					ENTERED_SAVING_AMOUNT = parseFloat(ENTERED_SAVING_AMOUNT) + parseFloat(hotlineArray[j].ENTERED_SAVING_AMOUNT);
				}
				ENTERED_ARRIVAL_RATE = parseInt((ENTERED_ARRIVAL_AMOUNT/FAULT_AMOUNT)*100)+"%";
				ENTERED_FINISHED_RATE = parseInt((ENTERED_FINISHED_AMOUNT/FAULT_AMOUNT)*100)+"%";
				ENTERED_SAVING_RATE = parseInt((ENTERED_SAVING_AMOUNT/TIRING_AMOUNT)*100)+"%";
				//录入到达时间比例
				new_admin_report_dataview._store._data.all[4].data.data = ENTERED_ARRIVAL_RATE;
				//录入救人时间率
				new_admin_report_dataview._store._data.all[5].data.data = ENTERED_SAVING_RATE;
				//录入完工时间宗数比例
				new_admin_report_dataview._store._data.all[6].data.data = ENTERED_FINISHED_RATE;
				console.log("录入到达时间比例(全部):"+ENTERED_ARRIVAL_RATE);
				console.log("录入救人时间率(全部):"+ENTERED_SAVING_RATE);
				console.log("录入完工时间宗数比例(全部):"+ENTERED_FINISHED_RATE);
				
				//故障报告书
				var faultArray = res.RATE[2];
				var SENTERED_FAULT_REPORT = "0.0000001";	//应录入故障报告书
				var ENTERED_FAULT_REPORT = "0";				//已录入故障报告书宗数
				var PASSED_FAULT_AMOUNT = "0";				//已审核故障单宗数
				for(var k = 0 ;k<faultArray.length;k++){
					SENTERED_FAULT_REPORT = parseFloat(SENTERED_FAULT_REPORT) + parseFloat(faultArray[k].SENTERED_FAULT_REPORT);
					ENTERED_FAULT_REPORT = parseFloat(ENTERED_FAULT_REPORT) + parseFloat(faultArray[k].ENTERED_FAULT_REPORT);
					PASSED_FAULT_AMOUNT = parseFloat(PASSED_FAULT_AMOUNT) + parseFloat(faultArray[k].PASSED_FAULT_AMOUNT);
				}
				ENTERED_FAULT_REPORT_RATE = parseInt((ENTERED_FAULT_REPORT/SENTERED_FAULT_REPORT)*100)+"%";
				PASSED_FAULT_RATE = parseInt((PASSED_FAULT_AMOUNT/SENTERED_FAULT_REPORT)*100)+"%";
				new_admin_report_dataview._store._data.all[8].data.data = ENTERED_FAULT_REPORT_RATE;
				new_admin_report_dataview._store._data.all[9].data.data = PASSED_FAULT_RATE;
				console.log("录入故障报告书率(全部):"+ENTERED_FAULT_REPORT_RATE);
				console.log("已审核故障单率(全部):"+PASSED_FAULT_RATE);
				
				//安装数据
				var installArray = res.RATE[3];
				new_admin_report_dataview._store._data.all[11].data.data = installArray[0].WG;
				new_admin_report_dataview._store._data.all[12].data.data = installArray[0].JC;
				new_admin_report_dataview._store._data.all[13].data.data = installArray[0].ZZ;
				new_admin_report_dataview._store._data.all[14].data.data = installArray[0].YFHWJC;
				new_admin_report_dataview.refresh();
				//隐藏“正在加载报表”
				Ext.getCmp('report_shadow').setHidden(true);
				/**
				 * 首页页面高度计算
				 * **/
				var todo_view_height = Ext.getCmp('new_Todo_dataview').getHeight();//待办高度
				var height = new_admin_report_dataview._data.length*32;	//报表高度
				var panel_height = height + 189 + todo_view_height;			//首页高度
				new_admin_report_dataview.setHeight(height);
				Ext.getCmp('new_view_panel').setHeight(panel_height+10);
				
			}else{
				if(typeof(new_maintain_report_dataview)!="undefined"){
					//录入实绩率
//					if(typeof(res.RATE.ENTERED_AP_RATE) == "undefined"){
//						new_maintain_report_dataview._store._data.all[1].data.data = "0%";
//					}else{
//						new_maintain_report_dataview._store._data.all[1].data.data = res.RATE.ENTERED_AP_RATE+"%";
//					}
					if(typeof(res.RATE.LuR_RATE) == "undefined"){
						new_maintain_report_dataview._store._data.all[1].data.data = "0%";
					}else{
						new_maintain_report_dataview._store._data.all[1].data.data = res.RATE.LuR_RATE+"%";
					}
					//录入到达时间比例
					if(typeof(res.RATE.ENTERED_ARRIVAL_RATE) == "undefined"){
						new_maintain_report_dataview._store._data.all[3].data.data = "0%";
					}else{
						new_maintain_report_dataview._store._data.all[3].data.data = res.RATE.ENTERED_ARRIVAL_RATE+"%";
					}
					//录入救人时间率
					if(typeof(res.RATE.ENTERED_SAVING_RATE) == "undefined"){
						new_maintain_report_dataview._store._data.all[4].data.data = "0%";
					}else{
						new_maintain_report_dataview._store._data.all[4].data.data = res.RATE.ENTERED_SAVING_RATE+"%";
					}
					//录入完工时间宗数比例
					if(typeof(res.RATE.ENTERED_FINISHED_RATE) == "undefined"){
						new_maintain_report_dataview._store._data.all[5].data.data = "0%";
					}else{
						new_maintain_report_dataview._store._data.all[5].data.data = res.RATE.ENTERED_FINISHED_RATE+"%";
					}
					//录入故障报告书率
					if(typeof(res.RATE.ENTERED_FAULT_REPORT_RATE) == "undefined"){
						new_maintain_report_dataview._store._data.all[7].data.data = "0%";
					}else{
						new_maintain_report_dataview._store._data.all[7].data.data = res.RATE.ENTERED_FAULT_REPORT_RATE+"%";
					}
					/**
					 * 首页页面高度计算
					 * **/
					var todo_view_height = Ext.getCmp('new_Todo_dataview').getHeight();//待办高度
					var height = new_maintain_report_dataview._data.length*32;	//报表高度
					var panel_height = height + 189 + todo_view_height;			//首页高度
					new_maintain_report_dataview.setHeight(height);
					Ext.getCmp('new_view_panel').setHeight(panel_height+10);
					new_maintain_report_dataview.refresh();
					//隐藏“正在加载报表”
					Ext.getCmp('report_shadow').setHidden(true);
					
					console.log("录入实绩率:"+res.RATE.ENTERED_AP_RATE);
					console.log("录入到达时间比例:"+res.RATE.ENTERED_ARRIVAL_RATE);
					console.log("录入救人时间率:"+res.RATE.ENTERED_SAVING_RATE);
					console.log("录入完工时间宗数比例:"+res.RATE.ENTERED_FINISHED_RATE);
					console.log("录入故障报告书率:"+res.RATE.ENTERED_FAULT_REPORT_RATE);
				}else{
					//安装页面数据
					//调试人员
					if(typeof(res.RATE.install_person)!="undefined"){
						var view_data = [];
						if(res.RATE.install_person == "TS"){
							view_data.push(
				                    {
				                        text: '调试到达',
				                        text_style: 'font-size:1em;color:#0',
				                        display_bar: 'display:none',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: '',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
				                    {
				                        text: '到达录入(台数)',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: res.RATE.TSDD,
				                        data_color: 'green',
				                        display_more2: 'display:none',
				                        border: '1'
				                    },
				                    {
				                        text: '调试完成',
				                        text_style: 'font-size:1em;color:#0',
				                        display_bar: 'display:none',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: '',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
				                    {
				                        text: '完成录入(台数)',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: res.RATE.TSWC,
				                        data_color: 'orange',
				                        display_more2: 'display:none',
				                        border: '0'
				                    }
							);
						}else if(res.RATE.install_person == "YS"){
							view_data.push(
				                    {
				                        text: '检验到达',
				                        text_style: 'font-size:1em;color:#0',
				                        display_bar: 'display:none',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: '',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
				                    {
				                        text: '到达录入(台数)',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: res.RATE.CJDD,
				                        data_color: 'green',
				                        display_more2: 'display:none',
				                        border: '1'
				                    },
				                    {
				                        text: '检验完成',
				                        text_style: 'font-size:1em;color:#0',
				                        display_bar: 'display:none',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: '',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
				                    {
				                        text: '完成录入(台数)',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: res.RATE.CJWC,
				                        data_color: 'orange',
				                        display_more2: 'display:none',
				                        border: '0'
				                    }
							);
						}else if(res.RATE.install_person == "JL"){
							view_data.push(
				                    {
				                        text: '进场',
				                        text_style: 'font-size:1em;color:#0',
				                        display_bar: 'display:none',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: '',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
				                    {
				                        text: '进场录入(台数)',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: res.RATE.JCRL,
				                        data_color: 'green',
				                        display_more2: 'display:none',
				                        border: '1'
				                    },
				                    {
				                        text: '报调',
				                        text_style: 'font-size:1em;color:#0',
				                        display_bar: 'display:none',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: '',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
				                    {
				                        text: '报调录入(台数)',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: res.RATE.BTRL,
				                        data_color: 'orange',
				                        display_more2: 'display:none',
				                        border: '0'
				                    }
							);
						}	
						/**
						 * 首页页面高度计算
						 * **/
						//隐藏“正在加载报表”
						Ext.getCmp('report_shadow').setHidden(true);
						
						new_install_report_dataview.setData(view_data);
						var todo_view_height = Ext.getCmp('new_Todo_dataview').getHeight();//待办高度
						var height = new_install_report_dataview._data.length*32;	//报表高度
						var panel_height = height + 189 + todo_view_height;			//首页高度
						new_install_report_dataview.setHeight(height);
						Ext.getCmp('new_view_panel').setHeight(panel_height+10);
					}
				}
					
			}
		};
		var contentdata={company_code_1:company_code_1,Org_Id:Org_Id,station_id:station_id,userid:userid,
				rolename:pdarole,ebs_user_id:ebs_user_id,init_person_id:init_person_id,HQFlag:HQFlag};
		console.log(contentdata);
		var content= JSON.stringify(contentdata);
		this.asyconnectServer(getResult, 'newViewReportAction.do?method=search_report', content);
//		this.connectServer(getResult, 'newViewReportAction.do?method=search_report', content);
	},
	
	//czq 主页各功能模块的响应动作(旧)
	modules_dataview : function(obj,index,target,record,e,eOpts){
		var obj = this;
		var text = record.data.text;
		if(text=="待提交数"){
			obj.NextView('wfc_list_view','HelcPDA.view.waitingdata.WaitingForCommitData_List_V');
			var wfc_list_view = Ext.getCmp('wfc_list_view');
			wfc_list_view.loadDataJST();
		}else if(text=="工程文件"){//czq
			obj.NextView('edoc_view','HelcPDA.view.edoc.edoc_view');
		}else if(text=="待办任务"){
			obj.NextView('New_Todo_view_id','HelcPDA.view.New_Todo_view');
		}else if(text=="消息"){
			obj.NextView('New_Message_view_id','HelcPDA.view.New_Message_view');
		}else if(text=="公司通讯录"){
			obj.NextView('telephonesearch_id','HelcPDA.view.Contacts.TelephoneSearch');
			var data=[];
			data[0]={value:'0000',text:'【全部】'};
			data[1]={value:'1001',text:'日立电梯（中国）有限公司'};
			data[2]={value:'1074',text:'日立电梯（中国）有限公司广州工厂'};
			data[3]={value:'1058',text:'日立电梯（广州）自动扶梯有限公司'};
			data[4]={value:'1042',text:'广州日滨科技发展有限公司'};
			data[5]={value:'1002',text:'日立电梯（上海）有限公司'};
			data[6]={value:'1003',text:'日立楼宇设备制造（天津）有限公司'};
			data[7]={value:'1059',text:'日立电梯（成都）有限公司'};
			data[8]={value:'1041',text:'日立电梯电机(广州)有限公司'};
			data[9]={value:'1062',text:'日立数字安防系统(上海)有限公司'};
			Ext.getCmp('telephonesearch_id_company').setOptions(eval(data));
		}else if(text=="更换件"){
			obj.NextView('GHJSearch_id','HelcPDA.view.ghj.GHJSearch');
			ghjuserID=person_id===null?userid:'PDA';//(person_id为空那登陆人是siebele用户)
			//ghjuserID='PDA';
			Ext.Date.monthNames = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
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
	        
	        Ext.define("HelcPDA.overrides.picker.Picker", {
	            override: "Ext.picker.Picker",
	            config: {
	                doneButton: '确定',
	                cancelButton: '取消',
	                height:200,
	            }
	        });
			
			//开始日期默认本月一号
			var data=new Date();
			var year=data.getFullYear();
			var month=data.getMonth()+1;
			cc.log(year+'  '+month);
			var time=year+'-'+month+'-1';
			//出库开始日期
			Ext.getCmp('GHJSearch_OutBoundDate').setValue(time);
			var data2=new Date();
			data2=Ext.Date.format(data2,'Y-m-d');
			//出库结束日期
			Ext.getCmp('GHJSearch_OutBoundDate2').setValue(data2);
		}else if(text=="保障表"||text=="接梯表"){
			//obj.NextView('SafeguardFourRecordContent_ZYXM_id','HelcPDA.view.SynchronizationTable.SafeguardFourRecordContent_ZYXM');
			//return;
			SafeguardName='';
			if(text=="保障表"){
				SafeguardName='保障表';
			}else if(text=="接梯表"){
				SafeguardName='接梯表';
			};
			objectXcx.getController('HelcPDA.controller.MenusViewCtrl').SafeguardName=SafeguardName;
			objectXcx.getController('SynchronizationTable.SafeguardOneQueryListCtrl').SafeguardOneQueryListInitialization();
		}else if(text=="移动遥监"){
			//alert("hehe")
			/*
			var ss = sessionStorage;
			console.log(ss.length);
			ss.setItem('userid',userid);
			ss.setItem('company_code',company_code);
			ss.setItem('station_id',station_id);
			ss.setItem('usernames',usernames);
			ss.setItem('HQFlag',HQFlag);
			ss.setItem('roleStr',roleStr);
			console.log(ss);
//			navigator.app.loadUrl("essIndex.html",{openExternal:true});
			WL.App.openURL("essIndex.html","_blank");
			*/
			/*
			var userid=localStorage.userid;
			var company_code=localStorage.company_code;
			var station_id=localStorage.station_id;
			var usernames=localStorage.usernames;
			var HQFlag=localStorage.HQFlag;
			var roleStr=localStorage.roleStr;
			*/
			localStorage.ViewId = Ext.Viewport.getActiveItem().id;
			localStorage.ViewName = Ext.Viewport.getActiveItem().__proto__.$className;
			localStorage.userid = copy_userid;
			localStorage.company_code = company_code;
			localStorage.station_id = station_id;
			localStorage.usernames = username1;
			localStorage.HQFlag = HQFlag;
			localStorage.roleStr = roleStr;
			localStorage.page = 'main';
			localStorage.YDYJ_flag = '1';
			location.href = "essIndex.html";
			localStorage.PDAflag=PDAflag;
			localStorage.company_name=company_name;
			localStorage.phoneno=phoneno;
    		localStorage.roleid=roleid;
    		localStorage.rolename=rolename;
//			window.open("essIndex.html");
			/*
			$("table[class=msgtable]").each(function () {
		        var _this = $(this);
		        //设置偶数行和奇数行颜色
		 
		        //鼠标移动隔行变色hover用法关键
		        _this.find("tr").hover(function () {
		            $(this).attr("bColor", $(this).css("background-color")).css("background-color", "#E0E0E0").css("cursor", "pointer");
		        }, function () {
		            $(this).css("background-color", $(this).attr("bColor"));
		        });
		 
		    });
			$("table[class=jihuo_cols]").each(function () {
		        var _this = $(this);
		        //设置偶数行和奇数行颜色
		 
		        //鼠标移动隔行变色hover用法关键
		        _this.find("tr").hover(function () {
		            $(this).attr("bColor", $(this).css("background-color")).css("background-color", "#E0E0E0").css("cursor", "pointer");
		        }, function () {
		            $(this).css("background-color", $(this).attr("bColor"));
		        });
		    });
			$("#txtUserid").val(userid);
			$("#txtPassword").val("");
			roleStr='yjyw,realtime,activetest,gzgl,faulttransmitters';
			login();
			*/
		}else if(text=="OA起草"){
			obj.getApplication().getController('oa.OAProcessCtrl').CheckOaAcCount();
		}else if(text=="品证整改"){
			obj.NextView('Renovate_Project_HeaderList_id','HelcPDA.view.ProductCertificate.Renovate_Project_HeaderList');
			var store=obj.getStore('RP_HeadStore','HelcPDA.store.ProductCertificate.RP_HeadStore');
			store.setData([]);   
		       var query={tcode:"ProductCertificate_data",tid:"ProductCertificate_list"};
		       var options={
		    		   exact:true
		       };       
		       WL.JSONStore.get(collectionName).find(query,options).then(function(res){
		    	   if(res==''||res==null||typeof(res)=='undefined'||res.length==0){
		    		   WL.Toast.show('找不到本地数据!请同步数据!');
		    	   }else{
		    		   store.setData(res[0].json.stext);
		    		   WL.Toast.show('如需更新数据，请同步数据！');
		    	   }
		       }).fail(function(){
		    	   WL.Toast.show('没有数据!');
		       }); 
		}else if(text=="保养计划"){
			///////////////////////////////////////////////
			//清空数据仓
			//为数据仓添加数据
			var MaintList=Ext.data.StoreManager.get('MaintainPlanList');
			if (!MaintList) { 
				MaintList = Ext.create("HelcPDA.store.maintain.MaintainPlanList"); 
			};
			MaintList.setData([]);
			
			//获取当前时间按
	    	var myDate = new Date();
	    	
			//给予条件正确的判断
			var newmonth=myDate.getMonth()+1;
			var newday=myDate.getDate();
			if(newmonth<10){
				newmonth='0'+newmonth; 
			};
			if(newday<10){
				newday='0'+newday;
			};
			
			//页面显示
			var data=myDate.getFullYear()+"年"+newmonth+"月"+newday+"日";
			
			//服务器查询用时间
			var data3=myDate.getFullYear()+"-"+newmonth+"-"+newday;
			console.log('服务器判断用的正确格式时间:'+data3);
			
			/*//不变的当天时间 xcx  2014-5-16
			bbtime=data3;*/
			
			obj.NextView("Maintainlist","HelcPDA.view.maintain.MaintenancePlanPanel");
			
			//保养页面 时间显示按钮
			Ext.getCmp('MPPDateButton').setText(data);
			
			//给隐藏控件赋予全职变量
			Ext.getCmp('MppmYear').setValue(myDate.getFullYear());
			Ext.getCmp('MppnMonth').setValue(newmonth);
			
			//给隐藏控件赋予日历下标变量
			Ext.getCmp('MainRL_XuanZhongXB').setValue(0);
			
			//调用全局方法
			ceshiyongchaxu(obj,data3);

			///////////////////////////////////////////////
		}else if(text=="急修处理"){
			obj.NextView('faultHLP','HelcPDA.view.fault.FaultHandlingPanel');
			faultHandingPC_NEW(obj);
		}else if(text=="安装项目"){
			obj.NextView('installProject_id','HelcPDA.view.install.installProject');
			obj.getSendingbutnoentry();
			//进入安装项目模块，根据权限显示模块
			var install_project_list_data  = [];//安装项目子模块列表
    		//安装任务
    		if(roleStr.indexOf('anzhuangrenwu')>=0){
    			install_project_list_data.push(
    					{
                              title: '安装任务',
                              color: '#62bb47',
                              number: '1',
                              icon: 'l'
                        }
    			);
        	}
    		if(roleStr.indexOf('querenpaichan')>=0){
    			install_project_list_data.push(
    					{
    						  title: '确认排产',
                              color: '#fbb726',
                              number: '1',
                              icon: '3'
    					}
    			);
    		}
    		if(roleStr.indexOf('xiangtoufahuo')>=0){
    			install_project_list_data.push(
    					{
	                        title: '箱头发货',
	                        color: '#f6821f',
	                        number: '3',
	                        icon: 'X'
    					}
    			);
    		}
    		if(roleStr.indexOf('anzhuangjihua')>=0){
    			install_project_list_data.push(
    					{
    						title: '安装计划',
                            color: '#e03a3e',
                            number: '1',
                            icon: '\\'
    					}
    			);
    		}
    		if(roleStr.indexOf('anzhuangguocheng')>=0){
    			var AZGC = 0;
    			for(var i =0;i<install_project_list_data.length;i++){
    				if(install_project_list_data[i].title =="安装过程"){
    					AZGC++;
    				}
    			}
    			if(AZGC ==0){
    				install_project_list_data.push(
        					{
        						 title: '安装过程',
                                 color: '#953c96',
                               	 number: '2',
                               	 icon: '7'
        					}
        			);
    			}
    		}
    		//所有人都有的权限
			install_project_list_data.push(
			{
                  title: 'ITM',
                  color: '#009ddc',
                  number: '3',
                  icon: '7'
              },
              {
                  title: '已发货未进场',
                  color: '#62bb47',
                  number: '1',
                  icon: 'x'
              }
			);
			if(roleStr.indexOf('tiaoshirenwu')>=0){
    			install_project_list_data.push(
    					{
    						title: '调试任务',
    						color: '#fbb726',
                          	number: '2',
                          	icon: 'W'
    					}
    			);
    		}
    		if(roleStr.indexOf('baojianrenwu')>=0){
    			install_project_list_data.push(
    					{
    						title: '报检任务',
    						color: '#e03a3e',
                          	number: '2',
                          	icon: 'W'
    					}
    			);
    		}
    		if(roleStr.indexOf('changjianrenwu')>=0){
    			install_project_list_data.push(
    					{
    						title: '厂检任务',
    						color: '#e03a3e',
                          	number: '2',
                          	icon: 'W'
    					}
    			);
    		}
    		if(roleStr.indexOf('zhengfujianrenwu')>=0){
    			install_project_list_data.push(
    					{
    						title: '政府检任务',
    						color: '#009ddc',
                          	number: '2',
                          	icon: 'W'
    					}
    			);
    		}
    		if(roleStr.indexOf('wangongjiyijiao')>=0){
    			install_project_list_data.push(
    					{
    						title: '移交任务',
    						color: '#62bb47',
                          	number: '2',
                          	icon: '^'
    					}
    			);
    		}
    		if(roleStr.indexOf('tsdabl')>=0){
    			install_project_list_data.push(
    					{
    						title: '调试菜单纸补录',
    						color: '#fbb726',
                          	number: '2',
                          	icon: 'p'
    					}
    			);
    		}
    		if(roleStr.indexOf('cjcdbl')>=0){
    			install_project_list_data.push(
    					{
    						title: '厂检菜单纸补录',
                          	color: '#f6821f',
                          	number: '2',
                          	icon: 'p'
    					}
    			);
    		}	
    		install_project_list_data.push(
					{
						title: '安装数据查询',
                      	color: '#953c96',
                      	number: '2',
                      	icon: 's'
					}
			);
    		//修改人:xkc 修改日期:2017-03-17
    		install_project_list_data.push(
					{
						title: 'ERP查询',
                      	color: '#953c96',
                      	number: '2',
                      	icon: 's'
					}
			);
        	
        	Ext.getCmp('install_project_list').setData(install_project_list_data);
		
		}else if(text=="安装查询"){
			obj.NextView('installAllSerach','HelcPDA.view.install.installSearch.InstallAllSerach');
		    Ext.getCmp('Choice_Search').addListener('change',function(obk,newValue,oldValue,eOpts){
		    	var ebs_user=Ext.getCmp('ebs_user');
		    	var fac_user=Ext.getCmp('fac_user');
		    	var int_user=Ext.getCmp('int_user');
		    	var box_number=Ext.getCmp('box_number');
		    	if(newValue=='安装数据查询'){
		    		ebs_user.setHidden(false);
		    		fac_user.setHidden(false);
		    		box_number.setHidden(true);
		    		ebs_user.setValue('');
		    		fac_user.setValue('');
		    		int_user.setValue('');
		    		box_number.setValue('');
		    	}else if(newValue=='排产数据查询'){
		    		ebs_user.setHidden(true);
		    		fac_user.setHidden(true);
		    		box_number.setHidden(true);
		    		ebs_user.setValue('');
		    		fac_user.setValue('');
		    		int_user.setValue('');
		    		box_number.setValue('');
		    	}else if(newValue=='箱头数据查询'){
		    		box_number.setHidden(false);
		    		ebs_user.setHidden(true);
		    		fac_user.setHidden(true);
		    		ebs_user.setValue('');
		    		fac_user.setValue('');
		    		int_user.setValue('');
		    	}
		    });
		}else if(text=="专项保障"){
			obj.NextView('MmintainSpecialList_V_id','HelcPDA.view.maintainSpecial.MmintainSpecialList_V');
		}else if(text=="故障引导"){
			obj.NextView('FaultDirectionID','HelcPDA.view.install.FaultDirection');
		}else if(text=="客户信息"){
			obj.NextView('customer-vid','HelcPDA.view.customer.customer-v');
		}else if(text=="合同信息"){
			obj.NextView("Compactlist","HelcPDA.view.compact.CompactSearchPanel");
		}else if(text == "手机号码信息"){
			obj.NextView("cellphoneList","HelcPDA.view.cellphoneinfo.InputCellphoneNumber");
		}else if(text=="电梯信息"){
			
		}else if(text=="技术附页"){
			obj.NextView('techParams_Search_V','HelcPDA.view.techParams.TechParams_Search_V');
			Ext.getCmp('formpanel_FT').setHidden(true);
			Ext.getCmp('formpanel_ZT').setHidden(true);
		}else if(text=="位置信息"){
			// 位置信息点击
				obj.NextView('whitePage','HelcPDA.view.androidMap.WhitePage');
				cordova.exec(function(res) {
					//alert("cc:" + res[0].LocationFlag);
						jsData=res;
						if("正常返回"==res[0].LocationFlag){
							obj.BackView();
					}else if("周围的人"==res[0].LocationFlag){
						obj.BackView();
						obj.NextView('nearView','HelcPDA.view.androidMap.NearView');
					}else if("我的信息"==res[0].LocationFlag){
						obj.BackView();
						obj.NextView('selfMyView','HelcPDA.view.androidMap.MyView');
					}else if("返回主页"==res[0].LocationFlag){
						obj.BackView();
					}else if("工号打卡"==res[0].LocationFlag){
						obj.BackView();
						obj.NextView('sendCard','HelcPDA.view.androidMap.SendCard');
					    var MaintenaceSendCardStore=obj.getStore('MaintenaceSendCardStore','HelcPDA.store.maintain.MaintenaceSendCardStore');
					    MaintenaceSendCardStore.setData([]); 
					}else if("电梯打卡"==res[0].LocationFlag){
						obj.BackView();
						obj.NextView('maintenaceSendCardPanel','HelcPDA.view.maintain.MaintenaceSendCardPanel');
					    var debugReturnList=Ext.getCmp('debugReturnList');
					    debugReturnList.setText("地图");
					}
					else{
					}
					}, function(err) {
						WL.Toast.show("错误:"+err);
					},"JSMapMain","进入地图",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase()}]);  

		}else if(text=="统计报表"){
			obj.NextView('reportview_homepage','HelcPDA.view.report.ReportView');
			//进入统计报表模块，根据权限显示模块
			var report_list_data  = [];//安装项目子模块列表
    		//故障过程处理报表
    		if(roleStr.indexOf('report_rxsx')>=0){
    			report_list_data.push(
    					{
    	                       title: '故障过程处理报表',
    	                       color: '#62bb47',
    	                       number: '1',
    	                       icon: 'Z'
    	                 }
    			);
        	}
    		//保养计划报表
    		if(roleStr.indexOf('report_byjh')>=0){
    			report_list_data.push(
    					{
    						  title: '保养计划报表',
                              color: '#fbb726',
                              number: '1',
                              icon: 'Z'
    					}
    			);
    		}
    		//故障报告书报表
    		if(roleStr.indexOf('report_gzbgs')>=0){
    			report_list_data.push(
    					{
    						  title: '故障报告书报表',
                              color: '#f6821f',
                              number: '3',
                              icon: 'Z'
    					}
    			);
    		}
    		//安装台量报表
    		if(roleStr.indexOf('report_install')>=0){
    			report_list_data.push(
    					{
    						  title: '安装台量报表',
                              color: '#e03a3e',
                              number: '1',
                              icon: 'Z'
    					}
    			);
    		}
    		//安装周期报表
    		if(roleStr.indexOf('report_azzq')>=0){
    			report_list_data.push(
    					{
    						  title: '安装周期报表',
                              color: '#963d97',
                              number: '2',
                              icon: 'Z'
    					}
    			);
    		}
    		//安装录入情况报表
    		if(roleStr.indexOf('report_azbsrecord')>=0){
    			report_list_data.push(
    					{
    						  title: '安装录入情况报表',
                              color: '#009ddc',
                              number: '3',
                              icon: 'Z'
    					}
    			);
    		}
    		//安装完工情况报表
    		if(roleStr.indexOf('report_instcompleted')>=0){
    			report_list_data.push(
    					{
    						  title: '安装完工情况报表',
                              color: '#62bb47',
                              number: '1',
                              icon: 'Z'
    					}
    			);
    		}
    		//维保业绩
    		if(roleStr.indexOf('report_maintainAhm')>=0){
    			report_list_data.push(
    					{
    						  title: '维保业绩',
                              color: '#fbb726',
                              number: '2',
                              icon: 'Z'
    					}
    			);
    		}
    		//zhj
    		   report_list_data.push(
    					{
    						  title: 'PDA登录报表',
                              color: '#fbb726',
                              number: '2',
                              icon: 'Z'
    					}
    			);
    		
    		
    		Ext.getCmp('report_list').setData(report_list_data);
		}else if(text=="GHP应用"){
			obj.NextView('GHPDownLoadView_id','HelcPDA.view.GHPDownLoadView');
		}else if(text=="配件信息"){
			obj.NextView('com_part_Project_id','HelcPDA.view.fitting.com_part_Project');
			var install_project_list_data  = [];//安装项目子模块列表
			install_project_list_data.push(
					{
                          title: '常用配件',
                          color: '#62bb47',
                          number: '1',
                          icon: 'l'
                    }
			);
			install_project_list_data.push(
					{
						title: '物流运单',
                        //id:'transport_s',
                        color: '#fbb726',
                        number: '2',
                        icon: 's'
					}
			);
			Ext.getCmp('com_part_Project_list').setData(install_project_list_data);

		}////////////////////////////////////////// 保养抽查 zhj
		else if(text=="保养抽查"){
			obj.NextView('CC_Select_id','HelcPDA.view.selective_examination.CC_Select');
			//隐藏 “整改内容”
			var bycccxTabPanel = Ext.getCmp("CC_Select_id_tabpanel");
			bycccxTabPanel.removeAt(3);
			//抽查单状态
			Ext.getCmp('CC_SEL_STATUS').setValue('待提交');
			//清空抽查选项
			var datads_CC=Ext.data.StoreManager.get('HEL_RUMMAG_LINES_Store');
			if(!datads_CC){
				datads_CC=Ext.create('HelcPDA.store.selective_examination.HEL_RUMMAG_LINES_Store');
			};
			datads_CC.setData([]);	
			//隐藏抽查单头ID
			Ext.getCmp('CC_SEL_HEADER_ID').setHidden(true);
			//隐藏抽查日期
			Ext.getCmp('CC_SEL_RUMMAGER_DATE').setHidden(true);
			//隐藏提交时间
			Ext.getCmp('CC_SEL_SUBMIT_DATE').setHidden(true);
			//隐藏数据来源
			Ext.getCmp('CC_SEL_DATA_SOURCE').setHidden(true);
			//隐藏导入状态
			Ext.getCmp('CC_SEL_IMPORT_STATUS').setHidden(true);
			//隐藏记录创建时间
			Ext.getCmp('CC_SEL_CREATION_DATE').setHidden(true);
			//隐藏最后更新时间
			Ext.getCmp('CC_SEL_LAST_UPDATE_DATE').setHidden(true);
		}
		else if(text=="抽查整改"){
			obj.NextView('CC_Query_id','HelcPDA.view.selective_examination.CC_Query');
			
			function station_JRDT(json){
				//把单头数据放入数据仓中
				var datads=Ext.data.StoreManager.get('HEL_RUMMAG_HEADER_Store');
				if(!datads){
					datads=Ext.create('HelcPDA.store.selective_examination.HEL_RUMMAG_HEADER_Store');
				};
				datads.setData(json.DT);
				//console.log('DH的数据：   '+JSON.stringify(json.DH));
				//把查找到的数据放入JSONStores
				var MaintainList=WL.JSONStore.get(collectionName);
				var Maintxml={tcode:'DTDH',stext:json};
				var deletemainfields={tcode:'DTDH'};
				var options={exacte:true};//默认是false
				//先删后加
				MaintainList.remove(deletemainfields,options).then(function(){
					console.log('删除数据成功');
					MaintainList.add(Maintxml).then(function(){
						console.log('成功保存数据');
					}).fail(function(errorObject){
						WL.Toast.show('没有获取数据');	
			   		});
				}).fail(function(errorObject){
					WL.Toast.show('没有获取数据');	
		   		});
			};
			obj.connectServer(station_JRDT,"baoYangChouChaAction.do?method=toSearchZGDTandZGDH");
		
		}else if(text=="年检信息"){
			//
			obj.NextView('inspection','HelcPDA.view.inspection.inspection');
			obj.getController("HelcPDA.controller.inspection.inspectioncon").inspection_init(obj);

		}else if(text=="安全考核"){
			obj.NextView('kytestlist','HelcPDA.view.kytest.kytestlist');
			var date=new Date();
    		var nn=date.getFullYear();
    		var ny=date.getMonth()+1;
    		var flag="f";
			obj.getController("HelcPDA.controller.kytest.kytestcon").listinit(userid,nn,ny,flag,obj);
			
		}else if(text=="解锁"){
			MainCtr.NextView('UnLockMain','HelcPDA.view.UnLock.UnLockMain');
		}
		////////////////////////////////////////
		else if(text=="更多"){

			obj.NextView('New_More_view_id','HelcPDA.view.New_More_view');
			obj.CallLog();
			//更多页签
			//关于PDA
			var LI=document.getElementById('about');
			LI.onclick = function (){
				obj.NextView('About_id','HelcPDA.view.more.About');
				Ext.getCmp('text_RJKF').setValue('广州市华越友联科技发展有限公司');
			};
//			//设置
//			var LI=document.getElementById('set');
//			LI.onclick = function (){
//				alert('设置');
//			};
			//修改密码
			var LI=document.getElementById('Cpassword');
			LI.onclick = function (){
				obj.NextView('UpdatePassword_id','HelcPDA.view.more.UpdatePassword');
				Ext.getCmp('up_username').setValue(usernames);
			};
			//帮助
			var LI=document.getElementById('help');
			LI.onclick = function (){
				obj.NextView('help_vid','HelcPDA.view.more.Help');
				Ext.getCmp('help_send_button').setDisabled(true);
				//显示聊天记录
				var query={tcode:userid+"help",tid:"help"};
				WL.JSONStore.get(collectionName).find(query).then(function(res){
					if(res.length == 0){
						//如果是第一次进帮助，或者是退出后再次进去(退出会消除聊天记录)，会有一句欢迎语
						contentdata={CONTENT_KEY:'welcome'};
						var content= JSON.stringify(contentdata);
						var getResult=function(res){
							var chatYou = res.item[0].CONTENT;
							var newmsg="<div class='chatItem you'>     <div class='chatItemContent'> <img class='avatar' src='images/you_head_portrait.jpg'>       <div class='cloud cloudText'>         <div class='cloudPannel' style=''>           <div class='sendStatus'> </div>           <div class='cloudBody'>             <div class='cloudContent'>               <pre style='white-space:pre-wrap'><div onclick='HelpDanji(this);'>"+chatYou+"</div></pre>             </div>           </div>           <div class='cloudArrow '></div>         </div>       </div>     </div>   </div>";				
							document.getElementById("chatcontainer").innerHTML += newmsg ;
						};
						obj.asyconnectServer(getResult, 'helpAction.do?method=toSearchWelcome', content);
					}else{
						document.getElementById("chatcontainer").innerHTML = res[0].json.stext;
					}
				});
				setTimeout(obj.hold, 500);
				Ext.getCmp('chat_container').getScrollable().getScroller().scrollToEnd();
				//监听输入框
				var helpchattext=Ext.getCmp('help_chat_text');
					helpchattext.addListener('change',obj.helpchattext1,this,{
			    });
					
			};
			// 关于本机
//			var aboutDev=document.getElementById('aboutDev');
//			aboutDev.onclick = function () {
//				obj.NextView('AboutDevices_id','HelcPDA.view.more.AboutDevices');
//				Ext.getCmp('tf_deviceNo').setValue(document.getElementById('showDeviceNo').innerHTML);
//				Ext.getCmp('tf_imei').setValue(document.getElementById('showImei').innerHTML);
//				Ext.getCmp('tf_imsi').setValue(document.getElementById('showImsi').innerHTML);
//			};
		}
	},
	// 2015-07-03
	// 获取“最后一箱发货日期”即（出仓日期）,大于此日期15天的工号台量
	getSendingbutnoentry : function() {
		/*
		var nowDate = new Date();
		var y = nowDate.getFullYear();
		var m = nowDate.getMonth() + 1;// 获取当前月份的日期
		var d = nowDate.getDate();
		var nowDateStr = y + "-" + m + "-" + d;
		*/

		var query2 = {
			tcode : "Sending_No_Entry_Data"
		};
		var options2 = {
			exact : true,
		};

		WL.JSONStore
				.get(collectionName)
				.find(query2, options2)
				.then(
						function(res) {
							var list = res;

							var ENGCONTRACT_NUMBER_LIST = [];
							for (var i = 0; i < list.length; i++) {
								if (list[i].json.stext.ENGCONTRACT_NUMBER != undefined) {
									ENGCONTRACT_NUMBER_LIST[i] = list[i].json.stext.ENGCONTRACT_NUMBER;
								}
							}
							var UNIQ_ENGCONTRACT_NUMBER_LIST = ENGCONTRACT_NUMBER_LIST
									.unique3();
							var UNIQ_CUSTOMER_NAME = [];

							var ENGCONTRACT_NUMBER_Record_Length = [];
							var ENGCONTRACT_NUMBER_UnRecord_Length = [];
							var UnRecord_Length = 0;
							for (var i = 0; i < UNIQ_ENGCONTRACT_NUMBER_LIST.length; i++) {
								ENGCONTRACT_NUMBER_UnRecord_Length[i] = 0;
								ENGCONTRACT_NUMBER_Record_Length[i] = 0;
								for (var j = 0; j < list.length; j++) {
									if (UNIQ_ENGCONTRACT_NUMBER_LIST[i] == list[j].json.stext.ENGCONTRACT_NUMBER) {
										UNIQ_CUSTOMER_NAME[i] = list[j].json.stext.CUSTOMER_NAME;
										if (!list[j].json.stext.RECORDED) {
											ENGCONTRACT_NUMBER_UnRecord_Length[i]++;
											UnRecord_Length++;
										} else {
											ENGCONTRACT_NUMBER_Record_Length[i]++;
										}
									}
								}
							}
							
							if(UnRecord_Length!=0){
								var msg = "存在已发货未进场工号" + UnRecord_Length + "台，请先填报异常原因。";
								//console.log(msg);
								Ext.Msg.alert('提示',msg);
							}
						});
	},
	new_Todo_dataview : function(obj,index,target,record,e,eOpts){
		var obj = this;
		var text = record.data.text;
		//安装人员
		if(text=="安装计划"){
			intallplanDBXMnum=1;
			obj.NextView('installplan_id','HelcPDA.view.install.installplan.installPlan');
			
			//判断是从待办进还是安装项目进  1  2
			Ext.getCmp('intallplanDBXMnum').setValue(intallplanDBXMnum);
			
			//先未进场 在到在制
			installplan_AZJH_DB_HHFF(obj,'installplanfalse',false);
		}else if(text=="安装排产"){//xcx  2014-7-31
			//跳回排产查询页面
			obj.NextView("InstallProduce_List_VID","HelcPDA.view.install.installtoproduce.InstallProduce_List_V");
			
			//删除JSON中的数据
			var tcodeId='ConfirmedScheduling';
			var query={tcode:tcodeId};
			var options={};
			var coll=WL.JSONStore.get(collectionName);
			coll.remove(query).then(function(){
				//获取远程数据
				getResult=function(res){
					console.log(JSON.stringify(res));
					var resID=res.item.length;
					if(resID==0){
						return;
					};
					//装载排产集合
					var list=[];
					for(var i=0;i<resID;i++){
						list[i]=res.item[i];
						console.log(i+'      '+JSON.stringify(list[i]));
					};
					//装载合同号的集合
					var ENGCONTRACT_NUMBER_LIST=[];
					//装载地址的集合
					var CUSTOMER_NAME_LIST=[];
					//获取
					for(var i=0;i<list.length;i++){
						  ENGCONTRACT_NUMBER_LIST[i]=list[i].CONTRACT_NO;
						  CUSTOMER_NAME_LIST[i]=list[i].CUSTOMER_NAME;
					 };
					 //获取集合中格的唯一数
					 var UNIQ_ENGCONTRACT_NUMBER_LIST=ENGCONTRACT_NUMBER_LIST.unique3();
					 console.log(JSON.stringify('合同号    '+UNIQ_ENGCONTRACT_NUMBER_LIST));
					 var UNIQ_CUSTOMER_NAME=CUSTOMER_NAME_LIST.unique3();
					 console.log(JSON.stringify('地址  '+UNIQ_CUSTOMER_NAME));
					 //计算相同的合同号数量
					 var NUM=[];
					 for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
						  NUM[i]=0;
						  for(var j=0;j<list.length;j++){
							  if(UNIQ_ENGCONTRACT_NUMBER_LIST[i]==list[j].CONTRACT_NO){
								  NUM[i]++;
							  };
						   };
					  };
					  //为数据仓添加显示数据
					  var NEW_NEED_LIST=[];
					  for(var i=0;i<UNIQ_ENGCONTRACT_NUMBER_LIST.length;i++){
						  var CNTER_NEED={};
						  CNTER_NEED.CONTRACT_NO=UNIQ_ENGCONTRACT_NUMBER_LIST[i];
						  CNTER_NEED.CUSTOMER_NAME=UNIQ_CUSTOMER_NAME[i];
						  CNTER_NEED.NUM=NUM[i];
						  NEW_NEED_LIST[i]=CNTER_NEED;
					  };
					  store=Ext.data.StoreManager.get("installtaskStore2");
					  if(!store){
						store=Ext.create("HelcPDA.store.install.installtask.installtaskStore2");
					  };
					  store.setData([],this);
					  store.setData(NEW_NEED_LIST,this);
					  //在JSON中添加数据
					  var ndata=[];
					  for(var i=0;i<list.length;i++){
						 list[i].QRPC_STATUS = '未提交';
						 var query={tid:list[i].CONTRACT_NO+'_'+list[i].ELEVATOR_NO,tcode:tcodeId,stext:list[i]};
					     ndata[i]=query;
					  };
					  coll.add(ndata).then(function(){
						 // Ext.Msg.alert("添加成功");
					  }).fail(function(err){
						  WL.Toast.show("缓存失败！");
						  //Ext.Msg.alert("缓存失败");
					  });
				};
				var content="{'CONTRACT_NO':'"+''+"','ELEVATOR_NO':'"+''+"','userid':'"+userid+"','init_person_id':'"+init_person_id+"','ebs_user_id':'"+ebs_user_id+"','person_id':'"+person_id+"','person_id':'"+person_id+"','username':'"+username+"'}";
				
				console.log(JSON.stringify(content));
				obj.connectServer(getResult,'installQRPCAction.do?method=toSearch',content);
				
			 }).fail(function(err){
				 WL.Toast.show("初始化删除失败！");
				 //Ext.Msg.alert("初始化删除失败");
			 });	
			
		}else if(text=="箱头发货"){
			obj.NextView('instsb_list_view','HelcPDA.view.install.installsendbox.InstallSendBox_List_V');
    		var obj_v = Ext.getCmp('instsb_list_view');
			obj_v.loadDataJST();
//			Ext.getCmp('hfmenu_daiban_flag').setValue('1');
		}else if(text=="报检任务"){
			obj.NextView('installationTasksReportCheckPanel','HelcPDA.view.install.installtoreportcheck.InstallationTasksReportCheckPanel');
			//查看缓存
			Ext.getCmp('toView').setValue(1);
		       var WL_check=WL.JSONStore.get(collectionName);
		       var query={tcode:'_check_list'+ebs_user_id,tid:'check_task'};
		       var options={
		    		   exact:true
		       };       
		       WL_check.find(query,options).then(function(res){
		    	   var store=obj.getStore("InstallatoinTasksReportCheckStore","HelcPDA.store.install.installtoreportcheck.InstallatoinTasksReportCheckStore");
		    	   if(res==''||res==null||typeof(res)=='undefined'){
		    	   }else{
		    		   store.setData(res[0].json.stext);
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
		    	   }
		    	   
		       }).fail(function(){
		    	   WL.Toast.show('查找缓存数据失败');
		       });
		}else if(text=="安装跟进"){
			
		}else if(text=="移交完工"){
			
		}else if(text=="退调"){
			
		}else if(text=="退检"){
			
		}else if(text=="已发货未进场"){
			obj.NextView('sending_no_entry_list_ID','HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_List_View');
			var store=obj.getStore("Sending_No_Entry_List_Store","HelcPDA.store.install.sendingbutnoentry.Sending_No_Entry_List_Store");
			store.setData('');
		       var query={tcode:"Sending_No_Entry_Data",tid:"Sending_No_Entry_list"};
		       var options={
		    		   exact:true
		       };
		       //alert(collectionName);
		       WL.JSONStore.get(collectionName).find(query,options).then(function(res){
		    	   if(res==''||res==null||typeof(res)=='undefined'||res.length==0){
		    		   WL.Toast.show('找不到本地数据!请同步数据!');
		    	   }else{
		    		   store.setData(res[0].json.stext);
		    		   WL.Toast.show('如需更新数据，请点击更新数据按钮在服务器获取！');
		    	   }
		       }).fail(function(){
		    	   WL.Toast.show('没有数据!');
		       }); 
		}else if(text=="调试菜单纸补录"){
			obj.NextView('installationTasksShakedownAddListPanel','HelcPDA.view.install.installblu.InstallationTasksShakedownAddListPanel');
			Ext.getCmp('toView1').setValue(1);
			var store=obj.getStore('InstallationTasksShakedownAddListStore','HelcPDA.store.install.installblu.InstallationTasksShakedownAddListStore');
			function getResult(res){
				if(res.count==0){
					WL.Toast.show('没有查到符合的数据');
				}
				store.setData(res.rows);
			}
			var content="{'userid':'"+ebs_user_id+"'}";
			obj.connectServer(getResult, 'menuAction.do?method=toSearch', content);
			
		}else if(text=="厂检菜单纸补录"){
			obj.NextView('installatoinTasksFactoryAddListPanel','HelcPDA.view.install.installblu.InstallatoinTasksFactoryAddListPanel');
			var store=obj.getStore('InstallatoinTasksFactoryAddListStore','HelcPDA.store.install.installblu.InstallatoinTasksFactoryAddListStore');
			function getResult(res){
				console.log(JSON.stringify(res));
				if(res.count==0){
					Ext.Msg.alert('没有查到符合的数据');
				}
				store.setData(res.rows);
			}
			var content="{'userid':'"+ebs_user_id+"'}";
			obj.connectServer(getResult, 'menuAction.do?method=cjSearch', content);
		}else if(text=="故障处理"){
			obj.NextView('faultHLP','HelcPDA.view.fault.FaultHandlingPanel');
			faultHandingPC_NEW(obj);
		}else if(text=="保养计划"){
			obj.NextView('MaintainPlanBackLogList','HelcPDA.view.MaintainPlanBackLogView');
			//czq
//			var getResult=function(res){
//				var MaintailPlanBackLogStore = obj.getStore('MaintailPlanBackLogStore','HelcPDA.store.login.MaintailPlanBackLogStore');
//				MaintailPlanBackLogStore.setData(res.items);
//			};
//			obj.connectServer(getResult, 'loginAction.do?method=getMaintainCount',JSON.stringify({person_id:person_id}));
		}else if(text=="安装数据查询"){
			obj.NextView('installAllSerach','install.installSearch.InstallAllSerach');
		}else if(text=="消息"){
			obj.NextView('New_Message_view_id','HelcPDA.view.New_Message_view');
		}
		
	},
	
	//监听帮助输入框
	helpchattext1 : function(){
		var helpChatText = Ext.getCmp('help_chat_text').getValue();
		if(helpChatText == ""){
			Ext.getCmp('help_send_button').setDisabled(true);
		}else{
			Ext.getCmp('help_send_button').setDisabled(false);
		}
	},
});
function news_show(i){
	console.log("he:"+i);
	var unid=Ext.getCmp("news_unid"+i).getValue();
	console.log("he:"+unid);
	var getResult=function(res){
	 NextView('newsCon_id','HelcPDA.view.newsCon');
	 var returnData;
	 if(res.GETGSGGDOCReturn.CDATA){
		 returnData = eval("("+ res.GETGSGGDOCReturn.CDATA +")");
	 }else{
		 returnData = eval("("+ res.GETGSGGDOCReturn +")");
	 }
	 Ext.getCmp('news_subject').setHtml(returnData.data.subject);
	 Ext.getCmp('news_doc').setHtml(returnData.data.body);
	};
	
	var params = {};
	params.method = 'GetGSGGDoc';
	params.parameters = [unid];
	connectServer_OA(getResult,params);
	
}

/**
 * 访问网络-OA
 */
function connectServer_OA(fn, params) {

	console.log(params);
	
	var invocationData = {  
			adapter : 'HttpAdapter_OA',  
			procedure :params.method ,
			parameters : params.parameters
	};
	try {
		WL.Client.invokeProcedure(invocationData, {
			timeout:60000,
			onSuccess : function (result) {
				
				var httpStatusCode = result.status;
				if (200 == httpStatusCode) {
					var invocationResult = result.invocationResult;
					var isSuccessful = invocationResult.isSuccessful;
					if (true == isSuccessful) {
						fn(invocationResult);
						console.log(invocationResult);
					} else {
						fn(null);
						WL.Toast.show('1服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				} else {
					fn(null);
					WL.Toast.show('2服务器繁忙('+httpStatusCode+')，请稍后重试！');
				}
			},  
			onFailure : function () {
				fn(null);
			
				WL.Toast.show('3服务器繁忙，请稍后重试！');
			}
		});
	} catch (e) {
		
		console.log('连接服务器出错');
	}
}
function NextView(viewId,FullName){
    var ViewId = Ext.Viewport.getActiveItem().id;
	var ViewName = Ext.Viewport.getActiveItem().__proto__.$className;
	ViewArray.push({ViewId:ViewId,ViewName:ViewName});
//	this.DestroyPublicId();
	var viewName=Ext.getCmp(viewId);
	   if(viewName){
		   viewName.destroy();
	   }
    Ext.Viewport.setActiveItem(Ext.create(FullName));
}
