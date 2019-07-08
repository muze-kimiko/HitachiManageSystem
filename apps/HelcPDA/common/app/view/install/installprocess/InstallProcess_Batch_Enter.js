Ext.define('HelcPDA.view.install.installprocess.InstallProcess_Batch_Enter', {
    extend: 'Ext.Panel',
    id: 'installProcess_Batch_Enter',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '进场录入',
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
                        id: 'commit_batch_enter',
                        text: '提交'
                    }
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                layout: 'vbox',
                scrollable: false,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'datepickerfield',
                                id: 'ipd_batch_ENTRANCE_DATE',
                                dateFormat: 'Y-m-d',
                                label: '进场日期',
                                labelWidth: '40%',
                                placeHolder: '点击设置时间',
                                picker: {
                                	value: new Date(),
                                	id: 'ipd_batch_ENTRANCE_DATE_picker',
                                    slotOrder: [
                                        'year',
                                        'month',
                                        'day'
                                    ],
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
                                    	    			   Ext.getCmp('ipd_batch_ENTRANCE_DATE').setValue();
                                    	    			   Ext.getCmp('ipd_batch_ENTRANCE_DATE_picker').setHidden(true);
                                    	    		   }
                                    	    	   }
                                    	       }
                                    	]
                                    } 
                                }
                            },
                            {
                                xtype:'hiddenfield',
                                id:'ipd_batch_ENTRANCE_ENTER_DATE',
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
                    }
                ]
            }
        ]
    }

});