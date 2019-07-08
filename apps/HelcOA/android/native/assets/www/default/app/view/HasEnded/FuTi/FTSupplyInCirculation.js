
/* JavaScript content from app/view/HasEnded/FuTi/FTSupplyInCirculation.js in folder common */
Ext.define('HelcOA.view.HasEnded.FuTi.FTSupplyInCirculation', {
	extend : 'Ext.Panel',
	id : 'yjs_FTSupplyInCirculation_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			title : '扶梯供应商首批供货流程',
			items : [ {
				xtype : 'button',
				id : 'yjs_returnHasEnded',
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
					id : 'subject',
					name : 'subject',
					label : '文件标题',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '发起部门 填写(技 开、资材 管理科、品证)',
				items : [ {
					xtype : 'textfield',
					label : '供应商代码',
					id : 'gysdm',
					name : 'gysdm',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '供应商名称',
					id : 'gysmc',
					name : 'gysmc',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'selectfield',
					label : '类型选择',
					labelWidth : '40%',
					name : 'sysname',
					id : 'sysname',
					options : [ {
						text : '',
						value : ''
					}, {
						text : '首批供应产品',
						value : '首批供应产品'
					}, {
						text : '变更品',
						value : '变更品'
					}, {
						text : '质量有疑问',
						value : '质量有疑问'
					}, {
						text : '首批发外加工品',
						value : '首批发外加工品'
					} ]
				}, {
					xtype : 'textfield',
					label : '文件编号',
					name : 'wjbh',
					id : 'wjbh',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '首建采购量',
					name : 'buysl',
					id : 'buysl',
					labelWidth : '40%',
					required : true,
					placeHolder : '首批建议采购量'
				}, {
					xtype : 'textfield',
					label : '梯种',
					name : 'lifttype',
					id : 'lifttype',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '物资名称',
					name : 'wzmc',
					id : 'wzmc',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '图号作业',
					name : 'thzy',
					id : 'thzy',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textfield',
					label : '型号规格',
					name : 'xhgg',
					id : 'xhgg',
					labelWidth : '40%',
					required : true
				}, {
					xtype : 'textareafield',
					label : '备注',
					name : 'neirong_textarea',
					id : 'neirong_textarea',
					labelWidth : '40%'
				} ]
			}, {
				xtype : 'fieldset',
				title : '计划信息',
				items : [ {
					xtype : 'textfield',
					label : '订单号',
					name : 'planno',
					id : 'planno',
					labelWidth : '40%'
				}, {
					xtype : 'textfield',
					label : '物资代码',
					name : 'wzdm',
					id : 'wzdm',
					labelWidth : '40%'
				}]
			},{
				xtype : 'fieldset',
				title : '进场检验信息',
				items : [ {
					xtype : 'selectfield',
					label : '进场检验',
					name : 'zbtype',
					id : 'zbtype',
					labelWidth : '40%',
					options : [ {
						text : '',
						value : ''
					}, {
						text : '合格(不需要转过程检验组)',
						value : '合格(不需要转过程检验组)'
					}, {
						text : '不合格',
						value : '不合格'
					}, {
						text : '合格(需要转过程检验组)',
						value : '合格(需要转过程检验组)'
					}]
				} ]
			}, {
				xtype : 'fieldset',
				title : '过程检验信息',
				items : [ {
					xtype : 'selectfield',
					label : '过程检验',
					name:'sjtype',
					id:'sjtype',
					labelWidth : '40%',
					options : [ {
						text : '',
						value : ''
					}, {
						text : '合格',
						value : '合格'
					}, {
						text : '不合格',
						value : '不合格'
					}]
				} ]
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
					id: 'agentman',
					name: 'agentman'
				}, {
					xtype: 'textfield',
					id: 'createdate',
					name: 'createdate'
				}]
			}]
		} ]
	}

});