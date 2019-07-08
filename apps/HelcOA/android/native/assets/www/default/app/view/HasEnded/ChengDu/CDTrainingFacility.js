
/* JavaScript content from app/view/HasEnded/ChengDu/CDTrainingFacility.js in folder common */
Ext.define('HelcOA.view.HasEnded.ChengDu.CDTrainingFacility', {
	extend : 'Ext.Panel',
	id : 'yjs_CDTrainingFacility_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.TextArea' ],

	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			id : 'surface_ID',
			title : '成都培训设施使用流程',
			items : [ {
				xtype : 'button',
				text : '返回',
				ui : 'back',
				id : 'yjs_returnHasEnded'
			}, ]
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
					label : '编号',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					id : 'agentman',
					name : 'agentman',
					label : '申请人',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					id : 'dept',
					name : 'dept',
					label : '申请部门',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					id : 'createdate',
					name : 'createdate',
					label : '申请日期',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					id : 'ygh',
					name : 'ygh',
					label : '员工号',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'selectfield',
					id : 'sendmobile',
					name : 'sendmobile',
					label : '短信通知',
					placeHolder : '请选择短信通知',
					labelWidth : '40%',
					options : [ {
						text : '否',
						value : '否'
					}, {
						text : '是',
						value : '是'
					} ],
					listeners : {
						change : function(select, newValue, oldValue) {
							if (newValue == '是') {
								Ext.getCmp('sendnumber').setDisabled(false);
								Ext.getCmp('sendnumber').focus();
							} else {
								Ext.getCmp('sendnumber').setValue('');
								Ext.getCmp('sendnumber').setDisabled(true);
							}
						}
					}
				}, {
					xtype : 'textnumfield',
					label : '通知号码',
					id : 'sendnumber',
					name : 'sendnumber',
					placeHolder : '请输入短信通知号码',
					labelWidth : '40%',
					disabled : true
				}, {
					xtype : 'textfield',
					id : 'phone',
					name : 'phone',
					label : '联络电话',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					id : 'renshu',
					name : 'renshu',
					label : '培训人数',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					id : 'sdate',
					name : 'sdate',
					label : '开始时间',
					labelWidth : '40%',
					required : true,
					listeners : {
						focus : function() {
							initDate2('sdate', '开始时间');
						}
					}
				}, {
					xtype : 'textfield',
					label : '分起',
					id : 'stime',
					name : 'stime',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					id : 'edate',
					name : 'edate',
					label : '结束时间',
					labelWidth : '40%',
					required : true,
					listeners : {
						focus : function() {
							initDate2('edate', '结束时间');
						}
					}
				}, {
					xtype : 'textfield',
					label : '分止',
					id : 'etime',
					name : 'etime',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'selectfield',
					id : 'keshi',
					name : 'keshi',
					label : '课室、设施',
					labelWidth : '40%',
					options : [ {
						text : '',
						value : ''
					}, {
						text : '普通课室',
						value : '普通课室'
					}, {
						text : '培训设施',
						value : '培训设施'
					}, {
						text : '阶梯课室',
						value : '阶梯课室'
					}, {
						text : '模拟故障学习室',
						value : '模拟故障学习室'
					}, {
						text : '电梯',
						value : '电梯'
					}, {
						text : '扶梯',
						value : '扶梯'
					}, {
						text : '实操井道',
						value : '实操井道'
					}, {
						text : '模拟控制器室',
						value : '模拟控制器室'
					}, {
						text : '计算机学习室',
						value : '计算机学习室'
					}, {
						text : '语音学习室',
						value : '语音学习室'
					} ],
				}, {
					xtype : 'selectfield',
					id : 'yongtu',
					name : 'yongtu',
					label : '使用用途',
					labelWidth : '40%',
					options : [ {
						text : '',
						value : ''
					}, {
						text : '培训',
						value : '培训'
					}, {
						text : '会议',
						value : '会议'
					}, {
						text : '参观',
						value : '参观'
					}, {
						text : '试验',
						value : '试验'
					}, {
						text : '试制',
						value : '试制'
					} ]
				}, {
					xtype : 'textfield',
					id : 'subject',
					name : 'subject',
					label : '标题',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '申请理由及要求*',
				items : [ {
					xtype : 'textareafield',
					id : 'reason_textarea',
					name : 'reason_textarea',
					label : '理由及要求',
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