Ext.define('HelcPDA.view.report.PersonKPI.PersonKPIStation', {
    extend: 'Ext.Panel',
    id:'PersonKPIStation',
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
                title: '作业人员业绩保养站',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        id:'btn_Back_PersonKPIStation',
                        text: '返回'
                    },
//                    {
//                        xtype: 'spacer'
//                    },
//                    {
//                        xtype: 'button',
//                        id:'Rep_fault_GZBG_SYbutton',
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
                flex:1,
                id:'li_PersonKPIStation',
                store:'PersonKPIStationStore',
                itemTpl: [
                    '<table border=0 width=100%>',
                    '  <tr>',
                    '    <td width=100%>{STATION_NAME}</td>',
                    '  </tr>',
                    '</table>'
                ],
                onItemDisclosure: true
            }
        ]
    }

});