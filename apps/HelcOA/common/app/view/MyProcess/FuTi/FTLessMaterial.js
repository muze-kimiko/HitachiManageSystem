Ext.define('HelcOA.view.MyProcess.FuTi.FTLessMaterial', {
	extend : 'Ext.Panel',
	id : 'wdlc_FTLessMaterial_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			title : '扶梯欠料发货电子流程',
			items : [ {
				xtype : 'button',
				id : 'wdlc_returnMyProcess',
				text : '返回',
				ui : 'back'
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
					label : '编号',
					id : 'fileno',
					name : 'fileno',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '标题',
					id : 'subject',
					name : 'subject',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '通知部门',
					id : 'tzbm',
					name : 'tzbm',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '报告人',
					id : 'agentman',
					name : 'agentman',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '所属部门',
					id : 'dept',
					name : 'dept',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '时间',
					id : 'createdate',
					name : 'createdate',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '联系电话',
					id : 'phone',
					name : 'phone',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '欠料发货原因*',
				items : [ {
					xtype : 'textareafield',
					label : '原因',
					id : 'reason_textarea',
					name : 'reason_textarea',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '欠料发货电梯资料：NO.1',
				items : [ {
					xtype : 'textfield',
					label : '工号',
					id : 'gh1',
					name : 'gh1',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '涉及台数',
					id : 'ts1',
					name : 'ts1',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '合同号',
					id : 'hth1',
					name : 'hth1',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '电梯型号',
					id : 'liftmodel1',
					name : 'liftmodel1',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '订货单位',
					id : 'orderunit1',
					name : 'orderunit1',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '预产出日期',
					id : 'plandate1',
					name : 'plandate1',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '欠料情况：NO.1',
				items : [ {
					xtype : 'textfield',
					label : '欠料名称',
					id : 'qlmc1',
					name : 'qlmc1',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '图号',
					id : 'th1',
					name : 'th1',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '作业',
					id : 'zy1',
					name : 'zy1',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '型号',
					id : 'model1',
					name : 'model1',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '数量',
					id : 'count1',
					name : 'count1',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '单位',
					id : 'unit1',
					name : 'unit1',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '预到货日期',
					id : 'date1',
					name : 'date1',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '备注',
					id : 'remark1',
					name : 'remark1',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '材料到货情况（生产统括科采购业务组填写）',
				items : [ {
					xtype : 'textfield',
					label : '到货时间',
					id : 'time1',
					name : 'time1',
					labelWidth : '40%',
					dateFormat : 'Y-m-d',
					listeners : {
						focus : function() {
							initDate2('time1', '到货时间');
						}
					}
				}, {
					xtype : 'textfield',
					label : '接收人',
					id : 'jsr',
					name : 'jsr',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '到货地点',
					id : 'address',
					name : 'address',
					labelWidth : '40%',
					placeHolder : '收货人/单位'
				} ]
			}, {
				xtype : 'fieldset',
				title : '补料情况（财务科物流管理组填写）',
				items : [ {
					xtype : 'textfield',
					label : '补发时间',
					id : 'time2',
					name : 'time2',
					labelWidth : '40%',
					dateFormat : 'Y-m-d',
					listeners : {
						focus : function() {
							initDate2('time2', '补发时间');
						}
					}
				}, {
					xtype : 'textfield',
					label : '收货人',
					id : 'shr',
					name : 'shr',
					labelWidth : '40%',
					placeHolder : '收货人/单位'
				}, {
					xtype : 'textfield',
					label : '发货编号',
					id : 'fhbh',
					name : 'fhbh',
					labelWidth : '40%',
					placeHolder : '（速递时填写）'
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
					id : 'needzc',
					name : 'needzc'
				} ]
			} ]
		} ]
	}

});