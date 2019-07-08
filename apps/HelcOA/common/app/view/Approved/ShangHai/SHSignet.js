Ext.define('HelcOA.view.Approved.ShangHai.SHSignet', {
	extend : 'Ext.Panel',
	id : 'ysp_SHSignet_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		            {
		                xtype: 'toolbar',
		                docked: 'top',
		                id: 'ysp_surface_ID',
		                title: '',
		                items: [
		                        {
		                            xtype: 'button',
		                            id: 'ysp_returnApproved',
		                            text: '返回',
		                            ui: 'back'
		                        },
		                ]
		            },
		{
			xtype : 'formpanel',
			flex : 1,
			id: 'fp',
			items : [ {
				xtype : 'fieldset',
				title : '',
				items : [
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
					label : '标题',
					labelWidth : '40%',
					id : 'createdate',
					name : 'createdate',
					required : true,
					placeHolder : '请输入标题'
				},
				{
					xtype : 'textfield',
					label : '份数',
					labelWidth : '40%',
					name : 'fs',
					id : 'fs',
					placeHolder : '请输入份数'
				},
				
				{
					xtype : 'autoTextArea',
					label : '申请理由',
					labelWidth : '40%',
					name : 'reason_textarea',
					id : 'reason_textarea',
					required : true,
					placeHolder : '请输入申请理由'
				},
				{
					xtype : 'autoTextArea',
					label : '备注',
					labelWidth : '40%',
					name : 'remark_textarea',
					id : 'remark_textarea',
					required : true,
					placeHolder : '请输入申请理由'
				},
				{
					xtype: 'selectfield',
					id: 'yztype',
					label: '用章类别',
					required : true,
					labelWidth: '40%',
					placeHolder: '请选择用章类别',
					options: [										          
						{
							text: '',
							value: ''
						}, 
						{
							text: '公章',
							value: '公章'
						},
						{
							text: '法人章',
							value: '法人章'
						}
					]
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
				},
				{
					xtype: 'textfield',
					id: 'needzc',
					name: 'needzc'
				},
				{
					xtype: 'textfield',
					id: 'agentpeofdep',
					name: 'agentpeofdep'
				},
				{
					xtype: 'textfield',
					id: 'depflag',
					name: 'depflag'
				},
				{
					xtype: 'textfield',
					id: 'fileno',
					name: 'fileno'
				}]
			}]
		}]
	}
});