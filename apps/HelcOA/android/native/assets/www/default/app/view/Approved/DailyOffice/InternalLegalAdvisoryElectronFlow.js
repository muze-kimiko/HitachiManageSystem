
/* JavaScript content from app/view/Approved/DailyOffice/InternalLegalAdvisoryElectronFlow.js in folder common */
Ext.define('HelcOA.view.Approved.DailyOffice.InternalLegalAdvisoryElectronFlow', {
    extend: 'Ext.Panel',
    id: 'ysp_InternalLegalAdvisoryElectronFlow_ID',
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
                id: 'ysp_surface_ID',
                title: '内部法律咨询流程',
                items: [{
                	xtype: 'button',
                    id: 'ysp_returnApproved',
                    text: '返回',
                    ui: 'back'
                }]
            },
            {
                xtype: 'formpanel',
                id: 'fp',
                flex: 1,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'fileno',
                                name: 'fileno',
                                label: '编号',
                                labelWidth: '40%',
                                readOnly:true,
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textfield',
                                id: 'subject',
                                name: 'subject',
                                label: '标题',
                                labelWidth: '40%',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入标题'
                            },
                            {
                                xtype: 'textfield',
                                id: 'dept',
                                name: 'dept',
                                label: '起草部门',
                                labelWidth: '40%',
                                readOnly:true,
                                placeHolder: '请输入起草部门'
                            },
                            {
                                xtype: 'textfield',
                                id: 'createdate',
                                name: 'createdate',
                                label: '起草日期',
                                labelWidth: '40%',
                                readOnly:true,
                                placeHolder: '请输入起草日期',
//                                listeners:{
//                                	focus:function(){
//                                		initDate(Ext.getCmp('createdate').getValue(),'申请日期','createdate');
//                                	}
//                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'agentman',
                                name: 'agentman',
                                label: '起草人',
                                labelWidth: '40%',
                                readOnly:true,
                                placeHolder: '请输入起草人'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'zxlx',
                                label: '法律咨询',
                                labelWidth: '40%',
                                readOnly:true,
                                required: true,
                                options: [
                                    {
                                        text: '合同',
                                        value: '合同'
                                    },
                                    {
                                        text: '知识产权',
                                        value: '知识产权'
                                    },
                                    {
                                        text: '劳动关系',
                                        value: '劳动关系'
                                    },
                                    {
                                        text: '侵权案件',
                                        value: '侵权案件'
                                    },
                                    {
                                        text: '婚姻家庭',
                                        value: '婚姻家庭'
                                    },
                                    {
                                        text: '行政起诉',
                                        value: '行政起诉'
                                    },
                                    {
                                        text: '其他法律问题',
                                        value: '其他法律问题'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                id: 'reason_textarea',
                                label: '主要内容',
                                labelWidth: '40%',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入主要内容'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'tel',
                                label: '联系电话',
                                labelWidth: '40%',
                                readOnly:true,
                                placeHolder: '请输入联系电话'
                            },
                            {
                                xtype: 'textfield',
                                id: 'email',
                                label: '邮箱',
                                labelWidth: '40%',
                                readOnly:true,
                                placeHolder: '请输入邮箱'
                            },
                            {
                                xtype: 'textfield',
                                id: 'sendreader',
                                label: '抄送',
                                readOnly:true,
                                labelWidth: '40%'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'completeddate',
                                label: '完成日期',
                                labelWidth: '40%',
                                readOnly:true,
                                placeHolder: '点击设置时间',
//                                listeners:{
//                                	focus:function(){
//                                		initDate2('completeddate','完成日期');
//                                	}
//                                }
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'recycle',
                                label: '处理周期',
                                labelWidth: '40%',
                                readOnly:true,
                                placeHolder: '请输入处理周期(天)'
                            }
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
//                            {
//                                xtype: 'textfield',
//                                id: 'createdate',
//                                name: 'createdate'
//                            },
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
                                id: 'mast',
                                name: 'mast'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'firflow',
                            	name: 'firflow'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});