/**
 * XunshidomainView
 */
Ext.define('Helcss.view.XunshidomainView', {
    extend: 'Ext.Panel',
    id:'xsdomain',
    config: {
        layout:'vbox',
        style:'background:#eee',
        items: [
            {
                xtype: 'toolbar',
                id:'xsdomain_toolbar',
                docked: 'top',
                title: '<b>项目名称</b>',
                items: [
                    {
                        xtype: 'button',
                        id:'xs_domain_back',
                        ui: 'back',
                        text: '返回' 
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
                id:'Xdo_list',
            	itemTpl: [
                    '{ele_domain}'
                ],
                onItemDisclosure: true,
                store: 'XunshidomainStore',
//                onItemDisclosure: function(record) { 
//                	xs_domain=record.data.ele_domain; 
//                    var main = Ext.getCmp('xsghlist');
//            		if(!main){
//            			main = Ext.create('Helcss.view.XunshighListView');
//            		} 
//            		Ext.Viewport.setActiveItem(main);
//                 },
                 listeners: {  
  		            itemtap: function(record, index) {
	  		              var store = Ext.data.StoreManager.get("XunshidomainStore"); 
	  		       		  if (!store) { 
	  		       		    store = Ext.create("Helcss.store.XunshidomainStore"); 
	  		       		  }   
  		       		  
  		       		     xs_domain=store.getAt(index).get('ele_domain'); 
  		       		     
//		  		        var main = Ext.create("Helcss.view.XunshighListView");
//		  		  		// 判断当旧视图存在的时候就从Viewport移除
//		  		  		main.on("deactivate", function(oldActiveItem, container, newActiveItem, eOpts) {  
//		  		  			if (oldActiveItem) {
//		  		  				Ext.Viewport.remove(oldActiveItem, true);  
//		  		  			}  
//		  		  		});
  		       		     
                        var main = Ext.getCmp('xsghlist');
                    	if(!main){
                    			main = Ext.create('Helcss.view.XunshighListView');
                    	 } 
                    	 
                	     Ext.Viewport.setActiveItem(main);
                	     main.stopxs_Interval_action();
  		             }
                   }  
            }
        ]
    },
    initialize: function() {
    	if(PDsystem==1){
    		Ext.getCmp('xsdomain_toolbar').setStyle('font-size:12pt');
    		Ext.getCmp('Xdo_list').setItemTpl('<div class="YaoJiao_size">{ele_domain}</div>');
    	};
    	
    	myLoading.show(); 
    	var store = Ext.data.StoreManager.get("XunshidomainStore"); 
		  if (!store) { 
		    store = Ext.create("Helcss.store.XunshidomainStore"); 
		  } 
		  
		  var invocationData = {  
	                adapter : 'SqlAdapter',  
	                procedure : 'procedure_xsdomainList',
	                parameters : [loginusername,xs_city] 
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
		  
		   
//    	var invocationData = {  
//                adapter : 'HttpAdapter',  
//                procedure : 'getStories',
//                parameters : ['xunshiAction.do?method=toSearch_domain', "{'userid':'wank1','city':"+"'"+xs_city+"'"+"}"]
//        }; 
// 
//    	WL.Client.invokeProcedure(invocationData, {
//            onSuccess : function (result) { 
//            	var httpStatusCode = result.status;
//            	if (200 == httpStatusCode) {
//                    var invocationResult = result.invocationResult;
//                    var isSuccessful = invocationResult.isSuccessful;
//                    if (true == isSuccessful) {
//                    	var status = invocationResult.status.code;
//                    	if (status == 250) {
//                            var result = invocationResult.content; 
//                            // 转化成JSON对象
//                            var json = eval("("+ result +")");
//                            store.setData(json.rows,this);   
//                    	} else {
////                    		alert("服务器出错！");
//                    	}
//                    } else {
////                    	alert("网络出错！");
//                    }
//                } else {
////                	alert("网络出错！");
//                }
//            },  
//            onFailure : function () {alert('ff');}
//        });
    	
 
    }

});