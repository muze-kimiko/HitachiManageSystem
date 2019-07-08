
/* JavaScript content from app/controller/maintainSpecial/MmintainSpecialDetailCtrl.js in folder common */
Ext.define('HelcPDA.controller.maintainSpecial.MmintainSpecialDetailCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		control:{
			//删除专项保障
			"button#msd_delete":{
				tap:'msd_delete'
			},
			//提交专项保障，更新修改
			"button#ms_commit":{
				tap:'ms_commit'
			},
			//点击list进去录入页面
			"list#MmintainSpecialList":{
				itemtap:'MmintainSpecialList'
			},
			//根据站加载工作人员1
			"selectfield#msd_STATION_ID":{
				change:'msd_STATION_ID'
			},
			//根据站加载工作人员2
			"selectfield#msd_STATION_ID2":{
				change:'msd_STATION_ID2'
			},
			//监听
			"togglefield#msd_jmjx":{
				change:'msd_jmjx'
			},
			"togglefield#msd_tm":{
				change:'msd_tm'
			},
			"togglefield#msd_aqhl":{
				change:'msd_aqhl'
			},
			"togglefield#msd_kzg":{
				change:'msd_kzg'
			},
			
		}
	},
	
	msd_delete : function(){
		var obj = this;
		navigator.notification.confirm("删除本条数据?",function(btn){
 			if(btn ==2){
 				var ASSET_NUM = Ext.getCmp('msd_ASSET_NUM').getValue();
 				var FAULT_TYPE=Ext.getCmp('msd_FAULT_TYPE').getValue();
 				var ROW_ID = Ext.getCmp('msd_ROW_ID').getValue();
 				contentdata={ROW_ID:ROW_ID,USERID:userid,HQFlag:HQFlag};
 				var content= JSON.stringify(contentdata);
 				
 				var getResult=function(res){
 					 WL.Toast.show(res.msginfo);
 					 obj.BackView();
 					 obj.getApplication().getController('maintainSpecial.MmintainSpecialListCtrl').LoadList(obj,ASSET_NUM,FAULT_TYPE);
 				};
 				
 				obj.connectServer(getResult, 'maintainSpecialAction.do?method=toDelete', content);
 			}else{
 				return;
 			}
 		},"删除数据","取消,确定");
//		Ext.Msg.confirm('提示','确定删除数据?',
//			function(btn){
//			if(btn=="yes"){
// 				var ASSET_NUM = Ext.getCmp('msd_ASSET_NUM').getValue();
// 				var ROW_ID = Ext.getCmp('msd_ROW_ID').getValue();
// 				var FAULT_TYPE=Ext.getCmp('msd_FAULT_TYPE').getValue();
// 				contentdata={ROW_ID:ROW_ID,USERID:userid,HQFlag:HQFlag};
// 				var content= JSON.stringify(contentdata);
// 				
// 				var getResult=function(res){
// 			    WL.Toast.show(res.msginfo);
// 				obj.BackView();
// 			    obj.getApplication().getController('maintainSpecial.MmintainSpecialListCtrl').LoadList(obj,ASSET_NUM,FAULT_TYPE);
// 				}
// 				obj.connectServer(getResult, 'maintainSpecialAction.do?method=toDelete', content);
//			
//			}
//		});

		
		//		}
		
	},
	
	ms_commit : function(){
		var obj = this;
		navigator.notification.confirm("确定修改，提交数据?",function(btn){
 			if(btn ==2){
 				var ASSET_NUM = Ext.getCmp('msd_ASSET_NUM').getValue();
 				var ROW_ID = Ext.getCmp('msd_ROW_ID').getValue();
 				var JMJX_FLAG = Ext.getCmp('msd_jmjx').getValue();
 				var JMJX_SCORE = Ext.getCmp('msd_jmjx_SCORE').getValue();
 				var TM_FLAG = Ext.getCmp('msd_tm').getValue();
 				var TM_SCORE = Ext.getCmp('msd_tm_FS').getValue();
 				var AQHL_FLAG = Ext.getCmp('msd_aqhl').getValue();
 				var AQHL_SCORE = Ext.getCmp('msd_aqhl_FS').getValue();
 				var KZG_FLAG = Ext.getCmp('msd_kzg').getValue();
 				var KZG_SCORE = Ext.getCmp('msd_kzg_FS').getValue();
 				var LAST_UPDATE_DATE = Ext.Date.format(new Date(),'Y-m-d');
 				var FINISH_DATE = null;
 				if(Ext.getCmp('msd_FINISH_DATE').getValue()==null){
 				}else{
 					FINISH_DATE = Ext.Date.format(new Date(Ext.getCmp('msd_FINISH_DATE').getValue()),'Y-m-d h:m:s');
 				}
 				//站
 				var STATION1 = Ext.getCmp('msd_STATION_ID').getValue();
 				var STATION2 = Ext.getCmp('msd_STATION_ID2').getValue();
 				var STATION1_NAME = null;
 				var STATION1_ID = null;
 				var STATION_NAME2 = null;
 				var STATION_ID2 = null;
 				if(STATION1==null||STATION1==""){
 				}else{
 					STATION1_NAME = Ext.getCmp('msd_STATION_ID')._value.data.text;
 					STATION1_ID = Ext.getCmp('msd_STATION_ID')._value.data.value;
 				}
 				if(STATION2==null||STATION2==""){
 				}else{
 					STATION_NAME2 = Ext.getCmp('msd_STATION_ID2')._value.data.text;
 					STATION_ID2 = Ext.getCmp('msd_STATION_ID2')._value.data.value;
 				}
 				//工作人员
 				var WORKER1 = Ext.getCmp('msd_WORKER1').getValue();
 				var WORKER2 = Ext.getCmp('msd_WORKER2').getValue();
 				var WORKER1_NAME = null;
 				var WORKER1_ID = null;
 				var WORKER2_NAME = null;
 				var WORKER2_ID = null;
 				if(WORKER1==null||WORKER1==""){
 				}else{
 					WORKER1_NAME = Ext.getCmp('msd_WORKER1')._value.data.text;
 					WORKER1_ID = Ext.getCmp('msd_WORKER1')._value.data.value;
 				}
 				if(WORKER2==null||WORKER2==""){
 				}else{
 					WORKER2_NAME = Ext.getCmp('msd_WORKER2')._value.data.text;
 					WORKER2_ID = Ext.getCmp('msd_WORKER2')._value.data.value;
 				}
 				
 				var FINISH_FLAG = Ext.getCmp('msd_FINISH').getValue();
 				
 				
 				var FAULT_TYPE=Ext.getCmp('msd_FAULT_TYPE').getValue();
 				contentdata={FAULT_TYPE:FAULT_TYPE,ROW_ID:ROW_ID,JMJX_FLAG:JMJX_FLAG,TM_FLAG:TM_FLAG,AQHL_FLAG:AQHL_FLAG,
 						KZG_FLAG:KZG_FLAG,FINISH_DATE:FINISH_DATE,WORKER1_NAME:WORKER1_NAME,WORKER1_ID:WORKER1_ID,
 						WORKER2_NAME:WORKER2_NAME,WORKER2_ID:WORKER2_ID,FINISH_FLAG:FINISH_FLAG,USERID:userid,
 						JMJX_SCORE:JMJX_SCORE,TM_SCORE:TM_SCORE,AQHL_SCORE:AQHL_SCORE,KZG_SCORE:KZG_SCORE,LAST_UPDATE_DATE:LAST_UPDATE_DATE,
 						STATION1_NAME:STATION1_NAME,STATION1_ID:STATION1_ID,STATION_NAME2:STATION_NAME2,STATION_ID2:STATION_ID2};
 				var content= JSON.stringify(contentdata);
 				
 				var getResult=function(res){
 					 WL.Toast.show("提交成功");
 					 obj.BackView();
 					 obj.getApplication().getController('maintainSpecial.MmintainSpecialListCtrl').LoadList(obj,ASSET_NUM,FAULT_TYPE);
 				};
 				
 				obj.connectServer(getResult, 'maintainSpecialAction.do?method=toUpdate', content);
 			}else{
 				return;
 			}
 		},"提交","取消,确定");
		
	},
	
	
	MmintainSpecialList : function(obj,index,target,record,e,eOpts){
		var obj = this;
		obj.NextView('MmintainSpecialDetail_V_id','HelcPDA.view.maintainSpecial.MmintainSpecialDetail_V');
//		if(HQFlag!="Y" && rem1.indexOf('专项') <0){
//			Ext.getCmp('msd_jmjx_SCORE').setHidden(true);
//			Ext.getCmp('msd_tm_FS').setHidden(true);
//			Ext.getCmp('msd_aqhl_FS').setHidden(true);
//			Ext.getCmp('msd_kzg_FS').setHidden(true);
//		}
		var MmintainSpecialStore = obj.getStore('MmintainSpecialStore','HelcPDA.store.maintainSpecial.MmintainSpecialStore');
		var ASSET_NUM=MmintainSpecialStore.getAt(index).get('ASSET_NUM');
		var AGREE_NUM=MmintainSpecialStore.getAt(index).get('AGREE_NUM');
		var ACTUAL_DATE=MmintainSpecialStore.getAt(index).get('ACTUAL_DATE');
		var FINISH_FLAG=MmintainSpecialStore.getAt(index).get('FINISH_FLAG');
		var JMJX_FLAG=MmintainSpecialStore.getAt(index).get('JMJX_FLAG');
		var JMJX_SCORE=MmintainSpecialStore.getAt(index).get('JMJX_SCORE');
		var TM_FLAG=MmintainSpecialStore.getAt(index).get('TM_FLAG');
		var TM_SCORE=MmintainSpecialStore.getAt(index).get('TM_SCORE');
		var AQHL_FLAG=MmintainSpecialStore.getAt(index).get('AQHL_FLAG');
		var AQHL_SCORE=MmintainSpecialStore.getAt(index).get('AQHL_SCORE');
		var KZG_FLAG=MmintainSpecialStore.getAt(index).get('KZG_FLAG');
		var KZG_SCORE=MmintainSpecialStore.getAt(index).get('KZG_SCORE');
		var ACTUAL_EMP_ID1=MmintainSpecialStore.getAt(index).get('ACTUAL_EMP_ID1');
		var ACTUAL_EMP_ID2=MmintainSpecialStore.getAt(index).get('ACTUAL_EMP_ID2');
		var ACTUAL_EMP_STATION_ID1=MmintainSpecialStore.getAt(index).get('ACTUAL_EMP_STATION_ID1');
		var ACTUAL_EMP_STATION_ID2=MmintainSpecialStore.getAt(index).get('ACTUAL_EMP_STATION_ID2');
		var ROW_ID=MmintainSpecialStore.getAt(index).get('ROW_ID');
		var FAULT_TYPE=MmintainSpecialStore.getAt(index).get('FAULT_TYPE');
		Ext.getCmp('msd_FAULT_TYPE').setValue(FAULT_TYPE);
		if(ACTUAL_EMP_ID1==null||ACTUAL_EMP_ID1==""||typeof(ACTUAL_EMP_ID1)=="undefined"){
			Ext.getCmp('msd_WORKER1_flg').setValue(1);
		}else{
			Ext.getCmp('msd_WORKER1_flg').setValue(0);
		}
		if(ACTUAL_EMP_ID2==null||ACTUAL_EMP_ID2==""||typeof(ACTUAL_EMP_ID2)=="undefined"){
			Ext.getCmp('msd_WORKER2_flg').setValue(1);
		}else{
			Ext.getCmp('msd_WORKER2_flg').setValue(0);
		}
		Ext.getCmp('msd_ROW_ID').setValue(ROW_ID);
		Ext.getCmp('msd_ASSET_NUM').setValue(ASSET_NUM);
		Ext.getCmp('msd_AGREE_NUM').setValue(AGREE_NUM);
		if(ACTUAL_DATE==""){
			Ext.getCmp('msd_FINISH_DATE').setValue(null);
		}else{
			Ext.getCmp('msd_FINISH_DATE').setValue(new Date(ACTUAL_DATE));
		}
		Ext.getCmp('msd_jmjx').setValue(JMJX_FLAG);
		Ext.getCmp('msd_jmjx_SCORE').setValue(JMJX_SCORE);
		Ext.getCmp('msd_tm').setValue(TM_FLAG);
		Ext.getCmp('msd_tm_FS').setValue(TM_SCORE);
		Ext.getCmp('msd_aqhl').setValue(AQHL_FLAG);
		Ext.getCmp('msd_aqhl_FS').setValue(AQHL_SCORE);
		Ext.getCmp('msd_kzg').setValue(KZG_FLAG);
		Ext.getCmp('msd_kzg_FS').setValue(KZG_SCORE);
		if(FINISH_FLAG=="未完成"){
			Ext.getCmp('msd_FINISH').setValue(0);
		}else if(FINISH_FLAG =="已完成"){
			Ext.getCmp('msd_FINISH').setValue(1);
		}
		
		Ext.getCmp('select_person').setTitle('人员选择(加载中...)');
		
		contentdata={ASSET_NUM:ASSET_NUM};
		var content= JSON.stringify(contentdata);
		
		var getResult=function(res){
			 var arr=res.rows;
	    	 var data="[{'value':'','text':'请选择'},";
	   		 for(var i=0;i<arr.length;i++){
	   			if(i!=arr.length-1){
	   				data+="{'value':'"+arr[i].STATION_CODE+"','text':'"+arr[i].STATION_NAME+"'},";
	   			}else{
	   				data+="{'value':'"+arr[i].STATION_CODE+"','text':'"+arr[i].STATION_NAME+"'}";
	   			}
	   		 }
	    	data+="]";
	    	var str = eval(data);
	    	
	    	Ext.getCmp('msd_STATION_ID').setOptions(str);
	    	Ext.getCmp('msd_STATION_ID2').setOptions(str);

	    	setTimeout(function(){
	    		if(ACTUAL_EMP_STATION_ID1!=null){
		    		Ext.getCmp('msd_STATION_ID').setValue(ACTUAL_EMP_STATION_ID1);
		    	}else{
		    		var HQdata="[{'value':'"+person_id+"',text:'"+username1+"'}]";
					var str = eval(HQdata);
					Ext.getCmp('msd_WORKER1').setOptions(str);
					Ext.getCmp('msd_WORKER1').setValue(person_id);
		    	}
	    		if(ACTUAL_EMP_ID1!=null){
		    		Ext.getCmp('msd_WORKER1_id_hidden').setValue(ACTUAL_EMP_ID1);
		    	}
	    	}, 1500);
	    	setTimeout(function(){
		    	if(ACTUAL_EMP_STATION_ID2!=null){
		    		Ext.getCmp('msd_STATION_ID2').setValue(ACTUAL_EMP_STATION_ID2);
		    	}

		    	if(ACTUAL_EMP_ID2!=null){
		    		Ext.getCmp('msd_WORKER2_id_hidden').setValue(ACTUAL_EMP_ID2);
		    	}
	    	}, 1500);
	    	
		};
		this.connectServer(getResult, 'maintainSpecialAction.do?method=toSearchStation', content);
		
	},
	
	
	msd_STATION_ID : function(obj, newValue, oldValue, eOpts ){
		var obj = this;
		var STATION_ID = Ext.getCmp('msd_STATION_ID').getValue();
		contentdata={STATION_ID:STATION_ID};
		var content= JSON.stringify(contentdata);
		
		var getResult=function(res){
			 var arr=res.rows;
	    	 var data="[{'value':'','text':'请选择'},";
	   		 for(var i=0;i<arr.length;i++){
	   			if(i!=arr.length-1){
	   				data+="{'value':'"+arr[i].PERSON_ID+"','text':'"+arr[i].PERSON_NAME+"'},";
	   			}else{
	   				data+="{'value':'"+arr[i].PERSON_ID+"','text':'"+arr[i].PERSON_NAME+"'}";
	   			}
	   		 }
	    	data+="]";
	    	var str = eval(data);
	    		
	    	if(Ext.getCmp('msd_WORKER1_flg').getValue()==0){
	    		Ext.getCmp('msd_WORKER1_flg').setValue(1);
	    	}else if(Ext.getCmp('msd_WORKER1_flg').getValue()==1){
	    		Ext.getCmp('msd_WORKER1').setOptions(str);
	    		for(var i=0;i<str.length;i++){
	    			if(str[i].value==Ext.getCmp('msd_WORKER1_id_hidden').getValue()){
	    				Ext.getCmp('msd_WORKER1').setValue(Ext.getCmp('msd_WORKER1_id_hidden').getValue());
	    				Ext.getCmp('msd_WORKER1_flg').setValue(2);
	    			}
	    		}
	    	}else{
	    		Ext.getCmp('msd_WORKER1').setOptions(str);
	    	}
	    	Ext.getCmp('select_person').setTitle('人员选择');
		};
		obj.asyconnectServer(getResult, 'maintainSpecialAction.do?method=toSearchPersonByStation', content);
		
	},
	
	
	msd_STATION_ID2 : function(obj, newValue, oldValue, eOpts ){
		var obj = this;
		var STATION_ID = Ext.getCmp('msd_STATION_ID2').getValue();
		contentdata={STATION_ID:STATION_ID};
		var content= JSON.stringify(contentdata);
		
		var getResult=function(res){
			 var arr=res.rows;
	    	 var data="[{'value':'','text':'请选择'},";
	   		 for(var i=0;i<arr.length;i++){
	   			if(i!=arr.length-1){
	   				data+="{'value':'"+arr[i].PERSON_ID+"','text':'"+arr[i].PERSON_NAME+"'},";
	   			}else{
	   				data+="{'value':'"+arr[i].PERSON_ID+"','text':'"+arr[i].PERSON_NAME+"'}";
	   			}
	   		 }
	    	data+="]";
	    	var str = eval(data);
	    	
	    	if(Ext.getCmp('msd_WORKER2_flg').getValue()==0){
	    		Ext.getCmp('msd_WORKER2_flg').setValue(1);
	    	}else if(Ext.getCmp('msd_WORKER2_flg').getValue()==1){
	    		Ext.getCmp('msd_WORKER2').setOptions(str);
	    		for(var i=0;i<str.length;i++){
	    			if(str[i].value==Ext.getCmp('msd_WORKER2_id_hidden').getValue()){
	    				Ext.getCmp('msd_WORKER2').setValue(Ext.getCmp('msd_WORKER2_id_hidden').getValue());
	    				Ext.getCmp('msd_WORKER2_flg').setValue(2);
	    			}
	    		}
	    	}else{
	    		Ext.getCmp('msd_WORKER2').setOptions(str);
	    	}
		};
		setTimeout(function(){
			obj.asyconnectServer(getResult, 'maintainSpecialAction.do?method=toSearchPersonByStation', content);
    		}, 100);
	},
	
	
	//监听四个作业项，全部做完状态才更改为已完成
	msd_jmjx : function( obj, newValue, oldValue, eOpts ){
		var msd_jmjx = Ext.getCmp('msd_jmjx').getValue();
		var msd_tm = Ext.getCmp('msd_tm').getValue();
		var msd_aqhl = Ext.getCmp('msd_aqhl').getValue();
		var msd_kzg = Ext.getCmp('msd_kzg').getValue();
		if(msd_jmjx==1 && msd_tm==1 && msd_aqhl==1 && msd_kzg==1){
			Ext.getCmp('msd_FINISH').setValue(1);
		}else{
			Ext.getCmp('msd_FINISH').setValue(0);
		}
	},
	msd_tm : function( obj, newValue, oldValue, eOpts ){
		var msd_jmjx = Ext.getCmp('msd_jmjx').getValue();
		var msd_tm = Ext.getCmp('msd_tm').getValue();
		var msd_aqhl = Ext.getCmp('msd_aqhl').getValue();
		var msd_kzg = Ext.getCmp('msd_kzg').getValue();
		if(msd_jmjx==1 && msd_tm==1 && msd_aqhl==1 && msd_kzg==1){
			Ext.getCmp('msd_FINISH').setValue(1);
		}else{
			Ext.getCmp('msd_FINISH').setValue(0);
		}
	},
	msd_aqhl : function( obj, newValue, oldValue, eOpts ){
		var msd_jmjx = Ext.getCmp('msd_jmjx').getValue();
		var msd_tm = Ext.getCmp('msd_tm').getValue();
		var msd_aqhl = Ext.getCmp('msd_aqhl').getValue();
		var msd_kzg = Ext.getCmp('msd_kzg').getValue();
		if(msd_jmjx==1 && msd_tm==1 && msd_aqhl==1 && msd_kzg==1){
			Ext.getCmp('msd_FINISH').setValue(1);
		}else{
			Ext.getCmp('msd_FINISH').setValue(0);
		}
	},
	msd_kzg : function( obj, newValue, oldValue, eOpts ){
		var msd_jmjx = Ext.getCmp('msd_jmjx').getValue();
		var msd_tm = Ext.getCmp('msd_tm').getValue();
		var msd_aqhl = Ext.getCmp('msd_aqhl').getValue();
		var msd_kzg = Ext.getCmp('msd_kzg').getValue();
		if(msd_jmjx==1 && msd_tm==1 && msd_aqhl==1 && msd_kzg==1){
			Ext.getCmp('msd_FINISH').setValue(1);
		}else{
			Ext.getCmp('msd_FINISH').setValue(0);
		}
	},
});