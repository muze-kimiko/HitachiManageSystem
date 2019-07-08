
/* JavaScript content from app/controller/fitting/com_part_Ctrl.js in folder common */
Ext.define('HelcPDA.controller.fitting.com_part_Ctrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'com_part_Ctrl_ID',
	config:{
		control:{
			//配件信息模块入口
			"list#com_part_Project_list":{
				itemtap:'com_part_Project_list'
			},
			
			//配件信息 返回按钮
			"button#btn_back_com_park_Project":{
				tap:'btn_back_com_park_Project'
			},
			
			//常用配件查询按钮
			"button#btn_search_com_part":{
				tap:'btn_search_com_part'
			},
			
			//常用配件查询  返回按钮
			"button#btn_back_com_park":{
				tap:'btn_back_com_park'
			},
			
			//配件列表 返回按钮
			"button#btn_back_part_list":{
				tap:'btn_back_part_list'
			},
			
			//单击配件列表 弹出信息
			"list#list_com_part_list":{
				itemtap:'list_com_part_list'
			},
			
			//配件详细信息 返回按钮
			"button#btn_com_part_info":{
				tap:'btn_com_part_info'
			},
			
		}
	},
	
	//配件信息模块入口
	com_part_Project_list:function(obk, index, target, record, e, eOpts ){
		var list=Ext.getCmp('com_part_Project_list');
		var title=JSON.stringify(list.getData()[index].title);
		//alert(title);
		if(title=='"常用配件"'){
			//alert('');
			this.NextView('com_part_search_id','HelcPDA.view.fitting.com_part_search');
		};
		if(title=='"物流运单"'){
			this.NextView('TransportSearch','HelcPDA.view.transport.TransportSearch');
		};
	},
	
	//配件信息 返回按钮
	btn_back_com_park_Project:function(){
		this.BackView();
//		this.showBackView('MenusView_id','HelcPDA.view.MenusView');
	},
	
	//常用配件查询按钮
	btn_search_com_part:function(){
		this_obj=this;
		//编码
		var txt_erp_code=Ext.getCmp('txt_erp_code').getValue();
		//描述
		var txt_material_description=Ext.getCmp('txt_material_description').getValue();
		//验证
		if(txt_erp_code==''&&txt_material_description==''){
			WL.Toast.show('请至少输入一个查询条件！');
			return;
		};
		
		function station_CC(json){
			console.log(JSON.stringify(json));
			var num=json.Data.length;
			if(num<=0){
				WL.Toast.show('数据不存在！');
				return;
			};
			var datads=Ext.data.StoreManager.get('CODE_GUIDELINES_Store');
			if(!datads){
				datads=Ext.create('HelcPDA.store.fitting.CODE_GUIDELINES_Store');
			};
			datads.setData(json.Data);
			this_obj.NextView('com_part_list_id','HelcPDA.view.fitting.com_part_list');
		};
		var trim="{'BM':'"+txt_erp_code+"','MS':'"+txt_material_description+"'}";
		console.log(trim);
		this_obj.connectServer(station_CC,"fittingAction.do?method=toSearch",trim);
	},
	
	//常用配件查询  返回按钮
	btn_back_com_park:function(){
		this.BackView();
//		this.showBackView('com_part_Project_id','HelcPDA.view.fitting.com_part_Project');
	},
	
	//配件列表 返回按钮
	btn_back_part_list:function(){
		this.BackView();
//		this.showBackView('com_part_search_id','HelcPDA.view.fitting.com_part_search');
	},
	
	//单击配件列表 弹出信息
	list_com_part_list:function(obk, index, target, record, e, eOpts ){
		
		var datads=Ext.data.StoreManager.get('CODE_GUIDELINES_Store');
		if(!datads){
			datads=Ext.create('HelcPDA.store.fitting.CODE_GUIDELINES_Store');
		};
		this.NextView('com_part_info_id','HelcPDA.view.fitting.com_part_info');
		Ext.getCmp('ERP_CODE').setValue(datads.getAt(index).get('ERP_CODE'));
		Ext.getCmp('MATERIAL_DESCRIPTION').setValue(datads.getAt(index).get('MATERIAL_DESCRIPTION'));
		Ext.getCmp('GUIDANCE_DOCUMENTS').setValue(datads.getAt(index).get('GUIDANCE_DOCUMENTS'));
		Ext.getCmp('NO').setValue(datads.getAt(index).get('NO'));
	},
	
	//配件详细信息 返回按钮
	btn_com_part_info:function(){
		Ext.getCmp('ERP_CODE').setValue();
		Ext.getCmp('MATERIAL_DESCRIPTION').setValue();
		Ext.getCmp('GUIDANCE_DOCUMENTS').setValue();
		Ext.getCmp('NO').setValue();
		this.BackView();
//		this.showBackView('com_part_list_id','HelcPDA.view.fitting.com_part_list');
	},
	
});