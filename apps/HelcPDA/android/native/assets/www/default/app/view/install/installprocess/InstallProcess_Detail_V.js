
/* JavaScript content from app/view/install/installprocess/InstallProcess_Detail_V.js in folder common */
Ext.define('HelcPDA.view.install.installprocess.InstallProcess_Detail_V', {
    extend: 'Ext.Panel',
    id: 'installProcess_Detail_V',
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
                title: '安装过程',
                items: [
                    {
                        xtype: 'button',
                        id: 'back_to_GHList',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'CommitInstallProcess',
                        text: '提交'
                    }
                ]
            },
            {
                xtype: 'tabpanel',
                id: 'ipd_tab',
                flex: 1,
                items: [
                    {
                        xtype: 'container',
                        id: 'ipd_CKSJ',
                        title: '查看数据',
                        items: [
                            {
                                xtype: 'formpanel',
                                height: '100%',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        items: [
                                            {
                                            	xtype:'hiddenfield',
                                            	id: 'ipd_flg'
                                            },
                                            {
                                            	xtype:'hiddenfield',
                                            	id: 'ipd_buildflg'
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_ENGCONTRACT_NUMBER',
                                                label: '合同号',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_ELEVATOR_NO',
                                                label: '工号',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id:'ipd_CUSTOMER_NAME',
                                                label: '客户名称',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id:'ipd_INSTALL_ADDRESS',
                                                label: '安装地址',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_PRODUCE_TYPE',
                                                label: '生产类型',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_SEQ_NUM',
                                                label: '批次',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_EQUIPMENT_NO',
                                                label: '设备号',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_CM_ELEVATOR_TYPE_NAME',
                                                label: '梯种',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_ELEVATOR_CLASS_NAME',
                                                label: '工号类型',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id:'ipd_dwNAME',
                                                label: '安装单位',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id:'ipd_dzNAME',
                                                label: '吊装单位',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'autoTextArea',
                                                id:'ipd_dpNAME',
                                                label: '搭棚单位',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_BUDGET_INSTALL_METHOD',
                                                label: '安装工法',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_PARAM_C_Z_M',
                                                label: '层/站/门',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_PARAM_ZZ',
                                                label: '载重',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_PARAM_SD',
                                                label: '速度',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_PARAM_TSGD',
                                                label: '提升高度',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_PARAM_JDZG',
                                                label: '井道高度',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                            	xtype: 'datepickerfield',
                                            	id: 'ipd_INV_OUT_DATE',
                                                label: '第一箱头发货',
                                                dateFormat: 'Y-m-d',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                            	xtype: 'datepickerfield',
                                                id: 'ipd_CCRQ',
                                            	label: '最后箱头发货',
                                            	dateFormat: 'Y-m-d',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_ENGCONTRACT_TYPE',
                                                label: '合同类型',
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
                        id: 'ipd_DZDP',
                        title: '吊装搭棚',
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
                                                id: 'ipd_LIFT_START_DATE',
                                                label: '开始日期',
                                                labelWidth: '40%',
                                                dateFormat: 'Y-m-d',
                                                placeHolder: '点击设置时间',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'ipd_LIFT_START_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    yearTo: new Date().getFullYear() + 2,
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
                                                    	    			   Ext.getCmp('ipd_LIFT_START_DATE').setValue();
                                                    	    			   Ext.getCmp('ipd_LIFT_START_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'ipd_LIFT_END_DATE',
                                                label: '结束日期',
                                                labelWidth: '40%',
                                                dateFormat: 'Y-m-d',
                                                placeHolder: '点击设置时间',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'ipd_LIFT_END_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    yearTo: new Date().getFullYear() + 2,
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
                                                    	    			   Ext.getCmp('ipd_LIFT_END_DATE').setValue();
                                                    	    			   Ext.getCmp('ipd_LIFT_END_DATE_picker').setHidden(true);
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
                                        title: '搭棚时间',
                                        items: [
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'ipd_BUILD_START_DATE',
                                                label: '开始日期',
                                                dateFormat: 'Y-m-d',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'ipd_BUILD_START_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    yearTo: new Date().getFullYear() + 2,
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'搭棚开始时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('ipd_BUILD_START_DATE').setValue();
                                                    	    			   Ext.getCmp('ipd_BUILD_START_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'ipd_BUILD_END_DATE',
                                                label: '结束日期',
                                                dateFormat: 'Y-m-d',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'ipd_BUILD_END_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    yearTo: new Date().getFullYear() + 2,
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'搭棚结束时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('ipd_BUILD_END_DATE').setValue();
                                                    	    			   Ext.getCmp('ipd_BUILD_END_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
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
                		                                id: 'show_ipd_DZDP',
                		                                text: '显示其他输入项',
                		                                margin: '15 0',
                		                                width: '90%',
                		                            },
                		                            {
                		                                xtype: 'spacer'
                		                            }
                		                        ]
                		                    }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'ipd_DZ_fieldset',
                                        title: '吊装',
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        xtype: 'searchfield',
                                                        id: 'search_SUSPEND_VENDOR',
                                                        height: 40,
                                                        width: '88%',
                                                        label: '查找服务商',
                                                        labelWidth: '43%',
                                                        name: '',
                                                        placeHolder: '请输入搜索关键字'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'btn_search_SUSPEND_VENDOR',
                                                        height: 40,
                                                        style: 'border:0;',
                                                        width: '12%',
                                                        iconCls: 'search',
                                                        text: ''
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'ipd_InstSUSPEND_VENDOR',
                                                label: '服务商',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype:'hiddenfield',
                                                id:'ipd_SUSPEND_VENDOR_ID',
                                            },
                                            {
                                                xtype: 'selectfield',
                                                id: 'ipd_INST_PERSON',
                                                label: '吊装人员',
                                                labelWidth: '40%',
                                                placeHolder: '请选择吊装人员',
                                                usePicker: 'auto'
                                            },
                                            {
                                                xtype: 'container',
                                                style: 'background-color:#fff；',
                                                items: [
                                                    {
                                                        xtype: 'list',
                                                        id:'InstPersonNameList',
                                                        store: 'InstPersonNameStore',
                                                        height: 100,
                                                        itemTpl: [
                                                            '<table width="100%" border="0" cellspacing="0" cellpadding="0">',
                                                            '  <tr>',
                                                            '    <td width=91%>{PERSON_NAME}</td>',
                                                            '    <td width=9% style="text-align: right;"><img id="1" style="width:22px;" src="images/delete01.png"/></td>',
                                                            '  </tr>',
                                                            '</table>'
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'ipd_DP_fieldset',
                                        title: '搭棚',
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        xtype: 'searchfield',
                                                        id: 'search_build_vendor',
                                                        height: 40,
                                                        width: '88%',
                                                        label: '查找服务商',
                                                        labelWidth: '43%',
                                                        name: '',
                                                        placeHolder: '请输入搜索关键字'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'btn_search_build_vendor',
                                                        height: 40,
                                                        style: 'border:0;',
                                                        width: '12%',
                                                        iconCls: 'search',
                                                        text: ''
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'ipd_BUILD_VENDOR',
                                                label: '服务商',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype:'hiddenfield',
                                                id:'ipd_BUILD_VENDOR_ID',
                                            },
                                            {
                                                xtype: 'selectfield',
                                                id: 'ipd_BUILD_PERSON',
                                                label: '搭棚人员',
                                                labelWidth: '40%',
                                                placeHolder: '请选择搭棚人员',
                                                usePicker: 'auto'
                                            },
                                            {
                                                xtype: 'container',
                                                style: 'background-color:#fff；',
                                                items: [
                                                    {
                                                        xtype: 'list',
                                                        id:'BuildPersonNameList',
                                                        store: 'BuildPersonNameStore',
                                                        height: 100,
                                                        itemTpl: [
                                                            '<table width="100%" border="0" cellspacing="0" cellpadding="0">',
                                                            '  <tr>',
                                                            '    <td width=91%>{PERSON_NAME}</td>',
                                                            '    <td width=9% style="text-align: right;"><img id="2" style="width:22px;" src="images/delete01.png"/></td>',
                                                            '  </tr>',
                                                            '</table>'
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'ipd_DDBZ_fieldset',
                                        title: '',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id: 'ipd_dd_remark',
                                                label: '吊搭备注',
                                                labelWidth: '40%',
                                                placeHolder: '请输入吊搭备注'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        id: 'ipd_ENTER_container',
                        title: '进场',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'formpanel',
                                id: 'ipd_ENTER_formpanel',
                                flex: 1,
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        items: [
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'ipd_ENTRANCE_DATE',
                                                dateFormat: 'Y-m-d',
                                                label: '进场日期',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'ipd_ENTRANCE_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    yearTo: new Date().getFullYear() + 2,
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'进场时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('ipd_ENTRANCE_DATE').setValue();
                                                    	    			   Ext.getCmp('ipd_ENTRANCE_DATE_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            },
                                            {
                                                xtype:'hiddenfield',
                                                id:'ipd_ENTRANCE_ENTER_DATE',
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'ipd_reportInstll',
                                                dateFormat: 'Y-m-d',
                                                label: '报装日期',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'ipd_reportInstll_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    yearTo: new Date().getFullYear() + 2,
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'报装日期',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('ipd_reportInstll').setValue();
                                                    	    			   Ext.getCmp('ipd_reportInstll_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
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
                		                                id: 'show_ipd_JC',
                		                                text: '显示其他输入项',
                		                                margin: '15 0',
                		                                width: '90%',
                		                            },
                		                            {
                		                                xtype: 'spacer'
                		                            }
                		                        ]
                		                    }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'ipd_JC_fieldset',
                                        title: '安装',
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        xtype: 'searchfield',
                                                        id: 'search_instll_vendor',
                                                        height: 40,
                                                        width: '90%',
                                                        label: '查找服务商',
                                                        labelWidth: '42%',
                                                        name: '',
                                                        placeHolder: '请输入搜索关键字'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'btn_search_instll_vendor',
                                                        height: 41,
                                                        style: 'border:0;',
                                                        width: '10%',
                                                        iconCls: 'search',
                                                        text: ''
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'ipd_INSTLL_VENDOR',
                                                label: '服务商',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype:'hiddenfield',
                                                id:'ipd_INSTLL_VENDOR_ID',
                                            },
                                            {
                                                xtype: 'selectfield',
                                                id: 'ipd_INSTLL_PERSON',
                                                label: '安装人员',
                                                labelWidth: '40%',
                                                placeHolder: '请选择安装人员',
                                                usePicker: 'auto'
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'ipd_PLAN_START',
                                                dateFormat: 'Y-m-d',
                                                label: '计划开始',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'ipd_PLAN_START_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    yearTo: new Date().getFullYear() + 2,
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'计划开始时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('ipd_PLAN_START').setValue();
                                                    	    			   Ext.getCmp('ipd_PLAN_START_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                id: 'ipd_PLAN_END',
                                                dateFormat: 'Y-m-d',
                                                label: '计划结束',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'ipd_PLAN_END_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    yearTo: new Date().getFullYear() + 2,
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'计划结束时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('ipd_PLAN_START').setValue();
                                                    	    			   Ext.getCmp('ipd_PLAN_END_picker').setHidden(true);
                                                    	    		   }
                                                    	    	   }
                                                    	       }
                                                    	]
                                                    } 
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                margin: '10 15',
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        id: 'btn_add_instllperson',
                                                        margin: '',
                                                        text: '增加安装人员'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                style: 'background-color:#fff；',
                                                items: [
                                                    {
                                                        xtype: 'list',
                                                        id: 'InstllPersonNameList',
                                                        store:'InstllPersonNameStore',
                                                        height: 200,
                                                        itemTpl: [
                                                            '<table width="100%" border="0" cellspacing="0" cellpadding="0">',
                                                            '  <tr>',
                                                            '    <td width=91%>{PERSON_NAME}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{PLAN_START}到{PLAN_END}</td>',
                                                            '    <td width=9% style="text-align: right;"><img id="1" style="width:22px;" src="images/delete01.png"/></td>',
                                                            '  </tr>',
                                                            '</table>'
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                    	xtype: 'label',
                                    	html: '注:填写进场日期需有第一箱头发货日期',
                                    	baseCls: 'x-label remark_label',
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        id: 'ipd_INSTALL_container',
                        title: '安装',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'formpanel',
                                id: 'ipd_INSTALL_formpanel',
                                flex: 1,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        id: 'ipd_ZT_field',
                                        title: '直梯',
                                        items: [
											{
											    xtype: 'togglefield',
											    id:'ZT_TMAZ',
											    label: '厅门安装',
											    labelWidth: '70%'
											},
											{
											    xtype: 'datepickerfield',
											    id: 'dpf_tmaz',
											    dateFormat: 'Y-m-d',
											    label: '厅门安装时间',
											    labelWidth: '40%',
											    placeHolder: '点击设置时间',
											    picker: {
											    	value: new Date(),
											    	id: 'dpf_tmaz_picker',
											        slotOrder: [
											            'year',
											            'month',
											            'day'
											        ],
											        yearTo: new Date().getFullYear() + 2,
											        doneButton: '完成',
											        cancelButton: '取消',
											        toolbar:{
                                                    	title:'厅门安装时间'
                                                    }
											    }
											},
											{
											    xtype: 'togglefield',
											    id:'ZT_JXDZ',
											    label: '轿厢、对重安装',
											    labelWidth: '70%'
											},
											{
											    xtype: 'datepickerfield',
											    id: 'dpf_jxdzaz',
											    dateFormat: 'Y-m-d',
											    label: '轿厢、对重安装时间',
											    labelWidth: '40%',
											    placeHolder: '点击设置时间',
											    picker: {
											    	value: new Date(),
											    	id: 'dpf_jxdzaz_picker',
											        slotOrder: [
											            'year',
											            'month',
											            'day'
											        ],
											        yearTo: new Date().getFullYear() + 2,
											        doneButton: '完成',
											        cancelButton: '取消',
											        toolbar:{
                                                    	title:'轿厢、对重安装时间'
                                                    }
											    }
											},
											{
                                                xtype: 'togglefield',
                                                id:'ZT_DGAZ',
                                                label: '导轨安装',
                                                labelWidth: '70%'
                                            },
                                            {
											    xtype: 'datepickerfield',
											    id: 'dpf_dgaz',
											    dateFormat: 'Y-m-d',
											    label: '导轨安装时间',
											    labelWidth: '40%',
											    placeHolder: '点击设置时间',
											    picker: {
											    	value: new Date(),
											    	id: 'dpf_dgaz_picker',
											        slotOrder: [
											            'year',
											            'month',
											            'day'
											        ],
											        yearTo: new Date().getFullYear() + 2,
											        doneButton: '完成',
											        cancelButton: '取消',
											        toolbar:{
                                                    	title:'导轨安装时间'
                                                    }
											    }
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
                		                                id: 'show_ipd_GZ',
                		                                text: '显示其他工序',
                		                                margin: '15 0',
                		                                width: '90%',
                		                            },
                		                            {
                		                                xtype: 'spacer'
                		                            }
                		                        ]
                		                    },
                                            {
                                                xtype: 'togglefield',
                                                id: 'ZT_FX',
                                                label: '放线',
                                                labelWidth: '70%'
                                            },
                                            {
                                                xtype: 'togglefield',
                                                id:'ZT_CJ',
                                                label: '撑架',
                                                labelWidth: '70%'
                                            },
                                            {
                                                xtype: 'togglefield',
                                                id:'ZT_JF',
                                                label: '机房',
                                                labelWidth: '70%'
                                            },
                                            {
                                                xtype: 'togglefield',
                                                id:'ZT_GZJ',
                                                label: '灌主机水泥座',
                                                labelWidth: '70%'
                                            },
                                            {
                                                xtype: 'togglefield',
                                                id:'ZT_TBMT',
                                                label: '踏板门套安装',
                                                labelWidth: '70%'
                                            },
                                            {
                                                xtype: 'togglefield',
                                                id:'ZT_TJSMT',
                                                label: '土建塞门套',
                                                labelWidth: '70%'
                                            },
                                            {
                                                xtype: 'togglefield',
                                                id:'ZT_DQJX',
                                                label: '电器接线',
                                                labelWidth: '70%'
                                            },
                                            {
                                                xtype: 'togglefield',
                                                id:'ZT_JDPJCC',
                                                label: '井道棚架拆除',
                                                labelWidth: '70%'
                                            },
                                            {
                                                xtype: 'togglefield',
                                                id:'ZT_GHCSN',
                                                label: '灌缓冲水泥座',
                                                labelWidth: '70%'
                                            },
                                            {
                                                xtype: 'togglefield',
                                                id:'ZT_DLDY',
                                                label: '动力电源',
                                                labelWidth: '70%'
                                            }
                                        ]
                                    },
                                   {
                                    xtype: 'fieldset',
                                    id: 'ipd_FT_field',
                                    title: '扶梯',
                                    items: [
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
										            id: 'show_ipd_FTGZ',
										            text: '显示所有工序',
										            margin: '15 0',
										            width: '90%',
										        },
										        {
										            xtype: 'spacer'
										        }
										    ]
										},
										{
										    xtype: 'togglefield',
										    id:'FT_BJ',
										    label: '步级安装',
										    labelWidth: '70%'
										},
										{
										    xtype: 'togglefield',
										    id:'FT_BLCB',
										    label: '玻璃、侧板安装',
										    labelWidth: '70%'
										},
                                        {
                                            xtype: 'togglefield',
                                            id: 'FT_BLM',
                                            label: '玻璃码安装',
                                            labelWidth: '70%'
                                        },
                                        {
                                            xtype: 'togglefield',
                                            id:'FT_DGDL',
                                            label: '导轨、大链安装',
                                            labelWidth: '70%'
                                        },
                                        {
                                            xtype: 'togglefield',
                                            id:'FT_DLDY',
                                            label: '动力电源',
                                            labelWidth: '70%'
                                        },
                                        {
                                            xtype: 'togglefield',
                                            id:'FT_DQJX',
                                            label: '电气接线',
                                            labelWidth: '70%'
                                        },
                                        {
                                            xtype: 'togglefield',
                                            id:'FT_FSDZJ',
                                            label: '扶手带组件安装',
                                            labelWidth: '70%'
                                        },
                                        {
                                            xtype: 'togglefield',
                                            id:'FT_HJYJ',
                                            label: '桁架、样架定位',
                                            labelWidth: '70%'
                                        },
                                        {
                                            xtype: 'togglefield',
                                            id:'FT_NGB',
                                            label: '内盖板安装',
                                            labelWidth: '70%'
                                        },
                                        {
                                            xtype: 'togglefield',
                                            id:'FT_QB',
                                            label: '裙板安装',
                                            labelWidth: '70%'
                                        },
                                        {
                                            xtype: 'togglefield',
                                            id:'FT_WGB',
                                            label: '外盖板安装',
                                            labelWidth: '70%'
                                        }
                                    ]
                                },
                                    {
                                        xtype: 'fieldset',
                                        items: [
												{
												    xtype: 'datepickerfield',
												    id: 'ipd_install_end_date',
												    dateFormat: 'Y-m-d',
												    label: '安装完成日期',
												    labelWidth: '40%',
												    placeHolder: '点击设置时间',
												    picker: {
												    	value: new Date(),
												    	id: 'ipd_install_end_date_picker',
												        slotOrder: [
												            'year',
												            'month',
												            'day'
												        ],
												        yearTo: new Date().getFullYear() + 2,
												        doneButton: '完成',
												        cancelButton: '取消',
												        toolbar:{
	                                                    	title:'安装完成时间',
	                                                    	items:[
	                                                    	       {
	                                                    	    	   xtype:'button',
	                                                    	    	   text:'清除',
	                                                    	    	   listeners:{
	                                                    	    		   tap:function(){
	                                                    	    			   Ext.getCmp('ipd_install_end_date').setValue();
	                                                    	    			   Ext.getCmp('ipd_install_end_date_picker').setHidden(true);
	                                                    	    		   }
	                                                    	    	   }
	                                                    	       }
	                                                    	]
	                                                    }
												    }
												},
												{
												    xtype: 'datepickerfield',
												    id: 'ipd_report_test',
												    dateFormat: 'Y-m-d',
												    label: '报调试日期',
												    labelWidth: '40%',
												    placeHolder: '点击设置时间',
												    picker: {
												    	value: new Date(),
												    	id: 'ipd_report_test_picker',
												        slotOrder: [
												            'year',
												            'month',
												            'day'
												        ],
												        yearTo: new Date().getFullYear() + 2,
												        doneButton: '完成',
												        cancelButton: '取消',
												        toolbar:{
	                                                    	title:'报调试时间',
	                                                    	items:[
	                                                    	       {
	                                                    	    	   xtype:'button',
	                                                    	    	   text:'清除',
	                                                    	    	   listeners:{
	                                                    	    		   tap:function(){
	                                                    	    			   Ext.getCmp('ipd_report_test').setValue();
	                                                    	    			   Ext.getCmp('ipd_report_test_picker').setHidden(true);
	                                                    	    		   }
	                                                    	    	   }
	                                                    	       }
	                                                    	]
	                                                    }
												    }
												},
												{
												    xtype:'hiddenfield',
												    id:'ipd_REPORT_DEBUG_ENTER_DATE',
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
	                		                                id: 'show_ipd_AZ',
	                		                                text: '显示其他输入项',
	                		                                margin: '15 0',
	                		                                width: '90%',
	                		                            },
	                		                            {
	                		                                xtype: 'spacer'
	                		                            }
	                		                        ]
	                		                    }
                                                ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'ipd_PF_fieldset',
                                        title: '评分',
                                        items: [
                                            {
                                                xtype: 'textnumfield',
                                                id: 'ipd_quality_score',
                                                label: '质量评分',
                                                placeHolder: '请输入质量评分',
                                                maxLength: 3,
                                                labelWidth: '40%',
                                            },
                                            {
                                                xtype: 'textnumfield',
                                                id: 'ipd_stall_score',
                                                label: '安装评分',
                                                placeHolder: '请输入安装评分',
                                                maxLength: 3,
                                                labelWidth: '40%'
                                            },
                                            {
                                                xtype: 'textnumfield',
                                                id: 'ipd_envir_score',
                                                label: '环境文明评分',
                                                placeHolder: '请输入环境文明评分',
                                                maxLength: 3,
                                                labelWidth: '40%'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'ipd_ZJJ_fieldset',
                                        title: '中间检',
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        xtype: 'searchfield',
                                                        id:'ipd_ZJJperson',
                                                        height: 40,
                                                        width: '90%',
                                                        label: '查找人员',
                                                        labelWidth: '42%',
                                                        name: '',
                                                        placeHolder: '请输入搜索关键字'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id:'btn_ipd_ZJJperson',
                                                        height: 41,
                                                        style: 'border:0;',
                                                        width: '10%',
                                                        iconCls: 'search',
                                                        text: ''
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'ipd_ZjjPersion',
                                                label: '中间检人员',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype:'hiddenfield',
                                                id:'ipd_MID_CHECK_PERSON_ID',
                                            },
                                            {
                                                xtype: 'datepickerfield',
                                                dateFormat: 'Y-m-d',
                                                id: 'ipd_ZJJ_DATE',
                                                label: '中间检日期',
                                                labelWidth: '40%',
                                                placeHolder: '点击设置时间',
                                                picker: {
                                                	value: new Date(),
                                                	id: 'ipd_ZJJ_DATE_picker',
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    yearTo: new Date().getFullYear() + 2,
                                                    doneButton: '完成',
                                                    cancelButton: '取消',
                                                    toolbar:{
                                                    	title:'中间检时间',
                                                    	items:[
                                                    	       {
                                                    	    	   xtype:'button',
                                                    	    	   text:'清除',
                                                    	    	   listeners:{
                                                    	    		   tap:function(){
                                                    	    			   Ext.getCmp('ipd_ZJJ_DATE').setValue();
                                                    	    			   Ext.getCmp('ipd_ZJJ_DATE_picker').setHidden(true);
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
                                        id: 'ipd_GJJ_fieldset',
                                        title: '',
                                        items: [
                                            {
                                                xtype: 'selectfield',
                                                id: 'ipd_imp_result',
                                                dateFormat: 'Y-m-d',
                                                label: '关键检结果',
                                                labelWidth: '40%',
                                                placeHolder: '请选择',
                                                options: [
                                                    {
                                                        text: '请选择',
                                                        value: '0'
                                                    },
                                                    {
                                                        text: '合格',
                                                        value: '1'
                                                    },
                                                    {
                                                        text: '不合格',
                                                        value: '2'
                                                    },
                                                    {
                                                        text: '复检合格',
                                                        value: '3'
                                                    }
                                                ],
                                                usePicker: 'auto'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'ipd_CB1_fieldset',
                                        instructions: '<div style="margin:0 auto;width:92%;text-align:left;">本工号电梯，土建相关工程已按要求安装完毕</div>',
                                        title: '',
                                        items: [
                                            {
                                                xtype: 'selectfield',
                                                id: 'ipd_CB_1',
                                                label: '是否完成',
                                                labelWidth: '40%',
                                                placeHolder: '请选择',
                                                options: [
                                                    {
                                                        text: '请选择',
                                                        value:''
                                                    },
                                                    {
                                                        text: '是',
                                                        value: '是'
                                                    }
                                                ],
                                                usePicker: 'auto'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'ipd_CB2_fieldset',
                                        instructions: '<div style="margin:0 auto;width:92%;text-align:left;">小组已按GY0019-13《直梯安装质量报告》完成自检</div>',
                                        items: [
                                            {
                                                xtype: 'selectfield',
                                                id: 'ipd_CB_2',
                                                label: '是否完成',
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
                                                    }
                                                ],
                                                usePicker: 'auto'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'ipd_CB3_fieldset',
                                        instructions: '<div style="margin:0 auto;width:92%;text-align:left;">小组已按《导轨检验记录表》完成导轨自检</div>',
                                        items: [
                                            {
                                                xtype: 'selectfield',
                                                id: 'ipd_CB_3',
                                                label: '是否完成',
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
                                                    }
                                                ],
                                                usePicker: 'auto'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'ipd_CB4_fieldset',
                                        instructions: '<div style="margin:0 auto;width:92%;text-align:left;">小组自行慢车已按下列增加项目确认并完成慢车调试</div>',
                                        items: [
                                            {
                                                xtype: 'selectfield',
                                                id: 'ipd_CB_4',
                                                label: '是否完成',
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
                                                    }
                                                ],
                                                usePicker: 'auto'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'ipd_CB5_fieldset',
                                        instructions: '<div style="margin:0 auto;width:92%;text-align:left;">已本记录表完成自检工作，并同意电梯报调试</div>',
                                        items: [
                                            {
                                                xtype: 'selectfield',
                                                id: 'ipd_CB_5',
                                                label: '是否完成',
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
                                                    }
                                                ],
                                                usePicker: 'auto'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'ipd_AZZZ_fieldset',
                                        title: '安装',
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        xtype: 'searchfield',
                                                        id: 'ipd_search_ZZ',
                                                        height: 40,
                                                        width: '90%',
                                                        label: '查找组长',
                                                        labelWidth: '42%',
                                                        name: '',
                                                        placeHolder: '请输入搜索关键字'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'ipd_btn_search_ZZ',
                                                        height: 41,
                                                        style: 'border:0;',
                                                        width: '10%',
                                                        iconCls: 'search',
                                                        text: ''
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_ZZ',
                                                label: '组长',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype:'hiddenfield',
                                                id:'ipd_INSTALL_HEADER_ID',
                                            },
                                            {
                                                xtype: 'textfield',
                                                id:'ipd_ZZ_TEL',
                                                label: '组长电话',
                                                labelWidth: '40%',
                                                placeHolder: '请输入组长电话'
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'ipd_install_remark',
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
                ]
            }
        ]
    }

});