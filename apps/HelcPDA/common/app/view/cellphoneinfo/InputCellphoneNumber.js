Ext.define('HelcPDA.view.cellphoneinfo.InputCellphoneNumber', {
    extend: 'Ext.List',
    id:'cellphoneList',
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
                title: '电话号码可用网络查询',
                items: [
                    {
                        xtype: 'button',
                        id:'backToQueryMenu',
                        ui: 'back',
                        text: '主页'
                    },
                   ]
            },{
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'searchfield',
                        width: '76%',
                        placeHolder: '请输入电话号码',
                        id:'serach_CellphoneNumber'
                    },
                    {
                        xtype: 'button',
                        width: '20',
                        iconCls: 'search',
                        text: '查询',
                        id:'btn_CellphoneSearch'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }],
           store:'InputCellphoneNumberStore',
  		   itemTpl:[
  		            '<div>{CellphoneNumber}<div>'
  		            ],
				
		   },
		   onItemDisclosure: true
});