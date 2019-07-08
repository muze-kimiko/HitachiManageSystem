
/* JavaScript content from app/controller/SynchronizationTable/Safeguard_GG_XMH_Ctrl.js in folder common */
Ext.define('HelcPDA.controller.SynchronizationTable.Safeguard_GG_XMH_Ctrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		
		control:{
			
			"button#Safeguard_GG_XMH_Select_id_CX":{
				tap:'Safeguard_GG_XMH_Select_id_CX'
			},
			
			"button#Safeguard_GG_XMH_Select_id_QD":{
				tap:'Safeguard_GG_XMH_Select_id_QD'
			},
			
			"list#Safeguard_GG_XMH_Select_id_list":{
				itemtap:'Safeguard_GG_XMH_Select_id_list'
			},
			
			
		}
	},

	//查询 
	Safeguard_GG_XMH_Select_id_CX:function(){
		//console.log('项目号查询 公共---------------');
		var obj=this;
		//控件
		var SafeguardArray=["Select_ContentName",
		                    "Select_ContentLocation",
		                    "Select_ContentType",
		                    "Select_ContentProjectTaskNo",
		                    "Select_ContentCover",
		                    "Select_ContentOperateStandard",
		                    "Select_ContentOperateContent",
		                    "Select_ContentProjectRequire"];
		var SafeguardMsg=this.getElement(SafeguardArray);

		//验证
		var numMsg=0;
    	for(var i=0;i<SafeguardMsg.length;i++){
    		if(SafeguardMsg[i]== null || SafeguardMsg[i] == ''){
    			numMsg++;
    		}
    	};
    	if(numMsg==SafeguardMsg.length){
    		Ext.Msg.alert('温馨提示','请至少输入一个条件');
    		return;
    	};
    	
		//SQL
		var tj='';
		if(SafeguardMsg[0]){//项目名称
			tj=getTJ(tj);
			tj+="[HEL Maintain Plan Contents.Content Name] like '*"+SafeguardMsg[0]+"*'";
		}
		if(SafeguardMsg[1]){//位置
			tj=getTJ(tj);
			tj+="[HEL Maintain Plan Contents.Content Location] like '*"+SafeguardMsg[1]+"*'";
		}
		if(SafeguardMsg[2]){//项目类型  
			tj+="[HEL Maintain Plan Contents.Content Type] like '*"+SafeguardMsg[2]+"*'";
		}
		if(SafeguardMsg[3]){//项目号
			tj=getTJ(tj);
			tj+="[HEL Maintain Plan Contents.Content Project Task No] like '*"+SafeguardMsg[3]+"*'";
		}
		if(SafeguardMsg[4]){//适用范围
			tj=getTJ(tj);
			tj+="[HEL Maintain Plan Contents.Content Cover] like '*"+SafeguardMsg[4]+"*'";
		}
		if(SafeguardMsg[5]){//作业标准
			tj=getTJ(tj);
			tj+="[HEL Maintain Plan Contents.Content Operate Standard] like '*"+SafeguardMsg[5]+"*'";
		}
		if(SafeguardMsg[6]){//作业内容
			tj=getTJ(tj);
			tj+="[HEL Maintain Plan Contents.Content Operate Content]  like '*"+SafeguardMsg[6]+"*'";
		}
		if(SafeguardMsg[7]){//项目要求
			tj=getTJ(tj);
			tj+="[HEL Maintain Plan Contents.Content Project Require]  like '*"+SafeguardMsg[7]+"*'";
		}
		
		function getTJ(zhi){
			if(zhi!=''){
				tj+=" AND ";
			}
			return tj;
		}
		
		//console.log(tj);
		
    	//查询条件组合
		//测试例子
		//var tj="[HEL Maintain Plan Contents.Content Project Task No] like '**' ";
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getZYMR';
		param.parameters=tj;
		var getResult = function(result){
			myLoading.hide();
			//console.log(result);
			
			var num=result.Envelope.Body.ProjectNoQuery_Output.NumOutputObjects;
			var Data=result.Envelope.Body.ProjectNoQuery_Output.ListOfHelPdaMaintainingPlanProjectnoPicklistIo.HelMaintainPlanContents;
			
			if(num==0){
				Ext.Msg.alert('温馨提示','查无数据！');
				return;
			}
			//console.log('Data-------------');
			//console.log(Data);
			//项目号
			var sotre=obj.getStore('SynchronizationTable_XMH_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_XMH_Store');
			sotre.setData(Data);
			
			//页签跳转
			var tab=Ext.getCmp('Safeguard_GG_XMH_Select_tabpanel');
			var Inn=tab.getInnerItems();
			tab.setActiveItem(Inn[1]);
			
			//显示确定按钮
			Ext.getCmp('Safeguard_GG_XMH_Select_id_QD').setHidden(false);
			
			//判断是否选中查询的项目号
			XMH_Result=false;
			
		};
		obj.getSafeguard(getResult,param);
	},
	
	//确定
	Safeguard_GG_XMH_Select_id_QD:function(){
		if(!XMH_Result){
			this.getWXTS('请选择项目号');
			return;
		}
		var id=Ext.getCmp('Safeguard_GG_XMH_Select_id_Name').getValue();
		this.BackView();
		if(id=='JTB_MeasureItemNo'){//如果是阶梯表查询项目号
			Ext.getCmp('JTB_MeasureItemNo').setValue(XMH_Result_ContentProjectTaskNo);
			Ext.getCmp('JTB_MeasureItemName').setValue(XMH_Result_ContentName);
			Ext.getCmp('JTB_MeasureItemType').setValue(XMH_Result_ContentType);
			Ext.getCmp('JTB_MeasureItemContent').setValue(XMH_Result_ContentOperateContent);
			Ext.getCmp('JTB_MeasureItemStandard').setValue(XMH_Result_ContentOperateStandard);
			
		}else{//如果是保障表查询项目号
			Ext.getCmp(id).setValue(XMH_Result_ContentProjectTaskNo);			
		}
		
		
		return;
		/*//坐标
		var index=99999;
		var sele=document.getElementsByName('XMH_Name');
		
		for(var i=0;i<sele.length;i++){
			var checkbox = sele[i];
			if(checkbox.style.color=='rgb(224, 58, 62)'){
				//是选中的情况下
				index=i;
			}
		};
		if(index==99999){
			this.getWXTS('请选择项目号');
			return;
		};
		var sotre=this.getStore('SynchronizationTable_XMH_Store','HelcPDA.store.SynchronizationTable.SynchronizationTable_XMH_Store');
		var id=Ext.getCmp('Safeguard_GG_XMH_Select_id_Name').getValue();
		//console.log(sotre.getData().items[index].data);
		//项目号
		var ContentProjectTaskNo=sotre.getData().items[index].data.ContentProjectTaskNo;
		
		this.BackView();
		if(id=='JTB_MeasureItemNo'){//如果是阶梯表查询项目号
			Ext.getCmp('JTB_MeasureItemNo').setValue();
			Ext.getCmp('JTB_MeasureItemName').setValue();
			Ext.getCmp('JTB_MeasureItemType').setValue();
			Ext.getCmp('JTB_MeasureItemContent').setValue();
			Ext.getCmp('JTB_MeasureItemStandard').setValue();
		}else{//如果是保障表查询项目号
			Ext.getCmp(id).setValue(ContentProjectTaskNo);			
		}*/
		
	},
	
	//项目号 list
	Safeguard_GG_XMH_Select_id_list:function(obj,index,target,record,e,eOpts){
		console.log(record);
		//判断是否选中查询的项目号
		XMH_Result=true;
		XMH_Result_ContentProjectTaskNo=record.data.ContentProjectTaskNo;
		XMH_Result_ContentName=record.data.ContentName;
		XMH_Result_ContentType=record.data.ContentType;
		XMH_Result_ContentOperateContent=record.data.ContentOperateContent;
		XMH_Result_ContentOperateStandard=record.data.ContentOperateStandard;
		
		
		if(event.target.id!='XMH_Id'){
			this.NextView('Safeguard_GG_XMH_id','HelcPDA.view.SynchronizationTable.Safeguard_GG_XMH');
			
			Ext.getCmp('ContentName').setValue(record.data.ContentName);
			Ext.getCmp('ContentLocation').setValue(record.data.ContentLocation);
			Ext.getCmp('ContentType').setValue(record.data.ContentType);
			Ext.getCmp('ContentProjectTaskNo').setValue(record.data.ContentProjectTaskNo);
			Ext.getCmp('ContentCover').setValue(record.data.ContentCover);
			Ext.getCmp('ContentOperateStandard').setValue(record.data.ContentOperateStandard);
			Ext.getCmp('ContentOperateContent').setValue(record.data.ContentOperateContent);
			Ext.getCmp('ContentProjectRequire').setValue(record.data.ContentProjectRequire);
			
			getPandDuan('ContentIfRequired',record.data.ContentIfRequired);
			getPandDuan('ContentIfMeasure',record.data.ContentIfMeasure);
			getPandDuan('ContentIfPhoto',record.data.ContentIfPhoto);
			function getPandDuan(name,data){
				if(data=='Y'){
					Ext.getCmp(name).setValue(1);
				}else{
					Ext.getCmp(name).setValue(0);
				}
			};
			
			//只读
			var activeView = Ext.Viewport.getActiveItem();
			//console.log(activeView);
			var defineInputfield =  activeView.query('field');
			for(var i=0;i<defineInputfield.length;i++){
				defineInputfield[i].setReadOnly(true);
			};
		}else{
			var sele=document.getElementsByName('XMH_Name');
			//var checkbox = sele[index];
			
			var num=sele.length;
			
			for(var i=0;i<num;i++){
				var checkbox = sele[i];
				if(i==index){
					checkbox.style.color='#e03a3e';
					/*if(checkbox.style.color==''){
						checkbox.style.color='#e03a3e';
					}else if(checkbox.style.color=='rgb(204, 204, 204)'){
						//是未选中的情况下
						checkbox.style.color='#e03a3e';
					}else if(checkbox.style.color=='rgb(224, 58, 62)'){
						//是选中的情况下
						checkbox.style.color='#ccc';
					}*/
				}else{
					checkbox.style.color = '#ccc';
				}
			};
			
			/*if(checkbox.style.color==''){
				checkbox.style.color='#e03a3e';
			}else if(checkbox.style.color=='rgb(204, 204, 204)'){
				//是未选中的情况下
				checkbox.style.color='#e03a3e';
				
			}else if(checkbox.style.color=='rgb(224, 58, 62)'){
				//是选中的情况下
				checkbox.style.color='#ccc';
			}
			
			if(checkbox.style.color='#e03a3e'){
				for(var i=0;i<sele.length;i++){
					if(i!=index){
						sele[i].style.color = '#ccc';
					}
				}
			}*/
		}
		
	},


});