Ext.define('HelcOA.view.ForApprovalProcess.TianJin.TJClientInform', {
	extend : 'Ext.Panel',
	id : 'sp_TJClientInform_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		 		{
					xtype : 'toolbar',
					docked : 'top',
					title : '电脑资料用户表申请',
					items : [
					{
						xtype: 'button',
						id: 'ysp_returnApproved',
						text: '返回',
						ui: 'back'
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
					label : '单号',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入单号'
				},
				{
					xtype : 'textfield',
					id : 'agentman',
					name : 'agentman',
					label : '填单人',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入填单人'
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
					label : '联系人电话',
					labelWidth : '40%',
					name : 'phone',
					id : 'phone',
					placeHolder : '请输入联系人电话'
				},
				{
					xtype: 'selectfield',
					id: 'leixing',
					label: '申请类型',
					required : true,
					labelWidth: '40%',
					placeHolder: '请选择申请类型',
					options: [										          
						{
							text: '',
							value: ''
						}, 
						{
							text: '新电脑帐号（域账号）',
							value: '新电脑帐号（域账号）'
						},
						{
							text: '帐号修改权限',
							value: '帐号修改权限'
						},
						{
							text: '帐号取消',
							value: '帐号取消'
						},
						{
							text: '网络文件夹权限',
							value: '网络文件夹权限'
						}
					]
				},
				{
					xtype : 'selectfield',
					label : '短信通知',
					id : 'sendmobile',
					labelWidth : '40%',
					placeHolder : '请选择短信通知',
					options : [ {
						text : '不需要',
						value : '不需要'
					}, {
						text : '需要',
						value : '需要'
					} ],
					listeners : {
						change : function(
								select,
								newValue,
								oldValue) {
							if (newValue == '需要') {
								Ext
										.getCmp(
												'sendnumber')
										.setDisabled(
												false);
								Ext
										.getCmp(
												'sendnumber')
										.focus();
							} else {
								Ext
										.getCmp(
												'sendnumber')
										.setValue(
												'');
								Ext
										.getCmp(
												'sendnumber')
										.setDisabled(
												true);
							}
						}
					}
				},
				{
					xtype : 'textnumfield',
					label : '通知号码',
					id : 'sendnumber',
					name : 'sendnumber',
					placeHolder : '请输入短信通知号码',
					labelWidth : '40%',
					disabled : true
				},
				{
					xtype : 'autoTextArea',
					label : '申请理由',
					labelWidth : '40%',
					name : 'liyou_textarea',
					id : 'liyou_textarea',
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
				},{
					xtype: 'textfield',
					id: 'createdate',
					name: 'createdate'
				},
				{
					xtype: 'textfield',
					id: 'needzc',
					name: 'needzc'
				},]
			}]
		}]
	}
});