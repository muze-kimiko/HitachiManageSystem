Ext.define('HelcOA.controller.Affiche.newsCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'NameCtrl_id',
	config:{
		control:{
			"list#AfficheNewsList":{
				itemtap:'news'
			},
		}	
	},
	news : function(obj, index, target, record, e, eOpts){
		this.NextView("NewsCom_id","HelcOA.view.Affiche.newsCon");
		var getResult=function(res){
			var returnData = eval("("+ res.GETGSGGDOCReturn.CDATA +")");
			Ext.getCmp('new_subject').setHtml(returnData.data.subject);
			Ext.getCmp('new_doc').setHtml(returnData.data.body);
			cc.log(returnData);
		};
		
		var params = {};
		params.method = 'GetGSGGDoc';
		params.parameters = [record.data.unid];
		this.connectServer_OA(getResult,params);
		
	}
});