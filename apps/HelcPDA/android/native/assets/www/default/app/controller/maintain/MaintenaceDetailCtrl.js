
/* JavaScript content from app/controller/maintain/MaintenaceDetailCtrl.js in folder common */
var picture_list=[];
Ext.define('HelcPDA.controller.maintain.MaintenaceDetailCtrl', {
    extend: 'HelcPDA.controller.ApplicationController',
    
    config: {
        control: {
        	"button#uploadPiece": {
        		tap: 'uploadPiece'
        	},
            "button#savaMaintenaceDetail": {
            	tap: 'OnsavaMaintenaceDetailTap'
//旧保养计划保存                tap: 'onButtontap'
//            },"list#maintenacePej":{
//            	itemtap:'onListItemtap' 
           },"button#submitAll":{
//旧保养计划提交            	tap:'submitAll'
        	   tap: 'OnsubmitAllTap'
           },"button#resetValue":{
            	tap:'resetValue'  //重置数据
           },"button#changePiece":{
	            tap:'toRelacePanel'
           },"button#realtimeJK":{//实时监控
        	   tap:'torealtimeJK'
           },"button#activateTest":{//激活调试
        	   tap:'activateTest'
	       },"button#toGetBack":{
//旧保养计划回收	    	    tap:'toGetBack'    //回收
	    	   tap: 'OntoGetBackTap'
	       },"button#buttonMaintain":{   //返回
	    	    tap:'buttonMaintain'
	       },"button#take_picture":{
	    	    tap:'take_picture'
	       },"button#see_picture":{
	    	    tap:'see_picture'
	       },"list#picture_listV":{
	    	   itemtap:'picture_listV'
	       },"button#pointing":{	//指示书
//	    	   tap:'pointing'
	    	   tap:'New_Pointing'
	       },"button#canel_pointing":{	//指示书
	           tap:'canel_pointing'
	       },"button#gzcd":{	//故障存档
	           tap:'gzcd'
	       },
	       
          
        }
    },
    
    activateTest : function(){
    	var ISACTIVE = Ext.getCmp('ISACTIVE').getValue();
    	if(ISACTIVE=="遥监已激活"||ISACTIVE=="遥监激活"){
    		if(Ext.getCmp('MaintainTime')){
    			localStorage.MaintainTime = Ext.getCmp('MaintainTime').getValue();
    		}
    		localStorage.index = Ext.getCmp('listIndex').getValue();
    		localStorage.ViewId = Ext.Viewport.getActiveItem().id;
    		localStorage.ViewName = Ext.Viewport.getActiveItem().__proto__.$className;
    		localStorage.userid = copy_userid;
    		localStorage.company_code = company_code;
    		localStorage.station_id = station_id;
    		localStorage.usernames = username1;
    		localStorage.HQFlag = HQFlag;
    		localStorage.roleStr = roleStr;
    		localStorage.page = 'main';
    		localStorage.YDYJ_flag = '2';
    		localStorage.PDAflag=PDAflag;
    		localStorage.company_name=company_name;
    		localStorage.phoneno=phoneno;
    		localStorage.roleid=roleid;
    		localStorage.rolename=rolename;
    		var ASSET_NUM = Ext.getCmp('ASSET_NUM').getValue();
    		var url = encodeURIComponent("index.html?page=main");
    		location.href = "essIndex.html?page=ActivateTest.html&action=search&assetnum="+ASSET_NUM+"&from="+url;
    	}else{
    		Ext.Msg.alert('提示','遥监未激活/未安装');
    	}
    },
    
    canel_pointing : function(){
    	var pointing_panel=Ext.getCmp('pointing_panel');
		if(pointing_panel){
			pointing_panel.destroy();
		};
    },
    
    New_Pointing:function(){
    	var v_Mp_Template_Id = Ext.getCmp('REF_TEMPLATEID').getValue();
    	var v_Activity_Times = Ext.getCmp('REF_ACTIVITYTIMES').getValue();
    	
    	var getResult = function(res){
    		var response = res.MPlanTemplateQuery_Output;
    		var v_data = [];
    		if(response.NumOutputObjects > 0){
    			var resp = response.ListOfHelPdaMaintainingPlanTemplateActivityIo.HelMaintainingPlanTemplateActivity;
    			if(resp.length){
    				for(var i = 0;i< response.NumOutputObjects;i++){
    					v_data.push({
    						ActivityComments:resp[i].ActivityComments,
    						ActivityTools:resp[i].ActivityTools,
    						Children:resp[i].ListOfHelMaintainingPlanTemplateTask,
    					})
    				}
    			}else{
    				v_data.push({
    					ActivityComments:resp.ActivityComments,
    					ActivityTools:resp.ActivityTools,
    					Children:resp.ListOfHelMaintainingPlanTemplateTask,
    				})
    			}
    			
    			this.NextView('New_InstructionBook','HelcPDA.view.maintain.New_InstructionBook');
    			Ext.getCmp('L_New_InstructionBook').getStore().setData(v_data);
    		}else{
    			Ext.Msg.alert('温馨提示','没有相关指示书内容！');
    		}
    	}

    	var parameters = {
    		procedure : 'MPlanTemplateQuery',
    		isLoading : true,
    		Mp_Template_Id : v_Mp_Template_Id,
    		Activity_Times : v_Activity_Times
    	};
    						
    	MainCtr.getDataFromServer(getResult,parameters);
    },
    
    pointing : function(){
    	var store = this.getStore('MaintenaceProtectPrjectStore');
//    	var SrcTime = store.data.all[0].data.TASK_NAME;
    	var SrcTime = '';
    	for(var i = 0;i < store.data.all.length;i++){
    		SrcTime += store.data.all[i].data.TASK_NAME;
    		if(i+1 < store.data.all.length){
    			SrcTime += '###';
    		}
    	}
    	contentdata={SrcTime:SrcTime};
		var content= JSON.stringify(contentdata);
	    var getResult=function(res){
	    	cordova.exec(isOk,isFailure,'Pointing','decoderFile',[res]);
			function isOk(resultdatas) {
				var dataArray = resultdatas.split('r');
				var contents = "";
				for(var i = 0; i<dataArray.length;i++){
					contents += dataArray[i]+"<br>";
				}
				
				Ext.Viewport.add({
					xtype:'panel',
					id:'pointing_panel',
					height:'80%',
			     	width: '90%',
					hideOnMaskTap: false,
		 	            centered: true,
				     	modal: true,
				     	style: 'background:#ccc',
				        items: [{
				                xtype: 'container',
				                height: '100%',
				                margin: '100 auto 0 auto',
				                padding: '',
				                style: 'background:#fff',
				                width: '100%',
				                layout: 'vbox',
				                items: [
				                    {
				                       xtype: 'toolbar',
				                        docked: 'top',
				                        title: '指示书说明',
				                        items: [
				                            {
				                                xtype: 'spacer'
				                            },
				                            {
				                                xtype: 'button',
				                                iconCls: 'delete',
				                                text: '',
				                                id:'canel_pointing',
				                            }
				                        ]
				                    },
				                    {
				                        xtype: 'formpanel',
				                        padding: 10,
				                        height: '100%',
				                        items: [
				                            {
				                                xtype: 'label',
				                                height: '100%',
				                                html: '<div id="pointing_content"></div>',
				                                margin: '0 0 10 0'
				                            }
				                        ]
				                    },
				                ]
				            }]
				});
				
				document.getElementById("pointing_content").innerHTML=contents;
				var bygjHeight=gjts.length;
				document.getElementById("plan_tools").style.height=(22*bygjHeight)+'px';
			}
			function isFailure(data) {
				alert('失败了!');
			};
	    };
	        
	    this.connectServer_ZSS(getResult, 'maintainancePlanItemListAction.do?method=toSearchExplainBook_PDA3', content);
    },
    
    torealtimeJK : function(){
    	var ISACTIVE=Ext.getCmp('ISACTIVE').getValue();
    	if(ISACTIVE=='遥监激活'||ISACTIVE=="遥监已激活"){
    		//alert('hehe!');
    	
    	if(Ext.getCmp('MaintainTime')){
    		localStorage.MaintainTime = Ext.getCmp('MaintainTime').getValue();
    	}
    	localStorage.index = Ext.getCmp('listIndex').getValue();
    	localStorage.ViewId = Ext.Viewport.getActiveItem().id;
		localStorage.ViewName = Ext.Viewport.getActiveItem().__proto__.$className;
		localStorage.userid = copy_userid;
		localStorage.company_code = company_code;
		localStorage.station_id = station_id;
		localStorage.usernames = username1;
		localStorage.HQFlag = HQFlag;
		localStorage.roleStr = roleStr;
		localStorage.page = 'main';
		localStorage.YDYJ_flag = '2';
		localStorage.company_name=company_name;
		localStorage.phoneno=phoneno;
		localStorage.roleid=roleid;
		localStorage.rolename=rolename;
    	var ASSET_NUM = Ext.getCmp('ASSET_NUM').getValue();
    	var url = encodeURIComponent("index.html?page=main");
		location.href = "essIndex.html?page=realtime.html&assetnum="+ASSET_NUM+"&from="+url;
    	}else
    		Ext.Msg.alert('提示','遥监未激活/未安装');
    },
    
    uploadPiece : function(){
    	var obj = this;
    	var SrcDirs = [];
    	for(var i=0;i<picture_list.length;i++){
    		var src = picture_list[i].src;
        	if(src.substring(0,4)=="file"){
        		//alert("路径是绝对路径，src="+src);
        		var readSrc = src.substring(7,src.length);
        		
        		cordova.exec(callOK,callFailure,'FileUpLoad','upload',[readSrc]);
        		
        		function callOK(data){
        			//alert("调用成功，把图片转码了");
        			var dataObj={};
        			dataObj.data = data;
        			SrcDirs[i]=dataObj;
        			
        		}
        		
        		function callFailure(data){
        			WL.Toast.show('callFailure上传图片失败');
        		}
        		
        	}else{
        		//alert("RUI是:"+src);
        		cordova.exec(ruicallOK,ruicallFailure,'UriToFile','uritofile',[src]);
        		function ruicallOK(data){
        			
        			cordova.exec(ruiTOfilecallOK,ruiTOfilecallFailure,'FileUpLoad','upload',[data]);
            		
            		function ruiTOfilecallOK(data){
            			//alert("调用成功，RUI转成绝对路径后，把图片转码了");
            			var dataObj={};
            			dataObj.data = data;
            			SrcDirs[i]=dataObj;
            		}
            		
            		function ruiTOfilecallFailure(data){
            			WL.Toast.show('ruiTOfilecallFailure上传图片失败');
            		}
        		}
        		
        		function ruicallFailure(data){
        			WL.Toast.show('转化uri失败');
        		}
        	}
    	};
    	contentdata={SrcDirs:SrcDirs};
		var content= JSON.stringify(contentdata);
	    var getResult=function(res){
	    	WL.Toast.show(res.msginfo);
	    };
	        
	    obj.connectServer(getResult, 'fileUpLoadAction.do?method=toUpLoad', content);
    	
    	
    },
    
    OnsavaMaintenaceDetailTap : function(thisObj,e,eOpts){
    	var v_Id = Ext.getCmp('MP_ID').getValue();
    	var v_ACTUAL_START_DT = Ext.getCmp('ACTUAL_START_DT').getValue();
    	var v_ACTUAL_END_DT = Ext.getCmp('ACTUAL_END_DT').getValue();
    	var v_ACTUAL_EMP_ID1 = Ext.getCmp('ACTUAL_EMP_ID1').getValue();
    	var v_ACTUAL_EMP_ID2 = Ext.getCmp('ACTUAL_EMP_ID2').getValue();
    	var v_ACTUAL_EMP_ID3 = Ext.getCmp('ACTUAL_EMP_ID3').getValue();
    	
    	v_ACTUAL_START_DT = v_ACTUAL_START_DT != ''?Ext.Date.format(new Date(v_ACTUAL_START_DT),'m/d/Y H:i:s'):'';
    	v_ACTUAL_END_DT = v_ACTUAL_END_DT != ''?Ext.Date.format(new Date(v_ACTUAL_END_DT),'m/d/Y H:i:s'):'';

    	var getResult = function(res){
    		var resp = res.PlanListSynchronize_Output;
    		if(resp.ErrorCode == 0){
    			Ext.toast('保存成功！',2000);
    			HelcPDA.app.getController('maintain.MaintenaceCtrl').MPPupdate();
    		}else{
    			Ext.Msg.alert('温馨提示','保存失败，请稍后重试！<br>如重试不成功请联系管理员！');
    		}
    	}

    	var parameters = {
    		procedure : 'PlanListSynchronize',
    		isLoading : true,
    		Id : v_Id,
    		ActualEmployeeId1 : v_ACTUAL_EMP_ID1,
    		ActualEmployeeId2 : v_ACTUAL_EMP_ID2,
    		ActualEmployeeId3 : v_ACTUAL_EMP_ID3,
    		MaintainStartDate : v_ACTUAL_START_DT,
    		MaintainEndDate : v_ACTUAL_END_DT,
    	};
    						
    	MainCtr.getDataFromServer(getResult,parameters);
    },

    //旧保养计划保存
    onButtontap: function(IsSubOrSave,content) {
    	var obj=this;
    	var tid=Ext.getCmp('hidden2MP_ID').getValue();
    	var tcodes=Ext.getCmp('hidden2_Tcode').getValue();
        var MaintenaceJsonStore=WL.JSONStore.get(collectionName);
    	//将保养项目的数据保存进缓存
    	var query={tid:tid,tcode:tcodes};
       MaintenaceJsonStore.find(query).then(function(res){
    	   
        		  var stext=res[0].json.stext;
        		  var ACTUAL_START_DT=getEmpValue('ACTUAL_START_DT');
        		  if(ACTUAL_START_DT==""||typeof(ACTUAL_START_DT)==null){
        			  WL.Toast.show("开始时间不能为空");
        			  return;
        		  }
        		  var  ACTUAL_END_DT=getEmpValue('ACTUAL_END_DT');
        		  if(ACTUAL_END_DT==""||typeof(ACTUAL_END_DT)==null){
        			  WL.Toast.show("结束时间不能为空");
        			  return;
        		  }
//        		   stext.ACTUAL_START_DT=getEmpValue('ACTUAL_START_DT');
//        		   stext.ACTUAL_END_DT=getEmpValue('ACTUAL_END_DT');
        		   stext.ACTUAL_START_DT=Ext.getCmp('ACTUAL_START_DT').getValue();
        		   stext.ACTUAL_END_DT=Ext.getCmp('ACTUAL_END_DT').getValue();
        		   stext.ACTUAL_EMP_ID1=getEmpValue('ACTUAL_EMP_ID1');
        		   stext.ACTUAL_EMP_ID2=getEmpValue('ACTUAL_EMP_ID2');
        		   stext.ACTUAL_EMP_ID3=getEmpValue('ACTUAL_EMP_ID3');
        		   stext.GOV_CHECK_TIME=getEmpValue('GOV_CHECK_TIME');
        		   stext.TRAFFIC_TIME=getEmpValue('TRAFFIC_TIME');
        		   stext.COMMENTS=getEmpValue('COMMENTS');
        		   res[0].json.files=picture_list;
        		  
        		  var tcode1=res[0].json.tcode;
        		  if(tcode1=="mainfields"){
        			  console.log("11");
        			   tcode1=res[0].json.tid+"_Value";
        			   query={jnlno:res[0].json.jnlno,tcode:tcode1,tid:tcode1,stext:stext,stext_read:res[0].json.stext_read,
        	          			files:res[0].json.files,files_read:res[0].json.files_read,status:res[0].json.status,uuid:res[0].json.uuid,versionCode:res[0].json.versionCode,versionName:res[0].json.versionName,created_time:res[0].json.created_time,
        	       				last_updated_time:res[0].json.last_updated_time,ext1:res[0].json.ext1,ext2:res[0].json.ext2,ext3:res[0].json.ext3,ext4:res[0].json.ext4,ext5:res[0].json.ext5};
            		    
        			  MaintenaceJsonStore.add(query).then(function(res){
            				 WL.Toast.show("保存成功");
            				 Ext.getCmp('hidden2_Tcode').setValue(tcode1);
            				 if(IsSubOrSave=='Sub'){
                           	  WL.Toast.show("已进入数据提交队列");
                           	  setTimeout(load1(content),1000);
                             }else{
                            	 obj.BackView();
                             }
                		 }).fail(function(err){
                			 WL.Toast.show("保存失败");
                		 });
        		  }else{
         		  query0={_id:res[0]._id,json:{jnlno:res[0].json.jnlno,tcode:tcode1,tid:tcode1,stext:stext,stext_read:res[0].json.stext_read,
 			       				files:res[0].json.files,files_read:res[0].json.files_read,status:res[0].json.status,uuid:res[0].json.uuid,versionCode:res[0].json.versionCode,versionName:res[0].json.versionName,created_time:res[0].json.created_time,
 			    				last_updated_time:res[0].json.last_updated_time,ext1:res[0].json.ext1,ext2:res[0].json.ext2,ext3:res[0].json.ext3,ext4:res[0].json.ext4,ext5:res[0].json.ext5}};
         		  MaintenaceJsonStore.replace(query0).then(function(){
         			 console.log("12");
                      if(IsSubOrSave=='Sub'){
                    	  WL.Toast.show("已进入数据提交队列");
                    	  setTimeout(load1(content),1000);
                      }else{
                    	  WL.Toast.show("保存成功");
                    	  obj.BackView();
                      }  
      				 }).fail(function(err){
      					 WL.Toast.show("保存失败");
      					 });
        		  }
        		  
                }).fail(function(err){
        	
        });
        function getEmpValue(ElementName){
             return	Ext.getCmp(ElementName).getValue();
        }
    },
//    onListItemtap:function(obj, index, target, record, e, eOpts){
//    	var datads=Ext.data.StoreManager.get('MaintenaceProtectPrjectStore');
//		if(!datads){
//			datads=Ext.create('HelcPDA.store.maintain.MaintenaceProtectPrjectStore');
//		}
//    	var TASK_ROW_ID=datads.getAt(index).get('TASK_ROW_ID');
//		Ext.getCmp('hidden2Task_row_Id').setValue(TASK_ROW_ID);
//		
//    },
    
    OnsubmitAllTap : function(thisObj,e,eOpts){
    	var v_Id = Ext.getCmp('MP_ID').getValue();
    	
    	Ext.Msg.show({
			title:'温馨提示',
			message:'请确认目测、检查项目，测量记录项目已完成!',
			buttons:[{text:'取消',itemId:'cancel'},{text:'确定',itemId:'ok'}],
			fn:function(buttonId){
				if(buttonId == 'ok'){
					var getResult = function(res){
			    		var resp = res.PlanListSubmit_Output;
			    		if(resp.ErrorMsg){
			    			Ext.Msg.show({
			    				title:'温馨提示',
			    				message:resp.ErrorMsg,
			    				buttons:[{text:'确定',itemId:'ok'}],
			    				fn:function(buttonId){
			    					if(buttonId == 'ok'){
			    						if(resp.ErrorMsg.indexOf('成功') > -1){
			    							MainCtr.BackView();
			    							HelcPDA.app.getController('maintain.MaintenaceCtrl').MPPupdate();
			    						}
			    					}
			    				}
			    			})
			    		}
			    	}

			    	var parameters = {
			    		procedure : 'PlanListSubmit',
			    		isLoading : true,
			    		MPlanId : v_Id,
			    	};
			    						
			    	MainCtr.getDataFromServer(getResult,parameters);
				}
			}
		})
    },
    
    //提取所有资料,提交到服务器,旧保养计划提交
    submitAll:function(){
    	 //Ext.Msg.alert('提示','提交完成后请填写报告书！');
    	 var obj=this;
    	 var tid=Ext.getCmp('hidden2MP_ID').getValue();
    	 var MaintenaceJsonStore=WL.JSONStore.get(collectionName);
    	 //对要提交的参数进行验证
         var ACTUAL_START_DT=Ext.getCmp('ACTUAL_START_DT').getValue();
         var ACTUAL_END_DT=Ext.getCmp('ACTUAL_END_DT').getValue();
         if(ACTUAL_START_DT==null||ACTUAL_START_DT==""||typeof(ACTUAL_START_DT)=="undefined"){
            WL.Toast.show("实际开始时间不能为空");  
             return;
         }
         if(ACTUAL_END_DT==null||ACTUAL_END_DT==""||typeof(ACTUAL_END_DT)=="undefined"){
        	 WL.Toast.show("实际结束时间不能为空");   
             return;
          }
         if(Date.parse(ACTUAL_START_DT)>=Date.parse(ACTUAL_END_DT)){
        	 WL.Toast.show("实际结束时间要大于或等于实际结束时间");
        	 return;
         }
   
    	  //初始化要传输的数据  	
    	 var plan={};plan_item={},plan_pitem='',plan_part={},ebs_user_id='';
    	 //开始对mainfields(服务计划)进行查找
    	 var query={tid:tid,tcode:'mainfields'};
    	 var options={exact:true};

    	MaintenaceJsonStore.find(query,options).then(function(res){
    		var query1={tid:tid+"_Value",tcode:res[0].json.tid+"_Value"};  		
    	    MaintenaceJsonStore.find(query1,options).then(function(rest){
    	    	//获取保养计划的数据
    	    	var ACTUAL_START_DT=Ext.getCmp('ACTUAL_START_DT').getValue();
    	    	var ACTUAL_END_DT=Ext.getCmp('ACTUAL_END_DT').getValue();
    	    	var ACTUAL_EMP_ID1=Ext.getCmp('ACTUAL_EMP_ID1').getValue();
      	    	var ACTUAL_EMP_ID2=Ext.getCmp('ACTUAL_EMP_ID2').getValue();
      	    	var ACTUAL_EMP_ID3=Ext.getCmp('ACTUAL_EMP_ID3').getValue();
      	    	var TRAFFIC_TIME=Ext.getCmp('TRAFFIC_TIME').getValue();
 	    	    // var FILE_NAME=Ext.getCmp('FILE_NAME').getValue();
 	    	    var COMMENTS=Ext.getCmp('COMMENTS').getValue();
                var GOV_CHECK_TIME=Ext.getCmp('GOV_CHECK_TIME').getValue();
                if(GOV_CHECK_TIME==null){
                	GOV_CHECK_TIME='';
                };

                var date=new Date();
                //if((typeof(res[0].json.stext.GOV_CHECK_TIME)=='undefined'||parseInt(res[0].json.stext.GOV_CHECK_TIME)==(parseInt(date.getFullYear())-1))&&parseInt(res[0].json.stext.INSPECT_YEAR)==parseInt(date.getFullYear())){
                if(typeof(res[0].json.stext.GOV_CHECK_TIME)=='undefined'){    
                	if(res[0].json.stext.INSPECT_DAY=="0"){
                		var yearCheckTime=res[0].json.stext.INSPECT_YEAR+"-"+parseInt(res[0].json.stext.INSPECT_MONTH)+"-"+1+"  "+"00:00:00";
                	}else{
                		var yearCheckTime=res[0].json.stext.INSPECT_YEAR+"-"+parseInt(res[0].json.stext.INSPECT_MONTH)+"-"+res[0].json.stext.INSPECT_DAY+"  "+"00:00:00";
                	};
                    var planTime=new Date(res[0].json.stext.PLAN_START_DT);
                    planTime=planTime.getFullYear()+"-"+parseInt(planTime.getMonth()+1)+"-"+planTime.getDate()+"  "+"00:00:00";
                    	       

                     /*var ptime=obj.comptime(yearCheckTime,planTime);
                     var plantimes=res[0].json.stext.PLAN_TIMES;
                     if(ptime<0&&plantimes=="2"){
                    	 if(GOV_CHECK_TIME==''||GOV_CHECK_TIME==null||typeof(GOV_CHECK_TIME)=='undefined'){
                    	 	 //WL.Toast.show('请填写年检时间');
                    	 	 Ext.Msg.alert('请填写年检时间');
                    	     return;
                    	 }else{*/
                    
                    var plantimes=res[0].json.stext.PLAN_TIMES;
                    var pyear=res[0].json.stext.PLAN_YEAR;
                    var pmonth=res[0].json.stext.PLAN_MONTH;
                    var xyear=res[0].json.stext.INSPECT_YEAR;
                    var xmonth=res[0].json.stext.INSPECT_MONTH;
                    if(pyear>xyear&&pmonth==xmonth&&plantimes=="2"){
                    	if(GOV_CHECK_TIME==''||GOV_CHECK_TIME==null||typeof(GOV_CHECK_TIME)=='undefined'){
                    	    //WL.Toast.show('请填写年检时间');
                    		Ext.Msg.alert('请填写年检时间');
                    	    return;
                    	}else{

//                    	       if(res[0].json.stext.INSPECT_DAY=="0")
//                    	     	 var yearCheckTime=res[0].json.stext.INSPECT_YEAR+"-"+parseInt(res[0].json.stext.INSPECT_MONTH)+"-"+1+"  "+"00:00:00";
//                    	       else
//                    	         var yearCheckTime=res[0].json.stext.INSPECT_YEAR+"-"+parseInt(res[0].json.stext.INSPECT_MONTH)+"-"+res[0].json.stext.INSPECT_DAY+"  "+"00:00:00";
                    	     var endYearCheckTime=new Date(GOV_CHECK_TIME).getFullYear()+"-"+parseInt((new Date(GOV_CHECK_TIME).getMonth()+1))+"-"+new Date(GOV_CHECK_TIME).getDate()+"  "+"00:00:00";
                    	     var time=obj.comptime(yearCheckTime, endYearCheckTime);
                   	             
//                       	     if(time>60){
//                       	    	 //WL.Toast.show('年检时间已超过预计60天,不能填写');
//                       	    	 Ext.Msg.alert('年检时间已超过预计60天,不能填写');
//                       	    	 
//                       	    	 return;
//                       	     }
                    	     
                       	     if(time>60||time<-60){
                       	    	 navigator.notification.confirm('实绩年检时间与计划年检时间不相符（相差大于60天），是否继续提交？',function(btn){
                       	    		 if(btn ==2){
                       	    		 }else{
                       	    			 return;
                       	    		 }
         	   		 			},"提示","取消,确定");
                       	     };
                       	    // GOV_CHECK_TIME=Ext.Date.format(new Date(GOV_CHECK_TIME),'Y-m-d h:m:s');
                    	  };  
                    };
                    
                    if(GOV_CHECK_TIME==null||typeof(GOV_CHECK_TIME)=='undefined'||GOV_CHECK_TIME=='')
                    	GOV_CHECK_TIME='';
                    else
                    	GOV_CHECK_TIME=Ext.Date.format(new Date(GOV_CHECK_TIME),'Y-m-d h:m:s'); 
              
               }; 
                       	 	
                       	 	 if(typeof(res[0].json.stext.GOV_CHECK_TIME)!='undefined'&&parseInt(res[0].json.stext.GOV_CHECK_TIME)>=parseInt(date.getFullYear())){
                       			GOV_CHECK_TIME=='';
                       		  }else{
                       			  if(GOV_CHECK_TIME==''){
                       				GOV_CHECK_TIME='';
                       			  }else{
                       				  GOV_CHECK_TIME=Ext.Date.format(new Date(GOV_CHECK_TIME),'Y-m-d h:m:s');
                       			  }
                       		  }
                       	     //检查年检时间是否符合填写    res[0].json.stext.INSPECT_YEAR,INSPECT_MONTH,INSPECT_DAY  
                       	
                        	    var PLAN_STATUS=res[0].json.stext.PLAN_STATUS;
   	    	                    var PLAN_TIMES=res[0].json.stext.PLAN_TIMES;
  	    	    			    var UPDATED_BY=res[0].json.stext.UPDATED_BY;
  	    	    			    var MP_ID=res[0].json.stext.MP_ID;
  	    	    			    var TASK_ROW_ID=res[0].json.stext.TASK_ROW_ID;
  	    	    			    var CHANGE_MP_ID='';
                        		plan={PLAN_STATUS:PLAN_STATUS,PERSON_ID1:ACTUAL_EMP_ID1,
                        				PERSON_ID2:ACTUAL_EMP_ID2,PERSON_ID3:ACTUAL_EMP_ID3,ACTUAL_START_DT:ACTUAL_START_DT,
            	    	    			ACTUAL_END_DT:ACTUAL_END_DT,TRAFFIC_TIME:TRAFFIC_TIME,
            	    	    			COMMENTS:COMMENTS,UPDATED_BY:UPDATED_BY,UPDATED_BY:UPDATED_BY,MP_ID:MP_ID,
            	    	    			TASK_ROW_ID:TASK_ROW_ID,PLAN_TIMES:PLAN_TIMES,
            	    	    			GOV_CHECK_TIME:GOV_CHECK_TIME};
                      
                        		
                        var TASK_ROW_ID=Ext.getCmp('hidden2Task_row_Id').getValue();
         	        	var MP_ID=Ext.getCmp('hidden2_stext_MP_ID').getValue();
    	    			var query2={tid:MP_ID+"/",tcode:'MAINITEM'};
    	    			MaintenaceJsonStore.find(query2).then(function(rest1){
        	    			//获取保养项目的数据
    	    				var length=rest1.length;
    	    				var isOk=false;
        	    			if(typeof (rest1[0])=="undefined"||rest1[0].json.stext.PLAN_TIMES=="未完成"){
        	    				//WL.Toast.show('请完成保养项目的填写');
        	    				Ext.Msg.alert('请完成保养项目的填写');
      	    				  return;
      	    			    }else{
      	    			    	plan_item =[];
      	    			    	for(var i=0;i<length;i++){
      	    			    		if(rest1[i].json.stext.PLAN_TIMES=="未完成"){
      	    			    			//WL.Toast.show("请完成保养项目的填写");
      	    			    			Ext.Msg.alert('请完成保养项目的填写');
      	    			    			return;
      	    			    		}else{
      	    			    			plan_item[i] = rest1[i].json.stext;
      	    			    		}
      	    			    	}
      	    			    		      	    			    }
        	    			//开始控件的查询
        	    	 		var query4={tid:res[0].json.stext.MP_ID+"--"+res[0].json.stext.PLAN_START_DT,tcode:'_PARK'};
        	    	 		MaintenaceJsonStore.find(query4,options).then(function(rest2){
            	    		//获取控件中的数据
        	    	 		if(typeof(rest2[0])=='undefined'){
        	    	 			plan_part=[];
        	    	 		}else{
        	    	 			plan_part=rest2[0].json.stext;
        	    	 		}
            	    		
            	    		//开始查找	PLAN_PITEM 的数据了
            	    		var options1={exact:false};
         	    			var query3={tid:MP_ID+"_"+TASK_ROW_ID,tcode:'PLAN_PITEM'};
         	    			MaintenaceJsonStore.find(query3,options1).then(function(rest3){
         	    			//判断是否已经查找到PItem的数据
         	    				if(typeof(rest3[0])=="undefined"){
            	    				 // WL.Toast.show("请保存填写的整备项目信息");
            	    				 plan_pitem=[];
            	    				  //return;
            	    			    }else{
            	    			    plan_pitem =[];
            	    			    var id = '';
            	    			    var ja_type = [];
            	    			    var ja_key = [];
            	    			    var ja_value = [];
            	    			    var ja_temp = [];
            	    			    var jo_;
            	    			    var jo = {};
            	    			    for(var k=0;k<rest3.length;k++){
            	    			    	jo_=rest3[k].json.stext;
            	    			    	id += jo_.id;
            	    			    	ja_temp = jo_.type;
            	    			    	var leng = ja_temp.length;
            	    			    	for (var i = 0; i < leng; i ++) {
            	    			    		ja_type[ja_type.length]=ja_temp[i];
            	    			    	}
            	    			    	
            	    			    	ja_temp = jo_.key;
            	    			    	var leng = ja_temp.length;
            	    			    	for (var i = 0; i < leng; i ++) {
            	    			    		ja_key[ja_key.length]=ja_temp[i];
            	    			    	}
            	    			    	
            	    			    	
            	    			    	ja_temp = jo_.value;
            	    			    	var leng = ja_temp.length;
            	    			    	for (var i = 0; i < leng; i ++) {
            	    			    		ja_value[ja_value.length]=ja_temp[i];
            	    			    	}
            	    			    	
            	    			    	jo.id = id;
            	    			    	jo.type = ja_type;
            	    			    	jo.key = ja_key;
            	    			    	jo.value = ja_value;
            	    			    	jo.SBL_ROW_ID = jo_.SBL_ROW_ID;
            	    			    	jo.ROW_ID = jo_.ROW_ID;
            	    			    	
            	    			    }
            	    			    plan_pitem[0] = jo;
            	    		}
         	    				var  content="{'plan':"+JSON.stringify(plan)+",'plan_item':"+JSON.stringify(plan_item)+",'plan_pitem':"+JSON.stringify(plan_pitem)+",'plan_part':"+JSON.stringify(plan_part)+",'person_id':'"+person_id+"','GOV_CHECK_TIME':'"+GOV_CHECK_TIME+"','ASSET_NUM':'"+res[0].json.stext.ASSET_NUM+"'}";
         	    				navigator.notification.confirm('确认要提交吗？',function(btn){
         	   		 			if(btn ==2){
         	   		 				obj.onButtontap('Sub',eval("("+ content +")"));
         	   		 				//alert(content);
         	   		 			}else{
         	   		 				return;
         	   		 			}
         	   		 			},"提示","取消,确定");
//               	    			Ext.Msg.confirm('你好','确认要提交吗？',function(btn){
//               						if (btn == 'yes'){
//               							obj.onButtontap('Sub',eval("("+ content +")"));
//         	    				           alert(content);
////               							//obj.connectServer(getResult,'maintainancePlanItemListAction.do?method=toAdd',content);
//               						}else{
//               							return;
//               						}
//               						
//               	    			});
               	    		
               	    		//提交结束  
         	    			//修改初始化的数据为已完成
         	    			}).fail(function(rest3){
         	    				 WL.Toast.show("获取整备项目数据失败");
         	    			});
            	    	
            	    		}).then(function(err){
            	    			
            	    		});
        	    		}).fail(function(err){
        	              WL.Toast.show("获取保养项目数据失败");
        	    		});
        	    	}).fail(function(err){
        	    		  WL.Toast.show("获取提交数据失败");    		
        	    	});
    	    			
    	    		}).fail(function(err){
    	    			  WL.Toast.show("获取保养计划数据失败");
    	    		});
    	    		
   
    } ,
    //重置数据
    resetValue:function(){
    	var obj=this;
    	navigator.notification.confirm('确认重置吗？',function(btn){
 			if(btn ==2){
 				doClear();
 			}else{
 				return;
 			}
 		},"提示","取消,确定");
//    	Ext.Msg.confirm('你好','确认重置吗？',function(btn){
//				if (btn == 'yes'){
//					doClear();
//				}else{
//					return;
//				}
//    	});
    	function doClear(){
    		Ext.getCmp('ACTUAL_START_DT').setValue();
      	    Ext.getCmp('ACTUAL_END_DT').setValue();
      	    Ext.getCmp('ACTUAL_EMP_ID1').setValue('');
      	    Ext.getCmp('ACTUAL_EMP_ID2').setValue('');
      	    Ext.getCmp('ACTUAL_EMP_ID3').setValue('');
      	    Ext.getCmp('GOV_CHECK_TIME').setValue();
      	    Ext.getCmp('TRAFFIC_TIME').setValue();
      	    Ext.getCmp('ACTUAL_START_DT').setValue();
      	    Ext.getCmp('COMMENTS').setValue();
      	    
      	    var tid=Ext.getCmp('hidden2MP_ID').getValue();
            var TASK_ROW_ID=Ext.getCmp('hidden2Task_row_Id').getValue();
  	        var MP_ID=Ext.getCmp('hidden2_stext_MP_ID').getValue();
      	    var query={tid:tid+"_Value",tcode:tid+"_Value"};
      	    var MaintenaceJsonStore=WL.JSONStore.get(collectionName);
      	    var options={exact:true};
      		var store=obj.getStore('MaintenaceProtectPrjectStore',"HelcPDA.store.maintain.MaintenaceProtectPrjectStore");
      	    var MainPlan_MAINMAINITEM_CZ=Ext.getCmp('MainPlan_MAINMAINITEM_CZ').getValue();
        	var tempList=eval("("+MainPlan_MAINMAINITEM_CZ+")");
        	var length=tempList.length;
        	var tempI=null;
        	var tempList1=[];
        	if(typeof(tempList[0]._id)!='undefined'){
        		var temp={};
        		for(var i=0;i<length;i++){
        			temp.tid=tempList[i].json.tid;
        			temp.tcode=tempList[i].json.tcode;
        			temp.stext=tempList[i].json.stext;
        			tempList1[i]=temp;
        		}
        		tempList=tempList1;
        	}
        	for(var i=0;i<length;i++){
        		if(tempList[i].tid==MP_ID+"/"+TASK_ROW_ID){
        			tempI=i;
        		}
        	}
      	    
      	    
      	    MaintenaceJsonStore.find(query).then(function(res){
      	    	if(res.length>0){
      	    		var query1={_id:res[0]._id};
      	    		MaintenaceJsonStore.remove(query1).then(function(res){
      	    			//清除自己数据成功，开始向第一层副级清除数据,配件数据;
      	    			var query={tid:tid,tcode:'mainfields'};
      	    			MaintenaceJsonStore.find(query,options).then(function(res){
      	    	    		var query3={tid:res[0].json.stext.MP_ID+"--"+res[0].json.stext.PLAN_START_DT,tcode:'_PARK'};
      	    	    		MaintenaceJsonStore.find(query3,options).then(function(res){
      	    	    			//查看配件是否存在，如果存在，清除掉
      	    	    			if(res.length>0){
      	    	    				var query4={_id:res[0]._id};
          	    	    			MaintenaceJsonStore.remove(query4).then(function(){
          	    	    				//已经清除配件，开始清除下一级数据,保养项目数据
          	        	    			var query5={tid:MP_ID+"/"+TASK_ROW_ID,tcode:'MAINITEM'};
          	        	    			MaintenaceJsonStore.find(query5,options).then(function(res){
          	        	    				if(res.length>0){
          	        	    					var query6={_id:res[0]._id};
          	        	    					MaintenaceJsonStore.remove(query6).then(function(){
          	        	    						//开始清除次下一级数据
          	        	    						var query7={tid:MP_ID+"_"+TASK_ROW_ID,tcode:'PLAN_PITEM'};
          	        	    						MaintenaceJsonStore.find(query7,options).then(function(res){
          	        	    							if(res.length>0){
          	        	    								var query8={_id:res[0]._id};
          	        	    								MaintenaceJsonStore.remove(query8).then(function(){
          	        	    									//初始化插入MAINITEM 数据
          	        	    									var query9=tempList[tempI];
          	        	    									MaintenaceJsonStore.add(query9).then(function(){
          	        	    										WL.Toast.show("重置成功");
          	        	    										store.setData(tempList[tempI].stext);
          	        	    									}).fail(function(){});
          	        	    								}).fail(function(){
          	        	    								});
          	        	    							}else{
          	        	    								//初始化插入MAINITEM 数据
      	        	    									var query9=tempList[tempI];
      	        	    									MaintenaceJsonStore.add(query9).then(function(){
      	        	    										WL.Toast.show("重置成功");
      	        	    										store.setData(tempList[tempI].stext);
      	        	    									}).fail(function(){});
          	        	    							}
          	        	    						}).fail(function(){});
          	        	    					}).fail(function(){});
          	        	    				}else{
          	        	    					var query7={tid:MP_ID+"_"+TASK_ROW_ID,tcode:'PLAN_PITEM'};
      	        	    						MaintenaceJsonStore.find(query7,options).then(function(res){
      	        	    							if(res.length>0){
      	        	    								var query8={_id:res[0]._id};
      	        	    								MaintenaceJsonStore.remove(query8).then(function(){
      	        	    									//初始化插入MAINITEM 数据
      	        	    									var query9=tempList[tempI];
      	        	    									MaintenaceJsonStore.add(query9).then(function(){
      	        	    										WL.Toast.show("重置成功");
      	        	    										store.setData(tempList[tempI].stext);
      	        	    									}).fail(function(){});
      	        	    								}).fail(function(){
      	        	    								});
      	        	    							}else{
      	        	    								//初始化插入MAINITEM 数据
  	        	    									var query9=tempList[tempI];
  	        	    									MaintenaceJsonStore.add(query9).then(function(){
  	        	    										WL.Toast.show("重置成功");
  	        	    										store.setData(tempList[tempI].stext);
  	        	    									}).fail(function(){});
      	        	    							}
      	        	    						}).fail(function(){});
          	        	    					
          	        	    				}
          	        	    			}).fail(function(){});
          	    	    			}).fail(function(){});
      	    	    			}else{
      	    	    			//配件不存在，继续清除下一级数据
      	        	    			var query5={tid:MP_ID+"/"+TASK_ROW_ID,tcode:'MAINITEM'};
      	        	    			MaintenaceJsonStore.find(query5,options).then(function(res){
      	        	    				if(res.length>0){
      	        	    					var query6={_id:res[0]._id};
      	        	    					MaintenaceJsonStore.remove(query6).then(function(){
      	        	    						//开始清除次下一级数据
      	        	    						var query7={tid:MP_ID+"_"+TASK_ROW_ID,tcode:'PLAN_PITEM'};
      	        	    						MaintenaceJsonStore.find(query7,options).then(function(res){
      	        	    							if(res.length>0){
      	        	    								var query8={_id:res[0]._id};
      	        	    								MaintenaceJsonStore.remove(query8).then(function(){
      	        	    									//初始化插入MAINITEM 数据
      	        	    									var query9=tempList[tempI];
      	        	    									MaintenaceJsonStore.add(query9).then(function(){
      	        	    										WL.Toast.show("重置成功");
      	        	    										store.setData(tempList[tempI].stext);
      	        	    									}).fail(function(){});
      	        	    								}).fail(function(){
      	        	    								});
      	        	    							}else{
      	        	    								//初始化插入MAINITEM 数据
  	        	    									var query9=tempList[tempI];
  	        	    									MaintenaceJsonStore.add(query9).then(function(){
  	        	    										WL.Toast.show("重置成功");
  	        	    										store.setData(tempList[tempI].stext);
  	        	    									}).fail(function(){});
      	        	    							}
      	        	    						}).fail(function(){});
      	        	    					}).fail(function(){});
      	        	    				}else{
      	        	    					var query7={tid:MP_ID+"_"+TASK_ROW_ID,tcode:'PLAN_PITEM'};
  	        	    						MaintenaceJsonStore.find(query7,options).then(function(res){
  	        	    							if(res.length>0){
  	        	    								var query8={_id:res[0]._id};
  	        	    								MaintenaceJsonStore.remove(query8).then(function(){
  	        	    									//初始化插入MAINITEM 数据
  	        	    									var query9=tempList[tempI];
  	        	    									MaintenaceJsonStore.add(query9).then(function(){
  	        	    										WL.Toast.show("重置成功");
  	        	    										store.setData(tempList[tempI].stext);
  	        	    									}).fail(function(){});
  	        	    								}).fail(function(){
  	        	    								});
  	        	    							}else{
  	        	    								//初始化插入MAINITEM 数据
	        	    									var query9=tempList[tempI];
	        	    									MaintenaceJsonStore.add(query9).then(function(){
	        	    										WL.Toast.show("重置成功");
	        	    										store.setData(tempList[tempI].stext);
	        	    									}).fail(function(){});
  	        	    							}
  	        	    						}).fail(function(){});
      	        	    					
      	        	    				}
      	        	    			}).fail(function(){});
      	    	    			}
      	    	    			
      	    	    		}).fail(function(){});   
      	    	    		
      	    	    	}).fail(function(){});
      	    			
      	    		}).fail(function(){});
      	    	}else{
      	    		//当第一层数据不存在,配件开始清除数据，
      	    		var query={tid:tid,tcode:'mainfields'};
  	    			MaintenaceJsonStore.find(query,options).then(function(res){
  	    	    		var query3={tid:res[0].json.stext.MP_ID+"--"+res[0].json.stext.PLAN_START_DT,tcode:'_PARK'};
  	    	    		MaintenaceJsonStore.find(query3,options).then(function(res){
  	    	    			//查看配件是否存在，如果存在，清除掉
  	    	    			if(res.length>0){
  	    	    				var query4={_id:res[0]._id};
      	    	    			MaintenaceJsonStore.remove(query4).then(function(){
      	    	    				//已经清除配件，开始清除下一级数据
      	    	    				var query5={tid:MP_ID+"/"+TASK_ROW_ID,tcode:'MAINITEM'};
      	        	    			MaintenaceJsonStore.find(query5,options).then(function(res){
      	        	    				if(res.length>0){
      	        	    					var query6={_id:res[0]._id};
      	        	    					MaintenaceJsonStore.remove(query6).then(function(){
      	        	    						//开始清除次下一级数据
      	        	    						var query7={tid:MP_ID+"_"+TASK_ROW_ID,tcode:'PLAN_PITEM'};
      	        	    						MaintenaceJsonStore.find(query7,options).then(function(res){
      	        	    							if(res.length>0){
      	        	    								var query8={_id:res[0]._id};
      	        	    								MaintenaceJsonStore.remove(query8).then(function(){
      	        	    									//初始化插入MAINITEM 数据
      	        	    									var query9=tempList[tempI];
      	        	    									MaintenaceJsonStore.add(query9).then(function(){
      	        	    										WL.Toast.show("重置成功");
      	        	    										store.setData(tempList[tempI].stext);
      	        	    									}).fail(function(){});
      	        	    								}).fail(function(){
      	        	    								});
      	        	    							}else{
      	        	    								//初始化插入MAINITEM 数据
  	        	    									var query9=tempList[tempI];
  	        	    									MaintenaceJsonStore.add(query9).then(function(){
  	        	    										WL.Toast.show("重置成功");
  	        	    										store.setData(tempList[tempI].stext);
  	        	    									}).fail(function(){});
      	        	    							}
      	        	    						}).fail(function(){});
      	        	    					}).fail(function(){});
      	        	    				}else{
      	        	    					var query7={tid:MP_ID+"_"+TASK_ROW_ID,tcode:'PLAN_PITEM'};
  	        	    						MaintenaceJsonStore.find(query7,options).then(function(res){
  	        	    							if(res.length>0){
  	        	    								var query8={_id:res[0]._id};
  	        	    								MaintenaceJsonStore.remove(query8).then(function(){
  	        	    									//初始化插入MAINITEM 数据
  	        	    									var query9=tempList[tempI];
  	        	    									MaintenaceJsonStore.add(query9).then(function(){
  	        	    										WL.Toast.show("重置成功");
  	        	    										store.setData(tempList[tempI].stext);
  	        	    									}).fail(function(){});
  	        	    								}).fail(function(){
  	        	    								});
  	        	    							}else{
  	        	    								//初始化插入MAINITEM 数据
	        	    									var query9=tempList[tempI];
	        	    									MaintenaceJsonStore.add(query9).then(function(){
	        	    										WL.Toast.show("重置成功");
	        	    										store.setData(tempList[tempI].stext);
	        	    									}).fail(function(){});
  	        	    							}
  	        	    						}).fail(function(){});
      	        	    					
      	        	    				}
      	        	    			}).fail(function(){});
      	    	    			}).fail(function(){});
  	    	    			}else{
  	    	    			//配件不存在，继续清除下一级数据
  	    	    				var query5={tid:MP_ID+"/"+TASK_ROW_ID,tcode:'MAINITEM'};
  	        	    			MaintenaceJsonStore.find(query5,options).then(function(res){
  	        	    				if(res.length>0){
  	        	    					var query6={_id:res[0]._id};
  	        	    					MaintenaceJsonStore.remove(query6).then(function(){
  	        	    						//开始清除次下一级数据
  	        	    						var query7={tid:MP_ID+"_"+TASK_ROW_ID,tcode:'PLAN_PITEM'};
  	        	    						MaintenaceJsonStore.find(query7,options).then(function(res){
  	        	    							if(res.length>0){
  	        	    								var query8={_id:res[0]._id};
  	        	    								MaintenaceJsonStore.remove(query8).then(function(){
  	        	    									//初始化插入MAINITEM 数据
  	        	    									var query9=tempList[tempI];
  	        	    									MaintenaceJsonStore.add(query9).then(function(){
  	        	    										WL.Toast.show("重置成功");
  	        	    										store.setData(tempList[tempI].stext);
  	        	    									}).fail(function(){});
  	        	    								}).fail(function(){
  	        	    								});
  	        	    							}else{
  	        	    								//初始化插入MAINITEM 数据
	        	    									var query9=tempList[tempI];
	        	    									MaintenaceJsonStore.add(query9).then(function(){
	        	    										WL.Toast.show("重置成功");
	        	    										store.setData(tempList[tempI].stext);
	        	    									}).fail(function(){});
  	        	    							}
  	        	    						}).fail(function(){});
  	        	    					}).fail(function(){});
  	        	    				}else{
  	        	    					var query7={tid:MP_ID+"_"+TASK_ROW_ID,tcode:'PLAN_PITEM'};
          	    						MaintenaceJsonStore.find(query7,options).then(function(res){
          	    							if(res.length>0){
          	    								var query8={_id:res[0]._id};
          	    								MaintenaceJsonStore.remove(query8).then(function(){
          	    									//初始化插入MAINITEM 数据
	        	    									var query9=tempList[tempI];
	        	    									MaintenaceJsonStore.add(query9).then(function(){
	        	    										WL.Toast.show("重置成功");
	        	    										store.setData(tempList[tempI].stext);
	        	    									}).fail(function(){});
          	    								}).fail(function(){
          	    								});
          	    							}else{
          	    								//初始化插入MAINITEM 数据
      	    									var query9=tempList[tempI];
      	    									MaintenaceJsonStore.add(query9).then(function(){
      	    										WL.Toast.show("重置成功");
      	    										store.setData(tempList[tempI].stext);
      	    									}).fail(function(){});
          	    							}
          	    						}).fail(function(){});
  	        	    					
  	        	    				}
  	        	    			}).fail(function(){});
  	    	    			}
  	    	    			
  	    	    		}).fail(function(){});   
  	    	    		
  	    	    	}).fail(function(){});
      	    	}
      	    }) .fail(function(){});
    	}
    	  
    	    
    	    
    },
    //点击进入换件页面
    toRelacePanel:function(){
    	this.NextView('RepalcePanel','HelcPDA.view.maintain.MaintenanceReplacePanel');
    },
    
    OntoGetBackTap : function(thisObj,e,eOpts){
    	var v_Id = Ext.getCmp('MP_ID').getValue();
    	
    	var getResult = function(res){
    		var resp = res.PlanListRegain_Output;
    		if(resp.ErrorMsg){
    			Ext.Msg.show({
    				title:'温馨提示',
    				message:resp.ErrorMsg,
    				buttons:[{text:'确定',itemId:'ok'}],
    				fn:function(buttonId){
    					if(buttonId == 'ok'){
    						if(resp.ErrorMsg.indexOf('成功') > -1){
    							MainCtr.BackView();
    						}
    					}
    				}
    			})
    		}
    	}

    	var parameters = {
    		procedure : 'PlanListRegain',
    		isLoading : true,
    		MPlanId : v_Id,
    	};
    						
    	MainCtr.getDataFromServer(getResult,parameters);
    },
    
    //旧保养计划  回收开始
    toGetBack:function(){
    	var obj=this;
    var tid=Ext.getCmp('hidden2MP_ID').getValue();
    function getResult(res){
    	//Ext.Msg.alert(res.msginfo);
    	WL.Toast.show(res.msginfo);
    	if(res.msginfo=='回收成功'){
    		var MaintenaceJsonStore=WL.JSONStore.get(collectionName);
    		var query={tid:tid,tcode:'mainfields'};
    		MaintenaceJsonStore.find(query).then(function(res){
    			var length=res.length;
    			if(length>0){
    				res[0].json.stext.PLAN_STATUS='已计划';
    				var query=res[0];
    				MaintenaceJsonStore.refresh(query).then(function(){
    					 var query1={tcode:(res[0].json.tid+"_Value")};
    					 MaintenaceJsonStore.find(query1).then(function(rest){
    						 rest[0].json.status='';
    						 rest[0].json.stext.PLAN_STATUS="已计划";
    						 var query2=rest[0];
    						 MaintenaceJsonStore.refresh(query2).then(function(){
    							 var mp=rest[0].json.stext.MP_ID;
    							 Ext.getCmp('PLAN_STATUS').setValue('已计划');
    							 var  queryForItem={tid:mp+"/",tcode:"MAINITEM"};
    							 MaintenaceJsonStore.find(queryForItem).then(function(mainitem){
    								 mainitem[0].json.stext.PLAN_TIMES='未完成';
    								 MaintenaceJsonStore.refresh(mainitem[0]).then(function(){
    									 var store=obj.getStore('MaintenaceProtectPrjectStore','HelcPDA.store.maintain.MaintenaceProtectPrjectStore');
    								     store.setData(mainitem[0].json.stext);
    								     //刷新城西list
    								     //
    								      var stexts=res[0].json.stext;
    		                              var  MaintainAloneTime=stexts.PLAN_START_DT;
    		                              MaintainAloneTime=MaintainAloneTime.substring(0,10).trim();
    		                        //刷选list列表
    		                       		var MaintList=Ext.data.StoreManager.get('MaintainPlanList');
    		                       		if (!MaintList) { 
    		                       			MaintList = Ext.create("HelcPDA.store.maintain.MaintainPlanList"); 
    		                       		};
    		                       		console.log('为数据仓添加数据');
    		                           	var query={tcode:'mainfields',tid:MaintainAloneTime};
    		                       		var options={
    		                       			exacte:false,//默认
    		                       		};
    		                       		MaintenaceJsonStore.find(query,options).then(function(arrayResults){
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
    		                    					if(arrayResults[i].json.stext.PLAN_STATUS=='已计划'){
    		                    						trim.BYCSS='p_submit_yes';
    		                    					}else if(arrayResults[i].json.stext.PLAN_STATUS=='已提交'){
    		                    						trim.BYCSS='p_submit_no';
    		                    					}else if(arrayResults[i].json.stext.PLAN_STATUS=='正在等待提交'){
    		                    						trim.BYCSS='p_submit_yes';
    		                    					};
    		                    					//
    		                    					
    		                    					trim.HHMMTime=time[1];
    		                    					ndata[i]=trim;
    		                    					gjts[i]=arrayResults[i].json.stext.PLAN_TOOLS;
    		                    				};	
    		                    			}else{
    		                    				/*console.log('添加无明显显示');
    		                    				WL.Toast.show("当天暂无保养计划或已完成！");  */
    		                    			};
    		                    			
    		                    			var query={tcode:'_Value',tid:'_Value'};
    		                    			var optionsValue={};
    		                    			MaintenaceJsonStore.find(query,optionsValue).then(function(arrayResults){
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
    		                    								}else*/ if(arrayResults[j].json.status=='1'){
    		                    									ndata[i].PLAN_STATUS='正在等待提交';
    		                    								}else if(arrayResults[j].json.status=='2'){
    		                    									ndata[i].PLAN_STATUS='已提交';
    		                    									//alert('修改后  '+ndata[i].PLAN_STATUS);
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
    		                    			
    		                       			
    		                       			//把页面设置成可填写
//    		                    			 Ext.getCmp('ACTUAL_EMP_ID1').setDisabled(false);
//    		        	        	    	 Ext.getCmp('ACTUAL_EMP_ID2').setDisabled(false);
//    		        	        	    	 Ext.getCmp('ACTUAL_EMP_ID3').setDisabled(false);
    		        	        	    	 Ext.getCmp('ACTUAL_START_DT').setDisabled(false);
    		        	        	    	 Ext.getCmp('ACTUAL_END_DT').setDisabled(false);
//    		        	        	    	 Ext.getCmp('GOV_CHECK_TIME').setDisabled(false);
//    		        	        	    	 Ext.getCmp('TRAFFIC_TIME').setDisabled(false);
//    		        	        	    	 Ext.getCmp('ACTUAL_START_DT').setDisabled(false);
//    		        	        	    	 Ext.getCmp('COMMENTS').setDisabled(false);
    		                                 Ext.getCmp('take_picture').setDisabled(false);
    		                                 Ext.getCmp('see_picture').setDisabled(false);
    		                    			 Ext.getCmp('DetailPanel').enable();
    		                       		}).fail(function(errorObject){
    		                       			WL.Toast.show("查询数据失败");
    		                       		});
    		                              
    								 }).fail(function(){});
    							 }).fail(function(){});
    						 }).fail(function(){});	 
    					 }).fail(function(){});
    				}).fail(function(){});
    			}
    		}).fail(function(){});
    	}
    }	
    
    var MP_ID=Ext.getCmp('hidden2_stext_MP_ID').getValue();	
    var content="{'MP_ID':'"+MP_ID+"'}";
    var PLAN_STATUS=Ext.getCmp('PLAN_STATUS').getValue();
    if(PLAN_STATUS=='已提交'){
    	this.connectServer(getResult,'maintainancePlanItemListAction.do?method=toGetBack',content);  
    }else{
    	//Ext.Msg.alert('提示',"请先提交保养计划");
    	WL.Toast.show("请先提交保养计划");
    }
    },
    //点击返回按钮
    buttonMaintain:function(){
    	var obj=this;
    	var PLAN_STATUS=Ext.getCmp('PLAN_STATUS').getValue();
    	if(PLAN_STATUS=='已提交'||PLAN_STATUS=='正在等待提交'){
    		obj.BackView();
    	}else{
    		obj.BackView();
//    		navigator.notification.confirm('是否保存已填写的数据？',function(btn){
//     			if(btn ==2){
//     				obj.onButtontap();
//    				obj.BackView();
//     			}else{
//     				obj.BackView();
//     				return;
//     			}
//     		},"返回","取消,确定");
    	}
    
//    	Ext.Msg.confirm('你好','确定要返回吗，是否保存已填写的数据？',function(btn){
//				if (btn == 'yes'){
//					obj.onButtontap();
//					obj.BackView();
//				}else{
//					obj.BackView();
//					return;
//				}
//			});
    },
    //时间比较
     comptime:function(beginTime,endTime) {
        var beginTimes = beginTime.substring(0, 10).split('-');
        var endTimes = endTime.substring(0, 10).split('-');
        beginTime = beginTimes[1] + '/' + beginTimes[2] + '/' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
        endTime = endTimes[1] + '/' + endTimes[2] + '/' + endTimes[0] + ' ' + endTime.substring(10, 19);
        var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000/24;
        if (a < 0) {
            return a;
        } else if (a > 0) {
            return a;
        } else if (a == 0) {
            return a;
        } else {
            return 'exception';
        }
    },
    //通过相机获取图片
    take_picture:function(){
    	var obj=this;
    	navigator.camera.getPicture(
				function(data){
					var tempPic={};
					tempPic.src= data;//"data:image/jpeg;base64," +
					console.log("data:image/jpeg;base64," + data);
					picture_list.push(tempPic);
					var length=picture_list.length;
					Ext.getCmp('picture_listV').setHeight(length==0?0:(length+1)*35);
					var store=obj.getStore('MaintenacePictureStore','HelcPDA.model.maintain.MaintenacePictureModel');
					store.setData(picture_list);
				},
				function(e){
					WL.Toast.show("取消选择图片");
				},
				{
					quality: 20,
					destinationType:navigator.camera.DestinationType.FILE_URI , 
					sourceType: navigator.camera.PictureSourceType.CAMERA,
					allowEdit: true,
					encodingType: Camera.EncodingType.JPEG, 
//					targetWidth: value,
//					targetHeight: value,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: true,
					correctOrientation: true,
					cameraDirection: Camera.Direction.BACK 
				});	
    	
    },
    //浏览图片
    see_picture:function(){
    	var obj=this;
    	var store=obj.getStore('MaintenacePictureStore','HelcPDA.model.maintain.MaintenacePictureModel');
	
    	function onFail(e){
    		WL.Toast.show("取消选择图片");
    	}
    	function onPhotoURISuccess(data){
    		var tempPic={};
			tempPic.src= data; // "data:image/jpeg;base64," +
			console.log("data:image/jpeg;base64," + data);
    		picture_list.push(tempPic);
    		var length=picture_list.length;
			Ext.getCmp('picture_listV').setHeight(length==0?0:(length+1)*35);
    		store.setData(picture_list);
    	}
    	// capture callback
    	navigator.camera.getPicture(onPhotoURISuccess, onFail, 
    		{
    		quality: 80,
    	    destinationType: navigator.camera.DestinationType.FILE_URI ,
    	    sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
    	    allowEdit: true
    		});
    
    },
    //点击删除一张图片
    picture_listV:function(obj, index, target, record, e, eOpts){
    	var store=obj.getStore('MaintenacePictureStore','HelcPDA.model.maintain.MaintenacePictureModel');
    	if(event.target.id=="2"){
    		picture_list.splice(index, 1);
    		store.setData(picture_list);
    	}
    },
    gzcd:function(){
    	var ISACTIVE=Ext.getCmp('ISACTIVE').getValue();
    	if(ISACTIVE=='遥监激活'||ISACTIVE=="遥监已激活"){
    		//alert('hehe!');
    	
    	if(Ext.getCmp('MaintainTime')){
    		localStorage.MaintainTime = Ext.getCmp('MaintainTime').getValue();
    	}
    	localStorage.index = Ext.getCmp('listIndex').getValue();
    	localStorage.ViewId = Ext.Viewport.getActiveItem().id;
		localStorage.ViewName = Ext.Viewport.getActiveItem().__proto__.$className;
		localStorage.userid = copy_userid;
		localStorage.company_code = company_code;
		localStorage.station_id = station_id;
		localStorage.usernames = username1;
		localStorage.HQFlag = HQFlag;
		localStorage.roleStr = roleStr;
		localStorage.page = 'main';
		localStorage.YDYJ_flag = '2';
		localStorage.company_name=company_name;
		localStorage.phoneno=phoneno;
		localStorage.roleid=roleid;
		localStorage.rolename=rolename;
		cc.log(Ext.Viewport.getActiveItem().id+""+Ext.Viewport.getActiveItem().__proto__.$className);
    	//var ASSET_NUM = Ext.getCmp('ASSET_NUM').getValue();
		var orderno =Ext.getCmp('SR_NUMBER').getValue();
		//var START_TIME=new Date(Ext.getCmp('START_TIME').getValue());
		//START_TIME.setHours(START_TIME.getHours()-12)
		//var sendttime =Ext.Date.format(START_TIME,'Y-m-d h:m:s');
		var sendttime=Ext.getCmp('START_TIME').getValue();
		//var END_TIME=new Date(Ext.getCmp('START_TIME').getValue().replace(/-/g,"/"));
		//END_TIME.setHours(END_TIME.getHours()+12);
		//var endtime =Ext.Date.format(END_TIME,'Y-m-d h:m:s');
		//alert(sendttime+"ddd"+Ext.getCmp('START_TIME').getValue());
		//sendttime=encodeURIComponent("2015-09-13 11:24");
		var url = encodeURIComponent("index.html?page=main");
		location.href = "essIndex.html?page=FaultFile.html&action=search&orderno="+orderno+"&sendtime="+sendttime+"&from="+url;
		//location.href = "essIndex.html?page=FaultFile.html&action=search&orderno=1-1851723491&sendtime="+sendttime+" &from="+url;
    	}else 
    		Ext.Msg.alert('提示','遥监未激活/未安装');
    	}
    
});

function load1(content){
	    var tid=Ext.getCmp('hidden2MP_ID').getValue();
	  //进行提交 
	    MaintenaceJsonStore=WL.JSONStore.get(collectionName);
  		 var    getResult=function(err){
  				if(err.msginfo=='保存成功'){
  				//保存当前的东西到缓存 
          	     var query={tid:tid,tcode:'mainfields'};	
          	    MaintenaceJsonStore.find(query).then(function(res){
          	    		var stexts=res[0].json.stext;
                           stexts.PLAN_STATUS='正在等待提交';
                           console.log("ID: "+res[0]._id);
                           var query1={_id:res[0]._id,json:{tcode:'mainfields',tid:tid,stext:stexts}};
                          MaintenaceJsonStore.refresh(query1).then(function(res){

                            //
                              var  MaintainAloneTime=stexts.PLAN_START_DT;
                              MaintainAloneTime=MaintainAloneTime.substring(0,10).trim();
                        //刷选list列表
                       		var MaintList=Ext.data.StoreManager.get('MaintainPlanList');
                       		if (!MaintList) { 
                       			MaintList = Ext.create("HelcPDA.store.maintain.MaintainPlanList"); 
                       		};
                       		console.log('为数据仓添加数据');
                           	var query={tcode:'mainfields',tid:MaintainAloneTime};
                       		var options={
                       			exacte:false,//默认
                       		};
                       		MaintenaceJsonStore.find(query,options).then(function(arrayResults){
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
                    					if(arrayResults[i].json.stext.PLAN_STATUS=='已计划'){
                    						trim.BYCSS='p_submit_yes';
                    					}else if(arrayResults[i].json.stext.PLAN_STATUS=='已提交'){
                    						trim.BYCSS='p_submit_no';
                    					}else if(arrayResults[i].json.stext.PLAN_STATUS=='正在等待提交'){
                    						trim.BYCSS='p_submit_yes';
                    					};
                    					//
                    					
                    					trim.HHMMTime=time[1];
                    					ndata[i]=trim;
                    					gjts[i]=arrayResults[i].json.stext.PLAN_TOOLS;
                    				};	
                    			}else{
                    				/*console.log('添加无明显显示');
                    				WL.Toast.show("当天暂无保养计划或已完成！");  */
                    			};
                    			
                    			var query={tcode:'_Value',tid:'_Value'};
                    			var optionsValue={};
                    			MaintenaceJsonStore.find(query,optionsValue).then(function(arrayResults){
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
                    								}else*/ if(arrayResults[j].json.status=='1'){
                    									ndata[i].PLAN_STATUS='正在等待提交';
                    								}else if(arrayResults[j].json.status=='2'){
                    									ndata[i].PLAN_STATUS='已提交';
                    									//alert('修改后  '+ndata[i].PLAN_STATUS);
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
                    				
                    						//在添加新的数据
                    				Ext.Viewport.setActiveItem(Ext.getCmp('Maintainlist'));
                    					}).fail(function(errorObject){
                    						WL.Toast.show("查询数据失败");
                    					});
                    				
                    			
                    			
                    			
                       			//在添加新的数据
                       			//MaintList.setData(ndata, this);
                       			//
                       			
                       			
                       			
                       		}).fail(function(errorObject){
                       			WL.Toast.show("查询数据失败");
                       		});
                              
             	    	   }).fail(function(){
             	    		WL.Toast.show("修改初始化数据失败");
             	    	   });
                       	   
                       	   
                           }).fail(function(){
                           	WL.Toast.show("替换失败");
                           });
  				}
  			};
		var query={tid:tid+"_Submit",tcode:'UNCOMMIT_BYJH'};
		var query1={tid:tid,tcode:'mainfields'};	
		MaintenaceJsonStore.find(query).then(function(res){
			var ASSET_NUM=Ext.getCmp('ASSET_NUM').getValue();
			var PLAN_START_DT=Ext.getCmp('PLAN_START_DT').getValue();
			MaintenaceJsonStore.find(query1).then(function(rest){
				if(rest[0].json.status=='已计划'||rest[0].json.status=='已驳回'){
					WL.Toast.show("数据已进入待提交队列，请勿反复提交");
				}
				else{
						var query2={tcode:tid+'_Value'};
						MaintenaceJsonStore.find(query2).then(function(rest){
							//配置数据
							var ext1={};
							var tempExt={};
							ext1.url='maintainancePlanItemListAction.do?method=toAdd';
							tempExt.msg_title='保养计划';
							tempExt.msg_body=ASSET_NUM;
							tempExt.msg_result='';//'正在等待提交';
							ext1.obj=rest[0];
							ext1.msg=tempExt;
							ext1.view_id='HelcPDA.controller.maintain.MaintenaceCtrl';
							ext1.cparam = PLAN_START_DT;
							query1={tid:tid+"_Submit",tcode:'UNCOMMIT_BYJH',stext:content,ext1:ext1,status:'1'};
							rest[0].json.PLAN_STATUS='正在等待提交';
							var query3={_id:rest[0]._id,json:{stext:rest[0].json.stext,status:'1'}};
							MaintenaceJsonStore.add(query1).then(function(){
								MaintenaceJsonStore.refresh(query3).then(function(){
								 var res={};
					         res.msginfo='保存成功';
					         getResult(res);
					         //MaintenaceJsonStore.find({tcode:'UNCOMMIT'}).then(function(res){alert(JSON.stringify(res))}).fail(function(){});
								}).fail(function(){});
							}).fail(function(){});
						
						}).fail(function(){});
						
					
				
				}
			}).fail(function(){});
		
		}).fail(function(){});
		
		
		}


