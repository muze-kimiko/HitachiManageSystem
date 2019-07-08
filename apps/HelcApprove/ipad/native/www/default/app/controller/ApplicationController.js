
/* JavaScript content from app/controller/ApplicationController.js in folder common */
/**
 * 全局Controller
 * 
 */
Ext.define("HelcApprove.controller.ApplicationController", {
	extend : "Ext.app.Controller",

	searchStoreName : "Distributors",

	getPlatform : function() {
		return this.getApplication().platform;
	},
	
	//进入下一个页面，跳转
	NextView:function(viewId,FullName){
		myLoading.show();
		var ViewId = Ext.Viewport.getActiveItem().id;
		var ViewName = Ext.Viewport.getActiveItem().__proto__.$className;
		ViewArray.push({ViewId:ViewId,ViewName:ViewName});
		var viewName=Ext.getCmp(viewId);
		   if(viewName){
			   viewName.destroy();
//			   console.log(viewName+' destroy!');
		   }
	    Ext.Viewport.setActiveItem(Ext.create(FullName));
	    myLoading.hide();
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
	  showBackView_tbjinfo : function(id, name) {
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
		var view = Ext.getCmp(id);
		if(!view){
			view = Ext.create(name);
		}
		
		//Ext.Viewport.getLayout().setAnimation({type : 'slide', direction : 'left'});
		Ext.Viewport.setActiveItem(view); 
	},
	
	/**
	 * 控制全部页面的返回跳转
	 */
	showBackView : function(id, name) {
		var main = Ext.getCmp(id);
   	 	if(!main){
   		 main = Ext.create(name);
   	 	}
   	 	//Ext.Viewport.getLayout().setAnimation({type : 'slide', direction : 'right'});
   	 	Ext.Viewport.setActiveItem(main);
   	 	
//   	 Ext.getCmp(id).destroy();
	},
	
	//创建store 的时候使用
	getStore:function(storeName,FullNAME){
		var store=Ext.data.StoreManager.get(storeName);
		if (!store) { 
	 		store = Ext.create(FullNAME); 
	 		}; 
	 	return store;
	},
	
	/**
	 * 访问SQL
	 */
	connectSql : function (fn, producedure, params,param2) {
		myLoading.show();
		var invocationData;
		if (params==null) {
			invocationData = {  
	                adapter : 'SqlAdapter',  
	                procedure : producedure
	        }; 
		} else if (param2==null) {
			invocationData = {  
	                adapter : 'SqlAdapter',  
	                procedure : producedure,
	                parameters : [params] 
	        }; 
		} else {
			invocationData = {  
	                adapter : 'SqlAdapter',  
	                procedure : producedure,
	                parameters : [params,param2] 
	        }; 
		}
		
    	WL.Client.invokeProcedure(invocationData, {
            onSuccess : function (result) { 
            	var httpStatusCode = result.status;
            	if (200 == httpStatusCode) {
                    var invocationResult = result.invocationResult;
                    var isSuccessful = invocationResult.isSuccessful;
                    if (true == isSuccessful) {
                    	var resultSet = invocationResult.resultSet;
                    	console.log("结果："+resultSet);
                    	console.log("结果长度："+resultSet.length);
                    	 if(resultSet.length>0){ 
                    		fn(resultSet);
	                   	 }else{
	                   		 Ext.Msg.alert('提示','没有符合的数据!');   
	                   	 }
                    	 myLoading.hide();
                    } else {
                    	Ext.Msg.alert('提示','获取数据失败!');  
                    	myLoading.hide();
                    }
                } else {
                	Ext.Msg.alert('提示','网络出错！'); 
                	myLoading.hide();
                }
            },  
            onFailure : function () {
            	 Ext.Msg.alert('提示','发送请求失败');
            	 myLoading.hide();
            	}
        });
		
	},
	
	/**
	 * 访问网络
	 */
	connectServer : function(fn, url, params) {
		myLoading.show();
		var invocationData = {  
	              adapter : 'HttpAdapter',  
	              procedure : 'getStories',
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
	                          fn(json);
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
	
	/**
	 * 访问接口
	 */
	connectServer_ws : function(fn, params) {
		var obj = this;
		if (params.isLoading) {
			myLoading.show();
		}
		console.log(params);
		
		var invocationData = {  
				adapter : 'HttpAdapter_APPROVE',  
				procedure :params.method ,
				parameters : params.parameters
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:120000,
				onSuccess : function (result) {
					myLoading.hide();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							/*var v_result = invocationResult.result;
							var json = eval("("+v_result+")"); */
							fn(invocationResult);
						} else {
							
							//Ext.Msg.alert('提示', '服务器繁忙，请稍后重试！');
							fn(null);
						}
					} else {
						//Ext.Msg.alert('提示', '服务器繁忙，请稍后重试！');
						fn(null);
					}
				},  
				onFailure : function (result) {
					myLoading.hide();
					fn(null);
					if (result.errorCode != undefined && result.errorCode != null && result.errorCode != '' && result.errorCode.indexOf('TIMEOUT') != -1) {
		        		  //Ext.Msg.alert('提示', '服务器响应超时！');
		        	  } else {
		        		  //Ext.Msg.alert('提示', '连接不上服务器，请稍后重试！');
		        	  }
				}
			});
		} catch (e) {
			myLoading.hide();
			//Ext.Msg.alert('提示', '系统出错，请稍后重试！');
			fn(null);
		}
	},
	
	/**
	 * 获取Store
	 */
	toGetStore: function(sName, lName) {
		var store = Ext.data.StoreManager.get(sName);
		if (!store) { 
			store = Ext.create(lName); 
		}
		return store;
	},

	connectServer_APPROVE : function(fn, params) {
		var obj = this;
		myLoading.show();
		console.log(params);
		
		var invocationData = {  
				adapter : 'HttpAdapter_APPROVE',  
				procedure :params.method ,
				parameters : params.parameters
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:120000,
				onSuccess : function (result) {
					myLoading.hide();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							fn(invocationResult);
							console.log(invocationResult);
						} else {
							Ext.Msg.alert('提示','服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						Ext.Msg.alert('提示','服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function (result) {
					myLoading.hide();
					if (result.errorCode != undefined && result.errorCode != null && result.errorCode != '' && result.errorCode.indexOf('TIMEOUT') != -1) {
		        		  Ext.Msg.alert('提示','服务器响应超时！');
		        	  } else {
		        		  Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
		        	  }
				}
			});
		} catch (e) {
			 myLoading.hide();
			console.log('连接服务器出错');
		}
	},
	
	//审批按钮
	connectServer_APPROVE_SP : function(fn, params) {
		var obj = this;
		myLoading.show();
		console.log(params);
		
		var invocationData = {  
				adapter : 'HttpAdapter_APPROVE',  
				procedure :params.method ,
				parameters : params.parameters
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:180000,
				onSuccess : function (result) {
					myLoading.hide();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							fn(invocationResult);
							console.log(invocationResult);
						} else {
							fn(null);
						}
					} else {
						fn(null);
					}
				},  
				onFailure : function (result) {
					myLoading.hide();
					if (result.errorCode != undefined && result.errorCode != null && result.errorCode != '' && result.errorCode.indexOf('TIMEOUT') != -1) {
						Ext.Msg.alert('提示','服务器响应超时！');
		        	} else {
		        		Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
		        	}
				}
			});
		} catch (e) {
			myLoading.hide();
			console.log('连接服务器出错');
		}
	},
	
	connectServer_SQL_APPROVE : function(fn, params) {
		myLoading.show();
		console.log(params);
		var invocationData = {  
				adapter : 'SQLAdapter_APPROVE',  
				procedure :params.method ,
				parameters : params.parameters
		};
		try {
			WL.Client.invokeProcedure(invocationData, {
				timeout:120000,
				onSuccess : function (result) {
					myLoading.hide();
					var httpStatusCode = result.status;
					if (200 == httpStatusCode) {
						var invocationResult = result.invocationResult;
						var isSuccessful = invocationResult.isSuccessful;
						if (true == isSuccessful) {
							fn(invocationResult);
							console.log(invocationResult);
						} else {
							//Ext.Msg.alert('提示','服务器繁忙('+httpStatusCode+')，请稍后重试！');
						}
					} else {
						//Ext.Msg.alert('提示','服务器繁忙('+httpStatusCode+')，请稍后重试！');
					}
				},  
				onFailure : function () {
					myLoading.hide();
				 	//Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				}
			});
		} catch (e) {
			 myLoading.hide();
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
	
	stringToDouble : function(s){
		var Double = null;
		if(s=="" || typeof(s)=="undefined"){
			return "0.00";
		}else{
			try{
				Double = parseFloat(s);
			}catch(e){
				Double = "0.00";
				return Double;
			}
			return Double;
		}
	},
	
	//保留两位小数，不足补0
	changeTwoDecimal : function(x){
		var f_x = parseFloat(x);
		if(isNaN(f_x)){
			console.log("不是数字");
			return "0.00";
		}
		var f_x = Math.round(x*100)/100;
		var s_x = f_x.toString();
		var pos_decimal = s_x.indexOf('.');
		if(pos_decimal < 0){
			pos_decimal = s_x.length;
			s_x += '.';
		}
		while(s_x.length <= pos_decimal+2){
			s_x += '0';
		}
		return s_x;
		
	},
	
	//四舍五入
	round_2 : function(number,fraction){
		with(Math){
			return round(number*pow(10,fraction))/pow(10,fraction);
		}
	},
	
	//产生随机字母和数字
	randomWord : function(){
		var str = "";
		var arr = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H',
		           'I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		for(var i=0;i<32;i++){
			var pos = Math.round(Math.random()*(arr.length-1));
			str += arr[pos];
			if(i == 7 || i == 11 || i == 15 || i == 19){
				str += "-";
			}
		}
		return str;
	},
	   
});

// 控制Input只能输入数字
function onInputPress(obj) {
	var val = obj.value=obj.value.replace(/[^\d]/g,'');
	obj.value = val;
}

function isNum(e) {
	var keynum ;

	var keychar ; 

	var numcheck ; 

	if(window.event) // IE  

	{  

	keynum = e.keyCode  

	}  

	else if(e.which) // Netscape/Firefox/Opera  

	{  

	keynum = e.which  

	}  

	keychar = String.fromCharCode(keynum);

	//判断是数字,且小数点后面只保留两位小数

	if(!isNaN(keychar)){

	var index=e.currentTarget.value.indexOf(".");

	if(index >= 0 && e.currentTarget.value.length-index >2){

	return false;

	}

	return true;

	}

	//如果是小数点 但不能出现多个 且第一位不能是小数点

	if("."== keychar ){

	if(e.currentTarget.value==""){

	return false;

	}

	if(e.currentTarget.value.indexOf(".") >= 0){

	return false;

	}

	return true;

	}

	return false  ;

	}  

// 自动生成UUID
function createUUID() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
	s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
} 