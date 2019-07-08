
/* JavaScript content from app/view/ForApprovalProcess/BusinessService/qualityguarantee.js in folder common */
/**
 * 提前开票申请流程
 */
Ext.define('HelcOA.view.ForApprovalProcess.BusinessService.qualityguarantee', {
	extend : 'Ext.Panel',
	id : 'sp_qualityguarantee_id',
	requires : [
		'Ext.Toolbar',
		'Ext.Button',
		'Ext.Spacer',
		'Ext.form.Panel',
		'Ext.form.FieldSet',
		'Ext.field.DatePicker',
		'Ext.picker.Date',
		'Ext.field.TextArea'
	],

	config : {
		layout : 'vbox',
		items : [{
				xtype : 'toolbar',
				docked : 'top',
				id : 'surface_ID',
				title : '质量保函申请',
				items : [{
						xtype : 'button',
						iconCls : 'home',
						id : 'returnHome_ID'
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
								labelWidth : '30%',
								name : 'fileno',
								id : 'fileno',
								readOnly : true,
							}, {
								xtype : 'autoTextArea',
								label : '标题',
								labelWidth : '30%',
								placeHolder : '请输入标题',
								name : 'subject',
								id : 'subject',
								required : true,
							}, {
								xtype : 'textfield',
								label : '申请部门',
								labelWidth : '30%',
								name : 'dept',
								id : 'dept',
								readOnly : true,
							}, {
								xtype : 'textfield',
								label : '姓名',
								labelWidth : '30%',
								name : 'agentman',
								id : 'agentman',
								readOnly : true,
							}, {
								xtype : 'textfield',
								label : '申请日期',
								labelWidth : '30%',
								name : 'createdate',
								id : 'createdate',
								readOnly : true,
							}, {
								xtype : 'textfield',
								label : '应对部门',
								labelWidth : '30%',
								placeHolder : '请输入应对部门',
								name : 'ydbm',
								id : 'ydbm',
							}, {
								xtype : 'textfield',
								label : '营业总部直属部长',
								labelWidth : '30%',
								name : 'zsbz',
								id : 'zsbz',
							}, ]
					},{
						xtype : 'fieldset',
						title : '保函相关信息',
						items : [{
								xtype : 'textfield',
								label : '保函性质',
								labelWidth : '30%',
								name : 'bhxz',
								id : 'bhxz',
								required : true,
							}, {
								xtype : 'textfield',
								label : '是否当地开具',
								labelWidth : '30%',
								
								name : 'ddkj',
								id : 'ddkj',
								required : true,
							}, {
								xtype : 'textfield',
								label : '合同号',
								labelWidth : '30%',
								name : 'htno',
								id : 'htno',
								required : true,
							}, {
								xtype : 'textfield',
								label : '保函格式要求',
								labelWidth : '30%',
								name : 'sqje',
								id : 'sqje',
								required : true,
							}, {
								xtype : 'textfield',
								label : '当批最后一台验收时间',
								labelWidth : '30%',
								name : 'ystime',
								id : 'ystime',
								required : true,
							}, {
								xtype : 'textfield',
								label : '签约台数',
								labelWidth : '30%',
								name : 'qyts',
								id : 'qyts',
								required : true,
							}, {
								xtype : 'textfield',
								label : '实际保函申请台数',
								labelWidth : '30%',
								name : 'sqts',
								id : 'sqts',
								required : true,
							}, {
								xtype : 'textfield',
								label : '保函申请条件',
								labelWidth : '30%',
								name : 'sqtj',
								id : 'sqtj',
								required : true,
							}, {
								xtype : 'textfield',
								label : '合同总额',
								labelWidth : '30%',
								name : 'mmhtze',
								id : 'mmhtze',
								required : true,
							}, {
								xtype : 'textfield',
								label : '保函占比',
								labelWidth : '30%',
								name : 'bhzb',
								id : 'bhzb',
								required : true,
							}, {
								xtype : 'textfield',
								label : '保函金额',
								labelWidth : '30%',
								name : 'bhje',
								id : 'bhje',
								required : true,
							}, {
								xtype : 'textfield',
								label : '合同约定质保期',
								labelWidth : '30%',
								name : 'ydzbq',
								id : 'ydzbq',
								required : true,
							},  {
								xtype : 'textfield',
								label : '质保期结束时间',
								labelWidth : '30%',
								name : 'zbendate',
								id : 'zbendate',
								required : true,
							},  {
								xtype : 'textfield',
								label : '约定银行',
								labelWidth : '30%',
								name : 'isyd',
								id : 'isyd',
								required : true,
							},  {
								xtype : 'textfield',
								label : '是否已过质保期',
								labelWidth : '30%',
								name : 'ifzb',
								id : 'ifzb',
								required : true,
							}, {
								xtype : 'textfield',
								label : '补开质保期延期时间',
								labelWidth : '30%',
								name : 'yqsj',
								id : 'yqsj',
								required : true,
							},{
								xtype : 'textfield',
								label : '是否首次申请',
								labelWidth : '30%',
								name : 'isfirst',
								id : 'isfirst',
								required : true,
							},{
								xtype : 'textfield',
								label : '前保函码',
								labelWidth : '30%',
								name : 'qbh',
								id : 'qbh',
								required : true,
							},{
								xtype : 'textfield',
								label : '本次申请工号',
								labelWidth : '30%',
								name : 'sqgh',
								id : 'sqgh',
								required : true,
							},{
								xtype : 'textfield',
								label : '合同买方名称',
								labelWidth : '30%',
								name : 'mfmc',
								id : 'mfmc',
								required : true,
							},{
								xtype : 'textfield',
								label : '开立保函名称',
								labelWidth : '30%',
								name : 'bhmc',
								id : 'bhmc',
								required : true,
							},{
								xtype : 'textfield',
								label : '备注',
								labelWidth : '30%',
								name : 'bz_textarea',
								id : 'bz_textarea',
								required : true,
							},]
					},
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
						name : 'form',
					}, {
						xtype : 'textfield',
						id : 'arcpath',
						name : 'arcpath',
					}, {
						xtype : 'textfield',
						id : 'arcdate',
						name : 'arcdate',
					}, {
						xtype : 'textfield',
						id : 'idea',
						name : 'idea',
					}, {
						xtype : 'textfield',
						id : 'endprocessdate',
						name : 'endprocessdate',
					}, {
						xtype : 'textfield',
						id : 'audit_list',
						name : 'audit_list',
					}, {
						xtype : 'textfield',
						id : 'taskid',
						name : 'taskid',
					}, {
						xtype : 'textfield',
						id : 'mast',
						name : 'mast',
					}, {
						xtype : 'textfield',
						id : 'pi_flag',
						name : 'pi_flag',
					}, {
						xtype : 'textfield',
						id : 'cfg_id',
						name : 'cfg_id',
					}, {
						xtype : 'textfield',
						id : 'ext1',
						name : 'ext1',
					}, {
						xtype : 'textfield',
						id : 'managermen',
						name : 'managermen'
					},{
						xtype : 'textfield',
						id : 'xztype',
						name : 'xztype'
					}, {
						xtype : 'textfield',
						id : 'createflag',
						name : 'createflag'
					}, {
						xtype : 'textfield',
						id : 'firflow',
						name : 'firflow'
					}, {
						xtype : 'textfield',
						id : 'lx',
						name : 'lx'
					}, {
						xtype : 'textfield',
						id : 'xg',
						name : 'xg'
					},
				]
			}
		]
	}
});