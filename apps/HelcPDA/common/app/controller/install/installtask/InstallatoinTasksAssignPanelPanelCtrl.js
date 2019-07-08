Ext.define('HelcPDA.controller.install.installtask.InstallatoinTasksAssignPanelPanelCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'InstallatoinTasksAssignPanelPanelCtrl_id',
	config:{
		refs:{
			/************************************************************************************
			 * 安装任务转派页面 2
			 * */
			//返回按钮
			FH:'button[id=InstallatoinTasksAssignPanelPanel_id_FH_BUTTON]',

			//确认按钮
			installtaskSure:'button[id=sure_Id]',
			
			//服务商
			installtask:'selectfield[id=InstallatoinTasksAssignSelectfield_id]',
			
			//服务商关键字
			installfwcfind:'textfield[id=fuws_id]',
			
			//人员关键字
			installfind:'textfield[id=ren_id]',
			
			/**
			 **安装任务转派页面 2
			 ************************************************************************************/
		},
		control:{
			/************************************************************************************
			 * 安装任务转派页面 2
			 * */
			
			//返回按钮
			FH:{
				tap:'FH'
			},

			//确认按钮
			installtaskSure:{
				tap:'dozhuangpai'
			},
			
			//服务商
			installtask:{
				change:'doMaunPlanDeP'
			},
			
			//服务商关键字
			installfwcfind:{
				keyup:'init2',
			},
			
			//人员关键字
			installfind:{
				keyup:'init1',
			},
			/**
			 **安装任务转派页面 2
			 ************************************************************************************/

		},
	},
	
	/************************************************************************************
	 * 安装任务转派页面 2
	 * */
	//返回按钮
	FH:function(){
		this.showBackView('InstallatoinTasksTurnPanel_id','HelcPDA.view.install.installtask.InstallatoinTasksTurnPanel');
	},
	
	//确认按钮
	dozhuangpai:function(){
		this_obj=this;
		var obj8=Ext.getCmp('InstallatoinTasksAssignSelectfield_id');
		var VENDOR_ID=obj8.getValue();
		console.log(VENDOR_ID);
		if(VENDOR_ID==0){
			 WL.Toast.show('请选择工程服务商');
		}else{
			getResult=function(res){
	        	var list=[];
	        	list=res.item;
	        	console.log(list);
	        	if(list.length==0){
	        		if(VENDOR_ID!=null&&VENDOR_ID!=0){
	        			
	        		};
	        	}else{
	        		var ELEVATORS=[];
	       		 	var hidden=Ext.getCmp('Hidden_id');
	       		 	var value=hidden.getValue();
	       		 	console.log(value);
	       		 	var a=value.split(",");
	       		 	console.log(a);
	       		 	var obj=Ext.getCmp('InstallatoinTasksAssignSelectfield_id2');
	       		 	var INST_PERSON_ID=obj.getValue();
	       		 	console.log(INST_PERSON_ID);
	       		 	console.log(init_person_id);
	       		 	for(var i=0;i<a.length;i++){
	       		 		ELEVATORS[i]=a[i];
	       		 	};
	       		 	console.log(ELEVATORS);
	       		 	getResult=function(res){
	       		 		//	 alert(res);
	       	        	console.log(res);
	       	        	//返回安装任务转派1 页面
	       	        	this_obj.showBackView('InstallatoinTasksTurnPanel_id','HelcPDA.view.install.installtask.InstallatoinTasksTurnPanel');
	   
	                    var options=obj.getOptions();
	                    var INST_PERSON_ID=obj.getValue();
	                    var PERSON_NAME=null;
	                    for(var i=0;i<options.length;i++){
	                    	if(INST_PERSON_ID==options[i].INST_PERSON_ID){
	                    		PERSON_NAME=options[i].PERSON_NAME;
	                    	};
	                    };
	                    console.log(ELEVATORS.length);
	                    var time=new Date();
	                    var a=[];
   	                    var newtime=time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
   	                    var tcodeId='TCODE_INSTALL_FORWARD';
   	                    for(var i=0;i<ELEVATORS.length;i++){
   	                    	a=ELEVATORS[i].split("_");
	                    	var hiddenobj=Ext.getCmp('hiddenId');
		     	            var hiddenValue=hiddenobj.getValue();
	                    	var Tid=hiddenValue+'_'+a[0]+'_'+a[1];
	     					var options=obj.getOptions();
	   	                    var INST_PERSON_ID=obj.getValue();
	   	                    for(var i=0;i<options.length;i++){
	   	                    	if(INST_PERSON_ID==options[i].INST_PERSON_ID){
	   	                    		PERSON_NAME=options[i].PERSON_NAME;
	   	                    	};
	   	                    };
	   	                    console.log(ELEVATORS.length);
	   	                    var coll=WL.JSONStore.get(collectionName);
	   	                    var time=new Date();
	      	                var newtime=time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
	      	                var tcodeId='TCODE_INSTALL_FORWARD';
	   	                   	for(var i=0;i<ELEVATORS.length;i++){
	   	                   		a=ELEVATORS[i].split("_");
	   	                    	var hiddenobj=Ext.getCmp('hiddenId');
	   	                    	console.log(hiddenobj);
	   		     	            var hiddenValue=hiddenobj.getValue();
	   		     	            console.log(hiddenValue);
	   		     	            var Tid=hiddenValue;
	   		     	            
	   		     	            var data={tcode:tcodeId,tid:Tid};
	   		     	            var options={};
	   		     	            var odata=[];
	   	                    	for(var i=0;i<ELEVATORS.length;i++){
	   	                    		console.log(ELEVATORS.length);
	   	                    		var a=ELEVATORS[i].split("_");
	   	                    		Tid=hiddenValue+'_'+a[0]+'_'+a[1];
	   			     			    var stextt={ENGCONTRACT_NUMBER:hiddenValue,ELEVATOR_NO:a[0],SEQ_NUM:a[1],PERSON_NAME:PERSON_NAME,time:newtime};
	   			     			    var data2={tcode:tcodeId,tid:Tid,stext:stextt};
	   			     			    odata[i]=data2;
	   	                    	};
	   			     			
	   	                    	coll.find(data,options).then(function(arrayResults){
	   	                    		if(arrayResults.length==0){
	   	                    			coll.add(odata,options).then(function(){
	   	                    				WL.Toast.show('任务转派成功!');
	   			     					 }).fail(function(err){
	   			     						WL.Toast.show('任务转派失败!');
	   			     					 });
	   			     				}else{
	   			     					coll.remove(data,options).then(function(){
	   			     						console.log(arrayResults.length);
	   			     						console.log(arrayResults);
	   			     						console.log(ELEVATORS.length);
	   			     						console.log(ELEVATORS);
	   			     						var data2=[];
	   			     						for(var i=0;i<ELEVATORS.length;i++){
	   			     							var a=ELEVATORS[i].split("_");
	   	   	                    		        Tid=hiddenValue+'_'+a[0]+'_'+a[1];
	   	   	                    		        var stextt={ENGCONTRACT_NUMBER:hiddenValue,ELEVATOR_NO:a[0],SEQ_NUM:a[1],PERSON_NAME:PERSON_NAME,time:newtime};
	   			     					 	    var odata={tcode:tcodeId,tid:Tid,stext:stextt};
	   			     						    data2[i]=odata;
	   			     						};
	   			     						coll.add(data2,options).then(function(){
	   			     							//	alert('增加成功!');
	   			     							coll.find(data,options).then(function(result){
	   			     								//	alert('数据查找成功!');
	   			     								coll.remove(data,options).then(function(){
	   			     									//	alert('数据删除成功!');
	   			     									var list3=[];
	   			     									var list5=[];
	   			     									var list6=[];
	   			     									var list8=[];
	   			     									for(var i=0;i<result.length;i++){
	   			     										list3[i]=result[i].json.stext;
	   			     										list5[i]=result[i].json.stext;
	   			     									};
	   			     									var list4=[];
	   		     									
	   			     									for(var i=0;i<arrayResults.length;i++){
	   			     										list4[i]=arrayResults[i].json.stext;
	   			     									};
	   			     									for(var i=0;i<list4.length;i++){
	   			     										for(var j=0;j<list3.length;j++){
	   			     											if((list3[j].ELEVATOR_NO.indexOf(list4[i].ELEVATOR_NO)!=-1)){
	   			     												list4[i]=list3[j];
	   			     											}else if((list3[j].ELEVATOR_NO.indexOf(list4[i].ELEVATOR_NO)==-1)&&(j=list3.length-1)){
	   			     												list5[list5.length]=list4[i];
	   			     											};
	   			     										};
	   			     									};
                                                        for(var i=0;i<list5.length;i++){
                                                        	list6[i]=list5[i].ELEVATOR_NO;
                                                        };
                                                        var list7=list6.unique3();
                                                        for(var i=0;i<list7.length;i++){
                                                        	for(var j=0;j<list5.length;j++){
                                                        		if(list7[i].indexOf(list5[j].ELEVATOR_NO)!=-1){
                                                        			list8[i]=list5[j];
                                                        		};
                                                        	 };
                                                        };
	   			     									var odata3=[];
	   			     									for(var i=0;i<list8.length;i++){
	   			     										var data3={tcode:tcodeId,tid:hiddenValue+'_'+list8[i].ELEVATOR_NO+'_'+list8[i].SEQ_NUM,stext:list8[i]};
					   			     			    		odata3[i]=data3;
	   			     									};
	   			     									coll.add(odata3,options).then(function(){
					   			     			    		WL.Toast.show('任务转派成功!');
					   			     					 }).fail(function(err){
					   			     						WL.Toast.show('任务转派失败!');
					   			     					 });
	   			     									
	   			     								  }).fail(function(error){
	   			     									WL.Toast.show('任务转派失败!');
	   			     								  });
	   			     								
	   			     								}).fail(function(error){
	   			     									WL.Toast.show('任务转派失败!');
	   			     								});
	   			     								
	   			     							}).fail(function(err){
	   			     								WL.Toast.show('任务转派失败!');
	   			     							});
	   			     						
	   			     						}).fail(function(err){
	   			     							WL.Toast.show('任务转派失败!');
	   			     						});
	   			     				   };
	   			     			    	
	   			     			}).fail(function(err){
	   			     			    	WL.Toast.show('任务转派失败!');
	   			     			});
	   	                   	};
   	                    };
	       	        };
	       	        console.log(init_person_id);
	       	        console.log(ELEVATORS);
	       	        console.log(ELEVATORS.length);
	       	        console.log(JSON.stringify(ELEVATORS));
	       	        var content="{INST_PERSON_ID_SELF:'"+init_person_id+"',INST_PERSON_ID:'"+INST_PERSON_ID+"',ELEVATORS:'"+JSON.stringify(ELEVATORS)+"'}";
	       	     this_obj.connectServer(getResult,'installtaskAction.do?method=toSaveInstPerson',content);
	        	};
	        
	        };
	        console.log(VENDOR_ID);
	        var content="{VENDOR_ID:'"+VENDOR_ID+"'}";
	        this_obj.connectServer(getResult,'installtaskAction.do?method=toSearch_InstPerson',content);
		};
	},
	
	//服务商
	doMaunPlanDeP:function(){
		var obj8=Ext.getCmp('InstallatoinTasksAssignSelectfield_id');
		var VENDOR_ID=obj8.getValue();
		var objId2=Ext.getCmp('InstallatoinTasksAssignSelectfield_id2');
	    console.log(VENDOR_ID);
	    getResult=function(res){
	    	var list=[];
	        list=res.item;
	        console.log(list);
	        if(list.length==0){
	        	if(VENDOR_ID!=null&&VENDOR_ID!=0){
	        		WL.Toast.show('找不到数据');
	        	};
	        }else{
	        	objId2.setOptions(list);
	        };
	    };
	    console.log(VENDOR_ID);
	    var content="{VENDOR_ID:'"+VENDOR_ID+"'}";
	    this.connectServer(getResult,'installtaskAction.do?method=toSearch_InstPerson',content);
	},
	
	//服务商关键字
	init2:function(){
		/*
		 * 'VENDOR_NAME',	
            'VENDOR_ID',
		 */
		 var obj=Ext.getCmp('InstallatoinTasksAssignSelectfield_id');
		 var obj2=Ext.getCmp('fuws_id');
		 var value2=obj2.getValue();
		 console.log(value2);
		 var options=obj.getOptions();
		 console.log(options);
         var VENDOR_ID=obj.getValue();
         console.log(VENDOR_ID);
         console.log(options.length);
         console.log(options);
         console.log(options[1].VENDOR_NAME);
         var VENDOR_NAME=null;
         for(var i=0;i<options.length;i++){
        	 if(options[i].VENDOR_NAME.indexOf(value2)!=-1){
        		   obj.setValue(options[i].VENDOR_ID);
        		   console.log(options[i].VENDOR_NAME);
        	   }else{
        		   console.log(options[i].VENDOR_NAME);
        	   };
         };
	},
	
	//人员关键字
	init1:function(){
		 var obj=Ext.getCmp('InstallatoinTasksAssignSelectfield_id2');
		 var obj2=Ext.getCmp('ren_id');
		 var value2=obj2.getValue();
		 console.log(value2);
		 var options=obj.getOptions();
		 console.log(options);
         var INST_PERSON_ID=obj.getValue();
         console.log(INST_PERSON_ID);
         console.log(options.length);
         console.log(options);
         console.log(options[1].PERSON_NAME);
         var PERSON_NAME=null;
         for(var i=0;i<options.length;i++){
        	 if(options[i].PERSON_NAME.indexOf(value2)!=-1){
        	 	 obj.setValue(options[i].INST_PERSON_ID);
       		   	 console.log(options[i].PERSON_NAME);
       	   	 }else{
       	   		 console.log(options[i].PERSON_NAME);
       	   	 };
          };
          console.log(options);
          console.log(PERSON_NAME);
	},
	/**
	 **安装任务转派页面 2
	 ************************************************************************************/

});
Array.prototype.unique3 = function(){
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++){
		if(!json[this[i]]){
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res;
};