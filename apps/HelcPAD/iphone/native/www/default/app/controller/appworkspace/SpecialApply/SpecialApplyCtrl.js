
/* JavaScript content from app/controller/appworkspace/SpecialApply/SpecialApplyCtrl.js in folder common */
Ext.define('HelcPAD.controller.appworkspace.SpecialApply.SpecialApplyCtrl', {
	extend:'HelcPAD.controller.ApplicationController',
	config:{
	control:{
	'list#specialApply_list':{
		itemtap:'specialApply_list'
	},
    'button#specialApplyDetail_fh':{
    	tap:'specialApplyDetail_fh'
    },

   'tabpanel#specialApply_tpl':{
		activeitemchange:'specialApply_tpl'
	},
    'button#specialApply_tsdh_add':{
    	tap:'specialApply_tsdh_add'
    },
    'button#specialApply_tsdh_delete':{
    	tap:'specialApply_tsdh_delete'
    },

	}
	},
	specialApply_list:function(dataview, index, target, record, e, eOpts){
		if(event.target.id!='kung'){
			this.NextView('specialApplyDetail','HelcPAD.view.appworkspace.SpecialApply.SpecialApplyDetail');
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
	specialApplyDetail_fh:function(){
		this.showBackView('specialApply','HelcPAD.view.appworkspace.SpecialApply.SpecialApply');
	},

	specialApply_tpl:function(){
		var tabpl=Ext.getCmp('specialApply_tpl');
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
			DataCs.setData(myData,this);
		};
		};
	
		if(itemid=='specialApply_tsdt')
		{
			this.connectServer_ws(resultFunction, cs);	
    	}
	},
	
	specialApply_tsdh_add:function(){
		this.NextView('specialApplyDetail','HelcPAD.view.appworkspace.SpecialApply.SpecialApplyDetail');
	},
	specialApply_tsdh_delete:function(){
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


	