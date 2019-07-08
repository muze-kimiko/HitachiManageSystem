/**
 * 公司级投诉电子流程表
 */
Ext.define('HelcOA.view.HasEnded.QualityControl.ComplatinSheet', {
    extend: 'Ext.Panel',
    id: 'yjs_ComplatinSheet_ID',
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
                    id: 'yjs_surface_ID',
                    items: [
                            {
                            	xtype: 'button',
                            	text: '返回',
                                ui: 'back',
                                id: 'yjs_returnHasEnded'
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
                        ]
                    },
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
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '起草部门',
                                labelWidth: '40%',
                                placeHolder: '请输入起草部门',
								name: 'dept',
								id: 'dept',
                            	readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '起草人',
                                labelWidth: '40%',
                                placeHolder: '请输入起草人',
								name: 'agentman',
								id: 'agentman',
                            	readOnly:true,
                            },
                            {
                                xtype: 'textfield',
                                label: '起草日期',
                                labelWidth: '40%',
								name: 'createdate',
								id: 'createdate',
                            	readOnly:true,
                            },
							{
                                xtype: 'textfield',
                                label: '客户名称',
                                labelWidth: '40%',
                                placeHolder: '请输入客户名称',
								name: 'clientname',
								id: 'clientname',
                            	readOnly:true,
								required: true
                            },
                            {
                                xtype: 'textfield',
                                label: '客户联系人/电话',
                                labelWidth: '40%',
                                placeHolder: '请输入客户联系人/电话',
								name: 'comdh',
								id: 'comdh',
								required: true
                            },
                            {
                                xtype: 'textfield',
                                label: '合同号/工号',
                                labelWidth: '40%',
                                placeHolder: '请输入合同号/工号',
								name: 'htid',
								id: 'htid',
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '投诉主要内容',
                                labelWidth: '40%',
                                placeHolder: '请输入投诉主要内容',
								name: 'reason_textarea',
								id: 'reason_textarea',
								required: true
                            }
					
                        ]
                    },
					{
                        xtype: 'fieldset',
                        title: '品证分派任务',
                        items: [
                            {
            					xtype : 'textfield',
            					label : '品证接收日期',
            					id : 'ckadatejs',
            					labelWidth : '40%',
            					placeHolder : '请选择品证接收日期',
            					name : 'ckadatejs',
            					required : true,
            					dateFormat : 'Y-m-d',
            					listeners : {
            						focus : function() {
            							initDate2('ckadatejs', '品证接收日期');
            						}
            					}
            				},
							{
                                xtype: 'textfield',
                                label: '归属单位',
                                labelWidth: '40%',
								name: 'gsdw',
								id: 'gsdw',
            					required : true,
                            },
							{
                                xtype: 'selectfield',
                                id: 'ts_again',
                                label: '投诉类型',
                                labelWidth: '40%',
                                required: true,
                                name: 'ts_again',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '首次投诉',
                                              value: '首次投诉'
                                          },
                                          {
                                        	  text: '再投诉',
                                        	  value: '再投诉'
                                          }
                                  ]
                            },
                            {
                                xtype: 'textfield',
                                label: '前次投诉编号',
                                labelWidth: '40%',
								name: 'gsdw2',
								id: 'gsdw2',
                            },
							
							{
                                xtype: 'selectfield',
                                id: 'tsjb',
                                label: '投诉级别',
                                labelWidth: '40%',
                                required: true,
                                name: 'tsjb',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '一般投诉',
                                              value: '一般投诉'
                                          },
                                          {
                                        	  text: '再投诉',
                                        	  value: '再投诉'
                                          },
                                          {
                                        	  text: '重大投诉',
                                        	  value: '重大投诉'
                                          }
                                  ]
                            },
							{
								xtype : 'selectfield',
								label : '短信通知',
								id : 'sendmobile',
								labelWidth : '40%',
								placeHolder : '请选择短信通知',
								options : [ {
									text : '不需要',
									value : '不需要'
								}, {
									text : '需要',
									value : '需要'
								} ],
								listeners : {
									change : function(
											select,
											newValue,
											oldValue) {
										if (newValue == '需要') {
											Ext
													.getCmp(
															'sendnumber')
													.setDisabled(
															false);
											Ext
													.getCmp(
															'sendnumber')
													.focus();
										} else {
											Ext
													.getCmp(
															'sendnumber')
													.setValue(
															'');
											Ext
													.getCmp(
															'sendnumber')
													.setDisabled(
															true);
										}
									}
								}
							},
							{
								xtype : 'textnumfield',
								label : '通知号码',
								id : 'sendnumber',
								name : 'sendnumber',
								placeHolder : '请输入短信通知号码',
								labelWidth : '40%',
								disabled : true
							},
                            {
                                xtype: 'textfield',
                                label: '抄送',
                                labelWidth: '40%',
                                placeHolder: '请输入抄送',
								name: 'sendreader',
								id: 'sendreader',
								required: true
                            }					
                        ]
                    },
					{
                        xtype: 'fieldset',
                        title: '业务部门最终反馈',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                label: '跟进处理情况及原因分析',
                                labelWidth: '40%',
                                placeHolder: '请输入跟进处理情况及原因分析',
								name: 'rensonfx_textarea',
								id: 'rensonfx_textarea',
								required: true
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '处理办法/纠正预防措施',
                                labelWidth: '40%',
                                placeHolder: '请输入处理办法/纠正预防措施',
								name: 'cuoshi_textarea',
								id: 'cuoshi_textarea',
								required: true
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '处理结果(或客户意见)',
                                labelWidth: '40%',
                                placeHolder: '请输入处理结果(或客户意见)',
								name: 'jieguo_textarea',
								id: 'jieguo_textarea',
								required: true
                            },
                            {
            					xtype : 'textfield',
            					label : '完成日期',
            					id : 'checkdate',
            					labelWidth : '40%',
            					placeHolder : '请选择时间',
            					name : 'checkdate',
            					required : true,
            					readOnly : true,
            					dateFormat : 'Y-m-d',
            					listeners : {
            						focus : function() {
            							initDate2('checkdate', '完成日期');
            						}
            					}
            				},
                            {
                                xtype: 'textfield',
                                label: '主责处理部门',
                                labelWidth: '40%',
                                placeHolder: '请输主责处理部门',
								name: 'resdept',
								id: 'resdept',
								required: true
                            },
                            {
                                xtype: 'textfield',
                                label: '处理周期(天):',
                                labelWidth: '40%',
                                placeHolder: '请输入处理周期(天):',
								name: 'zq',
								id: 'zq',
                            },
                            {
                                xtype: 'textfield',
                                label: '投诉级别核定',
                                labelWidth: '40%',
                                placeHolder: '请输入投诉级别核定',
								name: 'tsjbhd',
								id: 'tsjbhd',
								required: true
                            },
                            {
                                xtype: 'textfield',
                                label: '协助处理部门',
                                labelWidth: '40%',
                                placeHolder: '请输入协助处理部门',
								name: 'xzbm',
								id: 'xzbm',
                            }										
			
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '责任分析判断/不良分类(可多选)',
                        items: [
							{
                                xtype: 'selectfield',
                                id: 'gczr',
                                label: '工程',
                                labelWidth: '40%',
                                name: 'gczr',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '主要责任',
                                              value: '主要责任'
                                          },
                                          {
                                        	  text: '相关责任',
                                        	  value: '相关责任'
                                          }
                                  ]
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '工程',
                                labelWidth: '40%',
                                placeHolder: '请输入工程内容',
								name: 'zzreason_textarea',
								id: 'zzreason_textarea',
                            },                            
							{
                                xtype: 'selectfield',
                                id: 'sjzr',
                                label: '设计',
                                labelWidth: '40%',
                                name: 'sjzr',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '主要责任',
                                              value: '主要责任'
                                          },
                                          {
                                        	  text: '相关责任',
                                        	  value: '相关责任'
                                          }
                                  ]
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '设计',
                                labelWidth: '40%',
                                placeHolder: '请输入设计内容',
								name:'sj_detail_textarea',
								id: 'sj_detail_textarea',
                            },        
							{
                                xtype: 'selectfield',
                                id: 'zpzr',
                                label: '制品',
                                labelWidth: '40%',
                                name: 'zpzr',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '主要责任',
                                              value: '主要责任'
                                          },
                                          {
                                        	  text: '相关责任',
                                        	  value: '相关责任'
                                          }
                                  ]
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '制品',
                                labelWidth: '40%',
                                placeHolder: '请输入制品内容',
								name:'zp_detail_textarea',
								id: 'zp_detail_textarea',
                            },   
							{
                                xtype: 'selectfield',
                                id: 'yhzr',
                                label: '客户',
                                labelWidth: '40%',
                                name: 'yhzr',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '主要责任',
                                              value: '主要责任'
                                          },
                                          {
                                        	  text: '相关责任',
                                        	  value: '相关责任'
                                          }
                                  ]
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '客户',
                                labelWidth: '40%',
                                placeHolder: '请输入客户内容',
								name:'yh_detail_textarea',
								id: 'yh_detail_textarea',
                            },  
							{
                                xtype: 'selectfield',
                                id: 'qtzr',
                                label: '其他',
                                labelWidth: '40%',
                                name: 'qtzr',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '主要责任',
                                              value: '主要责任'
                                          },
                                          {
                                        	  text: '相关责任',
                                        	  value: '相关责任'
                                          }
                                  ]
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '其他',
                                labelWidth: '40%',
                                placeHolder: '请输入其他内容',
								name:'qt_detail_textarea',
								id: 'qt_detail_textarea',
                            }
			
                        ]
                    },
					{
                                xtype: 'selectfield',
                                id: 'checkv',
                                label: '售后状况',
                                labelWidth: '40%',
                                required: true,
                                name: 'checkv',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                              text: '安装',
                                              value: '安装'
                                          },
                                          {
                                        	  text: '验收',
                                        	  value: '验收'
                                          },
                                          {
                                        	  text: '三包',
                                        	  value: '三包'
                                          },
                                          {
                                        	  text: '有偿',
                                        	  value: '有偿'
                                          },
                                          {
                                        	  text: '其他',
                                        	  value: '其他'
                                          }
                                  ]
                    },
					 {
                                xtype: 'autoTextArea',
                                label: '备注',
                                labelWidth: '40%',
                                placeHolder: '请输入备注',
								name: 'beizhu_textarea',
								id: 'beizhu_textarea',
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
                    	id: 'firflow',
                    	name: 'firflow'
                    },
                    {
    					xtype : 'textfield',
    					id : 'mast',
    					name : 'mast'
    				},
                    {
    					xtype : 'textfield',
    					id : 'ext1',
    					name : 'ext1'
    				}
                ]
            }
        ]
    }

});