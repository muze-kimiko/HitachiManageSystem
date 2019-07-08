
/* JavaScript content from app/view/maintainSpecial/MmintainSpecialSearch_V.js in folder common */
Ext.define('HelcPDA.view.maintainSpecial.MmintainSpecialSearch_V', {
    extend: 'Ext.Panel',
    id:'MmintainSpecialSearch_V_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.Label',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.field.Search'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '按条件查询',
                items: [
                    {
                        xtype: 'button',
                        id:'back_to_MSList',
                        ui: 'back',
                        text: '返回'
                    },
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                height: 600,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '查询条件(可填)',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '工号',
                                id:'ms_ASSET_NUM',
                                labelWidth: '40%',
                                placeHolder: '请输入工号'
                            },
                            {
                            	xtype: 'textfield',
                            	label: '合同号',
                            	id:'ms_AGREE_NUM',
                            	labelWidth: '40%',
                            	placeHolder: '请输入合同号'
                            },
                            {
                                xtype: 'textfield',
                                label: '客户名称',
                                id:'ms_ACCNT',
                                labelWidth: '40%',
                                placeHolder: '请输入客户名称'
                            },
                            {
                                xtype: 'textfield',
                                label: '地盘',
                                id:'ms_DOMAIN',
                                labelWidth: '40%',
                                placeHolder: '请输入地盘'
                            },
                            {
                            	xtype: 'textfield',
                            	label: '所属司',
                            	id:'ms_COMPANY',
                            	labelWidth: '40%',
                            	placeHolder: '请输入所属司'
                            },
                            {
                            	xtype: 'textfield',
                            	label: '保养站',
                            	id:'ms_STATION',
                            	labelWidth: '40%',
                            	placeHolder: '请输入保养站'
                            },
                            {
            	        	   xtype: 'selectfield',
           	        	       id:'ms_FAULT_TYPE',
           	        	       label: '保障类型',
           	        	       placeHolder:'请选择保障类型',
           	        	       labelWidth: '40%',
           	        	       options: [ 
           	        	                  {
             	                	         text:'请选择',
           	                	             value:''
           	                             },
           	        	                 {
           	        	                	 text:'整改',
           	        	                	 value:'整改'
           	        	                  },
           	        	                  {
            	        	                 text:'抽查',
            	        	                 value:'抽查'
            	        	                  }
       							        ],
           	                             },
                            {
                                xtype: 'datepickerfield',
                                id: 'ms_START_DATE',
                                label: '开始日期',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                placeHolder: '点击设置时间',
                                picker: {
                                	value: new Date(),
                                	id: 'ms_START_DATE_picker',
                                    slotOrder: [
                                        'year',
                                        'month',
                                        'day'
                                    ],
                                    doneButton: '完成',
                                    cancelButton: '取消',
                                    toolbar:{
                                    	title:'开始日期',
                                    	items:[
                                    	       {
                                    	    	   xtype:'button',
                                    	    	   text:'清除',
                                    	    	   listeners:{
                                    	    		   tap:function(){
                                    	    			   Ext.getCmp('ms_START_DATE').setValue();
                                    	    			   Ext.getCmp('ms_START_DATE_picker').setHidden(true);
                                    	    		   }
                                    	    	   }
                                    	       }
                                    	]
                                    }
                                }
                            },
                            {
                                xtype: 'datepickerfield',
                                id: 'ms_END_DATE',
                                label: '结束日期',
                                labelWidth: '40%',
                                dateFormat: 'Y-m-d',
                                placeHolder: '点击设置时间',
                                value: new Date(),
                                picker: {
                                	value: new Date(),
                                	id: 'ms_END_DATE_picker',
                                    slotOrder: [
                                        'year',
                                        'month',
                                        'day'
                                    ],
                                    doneButton: '完成',
                                    cancelButton: '取消',
                                    toolbar:{
                                    	title:'结束日期',
                                    	items:[
                                    	       {
                                    	    	   xtype:'button',
                                    	    	   text:'清除',
                                    	    	   listeners:{
                                    	    		   tap:function(){
                                    	    			   Ext.getCmp('ms_END_DATE').setValue();
                                    	    			   Ext.getCmp('ms_END_DATE_picker').setHidden(true);
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
                                        id:'ms_search_info',
                                        margin: 10,
                                        width: 100,
                                        text: '查询'
                                    },
                                    {
                                        xtype: 'button',
                                        id:'ms_sureSearch',
                                        margin: 10,
                                        width: 100,
                                        text: '确定'
                                    },
                                    {
                                        xtype: 'spacer'
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        ]
    },
    

});