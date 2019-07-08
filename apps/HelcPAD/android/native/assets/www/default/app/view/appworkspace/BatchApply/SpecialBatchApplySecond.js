
/* JavaScript content from app/view/appworkspace/BatchApply/SpecialBatchApplySecond.js in folder common */
Ext.define('HelcPAD.view.appworkspace.BatchApply.SpecialBatchApplySecond', {
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
    	id:'specialBatchApplySecond_id',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '批次详细信息',
                cls:'textfTwo',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        id:'specialBatchApplySecond_id_FH'  	
                    },
                    /*{
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        text: '提交'
                    }*/
                ]
            },
            {
                xtype: 'tabpanel',
                height: '100%',
                cls:'textfTwo',
                items: [
                    {
                        xtype: 'formpanel',
                        title: '批次信息',
                        items: [
                                {
                                    xtype: 'fieldset',
                                    items: [
										{
											id:'LOT_NUM_SBAS',
											xtype: 'textfield',
											label: '申请批次',
											labelWidth:'50%',
											readOnly:true,
										},
										{
											id:'APPLY_TYPE_SBAS',
											xtype: 'textfield',
											label: '申请类别',
											labelWidth:'50%',
											readOnly:true,
										},
										{
											id:'APPLY_REASON_SBAS',
											xtype: 'textfield',
											label: '申请原因',
											cls:'textfTwo',
											labelWidth:'50%',
											readOnly:true,
										},
										{
											id:'APPLY_DATE_SBAS',
											xtype: 'textfield',
											label: '申请日期',
											labelWidth:'50%',
											readOnly:true,
										},
										{
											id:'ENABLE_FLAG_SBAS',
											xtype: 'textfield',
											label: '有效',
											labelWidth:'50%',
											readOnly:true,
										},
										{
											id:'STATUS_MEAN_SBAS',
											xtype: 'textfield',
											label: '行状态',
											cls:'textfTwo',
											labelWidth:'50%',
											readOnly:true,
										},
										{
											id:'APPLY_COMMENTS_SBAS',
											xtype: 'textfield',
											label: '申请说明',
											labelWidth:'50%',
											readOnly:true,
										},
										{
											id:'DEBT_REC_DATE_SBAS',
											xtype: 'textfield',
											label: '承诺收款日期',
											labelWidth:'50%',
											readOnly:true,
										},
										{
											id:'AVG_PRE_RECEIPT_RATE_SBAS',
											xtype: 'textfield',
											label: '预付款收款比例（平均）',
											labelWidth:'50%',
											readOnly:true,
										},
										{
											id:'AVG_TDG_RECEIPT_RATE_SBAS',
											xtype: 'textfield',
											label: '提货款收款比例（平均）',
											labelWidth:'50%',
											readOnly:true,
										},
										{
											id:'ALL_INV_PRICE_SBAS',
											xtype: 'textfield',
											label: '批次仓租合计',
											labelWidth:'50%',
											readOnly:true,
										},
										{
											id:'ALL_INV_DAYS_SBAS',
											xtype: 'textfield',
											label: '批次库存天数（最大）',
											labelWidth:'50%',
											readOnly:true,
										},
										{
											id:'APPLY_REDUCE_PERCENT_SBAS',
											xtype: 'textfield',
											label: '申请减免比例',
											labelWidth:'50%',
											readOnly:true,
										},
										{
											id:'APPROVED_REDUCE_PERCENT_SBAS',
											xtype: 'textfield',
											label: '批准减免比例',
											labelWidth:'50%',
											readOnly:true,
										},
                                    ]
                                }
							
                        ]
                    },
                    {
                        xtype: 'container',
                        title: '单据行',
                        items: [
                            {
                                xtype: 'list',
                                id:'specialBatchApplySecond_id_list',
                                height: '100%',
                                store:'SpecialBatchApplySecondStore',
                                onItemDisclosure: true,
                                itemTpl: [                                   
									'<div>'+
									'<div style="float:left;margin-top:5px">工号:{ELEVATOR_NO}           {EQUIPMENT_NO}</div>'+
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