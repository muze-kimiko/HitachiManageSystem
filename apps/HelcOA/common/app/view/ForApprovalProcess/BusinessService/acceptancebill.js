/**
 * 提前开票申请流程
 */
Ext.define('HelcOA.view.ForApprovalProcess.BusinessService.acceptancebill', {
	extend : 'Ext.Panel',
	id : 'sp_acceptancebill_id',
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
				title : '承兑汇票申请',
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
								label : '申请部门（分公司）',
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
						title : '客户信息',
						items : [{
								xtype : 'textfield',
								label : '合同号',
								labelWidth : '30%',
								name : 'htno',
								id : 'htno',
								required : true,
							}, {
								xtype : 'textfield',
								label : '合同买方名称',
								labelWidth : '30%',
								placeHolder : '请输入标题',
								name : 'mfmc',
								id : 'mfmc',
								required : true,
							}, {
								xtype : 'textfield',
								label : '是否合同约定',
								labelWidth : '30%',
								name : 'htyd',
								id : 'htyd',
								required : true,
							}, {
								xtype : 'textfield',
								label : '承兑汇票号码',
								labelWidth : '30%',
								name : 'hphm',
								id : 'hphm',
								required : true,
							}, {
								xtype : 'textfield',
								label : '承兑汇票性质',
								labelWidth : '30%',
								name : 'xz',
								id : 'xz',
								required : true,
							}, {
								xtype : 'textfield',
								label : '承兑汇票开票时间',
								labelWidth : '30%',
								name : 'kpsj',
								id : 'kpsj',
								required : true,
							}, {
								xtype : 'textfield',
								label : '申请支付款项',
								labelWidth : '30%',
								name : 'zfkx',
								id : 'zfkx',
								required : true,
							}, {
								xtype : 'textfield',
								label : '背书次数',
								labelWidth : '30%',
								name : 'cs',
								id : 'cs',
								required : true,
							}, {
								xtype : 'textfield',
								label : '承兑汇票到期时间',
								labelWidth : '30%',
								name : 'dqsj',
								id : 'dqsj',
								required : true,
							}, {
								xtype : 'textfield',
								label : '开票银行',
								labelWidth : '30%',
								name : 'kpbank',
								id : 'kpbank',
								required : true,
							}, {
								xtype : 'textfield',
								label : '承兑汇票金额',
								labelWidth : '30%',
								name : 'kpje',
								id : 'kpje',
								required : true,
							}, ]
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