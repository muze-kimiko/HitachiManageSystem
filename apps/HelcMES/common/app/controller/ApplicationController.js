/**
 * 全局Controller
 */
Ext.define("HelcMES.controller.ApplicationController", {
	extend : "Ext.app.Controller",
	searchStoreName : "Distributors",
	id:'applicon',
	
	//白底蓝字等待框
	Loading : function(msg,flag){
		if(flag == true){
			Ext.Viewport.setMasked({
				xtype : 'loadmask',
				message : msg,
				padding:'0',
				zIndex:99,
			});
		}else{
			Ext.Viewport.setMasked(false);
		}
		
	},

	getDataFromServer:function(CallbackFunc,parameters){
		var obj = this;
		var adaptername = parameters.adapter == undefined?'HttpAdapter_' + tmpOrg:parameters.adapter;
		var loadingmsg = parameters.loadingmsg == undefined?'正在加载数据！':parameters.loadingmsg;
		var invocationData = {  
	              adapter : adaptername,  
	              procedure :parameters.procedure ,
	              parameters : [parameters]
		};
		
		try {
    		if(parameters.isLoading)obj.Loading(loadingmsg,true);
			WL.Client.invokeProcedure(invocationData, {
				// timeout:60000,
				onSuccess : function (result) {
					console.log('result',result);
					var StatusCode = result.status;
					if (200 == StatusCode) {
						var invocationResult = result.invocationResult;
						if (invocationResult.isSuccessful) {
							if(parameters.isLoading)obj.Loading(loadingmsg,false);
							if(invocationResult.Fault){
								Ext.Msg.alert('温馨提示', '（'+parameters.procedure+'）'+invocationResult.Fault.faultstring.CDATA);
							}else{
								CallbackFunc(invocationResult);
							}
						} else {
							if(parameters.isLoading)obj.Loading(loadingmsg,false);
							Ext.Msg.alert('温馨提示', '（'+parameters.procedure+'）服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						if(parameters.isLoading)obj.Loading(loadingmsg,false);
						Ext.Msg.alert('温馨提示', '（'+parameters.procedure+'）服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function (result) {
					console.log('result',result);
					if(parameters.isLoading)obj.Loading(loadingmsg,false);
					if(result.errorMsg && result.errorMsg.indexOf('timed out') > -1){
						Ext.Msg.alert('温馨提示', '（'+parameters.procedure+'）数据接口执行超时，请稍后重试！');
					}else if(result.errorMsg && result.errorMsg.indexOf('does not exist') > -1){
						Ext.Msg.alert('温馨提示', '该组织还未开通移动报工业务<br>请重新选择！');
					}else{
						Ext.Msg.alert('温馨提示', '（'+parameters.procedure+'）'+result.errorMsg);
					}
					var tmpView = Ext.Viewport.getActiveItem();
					tmpView.setDisabled(false);
				}
			});
		} catch (e) {
			if(parameters.isLoading)obj.Loading(loadingmsg,false);
			Ext.Msg.alert('警告', '（'+adaptername+'）'+e);
			return;
		}
	},
});
