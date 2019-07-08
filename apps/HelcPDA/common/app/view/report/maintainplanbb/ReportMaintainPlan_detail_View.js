//保养计划bb

Ext.define('HelcPDA.view.report.maintainplanbb.ReportMaintainPlan_detail_View', {
    extend: 'Ext.Panel',
    id:'reportMaintainPlan_detail_View',
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
                        id:'maintainbb_back',
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
                        title:'<p id="title_Name" style="text-align:center;"></p>',
                        id:'',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '应编制计划',
                                id:'ELV_AMOUNT',
                                labelWidth: '60%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '已编制计划',
                                id:'PLAINTED_PLAN',
                                labelWidth: '60%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '已编制保养计划率',
                                id:'TOTAL_RATE',
                                labelWidth: '60%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '已录入实绩',
                                id:'ENTERED_AP',
                                labelWidth: '60%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '录入实绩率',
                                id:'LuR_RATE',
                                labelWidth: '60%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '按时录入实绩',
                                id:'PUNCTUAL_AP',
                                labelWidth: '60%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '按时录入实绩率',
                                id:'ANS_RATE',
                                labelWidth: '60%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'hiddenfield',
                                id:'rp_company_id',
                            }
                        ]
                    },{
                        xtype: 'button',
                        id:'toStation_btn',
                        baseCls: 'x-button helcmg_btn',
                        margin: 10,
                        text: '进入站统计情况'
                    }
                ]
            }
        ]
    }

});