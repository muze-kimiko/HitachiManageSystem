Ext.define('HelcOA.view.ForApprovalProcess.ProposalManage.PM_TAGLLC_NG', {
    extend: 'Ext.Panel',
    id:'sp_PM_TAGLLC_NG_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.field.TextArea',
        'Ext.field.Number'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '提案处理流程',
                id:'surface_ID',
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
                            	xtype: 'selectfield',
                            	label: '提案处理流程',
                            	labelWidth: '40%',
                            	id:'cheoss',
                            	placeHolder: '请选择',
                            	options: [
                            	          {
                            	        	  text: '请选择',
                            	        	  value: '请选择'
                            	          },
                                          {
                                          	text: '送交相关部门负责人',
                                              value: '送交相关部门负责人'
                                          },
                                          {
                                              text: '返回报告人处理',
                                              value: '返回报告人处理'
                                          }
                                      ],
                            },
                            {
                                xtype: 'textfield',
                                label: '序号',
                                labelWidth: '40%',
                                name: 'fileno',
                                id:'fileno',
                                readOnly:true,
                                placeHolder: '请输入序号'
                            },
                            {
                                xtype: 'textfield',
                                label: '起草人姓名',
                                labelWidth: '40%',
                                name: 'agentman',
                                id:'agentman',
                                readOnly:true,
                                placeHolder: '请输入起草人姓名'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '提案人填写部分',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '员工编号',
                                labelWidth: '40%',
                                id:'no',
                                required: true,
                                placeHolder: '请输入员工编号'
                            },
                            {
                                xtype: 'textfield',
                                label: '姓名',
                                labelWidth: '40%',
                                name: 'sname',
                                readOnly:true,
                                id:'sname',
                                required: true,
                                placeHolder: '请输入提案人姓名'
                            },
                            {
                                xtype: 'textfield',
                                label: '提交日期',
                                labelWidth: '40%',
                                readOnly:true,
                                name: 'createdate',
                                id:'createdate',
                                placeHolder: '请选择提交日期',
                            },
                            {
                                xtype: 'textfield',
                                label: '公司名',
                                labelWidth: '40%',
                                readOnly:true,
                                name: 'gsm',
                                id:'gsm',
                                placeHolder: '请输入公司名'
                            },
                            {
                                xtype: 'textfield',
                                label: '总部',
                                labelWidth: '40%',
                                readOnly:true,
                                id:'dep',
                                name: 'dep',
                                placeHolder: '请输入提案人所属总部'
                            },
                            {
                                xtype: 'textfield',
                                label: '部',
                                readOnly:true,
                                labelWidth: '40%',
                                id:'dep2',
                                name: 'dep2',
                                placeHolder: '请输入部'
                            },
                            {
                                xtype: 'textfield',
                                label: '科',
                                labelWidth: '40%',
                                id:'dep3',
                                readOnly:true,
                                name: 'dep3',
                                placeHolder: '请输入科'
                            },
                            {
                                xtype: 'textfield',
                                label: '联系电话',
                                labelWidth: '40%',
                                id:'tel',
                                name: 'tel',
                                required: true,
                                placeHolder: '请输入提案人联系电话'
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'autoTextArea',
                                        id:'hzr',
                                        width: '85%',
                                        labelWidth: '48%',
                                        label: '合作人员',
                                        readOnly:true,
                                        placeHolder: '请选择合作人员'
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'seluser71',
                                        height: 41,
                                        style: 'border:0;',
                                        width: '15%',
                                        iconCls: 'search',
                                        text: '',
                                        listeners:{
                                        	tap:function(){
                                        		object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('hzr');
                                        	}
                                        }
                                    }
                                ]
							},
							{
                                xtype: 'textfield',
                                label: '提案来源',
                                labelWidth: '40%',
                                id:'taly',
                                name: 'taly',
                                placeHolder: '请输入提案来源'
                            },
                            {
                                xtype: 'selectfield',
                                label: '提案类型',
                                labelWidth: '40%',
                                id:'titype',
                                name: 'titype',
                                options: [
                                    {
                                    	text: '日常提案',
                                        value: '日常提案'
                                    },
                                    {
                                        text: '专题提案',
                                        value: '专题提案'
                                    }
                                ],
                                listeners:{
                              	  change:function(select,newValue,oldValue){
                              		  if(newValue=='专题提案'){
                              			  Ext.getCmp('zhuanti').setHidden(false);
                              		  }else{
                              			  Ext.getCmp('zhuanti').setHidden(true);
                              		  }
                              	  }
                                }
                            },
                            {
                                xtype: 'selectfield',
                                hidden :true,
                                label: '选择专题',
                                labelWidth: '40%',
                                id:'zhuanti',
                                name: 'zhuanti',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
										  {
										      text: '精益求精,创造更可靠扶梯',
										      value: '精益求精，创造更可靠扶梯'
										  },
                                          {
                                          	text: '上海工厂质量月活动日之质量改进',
                                              value: '上海工厂质量月活动日之质量改进'
                                          },
                                          {
                                              text: '建设低碳企业，推动清洁发展',
                                              value: '建设低碳企业，推动清洁发展'
                                          }
                                      ],
                            },
                            /*{
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    align: 'start',
                                    pack: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'button',
                                        margin: 10,
                                        width: 120,
                                        text: '拍照'
                                    },
                                    {
                                        xtype: 'button',
                                        margin: 10,
                                        width: 120,
                                        text: '浏览'
                                    }
                                ]
                            }*/
                        ]
                    },
                    {
                        xtype: 'textfield',
                        label: '提案名称',
                        labelWidth: '40%',
                        name: 'subject',
                        id:'subject',
                        required: true,
                        placeHolder: '请输入提案名称'
                    },
                    {
                        xtype: 'fieldset',
                        title: '提案内容',
                        items: [
                            {
                                xtype: 'textareafield',
                                label: '现状',
                                labelWidth: '40%',
                                name:'xzzy_textarea',
                                id:'xzzy_textarea',
                                required: true,
                                placeHolder: '请输入现状摘要'
                            },
                            {
                                xtype: 'textareafield',
                                label: '改善措施',
                                labelWidth: '40%',
                                id:'gszy_textarea',
                                name: 'gszy_textarea',
                                required: true,
                                placeHolder: '请输入改善措施摘要'
                            },
                            {
                                xtype: 'textareafield',
                                label: '效果预估',
                                labelWidth: '40%',
                                id:'xgzy_textarea',
                                name: 'xgzy_textarea',
                                required: true,
                                placeHolder: '请输入效果预估摘要'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '员工关系科意见',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '提案类别',
                                labelWidth: '40%',
                                id:'leibie',
                                name: 'leibie',
                                placeHolder: '请选择提案类别',
                               
                            },
                            {
                                xtype: 'selectfield',
                                label: '提交形式',
                                labelWidth: '40%',
                                id:'xingshi',
                                name: 'xingshi',
                                placeHolder: '请选择提交形式',
                                options: [
										  {
										      text: '书面',
										      value: '书面'
										  },
                                          {
                                          	text: '电子表格',
                                              value: '电子表格'
                                          },
                                      ],
                            },
                            {
                                xtype: 'textfield',
                                label: '收到日期',
                                labelWidth: '40%',
                                id:'riqi1',
                                name: 'riqi1',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('riqi1','收到日期');
                                	}
                                }
                            },
                            {
                                xtype: 'selectfield',
                                label: '评价',
                                labelWidth: '40%',
                                id:'ishg',
                                name: 'ishg',
                                options: [
                                          {
                                        	  text: '请选择',
                                        	  value: ''
                                          },
                                          {
                                          	text: '合格',
                                              value: '合格'
                                          },
                                           {
                                              text: '不合格',
                                              value: '不合格'
                                          },
                                          {
                                              text: '合格采纳',
                                              value: '合格采纳'
                                          },
                                          {
                                              text: '合格并结束流转',
                                              value: '合格并结束流转'
                                          }
                                      ],
                            },
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '受理部门意见',
                        items: [
                           {
                        	   xtype: 'fieldset',
                        	   title: '相关职能部门意见(3个工作日内)',
                               items: [
									{
										xtype: 'selectfield',
									    label: '部门负责人意见',
									    labelWidth: '40%',
									    id: 'iscn1',
									    options: [
								             {
								            	 text: '请选择',
								            	 value: ''
								             },
		                                     {
		                                         text: '采纳',
		                                         value: '采纳'
		                                     },
		                                     {
		                                    	 text: '需要本部门同事进行可行性分析',
		                                         value: '需要本部门同事进行可行性分析'
		                                     },
		                                     {
		                                         text: '不采纳或需领导决策(请转直属领导进行复核，要求部长或部长以上人员)',
		                                         value: '不采纳或需领导决策(请转直属领导进行复核，要求部长或部长以上人员)'
		                                     },
		                                 ],
	                                      listeners:{
	                                    	  change:function(select,newValue,oldValue){
	                                    		  if(newValue=='采纳'){
	                                    			  Ext.getCmp('ssyPanel').setHidden(false);
	                                    		  }else{
	                                    			  Ext.getCmp('ssyPanel').setHidden(true);
	                                    		  }
	                                    	  }
	                                      }
									},
									{
		                                xtype: 'panel',
		                                id: 'ssyPanel',
		                                layout: 'hbox',
		                                items: [
		                                    {
		                                        xtype: 'autoTextArea',
		                                        id:'ssy',
		                                        width: '85%',
		                                        labelWidth: '48%',
		                                        label: '实施人',
		                                        readOnly:true,
		                                    },
		                                    {
		                                        xtype: 'button',
		                                        id: 'seluser198',
		                                        height: 41,
		                                        style: 'border:0;',
		                                        width: '15%',
		                                        iconCls: 'search',
		                                        text: '',
		                                        listeners:{
		                                        	tap:function(){
		                                        		object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('ssy');
		                                        	}
		                                        }
		                                    }
		                                ]
									},
                               ]
                           },
                           {
                        	   xtype: 'fieldset',
                        	   title: '直属领导意见',
                               items: [
									{
										xtype: 'selectfield',
									    label: '是否采纳',
									    labelWidth: '40%',
									    id: 'iscn',
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
		                                     },
		                                 ],
									},
                               ]
                           },
	                        
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '员工关系科意见',
                        items: [
							{
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'autoTextArea',
                                        id:'xmzrr',
                                        width: '85%',
                                        labelWidth: '48%',
                                        label: '项目责任人',
                                        readOnly:true,
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'seluser712',
                                        height: 41,
                                        style: 'border:0;',
                                        width: '15%',
                                        iconCls: 'search',
                                        text: '',
                                        listeners:{
                                        	tap:function(){
                                        		object.getApplication().getController('PublicPersonnelSelectionC').selectPerson('xmzrr');
                                        	}
                                        }
                                    }
                                ]
							},
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '实施部门意见',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: '实施责任人实施成果描述',
                                items: [
                                    {
                                        xtype: 'autoTextArea',
                                        id: 'gsqzy',
                                        label: '改善前',
                                        labelWidth: '40%',
                                        name: 'gsqzy',
                                        placeHolder: '请输入改善前摘要'
                                    },
                                    {
                                        xtype: 'autoTextArea',
                                        id: 'gsqzy1',
                                        label: '改善后',
                                        labelWidth: '40%',
                                        name: 'gsqzy1',
                                        placeHolder: '请输入改善后摘要'
                                    },
                                    {
                                        xtype: 'autoTextArea',
                                        id: 'gsqzy2',
                                        label: '投入成本',
                                        labelWidth: '40%',
                                        placeHolder: '请输入投入成本摘要'
                                    },
                                    {
                                        xtype: 'autoTextArea',
                                        id: 'gsqzy3',
                                        label: '实际经济效益',
                                        labelWidth: '40%',
                                        placeHolder: '请输入实际经济效益摘要'
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                title: '部门提案批审小组组长评级',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id: 'fena',
                                        label: '效益状况A',
                                        labelWidth: '40%',
                                        name: 'A',
                                        placeHolder: '请输入效益状况A评分'
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'fenb',
                                        label: '效益状况B',
                                        labelWidth: '40%',
                                        name: 'B',
                                        placeHolder: '请输入效益状况B评分'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '技术性',
                                        labelWidth: '40%',
                                        id: 'jsx',
                                        placeHolder: '请输入技术性评分'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '创新性',
                                        labelWidth: '40%',
                                        id: 'cxx',
                                        placeHolder: '请输入创新性评分'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '研究难度',
                                        labelWidth: '40%',
                                        id: 'yjnd',
                                        placeHolder: '请输入研究难度评分'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '实用性',
                                        labelWidth: '40%',
                                        id: 'syx',
                                        placeHolder: '请输入实用性评分'
                                    },
                                    {
                                        xtype: 'numberfield',
                                        label: '总分',
                                        labelWidth: '40%',
                                        id: 'zongfen',
                                        readOnly:true,
                                        placeHolder: '系统自动生成'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: '等级',
                                        labelWidth: '40%',
                                        id: 'pingji',
                                        readOnly:true,
                                        placeHolder: '系统自动生成'
                                    }
                                ]
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
								id: 'needzc',
								name: 'needzc'
							},
							{
								xtype: 'textfield',
								id: 'endprocessdate',
								name: 'endprocessdate'
							},
							{
								xtype: 'textfield',
								id: 'dept',
								name: 'dept'
							},
							{
								xtype: 'textfield',
								id: 'idea',
								name: 'idea'
							},
							{
								xtype: 'textfield',
								id: 'ext1',
								name: 'ext1'
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
								id: 'audit_list',
								name: 'audit_list'
							},
							{
								xtype: 'textfield',
								id: 'managermen',
								name: 'managermen'
							},
							{
								xtype: 'textfield',
								id: 'mast',
								name: 'mast'
							},
                        ]
                    },
                ]
            }
        ]
    }

});