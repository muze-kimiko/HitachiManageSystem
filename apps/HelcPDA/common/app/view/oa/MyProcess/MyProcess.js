Ext.define('HelcPDA.view.oa.MyProcess.MyProcess', {
    extend: 'Ext.Panel',
    id:'MyProcess_id',
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
                title: '我申请未结束的流程',
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
                id: 'wdlc_MyProcessList',
                itemTpl: [
                    '<table border=0 class="i_Button_List">',
                    '  <tr>',
                    '      <td rowspan="2" class="i_Button_List_Icon_1 {class}" style="color:{color}">{icon}</td>',
                    '      <td colspan="2" class="i_Button_List_Title">{major}{subject}</td>',
                    '  </tr>',
                    '  <tr>',
                    '      <td class="i_Button_List_left">{proc_name_dist}</td>',
                    '      <td class="i_Button_List_right">{arr_time}</td>',
                    '  </tr>',
                    '</table>'
                ],
                onItemDisclosure: true,
                store:'MyProcessStore'
            }
        ]
    }

});