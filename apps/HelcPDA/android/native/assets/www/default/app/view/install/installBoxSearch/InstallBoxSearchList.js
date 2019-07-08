
/* JavaScript content from app/view/install/installBoxSearch/InstallBoxSearchList.js in folder common */
Ext.define('HelcPDA.view.install.installBoxSearch.InstallBoxSearchList', {
    extend: 'Ext.Panel',
    id:'installBoxSearchList',
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
                title: '箱头查询-合同层',
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
                id:'searchAll_secondXTList',
				store:'InstallSearchListStore',
                height: '100%',
                itemTpl: [
                    '<table border=0 width=100%>',
                    '    <tr height=20>',
                    '        <td width=70%>',
                    '            <span style="font-size:22px;">合同号:{ENGCONTRACT_NUMBER}</span>',
					'             <span style="color:#666">工号台数:{NUM}</span>',
                    '        </td>',
                    '    </tr>',
                    '</table>'
                ],
                onItemDisclosure: true,
         
            }
        ]
    },
    
});

