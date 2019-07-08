
/* JavaScript content from app/view/ForApprovalProcess/InformationTechnology/ITBDapplicationForm.js in folder common */
/**
 * IT故障申请表
 */
Ext.define('HelcOA.view.ForApprovalProcess.InformationTechnology.ITBDapplicationForm', {
    extend: 'Ext.Panel',
    id: 'sp_ITBDapplicationForm_ID',
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
                                label: '申请部门',
                                labelWidth: '40%',
                                placeHolder: '请输入申请部门',
								name: 'dept',
								id: 'dept',
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
                                xtype: 'textfield',
                                label: '资产编号',
                                labelWidth: '40%',
                                placeHolder: '请输入资产编号',
								name: 'zcbh',
								id: 'zcbh',
                            },
							{
                                xtype: 'textfield',
                                label: '机器所在位置',
                                labelWidth: '40%',
                                placeHolder: '请输入机器所在位置',
								name: 'weizhi',
								id: 'weizhi',
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
                                xtype: 'textfield',
                                label: 'CPU型号',
                                labelWidth: '40%',
                                placeHolder: '请输入CPU型号',
								name: 'cputype',
								id: 'cputype',
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
                                xtype: 'textfield',
                                label: '内存',
                                labelWidth: '40%',
                                placeHolder: '请输入内存',
								name: 'mencapacity',
								id: 'mencapacity',
                            },
							{
                                xtype: 'textfield',
                                label: '硬盘容量',
                                labelWidth: '40%',
                                placeHolder: '请输入硬盘容量',
								name: 'hdcapacity',
								id: 'hdcapacity',
                            },
							{
                                xtype: 'textfield',
                                label: '问题描述',
                                labelWidth: '40%',
                                placeHolder: '请输入问题描述',
								name: 'wtms_textarea',
								id: 'wtms_textarea',
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
                    	xtype: 'textfield',
                    	id: 'agentman',
                    	name: 'agentman'
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