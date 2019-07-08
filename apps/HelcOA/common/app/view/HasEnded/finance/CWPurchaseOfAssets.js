Ext.define('HelcOA.view.HasEnded.finance.CWPurchaseOfAssets', {
	extend : 'Ext.Panel',
	id : 'yjs_CWPurchaseOfAssets_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.Text' ],
	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			title : '营分司固定资产申请流程',
			items : [{
				xtype : 'button',
				ui : 'back',
				text : '返回',
				id : 'yjs_returnHasEnded'
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
					label : '编号',
					id : 'fileno',
					name : 'fileno',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '申请单位',
					id : 'bm',
					name : 'bm',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '标题',
					id : 'subject',
					name : 'subject',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textareafield',
					label : '购置原因',
					id : 'reason_textarea',
					name : 'reason_textarea',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '预计购置金额',
				items : [ {
					xtype : 'selectfield',
					label : '购置形式',
					id : 'ysgz',
					name : 'ysgz',
					options : [ {
						text : '',
						value : ''
					}, {
						text : '预算内购置',
						value : '预算内购置'
					}, {
						text : '预算外购置',
						value : '预算外购置'
					} ],
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '金额（元）',
					id : 'je',
					name : 'je',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'selectfield',
					label : '购置类别',
					id : 'xz_type',
					name : 'xz_type',
					options : [ {
						text : '',
						value : ''
					}, {
						text : '其他',
						value : '其他'
					}, {
						text : '汽车、房屋、单项5万以上',
						value : '汽车、房屋、单项5万以上'
					}, {
						text : '投影仪、等离子电视、手提电脑、3000元以上数码相机',
						value : '投影仪、等离子电视、手提电脑、3000元以上数码相机'
					}, {
						text : '台式电脑',
						value : '台式电脑'
					} ],
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '财务主管',
					id : 'sendreader',
					name : 'sendreader',
					labelWidth : '40%'
				} ]
			}, {
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
					id : 'agentman',
					name : 'agentman'
				}, {
					xtype : 'textfield',
					id : 'createdate',
					name : 'createdate'
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
				},{
					xtype : 'textfield',
					id : 'depid',
					name : 'depid'
				},{
					xtype : 'textfield',
					id : 'leader',
					name : 'leader'
				},{
					xtype : 'textfield',
					id : 'sendaddr',
					name : 'sendaddr'
				},{
					xtype : 'textfield',
					id : 'lxdh',
					name : 'lxdh'
				},{
					xtype : 'textfield',
					id : 'ghdw',
					name : 'ghdw'
				},{
					xtype : 'textfield',
					id : 'faxno',
					name : 'faxno'
				},{
					xtype : 'textfield',
					id : 'jyaddr',
					name : 'jyaddr'
				},{
					xtype : 'textfield',
					id : 'dh',
					name : 'dh'
				},{
					xtype : 'textfield',
					id : 'bank',
					name : 'bank'
				},{
					xtype : 'textfield',
					id : 'account',
					name : 'account'
				}]
			} ]
		} ]
	}

});