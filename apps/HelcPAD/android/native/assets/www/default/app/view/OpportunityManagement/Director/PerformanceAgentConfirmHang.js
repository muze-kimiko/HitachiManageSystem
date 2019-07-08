
/* JavaScript content from app/view/OpportunityManagement/Director/PerformanceAgentConfirmHang.js in folder common */
/**
 * 合同行详细资料
 */
Ext.define('HelcPAD.view.OpportunityManagement.Director.PerformanceAgentConfirmHang', {
    extend: 'Ext.Container',
    id:'performanceAgentConfirmHang',
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
                title: '经销商业绩资料',
                cls:'textf',
                items: [
                    {
                    	id:'performanceAgentConfirmHang_HF',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        text: '修改',
                        id:'performanceAgentConfirmHang_BC',
                        hidden:true,
                    },
                    {
                    	id:'performanceAgentConfirmHang_record',
						xtype: 'textfield',
						hidden:true,
                    },
                ]
            },
            {
	            xtype: 'formpanel',
	            flex: 1,
	            height: 600,
	            items: [
	                {
	                    xtype: 'fieldset',
	                    cls:'textf',
	                    items: [						
	                        {
	                        	id:'PAC_Agent',
	                        	xtype: 'textfield',
                                labelWidth: '35%',
                                label: '经销商名称',
                                width:'100%',
                                labelWidth: '35%',
	                        },
	                        /*{
							    xtype: 'textfield',
							    label: '代理商名称',
							    style: 'float:left',
                              	width:'75%',
                                labelWidth: '45%',
							},
							{
                                   xtype: 'button',
                                   margin: '6px 0 0 0',
                                   padding: 0,
                                   style: 'float:left',
                                   width:'25%',
                                   text: '查询'
                            },*/
	                        {
	                        	id:'PAC_RegistrationDate',
	                        	xtype: 'textfield',
                                labelWidth: '35%',
                                label: '报备时间',
                                width:'100%',
	                        },
	                        {
	                        	id:'PAC_LineNumber',
	                        	xtype: 'textfield',
                                labelWidth: '35%',
                                label: '报备顺序',
                                width:'100%',
	                        },
	                        {
	                        	id:'PAC_LeadStatus',
	                        	xtype: 'textfield',
                                labelWidth: '35%',
                                label: '线索状态',
                                width:'100%',
	                        },
	                        {
	                        	id:'PAC_PerformanceShared',
	                        	xtype: 'textfield',
                                labelWidth: '35%',
                                label: '业绩分成',
                                width:'100%',
	                        },
	                        {
	                        	id:'PAC_PerformanceCountCal',
	                        	xtype: 'textfield',
                                labelWidth: '35%',
                                label: '业绩台量',
                                width:'100%',
	                        },
	                        {
	                        	id:'PAC_ElevatorCount',
	                        	xtype: 'textfield',
                                labelWidth: '35%',
                                label: '电梯台量',
                                width:'100%',
	                        },
	                        {
	                        	id:'PAC_Comments',
	                        	xtype: 'textfield',
                                labelWidth: '35%',
                                label: '说明',
                                width:'100%',
	                        },
	                    ]
	                }
	            ]
            }
    ]}
});         	