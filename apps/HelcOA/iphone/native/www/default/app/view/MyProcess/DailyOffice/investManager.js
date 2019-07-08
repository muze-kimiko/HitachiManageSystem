
/* JavaScript content from app/view/MyProcess/DailyOffice/investManager.js in folder common */
Ext.define('HelcOA.view.MyProcess.DailyOffice.investManager', {
    extend: 'Ext.Panel',
    id: 'wdlc_investManager_id',
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
                id: 'wdlc_surface_ID',
                title: '投资公司经理出差申请流程',
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
                                id: 'fileno',
                                name: 'fileno',
                                label: '编号',
                                labelWidth: '40%',
                                placeHolder: '请输入编号',
                                readOnly:true,
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'agentman',
                                name: 'agentman',
                                label: '出差人员',
                                labelWidth: '40%',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入出差人员'
                            },
                            {
                                xtype: 'textfield',
                                id: 'dept',
                                name: 'dept',
                                label: '公司名称',
                                labelWidth: '40%',
                                placeHolder: '请输入公司名称',
                                readOnly:true,
                            },
                            {
                            	xtype: 'textnumfield',
                            	id: 'phone',
                            	name: 'phone',
                            	label: '联络电话',
                            	labelWidth: '40%',
                            	placeHolder: '请输入联络电话',
                            	required:true,
                            	readOnly:true,
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                    	xtype: 'autoTextArea',
                                    	id: 'sendreader',
                                    	name: 'sendreader', 
                                    	label: '财务主管',
                                    	labelWidth: '48%',
                            			width: '85%',
                            			placeHolder:'请点击按钮选择',
                                    	required:true,
//                                    	disabled:true,
                                    	readOnly:true,
                                    },
                                    {
                                        xtype: 'button',
                                        height: 41,
                                        id:'seluser91',
                                        name:'seluser91',
                                        style: 'border:0;',
                                        width: '15%',
                                        iconCls: 'search',
                                        text: '',
                                        readOnly:true,
//                                        listeners:{
//                                        	tap:function(){
//                                        		object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('sendreader');
//                                        	}
//                                        }
                                    }
                                ]
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'subject',
                            	name: 'subject',
                            	label: '标题',
                            	labelWidth: '40%',
                            	required:true,
                            	placeHolder: '请输入标题',
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
                                id: 'place',
                                name: 'place',
                                label: '出差地点',
                                labelWidth: '40%',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入出差地点'
                            },{
                            	xtype : 'textfield',
                            	label : '出发时间',
                            	id : 'starttime',
                            	labelWidth : '40%',
                            	placeHolder : '请选择出发时间',
                            	name : 'starttime',
                            	required : true,
                            	readOnly : true,
                            	dateFormat : 'Y-m-d',
//                            	listeners : {
//                            		focus : function() {
//                            			initDate2('starttime', '出发时间');
//                            		}
//                            	}
                            },{
                            	xtype: 'textnumfield',
                                id: 'staytime',
                                name: 'staytime',
                                label: '逗留天数',
                                labelWidth: '40%',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入逗留天数'
                            },{
                            	xtype: 'textfield',
                                id: 'items',
                                name: 'items',
                                label: '涉及项目',
                                labelWidth: '40%',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入涉及项目'
                            },{
                            	xtype: 'textfield',
                                id: 'visitor',
                                name: 'visitor',
                                label: '会晤人员',
                                labelWidth: '40%',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入会晤人员'
                            }, {
                                xtype: 'autoTextArea',
                                id: 'reason_textarea', 
                                name: 'reason_textarea',
                                label: '出差事由',
                                labelWidth: '40%',
                                required: true,
                                readOnly:true,
                                placeHolder: '请输入出差事由'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '出差报告形式',
                        items: [
                           {
                            	xtype: 'selectfield',
                                id: 'report_form',
                                name: 'report_form',
                                label: '出差事由',
                                readOnly:true,
                                labelWidth: '40%',
                                options:[{
                                	text:'口头报告',
                                	value:'口头报告',
                                },{
                                	text:'书面报告',
                                	value:'书面报告'
                                }]
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
                                name: 'conds',
                                value:'nocon'
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
                                name: 'form',
                                value:'form'
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
                                id: 'createdate',
                                name: 'createdate'
                            },
                            {
                            	xtype: 'textfield',
                                id: 'ext1',
                                name: 'ext1'
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
                                id: 'mast',
                                name: 'mast'
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
                            }
                            ,{
                            	xtype: 'textfield',
                            	id: 'createflag',
                            	name: 'createflag'
                            }
                            ,{
                            	xtype: 'textfield',
                            	id: 'kzname',
                            	name: 'kzname'
                            }
                            ,{
                            	xtype: 'textfield',
                            	id: 'kzno',
                            	name: 'kzno'
                            }
                            ,{
                            	xtype: 'textfield',
                            	id: 'bzname',
                            	name: 'bzname'
                            }
                            ,{
                            	xtype: 'textfield',
                            	id: 'bzno',
                            	name: 'bzno'
                            }
                            ,{
                            	xtype: 'textfield',
                            	id: 'bbzname',
                            	name: 'bbzname'
                            }
                            ,{
                            	xtype: 'textfield',
                            	id: 'bbzno',
                            	name: 'bbzno'
                            }
                            ,{
                            	xtype: 'textfield',
                            	id: 'zjlname',
                            	name: 'zjlname'
                            }
                            ,{
                            	xtype: 'textfield',
                            	id: 'zjlno',
                            	name: 'zjlno'
                            }
                            ,{
                            	xtype: 'textfield',
                            	id: 'waypath',
                            	name: 'waypath'
                            }
                            ,{
                            	xtype: 'textfield',
                            	id: 'secflow',
                            	name: 'secflow'
                            }
                            ,{
                            	xtype: 'textfield',
                            	id: 'thiflow',
                            	name: 'thiflow'
                            }
                            ,{
                            	xtype: 'textfield',
                            	id: 'forflow',
                            	name: 'forflow'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});