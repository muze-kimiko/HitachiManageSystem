Ext.define('HelcOA.view.Approved.ChengDu.CDSignature', {
	extend : 'Ext.Panel',
	id : 'ysp_CDSignature_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		{
		 			xtype : 'toolbar',
		 			docked : 'top',
		 			title : '接待客户来访、考察、参观工作联络单',
		 			items : [
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
				items : [ {
					xtype : 'textfield',
					id : 'fileno',
					name : 'fileno',
					label : '单号',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入单号'
				},
				{
					xtype : 'textfield',
					id : 'subject',
					name : 'subject',
					label : '标题',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入标题'
				},
				{
					xtype : 'textfield',
					label : '申请人',
					labelWidth : '40%',
					name : 'agentman',
					id : 'agentman',
					required : true,
					placeHolder : '请输入申请人'
				},
				{
					xtype : 'textfield',
					label : '申请部门',
					labelWidth : '40%',
					name : 'dept',
					id : 'dept',
					placeHolder : '请输入申请部门'
				},
				{
					xtype : 'textfield',
					label : '申请日期',
					labelWidth : '40%',
					name : 'createdate',
					id : 'createdate',
					placeHolder : '请输入申请日期'
				},
				{
					xtype : 'textfield',
					label : '份数',
					labelWidth : '40%',
					name : 'fs',
					id : 'fs',
					required : true,
					placeHolder : '请输入份数'
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
						},
						{
							text: '其他印章',
							value: '其他印章'
						}
					]
				},
				{
                             xtype: 'autoTextArea',
                             id: 'reason_textarea',
                             name: 'reason_textarea',
                             label: '申请理由',
                             labelWidth: '40%',
                             placeHolder: '请输入申请理由',
                         },
				{
                             xtype: 'autoTextArea',
                             id: 'remark_textarea',
                             name: 'remark_textarea',
                             label: '备注',
                             labelWidth: '40%',
                             placeHolder: '请输入备注',
                         },
                         
                     ]
                 },
			]},
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
				},  {
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
				},{
					xtype:'textfield',
					id:'ext1',
					name:'ext1'
				},{
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
                    id: 'agentpeofdep',
                    name: 'agentpeofdep',
                },
				{
                    xtype: 'textfield',
                    id: 'depflag',
                    name: 'depflag',
                },
				{
                    xtype: 'textfield',
                    id: 'tiaojian01',
                    name: 'tiaojian01',
                },
				{
                    xtype: 'textfield',
                    id: 'needzc',
                    name: 'needzc',
                }]
			}]
	}
});