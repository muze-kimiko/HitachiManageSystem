
/* JavaScript content from app/view/startProcess/MeetingRoomReservationTable.js in folder common */
Ext.define('HelcOA.view.startProcess.MeetingRoomReservationTable', {
    extend: 'Ext.Panel',
    id:'MeetingRoomReservationTable_id',
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
                title: '会议室预约表',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        id: 'qc_returnStartTheProcessName_ID'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        handler: function(button, e) {
                            var menu = Ext.create('Ext.Menu', {
                                items: [
                                {
                                    text: '下一步',
                                    id: 'qc_ToSelectNode',
                                    handler:function(button,e){
                                    	 Ext.Viewport.hideMenu('right');
                                    	 
                                    }
                                },
                                {
                                    text: '保存',
                                    handler:function(button,e){
                                    	 Ext.Viewport.hideMenu('right');
                                    	 
                                    }
                                },
                                {
                                    text: '意见',
                                    handler:function(button,e){
                                    	 Ext.Viewport.hideMenu('right');
                                    	 
                                    }
                                }
                                ]
                            });

                            Ext.Viewport.setMenu(menu, {
                                side: 'right',
                                reveal: false,
                                
                            });

                            Ext.Viewport.showMenu('right');
                        },
                        itemId: 'mybutton1',
                        iconCls: 'more'
                    }
                ]
            },
            {
                xtype: 'formpanel',
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
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textfield',
                                id: 'dept',
                                label: '申请部门',
                                labelWidth: '40%',
                                placeHolder: '请输入部门名称'
                            },
                            {
                                xtype: 'textfield',
                                id: 'agentman',
                                label: '申请人',
                                labelWidth: '40%',
                                placeHolder: '请输入申请人名称'
                            },
                            {
                                xtype: 'textfield',
                                id: 'apply_date',
                                label: '申请日期',
                                labelWidth: '40%',
                                placeHolder: '点击设置时间',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                listeners:{
                                	focus:function(){
                                		initDate2('apply_date','申请日期');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'phone',
                                label: '申请人电话',
                                labelWidth: '40%',
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
                                required: true,
                                placeHolder: '请输入会议主题'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'place',
                                label: '会议地点',
                                labelWidth: '40%',
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
                                xtype: 'textfield',
                                id: 'start_date',
                                label: '开始时间',
                                labelWidth: '40%',
                                placeHolder: '点击设置时间',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                listeners:{
                                	focus:function(){
                                		initDate2('start_date','申请日期');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'end_date',
                                label: '结束时间',
                                labelWidth: '40%',
                                placeHolder: '点击设置时间',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                listeners:{
                                	focus:function(){
                                		initDate2('end_date','申请日期');
                                	}
                                }
                            },
//                            {
//                                xtype: 'selectfield',
//                                label: '会议地点',
//                                labelWidth: '40%',
//                                options: [
//                                    {
//                                        text: '大石',
//                                        value: '大石'
//                                    },
//                                    {
//                                        text: '中信',
//                                        value: '中信'
//                                    },
//                                    {
//                                        text: '盈泰',
//                                        value: '盈泰'
//                                    }
//                                ]
//                            },
                            {
                                xtype: 'autoTextArea',
                                label: '会议内容',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入会议内容'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '会议所需资源',
                        items: [
                            {
                                xtype: 'selectfield',
                                id: 'TV',
                                label: '大屏幕电视',
                                labelWidth: '40%',
                                options: [
                                    {
                                        text: '不需要',
                                        value: '不需要'
                                    },
                                    {
                                        text: '需要',
                                        value: '需要'
                                    }
                                ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'network',
                                label: '网络',
                                labelWidth: '40%',
                                options: [
                                    {
                                        text: '不需要',
                                        value: '不需要'
                                    },
                                    {
                                        text: '需要',
                                        value: '需要'
                                    }
                                ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'white_board',
                                label: '白板',
                                labelWidth: '40%',
                                options: [
                                    {
                                        text: '不需要',
                                        value: '不需要'
                                    },
                                    {
                                        text: '需要',
                                        value: '需要'
                                    }
                                ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'projection',
                                label: '投影仪',
                                labelWidth: '40%',
                                options: [
                                    {
                                        text: '不需要',
                                        value: '不需要'
                                    },
                                    {
                                        text: '需要',
                                        value: '需要'
                                    }
                                ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'video_meeting',
                                label: '视频会议系统',
                                labelWidth: '40%',
                                options: [
                                    {
                                        text: '不需要',
                                        value: '不需要'
                                    },
                                    {
                                        text: '需要',
                                        value: '需要'
                                    }
                                ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'rest_area',
                                label: '休息区域',
                                labelWidth: '40%',
                                options: [
                                    {
                                        text: '不需要',
                                        value: '不需要'
                                    },
                                    {
                                        text: '需要',
                                        value: '需要'
                                    }
                                ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'other_resource',
                                label: '其他资源',
                                labelWidth: '40%',
                                options: [
                                    {
                                        text: '不需要',
                                        value: '不需要'
                                    },
                                    {
                                        text: '需要',
                                        value: '需要'
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
                                xtype: 'selectfield',
                                id: 'interior',
                                label: '公司内部',
                                labelWidth: '40%',
                                options: [
                                    {
                                        text: '不需要',
                                        value: '不需要'
                                    },
                                    {
                                        text: '需要',
                                        value: '需要'
                                    }
                                ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'exterior',
                                label: '公司外部',
                                labelWidth: '40%',
                                options: [
                                    {
                                        text: '不需要',
                                        value: '不需要'
                                    },
                                    {
                                        text: '需要',
                                        value: '需要'
                                    }
                                ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'total',
                                label: '总人数',
                                labelWidth: '40%',
                                options: [
                                    {
                                        text: '不需要',
                                        value: '不需要'
                                    },
                                    {
                                        text: '需要',
                                        value: '需要'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        instructions: '注意：申请会议室不允许提前15天预约，当天预约会议室请提前15分钟！',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'allot_meeting',
                                label: '分配会议室',
                                labelWidth: '40%',
                                placeHolder: '请输入会议主题'
                            },
                            {
                                xtype: 'textfield',
                                id: 'allot_person',
                                label: '分配人',
                                labelWidth: '40%',
                                placeHolder: '请输入会议主题'
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
                            {
                                xtype: 'textfield',
                                id: 'createdate',
                                name: 'createdate'
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
                            }
                        ]
                    
                    }
                ]
            }
        ]
    }

});