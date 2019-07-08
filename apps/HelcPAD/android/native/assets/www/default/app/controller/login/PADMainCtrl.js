
/* JavaScript content from app/controller/login/PADMainCtrl.js in folder common */
/**
 * Made by lgs
 */
Ext.define('HelcPAD.controller.login.PADMainCtrl', {
	extend:'HelcPAD.controller.ApplicationController',

	config: {
        control: {
			
			//返回按钮(通用)
    		"button#appws_FH":{
				tap:'appws_FH',
			},
    		
			//移动工作台管理页面    暂时不用了  2016-4-5
			"dataview#appWorkSpace":{
				itemtap:'appWorkSpace'
			},
			
			//暂时修改   主管专用页面    2016-6-17
			"dataview#opportunity_management":{
				itemtap:'opportunity_management'
			},
			
			//公共模块  非主要部分   2016-6-17
			"dataview#public_TB":{
				itemtap:'public_TB'
			},
			
			//代理商的 不用了    2016-4-5
			/*'dataview#supplierModule':{
				itemtap:'supplierModule'
			}*/
			
			//测试用
			"dataview#csyong":{
				itemtap:'csyong'
			},
			
        }
    },
    //主界面构建
    newMainView:function(power){
    	var num = 0;//验证无关角色登陆
    	var manager = 0;//验证登陆账号角色是否主管
    	var numAnd = 0;//验收登陆账号角色是否为主管加营业员
    	if(!power.length){
        	Ext.Msg.alert('提示','该用户无任何权限，请与管理员联系！');
        	myLoading.hide();
        	this.BackView();
        	return;
        };
        //查看登陆账号的权限，如果有“代理商”的权限，则不允许登陆，manager记录是否有主管权限
    	for(var i=0;i<power.length;i++){
    		if(power[i]=='ClueCreateAgent'||power[i]=='ClueListAgent')
    			num++;
    		if(power[i]=='PADManagerMain'){
    			manager++;
    			numAnd++;
    		};
    		if(power[i]=='ProjectSearch'){
    			numAnd++;
    		};
    	};
    	cc.log('numAnd:'+numAnd);
    	//为了主管登陆后在营业员登陆不产生冲突
    	//主管进入 出现 “主管意见” 控件 
    	//营业员进入 不会出现“主管意见” 控件
    	if(manager){
    		object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile='Manager';
    		character='主管';
    	}else{
    		object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile=null;
    		character='营业员';
    	};
    	if(numAnd==2){
    		character='主管和营业员';
    	};
    	object.getApplication().getController('HelcPAD.controller.login.PADMainCtrl').character=character;//(ConcernedAboutPeopleCtrl,方法:ConcernedAboutPeople_id_TJ)
    	if(num==2){
    		Ext.Msg.alert('提示','该账号无权限操作，请核对账号后再次登录！');
    		this.BackView();
    		myLoading.hide();
    		return ;
    	};
    	//初始化
    	myLoading.hide();//暂用
    	//获取值列表
    	PADZlbZJcz(obj);
    	cc.log('character:'+character);
    	//主界面
    	var ZJM=[];
    	//主管用
    	var zjmOne={
        		xtype: 'dataview',
                scrollable: null,
                id:'opportunity_management',
                itemTpl: [
                    '<div><img class=\'mainmenu_c_icon {class}\' src=\'icons/{icon}\'/></div>',
                    '<div class="mainmenu_c_text {class}">{text}</div>',
                    ''
                ]
        };
    	//营业员用
    	var zjmTwo={
                xtype: 'dataview',
                flex:1,
                id:'appWorkSpace',
                scrollable: null,
                itemTpl: [
                    /*'<div><img class=\'mainmenu_c_icon {class}\' src=\'icons/{icon}\'/></div>',
                    '<div class="mainmenu_c_text {class}">{text}</div>',*/
                    
                    '<div  style="position: relative;"><img class=\'mainmenu_c_icon {class}\' src=\'icons/{icon}\'/>',
                    '<div name="{remindId}" class="circle" style="width: 40px; height: 40px; border-radius: 20px;left: 66%; top: 1%;{reminded}">',
                    	'<div style="text-align:center;margin-top:8px;font-weight: bold;color:white;font-size: 1.5em;font-family:Droid Sans Fallback;" id="{remindId}">{remindNum}</div>',
                    '</div>',
                '</div>',
                '<div class="mainmenu_c_text {class}">{text}</div>',
                ''
              ]
    	};
    	//公共用的
    	var zjmThree={
                xtype: 'dataview',
                flex:1,
                id:'public_TB',
                scrollable: null,
                itemTpl: [
                    '<div><img class=\'mainmenu_c_icon {class}\' src=\'icons/{icon}\'/></div>',
                    '<div class="mainmenu_c_text {class}">{text}</div>',
              ]
    	};
    	
    	//新模块测试用
    	var zjmFour={
                xtype: 'dataview',
                flex:1,
                id:'csyong',
                scrollable: null,
                itemTpl: [
                    '<div><img class=\'mainmenu_c_icon {class}\' src=\'icons/{icon}\'/></div>',
                    '<div class="mainmenu_c_text {class}">{text}</div>',
              ]
    	};
    	
    	//所有权限
    	var mainViewZong = [{
			text: '我的商机',
		    icon: '11.png',
		    class: 'active',
		    role:'ProjectSearch',
		    remindId:'aa',
		    remindNum:0,
		    reminded:'display:none;'
		},
		{
            text: '主管商机',
            icon: '13.png',
            class: 'active',
            role:'PADManagerMain',
            remindId:'aaa',
            remindNum:0,
		    reminded:'display:none;'
        },{
            text: '客户管理',
            icon: '14.png',
            class: 'active',
            role:'CustomSearch',
            remindId:'bb',
            remindNum:0,
		    reminded:'display:none;'
        },{
            text: 'Siebel查询',
            icon: '21.png',
            class: 'active',
            role:'ContractSearchQD',
            remindId:'bbb',
            remindNum:0,
		    reminded:'display:none;'
        },
        {
            text: 'ERP查询',
            icon: '21.png',
            class: 'active',
            role:'ContractSearchLX',
            remindId:'cc',
            remindNum:0,
		    reminded:'display:none;'
        },{
            text: '通讯录',
            icon: '31.png',
            class: 'active',
            role:'TelephoneSearch',
            remindId:'ccc',
            remindNum:0,
		    reminded:'display:none;'
        },{
            text: '营业员线索',
            icon: '13.png',
            class: 'active',
            role:'SalespersonClues',
            remindId:'dd',
            remindNum:0,
		    reminded:'display:none;'
        },
        {
			text: '经销商业绩',
            icon: '24.png',
            class: 'active',
            role:'DealerPerformance',
            remindId:'waitForConfirmAchieve',
            remindNum:obj.JXSYJnum?'':obj.JXSYJnum,
            reminded:'display:block;',
		}];
    	
    	var roleGain =  function(arrOne,arrTwo){
    		var tempRole = [];
    		var total = 0;
    		for(var i=0;i<arrOne.length;i++){
    			for(var j=0;j<arrTwo.length;j++){
    				if(arrTwo[j].role==arrOne[i])
    					tempRole[total++] = arrTwo[j];
    			}
    		}
    		return tempRole;
    	};
    	
    	if(character=='主管和营业员'){
    		ZJM[0]=zjmTwo;
    		ZJM[1]=zjmOne;
    		ZJM[2]=zjmThree;
    		ZJM[3]=zjmFour;
    		ggandym();    		
    	}else if(character=='营业员'){
    		ZJM[0]=zjmThree;
    		ZJM[1]=zjmTwo;
    		ZJM[2]=zjmFour;
    		ggym('appWorkSpace');
    	}else if(character=='主管'){  		
    		ZJM[0]=zjmThree;
    		ZJM[1]=zjmOne;
    		ZJM[2]=zjmFour;
    		ggym('opportunity_management');
    	};
    	
    	if(character!='主管'){
    		//经销商业绩确认
    		obj.JXSYJnum='';
    		var ggZH=' [Opportunity.Agent Performance Status] = '+"'"+'审批中'+"'"+' and [Opportunity.Oppty Type] = '+"'"+'设备商机'+"'";
    		obj.getApplication().getController('OpportunityManagement.Director.ToDoPerformanceNewCtrl').JXSnumSelect(obj,ggZH,true);
    	}
    	//主管and营业员用
    	function ggandym(){
    		//显示的页面
        	Ext.getCmp('mainCarousel').setItems(ZJM);
        	//主管部分
        	var zg = [
    		{
                text: 'Siebel查询',
                icon: '21.png',
                class: 'active',
                role:'ContractSearchQD',
            },
            {
                text: 'ERP查询',
                icon: '21.png',
                class: 'active',
                role:'ContractSearchLX',
            },{
                text: '主管商机',
                icon: '13.png',
                class: 'active',
                role:'PADManagerMain',
            },{
                text: '通讯录',
                icon: '31.png',
                class: 'active',
                role:'TelephoneSearch',
            }];
        	Ext.getCmp('opportunity_management').setData(zg);
        	//营业部分
        	var yy = [{
    			text: '我的商机',
    		    icon: '11.png',
    		    class: 'active',
    		    role:'ProjectSearch',
    		    remindId:'aa',
                remindNum:0,
    		    reminded:'display:none;'
    		},
    		{
                text: '客户管理',
                icon: '14.png',
                class: 'active',
                role:'CustomSearch',
                remindId:'bb',
                remindNum:0,
    		    reminded:'display:none;'
            },{
                text: '营业员线索',
                icon: '13.png',
                class: 'active',
                role:'SalespersonClues',
                remindId:'cc',
                remindNum:0,
    		    reminded:'display:none;'
            },
            {
    			text: '经销商业绩',
                icon: '24.png',
                class: 'active',
                role:'DealerPerformance',
                remindId:'waitForConfirmAchieve',
                remindNum:obj.JXSYJnum?'':obj.JXSYJnum,
                reminded:'display:block;',
    		}
            ];
        	Ext.getCmp('appWorkSpace').setData(yy);
        	//公共 部分
        	var mainViewGG=[];
        	mainViewGG.push({
                text: '设置',
                icon: '32.png',
                class: 'active'
            });
        	mainViewGG.push({
	            text: '提醒',
	            icon: '21.png',
	            class: 'active'
        	});
        	mainViewGG.push({
                text: '退出',
                icon: '33.png',
                class: 'active'
            });
        	Ext.getCmp('public_TB').setData(mainViewGG);
        	
        	//公共部分二
        	var mainViewCS=[];
        	mainViewCS.push({
                text: '申请分批单',
                icon: '32.png',
                class: 'active'
            });
        	mainViewCS.push({
	            text: '下单排产',
	            icon: '21.png',
	            class: 'active',
        	});
        	Ext.getCmp('csyong').setData(mainViewCS);
        	
    	};
    	
    	//主管or营业员用
    	function ggym(id){
    		//cc.log('------------------------0000000----------');
    		//cc.log(ZJM);
    		//显示的页面
        	Ext.getCmp('mainCarousel').setItems(ZJM);
    		//验证权限 营业员or主管
        	var mainViewOne = roleGain(power,mainViewZong);
        	console.log('===========================mainViewOne');
        	console.log(mainViewOne);
        	Ext.getCmp(id).setData(mainViewOne);
    		//公共 部分
        	var mainViewGG=[];
        	mainViewGG.push({
                text: '设置',
                icon: '32.png',
                class: 'active'
            });
        	mainViewGG.push({
	            text: '提醒',
	            icon: '21.png',
	            class: 'active'
        	});
        	mainViewGG.push({
                text: '退出',
                icon: '33.png',
                class: 'active'
            });
        	
        	Ext.getCmp('public_TB').setData(mainViewGG);
        	
        	var mainViewCS=[];
        	mainViewCS.push({
                text: '申请分批单',
                icon: '32.png',
                class: 'active'
            });
        	mainViewCS.push({
	            text: '下单排产',
	            icon: '21.png',
	            class: 'active',
        	});
        	Ext.getCmp('csyong').setData(mainViewCS);
        	
    	};
    	
    },
    
    //返回按钮(通用)
    appws_FH:function(){
		this.BackView();
	},
	
	csyong:function(obj, index, target, record, e, eOpts){
		var obj = this;
		var text = record.data.text;
		if(text=='申请分批单'){
			obj.getApplication().getController('appworkspace.BatchApply.BatchListCtrl').sqfpd(obj);
		}else if(text=='下单排产'){
			Ext.Msg.alert('温馨提示','此功能还在开发中');
			return;
			obj.NextView('InstallProduce_List_VID','HelcPAD.view.installtoproduce.InstallProduce_List_V');
		};
		
	},
	
	//公共的，非主功能
	public_TB:function(obj, index, target, record, e, eOpts){
		var obj = this;
		var text = record.data.text;
		if(text=='设置'){
			obj.NextView('more_view_id','HelcPAD.view.OaMobileOffice.more.More_view');
			
			//更多页签
			//关于PDA
			var LI=document.getElementById('about');
			LI.onclick = function (){
				obj.NextView('about_id','HelcPAD.view.OaMobileOffice.more.About');
			};
			//修改密码
			var LI=document.getElementById('Cpassword');
			LI.onclick = function (){
				obj.NextView('updatePassword_id','HelcPAD.view.OaMobileOffice.more.UpdatePassword');
				Ext.getCmp('up_username').setValue(usernames);
			};
		}else if(text=='退出'){
			var main = Ext.getCmp('padlogin_id');
      	 	if(!main){
      	 		main = Ext.create('HelcPAD.view.login.PADLogin');
      	 	};
      	 	Ext.Viewport.setActiveItem(main);
      	 	ViewArray.splice(ViewArray.length-1,1);
      	 	ViewArray = [];
      	 	roleArray = [];
      	 	if (Ext.os.is.iOS) {
				//退订动作
				doUnsubscribe();
			}
      	 	//取消订阅
      	 	if (Ext.os.is.Android) {
				unsubscribeUser(userIDeight);
			};
		}else if(text=='提醒'){
			obj.NextView('cemindList','HelcPAD.view.Remind.RemindList');
			obj.getApplication().getController('Remind.RemindListCtrl').JRremindList();
		};
		
	},
	
	//暂时 营业员专用页面   2016-6-17
	//2.我的商机           ProjectSearch
	//3.客户管理           CustomSearch
	//5.签订阶段合同       ContractSearchQD
	//6.履行阶段合同       ContractSearchLX
	//8.公司通讯录         TelephoneSearch
	//12.营业员线索        SalespersonClues
	//独有 营业员：2,3,12
	//共有  营业员  5,6,8
	appWorkSpace:function(obj, index, target, record, e, eOpts){
    	var obj = this;
		var text = record.data.text;
		
		if(text == '客户管理'){
			obj.NextView('customsearch_id','HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustomSearch');
			//大客户名称
			obj.publicZLB('HEL_BIGCUSTOMER','customSearch_new_id_dkhmc',true);
			//时间控件优化
			Ext.Date.monthNames = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
	        /* 汉化提示窗口的按钮 */
	        Ext.define("HelcPAD.overrides.MessageBox", {
	            override: "Ext.MessageBox",
	            statics: {
	                OK    : {text: '确定', itemId: 'ok',  ui: 'action'},
	                YES   : {text: '是',   itemId: 'yes', ui: 'action'},
	                NO    : {text: '否',   itemId: 'no'},
	                CANCEL: {text: '取消', itemId: 'cancel'},

	                INFO    : Ext.baseCSSPrefix + 'msgbox-info',
	                WARNING : Ext.baseCSSPrefix + 'msgbox-warning',
	                QUESTION: Ext.baseCSSPrefix + 'msgbox-question',
	                ERROR   : Ext.baseCSSPrefix + 'msgbox-error',

	                OKCANCEL: [
	                    {text: '取消', itemId: 'cancel'},
	                    {text: '确定', itemId: 'ok',  ui : 'action'}
	                ],
	                YESNOCANCEL: [
	                    {text: '取消', itemId: 'cancel'},
	                    {text: '否',   itemId: 'no'},
	                    {text: '是',   itemId: 'yes', ui: 'action'}
	                ],
	                YESNO: [
	                    {text: '否', itemId: 'no'},
	                    {text: '是', itemId: 'yes', ui: 'action'}
	                ]
	            }
	        });
	        
	        Ext.define("HelcPAD.overrides.picker.Picker", {
	            override: "Ext.picker.Picker",
	            config: {
	                doneButton: '确定',
	                cancelButton: '取消',
	                height:500,
	            }
	        });
		}else if(text == '我的商机'){
			//2015-7-22 此处应用了分页功能，分页所执行的方法在ProjectSearchCtrl中
			//“我的商机”模块查询用的是营业员商机查询
			//“主管商机”模块中的“商机查询”用的是主管查询
			//主管查询和营业员查询的区别在于"EXISTS([Opportunity.Sales Login Name] = '"+userID+"' )",营业员查询是有这个条件的，查询和登录账号想关联的商机
			//var viewMode = 'Manager';  权限是主管
			//var viewMode = 'Organization';  权限是组织
			//var viewMode = 'All';   权限是所有（少用或不用）
			statement = "[Opportunity.Oppty Type] = '设备商机'  and  EXISTS([Opportunity.Sales Login Name] = '"+userID+"' )";
			var param = {
					NewQuery:true,
    				userID:userID,
    				SearchSpec:statement,
    				ViewMode:'Sales Rep',
    				SortSpec:'Updated(DESCENDING)',
    				StartRowNum:0,
    				PageSize:'10',
			};
			//查询当前用户的商机
			var params = {
					adpName:'HttpAdapter_PAD_Custom',
					prodName:'clueHandleDirector_GLSJ',
					parameters: param
			};
			
			var getResult =function(result){
				console.log(result);
				if(result.Fault){
					Ext.Msg.alert('提示',result.Fault.faultstring);
					return ;
				}else if(!result.QueryOpptyPage_Output){
					Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
					return ;
				}else if(result.QueryOpptyPage_Output.ErrorMsg){
					Ext.Msg.alert('提示',result.QueryOpptyPage_Output.ErrorMsg);
				}
				
				var r = result.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity.Opportunity;
				if(result.QueryOpptyPage_Output.NumOutputObjects=='0'){
					//Ext.Msg.alert('提示','无商机，请确认后进入！');
					WL.Toast.show("查无商机");
				}else if(result.QueryOpptyPage_Output.NumOutputObjects=='1'){
					r = [r];
				};
				//页面跳转
				obj.NextView('projectSearch','HelcPAD.view.OpportunityManagement.Project_New.ProjectSearch');
				//防止重复下拉刷新
				obj.getApplication().getController('OpportunityManagement.Project_New.ProjectSearchCtrl').scrollerFlag=false;
				
				
				//数据仓
				var opportunityStore=Ext.data.StoreManager.get('OpptyStore');
				if(!opportunityStore){
					opportunityStore=Ext.create('HelcPAD.store.OpportunityManagement.EntryOpportunities.OpptyStore');
				};
				opportunityStore.setData(r);
				
				//获得查询后得到的值
				var ctrl = object.getController('OpportunityManagement.Project_New.ProjectSearchCtrl');
				ctrl.tempOppty = r;
				
				//为商机状态填充值
				var searchOpptyStatus = document.getElementById('searchOpptyStatus');
				var options ='<option value="">请选择商机状态</option>'+ 
				'<option value="新建">新建</option>'+
				'<option value="已提交">已提交</option>'+
				'<option value="跟进">跟进</option>'+
				'<option value="报价">报价</option>'+
				'<option value="流失">流失</option>'+
				'<option value="提交大项目部">提交大项目部</option>'+
				'<option value="大项目部报价">大项目部报价</option>'+
				'<option value="大项目部跟进">大项目部跟进</option>'+
				'<option value="大项目部退回">大项目部退回</option>'+
				'<option value="拒绝">拒绝</option>'+
				'<option value="完成">完成</option>'+
				'<option value="申请流失">申请流失</option>';
				searchOpptyStatus.innerHTML = options ;
				
				//为职位填充值
				cc.log('职位长度');
				cc.log(positionData);
				var length=positionData.length;
				if(length!=0){
					var searchOpptyStatus = document.getElementById('projectSearchZW');
					var options ='<option  value="" selected="selected">请选择职位</option>';
					for(var i=0;i<length;i++){
						options+='<option value="'+positionData[i].Id+'">'+positionData[i].Name+'</option>';
					};
					searchOpptyStatus.innerHTML = options ;
					Ext.getCmp('projectSearch_toolbar').setHeight(160);
				};
				
				//下拉刷新方法
				var list = Ext.getCmp('projectList');
				if(result.QueryOpptyPage_Output.NumOutputObjects!='0'){
					Ext.Msg.alert('提示','数据已部分加载，请上拉查看更多数据');
				};
				var scroller = list.getScrollable().getScroller();
				//下拉列表滑动产生的事件
				scroller.setListeners({
					scroll:function(scrollerSelf,x,y,eOpts){
						var param = {
								scroller:scrollerSelf,
								x:x,
								y:y,
						};
						ctrl.projectSearchQueryLogic(param);
					}
				});
				
			};
			
			this.connectServer_queryOpportunity(getResult,params);
			
		}else if(text == '营业员线索'){
			obj.NextView('padManagerMain','HelcPAD.view.login.PADManagerMain');
			this.showData = [];
			this.showData.push({
				text: '线索查询',
			    icon: '334.png',
			    class: 'active',
			    remindId:'waitForDiscoverClues',
			    remindNum:'',
			    reminded:'display:none;'
			});
			this.showData.push({
				text: '待处理线索',
                icon: '333.png',
                class: 'active',
                remindId:'waitForHandlerClue',
                remindNum:obj.DCLXSnum?'':obj.DCLXSnum,
                reminded:'display:block;',
			});
			this.showData.push({
				text: '返回',
                icon: '33.png',
                class: 'active',
                reminded:'display:none;',
			});
			Ext.getCmp('opportunityManager').setData(this.showData);
		
			obj.getApplication().getController('login.PADMainCtrl').RK='营业员线索';
			
			//待处理线索查询
			var ggZH='[HEL Lead.Lead Status] =  '+"'"+'处理中'+"'";
			ggZH+=' and EXISTS([HEL Lead.Agent Sales Rep Login] = '+"'"+userID+"')";
			
			//线索查询
			var ggZHTwo='[HEL Lead.Lead Status] =  '+"'"+'处理中'+"'"+' and '+'[HEL Lead.Lead Source] like '+"'"+'经销商'+"'"+' and EXISTS([HEL Lead.Agent Sales Rep Login] = '+"'"+userID+"')";
			this.GYXSmethod(obj,ggZH,ggZHTwo);
			
		}else{
			obj.PublicMainZandY(obj,text);
		};
		
		//测试
		if(text=='经销商业绩'){
			//obj.NextView('toDoPerformanceAgentSearch','HelcPAD.view.OpportunityManagement.Director.ToDoPerformanceAgentSearch');
			obj.NextView('ToDoPerformanceNew_id','HelcPAD.view.OpportunityManagement.Director.ToDoPerformanceNew');
			obj.getApplication().getController('OpportunityManagement.Director.ToDoPerformanceNewCtrl').ToDoPerformanceNew_Public(obj.getApplication().getController('OpportunityManagement.Director.ToDoPerformanceNewCtrl'));
		}
		
		/*if(text == '发票结算单'){
			obj.NextView('voucherApply','HelcPAD.view.appworkspace.VoucherApply.VoucherApply');
		};
		if(text == '分批单'){
			obj.NextView('batchApply','HelcPAD.view.appworkspace.BatchApply.BatchApply');
		};
		if(text == '特殊排产'){
			obj.NextView('specialApply','HelcPAD.view.appworkspace.SpecialApply.SpecialApply');
		};
		if(text == '出货信息'){
			obj.NextView('TransportSearchId','HelcPAD.view.appworkspace.Transport.TransportSearch');
		};
		if(text == '实际收款'){
			obj.NextView('ContractSearchForIncomeId','HelcPAD.view.appworkspace.Income.ContractSearchForIncome');
		};*/
		
    },
    
    //主管页面
    //4.主管商机           PADManagerMain
    //5.签订阶段合同       ContractSearchQD
    //6.履行阶段合同       ContractSearchLX
    //8.公司通讯录         TelephoneSearch
    //主管私有  4
    //主管公有  5,6,8
    opportunity_management:function(obj, index, target, record, e, eOpts){
    	var obj = this;
		var text = record.data.text;
		
		//已搞定  私有
		if(text=='主管商机'){
			//object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile='Manager';
			obj.NextView('padManagerMain','HelcPAD.view.login.PADManagerMain');
			this.showData = [];
			this.showData.push({
				text: '待处理商机',
			    icon: '15.png',
			    class: 'active',
			    remindId:'waitForHandlerOppty',
			    remindNum:'',
			    reminded:'display:block;'
			});
			this.showData.push({
				text: '待流失商机',
			    icon: '22.png',
			    class: 'active',
			    remindId:'waitForLoseOppty',
			    remindNum:'',
			    reminded:'display:block;',
			});
			//暂时屏蔽  2016-5-13
			this.showData.push({
				text: '线索查询',
			    icon: '334.png',
			    class: 'active',
			    remindId:'waitForDiscoverClues',
			    remindNum:'',
			    reminded:'display:none;'
			});
			this.showData.push({
				text: '待处理线索',
                icon: '333.png',
                class: 'active',
                remindId:'waitForHandlerClue',
                remindNum:obj.DCLXSnum?'':obj.DCLXSnum,
                reminded:'display:block;',
			});
			/*this.showData.push({
				text: '经销商业绩',
                icon: '24.png',
                class: 'active',
                remindId:'waitForConfirmAchieve',
                remindNum:obj.JXSYJnum?'':obj.JXSYJnum,
                reminded:'display:block;',
			});*/
			this.showData.push({
				text: '商机查看',//改前为商机资料
                icon: '25.png',
                class: 'active',
                remindId:'lookForOppty',
                remindNum:6,
                reminded:'display:none;',
			});
			/*this.showData.push({
				text: '我的关注',
                icon: '26.png',
                class: 'active',
                remindId:'myFocus',
                remindNum:4,
                reminded:'display:none;',
			});*/
			this.showData.push({
				text:'商机查询',
				icon:'23.png',
				class:'active',
				reminded:'display:none;',
			});
			this.showData.push({
				text: '返回',
                icon: '33.png',
                class: 'active',
                reminded:'display:none;',
			});
			
			Ext.getCmp('opportunityManager').setData(this.showData);
			//商机部分
			this.remindNumber();
			
			//暂时屏蔽  2016-5-13  线索部分
			obj.getApplication().getController('login.PADMainCtrl').RK='主管线索';
			
			//待处理线索
			var ggZH='[HEL Lead.Lead Status] =  '+"'"+'审批中'+"'"+' AND '+'[HEL Lead.Lead Source] like'+"'"+'经销商'+"'"+' ';
			
			//线索查询
			var ggZHTwo='[HEL Lead.Lead Status] =  '+"'"+'处理中'+"'"+' and '+'[HEL Lead.Lead Source] like '+"'"+'经销商'+"'"+' ';
			this.GYXSmethod(obj,ggZH,ggZHTwo);
			//线索入口
			
			/*//经销商业绩确认
			obj.JXSYJnum='';
			var ggZH=' [Opportunity.Agent Performance Status] = '+"'"+'审批中'+"'"+' and [Opportunity.Oppty Type] = '+"'"+'设备商机'+"'";
			obj.getApplication().getController('OpportunityManagement.Director.ToDoPerformanceNewCtrl').JXSnumSelect(obj,ggZH,true);*/
		}else{
			obj.PublicMainZandY(obj,text);
		};
		
		
		/*if(text == '录入客户'){
		obj.NextView('customcreate_id','HelcPAD.view.OpportunityManagement.EntryClient.CustomCreate');
	};
	if(text == '录入商机'){
		obj.NextView('projectcreate_id','HelcPAD.view.OpportunityManagement.EntryOpportunities.ProjectCreate');
	};
	if(text == '查找商机'){
		obj.NextView('ProjectSearch_id','HelcPAD.view.OpportunityManagement.Project.ProjectSearch');
	};
	if(text == '汇总商机'){
		obj.NextView('ProjectReportSearchId','HelcPAD.view.OpportunityManagement.ProjectReport.ProjectReportSearch');
	};
	if(text == '发送提醒信息'){//还没有
		obj.NextView('ProjectTodoSearchId','HelcPAD.view.OpportunityManagement.ProjectTodo.ProjectTodoSearch');
	};*/
		
		
    },
    
    //主管和营业员共有的
    PublicMainZandY:function(obj,text){
    	if(text == 'Siebel查询'){
			obj.NextView('contractSearch','HelcPAD.view.appworkspace.Contract.ContractSearch');
			Ext.getCmp('rkpd').setValue('签订阶段查询');
			Ext.getCmp('contractSearch_fieldset').setInstructions('所有可输入的查询条件均需要精确查询');
		};
		
		if(text == 'ERP查询'){
			obj.NextView('contractSearch','HelcPAD.view.appworkspace.Contract.ContractSearch');
			Ext.getCmp('rkpd').setValue('履行阶段查询');
			Ext.getCmp('contractSearch_fieldset').setInstructions('“大客户”支持精确查询,其余条件支持模糊查询,模糊查询可支持不连贯条件,例如:XX%XX');
			//
			//Ext.getCmp('appContractNo').setValue('AH1103928');
		};
		if(text == '通讯录'){
			obj.NextView('telephonesearch_id','HelcPAD.view.OaMobileOffice.Contacts.TelephoneSearch');
			var data=[];
			data[0]={value:'0000',text:'【全部】'};
			data[1]={value:'1001',text:'日立电梯（中国）有限公司'};
			data[2]={value:'1074',text:'日立电梯（中国）有限公司广州工厂'};
			data[3]={value:'1058',text:'日立电梯（广州）自动扶梯有限公司'};
			data[4]={value:'1042',text:'广州日滨科技发展有限公司'};
			data[5]={value:'1002',text:'日立电梯（上海）有限公司'};
			data[6]={value:'1003',text:'日立楼宇设备制造（天津）有限公司'};
			data[7]={value:'1059',text:'日立电梯（成都）有限公司'};
			data[8]={value:'1041',text:'日立电梯电机(广州)有限公司'};
			data[9]={value:'1062',text:'日立数字安防系统(上海)有限公司'};
			Ext.getCmp('telephonesearch_id_company').setOptions(eval(data));
		};
    },
    
    //营业员和主管  公用线索查询方法 
    GYXSmethod:function (obj,ZHone,ZHtwo){
		cc.log('进入线索公用方法');
		//纯粹记录数量，没有其他意义
		
		//待处理线索
		obj.DCLXSnum='';
		//记录线索查询组合
		obj.DCLXS_ZH=ZHone;
		obj.getApplication().getController('OpportunityManagement.Director.ToDoClueNewCtrl').tdcn_Public(obj,true);
		
		//线索查询   传递true会改变图标的数量，传递fals而不会
		obj.XSCXnum='';
		//记录线索查询组合
		obj.CXXS_ZH=ZHtwo;
		obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').Clue_Public(obj,obj.CXXS_ZH,true);
	},
    
    //提醒数量的独立方法  用于主管模块
    remindNumber:function(){
    	
    	var waitForLoseFn = function(result){
			if(result.QueryOppty_Output.NumOutputObjects){
				var domElement = document.getElementById('waitForLoseOppty');
				if(domElement)
					domElement.innerText=result.QueryOppty_Output.NumOutputObjects;
				return ;
			}
			if(result.Fault){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}
    	};
    	var loseParam = {
    			userID:userID,
    			SearchSpec:"([Opportunity.Oppty Status] = '申请流失') AND [Opportunity.Oppty Type] = '设备商机'",
    			ViewMode:'Manager',
    	};
    	var loseParams = {
    			adapter:'HttpAdapter_PAD_Custom',
				procedure:'queryOpportunityList',
				parameters:loseParam
    	};
    	var waitForHandlerFn = function(result){
			if(result.QueryOppty_Output.NumOutputObjects){
				var domElement = document.getElementById('waitForHandlerOppty');
				if(domElement)
					domElement.innerText = result.QueryOppty_Output.NumOutputObjects;
				return;
			}
			if(!result.QueryOppty_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}
		};
		var condition = "([Opportunity.Oppty Status] = '已提交' OR [Opportunity.Oppty Status] = '大项目部退回') AND [Opportunity.Oppty Type] = '设备商机'";
		var param = {
				userID:userID,
				SearchSpec:condition,
				ViewMode:'Manager',	
		};
		var params = {
				adapter:'HttpAdapter_PAD_Custom',
				procedure:'queryOpportunityList',
				parameters:param
		};
		
		this.ZXLCallAdapter(obj,waitForHandlerFn,params);
		this.ZXLCallAdapter(obj,waitForLoseFn,loseParams);
    },
    
    
    //代理商
    /*supplierModule:function(obj,index,target,record,e,eOpts){
    	var obj = this;
    	var text = record.data.text;
    	if(text=='新建报备'){
    		this.NextView('clueCreateAgent','HelcPAD.view.OpportunityManagement.Agents.ClueCreateAgent');
    		var clueOpration = Ext.getCmp('clueOperation');
    		clueOpration.setOptions([{text:'新建报备',value:'新建报备'}]);
    		this.getApplication().getController('HelcPAD.controller.OpportunityManagement.Agents.ClueCreateAgentCtrl').toInit();
    	}else if(text=='报备查阅'){
    		
    		var store = this.getStore('ClueDirectorStore','HelcPAD.store.OpportunityManagement.Director.ClueDirectorStore');
    		var condition = "[HEL Lead.Lead Status] like '**'";
    		var param = {
    				NewQuery:true,
    				userID:userID,
    				SearchSpec:condition,
    				ViewMode:'Organization',
    				SortSpec:'Created(DESCENDING)',
    				StartRowNum:0,
    				PageSize:'10',
    				
    		};
    		
    		var params = {
    				adpName:'HttpAdapter_PAD_Custom',
     				prodName:'clueListQuery',
     				parameters: param
    		};
    		
    		var getResult = function(result){
    			console.log(result);
    			if(!result.QueryLeadPage_Output){
    				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
    				return;
    			}else if(result.QueryLeadPage_Output.NumOutputObjects=='0'){
    				var list = Ext.getCmp('clueList');
    				var plugins = list.getPlugins();
    				plugins[0].setLoadMoreTexts('没有更多数据了');
    				return ;
    			}else if(result.QueryLeadPage_Output.NumOutputObjects=='1'){
    				store.setData([result.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead]);
    			}else{
    				store.setData(result.QueryLeadPage_Output.ListOfHelEaiAppLead.HelLead);
    			}
    			obj.NextView('clueListAgent','HelcPAD.view.OpportunityManagement.Agents.ClueListAgent');
    			var list = Ext.getCmp('clueList');
    			var scroller = list.getScrollable().getScroller();
    			scroller.setListeners({
    				scroll:function(scrollerSelf,x,y,eOpts){
    					if(scroller.getContainerSize().y+y>scroller.getSize().y+100){
	    					if(this.sizeY){
	    						if(scroller.getContainerSize().y+y>this.sizeY+50){
		    						this.sizeY = scroller.getContainerSize().y+y;
			       					var ctrl = obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Agents.ClueListAgentCtrl');
			       					if(isNaN(ctrl.pageNum)&&ctrl.pageNum!=0)
			       					    ctrl.clueSearchAgentLookUp(0);
			       					else{
			       						ctrl.pageNum+=10;
			       						ctrl.clueSearchAgentLookUp(ctrl.pageNum);
			       					}
	    						}
	    					}else{
	    						 this.sizeY = scroller.getContainerSize().y+y;
	    						 var ctrl = obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Agents.ClueListAgentCtrl');
			       					if(isNaN(ctrl.pageNum)&&ctrl.pageNum!=0)
			       					    ctrl.clueSearchAgentLookUp(0);
			       					else{
			       						ctrl.pageNum+=10;
			       						ctrl.clueSearchAgentLookUp(ctrl.pageNum);
			       					}
	    					}
    					}
    				}
    			});
    		};
    		
    		this.connectServer_queryOpportunity(getResult,params);
    		
    	}
    }*/
});