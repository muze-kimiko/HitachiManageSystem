Ext.define('HelcPDA.view.ProductCertificate.Renovate_Project_Detl', {
    extend: 'Ext.Panel',
    id: 'Renovate_Project_Detl_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Select'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '品证整改',
                items: [
                    {
                        xtype: 'button',
//                        id: 'Renvate_p_back',
                        ui: 'back',
                        text: '返回',
                        listeners:{
                        	tap:function(){
                        		objj.getApplication().getController('ProductCertificate.Renovate_Project_List_Ctrl').Renvate_p_back();
                        	}
                        }
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id:'menu_button',
                        handler: function(button, e) {
                            var menu = Ext.create('Ext.Menu', {
                            	items: [
                            	        {
                            	        	xtype: 'button',
                                            id: 'Commit_Renovate_Project',
                                            text: '提交',
                                            handler: function() {
                                                Ext.Viewport.removeMenu('right');
                                            }
                            	        },
                            	        {
                            	        	xtype: 'button',
                            	        	id: 'Forward_Renovate_Project',
                            	        	text: '转派',
                            	        	handler: function() {
                                                Ext.Viewport.removeMenu('right');
                                            }
                            	        }
                                ]
                            });
                            

                            Ext.Viewport.setMenu(menu, {
                                side: 'right',
                                reveal: false
                            });

                            Ext.Viewport.showMenu('right');

                        },
                        iconCls: 'more',
                        text: ''
                    }
                ]
            },
            {
                xtype: 'formpanel',
                height: '100%',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '详细信息',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'RP_ELEVATOR_NO',
                                label: '工号',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                id: 'RP_CONTRACT_NO',
                                label: '合同号',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                                xtype: 'autoTextArea',
                                id: 'RP_FINAL_USE_UNIT',
                                label: '使用单位',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                                xtype: 'autoTextArea',
                                id: 'RP_ELEVATOR_TYPE_NAME',
                                label: '梯种',
                                labelWidth: '40%',
                                readOnly: true
                            },
//                            {
//                                xtype: 'textfield',
//                                label: '作业人员',
//                                labelWidth: '40%',
//                                readOnly: true
//                            },
//                            {
//                                xtype: 'textfield',
//                                label: '实际作业人员',
//                                labelWidth: '40%',
//                                placeHolder: '请输入实际工作人员'
//                            },
                            {
                            	xtype:'hiddenfield',
                            	id:'RP_LineStore_index'
                            },
                            {
                                xtype:'hiddenfield',
                                id:'RP_ELV_RENOVATE__ENTER_DATE'
                            },
                            {
                            	xtype:'hiddenfield',
                            	id:'RP_WORK_PERSON_NUM'
                            },
                            {
                            	xtype:'hiddenfield',
                            	id:'RP_ACTUAL_WORK_PERSON_NUM'
                            },
                            {
                            	xtype:'hiddenfield',
                            	id:'RP_INT_RENOVATE_DETL_ID'
                            },
                            {
                            	xtype:'hiddenfield',
                            	id:'RP_RENOVATE_PROJECT_LINE_ID'
                            },
                            {
                            	xtype:'hiddenfield',
                            	id:'RP_UNIQUENESS_ID'
                            },
                            {
                            	xtype:'hiddenfield',
                            	id:'RP_ELV_RENO_STATUS_flag'
                            },
                            {
                                xtype: 'autoTextArea',
                                id:'RP_INSTALL_ADDRESS',
                                label: '安装地址',
                                labelWidth: '40%',
                                readOnly: true
                            }
                            ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '整改状态',
                        items: [
                            {
                                xtype: 'selectfield',
                                required: true,
                                id: 'RP_ELV_RENO_STATUS',
                                label: '整改状态',
                                labelWidth: '40%',
                                options: [
                                    {
                                    	text: '请选择',
                                    	value: ''
                                    },
                                    {
                                        text: '已整改',
                                        value: '已整改'
                                    },
                                    {
                                        text: '无法整改',
                                        value: '无法整改'
                                    }
                                ],
                                listeners:{
                              	  change:function(select,newValue,oldValue){
                              		  if(newValue=='无法整改'){
                              			  Ext.getCmp('RP_COMMENTS').setRequired(true);
                              		  }else{
                              			  Ext.getCmp('RP_COMMENTS').setRequired(false);
                              		  }
                              	  }
                                }
                            },
                            {
                                xtype: 'textfield',
                                id: 'RP_ELV_RENOVATE_DATE',
                                label: '整改日期',
                                labelWidth: '40%',
                                placeHolder: '点击设置时间',
                                readOnly: true,
                                listeners:{
                                	focus:function(){
                                		initDate1('RP_ELV_RENOVATE_DATE','整改日期');
                                	}
                                }
                            },
                            {
                                xtype: 'autoTextArea',
                                required: false,
                                id: 'RP_COMMENTS',
                                label: '备注',
                                labelWidth: '40%',
                                placeHolder: '请输入备注'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});