
/* JavaScript content from app/controller/fault/FaultHandlingReportPanelTCDCtrl.js in folder common */
Ext.define('HelcPDA.controller.fault.FaultHandlingReportPanelTCDCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//返回FaultHandlingReportPanel事件,故障报告书模块返回事件
			Back_FRP:'button[id=back_FRP]',

			Add_fault:'button[id=add_fault]',
			Modify_fault:'button[id=modify_fault]',

			TCD:'button[id=TCD]',
			TCD_TYPE:'selectfield[id=TCD_TYPE]',

			FaultList:'list[id=faultList]',
			
			CommitTCD:'button[id=CommitTCD]',
		},
		control:{
			FaultList:{
				itemtap:'FaultList',
			},
			Back_FRP:{
				tap:'Back_FRP',
			},
			CommitTCD:{
				tap:'CommitTCD',
			},
			Add_fault:{
				tap:'Add_fault',
			},
			Modify_fault:{
				tap:'Modify_fault',
			},
			TCD:{
				tap:'TCD',
			},
			TCD_TYPE:{
				change:'TCD_TYPE',
			}
		},
	},

//提交TCD
	CommitTCD : function(){
		var obj = this;
		 //检查进入时状态是什么，如果是已提交或者未提交，设置用户是否能操作数据
		if(this.getJXCL_SubmitVerification('two')){
			return;
		}
	   	 /*var fault_listId=Ext.getCmp('fault_list').getActiveItem().getId();
	   	 if(fault_listId=='FaultHandWYSHButton'||fault_listId=='FaultHandWYTJButton'){
	   		   // Ext.getCmp('CommitTCD').setDisabled(true);
	   		WL.Toast.show('已提交或已审核,不能提交.');
		    return;
	   	 }
	   	 */
	   	//TCD码不能为空
	   	var new_TCD_TYPE=Ext.getCmp("TCD_TYPE").getValue();
		var new_TCD_NUMBER=Ext.getCmp("TCD_NUMBER").getValue();
		var new_FAULT_NUMBER=Ext.getCmp("FAULT_NUMBER").getValue();
		if(new_TCD_TYPE==''||new_TCD_NUMBER==''||new_FAULT_NUMBER==''){
			//console.log('new_TCD_TYPE:'+new_TCD_TYPE+'  new_TCD_NUMBER:'+new_TCD_NUMBER+'  new_FAULT_NUMBER:'+new_FAULT_NUMBER);
			WL.Toast.show('TCD码信息不能有空');
			return;
		};
		
		
		var NUMBER = Ext.getCmp('FAULT_NUMBER').getValue();
		var FaultListStore=Ext.data.StoreManager.get('FaultListStore');
		if (!FaultListStore) { 
			FaultListStore = Ext.create("HelcPDA.store.fault.FaultListStore"); 
		}; 
		var TCDlist = FaultListStore.data.items;
		var Fault_TcdContainer=document.getElementById('Fault_TcdContainer');
		var TCDArray = [];
		if(TCDlist.length==0){
			if(NUMBER == ""){
				WL.Toast.show("请添加TCD配件");
				return;
			}
			if(NUMBER != ""){
				obj.Add_fault();
				var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
				for(var i =0;i<TCDlist.length;i++){
					TCDArray[i] = TCDlist[i].data;
				};
				var content="{'rows':"+JSON.stringify(TCDArray)+",'ACTIVITY_ID':'"+ACTIVITY_ID+"'}";
			  	var getResult=function(res){
			  		var str=res.msginfo;
			 		WL.Toast.show(str);
			  		if(TCDArray.length>0){
			 			Fault_TcdContainer.innerHTML="故障现象("+TCDlist.length+")";
			 			Fault_TcdContainer.style.color='red';
			  		}else{
			 			Fault_TcdContainer.innerHTML="故障现象";
			 			Fault_TcdContainer.style.color='';
			 		}
			  	};
			  	this.connectServer(getResult, 'gzbaogao_tcdAction.do?method=toAdds', content);
			  	return;
			}
		}else{
			if(NUMBER != ""){
				obj.Add_fault();
				for(var i =0;i<TCDlist.length;i++){
					TCDArray[i] = TCDlist[i].data;
				};
				var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
			  	var content="{'rows':"+JSON.stringify(TCDArray)+",'ACTIVITY_ID':'"+ACTIVITY_ID+"'}";
			  	var getResult=function(res){
			  		var str=res.msginfo;
			 		WL.Toast.show(str);
			 		if(TCDArray.length>0){
			 			Fault_TcdContainer.innerHTML="故障现象("+TCDlist.length+")";
			 			Fault_TcdContainer.style.color='red';
			  		}else{
			 			Fault_TcdContainer.innerHTML="故障现象";
			 			Fault_TcdContainer.style.color='';
			 		}
			  	};
			  	this.connectServer(getResult, 'gzbaogao_tcdAction.do?method=toAdds', content);
			  	return;
			}
			if(NUMBER == ""){
				for(var i =0;i<TCDlist.length;i++){
					TCDArray[i] = TCDlist[i].data;
				};
				var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
			  	var content="{'rows':"+JSON.stringify(TCDArray)+",'ACTIVITY_ID':'"+ACTIVITY_ID+"'}";
			  	var getResult=function(res){
			  		var str=res.msginfo;
			 		WL.Toast.show(str);
			 		if(TCDArray.length>0){
			 			Fault_TcdContainer.innerHTML="故障现象("+TCDlist.length+")";
			 			Fault_TcdContainer.style.color='red';
			  		}else{
			 			Fault_TcdContainer.innerHTML="故障现象";
			 			Fault_TcdContainer.style.color='';
			 		}
			  	};
			  	this.connectServer(getResult, 'gzbaogao_tcdAction.do?method=toAdds', content);
				return;
			}
		}
	},
	
	
	//保存故障
	Add_fault : function(){
		var FaultListStore=Ext.data.StoreManager.get('FaultListStore');
		if (!FaultListStore) { 
			FaultListStore = Ext.create("HelcPDA.store.fault.FaultListStore"); 
		};
		var TCDlist = FaultListStore.data.items;
		var new_data =[];
		var new_TCD_TYPE=Ext.getCmp("TCD_TYPE").getValue();
		var new_TCD_NUMBER=Ext.getCmp("TCD_NUMBER").getValue();
		var new_FAULT_NUMBER=Ext.getCmp("FAULT_NUMBER").getValue();
		 
		if(new_FAULT_NUMBER==""||new_FAULT_NUMBER==null||typeof(new_FAULT_NUMBER)=="undefined"){
			WL.Toast.show("故障码不能为空"); 
    		return;
    	}	

		var length_ = TCDlist.length;
    	for(var i=0;i<length_;i++){
    		
    		var newdata_item = {};
    		var TCD_TYPE = TCDlist[i].data.TCD_TYPE;
	    	var TCD_NUMBER=TCDlist[i].data.TCD_NUMBER;
	    	var FAULT_NUMBER=TCDlist[i].data.FAULT_NUMBER;
	    	
    		newdata_item.TCD_TYPE = TCD_TYPE; 
    		newdata_item.TCD_NUMBER=TCD_NUMBER;
    		newdata_item.FAULT_NUMBER=FAULT_NUMBER;
    		new_data[i]=newdata_item;
    	}
    	
    	new_data[length_] ={TCD_TYPE:new_TCD_TYPE,TCD_NUMBER:new_TCD_NUMBER,FAULT_NUMBER:new_FAULT_NUMBER};
    	TCDlist = new_data; 
		
		FaultListStore.setData(TCDlist);
		var Fault_TcdContainer=document.getElementById('Fault_TcdContainer');
		if(TCDlist.length>0){
 			Fault_TcdContainer.innerHTML="故障现象("+TCDlist.length+")";
 			Fault_TcdContainer.style.color='red';
  		}else{
 			Fault_TcdContainer.innerHTML="故障现象";
 			Fault_TcdContainer.style.color='';
 		}
		WL.Toast.show("增加成功"); 
	},
	
	//删除选中故障
	FaultList : function(obj, index, target, record, e, eOpts ){
	    	var FaultListStore=Ext.data.StoreManager.get('FaultListStore');
			if (!FaultListStore) { 
				FaultListStore = Ext.create("HelcPDA.store.fault.FaultListStore"); 
			};
			var TCDlist = FaultListStore.data.items;
			if(event.target.id=="1"){
//				navigator.notification.confirm('删除信息？',function(btn){
//		 			if(btn ==2){
		 				FaultListStore.removeAt(index);
		 				var Fault_TcdContainer=document.getElementById('Fault_TcdContainer');
		 				if(TCDlist.length>0){
		 		 			Fault_TcdContainer.innerHTML="故障现象("+TCDlist.length+")";
		 		 			Fault_TcdContainer.style.color='red';
		 		  		}else{
		 		 			Fault_TcdContainer.innerHTML="故障现象";
		 		 			Fault_TcdContainer.style.color='';
		 		 		}
//		 			}else{
//		 				return;
//		 			}
//		 		},"提示","取消,确定");
//				Ext.Msg.confirm('','删除信息？',function(btn){
//					if (btn == 'yes'){
//						FaultListStore.removeAt(index);
//			            TCDlist.splice(index, 1);
//					}else{
//						return;
//					}
//				});
			}else{
				 Ext.getCmp('TCD_tabP').setActiveItem(Ext.getCmp('TCD_info'));
				 Ext.getCmp('TCD_TYPE').setValue(FaultListStore.getAt(index).get('TCD_TYPE'));
		         Ext.getCmp('TCD_NUMBER').setValue(FaultListStore.getAt(index).get('TCD_NUMBER'));
		         Ext.getCmp('FAULT_NUMBER').setValue(FaultListStore.getAt(index).get('FAULT_NUMBER'));
		         Ext.getCmp('TCDhidddenListIndex').setValue(index);
			}
	    },
	    
	//修改故障
	Modify_fault:function(obj,e,eOpts){
		var FaultListStore=Ext.data.StoreManager.get('FaultListStore');
		if (!FaultListStore) { 
			FaultListStore = Ext.create("HelcPDA.store.fault.FaultListStore"); 
		};
		var TCDlist = FaultListStore.data.items;	
		var TCD_TYPE=Ext.getCmp("TCD_TYPE").getValue();
		var TCD_NUMBER=Ext.getCmp("TCD_NUMBER").getValue();
		var FAULT_NUMBER=Ext.getCmp("FAULT_NUMBER").getValue();
		
		if(FAULT_NUMBER==""||FAULT_NUMBER==null||typeof(FAULT_NUMBER)=="undefined"){
			WL.Toast.show("故障码不能为空"); 
    		return;
    	}	
	    	
	    var newData={TCD_TYPE:TCD_TYPE,TCD_NUMBER:TCD_NUMBER,FAULT_NUMBER:FAULT_NUMBER};
	    
	    var index=Ext.getCmp('TCDhidddenListIndex').getValue();
	    //当不经过index选取，保存后直接点击修改时
	    if(index==""||index==null||typeof(index)=="undefined"){
	    	WL.Toast.show("请先选择要修改的对象");
	    	return;
	    }else{
	    	TCDlist.splice(index,1,newData);
	    }
	    FaultListStore.setData(TCDlist);
	    Ext.getCmp('TCDhidddenListIndex').setValue('');
	},
	
	
	Back_FRP : function(){
		this.showBackView('faultHandlingReportPanel','HelcPDA.view.fault.FaultHandlingReportPanel');
	},
	
//根据TCD类型查询TCD码编号
	TCD_TYPE : function(){
		var TCD_TYPE=Ext.getCmp("TCD_TYPE").getValue();
		var content = "{'TCD_TYPE':'" + TCD_TYPE + "'}";
	  	var getResult=function(res){
	       	 var arr=res.rows;
	    	 var data="[";
	   		 for(var i=0;i<arr.length;i++){
	   			if(i!=arr.length-1){
	   				data+="{'value':'"+arr[i].TCD_CODE+"','text':'"+arr[i].TCD_CODE+"'},";
	   			}else{
	   				data+="{'value':'"+arr[i].TCD_CODE+"','text':'"+arr[i].TCD_CODE+"'}";
	   			}
	   		 }
	    	data+="]";
	    	var str = eval(data);
	    	
	    	Ext.getCmp('TCD_NUMBER').setOptions(str);
	  		
	  	};
	  	this.connectServer(getResult, 'gzbaogao_tcdAction.do?method=tofind_tcd', content);
	},
	
	
	
//进入TCD码页面，加载TCD码所有类型
	TCD: function() {
		var obj=this;
		obj.NextView('faultHandlingReportPanelTCD','HelcPDA.view.fault.FaultHandlingReportPanelTCD');
		Ext.Viewport.removeMenu('right');
         var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
 	  	 var content=JSON.stringify({iswhere:"WHERE ACTIVITY_ID='"+ACTIVITY_ID+"'"});
 		 var FaultListStore=Ext.data.StoreManager.get('FaultListStore');
	  		 if (!FaultListStore) { 
	  		 	 FaultListStore = Ext.create("HelcPDA.store.fault.FaultListStore"); 
	  		 }; 
 	  	 var TCDlist = FaultListStore.data.items;	
 		var Fault_TcdContainer=document.getElementById('Fault_TcdContainer');
		if(TCDlist.length>0){
 			Fault_TcdContainer.innerHTML="故障现象("+TCDlist.length+")";
 			Fault_TcdContainer.style.color='red';
  		}else{
 			Fault_TcdContainer.innerHTML="故障现象";
 			Fault_TcdContainer.style.color='';
 		}
 	  	 var getResult=function(res){
 	  		 FaultListStore.setData(res.rows);
 	  		var TCDlist=res.rows;
 	  		var Fault_TcdContainer=document.getElementById('Fault_TcdContainer');
 			if(TCDlist.length>0){
 	 			Fault_TcdContainer.innerHTML="故障现象("+TCDlist.length+")";
 	 			Fault_TcdContainer.style.color='red';
 	  		}else{
 	 			Fault_TcdContainer.innerHTML="故障现象";
 	 			Fault_TcdContainer.style.color='';
 	 		}
 	         var content="{}";
 	         var getResult2=function(res){
 	        	 var arr=res.rows;
 	        	 var data="[";
 	       		 for(var i=0;i<arr.length;i++){
 	       			if(i!=arr.length-1){
 	       				data+="{'value':'"+arr[i].TCD_TYPE+"','text':'"+arr[i].TCD_TYPE+"'},";
 	       			}else{
 	       				data+="{'value':'"+arr[i].TCD_TYPE+"','text':'"+arr[i].TCD_TYPE+"'}";
 	       			}
 	       		 }
 	        	data+="]";
 	        	var str = eval(data);
 	        	
 	        	Ext.getCmp('TCD_TYPE').setOptions(str);
 	         };
 	        obj.connectServer(getResult2, 'gzbaogao_tcdAction.do?method=tofind_tcdtype', content);
 	         
 	  	 };
 	  	 this.connectServer(getResult, 'gzbaogao_tcdAction.do?method=toSearch', content);
     }
	  
});