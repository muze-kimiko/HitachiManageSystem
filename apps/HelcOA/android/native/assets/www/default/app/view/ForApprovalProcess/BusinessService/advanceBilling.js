
/* JavaScript content from app/view/ForApprovalProcess/BusinessService/advanceBilling.js in folder common */
/**
 * 提前开票申请流程
 */
Ext.define('HelcOA.view.ForApprovalProcess.BusinessService.advanceBilling', {
	extend : 'Ext.Panel',
	id : 'sp_advanceBilling_id',
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
				title : '提前开票申请',
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
								label : '申请人',
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
						title : '开票信息',
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
								label : '是否前款未清',
								labelWidth : '30%',
								name : 'qkwq',
								id : 'qkwq',
								required : true,
							}, {
								xtype : 'textfield',
								label : '是否双边挂账',
								labelWidth : '30%',
								name : 'sbgz',
								id : 'sbgz',
								required : true,
							}, {
								xtype : 'textfield',
								label : '是否发货前开票',
								labelWidth : '30%',
								name : 'fhqkp',
								id : 'fhqkp',
								required : true,
							}, {
								xtype : 'textfield',
								label : '预计收回时间时间',
								labelWidth : '30%',
								name : 'shsj',
								id : 'shsj',
								required : true,
							}, {
								xtype : 'textfield',
								label : '是否专票',
								labelWidth : '30%',
								name : 'sfzp',
								id : 'sfzp',
								required : true,
							}, {
								xtype : 'textfield',
								label : '是否来款不一致',
								labelWidth : '30%',
								name : 'lkyz',
								id : 'lkyz',
								required : true,
							}, {
								xtype : 'textfield',
								label : '合同总价',
								labelWidth : '30%',
								name : 'htzj',
								id : 'htzj',
								required : true,
							}, {
								xtype : 'textfield',
								label : '合同已开票',
								labelWidth : '30%',
								name : 'htykp',
								id : 'htykp',
								required : true,
							}, {
								xtype : 'textfield',
								label : '本次开票金额',
								labelWidth : '30%',
								name : 'bckpje',
								id : 'bckpje',
								required : true,
							}, {
								xtype : 'textfield',
								label : '合同已收款',
								labelWidth : '30%',
								name : 'htysk',
								id : 'htysk',
								required : true,
							}, {
								xtype : 'textfield',
								label : '合同已开票未收款',
								labelWidth : '30%',
								name : 'htwsk',
								id : 'htwsk',
								required : true,
							}, {
								xtype : 'autoTextArea',
								label : '备注',
								labelWidth : '30%',
								name : 'bz_textarea',
								id : 'bz_textarea',
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