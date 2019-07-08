
/* JavaScript content from app/view/install/installSearch/InstallSearchList.js in folder common */
Ext.define('HelcPDA.view.install.installSearch.InstallSearchList', {
    extend: 'Ext.Panel',
    id:'installSearchList',
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
                title: '安装查询-合同层',
                items: [
                    {
                        xtype: 'button',
                        text: '返回',
                        ui: 'back',
						id:'BackSearch'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                xtype: 'list',
                id:'AzSearch_List',
                height: '100%',
                itemTpl: [
                    '<table border=0 width=100%>',
                    '    <tr height=20>',
                    '        <td width=70%>',
                    '            <span style="font-size:22px;">{ENGCONTRACT_NUMBER}</span>',
                    '            <span style="color:#666">工号台数:{NUM}</span>',
                    '        </td>',
                    '    </tr>',
                    '    <tr height=18>',
                    '        <td><span style="color:#666">客户名称:{CUSTOMER_NAME}</span></td>',
                    '    </tr>',
                    '</table>'
                ],
                onItemDisclosure: true,
                store:'InstallSearchListStore'
                
            }
        ]
    },
    
});

