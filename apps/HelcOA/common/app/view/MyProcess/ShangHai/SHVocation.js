Ext.define('HelcOA.view.MyProcess.ShangHai.SHVocation', {
	extend : 'Ext.Panel',
	id : 'wdlc_SHVocation_id',
	requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer', 'Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.DatePicker', 'Ext.picker.Date', 'Ext.field.TextArea' ],
	config : {
		layout : 'vbox',
		items : [
		            {xtype: 'toolbar',
		                docked: 'top',
		                title: '上海请假申请',
		                items: [
		                    {
		        				xtype: 'button',
		        				id: 'wdlc_returnMyProcess',
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
				items : [
				{
					xtype : 'textfield',
					id : 'agentman',
					name : 'agentman',
					label : '填表人',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入填表人'
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
					id : 'qjr',
					name : 'qjr',
					label : '请假人',
					readOnly:true,
					labelWidth : '40%',
					placeHolder : '请输入请假人'
				},
				{
					xtype: 'fieldset',
					instructions: '',
					title: '请假说明',
					items: [
						{
							xtype: 'label',
							html: '温馨提示 <p/>1.有薪假、调休假，须向部门考勤员提供单据。<p/>2.婚假、护理假，须向人力资源科提供证明。<p/>3.病假、产假、产检假、计划生育假，须由医师判断。 ',
							style: 'color:red;text-indent:2em'
						}
					]
                },				
				{
					xtype: 'selectfield',
					id: 'xjtype',
					label: '休假类型',
					required : true,
					labelWidth: '40%',
					placeHolder: '请选择休假类型',
					options: [										          
						{
							text: '',
							value: ''
						}, 
						{
							text: '有薪假',
							value: '有薪假'
						},
						{
							text: '调休假',
							value: '调休假'
						},
						{
							text: '护理假',
							value: '护理假'
						},
						{
							text: '婚假',
							value: '婚假'
						},
						{
							text: '护理假',
							value: '护理假'
						},
						{
							text: '病假',
							value: '病假'
						},
						{
							text: '产假',
							value: '产假'
						},
						{
							text: '产检假',
							value: '产检假'
						},
						{
							text: '计划生育假',
							value: '计划生育假'
						},
						{
							text: '事假',
							value: '事假'
						},
						{
							text: '丧假',
							value: '丧假'
						},
						{
							text: '公务休假',
							value: '公务休假'
						},
						{
							text: '哺乳假',
							value: '哺乳假'
						}
					]
				},
				{
					xtype : 'textfield',
					label : '联系电话',
					labelWidth : '40%',
					id : 'phone',
					name : 'phone',
					
					placeHolder : '请输入联系电话'
				},
				{
					xtype : 'panel',
					layout : 'hbox',
					items : [
							{
								xtype : 'autoTextArea',
								id : 'kqname',
								width : '85%',
								labelWidth : '48%',
								label : '部门考勤员',
								readOnly : true,
								required : true,
							},
							{
								xtype : 'button',
								id : 'button200',
								height : 41,
								style : 'border:0;',
								width : '15%',
								iconCls : 'search',
								text : '',
								listeners : {
									tap : function() {
										object
												.getApplication()
												.getController(
														'PublicPersonnelSelectionC')
												.selectPerson(
														'kqname');
									}
								}
							} ]
				},
				
				{
					xtype : 'panel',
					layout : 'hbox',
					title: '请假时间',
					items : [
                            {
                                xtype: 'textfield',
                                id: 'starttime',
                                name: 'starttime',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                required: true,
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('starttime','请假日期');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'starthour',
                                name: 'starthour',
                                labelWidth: '40%',
								label:'时：',
                                required: true,
                                readOnly:true,
                                placeHolder: '点击设置时',
                                listeners:{
                                	focus:function(){
                                		checkdate('this','hour');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'startminu',
                                name: 'startminu',
                                labelWidth: '40%',								
								label:'分：',
                                required: true,
                                readOnly:true,
                                placeHolder: '点击设置分',
                                listeners:{
                                	focus:function(){
                                		checkdate('this','startminu');
                                	}
                                }
                            },
							
							{
                                xtype: 'textfield',
                                id: 'endtime',
                                name: 'endtime',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                required: true,
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('endtime','请假日期');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'endhour',
                                name: 'endhour',
                                labelWidth: '40%',
								label:'时：',
                                required: true,
                                readOnly:true,
                                placeHolder: '点击设置时',
                                listeners:{
                                	focus:function(){
                                		checkdate('this','hour');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'endminu',
                                name: 'endminu',
                                labelWidth: '40%',								
								label:'分：',
                                required: true,
                                readOnly:true,
                                placeHolder: '点击设置分',
                                listeners:{
                                	focus:function(){
                                		checkdate('this','endminu');
                                	}
                                }
                            },
							
                            {
                                xtype: 'textfield',
                                id: 'ts',
                                name: 'ts',
                                labelWidth: '40%',								
								label:'共计小时数：',
                                required: true,
                                readOnly:true,
                                placeHolder: '',
                            },
							]
				},
				{
					xtype : 'autoTextArea',
					label : '请假事由详细说明',
					labelWidth : '40%',
					name : 'reason_textarea',
					id : 'reason_textarea',
					required : true,
					placeHolder : '请输入请假事由详细说明'
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
					id: 'agentpeofdep',
					name: 'agentpeofdep'
				},
				{
					xtype: 'textfield',
					id: 'depflag',
					name: 'depflag'
				},
				{
					xtype: 'textfield',
					id: 'fileno',
					name: 'fileno'
				},
				{
					xtype: 'textfield',
					id: 'tiaojian01',
					name: 'tiaojian01'
				},
				{
					xtype: 'textfield',
					id: 'createdate',
					name: 'createdate'
				},
				{
					xtype: 'textfield',
					id: 'stime1',
					name: 'stime1'
				},
				{
					xtype: 'textfield',
					id: 'shour1',
					name: 'shour1'
				},
				{
					xtype: 'textfield',
					id: 'sminu1',
					name: 'sminu1'
				},
				{
					xtype: 'textfield',
					id: 'etime1',
					name: 'etime1'
				},
				{
					xtype: 'textfield',
					id: 'ehour1',
					name: 'ehour1'
				},
				{
					xtype: 'textfield',
					id: 'eminu1',
					name: 'eminu1'
				},
				{
					xtype: 'textfield',
					id: 'ts1',
					name: 'ts1'
				}]
			}]
		}]
	}
});