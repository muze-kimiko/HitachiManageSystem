Ext.define('HelcPAD.view.appworkspace.Contract.techParams.TechParams_Wllc_V', {
	id:'techParams_Wllc_V',
	extend: 'Ext.Container',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.Label',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '层站参数',
                items: [
                    {
                        xtype: 'button',
                        id:'backToTechParams',
                        ui: 'back',
                        text: '返回'
                    },
                   ]
            },
            {
            	xtype: 'formpanel',
                flex: 1,
                height: '100%',
                items: [
		                    {
		                    	xtype: 'fieldset',
		                        items: [
		                            {
		                                xtype: 'textfield',
		                                id: 'tpw_ELEVATOR_NUMBER',
		                                label: '工号',
		                                labelWidth: '40%',
		                                readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_WLLC',
		                            	label: '物理楼层',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_XSLC',
		                            	label: '显示楼层',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_CG',
		                            	label: '层高',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_JZ',
		                            	label: '基站',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_BNC',
		                            	label: '避难所',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_BTC',
		                            	label: '泊梯层',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'autoTextArea',
		                            	id: 'tpw_MT',
		                            	label: '门套',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_CHJZS',
		                            	label: '墙厚+装饰',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_MBGD',
		                            	label: '幕板高度',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_TJLX',
		                            	label: 'TWZHX',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_MTREMARK',
		                            	label: '门套备注',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_WZAN',
		                            	label: '外召按钮',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_CJRZHX',
		                            	label: '残疾人召唤箱',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_CJRWZAN',
		                            	label: '残疾人外召按钮',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            }
		                      ]},
		                      {
		                    	  xtype: 'fieldset',
		                    	  title: '厅外', 
		                    	  items: [
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_TWZCQ',
		                            	label: '指层器',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_TWXHD',
		                            	label: '信号灯',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_TWBZZD',
		                            	label: '报站灯(钟)',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_BZDZWZ',
		                            	label: '报站灯(钟)位置',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_TWCHXMEMO',
		                            	label: '召唤箱备注',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            },
		                            {
		                            	xtype: 'textfield',
		                            	id: 'tpw_TWZCQMEMO',
		                            	label: '指层器备注',
		                            	labelWidth: '40%',
		                            	readOnly: true,
		                                cls:'textf',
		                            }
		                            ]
		                    }
	                    ]
            },
	]},
          
});