
/* JavaScript content from app/view/oa/startTheProcess/startTheProcess.js in folder common */
Ext.define('HelcPDA.view.oa.startTheProcess.startTheProcess', {
    extend: 'Ext.Panel',
    id:'qc_StartProcess_id',
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
                title: '启动流程-分类',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        id:'OAbackToMenus',
                        text: '返回'
                    }
                ]
            },
            {
                xtype: 'list',
                id:'qc_StartProcessList',
                flex: 1,
                data: [
//                    {
//                        title: '日常办公',
//                        color: '#854107',
//                        icon: 'O',
//                        class: 'i_Button_List_Icon_2'
//                    },
//                    {
//                        title: '营业/工程业务',
//                        color: '#fbb726',
//                        icon: 'b',
//                        class: 'i_Button_List_Icon_2'
//                    },
//                    {
//                        title: '质量控制',
//                        color: '#e03a3e',
//                        icon: '!',
//                        class: 'i_Button_List_Icon_2'
//                    },
                    {
                    	title: '提案管理流程',
                    	color: '#009ddc',
                    	icon: 'W',
                    	class: 'i_Button_List_Icon_2'
                    },
                ],
                itemTpl: [
                    '<table border=0 class="">',
                    '  <tr>',
                    '      <td rowspan="2" class="i_Button_List_Icon_1 {class}" style="color:{color}">{icon}</td>',
                    '      <td colspan="2" class="i_Button_List_Title">{title}</td>',
                    '  </tr>',
                    '</table>'
//                     i_Button_List
                ],
                onItemDisclosure: true
            }
        ]
    }

});