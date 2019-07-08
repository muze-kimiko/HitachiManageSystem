
/* JavaScript content from app/view/Approved/TianJin/TJAccessoriesApplication.js in folder common */
Ext.define('HelcOA.view.Approved.TianJin.TJAccessoriesApplication', {
	extend : 'Ext.Panel',
	id : 'ysp_TJAccessoriesApplication_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			title : '天津设备_配件借用申请流程',
			items : [{
				xtype : 'button',
				id : 'ysp_returnApproved',
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
					label : '申请人',
					id : 'agentman',
					name : 'agentman',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '申请时间',
					id : 'createdate',
					name : 'createdate',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '申请部门',
					id : 'dept',
					name : 'dept',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '联系电话',
					id : 'phone',
					name : 'phone',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '设备名称',
					id : 'sbname',
					name : 'sbname',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '标题',
					id : 'subject',
					name : 'subject',
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '时间填写',
				items : [ {
					xtype : 'textfield',
					label : '借用时间',
					id : 'sdate',
					name : 'sdate',
					placeHolder : '请输入借用时间',
					dateFormat : 'Y-m-d',
					listeners : {
						focus : function() {
							initDate2('sdate', '借用时间');
						}
					},
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '预计归还',
					id : 'edate',
					name : 'edate',
					placeHolder : '请输入预计归还时间',
					dateFormat : 'Y-m-d',
					listeners : {
						focus : function() {
							initDate2('edate', '预计归还');
						}
					},
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '实际借用',
					id : 'sdate2',
					name : 'sdate2',
					placeHolder : '请输入实际借用时间',
					dateFormat : 'Y-m-d',
					listeners : {
						focus : function() {
							initDate2('sdate2', '实际借用');
						}
					},
					labelWidth : '40%',
					required : true
				} ]
			}, {
				xtype : 'fieldset',
				title : '借用原因*',
				items : [ {
					xtype : 'textareafield',
					label : '原因',
					id : 'jyyy_textarea',
					name : 'jyyy_textarea',
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
				}, {
					xtype : 'textfield',
					id : 'needzc',
					name : 'needzc'
				}, ]
			} ]
		} ]
	}

});