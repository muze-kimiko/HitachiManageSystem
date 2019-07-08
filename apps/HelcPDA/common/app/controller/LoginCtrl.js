var objj;
var PDAflag = "";
Ext.define('HelcPDA.controller.LoginCtrl',
				{
					extend : 'HelcPDA.controller.ApplicationController',
					config : {
						refs : {
							loginButton : 'button[id=loginButton5]',
							reset : 'button[id=reset]',
							showMessage : 'button[id=showMessage]',
							
						},

						
						control : {
							loginButton : {
								tap : 'loginButton'
							},
							reset : {
								tap : 'reset'
							},
							showMessage : {
								tap : 'showMessage',
							},
							//点击list进入相应的模块
							"list#backlog_list":{
								itemtap:'backlog_list'
							},
//							"dataview#modules_dataview_id":{
//								rightchange:'modules_dataview_id'
//							},
						},
					},
					
//					rightchange : function( ){
//						alert('ss');
//					},
					
					//点击待办list进入相应的模块
					backlog_list : function(obj,index,target,record,e,eOpts){
						var obj = this;
						var TASK_NAME = record.data.TASK_NAME;
						if(TASK_NAME == '保养计划'){
							obj.NextView('MaintainPlanBackLogList','HelcPDA.view.MaintainPlanBackLogView');
							var getResult=function(res){
								var MaintailPlanBackLogStore = obj.getStore('MaintailPlanBackLogStore','HelcPDA.store.login.MaintailPlanBackLogStore');
								MaintailPlanBackLogStore.setData(res.items);
							};
							obj.connectServer(getResult, 'loginAction.do?method=getMaintainCount',JSON.stringify({person_id:person_id}));
						};
						if(TASK_NAME == '故障处理'){
							
							obj.NextView('faultHLP','HelcPDA.view.fault.FaultHandlingPanel');
							faultHandingPC_NEW(obj);
						};
						if(TASK_NAME == '安装计划'){
							intallplanDBXMnum=1;
							obj.NextView('installplan_id','HelcPDA.view.install.installplan.installPlan');
							
							//判断是从待办进还是安装项目进  1  2
							Ext.getCmp('intallplanDBXMnum').setValue(intallplanDBXMnum);
							
							//先未进场 在到在制
							installplan_AZJH_DB_HHFF(obj,'installplanfalse',false);
						};
						if(TASK_NAME == '安装排产'){//xcx  2014-7-31
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
							
							
						};
						if(TASK_NAME == '箱头发货'){
							obj.NextView('instsb_list_view','HelcPDA.view.install.installsendbox.InstallSendBox_List_V');
				    		var obj_v = Ext.getCmp('instsb_list_view');
							obj_v.loadDataJST();
							Ext.getCmp('hfmenu_daiban_flag').setValue('1');
						};
						if(TASK_NAME == '报检任务'){
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
						};
						if(TASK_NAME == '安装跟进'){
							
						};
						if(TASK_NAME == '移交完工'){
							
						};
						if(TASK_NAME == '退调'){
							
						};
						if(TASK_NAME == '退验'){
							
						};
						if(TASK_NAME == '已发货未进场'){
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
						};
						if(TASK_NAME == '调试菜单纸补录'){
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
							
						};
						if(TASK_NAME == '厂检菜单纸补录'){
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
						};
						if(TASK_NAME == '安装数据查询'){
							obj.showNextView('installAllSerach','install.installSearch.InstallAllSerach');
						}

					},
					
					MaaS360Detect : function() {
						if(Ext.os.is.Android){
							/**/
							cordova.exec(isOk,isFailure,'MaaS360Detect','init',[]);
							function isOk(resultdatas) {
								if(resultdatas != "SDKisSuccess"){
									Ext.getCmp('MaaS360Info').setValue(resultdatas);
									Ext.getCmp('IsEnrollMaaS360').setValue('N');
								}else{
									Ext.getCmp('IsEnrollMaaS360').setValue('Y');
								}
								
								//获取PDA是否受控标识
								cordova.exec(callbackOk,callbackFailure,'MaaS360Detect','info',[]);
								function callbackOk(resultdata) {
									var result = eval("("+ resultdata +")");
//									PDAflag = result.mKeyValuePairs.PDA;
									if(result.mKeyValuePairs){
										PDAflag = result.mKeyValuePairs.ownership;
									}else{
										console.log('---mDeviceOwnership:'+result.mDeviceOwnership);
										PDAflag = result.mDeviceOwnership;
									}
								}
								function callbackFailure(data) {
									alert('获取PDA是否受控失败!');
								}
							}
							function isFailure(data) {
								alert('失败了!');
							};
						}
					},
					//登录按钮
					loginButton : function() {
						objj = this;
						
						//Corporate Owned,Corporate Shared,CORPORATE,CORPORATE_SHARED
						if(false && PDAflag.toUpperCase().indexOf('CORPORATE') < 0 && Ext.os.is.Android){
							alert("设备不是日立PDA，不允许使用本应用!");
						}else{
							var username = null;
							var password = null;
							
							var page = localStorage.page;
							
							if(page != "" && page != null && typeof(page) != "undefined"){
								username = localStorage.loginusername;
								password = localStorage.loginpassword;
								PDAflag=localStorage.PDAflag;
								
							}else{
									username = Ext.getCmp('username').getValue();
									password = Ext.getCmp('password').getValue();
									localStorage.loginusername = username;
									localStorage.loginpassword = password;
							}
							if (username == null || username == '') {
								Ext.Msg.alert('用户名不能为空');
								return;
							}
							if (password == null || password == '') {
								Ext.Msg.alert('密码不能为空');
								return;
							}
							loginView = Ext.Viewport.getActiveItem();
							/// 获取设备信息
//							var resultdata = null;
//							try {
//								resultdata = eval("("+ resultdatas +")");
//							}catch (e) {
//								resultdata = null;
//							}
							var obj_appversion = document.getElementById("spn_app_version");
							var appversion = "";
							if (obj_appversion != undefined && obj_appversion != "" && obj_appversion != null) {
								appversion = obj_appversion.innerHTML;
							}
							//old
							var contentdata={username:username,password:password,appversion:appversion};
							//new
							//var IsUpdateLog="N";
							//var contentdata=[username,'',appversion,'','','','','','','',IsUpdateLog];

							/**/
							if(phoneinfo != null && phoneinfo.imei != null && phoneinfo.imei != '') {
								//old
								contentdata={username:username,password:password,imsi:phoneinfo.imsi,IMEI:phoneinfo.imei,uuid:phoneinfo.uuid,baseband_version:phoneinfo.baseband_version,android_version:phoneinfo.android_version,phone_model:phoneinfo.phone_model,isPDA3:true,appversion:appversion};
							    //new
								//contentdata=[username,'',appversion,resultdata.uuid,resultdata.imei,resultdata.imsi,resultdata.baseband_version,resultdata.android_version,resultdata.phone_model,'',IsUpdateLog];		
							}
							var content = JSON.stringify(contentdata);

							//zhj
                            if(page != "" && page != null && typeof(page) != "undefined"){
								//alert("hehe");
								var result1=eval("("+localStorage.res+")");
								//roleStr=localStorage.roleStr;
								//roledata=JSON.parse(localStorage.roledata);
								objj.httpSuccess(result1,objj);
								//alert("zhazha");
								
							}else{
								
//								function fn_toLogin(res,objj) {
//									if(typeof(res)=="undefined"){
//										Ext.Msg.alert('提示','服务器出错!');
//									} else if (res.isSuccessful == false) {
//										Ext.Msg.alert('提示','服务器链接出现问题!');
//									} else if (res.isSuccessful == true) {
//										var txt=res.CheckUserResponse.return;	
//						                if(window.DOMParser){
//						                	parser=new DOMParser();
//						                	xmlDoc=parser.parseFromString(txt,"text/xml");
//						                }else{
//						                	xmlDoc=newActiveXobject("Microsoft.XMLDOM");
//						                	xmlDoc.async="false";
//						                	xmlDoc.loadXML(txt);
//						                }
//										
//						                //判断用户是否登录成功
//										var IsSuccess=xmlDoc.getElementsByTagName("IsSuccess")[0].childNodes[0].nodeValue;
//										if(xmlDoc.getElementsByTagName("Msg")[0].hasChildNodes()){
//											Ext.Msg.alert(xmlDoc.getElementsByTagName("Msg")[0].childNodes[0].nodeValue);
//										}else if(!IsSuccess){	
//											Ext.Msg.alert(xmlDoc.getElementsByTagName("Msg")[0].childNodes[0].nodeValue);
//										}else{
//											//登录成功后判断记录登录账号
//											var checkuser = Ext.getCmp('checkuser').getValue();
//											if(checkuser==1){
//												Ext.getCmp('password').setValue('');
//											}else{
//												Ext.getCmp('username').setValue('');
//												Ext.getCmp('password').setValue('');
//											};
//											//那当前人的权限 zhj 10.15
//					
//										     var i;
//										     
//										     for(i=0;i<xmlDoc.getElementsByTagName("Rights").length;i++){
//										    	 roledata[i]=xmlDoc.getElementsByTagName("Rights")[i].getAttribute("code");
//					
//										     };
//										     roleStr=JSON.stringify(roledata);
//										     localStorage.roleStr = roleStr;
//										     localStorage.roledata= JSON.stringify(roledata);
//										    
//											//拿PDA信息
//											var params={};
//											params.adName='HttpAdapter_Pad_login';
//											params.method='GetPDAInfo';
//											params.parameters=contentdata;
//											objj.connectServer_ws(objj.httpSuccess,params);
//											
//										};
//										
//									};
//								};
//								//zhj
//								
//								var par_toLogin = {};
//								par_toLogin.adName = "HttpAdapter_Pad_login";
//								par_toLogin.method = "CheckUser";
//								par_toLogin.parameters =[username,password,"PDA"];
//								objj.connectServer_ws(fn_toLogin, par_toLogin);
//								objj.Waitting('正在登录...');

//                                old
								objj.asyconnectServer_(objj.httpSuccess,objj,'loginAction.do?method=toSearch', content);
								objj.Waitting('正在登录...');
							
							};	
						};
					/*}
						function isFailure(data) {
							alert('获取IMEI失败，请重新启动软件！');
						};*/
					},
					
					httpSuccess : function(result,obj){
						obj.HideWaitting();
						//zhj
						result=JSON.stringify(result);
						localStorage.res=result;
						result=eval("("+result+")");
						
//						//zhj 15.10.14
//						if(typeof(result)=="undefined"){
//							Ext.Msg.alert('提示','服务器出错!');
//							return;
//						} else if (result.isSuccessful == false) {
//							Ext.Msg.alert('提示','服务器链接出现问题!');
//							return;
//						} 
//						
//							//解析XML
//							var txt=result.GetPDAInfoResponse.return;	
//			                if(window.DOMParser){
//			                	parser=new DOMParser();
//			                	xmlDoc=parser.parseFromString(txt,"text/xml");
//			                }else{
//			                	xmlDoc=newActiveXobject("Microsoft.XMLDOM");
//			                	xmlDoc.async="false";
//			                	xmlDoc.loadXML(txt);
//			                }
//			                
//			                
//			                var IsSuccess=xmlDoc.getElementsByTagName("IsSuccess")[0].childNodes[0].nodeValue;
//							if(xmlDoc.getElementsByTagName("Msg")[0].hasChildNodes()){
//								Ext.Msg.alert(xmlDoc.getElementsByTagName("Msg")[0].childNodes[0].nodeValue);
//								return;
//							}else if(!IsSuccess){	
//								Ext.Msg.alert(xmlDoc.getElementsByTagName("Msg")[0].childNodes[0].nodeValue);
//								return;
//							};
//							
//							if(xmlDoc.getElementsByTagName("userid")[0].hasChildNodes()){
//				                userid=xmlDoc.getElementsByTagName("userid")[0].childNodes[0].nodeValue;
//				                copy_userid = userid;
//				                console.log("1");
//							};
//							if(xmlDoc.getElementsByTagName("username")[0].hasChildNodes()){
//								usernames=xmlDoc.getElementsByTagName("username")[0].childNodes[0].nodeValue;
//				                username1 = usernames;
//				                console.log("2");
//							};
//							if(xmlDoc.getElementsByTagName("roleid")[0].hasChildNodes()){
//								roleid=xmlDoc.getElementsByTagName("roleid")[0].childNodes[0].nodeValue;
//								console.log("3");
//							};
//							if(xmlDoc.getElementsByTagName("rolename")[0].hasChildNodes()){
//								rolename=xmlDoc.getElementsByTagName("rolename")[0].childNodes[0].nodeValue;
//								pdarole=rolename;
//								console.log("4");
//							};
//							if(xmlDoc.getElementsByTagName("isLeader")[0].hasChildNodes()){
//								isLeader=xmlDoc.getElementsByTagName("isLeader")[0].childNodes[0].nodeValue;
//								console.log("5");
//							};
//							if(xmlDoc.getElementsByTagName("HQFlag")[0].hasChildNodes()){
//								HQFlag=xmlDoc.getElementsByTagName("HQFlag")[0].childNodes[0].nodeValue;
//								console.log("6");
//							};
//							if(xmlDoc.getElementsByTagName("enabledflag")[0].hasChildNodes()){
//								enabledflag=xmlDoc.getElementsByTagName("enabledflag")[0].childNodes[0].nodeValue;
//								console.log("7");
//							};
//							if(xmlDoc.getElementsByTagName("rem1")[0].hasChildNodes()){
//								rem1=xmlDoc.getElementsByTagName("rem1")[0].childNodes[0].nodeValue;
//								console.log("8");
//							};
//				
//							if(xmlDoc.getElementsByTagName("sbl_row_id")[0].hasChildNodes()){
//								sbl_row_id=xmlDoc.getElementsByTagName("sbl_row_id")[0].childNodes[0].nodeValue;
//								console.log("9");
//							};
//							if(xmlDoc.getElementsByTagName("init_person_id")[0].hasChildNodes()){
//								init_person_id=xmlDoc.getElementsByTagName("init_person_id")[0].childNodes[0].nodeValue;
//								console.log("10");
//							};
//							if(xmlDoc.getElementsByTagName("company_code")[0].hasChildNodes()){
//								company_code=xmlDoc.getElementsByTagName("company_code")[0].childNodes[0].nodeValue;
//								console.log("11");
//							};
//				
//							if(xmlDoc.getElementsByTagName("company_code_1")[0].hasChildNodes()){
//								company_code_1=xmlDoc.getElementsByTagName("company_code_1")[0].childNodes[0].nodeValue;
//								console.log("12");
//							};
//							
//							if(xmlDoc.getElementsByTagName("company_name")[0].hasChildNodes()){
//								company_name=xmlDoc.getElementsByTagName("company_name")[0].childNodes[0].nodeValue;
//								console.log("13");
//							};
//							
//							if(xmlDoc.getElementsByTagName("init_person_id")[0].hasChildNodes()){
//								init_person_id=xmlDoc.getElementsByTagName("init_person_id")[0].childNodes[0].nodeValue;
//								console.log("14");
//							};
//							if(xmlDoc.getElementsByTagName("Org_Id")[0].hasChildNodes()){
//								Org_Id=xmlDoc.getElementsByTagName("Org_Id")[0].childNodes[0].nodeValue;
//								console.log("15");
//							};
//							
//							if(xmlDoc.getElementsByTagName("station_id")[0].hasChildNodes()){
//								station_id=xmlDoc.getElementsByTagName("station_id")[0].childNodes[0].nodeValue;
//								console.log("16");
//							};
//							
//							if(xmlDoc.getElementsByTagName("position_type")[0].hasChildNodes()){
//								position_type=xmlDoc.getElementsByTagName("position_type")[0].childNodes[0].nodeValue;
//								console.log("17");
//							};
//							
//							if(xmlDoc.getElementsByTagName("isnewversion")[0].hasChildNodes()){
//								isnewversion=xmlDoc.getElementsByTagName("isnewversion")[0].childNodes[0].nodeValue;
//								console.log("18");
//							};
//							
//							if(xmlDoc.getElementsByTagName("forceflag")[0].hasChildNodes()){
//								forceflag=xmlDoc.getElementsByTagName("forceflag")[0].childNodes[0].nodeValue;
//								console.log("19");
//							};
//							if(xmlDoc.getElementsByTagName("pw_last_update_date")[0].hasChildNodes()){
//								pw_last_update_date=xmlDoc.getElementsByTagName("pw_last_update_date")[0].childNodes[0].nodeValue;
//								console.log("20");
//							};
//							if(xmlDoc.getElementsByTagName("c_time")[0].hasChildNodes()){
//								c_time=xmlDoc.getElementsByTagName("c_time")[0].childNodes[0].nodeValue;
//								console.log("21");
//							};
//							if(xmlDoc.getElementsByTagName("person_id")[0].hasChildNodes()){
//								person_id=xmlDoc.getElementsByTagName("person_id")[0].childNodes[0].nodeValue;
//								console.log("22");
//							};
//							if(xmlDoc.getElementsByTagName("ebs_user_id")[0].hasChildNodes()){
//								ebs_user_id=xmlDoc.getElementsByTagName("ebs_user_id")[0].childNodes[0].nodeValue;
//								console.log("23");
//							};
//							
//	                 		//保留变量
//							moduleid="";modulename="";
							
						//old
						if(result == null || result.msginfo!=undefined){
							return;
						}
						var json = result;
		                userid=json.rows[0].userid;
		                //从日滨页面返回回来
//						var page = localStorage.page;
//						if(page == "" || page == null || typeof(page) == "undefined"){
//							if(loginpassword == null ){
//								loginpassword = Ext.getCmp('password').getValue();
//							}
//						}
		                copy_userid = userid;
		                roleStr = JSON.stringify(json.role);
		                roledata=json.role;
//		                console.log('roleStr : '+roleStr); 
		                usernames=json.rows[0].username;
		                username1 = usernames;
		                console.log('username : '+usernames);  
		                console.log('Org_Id : '+json.rows[0].Org_Id);  
		                roleid=json.rows[0].roleid;
		                phoneno=json.rows[0].phoneno;
		                pdarole=json.rows[0].rolename;
		                rolename=json.rows[0].rolename;
		                isLeader=json.rows[0].isLeader;
		                
		                HQFlag=json.rows[0].HQFlag;
		           
		                moduleid=json.rows[0].moduleid; modulename=json.rows[0].modulename;
		             
		                enabledflag=json.rows[0].enabledflag; rem1=json.rows[0].rem1;
		             
		                sbl_row_id=json.rows[0].sbl_row_id; person_id=json.rows[0].person_id;
		              
		                ebs_user_id=json.rows[0].ebs_user_id; init_person_id=json.rows[0].init_person_id;
		               
		                company_code=json.rows[0].company_code; company_code_1=json.rows[0].company_code_1;
		                
		                company_name=json.rows[0].company_name; Org_Id=json.rows[0].Org_Id;
		              
		                station_id=json.rows[0].station_id; position_type=json.rows[0].position_type;
		               
		                isnewversion=json.rows[0].isnewversion; forceflag=json.rows[0].forceflag;
		               
		                pw_last_update_date=json.rows[0].pw_last_update_date;
		               
		                c_time=json.rows[0].c_time;
		                //zhj 15 12 31
		                station_name=json.rows[0].STATION_NAME;
		             	console.log("zha111"+station_name);
		             	
		             	power = "";
						for(var k = 0 ;k<roledata.length;k++){
							//保养计划
							if(roledata[k]=='baoyangjihua'){
								power +="baoyangjihua";
							}
							//安装项目
							if(roledata[k]=='anzhuangguocheng'){
								power +="anzhuangguocheng";
							}
						}
						console.log("power:"+power);
		             	
		            	// 初始化user  不能用数字开头 不能包含下划线
		               	collectionName='DB'+userid;
		                var reg = new RegExp('_','g');
		               	collectionName = collectionName.replace(reg,'');
		            	var collections={};
		            	collections[collectionName]={};
		            	collections[collectionName].searchFields={jnlno:'integer',tcode:'string',tid:'string',stext:'string',stext_read:'string',
		            			files:'string',files_read:'string',status:'string',uuid:'string',versionCode:'integer',versionName:'string',created_time:'string',
		            			last_updated_time:'string',ext1:'string',ext2:'string',ext3:'string',ext4:'string',ext5:'string',formwork:'string',content:'string',project_num:'string',demand:'string',formwork_type:'string',formwork_id:'integer',remark:'string'};
		            	/**/
		            	try{
		            		var optionss = {};
			            	WL.JSONStore.init(collections, optionss).then(function(){
			            		// 开启定位
			            		if(Ext.os.is.Android){
			            			cordova.exec(function(rds){},function(){},'CommonPlugin','Init',[userid]);
			            		}
			            		
			            		
			            		// 开启定时任务
			            		obj.getApplication().getController('HelcPDA.controller.MenusViewCtrl').starCommitTask();
								// 初始化保养全局变量
								obj.MainQJBL_initialize();
								
								var obj_menu = Ext.getCmp('MenusView_id');
								
								//czq
//								obj.refresh_wtd();
								obj.refresh_wtd2016();
//								obj_menu.refresh_wtd();
								
								// 启动消息提示 czq
//								obj.loadMessage();
								obj.loadMessage2016();
								
								if(power=="baoyangjihua"){
									//新维保界面获取数据 开始
									faultHandingPC_NEW(obj);
									obj.getHomeMaintainPlan(obj);
									GetFaultReport(person_id);
									//新维保界面获取数据 结束
								}
								
								// 连接推送服务器
								if (Ext.os.is.Android) {
									doconnect(userid);
								}
			            		
			            	}).fail(function(errorObject){
			            		if(errorObject.msg == 'PROVISION_TABLE_SEARCH_FIELDS_MISMATCH'){
			            			try{
			            				WL.JSONStore.destroy().then(function(){
				            				Ext.Msg.show({
				     						   title: '温馨提示',
				     						   message: '<center>用户环境重新初始化完成<br>PDA程序将重新启动</center>',
//				     						   width: 300,
				     						   buttons: Ext.MessageBox.OK,
				     						   fn: function(buttonId) {
				     							   if(buttonId=='ok'){ 
				     								   WL.Client.reloadApp();
				     							   }
				     						   }
				            				});
				            			}).fail(function(err){
				            				Ext.Msg.alert('温馨提示', '用户环境重新初始化失败！<br>请尝试删除应用后重装。<br>如还未能解决，请联系管理员！');
				            			});
			            			}catch(eee) {
			            				alert('用户环境清除错误:'+eee);
			            			}
			            		}else{
			            			alert("用户环境初始化失败:"+errorObject);
			            		}
			            	});
		            	} catch(ee) {
		            		alert('用户环境初始化错误:'+ee);
		            	}
		            	
//		            	var showImei = document.getElementById('showImei').innerHTML;
//		            	if (showImei == "868232000324178") {
//		            		alert(username1+'，欢迎您！');
//		            	}
		            	//alert('rty');
						/***
						 * 引入了新页面，根据权限进入不同的首页
						 * 1。如果用户拥有管理员权限，进入管理员首页：New_Admin_view
						 * 2。安装人员则进入安装首页：New_Instll_view
						 * 3。维保人员则进入相应的维保首页:New_Maintain_view
						 * 4。当没有以上权限时，进入原来的首页:MenusView
						 * */
						
		            	
						
						//YDYJ_flag==1从首页移动遥监返回
						//YDYJ_flag==2从实时监控或调试返回
						if(localStorage.YDYJ_flag == "1"){
							localStorage.YDYJ_flag = '';
							localStorage.page = '';
						}
						
						//czq login后跳转						
						if("PDA管理员角色"==pdarole || power=="baoyangjihuaanzhuangguochenganzhuangguocheng"){
							pdarole = "PDA管理员角色";
							//拥有管理员权限
							obj.NextView('New_Admin_view_id','HelcPDA.view.New_Admin_view');
							obj.getApplication().getController('MenusViewCtrl').NewView_power(power);
//							obj.NextView('New_Home2016','HelcPDA.view.New_Home2016');
//							obj.getApplication().getController('New_Home2016Ctrl').NewView_power2016(power);
						}else if(power=="anzhuangguocheng" || power=="anzhuangguochenganzhuangguocheng"){
							//安装人员权限
							obj.NextView('New_Install_view_id','HelcPDA.view.New_Install_view');
							obj.getApplication().getController('MenusViewCtrl').NewView_power(power);
						}else if(power=="baoyangjihua"){
							//维保人员权限
//							obj.NextView('New_Maintain_view_id','HelcPDA.view.New_Maintain_view');
//							obj.getApplication().getController('MenusViewCtrl').NewView_power(power);
							obj.NextView('New_Home2016','HelcPDA.view.New_Home2016');
							obj.getApplication().getController('New_Home2016Ctrl').NewView_power2016(power);
						}else{
							// 其它角色都暂时给管理员权限
							obj.NextView('New_Admin_view_id','HelcPDA.view.New_Admin_view');
							obj.getApplication().getController('MenusViewCtrl').NewView_power(power);
							/*obj.NextView('MenusView_id','HelcPDA.view.MenusView');
							obj.getApplication().getController('MenusViewCtrl').OldView_power(result,obj);*/

						}


//						obj.getApplication().getController('MenusViewCtrl').new_view_report();
//						obj.getApplication().getController('MenusViewCtrl').news_panel();

						//czq 维保界面优化屏蔽
//						obj.modules_dataview();
						
						//从日滨页面返回回来
						var page = localStorage.page;
						if(page != "" && page != null && typeof(page) != "undefined"){
							//急修处理
							if(ViewId == "FaultFHDP"){
								obj.NextView('faultHLP','HelcPDA.view.fault.FaultHandlingPanel');
								faultHandingPC_NEW(obj);
							}else if(ViewId == "DetailPanel"){
								obj.getApplication().getController('maintain.MaintenaceCtrl').MPPDateButton();
							}
						}
					},
				
					modules_dataview : function() {
				    	var obj = this;
				    	Ext.getCmp('modules_left').setHidden(true);
				    	//左右滑动功能模块
				    	Ext.getCmp('modules_dataview_id').getScrollable().getScroller().addListener('scrollend',function(obj, x, y, eOpts){
				    		console.log("x="+x+"   objX="+obj.position.x+"   maxX="+obj.maxPosition.x);
				    		//当划到最左边，右边有未显示的模块时
				    		if(obj.position.x==0 && obj.maxPosition.x!=0){
				    			Ext.getCmp('modules_left').setHidden(true);
				    			Ext.getCmp('modules_right').setHidden(false);
				    		}
				    		//当划到中间位置，即左右两边都有未显示完整的模块时;
				    		if(obj.position.x!=0 && obj.maxPosition.x!=0 && obj.position.x!=obj.maxPosition.x){
				    			Ext.getCmp('modules_left').setHidden(false);
				    			Ext.getCmp('modules_right').setHidden(false);
				    		}
				    		
				    		//当划到最右边，左边有未显示完整的模块时;
				    		if(obj.position.x==obj.maxPosition.x){
				    			Ext.getCmp('modules_left').setHidden(false);
				    			Ext.getCmp('modules_right').setHidden(true);
				    		}
				    	});
					},
					
					reset : function() {
                      var collectionName='Message';
                      var collections={};
                      collections[collectionName]={};
                      collections.searchFields={id:'integer',call:'integer'};
                      WL.JSONStore.init(collections).then(function(){
                    	 var data={id:1,call:12121312}; 
                    	  WL.JSONStore.get(collectionName).add(data).then(function(){
                    		WL.JSONStore.get(collectionName).findAll().
                    		then(function(Results){
                    			var akb=Results[0].json;
                    		}).fail(function(errorObject){
                    			alert(errorObject);
                    		});
                    		WL.JSONStore.get('people').findAll().
                    		then(function(Results){
                    			var aks=Results[0].json;
                    		}).fail(function(errorObject){
                    			alert(errorObject);
                    		});
                    		 
                    	  }).fail(function(errorObject){
                    		  alert(errorObject);
                    	  });
                    	  
                      }).fail(function(errorObject){
                    	  alert('error:'+errorObject);
                      });

					},
					
					showMessage : function() {
	                   var collectionName='people';
	                   var people=WL.JSONStore.get(collectionName);
	                   var query={name:'carlos'};
	                   var options={};
	                   people.find(query).
	                   then(function(arrayResults){
	                   	var abs= arrayResults[0].json;
	                   	 var document={_id:1,json:{name:'carlitos',age:99}};
	                   	 WL.JSONStore.get(collectionName).replace(document,options).
	                   	 then(function(){
	                   		 var query1={name:'carlitos'};
	                   		 WL.JSONStore.get(collectionName).find(query1).
	                   		 then(function(arrResults){
	                   			 var aas=arrResults[0].json;
	                   		 }).fail(function(errorObject){
	                   			 alert(errorObject);
	                   		 });
	                   	 }).fail(function(errorObject){
	                   		 alert(errorObject);
	                   	 });
	                   	 
	                    }).fail(function(arrayResults){
	                   	 
	                    });
					},
					hold : function(){
						Ext.getCmp('chat_container').getScrollable().getScroller().scrollToEnd();
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
					
					// 定时任务
					starCommitTask: function() {
						commitTask = setInterval(objj.toCommitWaitingData,1000*60*5);
					},
					
					
					// 定时任务提交,不可传参数，传参数就无法调用
					toCommitWaitingData : function() {
						var this_obj = this;
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
							// 同时提交所有待提交数据
							for (var i = 0; i < length; i ++) {
								var item = arrayResults2[i];
								if (i == length - 1) {
									item.isLast = true;					
								} else {
									item.isLast = false;
								}
								objj.asyconnectServer_(handleResult,item,item.json.ext1.url,JSON.stringify(item.json.stext));
							}
							// 获取返回结果
							var items = [];
							var items_t = [];
							var index = 0;
							function handleResult(result,item) {
								isRunningCommit = false;
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
								} else if (result == null || result.msgid == 1) { // 其他不正常返回
									item.json.ext1.msg.msg_result = "<span>提交失败，正在等待下一次重试！</span>";
									item_msgs[item_msgs.length] = item.json.ext1.msg;
									if (item_t.isArray) {
										for (var i = 0; i < item_t.data.length; i ++) {
//											alert("item_t:"+item_t.data[i]);
											item_t.data[i].json.status = '1';
											items_t[items_t.length] = item_t.data[i];
										}
									} else {
										item_t.json.status = '1';
										items_t[items_t.length] = item_t;										
									}
								} else if (result.msgid == 1) {
									item.json.ext1.msg.msg_result = "<span style='color:#ff0000'>提交失败，手动删除本数据后重新提交！</span>";
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
								// 改变原数据的状态
								WL.JSONStore.get(collectionName).refresh(items_t,options).then(function(){
									// 实时刷新列表的状态
									try {
										var rctrl = objj.getApplication().getController(item.json.ext1.view_id);
										if (rctrl != undefined) {
											rctrl.LoadGHlist(item.json.ext1.cparam);
										}
										if (index == length - 1) { 
											// 当时最后一次的时候，一起去刷新JsonStore数据
											var options = {};
											var _ids = items[0]._id;
											WL.JSONStore.get(collectionName).refresh(items,options).then(function(arrayResults2){
												// test
												var test_sel = {_id:_ids};
												WL.JSONStore.get(collectionName).find(test_sel,options).then(function(arrs){
												});
												
												// 刷新界面数据，页面存在的时候才去刷
												var view = Ext.getCmp('wfc_list_view');
												if (view) {
													var store = Ext.data.StoreManager.get("WaitingForCommitDataStore");
													if (!store) {
														store = Ext.create("HelcPDA.store.waitingdata.WaitingForCommitDataStore");
													}
													store.setData(item_msgs);
													WL.Toast.show('数据提交完成！');
												}
												var obj_menu = Ext.getCmp('MenusView_id');
												//czq
//												this_obj.refresh_wtd();
												this_obj.refresh_wtd2016();
											}).fail(function(errorObject){
												WL.Toast.show('提交失败');
											});
										}
										index ++;
									} catch(err) {
									}
								}).fail(function(errorObject){
									WL.Toast.show('提交失败');
								});
								
							}
						}).fail(function(errorObject){
						});
					},
					
					/**
					 * 调用全局变量的方法
					 */
					//初始化(每次进来先删除JSON中所有数据)
					MainQJBL_initialize : function(){
						return;
						var MaintainList=WL.JSONStore.get(collectionName);
						var options={
								exacte:false,//默认
						};
						var trim={tcode:'QJBL'};
						MaintainList.find(trim,options).then(function(arrayResults){
							var num=arrayResults.length;
							//alert('初始化长度： '+ num);
							if(num==0){//直接加
								var  Data=[];
							
								MaintainList.add(Data).then(function(){
									console.log('全局变量初始化完成');
								}).fail(function(errorObject){
									console.log('全局变量初始化失败');
								});
							}else if(num>0){//先删后加
								MaintainList.remove(trim,options).then(function(){
									console.log('全局变量清除成功2');
									var  Data=[];
									
									MaintainList.add(Data).then(function(){
										console.log('全局变量初始化完成2');
									}).fail(function(errorObject){
										console.log('全局变量初始化失败2');
									});
									
								}).fail(function(errorObject){
									console.log('全局变量清除失败');
								});
							};

						}).fail(function(errorObject){
							console.log('全局变量查询失败');
						});
					},
				
});
