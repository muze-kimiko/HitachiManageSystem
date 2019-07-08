
/* JavaScript content from app/controller/install/installtask/InstallatoinTasksSigninPanelCtrl.js in folder common */
Ext.define('HelcPDA.controller.install.installtask.InstallatoinTasksSigninPanelCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'InstallatoinTasksTurnPanelCtrl_id',
	config:{
		
		control:{
			"button#allcheck_id":{
				tap:'allcheck'
			},
			"button#crosscheck_id":{
				tap:'crosscheck'
			},
			
		}
	},
	allcheck:function(){
		alert('all selection');
		var tcodeId='TCODE_INSTALL_FORWARD';
		var store=Ext.data.StoreManager.get("InstallatoinTasksListPanelStore3");
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
	    	  var tid_ = Ext.getCmp('hiddenId').getValue()+'_'+store.getAt(i).get('ELEVATOR_NO')+'_'+store.getAt(i).get('SEQ_NUM');
	    	  var sel = {tcode:tcodeId,tid:tid_};
	    	  WL.JSONStore.get(collectionName).remove(sel,options).then(function(){
	    		  alert('delete s :');
	    	  }).fail(function(err){
					 Ext.Msg.alert("删除失败");
					 WL.Toast.show('数据删除失败!');
			  });
	      }
	    };
	    
		return ;
		//alert('aa');
		var sele=document.getElementsByName('groupCheckbox');
		console.log(sele.length);
		  // 遍历 form  
	    for ( var i = 0; i <sele.length; i++)  
	    {  
	      // 提取控件  
	      var checkbox = sele[i];  
	      // 检查是否是指定的控件  
	      if (checkbox.name === "groupCheckbox" && checkbox.type === "checkbox" && checkbox.checked === false)  
	      {  
	        // 正选  
	        checkbox.checked = true;  
	      }  
	      /*else if (checkbox.name === "groupCheckbox" && checkbox.type === "checkbox" && checkbox.checked === true)  
	      {  
	        // 反选  
	        checkbox.checked = false;  
	      }  */
	    }  
	},
	crosscheck:function(){
		//alert('bb');
		var sele=document.getElementsByName('groupCheckbox');
		//console.log(sele.length);
		  // 遍历 form  
	    for ( var i = 0; i <sele.length; i++)  
	    {  
	      // 提取控件  
	      var checkbox = sele[i];  
	      // 检查是否是指定的控件  
	      if (checkbox.name === "groupCheckbox" && checkbox.type === "checkbox" && checkbox.checked === false)  
	      {  
	        // 正选  
	        checkbox.checked = true;  
	      }  
	      else if (checkbox.name === "groupCheckbox" && checkbox.type === "checkbox" && checkbox.checked === true)  
	      {  
	        // 反选  
	        checkbox.checked = false;  
	      }  
	    }  
	},
	
});