
/* JavaScript content from app/view/New_Admin_view.js in folder common */
Ext.define('HelcPDA.view.New_Admin_view', {
    extend: 'Ext.Container',
    id: 'New_Admin_view_id',
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
//		    	   scrollable: {
//		    		    direction: 'vertical',
//		    		    directionLock: true
//		    		},
		    	   items:[
				       {
				    	   xtype: 'carousel',
				    	   id: 'news_carousel',
				    	   docked: 'top',
				    	   height: 80,
				    	   padding: 5,
				    	   items: [{}]
				       },
				       {
				    	   xtype: 'panel',
				    	   baseCls: 'x-panel home_seperator',
				    	   docked: 'top',
				    	   style: 'border-width:1px; border-color:#d7d7d7; border-style:solid none solid none; '
				       },
				       {
							xtype: 'panel',
//							scrollable: {
//				    		    direction: 'vertical',
//				    		    directionLock: true
//				    		},
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
				    	   style: 'border-width:1px; border-color:#d7d7d7; border-style:solid none solid none; '
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
				    	   id: 'new_admin_report_dataview',
				    	   data: [
				                    {
				                        text: '保养计划业绩',
				                        text_style: 'font-size:1em;color:#0',
				                        display_bar: 'display:none',
				                        display_more1: '',
				                        data: '',
				                        data_color: '',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
				                    {
				                        text: '计划编制率',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: 'green',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
				                    {
				                        text: '实绩累计录入率',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: 'green',
				                        display_more2: 'display:none',
				                        border: '1'
				                    },
//				                    {
//				                        text: '录入及时率',
//				                        text_style: 'font-size:0.9em;color:#666',
//				                        display_bar: '',
//				                        display_more1: 'display:none',
//				                        data: '',
//				                        data_color: 'red',
//				                        display_more2: 'display:none',
//				                        border: '1'
//				                    },
				                    {
				                        text: '故障处理过程反馈',
				                        text_style: 'font-size:1em;color:#0',
				                        display_bar: 'display:none',
				                        display_more1: '',
				                        data: '',
				                        data_color: '',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
				                    {
				                        text: '到场时间录入率',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: 'orange',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
//				                    {
//				                        text: '到场时间录入及时率',
//				                        text_style: 'font-size:0.9em;color:#666',
//				                        display_bar: '',
//				                        display_more1: 'display:none',
//				                        data: '',
//				                        data_color: 'green',
//				                        display_more2: 'display:none',
//				                        border: '0'
//				                    },
				                    {
				                        text: '救人时间录入率',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: 'green',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
//				                    {
//				                        text: '救人时间录入及时率',
//				                        text_style: 'font-size:0.9em;color:#666',
//				                        display_bar: '',
//				                        display_more1: 'display:none',
//				                        data: '',
//				                        data_color: 'green',
//				                        display_more2: 'display:none',
//				                        border: '0'
//				                    },
				                    {
				                        text: '完工时间录入率',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: 'red',
				                        display_more2: 'display:none',
				                        border: '1'
				                    },
//				                    {
//				                        text: '完工时间录入及时率',
//				                        text_style: 'font-size:0.9em;color:#666',
//				                        display_bar: '',
//				                        display_more1: 'display:none',
//				                        data: '',
//				                        data_color: 'red',
//				                        display_more2: 'display:none',
//				                        border: '1'
//				                    },
				                    {
				                        text: '故障报告书',
				                        text_style: 'font-size:1em;line-height:2em;color:#0',
				                        display_bar: 'display:none',
				                        display_more1: '',
				                        data: '',
				                        data_color: '',
				                        display_more2: 'display:none',
				                        border: '1'
				                    },
				                    {
				                        text: '故障报告录入率',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: 'green',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
//				                    {
//				                        text: '故障报告录入及时率',
//				                        text_style: 'font-size:0.9em;color:#666',
//				                        display_bar: '',
//				                        display_more1: 'display:none',
//				                        data: '',
//				                        data_color: 'green',
//				                        display_more2: '',
//				                        border: '0'
//				                    },
				                    {
				                        text: '故障报告书审核率',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: 'green',
				                        display_more2: 'display:none',
				                        border: '1'
				                    },
				                    {
				                        text: '安装数据统计',
				                        text_style: 'font-size:1em;line-height:2em;color:#0',
				                        display_bar: 'display:none',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: '',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
				                    {
				                        text: '完工台数(上月)',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: 'green',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
				                    {
				                        text: '进场台数',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: 'green',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
				                    {
				                        text: '在制台数',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: 'green',
				                        display_more2: 'display:none',
				                        border: '0'
				                    },
				                    {
				                        text: '已发货未进场',
				                        text_style: 'font-size:0.9em;color:#666',
				                        display_bar: '',
				                        display_more1: 'display:none',
				                        data: '',
				                        data_color: 'green',
				                        display_more2: 'display:none',
				                        border: '1'
				                    },
				                ],
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