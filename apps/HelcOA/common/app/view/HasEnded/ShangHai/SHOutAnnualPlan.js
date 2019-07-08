Ext.define('HelcOA.view.HasEnded.ShangHai.SHOutAnnualPlan', {
	extend : 'Ext.Panel',
	id : 'yjs_SHOutAnnualPlan_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			title : '上海年度计划外培训申请流程',
			items : [ {
				xtype : 'button',
				id : 'yjs_returnHasEnded',
				text : '返回',
				ui : 'back'
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
					label : '标题 ',
					name : 'subject',
					id : 'subject',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '申请人 ',
					name : 'agentman',
					id : 'agentman',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '申请部门',
					name : 'dept',
					id : 'dept',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '申请时间',
					name : 'createdate',
					id : 'createdate',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '费用（元）',
					name : 'fyje',
					id : 'fyje',
					placeHolder : '请输入预计费用',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '课程名称',
					name : 'kcmc',
					id : 'kcmc',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textareafield',
					label : '培训名单',
					name : 'pxry_textarea',
					id : 'pxry_textarea',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'selectfield',
					label : '培训地点',
					name : 'pxdd',
					id : 'pxdd',
					labelWidth : '40%',
					required : true,
					options : [ {
						text : '',
						value : ''
					}, {
						text : '公司内',
						value : '公司内'
					}, {
						text : '公司外',
						value : '公司外'
					} ]
				}, {
					xtype : 'textfield',
					label : '培训地址',
					name : 'pxaddr',
					id : 'pxaddr',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '培训机构',
					name : 'pxjg',
					id : 'pxjg',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '机构联系人',
					name : 'pxjs',
					id : 'pxjs',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '联系电话',
					name : 'lxdh',
					id : 'lxdh',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '培训时间',
				items : [ {
					xtype : 'textfield',
					label : '开始',
					name : 'pxsj1',
					id : 'pxsj1',
					labelWidth : '40%',
					required : true,
					dateFormat : 'Y-m-d',
					listeners : {
						focus : function() {
							initDate2('pxsj1', '开始日期');
						}
					}
				}, {
					xtype : 'textfield',
					label : '结束',
					name : 'pxsj2',
					id : 'pxsj2',
					labelWidth : '40%',
					required : true,
					dateFormat : 'Y-m-d',
					listeners : {
						focus : function() {
							initDate2('pxsj2', '结束日期');
						}
					}
				}, {
					xtype : 'textfield',
					label : '合计课时',
					name : 'kss',
					id : 'kss',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '申请理由及详细说明*',
				items : [ {
					xtype : 'textareafield',
					label : '理由及说明',
					name : 'reason_textarea',
					id : 'reason_textarea',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				hidden : true,
				items : [ {
					xtype : 'textfield',
					id : 'fileno',
					name : 'fileno'
				}, {
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
					id : 'needzc',
					name : 'needzc'
				}, {
					xtype : 'textfield',
					id : 'idea',
					name : 'idea'
				}, {
					xtype : 'textfield',
					id : 'ygbh',
					name : 'ygbh'
				}, {
					xtype : 'textfield',
					id : 'ext1',
					name : 'ext1'
				}, {
					xtype : 'textfield',
					id : 'taskid',
					name : 'taskid'
				}, {
					xtype : 'textfield',
					id : 'jlflag',
					name : 'jlflag'
				}, {
					xtype : 'textfield',
					id : 'bmflag',
					name : 'bmflag'
				}, {
					xtype : 'textfield',
					id : 'bm',
					name : 'bm'
				}, {
					xtype : 'textfield',
					id : 'tamc',
					name : 'tamc'
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
				} ]
			} ]
		} ]
	}
});