Ext.define('HelcOA.view.HasEnded.ChengDu.CDcar', {
	extend : 'Ext.Panel',
	id : 'yjs_CDCar_ID',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		{
			xtype : 'toolbar',
			docked : 'top',
			title : '成都公务用车',
			items : [
			{
                xtype: 'button',
                id: 'yjs_returnHasEnded',
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
					label : '编号',
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
					label : '用车部门',
					labelWidth : '40%',
					name : 'dept',
					id : 'dept',
					required : true,
					placeHolder : '请输入用车部门'
				},
				{
					xtype : 'textfield',
					label : '用车时间',
					labelWidth : '40%',
					name : 'begindate',
					id : 'begindate',
					required : true,
					placeHolder : '请输入用车时间',
					dateFormat: 'Y-m-d',
					listeners:{
						focus:function(){
							initDate2('begindate','期望完成');
						}
					}
				},
				{
					xtype : 'textfield',
					label : '时（起）',
					labelWidth : '40%',
					name : 'shour',
					id : 'shour',
					required : true,
					placeHolder : '请输入时（起）'
				},
				{
					xtype : 'textfield',
					label : '分（起）',
					labelWidth : '40%',
					name : 'sminu',
					id : 'sminu',
					required : true,
					placeHolder : '请输入分（起）'
				},
				{
					xtype : 'textfield',
					label : '返回时间',
					labelWidth : '40%',
					name : 'enddate',
					id : 'enddate',
					required : true,
					placeHolder : '请输入返回时间',
					dateFormat: 'Y-m-d',
					listeners:{
						focus:function(){
							initDate2('enddate','期望完成');
						}
					}
				},
				{
					xtype : 'textfield',
					label : '时（止）',
					labelWidth : '40%',
					name : 'ehour',
					id : 'ehour',
					required : true,
					placeHolder : '请输入时（止）'
				},
				{
					xtype : 'textfield',
					label : '分（止）',
					labelWidth : '40%',
					name : 'eminu',
					id : 'eminu',
					required : true,
					placeHolder : '请输入分（止）'
				},
				{
					xtype : 'textfield',
					label : '联系人',
					labelWidth : '40%',
					name : 'lxr',
					id : 'lxr',
					required : true,
					placeHolder : '请输入联系人'
				},
				{
					xtype : 'textfield',
					label : '联系电话',
					labelWidth : '40%',
					name : 'phone',
					id : 'phone',
					placeHolder : '请输入联系电话',
				},
				{
					xtype : 'textfield',
					label : '用车人数',
					labelWidth : '40%',
					name : 'ycrs',
					id : 'ycrs',
					required : true,
					placeHolder : '请输入用车人数'
				},
				{
					xtype : 'autoTextArea',
					label : '行程',
					labelWidth : '40%',
					name : 'xingcheng_textarea',
					id : 'xingcheng_textarea',
					required : true,
					placeHolder : '请输入行程'
				},
				{
					xtype : 'autoTextArea',
					label : '用车理由',
					labelWidth : '40%',
					name : 'reason_textarea',
					id : 'reason_textarea',
					required : true,
					placeHolder : '请输入用车理由'
				},
				{
					xtype : 'autoTextArea',
					label : '车号',
					labelWidth : '40%',
					name : 'carno',
					id : 'carno',
					placeHolder : '请输入车号'
				},
				{
					xtype : 'autoTextArea',
					label : '司机',
					labelWidth : '40%',
					name : 'sjname',
					id : 'sjname',
					placeHolder : '请输入司机姓名'
				},
				{
					xtype : 'autoTextArea',
					label : '司机手机',
					labelWidth : '40%',
					name : 'sjphone',
					id : 'sjphone',
					placeHolder : '请输入司机手机'
				},
			]},
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
					id : 'agentman',
					name : 'agentman'
				},{
					xtype : 'textfield',
					id : 'dept',
					name : 'dept'
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
					id : 'createdate',
					name : 'createdate'
				},{
					xtype:'textfield',
					id:'ext1',
					name:'ext1'
				},{
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
				},
				{
					xtype: 'textfield',
					id: 'firflow',
					name: 'firflow'
				},{
					xtype: 'textfield',
					id: 'pi_flag',
					name: 'pi_flag'
				},
				{
					xtype: 'textfield',
					id: 'cfg_id',
					name: 'cfg_id'
				},
				{
					xtype: 'textfield',
					id: 'createflag',
					name: 'createflag'
				},
				{
                    xtype: 'textfield',
                    id: 'agentpeofdep',
                    name: 'tiaojian01',
                },]
			}]
		}]
	}
});