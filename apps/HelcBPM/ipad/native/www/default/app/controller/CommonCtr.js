
/* JavaScript content from app/controller/CommonCtr.js in folder common */
Ext.define('Ux.plugin.ListPaging', {
    extend : 'Ext.plugin.ListPaging',
    alias : 'plugin.ux-listpaging',

    loadNextPage : function(a,b,c,d) {
//    	console.log('mem',{'a':a,'b':b,'c':c,'d':d,});
//    	console.log(c.scope.id);
    	var hf_currPagel=Ext.getCmp('hf_currPagel').getValue();
		var nhf_currPagel=parseInt(hf_currPagel)+1;
		Ext.getCmp('hf_currPagel').setValue(nhf_currPagel);
		var Position_y = Ext.getCmp('list_INS_approval').getScrollable().getScroller().position.y;
		HelcBPM.app.getController('HelcBPM.controller.CommonCtr').Init_List(null,Position_y);
        //do stuff here, even fire an event if you need it
    }
});

Ext.define("HelcBPM.controller.CommonCtr", {
	extend:'HelcBPM.controller.ApplicationController',
	config : {
		control : {
			"button#btn_login":{
				tap:'btn_login'
			},
			"button#btn_quit":{
				tap:'btn_quit'
			},
			"button#loginButton_rest": {
				tap: 'btn_login'
			},
			"button#btn_INSlist_back":{
				tap:'btn_INSlist_back'
			},
			"list#list_INS_approval":{
				itemtap:'onList_INS_approvalTap',
//				initialize:'onList_INS_Init',
			},
			"list#list_INS_approved":{
				itemtap:'onList_INS_approvedTap',
//				initialize:'onList_INS_Init',
			},
			"list#list_INS_completed":{
				itemtap:'onList_INS_completedTap',
//				initialize:'onList_INS_Init',
			},
			"button#btn_INS_prepage_approval":{
				tap:'pageAticon'
			},
			"button#btn_INS_nextpage_approval":{
				tap:'pageAticon'
			},
			"button#btn_INS_nextpage_approved":{
				tap:'pageAticon'
			},
			"button#btn_INS_prepage_approved":{
				tap:'pageAticon'
			},
			"button#btn_INS_prepage_completed":{
				tap:'pageAticon'
			},
			"button#btn_INS_nextpage_completed":{
				tap:'pageAticon'
			},
			"searchfield#sf_INS_approval" : {
				keyup : 'Onsf_INS_approvalKeyup',
				clearicontap: 'Onsf_INS_approvalClearicontap'
			},
			"searchfield#sf_INS_approved" : {
				keyup : 'Onsf_INS_approvedKeyup',
				clearicontap: 'Onsf_INS_approvedClearicontap'
			},
			"searchfield#sf_INS_completed" : {
				keyup : 'Onsf_INS_completedKeyup',
				clearicontap: 'Onsf_INS_completedClearicontap'
			},
		}
	},
	
	onList_INS_Init:function(obj, eOpts){
//		console.log('onList_INS_approvalInit',obj);
		switch(obj.id){
			case 'list_INS_approval':
				obj.setPlugins([
					{
				       	autoSnapBack: false,
				        lastUpdatedText: '上次刷新:&nbsp;',
				        lastUpdatedDateFormat:"Y-m-d H:i",  
				        loadedText: '已刷新',
				        loadingText: '正在刷新...',
				        pullText: '下拉刷新...',
				        releaseText: '放开开始刷新...',
				        type: 'pullrefresh', //状态
				        listeners : {
				        	latestfetched : function() {
				        		HelcBPM.app.getController('HelcBPM.controller.CommonCtr').Init_List('1');
				        		Ext.getCmp('hf_currPagel').setValue('1');
				        		Ext.getCmp('ctn_showCurrPagel').setHtml('当前页数：1');
				        	},
				         },
				     },
				     {
				     	id: 'ppp',
				     	xclass: 'plugin.ux-listpaging',
        				autoPaging: false, 
				     	loadMoreText: '<div id="lm" style="margin:20px;">加载更多...</div>',
				     	noMoreRecordsText: '没有更多数据了...',
				     },
				]);
				break;
			case 'list_INS_approved':
				obj.setPlugins([
					{
				       	autoSnapBack: false,
				        lastUpdatedText: '上次刷新:&nbsp;',
				        lastUpdatedDateFormat:"Y-m-d H:i",  
				        loadedText: '已刷新',
				        loadingText: '正在刷新...',
				        pullText: '下拉刷新...',
				        releaseText: '放开开始刷新...',
				        type: 'pullrefresh', //状态
				        listeners : {
				        	latestfetched : function() {
				        		HelcBPM.app.getController('HelcBPM.controller.CommonCtr').Init_List_YB('1');
				        		Ext.getCmp('hf_currPaged').setValue('1');
				        		Ext.getCmp('ctn_showCurrPaged').setHtml('当前页数：1');
				        	},
				         },
				     },
				]);
				break;
			case 'list_INS_completed':
				obj.setPlugins([
					{
				       	autoSnapBack: false,
				        lastUpdatedText: '上次刷新:&nbsp;',
				        lastUpdatedDateFormat:"Y-m-d H:i",  
				        loadedText: '已刷新',
				        loadingText: '正在刷新...',
				        pullText: '下拉刷新...',
				        releaseText: '放开开始刷新...',
				        type: 'pullrefresh', //状态
				        listeners : {
				        	latestfetched : function() {
				        		HelcBPM.app.getController('HelcBPM.controller.CommonCtr').Init_List_YWC('1');
				        		Ext.getCmp('hf_currPagef').setValue('1');
				        		Ext.getCmp('ctn_showCurrPagef').setHtml('当前页数：1');
				        	},
				         },
				     },
				]);
				break;
			default:
				break;
		}
	},
	
	btn_quit : function(button,e,eOpts){
		Ext.Msg.show({
			title: '温馨提示',
			message: '是否退出系统？',
//			buttons: [{text:'取消', itemId:'no'},{text:'<font color="#FF0000">退出</font>', itemId:'yes'}],
			buttons: [{text:'取消', itemId:'no'},{text:'退出', itemId:'yes'}],
			fn: function(buttonId) {
				if(buttonId=='yes'){ 
					viewUtil.goLast();
					Ext.getCmp('userorg').setValue('');
					Ext.getCmp('username').setValue('');
					Ext.getCmp('userpwd').setValue('');
				}
			}
		});
	},

	btn_login : function(button,e,eOpts) {
//		this.BackView();
		var sleepTime = 100;
		if(Ext.os.is.Android){
			sleepTime = 300;
		}
		
		if(Ext.getCmp('username').isFocused){
			Ext.getCmp('username').blur();
		}
		if(Ext.getCmp('userpwd').isFocused){
			Ext.getCmp('userpwd').blur();
		}
		
		var v_username = Ext.getCmp('username').getValue();
		var v_userpwd = Ext.getCmp('userpwd').getValue();
		
		if (Ext.getCmp('password_rest') != null && Ext.getCmp('password_rest') != undefined && Ext.getCmp('hf_isRestLogin').getValue() == "1") {
			if (Ext.getCmp('password_rest').getValue() != null && Ext.getCmp('password_rest').getValue() != '') {
				password = Ext.getCmp('password_rest').getValue();
			}
			
			if (Ext.getCmp('password_rest').getValue() == "" || Ext.getCmp('password_rest').getValue() == null) {
				Ext.Msg.alert('温馨提示','请输入密码!'); 
				return;
			}
		}
		
		if(v_username==''){
			Ext.Msg.alert('温馨提示', '请输入用户名');
			return false;
		}
		
		if(v_userpwd==''){
			Ext.Msg.alert('温馨提示', '请输入密码');
			return false;
		}
		setTimeout(this.doLogin(v_username,v_userpwd),sleepTime);
	},
	
	doLogin : function(_username,_userpwd){
		var loginView = Ext.Viewport.getActiveItem();
		loginView.setDisabled(true);
		
		var getResult = function(res){
			console.log('login',res);
			if(res.result){
				//var respo = Ext.JSON.decode(resp);
				token=res.result.token;
				empNum=res.result.empInfo.empNum;
				var keys = [
	        	    {ckey:'username',cvalue:_username},
	        	    {ckey:'userpwd', cvalue:_userpwd}
			    ];
				cacheUtil.doWrite(keys);
				// 如果是从后台返回的重新登陆，则不需要跳转
				if (Ext.getCmp("hf_isRestLogin").getValue() == "0") {
					viewUtil.goNext('Main_List','HelcBPM.view.Main_List');
				}
				if(Ext.Viewport.getActiveItem().id == 'Main_List'){
    				HelcBPM.app.getController('CommonCtr').Init_List();
			    	HelcBPM.app.getController('CommonCtr').Init_List_YB();
			    	HelcBPM.app.getController('CommonCtr').Init_List_YWC();
    			}
    			if(reLoginOvlay){
    				reLoginOvlay.hide();
    			}
    			Ext.getCmp("hf_isRestLogin").setValue("0");
			}else{
				if(res.msg){
					Ext.toast(res.msg,2000);
				}else{
					Ext.toast('登录失败，请稍后重试！',2000);
				}
			}
			loginView.setDisabled(false);
		}

		var parameters = {
			adapter	:'HttpAdapter_BPM_AWH',
			procedure : 'login',
			isLoading : true,
			_UserName : _username,
			_UserPwd : _userpwd
		};
							
		MainCtr.getDataFromServer(getResult,parameters);
	},
	
	btn_INSlist_back:function(obj, e, opt){
//		viewUtil.goLast();
		Ext.Msg.show({
			title: '温馨提示',
			message: '是否退出系统？',
//			buttons: [{text:'取消', itemId:'no'},{text:'<font color="#FF0000">退出</font>', itemId:'yes'}],
			buttons: [{text:'取消', itemId:'no'},{text:'退出', itemId:'yes'}],
			fn: function(buttonId) {
				if(buttonId=='yes'){ 
					viewUtil.goLast();
					Ext.getCmp('username').setValue('');
					Ext.getCmp('userpwd').setValue('');
				}
			}
		});
	},
	
	//点击待审批列表
	onList_INS_approvalTap:function(obk, index, target, record, e, eOpts ){
		this.onList_INSTap('1', obk, index, target, record, e, eOpts );
	},
	
	//点击已审批列表
	onList_INS_approvedTap:function(obk, index, target, record, e, eOpts ){
		this.onList_INSTap('2', obk, index, target, record, e, eOpts );
	},
	
	//点击已完成列表
	onList_INS_completedTap:function(obk, index, target, record, e, eOpts ){
		this.onList_INSTap('3', obk, index, target, record, e, eOpts );
	},
	
	onList_INSTap:function(type, obk, index, target, record, e, eOpts ){
		console.log('record',record);
		var _docuid,_taskid,_appname;
		if(type == '1'){
			_docuid = record.data.documentId;
			_taskid = record.data.taskId;
			_appname = record.data.appName;
		}else{
			_docuid = record.data.DOCUMENT_ID;
			_taskid = record.data.TASK_ID;
			_appname = record.data.APP_NAME;
		}
		console.log('documentId',_docuid);
		console.log('taskId',_taskid);
		console.log('appName',_appname);
		var getResult = function(res){
			var resp = res.result;
			console.log('getDocumentByDocId',resp);
			if(res.code == 200){
				switch (_appname){
					case 'AZD01'://安装单
						viewUtil.goNext('INS_Approve','HelcBPM.view.install.INS_Approve');
//						var root = resp.data.root;
						var root = resp.data;
						
						if(type == '1'){//待审批页签进来时
							//取下一环节信息
							var getResult_1 = function(res){
								var resp_1 = res;
								console.log('getNextTacheInfo',resp_1);
								if(resp_1.code == 200){
									var nextdata = resp_1.result.nextActivityData[0];
									if(nextdata.activityName.indexOf('结束') == -1 && (nextdata.nextIdField == ''||nextdata.activityBpdId == ''||nextdata.nextNameField == '')){
										Ext.Msg.alert('温馨提示', '下一环节信息为空，将影响流程提交。<br>请联系管理员！');
										Ext.getCmp('btn_INSapprove_agree').setHidden( true );
										Ext.getCmp('btn_INSapprove_reservations').setHidden( true );
										Ext.getCmp('btn_INSapprove_reject').setHidden( true );
									}
									Ext.getCmp('h_nextOwners').setValue(nextdata.nextIdField);
									Ext.getCmp('h_nextNodes').setValue(nextdata.activityBpdId);
									Ext.getCmp('h_nextOwnerNames').setValue(nextdata.nextNameField);
									h_nextActivityData = resp_1.result.nextActivityData;
								}else{
									Ext.Msg.alert('温馨提示', '获取下一环节信息出错！（'+resp_1.msg+')');
									Ext.getCmp('btn_INSapprove_agree').setHidden( true );
									Ext.getCmp('btn_INSapprove_reservations').setHidden( true );
									Ext.getCmp('btn_INSapprove_reject').setHidden( true );
								}
							}
							
							var parameters_1 = {
								adapter		:'HttpAdapter_BPM_AWH',
								procedure	: 'getNextTacheInfo',
								isLoading	: true,
								_documentId	: root.__docuid,
								_taskId		: _taskid,
								_token		: token
							};
							
							MainCtr.getDataFromServer(getResult_1,parameters_1);
							//取下一环节信息
						}else{//已办、已结束页签进来时
							Ext.getCmp('Wt_pfz').setValue(root.Pfz);
							Ext.getCmp('Wt_zjje').setValue(root.ZjAmt);
		//					var tmp = root.PfAmtBhs?root.PfAmtBhs:root.PfAntBhs;
							Ext.getCmp('Wt_pfhtje').setValue(root.PfAmtBhs);
							Ext.getCmp('Wt_pfcbl').setValue(root.PfPercent);
							Ext.getCmp('Wt_pfz').setReadOnly( true );
							Ext.getCmp('Wt_note').setHidden( true );
							Ext.getCmp('btn_INSapprove_agree').setHidden( true );
							Ext.getCmp('btn_INSapprove_reservations').setHidden( true );
							Ext.getCmp('btn_INSapprove_reject').setHidden( true );
						}
						
						//获取审批历史
						var getResult_2 = function(res){
							console.log('getAuditRecordList',res);
							var resp_2 = res;
							if(resp_2.statusCode == 200){
								//审批历史
								var tbl_Note = document.getElementById('table_wthtnote');
								if(resp_2.array && resp_2.array.length > 0){
									for (var i = 0; i < resp_2.array.length; i ++) {
										tmprow = resp_2.array[i];
										NewRow = tbl_Note.insertRow(tbl_Note.rows.length);
										NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.taskName+'</td>';
										NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.actionUserName+'</td>';
										NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.resultType+'</td>';
		//								NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.Pfz+'</td>';
										NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.submitTime+'</td>';
										NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.note+'</td>';
									}
								}
							}else{
								Ext.toast('获取本次审批历史记录异常！',2000);
							}
						}
						
						var parameters_2 = {
							adapter		:'HttpAdapter_BPM_AWH',
							procedure	: 'getAuditRecordList',
							isLoading	: false,
							_documentId	: root.__docuid,
							_token		: token
						};
						
						MainCtr.getDataFromServer(getResult_2,parameters_2);
						//获取审批历史
						
						//隐藏字段
						if(root.SpzNew)Ext.getCmp('h_SpzNew').setValue(root.SpzNew);
						if(root.FgsSpMax)Ext.getCmp('h_FgsSpMax').setValue(root.FgsSpMax);
						if(root.BzSpMax)Ext.getCmp('h_BzSpMax').setValue(root.BzSpMax);
						if(root.ZjlSpMax)Ext.getCmp('h_ZjlSpMax').setValue(root.ZjlSpMax);
						if(root.FzcSpMax)Ext.getCmp('h_FzcSpMax').setValue(root.FzcSpMax);
						if(root.ZcSpMax)Ext.getCmp('h_ZcSpMax').setValue(root.ZcSpMax);
						//600环节新增的判断条件字段
						if(root.JumpBpdID)Ext.getCmp('h_JumpBpdID').setValue(root.JumpBpdID);
						if(root.JumpFlag)Ext.getCmp('h_JumpFlag').setValue(root.JumpFlag);
						if(root.JumpLevel)Ext.getCmp('h_JumpLevel').setValue(root.JumpLevel);
						if(root.JumpStepID)Ext.getCmp('h_JumpStepID').setValue(root.JumpStepID);
						//600环节新增的判断条件字段 ↑
						//历史审批层次批复值
						if(root.LsApproveLevelPfz)Ext.getCmp('h_LsApproveLevelPfz').setValue(root.LsApproveLevelPfz);
						if(root.Pfz)Ext.getCmp('h_Pfz').setValue(root.Pfz);
						Ext.getCmp('h_stepId').setValue(resp.stepId);
						Ext.getCmp('h_Se').setValue(root.Se);
						Ext.getCmp('h_docUid').setValue(root.__docuid);
						Ext.getCmp('h_appId').setValue(root.__appid);
						Ext.getCmp('h_taskId').setValue(_taskid);
						//新增----
						Ext.getCmp('h_SbKcFwfMan').setValue(root.SbKcFwfMan);
						var _controlled = Ext.getCmp('h_SbKcFwfMan').getValue().indexOf(empNum) > -1?false:true;
						Ext.getCmp('h_WthtID').setValue(root.WthtID);
						
						//工程合同总览--项目情况
						Ext.getCmp('GchtNo').setValue(root.GchtNo);
						Ext.getCmp('Yfs').setValue(root.Yfs);
						Ext.getCmp('HtNum').setValue(root.HtNum);
						Ext.getCmp('ClientName').setValue(root.ClientName);
						//新增--
						Ext.getCmp('QtcbPercent').setValue(root.QtcbPercent);
						Ext.getCmp('HeaderDkh').setValue(root.HeaderDkh);
						
						//工程合同签约情况
						Ext.getCmp('GchtAmt').setValue(root.GchtAmt);
//						Ext.getCmp('GchtBzAmt').setValue(root.GchtBzAmt);
						Ext.getCmp('GchtBzAmt').setValue('■■■■■■');
						Ext.getCmp('QyPercent').setValue(root.QyPercent);
						
						//工程合同委托情况
						var tmprow;
						var table_gcht = document.getElementById("table_gcht");
						var gcht_data;
		//				gcht_data = [
		//				{No:'1',Kx:'安装款',WtbhsAmt:'1,000,000.00',BgbhsAmt:'1,000,000.00',JsbhsAmt:'1,000,000.00',BzbhsAmt:'1,000,000.00',BzPercent:'1,000,000.00',JshsAmt:'1,000,000.00',ZqyhtPercent:'1,000,000.00'},
		//				{No:'2',Kx:'吊装款',WtbhsAmt:'100',BgbhsAmt:'100',JsbhsAmt:'100',BzbhsAmt:'100',BzPercent:'100',JshsAmt:'100',ZqyhtPercent:'100'},
		//				{No:'3',Kx:'搭棚款',WtbhsAmt:'100',BgbhsAmt:'100',JsbhsAmt:'100',BzbhsAmt:'100',BzPercent:'100',JshsAmt:'100',ZqyhtPercent:'100'},
		//				{No:'4',Kx:'工艺补贴',WtbhsAmt:'100',BgbhsAmt:'100',JsbhsAmt:'100',BzbhsAmt:'100',BzPercent:'100',JshsAmt:'100',ZqyhtPercent:'100'},
		//				{No:'5',Kx:'安吊搭工艺补贴小计',WtbhsAmt:'100',BgbhsAmt:'100',JsbhsAmt:'100',BzbhsAmt:'100',BzPercent:'100',JshsAmt:'100',ZqyhtPercent:'100'},
		//				{No:'6',Kx:'其他款项',WtbhsAmt:'100',BgbhsAmt:'100',JsbhsAmt:'100',BzbhsAmt:'100',BzPercent:'100',JshsAmt:'100',ZqyhtPercent:'100'},
		//				{No:'7',Kx:'总计',WtbhsAmt:'100',BgbhsAmt:'100',JsbhsAmt:'100',BzbhsAmt:'100',BzPercent:'100',JshsAmt:'100',ZqyhtPercent:'100'},
		//				]
						gcht_data = resp.daynamicTable.dtmx1;
						if(gcht_data && gcht_data.length > 0){
							for (var i = 0; i < gcht_data.length; i ++) {
								var NewRow = table_gcht.insertRow(table_gcht.rows.length);
								tmprow = gcht_data[i];
								if(tmprow.No < 5){
									NewRow.id = 'gcrow'+tmprow.No;
									NewRow.style.display = 'none';
								}
								if(tmprow.No == 5){
									NewRow.id = 'xjrow';
									NewRow.style.display = '';
									NewRow.insertCell(0).innerHTML = '<td><a onclick="hclick()" >&nbsp;＋&nbsp;</a></td>';
									NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one"><a href="#" onclick="hclick()" >'+tmprow.Kx+'</a></td>';
								}else{
									NewRow.insertCell(0).innerHTML = '<td></td>';
									NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.Kx+'</td>';
								}
								
								NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.WtbhsAmt+'</td>';
								NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.BgbhsAmt+'</td>';
								NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.JsbhsAmt+'</td>';
								NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.BzbhsAmt+'</td>';
								NewRow.insertCell(6).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.BzPercent+'</td>';
								NewRow.insertCell(7).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.JshsAmt+'</td>';
								NewRow.insertCell(8).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.ZqyhtPercent+'</td>';
								NewRow.insertCell(9).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.YgAzCbPercent?tmprow.YgAzCbPercent:''+'</td>';
							}
						}
						
						//委托合同总览--项目情况
						Ext.getCmp('WthtNo').setValue(root.WthtNo);
						Ext.getCmp('WtYfs').setValue(root.WtYfs);
						Ext.getCmp('WtGchtNo').setValue(root.WtGchtNo);
						Ext.getCmp('WthtType').setValue(root.WthtType);
						Ext.getCmp('WtClientName').setValue(root.WtClientName);
						Ext.getCmp('Gcfws').setValue(root.Gcfws);
						Ext.getCmp('WtspVersion').setValue(root.WtspVersion);
						
						Ext.getCmp('WtGchtAmt').setValue(root.WtGchtAmt);
//						Ext.getCmp('WtGchtBzAmt').setValue(root.WtGchtBzAmt);
						Ext.getCmp('WtGchtBzAmt').setValue('■■■■■■');
						Ext.getCmp('WtQyPercent').setValue(root.WtQyPercent);
						Ext.getCmp('LswtAmt').setValue(root.LswtAmt);
						Ext.getCmp('LswtBzAmt').setValue(root.LswtBzAmt);
						Ext.getCmp('LsQyPercent').setValue(root.LsQyPercent);
						
						var table_wtgcht = document.getElementById("table_wtgcht");
						var wtgcht_data;
		//				wtgcht_data = [
		//				{WtNo:'1',WtKx:'安装款',WtWtbhsAmt:'1,000,000.00',WtBgbhsAmt:'1,000,000.00',WtJsbhsAmt:'1,000,000.00',WtBzbhsAmt:'1,000,000.00',WtBzPercent:'1,000,000.00',WtJshsAmt:'1,000,000.00',WtZqyhtPercent:'1,000,000.00'},
		//				{WtNo:'2',WtKx:'吊装款',WtWtbhsAmt:'100',WtBgbhsAmt:'100',WtJsbhsAmt:'100',WtBzbhsAmt:'100',WtBzPercent:'100',WtJshsAmt:'100',WtZqyhtPercent:'100'},
		//				{WtNo:'3',WtKx:'搭棚款',WtWtbhsAmt:'100',WtBgbhsAmt:'100',WtJsbhsAmt:'100',WtBzbhsAmt:'100',WtBzPercent:'100',WtJshsAmt:'100',WtZqyhtPercent:'100'},
		//				{WtNo:'4',WtKx:'工艺补贴',WtWtbhsAmt:'100',WtBgbhsAmt:'100',WtJsbhsAmt:'100',WtBzbhsAmt:'100',WtBzPercent:'100',WtJshsAmt:'100',WtZqyhtPercent:'100'},
		//				{WtNo:'5',WtKx:'安吊搭工艺补贴小计',WtWtbhsAmt:'100',WtBgbhsAmt:'100',WtJsbhsAmt:'100',WtBzbhsAmt:'100',WtBzPercent:'100',WtJshsAmt:'100',WtZqyhtPercent:'100'},
		//				{WtNo:'6',WtKx:'其他款项',WtWtbhsAmt:'100',WtBgbhsAmt:'100',WtJsbhsAmt:'100',WtBzbhsAmt:'100',WtBzPercent:'100',WtJshsAmt:'100',WtZqyhtPercent:'100'},
		//				{WtNo:'7',WtKx:'总计',WtWtbhsAmt:'100',WtBgbhsAmt:'100',WtJsbhsAmt:'100',WtBzbhsAmt:'100',WtBzPercent:'100',WtJshsAmt:'100',WtZqyhtPercent:'100'},
		//				]
						wtgcht_data = resp.daynamicTable.dtmx2;
						if(wtgcht_data && wtgcht_data.length > 0){
							for (var i = 0; i < wtgcht_data.length; i ++) {
								tmprow = wtgcht_data[i];
								NewRow = table_wtgcht.insertRow(table_wtgcht.rows.length);
								if(tmprow.WtNo < 5){
									NewRow.id = 'wtgcrow'+tmprow.WtNo;
									NewRow.style.display = 'none';
								}
								if(tmprow.WtNo == 5){
									NewRow.id = 'wtxjrow';
									NewRow.style.display = '';
									NewRow.insertCell(0).innerHTML = '<td><a onclick="wthclick()" >&nbsp;＋&nbsp;</a></td>';
									NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one"><a href="#" onclick="wthclick()" >'+tmprow.WtKx+'</a></td>';
								}else{
									NewRow.insertCell(0).innerHTML = '<td></td>';
									NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.WtKx+'</td>';
								}
								NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.WtWtbhsAmt+'</td>';
								NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.WtBgbhsAmt+'</td>';
								NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.WtJsbhsAmt+'</td>';
								NewRow.insertCell(5).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.WtBzbhsAmt+'</td>';
								NewRow.insertCell(6).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.WtBzPercent+'</td>';
								if(tmprow.WtNo == 5){
									NewRow.cells[6].style.backgroundColor = '#FFC0CB';
								}
								NewRow.insertCell(7).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.WtJshsAmt+'</td>';
								NewRow.insertCell(8).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.WtZqyhtPercent+'</td>';
								NewRow.insertCell(9).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.LineYgAzCbPercent?tmprow.LineYgAzCbPercent:''+'</td>';
								if(tmprow.WtNo > 5){
									NewRow.cells[8].style.backgroundColor = '#FFC0CB';
									NewRow.cells[9].style.backgroundColor = '#FFC0CB';
								}
							}
						}
						
						if(root.LsTgSpWtAmt)Ext.getCmp('LsTgSpWtAmt').setValue(root.LsTgSpWtAmt);
						if(root.CurrentWtAmt)Ext.getCmp('CurrentWtAmt').setValue(root.CurrentWtAmt);
						//新增---
						if(root.CurrentWthtNum)Ext.getCmp('CurrentWthtNum').setValue(root.CurrentWthtNum);
						if(root.SbKcFwfXtPercent)Ext.getCmp('SbKcFwfXtPercent').setValue(_controlled?'■■■■■■':root.SbKcFwfXtPercent);
						if(root.PfYgCbPercent)Ext.getCmp('PfYgCbPercent').setValue(root.PfYgCbPercent);
						Ext.getCmp('Wt_spje').setValue(root.SpAmt);
						Ext.getCmp('Wt_spbzje').setValue(root.SpbzAmt);
						Ext.getCmp('Wt_spz').setValue(root.Spz);
						if(root.ZzSpcc)Ext.getCmp('ZzSpcc').setValue(root.ZzSpcc);
						if(type == '1' && Number(resp.stepId) < 700){//待审批页签进来时
							Ext.getCmp('Wt_pfz').setPlaceHolder('');
							Ext.getCmp('Wt_pfz').setReadOnly( true );
							Ext.getCmp('Wt_pfhtje').setValue(0);
							Ext.getCmp('Wt_zjje').setValue(0);
							Ext.getCmp('Wt_pfcbl').setValue(0);
						}
						
						//工号明细
						Ext.getCmp('list_ghmx').getStore().setData([]);
						if(resp.daynamicTable.dtmx3 && resp.daynamicTable.dtmx3.length > 0){
							var v_data = resp.daynamicTable.dtmx3;
							Ext.getCmp('list_ghmx').getStore().setData(v_data);
						}
						
						//其他款项明细
						Ext.getCmp('QtkxBhs').setValue(root.QtkxBhsAmt);
						Ext.getCmp('QtBzAmt').setValue(root.QtkxBzAmt);
						Ext.getCmp('JsPercent').setValue(root.QtkxPercent);
						Ext.getCmp('list_qtkx').getStore().setData([]);
						if(resp.daynamicTable.dtmx4 && resp.daynamicTable.dtmx4.length > 0){
							var v_data_1 = resp.daynamicTable.dtmx4;
							Ext.getCmp('list_qtkx').getStore().setData(v_data_1);
						}
						
						//审批历史
						var tbl_History = document.getElementById('tbl_History');
						if(resp.daynamicTable.dtmx5 && resp.daynamicTable.dtmx5.length > 0){
							for (var i = 0; i < resp.daynamicTable.dtmx5.length; i ++) {
								tmprow = resp.daynamicTable.dtmx5[i];
								NewRow = tbl_History.insertRow(tbl_History.rows.length);
								NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.wtversion+'</td>';
								NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spman+'</td>';
								NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spresult+'</td>';
								NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spdate+'</td>';
								NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spremark+'</td>';
							}
						}
						
						//附件列表
						var tbl_attachment = document.getElementById('table_attachment');
						if(resp.attachment && resp.attachment.length > 0){
							for (var i = 0; i < resp.attachment.length; i ++) {
								tmprow = resp.attachment[i];
								NewRow = tbl_attachment.insertRow(tbl_attachment.rows.length);
		//						NewRow.insertCell(0).innerHTML = '<a href="#" onclick="attclick(\''+tmprow.url+'\')" >'+tmprow.attachmentName+'</a>|<a href="#" onclick="attclick(\'/smartformsAPI/api/datDocument/download/eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDE4LTA2LTA1IiwiaWF0IjoxNTI4MTY4MjA0LCJzdWIiOiJ7XCJjcmVhdGVUaW1lXCI6MTUyMTE4NTk2NTM0NixcImVtcERlcHRcIjpcImRlcHRpZDpmNDY0ZTkzNy1iMTgwLTQ5ZmItYWM2NS0zYzY0ZGY1NWE4ODJcIixcImVtcE5hbWVcIjpcImh6eTAxNTAyXCIsXCJlbXBOdW1cIjpcImVtcGlkOmM0YjFjMjEwLTEzM2MtNDVkZS1hNzYyLWY4MGViZmE5MWI2MFwiLFwiZW1wVHlwZVwiOlwibGRhcFwiLFwiam9iTnVtYmVyXCI6XCIwMDAwMTUwMlwiLFwibGRhcE5hbWVcIjpcIm89b2F0ZXN0XCIsXCJsZGFwVWlkXCI6XCJoenkwMTUwMlwiLFwibmlja05hbWVcIjpcIum7hOW_l-mYsyAwMDAwMTUwMi9oZWxjXCIsXCJ1cGRhdGVUaW1lXCI6MTUyMTUxNzkwNDIyNn0iLCJpc3MiOiJzb2xhcnRlY2giLCJleHAiOjE1MjgyNDAyMDR9.wWwoDJapXHaIRBV326oK1NYOBBJEV4F8bHSIuzTdxwU/attachId:454bc47b-3ddd-496e-861b-af8f2421568a\')">test</a>';
		//						NewRow.insertCell(0).innerHTML = '<a href="#" onclick="attclick(\''+tmprow.url+'\')" >'+tmprow.attachmentName+'</a>';
//								NewRow.insertCell(0).innerHTML = '<a href="#" onclick="attclick(\'/smartformsAPI/api/datDocument/download/'+token+'/'+tmprow.attachmentId+'\')" >'+tmprow.attachmentName+'</a>';
								NewRow.insertCell(0).innerHTML = tmprow.attachmentName;
								NewRow.insertCell(1).innerHTML = parseFloat(tmprow.fileSize/1024/1024).toFixed(3)+'M';
								NewRow.insertCell(2).innerHTML = tmprow.createTime;
								NewRow.insertCell(3).innerHTML = tmprow.creatorName;
								NewRow.cells[0].className = 'tbl_nobr_value_height';
								NewRow.cells[1].className = 'tbl_nobr_value_height';
								NewRow.cells[2].className = 'tbl_nobr_value_height';
								NewRow.cells[3].className = 'tbl_nobr_value_height';
							}
						}else{
							NewRow = tbl_attachment.insertRow(tbl_attachment.rows.length);
							NewRow.insertCell(0).innerHTML = '没有附件';
							NewRow.cells[0].className = 'tbl_nobr_value_height';
							NewRow.cells[0].colSpan = '4';
							
						}
						break;
						
						
					case 'WBPJ01'://维保配件
						viewUtil.goNext('SparepartSell_Approve','HelcBPM.view.SparepartSell.SparepartSell_Approve');
//						var root = resp.data.root;
						var root = resp.data;

						if(type == '1'){//待审批页签进来时
							
						}else{//已办、已结束页签进来时
							Ext.getCmp('SPS_note').setHidden( true );
							Ext.getCmp('btn_SPSapprove_agree').setHidden( true );
							Ext.getCmp('btn_SPSapprove_reject').setHidden( true );
						}
						
						//获取审批历史
						var getResult_2 = function(res){
							console.log('getAuditRecordList',res);
							var resp_2 = res;
							if(resp_2.statusCode == 200){
								//审批历史
								var tbl_Note = document.getElementById('SparepartSell_Table_History');
								if(resp_2.array && resp_2.array.length > 0){
									for (var i = 0; i < resp_2.array.length; i ++) {
										tmprow = resp_2.array[i];
										NewRow = tbl_Note.insertRow(tbl_Note.rows.length);
										NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.taskName+'</td>';
										NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.actionUserName+'</td>';
										NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.resultType+'</td>';
										NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.submitTime+'</td>';
										NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.note+'</td>';
										NewRow.cells[4].className = 'tbl_nobr_value_one_left';
									}
								}
							}else{
								Ext.toast('获取本次审批历史记录异常！',2000);
							}
						}
						
						var parameters_2 = {
							adapter		:'HttpAdapter_BPM_AWH',
							procedure	: 'getAuditRecordList',
							isLoading	: false,
							_documentId	: root.__docuid,
							_token		: token
						};
						
						MainCtr.getDataFromServer(getResult_2,parameters_2);
						//获取审批历史
						
						//隐藏字段
						if(root.__docuid)Ext.getCmp('h_docUid').setValue(root.__docuid);
						if(root.__appid)Ext.getCmp('h_appId').setValue(root.__appid);
						if(_taskid)Ext.getCmp('h_taskId').setValue(_taskid);
						if(root.dataPanelMan)Ext.getCmp('h_dataPanelMan').setValue(root.dataPanelMan);
						var _controlled = Ext.getCmp('h_dataPanelMan').getValue().indexOf(empNum) > -1?false:true;
						
						console.log('h_dataPanelMan',Ext.getCmp('h_dataPanelMan').getValue());
						console.log('empNum',empNum);
						console.log('_controlled',_controlled);
						
						//报价信息总览--项目情况
						if(root.BjOrderNo)Ext.getCmp('BjOrderNo').setValue(root.BjOrderNo);
						if(root.BjClientName)Ext.getCmp('BjClientName').setValue(root.BjClientName);
						if(root.BjBjVersion)Ext.getCmp('BjBjVersion').setValue(root.BjBjVersion);
						if(root.BjWbClientName)Ext.getCmp('BjWbClientName').setValue(root.BjWbClientName);
						if(root.BjOrderName)Ext.getCmp('BjOrderName').setValue(root.BjOrderName);
						
						//报价信息总览--报价情况
						if(root.WlZhSplHj)Ext.getCmp('WlZhSplHj').setValue(changeDecimalBuZero(root.WlZhSplHj,2));
						if(root.WlQwJHj)Ext.getCmp('WlQwJHj').setValue(changeDecimalBuZero(root.WlQwJHj,2));
						if(root.OrderMoney)Ext.getCmp('OrderMoney').setValuechangeDecimalBuZero((root.OrderMoney,2));
						if(root.OrderCountMoney)Ext.getCmp('OrderCountMoney').setValue(changeDecimalBuZero(root.OrderCountMoney,2));
						if(root.BjSpFl)Ext.getCmp('BjSpFl').setValue(changeDecimalBuZero(root.BjSpFl,2));
						
						//配件报价明细
						Ext.getCmp('list_pjbjmx').getStore().setData([]);
						if(resp.daynamicTable.dtmx1 && resp.daynamicTable.dtmx1.length > 0){
							var v_data = resp.daynamicTable.dtmx1;
							var _data = [];
							for(var i = 0;i < resp.daynamicTable.dtmx1.length;i++){
								_data.push({
									DgWlQwj:resp.daynamicTable.dtmx1[i].DgWlQwj,
									DgwlQwjHs:resp.daynamicTable.dtmx1[i].DgwlQwjHs,
									DkhXyjHs:resp.daynamicTable.dtmx1[i].DkhXyjHs,
									DkhZkl:resp.daynamicTable.dtmx1[i].DkhZkl,
									Num:resp.daynamicTable.dtmx1[i].Num,
									SjHj:resp.daynamicTable.dtmx1[i].SjHj,
									Sp1:resp.daynamicTable.dtmx1[i].Sp1,
									Sp2:resp.daynamicTable.dtmx1[i].Sp2,
									SpJsFs:resp.daynamicTable.dtmx1[i].SpJsFs,
									Spl:resp.daynamicTable.dtmx1[i].Spl,
									SplZh:resp.daynamicTable.dtmx1[i].SplZh,
									WlCode:resp.daynamicTable.dtmx1[i].WlCode,
									WlName:resp.daynamicTable.dtmx1[i].WlName,
									WlQwjHj:resp.daynamicTable.dtmx1[i].WlQwjHj,
									WlhFl:resp.daynamicTable.dtmx1[i].WlhFl,
									WlqwjHjHs:resp.daynamicTable.dtmx1[i].WlqwjHjHs,
									GcBzCb:_controlled?'■■■■■■':resp.daynamicTable.dtmx1[i].GcBzCb,
									YjFgsCgCb:_controlled?'■■■■■■':resp.daynamicTable.dtmx1[i].YjFgsCgCb,
									YjXsLrl:_controlled?'■■■■■■':resp.daynamicTable.dtmx1[i].YjXsLrl
								});
							}
							Ext.getCmp('list_pjbjmx').getStore().setData(_data);
						}
						
						//审批信息--项目情况
						if(root.SpOrderNo)Ext.getCmp('SpOrderNo').setValue(root.SpOrderNo);
						if(root.SpClientName)Ext.getCmp('SpClientName').setValue(root.SpClientName);
						if(root.SpBjVersion)Ext.getCmp('SpBjVersion').setValue(root.SpBjVersion);
						if(root.SpWbClientName)Ext.getCmp('SpWbClientName').setValue(root.SpWbClientName);
						if(root.SpOrderName)Ext.getCmp('SpOrderName').setValue(root.SpOrderName);
						
						//审批信息--审批信息
						if(root.SpFl)Ext.getCmp('SpFl').setValue(root.SpFl);
						if(root.SpType)Ext.getCmp('SpType').setValue(root.SpType);
						if(root.XsLrlGs)Ext.getCmp('XsLrlGs').setValue(_controlled?'■■■■■■':root.XsLrlGs);
						
						//审批历史
						var tbl_History = document.getElementById('tbl_History');
						if(resp.daynamicTable.dtmx5 && resp.daynamicTable.dtmx5.length > 0){
							for (var i = 0; i < resp.daynamicTable.dtmx5.length; i ++) {
								tmprow = resp.daynamicTable.dtmx5[i];
								NewRow = tbl_History.insertRow(tbl_History.rows.length);
								NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.PjBjVersion+'</td>';
								NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spman+'</td>';
								NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spresult+'</td>';
								NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spdate+'</td>';
								NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spremark+'</td>';
							}
						}
						break;
						
						
					case 'WBWX01'://维护修理
						viewUtil.goNext('Maintain_Approve','HelcBPM.view.Maintain.Maintain_Approve');
//						var root = resp.data.root;
						var root = resp.data;

						if(type == '1'){//待审批页签进来时
							
						}else{//已办、已结束页签进来时
							Ext.getCmp('M_note').setHidden( true );
							Ext.getCmp('btn_Mapprove_agree').setHidden( true );
							Ext.getCmp('btn_Mapprove_reject').setHidden( true );
						}
						
						//获取审批历史
						var getResult_2 = function(res){
							console.log('getAuditRecordList',res);
							var resp_2 = res;
							if(resp_2.statusCode == 200){
								//审批历史
								var tbl_Note = document.getElementById('Maintain_Table_History');
								if(resp_2.array && resp_2.array.length > 0){
									for (var i = 0; i < resp_2.array.length; i ++) {
										tmprow = resp_2.array[i];
										NewRow = tbl_Note.insertRow(tbl_Note.rows.length);
										NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.taskName+'</td>';
										NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.actionUserName+'</td>';
										NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.resultType+'</td>';
										NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.submitTime+'</td>';
										NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.note+'</td>';
										NewRow.cells[4].className = 'tbl_nobr_value_one_left';
									}
								}
							}else{
								Ext.toast('获取本次审批历史记录异常！',2000);
							}
						}
						
						var parameters_2 = {
							adapter		:'HttpAdapter_BPM_AWH',
							procedure	: 'getAuditRecordList',
							isLoading	: false,
							_documentId	: root.__docuid,
							_token		: token
						};
						
						MainCtr.getDataFromServer(getResult_2,parameters_2);
						//获取审批历史
						
						//隐藏字段
						if(root.__docuid)Ext.getCmp('h_docUid').setValue(root.__docuid);
						if(root.__appid)Ext.getCmp('h_appId').setValue(root.__appid);
						if(_taskid)Ext.getCmp('h_taskId').setValue(_taskid);
						if(root.BjSjID)Ext.getCmp('h_BjSjID').setValue(root.BjSjID);
						if(root.dataPanelMan)Ext.getCmp('h_dataPanelMan').setValue(root.dataPanelMan);
						var _controlled = Ext.getCmp('h_dataPanelMan').getValue().indexOf(empNum) > -1?false:true;
						
						console.log('h_dataPanelMan',Ext.getCmp('h_dataPanelMan').getValue());
						console.log('empNum',empNum);
						console.log('_controlled',_controlled);
						
						//报价信息总览--项目情况
						if(root.BjSjNo)Ext.getCmp('BjSjNo').setValue(root.BjSjNo);
						if(root.BjClientName)Ext.getCmp('BjClientName').setValue(root.BjClientName);
						if(root.BjSjName)Ext.getCmp('BjSjName').setValue(root.BjSjName);
						if(root.HtType)Ext.getCmp('HtType').setValue(root.HtType);
						if(root.BjWbClientName)Ext.getCmp('BjWbClientName').setValue(root.BjWbClientName);
						if(root.DtNum)Ext.getCmp('DtNum').setValue(root.DtNum);
						if(root.BjVersion)Ext.getCmp('BjVersion').setValue(root.BjVersion);
						
						//报价信息总览--报价情况
						if(root.WlZhSplHj)Ext.getCmp('WlZhSplHj').setValue(changeDecimalBuZero(root.WlZhSplHj,2));
						if(root.WlQwJHj)Ext.getCmp('WlQwJHj').setValue(changeDecimalBuZero(root.WlQwJHj,2));
						if(root.ZxrgfHz)Ext.getCmp('ZxrgfHz').setValue(changeDecimalBuZero(root.ZxrgfHz,2));
						if(root.OrderMoney)Ext.getCmp('OrderMoney').setValue(_controlled?'■■■■■■':changeDecimalBuZero(root.OrderMoney,2));
						if(root.OrderCountNum)Ext.getCmp('OrderCountNum').setValue(_controlled?'■■■■■■':changeDecimalBuZero(root.OrderCountNum,2));
						if(root.OrderCountNumHs)Ext.getCmp('OrderCountNumHs').setValue(changeDecimalBuZero(root.OrderCountNumHs,2));
						if(root.BjSpFl)Ext.getCmp('BjSpFl').setValue(changeDecimalBuZero(root.BjSpFl,2));
						if(root.BjSpType)Ext.getCmp('BjSpType').setValue(changeDecimalBuZero(root.BjSpType,2));
						if(root.BjRemark)Ext.getCmp('BjRemark').setValue(root.BjRemark);
						
						//工号报价明细
						Ext.getCmp('list_M_ghbjmx').getStore().setData([]);
						if(resp.daynamicTable.dtmx1 && resp.daynamicTable.dtmx1.length > 0){
							var v_data = resp.daynamicTable.dtmx1;
							var _data = [];
							for(var i = 0;i < resp.daynamicTable.dtmx1.length;i++){
								_data.push({
									Gh:resp.daynamicTable.dtmx1[i].Gh,
									GhTzXh:resp.daynamicTable.dtmx1[i].GhTzXh,
									GhDtZt:resp.daynamicTable.dtmx1[i].GhDtZt,
									GhCpLb:resp.daynamicTable.dtmx1[i].GhCpLb,
									GhSplZh:resp.daynamicTable.dtmx1[i].GhSplZh,
									GhWlQwjHj:_controlled?'■■■■■■':resp.daynamicTable.dtmx1[i].GhWlQwjHj,
									GhWlSjHj:_controlled?'■■■■■■':resp.daynamicTable.dtmx1[i].GhWlSjHj,
									GhWlQwjHjHs:resp.daynamicTable.dtmx1[i].GhWlQwjHjHs,
									GhWlQwjFl:resp.daynamicTable.dtmx1[i].GhWlQwjFl,
									GhZxRgf:resp.daynamicTable.dtmx1[i].GhZxRgf,
									LineId:resp.daynamicTable.dtmx1[i].LineId,
//									SplZh:resp.daynamicTable.dtmx1[i].SplZh,
//									WlCode:resp.daynamicTable.dtmx1[i].WlCode,
//									WlName:resp.daynamicTable.dtmx1[i].WlName,
//									WlQwjHj:resp.daynamicTable.dtmx1[i].WlQwjHj,
//									WlhFl:resp.daynamicTable.dtmx1[i].WlhFl,
//									WlqwjHjHs:resp.daynamicTable.dtmx1[i].WlqwjHjHs,
//									GcBzCb:_controlled?'■■■■■■':resp.daynamicTable.dtmx1[i].GcBzCb,
//									YjFgsCgCb:_controlled?'■■■■■■':resp.daynamicTable.dtmx1[i].YjFgsCgCb,
//									YjXsLrl:_controlled?'■■■■■■':resp.daynamicTable.dtmx1[i].YjXsLrl
								});
							}
							Ext.getCmp('list_M_ghbjmx').getStore().setData(_data);
						}
						
						//审批信息--项目情况
						if(root.SpSjNo)Ext.getCmp('SpSjNo').setValue(root.SpSjNo);
						if(root.SpClientName)Ext.getCmp('SpClientName').setValue(root.SpClientName);
						if(root.SpSjName)Ext.getCmp('SpSjName').setValue(root.SpSjName);
						if(root.SpHtType)Ext.getCmp('SpHtType').setValue(root.SpHtType);
						if(root.SpWbClientName)Ext.getCmp('SpWbClientName').setValue(root.SpWbClientName);
						if(root.SpDtNum)Ext.getCmp('SpDtNum').setValue(root.SpDtNum);
						if(root.SpBjVersion)Ext.getCmp('SpBjVersion').setValue(root.SpBjVersion);
						if(root.SpBjRemark)Ext.getCmp('SpBjRemark').setValue(root.SpBjRemark);
						
						//审批信息--审批信息
						if(root.SpFl)Ext.getCmp('SpFl').setValue(root.SpFl);
						if(root.SpType)Ext.getCmp('SpType').setValue(root.SpType);
						if(root.XsLrlGs)Ext.getCmp('XsLrlGs').setValue(_controlled?'■■■■■■':root.XsLrlGs);
						
						//审批历史
						var tbl_History = document.getElementById('tbl_History');
						if(resp.daynamicTable.dtmx5 && resp.daynamicTable.dtmx5.length > 0){
							for (var i = 0; i < resp.daynamicTable.dtmx5.length; i ++) {
								tmprow = resp.daynamicTable.dtmx5[i];
								NewRow = tbl_History.insertRow(tbl_History.rows.length);
								NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.WhXlVersion+'</td>';
								NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spman+'</td>';
								NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spresult+'</td>';
								NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spdate+'</td>';
								NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spremark+'</td>';
							}
						}
						break;
						
						
					case 'WBWG01'://维修改造
						viewUtil.goNext('Remould_Approve','HelcBPM.view.Remould.Remould_Approve');
//						var root = resp.data.root;
						var root = resp.data;

						if(type == '1'){//待审批页签进来时
							
						}else{//已办、已结束页签进来时
							Ext.getCmp('R_note').setHidden( true );
							Ext.getCmp('btn_Rapprove_agree').setHidden( true );
							Ext.getCmp('btn_Rapprove_reject').setHidden( true );
						}
						
						//获取审批历史
						var getResult_2 = function(res){
							console.log('getAuditRecordList',res);
							var resp_2 = res;
							if(resp_2.statusCode == 200){
								//审批历史
								var tbl_Note = document.getElementById('Remould_Table_History');
								if(resp_2.array && resp_2.array.length > 0){
									for (var i = 0; i < resp_2.array.length; i ++) {
										tmprow = resp_2.array[i];
										NewRow = tbl_Note.insertRow(tbl_Note.rows.length);
										NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.taskName+'</td>';
										NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.actionUserName+'</td>';
										NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.resultType+'</td>';
										NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.submitTime+'</td>';
										NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.note+'</td>';
										NewRow.cells[4].className = 'tbl_nobr_value_one_left';
									}
								}
							}else{
								Ext.toast('获取本次审批历史记录异常！',2000);
							}
						}
						
						var parameters_2 = {
							adapter		:'HttpAdapter_BPM_AWH',
							procedure	: 'getAuditRecordList',
							isLoading	: false,
							_documentId	: root.__docuid,
							_token		: token
						};
						
						MainCtr.getDataFromServer(getResult_2,parameters_2);
						//获取审批历史
						
						//隐藏字段
						if(root.__docuid)Ext.getCmp('h_docUid').setValue(root.__docuid);
						if(root.__appid)Ext.getCmp('h_appId').setValue(root.__appid);
						if(_taskid)Ext.getCmp('h_taskId').setValue(_taskid);
						if(root.BjSjID)Ext.getCmp('h_BjSjID').setValue(root.BjSjID);
						if(root.dataPanelMan)Ext.getCmp('h_dataPanelMan').setValue(root.dataPanelMan);
						if(root.dataPanelMan2)Ext.getCmp('h_dataPanelMan2').setValue(root.dataPanelMan2);
						var _controlled = Ext.getCmp('h_dataPanelMan').getValue().indexOf(empNum) > -1?false:true;
						var _controlled2 = Ext.getCmp('h_dataPanelMan2').getValue().indexOf(empNum) > -1?false:true;
						
						console.log('h_dataPanelMan',Ext.getCmp('h_dataPanelMan').getValue());
						console.log('empNum',empNum);
						console.log('_controlled',_controlled);
						console.log('_controlled2',_controlled2);
						
						//报价信息总览--项目情况
						if(root.BjSjNo)Ext.getCmp('BjSjNo').setValue(root.BjSjNo);
						if(root.BjClientName)Ext.getCmp('BjClientName').setValue(root.BjClientName);
						if(root.BjSjName)Ext.getCmp('BjSjName').setValue(root.BjSjName);
						if(root.HtType)Ext.getCmp('HtType').setValue(root.HtType);
						if(root.ClientType)Ext.getCmp('ClientType').setValue(root.ClientType);
						if(root.DtNum)Ext.getCmp('DtNum').setValue(root.DtNum);
						if(root.BjVersion)Ext.getCmp('BjVersion').setValue(root.BjVersion);
						
						//报价信息总览--报价情况
						if(root.WlCbjHz)Ext.getCmp('WlCbjHz').setValue(_controlled2?'■■■■■■':changeDecimalBuZero(root.WlCbjHz,2));
						if(root.WlJsjHz)Ext.getCmp('WlJsjHz').setValue(_controlled?'■■■■■■':changeDecimalBuZero(root.WlJsjHz,2));
						if(root.HjQtfy)Ext.getCmp('HjQtfy').setValue(changeDecimalBuZero(root.HjQtfy,2));
						if(root.WlBzjHz)Ext.getCmp('WlBzjHz').setValue(changeDecimalBuZero(root.WlBzjHz,2));
						if(root.GfBzjHz)Ext.getCmp('GfBzjHz').setValue(changeDecimalBuZero(root.GfBzjHz,2));
						if(root.HjBzj)Ext.getCmp('HjBzj').setValue(changeDecimalBuZero(root.HjBzj,2));
						if(root.WlQwjHz)Ext.getCmp('WlQwjHz').setValue(changeDecimalBuZero(root.WlQwjHz,2));
						if(root.GfQwjHz)Ext.getCmp('GfQwjHz').setValue(changeDecimalBuZero(root.GfQwjHz,2));
						if(root.HjQwcjj)Ext.getCmp('HjQwcjj').setValue(changeDecimalBuZero(root.HjQwcjj,2));
						if(root.WljgFl)Ext.getCmp('WljgFl').setValue(changeDecimalBuZero(root.WljgFl,2));
						if(root.GfjgFl)Ext.getCmp('GfjgFl').setValue(changeDecimalBuZero(root.GfjgFl,2));
						if(root.XmFl)Ext.getCmp('XmFl').setValue(changeDecimalBuZero(root.XmFl,2));
						if(root.BjRemark)Ext.getCmp('BjRemark').setValue(root.BjRemark);
						
						//工号报价明细
						Ext.getCmp('list_R_ghbjmx').getStore().setData([]);
						if(resp.daynamicTable.dtmx1 && resp.daynamicTable.dtmx1.length > 0){
							var v_data = resp.daynamicTable.dtmx1;
							var _data = [];
							for(var i = 0;i < resp.daynamicTable.dtmx1.length;i++){
								_data.push({
									Gh:resp.daynamicTable.dtmx1[i].Gh,
									TzXh:resp.daynamicTable.dtmx1[i].TzXh,
									Czm:resp.daynamicTable.dtmx1[i].Czm,
									Tsgd:resp.daynamicTable.dtmx1[i].Tsgd,
									DtwlCbj:_controlled2?'■■■■■■':resp.daynamicTable.dtmx1[i].DtwlCbj,
									DtwlJsj:_controlled?'■■■■■■':resp.daynamicTable.dtmx1[i].DtwlJsj,
									DtwlBzj:resp.daynamicTable.dtmx1[i].DtwlBzj,
									DtwlQwj:resp.daynamicTable.dtmx1[i].DtwlQwj,
									DtwlJgFl:resp.daynamicTable.dtmx1[i].DtwlJgFl,
									GfBzj:resp.daynamicTable.dtmx1[i].GfBzj,
									GfQwj:resp.daynamicTable.dtmx1[i].GfQwj,
									QtfyZj:resp.daynamicTable.dtmx1[i].QtfyZj,
									DtdtBzj:resp.daynamicTable.dtmx1[i].DtdtBzj,
									QwjHj:resp.daynamicTable.dtmx1[i].QwjHj,
									LineId:resp.daynamicTable.dtmx1[i].LineId,
//									WlhFl:resp.daynamicTable.dtmx1[i].WlhFl,
//									WlqwjHjHs:resp.daynamicTable.dtmx1[i].WlqwjHjHs,
//									GcBzCb:_controlled?'■■■■■■':resp.daynamicTable.dtmx1[i].GcBzCb,
//									YjFgsCgCb:_controlled?'■■■■■■':resp.daynamicTable.dtmx1[i].YjFgsCgCb,
//									YjXsLrl:_controlled?'■■■■■■':resp.daynamicTable.dtmx1[i].YjXsLrl
								});
							}
							Ext.getCmp('list_R_ghbjmx').getStore().setData(_data);
						}
						
						//审批信息--项目情况
						if(root.SpSjNo)Ext.getCmp('SpSjNo').setValue(root.SpSjNo);
						if(root.SpClientName)Ext.getCmp('SpClientName').setValue(root.SpClientName);
						if(root.SpSjName)Ext.getCmp('SpSjName').setValue(root.SpSjName);
						if(root.SpClientType)Ext.getCmp('SpClientType').setValue(root.SpClientType);
						if(root.SpHtType)Ext.getCmp('SpHtType').setValue(root.SpHtType);
						if(root.SpDtNum)Ext.getCmp('SpDtNum').setValue(root.SpDtNum);
						if(root.SpBjVersion)Ext.getCmp('SpBjVersion').setValue(root.SpBjVersion);
						
						//审批信息--审批信息
						if(root.SpFl)Ext.getCmp('SpFl').setValue(root.SpFl);
						if(root.SpType)Ext.getCmp('SpType').setValue(root.SpType);
//						if(root.XsLrlGs)Ext.getCmp('XsLrlGs').setValue(_controlled?'■■■■■■':root.XsLrlGs);
						
						//审批历史
						var tbl_History = document.getElementById('tbl_History');
						if(resp.daynamicTable.dtmx5 && resp.daynamicTable.dtmx5.length > 0){
							for (var i = 0; i < resp.daynamicTable.dtmx5.length; i ++) {
								tmprow = resp.daynamicTable.dtmx5[i];
								NewRow = tbl_History.insertRow(tbl_History.rows.length);
								NewRow.insertCell(0).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.WxGzVersion+'</td>';
								NewRow.insertCell(1).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spman+'</td>';
								NewRow.insertCell(2).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spresult+'</td>';
								NewRow.insertCell(3).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spdate+'</td>';
								NewRow.insertCell(4).innerHTML = '<td class="tbl_nobr_value_one">'+tmprow.spremark+'</td>';
							}
						}
						break;
						
						
					default:
						Ext.toast('发生错误：没找到相关流程界面！');
						break;
				}
			}else if(res.code == -1){
				Ext.toast('已超时，请重新登录！',2000);
				viewUtil.go('login','HelcBPM.view.LoginView');
			}else{
				Ext.toast('发生错误：'+res.code,3000);
			}
		}

		var parameters = {
			adapter	:'HttpAdapter_BPM_AWH',
			procedure : 'getDocumentByDocId',
			isLoading : true,
			_docUid : _docuid,
			_taskId : _taskid,
			_token  : token
		};
							
		MainCtr.getDataFromServer(getResult,parameters);
		
		/*
		if (table_gcht.rows.length < 2){
			var NewRow = table_gcht.insertRow(table_gcht.rows.length);
			NewRow.innerHTML = '<td class="tbl_nobr_value_one" colspan="8">没有记录 ！</td>';
		}
		if (table_wtgcht.rows.length < 2){
			var NewRow = table_wtgcht.insertRow(table_wtgcht.rows.length);
			NewRow.innerHTML = '<td class="tbl_nobr_value_one" colspan="8">没有记录 ！</td>';
		}
		if (tbl_History.rows.length < 2){
			var NewRow = tbl_History.insertRow(tbl_History.rows.length);
			NewRow.innerHTML = '<td class="tbl_nobr_value_one" colspan="8">没有记录 ！</td>';
		}
		*/
	},
	
	pageAticon:function( bn, e, eOpts){
		var hf_currPagel=Ext.getCmp('hf_currPagel').getValue();
		var hf_currPaged=Ext.getCmp('hf_currPaged').getValue();
		var hf_currPagef=Ext.getCmp('hf_currPagef').getValue();
		var hf_currPagel_total=Ext.getCmp('hf_currPagel_total').getValue();
		var hf_currPaged_total=Ext.getCmp('hf_currPaged_total').getValue();
		var hf_currPagef_total=Ext.getCmp('hf_currPagef_total').getValue();
        switch (bn.id){
        
			case 'btn_INS_prepage_approval':    	 
				if(parseInt(hf_currPagel)==1){ 
					Ext.toast('已经是首页了',2000);	
					return;
				}else{
					var nhf_currPagel=parseInt(hf_currPagel)-1;
					Ext.getCmp('hf_currPagel').setValue(nhf_currPagel);
					Ext.getCmp('ctn_showCurrPagel').setHtml('当前页数：'+nhf_currPagel+'/'+parseInt(hf_currPagel_total));
				}
				this.Init_List();	
				break;
				
			case 'btn_INS_nextpage_approval':
				if(parseInt(hf_currPagel)==parseInt(hf_currPagel_total)){
					Ext.toast('已经是最后了',2000);	
					return;
				}else{
					var nhf_currPagel=parseInt(hf_currPagel)+1;
					Ext.getCmp('hf_currPagel').setValue(nhf_currPagel);
					Ext.getCmp('ctn_showCurrPagel').setHtml('当前页数：'+nhf_currPagel+'/'+parseInt(hf_currPagel_total));
				}
				this.Init_List();
				break;
				
			case 'btn_INS_prepage_approved':
				if(hf_currPaged=='1'){ 
					Ext.toast('已经是首页了',2000);	
				}else{
					var nhf_currPaged=parseInt(hf_currPaged)-1;
					Ext.getCmp('hf_currPaged').setValue(nhf_currPaged);
					Ext.getCmp('ctn_showCurrPaged').setHtml('当前页数：'+nhf_currPaged+'/'+parseInt(hf_currPaged_total));
				}
				this.Init_List_YB();	  
				break;
				
			case 'btn_INS_nextpage_approved':
				if(parseInt(hf_currPaged)==parseInt(hf_currPaged_total)){
					Ext.toast('已经是最后了',2000);	
					return;
				}else{
					var nhf_currPaged=parseInt(hf_currPaged)+1;
					Ext.getCmp('hf_currPaged').setValue(nhf_currPaged);
					Ext.getCmp('ctn_showCurrPaged').setHtml('当前页数：'+nhf_currPaged+'/'+parseInt(hf_currPaged_total));
				}
				this.Init_List_YB();	
				break;
				
			case 'btn_INS_prepage_completed':
				if(hf_currPagef=='1'){ 
					Ext.toast('已经是首页了',2000);
					return;
				}else{
					var nhf_currPagef=parseInt(hf_currPagef)-1;
					Ext.getCmp('hf_currPagef').setValue(nhf_currPagef);
					Ext.getCmp('ctn_showCurrPagef').setHtml('当前页数：'+nhf_currPagef+'/'+parseInt(hf_currPagef_total));
				}
				this.Init_List_YWC();	  
				break;
				
			case 'btn_INS_nextpage_completed':
				if(parseInt(hf_currPagef)==parseInt(hf_currPagef_total)){
					Ext.toast('已经是最后了',2000);	
					return;
				}else{
					var nhf_currPagef=parseInt(hf_currPagef)+1;
					Ext.getCmp('hf_currPagef').setValue(nhf_currPagef);
					Ext.getCmp('ctn_showCurrPagef').setHtml('当前页数：'+nhf_currPagef+'/'+parseInt(hf_currPagef_total));
				}
				this.Init_List_YWC();	
				break;
				
			default:
				Ext.toast('获取数据失败，请稍后重试！',2000);	
				return;
        }
	},
	
	Init_List:function(page,y){
		var getResult = function(res){
			var rej=res;
			console.log('Init_List|page:'+page+',y:'+y,rej);
			if(rej.isSuccessful){
				var _data = [];
				for(var i = 0;i < rej.result.rows.length;i++){
					_data.push({
						documentId:rej.result.rows[i].docData.__docuid,
						taskId:rej.result.rows[i].taskId,
						appName:rej.result.rows[i].docData.__wfcode,
						bpdName:rej.result.rows[i].docData.__bpdName?rej.result.rows[i].docData.__bpdName:rej.result.rows[i].bpdName,
						//安装分包
						WthtNo:rej.result.rows[i].docData.WthtNo,
						Yfs:rej.result.rows[i].docData.Yfs,
						GchtNo:rej.result.rows[i].docData.GchtNo,
						WthtType:rej.result.rows[i].docData.WthtType,
						WtClientName:rej.result.rows[i].docData.WtClientName,
						Gcfws:rej.result.rows[i].docData.Gcfws,
						Spz:rej.result.rows[i].docData.Spz+'',
						WtspVersion:rej.result.rows[i].docData.WtspVersion+'',
						//配件销售
						bmname:rej.result.rows[i].docData.bmname,
						BjClientName:rej.result.rows[i].docData.BjClientName,
						BjOrderNo:rej.result.rows[i].docData.BjOrderNo,
						BjWbClientName:rej.result.rows[i].docData.BjWbClientName,
						BjOrderName:rej.result.rows[i].docData.BjOrderName,
						BjSpFl:rej.result.rows[i].docData.BjSpFl+'',
						BjBjVersion:rej.result.rows[i].docData.BjBjVersion+'',
						//维护修理
						BjSjNo:rej.result.rows[i].docData.BjSjNo,
						BjSjName:rej.result.rows[i].docData.BjSjName,
						HtType:rej.result.rows[i].docData.HtType,
						BjVersion:rej.result.rows[i].docData.BjVersion+'',
						//维修改造
						ClientType:rej.result.rows[i].docData.ClientType,
						SpFl:rej.result.rows[i].docData.SpFl+'',
					});
				}
				
				var hf_currPagel_total='';
	        	if(parseInt(rej.result.total)%10==0 && parseInt(rej.result.total) != 0){
            		hf_currPagel_total=parseInt(rej.result.total)/10;	
	        	}else{
	        		hf_currPagel_total=parseInt(rej.result.total)/10+1;	
	        	}
	        	Ext.getCmp('hf_currPagel_total').setValue(hf_currPagel_total);
	        	Ext.getCmp('ctn_showCurrPagel').setHtml('当前页数：'+Ext.getCmp('hf_currPagel').getValue()+'/'+parseInt(hf_currPagel_total));
//	        	Ext.getCmp('ctn_showCurrPagel').setValue('当前页数：'+Ext.getCmp('hf_currPagel').getValue()+'/'+parseInt(hf_currPagel_total));
				
	        	Ext.getCmp('list_INS_approval').getStore().setData(_data);
	        	/*	列表“加载更多。。。”时使用
				if(y != null){
					Ext.getCmp('list_INS_approval').getStore().addData(_data);
					Ext.getCmp('list_INS_approval').getScrollable().getScroller().scrollTo(0,y);
					if(Number(Ext.getCmp('hf_currPagel').getValue()) >= parseInt(hf_currPagel_total)){
						document.getElementById('lm').style.display = 'none';
					}
				}else{
					Ext.getCmp('list_INS_approval').getStore().setData(_data);
					document.getElementById('lm').style.display = '';
				}
				*/
			}else{
				Ext.toast('获取数据失败，请稍后重试！',2000);	
			}
		}
		var parameters = {
			adapter	:'HttpAdapter_BPM_AWH',
			procedure : 'todoList',
			isLoading : true,
			_rows : '10',
            _page : page==null?Ext.getCmp('hf_currPagel').getValue():page,
            _token:token,
            _responseValue:'',
		};
		//代办					
		MainCtr.getDataFromServer(getResult,parameters);
		
	},
	
	Init_List_YB:function(page){
		var getResult1 = function(res){
			var rej=res;
			console.log('Init_List_YB',rej);
			if(rej.isSuccessful){
				var _data = [];
				for(var i = 0;i < rej.result.rows.length;i++){
					_data.push({
						DOCUMENT_ID:rej.result.rows[i].DOCUMENT_ID,
						TASK_ID:rej.result.rows[i].TASK_ID,
						APP_NAME:rej.result.rows[i].DOC_DATA.__wfcode,
						BPD_NAME:rej.result.rows[i].DOC_DATA.__bpdName,
						//安装分包
						WTHTNO:rej.result.rows[i].DOC_DATA.WthtNo,
						YFS:rej.result.rows[i].DOC_DATA.Yfs,
						WTGCHTNO:rej.result.rows[i].DOC_DATA.WtGchtNo,
						WTHTTYPE:rej.result.rows[i].DOC_DATA.WthtType,
						WTCLIENTNAME:rej.result.rows[i].DOC_DATA.WtClientName,
						GCFWS:rej.result.rows[i].DOC_DATA.Gcfws,
						SPZ:rej.result.rows[i].DOC_DATA.Spz+'',
						WTSPVERSION:rej.result.rows[i].DOC_DATA.WtspVersion+'',
						//配件销售
						bmname:rej.result.rows[i].DOC_DATA.bmname,
						BjClientName:rej.result.rows[i].DOC_DATA.BjClientName,
						BjOrderNo:rej.result.rows[i].DOC_DATA.BjOrderNo,
						BjWbClientName:rej.result.rows[i].DOC_DATA.BjWbClientName,
						BjOrderName:rej.result.rows[i].DOC_DATA.BjOrderName,
						BjSpFl:rej.result.rows[i].DOC_DATA.BjSpFl+'',
						BjBjVersion:rej.result.rows[i].DOC_DATA.BjBjVersion+'',
						//维护修理
						BjSjNo:rej.result.rows[i].DOC_DATA.BjSjNo,
						BjSjName:rej.result.rows[i].DOC_DATA.BjSjName,
						HtType:rej.result.rows[i].DOC_DATA.HtType,
						BjVersion:rej.result.rows[i].DOC_DATA.BjVersion+'',
						//维修改造
						ClientType:rej.result.rows[i].DOC_DATA.ClientType,
						SpFl:rej.result.rows[i].DOC_DATA.SpFl+'',
					});
				}
//				Ext.getCmp('list_INS_approved').getStore().setData(rej.result.rows);
				Ext.getCmp('list_INS_approved').getStore().setData(_data);
			    var hf_currPaged_total='';
		        if(parseInt(rej.result.total)%10==0 && parseInt(rej.result.total) != 0){
	            	hf_currPaged_total=parseInt(rej.result.total)/10;	
		        }else{
		        	hf_currPaged_total=parseInt(rej.result.total)/10+1;	
		        }
			    Ext.getCmp('hf_currPaged_total').setValue(hf_currPaged_total);
			    Ext.getCmp('ctn_showCurrPaged').setHtml('当前页数：'+Ext.getCmp('hf_currPaged').getValue()+'/'+parseInt(hf_currPaged_total));
			}else{
				Ext.toast('获取数据失败，请稍后重试！',2000);	
			}
		}
		var parameters1 = {
			adapter	:'HttpAdapter_BPM_AWH',
			procedure : 'alreadyDealtList',
			isLoading : true,
			_rows : '10',
            _page : page==null?Ext.getCmp('hf_currPaged').getValue():page,
            _token:token,
            _type:'1'
		};
		
		//已办
		MainCtr.getDataFromServer(getResult1,parameters1);
		
	},
	
	Init_List_YWC:function(page){
		var getResult2 = function(res){
			var rej=res;
			if(rej.isSuccessful){
		    	console.log('Init_List_YWC',rej);
		    	var _data = [];
				for(var i = 0;i < rej.result.rows.length;i++){
					_data.push({
						DOCUMENT_ID:rej.result.rows[i].DOCUMENT_ID,
						TASK_ID:rej.result.rows[i].TASK_ID,
						APP_NAME:rej.result.rows[i].APP_NAME,
						BPD_NAME:rej.result.rows[i].BPD_NAME,
						//安装分包
						WTHTNO:rej.result.rows[i].DOC_DATA.WthtNo,
						YFS:rej.result.rows[i].DOC_DATA.Yfs,
						WTGCHTNO:rej.result.rows[i].DOC_DATA.WtGchtNo,
						WTHTTYPE:rej.result.rows[i].DOC_DATA.WthtType,
						WTCLIENTNAME:rej.result.rows[i].DOC_DATA.WtClientName,
						GCFWS:rej.result.rows[i].DOC_DATA.Gcfws,
						SPZ:rej.result.rows[i].DOC_DATA.Spz+'',
						WTSPVERSION:rej.result.rows[i].DOC_DATA.WtspVersion+'',
						//配件销售
						bmname:rej.result.rows[i].DOC_DATA.bmname,
						BjClientName:rej.result.rows[i].DOC_DATA.BjClientName,
						BjOrderNo:rej.result.rows[i].DOC_DATA.BjOrderNo,
						BjWbClientName:rej.result.rows[i].DOC_DATA.BjWbClientName,
						BjOrderName:rej.result.rows[i].DOC_DATA.BjOrderName,
						BjSpFl:rej.result.rows[i].DOC_DATA.BjSpFl+'',
						BjBjVersion:rej.result.rows[i].DOC_DATA.BjBjVersion+'',
						//维护修理
						BjSjNo:rej.result.rows[i].DOC_DATA.BjSjNo,
						BjSjName:rej.result.rows[i].DOC_DATA.BjSjName,
						HtType:rej.result.rows[i].DOC_DATA.HtType,
						BjVersion:rej.result.rows[i].DOC_DATA.BjVersion+'',
						//维修改造
						ClientType:rej.result.rows[i].DOC_DATA.ClientType,
						SpFl:rej.result.rows[i].DOC_DATA.SpFl+'',
					});
				}
//		    	Ext.getCmp('list_INS_completed').getStore().setData(rej.result.rows);
				Ext.getCmp('list_INS_completed').getStore().setData(_data);
		    	var hf_currPagef_total='';
	        	if(parseInt(rej.result.total)%10==0 && parseInt(rej.result.total) != 0){
            		hf_currPagef_total=parseInt(rej.result.total)/10;	
	        	}else{
	        		hf_currPagef_total=parseInt(rej.result.total)/10+1;	
	        	}
		    	Ext.getCmp('hf_currPagef_total').setValue(hf_currPagef_total);
		    	Ext.getCmp('ctn_showCurrPagef').setHtml('当前页数：'+Ext.getCmp('hf_currPagef').getValue()+'/'+parseInt(hf_currPagef_total));
			}else{
				Ext.toast('获取数据失败，请稍后重试！',2000);
			}
		}
		var parameters2 = {
			adapter	:'HttpAdapter_BPM_AWH',
			procedure : 'alreadyDealtList',
			isLoading : true,
			_rows : '10',
            _page : page==null?Ext.getCmp('hf_currPagef').getValue():page,
            _token:token,
            _type:'2'
		};				
		//完成
		MainCtr.getDataFromServer(getResult2,parameters2);	
	},
	
	Onsf_INS_completedClearicontap: function (obj, e, eOpts) {
		Ext.getCmp('list_INS_completed').getStore().clearFilter();
	},
	
	Onsf_INS_completedKeyup: function (obj, e, eOpts) {
		var value = obj.getValue();
		store = Ext.getCmp('list_INS_completed').getStore();
		store.clearFilter();
		if (value) {
			var searches = value.split(' '), regexps = [], i;
			for (i = 0; i < searches.length; i++) {
				if (!searches[i])
					continue;
				regexps.push(new RegExp(searches[i], 'i'));
			}

			store.filter(function(record) {
				var matched = [];
				for (i = 0; i < regexps.length; i++) {
					var search = regexps[i];
					if(record.get('BPD_NAME') && record.get('BPD_NAME').match(search)){
						matched.push(record.get('BPD_NAME').match(search));
						break;
					}
					//安装分包
					if(record.get('WTHTNO') && record.get('WTHTNO').match(search)){
						matched.push(record.get('WTHTNO').match(search));
						break;
					}
					if(record.get('YFS') && record.get('YFS').match(search)){
						matched.push(record.get('YFS').match(search));
						break;
					}
					if(record.get('WTGCHTNO') && record.get('WTGCHTNO').match(search)){
						matched.push(record.get('WTGCHTNO').match(search));
						break;
					}
					if(record.get('WTHTTYPE') && record.get('WTHTTYPE').match(search)){
						matched.push(record.get('WTHTTYPE').match(search));
						break;
					}
					if(record.get('WTCLIENTNAME') && record.get('WTCLIENTNAME').match(search)){
						matched.push(record.get('WTCLIENTNAME').match(search));
						break;
					}
					if(record.get('GCFWS') && record.get('GCFWS').match(search)){
						matched.push(record.get('GCFWS').match(search));
						break;
					}
					if(record.get('SPZ') && record.get('SPZ').match(search)){
						matched.push(record.get('SPZ').match(search));
						break;
					}
					if(record.get('WTSPVERSION') && record.get('WTSPVERSION').match(search)){
						matched.push(record.get('WTSPVERSION').match(search));
						break;
					}
					//配件销售
					if(record.get('bmname') && record.get('bmname').match(search)){
						matched.push(record.get('bmname').match(search));
						break;
					}
					if(record.get('BjClientName') && record.get('BjClientName').match(search)){
						matched.push(record.get('BjClientName').match(search));
						break;
					}
					if(record.get('BjOrderNo') && record.get('BjOrderNo').match(search)){
						matched.push(record.get('BjOrderNo').match(search));
						break;
					}
					if(record.get('BjWbClientName') && record.get('BjWbClientName').match(search)){
						matched.push(record.get('BjWbClientName').match(search));
						break;
					}
					if(record.get('BjOrderName') && record.get('BjOrderName').match(search)){
						matched.push(record.get('BjOrderName').match(search));
						break;
					}
					if(record.get('BjSpFl') && record.get('BjSpFl').match(search)){
						matched.push(record.get('BjSpFl').match(search));
						break;
					}
					if(record.get('BjBjVersion') && record.get('BjBjVersion').match(search)){
						matched.push(record.get('BjBjVersion').match(search));
						break;
					}
					//维护修理
					if(record.get('BjSjNo') && record.get('BjSjNo').match(search)){
						matched.push(record.get('BjSjNo').match(search));
						break;
					}
					if(record.get('BjSjName') && record.get('BjSjName').match(search)){
						matched.push(record.get('BjSjName').match(search));
						break;
					}
					if(record.get('HtType') && record.get('HtType').match(search)){
						matched.push(record.get('HtType').match(search));
						break;
					}
					if(record.get('BjVersion') && record.get('BjVersion').match(search)){
						matched.push(record.get('BjVersion').match(search));
						break;
					}
					//维修改造
					if(record.get('ClientType') && record.get('ClientType').match(search)){
						matched.push(record.get('ClientType').match(search));
						break;
					}
					if(record.get('SpFl') && record.get('SpFl').match(search)){
						matched.push(record.get('SpFl').match(search));
						break;
					}
				}
				if (regexps.length > 1 && matched.indexOf(false) != -1) {
					return false;
				} else {
					return matched[0];
				}
			});
		}
	},
	
	Onsf_INS_approvedClearicontap: function (obj, e, eOpts) {
		Ext.getCmp('list_INS_approved').getStore().clearFilter();
	},
	
	Onsf_INS_approvedKeyup: function (obj, e, eOpts) {
		var value = obj.getValue();
		store = Ext.getCmp('list_INS_approved').getStore();
		store.clearFilter();
		if (value) {
			var searches = value.split(' '), regexps = [], i;
			for (i = 0; i < searches.length; i++) {
				if (!searches[i])
					continue;
				regexps.push(new RegExp(searches[i], 'i'));
			}

			store.filter(function(record) {
				var matched = [];
				for (i = 0; i < regexps.length; i++) {
					var search = regexps[i];
					if(record.get('BPD_NAME') && record.get('BPD_NAME').match(search)){
						matched.push(record.get('BPD_NAME').match(search));
						break;
					}
					//安装分包
					if(record.get('WTHTNO') && record.get('WTHTNO').match(search)){
						matched.push(record.get('WTHTNO').match(search));
						break;
					}
					if(record.get('YFS') && record.get('YFS').match(search)){
						matched.push(record.get('YFS').match(search));
						break;
					}
					if(record.get('WTGCHTNO') && record.get('WTGCHTNO').match(search)){
						matched.push(record.get('WTGCHTNO').match(search));
						break;
					}
					if(record.get('WTHTTYPE') && record.get('WTHTTYPE').match(search)){
						matched.push(record.get('WTHTTYPE').match(search));
						break;
					}
					if(record.get('WTCLIENTNAME') && record.get('WTCLIENTNAME').match(search)){
						matched.push(record.get('WTCLIENTNAME').match(search));
						break;
					}
					if(record.get('GCFWS') && record.get('GCFWS').match(search)){
						matched.push(record.get('GCFWS').match(search));
						break;
					}
					if(record.get('SPZ') && record.get('SPZ').match(search)){
						matched.push(record.get('SPZ').match(search));
						break;
					}
					if(record.get('WTSPVERSION') && record.get('WTSPVERSION').match(search)){
						matched.push(record.get('WTSPVERSION').match(search));
						break;
					}
					//配件销售
					if(record.get('bmname') && record.get('bmname').match(search)){
						matched.push(record.get('bmname').match(search));
						break;
					}
					if(record.get('BjClientName') && record.get('BjClientName').match(search)){
						matched.push(record.get('BjClientName').match(search));
						break;
					}
					if(record.get('BjOrderNo') && record.get('BjOrderNo').match(search)){
						matched.push(record.get('BjOrderNo').match(search));
						break;
					}
					if(record.get('BjWbClientName') && record.get('BjWbClientName').match(search)){
						matched.push(record.get('BjWbClientName').match(search));
						break;
					}
					if(record.get('BjOrderName') && record.get('BjOrderName').match(search)){
						matched.push(record.get('BjOrderName').match(search));
						break;
					}
					if(record.get('BjSpFl') && record.get('BjSpFl').match(search)){
						matched.push(record.get('BjSpFl').match(search));
						break;
					}
					if(record.get('BjBjVersion') && record.get('BjBjVersion').match(search)){
						matched.push(record.get('BjBjVersion').match(search));
						break;
					}
					//维护修理
					if(record.get('BjSjNo') && record.get('BjSjNo').match(search)){
						matched.push(record.get('BjSjNo').match(search));
						break;
					}
					if(record.get('BjSjName') && record.get('BjSjName').match(search)){
						matched.push(record.get('BjSjName').match(search));
						break;
					}
					if(record.get('HtType') && record.get('HtType').match(search)){
						matched.push(record.get('HtType').match(search));
						break;
					}
					if(record.get('BjVersion') && record.get('BjVersion').match(search)){
						matched.push(record.get('BjVersion').match(search));
						break;
					}
					//维修改造
					if(record.get('ClientType') && record.get('ClientType').match(search)){
						matched.push(record.get('ClientType').match(search));
						break;
					}
					if(record.get('SpFl') && record.get('SpFl').match(search)){
						matched.push(record.get('SpFl').match(search));
						break;
					}
				}
				if (regexps.length > 1 && matched.indexOf(false) != -1) {
					return false;
				} else {
					return matched[0];
				}
			});
		}
	},
	
	Onsf_INS_approvalClearicontap: function (obj, e, eOpts) {
		Ext.getCmp('list_INS_approval').getStore().clearFilter();
	},
	
	Onsf_INS_approvalKeyup: function (obj, e, eOpts) {
		var value = obj.getValue();
		store = Ext.getCmp('list_INS_approval').getStore();
		store.clearFilter();
		if (value) {
			var searches = value.split(' '), regexps = [], i;
			for (i = 0; i < searches.length; i++) {
				if (!searches[i])
					continue;
				regexps.push(new RegExp(searches[i], 'i'));
			}

			store.filter(function(record) {
				var matched = [];
				for (i = 0; i < regexps.length; i++) {
					var search = regexps[i];
					if(record.get('bpdName') && record.get('bpdName').match(search)){
						matched.push(record.get('bpdName').match(search));
						break;
					}
					//安装分包
					if(record.get('WthtNo') && record.get('WthtNo').match(search)){
						matched.push(record.get('WthtNo').match(search));
						break;
					}
					if(record.get('Yfs') && record.get('Yfs').match(search)){
						matched.push(record.get('Yfs').match(search));
						break;
					}
					if(record.get('GchtNo') && record.get('GchtNo').match(search)){
						matched.push(record.get('GchtNo').match(search));
						break;
					}
					if(record.get('WthtType') && record.get('WthtType').match(search)){
						matched.push(record.get('WthtType').match(search));
						break;
					}
					if(record.get('WtClientName') && record.get('WtClientName').match(search)){
						matched.push(record.get('WtClientName').match(search));
						break;
					}
					if(record.get('Gcfws') && record.get('Gcfws').match(search)){
						matched.push(record.get('Gcfws').match(search));
						break;
					}
					if(record.get('Spz') && record.get('Spz').match(search)){
						matched.push(record.get('Spz').match(search));
						break;
					}
					if(record.get('WtspVersion') && record.get('WtspVersion').match(search)){
						matched.push(record.get('WtspVersion').match(search));
						break;
					}
					//配件销售
					if(record.get('bmname') && record.get('bmname').match(search)){
						matched.push(record.get('bmname').match(search));
						break;
					}
					if(record.get('BjClientName') && record.get('BjClientName').match(search)){
						matched.push(record.get('BjClientName').match(search));
						break;
					}
					if(record.get('BjOrderNo') && record.get('BjOrderNo').match(search)){
						matched.push(record.get('BjOrderNo').match(search));
						break;
					}
					if(record.get('BjWbClientName') && record.get('BjWbClientName').match(search)){
						matched.push(record.get('BjWbClientName').match(search));
						break;
					}
					if(record.get('BjOrderName') && record.get('BjOrderName').match(search)){
						matched.push(record.get('BjOrderName').match(search));
						break;
					}
					if(record.get('BjSpFl') && record.get('BjSpFl').match(search)){
						matched.push(record.get('BjSpFl').match(search));
						break;
					}
					if(record.get('BjBjVersion') && record.get('BjBjVersion').match(search)){
						matched.push(record.get('BjBjVersion').match(search));
						break;
					}
					//维护修理
					if(record.get('BjSjNo') && record.get('BjSjNo').match(search)){
						matched.push(record.get('BjSjNo').match(search));
						break;
					}
					if(record.get('BjSjName') && record.get('BjSjName').match(search)){
						matched.push(record.get('BjSjName').match(search));
						break;
					}
					if(record.get('HtType') && record.get('HtType').match(search)){
						matched.push(record.get('HtType').match(search));
						break;
					}
					if(record.get('BjVersion') && record.get('BjVersion').match(search)){
						matched.push(record.get('BjVersion').match(search));
						break;
					}
					//维修改造
					if(record.get('ClientType') && record.get('ClientType').match(search)){
						matched.push(record.get('ClientType').match(search));
						break;
					}
					if(record.get('SpFl') && record.get('SpFl').match(search)){
						matched.push(record.get('SpFl').match(search));
						break;
					}
				}
				if (regexps.length > 1 && matched.indexOf(false) != -1) {
					return false;
				} else {
					return matched[0];
				}
			});
		}
	},
});

function changeDecimalBuZero(number, bitNum) {
    /// <summary>
    /// 小数位不够，用0补足位数
    /// </summary>
    /// <param name="number">要处理的数字</param>
    /// <param name="bitNum">生成的小数位数</param>
    var f_x = parseFloat(number);
    if (isNaN(f_x)) {
        return 0;
    }
    var s_x = number.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + bitNum) {
        s_x += '0';
    }
    return s_x;
}

