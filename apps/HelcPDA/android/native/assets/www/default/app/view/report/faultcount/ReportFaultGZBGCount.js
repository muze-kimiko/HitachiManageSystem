
/* JavaScript content from app/view/report/faultcount/ReportFaultGZBGCount.js in folder common */
//故障报告书报表 2   xcx  2014-5-22

Ext.define('HelcPDA.view.report.faultcount.ReportFaultGZBGCount', {
    extend: 'Ext.Panel',
    id:'falut_gzbgCount',
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
                title: '故障报告书报表',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        id:'falut_gzbgCount_FHbutton',
                        text: '返回'
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
                        title: '<div id="gzbgLR">录入</div>',
                        id:'gzbgCount_COMPANY',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '应录入故障报告书',
                                id:'gzbgCount_ONE',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '已录入故障报告书宗数',
                                id:'gzbgCount_TWO',
                                labelWidth: '65%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '已录入故障报告书率',
                                id:'gzbgCount_THREE',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '按时录入故障宗数',
                                id:'gzbgCount_PE_FAULT_REPORT',
                                labelWidth: '65%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                            	xtype: 'textfield',
                            	label: '按时录入故障报告书率',
                            	id:'gzbgCount_ONTIME_RATE',
                            	labelWidth: '65%',
                            	value: [
                            	        ],
                            	        readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '已审核故障单宗数',
                                id:'gzbgCount_FOUR',
                                labelWidth: '65%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '已审核故障单率',
                                id:'gzbgCount_FIVE',
                                labelWidth: '65%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        id:'search_gzbbstation_button',
                        baseCls: 'x-button helcmg_btn',
                        margin: 10,
                        text: '进入站统计情况'
                    }
                ]
            }
        ]
    }

});