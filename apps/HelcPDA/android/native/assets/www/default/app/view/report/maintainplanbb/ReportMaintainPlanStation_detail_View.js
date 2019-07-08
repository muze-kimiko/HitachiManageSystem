
/* JavaScript content from app/view/report/maintainplanbb/ReportMaintainPlanStation_detail_View.js in folder common */
//保养计划站的详细数据
Ext.define('HelcPDA.view.report.maintainplanbb.ReportMaintainPlanStation_detail_View', {
    extend: 'Ext.Panel',
    id:'reportMaintainPlanStation_detail_View',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
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
                        id:'maintainbbsta_back',
                        text: '返回',
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                xtype: 'formpanel',
                height: '100%',
                items: [
                    {
                        xtype: 'fieldset',
                        title:'<p id="sta_title_Name" style="text-align:center;"></p>',
                        id:'',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '应编制计划',
                                id:'STA_ELV_AMOUNT',
                                labelWidth: '60%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '已编制计划',
                                id:'STA_PLAINTED_PLAN',
                                labelWidth: '60%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '已编制保养计划率',
                                id:'STA_TOTAL_RATE',
                                labelWidth: '60%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '已录入实绩',
                                id:'STA_ENTERED_AP',
                                labelWidth: '60%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '录入实绩率',
                                id:'STA_LuR_RATE',
                                labelWidth: '60%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '按时录入实绩',
                                id:'STA_PUNCTUAL_AP',
                                labelWidth: '60%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '按时录入实绩率',
                                id:'STA_ANS_RATE',
                                labelWidth: '60%',
                                value: [
                                ],
                                readOnly: true
                            }
                        ]
                    }
                ]
            }
        ]
    }

});