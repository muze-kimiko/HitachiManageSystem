
/* JavaScript content from app/view/ForApprovalProcess/QualityControl/ThreeGuarantees.js in folder common */
Ext.define('HelcOA.view.ForApprovalProcess.QualityControl.ThreeGuarantees', {
    extend: 'Ext.Panel',
    id: 'sp_ThreeGuarantees_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Number',
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
                title: '三包申请报告',
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
                layout: 'vbox',
                items: [
                    {
                        xtype: 'fieldset',
                        instructions: 'fax to:020-39908006(紧急情况传真号码)',
                        items: [
                            
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                            	xtype: 'selectfield',
                            	id: 'bdtype',
                            	label: '类型',
                            	labelWidth: '40%',
                            	options: [
                                          {
                                              text: '三包单',
                                              value: '三包单'
                                          },
                                          {
                                              text: '销售单',
                                              value: '销售单'
                                          }
                                      ]
                            },
							{
							    xtype: 'textfield',
							    id: 'subject',
							    label: '标题',
							    labelWidth: '40%',
							    required: true,
							    placeHolder: '请输入标题'
							},
                            {
                                xtype: 'textfield',
                                id: 'fileno',
                                label: 'NO',
                                labelWidth: '40%',
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textfield',
                                label: '收货地址',
                                labelWidth: '40%',
                                id: 'serviceaddr',
                                required: true,
                                placeHolder: '请输入三包件收货地址'
                            },
                            {
                                xtype: 'textfield',
                                label: '收货人',
                                labelWidth: '40%',
                                id: 'acceptor',
                                required: true,
                                placeHolder: '请输入收货人姓名'
                            },
                            {
                                xtype: 'textfield',
                                label: '收货人电话',
                                labelWidth: '40%',
                                id: 'acceptno',
                                required: true,
                                placeHolder: '请输入电话'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '电梯/扶梯资料',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '生产工号',
                                labelWidth: '40%',
                                id: 'produceno',
                                required: true,
                                placeHolder: '请输入生产工号'
                            },
                            {
                                xtype: 'textfield',
                                label: '用户名称',
                                labelWidth: '40%',
                                id: 'usersname',
                                placeHolder: '请输入用户名称'
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
                            	label: '重点项目',
                            	labelWidth: '40%',
                            	id: 'zd',
                            	placeHolder: '请输入合同号'
                            },
                            {
                                xtype: 'textfield',
                                label: '生产场地',
                                labelWidth: '40%',
                                id: 'scjd',
                                placeHolder: '请输入生产场地'
                            },
//                            {
//                                xtype: 'textfield',
//                                label: '订货单位',
//                                labelWidth: '40%',
//                                id: 'dhdw',
//                                required: true,
//                                placeHolder: '请输入订货单位'
//                            },
                            {
                                xtype: 'textfield',
                                label: '电梯扶梯型号',
                                labelWidth: '40%',
                                id: 'typeno',
                                required: true,
                                placeHolder: '请输入电梯扶梯型号'
                            },
//                            {
//                                xtype: 'textfield',
//                                label: '电机功率',
//                                labelWidth: '40%',
//                                id: 'power',
//                                required: true,
//                                placeHolder: '请输入电机功率'
//                            },
                            {
                                xtype: 'textfield',
                                label: '验收日期',
                                labelWidth: '40%',
                                id: 'checkdate',
                                required: true,
                                placeHolder: '请选择日期',
                                readOnly:true,
                                listeners:{
                                	focus:function(){
                                		initDate2('checkdate','验收日期');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                label: '三包期',
                                labelWidth: '40%',
                                id: 'sertime',
                                placeHolder: '请输入三包时间(月)'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '故障部件资料',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '物资代码',
                                labelWidth: '40%',
                                id: 'parts',
                                required: true,
                                placeHolder: '请输入物资代码'
                            },
                            {
                                xtype: 'textfield',
                                label: '部件名称',
                                labelWidth: '40%',
                                id: 'partxh',
                                required: true,
                                placeHolder: '请选择部件名称'
                            },
                            {
                                xtype: 'textfield',
                                label: '作业号',
                                labelWidth: '40%',
                                id: 'secoutno',
                                required: true,
                                placeHolder: '请输入作业号'
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '物料描述',
                                labelWidth: '40%',
                                id: 'partsxh',
                                required: true,
                                placeHolder: '请输入其他故障部件'
                            },
                            {
                                xtype: 'textfield',
                                label: '图号',
                                labelWidth: '40%',
                                id: 'mapzyno',
                                required: true,
                                placeHolder: '请输入部件型号'
                            },
                            {
                                xtype: 'textfield',
                                label: '其他资料',
                                labelWidth: '40%',
                                id: 'otherinfo',
                                required: true,
                                placeHolder: '请输入图号作业'
                            },
                            {
                                xtype: 'textfield',
                                label: '数量',
                                labelWidth: '40%',
                                value: '1件',
                                readOnly:true,
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '现场故障情况及处理',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '故障发生',
                                labelWidth: '40%',
                                id: 'errdate',
                                required: true,
                                placeHolder: '请选择日期'
                            },
                            {
                                xtype: 'selectfield',
                                label: '是否三包过',
                                labelWidth: '40%',
                                id: 'ifsb',
                                required: true,
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
                                label: '电梯状况',
                                labelWidth: '40%',
                                id: 'errorstatus',
                                required: true,
                                placeHolder: '请选择状况',
                                options: [
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
                                      ]
                            },
                            {
                                xtype: 'textfield',
                                label: '该部件之前的三包单号',
                                labelWidth: '220px',
                                id: 'sbdh',
                                required: true,
                                placeHolder: '请输入三包单号'
                            },
                            
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '故障内容及处理',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                label: '故障内容',
                                labelWidth: '40%',
                                id: 'errcontent',
                                required: true,
                                placeHolder: '请输入故障内容（请详细描述）'
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '故障码',
                                labelWidth: '40%',
                                id: 'textarea',
                                required: true,
                                placeHolder: '请输入故障码（若没有，请注明原因）'
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '处理方法',
                                labelWidth: '40%',
                                id: 'textarea2',
                                required: true,
                                placeHolder: '请输入处理方法'
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '处理结果',
                                labelWidth: '40%',
                                id: 'textarea3',
                                required: true,
                                placeHolder: '请输入处理结果'
                            },
                            {
                                xtype: 'textfield',
                                label: '报告人',
                                labelWidth: '40%',
                                id: 'agentman',
                                required: true,
                                placeHolder: '请输入报告人'
                            },
                            {
                                xtype: 'textfield',
                                label: '所属部门',
                                labelWidth: '40%',
                                id: 'dept',
                                required: true,
                                placeHolder: '请输入所属部门'
                            },
                            {
                                xtype: 'textfield',
                                label: '时间',
                                labelWidth: '40%',
                                id: 'createdate',
                                required: true,
                                placeHolder: '请选择时间'
                            },
                            {
                                xtype: 'selectfield',
                                label: '短信通知',
                                labelWidth: '40%',
                                id: 'sendmobile',
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
                                    		  }else{
                                    			  Ext.getCmp('sendnumber').setValue('');
                                    			  Ext.getCmp('sendnumber').setDisabled(true);
                                    		  }
                                    	  }
                                      }
                            },
                            {
                                xtype: 'textfield',
                                label: '手机号码',
                                labelWidth: '40%',
                                id: 'sendnumber',
                                disabled:true,
                                placeHolder: '请输入报告人手机号码'
                            },
                            {
                            	xtype: 'textfield',
                            	label: '联络电话',
                            	labelWidth: '40%',
                            	id: 'phone',
                            	required: true,
                            	placeHolder: '请输入报告人联络电话'
                            }
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
//                            }
                        ]
                    },
                    //zhj 10
                    {
                    	xtype:'fieldset',
                    	title:'附件',
                    	items:[
//                               {
//                                   xtype: 'panel',
//                                   style: 'border-bottom:#ccc 1px dotted',
//                                   layout: {
//                                       type: 'hbox',
//                                       align: 'start',
//                                       pack: 'center'
//                                   },
//                                   items: [
//                                       {
//                                           xtype: 'button',
//                                           margin: 10,
//                                           width: 120,
//                                           text: '拍照',
//                                           id:'take_picture',
//                                       },
//                                       {
//                                           xtype: 'button',
//                                           margin: 10,
//                                           width: 120,
//                                           text: '浏览',
//                                           id:'see_picture'
//                                       },
////                                       {
////                                           xtype: 'button',
////                                           margin: 10,
////                                           width: 120,
////                                           text: '上传',
////                                           id:'uploadPiece'
////                                       },
//                                       
//                                   ]
//                               },
                           {
                    		xtype:'list',
                            id: 'picture_listV_ck',
                            width:"100%",
                            //height:200,
                            scrollable: false,
                            store :'jobContactBook_ck_Store',
                            //data:[{filename:'1.jpg'},{filename:'2.jpg'}],
                            itemTpl : ['<div style="width:100%; margin:0; padding:0;">',
                                       '{filename}',
                                       '</div>'],
                            onItemDisclosure: true
                    },
                    	       
                    	       ],
                    
                    },
                    {
                        xtype: 'fieldset',
                        title: '以上由报告人填写',
                        items: [
                            {
                                xtype: 'autoTextArea',
                                label: '申请三包理由',
                                labelWidth: '40%',
                                id: 'servicecause',
                                placeHolder: '请输入申请三包理由'
                            },
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '部门意见',
                        items: [
                            {
                                xtype: 'selectfield',
                                label: '缓急程度',
                                labelWidth: '40%',
                                id: 'jjcd',
                                placeHolder: '请选择缓急程度',
                                options: [
                                          {
                                              text: '稍急',
                                              value: '稍急'
                                          },
                                          {
                                        	  text: '紧急',
                                        	  value: '紧急'
                                          },
                                          {
                                              text: '普通',
                                              value: '普通'
                                          }
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                label: '运输方式',
                                labelWidth: '40%',
                                id: 'ifzd',
                                options: [
                                          {
                                              text: '非空运',
                                              value: '非空运'
                                          },
                                          {
                                        	  text: '空运',
                                        	  value: '空运'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                label: '大客户项目',
                                labelWidth: '40%',
                                id: 'iszdxm',
                                required: true,
                                placeHolder: '请选择是或否',
                                options: [
                                          {
                                              text: '否',
                                              value: '否'
                                          },
                                          {
                                        	  text: '是',
                                        	  value: '是'
                                          },
                                      ]
                            },
                            {
                                xtype: 'textfield',
                                label: '审核人电话',
                                labelWidth: '40%',
                                id: 'shrphone',
                                required: true,
                                placeHolder: '请输入审核人电话'
                            },
                            {
                                xtype: 'autoTextArea',
                                label: '空运原因',
                                labelWidth: '40%',
                                id: 'textarea4',
                                placeHolder: '请输入空运的原因或紧急情况',
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '以上由报告人所属部门填写',
                        items: [
                            {
                                xtype: 'selectfield',
                                label: '同意三包',
                                labelWidth: '40%',
                                id: 'isyz',
                                options: [
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                label: '判定依据',
                                labelWidth: '40%',
                                id: 'worktel',
                                options: [
                                          {
                                              text: '同意',
                                              value: '同意'
                                          },
                                          {
                                        	  text: '不属于三包范围器件，机械部件由TS单出来',
                                        	  value: '不属于三包范围器件，机械部件由TS单出来'
                                          },
                                          {
                                        	  text: '此工号超出三包期，不提供无偿三包',
                                        	  value: '此工号超出三包期，不提供无偿三包'
                                          },
                                          {
                                        	  text: '器件烧毁损坏不能三包',
                                        	  value: '器件烧毁损坏不能三包'
                                          },
                                          {
                                        	  text: '器件属于一体化不能拆件三包',
                                        	  value: '器件属于一体化不能拆件三包'
                                          },
                                          {
                                        	  text: '三包单部件信息填写错误，请查看装箱清单或设计书',
                                        	  value: '三包单部件信息填写错误，请查看装箱清单或设计书'
                                          },
                                          {
                                        	  text: '部件编码信息与出厂记录不符',
                                        	  value: '部件编码信息与出厂记录不符'
                                          },
                                          {
                                        	  text: '填写的信息不完整，不能查出部件型号',
                                        	  value: '填写的信息不完整，不能查出部件型号'
                                          },
                                          {
                                        	  text: '不属于三包范围器件，全进口梯由TS单转日本专家处理',
                                        	  value: '不属于三包范围器件，全进口梯由TS单转日本专家处理'
                                          },
                                          {
                                        	  text: '其他，见意见栏',
                                        	  value: '其他，见补充意见栏'
                                          },
                                      ]
                            },
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '以上由品证部填写',
                        items: [
                                {
                                    xtype: 'selectfield',
                                    label: '同意三包',
                                    labelWidth: '40%',
                                    id: 'isagree2',
                                    options: [
                                              {
                                                  text: '是',
                                                  value: '是'
                                              },
                                              {
                                            	  text: '否',
                                            	  value: '否'
                                              },
                                          ]
                                },
                                {
                                    xtype: 'selectfield',
                                    label: '发货方式',
                                    labelWidth: '40%',
                                    id: 'ffway',
                                    options: [
                                              {
                                                  text: '非空运',
                                                  value: '非空运'
                                              },
                                              {
                                            	  text: '空运',
                                            	  value: '空运'
                                              },
                                          ]
                                },
                                {
                                    xtype: 'selectfield',
                                    label: '是否写数',
                                    labelWidth: '40%',
                                    id: 'isxs',
                                    options: [
                                              {
                                                  text: '是',
                                                  value: '是'
                                              },
                                              {
                                            	  text: '否',
                                            	  value: '否'
                                              },
                                          ]
                                },
                                {
                                    xtype: 'textfield',
                                    label: '物资代码',
                                    labelWidth: '40%',
                                    id: 'wzcode',
                                    required: true,
                                    placeHolder: '请输入物资代码'
                                },
                                {
                                    xtype: 'textfield',
                                    label: '图纸代码',
                                    labelWidth: '40%',
                                    id: 'mapno',
                                    required: true,
                                    placeHolder: '请输入图纸代码'
                                },
                                {
                                    xtype: 'selectfield',
                                    label: '三包备件',
                                    labelWidth: '40%',
                                    id: 'issb',
                                    options: [
                                              {
                                                  text: '备件',
                                                  value: '备件'
                                              },
                                              {
                                            	  text: '新件',
                                            	  value: '新件'
                                              },
                                          ]
                                },
                                {
                                    xtype: 'textfield',
                                    label: '发货部门',
                                    labelWidth: '40%',
                                    id: 'worktel2',
                                    placeHolder: '请输入发货部门'
                                },
                                {
                                	xtype: 'textfield',
                                	label: '产品所属供应商',
                                	labelWidth: '40%',
                                	id: 'drawno',
                                	placeHolder: '请输入产品所属供应商'
                                },
                                {
                                    xtype: 'autoTextArea',
                                    label: '退件地址',
                                    labelWidth: '40%',
                                    id: 'tjaddr',
                                    required: true,
                                    placeHolder: '请输入提供退件地址、联系人'
                                }
                            ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '以上由品证部填写',
                        items: [
                            {
                                xtype: 'selectfield',
                                label: '是否下计划',
                                labelWidth: '40%',
                                id: 'isneedtocreate',
                                options: [
                                          {
                                              text: '不需要',
                                              value: '不需要'
                                          },
                                          {
                                        	  text: '需要',
                                        	  value: '需要'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                label: '发货单位',
                                labelWidth: '40%',
                                id: 'fhdw',
                                options: [
                                          {
                                              text: '广州工厂',
                                              value: '广州工厂'
                                          },
                                          {
                                        	  text: '上海工厂',
                                        	  value: '上海工厂'
                                          },
                                          {
                                        	  text: '天津工厂',
                                        	  value: '天津工厂'
                                          },
                                          {
                                        	  text: '日滨公司',
                                        	  value: '日滨公司'
                                          },
                                          {
                                        	  text: '日立电机',
                                        	  value: '日立电机'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                label: '运输方式',
                                labelWidth: '40%',
                                id: 'ffway2',
                                options: [
                                          {
                                              text: '非空运',
                                              value: '非空运'
                                          },
                                          {
                                        	  text: '空运',
                                        	  value: '空运'
                                          },
                                      ]
                            },
                            {
                                xtype: 'textfield',
                                label: '物流公司',
                                labelWidth: '40%',
                                id: 'wlcom',
                                placeHolder: '请输入物流公司'
                            },
                            {
                                xtype: 'textfield',
                                label: '发货单号',
                                labelWidth: '40%',
                                id: 'sersendno',
                                placeHolder: '请输入三包件发货单号'
                            },
                            {
                                xtype: 'textfield',
                                label: '发货时间',
                                labelWidth: '40%',
                                id: 'sersenddate',
                                placeHolder: '点击设置时间',
                                readOnly:true,
                                listeners:{
                                	focus:function(){
                                		initDate2('sersenddate','三包件发货时间');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                label: '出厂编号',
                                labelWidth: '40%',
                                id: 'newno',
                                placeHolder: '请输入新件出厂编号'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '以上由物流管理科填写',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '旧件发货单号',
                                labelWidth: '40%',
                                id: 'oldno',
                                placeHolder: '请输入旧件退还发货单号'
                            },
                            {
                                xtype: 'textfield',
                                label: '还发货时间',
                                labelWidth: '40%',
                                id: 'oldreturndate',
                                placeHolder: '点击设置时间',
                                readOnly:true,
                                listeners:{
                                	focus:function(){
                                		initDate2('oldreturndate','旧件还发货时间');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                label: '旧件出厂编号',
                                labelWidth: '40%',
                                id: 'oldreturnno',
                                placeHolder: '请输入退还旧件出厂编号'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '以上由三包申请报告人填写',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '旧件入仓单号',
                                labelWidth: '40%',
                                id: 'oldbackno',
                                placeHolder: '请输入旧件退还入仓单号'
                            },
                            {
                                xtype: 'textfield',
                                label: '入仓时间',
                                labelWidth: '40%',
                                id: 'oldbackdate',
                                readOnly:true,
                            	placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('oldbackdate','旧件退还入仓时间');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                label: '旧件出厂编号',
                                labelWidth: '40%',
                                id: 'oldoutno',
                                placeHolder: '请输入实物旧件出厂编号'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '以上由物流管理科填写',
                        items: [
                            {
                                xtype: 'selectfield',
                                label: '旧件编号一致',
                                labelWidth: '40%',
                                id: 'isyz2',
                                options: [
                                          {
                                              text: '是',
                                              value: '是'
                                          },
                                          {
                                        	  text: '否',
                                        	  value: '否'
                                          },
                                      ]
                            },
                            {
                                xtype: 'selectfield',
                                label: '责任判断',
                                labelWidth: '40%',
                                id: 'judge',
                                options: [
                                          {
                                              text: '产品质量问题',
                                              value: '产品质量问题'
                                          },
                                          {
                                        	  text: '工程现场责任',
                                        	  value: '工程现场责任'
                                          },
                                          {
                                        	  text: '其他责任',
                                        	  value: '其他责任'
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
                                    	id: 'createbypda',
                                    	name: 'createbypda',
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
                                    	id: 'depid',
                                    	name: 'depid',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'userid',
                                    	name: 'userid',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'type',
                                    	name: 'type',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'username',
                                    	name: 'username',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'node',
                                    	name: 'node',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'ctime',
                                    	name: 'ctime',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'piid',
                                    	name: 'piid',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'processname',
                                    	name: 'processname',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'curauthor',
                                    	name: 'curauthor',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'dealmen',
                                    	name: 'dealmen',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'ygbh',
                                    	name: 'ygbh',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'form',
                                    	name: 'form',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'arcpath',
                                    	name: 'arcpath',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'arcdate',
                                    	name: 'arcdate',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'endprocessdate',
                                    	name: 'endprocessdate',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'fpzr',
                                    	name: 'fpzr',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'checkatt',
                                    	name: 'checkatt',
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
                                    	id: 'qtpart',
                                    	name: 'qtpart',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'pi_flag',
                                    	name: 'pi_flag',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'cfg_id',
                                    	name: 'cfg_id',
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'createflag',
                                    	name: 'createflag',
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
                                    },
                                    {
                                    	xtype: 'textfield',
                                    	id: 'fnextprocess',
                                    	name: 'fnextprocess',
                                    },
                                    
                                    
                                ]
                            }
                        ]
                    },
                ]
            }
        ]
    }

});