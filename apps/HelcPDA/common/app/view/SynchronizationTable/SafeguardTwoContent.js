
Ext.define('HelcPDA.view.SynchronizationTable.SafeguardTwoContent', {
    extend: 'Ext.Container',
    id:'SafeguardTwoContent_id',
    requires: [
        'Ext.Toolbar',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.Spacer',
        'Ext.Button',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                id:'SafeguardTwoContent_id_toolbar',
                docked: 'top',
                title: '',
                items:[{
                    xtype: 'button',
                    id:'SafeguardTwoContent_id_FH',
                    ui: 'back',
                    text: '返回'
                },{
                    xtype: 'spacer'
                },{
                    xtype: 'button',
                    id:'SafeguardTwoContent_id_BC',
                    text: '保存'
                },],
            },
            {
            	id:'SafeguardTwoContent_id_Container_Tabpanel',
                xtype: 'tabpanel',
                flex: 1,
                items: [
                    {
                    	id:'SafeguardTwoContent_id_Container_XXNR',
                        xtype: 'formpanel',
                        title: '信息内容',
                        items: [
                            {
                                xtype: 'fieldset',
                                items: [
                                    {
                                    	id:'SafeguardTwoContent_TaskName',
                                        xtype: 'textfield',
                                        label: '测量标名',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                    {
                                    	id:'SafeguardTwoContent_TaskType',
                                        xtype: 'textfield',
                                        label: '类型',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                    {
                                    	id:'SafeguardTwoContent_MeasureSource',
                                        xtype: 'textfield',
                                        label: '来源',
                                        labelWidth:'40%',
                                        readOnly:true,
                                    },
                                    {//存放当前数据的ID
										id:'SafeguardTwoContent_Hidden_ID',
									    xtype: 'hiddenfield',
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
									              id:'SafeguardTwoContent_id_TJ',
									              margin: '15 0',
									              width: '90%',
									              text: '提交',
									              
									          },
									          {
									              xtype: 'spacer'
									          }
									      ]
									  },
                                ]
                            }
                        ]
                    },
                    {
                    	id:'SafeguardTwoContent_id_Container_ZYXM',
                        xtype: 'container',
                        title: '作业项目',
                        layout: 'vbox',
                        items: [
							/*{
							    xtype: 'segmentedbutton',
							    centered: false,
							    margin: 10,
							    items: [
							        {
							            xtype: 'button',
							            id:'ZYXM_add',
							            text: '增加'
							        },
							    ]
							},*/
                            {
                                xtype: 'list',
                                id:'SafeguardTwoContent_id_list_ZYXM',
                                margin: '0 0 0 0',
                                flex: 1,
                                /*store:'SynchronizationTable_ZYXM_Store',
                                itemTpl: [
                                    '<div>{MeasureItemName}</div>'
                                ]*/
                            },
                            
                        ]
                    },
                    {
                    	id:'SafeguardTwoContent_id_Container_YLWT',                       
                    	xtype: 'container',
                        title: '遗留问题',
                        layout: 'vbox',
                        hidden:true,
                        items: [
                            /*{
                                xtype: 'toolbar',
                                docked: 'top',
                                items: [
                                    {
                                        xtype: 'button',
                                        text: '添加'
                                    }
                                ]
                            },*/
                            {
                                xtype: 'segmentedbutton',
                                centered: false,
                                margin: 10,
                                items: [
                                    {
                                        xtype: 'button',
                                        id:'YLWT_Add',
                                        text: '增加'
                                    },
                                    /*{
                                        xtype: 'button',
                                        id:'batchApply_fpdh_delete',
                                        text: '删除'
                                    }*/
                                ]
                            },
                            {
                                xtype: 'list',
                                id:'SafeguardTwoContent_id_list_YLWT',
                                margin: '50 0 0 0',
                                flex: 1,
                                store:'SynchronizationTable_YLWT_Store',
                                itemTpl: [
                                    '<div style="width:100%;height:40px;">{MeasureLegacyProjectNo}</div>'
                                ],
                                onItemDisclosure: true,
                            },
                           
                        ]
                    },
                    {
                    	id:'SafeguardTwoContent_id_Container_QTBLXM',
                        xtype: 'container',
                        title: '其他不良项目',
                        layout: 'vbox',
                        hidden:true,
                        items: [
                            {
                                xtype: 'segmentedbutton',
                                centered: false,
                                margin: 10,
                                items: [
                                    {
                                        xtype: 'button',
                                        id:'QTBLXM_Add',
                                        text: '增加'
                                    },
                                ]
                            },
                            {
                                xtype: 'list',
                                id:'SafeguardTwoContent_id_list_QTBLXM',
                                margin: '50 0 0 0',
                                flex: 1,
                                store:'SynchronizationTable_QTBLXM_Store',
                                itemTpl: [
                                    '<div style="width:100%;height:40px;">{MeasureBadItemDesc}</div>'
                                ],
                                onItemDisclosure: true,
                            },
                           
                        ]
                    },
                ]
            }
        ]
    }

});