Ext.define('HelcOA.view.ForApprovalProcess.humanresources.trainingEquipmentsBorrowing', {
    extend: 'Ext.Panel',
    id: 'sp_trainingEquipmentsBorrowing_id',
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
                id: 'surface_ID',
                title: '培训设施借用申请表',
                items: [
	                    {
	                        xtype: 'button',
	                        id: 'returnHome_ID',
	                        text: '返回',
	                        ui: 'back'
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
								name: 'fileno',
								id: 'fileno',
                            	readOnly:true,
                            },
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '申请人',
                                labelWidth: '40%',
                                placeHolder: '请输入申请人',
								name: 'agentman',
								id: 'agentman',
                            	readOnly:true
                            },                            
							{
                                xtype: 'textfield',
                                label: '申请部门',
                                labelWidth: '40%',
                                placeHolder: '请输入申请部门',
								name: 'dept',
								id: 'dept',
                            	readOnly:true
                            },	
                            {
                                xtype: 'textfield',
                                label: '申请日期',
                                labelWidth: '40%',
								name: 'createdate',
								id: 'createdate',
								required: true,
                            	readOnly:true
								
                            },	
							{
                                xtype: 'textfield',
                                label: '员工号',
                                required: true,
                                labelWidth: '40%',
                                placeHolder: '请输入员工号',
								name: 'ygh',
								id: 'ygh',
                            	readOnly:true
                            },
							{
								xtype : 'selectfield',
								label : '短信通知',
								id : 'sendmobile',
								labelWidth : '40%',
                            	readOnly:true,
								placeHolder : '请选择短信通知',
								options : [ {
									text : '不需要',
									value : '不需要'
								}, {
									text : '需要',
									value : '需要'
								} ],
								listeners : {
									change : function(
											select,
											newValue,
											oldValue) {
										if (newValue == '需要') {
											Ext
													.getCmp(
															'sendnumber')
													.setDisabled(
															false);
											Ext
													.getCmp(
															'sendnumber')
													.focus();
										} else {
											Ext
													.getCmp(
															'sendnumber')
													.setValue(
															'');
											Ext
													.getCmp(
															'sendnumber')
													.setDisabled(
															true);
										}
									}
								}
							},
							{
								xtype : 'textnumfield',
								label : '通知号码',
								id : 'sendnumber',
								name : 'sendnumber',
								placeHolder : '请输入短信通知号码',
								labelWidth : '40%',
								disabled : true
							},
							{
								xtype : 'textnumfield',
								label : '联络电话',
								id : 'phone',
								name : 'phone',
								placeHolder : '请输入联络电话',
								labelWidth : '40%',
								required: true,
                            	readOnly:true,
								disabled : true
							},                                          
							{
                                xtype: 'textfield',
                                label: '培训人数',
                                required: true,
                                labelWidth: '40%',
                                placeHolder: '请输入培训人数',
								name: 'renshu',
								required: true,
                            	readOnly:true,
								id: 'renshu'
                            },	
							{
								xtype : 'textfield',
								label : '开始时间',
								id : 'sdate',
								labelWidth : '40%',
								required : true,
                            	readOnly:true,
								placeHolder : '请输入开始时间',
								dateFormat : 'Y-m-d',
								listeners : {
									focus : function() {
										initDate2(
												'sdate',
												'开始时间');
									}
								}
							},
							{
								xtype : 'textfield',
								label : '结束时间',
								id : 'edate',
								labelWidth : '40%',
								required : true,
                            	readOnly:true,
								placeHolder : '请输入结束时间',
								dateFormat : 'Y-m-d',
								listeners : {
									focus : function() {
										initDate2(
												'edate',
												'结束时间');
									}
								}
							},
							{ 
                                xtype: 'selectfield',
                                id: 'keshi',
                                label: '课室、设施选择',
                                labelWidth: '40%',
                                placeHolder: '课室、设施选择',
                            	readOnly:true,
                                options: [
                                    {
                                        text: '普通课室',
                                        value: '普通课室'
                                    },
                                    {
                                        text: '培训设施',
                                        value: '培训设施'
                                    },
									{
                                        text: '阶梯课室',
                                        value: '阶梯课室'
                                    },
									{
                                        text: '模拟故障学习室',
                                        value: '模拟故障学习室'
                                    },
									{
                                        text: '电梯',
                                        value: '电梯'
                                    },
									{
                                        text: '扶梯',
                                        value: '扶梯'
                                    },
									{
                                        text: '实操井道',
                                        value: '实操井道'
                                    },
                                    {
                                        text: '模拟控制器室',
                                        value: '模拟控制器室'
                                    },
									{
                                        text: '计算机学习室',
                                        value: '计算机学习室'
                                    }
                                ]
                            },
							{
                                xtype: 'selectfield',
                                id: 'yongtu',
                                label: '使用用途',
                                labelWidth: '40%',
                            	readOnly:true,
                                placeHolder: '使用用途',
                                options: [
                                    {
                                        text: '培训',
                                        value: '培训'
                                    },
                                    {
                                        text: '会议',
                                        value: '会议'
                                    }
                                ]
                            },
							{
                                xtype: 'textfield',
                                label: '标 题',
                                labelWidth: '40%',
                                placeHolder: '请输入标 题',
								required : true,
                            	readOnly:true,
								name: 'subject',
								
								id: 'subject'
                            },
							{
                                xtype: 'autoTextArea',
                                label: '申请理由及要求',
                                labelWidth: '40%',
                                placeHolder: '请输入申请理由及要求',
								name: 'reason_textarea',
								required : true,
                            	readOnly:true,
								id: 'reason_textarea'
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
                    	id: 'firflow',
                    	name: 'firflow'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'dept',
                    	name: 'dept'
                    },
                    {
                    	xtype: 'textfield',
                    	id: 'agentman',
                    	name: 'agentman'
                    },
		            {
		            	xtype: 'textfield',
		            	id: 'ext1',
		            	name: 'ext1',
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