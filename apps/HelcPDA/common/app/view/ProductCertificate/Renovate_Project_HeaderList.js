Ext.define('HelcPDA.view.ProductCertificate.Renovate_Project_HeaderList', {
    extend: 'Ext.Panel',
    id: 'Renovate_Project_HeaderList_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '品证整改',
                items: [
                        {
                            xtype: 'button',
//                            id: 'Renvate_p_back',
                            iconCls: 'home',
                            text: '主页',
                            listeners:{
                            	tap:function(){
                            		objj.getApplication().getController('ProductCertificate.Renovate_Project_List_Ctrl').Renvate_p_back();
                            	}
                            }
                        },
                        {
                            xtype: 'spacer'
                        },
                        {
                            xtype: 'button',
                            id: 'btn_RP_update',
                            iconCls: 'arrow_down',
                        },
                        {
                            xtype: 'button',
                            id: 'btn_RP_search',
                            iconCls: 'search',
                        }
                    ]
            },
//            {
//                xtype: 'toolbar',
//                docked: 'top',
//                items: [
//                    {
//                        xtype: 'label',
//                        id: 'RP_Ecount',
//                        html: '总台数()',
//                        margin: '0 0 0 20'
//                    },
//                    {
//                        xtype: 'spacer'
//                    }
//                ]
//            },
            {
                xtype: 'list',
                id: 'RP_Head_list',
                store:'RP_HeadStore',
                height: '100%',
                itemTpl: [
                      '<table border=0 width=100% style="color:#666">',
                      '    <tr height=20>',
                      '        <td width=70%>',
                      '            <span style="color:#000;font-size:18px;">{RENOVATE_PROJECT_NUM}</span>',
                      '        </td>',
                      '    </tr>',
                      '    <tr height=18>',
                      '        <td><span style="color:#666;font-size:15px;">项目名称:{RENOVATE_PROJECT_NAME}</span></td>',
                      '    </tr>',
                      '    <tr height=18>',
                      '        <td><span style="color:#666;font-size:15px;">分公司:{COMPANY_NAME}</span></td>',
                      '    </tr>',
                      '</table>'
                ],
                onItemDisclosure: true
            }
        ]
    }

});