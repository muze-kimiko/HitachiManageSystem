Ext.define('Helcss.view.chart.fault.SRFaultViewByYear', {
    extend: 'Ext.Panel',
    requires : ["Helcss.store.chart.fault.SRFaultByYearChartStore",
                "Helcss.store.chart.fault.SRFaultByYearDetailStore",
                "Helcss.store.chart.fault.SRFaultByYearStore"],
    id : 'srfaultbyyear_view',
    config: {
    	title : '<b style="font-size:18pt;">年度受信趋势</b>',
    	style: 'background-color:#efeff4;',
    	items : [{
			xtype : 'panel',
			height: 1000,
			id:'srfaultbyyear_view_panel',
			//layout : 'vbox',
			style: 'background: #efeff4;height:100%;',
			padding: '10 10 0 10',
			items : [{
				xtype: 'panel',
				id:'btn_sr_QUAN',
				width: 160,
                height: 40,
                top: 0,
                right: 20,
                style: 'filter:alpha(opacity=80);opacity:0.6;',
                items: [
                    {
                        xtype: 'button',
                        id:'btn_sr_prevyear',
                        left: 0,
                        style: 'border:0px;',
                        width: 40,
                        iconCls: 'arrow_left',
                        text: ''
                    },
                    {
//                        xtype: 'label',
                    	xtype : 'button',
                    	id:'but_SRY',
                        html: '<span id="d_SRY" style="font-size:18px"></span>',
                        left: 30,
                        margin: '10 0 0 0',
                        width: 105,
                        baseCls:'x-label',
                        handler:function(){
                        	if(this.overlay!=null){
                        		this.overlay.destroy();
                        		this.overlay = null;
                        	}
                        	var optSRY = new Array();
                        	for(var i = -4;i<=0;i++){
                        		optSRY[i+4] = {text:(cdate.getFullYear()+i)+"年",value:(cdate.getFullYear()+i)};
                        	}
                        	this.overlay = Ext.Viewport.add({
             				   xtype:'formpanel',
             				   id:'ovl_SRY',
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
									            id: 'o_SRY',
									            label: '年度',
									            labelWidth:'47%',
									            options:optSRY,
									            defaultTabletPickerConfig:{
									            	width:160,
									            }
									        },
									    ]
									},
									{
									    xtype: 'button',
									    id: 'c_SRY',
									    margin: '15 auto',
									    width: '50%',
									    text: '确定',
									}

             				   ],
             				   scrollable:false
             			   });
                        this.overlay.showBy(Ext.getCmp('but_SRY'),'tc-bc');
                        var self_o_SRY = Ext.getCmp('o_SRY');
                		self_o_SRY.setValue(SRY);
                        },
                    },
                    {
                        xtype: 'button',
                        id:'btn_sr_nextyear',
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
				id : 'srfaultbyyear_chart',
		    	xtype : 'chart',
		    	background: "none",
	            store: 'SRFaultByYearChartStore',
	            animate: true,
	            // 菜单
	            interactions: ['panzoom','itemhighlight'],
	            /**/
	            listeners: { 
	                	   itemtap: function(series,item, e){
	                		   var srfaultbyyear_de_Store = Ext.data.StoreManager.get("SRFaultByYearDetailStore"); 
                			   if (!srfaultbyyear_de_Store) { 
                				   srfaultbyyear_de_Store = Ext.create("Helcss.store.chart.fault.SRFaultByYearDetailStore"); 
                			   }
                			   var olv_i = srfaultbyyear_de_Store.getAt(item.index).get('i');
                			   var olv_wank_num = srfaultbyyear_de_Store.getAt(item.index).get('WANK_NUM');
                			   var olv_cmf_num = srfaultbyyear_de_Store.getAt(item.index).get('CMF_NUM');
                			   var olv_cmf_rate = srfaultbyyear_de_Store.getAt(item.index).get('CMF_RATE');
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
                				   html:'<p>电梯台量：' + olv_wank_num + '<br>受信宗数：' + olv_cmf_num + '<br>出动率(%)：' + olv_cmf_rate + '</p>',
                				   items:[
                				          {
                				        	  docked:'top',
                				        	  xtype:'toolbar',
                				        	  title:olv_i+'月受信合计'
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
                margin: '0 0 0 0',
                padding: '0 0 0 0',
                style: 'float:center; width: 100%',
                id:'srfaultbyyear_detail_panel',
                height: 535,
                items: [
                    {
                    	id : 'srfaultbyyear_list_tb_title',
                        xtype: 'titlebar',
                        docked: 'top',
                        margin: '0 0 0 0',
                        height: 40,
                        store : 'SRFaultByYearStore',
                        title: 'title',
                    },{
        		    	xtype : 'list',
        		    	height: 495,
        		    	id: 'srfaultbyyear_detail_list',
        		    	onItemDisclosure: true,
                        style : 'width: 100%;',
        		    	store : 'SRFaultByYearDetailStore',
        		    	itemTpl : '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>'+
        		    			'<td width="10%" style="text-align:center;line-height:15px;">{i}月</td>'+
        		    			'<td width="30%" style="text-align:left">电梯台量：{WANK_NUM}</td>'+
        		    			'<td width="30%" style="text-align:left">受信宗数：{CMF_NUM}</td>'+
        		    			'<td width="30%" style="text-align:left">出动率(%)：{CMF_RATE}</td>'+
        		    			'</tr></table>',
        				emptyText : '<div class="chat-list-empty-text">没有找到记录</div>'
        			}
                ]
            }]
		}]
    },
    
    initialize: function() {
    	if(PDsystem==1){
    		//页面
    		Ext.getCmp('srfaultbyyear_view').setPadding('0 0 35 0');
        	//线性图
    		Ext.getCmp('srfaultbyyear_chart').setMargin('40px 0 0 0');
        	Ext.getCmp("srfaultbyyear_chart").setWidth('95%');
        	Ext.getCmp("srfaultbyyear_chart").setHeight(255);
        	//title
        	Ext.getCmp('srfaultbyyear_list_tb_title').setStyle('font-size:9pt');
        	//list
        	Ext.getCmp('srfaultbyyear_detail_list').setStyle('width: 100%;font-size:9pt');
        	
        	var listTpl='<table width="100%" height="40px" border="0" cellspacing="0" cellpadding="0"><tr>'+
			'<td width="10%" height="40px" style="text-align:center;line-height:15px;">{i}月</td>'+
			'<td width="30%" height="40px" style="text-align:left">电梯台量：{WANK_NUM}</td>'+
			'<td width="30%" height="40px" style="text-align:left">受信宗数：{CMF_NUM}</td>'+
			'<td width="30%" height="40px" style="text-align:left">出动率(%)：{CMF_RATE}</td>'+
			'</tr></table>';
        	Ext.getCmp('srfaultbyyear_detail_list').setItemTpl(listTpl);
        	Ext.getCmp('srfaultbyyear_detail_list').setScrollable(false);
        	Ext.getCmp("srfaultbyyear_detail_list").setHeight(680);
        	Ext.getCmp("srfaultbyyear_detail_panel").setHeight(735);
        	Ext.getCmp("srfaultbyyear_view_panel").setHeight(1100);
        	
        	
        	//日期查询
        	Ext.getCmp('btn_sr_QUAN').setHeight(30);
        	Ext.getCmp('btn_sr_prevyear').setHeight(30);
        	Ext.getCmp('btn_sr_nextyear').setHeight(30);
        	Ext.getCmp('but_SRY').setMargin('5 0 0 0');
    	};
    }
    
});
