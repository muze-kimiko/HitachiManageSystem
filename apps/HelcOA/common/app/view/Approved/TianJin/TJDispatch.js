Ext.define('HelcOA.view.Approved.TianJin.TJDispatch', {
	extend : 'Ext.Panel',
	id : 'ysp_TJDispatch_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		{
			xtype : 'toolbar',
			docked : 'top',
			title : '天津发文申请',
			items : [
			{
				xtype: 'button',
				id: 'ysp_returnApproved',
				text: '返回',
				ui: 'back'
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
					xtype : 'selectfield',
					label : '流程类型',
					id : 'fwtype',
					name: 'fwtype',
					labelWidth : '40%',
					placeHolder : '请选择短信通知',
					options : [ {
						text : '公司发文',
						value : '公司发文'
					}, {
						text : '规章制度',
						value : '规章制度'
					} ],
				},
				{
					xtype : 'selectfield',
					label : '是否需要会签',
					id : 'ghflag',
					name: 'ghflag',
					labelWidth : '40%',
					options : [ {
						text : '否',
						value : '否'
					}, {
						text : '是',
						value : '是'
					}],
				},
				{
					xtype : 'textfield',
					id : 'writ',
					name : 'writ',
					label : '文件字',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入文件字'
				},
				{
					xtype : 'textfield',
					id : 'wdbh',
					name : 'wdbh',
					label : '文件编号',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入文件编号'
				},
				{
					xtype : 'selectfield',
					label : '拟稿部门',
					id : 'ngbm',
					name: 'ngbm',
					labelWidth : '40%',
					placeHolder : '请选择短信通知',
					options : [ {
						text : '',
						value : ''
					},{
						text : '财务科',
						value : '财务科'
					},{
						text : '物流管理科',
						value : '物流管理科'
					},{
						text : '品质保证科',
						value : '品质保证科'
					},{
						text : '人力资源科',
						value : '人力资源科'
					},{
						text : '制造统括部办',
						value : '制造统括部办'
					},{
						text : '生产管理科',
						value : '生产管理科'
					},{
						text : '生产技术科',
						value : '生产技术科'
					},{
						text : '信息管理科',
						value : '信息管理科'
					},{
						text : '钣金制作科',
						value : '钣金制作科'
					},{
						text : '电气制作科',
						value : '电气制作科'
					},{
						text : '资材科',
						value : '资材科'
					},{
						text : '管理部',
						value : '管理部'
					},{
						text : '总经办',
						value : '总经办'
					},{
						text : '价格管理科',
						value : '价格管理科'
					},{
						text : '产品设计科',
						value : '产品设计科'
					},{
						text : '华北配件中心',
						value : '华北配件中心'
					}],
				},
				{
					xtype : 'selectfield',
					label : '密级',
					id : 'miji',
					name: 'miji',
					labelWidth : '40%',
					options : [ {
						text : '无',
						value : '无'
					},{
						text : '内部资料',
						value : '内部资料'
					},{
						text : 'A',
						value : 'A'
					},{
						text : 'AA',
						value : 'AA'
					},{
						text : 'AAA',
						value : 'AAA'
					}],
				},
				{
					xtype : 'textfield',
					id : 'showss',
					name : 'showss',
					label : '生效日期',
					labelWidth : '40%',
					placeHolder : '请输入生效日期',
					dateFormat: 'Y-m-d',
					listeners:{
						focus:function(){
							initDate2('showss','生效日期');
						}
					}
				},
				{
					xtype : 'textfield',
					id : 'bcnx',
					name : 'bcnx',
					label : '保存年限',
					readOnly:true,
					labelWidth : '40%',
					value : '10年'
				},
				{
					xtype : 'textfield',
					id : 'fwfj',
					name : 'fwfj',
					label : '发文附件',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入保存年限'
				},
				{
					xtype : 'textfield',
					id : 'fs',
					name : 'fs',
					label : '份数',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入份数'
				},
				{
					xtype : 'textfield',
					id : 'agentman',
					name : 'agentman',
					label : '编制人',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入编制人'
				},
				{
					xtype : 'textfield',
					id : 'bzsj',
					name : 'bzsj',
					label : '签署日期',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入签署日期',
					dateFormat: 'Y-m-d',
					listeners:{
						focus:function(){
							initDate2('bzsj','生效日期');
						}
					}
				},
				{
					xtype : 'autoTextArea',
					id : 'zhaiyao_textarea',
					name : 'zhaiyao_textarea',
					label : '摘要',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入摘要'
				},
				{
					xtype : 'textfield',
					id : 'sendreader',
					name : 'sendreader',
					label : '阅读人员',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入阅读人员'
				},
				]
			},
			{
				xtype: 'fieldset',
				items: [
				{
					xtype : 'panel',
					layout : 'hbox',
					items : [
					{
						xtype : 'autoTextArea',
						id : 'zs',
						name : 'zs',
						width : '90%',
						labelWidth : '48%',
						label : '主送',
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
								object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('zs');
							}
						}
					}
					]
				},
				{
					xtype : 'panel',
					layout : 'hbox',
					items : [
					{
						xtype : 'autoTextArea',
						id : 'cs',
						name : 'cs',
						width : '90%',
						labelWidth : '48%',
						label : '抄送',
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
								object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('cs');
							}
						}
					}
					]
				},
				{
					xtype : 'panel',
					layout : 'hbox',
					items : [
					{
						xtype : 'autoTextArea',
						id : 'cb',
						name : 'cb',
						width : '90%',
						labelWidth : '48%',
						label : '抄报',
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
								object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('cb');
							}
						}
					}
					]
				},
				{
					xtype : 'panel',
					layout : 'hbox',
					items : [
					{
						xtype : 'autoTextArea',
						id : 'hqpeo',
						name : 'hqpeo',
						width : '90%',
						labelWidth : '48%',
						label : '会签人员',
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
								object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('hqpeo');
							}
						}
					}
					]
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
				}, {
					xtype: 'textfield',
					id: 'dept',
					name: 'dept'
				}, {
					xtype: 'textfield',
					id: 'pbsj',
					name: 'pbsj'
				}, {
					xtype: 'textfield',
					id: 'zcbzr',
					name: 'zcbzr'
				}, {
					xtype: 'textfield',
					id: 'zcbsj',
					name: 'zcbsj'
				}, {
					xtype: 'textfield',
					id: 'dep',
					name: 'dep'
				}, {
					xtype: 'textfield',
					id: 'iszcb',
					name: 'iszcb'
				}, {
					xtype: 'textfield',
					id: 'arcpathid',
					name: 'arcpathid'
				}, {
					xtype: 'textfield',
					id: 'catalogid',
					name: 'catalogid'
				}, {
					xtype: 'textfield',
					id: 'pigeonhole',
					value: 'tjDocumentManage.nsf',
					name: 'pigeonhole'
				}, {
					xtype: 'textfield',
					id: 'cabinet',
					value: 'tjgsfw.nsf',
					name: 'cabinet'
				}, {
					xtype: 'textfield',
					id: 'noselect',
					name: 'noselect'
				}, {
					xtype: 'textfield',
					id: 'inherit',
					name: 'inherit'
				}, {
					xtype: 'textfield',
					id: 'managerman_1',
					name: 'managerman_1'
				}, {
					xtype: 'textfield',
					id: 'editman_1',
					name: 'editman_1'
				}, {
					xtype: 'textfield',
					id: 'printer_1',
					name: 'printer_1'
				}, {
					xtype: 'textfield',
					id: 'readman_1',
					name: 'readman_1'
				}, {
					xtype: 'textfield',
					id: 'listuser_1',
					name: 'listuser_1'
				}, {
					xtype: 'textfield',
					id: 'zwdocunid',
					name: 'zwdocunid'
				}, ]
			}]
		}]
	}
});