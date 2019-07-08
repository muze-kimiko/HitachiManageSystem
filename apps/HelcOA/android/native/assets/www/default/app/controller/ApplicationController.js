
/* JavaScript content from app/controller/ApplicationController.js in folder common */
/**
 * 全局Controller
 * 
 */
Ext.define("HelcOA.controller.ApplicationController", {
	extend : "Ext.app.Controller",
	searchStoreName : "Distributors",
	id:'applicon',
	getPlatform : function() {
		return this.getApplication().platform;
	},
	
	//销毁公共ID
	
	DestroyPublicId : function(){
		var IdArray = ['fileno','agentman','dept','subject','conds','userid','type',
		               'username','node','ctime','piid','processname','curauthor',
		               'dealmen','ygbh','form','arcpath','arcdate','idea',
		               'endprocessdate','createdate','audit_list','taskid','mast',
		               'tiaojian01','sta','forflow','thiflow','secflow','waypath',
		               'zjlno','zjlname','bbzno','bbzname','bzno','bzname','kzno',
		               'kzname','kzno','pdano','firflow','way','report_form','reason_textarea',
		               'projectname','projectno','ifyfxm','feesum','otherfee','yyje'];
		for(var i = 0;i<IdArray.length;i++){
			var id = IdArray[i];
			if(Ext.getCmp(id)){
				Ext.getCmp(id).destroy();
			}
		}
	},
	
	//返回并销毁当前页
	BackAndDestroy : function(page_ID, page_Address) {
		var ViewId = Ext.Viewport.getActiveItem().id;
		var viewName=Ext.getCmp(ViewId);
		if(viewName){
			viewName.destroy();
		}
		

		if(typeof(page_ID) !="undefined" && typeof(page_Address) !="undefined"){
			var main = Ext.getCmp(page_ID);
			if(!main){
				main = Ext.create(page_Address);
			}
			Ext.Viewport.setActiveItem(main);
			ViewArray.splice(ViewArray.length-1,1);
			
		}else{
			var length = ViewArray.length-1;
			var viewId = ViewArray[length].ViewId;
			var ViewName = ViewArray[length].ViewName;
			var main = Ext.getCmp(viewId);
			if(!main){
				 main = Ext.create(ViewName);
			}
			Ext.Viewport.setActiveItem(main);
			ViewArray.splice(ViewArray.length-1,1);
		}
   	 	
	
	},
	
	//判断必填
	isRequired : function(IdArray){
		var flag = false;
		for(var i =0;i<IdArray.length;i++){
			var id = IdArray[i];
			cc.log(id);
			var value = Ext.getCmp(id).getValue();
			var label = Ext.getCmp(id).getLabel();
			if(value == "" || value == null){
				Ext.Msg.alert(label+"不能为空");
				WL.Toast.show(label+"不能为空");
//				Ext.getCmp(id).focus();
				flag = true;
			}
			if(flag){
				return flag;
			}
		}
	},
	
	//进入下一个页面，跳转
	NextView:function(viewId,FullName){
		
	    var ViewId = Ext.Viewport.getActiveItem().id;
		var ViewName = Ext.Viewport.getActiveItem().__proto__.$className;
		ViewArray.push({ViewId:ViewId,ViewName:ViewName});
//		this.DestroyPublicId();
		var viewName=Ext.getCmp(viewId);
		   if(viewName){
			   viewName.destroy();
		   }
	    Ext.Viewport.setActiveItem(Ext.create(FullName));
	    console.log("zhazha");
	},
	
	
	/**
	 * 返回上一页面，控制全部页面的返回跳转
	 */
	showBackView : function(page_ID, page_Address) {
		if(typeof(page_ID) !="undefined" && typeof(page_Address) !="undefined"){
			var main = Ext.getCmp(page_ID);
			if(!main){
				main = Ext.create(page_Address);
			}
			Ext.Viewport.setActiveItem(main);
			ViewArray.splice(ViewArray.length-1,1);
		}else{
			var length = ViewArray.length-1;
			var viewId = ViewArray[length].ViewId;
			var ViewName = ViewArray[length].ViewName;
			var main = Ext.getCmp(viewId);
			if(!main){
				 main = Ext.create(ViewName);
			}
			Ext.Viewport.setActiveItem(main);
			ViewArray.splice(ViewArray.length-1,1);
		}
   	 	
	},
	
	/**
	 * 访问SQL
	 */
	connectSql : function (fn, producedure, params) {
		var obj = this;
		obj.Waitting("正在加载...");
		var invocationData;
		
		invocationData = {  
                adapter : 'SqlAdapter_OA',  
                procedure : producedure,
                parameters : params 
        }; 
		
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) { 
					obj.HideWaitting();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							var resultSet = invocationResult.resultSet;
							if(resultSet.length>0){ 
								fn(resultSet);
							}else{
								Ext.Msg.alert('提示','没有符合的数据!');   
							}
							
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function () {
					obj.HideWaitting();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				}
			});
			
		} catch (e) {
			console.log('连接服务器出错');
		}
		
	},
	
	/**
	 * 访问网络-BPM
	 */
	
	connectServer : function(fn, params) {
		var obj = this;
		obj.Waitting("正在加载...");
		console.log(params);
		
		var invocationData = {  
	              adapter : 'HttpAdapter_BPM',  
	              procedure :params.method ,
	              parameters : [params.name]
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					obj.HideWaitting();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							fn(invocationResult);
							console.log(invocationResult);
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function () {
					obj.HideWaitting();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				}
			});
		} catch (e) {
			obj.HideWaitting();
			console.log('连接服务器出错');
		}
	},
	
	/**
	 * 访问网络-OA
	 */
	connectServer_OA : function(fn, params) {
		var obj = this;
		obj.Waitting("正在加载...");
		console.log(params);
		
		var invocationData = {  
				adapter : 'HttpAdapter_OA',  
				procedure :params.method ,
				parameters : params.parameters
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					obj.HideWaitting();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							fn(invocationResult);
							console.log(invocationResult);
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function () {
					obj.HideWaitting();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				}
			});
		} catch (e) {
			obj.HideWaitting();
			console.log('连接服务器出错');
		}
	},
	
	connectServer_fj : function(fn, params) {
		var obj = this;
		//obj.Waitting("正在加载...");
		console.log(params);
		
		var invocationData = {  
				adapter : 'HttpAdapter_OA',  
				procedure :params.method ,
				parameters : params.parameters
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					obj.HideWaitting();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							fn(invocationResult);
							console.log(invocationResult);
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function () {
					obj.HideWaitting();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				}
			});
		} catch (e) {
			obj.HideWaitting();
			console.log('连接服务器出错');
		}
	},
	
	
	/**
	 * 访问网络-BPM
	 */
	connectServer_BPM : function(fn, params) {
		var obj = this;
		obj.Waitting("正在加载...");
		console.log(params);
		
		var invocationData = {  
				adapter : 'HttpAdapter_BPM',  
				procedure :params.method ,
				parameters : params.parameters
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					obj.HideWaitting();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							fn(invocationResult);
							console.log(invocationResult);
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function () {
					obj.HideWaitting();
					WL.Toast.show('服务器繁忙，请稍后重试！');
				}
			});
		} catch (e) {
			obj.HideWaitting();
			console.log('连接服务器出错');
		}
	},
	
	
//用于登陆连接
	connectServer2 : function(fn, params) {
		var obj = this;
		obj.Waitting("正在加载...");
		var invocationData = {  
	              adapter : 'HttpAdapter_OA',  
	              procedure : 'getStories',
	              parameters : [params.name, params.password]
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					obj.HideWaitting();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						fn(invocationResult);
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							var status = invocationResult.statusCode;
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
							alert('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						alert('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function (result) {
					obj.HideWaitting();
					var invocationResult = result.invocationResult;
					fn(invocationResult);
//					WL.Toast.show('服务器繁忙，请稍后重试！');
				}
			});
		} catch (e) {
			obj.HideWaitting();
			console.log('连接服务器出错');
		}
	},
	
//出差申请，填写工号带出该工号数据
	connectServer_oa : function(fn, params) {
		var obj = this;
		obj.Waitting("正在加载...");
		var invocationData = {  
				adapter : 'HttpAdapter_OA',  
				procedure : 'GetygbhData',
				parameters : [params]
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					obj.HideWaitting();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						fn(invocationResult.html);
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							var status = invocationResult.statusCode;
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function (result) {
					obj.HideWaitting();
					var invocationResult = result.invocationResult;
					fn(invocationResult);
					WL.Toast.show('服务器繁忙，请稍后重试！');
				}
			});
		} catch (e) {
			obj.HideWaitting();
			console.log('连接服务器出错');
		}
	},
//	公司规章制度获取目录信息Getfeiyong
	connectServer_oaCompany : function(fn, params) {
			var obj = this;
			obj.Waitting("正在加载...");
			var invocationData = {  
					adapter : 'HttpAdapter_OA',  
					procedure : 'GetcountryData',
					parameters : [params]
			};
			try {
				WL.Client.invokeProcedure(invocationData, {
					timeout:60000,
					onSuccess : function (result) {
						obj.HideWaitting();
						var httpStatusCode = result.status;
						if (200 == httpStatusCode) {
							var invocationResult = result.invocationResult;
							fn(invocationResult.html);
							var isSuccessful = invocationResult.isSuccessful;
							if (true == isSuccessful) {
								var status = invocationResult.statusCode;
							} else {
								WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
							}
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					},  
					onFailure : function (result) {
						obj.HideWaitting();
						var invocationResult = result.invocationResult;
						fn(invocationResult);
						WL.Toast.show('服务器繁忙，请稍后重试！');
					}
				});
			} catch (e) {
				obj.HideWaitting();
				console.log('连接服务器出错');
			}
		},

	/**
	 * 
	 */
	connectServer3 : function(fn, params) {
		var obj = this;
		obj.Waitting("正在加载...");
		var invocationData = {  
	              adapter : 'HttpAdapter_BPM',  
	              procedure :params.method ,
	              parameters : [_vt,params.piid,params.task_id]

		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				  timeout:60000,
		          onSuccess : function (result) {
		        	obj.HideWaitting();
		          	var httpStatusCode = result.status;
		          	if (200 == httpStatusCode) {
		                  var invocationResult = result.invocationResult;
		                  var isSuccessful = invocationResult.isSuccessful;
		                  if (true == isSuccessful) {
		                	  if(typeof(invocationResult.enterAuditingResponse) != "undefined"){
									fn(invocationResult.enterAuditingResponse);
								}else{
									fn(invocationResult.auditingSubmitResponse);
								}
		                  } else {
		                	  obj.showBackView();
				        	  obj.DestroyPublicId();
		                	  WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
//		                	  Ext.Msg.alert('提示',"网络出错！");
		                  }
		              } else {
		            	    obj.showBackView();
			        	    obj.DestroyPublicId();
		            	  	WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
//		            	  	Ext.Msg.alert('提示',"网络出错！");
		              }
		          },  
		          onFailure : function (result) {
		        	  obj.HideWaitting();
		        	  obj.showBackView();
		        	  obj.DestroyPublicId();
		        	  WL.Toast.show('服务器繁忙，请稍后重试！');
		        	  var invocationResult = result.invocationResult;
		        	  fn(invocationResult);
		          }
		      });
		} catch (e) {
			obj.HideWaitting();
			console.log('连接服务器出错');
		}
	},
	
	
	/**
	 * 待审批
	 */
	connectServer4 : function(fn, params,flag) {
		var obj = this;
		if(flag=='2'){
			obj.Waitting("正在清理...");
		}else if(typeof(flag) != "undefined"){
			obj.Waitting("正在提交...");
		}else{
			obj.Waitting("正在加载...");
		}
		var invocationData = {  
				adapter : 'HttpAdapter_BPM',  
				procedure :params.method ,
				parameters : params.param
				
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					obj.HideWaitting();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							if(typeof(invocationResult.drafterSubmitResponse) != "undefined"){
								fn(invocationResult.drafterSubmitResponse);
							}else{
								fn(invocationResult.auditingSubmitResponse);
							}
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function (result) {
					obj.HideWaitting();
					var invocationResult = result.invocationResult;
					fn(invocationResult);
					WL.Toast.show('服务器繁忙，请稍后重试！');
				}
			});
		} catch (e) {
			obj.HideWaitting();
			console.log('连接服务器出错');
		}
	},
	/**
	 * 起草提交
	 */
	QC_connectServer : function(fn, params,flag) {
		var obj = this;
		if(flag=='2'){
			obj.Waitting("正在清理...");
		}else if(typeof(flag) != "undefined"){
			obj.Waitting("正在提交...");
		}else{
			obj.Waitting("正在加载...");
		}
		var invocationData = {  
	              adapter : 'HttpAdapter_BPM',  
	              procedure :params.method ,
	              parameters : params.param

		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					obj.HideWaitting();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							if(typeof(invocationResult.drafterSubmitResponse) != "undefined"){
								fn(invocationResult.drafterSubmitResponse);
							}else{
								fn(invocationResult.auditingSubmitResponse);
							}
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function (result) {
					obj.HideWaitting();
					var invocationResult = result.invocationResult;
					fn(invocationResult);
					WL.Toast.show('服务器繁忙，请稍后重试！');
				}
			});
		} catch (e) {
			obj.HideWaitting();
			console.log('连接服务器出错');
		}
	},

	
	connectServerComm : function(fn, params) {
		var obj = this;
		obj.Waitting("正在加载...");
		var invocationData = {
	              adapter : params.adpName,  
	              procedure : params.prodNmae,
	              parameters : params.prmName
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:60000,
				onSuccess : function (result) {
					obj.HideWaitting();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							var status = invocationResult.statusCode;
							fn(invocationResult);
						} else {
							WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						WL.Toast.show('服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function (result) {
					obj.HideWaitting();
					var invocationResult = result.invocationResult;
					fn(invocationResult);
					WL.Toast.show('服务器繁忙，请稍后重试！');
				}
			});
			
		} catch (e) {
			obj.HideWaitting();
			console.log('连接服务器出错');
		}
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
		this.removeRightBtn();
		var view = Ext.create("HelcOA.view." + name);
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
	
	/**各地区国家
	 * 
	 */
	findCountry : function(country,selectfield_id){
		var CountryArray = [
		    {AREA:'亚洲',Countrs:[{text:'请选择',value:''},
		                         {text:'蒙古',value:'蒙古'},
		                         {text:'朝鲜',value:'朝鲜'},
		                         {text:'韩国',value:'韩国'},
		                         {text:'日本',value:'日本'},
		                         {text:'缅甸',value:'缅甸'},
		                         {text:'巴基斯坦',value:'巴基斯坦'},
		                         {text:'斯里兰卡',value:'斯里兰卡'},
		                         {text:'马尔代夫',value:'马尔代夫'},
		                         {text:'孟加拉',value:'孟加拉'},
		                         {text:'伊拉克',value:'伊拉克'},
		                         {text:'阿拉伯联合酋长国',value:'阿拉伯联合酋长国'},
		                         {text:'也门',value:'也门'},
		                         {text:'阿曼',value:'阿曼'},
		                         {text:'伊朗',value:'伊朗'},
		                         {text:'科威特',value:'科威特'},
		                         {text:'沙特',value:'沙特'},
		                         {text:'巴林',value:'巴林'},
		                         {text:'以色列',value:'以色列'},
		                         {text:'巴勒斯坦',value:'巴勒斯坦'},
		                         {text:'文莱',value:'文莱'},
		                         {text:'印度',value:'印度'},
		                         {text:'不丹',value:'不丹'},
		                         {text:'越南',value:'越南'},
		                         {text:'東埔寨',value:'東埔寨'},
		                         {text:'老挝',value:'老挝'},
		                         {text:'马来西亚',value:'马来西亚'},
		                         {text:'菲律宾',value:'菲律宾'},
		                         {text:'印度尼西亚',value:'印度尼西亚'},
		                         {text:'东帝汶',value:'东帝汶'},
		                         {text:'泰国',value:'泰国'},
		                         {text:'新加坡',value:'新加坡'},
		                         {text:'阿富汉',value:'阿富汉'},
		                         {text:'尼泊尔',value:'尼泊尔'},
		                         {text:'黎巴嫩',value:'黎巴嫩'},
		                         {text:'塞浦路斯',value:'塞浦路斯'},
		                         {text:'约旦',value:'约旦'},
		                         {text:'土耳其',value:'土耳其'},
		                         {text:'叙利亚',value:'叙利亚'},
		                         {text:'卡塔尔',value:'卡塔尔'},
		                         {text:'香港、澳门',value:'香港、澳门'},
		                         {text:'台湾',value:'台湾'},]},
		    {AREA:'欧洲',Countrs:[{text:'请选择',value:''},
		                         {text:'罗马尼亚',value:'罗马尼亚'},
		                         {text:'南斯拉夫',value:'南斯拉夫'},
		                         {text:'马其顿',value:'马其顿'},
		                         {text:'斯洛文尼亚',value:'斯洛文尼亚'},
		                         {text:'波黑',value:'波黑'},
		                         {text:'克罗地亚',value:'克罗地亚'},
		                         {text:'阿尔巴尼亚',value:'阿尔巴尼亚'},
		                         {text:'保加利亚',value:'保加利亚'},
		                         {text:'俄罗斯联邦',value:'俄罗斯联邦'},
		                         {text:'立陶宛',value:'立陶宛'},
		                         {text:'拉脱维亚',value:'拉脱维亚'},
		                         {text:'爱沙尼亚',value:'爱沙尼亚'},
		                         {text:'乌克兰',value:'乌克兰'},
		                         {text:'阿塞拜疆',value:'阿塞拜疆'},
		                         {text:'亚美尼亚',value:'亚美尼亚'},
		                         {text:'格鲁吉亚',value:'格鲁吉亚'},
		                         {text:'吉尔吉斯斯坦',value:'吉尔吉斯斯坦'},
		                         {text:'塔吉克斯坦',value:'塔吉克斯坦'},
		                         {text:'土库曼斯坦',value:'土库曼斯坦'},
		                         {text:'乌兹别克斯坦',value:'乌兹别克斯坦'},
		                         {text:'白俄罗斯',value:'白俄罗斯'},
		                         {text:'哈萨克斯坦',value:'哈萨克斯坦'},
		                         {text:'摩尔多瓦',value:'摩尔多瓦'},
		                         {text:'波兰',value:'波兰'},
		                         {text:'德国',value:'德国'},
		                         {text:'荷兰',value:'荷兰'},
		                         {text:'意大利',value:'意大利'},
		                         {text:'比利时',value:'比利时'},
		                         {text:'奥地利',value:'奥地利'},
		                         {text:'希腊',value:'希腊'},
		                         {text:'法国',value:'法国'},
		                         {text:'西班牙',value:'西班牙'},
		                         {text:'卢森堡',value:'卢森堡'},
		                         {text:'爱尔兰',value:'爱尔兰'},
		                         {text:'葡萄牙',value:'葡萄牙'},
		                         {text:'芬兰',value:'芬兰'},
		                         {text:'捷克',value:'捷克'},
		                         {text:'斯洛伐克',value:'斯洛伐克'},
		                         {text:'匈牙利',value:'匈牙利'},
		                         {text:'瑞典',value:'瑞典'},
		                         {text:'丹麦',value:'丹麦'},
		                         {text:'挪威',value:'挪威'},
		                         {text:'瑞士',value:'瑞士'},
		                         {text:'冰岛',value:'冰岛'},
		                         {text:'马尔他',value:'马尔他'},
		                         {text:'英国',value:'英国'},]},
	         {AREA:'美洲',Countrs:[{text:'请选择',value:''},
	                             {text:'美国',value:'美国'},
	                             {text:'加拿大',value:'加拿大'},
	                             {text:'黑西哥',value:'黑西哥'},
	                             {text:'巴西',value:'巴西'},
	                             {text:'牙买加',value:'牙买加'},
	                             {text:'特立尼达和多巴哥',value:'特立尼达和多巴哥'},
	                             {text:'厄瓜多尔',value:'厄瓜多尔'},
	                             {text:'阿根延',value:'阿根延'},
	                             {text:'乌拉圭',value:'乌拉圭'},
	                             {text:'智利',value:'智利'},
	                             {text:'哥伦比亚',value:'哥伦比亚'},
	                             {text:'巴巴多斯',value:'巴巴多斯'},
	                             {text:'圭亚那',value:'圭亚那'},
	                             {text:'古巴',value:'古巴'},
	                             {text:'巴拿马',value:'巴拿马'},
	                             {text:'格林纳达',value:'格林纳达'},
	                             {text:'安提瓜',value:'安提瓜'},
	                             {text:'秘鲁',value:'秘鲁'},
	                             {text:'玻利维亚',value:'玻利维亚'},
	                             {text:'尼加拉瓜',value:'尼加拉瓜'},
	                             {text:'苏里拉',value:'苏里拉'},
	                             {text:'委内瑞拉',value:'委内瑞拉'},
	                             {text:'海地',value:'海地'},
	                             {text:'波多黎各',value:'波多黎各'},
	                             {text:'多米尼加',value:'多米尼加'},
	                             {text:'巴哈马',value:'巴哈马'},
	                             {text:'圣卢西亚',value:'圣卢西亚'},
	                             {text:'阿鲁巴岛',value:'阿鲁巴岛'},
	                             {text:'哥斯达黎加',value:'哥斯达黎加'},]},
             {AREA:'非洲',Countrs:[{text:'请选择',value:''},
                                 {text:'马达加斯加',value:'马达加斯加'},
                                 {text:'喀麦隆',value:'喀麦隆'},
                                 {text:'多哥',value:'多哥'},
                                 {text:'科特迪瓦',value:'科特迪瓦'},
                                 {text:'摩洛哥',value:'摩洛哥'},
                                 {text:'阿尔及尼亚',value:'阿尔及尼亚'},
                                 {text:'卢旺达',value:'卢旺达'},
                                 {text:'几内亚共和国',value:'几内亚共和国'},
                                 {text:'埃塞俄比亚',value:'埃塞俄比亚'},
                                 {text:'厄立特里亚',value:'厄立特里亚'},
                                 {text:'莫桑比克',value:'莫桑比克'},
                                 {text:'塞舌尔',value:'塞舌尔'},
                                 {text:'肯尼亚',value:'肯尼亚'},
                                 {text:'利比亚',value:'利比亚'},
                                 {text:'扎伊尔',value:'扎伊尔'},
                                 {text:'安哥拉',value:'安哥拉'},
                                 {text:'赞比亚',value:'赞比亚'},
                                 {text:'几内亚比绍',value:'几内亚比绍'},
                                 {text:'突尼斯',value:'突尼斯'},
                                 {text:'布隆迪',value:'布隆迪'},
                                 {text:'莱索托',value:'莱索托'},
                                 {text:'津巴布韦',value:'津巴布韦'},
                                 {text:'尼日利亚',value:'尼日利亚'},
                                 {text:'毛里求斯',value:'毛里求斯'},
                                 {text:'索马里',value:'索马里'},
                                 {text:'苏丹',value:'苏丹'},
                                 {text:'贝宁',value:'贝宁'},
                                 {text:'马里',value:'马里'},
                                 {text:'乌干达',value:'乌干达'},
                                 {text:'塞拉立昂',value:'塞拉立昂'},
                                 {text:'吉布提',value:'吉布提'},
                                 {text:'塞内加尔',value:'塞内加尔'},
                                 {text:'冈比亚',value:'冈比亚'},
                                 {text:'加蓬',value:'加蓬'},
                                 {text:'中非',value:'中非'},
                                 {text:'布基纳法索',value:'布基纳法索'},
                                 {text:'毛里塔尼亚',value:'毛里塔尼亚'},
                                 {text:'尼日尔',value:'尼日尔'},
                                 {text:'乍得',value:'乍得'},
                                 {text:'赤道几内亚',value:'赤道几内亚'},
                                 {text:'加纳',value:'加纳'},
                                 {text:'坦桑尼亚',value:'坦桑尼亚'},
                                 {text:'刚果',value:'刚果'},
                                 {text:'埃及',value:'埃及'},
                                 {text:'圣多美和普林西比',value:'圣多美和普林西比'},
                                 {text:'博茨瓦纳',value:'博茨瓦纳'},
                                 {text:'南非',value:'南非'},
                                 {text:'纳米比亚',value:'纳米比亚'},
                                 {text:'斯威士兰',value:'斯威士兰'},
                                 {text:'利比利亚',value:'利比利亚'},
                                 {text:'佛得角',value:'佛得角'},
                                 {text:'科摩罗',value:'科摩罗'},]},
	         {AREA:'大洋洲太平洋岛屿',Countrs:[{text:'请选择',value:''},
	                             {text:'澳大利亚',value:'澳大利亚'},
	                             {text:'新西兰',value:'新西兰'},
	                             {text:'西萨摩亚',value:'西萨摩亚'},
	                             {text:'斐济',value:'斐济'},
	                             {text:'巴布亚新几内亚',value:'巴布亚新几内亚'},
	                             {text:'密克罗尼西亚',value:'密克罗尼西亚'},
	                             {text:'马绍尔群岛',value:'马绍尔群岛'},
	                             {text:'瓦努阿图',value:'瓦努阿图'},
	                             {text:'基里巴斯',value:'基里巴斯'},
	                             {text:'汤加',value:'汤加'},
	                             {text:'帕劳',value:'帕劳'},
	                             {text:'库克群岛',value:'库克群岛'},
	                             {text:'所罗门群岛',value:'所罗门群岛'},]},
	        {AREA:'',Countrs:[]},
		                    ];
		for(var i=0;i<CountryArray.length;i++){
			if(country==CountryArray[i].AREA){
				Ext.getCmp(selectfield_id).setOptions(CountryArray[i].Countrs);
			}
		}
	},
	

	/**
	 * 显示Android原生时间选择插件
	 */
	showAndroidDatePicker : function(date, onDatePickSuccess, onDatePickFailure) {
		cordova.exec(onDatePickSuccess, onDatePickFailure, "DatePickerPlugin", "datepicker", date);
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
//			alert('function:changeTwoDecimal->parameter error');
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
	//获取公共变量的年和月,组合成按月查询的条件 
	GaimMpmTime:function(){
		console.log('进入同用时间中');
		var month=MppnMonth;
    	var year=MppmYear;
    	var day=year+'-'+month;
    	return day;
	},
	
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
			limit:20,//查询最大条数
		};
		var query={tcode:'mainfields',tid:day};
		console.log('查询的天数：'+day);
		console.log('进入公共查询一日的方法中');
		this.queryJSONStore(obj.todayisgood,dbname,options,query,obj);
		
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
	  var Panel=Ext.getCmp(PanelId);
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
			     id:PanelId,
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

//检验是否需要短信通知，不需要返回true,传入选择组件id和短息通知号码组件id
		sendNumberCheck:function(sendmobile,sendnumber){
			var flag = true ;
			var value = Ext.getCmp(sendmobile).getValue();
			var number =Ext.getCmp(sendnumber).getValue();
			if(value=='是'){
				if(number==""||number==null){
//					Ext.Msg.alert("通知号码不能为空");
					WL.Toast.show("通知号码不能为空");
					flag = false;
				}
//				flag = mobileCheck(sendnumber);
			}
			return flag;
		},
//传入联系电话组件id
//联系电话的验证(包括手机号码)，正确返回true,不正确返回false
		phoneCheck:function(phone){
			return phoneNumberCheck(phone);
		},
		
		
//		验证出差申请是否符合格式,符合返回true,不符合返回false
		traveRequestCheck:function(IdTrave){
			var ygh = IdTrave[0];
			var sendmobile = IdTrave[1];
			var sendnumber = IdTrave[2];
			var plant = IdTrave[3];
			var phone_sfz = IdTrave[4];
			var phone = IdTrave[5];
//			alert(phone);
//			判断是否人员工号是否为0001
			if(Ext.getCmp(ygh).getValue()=='0001'){
//				Ext.Msg.alert('总裁、副总裁出差不需要填写本流程1');
				WL.Toast.show("总裁、副总裁出差不需要填写本流程！");
				return false;
			}
//			判断联系电话格式是否正确
//			if(!phoneNumberCheck(phone)){
//				return false;
//			}
			
//			判断是否坐飞机，是的话判断身份证号码是否填写
			if(Ext.getCmp(plant).getValue()=='是'){
				if(idCardCheck(phone_sfz)==false){
					return false;
				}
				
			}
//			判断短信通知号码是否正确
			if(Ext.getCmp(sendmobile).getValue()=='是'){
				if(Ext.getCmp(sendnumber).getValue()==""||Ext.getCmp(sendnumber).getValue()==null){
//					Ext.Msg.alert("通知号码不能为空");
					WL.Toast.show("通知号码不能为空");
					flag = false;
				}
			}
			
			return true ;
		},
		//zhj  把图片转黄base64
		
		changeBaseImg64:function(url,callback,type){
			var canvas =document.createElement('CANVAS');
			var ctx=canvas.getContext('2d');
			var img =new Image;
			img.crossOrigin='Anonymous';
			img.onload=function(){
				canvas.height=img.height;
				canvas.width=img.width;
				ctx.drawImage(img,0,0);
	        var dataURL=canvas.toDataURL(type || 'image/png');
	        callback.call(this,dataURL);
	        canvas =null;
			};
			
			img.src=url;
			
		}
		
		
});
//传入联系电话组件id
//联系电话的验证(包括手机号码)，正确返回true,不正确返回false
function phoneNumberCheck(phone){
	var flag = true ;
	var phoneValue = Ext.getCmp(phone).getValue();
	var reg = /(^(0[0-9]{2,3})?([2-9][0-9]{6,7})+([0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}))?(1[3458]\d{9})$)/;
//	var reg = /(^(0[0-9]{2,3})?([2-9][0-9]{6,7})+([0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}))?([0-9]{11})$)/;
	if(!reg.test(phoneValue)){
//		Ext.Msg.alert('请输入正确的联系人电话');
		WL.Toast.show("请输入正确的联系人电话");
		flag = false ; 
	}
	return flag;
};
//传入身份证号码组件id
//身份证号码的验证，正确的返回true,不正确返回false;
function idCardCheck(idCard){
	var flag = true ;
//身份证为15位或者18位，15位时全数字，18位全数字或者17位数字最后一位为字符X
	var reg = /(^\d{15}&)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	var idValue = Ext.getCmp(idCard).getValue();
	if(!reg.test(idValue)){
		Ext.Msg.alert("请输入正确的身份证号码");
		WL.Toast.show("请输入正确的身份证号码");
		flag = false;
	}
	return flag;
};

//传入手机号码组件id
//手机号码的验证，正确返回true,不正确的返回false
//function mobileCheck(sendnumber){
//	var flag = true ;
//	var reg = /^[1][3458]\d{9}$/;
////	var reg = /^[0-9]{11}$/;
//	var sendValue = Ext.getCmp(sendnumber).getValue();
//	if(!reg.test(sendValue)){
//		Ext.Msg.alert("请输入正确的手机号码");
//		WL.Toast.show("请输入正确的手机号码");
//		flag = false;
//	}
//	return flag;
//};



//字符串去前后空格
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g,'');
};

//重写时间格式
var picker_show1;
var need_text_id=null;
function initDate1(id,title){
	need_text_id=id;
	if(!picker_show1){
		picker_show1=Ext.Viewport.add({
			  xtype: 'datepicker',  
			  slotOrder: ['year','month','day'],
              doneButton: '确认',
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

//




var picker_show;
function initDate(nowTime,title,need_text_id){
	 need_text_id=need_text_id;
	 if(Ext.getCmp(need_text_id).getZIndex()==999){
		 return;
	 }
	 var Year=new Array();
	 for(var i=0;i<20;i++){
     	var temp={};
     	temp.text=(new Date().getFullYear()+i)+"年";
     	temp.value=(new Date().getFullYear()+i)+"";
     	Year.push(temp);
     }
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
				day = Ext.create("HelcOA.store.ForApprovalProcess.DailyOffice.Idea.day"); 
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
                 data:Year
                 ,listeners:{
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
        					day = Ext.create("HelcOA.store.ForApprovalProcess.DailyOffice.Idea.day"); 
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
       					day = Ext.create("HelcOA.store.ForApprovalProcess.DailyOffice.Idea.day"); 
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
//        	 Ext.util.InputBlocker.blockInputs();
//        	 obj.addAfterListener('hide',function(){
//        		 Ext.util.InputBlocker.unblockInputs();
//        	 });
//        
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
picker_show.show();
}



//重写时间格式
var picker_show2;
var need_text_id=null;
function initDate2(id,title){
	need_text_id=id;
	if(Ext.getCmp(need_text_id).getZIndex()==999){
		return;
	}
	if(!picker_show2){
		picker_show2=Ext.Viewport.add({
			xtype: 'datepicker',
			yearFrom: 2014,
			slotOrder: ['year','month','day'],
			doneButton: '确认',
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
						    			   picker_show2.setValue('');
						    			   picker_show2.setHidden(true);   
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
				show:function(){
					var value=Ext.getCmp(need_text_id).getValue();
					if(value==''||value==null||typeof(value)=='undefined'||value=='点击文本设置时间'){
						picker_show2.setValue(new Date());
					}else{
						picker_show2.setValue(new Date(value));
					} 
				}
			}
			
			
		});
		picker_show2.show();
	}else{
		var newToolbar={title:(title==''||title==null||typeof(title)=='undefined')?'选择时间':title};
		picker_show2.setToolbar(newToolbar);
		picker_show2.show();
	}
}

//重写时间格式,最小只能选今天
var picker_show2_min_today;
var need_text_id_min_today=null;
function initDate2_min_today(id,title){
	need_text_id_min_today=id;
	if(Ext.getCmp(need_text_id_min_today).getZIndex()==999){
		return;
	}
	if(!picker_show2_min_today){
		picker_show2_min_today=Ext.Viewport.add({
			xtype: 'datepicker',
			yearFrom: 2014,
			slotOrder: ['year','month','day'],
			doneButton: '确认',
			cancelButton: '取消',
			toolbar:{
				title:(title==''||title==null||typeof(title)=='undefined')?'选择时间':title,
						items:[ 
						       {
						    	   xtype:'button',
						    	   text:'清除',
						    	   listeners:{
						    		   tap:function(){
						    			   Ext.getCmp(need_text_id_min_today).setValue('');
						    			   picker_show2_min_today.setValue('');
						    			   picker_show2_min_today.setHidden(true);   
						    		   }
						    	   }
						       }    
						       ]
			},
			listeners:{
				change:function(obk,values,eOpts){
					if(Ext.getCmp(need_text_id_min_today).getValue()==Ext.Date.format(values,'Y-m-d')){
						Ext.getCmp(need_text_id_min_today).setValue(Ext.Date.format(values,'Y-m-d')+' ');
					}else{
						Ext.getCmp(need_text_id_min_today).setValue(Ext.Date.format(values,'Y-m-d'));
					}
				},
				show:function(){
					var value=Ext.getCmp(need_text_id_min_today).getValue();
					if(value==''||value==null||typeof(value)=='undefined'||value=='点击文本设置时间'){
						picker_show2_min_today.setValue(new Date());
					}else{
						picker_show2_min_today.setValue(new Date(value));
					} 
				}
			}
			
			
		});
		picker_show2_min_today.show();
	}else{
		var newToolbar={title:(title==''||title==null||typeof(title)=='undefined')?'选择时间':title};
		picker_show2_min_today.setToolbar(newToolbar);
		picker_show2_min_today.show();
	}
}

//时间控件，只有时和分
var picker_show3;
var need_text_id3=null;
function initDate3(id,title){
	var dataH = [];
	var dataM = [];
	for(var i=7;i<23;i++){
		dataH.push({text:i+'点',value:i});
	}
	for(var i=0;i<5;i++){
		dataM.push({text:i*10,value:i*10});
	}
	need_text_id3=id;
	if(Ext.getCmp(need_text_id3).getZIndex()==999){
		 return;
	 }
	if(!picker_show3){
		picker_show3=Ext.Viewport.add({
			xtype: 'picker',
	         ui: 'dark',
	         id:'myPicker1',
	         doneButton: '确定',
	         cancelButton: '取消',
	         modal:true,
	         toolbar: {
	             ui: 'light',
	             title: title,
	         },
	         slots: [
	             {
	                 xtype: 'pickerslot',
	                 align:'center',
	                 name: 'hour',
	                 title: 'MyPickerSlot0',
	                 id:'slots00',
	                 data:dataH
	             },
		      {
	                 xtype: 'pickerslot',
	                 align:'center',
	                 name: 'miunit',
	                 title: 'MyPickerSlot1',
	                 id:'slots01',
	                 data:[
	                       {text:'00分',value:'00'},
	                       {text:'10分',value:'10'},
	                       {text:'20分',value:'20'},
	                       {text:'30分',value:'30'},
	                       {text:'40分',value:'40'},
	                       {text:'50分',value:'50'},
	                       ]
		      }],
	             toolbar:{
	 				title:(title==''||title==null||typeof(title)=='undefined')?'选择时间':title,
	 						items:[ 
	 						       {
	 						    	   xtype:'button',
	 						    	   text:'清除',
	 						    	   listeners:{
	 						    		   tap:function(){
	 						    			   Ext.getCmp(need_text_id3).setValue('');
	 						    			   picker_show3.setValue('');
	 						    			   picker_show3.setHidden(true);   
	 						    		   }
	 						    	   }
	 						       }    
	 						       ]
	 			},
	             listeners:{
	            	 change:function(obj, value, eOpts ){
	            	 Ext.getCmp(need_text_id3).setValue(value.hour+":"+value.miunit);
	            	 },
	             }
		 });
		picker_show3.show();
		}else{
			picker_show3.show();
		}
}

//传入地区选项值，判断地区后读取数据仓库数据导入options
function addSelectOptions(selectValue){
	var store ='';
	if(selectValue=='亚洲'){
		store=Ext.create('HelcOA.store.startTheProcess.DailyOffice.Idea.selectAsiaCountry');
	}else if(selectValue=='欧洲'){
		store=Ext.create('HelcOA.store.startTheProcess.DailyOffice.Idea.selectEuropeCountry');
	}else if(selectValue=='美洲'){
		store=Ext.create('HelcOA.store.startTheProcess.DailyOffice.Idea.selectAmericaCountry');
	}else if(selectValue=='非洲'){
		store=Ext.create('HelcOA.store.startTheProcess.DailyOffice.Idea.selectAfricaCountry');
	}else if(selectValue=='大洋洲太平洋岛屿'){
		store=Ext.create('HelcOA.store.startTheProcess.DailyOffice.Idea.selectPacificCountry');
	}else{
		store = Ext.create('Ext.data.Store',{
			config:{
			model:'HelcOA.model.startTheProcess.DailyOffice.Idea.selectCountryModel',
			data:[{text:'',value:''}]
			}
		});
	}
	Ext.getCmp('country').setStore(store);
}
function offInforma(){
	Ext.getCmp('paymoney1').setRequired(false);
    Ext.getCmp('notpaymoney1').setRequired(false);
    Ext.getCmp('money2').setRequired(false);
    Ext.getCmp('money3').setRequired(false);
    Ext.getCmp('money4').setRequired(false);
    Ext.getCmp('money5').setRequired(false);
    Ext.getCmp('money6').setRequired(false);
    Ext.getCmp('date1').setRequired(false);
    Ext.getCmp('htmoney2').setRequired(false);
    Ext.getCmp('paymoney2').setRequired(false);
    Ext.getCmp('notpaymoney2').setRequired(false);
    Ext.getCmp('money11').setRequired(false);
    Ext.getCmp('money12').setRequired(false);
    Ext.getCmp('money13').setRequired(false);
    Ext.getCmp('money14').setRequired(false);
    Ext.getCmp('money15').setRequired(false);
    Ext.getCmp('date2').setRequired(false);
    Ext.getCmp('htmoney3').setRequired(false);
    Ext.getCmp('paymoney3').setRequired(false);
    Ext.getCmp('notpaymoney3').setRequired(false);
    Ext.getCmp('money21').setRequired(false);
    Ext.getCmp('htmoney4').setRequired(false);
    Ext.getCmp('paymoney4').setRequired(false);
    Ext.getCmp('notpaymoney4').setRequired(false);
    Ext.getCmp('money31').setRequired(false);
}
function changeByHttype(newValue){
	offInforma();
	if(newValue=='买卖合同'){
		Ext.getCmp('paymoney1').setRequired(true);
		Ext.getCmp('notpaymoney1').setRequired(true);
		Ext.getCmp('money2').setRequired(true);
		Ext.getCmp('money3').setRequired(true);
		Ext.getCmp('money4').setRequired(true);
		Ext.getCmp('money5').setRequired(true);
		Ext.getCmp('money6').setRequired(true);
		Ext.getCmp('date1').setRequired(true);
	}else if(newValue=='安装合同'){
		Ext.getCmp('htmoney2').setRequired(true);
		Ext.getCmp('paymoney2').setRequired(true);
		Ext.getCmp('notpaymoney2').setRequired(true);
		Ext.getCmp('money11').setRequired(true);
		Ext.getCmp('money12').setRequired(true);
		Ext.getCmp('money13').setRequired(true);
		Ext.getCmp('money14').setRequired(true);
		Ext.getCmp('money15').setRequired(true);
		Ext.getCmp('date2').setRequired(true);
	}else if(newValue=='买卖附带安装合同'){
		Ext.getCmp('paymoney1').setRequired(true);
		Ext.getCmp('notpaymoney1').setRequired(true);
		Ext.getCmp('money2').setRequired(true);
		Ext.getCmp('money3').setRequired(true);
		Ext.getCmp('money4').setRequired(true);
		Ext.getCmp('money5').setRequired(true);
		Ext.getCmp('money6').setRequired(true);
		Ext.getCmp('date1').setRequired(true);
		Ext.getCmp('htmoney2').setRequired(true);
		Ext.getCmp('paymoney2').setRequired(true);
		Ext.getCmp('notpaymoney2').setRequired(true);
		Ext.getCmp('money11').setRequired(true);
		Ext.getCmp('money12').setRequired(true);
		Ext.getCmp('money13').setRequired(true);
		Ext.getCmp('money14').setRequired(true);
		Ext.getCmp('money15').setRequired(true);
		Ext.getCmp('date2').setRequired(true);
	}else if(newValue=='维保合同'){
		Ext.getCmp('htmoney3').setRequired(true);
		Ext.getCmp('paymoney3').setRequired(true);
		Ext.getCmp('notpaymoney3').setRequired(true);
		Ext.getCmp('money21').setRequired(true);
	}else if(newValue=='改造合同'){
		Ext.getCmp('htmoney4').setRequired(true);
		Ext.getCmp('paymoney4').setRequired(true);
		Ext.getCmp('notpaymoney4').setRequired(true);
		Ext.getCmp('money31').setRequired(true);
	}
}


