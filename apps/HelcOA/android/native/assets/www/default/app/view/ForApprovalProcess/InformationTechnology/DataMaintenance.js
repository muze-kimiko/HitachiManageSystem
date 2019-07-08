
/* JavaScript content from app/view/ForApprovalProcess/InformationTechnology/DataMaintenance.js in folder common */
/*Sured by QiuXL 20170612*/
Ext.define('HelcOA.view.ForApprovalProcess.InformationTechnology.DataMaintenance', {
	extend : 'Ext.Panel',
	id : 'sp_DataMaintenance_id',
	requires : ['Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.Label', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date'],
	config : {
		layout : 'vbox',
		items : [{
				xtype : 'toolbar',
				docked : 'top',
				id : 'surface_ID',
				title: '数据维护单',
				items : [{
						xtype : 'button',
						id : 'returnHome_ID',
						ui : 'back',
						text : '返回'
					}, {
						xtype : 'spacer'
					}, {
						xtype : 'button',
						id : 'idea_ID',
						text : '下一步'
					}
				]
			}, {
				xtype : 'formpanel',
				id : 'fp',
				flex : 1,
				items : [{
						xtype : 'label',
						html : '重要提示：<br/> 流程处理完成后，申请部门应进行相应数据检查，若有异议请在5个工作日内向IT处理人员提出，否则由此造成的任何后果由申请部门负责。',
						margin : 10
					}, {
						xtype : 'fieldset',
						items : [{
								xtype : 'textfield',
								label : '编号',
								labelWidth : '40%',
								name : 'fileno',
								id : 'fileno',
								placeHolder : '请输入编号',
								readOnly : true
							}
						]
					}, {
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'textfield',
								label : '申请部门',
								labelWidth : '40%',
								name : 'dept',
								id : 'dept',
								readOnly : true
							}, {
								xtype : 'textfield',
								label : '申请人',
								labelWidth : '40%',
								name : 'agentman',
								id : 'agentman',
								readOnly : true
							}, {
								xtype : 'textfield',
								label : '申请时间',
								labelWidth : '40%',
								name : 'createdate',
								id : 'createdate',
								readOnly : true,
								required : true
							}, {
								xtype : 'textfield',
								label : '联系电话',
								labelWidth : '40%',
								required : true,
								placeHolder : '请输入联系电话',
								name : 'phone',
								id : 'phone'
							}
						]
					}, {
						xtype : 'fieldset',
						itemId : 'myfieldset95',
						title : '',
						items : [{
								xtype : 'textfield',
								label : '期望完成日期',
								id : 'finishdate',
								labelWidth : '40%',
							}
						]
					}, {
						xtype : 'fieldset',
						title : '',
						items : [{
								xtype : 'textfield',
								label : '标题',
								labelWidth : '40%',
								name : 'subject',
								id : 'subject',
							}, {
								xtype : 'textfield',
								label : '参照历史单号',
								labelWidth : '40%',
								name : 'lsdh',
								id : 'lsdh'
							}, {
								xtype : 'selectfield',
								label : '信息系统名称',
								labelWidth : '40%',
								id : 'sysname',
								name : 'sysname',
							}, {
								xtype : 'selectfield',
								label : '数据维护类型',
								labelWidth : '40%',
								id : 'usetype',
								name : 'usetype',
							}
						]
					}, {
						xtype : 'fieldset',
						title : '数据维护内容*',
						items : [{
								xtype : 'textfield',
								label : '原因/用途',
								labelWidth : '40%',
								id : 'reason1',
								name : 'reason1',
								required : true,
							}, {
								xtype : 'textfield',
								label : '字段名称',
								labelWidth : '40%',
								id : 'reason2',
								name : 'reason2',
								required : true,
							}, {
								xtype : 'textfield',
								label : '界面名称',
								labelWidth : '40%',
								id : 'reason3',
								name : 'reason3',
								required : true,
							}, {
								xtype : 'textfield',
								label : '逻辑条件',
								labelWidth : '40%',
								id : 'reason4',
								name : 'reason4',
								required : true,
							}
						]
					}, {
						xtype : 'fieldset',
						hidden : true,
						items : [{
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
							}
						]
					}
				]
			}
		]
	}
});
