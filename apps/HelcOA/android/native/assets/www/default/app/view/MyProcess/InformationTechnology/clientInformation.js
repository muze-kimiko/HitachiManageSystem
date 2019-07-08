
/* JavaScript content from app/view/MyProcess/InformationTechnology/clientInformation.js in folder common */
/**
 * 客户信息登记表
 */
Ext.define('HelcOA.view.MyProcess.InformationTechnology.clientInformation', {
    extend: 'Ext.Panel',
    id: 'wdlc_clientInformation_ID',
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
                id: 'wdlc_surface_ID',
                items: [
	                    {
	                        xtype: 'button',
	                        id: 'wdlc_returnMyProcess',
	                        text: '返回',
	                        ui: 'back'
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
								name: 'subject',
								id: 'subject',
                            	required: true,
                            	readOnly:true
                            },
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
						    {
                                xtype: 'textfield',
                                label: '申请部门',
                                labelWidth: '40%',
                                placeHolder: '请输入申请部门',
								name: 'dept',
								id: 'dept',
                            	readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '申请人',
                                labelWidth: '40%',
                                placeHolder: '请输入申请人',
								name: 'agentman',
								id: 'agentman',
                            	readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '申请日期',
                                labelWidth: '40%',
								name: 'createdate',
								id: 'createdate',
                            	readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '要求完成日期',
                                labelWidth: '40%',
								name: 'e_date',
								id: 'e_date',
								readOnly:true
                            }
                        ]
                    },
							{
								xtype: 'fieldset',
								title: '登记类型',
								items: [
									{
										xtype: 'selectfield',
										id: 'sqtype',
										label: '登记类型',
										labelWidth: '40%',
										placeHolder: '请选择登记类型',
										required: true,
										readOnly:true,
										options: [										          
											{
												text: '',
												value: ''
											},     
											{
												text: '新增客户',
												value: '新增客户'
											},
											{
												text: '修改客户表头信息（修改单位客户名称需提供工商资料变更文件的复印件）',
												value: '修改客户表头信息（修改单位客户名称需提供工商资料变更文件的复印件）'
											},
											{
												text: '失效客户',
												value: '失效客户'
											},
											{
												text: '仅失效本组织客户',
												value: '仅失效本组织客户'
											}
											
										]
									},
									{
										xtype: 'textfield',
										label: '使用组织',
										labelWidth: '40%',
										placeHolder: '请输入使用组织',
										name: 'organize',
										id: 'organize',
										required: true,
										readOnly:true
									},
									{
										xtype: 'textfield',
										label: '客户编码',
										labelWidth: '40%',
										placeHolder: '请输入客户编码',
										name: 'supplycode',
										id: 'supplycode',
										required: true,
										readOnly:true
									}
									
								]
							},
							{
								xtype: 'fieldset',
								title: '表头信息',
								items: [
									{
										xtype: 'textfield',
										label: '客户名称',
										labelWidth: '40%',
										placeHolder: '请输入客户名称',
										name: 'supplyname',
										id: 'supplyname',
										required: true,
										readOnly:true
									},
									{
										xtype: 'textfield',
										label: '原客户名称',
										labelWidth: '40%',
										placeHolder: '请输入原客户名称',
										name: 'ykhmc',
										id: 'ykhmc',
										readOnly:true
									},
									{
										xtype: 'textfield',
										label: '税务登记号(国税)',
										labelWidth: '40%',
										placeHolder: '请输入税务登记号(国税)',
										name: 'taxid',
										id: 'taxid',
										required: true,
										readOnly:true,
									},
									{
										xtype: 'textfield',
										label: '税务登记号(地税)',
										labelWidth: '40%',
										placeHolder: '请输入税务登记号(地税)',
										name: 'taxidds',
										id: 'taxidds',
										required: true,
										readOnly:true,
									},
									{
										xtype: 'fieldset',
										title: '',
									items: [
									{
										xtype: 'selectfield',
										id: 'ifgl',
										label: '是否关联客户',
										labelWidth: '40%',
										placeHolder: '请选择是否关联客户',
										readOnly:true,
										options: [										          
											{
												text: '',
												value: ''
											}, 
											{
												text: '是',
												value: '是'
											},
											{
												text: '否',
												value: '否'
											}
										]
									}
								]
									},
									{
										xtype: 'fieldset',
										title: '',
								items: [
									{
										xtype: 'selectfield',
										id: 'khtype',
										label: '客户类型',
										labelWidth: '40%',
										placeHolder: '请选择客户类型',
										required: true,
										readOnly:true,
										options: [
											{
												text: '',
												value: ''
											}, 
											{
												text: '内部',
												value: '内部'
											},
											{
												text: '外部',
												value: '外部'
											}
										]
									}
								]									
									},
									{
										xtype: 'fieldset',
										title: '',
								items: [
									{
										xtype: 'selectfield',
										id: 'khfl',
										label: '客户分类',
										labelWidth: '40%',
										placeHolder: '请选择客户分类',
										readOnly:true,
										options: [
											{
												text: '',
												value: ''
											}, 
											{
												text: '国内合同客户',
												value: '国内合同客户'
											},
											{
												text: '国外合同客户',
												value: '国外合同客户'
											}
										]
									}
								]									
									},
									{
										xtype: 'fieldset',
										title: '',
								items: [
									{
										xtype: 'selectfield',
										id: 'khleib',
										label: '客户类别',
										labelWidth: '40%',
										placeHolder: '请选择客户类别',
										required: true,
										readOnly:true,
										options: [
											{
												text: '',
												value: ''
											}, 
											{
												text: '客户',
												value: '客户'
											},
											{
												text: '直接保养客户',
												value: '直接保养客户'
											},
											{
												text: '属下网点',
												value: '属下网点'
											},
											{
												text: '其他',
												value: '其他'
											},
											{
												text: '营分司',
												value: '营分司'
											},
											{
												text: '制造网络',
												value: '制造网络'
											},
											{
												text: '日立都市集团关联企业(维保工具及部件）',
												value: '日立都市集团关联企业(维保工具及部件）'
											}
										]
									}
								]									
									},
							{
								xtype: 'fieldset',
								title: '表体消息',	
								items: [
							{
								xtype : 'textfield',
								label : '客户地址',
								labelWidth : '40%',
								id : 'supplyaddr',
								name : 'supplyaddr',
								required: true,
								readOnly:true,
								value:'',
								placeHolder : '请输入客户地址'
							},
							{
								xtype: 'textfield',
								label: '银行账户及账号',
								labelWidth: '40%',
								placeHolder: '请输入银行账户及账号',
								name: 'supplybank',
								id: 'supplybank',
								required: true,
								readOnly:true
							},
							{
								xtype: 'textfield',
								label: '国家(地区)',
								labelWidth: '40%',
								required: true,
								readOnly:true,
								placeHolder: '请输入国家(地区)',
								name: 'country',
								id: 'country',
							},
							{
								xtype: 'textfield',
								label: '邮编',
								labelWidth: '40%',
								required: true,
								readOnly:true,
								placeHolder: '请输入邮编',
								name: 'postcode',
								id: 'postcode',
							},
							{
								xtype: 'textfield',
								label: '省份',
								labelWidth: '40%',
								required: true,
								readOnly:true,
								placeHolder: '请输入省份',
								name: 'prov',
								id: 'prov',
							},
							{
								xtype: 'textfield',
								label: '城市',
								labelWidth: '40%',
								required: true,
								readOnly:true,
								placeHolder: '请输入城市',
								name: 'city',
								id: 'city',
							},
							{
								xtype: 'textfield',
								label: '联系人',
								labelWidth: '40%',
								placeHolder: '请输入联系人',
								name: 'lxr',
								required: true,
								readOnly:true,
								id: 'lxr',
							},
							{
								xtype: 'textfield',
								label: '电话(含区号)',
								labelWidth: '40%',
								required: true,
								readOnly:true,
								placeHolder: '请输入电话(含区号)',
								name: 'phone',
								id: 'phone',
							},
							{
								xtype: 'textfield',
								label: '传真(含区号)',
								labelWidth: '40%',
								required: true,
								readOnly:true,
								placeHolder: '请输入传真(含区号)',
								name: 'fax',
								id: 'fax',
							},
							{
								xtype: 'textfield',
								label: '电子邮件',
								labelWidth: '40%',
								readOnly:true,
								placeHolder: '请输入电子邮件',
								name: 'email',
								id: 'email',
							},							
							{
								xtype: 'textfield',
								label: '备注',
								readOnly:true,
								labelWidth: '40%',
								placeHolder: '请输入备注',
								name: 'remark',
								id: 'remark',
							},
                        ]
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
                    }
                ]
            }
        ]
            }
	]
	
    }
}


);