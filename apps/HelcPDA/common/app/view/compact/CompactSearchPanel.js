Ext.define('HelcPDA.view.compact.CompactSearchPanel', {
    extend: 'Ext.List',
    id:'Compactlist',
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
                title: '合同信息查询',
                items: [
                    {
                        xtype: 'button',
                        id:'backToMenus',
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
                        placeHolder: '输入合同编号或名称...',
                        id:'serach_Cont'
                    },
                    {
                        xtype: 'button',
                        width: '20',
                        iconCls: 'search',
                        text: '查询',
                        id:'btn_compactSearch'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }],
           store:'CompactSearchStore',
  		   itemTpl:[
  		            '<div>{AGREE_NUM}/{AGREE_NAME}<div>'
  		            ],
				
		   },
		   onItemDisclosure: true
});