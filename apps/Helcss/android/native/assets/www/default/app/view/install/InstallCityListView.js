
/* JavaScript content from app/view/install/InstallCityListView.js in folder common */
Ext.define('Helcss.view.install.InstallCityListView', {
    extend: 'Ext.Container',
    id:'inst_city_listview',
    config: {
        layout:'vbox',
        style:'background:#eee',
        items: [
            {
                xtype: 'toolbar',
                id:'inst_city_listview_toolbar',
                docked: 'top',
                title: '<b>安装项目所在城市</b>',
                items: [
                    {
                        xtype: 'button',
                        id:'inst_city_back',
                        ui: 'back',
                        text: '首页' 
                    }
                ]
            },
            {
            	xtype: 'list',
                margin: '40 auto 40 auto',
                width: '85%',
                scrollable: true,
                flex: 1,
                hideOnMaskTap: false,
                modal: false,
                id : 'inst_city_list',
                itemTpl: [
                    '{city}'
                ],
                onItemDisclosure: true,
                store: 'InstallCityListStore'
            }
        ]
    },
    
    initialize: function() {
    	if(PDsystem==1){
    		Ext.getCmp('inst_city_listview_toolbar').setStyle('font-size:12pt');
    		Ext.getCmp('inst_city_list').setItemTpl('<div class="YaoJiao_size">{city}</div>');
    	};
    		
    	
    },
    
    loadCity : function(resultSet) {
    	 var store = Ext.data.StoreManager.get("InstallCityListStore"); 
   		  if (!store) { 
   		    store = Ext.create("Helcss.store.install.InstallCityListStore"); 
   		  }  
   		store.setData(resultSet);
    }
    
});

 