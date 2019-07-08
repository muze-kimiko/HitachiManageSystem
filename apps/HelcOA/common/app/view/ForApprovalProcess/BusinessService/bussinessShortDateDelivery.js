Ext.define('HelcOA.view.ForApprovalProcess.BusinessService.bussinessShortDateDelivery', {
    extend: 'Ext.Panel',
    id: 'sp_bussinessShortDateDelivery_id',
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
                title: '短交货期流程',
                items: [
                        {
                        	xtype: 'button',
                            iconCls: 'home',
                            id: 'returnHome_ID'
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
                                label: '申报单位',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入申报单位',
								name: 'subject',
                            	readOnly:true,
								id: 'subject'
                            },                            
							{
                                xtype: 'textfield',
                                label: '联系电话',
                                labelWidth: '40%',
                                placeHolder: '请输入联系电话',
								name: 'phone',
                            	readOnly:true,
								id: 'phone'
                            },	
                            {
                                xtype: 'textfield',
                                label: '所属区域',
                                labelWidth: '40%',
								name: 'ssqy',
								placeHolder: '请输入所属区域',
                            	readOnly:true,
								id: 'ssqy'
								
                            },	
							{
                                xtype: 'textfield',
                                label: '经销单位',
                                labelWidth: '40%',
                                placeHolder: '请输入经销单位',
								name: 'jxdw',
                            	readOnly:true,
								id: 'jxdw'
                            },
							{
								xtype : 'textfield',
								label : '申请交货时间',
								id : 'jhdate',
								labelWidth : '40%',
								placeHolder : '请输入申请交货时间',
								dateFormat : 'Y-m-d',
                            	readOnly:true,
								listeners : {
									focus : function() {
										initDate2(
												'jhdate',
												'申请交货时间');
									}
								}
							},
							{
								xtype : 'textnumfield',
								label : '合同买方',
								id : 'htmf',
								name : 'htmf',
                            	readOnly:true,
								placeHolder : '请输入合同买方',
								labelWidth : '40%'
							},                                          
							{
                                xtype: 'textfield',
                                label: '合同号',
                                required: true,
                                labelWidth: '40%',
                            	readOnly:true,
                                placeHolder: '请输入合同号',
								name: 'htno',
								id: 'htno'
                            },
							{
                                xtype: 'textfield',
                                label: '所需产品型号规格',
                                required: true,
                                labelWidth: '40%',
                            	readOnly:true,
                                placeHolder: '请输入所需产品型号规格',
								name: 'xhgg',
								id: 'xhgg'
                            },	
							{
                                xtype: 'textfield',
                                label: '需求总量',
                                labelWidth: '40%',
                            	readOnly:true,
                                placeHolder: '请输入需求总量',
								name: 'sqzl',
								id: 'sqzl'
                            }
							]
							},
							{
							xtype: 'fieldset',
							title: '经办人申报内容申报内容属性',
							items: [
							{
			                                xtype: 'panel',
			                                layout: 'hbox',
			                                items: [
			                                    {
			                                        xtype: 'autoTextArea',
			                                        id:'checkbox',
			                                        width: '85%',
			                                        labelWidth: '48%',
			                                        label: '洽谈商定',
			                                        placeHolder: '请选择洽谈商定',
			                                        readOnly:true
			                                    },
			                                    {
			                                        xtype: 'button',
			                                        id: 'Deliver_sbtype',
			                                        height: 41,
			                                        style: 'border:0;',
			                                        width: '15%',
			                                        iconCls: 'search',
			                                        text: '',
			                                    }
			                                ]
			                            },	
										{
			                                xtype: 'panel',
			                                layout: 'hbox',
			                                items: [
			                                    {
			                                        xtype: 'autoTextArea',
			                                        id:'checkbox2',
			                                        width: '85%',
			                                        labelWidth: '48%',
			                                        label: '投标项目',
			                                        placeHolder: '请选择投标项目',
			                                        readOnly:true
			                                    },
			                                    {
			                                        xtype: 'button',
			                                        id: 'Deliver_sbtype2',
			                                        height: 41,
			                                        style: 'border:0;',
			                                        width: '15%',
			                                        iconCls: 'search',
			                                        text: '',
			                                    }
			                                ]
			                            },	
			                            {
			                                xtype: 'panel',
			                                layout: 'hbox',
			                                items: [
			                                    {
			                                        xtype: 'autoTextArea',
			                                        id:'checkbox3',
			                                        width: '85%',
			                                        labelWidth: '48%',
			                                        label: '合同签订',
			                                        placeHolder: '请选择合同签订',
			                                        readOnly:true
			                                    },
			                                    {
			                                        xtype: 'button',
			                                        id: 'Deliver_sbtype3',
			                                        height: 41,
			                                        style: 'border:0;',
			                                        width: '15%',
			                                        iconCls: 'search',
			                                        text: '',
			                                    }
			                                ]
			                            },	
			                      
	                                    {
		                                    xtype: 'selectfield',
		                                    id: 'sendmobile',
		                                    name: 'sendmobile',
		                                    label: '是否营公司：',
		                                    labelWidth: '40%',
		                                    labelWidth: '40%',
		                                    placeHolder: '请选择是否营公司',
		                                    options: [
		                                              {
		                                                  text: '否',
		                                                  value: '否'
		                                              },
		                                              {
		                                                  text: '是',
		                                                  value: '是'
		                                              }
		                                          ]
		                                    },						
							{
								xtype : 'textfield',
								label : '要求回复时间',
								id : 'reqdate',
								labelWidth : '40%',
                            	readOnly:true,
								placeHolder : '请输入要求回复时间',
								dateFormat : 'Y-m-d',
								listeners : {
									focus : function() {
										initDate2(
												'reqdate',
												'要求回复时间');
									}
								}
							},
							{
                                xtype: 'autoTextArea',
                                label: '意见',
                                labelWidth: '40%',
                            	readOnly:true,
                                placeHolder: '请输入意见',
								name: 'textarea_textarea',
								id: 'textarea_textarea'
                            }
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
		            	id: 'ext1',
		            	name: 'ext1',
				    },
                    {
                        xtype: 'textfield',
                        id: 'mast',
                        name: 'mast'
                    },
                    {
                        xtype: 'textfield',
                        id: 'createdate',
                        name: 'createdate'
                    },
                    {
                        xtype: 'textfield',
                        id: 'audit_list',
                        name: 'audit_list'
                    }
                    ]     	
            }
        ]
    }
]
}
});