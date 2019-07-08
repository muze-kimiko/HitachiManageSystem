
/* JavaScript content from app/view/customer/customerList.js in folder common */
/*
 * File: app/view/MyPanel36.js
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

Ext.define('HelcPDA.view.customer.customerList', {
    extend: 'Ext.Panel',
     id:'customerList-VID',
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
                title: '客户查询-列表',
                items: [
                    {
                        xtype: 'button',
                        ui:'back',
                        text: '返回',
                        id:'customerList-VID_FH_BUTTON',
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                xtype: 'list',
                id:'customerlist',
                data: [
                    
                ],
                height: '100%',
                itemId: 'mylist7',
                itemTpl: [
                    '<table border=0 width=100% style="color:#666">',
                    '  <tr>',
                    '    <td width=60% style="color:#000;font-size:18px;">{ACCNT_NAME}</td>',
                 //   '    <td width=40% style="padding-right:18px;text-align: right;"></td>',
                    '  </tr>',
                    '</table>'
                ],
                onItemDisclosure: true,
                store:'historyFaultS',
            }
        ]
    }

});