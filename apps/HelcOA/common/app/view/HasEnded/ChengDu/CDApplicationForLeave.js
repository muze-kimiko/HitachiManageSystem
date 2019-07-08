Ext.define('HelcOA.view.HasEnded.ChengDu.CDApplicationForLeave', {
	extend : 'Ext.Panel',
	id : 'yjs_CDApplicationForLeave_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.TextArea' ],

	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			id : 'surface_ID',
			title : '成都请休假流程',
			items : [ {
				xtype : 'button',
				text : '返回',
				ui : 'back',
				id : 'yjs_returnHasEnded'
			}]
		}, {
			xtype : 'formpanel',
			flex : 1,
			id : 'fp',
			items : [ {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textfield',
					id : 'fileno',
					name : 'fileno',
					label : '单号',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					id : 'agentman',
					name : 'agentman',
					label : '填表人',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					id : 'dept',
					name : 'dept',
					label : '部门',
					labelWidth : '40%'
				},
				{
					xtype : 'panel',
					layout : 'hbox',
					items : [
							{
								xtype : 'autoTextArea',
								id : 'qjr',
								width : '85%',
								labelWidth : '48%',
								label : '请假人',
								readOnly : true,
								required : true
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
														'qjr');
									}
								}
							} ]
				},
				{
					xtype : 'textfield',
					id : 'subject',
					name : 'subject',
					label : '标题',
					labelWidth : '40%'
				}, {
					xtype : 'selectfield',
					id : 'xjtype',
					name : 'xjtype',
					label : '休假类型',
					labelWidth : '40%',
					required : true,
					options : [ {
						text : '',
						value : ''
					}, {
						text : '有薪假',
						value : '有薪假'
					}, {
						text : '调休假',
						value : '调休假'
					}, {
						text : '婚假',
						value : '婚假'
					}, {
						text : '护理假',
						value : '护理假'
					}, {
						text : '病假',
						value : '病假'
					}, {
						text : '产假',
						value : '产假'
					}, {
						text : '产检假',
						value : '产检假'
					}, {
						text : '计划生育假',
						value : '计划生育假'
					}, {
						text : '事假',
						value : '事假'
					},
					{
						text : '丧假',
						value : '丧假'
					},
					{
						text : '公务休假',
						value : '公务休假'
					} ]
				}, {
					xtype : 'textfield',
					id : 'phone',
					name : 'phone',
					label : '联系电话',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '请假时间*',
				items : [ {
					xtype : 'textfield',
					id : 'starttime',
					name : 'starttime',
					label : '开始日期',
					labelWidth : '40%',
					required : true,
					listeners : {
						focus : function() {
							initDate2('starttime', '开始日期');
						}
					}
				}, {
					xtype : 'textfield',
					id : 'starthour',
					name : 'starthour',
					label : '时',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					id : 'startminu',
					name : 'startminu',
					label : '分',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					id : 'endtime',
					name : 'endtime',
					label : '结束日期',
					labelWidth : '40%',
					required : true,
					listeners : {
						focus : function() {
							initDate2('endtime', '结束日期');
						}
					}
				}, {
					xtype : 'textfield',
					id : 'endhour',
					name : 'endhour',
					label : '时',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					id : 'endminu',
					name : 'endminu',
					label : '分',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					id : 'ts',
					name : 'ts',
					label : '共计(天)',
					labelWidth : '40%',
					required : true
				}]
			}, {
				xtype : 'fieldset',
				title : '请假事由详细说明*',
				items : [ {
					xtype : 'textareafield',
					id : 'reason_textarea',
					name : 'reason_textarea',
					label : '详细说明',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '当月累计休假',
				items : [ {
					xtype : 'textfield',
					id : 'ljts',
					name : 'ljts',
					label : '累计休假',
					labelWidth : '40%'
				} ]
			}, 
			{
				xtype : 'fieldset',
				title : '考勤员填写实休时间',
				items : [ {
					xtype : 'textfield',
					id : 'stime1',
					name : 'stime1',
					label : '开始日期',
					labelWidth : '40%',
					listeners : {
						focus : function() {
							initDate2('stime1', '开始日期');
						}
					}
				}, {
					xtype : 'textfield',
					id : 'shour1',
					name : 'shour1',
					label : '时',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					id : 'sminu1',
					name : 'sminu1',
					label : '分',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					id : 'etime1',
					name : 'etime1',
					label : '结束日期',
					labelWidth : '40%',
					listeners : {
						focus : function() {
							initDate2('etime1', '结束日期');
						}
					}
				}, {
					xtype : 'textfield',
					id : 'ehour1',
					name : 'ehour1',
					label : '时',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					id : 'eminu1',
					name : 'eminu1',
					label : '分',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					id : 'ts1',
					name : 'ts1',
					label : '共计(天)',
					labelWidth : '40%'
				}]
			},
			{
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
					id : 'createdate',
					name : 'createdate'
				}, {
					xtype : 'textfield',
					id : 'ext1',
					name : 'ext1'
				}]
			} ]
		} ]
	}

});