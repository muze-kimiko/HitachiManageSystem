Ext.define('HelcPDA.view.TAZXView', {
	id: 'TAZXView_id',
	extend: 'Ext.Panel',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.field.Text',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '提案文化在线',
                items:[
                       {
                    	   xtype:'button',
                    	   id:'backToMenus',
                           ui: 'back',
                           text: '主页'
                       }
                       ]
            },
            {
                xtype: 'button',
                text: '(内网)提案文化在线',
                width: '60%',
                margin: '30 auto 0 auto',
                listeners:{
                    tap:function(){
                    	var url = "http://proposal.hitachi-helc.com/";
                    	WL.App.openURL(url);
                       }
                }
            },
            {
                xtype: 'button',
                text: '(外网)提案文化在线',
                width: '60%',
                margin: '30 auto 0 auto',
                listeners:{
                    tap:function(){
//                    	var url = "http://113.107.4.34:21819/Download/download.ashx?userid="+userid+"&pwd="+loginpassword;
//                    	WL.App.openURL(url);
                    	Ext.Msg.alert('暂未开通，敬请期待！');
                       }
                }
            }
        ]
    }

});