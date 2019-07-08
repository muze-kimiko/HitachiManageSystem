
/* JavaScript content from app/view/MyProcess/ShangHai/SHApplicationForCar.js in folder common */
Ext.define('HelcOA.view.MyProcess.ShangHai.SHApplicationForCar', {
	extend : 'Ext.Panel',
	id : 'wdlc_SHApplicationForCar_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.Select', 'Ext.field.TextArea' ],

	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			id : 'wdlc_surface_ID',
			title : '上海用车申请',
			items : [ {
				xtype : 'button',
				id : 'wdlc_returnMyProcess',
				text : '返回',
				ui : 'back'
			} ]
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
					name : 'fileno',
					id : 'fileno',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '用车部门',
					name : 'dept',
					id : 'dept',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '申请人',
					name : 'agentman',
					id : 'agentman',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '标题',
					name : 'subject',
					id : 'subject',
					labelWidth : '40%'
				}, {
					xtype : 'selectfield',
					label : '用车类型',
					name : 'carflag',
					id : 'carflag',
					labelWidth : '40%',
					options : [ {
						text : '',
						value : ''
					}, {
						text : '上海市内用车',
						value : '上海市内用车'
					}, {
						text : '上海市外用车',
						value : '上海市外用车'
					} ]
				}, {
					xtype : 'textfield',
					label : '联系人',
					name : 'lxr',
					id : 'lxr',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '联系电话',
					name : 'phone',
					id : 'phone',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '用车人数',
					name : 'ycrs',
					id : 'ycrs',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '用车时间*',
				items : [ {
					xtype : 'textfield',
					label : '申请日期',
					name : 'begindate',
					id : 'begindate',
					placeHolder : '请输入申请日期',
					dateFormat : 'Y-m-d',
					listeners : {
						focus : function() {
							initDate2('begindate', '申请日期');
						}
					},
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '时',
					name : 'shour',
					id : 'shour',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '分',
					name : 'sminu',
					id : 'sminu',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '返回时间*',
				items : [ {
					xtype : 'textfield',
					label : '返还日期',
					name : 'enddate',
					id : 'enddate',
					placeHolder : '请输入返还日期',
					dateFormat : 'Y-m-d',
					listeners : {
						focus : function() {
							initDate2('enddate', '返还日期');
						}
					},
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '时',
					name : 'ehour',
					id : 'ehour',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '分',
					name : 'eminu',
					id : 'eminu',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textareafield',
					label : '行程',
					name : 'xingcheng_textarea',
					id : 'xingcheng_textarea',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textareafield',
					label : '用车理由',
					name : 'reason_textarea',
					id : 'reason_textarea',
					labelWidth : '40%',
					required : true
				} ]
			}, 
			{
				xtype : 'fieldset',
				title : '车辆管理部门填写',
				items : [ {
					xtype : 'textfield',
					label : '车号',
					name : 'carno',
					id : 'carno',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '司机',
					name : 'sjname',
					id : 'sjname',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '司机手机',
					name : 'sjphone',
					id : 'sjphone',
					labelWidth : '40%'
				} ]
			}, 
			{
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
					id : 'createdate',
					name : 'createdate'
				} ]
			} ]
		} ]
	}

});