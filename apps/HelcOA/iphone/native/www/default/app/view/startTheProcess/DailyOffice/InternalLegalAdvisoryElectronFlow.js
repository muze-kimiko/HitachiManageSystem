
/* JavaScript content from app/view/startTheProcess/DailyOffice/InternalLegalAdvisoryElectronFlow.js in folder common */
Ext.define('HelcOA.view.startTheProcess.DailyOffice.InternalLegalAdvisoryElectronFlow', {
    extend: 'Ext.Panel',
    id: 'qc_InternalLegalAdvisoryElectronFlow_id',
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
                title: '内部法律咨询流程',
                items: [
                    {
                    	xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        id: 'qc_returnStartTheProcessName_ID'
                    },
                    {
                        xtype: 'spacer'
                    },{
                        text: '下一步',
                        id:'qc_ToSelectNode',
                        handler: function() {
                            Ext.Viewport.removeMenu('right');
                        }
                    },
//                    {
//                        xtype: 'button',
//                        handler: function(button, e) {
//                            var menu = Ext.create('Ext.Menu', {
//                                items: [
//                                {
//                                	text: '下一步',
//                                    id: 'qc_ToSelectNode',
//                                    handler: function() {
//                                        Ext.Viewport.removeMenu('right');
//                                    }
//                                },
//                                {
//                                    text: '保存',
//                                    handler: function() {
//                                        Ext.Viewport.removeMenu('right');
//                                    }
//                                },
//                                {
//                                    text: '意见',
//                                    handler: function() {
//                                        Ext.Viewport.removeMenu('right');
//                                    }
//                                }
//                                ]
//                            });
//
//                            Ext.Viewport.setMenu(menu, {
//                                side: 'right',
//                                reveal: false
//                            });
//
//                            Ext.Viewport.showMenu('right');
//                        },
//                        itemId: 'mybutton5',
//                        iconCls: 'more'
//                    }
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
                                id: 'fileno',
                                name: 'fileno',
                                label: '编号',
                                labelWidth: '40%',
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textfield',
                                id: 'subject',
                                name: 'subject',
                                label: '标题',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入标题'
                            },
                            {
                                xtype: 'textfield',
                                id: 'dept',
                                name: 'dept',
                                label: '起草部门',
                                labelWidth: '40%',
                                placeHolder: '请输入起草部门'
                            },
                            {
                                xtype: 'textfield',
                                id: 'createdate',
                                name: 'createdate',
                                label: '起草日期',
                                labelWidth: '40%',
                                placeHolder: '请输入起草日期',
                                listeners:{
                                	focus:function(){
                                		initDate(Ext.getCmp('createdate').getValue(),'申请日期','createdate');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'agentman',
                                name: 'agentman',
                                label: '起草人',
                                labelWidth: '40%',
                                placeHolder: '请输入起草人'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'zxlx',
                                label: '法律咨询',
                                labelWidth: '40%',
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
                                placeHolder: '请输入联系电话'
                            },
                            {
                                xtype: 'textfield',
                                id: 'email',
                                label: '邮箱',
                                labelWidth: '40%',
                                placeHolder: '请输入邮箱'
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'autoTextArea',
                                        id:'sendreader',
                                        width: '85%',
                                        labelWidth: '48%',
                                        label: '抄送',
                                    },
                                    {
                                        xtype: 'button',
                                        height: 41,
                                        style: 'border:0;',
                                        width: '15%',
                                        iconCls: 'search',
                                        text: '',
                                        listeners:{
                                        	tap:function(){
                                        		object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('sendreader');
                                        	}
                                        }
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
                                xtype: 'textfield',
                                id: 'completeddate',
                                label: '完成日期',
                                labelWidth: '40%',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('completeddate','完成日期');
                                	}
                                }
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'recycle',
                                label: '处理周期',
                                labelWidth: '40%',
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