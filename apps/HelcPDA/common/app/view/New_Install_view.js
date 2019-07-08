Ext.define('HelcPDA.view.New_Install_view', {
    extend: 'Ext.Container',
    id: 'New_Install_view_id',
    requires: [
        'Ext.Toolbar',
        'Ext.carousel.Carousel',
        'Ext.Panel',
        'Ext.dataview.DataView',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        scrollable: 'vertical',
        height:'100%',
        items: [
		       {
		    	   xtype: 'toolbar',
		    	   docked: 'top',
		    	   title: '<b>日立电梯移动办公</b>'
		       },
		       {
		    	   xtype:'panel',
		    	   id: 'new_view_panel',
		    	   items:[
				       {
				    	   xtype: 'carousel',
				    	   id: 'news_carousel',
				    	   docked: 'top',
				    	   height: 80,
				    	   padding: 5,
				    	   items: [
				    	           {
				    	        	   xtype: 'panel',
				    	        	   html: '<div></div><div class="news_content"></div>',
				    	        	   width: '98%'
				    	           },
				    	           ]
				       },
				       {
				    	   xtype: 'panel',
				    	   baseCls: 'x-panel home_seperator',
				    	   docked: 'top',
				    	   style: 'border-width:1px; border-color:#d7d7d7; border-style:solid none solid none; '
				       },
				       {
							xtype: 'panel',
							height:70,
							layout: 'hbox',
							docked: 'top',
							items:[
							       {
							    	   xtype: 'panel',
							    	   docked: 'left',
							    	   height: 70,
							    	   width: 12,
							    	   items:[
							    	          {
							    	        	xtype: 'image',
							    	        	id: 'modules_left',
							    	        	height: 70,
							    	        	src: 'images/442.png'
							    	          }
					    	          ]
							       },
								   {
									   xtype: 'dataview',
									   id: 'modules_dataview_id',
									   cls: [
									       'shortcut_button',
									       'dataview_horizontal'
									   ],
									   height: 70,
									   width:'100%',
//									   scrollable: 'horizontal',
									   scrollable: {
										    direction: 'horizontal',
										    directionLock: true
										},
									   inline: {
									       wrap: false
									   },
									   itemTpl: [
									       '<div class="shortcut_data" style="display:{data}">{data}</div>',
									       '<div class="shortcut_icon" style="background: {color}">{icon}</div>',
									       '<div class="shortcut_text">{text}</div>',
									   ]
								   },
								   {
							    	   xtype: 'panel',
							    	   docked: 'right',
							    	   height: 70,
							    	   width: 12,
							    	   items:[
							    	          {
							    	        	xtype: 'image',
							    	        	id: 'modules_right',
							    	        	height: 70,
							    	        	src: 'images/452.png'
							    	          }
					    	          ]
							       },
								   
							]
						    
						},
				       {
				    	   xtype: 'panel',
				    	   baseCls: 'x-panel home_seperator',
				    	   docked: 'top',
				    	   height: 24,
				    	   html: '待办任务',
				    	   style: 'border-width:1px; border-color:#d7d7d7; border-style:solid none none none; '
				       },
				       {
				    	   xtype: 'dataview',
				    	   id: 'new_Todo_dataview',
				    	   cls: 'todo2',
				    	   docked: 'top',
				    	   height: 63,
				    	   scrollable: false,
				    	   inline: 'wrap: false',
				    	   itemTpl: [
				    	             '<div class="todo2_icon" style="color:{color}">',
				    	             '    {icon}',
				    	             '</div>',
				    	             '',
				    	             '<div>',
				    	             '    <div class="todo2_text">{text}</div>',
				    	             '    <div class="todo2_data">未完成:<b>{data}</b>项</div>',
				    	             '</div>',
				    	             ''
				    	             ]
				       },
				       {
				    	   xtype: 'panel',
				    	   baseCls: 'x-panel home_seperator',
				    	   docked: 'top',
				    	   height: 24,
				    	   html: '统计数据',
				    	   style: 'border-width:1px; border-color:#d7d7d7; border-style:none none none none; '
				       },
				       {
						    xtype: 'dataview',
						    scrollable: false,
						    height:'100%',
						    height: 500,
						    id: 'report_shadow',
						    data: [
				                    {
				                        
				                    }],
		                     itemTpl: [
						              '<div style="font-size:0.8em;color:#666;margin:0.2em 0 0 0.2em;">正在加载报表...</div>'
						     ]
						},
				       {
				    	   xtype: 'dataview',
				    	   scrollable: false,
				    	   height:'100%',
				    	   id: 'new_install_report_dataview',
//				    	   flex: 1,
//			                data: [
//			                    {
//			                        text: '到达录入',
//			                        text_style: 'font-size:1em;color:#0',
//			                        display_bar: 'display:none',
//			                        display_more1: 'display:none',
//			                        data: '',
//			                        data_color: '',
//			                        display_more2: 'display:none',
//			                        border: '0'
//			                    },
//			                    {
//			                        text: '到达录入(台数)',
//			                        text_style: 'font-size:0.9em;color:#666',
//			                        display_bar: '',
//			                        display_more1: 'display:none',
//			                        data: '30',
//			                        data_color: 'green',
//			                        display_more2: 'display:none',
//			                        border: '1'
//			                    },
//			                    {
//			                        text: '完成录入',
//			                        text_style: 'font-size:1em;color:#0',
//			                        display_bar: 'display:none',
//			                        display_more1: 'display:none',
//			                        data: '',
//			                        data_color: '',
//			                        display_more2: 'display:none',
//			                        border: '0'
//			                    },
//			                    {
//			                        text: '完成录入(台数)',
//			                        text_style: 'font-size:0.9em;color:#666',
//			                        display_bar: '',
//			                        display_more1: 'display:none',
//			                        data: '',
//			                        data_color: 'orange',
//			                        display_more2: 'display:none',
//			                        border: '0'
//			                    }
//			                ],
			                itemTpl: [
			                    '<div class="home_graph" style="border-bottom-width:{border}px">',
			                    '    <div class="home_graph_text" style="{text_style};">{text}</div>',
			                    '    <div class="home_graph_bar"  style="{display_bar}">',
			                    '        <div style="background:{data_color};width:{data};max-width:100%">{data}</div>',
			                    '    </div>',
			                    '    <div id="more" class="home_graph_more1" style="{display_more1};">更多</div>',
			                    '    <div class="home_graph_more2" style="{display_more2};">!</div>',
			                    '</div>'
			                ]
				       }
				       ]
			}
        ]
    }

});