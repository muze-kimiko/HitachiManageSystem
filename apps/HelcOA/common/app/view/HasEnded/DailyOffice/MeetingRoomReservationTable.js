Ext.define('HelcOA.view.HasEnded.DailyOffice.MeetingRoomReservationTable', {
    extend: 'Ext.Panel',
    id:'yjs_MeetingRoomReservationTable_ID',
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
                id: 'yjs_surface_ID',
                title: '会议室预约表',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        id: 'yjs_returnHasEnded'
                    }
                ]
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
                                label: '编号',
                                labelWidth: '40%',
                                name: 'fileno',
                                placeHolder: '请输入编号',
                                readOnly:true,
                            },
                            {
                                xtype: 'textfield',
                                id: 'dept',
                                label: '申请部门',
                                labelWidth: '40%',
                                name: 'dept',
                                placeHolder: '请输入部门名称',
                                readOnly:true,
                            },
                            {
                                xtype: 'textfield',
                                id: 'agentman',
                                label: '申请人',
                                labelWidth: '40%',
                                name: 'agentman',
                                placeHolder: '请输入申请人名称',
                                readOnly:true,
                            },
                            {
                            	xtype: 'textfield',
                            	id:'createdate',
                                label: '申请日期',
                                labelWidth: '40%',
                                placeHolder: '点击设置时间',
                                readOnly:true,
//                                listeners:{
//                                	focus:function(){
//                                		initDate(Ext.getCmp('createdate').getValue(),'申请日期','createdate');
//                                	}
//                                },
                                readOnly:true,
                            },
                            {
                                xtype: 'textfield',
                                id: 'phone',
                                label: '申请人电话',
                                labelWidth: '40%',
                                name: 'phone',
                                required: true,
                                placeHolder: '请输入申请人电话',
                                readOnly:true,
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
                                readOnly:true,
                                placeHolder: '请输入会议主题'
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
                                        readOnly:true,
                                        options: [
                                                  {
                                                      text: '大石',
                                                      value: '大石'
                                                  },
                                                  {
                                                      text: '中信',
                                                      value: '中信'
                                                  },
                                                  {
                                                      text: '盈泰',
                                                      value: '盈泰'
                                                  }
                                              ]
                                    },
                                    {
                                        xtype: 'button',
                                        height: 41,
                                        style: 'border:0;',
                                        width: '30%',
                                        id:'chk1',
                                        text: '检查资源',
                                        disabled: true,
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
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id:'zcr',
                                        height: 40,
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
                                        disabled: true,
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
//                                listeners:{
//                                	focus:function(){
//                                		initDate2('startdate','会议起止时间');
//                                	}
//                                }
                            },
                            {
                                xtype: 'selectfield',
                                id: 'shour',
                                label: '时(起)',
                                required: true,
                                labelWidth: '40%',
                                readOnly:true,
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
                            	readOnly:true,
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
                            	readOnly:true,
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
                            	readOnly:true,
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
                                readOnly:true,
                                id: 'usehour',
                                label: '用时(小时)',
                                labelWidth: '40%',
                                placeHolder: '',
                            },
                            {
                                xtype: 'textareafield',
                                id: 'meetcontect_textarea',
                                label: '会议内容',
                                labelWidth: '40%',
                                name: 'meetcontect_textarea',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入会议内容'
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
                                readOnly:true,
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
                                readOnly:true,
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
                                readOnly:true,
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
                                readOnly:true,
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
                                label: '视频会议系统',
                                labelWidth: '40%',
                                name: 'meetsocure4',
                                readOnly:true,
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
                                label: '休息区域',
                                labelWidth: '40%',
                                name: 'meetsocure6',
                                readOnly:true,
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
                                        disabled: true,
                                        text: '',
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
                                        xtype: 'textfield',
                                        id:'meetpeo',
                                        height: 40,
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
                                        disabled: true,
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
                                xtype: 'textfield',
                                id: 'meetpeo1',
                                label: '公司外部',
                                labelWidth: '40%',
                                readOnly:true,
                                name: 'meetpeo1',
                                placeHolder: '请输入公司外部人员'
                            },
                            {
                                xtype: 'textnumfield',
                                label: '总人数',
                                labelWidth: '40%',
                                readOnly:true,
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
                                xtype: 'textfield',
                                id: 'meetclass',
                                label: '分配会议室',
                                labelWidth: '40%',
                                name: 'meetclass',
                                readOnly:true,
                                placeHolder: '会议室'
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    align: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'spacer'
                                    },
                                    {
                                        xtype: 'button',
                                        id:'seluser4',
                                        margin: 10,
                                        width: '30%',
                                        text: '匹配会议室',
                                        disabled: true,
                                    },
                                    {
                                        xtype: 'button',
                                        id:'seluser5',
                                        margin: 10,
                                        width: '30%',
                                        disabled: true,
                                        text: '所有会议室'
                                    },
                                    {
                                        xtype: 'spacer'
                                    }
                                ]
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