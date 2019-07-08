
//因为有些手机不适应当前版本的下拉列表，所以现在把下拉列表改为list  xcx 2016-1-19
Ext.define('HelcPAD.view.common.SelectFieldList', {
    extend: 'Ext.Container',
    id:'selectFieldList_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        items: [
            {
            	id:'selectFieldList_id_tb',
                xtype: 'toolbar',
                docked: 'top',
                title: '',
                cls:'textf',
                items: [
                    {
                    	id:'selectFieldList_FH',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回'
                    },{
                    	xtype:'spacer'
                    }
                ]
            },
            {
            	id:'selectFieldList_list',
                xtype: 'list',
                height: '100%',
                store:'SelectFieldListStore',
                cls:'textf',
                itemTpl: [
                    '<div width=100%>{text}</div>',
                ],
                onItemDisclosure: true
            }
        ]
    }

});