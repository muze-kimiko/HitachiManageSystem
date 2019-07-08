Ext.define('HelcOA.view.ForApprovalProcess.BusinessService.Invoice', {
    extend: 'Ext.Panel',
    id: 'sp_Invoice_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.field.Number',
        'Ext.field.TextArea'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                id: 'surface_ID',
                docked: 'top',
                title: '开具发票流程',
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
                id: 'fp',
                flex: 1,
                layout: 'vbox',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '单号',
                                labelWidth: '40%',
                                id: 'fileno',
                                placeHolder: '请输入单号'
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
                            },
                            {
                    			xtype:'textnumfield',
                    			label:'通知号码',
                    			id:'sendnumber',
                    			name:'sendnumber',
                    			placeHolder:'请输入短信通知号码',
                    			labelWidth : '40%',
                    			disabled:true,
                            },
                            {
                                xtype: 'textfield',
                                label: '起草人',
                                labelWidth: '40%',
                                id: 'agentman',
                                placeHolder: '请输入起草人'
                            },
                            {
                                xtype: 'textfield',
                                label: '起草部门',
                                labelWidth: '40%',
                                id: 'dept',
                                placeHolder: '请输入起草部门'
                            },
                            {
                                xtype: 'textfield',
                                label: '合同号',
                                labelWidth: '40%',
                                id: 'hth',
                                required: true,
                                placeHolder: '请输入合同号'
                            },
                            {
                                xtype: 'textfield',
                                label: '工号',
                                labelWidth: '40%',
                                id: 'gh',
                                required: true,
                                placeHolder: '请输入工号'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '开票单位',
                                labelWidth: '40%',
                                id: 'subject',
                                required: true,
                                placeHolder: '请输入开票单位名称'
                            },
                            {
                                xtype: 'selectfield',
                                label: '票据类型',
                                labelWidth: '40%',
                                id: 'pjlx',
                                options: [
                                          {
                                              text: '收据',
                                              value: '收据'
                                          },
                                          {
                                        	  text: '普通销售发票',
                                        	  value: '普通销售发票'
                                          },
                                          {
                                              text: '增值税发票',
                                              value: '增值税发票'
                                          }
                                      ],
                            },
                            {
                                xtype: 'selectfield',
                                label: '票据情况',
                                labelWidth: '40%',
                                id: 'pjqk',
                                options: [
                                          {
                                              text: '开票金额款项已支付',
                                              value: '开票金额款项已支付'
                                          },
                                          {
                                        	  text: '开票金额款项未支付，开票单位要求带发票收款',
                                        	  value: '开票金额款项未支付，开票单位要求带发票收款'
                                          },
                                      ],
                               listeners:{
                                	change:function(select,newValue,oldValue){
                            			if(newValue=='开票金额款项已支付'){
                              			  Ext.getCmp('htjhq').setDisabled(false);
                              		  }else{
                              			  Ext.getCmp('htjhq').setValue('');
                              			  Ext.getCmp('htjhq').setDisabled(true);
                              		  }
                                	}
                              }
                            },
                            {
                                xtype: 'textfield',
                                label: '支付日期',
                                labelWidth: '40%',
                                id: 'zfrq',
                                placeHolder: '请选择合同交货期',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('htjhq','支付日期');
                                	}
                                }
                            },
                            {
                                xtype: 'textnumfield',
                                label: '货款金额',
                                labelWidth: '40%',
                                id: 'kpje',
                                required: true,
                                placeHolder: '请输入金额（元）'
                            },
                            {
                                xtype: 'textnumfield',
                                label: '工程款金额',
                                labelWidth: '40%',
                                id: 'kpjegc',
                                required: true,
                                placeHolder: '请输入金额（元）'
                            },
                            {
                                xtype: 'textnumfield',
                                label: '运费金额',
                                labelWidth: '40%',
                                id: 'kpjeyf',
                                required: true,
                                placeHolder: '请输入金额（元）'
                            },
                            {
                                xtype: 'textnumfield',
                                label: '开票比例(%)',
                                labelWidth: '40%',
                                id: 'kpbl',
                                required: true,
                                placeHolder: '请输入开票比例'
                            },
                            {
                                xtype: 'selectfield',
                                label: '开票地方',
                                labelWidth: '40%',
                                id: 'kpdf',
                                placeHolder: '请选择开票地方',
                                options: [
                                          {
                                              text: '广州',
                                              value: '广州'
                                          },
                                          {
                                        	  text: '本地',
                                        	  value: '本地'
                                          },
                                      ],
                            },
                           
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                label: '执行情况',
                                labelWidth: '40%',
                                id: 'htzxqksm',
                                required: true,
                                placeHolder: '请输入说明'
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '营业要求',
                                labelWidth: '40%',
                                id: 'yyyq_textarea',
                                required: true,
                                placeHolder: '请输入营业要求'
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
                                	id: 'createbypda',
                                	name: 'createbypda',
                                	value: 0
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'nextprocessuser',
                                	name: 'nextprocessuser',
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'Fnextprocess',
                                	name: 'Fnextprocess',
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'qwdategcbz',
                                	name: 'qwdategcbz',
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'qwdate3',
                                	name: 'qwdate3',
                                },
                                {
                                	xtype: 'textfield',
                                	id: 'qwdatebgr',
                                	name: 'qwdatebgr',
			                    },
			                    {
			                    	xtype: 'textfield',
			                    	id: 'fnextprocess',
			                    	name: 'fnextprocess',
					            },
					            {
					            	xtype: 'textfield',
					            	id: 'createdate',
					            	name: 'createdate',
					            },
					            {
					            	xtype: 'textfield',
					            	id: 'ext1',
					            	name: 'ext1',
							    },
							    {
							    	xtype: 'textfield',
							    	id: 'managermen',
							    	name: 'managermen',
							    }
                            ]
                    
                    	
                    }
//                    {
//                        xtype: 'fieldset',
//                        margin: '0 0 20 0',
//                        title: '',
//                        items: [
//                            {
//                                xtype: 'container',
//                                layout: {
//                                    type: 'hbox',
//                                    align: 'start',
//                                    pack: 'center'
//                                },
//                                items: [
//                                    {
//                                        xtype: 'button',
//                                        margin: 10,
//                                        width: 120,
//                                        text: '拍照'
//                                    },
//                                    {
//                                        xtype: 'button',
//                                        margin: 10,
//                                        width: 120,
//                                        text: '浏览'
//                                    }
//                                ]
//                            },
//                            {
//                                xtype: 'fieldset',
//                                title: '以上内容起草人填写'
//                            }
//                        ]
//                    }
                ]
            }
        ]
    }

});