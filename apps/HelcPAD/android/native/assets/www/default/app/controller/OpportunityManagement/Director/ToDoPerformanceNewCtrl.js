
/* JavaScript content from app/controller/OpportunityManagement/Director/ToDoPerformanceNewCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Director.ToDoPerformanceNewCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			"list#ToDoPerformanceNew_id_list":{
				itemtap:'ToDoPerformanceNew_id_list',
				//initialize:'ClueNew_id_list_XL',
			},
			
		}
	},
	
	ToDoPerformanceNew_id_list:function(dataview, index, target, record, e, eOpts){
		var obj=this;
		getResult=function(obj,data,NumOutputObjects){
			
			if(NumOutputObjects==0){
				Ext.Msg.alert("温馨提示","当前经销商暂无业绩");
				return;
			};
			
			if(data==undefined){
				Ext.Msg.alert("温馨提示","当前经销商暂无业绩");
				return;
			};
			
			var DataCs=Ext.data.StoreManager.get('PerformanceAgentConfirmStore');
			if(!DataCs){
				DataCs=Ext.create('HelcPAD.store.OpportunityManagement.Director.PerformanceAgentConfirmStore');
			};
			DataCs.setData(data);
			
			obj.NextView('performanceAgentConfirm','HelcPAD.view.OpportunityManagement.Director.PerformanceAgentConfirm');
			
			try{
				cc.log('FF:'+JSON.stringify(data));
				//显示主要
				var ddnum=data.length;
				for(var i=0;i<ddnum;i++){
					var PrimaryField='';
					if(ddnum==undefined){
						PrimaryField=data.PrimaryField;
					};
					if(ddnum>1){
						PrimaryField=data[i].PrimaryField;	
					};
					if(PrimaryField=='Y'){
						var sele=document.getElementsByName('groupkung_performanceAgentConfirm');
						var checkbox = sele[i];
						checkbox.style.color='#e03a3e';
						break;
					};
				};
			}catch(e){
				
			};
			
			//进入主管界面
			Ext.getCmp('performanceAgentConfirm_XJ').setHidden(true);
			Ext.getCmp('performanceAgentConfirm_SC').setHidden(true);
			Ext.getCmp('performanceAgentConfirm_spacer_two').setHidden(true);
			Ext.getCmp('performanceAgentConfirm_TJDLSYJ').setHidden(true);
		};
	    
		var DataCs=Ext.data.StoreManager.get('ToDoPerformanceAgentListStore');
		if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.OpportunityManagement.Director.ToDoPerformanceAgentListStore');
		};
		var dataID=DataCs.getData();
		var trim=dataID.items[index].data.Id;
		this.trimNum=trim;
		//商机状态
		this.OpptyStatus=dataID.items[index].data.OpptyStatus;
		cc.log(trim);
		obj.DireactorZGSeach(obj,getResult,trim,2);
	},
	
	//单击事件
	ToDoPerformanceNew_Public:function(obj){
		//上一页  
	    var SYY=document.getElementById('ToDoPerformanceNew_id_SYY');
	    SYY.onclick = function (){
	    	obj.BackView();
	    };
	    
	    //查询
	    var CX=document.getElementById('ToDoPerformanceNew_id_CX');
	    CX.onclick = function (){
	    	//合同号
	    	var HTH=$('#ToDoPerformanceNew_id_HTH').val();
	    	//关键字
	    	var GJZ=$('#ToDoPerformanceNew_id_GJZ').val();
	    	cc.log(HTH+'  '+GJZ);
	    	//条件
			var trim='';
			if(HTH!=''){
				trim+='[Opportunity.Contract Number] = '+"'"+HTH+"'"+' and ';
			};
			if(GJZ!=''){
				trim+=' ([Opportunity.Name] like '+"'"+GJZ+"'"+' or  [Opportunity.Account] like '+"'"+GJZ+"'"+' or [Opportunity.Oppty Final User]  like '+"'"+GJZ+"'"+' ) and ';
			};
			trim+=' [Opportunity.Agent Performance Status] = '+"'"+'审批中'+"'"+' and [Opportunity.Oppty Type] = '+"'"+'设备商机'+"'";
			obj.JXSnumSelect(obj,trim,false);
	    };
	},
	

	
	//查询经销商数量  查询条件 和是否有圈
	JXSnumSelect:function(obj,Trim,YesOrNo){
		getResult=function(obj,data,NumOutputObjects){
			var DataCs=Ext.data.StoreManager.get('ToDoPerformanceAgentListStore');
			if(!DataCs){
				DataCs=Ext.create('HelcPAD.store.OpportunityManagement.Director.ToDoPerformanceAgentListStore');
			};
			if(NumOutputObjects==0){
				if(!YesOrNo){
					Ext.Msg.alert("温馨提示","查无数据");
				};
				DataCs.setData([]);
				return;
			};
			DataCs.setData(data);
			if(YesOrNo){
				object.getController('login.PADMainCtrl').JXSYJnum=NumOutputObjects;
				document.getElementById("waitForConfirmAchieve").innerHTML=NumOutputObjects;
			};
			
		};
		//记得要改接口
		if(YesOrNo){//true 无圈
			obj.DireactorZGSeachJXS(obj,getResult,Trim);
		}else{
			obj.DireactorZGSeach(obj,getResult,Trim,1);
		};
	},
	
	
});