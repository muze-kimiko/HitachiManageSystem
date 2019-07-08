
/* JavaScript content from app/view/appworkspace/Contract/ContractBusiness_Siebel.js in folder common */
/**
 * 技价审核详细
 */
Ext.define('HelcPAD.view.appworkspace.Contract.ContractBusiness_Siebel', {
    extend: 'Ext.Container',
    id:'contractbusiness_siebel',
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
                title: '商务审核详细',
                items: [
                    {
                    	id:'contracthang_id_FH',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
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
//	                    title: '',
	                    items: [
	                        {
	                        	id:'CB_PreaprSts',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '40%',
                                label: '商务审核状态',
                                readOnly:true,
	                        },
	                        {
	                        	id:'CB_Attrib1',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '40%',
                                label: '商务审核人',
                                readOnly:true,
	                        },
	                        {
	                        	id:'CB_BpReceivedDt',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '40%',
                                label: '商审收到日期',
                                readOnly:true,
	                        },
	                        {
	                        	id:'CB_BpStampingDt',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '40%',
                                label: '待盖章日期',
                                readOnly:true,
	                        },
	                        {
	                        	id:'CB_BpRefuseDt',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '40%',
                                label: '拒绝日期',
                                readOnly:true,
	                        },
	                        {
	                        	id:'CB_PreaprFinishDt',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '40%',
                                label: '完成日期',
                                readOnly:true,
	                        },
	                    ]
	                }
	            ]
            }
    ]}
});         	