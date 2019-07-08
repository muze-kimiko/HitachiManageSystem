
/* JavaScript content from app/view/map/MapView.js in folder common */
Ext.define('Helcss.view.map.MapView', {
	extend: 'Ext.Panel',
    id:'map_view',
    requires: ['Ext.Menu'],
    config: {
    	layout : 'vbox',
        items: [
            {
                xtype: 'toolbar',
                id:'map_view_toolbar',
                docked: 'top',
                title: '<b>地图</b>',
                flex : 1,
                items: [{
                	xtype: 'button',
                    text: '首页',
                    ui: 'back',
                    id : 'btn_map_back'
                },{
                	xtype: 'spacer'
                },{
                    xtype: 'button',
                    text: '选择工号',
                    id : 'btn_map_info'
                },{
                    xtype: 'button',
                    text: '人员列表',
                    id : 'btn_emplist',
                    itemId: 'EMPLIST',
                    hidden: true
                }]
            },{
            	xtype : 'panel',
            	id : 'mapbar1',
            	flex : 9,
            	html : '<div id="baimap" style="width:100%;height:860px;background:#ccc;border-bottom: #aaa solid 1px;"></div>'
            },{
            	xtype : 'image',
            	id : 'mapmask',
            	width : 400,
            	height: 30,
            	src: 'images/mask.png',
            	top: 829
            },{
            	xtype : 'container',
            	id : 'map_con',
            	layout: 'fit',
            	flex : 1,
            	//cls: 'ks-basic',
            	items : [{
            		xtype: 'dataview',
                    id: 'map_emp_list',
                    scrollable: 'horizontal',
                    store : 'MapAroundEmpStore',
                    itemTpl : '<b>{USERNAME}</b><br/><b>{DISTANCE}m</b>',
                    cls: 'dataview-horizontal',
                    style: "background: #eee",
                    selectedCls : 'seldataviewcss',
                    inline: {
                        wrap: false
                    }
            	}]
            }],
            
            listeners: [
                        {
                            fn: 'onJS1Tap',
                            event: 'tap',
                            delegate: '#EMPLIST'
                        }
             ]
     },
     
     onJS1Tap: function() {
     	Ext.Viewport.toggleMenu('right');
     },
     
     doSetHidden: function(hidden) {
         this.callParent(arguments); 
         if (hidden) {
             Ext.Viewport.removeMenu('right');
         } else {
             Ext.Viewport.setMenu(this.menuForSide('right'), {
                 side: 'right',
                 reveal: false
             });
         }
     }, 
     menuForSide: function(side) {
         var items = [{
             xtype: 'list',
             id: 'map_emp_list11',
             style: 'width:100%;height:100%;',
             store : 'MapAroundEmpStore',
             itemTpl : '<div>{USERNAME} ({DISTANCE}m)</div>'
         }
         ];

         var className = 'Ext.Menu'; 
         return Ext.create(className, {
             items: items
         });
     },
     
    
    initialize : function() {
    	if(PDsystem==1){
    		Ext.getCmp('map_view_toolbar').setStyle('font-size:12pt');
    	};
    	
    	var map_con = Ext.getCmp('map_con');
    	if (map_con) {
    		map_con.setHidden(true);    		
    	}
    },
    
    loadMap : function(result) {
    	var btn = Ext.getCmp('btn_emplist');
    	btn.setHidden(true);
    	var map_con = Ext.getCmp('map_con');
    	map_con.setHidden(true);
    	
    	
    	maplet = new BMap.Map("baimap");
    	
    	/**/
    	maplet.centerAndZoom(new BMap.Point(110.320513,20.142977), 6);
    	maplet.enableScrollWheelZoom();
    	
    	//添加默认缩放平移控件
    	maplet.addControl(new BMap.NavigationControl());  
    	
    	// 尺寸显示
    	maplet.addControl(new BMap.ScaleControl()); 
    	
    	//添加默认缩略地图控件
    	maplet.addControl(new BMap.OverviewMapControl());              
    	maplet.addControl(new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
    	
    	
		
		
    	// 创建标注 		//创建信息窗口
    	/*
		var marker1 = new BMap.Marker(new BMap.Point(113.29774,23.02136));  
		maplet.addOverlay(marker1);
		var infoWindow1 = new BMap.InfoWindow("<p style='font-size:14px;font-weight:bold;'>高智刚</p><p style='font-size:8px;'>手机：13944368521</><p style='font-size:8px;'>地址：广州市石北工业路大石镇 附近</p>");
		marker1.addEventListener("click", function(){this.openInfoWindow(infoWindow1);});
		
		var marker2 = new BMap.Marker(new BMap.Point(113.332935,23.138596));  
		maplet.addOverlay(marker2);
		var infoWindow2 = new BMap.InfoWindow("<p style='font-size:14px;font-weight:bold;'>陈俊棋</p><p style='font-size:8px;'>手机：13811246213</><p style='font-size:8px;'>地址：广州市正佳大街正佳广场 附近</p>");
		marker2.addEventListener("click", function(){this.openInfoWindow(infoWindow2);});
		
		var marker3 = new BMap.Marker(new BMap.Point(113.361578,23.121021));  
		maplet.addOverlay(marker3);
		var infoWindow3 = new BMap.InfoWindow("<p style='font-size:14px;font-weight:bold;'>李林森</p><p style='font-size:8px;'>手机：13603036559</><p style='font-size:8px;'>地址：广州市恰景南三街 附近</p>");
		marker3.addEventListener("click", function(){this.openInfoWindow(infoWindow3);});
		
		
		var ele_mark = new BMap.Marker(new BMap.Point(113.366881,23.107235));  
		maplet.addOverlay(ele_mark);
		var ele_infoWindow = new BMap.InfoWindow("<p style='font-size:14px;font-weight:bold;'>13G045611</p><p style='font-size:8px;'>地址：琶洲国际会展中心</p>");
		ele_mark.addEventListener("click", function(){this.openInfoWindow(ele_infoWindow);});
		var myIcon=new BMap.Icon("images/pin_green.png",new BMap.Size(22,36)); // 更换为自定义图片
		ele_mark.setIcon(myIcon);
		ele_mark.openInfoWindow(ele_infoWindow); //打开信息窗
		*/
    }
    
});
