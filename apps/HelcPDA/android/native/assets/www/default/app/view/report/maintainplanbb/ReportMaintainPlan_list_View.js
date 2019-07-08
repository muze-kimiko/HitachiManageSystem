
/* JavaScript content from app/view/report/maintainplanbb/ReportMaintainPlan_list_View.js in folder common */
//保养计划bb

Ext.define('HelcPDA.view.report.maintainplanbb.ReportMaintainPlan_list_View', {
    extend: 'Ext.Panel',
    id:'reportMaintainPlan_list_View',
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
                title: '保养计划报表',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        id:'maintainbb_back',
                        text: '返回',
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button', 
                        id:'preveMonth',
                        text: '上月'
                    },
                    {
                        xtype: 'button',
                        id:'nowMonth',
                        hidden:true,
                        text: '本月'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                id:'reportMaintainPlan_list_ViewToolOne',
                layout:{
                        type:'vbox'
                },
                items: [
                    {
                        xtype: 'label',
                        id:'Crea_Mesg',
                        margin: '0 0 0 20'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'label',
                        id:'Crea_datatime',
                        hidden:true,
                        margin: '0 20 0 0'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                id:'reportMaintainPlan_list_ViewToolTwo',
                items: [
                    {
                        xtype: 'list',
                        data: [
                        ],
                        height: 60,
                        draggable:false,
                        width: '100%',
                        id:'ReportPlan_list1',
                        store:'ReportMaintainPlanStore',
                        deselectOnContainerClick:true,
                        selectedCls:'',
                        itemTpl: [
                            '<table border=0 width=100% style="color:#666">',
                            '  <tr>',
                            '    <td colspan="2" width=60% style="color:#000;">{COMPANY}</td>',
                            '  </tr>',
                            '  <tr>',
                            '    <td width=50%>应编制计划:{ELV_AMOUNT}</td>',
//                            '    <td width=50% style="padding-right:5px;text-align: right;">已录入实绩:{ENTERED_AP}</td>',
//                            '    <td width=50% style="padding-right:5px;text-align: right;">已编制保养计划率:{TOTAL_RATE}</td>',
                            '  </tr>',
                            '</table>'
                        ],
                        onItemDisclosure: true
                    }
                ]
            },
            {
                xtype: 'list',
                height: '100%',
                id:'ReportPlan_list2',
                store:'ReportMaintainPlanStore1',
                selectedCls:'',
                deselectOnContainerClick:true,
                itemTpl: [
                    '<table border=0 width=100% style="color:#666">',
                    '  <tr>',
                    '    <td colspan="2" width=60% style="color:#000;">{COMPANY}</td>',
                    '  </tr>',
                    '  <tr>',
                    '    <td width=50%>应编制计划:{ELV_AMOUNT}</td>',
//                    '    <td width=50% style="padding-right:5px;text-align: right;">已录入实绩:{ENTERED_AP}</td>',
                    '    <td width=50% style="padding-right:5px;text-align: right;">已编制保养计划率:{TOTAL_RATE}</td>',
                    '  </tr>',
                    '</table>'
                ],
                onItemDisclosure: true
            }
        ]
    }

});