
/* JavaScript content from app/view/compact/CompactHeadPanel.js in folder common */
Ext.define('HelcPDA.view.compact.CompactHeadPanel', {
	id:'CompactHeadPanel',
    extend: 'Ext.Panel',

    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.Label',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.field.Spinner',
        'Ext.field.TextArea'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '合同头详细信息',
                items: [
                    {
                        xtype: 'button',
                        id:'backToSearchPanel',
                        ui: 'back',
                        text: '返回'
                    },
                ]
            },
            {
                xtype: 'tabpanel',
                id: 'compactHead_tab',
                height: '100%',
                items: [
                    {
                        xtype: 'container',
                        id: 'compactHead_con_info',
                        title: '查看数据',
                        items: [
                            {
                                xtype: 'formpanel',
                                height: '100%',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        items: [
												{
												    xtype: 'textfield',
												    label: '合同编码',
												    labelWidth: '40%',
												    id:'AGREE_NUM',
												    value: [
												    ],
												    readOnly: true
												},
												{
												xtype: 'textfield',
												label: '名称',
												labelWidth: '40%',
												id:'AGREE_NAME',
												value: [
												],
												readOnly: true
												},
												{
												xtype: 'textfield',
												label: '客户ID',
												labelWidth: '40%',
												id:'ACCOUNT_ID',
												value: [
												],
												readOnly: true
												},
												{
												xtype: 'textfield',
												label: '合同签订日期',
												labelWidth: '40%',
												id:'SIGN_DATE',
												value: [
												],
												readOnly: true
												},
												{
												xtype: 'textfield',
												label: '合同类型',
												labelWidth: '40%',
												id:'AGREE_TYPE',
												value: [
												],
												readOnly: true
												},
												{
												xtype: 'textfield',
												label: '合同状态',
												labelWidth: '40%',
												id:'STATUS',
												value: [
												],
												readOnly: true
												},
												{
												xtype: 'textfield',
												label: '业务分类',
												labelWidth: '40%',
												id:'BUSINESS_TYPE',
												value: [
												],
												readOnly: true
												},
												{
												xtype: 'textfield',
												label: '保养周期',
												labelWidth: '40%',
												id:'MAINTAIN_CYCLE',
												value: [
												],
												readOnly: true
												},
												{
												 xtype: 'textfield',
												 label: '急修到达时间',
												 labelWidth: '40%',
												 id:'URGENT_REQ_TIME',
												 value: [
												 ],
												 readOnly: true
												},
												{
												  xtype: 'textfield',
												  label: '最终客户',
												  labelWidth: '40%',
												  id:'FINAL_ACCOUNT',
												  value: [
												  ],
												  readOnly: true
												},
												{
												   xtype: 'textfield',
												   label: '合同备注',
												   labelWidth: '40%',
												   id:'COMMENTS',
												   value: [
												   ],
												   readOnly: true,
												},{
													//存放SBL_ROW_ID
													xtype:'hiddenfield',
				                    				id:'SBL_ROW_ID',
				                    				value:[]
												}
	                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        id: 'compactHead_con_row',
                        title: '合同行',
                        height:'100%',
                        items:[{
                        	xtype:'panel',
                        	height:'100%',
                        	items:[{
                        		xtype:'fieldset',
                        		layout:{
                        			type:'vbox',
                        			flex:1
                        		},
                        		items:[{
                        	         xtype:'list',
                        	         height:900,
                        	         id:'compactBodyList',
                        	         store:'CompactBodyStore',
                        	         itemTpl: [
                                               '<div>{AGREE_NUM}/{AGREE_ID}<div>'
                                           ],
                        	    
                        		}
                        		]
                        	}]
                        	}],
                    }
                ]
            }
        ]
    },
});



