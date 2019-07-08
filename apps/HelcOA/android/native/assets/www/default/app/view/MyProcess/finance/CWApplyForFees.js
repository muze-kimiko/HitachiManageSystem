
/* JavaScript content from app/view/MyProcess/finance/CWApplyForFees.js in folder common */
Ext.define('HelcOA.view.MyProcess.finance.CWApplyForFees', {
	extend : 'Ext.Panel',
	id : 'wdlc_CWApplyForFees_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			title : '用款申请流程',
			items : [ {
				xtype : 'button',
				ui : 'back',
				text : '返回',
				id : 'wdlc_returnMyProcess'
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
					label : '编号',
					id:'fileno',
					name:'fileno',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '申请单位',
					id:'sqdw',
					name:'sqdw',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '标题',
					id:'subject',
					name:'subject',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '申请金额',
					id:'je',
					name:'je',
					labelWidth : '40%',
					placeHolder : '金额（元）'
				}, {
					xtype : 'textareafield',
					label : '申请原因',
					id:'reason_textarea',
					name:'reason_textarea',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				hidden : true,
				items : [{
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
				} ]
			}]
		}]
	}

});