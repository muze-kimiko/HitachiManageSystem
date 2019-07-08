Ext.define('Helcss.view.install.InstallPNameView', {
    extend: 'Ext.Panel',
    id:'inst_pname_listview',
    config: {
        style: '',
        items: [
            {
                xtype: 'toolbar',
                id:'inst_pname_listview_toolbar',
                docked: 'top',
                title: '<b>安装项目</b>',
                items: [
                    {
                        xtype: 'button',
                        id:'xs_instpname_back',
                        ui: 'back',
                        text: '返回' 
                    }
                ]
            },
            {
                xtype: 'list',
                id : 'inst_pname_list',
                centered: false,
                height: '100%',
                ui: 'round',
                hideOnMaskTap: false,
                modal: false,
                itemTpl: [
					'<div style="margin: 0 auto; width:100%; height: 90px;">',
					'<h1 style="margin:0 0 5px 0;width:100%;text-indent:15px">{ProjectName}</h1>',
					'  <div style="width:100%;"><div style="float:left;width:100%;text-align:left;text-indent:15px">使用单位：{UNIT}</div></div>',
					'  <div style="width:100%;"><div style="float:left;width:100%;text-align:left;text-indent:15px">工号台量：{counts}</div></div>',
					'</div>'
//                    '<b style="font-size:18pt;">使用单位：{UNIT}</b><br />'+
//                    '<b style="font-size:18pt;">项目名称：{ProjectName}</b><br />'+
//                    '<b style="font-size:18pt;text-align:right;padding-right:20pt;">工号台量：{counts}</b>'
                ],
                /*listeners : {
                	itemtap:function() {alert("bbr")}
                },*/
                onItemDisclosure: true,
                store: 'InstallPNameListStore'
            }
        ]
    },
    
    initialize: function() {
    	if(PDsystem==1){
    		Ext.getCmp('inst_pname_listview_toolbar').setStyle('font-size:12pt');
    		var trim='<div style="margin: 0 auto; width:100%; height: 50px;">'+
			'<h1 style="margin:0 0 5px 0;width:100%;text-indent:15px; font-size:10pt;">{ProjectName}</h1>'+
			'  <div style="width:100%;"><div style="float:left;width:100%;text-align:left;text-indent:15px;font-size:9pt;">使用单位：{UNIT}</div></div>'+
			'  <div style="width:100%;"><div style="float:left;width:100%;text-align:left;text-indent:15px;font-size:9pt;">工号台量：{counts}</div></div>'+
			'</div>';
    		Ext.getCmp('inst_pname_list').setItemTpl(trim);
    	};
    },
    
    loadPname : function(resultSet) {
    	var store = Ext.data.StoreManager.get("InstallPNameListStore"); 
 		  if (!store) { 
 		    store = Ext.create("Helcss.store.install.InstallPNameListStore"); 
 		  }  
 		store.setData(resultSet);
    }

});