
/* JavaScript content from app/view/ForApprovalProcess/InformationTechnology/supplyment.js in folder common */
/*Sured by QiuXL 20170612*/
Ext.define('HelcOA.view.ForApprovalProcess.InformationTechnology.supplyment', {
	extend : 'Ext.Panel',
	id : 'sp_supplyment_ID',
	requires : ['Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea'],
	config : {
		layout : 'vbox',
		items : [{
				xtype : 'toolbar',
				docked : 'top',
				id : 'surface_ID',
				title : '供应商信息登记表',
				items : [{
						xtype : 'button',
						id : 'returnHome_ID',
						text : '返回',
						ui : 'back'
					}, {
						xtype : 'spacer'
					}, {
						xtype : 'button',
						id : 'idea_ID',
						text : '下一步'
					}
				]
			}, {
				xtype : 'formpanel',
				flex : 1,
				id : 'fp',
				items : [{
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'textfield',
								label : '编号',
								labelWidth : '40%',
								name : 'fileno',
								id : 'fileno',
								readOnly : true,
							}, ]
					}, {
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'textfield',
								label : '标题',
								labelWidth : '40%',
								name : 'subject',
								id : 'subject',
								readOnly : true,
							}, ]
					}, {
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'textfield',
								label : '申请部门',
								labelWidth : '40%',
								name : 'dept',
								id : 'dept',
								readOnly : true,
							}, {
								xtype : 'textfield',
								label : '申请人',
								labelWidth : '40%',
								name : 'agentman',
								id : 'agentman',
								readOnly : true,
							}, {
								xtype : 'textfield',
								label : '申请日期',
								labelWidth : '40%',
								name : 'createdate',
								id : 'createdate',
								readOnly : true,
							}, {
								xtype : 'textfield',
								label : '要求完成日期',
								labelWidth : '40%',
								name : 'e_date',
								id : 'e_date',
								readOnly : true,
							}
						]
					}, {
						xtype : 'fieldset',
						title : '登记类型',
						items : [{
								xtype : 'textfield',
								id : 'sqtype',
								label : '登记类型',
								labelWidth : '40%',
								placeHolder : '请选择登记类型',
								readOnly : true,
							}
						]
					}, {
						xtype : 'fieldset',
						title : '表头信息',
						items : [{
								xtype : 'textfield',
								label : '使用组织',
								labelWidth : '40%',
								placeHolder : '请输入使用组织',
								name : 'organize',
								id : 'organize',
								readOnly : true,
							}, {
								xtype : 'textfield',
								label : '供应商编码',
								labelWidth : '40%',
								placeHolder : '请输入供应商编码',
								name : 'supplycode',
								id : 'supplycode',
								readOnly : true,
							}, {
								xtype : 'textfield',
								label : '供应商名称',
								labelWidth : '40%',
								placeHolder : '请输入供应商名称',
								name : 'supplyname',
								id : 'supplyname',
								readOnly : true,
							}, {
								xtype : 'textfield',
								label : '原供应商名称',
								labelWidth : '40%',
								placeHolder : '请输入原供应商名称',
								name : 'ysupplyname',
								id : 'ysupplyname',
								readOnly : true,
							}, {
								xtype : 'textfield',
								label : '国家税务登记号',
								labelWidth : '40%',
								readOnly : true,
								placeHolder : '请输入国家税务登记号',
								name : 'taxid',
								id : 'taxid',
							}, {
								xtype : 'fieldset',
								title : '',
								items : [{
										xtype : 'textfield',
										id : 'gyslx',
										label : '供应商类型',
										labelWidth : '40%',
										readOnly : true,
									}
								]
							}, {
								xtype : 'fieldset',
								title : '',
								items : [{
										xtype : 'textfield',
										id : 'gcflag',
										label : '是否工程服务商',
										labelWidth : '40%',
										readOnly : true,
									}
								]
							}, {
								xtype : 'fieldset',
								title : '表体消息',
								items : [{
										xtype : 'textfield',
										label : '供应商地点',
										labelWidth : '40%',
										id : 'supplyaddr',
										name : 'supplyaddr',
										required : true,
										readOnly : true,
										value : '',
										placeHolder : '请输入供应商地点'
									}, {
										xtype : 'textfield',
										label : '供应商地址',
										labelWidth : '40%',
										placeHolder : '请输入供应商地址',
										name : 'supplyaddress',
										id : 'supplyaddress',
										required : true,
										readOnly : true,
									}, {
										xtype : 'textfield',
										label : '供应商开户银行',
										labelWidth : '40%',
										required : true,
										readOnly : true,
										placeHolder : '请输入供应商开户银行',
										name : 'supplybank',
										id : 'supplybank',
									}, {
										xtype : 'textfield',
										label : '开户行账户',
										labelWidth : '40%',
										required : true,
										readOnly : true,
										placeHolder : '请输入开户行账户',
										name : 'supplyacount',
										id : 'supplyacount',
									}, {
										xtype : 'textfield',
										label : '省份',
										labelWidth : '40%',
										required : true,
										readOnly : true,
										placeHolder : '请输入省份',
										name : 'prov',
										id : 'prov',
									}, {
										xtype : 'textfield',
										label : '城市',
										labelWidth : '40%',
										required : true,
										readOnly : true,
										placeHolder : '请输入城市',
										name : 'city',
										id : 'city',
									}, {
										xtype : 'textfield',
										label : '邮编',
										labelWidth : '40%',
										required : true,
										readOnly : true,
										placeHolder : '请输入邮编',
										name : 'postcode',
										id : 'postcode',
									}, {
										xtype : 'textfield',
										label : '联系人',
										labelWidth : '40%',
										placeHolder : '请输入联系人',
										name : 'lxr',
										readOnly : true,
										id : 'lxr',
									}, {
										xtype : 'textfield',
										label : '电话',
										labelWidth : '40%',
										required : true,
										readOnly : true,
										placeHolder : '请输入电话',
										name : 'phone',
										id : 'phone',
									}, {
										xtype : 'textfield',
										label : '传真',
										labelWidth : '40%',
										placeHolder : '请输入传真',
										name : 'fax',
										readOnly : true,
										id : 'fax',
									}, {
										xtype : 'textfield',
										label : '电子邮件',
										labelWidth : '40%',
										placeHolder : '请输入电子邮件',
										name : 'email',
										readOnly : true,
										id : 'email',
									}, {
										xtype : 'fieldset',
										title : '',
										items : [{
												xtype : 'textfield',
												id : 'paycon',
												label : '付款条件',
												labelWidth : '40%',
												readOnly : true,
											}
										]
									}, {
										xtype : 'textfield',
										label : '若选择其他，输入天数',
										labelWidth : '40%',
										readOnly : true,
										name : 'ts',
										id : 'ts',
									}, {
										xtype : 'textfield',
										label : '付款币种',
										labelWidth : '40%',
										readOnly : true,
										name : 'currency',
										id : 'currency',
									}, {
										xtype : 'textfield',
										label : '发票币种',
										labelWidth : '40%',
										readOnly : true,
										name : 'bill',
										id : 'bill',
									}, {
										xtype : 'fieldset',
										title : '',
										items : [{
												xtype : 'textfield',
												id : 'gystype',
												label : '可结算的供应商类型',
												labelWidth : '40%',
												readOnly : true,
											}
										]
									}, {
										xtype : 'fieldset',
										title : '',
										items : [{
												xtype : 'textfield',
												id : 'taxcode',
												label : '税码',
												labelWidth : '40%',
												readOnly : true,
											}
										]
									}, {
										xtype : 'fieldset',
										title : '',
										items : [{
												xtype : 'textfield',
												id : 'ifbank',
												label : '是否银企直联供应商',
												labelWidth : '40%',
												readOnly : true,
											}
										]
									}, {
										xtype : 'fieldset',
										title : '',
										items : [{
												xtype : 'textfield',
												id : 'iffw',
												label : '是否服务费供应商',
												readOnly : true,
												labelWidth : '40%',
											}
										]
									}, {
										xtype : 'textfield',
										label : '开户行',
										labelWidth : '40%',
										placeHolder : '请输入开户行',
										name : 'bankcount',
										id : 'bankcount',
										readOnly : true,
									}, {
										xtype : 'textfield',
										label : '地区代码（银企直联供应商必填，详见填表须知）',
										labelWidth : '40%',
										placeHolder : '请输入地区代码（银企直联供应商必填，详见填表须知）',
										name : 'areacode',
										readOnly : true,
										id : 'areacode',
									}, {
										xtype : 'textfield',
										label : '采购员',
										labelWidth : '40%',
										placeHolder : '请输入采购员',
										name : 'pu',
										id : 'pu',
										readOnly : true,
									}, {
										xtype : 'textfield',
										label : '备注',
										labelWidth : '40%',
										placeHolder : '请输入备注',
										name : 'remark',
										id : 'remark',
										readOnly : true,
									}, ]
							}
						]
					}, {
						xtype : 'fieldset',
						title : '财务填写',
						items : [{
								xtype : 'textfield',
								label : '会计科目（负债）',
								labelWidth : '40%',
								placeHolder : '请输入会计科目（负债）',
								name : 'accountingsubject',
								id : 'accountingsubject',
								readOnly : true,
							}, {
								xtype : 'textfield',
								label : '会计科目（预付款）',
								labelWidth : '40%',
								placeHolder : '请输入会计科目（预付款）',
								name : 'accountingsubjectyf',
								id : 'accountingsubjectyf',
								readOnly : true,
							}, {
								xtype : 'fieldset',
								title : '',
								items : [{
										xtype : 'textfield',
										id : 'zhz',
										label : '帐户组',
										labelWidth : '40%',
										readOnly : true,
									}
								]
							}, {
								xtype : 'textfield',
								label : '查看供应商使用组织',
								labelWidth : '40%',
								placeHolder : '请输入查看供应商使用组织',
								name : 'supplyorg',
								id : 'supplyorg',
								readOnly : true,
							}, ]
					}
				]
			}, {
				xtype : 'fieldset',
				hidden : true,
				items : [{
						xtype : 'textfield',
						id : 'conds',
						name : 'conds'
					}, {
						xtype : 'textfield',
						id : 'userid',
						name : 'userid'
					}, {
						xtype : 'textfield',
						id : 'type',
						name : 'type'
					}, {
						xtype : 'textfield',
						id : 'username',
						name : 'username'
					}, {
						xtype : 'textfield',
						id : 'node',
						name : 'node'
					}, {
						xtype : 'textfield',
						id : 'ctime',
						name : 'ctime'
					}, {
						xtype : 'textfield',
						id : 'piid',
						name : 'piid'
					}, {
						xtype : 'textfield',
						id : 'processname',
						name : 'processname'
					}, {
						xtype : 'textfield',
						id : 'curauthor',
						name : 'curauthor'
					}, {
						xtype : 'textfield',
						id : 'dealmen',
						name : 'dealmen'
					}, {
						xtype : 'textfield',
						id : 'ygbh',
						name : 'ygbh'
					}, {
						xtype : 'textfield',
						id : 'form',
						name : 'form'
					}, {
						xtype : 'textfield',
						id : 'arcpath',
						name : 'arcpath'
					}, {
						xtype : 'textfield',
						id : 'arcdate',
						name : 'arcdate'
					}, {
						xtype : 'textfield',
						id : 'idea',
						name : 'idea'
					}, {
						xtype : 'textfield',
						id : 'endprocessdate',
						name : 'endprocessdate'
					}, {
						xtype : 'textfield',
						id : 'audit_list',
						name : 'audit_list'
					}, {
						xtype : 'textfield',
						id : 'taskid',
						name : 'taskid'
					}, {
						xtype : 'textfield',
						id : 'firflow',
						name : 'firflow'
					}, {
						xtype : 'textfield',
						id : 'mast',
						name : 'mast'
					}, {
						xtype : 'textfield',
						id : 'ext1',
						name : 'ext1'
					}
				]
			}
		]
	}
});