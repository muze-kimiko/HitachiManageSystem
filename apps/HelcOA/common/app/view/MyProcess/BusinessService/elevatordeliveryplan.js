Ext.define('HelcOA.view.MyProcess.BusinessService.elevatordeliveryplan', {
    extend: 'Ext.Panel',
    id: 'wdlc_elevatordeliveryplan_id',
    requires: [
               'Ext.Toolbar',
               'Ext.Button',
               'Ext.Spacer',
               'Ext.form.Panel',
               'Ext.form.FieldSet',
               'Ext.field.DatePicker',
               'Ext.picker.Date',
               'Ext.field.TextArea'
           ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'qc_surface_ID',
                title: '电梯/扶梯发货计划',
                items: [
	                    {
	                        xtype: 'button',
	                        id: 'ysp_returnApproved',
	                        text: '返回',
	                        ui: 'back'
	                    },
                    {
                        xtype: 'spacer'
                    },
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                id: 'fp',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '编号',
                                labelWidth: '40%',
								name: 'fileno',
								id: 'fileno',
                            	readOnly:true,
                            },
                            {
                                xtype: 'textfield',
                                label: '所属部门、营分司',
                                labelWidth: '40%',
                                placeHolder: '请输入所属部门、营分司',
								name: 'dept',
								id: 'dept',
								readOnly:true,
                            },
							{
								xtype: 'textfield',
								label: '申请人',
                                labelWidth: '40%',
                                placeHolder: '请输入申请人',
								id: 'agentman',
								name: 'agentman',
								readOnly:true,
							},							
							{
                                xtype: 'textfield',
                                label: '标题',
                                labelWidth: '40%',
								required: true,
                                placeHolder: '请输入标题',
								name: 'subject',
								id: 'subject',
								readOnly:true,
                            },
							{
								xtype : 'selectfield',
								label : '是否短信通知',
								id : 'sendmobile',
								name : 'sendmobile',
								labelWidth : '40%',
								readOnly:true,
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
								readOnly:true,
							},
							{
                                xtype: 'autoTextArea',
                                label: '发货计划及要求',
                                labelWidth: '40%',
								required: true,
                                placeHolder: '请输入发货计划及要求*',
								name: 'reason_textarea',
								id: 'reason_textarea',
								readOnly:true,
                            },
						]
					},
					{
						xtype: 'fieldset',
						hidden: true,
						items: [
							{
								xtype: 'textfield',
								id: 'conds',
								name: 'conds'
							},
							{
								xtype: 'textfield',
								id: 'userid',
								name: 'userid'
							},
							{
								xtype: 'textfield',
								id: 'type',
								name: 'type'
							},
							{
								xtype: 'textfield',
								id: 'username',
								name: 'username'
							},
							{
								xtype: 'textfield',
								id: 'node',
								name: 'node'
							},
							{
								xtype: 'textfield',
								id: 'ctime',
								name: 'ctime'
							},
							{
								xtype: 'textfield',
								id: 'piid',
								name: 'piid'
							},
							{
								xtype: 'textfield',
								id: 'processname',
								name: 'processname'
							},
							{
								xtype: 'textfield',
								id: 'curauthor',
								name: 'curauthor'
							},
							{
								xtype: 'textfield',
								id: 'dealmen',
								name: 'dealmen'
							},
							{
								xtype: 'textfield',
								id: 'ygbh',
								name: 'ygbh'
							},
							{
								xtype: 'textfield',
								id: 'form',
								name: 'form'
							},
							{
								xtype: 'textfield',
								id: 'arcpath',
								name: 'arcpath'
							},
							{
								xtype: 'textfield',
								id: 'arcdate',
								name: 'arcdate'
							},
							{
								xtype: 'textfield',
								id: 'idea',
								name: 'idea'
							},
							{
								xtype: 'textfield',
								id: 'endprocessdate',
								name: 'endprocessdate'
							},
							{
								xtype: 'textfield',
								id: 'audit_list',
								name: 'audit_list'
							},
							{
								xtype: 'textfield',
								id: 'taskid',
								name: 'taskid'
							},
							{
								xtype: 'textfield',
								id: 'ext1',
								name: 'ext1',
							},
							{
								xtype: 'textfield',
								id: 'mast',
								name: 'mast'
							},
							{
								xtype: 'textfield',
								id: 'createdate',
								name: 'createdate'
							},
							{
								xtype: 'textfield',
								id: 'audit_list',
								name: 'audit_list'
							}
						]     	
					}
				]
			}
		]
	}
});