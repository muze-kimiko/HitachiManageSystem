
/* JavaScript content from app/view/oa/startTheProcess/BusinessService/nonstandardWork.js in folder common */
Ext
		.define(
				'HelcPDA.view.oa.startTheProcess.BusinessService.nonstandardWork',
				{
					extend : 'Ext.Panel',
					id : 'qc_nonstandardWork_id',
					requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer',
							'Ext.form.Panel', 'Ext.form.FieldSet',
							'Ext.picker.Date',
							'Ext.field.TextArea' ],
					config : {
						layout : 'vbox',
						items : [
								{
									xtype : 'toolbar',
									docked : 'top',
									id : 'qc_surface_ID',
									title : '非标报告作业处理流程',
									items : [ {
										xtype : 'button',
										ui : 'back',
										text : '返回',
										id : 'qc_returnStartTheProcessName_ID'
									}, {
										xtype : 'spacer'
									}, {
										text : '下一步',
										id : 'qc_ToSelectNode',
										handler : function() {
											Ext.Viewport.removeMenu('right');
										}
									} ]
								},
								{
									xtype : 'formpanel',
									flex : 1,
									id : 'fp',
									items : [
											{
												xtype : 'fieldset',
												title : '',
												instructions : '报告内容提示：（1）与正常做法相抵触的地方；（2）为了反映存在问题的测量数据和现场情况；（3）建议如何解决；（4）为了解决问题需要的数据和情况。',
												items : [ {
													xtype : 'textfield',
													id : 'fileno',
													name : 'fileno',
													label : '编号',
													labelWidth : '40%',
													placeHolder : '请输入编号',
													readOnly : true
												}, {
													xtype : 'textfield',
													id : 'agentman',
													name : 'agentman',
													label : '报告人',
													labelWidth : '40%',
													placeHolder : '请输入报告人',
													readOnly : true
												}, {
													xtype : 'textfield',
													id : 'dept',
													name : 'dept',
													label : '所属部门',
													labelWidth : '40%',
													placeHolder : '请输入所属部门',
													readOnly : true
												}, {
													xtype : 'textfield',
													id : 'createdate',
													name : 'createdate',
													label : '时间',
													labelWidth : '40%',
													placeHolder : '请输入时间',
													required : true
												}, {
													xtype : 'textnumfield',
													label : '联系电话',
													labelWidth : '40%',
													id : 'phone2',
													name : 'phone2',
													required : true,
													placeHolder : '请输入联系电话'
												}, {
													xtype : 'textfield',
													label : '标题',
													labelWidth : '40%',
													id : 'subject',
													name : 'subject',
													required : true,
													placeHolder : '请输入标题'
												} ]
											},
											{
												xtype : 'fieldset',
												title : '',
												items : [ {
													xtype : 'autoTextArea',
													label : '报告内容',
													labelWidth : '40%',
													id : 'report_textarea',
													name : 'report_textarea',
													placeHolder : '请输入报告内容',
													required : true
												} ]
											},
											{
												xtype : 'fieldset',
												title : '',
												items : [
														{
															xtype : 'textfield',
															label : '用户名称',
															labelWidth : '40%',
															id : 'apellation',
															name : 'apellation',
															required : true,
															placeHolder : '请输入用户名称'
														},
														{
															xtype : 'textfield',
															label : '地址',
															labelWidth : '40%',
															id : 'address',
															name : 'address',
															required : true,
															placeHolder : '请输入地址'
														},
														{
															xtype : 'textfield',
															label : '当事人',
															labelWidth : '40%',
															required : true,
															name : 'party',
															id : 'party',
															placeHolder : '请输入当事人'
														},
														{
															xtype : 'textnumfield',
															label : '电话',
															labelWidth : '40%',
															required : true,
															name : 'phone',
															id : 'phone',
															placeHolder : '请输入电话'
														},
														{
															xtype : 'textfield',
															label : '期望处理期',
															labelWidth : '40%',
															name : 'date',
															id : 'date',
															placeHolder : '请输入期望处理期',
															required : true,
															readOnly : true,
															dateFormat : 'Y-m-d',
															listeners : {
																focus : function() {
																	initDate2(
																			'date',
																			'期望处理期');
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
															label : '生产工号',
															id : 'produceno',
															name : 'produceno',
															labelWidth : '40%',
															placeHolder : '请输入生产工号',
															required : true,
														},
														{
															xtype : 'textfield',
															label : '电梯型号',
															id : 'model',
															labelWidth : '40%',
															name : 'model',
															placeHolder : '请输入电梯型号',
															required : true,
														},
														{
															xtype : 'textfield',
															label : '层/站',
															labelWidth : '40%',
															name : 'floor',
															id : 'floor',
															placeHolder : '请输入层/站',
															required : true,
														},
														{
															xtype : 'textfield',
															label : '进场日期',
															id : 'date1',
															labelWidth : '40%',
															name : 'date1',
															placeHolder : '请输入进场日期',
															required : true,
															listeners : {
																focus : function() {
																	initDate2(
																			'date1',
																			'进场日期');
																}
															}
														},
														{
															xtype : 'textfield',
															label : '验收日期',
															id : 'date2',
															labelWidth : '40%',
															name : 'date2',
															placeHolder : '请输入验收日期',
															required : true,
															listeners : {
																focus : function() {
																	initDate2(
																			'date2',
																			'验收日期');
																}
															}
														},
														{
															xtype : 'textfield',
															label : '安装单位',
															id : 'unit',
															labelWidth : '40%',
															name : 'unit',
															placeHolder : '请输入安装单位',
															required : true,
														},
														{
															xtype : 'textfield',
															label : '涉及台数',
															id : 'count',
															labelWidth : '40%',
															name : 'count',
															placeHolder : '请输入涉及台数',
															required : true,
														} ]
											},
											{
												xtype : 'fieldset',
												title : '涉及工号、电梯型号',
												items : [ {
													xtype : 'textfield',
													label : '工号型号',
													id : 'refermodel',
													labelWidth : '40%',
													name : 'refermodel',
													placeHolder : '涉及工号、电梯型号',
													required : true,
												}, {
													xtype : 'selectfield',
													label : '责任判断',
													labelWidth : '40%',
													id : 'duty',
													name : 'duty',
													options : [ {
														text : '制造',
														value : '制造'
													}, {
														text : '设计',
														value : '设计'
													}, {
														text : '安装小组',
														value : '安装小组'
													}, {
														text : '营业',
														value : '营业'
													}, {
														text : '安装部或合同',
														value : '安装部或合同'
													}, {
														text : '调试',
														value : '调试'
													}, {
														text : '监理',
														value : '监理'
													}, {
														text : '甲方',
														value : '甲方'
													}, {
														text : '维保',
														value : '维保'
													}, {
														text : '其它',
														value : '其它'
													} ]
												} ]
											},
											{
												xtype : 'fieldset',
												title : '类别(请正确选择，避免耽误报告处理时间！)',
												instructions : '以上由报告人填写',
												items : [
														{
															xtype : 'selectfield',
															label : '类别',
															labelWidth : '40%',
															id : 'type',
															name : 'type',
															options : [
																	{
																		text : '安装(安装调试期间)',
																		value : '安装'
																	},
																	{
																		text : '维保(三包保养期间)',
																		value : '维保'
																	} ]
														},
														{
															xtype : 'selectfield',
															label : '短信通知',
															// required : true,
															id : 'sendmobile',
															name : 'sendmobile',
															labelWidth : '40%',
															placeHolder : '请选择',
															options : [ {
																text : '否',
																value : '否'

															}, {
																text : '是',
																value : '是'
															} ],
															listeners : {
																change : function(select,newValue,oldValue) {
																	if (newValue == '是') {
																		Ext.getCmp('sendnumber').setDisabled(false);
																		Ext.getCmp('sendnumber').focus();
																	} else {
																		Ext.getCmp('sendnumber').setValue('');
																		Ext.getCmp('sendnumber').setDisabled(true);
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
															required : true,
															disabled : true,
														} ]
											},
											{
												xtype : 'fieldset',
												title : '处理方案或措施',
												instructions : '以上由营分司工程技术架构人员填写',
												items : [
														{
															xtype : 'autoTextArea',
															label : '方案或措施',
															id : 'newmeasure_textarea',
															name : 'newmeasure_textarea',
															labelWidth : '40%',
															placeHolder : '请输入处理方案或措施',
															readOnly : true
														},
														{
															xtype : 'textfield',
															label : '联系电话',
															id : 'phone3',
															name : 'phone3',
															labelWidth : '40%',
															placeHolder : '请输入联系电话',
															readOnly : true
														} ]
											},
//											{
//												xtype : 'fieldset',
//												title : '所属部门领导审核',
//												instructions : '以上由报告人所属部门审核人填写',
//												items : [ {
//													xtype : 'autoTextArea',
//													label : '领导审核',
//													labelWidth : '40%',
//													placeHolder : '请输入部门领导审核',
//													readOnly : true
//												} ]
//											}, 
											{
												xtype : 'selectfield',
												label : '报告分类',
												id : 'assort',
												name : 'assort',
												// required : true,
												labelWidth : '40%',
												readOnly : true,
												options : [ {
													text:'请选择',
													value:''
												},{
													text : 'JC[三包更换]',
													value : 'JC[三包更换]'
												}, {
													text : 'JF[现场方案]',
													value : 'JF[现场方案]'
												}, {
													text : 'JL[物料清单]',
													value : 'JL[物料清单]'
												}, {
													text : 'JM[进口件报告]',
													value : 'JM[进口件报告]'
												}, {
													text : 'JR[维修报告]',
													value : 'JR[维修报告]'
												}, {
													text : 'JS[营业报告]',
													value : 'JS[营业报告]'
												}, {
													text : 'JT[不良问题]',
													value : 'JT[不良问题]'
												}, {
													text : 'JW[写数申请]',
													value : 'JW[写数申请]'
												} ]
											},
											// {
											// xtype : 'fieldset',
											// title : '受理部门意见',
											// items:[{
											// xtype:'autoTextArea',
											// label : '意见',
											// labelWidth : '40%',
											// placeHolder : '请输入受理部门意见',
											// readOnly:true
											// }]
											// },
											// {
											// xtype : 'fieldset',
											// title : '最终处理部门意见',
											// items:[{
											// xtype:'autoTextArea',
											// label : '意见',
											// labelWidth : '40%',
											// placeHolder : '请输入最终处理部门意见',
											// readOnly:true
											// }]
											// },
											{
												// xtype : 'fieldset',
												// title : '',
												// items:[{
												// xtype:'textfield',
												// label : '完工确认',
												// labelWidth : '40%',
												// placeHolder : '请输入完工确认',
												// readOnly:true
												// },{
												xtype : 'textfield',
												id : 'sendreader',
												name : 'sendreader',
												label : '文件抄送',
												labelWidth : '40%',
												placeHolder : '请输入文件抄送'
											// }]
											},
											// {
											// xtype : 'fieldset',
											// instructions : '',
											// title : '',
											// items : [ {
											// xtype : 'container',
											// layout : {
											// type : 'hbox',
											// align : 'start',
											// pack : 'center'
											// },
											// items : [ {
											// xtype : 'button',
											// margin : 10,
											// width : 120,
											// text : '拍照'
											// }, {
											// xtype : 'button',
											// margin : 10,
											// width : 120,
											// text : '浏览'
											// } ]
											// }]
											// },
											{
												xtype : 'fieldset',
												hidden : true,
												items : [ {
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
													id : 'createbypda',
													name : 'createbypda',
													value : 0
												}, {
													xtype : 'textfield',
													id : 'nextprocessuser',
													name : 'nextprocessuser'
												}, {
													xtype : 'textfield',
													id : 'Fnextprocess',
													name : 'Fnextprocess'
												},

												// {
												// xtype : 'textfield',
												// id : 'createdate',
												// name : 'createdate'
												// },
												{
													xtype : 'textfield',
													id : 'ext1',
													name : 'ext1'
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
													id : 'createflag',
													name : 'createflag'
												} ]
											} ]
								} ]
					}
				});