
/* JavaScript content from app/view/ForApprovalProcess/DailyOffice/OverseasTrip.js in folder common */
/*Sured by QiuXL 20170605*/
Ext.define('HelcOA.view.ForApprovalProcess.DailyOffice.OverseasTrip', {
	extend : 'Ext.Panel',
	id : 'sp_OverseasTrip_id',
	requires : ['Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea', 'Ext.field.Select'],
	config : {
		layout : 'vbox',
		items : [{
				xtype : 'toolbar',
				docked : 'top',
				id : 'surface_ID',
				title : '境外出差申请',
				items : [{
						xtype : 'button',
						iconCls : 'home',
						id : 'returnHome_ID'
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
				flex : 1,
				id : 'fp',
				items : [{
						xtype : 'fieldset',
						title : '领队',
						items : [{
								xtype : 'textfield',
								label : '标题',
								labelWidth : '40%',
								name : 'subject',
								id : 'subject',
							}, {
								xtype : 'textfield',
								id : 'fileno',
								name : 'fileno',
								label : '编号',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								id : 'createdate',
								name : 'createdate',
								label : '申请日期',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								id : 'ygh',
								name : 'ygh',
								label : '领队员工编号',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								label : '姓名',
								labelWidth : '40%',
								id : 'query_xm',
								name : 'query_xm',
							}, {
								xtype : 'textfield',
								label : '部门',
								labelWidth : '40%',
								id : 'dep',
								name : 'dep',
							}, {
								xtype : 'textfield',
								label : '申请日期',
								labelWidth : '40%',
								name : 'createdate',
								id : 'createdate',
							}
						]
					}, {
						xtype : 'fieldset',
						title : '人员数量',
						items : [{
								xtype : 'textfield',
								label : '一类人人数',
								labelWidth : '40%',
								id : 'peonum',
								name : 'peonum',
							}, {
								xtype : 'textfield',
								label : '二类人人数',
								labelWidth : '40%',
								id : 'peonum2',
								name : 'peonum2',
							}, {
								xtype : 'textfield',
								label : '三类人人数',
								labelWidth : '40%',
								id : 'peonum3',
								name : 'peonum3',
							}
						]
					}, {
						xtype : 'fieldset',
						title : '出访时间',
						items : [{
								xtype : 'textfield',
								label : '出发时间',
								id : 'starttime',
								labelWidth : '40%',
								name : 'starttime',
							}, {
								xtype : 'textfield',
								label : '返回时间',
								id : 'rettime',
								labelWidth : '40%',
								name : 'rettime',
							}, {
								xtype : 'textfield',
								label : '是否办理签证',
								id : 'qz_type',
								name : 'qz_type',
								labelWidth : '40%',
							}
						]
					}, {
						xtype : 'fieldset',
						title : '出访国家(地区)',
						items : [{
								xtype : 'textfield',
								label : '出访地区',
								id : 'qystyle',
								name : 'qystyle',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								label : '出访国家',
								id : 'country',
								name : 'country',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								label : '出访城市',
								id : 'addr',
								name : 'addr',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								label : '出访类型',
								id : 'cc_type',
								name : 'cc_type',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								label : '是否不良出差',
								id : 'ifbl',
								name : 'ifbl',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								label : '不良信息来源',
								id : 'blly',
								name : 'blly',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								label : '不良报告单号',
								id : 'bldh',
								name : 'bldh',
								labelWidth : '40%',
							}, 
						]
					}, {
						xtype : 'fieldset',
						title : '预计费用(原币)',
						items : [{
								xtype : 'textfield',
								id : 'plant',
								name : 'plant',
								label : '是否乘坐飞机',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								label : '币种',
								labelWidth : '40%',
								name : 'biz',
								id : 'biz',
							}, {
								xtype : 'textfield',
								id : 'fee',
								name : 'fee',
								label : '交通费',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								id : 'otherfee',
								name : 'otherfee',
								label : '预计其他费',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								id : 'prefee',
								name : 'prefee',
								label : '预计费用',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								id : 'feesum',
								name : 'feesum',
								label : '预计总费用',
								labelWidth : '40%',
							}, 
							{
								xtype : 'textfield',
								id : 'book_money',
								name : 'book_money',
								label : '是否预约请款',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								id : 'yyje',
								name : 'yyje',
								label : '预约请款金额',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								id : 'feesum2',
								name : 'feesum2',
								label : '预计费用总额（元）',
								labelWidth : '40%',
							}
						]
					}, {
						xtype : 'fieldset',
						title : '研发项目',
						items : [{
								xtype : 'textfield',
								id : 'ifyfxm',
								name : 'ifyfxm',
								label : '是否为研发项目',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								id : 'projectno',
								name : 'projectno',
								label : '研发项目号',
								labelWidth : '40%',
							}, {
								xtype : 'textfield',
								id : 'projectname',
								name : 'projectname',
								label : '研发项目名',
								labelWidth : '40%',
							}
						]
					}, {
						xtype : 'autoTextArea',
						id : 'reason_textarea',
						name : 'reason_textarea',
						label : '出访任务',
						labelWidth : '40%',
						required : true,
						readOnly : true,
					}, {
						xtype : 'fieldset',
						instructions : '提示:请申请人在规章制度 “QG/GH-13-01 境外出差管理规则”中下载“ 出访人员行程及情况登记表 ”表格，并请务必按要求填写完毕后附加在附件中，否则无法协助办理相关的手续。谢谢！',
					}, {
						xtype : 'fieldset',
						hidden : true,
						items : [{
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
								id : 'idea',
								name : 'idea'
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
								id : 'agentman',
								name : 'agentman'
							}, {
								xtype : 'textfield',
								id : 'ygbh',
								name : 'ygbh'
							}, {
								xtype : 'textfield',
								id : 'dept',
								name : 'dept'
							}, {
								xtype : 'textfield',
								id : 'form',
								name : 'form',
								value : 'processfile'
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
								id : 'endprocessdate',
								name : 'endprocessdate'
							}, {
								xtype : 'textfield',
								id : 'ext1',
								name : 'ext1'
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
								id : 'bzxm',
								name : 'bzxm'
							}, {
								xtype : 'textfield',
								id : 'bbzxm',
								name : 'bbzxm'
							}, {
								xtype : 'textfield',
								id : 'zc',
								name : 'zc'
							}, {
								xtype : 'textfield',
								id : 'fgzc',
								name : 'fgzc'
							}, {
								xtype : 'textfield',
								id : 'zhiwu',
								name : 'zhiwu'
							}, {
								xtype : 'textfield',
								id : 'gscorp',
								name : 'gscorp'
							}, {
								xtype : 'textfield',
								id : 'guoji',
								name : 'guoji'
							}, {
								xtype : 'textfield',
								id : 'sendreader',
								name : 'sendreader'
							}, {
								xtype : 'textfield',
								id : 'trflag',
								name : 'trflag'
							}
						]
					}
				]
			}
		]
	}
});
