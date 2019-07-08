
/* JavaScript content from app/controller/OpportunityManagement/Director/ClueProjectListCtrl.js in folder common */
Ext.define('HelcPAD.controller.OpportunityManagement.Director.ClueProjectListCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回
			/*"button#clueProjectList_FH":{
				tap:'clueProjectList_FH'
			},*/
			
			//查询
			/*"button#clueProjectList_CX":{
				tap:'clueProjectList_CX'
			},*/
			
			//list
			"list#clueProjectList_list":{
				itemtap:'clueProjectList_list',
				initialize:'clueProjectList_list_XL'
			},
			
		}
	},
	
	clueProjectList_list_XL:function(){
		var obj=this;
		Ext.getCmp('clueProjectList_list').setPlugins([
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
		        		var tmpStore = this.getList().getStore(); //这个方法表示调用当前list的store中的数据
		        		var tmpStoreNum=tmpStore.data.items.length;
		                cc.log(tmpStoreNum);
		                tmpStoreNum=tmpStoreNum/2;
		                cc.log(tmpStoreNum);
		                tmpStore.setData([]);
		                var Flag=true;
		                if(tmpStoreNum<20){
		                    xlsxNum=0;
		                    var htmel=['<table border=0 width=100% style="color:#666" class="textf">'+
		       						'  <tr>'+
		       						'     <td width=10% rowspan="2">'+
		       						'        <div name="groupkung_clueProjectList" class="p_judge_box2" id="conkung_clueProjectList">3</div>'+
		       						'     </td>'+
		       						'     <td width=90%>{Name}</td>'+
		       						'  </tr>'+
		       						'</table>',];
		                    Ext.getCmp('clueProjectList_list').setItemTpl(htmel);
		                }else{
		                    xlsxNum=xlsxNum+20;
		                    Flag=false;
		                };
		                cc.log(xlsxNum);
		                //跟新
						getResult=function(result){
							//var NumOutputObjects=result.invocationResult.QueryLeadPage_Output.NumOutputObjects;
							var data=result.invocationResult.QueryOpptyPage_Output.ListOfHelEaiAppOpportunity.Opportunity;
							
							var DataClue=Ext.data.StoreManager.get('ClueProjectListStore');
							if(!DataClue){
								DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueProjectListStore');
							};
							if(data==undefined){
								//Ext.Msg.alert("温馨提示",'500米内无关联商机');
								var htmel=['<div style="font-size:12px;width:100%">'+
							            	'<div style="float:left;width:100%">当前范围搜寻不到关联商机</div>'+
							            	'</div>'];
								Ext.getCmp('clueProjectList_list').setItemTpl(htmel);
								
								DataClue.setData([{Name:'没有'}]);
							}else{
								DataClue.setData(data);
							};
						};
					
						//查询条件
						var ggZH=Ext.getCmp('clueProjectList_hidden_TJ').getValue();
						var Trim={
								NewQuery:Flag,
								SearchSpec:ggZH,
								PageSize:'20',
								SortSpec:'Created(DESCENDING)',
								ViewMode:'Manager',
								StartRowNum:'0',
								userID:userID,
								adapter : 'HttpAdapter_PAD_Custom',  //Adapter名字
								procedure : 'clueHandleDirector_GLSJ',  //Adapter方法名
						};
						cc.log(ggZH);
						obj.XCX_GG_FF_NOT(obj,getResult,Trim);
						
		            },
		         },
		     },
		]);
		
	},
	
	//list
	clueProjectList_list:function(dataview, index, target, record, e, eOpts){
		var obj=this;
		if(event.target.id=="conkung_clueProjectList"){
			var sele=document.getElementsByName('groupkung_clueProjectList');
			var checkbox = sele[index];
			if(checkbox.style.color==''){
	    		  checkbox.style.color='#e03a3e';
	    		  if(checkbox.style.color='#e03a3e'){
	  				for(var i=0;i<sele.length;i++){
	  	    			 if(i!=index){
	  	    				 sele[i].style.color = '#ccc';
	  	    			 }
	  	    		}
	  			};
	  			//Ext.getCmp('clueProjectList_CX').setText('确定');
	  			document.getElementById("clueProjectList_SS"). innerHTML = '已选择';
	  			obj.clueProjectListQD(obj);
	    	}else if(checkbox.style.color=='rgb(204, 204, 204)'){
	    		  //是未选中的情况下
	    		  checkbox.style.color='#e03a3e';
	    		  if(checkbox.style.color='#e03a3e'){
	  				for(var i=0;i<sele.length;i++){
	  	    			 if(i!=index){
	  	    				 sele[i].style.color = '#ccc';
	  	    			 }
	  	    		}
	  			};
	  			//Ext.getCmp('clueProjectList_CX').setText('确定');
	  			document.getElementById("clueProjectList_SS"). innerHTML = '已选择';
	  			obj.clueProjectListQD(obj);
	    	}else if(checkbox.style.color=='rgb(224, 58, 62)'){
	    		//是选中的情况下
	    		  checkbox.style.color='#ccc';
	    		  document.getElementById("clueProjectList_SS"). innerHTML = '搜索';
	    		  //Ext.getCmp('clueProjectList_CX').setText('搜索');
	    	};
		}else{
			cc.log(record);
			if(record.data.Name=='没有'){
				return;
			};
			this.NextView('hang_id','HelcPAD.view.common.Hang');
			var IdData=['hang_id_one','hang_id_two','hang_id_three','hang_id_four',
			            'hang_id_five','hang_id_six','hang_id_seven','hang_id_eight',
			            'hang_id_nine','hang_id_ten','hang_id_eleven'];
			var NameData=['项目名称','商机状态','建筑层数','客户',
			              '商机创建时间','计划直梯台数','使用单位','商机跟踪人',
			              '计划扶梯台数','项目地址','大客户名称'];
			var ValueData=[record.data.Name,record.data.OpptyStatus,record.data.BuildingLayer,record.data.Account,
			               record.data.Created,record.data.EvaluateElevatorQuantity,record.data.OpptyFinalUser,record.data.SalesRep,
			               record.data.EvaluateEscalatorQuantity,record.data.OpptyInstallSite,record.data.BigCustomer];

			for(var i=0;i<IdData.length;i++){
				Ext.getCmp(IdData[i]).setLabelWidth('40%');
				Ext.getCmp(IdData[i]).setLabel(NameData[i]);
				Ext.getCmp(IdData[i]).setHidden(false);
				Ext.getCmp(IdData[i]).setValue(ValueData[i]);
				Ext.getCmp(IdData[i]).setReadOnly(true);
			};
			
		};
		
	},
	
	//确定数据
	clueProjectListQD:function(obj){
		var index=0;
		var sele=document.getElementsByName('groupkung_clueProjectList');
  		for(var i=0;i<sele.length;i++){
  			var checkbox = sele[i];
  			if(checkbox.style.color=='rgb(224, 58, 62)'){
  				index=i;
  	    	};
  	    };
  			
  	    var DataClue=Ext.data.StoreManager.get('ClueProjectListStore');
		if(!DataClue){
			DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueProjectListStore');
		};
		var data=DataClue.getData();
		cc.log(data);
		var aa=data.items[index].data.Name;
		cc.log(aa);
		//关联商机
		var SJID=data.items[index].data.OpportunityNumber;
		//商机状态
		var SJZT=data.items[index].data.OpptyStatus;
		//商机ID
		var GLSJID=data.items[index].data.Id;
		cc.log('-------------'+GLSJID);
		cc.log(SJID);
		//var Flag=Ext.getCmp('clueProjectList_hidden').getValue();
		var Flag=obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').LeadSource;
		//this.BackView();
		if(Flag=='经销商'){
			Ext.getCmp('Clue_GLSJ').setValue(SJID);
			Ext.getCmp('Clue_OpptyStatus').setValue(SJZT);
			Ext.getCmp('Clue_OpptyId').setValue(GLSJID);
			
		};
		if(Flag=='外部线索'){
			Ext.getCmp('BCI_GLSJ').setValue(SJID);
			Ext.getCmp('BCI_OpptyStatus').setValue(SJZT);
			Ext.getCmp('BCI_OpptyId').setValue(GLSJID);
		};
	},
	
	//查询 按钮
	/*clueProjectList_CX:function(){
		var xz=Ext.getCmp('clueProjectList_CX').getText();
		if(xz=='搜索'){
			this.NextView('clueProjectListSearch','HelcPAD.view.OpportunityManagement.Director.ClueProjectListSearch');
		}else if(xz=='确定'){
			var index=0;
			var sele=document.getElementsByName('groupkung_clueProjectList');
	  		for(var i=0;i<sele.length;i++){
	  			var checkbox = sele[i];
	  			if(checkbox.style.color=='rgb(224, 58, 62)'){
	  				index=i;
	  	    	};
	  	    };
	  			
	  	    var DataClue=Ext.data.StoreManager.get('ClueProjectListStore');
			if(!DataClue){
				DataClue=Ext.create('HelcPAD.store.OpportunityManagement.Director.ClueProjectListStore');
			};
			var data=DataClue.getData();
			cc.log(data);
			var aa=data.items[index].data.Name;
			cc.log(aa);
			//关联商机
			var SJID=data.items[index].data.OpportunityNumber;
			//商机状态
			var SJZT=data.items[index].data.OpptyStatus;
			//商机ID
			var GLSJID=data.items[index].data.Id;
			cc.log('-------------'+GLSJID);
			cc.log(SJID);
			//var Flag=Ext.getCmp('clueProjectList_hidden').getValue();
			var Flag=obj.getApplication().getController('OpportunityManagement.Director.ClueNewCtrl').LeadSource;
			this.BackView();
			if(Flag=='经销商'){
				Ext.getCmp('Clue_GLSJ').setValue(SJID);
				Ext.getCmp('Clue_OpptyStatus').setValue(SJZT);
				Ext.getCmp('Clue_OpptyId').setValue(GLSJID);
				
			};
			if(Flag=='外部线索'){
				Ext.getCmp('BCI_GLSJ').setValue(SJID);
				Ext.getCmp('BCI_OpptyStatus').setValue(SJZT);
				Ext.getCmp('BCI_OpptyId').setValue(GLSJID);
			};
			//this.NextView('clueHandleDirector','HelcPAD.view.OpportunityManagement.Director.ClueHandleDirector');
			//Ext.getCmp().setValue(record.data.);
		};
	},*/
	
	//返回  
	/*clueProjectList_FH:function(){
		this.BackView();	
	},*/

});