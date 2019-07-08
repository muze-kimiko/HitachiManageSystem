
/* JavaScript content from app/view/install/installprocess/InstallProcess_Batch_Init.js in folder common */
Ext.define('HelcPDA.view.install.installprocess.InstallProcess_Batch_Init', {
    extend: 'Ext.Panel',
    id: 'installProcess_Batch_Init',
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
                        id: 'commit_batch_init',
                        text: '提交'
                    }
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                items: [
					{
						xtype:'hiddenfield',
						id: 'ipd_batch_flg'
					},
					{
						xtype:'hiddenfield',
						id: 'ipd_batch_buildflg'
					},
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
    }

});