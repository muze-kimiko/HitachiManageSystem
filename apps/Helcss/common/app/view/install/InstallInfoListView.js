Ext.define('Helcss.view.install.InstallInfoListView', {
    extend: 'Ext.Panel',
    id: 'inst_info_listview',
    config: {
    	layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                id:'inst_info_listview_toolbar',
                docked: 'top',
                title: '<b>安装工号</b>',
                items: [
                    {
                        xtype: 'button',
                        id:'inst_infolist_back',
                        ui: 'back',
                        text: '返回'
                    }/*,
                    {
                        xtype: 'button',
                        id:'inst_infolist_topback', 
                        text: '<span style="font-size:18pt;">首页</span>'
                    }*/
                ]
            },
            {
                xtype: 'panel',
                id:'inst_update_time',
                height: 49,
                style: 'background-image:url(images/01.jpg);background-size:100% 49px;',
                tpl: [
                    '<div style="float:right;padding-right:15px;width:0%;line-height:49px;text-align:right;">更新时间:{update_time}</div>'
                ],
                width: '100%'
                	
            },
            {
                xtype: 'panel',
                id:'inst_info_pcityname',
                height: 60,
                tpl: [
                    '<div style="float:left;padding-left:15px;width:100%;line-height:60px;text-align:left;">',
                    '<h1><span style="color:#c8ac35;">{inst_city}   </span><span style="color:#c8ac35;font-size:16pt">{inst_pname}</span></h1></div>'
                ], 
                width: '100%'
                	
            },
            {
                xtype: 'list',
                id: 'inst_info_list',
                centered: false,
                height: '90%',
                ui: 'round',
                hideOnMaskTap: false,
                modal: false,
                itemTpl: [
                          '<div style="margin: 0 auto; width:100%; height:55px;">', 
                          '<div style="float:left;width:730px;">',
                          '<div style="float:left;width:300px;text-align:left;text-indent:15px">合同：{ENGCONTRACT_NUMBER}</div>',
                          '<div style="float:right;padding-right:15px;width:430px;text-align:right;">客户合同：{CustomerName}</div>',
                          '</div>',
                          '<div style="float:left;width:730px;">',
                          '<div style="float:left;width:300px;text-align:left;text-indent:15px">工号：{ElevatorNo}</div>',
                          '<div style="float:right;padding-right:15px;width:430px;text-align:right;">项目状态：{Status}</div>',
                          '</div>',
                          '</div>'
                 ],	
                onItemDisclosure: true,
                store: 'InstallInfoListStore'
            }
        ]
    },
    initialize: function() {
    	if(PDsystem==1){
    		Ext.getCmp('inst_info_listview_toolbar').setStyle('font-size:12pt');
    		Ext.getCmp('inst_update_time').setHeight(30);
    		Ext.getCmp('inst_update_time').setStyle('background-image:url(images/01.jpg);background-size:100% 30px;');
    		Ext.getCmp('inst_update_time').setTpl('<div style="float:right;padding-right:15px;width:0%;line-height:30px;text-align:right;">更新时间:{update_time}</div>');
    		
    		Ext.getCmp('inst_info_pcityname').setHeight(30);
    		Ext.getCmp('inst_info_pcityname').setStyle('<div style="float:left;padding-left:15px;width:100%;line-height:30px;text-align:left;">');
    		var tpl='<div style="float:left;padding-left:15px;width:100%;line-height:30px;text-align:left;">'+
            '<h1><span style="color:#c8ac35;">{inst_city}   </span><span style="color:#c8ac35;font-size:12pt">{inst_pname}</span></h1></div>';
    		Ext.getCmp('inst_info_pcityname').setTpl(tpl);
    		
    		
    		Ext.getCmp('inst_info_listview').setPadding('0 0 45 0');
    		var trim='<div style="margin: 0 auto; width:100%; height:40px;">'+
            '<div style="float:left;width:730px;">'+
            '<div style="float:left;width:300px;text-align:left;text-indent:15px;font-size:12pt;">合同：{ENGCONTRACT_NUMBER}</div>'+
            '<div style="float:right;padding-right:15px;width:430px;text-align:right;font-size:12pt;">客户合同：{CustomerName}</div>'+
            '</div>'+
            '<div style="float:left;width:730px;">'+
            '<div style="float:left;width:300px;text-align:left;text-indent:15px;font-size:12pt;">工号：{ElevatorNo}</div>'+
            '<div style="float:right;padding-right:15px;width:430px;text-align:right;font-size:12pt;">项目状态：{Status}</div>'+
            '</div>'+
            '</div>';
            Ext.getCmp('inst_info_list').setItemTpl(trim);
    	};
    },
    
    loadInfo : function(resultSet) {
    	var temp = xs_domain;
    	/*if (temp.length > 24) {
    		temp = temp.substring(0,24)+"...";
    	}*/
    	
    	Ext.getCmp('inst_info_pcityname').setData({'inst_city':xs_city,'inst_pname':temp}); 
    	
    	var store = Ext.data.StoreManager.get("InstallInfoListStore"); 
		if (!store) { 
		  store = Ext.create("Helcss.store.InstallInfoListStore"); 
		} 
		store.setData(resultSet,this); 
    }
});

 