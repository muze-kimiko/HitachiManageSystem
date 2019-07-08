Ext.define('HelcOA.view.ForApprovalProcess.FuTi.FTMaterialPurchasing', {
	extend : 'Ext.Panel',
	id : 'sp_FTMaterialPurchasing_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			id : 'surface_ID',
			title : '扶梯采购价格变更审批',
			items : [ {
				xtype : 'button',
				iconCls : 'home',
				id : 'returnHome_ID'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'button',
				id : 'idea_ID',
				text : '下一步'
			} ]
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
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '物料信息填写',
				items : [ {
					xtype : 'selectfield',
					label : '供应状况',
					id : 'suptype',
					name : 'suptype',
					labelWidth : '40%',
					options : [ {
						text : '',
						value : '',
					}, {
						text : '独家供应',
						value : '独家供应',
					}, {
						text : '多家供应',
						value : '多家供应'
					}, {
						text : '上年采购接收金额大于50万',
						value : '上年采购接收金额大于50万'
					} ]
				}, {
					xtype : 'textfield',
					label : '供应商',
					id : 'wlsupply',
					name : 'wlsupply',
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
			}, {
				xtype : 'fieldset',
				title : '变更原因（需注明上一年度的采购金额）*',
				items : [ {
					xtype : 'textareafield',
					label : '变更原因',
					id : 'reason_textarea',
					name : 'reason_textarea',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '生产统括科长审核',
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
				title : '制造部长审核',
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
						text : '价格升幅经确认大于3%或半年内大于1次，请财务部核算',
						value : '价格升幅经确认大于3%或半年内大于1次，请财务部核算'
					}]
				} ]
			}, {
				xtype : 'fieldset',
				title : '财务部长核算（单位：%）',
				items : [ {
					xtype : 'textfield',
					label : '核算后升幅',
					id : 'hssf',
					name : 'hssf',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '采购的影响',
					id : 'cgyx',
					name : 'cgyx',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '财务部长审核意见',
				items : [ {
					xtype : 'selectfield',
					label : '核算结果',
					id : 'hsjgtype',
					name : 'hsjgtype',
					labelWidth : '40%',
					options : [ {
						text : '',
						value : '',
					}, {
						text : '同意变更',
						value : '同意变更 ',
					},{
						text : '价格升幅符合核算结果重新磋商',
						value : '价格升幅符合核算结果重新磋商'
					}]
				} ]
			}, {
				xtype : 'fieldset',
				hidden : true,
				items : [ {
					xtype : 'textfield',
					id : 'conds',
					name : 'conds',
					value : 'nocon'
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
					id : 'ext1',
					name : 'ext1'
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
					id : 'mast',
					name : 'mast'
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
					id : 'needzc',
					name : 'needzc'
				}, {
					xtype : 'textfield',
					id : 'dept',
					name : 'dept'
				}]
			} ]
		} ]
	}

});