
/* JavaScript content from app/view/kytest/kysearch.js in folder common */
Ext.define('HelcPDA.view.kytest.kysearch', {
    extend: 'Ext.Panel',
    id:'kysearch',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.Spacer'
    ],

    config: {
        margin: '0 auto',
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '按条件查询',
                items: [
                    {
                        xtype: 'button',
                        id: 'kysearchback',
                        ui: 'back',
                        text: '返回',
                    }
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                scrollable: false,
                items: [
                    {
                        xtype: 'fieldset',
                        margin: '0 auto',
                        items: [
                            {
                                xtype: 'textfield',
                                id:'kysearch_cyz',
                                label: '参与者',
                               // labelWidth: '40%',
                                placeHolder: '请输入名字'
                            },
                            {
                                xtype: 'selectfield',
                                label: '年份:',
                                id:'kysearch_nf',
                                options:[]
                             	   
                            },
                            {
                                xtype: 'selectfield',
                                label: '月份:',
                                id:'kysearch_yf',
                                options:[]
                             	   
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    align: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'spacer'
                                    },
                                    {
                                        xtype: 'button',
                                        margin: '15 0',
                                        width: '90%',
                                        id:'kysearch_s',
                                        text: '查询'
                                    },
                                    {
                                        xtype: 'spacer'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

});