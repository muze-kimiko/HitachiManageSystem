Ext.define('MyTest.view.HomeView', {
    extend: 'Ext.Container',
    id: 'HomeView',
    requires: [
        'Ext.Toolbar',
        'Ext.Button'
    ],

    config: {
        id: 'MyTestHome',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Home'
            },
            {
                xtype: 'button',
                id: 'btn_AjaxGetData',
                margin: 10,
                text: 'AjaxGetData'
            },
            {
                xtype: 'button',
                id: 'btn_JsonPGetData',
                margin: 10,
                text: 'JsonPGetData'
            },
            {
                xtype: 'button',
                id: 'btn_Jump2App',
                margin: 10,
                text: 'Jump2App'
            },
            {
                xtype: 'button',
                id: 'btn_getPhoto',
                margin: 10,
                text: 'take a photo'
            },
            {
                xtype: 'button',
                id: 'btn_barcodescanner',
                margin: 10,
                text: 'Barcode Scanner'
            },
            {
                xtype: 'button',
                id: 'btn_jsontest',
                margin: 10,
                text: 'jsontest'
            },
            {
                xtype: 'button',
                id: 'btn_js2java',
                margin: 10,
                text: 'js2java'
            }
        ]
    }

});