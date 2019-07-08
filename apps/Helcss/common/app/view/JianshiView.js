Ext.define('Helcss.view.JianshiView', {
    extend: 'Ext.Panel',
    id:'jianshiList',
    config: {
        style: 'background-color:#FFF;',
        items: [
            {
                xtype: 'toolbar',
                id:'jianshiList_toolbar',
                docked: 'top',
                title: '<b>遥监任务</b>',
                items: [
                    {
                        xtype: 'button',
                        id:'js_back',
                        ui: 'back',
                        text: '首页' 
                    }
                ]
            },
            {
                xtype: 'panel',
                id:'js_update_time',
                data: '{"name" : "gengx"},',
                height: 49,
                style: 'background-image:url(images/01.jpg);background-size:100% 49px;',
                tpl: [
                    '<div style="float:right;padding-right:15px;width:90%;line-height:49px;text-align:right;">更新时间:{update_time}</div>'
                ], 
                width: '100%'
                	
            },
            {
                xtype: 'tabpanel',
                id:'jianshiList_tabpanel',
                height: 900,
                style: 'background-color:#FFF;',
                layout: {
                    animation: 'slide',
                    type: 'card'
                },
                items: [
                    {
                        xtype: 'container',
                        id:'jianshiList_container',
                        title:'<b id="count_gzfb"">故障发报</b>',
                        html: '<div class="border: 1px solid #999;"></div>',
                        height: 800,
                        style: 'background-color:#FFF;', 
                        items: [
                            {
                                xtype: 'list',
                                id:'jianshiList_GZBG',
                                height: 840,  
                                onItemDisclosure: true,
                                itemTpl: [
'<table border="0">',
'<div style="display:none;">{ele_no}</div>',
'  <tr height="50" valign="middle">',
'    <td colspan="2"><h1>{ele_domain}</h1></td>',
'  </tr>',
'  <tr height="30" valign="middle">',
'    <td width="365">位置:{ele_site}{ele_tino}</td>',
'    <td width="365" align="right">计划年检:{ele_checkdate}</td>',
'  </tr>',
'  <tr height="30" valign="middle">',
'    <td>工号:{ele_no}</td>',
'    <td align="right">梯型:{ele_tyle}  层/站:{ele_layer}/{ele_station}</td>',
'  </tr>',
'  <tr height="30" valign="middle">',
'    <td colspan="2"><img width="380" height="18" src="images/status-04.png"/></td>',
'  </tr>',
'</table>'                          

//'<div style="display:none;">{ele_no}</div>',
//'<div style="margin: 0 auto; width:100%; height:175px;font-size:18pt;color:#666;">',
//'  <h1 style="margin:0 0 5px 0;width:100%;height:50px;font-size:26pt;font-weight:bold;color:#000;text-indent:15px">{ele_domain}</h1>',
//'  <div style="width:100%;height:40px;"><div style="float:left;width:60%;text-align:left;text-indent:15px">位置:{ele_site}{ele_tino}</div><div style="float:right;padding-right:15px;width:35%;text-align:right;">计划年检:{ele_checkdate}</div></div>',
//'  <div style="width:100%;height:40px;"><div style="float:left;width:60%;text-align:left;text-indent:15px">工号:{ele_no}</div><div style="float:right;padding-right:15px;width:35%;text-align:right;">梯型:{ele_tyle}  层/站:{ele_layer}/{ele_station}</div></div>',
//'  <div style="margin: 0 auto; width:705px; hright:49px;"><img src="images/status-04.png"/></div>',
//'</div>'
                                      ], 
                                store: 'JsStore', 
//                                onItemDisclosure: function(record) { 
//                                	js_ele_no=record.data.ele_no; 
//                                    var main = Ext.getCmp('jianshiinfo');
//                            		if(!main){
//                            			main = Ext.create('Helcss.view.JianshiinfoView');
//                            		} 
//                            		Ext.Viewport.setActiveItem(main);
//                                 } 
                                listeners: {  
                		            itemtap: function(record, index) {
                		            	//跳转前关闭遥监定时刷新
                                  	      clearInterval(stopjs_Interval);
                                		  stopjs_Interval=undefined;
//                                		  Ext.getCmp('jianshiList').destroy();
                		            	
                		              var store = Ext.data.StoreManager.get("JsStore"); 
                		       		  if (!store) { 
                		       		    store = Ext.create("Helcss.store.JsStore"); 
                		       		  }  
//                		       		alert(store.getAt(index).get('ele_no'));
                		       		  
                		       		 js_ele_no=store.getAt(index).get('ele_no'); 
                		       		 jkflg='js';
                	 
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
                                 }  

                     
 
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title:'<b id="count_dtby">电梯保养</b>',
                        items: [
                            {
                                xtype: 'list',
                                height: 840, 
                                id:'jianshiList_DTBY',
//                                cls: 'listaaaa',
//                                itemTpl:'{ele_domain}',
                                onItemDisclosure: true,
                                itemTpl: [
'<table border="0">',
'<div style="display:none;">{ele_no}</div>',
'  <tr height="50" valign="middle">',
'    <td colspan="2"><h1>{ele_domain}</h1></td>',
'  </tr>',
'  <tr height="30" valign="middle">',
'    <td width="365">位置:{ele_site}{ele_tino}</td>',
'    <td width="365" align="right">计划年检:{ele_checkdate}</td>',
'  </tr>',
'  <tr height="30" valign="middle">',
'    <td>工号:{ele_no}</td>',
'    <td align="right">梯型:{ele_tyle}  层/站:{ele_layer}/{ele_station}</td>',
'  </tr>',
'  <tr height="30" valign="middle">',
'    <td colspan="2"><img width="380" height="18" src="images/status-02.png"/></td>',
'  </tr>',
'</table>'                          
//                                          '<div style="display:none;">{ele_no}</div>',
//                                          '<div style="margin: 0 auto; width:100%; height:175px;font-size:18pt;color:#666;">',
//                                          '<h1 style="margin:0 0 5px 0;width:100%;height:50px;font-size:26pt;font-weight:bold;color:#000;text-indent:15px">{ele_domain}</h1>',
//                                          '  <div style="width:100%;height:40px;"><div style="float:left;width:60%;text-align:left;text-indent:15px">位置:{ele_site}{ele_tino}</div><div style="float:right;padding-right:15px;width:35%;text-align:right;">计划年检:{ele_checkdate}</div></div>',
//                                          '  <div style="width:100%;height:40px;"><div style="float:left;width:60%;text-align:left;text-indent:15px">工号:{ele_no}</div><div style="float:right;padding-right:15px;width:35%;text-align:right;">梯型:{ele_tyle}  层/站:{ele_layer}/{ele_station}</div></div>',
//                                          '  <div style="margin: 0 auto; width:705px; hright:49px;"><img src="images/status-02.png"/></div>',
//                                          '</div>'
                                      ],
                                store: 'JS_baoyang_Store',
//                                onItemDisclosure: function(record) { 
//                                	js_ele_no=record.data.ele_no; 
//                                    var main = Ext.getCmp('jianshiinfo');
//                            		if(!main){
//                            			main = Ext.create('Helcss.view.JianshiinfoView');
//                            		} 
//                            		Ext.Viewport.setActiveItem(main);
//                                 } 
                                  listeners: {   
                        		            itemtap: function(record, index) {
                        		            	//跳转前关闭遥监定时刷新
                                          	      clearInterval(stopjs_Interval);
                                        		  stopjs_Interval=undefined;
//                                        		  Ext.getCmp('jianshiList').destroy(); 
                        		            	
                        		              var store = Ext.data.StoreManager.get("JS_baoyang_Store"); 
                        		       		  if (!store) { 
                        		       		    store = Ext.create("Helcss.store.JS_baoyang_Store"); 
                        		       		  }  
//                        		       		alert(store.getAt(index).get('ele_no'));
                        		       		  
                        		       		 js_ele_no=store.getAt(index).get('ele_no'); 
                        		       		 jkflg='js';
                        	 
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
                                         }  
 
                            }
                        ] 
                        
                    }
                ]
            }
        ]
    },
    initialize: function() {
        if(PDsystem==1){
        	Ext.getCmp('jianshiList_toolbar').setStyle('font-size:12pt');
        	Ext.getCmp('js_update_time').setHeight(30);
        	Ext.getCmp('js_update_time').setStyle('background-image:url(images/01.jpg);background-size:100% 30px;');
        	Ext.getCmp('js_update_time').setTpl('<div style="float:right;padding-right:15px;width:90%;line-height:30px;text-align:right;font-size:9pt;">更新时间:{update_time}</div>');
        	Ext.getCmp('jianshiList_tabpanel').setStyle('background-color:#FFF;font-size:12pt');
        	
        	
        	Ext.getCmp('jianshiList').setPadding('0 0 35 0');
       		var item='<table border="0">'+
       		'<div style="display:none;">{ele_no}</div>'+
       		'  <tr height="20" valign="middle">'+
       		'    <td colspan="2"><h1>{ele_domain}</h1></td>'+
       		'  </tr>'+
       		'  <tr height="20" valign="middle">'+
       		'    <td width="50%" style="font-size:10pt;">位置:{ele_site}{ele_tino}</td>'+
       		'    <td width="50%" align="right" style="font-size:10pt;">计划年检:{ele_checkdate}</td>'+
       		'  </tr>'+
       		'  <tr height="20" valign="middle">'+
       		'    <td style="font-size:10pt;">工号:{ele_no}</td>'+
       		'    <td align="right" style="font-size:10pt;">梯型:{ele_tyle}  层/站:{ele_layer}/{ele_station}</td>'+
       		'  </tr>'+
       		'  <tr height="20" valign="middle">'+
       		'    <td colspan="2"><img width="100%" height="45%" src="images/status-04.png"/></td>'+
       		'  </tr>'+
       		'</table>'; 
       		Ext.getCmp('jianshiList_GZBG').setItemTpl(item);
       		Ext.getCmp('jianshiList_GZBG').setStyle('font-size:9pt');
       		Ext.getCmp('jianshiList_GZBG').setWidth('100%');
       		
       		Ext.getCmp('jianshiList_tabpanel').setHeight('100%');
       		Ext.getCmp('jianshiList_container').setHeight('100%');
       		Ext.getCmp('jianshiList_GZBG').setHeight('100%');
       		
       		var item2='<table border="0">'+
       		'<div style="display:none;">{ele_no}</div>'+
       		'  <tr height="20" valign="middle">'+
       		'    <td colspan="2"><h1>{ele_domain}</h1></td>'+
       		'  </tr>'+
       		'  <tr height="20" valign="middle">'+
       		'    <td width="50%" style="font-size:10pt;">位置:{ele_site}{ele_tino}</td>'+
       		'    <td width="50%" align="right" style="font-size:10pt;">计划年检:{ele_checkdate}</td>'+
       		'  </tr>'+
       		'  <tr height="20" valign="middle">'+
       		'    <td style="font-size:10pt;">工号:{ele_no}</td>'+
       		'    <td align="right" style="font-size:10pt;">梯型:{ele_tyle}  层/站:{ele_layer}/{ele_station}</td>'+
       		'  </tr>'+
       		'  <tr height="20" valign="middle">'+
       		'    <td colspan="2"><img width="100%" height="45%" src="images/status-02.png"/></td>'+
       		'  </tr>'+
       		'</table>';  
       		Ext.getCmp('jianshiList_DTBY').setItemTpl(item2);
       		Ext.getCmp('jianshiList_DTBY').setHeight('100%');
       		Ext.getCmp('jianshiList_DTBY').setWidth('100%');
       		Ext.getCmp('jianshiList_DTBY').setStyle('font-size:9pt');
       	};
    	
    	myLoading.show();  
    	
    	var store = Ext.data.StoreManager.get("JsStore"); 
		  if (!store) { 
		    store = Ext.create("Helcss.store.JsStore"); 
		  } 
		  
	   var bystore = Ext.data.StoreManager.get("JS_baoyang_Store"); 
	   if (!bystore) { 
		   bystore = Ext.create("Helcss.store.JS_baoyang_Store"); 
		  } 
	   
	   //myBusyIndicator.show();
	   var invocationData = {  
               adapter : 'SqlAdapter',  
               procedure : 'procedure_jsList', 
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
                        bystore.setData(resultSet,this); 
                       	Ext.getCmp('js_update_time').setData({update_time:resultSet[0].update_time});
                       	document.getElementById("count_gzfb").innerHTML = "故障发布(" + store.getCount() + ")";
                       	document.getElementById("count_dtby").innerHTML = "电梯保养(" + bystore.getCount() + ")";
                       	myLoading.hide();
                   	 }else{
                   		 myLoading.hide();
                   		 Ext.Msg.alert('提示','遥监没有查到符合的数据!');  
                   		 store.setData([],this);   
                   		 bystore.setData([],this);   
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
//                parameters : ['jianshiAction.do?method=toSearch', "{'userid':'wank1','init_person_id':''}"]
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
////                            alert("结果2：" + result);
//                            // 转化成JSON对象
//                            var json = eval("("+ result +")");
//                            store.setData(json.rows,this);
//                            bystore.setData(json.rows,this); 
//                            
//                            Ext.getCmp('update_time').setData({update_time:json.rows[0].update_time});  
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
   	/*
   	if(settime!='0'){
   		stopjs_Interval=setInterval(
   	   			function(){
   	   				console.log('遥监定时刷新时间2：'+settime);  
   	   				var store = Ext.data.StoreManager.get("JsStore"); 
   	   				  if (!store) { 
   	   				    store = Ext.create("Helcss.store.JsStore"); 
   	   				  } 
   	   				  
   	   			   var bystore = Ext.data.StoreManager.get("JS_baoyang_Store"); 
   	   			   if (!bystore) { 
   	   				   bystore = Ext.create("Helcss.store.JS_baoyang_Store"); 
   	   				  } 
   	   			     
   	   				var invocationData = {  
   	   			               adapter : 'SqlAdapter',  
   	   			               procedure : 'procedure_jsList', 
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
   	   			                        bystore.setData(resultSet,this); 
   	   			                       	Ext.getCmp('js_update_time').setData({update_time:resultSet[0].update_time});
   	   			                       	document.getElementById("count_gzfb").innerHTML = "故障发布(" + store.getCount() + ")";
   	   			                       	document.getElementById("count_dtby").innerHTML = "电梯保养(" + bystore.getCount() + ")";
   	   			                   	 }else{
   	   			                   		 store.setData([],this);   
   	   			                   		 bystore.setData([],this);   
   	   			                   		 Ext.Msg.alert('提示','遥监没有查到符合的数据!');  
   	   			                   		 
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
   		console.log('遥监VIEW stopjs_Interval：'+stopjs_Interval);   
   	 } 
   	*/
   	
    },
    
    stopjs_Interval_action : function(){
    	if(settime!='0'){
       		stopjs_Interval=setInterval(
       	   			function(){
       	   				console.log('遥监定时刷新时间2：'+settime);  
       	   				var store = Ext.data.StoreManager.get("JsStore"); 
       	   				  if (!store) { 
       	   				    store = Ext.create("Helcss.store.JsStore"); 
       	   				  } 
       	   				  
       	   			   var bystore = Ext.data.StoreManager.get("JS_baoyang_Store"); 
       	   			   if (!bystore) { 
       	   				   bystore = Ext.create("Helcss.store.JS_baoyang_Store"); 
       	   				  } 
       	   			     
       	   				var invocationData = {  
       	   			               adapter : 'SqlAdapter',  
       	   			               procedure : 'procedure_jsList', 
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
       	   			                        bystore.setData(resultSet,this); 
       	   			                       	Ext.getCmp('js_update_time').setData({update_time:resultSet[0].update_time});
       	   			                       	document.getElementById("count_gzfb").innerHTML = "故障发布(" + store.getCount() + ")";
       	   			                       	document.getElementById("count_dtby").innerHTML = "电梯保养(" + bystore.getCount() + ")";
       	   			                   	 }else{
       	   			                   		 store.setData([],this);   
       	   			                   		 bystore.setData([],this);   
       	   			                   		 Ext.Msg.alert('提示','遥监没有查到符合的数据!');  
       	   			                   		 
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
       		console.log('遥监VIEW stopjs_Interval：'+stopjs_Interval);   
       	 }
    },
});

 
 