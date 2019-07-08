
/* JavaScript content from app/view/ForApprovalProcess/InformationTechnology/PDAaccount.js in folder common */
Ext.define('HelcOA.view.ForApprovalProcess.InformationTechnology.PDAaccount', {
	extend : 'Ext.Panel',
	id : 'sp_PDAaccount_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		{
			xtype : 'toolbar',
			docked : 'top',
			id: 'surface_ID',
			title : 'PDA系统账号申请流程',
			items : [
			{
				xtype: 'button',
				id: 'returnHome_ID',
				text: '返回',
				ui: 'back'
            }, {
				xtype : 'spacer'
			},{
				text : '下一步',
				id : 'idea_ID',
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
					xtype : 'autoTextArea',
					id : 'subject',
					name : 'subject',
					label : '标题',
					required : true,
					readOnly:true,
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
					xtype : 'selectfield',
					label : '申请类型',
					id : 'sqtype',
					name : 'sqtype',
					required : true,
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请选择申请类型',
					options : [{
						text : '新增',
						value:'新增'
							
					}, {
						text : '变更',
						value:'变更'
					}, {
						text : '取消',
						value:'取消'
					}],
				},
				{
					xtype : 'textfield',
					label : '联系电话-分公司人员加手机号',
					labelWidth : '40%',
					required : true,
					readOnly:true,
					name : 'phone',
					id : 'phone',
					placeHolder : '请输入手机号'
				}, 
				{
					xtype : 'textfield',
					label : '权限类型',
					labelWidth : '40%',
					required : true,
					readOnly:true,
					name : 'zhtype',
					id : 'zhtype',
					placeHolder : '请选择权限类型'
				},
				{
					xtype : 'selectfield',
					label : '工程办公',
					id : 'proletype',
					name : 'proletype',
					required : true,
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请选择工程办公类型',
					options : [{
						text : 'PDA维保人员角色',
						value:'PDA维保人员角色'
							
					}, {
						text : 'PDA调试组长角色',
						value:'PDA调试组长角色'
					}, {
						text : 'PDA验收组长角色',
						value:'PDA验收组长角色'
					}, {
						text : 'PDA监理人员角色',
						value:'PDA监理人员角色'
					}, {
						text : 'PDA调试人员角色',
						value:'PDA调试人员角色'
					}, {
						text : 'PDA验收人员角色',
						value:'PDA验收人员角色'
					}, {
						text : 'PDA维保及监理角色',
						value:'PDA维保及监理角色'
					}, {
						text : '分公司经理',
						value:'分公司经理'
					}],
				},
				{
					xtype : 'selectfield',
					label : 'GHP',
					id : 'groletype',
					name : 'groletype',
					required : true,
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请选择GHP类型',
					options : [{
						text : '一般用户',
						value:'一般用户'
							
					}, {
						text : '技术审核人员',
						value:'技术审核人员'
					}],
				}
				]
			}, 
			{
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype:'autoTextArea',
					label:'imei',
					labelWidth : '40%',
					id:'imei',
					name:'imei',
					required : true,
					readOnly:true,
					placeHolder:'请输入imei码',

				},{
					xtype:'autoTextArea',
					label:'imsi',
					labelWidth : '40%',
					id:'imsi',
					name:'imsi',
					required : true,
					readOnly:true,
					placeHolder:'请输入imsi码',

				},{
					xtype:'textnumfield',
					label:'使用人编号',
					labelWidth : '40%',
					id:'ygh',
					name:'ygh',
					required : true,
					readOnly:true,
					placeHolder:'请输入使用人编号',

				},{
					xtype:'textfield',
					label:'使用人姓名',
					labelWidth : '40%',
					id:'query_xm',
					name:'query_xm',
					required : true,
					readOnly:true,
					placeHolder:'请输入使用人姓名',

				},{
					xtype:'textfield',
					label:'使用人部门',
					labelWidth : '40%',
					id:'usedep',
					name:'usedep',
					required : true,
					readOnly:true,
					placeHolder:'请输入使用人部门',

				},{
					xtype:'autoTextArea',
					label:'申请权限简述',
					labelWidth : '40%',
					id:'sqyy1_textarea',
					name:'sqyy1_textarea',
					required : true,
					readOnly:true,
					placeHolder:'请输入申请权限简述',

				},{
					xtype:'textfield',
					label:'使用人岗位',
					labelWidth : '40%',
					id:'gangwei',
					name:'gangwei',
					required : true,
					readOnly:true,
					placeHolder:'请输入使用人岗位',

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