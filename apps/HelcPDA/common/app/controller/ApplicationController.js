/**
 * 全局ControllerHideWaitting
 * 
 */
Ext.define("HelcPDA.controller.ApplicationController", {
	extend : "Ext.app.Controller",
	searchStoreName : "Distributors",
	id:'applicon',
	getPlatform : function() {
		return this.getApplication().platform;
	},
	
	
	/**
	 * 急修处理模块 的故障报表提交验证
	 * 不同的权限会进入不同的页面
	 */
	
	getJXCL_SubmitVerification:function(flag){
		var fault_listId=Ext.getCmp('fault_list').getActiveItem().getId();//判断分页所选页签
		console.log(fault_listId);
		if(fault_listId=='FaultHandWYSHButton'||fault_listId=='FaultHandWYTJButton'){
			if(flag=='one'){
				Ext.getCmp('returnAllReport').setHidden(false);
				return true;
			}else if(flag=='two'){
				return true;		
			}else{
				WL.Toast.show('已提交或已审核,不能提交.');
				console.log('已提交或已审核,不能提交.');
				return true;				
			}
		};				
		return false;
		
		//判断入口页面
		/*if(Direction=='one'){
			
		}
		
		
		if(power=='baoyangjihua'){
			var fault_listId=Ext.getCmp('New_Home2016_Tabpanel').getActiveItem().getId();
			console.log('----------------0---------------------');
			console.log(fault_listId);
			console.log('----------------1---------------------');
			return false;	
		}else{
			
		}
		return false;*/
	},
	
	
	/**
	 * 温馨提示
	 */
	getWXTS:function(Msg){
		Ext.Msg.alert('温馨提示',Msg);
	},
	
	/**
	 * 获取参数
	 */
	getElement:function(obj){
		//数组参数获取
		if(obj instanceof Array){
			var tempobj=[];
			var  length =obj.length;
			for(var i=0;i<length;i++){
				tempobj[i]=Ext.getCmp(obj[i]).getValue();
			}
			return tempobj;
		}
		//字符串获取
		if(obj instanceof String){
			return Ext.getCmp(obj).getValue;
		}
		
		
	},
	
	Loading : function(msg,flag){
		if(flag == true){
			Ext.Viewport.setMasked({
				xtype:'loadmask',
				message:msg,
				padding:'0',
				zIndex:99,//堆叠顺序，越大越前
			})
		}else{
			Ext.Viewport.setMasked(false);
		}
	},
	
	//故障 新接口  2016-5-3
	connectServer_GZ:function(fn,invocationData){
	  	WL.Client.invokeProcedure(invocationData, {
	  		 timeout:180000,
	          onSuccess : function (result) {
	          	var httpStatusCode = result.status;
	          	if (200 == httpStatusCode) {
	                  var invocationResult = result.invocationResult;
	                  var isSuccessful = invocationResult.isSuccessful;
	                  if (true == isSuccessful) {
	                  		fn(invocationResult);
	                  } else {
	                	  	myLoading.hide();
	                	  	Ext.Msg.alert('提示',"网络出错！");
	                  }
	              } else {
	            	  	myLoading.hide();
	            	  	Ext.Msg.alert('提示',"网络出错！");
	              }
	          },  
	          onFailure : function () {
	        	  myLoading.hide();
	        	  Ext.Msg.alert('提示',"失败！");
	          }
	      });
	},
	
	
	//公司通讯录测试  2015-10-30
	connectSql_TXL:function(fn,num,data){
		myLoading.show();
		console.log(data.pcode,data.cond,data.selcomp,data.cond_selcomp);
		var invocationData={
				adapter : 'SqlAdapter_PAD_UCDB',  //Adapter名字
	            procedure : 'procedure_Three',  //Adapter方法名
	            parameters : [num, data.pcode,data.cond,data.selcomp,data.cond_selcomp]	
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					//console.log('放的'+eval("("+result+")"));
					myLoading.hide();
					var httpStatusCode = result.status;
				
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							var v_result = invocationResult.resultSet;
							//console.log(v_result[0].ORGNAME);
							//var json = eval("("+v_result+")"); 
							fn(v_result);
						} else {
							myLoading.hide();
							WL.Toast.show('服务器繁忙，请稍后重试！');
							fn(null);
						}
					} else {
						myLoading.hide();
						WL.Toast.show('服务器繁忙，请稍后重试！');
						fn(null);
					}
				},  
				onFailure : function () {
					myLoading.hide();
					fn(null);
					WL.Toast.show('连接不上服务器，请稍后重试！');
				}
			});
		} catch (e) {
			alert("error");
			myLoading.hide();
			WL.Toast.show('系统出错，请稍后重试！');
			fn(null);
		}

	},
	
	
	
	/**
	 * 控制全部页面的跳转
	 */
	showNextView : function(id,name) {
		/*
		var view = Ext.create(name);
		// 判断当旧视图存在的时候就从Viewport移除
		view.on("deactivate", function(oldActiveItem, container, newActiveItem, eOpts) {  
			if (oldActiveItem) {
				Ext.Viewport.remove(oldActiveItem, true);  
				oldActiveItem.destroy();
			}  
		});
		*/
//		var view = Ext.getCmp(id);
//		if(!view){
//			view = Ext.create(name);
//		}
//		
//		//Ext.Viewport.getLayout().setAnimation({type : 'slide', direction : 'left'});
//		Ext.Viewport.setActiveItem(view); 
		
		var ViewId = Ext.Viewport.getActiveItem().id;
		var ViewName = Ext.Viewport.getActiveItem().__proto__.$className;
		ViewArray.push({ViewId:ViewId,ViewName:ViewName});
		var viewName=Ext.getCmp(id);
		   if(viewName){
			   viewName.destroy();
		   }
	    Ext.Viewport.setActiveItem(Ext.create(name));
	},
	
	 //进入下一个页面，跳转
	NextView:function(viewId,FullName){
		var ViewId = Ext.Viewport.getActiveItem().id;
		var ViewName = Ext.Viewport.getActiveItem().__proto__.$className;
		ViewArray.push({ViewId:ViewId,ViewName:ViewName});
		var viewName=Ext.getCmp(viewId);
		   if(viewName){
			   viewName.destroy();
		   }
	    Ext.Viewport.setActiveItem(Ext.create(FullName));
	},
  
  BackView:function(){
	  var length = ViewArray.length-1;
		var viewId = ViewArray[length].ViewId;
		var ViewName = ViewArray[length].ViewName;
		var main = Ext.getCmp(viewId);
		if(!main){
			 main = Ext.create(ViewName);
		}
		Ext.Viewport.setActiveItem(main);
		ViewArray.splice(ViewArray.length-1,1);
		
  },
	
	/**
	 * 控制全部页面的返回跳转
	 */
	showBackView : function(id, name) {
		var main = Ext.getCmp(id);
   	 	if(!main){
   		 main = Ext.create(name);
   	 	}
   	//销毁返回前的页面
		var ViewId = Ext.Viewport.getActiveItem().id;
		var viewName=Ext.getCmp(ViewId);
		if(viewName){
			viewName.destroy();
		}
		
   	 	Ext.Viewport.setActiveItem(main);
   	 	ViewArray.splice(ViewArray.length-1,1);
   	 	
	},
	
	showBackView2 : function(id, name) {
		var main = Ext.getCmp(id);
   	 	if(!main){
   		 main = Ext.create(name);
   	 	}
		
   	 	Ext.Viewport.setActiveItem(main);
   	 	ViewArray.splice(ViewArray.length-1,1);
   	 	
	},
	
	/**
	 * 访问SQL
	 */
	connectSql : function (fn, jokey) {
		if (jokey.wattingFlag) {
			myLoading.show();
		}
		var invocationData = {  
                adapter : 'SqlAdapter_PDA',  
                procedure : jokey.producedure,
                parameters : jokey.params 
        }; 
		
    	WL.Client.invokeProcedure(invocationData, {
    		timeout:60000,
            onSuccess : function (result) { 
            	myLoading.hide();
            	var httpStatusCode = result.status;
            	if (200 == httpStatusCode) {
                    var invocationResult = result.invocationResult;
                    var isSuccessful = invocationResult.isSuccessful;
                    if (true == isSuccessful) {
                    	var resultSet = invocationResult.resultSet;
                    	 if(resultSet.length>0){ 
                    		 try {
                    			 if (jokey.obj == undefined) {
                        			 fn(resultSet);                    			 
                        		 } else {
                        			 fn(resultSet,jokey.obj);
                        		 }
                    		 } catch(e) {
//                    			 Ext.Msg.alert('提示','数据异常!');
                    			 WL.Toast.show('数据异常，请稍后重试！');
                    		 }
	                   	 }else{
//	                   		 Ext.Msg.alert('提示','没有符合的数据!');   
	                   		WL.Toast.show('服务器繁忙('+ resultSet.length +')！');
	                   	 }
                    	
                    } else {
//                    	Ext.Msg.alert('提示','获取数据失败!');  
                    	WL.Toast.show('服务器繁忙('+ isSuccessful +')，请稍后重试！');
                    }
                } else {
//                	Ext.Msg.alert('提示','网络出错！'); 
                	WL.Toast.show('服务器繁忙('+ httpStatusCode +')，请稍后重试！');
                }
            },  
            onFailure : function () {
            	myLoading.hide();
//            	Ext.Msg.alert('提示','发送请求失败');
            	WL.Toast.show('连接服务器失败,请稍后重试！');
            }
        });
		
	},
	connectServer2 : function(fn, password, params) {
		myLoading.show();
		var invocationData = {  
	              adapter : 'SqlAdapter_PDA',  
	              procedure : 'getStories',
	              parameters : [password, params]
		};
	  	WL.Client.invokeProcedure(invocationData, {
	  		 timeout:60000,
	          onSuccess : function (result) {
	        	myLoading.hide();
	          	var httpStatusCode = result.status;
	          	if (200 == httpStatusCode) {
	                  var invocationResult = result.invocationResult;
	                  var isSuccessful = invocationResult.isSuccessful;
	                  if (true == isSuccessful) {
	                  	var status = invocationResult.status.code;
	                  	try {
	                  		if (status == 250) {
		                          var result = invocationResult.content;
		                          // 转化成JSON对象
		                          var json = eval("("+ result +")");
		                          fn(json);
		                  	} else {
		                  		var result = invocationResult.content;
		                        var json = eval("("+ result +")");
		                  		if (json.msginfo != undefined && json.msginfo != '') {
//		                  			Ext.Msg.alert('提示',json.msginfo);
		                  			WL.Toast.show('服务器繁忙，请稍后重试！');
		                  		} else {
//		                  			Ext.Msg.alert('提示',"服务器出错！");
		                  			WL.Toast.show('服务器繁忙，请稍后重试！');
		                  		}
		                  	}
	                  	} catch (e) {
//	                  		Ext.Msg.alert('提示',"服务器出错！");
	                  		WL.Toast.show('数据异常，请稍后重试！');
	                  	}
	                  } else {
	                	  	WL.Toast.show('服务器繁忙('+ isSuccessful +')，请稍后重试！');
//	                	  	Ext.Msg.alert('提示',"网络出错！");
	                  }
	              } else {
	            	  	WL.Toast.show('服务器繁忙('+ httpStatusCode +')，请稍后重试！');
//	            	  	Ext.Msg.alert('提示',"网络出错！");
	              }
	          },  
	          onFailure : function () {
	        	  myLoading.hide();
	        	  WL.Toast.show('连接服务器失败，请稍后重试！');
	          }
	      });
	},
	
	
	
	/**
	 * 异步访问网络，没有等待框
	 */
	/*asyconnectServer : function(fn, url, params) {
		var invocationData = {  
	              adapter : 'HttpAdapter_PDA',  
	              procedure : 'getStories_pda',
	              parameters : [url, params]
		};
	  	WL.Client.invokeProcedure(invocationData, {
	  		 timeout:60000,
	          onSuccess : function (result) {
	          	var httpStatusCode = result.status;
	          	if (200 == httpStatusCode) {
	                  var invocationResult = result.invocationResult;
	                  var isSuccessful = invocationResult.isSuccessful;
	                  if (true == isSuccessful) {
	                  	var status = invocationResult.status.code;
	                  	try {
	                  		if (status == 250) {
		                          var result = invocationResult.content;
		                          // 转化成JSON对象
		                          var json = eval("("+ result +")");
		                          fn(json);
		                  	} else {
		                  		WL.Toast.show('连接服务器失败！');
		                  	}
	                  	}catch(e) {
	                  		WL.Toast.show('连接服务器失败！');
	                  	}
	                  } else {
	                	  	WL.Toast.show('连接服务器失败！');
	                  }
	              } else {
	            	  	WL.Toast.show('连接服务器失败！');
	              }
	          },  
	          onFailure : function () {
	        	  WL.Toast.show('连接服务器失败！');
	          }
	      });
	},*/
	/**
	 * 访问网络
	 */
	connectServer : function(fn, url, params) {
		myLoading.show();
		var invocationData = {  
	              adapter : 'HttpAdapter_PDA',  
	              procedure : 'getStories_pda',
	              parameters : [url, params]
		};
	  	WL.Client.invokeProcedure(invocationData, {
	  		 timeout:300000,
	          onSuccess : function (result) {
	        	  console.log(result);
	        	  myLoading.hide();
	          	var httpStatusCode = result.status;
	          	if (200 == httpStatusCode) {
	                  var invocationResult = result.invocationResult;
	                  var isSuccessful = invocationResult.isSuccessful;
	                  if (true == isSuccessful) {
	                  	var status = invocationResult.status.code;
	                  	console.log('status:'+status);
	                  	/*try {*/
	                  		if (status == 250) {
		                          var result = invocationResult.content;
		                          // 转化成JSON对象
		                          var json = eval("("+ result +")");
		                          fn(json);
		                  	}/* else {
	                  			console.log('1数据异常，请稍后重试！');
		                  		Ext.Msg.alert('提示',"服务器出错！");
		                  		WL.Toast.show('1数据异常，请稍后重试！');
		                  	}*/
	                  	/*} catch(e) {
	                  		Ext.Msg.alert('提示',"服务器出错！");
	                  		WL.Toast.show('2数据异常，请稍后重试！');
	                  		console.log('2数据异常，请稍后重试！');
	                  	}*/
	                  } else {
//	                	  	Ext.Msg.alert('提示',"网络出错！");
	                	  	WL.Toast.show('3服务器繁忙('+ isSuccessful +')，请稍后重试！');
	                  }
	              } else {
//	            	  	Ext.Msg.alert('提示',"网络出错！");
	            	  	WL.Toast.show('4服务器繁忙('+ httpStatusCode +')，请稍后重试！');
	              }
	          },  
	          onFailure : function () {
	        	  myLoading.hide();
//	        	  Ext.Msg.alert('提示',"失败！");
	        	  WL.Toast.show('连接服务器失败，请稍后重试！');
	          }
	      });
	},
	//无纸化
	connectServerwzh : function(fn, url, params) {
		myLoading.show();
		var invocationData = {  
	              adapter : 'HttpAdapter_wzh',  
	              procedure : 'getStories_pda',
	              parameters : [url, params]
		};
	  	WL.Client.invokeProcedure(invocationData, {
	  		 timeout:300000,
	          onSuccess : function (result) {
	        	  myLoading.hide();
	          	var httpStatusCode = result.status;
	          	if (200 == httpStatusCode) {
	                  var invocationResult = result.invocationResult;
	                  var isSuccessful = invocationResult.isSuccessful;
	                  if (true == isSuccessful) {
	                  	var status = invocationResult.status.code;
	                  	try {
	                  		if (status == 250) {
		                          var result = invocationResult.content;
		                          // 转化成JSON对象
		                          var json = eval("("+ result +")");
		                          fn(json);
		                  	} else {
//		                  		Ext.Msg.alert('提示',"服务器出错！");
		                  		WL.Toast.show('1数据异常，请稍后重试！-无纸化');
		                  	}
	                  	} catch(e) {
//	                  		Ext.Msg.alert('提示',"服务器出错！");
	                  		WL.Toast.show('2数据异常，请稍后重试！-无纸化');
	                  	}
	                  } else {
//	                	  	Ext.Msg.alert('提示',"网络出错！");
	                	  	WL.Toast.show('3服务器繁忙('+ isSuccessful +')，请稍后重试！');
	                  }
	              } else {
//	            	  	Ext.Msg.alert('提示',"网络出错！");
	            	  	WL.Toast.show('4服务器繁忙('+ httpStatusCode +')，请稍后重试！');
	              }
	          },  
	          onFailure : function () {
	        	  myLoading.hide();
//	        	  Ext.Msg.alert('提示',"失败！");
	        	  WL.Toast.show('连接服务器失败，请稍后重试！');
	          }
	      });
	},
	
	/**
	 * 为了防止意外，不与其他模块起冲突，专门为 急修处理模块 反馈信息页面 的完工提交 专门写的方法
	 * 2016-8-22  xcx
	 */
	connectServerWG : function(fn, url, params) {
		myLoading.show();
		var invocationData = {  
	              adapter : 'HttpAdapter_PDA',  
	              procedure : 'getStories_pda',
	              parameters : [url, params]
		};
	  	WL.Client.invokeProcedure(invocationData, {
	  		 timeout:300000,
	          onSuccess : function (result) {
	        	  myLoading.hide();
	          	var httpStatusCode = result.status;
	          	if (200 == httpStatusCode) {
	                  var invocationResult = result.invocationResult;
	                  var isSuccessful = invocationResult.isSuccessful;
	                  if (true == isSuccessful) {
	                  	var status = invocationResult.status.code;
	                  		if (status == 250) {
	                  			try{
	                  				var result = invocationResult.content;
	                  				var json = eval("("+ result +")");
	                  				fn(json);
	                  			}catch(e){
	                  				WL.Toast.show('提交数据异常，请重试！');
	                  			};
		                  	} else {
		                  		WL.Toast.show('数据异常，请稍后重试！');
		                  	}
	                  } else {
//	                	  	Ext.Msg.alert('提示',"网络出错！");
	                	  	WL.Toast.show('服务器繁忙('+ isSuccessful +')，请稍后重试！');
	                  }
	              } else {
//	            	  	Ext.Msg.alert('提示',"网络出错！");
	            	  	WL.Toast.show('服务器繁忙('+ httpStatusCode +')，请稍后重试！');
	              }
	          },  
	          onFailure : function () {
	        	  myLoading.hide();
//	        	  Ext.Msg.alert('提示',"失败！");
	        	  WL.Toast.show('连接服务器失败，请稍后重试！');
	          }
	      });
	},
	
	/**
	 * 访问网络(保养计划-指示书)
	 */
	connectServer_ZSS : function(fn, url, params) {
		myLoading.show();
		var invocationData = {  
				adapter : 'HttpAdapter_PDA',  
				procedure : 'getStories_pda',
				parameters : [url, params]
		};
		WL.Client.invokeProcedure(invocationData, {
			timeout:60000,
			onSuccess : function (result) {
				myLoading.hide();
				var httpStatusCode = result.status;
				if (200 == httpStatusCode) {
					var invocationResult = result.invocationResult;
					var isSuccessful = invocationResult.isSuccessful;
					if (true == isSuccessful) {
						var status = invocationResult.status.code;
						try {
							if (status == 250) {
								var result = invocationResult.content;
								fn(result);
							} else {
								WL.Toast.show('数据异常，请稍后重试！');
							}
						} catch(e) {
							WL.Toast.show('数据异常，请稍后重试！');
						}
					} else {
						WL.Toast.show('服务器繁忙('+ isSuccessful +')，请稍后重试！');
					}
				} else {
					WL.Toast.show('服务器繁忙('+ httpStatusCode +')，请稍后重试！');
				}
			},  
			onFailure : function () {
				myLoading.hide();
				WL.Toast.show('连接服务器失败，请稍后重试！');
			}
		});
	},
	
	//连接冠达物流查询系统
	connectGDEXP : function(fn,params) {
		myLoading.show();
		var invocationData = {  
	              adapter : 'HttpAdapter_GDEXP',  
	              procedure : 'getGDEXP',
	              parameters : [params]
		};
	  	WL.Client.invokeProcedure(invocationData, {
	  		 timeout:300000,
	          onSuccess : function (result) {
	        	  myLoading.hide();
	        	  console.log(result);
	        	  
	          	var httpStatusCode = result.status;
	          	if (200 == httpStatusCode) {
	                  var invocationResult = result.invocationResult;
	                  var isSuccessful = invocationResult.isSuccessful;
	                  var statusCode = invocationResult.statusCode;
	                  console.log(isSuccessful);
	                  console.log(statusCode);
	                  if (true == isSuccessful && statusCode == 200) {
	                	  var result = invocationResult.text;
	                	  console.log(result);
	                	  fn(result);
	                  } else {
//	                	  Ext.Msg.alert('提示',"网络出错！");
	                	  WL.Toast.show('服务器繁忙('+ isSuccessful +')，请稍后重试！');
	                  }
	              } else {
//	            	  Ext.Msg.alert('提示',"网络出错！");
	            	  WL.Toast.show('服务器繁忙('+ httpStatusCode +')，请稍后重试！');
	              }
	          	
	          },  
	          onFailure : function () {
	        	  myLoading.hide();
//	        	  Ext.Msg.alert('提示',"失败！");
	        	  WL.Toast.show('连接服务器失败，请稍后重试！');
	          }
	      });
	},
	
	
	
	/**
	 * 异步访问网络，没有等待框
	 */
	asyconnectServer : function(fn, url, params) {
		var invocationData = {  
	              adapter : 'HttpAdapter_PDA',  
	              procedure : 'getStories_pda',
	              parameters : [url, params]
		};
	  	WL.Client.invokeProcedure(invocationData, {
	  		 timeout:300000,
	          onSuccess : function (result) {
	          	var httpStatusCode = result.status;
	          	if (200 == httpStatusCode) {
	                  var invocationResult = result.invocationResult;
	                  var isSuccessful = invocationResult.isSuccessful;
	                  if (true == isSuccessful) {
	                  	var status = invocationResult.status.code;
	                  	if (status == 250) {
	                          var result = invocationResult.content;
	                          // 转化成JSON对象
	                          try {
	                        	  var json = eval("("+ result +")");
		                          fn(json);	                        	  
	                          } catch (e) {
//	                        	  Ext.Msg.alert('提示',"服务器出错！");
//	                        	  WL.Toast.show('连接服务器失败！');
	                          }
	                  	} else {
//	                  		Ext.Msg.alert('提示',"服务器出错！");
	                  		WL.Toast.show('服务器繁忙，请稍后重试！');
	                  	}
	                  } else {
//	                	  	Ext.Msg.alert('提示',"网络出错！");
	                	  	WL.Toast.show('服务器繁忙('+ isSuccessful +')，请稍后重试！');
	                  }
	              } else {
//	            	  	Ext.Msg.alert('提示',"网络出错！");
	            	  	WL.Toast.show('服务器繁忙('+ httpStatusCode +')，请稍后重试！');
	              }
	          },  
	          onFailure : function () {
//	        	  Ext.Msg.alert('提示',"失败！");
	        	  WL.Toast.show('连接服务器失败，请稍后重试！');
	          }
	      });
	},
	
	/**
	 * 异步访问网络，没有等待框
	 */
	asyconnectServer_ : function(fn, obj, url, params) {
		var invocationData = {  
	              adapter : 'HttpAdapter_PDA',  
	              procedure : 'getStories_pda',
	              parameters : [url, params]
		};
	  	WL.Client.invokeProcedure(invocationData, {
	  		 timeout:120000,
	          onSuccess : function (result) {
	        	//console.log("result:"+JSON.stringify(result));
	          	var httpStatusCode = result.status;
	          	if (200 == httpStatusCode) {
	                  var invocationResult = result.invocationResult;
	                  var isSuccessful = invocationResult.isSuccessful;
	                  if (true == isSuccessful) {
	                  	var status = invocationResult.status.code;
	                  		if (status == 250) {
		                          var result = invocationResult.content;
		                          // 转化成JSON对象
		                          var json = eval("("+ result +")");
		                          fn(json,obj);
		                  	} else {
		                  		var result = invocationResult.content;
		                  		if (result != null && result != undefined && result!='') {
			                  		try{
			                  			var json = eval("("+ result +")");
			                  			if (json.msginfo != '') {
				                  			WL.Toast.show(json.msginfo);
				                  			fn(json,obj);
				                  		} else {
				                  			fn(null,obj);
				                  			WL.Toast.show('数据异常，请稍后重试！');
				                  		}
			                  		} catch(e) {
			                  			fn(null,obj);
				                  		WL.Toast.show('数据异常.，请稍后重试！');
				                  	}
			                  		
		                  		} else {
		                  			fn(null,obj);
		                  			WL.Toast.show('服务器繁忙，请稍后重试！');
		                  		}
		                  	}
	                  } else {
//	                	  	WL.Toast.show('服务器出错！');
	                	  	WL.Toast.show('服务器繁忙('+ isSuccessful +')，请稍后重试！');
	                	  	fn(null,obj);
	                  }
	              } else {
	            	  	WL.Toast.show('服务器繁忙('+ httpStatusCode +')，请稍后重试！');
	            	  	fn(null,obj);
	              }
	          },  
	          onFailure : function (result) {
	        	  if (result.errorCode != undefined && result.errorCode != null && result.errorCode != '' && result.errorCode.indexOf('TIMEOUT')!=-1) {
	        		  WL.Toast.show('服务器响应超时！');
	        	  } else {
	        		  WL.Toast.show('连接服务器失败，请稍后重试！');
	        	  }
	        	  fn(null,obj);
	          }
	      });
	},
	
	
	/**
	 * 访问接口
	 */
	connectServer_ws : function(fn, params) {
		var obj = this;
		if (params.loadMsg) {
			WL.ClientMessages.loading = params.loadMsg;
			myLoading = new WL.BusyIndicator('content');
		}
		if (params.isLoading) {
			myLoading.show();
		}
		console.log(params);
		
		var invocationData = {  
				adapter : params.adName,  
				procedure :params.method ,
				parameters : params.parameters
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:120000,
				onSuccess : function (result) {
					WL.ClientMessages.loading = "正在加载";
					myLoading = new WL.BusyIndicator('content');
					myLoading.hide();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							/*var v_result = invocationResult.result;
							var json = eval("("+v_result+")"); */
							fn(invocationResult,obj);
						} else {
							Ext.Msg.alert('提示', '服务器繁忙，请稍后重试！');
							fn(null,obj);
						}
					} else {
						Ext.Msg.alert('提示', '服务器繁忙，请稍后重试！');
						fn(null,obj);
					}
				},  
				onFailure : function (result) {
					WL.ClientMessages.loading = "正在加载";
					myLoading = new WL.BusyIndicator('content');
					myLoading.hide();
					fn(null,obj);
					if (result.errorCode != undefined && result.errorCode != null && result.errorCode != '' && result.errorCode.indexOf('TIMEOUT') != -1) {
		        		  Ext.Msg.alert('提示', '服务器响应超时！');
		        	  } else {
		        		  Ext.Msg.alert('提示', '连接不上服务器，请稍后重试！');
		        	  }
				}
			});
		} catch (e) {
			myLoading.hide();
			Ext.Msg.alert('提示', '系统出错，请稍后重试！');
			fn(null,obj);
		}
	},
	
	/**
	 * 2014-4-3 xcx
	 * 为保养模块准备的方法
	 * 
	 */
	connectServerMainTain : function(fn,fn2, url, params) {
		myLoading.show();
		var invocationData = {  
	              adapter : 'HttpAdapter_PDA',  
	              procedure : 'getStories_pda',
	              parameters : [url, params]
	    };
	  	WL.Client.invokeProcedure(invocationData, {
	  		timeout:300000,
	          onSuccess : function (result) {
	        	myLoading.hide();
	        	WL.ClientMessages.loading = "正在加载";
	    		myLoading = new WL.BusyIndicator('content');
	          	var httpStatusCode = result.status;
	          	if (200 == httpStatusCode) {
	                  var invocationResult = result.invocationResult;
	                //  alert('invocationResult:'+JSON.stringify(invocationResult));
	                  var isSuccessful = invocationResult.isSuccessful;
	                  if (true == isSuccessful) {
	                  	var status = invocationResult.status.code;
	                  	try{
	                  		if (status == 250) {
		                          var result = invocationResult.content;
		                          // 转化成JSON对象
		                          var json = eval("("+ result +")");
		                          fn(json,fn2);
		                  	} else {
		                  		var result = invocationResult.content;
		                  		if (result != null && result != undefined && result!='') {
		                  			var json = eval("("+ result +")");
			                  		if (json.msginfo != '') {
//			                  			Ext.Msg.alert('提示',json.msginfo);
			                  			WL.Toast.show('数据异常，请稍后重试！');
			                  		}
		                  		}
//		                  		Ext.Msg.alert('提示',"服务器出错！");
		                  		WL.Toast.show('数据异常，请稍后重试！');
		                  	}
	                  	} catch(e) {
//	                  		Ext.Msg.alert('提示',"服务器出错！");
	                  		WL.Toast.show('数据异常，请稍后重试！');
	                  	}
	                  } else {
//	                	  	Ext.Msg.alert('提示',"网络出错！");
	                	  	WL.Toast.show('服务器繁忙，请稍后重试！');
	                  }
	              } else {
//	            	  	Ext.Msg.alert('提示',"网络出错！");
	            	  	WL.Toast.show('服务器繁忙，请稍后重试！');
	              }
	          },  
	          onFailure : function () {
	        	  myLoading.hide();
	        	  WL.ClientMessages.loading = "正在加载";
	      		  myLoading = new WL.BusyIndicator('content');
//	        	  Ext.Msg.alert('提示',"失败！");
	        	  WL.Toast.show('连接服务器失败，请稍后重试！');
	          }
	      });
	},
	

	/**
	 * 2014-6-9  xcx
	 * 为故障模块专用的方法
	 * 
	 */
	connectServerMainTainFault : function(fn,fn2,obj, url, params) {
		myLoading.show();
		var invocationData = {  
	              adapter : 'HttpAdapter_PDA',  
	              procedure : 'getStories_pda',
	              parameters : [url, params]
	    };
	  	WL.Client.invokeProcedure(invocationData, {
	          onSuccess : function (result) {
	        	myLoading.hide();
	          	var httpStatusCode = result.status;
	          	if (200 == httpStatusCode) {
	                  var invocationResult = result.invocationResult;
	                  var isSuccessful = invocationResult.isSuccessful;
	                  if (true == isSuccessful) {
	                	  	console.log(invocationResult.status);
	                  	var status = invocationResult.status.code;
	                  	try {
	                  		if (status == 250) {
		                          var result = invocationResult.content;
		                          // 转化成JSON对象
		                          var json = eval("("+ result +")");
		                          fn(json,obj);
		                  	} else {
		                  		var result = invocationResult.content;
		                        var json = eval("("+ result +")");
		                  		if (json.msginfo != '') {
//		                  			Ext.Msg.alert('提示',json.msginfo);
		                  			WL.Toast.show('数据异常，请稍后重试！');
		                  		} else {
		                  			WL.Toast.show('数据异常，请稍后重试！');
		                  			faultHandingPC_NEW4();
		                  		}
		                  	}
	                  	} catch (e) {
	                  		WL.Toast.show('数据异常，请稍后重试！');
	                  	}
	                  } else {
	                	  	faultHandingPC_NEW4();
	                	  	WL.Toast.show('服务器繁忙，请稍后重试！');
	                  }
	              } else {
	            	  	faultHandingPC_NEW4();
//	            	  	Ext.Msg.alert('提示',"网络出错！");
	            	  	WL.Toast.show('服务器繁忙，请稍后重试！');
	              }
	          },  
	          onFailure : function () {
	        	  myLoading.hide();
	        	  faultHandingPC_NEW4();
//	        	  Ext.Msg.alert('提示',"失败！");
	        	  WL.Toast.show('连接服务器失败，请稍后重试！');
	          }
	      });
	},
	
	//访问edoc接口
	getDataFromEdoc:function(CallbackFunc,parameters){
		var obj = this;
		var invocationData = {
				adapter:'HttpAdapter_edoc2',
				procedure:'getEdoc',
				parameters:[parameters.userid]
		};
		
		try{
			obj.Waitting('正在获取数据！');
			WL.Client.invokeProcedure(invocationData,{
				onSuccess:function(result){
					var StatusCode = result.status;
					if(200 == StatusCode){
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if(true == isSuccessful){
							obj.HideWaitting();
							CallbackFunc(invocationResult);
						}else{
							obj.HideWaitting();
							Ext.Msg.alert('温馨提示','服务器繁忙（'+StatusCode+'）,请稍后重试！');
						}
					}else{
						obj.HideWaitting();
						Ext.Msg.alert('温馨提示','服务器繁忙（'+StatusCode+'）,请稍后重试！');
					}
				},
				onFailure:function(){
					obj.HideWaitting();
					Ext.Msg.alert('温馨提示','服务器无响应,请稍后重试！');
				}
			})
		}catch(e){
			obj.HideWaitting();
			Ext.Msg.alert('警告',e);
			return false;
		}
	},
	
	
	/**
	 * 访问JSONSTORE
	 * 回调方法  JSONStore名  options  条件   MaintenaceCtrl本身
	 */
	queryJSONStore : function(fn,dbname,options,query,obj) {
		setTimeout(function(){
			var querys; 
			if (options!=null) {
				querys = WL.JSONStore.get(dbname).find(query, options);
			} else {
				querys = WL.JSONStore.get(dbname).find(query);
			}
//				WL.JSONStore.get(collectionName).findAll()
			querys.then(function(arrayResults){
				console.log('进入JSONStore公共方法   '+arrayResults.length+' dfds');
				
				fn(arrayResults,obj);
			}).fail(function(errorObject) {
			});
		},500);
				
	},

	/**
	 * 设置当前的NavigationView容器
	 */
	setCurrentContainer : function(container) {
		this.getApplication().currentContainer = container;
	},
	/**
	 * 获取当前的NavigationView容器
	 */
	getCurrentContainer : function() {
		return this.getApplication().currentContainer;
	},

	/**
	 * 控制所有页面的创建显示
	 */
	showView : function(name) {
		console.log(name);
		this.removeRightBtn();
		var view = Ext.create("Helcss.view." + name);
		this.getCurrentContainer().push(view);
	},

	/**
	 * 从下面弹出View
	 */
	presentView : function(name) {
		var view = Ext.create(name);
		Ext.Viewport.getLayout().setAnimation('cover');
		Ext.Viewport.getLayout().getAnimation().setDirection('up');
		// 当view处于隐藏状态，为了有动画显示，延迟1秒后从视图中删除
		view.on("deactivate", function(oldActiveItem, container, newActiveItem, eOpts) {
			if (oldActiveItem) {
				var task = Ext.create('Ext.util.DelayedTask', function() {
					Ext.Viewport.remove(oldActiveItem, true);
				});
				task.delay(1000); // the callback function will now be called
			}
		});
		Ext.Viewport.setActiveItem(view);
	},

	dismissView : function() {
		Ext.Viewport.getLayout().setAnimation('reveal');
		Ext.Viewport.getLayout().getAnimation().setDirection('down');
		Ext.Viewport.setActiveItem(this.getCurrentContainer());
	},

	/**
	 * 添加右侧按钮
	 */
	addRightBtn : function(name, callback) {
		console.log("addRightBtn");
		this.removeRightBtn();
		this.getCurrentContainer().getNavigationBar().add({
			id : "rightButton",
			xtype : 'button',
			align : 'right',
			text : name,
			handler : callback
		});
	},

	/**
	 * 移除右方按钮
	 */
	removeRightBtn : function() {
		var button = Ext.getCmp('rightButton');
		if (button) {
			this.getCurrentContainer().getNavigationBar().remove(button);
		}
	},

	/**
	 * 获取区域数组
	 */
	getAreaArray : function() {
		var areas = this.getAreaSelectName().split(" ");
		var province = areas[0], city = areas[2] == null ? "" : areas[2], district = areas[3] == null ? "" : areas[3];
		return [ province, city, district ];
	},

	/**
	 * 获取区域已选择的名字
	 */
	getAreaSelectName : function() {
		return this.getController("AreaSelectController").areaName;
	},

	/**
	 * 设置区域选择的名字
	 */
	setAreaSelectName : function(name) {
		this.getController("AreaSelectController").areaName = name;
	},

	/**
	 * 获取产品记录
	 */
	getProductionRecord : function() {
		return this.getController("CategorySelectController").getProductionRecord();
	},

	/**
	 * 获取Controller
	 */
	getController : function(name) {
		return this.getApplication().getController(name);
	},

	/**
	 * 给没有tap事件的控件添加tap事件
	 */
	addTapEvent : function(component) {
		component.element.on('tap', function(e, t) {
			component.fireEvent('tap', component, e, t);
		}, component);
	},

	/**
	 * 移除某个Store的缓存
	 */
	removeStoreCache : function(name) {
		var cacheStore = Ext.getStore(name).load();
		cacheStore.removeAll();
		cacheStore.sync();
	},

	/**
	 * 显示Android原生时间选择插件
	 */
	showAndroidDatePicker : function(date, onDatePickSuccess, onDatePickFailure) {
		cordova.exec(onDatePickSuccess, onDatePickFailure, "DatePickerPlugin", "datepicker", date);
	},

	/**
	 * 获取上次选择名字
	 */
	getLastSelectName : function(flag, value) {
		var lastSelect = Ext.getStore('LastSelects').load();
		lastSelect.clearFilter(true);
		lastSelect.filter("flag", flag);

		if (value) {
			lastSelect.filter("flag", flag);
			if (lastSelect.getCount() > 0) {
				var index = lastSelect.find('flag', flag);
				var record = lastSelect.getAt(index);
				record.set('name', value);
				record.dirty = true;
				lastSelect.sync();
			} else {
				lastSelect.add({
					value : value,
					flag : flag
				});
				lastSelect.sync();
			}
		} else {
			if (lastSelect.getCount() > 0) {
				value = lastSelect.getAt(0).get("name");
			}
		}
		return value;
	},

	/**
	 * 获取上次选择记录
	 */
	getLastSelectRecord : function(flag, record) {
		var lastSelect = Ext.getStore('LastSelects').load();
		lastSelect.clearFilter(true);
		lastSelect.filter("flag", flag);

		if (record) {
			lastSelect.filter("flag", flag);
			if (lastSelect.getCount() > 0) {
				var index = lastSelect.find('flag', flag);
				var lRecord = lastSelect.getAt(index);
				lRecord.set('name', record.get('name'));
				lRecord.set('m_id', record.get('m_id'));
				lRecord.dirty = true;
				lastSelect.sync();
			} else {
				lastSelect.add({
					name : record.get('name'),
					flag : flag,
					m_id : record.get('m_id')
				});
				lastSelect.sync();
			}
		} else {
			console.log("lastSelect.getCount()---" + lastSelect.getCount());
			if (lastSelect.getCount() > 0) {
				record = lastSelect.getAt(0);
			}
		}

		return record;
	},

	/**
	 * pop
	 */
	pop : function(num) {
		console.log("pop num --- " + num);
		this.getCurrentContainer().pop(num);
	},

	/**
	 * 从适配器 查 数据
	 * 
	 * @param {String}
	 *            storeName 数据存储到store
	 * @param {Object}
	 *            listEntity 获取数据后，展示列表
	 * @param {Object}
	 *            data 适配器参数
	 * @param {Boolean}
	 *            objectshowNullMessage 获取数据为空时，是否弹出提示
	 * @param {String}
	 *            showView 获取数据后，需要跳转的View名
	 * @param {Func}
	 *            callFunc 回调函数
	 */
	getAdapterProcess : function(storeName, listEntity, data, showNullMessage, showView, callFunc) {
		var app = this.getApplication();
		app.getAdapterProcess(storeName, listEntity, data, showNullMessage, showView, callFunc);
	},

	/**
	 * 向适配器 增 数据
	 * 
	 * @param {Object}
	 *            data 适配器参数
	 * @param {Object}
	 *            form 提交的form名
	 */
	setAdapterProcessAtBackground : function(data, form, callFuncFail) {
		Ext.Msg.alert('提示', '数据提交请求已发出');
		WL.Client.invokeProcedure(data, {
			onSuccess : function(response) {
				var items = response.invocationResult.Items;
				if (items.id == null || items.id == "") {
					if (callFuncFail)
						callFuncFail();
				} else {
					// Ext.Msg.alert('提示', '数据提交成功');
					if (form != null) {
						form.reset();
					}
				}
			},
			onFailure : function() {
				if (callFuncFail)
					callFuncFail();
			}
		});
	},

	/**
	 * 搜索页面，进行搜索过滤 搜索框的name属性和需要过滤的store名字关联关系为search+storeName
	 * 
	 */
	onSearchKeyUp : function(field) {
		var value = field.getValue();
		var name = field.getName().replace('search', '');
		console.log("searchcname:" + name);
		store = Ext.getStore(name);
		store.clearFilter();
		if (value) {
			var searches = value.split(' '), regexps = [], i;
			for (i = 0; i < searches.length; i++) {
				if (!searches[i])
					continue;
				regexps.push(new RegExp(searches[i], 'i'));
			}

			store.filter(function(record) {
				var matched = [];
				for (i = 0; i < regexps.length; i++) {
					var search = regexps[i], didMatch = record.get('name').match(search);
					matched.push(didMatch);
				}
				if (regexps.length > 1 && matched.indexOf(false) != -1) {
					return false;
				} else {
					return matched[0];
				}
			});
		}
	},

	onSearchClearIconTap : function(field) {
		var name = field.getName().replace('search', '');
		var store = Ext.getStore(name);
		store.clearFilter();
	},

	/**
	 * 获取本月第一天
	 * 
	 */
	getFirstDateOfMonth : function() {
		var firstDate = new Date();
		firstDate.setDate(1);
		return new Date(firstDate);
	},

	/**
	 * 获取本月最后一天
	 * 
	 */
	getEndDateOfMonth : function() {
		var firstDate = new Date();
		firstDate.setDate(1);
		var endDate = new Date(firstDate);
		endDate.setMonth(firstDate.getMonth() + 1);
		endDate.setDate(0);
		return new Date(endDate);
	},

	addHour : function(date, h) {
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		var hour = date.getHours();
		var min = date.getMinutes();
		var s = date.getSeconds();
		var d = new Date(year, month, day, hour + h, min, s);
		return d;
	},

	/**
	 * 保留两位小数
	 * 
	 * @param x
	 * @returns {Number}
	 */
	changeTwoDecimal : function(x) {
		var f_x = parseFloat(x);
		if (isNaN(f_x)) {
			alert('function:changeTwoDecimal->parameter error');
			return false;
		}
		var f_x = Math.round(x * 100) / 100;
		return f_x;
	},

	/**
	 * 延迟取消选择list中的选中
	 * 
	 * @param list
	 */
	deselectListItem : function(list) {
		var task = Ext.create('Ext.util.DelayedTask', function() {
			list.deselectAll();
		});
		task.delay(100);
	},
	
	hideKeyboard: function(callback, scope) {
		console.log('hideKeyboard');
		var activeElement = document.activeElement;
		activeElement.setAttribute('readonly', 'readonly'); // Force keyboard to hide on input field.
		activeElement.setAttribute('disabled', 'true'); // Force keyboard to hide on textarea field.
		Ext.defer(function() {
			activeElement.blur();
			// Remove readonly attribute after keyboard is hidden.
			activeElement.removeAttribute('readonly');
			activeElement.removeAttribute('disabled');
			if(callback) {
				callback.call(scope);
			}
		}, 100);
	},
	   
	
	/**
	 * HelcPDA.view.maintain.MaintenancePlanPanelMonth 中获取查询时间的公共方法
	 * xcx 2014-4-8
	 */
/*	//获取公共变量的年和月,组合成按月查询的条件 
	GaimMpmTime:function(){
		console.log('进入同用时间中');
		var month=MppnMonth;
    	var year=MppmYear;
    	var day=year+'-'+month;
    	return day;
	},*/
	
	//为日历仓添加数据    查询的json,天数
	calendarAdd:function(json,data,yearandmonth){
		//拆分日期字符串,获取获取年-月-日
		var datas=new Array();
		//获取日
		var ri=new Array();
		//获取 年 月 日
		var datari=new Array();
		
		if(json!=null){	
			datas=json.split(',');		
			for(var i=0;i<datas.length;i++){
				datari=datas[i].split('-');
				ri[i]=datari[2];
				console.log('日期  '+datas[i]+'分割 '+datari[2]+"获取日  "+ri[i]);	
			}	
		}else{
			console.log('今日没有保养计划');	
		}
		
		//记录日历
		var rl=new Array();
		
		//2014-5-12
		rl[0]={num:'周日',cl:'day day_weel'};
		rl[1]={num:'周一',cl:'day day_weel'};
		rl[2]={num:'周二',cl:'day day_weel'};
		rl[3]={num:'周三',cl:'day day_weel'};
		rl[4]={num:'周四',cl:'day day_weel'};
		rl[5]={num:'周五',cl:'day day_weel'};
		rl[6]={num:'周六',cl:'day day_weel'};
		//获取当月第一天 的星期
		var xqDay=yearandmonth+'-'+1;
		xqDay = xqDay.replace(/-/g,"/");
		var ndate = new Date(xqDay);
		var day = ndate.getDay();
		//alert('day:'+day);
		
		var connum;
		var addnum=0;
		if(day==0){
			connum=7;
		}else if(day==1){
			rl[7]={num:0,cl:'day day_null'};
			connum=8;
		}else if(day==2){
			rl[7]={num:0,cl:'day day_null'};
			rl[8]={num:0,cl:'day day_null'};
			connum=9;
		}else if(day==3){
			rl[7]={num:0,cl:'day day_null'};
			rl[8]={num:0,cl:'day day_null'};
			rl[9]={num:0,cl:'day day_null'};
			connum=10;
		}else if(day==4){
			rl[7]={num:0,cl:'day day_null'};
			rl[8]={num:0,cl:'day day_null'};
			rl[9]={num:0,cl:'day day_null'};
			rl[10]={num:0,cl:'day day_null'};
			connum=11;
		}else if(day==5){
			rl[7]={num:0,cl:'day day_null'};
			rl[8]={num:0,cl:'day day_null'};
			rl[9]={num:0,cl:'day day_null'};
			rl[10]={num:0,cl:'day day_null'};
			rl[11]={num:0,cl:'day day_null'};
			connum=12;
		}else if(day==6){
			rl[7]={num:0,cl:'day day_null'};
			rl[8]={num:0,cl:'day day_null'};
			rl[9]={num:0,cl:'day day_null'};
			rl[10]={num:0,cl:'day day_null'};
			rl[11]={num:0,cl:'day day_null'};
			rl[12]={num:0,cl:'day day_null'};
			connum=13;
		};
		/*return ;*/
		//
		/*rl[0]={num:0,cl:'day day_null'};*/
		var count=1;
		var cd=Number(day)+Number(data)+Number(7);
		
		//日历显示下标
		var MainRL_XuanZhongXB=Ext.getCmp('MainRL_XuanZhongXB').getValue();
		
		for(var i=connum;i<cd;i++){
			var flag=false;
			for(var j=0;j<ri.length;j++){
				if(count==ri[j]){
					rl[i]={num:count,cl:'day day_plan',day:datas[j]};
					
					/*alert('MainRL_XuanZhongXB:  '+MainRL_XuanZhongXB  +'connum:  '+connum);
					alert('count:  '+count+'  ri[j]:  '+ri[j]);*/
					if(MainRL_XuanZhongXB!=0&&MainRL_XuanZhongXB==count){
						rl[i]={num:count,cl:'day day_today',day:datas[j]};
					};
					flag=true;
					break;
				}
			}
			if(!flag){
				rl[i]={num:count,cl:'day day_blank'};
			};
			count++;
		};
		
		

		
		
		//输出查看
		for(var i=0;i<=rl.length;i++){
			console.log(rl[i]);
		}

		return  rl;
		//[{"_id":3,"json":{"tcode":"mainjaValue","tid":"2013-4/1-1P72JN","stext":"2013-04-22"}}] 
		/*var ss=[{'num':'fdfd','cl':'fsdfd'},{}，{}];
		 var json = eval("("+ ss +")");
		 
		 df.setData(json);*/
	},
	
	//获取年和月,在计算天数
	countDay:function(year,month){
		return new Date(year,month,0).getDate();
	},
	
	
	/**xcx 2014-4-11
	 * 创建一个查询一天的公共方法
	 * 存储在JSONStore中
	 */
	commonalitySelect:function(obj,day){
		//数据清空
		var MaintList=Ext.data.StoreManager.get('MaintainPlanList');
		if (!MaintList) { 
			MaintList = Ext.create("HelcPDA.store.maintain.MaintainPlanList"); 
		};
		//先清空数据仓
		var record=[];
		MaintList.setData(record, this);
		
		var dbname=collectionName;
		var options={
			exact:false,//默认
		};
		var query={tcode:'mainfields',tid:day};
		console.log('查询的天数：'+day);
		console.log('进入公共查询一日的方法中');
		this.queryJSONStore(obj.todayisgood,dbname,options,query,obj);
		
	},
	
	
	//更新和查看组员的维保计划的公共方法
	//有JSONStore
	updateNewDay:function(obj,day){

		console.log('保养模块更新时间:'+day);
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var options={exact:true};//默认是false
    	//20160614改 真机搜索jsonstore出现bug
//		var deletemainfields={tcode:'mainfields',tid:day};
		var deletemainfields={tcode:'mainfields'};
		MaintainList.remove(deletemainfields,options).then(function(num1){
			console.log('---num1:'+num1);
    		console.log('更新-删除mainfields成功');
    		//改前 2014-11-21
    		//var deletemainitem={tcode:'MAINITEM',tid:day};
    		var deletemainitem={tcode:'MAINITEM'};
    		MaintainList.remove(deletemainitem,options).then(function(num2){
    			console.log('---num2:'+num2);
    			console.log('更新-删除mainitem成功');
    		
    			var Maintmsgdel={tcode:'mainsecmsg'};
    	    	
    	    	var options2={exact:true};//默认是false
    			MaintainList.remove(Maintmsgdel,options).then(function(num3){
    				console.log('---num3:'+num3);
    				console.log('更新-Maintmsgdel删除成功');
    				
    				var Maintxml={tcode:'mainxmlName'};
    				var options2={exact:true};//默认是false
    				MaintainList.remove(Maintxml,options2).then(function(num4){
    					console.log('---num4:'+num4);
    					console.log('更新-Maintxml删除成功');
    				
//旧保养计划    					obj.connectServerMainTain(obj.handleResult,obj,"maintainancePlanItemListAction.do?method=toSearchDetail2","{'person_id':'"+seeatid+"','date':'"+c+"','position_type':'"+position_type+"'}");

    					var parameters = {
    							procedure : 'PlanListQuery',
    							isLoading : true,
    							contentStr : "{\"person_id\":\""+seeatid+"\"}",
    							startD : Ext.Date.format(new Date(day),'m/d/Y'),
    							endD : Ext.Date.format(Ext.Date.add(new Date(day),Ext.Date.DAY,1),'m/d/Y')
    					};
    					
    					MainCtr.getDataFromServer(obj.handleResult,parameters);
    				}).fail(function(){
    					console.log('更新-Maintxml删除失败');
    				});
    			}).fail(function(){
    				console.log('更新-Maintmsgdel删除失败');
    			});

    		}).fail(function(errorObject){
    			console.log('更新-删除mainitem失败');
    		});
    	}).fail(function(errorObject){
			console.log('更新-删除mainfields失败');
		});
	},
	
	//获取新主页保养计划
	getHomeMaintainPlan:function(obj){
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var options={exact:true};//默认是false
    	//20160614改 真机搜索jsonstore出现bug
//		var deletemainfields={tcode:'mainfields',tid:day};
		var deletemainfields={tcode:'mainfields'};
		MaintainList.remove(deletemainfields,options).then(function(num1){
    		console.log('更新-删除mainfields成功');
    		//改前 2014-11-21
    		//var deletemainitem={tcode:'MAINITEM',tid:day};
    		var deletemainitem={tcode:'MAINITEM'};
    		MaintainList.remove(deletemainitem,options).then(function(num2){
    			console.log('更新-删除mainitem成功');
    			var Maintmsgdel={tcode:'mainsecmsg'};
    	    	var options2={exact:true};//默认是false
    			MaintainList.remove(Maintmsgdel,options).then(function(num3){
    				console.log('更新-Maintmsgdel删除成功');
    				var Maintxml={tcode:'mainxmlName'};
    				var options2={exact:true};//默认是false
    				MaintainList.remove(Maintxml,options2).then(function(num4){
    					console.log('更新-Maintxml删除成功');
//    					obj.connectServerMainTain(obj.getHomeMaintainPlan_Callback,obj,"maintainancePlanItemListAction.do?method=toSearchDetail2","{'person_id':'"+seeatid+"','date':'"+Ext.Date.format(new Date(),'Y-m-d')+"','position_type':'"+position_type+"','home':'Y'}");
    					var parameters = {
    							procedure : 'PlanListQuery',
    							isLoading : false,
    							contentStr : "{\"person_id\":\""+person_id+"\"}",
    							isToDoCount : 'Y',
    							startD : Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, -3),'m/d/Y'),
    							endD : Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 1),'m/d/Y')
    						};
    									
    						MainCtr.getDataFromServer(obj.getHomeMaintainPlan_Callback,parameters);
    				}).fail(function(){
    					console.log('更新-Maintxml删除失败');
    				});
    			}).fail(function(){
    				console.log('更新-Maintmsgdel删除失败');
    			});
    		}).fail(function(errorObject){
    			console.log('更新-删除mainitem失败');
    		});
    	}).fail(function(errorObject){
			console.log('更新-删除mainfields失败');
		});
	},
	
	getHomeMaintainPlan_Callback: function(result,obj) {
		var MaintainList=WL.JSONStore.get(collectionName);
    	var dataMsg=result.secmsg;
    	var dataMsg2=JSON.stringify(result.secmsg);
    	if(dataMsg!=null){
        	var dataM=dataMsg.PNAME;
        	//如果当月有保养项目是不为undefined
        	if(dataMsg2!='{}'&&JSON.stringify(result.secmsg)!='null'&&dataM!=undefined&&dataM!=null&&dataM.length>0){
    	    	    		  	var  dataSecMsg=[];
    	    	    			var nn=dataM.length;
    	    	            	for(var i=0;i<nn;i++){
    	    	            		var Maintmsg={};
    	    	            		if(dataM[i]=='半年度'){
    	    	            			Maintmsg={tcode:'mainsecmsg',tid:'BND',stext:dataMsg.半年度};
    	    	            		}else if(dataM[i]=='半月'){
    	    	            			Maintmsg={tcode:'mainsecmsg',tid:'BY',stext:dataMsg.半月};
    	    	            		}else{
    	    	            			Maintmsg={tcode:'mainsecmsg',tid:'',stext:''};
    	    	            		};
    	    	            		dataSecMsg[i]=Maintmsg;
    	    	            	};
    	    	            	MaintainList.add(dataSecMsg).then(function(){
    	    	            		addSecMsg_home(obj);
    	    	            	}).fail(function(errorObject){
    	    	            		WL.Toast.show("添加出错！");
    	    	        		});
        	}else{
        		addSecMsg_home(obj);
        	};
    	}else{
    		addSecMsg_home(obj);
    	};


    	
    	
    	function addSecMsg_home(obj){
    		var Maintxml={tcode:'mainxmlName',stext:result.xmlName};
    		MaintainList.add(Maintxml).then(function(){
    			console.log(result);
//    			var length = result.fields.length;
    			var length = result.PlanListQuery_Output.NumOutputObjects
				var ndata=[];
				if(length>0){
					var v_result = result.PlanListQuery_Output.ListOfHelPdaMaintainingPlanListIo.HelMaintainPlan;
					
					//增加遥监信息 开始 czq
					var v_DeviceNos;
					if(v_result.length){
						v_DeviceNos = '*'+v_result[0].AssetNumber+'*';
						for(var i = 1;i < v_result.length;i++){
							v_DeviceNos += ',*'+v_result[i].AssetNumber+'*';
						}
					}else{
						v_DeviceNos = '*'+v_result.AssetNumber+'*';
					}
					
					var getEssResult = function(res){
						//czq
						if(v_result.length){
							var id;
							var MainAdd;
							for(var i = 0;i < v_result.length;i++){
								v_result[i].ISACTIVE = res.ess_list[0][v_result[i].AssetNumber];
								id = v_result[i].Id+'/'+Ext.Date.format(new Date(v_result[i].PlanStartDate),'Y-m-d H:i');
								MainAdd = {tcode:'mainfields',tid:id,stext:v_result[i]};
								ndata[i] = MainAdd;
							}
						}else{
							v_result = result.PlanListQuery_Output.ListOfHelPdaMaintainingPlanListIo.HelMaintainPlan;
							v_result.ISACTIVE = res.ess_list[0][v_result.AssetNumber];
							var id = v_result.Id+'/'+Ext.Date.format(new Date(v_result.PlanStartDate),'Y-m-d H:i');
							var MainAdd={tcode:'mainfields',tid:id,stext:v_result};
							ndata[0] = MainAdd; 
						}
						
						//添加mainfields
						MaintainList.add(ndata).then(function(){
							MainCtr.GenHomeMaintainList();
						}).fail(function(errorObject){
				    		console.log('添加mainfields出错');	
				   		});
					}
						
					
					
//					for(var i=0;i<length;i++){
//				    		var id=result.fields[i].MP_ID+'/'+result.fields[i].PLAN_START_DT;
//				    		var MainAdd={tcode:'mainfields',tid:id,stext:result.fields[i]};
//				    		ndata[i] = MainAdd; 
//				    	};   	
//			    	MaintainList.add(ndata).then(function(){
//			    		var length = result.item.length;
//			    		if(length>0){
//			    			var ndata2=[];
//						    for(var i=0;i<length;i++){
//						    	var id=result.item[i].MP_ID+'/'+result.item[i].TASK_ROW_ID;
//						    	var MainAdd={tcode:'MAINITEM',tid:id,stext:result.item[i]};
//						    	ndata2[i] = MainAdd; 
//						    }; 
//						    
//						    //2014-7-5
////							Ext.getCmp('MainPlan_MAINMAINITEM_CZ').setValue(JSON.stringify(ndata2));
//					    	
//							MaintainList.add(ndata2).then(function(){
//					    		
//					    		obj.GenHomeMaintainList();
//					    	}).fail(function(errorObject){
//					    		console.log('添加进添加来了mainitem出错');	
//		    	    		});
//			    		}else{
//			    			obj.GenHomeMaintainList();
//			    		};
//			    	}).fail(function(errorObject){
//			    		console.log('添加mainfields出错');	
//			   		});
					
					MainCtr.asyconnectServer(getEssResult,"maintainancePlanItemListAction.do?method=toSearchESS","{'DeviceNos':'"+v_DeviceNos+"'}");
				}else{
		    		var MaintListHome=Ext.data.StoreManager.get('MaintainPlanListHome');
		    		if (!MaintListHome) { 
		    			MaintListHome = Ext.create("HelcPDA.store.maintain.MaintainPlanListHome"); 
		    		};
		    		MaintListHome.setData(ndata, this);
//		    		WL.Toast.show("当天暂无保养计划或已完成！");
		    	}   
			}).fail(function(errorObject){
				WL.Toast.show("添加出错！");
			});
    		
    	};
	},
	
	GenHomeMaintainList:function(){
		console.log('---GenHomeMaintainList方法');
		
		//为数据仓添加数据
		var MaintListHome=Ext.data.StoreManager.get('MaintainPlanListHome');
		if (!MaintListHome) { 
			MaintListHome = Ext.create("HelcPDA.store.maintain.MaintainPlanListHome"); 
		};
		
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:'mainfields'};
		var options={
			exact:true,//默认
		};
		MaintainList.find(query,options).then(function(arrayResults){
			console.log('保养页面查询到了'+JSON.stringify(arrayResults));
			
			var data=arrayResults.length;
			var ndata = [];
			//判断当天是否有数据  2014-4-12 xcx
			if(data>0){
				for(var i=0;i<data;i++){
					
//					var time=arrayResults[i].json.stext.PLAN_START_DT.split(' ');
					var time=Ext.Date.format(new Date(arrayResults[i].json.stext.PlanStartDate),'Y-m-d H:i').split(' ');
					console.log('time[0]:  '+time[0]);
					console.log('time[1]:  '+time[1]);
					
					var trim={};
					//保养计划旧的 开始
					/*
					trim.PLAN_START_DT=arrayResults[i].json.stext.PLAN_START_DT;
					trim.ASSET_NUM=arrayResults[i].json.stext.ASSET_NUM;
					trim.DOMAIN_NAME=arrayResults[i].json.stext.DOMAIN_NAME;
					trim.PNAME1=arrayResults[i].json.stext.PNAME1;
					trim.PNAME2=arrayResults[i].json.stext.PNAME2;
					trim.PNAME3=arrayResults[i].json.stext.PNAME3;
					trim.TASK_NAME=arrayResults[i].json.stext.TASK_NAME;
					trim.PLAN_STATUS=arrayResults[i].json.stext.PLAN_STATUS;
					trim.PLAN_EMP_IDS=arrayResults[i].json.stext.PLAN_EMP_IDS;
					trim.MP_ID=arrayResults[i].json.stext.MP_ID;
					trim.REGISTRATION=arrayResults[i].json.stext.REGISTRATION;
					if(arrayResults[i].json.stext.ISACTIVE=='1'){
						trim.ISACTIVE='遥监已激活';
					}else if(arrayResults[i].json.stext.ISACTIVE=='0'){
						trim.ISACTIVE='遥监未激活';
					}else{
						trim.ISACTIVE='遥监未安装';
					}
					if(arrayResults[i].json.stext.PLAN_STATUS=='已计划'){
						trim.BYCSS='p_submit_yes';
					}else if(arrayResults[i].json.stext.PLAN_STATUS=='已完成'){
						trim.BYCSS='p_submit_no';
					}else{
						trim.BYCSS='NNNNNNNNNUUUUUUUU';
					};
					
					//
					trim.HHMMTime=time[1];
					*/
					//保养计划旧的 结束
					trim.PLAN_START_DT=Ext.Date.format(new Date(arrayResults[i].json.stext.PlanStartDate),'Y-m-d H:i');
					trim.ASSET_NUM=arrayResults[i].json.stext.AssetNumber;
					trim.DOMAIN_NAME=arrayResults[i].json.stext.DomainName;
					trim.PNAME1=arrayResults[i].json.stext.Employee1;
					trim.PNAME2=arrayResults[i].json.stext.Employee2;
					trim.PNAME3=arrayResults[i].json.stext.Employee3;
//					trim.TASK_NAME=arrayResults[i].json.stext.TASK_NAME;//保养项目名称
					trim.PLAN_STATUS=arrayResults[i].json.stext.PlanStatus;
					var v_plan_emp_names;
					if(trim.PNAME1!=''){
						v_plan_emp_names = trim.PNAME1;
					}
					if(trim.PNAME2!=''){
						v_plan_emp_names += '/'+trim.PNAME2;
					}
					if(trim.PNAME3!=''){
						v_plan_emp_names += '/'+trim.PNAME3;
					}
					trim.PLAN_EMP_IDS=v_plan_emp_names;
					trim.MP_ID=arrayResults[i].json.stext.Id;
//					trim.REGISTRATION=arrayResults[i].json.stext.REGISTRATION;//不明字段
					if(arrayResults[i].json.stext.ISACTIVE==true){//遥监字段
		                trim.ISACTIVE='遥监已激活';
					}else if(arrayResults[i].json.stext.ISACTIVE==false){
		                trim.ISACTIVE='遥监未激活';
					}else{
		                trim.ISACTIVE='遥监未安装';
					}
					if(arrayResults[i].json.stext.PlanStatus=='已计划'){
//						trim.BYCSS='p_submit_yes';
						trim.BYCSS='p_submit_no';
					}else if(arrayResults[i].json.stext.PlanStatus=='已完成'){
//						trim.BYCSS='p_submit_no';
						trim.BYCSS='p_submit_yes';
					}else{
						trim.BYCSS='NNNNNNNNNUUUUUUUU';
					};
					trim.HHMMTime=time[1];
					trim.HHMMTime=time[1];
					ndata[i]=trim;
				};	
			}else{
				/*console.log('添加无明显显示');
				WL.Toast.show("当天暂无保养计划或已完成！");  */
			};
			
			var query={tcode:'_Value',tid:'_Value'};
			var optionsValue={};
			MaintainList.find(query,optionsValue).then(function(arrayResults){
				console.log('_value查询到了'+JSON.stringify(arrayResults));
				var count=arrayResults.length;
				if(count!=0){
					for(var i=0;i<data;i++){
						for(var j=0;j<count;j++){
							var trim=ndata[i].MP_ID+'/'+ndata[i].PLAN_START_DT+'_Value';
							var array_tid=arrayResults[j].json.tid;
							var array_tcode=arrayResults[j].json.tcode;
							
							if((trim==array_tid)&&(trim==array_tcode)){
								if(arrayResults[j].json.status==''){
									ndata[i].PLAN_STATUS='已计划';
								}else if(arrayResults[j].json.status==undefined){
									ndata[i].PLAN_STATUS='已计划';
								}else if(arrayResults[j].json.status==1){
									ndata[i].PLAN_STATUS='正在等待提交';
								}else if(arrayResults[j].json.status==2){
									ndata[i].PLAN_STATUS='已提交';
								};
								
								
								if(arrayResults[j].json.status==''){
									ndata[i].BYCSS='p_submit_yes';
								}else if(arrayResults[j].json.status==undefined){
									ndata[i].BYCSS='p_submit_yes';
								}else if(arrayResults[j].json.status==2){
									ndata[i].BYCSS='p_submit_no';
								}else if(arrayResults[j].json.status==1){
									ndata[i].BYCSS='p_submit_yes';
								}else{
									ndata[i].BYCSS='NNNNNNNNNUUUUUUUU';
								};
								
							};
						};
					};
					
				};
				
				
				//在添加新的数据
				MaintListHome.setData(ndata, this);

			}).fail(function(errorObject){
				WL.Toast.show("查询数据失败！");
			});

		}).fail(function(errorObject){
			WL.Toast.show("查询数据失败！");
		});
	},
	
/**
 * 故障处理模块
 * 2014-5-16
 */	

	//从远程数据库中读取数据,如果读取失败,从本地JSONStore中读取数据
	connectServerFault : function(fn, url, params) {
		myLoading.show();
		var invocationData = {  
	              adapter : 'HttpAdapter_PDA',  
	              procedure : 'getStories_pda',
	              parameters : [url, params]
	    };
	  	WL.Client.invokeProcedure(invocationData, {
	          onSuccess : function (result) {
	          	var httpStatusCode = result.status;
	          	if (200 == httpStatusCode) {
	                  var invocationResult = result.invocationResult;
	                  var isSuccessful = invocationResult.isSuccessful;
	                  if (true == isSuccessful) {
	                  	var status = invocationResult.status.code;
	                  	if (status == 250) {
	                  		myLoading.hide();
	                  		var result = invocationResult.content;
	                        // 转化成JSON对象
	                        var json = eval("("+ result +")");
	                        
	                        
	                        fn.deleteStoppageData(fn,json);
	                        //把获取到的数据添加到FaultHandlingStore数据仓中
	                        //fn.FaultAddData(json);
	                  	} else {
	                  		myLoading.hide();
	                  		fn.readFault(fn);
	                  		Ext.Msg.alert('提示',"服务器出错！");
	                  		//alert("服务器出错！");
	                  	}
	                  } else {
	                	  	myLoading.hide();
	                	  	fn.readFault(fn);
	                	  	Ext.Msg.alert('提示',"网络出错！");
	                  		//alert("网络出错！");
	                  }
	              } else {
	            	  	myLoading.hide();
	            	  	fn.readFault(fn);
	            	  	Ext.Msg.alert('提示',"网络出错！");
	              		//alert("网络出错！");
	              }
	          },  
	          onFailure : function () {
	        	  myLoading.hide();
	        	  fn.readFault(fn);
	        	  Ext.Msg.alert('提示',"失败！");
	        	  //alert("失败!");
	          }
	      });
	},


	//服务请求录入 查询下拉列表框的值
	connectServerHSSS : function(fn,fn2,storename,storename2, url, params) {
		myLoading.show();
		var invocationData = {  
	              adapter : 'HttpAdapter_PDA',  
	              procedure : 'getStories_pda',
	              parameters : [url, params]
	    };
	  	WL.Client.invokeProcedure(invocationData, {
	          onSuccess : function (result) {
	          	var httpStatusCode = result.status;
	          	if (200 == httpStatusCode) {
	                  var invocationResult = result.invocationResult;
	                  var isSuccessful = invocationResult.isSuccessful;
	                  if (true == isSuccessful) {
	                  	var status = invocationResult.status.code;
	                  	if (status == 250) {
	                  		myLoading.hide();
	                          var result = invocationResult.content;
	                          // 转化成JSON对象
	                          var json = eval("("+ result +")");
	                          fn(json,fn2,storename,storename2);
	                  	} else {
	                  		myLoading.hide();
	                  		Ext.Msg.alert('提示',"服务器出错！");
	                  		//alert("服务器出错！");
	                  	}
	                  } else {
	                	  	myLoading.hide();
	                	  	Ext.Msg.alert('提示',"网络出错！");
	                  		//alert("网络出错！");
	                  }
	              } else {
	            	  	myLoading.hide();
	            	  	Ext.Msg.alert('提示',"网络出错！");
	              		//alert("网络出错！");
	              }
	          },  
	          onFailure : function () {
	        	  myLoading.hide();
	        	  Ext.Msg.alert('提示',"失败！");
	        	  //alert("失败!");
	          }
	      });
	},

	//获取两个含有年月日时分秒的时间进行比较
	Faultcomptime:function (beginTime,endTime) {
		var datasbeginTime=new Array();
		var datasendTime=new Array();
		
		//将时间拆分为日期 和时分
		datasbeginTime=beginTime.split('  ');	
		console.log('时间比较：'+datasbeginTime.length+'=='+datasbeginTime[0]+'=='+datasbeginTime[1]);
		datasendTime=endTime.split('  ');	
		console.log('时间比较：'+datasendTime.length+'=='+datasendTime[0]+'=='+datasendTime[1]);
		
		//拆分日期
		var datasbeginTimeRQ=new Array();
		var datasendTimeRQ=new Array();
		
		datasbeginTimeRQ=datasbeginTime[0].split('-');	
		datasendTimeRQ=datasendTime[0].split('-');	
		
		console.log('日期比较：'+datasbeginTimeRQ.length+'=='+datasbeginTimeRQ[0]+'=='+datasbeginTimeRQ[1]+'=='+datasbeginTimeRQ[2]);
		console.log('日期比较：'+datasendTimeRQ.length+'=='+datasendTimeRQ[0]+'=='+datasendTimeRQ[1]+'=='+datasendTimeRQ[2]);
		
		//拆分时分
		var datasbeginTimeSF=new Array();
		var datasendTimeSF=new Array();
		datasbeginTimeSF=datasbeginTime[1].split(':');	
		datasendTimeSF=datasendTime[1].split(':');	
		
		console.log('时分比较：'+datasbeginTimeSF.length+'=='+datasbeginTimeSF[0]+'=='+datasbeginTimeSF[1]);
		console.log('时分比较：'+datasendTimeSF.length+'=='+datasendTimeSF[0]+'=='+datasendTimeSF[1]);
		
		/*//拆分时分再次
		var datasbeginTimeSFQ=new Array();
		var datasendTimeSFQ=new Array();
		datasbeginTimeSFQ=datasbeginTimeSF[0].split('');	
		datasendTimeSFQ=datasendTimeSF[0].split('');	
		
		console.log('时分再次比较：'+datasbeginTimeSFQ.length+'=='+datasbeginTimeSFQ[0]+'=='+datasbeginTimeSFQ[1]);
		console.log('时分再次比较：'+datasendTimeSFQ.length+'=='+datasendTimeSFQ[0]+'=='+datasendTimeSFQ[1]);*/
		
		//拆分时分再次2
		var datasbeginTimeSFH=new Array();
		var datasendTimeSFH=new Array();
		datasbeginTimeSFH=datasbeginTimeSF[1].split('');	
		datasendTimeSFH=datasendTimeSF[1].split('');	
		
		console.log('时分再次比较：'+datasbeginTimeSFH.length+'=='+datasbeginTimeSFH[0]+'=='+datasbeginTimeSFH[1]);
		console.log('时分再次比较：'+datasendTimeSFH.length+'=='+datasendTimeSFH[0]+'=='+datasendTimeSFH[1]);
		
		//比较
		/*parseInt()*/
		var beginTimeNum=parseInt(datasbeginTimeRQ[0]+datasbeginTimeRQ[1]+datasbeginTimeRQ[2]+datasbeginTimeSF[0]+datasbeginTimeSF[1]);
		var endTimeNum=parseInt(datasendTimeRQ[0]+datasendTimeRQ[1]+datasendTimeRQ[2]+datasendTimeSF[0]+datasendTimeSF[1]);
		
		console.log('beginTimeNum转换后比较：'+beginTimeNum);
		console.log('endTimeNum转换后比较：'+endTimeNum);
		
		var flags=false;
		if(beginTimeNum>endTimeNum){
			flags=true;
		}
		return flags;
/*	    var beginTimes = beginTime.substring(0, 10).split('-');
	    var endTimes = endTime.substring(0, 10).split('-');

	    beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
	    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);

	 //   alert(beginTime + "aaa" + endTime);
//	    alert(Date.parse(endTime));
	//   alert(Date.parse(beginTime));
	    var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
	    if (a < 0) {
	        return true;
	    } else if (a > 0) {
	        return false;
	    } else if (a == 0) {
	        return true;
	    } else {
	        return true;
	    }*/
	},

	//签到页面从JSONStore中获取数据
	MainQidanTake:function(MaintainAloneTime,fn,obj){
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:'mainregister',tid:MaintainAloneTime};
		var options={
			exacte:false,//默认
		};
		MaintainList.find(query,options).then(function(arrayResults){
			var data=arrayResults.length;
			console.log('进入签到公共获取方法成功,数量为'+data);
			var ndata = [];
			if(data>0){
				ndata=arrayResults[data-1].json.stext;
			}else{
				/*console.log('添加无明显显示');
				WL.Toast.show("当天暂无保养计划或已完成！");  */
			};
			fn(ndata,obj);
		}).fail(function(errorObject){
			alert("查询数据失败");
		});
	},
	
	//签到页面从JSONStore中删除数据
	MainQidanDelete:function(MaintainAloneTime,obj){
		//先删除JSONStore中的数据在重新添加进去
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var Maintmsgdel={tcode:'mainregister',tid:MaintainAloneTime};
    	var options={exacte:true};//默认是false
		MaintainList.remove(Maintmsgdel,options).then(function(){
			console.log('Maintmsgdel删除成功');
			
			obj.MainQidanAdd(MaintainAloneTime);
		}).fail(function(){
			console.log('Maintmsgdel删除失败');
		});
	},
	
	//已签到和未签到
	judgeYandW:function(MaintainAloneTime,tiaojian){
		var MaintList=Ext.data.StoreManager.get('MaintainPlanList');
		if (!MaintList) { 
			MaintList = Ext.create("HelcPDA.store.maintain.MaintainPlanList"); 
		};
		
		var Maintain=collectionName;
    	var MaintainList=WL.JSONStore.get(Maintain);
    	var query={tcode:'mainregister',tid:MaintainAloneTime};
		var options={
			exacte:false,//默认
		};
		MaintainList.find(query,options).then(function(arrayResults){
			var data=arrayResults.length;
			console.log('进入签到公共获取方法成功,数量为'+data);
			var ndata = [];
			if(data>0){
				ndata=arrayResults[data-1].json.stext;
			}else{
				/*console.log('添加无明显显示');
				WL.Toast.show("当天暂无保养计划或已完成！");  */
			};
			//条件判断
			console.log('ndata,数量为'+ndata.length);
			var ndata2 = [];
			var sign=0;
			for(var i=0;i<ndata.length;i++){
				if(tiaojian==ndata[i].REGISTRATION){
					ndata2[sign]=ndata[i];
					sign++;
				}
			}
			MaintList.setData(ndata2, this);
		}).fail(function(errorObject){
			alert("查询数据失败");
		});
	},

	
	
//创建store 的时候使用
  getStore:function(storeName,FullNAME){
	  var store=Ext.data.StoreManager.get(storeName);
 		if (!store) { 
 			store = Ext.create(FullNAME); 
 		}; 
 		return store;
  },

 //创建一个显示在页面的list
  getList:function(PanelId,ListArray,Data){
	  var obj=this;
	  var Panel=Ext.getCmp('Panel_List_Id');
		if(Panel){
			Panel.destroy();
		}
		var tpl='';
		for(var i=0;i<ListArray.StoreParam.length;i++){
				tpl+='<div>{'+ListArray.StoreParam[i]+'}<div>';
		}
		if(!lists){
			var lists=Ext.Viewport.add({
			     xtype:'panel',
			     id:'Panel_List_Id',
			     style:'height:80%;width:90%;',
			     hideOnMaskTap: true,
		         centered: true,
		         modal:true,
			     items:[
			            {
			            	xtype:'fieldset',
			            	style:'height:100%;width:100%;',
			                items:[
			                  {
			            	xtype:'list',     		
			        		id:ListArray.id,
			        		store:ListArray.StoreName,
			        		    style:'height:100%;width:100%;',
			        		    itemTpl:[
                                            tpl
			        		            ]
			                   }
			                       ] 
			              }
			            ]
		});
		lists.show();
		}
		var store=obj.getStore(ListArray.StoreName,ListArray.StoreFullName);
		store.setData(Data);
	},
	
	showMsg: function(msg) {
		WL.Toast.show(msg);
	},
	
	
	//数组去重
	unique : function (arr) {
		  var ret = [];
		  var hash = {};

		  for (var i = 0; i < arr.length; i++) {
		    var item = arr[i];
		    var key = typeof(item) + item;
		    if (hash[key] !== 1) {
		      ret.push(item);
		      hash[key] = 1;
		    }
		  }

		  return ret;
	},

	
	//白底蓝字等待框
	Waitting : function(msg){
		Ext.Viewport.setMasked({
			xtype : 'loadmask',
			message : msg,
			padding:'0',
		});
	},
	
	HideWaitting : function(){
		Ext.Viewport.setMasked(false);
	},
	
	
	//返回当前时间，精确到时分秒
	NowDayTime : function(){
		var Nowtime1 = new Date().toString();
		var index = Nowtime1.indexOf(':');
		var formatDate = Nowtime1.substring(index-2,index+6);
		var Nowtime0 = Ext.Date.format(new Date(),'Y-m-d');
		var Nowtime = Nowtime0+' '+formatDate;
		console.log(Nowtime0+' '+formatDate);
		return Nowtime;
	},
	
	//扫描二维码
	callOR_Code : function(){
		cordova.plugins.barcodeScanner.scan(
				function(result){
					aleret("seccess");
				},
				function(error){
					alert("error");
				}
		);
	},
	
	//调用本地相机
	takePicture : function(){
		
		navigator.camera.getPicture(
				function(data){
					var img = dom.byId('camera_imager');
					img.style.visibility = "visible";
					img.style.display = "block";
					img.src = data;
					dom.byId('camera_status'),innerHTML = "Success";
				},
				function(e){
					console.log("Error getting picture:"+e);
					dom.byId('camera_status').innerHTML = e;
					dom.byId('camera_image').style.display = "none";
				},
				{
					quality: 50,
					destinationType:navigator.camera.DestinationType.FILE_URL, 
					sourceType: navigator.camera.PictureSourceType.CAMERA,
					allowEdit: true,
					encodingType: Camera.EncodingType.JPEG, 
//					targetWidth: value,
//					targetHeight: value,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: true,
					correctOrientation: true,
					cameraDirection: Camera.Direction.BACK 
				});
	},
	
	
	//调用本地通话记录
	CallLog : function(){
		if (Ext.os.is.Android) {
			cordova.exec(callOK,callFailure,'CallListPlugin','list',['month']);
		
			function callOK(data){
				var CallLogTime = 0;
				for(var i =0;i<data.rows.length;i++){
					if(data.rows[i].type==2){
						var time = data.rows[i].duration;
						var integer = parseInt(time/60);
						var remainder = time%60;
						if(remainder == 0){
							CallLogTime += integer;
						}else{
							CallLogTime += integer+1;
						}
					}
				}
				var syso = "本月呼出时长总计:"+CallLogTime+"分钟";
	//			if(CallLogTime >= 3600){
	//				var hours = parseInt(CallLogTime/3600);
	//				var min = parseInt((CallLogTime -3600*hours)/60);
	//				var sec = CallLogTime - 3600*hours-60*min;
	//				syso = "本月呼出时长总计:"+hours+'小时'+min+"分钟"+sec+"秒";
	//			}
	//			if(3600>CallLogTime&&CallLogTime>=60){
	//				var min = parseInt(CallLogTime/60);
	//				var sec = CallLogTime - min*60;
	//				syso = "本月呼出时长总计:"+min+"分钟"+sec+"秒";
	//			}
	//			if(CallLogTime<60){
	//				var sec = CallLogTime;
	//				syso = "本月呼出时长总计:"+sec+"秒";
	//			}
				Ext.getCmp('Label_CallLog').setHtml(syso);
			}
			
			function callFailure(data){
				WL.Toast.show('调用通话记录失败');
			}
		}
	},
	
	copeteNowTime : function(nowDate,competeTime){
		var tempnewdate=new Date(nowDate);
    	var tempendDate=new Date(competeTime);
    	
    	var newdate1=tempnewdate.getFullYear()+"-"+(tempnewdate.getMonth()+1)+"-"+tempnewdate.getDate();
    	var endDate1=tempendDate.getFullYear()+"-"+(tempendDate.getMonth()+1)+"-"+tempendDate.getDate();
    	
    	if(Date.parse(newdate1)<Date.parse(endDate1)){
    		return true;
    	}else{
    		return false;
    	}
		
	},
	
	formatDate : function(date,flag) {
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		var hour = date.getHours();
		var min = date.getMinutes();
		var scds = date.getSeconds();
		
		var datastr = '';
		if (flag == 'D') {
			datastr = year+"-"+month+"-"+day;
		} else {
			datastr = year+"-"+month+"-"+day+" "+hour+":"+min+":"+scds;
		}
		return datastr;
	},
	
	
//	//tabBar左右滑动
//	TabBarSwipe : function(TabBarId){
//		Ext.get('TabBarId').on('swipe',function(e,t){
//			
//			if (e.direction === 'left' && e.distance >= 20) {
//				TabBar.setActiveItem(TabBar.innerItems[i+1]);
//				if(i==TabBar.innerItems.length-1){
//				}else{
//					i++;
//				}
//		    } else if (e.direction === 'right' && e.distance >= 20) {
//		    	TabBar.setActiveItem(TabBar.innerItems[i-1]);
//		    	if(i==0){
//		    	}else{
//		    		i--;
//		    	}
//		    }
//		});
//	},
	
	
	//待提交数据
    refresh_wtd : function() {
    	var selection_find = [{tcode:'UNCOMMIT',status:'1'},{tcode:'UNCOMMIT',status:'4'}];
		options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var length = arrayResults2.length;
			if (length > 0) {
				if(Ext.getCmp('modules_dataview_id')){
					Ext.getCmp('modules_dataview_id')._store._data.all[0].data.data = length;
					Ext.getCmp('modules_dataview_id').refresh();
				}else{
					document.getElementById('menu_wtd_count').innerHTML = length;
					document.getElementById('menu_wtd_count').className = 't_badge';
				}
			} else {
				//czq
//				Ext.getCmp('dv_special')._store._data.all[0].data.num = '9';
//				Ext.getCmp('dv_special').refresh();
				/*document.getElementById('menu_wtd_count').innerHTML = '0';
				document.getElementById('menu_wtd_count').className = 't_badge_non';*/
				if(Ext.getCmp('modules_dataview_id')){
					Ext.getCmp('modules_dataview_id')._store._data.all[0].data.data = "none";
					Ext.getCmp('modules_dataview_id').refresh();
				}else{
					document.getElementById('menu_wtd_count').innerHTML = '';
					document.getElementById('menu_wtd_count').className = 't_badge';
				}
			}
		}).fail(function(errorObject){
			console.log('---refresh_wtd fail');
		});
    },
    
  //待提交数据
    refresh_wtd2016 : function() {
    	var selection_find = [{tcode:'UNCOMMIT',status:'1'},{tcode:'UNCOMMIT',status:'4'}];
		options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var length = arrayResults2.length;
			if (length > 0) {
				if(Ext.getCmp('dv_special')){//新维保界面适用
					Ext.getCmp('dv_special')._store._data.all[0].data.num = length;
					Ext.getCmp('dv_special').refresh();
				}else if(Ext.getCmp('modules_dataview_id')){//旧维保界面适用
					Ext.getCmp('modules_dataview_id')._store._data.all[0].data.data = length;
					Ext.getCmp('modules_dataview_id').refresh();
				}else if(document.getElementById('menu_wtd_count')){//旧维保界面适用
					document.getElementById('menu_wtd_count').innerHTML = length;
					document.getElementById('menu_wtd_count').className = 't_badge';
				}else{//新维保界面适用
					document.getElementById('daitijiao').innerHTML = length;
					document.getElementById('daitijiao').className = 'DV_badge';
				}
			} else {
				/*document.getElementById('menu_wtd_count').innerHTML = '0';
				document.getElementById('menu_wtd_count').className = 't_badge_non';*/
				if(Ext.getCmp('dv_special')){//新维保界面适用
					Ext.getCmp('dv_special')._store._data.all[0].data.num = "";
					Ext.getCmp('dv_special').refresh();
				}else if(Ext.getCmp('modules_dataview_id')){//旧维保界面适用
					Ext.getCmp('modules_dataview_id')._store._data.all[0].data.data = "none";
					Ext.getCmp('modules_dataview_id').refresh();
				}else if(document.getElementById('menu_wtd_count')){//旧维保界面适用
					document.getElementById('menu_wtd_count').innerHTML = '';
					document.getElementById('menu_wtd_count').className = 't_badge';
				}else{//新维保界面适用
					document.getElementById('daitijiao').innerHTML = '';
					document.getElementById('daitijiao').className = 't_badge';
				}
			}
		}).fail(function(errorObject){
		});
    },
    
    //消息
    loadMessage : function() {
    	var selection_find = [{tcode:'SYSTEM_MESSAGE'}];
		var options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var length = arrayResults2.length;
			var ucount = 0;
			var items = [];
			for (var i = 0; i < length; i ++) {
				var item = arrayResults2[i].json.stext;
				if (item.ISREAD == 'N') {
					ucount ++;
				}
				items[i] = item;
			}
			var store = Ext.data.StoreManager.get('MessageStore');
			store.setData(items);
			if (ucount > 0) {
				if(Ext.getCmp('modules_dataview_id')){
					for(var i =0;i<Ext.getCmp('modules_dataview_id')._data.length;i++){
						if(Ext.getCmp('modules_dataview_id')._data[i].text=="消息"){
							Ext.getCmp('modules_dataview_id')._store._data.all[i].data.data = ucount;		
						}
					}
					Ext.getCmp('modules_dataview_id').refresh();
					//待办任务显示
					var data = Ext.getCmp('new_Todo_dataview').getData();
					data.push({
						TASK_ID: "message",
						color: "GREEN",
						data: ucount,
						icon: "M",
						text: "消息        "                                                 
					});
					Ext.getCmp('new_Todo_dataview').getStore().setData(data);
					Ext.getCmp('new_Todo_dataview').refresh();
				}else{
					document.getElementById('sumxx').innerHTML = ucount;
				}
			} else {
				if(Ext.getCmp('modules_dataview_id')){
					for(var i =0;i<Ext.getCmp('modules_dataview_id')._data.length;i++){
						if(Ext.getCmp('modules_dataview_id')._data[i].text=="消息"){
							Ext.getCmp('modules_dataview_id')._store._data.all[i].data.data = "none";
						}
					}
					Ext.getCmp('modules_dataview_id').refresh();
					
				}else{
					var sumxx = document.getElementById('sumxx');
					if(sumxx)
						sumxx.innerHTML = '';
				}
			}
		}).fail(function(errorObject){
		});
    },
	
  //消息2016
    loadMessage2016 : function() {
    	var selection_find = [{tcode:'SYSTEM_MESSAGE'}];
		var options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var length = arrayResults2.length;
			var ucount = 0;
			var items = [];
			for (var i = 0; i < length; i ++) {
				var item = arrayResults2[i].json.stext;
				if (item.ISREAD == 'N') {
					ucount ++;
				}
				items[i] = item;
			}
			var store = Ext.data.StoreManager.get('MessageStore');
			store.setData(items);
			if (ucount > 0) {
				if(Ext.getCmp('btn_message')){
					Ext.getCmp('btn_message').setBadgeText(ucount);
				}else{
					if(Ext.getCmp('modules_dataview_id')){
						for(var i =0;i<Ext.getCmp('modules_dataview_id')._data.length;i++){
							if(Ext.getCmp('modules_dataview_id')._data[i].text=="消息"){
								Ext.getCmp('modules_dataview_id')._store._data.all[i].data.data = ucount;		
							}
						}
						Ext.getCmp('modules_dataview_id').refresh();
						//待办任务显示
						var data = Ext.getCmp('new_Todo_dataview').getData();
						data.push({
							TASK_ID: "message",
							color: "GREEN",
							data: ucount,
							icon: "M",
							text: "消息        "                                                 
						});
						Ext.getCmp('new_Todo_dataview').getStore().setData(data);
						Ext.getCmp('new_Todo_dataview').refresh();
					}else{
						document.getElementById('sumxx').innerHTML = ucount;
					}
				}
			} else {
				if(Ext.getCmp('btn_message')){
					Ext.getCmp('btn_message').setBadgeText("");
				}else{
					if(Ext.getCmp('modules_dataview_id')){
						for(var i =0;i<Ext.getCmp('modules_dataview_id')._data.length;i++){
							if(Ext.getCmp('modules_dataview_id')._data[i].text=="消息"){
								Ext.getCmp('modules_dataview_id')._store._data.all[i].data.data = "none";
							}
						}
						Ext.getCmp('modules_dataview_id').refresh();
						
					}else{
						var sumxx = document.getElementById('sumxx');
						if(sumxx)
							sumxx.innerHTML = '';
					}
				}
			}
		}).fail(function(errorObject){
		});
    },

	 //跟换件模块专用
    getGHJ:function(obj,fn,param){
		if(param.parameters.Flag){
			myLoading.show();
		};
		var invocationData = {
				adapter :param.adpName,  //Adapter名字
			    procedure : param.prodName,  //Adapter方法名
			    parameters : [param.parameters]
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					if(param.parameters.Flag){
						myLoading.hide();
					};
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						invocationResult.obj=obj;
						fn(invocationResult);
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					if(param.parameters.Flag){
						myLoading.hide();
					};
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			if(param.parameters.Flag){
				myLoading.hide();
			};
			WL.Toast.show('连接服务器出错');
		};
	},
	

	
	//给保存提交特殊使用
	 getGHJTwo:function(obj,fn,param){
			var invocationData = {
					adapter :param.adpName,  //Adapter名字
				    procedure : param.prodName,  //Adapter方法名
				    parameters : [
				    	param.parameters
				    ]
			};
			try {
				WL.Client.invokeProcedure(invocationData, {
					timeout:60000,
					onSuccess : function (result) {
						var httpStatusCode = result.status;
						if (200 == httpStatusCode) {
							var invocationResult = result.invocationResult;
							invocationResult.obj=obj;
							fn(invocationResult);
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						};
					},  
					onFailure : function (result) {
						myLoading.hide();
						WL.Toast.show('服务器繁忙，请稍后重试！');
					},
				});
			} catch (e) {
				myLoading.hide();
				WL.Toast.show('连接服务器出错');
			};
		},
			
	//给保障表和提交特殊使用
	getSafeguard:function(fn,param){
		myLoading.show();
		/*var invocationData = {
				adapter :'HttpAdapter_PDA_SynchronizationTable',  //Adapter名字
			    procedure : 'getBZMeasureQuery',  //Adapter方法名
			    parameters : [
			    	param.parameters
			    ]
		};*/
		var invocationData = {
				adapter :param.adpName,  //Adapter名字
			    procedure : param.prodName,  //Adapter方法名
			    parameters : [
			    	param.parameters
			    ]
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:3600000,
				onSuccess : function (result) {
					//console.log('result------------')
					//console.log(result);
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						fn(invocationResult);
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					};
				},  
				onFailure : function (result) {
					myLoading.hide();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				},
			});
		} catch (e) {
			myLoading.hide();
			WL.Toast.show('连接服务器出错');
		};
	},
	
	//czq
    getDataFromServer:function(CallbackFunc,parameters){
    	var obj = this;
    	var adaptername = parameters.adapter == undefined?'HttpAdapter_MUG':parameters.adapter;
    	var loadingmsg = parameters.loadingmsg == undefined?'正在加载数据！':parameters.loadingmsg;
    	
    	var invocationData = {  
    		adapter : adaptername,  
    		procedure :parameters.procedure ,
    		parameters : [parameters]
    	};

    	try {
    		if(parameters.isLoading)obj.Loading(loadingmsg,true);
			WL.Client.invokeProcedure(invocationData, {
				// timeout:60000,
				onSuccess : function (result) {
					console.log(result);
					var StatusCode = result.status;
					if (200 == StatusCode) {
						var invocationResult = result.invocationResult;
						if (invocationResult.isSuccessful) {
							if(parameters.isLoading)obj.Loading(loadingmsg,false);
							if(invocationResult.Fault){
								if(invocationResult.Fault.faultstring.CDATA){
									Ext.Msg.alert('温馨提示', '（'+parameters.procedure+'）'+invocationResult.Fault.faultstring.CDATA);
								}else if(invocationResult.Fault.faultstring){
									Ext.Msg.alert('温馨提示', '（'+parameters.procedure+'）'+invocationResult.Fault.faultstring);
								}
								
							}else{
								CallbackFunc(invocationResult);
							}
						} else {
							if(parameters.isLoading)obj.Loading(loadingmsg,false);
							Ext.Msg.alert('温馨提示', '（'+parameters.procedure+'）服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						if(parameters.isLoading)obj.Loading(loadingmsg,false);
						Ext.Msg.alert('温馨提示', '（'+parameters.procedure+'）服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function (result) {
					console.log(result);
					if(parameters.isLoading)obj.Loading(loadingmsg,false);
					if(result.invocationContext == null || (result.errorMsg && result.errorMsg.indexOf('timed out') > -1)){
						Ext.Msg.alert('温馨提示', '（'+parameters.procedure+'）数据接口执行超时，请稍后重试！');
					}else{
						Ext.Msg.alert('温馨提示', '（'+parameters.procedure+'）'+result.errorMsg);
					}
				}
			});
		} catch (e) {
			if(parameters.isLoading)obj.Loading(loadingmsg,false);
			Ext.Msg.alert('警告', '（'+parameters.procedure+'）'+e);
			return;
		}
	},
	
	getDataFromPDA:function(CallbackFunc,parameters){
    	var obj = this;
    	var loadingmsg = parameters.loadingmsg == undefined?'正在加载数据！':parameters.loadingmsg;
    	
    	var invocationData = {  
    		adapter : 'HttpAdapter_PDA',  
	        procedure : 'getStories_pda',
	        parameters : [parameters.url, parameters.params]
    	};

    	try {
    		if(parameters.isLoading)obj.Loading(loadingmsg,true);
			WL.Client.invokeProcedure(invocationData, {
				// timeout:60000,
				onSuccess : function (result) {
					console.log(result);
					var StatusCode = result.status;
					if (200 == StatusCode) {
						var responseJSON = result.responseJSON;
						if (responseJSON.isSuccessful) {
							if(parameters.isLoading)obj.Loading(loadingmsg,false);
							if(responseJSON.Fault){
								if(responseJSON.Fault.faultstring.CDATA){
									Ext.Msg.alert('温馨提示', responseJSON.Fault.faultstring.CDATA);
								}else if(responseJSON.Fault.faultstring){
									Ext.Msg.alert('温馨提示', responseJSON.Fault.faultstring);
								}
							}else{
								var result = responseJSON.content;
		                        var json = eval("("+ result +")");
		                        if(json.msgid == 0){
		                        	CallbackFunc(json.items);
		                        }else{
		                        	Ext.Msg.alert('温馨提示', json.msginfo);
		                        }
							}
						} else {
							if(parameters.isLoading)obj.Loading(loadingmsg,false);
							Ext.Msg.alert('温馨提示', '服务器繁忙('+responseJSON.statusCode+')，请稍后重试！');
						}
					} else {
						if(parameters.isLoading)obj.Loading(loadingmsg,false);
						Ext.Msg.alert('温馨提示', '服务器繁忙('+StatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function (result) {
					console.log(result);
					if(parameters.isLoading)obj.Loading(loadingmsg,false);
					if(result.invocationContext == null || (result.errorMsg && result.errorMsg.indexOf('timed out') > -1)){
						Ext.Msg.alert('温馨提示', '执行超时，请稍后重试！');
					}else{
						Ext.Msg.alert('温馨提示', result.errorMsg);
					}
				}
			});
		} catch (e) {
			if(parameters.isLoading)obj.Loading(loadingmsg,false);
			Ext.Msg.alert('警告', e);
			return;
		}
	},
});

function jump2apptype(a){
//	var obj = this.getApplication().getController('HelcPDA.controller.ApplicationController');
//	this.NextView('faultHLP','HelcPDA.view.fault.FaultHandlingPanel');
//	faultHandingPC_NEW(obj);
	console.log('jump2apptype|'+a);
};

//字符串去前后空格
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g,'');
};
function initDate(nowTime,title){
	var day1=[{text: '1号', value: '01'},{ text: '2号', value: '02'},{text: '3号',value: '03'},{text: '4号',value:'04'},
	          {
	              text: '5号',
	              value: '05'
	          },
	          {
	              text: '6号',
	              value: '06'
	          },
	          {
	              text: '7号',
	              value: '07'
	          },
	          {
	              text: '8号',
	              value: '08'
	          },
	          {
	              text: '9号',
	              value: '09'
	          },
	              {
	                  text: '10号',
	                  value: '10'
	              },
	              {
	                  text: '11号',
	                  value: '11'
	              },
	              {
	                  text: '12号',
	                  value: '12'
	              },
	              {
	                  text: '13号',
	                  value: '13'
	              },
	              {
	                  text: '14号',
	                  value: '14'
	              },
	              {
	                  text: '15号',
	                  value: '15'
	              },
	              {
	                  text: '16号',
	                  value: '16'
	              },
	              {
	                  text: '17号',
	                  value: '17'
	              },
	              {
	                  text: '18号',
	                  value: '18'
	              },
	              {
	                  text: '19号',
	                  value: '19'
	              },
	              {
	                  text: '20号',
	                  value: '20'
	              },
	              {
	                  text: '21号',
	                  value: '21'
	              },
	              {
	                  text: '22号',
	                  value: '22'
	              },
	              {
	                  text: '23号',
	                  value: '23'
	              },
	              {
	                  text: '24号',
	                  value: '24'
	              },
	              {
	                  text: '25号',
	                  value: '25'
	              },
	              {
	                  text: '26号',
	                  value: '26'
	              },
	              {
	                  text: '27号',
	                  value: '27'
	              },
	              {
	                  text: '28号',
	                  value: '28'
	              }];

	          var day2=[{text: '1号', value: '01'},{ text: '2号', value: '02'},{text: '3号',value: '03'},{text: '4号',value:'04'},
	          {
	              text: '5号',
	              value: '05'
	          },
	          {
	              text: '6号',
	              value: '06'
	          },
	          {
	              text: '7号',
	              value: '07'
	          },
	          {
	              text: '8号',
	              value: '08'
	          },
	          {
	              text: '9号',
	              value: '09'
	          },
	              {
	                  text: '10号',
	                  value: '10'
	              },
	              {
	                  text: '11号',
	                  value: '11'
	              },
	              {
	                  text: '12号',
	                  value: '12'
	              },
	              {
	                  text: '13号',
	                  value: '13'
	              },
	              {
	                  text: '14号',
	                  value: '14'
	              },
	              {
	                  text: '15号',
	                  value: '15'
	              },
	              {
	                  text: '16号',
	                  value: '16'
	              },
	              {
	                  text: '17号',
	                  value: '17'
	              },
	              {
	                  text: '18号',
	                  value: '18'
	              },
	              {
	                  text: '19号',
	                  value: '19'
	              },
	              {
	                  text: '20号',
	                  value: '20'
	              },
	              {
	                  text: '21号',
	                  value: '21'
	              },
	              {
	                  text: '22号',
	                  value: '22'
	              },
	              {
	                  text: '23号',
	                  value: '23'
	              },
	              {
	                  text: '24号',
	                  value: '24'
	              },
	              {
	                  text: '25号',
	                  value: '25'
	              },
	              {
	                  text: '26号',
	                  value: '26'
	              },
	              {
	                  text: '27号',
	                  value: '27'
	              },
	              {
	                  text: '28号',
	                  value: '28'
	              },
	              {
	                  text: '29号',
	                  value: '29'
	              }];

	          var day3=[{text: '1号', value: '01'},{ text: '2号', value: '02'},{text: '3号',value: '03'},{text: '4号',value:'04'},
	          {
	              text: '5号',
	              value: '05'
	          },
	          {
	              text: '6号',
	              value: '06'
	          },
	          {
	              text: '7号',
	              value: '07'
	          },
	          {
	              text: '8号',
	              value: '08'
	          },
	          {
	              text: '9号',
	              value: '09'
	          },
	              {
	                  text: '10号',
	                  value: '10'
	              },
	              {
	                  text: '11号',
	                  value: '11'
	              },
	              {
	                  text: '12号',
	                  value: '12'
	              },
	              {
	                  text: '13号',
	                  value: '13'
	              },
	              {
	                  text: '14号',
	                  value: '14'
	              },
	              {
	                  text: '15号',
	                  value: '15'
	              },
	              {
	                  text: '16号',
	                  value: '16'
	              },
	              {
	                  text: '17号',
	                  value: '17'
	              },
	              {
	                  text: '18号',
	                  value: '18'
	              },
	              {
	                  text: '19号',
	                  value: '19'
	              },
	              {
	                  text: '20号',
	                  value: '20'
	              },
	              {
	                  text: '21号',
	                  value: '21'
	              },
	              {
	                  text: '22号',
	                  value: '22'
	              },
	              {
	                  text: '23号',
	                  value: '23'
	              },
	              {
	                  text: '24号',
	                  value: '24'
	              },
	              {
	                  text: '25号',
	                  value: '25'
	              },
	              {
	                  text: '26号',
	                  value: '26'
	              },
	              {
	                  text: '27号',
	                  value: '27'
	              },
	              {
	                  text: '28号',
	                  value: '28'
	              },
	              {
	                  text: '29号',
	                  value: '29'
	              },
	              {
	                  text: '30号',
	                  value: '30'
	              }];


	          var day4= [{text: '1号', value: '01'},{ text: '2号', value: '02'},{text: '3号',value: '03'},{text: '4号',value:'04'},
	          {
	              text: '5号',
	              value: '05'
	          },
	          {
	              text: '6号',
	              value: '06'
	          },
	          {
	              text: '7号',
	              value: '07'
	          },
	          {
	              text: '8号',
	              value: '08'
	          },
	          {
	              text: '9号',
	              value: '09'
	          },
	              {
	                  text: '10号',
	                  value: '10'
	              },
	              {
	                  text: '11号',
	                  value: '11'
	              },
	              {
	                  text: '12号',
	                  value: '12'
	              },
	              {
	                  text: '13号',
	                  value: '13'
	              },
	              {
	                  text: '14号',
	                  value: '14'
	              },
	              {
	                  text: '15号',
	                  value: '15'
	              },
	              {
	                  text: '16号',
	                  value: '16'
	              },
	              {
	                  text: '17号',
	                  value: '17'
	              },
	              {
	                  text: '18号',
	                  value: '18'
	              },
	              {
	                  text: '19号',
	                  value: '19'
	              },
	              {
	                  text: '20号',
	                  value: '20'
	              },
	              {
	                  text: '21号',
	                  value: '21'
	              },
	              {
	                  text: '22号',
	                  value: '22'
	              },
	              {
	                  text: '23号',
	                  value: '23'
	              },
	              {
	                  text: '24号',
	                  value: '24'
	              },
	              {
	                  text: '25号',
	                  value: '25'
	              },
	              {
	                  text: '26号',
	                  value: '26'
	              },
	              {
	                  text: '27号',
	                  value: '27'
	              },
	              {
	                  text: '28号',
	                  value: '28'
	              },
	              {
	                  text: '29号',
	                  value: '29'
	              },
	              {
	                  text: '30号',
	                  value: '30'
	              },
	              {
	                  text: '31号',
	                  value: '31'
	              }];

	if(typeof(title)=='undefined'){
		title="选择时间";
	}
	if(nowTime==''||nowTime==null||typeof(nowTime)=='undefined'){
	
	}else{
		  function IsPinYear(year)//判断是否闰平年  
		   {  
		      return(0 == year%4 && (year%100 !=0 || year%400 == 0));  
		    } 
		  var ymd=nowTime.substring(0, 10).split('-');
		  var isPinyear=IsPinYear(ymd[0]);
		  var day=Ext.data.StoreManager.get('day');
			  if (!day) { 
				day = Ext.create("HelcPDA.store.maintain.day"); 
			   };	
		  if(!isPinyear){
			  switch(ymd[1].trim()){
			  case '01': day.setData(day4);    break;
			  case '02': day.setData(day1);    break;
			  case '03': day.setData(day4);    break;
			  case '04': day.setData(day3);    break;
			  case '05': day.setData(day4);    break;
			  case '06': day.setData(day3);    break;
			  case '07': day.setData(day4);    break;
			  case '08': day.setData(day4);    break;
			  case '09': day.setData(day3);    break;
			  case '10': day.setData(day4);    break;
			  case '11': day.setData(day3);   break;
			  case '12': day.setData(day4);   break;
			  }
		  }else{
			 switch(ymd[1].trim()){
			  case '01': day.setData(day4);    break;
			  case '02': day.setData(day2);    break;
			  case '03': day.setData(day4);    break;
			  case '04': day.setData(day3);    break;
			  case '05': day.setData(day4);    break;
			  case '06': day.setData(day3);    break;
			  case '07': day.setData(day4);    break;
			  case '08': day.setData(day4);    break;
			  case '09': day.setData(day3);    break;
			  case '10': day.setData(day4);    break;
			  case '11': day.setData(day3);   break;
			  case '12': day.setData(day4);   break;
			  }
		  }
	}
	
	if(!picker_show){
	 picker_show=Ext.Viewport.add({
         xtype: 'picker',
         ui: 'dark',
         id:'newPicker',
         zIndex:9999,
         doneButton: '确定',
         cancelButton: '取消',
         toolbar: {
             ui: 'light',
             title: title,
             items:[ 
       	         {
       	       xtype:'button',
     	       text:'清除',
     	       listeners:{
     	    	   tap:function(){
     	    		   Ext.getCmp(need_text_id).setValue();
     	    		   Ext.getCmp('newPicker').setHidden(true);
     	    	   }
     	              }
       	          }    
           ]
         },
         slots: [
             {
                 xtype: 'pickerslot',
                 name: 'year',
                 title: '年',
                 flex:1.5,
                 id:'slots10',
                 data: [
                     {
                         text: '2010年',
                         value: '2010'
                     },
                     {
                         text: '2011年',
                         value: '2011'
                     },
                     {
                         text: '2012年',
                         value: '2012'
                     },
                     {
                         text: '2013年',
                         value: '2013'
                     },
                     {
                         text: '2014年',
                         value: '2014'
                     },
                     {
                         text: '2015年',
                         value: '2015'
                     },
                     {
                         text: '2016年',
                         value: '2016'
                     },
                     {
                         text: '2017年',
                         value: '2017'
                     },
                     {
                         text: '2018年',
                         value: '2018'
                     },
                     {
                         text: '2019年',
                         value: '2019'
                     },
                     {
                         text: '2020年',
                         value: '2020'
                     },{
                         text: '2021年',
                         value: '2021'
                     },{
                         text: '2022年',
                         value: '2022'
                     },{
                         text: '2023年',
                         value: '2023'
                     },{
                         text: '2024年',
                         value: '2024'
                     },{
                         text: '2025年',
                         value: '2025'
                     },{
                         text: '2026年',
                         value: '2026'
                     },{
                         text: '2027年',
                         value: '2027'
                     },{
                         text: '2028年',
                         value: '2028'
                     },{
                         text: '2029年',
                         value: '2029'
                     },{
                         text: '2030年',
                         value: '2030'
                     },
                     
                 ],listeners:{
                	 slotpick:function(obj,value,node,eOpts){
                  		var slots1= Ext.getCmp('newPicker');
                  		var year=slots1.getValues().year;
                  	    var month=slots1.getValues().month;
                  	    var nowday=slots1.getValues().day;
                  	   function IsPinYear(year)//判断是否闰平年  
                  	   {  
                  	      return(0 == year%4 && (year%100 !=0 || year%400 == 0));  
                  	    } 
                  	  var isPinyear=IsPinYear(year);
                  	   
                  	  var day=Ext.data.StoreManager.get('day');
        				  if (!day) { 
        					day = Ext.create("HelcPDA.store.maintain.day"); 
        				   };	
        				 	  if(!isPinyear){
                         		  switch(month){
                         		  case '01': day.setData(day4); returnDay();  break;
                         		  case '02': day.setData(day1); returnDay();  break;
                         		  case '03': day.setData(day4); returnDay();  break;
                         		  case '04': day.setData(day3); returnDay();  break;
                         		  case '05': day.setData(day4); returnDay();  break;
                         		  case '06': day.setData(day3); returnDay();  break;
                         		  case '07': day.setData(day4); returnDay();  break;
                         		  case '08': day.setData(day4); returnDay();  break;
                         		  case '09': day.setData(day3); returnDay();  break;
                         		  case '10': day.setData(day4); returnDay();  break;
                         		  case '11': day.setData(day3); returnDay();  break;
                         		  case '12': day.setData(day4); returnDay();  break;
                         		  }
                         	  }else{
                         		 switch(month){
                        		  case '01': day.setData(day4); returnDay();  break;
                        		  case '02': day.setData(day2); returnDay();   break;
                        		  case '03': day.setData(day4); returnDay();   break;
                        		  case '04': day.setData(day3); returnDay();   break;
                        		  case '05': day.setData(day4); returnDay();   break;
                        		  case '06': day.setData(day3); returnDay();   break;
                        		  case '07': day.setData(day4); returnDay();   break;
                        		  case '08': day.setData(day4); returnDay();   break;
                        		  case '09': day.setData(day3); returnDay();   break;
                        		  case '10': day.setData(day4); returnDay();  break;
                        		  case '11': day.setData(day3); returnDay();  break;
                        		  case '12': day.setData(day4); returnDay();  break;
                        		  }
                         	  }
        				 	  function returnDay(){
        				 		 var dayStore=day.getData();
        				 		 var length=dayStore.length-1;
        				 		  if(parseInt(nowday)<=parseInt(dayStore.getAt(length).get('value'))){ 
        				 			 slots1.setValue({day:nowday+''},false);
        				 		  }else{
        				 			slots1.setValue({day:dayStore.getAt(length).get('value')+''},false);
        				 			  } 
        				 	  }
                  	 }
                   }
             },
             {
                 xtype: 'pickerslot',
                 name: 'month',
                 id:'slotsT1',
                 title: '月',
                 data: [
                     {
                         text:'1月',
                         value:'01'
                     },
                     {
                         text:'2月',
                         value:'02'
                     },
                     {
                         text:'3月',
                         value: '03'
                     },
                     {
                         text:'4月',
                         value:'04'
                     },
                     {
                         text:'5月',
                         value:'05'
                     },
                     {
                         text:'6月',
                         value:'06'
                     },
                     {
                         text:'7月',
                         value:'07'
                     },
                     {
                         text:'8月',
                         value:'08'
                     },
                     {
                         text:'9月',
                         value:'09'
                     },
                     {
                         text: '10月',
                         value:'10'
                     },
                     {
                         text:'11月',
                         value:'11'
                     },
                     {
                         text:'12月',
                         value:'12'
                     },
                     
                 ] ,
                 listeners:{
                	 slotpick:function(obj,value,node,eOpts){
                 		var slots1= Ext.getCmp('newPicker');
                 		var year=slots1.getValues().year;
                 	    var month=slots1.getValues().month;
                 	    var nowday=slots1.getValues().day;
                 	   function IsPinYear(year)//判断是否闰平年  
                 	   {  
                 	      return(0 == year%4 && (year%100 !=0 || year%400 == 0));  
                 	    } 
                 	  var isPinyear=IsPinYear(year);
                 	  var day=Ext.data.StoreManager.get('day');
       				  if (!day) { 
       					day = Ext.create("HelcPDA.store.maintain.day"); 
       				   };	
                 	  if(!isPinyear){
                 		  switch(month){
                 		  case '01': day.setData(day4); returnDay();   break;
                 		  case '02': day.setData(day1); returnDay();   break;
                 		  case '03': day.setData(day4); returnDay();   break;
                 		  case '04': day.setData(day3); returnDay();   break;
                 		  case '05': day.setData(day4); returnDay();   break;
                 		  case '06': day.setData(day3); returnDay();   break;
                 		  case '07': day.setData(day4); returnDay();   break;
                 		  case '08': day.setData(day4); returnDay();   break;
                 		  case '09': day.setData(day3); returnDay();   break;
                 		  case '10': day.setData(day4); returnDay();   break;
                 		  case '11': day.setData(day3); returnDay();   break;
                 		  case '12': day.setData(day4); returnDay();   break;
                 		  }
                 	  }else{
                 		 switch(month){
                		  case '01': day.setData(day4); returnDay();   break;
                		  case '02': day.setData(day2); returnDay();   break;
                		  case '03': day.setData(day4); returnDay();   break;
                		  case '04': day.setData(day3); returnDay();   break;
                		  case '05': day.setData(day4); returnDay();   break;
                		  case '06': day.setData(day3); returnDay();   break;
                		  case '07': day.setData(day4); returnDay();   break;
                		  case '08': day.setData(day4); returnDay();   break;
                		  case '09': day.setData(day3); returnDay();   break;
                		  case '10': day.setData(day4); returnDay();   break;
                		  case '11': day.setData(day3); returnDay();   break;
                		  case '12': day.setData(day4); returnDay();   break;
                		  }
                 	  }
                 	  function returnDay(){
 				 		 var dayStore=day.getData();
 				 		 var length=dayStore.length-1;
 				 		  if(parseInt(nowday)<=parseInt(dayStore.getAt(length).get('value'))){ 
 				 			 slots1.setValue({day:nowday+''},false);
 				 		  }else{
 				 			slots1.setValue({day:dayStore.getAt(length).get('value')+''},false);
 				 			  } 
 				 	  }
                 	 }
                  }
             },
             {
                 xtype: 'pickerslot',
                 name: 'day',
                 id:'slotsT2',
                 store:'day',
                 title: 'MyPickerSlot2',
                 data: [
                 ]
             },
             {
                 xtype: 'pickerslot',
                 name: 'hour',
                 title: 'MyPickerSlot3',
                 data: [
                     {
                         text: '0点',
                         value: '00'
                     },
                     {
                         text: '1点',
                         value: '01'
                     },
                     {
                         text: '2点',
                         value: '02'
                     },
                     {
                         text: '3点',
                         value: '03'
                     },
                     {
                         text: '4点',
                         value: '04'
                     },
                     {
                         text: '5点',
                         value: '05'
                     },
                     {
                         text: '6点',
                         value: '06'
                     },
                     {
                         text: '7点',
                         value: '07'
                     },
                     {
                         text: '8点',
                         value: '08'
                     },
                     {
                         text: '9点',
                         value: '09'
                     },
                     {
                         text: '10点',
                         value: '10'
                     },
                     {
                         text: '11点',
                         value: '11'
                     },
                     {
                         text: '12点',
                         value: '12'
                     },
                     {
                         text: '13点',
                         value: '13'
                     },
                     {
                         text: '14点',
                         value: '14'
                     },
                     {
                         text: '15点',
                         value: '15'
                     },
                     {
                         text: '16点',
                         value: '16'
                     },
                     {
                         text: '17点',
                         value: '17'
                     },
                     {
                         text: '18点',
                         value: '18'
                     },
                     {
                         text: '19点',
                         value: '19'
                     },
                     {
                         text: '20点',
                         value: '20'
                     },
                     {
                         text: '21点',
                         value: '21'
                     },
                     {
                         text: '22点',
                         value: '22'
                     },
                     {
                         text: '23点',
                         value: '23'
                     },
                     
                 ]
             },
             {
                 xtype: 'pickerslot',
                 name: 'miunite',
                 title: 'MyPickerSlot4',
                 data: [
                      {
                            text: '0分',
                            value:'00'
                      }
                     ,
                     {
                         text: '1分',
                         value:'01'
                     },
                     {
                         text: '2分',
                         value:'02'
                     },
                     {
                         text: '3分',
                         value:'03'
                     },
                     {
                         text: '4分',
                         value:'04'
                     },
                     {
                         text: '5分',
                         value:'05'
                     },
                     {
                         text: '6分',
                         value:'06'
                     },
                     {
                         text: '7分',
                         value:'07'
                     },
                     {
                         text: '8分',
                         value:'08'
                     },
                     {
                         text: '9分',
                         value:'09'
                     },
                     {
                         text: '10分',
                         value:'10'
                     },
                     {
                         text: '11分',
                         value:'11'
                     },
                     {
                         text: '12分',
                         value:'12'
                     },
                     {
                         text: '13分',
                         value:'13'
                     },
                     {
                         text: '14分',
                         value:'14'
                     },
                     {
                         text: '15分',
                         value:'15'
                     },
                     {
                         text: '16分',
                         value:'16'
                     },
                     {
                         text: '17分',
                         value:'17'
                     },
                     {
                         text:'18分',
                         value:'18'
                     },
                     {
                         text: '19分',
                         value:'19'
                     },
                     {
                         text: '20分',
                         value: '20'
                     },
                     {
                         text: '21分',
                         value: '21'
                     },
                     {
                         text: '22分',
                         value: '22'
                     },
                     {
                         text: '23分',
                         value: '23'
                     },
                     {
                         text: '24分',
                         value: '24'
                     },
                     {
                         text: '25分',
                         value: '25'
                     },
                     {
                         text: '26分',
                         value: '26'
                     },
                     {
                         text: '27分',
                         value: '27'
                     },
                     {
                         text: '28分',
                         value: '28'
                     },
                     {
                         text: '29分',
                         value: '29'
                     },
                     {
                         text: '30分',
                         value: '30'
                     },
                     {
                         text: '31分',
                         value: '31'
                     },
                     {
                         text: '32分',
                         value: '32'
                     },
                     {
                         text: '33分',
                         value: '33'
                     },
                     {
                         text: '34分',
                         value: '34'
                     },
                     {
                         text: '35分',
                         value: '35'
                     },
                     {
                         text: '36分',
                         value: '36'
                     },
                     {
                         text: '37分',
                         value: '37'
                     },
                     {
                         text: '38分',
                         value: '38'
                     },
                     {
                         text: '39分',
                         value: '39'
                     },
                     {
                         text: '40分',
                         value: '40'
                     },
                     {
                         text: '41分',
                         value: '41'
                     },
                     {
                         text: '42分',
                         value: '42'
                     },
                     {
                         text: '43分',
                         value: '43'
                     },
                     {
                         text: '44分',
                         value: '44'
                     },
                     {
                         text: '45分',
                         value: '45'
                     },
                     {
                         text: '46分',
                         value: '46'
                     },
                     {
                         text: '47分',
                         value: '47'
                     },
                     {
                         text: '48分',
                         value: '48'
                     },
                     {
                         text: '49分',
                         value: '49'
                     },
                     {
                         text: '50分',
                         value: '50'
                     },
                     {
                         text: '51分',
                         value: '51'
                     },
                     {
                         text: '52分',
                         value: '52'
                     },
                     {
                         text: '53分',
                         value: '53'
                     },
                     {
                         text: '54分',
                         value: '54'
                     },
                     {
                         text: '55分',
                         value: '55'
                     },
                     {
                         text: '56分',
                         value: '56'
                     },
                     {
                         text: '57分',
                         value: '57'
                     },
                     {
                         text: '58分',
                         value: '58'
                     },
                     {
                         text: '59分',
                         value: '59'
                     },
                 ]
             }
         ],
         listeners:{
        	 change:function(obj, value, eOpts ){
        	 Ext.getCmp(need_text_id).setValue(value.year+"-"+value.month+"-"+value.day+"  "+value.hour+":"+value.miunite);
        	 //特别为急修处理模块添加验证   如果到达时间超过出发时间30分钟，那么要“应对说明”为必填
        	 //FaultHandlingReportPanelCtrl.js  submitAllReport()
        	 if(need_text_id=='FR_ARRIVED_TIME'){//到达时间
        		var FR_ARRIVED_TIME=value.year+"-"+value.month+"-"+value.day+"  "+value.hour+":"+value.miunite;
        		var SOUXIN_TIME=Ext.getCmp('SET_OUT_TIME').getValue();
        		var REPLY_TIME=comptimes(SOUXIN_TIME,FR_ARRIVED_TIME);
    	    	if(REPLY_TIME>0.5){
    	    		 Ext.getCmp('REPLY_TIME_COMMENTS').setRequired(true);
    	    		 Ext.getCmp('REPLY_TIME_COMMENTS').setReadOnly(false);
    	    	}else{
    	    		 Ext.getCmp('REPLY_TIME_COMMENTS').setRequired(false);
    	    		 Ext.getCmp('REPLY_TIME_COMMENTS').setReadOnly(true);
    	    	}
        	 }else if(need_text_id=='FR_COMPLETED_TIME'){//完工时间
        		var RECOVERRUN_TIME=value.year+"-"+value.month+"-"+value.day+"  "+value.hour+":"+value.miunite;
         		var SOUXIN_TIME=Ext.getCmp('SET_OUT_TIME').getValue();
         		var NOT_RUN_TIME=comptimes(SOUXIN_TIME,RECOVERRUN_TIME);
         		if(NOT_RUN_TIME>=5){
     	    		 Ext.getCmp('NOT_RUN_COMMENTS').setRequired(true);
     	    		 Ext.getCmp('NOT_RUN_COMMENTS').setReadOnly(false);
     	    	}else{
     	    		 Ext.getCmp('NOT_RUN_COMMENTS').setRequired(false);
     	    		 Ext.getCmp('NOT_RUN_COMMENTS').setReadOnly(true);
     	    	}
        	 }
        	 
        	 
//        	 Ext.util.InputBlocker.blockInputs();
//        	 obj.addAfterListener('hide',function(){
//        		Ext.util.InputBlocker.unblockInputs();
//        	 });
        
        	 },
//             cancel:function(obj, eOpts ){
//             Ext.getCmp(need_text_id).setValue();
//            }
         },
 });
}else{
	var slots1= Ext.getCmp('newPicker');
	var newToolbar={
			ui:'dark',
			title:title
	};
	 slots1.setToolbar(newToolbar);
}
	
if(nowTime==''||nowTime==null||typeof(nowTime)=='undefined'){
	 var slots1= Ext.getCmp('newPicker');
	 var date=new Date();
	 var mon=date.getMonth()+1;
	 if(mon<10){
		 mon="0"+mon;
	 }
	 var day=date.getDate();
	 if(day<10){
		 day="0"+day;
	 }
	 var hour=date.getHours();
	 if(hour<10){
		 hour="0"+hour;
	 }
	 var min=date.getMinutes();
	 if(min<10){
		 min="0"+min;
	 }
	 slots1.setValue({year:date.getFullYear()+''},false);
	 slots1.setValue({month:mon+''},false);
	 slots1.setValue({day:day+''},false);
	 slots1.setValue({hour:hour+''},false);
	 slots1.setValue({miunite:min+''},false);
  }else{
		 var slots1= Ext.getCmp('newPicker');
		 var ymd=nowTime.substring(0, 10).split('-');
		 var hm=nowTime.substring(10, 19).split(':');
		 slots1.setValue({miunite:hm[1].trim()},false);
		 slots1.setValue({year:ymd[0].trim()},false);
		 slots1.setValue({month:ymd[1].trim()},false);
		 slots1.setValue({day:ymd[2].trim()},false);
		 slots1.setValue({hour:hm[0].trim()},false);
	 }
	
}

function initDate1(id,title){
	need_text_id=id;
	if(!picker_show1){
		picker_show1=Ext.Viewport.add({
			  xtype: 'datepicker',  
			  height:200,
			  slotOrder: ['year','month','day'],
			  yearTo: new Date().getFullYear() + 5,
              doneButton: '完成',
              cancelButton: '取消',
              toolbar:{
               title:(title==''||title==null||typeof(title)=='undefined')?'选择时间':title,
                items:[ 
                  {
                   xtype:'button',
                   text:'清除',
                   listeners:{
                   tap:function(){
                	   Ext.getCmp(need_text_id).setValue('');
                	   picker_show1.setValue('');
                	   picker_show1.setHidden(true);   
                   	    	   }
                   	       }
                     	 }    
                         ]
                     },
                listeners:{
                	change:function(obk,values,eOpts){
                		if(Ext.getCmp(need_text_id).getValue()==Ext.Date.format(values,'Y-m-d')){
                			Ext.getCmp(need_text_id).setValue(Ext.Date.format(values,'Y-m-d')+' ');
                		}else{
                			Ext.getCmp(need_text_id).setValue(Ext.Date.format(values,'Y-m-d'));
                		}
                	},
//                	activeitemchange:function(obz, value, oldValue, eOpts ){
//                		alert(11);
//                	},
                	show:function(){
                		var value=Ext.getCmp(need_text_id).getValue();
                		if(value==''||value==null||typeof(value)=='undefined'||value=='点击文本设置时间'){
                			picker_show1.setValue(new Date());
                		}else{
                			picker_show1.setValue(new Date(value));
                		}
                	}
                }
			
			
		});
		picker_show1.show();
	}else{
		var newToolbar={title:(title==''||title==null||typeof(title)=='undefined')?'选择时间':title};
		picker_show1.setToolbar(newToolbar);
		picker_show1.show();
	}
	
	
}
