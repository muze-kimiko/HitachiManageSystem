
/* JavaScript content from app/view/report/HotLine/ReportHotLineCount.js in folder common */
//受信热线报表  2   xcx  2014-5-29

Ext.define('HelcPDA.view.report.HotLine.ReportHotLineCount', {
    extend: 'Ext.Panel',
    id:'report_hotline_sxrxCount',
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
                title: '受信热线报表',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        id:'hotline_sxrxCount_FHbutton',
                        text: '返回',
/*                        listeners:{
                        	tap:function(){
                        		var obj=Ext.getCmp('report_hotline_sxrxHomePage');
                        		if(!obj){
                        			obj=Ext.create('HelcPDA.view.report.HotLine.ReportHotLineHomePage');
                        		}
                        		Ext.Viewport.setActiveItem(obj);
                        	}
                        }*/
                    },
                    {
                    	id:'hiddenbutton',
                    	xtype:'hiddenfield',
                    	value:''
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
                        title: '<div id="sxrxLR"></div>',
                        id:'sxrxCount_COMPANY',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '受信宗数',
                                id:'sxrxCount_ONE',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '录入到达时间宗数',
                                id:'sxrxCount_TWO',
                                labelWidth: '65%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '录入到达时间比例',
                                id:'sxrxCount_THREE',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '按时录入到达宗数',
                                id:'pe_sxrxCount_THREE_am',
                                labelWidth: '65%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                            	xtype: 'textfield',
                            	label: '按时录入到达时间率',
                            	id:'pe_sxrxCount_THREE',
                            	labelWidth: '65%',
                            	value: [
                            	        ],
                            	        readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '录入完工时间宗数',
                                id:'sxrxCount_FOUR',
                                labelWidth: '65%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '录入完工时间宗数比例',
                                id:'sxrxCount_FIVE',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '按时录入完工宗数',
                                id:'pe_sxrxCount_FIVE_am',
                                labelWidth: '65%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '按时录入完工时间率',
                                id:'pe_sxrxCount_FIVE',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '困人宗数',
                                id:'sxrxCount_SIX',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '录入救人时间宗数',
                                id:'sxrxCount_SEVEN',
                                labelWidth: '65%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '录入救人时间宗数比例',
                                id:'sxrxCount_EIGHT',
                                labelWidth: '65%',
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                label: '按时救人时间宗数',
                                id:'pe_sxrxCount_EIGHT_am',
                                labelWidth: '65%',
                                hidden:true,
                                value: [
                                ],
                                readOnly: true
                            },
                            {
                            	xtype: 'textfield',
                            	label: '按时录入救人时间率',
                            	id:'pe_sxrxCount_EIGHT',
                            	labelWidth: '65%',
                            	value: [
                            	],
                            	readOnly: true
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        id:'search_sxrxstation_button',
                        baseCls: 'x-button helcmg_btn',
                        margin: 10,
                        text: '进入站统计情况'
                    }
                ]
            }
        ]
    }

});