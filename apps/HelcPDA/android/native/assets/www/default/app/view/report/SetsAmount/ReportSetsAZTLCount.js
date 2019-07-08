
/* JavaScript content from app/view/report/SetsAmount/ReportSetsAZTLCount.js in folder common */
//安装台量报表 2   xcx  2014-5-23

Ext.define('HelcPDA.view.report.SetsAmount.ReportSetsAZTLCount', {
    extend: 'Ext.Panel',
    id:'falut_aztlCount',
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
                title: '安装台量报表',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        id:'falut_aztlCount_FHbutton',
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
                        title: '<div id="aztlLR"></div>',
                        id:'aztlCount_COMPANY',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '已发货未进场',
                                id:'aztlCount_ONE',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '当月已进场',
                                id:'aztlCount_TWO',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '当月已完工',
                                id:'aztlCount_THREE',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '安装中',
                                id:'aztlCount_FOUR',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '技检中',
                                id:'aztlCount_FIVE',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '调试中',
                                id:'aztlCount_SIX',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '完工资料准备',
                                id:'aztlCount_SEVEN',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '厂检中(无技监发证)',
                                id:'aztlCount_EIGHT',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '厂检中(有技监发证)',
                                id:'aztlCount_NINE',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '在制',
                                id:'aztlCount_TEN',
                                labelWidth: '65%',
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