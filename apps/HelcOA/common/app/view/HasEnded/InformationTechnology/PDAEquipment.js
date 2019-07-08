Ext.define('HelcOA.view.HasEnded.InformationTechnology.PDAEquipment', {
	extend : 'Ext.Panel',
	id : 'yjs_PDAEquipment_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		{
			xtype : 'toolbar',
			docked : 'top',
			id: 'qc_surface_ID',
			title : 'PDA设备新增或维修故障申请表',
			items : [
			{
				xtype: 'button',
				id: 'ysp_returnApproved',
				text: '返回',
				ui: 'back'
            }, {
				xtype : 'spacer'
			},{
				text : '下一步',
				id : 'qc_ToSelectNode',
				handler : function() {
					Ext.Viewport.removeMenu('right');
				}
			} 
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
					xtype : 'textfield',
					id : 'subject',
					name : 'subject',
					label : '标题',
					required : true,
					labelWidth : '40%',
					placeHolder : '请输入标题'
				},
				{
					xtype : 'textfield',
					label : '申请人',
					labelWidth : '40%',
					id : 'agentman',
					name : 'agentman',
					readOnly:true,
					placeHolder : '请输入申请人'
				},
				{
					xtype : 'textfield',
					label : '申请时间',
					labelWidth : '40%',
					id : 'createdate',
					name : 'createdate',
					readOnly:true,
					placeHolder : '请输入申请时间'
				},
				{
					xtype : 'textfield',
					label : '申请部门',
					labelWidth : '40%',
					readOnly:true,
					name : 'dept',
					id : 'dept',
					placeHolder : '请输入申请部门'
				},
				{
					xtype : 'textfield',
					label : '申请人所属司',
					labelWidth : '40%',
					readOnly:true,
					name : 'shortname',
					id : 'shortname',
					placeHolder : '请输入申请人所属司'
				},
				{
					xtype : 'textfield',
					label : '联络电话',
					labelWidth : '40%',
					required : true,
					name : 'phone',
					id : 'phone',
					placeHolder : '请输入手机号'
				}, 
				]
			}, 
			{
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype:'textfield',
					label:'使用人编号',
					labelWidth : '40%',
					id:'ygh',
					name:'ygh',
					required : true,
					placeHolder:'请输入使用人编号',

				},{
					xtype:'textfield',
					label:'使用人姓名',
					labelWidth : '40%',
					id:'query_xm',
					name:'query_xm',
					readOnly:true,
					placeHolder:'请输入使用人姓名',

				},{
					xtype:'textfield',
					label:'要求完成日期',
					labelWidth : '40%',
					id:'yqwcsj',
					name:'yqwcsj',
					placeHolder:'请输入要求完成日期',

				},{
					xtype:'textfield',
					label:'机器所在位置',
					labelWidth : '40%',
					id:'weizhi',
					name:'weizhi',
					required : true,
					placeHolder:'请输入机器所在位置',

				},{
					xtype : 'selectfield',
					label : '流程类型',
					id : 'lctype',
					name : 'lctype',
					required : true,
					labelWidth : '40%',
					placeHolder : '请选择申请类型',
					options : [{
						text : '新增',
						value:'新增'
							
					}, {
						text : '变更',
						value:'变更'
					}, {
						text : '维修',
						value:'维修'
					}],
				},{
					xtype:'autoTextArea',
					label:'需求、用途描述',
					labelWidth : '40%',
					id:'wtms_textarea',
					name:'wtms_textarea',
					required : true,
					placeHolder:'请输入申请权限简述',

				},
				]
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
				},{
					xtype:'textfield',
					id:'ext1',
					name:'ext1'
				},{
					xtype : 'textfield',
					id : 'managermen',
					name : 'managermen'
				} ,{
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
				},]
			}]
		
		}]
	}
});