Ext.define('HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_List_Search_View', {
    extend: 'Ext.Panel',
    id:'SNEL_Search_ID',
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
                        ui: 'back',
                        text: '返回',
                        handler : function(button, e) {
							Ext.Viewport
									.setActiveItem(Ext
											.getCmp('sending_no_entry_list_ID'));
						}
                    }
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                scrollable: false,
                height:120,
                items: [
                    {
                        xtype: 'fieldset',
                        margin: '0 auto',
                        items: [
                            {
                                xtype: 'textfield',
                                id:'snel_contract_number_search',
                                label: '安装合同号',
                                labelWidth: '40%',
                                placeHolder: '请输入安装合同号'
                            },
                            {
                                xtype: 'textfield',
                                label: '工号',
                                id:'snel_job_number_search',
                                labelWidth: '40%',
                                placeHolder: '请输入工号'
                            },
                            {
                                xtype: 'textfield',
                                label:'客户 ',
                                id:'snel_customer_search',
                                labelWidth: '40%',
                                placeHolder: '请输入客户'
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
                                        id:'SNEL_search_data_btn',
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