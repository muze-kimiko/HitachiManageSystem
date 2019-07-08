
/* JavaScript content from app/controller/login/PADLoginCtrl.js in folder common */
/**
 * Made by lgs
 */
var loginView;
Ext.define('HelcPAD.controller.login.PADLoginCtrl', {
	extend:'HelcPAD.controller.ApplicationController',

    config: {
        control: {
    		"button#loginButton":{
    			tap:'loginButton'
    		}
        }
    },
    
    MaaS360Detect : function() {
		/**/
		cordova.exec(isOk,isFailure,'MaaS360Detect','init',[]);
		function isOk(resultdatas) {
			if(resultdatas != "SDKisSuccess"){
				if(resultdatas == "该设备没有安装MaaS360"){
					resultdatas = "需要先安装MaaS360安全软件！<br>请联系管理员。";
				}
				Ext.Msg.alert("警告",resultdatas,function(){
					WL.App.close();
				});
			}else{
				console.log("maas360初始化成功");
			}
			
		}
		function isFailure(data) {
			alert('失败了!');
		};
	},
    
    loginButton:function(){
    	obj=this;
    	var loginArray=["username","password"];
    	var loginMsg=this.getElement(loginArray);
    	username = loginMsg[0];
		var password = loginMsg[1];
     	if (username == null || username == '') {
			Ext.Msg.alert('提示','请输入用户名!');
			return;
		};
		if (password == null || password == '') {
			Ext.Msg.alert('提示','请输入密码!');
			return;
		};
		
		loginView = Ext.Viewport.getActiveItem();
		//loginView.setDisabled(true); 就是这个的错

		myLogining.show();
    	//将loginMsg连接服务器进行验证、
		getResult = function(res){
			console.log(res);
			if(typeof(res)=="undefined"){
				Ext.Msg.alert('提示','服务器出错!');
				myLoading.hide();
			} else if (res.isSuccessful == false) {
				Ext.Msg.alert('提示','服务器链接出现问题!');
				myLoading.hide();
			} else if (res.isSuccessful == true) {
				var txt=res.CheckUserResponse["return"];
                if(window.DOMParser){
                	parser=new DOMParser();
                	xmlDoc=parser.parseFromString(txt,"text/xml");
                }else{
                	xmlDoc=newActiveXobject("Microsoft.XMLDOM");
                	xmlDoc.async="false";
                	xmlDoc.loadXML(txt);
                }
				
                //判断用户是否登录成功
				var IsSuccess=xmlDoc.getElementsByTagName("IsSuccess")[0].childNodes[0].nodeValue;
				if(xmlDoc.getElementsByTagName("Msg")[0].hasChildNodes()){
					Ext.Msg.alert('温馨提示',xmlDoc.getElementsByTagName("Msg")[0].childNodes[0].nodeValue);
					myLoading.hide();
				}else if(!IsSuccess){
					Ext.Msg.alert('温馨提示',xmlDoc.getElementsByTagName("Msg")[0].childNodes[0].nodeValue);
					myLoading.hide();
				}else{
					//登录成功后判断记录登录账号
					var checkuser = Ext.getCmp('checkuser').getValue();
					if(checkuser==1){
						Ext.getCmp('password').setValue('');
					}else{
						Ext.getCmp('username').setValue('');
						Ext.getCmp('password').setValue('');
					};
					 
					 //获取用户密码
					 app_passwork=loginMsg[1];
		        	 obj.NextView('pdamain','HelcPAD.view.login.PADMain');
		        	 //获取数据
				     //var sysdata=xmlDoc.getElementsByTagName("")[0].childNodes[0].nodeValue;
				     var sysdata =new Array();
				     var iddata=new Array();
				     for(var i=0;i<xmlDoc.getElementsByTagName("Account").length;i++){
				    	 sysdata[i]=xmlDoc.getElementsByTagName("Account")[i].getAttribute("system");
				    	 iddata[i]=xmlDoc.getElementsByTagName("Account")[i].getAttribute("id");
				    	 //判断 siebel 查询用
				    	 if(sysdata[i]=='CRM_USER'){
				    		 userID=iddata[i];
				    	 };
				    	 //erp 查询用
				    	 if(sysdata[i]=='ERP_USER'){
				    		 //ERPuserID=iddata[i];
				    		 ERPuserID='1017';
				    	 };
				    	 //暂时不知道有什么用
				    	 if(sysdata[i]=='CRM_PERSON'){
				    		 PERSONuserID=iddata[i];
				    	 };
				    	 //alert(sysdata[0]);
			         };
			         //cc.log('-------------');
			         //cc.log(xmlDoc.getElementsByTagName("Rights")[0].getAttribute("code"));
			         //权限界面显示值的获取
			         for(var i=0;i<xmlDoc.getElementsByTagName("Rights").length;i++){
			        	 roleArray[i] = xmlDoc.getElementsByTagName("Rights")[i].getAttribute("code");
			         };
			         //获取用户名
					 usernames=xmlDoc.getElementsByTagName("Name")[0].childNodes[0].nodeValue;
					 //八位的用户ID
					 //userIDeight='00000000'+userID;//正式
					 userIDeight='T00000000'+userID;//测试
					 cc.log('userIDeight '+userIDeight);
					 userIDeight=userIDeight.substr(userIDeight.length-8);
					 cc.log('userIDeight2 '+userIDeight);
					 cc.log('usernames '+usernames);
					 cc.log('username '+username);
					 cc.log(userID);
					 cc.log(ERPuserID);
					 cc.log(PERSONuserID);
					 
					//登录成功后判断记录登录账号
					var checkuser = Ext.getCmp('checkuser').getValue();
					if(checkuser==1){ 
						WL.EncryptedCache.write("Loginuser", username, onWrite1Success, onWrite1Failure);
						function onWrite1Success(status){
							console.log('记录登录账号成功');  
						}; 
						function onWrite1Failure(status){
							if(status=WL.EncryptedCache.EOC_CLOSED){ 
								console.log('记录登录账号失败');  
							}; 
						}; 
					}else{ 
						WL.EncryptedCache.write("Loginuser", null, onWrite0Success, onWrite0Failure);
						function onWrite0Success(status){
							console.log('删除上上次记录的账号成功');  
						}; 
						function onWrite0Failure(status){
							if(status=WL.EncryptedCache.EOC_CLOSED){ 
								console.log('删除上上次记录的账号失败');  
							}; 
						}; 
					};
					 
					object.getController('login.PADMainCtrl').newMainView(roleArray);
					//定时任务
					obj.starCommitTaskTwo();
					
					if (Ext.os.is.iOS) {
						//Push start
						var reqURL = '/j_security_check';
					    var options = {};
					    options.parameters = {
					        j_username : userIDeight,
					        j_password : userIDeight
					    };
					    options.headers = {};
					    pushAppRealmChallengeHandler.submitLoginForm(reqURL, options, pushAppRealmChallengeHandler.submitLoginFormCallback);
						//Push end
					    
					    WL.Badge.setNumber(0);
					}
					
				};
	    	};
		};
			
			var content = {
					UserID : username,
					Password : password,
					AppID :'PAD'
						
			};
			obj.connectServer_login(getResult, content);
	},
	
	//查找登陆用户的职位
	loginPosition:function(){
		cc.log('进入用户职位查找');
		var param = {
				userID:userID,
		};
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'zwSelect',
				parameters:param,
				special:true
		};
		
		var getResult = function(result){
			console.log(result);
			try{
				PositionID=result.QueryPosition_Output.ListOfHelEaiAppEmployeeDetailsInformation.Employee.Id;
				positionData=result.QueryPosition_Output.ListOfHelEaiAppEmployeeDetailsInformation.Employee.ListOfPosition.Position;
				cc.log(PositionID);
				cc.log(positionData);
			}catch(e){
				WL.Toast.show('查询职位出错');
			};
		};
		
		this.connectServer_queryOpportunity(getResult,params);
	},
	
	
	//定时任务 二
	starCommitTaskTwo:function(){
		//获取登陆时间
		var today=new Date();
		var hours=today.getHours();
		var mimutes=today.getMinutes();
		cc.log(hours+'  '+mimutes);
		var h=null;
		if(hours>=4){
			h=23-hours+4;
		}else if(hours>=4){
			h=4-hours;
		};
		var f=60-mimutes;
		var sjF=1000*1*60*f;
		var sjH=1000*1*60*60*h;
		cc.log(h+'  '+f);
		setTimeout(this.TuiHuiLoginView,(sjF+sjH));//
	},
	
	//退回主界面
	TuiHuiLoginView:function(){
		var main = Ext.getCmp('padlogin_id');
  	 	if(!main){
  	 		main = Ext.create('HelcPAD.view.login.PADLogin');
  	 	};
  	 	Ext.Viewport.setActiveItem(main);
  	 	ViewArray.splice(ViewArray.length-1,1);
  	 	ViewArray = [];
  	 	roleArray = [];
  	 	//取消订阅
  	 	if (Ext.os.is.Android) {
			unsubscribeUser(userID);
		};
	},
	
	// 定时任务
	/*starCommitTask: function() {
		cc.log('进入了starCommitTask');
		var commitTask = setInterval(this.DingShiFour,1000*2);
		//关闭定时任务
		if (commitTask!=null) {
   	 		window.clearInterval(commitTask);
   	 		commitTask = null;
   	 	}
	},
	
	//定时任务  当天四点后还在使用，自动退到登陆页面
	DingShiFour:function (){
		console.log('进入定时任务');
	},*/
	
});

/**当前使用的
 * --------------------------------------------------------------
 */
//每次进入直接查找  
function PADZlbZJcz(obj){
	getResult2=function(data2){
		var DataCs=Ext.data.StoreManager.get('CxAppLovVStore');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.CxAppLovVStore');
		};
		DataCs.setData(data2);
		myLoading.hide();
		//JSONStore 初始化
		CSHJsonStore(obj);
		//查找组织
		obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Agents.ClueCreateAgentCtrl').mainCarousel(userID);
		//查找职位
		obj.loginPosition();
		
	};
	obj.connectSql_ZLB(getResult2,1);
};

//初始化JSONStore
function CSHJsonStore(obj){
	// 初始化user  不能用数字开头 不能包含下划线
   	collectionName='PAD'+username;
    var reg = new RegExp('_','g');
    collectionName = collectionName.replace(reg,'');
	var collections={};
	collections[collectionName]={};
	collections[collectionName].searchFields={tcode:'string',tid:'string',stext:'string',ZLB:'string',ZXTIME:'string',XX:'string'};
	
	WL.JSONStore.init(collections).then(function(){
		WL.Toast.show("初始化成功！");
		cc.log("初始化成功！");
		//测试用，可删除
		//var tt={"subject":"您有新的中标信息3","message":"订单号0008已中标","sendtime":"2016-08-03 16:15:38"};
		//TXlist(tt);
		if (Ext.os.is.Android) {
			WL.Toast.show("订阅成功！");
			//订阅动作
			doconnect(userIDeight);
		};
	}).fail(function(errorObject){
		//1.提醒功能
		Ext.Msg.alert('温馨提醒','初始化手机数据库失败，部分功能无法使用!');
	});
};

//获取提醒传递过来的数据
//先查询JSONStore中有没有数据
function TXlist(msg){
	cc.log('--------------11');
	cc.log(msg);
	//是否有消息判断
	if(!msg){
		cc.log('没有消息传递过来');
		return;
	};
	
	var json = eval("("+msg+")");

	var xx={
			sendtime:json.sendtime, //时间   2016-08-03
			subject:json.subject,   //标题
			message:json.message    //内容 		
	};
	var MaintainList=WL.JSONStore.get(collectionName);
	var query={tcode:'TX'};
	var options={
		exacte:false,//默认
		limit:200,//查询最大条数
	};
	MaintainList.find(query,options).then(function(arrayResults){
		console.log('提醒信息查询');
		if(arrayResults==''){
			var Data=[];
			Data[0]=xx;
			var Maintxml={tcode:'TX',XX:Data,};
			MaintainList.add(Maintxml).then(function(){
				cc.log('提醒消息添加成功！');
				//WL.Toast.show("提醒消息添加成功！");
			}).fail(function(errorObject){
				WL.Toast.show("提醒消息添加失败！");
			});
			
		}else{
			var Data=arrayResults[0].json.XX;
			cc.log(Data);
			cc.log('JSONstore数量：'+Data.length);
			
			Data[Data.length]=xx;
			
			cc.log('JSONstore数量第二次：'+Data.length);
			MaintainList.remove(query,options).then(function(){
				cc.log('提醒信息删除成功');
				var Maintxml={tcode:'TX',XX:Data,};
				MaintainList.add(Maintxml).then(function(){
					cc.log('提醒消息添加成功！');
					//WL.Toast.show("提醒消息添加成功！");
				}).fail(function(errorObject){
					WL.Toast.show("提醒消息添加失败！");
				});
			}).fail(function(){
				cc.log('提醒消息删除失败');
				WL.Toast.show("提醒消息删除失败");
			});
		};
		
	}).fail(function(errorObject){
		WL.Toast.show("获取提醒消息失败！");
	});
	
};


/**
 * --------------------------------------------------------------
 */


/*function CESHICESHI(obj){
	//添加或提取数据
	getResult2=function(data2){
		var MaintainList=WL.JSONStore.get(collectionName);
		var Maintxml={tcode:'ZLBA',ZLB:data2,};
		MaintainList.add(Maintxml).then(function(){
			alert('值列表添成功');
			//往数据仓中添加数据
			ZLBCadd_SJC();
		}).fail(function(errorObject){
			alert('值列表添加出错');
		});
	};
	
	obj.connectSql_ZLB(getResult2,1);
};

//初始化值列表
function CSHzlb(obj){
	alert('J1');
	//最新时间
	var timeNew=null;
	//获取最新时间
	getResult=function(data){
		alert('J2');
		if(data==null){
			Ext.Msg.alert('提示','值列表查无最新时间!');
			return;
		};
		//和JSONStore中的数据进行判断
		//查找
		var MaintainList=WL.JSONStore.get(collectionName);
		var query={tcode:'ZLBA'};
		var options={
			exacte:false,//默认
			limit:200,//查询最大条数
		};
		alert('MaintainList'+collectionName);
		MaintainList.find(query,options).then(function(arrayResults){
			alert('A');
			console.log('A:'+arrayResults);
			timeNew=data[0].MASTIME;
			alert(timeNew);
			if(arrayResults==''){
				alert('A路线');
				cc.log('A路线');
				obj.connectSql_ZLB(getResult2,1);
			}else{
				alert('B路线');
				cc.log('B路线');
				//新的
				var datab=new Date(data[0].MASTIME);
				datab=Ext.Date.format(datab,'Y-m-d H:i:s');
	    		cc.log('时间'+datab);
	    		//旧的
	    		var datab2=new Date(arrayResults[0].json.ZXTIME);
	    		datab2=Ext.Date.format(datab2,'Y-m-d H:i:s');
	    		if(datab>datab2){
	    			//删除旧的值列表
	    	    	var options={exacte:true};//默认是false
	    			MaintainList.remove(query,options).then(function(){
	    				obj.connectSql_ZLB(getResult2,1);
	    			}).fail(function(){
	    				cc.log('删除失败');
	    				WL.Toast.show("删除失败");
	    			});
	    		}else{
	    			cc.log('值列表已是最新');
	    		};
	    		//往数据仓中添加数据
	    		//ZLBCadd_SJC();
			};
		}).fail(function(errorObject){
			alert(errorObject);
			alert('C');
			obj.connectSql_ZLB(getResult2,1);
			WL.Toast.show("查询数据失败2！");
		});
	};
	
	//添加或提取数据
	getResult2=function(data2){
		var MaintainList=WL.JSONStore.get(collectionName);
		var Maintxml={tcode:'ZLBA',ZLB:data2,ZXTIME:timeNew};
		MaintainList.add(Maintxml).then(function(){
			alert('值列表添成功');
			cc.log('值列表添成功');
			//往数据仓中添加数据
			ZLBCadd_SJC();
		}).fail(function(errorObject){
			alert('值列表添加出错');
    		WL.Toast.show("值列表添加出错！");
		});
	};
	obj.connectSql_ZLB(getResult,2);
};

//往值列表仓中添加数据
function ZLBCadd_SJC(){
	alert('1232');
	var MaintainList=WL.JSONStore.get(collectionName);
	var query={tcode:'ZLBA'};
	var options={
		exacte:false,//默认
		limit:20,//查询最大条数
	};
	alert('collectionName:'+collectionName);
	MaintainList.find(query,options).then(function(arrayResults){
		alert('6767');
		var Data=arrayResults[0].json.ZLB;
		var DataCs=Ext.data.StoreManager.get('CxAppLovVStore');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.CxAppLovVStore');
		};
		DataCs.setData(Data);
		alert('添加');
		//var id=DataCs.getAt(2).get('LIS_VAL');
		//cc.log('id:'+id);
		//cc.log('id2:'+JSON.stringify(Data));
	}).fail(function(errorObject){
		alert('添加下拉列表失败');
		alert(errorObject);
		WL.Toast.show("添加下拉列表失败！");
	});
};

//值列表查找公共方法(由于使用JONStroe,运行的顺序，让我们无法直接调用方法，只能先放到数据仓中)
//例子：ZLBCZGGFF('HEL_OPPTY_LOSE_REASON','1-KTEXD','');
function ZLBCZGGFF(tiaojian_TYPE,tiaojian_PAR_ROW_ID,XLLBname){
	//取出JSONStore
	var MaintainList=WL.JSONStore.get(collectionName);
	var query={tcode:'ZLBA'};
	var options={
		exacte:false,//默认
		limit:20,//查询最大条数
	};
	MaintainList.find(query,options).then(function(arrayResults){
		var data=arrayResults[0].json.ZLB;
		var num=data.length;
		var su=0;
		var datas=[];
		if(tiaojian_PAR_ROW_ID==''){
			for(var i=0;i<num;i++){
				if(data[i].TYPE==tiaojian_TYPE){
					//cc.log('进进:'+JSON.stringify(data[i]));
					datas[su]=data[i];
					su++;
				};
			};
		}else if(tiaojian_PAR_ROW_ID!=''){
			for(var i=0;i<num;i++){
				if(data[i].TYPE==tiaojian_TYPE&&data[i].PAR_ROW_ID==tiaojian_PAR_ROW_ID){
					datas[su]=data[i];
					su++;
				};
			};
		};
		
		//排序
		var numPX=datas.length;
		cc.log('numPX:'+numPX);
		for(var i=1;i<numPX;i++){
			for(var j=0;j<numPX-i;j++){
				if(datas[j].ORDER_BY>datas[j+1].ORDER_BY){
					var JG=[];
					JG[0]=datas[j];
					datas[j]=datas[j+1];
					datas[j+1]=JG[0];
				};
			};
		};
		
		//在下拉列表中添加数据
		var XLdata="[";
		for(var i=0;i<numPX;i++){
			if(i!=numPX-1){
				XLdata+="{'value':'"+datas[i].LIS_VAL+"','text':'"+datas[i].LIS_VAL+"'},";
			}else{
				XLdata+="{'value':'"+datas[i].LIS_VAL+"','text':'"+datas[i].LIS_VAL+"'}";
			};
		};
		XLdata+="]";
		Ext.getCmp(XLLBname).setOptions(eval(XLdata));
		for(var n=0;n<numPX;n++){
			cc.log(JSON.stringify(datas[n]));
		};
	}).fail(function(errorObject){
		WL.Toast.show("查询数据失败！");
	});
};



//例子     为“本次申请类型”下拉控件申请数据
var MaintainList=WL.JSONStore.get(collectionName);
var query={tcode:'ZLB'};
var options={
	exacte:false,//默认
	limit:20,//查询最大条数
};
MaintainList.find(query,options).then(function(arrayResults){
	var Data=arrayResults[0].json.ZLB;
	var DataLength=Data.length;
	var seleData=[];
	var selenum=0;
	for(var i=0;i<DataLength;i++){
		if(Data[i].TYPE=='HEL_ACCOUNT_APPLY_TYPE'){
			seleData[selenum]=Data[i];
			selenum++;
		};
	};
	//插入数据
	var DataLength2=seleData.length;
	var ssdd='[';
	for(var j=0;j<DataLength2;j++){
		if(j!=DataLength2-1){
			ssdd+="{'value':'"+seleData[j].LIS_VAL+"','text':'"+seleData[j].LIS_VAL+"'},";
		}else{
			ssdd+="{'value':'"+seleData[j].LIS_VAL+"','text':'"+seleData[j].LIS_VAL+"'}";
		};
	};
	ssdd+=']';
	Ext.getCmp('S_ApplyType').setOptions(eval(ssdd));
}).fail(function(errorObject){
	WL.Toast.show("添加下拉列表失败！");
});*/

