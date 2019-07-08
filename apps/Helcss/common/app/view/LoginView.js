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
Ext.define('Helcss.view.LoginView', {
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
        style: 'background-image:url(images/i_bg01.jpg); background-size:768px 1024px; -moz-background-size:768px 1024px;',
//        layout: {
//            type: 'vbox',
//            pack: 'center'
//        },
        items: [
                {
                	 xtype: 'panel',
                     id:'login_image_formpanel_home',
                     layout: 'hbox',
                     scrollable: false,
                     width: '100%',
                     height: 135,
                     items:[{
                    	 xtype: 'image',
                         id:'login_image',
                         height: 135,
                         margin: '0 0 0 30',
                         width: 153,
                         src: 'images/i_logo01.jpg', 
                     },{
                    	 xtype: 'label',
                     	id:'login_label',
                     	//html: '版本：V2.1.0 (2015121AA0104.1)<br />',
                     }]
                },
                /*{
                    xtype: 'image',
                    id:'login_image',
                    height: 135,
                    margin: '0 0 0 30',
                    width: 153,
                    src: 'images/i_logo01.jpg',
                },*/
               /* {
                	xtype: 'label',
                	id:'login_label',
                	//html: '版本：V2.1.0 (20150104.1)<br />',
                	//baseCls: 'x-label version_label',
                },*/
                {
                xtype: 'formpanel',
                id:'login_image_formpanel',
                height: 350,
                margin: '150 auto 0 auto',
                width: '70%',
                layout: 'vbox',
                scrollable: false,
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        //style: 'height:45pt;padding:0pt;',
                        title: '登录系统'
                    },
                    {
                        xtype: 'fieldset',
                        id:'login_fieldset',
                        margin: '30 30 0 30',
                        items: [
                            {
                                xtype: 'textfield',
                                id : 'username', 
                                padding: '0 0 0 10',
                                required: true,
//                              value:'wank1',
                                placeHolder: '用户名'
                            },
                            {
                                xtype: 'passwordfield',
                                id : 'password', 
                                padding: '0 0 0 10',
                                label: '',
                                required: true,
//                                value:'1',
//                                value:'wk9008',
                                placeHolder: '密码'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        id:'login_fieldset2',
                        margin: '20 30 0 30',
                        items: [
                            {
                                xtype: 'togglefield',
                                id : 'checkuser', 
                                margin: 0,
                                label: '记住账号'
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        id : "loginButton",
                        margin: '20 30 0 30',
                        height: 40,
                        style: 'border-color: #4275b6; background-color: #4275b6;',
                        text: '<span style="color:#fff">登　录</span>'
                    }
                ]
            },
            {
            	xtype: 'label',
            	html: '版本：V2.1.0 (20150104.1)<br />',
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
            }
        ]
    },
    initialize: function() {
    	console.log('LoginView.js initialize');
    	if(checktoggle=="true"){ 
    		Ext.getCmp('username').setValue(loginuser);
    		Ext.getCmp('checkuser').toggle();
    	}
    	
    	//页面判断
    	if(PDsystem==1){
    		Ext.getCmp('login_image_formpanel_home').setHeight(70);
    		//页面的背景图片
    		Ext.getCmp('login').setStyle('background-image:url(images/login_bg.jpg); background-size:100% 100%;');
    		//第二图标login_bg
    		var loginHtml='<div style="color:white;font-size:18pt;width:100%;height:100%">ELE-CLOUD</div>'+
    					  '<div style="color:white;font-size:6pt;width:100%;height:100%">移动终端信息平台</div>';
    		Ext.getCmp('login_label').setHtml(loginHtml);
    		Ext.getCmp('login_label').setMargin('10 0 0 20');
    		//和login_image_formpanel关联
    		//Ext.getCmp('login_label').setMargin('52px 0 0 60px');
    		//图标
    		Ext.getCmp('login_image').setHeight(70);
    		Ext.getCmp('login_image').setMargin('0 0 0 20');
    		Ext.getCmp('login_image').setWidth(80);
    		Ext.getCmp('login_image').setSrc('images/i_logo01.jpg');
    		//登陆框
    		Ext.getCmp('login_fieldset').setMargin('30 10 10 10');
    		Ext.getCmp('login_fieldset2').setMargin('0 10');
    		Ext.getCmp('login_image_formpanel').setHeight(300);
    		Ext.getCmp('login_image_formpanel').setMargin('50 auto 0 auto');
    		Ext.getCmp('login_image_formpanel').setWidth('80%');
    		Ext.getCmp('loginButton').setMargin(10);
    		Ext.getCmp('checkuser').setLabelWidth('60%');
    		//底部
    		Ext.getCmp('login_container').setStyle('background: url(images/i_bottom_bg01.png); background-size:100% 100%;');
    		Ext.getCmp('login_container').setHeight(70);
    		//底部2
    		Ext.getCmp('login_image2').setMargin('53 0 0 0 ');
    		Ext.getCmp('login_image2').setWidth('100%');
    		Ext.getCmp('login_image2').setStyle('background-size:80% 100%;');
    		
    	};
    }

});

