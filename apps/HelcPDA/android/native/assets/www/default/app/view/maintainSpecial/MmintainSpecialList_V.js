
/* JavaScript content from app/view/maintainSpecial/MmintainSpecialList_V.js in folder common */
Ext.define('HelcPDA.view.maintainSpecial.MmintainSpecialList_V', {
    extend: 'Ext.Panel',
    id:'MmintainSpecialList_V_id',
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
                title: '专项保障',
                items: [
                    {
                        xtype: 'button',
                        id: 'ZXBZ_back_to_menu',
                        text: '主页',
                        ui: 'back',
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'btn_ZXBZ_search',
                        iconCls: 'search',
                    },
                    {
                        xtype: 'button',
                        id: 'btn_ZXBZ_add',
                        iconCls: 'add',
                    }
                ]
            },
            {
                xtype: 'list',
                id:'MmintainSpecialList',
                height: '100%',
                itemTpl: [
                    '<table border=0 width=100% style="color:#666">',
                    '    <tr height=20>',
                    '        <td width=70%>',
                    '            <span style="color:#000;font-size:18px;">{ASSET_NUM}</span>',
                    '            <span style="color:#666;font-size:15px;">作业时间:{ACTUAL_DATE}</span>',
                    '        </td>',
                    '    </tr>',
                    '  <tr>',
					'		<td width=70%>',
					'		<span style="color:#666;font-size:15px;">地盘名称:{DOMAIN}</span>',
					'       </td>',
					'  </tr>',
                    '  <tr>',
					'		<td width=70%>',
					'		<span style="color:#666;font-size:15px;">作业人员1:{ACTUAL_EMP_NAME1}</span>',
					'       </td>',
					'  </tr>',
                    '  <tr>',
					'		<td width=120><span style="float:left;font-size:15px;">状态:</span><div style="float:left;width:60px;text-align:center;background:green;color:white;font-size:15px; "  >{FINISH_FLAG}</div><span style="float:left;font-size:15px;margin-left:3px;">保障类型:</span><div style="float:left;width:60px;color:white;background:green;font-size:15px;text-align:center;">{FAULT_TYPE}</div></td>',
					'  </tr>',
                    '</table>'
                ],
                onItemDisclosure: true,
                store:'MmintainSpecialStore'
                
            }
        ]
    },
    
});

