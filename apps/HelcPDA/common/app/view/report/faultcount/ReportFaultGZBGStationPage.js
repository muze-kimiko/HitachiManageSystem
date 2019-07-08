//故障报告书报表 1   xcx  2014-5-22

Ext.define('HelcPDA.view.report.faultcount.ReportFaultGZBGStationPage', {
    extend: 'Ext.Panel',
    id:'falut_gzbgStationPage',
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
                        id:'Rep_fault_GZBGStation_FHbutton',
                        text: '返回'
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
                store:'ReportFaultGZBGStoreStation',
                itemTpl: [
                    '<table border=0 width=100% style="color:#666">',
                    '  <tr>',
                    '    <td width=50% style="color:#000;">{STATION_NAME}</td>',
                    '    <td width=50%>应录入故障报告书：{SENTERED_FAULT_REPORT}</td></tr>',
                    '  <tr>',
                    '    <td width=50%>已录入故障报告书率：{ENTERED_FAULT_REPORT_RATE}</td>',
                    '    <td width=50%>按时录入故障报告书率：{PE_FAULT_REPORT_RATE}</td></tr>',
//                    '  <tr>' +
//                    '	 <td width=50%>已录入故障报告书率：{ENTERED_FAULT_REPORT_RATE}</td>',
//                    '    <td width=50%>已审核故障单宗数：{PASSED_FAULT_AMOUNT}</td></tr>',
//                    '  <tr>' +
//                    '	 <td width=50%>已审核故障单率：{PASSED_FAULT_RATE}</td></tr>',
                    '</table>'
                ],
            }
        ]
    }

});