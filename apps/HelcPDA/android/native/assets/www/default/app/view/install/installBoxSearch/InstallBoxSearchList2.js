
/* JavaScript content from app/view/install/installBoxSearch/InstallBoxSearchList2.js in folder common */
Ext.define('HelcPDA.view.install.installBoxSearch.InstallBoxSearchList2', {
    extend: 'Ext.Panel',
    id: 'installBoxSearchList2',
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
                title: '箱头查询－箱头层',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
						id:'BackSearch',
                    },
                    {
                        xtype: 'spacer'
                    } 
                ]
            },
            {
                xtype: 'list',
                id: 'XT_Search_List2',
                height: '100%',
                store:'InstallSearchListStore2',
                itemTpl: [
							'<table border=0 width=100%>',
							'  <tr>',
							'    <td width=10% rowspan="2" id="ipd_ENO_Checkbox">',
							'    </td>',
							'    <td width=80%>',
							'      <span style="font-size:22px;">箱头号:{ELVBOX_NAME}</span>',
							'    </td>',
							'  </tr>',
							'  <tr>',
							'      <td width=40% style="text-align: left">状态:<span style="margin-left:5px;background:green;color:white;border:green 2px solid;">{STATUS}</span></td>',
							'  </tr>',
							'</table>'
							
                ],
                onItemDisclosure: true
            }
        ],
        listeners: [
                    {
                        fn: 'GH_listItemTap',
                        event: 'itemtap',
                        delegate: '#PC_AzSearch_List1'
                    }
                ]
    },
    
    GH_listItemTap: function(dataview, index, target, record, e, eOpts) {
        if(e.target.id==='ipd_ENO_Checkbox')
        {
            if(record.get('sel')==='0')
            {
                record.set('sel','1');
                record.set('color','#ccc');
            }
            else
            {
                record.set('sel','0');
                record.set('color','#e03a3e');
            }
        }
} 

});