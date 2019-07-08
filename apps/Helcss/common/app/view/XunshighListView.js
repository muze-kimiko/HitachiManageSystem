/**
 * XunshighListView
 */
Ext.define('Helcss.view.XunshighListView', {
    extend: 'Ext.Panel',
    id:'xsghlist',
    config: {
        style: '',
        items: [
            {
                xtype: 'toolbar',
                id:'xsghlist_toolbar',
                docked: 'top',
                title: '<b>巡查</b>',
                items: [
                    {
                        xtype: 'button',
                        id:'xs_ghlist_back',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'button',
                        id:'xs_ghlist_topback', 
                        text: '首页'
                    }
                ]
            },
            {
                xtype: 'panel',
                id:'update_time',
                data: '{"name" : "gengx"},',
                height: 49,
                style: 'background-image:url(images/01.jpg);background-size:100% 49px;',
                tpl: [
                    '<div style="float:right;padding-right:15px;width:90%;line-height:49px;text-align:right;">更新时间:{update_time}</div>'
                ], 
                width: '100%'
                	
            },
            {
                xtype: 'panel',
                id:'toppanel_xsgh',
                data: '{"name" : "gengx"},',
                height: 60,
                tpl: [
                    '<div style="float:left;padding-left:5px;width:90%;line-height:60px;text-align:left;">',
                    '<h1 style="text-indent:15px;color:#c8ac35;">{xs_city} {xs_domain}</h1></div>'
                ], 
                width: '100%'
                	
            },
            {
                xtype: 'list',
                id:'xsghlist_list',
                centered: false,
                height: '90%',
//                height: 871, 
                style: '',
                ui: 'round',
                hideOnMaskTap: false,
                modal: false,
                itemTpl: [
'<table border="0">',
'<div style="display:none;">{ele_no}</div>',
'  <tr height="30" valign="middle">',
'    <td width="320">位置:{ele_site}{ele_tino}</td>',
'    <td width="320" align="right">计划年检:{ele_checkdate}</td>',
'    <td rowspan="3" width="120">',
'      <div style="width:45px;width:45px;float:right;margin-left:05px;">',
'      <tpl if="ismonitor==\'Y\'">',
'        <img id="1" name="{ele_no}" width="40px" height="40px" src="images/icon_wifi-router_gold.png"/>',
'      </tpl>',
'      </div>',
'      <div style="width:45px;width:45px;float:right;margin-left:15px;">',
'      <tpl if="isplan==\'Y\'">',
'        <img id="2" name="{ele_no}" width="40px" height="40px" src="images/icon_clock_gold.png"/>',
'      </tpl>',
'      </div>',
'    </td>',
'  </tr>',
'  <tr height="30" valign="middle">',
'    <td>工号:{ele_no}</td>',
'    <td align="right">梯型:{ele_tyle}  层/站:{ele_layer}/{ele_station}</td>',
'  </tr>',
'  <tr height="30" valign="middle">',
'    <td colspan="2"><img width="380" height="18" src="images/{ele_status}.png"/></td>',
'  </tr>',
'</table>'                          
//                          '<div style="display:none;">{ele_no}</div>',
//                          '<div style="float:right;margin:5px 15px 0 0;">',
//                            '<tpl if="ismonitor==\'Y\'">',
//                              '<img id="1" style="margin-right:15px;" name="{ele_no}" width="32px" height="32px" src="images/icon_wifi-router_gold.png"/>',
//                            '</tpl>',
//                            '<tpl if="isplan==\'Y\'">',
//                              '<img id="2" name="{ele_no}" width="32px" height="32px" src="images/icon_clock_gold.png"/>',
//                            '</tpl>',
//                          '</div>',
//                          '<div style="margin: 0 auto; width:100%; xxx-height:120px;color:#666;">', 
//                            '<div style="float:left;width:580px;xxx-height:40px;">',
//                              '<div style="float:left;width:330px;text-align:left;text-indent:15px">位置:{ele_site}{ele_tino}</div>',
//                              '<div style="float:right;padding-right:15px;width:250px;text-align:right;">计划年检:{ele_checkdate}</div>',
//                            '</div>',
//                            '<div style="float:left;width:580px;xxx-height:40px;">',
//                              '<div style="float:left;width:330px;text-align:left;text-indent:15px">工号:{ele_no}</div>',
//                              '<div style="float:right;padding-right:15px;width:250px;text-align:right;">梯型:{ele_tyle}  层/站:{ele_layer}/{ele_station}</div>',
//                            '</div>',
//                            '<div style="margin: 0 auto; width:705px; height:49px;"><img src="images/{ele_status}.png"/></div>',
//                          '</div>' 
                 ],
                onItemDisclosure: false,
                store: 'Xs_ghlistStore',
//                onItemDisclosure: function(record) { 
//                	xs_ele_no=record.data.ele_no; 
//                	 console.log("xs_ele_no:"+xs_ele_no); 
//                    var main = Ext.getCmp('xsplanlist');
//            		if(!main){
//            			main = Ext.create('Helcss.view.XunshiPlanlistView');
//            		} 
//            		Ext.Viewport.setActiveItem(main);
//                 },
                listeners: {  
  		            itemtap: function(record, index) { 
 
  		            	 if(event.target.id == "1"){
//       		     		      Ext.Msg.alert('You clicked on the Img 1...','The country code selected is: '+ event.target.name);
  		            		  //跳转前关闭定时刷新
			            	   clearInterval(stopxs_Interval);
			      		       stopxs_Interval=undefined;
//			      		       Ext.getCmp('xsghlist').destroy(); 
			      		       
			      		     js_ele_no=event.target.name;
			      		     jkflg='xs';
			      		     
			      		   if(PDsystem==1){
			      			 var main = Ext.getCmp('jianshiinfo_az');
	                       	   if(!main){
	                       		   main = Ext.create('Helcss.view.JianshiinfoView_AZ');
	                       	   }; 
	                   		   Ext.Viewport.setActiveItem(main); 
			      		   }else{
			      			   var main = Ext.getCmp('jianshiinfo');
	                       	   if(!main){
	                       		   main = Ext.create('Helcss.view.JianshiinfoView');
	                       	   }; 
	                   		   Ext.Viewport.setActiveItem(main);  
			      		   };
			      		    
       	    		     } 
  		            	 if(event.target.id == "2"){
  		            		 //跳转前关闭定时刷新
			            	   clearInterval(stopxs_Interval);
			      		       stopxs_Interval=undefined;
//			      		       Ext.getCmp('xsghlist').destroy(); 
				       		  
			  		       		xs_ele_no=event.target.name;
		                        var main = Ext.getCmp('xsplanlist');
			                  	if(!main){
			                  	  main = Ext.create('Helcss.view.XunshiPlanlistView');
			                  	} 
			              	     Ext.Viewport.setActiveItem(main); 
      	    		     } 
  		            	   //跳转前关闭定时刷新
//  		            	   clearInterval(stopxs_Interval);
//  		      		       stopxs_Interval=undefined;
//  		      		       Ext.getCmp('xsghlist').destroy();
//  		            	
//	  		              var store = Ext.data.StoreManager.get("Xs_ghlistStore"); 
//	  		       		  if (!store) { 
//	  		       		    store = Ext.create("Helcss.store.Xs_ghlistStore"); 
//	  		       		  }   
//  		       		  
//	  		       		xs_ele_no=store.getAt(index).get('ele_no');  
//                         var main = Ext.getCmp('xsplanlist');
//                    	if(!main){
//                    			main = Ext.create('Helcss.view.XunshiPlanlistView');
//                    	 } 
//                	     Ext.Viewport.setActiveItem(main); 
  		             }
                   }  
                
                
            }
        ]
    },
    initialize: function() { 
    	if(PDsystem==1){
    		Ext.getCmp('xsghlist_toolbar').setStyle('font-size:12pt;');
        	Ext.getCmp('update_time').setHeight(30);
        	Ext.getCmp('update_time').setStyle('background-image:url(images/01.jpg);background-size:100% 30px;');
        	Ext.getCmp('update_time').setTpl('<div style="float:right;padding-right:15px;width:90%;line-height:30px;text-align:right;font-size:9pt">更新时间:{update_time}</div>');
        	Ext.getCmp('toppanel_xsgh').setStyle('font-size:12pt');
        	Ext.getCmp('toppanel_xsgh').setHeight(30);
        	var tpl='<div style="float:left;padding-left:5px;width:90%;line-height:30px;text-align:left;">'+
            '<h1 style="text-indent:15px;color:#c8ac35;">{xs_city} {xs_domain}</h1></div>';
        	Ext.getCmp('toppanel_xsgh').setTpl(tpl);
        	
    		Ext.getCmp('xsghlist').setPadding('0 0 45 0');
    		var trim='<table border="0">'+
    		'<div style="display:none;">{ele_no}</div>'+
    		'  <tr height="20" valign="middle">'+
    		'    <td width="35%" style="font-size:10pt;">位置:{ele_site}{ele_tino}</td>'+
    		'    <td width="55%" align="right" style="font-size:10pt;">计划年检:{ele_checkdate}</td>'+
    		'    <td rowspan="3" width="10%">'+
    		'      <div style="width:35px;width:35px;float:right;margin-left:05px;">'+
    		'      <tpl if="ismonitor==\'Y\'">'+
    		'        <img id="1" name="{ele_no}" width="30px" height="30px" src="images/icon_wifi-router_gold.png"/>'+
    		'      </tpl>'+
    		'      </div>'+
    		'      <div style="width:35px;width:35px;float:right;margin-left:15px;">'+
    		'      <tpl if="isplan==\'Y\'">'+
    		'        <img id="2" name="{ele_no}" width="30px" height="30px" src="images/icon_clock_gold.png"/>'+
    		'      </tpl>'+
    		'      </div>'+
    		'    </td>'+
    		'  </tr>'+
    		'  <tr height="20" valign="middle">'+
    		'    <td width="35%" style="font-size:10pt;">工号:{ele_no}</td>'+
    		'    <td width="55%" align="right" style="font-size:10pt;">梯型:{ele_tyle}  层/站:{ele_layer}/{ele_station}</td>'+
    		'  </tr>'+
    		'  <tr height="20" valign="middle">'+
    		'    <td colspan="2"><img width="100%" height="45%" src="images/{ele_status}.png"/></td>'+
    		'  </tr>'+
    		'</table>';
    		Ext.getCmp('xsghlist_list').setItemTpl(trim); 
    		Ext.getCmp('xsghlist_list').setStyle('font-size:9pt');
    	};
    	
    	myLoading.show();
    	var store = Ext.data.StoreManager.get("Xs_ghlistStore"); 
		  if (!store) { 
		    store = Ext.create("Helcss.store.Xs_ghlistStore"); 
		  } 
		   
//    	var invocationData = {  
//                adapter : 'HttpAdapter',  
//                procedure : 'getStories',
//                parameters : ['xunshiAction.do?method=Search_gh_list', "{'city':"+"'"+xs_city+"'"+",'domain':"+"'"+xs_domain+"'"+"}"]
//        }; 
    	
    	var invocationData = {  
                adapter : 'SqlAdapter',  
                procedure : 'procedure_xsghList', 
//              parameters : ['鞍山','金色家园']
                parameters : [xs_city,xs_domain]
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
                         	 Ext.getCmp('toppanel_xsgh').setData({'xs_city':xs_city,'xs_domain':xs_domain}); 
                         	 Ext.getCmp('update_time').setData({update_time:resultSet[0].update_time});  
                         	 myLoading.hide();
                    	 }else{
                    		 myLoading.hide();
                    		 Ext.Msg.alert('提示','巡查没有查到符合的数据!');  
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
    	
    	/*
    	if(settime!='0'){
    		stopxs_Interval=setInterval(
        			function(){
        				console.log('巡查定时刷新时间2：'+settime);  
        				var store = Ext.data.StoreManager.get("Xs_ghlistStore"); 
        				  if (!store) { 
        				    store = Ext.create("Helcss.store.Xs_ghlistStore"); 
        				  } 
        				
        				var invocationData = {  
        			               adapter : 'SqlAdapter',  
        			               procedure : 'procedure_xsghList', 
        			               parameters : [xs_city,xs_domain]
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
        		                         	 Ext.getCmp('toppanel_xsgh').setData({'xs_city':xs_city,'xs_domain':xs_domain}); 
        		                         	 Ext.getCmp('update_time').setData({update_time:resultSet[0].update_time});  
        		                    	 }else{
        		                    		 Ext.Msg.alert('提示','巡查没有查到符合的数据!');  
        		                    		 store.setData([],this);   
        		                    	 } 
        		                    } else {
        		                    	Ext.Msg.alert('提示','获取数据失败!');  
        		                    }
        		                } else {
        		                	Ext.Msg.alert('提示','网络出错！'); 
        		                }
        		            },  
        		            onFailure : function () {
        		            	 Ext.Msg.alert('提示','发送请求失败'); 
        		            	}
        		        }); 
        				
        				 
        			}	
        		,settime);
        	 
        	 console.log('巡查VIEW stopxs_Interval：'+stopxs_Interval);   
    	}
    	*/
    },
    
    stopxs_Interval_action : function(){
    	if(settime!='0'){
    		stopxs_Interval=setInterval(
        			function(){
        				console.log('巡查定时刷新时间2：'+settime);  
        				var store = Ext.data.StoreManager.get("Xs_ghlistStore"); 
        				  if (!store) { 
        				    store = Ext.create("Helcss.store.Xs_ghlistStore"); 
        				  } 
        				
        				var invocationData = {  
        			               adapter : 'SqlAdapter',  
        			               procedure : 'procedure_xsghList', 
        			               parameters : [xs_city,xs_domain]
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
        		                         	 Ext.getCmp('toppanel_xsgh').setData({'xs_city':xs_city,'xs_domain':xs_domain}); 
        		                         	 Ext.getCmp('update_time').setData({update_time:resultSet[0].update_time});  
        		                    	 }else{
        		                    		 Ext.Msg.alert('提示','巡查没有查到符合的数据!');  
        		                    		 store.setData([],this);   
        		                    	 } 
        		                    } else {
        		                    	Ext.Msg.alert('提示','获取数据失败!');  
        		                    }
        		                } else {
        		                	Ext.Msg.alert('提示','网络出错！'); 
        		                }
        		            },  
        		            onFailure : function () {
        		            	 Ext.Msg.alert('提示','发送请求失败'); 
        		            	}
        		        }); 
        				
        				 
        			}	
        		,settime);
        	 
        	 console.log('巡查VIEW stopxs_Interval：'+stopxs_Interval);   
    	}
    },
});

 