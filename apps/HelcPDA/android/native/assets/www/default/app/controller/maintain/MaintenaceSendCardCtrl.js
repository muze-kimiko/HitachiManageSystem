
/* JavaScript content from app/controller/maintain/MaintenaceSendCardCtrl.js in folder common */
var yhs=[];
var gxx=[];
Ext.define('HelcPDA.controller.maintain.MaintenaceSendCardCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'maintenaceSendCardCtrl',
	config:{
		control:{
			"button#MPP_SendCart":{
	           	tap:'MPP_SendCart' 
	        },
	        //返回
	        "button#debugReturnList":{
	        	tap:'debugReturnList'
	        },
	        //返回
	        "button#BackDetail":{
	        	tap:'BackDetail'
	        },
	        // 保养计划进入打卡界面
	        "button#btn_MaintainSencCard":{
	        	tap:'MaintenaceSendCardButton'
	        },
	        //选中一个工号，
	        "list#MaintenaceSendCardList":{
	        	itemtap:'MaintenaceSendCardList'
	        },
	        //开始打卡
	        "button#begin_SendCard":{
	        	tap:"begin_SendCard"
	        },
	        //结束打卡
	        "button#end_SendCard":{
	        	tap:"end_SendCard"
	        },
	        //进入查询页面
	        "button#searchComplet":{
	        	tap:"searchComplet"
	        },
	        //查询页面，查询历史数据
	        "button#toSearch_history":{
	        	tap:"toSearch_history"
	        },
	        //查询工号下
	        "button#toSearch_page":{
	        	tap:"toSearch_page"
	        },
	        //历史未完成打卡
	        "button#searchHistoryComplet":{
				tap:'searchHistoryComplet'
			},
			//历史list进入打卡
			"list#MaintenaceSendCardList1":{
				itemtap:'MaintenaceSendCardList1'
			},
			//无纸化
			"button#btn_report":{
				tap:"btn_report"
			},
			
			 "list#AList_ChengKeZaiHuo": {
	                itemtap: 'onAList_ChengKeZaiHuoItemTap'
	            },
	            "list#BList_ChengKeZaiHuo": {
	                itemtap: 'onAList_ChengKeZaiHuoItemTap'
	            },
	            "list#CList_ChengKeZaiHuo": {
	                itemtap: 'onAList_ChengKeZaiHuoItemTap'
	            },
	            "list#DList_ChengKeZaiHuo": {
	                itemtap: 'onAList_ChengKeZaiHuoItemTap'
	            },
	            "list#EList_ChengKeZaiHuo": {
	                itemtap: 'onAList_ChengKeZaiHuoItemTap'
	            },
	            "list#FList_ChengKeZaiHuo": {
	                itemtap: 'onAList_ChengKeZaiHuoItemTap'
	            },
	            "list#ZList_ChengKeZaiHuo": {
	                itemtap: 'onAList_ChengKeZaiHuoItemTap'
	            },
	            "button#btn_A_ChengKeZaiHuo_Allright": {
	                tap: 'onbtn_A_ChengKeZaiHuo_AllrightTap'
	            },
	            "button#btn_A_ChengKeZaiHuo_Allno": {
	                tap: 'btn_A_ChengKeZaiHuo_Allno'
	            },
	            "button#btn_B_ChengKeZaiHuo_Allright": {
	                tap: 'onbtn_A_ChengKeZaiHuo_AllrightTap'
	            },
	            "button#btn_B_ChengKeZaiHuo_Allno": {
	                tap: 'btn_A_ChengKeZaiHuo_Allno'
	            },
	            "button#btn_C_ChengKeZaiHuo_Allright": {
	                tap: 'onbtn_A_ChengKeZaiHuo_AllrightTap'
	            },
	            "button#btn_C_ChengKeZaiHuo_Allno": {
	                tap: 'btn_A_ChengKeZaiHuo_Allno'
	            },
	            "button#btn_D_ChengKeZaiHuo_Allright": {
	                tap: 'onbtn_A_ChengKeZaiHuo_AllrightTap'
	            },
	            "button#btn_D_ChengKeZaiHuo_Allno": {
	                tap: 'btn_A_ChengKeZaiHuo_Allno'
	            },
	            "button#btn_E_ChengKeZaiHuo_Allright": {
	                tap: 'onbtn_A_ChengKeZaiHuo_AllrightTap'
	            },
	            "button#btn_E_ChengKeZaiHuo_Allno": {
	                tap: 'btn_A_ChengKeZaiHuo_Allno'
	            },
	            "button#btn_F_ChengKeZaiHuo_Allright": {
	                tap: 'onbtn_A_ChengKeZaiHuo_AllrightTap'
	            },
	            "button#btn_F_ChengKeZaiHuo_Allno": {
	                tap: 'btn_A_ChengKeZaiHuo_Allno'
	            },
	            "button#btn_Z_ChengKeZaiHuo_Allright": {
	                tap: 'onbtn_A_ChengKeZaiHuo_AllrightTap'
	            },
	            "button#btn_Z_ChengKeZaiHuo_Allno": {
	                tap: 'btn_A_ChengKeZaiHuo_Allno'
	            },
	            "button#ChengKeZaiHuo_commit":{
	            	tap:'ChengKeZaiHuo_commit'
	            },
	            "button#ChengKeZaiHuo_back":{
	            	tap:'ChengKeZaiHuo_back'
	            },
	            "button#button_qd1":{
	            	tap:'button_qd1'
	            },"button#button_qd2":{
	            	tap:'button_qd2'
	            	
	            },"selectfield#yh":{
	            	change:'yh'
	            },
	            "button#button_qd3":{
	            	tap:'button_qd3'
	            	
	            },"list#yhlist":{
	            	itemtap:'yhlist'
	            },
	            "button#ChengKeZaiHuo_save":{
	                tap:'ChengKeZaiHuo_save'		
	            },
	            //新签名控件
//	            "image#MySign":{
//	            	tap:'MySign'
//	            },
	            "button#okbutton": {
	                tap: 'onOkbuttonTap'
	            },
	            "button#clearbutton": {
	                tap: 'onClearbuttonTap'
	            },"button#backbutton":{
	            	tap: 'backbutton'
	            },"button#button_MySign":{
	            	tap:'button_MySign'
	            }
	            
	            
	            
		}
	},
	MPP_SendCart:function(){
		 
		var MaintainAloneTime= Ext.getCmp('MaintainAloneTime').getValue();
		var query={tcode:'mainfields',tid:MaintainAloneTime};
		this.NextView('maintenaceSendCardPanel','HelcPDA.view.maintain.MaintenaceSendCardPanel');
		var MaintenaceSendCardStore=this.getStore('MaintenaceSendCardStore','HelcPDA.store.maintain.MaintenaceSendCardStore');
		var length=0;
		var k=0;
		var datalist=[];
		MaintainList.find(query).then(function(res){	
			length=res.length;
			//console.log(JSON.stringify(res[0].json.stext));
			for(k=0;k<length;k++){
				var obj={};
				obj.ASSET_NUM=res[k].json.stext.ASSET_NUM;
				findSBL(res[k].json.stext.MP_ID,obj,k,length);
			}
		}).fail(function(){
        });	
		function findSBL(MP_ID,obj,k,length){
			var  queryForItem={tid:MP_ID+"/",tcode:"MAINITEM"};
			MaintainList.find(queryForItem).then(function(rest){
				//console.log("zz:"+JSON.stringify(rest[0].json.stext));
				obj.SBL_ROW_ID=rest[0].json.stext.MP_ID;
				datalist[k]=obj;
				if(k==length-1){
					MaintenaceSendCardStore.setData(datalist);
				}
			}).fail(function(){
	        });
		}
		
	},
	
	// 保养计划进去作业打卡
	MaintenaceSendCardButton : function(objj, e, eopt) {
		var ASSET_NUM= Ext.getCmp("ASSET_NUM").getValue(); 		
		var SBL_ROW_ID=Ext.getCmp('hidden2_stext_MP_ID').getValue(); 
		console.log(SBL_ROW_ID);
		console.log(ASSET_NUM);
		//xcx 17-6-14 暂时这样做（当保养项目没有SBL_ROW_ID，ASSET_NUM 不让维保人员打卡）
		if(SBL_ROW_ID==''||SBL_ROW_ID==null){
			Ext.Msg.alert("温馨提示","保养项目缺少关键数据,暂时无法打卡");
			return;
		}
		if(ASSET_NUM==''||ASSET_NUM==null){
			Ext.Msg.alert("温馨提示","保养项目少了关键数据,暂时无法打卡");
			return;
		}
		var obj=this;
		function getResult(res){
			var msginfo=res.msginfo;
			var msgid=res.msgid;
			var content=res.content;
			console.log(res);
			if(msgid==1||msgid=='1'){
				obj.NextView('maintenaceSendCardDetail','HelcPDA.view.maintain.MaintenaceSendCardDetail');	
				Ext.getCmp('ASSET_NUM').setValue(ASSET_NUM);
				Ext.getCmp('SBL_ROW_ID').setValue(SBL_ROW_ID);
			}else{
				Ext.Msg.confirm('你好',''+msginfo,function(btn){
					if (btn == 'yes'){
						obj.NextView('maintenaceSendCardDetail','HelcPDA.view.maintain.MaintenaceSendCardDetail');
						Ext.getCmp('ASSET_NUM').setValue(ASSET_NUM);
						Ext.getCmp('SBL_ROW_ID').setValue(SBL_ROW_ID);
						if (content.START_TIME != undefined && content.START_TIME != null && START_TIME != "") {
							Ext.getCmp('START_TIME').setValue(content.START_TIME);
							Ext.getCmp('START_ADRESS').setValue(content.START_ADRESS);
							Ext.getCmp('begin_SendCard').setDisabled(true);
						} else {
							Ext.getCmp('begin_SendCard').setDisabled(false);
						}
						if (content.END_TIME != undefined && content.END_TIME != null && END_TIME != "") {
							Ext.getCmp("END_TIME").setValue(content.END_TIME);
							Ext.getCmp("END_ADRESS").setValue(content.END_ADRESS);
							Ext.getCmp('end_SendCard').setDisabled(true);
						} else {
							Ext.getCmp('end_SendCard').setDisabled(false);
						}
					}else{
						//obj.NextView('maintenaceSendCardDetail','HelcPDA.view.maintain.MaintenaceSendCardDetail');
						//Ext.getCmp('ASSET_NUM').setValue(ASSET_NUM);
						//Ext.getCmp('SBL_ROW_ID').setValue(SBL_ROW_ID);
					}
				});	
			}
			
		}
		var tempobj={};
		tempobj.SBL_ROW_ID=SBL_ROW_ID;
		tempobj.ELEVATOR_NO=ASSET_NUM;
		this.connectServer(getResult, 'maintainancePlanItemListAction.do?method=toSearchCard', JSON.stringify(tempobj));
	},
	
	//选中工号，进入详细页面
	MaintenaceSendCardList:function(obj,index,target,record,e,eOpts){
		var ASSET_NUM=record.get('ASSET_NUM'); 		
		var SBL_ROW_ID=record.get('SBL_ROW_ID'); 
		
		if(SBL_ROW_ID==''||SBL_ROW_ID==null){
			Ext.Msg.alert("温馨提示","保养项目缺少关键数据,暂时无法打卡");
			return;
		}
		if(ASSET_NUM==''||ASSET_NUM==null){
			Ext.Msg.alert("温馨提示","保养项目少了关键数据,暂时无法打卡");
			return;
		}
		
		var obj=this;
		function getResult(res){
			var msginfo=res.msginfo;
			var msgid=res.msgid;
			var content=res.content;
			//var tempContent=eval("("+content+")");
			if(msgid==1||msgid=='1'){
				obj.NextView('maintenaceSendCardDetail','HelcPDA.view.maintain.MaintenaceSendCardDetail');	
				Ext.getCmp('ASSET_NUM').setValue(ASSET_NUM);
				Ext.getCmp('SBL_ROW_ID').setValue(SBL_ROW_ID);
			}else{
				Ext.Msg.confirm('你好',''+msginfo,function(btn){
					if (btn == 'yes'){
						obj.NextView('maintenaceSendCardDetail','HelcPDA.view.maintain.MaintenaceSendCardDetail');
						Ext.getCmp('ASSET_NUM').setValue(ASSET_NUM);
						Ext.getCmp('SBL_ROW_ID').setValue(SBL_ROW_ID);
						
						if (content.START_TIME != undefined && content.START_TIME != null && START_TIME != "") {
							Ext.getCmp('START_TIME').setValue(content.START_TIME);
							Ext.getCmp('START_ADRESS').setValue(content.START_ADRESS);
							Ext.getCmp('begin_SendCard').setDisabled(true);
						} else {
							Ext.getCmp('begin_SendCard').setDisabled(false);
						}
						if (content.END_TIME != undefined && content.END_TIME != null && END_TIME != "") {
							Ext.getCmp("END_TIME").setValue(content.END_TIME);
							Ext.getCmp("END_ADRESS").setValue(content.END_ADRESS);
							Ext.getCmp('end_SendCard').setDisabled(true);
						} else {
							Ext.getCmp('end_SendCard').setDisabled(false);
						}
		            }else{
		            	//obj.NextView('maintenaceSendCardDetail','HelcPDA.view.maintain.MaintenaceSendCardDetail');
		            	//Ext.getCmp('ASSET_NUM').setValue(ASSET_NUM);
		   			    //Ext.getCmp('SBL_ROW_ID').setValue(SBL_ROW_ID);
			         }
		         });	
			}
			 
		}
		var tempobj={};
		tempobj.SBL_ROW_ID=SBL_ROW_ID;
		tempobj.ELEVATOR_NO=ASSET_NUM;
		this.connectServer(getResult, 'maintainancePlanItemListAction.do?method=toSearchCard', JSON.stringify(tempobj));
	},
	//开始打卡
	begin_SendCard:function(){
		var obj=this;
	      function getResult1(result){
	    	  var msgid=result.msgid;
	    	  var msginfo=result.msginfo;
	    	  if(msgid==1||msgid=='1'){
	    		  Ext.Msg.alert("提示",msginfo+"");
	    		  return;
	    	  }
			Ext.Msg.confirm('你好',msginfo+'',function(btn){
			if (btn == 'yes'){
				myLoading.show();
				cordova.exec(function(res) {
					var LocationFlag=res.LocationFlag;
					   if("打卡开始定位返回"==LocationFlag){
						  
						  //把手机定位的时间和当前的时间进行比较，如果相差不大用手机定位的时间，如果相差过大用当前时间（想法废弃）
						  //不用打卡返回时间了,改用当前时间
						  /*var res={};
						  res.Address='测试打卡开始地址';
						  res.Longitude='1';
						  res.Latitude='2';*/
						  var CurrentData=new Date();
						  var CurrentDataTwo=Ext.Date.format(CurrentData,'Y-m-d H:i:s');
						  res.Time=CurrentDataTwo;
						  //判断是否获得打卡地址
						  if(res.Address==''||res.Address==null){
								Ext.Msg.alert("温馨提示","没有获得打卡地址,打卡失败");
								return;
						  }
						  if(res.Longitude==''||res.Longitude==null||res.Latitude==''||res.Latitude==null){
							  Ext.Msg.alert("温馨提示","没有获得打卡坐标,打卡失败");
							  return;
						  }
						  
						  Ext.getCmp('START_TIME').setValue(res.Time);
						  Ext.getCmp('START_XY').setValue(res.Longitude+","+res.Latitude);
						  Ext.getCmp('START_ADRESS').setValue(res.Address);
						  Ext.getCmp('begin_SendCard').setDisabled(true);
						  res.Flag="开始定位";
						  res.ELEVATOR_NO=Ext.getCmp('ASSET_NUM').getValue();
						  res.SBL_ROW_ID=Ext.getCmp('SBL_ROW_ID').getValue();
						  res.CREATE_BY=userid;
						  function getResult(res){
							  myLoading.hide();
							  var info=res.msginfo;
							  WL.Toast.show(info);  
						  }
						  obj.asyconnectServer(getResult, 'maintainancePlanItemListAction.do?method=toADDCard', JSON.stringify(res));
					}
				}, function(err) {
					WL.Toast.show("错误:"+err);
				},"JSMapMain","打卡开始定位",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase()}]);
			}else{
	         }
         });   	
	}
	      //判断是否可以打卡
	      var obk={};
	      obk.imsi=document.getElementById('showImsi').innerHTML;
	      obj.connectServer(getResult1, 'maintainancePlanItemListAction.do?method=getPersonContent', JSON.stringify(obk));
	},
	//结束打卡
	end_SendCard:function(){
		var obj=this;
		var begin_SendCard=Ext.getCmp('begin_SendCard').getDisabled();
		if(!begin_SendCard){
			WL.Toast.show("请先开始打开");
		    return;
		}
		Ext.Msg.confirm('你好','确认要结束打卡吗？',function(btn){
			if (btn == 'yes'){
				myLoading.show();
				cordova.exec(function(res) {
					var LocationFlag=res.LocationFlag;
					   if("打卡开始定位返回"==LocationFlag){
				
						  /*var res={};
						  res.Address='测试打卡结束地址';
						  res.Longitude='1';
						  res.Latitude='2';*/
				
						  //判断是否获得打卡地址
						  if(res.Address==''||res.Address==null){
						     Ext.Msg.alert("温馨提示","没有获得打卡地址,打卡失败");
							 return;
						  }
					      if(res.Longitude==''||res.Longitude==null||res.Latitude==''||res.Latitude==null){
						     Ext.Msg.alert("温馨提示","没有获得打卡坐标,打卡失败");
						     return;
						  }
						  //不用打卡返回时间了,改用当前时间
						  var CurrentData=new Date();
					      var CurrentDataTwo=Ext.Date.format(CurrentData,'Y-m-d H:i:s');
						  res.Time=CurrentDataTwo;
							  
						  Ext.getCmp('END_TIME').setValue(res.Time);
						  Ext.getCmp('END_XY').setValue(res.Longitude+","+res.Latitude);
						  Ext.getCmp('END_ADRESS').setValue(res.Address);
						  Ext.getCmp('end_SendCard').setDisabled(true);
						  res.Flag="结束定位";
						  res.ELEVATOR_NO=Ext.getCmp('ASSET_NUM').getValue();
						  res.SBL_ROW_ID=Ext.getCmp('SBL_ROW_ID').getValue();
						  res.CREATE_BY=userid;
						  function getResult(res){
							  myLoading.hide();
							  var info=res.msginfo;
							  WL.Toast.show(info);
						  }
						  obj.asyconnectServer(getResult, 'maintainancePlanItemListAction.do?method=toADDCard', JSON.stringify(res));
					}
				}, function(err) {
					WL.Toast.show("错误:"+err);
				},"JSMapMain","打卡开始定位",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase()}]);
            }else{
	         }
         });   
	},
	//进入完成查询页面
	searchComplet:function(){
		this.NextView('maintenaceSendCardSearch','HelcPDA.view.maintain.MaintenaceSendCardSearch');
		var START_TIME=Ext.getCmp('START_TIME');
		var END_TIME=Ext.getCmp('END_TIME');
		Ext.getCmp('Choice_Style').addListener('change',function(obk,newValue,oldValue,eOpts){
		    	if(newValue=='计划工号查询'){
		    		START_TIME.setHidden(true);
		    		END_TIME.setHidden(true);
		    	}else if(newValue=='打卡数据查询'){
		    		START_TIME.setHidden(false);
		    		END_TIME.setHidden(false);
		    	}else {
		    	}
		    });
	},
	//查询数据
	toSearch_history:function(){
		var obj=this;
		var ELEVATOR_NO=Ext.getCmp('ELEVATOR_NO').getValue();
		var START_TIME=Ext.getCmp('START_TIME').getValue();
		var END_TIME=Ext.getCmp('END_TIME').getValue();
		var Choice_Style=Ext.getCmp('Choice_Style').getValue();
		if(ELEVATOR_NO==''){
			WL.Toast.show('请输入工号');
			return ;
		}
		if(Choice_Style=='计划工号查询'){
			function getResult1(res){
				var content=res.content;
				var length=content.length;
				if(length<1){
					WL.Toast.show("没查找到相关数据");
				}else {
					obj.BackView();
					var MaintenaceSendCardStore=obj.getStore('MaintenaceSendCardStore','HelcPDA.store.maintain.MaintenaceSendCardStore');
					var MaintenaceSendCardList=Ext.getCmp('MaintenaceSendCardList');
					var itemTpl=[
					             '<table border=0 width=100% style="color:#666">',
			                      '    <tr>',
			                      '            <td colspan="2" style="font-size:18px;color:#000;">{ASSET_NUM}</td>',
			                      '    </tr>',
//			                      '    <tr>',
//			                      '        <td style="font-size:8px;">计划年:{PLAN_YEAR}</td>',
//			                      '        <td style="font-size:8px;">计划月:{PLAN_MONTH}</td>',
//			                      '    </tr>',
//			                      '    <tr>',
//			                      '        <td colspan="2" style="font-size:8px;">保养次数:{PLAN_TIMES}</td>',
//			                      '    </tr>',
			                      '</table>'
		                     ];
					MaintenaceSendCardList.setItemTpl(itemTpl);
					MaintenaceSendCardStore.setData(content);
				}
				
				
			}
			var obz={};
			obz.ELEVATOR_NO=ELEVATOR_NO;
			obz.START_TIME=START_TIME;
			this.connectServer(getResult1, 'maintainancePlanItemListAction.do?method=toSearchCompletedAssG', JSON.stringify(obz));
		}else if(Choice_Style=='打卡数据查询'){
			if(START_TIME==''){
				WL.Toast.show('请选择开始日期');
				return ;
			}
			if(END_TIME==''){
				WL.Toast.show('请选择结束日期');
				return ;
			}
			function getResult(res){
				var content=res.content;
				var length=content.length;
				if(length<1){
					WL.Toast.show("没查找到相关数据");
				}else {
				obj.BackView();
				var MaintenaceSendCardStore=obj.getStore('MaintenaceSendCardStore','HelcPDA.store.maintain.MaintenaceSendCardStore');
				var MaintenaceSendCardList=Ext.getCmp('MaintenaceSendCardList');
				var itemTpl=[
	                         '<table border=0 width=100% style="color:#666">',
	                         '    <tr>',
	                         '            <td style="font-size:18px;color:#000;">{ASSET_NUM}</td>',
	                         '    </tr>',
	                         '    <tr>',
	                         '        <td style="font-size:12px;">开始时间:{START_TIME}</td>',
	                         '    </tr>',
	                         '    <tr>',
	                         '        <td style="font-size:12px;">结束时间:{END_TIME}</td>',
	                         '    </tr>',
	                         '</table>'
	                     ];
				MaintenaceSendCardList.setItemTpl(itemTpl);
				MaintenaceSendCardStore.setData(content);
				}
			}
			var obz={};
			obz.ELEVATOR_NO=ELEVATOR_NO;
			obz.START_TIME=START_TIME;
			obz.END_TIME=END_TIME;
			this.connectServer(getResult, 'maintainancePlanItemListAction.do?method=toSearchCompleted', JSON.stringify(obz));
		}else{
			
		}
	},
	//查询工号
	toSearch_page:function(){
		var obj=this;
	    var ELEVATOR_NO=Ext.getCmp('ELEVATOR_NO').getValue();
	    var obz={};
	    obz.ELEVATOR_NO=ELEVATOR_NO;
	    function getResult1(res){
	    	var content=res.content;
			var length=content.length;
			if(length<1){
				WL.Toast.show("没查找到相关数据");
			}else{
				var MaintenaceSendCardStore=obj.getStore('MaintenaceSendCardStore','HelcPDA.store.maintain.MaintenaceSendCardStore');
				MaintenaceSendCardStore.setData(content);
			}
	    	
	    }
	    this.connectServer(getResult1, 'maintainancePlanItemListAction.do?method=toSearchCompletedAssG', JSON.stringify(obz));
	},
	//历史未完成打卡
	searchHistoryComplet:function(){
		var obj=this;
		obj.NextView('maintenaceSendCardHistoryPanel','HelcPDA.view.maintain.MaintenaceSendCardHistoryPanel');
		function getResult(res){
			var content=res.content;
			var length=content.length;
			if(length<1){
				WL.Toast.show("没查找到相关数据");
			}else {
			var MaintenaceSendCardStore=obj.getStore('MaintenaceSendCardStore1','HelcPDA.store.maintain.MaintenaceSendCardStore1');
			var MaintenaceSendCardList=Ext.getCmp('MaintenaceSendCardList1');
			var itemTpl=[
                         '<table border=0 width=100% style="color:#666">',
                         '    <tr>',
                         '            <td style="font-size:18px;color:#000;">{ASSET_NUM}</td>',
                         '    </tr>',
                         '    <tr>',
                         '        <td style="font-size:12px;">开始时间:{START_TIME}</td>',
                         '    </tr>',
                         '    <tr>',
                         '        <td style="font-size:12px;">结束时间:{END_TIME}</td>',
                         '    </tr>',
                         '</table>'
                     ];
			MaintenaceSendCardList.setItemTpl(itemTpl);
			MaintenaceSendCardStore.setData(content);
			}     	
			
			
		}
		var obz={};
		obz.USERID=userid;
		this.connectServer(getResult, 'maintainancePlanItemListAction.do?method=toSearchUnCompleted', JSON.stringify(obz));
	}
	//返回
	,debugReturnList:function(){
		var obj=this;
		var debugReturnList=Ext.getCmp('debugReturnList').getText();
		if(debugReturnList=='地图'){
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
					obj.BackView();
				}else if("工号打卡"==res[0].LocationFlag){
					obj.BackView();
					obj.NextView('sendCard','HelcPDA.view.androidMap.SendCard');
				    var MaintenaceSendCardStore=obj.getStore('MaintenaceSendCardStore','HelcPDA.store.maintain.MaintenaceSendCardStore');
				    MaintenaceSendCardStore.setData([]); 
				}else if("电梯打卡"==res[0].LocationFlag){
					obj.BackView();
				}
				else{
				}
				}, function(err) {
					WL.Toast.show("错误:"+err);
				},"JSMapMain","进入地图",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase()}]); 
		}else{
			this.BackView();
		}
	},
	//历史打卡list选择一个，进入打卡
	MaintenaceSendCardList1:function(obj,index,target,record,e,eOpts){
		var ASSET_NUM=record.get('ASSET_NUM'); 		
		var SBL_ROW_ID=record.get('SBL_ROW_ID'); 
		var obj=this;
//		function getResult(res){
//			var msginfo=res.msginfo;
//			var msgid=res.msgid;
//			var content=res.content;
			//var tempContent=eval("("+content+")");
//			if(msgid==1||msgid=='1'){
//				obj.NextView('maintenaceSendCardDetail','HelcPDA.view.maintain.MaintenaceSendCardDetail');	
//				Ext.getCmp('ASSET_NUM').setValue(ASSET_NUM);
//				Ext.getCmp('SBL_ROW_ID').setValue(SBL_ROW_ID);
//			}else{
				//Ext.Msg.confirm('你好',''+msginfo,function(btn){
//					if (btn == 'yes'){
						obj.NextView('maintenaceSendCardDetail','HelcPDA.view.maintain.MaintenaceSendCardDetail');
						Ext.getCmp('START_TIME').setValue(record.get('START_TIME'));
						Ext.getCmp('START_ADRESS').setValue(record.get('START_ADRESS'));
						Ext.getCmp('begin_SendCard').setDisabled(true);
						Ext.getCmp('ASSET_NUM').setValue(ASSET_NUM);
						Ext.getCmp('SBL_ROW_ID').setValue(SBL_ROW_ID);
//		            }else{
//		            	obj.NextView('maintenaceSendCardDetail','HelcPDA.view.maintain.MaintenaceSendCardDetail');
//		            	Ext.getCmp('ASSET_NUM').setValue(ASSET_NUM);
//		   			    Ext.getCmp('SBL_ROW_ID').setValue(SBL_ROW_ID);
//			         }
		         //});	
//			}
			 
//		}
//		var tempobj={};
//		tempobj.SBL_ROW_ID=SBL_ROW_ID;
//		tempobj.ELEVATOR_NO=ASSET_NUM;
//		this.connectServer(getResult, 'maintainancePlanItemListAction.do?method=toSearchCard', JSON.stringify(tempobj));
		
		
	},
	
	//返回
	BackDetail:function(){
		this.BackView();
	},
	
	btn_report:function(){
		  var obj=this;
		  var ELEVATOR_TYPE=Ext.getCmp('ELEVATOR_TYPE').getValue();
		  var asset_num=Ext.getCmp('ASSET_NUM').getValue();
		  var stdate=Ext.getCmp("ACTUAL_START_DT").getValue();
		  var eddate=Ext.getCmp("ACTUAL_END_DT").getValue();
		  var wbryo=Ext.getCmp('ACTUAL_EMP_ID1').getRecord().get('text')+","+Ext.getCmp('ACTUAL_EMP_ID2').getRecord().get('text');
		  var PLAN_STATUS=Ext.getCmp('PLAN_STATUS_N').getValue();
		  var DOMAIN_NAME = Ext.getCmp('DOMAIN_NAME').getValue();
		  if(stdate==''||eddate==''){
			  Ext.Msg.alert('提示','请先填写实绩时间！');
			  return;
			  
		  }
		  console.log(PLAN_STATUS);
		  if(PLAN_STATUS!='已提交'&&PLAN_STATUS!='已完成'&&PLAN_STATUS!='正在等待提交'){
			  Ext.Msg.alert('提示','请先提交保养计划,才能填写报告书！');
			  return;
		  }
		  //清空store
		  obj.getStore('yhlist','HelcPDA.store.maintain.yhlist').setData([]);
		  yhs=[];
		  console.log("asset_num",asset_num);
		  //先判断是否存在本地数据
		  var query = {formwork: Ext.getCmp('MP_ID').getValue()};
		  var MaintenaceJsonStore=WL.JSONStore.get(collectionName);
		  var options={exact: true};
		  MaintenaceJsonStore.find(query, options)
		  .then(function (re) {
			  console.log("sss",re);
			  if(re.length>0){
				  re=re[re.length-1];
				 Ext.Viewport.removeMenu('right');
				 obj.NextView('ChengKeZaiHuo','HelcPDA.view.maintain.ChengKeZaiHuo');
				    Ext.getCmp('AList_ChengKeZaiHuo').getStore().setData(null);
			    	Ext.getCmp('BList_ChengKeZaiHuo').getStore().setData(null);
			    	Ext.getCmp('CList_ChengKeZaiHuo').getStore().setData(null);
			    	Ext.getCmp('DList_ChengKeZaiHuo').getStore().setData(null);
			        Ext.getCmp('EList_ChengKeZaiHuo').getStore().setData(null);
			        Ext.getCmp('FList_ChengKeZaiHuo').getStore().setData(null);
			        Ext.getCmp('ZList_ChengKeZaiHuo').getStore().setData(null);
				    Ext.getCmp('yhlist').getStore().setData(null);
//			    var sj=['USE_ACCNT_NAME','USED_CODE','','DOC_NUMBER','ASSET_NUM1','PRODUCT_NUMBER','ELEVATOR_FLOOR_STOP','DRIVE_MODE','ASSET_LOAD','ASSET_SPEED',
//	    	        'BIAS_ANGLE','ASSET_HEIGHT','STAIR_WIDTH','MAIN_POWER','USE_SECTION_LENGTH','CYLINDER_AMOUNT','JACKING_TYPE','EDIFICE_NAME','ELEVATOR_MARK','EQU_CODE',
//	    	        'ASSET_ADDRESS','START_DT','END_DT','wblx','report_type','MP_ID_rep','PLAN_START_DT_rep','ACTIVITY_ID','START_TIME','ARRIVE_TIME','REPAIR_COMPLETE_TIME',
//	    	        'COMPANY_ID','wbry','js','xm','yhpj','yhyj','signature'];
//			  
			    	Ext.getCmp('USE_ACCNT_NAME').setValue(re.json.USE_ACCNT_NAME);
			    	Ext.getCmp('USED_CODE').setValue(re.json.USED_CODE);
			    	Ext.getCmp('DOC_NUMBER').setValue(re.json.DOC_NUMBER);
			    	Ext.getCmp('ASSET_NUM1').setValue(re.json.ASSET_NUM1);
			    	Ext.getCmp('PRODUCT_NUMBER').setValue(re.json.PRODUCT_NUMBER);
			    	Ext.getCmp('ELEVATOR_FLOOR_STOP').setValue(re.json.ELEVATOR_FLOOR_STOP);
			    	Ext.getCmp('DRIVE_MODE').setValue(re.json.DRIVE_MODE);
			    	Ext.getCmp('ASSET_LOAD').setValue(re.json.ASSET_LOAD);
			    	Ext.getCmp('ASSET_SPEED').setValue(re.json.ASSET_SPEED);
			    	Ext.getCmp('BIAS_ANGLE').setValue(re.json.BIAS_ANGLE);
			    	Ext.getCmp('ASSET_HEIGHT').setValue(re.json.ASSET_HEIGHT);
			    	Ext.getCmp('STAIR_WIDTH').setValue(re.json.STAIR_WIDTH);
			    	Ext.getCmp('MAIN_POWER').setValue(re.json.MAIN_POWER);
			    	Ext.getCmp('USE_SECTION_LENGTH').setValue(re.json.USE_SECTION_LENGTH);
			    	Ext.getCmp('CYLINDER_AMOUNT').setValue(re.json.CYLINDER_AMOUNT);
			    	Ext.getCmp('JACKING_TYPE').setValue(re.json.JACKING_TYPE);
			    	Ext.getCmp('EDIFICE_NAME').setValue(re.json.EDIFICE_NAME);
			    	Ext.getCmp('ELEVATOR_MARK').setValue(re.json.ELEVATOR_MARK);
			    	Ext.getCmp('EQU_CODE').setValue(re.json.EQU_CODE);
			    	Ext.getCmp('ASSET_ADDRESS').setValue(re.json.ASSET_ADDRESS);
			    	Ext.getCmp('START_DT').setValue(re.json.START_DT);
			    	Ext.getCmp('END_DT').setValue(re.json.END_DT);
			    	Ext.getCmp('wblx').setValue(re.json.wblx);
			    	Ext.getCmp('report_type').setValue(re.json.report_type);
			    	Ext.getCmp('MP_ID_rep').setValue(re.json.MP_ID_rep);
			    	Ext.getCmp('PLAN_START_DT_rep').setValue(re.json.PLAN_START_DT_rep);
			    	Ext.getCmp('ACTIVITY_ID').setValue(re.json.ACTIVITY_ID);
			    	Ext.getCmp('START_TIME').setValue(re.json.START_TIME);
			    	Ext.getCmp('ARRIVE_TIME').setValue(re.json.ARRIVE_TIME);
			    	Ext.getCmp('REPAIR_COMPLETE_TIME').setValue(re.json.REPAIR_COMPLETE_TIME);
			    	Ext.getCmp('COMPANY_ID').setValue(re.json.COMPANY_ID);
			    	Ext.getCmp('wbry').setValue(re.json.wbry);
			    	Ext.getCmp('js').setValue(re.json.js);
			    	Ext.getCmp('xm').setValue(re.json.xm);
			    	Ext.getCmp('yhpj').setValue(re.json.yhpj);
			    	Ext.getCmp('yhyj').setValue(re.json.yhyj);
			    	//Ext.getCmp('signature').setValue(re.json.signature);
			    	//Ext.getCmp('MySign').setSrc(re.json.signature);
			    	Ext.getCmp('saveflag').setValue("save");
			    	Ext.getCmp('jsonstoreid').setValue(re._id);
			    	
			    	Ext.getCmp('yhlist').getStore().setData(re.json.yhlist);
			    	Ext.getCmp('AList_ChengKeZaiHuo').getStore().setData(re.json.lista);
			    	Ext.getCmp('BList_ChengKeZaiHuo').getStore().setData(re.json.listb);
			    	Ext.getCmp('CList_ChengKeZaiHuo').getStore().setData(re.json.listc);
			    	Ext.getCmp('DList_ChengKeZaiHuo').getStore().setData(re.json.listd);
			        Ext.getCmp('EList_ChengKeZaiHuo').getStore().setData(re.json.liste);
			        Ext.getCmp('FList_ChengKeZaiHuo').getStore().setData(re.json.listf);
			        Ext.getCmp('ZList_ChengKeZaiHuo').getStore().setData(re.json.listz);
			        
			        Ext.getCmp('yh').setOptions(re.json.yh);
			        Ext.getCmp('tjstatus').setValue(re.json.tjstatus);
			         
			        var type=re.json.report_type;
			        if(type=='ck'){
						report_type='乘客电梯、载货电梯保养维修报告书';
						Ext.getCmp('BIAS_ANGLE').setHidden(true);
						Ext.getCmp('ASSET_HEIGHT').setHidden(true);
						Ext.getCmp('STAIR_WIDTH').setHidden(true);
						Ext.getCmp('MAIN_POWER').setHidden(true);
						Ext.getCmp('USE_SECTION_LENGTH').setHidden(true);
						Ext.getCmp('CYLINDER_AMOUNT').setHidden(true);
						Ext.getCmp('JACKING_TYPE').setHidden(true);
				        //修改
						//Ext.getCmp('DRIVE_MODE').setValue('曳引');
					}
					else if(type=='yy'){
						report_type='液压电梯保养维修报告书';
						Ext.getCmp('BIAS_ANGLE').setHidden(true);
						Ext.getCmp('ASSET_HEIGHT').setHidden(true);
						Ext.getCmp('STAIR_WIDTH').setHidden(true);
						Ext.getCmp('MAIN_POWER').setHidden(true);
						Ext.getCmp('USE_SECTION_LENGTH').setHidden(true);
						//修改
						//Ext.getCmp('DRIVE_MODE').setValue('液压');
					}
					else if(type=='zw'){
						report_type='杂物电梯保养维修报告书';
						Ext.getCmp('BIAS_ANGLE').setHidden(true);
						Ext.getCmp('ASSET_HEIGHT').setHidden(true);
						Ext.getCmp('STAIR_WIDTH').setHidden(true);
						Ext.getCmp('MAIN_POWER').setHidden(true);
						Ext.getCmp('USE_SECTION_LENGTH').setHidden(true);
						Ext.getCmp('CYLINDER_AMOUNT').setHidden(true);
						Ext.getCmp('JACKING_TYPE').setHidden(true);
						//修改
						//Ext.getCmp('DRIVE_MODE').setValue('曳引');
					}
					else if(type=='zd'){
						report_type='自动扶梯、自动人行道保养维修报告书';
						Ext.getCmp('ASSET_LOAD').setHidden(true);
						Ext.getCmp('CYLINDER_AMOUNT').setHidden(true);
						Ext.getCmp('JACKING_TYPE').setHidden(true);
					}
			        
			        var TASK_NAME=Ext.getCmp("wblx").getValue();
			        var weekarray;
			        if(ELEVATOR_TYPE == '直梯'){
			        	weekarray = {'11-12':'季度','23-24':'半年','35-36':'季度','49-50':'年度'};
			        }else{
			        	weekarray = {'11-12':'季度','25-26':'半年','37-38':'季度','49-50':'年度'};
			        }

					var items=Ext.getCmp('report_tab').getTabBar().getInnerItems();
					//隐藏专项 和F项
			        console.log('items',items);
			        items[5].setHidden(true);
			        items[7].setHidden(true);
//			        if(TASK_NAME.indexOf("半月")!=-1){
			        if(weekarray[Ext.getCmp('PLAN_WEEK').getValue()] == undefined){
						
						if(type!='zd'){
			        	items[2].setHidden(true);
			        	items[3].setHidden(true);
			        	items[4].setHidden(true);
			        	items[6].setHidden(true);
			        	items[7].setHidden(true);
			        	gxx[0]="A";
						}else{
							items[2].setHidden(true);
				        	items[3].setHidden(true);
				        	items[4].setHidden(true);
				        	items[5].setHidden(true);
				        	//扶梯有e1和e6
				        	//items[6].setHidden(true);
				        	items[7].setHidden(true);
				        	gxx[0]="A";
				        	gxx[1]="E";
						}
//					}else if(TASK_NAME.indexOf("半年")!=-1){
			        }else if(weekarray[Ext.getCmp('PLAN_WEEK').getValue()] == '半年'){
					
						if(type!='zd'){		
						items[4].setHidden(true);
						items[6].setHidden(true);
						items[7].setHidden(true);
						gxx[0]="A";
						gxx[1]="B";
						gxx[2]="C";
						}else{
							items[4].setHidden(true);
							items[5].setHidden(true);
							items[7].setHidden(true);
							gxx[0]="A";
							gxx[1]="B";
							gxx[2]="E";
						}
							
//					}else if(TASK_NAME.indexOf("季度")!=-1){
			        }else if(weekarray[Ext.getCmp('PLAN_WEEK').getValue()] == '季度'){
						
						if(type!='zd'){
						items[3].setHidden(true);
			        	items[4].setHidden(true);
			        	items[6].setHidden(true);
			        	items[7].setHidden(true);
			        	gxx[0]="A";
						gxx[1]="B";
						}else{
							items[3].setHidden(true);
				        	items[4].setHidden(true);
				        	items[5].setHidden(true);
				        	items[7].setHidden(true);
				        	gxx[0]="A";
							gxx[1]="B";
						}
//					}else if(TASK_NAME.indexOf("年度")!=-1){
			        }else if(weekarray[Ext.getCmp('PLAN_WEEK').getValue()] == '年度'){
						if(type!='zd'){
							gxx[0]="A";
							gxx[1]="B";
							gxx[2]="C";
							gxx[3]="D";
							if(type!="ck"){
				        	items[6].setHidden(true);
							}else{
							gxx[4]="E";	
							}
				        	items[7].setHidden(true);
							}else{
					        	items[5].setHidden(true);
					        	gxx[0]="A";
								gxx[1]="B";
								gxx[2]="C";
								gxx[3]="D";
								gxx[4]="E";
					   }
						
					}
			        var query = {formwork: Ext.getCmp('MP_ID').getValue()+"signature"};
			        var options={exact: true};
			        MaintenaceJsonStore.find(query, options)
					  .then(function (re) {
						  re=re[re.length-1];
						  //Ext.getCmp('signature').setValue(re.json.signature);
						  Ext.getCmp('MySign').setSrc(re.json.signature);
						  Ext.getCmp('jsonstoreid2').setValue(re._id);
					  }).fail(function(re){
						  console.log("fail!");
					  })
//			        cordova.exec(isOk,isFailure,'Signature','tobase64',[{
//			    		signature:re.json.signature
//			    	}]);
//			    	function isOk(re) {
//			    		
//			    		var wz=re.indexOf('base64/')+1;
//			    		alert(wz+re);
//			        	var signature=signature.substr(wz);
//			    		Ext.getCmp('signature').setValue(signature);
//			    	}
//			        function isFailure(re){
//			        	alert("失败了！");
//			        }       
                    Ext.getCmp('bgstb').setTitle(report_type);
			        //根据是否提交限制控件
			        if(Ext.getCmp('tjstatus').getValue()=='ok'){
			        	 Ext.getCmp('yhfy').setHidden(false);
					     Ext.getCmp('wbbg').setDisabled(true);
			         	 Ext.getCmp('button_qd1').setDisabled(true);
			         	 Ext.getCmp('button_qd3').setDisabled(true);
			         	var sc=document.getElementsByName('2');
			         	 for(var i=0;i<sc.length;i++){
			         		sc[i].style.display="none";
			         	 }
			         	 //document.getElementById("2").style.display="none";
			         	 Ext.getCmp('button_qd2').setDisabled(true);
			       	     Ext.getCmp('button_MySign').setDisabled(true);
			       	     Ext.getCmp('yhfy').setDisabled(true);
			       	     //Ext.getCmp('DRIVE_MODE').setReadOnly(true);
			       	     Ext.getCmp('more').setHidden(true);
			       	     var bt=['A','B','C','D','E','F','Z'];
			       	     for(var i=0;i<bt.length;i++){
			       	    	Ext.getCmp('btn_'+bt[i]+'_ChengKeZaiHuo_Allright').setDisabled(true);
			       	    	Ext.getCmp('btn_'+bt[i]+'_ChengKeZaiHuo_Allno').setDisabled(true);
			       	    }
			        } 
			    	return;

			  }else{
				  if(ELEVATOR_TYPE=='直梯'){
					  var check_picker;
				        check_picker = Ext.Viewport.add(Ext.create('Ext.Picker', {
				            slots: [
				                {
				                    name:'report_type',
				                    data : [
				                        {text: '乘客电梯、载货电梯保养维修报告书', value:'ck'},
				                        {text: '液压电梯保养维修报告书', value: 'yy'},
				                        {text: '杂物电梯保养维修报告书', value: 'zw'},
				                       // {text: '自动扶梯、自动人行道保养维修报告书', value: 'zd'}
				                    ]
				                }
				            ],
				            listeners:{
				                change:function(obk,values,eOpts){
				                	getReport(values.report_type,obj);
				                	getAssetinfo(asset_num,obj);
				                	
				                	//console.log('07191',Ext.getCmp('report_tab').getTabBar().getInnerItems(),'07192',Ext.getCmp('report_tab').getInnerItems());
				                	//record.set('chk',values.v_chk);
				                },
//				                show:function(){
//				                    //check_picker.setValue({'v_chk':record.get('chk')});
//				                },
				            },
				        }));
				        check_picker.show();
					  }else{
						  getReport('zd',obj);
						  getAssetinfo(asset_num,obj);
					  } 
			  }
			
			})
			.fail(function (errorObject) {
			
			});
		  
//	      var sflag =Ext.getCmp('sflag').getValue();
//		  if(sflag=='save'){
//			  return;
//		  }
		

		 
	//新增

//	  
	function getReport(type,obj){
       obj.NextView('ChengKeZaiHuo','HelcPDA.view.maintain.ChengKeZaiHuo');
       Ext.getCmp('AList_ChengKeZaiHuo').getStore().setData(null);
       Ext.getCmp('BList_ChengKeZaiHuo').getStore().setData(null);
       Ext.getCmp('CList_ChengKeZaiHuo').getStore().setData(null);
   	   Ext.getCmp('DList_ChengKeZaiHuo').getStore().setData(null);
       Ext.getCmp('EList_ChengKeZaiHuo').getStore().setData(null);
       Ext.getCmp('FList_ChengKeZaiHuo').getStore().setData(null);
       Ext.getCmp('ZList_ChengKeZaiHuo').getStore().setData(null);
	   Ext.getCmp('yhlist').getStore().setData(null);
       
       Ext.getCmp('report_type').setValue(type);
  	   Ext.getCmp('START_DT').setValue(stdate);
	   Ext.getCmp('END_DT').setValue(eddate);
	   Ext.getCmp('wbry').setValue(wbryo);
	   if(Ext.getCmp('D_DOMAIN_NAME'))Ext.getCmp('D_DOMAIN_NAME').setValue(DOMAIN_NAME);
	    var report_type=null;
	    var ftflag="";
		if(type=='ck'){
			report_type='乘客电梯、载货电梯保养维修报告书';
			Ext.getCmp('BIAS_ANGLE').setHidden(true);
			Ext.getCmp('ASSET_HEIGHT').setHidden(true);
			Ext.getCmp('STAIR_WIDTH').setHidden(true);
			Ext.getCmp('MAIN_POWER').setHidden(true);
			Ext.getCmp('USE_SECTION_LENGTH').setHidden(true);
			Ext.getCmp('CYLINDER_AMOUNT').setHidden(true);
			Ext.getCmp('JACKING_TYPE').setHidden(true);
	        //修改
//			console.log(Ext.getCmp('DRIVE_MODE'));
//			Ext.getCmp('DRIVE_MODE').setValue('曳引');
	
		}
		else if(type=='yy'){
			report_type='液压电梯保养维修报告书';
			Ext.getCmp('BIAS_ANGLE').setHidden(true);
			Ext.getCmp('ASSET_HEIGHT').setHidden(true);
			Ext.getCmp('STAIR_WIDTH').setHidden(true);
			Ext.getCmp('MAIN_POWER').setHidden(true);
			Ext.getCmp('USE_SECTION_LENGTH').setHidden(true);
			//修改
//			Ext.getCmp('DRIVE_MODE').setValue('液压');
		}
		else if(type=='zw'){
			report_type='杂物电梯保养维修报告书';
			Ext.getCmp('BIAS_ANGLE').setHidden(true);
			Ext.getCmp('ASSET_HEIGHT').setHidden(true);
			Ext.getCmp('STAIR_WIDTH').setHidden(true);
			Ext.getCmp('MAIN_POWER').setHidden(true);
			Ext.getCmp('USE_SECTION_LENGTH').setHidden(true);
			Ext.getCmp('CYLINDER_AMOUNT').setHidden(true);
			Ext.getCmp('JACKING_TYPE').setHidden(true);
			//修改
//			Ext.getCmp('DRIVE_MODE').setValue('曳引');
		}
		else if(type=='zd'){
			report_type='自动扶梯、自动人行道保养维修报告书';
			Ext.getCmp('ASSET_LOAD').setHidden(true);
			Ext.getCmp('CYLINDER_AMOUNT').setHidden(true);
			Ext.getCmp('JACKING_TYPE').setHidden(true);
			//判断特殊类型
			var prostore=obj.getStore('MaintenaceProtectPrjectStore','HelcPDA.store.maintain.MaintenaceProtectPrjectStore');
		    for(var i=0;i<prostore.getCount();i++){
		    	if(prostore.getAt(i).get('TASK_ROW_ID')=='1-EUGE'||prostore.getAt(i).get('TASK_ROW_ID')=='1-EUG8'){
		    		ftflag=ftflag+prostore.getAt(i).get('TASK_ROW_ID')+',';
		    	}
		    }
		    console.log('ftflag',ftflag);
		}
		//根据维保类型自动生成模板		
		var TASK_NAME=Ext.getCmp("TASK_NAME").getValue();
		var query={formwork:report_type,formwork_type:'halfmonth,season,halfyear,fullyear,repair'};
		var options={exact:false};
		var items=Ext.getCmp('report_tab').getTabBar().getInnerItems();
		//隐藏专项 和F项
        console.log('items',items);
        items[5].setHidden(true);
        items[7].setHidden(true);
        
        if(Ext.getCmp('ELEVATOR_TYPE').getValue() == '直梯'){
        	weekarray = {'11-12':'季度','23-24':'半年','35-36':'季度','49-50':'年度'};
        }else{
        	weekarray = {'11-12':'季度','25-26':'半年','37-38':'季度','49-50':'年度'};
        }
        
//        if(TASK_NAME.indexOf("半月")!=-1){
        if(weekarray[Ext.getCmp('PLAN_WEEK').getValue()] == undefined){
			query={formwork:report_type,formwork_type:'halfmonth'};
			if(type!='zd'){
        	items[2].setHidden(true);
        	items[3].setHidden(true);
        	items[4].setHidden(true);
        	items[6].setHidden(true);
        	items[7].setHidden(true);
        	gxx[0]="A";
			}else{
				items[2].setHidden(true);
	        	items[3].setHidden(true);
	        	items[4].setHidden(true);
	        	items[5].setHidden(true);
	        	//扶梯有e1和e6
	        	//items[6].setHidden(true);
	        	items[7].setHidden(true);
	        	gxx[0]="A";
	        	gxx[1]="E";
			}
//		}else if(TASK_NAME.indexOf("半年")!=-1){
        }else if(weekarray[Ext.getCmp('PLAN_WEEK').getValue()] == '半年'){
			query={formwork:report_type,formwork_type:'halfyear'};
			if(type!='zd'){		
			items[4].setHidden(true);
			items[6].setHidden(true);
			items[7].setHidden(true);
			gxx[0]="A";
			gxx[1]="B";
			gxx[2]="C";
			}else{
				items[4].setHidden(true);
				items[5].setHidden(true);
				items[7].setHidden(true);
				gxx[0]="A";
				gxx[1]="B";
				gxx[2]="E";
			}
				
//		}else if(TASK_NAME.indexOf("季度")!=-1){
        }else if(weekarray[Ext.getCmp('PLAN_WEEK').getValue()] == '季度'){
			query={formwork:report_type,formwork_type:'season'};
			if(type!='zd'){
			items[3].setHidden(true);
        	items[4].setHidden(true);
        	items[6].setHidden(true);
        	items[7].setHidden(true);
        	gxx[0]="A";
			gxx[1]="B";
			}else{
				items[3].setHidden(true);
	        	items[4].setHidden(true);
	        	items[5].setHidden(true);
	        	items[7].setHidden(true);
	        	gxx[0]="A";
				gxx[1]="B";
			}
//		}else if(TASK_NAME.indexOf("年度")!=-1){
        }else if(weekarray[Ext.getCmp('PLAN_WEEK').getValue()] == '年度'){
			query={formwork:report_type,formwork_type:'fullyear'};
			if(type!='zd'){
				gxx[0]="A";
				gxx[1]="B";
				gxx[2]="C";
				gxx[3]="D";
				if(type!="ck"){
	        	items[6].setHidden(true);
				}else{
				gxx[4]="E";	
				}
	        	items[7].setHidden(true);
	        	
				}else{
		        	items[5].setHidden(true);
		        	gxx[0]="A";
					gxx[1]="B";
					gxx[2]="C";
					gxx[3]="D";
					gxx[4]="E";
		   }
			
		}else {
			query={formwork:report_type,formwork_type:'fullyear'};
		}
	

		WL.JSONStore.get(collectionName).find(query,options).then(function(res){
			//console.log(res);
			var tmpData = Ext.getCmp('AList_ChengKeZaiHuo').getStore() ;
			var tmpData1 = Ext.getCmp('BList_ChengKeZaiHuo').getStore() ;
			var tmpData2 = Ext.getCmp('CList_ChengKeZaiHuo').getStore() ;
			var tmpData3 = Ext.getCmp('DList_ChengKeZaiHuo').getStore() ;
			var tmpData4 = Ext.getCmp('ZList_ChengKeZaiHuo').getStore() ;
			var tmpData5 = Ext.getCmp('EList_ChengKeZaiHuo').getStore() ;
			var tmpData6 = Ext.getCmp('FList_ChengKeZaiHuo').getStore() ;
			var sdataa=[];
			var sdatab=[];
			var sdatac=[];
			var sdatad=[];
			var sdataz=[];
			var sdatae=[];
			var sdataf=[];
			
			for(var i=0;i<res.length;i++){
				if(res[i].json.project_num.indexOf('A')!=-1){
				var sobj={};
				sobj.formwork_id=res[i].json.formwork_id;
				sobj.num=res[i].json.project_num;
				sobj.con=res[i].json.content;
				sobj.req=res[i].json.demand;
				sobj.chk='';
				sdataa.push(sobj);
				}else if (res[i].json.project_num.indexOf('B')!=-1){
					
					var sobj={};
					sobj.formwork_id=res[i].json.formwork_id;
					sobj.num=res[i].json.project_num;
					sobj.con=res[i].json.content;
					sobj.req=res[i].json.demand;
					sobj.chk='';
					sdatab.push(sobj);	
					
				}else if(res[i].json.project_num.indexOf('C')!=-1){
					var sobj={};
					sobj.formwork_id=res[i].json.formwork_id;
					sobj.num=res[i].json.project_num;
					sobj.con=res[i].json.content;
					sobj.req=res[i].json.demand;
					sobj.chk='';
					sdatac.push(sobj);	
					
				}else if(res[i].json.project_num.indexOf('D')!=-1){
					var sobj={};
					sobj.formwork_id=res[i].json.formwork_id;
					sobj.num=res[i].json.project_num;
					sobj.con=res[i].json.content;
					sobj.req=res[i].json.demand;
					sobj.chk='';
					sdatad.push(sobj);	
				}else if(res[i].json.project_num.indexOf('E')!=-1){
					    //特殊选项根据保养项目生成
					     var con=res[i].json.content;
						if(con.indexOf('清洁3(桁架)')!=-1&&ftflag.indexOf('1-EUGE')==-1)
					    {
							continue;
					    }
						if(con.indexOf('大轮轴承部加黄油  ')!=-1&&ftflag.indexOf('1-EUG8')==-1)
					    {
							continue;
					    }
					    var sobj={};
						sobj.formwork_id=res[i].json.formwork_id;
						sobj.num=res[i].json.project_num;
						sobj.con=res[i].json.content;
						sobj.req=res[i].json.demand;
						sobj.chk='';
						sdatae.push(sobj);	
						
				}else if(res[i].json.project_num.indexOf('F')!=-1){
							var sobj={};
							sobj.formwork_id=res[i].json.formwork_id;
							sobj.num=res[i].json.project_num;
							sobj.con=res[i].json.content;
							sobj.req=res[i].json.demand;
							sobj.chk='';
							sdataf.push(sobj);	
						
				}else{
					var sobj={};
					sobj.formwork_id=res[i].json.formwork_id;
					sobj.num=res[i].json.project_num;
					sobj.con=res[i].json.content;
					sobj.req=res[i].json.demand;
					sobj.chk='';
					sdataz.push(sobj);	
					
				}
			};

			tmpData.setData(sdataa);
			tmpData1.setData(sdatab);
			tmpData2.setData(sdatac);
			tmpData3.setData(sdatad);
			tmpData4.setData(sdataz);
			tmpData5.setData(sdatae);
			tmpData6.setData(sdataf);
			
		}).fail(function(err){
			console.log("生成失败！");
		});	
		
		//后增值
//		Ext.getCmp('wblx').setValue(TASK_NAME);
		Ext.getCmp('wblx').setValue(weekarray[Ext.getCmp('PLAN_WEEK').getValue()]?weekarray[Ext.getCmp('PLAN_WEEK').getValue()]:'半月');
		Ext.getCmp('MP_ID_rep').setValue(Ext.getCmp("MP_ID").getValue());
		Ext.getCmp('PLAN_START_DT_rep').setValue(Ext.getCmp("PLAN_START_DT").getValue());
		Ext.getCmp('bgstb').setTitle(report_type);
	}	
	
	 function getAssetinfo(asset_num,obj){
		var getResult =function(res){
			var assetinfo=res.assetinfo;
			var domcon=res.domcon;
		    	Ext.getCmp('USE_ACCNT_NAME').setValue(assetinfo.USE_ACCNT_NAME);
		    	Ext.getCmp('USED_CODE').setValue(assetinfo.USED_CODE);
		    	Ext.getCmp('REGISTER_CODE').setValue(assetinfo.REGISTER_CODE);
		    	Ext.getCmp('ASSET_NUM1').setValue(assetinfo.ASSET_NUM);
		    	Ext.getCmp('PRODUCT_NUMBER').setValue(assetinfo.PRODUCT_NUMBER);
		    	Ext.getCmp('ELEVATOR_FLOOR_STOP').setValue(assetinfo.ELEVATOR_FLOOR_STOP);
		    	Ext.getCmp('DRIVE_MODE').setValue(assetinfo.DRIVE_MODE);
		    	Ext.getCmp('ASSET_LOAD').setValue(assetinfo.ASSET_LOAD);
		    	Ext.getCmp('ASSET_SPEED').setValue(assetinfo.ASSET_SPEED);
		    	Ext.getCmp('EDIFICE_NAME').setValue(assetinfo.EDIFICE_NAME);
		    	Ext.getCmp('ELEVATOR_MARK').setValue(assetinfo.ELEVATOR_MARK);
		    	Ext.getCmp('EQU_CODE').setValue(assetinfo.EQU_CODE); 
		    	Ext.getCmp('DOC_NUMBER').setValue(assetinfo.DOC_NUMBER);
		    	Ext.getCmp('ASSET_ADDRESS').setValue(assetinfo.ASSET_ADDRESS);
		    	//液压
		    	Ext.getCmp('CYLINDER_AMOUNT').setValue(assetinfo.CYLINDER_AMOUNT);
		    	Ext.getCmp('JACKING_TYPE').setValue(assetinfo.JACKING_TYPE);
		    	//扶梯
		    	Ext.getCmp('BIAS_ANGLE').setValue(assetinfo.BIAS_ANGLE);
		    	Ext.getCmp('ASSET_HEIGHT').setValue(assetinfo.ASSET_HEIGHT);
		    	Ext.getCmp('STAIR_WIDTH').setValue(assetinfo.STAIR_WIDTH);
		    	Ext.getCmp('MAIN_POWER').setValue(assetinfo.MAIN_POWER);
		    	Ext.getCmp('USE_SECTION_LENGTH').setValue(assetinfo.USE_SECTION_LENGTH); 
		        
		    	
		    	//客户列表
		    	var yh=[];
		    	yh[0]={text:'请选择',value:''};
		        for(var i=0;i<domcon.length;i++){
		        	var yho={};
		        	yho.text=domcon[i].CONTACT_NAME;
		        	yho.value='{"EMAIL_ADDRESS":"'+domcon[i].EMAIL_ADDRESS+'","CONT_PH_NUM":"'+domcon[i].CONT_PH_NUM+'"}';
		        	yh.push(yho);
		        	yhs.push(yho);
		        }
		    	Ext.getCmp('yh').setOptions(yh);
		};
		console.log("asset_num",asset_num);
		obj.connectServer(getResult, 'maintainancePlanItemListAction.do?method=getAssetinfo', '{"asset_num":"'+asset_num+'"}');
	 }
	
		
	},
	
	
	
	
	onAList_ChengKeZaiHuoItemTap: function(dataview, index, target, record, e, eOpts) {
		if(Ext.getCmp("button_qd2").getDisabled()==true||Ext.getCmp('tjstatus').getValue()=='ok'){
        	return;
        }
        var check_picker;
        check_picker = Ext.Viewport.add(Ext.create('Ext.Picker', {
            slots: [
                {
                    name:'v_chk',
                    data : [
                        {text: '“√”确认正常', value: '√'},
                        {text: '“○”调整、整备等实施', value: '○'},
                        {text: '“×”要修理等', value: '×'},
                        {text: '“—”无此项', value: '—'}
                    ]
                }
            ],
            listeners:{
                change:function(obk,values,eOpts){
                    record.set('chk',values.v_chk);
                },
                show:function(){
                    check_picker.setValue({'v_chk':record.get('chk')});
                },
            },
        }));
        check_picker.show();
    },

    onbtn_A_ChengKeZaiHuo_AllrightTap: function(button, e, eOpts) {
//    	if(Ext.getCmp("button_qd2").getDisabled()){
//        	return;
//        }
    	var tmpData;
    	if(button.id=='btn_A_ChengKeZaiHuo_Allright')
         tmpData = Ext.getCmp('AList_ChengKeZaiHuo').getStore( ) ;
    	else if(button.id=='btn_B_ChengKeZaiHuo_Allright')
    		tmpData = Ext.getCmp('BList_ChengKeZaiHuo').getStore( ) ;	
    	else if(button.id=='btn_C_ChengKeZaiHuo_Allright')
    		tmpData = Ext.getCmp('CList_ChengKeZaiHuo').getStore( ) ;	
    	else if(button.id=='btn_D_ChengKeZaiHuo_Allright')
    		tmpData = Ext.getCmp('DList_ChengKeZaiHuo').getStore( ) ;	
    	else if(button.id=='btn_Z_ChengKeZaiHuo_Allright')
    		tmpData = Ext.getCmp('ZList_ChengKeZaiHuo').getStore( ) ;
    	else if(button.id=='btn_E_ChengKeZaiHuo_Allright')
    		tmpData = Ext.getCmp('EList_ChengKeZaiHuo').getStore( ) ;
    	else if(button.id=='btn_F_ChengKeZaiHuo_Allright')
    		tmpData = Ext.getCmp('FList_ChengKeZaiHuo').getStore( ) ;

        for(var i = 0;i < tmpData.getAllCount();i++){
            tmpData.getAt(i).set('chk','√');
        }
    },
    btn_A_ChengKeZaiHuo_Allno:function(button, e, eOpts){
//    	if(Ext.getCmp("button_qd2").getDisabled()){
//        	return;
//        }
    	var tmpData;
    	if(button.id=='btn_A_ChengKeZaiHuo_Allno')
         tmpData = Ext.getCmp('AList_ChengKeZaiHuo').getStore( ) ;
    	else if(button.id=='btn_B_ChengKeZaiHuo_Allno')
    		tmpData = Ext.getCmp('BList_ChengKeZaiHuo').getStore( ) ;	
    	else if(button.id=='btn_C_ChengKeZaiHuo_Allno')
    		tmpData = Ext.getCmp('CList_ChengKeZaiHuo').getStore( ) ;	
    	else if(button.id=='btn_D_ChengKeZaiHuo_Allno')
    		tmpData = Ext.getCmp('DList_ChengKeZaiHuo').getStore( ) ;	
    	else if(button.id=='btn_Z_ChengKeZaiHuo_Allno')
    		tmpData = Ext.getCmp('ZList_ChengKeZaiHuo').getStore( ) ;
    	else if(button.id=='btn_E_ChengKeZaiHuo_Allno')
    		tmpData = Ext.getCmp('EList_ChengKeZaiHuo').getStore( ) ;
    	else if(button.id=='btn_F_ChengKeZaiHuo_Allno')
    		tmpData = Ext.getCmp('FList_ChengKeZaiHuo').getStore( ) ;

    		
        for(var i = 0;i < tmpData.getAllCount();i++){
            tmpData.getAt(i).set('chk','—');
        }
    },
    ChengKeZaiHuo_commit:function(){
    	//判断必填
//    	var btsj=['wbry','yhpj','yhyj','js','xm'];
//    	for(var i=0;i<btsj.length;i++){
//    		//if(Ext.getCmp(btsj[i]).getValue()==''||Ext.getCmp(btsj[i]).getValue()==null||Ext.getCmp('MySign').getSrc()==null||Ext.getCmp('MySign').getSrc()==''){
//    			if(Ext.getCmp(btsj[i]).getValue()==''||Ext.getCmp(btsj[i]).getValue()==null||Ext.getCmp('yhlist').getStore().getCount()==0||Ext.getCmp('MySign').getSrc()==null||Ext.getCmp('MySign').getSrc()==''){
//    			Ext.Msg.alert('提示','*的输入项不能为空！');
//    			return;
//    		}
//    	}
//    	for(var i=0;i<gxx.length;i++){
//    		var ds=Ext.getCmp(gxx[i]+'List_ChengKeZaiHuo').getStore(); 
//    		for(var j=0;j<ds.getCount();j++){
//    			if(ds.getAt(j).get('chk')==""||ds.getAt(j).get('chk')==null){
//    				Ext.Msg.alert('提示',i+'项目第'+j+'项不能为空！');
//    				return;
//    			}
//    		}
//    		
//    	}
    	if(Ext.getCmp('button_qd2').getDisabled()!=true){
    		Ext.Msg.alert('提示','提交前请先锁定评价！');
    		return;
    	}
      
    	
    	
    	//基本信息
//    	var jbxx=['USE_ACCNT_NAME','USED_CODE','REGISTER_CODE','ASSET_NUM','PRODUCT_NUMBER',
//    	          'ELEVATOR_FLOOR_STOP','DRIVE_MODE','ASSET_LOAD','ASSET_SPEED','EDIFICE_NAME',
//    	          'ELEVATOR_MARK','EQU_CODE','ASSET_ADDRESS','START_DT','END_DT','wblx'
//    	          ]
//          var infoall=[];
//    		var inobj=null;
//    		inobj.USE_ACCNT_NAME=Ext.getCmp('USE_ACCNT_NAME').getValue();
//    		inobj.USED_CODE=Ext.getCmp('USED_CODE').getValue();
//    		inobj.REGISTER_CODE=Ext.getCmp('REGISTER_CODE').getValue();
//    		inobj.ASSET_NUM=Ext.getCmp('ASSET_NUM').getValue();
//    		inobj.PRODUCT_NUMBER=Ext.getCmp('PRODUCT_NUMBER').getValue();
//    		inobj.ELEVATOR_FLOOR_STOP=Ext.getCmp('ELEVATOR_FLOOR_STOP').getValue();
//    		inobj.DRIVE_MODE=Ext.getCmp('DRIVE_MODE').getValue();
//    		inobj.ASSET_LOAD=Ext.getCmp('ASSET_LOAD').getValue();
//    		inobj.ASSET_SPEED=Ext.getCmp('ASSET_SPEED').getValue();
//    		inobj.EDIFICE_NAME=Ext.getCmp('EDIFICE_NAME').getValue();
//    		inobj.ELEVATOR_MARK=Ext.getCmp('ELEVATOR_MARK').getValue();
//    		inobj.EQU_CODE=Ext.getCmp('EQU_CODE').getValue();
//    		inobj.ASSET_ADDRESS=Ext.getCmp('ASSET_ADDRESS').getValue();
//    		inobj.START_DT=Ext.getCmp('START_DT').getValue();
//    		inobj.END_DT=Ext.getCmp('END_DT').getValue();
//    		inobj.WBLX=Ext.getCmp('wblx').getValue();
//    		if(report_type=='乘客电梯、载货电梯保养维修报告书')
//    		inobj.TMPPDA='ChengKeZaiHuo';
//    		else if(report_type=='液压电梯保养维修报告书')
//    		inobj.TMPPDA='YeyaDianTi';
//    		else if(report_type=='杂物电梯保养维修报告书')
//        	inobj.TMPPDA='ZaWuDianTi';
//        	else if(report_type=='自动扶梯、自动人行道保养维修报告书')
//        	inobj.TMPPDA='FuTiRenXingDao';
//    		inobj.MP_ID=Ext.getCmp('MP_ID_rep').getValue();
//    		inobj.PLAN_START_DT=Ext.getCmp('PLAN_START_DT_rep').getValue();		
//    		infoall.push(inobj);
    	 var info=null;
		 var TMPPDF=null;
		 var report_type=Ext.getCmp('report_type').getValue();
		if(report_type=='ck')
	    TMPPDF='ChengKeZaiHuo';
         else if(report_type=='yy')
   		TMPPDF='YeYaDianTi';//TMPPDF='YeyaDianTi';另一个
   		else if(report_type=='zw')
       	TMPPDF='ZaWuDianTi';
      	else if(report_type=='zd')
      	TMPPDF='FuTiRenXingDao';

		 
    	 info='{"DOMAIN_NAME":"'+Ext.getCmp('D_DOMAIN_NAME').getValue()+'","USE_ACCNT_NAME":"'+Ext.getCmp('USE_ACCNT_NAME').getValue()+'","USED_CODE":"'+Ext.getCmp('USED_CODE').getValue()+'","REGISTER_CODE":"'+Ext.getCmp('REGISTER_CODE').getValue()+
    	 '","ASSET_NUM":"'+Ext.getCmp('ASSET_NUM1').getValue()+'","PRODUCT_NUMBER":"'+Ext.getCmp('PRODUCT_NUMBER').getValue()+'","ELEVATOR_FLOOR_STOP":"'+Ext.getCmp('ELEVATOR_FLOOR_STOP').getValue()+
    	 '","DRIVE_MODE":"'+Ext.getCmp('DRIVE_MODE').getValue()+'","ASSET_LOAD":"'+Ext.getCmp('ASSET_LOAD').getValue()+'","ASSET_SPEED":"'+Ext.getCmp('ASSET_SPEED').getValue()+'","EDIFICE_NAME":"'+Ext.getCmp('EDIFICE_NAME').getValue()+
    	 '","ELEVATOR_MARK":"'+Ext.getCmp('ELEVATOR_MARK').getValue()+'","EQU_CODE":"'+Ext.getCmp('EQU_CODE').getValue()+'","ASSET_ADDRESS":"'+Ext.getCmp('ASSET_ADDRESS').getValue()+
		 '","START_DT":"'+Ext.getCmp('START_DT').getValue()+'","END_DT":"'+Ext.getCmp('END_DT').getValue()+'","WBLX":"'+Ext.getCmp('wblx').getValue()+'","TMPPDF":"'+TMPPDF+'","MP_ID":"'+Ext.getCmp('MP_ID_rep').getValue()+
		 '","PLAN_START_DT":"'+Ext.getCmp('PLAN_START_DT_rep').getValue()+'","DOC_NUMBER":"'+Ext.getCmp('DOC_NUMBER').getValue()+'","BIAS_ANGLE":"'+Ext.getCmp('BIAS_ANGLE').getValue()+'","ASSET_HEIGHT":"'+Ext.getCmp('ASSET_HEIGHT').getValue()+
		 '","STAIR_WIDTH":"'+Ext.getCmp('STAIR_WIDTH').getValue()+'","MAIN_POWER":"'+Ext.getCmp('MAIN_POWER').getValue()+'","USE_SECTION_LENGTH":"'+Ext.getCmp('USE_SECTION_LENGTH').getValue()+'","CYLINDER_AMOUNT":"'+Ext.getCmp('CYLINDER_AMOUNT').getValue()+
		 '","JACKING_TYPE":"'+Ext.getCmp('JACKING_TYPE').getValue()+'","ACTIVITY_ID":"'+Ext.getCmp('ACTIVITY_ID').getValue()+'","START_TIME":"'+Ext.getCmp('START_TIME').getValue()+'","ARRIVE_TIME":"'+Ext.getCmp('ARRIVE_TIME').getValue()+'","REPAIR_COMPLETE_TIME":"'+Ext.getCmp('REPAIR_COMPLETE_TIME').getValue()+'","COMPANY_ID":"'+Ext.getCmp('COMPANY_ID').getValue()+'"';
    	 

    	var tmpData = Ext.getCmp('AList_ChengKeZaiHuo').getStore( ) ;
    	var tmpData1 = Ext.getCmp('BList_ChengKeZaiHuo').getStore( ) ;
    	var tmpData2 = Ext.getCmp('CList_ChengKeZaiHuo').getStore( ) ;
    	var tmpData3 = Ext.getCmp('DList_ChengKeZaiHuo').getStore( ) ;
    	var tmpData4 = Ext.getCmp('ZList_ChengKeZaiHuo').getStore( ) ;
    	var tmpData5 = Ext.getCmp('EList_ChengKeZaiHuo').getStore( ) ;
    	var tmpData6 = Ext.getCmp('FList_ChengKeZaiHuo').getStore( ) ;
    	
        //列表
//    	var data=tmpData.getData();
//    	var data1=tmpData1.getData();
//    	var data2=tmpData2.getData();
//    	var data3=tmpData3.getData();
//    	var data4=tmpData4.getData();
//    	var data=[];
//    	var data1=[];
//    	var data2=[];
//    	var data3=[];
//    	var data4=[];
    	
    	for(var i=0;i<tmpData.getCount();i++){
//    		var dataob={};
////    		dataob.num=tmpData.getAt(i).get('num');
////    		dataob.con=tmpData.getAt(i).get('con');
////    		dataob.req=tmpData.getAt(i).get('req');
////    		dataob.chk=tmpData.getAt(i).get('chk');
//    		dataob.formwork_id=tmpData.getAt(i).get('formwork_id');
//    		dataob.chk=tmpData.getAt(i).get('chk');
//    		infoall.push(dataob);
//    		inobj.push()
            info=info+',"'+tmpData.getAt(i).get('formwork_id')+'":"'+tmpData.getAt(i).get('chk')+'"';



    	}
    	
    	for(var i=0;i<tmpData1.getCount();i++){
 //   		var dataob={};
//    		dataob.num=tmpData1.getAt(i).get('num');
//    		dataob.con=tmpData1.getAt(i).get('con');
//    		dataob.req=tmpData1.getAt(i).get('req');
//    		dataob.chk=tmpData1.getAt(i).get('chk');
 //   		dataob.formwork_id=tmpData.getAt(i).get('formwork_id');
 //   		dataob.chk=tmpData.getAt(i).get('chk');
 //   		infoall.push(dataob);
    		info=info+',"'+tmpData1.getAt(i).get('formwork_id')+'":"'+tmpData1.getAt(i).get('chk')+'"';
    	}
    	
    	for(var i=0;i<tmpData2.getCount();i++){
 //   		var dataob={};
//    		dataob.num=tmpData2.getAt(i).get('num');
//    		dataob.con=tmpData2.getAt(i).get('con');
//    		dataob.req=tmpData2.getAt(i).get('req');
//    		dataob.chk=tmpData2.getAt(i).get('chk');
//    		dataob.formwork_id=tmpData.getAt(i).get('formwork_id');
 //   		dataob.chk=tmpData.getAt(i).get('chk');
 //   		infoall.push(dataob);
    		info=info+',"'+tmpData2.getAt(i).get('formwork_id')+'":"'+tmpData2.getAt(i).get('chk')+'"';
    	}
    	
    	for(var i=0;i<tmpData3.getCount();i++){
 //   		var dataob={};
//    		dataob.num=tmpData3.getAt(i).get('num');
//    		dataob.con=tmpData3.getAt(i).get('con');
//    		dataob.req=tmpData3.getAt(i).get('req');
//    		dataob.chk=tmpData3.getAt(i).get('chk');
//    		dataob.formwork_id=tmpData.getAt(i).get('formwork_id');
 //   		dataob.chk=tmpData.getAt(i).get('chk');
 //   		infoall.push(dataob);
    		info=info+',"'+tmpData3.getAt(i).get('formwork_id')+'":"'+tmpData3.getAt(i).get('chk')+'"';
    	}
    	
    	for(var i=0;i<tmpData4.getCount();i++){
//    		var dataob={};
//    		dataob.num=tmpData4.getAt(i).get('num');
//    		dataob.con=tmpData4.getAt(i).get('con');
//    		dataob.req=tmpData4.getAt(i).get('req');
//    		dataob.chk=tmpData4.getAt(i).get('chk');
//    		dataob.formwork_id=tmpData.getAt(i).get('formwork_id');
//    		dataob.chk=tmpData.getAt(i).get('chk');
//    		infoall.push(dataob);
    		info=info+',"'+tmpData4.getAt(i).get('formwork_id')+'":"'+tmpData4.getAt(i).get('chk')+'"';
    	}
       	for(var i=0;i<tmpData5.getCount();i++){
//    		var dataob={};
//    		dataob.num=tmpData4.getAt(i).get('num');
//    		dataob.con=tmpData4.getAt(i).get('con');
//    		dataob.req=tmpData4.getAt(i).get('req');
//    		dataob.chk=tmpData4.getAt(i).get('chk');
//    		dataob.formwork_id=tmpData.getAt(i).get('formwork_id');
//    		dataob.chk=tmpData.getAt(i).get('chk');
//    		infoall.push(dataob);
    		info=info+',"'+tmpData5.getAt(i).get('formwork_id')+'":"'+tmpData5.getAt(i).get('chk')+'"';
    	}
       	for(var i=0;i<tmpData6.getCount();i++){
//    		var dataob={};
//    		dataob.num=tmpData4.getAt(i).get('num');
//    		dataob.con=tmpData4.getAt(i).get('con');
//    		dataob.req=tmpData4.getAt(i).get('req');
//    		dataob.chk=tmpData4.getAt(i).get('chk');
//    		dataob.formwork_id=tmpData.getAt(i).get('formwork_id');
//    		dataob.chk=tmpData.getAt(i).get('chk');
//    		infoall.push(dataob);
    		info=info+',"'+tmpData6.getAt(i).get('formwork_id')+'":"'+tmpData6.getAt(i).get('chk')+'"';
    	}
    	
    	
         
    	
    	
    	//评价
//    	var wbjl=['wbry','js','xm','qz','yh'];
//    	var pj=['yhpj','yhyj','signature'];
//        var wbin=[];
//        var pjin=[];
/*    	var wbob={};
    	wbob.confirmPeo=Ext.getCmp('wbry').getValue();
    	wbob.confirmRec=Ext.getCmp('js').getValue();
    	wbob.confirmPro=Ext.getCmp('xm').getValue();
    	wbob.confirmSig=Ext.getCmp('qz').getValue();
    	wbob.touser=Ext.getCmp('yh').getValue();
    	infoall.push(wbob);
    	var pjob={};
    	pjob.userAss=Ext.getCmp('yhpj').getValue();
    	pjob.userSug=Ext.getCmp('yhyj').getValue();
    	pjob.signature=Ext.getCmp('signature').getValue();
    	infoall.push(pjob);
*/		
//    	var wz=Ext.getCmp('signature').getValue().indexOf(',')+1;
//    	var signature=Ext.getCmp('signature').getValue().substr(wz);
       	var wz=Ext.getCmp('MySign').getSrc().indexOf(',')+1;
     	var signature=Ext.getCmp('MySign').getSrc().substr(wz);
       	
    	var yhphone=[];
    	var yhname=[];
    	var yhmail=[];
    	var yhstore=Ext.getCmp('yhlist').getStore();
    	for(var i=0;i<yhstore.getCount();i++){
    		var obj={};
    		obj.yhphone=yhstore.getAt(i).get('phone');
    		yhphone.push(obj);
    		var obj1={};
    		obj1.yhname=yhstore.getAt(i).get('name');
    		yhname.push(obj1);
    		var obj2={};
    		obj2.yhmail=yhstore.getAt(i).get('mail');
    		yhmail.push(obj2);
    	    
    	}
    	console.log(yhphone);
//    	if(Ext.getCmp('yh').getValue()!=''&&Ext.getCmp('yh').getValue()!=null){
//    	yhphone=eval("("+Ext.getCmp('yh').getValue()+")").CONT_PH_NUM;
//    	 yhname=Ext.getCmp('yh').getRecord().get('text');
//    	}
//    	var signature=Ext.getCmp('signature').getValue();

 
        info=info+',"confirmPeo":"'+Ext.getCmp('wbry').getValue().replace(/\r|\n/g,'')+'","confirmRec":"'+Ext.getCmp('js').getValue().replace(/\r|\n/g,'')+'","confirmPro":"'+Ext.getCmp('xm').getValue().replace(/\r|\n/g,'')+
        //'","confirmSig":"'+Ext.getCmp('qz').getValue()+
		'","touser":'+JSON.stringify(yhname)+',"CONT_PH_NUM":'+JSON.stringify(yhphone)+',"usermail":'+JSON.stringify(yhmail)+',"userAss":"'+Ext.getCmp('yhpj').getValue()+'","userSug":"'+Ext.getCmp('yhyj').getValue().replace(/\r|\n/g,'')+'","signature":"'+signature+'"}';
    	var obj=this;
    	Ext.Msg.show({
    		title:'温馨提示',
    	    message:'是否提交?',
    	    buttons:[{text:'确定',itemId:'ok'},{text:'取消',itemId:'cancel'}],
    	    fn:function(buttonId){
    	    	if(buttonId=='ok'){	
    	    		console.log(info);
    	    		
//    	    		if(Ext.getCmp('wblx').getValue()!='急修')
    	    		obj.connectServerwzh(getResult, 'maintainancePlanItemListAction.do?method=toAddinfo', info);
//    	    		else
//    	    		obj.connectServer(getResult, 'fuwuqingqiuluruAction.do?method=toAddinfo', info);		
    	    	}else
    	    		return;
    	    	
    	    }
    	    	

    	});
        
    	function getResult(res){
    		console.log('res',res);
    		//var res=JSON.stringify(res);
    	
    		if(res.msginfo=='提交成功！'){
    			WL.Toast.show("提交成功！");
    			Ext.getCmp('tjstatus').setValue('ok');
          	    obj.ChengKeZaiHuo_save();
//    			var tpye=Ext.getCmp('wblx').getValue();
//    			console.log(tpye);
//    			var st=Ext.getCmp('START_DT').getValue();
//    		    var end=Ext.getCmp('END_DT').getValue();
//    			if(tpye!='急修'){
//    			obj.BackView();
//    			Ext.getCmp('ACTUAL_START_DT').setValue(st);
//    			Ext.getCmp('ACTUAL_END_DT').setValue(end);
//    			var tid=Ext.getCmp('hidden2MP_ID').getValue();
//    	    	var tcodes=Ext.getCmp('hidden2_Tcode').getValue();	
//    	    	//obj.getApplication().getController('MaintenaceDetailCtrl').onButtontap();
//    	    	var MaintenaceJsonStore=WL.JSONStore.get(collectionName);
//               
//    	      var query={tid:tid,tcode:tcodes};
//    	      MaintenaceJsonStore.find(query).then(function(res){
//    	    	 console.log('res11',res);
//    	      var stext=res[0].json.stext;
//    	        	  stext.ACTUAL_START_DT=st;
//           		      stext.ACTUAL_END_DT=end;
////           		  stext.PLAN_END_DT=end;
////           		  stext.PLAN_START_DT=st;
//           		      //stext.report_status='报告书已提交';
//              var tcode1=res[0].json.tcode;
//           	  query0={_id:res[0]._id,json:{jnlno:res[0].json.jnlno,tcode:tcode1,tid:tid,stext:stext,stext_read:res[0].json.stext_read,
//	       				files:res[0].json.files,files_read:res[0].json.files_read,status:res[0].json.status,uuid:res[0].json.uuid,versionCode:res[0].json.versionCode,versionName:res[0].json.versionName,created_time:res[0].json.created_time,
//	    				last_updated_time:res[0].json.last_updated_time,ext1:res[0].json.ext1,ext2:res[0].json.ext2,ext3:res[0].json.ext3,ext4:res[0].json.ext4,ext5:res[0].json.ext5}};
//		      MaintenaceJsonStore.replace(query0).then(function(){
//		    	 
//		    	  console.log('ok?');
//           	     
//				 }).fail(function(err){
//				 WL.Toast.show("提交失败！");
//					 });
//    	        	
//    	        	
//    	        }).fail(function(err){
//    	        	console.log('fail');
//    	        });
//    			}
////    			else{
////    				
////    			}
//                    		
    		}else{
    			WL.Toast.show("提交失败！");
          	    obj.ChengKeZaiHuo_save();	
    		}
    	}
    	
    },
    ChengKeZaiHuo_back:function(){
    	var obj=this;
    	if(Ext.getCmp('tjstatus').getValue()!='ok'){
    	 Ext.Msg.show({
    	    	title:'温馨提示：',
    	    	message:'未完成或未保存就退出报告书的编制，确认吗？',
    			modal:true,
    			hideOnMaskTap: true,
    			buttons:[
    			          {
    			        	 text:'确定',
    			        	 itemId:'qdCheck1',
    			           
    			          },
    			          {
    				         text:'取消',
    				         itemId:'qxCheck1',
    				        
    				      }
    			         ],
    		   fn:function(id){
    			  
    				 if(id=='qdCheck1')
    			     {
    					 obj.BackView();
    			     }else{
    			    	 return;
    			     }
    			  }
    				
    			});
    	
    	}else{
    		obj.BackView();
    	}
    	
    },
    button_qd1:function(){
    	var btsj=['wbry','js','xm'];
    	for(var i=0;i<btsj.length;i++){
    		if(Ext.getCmp(btsj[i]).getValue()==''||Ext.getCmp(btsj[i]).getValue()==null||Ext.getCmp('yhlist').getStore().getCount()==0){
    			Ext.Msg.alert('提示','*的输入项不能为空！');
    			return;
    		}
    	}
    	for(var i=0;i<gxx.length;i++){
    		var ds=Ext.getCmp(gxx[i]+'List_ChengKeZaiHuo').getStore(); 
    		for(var j=0;j<ds.getCount();j++){
    			if(ds.getAt(j).get('chk')==""||ds.getAt(j).get('chk')==null){
    				Ext.Msg.alert('提示',gxx[i]+'项目第'+(j+1)+'项不能为空！');
    				return;
    			}
    		}
    		
    	}
    	
    	 Ext.getCmp('yhfy').setHidden(false);
      	 var items=Ext.getCmp('report_tab');
      	 console.log(items);
      	 items.setActiveItem(9);
    	
    	
//		Ext.Msg.show({
//		title:'温馨提示：',
//		message:'按进入用户页面按钮以后不能jin，如果需要重新调整可以重新填写报告书或者按取消按钮！',
//		modal:true,
//		hideOnMaskTap: true,
//		buttons:[
//		         {
//		        	 text:'确定',
//		        	 itemId:'qdCheck',
//		           
//		          },
//		          {
//			         text:'取消',
//			         itemId:'qxCheck',
//			        
//			      }
//		         ],
//		  fn:function(id){
//			  
//			 if(id=='qdCheck')
//		     {
//		     Ext.getCmp('yhfy').setHidden(false);
//         	 var items=Ext.getCmp('report_tab');
//         	 console.log(items);
//         	 items.setActiveItem(9);
//         	 
//		     }
//		  }       
//			
//		});
    	
    },
    button_qd2:function(){
    	var btsj=['yhpj','yhyj'];
    	for(var i=0;i<btsj.length;i++){
    		if(Ext.getCmp(btsj[i]).getValue()==''||Ext.getCmp(btsj[i]).getValue()==null||Ext.getCmp('MySign').getSrc()==null||Ext.getCmp('MySign').getSrc()==''){
    			//if(Ext.getCmp(btsj[i]).getValue()==''||Ext.getCmp(btsj[i]).getValue()==null||Ext.getCmp('yhlist').getStore().getCount()==0||Ext.getCmp('MySign').getSrc()==null||Ext.getCmp('MySign').getSrc()==''){
    			Ext.Msg.alert('提示','*的输入项不能为空！');
    			return;
    		}
    	}

    Ext.Msg.show({
    	title:'温馨提示：',
    	message:'按确定按钮以后不能再次修改，如果需要重新调整可以重新填写报告书或者按取消按钮！',
		modal:true,
		hideOnMaskTap: true,
		buttons:[
		          {
		        	 text:'确定',
		        	 itemId:'qdCheck1',
		           
		          },
		          {
			         text:'取消',
			         itemId:'qxCheck1',
			        
			      }
		         ],
	   fn:function(id){
		  
			 if(id=='qdCheck1')
		     {
			     Ext.getCmp('wbbg').setDisabled(true);
	         	 Ext.getCmp('button_qd1').setDisabled(true);
	         	 Ext.getCmp('button_qd3').setDisabled(true);
	         	 var sc=document.getElementsByName('2');
	         	 for(var i=0;i<sc.length;i++){
	         		sc[i].style.display="none";
	         	 }
	         	 //document.getElementById("2").style.display="none";
	         	 
      	    Ext.getCmp('button_qd2').setDisabled(true);
      	    Ext.getCmp('button_MySign').setDisabled(true);
      	    Ext.getCmp('yhfy').setDisabled(true);
      	    var bt=['A','B','C','D','E','F','Z'];
      	    for(var i=0;i<bt.length;i++){
      	    	Ext.getCmp('btn_'+bt[i]+'_ChengKeZaiHuo_Allright').setDisabled(true);
      	    	Ext.getCmp('btn_'+bt[i]+'_ChengKeZaiHuo_Allno').setDisabled(true);
      	    }
		     }
		  }
			
		});
    },
    yh:function( obj, newValue, oldValue, eOpts){
    	if(newValue!=''&&newValue!=null){
    		var nV=eval("("+newValue+")");
    		Ext.getCmp('yhyx').setValue(nV.EMAIL_ADDRESS);
    	}
    },
    button_qd3:function(){
    	var  stroe=Ext.getCmp('yhlist').getStore();
    	var yhname =Ext.getCmp('yh').getRecord().get('text');
    	var yhmail= Ext.getCmp('yhyx').getValue();
    	var yhpone=eval("("+Ext.getCmp('yh').getValue()+")").CONT_PH_NUM;
    	if(yhname=="请选择"){
    		Ext.Msg.alert("提示","请选择对应人员！");
    	    return;
    	}
    	var obj ={name:yhname,mail:yhmail,phone:yhpone};
    	stroe.add(obj);
    	
    },
    yhlist:function( obj, index, target, record, e, eOpts){
    	console.log(e);
    	if(e.target.id=="2"){
    	   var store=Ext.getCmp('yhlist').getStore();
    	   Ext.Msg.confirm('你好','删除信息？',function(btn){
				if (btn == 'yes'){
					store.removeAt(index);
					
				}else{
					return;
				}
			});
    	}
    	
    	
    },
    ChengKeZaiHuo_save:function(){
    	var obj=this;
//    	var url=null;
//    	
//    	cordova.exec(isOk,isFailure,'Signature','tofile',[{
//    		signature:Ext.getCmp('signature').getValue()
//    	}]);
//    	function isOk(re) {
//    		alert(re);
//    		url=re;
//    	}
//    	function isFailure(data) {
//			alert('失败了!');
//		};
//    	
    	var MaintenaceJsonStore=WL.JSONStore.get(collectionName);
//    	var sj=['USE_ACCNT_NAME','USED_CODE','','DOC_NUMBER','ASSET_NUM1','PRODUCT_NUMBER','ELEVATOR_FLOOR_STOP','DRIVE_MODE','ASSET_LOAD','ASSET_SPEED',
//    	        'BIAS_ANGLE','ASSET_HEIGHT','STAIR_WIDTH','MAIN_POWER','USE_SECTION_LENGTH','CYLINDER_AMOUNT','JACKING_TYPE','EDIFICE_NAME','ELEVATOR_MARK','EQU_CODE',
//    	        'ASSET_ADDRESS','START_DT','END_DT','wblx','report_type','MP_ID_rep','PLAN_START_DT_rep','ACTIVITY_ID','START_TIME','ARRIVE_TIME','REPAIR_COMPLETE_TIME',
//    	        'COMPANY_ID','wbry','js','xm','yhpj','yhyj','signature'];
    	var MP_ID='';
    	if(Ext.getCmp('wblx').getValue()!='急修'){
    	 MP_ID=Ext.getCmp('MP_ID_rep').getValue();
    	}else{
    	 MP_ID=Ext.getCmp('ACTIVITY_ID').getValue();
    	}
    		
    	//Ext.getCmp('ACTIVITY_ID').setValue(ACTIVITY_ID);

    	var tmpData = Ext.getCmp('AList_ChengKeZaiHuo').getStore( ) ;
    	var tmpData1 = Ext.getCmp('BList_ChengKeZaiHuo').getStore( ) ;
    	var tmpData2 = Ext.getCmp('CList_ChengKeZaiHuo').getStore( ) ;
    	var tmpData3 = Ext.getCmp('DList_ChengKeZaiHuo').getStore( ) ;
    	var tmpData6 = Ext.getCmp('ZList_ChengKeZaiHuo').getStore( ) ;
    	var tmpData4 = Ext.getCmp('EList_ChengKeZaiHuo').getStore( ) ;
    	var tmpData5 = Ext.getCmp('FList_ChengKeZaiHuo').getStore( ) ;
    	var ylists= Ext.getCmp('yhlist').getStore( ) ;

    	var info=[];
    	var info1=[];
    	var info2=[];
    	var info3=[];
    	var info4=[];
    	var info5=[];
    	var info6=[];
    	var ylist=[];
   
    	
    	for(var i=0;i<tmpData.getCount();i++){
    		var dataob={};
    		dataob.num=tmpData.getAt(i).get('num');
    		dataob.con=tmpData.getAt(i).get('con');
    		dataob.req=tmpData.getAt(i).get('req');
    		dataob.chk=tmpData.getAt(i).get('chk');
    		dataob.formwork_id=tmpData.getAt(i).get('formwork_id');
    		info.push(dataob);
    	}
    	for(var i=0;i<tmpData1.getCount();i++){
    		var dataob={};
    		dataob.num=tmpData1.getAt(i).get('num');
    		dataob.con=tmpData1.getAt(i).get('con');
    		dataob.req=tmpData1.getAt(i).get('req');
    		dataob.chk=tmpData1.getAt(i).get('chk');
    		dataob.formwork_id=tmpData1.getAt(i).get('formwork_id');
    		info1.push(dataob);
    	}
    	for(var i=0;i<tmpData2.getCount();i++){
    		var dataob={};
    		dataob.num=tmpData2.getAt(i).get('num');
    		dataob.con=tmpData2.getAt(i).get('con');
    		dataob.req=tmpData2.getAt(i).get('req');
    		dataob.chk=tmpData2.getAt(i).get('chk');
    		dataob.formwork_id=tmpData2.getAt(i).get('formwork_id');
    		info2.push(dataob);
    	}
    	for(var i=0;i<tmpData3.getCount();i++){
    		var dataob={};
    		dataob.num=tmpData3.getAt(i).get('num');
    		dataob.con=tmpData3.getAt(i).get('con');
    		dataob.req=tmpData3.getAt(i).get('req');
    		dataob.chk=tmpData3.getAt(i).get('chk');
    		dataob.formwork_id=tmpData3.getAt(i).get('formwork_id');
    		info3.push(dataob);
    	}
    	for(var i=0;i<tmpData4.getCount();i++){
    		var dataob={};
    		dataob.num=tmpData4.getAt(i).get('num');
    		dataob.con=tmpData4.getAt(i).get('con');
    		dataob.req=tmpData4.getAt(i).get('req');
    		dataob.chk=tmpData4.getAt(i).get('chk');
    		dataob.formwork_id=tmpData4.getAt(i).get('formwork_id');
    		info4.push(dataob);
    	}
    	for(var i=0;i<tmpData5.getCount();i++){
    		var dataob={};
    		dataob.num=tmpData5.getAt(i).get('num');
    		dataob.con=tmpData5.getAt(i).get('con');
    		dataob.req=tmpData5.getAt(i).get('req');
    		dataob.chk=tmpData5.getAt(i).get('chk');
    		dataob.formwork_id=tmpData5.getAt(i).get('formwork_id');
    		info5.push(dataob);
    	}
    	for(var i=0;i<tmpData6.getCount();i++){
    		var dataob={};
    		dataob.num=tmpData6.getAt(i).get('num');
    		dataob.con=tmpData6.getAt(i).get('con');
    		dataob.req=tmpData6.getAt(i).get('req');
    		dataob.chk=tmpData6.getAt(i).get('chk');
    		dataob.formwork_id=tmpData6.getAt(i).get('formwork_id');
    		info6.push(dataob);
    	}
    	for(var i=0;i<ylists.getCount();i++){
    		var dataob={};
    		dataob.name=ylists.getAt(i).get('name');
    		dataob.mail=ylists.getAt(i).get('mail');
    		dataob.phone=ylists.getAt(i).get('phone');

    		ylist.push(dataob);
    	}

    	
    	
    	var data={
    		formwork:MP_ID,
    		USE_ACCNT_NAME:Ext.getCmp('USE_ACCNT_NAME').getValue(),
    		USED_CODE:Ext.getCmp('USED_CODE').getValue(),
    		DOC_NUMBER:Ext.getCmp('DOC_NUMBER').getValue(),
    	    ASSET_NUM1:Ext.getCmp('ASSET_NUM1').getValue(),
    	    PRODUCT_NUMBER:Ext.getCmp('PRODUCT_NUMBER').getValue(),
    	    ELEVATOR_FLOOR_STOP:Ext.getCmp('ELEVATOR_FLOOR_STOP').getValue(),
    	    DRIVE_MODE:Ext.getCmp('DRIVE_MODE').getValue(),
    	    ASSET_LOAD:Ext.getCmp('ASSET_LOAD').getValue(),
    	    ASSET_SPEED:Ext.getCmp('ASSET_SPEED').getValue(),
    	    BIAS_ANGLE:Ext.getCmp('BIAS_ANGLE').getValue(),
    	    ASSET_HEIGHT:Ext.getCmp('ASSET_HEIGHT').getValue(),
    	    STAIR_WIDTH:Ext.getCmp('STAIR_WIDTH').getValue(),
    	    MAIN_POWER:	Ext.getCmp('MAIN_POWER').getValue(),
    	    USE_SECTION_LENGTH:Ext.getCmp('USE_SECTION_LENGTH').getValue(),
    	    CYLINDER_AMOUNT:Ext.getCmp('CYLINDER_AMOUNT').getValue(),
    	    JACKING_TYPE:Ext.getCmp('JACKING_TYPE').getValue(),
    	    EDIFICE_NAME:Ext.getCmp('EDIFICE_NAME').getValue(),
    	    ELEVATOR_MARK:Ext.getCmp('ELEVATOR_MARK').getValue(),
            EQU_CODE:Ext.getCmp('EQU_CODE').getValue(),
    	    ASSET_ADDRESS:Ext.getCmp('ASSET_ADDRESS').getValue(),
    	    START_DT:Ext.getCmp('START_DT').getValue(),
    	    END_DT:Ext.getCmp('END_DT').getValue(),
    	    wblx:Ext.getCmp('wblx').getValue(),
    	    report_type:Ext.getCmp('report_type').getValue(),
    	    MP_ID_rep:Ext.getCmp('MP_ID_rep').getValue(),
    	    PLAN_START_DT_rep:Ext.getCmp('PLAN_START_DT_rep').getValue(),
    	    ACTIVITY_ID:Ext.getCmp('ACTIVITY_ID').getValue(),
    	    START_TIME:Ext.getCmp('START_TIME').getValue(),
    	    ARRIVE_TIME:Ext.getCmp('ARRIVE_TIME').getValue(),
    	    REPAIR_COMPLETE_TIME:Ext.getCmp('REPAIR_COMPLETE_TIME').getValue(),
    	    COMPANY_ID:Ext.getCmp('COMPANY_ID').getValue(),
    	    wbry:Ext.getCmp('wbry').getValue(),
    	    js:Ext.getCmp('js').getValue(),
    	    xm:Ext.getCmp('xm').getValue(),
    	    yhpj:Ext.getCmp('yhpj').getValue(),
    	    yhyj:Ext.getCmp('yhyj').getValue(),
    	    DOMAIN_NAME:Ext.getCmp('D_DOMAIN_NAME').getValue(),
           // signature:url,
    	    yh:yhs,
    	    yhlist:ylist,
    	    lista:info,
    	    listb:info1,
    	    listc:info2,
    	    listd:info3,
    	    liste:info4,
    	    listf:info5,
    	    listz:info6,
    	    saveflag:Ext.getCmp('saveflag').getValue(),
    	    jsonstoreid:Ext.getCmp('jsonstoreid').getValue(),
    	    tjstatus:Ext.getCmp('tjstatus').getValue(),
    	    
    	}
    	console.log(data,yh);

    	
        if(Ext.getCmp('saveflag').getValue()==''||Ext.getCmp('saveflag').getValue()==null){
        var options={};
    	MaintenaceJsonStore.add(data,options).then(function (re){
    		console.log("保存成功！");
    		WL.Toast.show("保存成功！");
    		obj.BackView();
    		var data={
        			formwork:MP_ID+"signature",
        			//signature:Ext.getCmp('signature').getValue(),
        			signature: Ext.getCmp('MySign').getSrc(),
        	}
        	MaintenaceJsonStore.add(data,options).then(function (re){
        		console.log("保存成功2");
        	}	
        	).fail(function(err){
        		 console.log("保存失败！"); 
        	});
    		
    	}	
    	).fail(function(err){
    		 console.log("保存失败！"); 
    		 WL.Toast.show("保存失败！");
    	});
    	
//    	data={
//    			formwork:MP_ID+"lista",
//    			lista:Ext.getCmp('AList_ChengKeZaiHuo').getStore().data.items,
//    	}
//        	  
//    	MaintenaceJsonStore.add(data,options).then(function (re){
//    		console.log("保存成功1！");
//    	}	
//    	).fail(function(err){
//    		 console.log("保存失败！"); 
//    	});
//    	
    	
//    	
    	
        }else{
        	var options={};
        	var doc={_id:Ext.getCmp('jsonstoreid').getValue(), json:data};
        	MaintenaceJsonStore.replace(doc,options).then(function (re){
        		console.log("保存成功3！");
        		 WL.Toast.show("保存成功！");
        		 obj.BackView();
        		 var data={
             			formwork:MP_ID+"signature",
             			signature:Ext.getCmp('MySign').getSrc(),
             	}
        		 var doc={
             			_id:Ext.getCmp('jsonstoreid2').getValue(),
             			json:data,
             	}
             	MaintenaceJsonStore.replace(doc,options).then(function (re){
             		console.log("保存成功4");
             	}	
             	).fail(function(err){
             		 console.log("保存失败！"); 
             	});
        		 
        	}	
        	).fail(function(err){
        		 console.log("保存失败1！"); 
        		 WL.Toast.show("保存失败！");
        	});
        }
       
       
    },
    button_MySign:function(ob, e, eOpts ){

    	this.NextView('SignPanel','HelcPDA.view.maintain.SignPanel');
   	    var canvas = document.getElementById('SignCanvas');
        canvas.width  = window.innerHeight;
        canvas.height = window.innerWidth;
        Ext.getCmp('SignPanel').signaturePad= new SignaturePad(canvas); 
        screen.lockOrientation('landscape-primary');
  
         
    },
    onOkbuttonTap: function(button, e, eOpts) {
        var sign = Ext.getCmp('SignPanel').signaturePad.toDataURL();
        this.BackView();
        Ext.getCmp('MySign').setSrc(sign);
        screen.lockOrientation('portrait-primary');
        
    },

    onClearbuttonTap: function(button, e, eOpts) {
        Ext.getCmp('SignPanel').signaturePad.clear();
    },
    backbutton:function(button,e,eOpts){
    	 this.BackView();
         screen.lockOrientation('portrait-primary');
    },

	
});