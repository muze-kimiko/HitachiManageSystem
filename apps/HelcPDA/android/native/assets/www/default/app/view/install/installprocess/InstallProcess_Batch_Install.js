
/* JavaScript content from app/view/install/installprocess/InstallProcess_Batch_Install.js in folder common */
Ext.define('HelcPDA.view.install.installprocess.InstallProcess_Batch_Install', {
    extend: 'Ext.Panel',
    id: 'installProcess_Batch_Install',
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
                        id: 'commit_batch_install',
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
                        id: 'ipd_ZT_field',
                        title: '直梯',
                        items: [
							{
							    xtype: 'togglefield',
							    id:'ZT_TMAZ_P',
							    label: '厅门安装',
							    labelWidth: '40%'
							},
							{
							    xtype: 'datepickerfield',
							    id: 'dpf_tmaz_p',
							    dateFormat: 'Y-m-d',
							    label: '厅门安装时间',
							    labelWidth: '40%',
							    placeHolder: '点击设置时间',
							    picker: {
							    	value: new Date(),
							    	id: 'dpf_tmaz_picker_p',
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
							    id:'ZT_JXDZ_P',
							    label: '轿厢、对重安装',
							    labelWidth: '40%'
							},
							{
							    xtype: 'datepickerfield',
							    id: 'dpf_jxdzaz_p',
							    dateFormat: 'Y-m-d',
							    label: '轿厢、对重安装时间',
							    labelWidth: '40%',
							    placeHolder: '点击设置时间',
							    picker: {
							    	value: new Date(),
							    	id: 'dpf_jxdzaz_picker_p',
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
                                id:'ZT_DGAZ_P',
                                label: '导轨安装',
                                labelWidth: '40%'
                            },
                            {
							    xtype: 'datepickerfield',
							    id: 'dpf_dgaz_p',
							    dateFormat: 'Y-m-d',
							    label: '导轨安装时间',
							    labelWidth: '40%',
							    placeHolder: '点击设置时间',
							    picker: {
							    	value: new Date(),
							    	id: 'dpf_dgaz_picker_p',
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
		                                id: 'show_ipd_GZ_PL',
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
                                labelWidth: '40%',
                                listeners: {
                                        change: function(field, newValue, oldValue) {
                                            console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                            var date=Ext.Date.format(new Date(),'Y-m-d');
                                            if(newValue){
                                            	step.ZT_FX=date;
                                            }else 
                                            	step.ZT_FX='';
                                            	
                                        }
                                 }
                            },
                            {
                                xtype: 'togglefield',
                                id:'ZT_CJ',
                                label: '撑架',
                                labelWidth: '40%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.ZT_CJ=date;
                                        }else 
                                        	step.ZT_CJ='';
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'ZT_JF',
                                label: '机房',
                                labelWidth: '40%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.ZT_JF=date;
                                        }else 
                                        	step.ZT_JF='';
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'ZT_GZJ',
                                label: '灌主机水泥座',
                                labelWidth: '40%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.ZT_GZJ=date;
                                        }else 
                                        	step.ZT_GZJ='';
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'ZT_TBMT',
                                label: '踏板门套安装',
                                labelWidth: '40%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.ZT_TBMT=date;
                                        }else 
                                        	step.ZT_TBMT='';
                                    
                                    
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'ZT_TJSMT',
                                label: '土建塞门套',
                                labelWidth: '40%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.ZT_TJSMT=date;
                                        }else 
                                        	step.ZT_TJSMT='';
                                    
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'ZT_DQJX',
                                label: '电器接线',
                                labelWidth: '40%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.ZT_DQJX=date;
                                        }
                                    
                                    
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'ZT_JDPJCC',
                                label: '井道棚架拆除',
                                labelWidth: '40%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.ZT_JDPJCC=date;
                                        }else 
                                        	step.ZT_JDPJCC='';
                                    
                                    
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'ZT_GHCSN',
                                label: '灌缓冲水泥座',
                                labelWidth: '40%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.ZT_GHCSN=date;
                                        }else 
                                        	step.ZT_GHCSN='';
                                    
                                    
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'ZT_DLDY',
                                label: '动力电源',
                                labelWidth: '40%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.ZT_DLDY=date;
                                        }else 
                                        	step.ZT_DLDY='';
                                    
                                    
                                    }
                                }
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
							    labelWidth: '70%',
							    listeners: {
							        change: function(field, newValue, oldValue) {
							            console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
							            var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.FT_BJ=date;
                                        }else 
                                        	step.FT_BJ='';
                                        
							        
							        
							        }
							    }
							},
							{
							    xtype: 'togglefield',
							    id:'FT_BLCB',
							    label: '玻璃、侧板安装',
							    labelWidth: '70%',
							    listeners: {
							        change: function(field, newValue, oldValue) {
							            console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
							            var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.FT_BLCB=date;
                                        }else 
                                        	step.FT_BLCB='';
							        
							        
							        }
							    }
							},
                            {
                                xtype: 'togglefield',
                                id: 'FT_BLM',
                                label: '玻璃码安装',
                                labelWidth: '70%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.FT_BLM=date;
                                        }else 
                                        	step.FT_BLM='';
                                    
                                    
                                    
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'FT_DGDL',
                                label: '导轨、大链安装',
                                labelWidth: '70%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.FT_DGDL=date;
                                        }else 
                                        	step.FT_DGDL='';
                                    
                                    
                                    
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'FT_DLDY',
                                label: '动力电源',
                                labelWidth: '70%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.FT_DLDY=date;
                                        }else 
                                        	step.FT_DLDY='';
                                    
                                    
                                    
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'FT_DQJX',
                                label: '电气接线',
                                labelWidth: '70%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.FT_DQJX=date;
                                        }else 
                                        	step.FT_DQJX='';
                                    
                                    
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'FT_FSDZJ',
                                label: '扶手带组件安装',
                                labelWidth: '70%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.FT_FSDZJ=date;
                                        }else 
                                        	step.FT_FSDZJ='';
                                    
                                    
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'FT_HJYJ',
                                label: '桁架、样架定位',
                                labelWidth: '70%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.FT_HJYJ=date;
                                        }else 
                                        	step.FT_HJYJ='';
                                    
                                    
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'FT_NGB',
                                label: '内盖板安装',
                                labelWidth: '70%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.FT_NGB=date;
                                        }else 
                                        	step.FT_NGB='';
                                    
                                    
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'FT_QB',
                                label: '裙板安装',
                                labelWidth: '70%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.FT_QB=date;
                                        }else 
                                        	step.FT_QB='';
                                    
                                    
                                    }
                                }
                            },
                            {
                                xtype: 'togglefield',
                                id:'FT_WGB',
                                label: '外盖板安装',
                                labelWidth: '70%',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                        console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
                                        var date=Ext.Date.format(new Date(),'Y-m-d');
                                        if(newValue){
                                        	step.FT_WGB=date;
                                        }else 
                                        	step.FT_WGB='';
                                    
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        items: [
								{
									xtype: 'datepickerfield',
								    id: 'ipd_install_end_date2',
								    dateFormat: 'Y-m-d',
								    label: '安装完成日期',
								    labelWidth: '40%',
								    placeHolder: '点击设置时间',
								    picker: {
								    	value: new Date(),
								    	id: 'ipd_install_end_date2_picker',
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
                                        	    			   Ext.getCmp('ipd_install_end_date2').setValue();
                                        	    			   Ext.getCmp('ipd_install_end_date2_picker').setHidden(true);
                                        	    		   }
                                        	    	   }
                                        	       }
                                        	]
                                        }
								    },
								},
								{
								    xtype: 'datepickerfield',
								    id: 'ipd_report_test2',
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
								    },
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

});