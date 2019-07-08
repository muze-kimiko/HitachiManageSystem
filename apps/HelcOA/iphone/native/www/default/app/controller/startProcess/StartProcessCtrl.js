
/* JavaScript content from app/controller/startProcess/StartProcessCtrl.js in folder common */
Ext.define('HelcOA.controller.startProcess.StartProcessCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'StartProcessCtrl_id',
	config:{
		control:{
			"list#StartProcessList":{
				itemtap:'init1'
			},
		}	
	},
	init1:function(obj, index, target, record, e, eOpts){
		//alert('ok');
		var obj=Ext.getCmp('StartprocessName_id');
		if(!obj){
			obj=Ext.create('HelcOA.view.startProcess.StartprocessName');
		}
		Ext.Viewport.setActiveItem(obj);
		var obj2=Ext.getCmp('StartprocessNameList');
		var data=obj2.getData();
		console.log(data);
		store=Ext.data.StoreManager.get("StartprocessStore");
		if(!store){
			store=Ext.create("HelcOA.store.startProsess.StartprocessStore");
		}
		var title=store.getAt(index).get('title');
	   console.log(title);
		
	}
});