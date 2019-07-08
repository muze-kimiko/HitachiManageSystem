/**
 * 反馈信息   20140-7-23 xcx 
 */

Ext.define('HelcPDA.controller.fault.FaultHandlingFeedbackPanelCtrl',{
	id:'fhfpCtrl_id',
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			
			/************************************************************************************
			 * 急修处理模块  反馈信息页面
			 * */
			
			//返回按钮
			back_id:'button[id=back_id]',

			//提交按钮
			sbButton_id:'button[id=sbButton_id]',
			
				
			/**
			 **急修处理模块  反馈信息页面
			 ************************************************************************************/	
			
		//fhf_button_id:'button[id=dzButton_id]',
		//kongZButton_id:'button[id=sbButton_id]',
		
		},
		
		control:{
			
			/************************************************************************************
			 * 急修处理模块  反馈信息页面
			 * */
			
			//返回按钮
			'button#back_id':{
				tap:'back_id'
			},

			//提交按钮
			'button#sbButton_id':{
				tap:'sbButton_id'
			},
			
			//退回
			"button#back_id_TH":{
				tap:'back_id_TH'
			},
				
			/**
			 **急修处理模块  反馈信息页面
			 ************************************************************************************/
			
			
/*			fhf_button_id:{
				tap:'intni2'
			},
			kongZButton_id:{
				tap:'changeSave'
			}*/
		
		},
	},
	
	/************************************************************************************
	 * 急修处理模块  反馈信息页面
	 * */
	
	//怎样的情况下都可以退货
	//可能会出现getResult成功，但是getResultTwo失败，这样接口成功方法失败的问题。
	//这样，我就让其使用者，重新填写。
	back_id_TH:function(){
		var stt=Ext.getCmp('FaultFHDP_STATUS').getValue();
		if(stt=='已取消'){
			console.log(stt);
			WL.Toast.show('已取消的故障不能执行');
			return;
		}
		
		var obj=this;
		//出-到-救-完-按钮
		var cf=Ext.getCmp('faultdandlingFP_id_time_id');
		var dc=Ext.getCmp('time_id2');
		var jr=Ext.getCmp('time_id3');
		var wg=Ext.getCmp('time_id4');
		
		/*var cf_T=Ext.getCmp('STATUS_START_TIME');
		var dc_T=Ext.getCmp('STATUS_ARRIVED_TIME');
		var jr_T=Ext.getCmp('STATUS_RESCUE_TIME');
		var wg_T=Ext.getCmp('STATUS_COMPLETE_TIME');*/
		
		console.log(dc);
		console.log(cf);
		if(cf.getValue()==''){
			Ext.Msg.alert('提示','已没有可退时间');
			return;
		};
		Ext.Msg.show({
			title: '温馨提示',
			message: '撤回数据，系统将重新记录提交时间?',
			buttons: [{text:'否', itemId:'no'},{text:'是', itemId:'yes'}],
			fn: function(buttonId) {
				if(buttonId == 'yes'){
					//圈圈页面
					myLoading.show();
					 
					//提交按钮状态
					var  tjan=Ext.getCmp('sbButton_id').getText();
					var ACTID=Ext.getCmp('ACTIVITYID').getValue();
					console.log('ACTID:'+ACTID);
				   	
					//只剩下出发时间没退，就可以退回到场
					if(tjan=='到场'){
						getResultDC=function(result){
		 			    	cc.log(result);
		 			    	if(result.msginfo='撤回成功'){
		 			    		cf.setDisabled(false);
		 			    		cf.setValue('');
		 			    		/*cf_T.setValue('');*/
		 			    		dc.setDisabled(true);
		 			    		dc.setValue('');
		 			    		Ext.getCmp('sbButton_id').setText('出发');
		 			    	};
		 			    	Ext.Msg.alert("温馨提示",result.msginfo);
		 			    };
		 				var content="{'ACTIVITY_ID':'"+ACTID+"'}";
		 				obj.connectServer(getResultDC,'fankuixinxiAction.do?method=toDelete_cf',content);
					}else{
						//one
						getResult=function(result){
							console.log('---------------one----');
							console.log(result);
							var ErrMsg=result.HELPDAInboundWebServiceRollback_Output.ErrMsg;
							if(ErrMsg=="“待处理”数据不允许进行“收回”操作"){
								myLoading.hide();
								Ext.Msg.alert("温馨提示",ErrMsg);
								return;
							};
							
							var number='';
							if(wg.getValue()!=''&&wg.getDisabled()==true){
								cc.log('进1');
								var kr=Ext.getCmp('BOX_UP').getValue();
								if(kr==''){//无困人       完工-到场
									number='FOUR';
								}else{//困人                       完工-救人
									number='THREE';
								};
							}else if(jr.getValue()!=''&&jr.getDisabled()==true){
								cc.log('进2');
								number="TWO";
							}else if(dc.getValue()!=''&&dc.getDisabled()==true){
								cc.log('进3');
								number="ONE";
							}else{
								cc.log('进4');
								return;
							};
							
							console.log('wg:'+wg.getValue());
							console.log('number:'+number);
							var content="{'ACTIVITY_ID':'"+ACTID+"','NUMBER':'"+number+"'}";
							var invocationData2 = {  
									adapter : 'HttpAdapter_PDA',  
									procedure : 'getStories_pda',
									parameters : ['fankuixinxiAction.do?method=to_GoBakc', content]
							};
							obj.connectServer_GZ(getResultTwo,invocationData2);
						};
						
						//two
						getResultTwo=function(result){
							console.log('---------------two');
							console.log(result);
							var Msg = eval("("+result.content+")"); 
							var MSGID=Msg.msgid;
							var MSGINFO=Msg.msginfo;
							console.log(result.content);
							console.log(MSGID);
							console.log(MSGINFO);
							if(MSGID==0){
								console.log('节点退回'+MSGINFO+'请退回到到场时间');
								WL.Toast.show('节点退回'+MSGINFO+'请退回到到场时间');
								return;
							};
							if(MSGID==1){//      到场  退回
								Ext.getCmp('sbButton_id').setText('到场');
								dc.setDisabled(false);
								dc.setValue('');
								/*dc_T.setValue('');*/
								jr.setDisabled(true);
								jr.setValue('');
								/*jr_T.setValue('');*/
								wg.setDisabled(true);
								wg.setValue('');
								/*wg_T.setValue('');*/
							}else if(MSGID==2){// 退到 救人
								Ext.getCmp('sbButton_id').setText('救人');
								jr.setDisabled(false);
								jr.setValue('');
								/*jr_T.setValue('');*/
								wg.setDisabled(true);
								wg.setValue('');
								/*wg_T.setValue('');*/
							}else if(MSGID==3){// 从   完工  退到 救人
								Ext.getCmp('sbButton_id').setText('完工');
								wg.setDisabled(false);
								wg.setValue('');
								wg_T.setValue('');
								Ext.getCmp('sbButton_id').setDisabled(false);
							}else if(MSGID==4){//从   完工 退到  到场
								Ext.getCmp('sbButton_id').setText('完工');
								wg.setDisabled(false);
								wg.setValue('');
								/*wg_T.setValue('');*/
								Ext.getCmp('sbButton_id').setDisabled(false);
							};
							myLoading.hide();
						};
						
						var invocationData = {  
								adapter : 'HttpAdapter_PDA_Fault',
								procedure : 'PDATHGZCLGCJD',
								parameters : [ACTID]
						};
						obj.connectServer_GZ(getResult,invocationData);
						
					};
					
					
				}
			}
		});
				
		
	},
	
	
	
	//返回按钮
	back_id:function(){
//		this.showBackView('FaultFHDP','HelcPDA.view.fault.FaultHandlingDetailPanel');
//		faultHandingPC_NEW(this);
		MainCtr.BackView();
		faultHandingPC_NEW(MainCtr);
	},
		
	//提交按钮
	sbButton_id:function(){
		var stt=Ext.getCmp('FaultFHDP_STATUS').getValue();
		if(stt=='已取消'){
			console.log(stt);
			WL.Toast.show('已取消的故障不能执行');
			return;
		}
		this_obj=this;
		//提交按钮状态
		var  tjan=Ext.getCmp('sbButton_id').getText();
		//获得活动ID 
		var ACTID=Ext.getCmp('ACTIVITYID').getValue();
		
		//获得定位地址
		cordova.exec(function(res) {
			var ADDRESS=res.Address;
			var X=res.Longitude;
			var Y=res.Latitude;
			//判断
			if(tjan=='出发'){
				this_obj.cf(this_obj,ACTID,ADDRESS,X,Y);
			}else if(tjan=='到场'){
				this_obj.dc(this_obj,ACTID,ADDRESS,X,Y);
			}else if(tjan=='救人'){
				this_obj.jr(this_obj,ACTID,ADDRESS,X,Y);
			}else if(tjan=='完工'){
				this_obj.wg(this_obj,ACTID,ADDRESS,X,Y);
			};
		}, function(err) {
			
			//判断
			if(tjan=='出发'){
				this_obj.cf(this_obj,ACTID,'',0,0);
			}else if(tjan=='到场'){
				this_obj.dc(this_obj,ACTID,'',0,0);
			}else if(tjan=='救人'){
				this_obj.jr(this_obj,ACTID,'',0,0);
			}else if(tjan=='完工'){
				this_obj.wg(this_obj,ACTID,'',0,0);
			};
			
			WL.Toast.show("定位失败");
		},"JSMapMain","打卡开始定位",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase()}]);
	
	},
	
	//出发
	cf:function(obj,ACTID,ADDRESS,X,Y){
		//console.log('出发');
		//获得 出发时间
		var cfTime=Ext.getCmp('faultdandlingFP_id_time_id').getValue();	
		if(cfTime==''){
			alert('请填写出发时间');
			WL.Toast.show('请填写出发时间');
			return;
		};
		//	获得授信时间
		var sxTime=Ext.getCmp('START_TIME').getValue();
		//判断时间
	    var cf = (new Date(cfTime)).getTime();
	    var sx = (new Date(sxTime)).getTime();
	    console.log(cf);
	    console.log(sx);
	    if(cf<=sx){
	    	alert('出发时间不能小于受信时间');
	    	WL.Toast.show('出发时间不能小于受信时间');
	    	return;
	    };
	    Ext.Msg.confirm('注意','出发时间是否确定为:'+cfTime,function(btn){
			if (btn == 'yes'){
				//出发提交结果判断
 			    getResult=function(result){
 			    	cc.log(result);
 			    	//console.log('出发 '+JSON.stringify(result));
 			    	if(result.msginfo='保存成功'){
 			    		Ext.getCmp('faultdandlingFP_id_time_id').setDisabled(true);
 			    		Ext.getCmp('time_id2').setDisabled(false);
 			    		Ext.getCmp('sbButton_id').setText('到场');
 			    	};
 			    };
 				var content="{'START_TIME':'"+cfTime+"','ACTIVITY_ID':'"+ACTID+"','ADDRESS':'"+ADDRESS+"','X':'"+X+"','Y':'"+Y+"'}";
 				obj.connectServer(getResult,'fankuixinxiAction.do?method=toAdd_cf',content);
			}else{
				return;
			}
		});
	    /*navigator.notification.confirm('出发时间是否确定为:'+cfTime,function(btn){
 			if(btn ==2){
 				
			}else{
 				return;
 			}
 		},"提示","取消,确定");*/
	    
	},
	
	//到场
	dc:function(obj,ACTID,ADDRESS,X,Y){
		//console.log('到场');
		//获得出发时间
		var cfTime=Ext.getCmp('faultdandlingFP_id_time_id').getValue();	
		//获得到场时间
		var dcTime=Ext.getCmp('time_id2').getValue();	
		//判断到场时间是否为空
		if(dcTime==''){
			return;
		};
		//时间比较
		var cf = (new Date(cfTime)).getTime();
		var dc = (new Date(dcTime)).getTime();
		if(dc<=cf){
		    WL.Toast.show('到场时间不能小于出发时间');
		    return;
		 };
		 
		 Ext.Msg.confirm('注意','到场时间是否确定为:'+dcTime,function(btn){
				if (btn == 'yes'){
					//到场提交结果判断
					getResult=function(result){
						console.log('到场 '+JSON.stringify(result));
				    	if(result.msginfo='保存成功'){
				    		Ext.getCmp('time_id2').setDisabled(true);
				    		Ext.getCmp('time_id3').setDisabled(false);
				    		Ext.getCmp('sbButton_id').setText('救人');
				    		//是否困人
				    		var kr=Ext.getCmp('BOX_UP').getValue();
				    		if(kr==''){
				    			Ext.getCmp('sbButton_id').setText('完工');
				    			Ext.getCmp('time_id3').setDisabled(true);
				    			Ext.getCmp('time_id4').setDisabled(false);
				    		};
				    	}else{
				    		Ext.Mag.alert('温馨提示',result.msginfo);
				    	};
					};
			 	 	var content="{'ARRIVE_TIME':'"+dcTime+"','ACTIVITY_ID':'"+ACTID+"','RESCUE_COMMENT':'','ADDRESS':'"+ADDRESS+"','X':'"+X+"','Y':'"+Y+"'}";
			 	 	obj.connectServer(getResult,'fankuixinxiAction.do?method=toAdd_dc',content);
				}else{
					return;
				}
			});
		
	},
	
	//救人
	jr:function(obj,ACTID,ADDRESS,X,Y){
		//console.log('救人');
		//获得到场时间
		var dcTime=Ext.getCmp('time_id2').getValue();	
		//获得救人时间
		var jrTime=Ext.getCmp('time_id3').getValue();	
		//判断救人时间是否为空
		if(jrTime==''){
			WL.Toast.show('请填写救人时间');
			return;
		};
		//时间比较
		var jr = (new Date(jrTime)).getTime();
		var dc = (new Date(dcTime)).getTime();
		if(jr<=dc){
		    WL.Toast.show('救人时间不能小于到场时间');
		    return;
		 };
		 
		 
		Ext.Msg.confirm('注意','救人时间是否确定为:'+jrTime,function(btn){
				if (btn == 'yes'){
					//困人提交结果判断
					getResult=function(result){
						//console.log('困人 '+JSON.stringify(result));
				    	if(result.msginfo='保存成功'){
				    		Ext.getCmp('time_id3').setDisabled(true);
				    		Ext.getCmp('time_id4').setDisabled(false);
				    		Ext.getCmp('sbButton_id').setText('完工');
				    	};
					};
					var content="{'RESCUE_TIME':'"+jrTime+"','ACTIVITY_ID':'"+ACTID+"','RESCUE_COMMENT':'','ADDRESS':'"+ADDRESS+"','X':'"+X+"','Y':'"+Y+"'}";
					obj.connectServer(getResult,'fankuixinxiAction.do?method=toAdd_jr',content);	
				}else{
					return;
				}
		});
		 
		 
		
	},
	
	//完工
	wg:function(obj,ACTID,ADDRESS,X,Y){
		console.log('进入完工方法');
		//获得到场时间
		var dcTime=Ext.getCmp('time_id2').getValue();	
		//获得救人时间
		var jrTime=Ext.getCmp('time_id3').getValue();	
		//获得完工时间
		var wgTime=Ext.getCmp('time_id4').getValue();	
		//获得是否困人
		var kr=Ext.getCmp('BOX_UP').getValue();
		//时间比较
		var dc = (new Date(dcTime)).getTime();
		var jr = (new Date(jrTime)).getTime();
		var wg=(new Date(wgTime)).getTime();
		
		//判断完工时间是否为空
		if(wgTime==''){
			WL.Toast.show('请填写完工时间');
			return;
		};
		if(kr=='困人'){
			if(wg<=jr){
				 WL.Toast.show('完工时间不能小于困人时间');
				 return;
			};
		}else if(kr==''){
			if(wg<=dc){
				WL.Toast.show('完工时间不能小于到场时间');
				return;
			};
		};
		
		Ext.Msg.confirm('注意','完工时间是否确定为:'+wgTime,function(btn){
			if (btn == 'yes'){
				//完工提交结果判断
				getResult=function(result){
					cc.log('----------9090--------');
					cc.log(result);
              		cc.log(result.msgid);
              		if(result.msgid==1&&result.msginfo=='保存成功'){
              			Ext.getCmp('time_id4').setDisabled(true);
              			Ext.getCmp('sbButton_id').setDisabled(true);
              			faultHandingPC_NEW(obj);
              			Ext.getCmp('FaultFHDP_STATUS').setValue('完工');
              		}else{
              			Ext.Msg.alert("温馨提示","提交完工时间失败,请再试一次");
              		};
              		
				};
				var content="{'REPAIR_COMPLETE_TIME':'"+wgTime+"','ACTIVITY_ID':'"+ACTID+"','RESCUE_COMMENT':'','ADDRESS':'"+ADDRESS+"','X':'"+X+"','Y':'"+Y+"'}";
				obj.connectServerWG(getResult,'fankuixinxiAction.do?method=toAdd_wg',content);
			}else{
				return;
			}
		});
		
	},
	
	/**
	 **急修处理模块  反馈信息页面
	 ************************************************************************************/
	


	
	
	
	intni:function(){
		var project=Ext.getCmp('maintenance_id');
		 if(!project){
			 project=Ext.create('HelcPDA.view.maintain.maintenance_item');
		 }
		
		 Ext.Viewport.setActiveItem(project);
	},
	
    intni2:function(){
    	 //console.log('aa');
    	 var time1=null;
    	 var time2=null;
    	 var time3=null;
    	 var time4=null;
    	 var obj1=Ext.getCmp('Feedback_id');
  		 if(!obj1){
  			 obj1=Ext.create('HelcPDA.view.fault.FaultHandlingFeedbackPanel');                       		 
  	     };
  	     Ext.Viewport.setActiveItem(obj1);
  	     Ext.Viewport.removeMenu('right');
  	     var ATobj=Ext.getCmp('ACTIVITYID');
  	     Activity=ATobj.getValue();
  	     var invocationData = {  
            adapter : 'SqlAdapter_PDA',  
            procedure : 'Departure_Time', 
            parameters : [Activity]
  	     };  
	// console.log('aa');
	WL.Client.invokeProcedure(invocationData, {
        onSuccess : function (result) { 
						var invocationResult=result.invocationResult;
						var isSuccessful=invocationResult.isSuccessful;
						if(isSuccessful==true){
							var resultSet1=invocationResult.resultSet;
						//	alert(resultSet1.length);
							if(resultSet1.length==0){
								var obj=Ext.getCmp('time_id');
								obj.setValue('');
								var obj5=Ext.getCmp('sbButton_id');
								obj5.setText('出发');
							}else if(resultSet1.length==1&&(resultSet1[0].START_TIME!='undefined')){
								//console.log(resultSet1[0].START_TIME);
								 time1=resultSet1[0].START_TIME;
						//		console.log(time);
								var a=resultSet1[0].START_TIME.split("T");
						//		console.log(a[0]);
								var b=a[1].split(":");
						//		console.log(b[0]+":"+b[1]);
							   var str=b[0]+":"+b[1];
							   var str2=a[0]+" "+str;
						//	   console.log(str2);
								var obj=Ext.getCmp('time_id');
						//		console.log(obj);
								obj.setValue(str2);
						//		console.log(obj.getValue());
							}
						
            } else {
            	
            	Ext.Msg.alert('提示','网络出错！'); 
            }
        },  
        onFailure : function () {
        	
        	 Ext.Msg.alert('提示','发送请求失败'); 
        	}
    });
	var invocationData = {  
            adapter : 'SqlAdapter_PDA',  
            procedure : 'Arrival_Time', 
            parameters : [Activity]
    };  
//	 console.log('aa');
	WL.Client.invokeProcedure(invocationData, {
        onSuccess : function (result) { 
						var invocationResult=result.invocationResult;
						var isSuccessful=invocationResult.isSuccessful;
						if(isSuccessful==true){
							var resultSet2=invocationResult.resultSet;
						//	alert(resultSet1.length);
						//	console.log(resultSet1);
						//	console.log(resultSet1.length);
							if(resultSet2.length==0){
								var obj=Ext.getCmp('time_id2');
								obj.setValue('');
								var obj1=Ext.getCmp('time_id');
								value=obj1.getValue();
					//			console.log(value);
								if(value!=''){
					//				console.log('aafdf');
									var obj5=Ext.getCmp('sbButton_id');
									obj5.setText('到场');
								}else{
									
								}
							}else if(resultSet2.length==1&&(resultSet2[0].ARRIVE_TIME!='undefined')){
								//console.log(resultSet2[0].ARRIVE_TIME);
								 time2=resultSet2[0].ARRIVE_TIME;
							//	 console.log(time2);
						//		console.log(time);
								var a=resultSet2[0].ARRIVE_TIME.split("T");
					//			console.log(a[0]);
								var b=a[1].split(":");
					//			console.log(b[0]+":"+b[1]);
							   var str=b[0]+":"+b[1];
							   var str2=a[0]+" "+str;
						//	   console.log(str2);
								var obj=Ext.getCmp('time_id2');
						//		console.log(obj);
								obj.setValue(str2);
						//		console.log(obj.getValue());
							}
						
            } else {
            	
            	Ext.Msg.alert('提示','网络出错！'); 
            }
        },  
        onFailure : function () {
        	
        	 Ext.Msg.alert('提示','发送请求失败'); 
        	}
    });
	var invocationData = {  
            adapter : 'SqlAdapter_PDA',  
            procedure : 'Save_Time', 
            parameters : [Activity]
    };  
	
	WL.Client.invokeProcedure(invocationData, {
        onSuccess : function (result) { 
						var invocationResult=result.invocationResult;
						var isSuccessful=invocationResult.isSuccessful;
						if(isSuccessful==true){
							var resultSet3=invocationResult.resultSet;
							//console.log(resultSet1.length);
							//console.log(resultSet1);
							if(resultSet3.length==0){
								var obj=Ext.getCmp('time_id3');
								  //obj.placeHolder='选择日期';
								obj.setValue('');
								var obj6=Ext.getCmp('time_id');
								value2=obj6.getValue();
								var obj7=Ext.getCmp('time_id2');
								value3=obj7.getValue();
						//		console.log(value2);
						//		console.log(value2);
								var obc=Ext.getCmp('BOX_UP');
						    	var valuel=obc.getValue();
						 //   	console.log(valuel);
						    	var ob12=Ext.getCmp('time_id4');
								var value12=ob12.getValue();
						    	if(valuel=='困人'){
						    		if((value2!='')&&(value3!='')){
						    			 var obj5=Ext.getCmp('sbButton_id');
											obj5.setText('救人');
						    		 }
						    	}else{
						    		if((value2!='')&&(value3!='')&&(value12!=null&&value12!='')){
										var obj5=Ext.getCmp('sbButton_id');
										obj5.setText('已完工');
						    	}else if((value2!='')&&(value3!='')){
						    		var obj5=Ext.getCmp('sbButton_id');
									obj5.setText('完工');
						    	}
						    	}
							}else if(resultSet3.length==1&&(resultSet3[0].RESCUE_TIME!='undefined')){
								time3=resultSet3[0].RESCUE_TIME;
								console.log(time3);
							//	console.log(time3);
								var a=resultSet3[0].RESCUE_TIME.split("T");
						//		console.log(a[0]);
								var b=a[1].split(":");
						//		console.log(b[0]+":"+b[1]);
							   var str=b[0]+":"+b[1];
							   var str2=a[0]+" "+str;
								var obj=Ext.getCmp('time_id3');
								obj.setValue(str2);
						//		console.log(obj.getValue());
							}
							
            } else {
            	
            	Ext.Msg.alert('提示','网络出错！'); 
            }
        },  
        onFailure : function () {
        	
        	 Ext.Msg.alert('提示','发送请求失败'); 
        	}
    });
	var invocationData = {  
            adapter : 'SqlAdapter_PDA',  
            procedure : 'Completion_Time', 
            parameters : [Activity]
    };  
	
	WL.Client.invokeProcedure(invocationData, {
        onSuccess : function (result) { 
						var invocationResult=result.invocationResult;
						var isSuccessful=invocationResult.isSuccessful;
						if(isSuccessful==true){
							var resultSet4=invocationResult.resultSet;
							//console.log(resultSet4.length);
							if(resultSet4.length==0){
								var obj=Ext.getCmp('time_id4');
								obj.setValue('');
								var obj8=Ext.getCmp('time_id');
								value4=obj8.getValue();
								var obj9=Ext.getCmp('time_id2');
								value5=obj9.getValue();
								var obj10=Ext.getCmp('time_id3');
								value6=obj10.getValue();
								if((value4!='')&&(value5!='')&&(value6!='')){
									var obj5=Ext.getCmp('sbButton_id');
									obj5.setText('完工');
								}
							}else if(resultSet4.length==1&&(resultSet4[0].REPAIR_COMPLETE_TIME!='undefined')){
								var obj11=Ext.getCmp('time_id');
								value11=obj11.getValue();
								var obj12=Ext.getCmp('time_id2');
								value12=obj12.getValue();
								var obj13=Ext.getCmp('time_id3');
								value13=obj13.getValue();
								if((value11!='')&&(value12!='')&&(value13!='')){
								var obj14=Ext.getCmp('sbButton_id');
								obj14.setText('已完工');
								}
								time4=resultSet4[0].REPAIR_COMPLETE_TIME;
								//console.log(resultSet4[0].REPAIR_COMPLETE_TIME);
								var a=resultSet4[0].REPAIR_COMPLETE_TIME.split("T");
						//		console.log(a[0]);
								var b=a[1].split(":");
						//		console.log(b[0]+":"+b[1]);
							   var str=b[0]+":"+b[1];
							   var str2=a[0]+" "+str;
								var obj=Ext.getCmp('time_id4');
								obj.setValue(str2);
						//		console.log(obj.getValue());
							}
						
            } else {
            	
            	Ext.Msg.alert('提示','网络出错！'); 
            }
        },  
        onFailure : function () {
        	
        	 Ext.Msg.alert('提示','发送请求失败'); 
        	}
    });
	
    	
    	 
    },
    changeSave:function(){
    	var obj=Ext.getCmp('sbButton_id');
    	var textValue=obj.getText();
    //	console.log(textValue);
    	var obc=Ext.getCmp('BOX_UP');
    	var valuel=obc.getValue();
    //	console.log(valuel);
    	if(textValue=='出发'){
    		var obj1=Ext.getCmp('time_id');
    	var value1=obj1.getValue();
    	 var ATobj=Ext.getCmp('ACTIVITYID');
	 	 Activity=ATobj.getValue();
    //	console.log(value1);
    //	console.log(Activity);
    	if(value1!=null&&value1!=''){
    	 	 var obj2=Ext.getCmp('START_TIME');
    //	 	 console.log('aa');
    	 	 var value2=obj2.getValue();
    //	 	 console.log(value1);
    	      var oldTime = (new Date(value1)).getTime();
    	      var oldTime2 = (new Date(value2)).getTime();
    //	      console.log(oldTime);
    //	      console.log(oldTime2);
    	      if(oldTime<=oldTime2){
    	    	  WL.Toast.show('出发时间不能小于受信时间');
    	    //	  alert('出发时间不能小于受信时间');
    	      }else{
    	    	  var ATobj=Ext.getCmp('ACTIVITYID');
    	    	 	 Activity=ATobj.getValue();
    	    	 	getResult=function(res){
    	    	 		str = res.msginfo;
    	    	 		var obj5=Ext.getCmp('sbButton_id');
						obj5.setText('到场');
    	    	// 		Ext.Msg.alert(str);
    	    	 //		alert(JSON.stringify(res));
    	    	 		
    	    	 	};
    	    	 	var content="{'START_TIME':'"+value1+"','ACTIVITY_ID':'"+Activity+"'}";
    	    	 	this.connectServer(getResult,'fankuixinxiAction.do?method=toAdd_cf',content);
    	      }
    	}else if(value1==''){
    		  WL.Toast.show('请填写出发时间');
	    //	  alert('请填写出发时间');
    	}
    	}else if(textValue=='到场'){
    		
    		var obj1=Ext.getCmp('time_id2');
        	var value12=obj1.getValue();
        	 var ATobj=Ext.getCmp('ACTIVITYID');
    	 	 Activity=ATobj.getValue();
       // 	console.log(value1);
      //  	console.log(Activity);
        	if(value12!=null&&value12!=''){
        	 	 var obj23=Ext.getCmp('time_id');
        	 	 //console.log('aa');
        	 	 var value23=obj23.getValue();
        	 	 //console.log(value12);
        	      var oldTime = (new Date(value12)).getTime();
        	      var oldTime2 = (new Date(value23)).getTime();
        	      //console.log(oldTime);
        	      //console.log(oldTime2);
        	      if(oldTime<=oldTime2){
        	    	  WL.Toast.show('到场时间不能小于出发时间');
        	    	  alert('到场时间不能小于出发时间');
        	      }else{
        	    	  var ATobj=Ext.getCmp('ACTIVITYID');
        	    	 	 Activity=ATobj.getValue();
        	    	 	 //console.log(value12);
        	    	 	 //console.log(Activity);
        	    	 	getResult=function(res){
        	    	 		var obc=Ext.getCmp('BOX_UP');
        	    	 		var obcValue=obc.getValue();
        	    	 		if(obcValue=='困人'){
        	    	 			var obj5=Ext.getCmp('sbButton_id');
        						obj5.setText('救人');
        	    	 		}else{
        	    	 			var obj5=Ext.getCmp('sbButton_id');
        						obj5.setText('完工');
        	    	 		}
        	    	 		
        	    	// 		str = res.msginfo;
        	    	// 		Ext.Msg.alert(str);
        	  //  	 		alert(JSON.stringify(res));
        	    	 		
        	    	 	};
        	    	 	var content="{'ARRIVE_TIME':'"+value12+"','ACTIVITY_ID':'"+Activity+"','RESCUE_COMMENT':''}";
        	    	 //	var content="{'ARRIVE_TIME':'12','ACTIVITY_ID':'12','RESCUE_COMMENT':'1'}";
        	    	 	this.connectServer(getResult,'fankuixinxiAction.do?method=toAdd_dc',content);
        	    	 	 
        	      }
        	}else if(value12==''){
    		  WL.Toast.show('请填写到场时间');
	    	//  alert('请填写到场时间');
    	}
    	}else if(textValue=='救人'){
    		var obj1=Ext.getCmp('time_id3');
        	var value1=obj1.getValue();
    		if(value1==''){
    			 WL.Toast.show('请填写救人时间');
    	    	  alert('请填写救人时间');
    		}else if(valuel=='困人'){
    			 var ATobj=Ext.getCmp('ACTIVITYID');
        	 	 Activity=ATobj.getValue();
         //   	console.log(value1);
         //   	console.log(Activity);
            	if(value1!=null&&value1!=''){
            	    	 	getResult=function(res){
            	    	 		var obj5=Ext.getCmp('sbButton_id');
        						obj5.setText('完工');
            	    	 //		str = res.msginfo;
            	    	 //		Ext.Msg.alert(str);
            	    	 //		alert(JSON.stringify(res));
            	    	 	};
            	    	 	var content="{'RESCUE_TIME':'"+value1+"','ACTIVITY_ID':'"+Activity+"','RESCUE_COMMENT':''}";
            	    	 	this.connectServer(getResult,'fankuixinxiAction.do?method=toAdd_jr',content);
            	}
            	}else if(valuel=='不困人'){
      			
      		}
    	}else if(textValue=='完工'){
    		var obj1=Ext.getCmp('time_id4');
        	var value1=obj1.getValue();
        	 var ATobj=Ext.getCmp('ACTIVITYID');
    	 	 Activity=ATobj.getValue();
        	//console.log(value1);
        	//console.log(Activity);
        	if(value1!=null&&value1!=''){
        	 	 var obj2=Ext.getCmp('time_id2');
       // 	 	 console.log('aa');
        	 	 var value2=obj2.getValue();
        	 	 //console.log(value1);
        	      var oldTime = (new Date(value1)).getTime();
        	      var oldTime2 = (new Date(value2)).getTime();
        	      //console.log(oldTime);
        	      //console.log(oldTime2);
        	      if(oldTime<=oldTime2){
        	    	  WL.Toast.show('完工时间不能早于到场时间');
        	    	  alert('完工时间不能早于到场时间');
        	      }else{
        	    	  var ATobj=Ext.getCmp('ACTIVITYID');
        	    	 	 Activity=ATobj.getValue();
        	    	 	getResult=function(res){
        	    	 		cc.log('完工信息-------------------');
        	    	 		cc.log(res);
        	    	 		var obj5=Ext.getCmp('sbButton_id');
    						obj5.setText('已完工');
        	    	 	//	str = res.msginfo;
        	    	 	//	Ext.Msg.alert(str);
        	    	 	//	alert(JSON.stringify(res));
        	    	 	};
        	    	 	var content="{'REPAIR_COMPLETE_TIME':'"+value1+"','ACTIVITY_ID':'"+Activity+"','RESCUE_COMMENT':''}";
        	    	 	this.connectServer(getResult,'fankuixinxiAction.do?method=toAdd_wg',content);
        	      }
        	}else if(value1==''){
      			 WL.Toast.show('请填写完工时间');
     	    	//  alert('请填写完工时间');
      		}
    	}else if(textValue=='已完工'){
    		 WL.Toast.show('这条数据的反馈信息已处理完成,无需进行任何操作！');
	    //	  alert('这条数据的反馈信息已处理完成,无需进行任何操作！');
    	}
    }
});