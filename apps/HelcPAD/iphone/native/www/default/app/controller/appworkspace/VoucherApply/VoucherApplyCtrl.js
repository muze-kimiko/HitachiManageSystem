
/* JavaScript content from app/controller/appworkspace/VoucherApply/VoucherApplyCtrl.js in folder common */
Ext.define('HelcPAD.controller.appworkspace.VoucherApply.VoucherApplyCtrl', {
	extend:'HelcPAD.controller.ApplicationController',
	config:{
	control:{
	'list#voucherApply_list':{
		itemtap:'voucherApply_list'
	},
    'button#voucherApplyDetail_fh':{
    	tap:'voucherApplyDetail_fh'
    },

    
   'tabpanel#voucherApply_tpl':{
	activeitemchange:'voucherApply_tpl'
   },
	'button#voucherApply_fpdh_add':{
    	tap:'voucherApply_fpdh_add'
    },
    'button#voucherApply_fpdh_delete':{
    	tap:'voucherApply_fpdh_delete'
    },
  
	}
	},
	

	voucherApply_list:function(dataview, index, target, record, e, eOpts){
		if(event.target.id!='kung'){
			this.NextView('voucherApplyDetail','HelcPAD.view.appworkspace.VoucherApply.VoucherApplyDetail');
			//this.NextView('customcontact_id','HelcPAD.view.OpportunityManagement.CustomerInformation.CustomContact');
			//Ext.getCmp('customcontact_id_BC').setHidden(true);
		}else{
			var sele=document.getElementsByName('groupkung');
			var checkbox = sele[index];
			 if(checkbox.style.color==''){
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(204, 204, 204)'){
	    		  //是未选中的情况下
	    		  checkbox.style.color='#e03a3e';
	    	  }else if(checkbox.style.color=='rgb(224, 58, 62)'){
	    		//是选中的情况下
	    		  checkbox.style.color='#ccc';
	    	  };
		};
		
	},
	voucherApplyDetail_fh:function(){
		this.showBackView('voucherApply','HelcPAD.view.appworkspace.VoucherApply.VoucherApply');
	},
	
	
	voucherApply_tpl:function(){
		var tabpl=Ext.getCmp('voucherApply_tpl');
		var itemid =tabpl.getActiveItem().getId();
		var tj="123";
		var cs={};
		cs.method="getStories_pda";
		cs.parameters=[tj];
	    var DataCs=Ext.data.StoreManager.get('ApplyStore');
	    if(!DataCs){
			DataCs=Ext.create('HelcPAD.store.appworkspace.Apply.ApplyStore');
		};
		
		function resultFunction(resultData) { 
		var myData = [{one:'123'},{one:'456'}];	
		if (resultData != null) {
			myData = resultData.data;
		}else{
			
//			var collectionName = "MyDB"; // 手机数据库名
//			var collections={};
//			collections[collectionName]={};
//			collections[collectionName].searchFields={one:'string'};
//			WL.JSONStore.init(collections).then(function(){
//				alert("初始化成功！");
//					            	}).fail(function(errorObject){
//					            		alert("初始化错误");
//			});

			DataCs.setData(myData,this);
		};
		};
	
		if(itemid=='voucherApply_fpdt')
		{
			this.connectServer_ws(resultFunction, cs);	
    	}
	},

	voucherApply_fpdh_add:function(){
		   this.NextView('voucherApplyDetail','HelcPAD.view.appworkspace.VoucherApply.VoucherApplyDetail');
	},
	
	voucherApply_fpdh_delete:function(){
		var this_obj=this;
		var del=document.getElementsByName('groupkung');
		var num=0;//判断是否有选中
		var numWZ=[];//获取选中位置
		for(var i=0;i<del.length;i++){
			var checkbox = del[i];
			if(checkbox.style.color=='rgb(224, 58, 62)'){
				numWZ[num]=i;
				num++;
			};
		};
		//判断复选框是否有选中
		if(num==0){
			Ext.Msg.alert('请选择删除目标!');
			WL.Toast.show("请选择删除目标!");
		}else{
			Ext.Msg.confirm('提示','确定要删除？',function(btn){
				if(btn == 'yes'){
					this_obj.dataDelect_BFF('ApplyStore','HelcPAD.store.Apply.ApplyStore',numWZ);
					//console.log(JSON.stringify(numWZ));	
				}else{
					return;
				};
			});
		};
		
	},

	});
