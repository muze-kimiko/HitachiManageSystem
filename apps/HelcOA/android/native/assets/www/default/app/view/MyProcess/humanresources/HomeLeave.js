
/* JavaScript content from app/view/MyProcess/humanresources/HomeLeave.js in folder common */
Ext
		.define(
				'HelcOA.view.MyProcess.humanresources.HomeLeave',
				{
					extend : 'Ext.Panel',
					id : 'wdlc_HomeLeave_id',
					requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer',
							'Ext.form.Panel', 'Ext.form.FieldSet',
							'Ext.field.Text' ],

					config : {
						layout : 'vbox',
						items : [
								{
									xtype : 'toolbar',
									docked : 'top',
									id : 'wdlc_surface_ID',
									title : '探亲假申请流程',
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
												xtype : 'fieldset',
												title : '',
												items : [ {
													xtype : 'textfield',
													label : '档案号',
													id : 'fileno',
													name : 'fileno',
													labelWidth : '40%'
												}, {
													xtype : 'textfield',
													label : '起草人',
													id : 'agentman',
													name : 'agentman',
													labelWidth : '40%'
												}, {
													xtype : 'textfield',
													label : '部门',
													id : 'dept',
													name : 'dept',
													labelWidth : '40%'
												}, {
													xtype : 'textfield',
													label : '起草日期',
													id : 'createdate',
													name : 'createdate',
													labelWidth : '40%'
												} ]
											},
											{
												xtype : 'fieldset',
												title : '请假人信息',
												items : [
														{
															xtype : 'textfield',
															label : '姓名',
															id : 'xm',
															name : 'xm',
															labelWidth : '40%',
															required : true,
															listeners : {
																change : function() {
																	var subject = Ext
																			.getCmp(
																					'agentman')
																			.getValue()
																			+ "探亲假申请";
																	Ext
																			.getCmp(
																					'subject')
																			.setValue(
																					subject);
																}
															}
														},
														{
															xtype : 'textfield',
															label : '住址',
															id : 'address',
															name : 'address',
															labelWidth : '40%',
															required : true
														},
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
															label : '探亲对象',
															id : 'dxxm1',
															name : 'dxxm1',
															labelWidth : '40%',
															required : true
														},
														{
															xtype : 'textfield',
															label : '与本人关系',
															id : 'relation1',
															name : 'relation1',
															labelWidth : '40%',
															required : true
														},
														{
															xtype : 'textfield',
															label : '详细地址',
															id : 'xxdz1',
															name : 'xxdz1',
															labelWidth : '40%',
															required : true
														},
														{
															xtype : 'textfield',
															label : '探亲地点',
															id : 'tqdd',
															name : 'tqdd',
															labelWidth : '40%',
															required : true
														},
														{
															xtype : 'textfield',
															label : '标题',
															id : 'subject',
															name : 'subject',
															labelWidth : '40%',
															required : true
														} ]
											},
											{
												xtype : 'fieldset',
												title : '探亲时间',
												items : [
														{
															xtype : 'textfield',
															label : '开始时间',
															id : 'tqsdate',
															name : 'tqsdate',
															labelWidth : '40%',
															required : true,
															listeners : {
																focus : function() {
																	initDate2(
																			'tqsdate',
																			'开始时间');
																}
															}
														},
														{
															xtype : 'textfield',
															label : '结束时间',
															id : 'tqedate',
															name : 'tqedate',
															labelWidth : '40%',
															required : true,
															listeners : {
																focus : function() {
																	initDate2(
																			'tqedate',
																			'开始时间');
																}
															}
														},
														{
															xtype : 'textfield',
															label : '总共天数',
															id : 'daynumber',
															name : 'daynumber',
															labelWidth : '40%',
															required : true
														},
														{
															xtype : 'textfield',
															label : '居家天数',
															id : 'stayhome',
															name : 'stayhome',
															labelWidth : '40%',
															required : true
														},
														{
															xtype : 'textfield',
															label : '路途天数',
															id : 'ontrain',
															name : 'ontrain',
															labelWidth : '40%',
															required : true
														} ]
											},
											{
												xtype : 'fieldset',
												title : '',
												items : [
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
																		id : 'SelUser136',
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
														} ]
											},
											{
												xtype : 'fieldset',
												title : '本期外派时间(外派人员填写)',
												items : [
														{
															xtype : 'textfield',
															label : '开始时间',
															id : 'wpsdate',
															name : 'wpsdate',
															labelWidth : '40%',
															listeners : {
																focus : function() {
																	initDate2(
																			'wpsdate',
																			'开始时间');
																}
															}
														},
														{
															xtype : 'textfield',
															label : '结束时间',
															id : 'wpedate',
															name : 'wpedate',
															labelWidth : '40%',
															listeners : {
																focus : function() {
																	initDate2(
																			'wpedate',
																			'结束时间');
																}
															}
														} ]
											},
											{
												xtype : 'fieldset',
												title : '探亲假期审核意见',
												items : [
														{
															xtype : 'textfield',
															label : '假期年度起',
															id : 'jqsdate',
															name : 'jqsdate',
															dateFormat : 'Y-m-d',
															labelWidth : '40%',
															listeners : {
																focus : function() {
																	initDate2(
																			'jqsdate',
																			'可享假期年度开始时间');
																}
															}
														},
														{
															xtype : 'textfield',
															label : '假期年度止',
															id : 'jqedate',
															name : 'jqedate',
															dateFormat : 'Y-m-d',
															labelWidth : '40%',
															listeners : {
																focus : function() {
																	initDate2(
																			'jqedate',
																			'可享假期年度结束时间');
																}
															}
														},
														{
															xtype : 'textfield',
															label : '居家(天)',
															id : 'sh_stayhome',
															name : 'sh_stayhome',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															label : '往返路途(天)',
															id : 'sh_ontrain',
															name : 'sh_ontrain',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															label : '扣减有薪(天)',
															id : 'del_yxj',
															name : 'del_yxj',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															label : '可休假天数',
															id : 'sj_yxj',
															name : 'sj_yxj',
															labelWidth : '40%'
														} ]
											},
											{
												xtype : 'fieldset',
												title : '考勤员填写实际休假时间',
												items : [
														{
															xtype : 'textfield',
															label : '开始时间',
															id : 'sjsdate',
															name : 'sjsdate',
															dateFormat : 'Y-m-d',
															labelWidth : '40%',
															listeners : {
																focus : function() {
																	initDate2(
																			'sjsdate',
																			'开始时间');
																}
															}
														},
														{
															xtype : 'textfield',
															label : '结束时间',
															id : 'sjedate',
															name : 'sjedate',
															dateFormat : 'Y-m-d',
															labelWidth : '40%',
															listeners : {
																focus : function() {
																	initDate2(
																			'sjedate',
																			'结束时间');
																}
															}
														} ]
											},
											{
												xtype : 'fieldset',
												title : '薪酬福利科确认报销金额',
												items : [
														{
															xtype : 'textfield',
															label : '报销金额（元）',
															id : 'bxje',
															name : 'bxje',
															placeHolder : '报销路费金额',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															label : '报销日期',
															id : 'bxrq',
															name : 'bxrq',
															dateFormat : 'Y-m-d',
															labelWidth : '40%',
															listeners : {
																focus : function() {
																	initDate2(
																			'bxrq',
																			'路费报销日期');
																}
															}
														} ]
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