
/* JavaScript content from app/view/Service/chinaMap.js in folder common */
/*
 * File: app/view/Service/chinaMap.js
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

Ext.define('HelcRemote.view.Service.chinaMap', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.Label',
        'Ext.form.Panel',
        'Ext.field.Text',
        'Ext.Button',
        'Ext.dataview.DataView',
        'Ext.XTemplate'
    ],

    config: {
        id: 'service_chinaMap',
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
                                docked: 'top',
                                items: [
                                    {
                                        xtype: 'label',
                                        cls: 'remote-titleText',
                                        docked: 'left',
                                        html: '全国主要城市天气'
                                    }
                                ]
                            },
                            {
                                xtype: 'formpanel',
                                cls: 'remote-ChinaMap-Search',
                                height: 100,
                                hidden: true,
                                layout: 'hbox',
                                scrollable: false,
                                items: [
                                    {
                                        xtype: 'textfield',
                                        disabled: false,
                                        id: 'service_ChinaMap_FldSearch',
                                        itemId: 'mytextfield',
                                        clearIcon: false,
                                        placeHolder: '请输入城市名称',
                                        listeners: [
                                            {
                                                fn: function(component, eOpts) {
                                                    //var me = this;
                                                    //me.element.on('tap', function(e, t) { me.fireEvent('tap', me, e, t); }, me);
                                                },
                                                event: 'initialize'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'service_ChinaMap_BtnSearch',
                                        itemId: 'service_ChinaMap_BtnSearch',
                                        text: '搜索'
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'service_ChinaMap_BtnClean',
                                        itemId: 'service_ChinaMap_BtnClean',
                                        text: '清除'
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                id: 'service_chinaMap_form',
                                layout: 'hbox'
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
                                        id: 'service_ChinaMap_DataCity',
                                        scrollable: true,
                                        itemTpl: [
                                            '<div class=\'remote-ChinaMap-SearchData-button\'>{cityName}</div>'
                                        ],
                                        store: 'Service_ChinaMap_City'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        id: 'service_chinaMap_PnlOther',
                        items: [
                            {
                                xtype: 'panel',
                                cls: 'remote-ChinaMap-Region',
                                docked: 'left',
                                items: [
                                    {
                                        xtype: 'panel',
                                        cls: 'remote-title',
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'remote-titleText',
                                                docked: 'left',
                                                html: '全国四大区域'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'service_ChinaMap_BtnHd',
                                        text: '华东'
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'service_ChinaMap_BtnHn',
                                        text: '华南'
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'service_ChinaMap_BtnHx',
                                        text: '华西'
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'service_ChinaMap_BtnHb',
                                        text: '华北'
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                cls: 'remote-ChinaMap-Region',
                                docked: 'right',
                                hidden: true,
                                items: [
                                    {
                                        xtype: 'panel',
                                        cls: 'remote-title',
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'remote-titleText',
                                                docked: 'left',
                                                html: '重大故障'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'service_ChinaMap_BtnYs',
                                        text: '演示'
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