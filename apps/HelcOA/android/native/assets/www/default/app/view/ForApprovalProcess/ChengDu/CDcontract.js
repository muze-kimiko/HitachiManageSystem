
/* JavaScript content from app/view/ForApprovalProcess/ChengDu/CDcontract.js in folder common */
Ext.define('HelcOA.view.ForApprovalProcess.ChengDu.CDcontract', {
	extend : 'Ext.Panel',
	id : 'sp_CDCar_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		{
			xtype : 'toolbar',
			docked : 'top',
			id : "surface_ID",
			title : '成都合同审批流程',
			items : [
			{
            	xtype: 'button',
                iconCls: 'home',
                id: 'returnHome_ID'
            },
            {
                xtype: 'spacer'
            },
            {
                xtype: 'button',
                id: 'idea_ID',
                text: '下一步'
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
					label : '合同名称',
					labelWidth : '40%',
					name : 'subject',
					id : 'subject',
					required : true,
					placeHolder : '请输入合同名称'
				},
				{
					xtype : 'textfield',
					label : '合同编号',
					labelWidth : '40%',
					name : 'contractno',
					id : 'contractno',
					required : true,
					placeHolder : '请输入合同编号'
				},
				{
					xtype : 'textfield',
					label : '所属部门',
					labelWidth : '40%',
					name : 'dept',
					id : 'dept',
					required : true,
					placeHolder : '请输入所属部门'
				},
				{
					xtype : 'textfield',
					label : '合同金额(元)',
					labelWidth : '40%',
					name : 'htje',
					id : 'htje',
					required : true,
					placeHolder : '请输入合同金额(元)'
				},
				{
					xtype: 'selectfield',
					id: 'contracttype',
					label: '合同性质',
					required : true,
					labelWidth: '40%',
					placeHolder: '请选择合同性质',
					options: [										          
						{
							text: '',
							value: ''
						}, 
						{
							text: '委托协议',
							value: '委托协议'
						},
						{
							text: '采购合同',
							value: '采购合同'
						},
						{
							text: '技术咨询',
							value: '技术咨询'
						},
						{
							text: '技术服务',
							value: '技术服务'
						},
						{
							text: '其他',
							value: '其他'
						}
					]
				},
				{
					xtype: 'selectfield',
					id: 'ysflag',
					label: '是否预算内',
					required : true,
					labelWidth: '40%',
					placeHolder: '请选择是否预算内',
					options: [										          
						{
							text: '',
							value: ''
						}, 
						{
							text: '是',
							value: '是'
						},
						{
							text: '否',
							value: '否'
						}
					]
				},
				{
					xtype : 'textfield',
					label : '起草人姓名',
					labelWidth : '40%',
					name : 'xmfzr',
					id : 'xmfzr',
					required : true,
					placeHolder : '请输入起草人姓名'
				},
				{
					xtype : 'textfield',
					label : '电话',
					labelWidth : '40%',
					name : 'xmphone',
					id : 'xmphone',
					placeHolder : '请输入电话'
				},
				{
					xtype : 'textfield',
					label : '电子邮件',
					labelWidth : '40%',
					name : 'xmmailaddr',
					id : 'xmmailaddr',
					placeHolder : '请输入电子邮件'
				},
				{
					xtype : 'textfield',
					label : '联系电话',
					labelWidth : '40%',
					name : 'phone',
					id : 'phone',
					placeHolder : '请输入联系电话',
				},
				{
					xtype : 'textfield',
					label : '合同背景及要点说明',
					labelWidth : '40%',
					name : 'contect_textarea',
					id : 'contect_textarea',
					placeHolder : '请输入合同背景及要点说明'
				},
				 {
                     xtype: 'fieldset',
                     title: '合作方',
                     items: [
                         {
                             xtype: 'textfield',
                             id: 'hzname',
                             name: 'hzname',
                             label: '名称',
                             required: true,
                             labelWidth: '40%',
                             placeHolder: '请输入名称'
                         },
                         {
                             xtype: 'textfield',
                             id: 'hzaddr',
                             name: 'hzaddr',
                             label: '地址',
                             required:true,
                             labelWidth: '40%',
                             placeHolder: '请输入地址'
                         },
                         {
                             xtype: 'textfield',
                             id: 'lxname',
                             name: 'lxname',
                             label: '联系人',
                             required: true,
                             labelWidth: '40%',
                             placeHolder: '请输入联系人'
                         },
                         {
                             xtype: 'textfield',
                             id: 'lxphone',
                             name: 'lxphone',
                             label: '电话',
                             labelWidth: '40%',
                             placeHolder: '请输入电话'
                         },
                         {
                             xtype: 'textnumfield',
                             id: 'lxmailaddr',
                             name: 'lxmailaddr',
                             label: '电子邮件',
                             labelWidth: '40%',
                             placeHolder: '请输入电子邮件',
                         },
                         {
                             xtype: 'textnumfield',
                             id: 'reamrk_textarea',
                             name: 'reamrk_textarea',
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
				}, {
					xtype : 'textfield',
					id : 'agentman',
					name : 'agentman'
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
		}]
	}
});