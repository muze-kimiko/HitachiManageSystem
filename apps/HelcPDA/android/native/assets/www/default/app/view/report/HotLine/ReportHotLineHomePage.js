
/* JavaScript content from app/view/report/HotLine/ReportHotLineHomePage.js in folder common */
//受信热线报表 1   xcx  2014-5-29

Ext.define('HelcPDA.view.report.HotLine.ReportHotLineHomePage', {
    extend: 'Ext.Panel',
    id:'report_hotline_sxrxHomePage',
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
                title: '     受信热线报表',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        id:'Rep_hotline_SXRX_FHbutton',
                        text: '返回',
                    },
                    {
                    	id:'searchhotlinecompanyid',
                    	xtype:'hiddenfield',
                    	value:''
                    },
                    {
                    	id:'SearchhotlineCountRegion',
                    	xtype:'hiddenfield',
                    	value:''
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id:'Rep_hotline_SXRX_SYbutton',
                        text: '上月'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                id:'report_hotline_sxrxHomePageToolOne',
                items: [
                    {
                        xtype: 'label',
                        id:'rep_sxrx_ZG',
                        margin: '0 0 0 20'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'label',
                        id:'rep_sxrx_time',
                        margin: '0 20 0 0'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                id:'report_hotline_sxrxHomePageToolTwo',
                items: [
                    {
                        xtype: 'list',
                        data: [
                            {
                                title: 'Item 1'
                            }
                        ],
                        height: 70,
                        width: '100%',
                        id:'rep_HotLineSXRXStoree',
                        store:'ReportHotLineStore',
                        itemTpl: [
                            '<table border=0 width=100% style="color:#666">',
                            '  <tr>',
                            '    <td colspan="2" width=60% style="color:#000;">{COMPANY_NAME}</td>',
                            '  </tr>',
                            '  <tr>',
                            '    <td width=50%>受信宗数：{sumfault}</td>',
                            '    <td width=50% style="padding-right:18px;text-align: left;">困人宗数：{sumtiring}</td>',
                            '  </tr>',
                            '</table>'
                        ],
                        disableSelection: true,
                       /* onItemDisclosure: true*/
                    }
                ]
            },
            {
                xtype: 'list',
                height: '100%',
                id:'rep_HotLineSXRXStoreTwo',
                store:'ReportHotLineStoreTwo',
                itemTpl: [
                    '<table border=0 width=100% style="color:#666">',
                    '  <tr>',
                    '    <td colspan="2" width=60% style="color:#000;">{COMPANY_NAME}</td>',
                    '  </tr>',
                    '  <tr>',
                    '    <td width=50%>受信宗数：{sumfault}</td>',
                    '    <td width=50% style="padding-right:18px;text-align: left;">困人宗数：{sumtiring}</td>',
                    '  </tr>',
                    '</table>'
                ],
                onItemDisclosure: true
            }
        ]
    }

});