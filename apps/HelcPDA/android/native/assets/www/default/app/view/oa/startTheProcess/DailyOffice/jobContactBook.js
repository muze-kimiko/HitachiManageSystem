
/* JavaScript content from app/view/oa/startTheProcess/DailyOffice/jobContactBook.js in folder common */
/**
 * 工作联络书
 */
Ext.define('HelcPDA.view.oa.startTheProcess.DailyOffice.jobContactBook', {
    extend: 'Ext.Panel',
    id: 'qc_jobContactBook_ID',
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
                items: [
	                    {
	                        xtype: 'button',
	                        id: 'qc_returnStartTheProcessName_ID',
	                        text: '返回',
	                        ui: 'back'
	                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'qc_ToSelectNode',
                        text: '下一步'
                    }
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
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '联络人',
                                labelWidth: '40%',
                                placeHolder: '请输入联络人姓名',
								name: 'agentman',
								id: 'agentman',
                            	readOnly:true,
                            },
                            {
                                xtype: 'textfield',
                                label: '联络部门',
                                labelWidth: '40%',
                                placeHolder: '请输入联络部门',
								name: 'dept',
								id: 'dept',
                            	readOnly:true,
                            },
                            {
                                xtype: 'textfield',
                                label: '联系电话',
                                labelWidth: '40%',
                                placeHolder: '请输入联系电话',
								name: 'phone',
								id: 'phone',
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '时间',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '开始',
                                labelWidth: '40%',
								name: 'createdate',
								id: 'createdate',
                            	readOnly:true,
                            },
                            {
                                xtype: 'textfield',
                                label: '期望完成',
                                labelWidth: '40%',
                                placeHolder: '请输入期望完成时间',
								name: 'e_date',
								id: 'e_date',
                            	readOnly:true,
                            	dateFormat: 'Y-m-d',
                                listeners:{
                                	focus:function(){
                                		initDate2('e_date','期望完成');
                                	}
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '标题',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入标题',
								name: 'subject',
								id: 'subject',
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '联络内容',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入联络内容',
								name: 'neirong_textarea',
								id: 'neirong_textarea',
                            }
                        ]
                    }
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
                    	id: 'firflow',
                    	name: 'firflow'
                    }
                ]
            }
        ]
    }

});