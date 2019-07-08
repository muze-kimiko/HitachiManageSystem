/*
 * File: app/view/Device/systemFloor1C.js
 *
 * This file was generated by Sencha Architect
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

Ext.define('HelcRemote.view.Device.systemFloor1C', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.Panel'
    ],

    config: {
        id: 'device_systemFloor1C',
        layout: 'vbox',
        items: [
            {
                xtype: 'panel',
                flex: 1,
                cls: 'remote-device',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'panel',
                        cls: 'remote-device-Box',
                        height: 120,
                        id: 'F1CSYS',
                        width: '38%',
                        layout: {
                            type: 'vbox',
                            align: 'start'
                        }
                    },
                    {
                        xtype: 'panel',
                        cls: 'remote-device-Box',
                        height: 120,
                        id: 'F1CPJ1',
                        width: '38%',
                        layout: {
                            type: 'vbox',
                            align: 'start'
                        }
                    }
                ]
            }
        ]
    }

});