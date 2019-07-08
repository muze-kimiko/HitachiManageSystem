
/* JavaScript content from app/controller/appworkspace/BatchApply/BatchListCtrl.js in folder common */
Ext.define('HelcPAD.controller.appworkspace.BatchApply.BatchListCtrl', {
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//需审批单据 页面 list
		    'list#batchList_id_list':{
				itemtap:'batchList_id_list'
			},
			
			//关闭弹出框
			'button#batchList_id_GB':{
				tap:'batchList_id_GB'
			},
			
			//确定
			'button#batchList_id_QD':{
				tap:'batchList_id_QD'
			},
			
		},
	},
	
	//申请分批单
	sqfpd:function(obj){
		var params = {
				adpName:'HttpAdapter_PAD_ApplyFor',
				prodName:'getRecieveByEmpNum',
				parameters: ERPuserID,
				Flag:true,
		};
		
		var getResult =function(result){
			var vv=result.RecieveByEmpNumResponse["return"];
			cc.log(vv);
			var json = eval("("+ vv +")");
			cc.log(json);
			result.obj.NextView('batchList_id','HelcPAD.view.appworkspace.BatchApply.BatchList');
			var Bacth=Ext.data.StoreManager.get('BatchListStore');
			if(!Bacth){
				Bacth=Ext.create('HelcPAD.store.appworkspace.BatchApply.BatchListStore');
			};
			
			var num=json.UNAPPROVE_Bill_list.length;
			if(num==0){
				var ts={
						CUSTOMER_NAME:'您暂无分批单'
				};
				Bacth.setData(ts);
			}else{
				Bacth.setData(json.UNAPPROVE_Bill_list);
			};
		};
		
		obj.getApplyFor(obj,getResult,params);
	},
	
	batchList_id_list:function(dataview, index, target, record, e, eOpts){
		//cc.log(record);
		var obj=this;
		if(event.target.id!='BatchListID'){
			if(record.data.CUSTOMER_NAME=='您暂无分批单'){
				return;
			};
			var id=record.data.HEADER_ID;
			if(record.data.BILL_TYPE_NAME=='特殊排产发货申请流程'){
				var params = {
						adpName:'HttpAdapter_PAD_ApplyFor',
						prodName:'getRecieveByheadId_specialbill',
						parameters: id,
						Flag:true,
				};
				
				var getResult =function(result){
					obj.tc_SpecialBatchApply(obj,result);
				};
				
				obj.getApplyFor(obj,getResult,params);
				
			}else{
				var params = {
						adpName:'HttpAdapter_PAD_ApplyFor',
						prodName:'getRecieveByheadId_spiltbill',
						parameters: id,
						Flag:true,
				};
				
				var getResult =function(result){
					obj.tc_Bacthapply(obj,result);
				};
				
				obj.getApplyFor(obj,getResult,params);
			};
		}else{
			var sele=document.getElementsByName('BatchListName');
			cc.log(index);
			for(var i=0;i<sele.length;i++){
				var checkbox = sele[i];
				if(index==i){
					checkbox.style.color='#e03a3e';
				}else{
					checkbox.style.color='#ccc';
				};
			};
			
			/*if(checkbox.style.color==''){
				checkbox.style.color='#e03a3e';
	    	}else if(checkbox.style.color=='rgb(204, 204, 204)'){
	    		//是未选中的情况下
	    		checkbox.style.color='#e03a3e';
	    	}else if(checkbox.style.color=='rgb(224, 58, 62)'){
	    		//是选中的情况下
	    		checkbox.style.color='#ccc';
	    	};*/
		};
		
		
	},
	
	//填充 申请分批单的值
	tc_Bacthapply:function(obj,result){
		//cc.log('--------------result');
		//cc.log(result);
		var vv=result.RecieveByheadId_spiltbillResponse["return"];
		//cc.log('--------------vv');
		//cc.log(vv);
		var json = eval("("+ vv +")");
		//cc.log('--------------json');
		//cc.log(json);
		var data=json.splitbill_head_line_list[0];
		//cc.log('--------------data');
		//cc.log(data);
		//验证是否有数据
		var num=json.splitbill_head_line_list.length;
		if(num==0){
			Ext.Msg.alert('温馨提示','查无信息');
			return;
		};
		
		obj.NextView('batchApply_id','HelcPAD.view.appworkspace.BatchApply.BatchApply');
		
		//分批单头
		Ext.getCmp('OU_NAME_BA').setValue(data.OU_NAME);
		Ext.getCmp('CONTRACT_NO_BA').setValue(data.CONTRACT_NO);
		Ext.getCmp('SPLITBILL_NUM_BA').setValue(data.SPLITBILL_NUM);
		Ext.getCmp('STATUS_NAME_BA').setValue(data.STATUS_NAME);
		Ext.getCmp('APPLY_EMPNAME_BA').setValue(data.APPLY_EMPNAME);
		Ext.getCmp('APPLY_DEPNAME_BA').setValue(data.APPLY_DEPNAME);
		Ext.getCmp('APPLY_DATE_BA').setValue(data.APPLY_DATE);
		Ext.getCmp('CUSTOMER_NAME_BA').setValue(data.CUSTOMER_NAME);
		Ext.getCmp('FINAL_USE_UNIT_BA').setValue(data.FINAL_USE_UNIT);
		Ext.getCmp('SIGNER_EMP_BA').setValue(data.SIGNER_EMP);
		Ext.getCmp('RESPER_EMP_BA').setValue(data.RESPER_EMP);
		Ext.getCmp('LARGE_CUSTOMER_BA').setValue(data.LARGE_CUSTOMER);
		Ext.getCmp('SIGNER_CITY_NAME_BA').setValue(data.SIGNER_CITY_NAME);
		Ext.getCmp('SUBCOMPANY_NAME_BA').setValue(data.SUBCOMPANY_NAME);
		
		//分批单行
		var DHdata=[];
		var num=json.splitbill_head_line_list.length;
		for(var i=0;i<num;i++){
			DHdata[i]=json.splitbill_head_line_list[i].splitline;
		};
		var Bacth=Ext.data.StoreManager.get('BatchApplyDetailStore');
		if(!Bacth){
			Bacth=Ext.create('HelcPAD.store.appworkspace.BatchApply.BatchApplyDetailStore');
		};
		
		//没数据的情况下提示
		var length=DHdata.length;
		if(length==0){
			var ts={
					ELEVATOR_NO:'此条分批单不存在分批单行'
			};
			Bacth.setData(ts);
		}else{
			Bacth.setData(DHdata);
		};
		
	},
	
	//填充 特殊申请分批单的值
	tc_SpecialBatchApply:function(obj,result){
		var vv=result.RecieveByheadId_specialbillResponse["return"];
		var json = eval("("+ vv +")");
		var data=json.specialbill_head_line_list[0];
		//验证是否有数据
		var num=json.specialbill_head_line_list.length;
		if(num==0){
			Ext.Msg.alert('温馨提示','查无信息');
			return;
		};
		
		
		obj.NextView('batchApply_id','HelcPAD.view.appworkspace.BatchApply.SpecialBatchApply');
		//cc.log('--------------result');
		//cc.log(result);
		//cc.log('--------------vv');
		//cc.log(vv);
		//cc.log('--------------json');
		//cc.log(json);
		
		
		//分批单头
		//cc.log('--------------data');
		//cc.log(data);
		Ext.getCmp('OU_NAME_SBA').setValue(data.OU_NAME);
		Ext.getCmp('CONTRACT_NO_SBA').setValue(data.CONTRACT_NO);
		Ext.getCmp('SPECIAL_NUM_SBA').setValue(data.SPECIAL_NUM);//和普通申请不一样
		Ext.getCmp('STATUS_NAME_SBA').setValue(data.STATUS_NAME);
		Ext.getCmp('APPLY_EMPNAME_SBA').setValue(data.APPLY_EMPNAME);
		Ext.getCmp('APPLY_DEPNAME_SBA').setValue(data.APPLY_DEPNAME);
		Ext.getCmp('APPLY_DATE_SBA').setValue(data.APPLY_DATE);
		Ext.getCmp('CUSTOMER_NAME_SBA').setValue(data.CUSTOMER_NAME);
		Ext.getCmp('FINAL_USE_UNIT_SBA').setValue(data.FINAL_USE_UNIT);
		Ext.getCmp('SIGNER_EMP_SBA').setValue(data.SIGNER_EMP);
		Ext.getCmp('RESPER_EMP_SBA').setValue(data.RESPER_EMP);
		Ext.getCmp('LARGE_CUSTOMER_SBA').setValue(data.LARGE_CUSTOMER);
		Ext.getCmp('SIGNER_CITY_NAME_SBA').setValue(data.SIGNER_CITY_NAME);
		Ext.getCmp('SUBCOMPANY_NAME_SBA').setValue(data.SUBCOMPANY_NAME);
		
		//分批单行
		var DHdata=[];
		var num=json.specialbill_head_line_list.length;
		//cc.log(num);
		for(var i=0;i<num;i++){
			DHdata[i]=json.specialbill_head_line_list[i].special_line;
		};
		//cc.log(DHdata);
		var Bacth=Ext.data.StoreManager.get('SpecialBatchApplyDetailStore');
		if(!Bacth){
			Bacth=Ext.create('HelcPAD.store.appworkspace.BatchApply.SpecialBatchApplyDetailStore');
		};
	
		//没数据的情况下提示
		var length=DHdata.length;
		if(length==0){
			var ts={
					LOT_NUM:'此条特殊分批单不存在批次信息',
			};
			Bacth.setData(ts);
		}else{
			Bacth.setData(DHdata);
		};
		
	},

	backlistSJ:function(xz){
		var  index=0;
		//验证是否有选中分批单
		var xzdt=true;
		var sele=document.getElementsByName('BatchListName');
		for(var i=0;i<sele.length;i++){
			var checkbox = sele[i];
			if(checkbox.style.color=='rgb(224, 58, 62)'){
				xzdt=false;
				index=i;
			};
		};
		//验证在没有分批单的情况下，无法执行功能
		var Bacth=Ext.data.StoreManager.get('BatchListStore');
		var CUSTOMER_NAME=Bacth.getAt(index).get('CUSTOMER_NAME');
		if(CUSTOMER_NAME=='您暂无分批单'){
			return;
		};
		
		if(xzdt){
			Ext.Msg.alert('温馨提示','请选择单据');
			return;
		};
		
		cc.log(xz);
		if(xz=='审批并指派'){
			Ext.getCmp('batchList_id_hidden').setValue('审批并指派');
		}else if(xz=='拒绝'){
			Ext.getCmp('batchList_id_hidden').setValue('拒绝');
		};
		
		Ext.Viewport.add({
			xtype:'panel',
			id:'BListPanel_id',
			hideOnMaskTap: false,
	 	    centered: true,
			modal: true,
			height:250,
			width: '90%',
			style: 'background:#ccc',
			items: [{
				xtype: 'container',
			    height: '100%',
			    margin: '100 auto 0 auto',
			    padding: '',
			    style: 'background:#fff',
			    width: '100%',
			    layout: 'vbox',
			    items: [{
			    	xtype: 'toolbar',
			        docked: 'top',
			        title: '审批意见',
			        items: [{
			        	xtype: 'spacer'
			        },{
			        	xtype: 'button',
			            iconCls: 'delete',
			            id:'batchList_id_GB',
			        }]
			    },{
			    	xtype: 'formpanel',
			        padding: 10,
			        height: 155,
			        items: [{
			        	xtype: 'fieldset',
						cls:'textf',
						items: [
						/*{
							id:'batchList_id_SPYJ',
						    xtype: 'textfield',
						    height:'100%',
						},*/
						{
							id:'batchList_id_SPYJ',
		                    xtype: 'textareafield',
		                    maxRows: 4,
		                    height :140,
		                }
						]
			        }]
			    },{
			    	xtype: 'panel',
				    layout: {
				    	type: 'hbox',
				        align: 'center'
				    },
				    height: 40,
				    items: [{
				    	xtype: 'spacer'
				    },{
				    	xtype: 'button',
				        id:'batchList_id_QD',
				        margin: '9px 0px 0px 0px',
				        width: '90%',
				        text: '确定'
				    },{
				        xtype: 'spacer',
				    }]
				}]
			}]
		});
			
	},
	
	batchList_id_GB:function(){
		var listPanel=Ext.getCmp('BListPanel_id');
		listPanel.destroy();
	},
	
	batchList_id_QD:function(){
		var obj=this;
		var opinion=Ext.getCmp('batchList_id_SPYJ').getValue();
		var gn=Ext.getCmp('batchList_id_hidden').getValue();
		if(opinion==''||opinion=='请输入审批意见'){
			Ext.getCmp('batchList_id_SPYJ').setValue('请输入审批意见');
			return;
		};
		var p_action='';
		if(gn=='审批并指派'){
			p_action='APPROVED';
		}else if(gn=='拒绝'){
			p_action='REJECTED';
		};
		
		var sele=document.getElementsByName('BatchListName');
		var index=0;
		for(var i=0;i<sele.length;i++){
			var checkbox = sele[i];
			if(checkbox.style.color=='rgb(224, 58, 62)'){
				index=i;
			};
		};
		
		var Bacth=Ext.data.StoreManager.get('BatchListStore');
		var bill_num=Bacth.getAt(index).get('BILL_NUM');
		var parm={
				p_bill_num:bill_num,
				p_action:p_action,
				opinion:opinion
		};
		cc.log(parm);
		
		//销毁弹出框
		var listPanel=Ext.getCmp('BListPanel_id');
		listPanel.destroy();
		
		var params = {
				adpName:'HttpAdapter_PAD_ApplyFor',
				prodName:'getReceive',
				parameters: parm,
				Flag:true,
		};
	
		var getResult =function(result){
			cc.log(result);
			var txt=result.RecieveResponse["return"];
			cc.log(txt);
			
			//获取回馈结果
			if(window.DOMParser){
            	parser=new DOMParser();
            	xmlDoc=parser.parseFromString(txt,"text/xml");
            }else{
            	xmlDoc=newActiveXobject("Microsoft.XMLDOM");
            	xmlDoc.async="false";
            	xmlDoc.loadXML(txt);
            };
			var IsSuccess=xmlDoc.getElementsByTagName("x_msg_data")[0].childNodes[0].nodeValue;
			cc.log(IsSuccess);
			if(IsSuccess=='S'){
				Ext.Msg.alert('温馨提示','成功执行');
			}else{
				Ext.Msg.alert('温馨提示',IsSuccess);
			};
			obj.sqfpd(obj);
		};
		
		obj.getApplyFor(obj,getResult,params);
	},

});