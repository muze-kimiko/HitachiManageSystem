
/* JavaScript content from app/view/more/Help.js in folder common */
Ext.define('HelcPDA.view.more.Help', {
	id: 'help_vid',
	extend: 'Ext.Panel',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.*',
        'Ext.Spacer',
        'Ext.field.Text',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.field.Search'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                id: 'help_toolbar',
                docked: 'top',
                title: '帮助',
                items: [
                    {
                        xtype: 'button',
                        id: 'backToMenus',
                        ui: 'back',
                        text: '主页'
                    },
                    {
                        xtype: 'spacer'
                    },
                ]
            },
            {
                xtype: 'container',
                id: 'chat_container',
                flex: 1,
                html: '<div id="chatcontainer" />',
                padding: '10 0 0 0',
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                }
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                title: '',
                items: [
                    {
                        xtype: 'textfield',
                        id: 'help_chat_text',
                        width: '80%',
                        label: ''
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'help_send_button',
                        width: '20%',
                        text: '发送'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }
        ]
    }

});