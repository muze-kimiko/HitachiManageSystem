
/* JavaScript content from app/view/fitting/com_part_Project.js in folder common */
Ext.define('HelcPDA.view.fitting.com_part_Project',{
    extend: 'Ext.Panel',
    id:'com_part_Project_id',
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
                title: '配件信息',
                items: [
                    {
                    	xtype: 'button',
				        ui: 'back',
				        text: '主页',
				        id: 'btn_back_com_park_Project',
			            align:'right',
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                xtype: 'list',
                id: 'com_part_Project_list',
                flex: 1,
                cls: 'q_list',
//                data: [
//                    {
//                        title: '安装任务',
//                        color: '#62bb47',
//                        number: '1',
//                        icon: 'l'
//                    },
//                    {
//                        title: '确认排产',
//                        color: '#fbb726',
//                        number: '1',
//                        icon: '3'
//                    }
//                ],
                height: 208,
                itemTpl: [
                    '<div class="q_list_box">',
                    '    <div class="q_list_icon"><span style="color:{color}">{icon}</span></div>',
                    '    <div class="q_list_name">{title}</div>',
                    '</div>',
                    ''
                ]
            }
        ]
    },
    
});