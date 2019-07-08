Ext.define('HelcOA.view.MyProcess.humanresources.GraduatesTraining', {
	extend : 'Ext.Panel',
	id : 'wdlc_GraduatesTraining_ID',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.TextArea' ],

	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			id : 'wdlc_surface_ID',
			items : [ {
				xtype : 'button',
				id : 'wdlc_returnMyProcess',
				ui : 'back',
				text : '返回'
			} ]
		}, {
			xtype : 'formpanel',
			id : 'fp',
			flex : 1,
			items : [ {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textfield',
					label : '员工编号',
					id : 'ygh',
					name : 'ygh',
					labelWidth : '40%',
					placeHolder : '请输入员工编号',
					required : true
				}, {
					xtype : 'textfield',
					label : '标题',
					id : 'subject',
					name : 'subject',
					labelWidth : '40%',
					placeHolder : '请输入标题',
					required : true
				}, {
					xtype : 'textfield',
					label : '实习申请部门',
					labelWidth : '40%',
					id : 'sqbm',
					name : 'sqbm',
					placeHolder : '请输入实习申请部门'
				}, {
					xtype : 'textfield',
					label : '实习者姓名',
					id : 'xm',
					name : 'xm',
					labelWidth : '40%',
					placeHolder : '请输入实习者姓名'
				}, {
					xtype : 'textfield',
					label : '将任职岗位',
					id : 'jrzgw',
					name : 'jrzgw',
					labelWidth : '40%',
					placeHolder : '请输入岗位',
					required : true
				}, {
					xtype : 'textfield',
					label : '实习部门名称',
					labelWidth : '40%',
					id : 'sxbmmc',
					name : 'sxbmmc',
					placeHolder : '请输入实习部门名称',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textfield',
					label : '联系电话',
					id : 'phone',
					name : 'phone',
					labelWidth : '40%',
					placeHolder : '请输入联系电话',
					required : true
				}, {
					xtype : 'selectfield',
					label : '短信通知',
					id : 'sendmobile',
					name : 'sendmobile',
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
						change : function(select, newValue, oldValue) {
							if (newValue == '需要') {
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
				} ]
			}, {
				xtype : 'fieldset',
				title : '实习起止时间*',
				items : [ {
					xtype : 'textfield',
					label : '开始',
					id : 'startdate',
					name : 'startdate',
					labelWidth : '40%',
					placeHolder : '请选择开始时间',
					dateFormat : 'Y-m-d',
					required : true,
					listeners : {
						focus : function() {
							initDate2('startdate', '开始时间');
						}
					}
				}, {
					xtype : 'textfield',
					label : '结束',
					id : 'enddate',
					name : 'enddate',
					labelWidth : '40%',
					placeHolder : '请选择结束时间',
					dateFormat : 'Y-m-d',
					required : true,
					listeners : {
						focus : function() {
							initDate2('enddate', '结束时间');
						}
					}
				} ]
			}, {
				xtype : 'fieldset',
				title : '实习要求*',
				items : [ {
					xtype : 'textareafield',
					label : '',
					id : 'sxyq_textarea',
					name : 'sxyq_textarea',
					placeHolder : '请输入实习要求内容'
				} ]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textfield',
					label : '联系人',
					id : 'lxr',
					name : 'lxr',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '联系电话',
					id : 'lxdh1',
					name : 'lxdh1',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '序号1',
				items : [ {
					xtype : 'textfield',
					label : '实习岗位',
					id : 'sxgw1',
					name : 'sxgw1',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '培训内容',
					id : 'pxnr1',
					name : 'pxnr1',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '培训开始',
					id : 'pxsj1',
					name : 'pxsj1',
					labelWidth : '40%',
					dateFormat : 'Y-m-d',
					listeners : {
						focus : function() {
							initDate2('pxsj1', '培训开始');
						}
					}
				}, {
					xtype : 'textfield',
					label : '培训结束',
					id : 'pxsj1e',
					name : 'pxsj1e',
					labelWidth : '40%',
					dateFormat : 'Y-m-d',
					listeners : {
						focus : function() {
							initDate2('pxsj1e', '培训结束');
						}
					}
				}, {
					xtype : 'textfield',
					label : '指导老师',
					id : 'zdls1',
					name : 'zdls1',
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
				}, {
					xtype : 'textfield',
					id : 'dept',
					name : 'dept'
				}, {
					xtype : 'textfield',
					id : 'agentman',
					name : 'agentman'
				} ]
			} ]
		} ]
	}

});