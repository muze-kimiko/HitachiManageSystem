
/* JavaScript content from app/view/UnLock/UnLockMain.js in folder common */
Ext.define('HelcPDA.view.UnLock.UnLockMain', {
    extend: 'Ext.tab.Panel',
	id: 'UnLockMain',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '解锁',
                items: [
                    {
                        xtype: 'button',
                        id: 'btn_bak_UnLock',
                        ui: 'back',
                        text: '返回'
                    }
                ]
            },
            {
                xtype: 'container',
                title: 'GHP用户解锁',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'formpanel',
                        height: 90,
                        items: [
                            {
                                xtype: 'fieldset',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id: 'st_UnLockUser',
                                        placeHolder: '用户名或工号'
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                id: 'btn_Search_UnLockUser',
                                margin: '5 10 5 10',
                                text: '查找'
                            }
                        ]
                    },
                    {
                        xtype: 'list',
                        flex: 1,
                        id: 'L_UnLockUser',
                        store: 'UnLockUserStore',
                        itemTpl: [
                            '<div>用户名： {username}</div><div>工号： {userid}</div>'
                        ],
                        onItemDisclosure: true
                    }
                ]
            },
            {
                xtype: 'container',
                title: 'GHP设备解锁',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'formpanel',
                        height: 90,
                        items: [
                            {
                                xtype: 'fieldset',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id: 'st_UnLockDev',
                                        placeHolder: '用户名，工号，手机号'
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                id: 'btn_Search_UnLockDev',
                                margin: '5 10 5 10',
                                text: '查找'
                            }
                        ]
                    },
                    {
                        xtype: 'list',
                        flex: 1,
                        id: 'L_UnLockDev',
                        store: 'UnLockDevStore',
                        itemTpl: [
                            '<div>用户名： {licname}</div><div>手机号： {phoneno}</div>'
                        ],
                        onItemDisclosure: true
                    }
                ]
            }
        ]
    }

});