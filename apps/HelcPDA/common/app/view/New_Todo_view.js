Ext.define('HelcPDA.view.New_Todo_view', {
    extend: 'Ext.Container',
    id: 'New_Todo_view_id',
    requires: [
        'Ext.Toolbar',
        'Ext.carousel.Carousel',
        'Ext.Panel',
        'Ext.dataview.DataView',
        'Ext.XTemplate'
    ],

    config: {
        items: [
	            {
	                xtype: 'container',
	                id: 'backlog_v',
	                title: '待办<span name=sumDB class="t_badge_title"></span>',
	                iconCls: 'backlog',
	                layout: 'vbox',
	                items: [
	                    {
	                        xtype: 'toolbar',
	                        docked: 'top',
	                        title: '待办',
	                        items: [
	                                {
	                                	xtype: 'button',
	            				        ui: 'back',
	            				        text: '主页',
	            				        id: 'backToMenus',
	            			            align:'right',
	                                },
	                            ]
	                    },
	                    {
	                        xtype: 'list',
	                        id: 'backlog_list',
	                        store: 'BacklogStore',
	                        height:800,
	                        itemTpl: [
	                            '<table width="94%" border="0" cellpadding="0" cellspacing="0">',
	                            '  <tr style="height:26px;">',
	                            '      <td style="width:28px;"><div class="t_badge_Icon" style="color:{color}">{icon}</div></td>',
	                            '      <td>{TASK_NAME}<font style="margin-left:10px;font-size:10pt;color:#3d4245">{PLAN_START_DT}</font></td>',
	                            '      <td style="width:20px;position:relative;"><span class="t_badge">{COUNT}</span></td>',
	                            '  </tr>',
	                            '</table>'
	                        ],
	                        onItemDisclosure: true
	                    }
	                ]
	            
	            }
        ]
    }

});