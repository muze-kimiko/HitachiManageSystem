
/* JavaScript content from app/view/MyProcess/ShangHai/SHContractApproval.js in folder common */
Ext.define('HelcOA.view.MyProcess.ShangHai.SHContractApproval', {
	extend : 'Ext.Panel',
	id : 'wdlc_SHContractApproval_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.Select', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			id : 'wdlc_surface_ID',
			title : '上海合同审批申请',
			items : [ {
				xtype : 'button',
				id : 'wdlc_returnMyProcess',
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
					label : '编号',
					name : 'fileno',
					id : 'fileno',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '合同名称',
					name : 'subject',
					id : 'subject',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '合同编号',
					name : 'contractno',
					id : 'contractno',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '所属部门',
					name : 'dept',
					id : 'dept',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '金额（元）',
					name : 'htje',
					id : 'htje',
					labelWidth : '40%',
					required : true,
					placeHolder : '合同金额'
				}, {
					xtype : 'selectfield',
					label : '合同性质',
					name : 'contracttype',
					id : 'contracttype',
					labelWidth : '40%',
					options : [ {
						text : '',
						value : ''
					}, {
						text : '委托协议',
						value : '委托协议'
					}, {
						text : '采购合同',
						value : '采购合同'
					}, {
						text : '技术咨询',
						value : '技术咨询'
					}, {
						text : '技术服务',
						value : '技术服务'
					}, {
						text : '其它',
						value : '其它'
					} ],
					required : true
				}, {
					xtype : 'selectfield',
					label : '是否预算内',
					name : 'ysflag',
					id : 'ysflag',
					labelWidth : '40%',
					options : [ {
						text : '',
						value : ''
					}, {
						text : '是',
						value : '是'
					}, {
						text : '否',
						value : '否'
					} ]
				} ]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textfield',
					label : '起草人',
					name : 'agentman',
					id : 'agentman',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '电话',
					name : 'xmphone',
					id : 'xmphone',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '电子邮件',
					name : 'xmmailaddr',
					id : 'xmmailaddr',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '合同背景及要点说明*',
				items : [ {
					xtype : 'textareafield',
					label : '背景及要点',
					name : 'contect_textarea',
					id : 'contect_textarea',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '合作方',
				items : [ {
					xtype : 'textfield',
					label : '名称',
					name : 'hzname',
					id : 'hzname',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '地址',
					name : 'hzaddr',
					id : 'hzaddr',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '联系人',
					name : 'lxname',
					id : 'lxname',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '电话',
					name : 'lxphone',
					id : 'lxphone',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '电子邮件',
					name : 'lxmailaddr',
					id : 'lxmailaddr',
					labelWidth : '40%'
				} ]
			}, 
			{
				xtype : 'fieldset',
				title : '财务部门意见',
				items : [ {
					xtype : 'selectfield',
					label : '下一环节',
					name : 'cwlx',
					id : 'cwlx',
					labelWidth : '40%',
					options : [{
						text : '',
						value : ''
					}, {
						text : '总经理审批',
						value : '总经理审批'
					}, {
						text : '印章员用印',
						value : '印章员用印'
					}, {
						text : '否决',
						value : '否决'
					}]
				} ]
			},
			{
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
				}, {
					xtype : 'textfield',
					id : 'createdate',
					name : 'createdate'
				} ]
			} ]
		} ]
	}

});