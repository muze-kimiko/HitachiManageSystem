
/* JavaScript content from app/view/appworkspace/BatchApply/SpecialBatchApply.js in folder common */
Ext.define('HelcPAD.view.appworkspace.BatchApply.SpecialBatchApply', {
    extend: 'Ext.Container',

    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.SegmentedButton',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
    	id:'specialBatchApply_id',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '特殊排产发货申请',
                cls:'textfTwo',
                items: [
                    {
                    	id:'specialBatchApply_id_FH',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                    },
                    {
                        xtype: 'spacer'
                    },
                    /*{
                        xtype: 'button',
                        text: '提交'
                    }*/
                ]
            },
            {
                xtype: 'tabpanel',
                height: '100%',
                id:'specialBatchApply_tpl',
                cls:'textfTwo',
                items: [
                    {
                        xtype: 'formpanel',
                        title: '特殊单头',
                        id:'specialBatchApply_fpdt',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: '特殊排产流程单头',
                                items: [
                                    {
                                    	id:'OU_NAME_SBA',
                                        xtype: 'textfield',
                                        label: '业务实体',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                    {
                                    	id:'CONTRACT_NO_SBA',
                                        xtype: 'textfield',
                                        label: '合同编号',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                    {
                                    	id:'SPECIAL_NUM_SBA',
                                        xtype: 'textfield',
                                        label: '单据编号',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                    {
                                    	id:'STATUS_NAME_SBA',
                                        xtype: 'textfield',
                                        label: '状态',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                    {
                                    	id:'APPLY_EMPNAME_SBA',
                                        xtype: 'textfield',
                                        label: '申请人',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                    {
                                    	id:'APPLY_DEPNAME_SBA',
                                        xtype: 'textfield',
                                        label: '申请部门',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                    {
                                    	id:'APPLY_DATE_SBA',
                                        xtype: 'textfield',
                                        label: '申请日期',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                title: '合同信息',
                                items: [
                                    {
                                    	id:'CUSTOMER_NAME_SBA',
                                        xtype: 'textfield',
                                        label: '客户',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                    {
                                    	id:'FINAL_USE_UNIT_SBA',
                                        xtype: 'textfield',
                                        label: '使用单位',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                    {
                                    	id:'SIGNER_EMP_SBA',
                                        xtype: 'textfield',
                                        label: '合同签订人',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                    {
                                    	id:'RESPER_EMP_SBA',
                                        xtype: 'textfield',
                                        label: '合同负责人',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                    {
                                    	id:'LARGE_CUSTOMER_SBA',
                                        xtype: 'textfield',
                                        label: '大客户',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                    {
                                    	id:'SIGNER_CITY_NAME_SBA',
                                        xtype: 'textfield',
                                        label: '签订地区',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                    {
                                    	id:'SUBCOMPANY_NAME_SBA',
                                        xtype: 'textfield',
                                        label: '签订分公司',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                ]
                            },
                            /*{
                                xtype: 'fieldset',
                                title: '备注',
                                items: [
									{
									    xtype: 'textfield',
									    label: '备注',
									    cls:'textfTwo',
									    labelWidth:'40%',
									}
                                ]
                            },*/
                        ]
                    },
                    {
                        xtype: 'container',
                        title: '批次信息',
                        id:'specialBatchApply_fpdh',
                        items: [
                            {
                                xtype: 'list',
                                id:'specialBatchApply_list',
                                height: '100%',
                                store:'SpecialBatchApplyDetailStore',
                                onItemDisclosure: true,
                                itemTpl: [                                   
	                                '<div>'+
	                                	'<div style="float:left;margin-top:5px">批次:{LOT_NUM}          类别:{APPLY_TYPE}</div>'+
	                                '</div>'
                                ],
                            }
                        ]
                    }
                ]
            }
        ]
    }

});