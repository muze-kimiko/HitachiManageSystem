
/* JavaScript content from app/view/ForApprovalProcess/TianJin/TJreturn.js in folder common */
Ext.define('HelcOA.view.ForApprovalProcess.TianJin.TJreturn', {
	extend : 'Ext.Panel',
	id : 'sp_TJreturn_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		{
			xtype : 'toolbar',
			docked : 'top',
			id : 'surface_ID',
			title : '天津产品退货流程',
			items : [
			{
				xtype : 'button',
				ui : 'back',
				text : '返回',
				id : 'returnHome_ID'
			}, {
				xtype : 'spacer'
			}, {
				xtype: 'button',
				text : '下一步',
				id : 'idea_ID'
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
				},
				{
					xtype : 'textfield',
					label : '标题',
					labelWidth : '40%',
					required : true,
					name : 'subject',
					id : 'subject',
					placeHolder : '请输入提案名称'
				},
				{
					xtype : 'textfield',
					id : 'agentman',
					name : 'agentman',
					label : '报告人',
					readOnly:true,
					labelWidth : '40%',
				},
				{
					xtype : 'textfield',
					id : 'dept',
					name : 'dept',
					label : '报告部门',
					readOnly:true,
					labelWidth : '40%',
				},
				{
					xtype : 'textfield',
					id : 'createdate',
					name : 'createdate',
					label : '报告日期',
					readOnly:true,
					labelWidth : '40%',
				},
				{
					xtype : 'textfield',
					id : 'phoneno',
					name : 'phoneno',
					label : '联系电话',
					
					labelWidth : '40%',
				},
				{
					xtype : 'autoTextArea',
					id : 'gys1',
					name : 'ghdw',
					label : '供货单位',
					
					labelWidth : '40%',
				},
				{
					xtype : 'selectfield',
					label : '',
					id : 'gys2',
					name : 'ghdw4',
					labelWidth : '40%',
					placeHolder : '供货单位',
					options : [{
						text : '',
						value:''
					},{
						text : '天津市奥达精密机械制造有限公司',
						value:'天津市奥达精密机械制造有限公司'
					},{
						text : '广州广日电气设备有限公司天津分公司',
						value:'广州广日电气设备有限公司天津分公司'
					},{
						text : '天津三杭蒙特费罗电梯部件有限公司',
						value:'天津三杭蒙特费罗电梯部件有限公司'
					},{
						text : '天津市津阳金属制品有限公司',
						value:'天津市津阳金属制品有限公司'
					}],
				},]
			}, 
			{
				xtype : 'fieldset',
				title : '退货清单No.1',
				items : [ {
					xtype : 'textfield',
					id : 'wldm1',
					name : 'wldm1',
					label : '物料代码',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'tuh1',
					name : 'tuh1',
					label : '图号/作业',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'wlmc1',
					name : 'wlmc1',
					label : '物料名称',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'sl1',
					name : 'sl1',
					label : '数量',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'cgdh1',
					name : 'cgdh1',
					label : '采购单号',
					
					labelWidth : '40%',
				},{
					xtype : 'selectfield',
					id : 'jsflag1',
					name : 'jsflag1',
					label : '退货/返销',
					
					labelWidth : '40%',
					options : [{
						text : '',
						value:''
					},{
						text : '退货',
						value:'退货'
					},{
						text : '返销',
						value:'返销'
					}],
				},{
					xtype : 'textfield',
					id : 'thdh1',
					name : 'thdh1',
					label : '退货单号/返销单号',
					
					labelWidth : '40%',
				},]
			},
			{
				xtype : 'fieldset',
				title : '退货清单No.2',
				items : [ {
					xtype : 'textfield',
					id : 'wldm2',
					name : 'wldm2',
					label : '物料代码',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'tuh2',
					name : 'tuh2',
					label : '图号/作业',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'wlmc2',
					name : 'wlmc2',
					label : '物料名称',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'sl2',
					name : 'sl2',
					label : '数量',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'cgdh2',
					name : 'cgdh2',
					label : '采购单号',
					
					labelWidth : '40%',
				},{
					xtype : 'selectfield',
					id : 'jsflag2',
					name : 'jsflag2',
					label : '退货/返销',
					
					labelWidth : '40%',
					options : [{
						text : '',
						value:''
					},{
						text : '退货',
						value:'退货'
					},{
						text : '返销',
						value:'返销'
					}],
				},{
					xtype : 'textfield',
					id : 'thdh2',
					name : 'thdh2',
					label : '退货单号/返销单号',
					
					labelWidth : '40%',
				},]
			},
			{
				xtype : 'fieldset',
				title : '退货清单No.3',
				items : [ {
					xtype : 'textfield',
					id : 'wldm3',
					name : 'wldm3',
					label : '物料代码',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'tuh3',
					name : 'tuh3',
					label : '图号/作业',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'wlmc3',
					name : 'wlmc3',
					label : '物料名称',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'sl3',
					name : 'sl3',
					label : '数量',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'cgdh3',
					name : 'cgdh3',
					label : '采购单号',
					
					labelWidth : '40%',
				},{
					xtype : 'selectfield',
					id : 'jsflag3',
					name : 'jsflag3',
					label : '退货/返销',
					
					labelWidth : '40%',
					options : [{
						text : '',
						value:''
					},{
						text : '退货',
						value:'退货'
					},{
						text : '返销',
						value:'返销'
					}],
				},{
					xtype : 'textfield',
					id : 'thdh3',
					name : 'thdh3',
					label : '退货单号/返销单号',
					
					labelWidth : '40%',
				},]
			},
			{
				xtype : 'fieldset',
				title : '退货清单No.4',
				items : [ {
					xtype : 'textfield',
					id : 'wldm4',
					name : 'wldm4',
					label : '物料代码',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'tuh4',
					name : 'tuh4',
					label : '图号/作业',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'wlmc4',
					name : 'wlmc4',
					label : '物料名称',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'sl4',
					name : 'sl4',
					label : '数量',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'cgdh4',
					name : 'cgdh4',
					label : '采购单号',
					
					labelWidth : '40%',
				},{
					xtype : 'selectfield',
					id : 'jsflag4',
					name : 'jsflag4',
					label : '退货/返销',
					
					labelWidth : '40%',
					options : [{
						text : '',
						value:''
					},{
						text : '退货',
						value:'退货'
					},{
						text : '返销',
						value:'返销'
					}],
				},{
					xtype : 'textfield',
					id : 'thdh4',
					name : 'thdh4',
					label : '退货单号/返销单号',
					
					labelWidth : '40%',
				},]
			},
			{
				xtype : 'fieldset',
				title : '退货清单No.5',
				items : [ {
					xtype : 'textfield',
					id : 'wldm5',
					name : 'wldm5',
					label : '物料代码',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'tuh5',
					name : 'tuh5',
					label : '图号/作业',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'wlmc5',
					name : 'wlmc5',
					label : '物料名称',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'sl5',
					name : 'sl5',
					label : '数量',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'cgdh5',
					name : 'cgdh5',
					label : '采购单号',
					
					labelWidth : '40%',
				},{
					xtype : 'selectfield',
					id : 'jsflag5',
					name : 'jsflag5',
					label : '退货/返销',
					
					labelWidth : '40%',
					options : [{
						text : '',
						value:''
					},{
						text : '退货',
						value:'退货'
					},{
						text : '返销',
						value:'返销'
					}],
				},{
					xtype : 'textfield',
					id : 'thdh5',
					name : 'thdh5',
					label : '退货单号/返销单号',
					
					labelWidth : '40%',
				},]
			},
			{
				xtype : 'fieldset',
				title : '退货清单No.6',
				items : [ {
					xtype : 'textfield',
					id : 'wldm6',
					name : 'wldm6',
					label : '物料代码',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'tuh6',
					name : 'tuh6',
					label : '图号/作业',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'wlmc6',
					name : 'wlmc6',
					label : '物料名称',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'sl6',
					name : 'sl6',
					label : '数量',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'cgdh6',
					name : 'cgdh6',
					label : '采购单号',
					
					labelWidth : '40%',
				},{
					xtype : 'selectfield',
					id : 'jsflag6',
					name : 'jsflag6',
					label : '退货/返销',
					
					labelWidth : '40%',
					options : [{
						text : '',
						value:''
					},{
						text : '退货',
						value:'退货'
					},{
						text : '返销',
						value:'返销'
					}],
				},{
					xtype : 'textfield',
					id : 'thdh6',
					name : 'thdh6',
					label : '退货单号/返销单号',
					
					labelWidth : '40%',
				},]
			},
			{
				xtype : 'fieldset',
				title : '退货清单No.7',
				items : [ {
					xtype : 'textfield',
					id : 'wldm7',
					name : 'wldm7',
					label : '物料代码',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'tuh7',
					name : 'tuh7',
					label : '图号/作业',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'wlmc7',
					name : 'wlmc7',
					label : '物料名称',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'sl7',
					name : 'sl7',
					label : '数量',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'cgdh7',
					name : 'cgdh7',
					label : '采购单号',
					
					labelWidth : '40%',
				},{
					xtype : 'selectfield',
					id : 'jsflag7',
					name : 'jsflag7',
					label : '退货/返销',
					
					labelWidth : '40%',
					options : [{
						text : '',
						value:''
					},{
						text : '退货',
						value:'退货'
					},{
						text : '返销',
						value:'返销'
					}],
				},{
					xtype : 'textfield',
					id : 'thdh7',
					name : 'thdh7',
					label : '退货单号/返销单号',
					
					labelWidth : '40%',
				},]
			},
			{
				xtype : 'fieldset',
				title : '退货清单No.8',
				items : [ {
					xtype : 'textfield',
					id : 'wldm8',
					name : 'wldm8',
					label : '物料代码',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'tuh8',
					name : 'tuh8',
					label : '图号/作业',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'wlmc8',
					name : 'wlmc8',
					label : '物料名称',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'sl8',
					name : 'sl8',
					label : '数量',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'cgdh8',
					name : 'cgdh8',
					label : '采购单号',
					
					labelWidth : '40%',
				},{
					xtype : 'selectfield',
					id : 'jsflag8',
					name : 'jsflag8',
					label : '退货/返销',
					
					labelWidth : '40%',
					options : [{
						text : '',
						value:''
					},{
						text : '退货',
						value:'退货'
					},{
						text : '返销',
						value:'返销'
					}],
				},{
					xtype : 'textfield',
					id : 'thdh8',
					name : 'thdh8',
					label : '退货单号/返销单号',
					
					labelWidth : '40%',
				},]
			},
			{
				xtype : 'fieldset',
				title : '退货清单No.9',
				items : [ {
					xtype : 'textfield',
					id : 'wldm9',
					name : 'wldm9',
					label : '物料代码',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'tuh9',
					name : 'tuh9',
					label : '图号/作业',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'wlmc9',
					name : 'wlmc9',
					label : '物料名称',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'sl9',
					name : 'sl9',
					label : '数量',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'cgdh9',
					name : 'cgdh9',
					label : '采购单号',
					
					labelWidth : '40%',
				},{
					xtype : 'selectfield',
					id : 'jsflag9',
					name : 'jsflag9',
					label : '退货/返销',
					
					labelWidth : '40%',
					options : [{
						text : '',
						value:''
					},{
						text : '退货',
						value:'退货'
					},{
						text : '返销',
						value:'返销'
					}],
				},{
					xtype : 'textfield',
					id : 'thdh9',
					name : 'thdh9',
					label : '退货单号/返销单号',
					
					labelWidth : '40%',
				},]
			},
			{
				xtype : 'fieldset',
				title : '退货清单No.10',
				items : [ {
					xtype : 'textfield',
					id : 'wldm10',
					name : 'wldm10',
					label : '物料代码',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'tuh10',
					name : 'tuh10',
					label : '图号/作业',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'wlmc10',
					name : 'wlmc10',
					label : '物料名称',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'sl10',
					name : 'sl10',
					label : '数量',
					
					labelWidth : '40%',
				},{
					xtype : 'textfield',
					id : 'cgdh10',
					name : 'cgdh10',
					label : '采购单号',
					
					labelWidth : '40%',
				},{
					xtype : 'selectfield',
					id : 'jsflag10',
					name : 'jsflag10',
					label : '退货/返销',
					
					labelWidth : '40%',
					options : [{
						text : '',
						value:''
					},{
						text : '退货',
						value:'退货'
					},{
						text : '返销',
						value:'返销'
					}],
				},{
					xtype : 'textfield',
					id : 'thdh10',
					name : 'thdh10',
					label : '退货单号/返销单号',
					
					labelWidth : '40%',
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
					xtype:'textfield',
					id:'ext1',
					name:'ext1'
				}, {
					xtype : 'textfield',
					id : 'taskid',
					name : 'taskid'
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