
/* JavaScript content from app/view/Approved/ChengDu/CDStaffTransfer.js in folder common */
Ext.define('HelcOA.view.ysp_.ChengDu.CDStaffTransfer', {
    extend: 'Ext.Panel',
		id : 'ysp_CDStaffTransfer_id',
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
                title: '成都人员转调岗',
                items: [
                    {
                        xtype: 'button',
                        id: 'ysp_returnApproved',
                        text: '返回',
                        ui: 'back'
                    },
                ]
            },
            {
                xtype: 'formpanel',
                id:'fp',
                flex: 1,
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
                                placeHolder: '请输入单号'
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
                                readOnly : true,
                                placeHolder: '请输入需求部门'
                                	
                            },
                            {
                                xtype: 'textfield',
                                id: 'xqgw',
                                label: '需求岗位',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入需求岗位'
                            },
                            {
                                xtype: 'textfield',
                                id: 'ygh',
                                label: '请输入转调人员编号',
                                labelWidth: '40%',
                                required: true,
                                readOnly : true,
                                placeHolder: '请输入转调人员编号'
                            },
                            {
                                xtype: 'textfield',
                                id: 'query_xm',
                                label: '转/调人姓名',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入转调人员姓名'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'query_xb',
                                label: '性别',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '性别',
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
                                readOnly : true,
                                placeHolder: '请输入年龄'
                            },
                            {
                                xtype: 'textfield',
                                id: 'query_xl',
                                label: '学历',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入学历'
                            },
                            {
                                xtype: 'textfield',
                                id: 'query_zy',
                                label: '专业',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入专业'
                            },
                            {
                                xtype: 'textfield',
                                id: 'query_bm',
                                label: '现部门',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入现部门名'
                            },
                            {
                                xtype: 'textfield',
                                id: 'query_gw',
                                label: '现岗位',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入现岗位名'
                            },
                            {
								xtype : 'textfield',
								label : '现岗位任职时间',
								id : 'query_rzsj',
								labelWidth : '40%',
								required : true,
								readOnly : true,
								placeHolder : '请输入到岗时间',
								dateFormat : 'Y-m-d',
								listeners : {
									focus : function() {
										initDate2(
												'query_rzsj',
												'到岗时间');
									}
								}
							},
                            {
                                xtype: 'textfield',
                                id: 'query_rssj',
                                label: '入司时间',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入入司时间'
                            },

                            {
                            	xtype : 'panel',
        						layout : 'hbox',
        						items : [
        								{
        									xtype : 'autoTextArea',
        									id : 'xqbmbz',
        									width : '85%',
        									labelWidth : '48%',
        									label : '需求部门科长',
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
        									label : '需求部门部长',
        									readOnly : true,
        									required : true,
        								},
        								{
        									xtype : 'button',
        									id : 'seluser28789',
        									height : 41,
        									style : 'border:0;',
        									width : '15%',
        									iconCls : 'search',
        									text : '',
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
                            },
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
        									id : 'seluser28790',
        									height : 41,
        									style : 'border:0;',
        									width : '15%',
        									iconCls : 'search',
        									text : '',
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
        									label : '原部门部部长',
        									readOnly : true,
        									required : true,
        								},
        								{
        									xtype : 'button',
        									id : 'seluser28791',
        									height : 41,
        									style : 'border:0;',
        									width : '15%',
        									iconCls : 'search',
        									text : '',
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
                                xtype: 'autoTextArea',
                                id: 'query_sgz',
                                label: '持证情况',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入持证情况'
                            },
                            {
                                xtype: 'autoTextArea',
                                id: 'subject',
                                label: '标题',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入标题'
                            },
                            {
								xtype : 'textfield',
								label : '要求到岗时间',
								id : 'yqdgsj',
								labelWidth : '40%',
								required : true,
								readOnly : true,
								placeHolder : '请输入要求到岗时间',
								dateFormat : 'Y-m-d',
								listeners : {
									focus : function() {
										initDate2(
												'yqdgsj',
												'到岗时间');
									}
								}
							},
                            {
                                xtype: 'autoTextArea',
                                id: 'phone',
                                label: '联络电话',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入联络电话'
                            },
                            {
                                xtype: 'autoTextArea',
                                id: 'rztj',
                                label: '任职条件',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入任职条件'
                            },
                            {
                                xtype: 'autoTextArea',
                                id: 'reason_textarea',
                                label: '申请理由及推荐意见',
                                labelWidth: '40%',
                                readOnly : true,
                                placeHolder: '请输入申请理由及推荐意见'
                            },
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
						},{
							xtype : 'textfield',
							id : 'gwlist',
							name : 'gwlist'
						},{
							xtype : 'textfield',
							id : 'needzc',
							name : 'needzc'
						},{
							xtype : 'textfield',
							id : 'idea',
							name : 'idea'
						}]
					}
                ]
            }
        ]
    }

});