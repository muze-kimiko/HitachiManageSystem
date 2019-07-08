
/* JavaScript content from app/view/OaMobileOffice/ElectronicProcess/installProject.js in folder common */
Ext.define('HelcPAD.view.OaMobileOffice.ElectronicProcess.installProject',{
    extend: 'Ext.Panel',
    id:'installProject_ep_id',
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
                title: 'OA移动办公',
                items: [
                    {
                    	xtype: 'button',
				        ui: 'back',
				        text: '返回',
				        id: 'appws_FH',
			            align:'right',
                    },
                    {
                        xtype: 'spacer'
                    },{
                    	xtype: 'button',
				        ui: 'back',
				        text: '我的流程',
				        id: 'installProject_ep_id_MyLC',
			            align:'right',
                    }
                ]
            },
            {
                xtype: 'list',
                id: 'install_project_list_ep',
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
//                    },
//                    {
//                        title: '箱头发货',
//                        color: '#f6821f',
//                        number: '3',
//                        icon: 'X'
//                    },
//                    {
//                        title: '安装计划',
//                        color: '#e03a3e',
//                        number: '1',
//                        icon: '\\'
//                    },
//                    {
//                        title: '安装过程',
//                        color: '#953c96',
//                        number: '2',
//                        icon: '7'
//                    },
//                    {
//                        title: 'ITM',
//                        color: '#009ddc',
//                        number: '3',
//                        icon: '7'
//                    },
//                    {
//                        title: '已发货未进场',
//                        color: '#62bb47',
//                        number: '1',
//                        icon: 'x'
//                    },
//                    {
//                        title: '调试任务',
//                        color: '#fbb726',
//                        number: '2',
//                        icon: 'W'
//                    },
//                    {
//                        title: '报检任务',
//                        color: '#e03a3e',
//                        number: '2',
//                        icon: 'W'
//                    },
//                    {
//                        title: '厂检任务',
//                        color: '#e03a3e',
//                        number: '2',
//                        icon: 'W'
//                    },
//                    {
//                        title: '政府检任务',
//                        color: '#009ddc',
//                        number: '2',
//                        icon: 'W'
//                    },
//                    {
//                        title: '完工及移交',
//                        color: '#62bb47',
//                        number: '2',
//                        icon: '^'
//                    },
//                    {
//                        title: '调试菜单补录',
//                        color: '#fbb726',
//                        number: '2',
//                        icon: 'p'
//                    },
//                    {
//                        title: '厂检菜单补录',
//                        color: '#f6821f',
//                        number: '2',
//                        icon: 'p'
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
            },
          
        ]
    },
    
});