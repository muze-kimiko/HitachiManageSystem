
/* JavaScript content from app/view/ForApprovalProcess/TianJin/TJtravelRequest.js in folder common */
/**
 * 出差申请表
 */
Ext.define('HelcOA.view.ForApprovalProcess.TianJin.TJtravelRequest', {
    extend: 'Ext.Panel',
    id: 'TJtravelRequest_ID',
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
                id: 'surface_ID',
                title: '出差申请表',
                items: [
                    {
                    	xtype: 'button',
                        iconCls: 'home',
                        id: 'returnHome_ID'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'idea_ID',
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
                                id: 'fileno',
                                name: 'fileno',
                                label: '编号',
                                labelWidth: '40%',
                                placeHolder: '请输入编号'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'ygh',
                                name: 'ygh',
//                                id: 'ygbh',
                                label: '人员工号',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入人员工号'
                            },
                            {
                                xtype: 'textfield',
                                id: 'query_xm',
                                label: '姓名',
                                labelWidth: '40%',
                                placeHolder: '请输入姓名'
                            },
                            {
                                xtype: 'textfield',
                                id: 'query_bm',
                                label: '部门',
                                labelWidth: '40%',
                                placeHolder: '请输入部门'
                            },
                            {
                                xtype: 'textfield',
                                id: 'phone',
                                name: 'phone',
                                label: '联络电话',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入联络电话'
                            },
                            {
                                xtype: 'textfield',
                                id: 'query_zw',
                                name: 'query_zw',
                                label: '职务',
                                labelWidth: '40%',
                                placeHolder: '请输入职务'
                            },
                            {
                                xtype: 'textfield',
                                id: 'phone_sfz',
                                name: 'phone_sfz',
                                label: '身份证号码',
                                labelWidth: '40%',
                                placeHolder: '请输入身份证号码'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'subject',
                                name: 'subject',
                                label: '标题',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入标题'
                            },
                            {
                                xtype: 'textfield',
                                id: 'place',
                                name: 'place',
                                label: '出差地点',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入出差地点'
                            },
                            {
                                xtype: 'textfield',
                                id: 'starttime',
                                name: 'starttime',
                                label: '出发时间',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                required: true,
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('starttime','预定出发时间');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'rettime',
                                name: 'rettime',
                                label: '返回时间',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                required: true,
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('rettime','返回时间');
                                	}
                                }
                            },
                            {
                                xtype: 'selectfield',
                                id: 'plant',
                                name: 'plant',
                                label: '乘坐飞机',
                                labelWidth: '40%',
                                placeHolder: '请选择是否乘坐飞机',
                                options: [
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                              text: '否',
                                              value: '否'
                                          }
                                      ]
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'peonum',
                                name: 'peonum',
                                label: '出差人数',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入出差人数'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'area',
                                name: 'area',
                                label: '出差区域',
                                labelWidth: '40%',
                                options: [
                                          {
                                              text: '省内',
                                              value: '省内'
                                          },
                                          {
                                              text: '省外',
                                              value: '省外'
                                          }
                                      ]
                            },
                            {
                            	xtype: 'selectfield',
                            	id: 'ifbl',
                            	name: 'ifbl',
                            	label: '不良出差',
                            	labelWidth: '40%',
                            	options: [
                            	          {
                            	        	  text: '否',
                            	        	  value: '否'
                            	          },
                            	          {
                            	        	  text: '是',
                            	        	  value: '是'
                            	          }
                            	          ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'sendmobile',
                                name: 'sendmobile',
                                label: '短息通知',
                                labelWidth: '40%',
                                labelWidth: '40%',
                                placeHolder: '请选择是否短信通知',
                                options: [
                                          {
                                              text: '否',
                                              value: '否'
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          }
                                      ],
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
                            },{
                    			xtype:'textnumfield',
                    			label:'通知号码',
                    			id:'sendnumber',
                    			name:'sendnumber',
                    			placeHolder:'请输入短信通知号码',
                    			labelWidth : '40%',
                    			required:true,
                    			disabled:true,
                    		}
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '预计费用',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'prefee',
                                name: 'prefee',
                                label: '预计费用',
                                required: true,
                                labelWidth: '40%',
                                placeHolder: '请输入预计费用'
                            },
                            {
                                xtype: 'textfield',
                                id: 'otherfee',
                                name: 'otherfee',
                                label: '其他费用',
                                required:true,
                                labelWidth: '40%',
                                placeHolder: '请输入其他费用'
                            },
                            {
                                xtype: 'textfield',
                                id: 'feesum',
                                name: 'feesum',
                                label: '预计总额',
                                required: true,
                                labelWidth: '40%',
                                placeHolder: '请输入预计总额'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'book_money',
                                name: 'book_money',
                                label: '预约请款',
                                labelWidth: '40%',
                                options: [
                                          {
                                              text: '否',
                                              value: '否'
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          }
                                      ],
	                            listeners:{
	                          	  change:function(select,newValue,oldValue){
	                          		  if(newValue=='是'){
	                          			  Ext.getCmp('yyje').setDisabled(false);
	                          			  Ext.getCmp('yyje').focus();
	                          		  }else{
	                          			  Ext.getCmp('yyje').setValue('');
	                          			  Ext.getCmp('yyje').setDisabled(true);
	                          		  }
	                          	  }
                            }
                            },
                            {
                                xtype: 'textfield',
                                id: 'yyje',
                                name: 'yyje',
                                label: '预约请款',
                                labelWidth: '40%',
                                placeHolder: '请输入预约请款',
                                disabled:true
                            },
                            
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'selectfield',
                                id: 'ifyfxm',
                                name: 'ifyfxm',
                                label: '研发项目',
                                labelWidth: '40%',
                                options: [
                                          {
                                              text: '否',
                                              value: '否'
                                          },
                                          {
                                              text: '是',
                                              value: '是'
                                          }
                                      ],
  	                            listeners:{
  	                          	  change:function(select,newValue,oldValue){
  	                          		  if(newValue=='否'){
  	                          			  Ext.getCmp('projectno').setDisabled(true);
  	                          			  Ext.getCmp('projectname').setDisabled(true);
  	                          			  Ext.getCmp('projectno').setValue('*');
  	                          		  }else{
  	                          			  Ext.getCmp('projectno').setDisabled(false);
  	                          			  Ext.getCmp('projectname').setDisabled(false);
  	                          		  }
  	                          	  }
  	                            }
                            },
                            {
                                xtype: 'textfield',
                                id: 'projectno',
                                name: 'projectno',
                                label: '项目号',
                                labelWidth: '40%',
                                disabled:true,
                                required: true,
                                value: '*',
                                placeHolder: '请输入研发项目号'
                            },
                            {
                                xtype: 'textfield',
                                id: 'projectname',
                                name: 'projectname',
                                label: '项目名称',
                                labelWidth: '40%',
                                disabled:true,
                                required: true,
                                value: '*',
                                placeHolder: '请输入研发项目名称'
                            }
                            
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        instructions: '注：若是多人出差且需乘坐飞机时，请在出差事由栏填写多人的员工编号姓名及对应的身份证号码,请确保身份证号码准确无误，否则不能乘坐飞机',
                        title: '',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                id: 'reason_textarea',
                                name: 'reason_textarea',
                                label: '出差事由',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入出差事由'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        items: [
                            {
                                xtype: 'selectfield',
                                id: 'report_form',
                                name: 'report_form',
                                label: '报告形式',
                                labelWidth: '40%',
                            	options: [
                                           {
                                               text: '口头报告',
                                               value: '口头报告'
                                           },
                                           {
                                               text: '书面报告',
                                               value: '书面报告'
                                           }
                                       ]
                            },
                            {
                                xtype: 'autoTextArea',
                                id: 'way',
                                name: 'way',
                                label: '审批途径',
                                labelWidth: '40%',
                                placeHolder: '请输入审批途径'
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
                                name: 'conds',
                                value: 'nocon',
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
                            	id: 'dept',
                            	name: 'dept'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'agentman',
                            	name: 'agentman'
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
                                id: 'createdate',
                                name: 'createdate'
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
                            },
                            
                            
                            
                            
                            {
                            	xtype: 'textfield',
                            	id: 'pdano',
                            	name: 'pdano'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'kzno',
                            	name: 'kzno'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'kzname',
                            	name: 'kzname'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'kzno',
                            	name: 'kzno'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'bzname',
                            	name: 'bzname'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'bzno',
                            	name: 'bzno'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'bbzname',
                            	name: 'bbzname'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'bbzno',
                            	name: 'bbzno'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'zjlname',
                            	name: 'zjlname'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'zjlno',
                            	name: 'zjlno'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'waypath',
                            	name: 'waypath'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'secflow',
                            	name: 'secflow'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'thiflow',
                            	name: 'thiflow'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'forflow',
                            	name: 'forflow'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'sta',
                            	name: 'sta'
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
                            	id: 'ext1',
                            	name: 'ext1'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'managermen',
                            	name: 'managermen'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'createflag',
                            	name: 'createflag'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'tiaojian01',
                            	name: 'tiaojian01',
                            	value:'xx'
                            },
                            
                        ]
                    }
                ]
            }
        ]
    }

});