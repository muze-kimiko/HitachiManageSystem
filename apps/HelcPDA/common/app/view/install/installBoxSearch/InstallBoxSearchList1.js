Ext.define('HelcPDA.view.install.installBoxSearch.InstallBoxSearchList1', {
    extend: 'Ext.Panel',
    id: 'installBoxSearchList1',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '箱头查询－工号层',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
						id:'BackSearch'
                    },
                    {
                        xtype: 'spacer'
                    } 
                ]
            },
            {
                xtype: 'list',
                id: 'searchAll_ThreeXTList',
                height: '100%',
                store:'InstallSearchListStore1',
                itemTpl: [
					   '<table border=0 width=100%>',
                    '    <tr height=20>',
                    '        <td width=70%>',
                    '            <span style="font-size:22px;">工号:{ELEVATOR_NO}</span>',
                    '             <span style="color:#666">箱头台数:{NUM}</span>',
                    '        </td>',
                    '    </tr>',
                    '</table>'
                ],
                onItemDisclosure: true
            }
        ]
    }
    
 
});