Ext.define('HelcPDA.view.ProductCertificate.Renovate_Project_Forward', {
    extend: 'Ext.Panel',
    id: 'Renovate_Project_Forward_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Select',
        'Ext.Label'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '转派',
                items: [
                    {
                        xtype: 'button',
//                        id: 'Renvate_p_back',
                        ui: 'back',
                        text: '返回',
                        listeners:{
                        	tap:function(){
                        		objj.getApplication().getController('ProductCertificate.Renovate_Project_List_Ctrl').Renvate_p_back();
                        	}
                        }
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'RP_Forward_commit',
                        text: '提交'
                    },
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                height: 600,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '   查询条件',
                        items: [
							{
							    xtype: 'panel',
							    layout: 'hbox',
							    items: [
							        {
							            xtype: 'textfield',
							            id:'RP_forward_search',
							            width: '85%',
							            placeHolder: '请输入人员编号或姓名',
							            labelWidth: '48%',
							            label: '查询',
							        },
							        {
							            xtype: 'button',
							            id: 'RP_search_btn',
							            height: 41,
							            style: 'border:0;',
							            width: '15%',
							            iconCls: 'search',
							        }
							    ]
							},
                        ]
                    },
                    {
                        xtype: 'label',
                        cls: 'm-label-prompt',
                        height: 66,
                        html: '操作提示：请输入人员编号或者人员姓名查询',
                        margin: '5 auto 0 auto',
                        width: '96%'
                    },
                    {
                        xtype: 'fieldset',
                        items: [
                            {
                                xtype: 'selectfield',
                                id: 'RP_persons',
                                label: '转派人员',
                                labelWidth: '40%',
                                placeHolder: '请选择',
                                options: [
                                ],
                            },
                        ]
                    }
                ]
            }
        ]
    }

});