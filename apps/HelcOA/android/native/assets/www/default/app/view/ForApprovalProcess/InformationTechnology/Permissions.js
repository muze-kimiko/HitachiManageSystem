
/* JavaScript content from app/view/ForApprovalProcess/InformationTechnology/Permissions.js in folder common */
/*Sured by QiuXL 20170612*/
Ext.define('HelcOA.view.ForApprovalProcess.InformationTechnology.Permissions', {
	extend : 'Ext.Panel',
	id : 'sp_Permissions_ID',
	requires : ['Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.Label', 'Ext.field.Select', 'Ext.field.TextArea'],
	config : {
		layout : 'vbox',
		items : [{
				xtype : 'toolbar',
				docked : 'top',
				id : 'surface_ID',
				title : '用户权限申请流程',
				items : [{
						xtype : 'button',
						id : 'returnHome_ID',
						ui : 'back',
						text : '返回'
					}, {
						xtype : 'spacer'
					}, {
						xtype : 'button',
						id : 'idea_ID',
						text : '下一步'
					}
				]
			}, {
				xtype : 'formpanel',
				id : 'fp',
				flex : 1,
				items : [{
						xtype : 'fieldset',
						instructions : '',
						title : '',
						items : [{
								xtype : 'label',
								html : '此流程只适用于用户权限的新增/变更的申请并且需简述清楚申请权限职能和原因，不适用于系统登陆账号申请，如要申请开通系统账号，请通过<系统网络帐号权限申请>电子流程进行申请即可。 <p/>如对本流程有任何疑问请致信息中心020-39908380(分机8380) 黎展亮。<p/>温馨提示：联系电话的填写，请分公司人员加手机号。',
								style : 'color:red;text-indent:2em'
							}
						]
					}, {
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'textfield',
								id : 'fileno',
								label : '编号',
								labelWidth : '40%',
								name : 'fileno'
							}, {
								xtype : 'textfield',
								id : 'subject',
								label : '标题',
								labelWidth : '40%',
								name : 'subject',
								required : true
							}, {
								xtype : 'textfield',
								id : 'agentman',
								label : '申请人',
								labelWidth : '40%',
								name : 'agentman'
							}, {
								xtype : 'textfield',
								id : 'createdate',
								label : '申请时间',
								labelWidth : '40%',
								name : 'createdate'
							}, {
								xtype : 'textfield',
								id : 'dept',
								label : '申请部门',
								labelWidth : '40%',
								name : 'dept'
							}, {
								xtype : 'textfield',
								id : 'phone',
								label : '联系电话',
								labelWidth : '40%',
								name : 'phone',
								required : true
							}
						]
					}, {
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'textfield',
								id : 'sqtype',
								label : '申请类型',
								labelWidth : '40%',
								name : 'sqtype',
							}, {
								xtype : 'textfield',
								id : 'sysname',
								label : '系统名称',
								labelWidth : '40%',
								name : 'sysname',
							}, {
								xtype : 'textfield',
								id : 'usedep',
								label : '使用人部门',
								labelWidth : '40%',
								name : 'usedep',
							}, {
								xtype : 'textfield',
								id : 'gangwei',
								label : '使用人岗位',
								labelWidth : '40%',
								name : 'gangwei',
							}
						]
					}, {
						xtype : 'fieldset',
						title : '申请权限简述*',
						items : [{
								xtype : 'autoTextArea',
								id : 'sqyy1_textarea',
								name : 'sqyy1_textarea',
								label : '简述',
								labelWidth : '40%',
							}
						]
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
							}
						]
					}
				]
			}
		]
	}
});
