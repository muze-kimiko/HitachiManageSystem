//安装台量报表 1   xcx  2014-5-23

Ext.define('HelcPDA.view.report.SetsAmount.ReportSetsAZTLHomePage', {
    extend: 'Ext.Panel',
    id:'falut_aztlHomePage',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.Label',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '     安装台量报表',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        id:'Rep_fault_AZTLBB_FHbutton',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                  /*  {
                        xtype: 'button',
                        id:'Rep_fault_GZBG_SYbutton',
                        text: '上月'
                    }*/
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'label',
                        id:'rep_aztl_ZS',
                        margin: '0 0 0 20'
                    },
                    {
                        xtype: 'spacer'
                    },
                  /*  {
                        xtype: 'label',
                        id:'rep_gzbgHP_SCSJ',
                        margin: '0 20 0 0'
                    }*/
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'list',
                        data: [
                            {
                                title: 'Item 1'
                            }
                        ],
                        height: 63,
                        width: '100%',
                        id:'rep_SetsAZTLStoree',
                        store:'ReportSetsAZTLStore',
                        itemTpl: [
                            '<table border=0 width=100% style="color:#666">',
                            '  <tr>',
                            '    <td colspan="2" width=60% style="color:#000;">{HT_NAME}</td>',
                            '  </tr>',
                            '  <tr>',
                            '    <td width=60%>已发货未进场：{YIFAHUO_NOENTER}</td>',
                            '    <td width=40% style="padding-right:18px;text-align: left;">在制：{MAKE_ING}</td>',
                            '  </tr>',
                            '</table>'
                        ],
                        onItemDisclosure: true,
                        disableSelection: true,
                    }
                ]
            },
            {
                xtype: 'list',
               /* data: [
                    {
                        title: 'Item 1'
                    },
                    {
                        title: 'Item 2'
                    },
                    {
                        title: 'Item 3'
                    },
                    {
                        title: 'Item 1'
                    },
                    {
                        title: 'Item 2'
                    },
                    {
                        title: 'Item 3'
                    },
                    {
                        title: 'Item 1'
                    },
                    {
                        title: 'Item 2'
                    },
                    {
                        title: 'Item 3'
                    },
                    {
                        title: 'Item 1'
                    },
                    {
                        title: 'Item 2'
                    },
                    {
                        title: 'Item 3'
                    },
                    {
                        title: 'Item 4'
                    }
                ],*/
                height: '100%',
                id:'rep_SetsAZTLStoreTwo',
                store:'ReportSetsAZTLStoreTwo',
                itemTpl: [
                    '<table border=0 width=100% style="color:#666">',
                    '  <tr>',
                    '    <td colspan="2" width=60% style="color:#000;">{HT_NAME}</td>',
                    '  </tr>',
                    '  <tr>',
                    '    <td width=60%>已发货未进场：{YIFAHUO_NOENTER}</td>',
                    '    <td width=40% style="padding-right:18px;text-align: left;">在制：{MAKE_ING}</td>',
                    '  </tr>',
                    '</table>'
                ],
                onItemDisclosure: true
            }
        ]
    }

});