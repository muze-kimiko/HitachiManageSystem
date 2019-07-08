
/* JavaScript content from app/view/oa/OAProcess.js in folder common */
Ext.define('HelcPDA.view.oa.OAProcess', {
    extend: 'Ext.Container',
    id:'OAProcess_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.tab.Panel',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'OA流程',
                items: [
                    {
                        xtype: 'button',
                        id: 'OA_back',
                        iconCls: 'home',
                        text: '主页'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'btn_startProcess',
                        iconCls: 'add',
                        text: '起草'
                    }
                ]
            },
            {
                xtype: 'tabpanel',
                id: 'OA_tabpanel',
                height: '100%',
                items: [
                    {
                        xtype: 'container',
                        title: '我的流程',
                        items: [
                            {
                                xtype: 'list',
                                height: '100%',
                                id: 'wdlc_MyProcessList',
                                itemTpl: [
                                    '<table border=0 class="">',
                                    '  <tr>',
                                    '      <td rowspan="2" class=" {class}" style="color:{color}">{icon}</td>',
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
                    },
                    {
                        xtype: 'container',
                        id:'OA_yjs_cont',
                        title: '已结束',
                        items: [
                            {
                                xtype: 'list',
                                height: '100%',
                                id: 'yjs_HasEndedList',
                                itemTpl: [
                                    '<table border=0 class="">',
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
                ]
            }
        ]
    }

});