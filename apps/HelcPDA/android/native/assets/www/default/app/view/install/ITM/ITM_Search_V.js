
/* JavaScript content from app/view/install/ITM/ITM_Search_V.js in folder common */
Ext.define('HelcPDA.view.install.ITM.ITM_Search_V', {
    extend: 'Ext.Panel',
    id:'ITM_search_vid',
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
                        id: 'back_to_ITM_List',
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
                                id:'itm_instpro_con_s',
                                label: '安装合同号',
                                labelWidth: '40%',
                                placeHolder: '请输入安装合同号'
                            },
                            {
                                xtype: 'textfield',
                                label: '工号',
                                id:'itm_instpro_eno_s',
                                labelWidth: '40%',
                                placeHolder: '请输入工号'
                            },
                            {
                                xtype: 'textfield',
                                label:'项目',
                                id:'itm_instpro_pro_s',
                                labelWidth: '40%',
                                placeHolder: '请输入项目'
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
                                        id:'ITM_searchdata_btn',
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