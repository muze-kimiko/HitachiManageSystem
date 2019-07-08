
/* JavaScript content from app/view/Approved/FuTi/FTSealApplication.js in folder common */
Ext.define('HelcOA.view.Approved.FuTi.FTSealApplication', {
	extend : 'Ext.Panel',
	id : 'ysp_FTSealApplication_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date',
			'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			title : '扶梯用印申请',
			items : [ {
				xtype : 'button',
				id : 'ysp_returnApproved',
				text : '返回',
				ui : 'back'
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
					id : 'fileno',
					name : 'fileno',
					label : '编号',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textfield',
					id : 'agentman',
					name : 'agentman',
					label : '申请人',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					id : 'dept',
					name : 'dept',
					label : '申请部门',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					id : 'createdate',
					name : 'createdate',
					label : '申请日期',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textfield',
					id : 'subject',
					name : 'subject',
					label : '标题',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					id : 'fenshu',
					name : 'fenshu',
					label : '份数',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textareafield',
					id : 'sqliyou_textarea',
					name : 'sqliyou_textarea',
					label : '申请理由',
					labelWidth : '40%',
					required : true,
					placeHolder : '请输入申请理由'
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
				}, ]
			} ]
		} ]
	}

});