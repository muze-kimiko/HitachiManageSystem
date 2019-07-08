
/* JavaScript content from app/view/appworkspace/BatchApply/SpecialBatchApplyDetail.js in folder common */
Ext.define('HelcPAD.view.appworkspace.BatchApply.SpecialBatchApplyDetail', {
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
    	id:'specialBatchApplyDetail_id',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '单据行详细信息',
                cls:'textfTwo',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        id:'specialBatchApplyDetail_id_FH'
                    },
                    {
                        xtype: 'spacer'
                    },
                ]
            },
            {
                xtype: 'fieldset',
                cls:'textfTwo',
                items: [
					{
						id:'ELEVATOR_NO',
					    xtype: 'textfield',
					    label: '工号',
					    labelWidth:'45%',
					    readOnly:true,
					},
                    {
						id:'EQUIPMENT_NO',
                        xtype: 'textfield',
                        label: '设备号',
                        labelWidth:'45%',
                        readOnly:true,
                    },
                    {
                    	id:'CM_ELEVATOR_TYPE_NAME',
                        xtype: 'textfield',
                        label: '营业梯种',
                        labelWidth:'45%',
                        readOnly:true,
                    },
                    {
                    	id:'SPLIT_BATCH_FLAG',
                        xtype: 'textfield',
                        label: '是否分批',
                        labelWidth:'45%',
                        readOnly:true,
                    },
                    {
                    	id:'PRE_RECEIPT_RATE',
                        xtype: 'textfield',
                        label: '预付款收款比例',
                        labelWidth:'45%',
                        readOnly:true,
                    },
                    {
                    	id:'RECEIPT_RATE',
                        xtype: 'textfield',
                        label: '提货款收款比例',
                        labelWidth:'45%',
                        readOnly:true,
                    },
                    {
                    	id:'INV_DAYS',
                        xtype: 'textfield',
                        label: '库存天数',
                        labelWidth:'45%',
                        readOnly:true,
                    },
                    {
                    	id:'INV_PRICE',
                        xtype: 'textfield',
                        label: '仓租',
                        labelWidth:'45%',
                        readOnly:true,
                    },
                    
                ]
            }
        ]
    }

});