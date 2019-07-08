Ext.define('HelcOA.view.Approved.humanresources.FundApply', {
	extend : 'Ext.Panel',
	id : 'ysp_FundApply_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel',
			'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date',
			'Ext.field.TextArea' ],

	config : {
		layout : 'vbox',
		items : [ {
			xtype : 'toolbar',
			docked : 'top',
			//id : 'ysp_surface_ID',
			title : '公积金支取申请',
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
					label : '编号',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入编号'
				},
				{
					xtype : 'textfield',
					label : '申请人员工编号',
					labelWidth : '40%',
					id : 'ygh',
					name : 'ygh',
					readOnly:true,
					placeHolder : '请输入申请人员工编号'
				},
				{
					xtype : 'textfield',
					label : '姓名',
					labelWidth : '40%',
					id : 'xm',
					name : 'xm',
					readOnly:true,
					placeHolder : '请输入姓名'
				},
				{
					xtype : 'textfield',
					label : '部门',
					labelWidth : '40%',
					required : true,
					readOnly:true,
					name : 'dep',
					id : 'dep',
					placeHolder : '请输入部门'
				}, ]
			}, 
			{
				xtype : 'fieldset',
				title : '',
				items : [ {
					xtype : 'selectfield',
					label : '是否短信通知',
					required : true,
					id : 'sendmobile',
					name : 'sendmobile',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请选择',
					options : [{
						text : '否',
						value:'否'
							
					}, {
						text : '是',
						value:'是'
					}],
					listeners:{
						change:function(select,newValue,oldValue){
							if(newValue=='是'){
								Ext.getCmp('sendnumber').setDisabled(false);
								Ext.getCmp('sendnumber').focus();
							}else{
								Ext.getCmp('sendnumber').setValue('');
								Ext.getCmp('sendnumber').setDisabled(true);
							}
						}
					}
				},
				{
					xtype:'textnumfield',
					label:'通知号码',
					id:'sendnumber',
					name:'sendnumber',
					placeHolder:'请输入短信通知号码',
					labelWidth : '40%',
					required:true,
					readOnly:true,
				},
				{
					xtype : 'textfield',
					label : '申请人联系电话',
					labelWidth : '40%',
					required : true,
					readOnly:true,
					name : 'phone',
					id : 'phone',
					placeHolder : '请输入申请人联系电话'
				}]
			},
			{
				xtype : 'fieldset',
				title : '申请时填写',
				items : [ {
					xtype : 'selectfield',
					label : '申请原因',
					id : 'sqyy',
					name : 'sqyy',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请选择申请原因',
					options : [{
						text : '购房',
						value:'购房'
							
					}, {
						text : '交房租',
						value:'交房租'
					}, {
						text : '自建房',
						value:'自建房'
					}, {
						text : '翻建、加建 ',
						value:'翻建、加建 '
					}, {
						text : '大修 ',
						value:'大修 '
					}],
				},{
					xtype : 'selectfield',
					label : '现有资料',
					id : 'xyzl',
					name : 'xyzl',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请选择现有资料',
					options : [{
						text : '购房合同、购房发票(一手楼，一次性付款)',
						value:'购房合同、购房发票(一手楼，一次性付款)'
							
					}, {
						text : '交房租',
						value:'交房租'
					}, {
						text : '自建房',
						value:'自建房'
					}, {
						text : '翻建、加建 ',
						value:'翻建、加建 '
					}, {
						text : '大修 ',
						value:'大修 '
					}, ],
				},
				{
					xtype : 'selectfield',
					label : '现有资料',
					id : 'xyzl1',
					name : 'xyzl1',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请选择现有资料',
					options : [{
						text : '租赁合同、房租发票',
						value:'租赁合同、房租发票'
							
					}, ],
				},
				{
					xtype : 'selectfield',
					label : '现有资料',
					id : 'xyzl2',
					name : 'xyzl2',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请选择现有资料',
					options : [{
						text : '建房批文、建材发票',
						value:'建房批文、建材发票'
							
					}, ],
				},
				{
					xtype : 'selectfield',
					label : '现有资料',
					id : 'xyzl3',
					name : 'xyzl3',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请选择现有资料',
					options : [{
						text : ' 翻建批文、房地产权证、建材发票',
						value:' 翻建批文、房地产权证、建材发票'
							
					},],
				},
				{
					xtype : 'selectfield',
					label : '现有资料',
					id : 'xyzl4',
					name : 'xyzl4',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请选择现有资料',
					options : [{
						text : '房屋安全鉴定证明、房地产权证、修缮费用发票',
						value:'房屋安全鉴定证明、房地产权证、修缮费用发票'
							
					}, ],
				},{
					xtype : 'textfield',
					label : '合同鉴证时间(房产证发放时间)',
					id : 'gfsj',
					labelWidth : '40%',
					placeHolder : '请选择时间',
					name : 'gfsj',
					required : true,
					readOnly : true,
					dateFormat : 'Y-m-d',
					listeners : {
						focus : function() {
							initDate2('gfsj', '合同鉴证时间(房产证发放时间)');
						}
					}
				},]
			},
			{
				xtype : 'fieldset',
				title : '期望领取时间',
				items : [ {
						xtype : 'textfield',
						label : '期望领取时间',
						id : 'qwlqsj',
						readOnly:true,
						labelWidth : '40%',
						placeHolder : '请选择时间',
						name : 'qwlqsj',
						required : true,
						readOnly : true,
						dateFormat : 'Y-m-d',
						listeners : {
							focus : function() {
								initDate2('qwlqsj', '期望领取时间');
							}
						}
					}, {
						xtype : 'textfield',
						label : '标题',
						labelWidth : '40%',
						required : true,
						readOnly:true,
						name : 'subject',
						id : 'subject',
						placeHolder : '请输入标题'
					}, {
						xtype: 'autoTextArea',
						id: 'remark_textarea',
						name: 'remark_textarea',
						label: '备注',
						labelWidth: '40%',
						required: true,
						placeHolder: '请输入备注',
  						readOnly:true,
					}, {
						xtype : 'textfield',
						label : '银行支付时间',
						id : 'yhzfsj',
						readOnly:true,
						labelWidth : '40%',
						placeHolder : '请选择时间',
						name : 'yhzfsj',
						required : true,
						readOnly : true,
						dateFormat : 'Y-m-d',
						listeners : {
							focus : function() {
								initDate2('yhzfsj', '银行支付时间');
							}
						}
					},
				]
			},
			{
				xtype : 'fieldset',
				hidden : true,
				items : [ {
					xtype : 'selectfield',
					label : '',
					required : true,
					id : 'scqk',
					name : 'scqk',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请选择',
					options : [{
						text : '否',
						value:'否'
					}, {
						text : '是',
						value:'是'
					}],
					listeners:{
						change:function(select,newValue,oldValue){
							if(newValue=='是'){
								Ext.getCmp('sendnumber').setDisabled(false);
								Ext.getCmp('sendnumber').focus();
							}else{
								Ext.getCmp('sendnumber').setValue('');
								Ext.getCmp('sendnumber').setDisabled(true);
							}
						}
					}
				},
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
					xtype : 'textfield',
					id : 'agentman',
					name : 'agentman'
				},{
					xtype : 'textfield',
					id : 'dept',
					name : 'dept'
				},{
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