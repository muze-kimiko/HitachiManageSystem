
/* JavaScript content from app/controller/maintainSpecial/MmintainSpecialAddCtrl.js in folder common */
Ext.define('HelcPDA.controller.maintainSpecial.MmintainSpecialAddCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		control:{
			//根据页面输入项查询信息
			"button#msa_search_info":{
				tap:'msa_search_info'
			},
			//添加专项保障
			"button#msa_toAdd":{
				tap:'msa_toAdd'
			},
			//进入添加页面
			"button#btn_ZXBZ_add":{
				tap:'btn_ZXBZ_add'
			},
			//模糊查询工号带出合同号
			"button#btn_msa_search":{
				tap:'btn_msa_search'
			},
			//点击list添加到页面上
			"list#msa_serach_List":{
				itemtap:'msa_serach_List'
			},
			//点击list添加到页面上
			"list#serach_AssetNumList_add":{
				itemtap:'serach_AssetNumList_add'
			},
			//根据站加载工作人员1
			"selectfield#msa_STATION_ID":{
				change:'msa_STATION_ID'
			},
			//根据站加载工作人员2
			"selectfield#msa_STATION_ID2":{
				change:'msa_STATION_ID2'
			},
			//监听
			"togglefield#msa_JMJX":{
				change:'msa_JMJX'
			},
			"togglefield#msa_TM":{
				change:'msa_TM'
			},
			"togglefield#msa_AQHL":{
				change:'msa_AQHL'
			},
			"togglefield#msa_KZG":{
				change:'msa_KZG'
			},
			
		}
	},
	
	serach_AssetNumList_add : function(obj,index,target,record,e,eOpts){
		var obj = this;
		var store = obj.getStore("AssetNumStore","HelcPDA.store.maintainSpecial.AssetNumStore");
		var ASSET_NUM=store.getAt(index).get('ASSET_NUM');
		var Array = ASSET_NUM.split('/');
		Ext.getCmp('msa_ASSET_NUM').setValue(Array[0]);
		Ext.getCmp('msa_AGREE_NUM').setValue(Array[1]);
		Ext.getCmp('msa_ACCNT').setValue(Array[2]);
		Ext.getCmp('msa_DOMAIN').setValue(Array[3]);
		Ext.getCmp('msa_STATION').setValue(Array[4]);
		Ext.getCmp('msa_MP_TYPE').setValue(Array[5]);
		Ext.getCmp('Panel_List_Id').destroy();
		
		var FOREDAY=new Date(); // 获取今天时间
		FOREDAY.setMonth(FOREDAY.getMonth() -5); 
		FUTUREDATE=Ext.Date.format(new Date(),'Y-m-d');
		contentdata={ASSET_NUM:Array[0],FOREDAY:Ext.Date.format(FOREDAY,'Y-m-d'),FUTUREDATE:FUTUREDATE};
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
	    	
	    	Ext.getCmp('msa_STATION_ID').setOptions(str);
	    	Ext.getCmp('msa_STATION_ID2').setOptions(str);
	    	
	    	//所属站1和作业人员1默认是登陆用户
	    	var stationId = Ext.getCmp('msa_org_station').getValue();
	    	Ext.getCmp('msa_STATION_ID').setValue(stationId);
	    	var PersonId = Ext.getCmp('msa_person_id').getValue();
	    	Ext.getCmp('msa_WORKER1').setValue(PersonId);
	    	
			HQdata="[{'value':'"+person_id+"',text:'"+username1+"'}]";
			var str = eval(HQdata);
			Ext.getCmp('msa_WORKER1').setOptions(str);
			Ext.getCmp('msa_WORKER1').setValue(person_id);
			var FAULT_TYPE=Ext.getCmp('msa_FAULT_TYPE').getValue();
			if(FAULT_TYPE=='整改'){
				function loadMsg(){
					obj.asyconnectServer(getResult1,'maintainSpecialAction.do?method=toSearchEnp_no',content);	
				}
				setTimeout(loadMsg(),2000);
			}else{
				Ext.getCmp('msa_JMJX').setValue('');
	    		Ext.getCmp('msa_JMJX_SCORE').setValue('');
	    		Ext.getCmp('msa_TM').setValue('');
	    		Ext.getCmp('msa_TM_FS').setValue('');
	    		Ext.getCmp('msa_AQHL').setValue('');
	    		Ext.getCmp('msa_AQHL_FS').setValue('');
	    		Ext.getCmp('msa_KZG').setValue('');
	    		Ext.getCmp('msa_KZG_FS').setValue('');
	    		Ext.getCmp('msa_FINISH').setValue(0);
	    		//Ext.getCmp('msa_FAULT_TYPE').setValue('');
	    		Ext.getCmp('msa_FINISH_DATE').setValue(null);
	    		Ext.getCmp('msa_toAdd').setText('添加');
	    		Ext.getCmp('msa_ROW_ID').setValue('');
	    		Ext.getCmp('msa_STATION_ID').setValue(stationId);
		    	Ext.getCmp('msa_WORKER1').setValue(person_id);
		    	Ext.getCmp('msa_STATION_ID2').setValue('');
		    	Ext.getCmp('msa_WORKER2').setValue('');
			}
		};
		
		function getResult1(res){
			var length=res.count;
			var stext=res.rows[0];
			if(length>0){
//				navigator.notification.confirm('检测到该工号曾经录入保障项目,是否带出上一次的数据进行补充录入?',function(btn){
//		 			if(btn ==2){
				Ext.Msg.confirm('提示','检测到该工号曾经录入保障项目,是否带出上一次的数据进行补充录入?',
					      function(btn){
					        if(btn=='yes'){
					    		var ASSET_NUM=stext.ASSET_NUM;
					    		var AGREE_NUM=stext.AGREE_NUM;
					    		var ACTUAL_DATE=stext.ACTUAL_DATE;
					    		var FINISH_FLAG=stext.FINISH_FLAG;
					    		var JMJX_FLAG=stext.JMJX_FLAG;
					    		var JMJX_SCORE=stext.JMJX_SCORE;
					    		var TM_FLAG=stext.TM_FLAG;
					    		var TM_SCORE=stext.TM_SCORE;
					    		var AQHL_FLAG=stext.AQHL_FLAG;
					    		var AQHL_SCORE=stext.AQHL_SCORE;
					    		var KZG_FLAG=stext.KZG_FLAG;
					    		var KZG_SCORE=stext.KZG_SCORE;
					    		var ACTUAL_EMP_ID1=stext.ACTUAL_EMP_ID1;
					    		var ACTUAL_EMP_ID2=stext.ACTUAL_EMP_ID2;
					    		var ACTUAL_EMP_NAME1=stext.ACTUAL_EMP_NAME1;
					    		var ACTUAL_EMP_NAME2=stext.ACTUAL_EMP_NAME2;
					    		var ACTUAL_EMP_STATION_ID1=stext.ACTUAL_EMP_STATION_ID1;
					    		var ACTUAL_EMP_STATION_ID2=stext.ACTUAL_EMP_STATION_ID2;
					    		var ACTUAL_EMP_STATION_NAME1=stext.ACTUAL_EMP_STATION_NAME1;
					    		var ACTUAL_EMP_STATION_NAME2=stext.ACTUAL_EMP_STATION_NAME2;
					    		var FAULT_TYPE=stext.FAULT_TYPE;
					    		var ROW_ID=stext.ROW_ID; 
					    		Ext.getCmp('msa_STATION_ID').setValue(ACTUAL_EMP_STATION_ID1);
						    	Ext.getCmp('msa_WORKER1').setValue(ACTUAL_EMP_STATION_NAME1);
						    	Ext.getCmp('msa_STATION_ID2').setValue(ACTUAL_EMP_STATION_ID2);
						    	Ext.getCmp('msa_WORKER2').setValue(ACTUAL_EMP_STATION_NAME2);
					    		Ext.getCmp('msa_FAULT_TYPE').setValue(FAULT_TYPE);
					    		setTimeout(function(){
					    			Ext.getCmp('msa_STATION_ID').setValue(ACTUAL_EMP_STATION_ID1);
						    		Ext.getCmp('msa_STATION_ID2').setValue(ACTUAL_EMP_STATION_ID2);
						    		Ext.getCmp('msa_WORKER1').setValue(ACTUAL_EMP_ID1);
						    		Ext.getCmp('msa_WORKER2').setValue(ACTUAL_EMP_ID2);
					    		},2500);
					    		Ext.getCmp('msa_ASSET_NUM').setValue(ASSET_NUM);
					    		Ext.getCmp('msa_AGREE_NUM').setValue(AGREE_NUM);
					    		if(ACTUAL_DATE==""){
					    			Ext.getCmp('msa_FINISH_DATE').setValue(null);
					    		}else{
					    			Ext.getCmp('msa_FINISH_DATE').setValue(new Date(ACTUAL_DATE));
					    		}
					    		Ext.getCmp('msa_JMJX').setValue(JMJX_FLAG);
					    		Ext.getCmp('msa_JMJX_SCORE').setValue(JMJX_SCORE);
					    		Ext.getCmp('msa_TM').setValue(TM_FLAG);
					    		Ext.getCmp('msa_TM_FS').setValue(TM_SCORE);
					    		Ext.getCmp('msa_AQHL').setValue(AQHL_FLAG);
					    		Ext.getCmp('msa_AQHL_FS').setValue(AQHL_SCORE);
					    		Ext.getCmp('msa_KZG').setValue(KZG_FLAG);
					    		Ext.getCmp('msa_KZG_FS').setValue(KZG_SCORE);
					    		if(FINISH_FLAG=="未完成"){
					    			Ext.getCmp('msa_FINISH').setValue(0);
					    		}else if(FINISH_FLAG =="已完成"){
					    			Ext.getCmp('msa_FINISH').setValue(1);
					    		}
					    		Ext.getCmp('msa_toAdd').setText('修改');
					    		Ext.getCmp('msa_ROW_ID').setValue(ROW_ID);
					        }else{
					        	var stationId = Ext.getCmp('msa_org_station').getValue();
					        	Ext.getCmp('msa_JMJX').setValue('');
					    		Ext.getCmp('msa_JMJX_SCORE').setValue('');
					    		Ext.getCmp('msa_TM').setValue('');
					    		Ext.getCmp('msa_TM_FS').setValue('');
					    		Ext.getCmp('msa_AQHL').setValue('');
					    		Ext.getCmp('msa_AQHL_FS').setValue('');
					    		Ext.getCmp('msa_KZG').setValue('');
					    		Ext.getCmp('msa_KZG_FS').setValue('');
					    		Ext.getCmp('msa_FINISH').setValue(0);
					    		//Ext.getCmp('msa_FAULT_TYPE').setValue('');
					    		Ext.getCmp('msa_FINISH_DATE').setValue(null);
					    		Ext.getCmp('msa_toAdd').setText('提交到服务器');
					    		Ext.getCmp('msa_ROW_ID').setValue('');
					    		Ext.getCmp('msa_STATION_ID').setValue(stationId);
						    	Ext.getCmp('msa_WORKER1').setValue(person_id);
						    	Ext.getCmp('msa_STATION_ID2').setValue('');
						    	Ext.getCmp('msa_WORKER2').setValue('');
						    	
					        }
		 			},"提示","取消,确定");
//					        }
//					      },this);
			}
		}
		this.connectServer(getResult,'maintainSpecialAction.do?method=toSearchStation',content);  
	},
	
	msa_search_info : function(){
		var obj = this;
		var AGREE_NUM = Ext.getCmp('msa_AGREE_NUM').getValue();
		var ASSET_NUM = Ext.getCmp('msa_ASSET_NUM').getValue();
		var ACCNT = Ext.getCmp('msa_ACCNT').getValue();
		var DOMAIN = Ext.getCmp('msa_DOMAIN').getValue();
		var STATION = Ext.getCmp('msa_STATION').getValue();
		var MP_TYPE = Ext.getCmp('msa_MP_TYPE').getValue();
		var FAULT_TYPE=Ext.getCmp('msa_FAULT_TYPE').getValue();
		contentdata={HQFlag:HQFlag,AGREE_NUM:AGREE_NUM,ASSET_NUM:ASSET_NUM,ACCNT:ACCNT,DOMAIN:DOMAIN,STATION:STATION,USERID:userid,MP_TYPE:MP_TYPE};
		var content= JSON.stringify(contentdata);
		if(FAULT_TYPE==''){
			WL.Toast.show('请选择保障类型');
			return;
		}
		var getResult=function(res){
			if(res.rows.length==0){
				WL.Toast.show("找不到对应数据！");
				return;
			};
			Ext.getCmp('msa_org_station').setValue(res.STATION_ID);
			Ext.getCmp('msa_person_id').setValue(res.PERSON_ID);
			var PanelId='AssetNumlistPanel';
        	var ListArray={};
        	ListArray.id='serach_AssetNumList_add';
        	ListArray.StoreName='AssetNumStore';
        	ListArray.StoreFullName='HelcPDA.store.maintainSpecial.AssetNumStore';
        	ListArray.StoreParam=["ASSET_NUM"];
        	var Data=res.rows;
        	obj.getList(PanelId,ListArray,Data);
         };
		
		this.connectServer(getResult, 'maintainSpecialAction.do?method=toSearchASSET_NUM', content);
	},
	
	msa_toAdd : function(){
		var obj = this;
		var msa_toAdd=Ext.getCmp('msa_toAdd').getText();
//		navigator.notification.confirm(msa_toAdd+"数据?",function(btn){
// 			if(btn ==2){
 				var ASSET_NUM = Ext.getCmp('msa_ASSET_NUM').getValue();
 				var AGREE_NUM = Ext.getCmp('msa_AGREE_NUM').getValue();
 				var FAULT_TYPE= Ext.getCmp('msa_FAULT_TYPE').getValue();//新增字段
 				if(ASSET_NUM ==""){
 					WL.Toast.show("工号不能为空");
 					return;
 				}
 				if(Ext.getCmp('msa_FINISH_DATE').getValue()=="" || Ext.getCmp('msa_FINISH_DATE').getValue()==null){
 					WL.Toast.show("请填写完成时间");
 					return;
 				} 
 				
 				Ext.getCmp('msa_WORKER1').getOptions();
 				
 				if(Ext.getCmp('msa_WORKER1').getValue()=="请选择"&&Ext.getCmp('msa_WORKER2').getValue()=="请选择"){
 					WL.Toast.show("请至少选择一名工作人员");
 					return;
 				} 
 				if(FAULT_TYPE==''){
 					WL.Toast.show("保障类型不能为空");
 					return;
 				}
 				
 				var JMJX_FLAG = Ext.getCmp('msa_JMJX').getValue();
 				var JMJX_SCORE = Ext.getCmp('msa_JMJX_SCORE').getValue();
 				var TM_FLAG = Ext.getCmp('msa_TM').getValue();
 				var TM_SCORE = Ext.getCmp('msa_TM_FS').getValue();
 				var AQHL_FLAG = Ext.getCmp('msa_AQHL').getValue();
 				var AQHL_SCORE = Ext.getCmp('msa_AQHL_FS').getValue();
 				var KZG_FLAG = Ext.getCmp('msa_KZG').getValue();
 				var KZG_SCORE = Ext.getCmp('msa_KZG_FS').getValue();
 				var LAST_UPDATE_DATE = Ext.Date.format(new Date(),'Y-m-d');
 				var FINISH_DATE = null;
 				if(Ext.getCmp('msa_FINISH_DATE').getValue()==null){
 					
 				}else{
 					FINISH_DATE = Ext.Date.format(new Date(Ext.getCmp('msa_FINISH_DATE').getValue()),'Y-m-d h:m:s');
 				}
 				var STATION_ID = Ext.getCmp('msa_STATION_ID').getValue();
 				var STATION_NAME = null;
 				var stationArr = Ext.getCmp('msa_STATION_ID').getOptions();
 				for(var i =0;i<stationArr.length;i++){
 					if(STATION_ID==stationArr[i].value){
 						STATION_NAME=stationArr[i].text;
 					}
 				}
 				var STATION_ID2 = Ext.getCmp('msa_STATION_ID2').getValue();
 				var STATION_NAME2 = null;
 				var stationArr2 = Ext.getCmp('msa_STATION_ID2').getOptions();
 				for(var i =0;i<stationArr2.length;i++){
 					if(STATION_ID2==stationArr2[i].value){
 						STATION_NAME2=stationArr2[i].text;
 					}
 				}
 				var WORKER1 = Ext.getCmp('msa_WORKER1').getValue();
 				var WORKER2 = Ext.getCmp('msa_WORKER2').getValue();
 				var WORKER1_NAME = null;
 				var WORKER1_ID = null;
 				var WORKER2_NAME = null;
 				var WORKER2_ID = null;
 				if(WORKER1==null){
 				}else{
 					WORKER1_NAME = Ext.getCmp('msa_WORKER1')._value.data.text;
 					WORKER1_ID = Ext.getCmp('msa_WORKER1')._value.data.value;
 				}
 				if(WORKER2==null){
 				}else{
 					WORKER2_NAME = Ext.getCmp('msa_WORKER2')._value.data.text;
 					WORKER2_ID = Ext.getCmp('msa_WORKER2')._value.data.value;
 				}
 				var FINISH_FLAG = Ext.getCmp('msa_FINISH').getValue();
 				var ROW_ID=Ext.getCmp('msa_ROW_ID').getValue();
 				//需要添加给修改的数据
 				var STATION1_ID=STATION_ID
 				var STATION1_NAME=STATION_NAME;
 				contentdata={ROW_ID:ROW_ID,FAULT_TYPE:FAULT_TYPE,ASSET_NUM:ASSET_NUM,AGREE_NUM:AGREE_NUM,JMJX_FLAG:JMJX_FLAG,TM_FLAG:TM_FLAG,AQHL_FLAG:AQHL_FLAG,
 						KZG_FLAG:KZG_FLAG,FINISH_DATE:FINISH_DATE,WORKER1_NAME:WORKER1_NAME,WORKER1_ID:WORKER1_ID,
 						WORKER2_NAME:WORKER2_NAME,WORKER2_ID:WORKER2_ID,FINISH_FLAG:FINISH_FLAG,USERID:userid,STATION_NAME:STATION_NAME,
 						STATION_ID:STATION_ID,STATION_NAME2:STATION_NAME2,STATION_ID2:STATION_ID2,JMJX_SCORE:JMJX_SCORE,
 						TM_SCORE:TM_SCORE,AQHL_SCORE:AQHL_SCORE,KZG_SCORE:KZG_SCORE,LAST_UPDATE_DATE:LAST_UPDATE_DATE,
 						
 						STATION1_ID:STATION1_ID,STATION1_NAME:STATION1_NAME,
 						
 				
 				};
 				var content= JSON.stringify(contentdata);
 				
 				
 				//判定是添加还是修改
                var msa_toAdd=Ext.getCmp('msa_toAdd').getText();
                var getResult=function(res){
					 WL.Toast.show(res.msginfo);
					 obj.BackView();
					 obj.getApplication().getController('maintainSpecial.MmintainSpecialListCtrl').LoadList(obj,ASSET_NUM,FAULT_TYPE);
				};
				 function getResult1(res){
					 WL.Toast.show("修改成功");
				     obj.BackView();
					 obj.getApplication().getController('maintainSpecial.MmintainSpecialListCtrl').LoadList(obj,ASSET_NUM);
					};
                if(msa_toAdd=='修改'){
                	obj.connectServer(getResult1, 'maintainSpecialAction.do?method=toUpdate', content);
                }else{
                	obj.connectServer(getResult, 'maintainSpecialAction.do?method=toAdd', content);
                }
 				
 				
 				
 				
// 			}else{
// 				return;
// 			}
// 		},msa_toAdd+'',"取消,确定");
	},
	
	btn_ZXBZ_add : function(){
		this.NextView('MmintainSpecialAdd_V_id','HelcPDA.view.maintainSpecial.MmintainSpecialAdd_V');
		Ext.getCmp('msa_worker_flg').setValue(0);
//		if(HQFlag!="Y" && rem1.indexOf('专项') <0 ){
//			Ext.getCmp('msa_JMJX_SCORE').setHidden(true);
//			Ext.getCmp('msa_TM_FS').setHidden(true);
//			Ext.getCmp('msa_AQHL_FS').setHidden(true);
//			Ext.getCmp('msa_KZG_FS').setHidden(true);
//		}
	},
	
	
	btn_msa_search : function(){
		var obj = this;
		var ASSET_NUM = Ext.getCmp('msa_search_ASSET_NUM').getValue();
		contentdata={ASSET_NUM:ASSET_NUM,USERID:userid};
		var content= JSON.stringify(contentdata);
		
		var getResult=function(res){
			 if(res.rows.length==0){
				 WL.Toast.show("请输入正确工号");
			 }else{
				 Ext.getCmp('msa_org_station').setValue(res.STATION_ID);
				 Ext.getCmp('msa_person_id').setValue(res.PERSON_ID);
				 var PanelId='AssetNumlistPanel';
	        	 var ListArray={};
	        	 ListArray.id='msa_serach_List';
	        	 ListArray.StoreName='AssetNumStore';
	        	 ListArray.StoreFullName='HelcPDA.store.maintainSpecial.AssetNumStore';
	        	 ListArray.StoreParam=["ASSET_NUM"];
	        	 var Data=res.rows;
	        	 obj.getList(PanelId,ListArray,Data);
				 
			 }
		};
		
		this.connectServer(getResult, 'maintainSpecialAction.do?method=toSearchASSET_NUM', content);
	},
	
	
	msa_serach_List : function(obj,index,target,record,e,eOpts){
		var obj = this;
		var store = obj.getStore("AssetNumStore","HelcPDA.store.maintainSpecial.AssetNumStore");
		var ASSET_NUM=store.getAt(index).get('ASSET_NUM');
		var Array = ASSET_NUM.split('/');
		Ext.getCmp('msa_ASSET_NUM').setValue(Array[0]);
		Ext.getCmp('msa_AGREE_NUM').setValue(Array[1]);
		Ext.getCmp('AssetNumlistPanel').destroy();
		var month=new Date().getMonth()-1;
		
		contentdata={ASSET_NUM:Array[0]};
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
	    	Ext.getCmp('msa_STATION_ID').setData(arr);
	    	Ext.getCmp('msa_STATION_ID2').setData(arr);
	    	
	    	//所属站1和作业人员1默认是登陆用户
	    	var station_id = Ext.getCmp('msa_org_station').getValue();
	    	Ext.getCmp('msa_STATION_ID').setValue(station_id);
	    	var person_id = Ext.getCmp('msa_person_id').getValue();
	    	Ext.getCmp('msa_WORKER1').setValue(person_id);
		};
		
		this.asyconnectServer(getResult, 'maintainSpecialAction.do?method=toSearchStation', content);
	},
	
	msa_STATION_ID : function(obj, newValue, oldValue, eOpts ){
		var STATION_ID = Ext.getCmp('msa_STATION_ID').getValue();
		if(STATION_ID==""){
		}else{
			contentdata={STATION_ID:STATION_ID};
			var content= JSON.stringify(contentdata);
			
			var getResult=function(res){
				 var arr=res.rows;
		    	 var data="[{'value':'请选择','text':'请选择'},";
		   		 for(var i=0;i<arr.length;i++){
		   			if(i!=arr.length-1){
		   				data+="{'value':'"+arr[i].PERSON_ID+"','text':'"+arr[i].PERSON_NAME+"'},";
		   			}else{
		   				data+="{'value':'"+arr[i].PERSON_ID+"','text':'"+arr[i].PERSON_NAME+"'}";
		   			}
		   		 }
		    	data+="]";
		    	var str = eval(data);
		    	Ext.getCmp('msa_WORKER1').setOptions(str);
		    	
		    	var flg = Ext.getCmp('msa_worker_flg').getValue();
				if(flg==0){
					Ext.getCmp('msa_WORKER1').setValue(Ext.getCmp('msa_person_id').getValue());
					flg++;
					Ext.getCmp('msa_worker_flg').setValue(flg);
				}else{
					flg++;
					Ext.getCmp('msa_worker_flg').setValue(flg);
				}
		    	
		    	
			};
			
			this.asyconnectServer(getResult, 'maintainSpecialAction.do?method=toSearchPersonByStation', content);
		}
		
	},
	
	
	msa_STATION_ID2 : function(obj, newValue, oldValue, eOpts ){
		var STATION_ID = Ext.getCmp('msa_STATION_ID2').getValue();
		contentdata={STATION_ID:STATION_ID};
		var content= JSON.stringify(contentdata);
		
		var getResult=function(res){
			 var arr=res.rows;
	    	 var data="[{'value':'请选择','text':'请选择'},";
	   		 for(var i=0;i<arr.length;i++){
	   			if(i!=arr.length-1){
	   				data+="{'value':'"+arr[i].PERSON_ID+"','text':'"+arr[i].PERSON_NAME+"'},";
	   			}else{
	   				data+="{'value':'"+arr[i].PERSON_ID+"','text':'"+arr[i].PERSON_NAME+"'}";
	   			}
	   		 }
	    	data+="]";
	    	var str = eval(data);
	    	
	    	Ext.getCmp('msa_WORKER2').setOptions(str);
	    
		};
		
		this.asyconnectServer(getResult, 'maintainSpecialAction.do?method=toSearchPersonByStation', content);
	},
	
	
	
	//监听四个作业项，全部做完状态才更改为已完成
	msa_JMJX : function( obj, newValue, oldValue, eOpts ){
		var msa_JMJX = Ext.getCmp('msa_JMJX').getValue();
		var msa_TM = Ext.getCmp('msa_TM').getValue();
		var msa_AQHL = Ext.getCmp('msa_AQHL').getValue();
		var msa_KZG = Ext.getCmp('msa_KZG').getValue();
		if(msa_JMJX==1 && msa_TM==1 && msa_AQHL==1 && msa_KZG==1){
			Ext.getCmp('msa_FINISH').setValue(1);
		}else{
			Ext.getCmp('msa_FINISH').setValue(0);
		}
	},
	msa_TM : function( obj, newValue, oldValue, eOpts ){
		var msa_JMJX = Ext.getCmp('msa_JMJX').getValue();
		var msa_TM = Ext.getCmp('msa_TM').getValue();
		var msa_AQHL = Ext.getCmp('msa_AQHL').getValue();
		var msa_KZG = Ext.getCmp('msa_KZG').getValue();
		if(msa_JMJX==1 && msa_TM==1 && msa_AQHL==1 && msa_KZG==1){
			Ext.getCmp('msa_FINISH').setValue(1);
		}else{
			Ext.getCmp('msa_FINISH').setValue(0);
		}
	},
	msa_AQHL : function( obj, newValue, oldValue, eOpts ){
		var msa_JMJX = Ext.getCmp('msa_JMJX').getValue();
		var msa_TM = Ext.getCmp('msa_TM').getValue();
		var msa_AQHL = Ext.getCmp('msa_AQHL').getValue();
		var msa_KZG = Ext.getCmp('msa_KZG').getValue();
		if(msa_JMJX==1 && msa_TM==1 && msa_AQHL==1 && msa_KZG==1){
			Ext.getCmp('msa_FINISH').setValue(1);
		}else{
			Ext.getCmp('msa_FINISH').setValue(0);
		}
	},
	msa_KZG : function( obj, newValue, oldValue, eOpts ){
		var msa_JMJX = Ext.getCmp('msa_JMJX').getValue();
		var msa_TM = Ext.getCmp('msa_TM').getValue();
		var msa_AQHL = Ext.getCmp('msa_AQHL').getValue();
		var msa_KZG = Ext.getCmp('msa_KZG').getValue();
		if(msa_JMJX==1 && msa_TM==1 && msa_AQHL==1 && msa_KZG==1){
			Ext.getCmp('msa_FINISH').setValue(1);
		}else{
			Ext.getCmp('msa_FINISH').setValue(0);
		}
	},
});