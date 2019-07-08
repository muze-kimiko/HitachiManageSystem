Ext.define('HelcOA.view.MyProcess.humanresources.StaffTransfer', {
    extend: 'Ext.Panel',
		id : 'wdlc_StaffTransfer_id',
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
                id : 'wdlc_surface_ID',
                title: '人员转_调岗申请',
				items : [ {
					xtype : 'button',
					ui : 'back',
					text : '返回',
					id : 'wdlc_returnMyProcess'
				} ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                id:'fp',
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
                                readonly:true
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'myfieldset96',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'xqbm',
                                label: '需求部门',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入需求部门',
                                readonly:true
                            },
                            {
                                xtype: 'textfield',
                                id: 'xqgw',
                                label: '需求岗位',
                                labelWidth: '40%',
                                placeHolder: '请输入需求岗位',
                                readonly:true
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ryssgs',
                                label: '所属公司',
                                labelWidth: '40%',
                                required: true,
                                readonly:true,
                                placeHolder: '所属公司',
                                options: [
                                    {
                                        text: '日立电梯',
                                        value: '日立电梯'
                                    },
                                    {
                                        text: '广州工厂',
                                        value: '广州工厂'
                                    },
                                    {
                                        text: '广分司',
                                        value: '广分司'
                                    }
                                ]
                            },
                            {
                                xtype: 'textfield',
                                id: 'whys_xq',
                                label: '需求岗位危害因素',
                                labelWidth: '40%',
                                labelWrap: true,
                                readonly:true
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'myfieldset98',
                        title: '转调人员信息',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'ygh',
                                label: '编号',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入转调人员编号',
                                readonly:true
                            },
                            {
                                xtype: 'textfield',
                                id: 'query_xm',
                                label: '姓名',
                                labelWidth: '40%',
                                placeHolder: '请输入转调人员姓名'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'query_xb',
                                label: '性别',
                                labelWidth: '40%',
                                placeHolder: '性别',
                                readonly:true,
                                options: [
                                    {
                                        text: '男',
                                        value: '男'
                                    },
                                    {
                                        text: '女',
                                        value: '女'
                                    }
                                ]
                            },
                            {
                                xtype: 'textfield',
                                id: 'query_nl',
                                label: '年龄',
                                labelWidth: '40%',
                                placeHolder: '请输入年龄',
                                readonly:true
                            },
                            {
                                xtype: 'textfield',
                                id: 'ryxl',
                                label: '学历',
                                labelWidth: '40%',
                                placeHolder: '请输入学历',
                                readonly:true
                            },
                            {
                                xtype: 'textfield',
                                id: 'query_xl',
                                label: '专业',
                                labelWidth: '40%',
                                placeHolder: '请输入专业',
                                readonly:true
                            },
                            {
                                xtype: 'textfield',
                                id: 'query_bm',
                                label: '现部门',
                                labelWidth: '40%',
                                placeHolder: '请输入现部门名',
                                readonly:true
                            },
                            {
                                xtype: 'textfield',
                                id: 'query_gw',
                                label: '现岗位',
                                labelWidth: '40%',
                                placeHolder: '请输入现岗位名'
                            },
                            {
                                xtype: 'textfield',
                                id: 'whys_y',
                                label: '现岗位危害因素',
                                labelWidth: '40%',
                                labelWrap: true,
                                placeHolder: '',
                                readonly:true
                            },
                            {
                                xtype: 'textfield',
                                id: 'query_rssj',
                                label: '入司时间',
                                labelWidth: '40%',
                                placeHolder: '请输入入司时间',
                                readonly:true
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '需求部门',
                        items: [
                            {
                            	xtype : 'panel',
        						layout : 'hbox',
        						items : [
        								{
        									xtype : 'autoTextArea',
        									id : 'xqbmbz',
        									width : '85%',
        									labelWidth : '48%',
        									label : '需求部门部长',
        									readOnly : true,
        									required : true,
        								},
        								{
        									xtype : 'button',
        									id : 'seluser28787',
        									height : 41,
        									style : 'border:0;',
        									width : '15%',
        									iconCls : 'search',
        									text : '',
        	                                readonly:true,
        									listeners : {
        										tap : function() {
        											object
        													.getApplication()
        													.getController(
        															'PublicPersonnelSelectionC')
        													.selectPerson(
        															'xqbmbz');
        										}
        									}
        								} ]
                            },
                            {
                              	xtype : 'panel',
        						layout : 'hbox',
        						items : [
        								{
        									xtype : 'autoTextArea',
        									id : 'xqbmbbz',
        									width : '85%',
        									labelWidth : '48%',
        									label : '需求部门总经理',
        									readOnly : true,
        									required : true,
        								},
        								{
        									xtype : 'button',
        									id : 'seluser28788',
        									height : 41,
        									style : 'border:0;',
        									width : '15%',
        									iconCls : 'search',
        									text : '',
        	                                readonly:true,
        									listeners : {
        										tap : function() {
        											object
        													.getApplication()
        													.getController(
        															'PublicPersonnelSelectionC')
        													.selectPerson(
        															'xqbmbbz');
        										}
        									}
        								} ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '原部门',
                        items: [
                            {
                            	xtype : 'panel',
        						layout : 'hbox',
        						items : [
        								{
        									xtype : 'autoTextArea',
        									id : 'ybmkz',
        									width : '85%',
        									labelWidth : '48%',
        									label : '原部门科长',
        									readOnly : true,
        									required : true,
        								},
        								{
        									xtype : 'button',
        									id : 'seluser28785',
        									height : 41,
        									style : 'border:0;',
        									width : '15%',
        									iconCls : 'search',
        									text : '',
        	                                readonly:true,
        									listeners : {
        										tap : function() {
        											object
        													.getApplication()
        													.getController(
        															'PublicPersonnelSelectionC')
        													.selectPerson(
        															'ybmkz');
        										}
        									}
        								} ]
                            },
                            {
                              	xtype : 'panel',
        						layout : 'hbox',
        						items : [
        								{
        									xtype : 'autoTextArea',
        									id : 'ybmbz',
        									width : '85%',
        									labelWidth : '48%',
        									label : '原部门部长',
        									readOnly : true,
        									required : true,
        								},
        								{
        									xtype : 'button',
        									id : 'seluser28786',
        									height : 41,
        									style : 'border:0;',
        									width : '15%',
        									iconCls : 'search',
        									text : '',
        	                                readonly:true,
        									listeners : {
        										tap : function() {
        											object
        													.getApplication()
        													.getController(
        															'PublicPersonnelSelectionC')
        													.selectPerson(
        															'ybmbz');
        										}
        									}
        								} ]
                            },
                            {
                            	xtype : 'panel',
        						layout : 'hbox',
        						items : [
        								{
        									xtype : 'autoTextArea',
        									id : 'ybmbbz',
        									width : '85%',
        									labelWidth : '48%',
        									label : '原部门总经理',
        									readOnly : true,
        									required : true,
        								},
        								{
        									xtype : 'button',
        									id : 'seluser4162',
        									height : 41,
        									style : 'border:0;',
        									width : '15%',
        									iconCls : 'search',
        									text : '',
        	                                readonly:true,
        									listeners : {
        										tap : function() {
        											object
        													.getApplication()
        													.getController(
        															'PublicPersonnelSelectionC')
        													.selectPerson(
        															'ybmbbz');
        										}
        									}
        								} ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'myfieldset97',
                        title: '',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                id: 'query_sgz',
                                label: '持证情况',
                                labelWidth: '40%',
                                placeHolder: '请输入持证情况'
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
                                label: '标题',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入标题',
                                value : '人员转_调岗申请',
                                readonly:true
                            },
                            {
								xtype : 'textfield',
								label : '到岗时间',
								id : 'yqdgsj',
								labelWidth : '40%',
								readOnly:true
							}
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'myfieldset101',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'phone',
                                label: '联系电话',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入联系电话',
                                readonly:true
                            },
                            {
								xtype : 'selectfield',
								label : '短信通知',
								id : 'sendmobile',
								labelWidth : '40%',
								placeHolder : '请选择短信通知',
                                readonly:true,
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
								disabled : true,
                                readonly:true
							}
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'myfieldset100',
                        title: '',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                id: 'rztj',
                                label: '任职条件',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入任职条件',
                                readonly:true
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'myfieldset99',
                        title: '申请理由及推荐意见',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                id: 'reason_textarea',
                                label: '申请理由及推荐意见',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入申请理由及推荐意见',
                                readonly:true
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        margin: '0 0 20 0',
                        title: '',
                        items: [
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    align: 'start',
                                    pack: 'center'
                                },
                            }
                        ]
                    },
                    {
						xtype : 'fieldset',
						hidden : true,
						items : [ {
							xtype : 'textfield',
							id : 'conds',
							value : 'nocon',
							name : 'conds'
						}, {
							xtype : 'textfield',
							id : 'userid',
							name : 'userid'
						}, {
							xtype : 'textfield',
							id : 'type',
							name : 'type'
						}, {
							xtype : 'textfield',
							id : 'username',
							name : 'username'
						}, {
							xtype : 'textfield',
							id : 'node',
							name : 'node'
						}, {
							xtype : 'textfield',
							id : 'ctime',
							name : 'ctime'
						}, {
							xtype : 'textfield',
							id : 'piid',
							name : 'piid'
						}, {
							xtype : 'textfield',
							id : 'processname',
							name : 'processname'
						}, {
							xtype : 'textfield',
							id : 'curauthor',
							name : 'curauthor'
						}, {
							xtype : 'textfield',
							id : 'dealmen',
							name : 'dealmen'
						}, {
							xtype : 'textfield',
							id : 'ygbh',
							name : 'ygbh'
						}, {
							xtype : 'textfield',
							id : 'form',
							name : 'form'
						}, {
							xtype : 'textfield',
							id : 'arcpath',
							name : 'arcpath'
						}, {
							xtype : 'textfield',
							id : 'arcdate',
							name : 'arcdate'
						}, {
							xtype : 'textfield',
							id : 'endprocessdate',
							name : 'endprocessdate'
						}, {
							xtype : 'textfield',
							id : 'createdate',
							name : 'createdate'
						}, {
							xtype : 'textfield',
							id : 'taskid',
							name : 'taskid'
						}, {
							xtype : 'textfield',
							id : 'pi_flag',
							name : 'pi_flag'
						}, {
							xtype : 'textfield',
							id : 'cfg_id',
							name : 'cfg_id'
						}, {
							xtype : 'textfield',
							id : 'createflag',
							name : 'createflag'
						},{
							xtype : 'textfield',
							id : 'audit_list',
							name : 'audit_list'
						},{
							xtype : 'textfield',
							id : 'mast',
							name : 'mast'
						},{
							xtype : 'textfield',
							id : 'ext1',
							name : 'ext1'
						},{
							xtype : 'textfield',
							id : 'managermen',
							name : 'managermen'
						},{
							xtype : 'textfield',
							id : 'dept',
							name : 'dept'
						},{
							xtype : 'textfield',
							id : 'agentman',
							name : 'agentman'
						},{
							xtype : 'textfield',
							id : 'dept',
							name : 'dept'
						}]
					}
                ]
            }
        ]
    }

});