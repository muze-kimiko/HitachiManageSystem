/**
 * XunshiSearchView
 */
Ext.define('Helcss.view.XunshiSearchView', {
    extend: 'Ext.Panel',

    requires: [
               'Ext.Toolbar',
               'Ext.dataview.List',
               'Ext.XTemplate',
               'Ext.dataview.IndexBar'
           ],

    id:'xssearch',
    config: {
        layout:'vbox',
        style:'background:#eee',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                id:'xssearch_toolbar',
                title: '<b>巡查城市</b>',
                items: [
                    {
                        xtype: 'button',
                        id:'xs_city_back',
                        ui: 'back',
                        text: '首页' 
                    }
                ]
            },
            {
                xtype: 'list',
                id:'Xs_list',
                margin: '40 auto 40 auto',
                width: '85%',
                scrollable: true,
                flex: 1,
                hideOnMaskTap: false,
                modal: false,
                itemTpl: [
                    '{city}'
                ],
                onItemDisclosure: true,
                store: 'XsSeachStore',
                 listeners: {  
 		            itemtap: function(record, index) {
 		              var store = Ext.data.StoreManager.get("XsSeachStore"); 
 		       		  if (!store) { 
 		       		    store = Ext.create("Helcss.store.XsSeachStore"); 
 		       		  }   
 		       		  
 		       		   xs_city=store.getAt(index).get('city');  
                       var main = Ext.getCmp('xsdomain');
                   	  if(!main){
                   			main = Ext.create('Helcss.view.XunshidomainView');
                   		} 
               		   Ext.Viewport.setActiveItem(main); 
 		             }
                  }  
            }
        ]
    },
    initialize: function() {
    	if(PDsystem==1){
    		Ext.getCmp('xssearch_toolbar').setStyle('font-size:12pt');
    		Ext.getCmp('Xs_list').setItemTpl('<div class="YaoJiao_size">{city}</div>');
    	};
    	
    	myLoading.show();
    	
    	var store = Ext.data.StoreManager.get("XsSeachStore"); 
		  if (!store) { 
		    store = Ext.create("Helcss.store.XsSeachStore"); 
		  } 
		 
    	var invocationData = {  
                adapter : 'SqlAdapter',  
                procedure : 'procedure_xscityList',
                parameters : [loginusername] 
        };  
        
    	WL.Client.invokeProcedure(invocationData, {
            onSuccess : function (result) { 
            	var httpStatusCode = result.status;
            	if (200 == httpStatusCode) {
                    var invocationResult = result.invocationResult;
                    var isSuccessful = invocationResult.isSuccessful;
                    if (true == isSuccessful) {
                    	var resultSet = invocationResult.resultSet;
                    	 if(resultSet.length>0){ 
                        	store.setData(resultSet,this); 
                        	myLoading.hide();
	                   	 }else{
	                   		 myLoading.hide();
	                   		 Ext.Msg.alert('提示','没有符合的数据!'); 
	                   		 store.setData([],this);   
	                   	 }  
                    } else {
                        myLoading.hide();
                    	Ext.Msg.alert('提示','获取数据失败!');  
                    }
                } else {
                	myLoading.hide();
                	Ext.Msg.alert('提示','网络出错！'); 
                }
            },  
            onFailure : function () {
            	 myLoading.hide();
            	 Ext.Msg.alert('提示','发送请求失败'); 
            	}
        });
 
    }

});

 