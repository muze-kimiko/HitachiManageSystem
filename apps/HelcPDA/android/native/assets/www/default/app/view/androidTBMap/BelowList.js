
/* JavaScript content from app/view/androidTBMap/BelowList.js in folder common */
﻿Ext.define('HelcPDA.view.androidTBMap.BelowList', {
    extend: 'Ext.Panel',
    id:'belowList',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.Label',
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.tab.Panel'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '人员轨迹',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',          
                        text: '返回',
                        id:'belowManDetailBackTB'
                    },
                    {
                        xtype: 'spacer'
                    }
                    , {
                        xtype: 'button',
                        ui: 'action',
                        text: '地图轨迹',
                        id:'allRoultTB'
                    } 
                ]
            },
            {
                xtype: 'list',
                data: [
                ],
                height: '100%',
                store:'MapAroundEmpStore1',
                id:'belowRoultTB',
                itemTpl: [
                    '<table border=0 width=100%>',
                    '    <tr height=20>',
                    '        <td width=70%>',
                    '            <span style="font-size:18px;color:#000;">位标:{NUM}</span>',
                    '        </td>',
                    '    </tr>',
                    '    <tr height=20>',
                    '        <td width=70%>',
                    '            <span style="font-size:18px;color:#000;">时间:{TIME}</span>',
                    '        </td>',
                    '    </tr>',
                    '    <tr height=18>',
                    '        <td><span style="">地址:{CONTENT}</span></td>',
                    '    </tr>',
                    '</table>'
                ],
                onItemDisclosure: true
            }, {
                xtype: 'hiddenfield',
                text: '数据',
                id:'hiddenValue'
            } 
            ]
        
    }

});