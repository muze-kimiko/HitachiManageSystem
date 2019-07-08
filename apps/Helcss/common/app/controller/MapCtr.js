/**
 * 地图视图的控制器
 */
Ext.define("Helcss.controller.MapCtr", {
	extend : "Helcss.controller.ApplicationController",
	requires: ['Ext.Menu'], 
	config : {
		   refs : {
			   
		   map_back : 'button[id=btn_map_back]',
		   
		   map_info : 'button[id=btn_map_info]',
		   
		   map_search : 'button[id=btn_map_search]',
			   
		   map_emplist : 'button[id=btn_map_emplist]'
			   
		},
		control : { 
			
			map_back : {
				tap : 'map_back'
			},
			
			map_info : {
				tap : 'map_info'
			},
			
			map_search : {
				tap : 'map_search'
			},
			
			map_emplist : {
				tap : 'map_emplist'
			},
			
			"#self_map_city" : {
				 change : 'selectChange_city'
			},
			
			"#self_map_domain" : {
				change : 'selectChange_domain'
			},
			
			"#map_emp_list" : {
				itemtap : 'map_emp_list_itemtap'
			}
			
		}
	},
	
	/**
	 * 返回处理
	 */
	map_back : function() {
		var map_con = Ext.getCmp('map_con');
    	map_con.setHidden(true);
		this.showBackView('mainmenu', 'Helcss.view.MainMenu');
		//Ext.getCmp('map_view').destroy();
	},
	
	/**
	 * 地图显示描点
	 */
	map_info : function() {
		/*
		 var marker = new MMarker(new MPoint(113.29174,23.01536),
     	 new MIcon('images/pin_green.png',32,32),
     	 new MInfoWindow("位置信息","广州市石北工业路大石镇 附近"));
     	 maplet.addOverlay(marker);
     	 */
		this.connectServer(this.handleSearSelectData, 
				"mapAction.do?method=toSearchSelectCity", "{'userid':'"+ loginusername +"'}");
		
		//this.connectSql(this.handleSearSelectData,"procedure_xscityList",loginusername);
	},
	
	handleSearSelectData : function(result) {
		//var ops_city = result.CITY;
		//var ops_city = [{ text : 'c1',value: 'c1'},{ text : 'c1',value: 'c1'}]; 
		var ops_city = result.CITY; 
		var ops_domain = "";
		var ops_eno = "";
		
		//平台判断
		if(PDsystem==1){
			if (!ovlay) {
				ovlay= Ext.Viewport.add({
					id : 'opanel',
		            xtype: 'panel',
		            modal: true,
		            hideOnMaskTap: true,
		            //scrollable: true,
		            showAnimation: {
		                type: 'popIn',
		                duration: 250,
		                easing: 'ease-out'
		            },
		            hideAnimation: {
		                type: 'popOut',
		                duration: 250,
		                easing: 'ease-out'
		            },
		            centered: true,
		            width: '80%',
		            height: 340,
		            styleHtmlContent: true,
		            items: [{
		                    docked: 'top',
		                    xtype: 'toolbar',
		                    style : 'font-size:12pt',
		                    title: '搜索...'
		                },{
		                	xtype : 'container',
		                	items : [{
		                    	 id : 'self_map_city',
		                         xtype: 'selectfield',
		                         labelWidth: '40%',
		                         style : 'font-size:12pt;margin-bottom:10px;',
		                         label: '城市',
		                         options: ops_city
		                    },{
		                    	id : 'self_map_domain',
		                    	xtype : 'selectfield',
		                    	labelWidth: '40%',
		                    	style : 'font-size:12pt;margin-bottom:10px;height:45px',
		                    	label : '地盘',
		                    	options: ops_domain
		                    },{
		                    	id : 'self_map_elevator',
		                    	xtype : 'selectfield',
		                    	labelWidth: '40%',
		                    	style : 'font-size:12pt;margin-bottom:10px;',
		                    	label : '工号',
		                    	options: ops_eno
		                    },{
		                    	id : 'self_map_distance',
		                    	xtype : 'selectfield',
		                    	labelWidth: '40%',
		                    	style : 'font-size:12pt;margin-bottom:10px;',
		                    	label : '范围',
		                    	options: [
		                                  {text: '500米',  value: '500'},
		                                  {text: '1000米', value: '1000'},
		                                  {text: '2000米',  value: '2000'}
		                              ]
		                    },{
		                    	id : 'btn_map_search',
		                    	xtype : 'button',
		                    	style : 'font-size:12pt;margin-top:10px',
		                    	text : '定位'
		                    }]
		                }
		            ]
		        });
			};
		}else{

			if (!ovlay) {
				//alert('第一次进来');
				ovlay= Ext.Viewport.add({
					id : 'opanel',
		            xtype: 'panel',
		            modal: true,
		            hideOnMaskTap: true,
		            //scrollable: true,
		            showAnimation: {
		                type: 'popIn',
		                duration: 250,
		                easing: 'ease-out'
		            },
		            hideAnimation: {
		                type: 'popOut',
		                duration: 250,
		                easing: 'ease-out'
		            },
		            centered: true,
		            width: 550,
		            height: 400,
		            styleHtmlContent: true,
		            items: [{
		                    docked: 'top',
		                    xtype: 'toolbar',
		                    title: '搜索...'
		                },{
		                	xtype : 'container',
		                	items : [{
		                    	 id : 'self_map_city',
		                         xtype: 'selectfield',
		                         style : 'font-size:14pt;margin-bottom:10px;',
		                         label: '城市',
		                         options: ops_city
		                    },{
		                    	id : 'self_map_domain',
		                    	xtype : 'selectfield',
		                    	style : 'font-size:14pt;margin-bottom:10px;height:45px',
		                    	label : '地盘',
		                    	options: ops_domain
		                    },{
		                    	id : 'self_map_elevator',
		                    	xtype : 'selectfield',
		                    	style : 'font-size:14pt;margin-bottom:10px;',
		                    	label : '工号',
		                    	options: ops_eno
		                    },{
		                    	id : 'self_map_distance',
		                    	xtype : 'selectfield',
		                    	style : 'font-size:14pt;margin-bottom:10px;',
		                    	label : '范围',
		                    	options: [
		                                  {text: '500米',  value: '500'},
		                                  {text: '1000米', value: '1000'},
		                                  {text: '2000米',  value: '2000'}
		                              ]
		                    },{
		                    	id : 'btn_map_search',
		                    	xtype : 'button',
		                    	style : 'font-size:14pt;margin-top:20px',
		                    	text : '定位'
		                    }]
		                }
		            ]
		        });
			};
		};
		
		ovlay.show();
	},
	
	/*
	 * 选择城市处理
	 */
	selectChange_city : function (obj, newValue, oldValue, eOpts) {
		if (newValue != "请选择城市") {
			var self_map_domain = Ext.getCmp('self_map_domain');
			self_map_domain.setOptions("");
			var self_map_elevator = Ext.getCmp('self_map_elevator');
			self_map_elevator.setOptions("");
			this.connectServer(this.initDomain, "mapAction.do?method=toSearchSelectDomain", "{'userid':'"
					+ loginusername +"',city:'"+ newValue +"'}");
		} else {
			var self_map_domain = Ext.getCmp('self_map_domain');
			self_map_domain.setOptions("");
			var self_map_elevator = Ext.getCmp('self_map_elevator');
			self_map_elevator.setOptions("");
		}
	},
	initDomain : function (result) {
		var self_map_domain = Ext.getCmp('self_map_domain');
		var ops = result.DOMAIN;
		self_map_domain.setOptions(ops);
	},
	
	/*
	 * 选择地盘处理
	 */
	selectChange_domain : function (obj, newValue, oldValue, eOpts) {
		if (newValue != "请选择地盘") {
			var self_map_elevator = Ext.getCmp('self_map_elevator');
			self_map_elevator.setOptions("");
			var self_map_city = Ext.getCmp('self_map_city');
			this.connectServer(this.initEno, "mapAction.do?method=toSearchSelectEle", "{'city':'"
					+ self_map_city.getValue() +"',domain:'"+ newValue +"'}");
		} else {
			var self_map_elevator = Ext.getCmp('self_map_elevator');
			self_map_elevator.setOptions("");
		}
	},
	initEno : function (result) {
		var self_map_elevator = Ext.getCmp('self_map_elevator');
		var ops = result.ENO;
		self_map_elevator.setOptions(ops);
	},
	
	map_search : function () {
		var self_map_elevator = Ext.getCmp('self_map_elevator');
		var self_map_distance = Ext.getCmp('self_map_distance');
		
		if (self_map_elevator.getValue()==null || self_map_elevator.getValue() == "") {
			Ext.Msg.alert('提示','请选择工号！');  	
		} else {
			ovlay.hide();
			if (self_map_elevator.getValue()!= null && self_map_elevator.getValue() != "") {
				this.connectServer(this.handleSearListResult, "mapAction.do?method=toSearch", "{'ELEVATOR':'"
						+ self_map_elevator.getValue() +"',DISTANCE:'"+ self_map_distance.getValue() +"'}");
			}			
		}
	},
	
	handleSearListResult : function (result){
		var sto_fault = Ext.data.StoreManager.get("MapAroundEmpStore"); 
		if (!sto_fault) { 
			sto_fault = Ext.create("Helcss.store.map.MapAroundEmpStore"); 
		} 
		// 第一种人员显示方式，赞无使用
		sto_fault.setData(result.items, this);
		var btn = Ext.getCmp('btn_emplist');
    	btn.setHidden(true);
    	
    	var map_con = Ext.getCmp('map_con');
    	map_con.setHidden(false);
    	
		var emps = result.items;
		var length = emps.length;
		var opts = {enableMessage:false};
		
		function createInfoWindow(item,opts) {
			var marker1 = new BMap.Marker(new BMap.Point(item.X,item.Y));
			var infoWindow1 = new BMap.InfoWindow("<p style='font-size:18px;font-weight:bold;'>"
					+ item.USERNAME +" ("+ item.USERID +")</p><p style='display:none;font-size:16px;'>手机："
					+ item.PHONENO +"</p><p style='font-size:16px;'>位置："
					+ item.ADDRESS +"</p><p style='display:none;font-size:16px;'>时间："+ item.TIME +"</p>",opts);
			marker1.addEventListener("click", function(){this.openInfoWindow(infoWindow1);});
			maplet.addOverlay(marker1);
		};
		
		maplet.clearOverlays();
    	
		for (var i = 0; i < length; i ++) {
			var item = emps[i];
			createInfoWindow(item,opts);
		}
		
		var ele_mark = new BMap.Marker(new BMap.Point(result.ELE_ADDRESS.X,result.ELE_ADDRESS.Y));  
		maplet.addOverlay(ele_mark);
		maplet.centerAndZoom(new BMap.Point(result.ELE_ADDRESS.X,result.ELE_ADDRESS.Y), 16);
		var ele_infoWindow = new BMap.InfoWindow("<p style='font-size:18px;font-weight:bold;'>"
				+ result.ELE_ADDRESS.eno +"</p><p style='font-size:16px;'>地址："
				+ result.ELE_ADDRESS.Address +"</p>",opts);
		ele_mark.addEventListener("click", function(){this.openInfoWindow(ele_infoWindow);});
		var myIcon=new BMap.Icon("images/pin_green.png",new BMap.Size(22,36)); // 更换为自定义图片
		ele_mark.setIcon(myIcon);
		ele_mark.openInfoWindow(ele_infoWindow);
		
		//增加园/**/
		/**/var self_map_distance = Ext.getCmp('self_map_distance');
		var circle = new BMap.Circle(new BMap.Point(result.ELE_ADDRESS.X,
				result.ELE_ADDRESS.Y),self_map_distance.getValue());
		circle.setFillColor("#00a");
		circle.setFillOpacity("0.1");
		circle.setStrokeWeight("1");
		maplet.addOverlay(circle);
	},
	
	
	
	
	// 人员列表点击
	map_emp_list_itemtap : function (obj, index, target, record, e, eOpts) {
		var sto_fault = Ext.data.StoreManager.get("MapAroundEmpStore"); 
		if (!sto_fault) { 
			sto_fault = Ext.create("Helcss.store.map.MapAroundEmpStore"); 
		} 
		var date = sto_fault.getAt(index);
		var ovs = maplet.getOverlays();
		var item = ovs[index];
		var opts = {enableMessage:false};
		var infoWindow2 = new BMap.InfoWindow("<p style='font-size:18px;font-weight:bold;'>"
				+ date.get('USERNAME') +" ("+ date.get('USERID') +")</p><p style='display:none;font-size:16px;'>手机："
				+ date.get('PHONENO') +"</p><p style='font-size:16px;'>位置："+ date.get('ADDRESS') 
				+"</p><p style='display:none;font-size:16px;'>时间："+ date.get('TIME') +"</p>",opts);
		item.openInfoWindow(infoWindow2);
	}
	
});