
/* JavaScript content from app/view/XunshiPlanlistView.js in folder common */
/**
 * XunshiPlanlistView
 */ 
Ext.define('Helcss.view.XunshiPlanlistView', {
    extend: 'Ext.Panel',
    id:'xsplanlist',
    config: {
        style: '',
        items: [
            {
                xtype: 'toolbar',
                id:'xsplanlist_toolbar',
                docked: 'top',
                title: '<b>保养计划</b>',
                items: [
                    {
                        xtype: 'button',
                        id:'xs_planlist_back',
                        ui: 'back',
                        text: '返回'
                    }
                ]
            }, 
            {
                xtype: 'list',
                id:'xsplanlist_list',
                centered: false,
                height: '100%',
                style: '',
                ui: 'round',
                hideOnMaskTap: false,
                modal: false,
                itemTpl: ['<div style="display:none;">{ele_no}</div>',
                          '<div style="margin: 0 auto; width:100%; color:#666;">', 
                          '<h1 style="margin:0 0 5px 0;width:100%;text-indent:15px">电梯工号:{ele_no}</h1>',
                          '<div style="width:100%;height:40px;"><div style="float:left;width:60%;text-align:left;text-indent:15px">时间:{plan_start_dt}</div></div>',
                          '<div style="width:100%;height:40px;"><div style="float:left;width:60%;text-align:left;text-indent:15px">作业人员①:{person_name1}</div><div style="float:right;padding-right:15px;width:35%;text-align:right;">作业人员②:{person_name2}</div></div>',
                          '<div style="width:100%;height:40px;"><div style="float:left;width:60%;text-align:left;text-indent:15px">地盘名称:{ele_domain}</div></div>',
                          '</div>' 
                 ],
                onItemDisclosure: false,
                store: 'XunshiPlanlistStore',
//                onItemDisclosure: function(record) { 
//                	xs_plan_id=record.data.id; 
//                	console.log("xs_plan_id:"+xs_plan_id); 
//                    var main = Ext.getCmp('xunshiplaninfo');
//            		if(!main){
//            			main = Ext.create('Helcss.view.XunshiPlaninfoView');
//            		} 
//            		Ext.Viewport.setActiveItem(main);
//                 },
                 listeners: {  
   		            itemtap: function(record, index) {
 	  		              var store = Ext.data.StoreManager.get("XunshiPlanlistStore"); 
 	  		       		  if (!store) { 
 	  		       		    store = Ext.create("Helcss.store.XunshiPlanlistStore"); 
 	  		       		  }   
   		       		  
 	  		             xs_plan_id=store.getAt(index).get('id');  
                         var main = Ext.getCmp('xunshiplaninfo');
                     	if(!main){
                     			main = Ext.create('Helcss.view.XunshiPlaninfoView');
                     	 } 
                 	     Ext.Viewport.setActiveItem(main); 
   		             }
                    }  
            }
        ]
    },
    initialize: function() {
    	if(PDsystem==1){
        	Ext.getCmp('xsplanlist_toolbar').setStyle('font-size:12pt');
    		var trim='<div style="display:none;">{ele_no}</div>'+
            '<div style="margin: 0 auto; width:100%; color:#666;">'+ 
            '<h1 style="margin:0 0 5px 0;width:100%;text-indent:15px">电梯工号:{ele_no}</h1>'+
            '<div style="width:100%;height:20px;"><div style="float:left;width:60%;text-align:left;text-indent:15px">时间:{plan_start_dt}</div></div>'+
            '<div style="width:100%;height:20px;"><div style="float:left;width:60%;text-align:left;text-indent:15px">作业人员①:{person_name1}</div><div style="float:right;padding-right:15px;width:35%;text-align:right;">作业人员②:{person_name2}</div></div>'+
            '<div style="width:100%;height:20px;"><div style="float:left;width:60%;text-align:left;text-indent:15px">地盘名称:{ele_domain}</div></div>'+
            '</div>';
    		Ext.getCmp('xsplanlist_list').setItemTpl(trim); 
    		Ext.getCmp('xsplanlist_list').setStyle('font-size:9pt');
    	};
    	
    	myLoading.show();
    	var store = Ext.data.StoreManager.get("XunshiPlanlistStore"); 
		  if (!store) { 
		    store = Ext.create("Helcss.store.XunshiPlanlistStore"); 
		  } 
		   
//    	var invocationData = {  
//                adapter : 'HttpAdapter',  
//                procedure : 'getStories',
//                parameters : ['jianshiAction.do?method=SearchBy_No', "{'ele_no':"+"'"+xs_ele_no+"'"+"}"]
//        }; 
    	
    	var invocationData = {  
                adapter : 'SqlAdapter',  
                procedure : 'procedure_xsplanList',
//                parameters : ['08G015114']
                parameters : [xs_ele_no]
                
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
                    		console.log("resultSet:"+resultSet);  
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