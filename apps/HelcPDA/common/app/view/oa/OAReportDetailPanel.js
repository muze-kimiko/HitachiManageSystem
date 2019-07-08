Ext.define('HelcPDA.view.oa.OAReportDetailPanel', {
    extend: 'Ext.Panel',
    id:'oAReportDetailPanel',
    config: {
        layout: {
            type: 'vbox'
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '非标报告处理',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        handler:function(button,e){
                        	var OA_id=Ext.getCmp('OA_id').getValue();
                        	if(OA_id==''||OA_id==null||typeof(OA_id)=='undefined'){
                        		Ext.Viewport.setActiveItem(Ext.getCmp('oAMenusView'));
                        	}else{
                        		Ext.Viewport.setActiveItem(Ext.getCmp('oAMainPanel'));
                        	}
                        }
                    },
                    {
                        xtype: 'spacer'
                    },
				    {
					xtype:'button',
					text:'保存',
					id:'save_OAReport'
					},
			        {
					xtype:'button',
				    text:'提交',
					id:'submit_OAReport'
					}
                ]
            },
       {
           xtype: 'tabpanel',
           flex: 1,
           items: [
{
    xtype: 'container',
    title: '业务信息',
    scrollable:'vertical',
    items: [
        {
            xtype: 'formpanel',
            heigth:'100%',
            items: [
                {
                    xtype: 'fieldset',
                    docked: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            label: '用户名称',
                            placeHolder:'请输入用户名称',
                            labelWidth: '40%',
                            id:'apellation',
                            value:''
                         
                        },
                        {
                            xtype: 'textfield',
                            label: '地址',
                            placeHolder:'请输入地址',
                            labelWidth: '40%',
                            id:'address',
                            value:''
                     
                        },
                        {
                            xtype: 'textfield',
                            label: '当事人',
                            placeHolder:'请输入当事人',
                            labelWidth: '40%',
                            id:'party',
                            value:''
                
                        },
                        {
                            xtype: 'textfield',
                            label: '电话',
                            placeHolder:'请输入电话',
                            labelWidth: '40%',
                            id:'phone',
                            value:'',
                   
                        },
                        {
                            xtype: 'datepickerfield',
                            label: '处理期限',
                            id:'date',
                            labelWidth: '40%',
                            required:true,
                            placeHolder: '请输入期望处理期限',
                            dateFormat: 'Y-m-d',
                            picker: {
                                slotOrder: [
                                    'year',
                                    'month',
                                    'day'
                                ],
                                doneButton: '完成',
                                cancelButton: '取消',
                            }
                        },
                        {
                            xtype: 'textfield',
                            label: '生产工号',
                            placeHolder:'请输入生产工号',
                            labelWidth: '40%',
                            id:'produceno',
                            value:'',
                        },
                        {
                            xtype: 'textfield',
                            label: '电梯型号',
                            placeHolder:'请输入电梯型号',
                            labelWidth: '40%',
                            id:'model',
                            value:'',
                        },
                        {
                            xtype: 'textfield',
                            label: '层/站',
                            placeHolder:'请输入层/站',
                            labelWidth: '40%',
                            id:'floor',
                            value:'',
                        },{
                            xtype: 'datepickerfield',
                            label: '进场日期',
                            id:'date1',
                            labelWidth: '40%',
                            required:true,
                            placeHolder: '请输入进场日期',
                            dateFormat: 'Y-m-d',
                            picker: {
                                slotOrder: [
                                    'year',
                                    'month',
                                    'day'
                                ],
                                doneButton: '完成',
                                cancelButton: '取消',
                                //yearFrom: 2010,
                                //yearTo: 2020
                            }
                        },
                        {
                            xtype: 'textfield',
                            label: '安装单位',
                            placeHolder:'请输入安装单位',
                            labelWidth: '40%',
                            id:'unit',
                            value:'',
                        
                        }
                        ,{
                            xtype: 'datepickerfield',
                            label: '验收日期',
                            id:'date2',
                            labelWidth: '40%',
                            required:true,
                            placeHolder: '请输入验收日期',
                            dateFormat: 'Y-m-d',
                            picker: {
                                slotOrder: [
                                    'year',
                                    'month',
                                    'day'
                                ],
                                doneButton: '完成',
                                cancelButton: '取消',
                               // yearFrom: 2010,
                               // yearTo: 2020
                            }
                        },
                        {
                            xtype: 'textfield',
                            label: '台数',
                            placeHolder:'请输入涉及台数',
                            labelWidth: '40%',
                            id:'count',
                            value:'',
                        
                        }
							,
                        {
                            xtype: 'textfield',
                            label: '工号,梯型',
                            placeHolder:'请输入涉及工号,梯型',
                            labelWidth: '40%',
                            id:'refermodel',
                            value:'',
                        
                        },{
                            xtype: 'selectfield',
                            label: '责任判断',
                            id:'duty',
                            labelWidth: '40%',
                            placeHolder: '请选择',
                            options: [
                                {
                                    text: '请选择',
                                    value: ''
                                },
                                {
                                	text: '制造',
                                	value: '制造'
                                },
                                {
                                	text: '设计',
                                	value: '设计'
                                },
                                {
                                	text: '营业',
                                	value: '营业'
                                },
                                {
                                	text: '调试',
                                	value: '调试'
                                },
                                {
                                	text: '监理',
                                	value: '监理'
                                }
                                ,
                                {
                                	text: '甲方',
                                	value: '甲方'
                                },
                                {
                                	text: '维保',
                                	value: '维保'
                                },
                                {
                                	text: '其他',
                                	value: '其他'
                                }
                            ],
                            usePicker: 'auto'
                        },{
                            xtype: 'selectfield',
                            label: '类别',
                            id:'type',
                            labelWidth: '40%',
                            placeHolder: '请选择',
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
                                	text: '维保',
                                	value: '维保'
                                }
                            ],
                            usePicker: 'auto'
                        },
                        {
                            xtype: 'selectfield',
                            label: '是否短信通知',
                            id:'sendmobile',
                            labelWidth: '40%',
                            placeHolder: '请选择',
                            options: [
                                {
                                    text: '请选择',
                                    value: ''
                                },
                                {
                                	text: '是',
                                	value: '是'
                                },
                                {
                                	text: '否',
                                	value: '否'
                                }
                            ],
                            usePicker: 'auto'
                        }
                        
                    ]
                }
            ]
        }
    ]
},
	{
    xtype: 'container',
    title: '报告信息',
    items: [
        {
            xtype: 'formpanel',
            heigth:'100%',
            items: [
                {
                    xtype: 'fieldset',
                    docked: 'top',
                    items: [
                       //隐藏文本
                       {
                            xtype: 'hiddenfield',
                            label: '报告人',
                            labelWidth: '40%',
                            id:'agentman',
                            value:'',
                       
                        },  {
                            xtype: 'hiddenfield',
                            label: '时间',
                            labelWidth: '40%',
                            id:'applydate',
                            value:'',
                       
                        },
                        {
                            xtype: 'textfield',
                            label: '联系电话',
                            placeHolder:'请输入联系电话',
                            labelWidth: '40%',
                            id:'phone2',
                            value:'',
                       
                        },
                        {
                            xtype: 'textfield',
                            label: '标题',
                            placeHolder:'请输入标题',
                            labelWidth: '40%',
                            id:'Subject',
                            value:'',
                       
                        },
                        {
                            xtype: 'textfield',
                            label: '报告内容',
                            placeHolder:'请输入报告',
                            labelWidth: '40%',
                            id:'report',
                            value:'',
                       
                        },
                        {
                            xtype: 'hiddenfield',
                            label: '代理人',
                            labelWidth: '40%',
                            id:'daili',
                            value:'',
                       
                        },
                        {
                            xtype: 'hiddenfield',
                            label: '返回r',
                            labelWidth: '40%',
                            id:'OA_id',
                            value:'',
                       
                        }
                        
                    ]
                }
            ]
        }
    ]
},   
                        
          {
                 xtype: 'container',
                 title: '附件',
                        items: [
                            {
                                xtype: 'formpanel',
                                heigth:'100%',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        docked: 'top',
                                        items: [
										{
											xtype:'button',
										    text:'拍照'
										},{
										    xtype:'button',
										    text:'选择相册图片'
										}
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

});