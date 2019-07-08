/**
 * 地图模块的事件
 */
var pageName;
Ext.define('HelcPDA.controller.androidMap.AndroidMapCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		control:{
			//周围的人的操作
			"button#showLocation":{
				tap:'showLocation'
			},
			"button#arroudToMap":{
				tap:'arroudToMap'
			},
			//我的信息的操作
			"list#myDetaillList":{
				itemtap:'myDetaillList'
			},
			"button#checkRoult":{
				tap:'checkRoult'
			},
			"button#mineToMap":{
				tap:'mineToMap'
			},
			"list#EmpList":{
				itemtap:'EmpList'
			},"button#EmpBackView":{
				tap:'EmpBackView'
			},"button#serachBleowRoult":{
				tap:'serachBleowRoult'
			},"button#serachBelowNow":{
				tap:'serachBelowNow'
			},"list#belowRoult":{
				itemtap:'belowRoult'
			},"button#allRoult":{
				tap:'allRoult'
			},"button#belowManDetailBack":{
				tap:'belowManDetailBack'
			},"button#searchCardNum":{
				tap:'searchCardNum'
			},"list#sendCard_list":{
				itemtap:'sendCard_list'
			},"button#sendCardBack":{
				tap:'sendCardBack'
			}
		},
	},
	//周围的人显示当前位置
	showLocation:function(){
	   var obz=this;
	   var checkMeter=Ext.getCmp('checkMeter').getValues();
       
	   function getResult(res){
           //alert(JSON.stringify(res.item));
		   var length=res.item.length;
		   if(length>0){
			   obz.NextView('whitePage','HelcPDA.view.androidMap.WhitePage');
			   cordova.exec(function(res) {
					//jsData=res;
					if("正常返回"==res[0].LocationFlag){
						obz.BackView();
					}else if("周围的人"==res[0].LocationFlag){
//						var length=ViewArray.length;
//						for(var i=length-1;i>=0;i--){
//							if(ViewArray[i].)
//						}
						obz.BackView();
//						obj.NextView('nearView','HelcPDA.view.androidMap.NearView');
					}else if("我的信息"==res[0].LocationFlag){
						obz.BackView();
						obz.BackView();
						obz.NextView('selfMyView','HelcPDA.view.androidMap.MyView');
					}else if("返回主页"==res[0].LocationFlag){
						obz.BackView();
						obz.BackView();
					}else if("工号打卡"==res[0].LocationFlag){
						obz.BackView();
						obz.BackView();
						obz.NextView('sendCard','HelcPDA.view.androidMap.SendCard');
					    var MaintenaceSendCardStore=obz.getStore('MaintenaceSendCardStore','HelcPDA.store.maintain.MaintenaceSendCardStore');
						MaintenaceSendCardStore.setData([]); 
					}else if("电梯打卡"==res[0].LocationFlag){
						obz.BackView();
						obz.BackView();
						obz.NextView('maintenaceSendCardPanel','HelcPDA.view.maintain.MaintenaceSendCardPanel');
					    var debugReturnList=Ext.getCmp('debugReturnList');
					    debugReturnList.setText("地图");
					}
					else{
					}
					}, function(err) {
						WL.Toast.show("错误:"+err);
					},"JSMapMain","全部周围的人",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase(),ArroudPeople:res.item}]);   
		   }else{
              WL.Toast.show('暂无附近的信息');			   
		   }
	   }
	   if(checkMeter.stype=="全部"){
		 // alert(JSON.stringify(jsData[0]));
		  var obj=jsData[0];
		  obj.meter=checkMeter.meter;
		  content=JSON.stringify(obj);
		 this.connectServer(getResult, 'empLocationAction.do?method=toSearchNearEmp', content);
	   }else{
		   WL.Toast.show("此功能暂未开通");
	   }
	},
	//周围的人返回地图
	arroudToMap:function(){
		 var obz=this; 
		 obz.NextView('whitePage','HelcPDA.view.androidMap.WhitePage');
		 cordova.exec(function(res) {
				jsData=res;
				if("正常返回"==res[0].LocationFlag){
					obz.BackView();
				}else if("周围的人"==res[0].LocationFlag){
					obz.BackView();
					//obz.NextView('NearView','HelcPDA.view.androidMap.NearView');
				}
				else if("我的信息"==res[0].LocationFlag){
					obz.BackView();
					obz.BackView();
					obz.NextView('selfMyView','HelcPDA.view.androidMap.MyView');
				}else if("返回主页"==res[0].LocationFlag){
					obz.BackView();
					obz.BackView();
				}else if("工号打卡"==res[0].LocationFlag){
					obz.BackView();
					obz.BackView();
					obz.NextView('sendCard','HelcPDA.view.androidMap.SendCard');
					var MaintenaceSendCardStore=obz.getStore('MaintenaceSendCardStore','HelcPDA.store.maintain.MaintenaceSendCardStore');
					MaintenaceSendCardStore.setData([]); 
				}else if("电梯打卡"==res[0].LocationFlag){
					obz.BackView();
					obz.BackView();
					obz.NextView('maintenaceSendCardPanel','HelcPDA.view.maintain.MaintenaceSendCardPanel');
				    var debugReturnList=Ext.getCmp('debugReturnList');
				    debugReturnList.setText("地图");
				}else{
				}
				}, function(err) {
					WL.Toast.show("错误:"+err);
				},"JSMapMain","进入地图",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase()}]);   
	},
	//我的信息
	myDetaillList:function(obk,index,target,record,e,eOpts){
		var obz=this;
		if(index==0){
			//我的资料
			//alert(index==0);
			//alert(JSON.stringify(jsData));
			function getResult(res){
				Ext.Msg.alert("我的信息",((res.msginfo)+",本机SIM卡串码:"+(jsData[0].imsi)));
			} 
			this.connectServer(getResult, 'empLocationAction.do?method=toSearchMyInfo', JSON.stringify(jsData[0]));
		}else if(index==1){
			//我的下属
			var obj=jsData[0];
			obj.USERID=userid;
			//alert(JSON.stringify(obj));
			function getResult1(res){
				//alert(JSON.stringify(res));
				if(res.item.length>0){
					//alert(res.item.length);
					jsData[1]=res.item;
					obz.NextView('empView','HelcPDA.view.androidMap.EmpView');
					var store=obz.getStore("MapBelowEmployeeStore","HelcPDA.store.map.MapBelowEmployeeStore");
					store.setData(res.item);
//					var EmpList=Ext.getCmp('EmpList');
				}else{
					WL.Toast.show("暂无下属信息");
				}
			} 
			this.connectServer(getResult1, 'empLocationAction.do?method=toSearchEmpFromHR', JSON.stringify(obj));
		}else if(index==2){
			//上传我的定位数据
			    var obj=jsData[0];
			    obj.userid=userid;
			    obj.PLAN_START_DT=new Date(); 
			    obj.latitude=jsData[0].Latitude;      
			    obj.longitude=jsData[0].Longitude;    
	            obj.deviceno=(device.uuid).toUpperCase();   
	            obj.ext1='0';    
	            obj.ext2='';     
	            obj.ext3=jsData[0].Address;      
	            obj.ext4='GPS';   
	            obj.ext5='';    
	            navigator.notification.confirm('确认要上传吗？',function(btn){
		 			   if(btn ==2){
		 				   function getResult1(res){
		 					   if(res.msgid=='0'){
		 						   WL.Toast.show("上传成功");
		 					   }else{
		 						   WL.Toast.show("上传时间不超过5分钟,请稍候上传");
		 					   }
		 				   }
		 				   this.connectServer(getResult1, 'usersLocationAction.do?method=addLocation', JSON.stringify(obj)); 
		 			   }else{return;}
    			 		},"提示","取消,确定");
		}else if(index==3){
			//离线地图
			// obz.NextView('whitePage','HelcPDA.view.androidMap.WhitePage');
			 cordova.exec(function(res) {
					if("正常返回"==res[0].LocationFlag){
					}else{
					}
					}, function(err) {
						WL.Toast.show("错误:"+err);
					},"JSMapMain","进入离线",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase()}]); 
			
		}else{
			WL.Toast.show("请选择正确的选项");
		}
		
	},
	//我的信息查看轨迹
	checkRoult:function(){
		var obz=this;
		mineDate=Ext.getCmp('mineDate').getValue();
		//alert(mineDate);
		var obj=jsData[0];
		obj.DATE=Ext.Date.format(new Date(mineDate),'Y-m-d');
		obj.USERID=userid;
		
		function getResult1(res){
         
		//alert(JSON.stringify(res));	
		
		 var length=res.item.length;
		   if(length>0){
//			   cordova.exec(function(res) {
					//jsData=res;
			       pageName="我的轨迹";
				   obz.NextView('belowList','HelcPDA.view.androidMap.BelowList');
	               var store=obz.getStore('MapAroundEmpStore1','HelcPDA.store.map.MapAroundEmpStore1'); 
	               store.setData(res.item);
	               Ext.getCmp('hiddenValue').setValue(JSON.stringify(res));
//					if("正常返回"==res[0].LocationFlag){
//						obz.BackView();
//					}else if("周围的人"==res[0].LocationFlag){
//						obz.BackView();
//						obz.NextView('nearView','HelcPDA.view.androidMap.NearView');
//					}else if("我的信息"==res[0].LocationFlag){
//						//obz.NextView('selfMyView','HelcPDA.view.androidMap.MyView');
//					}
//					else{
//					}
//					}, function(err) {
//						WL.Toast.show("错误:"+err);
//					},"JSMapMain","我的轨迹",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase(),MineRoult:res.item}]);   
		   }else{
            WL.Toast.show('暂无我的信息');			   
		   }
		}
		this.connectServer(getResult1, 'empLocationAction.do?method=toSearchEmpWholeDay', JSON.stringify(obj));
	},
	//我的信息返回到地图界面
	mineToMap:function(){
		 var obz=this; 
		 obz.NextView('whitePage','HelcPDA.view.androidMap.WhitePage');
		 cordova.exec(function(res) {
				jsData=res;
				if("正常返回"==res[0].LocationFlag){
					obz.BackView();
				}else if("周围的人"==res[0].LocationFlag){
					obz.BackView();
					obz.BackView();
					obz.NextView('nearView','HelcPDA.view.androidMap.NearView');
				}
				else if("我的信息"==res[0].LocationFlag){
					obz.BackView();
					//obz.NextView('selfMyView','HelcPDA.view.androidMap.MyView');
				}else if("返回主页"==res[0].LocationFlag){
					obz.BackView();
					obz.BackView();
				}else if("工号打卡"==res[0].LocationFlag){
					obz.BackView();
					obz.BackView();
					obz.NextView('sendCard','HelcPDA.view.androidMap.SendCard');
					var MaintenaceSendCardStore=obz.getStore('MaintenaceSendCardStore','HelcPDA.store.maintain.MaintenaceSendCardStore');
					MaintenaceSendCardStore.setData([]); 
				}else if("电梯打卡"==res[0].LocationFlag){
					obz.BackView();
					obz.BackView();
					obz.NextView('maintenaceSendCardPanel','HelcPDA.view.maintain.MaintenaceSendCardPanel');
				    var debugReturnList=Ext.getCmp('debugReturnList');
				    debugReturnList.setText("地图");
				}else{
				}
				}, function(err) {
					WL.Toast.show("错误:"+err);
				},"JSMapMain","进入地图",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase()}]);   
	}
    ,
    //点击列表,勾选中信息
    EmpList:function(obk,index,target,record,e,eOpts ){
		var store = this.getStore("MapBelowEmployeeStore","HelcPDA.store.map.MapBelowEmployeeStore");
		var PERSON_ID=store.getAt(index).get('PERSON_ID');
    	//var PERSON_ID=record.PERSON_ID;
    	//alert(PERSON_ID);
    	var css=document.getElementById(PERSON_ID);
    	var array=jsData[1];
    	var length=array.length;
    	for(var i=0;i<length;i++){
    		if(index==i){
    			 if(css.className =='no-choice'){
    				 css.className='be-choice';
    			    }
    			    else{
    			    css.className='no-choice';
    			   }
    		}else{
    			document.getElementById(array[i].PERSON_ID).className='no-choice';
    		}
    	}
    	
    },
    //返回上一页
    EmpBackView:function(){
    	 this.BackView();
    },
    //下属查询当天当前位置
    serachBelowNow:function(){
    	var obz=this;
    	var obj=jsData[0];
		var tempArray=jsData[1];
		var length=tempArray.length;
		for(var i=0;i<length;i++){
			if(document.getElementById(tempArray[i].PERSON_ID).className=='be-choice'){
				obj.USERID=tempArray[i].PERSON_ID;	
			}
		}
		//alert(JSON.stringify(obj));
		function getResult1(res){
		//alert(JSON.stringify(res));	
		 var length=res.item.length;
		   if(length>0){
			   pageName="下属信息";
			   obz.NextView('belowList','HelcPDA.view.androidMap.BelowList');
               var store=obz.getStore('MapAroundEmpStore1','HelcPDA.store.map.MapAroundEmpStore1'); 
               store.setData(res.item);
               Ext.getCmp('hiddenValue').setValue(JSON.stringify(res));
//			   cordova.exec(function(res) {
					//jsData=res;
//					if("正常返回"==res[0].LocationFlag){
//						
//					}else if("周围的人"==res[0].LocationFlag){
//						obz.BackView();
//						obz.BackView();
//						obz.NextView('nearView','HelcPDA.view.androidMap.NearView');
//					}else if("我的信息"==res[0].LocationFlag){
//						//obz.NextView('selfMyView','HelcPDA.view.androidMap.MyView');
//					}
//					else{
//					}
//					}, function(err) {
//						WL.Toast.show("错误:"+err);
//					},"JSMapMain","我的轨迹",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase(),MineRoult:res.item}]);   
		   }else{
            WL.Toast.show('暂无该下属信息');			   
		   }
		}
		this.connectServer(getResult1, 'empLocationAction.do?method=toSearchEmpNow', JSON.stringify(obj));
    },
    //下属查询进入地图
    serachBleowRoult:function(){
    	var obz=this;
    	belowDate=Ext.getCmp('belowDate').getValue();
		//alert(belowDate);
		var obj=jsData[0];
		obj.DATE=Ext.Date.format(new Date(belowDate),'Y-m-d');
		var tempArray=jsData[1];
		var length=tempArray.length;
		for(var i=0;i<length;i++){
			if(document.getElementById(tempArray[i].PERSON_ID).className=='be-choice'){
				obj.USERID=tempArray[i].PERSON_ID;	
			}
		}
		//alert(JSON.stringify(obj));
		function getResult1(res){
		 var length=res.item.length;
		   if(length>0){
			   pageName="下属信息";
			   obz.NextView('belowList','HelcPDA.view.androidMap.BelowList');
			   var store=obz.getStore('MapAroundEmpStore1','HelcPDA.store.map.MapAroundEmpStore1'); 
			   store.setData(res.item);
			   Ext.getCmp('hiddenValue').setValue(JSON.stringify(res));
			   //			   cordova.exec(function(res) {
					//jsData=res;
				   
				   //MapAroundEmpStore1
//					if("正常返回"==res[0].LocationFlag){
//						
//					}else if("周围的人"==res[0].LocationFlag){
//						obz.BackView();
//						obz.BackView();
//						obz.NextView('nearView','HelcPDA.view.androidMap.NearView');
//					}else if("我的信息"==res[0].LocationFlag){
//						//obz.NextView('selfMyView','HelcPDA.view.androidMap.MyView');
//					}
//					else{
//					}
//					}, function(err) {
//						WL.Toast.show("错误:"+err);
//					},"JSMapMain","我的轨迹",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase(),MineRoult:res.item}]);   
		   }else{
            WL.Toast.show('暂无该下属信息');			   
		   }
    }
		//alert(JSON.stringify(obj));
		this.connectServer(getResult1, 'empLocationAction.do?method=toSearchEmpWholeDay', JSON.stringify(obj));
    },
    //下属轨迹
    belowRoult:function(obk,index,target,record,e,eOpts ){
      var obz=this; 
      var tempRes=[];
      var res=Ext.getCmp('hiddenValue').getValue();
      res=eval('('+res+')');
      tempRes[0]=res.item[index];
      obz.NextView('whitePage','HelcPDA.view.androidMap.WhitePage');
      cordova.exec(function(res) {
		//jsData=res;
	     //MapAroundEmpStore1
		if("正常返回"==res[0].LocationFlag){
			obz.BackView();
		}else if("周围的人"==res[0].LocationFlag){
			obz.BackView();
			obz.BackView();
			obz.BackView();
			if(pageName=="下属信息"){
				obz.BackView();
			}
			obz.NextView('nearView','HelcPDA.view.androidMap.NearView');
		}else if("我的信息"==res[0].LocationFlag){
			obz.BackView();
			obz.BackView();
			if(pageName=="下属信息"){
				obz.BackView();
			}
			//obz.NextView('selfMyView','HelcPDA.view.androidMap.MyView');
		}else if("返回主页"==res[0].LocationFlag){
			obz.BackView();
			obz.BackView();
			obz.BackView();
			if(pageName=="下属信息"){
				obz.BackView();
			}
		}else if("工号打卡"==res[0].LocationFlag){
			obz.BackView();
			obz.BackView();
			obz.BackView();
			if(pageName=="下属信息"){
				obz.BackView();
			}
			obz.NextView('sendCard','HelcPDA.view.androidMap.SendCard');
			var MaintenaceSendCardStore=obz.getStore('MaintenaceSendCardStore','HelcPDA.store.maintain.MaintenaceSendCardStore');
		    MaintenaceSendCardStore.setData([]); 
		}else if("电梯打卡"==res[0].LocationFlag){
			obz.BackView();
			obz.BackView();
			obz.BackView();
			if(pageName=="下属信息"){
				obz.BackView();
			}
			obz.NextView('maintenaceSendCardPanel','HelcPDA.view.maintain.MaintenaceSendCardPanel');
		    var debugReturnList=Ext.getCmp('debugReturnList');
		    debugReturnList.setText("地图");
		}
		else{
		}
		}, function(err) {
			WL.Toast.show("错误:"+err);
		},"JSMapMain","我的轨迹",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase(),MineRoult:tempRes}]); 
    },
    //全部下属轨迹
    allRoult:function(){
    	var obz=this;
       var res=Ext.getCmp('hiddenValue').getValue();
       res=eval('('+res+')');
       obz.NextView('whitePage','HelcPDA.view.androidMap.WhitePage');
    cordova.exec(function(res) {
		if("正常返回"==res[0].LocationFlag){
			obz.BackView();
		}else if("周围的人"==res[0].LocationFlag){
			obz.BackView();
			obz.BackView();
			obz.BackView();
			if(pageName=="下属信息"){
				obz.BackView();
			}
			obz.NextView('nearView','HelcPDA.view.androidMap.NearView');
		}else if("我的信息"==res[0].LocationFlag){
			obz.BackView();
			obz.BackView();
			if(pageName=="下属信息"){
				obz.BackView();
			}
			//obz.NextView('selfMyView','HelcPDA.view.androidMap.MyView');
		}else if("返回主页"==res[0].LocationFlag){
			obz.BackView();
			obz.BackView();
			obz.BackView();
			if(pageName=="下属信息"){
				obz.BackView();
			}
		}else if("工号打卡"==res[0].LocationFlag){
			obz.BackView();
			obz.BackView();
			obz.BackView();
			if(pageName=="下属信息"){
				obz.BackView();
			}
			obz.NextView('sendCard','HelcPDA.view.androidMap.SendCard');
			var MaintenaceSendCardStore=obz.getStore('MaintenaceSendCardStore','HelcPDA.store.maintain.MaintenaceSendCardStore');
			MaintenaceSendCardStore.setData([]); 
		}else if("电梯打卡"==res[0].LocationFlag){
			obz.BackView();
			obz.BackView();
			obz.BackView();
			if(pageName=="下属信息"){
				obz.BackView();
			}
			obz.NextView('maintenaceSendCardPanel','HelcPDA.view.maintain.MaintenaceSendCardPanel');
		    var debugReturnList=Ext.getCmp('debugReturnList');
		    debugReturnList.setText("地图");
		}
		else{
		}
		}, function(err) {
			WL.Toast.show("错误:"+err);
		},"JSMapMain","我的轨迹",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase(),MineRoult:res.item}]);   
    	
    },
    //查询工号信息,用于打卡
    searchCardNum:function(){
      var obj=this;
      var number=Ext.getCmp('number').getValue();
      if(number==""){
    	   WL.Toast.show('请输入工号或合同号');
    	   return;
       }
    function getResult1(res){
    	var content=res.content;
		var length=content.length;
		if(length<1){
			WL.Toast.show("没查找到相关数据");
		}else{
			var sendCard_list=Ext.getCmp('sendCard_list');
			var MaintenaceSendCardStore=obj.getStore('MaintenaceSendCardStore','HelcPDA.store.maintain.MaintenaceSendCardStore');
			var itemTpl=[
                         '<table border=0 width=100% style="color:#666">',
                         '    <tr>',
                         '            <td style="font-size:18px;color:#000;">{ASSET_NUM}</td>',
                         '    </tr>',
                         '    <tr>',
                         '        <td style="font-size:12px;">{X}</td> <td style="font-size:12px;">{Y}</td>',
                         '    </tr>',
                         '    <tr>',
                         '        <td style="font-size:12px;">{ADDRESS}</td>',
                         '    </tr>',
                         '</table>'
                     ];
			sendCard_list.setItemTpl(itemTpl);
			MaintenaceSendCardStore.setData(content);
		}
     }  
    var obz={};
	obz.ELEVATOR_NO=number;
	this.connectServer(getResult1, 'maintainancePlanItemListAction.do?method=toSearchCompletedAssG', JSON.stringify(obz));  
    },
    //选择一个工号进入地图
    sendCard_list:function(obk,index,target,record,e,eOpts ){
    	var obj=this;
    	var X=record.get('X').split(':');
    	var Y=record.get('Y').split(':');
    	var ASSET_NUM=record.get('ASSET_NUM');
    	var MP_ID=record.get('MP_ID');
    	var obl=[];
    	var obz={};
        obz.MLAT=Y[1];
        obz.MLON=X[1];
        obz.ASSET_NUM=ASSET_NUM;
        obz.MP_ID=MP_ID;
        obz.PERSON_ID=person_id;
        //alert(person_id);
        obl[0]=obz;
		obj.NextView('whitePage','HelcPDA.view.androidMap.WhitePage');
		cordova.exec(function(res) {
			jsData=res;
			if("正常返回"==res[0].LocationFlag){
				obj.BackView();
			}else if("周围的人"==res[0].LocationFlag){
				obj.BackView();
				obj.BackView();
				obj.NextView('nearView','HelcPDA.view.androidMap.NearView');
			}else if("我的信息"==res[0].LocationFlag){
				obj.BackView();
				obj.BackView();
				obj.NextView('selfMyView','HelcPDA.view.androidMap.MyView');
			}else if("返回主页"==res[0].LocationFlag){
				obj.BackView();
				obj.BackView();
			}else if("工号打卡"==res[0].LocationFlag){
				obj.BackView();
			}else if("电梯打卡"==res[0].LocationFlag){
				obj.BackView();
				obj.BackView();
				obj.NextView('maintenaceSendCardPanel','HelcPDA.view.maintain.MaintenaceSendCardPanel');
			    var debugReturnList=Ext.getCmp('debugReturnList');
			    debugReturnList.setText("地图");
			}
			else{
			}
			}, function(err) {
				WL.Toast.show("错误:"+err);
			},"JSMapMain","工号进入",[{USERID:userid,UUID:device.uuid,meter:500,isLeader:isLeader,DeviceNo:(device.uuid).toUpperCase(),obz:obl}]); 
    	
    }
    //返回到上一页
    ,belowManDetailBack:function(){
    	 this.BackView();
    },
    //返回地图
    sendCardBack:function(){
    	var obj=this;
    	obj.NextView('whitePage','HelcPDA.view.androidMap.WhitePage');
    	cordova.exec(function(res) {
			jsData=res;
			if("正常返回"==res[0].LocationFlag){
				obj.BackView();
			}else if("周围的人"==res[0].LocationFlag){
				obj.BackView();
				obj.BackView();
				obj.NextView('nearView','HelcPDA.view.androidMap.NearView');
			}else if("我的信息"==res[0].LocationFlag){
				obj.BackView();
				obj.BackView();
				obj.NextView('selfMyView','HelcPDA.view.androidMap.MyView');
			}else if("返回主页"==res[0].LocationFlag){
				obj.BackView();
				obj.BackView();
			}else if("工号打卡"==res[0].LocationFlag){
				obj.BackView();
			}else if("电梯打卡"==res[0].LocationFlag){
				obj.BackView();
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
    
});