Ext.define('HelcOA.view.HasEnded.ChengDu.CDMeeting', {
    extend: 'Ext.Panel',
    id:'yjs_CDMeeting_ID',
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
                title: '成都会议室申请',
                items: [
                    {
                        xtype: 'button',
                        id: 'yjs_returnHasEnded',
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
                                name:'fileno',
                                placeHolder: '请输入编号',
                            },
							{
                                xtype: 'autoTextArea',
                                id: 'subject',
                                label: '标题',
                                labelWidth: '40%',
                                name: 'subject',
								required:true,
                                placeHolder: '请输入标题',
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
								name: 'createdate',
                                label: '申请时间',
                                labelWidth: '40%',
                            },
                            {
                                xtype: 'textfield',
                                id: 'phone1',
                                label: '联系电话',
                                labelWidth: '40%',
                                name: 'phone1',
                                required: true,
                                placeHolder: '请输入联系电话'
                            },
							{
								xtype : 'textfield',
								label : '使用时间（起）',
								labelWidth : '40%',
								name : 'stime1',
								id : 'stime1',
								required : true,
								placeHolder : '请输入使用时间（起）',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('stime1','期望完成');
									}		
								}
							},
							{
								xtype : 'textfield',
								label : '时（起）',
								labelWidth : '40%',
								name : 'shour',
								id : 'shour',
								required : true,
								placeHolder : '请输入时（起）'
							},
							{
								xtype : 'textfield',
								label : '分（起）',
								labelWidth : '40%',
								name : 'sminu',
								id : 'sminu',
								required : true,
								placeHolder : '请输入分（起）'
							},
							{
								xtype : 'textfield',
								label : '使用时间（止）',
								labelWidth : '40%',
								name : 'etime1',
								id : 'etime1',
								required : true,
								placeHolder : '请输入使用时间（止）',
								dateFormat: 'Y-m-d',
								listeners:{
									focus:function(){
										initDate2('etime1','期望完成');
									}
								}
							},
							{
								xtype : 'textfield',
								label : '时（止）',
								labelWidth : '40%',
								name : 'shr1',
								id : 'shr1',
								required : true,
								placeHolder : '请输入时（止）'
							},
							{
								xtype : 'textfield',
								label : '分（止）',
								labelWidth : '40%',
								name : 'smu1',
								id : 'smu1',
								required : true,
								placeHolder : '请输入分（止）'
							},
							{
								xtype : 'textfield',
								label : '与会人数',
								labelWidth : '40%',
								name : 'peoples1',
								id : 'peoples1',
								required : true,
								placeHolder : '请输入与会人数'
							},
							{
                                xtype: 'selectfield',
                                id: 'sbname1',
                                name: 'sbname1',
                                label: '会议需用设备说明',
                                labelWidth: '40%',
                                options: [
								{
									text: '',
									value: ''
								},{
									text: '电子白板',
									value: '电子白板'
								},{
									text: '投影仪',
									value: '投影仪'
								},{
									text: '电子白板,投影仪',
									value: '电子白板,投影仪'
								}]
                            },
							{
								xtype : 'textfield',
								label : '其他资源设备',
								labelWidth : '40%',
								name : 'qt1',
								id : 'qt1',
								required : true,
								placeHolder : '请输入其他资源设备'
							},
							{
								xtype : 'autoTextArea',
								label : '安排会议室(房间号)',
								labelWidth : '40%',
								name : 'fjh1_textarea',
								id : 'fjh1_textarea',
								required : true,
								placeHolder : '请输入安排的会议室(房间号)'
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
                            	name: 'conds',
								value : 'nocon',
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
                            	id: 'selfalg',
                            	name: 'selfalg'
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
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'ext1',
                            	name: 'ext1'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});