Ext.define('HelcPAD.view.OaMobileOffice.ElectronicProcess.ReceptionCustomers.CustomerReception', {
    extend: 'Ext.Panel',
    id: 'oa_customerReception_id',
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
                id: 'qc_surface_ID',
                docked: 'top',
                title: '接待客户工作联络流程',
                items: [
                    {
                    	xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        id: 'customerreception_id_FH'
                    },
                    {
                        xtype: 'spacer'
                    },{
                        text: '下一步',
                        id:'customerreception_id_XYB',
                        handler: function() {
                            Ext.Viewport.removeMenu('right');
                        }
                    },
//                    {
//                        xtype: 'button',
//                        handler: function(button, e) {
//                            var menu = Ext.create('Ext.Menu', {
//                                items: [
//                                {
//                                	text: '下一步',
//                                    id: 'qc_ToSelectNode',
//                                    handler: function() {
//                                        Ext.Viewport.removeMenu('right');
//                                    }
//                                },
//                                {
//                                    text: '保存',
//                                    handler: function() {
//                                        Ext.Viewport.removeMenu('right');
//                                    }
//                                },
//                                {
//                                    text: '意见',
//                                    handler: function() {
//                                        Ext.Viewport.removeMenu('right');
//                                    }
//                                }
//                                ]
//                            });
//
//                            Ext.Viewport.setMenu(menu, {
//                                side: 'right',
//                                reveal: false
//                            });
//
//                            Ext.Viewport.showMenu('right');
//                        },
//                        itemId: 'mybutton11',
//                        iconCls: 'more'
//                    }
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                id: 'fp',
                items: [
                    {
                        xtype: 'fieldset',
                        instructions: '注意：如果是分公司员工起草此流程请在提交流程时选择直系领导为当前公司总经理',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'fileno',
                                label: '编号',
                                labelWidth: '40%',
                                placeHolder: '请输入编号'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'ccompany',
                                label: '来访单位',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入来访单位'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'num',
                                label: '人数',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入来访人数'
                            },
                            {
                                xtype: 'textfield',
                                id: 'company',
                                label: '所属公司',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入所属公司'
                            },
                            {
                                xtype: 'textfield',
                                id: 'subject',
                                label: '项目名称',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入项目名称'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '来访客户1信息',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'lfkh',
                                labelWidth: '40%',
                                label: '姓名',
                                required: true,
                                placeHolder: '请输入姓名'
                            },
                            {
                                xtype: 'textfield',
                                id: 'zw',
                                labelWidth: '40%',
                                label: '职务',
                                required: true,
                                placeHolder: '请输入职务'
                            },
                            {
                                xtype: 'textfield',
                                id: 'tel',
                                labelWidth: '40%',
                                label: '电话',
                                required: true,
                                placeHolder: '请输入电话'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '来访客户2信息',
                        items: [
                                {
                                    xtype: 'textfield',
                                    id: 'lfkh1',
                                    labelWidth: '40%',
                                    label: '姓名',
                                    placeHolder: '请输入姓名'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'zw1',
                                    labelWidth: '40%',
                                    label: '职务',
                                    placeHolder: '请输入职务'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'tel1',
                                    labelWidth: '40%',
                                    label: '电话',
                                    placeHolder: '请输入电话'
                                }
                            ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '来访客户3信息',
                        items: [
                                {
                                    xtype: 'textfield',
                                    id: 'lfkh2',
                                    labelWidth: '40%',
                                    label: '姓名',
                                    placeHolder: '请输入姓名'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'zw2',
                                    labelWidth: '40%',
                                    label: '职务',
                                    placeHolder: '请输入职务'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'tel2',
                                    labelWidth: '40%',
                                    label: '电话',
                                    placeHolder: '请输入电话'
                                }
                            ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'pt',
                                label: '陪同人员',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入陪同人员姓名'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'dh',
                                label: '电话',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入陪同人员电话'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'qtqk',
                                label: '签梯情况',
                                labelWidth: '40%',
                                placeHolder: '请选择签梯情况',
                                options: [
                                    {
                                        text: '已签约',
                                        value: '已签约'
                                    },
                                    {
                                        text: '跟踪中',
                                        value: '跟踪中'
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'autoTextArea',
                                        id:'yyy',
                                        width: '85%',
                                        labelWidth: '48%',
                                        label: '营业员',
                                        readOnly:true,
                                        required: true,
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'seluser244',
                                        height: 41,
                                        style: 'border:0;',
                                        width: '15%',
                                        iconCls: 'search',
                                        text: '',
                                        listeners:{
                                        	tap:function(){
                                        		object.getApplication().getController('OaMobileOffice.ElectronicProcess.ReceptionCustomers.PublicPersonnelSelectionC').selectPerson('yyy');
                                        	}
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'ssqy',
                                label: '所在区域',
                                labelWidth: '40%',
                                placeHolder: '请选择所在区域',
                                options: [
                                    {
                                        text: '营业部',
                                        value: '营业部'
                                    },
                                    {
                                        text: '营分司',
                                        value: '营分司'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '接待内容',
                        items: [
                            {
                                xtype: 'selectfield',
                                id: 'isneed1',
                                label: '接站',
                                labelWidth: '40%',
                                placeHolder: '接站',
                                options: [
                                    {
                                        text: '要',
                                        value: '要'
                                    },
                                    {
                                        text: '不要',
                                        value: '不要'
                                    }
                                ]
                            },
                            {
                                xtype: 'textfield',
                                id: 'jdate',
                                label: '接站日期',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('jdate','接站日期');
                                	}
                                }
                            },
//                            {
//                                xtype: 'selectfield',
//                                id: 'isneed1',
//                                label: '接机牌',
//                                labelWidth: '40%',
//                                placeHolder: '接机牌',
//                                options: [
//                                    {
//                                        text: '要',
//                                        value: '要'
//                                    },
//                                    {
//                                        text: '不要',
//                                        value: '不要'
//                                    }
//                                ]
//                            },
                            {
                                xtype: 'textfield',
                                id: 'hb',
                                labelWidth: '40%',
                                label: '航班',
                                placeHolder: '请输入班次'
                            },
                            {
                                xtype: 'textfield',
                                id: 'stime',
                                label: '起飞时间',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('stime','起飞时间');
                                	}
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'etime',
                                label: '到达时间',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('etime','到达时间');
                                	}
                                }
                            
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '参观工厂',
                        items: [
                            {
                                xtype: 'selectfield',
                                id: 'isneed2',
                                label: '参观',
                                labelWidth: '40%',
                                placeHolder: '请选择是否参观工厂',
                                options: [
                                    {
                                	    text: '不要',
                                	    value: '不要'
                                    },
                                    {
                                        text: '要',
                                        value: '要'
                                    }
                                ]
                            },
                            {
                                xtype: 'textfield',
                                id: 'cdate',
                                label: '开始时间',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('cdate','参观工厂开始');
                                	}
                                }
                            
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'time2',
                            	label: '结束时间',
                            	labelWidth: '40%',
                            	dateFormat: 'Y-m-d',
                            	readOnly:true,
                            	placeHolder: '点击设置时间',
                            	listeners:{
                            		focus:function(){
                            			initDate2('time2','参观工厂结束');
                            		}
                            	}
                            
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '参观总部',
                        items: [
                            {
                                xtype: 'selectfield',
                                id: 'isneed3',
                                label: '参观',
                                labelWidth: '40%',
                                placeHolder: '请选择是否参观总部',
                                options: [
                                      {
                                  	    text: '不要',
                                  	    value: '不要'
                                      },
                                      {
                                          text: '要',
                                          value: '要'
                                      }
                                  ]
                            },
                            {
                                xtype: 'textfield',
                                id: 'czdate',
                                label: '开始时间',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('czdate','参观总部开始');
                                	}
                                }
                            
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'time3',
                            	label: '结束时间',
                            	labelWidth: '40%',
                            	dateFormat: 'Y-m-d',
                            	readOnly:true,
                            	placeHolder: '点击设置时间',
                            	listeners:{
                            		focus:function(){
                            			initDate2('time3','参观总部结束');
                            		}
                            	}
                            
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '参观工程本部',
                        items: [
                            {
                                xtype: 'selectfield',
                                id: 'isneed4',
                                label: '参观',
                                labelWidth: '40%',
                                placeHolder: '请选择是否参观工程本部',
                                options: [
                                      {
                                  	    text: '不要',
                                  	    value: '不要'
                                      },
                                      {
                                          text: '要',
                                          value: '要'
                                      }
                                  ]
                            },
                            {
                                xtype: 'textfield',
                                id: 'ycdate',
                                label: '开始时间',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('ycdate','参观工程本部开始');
                                	}
                                }
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'time4',
                            	label: '结束时间',
                            	labelWidth: '40%',
                            	dateFormat: 'Y-m-d',
                            	readOnly:true,
                            	placeHolder: '点击设置时间',
                            	listeners:{
                            		focus:function(){
                            			initDate2('time4','参观工程本部结束');
                            		}
                            	}
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '安排住宿',
                        items: [
                            {
                                xtype: 'selectfield',
                                id: 'isneed5',
                                label: '安排住宿',
                                labelWidth: '40%',
                                placeHolder: '请选择是否安排住宿',
                                options: [
                                      {
                                  	    text: '不要',
                                  	    value: '不要'
                                      },
                                      {
                                          text: '要',
                                          value: '要'
                                      }
                                  ]
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'autoTextArea',
                                        id:'sendreader',
                                        width: '85%',
                                        labelWidth: '48%',
                                        label: '订房人员',
                                        readOnly:true,
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'seluser4162',
                                        height: 41,
                                        style: 'border:0;',
                                        width: '15%',
                                        iconCls: 'search',
                                        text: '',
                                        listeners:{
                                        	tap:function(){
                                        		object.getApplication().getController('OaMobileOffice.ElectronicProcess.ReceptionCustomers.PublicPersonnelSelectionC').selectPerson('sendreader');
                                        	}
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'textfield',
                                id: 'hotel',
                                label: '宾馆名称',
                                labelWidth: '40%',
                                placeHolder: '请输入宾馆名称'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'room',
                                label: '入住数',
                                labelWidth: '40%',
                                placeHolder: '请输入标准入住数'
                            },
                            {
                                xtype: 'textfield',
                                id: 'ycdate1',
                                label: '入住时间',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                readOnly:true,
                                placeHolder: '点击设置时间',
                                listeners:{
                                	focus:function(){
                                		initDate2('ycdate1','入住时间');
                                	}
                                }
                            },
                            {
                            	xtype: 'textfield',
                            	id: 'ycdate2',
                            	label: '退房时间',
                            	labelWidth: '40%',
                            	dateFormat: 'Y-m-d',
                            	readOnly:true,
                            	placeHolder: '点击设置时间',
                            	listeners:{
                            		focus:function(){
                            			initDate2('ycdate2','退房时间');
                            		}
                            	}
                            },
                            {
                            	xtype: 'textnumfield',
                            	id: 'typeq1',
                            	labelWidth: '40%',
                            	label: '型号台数',
                            	required: true,
                            	placeHolder: '请输入拟选型号台数',
                            },
                            {
                            	xtype: 'autoTextArea',
                            	id: 'call_textarea',
                            	labelWidth: '40%',
                            	label: '其它要求',
                            	placeHolder: '请输入其它接待要求',
                            },
                            {
                                xtype: 'autoTextArea',
                                id: 'hbthing_textarea',
                                labelWidth: '40%',
                                label: '需回避',
                                placeHolder: '请输入需回避事项',
                            },
                            {
                                xtype: 'textfield',
                                id: 'zftype',
                                labelWidth: '40%',
                                placeHolder: '请输入费用支付方式',
                                label: '支付方式'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                id:'agentman',
                                label: '申请人',
                                labelWidth: '40%',
                                placeHolder: '请输入申请人'
                            },
                            {
                                xtype: 'textfield',
                                id: 'time',
                                label: '申请时刻',
                                labelWidth: '40%',
                                placeHolder: '点击设置时间',
                                readOnly:true,
                                listeners:{
                                	focus:function(){
                                		initDate(Ext.getCmp('time').getValue(),'申请日期','createdate');
                                	}
                                }
                            },
                            {
                                xtype: 'selectfield',
                                id: 'sendmobile',
                                label: '短息通知',
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
                                xtype: 'textfield',
                                id: 'sendnumber',
                                labelWidth: '40%',
                                label: '手机号码',
                                placeHolder: '请输入手机号码',
                                disabled:true
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '接送人信息',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'jsname',
                                labelWidth: '40%',
                                label: '姓名',
                                placeHolder: '请输入接送人姓名'
                            },
                            {
                                xtype: 'textfield',
                                id: 'cphao',
                                labelWidth: '40%',
                                label: '车牌号',
                                placeHolder: '请输入车牌号'
                            },
                            {
                                xtype: 'textfield',
                                id: 'slname',
                                labelWidth: '40%',
                                label: '受理人',
                                placeHolder: '请输入受理人'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'lxtel',
                                labelWidth: '40%',
                                label: '电话',
                                placeHolder: '请输入接送人电话'
                            },
                            {

                            	xtype: 'textfield',
                            	id: 'ccdate',
                            	label: '出车日期',
                            	labelWidth: '40%',
                            	dateFormat: 'Y-m-d',
                            	readOnly:true,
                            	placeHolder: '点击设置时间',
                            	listeners:{
                            		focus:function(){
                            			initDate2('ccdate','出车日期');
                            		}
                            	}
                            },
                            {
                                xtype: 'textfield',
                                id: 'didian',
                                labelWidth: '40%',
                                placeHolder: '请输入出车地点',
                                label: '出车地点'
                            },
                            {

                            	xtype: 'textfield',
                            	id: 'sltime',
                            	label: '出车时间',
                            	labelWidth: '40%',
                            	dateFormat: 'Y-m-d',
                            	readOnly:true,
                            	placeHolder: '点击设置时间',
                            	listeners:{
                            		focus:function(){
                            			initDate2('sltime','出车时间');
                            		}
                            	}
                            },
                            {
                                xtype: 'textfield',
                                id: 'lxr',
                                labelWidth: '40%',
                                label: '联系人',
                                placeHolder: '请输入联系人姓名'
                            },
                            {
                                xtype: 'textnumfield',
                                id: 'lxrdh',
                                labelWidth: '40%',
                                label: '电话',
                                placeHolder: '请输入联系人电话'
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
                            	id: 'dept',
                            	name: 'dept'
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
                                id: 'mast',
                                name: 'mast'
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
        ]
    }

});