
/* JavaScript content from app/view/ForApprovalProcess/QualityControl/QualityComplain.js in folder common */
Ext.define('HelcOA.view.ForApprovalProcess.QualityControl.QualityComplain', {
    extend: 'Ext.Panel',
    id: 'sp_QualityComplain_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.field.TextArea',
        'Ext.field.Number'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'surface_ID',
                title: '质量部投诉流程',
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
                            xtype: 'button',
                            id: 'idea_ID',
                            text: '下一步'
                        }
                    ]
            },
            {
                xtype: 'formpanel',
                id: 'fp',
                flex: 1,
                layout: 'vbox',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'fileno',
                                label: '编号',
                                labelWidth: '40%',
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textfield',
                                label: '标题',
                                labelWidth: '40%',
                                id: 'subject',
                                required: true,
                                placeHolder: '请输入标题'
                            },
                            {
                                xtype: 'textfield',
                                label: '客户名称',
                                labelWidth: '40%',
                                id: 'customname',
                                required: true,
                                placeHolder: '请输入客户名称'
                            },
                            {
                                xtype: 'selectfield',
                                label: '公司级投诉',
                                labelWidth: '40%',
                                id: 'tsflag',
                                options: [
                                          {
                                              text: '否',
                                              value: '否'
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          }
                                      ]
                            },
                            {
                                xtype: 'textnumfield',
                                label: '联系人电话',
                                labelWidth: '40%',
                                id: 'tel',
                                required: true,
                                placeHolder: '请输入联系人电话'
                            },
                            {
                                xtype: 'textfield',
                                label: '合同号/工号',
                                labelWidth: '40%',
                                id: 'contractno',
                                required: true,
                                placeHolder: '请输入合同号/工号'
                            },
                            {
                                xtype: 'textfield',
                                label: '投诉日期',
                                labelWidth: '40%',
                                id: 'tsdate',
                                required: true,
                                readOnly:true,
                                placeHolder: '请选择日期',
                                listeners:{
                                	focus:function(){
                                		initDate2('tsdate','投诉日期');
                                	}
                                }
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '用户意见',
                                labelWidth: '40%',
                                id: 'tscontect_textarea',
                                required: true,
                                placeHolder: '请输入用户意见主要内容'
                            },
//                            {
//                                xtype: 'container',
//                                layout: {
//                                    type: 'hbox',
//                                    align: 'start',
//                                    pack: 'center'
//                                },
//                                items: [
//                                    {
//                                        xtype: 'button',
//                                        margin: 10,
//                                        width: 120,
//                                        text: '拍照'
//                                    },
//                                    {
//                                        xtype: 'button',
//                                        margin: 10,
//                                        width: 120,
//                                        text: '浏览'
//                                    }
//                                ]
//                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '起草人',
                                labelWidth: '40%',
                                id: 'agentman',
                                placeHolder: '请输入起草人'
                            },
                            {
                                xtype: 'textfield',
                                label: '所属部门',
                                labelWidth: '40%',
                                id: 'dept',
                                placeHolder: '请输入所属部门'
                            },
                            {
                                xtype: 'textfield',
                                label: '起草日期',
                                labelWidth: '40%',
                                id: 'createdate',
                                required: true,
                                placeHolder: '请选择起草日期'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '质量部任务分配',
                        items: [
                            {
                                xtype: 'selectfield',
                                label: '意见等级',
                                labelWidth: '40%',
                                id: 'tsdj',
                                options: [
                                          {
                                              text: '请选择',
                                              value: ''
                                          },
                                          {
                                              text: '公司级投诉',
                                              value: '公司级投诉'
                                          },
                                          {
                                        	  text: '再投诉',
                                        	  value: '再投诉'
                                          },
                                          {
                                        	  text: '重大投诉',
                                        	  value: '重大投诉'
                                          },
                                          {
                                        	  text: '一般投诉',
                                        	  value: '一般投诉'
                                          },
                                          {
                                        	  text: '紧急投诉',
                                        	  value: '紧急投诉'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                label: '意见来源',
                                labelWidth: '40%',
                                id: 'tslx',
                                options: [
                                          {
                                              text: '请选择',
                                              value: ''
                                          },
                                          {
                                        	  text: '热线',
                                        	  value: '热线'
                                          },
                                          {
                                        	  text: '信函',
                                        	  value: '信函'
                                          },
                                          {
                                        	  text: '传真',
                                        	  value: '传真'
                                          },
                                          {
                                        	  text: '总裁办',
                                        	  value: '总裁办'
                                          },
                                          {
                                        	  text: '各部门经理',
                                        	  value: '各部门经理'
                                          },
                                        ]
                            },
                            {
                                xtype: 'textfield',
                                label: '前次流程',
                                labelWidth: '40%',
                                id: 'lastno',
                                placeHolder: '请输入前次流程编号'
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'autoTextArea',
                                        id:'gjr',
                                        width: '85%',
                                        labelWidth: '48%',
                                        label: '跟进人',
                                        readOnly:true,
                                        placeHolder: '请选择质量部跟进人'
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'sel1',
                                        height: 41,
                                        style: 'border:0;',
                                        width: '15%',
                                        iconCls: 'search',
                                        text: '',
                                        listeners:{
                                        	tap:function(){
                                        		object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('gjr');
                                        	}
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'textfield',
                                label: '归属单位',
                                labelWidth: '40%',
                                id: 'gsdw',
                                placeHolder: '请输入归属单位'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '业务部门反馈意见',
                        items: [
                            {
                                xtype: 'selectfield',
                                label: '售后状态',
                                labelWidth: '40%',
                                id: 'shzt',
                                options: [
                                          {
                                              text: '请选择',
                                              value: ''
                                          },
                                          {
                                              text: '安装',
                                              value: '安装'
                                          },
                                          {
                                        	  text: '三包',
                                        	  value: '三包'
                                          },
                                          {
                                        	  text: '有偿',
                                        	  value: '有偿'
                                          },
                                          {
                                        	  text: '发货',
                                        	  value: '发货'
                                          },
                                          {
                                        	  text: '其它',
                                        	  value: '其它'
                                          },
                                      ]
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '备注',
                                labelWidth: '40%',
                                id: 'beizhu_textarea',
                                placeHolder: '请输入备注'
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '处理情况',
                                labelWidth: '40%',
                                id: 'gjqk_textarea',
                                placeHolder: '请输入跟进处理情况及原因分析'
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '处理办法',
                                labelWidth: '40%',
                                name: 'clbf_textarea',
                                placeHolder: '请输入处理办法/预防措施'
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '跟进结果',
                                labelWidth: '40%',
                                id: 'gjjg_textarea',
                                placeHolder: '请输入跟进结果'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '不良分类',
                        items: [
							{
							    xtype: 'togglefield',
							    id:'sj',
							    readOnly:true,
							    label: '设计',
							    labelWidth: '40%'
							},
							{
							    xtype: 'togglefield',
							    id:'zp',
							    readOnly:true,
							    label: '制品',
							    labelWidth: '40%'
							},
							{
								xtype: 'togglefield',
								id:'yh',
								readOnly:true,
								label: '用户',
								labelWidth: '40%'
							},
							{
								xtype: 'togglefield',
								id:'qt',
								readOnly:true,
								label: '其他',
								labelWidth: '40%'
							},
                            {
                                xtype: 'autoTextArea',
                                id: 'fxjg_textarea',
                                readOnly:true,
                                label: '其他分析',
                                labelWidth: '40%',
                                placeHolder: '请输入其他分析判断'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '最终确认',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '意见等级',
                                labelWidth: '40%',
                                id: 'zzdj',
                                placeHolder: '请输入核实用户意见等级'
                            },
                            {
                                xtype: 'textfield',
                                label: '主责部门',
                                labelWidth: '40%',
                                id: 'zzbm',
                                placeHolder: '请输入主责部门/单位'
                            },
                            {
                                xtype: 'textfield',
                                label: '完成日期',
                                labelWidth: '40%',
                                id: 'wcdate',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('wcdate','完成日期');
                                	}
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        hidden: true,
                        items: [
                            {
                            	xtype: 'textfield',
                            	id: 'blfl',
                            	name: 'blfl',
                            },
                            {
                                xtype: 'textfield',
                                id: 'conds',
                                name: 'conds',
                                value: 'nocon',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'createbypda',
                            	name: 'createbypda',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'nextprocessuser',
                            	name: 'nextprocessuser',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'Fnextprocess',
                            	name: 'Fnextprocess',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'depid',
                            	name: 'depid',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'userid',
                            	name: 'userid',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'type',
                            	name: 'type',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'username',
                            	name: 'username',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'node',
                            	name: 'node',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'ctime',
                            	name: 'ctime',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'piid',
                            	name: 'piid',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'processname',
                            	name: 'processname',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'curauthor',
                            	name: 'curauthor',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'dealmen',
                            	name: 'dealmen',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'ygbh',
                            	name: 'ygbh',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'form',
                            	name: 'form',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'arcpath',
                            	name: 'arcpath',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'arcdate',
                            	name: 'arcdate',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'endprocessdate',
                            	name: 'endprocessdate',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'fpzr',
                            	name: 'fpzr',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'checkatt',
                            	name: 'checkatt',
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
                            	id: 'qtpart',
                            	name: 'qtpart',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'pi_flag',
                            	name: 'pi_flag',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'cfg_id',
                            	name: 'cfg_id',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'createflag',
                            	name: 'createflag',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'ext1',
                            	name: 'ext1',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'managermen',
                            	name: 'managermen',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'sendreader',
                            	name: 'sendreader',
                            },
                            
                            
                        ]
                    
                    	
                    }
                ]
            }
        ]
    }

});