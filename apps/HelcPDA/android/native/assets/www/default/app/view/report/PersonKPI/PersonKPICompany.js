
/* JavaScript content from app/view/report/PersonKPI/PersonKPICompany.js in folder common */
Ext.define('HelcPDA.view.report.PersonKPI.PersonKPICompany', {
    extend: 'Ext.Panel',
    id:'PersonKPICompany',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.Label',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '作业人员业绩分公司',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        id:'btn_Back_PersonKPICompany',
                        text: '返回'
                    },
//                    {
//                        xtype: 'spacer'
//                    },
//                    {
//                        xtype: 'button',
//                        id:'btn_Pre_PersonKPICompany',
//                        text: '上月'
//                    }
                ]
            },
//            {
//            	id:'searchcompanyid',
//            	xtype:'hiddenfield',
//            	value:''
//            },
//            {
//            	id:'SearchCountRegion',
//            	xtype:'hiddenfield',
//            	value:''
//            },
            {
                xtype: 'list',
                flex: 1,
                id:'li_PersonKPICompany',
                store:'PersonKPICompanyStore',
                itemTpl: [
//                    '<table border=0 width=100% style="color:#666">',
//                    '  <tr>',
//                    '    <td width=100%  style="color:#000;">{COMPANY_NAME}</td>',
//                    '  </tr>',
//                    '</table>'
                	'<table border=0 width=100%>',
                    '  <tr>',
                    '    <td width=100%>{COMPANY_NAME}</td>',
                    '  </tr>',
                    '</table>'
                ],
                onItemDisclosure: true
            }
        ]
    }

});