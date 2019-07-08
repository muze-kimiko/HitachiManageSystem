
/* JavaScript content from app/view/HasEnded/InformationTechnology/softwarevindicate.js in folder common */
Ext.define('HelcOA.view.HasEnded.InformationTechnology.softwarevindicate', {
    extend: 'Ext.Panel',
    id: 'yjs_softwarevindicate_id',
    requires: [
               'Ext.Toolbar',
               'Ext.Button',
               'Ext.Spacer',
               'Ext.form.Panel',
               'Ext.form.FieldSet',
               'Ext.field.DatePicker',
               'Ext.picker.Date',
               'Ext.field.TextArea'
           ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'qc_surface_ID',
                title: '软件维护单',
                items: [
	                    {
	                        xtype: 'button',
	                        id: 'ysp_returnApproved',
	                        text: '返回',
	                        ui: 'back'
	                    },
                    {
                        xtype: 'spacer'
                    },
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                id: 'fp',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '编号',
                                labelWidth: '40%',
								name: 'fileno',
								id: 'fileno',
                            	readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '标题',
                                labelWidth: '40%',
								required: true,
								readOnly:true,
								name: 'subject',
								id: 'subject'
                            },
                            {
                                xtype: 'textfield',
                                label: '申请部门',
                                labelWidth: '40%',
								name: 'dept',
								id: 'dept',
								readOnly:true,
                            },
							{
								xtype: 'textfield',
								label: '申请日期',
                                labelWidth: '40%',
								id: 'createdate',
								name: 'createdate',
								readOnly:true,
							},
							{
								xtype: 'textfield',
								label: '申请完成时间',
                                labelWidth: '40%',
								id: 'completedate',
								name: 'completedate',
								readOnly:true,
							},
							{
								xtype : 'textfield',
								label : '信息系统名称',
								id : 'sysname',
								name : 'sysname',
								required : true,
								readOnly:true,
								labelWidth : '40%',
							},
							{
								xtype: 'textfield',
								label: '菜单名称',
                                labelWidth: '40%',
								id: 'menunm',
								name: 'menunm',
								required : true,
								readOnly:true,
							},
							{
								xtype: 'textfield',
								label: '申请人',
                                labelWidth: '40%',
								id: 'agentman',
								name: 'agentman',
								readOnly:true,
								readOnly:true,
							},
							{
								xtype: 'textfield',
								label: '联络电话',
                                labelWidth: '40%',
								id: 'tel',
								name: 'tel',
								required : true,
								readOnly:true,
							},
							{
								xtype : 'selectfield',
								label : '是否短信通知',
								id : 'sendmobile',
								name : 'sendmobile',
								readOnly:true,
								labelWidth : '40%',
							},
							{
								xtype:'textnumfield',
								label:'通知号码',
								id:'sendnumber',
								name:'sendnumber',
								labelWidth : '40%',
								disabled:true,
							},
							{
                                xtype: 'autoTextArea',
                                label: '现有状况(请详细描述)',
                                labelWidth: '40%',
								name: 'discribe_textarea',
								id: 'discribe_textarea',
								required: true,
								readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '需求功能(请详细描述)',
                                labelWidth: '40%',
								name: 'require_textarea',
								id: 'require_textarea',
								required: true,
								readOnly:true,
                            },
						]
					},
					{
                        xtype: 'fieldset',
                        title: '预计达到的效果',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                label: '提高哪些工作效率',
                                labelWidth: '40%',
								name: 'uprate',
								id: 'uprate',
								required: true,
								readOnly:true,
                            },
							{
                                xtype: 'autoTextArea',
                                label: '减少哪些用户工作',
                                labelWidth: '40%',
								name: 'delwork',
								id: 'delwork',
								required: true,
								readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '节省多少工作时间',
                                labelWidth: '40%',
								name: 'savetime',
								id: 'savetime',
								required: true,
								readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '改善前工时',
                                labelWidth: '40%',
								name: 'savet1',
								id: 'savet1',
								required: true,
								readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '改善后工时',
                                labelWidth: '40%',
								name: 'savet2',
								id: 'savet2',
								required: true,
								readOnly:true,
                            },
						]
					},
					{
                        xtype: 'fieldset',
                        title: '部门评估',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                label: '对现有业务管理流程造成什么样的影响及说明可能出现的风险控制点',
                                labelWidth: '40%',
								name: 'adventure',
								id: 'adventure',
								readOnly:true,
                            },
							{
                                xtype: 'autoTextArea',
                                label: '提高效率节省时间以后将如何调整用户工作及人员安排',
                                labelWidth: '40%',
								name: 'arrange',
								id: 'arrange',
								readOnly:true,
                            },
							{
                                xtype: 'autoTextArea',
                                label: '本业务部门哪些人员可以配合信息部门的开发工作（姓名和联系电话）',
                                labelWidth: '40%',
								name: 'partner',
								id: 'partner',
								readOnly:true,
                            },
							{
								xtype : 'selectfield',
								label : '优先级',
								id : 'grade',
								name : 'grade',
								labelWidth : '40%',
								readOnly:true,
							},
						]
					},
					{
                        xtype: 'fieldset',
                        title: '业务评估',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                label: '业务评估',
                                labelWidth: '40%',
								name: 'textarea2_textarea',
								id: 'textarea2_textarea',
								readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '人员选择',
                                labelWidth: '40%',
								name: 'ywychioce',
								id: 'ywychioce',
								readOnly:true,
                            },
						]
					},
					{
                        xtype: 'fieldset',
                        title: '技术评估',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '预计完成日期',
                                labelWidth: '40%',
								name: 'plandate',
								id: 'plandate',
								readOnly:true,
                            },
							{
                                xtype: 'selectfield',
                                label: '问题分类',
                                labelWidth: '40%',
								name: 'wtfl',
								id: 'wtfl',
								readOnly:true,
                            },
						]
					},
					{
                        xtype: 'fieldset',
                        title: '资源评估',
                        items: [
                            {
                                xtype: 'selectfield',
                                label: '是否第三方评审',
                                labelWidth: '40%',
								name: 'threecheck',
								id: 'threecheck',
								readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '第三方评审评审责任人',
                                labelWidth: '40%',
								name: 'threenm',
								id: 'threenm',
								readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '预计开发工时(小时)',
                                labelWidth: '40%',
								name: 'kfgs',
								id: 'kfgs',
								readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '责任人',
                                labelWidth: '40%',
								name: 'fzpeo',
								id: 'fzpeo',
								readOnly:true,
                            },
						]
					},
					{
                        xtype: 'fieldset',
                        title: '程序开发意见',
                        items: [
							{
                                xtype: 'textfield',
                                label: '实际开发工时(小时)',
                                labelWidth: '40%',
								name: 'sjgs',
								id: 'sjgs',
								readOnly:true,
                            },
						]
					},
					{
						xtype: 'fieldset',
						hidden: true,
						items: [
							{
								xtype: 'textfield',
								id: 'conds',
								name: 'conds'
							},
							{
								xtype: 'textfield',
								id: 'userid',
								name: 'userid'
							},
							{
								xtype: 'textfield',
								id: 'type',
								name: 'type'
							},
							{
								xtype: 'textfield',
								id: 'username',
								name: 'username'
							},
							{
								xtype: 'textfield',
								id: 'node',
								name: 'node'
							},
							{
								xtype: 'textfield',
								id: 'ctime',
								name: 'ctime'
							},
							{
								xtype: 'textfield',
								id: 'piid',
								name: 'piid'
							},
							{
								xtype: 'textfield',
								id: 'processname',
								name: 'processname'
							},
							{
								xtype: 'textfield',
								id: 'curauthor',
								name: 'curauthor'
							},
							{
								xtype: 'textfield',
								id: 'dealmen',
								name: 'dealmen'
							},
							{
								xtype: 'textfield',
								id: 'ygbh',
								name: 'ygbh'
							},
							{
								xtype: 'textfield',
								id: 'form',
								name: 'form'
							},
							{
								xtype: 'textfield',
								id: 'arcpath',
								name: 'arcpath'
							},
							{
								xtype: 'textfield',
								id: 'arcdate',
								name: 'arcdate'
							},
							{
								xtype: 'textfield',
								id: 'idea',
								name: 'idea'
							},
							{
								xtype: 'textfield',
								id: 'endprocessdate',
								name: 'endprocessdate'
							},
							{
								xtype: 'textfield',
								id: 'audit_list',
								name: 'audit_list'
							},
							{
								xtype: 'textfield',
								id: 'taskid',
								name: 'taskid'
							},
							{
								xtype: 'textfield',
								id: 'ext1',
								name: 'ext1',
							},
							{
								xtype: 'textfield',
								id: 'mast',
								name: 'mast'
							},
							{
								xtype: 'textfield',
								id: 'audit_list',
								name: 'audit_list'
							},
							{
								xtype: 'textfield',
								id: 'fxy',
								name: 'fxy'
							},
							{
								xtype: 'textfield',
								id: 'ssy',
								name: 'ssy'
							},
							{
								xtype: 'textfield',
								id: 'shishizuz',
								name: 'shishizuz'
							},
							{
								xtype: 'textfield',
								id: 'xxkez',
								name: 'xxkez'
							},
							{
								xtype: 'textfield',
								id: 'fabu',
								name: 'fabu'
							},
							{
								xtype: 'textfield',
								id: 'faburen',
								name: 'faburen'
							},
							{
								xtype: 'textfield',
								id: 'count',
								name: 'count'
							},
							{
								xtype: 'textfield',
								id: 'shijian',
								name: 'shijian'
							},
							{
								xtype: 'textfield',
								id: 'depid',
								name: 'depid'
							},
							{
								xtype: 'textfield',
								id: 'other_name',
								name: 'other_name'
							}
						]     	
					}
				]
			}
		]
	}
});