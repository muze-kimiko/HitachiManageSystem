/**
 * 全局Controller
 * 
 */
Ext.define("HelcGDEXP.controller.ApplicationController", {
	extend : "Ext.app.Controller",
	searchStoreName : "Distributors",
	id:'applicon',
	getPlatform : function() {
		return this.getApplication().platform;
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
//		var ViewId = Ext.Viewport.getActiveItem().id;
//		var viewName=Ext.getCmp(ViewId);
//		if(viewName){
//			viewName.destroy();
//		}
		
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
		                          console.log(result);
		                          var json = eval("("+ result +")");
		                          fn(json);
		                  	} else {
//		                  		Ext.Msg.alert('提示',"服务器出错！");
		                  		WL.Toast.show('数据异常，请稍后重试！');
		                  	}
	                  	} catch(e) {
//	                  		Ext.Msg.alert('提示',"服务器出错！");
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
	
	//连接冠达物流查询系统
	connectGDEXP : function(fn,params) {
		myLoading.show();
		var invocationData = {  
	              adapter : 'HttpAdapter_GDEXP',  
	              procedure : 'getGDEXP',
	              parameters : [params]
		};
	  	WL.Client.invokeProcedure(invocationData, {
	  		 timeout:60000,
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
	  		 timeout:60000,
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
	  		 timeout:60000,
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
	          onFailure : function () {
	        	  WL.Toast.show('连接服务器失败，请稍后重试！');
	        	  fn(null,obj);
	          }
	      });
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
	  		timeout:60000,
	          onSuccess : function (result) {
	        	myLoading.hide();
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
			                  		} else {
//			                  			Ext.Msg.alert('提示',"服务器出错！");
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
	
	
	/**
	 * 访问JSONSTORE
	 * 回调方法  JSONStore名  options  条件   MaintenaceCtrl本身
	 */
	queryJSONStore : function(fn,dbname,options,query,obj) {
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
			exacte:false,//默认
			//limit:20,//查询最大条数
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
    	var options={exacte:true};//默认是false
		var deletemainfields={tcode:'mainfields',tid:day};
		MaintainList.remove(deletemainfields,options).then(function(){
    		console.log('更新-删除mainfields成功');
    		//改前 2014-11-21
    		//var deletemainitem={tcode:'MAINITEM',tid:day};
    		var deletemainitem={tcode:'MAINITEM'};
    		MaintainList.remove(deletemainitem,options).then(function(){
    			console.log('更新-删除mainitem成功');
    		
    			var Maintmsgdel={tcode:'mainsecmsg'};
    	    	
    	    	var options2={exacte:true};//默认是false
    			MaintainList.remove(Maintmsgdel,options).then(function(){
    				console.log('更新-Maintmsgdel删除成功');
    				
    				var Maintxml={tcode:'mainxmlName'};
    				var options2={exacte:true};//默认是false
    				MaintainList.remove(Maintxml,options2).then(function(){
    					console.log('更新-Maintxml删除成功');
    				
    					obj.connectServerMainTain(obj.handleResult,obj,"maintainancePlanItemListAction.do?method=toSearchDetail2","{'person_id':'"+seeatid+"','date':'"+day+"','position_type':'"+position_type+"'}");
    				
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
			limit:50,//查询最大条数
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
			limit:20,//查询最大条数
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
		cordova.exec(callOK,callFailure,'CallListPlugin','list',['month']);
		
		function callOK(data){
			var CallLogTime = 0;
			for(var i =0;i<data.rows.length;i++){
				if(data.rows[i].type==2){
					CallLogTime += data.rows[i].duration;
				}
			}
			var syso = "";
			if(CallLogTime >= 3600){
				var hours = parseInt(CallLogTime/3600);
				var min = parseInt((CallLogTime -3600*hours)/60);
				var sec = CallLogTime - 3600*hours-60*min;
				syso = "本月呼出时长总计:"+hours+'小时'+min+"分钟"+sec+"秒";
			}
			if(3600>CallLogTime&&CallLogTime>=60){
				var min = parseInt(CallLogTime/60);
				var sec = CallLogTime - min*60;
				syso = "本月呼出时长总计:"+min+"分钟"+sec+"秒";
			}
			if(CallLogTime<60){
				var sec = CallLogTime;
				syso = "本月呼出时长总计:"+sec+"秒";
			}
			Ext.getCmp('Label_CallLog').setHtml(syso);
		}
		
		function callFailure(data){
			WL.Toast.show('调用通话记录失败');
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
	
	
});

//字符串去前后空格
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g,'');
};


/**
 * 安装计划模块公用代码 
 */
