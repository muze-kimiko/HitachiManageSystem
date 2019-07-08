Ext.define('HelcOA.view.Approved.ChengDu.CDFileBorrowingOrCopy', {
    extend: 'Ext.Panel',
    id: 'ysp_CDFileBorrowingOrCopy_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Number',
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
                title: '',
                items: [
                        {
                            xtype: 'button',
                            id: 'ysp_returnApproved',
                            text: '返回',
                            ui: 'back'
                        },
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                id: 'fp',
                layout: 'vbox',
                items: [
                        {
                            xtype: 'fieldset',
                            instructions: '',
                            title: '',
                            items: [
                                {
                                    xtype: 'label',
                                    html: '温馨提示 <p/>1.申请使用档案资料的用户必须遵守WI-ZL-011 科技类档案管理规则相关规定。<p/>2.申请的档案资料未经同意，不得随意复印、外泄，应按要求妥善保管。<p/>3.起草流程时应按要求认真填写，申请的用途不能只写“工作需要”、“领导要求”等用语，应对申请用途清晰描述<p/>4.为了树立绿色理念合理利用资源，复印申请原则上仅提供电子扫描件，请注意查收<p/>5.一个流程最多只能申请10份档案资料，不能以附件添加申请，多出10份请起草另一个流程<p/>6.“编号”可填合同号、工号、档案号等，一行只能写一个编号。',
                                    style: 'color:red;text-indent:2em'
                                }
                            ]
                        },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'fileno',
                                label: '编号',
                                labelWidth: '40%',
                                name: 'fileno',
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textfield',
                                id: 'agentman',
                                label: '申请人',
                                labelWidth: '40%',
                                name: 'agentman',
                                placeHolder: '请输入申请人'
                            },
                            {
                                xtype: 'textfield',
                                id: 'dept',
                                label: '申请部门',
                                labelWidth: '40%',
                                name: 'dept',
                                placeHolder: '请输入申请部门'
                            },
                            {
                                xtype: 'textfield',
                                id: 'phone2',
                                label: '联系电话',
                                labelWidth: '40%',
                                name: 'phone2',
                                placeHolder: '请输入联系电话'
                            },
                            {
                                xtype: 'textfield',
                                id: 'sqtype',
                                label: '申请类型',
                                labelWidth: '40%',
                                name: 'sqtype',
                                placeHolder: '请输入申请类型'
                            },
                            {
                                xtype: 'textfield',
                                id: 'createdate',
                                label: '申请日期',
                                labelWidth: '40%',
                                name: 'createdate',
                                placeHolder: '请输入申请日期'
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date',
                                label: '要求完成日期',
                                labelWidth: '40%',
                                name: 'date',
                                placeHolder: '请选择要求完成日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date','要求完成日期');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'subject',
                                label: '标题',
                                labelWidth: '40%',
                                name: 'subject',
                                required: true,
                                placeHolder: '请输入标题'
                            },
                            {
                                xtype: 'autoTextArea',
                                id: 'sqcontent_textarea',
                                label: '申请用途',
                                labelWidth: '40%',
                                name: 'sqcontent_textarea',
                                required: true,
                                placeHolder: '请输入申请用途'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'bh',
                                label: '编号',
                                labelWidth: '40%',
                                name: 'bh',
                                required: true,
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'zcdno',
                                label: '档案资料名称',
                                labelWidth: '40%',
                                name: 'zcdno',
                                required: true,
                                placeHolder: '请输入档案资料名称'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifag',
                                label: '申请部门是否同意',
                                labelWidth: '40%',
                                name: 'ifag',
                                placeHolder: '请选择申请部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },                            
                            {
                                xtype: 'selectfield',
                                id: 'mj',
                                label: '密级',
                                labelWidth: '40%',
                                name: 'mj',
                                placeHolder: '请选择密级',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '一般级',
                                              value: '一般级'
                                          },
                                          {
                                        	  text: '机密级',
                                        	  value: '机密级'
                                          },
                                          {
                                        	  text: '绝密级',
                                        	  value: '绝密级'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifyf',
                                label: '资料确认有/否',
                                labelWidth: '40%',
                                name: 'ifyf',
                                placeHolder: '请选择资料确认有/否',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifty',
                                label: '文控部门是否同意',
                                labelWidth: '40%',
                                name: 'ifty',
                                placeHolder: '请选择文控部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'txz',
                                label: '种类',
                                labelWidth: '40%',
                                name: 'txz',
                                required: true,
                                placeHolder: '请输入种类'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'page',
                                label: '页数',
                                labelWidth: '40%',
                                name: 'page',
                                required: true,
                                placeHolder: '请输入页数'
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date1',
                                label: '用户归还日期',
                                labelWidth: '40%',
                                name: 'date1',
                                placeHolder: '请选择用户归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date1','用户归还日期');
                                	}
                                }
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date12',
                                label: '处理人确认归还日期',
                                labelWidth: '40%',
                                name: 'date12',
                                placeHolder: '请选择处理人确认归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date12','处理人确认归还日期');
                                	}
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
                                id: 'bh2',
                                label: '编号',
                                labelWidth: '40%',
                                name: 'bh2',
                                required: true,
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'zcdno2',
                                label: '档案资料名称',
                                labelWidth: '40%',
                                name: 'zcdno2',
                                required: true,
                                placeHolder: '请输入档案资料名称'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifag2',
                                label: '申请部门是否同意',
                                labelWidth: '40%',
                                name: 'ifag2',
                                placeHolder: '请选择申请部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },                            
                            {
                                xtype: 'selectfield',
                                id: 'mj2',
                                label: '密级',
                                labelWidth: '40%',
                                name: 'mj2',
                                placeHolder: '请选择密级',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '一般级',
                                              value: '一般级'
                                          },
                                          {
                                        	  text: '机密级',
                                        	  value: '机密级'
                                          },
                                          {
                                        	  text: '绝密级',
                                        	  value: '绝密级'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifyf2',
                                label: '资料确认有/否',
                                labelWidth: '40%',
                                name: 'ifyf2',
                                placeHolder: '请选择资料确认有/否',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifty2',
                                label: '文控部门是否同意',
                                labelWidth: '40%',
                                name: 'ifty2',
                                placeHolder: '请选择文控部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'txz2',
                                label: '种类',
                                labelWidth: '40%',
                                name: 'txz2',
                                required: true,
                                placeHolder: '请输入种类'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'page2',
                                label: '页数',
                                labelWidth: '40%',
                                name: 'page2',
                                required: true,
                                placeHolder: '请输入页数'
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date2',
                                label: '用户归还日期',
                                labelWidth: '40%',
                                name: 'date2',
                                placeHolder: '请选择用户归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date2','用户归还日期');
                                	}
                                }
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date22',
                                label: '处理人确认归还日期',
                                labelWidth: '40%',
                                name: 'date22',
                                placeHolder: '请选择处理人确认归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date22','处理人确认归还日期');
                                	}
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
                                id: 'bh3',
                                label: '编号',
                                labelWidth: '40%',
                                name: 'bh3',
                                required: true,
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'zcdno3',
                                label: '档案资料名称',
                                labelWidth: '40%',
                                name: 'zcdno3',
                                required: true,
                                placeHolder: '请输入档案资料名称'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifag3',
                                label: '申请部门是否同意',
                                labelWidth: '40%',
                                name: 'ifag3',
                                placeHolder: '请选择申请部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },                            
                            {
                                xtype: 'selectfield',
                                id: 'mj3',
                                label: '密级',
                                labelWidth: '40%',
                                name: 'mj3',
                                placeHolder: '请选择密级',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '一般级',
                                              value: '一般级'
                                          },
                                          {
                                        	  text: '机密级',
                                        	  value: '机密级'
                                          },
                                          {
                                        	  text: '绝密级',
                                        	  value: '绝密级'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifyf3',
                                label: '资料确认有/否',
                                labelWidth: '40%',
                                name: 'ifyf3',
                                placeHolder: '请选择资料确认有/否',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifty3',
                                label: '文控部门是否同意',
                                labelWidth: '40%',
                                name: 'ifty3',
                                placeHolder: '请选择文控部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'txz3',
                                label: '种类',
                                labelWidth: '40%',
                                name: 'txz3',
                                required: true,
                                placeHolder: '请输入种类'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'page3',
                                label: '页数',
                                labelWidth: '40%',
                                name: 'page3',
                                required: true,
                                placeHolder: '请输入页数'
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date3',
                                label: '用户归还日期',
                                labelWidth: '40%',
                                name: 'date3',
                                placeHolder: '请选择用户归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date3','用户归还日期');
                                	}
                                }
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date32',
                                label: '处理人确认归还日期',
                                labelWidth: '40%',
                                name: 'date32',
                                placeHolder: '请选择处理人确认归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date32','处理人确认归还日期');
                                	}
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
                                id: 'bh4',
                                label: '编号',
                                labelWidth: '40%',
                                name: 'bh4',
                                required: true,
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'zcdno4',
                                label: '档案资料名称',
                                labelWidth: '40%',
                                name: 'zcdno4',
                                required: true,
                                placeHolder: '请输入档案资料名称'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifag4',
                                label: '申请部门是否同意',
                                labelWidth: '40%',
                                name: 'ifag4',
                                placeHolder: '请选择申请部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },                            
                            {
                                xtype: 'selectfield',
                                id: 'mj4',
                                label: '密级',
                                labelWidth: '40%',
                                name: 'mj4',
                                placeHolder: '请选择密级',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '一般级',
                                              value: '一般级'
                                          },
                                          {
                                        	  text: '机密级',
                                        	  value: '机密级'
                                          },
                                          {
                                        	  text: '绝密级',
                                        	  value: '绝密级'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifyf4',
                                label: '资料确认有/否',
                                labelWidth: '40%',
                                name: 'ifyf4',
                                placeHolder: '请选择资料确认有/否',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifty4',
                                label: '文控部门是否同意',
                                labelWidth: '40%',
                                name: 'ifty4',
                                placeHolder: '请选择文控部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'txz4',
                                label: '种类',
                                labelWidth: '40%',
                                name: 'txz4',
                                required: true,
                                placeHolder: '请输入种类'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'page4',
                                label: '页数',
                                labelWidth: '40%',
                                name: 'page4',
                                required: true,
                                placeHolder: '请输入页数'
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date4',
                                label: '用户归还日期',
                                labelWidth: '40%',
                                name: 'date4',
                                placeHolder: '请选择用户归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date4','用户归还日期');
                                	}
                                }
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date42',
                                label: '处理人确认归还日期',
                                labelWidth: '40%',
                                name: 'date42',
                                placeHolder: '请选择处理人确认归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date42','处理人确认归还日期');
                                	}
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
                                id: 'bh5',
                                label: '编号',
                                labelWidth: '40%',
                                name: 'bh5',
                                required: true,
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'zcdno5',
                                label: '档案资料名称',
                                labelWidth: '40%',
                                name: 'zcdno5',
                                required: true,
                                placeHolder: '请输入档案资料名称'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifag5',
                                label: '申请部门是否同意',
                                labelWidth: '40%',
                                name: 'ifag5',
                                placeHolder: '请选择申请部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },                            
                            {
                                xtype: 'selectfield',
                                id: 'mj5',
                                label: '密级',
                                labelWidth: '40%',
                                name: 'mj5',
                                placeHolder: '请选择密级',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '一般级',
                                              value: '一般级'
                                          },
                                          {
                                        	  text: '机密级',
                                        	  value: '机密级'
                                          },
                                          {
                                        	  text: '绝密级',
                                        	  value: '绝密级'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifyf5',
                                label: '资料确认有/否',
                                labelWidth: '40%',
                                name: 'ifyf5',
                                placeHolder: '请选择资料确认有/否',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifty5',
                                label: '文控部门是否同意',
                                labelWidth: '40%',
                                name: 'ifty5',
                                placeHolder: '请选择文控部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'txz5',
                                label: '种类',
                                labelWidth: '40%',
                                name: 'txz5',
                                required: true,
                                placeHolder: '请输入种类'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'page5',
                                label: '页数',
                                labelWidth: '40%',
                                name: 'page5',
                                required: true,
                                placeHolder: '请输入页数'
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date5',
                                label: '用户归还日期',
                                labelWidth: '40%',
                                name: 'date5',
                                placeHolder: '请选择用户归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date5','用户归还日期');
                                	}
                                }
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date52',
                                label: '处理人确认归还日期',
                                labelWidth: '40%',
                                name: 'date52',
                                placeHolder: '请选择处理人确认归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date52','处理人确认归还日期');
                                	}
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
                                id: 'bh6',
                                label: '编号',
                                labelWidth: '40%',
                                name: 'bh6',
                                required: true,
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'zcdno6',
                                label: '档案资料名称',
                                labelWidth: '40%',
                                name: 'zcdno6',
                                required: true,
                                placeHolder: '请输入档案资料名称'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifag6',
                                label: '申请部门是否同意',
                                labelWidth: '40%',
                                name: 'ifag6',
                                placeHolder: '请选择申请部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },                            
                            {
                                xtype: 'selectfield',
                                id: 'mj6',
                                label: '密级',
                                labelWidth: '40%',
                                name: 'mj6',
                                placeHolder: '请选择密级',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '一般级',
                                              value: '一般级'
                                          },
                                          {
                                        	  text: '机密级',
                                        	  value: '机密级'
                                          },
                                          {
                                        	  text: '绝密级',
                                        	  value: '绝密级'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifyf6',
                                label: '资料确认有/否',
                                labelWidth: '40%',
                                name: 'ifyf6',
                                placeHolder: '请选择资料确认有/否',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifty6',
                                label: '文控部门是否同意',
                                labelWidth: '40%',
                                name: 'ifty6',
                                placeHolder: '请选择文控部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'txz6',
                                label: '种类',
                                labelWidth: '40%',
                                name: 'txz6',
                                required: true,
                                placeHolder: '请输入种类'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'page6',
                                label: '页数',
                                labelWidth: '40%',
                                name: 'page6',
                                required: true,
                                placeHolder: '请输入页数'
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date6',
                                label: '用户归还日期',
                                labelWidth: '40%',
                                name: 'date6',
                                placeHolder: '请选择用户归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date6','用户归还日期');
                                	}
                                }
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date62',
                                label: '处理人确认归还日期',
                                labelWidth: '40%',
                                name: 'date62',
                                placeHolder: '请选择处理人确认归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date62','处理人确认归还日期');
                                	}
                                }
                            }

                        ]
                    
                        
                    },{
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'bh7',
                                label: '编号',
                                labelWidth: '40%',
                                name: 'bh7',
                                required: true,
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'zcdno7',
                                label: '档案资料名称',
                                labelWidth: '40%',
                                name: 'zcdno7',
                                required: true,
                                placeHolder: '请输入档案资料名称'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifag7',
                                label: '申请部门是否同意',
                                labelWidth: '40%',
                                name: 'ifag7',
                                placeHolder: '请选择申请部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },                            
                            {
                                xtype: 'selectfield',
                                id: 'mj7',
                                label: '密级',
                                labelWidth: '40%',
                                name: 'mj7',
                                placeHolder: '请选择密级',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '一般级',
                                              value: '一般级'
                                          },
                                          {
                                        	  text: '机密级',
                                        	  value: '机密级'
                                          },
                                          {
                                        	  text: '绝密级',
                                        	  value: '绝密级'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifyf7',
                                label: '资料确认有/否',
                                labelWidth: '40%',
                                name: 'ifyf7',
                                placeHolder: '请选择资料确认有/否',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifty7',
                                label: '文控部门是否同意',
                                labelWidth: '40%',
                                name: 'ifty7',
                                placeHolder: '请选择文控部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'txz7',
                                label: '种类',
                                labelWidth: '40%',
                                name: 'txz7',
                                required: true,
                                placeHolder: '请输入种类'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'page7',
                                label: '页数',
                                labelWidth: '40%',
                                name: 'page7',
                                required: true,
                                placeHolder: '请输入页数'
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date7',
                                label: '用户归还日期',
                                labelWidth: '40%',
                                name: 'date7',
                                placeHolder: '请选择用户归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date6','用户归还日期');
                                	}
                                }
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date72',
                                label: '处理人确认归还日期',
                                labelWidth: '40%',
                                name: 'date72',
                                placeHolder: '请选择处理人确认归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date72','处理人确认归还日期');
                                	}
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
                                id: 'bh8',
                                label: '编号',
                                labelWidth: '40%',
                                name: 'bh6',
                                required: true,
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'zcdno8',
                                label: '档案资料名称',
                                labelWidth: '40%',
                                name: 'zcdno8',
                                required: true,
                                placeHolder: '请输入档案资料名称'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifag8',
                                label: '申请部门是否同意',
                                labelWidth: '40%',
                                name: 'ifag8',
                                placeHolder: '请选择申请部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },                            
                            {
                                xtype: 'selectfield',
                                id: 'mj8',
                                label: '密级',
                                labelWidth: '40%',
                                name: 'mj8',
                                placeHolder: '请选择密级',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '一般级',
                                              value: '一般级'
                                          },
                                          {
                                        	  text: '机密级',
                                        	  value: '机密级'
                                          },
                                          {
                                        	  text: '绝密级',
                                        	  value: '绝密级'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifyf8',
                                label: '资料确认有/否',
                                labelWidth: '40%',
                                name: 'ifyf8',
                                placeHolder: '请选择资料确认有/否',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifty8',
                                label: '文控部门是否同意',
                                labelWidth: '40%',
                                name: 'ifty8',
                                placeHolder: '请选择文控部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'txz8',
                                label: '种类',
                                labelWidth: '40%',
                                name: 'txz8',
                                required: true,
                                placeHolder: '请输入种类'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'page8',
                                label: '页数',
                                labelWidth: '40%',
                                name: 'page8',
                                required: true,
                                placeHolder: '请输入页数'
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date8',
                                label: '用户归还日期',
                                labelWidth: '40%',
                                name: 'date8',
                                placeHolder: '请选择用户归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date8','用户归还日期');
                                	}
                                }
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date82',
                                label: '处理人确认归还日期',
                                labelWidth: '40%',
                                name: 'date82',
                                placeHolder: '请选择处理人确认归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date82','处理人确认归还日期');
                                	}
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
                                id: 'bh9',
                                label: '编号',
                                labelWidth: '40%',
                                name: 'bh9',
                                required: true,
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'zcdno9',
                                label: '档案资料名称',
                                labelWidth: '40%',
                                name: 'zcdno9',
                                required: true,
                                placeHolder: '请输入档案资料名称'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifag9',
                                label: '申请部门是否同意',
                                labelWidth: '40%',
                                name: 'ifag9',
                                placeHolder: '请选择申请部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },                            
                            {
                                xtype: 'selectfield',
                                id: 'mj9',
                                label: '密级',
                                labelWidth: '40%',
                                name: 'mj9',
                                placeHolder: '请选择密级',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '一般级',
                                              value: '一般级'
                                          },
                                          {
                                        	  text: '机密级',
                                        	  value: '机密级'
                                          },
                                          {
                                        	  text: '绝密级',
                                        	  value: '绝密级'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifyf9',
                                label: '资料确认有/否',
                                labelWidth: '40%',
                                name: 'ifyf9',
                                placeHolder: '请选择资料确认有/否',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifty9',
                                label: '文控部门是否同意',
                                labelWidth: '40%',
                                name: 'ifty9',
                                placeHolder: '请选择文控部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'txz9',
                                label: '种类',
                                labelWidth: '40%',
                                name: 'txz9',
                                required: true,
                                placeHolder: '请输入种类'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'page9',
                                label: '页数',
                                labelWidth: '40%',
                                name: 'page9',
                                required: true,
                                placeHolder: '请输入页数'
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date9',
                                label: '用户归还日期',
                                labelWidth: '40%',
                                name: 'date9',
                                placeHolder: '请选择用户归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date9','用户归还日期');
                                	}
                                }
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date92',
                                label: '处理人确认归还日期',
                                labelWidth: '40%',
                                name: 'date92',
                                placeHolder: '请选择处理人确认归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date92','处理人确认归还日期');
                                	}
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
                                id: 'bh10',
                                label: '编号',
                                labelWidth: '40%',
                                name: 'bh10',
                                required: true,
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'zcdno10',
                                label: '档案资料名称',
                                labelWidth: '40%',
                                name: 'zcdno10',
                                required: true,
                                placeHolder: '请输入档案资料名称'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifag10',
                                label: '申请部门是否同意',
                                labelWidth: '40%',
                                name: 'ifag10',
                                placeHolder: '请选择申请部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },                            
                            {
                                xtype: 'selectfield',
                                id: 'mj10',
                                label: '密级',
                                labelWidth: '40%',
                                name: 'mj10',
                                placeHolder: '请选择密级',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '一般级',
                                              value: '一般级'
                                          },
                                          {
                                        	  text: '机密级',
                                        	  value: '机密级'
                                          },
                                          {
                                        	  text: '绝密级',
                                        	  value: '绝密级'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifyf10',
                                label: '资料确认有/否',
                                labelWidth: '40%',
                                name: 'ifyf10',
                                placeHolder: '请选择资料确认有/否',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ifty10',
                                label: '文控部门是否同意',
                                labelWidth: '40%',
                                name: 'ifty10',
                                placeHolder: '请选择文控部门是否同意',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'txz10',
                                label: '种类',
                                labelWidth: '40%',
                                name: 'txz10',
                                required: true,
                                placeHolder: '请输入种类'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'page10',
                                label: '页数',
                                labelWidth: '40%',
                                name: 'page10',
                                required: true,
                                placeHolder: '请输入页数'
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date10',
                                label: '用户归还日期',
                                labelWidth: '40%',
                                name: 'date10',
                                placeHolder: '请选择用户归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date10','用户归还日期');
                                	}
                                }
                            },							
                            {
                                xtype: 'textfield',
                                id: 'date102',
                                label: '处理人确认归还日期',
                                labelWidth: '40%',
                                name: 'date102',
                                placeHolder: '请选择处理人确认归还日期',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date102','处理人确认归还日期');
                                	}
                                }
                            }

                        ]
                    
                        
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'selectfield',
                                id: 'mjxz',
                                label: '密级选择',
                                labelWidth: '40%',
                                name: 'mjxz',
                                placeHolder: '请选择密级选择',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '一般级文控审批组',
                                              value: '一般级文控审批组'
                                          },
                                          {
                                        	  text: '机密级文控审批组',
                                        	  value: '机密级文控审批组'
                                          },
                                          {
                                        	  text: '绝密级文控审批组',
                                        	  value: '绝密级文控审批组'
                                          }
                                      ]
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
                                    id: 'mast',
                                    name: 'mast'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'firflow',
                                	name: 'firflow'
                                },
                                {
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
                                	id: 'ext1',
                                	name: 'ext1'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'getdep',
                                	name: 'getdep'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'getno',
                                	name: 'getno'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'qaleader',
                                	name: 'qaleader'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'sj_list',
                                	name: 'sj_list'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'nextprocessuser',
                                	name: 'nextprocessuser'
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'fnextprocess',
                                	name: 'fnextprocess'
                                },
                            ]
                    }
                ]
            }
        ]
    }

});