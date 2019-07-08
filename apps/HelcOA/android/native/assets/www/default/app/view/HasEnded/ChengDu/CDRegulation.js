
/* JavaScript content from app/view/HasEnded/ChengDu/CDRegulation.js in folder common */
Ext
		.define(
				'HelcOA.view.HasEnded.ChengDu.CDRegulation',
				{
					extend : 'Ext.Panel',
					id : 'yjs_CDRegulation_id',
					requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer',
							'Ext.form.Panel', 'Ext.form.FieldSet',
							'Ext.field.TextArea' ],
					config : {
						layout : 'vbox',
						items : [
								{
									xtype : 'toolbar',
									docked : 'top',
									title : '成都规章制度',
									items : [ {
										xtype : 'button',
										id : 'yjs_returnHasEnded',
										text : '返回',
										ui : 'back'
									}]
								},
								{
									xtype : 'formpanel',
									flex : 1,
									id : 'fp',
									items : [
											{
												xtype : 'fieldset',
												title : '',
												items : [ {
													xtype : 'textfield',
													label : '单号',
													id : 'fileno',
													name : 'fileno',
													labelWidth : '40%'
												}, {
													xtype : 'textfield',
													label : '文件标题',
													id : 'subject',
													name : 'subject',
													labelWidth : '40%',
													required : true
												}, {
													xtype : 'selectfield',
													label : '审批类型',
													id : 'fwtype',
													name : 'fwtype',
													labelWidth : '40%',
													required : true,
													options : [ {
														text : '',
														value : ''
													}, {
														text : '制度首发',
														value : '制度首发'
													}, {
														text : '制度修改',
														value : '制度修改'
													}, {
														text : '制度废止',
														value : '制度废止'
													} ]
												}, {
													xtype : 'selectfield',
													label : '是否需会签',
													id : 'hqflag',
													name : 'hqflag',
													labelWidth : '40%',
													required : true,
													options : [ {
														text : '',
														value : ''
													}, {
														text : '是',
														value : '是'
													}, {
														text : '否',
														value : '否'
													} ]
												}, {
													xtype : 'textfield',
													label : '文件编号',
													id : 'wdbh1',
													name : 'wdbh1',
													labelWidth : '40%'
												} ]
											},
											{
												xtype : 'fieldset',
												title : '注意：请按照会签顺序选择会签部门。',
												items : [ {
													xtype : 'selectfield',
													label : '会签数量',
													id : 'hqsl',
													name : 'hqsl',
													labelWidth : '40%',
													options : [ {
														text : '1',
														value : '(1)'
													}, {
														text : '2',
														value : '(2)'
													}, {
														text : '3',
														value : '(3)'
													}, {
														text : '4',
														value : '(4)'
													}, {
														text : '5',
														value : '(5)'
													}, {
														text : '6',
														value : '(6)'
													} ]
												}, {
													xtype : 'selectfield',
													label : '会签部门1',
													id : 'hqdep1',
													name : 'hqdep1',
													labelWidth : '40%',
													required : true,
													options : [ {
														text : '',
														value : ''
													}, {
														text : '总经理办公室',
														value : '总经理办公室'
													}, {
														text : '制造统括部',
														value : '制造统括部'
													}, {
														text : '管理部',
														value : '管理部'
													}, {
														text : '人力资源科',
														value : '人力资源科'
													}, {
														text : '品质保证科',
														value : '品质保证科'
													}, {
														text : '工会',
														value : '工会'
													} ]
												}, {
													xtype : 'selectfield',
													label : '会签部门2',
													id : 'hqdep2',
													name : 'hqdep2',
													labelWidth : '40%',
													options : [ {
														text : '',
														value : ''
													}, {
														text : '总经理办公室',
														value : '总经理办公室'
													}, {
														text : '制造统括部',
														value : '制造统括部'
													}, {
														text : '管理部',
														value : '管理部'
													}, {
														text : '人力资源科',
														value : '人力资源科'
													}, {
														text : '品质保证科',
														value : '品质保证科'
													}, {
														text : '工会',
														value : '工会'
													} ]
												}, {
													xtype : 'selectfield',
													label : '会签部门3',
													id : 'hqdep3',
													name : 'hqdep3',
													labelWidth : '40%',
													options : [ {
														text : '',
														value : ''
													}, {
														text : '总经理办公室',
														value : '总经理办公室'
													}, {
														text : '制造统括部',
														value : '制造统括部'
													}, {
														text : '管理部',
														value : '管理部'
													}, {
														text : '人力资源科',
														value : '人力资源科'
													}, {
														text : '品质保证科',
														value : '品质保证科'
													}, {
														text : '工会',
														value : '工会'
													} ]
												}, {
													xtype : 'selectfield',
													label : '会签部门4',
													id : 'hqdep4',
													name : 'hqdep4',
													labelWidth : '40%',
													options : [ {
														text : '',
														value : ''
													}, {
														text : '总经理办公室',
														value : '总经理办公室'
													}, {
														text : '制造统括部',
														value : '制造统括部'
													}, {
														text : '管理部',
														value : '管理部'
													}, {
														text : '人力资源科',
														value : '人力资源科'
													}, {
														text : '品质保证科',
														value : '品质保证科'
													}, {
														text : '工会',
														value : '工会'
													} ]
												}, {
													xtype : 'selectfield',
													label : '会签部门5',
													id : 'hqdep5',
													name : 'hqdep5',
													labelWidth : '40%',
													options : [ {
														text : '',
														value : ''
													}, {
														text : '总经理办公室',
														value : '总经理办公室'
													}, {
														text : '制造统括部',
														value : '制造统括部'
													}, {
														text : '管理部',
														value : '管理部'
													}, {
														text : '人力资源科',
														value : '人力资源科'
													}, {
														text : '品质保证科',
														value : '品质保证科'
													}, {
														text : '工会',
														value : '工会'
													} ]
												}, {
													xtype : 'selectfield',
													label : '会签部门6',
													id : 'hqdep6',
													name : 'hqdep6',
													labelWidth : '40%',
													options : [ {
														text : '',
														value : ''
													}, {
														text : '总经理办公室',
														value : '总经理办公室'
													}, {
														text : '制造统括部',
														value : '制造统括部'
													}, {
														text : '管理部',
														value : '管理部'
													}, {
														text : '人力资源科',
														value : '人力资源科'
													}, {
														text : '品质保证科',
														value : '品质保证科'
													}, {
														text : '工会',
														value : '工会'
													} ]
												} ]
											},
											{
												xtype : 'fieldset',
												title : '',
												items : [
														{
															xtype : 'selectfield',
															label : '拟稿部门',
															id : 'ngbm',
															name : 'ngbm',
															labelWidth : '40%',
															options : [
																	{
																		text : '',
																		value : ''
																	},
																	{
																		text : '财务科',
																		value : '财务科'
																	},
																	{
																		text : '管理部部办',
																		value : '管理部部办'
																	},
																	{
																		text : '信息技术科',
																		value : '信息技术科'
																	},
																	{
																		text : '总务科',
																		value : '总务科'
																	},
																	{
																		text : '品质保证科',
																		value : '品质保证科'
																	},
																	{
																		text : '产品设计科',
																		value : '产品设计科'
																	},
																	{
																		text : '生产管理科',
																		value : '生产管理科'
																	},
																	{
																		text : '生产技术科',
																		value : '生产技术科'
																	},
																	{
																		text : '制造统括部部办',
																		value : '制造统括部部办'
																	},
																	{
																		text : '资材科',
																		value : '资材科'
																	},
																	{
																		text : '总经办',
																		value : '总经办'
																	},
																	{
																		text : '钣金制作科',
																		value : '钣金制作科'
																	},
																	{
																		text : '电气制作科',
																		value : '电气制作科'
																	},
																	{
																		text : '人力资源科',
																		value : '人力资源科'
																	},
																	{
																		text : '成本管理科',
																		value : '成本管理科'
																	} ]
														},
														{
															xtype : 'selectfield',
															label : '密级',
															id : 'miji',
															name : 'miji',
															labelWidth : '40%',
															options : [ {
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
															} ]
														},
														{
															xtype : 'textfield',
															label : '生效日期',
															id : 'showss',
															name : 'showss',
															labelWidth : '40%',
															dateFormat : 'Y-m-d',
															listeners : {
																focus : function() {
																	initDate2(
																			'showss',
																			'生效日期');
																}
															}
														},
														{
															xtype : 'textfield',
															label : '保存年限',
															id : 'bcnx',
															name : 'bcnx',
															labelWidth : '40%',
															value : '10年'
														},
														{
															xtype : 'textfield',
															label : '发文附件',
															id : 'fwfj',
															name : 'fwfj',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															label : '份数',
															id : 'fs',
															name : 'fs',
															labelWidth : '40%'
														} ]
											},
											{
												xtype : 'fieldset',
												title : '历史版本最后修改日期*',
												items : [ {
													xtype : 'textfield',
													label : '修改日期',
													id : 'lastdate',
													name : 'lastdate',
													labelWidth : '40%',
													required : true,
													dateFormat : 'Y-m-d',
													listeners : {
														focus : function() {
															initDate2(
																	'lastdate',
																	'历史版本最后修改日期');
														}
													}
												} ]
											},
											{
												xtype : 'fieldset',
												title : '',
												items : [
														{
															xtype : 'textfield',
															label : '联系电话',
															id : 'phone',
															name : 'phone',
															labelWidth : '40%',
															required : true
														},
														{
															xtype : 'textfield',
															label : '制度编号',
															id : 'wdbh',
															name : 'wdbh',
															labelWidth : '40%',
															required : true
														},
														{
															xtype : 'textfield',
															label : '版本号',
															id : 'bbh',
															name : 'bbh',
															labelWidth : '40%',
															required : true
														},
														{
															xtype : 'textfield',
															label : '原阅读人员',
															id : 'oldreadpeo',
															name : 'oldreadpeo',
															labelWidth : '40%'
														},
														{
															xtype : 'panel',
															layout : 'hbox',
															items : [
																	{
																		xtype : 'autoTextArea',
																		id : 'readpeo',
																		name : 'readpeo',
																		width : '90%',
																		labelWidth : '48%',
																		label : '阅读人员',
																	},
																	{
																		xtype : 'button',
																		id : 'seluser4162',
																		height : 41,
																		style : 'border:0;',
																		width : '10%',
																		iconCls : 'search',
																		text : '选择',
																		listeners : {
																			tap : function() {
																				object
																						.getApplication()
																						.getController(
																								'PublicPersonnelSelectionC')
																						.selectPerson(
																								'readpeo');
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
																		id : 'zs',
																		name : 'zs',
																		width : '90%',
																		labelWidth : '48%',
																		label : '主送',
																	},
																	{
																		xtype : 'button',
																		id : 'seluser147',
																		height : 41,
																		style : 'border:0;',
																		width : '10%',
																		iconCls : 'search',
																		text : '选择',
																		listeners : {
																			tap : function() {
																				object
																						.getApplication()
																						.getController(
																								'PublicPersonnelSelectionC')
																						.selectPerson(
																								'zs');
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
																		id : 'cs',
																		name : 'cs',
																		width : '90%',
																		labelWidth : '48%',
																		label : '抄送',
																	},
																	{
																		xtype : 'button',
																		id : 'seluser148',
																		height : 41,
																		style : 'border:0;',
																		width : '10%',
																		iconCls : 'search',
																		text : '选择',
																		listeners : {
																			tap : function() {
																				object
																						.getApplication()
																						.getController(
																								'PublicPersonnelSelectionC')
																						.selectPerson(
																								'cs');
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
																		id : 'cb',
																		name : 'cb',
																		width : '90%',
																		labelWidth : '48%',
																		label : '抄报',
																	},
																	{
																		xtype : 'button',
																		id : 'seluser149',
																		height : 41,
																		style : 'border:0;',
																		width : '10%',
																		iconCls : 'search',
																		text : '选择',
																		listeners : {
																			tap : function() {
																				object
																						.getApplication()
																						.getController(
																								'PublicPersonnelSelectionC')
																						.selectPerson(
																								'cb');
																			}
																		}
																	} ]
														},
														{
															xtype : 'textfield',
															label : '编制人',
															id : 'agentman',
															name : 'agentman',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															label : '签署日期',
															id : 'bzsj',
															name : 'bzsj',
															labelWidth : '40%',
															dateFormat : 'Y-m-d',
															listeners : {
																focus : function() {
																	initDate2(
																			'bzsj',
																			'签署日期');
																}
															}
														} ]
											},
											{
												xtype : 'fieldset',
												title : '',
												items : [ {
													xtype : 'textareafield',
													label : '摘要',
													id : 'zhaiyao_textarea',
													name : 'zhaiyao_textarea',
													labelWidth : '40%'
												} ]
											},
											{
												xtype : 'fieldset',
												hidden : true,
												items : [
														{
															xtype : 'textfield',
															id : 'conds',
															name : 'conds',
															value : 'nocon'
														},
														{
															xtype : 'textfield',
															id : 'userid',
															name : 'userid'
														},
														{
															xtype : 'textfield',
															id : 'type',
															name : 'type'
														},
														{
															xtype : 'textfield',
															id : 'username',
															name : 'username'
														},
														{
															xtype : 'textfield',
															id : 'node',
															name : 'node'
														},
														{
															xtype : 'textfield',
															id : 'ctime',
															name : 'ctime'
														},
														{
															xtype : 'textfield',
															id : 'piid',
															name : 'piid'
														},
														{
															xtype : 'textfield',
															id : 'processname',
															name : 'processname'
														},
														{
															xtype : 'textfield',
															id : 'curauthor',
															name : 'curauthor'
														},
														{
															xtype : 'textfield',
															id : 'dealmen',
															name : 'dealmen'
														},
														{
															xtype : 'textfield',
															id : 'ygbh',
															name : 'ygbh'
														},
														{
															xtype : 'textfield',
															id : 'form',
															name : 'form'
														},
														{
															xtype : 'textfield',
															id : 'arcpath',
															name : 'arcpath'
														},
														{
															xtype : 'textfield',
															id : 'arcdate',
															name : 'arcdate'
														},
														{
															xtype : 'textfield',
															id : 'idea',
															name : 'idea'
														},
														{
															xtype : 'textfield',
															id : 'endprocessdate',
															name : 'endprocessdate'
														},
														{
															xtype : 'textfield',
															id : 'ext1',
															name : 'ext1'
														},
														{
															xtype : 'textfield',
															id : 'audit_list',
															name : 'audit_list'
														},
														{
															xtype : 'textfield',
															id : 'taskid',
															name : 'taskid'
														},
														{
															xtype : 'textfield',
															id : 'mast',
															name : 'mast'
														},
														{
															xtype : 'textfield',
															id : 'pi_flag',
															name : 'pi_flag'
														},
														{
															xtype : 'textfield',
															id : 'cfg_id',
															name : 'cfg_id'
														},
														{
															xtype : 'textfield',
															id : 'createflag',
															name : 'createflag'
														},
														{
															xtype : 'textfield',
															id : 'needzc',
															name : 'needzc'
														},
														{
															xtype : 'textfield',
															id : 'dept',
															name : 'dept'
														},
														{
															xtype : 'textfield',
															id : 'pbsj',
															name : 'pbsj'
														},
														{
															xtype : 'textfield',
															id : 'zcbzr',
															name : 'zcbzr'
														},
														{
															xtype : 'textfield',
															id : 'zcbsj',
															name : 'zcbsj'
														},
														{
															xtype : 'textfield',
															id : 'dep',
															name : 'dep'
														},
														{
															xtype : 'textfield',
															id : 'iszcb',
															name : 'iszcb'
														},
														{
															xtype : 'textfield',
															id : 'arcpathid',
															name : 'arcpathid'
														},
														{
															xtype : 'textfield',
															id : 'catalogid',
															name : 'catalogid'
														},
														{
															xtype : 'textfield',
															id : 'pigeonhole',
															value : 'tjDocumentManage.nsf',
															name : 'pigeonhole'
														},
														{
															xtype : 'textfield',
															id : 'cabinet',
															value : 'tjgsfw.nsf',
															name : 'cabinet'
														},
														{
															xtype : 'textfield',
															id : 'noselect',
															name : 'noselect'
														},
														{
															xtype : 'textfield',
															id : 'inherit',
															name : 'inherit'
														},
														{
															xtype : 'textfield',
															id : 'managerman_1',
															name : 'managerman_1'
														},
														{
															xtype : 'textfield',
															id : 'editman_1',
															name : 'editman_1'
														},
														{
															xtype : 'textfield',
															id : 'printer_1',
															name : 'printer_1'
														},
														{
															xtype : 'textfield',
															id : 'readman_1',
															name : 'readman_1'
														},
														{
															xtype : 'textfield',
															id : 'listuser_1',
															name : 'listuser_1'
														},
														{
															xtype : 'textfield',
															id : 'zwdocunid',
															name : 'zwdocunid'
														},
														{
															xtype : 'textfield',
															id : 'createdate',
															name : 'createdate'
														}, ]
											} ]
								} ]
					}

				});