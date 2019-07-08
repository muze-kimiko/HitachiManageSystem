
/* JavaScript content from app/view/install/installcheck/InstallatoinTasksFactoryPanel.js in folder common */
Ext.define('HelcPDA.view.install.installcheck.InstallatoinTasksFactoryPanel', {
    extend: 'Ext.Panel',
    id: 'installatoinTasksFactoryPanel',
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
                title: '厂检任务',
                items: [
                    {
                        xtype: 'button',
                        id: 'back_to_install',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'ic_UPDATE_Install',
                        iconCls: 'arrow_down',
                    },
                    {
                        xtype: 'button',
                        id: 'ic_SEARCH_Install',
                        iconCls: 'search',
                    },
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'label',
                        id: 'Ecount',
                        html: '总台数()',
                        margin: '0 0 0 20'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
				    xtype: 'list',
				    height: '100%',
				    id:'installList',
				    store:'InstallatoinTasksFactoryStore',
				    itemTpl: [
				        '<table border=0 width=100% style="color:#666">',
				        '    <tr height=20>',
				        '        <td width=70%>',
				        '            <span style="color:#000;font-size:18px;">{ENGCONTRACT_NUMBER}</span>',
				        '            <span style="color:#666;font-size:15px;">工号台数:{NUM}台</span>',
				        '        </td>',
				        '    </tr>',
				        '    <tr height=18>',
				        '        <td><span style="color:#666;font-size:15px;">客户名称:{CUSTOMER_NAME}</span></td>',
				        '    </tr>',
				        '</table>'
				        ],
			    	onItemDisclosure: true
				},
				{
	                xtype:'hiddenfield',
	                id:'itf_ENTRANCE_ENTER_search',
	            }
        ]
    }

});