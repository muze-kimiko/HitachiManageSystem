
/* JavaScript content from app/controller/OpportunityManagement/Project_New/BeInChargeOf/ProjectDirectorMainCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			 
			 'button#agreeOpportunityLose':{
				 //同意商机流失
				 tap:'forOpportunityOperation'
			 },
			 'button#refuseOpportunityLose':{
				 //拒绝商机流失
				 tap:'forOpportunityOperation'
			 },
			 'button#passOpportunityApprove':{
				 //同意商机审核
				 tap:'forOpportunityOperation'
			 },
			 'button#refuseOpportunityApprove':{
				 //拒绝商机审核
				 tap:'forOpportunityOperation'
			 },
			 'button#submitBigProject':{
				 //提交大项目部
				 tap:'forOpportunityOperation'
			 },
			 //销售商机   相似查找 
			 'button#projectdirectormain_new_id_XSCZ':{
			 	tap:'projectdirectormain_new_id_XSCZ',
			 },
			 	 
			 //待处理商机list
			 'list#projectdirectormain_new_id__DSP_list':{
				 itemtap:'projectdirectormain_new_id__DSP_list'
			 },
			 //由商机详情界面进入相似查找的公共方法
			 'button#toSameFound':{
				 tap:'toSameFound'
			 },
			 
		},	
	},
	//主管对商机的操作
	forOpportunityOperation:function(button,eOpts){
		var obj = this;
		var opportunity = null;
		/*if(button.id=='agreeOpportunityLose'||button.id=='refuseOpportunityLose')
			opportunity = Ext.getCmp('loseOpportunity').getData();
		else*/
		opportunity = Ext.getCmp('opportunity').getData();
		var opptyParam = {};
		opptyParam.Id = opportunity.Id;
		opptyParam.userID = userID; 
		opptyParam.ViewMode = 'All';
		if(button.id!='agreeOpportunityLose'&&button.id!='refuseOpportunityLose'){
			var HQSalesRepFullName = Ext.getCmp('HQSalesRepFullName').getValue();
			var HQSalesRepId =Ext.getCmp('HQSalesRepId').getValue();
			var managerSuggestion = Ext.getCmp('managerSuggestion').getValue();
			var repData = Ext.getCmp('salesRep').getData();
			console.log(repData);
			if(repData&&repData.length){
				opptyParam.Position = repData;
			}
			if(HQSalesRepId){
				opptyParam.HQSalesRepId = HQSalesRepId;
				opptyParam.HQSalesRepFullName = HQSalesRepFullName;
			}	
			if(managerSuggestion)
				opptyParam.OpptyDeclineReason = managerSuggestion;
			console.log(opptyParam);
		}
		
		var param = {
				
		};
		var xmlStruts = '';
		if(button.id=='agreeOpportunityLose'){
			
			xmlStruts = '<?xml version="1.0" encoding="utf-8"?>'+
				'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
				'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
				'<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
				'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
			  '<soap:Body>'+
			  '  <ApproveLose_Input xmlns="http://siebel.com/Sales/OppSubOrLos">'+
			  '    <RecordId>'+opportunity.Id+'</RecordId>'+
			  '  </ApproveLose_Input>'+
			  '</soap:Body>'+
			'</soap:Envelope>';
			param.xmlStruts = xmlStruts;
			param.SoapAction = '"document/http://siebel.com/Sales/OppSubOrLos:ApproveLose"';
		}else if(button.id=='refuseOpportunityLose'){
			xmlStruts = '<?xml version="1.0" encoding="utf-8"?>'+
				'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
				'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
				'<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
				'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
			  '<soap:Body>'+
			  '  <DeclineLose_Input xmlns="http://siebel.com/Sales/OppSubOrLos">'+
			  '    <RecordId>'+opportunity.Id+'</RecordId>'+
			  '  </DeclineLose_Input>'+
			  '</soap:Body>'+
			'</soap:Envelope>';
			param.xmlStruts = xmlStruts;
			param.SoapAction = '"document/http://siebel.com/Sales/OppSubOrLos:DeclineLose"';
		}else if(button.id=='passOpportunityApprove'){
			xmlStruts= '<?xml version="1.0" encoding="utf-8"?>'+
			'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
			'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
			'<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
			'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
			  '<soap:Body>'+
			  '  <AgreeOpt_Input xmlns="http://siebel.com/Sales/OppSubOrLos">'+
			  '    <RecordId>'+opportunity.Id+'</RecordId>'+
			  '  </AgreeOpt_Input>'+
			  '</soap:Body>'+
			'</soap:Envelope>';
			param.xmlStruts = xmlStruts;
			param.SoapAction = '"document/http://siebel.com/Sales/OppSubOrLos:AgreeOpt"';
		}else if(button.id=='refuseOpportunityApprove'){
			xmlStruts = '<?xml version="1.0" encoding="utf-8"?>'+
				'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
				'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
				'<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
				'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
			  '<soap:Body>'+
			  '  <DeclineButton_Input xmlns="http://siebel.com/Sales/OppSubOrLos">'+
			  '    <RecordId>'+opportunity.Id+'</RecordId>'+
			  '  </DeclineButton_Input>'+
			  '</soap:Body>'+
			'</soap:Envelope>';
			param.xmlStruts = xmlStruts;
			param.SoapAction = '"document/http://siebel.com/Sales/OppSubOrLos:DeclineButton"';
		}else{
			xmlStruts = '<?xml version="1.0" encoding="utf-8"?>'+
				'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
				'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
				'<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
				'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
			  '<soap:Body>'+
			  '  <SubmitLargeProject_Input xmlns="http://siebel.com/Sales/OppSubOrLos">'+
			  '    <RecordId>'+opportunity.Id+'</RecordId>'+
			  '  </SubmitLargeProject_Input>'+
			  '</soap:Body>'+
			'</soap:Envelope>';
			param.xmlStruts = xmlStruts;
			param.SoapAction = '"document/http://siebel.com/Sales/OppSubOrLos:SubmitLargeProject"';
		}
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
 				prodName:'managerOperationOppty',
 				parameters: param
		};
		
		var opptyParams = {
				adpName:'HttpAdapter_PAD_Custom',
 				prodName:'buildNewOppty',
 				parameters: opptyParam
		};
		var handlerFn = function(msg,resultO,runFn){
			if(!resultO)
				return;
			if(resultO.ErrorMsg){
				Ext.Msg.alert('提示',resultO.ErrorMsg);
				return ;
			}
				
			Ext.Msg.show({
				title:'提示',
				message:msg,//'同意商机流失完成！',
				buttons:[{text:'确定',itemId:'yes'}],
				fn:function(btnId){
					var length = ViewArray.length-1;
					for(var i = length;i>-1;i--){
						if(ViewArray[i].ViewId!='padManagerMain'){
							ViewArray.splice(ViewArray.length-1,1);
						}	
						else{
							obj.BackView();
							break;
						}	
					}
					runFn();
					if(btnId=='yes'){
						
					}
				}
			});
			
		};
		
		var getResult = function(result){
			console.log(result);
			var resultType = '0';
			if(result.Fault){
				var TS='';
				//cc.log('1.'+result.Fault.detail.faultstring);
				//cc.log('2.'+result.Fault.faultstring);
				if(result.Fault.detail.faultstring){
					TS=result.Fault.detail.faultstring;
				}else if(result.Fault.faultstring){
					TS=result.Fault.faultstring;
				};
				Ext.Msg.alert('提示',TS);
				return;
			}
			if(result.ApproveLose_Output)
				resultType = 'ApproveLose_Output';
			else if(result.DeclineLose_Output)
				resultType = 'DeclineLose_Output';
			else if(result.AgreeOpt_Output){
				resultType = 'AgreeOpt_Output';
			}else if(result.DeclineButton_Output)
				resultType = 'DeclineButton_Output';
			else if(result.SubmitLargeProject_Output)
				resultType= 'SubmitLargeProject_Output';
			if(resultType=='0'){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return;
			}
			switch (resultType){
				case 'ApproveLose_Output':
					handlerFn('同意商机流失完成！',result.ApproveLose_Output,function(){
						object.getController('login.PADManagerMainCtrl').opportunityManager(null,1,null,{data:{text:'待流失商机'}},event,null);
					});break;
				case 'DeclineLose_Output':
					handlerFn('拒绝商机流失完成！',result.DeclineLose_Output,function(){
						object.getController('login.PADManagerMainCtrl').opportunityManager(null,1,null,{data:{text:'待流失商机'}},event,null);
					});break;
				case 'AgreeOpt_Output':
					handlerFn('商机审核通过完成！',result.AgreeOpt_Output,function(){
						object.getController('login.PADManagerMainCtrl').opportunityManager(null,1,null,{data:{text:'待处理商机'}},event,null);
					});break;
				case 'DeclineButton_Output':
					handlerFn('拒绝商机审核完成！',result.DeclineButton_Output,function(){
						object.getController('login.PADManagerMainCtrl').opportunityManager(null,1,null,{data:{text:'待处理商机'}},event,null);
					});break;
				case 'SubmitLargeProject_Output':
					handlerFn('提交大项目部完成！',result.SubmitLargeProject_Output,function(){
						object.getController('login.PADManagerMainCtrl').opportunityManager(null,1,null,{data:{text:'待处理商机'}},event,null);
					});break;
				default:handlerfn('操作完毕！');break;
			}
			
		};
		
		var getOpptyResult = function(result){
			console.log(result);
			if(result.OpptyDetailSynchronize_Output&&result.OpptyDetailSynchronize_Output.ListOfHelEaiAppOpportunityDetail&&result.OpptyDetailSynchronize_Output.ListOfHelEaiAppOpportunityDetail.Opportunity)
				obj.connectServer_queryOpportunity(getResult,params);
			else{
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return;
			}
				
		};
		this.connectServer_queryOpportunity(getOpptyResult,opptyParams);
		
		
	},
	
	
	
	//销售商机 “待审批” list
	projectdirectormain_new_id__DSP_list:function(dataview, index, target, record, e, eOpts){
		var data = record.data;
		if(typeof(data)== "string")
			record.data = JSON.parse(data);
		var obj = this;
		if(!event||event.target.id!='conkung_projectdirectormain_DSP'){
			var Opportunity = record.data;
			var param = {
					userID:userID,
					id:Opportunity.Id
			};
			
			var params = {
    				adpName:'HttpAdapter_PAD_Custom',
     				prodName:'queryOpportunity',
     				parameters: param
    		};
			var getResult = function(result){
				console.log(result);
				if(!result.OpptyDetailQuery_Output){
					Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
					return;
				}
				var oppty = result.OpptyDetailQuery_Output.ListOfHelEaiAppOpportunityDetail.Opportunity;
				obj.toOpptyDatil(oppty);
				
				//预计签约时间
				Ext.getCmp('predictSign').setReadOnly(true);
			};
			
			this.connectServer_queryOpportunity(getResult,params);
			//直接进入商机详细
			/*this.NextView('projectinfo_new_id','HelcPAD.view.OpportunityManagement.Project_New.ProjectInfo');
			Ext.getCmp('projectinfo_new_id_XZ').setValue('D线');*/
			
			//ZGSJ_atjcz();
		}else{
			var sele=document.getElementsByName('groupkung_projectdirectormain_DSP');
			var checkbox = sele[index];
			 if(checkbox.style.color==''){
	    		  checkbox.style.color='#e03a3e';
	    	 }else if(checkbox.style.color=='rgb(204, 204, 204)'){
	    		  //是未选中的情况下
	    		  checkbox.style.color='#e03a3e';
	    	 }else if(checkbox.style.color=='rgb(224, 58, 62)'){
	    		  //是选中的情况下
	    		  checkbox.style.color='#ccc';
	    	 };
	    	 if(checkbox.style.color='#e03a3e'){
				 for(var i=0;i<sele.length;i++){
	    			  if(i!=index){
	    				  sele[i].style.color = '#ccc';
	    			  }
	    		  }
	    	 }
		};
	},
	
	
	//调整界面组件的宽度与位置
	widthAdjust:function(main,align){
		var mainCmp = Ext.getCmp(main);
		var alignCmp = Ext.getCmp(align);
		if(main){
			mainCmp.setWidth('100%');
			mainCmp.setLabelWidth('40%');
		}
		if(alignCmp)
			alignCmp.setHidden(true);
		
		
	},
	//从商机详情进入相似查找
	toSameFound:function(){
		var opportunity = Ext.getCmp('opportunity').getData();
		this.NextView('projectdirectorsearch_new_id','HelcPAD.view.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorSearch');
		Ext.getCmp('directorSearchOpportunity').setData(opportunity);
		Ext.getCmp('projectdirectorresult_new_id_JR').setData([opportunity]);
		var store = this.getStore('DirectorOpptyResultStore','HelcPAD.store.OpportunityManagement.Project_New.BeInChargeOf.DirectorOpptyResultStore');
		store.setData([]);
	},
	//所有主管部分查询出的商机进入到商机界面时调用的界面调整
	toOpptyDatil:function(record){
		
		console.log(record);
		var obj= this;
		//Ext.getCmp('projectdirectormain_new_id').setHidden(true);
		if(!record.directorSearchFlag)
			obj.NextView('projectinfo_new_id','HelcPAD.view.OpportunityManagement.Project_New.ProjectInfo');
		if(object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl').operationProfile=='Manager'){
			//对界面选择框的处理
			var formField = Ext.getCmp('projectinfo_new_id').query('field');
			for(var i=0;i<formField.length;i++){
				try{
					if(formField[i].isXType('checkboxfield')){
						formField[i].disable();
						if(record[formField[i].getName()]!='Y')
							formField[i].setHidden(true);
						else
							formField[i].check();
					}	
					if(formField[i].getId()=='managerSuggestion'){
						formField[i].setHidden(false);
						continue;
					}
					if(!formField[i].getReadOnly())
						formField[i].setReadOnly(true);
				}catch(e){
					continue;
				}
			}
		};
		//隐藏文本框，存放商机资料
		Ext.getCmp('opportunity').setData(record);
		//作为界面跟踪人员主要人员显示所作更改
		if(record.ListOfOpportunity_Position.Opportunity_Position){
			if(!record.ListOfOpportunity_Position.Opportunity_Position.length){
				record.SalesRep = record.ListOfOpportunity_Position.Opportunity_Position.FullName;
			}else{
				for(var i=0;i<record.ListOfOpportunity_Position.Opportunity_Position.length;i++){
					if(record.ListOfOpportunity_Position.Opportunity_Position[i].IsPrimaryMVG=='Y')
						record.SalesRep = record.ListOfOpportunity_Position.Opportunity_Position[i].FullName;
				}
			}
		}
		var projectListCtrl  = object.getController('OpportunityManagement.Project_New.ProjectListCtrl');
		projectListCtrl.status = 'detail';
		//商机详情界面进入时初始化界面修饰，（下拉选项，只读控制，界面样式等）
		obj.getApplication().getController('HelcPAD.controller.OpportunityManagement.Project_New.ProjectInfoCtrl').toInit(record);
		//projectListCtrl.loadData(record);
		
		var salesRep = Ext.getCmp('salesRep');
		salesRep.setValue(record.SalesRep);
		salesRep.setWidth('80%');
		salesRep.setLabelWidth('50%');
		salesRep.setReadOnly(false);
		var toSalesRep = Ext.getCmp('toSalesRep');
		toSalesRep.setWidth('20%');
		toSalesRep.setHidden(false);
		Ext.getCmp('accountProperty').setReadOnly(true);
		Ext.getCmp('accountAttribute').setReadOnly(true);
		Ext.getCmp('opptyDescription').setReadOnly(true);
		//在ApplicationController中定义的填充表单值的方法，参数一：表单id，参数二：数据所涉及model，参数三：内容数据
		obj.fillFormValue('projectinfo_new_id','HelcPAD.model.OpportunityManagement.EntryOpportunities.OpportunityModel',record);
		MapX = record.XHeight;
		MapY = record.YCoordinate;
		//界面组件宽度调整（文本框后面有按钮的情况）
		obj.widthAdjust('account','toAccount');
		obj.widthAdjust('keyContactLastName','keyContact');			
		obj.widthAdjust('opptyInstallSite','toOpptyInstallSite');
		//obj.widthAdjust('HQSalesRepFullName','toHQSalesRep');
		obj.widthAdjust('installSiteCompany','toInstallSiteCompany');
		
		/*var conditionFound = Ext.getCmp('projectinfo_new_id_KHXX_ATJCZ_TF');
		var conditionFoundBtn = Ext.getCmp('toSameFound');
		conditionFound.setHidden(false);
		conditionFoundBtn.setHidden(false);*/
		Ext.getCmp('account').setReadOnly(true);
		Ext.getCmp('opptyFinalUser').setReadOnly(true);
		//商机状态为申请流失时展现流失原因列表
		if(record.OpptyStatus=='申请流失'){
			obj.forOpptyApporveLoseFunction(record);
		}
		//商机详情界面上部分自定义界面构建的内容根据商机状态调整
		var opptyStatus = record.OpptyStatus;
		var containerToolbar = Ext.getCmp('opptyContainerToolbar');
		var autoWidth = 'width:96%;';
		
		var toolbarContentOther = '';
		var toolbarTwoRow ='';
		var sameJuge = false;
		if(object.getController('OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorSearchCtrl').sameQueryCount==1)
			sameJuge = true;
			
		//var submit = true,bigBack = true,lose = true ;
		if(opptyStatus=='已提交'){
			/*submit = false;
			bigBack = true;
			lose = true;*/
			autoWidth = 'width:29%;';
			toolbarContentOther+='<div class="ysZhTwo anOne" id="passOpportunityApprove" onclick="object.getController(\'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl\').forOpportunityOperation(this);" style="width:29%;background:#339933">审核通过</div>'
						  +'<div class="ysZhThree anOne" id="refuseOpportunityApprove" onclick="object.getController(\'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl\').forOpportunityOperation(this);" style="width:29%;">审核拒绝</div>';
							
			toolbarTwoRow = '<div class="anTwoDiv">'
								+'<div class="ysZhFour anOne" id="projectdirectormain_new_id_XSCZ" onclick="object.getController(\'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl\').toSameFound();" style="display:'+(sameJuge?'none;':'block;')+'width:46%;" >相似查找</div>'
								+'<div class="ysZhFive anOne" id="submitBigProject" onclick="object.getController(\'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl\').forOpportunityOperation(this);" style="width:'+(sameJuge?'96%;':'46%;')+';">提交大项目部</div>';
							+'</div>';
			containerToolbar.setHeight(85);
		}else if(opptyStatus=='大项目部退回'){
			/*submit = true;
			bigBack = false;
			lose = true;*/
			autoWidth = (sameJuge?'width:46%;':'width:29%;');
			toolbarContentOther+='<div class="ysZhTwo anOne" id="submitBigProject" onclick="object.getController(\'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl\').forOpportunityOperation(this);" style="'+autoWidth+'">提交大项目部</div>'
								+'<div class="ysZhThree anOne" id="projectdirectormain_new_id_XSCZ" onclick="object.getController(\'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl\').toSameFound();" style="display:'+(sameJuge?'none;':'block;')+'width:29%;" >相似查找</div>';
		}else if(opptyStatus=='申请流失'){
			/*submit = true;
			bigBack= true;
			lose = false;*/
			autoWidth = (sameJuge?'width:29%;':'width:21%;');
			toolbarContentOther+='<div class="ysZhTwo anOne" id="agreeOpportunityLose" onclick="object.getController(\'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl\').forOpportunityOperation(this);" style="'+autoWidth+'">同意流失</div>'
								 +'<div class="ysZhThree anOne" id="refuseOpportunityLose" onclick="object.getController(\'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl\').forOpportunityOperation(this);" style="'+autoWidth+'">拒绝流失</div>'
								 +'<div class="ysZhFour anOne" id="projectdirectormain_new_id_XSCZ" onclick="object.getController(\'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorMainCtrl\').toSameFound();" style="display:'+(sameJuge?'none;':'block;')+'width:21%;" >相似查找</div>';
		}
		var toolbarContentHead = '<div style="width=100%">'
					   	  		+'<div class="anTwoDiv">'
					   	  			+'<div class="ysZhOne anOne" id="opptyDetailBack" onclick="object.getController(\'OpportunityManagement.Project_New.ProjectInfoCtrl\').projectinfo_new_id_FH();" style="'+autoWidth+'">'+SYB+'</div>';
		toolbarContentHead+=toolbarContentOther+'</div>';
		toolbarContentHead+=toolbarTwoRow;
		toolbarContentHead+='</div>';
		containerToolbar.setHtml(toolbarContentHead);
		/*var opptyOperation = function(){
			if(opptyStatus=='已提交'){
				submit = false;
				bigBack= true;
			}else if(opptyStatus=='大项目部退回'){
				submit = true;
				bigBack= false;
			}else if(opptyStatus=='申请流失'){
				submit = true;
				bigBack= true;
			}
			var menu = Ext.create('Ext.Menu',{
				minWidth:'50%',
    			items:[{
    				id:'passOpportunityApprove',
    				xtype:'button',
    				text:'商机审核通过',
    				hidden:submit
    			},{
    				xtype:'spacer'
    			},{
    				id:'refuseOpportunityApprove',
    				xtype:'button',
    				text:'商机审核拒绝',
    				hidden:submit
    			},{
    				id:'submitBigProject',
    				xtype:'button',
    				text:'提交大项目部',
    				hidden:bigBack
    			},{
    				xtype:'button',
    				text:'返回',
    				handler:function(b,e){
    					Ext.Viewport.hideMenu('right');
    					menu.destroy();
    				}
    			}]
    		});
			Ext.Viewport.setMenu(menu, {
                side: 'right',
                reveal: false//是否保留背景色彩
            });
    		Ext.Viewport.showMenu('right');
		};
		
		Ext.getCmp('buttonMenu').setHandler(opptyOperation);*/
	},
	//为申请流失商机独立的方法
	forOpptyApporveLoseFunction:function(record){
		var obj = this;
		Ext.getCmp('forLoseOpptyContainer').setHidden(false);
		console.log(record);
		//var store = this.getStore('OpportunityOutflowReasonStore','HelcPAD.store.OpportunityManagement.Project_New.OpportunityOutflowReasonStore');
		var param = {
				opptyId:record.RowId,
				userID:userID
		};
		params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'queryLoseReason',
				parameters:param 
		};
		var getResult = function(result){
			if(result.Fault){
				Ext.Msg.alert('提示',result.Fault.faultstring);
				return ;
			}
			if(!result.OpptyLosReaQuery_Output){
				Ext.Msg.alert('提示信息','服务器繁忙，请稍后重试！');
				return ;
			}
			if(result.OpptyLosReaQuery_Output.ErrorMsg){
				Ext.Msg.alert('提示',result.OpptyLosReaQuery_Output.ErrorMsg);
				return ;
			}
			var loseReason = result.OpptyLosReaQuery_Output.ListOfHelEaiAppOpportunityLoseReason.ListOfHelOpportunityLoseReason.HelOpportunityLoseReason;
			if(result.NumOutputObjects=='0'){
				obj.opptyLoseReasonListData = [{OpptyType:'display:none;',OpptyLoseReasonType:'该商机无流失原因',OpptyLoseReason:'' }];
			}else if(!loseReason.length){
				obj.opptyLoseReasonListData = [loseReason];
			}else{
				obj.opptyLoseReasonListData = loseReason;
			}
		};
		
		this.connectServer_queryOpportunity(getResult,params);
	},
	
});	





