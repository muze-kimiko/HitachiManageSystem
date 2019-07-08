
/* JavaScript content from app/view/fault/FaultHandlingReportPanelWorker.js in folder common */
Ext.define('HelcPDA.view.fault.FaultHandlingReportPanelWorker', {
    extend: 'Ext.Panel',
    id:'faultHandlingReportPanelWorker',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Select',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '作业人员',
                items: [
                    {
                        xtype: 'button',
                        id: 'back_FRP',
                        ui: 'back',
                        text: '返回'
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
                                    text: '增加',
                                    id: 'add_worker',
                                    iconCls: 'add',
                                    handler:function(button,e){
                                      	 Ext.Viewport.hideMenu('right');
                                      }
                                },
                                {
                                    text: '修改',
                                    id: 'modify_worker',
                                    iconCls: 'refresh',
                                    handler:function(button,e){
                                      	 Ext.Viewport.hideMenu('right');
                                      }
                                },
                                {
                                    text: '取消',
                                    id: 'cancel_reason_worker',
                                    iconCls: 'delete',
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
                        itemId: 'mybutton6',
                        iconCls: 'more',
                        text: '',
                    }
                ]
            },
            {
                xtype: 'tabpanel',
                id:'Worker_panel',
                flex: 1,
                items: [
                    {
                        xtype: 'container',
                        title: '作业人员信息',
                        height: '100%',
                        scrollable: true,
                        items: [
                            {
                                xtype: 'formpanel',
                                height: 600,
                                scrollable: false,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        items: [
                                            {
                                                xtype: 'selectfield',
                                                id: 'FHRW_STATION_ID',
                                                label: '所属站',
                                                labelWidth:'40%',
                                                placeHolder: '请选择',
                                                valueField:'STATION_CODE',
                                                displayField:'STATION_NAME', 
                                                options: [
                                                ],
                                            },
                                            {
                                                xtype: 'selectfield',
                                                id: 'FHRW_PERSON',
                                                label: '人员',
                                                labelWidth:'40%',
                                                valueField:'PERSON_ID',
                                                displayField:'PERSON_NAME', 
                                                placeHolder: '请选择',
                                                options: [
                                                ],
                                                usePicker: 'auto'
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'FHRW_PERSON_REMARK',
                                                label: '人员备注',
                                                hidden:true,
                                                labelWidth:'40%',
                                                placeHolder: '请输入故障码'
                                            },
                                            {
                                                xtype: 'panel',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'spacer'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: 'Commitworker',
                                                        margin: '15 0',
                                                        width: '90%',
                                                        text: '提交'
                                                    },
                                                    {
                                                        xtype: 'spacer'
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
                        title: '<div id="Fault_WorContainer"></div>',
                        height: '100%',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'list',
                                id:'workerList',
                                store:'WorkerListStore',
                                flex: 1,
                                data: [
                                ],
                                itemTpl: [
                                    '<div style="width:100%; margin:0; padding:0;">',
                                    '    <h1 style="float:left;margin:0; padding:0;">作业人员名称:{EMPOLOYEE_Name}</h1>',
                                    '    <div style="float:right;margin:0;">',
                                    '    <img id="1" style="width:22px;" src="images/delete01.png"/>',
                                    '    </div>',
                                    '</div>'
                                ]
                            },{
                            	xtype:'hiddenfield',
                            	id:'FOR_WorkerList_INDEX'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});