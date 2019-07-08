Ext.define('HelcOA.view.ForApprovalProcess.BusinessService.litigationApplyandRemove', {
    extend: 'Ext.Panel',
    id: 'sp_litigationApplyandRemove_ID',
    requires: [
               'Ext.Toolbar',
               'Ext.Button',
               'Ext.Spacer',
               'Ext.form.Panel',
               'Ext.form.FieldSet',
               'Ext.field.DatePicker',
               'Ext.picker.Date',
               'Ext.field.TextArea'
           ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'surface_ID',
                title: '诉讼和解审批流程',
                items: [
	                    {
	                        xtype: 'button',
	                        id: 'returnHome_ID',
	                        text: '返回',
	                        ui: 'back'
	                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'idea_ID',
                        text: '下一步'
                    }
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                id: 'fp',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '编号',
                                labelWidth: '40%',
								name: 'fileno',
								id: 'fileno',
                            	readOnly:true,
                            },
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '标题',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入标题',
								name: 'subject',
								id: 'subject'
                            },                            
							{
                                xtype: 'textfield',
                                label: '被诉单位名称',
                                labelWidth: '40%',
                                placeHolder: '请输入被诉单位名称',
								name: 'dwmc',
								id: 'dwmc',
                                required: true
                            },								
							{
                                xtype: 'textfield',
                                label: '对应合同号',
                                labelWidth: '40%',
                                placeHolder: '请输入对应合同号',
								name: 'hth',
                                required: true,
								id: 'hth'
                            },	
							{
                                xtype: 'textfield',
                                label: '买卖合同总价',
                                labelWidth: '40%',
                                placeHolder: '请输入买卖合同总价',
								name: 'htzj1',
								id: 'htzj1'
                            },		
							{
                                xtype: 'textfield',
                                label: '安装合同总价',
                                labelWidth: '40%',
                                placeHolder: '请输入安装合同总价',
								name: 'htzj2',
								id: 'htzj2',
                            	readOnly:true
                            },
							{
                                xtype: 'textfield',
                                label: '货款欠款本金',
                                labelWidth: '40%',
                                placeHolder: '请输入货款欠款本金',
								name: 'qhbj1',
								id: 'qhbj1'
                            },		
							{
                                xtype: 'textfield',
                                label: '工程款欠款本金',
                                labelWidth: '40%',
                                placeHolder: '请输入工程款欠款本金',
								name: 'qhbj2',
								id: 'qhbj2'
                            },	
							{
                                xtype: 'selectfield',
                                id: 'bj',
                                label: '本金减免',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                required: true,
                                options: [
                                    {
                                        text: '是',
                                        value: '是'
                                    },
                                    {
                                        text: '否',
                                        value: '否'
                                    }
                                ]
                            },
							{
                                xtype: 'textfield',
                                label: '本金减免金额',
                                labelWidth: '40%',
                                placeHolder: '请输入本金减免金额',
								name: 'bjje',
								id: 'bjje'
                            },	
							{
                                xtype: 'textfield',
                                label: '违约金',
                                labelWidth: '40%',
                                placeHolder: '请输入违约金',
								name: 'qwyj',
								id: 'qwyj'
                            },				
							{
                                xtype: 'selectfield',
                                id: 'wyj',
                                label: '违约金减免',
                                labelWidth: '40%',
                                labelWrap: true,
                                readOnly : true,
                                required: true,
                                options: [
                                    {
                                        text: '是',
                                        value: '是'
                                    },
                                    {
                                        text: '否',
                                        value: '否'
                                    }
                                ]
                            },
							{
                                xtype: 'textfield',
                                label: '违约金减免金额',
                                labelWidth: '40%',
                                placeHolder: '请输入违约金减免金额',
								name: 'wyjje',
								id: 'wyjje'
                            },
					{
                        xtype: 'fieldset',
                        title: '诉讼成本',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '总额',
                                labelWidth: '40%',
                                placeHolder: '请输入总额',
								name: 'szcb',
								id: 'szcb'
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '其中诉讼费',
                                labelWidth: '40%',
                                placeHolder: '请输入其中诉讼费',
								name: 'szf',
								id: 'szf'
                            },
							{
                                xtype: 'autoTextArea',
                                label: '律师费',
                                labelWidth: '40%',
                                placeHolder: '请输入律师费',
								name: 'lsf',
								id: 'lsf'
                            },
							{
                                xtype: 'autoTextArea',
                                label: '其它',
                                labelWidth: '40%',
                                placeHolder: '请输入其它',
								name: 'qtfe',
								id: 'qtfe'
                            }
                        ]
                    },
					 {   xtype: 'fieldset',
                        title: '',
                        items: [
						    {
                                xtype: 'textfield',
                                label: '承办律师事务所',
                                labelWidth: '40%',
                                placeHolder: '请输入承办律师事务所',
								name: 'lssws',
								id: 'lssws'
                            },
							{
                                xtype: 'textfield',
                                label: '代理律师',
                                labelWidth: '40%',
                                placeHolder: '请输入代理律师',
								name: 'dlls',
								id: 'dlls'
                            },
							{
                                xtype: 'autoTextArea',
                                label: '申请原因及和解意向',
                                labelWidth: '40%',
                                placeHolder: '请输入申请原因及和解意向',
								name: 'reason_textarea',
								id: 'reason_textarea'
                            },
								]
					},
            {
                xtype: 'fieldset',
                hidden: true,
                items: [
                    {
                        xtype: 'textfield',
                        id: 'conds',
                        name: 'conds'
                    },
                    {
                        xtype: 'textfield',
                        id: 'userid',
                        name: 'userid'
                    },
                    {
                        xtype: 'textfield',
                        id: 'type',
                        name: 'type'
                    },
                    {
                        xtype: 'textfield',
                        id: 'username',
                        name: 'username'
                    },
                    {
                        xtype: 'textfield',
                        id: 'node',
                        name: 'node'
                    },
                    {
                        xtype: 'textfield',
                        id: 'ctime',
                        name: 'ctime'
                    },
                    {
                        xtype: 'textfield',
                        id: 'piid',
                        name: 'piid'
                    },
                    {
                        xtype: 'textfield',
                        id: 'processname',
                        name: 'processname'
                    },
                    {
                        xtype: 'textfield',
                        id: 'curauthor',
                        name: 'curauthor'
                    },
                    {
                        xtype: 'textfield',
                        id: 'dealmen',
                        name: 'dealmen'
                    },
                    {
                        xtype: 'textfield',
                        id: 'ygbh',
                        name: 'ygbh'
                    },
                    {
                        xtype: 'textfield',
                        id: 'form',
                        name: 'form'
                    },
                    {
                        xtype: 'textfield',
                        id: 'arcpath',
                        name: 'arcpath'
                    },
                    {
                        xtype: 'textfield',
                        id: 'arcdate',
                        name: 'arcdate'
                    },
                    {
                        xtype: 'textfield',
                        id: 'idea',
                        name: 'idea'
                    },
                    {
                        xtype: 'textfield',
                        id: 'endprocessdate',
                        name: 'endprocessdate'
                    },
                    {
                        xtype: 'textfield',
                        id: 'audit_list',
                        name: 'audit_list'
                    },
                    {
                        xtype: 'textfield',
                        id: 'taskid',
                        name: 'taskid'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'firflow',
                    	name: 'firflow'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'dept',
                    	name: 'dept'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'agentman',
                    	name: 'agentman'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'createdate',
                    	name: 'createdate'
                    },
		            {
		            	xtype: 'textfield',
		            	id: 'ext1',
		            	name: 'ext1',
				    },
                    {
                        xtype: 'textfield',
                        id: 'mast',
                        name: 'mast'
                    }
                    ]     	
            }
        ]
    }
]
}
]
}

});