Ext.define('HelcOA.view.ForApprovalProcess.TianJin.TJInformationAccount', {
	extend : 'Ext.Panel',
	id : 'sp_TJInformationAccount_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		{
			xtype : 'toolbar',
			docked : 'top',
			id : 'surface_ID',
			title : '天津发文申请',
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
            xtype: 'fieldset',
            instructions: '',
            title: '',
            items: [
                {
                    xtype: 'label',
                    html: '温馨提示 <p/>申请使用日立电梯(中国)有限公司信息系统的用户必须遵守相关规定。<p/>若申请成功，拥有帐号的用户不得将自己的帐号密码透露给他人，<p/>因有意或无意泄露自己个人帐号密码而导致的损失将由其本人及监督人员承担。<p/>第一次登陆的用户，请及时更改密码。',
                    style: 'color:red;text-indent:2em'
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
					label : '单号',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入单号'
				},
				{
					xtype : 'textfield',
					id : 'agentman',
					name : 'agentman',
					label : '申请人',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入申请人'
				},
				{
					xtype : 'textfield',
					id : 'createdate',
					name : 'createdate',
					label : '申请时间',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入申请时间'
				},
				{
					xtype : 'textfield',
					id : 'dept',
					name : 'dept',
					label : '申请部门',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入申请部门'
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
					label : '联系电话-分公司人员加手机号',
					labelWidth : '40%',
					required : true,
					name : 'phone',
					id : 'phone',
					placeHolder : '请输入联系电话-分公司人员加手机号'
				},
				{
					xtype : 'autoTextArea',
					label : '使用人及其员工编号',
					labelWidth : '40%',
					id : 'syrbh',
					name : 'syrbh',
					required : true,
					placeHolder : '请输入使用人及其员工编号'
				},
				{
					xtype: 'selectfield',
					id: 'sysname',
					label: '系统名称',
					required : true,
					labelWidth: '40%',
					placeHolder: '请选择系统名称',
					options: [										          
						{
							text: '',
							value: ''
						}, 
						{
							text: '天津日立专案',
							value: '天津日立专案'
						},
						{
							text: '天津传真系统',
							value: '天津传真系统'
						},
						{
							text: '天津考勤系统',
							value: '天津考勤系统'
						},
						{
							text: '天津饭卡系统',
							value: '天津饭卡系统'
						}
					]
				},
				
				{
					xtype : 'textfield',
					label : '系统评估人员',
					labelWidth : '40%',
					name : 'sysmaname',
					id : 'sysmaname',
					placeHolder : '请输入系统评估人员'
				},
								
				{
					xtype : 'autoTextArea',
					label : '申请人工作职能描述',
					labelWidth : '40%',
					name : 'sqyy',
					id : 'sqyy',
					required : true,
					placeHolder : '请输入申请人工作职能描述'
				},
								
				{
					xtype : 'autoTextArea',
					label : '申请系统用途',
					labelWidth : '40%',
					name : 'sqyy1',
					id : 'sqyy1',
					required : true,
					placeHolder : '请输入申请系统用途'
				},
				{
					xtype : 'autoTextArea',
					label : '所需权限简述',
					labelWidth : '40%',
					name : 'sqyy2',
					id : 'sqyy2',
					required : true,
					placeHolder : '请输入所需权限简述'
				},
				]
			}, 
	        {
	            xtype: 'fieldset',
	            instructions: '',
	            title: '申请部门评估(请按提示问题详细填写)',
	            items: [
	    				{
	    					xtype : 'autoTextArea',
	    					label : '申请系统的必要性',
	    					labelWidth : '40%',
	    					name : 'sqdepyijian',
	    					id : 'sqdepyijian',
	    					placeHolder : '请输入申请系统的必要性'
	    				},
	    				{
	    					xtype : 'autoTextArea',
	    					label : '所需要权限',
	    					labelWidth : '40%',
	    					name : 'sqdepyijian1',
	    					id : 'sqdepyijian1',
	    					placeHolder : '请输入所需要权限'
	    				},
	    				{
	    					xtype : 'autoTextArea',
	    					label : '申请人系统操作培训情况',
	    					labelWidth : '40%',
	    					name : 'sqdepyijian2',
	    					id : 'sqdepyijian2',
	    					placeHolder : '请输入申请人系统操作培训情况'
	    				}
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
					id: 'needzc',
					name: 'needzc'
				},
				{
					xtype: 'textfield',
					id: 'depid',
					name: 'depid'
				},
				{
					xtype: 'textfield',
					id: 'isplm',
					name: 'isplm'
				},
				{
					xtype: 'textfield',
					id: 'plmname',
					name: 'plmname'
				}]
			}]
		}]
	}
});