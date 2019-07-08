
/* JavaScript content from app/controller/SynchronizationTable/SafeguardFivelegacyContent_YLWTCtrl.js in folder common */
Ext.define('HelcPDA.controller.SynchronizationTable.SafeguardFivelegacyContent_YLWTCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		
		control:{
			
			"button#SafeguardFivelegacyContent_YLWT_id_TJ":{
				tap:'SafeguardFivelegacyContent_YLWT_id_TJ'
			},
			
			"textfield#YLWT_MeasureLegacyProjectNo":{
				tap:'YLWT_MeasureLegacyProjectNo'
			},
		}
	},

	//保存or修改
	SafeguardFivelegacyContent_YLWT_id_TJ:function(){
		var tj=Ext.getCmp('SafeguardFivelegacyContent_YLWT_id_TJ').getText();
		cc.log(tj);
		//遗留问题
		var YLWTlist=Ext.data.StoreManager.get('SynchronizationTable_YLWT_Store');
		if (!YLWTlist) { 
			YLWTlist = Ext.create("HelcPDA.store.SynchronizationTable.SynchronizationTable_YLWT_Store"); 
		};
		//取值
		var No=Ext.getCmp('YLWT_MeasureLegacyProjectNo').getValue();
		var Situation=Ext.getCmp('YLWT_MeasureLegacySpotSituation').getValue();
		var Reason=Ext.getCmp('YLWT_MeasureLegacyOverproofReason').getValue();
		//位置
		var index=Ext.getCmp('SafeguardFivelegacyContent_YLWT_index').getValue();
		
		if(tj=='修改'){
			YLWTlist.getAt(index).set('MeasureLegacyProjectNo',No);
			YLWTlist.getAt(index).set('MeasureLegacySpotSituation',Situation);
			YLWTlist.getAt(index).set('MeasureLegacyOverproofReason',Reason);
		}else if(tj=='保存'){
			if(Reason==''){
				Ext.Msg.alert('温馨提示','请输入超差原因！');
				return;
			}
			if(No==''){
				Ext.Msg.alert('温馨提示','请输入项目号！');
				return;
			}
			YLWTlist.addData({
				MeasureLegacyProjectNo:No,
				MeasureLegacySpotSituation:Situation,
				MeasureLegacyOverproofReason:Reason,
			});
		};
		this.BackView();
	},
	
	//删除
	SafeguardFivelegacyContent_YLWT_id_Delete:function(index,ID){
		var obj=this;
		
		Ext.Msg.confirm("注意","是否确认删除？",function(n){
			if(n=='no')return;
			
			if(ID==undefined){
				//遗留问题
				var YLWTlist=Ext.data.StoreManager.get('SynchronizationTable_YLWT_Store');
				if (!YLWTlist) { 
					YLWTlist = Ext.create("HelcPDA.store.SynchronizationTable.SynchronizationTable_YLWT_Store"); 
				};
				YLWTlist.removeAt(index);
				objectXcx.getController('SynchronizationTable.SafeguardOneQueryListCtrl').YLWTDelete='';
			}else{
				obj.SafeguardFivelegacyContent_YLWT_id_Delete_Original(obj,index,ID);
			}
		});
	},
	
	//遗留问题删除
	SafeguardFivelegacyContent_YLWT_id_Delete_Original:function(obj,index,ID){
		console.log('ID:'+ID);
		//传递值
		var param={};
		param.adpName='HttpAdapter_PDA_SynchronizationTable';
		param.prodName='getHELMeasureLegacyDelete';
		param.parameters=ID;
	
		var getResult = function(result){
			myLoading.hide();
			console.log(result);
			var Msg=result.Envelope.Body.HELMeasureLegacyDelete_Output.ErrorMsg;
			if(Msg==''){
				//遗留问题
				var YLWTlist=Ext.data.StoreManager.get('SynchronizationTable_YLWT_Store');
				if (!YLWTlist) { 
					YLWTlist = Ext.create("HelcPDA.store.SynchronizationTable.SynchronizationTable_YLWT_Store"); 
				};
				YLWTlist.removeAt(index);
				objectXcx.getController('SynchronizationTable.SafeguardOneQueryListCtrl').YLWTDelete='';
			}else{
				obj.getWXTS('删除遗留问题失败');
			}
			
		};
		obj.getSafeguard(getResult,param);
	},
	
	//项目号
	YLWT_MeasureLegacyProjectNo:function(textfield){
		this.NextView('Safeguard_GG_XMH_Select_id','HelcPDA.view.SynchronizationTable.Safeguard_GG_XMH_Select');
		Ext.getCmp('Safeguard_GG_XMH_Select_id_Name').setValue('YLWT_MeasureLegacyProjectNo');
	},
	
	
	




});