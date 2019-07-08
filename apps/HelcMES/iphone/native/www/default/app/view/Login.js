
/* JavaScript content from app/view/Login.js in folder common */
Ext.define('HelcMES.view.Login', {
    extend: 'Ext.Panel',
    id:'login',
    requires: [
        'Ext.form.Panel',
        'Ext.Label',
        'Ext.Img',
        'Ext.form.FieldSet',
        'Ext.field.Password',
        'Ext.Button'
    ],

    config: {
        cls: 'helcmes-login',
        layout: 'vbox',
        items: [
            {
                xtype: 'formpanel',
                flex: 1,
                scrollable: false,
                items: [
                    {
                        xtype: 'panel',
                        cls: 'helcmes-login-bottom',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'helcmes-login-bottomText',
                                html: '日立电梯<br>MES确认完工'
                            }
                        ]
                    },
                    {
					    xtype: 'image',
					    id:'login_logo',
					    cls: 'helcmes-login-logo',
					    src: 'images/login-logo.png'
					},
                    {
                        xtype: 'fieldset',
                        cls: 'helcmes-login-from',
                        margin: '',
                        items: [
							{
								xtype: 'container',
							    layout: 'hbox',
							    items: [
									{
									    xtype: 'selectfield',
									    id: 'userorg',
									    inputCls: 'blue-field',
									    label: '<i class="fa fa-users helcmes-fontColor-dullGray"></i>',
									    labelWidth: 50,
									    placeHolder: '请选择',
									    options: [
									        {text: '请选择',value: ''},
									        {text: '扶梯工厂',value: 'MES'},
									        {text: '广州工厂',value: 'MESGZ'},
									        {text: '上海工厂',value: 'MESSH'},
									        {text: '天津工厂',value: 'MESTJ'},
									        {text: '成都工厂',value: 'MESCD'}
									    ],
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
                                xtype: 'textfield',
                                label: '<i class="fa fa-user helcmes-fontColor-dullGray"></i>',
                                labelWidth: 50,
                                id:'username',
                                placeHolder: '请输入用户名'
                            },
                            {
                                xtype: 'passwordfield',
                                label: '<i class="fa fa-unlock-alt helcmes-fontColor-dullGray"></i>',
                                labelWidth: 50,
                                id:'userpwd',
                                placeHolder: '请输入密码'
                            },
                            {
                                xtype: 'button',
                                cls: 'helcmes-login-btn',
                                id: 'btn_login',
                                text: '登录'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});