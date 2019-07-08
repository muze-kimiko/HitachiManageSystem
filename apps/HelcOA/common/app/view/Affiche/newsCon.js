Ext.define('HelcOA.view.Affiche.newsCon', {
    extend: 'Ext.Panel',
    id: 'NewsCom_id',
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
                          		var obj1=Ext.getCmp('News_id');
                           		if(!obj1){
                           			obj1=Ext.create('HelcOA.view.Affiche.news');
                           		}
                           		Ext.Viewport.setActiveItem(obj1);
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
                        id: 'new_subject',
                        style: 'font-size:14pt;color:#9d4a02;text-align:center'
                    },
                    {
                        xtype: 'label',
                        id: 'new_doc',
                        margin: '15 0 0 0',
                        style: 'color:#666'
                    },
                ]
            }
        ]
    }

});