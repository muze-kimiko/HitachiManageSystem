Ext.define('HelcPDA.view.report.PersonKPI.PersonKPIPerson', {
    extend: 'Ext.Panel',
    id:'PersonKPIPerson',
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
                title: '作业人员业绩',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        id:'btn_Back_PersonKPIPerson',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id:'btn_switch_PersonKPIPerson',
                        text: '上月'
                    }
                ]
            },
			{
            	id:'h_Region',
            	xtype:'hiddenfield',
            	value:'1'
            },
            {
            	id:'h_station_id_PersonKPIPerson',
            	xtype:'hiddenfield',
            },
            {
                xtype: 'list',
                flex:1,
                id:'li_PersonKPIPerson',
                store:'PersonKPIPersonStore',
                itemTpl: [
                    '<table border=0 width=100%>',
                    '  <tr>',
                    '    <td  colspan="2" style="color:#000;">{PERSON_NAME}</td>',
                    '  <tr>',
                    '    <td width=60%>保养计划实际录入及时率：{PUNCTUAL_AP_RATE}</td>',
                    '    <td width=40%>到达时间录入及时率：{PE_ARRIVAL_RATE}</td></tr>',
                    '  <tr>',
                    '	 <td width=60%>故障报告书录入及时率：{PE_FAULT_REPORT_RATE}</td>',
                    '    <td width=40%>绩点：{GRADE_POINT}</td></tr>',
                    '</table>'
                ],
            }
        ]
    }

});