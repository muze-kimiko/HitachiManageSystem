
/* JavaScript content from app/controller/New_Home2016Ctrl.js in folder common */
Ext.define('HelcPDA.controller.New_Home2016Ctrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'New_Home2016Ctrl',
	config : {
		control : {
			"button#btn_message":{
				tap : "Onbtn_messageTap",
			},
			"dataview#dv_special":{
				itemtap : "Ondv_specialTap",
			},
			"list#L_achievement":{
				itemtap : "OnL_achievementTap",
			},
			"list#L_about":{
				itemtap : "OnL_aboutTap",
			},
			"button#btn_Exit":{
				tap : "Onbtn_ExitTap",
			},
			"button#id_ok":{
				tap : "Onid_okTap",
			},
			"list#L_FaultHandlingReport2016":{
				itemtap : "OnL_FaultHandlingReport2016Tap",
			},
			"container#New_Home2016":{
				initialize: 'OnNew_Home2016Initialize'
			}
		},
	},
	
	OnNew_Home2016Initialize : function(component,eOpts){
        Ext.getCmp('L_FaultHandling2016').setPlugins(
            [
                {
                    xclass: 'plugin.SlideActions',
                    openPosition: 150,
                    buttons:[
                         {
                            xtype: 'button',
                            baseCls: 'x-button helcpda-list-button helcpda-bgColor-blue',
                            text: '进度',
                            listeners: {
                                tap: function(button, e){
                                    e.stopPropagation();
                                    return false;
                                },
                                scope: this
                            },
                            handler: function(button, e) {
                                Ext.getCmp('L_FaultHandling2016').fireEvent('hide');
                                console.log(button.getRecord());
                              //是否困人
                        		var KUNREN=button.getRecord().data.BOX_UP;
                        		
                        		MainCtr.NextView('faultdandlingFP_id','HelcPDA.view.fault.FaultHandlingFeedbackPanel');
                        		Ext.getCmp('D_START_TIME').setValue(button.getRecord().data.START_TIME);

                        		//获得处理情况状态
                        		var stauts=button.getRecord().data.STATUS;
                        	
                        		//活动ID
                        		var act=button.getRecord().data.ACTIVITY_ID;
                        		
                            	function jieguo(result){
                            		console.log('查询结果  '+JSON.stringify(result));
                            		var data=result.rows[0];
                            		
                            		//判断
                            		if(stauts=='待处理'){
                            			if(data.START_TIME!=''){
                            				Ext.getCmp('faultdandlingFP_id_time_id').setValue(data.START_TIME);
                            				Ext.getCmp('faultdandlingFP_id_time_id').setDisabled(true);
                            				Ext.getCmp('sbButton_id').setText('到场');
                            				Ext.getCmp('STATUS_START_TIME').setValue(data.STATUS_START_TIME);
                            			}else if(data.START_TIME==''){
                                			Ext.getCmp('faultdandlingFP_id_time_id').setDisabled(false);
                                			Ext.getCmp('time_id2').setDisabled(true);
                                			Ext.getCmp('time_id3').setDisabled(true);
                                			Ext.getCmp('time_id4').setDisabled(true);
                                			//return;
                            			};
                            		}else if(stauts=='到场'){
                            			Ext.getCmp('faultdandlingFP_id_time_id').setValue(data.START_TIME);
                            			Ext.getCmp('time_id2').setValue(data.ARRIVE_TIME);
                            			Ext.getCmp('STATUS_START_TIME').setValue(data.STATUS_START_TIME);
                            			Ext.getCmp('STATUS_ARRIVED_TIME').setValue(data.STATUS_ARRIVED_TIME);
                            			if(KUNREN==''){
                            				Ext.getCmp('time_id3').setDisabled(true);
                            				Ext.getCmp('time_id4').setDisabled(false);
                            				Ext.getCmp('sbButton_id').setText('完工');
                            			}else if(KUNREN=='困人'){
                            				Ext.getCmp('sbButton_id').setText('救人');
                            				Ext.getCmp('time_id3').setDisabled(false);
                            				Ext.getCmp('time_id4').setDisabled(true);
                            			};
                            			
                        				Ext.getCmp('faultdandlingFP_id_time_id').setDisabled(true);
                             			Ext.getCmp('time_id2').setDisabled(true);
                            		}else if(stauts=='救人'){
                            			Ext.getCmp('faultdandlingFP_id_time_id').setValue(data.START_TIME);
                            			Ext.getCmp('time_id2').setValue(data.ARRIVE_TIME);
                            			Ext.getCmp('time_id3').setValue(data.RESCUE_TIME);
                            			Ext.getCmp('STATUS_START_TIME').setValue(data.STATUS_START_TIME);
                            			Ext.getCmp('STATUS_ARRIVED_TIME').setValue(data.STATUS_ARRIVED_TIME);
                            			Ext.getCmp('STATUS_RESCUE_TIME').setValue(data.STATUS_RESCUE_TIME);
                            			
                            			Ext.getCmp('faultdandlingFP_id_time_id').setDisabled(true);
                             			Ext.getCmp('time_id2').setDisabled(true);
                             			Ext.getCmp('time_id3').setDisabled(true);
                            			Ext.getCmp('time_id4').setDisabled(false);
                            			Ext.getCmp('sbButton_id').setText('完工');
                            		}else if(stauts=='完工'){
                            			//按钮
                            			Ext.getCmp('sbButton_id').setText('完工');
                                		//出发
                                		Ext.getCmp('faultdandlingFP_id_time_id').setValue(data.START_TIME);
                                		//到场
                                		Ext.getCmp('time_id2').setValue(data.ARRIVE_TIME);
                                		//困人
                                		Ext.getCmp('time_id3').setValue(data.RESCUE_TIME);
                                		//完工
                                		Ext.getCmp('time_id4').setValue(data.REPAIR_COMPLETE_TIME);
                                		Ext.getCmp('STATUS_START_TIME').setValue(data.STATUS_START_TIME);
                            			Ext.getCmp('STATUS_ARRIVED_TIME').setValue(data.STATUS_ARRIVED_TIME);
                            			Ext.getCmp('STATUS_RESCUE_TIME').setValue(data.STATUS_RESCUE_TIME);
                            			Ext.getCmp('STATUS_COMPLETE_TIME').setValue(data.STATUS_COMPLETE_TIME);
                                		
                                		Ext.getCmp('sbButton_id').setDisabled(true);
                                		Ext.getCmp('faultdandlingFP_id_time_id').setDisabled(true);
                            			Ext.getCmp('time_id2').setDisabled(true);
                            			Ext.getCmp('time_id3').setDisabled(true);
                            			Ext.getCmp('time_id4').setDisabled(true);
                            			WL.Toast.show('这条数据的反馈信息已处理完成,无需进行任何操作！');
                            		};
                            	};  
                            	var content={};
                            	content.iswhere='where ACTIVITY_ID='+"'"+act+"'";
                            	MainCtr.connectServer(jieguo,'fankuixinxiAction.do?method=toSearch',JSON.stringify(content));
                            }
                        },
                        {
                        	xtype: 'button',
                            baseCls: 'x-button helcpda-list-button helcpda-bgColor-green',
                            text: '转派',
                            listeners: {
                                tap: function(button, e){
                                    e.stopPropagation();
                                    return false;
                                },
                                scope: this
                            },
                            handler: function(button, e) {
                                Ext.getCmp('L_FaultHandling2016').fireEvent('hide');
                                console.log(button.getRecord());
                                MainCtr.NextView('FaultHandlingForwardPanel','HelcPDA.view.fault.FaultHandlingForwardingPanel');
                        		var STATION_ID = button.getRecord().data.STATION_ID;
                        		var COMPANY_ID = button.getRecord().data.COMPANY_ID;
                        		var STATION_NAME = button.getRecord().data.STATION_NAME;
                        		
                        		if(STATION_NAME==null||STATION_NAME==""||typeof(STATION_NAME)=="undefined"){
                        			
                        			var content = "{'STATION_ID':'" + STATION_ID + "','COMPANY_ID':'"+COMPANY_ID+"'}";
                        			var getPerson = function(res) {
                        				var arr=res.rows;
                        		    	var data="[";
                        		   		for(var i=0;i<arr.length;i++){
                        		   			if(i!=arr.length-1){
                        		   				data+="{'value':'"+arr[i].STATION_CODE+"','text':'"+arr[i].STATION_NAME+"'},";
                        		   			}else{
                        		   				data+="{'value':'"+arr[i].STATION_CODE+"','text':'"+arr[i].STATION_NAME+"'}";
                        		   			}
                        		   		 }
                        		   		data+=",{'vaule':'','text':'司级人员'}]";
                        		    	var str = eval(data);
                        		    	
                        		    	var arr2=res.rows2;
                        		    	var data="[";
                        		   		for(var i=0;i<arr2.length;i++){
                        		   			if(i!=arr2.length-1){
                        		   				data+="{'value':'"+arr2[i].PERSON_ID+"','text':'"+arr2[i].PERSON_NAME+"'},";
                        		   			}else{
                        		   				data+="{'value':'"+arr2[i].PERSON_ID+"','text':'"+arr2[i].PERSON_NAME+"'}";
                        		   			}
                        		   		 }
                        		   		data+=",{'vaule':'','text':'司级人员'}]";
                        		    	var str2 = eval(data);
                        				
                        				Ext.getCmp('FHF_STATION_ID').setOptions(str);
                        				Ext.getCmp('FHF_STATION_ID').setValue(str[0].value);
                        				Ext.getCmp('person').setOptions(str2);
                        			};
                        			MainCtr.connectServer(getPerson,'zhuanPaiAction.do?method=toSearch2', content);

                        		}else{
                        			
                        			var getResult = function(res) {
                        				var arr=res.rows;
                        				var data="[";
                        				for(var i=0;i<arr.length;i++){
                        					if(i!=arr.length-1){
                        						data+="{'value':'"+arr[i].STATION_CODE+"','text':'"+arr[i].STATION_NAME+"'},";
                        					}else{
                        						data+="{'value':'"+arr[i].STATION_CODE+"','text':'"+arr[i].STATION_NAME+"'}";
                        					}
                        				}
                        				data+=",{'vaule':'','text':'司级人员'}]";
                        				var str = eval(data);
                        				
                        				Ext.getCmp('FHF_STATION_ID').setOptions(str);
                        				Ext.getCmp('FHF_STATION_ID').setValue(str[0].value);
                        				
                        			};
                        			if(STATION_ID==undefined){
                        				STATION_ID='';
                        			};
                        			var content = "{'STATION_ID':'" + STATION_ID + "','COMPANY_ID':'" + COMPANY_ID +"'}";
                        			MainCtr.connectServer(getResult,'zhuanPaiAction.do?method=toSearch2', content);
                        		}
                            }
                        }
                    ]
                }
            ]
        );
	},
	
	OnL_FaultHandlingReport2016Tap : function(obj, index, target, record, e, eOpts){
		MainFaultRecord = record;
		MainCtr.NextView('faultHandlingReportPanel','HelcPDA.view.fault.FaultHandlingReportPanel');
	},
	
	Onid_okTap : function(obj, e, eOpts){
		Ext.getCmp('overlay_test').hide();
	},
	
	Onbtn_messageTap : function(obj, e, eOpts){
		var obj = this;
		obj.NextView('New_Message_view_id','HelcPDA.view.New_Message_view');
//		if(Ext.getCmp('overlay_test')){
//			Ext.getCmp('overlay_test').destroy();
//		}
//		var o_overlay = Ext.Viewport.add(Ext.create('HelcPDA.view.overlay_test'));
//		o_overlay.show();
//		console.log(Ext.getCmp('L_FaultHandling2016').getSelection());
	},
	
	Ondv_specialTap : function(obj, index, target, record, e, eOpts){
		var obj = this;
		switch(record.data.id){
		case "daitijiao":
			obj.NextView('wfc_list_view','HelcPDA.view.waitingdata.WaitingForCommitData_List_V');
			var wfc_list_view = Ext.getCmp('wfc_list_view');
			wfc_list_view.loadDataJST();
			break;
		case "tongjibaobiao":
			obj.NextView('reportview_homepage','HelcPDA.view.report.ReportView');
			//进入统计报表模块，根据权限显示模块
			var report_list_data  = [];//安装项目子模块列表
    		//热线受信报表
    		if(roleStr.indexOf('report_rxsx')>=0){
    			report_list_data.push({title: '热线受信报表',color: '#62bb47',number: '1',icon: 'Z'});
        	}
    		//保养计划报表
    		if(roleStr.indexOf('report_byjh')>=0){
    			report_list_data.push({title: '保养计划报表',color: '#fbb726',number: '1',icon: 'Z'});
    		}
    		//故障报告书报表
    		if(roleStr.indexOf('report_gzbgs')>=0){
    			report_list_data.push({title: '故障报告书报表',color: '#f6821f',number: '3',icon: 'Z'});
    		}
    		//安装台量报表
    		if(roleStr.indexOf('report_install')>=0){
    			report_list_data.push({title: '安装台量报表',color: '#e03a3e',number: '1',icon: 'Z'});
    		}
    		//安装周期报表
    		if(roleStr.indexOf('report_azzq')>=0){
    			report_list_data.push({title: '安装周期报表',color: '#963d97',number: '2',icon: 'Z'});
    		}
    		//安装录入情况报表
    		if(roleStr.indexOf('report_azbsrecord')>=0){
    			report_list_data.push({title: '安装录入情况报表',color: '#009ddc',number: '3',icon: 'Z'});
    		}
    		//安装完工情况报表
    		if(roleStr.indexOf('report_instcompleted')>=0){
    			report_list_data.push({title: '安装完工情况报表',color: '#62bb47',number: '1',icon: 'Z'});
    		}
    		//维保业绩
    		if(roleStr.indexOf('report_maintainAhm')>=0){
    			report_list_data.push({title: '维保业绩',color: '#fbb726',number: '2',icon: 'Z'});
    		}
    		//zhj
    		report_list_data.push({title: 'PDA登录报表',color: '#fbb726',number: '2',icon: 'Z'});
    		
    		Ext.getCmp('report_list').setData(report_list_data);
			break;
		case "pinzhengzhenggai":
			obj.NextView('Renovate_Project_HeaderList_id','HelcPDA.view.ProductCertificate.Renovate_Project_HeaderList');
			var store=obj.getStore('RP_HeadStore','HelcPDA.store.ProductCertificate.RP_HeadStore');
			store.setData([]);   
			var query={tcode:"ProductCertificate_data",tid:"ProductCertificate_list"};
			var options={exact:true};       
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
			break;
		case "zhuanxiangbaozhang":
			obj.NextView('MmintainSpecialList_V_id','HelcPDA.view.maintainSpecial.MmintainSpecialList_V');
			break;
		case "hetongxinxi":
			obj.NextView("Compactlist","HelcPDA.view.compact.CompactSearchPanel");
			break;
		case "baoyangchoucha":
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
			break;
		case "gongchengwenjian":
			obj.NextView('edoc_view','HelcPDA.view.edoc.edoc_view');
			break;
		case "tongxunlu":
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
			break;
		case "anzhuangchaxun":
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
			break;
		case "peijianxinxi":
			obj.NextView('com_part_Project_id','HelcPDA.view.fitting.com_part_Project');
			var install_project_list_data  = [];//安装项目子模块列表
			install_project_list_data.push({title: '常用配件',color: '#62bb47',number: '1',icon: 'l'});
			install_project_list_data.push({title: '物流运单',color: '#fbb726',number: '2',icon: 's'});
			Ext.getCmp('com_part_Project_list').setData(install_project_list_data);
			break;
		case "shoujihaoma":
			obj.NextView("cellphoneList","HelcPDA.view.cellphoneinfo.InputCellphoneNumber");
			break;
		case "unlock":
			MainCtr.NextView('UnLockMain','HelcPDA.view.UnLock.UnLockMain');
			break;
		default:
			break;
		}
	},
	
	OnL_achievementTap : function(obj, index, target, record, e, eOpts){
		var obj = this;
		switch(record.data.id){
		case "baoyangjihua":
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
			break;
		case "jixiuchuli":
			obj.NextView('faultHLP','HelcPDA.view.fault.FaultHandlingPanel');
			faultHandingPC_NEW(obj);
			break;
		case "anzhuanggongneng":
			obj.NextView('installProject_id','HelcPDA.view.install.installProject');
			obj.getApplication().getController('MenusViewCtrl').getSendingbutnoentry();
			//进入安装项目模块，根据权限显示模块
			var install_project_list_data  = [];//安装项目子模块列表
    		//安装任务
    		if(roleStr.indexOf('anzhuangrenwu')>=0){
    			install_project_list_data.push({title: '安装任务',color: '#62bb47',number: '1',icon: 'l'});
        	}
    		if(roleStr.indexOf('querenpaichan')>=0){
    			install_project_list_data.push({title: '确认排产',color: '#fbb726',number: '1',icon: '3'});
    		}
    		if(roleStr.indexOf('xiangtoufahuo')>=0){
    			install_project_list_data.push({title: '箱头发货',color: '#f6821f',number: '3',icon: 'X'});
    		}
    		if(roleStr.indexOf('anzhuangjihua')>=0){
    			install_project_list_data.push({title: '安装计划',color: '#e03a3e',number: '1',icon: '\\'});
    		}
    		if(roleStr.indexOf('anzhuangguocheng')>=0){
    			var AZGC = 0;
    			for(var i =0;i<install_project_list_data.length;i++){
    				if(install_project_list_data[i].title =="安装过程"){
    					AZGC++;
    				}
    			}
    			if(AZGC ==0){
    				install_project_list_data.push({title: '安装过程',color: '#953c96',number: '2',icon: '7'});
    			}
    		}
    		//所有人都有的权限
			install_project_list_data.push({title: 'ITM',color: '#009ddc',number: '3',icon: '7'});
			install_project_list_data.push({title: '已发货未进场',color: '#62bb47',number: '1',icon: 'x'});
			if(roleStr.indexOf('tiaoshirenwu')>=0){
    			install_project_list_data.push({title: '调试任务',color: '#fbb726',number: '2',icon: 'W'});
    		}
    		if(roleStr.indexOf('baojianrenwu')>=0){
    			install_project_list_data.push({title: '报检任务',color: '#e03a3e',number: '2',icon: 'W'});
    		}
    		if(roleStr.indexOf('changjianrenwu')>=0){
    			install_project_list_data.push({title: '厂检任务',color: '#e03a3e',number: '2',icon: 'W'});
    		}
    		if(roleStr.indexOf('zhengfujianrenwu')>=0){
    			install_project_list_data.push({title: '政府检任务',color: '#009ddc',number: '2',icon: 'W'});
    		}
    		if(roleStr.indexOf('wangongjiyijiao')>=0){
    			install_project_list_data.push({title: '移交任务',color: '#62bb47',number: '2',icon: '^'});
    		}
    		if(roleStr.indexOf('tsdabl')>=0){
    			install_project_list_data.push({title: '调试菜单纸补录',color: '#fbb726',number: '2',icon: 'p'});
    		}
    		if(roleStr.indexOf('cjcdbl')>=0){
    			install_project_list_data.push({title: '厂检菜单纸补录',color: '#f6821f',number: '2',icon: 'p'});
    		}	
    		install_project_list_data.push({title: '安装数据查询',color: '#953c96',number: '2',icon: 's'});

    		Ext.getCmp('install_project_list').setData(install_project_list_data);
			break;
		case "yidongyaojian":
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
			localStorage.PDAflag=PDAflag;
			localStorage.company_name=company_name;
			localStorage.phoneno=phoneno;
    		localStorage.roleid=roleid;
    		localStorage.rolename=rolename;
    		location.href = "essIndex.html";
			break;
		case "weizhixinxi":
			obj.NextView('whitePage','HelcPDA.view.androidMap.WhitePage');
			if(Ext.os.is.Android){
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
			}
			 
			break;
		case "dingqijiancha":
			obj.NextView('RI_MainList','HelcPDA.view.RegularInspection.RI_MainList');
		default:
			break;
		}
	},
	
	Onbtn_ExitTap : function(obj, e, eOpts){
		if(Ext.os.is.Android){
			// 关闭定位
			cordova.exec(function(rds){},function(){},'CommonPlugin','CloseGPS',[]);
			// 停止服务
			cordova.exec(function(res) {
 				//WL.Toast.show('结束定时任务');
 			}, function(err) {
 				WL.Toast.show("错误:"+err);
 			},"MapMain","stopService",[{USERID:userid,DeviceNo:(device.uuid).toUpperCase()}]); 
		}
 		
 		var query={tcode:userid+"help",tid:"help"};
 		WL.JSONStore.get(collectionName).remove(query).then(function(){
 		});
 		var main = Ext.getCmp('loginView');
 		if(!main){
 			main = Ext.create('HelcPDA.view.LoginView');
 		}
  	 	Ext.Viewport.setActiveItem(main);
  	    ViewArray.splice(ViewArray.length-1,1);
  	    ViewArray = [];
  	 	if (commitTask!=null) {
  	 		window.clearInterval(commitTask);
  	 		commitTask = null;
//  	 	WL.Toast.show('定时任务已关闭');
  	 	}
	},
	
	OnL_aboutTap : function(obj, index, target, record, e, eOpts){
		var obj = this;
		switch(record.data.id){
		//帮助
		case "help":
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
			break;
		case "changePWD":
			obj.NextView('UpdatePassword_id','HelcPDA.view.more.UpdatePassword');
			Ext.getCmp('up_username').setValue(usernames);
			break;
		case "about":
			obj.NextView('About_id','HelcPDA.view.more.About');
			Ext.getCmp('text_RJKF').setValue('广州市华越友联科技发展有限公司');
			break;
		default:
			break;
		}
	},
	
	NewView_power2016 : function(power){
		var obj = this;
		
		var l_achievement_data = [];
		if(roleStr.indexOf('baoyangjihua')>=0){
			l_achievement_data.push({name: '保养计划',id: 'baoyangjihua',icon: '\\',color: '#00C716'});
		}
		if(roleStr.indexOf('guzhangchuli')>=0){
			l_achievement_data.push({name: '急修处理',id: 'jixiuchuli',icon: '!',color: '#FC3E39'});
		}
		if(roleStr.indexOf('anzhuangguocheng')>=0){
			l_achievement_data.push({name: '安装功能',id: 'anzhuanggongneng',icon: 'x',color: '#3278FF'});
		}
		l_achievement_data.push({name: '移动遥监',id: 'yidongyaojian',icon: 'E',color: '#FFE25A'});
		if(roleStr.indexOf('weizhixinxibd')>=0){
			l_achievement_data.push({name: '位置信息',id: 'weizhixinxi',icon: '@',color: '#5F9BE6'});
		}
		
		l_achievement_data.push({name: '定期检查',id: 'dingqijiancha',icon: '@',color: '#5F9BE6'});
		
		Ext.getCmp('L_achievement').setData(l_achievement_data);
         
		var dv_special_data = [];
		dv_special_data.push({name: '待提交数据',id:'daitijiao',icon: 'c',color: 'green',num: '',});
		if(roleStr.indexOf('report_pda')>=0){
			dv_special_data.push({name: '统计报表',id:'tongjibaobiao',icon: 'Z',color: '#CBC811',num: ''});
		}
		dv_special_data.push({name: '品证整改',id:'pinzhengzhenggai',icon: 'x',color: '#FF6666',num: ''});
		if(roleStr.indexOf('baoyangjihua')>=0){
			dv_special_data.push({name: '专项保障',id:'zhuanxiangbaozhang',icon: 'S',color: '#FFA54B',num: ''});
		}
		if(roleStr.indexOf('hetongxinxi')>=0){
			dv_special_data.push({name: '合同信息',id:'hetongxinxi',icon: 'F',color: '#62BB47',num: ''});
		}
		dv_special_data.push({name: '保养抽查',id:'baoyangchoucha',icon: 'l',color: '#9669DC',num: ''});
		dv_special_data.push({name: '工程文件',id:'gongchengwenjian',icon: 'N',color: 'green',num: ''});
		dv_special_data.push({name: '公司通讯录',id:'tongxunlu',icon: 'N',color: '#5F9BE6',num: ''});
		dv_special_data.push({name: '安装查询',id:'anzhuangchaxun',icon: 's',color: '#FA82A5',num: ''});
		dv_special_data.push({name: '配件信息',id:'peijianxinxi',icon: 'X',color: '#FFA54B',num: ''});
		dv_special_data.push({name: '手机号码',id:'shoujihaoma',icon: 'q',color: '#9669DC',num: ''});
		if(roleStr.indexOf('unlock')>=0){
			dv_special_data.push({name: '解锁',id:'unlock',icon: ')',color: 'green',num: ''});
		}
		Ext.getCmp('dv_special').setData(dv_special_data);
		
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
		
		obj.getApplication().getController('MenusViewCtrl').news_panel();
	},
	
});

function GetFaultReport(person_id){
	var getResult = function(res){
		Ext.getCmp('L_FaultHandlingReport2016').getStore().setData([]);
		if(res.count > 0){
			var v_data = [];
			for(var i = 0;i < res.count;i++){
				v_data.push({
					ABSTRACT:res.rows[i].ABSTRACT,
					ACTIVITY_ID:res.rows[i].ACTIVITY_ID,
					ASSET_ID:res.rows[i].ASSET_ID,
					ASSET_NUM:res.rows[i].ASSET_NUM,
					ASSIGN_PERSON_ID:res.rows[i].ASSIGN_PERSON_ID,
					AUDITING_STATUS:res.rows[i].AUDITING_STATUS,
					BOX_UP:res.rows[i].BOX_UP,
					FAULT_DOMAIN:res.rows[i].FAULT_DOMAIN,
					ISACTIVE:res.rows[i].ISACTIVE,
					PERSON_NAME:res.rows[i].PERSON_NAME,
					SR_NUMBER:res.rows[i].SR_NUMBER,
					START_TIME:Ext.Date.format(new Date(res.rows[i].START_TIME),'Y-m-d H:i'),
					STATUS:res.rows[i].STATUS
				});
			}
			Ext.getCmp('L_FaultHandlingReport2016').getStore().setData(v_data);
		}
		
	};
	
	var pars="{'person_id':'"+person_id+"'}";
	MainCtr.asyconnectServer(getResult, 'gzdaichuliAction.do?method=GetFaultReport', pars);
};