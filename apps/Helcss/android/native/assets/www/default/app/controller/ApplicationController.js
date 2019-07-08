
/* JavaScript content from app/controller/ApplicationController.js in folder common */
/**
 * 全局Controller
 * 
 */
Ext.define("Helcss.controller.ApplicationController", {
	extend : "Ext.app.Controller",

	searchStoreName : "Distributors",

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
	   
});