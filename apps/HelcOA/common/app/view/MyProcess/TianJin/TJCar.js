Ext.define('HelcOA.view.MyProcess.TianJin.TJCar', {
	extend : 'Ext.Panel',
	id : 'wdlc_TJCar_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		{
			xtype : 'toolbar',
			docked : 'top',
			title : '天津用车',
			items : [
			{
				xtype : 'button',
				ui : 'back',
				text : '返回',
				id : 'wdlc_returnMyProcess'
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
					name : 'dep',
					id : 'dep',
					required : true,
					placeHolder : '请输入用车部门'
				},
				{
					xtype : 'textfield',
					label : '用车人数',
					labelWidth : '40%',
					name : 'peonum',
					id : 'peonum',
					required : true,
					placeHolder : '请输入用车人数'
				},
				{
					xtype : 'textfield',
					label : '用车开始日期',
					labelWidth : '40%',
					name : 'ycdate',
					id : 'ycdate',
					required : true,
					placeHolder : '请输入用车开始日期',
					dateFormat: 'Y-m-d',
					listeners:{
						focus:function(){
							initDate2('ycdate','期望完成');
						}
					}
				},
				{
					xtype : 'textfield',
					label : '用车开始时间',
					labelWidth : '40%',
					name : 'sj',
					id : 'sj',
					required : true,
					placeHolder : '请输入用车开始时间'
				},
				{
					xtype : 'textfield',
					label : '用车结束日期',
					labelWidth : '40%',
					name : 'ycdate1',
					id : 'ycdate1',
					required : true,
					placeHolder : '请输入用车结束日期',
					dateFormat: 'Y-m-d',
					listeners:{
						focus:function(){
							initDate2('ycdate1','期望完成');
						}
					}
				},
				{
					xtype : 'textfield',
					label : '用车结束时间',
					labelWidth : '40%',
					name : 'sj1',
					id : 'sj1',
					required : true,
					placeHolder : '请输入用车结束时间'
				},
				{
					xtype : 'autoTextArea',
					label : '用车理由',
					labelWidth : '40%',
					name : 'reasion_textarea',
					id : 'reasion_textarea',
					required : true,
					placeHolder : '请输入用车理由'
				},
				{
					xtype : 'textfield',
					label : '联系人',
					labelWidth : '40%',
					name : 'lxr',
					id : 'lxr',
					placeHolder : '请输入联系人姓名'
				},
				{
					xtype : 'textfield',
					label : '联系人电话',
					labelWidth : '40%',
					name : 'phoneno',
					id : 'phoneno',
					placeHolder : '请输入联系人电话'
				},
				{
					xtype : 'autoTextArea',
					label : '行程',
					labelWidth : '40%',
					name : 'xicheng_textarea',
					id : 'xicheng_textarea',
					required : true,
					placeHolder : '请输入行程'
				},
				{
					xtype : 'autoTextArea',
					label : '车辆安排',
					labelWidth : '40%',
					name : 'carremark_textarea',
					id : 'carremark_textarea',
					placeHolder : '请输入车辆安排'
				},
				{
					xtype : 'autoTextArea',
					label : '备注',
					labelWidth : '40%',
					name : 'remark_textarea',
					id : 'remark_textarea',
					placeHolder : '请输入备注'
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
				},]
			}]
		}]
	}
});