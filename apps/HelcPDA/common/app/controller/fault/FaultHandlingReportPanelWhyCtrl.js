var list=[];
Ext.define('HelcPDA.controller.fault.FaultHandlingReportPanelWhyCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			//进入故障原因页面
			Why:'button[id=Why]',
			//增加
			Add_reason:'button[id=add_reason]',
			//修改
			Modify_reason:'button[id=modify_reason]',
			//提交
			Commitreason:'button[id=Commitreason]',
			//list
			FaultAppearanceList:'list[id=FaultAppearanceList]',
		},
		control:{
			Why:{
				tap:'Why'
			},
			Add_reason:{
				tap:'Add_reason',
			},
			Modify_reason:{
				tap:'Modify_reason',
			},
			Commitreason:{
				tap:'Commitreason',
			},
			FaultAppearanceList:{
				itemtap:'FaultAppearanceList'
			}
		},
	},
	
	//提交故障原因
	//用的方法流程是，把表中关联到 的活动号 作为条件，删除所有数据，然后在把list中的数据重新添加到 表中
	Commitreason : function(){
		var obj=this;
		//检查进入时状态是什么，如果是已提交或者未提交，设置用户是否能操作数据
	   	/*var fault_listId=Ext.getCmp('fault_list').getActiveItem().getId();
	   	if(fault_listId=='FaultHandWYSHButton'||fault_listId=='FaultHandWYTJButton'){
	   		// Ext.getCmp('Commitreason').setDisabled(true);
	   		WL.Toast.show('已提交或已审核,不能提交.');
		    return;
	   	};*/
		if(obj.getJXCL_SubmitVerification('')){
			return;
		}
	   	
		var FaultAppearanceStore=Ext.data.StoreManager.get('FaultAppearanceStore');
		if (!FaultAppearanceStore) { 
			FaultAppearanceStore = Ext.create("HelcPDA.store.fault.FaultAppearanceStore"); 
	   	}; 
	    var list=Ext.Array.pluck(FaultAppearanceStore.getData().items,'data');
	    
	    var FAULT_CAUSE=Ext.getCmp('fault_detail').getValue().replace(/\'/g,"‘").replace(/\"/g,"“");
		var FAULT_RESOURCE=Ext.getCmp('fault_do').getValue();
		var FAULT_REASON=Ext.getCmp('fault_reason').getValue();
		var REASON_ANALYSE=Ext.getCmp('reason_analysis').getValue().replace(/\'/g,"‘").replace(/\"/g,"“");
		var SOLUTION=Ext.getCmp('do_method').getValue().replace(/\'/g,"‘").replace(/\"/g,"“");
		//2016-04-11
		var Fault_Floor_Number=Ext.getCmp('fault_floor_number').getValue();
		
		//验证
		if(FAULT_CAUSE==''||FAULT_CAUSE==null||typeof(FAULT_CAUSE)=='undefined'){
			WL.Toast.show('故障现象不能为空');
			return;
		};
		if(FAULT_RESOURCE==''||FAULT_RESOURCE==null||typeof(FAULT_RESOURCE)=='undefined'){
			WL.Toast.show('请选择故障对策');
			return;
		};
		if(FAULT_REASON==''||FAULT_REASON==null||typeof(FAULT_REASON)=='undefined'){
			WL.Toast.show('请选择故障原因');
			return;
		};
		if(REASON_ANALYSE==''||REASON_ANALYSE==null||typeof(REASON_ANALYSE)=='undefined'){
			WL.Toast.show('原因分析不能为空');
			return;
		};
		if(SOLUTION==''||SOLUTION==null||typeof(SOLUTION)=='undefined'){
			WL.Toast.show('处理方法不能为空');
			return;
		};
		//2016-04-11
		if(Fault_Floor_Number==null||Fault_Floor_Number==0){
			WL.Toast.show('请输入故障楼层');
			return;
		};
		
		//如果填写数据没问题，那么添加到数据仓中
		var newData={FAULT_CAUSE:FAULT_CAUSE,FAULT_RESOURCE:FAULT_RESOURCE,FAULT_REASON:FAULT_REASON,REASON_ANALYSE:REASON_ANALYSE,SOLUTION:SOLUTION,
				//2016-04-11
				Fault_Floor_Number:Fault_Floor_Number};
		
		//ACTIVITY_ID的意思是“活动号”,是从派工信息（HelcPDA.view.fault.FaultHandlingDetailPanel）页面获取到的
		var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue();
		//当数据仓不存在数据时
		if(list.length==0){
			list.push(newData);
			FaultAppearanceStore.setData(list);
			GZtj(obj,list,ACTIVITY_ID);
	    }
		//当数据仓存在数据时
		else{
			//原先的思路是：在有多个故障现象的情况下，
			//当故障现象与故障原因重复，暂停提交列表中的数据
			//如果故障现象和故障原因不重复，那么，做进一步判断，
			//如果故障现象重复，当循环到最后一次时，会询问是否要把相同的故障现象提交,同意就提交上去
			//如果故障现象没有重复的，那么直接提交
	    	var flag=true;  //判定是否满足 故障现象相同
	    	var abk=true;   //判定是否满足 都重复
    		//数据仓长度
	    	var length=list.length;
    		//和数据仓当中的数据进行对比，判断是否重复
    		for(var i=0;i<length;i++){
    			if(FAULT_CAUSE==list[i].FAULT_CAUSE&&FAULT_REASON==list[i].FAULT_REASON){
    				WL.Toast.show("故障现象与故障原因重复,暂停提交列表中的数据");
                	//Ext.Msg.alert("提示","故障现象与故障原因重复,暂时提交列表中的数据");
                	flag=false;
                	abk=false;
                }else{
                	if(abk==false){
                		return;
                	};
                	if(FAULT_CAUSE==list[i].FAULT_CAUSE){
                		flag=false;
                	};
                	if(i==length-1){
                		if(flag==true){
                			list.push(newData);
                			FaultAppearanceStore.setData(list);
           					for(var i=0;i<list.length;i++){
           						//故障现象
           						var FAULT_CAUSE=list[i].FAULT_CAUSE.toString().replace(/\'/g,"‘");
           					   	//原因分析
           						var REASON_ANALYSE=list[i].REASON_ANALYSE.toString().replace(/\'/g,"‘");
           					   	//处理方法
           						var SOLUTION=list[i].SOLUTION.toString().replace(/\'/g,"‘");
           					   	list[i].FAULT_CAUSE=FAULT_CAUSE.replace(/\"/g,"“");
           					   	list[i].REASON_ANALYSE=REASON_ANALYSE.replace(/\"/g,"“");
           					   	list[i].SOLUTION=SOLUTION.replace(/\"/g,"“");
           					};
           					GZtj(obj,list,ACTIVITY_ID);
                        }else{
                        	Ext.Msg.confirm('你好','当前故障现象与列表中的数据现象重复,确认要提交吗？',function(btn){
                        		if (btn == 'yes'){
                        	//navigator.notification.confirm('当前故障现象与列表中的数据现象重复,确认要提交吗？',function(btn){
               			 		//if(btn ==2){
               			 			list.push(newData);
               			 			FaultAppearanceStore.setData(list);
               			 			for(var i=0;i<list.length;i++){
                      					var FAULT_CAUSE=list[i].FAULT_CAUSE.toString().replace(/\'/g,"‘");
                      					var REASON_ANALYSE=list[i].REASON_ANALYSE.toString().replace(/\'/g,"‘");
                      					var SOLUTION=list[i].SOLUTION.toString().replace(/\'/g,"‘");
                      					list[i].FAULT_CAUSE=FAULT_CAUSE.replace(/\"/g,"“");
                      					list[i].REASON_ANALYSE=REASON_ANALYSE.replace(/\"/g,"“");
                      					list[i].SOLUTION=SOLUTION.replace(/\"/g,"“");
                      				};
                      				GZtj(obj,list,ACTIVITY_ID);
                      			}
               			 		else{
               			 			return;
                   			 	};
                        	//},"提示","取消,确定");
                      		}); 
                        };	 
                	};
                };
        };
        
        
                	 

                	 
             
	    	
	    	
/*	    	var flag=true;  //判定是否满足 故障现象相同
	    	var abk=true;   //判定是否满足 都重复
	    	//2016-04-11
	    	//判断控件是否都有数据
            if(FAULT_CAUSE!=''&&FAULT_RESOURCE!=''&&FAULT_REASON!=''&&REASON_ANALYSE!=''&&SOLUTION!=''){
            	var newData={FAULT_CAUSE:FAULT_CAUSE,FAULT_RESOURCE:FAULT_RESOURCE,FAULT_REASON:FAULT_REASON,REASON_ANALYSE:REASON_ANALYSE,SOLUTION:SOLUTION};
    			var length=list.length;
    			//判断是否重复
    			for(var i=0;i<length;i++){
    				if(FAULT_CAUSE==list[i].FAULT_CAUSE&&FAULT_REASON==list[i].FAULT_REASON){
    					WL.Toast.show("故障现象与故障原因重复,暂时提交列表中的数据");
                		//Ext.Msg.alert("提示","故障现象与故障原因重复,暂时提交列表中的数据");
                		flag=false;
                		abk=false;
                	}else{
                		if(abk==false){
                			return;
                		};
                		if(FAULT_CAUSE==list[i].FAULT_CAUSE){
                			flag=false;
                		};
                		if(i==length-1){
                			if(flag==true){
                				list.push(newData);
                            	FaultAppearanceStore.setData(list);
           					   	var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
           					   	for(var i=0;i<list.length;i++){
           					   		var FAULT_CAUSE=list[i].FAULT_CAUSE.toString().replace(/\'/g,"‘");
           					   		var REASON_ANALYSE=list[i].REASON_ANALYSE.toString().replace(/\'/g,"‘");
           					   		var SOLUTION=list[i].SOLUTION.toString().replace(/\'/g,"‘");
           					   		list[i].FAULT_CAUSE=FAULT_CAUSE.replace(/\"/g,"“");
           					   		list[i].REASON_ANALYSE=REASON_ANALYSE.replace(/\"/g,"“");
           					   		list[i].SOLUTION=SOLUTION.replace(/\"/g,"“");
           					   	};
           						var content="{'rows':"+JSON.stringify(list)+",'ACTIVITY_ID':'"+ACTIVITY_ID+"'}";
           						var getResult=function(res){
           							var str=res.msginfo;
           						  	obj.clearValue(); //清除数据
           						  	obj.setStyle();   //修改样式
           						  	WL.Toast.show(str);
           						};
           						this.connectServer(getResult, 'gzyuanyinAction.do?method=toAdds', content);
                        	}else{
//                        		Ext.Msg.confirm('你好','当前故障现象与列表中的数据现象重复,确认要提交吗？',function(btn){
//                      			if (btn == 'yes'){
                        		navigator.notification.confirm('当前故障现象与列表中的数据现象重复,确认要提交吗？',function(btn){
               			 			if(btn ==2){
               			 				list.push(newData);
               			 				//提交
                      					FaultAppearanceStore.setData(list);
                      					var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
                      					for(var i=0;i<list.length;i++){
                      						var FAULT_CAUSE=list[i].FAULT_CAUSE.toString().replace(/\'/g,"‘");
                      						var REASON_ANALYSE=list[i].REASON_ANALYSE.toString().replace(/\'/g,"‘");
                      					   	var SOLUTION=list[i].SOLUTION.toString().replace(/\'/g,"‘");
                      					   	list[i].FAULT_CAUSE=FAULT_CAUSE.replace(/\"/g,"“");
                      					   	list[i].REASON_ANALYSE=REASON_ANALYSE.replace(/\"/g,"“");
                      					   	list[i].SOLUTION=SOLUTION.replace(/\"/g,"“");
                      					};
                      					var content="{'rows':"+JSON.stringify(list)+",'ACTIVITY_ID':'"+ACTIVITY_ID+"'}";
                      					var getResult=function(res){
                      						var str=res.msginfo;
                      						obj.clearValue(); //清除数据
                      						obj.setStyle();   //修改样式
                      						WL.Toast.show(str);
                      					};
                      					this.connectServer(getResult, 'gzyuanyinAction.do?method=toAdds', content);
                      			    }
//                      			else{
//                      			}
//                      			}); 
                      				else{
                      					return;
                   			 		}
                   			 	},"提示","取消,确定");
                        	}	 
                		}
                	}
                }
                	 
//              	   navigator.notification.confirm('当前故障现象与列表中的数据现象重复,确认要提交吗？',function(btn){
//  			 			if(btn ==2){
//  			 				obj.connectServer(getResult7,'gzbaogaoluruAction.do?method=tocommit', content);
//  							 return;
//  			 			}
                	 
//                	       else{
//  			 				 return;
//  			 			}
//  			 		},"提示","取消,确定");
                	 
             }*/                  	    		 
	    };
	    	 
	},
	
	//清除方框中的数据
	clearValue:function(){
		Ext.getCmp('fault_detail').setValue("");
	    Ext.getCmp('fault_do').setValue("");
	    Ext.getCmp('fault_reason').setValue("");
	    Ext.getCmp('reason_analysis').setValue("");
	    Ext.getCmp('do_method').setValue("");
	    //2016-4-11
	    Ext.getCmp('fault_floor_number').setValue("");
	},
	//设置列表标题的样式
	setStyle:function(){
		 var FaultAppearanceStore=Ext.data.StoreManager.get('FaultAppearanceStore');
	   		if (!FaultAppearanceStore) { 
	   			FaultAppearanceStore = Ext.create("HelcPDA.store.fault.FaultAppearanceStore"); 
	   		}; 
		var list=Ext.Array.pluck(FaultAppearanceStore.getData().items,'data');
		var Fault_ResContainer=document.getElementById('Fault_ResContainer');
	 		if(list.length>0){
	 			Fault_ResContainer.innerHTML="故障现象("+list.length+")";
	 			Fault_ResContainer.style.color='red';
	 		}else{
	 			Fault_ResContainer.innerHTML="故障现象";
	 			Fault_ResContainer.style.color='';
	 		}
	},
	
	Why : function(){
		this.NextView('faultHandlingReportPanelWhy','HelcPDA.view.fault.FaultHandlingReportPanelWhy');
        Ext.Viewport.removeMenu('right');
        //获取活动ID
        var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
        var content=JSON.stringify({iswhere:"WHERE ACTIVITY_ID='"+ACTIVITY_ID+"'"});
        //获取数据仓
    	var FaultAppearanceStore=Ext.data.StoreManager.get('FaultAppearanceStore');
  		if (!FaultAppearanceStore) { 
  			FaultAppearanceStore = Ext.create("HelcPDA.store.fault.FaultAppearanceStore"); 
  		}; 
        //数据仓有数据，修改页签显示
        var list=Ext.Array.pluck(FaultAppearanceStore.getData().items,'data');
		var Fault_ResContainer=document.getElementById('Fault_ResContainer');
 		if(list.length>0){
 			Fault_ResContainer.innerHTML="故障现象("+list.length+")";
 			Fault_ResContainer.style.color='red';
 		}else{
 			Fault_ResContainer.innerHTML="故障现象";
 			Fault_ResContainer.style.color='';
 		};
  
 		//查看表中保存的故障数据
	  	var getResult=function(res){
	  		console.log('---------------0000000000------------------');
	  		console.log(res);
	  		var str=res.msginfo;
	  		var list=res.rows;
	  		FaultAppearanceStore.setData(list);
	  		var Fault_ResContainer=document.getElementById('Fault_ResContainer');
	  		if(list.length>0){
	 			Fault_ResContainer.innerHTML="故障现象("+list.length+")";
	 			Fault_ResContainer.style.color='red';
	  		}else{
	 			Fault_ResContainer.innerHTML="故障现象";
	 			Fault_ResContainer.style.color='';
	 		}
	 		WL.Toast.show(str);
	  	};
	  	this.connectServer(getResult, 'gzyuanyinAction.do?method=toSearch', content);
        
	},
	
	//add a FaultApperance
	//2016-4-12
	//只是添加到数据仓中，没有添加到表中
	//我现在明白为什么提交所调用的方法是批量提交了，正确的使用方法是，先增加，在提交，是我想多了。
	Add_reason:function(){
		var FAULT_CAUSE=Ext.getCmp('fault_detail').getValue();
	    var FAULT_RESOURCE=Ext.getCmp('fault_do').getValue();
	    var FAULT_REASON=Ext.getCmp('fault_reason').getValue();
	    var REASON_ANALYSE=Ext.getCmp('reason_analysis').getValue();
	    var SOLUTION=Ext.getCmp('do_method').getValue();
	    //2016-4-12
	    var Fault_Floor_Number=Ext.getCmp('fault_floor_number').getValue();
	      
	    //验证
	    if(FAULT_CAUSE==""||FAULT_CAUSE==null||typeof(FAULT_CAUSE)=='undefined'){
	    	WL.Toast.show('故障现象不能为空');
	    	return;
	    };
	    if(FAULT_RESOURCE==""||FAULT_RESOURCE==null||typeof(FAULT_RESOURCE)=='undefined'){
	    	WL.Toast.show('请选择故障对策');
	    	return;
	    };
	    if(FAULT_REASON==""||FAULT_REASON==null||typeof(FAULT_REASON)=='undefined'){
	    	WL.Toast.show('请选择故障原因');
	    	return;
	    };
	    if(REASON_ANALYSE==""||REASON_ANALYSE==null||typeof(REASON_ANALYSE)=='undefined'){
	    	WL.Toast.show('原因分析不能为空');
	    	return;
	    };
	    if(SOLUTION==""||SOLUTION==null||typeof(SOLUTION)=='undefined'){
	    	WL.Toast.show('处理方法不能为空');
	    	return;
	    };
	    //2016-4-12
		if(Fault_Floor_Number==null||Fault_Floor_Number==0){
			WL.Toast.show('请输入故障楼层');
			return;
		};
	    
		//数据仓
		var FaultAppearanceStore=Ext.data.StoreManager.get('FaultAppearanceStore');
		if (!FaultAppearanceStore) { 
			FaultAppearanceStore = Ext.create("HelcPDA.store.fault.FaultAppearanceStore"); 
		};
			
		var new_data =[];
		var list=Ext.Array.pluck(FaultAppearanceStore.getData().items,'data');
		var length_ = list.length;
	    for(var i=0;i<length_;i++){
	    	var newdata_item = {};
	    	var NOW_FAULT_CAUSE = list[i].FAULT_CAUSE;
		    var NOW_FAULT_RESOURCE=list[i].FAULT_RESOURCE;
		    var NOW_FAULT_REASON=list[i].FAULT_REASON;
		    var NOW_REASON_ANALYSE=list[i].REASON_ANALYSE;
		    var NOW_SOLUTION=list[i].SOLUTION;
		    //2016-4-12
		    var NOW_Fault_Floor_Number=list[i].Fault_Floor_Number;
		    newdata_item.FAULT_CAUSE=NOW_FAULT_CAUSE;
		    newdata_item.FAULT_RESOURCE=NOW_FAULT_RESOURCE;
		    newdata_item.FAULT_REASON=NOW_FAULT_REASON;
		    newdata_item.REASON_ANALYSE=NOW_REASON_ANALYSE;
		    newdata_item.SOLUTION=NOW_SOLUTION;
		    //2016-4-12
		    newdata_item.Fault_Floor_Number=NOW_Fault_Floor_Number;
	    	new_data[i]=newdata_item;
	    };
	    var length=list.length;
	    var flag=true;
        for(var i=0;i<length;i++){
        	if(FAULT_CAUSE==list[i].FAULT_CAUSE&&FAULT_REASON==list[i].FAULT_REASON){
        		WL.Toast.show("故障现象与故障原因重复,请勿重复添加");
         		Ext.Msg.alert("提示","故障现象与故障原因重复,请勿重复提交");
         		return;
         	}else{
         		if(FAULT_CAUSE==list[i].FAULT_CAUSE){
         			flag=false;
      			}; 
         		if(i==length-1){
         			if(flag==true){
         				DataAddFangFa(list);
					}else{
						//Ext.Msg.confirm('你好','当前故障现象与列表中的数据现象重复,确认要增加到列表吗？',function(btn){
	        			//	if (btn == 'yes'){
		              	navigator.notification.confirm('当前故障现象与列表中的数据现象重复,确认要添加吗？',function(btn){
		              		if(btn ==2){
	        					DataAddFangFa(list);
	        		        }else{
	        		        	return;
		 			        };
		 		        },"提示","取消,确定");
	        		    //}); 	
          	     	};
         		};  
         	};
         };
	    
         //往数据仓中添加数据 公共
         function DataAddFangFa(list){
        	 new_data[length_] ={FAULT_CAUSE:FAULT_CAUSE,FAULT_RESOURCE:FAULT_RESOURCE,FAULT_REASON:FAULT_REASON,REASON_ANALYSE:REASON_ANALYSE,SOLUTION:SOLUTION,
						//2016-4-12
						Fault_Floor_Number:Fault_Floor_Number};
        	 
        	 list = new_data; 
	 		 FaultAppearanceStore.setData(list);
	 		 var Fault_ResContainer=document.getElementById('Fault_ResContainer');
	 		 if(list.length>0){
	 		 	 Fault_ResContainer.innerHTML="故障现象("+list.length+")";
	 		 	 Fault_ResContainer.style.color='red';
	 		 }else{
	 			 Fault_ResContainer.innerHTML="故障现象";
	 		 	 Fault_ResContainer.style.color='';
	 		 };
	 		 //好像没用了
	 		 Ext.getCmp('fault_Appearance_index').setValue();
         };
	},
	
	//监听list列表
	FaultAppearanceList:function(obj,index,target,record,e,eOpts){
		  var FaultAppearanceStore=Ext.data.StoreManager.get('FaultAppearanceStore');
	  		if (!FaultAppearanceStore) { 
	  			FaultAppearanceStore = Ext.create("HelcPDA.store.fault.FaultAppearanceStore"); 
	  		}; 
	  		//alert(record.FHRW_STATION_ID);
	  		var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue();
	  		function getResult(result){
	  			WL.Toast.show("删除成功");
	  		}
			if(event.target.id=="1"){
				navigator.notification.confirm('确定删除信息？',function(btn){
		 			if(btn ==2){
		 				FaultAppearanceStore.removeAt(index);
						var list=Ext.Array.pluck(FaultAppearanceStore.getData().items,'data');
						var content="{'rows':"+JSON.stringify(list)+",'ACTIVITY_ID':'"+ACTIVITY_ID+"'}";
						this.connectServer(getResult, 'gzyuanyinAction.do?method=toAdds', content);
						var Fault_ResContainer=document.getElementById('Fault_ResContainer');
						if(list.length>0){
				 			Fault_ResContainer.innerHTML="故障现象("+list.length+")";
				 			Fault_ResContainer.style.color='red';
						}else{
				 			Fault_ResContainer.innerHTML="故障现象";
				 			Fault_ResContainer.style.color='';
				 		}	
		 			}else{
		 				return;
		 			}
		 		},"提示","取消,确定");
//				Ext.Msg.confirm('你好','确定删除信息？',function(btn){
//					if (btn == 'yes'){
//						FaultAppearanceStore.removeAt(index);
//						var list=Ext.Array.pluck(FaultAppearanceStore.getData().items,'data');
//						var content="{'rows':"+JSON.stringify(list)+",'ACTIVITY_ID':'"+ACTIVITY_ID+"'}";
//						this.connectServer(getResult, 'gzyuanyinAction.do?method=toAdds', content);
//						var Fault_ResContainer=document.getElementById('Fault_ResContainer');
//						if(list.length>0){
//				 			Fault_ResContainer.innerHTML="故障现象("+list.length+")";
//				 			Fault_ResContainer.style.color='red';
//						}else{
//				 			Fault_ResContainer.innerHTML="故障现象";
//				 			Fault_ResContainer.style.color='';
//				 		}	
//					}else{
//						return;
//					}
//				});
			
			}else{
				 Ext.getCmp('fault_detail').setValue(FaultAppearanceStore.getAt(index).get('FAULT_CAUSE'));
		         Ext.getCmp('fault_do').setValue(FaultAppearanceStore.getAt(index).get('FAULT_RESOURCE'));
		         Ext.getCmp('fault_reason').setValue(FaultAppearanceStore.getAt(index).get('FAULT_REASON'));
		         Ext.getCmp('reason_analysis').setValue(FaultAppearanceStore.getAt(index).get('REASON_ANALYSE'));
		         Ext.getCmp('do_method').setValue(FaultAppearanceStore.getAt(index).get('SOLUTION'));
		         Ext.getCmp('fault_Appearance_index').setValue(index);
		         Ext.getCmp('fault_floor_number').setValue(FaultAppearanceStore.getAt(index).get('Fault_Floor_Number'));
		         
		         Ext.getCmp('why_panel').setActiveItem(0);
		         
			}
	}
	//修改list中的一条数据
	,Modify_reason:function(){
	  	 var FaultAppearanceStore=Ext.data.StoreManager.get('FaultAppearanceStore');
	   		if (!FaultAppearanceStore) { 
	   			FaultAppearanceStore = Ext.create("HelcPDA.store.fault.FaultAppearanceStore"); 
	   		}; 
	   	     var list=Ext.Array.pluck(FaultAppearanceStore.getData().items,'data');
	   		 var index= Ext.getCmp('fault_Appearance_index').getValue();
	    	 var FAULT_CAUSE=Ext.getCmp('fault_detail').getValue();
		     var FAULT_RESOURCE=Ext.getCmp('fault_do').getValue();
		     var FAULT_REASON=Ext.getCmp('fault_reason').getValue();
		     var REASON_ANALYSE=Ext.getCmp('reason_analysis').getValue();
		     var SOLUTION=Ext.getCmp('do_method').getValue();
	    	 var newData={FAULT_CAUSE:FAULT_CAUSE,FAULT_RESOURCE:FAULT_RESOURCE,FAULT_REASON:FAULT_REASON,REASON_ANALYSE:REASON_ANALYSE,SOLUTION:SOLUTION};
	    	 if(index==''||index==null||typeof(index)=='undefined'){
	    		 WL.Toast.show('请先选择要修改的数据');
	    		 return;
	    	 }else{
	    		 var length=list.length;
	    		 for(var i=0;i<length;i++){
                     	if(FAULT_CAUSE==list[i].FAULT_CAUSE&&FAULT_REASON==list[i].FAULT_REASON){
                     		 WL.Toast.show('请勿将数据修改的和列表中的数据相同');
                     		 return;
                     	}    			 
	    			 
	    		 }
		    		list.splice(index,1,newData);
		    	}
	    	 FaultAppearanceStore.setData(list);
	     },
	   //计算字符串长度
	     byteLength:function(str) {
	    		var byteLen = 0, len = str.length;
	    		if( !str ) return 0;
	    		for( var i=0; i<len; i++ )
	    			byteLen += str.charCodeAt(i) > 255 ? 2 : 1;
	    		return byteLen;
	    	}
});

//故障提交
function GZtj(obj,list,ACTIVITY_ID){
	console.log(list);
	var content="{'rows':"+JSON.stringify(list)+",'ACTIVITY_ID':'"+ACTIVITY_ID+"'}";
	cc.log('故障提交数据');
	cc.log(content);
	var getResult=function(res){
		var str=res.msginfo;
		obj.clearValue(); //清除数据
		obj.setStyle();   //修改样式
		WL.Toast.show(str);
	};
	obj.connectServer(getResult, 'gzyuanyinAction.do?method=toAdds', content);
};