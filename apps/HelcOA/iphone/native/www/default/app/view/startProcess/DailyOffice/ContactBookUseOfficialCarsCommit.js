
/* JavaScript content from app/view/startProcess/DailyOffice/ContactBookUseOfficialCarsCommit.js in folder common */
/*
 * File: app/view/MyPanel12.js
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

Ext.define('HelcOA.view.startProcess.DailyOffice.ContactBookUseOfficialCarsCommit', {
    extend: 'Ext.Panel',
   id:'ContactBookUseOfficialCarsCommit_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Select',
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.field.TextArea'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '提交处理',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        listeners:{
                        	tap:function(){
                        		var obj=Ext.getCmp('ContactBookUseOfficialCars_id');
                				if(!obj){
                					obj=Ext.create('HelcOA.view.startProcess.DailyOffice.ContactBookUseOfficialCars');
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
                        text: '提交'
                    }
                ]
            },
            {
                xtype: 'tabpanel',
                flex: 1,
                items: [
                    {
                        xtype: 'container',
                        title: '路由选择',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'formpanel',
                                flex: 1,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        items: [
                                            {
                                                xtype: 'selectfield',
                                                label: '可选环节',
                                                labelWidth: '40%',
                                                options: [
                                                    {
                                                        text: '继续联络',
                                                        value: '继续联络'
                                                    },
                                                    {
                                                        text: '结束联络',
                                                        value: '结束联络'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: '人员选择',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'toolbar',
                                docked: 'top',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        width: '80%',
                                        label: '',
                                        placeHolder: '请输入查询条件'
                                    },
                                    {
                                        xtype: 'button',
                                        text: '查找'
                                    }
                                ]
                            },
                            {
                                xtype: 'list',
                                flex: 1,
                                data: [
                                    {
                                        name: 'DTK'
                                    },
                                    {
                                        name: 'DTK'
                                    },
                                    
                                ],
                                itemTpl: [
                                    '<table border=0 class="p_Choose_List">',
                                    '  <tr>',
                                    '      <td class="p_Choose_List_name">{name}</td>',
                                    '      <td class="p_Choose_List_right">#</td>',
                                    '  </tr>',
                                    '</table>'
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: '办理意见',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'formpanel',
                                flex: 1,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        items: [
                                            {
                                                xtype: 'textareafield',
                                                placeHolder: '请输入意见内容'
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