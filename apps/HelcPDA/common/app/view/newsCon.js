Ext.define('HelcPDA.view.newsCon', {
    extend: 'Ext.Panel',
    id: 'newsCon_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.Label'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        listeners:{
                          	tap:function(){
                          		objj.BackView();
                           	}
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                scrollable: true,
                flex: 1,
                padding: 10,
                items: [
                    {
                        xtype: 'label',
                        id: 'news_subject',
                        style: 'font-size:14pt;color:#9d4a02;text-align:center'
                    },
                    {
                        xtype: 'label',
                        id: 'news_doc',
                        margin: '15 0 0 0',
                        style: 'color:#666'
                    },
                ]
            }
        ]
    }

});