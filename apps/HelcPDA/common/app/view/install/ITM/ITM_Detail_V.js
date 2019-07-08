Ext.define('HelcPDA.view.install.ITM.ITM_Detail_V', {
    extend: 'Ext.Panel',
    id: 'ITM_Detail_V',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.field.Search',
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.field.Toggle'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'ITM安装过程',
                items: [
                    {
                        xtype: 'button',
                        id: 'back_to_ITMGHList',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'CommitITM',
                        text: '提交'
                    }
                ]
            },
            {
                xtype: 'tabpanel',
                id: 'ITM_tab',
                flex: 1,
                items: [
                    {
                        xtype: 'container',
                        title: '查看数据',
                        items: [
                            {
                                xtype: 'formpanel',
                                height: '100%',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id:'itm_ENGCONTRACT_NUMBER',
                                                label: '合同号',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'itm_ELEVATOR_NO',
                                                label: '工号',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id:'itm_CUSTOMER_NAME',
                                                label: '客户名称',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id:'itm_INSTALL_ADDRESS',
                                                label: '安装地址',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'itm_PRODUCE_TYPE',
                                                label: '生产类型',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'itm_SEQ_NUM',
                                                label: '批次',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'itm_EQUIPMENT_NO',
                                                label: '设备号',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'itm_CM_ELEVATOR_TYPE_NAME',
                                                label: '梯种',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'itm_ELEVATOR_CLASS_NAME',
                                                label: '工号类型',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id:'itm_dwNAME',
                                                label: '安装单位',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id:'itm_dzNAME',
                                                label: '吊装单位',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id:'itm_dpNAME',
                                                label: '搭棚单位',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'itm_BUDGET_INSTALL_METHOD',
                                                label: '安装工法',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'itm_PARAM_C_Z_M',
                                                label: '层/站/门',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'itm_PARAM_ZZ',
                                                label: '载重',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'itm_PARAM_SD',
                                                label: '速度',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'itm_PARAM_TSGD',
                                                label: '提升高度',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'itm_PARAM_JDZG',
                                                label: '井道高度',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'itm_CCRQ',
                                                label: '出仓日期',
                                                labelWidth: '40%',
                                                readOnly: true
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: '录入数据',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'formpanel',
                                flex: 1,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '吊装时间',
                                        items: [
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'itm_LIFT_START_DATE',
                                                label: '开始日期',
                                                labelWidth: '40%',
                                                dateFormat: 'Y-m-d',
                                                placeHolder: '点击设置时间',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'itm_LIFT_START_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'吊装开始时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('itm_LIFT_START_DATE').setValue();
                                                    	    			   Ext.getCmp('itm_LIFT_START_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'itm_LIFT_END_DATE',
                                                label: '结束日期',
                                                labelWidth: '40%',
                                                dateFormat: 'Y-m-d',
                                                placeHolder: '点击设置时间',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'itm_LIFT_END_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'吊装结束时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('itm_LIFT_END_DATE').setValue();
                                                    	    			   Ext.getCmp('itm_LIFT_END_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '进场',
                                        items: [
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'itm_ENTRANCE_DATE',
                                                label: '进场日期',
                                                dateFormat: 'Y-m-d',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'itm_ENTRANCE_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'进场日期',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('itm_ENTRANCE_DATE').setValue();
                                                    	    			   Ext.getCmp('itm_ENTRANCE_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            },
                                            {
                                                xtype:'hiddenfield',
                                                id:'itm_ENTRANCE_ENTER_DATE',
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: '报调试',
                                        items: [
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'itm_REPORT_DEBUG_DATE',
                                                label: '报调试日期',
                                                dateFormat: 'Y-m-d',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'itm_REPORT_DEBUG_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'报调试日期',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('itm_REPORT_DEBUG_DATE').setValue();
                                                    	    			   Ext.getCmp('itm_REPORT_DEBUG_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            },
                                            {
                                                xtype:'hiddenfield',
                                                id:'itm_REPORT_DEBUG_ENTER_DATE',
                                            }
                                        ]
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