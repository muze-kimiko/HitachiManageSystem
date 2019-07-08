Ext.define('HelcPAD.controller.OpportunityManagement.Director.PerformanceAgentConfirmCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回
			"button#performanceAgentConfirm_FH":{
				tap:'performanceAgentConfirm_FH'
			},
			
			//新建
			"button#performanceAgentConfirm_XJ":{
				tap:'performanceAgentConfirm_XJ'
			},
			
			//list
			"list#performanceAgentConfirm_list":{
				itemtap:'performanceAgentConfirm_list'
			},
			
			//同意代理商业绩
			"button#performanceAgentConfirm_TYDLSYJ":{
				tap:'performanceAgentConfirm_TYDLSYJ'
			},
			
			//驳回代理商业绩
			"button#performanceAgentConfirm_BHDLSYJ":{
				tap:'performanceAgentConfirm_BHDLSYJ'
			},
			
		}
	},
	
	
	
	//驳回和同意的公共方法
	performanceBHandTY:function(obj,XZnum){
		var sele=document.getElementsByName('groupkung_performanceAgentConfirm');
		//选择
		var total = 0;
		var num=0;
		for(var i=0;i<sele.length;i++){
			if(sele[i].style.color=='rgb(224, 58, 62)'){
				total=i;
			}else{
				num++;
			};
		};
		if(num==sele.length){
			Ext.Msg.alert("温馨提示","请选择业绩");
			return;
		};
		
		getResult=function(obj,result){
			
			if(XZnum==4){
				try{
					var msg=result.invocationResult.DeclineAgentPer_Output.ErrorMsg;
					cc.log(msg);
					if(msg!=undefined){
						Ext.Msg.alert("温馨提示",msg);
						return;
					};
				}catch(e){
					
				};
				
			};
			
			Ext.Msg.alert("温馨提示","执行成功");
			obj.BackView();
			obj.BackView();
			//刷新
			var ggZH=' [Opportunity.Agent Performance Status] = '+"'"+'审批中'+"'"+' and [Opportunity.Oppty Type] = '+"'"+'设备商机'+"'";
			obj.getApplication().getController('OpportunityManagement.Director.ToDoPerformanceNewCtrl').JXSnumSelect(obj,ggZH,true);
		};
		
		var DataCs=Ext.data.StoreManager.get('PerformanceAgentConfirmStore');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.OpportunityManagement.Director.PerformanceAgentConfirmStore');
		};
		var dataID=DataCs.getData();
		var trim=dataID.items[total].data.OpptyId2;
		//驳回条件
		obj.DireactorZGSeach(obj,getResult,trim,XZnum);
	},
	
	//驳回代理商业绩
	performanceAgentConfirm_BHDLSYJ:function(){
		var obj=this;
		obj.performanceBHandTY(obj,4);
	},
	
	//同意代理商业绩
	performanceAgentConfirm_TYDLSYJ:function(){
		var obj=this;
		obj.performanceBHandTY(obj,3);
	},
	
	//list
	performanceAgentConfirm_list:function(dataview, index, target, record, e, eOpts){
		var obj=this;
		if(event.target.id=="conkung_performanceAgentConfirm"){
			var sele=document.getElementsByName('groupkung_performanceAgentConfirm');
			var selenum=sele.length;
			for(var i=0;i<selenum;i++){
				var checkbox2 = sele[i];
				checkbox2.style.color='#ccc';
			};
			var checkbox = sele[index];
			checkbox.style.color='#e03a3e';
		}else{
			Ext.getCmp('performanceAgentConfirm_toolbar').setHidden(true);
			obj.NextView('performanceAgentConfirmHang','HelcPAD.view.OpportunityManagement.Director.PerformanceAgentConfirmHang');
			
			//只读
			var data=['PAC_Agent','PAC_RegistrationDate','PAC_LineNumber','PAC_LeadStatus','PAC_PerformanceShared','PAC_PerformanceCountCal','PAC_ElevatorCount','PAC_Comments'];
			var dataNum=data.length;
			for(var i=0;i<dataNum;i++){
				Ext.getCmp(data[i]).setReadOnly(true);
			};
			//添值
			var DataCs=Ext.data.StoreManager.get('PerformanceAgentConfirmStore');
			if(!DataCs){
				DataCs=Ext.create('HelcPAD.store.OpportunityManagement.Director.PerformanceAgentConfirmStore');
			};
			var dataID=DataCs.getData();
			//var dataPCS=['Agent','RegistrationDate','LineNumber','LeadStatus','PerformanceShared','PerformanceCountCal','ElevatorCount','Comments'];
			Ext.getCmp(data[0]).setValue(dataID.items[index].data.Agent);
			Ext.getCmp(data[1]).setValue(dataID.items[index].data.RegistrationDate);
			Ext.getCmp(data[2]).setValue(dataID.items[index].data.LineNumber);
			Ext.getCmp(data[3]).setValue(dataID.items[index].data.LeadStatus);
			Ext.getCmp(data[4]).setValue(dataID.items[index].data.PerformanceShared);
			Ext.getCmp(data[5]).setValue(dataID.items[index].data.PerformanceCountCal);
			Ext.getCmp(data[6]).setValue(dataID.items[index].data.ElevatorCount);
			Ext.getCmp(data[7]).setValue(dataID.items[index].data.Comments);
			
			
			this.recordData=record.data;
			
			//判断主管是否可修改代理商业绩的说明
			var TjOne=obj.getApplication().getController('OpportunityManagement.Director.ToDoPerformanceAgentListCtrl').OpptyStatus;
			var TjTwo=dataID.items[index].data.LeadStatus;
			//cc.log(TjOne);
			//cc.log(TjTwo);
			
			if(TjOne=='完成'){
				if(TjTwo=='新建'||TjTwo=='修改中'||TjTwo=='审批中'){
					Ext.getCmp('performanceAgentConfirmHang_BC').setHidden(false);
					Ext.getCmp(data[dataNum-1]).setReadOnly(false);
				};
			};
		};
		
	},
	
	//新建     代理商业绩确认列表中有些线索不是代理商提供的，而是营业员帮代理商建立的，可能不完整，需要补完
	performanceAgentConfirm_XJ:function(){
		this.NextView('performanceAgentConfirmHang','HelcPAD.view.OpportunityManagement.Director.PerformanceAgentConfirmHang');
	},
	
	//返回
	performanceAgentConfirm_FH:function(){
		this.BackView();
	},

});