Ext
		.define(
				'HelcOA.view.MyProcess.ShangHai.SHAbnormalQuality',
				{
					extend : 'Ext.Panel',
					id : 'wdlc_SHAbnormalQuality_id',
					requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer',
							'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.Label',
							'Ext.field.TextArea' ],
					config : {
						layout : 'vbox',
						items : [
								{
									xtype : 'toolbar',
									docked : 'top',
									id : 'wdlc_surface_ID',
									title : '上海品质异常处理流程',
									items : [ {
										xtype : 'button',
										id : 'wdlc_returnMyProcess',
										text : '返回',
										ui : 'back'
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
												items : [
														{
															xtype : 'textfield',
															label : '编号',
															id : 'fileno',
															name : 'fileno',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															label : '申请人',
															id : 'agentman',
															name : 'agentman',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															label : '申请日期',
															id : 'createdate',
															name : 'createdate',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															label : '请完成日期',
															id : 'date',
															name : 'date',
															required : true,
															labelWidth : '40%',
															dateFormat : 'Y-m-d',
															listeners : {
																focus : function() {
																	initDate2(
																			'date',
																			'要求完成日期');
																}
															}
														},
														{
															xtype : 'textfield',
															label : '联系电话',
															id : 'phone2',
															name : 'phone2',
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
												title : 'NO.1<br/>备注：A1代表转仓单/生产退料单/送货单号',
												items : [ {
													xtype : 'textfield',
													label : 'A1',
													id : 'zcdno',
													name : 'zcdno',
													labelWidth : '40%',
													required : true
												}, {
													xtype : 'textfield',
													label : '物料编码',
													id : 'wlno',
													name : 'wlno',
													labelWidth : '40%',
													required : true
												}, {
													xtype : 'textfield',
													label : '物料说明',
													id : 'wlremark',
													name : 'wlremark',
													labelWidth : '40%',
													required : true
												}, {
													xtype : 'textfield',
													label : '批次/特征值',
													id : 'txz',
													name : 'txz',
													labelWidth : '40%'
												}, {
													xtype : 'textfield',
													label : '工序号',
													id : 'gxh',
													name : 'gxh',
													labelWidth : '40%'
												}, {
													xtype : 'textfield',
													label : '异常数量',
													id : 'ycsl',
													name : 'ycsl',
													labelWidth : '40%',
													required : true
												}, {
													xtype : 'textfield',
													label : '异常情况',
													id : 'ycqk',
													name : 'ycqk',
													labelWidth : '40%',
													required : true
												} ]
											},
											{
												xtype : 'fieldset',
												title : '',
												items : [ {
													xtype : 'selectfield',
													label : '研发部件',
													id : 'ifyf',
													name : 'ifyf',
													labelWidth : '40%',
													options : [ {
														text : '',
														value : ''
													}, {
														text : '否',
														value : '否'
													}, {
														text : '是',
														value : '是'
													} ]
												}, {
													xtype : 'selectfield',
													label : '物料性质',
													id : 'wlxz',
													name : 'wlxz',
													labelWidth : '40%',
													options : [ {
														text : '',
														value : ''
													}, {
														text : '废料',
														value : '废料'
													}, {
														text : '余料',
														value : '余料'
													} ]
												} ]
											},
											{
												xtype : 'label',
												html : '<center>技术部门意见</center>'
											},
											{
												xtype : 'fieldset',
												title : '设计技术科或研发中心（要求完成时间为4h）<br/>备注：影响主要指该不合格会对电扶梯装配或<br/>运行造成那些影响',
												items : [ {
													xtype : 'textareafield',
													label : '影响',
													id : 'yxqk_textarea',
													name : 'yxqk_textarea',
													labelWidth : '40%',
													required : true
												}, {
													xtype : 'selectfield',
													label : '设计不良',
													id : 'ifsjbl',
													name : 'ifsjbl',
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
													xtype : 'selectfield',
													label : '建议',
													id : 'jy1',
													name : 'jy1',
													labelWidth : '40%',
													required : true,
													options : [ {
														text : '',
														value : ''
													}, {
														text : '报废',
														value : '报废'
													}, {
														text : '返修',
														value : '返修'
													}, {
														text : '让步接收',
														value : '让步接收'
													} ]
												} ]
											},
											{
												xtype : 'fieldset',
												title : '生产技术科（要求完成时间为4h）<br/>备注：返修指该物料能否返修，如何返修',
												items : [ {
													xtype : 'textareafield',
													label : '返修详述',
													id : 'fxqk_textarea',
													name : 'fxqk_textarea',
													labelWidth : '40%',
													required : true
												}, {
													xtype : 'selectfield',
													label : '工艺不良',
													id : 'ifgy',
													name : 'ifgy',
													labelWidth : '40%',
													required : true,
													options : [ {
														text : '',
														value : ''
													}, {
														text : '是',
														value : '是 '
													}, {
														text : '否',
														value : '否'
													} ]
												}, {
													xtype : 'selectfield',
													label : '建议',
													id : 'jy2',
													name : 'jy2',
													labelWidth : '40%',
													required : true,
													options : [ {
														text : '',
														value : ''
													}, {
														text : '报废',
														value : '报废'
													}, {
														text : '返修',
														value : '返修'
													}, {
														text : '让步接收',
														value : '让步接收'
													} ]
												} ]
											}, {
												xtype : 'label',
												html : '<center>品质保证科</center>'
											}, {
												xtype : 'fieldset',
												title : '品质保证科（要求完成时间为4h）',
												items : [ {
													xtype : 'selectfield',
													label : '建议',
													id : 'jy3',
													name : 'jy3',
													labelWidth : '40%',
													required : true,
													options : [ {
														text : '',
														value : ''
													}, {
														text : '报废',
														value : '报废'
													}, {
														text : '返修',
														value : '返修'
													}, {
														text : '让步接收',
														value : '让步接收'
													} ]
												}, {
													xtype : 'textfield',
													label : '责任部门',
													id : 'zrbm',
													name : 'zrbm',
													labelWidth : '40%'
												} ]
											}, {
												xtype : 'fieldset',
												hidden : true,
												items : [ {
													xtype : 'textfield',
													id : 'conds',
													name : 'conds',
													value : 'nocon'
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
													id : 'needzc',
													name : 'needzc'
												}, {
													xtype : 'textfield',
													id : 'idea',
													name : 'idea'
												}, {
													xtype : 'textfield',
													id : 'ygbh',
													name : 'ygbh'
												}, {
													xtype : 'textfield',
													id : 'ext1',
													name : 'ext1'
												}, {
													xtype : 'textfield',
													id : 'taskid',
													name : 'taskid'
												}, {
													xtype : 'textfield',
													id : 'jlflag',
													name : 'jlflag'
												}, {
													xtype : 'textfield',
													id : 'bmflag',
													name : 'bmflag'
												}, {
													xtype : 'textfield',
													id : 'bm',
													name : 'bm'
												}, {
													xtype : 'textfield',
													id : 'tamc',
													name : 'tamc'
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
						        					id : 'dept',
						        					name : 'dept'
						        				}]
											} ]
								} ]
					}

				});