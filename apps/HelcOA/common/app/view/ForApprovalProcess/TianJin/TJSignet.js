Ext.define('HelcOA.view.ForApprovalProcess.TianJin.TJSignet', {
	extend : 'Ext.Panel',
	id : 'sp_TJSignet_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		{
			xtype : 'toolbar',
			docked : 'top',
			id : 'surface_ID',
			title : '天津用印申请',
			items : [
			{
				xtype : 'button',
				ui : 'back',
				text : '返回',
				id : 'returnHome_ID'
			}, {
				xtype : 'spacer'
			}, {
				xtype: 'button',
				text : '下一步',
				id : 'idea_ID'
			} 
			]
		},
		{
			xtype : 'formpanel',
			flex : 1,
			id: 'fp',
			items : [ {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textfield',
					id : 'fileno',
					name : 'fileno',
					label : '编号',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入编号'
				},
				{
					xtype : 'textfield',
					id : 'agentman',
					name : 'agentman',
					label : '申请人',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入申请人'
				},
				{
					xtype : 'textfield',
					id : 'dept',
					name : 'dept',
					label : '申请部门',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入申请部门'
				},
				{
					xtype : 'textfield',
					id : 'createdate',
					name : 'createdate',
					label : '申请日期',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入申请日期'
				},
				{
					xtype : 'autoTextArea',
					label : '标题',
					labelWidth : '40%',
					id : 'subject',
					name : 'subject',
					required : true,
					placeHolder : '请输入标题'
				},
				{
					xtype : 'textfield',
					label : '份数',
					labelWidth : '40%',
					name : 'fenshu',
					id : 'fenshu',
					required : true,
					placeHolder : '请输入份数'
				},
				{
					xtype : 'autoTextArea',
					label : '申请理由',
					labelWidth : '40%',
					name : 'sqliyou_textarea',
					id : 'sqliyou_textarea',
					required : true,
					placeHolder : '请输入申请理由'
				},
				]
			}, 
			{
				xtype : 'fieldset',
				hidden : true,
				items : [
				{
					xtype : 'textfield',
					id : 'conds',
					name : 'conds',
					value:'nocon'
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
					xtype:'textfield',
					id:'ext1',
					name:'ext1'
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
				},
				{
					xtype: 'textfield',
					id: 'firflow',
					name: 'firflow'
				},{
					xtype: 'textfield',
					id: 'pi_flag',
					name: 'pi_flag'
				},
				{
					xtype: 'textfield',
					id: 'cfg_id',
				name: 'cfg_id'
				},
				{
					xtype: 'textfield',
					id: 'createflag',
					name: 'createflag'
				},]
			}]
		}]
	}
});