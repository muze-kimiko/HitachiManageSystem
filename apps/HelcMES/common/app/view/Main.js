Ext.define('HelcMES.view.Main', {
    extend: 'Ext.Container',
    id:'main',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Select'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'MES确认完工',
                items: [
                    {
                        xtype: 'button',
                        id:'btn_quit',
                        cls: 'home_chat',
                        iconCls: 'quit',
                        text: ''
                    }
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                height: 95,
                layout: 'vbox',
                scrollable: false,
                items: [
                    {
                        xtype: 'fieldset',
                        flex: 1,
                        cls:'scan-button',
                        items: [
                            {
                            	id: 'D_UserName',
                                xtype: 'textfield',
                                inputCls: 'rightfield',
                                label: '登录用户',
                                labelWidth: 100,
                                value: '张三',
                                readOnly: true
                            },
                            {
                            	xtype: 'container',
                                layout: 'hbox',
                                items: [
									{
										id: 'SF_WorkCenter',
									    xtype: 'selectfield',
									    inputCls: 'right-blue-field',
									    label: '加工中心',
									    labelWidth: 100,
									    usePicker: true,
									    width: '95%',
									},
									{
										xtype: 'container',
									    flex: 1,
									    items: [
											{
												xtype: 'label',
												html: '<i class="fa fa-angle-down" aria-hidden="true"></i>',
												centered: true,
											},
									    ]
									},
                                ]
                            },
                            {
                            	id: 'D_ShopOrder',
                                xtype: 'textfield',
                                inputCls: 'rightfield',
                                label: '当前订单',
                                labelWidth: 100,
                                readOnly: true,
                            },
                            {
                                xtype: 'hiddenfield',
                                id: 'H_Id',
                            },
                            {
                            	xtype: 'container',
                                layout: 'hbox',
                                items: [
									{
									    xtype: 'button',
									    flex: 1,
									    id:'btn_ScanShopOrder_Start',
									    height: 80,
									    margin: '20 10 20 20',
									    text: '工序开始'
									},
									{
									    xtype: 'button',
									    flex: 1,
									    id:'btn_ScanShopOrder_End',
									    height: 80,
									    margin: '20 20 20 10',
									    text: '工序结束'
									},
                                ]
                            },
                            {
                            	xtype: 'container',
                                layout: 'hbox',
                                items: [
									{
									    xtype: 'button',
									    flex: 1,
									    id:'btn_ScanBreakOrder_Start',
									    height: 80,
									    margin: '0 10 20 20',
									    text: '中断开始'
									},
									{
									    xtype: 'button',
									    flex: 1,
									    id:'btn_ScanBreakOrder_End',
									    height: 80,
									    margin: '0 20 20 10',
									    text: '中断结束'
									},
                                ]
                            },
                            {
                                xtype: 'button',
                                id:'btn_ConfirmShopOrder',
                                height: 80,
                                margin: '0 20 20 20',
                                text: '切换订单扫描'
                            },
                            {
                                xtype: 'button',
                                id:'btn_ScanKeyPart',
                                height: 80,
                                margin: 20,
                                text: '关键件扫描'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});