
/* JavaScript content from app/view/startProcess/DailyOffice/ContactBookUseOfficialCars.js in folder common */
/*
 * File: app/view/MyPanel1.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('HelcOA.view.startProcess.DailyOffice.ContactBookUseOfficialCars', {
    extend: 'Ext.Panel',
    id:'ContactBookUseOfficialCars_id',
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
                docked: 'top',
                title: '公务车使用联络书',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        listeners:{
                        	tap:function(){
                        		var obj=Ext.getCmp('StartprocessName_id');
                        		if(!obj){
                        			obj=Ext.create('HelcOA.view.startProcess.StartprocessName');
                        		}
                        		Ext.Viewport.setActiveItem(obj);
                        	}
                        }
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        handler: function(button, e) {
                            var menu = Ext.create('Ext.Menu', {
                                items: [
                                {
                                    text: '提交',
                                    listeners:{
                                    	tap:function(){
                                    		var obj=Ext.getCmp('ContactBookUseOfficialCarsCommit_id');
                                    		if(!obj){
                                    			obj=Ext.create('HelcOA.view.startProcess.DailyOffice.ContactBookUseOfficialCarsCommit');
                                    		}
                                    		Ext.Viewport.setActiveItem(obj);
                                    		
                                    	}
                                    },
                                    handler:function(button,e){
                                    	 Ext.Viewport.hideMenu('right');
                                    	 
                                    }
                                },
                                {
                                    text: '保存',
                                    handler:function(button,e){
                                   	 Ext.Viewport.hideMenu('right');
                                   	 
                                   }
                                },
                                {
                                    text: '意见',
                                    handler:function(button,e){
                                   	 Ext.Viewport.hideMenu('right');
                                   	 
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
                        itemId: 'mybutton2',
                        iconCls: 'more'
                    }
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '编号',
                                labelWidth: '40%',
                                placeHolder: '请输入编号'
                            },
                            {
                                xtype: 'textfield',
                                label: '用车部门',
                                labelWidth: '40%',
                                placeHolder: '请输入部门名称'
                            },
                            {
                                xtype: 'textfield',
                                label: '申请人',
                                labelWidth: '40%',
                                placeHolder: '请输入申请人名称'
                            },
                            {
                                xtype: 'textfield',
                                label: '标题',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入申请人电话'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '用车时间',
                        items: [
                            {
                                xtype: 'datepickerfield',
                                label: '开始时间',
                                labelWidth: '40%',
                                placeHolder: '请输入申请如期',
                                picker: {
                                    doneButton: '完成',
                                    cancelButton: '取消'
                                }
                            },
                            {
                                xtype: 'datepickerfield',
                                label: '返回时间',
                                labelWidth: '40%',
                                placeHolder: '请输入申请如期',
                                picker: {
                                    doneButton: '完成',
                                    cancelButton: '取消'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '联系人',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入申请人名称'
                            },
                            {
                                xtype: 'textfield',
                                label: '联系电话',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入申请人名称'
                            },
                            {
                                xtype: 'textfield',
                                label: '用车人数',
                                labelWidth: '40%',
                                required: true,
                                placeHolder: '请输入申请人名称'
                            },
                            {
                                xtype: 'selectfield',
                                label: '用车地点',
                                labelWidth: '40%',
                                options: [
                                    {
                                        text: '大石',
                                        value: '大石'
                                    },
                                    {
                                        text: '中信',
                                        value: '中信'
                                    }
                                ]
                            },
                            {
                                xtype: 'selectfield',
                                label: '短信通知',
                                labelWidth: '40%',
                                options: [
                                    {
                                        text: '不需要',
                                        value: '不需要'
                                    },
                                    {
                                        text: '需要',
                                        value: '需要'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textareafield',
                                label: '行程',
                                labelWidth: '40%'
                            },
                            {
                                xtype: 'textareafield',
                                label: '用车理由',
                                labelWidth: '40%'
                            },
                            {
                                xtype: 'textareafield',
                                label: '领导意见',
                                labelWidth: '40%'
                            },
                            {
                                xtype: 'textareafield',
                                label: '审批意见',
                                labelWidth: '40%'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '车辆信息',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '车号',
                                labelWidth: '40%',
                                placeHolder: '请输入会议主题'
                            },
                            {
                                xtype: 'textfield',
                                label: '司机',
                                labelWidth: '40%',
                                placeHolder: '请输入会议主题'
                            },
                            {
                                xtype: 'textfield',
                                label: '司机手机',
                                labelWidth: '40%',
                                placeHolder: '请输入会议主题'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});