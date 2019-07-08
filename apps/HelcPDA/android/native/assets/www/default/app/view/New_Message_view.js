
/* JavaScript content from app/view/New_Message_view.js in folder common */
Ext.define('HelcPDA.view.New_Message_view', {
    extend: 'Ext.Container',
    id: 'New_Message_view_id',
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
	                id: 'M_XX',
	                title: '消息<span id="sumxx" class="t_badge_title"></span>',
	                iconCls: 'news',
	                layout: 'vbox',
	                height: '100%',
	                items: [
	                    {
	                        xtype: 'toolbar',
	                        docked: 'top',
	                        title: '消息',
	                        items: [
	                                {
	                                	xtype: 'button',
	            				        ui: 'back',
	            				        text: '主页',
	            				        id: 'backToMenus',
	            			            align:'right',
	                                },
	                            ]
	                    },{
	                        xtype: 'list',
	                        id: 'msglist',
	                        flex: 1,
	                        store: 'MessageStore',
	                        itemTpl: [
	                            '<table width="94%" border="0" cellpadding="0" cellspacing="0">',
	                            '  <tr>',
	                            '    <td width="10%"><span class="i_Button_List_Icon" style="color:{COLOR}">w</span></td>',
	                            '    <td width="40%"><font style="font-size:10pt;color:#3d4245">{MSGTITLE}</font></td>',
	                            '    <td width="50%" style="text-align:right"><font style="font-size:10pt;color:#3d4245">{TIME}</font></td>',
	                            '  </tr>',
	                            '</table>'
	                        ]
	                    }
	                ]
	            }
        ]
    }

});