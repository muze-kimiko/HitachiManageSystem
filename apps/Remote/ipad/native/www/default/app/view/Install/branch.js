
/* JavaScript content from app/view/Install/branch.js in folder common */
/*
 * File: app/view/Install/branch.js
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

Ext.define('HelcRemote.view.Install.branch', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.Panel',
        'Ext.Label',
        'Ext.Button',
        'Ext.dataview.DataView',
        'Ext.XTemplate'
    ],

    config: {
        cls: 'remote-service',
        id: 'Install_Branch',
        layout: 'vbox',
        items: [
            {
                xtype: 'panel',
                cls: 'remote-breadCrumb',
                docked: 'top',
                items: [
                    {
                        xtype: 'label',
                        cls: 'remote-breadCrumb-con',
                        html: '售后 > 安装 > 地区 > 分公司',
                        id: 'Install_Branch_title'
                    },
                    {
                        xtype: 'panel',
                        cls: 'remote-breadCrumb-buttonBox',
                        docked: 'right',
                        items: [
                            {
                                xtype: 'button',
                                cls: 'remote-buttonColor-orange',
                                id: 'Install_Branch_BtnReturn',
                                text: '返回'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'panel',
                flex: 1,
                cls: [
                    'remote-content',
                    'remote-service'
                ],
                layout: 'vbox',
                items: [
                    {
                        xtype: 'panel',
                        flex: 1,
                        cls: 'remote-service-FaultMonitor',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'panel',
                                cls: 'remote-title',
                                docked: 'top',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'label',
                                        cls: 'remote-titleText',
                                        docked: 'left',
                                        html: '安装合同列表',
                                        id: 'Install_Branch_Code'
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                flex: 1,
                                cls: 'remote-InstaleftL-leftListBox',
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'dataview',
                                        flex: 1,
                                        cls: 'remote-FaultMonito-listBox',
                                        id: 'Install_Branch_Projects_List',
                                        itemTpl: [
                                            '<div class="remote-FaultMonito-list">',
                                            '    <div style="width:20%;">{projectNo}</div>',
                                            '    <div style="width:80%;text-overflow:ellipsis;">{project}</div>',
                                            '</div>'
                                        ],
                                        store: 'Install_Branch_Projects'
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