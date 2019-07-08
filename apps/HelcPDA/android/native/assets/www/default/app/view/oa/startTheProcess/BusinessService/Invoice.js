
/* JavaScript content from app/view/oa/startTheProcess/BusinessService/Invoice.js in folder common */
Ext.define('HelcPDA.view.oa.startTheProcess.BusinessService.Invoice', {
    extend: 'Ext.Panel',
    id: 'qc_Invoice_id',
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
                id: 'qc_surface_ID',
                docked: 'top',
                title: '开具发票流程',
                items: [
                        {
                            xtype: 'button',
                            ui: 'back',
                            text: '返回',
                            id: 'qc_returnStartTheProcessName_ID'
                        },
                        {
                            xtype: 'spacer'
                        },
                        {
                            text: '下一步',
                            id: 'qc_ToSelectNode',
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
                    			required:true,
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
                                required: true,
                                placeHolder: '请选择合同交货期',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('zfrq','支付日期');
                                	}
                                }
                            },
                            {
                                xtype: 'textnumfield',
                                label: '货款金额',
                                labelWidth: '40%',
                                value:'0',
                                id: 'kpje',
                                required: true,
                                placeHolder: '请输入金额（元）'
                            },
                            {
                                xtype: 'textfield',
                                label: '开票比例',
                                labelWidth: '40%',
                                id: 'kpbl',
                                value:'0',
                                required: true,
                                placeHolder: '请输入开票比例'
                            },
                            {
                                xtype: 'textnumfield',
                                label: '工程款金额',
                                labelWidth: '40%',
                                id: 'kpjegc',
                                required: true,
                                value:'0',
                                placeHolder: '请输入金额（元）'
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
                            {
                                xtype: 'textnumfield',
                                label: '运费金额',
                                labelWidth: '40%',
                                value:'0',
                                id: 'kpjeyf',
                                required: true,
                                placeHolder: '请输入金额（元）'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                label: '合同执行情况',
                                labelWidth: '40%',
                                id: 'htzxqksm',
                                required: true,
                                placeHolder: '请输入执行情况'
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
                            	id: 'taskid',
                            	name: 'taskid'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'node',
                            	name: 'node'
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
                            	id: 'piid',
                            	name: 'piid'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'ygbh',
                            	name: 'ygbh'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'processname',
                            	name: 'processname'
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'createdate',
                            	name: 'createdate'
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
                        ]
                    }
                ]
            }
        ]
    }

});