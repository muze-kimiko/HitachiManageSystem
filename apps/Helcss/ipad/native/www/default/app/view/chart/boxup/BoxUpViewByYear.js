
/* JavaScript content from app/view/chart/boxup/BoxUpViewByYear.js in folder common */
Ext.define('Helcss.view.chart.boxup.BoxUpViewByYear', {
    extend: 'Ext.Panel',
    requires : ["Helcss.store.chart.boxup.BoxUpByYearChartStore",
                "Helcss.store.chart.boxup.BoxUpByYearDetailStore",
                "Helcss.store.chart.boxup.BoxUpByYearStore"],
    id : 'boxupbyyear_view',
    config: {
    	title : '<b style="font-size:18pt;">年度困人趋势</b>',
    	style: 'background-color:#efeff4;',
    	items : [{
			xtype : 'panel',
			id:'boxupbyyear_view_panel',
			height: 1000,
			//layout : 'vbox',
			style: 'background: #efeff4;height:100%;',
			padding: '10 10 0 10',
			items : [{
				xtype: 'panel',
				id:'but_y_QUAN',
				width: 160,
                height: 40,
                top: 0,
                right: 20,
                style: 'filter:alpha(opacity=80);opacity:0.6;',
                items: [
                    {
                        xtype: 'button',
                        id:'btn_bu_prevyear',
                        left: 0,
                        style: 'border:0px;',
                        width: 40,
                        iconCls: 'arrow_left',
                        text: ''
                    },
                    {
//                        xtype: 'label',
                    	xtype: 'button',
                    	id:'but_BUY',
                        html: '<span id="d_BUY" style="font-size:18px"></span>',
                        left: 30,
                        margin: '10 0 0 0',
                        width: 105,
                        baseCls:'x-label',
                        handler:function(){
                        	if(this.overlay!=null){
                        		this.overlay.destroy();
                        		this.overlay = null;
                        	}
                        	var optBUY = new Array();
                        	for(var i = -4;i<=0;i++){
                        		optBUY[i+4] = {text:(cdate.getFullYear()+i)+"年",value:(cdate.getFullYear()+i)};
                        	}
                        	this.overlay = Ext.Viewport.add({
             				   xtype:'formpanel',
             				   id:'ovl_BUY',
             				   modal:true,
             				   hideOnMaskTap:true,	
             				   showAnimation:{
             					   type:'popIn',
             					   duration:250,
             					   easing:'ease-out'
             				   },
             				   hideAnimation:{
             					   type:'popOut',
             					   duration:250,
             					   easing:'ease-out'
             				   },
//             				   centered:true,
//             				   width:Ext.filterPlatform('ie10')?'100%':(Ext.os.deviceType=='Phone')?260:400,
//             				   height:Ext.filterPlatform('ie10')?'30%':Ext.os.deviceType=='Phone'?220:400,
             				   width:160,
             				   height:130,
//             				   styleHtmlContent:true,
             				   items:[
									{
									    xtype: 'fieldset',
									    border:0,
									    margin: '7 7 auto 7',
									    items: [
									        {
									            xtype: 'selectfield',
									            id: 'o_BUY',
									            label: '年度',
									            labelWidth:'47%',
									            options:optBUY,
									            defaultTabletPickerConfig:{
									            	width:160,
									            }
									        },
									    ]
									},
									{
									    xtype: 'button',
									    id: 'c_BUY',
									    margin: '15 auto',
									    width: '50%',
									    text: '确定',
									}

             				   ],
             				   scrollable:false
             			   });
                        this.overlay.showBy(Ext.getCmp('but_BUY'),'tc-bc');
                        var self_o_BUY = Ext.getCmp('o_BUY');
                		self_o_BUY.setValue(BUY);
                        },
                    },
                    {
                        xtype: 'button',
                        id:'btn_bu_nextyear',
                        left: 115,
                        right: 0,
                        style: 'border:0px;',
                        width: 40,
                        iconCls: 'arrow_right',
                        text: ''
                    }
                ]
			},{
				style : 'height : 35%',
				id : 'boxupbyyear_chart',
		    	xtype : 'chart',
		    	background: "none",
	            store: 'BoxUpByYearChartStore',
	            animate: true,
	            // 菜单
	            interactions: ['panzoom','itemhighlight'],
	            /**/
	            listeners: { 
	                	   itemtap: function(series,item, e){
	                		   var boxupbyyear_de_Store = Ext.data.StoreManager.get("BoxUpByYearDetailStore"); 
                			   if (!boxupbyyear_de_Store) { 
                				   boxupbyyear_de_Store = Ext.create("Helcss.store.chart.boxup.BoxUpByYearDetailStore"); 
                			   }
                			   var olv_i = boxupbyyear_de_Store.getAt(item.index).get('i');
                			   var olv_wank_num = boxupbyyear_de_Store.getAt(item.index).get('WANK_NUM');
                			   var olv_cmf_box_num = boxupbyyear_de_Store.getAt(item.index).get('CMF_BOX_NUM');
                			   var olv_cmf_box_rate = boxupbyyear_de_Store.getAt(item.index).get('CMF_BOX_RATE');
//                			   WL.Logger.debug("wank_num:"+aa);
//	                		   if(!this.overlay){
                			   this.overlay = null;
                			   this.overlay = Ext.Viewport.add({
                				   xtype:'panel',
                				   modal:true,
                				   hideOnMaskTap:true,
                				   showAnimation:{
                					   type:'popIn',
                					   duration:250,
                					   easing:'ease-out'
                				   },
                				   hideAnimation:{
                					   type:'popOut',
                					   duration:250,
                					   easing:'ease-out'
                				   },
                				   centered:true,
//                				   width:Ext.filterPlatform('ie10')?'100%':(Ext.os.deviceType=='Phone')?260:400,
//                				   height:Ext.filterPlatform('ie10')?'30%':Ext.os.deviceType=='Phone'?220:400,
                				   width:180,
                				   height:160,
                				   styleHtmlContent:true,
                				   html:'<p>电梯台量：' + olv_wank_num + '<br>困人宗数：' + olv_cmf_box_num + '<br>困人率(‰)：' + olv_cmf_box_rate + '</p>',
                				   items:[
                				          {
                				        	  docked:'top',
                				        	  xtype:'toolbar',
                				        	  title:olv_i+'月困人合计'
                				          }
                				   ],
                				   scrollable:true
                			   });
//	                		   }
	                		   this.overlay.show();
	                   		}
                },
                
	            series: [
	 	                {
	 	                    type: 'line',
	 	                    xField: 'name',
	 	                    yField: 'value',
	 	                    title: '线性视图',
	 	                    style: {
	 	                        smooth: true,// 是否顺滑
	 	                        stroke: '#e5c89d',
	 	                        lineWidth: 4,
	 	                        shadowColor: 'rgba(0,0,0,0.7)',// 阴影样式
	 	                        shadowBlur: 0,
	 	                        shadowOffsetX: 0,
	 	                        shadowOffsetY: 0
	 	                    },
	 	                    highlightCfg: {
	 	                        scale: 2
	 	                    },
	 	                    marker: { // 每一个点的样式
	 	                        type: 'circle',
	 	                        stroke: '#c59752',
	 	                        fill: '#c59752',
	 	                        lineWidth: 1,
	 	                        radius: 3,
	 	                        shadowColor: 'rgba(0,0,0,0.7)',
	 	                        shadowBlur: 0,
	 	                        shadowOffsetX: 0,
	 	                        shadowOffsetY: 0,
	 	                        fx: {duration: 300}
	 	                    },
	 	                },
	 	           ],
	 	           axes: [
	 		                {// Y轴
	 		                    type: 'numeric',
	 		                    position: 'left',
	 		                    title : '宗数(单位：宗)',
	 		                    grid: {
	 		                        odd: {
	 		                            fill: '#fafafa'
	 		                        }
	 		                    },
	 		                   //visibleRange: [0, 0.8],
	 		                    /*maxZoom: 1,//最大收和缩
	 		                    minZoom: 1,*/
	 		                    majorTickSteps: 50,
	 		                    style: {
	 		                        axisLine: false,
//	 		                        estStepSize: 50,// Y每一格的区分
	 		                        stroke: '#ddd',
	 		                    },
	 		                   minimum: 0// 设定最大最小值，如果不设定就默认取加载数据的最大最小
	 		                    //maximum: 700
	 		                },
	 		                {// X轴
	 		                	type: 'category',
	 		                    title : '月份 (本年)',
	 		                    position: 'bottom',
	 		                    visibleRange: [0, 1], //可见区域占全部的百分比
	 		                    minimum: 0,
	 		                    style: {
	 		                        estStepSize: 50,
	 		                        stroke: '#999'
	 		                    }
	 		                }
	 		            ]
		    }
			,{
                xtype: 'panel',
                id:'boxupbyyear_detail_list_panel',
                margin: '0 0 0 0',
                padding: '0 0 0 0',
                style: 'float:center; width: 100%',
                height: 535,
                items: [
                    {
                    	id : 'boxupbyyear_list_tb_title',
                        xtype: 'titlebar',
                        docked: 'top',
                        margin: '0 0 0 0',
                        height: 40,
                        store : 'BoxUpByYearStore',
                        title: 'title',
                    },{
        		    	xtype : 'list',
        		    	height: 495,
        		    	id: 'boxupbyyear_detail_list',
        		    	onItemDisclosure: true,
                        style : 'width: 100%;',
        		    	store : 'BoxUpByYearDetailStore',
        		    	itemTpl : '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>'+
        		    			'<td width="10%" style="text-align:center">{i}月</td>'+
        		    			'<td width="30%" style="text-align:left">电梯台量：{WANK_NUM}</td>'+
        		    			'<td width="30%" style="text-align:left">困人宗数：{CMF_BOX_NUM}</td>'+
        		    			'<td width="30%" style="text-align:left">困人率(‰)：{CMF_BOX_RATE}</td>'+
        		    			'</tr></table>',
        				emptyText : '<div class="chat-list-empty-text">没有找到记录</div>',
        			}
                ]
            }]
		}]
    },
    
    initialize: function() {
    	if(PDsystem==1){
    		//页面
    		Ext.getCmp('boxupbyyear_view').setPadding('0 0 25 0');
    		Ext.getCmp('boxupbyyear_view_panel').setHeight(1100);
    		//线性图
    		Ext.getCmp('boxupbyyear_chart').setMargin('40px 0 0 0');
        	Ext.getCmp("boxupbyyear_chart").setWidth('95%');
        	Ext.getCmp("boxupbyyear_chart").setHeight(255);
        	//list
        	Ext.getCmp('boxupbyyear_detail_list_panel').setHeight(735);
        	Ext.getCmp('boxupbyyear_detail_list').setHeight(705);
        	
        	Ext.getCmp('boxupbyyear_list_tb_title').setStyle('font-size:9pt');
        	Ext.getCmp('boxupbyyear_detail_list').setStyle('width: 100%;font-size:9pt');
        	Ext.getCmp('boxupbyyear_detail_list').setScrollable(false);
        	var list='<table width="100%" height="40px" border="0" cellspacing="0" cellpadding="0"><tr>'+
			'<td width="10%" height="40px" style="text-align:center">{i}月</td>'+
			'<td width="30%" height="40px" style="text-align:left">电梯台量：{WANK_NUM}</td>'+
			'<td width="30%" height="40px" style="text-align:left">困人宗数：{CMF_BOX_NUM}</td>'+
			'<td width="30%" height="40px" style="text-align:left">困人率(‰)：{CMF_BOX_RATE}</td>'+
			'</tr></table>';
        	Ext.getCmp('boxupbyyear_detail_list').setItemTpl(list);
        	
        	//日期查询
        	Ext.getCmp('but_y_QUAN').setHeight(30);
        	Ext.getCmp('btn_bu_prevyear').setHeight(30);
        	Ext.getCmp('btn_bu_nextyear').setHeight(30);
        	Ext.getCmp('but_BUY').setMargin('5 0 0 0');
    	};
    }
    
});
