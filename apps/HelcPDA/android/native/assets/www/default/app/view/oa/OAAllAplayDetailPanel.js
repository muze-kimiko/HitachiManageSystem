
/* JavaScript content from app/view/oa/OAAllAplayDetailPanel.js in folder common */
Ext.define('HelcPDA.view.oa.OAAllAplayDetailPanel', {
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
                title: '三包申请报告',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        id:'oaAADPgobackButton',
                        text: '返回',
                        handler:function(button,e){
                              	var main = Ext.getCmp('oAMenusView');
                             	 	if(!main){
                             		 main = Ext.create('HelcPDA.view.oa.OAMenusView');
                             	 	}
                             	 	Ext.Viewport.setActiveItem(main);	
                        }
                    },
                    {
                        xtype: 'spacer'
                    },
				    {
					xtype:'button',
					text:'保存',
					id:'save_OAAllAplay'
					},
			        {
					xtype:'button',
				    text:'提交',
					id:'submit_OAAllAplay'
					},
					{
                    	//用于两种情况下的返回
        				xtype:'hiddenfield',
        				id:'oa_sanbao',
        			},
                ]
            },
       {
           xtype: 'tabpanel',
           flex: 1,
           items: [
{
    xtype: 'container',
    title: '电梯资料',
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
                            label: '标题',
                            labelWidth: '40%',
                            id:'et_Subject',
                            value:''
                        },
                        {
                            xtype: 'textfield',
                            label: '三包件收货地址',
                            labelWidth: '40%',
                            id:'serviceaddr',
                            value:''
                     
                        },
                        {
                            xtype: 'textfield',
                            label: '收货人',
                            labelWidth: '40%',
                            id:'acceptor',
                        },
                        {
                            xtype: 'textfield',
                            label: '收货人电话',
                            labelWidth: '40%',
                            id:'acceptNo',
                            value:'',
                   
                        },
                        {
                            xtype: 'textfield',
                            label: '生产工号',
                            labelWidth: '40%',
                            id:'oa_allSCGH',
                        },
                        {
    					    xtype:'textfield',
    					    label: ' ',
    					    id:'ASSET_NUM',
    					    labelWidth: '40%',
    						readOnly:true
    					},
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'spacer'
                                },
                                {
                                    xtype: 'button',
                                    id:'oaAllAplaySearchButton',
                                    margin: '15 0',
                                    width: '90%',
                                    text: '搜索'
                                },
                                {
                                    xtype: 'spacer'
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            label: '用户名称',
                            labelWidth: '40%',
                            id:'usersname',
                        },
                        {
                            xtype: 'textfield',
                            label: '电梯扶梯型号',
                            labelWidth: '40%',
                            id:'typeNo',
                        },
                        {
                            xtype: 'selectfield',
                            label: '是否大项目',
                            id:'ifdxm',
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
                        },
				
                        {
                            xtype: 'selectfield',
                            label: '生产场地',
                            id:'scjd',
                            labelWidth: '40%',
                            placeHolder: '请选择',
                            options: [
                                {
                                    text: '请选择',
                                    value: ''
                                },
                                {
                                	text: '大石',
                                	value: '大石'
                                },
                                {
                                	text: '上海',
                                	value: '上海'
                                },
                                {
                                	text: '天津',
                                	value: '天津'
                                }
                            ],
                            usePicker: 'auto'
                        },
                        {
                            xtype: 'textfield',
                            label: '订货单位',
                            labelWidth: '40%',
                            id:'dhdw',
                        }
                        ,
                        {
                            xtype: 'textfield',
                            label: '电机功率',
                            labelWidth: '40%',
                            id:'power',
                            value:'',
                        
                        }
							,{
                            xtype: 'datepickerfield',
                            label: '验收日期',
                            id:'checkdate',
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
                                yearFrom: 2010,
                                yearTo: 2020
                            }
                        },
                        {
                            xtype: 'textfield',
                            label: '三包期',
                            labelWidth: '40%',
                            id:'sertime',
                        }         
                    ]
                }
            ]
        }
    ]
},
	{
    xtype: 'container',
    title: '故障部件资料',
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
                            xtype: 'selectfield',
                            label: '常见故障部件',
                            id:'parts',
                            labelWidth: '40%',
                            placeHolder: '请选择',
                            options: [
                                {
                                    text: '请选择',
                                    value: ''
                                },
                                {
                                	text: '其他部件',
                                	value: '其他部件'
                                },
                                {
                                	text: '光幕装置',
                                	value: '光幕装置'
                                },
                                {
                                	text: '逆变模块',
                                	value: '逆变模块'
                                },
                                {
                                	text: 'MCVB板',
                                	value: 'MCVB板'
                                },
                                {
                                	text: '旋转编码器',
                                	value: '旋转编码器'
                                },
                                {
                                	text: '电子板',
                                	value: '电子板'
                                },
                                {
                                	text: '变频器',
                                	value: '变频器'
                                }
                            ],
                            usePicker: 'auto'
                        }, 
                        {
                            xtype: 'selectfield',
                            label: '部件型号',
                            id:'partsxh',
                            labelWidth: '40%',
                            placeHolder: '请选择',
                            options: [
                                {
                                    text: '请选择',
                                    value: ''
                                },
                                {
                                	text: '其他型号',
                                	value: '其他型号'
                                },
                                {
                                	text: 'D200M DC24V',
                                	value: 'D200M DC24V'
                                },
                                {
                                	text: 'D400 DC24V',
                                	value: 'D400 DC24V'
                                },
                                {
                                	text: '牛津FDS0547H101',
                                	value: '牛津FDS0547H101'
                                },
                                {
                                	text: 'EV-ECD01-4T0075',
                                	value: 'EV-ECD01-4T0075'
                                },
                                {
                                	text: 'EV-ECD01-4T0110',
                                	value: 'EV-ECD01-4T0110'
                                },
                                {
                                	text: 'EV-ECD01-4T0150',
                                	value: 'EV-ECD01-4T0150'
                                },
                                {
                                	text: 'EV-ECD01-4T0185',
                                	value: 'EV-ECD01-4T0185'
                                },
                                {
                                	text: 'EV-ECD01-4T0220',
                                	value: 'EV-ECD01-4T0220'
                                },
                                {
                                	text: 'EV-ECD01-4T0300',
                                	value: 'EV-ECD01-4T0300'
                                },
                                {
                                	text: 'EV-ECD01-4T0370',
                                	value: 'EV-ECD01-4T0370'
                                },
                                {
                                	text: 'MCUB01',
                                	value: 'MCUB01'
                                },
                                {
                                	text: 'MCUB02',
                                	value: 'MCUB02'
                                },
                                {
                                	text: 'TS5208N122',
                                	value: 'TS5208N122'
                                },
                                {
                                	text: 'TS5233N572',
                                	value: 'TS5233N572'
                                },
                                {
                                	text: 'TS5246N478',
                                	value: 'TS5246N478'
                                },
                                {
                                	text: 'TS5246N479',
                                	value: 'TS5246N479'
                                },
                                {
                                	text: 'DMD',
                                	value: 'DMD'
                                },
                                {
                                	text: 'GHE-FMT',
                                	value: 'IOSB(有平层)'
                                },
                                {
                                	text: 'SF2-DSC-1000',
                                	value: 'M415'
                                },
                                {
                                	text: 'M150',
                                	value: 'M150'
                                },
                                {
                                	text: 'FX2N-80MR-ES/UL',
                                	value: 'FX2N-80MR-ES/UL'
                                },
                                {
                                	text: 'GHE-FMT',
                                	value: 'GHE-FMT'
                                },
                                {
                                	text: 'H7F-4v8-11',
                                	value: 'H7F-4v8-11'
                                },
                                {
                                	text: 'H7F-4v8-15',
                                	value: 'H7F-4v8-15'
                                },
                                {
                                	text: 'H7F-4v8-8',
                                	value: 'H7F-4v8-8'
                                },
                                {
                                	text: 'HELGHE-7V1-3.0',
                                	value: 'HELGHE-7V1-3.0'
                                },
                                {
                                	text: 'HELGHE-4V1-11',
                                	value: 'HELGHE-4V1-11'
                                },
                                {
                                	text: 'HELGHE-4V1-15',
                                	value: 'HELGHE-4V1-15'
                                },
                                {
                                	text: 'HELGHE-4V1-18.5',
                                	value: 'HELGHE-4V1-18.5'
                                },
                                {
                                	text: 'HELGHE-4V1-22',
                                	value: 'HELGHE-4V1-22'
                                },
                                {
                                	text: 'HELGHE-4V1-30',
                                	value: 'HELGHE-4V1-30'
                                },
                                {
                                	text: 'HELGHE-4V1-37',
                                	value: 'HELGHE-4V1-37'
                                },
                                {
                                	text: 'HESM32',
                                	value: 'HESM32'
                                },
                                {
                                	text: 'HESM32-EX',
                                	value: 'HESM32-EX'
                                },
                                {
                                	text: 'EV-EXL01-4T0055',
                                	value: 'EV-EXL01-4T0055'
                                },
                                {
                                	text: 'EV-EXL01-4T0075',
                                	value: 'EV-EXL01-4T0055'
                                },
                                {
                                	text: 'EV-EXL01-4T0110',
                                	value: 'EV-EXL01-4T0110'
                                },
                                {
                                	text: 'FESL521U1',
                                	value: 'FESL521U1'
                                },
                                {
                                	text: 'IOSB(有平层)',
                                	value: 'IOSB(有平层)'
                                },
                                {
                                	text: 'ITL-460GR',
                                	value: 'ITL-460GR'
                                },
                                {
                                	text: 'ITL-DTGR',
                                	value: 'ITL-DTGR'
                                },
                                {
                                	text: 'MCUB03',
                                	value: 'MCUB03'
                                },
                                {
                                	text: 'PM300RSD060',
                                	value: 'PM300RSD060'
                                },
                                {
                                	text: 'PM400DVA060',
                                	value: 'PM400DVA060'
                                },
                                {
                                	text: 'SF2-DSC-1000',
                                	value: 'SF2-DSC-1000'
                                },
                                {
                                	text: 'TS5208N23',
                                	value: 'TS5208N23'
                                },
                                {
                                	text: 'TS5210N53',
                                	value: 'TS5210N53'
                                },
                                {
                                	text: 'TS5208N23',
                                	value: 'TS5208N23'
                                },
                                {
                                	text: 'TS5208N23',
                                	value: 'TS5208N23'
                                },
                                {
                                	text: 'TS5208N23',
                                	value: 'TS5208N23'
                                },
                                {
                                	text: 'TS5208N23',
                                	value: 'TS5208N23'
                                },
                                {
                                	text: 'TS5208N23',
                                	value: 'TS5208N23'
                                },
                                {
                                	text: 'TS5208N23',
                                	value: 'TS5208N23'
                                },
                                {
                                	text: 'TS5208N23',
                                	value: 'TS5208N23'
                                },
                                {
                                	text: 'TS5208N23',
                                	value: 'TS5208N23'
                                },
                                {
                                	text: 'TS5208N23',
                                	value: 'TS5208N23'
                                }
                            ],
                            usePicker: 'auto'
                        },
                       
                        {
                            xtype: 'textfield',
                            label: '部件出厂编号',
                            labelWidth: '40%',
                            id:'secoutno',
                        },
                        {
                            xtype: 'textfield',
                            label: '其他故障部件',
                            labelWidth: '40%',
                            id:'qtpart',
                        },
                        {
                            xtype: 'textfield',
                            label: '部件型号',
                            labelWidth: '40%',
                            id:'partxh',
                        },
                        {
                            xtype: 'textfield',
                            label: '图号作业',
                            labelWidth: '40%',
                            id:'mapzyno',
                        },
                        {
                            xtype: 'textfield',
                            label: '其他资料',
                            labelWidth: '40%',
                            id:'otherinfo',
                        }
                    ]
                }
            ]
        }
    ]
},   
                        
          {
                 xtype: 'container',
                 title: '故障处理情况',
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
                            xtype: 'datepickerfield',
                            label: '故障发生日期',
                            id:'errdate',
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
                                yearFrom: 2010,
                                yearTo: 2020
                            }
                        }, {
                            xtype: 'selectfield',
                            label: '是否三包过的部件',
                            id:'ifsb',
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
                        },{
                            xtype: 'selectfield',
                            label: '故障发生时电梯状态',
                            id:'errorstatus',
                            labelWidth: '40%',
                            placeHolder: '请选择',
                            options: [
                                {
                                    text: '请选择',
                                    value: ''
                                },
                                {
                                	text: '安装调试',
                                	value: '安装调试'
                                },
                                {
                                	text: '维修',
                                	value: '维修'
                                },
                                {
                                	text: '使用',
                                	value: '使用'
                                }
                            ],
                            usePicker: 'auto'
                        },
							{
                            xtype: 'textfield',
                            label: '该部件之前三包的三包单号',
                            labelWidth: '40%',
                            id:'sbdh',
                        },{
                            xtype: 'textfield',
                            label: '故障内容',
                            labelWidth: '40%',
                            id:'errcontent',
                        },{
                            xtype: 'textfield',
                            label: '故障码',
                            labelWidth: '40%',
                            id:'textarea',
                        },
						{
                            xtype: 'textfield',
                            label: '处理方法',
                            labelWidth: '40%',
                            id:'textarea2',
                        },{
                            xtype: 'textfield',
                            label: '处理结果',
                            labelWidth: '40%',
                            id:'textarea3',
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
                        },{
                            xtype: 'textfield',
                            label: '报告人联络电话',
                            labelWidth: '40%',
                            id:'phone',
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