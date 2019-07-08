
/* JavaScript content from app/controller/ApplicationController.js in folder common */
/**
 * 全局Controller
 */
Ext.define("HelcBPM.controller.ApplicationController", {
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
	
	//创建store 的时候使用
	  getStore:function(storeName,FullNAME){
		  var store=Ext.data.StoreManager.get(storeName);
	 		if (!store) { 
	 			store = Ext.create(FullNAME); 
	 		}; 
	 		return store;
	  },

	getDataFromServer:function(CallbackFunc,parameters){
		var obj = this;
		var adaptername = parameters.adapter == undefined?'HttpAdapter_BPM_AWH':parameters.adapter;
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
					if (result.status == 200 && result.responseJSON) {
						if(parameters.isLoading)obj.Loading(loadingmsg,false);
						CallbackFunc(result.responseJSON);
						/*
						var code = result.code;
						if (200 == code) {
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
						*/
					} else {
						if(parameters.isLoading)obj.Loading(loadingmsg,false);
						Ext.Msg.alert('温馨提示', '（'+parameters.procedure+'）服务器('+result.errorMsg+')，请稍后重试！');
					}
				},  
				onFailure : function (result) {
					console.log('result',result);
					if(parameters.isLoading)obj.Loading(loadingmsg,false);
					if(result.errorMsg){
						if(result.errorMsg.indexOf('timed out') > -1){
							Ext.Msg.alert('温馨提示', '（'+parameters.procedure+'）<br>数据接口执行超时，请稍后重试！');
						}else if(result.errorMsg.indexOf('does not exist') > -1){
							Ext.Msg.alert('温馨提示', '（'+parameters.procedure+'）<br>数据接口不存在，请联系管理员！');
						}
					}else{
						Ext.Msg.alert('温馨提示', '（'+parameters.procedure+'）<br>数据接口执行异常，请稍后重试！');
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
