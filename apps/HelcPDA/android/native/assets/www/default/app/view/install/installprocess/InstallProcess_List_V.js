
/* JavaScript content from app/view/install/installprocess/InstallProcess_List_V.js in folder common */
Ext.define('HelcPDA.view.install.installprocess.InstallProcess_List_V', {
    extend: 'Ext.Panel',
    id:'installprocess_list_id',
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
                title: '安装过程',
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
                        id: 'btn_IP_update',
                        iconCls: 'arrow_down',
                    },
                    {
                        xtype: 'button',
                        id: 'btn_IP_search',
                        iconCls: 'search',
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'label',
                        id: 'IP_Ecount',
                        html: '总台数()',
                        margin: '0 0 0 20'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                xtype: 'list',
                id:'processlist_List',
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
                store:'ProcessListStore'
                
            },
            {
                xtype:'hiddenfield',
                id:'ipd_ENTRANCE_ENTER_search',
            }
        ]
    },
    
});

