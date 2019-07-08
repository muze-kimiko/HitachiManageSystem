Ext.define('HelcOA.view.MyProcess.TianJin.TJProposal', {
	extend : 'Ext.Panel',
	id : 'wdlc_TJProposal_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		{
			xtype : 'toolbar',
			docked : 'top',
			title : '天津合理化提案流程',
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
					label : '提案编号',
					readOnly:true,
					labelWidth : '40%',
				},
				{
					xtype : 'textfield',
					id : 'createdate',
					name : 'createdate',
					label : '提案日期',
					readOnly:true,
					labelWidth : '40%',
				},
				{
					xtype : 'textfield',
					id : 'dep',
					name : 'dep',
					label : '提案单位',
					readOnly:true,
					labelWidth : '40%',
				},
				{
					xtype : 'textfield',
					id : 'agentman',
					name : 'agentman',
					label : '提案者(代表)',
					readOnly:true,
					labelWidth : '40%',
				},
				{
					xtype : 'textfield',
					id : 'csz',
					name : 'csz',
					label : '初审者',
					readOnly:true,
					labelWidth : '40%',
				},
				{
					xtype : 'textfield',
					label : '员工编号',
					labelWidth : '40%',
					id : 'peopleno',
					name : 'peopleno',
					required : true,
					placeHolder : '请输入员工编号'
				},
				{
					xtype : 'textfield',
					label : '日期',
					labelWidth : '40%',
					id : 'czrq',
					name : 'czrq',
					readOnly:true,
					placeHolder : '请输入日期',
					dateFormat : 'Y-m-d',
					listeners : {
						focus : function() {
							initDate2('czrq', '日期');
						}
					}
				},
				{
					xtype : 'textfield',
					label : '提案名称',
					labelWidth : '40%',
					required : true,
					name : 'subject',
					id : 'subject',
					placeHolder : '请输入提案名称'
				},
				{
					xtype : 'textfield',
					label : '提案者联系电话',
					labelWidth : '40%',
					required : true,
					name : 'taphone',
					id : 'taphone',
					placeHolder : '请输入提案者联系电话'
				},]
			}, 
			{
					xtype : 'panel',
					layout : 'hbox',
					items : [
					{
						xtype : 'autoTextArea',
						id : 'joinpeople',
						name : 'joinpeople',
						width : '90%',
						labelWidth : '40%',
						label : '合作人员',
					},
					{
						xtype : 'button',
						id : 'seluser28787',
						height : 41,
						style : 'border:0;',
						width : '10%',
						iconCls : 'search',
						text : '选择',
						listeners : {
							tap : function() {
								object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('joinpeople');
							}
						}
					}]
			},
			{
					xtype : 'fieldset',
					title : '现状及改善策略',
					items : [
					{
						xtype : 'autoTextArea',
						id : 'xianzhuang_textarea',
						name : 'xianzhuang_textarea',
						width : '90%',
						labelWidth : '40%',
						label : '现状',
						required : true,
						placeHolder : '请输入现状'
					},{
						xtype : 'autoTextArea',
						id : 'celue_textarea',
						name : 'celue_textarea',
						width : '90%',
						labelWidth : '40%',
						label : '策略',
						required : true,
						placeHolder : '请输入策略'
					},{
						xtype : 'autoTextArea',
						id : 'yugu_textarea',
						name : 'yugu_textarea',
						width : '90%',
						labelWidth : '40%',
						label : '效果预估',
						required : true,
						placeHolder : '请输入效果预估'
					},]
			},
			{
				xtype : 'fieldset',
				title : '审查',
				items : [ 
				{
					xtype : 'selectfield',
					label : '提案归属管理部门意见',
					id : 'yj',
					name : 'yj',
					labelWidth : '40%',
					placeHolder : '请选择提案归属管理部门意见',
					options : [{
						text : '',
						value:''
					},{
						text : '采纳该提案内容',
						value:'采纳该提案内容'
					},{
						text : '采纳部分提案内容',
						value:'采纳部分提案内容'
					},{
						text : '提案不予采纳',
						value:'提案不予采纳'
					}],
				},
				{
					xtype : 'selectfield',
					label : '指定实施部门',
					id : 'ssdep',
					name : 'ssdep',
					labelWidth : '40%',
					placeHolder : '请选择指定实施部门',
				},
				{
					xtype : 'selectfield',
					label : '实施周期',
					id : 'zq',
					name : 'zq',
					labelWidth : '40%',
					placeHolder : '请选择实施周期',
					options : [{
						text : '',
						value:''
					},{
						text : '一周',
						value:'一周'
					},{
						text : '两周',
						value:'两周'
					},{
						text : '四周',
						value:'四周'
					}],
				},
				{
					xtype : 'autoTextArea',
					id : 'reason_textarea',
					name : 'reason_textarea',
					width : '90%',
					labelWidth : '40%',
					label : '一个月内无法完成，请注明原因及实施周期',
				},]
			},
			{
				xtype : 'fieldset',
				title : '得分',
				items : [ 
				{
					xtype : 'textfield',
					id : 'fs1',
					name : 'fs1',
					width : '90%',
					labelWidth : '70%',
					label : '1.重要性，提案对公司今后发展起到的指引、引领作用(30%)',
				},{
					xtype : 'textfield',
					id : 'fs2',
					name : 'fs2',
					width : '90%',
					labelWidth : '70%',
					label : '2.完整性，提案内容的完整程度，可操作程度(20%)',
				},{
					xtype : 'textfield',
					id : 'fs3',
					name : 'fs3',
					width : '90%',
					labelWidth : '70%',
					label : '3.收益，提案对现状的改善程度(15%)',
				},{
					xtype : 'textfield',
					id : 'fs4',
					name : 'fs4',
					width : '90%',
					labelWidth : '70%',
					label : '4.适用范围，提案作用范围程度及对生产过程的影响程度15%)',
				},{
					xtype : 'textfield',
					id : 'fs5',
					name : 'fs5',
					width : '90%',
					labelWidth : '70%',
					label : '5.预见性，提案所针对目标被查知的程度(10%)',
				},{
					xtype : 'textfield',
					id : 'fs6',
					name : 'fs6',
					width : '90%',
					labelWidth : '70%',
					label : '6.支出，提案需投入人力、物力、财力等资源的程度(10%)',
				},{
					xtype : 'textfield',
					id : 'zfs',
					name : 'zfs',
					width : '90%',
					labelWidth : '40%',
					label : '合计得分',
				},{
					xtype : 'textfield',
					id : 'pddj',
					name : 'pddj',
					width : '90%',
					labelWidth : '40%',
					label : '评定等级',
				},
				{
					xtype : 'selectfield',
					label : '是否采纳',
					id : 'result',
					name : 'result',
					labelWidth : '40%',
					placeHolder : '是否采纳',
					options : [{
						text : '',
						value:''
					},{
						text : '采纳',
						value:'采纳'
					},{
						text : '不采纳',
						value:'不采纳'
					}],
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
					id : 'dept',
					name : 'dept'
				}, {
					xtype:'textfield',
					id:'ext1',
					name:'ext1'
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
				},]
			}]
		}]
	}
});