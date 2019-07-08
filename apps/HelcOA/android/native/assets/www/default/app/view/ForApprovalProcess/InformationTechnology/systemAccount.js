
/* JavaScript content from app/view/ForApprovalProcess/InformationTechnology/systemAccount.js in folder common */
/**
 * 系统网络账号权限申请流程单
 */
Ext.define('HelcOA.view.ForApprovalProcess.InformationTechnology.systemAccount', {
    extend: 'Ext.Panel',
    id: 'sp_systemAccount_ID',
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
								name: 'subject',
								id: 'subject',
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
                                label: '申请人',
                                labelWidth: '40%',
                                placeHolder: '请输入联络人姓名',
								name: 'agentman',
								id: 'agentman',
                            	readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '申请时间',
                                labelWidth: '40%',
								name: 'createdate',
								id: 'createdate',
                            	readOnly:true,
                            },
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
                                label: '联系电话-分公司人员加手机号',
                                labelWidth: '40%',
                                placeHolder: '请输入联系电话-分公司人员加手机号',
								name: 'phone',
								id: 'phone',
								required: true,
								readOnly:true,
                            },
							{
								xtype: 'fieldset',
								title: '',
								items: [
									{
										xtype: 'selectfield',
										id: 'checkv',
										label: '用户类型',
										labelWidth: '40%',
										placeHolder: '请选择用户类型',
										options: [
													{
														text: '',
														value: ''
													},
											{
												text: '内网用户',
												value: '内网用户'
											},
											{
												text: '外网用户',
												value: '外网用户'
											},
											{
												text: 'ISP',
												value: 'ISP'
											},
											{
												text: '供应商',
												value: '供应商'
											}
										]
									}
								]
							},
                        ]
                    },
							{
								xtype: 'fieldset',
								title: '',
								items: [
										{
											xtype: 'textfield',
											label: '使用人员工编号',
											labelWidth: '40%',
											placeHolder: '请输入使用人员工编号',
											required:true,
											readOnly:true,
											name: 'syrbh2',
											id: 'syrbh2',
										}, 
										{
											xtype: 'textfield',
											label: '使用人员工名字',
											labelWidth: '40%',
											placeHolder: '请输入使用人员工名字',
											required:true,
											readOnly:true,
											name: 'empname',
											id: 'empname',
										},  
								        
									{
										xtype: 'selectfield',
										title:'',
										id: 'sqtype',
										label: '申请类型',
										labelWidth: '40%',
										readOnly:true,
										placeHolder: '请选择使用申请类型',
										options: [
													{
														text: '',
														value: ''
													},
											{
												text: '新增',
												value: '新增'
											},
											{
												text: '变更',
												value: '变更'
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
										xtype: 'textfield',
										label: '使用人员工部门',
										labelWidth: '40%',
										placeHolder: '请输入使用人员工部门',
										name: 'usedep',
										readOnly:true,
										id: 'usedep',
									},
									{
										xtype: 'textfield',
										label: '使用人岗位',
										labelWidth: '40%',
										placeHolder: '请输入使用人岗位',
										name: 'gangwei',
										id: 'gangwei',
										readOnly:true,
									},
									{
										xtype: 'textfield',
										label: '供应商编号',
										labelWidth: '40%',
										placeHolder: '请输入供应商编号',
										name: 'supplyid',
										id: 'supplyid',
										readOnly:true,
									},
									{
										xtype: 'textfield',
										label: '供应商名称',
										labelWidth: '40%',
										placeHolder: '请输入供应商名称',
										name: 'supplyname',
										id: 'supplyname',
										readOnly:true,
									},
									{
								xtype: 'fieldset',
								instructions:'申请使用日立电梯(中国)有限公司信息系统的用户必须遵守相关规定。若申请成功，内网和外网用户帐号为员工编号，供应商和ISP用户帐号为BA+供应代码后四位+两位流水号组成。拥有帐号的用户不得将自己的帐号密码透露给他人，因有意或无意泄露自己个人帐号密码而导致的损失将由其本人及监督人员承担。第一次登陆的用户，请及时更改密码。 信息中心 1．如不是供应商的不用填写，在完成其他必输项（红色星点）的填写后，提交文档后会将“供应商编号和名称”这两项自动屏蔽掉.2．以下系统可按各自的岗位及工作需求申请开通（可单选或多选）。申请帐号取消，请在申请用途上填写取消系统帐号的名称及人员的姓名。3．必须在“权限说明”中填写所需权限的相关必要的信息内容',
								title: '',
								items: [
									{
										xtype: 'panel',
										layout: 'hbox',

										items: [
											{
												xtype: 'autoTextArea',
												id:'zhtype',
												width: '85%',
												labelWidth: '48%',
												label: '申请类型',
												placeHolder: '请选择申请类型',
												readOnly:true,
												required: true,
											}
										]
									},
									{
										xtype: 'panel',
										layout: 'hbox',

										items: [
											{
												xtype: 'autoTextArea',
												id:'zhtype1',
												width: '85%',
												labelWidth: '48%',
												label: 'RDMP',
												placeHolder: '请选择RDMP研发平台',
												readOnly:true
											},
										]
									},
									{
										xtype: 'fieldset',
										title: '',
										items: [
											{
												xtype: 'selectfield',
												id: 'siebcomp',
												label: '选择公司',
												labelWidth: '40%',
												placeHolder: '请选择公司',
												title:'',
												readOnly:true,
												options: [
															{
																text: '',
																value: ''
															},
													{
														text: '总部',
														value: '总部'
													},
													{
														text: '分公司',
														value: '分公司'
													}
												]
											}
										]
									},
									{
										xtype: 'panel',
										layout: 'hbox',

										items: [
											{
												xtype: 'autoTextArea',
												id:'zhtype3',
												width: '85%',
												labelWidth: '48%',
												label: '财务预算系统',
												placeHolder: '请选择财务预算系统',
												readOnly:true
											}
										]
									},
									{
										xtype: 'panel',
										layout: 'hbox',

										items: [
											{
												xtype: 'autoTextArea',
												id:'zhtype2',
												width: '85%',
												labelWidth: '48%',
												label: 'E-HR系统',
												placeHolder: '请选择E-HR系统',
												readOnly:true
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
										id: 'sysname',
										label: '系统选择',
										labelWidth: '40%',
										placeHolder: '请选择系统',
										title:'',
										readOnly:true,
										options: [
													{
														text: '',
														value: ''
													},
											{
												text: '报价系统',
												value: '报价系统'
											},
											{
												text: '工装(模)管理系统',
												value: '工装(模)管理系统'
											},
											{
												text: '工程部(access)系统',
												value: '工程部(access)系统'
											},
											{
												text: '合同销售系统',
												value: '合同销售系统'
											},
											{
												text: '绩效考勤系统',
												value: '绩效考勤系统'
											},
											{
												text: '计价系统',
												value: '计价系统'
											},
											{
												text: '配件管理系统',
												value: '配件管理系统'
											},
											{
												text: '人力资源系统',
												value: '人力资源系统'
											},
											{
												text: '设备管理系统',
												value: '设备管理系统'
											},
											{
												text: '通用查询系统',
												value: '通用查询系统'
											},
											{
												text: '宣传资料管理系统',
												value: '宣传资料管理系统'
											},
											{
												text: '医疗管理系统',
												value: '医疗管理系统'
											},
											{
												text: '工程MUG系统',
												value: '工程MUG系统'
											},
											{
												text: '维保销售系统',
												value: '维保销售系统'
											},
											{
												text: '广州司(access)系统',
												value: '广州司(access)系统'
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
										id: 'erpcomp',
										label: '选择公司',
										labelWidth: '40%',
										placeHolder: '请选择公司',
										title:'',
										readOnly:true,
										options: [
											{
												text: '',
												value: ''
											},
											{
												text: '总部',
												value: '总部'
											},
											{
												text: '分公司',
												value: '分公司'
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
										id: 'zdtype',
										label: '选择账号',
										labelWidth: '40%',
										placeHolder: '请选择账号',
										title:'',
										readOnly:true,
										options: [
													{
														text: '',
														value: ''
													},
											{
												text: '旧终端账号',
												value: '旧终端账号'
											},
											{
												text: 'XenApp账号',
												value: 'XenApp账号'
											},
											{
												text: 'Xendesktop账号',
												value: 'Xendesktop账号'
											}
										]
									}
								]
							},
							{
								xtype : 'textfield',
								label : '职能组',
								labelWidth : '40%',
								id : 'znz',
								name : 'znz',
								value:'',
								placeHolder : '请输入职能组',
								readOnly:true,
							},
							{
								xtype: 'textfield',
								label: 'Windows帐号',
								labelWidth: '40%',
								placeHolder: '请输入Windows帐号',
								name: 'winact',
								id: 'winact',
								readOnly:true,
							},
							{
								xtype: 'textfield',
								label: '申请用途',
								labelWidth: '40%',
								required: true,
								placeHolder: '请输入申请用途',
								name: 'sqyy1',
								id: 'sqyy1',
								readOnly:true,
							},
							{
								xtype: 'fieldset',
								title: '申请ERP工作职责(选择ERP系统或Siebel系统帐号时必需填职责)',
								items: [
									{
								xtype: 'textfield',
								instructions:'注意：分公司用户(不含网络工厂)请填写分公司简称',
								label: '部门',
								labelWidth: '40%',
								placeHolder: '请输入部门',
								name: 'zzdep',
								id: 'zzdep',
								readOnly:true,
									}
								]
							},
							{
								xtype: 'textfield',
								label: '所需权限简述',
								labelWidth: '40%',
								placeHolder: '请输入所需权限简述',
								name: 'sqyy2',
								id: 'sqyy2',
								readOnly:true,
							},
								{
								xtype: 'textfield',
								instructions:'说明:1、供应商和ISP账号的申请人必须先确认供应商是否已交清相关费用,并在申请用途中说明以便系统实施科确认! 2、选择非ERP系统时，可以用附件形式提交申请的权限明细，谢谢！'
								},
								{
								xtype: 'fieldset',
								title: '申请部门评估(请按提示问题详细填写)： ',
								items: [
								{
								xtype: 'textfield',
								label: '申请系统的必要性',
								labelWidth: '40%',
								placeHolder: '请输入申请系统的必要性',
								name: 'sqdepyijian',
								id: 'sqdepyijian',
								readOnly:true,
								},
								{
								xtype: 'textfield',
								label: '所需要权限',
								labelWidth: '40%',
								placeHolder: '请输入所需要权限',
								name: 'sqdepyijian1',
								id: 'sqdepyijian1',
								readOnly:true,
								},
								{
								xtype: 'textfield',
								label: '申请人系统操作培训情况',
								labelWidth: '40%',
								placeHolder: '请输入申请人系统操作培训情况',
								name: 'sqdepyijian2',
								id: 'sqdepyijian2',
								readOnly:true,
								}
								]
							},
								{
								xtype: 'fieldset',
								title: '系统主管部门评估(请认真填写申请部门评估相关信息,否则将不能提交！):',
								items: [
								{
								xtype: 'textfield',
								label: '对管理流程造成的影响',
								labelWidth: '40%',
								placeHolder: '请输入对管理流程造成的影响',
								name: 'sysmanyijian',
								id: 'sysmanyijian',
								readOnly:true,
								},
								{
								xtype: 'textfield',
								label: '使用系统相关限制条件',
								labelWidth: '40%',
								placeHolder: '请输入使用系统相关限制条件',
								name: 'sysmanyijian1',
								id: 'sysmanyijian1',
								readOnly:true,
								},
								{
								xtype: 'textfield',
								label: '申请的权限使用范围',
								labelWidth: '40%',
								placeHolder: '请输入申请的权限使用范围',
								name: 'sysmanyijian2',
								id: 'sysmanyijian2',
								readOnly:true,
								}
								]
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
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'needzc',
                    	name: 'needzc'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'ext1',
                    	name: 'ext1'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'plmname',
                    	name: 'plmname'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'isplm',
                    	name: 'isplm'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'sysmaname',
                    	name: 'sysmaname'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'depid',
                    	name: 'depid'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'corp',
                    	name: 'corp'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'gwlist',
                    	name: 'gwlist'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'deplist',
                    	name: 'deplist'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'other_name',
                    	name: 'other_name'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'getname',
                    	name: 'getname'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'gettypenum',
                    	name: 'gettypenum'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'qwe',
                    	name: 'qwe'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'getaa',
                    	name: 'getaa'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'zzdepp',
                    	name: 'zzdepp'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'other_name',
                    	name: 'other_name'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'otherduty',
                    	name: 'otherduty'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'tiaojian01',
                    	name: 'tiaojian01'
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

});