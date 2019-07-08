
/* JavaScript content from app/view/Service/branchMap.js in folder common */
/*
 * File: app/view/Service/branchMap.js
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

Ext.define('HelcRemote.view.Service.branchMap', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.Panel',
        'Ext.Label',
        'Ext.Button',
        'Ext.dataview.DataView',
        'Ext.XTemplate'
    ],

    config: {
        id: 'Service_branchMap',
        layout: 'vbox',
        cls: [
            'remote-content',
            'remote-service'
        ],
        items: [
            {
                xtype: 'panel',
                flex: 1,
                cls: 'remote-service-ChinaMap',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'panel',
                        flex: 1,
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'panel',
                                cls: 'remote-title',
                                items: [
                                    {
                                        xtype: 'label',
                                        cls: 'remote-titleText',
                                        docked: 'left',
                                        html: '分公司保养站'
                                    },
                                    {
                                        xtype: 'button',
                                        hidden: true,
                                        id: 'Service_branchMap_BtnAnimation',
                                        text: '突出动画'
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                flex: 1,
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'dataview',
                                        flex: 1,
                                        cls: 'remote-ChinaMap-SearchData',
                                        id: 'Service_branchMap_DataRegion',
                                        itemTpl: [
                                            '<div class=\'remote-ChinaMap-SearchData-button\'>{maintainName}</div>'
                                        ],
                                        store: 'Service_BranchMap_Region'
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