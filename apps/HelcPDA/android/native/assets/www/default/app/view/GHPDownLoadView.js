
/* JavaScript content from app/view/GHPDownLoadView.js in folder common */
Ext.define('HelcPDA.view.GHPDownLoadView', {
	id: 'GHPDownLoadView_id',
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
                title: '下载GHP应用',
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
                text: '(外网)获取GHP安装包',
                width: '60%',
                margin: '30 auto 0 auto',
                listeners:{
                    tap:function(){
                    	var url = "http://113.107.4.34:21819/Download/download.ashx?userid="+userid+"&pwd="+loginpassword;
                    	WL.App.openURL(url);
                       }
                }
            },
            {
                xtype: 'button',
                text: '(内网)获取GHP安装包',
                width: '60%',
                margin: '30 auto 0 auto',
                listeners:{
                    tap:function(){
                    	var url = "http://10.96.129.120:21819/Download/download.ashx?userid="+userid+"&pwd="+loginpassword;
                    	WL.App.openURL(url);
                       }
                }
            }
        ]
    }

});