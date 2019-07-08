
/* JavaScript content from app/controller/MainMenuCtr.js in folder common */
/**
 * 
 */
Ext.define("Helcss.controller.MainMenuCtr", {
	extend : "Helcss.controller.ApplicationController",
//	extend: 'Ext.Container', 
	requires: ['Ext.Menu','Ext.Button'], 
	config : {
		   refs : {  
		   menu_jianshi: 'button[id=menu_jianshi]',
		   menu_jianjie: 'button[id=menu_jianjie]',
		   menu_xunshi:  'button[id=menu_xunshi]',
		   menu_anzhuang:'button[id=menu_anzhuang]',
		   menu_ditu:    'button[id=menu_ditu]',
	       menu_baobiao: 'button[id=menu_baobiao]' 
		},
		control : {   
			menu_jianshi:{
				tap : 'menu_jianshi'
			},
			menu_jianjie:{
				tap : 'menu_jianjie'
			},
			menu_xunshi:{
				tap : 'menu_xunshi'
			},
			menu_anzhuang:{
				tap : 'menu_anzhuang'
			},
			menu_ditu:{
				tap : 'menu_ditu'
			},
			menu_baobiao:{
				tap : 'menu_baobiao'
			} ,
			"image#img_1": {
                tap: 'onImageTap'
            }, 
			"image#img_2": {
                tap: 'onImageTap'
            }, 
			"image#img_3": {
                tap: 'onImageTap'
            } 
		}
	},
	
    onImageTap: function(image, e, eOpts) {
        image.hide();
        image.show();

    },
	 
	menu_jianshi : function() { 
		Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
//		var main = Ext.create("Helcss.view.JianshiView");
//	  		// 判断当旧视图存在的时候就从Viewport移除
//	  		main.on("deactivate", function(oldActiveItem, container, newActiveItem, eOpts) {  
//	  			if (oldActiveItem) {
//	  				Ext.Viewport.remove(oldActiveItem, true);  
//	  			}  
//	  		}); 
		var main = Ext.getCmp('jianshi');
		if(!main){
			main = Ext.create('Helcss.view.JianshiView');
		}
		Ext.Viewport.setActiveItem(main);
		main.stopjs_Interval_action();
	},
	
	menu_xunshi : function() { 
		Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
		var main = Ext.getCmp('xssearch');
		if(!main){
			main = Ext.create('Helcss.view.XunshiSearchView');
		}
		Ext.Viewport.setActiveItem(main); 
		
		
	},
	menu_anzhuang : function() { 
		Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
		var main = Ext.getCmp('inst_city_listview');
		if(!main){
			main = Ext.create('Helcss.view.install.InstallCityListView');
		}
		Ext.Viewport.setActiveItem(main); 
		var obj = Ext.getCmp("inst_city_listview");
		this.connectSql(obj.loadCity, "procedure_InstCityList", "", null);
	},
	
	menu_baobiao : function() {
		Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
//		this.showNextView("chartview","Helcss.view.ChartView");
		this.showNextView("srchartview","Helcss.view.SRChartView");
		// 获取数据 - 故障
//		var obj = Ext.getCmp("chartview");
		var obj = Ext.getCmp("srchartview");

		var obj1 = Ext.getCmp("tp_srchart");
		
		var tmp_obj = Ext.getCmp("srfaultbymonth_view");
		if(!tmp_obj){
			tmp_obj = Ext.create('Helcss.view.chart.fault.SRFaultViewByMonth');
		}
		obj1.setActiveItem( tmp_obj );
		
//		this.connectServer(obj.handleFaultResult, "faultReportAction.do?method=toSearchFault", "{'username':'水果','password':'a12345'}");
//		获取数据 - 困人		
//		this.connectServer(obj.handleBoxUpResult, "faultReportAction.do?method=toSearchBoxUp", "{'username':'水果','password':'a12345'}");
		this.connectServer(obj.handleSRFaultResultByMonth, "faultReportAction.do?method=toSearchFaultByMonth", "{'SRYM':'" + SRYM + "'}");
	},
	
	menu_ditu : function() {
		Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
		this.showNextView("map_view","Helcss.view.map.MapView");

		/*var dfd=Ext.getCmp('opanel');
		if(dfd){
			alert(123);
			dfd.hidden();
		};
		*/
		
		// 加载地图
		maplet = new BMap.Map("baimap");
    	maplet.centerAndZoom(new BMap.Point(110.320513,20.142977), 6);
    	maplet.enableScrollWheelZoom();
    	maplet.addControl(new BMap.NavigationControl());  
    	maplet.addControl(new BMap.ScaleControl()); 
    	maplet.addControl(new BMap.OverviewMapControl());              
    	maplet.addControl(new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
		
    	// 加载地图数据
		var obj = Ext.getCmp("map_view");
		this.connectServer(obj.loadMap, "mapAction.do?method=toSearch", "{'username':'水果','password':'a12345'}");
	},
	
	menu_jianjie : function() { 
		Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
		var main = Ext.getCmp('CompanyView');
		if(!main){
			main = Ext.create('Helcss.view.CompanyView');
		}		
		Ext.Viewport.setActiveItem(main);		
	} 

});