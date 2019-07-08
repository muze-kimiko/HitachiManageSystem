
/* JavaScript content from app/view/LoginView.js in folder common */
Ext.define('Ext.Component', {
    override: 'Ext.Component',
    show: function (animation) {
        return this.callParent([false]);
    },
    hide: function (animation) {
        return this.callParent([false]);
    }
});
Ext.define('HelcPDA.view.LoginView', {
    extend: 'Ext.Panel',
    id: 'loginView',
    requires: [
        'Ext.Img',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Password',
        'Ext.field.Toggle',
        'Ext.Button'
    ],

    config: {
        cls: 'grey_bg',
        style: 'background-image:url(images/login_bg.jpg);background-size:100% 100%;',
        layout: 'vbox',
        items: [
            {
                xtype: 'image',
                height: 37,
                left: 20,
                top: 0,
                width: 80,
                src: 'images/hitachi.jpg'
            },
            {
                xtype: 'image',
                height: 44,
                left: 20,
                top: 94,
                width: 148,
                src: 'images/login_name.png'
            },
            {
                xtype: 'container',
                margin: '170 20',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'formpanel',
                        height: 210,
                        scrollable: false,
                        items: [
                            {
                                xtype: 'fieldset',
                                margin: '15 10 10 10',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id:'username',
                                        inputCls: 'l_Inpur_box',
                                        labelWidth: '40%',
                                        placeHolder: '用户名'
                                    },
                                    {
                                        xtype: 'passwordfield',
                                        id:'password',
                                        inputCls: 'l_Inpur_box',
                                        labelWidth: '40%',
                                        placeHolder: '密码'
                                    }
                                ]
                            },
                            {
                                xtype: 'togglefield',
                                id: 'checkuser',
                                margin: '0 10',
                                value: 1,
                                style: '',
                                label: '记住账号',
                                labelCls: 'l_Inpur_label',
                                labelWidth: '40%'
                            },
                            {
                                xtype: 'button',
                                id:'loginButton5',
                                baseCls: 'x-button helcmg_btn',
                                margin: 10,
                                text: '登录'
                            }
                        ]
                    },
                    {
                    	xtype: 'label',
                    	html: '版本：<span id="spn_app_version">V3.5.2(N2018.10.09.1)</span><br />设备：<span id="showDeviceNo"></span><br />imei：<span id="showImei"></span><br />imsi：<span id="showImsi"></span>',
                    	baseCls: 'x-label version_label',
                    }
                ]
            },
            {
                xtype: 'container',
                docked: 'bottom',
                height: 30,
                style: 'background-image:url(images/login_01.png);background-size:100% 100%;',
                items: [
                    {
                        xtype: 'image',
                        height: 12,
                        left: 10,
                        margin: '8 0 0 0',
                        width: 290,
                        src: 'images/i_companyname.png'
                    }
                ]
            },
			{
				xtype:'hiddenfield',
				id:'IsEnrollMaaS360',
				value:'N'
			},
            {
            	xtype:'hiddenfield',
            	id:'MaaS360Info',
            }
        ]
    },
    initialize: function() {
    	if(checktoggle=="true"){ 
    		Ext.getCmp('username').setValue(loginuser);
    	} 
    },
});