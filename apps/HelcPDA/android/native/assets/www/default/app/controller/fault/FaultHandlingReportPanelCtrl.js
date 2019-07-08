
/* JavaScript content from app/controller/fault/FaultHandlingReportPanelCtrl.js in folder common */
Ext.define('HelcPDA.controller.fault.FaultHandlingReportPanelCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//进入退单请求的事件
			FaultHandlingReportPanel_search_Asset:'button[id=search_Asset]',
			//点击选择list内的故障工号
			FaultHandlingReportPanel_serach_AssetList:'list[id=serach_AssetList]',
		    //查找客户
			FaultHandlingReportPanel_search_Custom:'button[id=search_Custom]',
		    //点击选择客户的list
		    FaultHandlingReportPanel_serach_AccountName:'list[id=serach_AccountName]',
		    //点击保存
		    FaultHandlingReportPanel_saveAllReport:'button[id=saveAllReport]',
		    //点击提交
		    FaultHandlingReportPanel_submitAllReport:'button[id=submitAllReport]',
		    //直扶梯监控
		    FaultHandlingReportPanel_ELEVATOR_TYPE:'selectfield[id=ELEVATOR_TYPE]',
		    //返回
		    FaultHandlingReportPanel_backtoFault:'button[id=backtoFault]'
		},
		control:{
			FaultHandlingReportPanel_search_Asset:{
				tap:'search_Asset'
			},
			FaultHandlingReportPanel_serach_AssetList:{
				itemtap:'serach_AssetList'
			},
			FaultHandlingReportPanel_search_Custom:{
				tap:'search_Custom'
			},
			FaultHandlingReportPanel_serach_AccountName:{
				itemtap:'serach_AccountName'
			},
			FaultHandlingReportPanel_saveAllReport:{
				tap:'saveAllReport'
			},
			FaultHandlingReportPanel_submitAllReport:{
				tap:'submitAllReport'
			},
			FaultHandlingReportPanel_ELEVATOR_TYPE:{
				change:'ELEVATOR_TYPE'
			},
			FaultHandlingReportPanel_backtoFault:{
				tap:'backtoFault'
			},
			//退回
			"button#returnAllReport":{
				tap:'returnAllReport'
			},
			
		},
	},
	
	
	//退回   提交的情况下可以退回
	returnAllReport:function(){
		var zt=Ext.getCmp('AUDITING_STATUS').getValue();
		if(zt=='已确认'||zt=='已审核'){
			Ext.Msg.alert('提示','故障报告书已确认');
			return;
		};
		var obj=this;
		//圈圈页面
		myLoading.show();
		
		var ACTID=Ext.getCmp('ACTIVITYID').getValue();
		console.log('ACTID:'+ACTID);
		getResult=function(result){
			console.log('-------------------++_________');
			console.log(result);
			console.log(result.FaultReportRollback_Output.ErrMsg);
			if(result.FaultReportRollback_Output.ErrMsgId=='1'){
				WL.Toast.show(result.FaultReportRollback_Output.ErrMsg);
			}else{
				return;
			};
			var content="{'ACTIVITY_ID':'"+ACTID+"'}";
			var invocationData2 = {  
					adapter : 'HttpAdapter_PDA',  
		            procedure : 'getStories_pda',
		            parameters : ['gzbaogaoluruAction.do?method=toupdateTwo', content]
			};
	 	 	obj.connectServer_GZ(getResultTwo,invocationData2);
		};
			
		getResultTwo=function(result){
			myLoading.hide();
			console.log('-------------------++_________TWO');
			console.log(result);
			var Msg = eval("("+result.content+")"); 
			var MSGID=Msg.msgid;
			var MSGINFO=Msg.msginfo;
			console.log(result.content);
			console.log(MSGID);
			console.log(MSGINFO);
			if(MSGID==1){
				console.log(MSGINFO);
				WL.Toast.show(MSGINFO);
				obj.BackView();
				obj.BackView();
				faultHandingPC_NEW(obj);//承希的刷新list方法
			}else{
				Ext.Msg.alert('温馨提示','数据修改失败，请重新退回！');
			};
		};
			
		var invocationData = {  
				adapter : 'HttpAdapter_PDA_Fault',
		        procedure : 'GZBGSTJTH',
		        parameters : [ACTID]
		};
		obj.connectServer_GZ(getResult,invocationData);
	},
	
	search_Asset:function(){
		var obj=this;
		var ASSET_NUM=Ext.getCmp('ASSET_NUM').getValue();
		if(ASSET_NUM==''||ASSET_NUM==null||typeof(ASSET_NUM)=='undefined'){
			WL.Toast.show('故障工号不能为空');
			return;
		};
	
	    var getResult=function(res){
	    	if(res.rows==''||res.rows==null||res.rows=='undefined'){
				WL.Toast.show('没有相关信息');
				return;
				
			}
	    	var PanelId='listAssetPanel';
	    	var ListArray={};
	    	ListArray.id='serach_AssetList';
	    	ListArray.StoreName='FaultHandlingReportSearchStore';
	    	ListArray.StoreFullName='HelcPDA.store.fault.FaultHandlingReportSearchStore';
	    	ListArray.StoreParam=["ASSET_NUM"];
	    	var Data=res.rows;
	    	obj.getList(PanelId,ListArray,Data);
		};
		var content="{ASSET_NUM:'"+ASSET_NUM+"',COMPANY_ID:'"+company_code+"'}";
		this.connectServer(getResult,'gzbaogaoluruAction.do?method=toSearch_asset_num_list_ForPda3', content);
		
	},
	//在list列表单击选择数据
	serach_AssetList:function(obj,index,target,record,e,eOpts){
		var listAssetPanel=Ext.getCmp('Panel_List_Id');
    	if(listAssetPanel){
    		listAssetPanel.destroy();
    	}
    	
    	 var store = Ext.data.StoreManager.get("FaultHandlingReportSearchStore"); 
  		  if (!store) { 
  		    store = Ext.create("HelcPDA.store.fault.FaultHandlingReportSearchStore"); 
  		  }   
    	
    	var ASSET_NUM=store.getAt(index).get('ASSET_NUM'); 
    	var ACTIVITY_ID=Ext.getCmp('ACTIVITY_ID').getValue();
    	
    	var USERID=userid;//store.getAt(index).get('USERID');
    	var content="{'ASSET_NUM':'"+ASSET_NUM+"','ACTIVITY_ID':'"+ACTIVITY_ID+"','USERID':"+USERID+"}";
    	console.log('故障工号查询条件--------------------------------');
    	console.log(content);
    	var getResult=function(res){
    		
    		
        	//Ext.getCmp('COMPANY_ID').setValue(res.rows[0].COMPANY_ID);
    		console.log("搜索客户产生的资料：："+JSON.stringify(res));
        	Ext.getCmp('Action_Asset_Domain').setValue(res.rows[0].FAULT_DOMAIN);
        	Ext.getCmp('Action_Asset_Edifice').setValue(res.rows[0].FAULT_EDIFICE);
        	Ext.getCmp('ASSET_NUM').setValue(res.rows[0].ASSET_NUM);
        	Ext.getCmp('FOR_ASSET_NUM').setValue(res.rows[0].ASSET_NUM);
        	Ext.getCmp('ASSET_NUM').setValue(res.rows[0].ASSET_NUM);
        	Ext.getCmp('Action_Asset_Station_Id').setValue(res.rows[0].STATION_ID);
        	Ext.getCmp('Action_Elevator_Mark').setValue(res.rows[0].ELEVATOR_MARK);
        	Ext.getCmp('Action_Asset_Floor').setValue(res.rows[0].ELEVATOR_FLOOR);
        	Ext.getCmp('INSTALL_CONTR_NUM').setValue(res.rows[0].AGREE_NUM);
        	Ext.getCmp('ASSET_ID').setValue(res.rows[0].ASSET_ID);
        	Ext.getCmp('Action_Asset_Stop').setValue(res.rows[0].ELEVATOR_STOP);
        	Ext.getCmp('Action_Asset_Address').setValue(res.rows[0].FAULT_ADDRESS);
        	Ext.getCmp('ASSET_COMPANY_NAME').setValue(res.rows[0].COMPANY_NAME);
        	Ext.getCmp('ELEVATOR_TYPE').setValue(res.rows[0].ELEVATOR_TYPE);
        	Ext.getCmp('ASSET_COMPANY_ID').setValue(res.rows[0].COMPANY_ID);
        	
        	Ext.getCmp('ASSET_AGREE_BUSINESS_TYPE').setValue('');//业务类型
        	Ext.getCmp('ASSET_AGREE_BUSINESS_TYPE').setValue(res.rows[0].BUSINESS_TYPE);
        	
        	//清空部分下拉选项
        	Ext.getCmp('SURE_ELEVATOR').setValue('');//确认工号
        	Ext.getCmp('Using_State').setValue('');//使用状态
        	Ext.getCmp('ASSET_AGREE_STATUS_CAL').setValue('');//合同状态
        	Ext.getCmp('NO_ASSET_COMMENT').setValue('');//无工号说明
        	
        	//已达成通过查询获得故障工号
        	var gz=Ext.getCmp('ASSET_NUM_HIDDEN');
        	gz.setValue('Yes');
        	var bb=gz.getValue();
        	console.log('hahha:'+bb);
    	};
    	
    	this.connectServer(getResult,'gzbaogaoluruAction.do?method=Searchby_asset_num', content);
	},
	//单击搜索客户的数据
	search_Custom:function(){
		var obj=this;
		var ACCOUNT_NAME=Ext.getCmp('ACCOUNT_NAME').getValue();
		if(ACCOUNT_NAME==''||ACCOUNT_NAME==null||typeof(ACCOUNT_NAME)=='undefined'){
			WL.Toast.show('搜索客户内容不能为空');
			return;
		 }
	
		var getResult=function(res){
			if(res.rows==''||res.rows==null||res.rows=='undefined'){
				WL.Toast.show('没有相关信息');
				return;
			}
			var PanelId='listAccountPanel';
	    	var ListArray={};
	    	ListArray.id='serach_AccountName';
	    	ListArray.StoreName='FaultHandlingReportSearchCustomStore';
	    	ListArray.StoreFullName='HelcPDA.store.fault.FaultHandlingReportSearchCustomStore';
	    	ListArray.StoreParam=["ACCNT_NAME"];
	    	var Data=res.rows;
	    	obj.getList(PanelId,ListArray,Data);
		};
		var content="{ACCOUNT_NAME:"+ACCOUNT_NAME+"}";
		
		this.connectServer(getResult,'fuwuqingqiuluruAction.do?method=search_account_ForPda3', content);
	},
	//点击选择serach_AccountName的list列表选择值
	serach_AccountName:function(obj,index,target,record,e,eOpts){
		var listAccountPanel=Ext.getCmp('Panel_List_Id');
    	if(listAccountPanel){
    		listAccountPanel.destroy();
    	}
    	 var store = Ext.data.StoreManager.get("FaultHandlingReportSearchCustomStore"); 
  		  if (!store) { 
  		    store = Ext.create("HelcPDA.store.fault.FaultHandlingReportSearchCustomStore"); 
  		  }   
    	
    	var ACCNT_NAME=store.getAt(index).get('ACCNT_NAME');
    	var ACCOUNT_ID=store.getAt(index).get('ACCOUNT_ID');
    	Ext.getCmp('ACCOUNT_NAME').setValue(ACCNT_NAME);
    	Ext.getCmp('ACCOUNT_ID').setValue(ACCOUNT_ID);
    	
    	
	},
	
	//点击保存所有的数据
	saveAllReport:function(){
		//Ext.Msg.alert('提示','提交完成后请填写报告书！');
		console.log('进入保存故障报表');
		//检查进入时状态是什么，如果是已提交或者未提交，设置用户是否能操作数据
		if(this.getJXCL_SubmitVerification('')){
			return;
		};
		
		//如果故障单自带工号，那么不需要判断是否通过故障工号按钮获得工号
		var FalgSave=Ext.getCmp('ASSET_NUM_HIDDEN').getValue();
		//alert(FalgSave);
		if(FalgSave=='No'){
			Ext.Msg.alert('温馨提示','故障工号未选择，请通过放大镜按钮选择工号');
			return;
		}
		
		/*工号          查询    判断
		有（自带）      有      可
		有（自带）      没      可
		有（自写）      有      可
		有（非自写）     没      没
		没           没      没
		没           有      有*/
 		console.log('进入保存故障报表-验证');	
	   	var ASSET_NUM=Ext.getCmp('FOR_ASSET_NUM').getValue();
	   	var ACTION_ASSET_DOMAIN=Ext.getCmp('Action_Asset_Domain').getValue();
	   	var ACTION_ASSET_EDIFICE=Ext.getCmp('Action_Asset_Edifice').getValue();
	   	var ACTION_ASSET_ADDRESS=Ext.getCmp('Action_Asset_Address').getValue();
	   	var ACTION_ELEVATOR_MARK=Ext.getCmp('Action_Elevator_Mark').getValue();
	   	var ASSET_COMPANY_ID=Ext.getCmp('ASSET_COMPANY_ID').getValue();
	   	var ACTION_ASSET_FLOOR=	Ext.getCmp('Action_Asset_Floor').getValue();
	   	var ACTION_ASSET_STOP=Ext.getCmp('Action_Asset_Stop').getValue();
	   	var NO_ASSET_COMMENT=Ext.getCmp('NO_ASSET_COMMENT').getValue();
	   	var FAULT_FLOOR=Ext.getCmp('Action_Elevator_floor').getValue();
	   	var SURE_ELEVATOR=Ext.getCmp('SURE_ELEVATOR').getValue();
	   	var ASSET_AGREE_STATUS_CAL=Ext.getCmp('ASSET_AGREE_STATUS_CAL').getValue();
	   	var REPLY_TIME_COMMENTS=Ext.getCmp('REPLY_TIME_COMMENTS').getValue();
	   	var NOT_RUN_COMMENTS=Ext.getCmp('NOT_RUN_COMMENTS').getValue();
	   	var FIELD_LIFT_FAULT=Ext.getCmp('FIELD_LIFT_FAULT').getValue();
	   	var FIELD_FAULT_STATUS=Ext.getCmp('FIELD_FAULT_STATUS').getValue();
	   	var FAULT_POINT=Ext.getCmp('FAULT_POINT').getValue();
	   	var FAULT_PART_DESCRIPTION=Ext.getCmp('FAULT_PART_DESCRIPTION').getValue();
	   	var BOX_UP_TIME=Ext.getCmp('BOX_UP_TIME').getValue();
	   	var BOX_UP_NUMBER=Ext.getCmp('BOX_UP_NUMBER').getValue();
	   	var FAULT_AUDIT_COMMENT=Ext.getCmp('FAULT_AUDIT_COMMENT').getValue();
	   	var INSTALL_CONTR_NUM=Ext.getCmp('INSTALL_CONTR_NUM').getValue();
	   	//	if(INSTALL_CONTR_NUM==''||INSTALL_CONTR_NUM==null||typeof(INSTALL_CONTR_NUM)=='undefined'){
	   	//		INSTALL_CONTR_NUM='1-4I07RV';
	   	//	}
	   	var SECOND_FAULT_SEQUENCE=Ext.getCmp('SECOND_FAULT_SEQUENCE').getValue();
	   	var ACTION_ASSET_STATION_ID=Ext.getCmp('Action_Asset_Station_Id').getValue();
	   	var ELEVATOR_TYPE=Ext.getCmp('ELEVATOR_TYPE').getValue();
	   	var ASSET_AGREE_BUSINESS_TYPE=Ext.getCmp('ASSET_AGREE_BUSINESS_TYPE').getValue();
	   	var HAPPEN_TIME=Ext.getCmp('HAPPEN_TIME').getValue();
	   	var SOUXIN_TIME=Ext.getCmp('SOUXIN_TIME').getValue();
	   	var SET_OUT_TIME=Ext.getCmp('SET_OUT_TIME').getValue();
	   	var FR_ARRIVED_TIME=Ext.getCmp('FR_ARRIVED_TIME').getValue();
	   	var RECOVERRUN_TIME=Ext.getCmp('RECOVERRUN_TIME').getValue();
	   	var FR_COMPLETED_TIME=Ext.getCmp('FR_COMPLETED_TIME').getValue();
	   	var SR_BOX_UP=Ext.getCmp('SR_BOX_UP').getValue();
	   	var FIELD_RESCUE_STYLE=Ext.getCmp('FIELD_RESCUE_STYLE').getValue();
	   	var AVOID_RESOURCE=Ext.getCmp('AVOID_RESOURCE').getValue();
	   	var ACCOUNT_ESTIMATE=Ext.getCmp('ACCOUNT_ESTIMATE').getValue();
	   	var AUDITING_STATUS=Ext.getCmp('AUDITING_STATUS').getValue();
	   	var COMPLETE_STATUS=Ext.getCmp('COMPLETE_STATUS').getValue();
	   	var ACCOUNT_ID=Ext.getCmp('ACCOUNT_ID').getValue();
	
	   	var ASSET_ID=Ext.getCmp('ASSET_ID').getValue();
	   	var USERID=userid;
	   	var ACTIVITY_ID=Ext.getCmp('ACTIVITYID').getValue();
	   	console.log('ACTIVITY_ID:'+ACTIVITY_ID);
	   	//zhj   xcx  2016-4-29
	   	var USED_STATUS=Ext.getCmp('Using_State').getValue();
	   	console.log('使用状态：'+USED_STATUS);
	   	var IS_CHARGEBACK = Ext.getCmp('IS_CHARGEBACK').getValue();
	
	   	//验证  xcx 2016-4-29
	   	if(USED_STATUS==''){
	   		WL.Toast.show('请选择使用状态');
	   		console.log('请选择使用状态');
	   		return;
	   	}
	   	
	   	if(!(Ext.isNumeric(ACTION_ASSET_FLOOR))){
	   		WL.Toast.show('层需要填入数字');
	   		console.log('层需要填入数字');
	   		return;
	   	}
	   	//Ext.isNumeric检测填入数据是否为字符串或数字
	   	if(!(Ext.isNumeric(ACTION_ASSET_STOP))){
	   		WL.Toast.show('站需要填入数字');
	   		console.log('站需要填入数字');
	   		return;
	   	}
	   	if(SR_BOX_UP=='是'&&BOX_UP_TIME!=""&&!(Ext.isNumeric(BOX_UP_TIME))){
	   		WL.Toast.show("困人时间(数字)");
	   		console.log('困人时间(数字)');
	   		return;
	   	}
	   	if(SR_BOX_UP=='是'&&BOX_UP_NUMBER!=""&&!(Ext.isNumeric(BOX_UP_NUMBER))){
	   		WL.Toast.show("困人时间(数字)");
	   		console.log('困人时间(数字)');
	   		return;
	   	}
	   	
	   	console.log('机器代码'+SECOND_FAULT_SEQUENCE);
		if(SECOND_FAULT_SEQUENCE==''||SECOND_FAULT_SEQUENCE==null||typeof(SECOND_FAULT_SEQUENCE)=='undefined'||SECOND_FAULT_SEQUENCE=='请选择'){
			//WL.Toast.show('请选择第二机器代码');
			WL.Toast.show('请选择机器代码');
			console.log('请选择第二机器代码');
			return true;
		}
	
	   	var content="{"+"ASSET_NUM:'"+ASSET_NUM+"'," +
		"ACTION_ASSET_DOMAIN:'"+ACTION_ASSET_DOMAIN+"'," +
		"ACTION_ASSET_EDIFICE:'"+ACTION_ASSET_EDIFICE+"'," +
		"ACTION_ASSET_ADDRESS:'"+ACTION_ASSET_ADDRESS+"'," +
		"ACTION_ELEVATOR_MARK:'"+ACTION_ELEVATOR_MARK+"'," +
		"ASSET_COMPANY_ID:'"+ASSET_COMPANY_ID+"'," +
		"ACTION_ASSET_FLOOR:'"+ACTION_ASSET_FLOOR+"'," +
		"ACTION_ASSET_STOP:'"+ACTION_ASSET_STOP+"'," +
		"NO_ASSET_COMMENT:'"+NO_ASSET_COMMENT+"'," +
		"FAULT_FLOOR:'"+FAULT_FLOOR+"'," +  
		"SURE_ELEVATOR:'"+SURE_ELEVATOR+"'," +
		"ASSET_AGREE_STATUS_CAL:'"+ASSET_AGREE_STATUS_CAL+"'," +
		"REPLY_TIME_COMMENTS:'"+REPLY_TIME_COMMENTS+"'," +
		"NOT_RUN_COMMENTS:'"+NOT_RUN_COMMENTS+"'," +
		"FIELD_LIFT_FAULT:'"+FIELD_LIFT_FAULT+"'," +
		"FIELD_FAULT_STATUS:'"+FIELD_FAULT_STATUS+"'," +
		"FAULT_POINT:'"+FAULT_POINT+"'," +
		"FAULT_PART_DESCRIPTION:'"+FAULT_PART_DESCRIPTION+"'," +
		"BOX_UP_TIME:'"+BOX_UP_TIME+"'," +
		"BOX_UP_NUMBER:'"+BOX_UP_NUMBER+"'," +
		"FAULT_AUDIT_COMMENT:'"+FAULT_AUDIT_COMMENT+"'," +
		"INSTALL_CONTR_NUM:'"+INSTALL_CONTR_NUM+"'," +
		"SECOND_FAULT_SEQUENCE:'"+SECOND_FAULT_SEQUENCE+"'," +
		"ACTION_ASSET_STATION_ID:'"+ACTION_ASSET_STATION_ID+"'," +
		"ASSET_AGREE_BUSINESS_TYPE:'"+ASSET_AGREE_BUSINESS_TYPE+"'," +
		"HAPPEN_TIME:'"+HAPPEN_TIME+"'," +
		"SOUXIN_TIME:'"+SOUXIN_TIME+"'," +
		"SET_OUT_TIME:'"+SET_OUT_TIME+"'," +
		"FR_ARRIVED_TIME:'"+FR_ARRIVED_TIME+"'," +
		"RECOVERRUN_TIME:'"+RECOVERRUN_TIME+"'," +
		"FR_COMPLETED_TIME:'"+FR_COMPLETED_TIME+"'," +
		"SR_BOX_UP:'"+SR_BOX_UP+"'," +
		"FIELD_RESCUE_STYLE:'"+FIELD_RESCUE_STYLE+"'," +
		"AVOID_RESOURCE:'"+AVOID_RESOURCE+"'," +
		"ACCOUNT_ESTIMATE:'"+ACCOUNT_ESTIMATE+"'," +
		"AUDITING_STATUS:'"+AUDITING_STATUS+"'," +
		"COMPLETE_STATUS:'"+COMPLETE_STATUS+"'," +
		"ACCOUNT_ID:'"+ACCOUNT_ID+"'," +
		"ASSET_ID:'"+ASSET_ID+"'," +
		"USERID:'"+USERID+"'," +
		"ACTIVITY_ID:'"+ACTIVITY_ID+"'," +
		"ELEVATOR_TYPE:'"+ELEVATOR_TYPE+"',"+
		//zhj  xcx 2016-4-29
		"USED_STATUS:'"+USED_STATUS+"',"+
		"IS_CHARGEBACK:'"+IS_CHARGEBACK+"'"+
		"}";
	
	   	var getResult=function(res){
	   		console.log(res.msginfo);
	   		if(res.msginfo=='保存失败'){
	   			Ext.Msg.alert('温馨提示',res.msginfo);
	   		}else{
	   			WL.Toast.show('故障报告书'+res.msginfo);	   			
	   		}
	   	};	
	
	   	this.connectServer(getResult,'gzbaogaoluruAction.do?method=toAdd',content);
	},
	
	
	//故障报告提交验证  xcx  2017-8-7
	submitAllReport_Validate:function(){
		
		//检查进入时状态是什么，如果是已提交或者未提交，设置用户是否能操作数据
		console.log('提交数据验证');
		if(this.getJXCL_SubmitVerification('')){
			return true;
		};
		console.log('提交数据验证-验证');
		
		var ACTION_ASSET_DOMAIN=Ext.getCmp('Action_Asset_Domain').getValue();
		var ACTION_ASSET_EDIFICE=Ext.getCmp('Action_Asset_Edifice').getValue();
		var ACTION_ASSET_ADDRESS=Ext.getCmp('Action_Asset_Address').getValue();
		var ACTION_ELEVATOR_MARK=Ext.getCmp('Action_Elevator_Mark').getValue();
		var ACTION_ASSET_FLOOR=	Ext.getCmp('Action_Asset_Floor').getValue();
		var ACTION_ASSET_STOP=Ext.getCmp('Action_Asset_Stop').getValue();
		var SURE_ELEVATOR=Ext.getCmp('SURE_ELEVATOR').getValue();
		var ASSET_AGREE_STATUS_CAL=Ext.getCmp('ASSET_AGREE_STATUS_CAL').getValue();
		var REPLY_TIME_COMMENTS=Ext.getCmp('REPLY_TIME_COMMENTS').getValue();
		var NOT_RUN_COMMENTS=Ext.getCmp('NOT_RUN_COMMENTS').getValue();
		var FIELD_LIFT_FAULT=Ext.getCmp('FIELD_LIFT_FAULT').getValue();
		var FIELD_FAULT_STATUS=Ext.getCmp('FIELD_FAULT_STATUS').getValue();
		var FAULT_POINT=Ext.getCmp('FAULT_POINT').getValue();
		var FAULT_PART_DESCRIPTION=Ext.getCmp('FAULT_PART_DESCRIPTION').getValue();
		var BOX_UP_TIME=Ext.getCmp('BOX_UP_TIME').getValue();
		var BOX_UP_NUMBER=Ext.getCmp('BOX_UP_NUMBER').getValue();
		var INSTALL_CONTR_NUM=Ext.getCmp('INSTALL_CONTR_NUM').getValue();
		var SECOND_FAULT_SEQUENCE=Ext.getCmp('SECOND_FAULT_SEQUENCE').getValue();
		var ACTION_ASSET_STATION_ID=Ext.getCmp('Action_Asset_Station_Id').getValue();
		var ELEVATOR_TYPE=Ext.getCmp('ELEVATOR_TYPE').getValue();
		var ASSET_AGREE_BUSINESS_TYPE=Ext.getCmp('ASSET_AGREE_BUSINESS_TYPE').getValue();
		var HAPPEN_TIME=Ext.getCmp('HAPPEN_TIME').getValue();
		var SOUXIN_TIME=Ext.getCmp('SOUXIN_TIME').getValue();
		var SET_OUT_TIME=Ext.getCmp('SET_OUT_TIME').getValue();
		var FR_ARRIVED_TIME=Ext.getCmp('FR_ARRIVED_TIME').getValue();
		var RECOVERRUN_TIME=Ext.getCmp('RECOVERRUN_TIME').getValue();
		var FR_COMPLETED_TIME=Ext.getCmp('FR_COMPLETED_TIME').getValue();
		var SR_BOX_UP=Ext.getCmp('SR_BOX_UP').getValue();
		var FIELD_RESCUE_STYLE=Ext.getCmp('FIELD_RESCUE_STYLE').getValue();
		var ACCOUNT_ESTIMATE=Ext.getCmp('ACCOUNT_ESTIMATE').getValue();
		var COMPLETE_STATUS=Ext.getCmp('COMPLETE_STATUS').getValue();
		var ACCOUNT_ID=Ext.getCmp('ACCOUNT_ID').getValue();
		var ASSET_COMPANY_ID=Ext.getCmp('ASSET_COMPANY_ID').getValue();
		var FOR_ASSET_NUM=Ext.getCmp('FOR_ASSET_NUM').getValue();
		var USED_STATUS=Ext.getCmp('Using_State').getValue();
		console.log('使用状态2：'+USED_STATUS);
				
		if(ACTION_ASSET_ADDRESS==''||ACTION_ASSET_ADDRESS==null||typeof(ACTION_ASSET_ADDRESS)=='undefined'){
			WL.Toast.show('工号地址不能为空');
			console.log('工号地址不能为空');
			return true;
		}	
		if(ACTION_ASSET_DOMAIN==''||ACTION_ASSET_DOMAIN==null||typeof(ACTION_ASSET_DOMAIN)=='undefined'){
			WL.Toast.show('工号地盘不能为空');
			console.log('工号地盘不能为空');
			return true;
		}
		if(ACTION_ASSET_EDIFICE==''||ACTION_ASSET_EDIFICE==null||typeof(ACTION_ASSET_EDIFICE)=='undefined'){
			WL.Toast.show('工号大楼不能为空');
			console.log('工号大楼不能为空');
			return true;
		}
		if(ACTION_ELEVATOR_MARK==''||ACTION_ELEVATOR_MARK==null||typeof(ACTION_ELEVATOR_MARK)=='undefined'){
			WL.Toast.show('梯号不能为空');
			console.log('梯号不能为空');
			return true;
		}
		if(ASSET_COMPANY_ID==''||ASSET_COMPANY_ID==null){
			WL.Toast.show('所属司ID不能为空,请搜索故障工号,带出ID');
			console.log('所属司ID不能为空,请搜索故障工号,带出ID');
			return true;
		}
		if(FOR_ASSET_NUM==''||FOR_ASSET_NUM==null){
			WL.Toast.show('故障工号ID不能为空,请搜索故障工号,带出ID');
			console.log('故障工号ID不能为空,请搜索故障工号,带出ID');
			return true;
		}
		var  STATION_NAME=Ext.getCmp('STATION_ID').getValue();
		if(ACTION_ASSET_STATION_ID!=STATION_NAME){
			WL.Toast.show("工号所属站和用户所属站不一致，请重新选择站");
			console.log('工号所属站和用户所属站不一致，请重新选择站');
			return true;
		}
		if(ACTION_ASSET_FLOOR==''||ACTION_ASSET_FLOOR==null||typeof(ACTION_ASSET_FLOOR)=='undefined'){
			WL.Toast.show('层不能为空');
			console.log('层不能为空');
			return true;
		}
		if(ACTION_ASSET_STOP==''||ACTION_ASSET_STOP==null||typeof(ACTION_ASSET_STOP)=='undefined'){
			WL.Toast.show('站不能为空');
			console.log('站不能为空');
			return true;
		}
		// zhj 10.09
		if(SURE_ELEVATOR==''||SURE_ELEVATOR==null||typeof(SURE_ELEVATOR)=='undefined'){
			WL.Toast.show('请选择是否确认工号');
			console.log('请选择是否确认工号');
			return true;
		}
		
		//验证  xcx 2016-4-29
		if(USED_STATUS==''){
			WL.Toast.show('请选择使用状态');
			console.log('使用状态判断2');
			return true;
		}
		
		if(ASSET_AGREE_STATUS_CAL==''||ASSET_AGREE_STATUS_CAL==null||typeof(ASSET_AGREE_STATUS_CAL)=='undefined'){
			WL.Toast.show('请选择合同状态');
			console.log('请选择合同状态');
			return true;
		}
		if(ASSET_AGREE_STATUS_CAL=='有合同'&&ASSET_AGREE_BUSINESS_TYPE==''){
			WL.Toast.show('有合同状态，请选择业务类型');
			console.log('有合同状态，请选择业务类型');
			return true;
		}
		if(HAPPEN_TIME==''||HAPPEN_TIME==null||typeof(HAPPEN_TIME)=='undefined'){
			WL.Toast.show('发生时间不能为空');
			console.log('发生时间不能为空');
			return true;
		}
		if(SOUXIN_TIME==''||SOUXIN_TIME==null||typeof(SOUXIN_TIME)=='undefined'){
			WL.Toast.show('受信时间不能为空');
			console.log('受信时间不能为空');
			return true;
		}
		if(SET_OUT_TIME==''||SET_OUT_TIME==null||typeof(HAPPEN_TIME)=='undefined'){
			WL.Toast.show('出发时间不能为空');
			console.log('出发时间不能为空');
			return true;
		}
		if(FR_ARRIVED_TIME==''||FR_ARRIVED_TIME==null||typeof(FR_ARRIVED_TIME)=='undefined'){
			WL.Toast.show('到达时间不能为空');
			console.log('到达时间不能为空');
			return true;
		}
		if(RECOVERRUN_TIME==''||RECOVERRUN_TIME==null||typeof(RECOVERRUN_TIME)=='undefined'){
			WL.Toast.show('恢复运行时间不能为空');
			console.log('恢复运行时间不能为空');
			return true;
		}
		if(FR_COMPLETED_TIME==''||FR_COMPLETED_TIME==null||typeof(FR_COMPLETED_TIME)=='undefined'){
			WL.Toast.show('急修完成时间不能为空');
			console.log('急修完成时间不能为空');
			return true;
		}
		
		var NOT_FA_SHOU=comptimes(SOUXIN_TIME,HAPPEN_TIME);
		if(NOT_FA_SHOU>=0){
			WL.Toast.show("发生时间必须早于或等于受信时间");
			console.log('发生时间必须早于或等于受信时间');
			return true;
		}
		var NOT_OUT_SHOU=comptimes(SOUXIN_TIME,SET_OUT_TIME);
		if(NOT_OUT_SHOU<=0){
			WL.Toast.show("出发时间不能早于或等于受信时间");
			console.log('出发时间不能早于或等于受信时间');
			return true;
		}
		var NOT_OUT_ARR=comptimes(FR_ARRIVED_TIME,SET_OUT_TIME);
		if(NOT_OUT_ARR>=0){
			WL.Toast.show("到达时间不能早于或等于出发时间");
			console.log('到达时间不能早于或等于出发时间');
			return true;
		}
		var NOT_ARR_FR=comptimes(FR_ARRIVED_TIME,RECOVERRUN_TIME);
		if(NOT_ARR_FR<=0){
			WL.Toast.show("恢复运行时间不能早于或等于到达时间");
			console.log('恢复运行时间不能早于或等于到达时间');
			return true;
		}
		
		var NOT_REC_FR=comptimes(FR_COMPLETED_TIME,RECOVERRUN_TIME);
		if(NOT_REC_FR>=0){
			WL.Toast.show("急修完成时间不能早于或等于恢复运行时间");
			console.log('急修完成时间不能早于或等于恢复运行时间');
			return true;
		}
		
		if(COMPLETE_STATUS==''||COMPLETE_STATUS==null||typeof(COMPLETE_STATUS)=='undefined'){
			WL.Toast.show('请选择完成情况');
			console.log('请选择完成情况');
			return true;
		}
		
		var REPLY_TIME=comptimes(SOUXIN_TIME,FR_ARRIVED_TIME);
		if(REPLY_TIME>0.5){
			if(REPLY_TIME_COMMENTS==''||REPLY_TIME_COMMENTS==null||typeof(REPLY_TIME_COMMENTS)=='undefined'){
				WL.Toast.show('到达时间超过出发时间30分钟，请输入应对说明');
				console.log('到达时间超过出发时间30分钟，请输入应对说明');
				Ext.getCmp('REPLY_TIME_COMMENTS').setRequired(true);
				return true;
			}
		}
		
		//“完成时间”超过“受信时间”5个小时，输入不运行时间说明
		var NOT_RUN_TIME=comptimes(SOUXIN_TIME,RECOVERRUN_TIME);
		if(NOT_RUN_TIME>=5){
			if(NOT_RUN_COMMENTS=='' || NOT_RUN_COMMENTS==null || typeof(NOT_RUN_COMMENTS)=='undefined'){
				WL.Toast.show('不运行时间超过5小时，请输入不运行时间说明');
				console.log('不运行时间超过5小时，请输入不运行时间说明');
				Ext.getCmp('NOT_RUN_COMMENTS').setRequired(false);
				return true;	
			}
		}
		
		if(FIELD_LIFT_FAULT==''||FIELD_LIFT_FAULT==null||typeof(FIELD_LIFT_FAULT)=='undefined'){
			WL.Toast.show('请输入现场故障内容');
			console.log('请输入现场故障内容');
			return true;
		}
		
		if(ELEVATOR_TYPE==''||ELEVATOR_TYPE==null||typeof(ELEVATOR_TYPE)=='undefined'){
			WL.Toast.show('请选择梯型');
			console.log('请选择梯型');
			return true;
		}
		
		if(FIELD_FAULT_STATUS==''||FIELD_FAULT_STATUS==null||typeof(FIELD_FAULT_STATUS)=='undefined'){
			WL.Toast.show('请选择现场故障状态');
			console.log('请选择现场故障状态');
			return true;
		}
		console.log('机器代码'+SECOND_FAULT_SEQUENCE);
		if(SECOND_FAULT_SEQUENCE==''||SECOND_FAULT_SEQUENCE==null||typeof(SECOND_FAULT_SEQUENCE)=='undefined'||SECOND_FAULT_SEQUENCE=='请选择'){
			//WL.Toast.show('请选择第二机器代码');
			WL.Toast.show('请选择机器代码');
			console.log('请选择第二机器代码');
			return true;
		}
		if(FAULT_POINT==''||FAULT_POINT==null||typeof(FAULT_POINT)=='undefined'){
			WL.Toast.show('请输入故障零件');
			console.log('请输入故障零件');
			return true;
		}
		if(FAULT_PART_DESCRIPTION==''||FAULT_PART_DESCRIPTION==null||typeof(FAULT_PART_DESCRIPTION)=='undefined'){
			WL.Toast.show('请输入故障零件变异描述');
			console.log('请输入故障零件变异描述');
			return true;
		}
		if(SR_BOX_UP==''||SR_BOX_UP==null||typeof(SR_BOX_UP)=='undefined'){
			WL.Toast.show('请选择是否困人');
			console.log('请选择是否困人');
			return true;
		}
		if(SR_BOX_UP=='是'&&BOX_UP_TIME==''){
			WL.Toast.show('请输入困人时间');
			console.log('请输入困人时间');
			return true;
		}
		if(SR_BOX_UP=='是'&&BOX_UP_NUMBER==''){
			WL.Toast.show('请输入困人数量');
			console.log('请输入困人数量');
			return true;
		}
		if(SR_BOX_UP=='是'&&FIELD_RESCUE_STYLE==''){
			WL.Toast.show('请选择脱困情况');
			console.log('请选择脱困情况');
			return true;
		}
		if(ACCOUNT_ESTIMATE==''||ACCOUNT_ESTIMATE==null||typeof(ACCOUNT_ESTIMATE)=='undefined'){
			WL.Toast.show('请选择客户评价');
			console.log('请选择客户评价');
			return true;
		}
		
		//--------------数字验证
		if(!(Ext.isNumeric(ACTION_ASSET_FLOOR))){
			WL.Toast.show('层需要填入数字');
			console.log('层需要填入数字');
			return true;
		}
		if(!(Ext.isNumeric(ACTION_ASSET_STOP))){
			WL.Toast.show('站需要填入数字');
			console.log('站需要填入数字');
			return true;
		}
		if(SR_BOX_UP=='是'&&BOX_UP_TIME!=""&&!(Ext.isNumeric(BOX_UP_TIME))){
			WL.Toast.show("困人时间(数字)");
			console.log('困人时间(数字)');
			return true;
		}
		if(SR_BOX_UP=='是'&&BOX_UP_NUMBER!=""&&!(Ext.isNumeric(BOX_UP_NUMBER))){
			WL.Toast.show("困人数量(数字)");
			console.log('困人数量(数字)');
			return true;
		}
		//--------------数字验证
		
		return false;
	},
	
	//故障报告书提交  NEW   2016-4-22
	submitAllReport:function(){
		//如果故障单自带工号，那么不需要判断是否通过故障工号按钮获得工号
		var FalgSave=Ext.getCmp('ASSET_NUM_HIDDEN').getValue();
		//alert(FalgSave);
		if(FalgSave=='No'){
			Ext.Msg.alert('温馨提示','故障工号未选择，请通过放大镜按钮选择工号');
			return;
		}
		
		var obj=this;
		if(this.submitAllReport_Validate()){
			return;
		}
    	//保存的方法
    	this.saveAllReport();
    	console.log("保存后继续往下走。");
    	//对作业人员进行检查，看是否填写作业人员的信息。
    	var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
 	  	var content=JSON.stringify({iswhere:"WHERE ACTIVITY_ID='"+ACTIVITY_ID+"'"});
 	  	var getResult1=function(res){
 	  		console.log('进入作业人员查询');
 	  		console.log(res);
 	  		var woker_list=[];
 	  		woker_list=res.rows;
 	  		if(woker_list==''||woker_list==null||typeof(woker_list)=='undefined'){
 	    		WL.Toast.show('填提交作业人员信息');
 	    		//Ext.Msg.alert('温馨提示','填提交作业人员信息');
 	    		return;
 	    	};
 	    	//对故障原因进行验证
 	  		//如果故障原因 是“更换零件”，那么就要查看是否有提交“配件信息”
 	 	  	function getResult(res){
 	 	  		console.log('进入故障原因信息查询');
 		  		var Appearance_list=[];
 		  		Appearance_list=res.rows;
 		  		var length=Appearance_list.length;
 		  		var isNeedPeijian=0;
		  		if(length<=0){
		  			WL.Toast.show('填提交故障原因信息');
		  			//Ext.Msg.alert('温馨提示','填提交故障原因信息');
		            return;
 		  		}else{
 		  			for(var i=0;i<length;i++){
 	 		  			if(Appearance_list[i].FAULT_RESOURCE=='更换零件'){
 	 		  			   isNeedPeijian++;
 	 		  			};
 	 		  		};
 		  		};
		  		if(isNeedPeijian>0){
			  		var content=JSON.stringify({iswhere:"WHERE ACTIVITY_ID='"+ACTIVITY_ID+"'"});
				  	function getResult6(res){
				  		var Accessories_list=[];
			  			Accessories_list=res.rows;
			  			var length=Accessories_list.length;
			  			if(length==0){
			  				WL.Toast.show('填提交配件信息');
			  				//Ext.Msg.alert('填提交配件信息');
			  				return;
			  	 	    }else{
			  	 	    	subm(); 
			  	 	    };
			  		};
			  		setTimeout(obj.asyconnectServer(getResult6, 'gzbaogao_peijianAction.do?method=toSearch', content),2000);
		  		}else{
		  			subm();
		  		};
		  		
		  		//提及“故障报告书”的方法
		  		function subm(){
		  			var content="{'ACTIVITY_ID':'"+ACTIVITY_ID+"','USERID':'"+userid+"','PERSONID':'"+person_id+"'}";
		 	    	cc.log('person_id:'+person_id);
		  			function getResult7(res){
		  				console.log('提交---------------');
		  				console.log(res);
		 	    		var str=res.msgid+'';
		  				if(str=='0'){
		  					WL.Toast.show("提交成功");
		  					console.log('提交---------------');
		  					DisabledToChange();
		  					faultHandingPC_NEW(obj);//承希的刷新list方法
		  				}else{
		  					//Ext.Msg.alert('温馨提示',res.msginfo);
		  					WL.Toast.show(res.msginfo); 
		  				};
		  			};
		  				   /*navigator.notification.confirm('确认要提交吗？',function(btn){
		  			 			if(btn ==2){
		  			 				obj.connectServer(getResult7,'gzbaogaoluruAction.do?method=tocommit', content);
		  							 return;
		  			 			}else{
		  			 				 return;
		  			 			}
		  			 		},"提示","取消,确定");*/
		  				   
		  				 Ext.Msg.confirm('消息','确认要提交吗?',function(btn){
		  				     if (btn == 'yes'){ 
		  				    	obj.connectServer(getResult7,'gzbaogaoluruAction.do?method=tocommit', content);
	  							 return;
		  				     }else{
		  				        return; 
		  				     }; 
		  				});
		  		};
 		  	};
 		  	setTimeout(obj.asyconnectServer(getResult, 'gzyuanyinAction.do?method=toSearch', content),2000);
 	  		
 	  	};
 	  	obj.asyconnectServer(getResult1, 'gzbaogao_zyryAction.do?method=toSearch', content);
 	  
	
	},
	
	//监控直扶梯状态
	ELEVATOR_TYPE:function(obj,newValue,oldValue,eOpts){
		console.log('----------这里开始2');
    		var Arravi_status=[{value:'',text:'请选择'},
    		                   {value:'40扶梯不运行（含不能启动）',text:'40扶梯不运行（含不能启动）'},
    		                   {value:'41异响、振动',text:'41异响、振动'},
    		                   {value:'42烟雾、异味',text:'42烟雾、异味'},
    		                   {value:'43扶手带异常（停止、不同步、脱落、跳动、龟裂、变形）',text:'43扶手带异常（停止、不同步、脱落、跳动、龟裂、变形）'},
    		                   {value:'44灯不亮',text:'44灯不亮'},
    		                   {value:'45部件（玻璃、梯级、梳齿板等）破损、脱落',text:'45部件（玻璃、梯级、梳齿板等）破损、脱落'},
    		                   {value:'46电机过热烧坏',text:'46电机过热烧坏'},
    		                   {value:'47其他',text:'47其他'}
    		                   ];
    		
    	if(newValue=='扶梯'){
    	var content="{'TYPE':'扶梯'}";
    	var getResult=function(res){
    		Type(res.rows_mcode2);
    	};
    	Ext.getCmp('FIELD_FAULT_STATUS').setOptions(Arravi_status);
    	this.connectServer(getResult,'gzbaogaoluruAction.do?method=toSearch_mcode2', content);
    		}
    	else if(newValue=='直梯'){
    		var content="{'TYPE':'直梯'}";
        	var getResult=function(res){
        		Type(res.rows_mcode2);	
        	};
        	 Ext.getCmp('FIELD_FAULT_STATUS').setOptions(Arrive_staues);
        	this.connectServer(getResult,'gzbaogaoluruAction.do?method=toSearch_mcode2', content);
        	}
    		else{
    	    Ext.getCmp('FIELD_FAULT_STATUS').setOptions(Arrive_staues);	
    	    var options={value:'',text:'请选择'};
    	    Ext.getCmp('SECOND_FAULT_SEQUENCE').setOptions(options);
    		}
		
	},
	
	//点击返回
	backtoFault:function(){
		var obj=this;
    	 if(this.getJXCL_SubmitVerification('two')){
    		 obj.BackView();
 		}
    	 else{
    			/*navigator.notification.confirm('返回前,要保存未提交的数据吗？',function(btn){
    	 			if(btn ==2){
    	 				obj.BackView();
    					obj.saveAllReport();
    	 			}else{
    	 				obj.BackView();
    					return;
    	 			}
    	 		},"提示","取消,确定");*/
	
		Ext.Msg.confirm('温馨提示','返回前,要保存未提交的数据吗？',function(btn){
				if (btn == 'yes'){
					obj.BackView();
					obj.saveAllReport();
				}else{
					obj.BackView();
					return;
				}
		});
				
    	 }
	}
});
function DisabledToChange(){
	//提交成功后掷灰整个页面
	    Ext.getCmp('faultHandlingReportPanel').disable();
	    Ext.getCmp('saveAllReport').setDisabled(true);
		Ext.getCmp('submitAllReport').setDisabled(true);
		Ext.getCmp('fault_list').setActiveItem(1);
}

function  Type(res){
	  console.log('--------------------你怎么进来的');
	  var arr1=res;
  	  var data1="[";
  	  data1+="{'value':'请选择','text':'请选择'},";
  	  for(var i=0;i<arr1.length;i++){
  	      if(i!=arr1.length-1){
  		    data1+="{'value':'"+arr1[i].CODE+"','text':'"+arr1[i].MS+"'},";
  	      }else{
  			data1+="{'value':'"+arr1[i].CODE+"','text':'"+arr1[i].MS+"'}";
  		  }
  	  }
  	  data1+="]";
  	  Ext.getCmp('SECOND_FAULT_SEQUENCE').setOptions(eval(data1));
}


var Arrive_staues=[{
    	text:'请选择',
    	value:''
    },
    {
    	text:'0不关门',
    	value:'0不关门'
    },   
    {
    	text:'1不开门',
    	value:'1不开门'
    },   
    {
    	text:'3门不能完全关闭',
    	value:'3门不能完全关闭'
    },
    {
    	text:'4重开门、重关门',
    	value:'4重开门、重关门'
    }, 
    {
    	text:'5门集合装置脱离',
    	value:'5门集合装置脱离'
    }, 
    {
    	text:'10运行中不正常停梯',
    	value:'10运行中不正常停梯'
    }, 
    {
    	text:'11冲顶、冲底',
    	value:'11冲顶、冲底'
    }, 
    {
    	text:'12开门时电梯可运行',
    	value:'12开门时电梯可运行'
    }, 
    {
    	text:'13群控功能失灵',
    	value:'13群控功能失灵'
    }, 
    {
    	text:'20平层不准确',
    	value:'20平层不准确'
    }, 
    {
    	text:'21开关门不畅顺',
    	value:'21开关门不畅顺'
    }, 
    {
    	text:'22电梯运行异响和振动',
    	value:'22电梯运行异响和振动'
    }, 
    {
    	text:'23灯不亮',
    	value:'23灯不亮'
    }, 
    {
    	text:'24部件破损、脱落',
    	value:'24部件破损、脱落'
    }, 
    {
    	text:'25不按召唤停梯往返运转',
    	value:'25不按召唤停梯往返运转'
    }, 
    {
    	text:'26速度不正常',
    	value:'26速度不正常'
    }, 
    {
    	text:'27按钮不正常',
    	value:'27按钮不正常'
    }, 
    {
    	text:'28烟雾、异味',
    	value:'28烟雾、异味'
    }, 
    {
    	text:'29电机过热烧坏',
    	value:'29电机过热烧坏'
    }, 
    {
    	text:'30开关误置',
    	value:'30开关误置'
    }, 
    {
    	text:'31其他',
    	value:'31其他'
    }
];

function comptimes(beginTime,endTime) {
    var beginTimes = beginTime.substring(0, 10).split('-');
    var endTimes = endTime.substring(0, 10).split('-');
    cc.log(beginTimes);
    cc.log(endTimes);
    cc.log(beginTime.substring(10, 19));
    cc.log(endTime.substring(10, 19));
    var beginTimes = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
    var endTimes = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
    var a = (Date.parse(endTimes) - Date.parse(beginTimes)) / 3600 / 1000;
    if (a < 0) {
        return a;
    } else if (a > 0) {
        return a;
    } else if (a == 0) {
        return a;
    } else {
        return 'exception';
    }
}