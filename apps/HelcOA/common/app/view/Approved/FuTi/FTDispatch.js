Ext.define('HelcOA.view.Approved.FuTi.FTDispatch', {
	extend : 'Ext.Panel',
	id : 'ysp_FTDispatch_ID',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		{
			xtype : 'toolbar',
			docked : 'top',
			title : '扶梯发文申请',
			items : [
			{
                xtype: 'button',
                id: 'ysp_returnApproved',
                text: '返回',
                ui: 'back'
            },
			]
		},
		{
			xtype : 'formpanel',
			flex : 1,
			id: 'fp',
			items : [ {
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'textfield',
					id : 'fileno',
					name : 'fileno',
					label : '文件编号',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入编号'
				},
				{
					xtype : 'autoTextArea',
					label : '标题',
					labelWidth : '40%',
					id : 'subject',
					name : 'subject',
					required : true,
					placeHolder : '请输入标题'
				},
				{
					xtype : 'textfield',
					id : 'wirt',
					name : 'wirt',
					label : '文件字',
					labelWidth : '40%',
					placeHolder : '请输入文件字'
				},
				{
					xtype : 'textfield',
					id : 'agentman',
					name : 'agentman',
					label : '起草人',
					readOnly:true,
					labelWidth : '40%',
				},
				{
					xtype: 'textfield',
					id: 'createdate',
					name: 'createdate',
					label : '起草日期',
					readOnly:true,
					labelWidth : '40%',
				},
				{
					xtype : 'textfield',
					label : '拟稿部门',
					id : 'dept',
					name: 'dept',
					readOnly:true,
					labelWidth : '40%',
				},
				{
					xtype : 'textfield',
					label : '密级',
					id : 'miji',
					name: 'miji',
					labelWidth : '40%',
				},
				{
					xtype : 'textfield',
					id : 'sxrq',
					name : 'sxrq',
					label : '生效日期',
					labelWidth : '40%',
					placeHolder : '请输入生效日期',
					dateFormat: 'Y-m-d',
					listeners:{
						focus:function(){
							initDate2('sxrq','生效日期');
						}
					}
				},
				{
					xtype : 'textfield',
					id : 'timelimit',
					name : 'timelimit',
					label : '保存年限',
					readOnly:true,
					labelWidth : '40%',
				},
				{
					xtype : 'autoTextArea',
					id : 'memo_textarea',
					name : 'memo_textarea',
					label : '摘要',
					labelWidth : '40%',
					placeHolder : '请输入摘要'
				},]
			},
			{
				xtype : 'fieldset',
				hidden : true,
				items : [
				{
					xtype : 'textfield',
					id : 'conds',
					name : 'conds',
					value:'nocon'
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
					xtype:'textfield',
					id:'ext1',
					name:'ext1'
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
					xtype: 'textfield',
					id: 'pi_flag',
					name: 'pi_flag'
				}, {
					xtype: 'textfield',
					id: 'cfg_id',
					name: 'cfg_id'
				}, {
					xtype: 'textfield',
					id: 'createflag',
					name: 'createflag'
				}, {
					xtype: 'textfield',
					id: 'needzc',
					name: 'needzc'
				},]
			}]
		}]
	}
});