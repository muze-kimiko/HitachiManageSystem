
/* JavaScript content from app/view/HasEnded/ChengDu/CDInfrastructure.js in folder common */
Ext
		.define(
				'HelcOA.view.HasEnded.ChengDu.CDInfrastructure',
				{
					extend : 'Ext.Panel',
					id : 'yjs_CDInfrastructure_id',
					requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer',
							'Ext.form.Panel', 'Ext.Label', 'Ext.form.FieldSet',
							'Ext.field.TextArea' ],

					config : {
						layout : 'vbox',
						items : [
								{
									xtype : 'toolbar',
									docked : 'top',
									id : 'surface_ID',
									title : '基建报修',
									items : [ {
										xtype : 'button',
										text : '返回',
										ui : 'back',
										id : 'yjs_returnHasEnded'
									}]
								},
								{
									xtype : 'formpanel',
									flex : 1,
									id : 'fp',
									items : [
											{
												xtype : 'label',
												html : '重要提示：<br/> 1、此表只适用于基建维修,编号由处理部门自编.<br/>2、本报告单由处理部门自行存档。',
												margin : 10
											},
											{
												xtype : 'fieldset',
												title : '',
												items : [
														{
															xtype : 'textfield',
															id : 'fileno',
															name : 'fileno',
															label : '编号',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															id : 'dept',
															name : 'dept',
															label : '部门科室',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															id : 'agentman',
															name : 'agentman',
															label : '提出人 ',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															id : 'createdate',
															name : 'createdate',
															label : '申请日期',
															labelWidth : '40%'
														},
														{
															xtype : 'textfield',
															id : 'enddate',
															name : 'enddate',
															label : '完成日期',
															labelWidth : '40%',
															placeHolder : '要求完成日期',
															required : true,
															listeners : {
																focus : function() {
																	initDate2(
																			'enddate',
																			'要求完成日期');
																}
															}
														},
														{
															xtype : 'textfield',
															id : 'subject',
															name : 'subject',
															label : '主题',
															labelWidth : '40%',
															required : true
														} ]
											},
											{
												xtype : 'fieldset',
												title : '建筑物现状描述、处理完成时间等说明*',
												items : [ {
													xtype : 'textareafield',
													id : 'description_textarea',
													name : 'description_textarea',
													label : '说明',
													labelWidth : '40%',
													required : true
												} ]
											}, {
												xtype : 'fieldset',
												hidden : true,
												items : [ {
													xtype : 'textfield',
													id : 'conds',
													name : 'conds',
													value : 'nocon',
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
													id : 'idea',
													name : 'idea'
												}, {
													xtype : 'textfield',
													id : 'endprocessdate',
													name : 'endprocessdate'
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
													id : 'pdano',
													name : 'pdano'
												}, {
													xtype : 'textfield',
													id : 'kzno',
													name : 'kzno'
												}, {
													xtype : 'textfield',
													id : 'kzname',
													name : 'kzname'
												}, {
													xtype : 'textfield',
													id : 'kzno',
													name : 'kzno'
												}, {
													xtype : 'textfield',
													id : 'bzname',
													name : 'bzname'
												}, {
													xtype : 'textfield',
													id : 'bzno',
													name : 'bzno'
												}, {
													xtype : 'textfield',
													id : 'bbzname',
													name : 'bbzname'
												}, {
													xtype : 'textfield',
													id : 'bbzno',
													name : 'bbzno'
												}, {
													xtype : 'textfield',
													id : 'zjlname',
													name : 'zjlname'
												}, {
													xtype : 'textfield',
													id : 'zjlno',
													name : 'zjlno'
												}, {
													xtype : 'textfield',
													id : 'waypath',
													name : 'waypath'
												}, {
													xtype : 'textfield',
													id : 'secflow',
													name : 'secflow'
												}, {
													xtype : 'textfield',
													id : 'thiflow',
													name : 'thiflow'
												}, {
													xtype : 'textfield',
													id : 'forflow',
													name : 'forflow'
												}, {
													xtype : 'textfield',
													id : 'sta',
													name : 'sta'
												}, {
													xtype : 'textfield',
													id : 'gscorp',
													name : 'gscorp'
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
													id : 'ygbh',
													name : 'ygbh'
												}, {
													xtype : 'textfield',
													id : 'ext1',
													name : 'ext1'
												} ]
											} ]
								} ]
					}

				});