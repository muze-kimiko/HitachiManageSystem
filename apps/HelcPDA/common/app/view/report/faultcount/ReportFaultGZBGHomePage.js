//故障报告书报表 1   xcx  2014-5-22

Ext.define('HelcPDA.view.report.faultcount.ReportFaultGZBGHomePage', {
    extend: 'Ext.Panel',
    id:'falut_gzbgHomePage',
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
                title: '     故障报告书报表',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        id:'Rep_fault_GZBG_FHbutton',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id:'Rep_fault_GZBG_SYbutton',
                        text: '上月'
                    }
                ]
            },
            {
            	id:'searchcompanyid',
            	xtype:'hiddenfield',
            	value:''
            },
            {
            	id:'SearchCountRegion',
            	xtype:'hiddenfield',
            	value:''
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                id:'falut_gzbgHomePageToolOne',
                items: [
                    {
                        xtype: 'label',
                        id:'rep_gzbgHP_BYSJ',
                        margin: '0 0 0 20'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'label',
                        id:'rep_gzbgHP_SCSJ',
                        margin: '0 20 0 0'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                id:'falut_gzbgHomePageToolTwo',
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
                        id:'rep_FaultGZBGStore',
                        store:'ReportFaultGZBGStore',
                        itemTpl: [
                            '<table border=0 width=100% style="color:#666">',
//                            '  <tr>',
//                            '    <td colspan="2" width=60% style="color:#000;">{COMPANY}</td>',
//                            '  </tr>',
                            '  <tr>',
                            '    <td width=50%  style="color:#000;">{COMPANY}</td>',
                            '    <td width=50% style="padding-right:18px;text-align: left;">应录入：{SENTERED_FAULT_REPORT}</td>',
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
                id:'rep_FaultGZBGStoreTwo',
                store:'ReportFaultGZBGStoreTwo',
                itemTpl: [
                    '<table border=0 width=100% style="color:#666">',
//                    '  <tr>',
//                    '    <td colspan="2" width=60% style="color:#000;"></td>',
//                    '  </tr>',
                    '  <tr>',
                    '    <td width=50%  style="color:#000;">{COMPANY}</td>',
                    '    <td width=50% style="padding-right:18px;text-align: left;">应录入：{SENTERED_FAULT_REPORT}</td>',
                    '  </tr>',
                    '</table>'
                ],
                onItemDisclosure: true
            }
        ]
    }

});