
/* JavaScript content from app/view/maintain/SignPanel.js in folder common */
/*
 * File: app/view/SignPanel.js
 *
 * This file was generated by Sencha Architect version 3.5.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.4.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.4.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('HelcPDA.view.maintain.SignPanel', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.Panel'
    ],

    config: {
        id: 'SignPanel',
        itemId: 'SignPanel',
        height:'100%',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '签名',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'clearbutton',
                        text: '清除'
                    },{
                        xtype: 'button',
                        itemId: 'backbutton',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        itemId: 'okbutton',
                        text: '确定'
                    }
                ]
            },
            {
                xtype: 'panel',
                height:'100%',
                html: '<canvas id="SignCanvas"></canvas>'
            }
        ]
    }

});