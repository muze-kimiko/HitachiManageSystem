
/* JavaScript content from app/view/MyProcess/ShangHai/SHMeeting.js in folder common */
﻿Ext.define('HelcOA.view.MyProcess.ShangHai.SHMeeting', {
    extend: 'Ext.Panel',
    id:'wdlc_SHMeeting_id',
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
            {xtype: 'toolbar',
                docked: 'top',
                title: '上海会议室申请',
                items: [
                    {
        				xtype: 'button',
        				id: 'wdlc_returnMyProcess',
        				text: '返回',
        				ui: 'back'
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
                                id: 'fileno',
                                label: '编号',
                                labelWidth: '40%',
                                name: 'fileno',
                                placeHolder: '请输入编号',
                            },
                            {
                                xtype: 'textfield',
                                id: 'dept',
                                label: '申请部门',
                                labelWidth: '40%',
                                name: 'dept',
                                placeHolder: '请输入部门名称',
                            },
                            {
                                xtype: 'textfield',
                                id: 'agentman',
                                label: '申请人',
                                labelWidth: '40%',
                                name: 'agentman',
                                placeHolder: '请输入申请人名称',
                            },
                            {
                            	xtype: 'textfield',
                            	id:'createdate',
                                label: '申请日期',
                                labelWidth: '40%',
                                placeHolder: '点击设置时间',
                                readOnly:true,
                                listeners:{
                                	focus:function(){
                                		initDate(Ext.getCmp('createdate').getValue(),'申请日期','createdate');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'phone',
                                label: '申请人电话',
                                labelWidth: '40%',
                                name: 'phone',
                                required: true,
                                placeHolder: '请输入申请人电话'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'subject',
                                label: '会议主题',
                                labelWidth: '40%',
                                name: 'subject',
                                required: true,
                                placeHolder: '请输入会议主题',
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'selectfield',
                                        id:'address',
                                        height: 40,
                                        width: '70%',
                                        label: '会议地点',
                                        labelWidth: '58%',
                                        options: [
                                                  {
                                                      text: '办公楼',
                                                      value: '办公楼'
                                                  },
                                                  {
                                                      text: '研发楼',
                                                      value: '研发楼'
                                                  },
                                                  {
                                                      text: '培训楼',
                                                      value: '培训楼'
                                                  }
                                              ]
                                    },
                                    {
                                        xtype: 'button',
                                        height: 41,
                                        style: 'border:0;',
                                        width: '30%',
                                        id:'chk2',
                                        text: '检查资源'
                                    }
                                ]
                            },
                            {
							    xtype: 'textfield',
							    id: 'fhtjfalg',
							    label: '符合条件',
							    labelWidth: '40%',
							    readOnly:true,
							    placeHolder: '请检测是否有符合条件的会议室',
							},
                            {
							    xtype: 'selectfield',
							    id: 'weekflag',
							    name: 'weekflag',
							    label: '发布到一周活动安排表',
							    labelWidth: '40%',
							    readOnly:true,
							    placeHolder: '请检测是否发布到一周活动安排表',
							    options: [
                                          {
                                              text: '否',
                                              value: '否'
                                          }
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                      ]
							    
							},
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'autoTextArea',
                                        id:'zcr',
                                        width: '85%',
                                        labelWidth: '48%',
                                        label: '会议主持人',
                                        readOnly:true,
                                        required: true,
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'seluser4162',
                                        height: 41,
                                        style: 'border:0;',
                                        width: '15%',
                                        iconCls: 'search',
                                        text: '',
                                        listeners:{
                                        	tap:function(){
                                        		object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('zcr');
                                        	}
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'textfield',
                                id: 'startdate',
                                label: '会议日期',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                required: true,
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('startdate','会议起止时间');
                                	}
                                }
                            },
                            {
                                xtype: 'selectfield',
                                id: 'shour',
                                label: '时(起)',
                                required: true,
                                labelWidth: '40%',
                                options: [
                                    {
                                        text: '',
                                        value: ''
                                    },
                                    {
                                        text: '8',
                                        value: '8'
                                    },
                                    {
                                    	text: '9',
                                    	value: '9'
                                    },
                                    {
                                    	text: '10',
                                    	value: '10'
                                    },
                                    {
                                    	text: '11',
                                    	value: '11'
                                    },
                                    {
                                    	text: '12',
                                    	value: '12'
                                    },
                                    {
                                    	text: '13',
                                    	value: '13'
                                    },
                                    {
                                    	text: '14',
                                    	value: '14'
                                    },
                                    {
                                    	text: '15',
                                    	value: '15'
                                    },
                                    {
                                    	text: '16',
                                    	value: '16'
                                    },
                                    {
                                    	text: '17',
                                    	value: '17'
                                    },
                                    {
                                    	text: '18',
                                    	value: '18'
                                    },
                                ],
                                placeHolder: '点击设置开始时间(时)',
                            },
                            {
                            	xtype: 'selectfield',
                            	id: 'sminu',
                            	label: '分(起)',
                            	required: true,
                            	labelWidth: '40%',
                            	options: [
                        	          {
                        	        	  text: '',
                        	        	  value: ''
                        	          },
                        	          {
                        	        	  text: '00',
                        	        	  value: '00'
                        	          },
                        	          {
                        	        	  text: '15',
                        	        	  value: '15'
                        	          },
                        	          {
                        	        	  text: '30',
                        	        	  value: '30'
                        	          },
                        	          {
                        	        	  text: '45',
                        	        	  value: '45'
                        	          },
                        	     ],
                        	     placeHolder: '点击设置开始时间(分)',
                            },
                            {
                            	xtype: 'selectfield',
                            	id: 'ehour',
                            	label: '时(止)',
                            	labelWidth: '40%',
                            	required: true,
                            	options: [
                                          {
                                              text: '',
                                              value: ''
                                          },
                                          {
                                              text: '8',
                                              value: '8'
                                          },
                                          {
                                          	text: '9',
                                          	value: '9'
                                          },
                                          {
                                          	text: '10',
                                          	value: '10'
                                          },
                                          {
                                          	text: '11',
                                          	value: '11'
                                          },
                                          {
                                          	text: '12',
                                          	value: '12'
                                          },
                                          {
                                          	text: '13',
                                          	value: '13'
                                          },
                                          {
                                          	text: '14',
                                          	value: '14'
                                          },
                                          {
                                          	text: '15',
                                          	value: '15'
                                          },
                                          {
                                          	text: '16',
                                          	value: '16'
                                          },
                                          {
                                          	text: '17',
                                          	value: '17'
                                          },
                                          {
                                          	text: '18',
                                          	value: '18'
                                          },
                                          {
                                        	  text: '19',
                                        	  value: '19'
                                          },
                                          {
                                        	  text: '20',
                                        	  value: '20'
                                          },
                                      ],
                                      placeHolder: '点击设置结束时间(时)',
                            },
                            {
                            	xtype: 'selectfield',
                            	id: 'eminu',
                            	label: '分(止)',
                            	required: true,
                            	labelWidth: '40%',
                            	options: [
                            	          {
                            	        	  text: '',
                            	        	  value: ''
                            	          },
                            	          {
                            	        	  text: '00',
                            	        	  value: '00'
                            	          },
                            	          {
                            	        	  text: '15',
                            	        	  value: '15'
                            	          },
                            	          {
                            	        	  text: '30',
                            	        	  value: '30'
                            	          },
                            	          {
                            	        	  text: '45',
                            	        	  value: '45'
                            	          },
                            	     ],
                            	     placeHolder: '点击设置结束时间(分)',
                            },
                            {
                                xtype: 'textfield',
                                id: 'usehour',
                                label: '用时(小时)',
                                labelWidth: '40%',
                                placeHolder: '',
                                value: '2'
                            },
                            {
                                xtype: 'textareafield',
                                id: 'meetcontect',
                                label: '会议内容',
                                labelWidth: '40%',
                                name: 'meetcontect',
                                required: true,
                                placeHolder: '请输入会议内容',
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '是否需要会议所需资源(是/否)',
                        items: [
                            {
                                xtype: 'selectfield',
                                id: 'meetsocure1',
                                label: '大屏幕电视',
                                labelWidth: '40%',
                                name: 'meetsocure1',
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
                                xtype: 'selectfield',
                                id: 'meetsocure3',
                                label: '网络',
                                labelWidth: '40%',
                                name: 'meetsocure3',
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
                                xtype: 'selectfield',
                                id: 'meetsocure5',
                                label: '白板',
                                labelWidth: '40%',
                                name: 'meetsocure5',
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
                                xtype: 'selectfield',
                                id: 'meetsocure2',
                                label: '投影仪',
                                labelWidth: '40%',
                                name: 'meetsocure2',
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
                                xtype: 'selectfield',
                                id: 'meetsocure4',
                                label: '软件视频会议系统',
                                labelWidth: '40%',
                                name: 'meetsocure4',
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
                                xtype: 'selectfield',
                                id: 'meetsocure6',
                                label: '硬件视频会议系统',
                                labelWidth: '40%',
                                name: 'meetsocure6',
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
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id:'nextsoure',
                                        height: 40,
                                        width: '85%',
                                        labelWidth: '48%',
                                        label: '其他资源',
                                        readOnly:true,
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'seluser417',
                                        height: 41,
                                        style: 'border:0;',
                                        width: '15%',
                                        iconCls: 'search',
                                        text: '',
//                                        listeners:{
//                                        	tap:function(){
//                                        		object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('zcr');
//                                        	}
//                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        instructions: '温馨提示:内部会议请自备杯子',
                        title: '与会人员',
                        items: [
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'autoTextArea',
                                        id:'meetpeo',
                                        width: '85%',
                                        labelWidth: '48%',
                                        label: '公司内部',
                                        readOnly:true,
                                        required: true,
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'seluser416',
                                        height: 41,
                                        style: 'border:0;',
                                        width: '15%',
                                        iconCls: 'search',
                                        text: '',
                                        listeners:{
                                        	tap:function(){
                                        		object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('meetpeo');
                                        	}
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'autoTextArea',
                                id: 'meetpeo1',
                                label: '公司外部',
                                labelWidth: '40%',
                                name: 'meetpeo1',
                                placeHolder: '请输入公司外部人员'
                            },
                            {
                                xtype: 'textnumfield',
                                label: '总人数',
                                labelWidth: '40%',
                                id: 'rs',
                                name: 'rs',
                                placeHolder: '请输入总人数'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        instructions: '注意：申请会议室不允许提前15天预约，当天预约会议室请提前15分钟！',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                id: 'meetclass',
                                label: '分配会议室',
                                labelWidth: '40%',
                                name: 'meetclass',
                                readOnly:true,
                                placeHolder: '会议室'
                            },
                            {
                                xtype: 'textfield',
                                id: 'pfr',
                                label: '分配人',
                                labelWidth: '40%',
                                readOnly:true,
                                placeHolder: '分配人'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        hidden: true,
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'sqts',
                                name: 'sqts'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'sqsj',
                            	name: 'sqsj'
                            },
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
                            	id: 'ff',
                            	name: 'ff'
                            },
                            {
                                xtype: 'textfield',
                                id: 'arcpath',
                                labelWidth: '40%',
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
                            	id: 'meetsubject',
                            	name: 'meetsubject'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'selfalg',
                            	name: 'selfalg'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'meetingids',
                            	name: 'meetingids'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'selclassid',
                            	name: 'selclassid'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'sycd',
                            	name: 'sycd'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'startwz',
                            	name: 'startwz'
                            },
                            {
                                xtype: 'textfield',
                                id: 'curaut',
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
                            }
                        ]
                    }
                ]
            }
        ]
    }

});