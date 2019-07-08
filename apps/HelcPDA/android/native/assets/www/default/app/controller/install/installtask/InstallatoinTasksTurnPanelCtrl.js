
/* JavaScript content from app/controller/install/installtask/InstallatoinTasksTurnPanelCtrl.js in folder common */
Ext.define('HelcPDA.controller.install.installtask.InstallatoinTasksTurnPanelCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'InstallatoinTasksTurnPanelCtrl_id',
	config:{
		
		control:{
			/************************************************************************************
			 * 安装任务转派页面 1
			 * */
			
			//全选
			"button#allCheck_id":{
				tap:'onAllCheck'
			},

			//反选
			"button#coverCheck_id":{
				tap:'coverCheck'
			},
			
			//指定
			"button#Appoint_id":{
				tap:'Appoint'
			},
			
			//记录
			"button#Record_id":{
				tap:'Record'
			},
			
			//返回
			'button#InstallatoinTasksTurnPanel_id_FH_BUTTON':{
				tap:'InstallatoinTasksTurnPanel_id_FH_BUTTON'
			},
			/**
			 **安装任务转派页面 1
			 ************************************************************************************/
			
			
			/************************************************************************************
			 * 安装任务转派日志 页面
			 * */

			//返回按钮
			'button#InstallatoinTasksRecordPanel_id_FH_BUTTON':{
				tap:'InstallatoinTasksRecordPanel_id_FH_BUTTON'
			},
			
			/**
			 **安装任务转派日志 页面
			 ************************************************************************************/
		},
	},
	
	/************************************************************************************
	 * 安装任务转派页面 1
	 * */
	
	//全选
	onAllCheck:function(dataview, index, target, record, e, eOpts){
		//获取div的名字
		var sele=document.getElementsByName('groupCheckbox11');
		console.log(sele.length);
		// 遍历 form  
		for ( var i = 0; i <sele.length; i++){  
			// 提取控件  
		    var checkbox = sele[i]; 
		    checkbox.style.color='#e03a3e';
		};  
	},
	
	//反选
	coverCheck:function(){
		//alert('bb');
		var sele=document.getElementsByName('groupCheckbox11');
		//console.log(sele.length);
		  // 遍历 form  
	    for ( var i = 0; i <sele.length; i++)  
	    {  
	      // 提取控件  
	      var checkbox = sele[i];  
	      var color= checkbox.style.color;
	      console.log('color: '+color);
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
	
	//指定
	Appoint:function(dataview, index, target, record, e, eOpts){
		var sele=document.getElementsByName('groupCheckbox11');
	    var count=0;
	    for ( var i = 0; i <sele.length; i++)  
	    {  
	      // 提取控件  
	      var checkbox = sele[i];  
	      console.log(checkbox.name);
	      console.log(checkbox);
	      // 检查是否是指定的控件  
	      if (checkbox.style.color=='rgb(224, 58, 62)')  
	      {  
	        
	      }else{
	    	  count++;  
	      };
	    };
	    console.log(count);
	    console.log(sele.length);
		if(count==sele.length){
			WL.Toast.show('请至少选中一个');
	    }else{
            var ELEVATOR_NO=[];
	    	var groupCheckbox11 =  document.getElementsByName("groupCheckbox11");
	    	var length = groupCheckbox11.length;
	    	store=Ext.data.StoreManager.get("InstallatoinTasksListPanelStore3");
		   	if(!store){
		   			store=Ext.create("HelcPDA.store.install.installtask.InstallatoinTasksListPanelStore3");
		   	};
	    	for (var i=0;i<length;i++) {
	    		var checkbox = groupCheckbox11[i];
	    		if (checkbox.style.color=='rgb(224, 58, 62)') {
	    	//		 ELEVATOR_NO[ELEVATOR_NO.length]=store.getAt(i).get('ELEVATOR_NO');
	    			 ELEVATOR_NO[ELEVATOR_NO.length]=store.getAt(i).get('ELEVATOR_NO')+'_'+store.getAt(i).get('SEQ_NUM');
	    		};
	    	};
	   	 	console.log(ELEVATOR_NO);
	   	 	
	   	 	//进入转派页面
	   	 	this.NextView('InstallatoinTasksAssignPanelPanel_id','HelcPDA.view.install.installtask.InstallatoinTasksAssignPanelPanel');
        
	   	 	var hidden=Ext.getCmp('Hidden_id');
	   	 	console.log(hidden.getValue());
	   	 	hidden.setValue(ELEVATOR_NO);
	   	 	console.log(hidden.getValue());
	   	 	var objId6=Ext.getCmp('InstallatoinTasksAssignSelectfield_id');
	   	 	getResult=function(res){
	   	 		var list=[];
	   	 		list=res.item;
	   	 		objId6.setOptions(list);
	   	 	};
	   	 	console.log(init_person_id);
	   	 	var content="{init_person_id:'"+init_person_id+"'}";
	   	 	this.connectServer(getResult,'installtaskAction.do?method=toSearch_InstVendor',content);
	    };
	},
	
	//记录
	Record:function(){
		//跳转到安装任务转派日志
		this.NextView('InstallatoinTasksRecordPanel_id','HelcPDA.view.install.installtask.InstallatoinTasksRecordPanel');

        var tcodeId='TCODE_INSTALL_FORWARD';
        var hiddenObj=Ext.getCmp('hiddenId');
        var hiddenValue=hiddenObj.getValue();
        var Tid=hiddenValue;
        console.log(Tid);
        var data={tcode:tcodeId,tid:Tid};
		console.log(tcodeId);
		var coll=WL.JSONStore.get(collectionName);
		var options={
				exact:false,//是否精确匹配
		};
		coll.find(data,options).then(function(arrayResults){
			console.log(arrayResults.length);
			console.log(arrayResults);
			var list3=[];
			var list=[];
			var store=null;
			for(var j=0;j<arrayResults.length;j++){
				list3[j]=arrayResults[j].json;
			};
			for(var j=0;j<list3.length;j++){
				list[j]=list3[j].stext;
			};
			store=Ext.data.StoreManager.get("installRecodrStore");
			if(!store){
				store=Ext.create("HelcPDA.store.install.installtask.installRecodrStore");
			};
			store.setData(list,this);
		}).fail(function(err){
				WL.Toast.show('查看记录失败');
		});	
	},
	
	//返回按钮
	InstallatoinTasksTurnPanel_id_FH_BUTTON:function(){
		this.showBackView('InstallatoinTasksListPanel_id','HelcPDA.view.install.installtask.InstallatoinTasksListPanel');
	},
	
	/**
	 **安装任务转派页面 1
	 ************************************************************************************/
	

	/************************************************************************************
	 * 安装任务转派日志 页面
	 * */
	
	//返回按钮
	InstallatoinTasksRecordPanel_id_FH_BUTTON:function(){
		this.showBackView('InstallatoinTasksTurnPanel_id','HelcPDA.view.install.installtask.InstallatoinTasksTurnPanel');
	},

	/**
	 **安装任务转派日志 页面
	 ************************************************************************************/
	
});