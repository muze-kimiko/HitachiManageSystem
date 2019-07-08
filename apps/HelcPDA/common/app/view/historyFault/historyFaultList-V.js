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

Ext.define('HelcPDA.view.historyFault.historyFaultList-V', {
    extend: 'Ext.Panel',
     id:'historyFaultList-VID',
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
                title: '历史故障查询-列表',
                id:'historyFaultList-VID_FH_BUTTON',
                items: [
                    {
                        xtype: 'button',
                        ui:'back',
                        text: '返回',
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                xtype: 'list',
                id:'historylist',
                data: [
                    
                ],
                height: '100%',
                itemId: 'mylist7',
                itemTpl: [
                    '<table border=0 width=100% style="color:#666">',
                    '  <tr>',
                    '    <td width=60% style="color:#000;font-size:18px;">{ASSET_NUM}/{ \FAULT_DOMAIN}</td>',
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