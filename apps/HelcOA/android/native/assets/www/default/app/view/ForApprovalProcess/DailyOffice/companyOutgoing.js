
/* JavaScript content from app/view/ForApprovalProcess/DailyOffice/companyOutgoing.js in folder common */
/*Sured by QiuXL 20170601*/
Ext.define('HelcOA.view.ForApprovalProcess.DailyOffice.companyOutgoing', {
	extend : 'Ext.Panel',
	id : 'sp_companyOutgoing_ID',
	requires : ['Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea'],
	config : {
		layout : 'vbox',
		items : [{
				xtype : 'toolbar',
				docked : 'top',
				id : 'surface_ID',
				title : '公司发文流程',
				items : [{
						xtype : 'button',
						iconCls : 'home',
						id : 'returnHome_ID'
					}, {
						xtype : 'spacer'
					}, {
						xtype : 'button',
						id : 'idea_ID',
						text : '下一步'
					}
				]
			}, {
				xtype : 'formpanel',
				flex : 1,
				id : 'fp',
				items : [{
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'textfield',
								label : '文件标题',
								id : 'subject',
								labelWidth : '40%',
								required : true,
								placeHolder : '请输入编号'
							}, {
								xtype : 'selectfield',
								label : '流程类型',
								id : 'fwtype',
								labelWidth : '40%',
								required : true,
								options : [{
										text : '公司发文',
										value : '公司发文'
									}, {
										text : '规章制度',
										value : '规章制度'
									}
								]
							}, {
								xtype : 'selectfield',
								label : '文件字',
								id : 'writ',
								labelWidth : '40%',
								options : [{
										text : '日立电梯（中国）工字',
										value : '日立电梯（中国）工字'
									}, {
										text : '日立电梯（中国）函字',
										value : '日立电梯（中国）函字'
									}, {
										text : '日立电梯（中国）党字',
										value : '日立电梯（中国）党字'
									}, {
										text : '日立电梯（中国）通字',
										value : '日立电梯（中国）通字'
									}, {
										text : '日立电梯（中国）字',
										value : '日立电梯（中国）字'
									}
								]
							}, {
								xtype : 'textfield',
								label : '文件编号',
								id : 'wdbh',
								labelWidth : '40%',
								placeHolder : '请输入文件编号'
							}, {
								xtype : 'selectfield',
								label : '拟稿部门',
								id : 'ngbm',
								labelWidth : '40%',
								options : [{
										text : '工程总部',
										value : '工程总部'
									}, {
										text : '营业总部',
										value : '营业总部'
									}, {
										text : '制造统括总部',
										value : '制造统括总部'
									}, {
										text : '人力资源总部',
										value : '人力资源总部'
									}, {
										text : '财务总部',
										value : '财务总部'
									}, {
										text : '技术开发总部',
										value : '技术开发总部'
									}, {
										text : '品质保证总部',
										value : '品质保证总部'
									}, {
										text : '战略规划总部',
										value : '战略规划总部'
									}, {
										text : '采购总部',
										value : '采购总部'
									}, {
										text : '审计监察室',
										value : '审计监察室'
									}, {
										text : '总裁办',
										value : '总裁办'
									}, {
										text : '总工室',
										value : '总工室'
									}, {
										text : '党委',
										value : '党委'
									}, {
										text : '工会',
										value : '工会'
									}, {
										text : '纪委',
										value : '纪委'
									}
								]
							}, {
								xtype : 'selectfield',
								label : '密级',
								id : 'miji',
								labelWidth : '40%',
								options : [{
										text : '无',
										value : '无'
									}, {
										text : '内部资料',
										value : '内部资料'
									}, {
										text : 'A',
										value : 'A'
									}, {
										text : 'AA',
										value : 'AA'
									}, {
										text : 'AAA',
										value : 'AAA'
									}
								]
							}
						]
					}, {
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'textfield',
								label : '生效日期',
								labelWidth : '40%',
								id : 'showss',
								placeHolder : '请输入生效日期',
								listeners : {
									focus : function () {
										initDate2('showss', '生效日期');
									}
								}
							}, {
								xtype : 'textfield',
								label : '保存年限',
								id : 'bcnx',
								labelWidth : '40%',
							}, {
								xtype : 'selectfield',
								id : 'fwfj',
								label : '发文附件',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								id : 'fs',
								label : '份数',
								labelWidth : '40%',
							}
						]
					}, {
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'fieldset',
								layout : 'hbox',
								items : [{
										xtype : 'autoTextArea',
										label : '主送',
										id : 'zs',
										labelWidth : '40%',
										width : '80%',
									}, {
										xtype : 'button',
										id : 'SelUser147',
										name : 'SelUser147',
										width : '20%',
										margin : '3px 0 0 0 0 ',
										text : '选择'
									}, ]
							}, {
								xtype : 'fieldset',
								layout : 'hbox',
								items : [{
										xtype : 'autoTextArea',
										label : '抄送',
										id : 'cs',
										labelWidth : '40%',
										width : '80%',
									}, {
										xtype : 'button',
										id : 'SelUser148',
										name : 'SelUser148',
										width : '20%',
										margin : '3px 0 0 0 0 ',
										text : '选择'
									}, ]
							}, {
								xtype : 'fieldset',
								layout : 'hbox',
								items : [{
										xtype : 'autoTextArea',
										label : '抄报',
										id : 'cb',
										labelWidth : '40%',
										width : '80%',
									}, {
										xtype : 'button',
										id : 'SelUser149',
										name : 'SelUser149',
										width : '20%',
										margin : '3px 0 0 0 0 ',
										text : '选择'
									}, ]
							}
						]
					}, {
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'textfield',
								id : 'bzr',
								label : '编制人',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								label : '签署日期',
								id : 'bzsj',
								labelWidth : '40%',
								placeHolder : '请输入签署日期',
								listeners : {
									focus : function () {
										initDate2('bzsj', '签署日期');
									}
								}
							}
						]
					}, {
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'textfield',
								label : '审核人',
								id : 'shr',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								label : '签署日期',
								id : 'shsj',
								labelWidth : '40%',
								placeHolder : '请输入签署日期',
								listeners : {
									focus : function () {
										initDate2('shsj', '签署日期');
									}
								}
							}
						]
					}, {
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'textfield',
								label : '批准人',
								id : 'pzr',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								label : '签署日期',
								id : 'pzsj',
								labelWidth : '40%',
								placeHolder : '请输入签署日期',
								listeners : {
									focus : function () {
										initDate2('pzsj', '签署日期');
									}
								}
							}
						]
					}, {
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'textfield',
								label : '校对人',
								id : 'bzh',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								label : '签署日期',
								id : 'bzhsj',
								labelWidth : '40%',
								placeHolder : '请输入签署日期',
								listeners : {
									focus : function () {
										initDate2('bzhsj', '签署日期');
									}
								}
							}
						]
					}, {
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'textareafield',
								label : '摘要',
								id : 'zhaiyao_textarea',
								labelWidth : '40%'
							}
						]
					}, {
						xtype : 'fieldset',
						instructions : '注意：如果选择‘继承’阅读人员那里输入的内容是不起效，如果选择‘不继承’请在阅读人员内选择相关人员和群组  ',
						title : '',
						items : [{
								xtype : 'fieldset',
								layout : 'hbox',
								items : [{
										xtype : 'textfield',
										label : '选择正文',
										id : 'zwdoc',
										labelWidth : '40%',
										width : '80%',
										placeHolder : '请输入正文'
									}, {
										xtype : 'button',
										id : 'button145',
										name : 'button145',
										width : '20%',
										margin : '3px 0 0 0 0 ',
										text : '选择'
									}, ]
							}, {
								xtype : 'selectfield',
								label : '是否继承目录权限',
								id : 'jcacl',
								labelWidth : '40%',
								options : [{
										text : '继承',
										value : '继承'
									}, {
										text : '不继承',
										value : '不继承'
									}
								]
							}
						]
					}, {
						xtype : 'fieldset',
						items : [{
								xtype : 'fieldset',
								layout : 'hbox',
								items : [{
										xtype : 'autoTextArea',
										label : '阅读人员',
										id : 'readpeo',
										labelWidth : '40%',
										width : '80%',
										placeHolder : '请输入阅读人员'
									}, {
										xtype : 'button',
										id : 'button158',
										name : 'button158',
										width : '20%',
										margin : '3px 0 0 0 0 ',
										text : '选择'
									}, ]
							}, {
								xtype : 'fieldset',
								layout : 'hbox',
								items : [{
										xtype : 'autoTextArea',
										label : '选择文档归档位置',
										id : 'catalogname',
										labelWidth : '40%',
										width : '80%',
										placeHolder : '请输入选择文档归档位置'
									}, {
										xtype : 'button',
										id : 'button147',
										name : 'button147',
										width : '20%',
										margin : '3px 0 0 0 0 ',
										text : '选择'
									}, ]
							}, ]
					}, {
						xtype : 'fieldset',
						hidden : true,
						items : [{
								xtype : 'textfield',
								id : 'conds',
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
								id : 'idea',
								name : 'idea'
							}, {
								xtype : 'textfield',
								id : 'endprocessdate',
								name : 'endprocessdate'
							}, {
								xtype : 'textfield',
								id : 'dept',
								name : 'dept'
							}, {
								xtype : 'textfield',
								id : 'fileno',
								name : 'fileno'
							}, {
								xtype : 'textfield',
								id : 'agentman',
								name : 'agentman'
							}, {
								xtype : 'textfield',
								id : 'createdate',
								name : 'createdate'
							}, {
								xtype : 'textfield',
								id : 'audit_list',
								name : 'audit_list'
							}, {
								xtype : 'textfield',
								id : 'taskid',
								name : 'taskid'
							}, {
								xtype : 'textfield',
								id : 'mast',
								name : 'mast'
							}, {
								xtype : 'textfield',
								id : 'firflow',
								name : 'firflow'
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
								id : 'ext1',
								name : 'ext1'
							}, {
								xtype : 'textfield',
								id : 'pbsj',
								name : 'pbsj'
							}, {
								xtype : 'textfield',
								id : 'zcbzr',
								name : 'zcbzr'
							}, {
								xtype : 'textfield',
								id : 'zcbsj',
								name : 'zcbsj'
							}, {
								xtype : 'textfield',
								id : 'iszcb',
								name : 'iszcb'
							}, {
								xtype : 'textfield',
								id : 'arcpathid',
								name : 'arcpathid'
							}, {
								xtype : 'textfield',
								id : 'catalogid',
								name : 'catalogid'
							}, {
								xtype : 'textfield',
								id : 'pigeonhole',
								name : 'pigeonhole'
							}, {
								xtype : 'textfield',
								id : 'cabinet',
								name : 'cabinet'
							}, {
								xtype : 'textfield',
								id : 'noselect',
								name : 'noselect'
							}, {
								xtype : 'textfield',
								id : 'inherit',
								name : 'inherit'
							}, {
								xtype : 'textfield',
								id : 'managerman_1',
								name : 'managerman_1'
							}, {
								xtype : 'textfield',
								id : 'editman_1',
								name : 'editman_1'
							}, {
								xtype : 'textfield',
								id : 'printer_1',
								name : 'printer_1'
							}, {
								xtype : 'textfield',
								id : 'readman_1',
								name : 'readman_1'
							}, {
								xtype : 'textfield',
								id : 'listuser_1',
								name : 'listuser_1'
							}, {
								xtype : 'textfield',
								id : 'zwdocunid',
								name : 'zwdocunid'
							}, {
								xtype : 'textfield',
								id : 'managermen',
								name : 'managermen'
							}, {
								xtype : 'textfield',
								id : 'createflag',
								name : 'createflag'
							}, ]
					}
				]
			}
		]
	}
});
