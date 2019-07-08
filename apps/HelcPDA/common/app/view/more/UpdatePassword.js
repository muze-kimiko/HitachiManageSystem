Ext.define('HelcPDA.view.more.UpdatePassword', {
	id: 'UpdatePassword_id',
	extend: 'Ext.Panel',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.field.Text'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                id: 'help_toolbar',
                docked: 'top',
                title: '修改密码',
                items: [
                    {
                        xtype: 'button',
                        id: 'backToMenus',
                        ui: 'back',
                        text: '主页'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                height: 600,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '用户信息',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'up_username',
                                label: '用户名',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                            	xtype: 'passwordfield',
                            	id: 'up_password',
                            	label: '原始密码',
                            	labelWidth: '40%',
                            	placeHolder: '请输入原始密码',
                            	readOnly: false
                            },
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '新密码长度至少6位，且包含数字和字母！',
                        items: [
							{
								xtype: 'passwordfield',
								id: 'up_new_password',
								label: '新密码',
								labelWidth: '40%',
								placeHolder: '请输入新密码',
								readOnly: false
							},
							{
								xtype: 'passwordfield',
								id: 'up_re_new_password',
								label: '重复新密码',
								labelWidth: '40%',
								placeHolder: '请重复新密码',
								readOnly: false
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
		                                id: 'update_pw',
		                                text: '修改密码',
		                                margin: '15 0',
		                                width: '90%',
		                            },
		                            {
		                                xtype: 'spacer'
		                            }
		                        ]
		                    }
                        ]
                    },
                    
                ]
            },
            
        ]
    }

});