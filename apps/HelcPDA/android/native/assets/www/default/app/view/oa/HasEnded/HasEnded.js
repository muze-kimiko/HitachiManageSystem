
/* JavaScript content from app/view/oa/HasEnded/HasEnded.js in folder common */
Ext.define('HelcPDA.view.oa.HasEnded.HasEnded', {
    extend: 'Ext.Panel',
    id:'HasEnded_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        style: 'background-color:#edebf1',
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '一天内已结束的流程',
                items: [
                        {
                        	xtype: 'button',
                            iconCls: 'home',
                            id: 'returnHome_ID'
                        }
                    ]
            },
            {
                xtype: 'list',
                flex: 1,
                id: 'yjs_HasEndedList',
                itemTpl: [
                    '<table border=0 class="i_Button_List">',
                    '  <tr>',
                    '      <td rowspan="3" class="i_Button_List_Icon_1 i_Button_List_Icon_2" style="color:#854107">O</td>',
                    '      <td colspan="2" class="i_Button_List_Title">{major}{subject}</td>',
                    '  </tr>',
                    '  <tr>',
                    '      <td class="i_Button_List_left">{processname}</td>',
                    '      <td class="i_Button_List_right">{createdate}</td>',
                    '  </tr>',
                    '  <tr>',
                    '      <td ><span class={endstauts}>{endstauts}</span></td>',
                    '  </tr>',
                    '</table>'
                ],
                onItemDisclosure: true,
                store:'HasEndedStore'
            }
        ]
    }

});