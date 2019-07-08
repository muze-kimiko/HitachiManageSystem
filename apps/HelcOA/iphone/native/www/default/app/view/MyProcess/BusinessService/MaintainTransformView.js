
/* JavaScript content from app/view/MyProcess/BusinessService/MaintainTransformView.js in folder common */
Ext.define('HelcOA.view.MyProcess.BusinessService.MaintainTransformView', {
    extend: 'Ext.Panel',
    id: 'wdlc_MaintainTransformView_ID',
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
                id: 'wdlc_surface_ID',
                title: '维修改造工程业务联络流程',
                items: [{
                	xtype: 'button',
                    id: 'wdlc_returnMyProcess',
                    text: '返回',
                    ui: 'back'
                },]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                id: 'fp',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'fieldset',
                        instructions:'报告内容提示：（1）将客户对电梯的维改需求描写清楚；（2）提供有关改造内容的电梯参数资料、测量数据和现场情况；（3）客户有特殊要求条款时,必须在内容中进行描述。',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'fileno',
                                label: '编号',
                                labelWidth: '40%',
                                name: 'fileno',
                                readOnly:true,
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textfield',
                                id: 'apellation',
                                label: '公司名称',
                                labelWidth: '40%',
                                name: 'apellation',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入公司名称'
                            },
                            {
                                xtype: 'textfield',
                                id: 'address',
                                label: '用户名称',
                                labelWidth: '40%',
                                name: 'address',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入用户名称'
                            },
                            {
                                xtype: 'textfield',
                                id: 'party',
                                label: '当事人',
                                labelWidth: '40%',
                                name: 'party',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入当事人'
                            },
                            {
                                xtype: 'textfield',
                                id: 'phone',
                                label: '电话',
                                labelWidth: '40%',
                                name: 'phone',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入电话'
                            },
                            {
                                xtype: 'textfield',
                                id: 'date',
                                label: '处理期限',
                                labelWidth: '40%',
                                name: 'date',
                                placeHolder: '请输入期望处理期限',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                required: true,
                                zIndex: 999,
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('date','期望处理期限');
                                	}
                                }
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'count',
                                label: '涉及台数',
                                required: true,
                                labelWidth: '40%',
                                readOnly:true,
                                name: 'count',
                                placeHolder: '请输入涉及台数'
                            },
                            {
                                xtype: 'textfield',
                                id: 'regh',
                                label: '涉及工号',
                                labelWidth: '40%',
                                name: 'regh',
                                readOnly:true,
                                required: true,
                                placeHolder: '请输入涉及工号'
                            },
                            {
                                xtype: 'textfield',
                                id: 'refermodel',
                                label: '电梯型号',
                                labelWidth: '40%',
                                readOnly:true,
                                name: 'refermodel',
                                placeHolder: '请输入电梯型号'
                            },
                            {
                                xtype: 'textfield',
                                id: 'refercz',
                                label: '层站',
                                labelWidth: '40%',
                                readOnly:true,
                                name: 'refercz',
                                placeHolder: '请输入层站'
                            },
                            {
                                xtype: 'textfield',
                                id: 'referhigh',
                                label: '提升高度',
                                readOnly:true,
                                labelWidth: '40%',
                                name: 'referhigh',
                                placeHolder: '请输入提升高度'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'leibie',
                                label: '类别',
                                readOnly:true,
                                labelWidth: '40%',
                                name: 'leibie',
                                options: [
                                          {
                                              text: '维修',
                                              value: '维修'
                                          },
                                          {
                                              text: '改造',
                                              value: '改造'
                                          }
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'type',
                                label: '电梯状态',
                                readOnly:true,
                                labelWidth: '40%',
                                name: 'type',
                                options: [
                                          {
                                              text: '安装(安装调试期间)',
                                              value: '安装(安装调试期间)'
                                          },
                                          {
                                              text: '维保(保修保养期间)',
                                              value: '维保(保修保养期间)'
				                           },
				                           {
				                           	  text: '其他',
				                           	  value: '其他'
				                           }
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'sendmobile',
                                label: '是否改造过',
                                labelWidth: '40%',
                                readOnly:true,
                                name: 'sendmobile',
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
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'agentman',
                                label: '报告人',
                                labelWidth: '40%',
                                name: 'agentman',
                                readOnly:true,
                                placeHolder: '请输入报告人'
                            },
                            {
                                xtype: 'textfield',
                                id: 'dept',
                                label: '所属部门',
                                labelWidth: '40%',
                                readOnly:true,
                                name: 'dept',
                                placeHolder: '请输入所属部门'
                            },
                            {
                                xtype: 'textfield',
                                id: 'createdate',
                                readOnly:true,
                                label: '时间',
                                labelWidth: '40%',
                                name: 'applydate',
                            },
                            {
                                xtype: 'textfield',
                                id: 'phone2',
                                readOnly:true,
                                label: '联系电话',
                                labelWidth: '40%',
                                name: 'phone2',
                                required: true,
                                placeHolder: '请输入联系电话'
                            },
                            {
                                xtype: 'textfield',
                                id: 'subject',
                                label: '标题',
                                readOnly:true,
                                labelWidth: '40%',
                                name: 'subject',
                                required: true,
                                placeHolder: '请输入标题'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ywtype',
                                label: '业务类型',
                                readOnly:true,
                                labelWidth: '40%',
                                name: 'ywtype',
                                placeHolder: '请选择业务类型',
                                options: [
                                          {
                                              text: '询价方案',
                                              value: '询价方案'
                                          },
                                          {
                                              text: '施工方案',
                                              value: '施工方案'
                                          }
                                      ]
                            },
//                            {
//                                xtype: 'textfield',
//                                label: '合同号',
//                                labelWidth: '40%',
//                                name: 'htno',
//                                placeHolder: '请输入合同号'
//                            },
//                            {
//                                xtype: 'textfield',
//                                label: '所需产品型号规格',
//                                labelWidth: '40%',
//                                name: 'xhgg',
//                                placeHolder: '请输入所需产品型号规格'
//                            },
                            {
                                xtype: 'autoTextArea',
                                id: 'report_textarea',
                                readOnly:true,
                                label: '报告内容',
                                labelWidth: '40%',
                                name: 'report',
                                required: true,
                                placeHolder: '请输入报告内容'
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
                        title: '改造工程业务科意见',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'qwsjdate',
                                label: '期望完成',
                                zIndex: 999,
                                labelWidth: '40%',
                                name: 'agentman',
                                placeHolder: '请输入期望设计完成时间',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('qwsjdate','期望设计完成时间');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'qwdate',
                                label: '具体时间',
                                labelWidth: '40%',
                                readOnly:true,
                                name: 'agentman',
                                placeHolder: '请输入具体时间',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'tecdocid',
                            	label: '技术文档号',
                            	labelWidth: '40%',
                            	readOnly:true,
                            	name: 'agentman',
                            	placeHolder: '请输入技术文档号',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'remark',
                            	label: '说明',
                            	labelWidth: '40%',
                            	name: 'agentman',
                            	readOnly:true,
                            	placeHolder: '请输入说明',
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'qwdate2',
                            	label: '期望完成',
                            	labelWidth: '40%',
                            	name: 'agentman',
                            	placeHolder: '点击设置时间',
                            	dateFormat: 'Y-m-d',
                            	readOnly:true,
                            	zIndex: 999,
                            	placeHolder: '点击设置时间',
                            	listeners:{
                            		focus:function(){
                            			initDate2('qwdate2','期望完成时间');
                            		}
                            	}
                            },
                        ]
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                id:'sendreader',
                                width: '85%',
                                readOnly:true,
                                labelWidth: '48%',
                                label: '文件抄送',
                                readOnly:true,
                            },
//                            {
//                                xtype: 'button',
//                                id: 'seluser184',
//                                height: 41,
//                                style: 'border:0;',
//                                width: '15%',
//                                iconCls: 'search',
//                                disabled: true,
//                                text: '',
//                                listeners:{
//                                	tap:function(){
//                                		object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('sendreader');
//                                	}
//                                }
//                            }
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
                                	id: 'createbypda',
                                	name: 'createbypda',
                                	value: 0
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
                                	id: 'qwdategcbz',
                                	name: 'qwdategcbz',
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'qwdate3',
                                	name: 'qwdate3',
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'qwdatebgr',
                                	name: 'qwdatebgr',
			                    },
			                    {
			                    	xtype: 'textfield',
			                    	id: 'fnextprocess',
			                    	name: 'fnextprocess',
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
							    }
                            ]
                    }
                ]
            }
        ]
    }

});