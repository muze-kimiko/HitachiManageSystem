/**
 * 数据恢复
 */
Ext.define('HelcOA.view.HasEnded.InformationTechnology.DataRecovery', {
    extend: 'Ext.Panel',
    id: 'yjs_DataRecovery_ID',
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
                title: '数据恢复申请表',
                items: [
	                    {
	                        xtype: 'button',
	                        id: 'yjs_returnHasEnded',
	                        text: '返回',
	                        ui: 'back'
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
                                xtype: 'textfield',
                                label: '标题',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入标题',
								name: 'subject',
								id: 'subject',
                            },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '申请人所在部门',
                                labelWidth: '40%',
                                placeHolder: '请输入申请人所在部门',
								name: 'dept',
								id: 'dept',
                            	readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '申请人',
                                labelWidth: '40%',
                                placeHolder: '请输入申请人',
								name: 'agentman',
								id: 'agentman',
                            	readOnly:true,
                            },
                            {
                                xtype: 'textfield',
                                label: '申请时间',
                                labelWidth: '40%',
								name: 'createdate',
								id: 'createdate',
                            	readOnly:true,
                            },
                            {
                                xtype: 'textfield',
                                label: '联络电话',
                                labelWidth: '40%',
                                placeHolder: '请输入联络电话',
								name: 'phone',
								id: 'phone',
                            },
							{
								xtype : 'selectfield',
								label : '短信通知',
								id : 'sendmobile',
								labelWidth : '40%',
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
                                xtype: 'autoTextArea',
                                label: '申请原因',
                                labelWidth: '40%',
                                placeHolder: '请输入申请原因',
								name: 'reason_textarea',
								id: 'reason_textarea',
                            }
					
                        ]
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
    					xtype : 'textfield',
    					id : 'mast',
    					name : 'mast'
    				},
                    {
    					xtype : 'textfield',
    					id : 'ext1',
    					name : 'ext1'
    				}
                ]
            }
        ]
    }

});