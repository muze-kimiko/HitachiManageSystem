
/* JavaScript content from app/view/MyProcess/humanresources/MarriageLeave.js in folder common */
Ext
		.define(
				'HelcOA.view.MyProcess.humanresources.MarriageLeave',
				{
					extend : 'Ext.Panel',
					id : 'wdlc_MarriageLeave_id',
					requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer',
							'Ext.form.Panel', 'Ext.Label', 'Ext.form.FieldSet',
							'Ext.field.Select', 'Ext.field.TextArea' ],

					config : {
						layout : 'vbox',
						items : [
								{
									xtype : 'toolbar',
									docked : 'top',
									id : 'wdlc_surface_ID',
									title : '婚假/产假申请',
									// title : '婚假_产假申请流程（派驻人员专用）',
									items : [ {
										xtype : 'button',
										id : 'wdlc_returnMyProcess',
										ui : 'back',
										text : '返回'
									} ]
								},
								{
									xtype : 'formpanel',
									id : 'fp',
									flex : 1,
									items : [
											{
												xtype : 'label',
												html : '在填写本申请前，请仔细阅读以下信息：<br/><br/>休婚假：员工在休婚假的申请前，应将结婚证原件或复印件提交给人力资源总部办张潇婷处。<br/><br/>休产假：员工可先申请休假，待出院后再提交医院开具的诊断证明书。',
												margin : 10
											},
											{
												xtype : 'fieldset',
												title : '',
												items : [
														{
															xtype : 'textfield',
															label : '填单人',
															id : 'agentman',
															name : 'agentman',
															placeHolder : '请输入填单人',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															label : '部门',
															id : 'dept',
															name : 'dept',
															placeHolder : '请输入部门',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															label : '请假人工号',
															id : 'qjr',
															labelWidth : '40%',
															required : true,
															placeHolder : '请输入请假人工号',
															listeners : {
																change : function(
																		obj, e,
																		eOpts) {
																	Ext
																			.getCmp(
																					'subject')
																			.setValue(
																					obj
																							.getValue()
																							+ '丧假申请');
																	var obj_length = obj
																			.getValue().length;
																	if (!/\d{8}$/
																			.test(obj
																					.getValue())
																			|| obj_length > 8) {
																		alert("请输入八位员工编号!");
																	}
																}
															}
														},
														{
															xtype : 'panel',
															layout : 'hbox',
															items : [
																	{
																		xtype : 'autoTextArea',
																		id : 'level1',
																		name : 'level1',
																		width : '85%',
																		labelWidth : '48%',
																		label : '部门领导',
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
																		listeners : {
																			tap : function() {
																				object
																						.getApplication()
																						.getController(
																								'PublicPersonnelSelectionC')
																						.selectPerson(
																								'level1');
																			}
																		}
																	} ]
														},
														{
															xtype : 'textfield',
															label : '标题',
															id : 'subject',
															name : 'subject',
															value : '婚假申请',
															placeHolder : '请输入标题',
															labelWidth : '40%',
															required : true
														} ]
											},
											{
												xtype : 'fieldset',
												title : '',
												items : [
														{
															xtype : 'selectfield',
															label : '休假类型',
															id : 'jqlx',
															name : 'jqlx',
															placeHolder : '请选择休假类型',
															labelWidth : '40%',
															options : [ {
																text : '婚假',
																value : '婚假'
															}, {
																text : '产假',
																value : '产假'
															} ],
															listeners : {
																change : function() {
																	var subject = Ext
																			.getCmp(
																					'qjr')
																			.getValue()
																			+ Ext
																					.getCmp(
																							'jqlx')
																					.getValue()
																			+ "申请";
																	Ext
																			.getCmp(
																					'subject')
																			.setValue(
																					subject);
																}
															}
														},
														{
															xtype : 'panel',
															layout : 'hbox',
															items : [
																	{
																		xtype : 'autoTextArea',
																		id : 'kqy',
																		width : '85%',
																		labelWidth : '48%',
																		label : '考勤员',
																		readOnly : true,
																		required : true,
																	},
																	{
																		xtype : 'button',
																		id : 'seluser4163',
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
																								'kqy');
																			}
																		}
																	} ]
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
															xtype : 'textfield',
															label : '联系电话',
															id : 'phone',
															name : 'phone',
															plcaHolder : '请输入联系电话',
															labelWidth : '40%',
															required : true
														} ]
											},
											{
												xtype : 'fieldset',
												title : '请假日期*',
												items : [
														{
															xtype : 'textfield',
															label : '开始日期',
															id : 'begindate',
															name : 'begindate',
															labelWidth : '40%',
															required : true,
															listeners : {
																focus : function() {
																	initDate2(
																			'begindate',
																			'开始日期');
																}
															}
														},
														{
															xtype : 'textfield',
															label : '分起',
															id : 'stime',
															name : 'stime',
															labelWidth : '40%',
															required : true
														},
														{
															xtype : 'textfield',
															label : '结束日期',
															id : 'enddate',
															name : 'enddate',
															labelWidth : '40%',
															required : true,
															listeners : {
																focus : function() {
																	initDate2(
																			'enddate',
																			'开始日期');
																}
															}
														},
														{
															xtype : 'textfield',
															label : '分止',
															id : 'etime',
															name : 'etime',
															labelWidth : '40%',
															required : true
														} ]
											},
											{
												xtype : 'fieldset',
												title : '请假事由*',
												items : [ {
													xtype : 'textareafield',
													id : 'reason_textarea',
													name : 'reason_textarea',
													label : ''
												} ]
											},
											{
												xtype : 'fieldset',
												title : '考勤员填写实际休假时间',
												items : [
														{
															xtype : 'textfield',
															label : '开始日期',
															id : 'sjsdate',
															labelWidth : '40%',
															placeHolder : '请输入请假开始时间',
															dateFormat : 'Y-m-d',
															listeners : {
																focus : function() {
																	initDate2(
																			'sjsdate',
																			'开始日期');
																}
															}
														},
														{
															xtype : 'textfield',
															label : '分起',
															id : 'sjstime',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															label : '结束日期',
															id : 'sjedate',
															labelWidth : '40%',
															placeHolder : '请输入请假结束时间',
															dateFormat : 'Y-m-d',
															listeners : {
																focus : function() {
																	initDate2(
																			'sjedate',
																			'结束日期');
																}
															}
														},
														{
															xtype : 'textfield',
															label : '分止',
															id : 'sjetime',
															labelWidth : '40%'
														} ]
											}, {
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
													id : 'fileno',
													name : 'fileno'
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
												}, {
													xtype : 'textfield',
													id : 'audit_list',
													name : 'audit_list'
												}, {
													xtype : 'textfield',
													id : 'mast',
													name : 'mast'
												}, {
													xtype : 'textfield',
													id : 'ext1',
													name : 'ext1'
												}, {
													xtype : 'textfield',
													id : 'managermen',
													name : 'managermen'
												} ]
											} ]
								} ]
					}

				});