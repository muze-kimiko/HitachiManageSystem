
/* JavaScript content from app/view/LoginView.js in folder common */
/**
 * 登录
 */ 
//用于不同手机牌子控件中产生的不同效果进行统一（现用于下拉列表框）
Ext.define('Ext.Component', {
	override: 'Ext.Component',
    show: function (animation) {
    	return this.callParent([false]);
    },
    hide: function (animation) {
         return this.callParent([false]);
    }
});
Ext.define('HelcBPM.view.LoginView', {
    extend: 'Ext.Container',
    id:'login', 
    requires: [
        'Ext.form.Panel',
        'Ext.Toolbar',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Toggle',
        'Ext.Button'
    ],

    config: {
        style: 'background-image:url(images/i_bg05.jpg); background-size:100% 100%;',
//        layout: {
//            type: 'vbox',
//            pack: 'center'
//        },
        items: [
                {
                    xtype: 'image',
                    id:'login_image',
                    height: 135,
                    margin: '0 0 0 30',
                    width: 153,
                    src: 'images/i_logo01.jpg'
                },            
                {
                xtype: 'formpanel',
                id:'login_image_formpanel',
                height: 300,
                margin: '100 auto 0 auto',
                width: 532,
//                layout: 'vbox',
                scrollable: false,
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        //style: 'height:45pt;padding:0pt;',
                        title: '登录审批系统'
                    },
                    {
                        xtype: 'fieldset',
                        id:'login_fieldset',
                        margin: '30 30 0 30',
                        items: [
                            {
                                xtype: 'textfield',
                                id : 'username', 
                                label:'U',
							    labelCls: 'login-icon',
							    labelWidth: 80,
                                placeHolder: '请输入用户名...',
//                                value:'lgx02165'
                            },
                            {
                                xtype: 'passwordfield',
                                id : 'userpwd', 
                                label:'K',
							    labelCls: 'login-icon',
							    labelWidth: 80,
                                placeHolder: '请输入密码...',
//                                value:'Ww123456'
                            }, {
                            	xtype:'hiddenfield',
                				id:'hf_isRestLogin',
                				value:'0'
                            }
                        ]
                    },
//                    {
//                        xtype: 'fieldset',
//                        id:'login_fieldset2',
//                        margin: '20 30 0 30',
//                        items: [
//                            {
//                                xtype: 'togglefield',
//                                id : 'checkuser', 
//                                margin: 0,
//                                label: '记住账号',
////                                value: '1'
//                            }
//                        ]
//                    },
                    {
                        xtype: 'button',
                        id : "btn_login",
                        margin: '20 30 0 30',
                        height: 40,
                        ui: 'blue',
                        text: '登　录'
                        /*
                        style: 'border-color: #4275b6; background-color: #4275b6;',
                        text: '<span style="color:#fff">登　录</span>'
                        */
                    }
                ]
            },
//            {
//            	xtype: 'label',
//            	html: '版本：V2.1.0 (20150104.1)<br />',
//            	baseCls: 'x-label version_label',
//            },
            {
            	xtype: 'label',
            	margin: '10 auto 0 auto',
                width: 532,
            	html: '版本：V1.1(20180821.1)</span>',
            	baseCls: 'x-label version_label',
            },
            {
                xtype: 'container',
                id:'login_container',
                bottom: 0,
                height: 125,
                style: 'background: url(images/i_bottom_bg01.png); background-size:768px 125px;',
                width: '100%',
                items: [
                    {
                        xtype: 'image',
                        id:'login_image2',
                        height: 14,
                        left: 10,
                        margin: '98 0 0 0 ',
                        width: 360,
                        src: 'images/i_companyName.png'
                    }
                ]
            },
            {
            	xtype: 'hiddenfield',
            	id: 'DeviceNo'
            }
        ]
    },
});

