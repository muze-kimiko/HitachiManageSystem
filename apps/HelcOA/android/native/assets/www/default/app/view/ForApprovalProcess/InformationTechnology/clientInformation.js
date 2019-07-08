
/* JavaScript content from app/view/ForApprovalProcess/InformationTechnology/clientInformation.js in folder common */
/*Sured by QiuXL 20170612*/
Ext.define('HelcOA.view.ForApprovalProcess.InformationTechnology.clientInformation', {
	extend : 'Ext.Panel',
	id : 'sp_clientInformation_ID',
	requires : ['Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea'],
	config : {
		layout : 'vbox',
		items : [{
				xtype : 'toolbar',
				docked : 'top',
				id : 'surface_ID',
				title : '客户信息登记表',
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
								readOnly : true
							}, ]
					}, {
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'textfield',
								label : '申请部门',
								labelWidth : '40%',
								placeHolder : '请输入申请部门',
								name : 'dept',
								id : 'dept',
								readOnly : true,
							}, {
								xtype : 'textfield',
								label : '申请人',
								labelWidth : '40%',
								placeHolder : '请输入申请人',
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
								readOnly : true
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
							}, {
								xtype : 'textfield',
								label : '使用组织',
								labelWidth : '40%',
								placeHolder : '请输入使用组织',
								name : 'organize',
								id : 'organize',
								readOnly : true
							}, {
								xtype : 'textfield',
								label : '客户编码',
								labelWidth : '40%',
								name : 'supplycode',
								id : 'supplycode',
								readOnly : true
							}
						]
					}, {
						xtype : 'fieldset',
						title : '表头信息',
						items : [{
								xtype : 'textfield',
								label : '客户名称',
								labelWidth : '40%',
								placeHolder : '请输入客户名称',
								name : 'supplyname',
								id : 'supplyname',
								readOnly : true
							}, {
								xtype : 'textfield',
								label : '原客户名称',
								labelWidth : '40%',
								placeHolder : '请输入原客户名称',
								name : 'ykhmc',
								id : 'ykhmc',
								readOnly : true
							}, {
								xtype : 'textfield',
								label : '税务登记号(国税)',
								labelWidth : '40%',
								placeHolder : '请输入税务登记号(国税)',
								name : 'taxid',
								id : 'taxid',
								readOnly : true,
							}, {
								xtype : 'textfield',
								label : '税务登记号(地税)',
								labelWidth : '40%',
								placeHolder : '请输入税务登记号(地税)',
								name : 'taxidds',
								id : 'taxidds',
								readOnly : true,
							}, {
								xtype : 'fieldset',
								title : '',
								items : [{
										xtype : 'textfield',
										id : 'ifgl',
										label : '是否关联客户',
										labelWidth : '40%',
										placeHolder : '请选择是否关联客户',
										readOnly : true,
									}
								]
							}, {
								xtype : 'fieldset',
								title : '',
								items : [{
										xtype : 'textfield',
										id : 'khtype',
										label : '客户类型',
										labelWidth : '40%',
										readOnly : true,
									}
								]
							}, {
								xtype : 'fieldset',
								title : '',
								items : [{
										xtype : 'textfield',
										id : 'khfl',
										label : '客户分类',
										labelWidth : '40%',
										readOnly : true,
									}
								]
							}, {
								xtype : 'fieldset',
								title : '',
								items : [{
										xtype : 'textfield',
										id : 'khleib',
										label : '客户类别',
										labelWidth : '40%',
										readOnly : true,
									}
								]
							}, {
								xtype : 'fieldset',
								title : '表体消息',
								items : [{
										xtype : 'textfield',
										label : '客户地址',
										labelWidth : '40%',
										id : 'supplyaddr',
										name : 'supplyaddr',
										readOnly : true,
										value : '',
										placeHolder : '请输入客户地址'
									}, {
										xtype : 'textfield',
										label : '银行账户及账号',
										labelWidth : '40%',
										placeHolder : '请输入银行账户及账号',
										name : 'supplybank',
										id : 'supplybank',
										readOnly : true
									}, {
										xtype : 'textfield',
										label : '国家(地区)',
										labelWidth : '40%',
										readOnly : true,
										name : 'country',
										id : 'country',
									}, {
										xtype : 'textfield',
										label : '邮编',
										labelWidth : '40%',
										readOnly : true,
										name : 'postcode',
										id : 'postcode',
									}, {
										xtype : 'textfield',
										label : '省份',
										labelWidth : '40%',
										readOnly : true,
										name : 'prov',
										id : 'prov',
									}, {
										xtype : 'textfield',
										label : '城市',
										labelWidth : '40%',
										readOnly : true,
										name : 'city',
										id : 'city',
									}, {
										xtype : 'textfield',
										label : '联系人',
										labelWidth : '40%',
										name : 'lxr',
										readOnly : true,
										id : 'lxr',
									}, {
										xtype : 'textfield',
										label : '电话(含区号)',
										labelWidth : '40%',
										readOnly : true,
										name : 'phone',
										id : 'phone',
									}, {
										xtype : 'textfield',
										label : '传真(含区号)',
										labelWidth : '40%',
										readOnly : true,
										name : 'fax',
										id : 'fax',
									}, {
										xtype : 'textfield',
										label : '电子邮件',
										labelWidth : '40%',
										readOnly : true,
										name : 'email',
										id : 'email',
									}, {
										xtype : 'textfield',
										label : '备注',
										readOnly : true,
										labelWidth : '40%',
										name : 'remark',
										id : 'remark',
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
							}
						]
					}
				]
			}
		]
	}
});
