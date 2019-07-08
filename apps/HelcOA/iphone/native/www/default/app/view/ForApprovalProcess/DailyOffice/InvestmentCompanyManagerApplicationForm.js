
/* JavaScript content from app/view/ForApprovalProcess/DailyOffice/InvestmentCompanyManagerApplicationForm.js in folder common */
Ext.define('HelcOA.view.ForApprovalProcess.DailyOffice.InvestmentCompanyManagerApplicationForm', {
    extend: 'Ext.Panel',
    id: 'sp_InvestmentCompanyManagerApplicationForm_id',
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
                id: 'surface_ID',
                docked: 'top',
                title: '投资公司经理出差申请表',
                items: [
                    {
                    	xtype: 'button',
                        iconCls: 'home',
                        id: 'returnHome_ID'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                    	text: '下一步',
                        id: 'idea_ID',
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
//                                    id: 'idea_ID',
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
//                        itemId: 'mybutton10',
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
                                label: '编号',
                                labelWidth: '40%',
                                placeHolder: '请输入编号'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '出差人员',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入出差人员姓名'
                            },
                            {
                                xtype: 'textfield',
                                label: '公司名称',
                                labelWidth: '40%',
                                placeHolder: '请输入公司名称'
                            },
                            {
                                xtype: 'textfield',
                                label: '联系电话',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入联系电话'
                            },
                            {
                                xtype: 'textfield',
                                label: '财务主管',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入本公司财务主管'
                            },
                            {
                                xtype: 'textfield',
                                label: '标题',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入标题'
                            },
                            {
                                xtype: 'textfield',
                                label: '地点',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入出差地点'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '时间(天)',
                        items: [
                            {
                                xtype: 'datepickerfield',
                                label: '预定出发',
                                labelWidth: '40%',
                                placeHolder: '请输入预定出发时间',
                                picker: {
                                    doneButton: '完成',
                                    cancelButton: '取消'
                                }
                            },
                            {
                                xtype: 'datepickerfield',
                                label: '预定逗留',
                                labelWidth: '40%',
                                placeHolder: '请输入预定逗留天数',
                                picker: {
                                    doneButton: '完成',
                                    cancelButton: '取消'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '涉及项目',
                                labelWidth: '40%',
                                placeHolder: '请输入联络人姓名'
                            },
                            {
                                xtype: 'textfield',
                                label: '会晤人员',
                                labelWidth: '40%',
                                placeHolder: '请输入联络部门'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textareafield',
                                label: '出差事由',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入联络内容'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'selectfield',
                                label: '报告形式',
                                labelWidth: '40%',
                                placeHolder: '请选择出差报告形式',
                                options: [
                                    {
                                        text: '口头报告',
                                        value: '口头报告'
                                    },
                                    {
                                        text: '书面报告',
                                        value: '书面报告'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

});