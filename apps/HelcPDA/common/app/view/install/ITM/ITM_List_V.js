Ext.define('HelcPDA.view.install.ITM.ITM_List_V', {
    extend: 'Ext.Panel',
    id:'ITM_list_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.tab.Panel',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'ITM列表',
                items: [
                    {
                        xtype: 'button',
                        id: 'back_Instll_project_list',
                        text: '返回',
                        ui: 'back',
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'btn_ITM_update',
                        iconCls: 'arrow_down',
                    },
                    {
                        xtype: 'button',
                        id: 'btn_ITM_search',
                        iconCls: 'search',
                    }
                ]
            },
            {
                xtype: 'list',
                id:'ITM_List',
                height: '100%',
                itemTpl: [
                    '<table border=0 width=100% style="color:#666">',
                    '    <tr height=20>',
                    '        <td width=70%>',
                    '            <span style="color:#000;font-size:18px;">{ENGCONTRACT_NUMBER}</span>',
                    '            <span style="color:#666;font-size:15px;">工号台数:{NUM}</span>',
                    '        </td>',
                    '    </tr>',
                    '    <tr height=18>',
                    '        <td><span style="color:#666;font-size:15px;">客户名称:{CUSTOMER_NAME}</span></td>',
                    '    </tr>',
                    '</table>'
                ],
                onItemDisclosure: true,
                store:'ITMListStore'
                
            }
        ]
    },
    
});

