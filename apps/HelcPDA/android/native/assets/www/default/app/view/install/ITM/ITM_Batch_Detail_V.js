
/* JavaScript content from app/view/install/ITM/ITM_Batch_Detail_V.js in folder common */
Ext.define('HelcPDA.view.install.ITM.ITM_Batch_Detail_V', {
    extend: 'Ext.Panel',
    id: 'ITM_Batch_Detail_V',
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
                        id: 'Batch_CommitITM',
                        text: '提交'
                    }
                ]
            },
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
                                id: 'itm_LIFT_START_DATE_1',
                                label: '开始日期',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                placeHolder: '点击设置时间',
                                picker: {
                                	value: new Date(),
                                	id: 'itm_LIFT_START_DATE_1_picker',
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
                                    	    			   Ext.getCmp('itm_LIFT_START_DATE_1').setValue();
                                    	    			   Ext.getCmp('itm_LIFT_START_DATE_1_picker').setHidden(true);
                                    	    		   }
                                    	    	   }
                                    	       }
                                    	]
                                    } 
                                }
                            },
                            {
                                xtype: 'datepickerfield',
                                id: 'itm_LIFT_END_DATE_1',
                                label: '结束日期',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                placeHolder: '点击设置时间',
                                picker: {
                                	value: new Date(),
                                	id: 'itm_LIFT_END_DATE_1_picker',
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
                                    	    			   Ext.getCmp('itm_LIFT_END_DATE_1').setValue();
                                    	    			   Ext.getCmp('itm_LIFT_END_DATE_1_picker').setHidden(true);
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
                                id: 'itm_ENTRANCE_DATE_1',
                                label: '进场日期',
                                dateFormat: 'Y-m-d',
                                labelWidth: '40%',
                                placeHolder: '点击设置时间',
                                picker: {
                                	value: new Date(),
                                	id: 'itm_ENTRANCE_DATE_1_picker',
                                    slotOrder: [
                                        'year',
                                        'month',
                                        'day'
                                    ],
                                    yearTo: new Date().getFullYear() + 2,
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
                                    	    			   Ext.getCmp('itm_ENTRANCE_DATE_1').setValue();
                                    	    			   Ext.getCmp('itm_ENTRANCE_DATE_1_picker').setHidden(true);
                                    	    		   }
                                    	    	   }
                                    	       }
                                    	]
                                    } 
                                }
                            },
                            {
                                xtype:'hiddenfield',
                                id:'itm_ENTRANCE_ENTER_DATE_1',
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '报调试',
                        items: [
                            {
                                xtype: 'datepickerfield',
                                id: 'itm_REPORT_DEBUG_DATE_1',
                                label: '报调试日期',
                                dateFormat: 'Y-m-d',
                                labelWidth: '40%',
                                placeHolder: '点击设置时间',
                                picker: {
                                	value: new Date(),
                                	id: 'itm_REPORT_DEBUG_DATE_1_picker',
                                    slotOrder: [
                                        'year',
                                        'month',
                                        'day'
                                    ],
                                    yearTo: new Date().getFullYear() + 2,
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
                                    	    			   Ext.getCmp('itm_REPORT_DEBUG_DATE_1').setValue();
                                    	    			   Ext.getCmp('itm_REPORT_DEBUG_DATE_1_picker').setHidden(true);
                                    	    		   }
                                    	    	   }
                                    	       }
                                    	]
                                    } 
                                }
                            },
                            {
                                xtype:'hiddenfield',
                                id:'itm_REPORT_DEBUG_ENTER_DATE_1',
                            }
                        ]
                    },
                ]
            }
        ]
    }

});