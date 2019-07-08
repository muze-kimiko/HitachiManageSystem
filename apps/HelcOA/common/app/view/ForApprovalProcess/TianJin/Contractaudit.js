Ext.define('HelcOA.view.ForApprovalProcess.TianJin.Contractaudit', {
	extend : 'Ext.Panel',
	id : 'sp_Contractaudit_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		{
			xtype : 'toolbar',
			docked : 'top',
			id : 'surface_ID',
			title : '天津合同审批',
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
					xtype : 'autoTextArea',
					label : '合同名称',
					labelWidth : '40%',
					id : 'subject',
					name : 'subject',
					required : true,
					placeHolder : '请输入合同名称'
				},
				{
					xtype : 'autoTextArea',
					label : '合同编号',
					labelWidth : '40%',
					id : 'htbh',
					name : 'htbh',
					placeHolder : '请输入合同编号'
				},
				{
					xtype : 'textfield',
					label : '所属部门',
					labelWidth : '40%',
					readOnly:true,
					name : 'dept',
					id : 'dept',
					placeHolder : '请输入所属部门'
				},
				{
					xtype : 'textfield',
					label : '合同金额',
					labelWidth : '40%',
					name : 'htje',
					id : 'htje',
					required : true,
					placeHolder : '请输入合同金额'
				},
				{
					xtype : 'selectfield',
					label : '合同性质',
					id : 'htxz',
					name : 'htxz',
					labelWidth : '40%',
					required : true,
					placeHolder : '请选择合同性质',
					options : [{
						text : '委托协议',
						value:'委托协议'
							
					}, {
						text : '采购合同',
						value:'采购合同'
					}, {
						text : '技术咨询',
						value:'技术咨询'
					}, {
						text : '技术服务',
						value:'技术服务'
					}, {
						text : '其他',
						value:'其他'
					}],
				},
				{
					xtype : 'selectfield',
					label : '是否预算内',
					id : 'isysn',
					name : 'isysn',
					required : true,
					labelWidth : '40%',
					placeHolder : '请选择合同性质',
					options : [{
						text : '否',
						value:'否'
							
					}, {
						text : '是',
						value:'是'
					}],
				},
				{
					xtype : 'textfield',
					label : '起草人姓名',
					labelWidth : '40%',
					name : 'agentman',
					id : 'agentman',
					readOnly:true,
					placeHolder : '请输入起草人姓名'
				},
				{
					xtype : 'textfield',
					label : '起草人电话',
					labelWidth : '40%',
					name : 'tel',
					id : 'tel',
					required : true,
					placeHolder : '请输入起草人电话'
				},
				{
					xtype : 'textfield',
					label : '起草人邮件',
					labelWidth : '40%',
					name : 'mail',
					id : 'mail',
					required : true,
					placeHolder : '请输入起草人邮件'
				},
				{
					xtype : 'autoTextArea',
					label : '合同背景及要点说明',
					labelWidth : '40%',
					name : 'shm_textarea',
					id : 'shm_textarea',
					required : true,
					placeHolder : '请输入合同背景及要点说明'
				},
				]
			}, 
			{
				xtype : 'fieldset',
				title : '合作方意见',
				items : [ 
				{
					xtype:'textnumfield',
					label:'合作方名称',
					id:'hzmc',
					name:'hzmc',
					placeHolder:'请输入合作方名称',
					labelWidth : '40%',
				},
				{
					xtype:'textnumfield',
					label:'合作方地址',
					id:'addr',
					name:'addr',
					placeHolder:'请输入合作方地址',
					labelWidth : '40%',
				},
				{
					xtype:'textnumfield',
					label:'联系人',
					id:'lxr',
					name:'lxr',
					placeHolder:'请输入联系人',
					labelWidth : '40%',
				},
				{
					xtype:'textnumfield',
					label:'合作方联系电话',
					id:'lxdh',
					name:'lxdh',
					placeHolder:'请输入合作方联系电话',
					labelWidth : '40%',
				},
				{
					xtype:'textnumfield',
					label:'电子邮件',
					id:'email',
					name:'email',
					placeHolder:'请输入电子邮件',
					labelWidth : '40%',
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
				},{
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
					id : 'createdate',
					name : 'createdate'
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
				},]
			}]
		}]
	}
});