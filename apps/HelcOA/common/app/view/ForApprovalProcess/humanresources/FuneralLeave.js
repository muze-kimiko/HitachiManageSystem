Ext
		.define(
				'HelcOA.view.ForApprovalProcess.humanresources.FuneralLeave',
				{
					extend : 'Ext.Panel',
					id : 'sp_FuneralLeave_id',
					requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer',
							'Ext.form.Panel', 'Ext.form.FieldSet',
							'Ext.field.DatePicker', 'Ext.picker.Date',
							'Ext.field.TextArea' ],

					config : {
						layout : 'vbox',
						items : [
								{
									xtype : 'toolbar',
									docked : 'top',
									id : 'surface_ID',
									title : '丧假申请流程（派驻人员专用）',
									items : [ {
										xtype : 'button',
										ui : 'back',
										text : '返回',
										id : 'returnHome_ID'
									}, {
										xtype : 'spacer'
									}, {
										xtype : 'button',
										text : '下一步',
										id : 'idea_ID'
									} ]
								},
								{
									xtype : 'formpanel',
									id : 'fp',
									flex : 1,
									items : [
											{
												xtype : 'fieldset',
												title : '',
												items : [
														{
															xtype : 'textfield',
															label : '填单人',
															id : 'agentman',
															name : 'agentman',
															labelWidth : '40%',
															readOnly : true
														},
														{
															xtype : 'textfield',
															label : '部门',
															id : 'dept',
															name : 'dept',
															labelWidth : '40%',
															readOnly : true
														},
														{
															xtype : 'textfield',
															label : '请假人',
															id : 'qjr',
															labelWidth : '40%',
															required : true,
															placeHolder : '请输入八位工号',
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
															xtype : 'textfield',
															label : '标题',
															id : 'subject',
															name : 'subject',
															labelWidth : '40%',
															readOnly : true
														},
														{
															xtype : 'panel',
															layout : 'hbox',
															items : [ {
																xtype : 'autoTextArea',
																id : 'level1',
																width : '100%',
																labelWidth : '40%',
																label : '部门领导',
																readOnly : true
															} ]
														},
														{
															xtype : 'panel',
															layout : 'hbox',
															items : [ {
																xtype : 'autoTextArea',
																id : 'kqy',
																width : '100%',
																labelWidth : '40%',
																label : '考勤员',
																readOnly : true
															} ]
														} ]
											},
											{
												xtype : 'fieldset',
												itemId : 'myfieldset96',
												title : '',
												items : [
														{
															xtype : 'textfield',
															label : '联系电话',
															id : 'phone',
															labelWidth : '40%',
															readonly : true
														},
														{
															xtype : 'selectfield',
															label : '短信通知',
															id : 'sendmobile',
															labelWidth : '40%',
															readonly : true,
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
															labelWidth : '40%',
															disabled : true
														} ]
											},
											{
												xtype : 'fieldset',
												itemId : 'myfieldset97',
												title : '请假时间',
												items : [ {
													xtype : 'textfield',
													label : '开始',
													id : 'startdate',
													labelWidth : '40%',
													readOnly : true
												}, {
													xtype : 'textfield',
													label : '结束',
													id : 'enedate',
													labelWidth : '40%',
													readOnly : true
												} ]
											},
											{
												xtype : 'fieldset',
												itemId : 'myfieldset98',
												title : '员工必须在请假事由上说明与员工的关系。',
												items : [ {
													xtype : 'textareafield',
													label : '请假事由',
													id : 'reason_textarea',
													labelWidth : '40%',
													readOnly : true
												} ]
											},
											{
												xtype : 'fieldset',
												itemId : 'myfieldset99',
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