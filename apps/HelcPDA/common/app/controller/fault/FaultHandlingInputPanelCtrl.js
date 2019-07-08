/**
 * 服务请求录入 监听器  2014-4-18  xcx
 */
//用于装载查询到的数据
var ovlay_MainTain2;
//用于装载查询到的客户
var ovlay_MainTain3;
//电梯属性
/*var REMARKS;*/
//客户ID
/*var ACCOUNT_ID;*/
//故障工号  （当查询电梯的时候得出）
/*var ASSET_ID;*/
//受信故障
/*var gz=[];*/


Ext.define('HelcPDA.controller.fault.FaultHandlingInputPanelCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			/************************************************************************************
			 * 故障模块   服务请求录入页面
			 * */
			
			//返回故障模处理块首页
			FaultFHIPReturnButton:'button[id=FaultFHIPReturnButton]',

			//服务请求录入 工号  查找
			FaultFHIPQueryButton:'button[id=FaultFHIPQueryButton]',
			
			//客户查询
			FaultAccntNameButton:'button[id=FaultAccntNameButton]',
			
			//服务请求录入提交
			FaultFHIPSubmitButton:'button[id=FaultFHIPSubmitButton]',
			
			/**
			 **故障模块   服务请求录入页面
			 ************************************************************************************/
			
		},
		control:{
			
			/************************************************************************************
			 * 故障模块   服务请求录入页面
			 * */
			
			//返回故障模处理块首页
			'button#FaultFHIPReturnButton':{
				tap:'FaultFHIPReturnButton'
			},

			//服务请求录入 工号  查找
			'button#FaultFHIPQueryButton':{
				tap:'FaultFHIPQueryButton'
			},
			
			//获取查找到的工号信息
			'list#FaultFHIP_MPP':{
				itemtap:'FaultFHIP_MPP'
			},
			
			//客户查询
			'button#FaultAccntNameButton':{
				tap:'FaultAccntNameButton'
			},
			
			//获取选中的客户
			'list#FaultFHIP_KHTwo':{
				itemtap:'FaultFHIP_KHTwo'
			},
			
			//服务请求录入提交
			'button#FaultFHIPSubmitButton':{
				tap:'FaultFHIPSubmitButton'
			},
			
			//根据所属站查找派工人员
			'selectfield#FaultFHIPStation':{
				change:'FaultFHIPStation'
			},
			/**
			 **故障模块   服务请求录入页面
			 ************************************************************************************/

		}
	/////	
	},
	
	
	/************************************************************************************
	 * 故障模块   服务请求录入页面
	 * */
	
	//返回故障模处理块首页
	FaultFHIPReturnButton:function(){
		//console.log('从服务请求录入跳转到待处理故障列表');
		this.showBackView('faultHLP','HelcPDA.view.fault.FaultHandlingPanel');
	},

	//服务请求录入 工号  查找
	//当查询的时候，下拉列表的所属站和派工人员的值没有改变
	//改变的只有信故障状态
	FaultFHIPQueryButton:function(){
		//console.log('进入服务请求录入工号查找');
		//工号     
		var ASSET_NUM=Ext.getCmp('FaultFHIP_GH').getValue();
		//受信地盘
		var DOMAIN_NAME=Ext.getCmp('FaultFHIP_SXDP').getValue();
		//受信大楼
		var EDIFICE_NAME=Ext.getCmp('FaultFHIP_SXDL').getValue();
		//受信地址
		var ADDRESS=Ext.getCmp('FaultFHIP_SXDZ').getValue();
		
		//查询结果显示界面
		var station=function(json){
			//console.log("json: "+JSON.stringify(json.rows));
		//	if(!ovlay_MainTain2){
			if(json.rows.length==0){
				 WL.Toast.show("查无结果！");
				return;
			};
			
				//console.log('进来list来了');
				ovlay_MainTain2=Ext.Viewport.add({
					xtype:'panel',
					id:'statPanel2',
       		     	hideOnMaskTap: true,
       		     	style:'height:80%;width:90%;',
	     	        centered: true,
       		     	modal: true,
       		     	items:[{
       		     		xtype:'fieldset',
    		            style:'height:100%;width:100%;',
    		            items:[{
    		               xtype:'list',     		
 		        		   id:'FaultFHIP_MPP',
 		        		   store:'FaultWorkerNumberStore',
 		        		   style:'height:100%;width:100%;',
 		        		   itemTpl:
 		        			   [
 		        		          '<div>{ASSET_NUM}</div>',
 		        		       ]
    		            }] 	
    		         }]
				});
	/*		}else{
				//console.log('要显示吗？');
				ovlay_MainTain2.show();
			};*/
			
			//数据仓
			var datads=Ext.data.StoreManager.get('FaultWorkerNumberStore');
			if(!datads){
				datads=Ext.create('HelcPDA.store.fault.FaultWorkerNumberStore');
			}
			datads.setData(json.rows);
			//console.log('数据长度:'+json.rows.length);
		};
		
		//查询条件
		var tiaojian="{'ASSET_NUM':'"+ASSET_NUM+"','DOMAIN_NAME':'"+DOMAIN_NAME+"','EDIFICE_NAME':'"+EDIFICE_NAME+"','ADDRESS':'"+ADDRESS+"','COMPANY_ID':'"+company_code+"'}";
		//查询方法
		this.connectServer(station,"fuwuqingqiuluruAction.do?method=Search_Asset_num",tiaojian);
	},
	
	//获取选中维保人员的信息
	FaultFHIP_MPP:function(dataview, index, target, record, e, eOpts){
		var datads=Ext.data.StoreManager.get('FaultWorkerNumberStore');
		if(!datads){
			datads=Ext.create('HelcPDA.store.fault.FaultWorkerNumberStore');
		};
		//获取维保人员ID
		var day=datads.getAt(index).get('ASSET_NUM');
		//拆分数据
		fw=new Array();
		fw=day.split('/');
		for(var i=1;i<fw.length;i++){
			if(fw[i]=='空'){
				fw[i]='';
			}
		};
		Ext.getCmp('FaultFHIP_GH').setValue(fw[0]);
		Ext.getCmp('FaultFHIP_SXDP').setValue(fw[1]);
		Ext.getCmp('FaultFHIP_SXDL').setValue(fw[2]);
		Ext.getCmp('FaultFHIP_SXDZ').setValue(fw[3]);
		
		//隐藏显示界面
		var listPanel=Ext.getCmp('statPanel2');
		listPanel.destroy();
		
		/*//修改受信故障状态列表的值
		var tiaojian="{'REMARKS':'"+REMARKS+"'}";
		this.connectServer(this.FaultStationAddDataTwo2,"fuwuqingqiuluruAction.do?method=toSearch",tiaojian);*/
		
		//根据获取的工号和公司ID改变受信故障状态下拉列表的值
		var tiaojian="{'ASSET_NUM':'"+fw[0]+"','COMPANY_ID':'"+company_code+"'}";
		this.connectServerMainTain(this.FaultupdateStatus,this,"fuwuqingqiuluruAction.do?method=toSearchbyid",tiaojian);
	},
	
	//获取电梯属性
	//不能再使用调用远程数据的方法中在传递方法
	FaultupdateStatus:function(result,obj){
		//console.log("json故障工号: "+JSON.stringify(result.rows));
		//查询 电梯属性
		var id=result.rows.length-1;
		//console.log("json: "+JSON.stringify(result.rows[id].ELEVATOR_TYPE));
		var REMARKS=result.rows[id].ELEVATOR_TYPE;
		//故障工号
		var ASSET_ID=result.rows[id].ASSET_ID;
		Ext.getCmp('ASSET_ID').setValue(ASSET_ID);
		
		//console.log('故障工号:'+ASSET_ID);
		obj.Faultuypdate(REMARKS);
	},
	
	//查询 通过电梯属性查询受信故障状态
	Faultuypdate:function(id){
		//console.log('zhi:'+id);
		var tiaojian="{'REMARKS':'"+id+"'}";
		this.connectServer(this.FaultStationAddDataTwo2,"fuwuqingqiuluruAction.do?method=toSearch",tiaojian);
	},
	//下拉列表   数据仓添加数据     信故障状态
	FaultStationAddDataTwo2:function(result){
		//console.log('进入服务请求录入界面'+JSON.stringify(result));
		//建立数据仓
		var FaultList=Ext.data.StoreManager.get('HelHotlineFaultStatusStore');
		if (!FaultList) { 
			FaultList = Ext.create('HelcPDA.store.fault.HelHotlineFaultStatusStore'); 
		};
		//清空数据仓
		var qkdata=new Array();
		FaultList.setData(qkdata);
		//获得受信故障集合
		var gz=result.rows;
		
		//受信故障
		gz=JSON.stringify(gz);
		Ext.getCmp('gz').setValue(gz);
		
		FaultList.setData(result.rows,this);
	},
	
	
	//客户查询
	FaultAccntNameButton:function(){
		//console.log('进入客户查询');
		var name=Ext.getCmp('FaultFHIP_KH').getValue();
		if(name==''){
			Ext.Msg.alert('请输入用户名称');
		}else{
			//console.log('用户查找为:'+name);
			//
			var tiaojian="{'ACCOUNT_NAME':'"+name+"'}";
			//查询结果显示界面
			var station=function(json){
				/*console.log("json: "+JSON.stringify(json.rows));
				if(!ovlay_MainTain3){*/
					//console.log('进来list来了');
					if(json.rows.length==0){
						 WL.Toast.show("查无结果！");
						return;
					};
					
					ovlay_MainTain3=Ext.Viewport.add({
						xtype:'panel',
						id:'statPanel3',
						hideOnMaskTap: true,
	       		     	style:'height:80%;width:90%;',
		     	        centered: true,
	       		     	//scrollable: true,
	       		     	modal: true,
	       		     	items:[{
	       		     		xtype:'fieldset',
	       		     		style:'height:100%;width:100%;',
	    		            items:[{
	    		               xtype:'list',     		
	 		        		   id:'FaultFHIP_KHTwo',
	 		        		   store:'FaultHandlingStore',
	 		        		   style:'height:100%;width:100%;',
	 		        		   itemTpl:
	 		        			   [
	 		        		          '<div>{ACCNT_NAME}</div>',
	 		        		       ]
	    		            }] 	
	    		         }]
					});
					//
			/*	}else{
					console.log('要显示吗？');
					if(json.rows.length!=0){
						ovlay_MainTain3.show();
					};
				};*/
				//
				/*if(json.rows.length==0){
					Ext.Msg.alert('没有找到合适的数据,请重新输入正确数据查找');
					//隐藏显示界面
					var listPanel=Ext.getCmp('statPanel3');
					listPanel.hide();
				};*/
				
					var datads=Ext.data.StoreManager.get('FaultHandlingStore');
					if(!datads){
						datads=Ext.create('HelcPDA.store.fault.FaultHandlingStore');
					}
					datads.setData(json.rows);
					//console.log('数据长度:'+json.rows.length);
				
			};
			
			//查询方法
			this.connectServer(station,"fuwuqingqiuluruAction.do?method=search_account",tiaojian);
		};
	},
	
	//获取客户名
	FaultFHIP_KHTwo:function(dataview, index, target, record, e, eOpts){
		var datads=Ext.data.StoreManager.get('FaultHandlingStore');
		if(!datads){
			datads=Ext.create('HelcPDA.store.fault.FaultHandlingStore');
		};
		var day=datads.getAt(index).get('ACCNT_NAME');
		
		//获取客户ID
		var ACCOUNT_ID=datads.getAt(index).get('ACCOUNT_ID');
		Ext.getCmp('ACCOUNT_ID').setValue(ACCOUNT_ID);
		
		//console.log(day+"-----"+ACCOUNT_ID);
		Ext.getCmp('FaultFHIP_KH').setValue(day);
		//隐藏显示界面
		var listPanel=Ext.getCmp('statPanel3');
		/*listPanel.hide();*/
		listPanel.destroy();
	},
	
	//服务请求录入提交  16
	FaultFHIPSubmitButton:function(){
		//console.log('进入服务请求录入提交');
		//工号     
		var ASSET_NUM=Ext.getCmp('FaultFHIP_GH').getValue();
		//受信地盘
		var FAULT_DOMAIN=Ext.getCmp('FaultFHIP_SXDP').getValue();
		//受信大楼
		var FAULT_EDIFICE=Ext.getCmp('FaultFHIP_SXDL').getValue();
		//受信地址
		var FAULT_ADDRESS=Ext.getCmp('FaultFHIP_SXDZ').getValue();
		
		//所属公司ID
		var COMPANY_ID=company_code;
		//所属公司
		var COMPANY_NAME=Ext.getCmp('FaultFHIPCompanyName').getValue();
		
		//所属站ID
		var STATION_ID=Ext.getCmp('FaultFHIPStation').getValue();
		//受信内容
		var ABSTRACT=Ext.getCmp('FaultFHIP_SXNR').getValue();
		//受信时间
		var START_TIME=Ext.getCmp('FaultFHIP_SXSJ').getValue();
		//console.log('受信时间：'+START_TIME);
		//发生时间
		var HAPPEN_TIME=Ext.getCmp('FaultFHIP_FSSJ').getValue();
		//console.log('发生时间：'+HAPPEN_TIME);
		
		//联系人姓名
		var CONTACT_NAME=Ext.getCmp('FaultFHIP_LXRXM').getValue();
		//联系人电话
		var CONTACT_PHONE=Ext.getCmp('FaultFHIP_LXRDH').getValue();
		//是否困人
		var BOX_UP=Ext.getCmp('FaultFHIP_SFKR').getValue();
		
		//受信故障状态ID
		var HOTLINE_FAULT_STATUS=Ext.getCmp('FaultFHIP_SXGZZT').getValue();
		//受信故障状态值
		var HOTLINE_FAULT_STATUS_value='';
		
		//受信故障
		var gz=Ext.getCmp('gz').getValue();
		gz=eval("("+ gz +")");
		
	    //获取 下拉列表显示的值
		//console.log('json:'+gz.length);
	      for(var i=0;i<gz.length;i++){
	    	  if(gz[i].LANGUAGE_CODE==HOTLINE_FAULT_STATUS){
	    	   	 //console.log(gz[i].STATUS);
	    	   	 HOTLINE_FAULT_STATUS_value=gz[i].STATUS;
	        	 break;
	    	  };
	    };
	    //console.log(HOTLINE_FAULT_STATUS_value);  

		//客户
		var ACCNT_NAME=Ext.getCmp('FaultFHIP_KH').getValue();
		//预约时间
		var BOOKING_TIME=Ext.getCmp('FaultFHIP_YYSJ').getValue();

		//派工人员
		var ASSIGN_PERSON_ID=Ext.getCmp('FaultFHIPPersonName').getValue();
		
		//特殊
		//服务请求子类型(业务分类)  写死
		var AREA='PDA';
		//客户ID
		//
		var SERVICE_REQUEST_SOURCE='PDA';

		//判读是否有空
		var flag=true;
		if(ASSET_NUM==''){
			Ext.Msg.alert('工号不能为空');
			flag=false;
		};
		if(FAULT_DOMAIN==''){
			Ext.Msg.alert('受信地盘不能为空');
			flag=false;
		};
		if(FAULT_EDIFICE==''){
			Ext.Msg.alert('受信大楼不能为空');
			flag=false;
		};
		if(FAULT_ADDRESS==''){
			Ext.Msg.alert('受信地址不能为空');
			flag=false;
		};
		if(ABSTRACT==''){
			Ext.Msg.alert('受信内容不能为空');
			flag=false;
		};
		if(START_TIME==''){
			Ext.Msg.alert('请填写受信时间');
			flag=false;
		};
		if(HAPPEN_TIME==''){
			Ext.Msg.alert('请填写发生时间');
			flag=false;
		};
		
		if(this.Faultcomptime(HAPPEN_TIME,START_TIME)){
			Ext.Msg.alert('发生时间应早于受信时间');
			flag=false;
		};
		
		if(BOOKING_TIME!=''){
			if(this.Faultcomptime(START_TIME,BOOKING_TIME)){
				Ext.Msg.alert('受信时间应早于预约时间');
				flag=false;
			};
		};
		
		if(CONTACT_NAME==''){
			Ext.Msg.alert('联系人姓名不能为空');
			flag=false;
		};
		if(CONTACT_PHONE==''){
			Ext.Msg.alert('联系人电话不能为空');
			flag=false;
		};
		if(BOX_UP=='请选择'){
			Ext.Msg.alert('请选择是否困人');
			flag=false;
		};
		
		if(ASSIGN_PERSON_ID==''){
			Ext.Msg.alert('请选择派工人员不能为空');
			flag=false;
		};
		
		if(flag){
			//console.log('数据填写完毕');
			
			//获取客户ID
			var ACCOUNT_ID=Ext.getCmp('ACCOUNT_ID').getValue();
			//故障工号
			var ASSET_ID=Ext.getCmp('ASSET_ID').getValue();
			
			var tiaojian="{'ASSET_NUM':'"+ASSET_NUM+"','FAULT_DOMAIN':'"+FAULT_DOMAIN+"'," +
					"'FAULT_EDIFICE':'"+FAULT_EDIFICE+"','FAULT_ADDRESS':'"+FAULT_ADDRESS+"'," +
					"'STATION_ID':'"+STATION_ID+"'," +
					"'ABSTRACT':'"+ABSTRACT+"','START_TIME':'"+START_TIME+"'," +
					"'HAPPEN_TIME':'"+HAPPEN_TIME+"','CONTACT_NAME':'"+CONTACT_NAME+"'," +
					"'CONTACT_PHONE':'"+CONTACT_PHONE+"','BOX_UP':'"+BOX_UP+"'," +
					"'HOTLINE_FAULT_STATUS':'"+HOTLINE_FAULT_STATUS+"','HOTLINE_FAULT_STATUS_value':'"+HOTLINE_FAULT_STATUS_value+"'," +
					"'ACCNT_NAME':'"+ACCNT_NAME+"'," +
					"'BOOKING_TIME':'"+BOOKING_TIME+"','ASSIGN_PERSON_ID':'"+ASSIGN_PERSON_ID+"'," +
					"'AREA':'"+AREA+"','ACCOUNT_ID':'"+ACCOUNT_ID+"','ASSET_ID':'"+ASSET_ID+"'," +
					"'COMPANY_ID':'"+COMPANY_ID+"','SERVICE_REQUEST_SOURCE':'"+SERVICE_REQUEST_SOURCE+"'}";
			
			/*var data={};
			data.ASSET_NUM=ASSET_NUM;
			data.ASSET_ID=ASSET_ID;
			data.FAULT_DOMAIN=FAULT_DOMAIN; 
			data.FAULT_EDIFICE=FAULT_EDIFICE; 
			data.FAULT_ADDRESS=FAULT_ADDRESS; 
			data.COMPANY_ID=COMPANY_ID;
			data.ABSTRACT=ABSTRACT;
			data.START_TIME=START_TIME;
			data.HAPPEN_TIME=HAPPEN_TIME;
			data.CONTACT_NAME=CONTACT_NAME;
			data.CONTACT_PHONE=CONTACT_PHONE;
			data.ACCOUNT_ID=ACCOUNT_ID;
			
			console.log("data: "+JSON.stringify(data));
			*/
			this.connectServerMainTain(this.addPF,this,"fuwuqingqiuluruAction.do?method=toAdd",tiaojian);
		};
	},
	
	//提交后调用的方法
	addPF:function(result,obj){
		//console.log("json: "+result.msginfo);
		if(result.msginfo=='自动派工成功'){
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
			
			WL.Toast.show("自动派工成功！");
			obj.showBackView('faultHLP','HelcPDA.view.fault.FaultHandlingPanel');
			faultHandingPC_NEW(obj);
			//obj.tiaohuiyemian();		
		}else{
			WL.Toast.show("自动派工失败！");
		};
	},
	
	//根据所属站查找派工人员
	FaultFHIPStation:function(obj, newValue, oldValue, eOpts){
		var obj_this=this;
		if(station_id!=''){
			//alert('级别不够');
			return;
		}
		var s_id=Ext.getCmp('FaultFHIPStation').getValue();
		var ASSET_NUM=Ext.getCmp('FaultFHIP_GH').getValue();
		var tiaojian="{'STATION_ID':'"+s_id+"','ASSET_NUM':'"+ASSET_NUM+"'}";
		obj_this.connectServerHSSS(obj_this.Faultcxdx,'','','',"fuwuqingqiuluruAction.do?method=tofind_wbry",tiaojian);
	},
	
	Faultcxdx:function(arr1,obj,snam,sname2){
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
	/**
	 **故障模块   服务请求录入页面
	 ************************************************************************************/
	
/*	//跳回首页
	tiaohuiyemian:function(){
		//判断是否站长登录
		var zz='*#站长#*,*#片长#*,*#站信息管理员#*';
		//三期项目修改标志
		var three='xcxdpa';
		if(zz.indexOf(position_type) >= 0 )   
		{   
			var tiaojian="{'person_id':'"+person_id+"','position_type':'"+position_type+"','station_id':'"+station_id+"','three_dpa':'"+three+"','company_code':'"+company_code+"'}";
			this.connectServerFault(this,"gzdaichuliAction.do?method=toSearch3",tiaojian);
		   console.log('站长登录');
		}else{
			var tiaojian="{'person_id':'"+person_id+"','position_type':'"+position_type+"','station_id':'"+station_id+"','three_dpa':'"+three+"'}";
			this.connectServerFault(this,"gzdaichuliAction.do?method=toSearch",tiaojian);
			console.log(position_type+'登录');
		};
		
		this.showBackView('faultHLP','HelcPDA.view.fault.FaultHandlingPanel');
	},

	
	
	
	
	
	///////////////////重复的代码
	//删除并添加JSONStore中的数据（公共方法）
	deleteStoppageData:function(objt,result){
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var options={exacte:true};//默认是false
		var deletemainfields={tcode:'GZ_DAICHULI'};
		MaintainList.remove(deletemainfields,options).then(function(){
    		console.log('删除故障列表成功');
    		console.log('result:'+result.rows);
    		var num=result.rows.length;
    		console.log('添加数据的长度:'+num);
    		var  datas=[];
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
    		var zz='*#站长#*,*#片长#*,*#站信息管理员#*';
    		if(zz.indexOf(position_type) >= 0 )   
    		{   
    		  	console.log('站长登录信息'+JSON.stringify(result.STATION_ROWS));
    		   	var FaultAdd3={tcode:'GZ_DAICHULI',tid:'STATION_ROWS',stext:result.STATION_ROWS};
       			datas[num+1]=FaultAdd3;
    		};
    		
    		
    		MaintainList.add(datas).then(function(){
	    		console.log('添加GZ_DAICHULI成功');
	    		objt.FaultAddData(result);
	    	}).fail(function(errorObject){
	    		console.log('添加GZ_DAICHULI出错');	
    		});
    		
		}).fail(function(errorObject){
			console.log('删除故障列表失败');
		});
	},
	
	
	//直接远程从数据库中获取
	FaultAddData:function(result){
		console.log('进入FaultAddData添加数据仓方法');
		
		var FaultList=Ext.data.StoreManager.get('FaultHandlingStore');
		if (!FaultList) { 
			FaultList = Ext.create("HelcPDA.store.fault.FaultHandlingStore"); 
		};
		FaultList.setData(result.rows,this);
		
		var numtwoFlaut='待处理('+result.NUM2+')';
		var numthreeFlaut='处理中('+result.NUM3+')';
		var numfourFlaut='已驳回('+result.NUM4+')';

		Ext.getCmp('PendingFault').setHtml(numtwoFlaut);
		Ext.getCmp('ProcessingFault').setHtml(numthreeFlaut);
		Ext.getCmp('HasBeenRejectedFault').setHtml(numfourFlaut);
		
		console.log('count:'+JSON.stringify(result.count));//总数
		console.log('NUM2:'+JSON.stringify(result.NUM2));//待处理
		console.log('NUM3:'+JSON.stringify(result.NUM3));//处理中
		console.log('NUM4:'+JSON.stringify(result.NUM4));//已处理
		console.log('rows:'+JSON.stringify(result.rows));
		
	},*/
	
	
	
///////
});