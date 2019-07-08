/**
 * UpdatePasswordView
 */

Ext.define('Helcss.view.UpdatePasswordView', {
    extend: 'Ext.Panel',
    id:'updatepassword', 
    requires: [
        'Ext.form.Panel',
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
        style: 'background-image:url(images/i_bg01.jpg);background-size:768px 1024px;',
        //layout: {
        //    type: 'vbox',
        //    pack: 'center'
        //},
        items: [
                {
                  xtype: 'toolbar',
                  docked: 'top',
                  title: '修改密码',
                  items: [
                      {
                          xtype: 'button',
                          id:'back_menu',
                          itemId: 'mybutton', 
                          ui: 'back',
                          text: '首页',
                          height: '800'
                      }
                  ]
            },
            {
                xtype: 'formpanel',
                height: 400,
                margin: '200 auto 0 auto',
                width: '70%',
                scrollable: false,
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        style: 'height:45pt;padding:0pt;',
                        title: '密码资料'
//                        items: [
//                            {
//                                xtype: 'button',
//                                itemId: 'login',
//                                id : "loginButton",
//                                height: '100%',
//                                right: 0,
//                                text: '下一步'
//                            }
//                        ]
                    },
                    {
                        xtype: 'fieldset',
                        instructions: '新密码长度至少6位，且包含数字和字母。',
                        margin: 20,
                        items: [
                            {
                                xtype: 'textfield',
                                readOnly:true, 
                                label: '用户名',
                                value:loginusername
                            },
                            {
                                xtype: 'passwordfield',
                                id:'oldpass', 
                                label: '原始密码'
                            },
                            {
                                xtype: 'passwordfield',
                                id:'newpass1', 
                                label: '新密码'
                            },
                            {
                                xtype: 'passwordfield',
                                id:'newpass2', 
                                label: '重复新密码'
                            }
//                            ,
//                            {
//                                xtype: 'button',
//                                itemId: 'upbutton', 
//                                id:'update_button',
//                                margin: '12 0 0 0', 
//                                height: 40,
//                                text: '修改密码'
//                            }
                        ]
                    }
                    ,
                    {
                        xtype: 'button',
                        itemId: 'upbutton', 
                        id:'update_button',
                        height: 40,
                        //width:'85%',
                        margin:'0 20 10 20', 
                        style: 'border-color: #4275b6; background-color: #4275b6;',
                        text: '<font color=white>修改密码</font>'
                    }
                ]
            }
        ],
        listeners: [
                    {
                        fn: 'onMybuttonTap',
                        event: 'tap',
                        delegate: '#mybutton'
                    } 
                ]
            
    }

});

