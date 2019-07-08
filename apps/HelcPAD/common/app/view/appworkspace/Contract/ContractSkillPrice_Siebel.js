/**
 * 技价审核详细
 */
Ext.define('HelcPAD.view.appworkspace.Contract.ContractSkillPrice_Siebel', {
    extend: 'Ext.Container',
    id:'contractskillprice_siebel_id',
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
                title: '技价审核详细',
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
	                        	id:'SP_TechnicalApproveStatus',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '52%',
                                label: '技价审核状态',
                                readOnly:true,
	                        },
	                        {
	                        	id:'SP_SaleResp',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '52%',
                                label: '跟踪人员',
                                readOnly:true,
	                        },
	                        {
	                        	id:'SP_TechSubmitDate',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '52%',
                                label: '分公司营业员提交时间',
                                readOnly:true,
	                        },
	                        {
	                        	id:'SP_BranchTechChecker',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '52%',
                                label: '分公司技审人员',
                                readOnly:true,
	                        },
	                        {
	                        	id:'SP_BranchFinishDate',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '52%',
                                label: '分公司技术审核时间',
                                readOnly:true,
	                        },
	                        {
	                        	id:'SP_Attrib3',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '52%',
                                label: '总部营业员',
                                readOnly:true,
	                        },
	                        {
	                        	id:'SP_ApproveFinishDate',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '52%',
                                label: '总部营业员审核时间',
                                readOnly:true,
	                        },
	                        {
	                        	id:'SP_TechnicalApprovePerson',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '52%',
                                label: '总公司技审人员',
                                readOnly:true,
	                        },
	                        {
	                        	id:'SP_HeadFinishDate',
	                        	xtype: 'textfield',
                                cls:'textf',
                                labelWidth: '52%',
                                label: '总部技审人员完成时间',
                                readOnly:true,
	                        },
	                    ]
	                }
	            ]
            }
    ]}
});         	