Ext.define('HelcOA.view.MyProcess.finance.CWMaterialPurchasing', {
	extend : 'Ext.Panel',
	id : 'wdlc_CWMaterialPurchasing_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.TextArea' ],

	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			title : '采购价格变更审批管理',
			items : [{
				xtype : 'button',
				ui : 'back',
				text : '返回',
				id : 'wdlc_returnMyProcess'
			}]
		}, {
			xtype : 'formpanel',
			flex : 1,
			id : 'fp',
			items : [ {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textfield',
					label : '申请日期',
					id : 'createdate',
					name : 'createdate',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '编号',
					id : 'fileno',
					name : 'fileno',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '经办人',
					id : 'agentman',
					name : 'agentman',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '变更物料',
					id : 'dep',
					name : 'dep',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '标题',
					id : 'subject',
					name : 'subject',
					required : true,
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '物料信息填写',
				items : [ {
					xtype : 'selectfield',
					label : '供应状况',
					id:'suptype',
					name:'suptype',
					options : [ {
						text : '',
						value : ''
					}, {
						text : '独家供应',
						value : '独家供应'
					}, {
						text : '多家供应',
						value : '多家供应'
					}, {
						text : '上年采购接收金额大于50万',
						value : '上年采购接收金额大于50万'
					}],
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '供应商',
					id:'wlsupply',
					name:'wlsupply',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '变更情况描述',
				items : [ {
					xtype : 'textfield',
					label : '变更前a',
					id : 'bgq',
					name : 'bgq',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '变更后b',
					id : 'bgh',
					name : 'bgh',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '上升幅度(R=(b-a)/a)',
				items : [ {
					xtype : 'textfield',
					label : '上升幅度',
					id : 'ssfd',
					name : 'ssfd',
					labelWidth : '40%'
				} ]
			},
			{
				xtype : 'fieldset',
				title : '资材管理科科长审核',
				items : [ {
					xtype : 'selectfield',
					label : '审核结果',
					id : 'zckztype',
					name : 'zckztype',
					labelWidth : '40%',
					options : [ {
						text : '',
						value : '',
					}, {
						text : '同意变更请上级领导审批 ',
						value : '同意变更请上级领导审批 ',
					}, {
						text : '重新磋商',
						value : '重新磋商'
					}]
				} ]
			}, {
				xtype : 'fieldset',
				title : '资材部部长审核',
				items : [ {
					xtype : 'selectfield',
					label : '审核结果',
					id : 'zcbztype',
					name : 'zcbztype',
					labelWidth : '40%',
					options : [ {
						text : '',
						value : '',
					}, {
						text : '同意 ',
						value : '同意 ',
					}, {
						text : '重新磋商',
						value : '重新磋商'
					}, {
						text : '需请价格成本管理中心审核',
						value : '需请价格成本管理中心审核'
					}]
				} ]
			},
			{
				xtype : 'fieldset',
				title : '价格成本管理中心部长审核',
				items : [ {
					xtype : 'selectfield',
					label : '审核结果',
					id : 'hsjgtype',
					name : 'hsjgtype',
					labelWidth : '40%',
					options : [ {
						text : '',
						value : '',
					}, {
						text : '调价幅度合理，同意变更',
						value : '调价幅度合理，同意变更',
					}, {
						text : ' 调价幅度不合理，重新磋商',
						value : '调价幅度不合理，重新磋商'
					}]
				} ]
			},
			{
				xtype : 'fieldset',
				hidden : true,
				items : [ {
					xtype : 'textfield',
					id : 'conds',
					value : 'nocon',
					name : 'conds'
				}, {
					xtype : 'textfield',
					id : 'userid',
					name : 'userid'
				}, {
					xtype : 'textfield',
					id : 'dept',
					name : 'dept'
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
					id : 'endprocessdate',
					name : 'endprocessdate'
				}, {
					xtype : 'textfield',
					id : 'taskid',
					name : 'taskid'
				}, {
					xtype : 'textfield',
					id : 'pi_flag',
					name : 'pi_flag'
				}, {
					xtype : 'textfield',
					id : 'cfg_id',
					name : 'cfg_id'
				}, {
					xtype : 'textfield',
					id : 'createflag',
					name : 'createflag'
				}, {
					xtype : 'textfield',
					id : 'audit_list',
					name : 'audit_list'
				}, {
					xtype : 'textfield',
					id : 'mast',
					name : 'mast'
				}, {
					xtype : 'textfield',
					id : 'ext1',
					name : 'ext1'
				}, {
					xtype : 'textfield',
					id : 'managermen',
					name : 'managermen'
				}, {
					xtype : 'textfield',
					id : 'depid',
					name : 'depid'
				}, {
					xtype : 'textfield',
					id : 'leader',
					name : 'leader'
				}, {
					xtype : 'textfield',
					id : 'sendaddr',
					name : 'sendaddr'
				}, {
					xtype : 'textfield',
					id : 'lxdh',
					name : 'lxdh'
				}, {
					xtype : 'textfield',
					id : 'ghdw',
					name : 'ghdw'
				}, {
					xtype : 'textfield',
					id : 'faxno',
					name : 'faxno'
				}, {
					xtype : 'textfield',
					id : 'jyaddr',
					name : 'jyaddr'
				}, {
					xtype : 'textfield',
					id : 'dh',
					name : 'dh'
				}, {
					xtype : 'textfield',
					id : 'bank',
					name : 'bank'
				}, {
					xtype : 'textfield',
					id : 'account',
					name : 'account'
				} ]
			} ]
		} ]
	}

});