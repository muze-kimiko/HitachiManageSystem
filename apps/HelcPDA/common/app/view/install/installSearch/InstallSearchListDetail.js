/*
 * File: app/view/MyPanel49.js
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

Ext.define('HelcPDA.view.install.installSearch.InstallSearchListDetail', {
    extend: 'Ext.Panel',
    id:'installSearchListDetail',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.field.Toggle',
        'Ext.field.Search',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '安装详细',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        id:'BackSearch'
                    },
                    {
                        xtype: 'spacer'
                    },
                   {
                    	xtype:'button',
                    	text:'调试',
                    	id:'Search_Ts'
                   },{
                   	xtype:'button',
                	text:'厂检',
                	id:'Search_Cj'
                     }
                ]
            },
                           {
                                	xtype:'fieldset',
                                    height: '100%',
                                    items:[
                                           {
                                               xtype: 'formpanel',
                                               height: '100%',
                                               items: [   //不知作用数据
                                                          {
                                                              xtype: 'hiddenfield',
                                                              label: 'TASK_ID:',
                                                              labelWidth: '50%',
                                                              id:'TASK_ID',
                                                              value: [
                                                              ],
                                                              readOnly: true
                                                          },
                                                           {
                                                               xtype: 'textfield',
                                                               label: '安装合同号:',
                                                               labelWidth: '50%',
                                                               id:'ENGCONTRACT_NUMBER',
                                                               value: [
                                                               ],
                                                               readOnly: true
                                                           },
                                                           {
                                                               xtype: 'textfield',
                                                               label: '工号:',
                                                               id:'ELEVATOR_NO',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           },
                                                           {
                                                               xtype: 'autoTextArea',
                                                               label: '客户名称:',
                                                               id:'CUSTOMER_NAME',
                                                               labelWidth: '50%',
                                                               readOnly: true
                                                           }, {
                                                               xtype: 'autoTextArea',
                                                               label: '安装单位:',
                                                               id:'INSTALL_ADDRESS',
                                                               labelWidth: '50%',
                                                               readOnly: true
                                                           },{
                                                               xtype: 'textfield',
                                                               label: '梯种:',
                                                               id:'ELEVATOR_CLASS_NAME',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           },{
                                                               xtype: 'textfield',
                                                               label: '地监人员:',
                                                               id:'INIT_PERSON_NAME',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           },{
                                                               xtype: 'textfield',
                                                               label: '出仓日期:',
                                                               id:'CCRQ',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           },{
                                                               xtype: 'textfield',
                                                               label: '进场日期:',
                                                               id:'ENTRANCE_DATE',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           },
                                                           {
                                                               xtype: 'textfield',
                                                               label: '报调日期:',
                                                               id:'REPORT_DEBUG_DATE',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           }, {
                                                               xtype: 'textfield',
                                                               label: '报检日期:',
                                                               id:'REPORT_CHECK_DATE',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           },
                                                           {
                                                               xtype: 'textfield',
                                                               label: '调试人员名称:',
                                                               id:'DEBUG_EMPLOYEE_NAME',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           },{
                                                               xtype: 'textfield',
                                                               label: '调试到达日期:',
                                                               id:'DEBUG_ARRIVE_DATE',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           },
                                                           {
                                                               xtype: 'textfield',
                                                               label: '调试完成日期:',
                                                               id:'DEBUG_END_DATE',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           }, {
                                                               xtype: 'textfield',
                                                               label: '厂检人员名称:',
                                                               id:'CHECK_EMPLOYEE_NAME',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           },
                                                           {
                                                               xtype: 'textfield',
                                                               label: '厂检到达日期:',
                                                               id:'CHECK_ARRIVE_DATE',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           },{
                                                               xtype: 'textfield',
                                                               label: '报告签写日期:',
                                                               id:'REPORT_DATE',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           },{
                                                               xtype: 'textfield',
                                                               label: '技监局发证日期:',
                                                               id:'GOV_CHECK_DATE',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           },
                                                           {
                                                               xtype: 'textfield',
                                                               label: '客户移交日期:',
                                                               id:'SIGNED_TRANSFER_DOC_DATE',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           },
                                                           {
                                                               xtype: 'textfield',
                                                               label: '当前状态:',
                                                               id:'STATUS',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           },
                                                           {
                                                               xtype: 'hiddenfield',
                                                               label: '厂检日期:',
                                                               id:'CHECK_DATE',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                           },
                                                           {
                                                             xtype: 'hiddenfield',
                                                             label: '批次:',
                                                             id:'SEQ_NUM',
                                                             labelWidth: '50%',
                                                             value: [
                                                                 
                                                             ],
                                                             readOnly: true
                                                           },
                                                           {
                                                               xtype: 'hiddenfield',
                                                               label: '厂检次第:',
                                                               id:'CHECK_NUM',
                                                               labelWidth: '50%',
                                                               value: [
                                                                   
                                                               ],
                                                               readOnly: true
                                                             },
                                                             {
                                                                 xtype: 'hiddenfield',
                                                                 label: '调试次第:',
                                                                 id:'DEBUG_NUM',
                                                                 labelWidth: '50%',
                                                                 value: [
                                                                     
                                                                 ],
                                                                 readOnly: true
                                                               }
//                                                           {
//                                                               xtype: 'textfield',
//                                                               label: '监理名称:',
//                                                               id:'INIT_PERSON_NAME',
//                                                               labelWidth: '50%',
//                                                               value: [
//                                                                   
//                                                               ],
//                                                               readOnly: true
//                                                           }, {
//                                                               xtype: 'textfield',
//                                                               label: '厂检次第:',
//                                                               id:'CHECK_NUM',
//                                                               labelWidth: '50%',
//                                                               value: [
//                                                                   
//                                                               ],
//                                                               readOnly: true
//                                                           },
//                                                           {
//                                                               xtype: 'textfield',
//                                                               label: '？？日期:',
//                                                               id:'ENTRANCE_DATE',
//                                                               labelWidth: '50%',
//                                                               value: [
//                                                                   
//                                                               ],
//                                                               readOnly: true
//                                                           }
                                               ]
                                           }
                                           ]
                                }]
    
}
});