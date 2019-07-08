/**
 * 只能看的页面
 */
Ext.define('HelcPAD.view.common.Hang', {
    extend: 'Ext.Container',
    id:'hang_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
    	layout: 'vbox',
        items: [
            {
            	id:'hang_id_toolbar',
                xtype: 'toolbar',
                docked: 'top',
                title: '',
                cls:'textf',
                items: [
                    {
                    	id:'hang_id_FH',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                    },
                    {
                        xtype: 'spacer'
                    },
                    /*{
                        xtype: 'button',
                        text: '保存',
                        id:'performanceAgentConfirmHang_BC',
                    },*/
                ]
            },
            {
	            xtype: 'formpanel',
	            flex: 1,
	            height: 600,
	            items: [
	                {
	                    xtype: 'fieldset',
	                    cls:'textf',
	                    items: [						
	                        {
	                        	id:'hang_id_one',
	                        	xtype: 'textfield',
                                width:'100%',
                                hidden:true,
	                        },
	                        {
	                        	id:'hang_id_two',
	                        	xtype: 'textfield',
                                width:'100%',
                                hidden:true,
	                        },
	                        {
	                        	id:'hang_id_three',
	                        	xtype: 'textfield',
                                width:'100%',
                                hidden:true,
	                        },
	                        {
	                        	id:'hang_id_four',
	                        	xtype: 'textfield',
                                width:'100%',
                                hidden:true,
	                        },
	                        {
	                        	id:'hang_id_five',
	                        	xtype: 'textfield',
                                width:'100%',
                                hidden:true,
	                        },
	                        {
	                        	id:'hang_id_six',
	                        	xtype: 'textfield',
                                width:'100%',
                                hidden:true,
	                        },
	                        {
	                        	id:'hang_id_seven',
	                        	xtype: 'textfield',
                                width:'100%',
                                hidden:true,
	                        },
	                        {
	                        	id:'hang_id_eight',
	                        	xtype: 'textfield',
                                width:'100%',
                                hidden:true,
	                        },
	                        {
	                        	id:'hang_id_nine',
	                        	xtype: 'textfield',
                                width:'100%',
                                hidden:true,
	                        },
	                        {
	                        	id:'hang_id_ten',
	                        	xtype: 'textfield',
                                width:'100%',
                                hidden:true,
	                        },
	                        {
	                        	id:'hang_id_eleven',
	                        	xtype: 'textfield',
                                width:'100%',
                                hidden:true,
	                        },
	                        
	                    ]
	                }
	            ]
            }
    ]}
});         	