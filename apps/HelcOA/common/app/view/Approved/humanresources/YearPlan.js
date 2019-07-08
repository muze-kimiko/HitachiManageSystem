Ext.define('HelcOA.view.Approved.humanresources.YearPlan', {
	extend : 'Ext.Panel',
	id : 'ysp_YearPlan_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.Select', 'Ext.field.TextArea' ],

	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			id : 'surface_ID',
			title : '年度计划外培训需求申请流程',
			items : [ {
				xtype : 'button',
				ui : 'back',
				text : '返回',
				id : 'ysp_returnApproved'
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
					label : '编号',
					id : 'fileno',
					name : 'fileno',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '申请人',
					id : 'agentman',
					name : 'agentman',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '申请部门',
					id : 'dept',
					name : 'dept',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '申请日期',
					id : 'createdate',
					name : 'createdate',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '培训人数',
					id : 'renshu',
					name : 'renshu',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '申请时间段',
				items : [ {
					xtype : 'textfield',
					label : '开始日期',
					id : 'sdate',
					name : 'sdate',
					labelWidth : '40%',
					required : true,
					listeners : {
						focus : function() {
							initDate2('sdate', '开始日期');
						}
					}
				}, {
					xtype : 'textfield',
					label : '开始时间',
					id : 'stime',
					name : 'stime',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '结束日期',
					id : 'edate',
					name : 'edate',
					labelWidth : '40%',
					required : true,
					listeners : {
						focus : function() {
							initDate2('edate', '结束日期');
						}
					}
				}, {
					xtype : 'textfield',
					label : '结束时间',
					id : 'etime',
					name : 'etime',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textfield',
					label : '课程名称',
					id : 'subject',
					name : 'subject',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'selectfield',
					label : '培训类型',
					id : 'pxlx',
					name : 'pxlx',
					labelWidth : '40%',
					required : true,
					options : [ {
						text : '',
						value : ''
					}, {
						text : '普通培训',
						value : '普通培训'
					}, {
						text : '工程培训',
						value : '工程培训'
					} ]
				}, {
					xtype : 'textfield',
					value : '0',
					label : '费用（元）',
					id : 'feiyong',
					name : 'feiyong',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '联系电话',
					id : 'phone',
					name : 'phone',
					labelWidth : '40%',
					required : true
				}, {
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
				title : '',
				items : [ {
					xtype : 'selectfield',
					label : '培训地点',
					id : 'didian',
					name : 'didian',
					labelWidth : '40%',
					required : true,
					options : [ {
						text : '',
						value : ''
					}, {
						text : '公司内',
						value : '公司内'
					}, {
						text : '公司外',
						value : '公司外'
					} ],
					listeners : {
						change : function(select, newValue, oldValue) {
							if (newValue == '公司内') {
								Ext.getCmp('feiyong').setValue('0');
								Ext.getCmp('jutididian').setValue('');
								Ext.getCmp('lxr').setValue('');
								Ext.getCmp('lxrdh').setValue('');
								Ext.getCmp('feiyong').setDisabled(true);
								Ext.getCmp('jutididian').setDisabled(true);
								Ext.getCmp('lxr').setDisabled(true);
								Ext.getCmp('lxrdh').setDisabled(true);
							} else {
								Ext.getCmp('feiyong').setDisabled(false);
								Ext.getCmp('jutididian').setDisabled(false);
								Ext.getCmp('lxr').setDisabled(false);
								Ext.getCmp('lxrdh').setDisabled(false);
							}
						}
					}
				}, {
					xtype : 'textfield',
					label : '机构名称',
					id : 'pxjgmc',
					name : 'pxjgmc',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '公司外培训请注明',
				items : [ {
					xtype : 'textfield',
					label : '具体地点',
					id : 'jutididian',
					name : 'jutididian',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '联系人 ',
					id : 'lxr',
					name : 'lxr',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '电话',
					id : 'lxrdh',
					name : 'lxrdh',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '培训内容*',
				items : [ {
					xtype : 'textareafield',
					label : '内容',
					id : 'pxnr_textarea',
					name : 'pxnr_textarea',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '申请理由及要求*',
				items : [ {
					xtype : 'textareafield',
					label : '理由及要求',
					id : 'sqliyou_textarea',
					name : 'sqliyou_textarea',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '是否需要与同事进行可行性分析',
				items : [ {
					xtype : 'selectfield',
					label : '可行性分析',
					id : 'fx_yn',
					name : 'fx_yn',
					labelWidth : '40%',
					options : [ {
						text : '',
						value : ''
					}, {
						text : '不需要',
						value : '不需要'
					}, {
						text : '需要',
						value : '需要'
					} ]
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