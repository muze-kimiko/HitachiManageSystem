
/* JavaScript content from app/view/edoc/edoc_view.js in folder common */
Ext.define('HelcPDA.view.edoc.edoc_view', {
    extend: 'Ext.Container',
    id: 'edoc_view',
    requires: [
        'Ext.Toolbar',
        'Ext.Container',
        'Ext.XTemplate',
        'Ext.Button',
    ],

    config: {
    	layout:'vbox',
        items: [
                {
                    xtype: 'toolbar',
                    docked: 'top',
                    title: '新工程文件发布公告',
                    items: [
                            {
                            	xtype: 'button',
        				        ui: 'back',
        				        text: '主页',
        				        id: 'edocToMenus',
        			            align:'right',
                            },
                        ]
                },{
                    xtype: 'toolbar',
                    title: '<font color=red style=\"font-weight: bold;font-size: small;\">查阅以下工程文件请登录EDOC工程文件系统</font>',
                },{
                    xtype: 'list',
                    id: 'edoclist',
                    flex: 1,
                    store: 'EdocStore',
                    itemTpl: [
                        '<table width="98%" border="0" cellpadding="0" cellspacing="0">',
                        '  <tr>',
                        '    <td width="100%"><font style="font-size:10pt;color:#3d4245">{bianhao}</font></td>',
                        '  </tr>',
                        '  <tr>',
                        '    <td width="100%"><font style="font-size:10pt;color:#3d4245">{wenDangBiaoti}</font></td>',
                        '  </tr>',
                        '  <tr>',
                        '    <td width="100%"><font style="font-size:10pt;color:#3d4245">V{banben}</font></td>',
                        '  </tr>',
                        '  <tr>',
                        '    <td width="100%" style="text-align:right"><font style="font-size:10pt;color:#3d4245">{fabuRiqi}发布</font></td>',
                        '  </tr>',
                        '</table>'
                    ]
                }
            ]
    }

});