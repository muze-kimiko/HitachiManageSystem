/**
 * 待处理故障列表监视器  xcx  2014-4-15
 */

Ext.define('HelcPDA.controller.fault.FaultHandlingPanelCtrl',{
	id:'FaultHandLP',
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			
			/************************************************************************************
			 * 急修处理模块  待处理故障列表页面
			 * */
			
			//跳回首页
			FaultHomePageButton:'button[id=FaultHomePageButton]',
			
			//跳转到服务请求录入	
			FaultFHIPButton:'button[id=FaultFHIPButton]',
			
			/**
			 **急修处理模块  待处理故障列表页面
			 ************************************************************************************/			

		},
		control:{
			
			/************************************************************************************
			 * 急修处理模块  待处理故障列表页面
			 * */
			
	        //跳回首页
	        'button#FaultHomePageButton':{
	        	tap:'FaultHomePageButton'
	        },
				
	        //跳转到服务请求录入	
	        'button#FaultFHIPButton':{
	        	tap:'FaultFHIPButton'
	        },
	        
			//单击故障信息显示派工信息  待提交
			"list#FaultListItemTap_DTJ": {
	               itemtap: 'FaultListItemTap_DTJ'
	        },
	        
	        //2016单击故障信息显示派工信息  待提交
			"list#L_FaultHandling2016": {
	               itemtap: 'FaultListItemTap_DTJ'
	        },
	        
	      //单击故障信息显示派工信息   已提交
			"list#FaultListItemTap_YTJ": {
	               itemtap: 'FaultListItemTap_YTJ'
	        },
	        
	      //单击故障信息显示派工信息  已驳回
			"list#FaultListItemTap_YBH": {
	               itemtap: 'FaultListItemTap_YBH'
	        },
	        
	      //单击故障信息显示派工信息  已审核
			"list#FaultListItemTap_YSH": {
	               itemtap: 'FaultListItemTap_YSH'
	        },
	        
	        //2014-8-19
	        //查找按钮
	        'button#faultHLP_SSZ_CZ':{
	        	tap:'faultHLP_SSZ_CZ'
	        },
	        
	        'panel#faultHLP':{
	        	initialize: 'OnfaultHLPInitialize'
	        },
			/**
			 **急修处理模块  待处理故障列表页面
			 ************************************************************************************/	
			
		},
	},

	/************************************************************************************
	 * 急修处理模块  反馈信息页面
	 * */
	
	OnfaultHLPInitialize : function(component,eOpts){
        Ext.getCmp('FaultListItemTap_DTJ').setPlugins(
            [
                {
                    xclass: 'plugin.SlideActions',
                    openPosition: 175,
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
                                Ext.getCmp('FaultListItemTap_DTJ').fireEvent('hide');
//                                console.log(button.getRecord());
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
                                Ext.getCmp('FaultListItemTap_DTJ').fireEvent('hide');
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
                        },
                        {
                        	xtype: 'button',
                            baseCls: 'x-button helcpda-list-button helcpda-bgColor-purple',
                            text: '故障<br>报告',
                            listeners: {
                                tap: function(button, e){
                                    e.stopPropagation();
                                    return false;
                                },
                                scope: this
                            },
                            handler: function(button, e) {
                                Ext.getCmp('FaultListItemTap_DTJ').fireEvent('hide');
                                MainFaultRecord = button.getRecord()
                                MainCtr.NextView('faultHandlingReportPanel','HelcPDA.view.fault.FaultHandlingReportPanel');
                            }
                        }
                    ]
                }
            ]
        );
	},
	
	//跳回首页   2014-4-18 xcx
	FaultHomePageButton:function(){
		//console.log('故障处理页面返回首页');
		//跳转页面     
		this.BackView();
//		this.showBackView("MenusView_id","HelcPDA.view.MenusView");
	},
		
	//2014-5-13
	//跳转到服务请求录入	（初始化）
	FaultFHIPButton:function(){
		//console.log('进入服务请求录入界面');
		this.NextView("faultFHIP","HelcPDA.view.fault.FaultHandlingInputPanel");
		
		//清空
		//工号     
		Ext.getCmp('FaultFHIP_GH').setValue('');
		//受信地盘
		Ext.getCmp('FaultFHIP_SXDP').setValue('');
		//受信大楼
		Ext.getCmp('FaultFHIP_SXDL').setValue('');
		//受信地址
		Ext.getCmp('FaultFHIP_SXDZ').setValue('');
		
		Ext.getCmp('FaultFHIPCompanyName').setValue('');
		//所属站ID
		Ext.getCmp('FaultFHIPStation').setValue('');
		//受信内容
		Ext.getCmp('FaultFHIP_SXNR').setValue('');
		//受信时间
		Ext.getCmp('FaultFHIP_SXSJ').setValue('');
		//发生时间
		Ext.getCmp('FaultFHIP_FSSJ').setValue('');
		//联系人姓名
		Ext.getCmp('FaultFHIP_LXRXM').setValue('');
		//联系人电话
		Ext.getCmp('FaultFHIP_LXRDH').setValue('');
		//客户
		Ext.getCmp('FaultFHIP_KH').setValue('');
		//预约时间
		Ext.getCmp('FaultFHIP_YYSJ').setValue('');
		
		
		//显示登录人员所属公司
		Ext.getCmp('FaultFHIPCompanyName').setValue(company_name);
		
		//查找站   通过公司 ID查找站ID和站名
		//console.log('登入人员的公司ID和公司名:'+company_code+' '+company_name);
		var tiaojian="{'COMPANY_ID':'"+company_code+"'}";
		this.connectServerHSSS(this.bbccdd,this,'HelSblStationStore','HelcPDA.store.fault.HelSblStationStore',"fuwuqingqiuluruAction.do?method=tofind_station",tiaojian);
	},
	
	//下拉列表 站
	bbccdd:function(result,obj,snam,sname2){
		var FaultList=Ext.data.StoreManager.get(snam);
		if (!FaultList) { 
			FaultList = Ext.create(sname2); 
		};
		FaultList.setData(result.rows,this);
		//用于初始化时显示登录用户所在的站(必须写在这)
		Ext.getCmp('FaultFHIPStation').setValue(station_id);
		
		
		//受信状态
		var REMARKS="";
		var tiaojian="{'REMARKS':'"+REMARKS+"'}";
		obj.connectServerHSSS(obj.ccddee,obj,'HelHotlineFaultStatusStore','HelcPDA.store.fault.HelHotlineFaultStatusStore',"fuwuqingqiuluruAction.do?method=toSearch",tiaojian);
	},
	
	//
	ccddee:function(result,obj,snam,sname2){
		//console.log('进入服务请求录入界面'+JSON.stringify(result));
		//建立数据仓
		var FaultList=Ext.data.StoreManager.get(snam);
		if (!FaultList) { 
			FaultList = Ext.create(sname2); 
		};
		FaultList.setData(result.rows,this);
		
		//
		//console.log(station_id);
		var tiaojian="{'STATION_ID':'"+station_id+"'}";
		if(station_id==''){
			var s_id=Ext.getCmp('FaultFHIPStation').getValue();
			tiaojian="{'STATION_ID':'"+s_id+"'}";
			//alert(s_id);
		}
		obj.connectServerHSSS(obj.ddeeff,'','','',"fuwuqingqiuluruAction.do?method=tofind_wbry",tiaojian);
	},
	
	//故障状态
	ddeeff:function(arr1,obj,snam,sname2){
		var	data1="[";
  		for(var i=0;i<arr1.rows.length;i++){
  			if(i!=arr1.rows.length-1){
  				data1+="{'value':'"
 	        		 +arr1.rows[i].PERSON_ID+"','text':'"+arr1.rows[i].PERSON_NAME+"'},";
  			}else{
  				data1+="{'value':'"
 	        		 +arr1.rows[i].PERSON_ID+"','text':'"+arr1.rows[i].PERSON_NAME+"'}";
  			}
  		}
  	data1+="]";
  	Ext.getCmp('FaultFHIPPersonName').setOptions(eval(data1));
	},

	
	//单击故障信息显示派工信息 待提交
	FaultListItemTap_DTJ:function(dataview, index, target, record, e, eOpts) {
		//如果是从日滨页面跳转过来，就跳过登录页面直接登录
		var page = localStorage.page;
		if(page != "" && page != null && typeof(page) != "undefined"){
			index = listIndex;
		}
		this.FaultListItemGGFF(1,index);
	},

    //单击故障信息显示派工信息   已提交
    FaultListItemTap_YTJ:function(dataview, index, target, record, e, eOpts) {
    	this.FaultListItemGGFF(2,index);
	},
	
	//单击故障信息显示派工信息  已驳回
	FaultListItemTap_YBH:function(dataview, index, target, record, e, eOpts) {
		this.FaultListItemGGFF(3,index);
	},
	
	//单击故障信息显示派工信息  已审核
	FaultListItemTap_YSH:function(dataview, index, target, record, e, eOpts) {
		this.FaultListItemGGFF(4,index);
	},
	
	FaultListItemGGFF:function(count,index){
		var datads='';
		if(count==1){
			datads=Ext.data.StoreManager.get('FaultHandlingStore');
			if(!datads){
				datads=Ext.create('HelcPDA.store.fault.FaultHandlingStore');
			};
		}else if(count==2){
			datads=Ext.data.StoreManager.get('FaultHandlingStoreTwo');
			if(!datads){
				datads=Ext.create('HelcPDA.store.fault.FaultHandlingStoreTwo');
			};
		}else if(count==3){
			datads=Ext.data.StoreManager.get('FaultHandlingStoreThree');
			if(!datads){
				datads=Ext.create('HelcPDA.store.fault.FaultHandlingStoreThree');
			};
		}else if(count==4){
			datads=Ext.data.StoreManager.get('FaultHandlingStoreFour');
			if(!datads){
				datads=Ext.create('HelcPDA.store.fault.FaultHandlingStoreFour');
			};
		};

		//console.log('进入FaultListItemTap派工信息模块');
		var page = localStorage.page;
		if(page != "" && page != null && typeof(page) != "undefined"){
			if(localStorage.YDYJ_flag == "2"){
				localStorage.YDYJ_flag = '';
				localStorage.page = '';
			}
		}else{
			this.NextView('FaultFHDP','HelcPDA.view.fault.FaultHandlingDetailPanel');
			Ext.getCmp('listIndex').setValue(index);
			//console.log('数据仓中的数:'+datads.getAt(index).get('ACTIVITY_ID'));
			
			//活动ID
			Ext.getCmp('ACTIVITYID').setValue(datads.getAt(index).get('ACTIVITY_ID'));
			//服务请求编号
			Ext.getCmp('SR_NUMBER').setValue(datads.getAt(index).get('SR_NUMBER'));
			//受信时间
			Ext.getCmp('START_TIME').setValue(datads.getAt(index).get('START_TIME'));
			//受信地盘
			Ext.getCmp('FAULT_DOMAIN').setValue(datads.getAt(index).get('FAULT_DOMAIN'));
			//受信大楼
			Ext.getCmp('FAULT_EDIFICE').setValue(datads.getAt(index).get('FAULT_EDIFICE'));
			//梯号
			Ext.getCmp('PRODUCT_PART').setValue(datads.getAt(index).get('PRODUCT_PART'));
			//受信地址
			Ext.getCmp('FAULT_ADDRESS').setValue(datads.getAt(index).get('FAULT_ADDRESS'));
			//工号
			Ext.getCmp('ASSET_NUM').setValue(datads.getAt(index).get('ASSET_NUM'));
			//是否困人
			Ext.getCmp('BOX_UP').setValue(datads.getAt(index).get('BOX_UP'));
			//受信内容
			Ext.getCmp('ABSTRACT').setValue(datads.getAt(index).get('ABSTRACT'));
			//联系人姓名
			Ext.getCmp('CONTACT_NAME').setValue(datads.getAt(index).get('CONTACT_NAME'));
			//联系人电话
			Ext.getCmp('CONTACT_PHONE').setValue(datads.getAt(index).get('CONTACT_PHONE#'));
			//所属司  
			Ext.getCmp('COMPANY_NAME').setValue(datads.getAt(index).get('COMPANY_NAME'));
			//所属站  所属站ID 
			Ext.getCmp('STATION_NAME').setValue(datads.getAt(index).get('STATION_NAME'));
			//预约时间
			Ext.getCmp('BOOKING_TIME').setValue(datads.getAt(index).get('BOOKING_TIME'));
			//派工人员
			Ext.getCmp('ASSIGN_PERSON_ID').setValue(datads.getAt(index).get('ASSIGN_PERSON_ID'));
			//业务分类
			Ext.getCmp('AREA').setValue(datads.getAt(index).get('AREA'));
			//服务请求来源
			Ext.getCmp('SERVICE_REQUEST_SOURCE').setValue(datads.getAt(index).get('SERVICE_REQUEST_SOURCE'));
			if(datads.getAt(index).get('SERVICE_REQUEST_SOURCE') == "MAS报出"){
				Ext.getCmp('SERVICE_REQUEST_SOURCE').setLabelCls("SERVICE_REQUEST_SOURCE_Cls");
				Ext.getCmp('SERVICE_REQUEST_SOURCE').setInputCls("SERVICE_REQUEST_SOURCE_InputCls");
			}
			//梯种型号
			Ext.getCmp('PRODUCT_PART').setValue(datads.getAt(index).get('PRODUCT_PART'));
			//层
			Ext.getCmp('ELEVATOR_FLOOR').setValue(datads.getAt(index).get('ELEVATOR_FLOOR'));
			//站
			Ext.getCmp('ELEVATOR_STOP').setValue(datads.getAt(index).get('ELEVATOR_STOP'));
			//发生时间
			Ext.getCmp('HAPPEN_TIME').setValue(datads.getAt(index).get('HAPPEN_TIME'));
			//受信故障状态
			Ext.getCmp('HOTLINE_FAULT_STATUS').setValue(datads.getAt(index).get('HOTLINE_FAULT_STATUS'));
			//客户
			Ext.getCmp('ACCNT_NAME').setValue(datads.getAt(index).get('ACCNT_NAME'));
			//预约时间
			Ext.getCmp('BOOKING_TIME').setValue(datads.getAt(index).get('BOOKING_TIME'));
			//所有者
			Ext.getCmp('LOGIN_ID').setValue(datads.getAt(index).get('LOGIN_ID'));
			//活动号?????
			Ext.getCmp('ACTIVITY_ID').setValue(datads.getAt(index).get('ACTIVITY_ID'));
			//派单时间
			Ext.getCmp('ASSIGN_TIME').setValue(datads.getAt(index).get('ASSIGN_TIME'));
			
			//特殊
			//所属司ID
			Ext.getCmp('COMPANY_ID').setValue(datads.getAt(index).get('COMPANY_ID'));
			//所属站ID
			Ext.getCmp('STATION_ID').setValue(datads.getAt(index).get('STATION_ID'));
			
			//隐藏文本框，装载 处理情况状态
			//给反馈信息页面用
			Ext.getCmp('FaultFHDP_STATUS').setValue(datads.getAt(index).get('STATUS'));
			//是否有安装遥监
			Ext.getCmp('ISACTIVE').setValue(datads.getAt(index).get('ISACTIVE'));
			//是否再调查 zhj
			Ext.getCmp('COMPLETE_STATUS').setValue(datads.getAt(index).get('COMPLETE_STATUS'));
			Ext.getCmp('AUDITING_STATUS').setValue(datads.getAt(index).get('AUDITING_STATUS'));		
			Ext.getCmp('IS_CHARGEBACK').setValue(datads.getAt(index).get('IS_CHARGEBACK'));
		}
		
	},
	
	//查找按钮
	faultHLP_SSZ_CZ:function(){
		var three='xcxdpa';
		var data=Ext.getCmp('faultHLP_SSZ').getValue();
		//alert('进来'+data);
		function fangfa(result){
			//console.log(JSON.stringify(result));
			var num=result.rows.length;
			//待提交
			var FaultList=Ext.data.StoreManager.get('FaultHandlingStore');
			if (!FaultList) { 
				FaultList = Ext.create("HelcPDA.store.fault.FaultHandlingStore"); 
			};
			
			//已提交
			var FaultListTwo=Ext.data.StoreManager.get('FaultHandlingStoreTwo');
			if (!FaultListTwo) { 
				FaultListTwo = Ext.create("HelcPDA.store.fault.FaultHandlingStoreTwo"); 
			};
			
			//已驳回
			var FaultListThree=Ext.data.StoreManager.get('FaultHandlingStoreThree');
			if (!FaultListThree) { 
				FaultListThree = Ext.create("HelcPDA.store.fault.FaultHandlingStoreThree"); 
			};
			
			//已审核
			var FaultListFour=Ext.data.StoreManager.get('FaultHandlingStoreFour');
			if (!FaultListFour) { 
				FaultListFour = Ext.create("HelcPDA.store.fault.FaultHandlingStoreFour"); 
			};
			if(num>0){
				//对获取的数据进行进一步的处理在显示出来  2014-6-9
				//修改版  2014-7-10
				var count=result.rows.length;
				//故障数组
				var  dataDTJ=[];
				var dataYTJ=[];
				var dataYBH=[];
				var dataYSH=[];
				//故障下标
				var indexDTY=0;
				var indexYTJ=0;
				var indexYBH=0;
				var indexYSH=0;
				
				for(var i=0;i<count;i++){
					var oldData=result.rows[i];
					if(oldData.STATUS=='已取消'){
						dataYTJ[indexYTJ]=oldData;
						indexYTJ++;
					}else if(oldData.STATUS=='已确认'){
						dataYTJ[indexYTJ]=oldData;
						indexYTJ++;
					}else if(oldData.AUDITING_STATUS=='故障报告: 已确认'){
						dataYTJ[indexYTJ]=oldData;
						indexYTJ++;
					}else if(oldData.AUDITING_STATUS=='故障报告: 已提交'){
						dataYTJ[indexYTJ]=oldData;
						indexYTJ++;
					}else if(oldData.AUDITING_STATUS=='故障报告: 已审核'){
						dataYSH[indexYSH]=oldData;
						indexYSH++;
					}else if(oldData.AUDITING_STATUS=='故障报告: 已驳回'){
						dataYBH[indexYBH]=oldData;
						indexYBH++;
					}else if(oldData.AUDITING_STATUS=='故障报告: '){
						oldData.AUDITING_STATUS='';
						dataDTJ[indexDTY]=oldData;
						indexDTY++;
					}else if(oldData.AUDITING_STATUS=='故障报告: 待处理'){
						dataDTJ[indexDTY]=oldData;
						indexDTY++;
					}else if(oldData.AUDITING_STATUS=='故障报告: 待提交'){
						dataDTJ[indexDTY]=oldData;
						indexDTY++;
					}else if(oldData.AUDITING_STATUS==''){
						dataDTJ[indexDTY]=oldData;
						indexDTY++;
					};
				};
				
				//为数据仓添加数据
				FaultList.setData(dataDTJ);
				FaultListTwo.setData(dataYTJ);
				FaultListThree.setData(dataYBH);
				FaultListFour.setData(dataYSH);
				
				
				var dtj=document.getElementById("Fault_dtj");
				dtj.innerHTML='待提交('+dataDTJ.length+')';
				
				var ytj=document.getElementById("Fault_ytj");
				ytj.innerHTML='已提交('+dataYTJ.length+')';
				
				var ybh=document.getElementById("Fault_ybh");
				ybh.innerHTML='已驳回('+dataYBH.length+')';
				
				var ysh=document.getElementById("Fault_ysh");
				ysh.innerHTML='已审核('+dataYSH.length+')';
			}else{
	
				FaultList.setData([]);
				FaultListTwo.setData([]);
				FaultListThree.setData([]);
				FaultListFour.setData([]);
				
				var dtj=document.getElementById("Fault_dtj");
				dtj.innerHTML='待提交('+0+')';
				
				var ytj=document.getElementById("Fault_ytj");
				ytj.innerHTML='已提交('+0+')';
				
				var ybh=document.getElementById("Fault_ybh");
				ybh.innerHTML='已驳回('+0+')';
				
				var ysh=document.getElementById("Fault_ysh");
				ysh.innerHTML='已审核('+0+')';
				
				WL.Toast.show("找不到对应数据");
			};
		};
		var tiaojian="{'person_id':'"+person_id+"','position_type':'"+position_type+"','station_id':'"+data+"','three_dpa':'"+three+"','company_code':'"+company_code+"'}";
		this.connectServer(fangfa,"gzdaichuliAction.do?method=toSearch2",tiaojian);
		/*;
		Ext.getCmp('installPlanAZLR_DZRY').getText();*/
	},
	/**
	 **急修处理模块  反馈信息页面
	 ************************************************************************************/	

///////
});

//因为修改了主页的原因，进入故障模块就从这里进入了。  2014-6-9
function  faultHandingPC_NEW(obj){
	//console.log('进入待处理故障模块');
	
	//删除存放在JSONStore中的数据
	//this.deleteStoppageData();
	
	//判断是否站长登录
	//var zz='*#站长#*,*#片长#*,*#站信息管理员#*,*#'+position_type+'#*';
	
	//三期项目修改标志
	var three='xcxdpa';
	if(station_id==''){
		//当没有站时才出现
		if(Ext.getCmp('cv')){
			Ext.getCmp('cv').setHidden(false);
		}
		
		var tiaojian="{'person_id':'"+person_id+"','position_type':'"+position_type+"','station_id':'"+station_id+"','three_dpa':'"+three+"','company_code':'"+company_code+"'}";
		obj.connectServerMainTainFault(faultHandingPC_NEW2,faultHandingPC_NEW4,obj,"gzdaichuliAction.do?method=toSearch3",tiaojian);
	}else if (station_id==undefined){
		Ext.getCmp('cv').setHidden(false);
		
		var tiaojian="{'person_id':'"+person_id+"','position_type':'"+position_type+"','station_id':'"+station_id+"','three_dpa':'"+three+"','company_code':'"+company_code+"'}";
		obj.connectServerMainTainFault(faultHandingPC_NEW2,faultHandingPC_NEW4,obj,"gzdaichuliAction.do?method=toSearch3",tiaojian);
	}else if(station_id!=''){
		//var tiaojian="{'person_id':'"+person_id+"','position_type':'"+position_type+"','station_id':'"+station_id+"','three_dpa':'"+three+"'}";
		var tiaojian="{'person_id':'"+person_id+"','position_type':'"+position_type+"','station_id':'"+station_id+"','three_dpa':'"+three+"','company_code':'"+company_code+"'}";
		obj.connectServerMainTainFault(faultHandingPC_NEW2,faultHandingPC_NEW4,obj,"gzdaichuliAction.do?method=toSearch",tiaojian);
		//console.log(position_type+'登录');
	};
	
/*	if(zz.indexOf(position_type) >= 0 )   
	{   
		var tiaojian="{'person_id':'"+person_id+"','position_type':'"+position_type+"','station_id':'"+station_id+"','three_dpa':'"+three+"','company_code':'"+company_code+"'}";
		alert(tiaojian);
		obj.connectServerMainTainFault(faultHandingPC_NEW2,faultHandingPC_NEW4,obj,"gzdaichuliAction.do?method=toSearch3",tiaojian);
	   console.log('站长登录');
	}else{
		var tiaojian="{'person_id':'"+person_id+"','position_type':'"+position_type+"','station_id':'"+station_id+"','three_dpa':'"+three+"'}";
		obj.connectServerMainTainFault(faultHandingPC_NEW2,faultHandingPC_NEW4,obj,"gzdaichuliAction.do?method=toSearch",tiaojian);
		console.log(position_type+'登录');
	};*/
	
};

//为JSON添加数据
function faultHandingPC_NEW2(result,objt){
		//console.log('HH  '+JSON.stringify(result));
//		Ext.create('HelcPDA.view.fault.FaultHandlingPanel');
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var options={exacte:true};//默认是false
		var deletemainfields={tcode:'GZ_DAICHULI'};
		MaintainList.remove(deletemainfields,options).then(function(){
    		//console.log('删除故障列表成功');
    		//console.log('result:'+result.rows);
    		var num=result.rows.length;
    		//console.log('添加数据的长度:'+num);
    		var  datas=[];
    		if(num>0){
    			if(Ext.getCmp('WBRY_PERSON_ID')){
    				Ext.getCmp('WBRY_PERSON_ID').setValue(result.rows[0].WBRY_PERSON_ID);
    			}else if(Ext.getCmp('D_WBRY_PERSON_ID')){
    				Ext.getCmp('D_WBRY_PERSON_ID').setValue(result.rows[0].WBRY_PERSON_ID);
    			}
    		}
    		for(var i=0;i<num;i++){
    			var id=result.rows[i].ACTIVITY_ID;
    			var FaultAdd={tcode:'GZ_DAICHULI',tid:id,stext:result.rows[i]};
    			datas[i]=FaultAdd;
    		};
    		
    		//添加数量统计
    		var term={count:result.count,NUM2:result.NUM2,NUM3:result.NUM3,NUM4:result.NUM4};
    		var FaultAdd2={tcode:'GZ_DAICHULI',tid:'NUM',stext:term};
    		datas[num]=FaultAdd2;
    		//当是站长时
/*    		var zz='*#站长#*,*#片长#*,*#站信息管理员#*';
    		if(zz.indexOf(position_type) >= 0 )   
    		{   
    		  	console.log('站长登录信息'+JSON.stringify(result.STATION_ROWS));
    		   	var FaultAdd3={tcode:'GZ_DAICHULI',tid:'STATION_ROWS',stext:result.STATION_ROWS};
       			datas[num+1]=FaultAdd3;
    		};*/
    		if(station_id!=''){
    			//console.log('站长登录信息'+JSON.stringify(result.STATION_ROWS));
    		   	var FaultAdd3={tcode:'GZ_DAICHULI',tid:'STATION_ROWS',stext:result.STATION_ROWS};
       			datas[num+1]=FaultAdd3;
    		};
    		
    		MaintainList.add(datas).then(function(){
	    		//console.log('添加GZ_DAICHULI成功');
	    		
	    		faultHandingPC_NEW3(result);
	    	}).fail(function(errorObject){
	    		//console.log('添加GZ_DAICHULI出错');	
    		});
    		
		}).fail(function(errorObject){
			//console.log('删除故障列表失败');
		});
};

//为数据仓添加数据
function faultHandingPC_NEW3(result){
	//添加下拉列表框
	if(station_id==''){
		var Data=result.STATION_ROWS;
		//console.log('tyty    '+JSON.stringify(result.STATION_ROWS));
		var data1="[";
		data1+="{'value':'"+''+"','text':'"+'最新20条'+"'}";
		if(Data.length>0){
			//长度
			var num=Data.length;
			for(var i=0;i<num;i++){
	  			if(i!=num-1){
	  				data1+=",{'value':'"+Data[i].STATION_CODE+"','text':'"+Data[i].STATION_NAME+"'}";
	  			}else{
	  				data1+=",{'value':'"+Data[i].STATION_CODE+"','text':'"+Data[i].STATION_NAME+"'}";
	  			};
	  		};
		};
  		data1+="]";
  		if(Ext.getCmp('faultHLP_SSZ')){
  			Ext.getCmp('faultHLP_SSZ').setOptions(eval(data1));
  		}
	};
	
	
	//console.log('进入FaultAddData添加数据仓方法');
	
	//待提交
	var FaultList=Ext.data.StoreManager.get('FaultHandlingStore');
	if (!FaultList) { 
		FaultList = Ext.create("HelcPDA.store.fault.FaultHandlingStore"); 
	};
	
	//待提交2016
	var FaultList2016=Ext.data.StoreManager.get('FaultHandlingStore2016');
	if (!FaultList2016) { 
		FaultList2016 = Ext.create("HelcPDA.store.fault.FaultHandlingStore2016"); 
	};
	
	//已提交
	var FaultListTwo=Ext.data.StoreManager.get('FaultHandlingStoreTwo');
	if (!FaultListTwo) { 
		FaultListTwo = Ext.create("HelcPDA.store.fault.FaultHandlingStoreTwo"); 
	};
	
	//已驳回
	var FaultListThree=Ext.data.StoreManager.get('FaultHandlingStoreThree');
	if (!FaultListThree) { 
		FaultListThree = Ext.create("HelcPDA.store.fault.FaultHandlingStoreThree"); 
	};
	
	//已审核
	var FaultListFour=Ext.data.StoreManager.get('FaultHandlingStoreFour');
	if (!FaultListFour) { 
		FaultListFour = Ext.create("HelcPDA.store.fault.FaultHandlingStoreFour"); 
	};
	
	
	//对获取的数据进行进一步的处理在显示出来  2014-6-9
	//修改版  2014-7-10
	var count=result.rows.length;
	//故障数组
	var  dataDTJ=[];
	var dataYTJ=[];
	var dataYBH=[];
	var dataYSH=[];
	//故障下标
	var indexDTY=0;
	var indexYTJ=0;
	var indexYBH=0;
	var indexYSH=0;
	
	for(var i=0;i<count;i++){
		var oldData=result.rows[i];
		if(oldData.STATUS=='已取消'){
			dataYTJ[indexYTJ]=oldData;
			indexYTJ++;
		}else if(oldData.STATUS=='已确认'){
			dataYTJ[indexYTJ]=oldData;
			indexYTJ++;
		}else if(oldData.AUDITING_STATUS=='故障报告: 已确认'){
			dataYTJ[indexYTJ]=oldData;
			indexYTJ++;
		}else if(oldData.AUDITING_STATUS=='故障报告: 已提交'){
			dataYTJ[indexYTJ]=oldData;
			indexYTJ++;
		}else if(oldData.AUDITING_STATUS=='故障报告: 已审核'){
			dataYSH[indexYSH]=oldData;
			indexYSH++;
		}else if(oldData.AUDITING_STATUS=='故障报告: 已驳回'){
			dataYBH[indexYBH]=oldData;
			indexYBH++;
		}else if(oldData.AUDITING_STATUS=='故障报告: '){
			if(oldData.STATUS=='已废弃'){
				var data=new Date(oldData.START_TIME);
				var yy=data.getFullYear();
				var mm=data.getMonth();
				
				var newdata=new Date();
				var newyy=newdata.getFullYear();
				var newmm=newdata.getMonth();

				if(yy==newyy&&mm==newmm){
					dataYTJ[indexYTJ]=oldData;
					indexYTJ++;
				};
//				return;
			}else{
				oldData.AUDITING_STATUS='';
				dataDTJ[indexDTY]=oldData;
				indexDTY++;
			}
		}else if(oldData.AUDITING_STATUS=='故障报告: 待处理'){
			dataDTJ[indexDTY]=oldData;
			indexDTY++;
		}else if(oldData.AUDITING_STATUS=='故障报告: 待提交'){
			dataDTJ[indexDTY]=oldData;
			indexDTY++;
		}else if(oldData.AUDITING_STATUS==''){
			if(oldData.STATUS=='已废弃'){
				var data=new Date(oldData.START_TIME);
				var yy=data.getFullYear();
				var mm=data.getMonth();
				//cc.log(oldData.START_TIME);
				//cc.log(yy);
				//cc.log(mm);
				
				var newdata=new Date();
				var newyy=newdata.getFullYear();
				var newmm=newdata.getMonth();
				//cc.log(newdata);
				//cc.log(newyy);
				//cc.log(newmm);
				if(yy==newyy&&mm==newmm){
					dataYTJ[indexYTJ]=oldData;
					indexYTJ++;
				};
//				return;
			}else{
				dataDTJ[indexDTY]=oldData;
				indexDTY++;
			}
		}else if(oldData.AUDITING_STATUS=='故障报告: 已废弃'){//新功能 xcx  2016-8-30
			var data=new Date(oldData.START_TIME);
			var yy=data.getFullYear();
			var mm=data.getMonth();
			cc.log(oldData.START_TIME);
			//cc.log(yy);
			//cc.log(mm);
			
			var newdata=new Date();
			var newyy=newdata.getFullYear();
			var newmm=newdata.getMonth();
			//cc.log(newdata);
			//cc.log(newyy);
			//cc.log(newmm);
			if(yy==newyy&&mm==newmm){
				dataYTJ[indexYTJ]=oldData;
				indexYTJ++;
			};
		};
		
	};
	
	function clqk(){
		
	};
	
	//为数据仓添加数据
	FaultList.setData(dataDTJ);
	//czq
	FaultList2016.setData(dataDTJ);
	FaultListTwo.setData(dataYTJ);
	FaultListThree.setData(dataYBH);
	FaultListFour.setData(dataYSH);
	
	var dtj=document.getElementById("Fault_dtj");
	if(dtj){
		dtj.innerHTML='待提交('+dataDTJ.length+')';
	}
	
	var ytj=document.getElementById("Fault_ytj");
	if(ytj){
		ytj.innerHTML='已提交('+dataYTJ.length+')';
	}
	
	var ybh=document.getElementById("Fault_ybh");
	if(ybh){
		ybh.innerHTML='已驳回('+dataYBH.length+')';
	}
	
	var ysh=document.getElementById("Fault_ysh");
	if(ysh){
		ysh.innerHTML='已审核('+dataYSH.length+')';
	}
	
	//如果是从日滨页面跳转过来，就跳过登录页面直接登录
	var page = localStorage.page;
	if(page != "" && page != null && typeof(page) != "undefined"){
		objj.getApplication().getController('fault.FaultHandlingPanelCtrl').FaultListItemTap_DTJ();
	}
	
};

//当是离线状态下进入获取JSONStroe中的数据
function faultHandingPC_NEW4(){
	//建立数据仓
	var FaultList=Ext.data.StoreManager.get('FaultHandlingStore');
	if (!FaultList) { 
		FaultList = Ext.create("HelcPDA.store.fault.FaultHandlingStore"); 
	};

	//console.log('没有网络时，进入readFault');
	var Maintain=collectionName;
	var MaintainList=WL.JSONStore.get(Maintain);
	var query={tcode:'GZ_DAICHULI'};
	var options={
		exacte:false,//默认
		limit:80,//查询最大条数
	};
	MaintainList.find(query,options).then(function(arrayResults){
		var faultNum=arrayResults.length;
		//console.log('readFault从JSONStroe中查询到的数据长度为:'+faultNum);
		var faultDate=[];
		
		var SHnum=0; //记录审核数量
		if(faultNum>0){
			for(var i=0;i<faultNum;i++){
				var oldData=arrayResults[i].json.stext;
				if(oldData.AUDITING_STATUS=='故障报告: '){
					oldData.AUDITING_STATUS='';
				};
				if(oldData.AUDITING_STATUS=='故障报告: 已审核'){
					SHnum++;
				};
				faultDate[i]=oldData;
			};
			
			FaultList.setData(faultDate,this);
		};
		//添加数量
    	var query={tcode:'GZ_DAICHULI',tid:'NUM'};

		MaintainList.find(query,options).then(function(arrayResults){
			var num=arrayResults.length;
			//console.log('NUM查询数量:'+num);
			
			if(num>0){
				var nums=arrayResults[num-1].json.stext;
				
				//console.log('获取查询的NUM:'+JSON.stringify(nums));
				//console.log('获取查询的NUM2:'+JSON.stringify(nums.NUM2));
				
				var numtwoFlaut='待处理('+nums.NUM2+')';
				var numthreeFlaut='处理中('+nums.NUM3+')';
				var numfourFlaut='已驳回('+nums.NUM4+')';

				Ext.getCmp('PendingFault').setHtml(numtwoFlaut);
				Ext.getCmp('ProcessingFault').setHtml(numthreeFlaut);
				Ext.getCmp('HasBeenRejectedFault').setHtml(numfourFlaut);
				
				//添加
				var numfiveFlault='已审核('+SHnum+')';
				Ext.getCmp('AuditedFault').setHtml(numfiveFlault);
			}
			
			
		}).fail(function(errorObject){
			alert("NUM查询数据失败");
		});
		
	}).fail(function(errorObject){
		alert("readFault查询数据失败");
	});

};



