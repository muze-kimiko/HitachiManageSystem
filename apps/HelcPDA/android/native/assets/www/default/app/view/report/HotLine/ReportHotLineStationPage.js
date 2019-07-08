
/* JavaScript content from app/view/report/HotLine/ReportHotLineStationPage.js in folder common */
//故障报告书报表 1   xcx  2014-5-22

Ext.define('HelcPDA.view.report.HotLine.ReportHotLineStationPage', {
    extend: 'Ext.Panel',
    id:'report_hotline_sxrxStationPage',
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
                        id:'Rep_hotline_SXRXStation_FHbutton',
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
                store:'ReportHotLineStationStore',
                itemTpl: [
                    '<table border=0 width=100% style="color:#666">',
                    '  <tr>',
                    '    <td colspan="2" width=60% style="color:#000;">{STATION_NAME}</td>',
                    '  </tr>',
                    '  <tr>',
//                    '    <td width=50%>受信宗数：{FAULT_AMOUNT}</td>',
//                    '    <td width=50%>录入到达时间宗数：{ENTERED_ARRIVAL_AMOUNT}</td></tr>',
//                    '    <tr><td width=50%>录入到达时间比例：{ENTERED_ARRIVAL_RATE}</td>',
//                    '    <td width=50%>按时录入到达时间率：{PE_ARRIVAL_RATE}</td></tr>',
//                    '    <tr><td width=50%>录入完工时间宗数：{ENTERED_FINISHED_AMOUNT}</td>',
//                    '    <td width=50%>录入完工时间宗数比例：{ENTERED_FINISHED_RATE}</tr>',
//                    '    <tr><td width=50%>按时录入完工时间率：{PE_ENTERED_FINISHED_RATE}</td>',
//                    '    <td width=50%>困人宗数：{TIRING_AMOUNT}</td></tr>',
//                    '    <tr><td width=50%>录入救人时间宗数：{ENTERED_SAVING_AMOUNT}</td>',
//                    '    <td width=50%>录入救人时间宗数比例：{ENTERED_SAVING_RATE}</td></tr>',
//                    '    <tr><td width=50%>按时录入救人时间率：{PE_ENTERED_SAVING_RATE}</td>',
                    '    <td width=50%>受信宗数：{FAULT_AMOUNT}</td>',
                    '    <td width=50%>困人宗数：{TIRING_AMOUNT}</td>' +
                    '	</tr>',
                    '<tr>' +
                    '	<td width=50%>录入到达时间比例：{ENTERED_ARRIVAL_RATE}</td>',
                    '   <td width=50%>按时录入到达时间率：{PE_ARRIVAL_RATE}</td>' +
                    '	</tr>',
                    '<tr>' +
                    '	<td width=50%>录入完工时间宗数比例：{ENTERED_FINISHED_RATE}</td>',
                    '   <td width=50%>按时录入完工时间率：{PE_ENTERED_FINISHED_RATE}</td>' +
                    '	</tr>',
                    '<tr>' +
                    '	<td width=50%>录入救人时间宗数比例：{ENTERED_SAVING_RATE}</td>',
                    '   <td width=50%>按时录入救人时间率：{PE_ENTERED_SAVING_RATE}</td>' +
                    '	</tr>',
                    '</table>'
                ],
            }
        ]
    }

});