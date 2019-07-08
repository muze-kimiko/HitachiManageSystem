Ext.define('HelcOA.view.HasEnded.DailyOffice.VideoEquipmentApplicationForm', {
    extend: 'Ext.Panel',
    id:'yjs_VideoEquipmentApplicationForm_ID',
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
                id: 'yjs_surface_ID',
                title: '视频设备申请表',
                items: [
					{
	                	xtype: 'button',
	                	text: '返回',
	                    ui: 'back',
	                    id: 'yjs_returnHasEnded'
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
                                label: '单号',
                                labelWidth: '40%',
                                placeHolder: '请输入单号',
                                readOnly:true
                            },
                            {
                            	xtype: 'textfield',
                            	id:'createdate',
                            	label: '日期',
                            	labelWidth: '40%',
                            	readOnly:true,
                            	zIndex: 999,
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
                                label: '会议名称',
                                labelWidth: '40%',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入会议名称'
                            },
                            {
                                xtype: 'textfield',
                                id:'dept',
                                label: '申请部门',
                                readOnly:true,
                                labelWidth: '40%',
                                placeHolder: '请输入申请部门名'
                            },
                            {
                            	xtype: 'textfield',
                            	id:'addrmain',
                            	label: '主会场地址',
                            	labelWidth: '40%',
                            	readOnly:true,
                            	placeHolder: '请输入主会场地址'
                            },
                            
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'lxr',
                                label: '联系人',
                                labelWidth: '40%',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入联系人姓名'
                            },
                            {
                                xtype: 'textfield',
                                id: 'lxdh',
                                label: '联系电话',
                                labelWidth: '40%',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入联系电话'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'leader',
                                label: '出席领导',
                                labelWidth: '40%',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入出席领导'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '会议时间',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'sdate',
                                label: '开始',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                required: true,
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                zIndex: 999,
                                listeners:{
                                	focus:function(){
                                		initDate2('sdate','会议开始时间');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'stime',
                                label: '具体时间',
                                labelWidth: '40%',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入具体开始时间'
                            },
                            {
                                xtype: 'textfield',
                                id: 'edate',
                                label: '结束',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                required: true,
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                zIndex: 999,
                                listeners:{
                                	focus:function(){
                                		initDate2('edate','会议结束时间');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'etime',
                                label: '具体时间',
                                labelWidth: '40%',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入具体结束时间'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'selectfield',
                                id: 'hytype',
                                label: '会议类型',
                                labelWidth: '40%',
                                readOnly:true,
                                placeHolder: '请选择会议类型',
                                options: [
                                    {
                                        text: '硬件',
                                        value: '硬件'
                                    },
                                    {
                                        text: '软件',
                                        value: '软件'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        instructions: '会议召集人请向各会议室负责人预约会议室和视频会议设备，各分公司的下属网点会场如需参加视频会议，请在"会议主要议程"栏中加以注明。',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                id: 'summary',
                                label: '主要议程',
                                labelWidth: '40%',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入会议主要议程'
                            },
                            {
                                xtype: 'textfield',
                                id:'agentman',
                                label: '起草人员',
                                labelWidth: '40%',
                                placeHolder: '请输入起草人员姓名',
                                readOnly:true
                            },
                            {
                            	xtype: 'textfield',
                            	id:'draftsdate',
                                label: '起草日期',
                                labelWidth: '40%',
                                placeHolder: '请输入起草日期',
                                readOnly:true,
                                zIndex: 999,
                                listeners:{
                                	focus:function(){
                                		initDate(Ext.getCmp('draftsdate').getValue(),'起草日期','createdate');
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
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'autoTextArea',
                                        id:'meetingrooms',
                                        width: '85%',
                                        labelWidth: '48%',
                                        label: '分会场',
                                        placeHolder: '请选择参会的分会场',
                                        readOnly:true
                                    },
                                ]
                            },
                            {
                                xtype: 'autoTextArea',
                                id: 'zjdep',
                                readOnly:true,
                                label: '召集部门',
                                labelWidth: '40%',
                                placeHolder: '请输入召集部门名称'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id:'sendreader',
                                        height: 40,
                                        readOnly:true,
                                        width: '85%',
                                        labelWidth: '48%',
                                        label: '抄送',
                                    },
//                                    {
//                                        xtype: 'button',
//                                        id: '',
//                                        height: 41,
//                                        style: 'border:0;',
//                                        width: '15%',
//                                        iconCls: 'search',
//                                        text: '',
//                                        disabled: true,
//                                        listeners:{
//                                        	tap:function(){
//                                        		object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('sendreader');
//                                        	}
//                                        }
//                                    }
                                ]
                            }
                        ]
                    },
//                    {
//                        xtype: 'fieldset',
//                        instructions: '',
//                        title: '',
//                        items: [
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
//                        ]
//                    },
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
                            }
                        ]
                    
                    	
                    }
                ]
            }
        ]
    }

});