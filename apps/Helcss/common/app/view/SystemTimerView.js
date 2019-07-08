/**
 * SystemTimerView
 */
Ext.define('Helcss.view.SystemTimerView', {
    extend: 'Ext.Panel',
    id:'systimer',

    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.Panel',
        'Ext.field.Radio'
    ],

    config: {
        style: 'background-color:#fff;',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '<b>监控设置',
                items: [
                    {
                        xtype: 'button',
                        id:'timer_back',
                        ui: 'back',
                        text: '返回'
                    }
                ]
            },
            {
                xtype: 'formpanel', 
                id:'timerfrom',
                height: '100%',
                width: '',
                items: [
                    {  xtype: 'fieldset',
                        margin: '30 auto',
                        width: '92%',
                        items: [
                            {
                        	xtype: 'radiofield',
                            id:'time_0',
                            name: 'times',  
                            label: '关闭',
                            checked:false, // 默认选中状态
                            listeners:{ check:function(item,e){  
                            	           WL.EncryptedCache.write("SetTimer", "0", onWriteSuccess, onWriteFailure);
                            	           function onWriteSuccess(status){
                            	        	   console.log('关闭定时刷新成功');  
                            	           } 
                                           function onWriteFailure(status){
                                        	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
                                        		   console.log('关闭定时刷新失败');  
                                        	   } 
                            	           } 
                            	       }
                            }
                        },
                        {
                        xtype: 'radiofield',
                        id:'time_1',
                        name: 'times',  
                        label: '1分钟',
                        checked:false, // 默认选中状态
                        listeners:{ check:function(item,e){  
                        	           WL.EncryptedCache.write("SetTimer", "60000", onWriteSuccess, onWriteFailure);
                        	           function onWriteSuccess(status){
                        	        	   console.log('定时记录1分钟成功');  
                        	           } 
                                       function onWriteFailure(status){
                                    	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
                                    		   console.log('定时记录1分钟失败');  
                                    	   } 
                        	           } 
                        	       }
                        }
                    },
                    {
                        xtype: 'radiofield',
                        id:'time_5',
                        name: 'times', 
                        label: '5分钟',
                        listeners:{ check:function(item,e){  
			                           WL.EncryptedCache.write("SetTimer", "300000", onWriteSuccess, onWriteFailure);
			             	           function onWriteSuccess(status){
			             	        	   console.log('定时记录5分钟成功');  
			             	           } 
			                            function onWriteFailure(status){
			                         	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
			                         		   console.log('定时记录5分钟失败');  
			                         	   } 
			             	           } 
              	                  }
                        }
                    },
                    {
                        xtype: 'radiofield',
                        id:'time_10',
                        name: 'times', 
                        label: '10分钟',
                        listeners:{ check:function(item,e){ 
			                           WL.EncryptedCache.write("SetTimer", "600000", onWriteSuccess, onWriteFailure);
			             	           function onWriteSuccess(status){
			             	        	   console.log('定时记录10分钟成功');  
			             	           } 
			                            function onWriteFailure(status){
			                         	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
			                         		   console.log('定时记录10分钟失败');  
			                         	   } 
			             	           } 
                 	          
                	                  }
                          }
                    },
                    {
                        xtype: 'radiofield',
                        id:'time_15',
                        name: 'times', 
                        label: '15分钟',
                        listeners:{ check:function(item,e){ 
			                           WL.EncryptedCache.write("SetTimer", "900000", onWriteSuccess, onWriteFailure);
			             	           function onWriteSuccess(status){
			             	        	   console.log('定时记录15分钟成功');  
			             	           } 
			                            function onWriteFailure(status){
			                         	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
			                         		   console.log('定时记录15分钟失败');  
			                         	   } 
			             	           } 
              	                  }
                        }
                    },
                    {
                        xtype: 'radiofield',
                        id:'time_20',
                        name: 'times', 
                        label: '20分钟',
                        listeners:{ check:function(item,e){ 
			                           WL.EncryptedCache.write("SetTimer", "1200000", onWriteSuccess, onWriteFailure);
			             	           function onWriteSuccess(status){
			             	        	   console.log('定时记录20分钟成功');  
			             	           } 
			                            function onWriteFailure(status){
			                         	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
			                         		   console.log('定时记录20分钟失败');  
			                         	   } 
			             	           } 
              	                  }
                        }
                    },
                    {
                        xtype: 'radiofield',
                        id:'time_25',
                        name: 'times', 
                        label: '25分钟',
                        listeners:{ check:function(item,e){ 
			                           WL.EncryptedCache.write("SetTimer", "1500000", onWriteSuccess, onWriteFailure);
			             	           function onWriteSuccess(status){
			             	        	   console.log('定时记录25分钟成功');  
			             	           } 
			                            function onWriteFailure(status){
			                         	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
			                         		   console.log('定时记录25分钟失败');  
			                         	   } 
			             	           } 
              	                  }
                        }
                    },
                    {
                        xtype: 'radiofield',
                        id:'time_30',
                        name: 'times', 
                        label: '30分钟',
                        listeners:{ check:function(item,e){ 
			                           WL.EncryptedCache.write("SetTimer", "1800000", onWriteSuccess, onWriteFailure);
			             	           function onWriteSuccess(status){
			             	        	   console.log('定时记录30分钟成功');  
			             	           } 
			                            function onWriteFailure(status){
			                         	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
			                         		   console.log('定时记录30分钟失败');  
			                         	   } 
			             	           } 
              	                  }
                        }
                    },
                    {
                        xtype: 'radiofield',
                        id:'time_35',
                        name: 'times', 
                        label: '35分钟',
                        listeners:{ check:function(item,e){ 
		                        	   WL.EncryptedCache.write("SetTimer", "2100000", onWriteSuccess, onWriteFailure);
			             	           function onWriteSuccess(status){
			             	        	   console.log('定时记录35分钟成功');  
			             	           } 
			                            function onWriteFailure(status){
			                         	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
			                         		   console.log('定时记录35分钟失败');  
			                         	   } 
			             	           } 
              	                  }
                        }
                    },
                    {
                        xtype: 'radiofield',
                        id:'time_40',
                        name: 'times', 
                        label: '40分钟',
                        listeners:{ check:function(item,e){ 
			                           WL.EncryptedCache.write("SetTimer", "2400000", onWriteSuccess, onWriteFailure);
			             	           function onWriteSuccess(status){
			             	        	   console.log('定时记录40分钟成功');  
			             	           } 
			                            function onWriteFailure(status){
			                         	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
			                         		   console.log('定时记录40分钟失败');  
			                         	   } 
			             	           } 
              	                  }
                        }
                    },
                    {
                        xtype: 'radiofield',
                        id:'time_45',
                        name: 'times', 
                        label: '45分钟',
                        listeners:{ check:function(item,e){ 
			                           WL.EncryptedCache.write("SetTimer", "2700000", onWriteSuccess, onWriteFailure);
			             	           function onWriteSuccess(status){
			             	        	   console.log('定时记录45分钟成功');  
			             	           } 
			                            function onWriteFailure(status){
			                         	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
			                         		   console.log('定时记录45分钟失败');  
			                         	   } 
			             	           } 
              	                  }
                        }
                    },
                    {
                        xtype: 'radiofield',
                        id:'time_50',
                        name: 'times', 
                        label: '50分钟',
                        listeners:{ check:function(item,e){ 
			                           WL.EncryptedCache.write("SetTimer", "3000000", onWriteSuccess, onWriteFailure);
			             	           function onWriteSuccess(status){
			             	        	   console.log('定时记录50分钟成功');  
			             	           } 
			                            function onWriteFailure(status){
			                         	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
			                         		   console.log('定时记录50分钟失败');  
			                         	   } 
			             	           } 
              	                  }
                        }
                    },
                    {
                        xtype: 'radiofield',
                        id:'time_55',
                        name: 'times', 
                        label: '55分钟',
                        listeners:{ check:function(item,e){ 
			                           WL.EncryptedCache.write("SetTimer", "3300000", onWriteSuccess, onWriteFailure);
			             	           function onWriteSuccess(status){
			             	        	   console.log('定时记录55分钟成功');  
			             	           } 
			                            function onWriteFailure(status){
			                         	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
			                         		   console.log('定时记录55分钟失败');  
			                         	   } 
			             	           } 
              	                  }
                        }
                    },
                    {
                        xtype: 'radiofield',
                        id:'time_60',
                        name: 'times', 
                        label: '60分钟',
                        listeners:{ check:function(item,e){ 
			                           WL.EncryptedCache.write("SetTimer", "3600000", onWriteSuccess, onWriteFailure);
			             	           function onWriteSuccess(status){
			             	        	   console.log('定时记录60分钟成功');  
			             	           } 
			                            function onWriteFailure(status){
			                         	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
			                         		   console.log('定时记录60分钟失败');  
			                         	   } 
			             	           } 
              	                  }
                        }
                    }
                ] 
              }
        ]
        
    }
  ]
  

 },
 afterLoad: function() { 
	    //获取上次登录设置的定时时间
		WL.EncryptedCache.read("SetTimer", onReadSuccess, onReadFailure);
	    function onReadSuccess(value){
	       settime=value;
	       console.log('进入定时页面获取定时成功：'+value); 
	       if(settime=='0'){ 
	    	   Ext.getCmp('time_0').setChecked(true);  
	       }else if(settime=='60000'){ 
	    	   Ext.getCmp('time_1').setChecked(true);  
	       }else if(settime=='300000'){ 
	    	   Ext.getCmp('time_5').setChecked(true);
	       }else if(settime=='600000'){
	    	   Ext.getCmp('time_10').setChecked(true);
	       }else if(settime=='900000'){
	    	   Ext.getCmp('time_15').setChecked(true);
	       }else if(settime=='1200000'){
	    	   Ext.getCmp('time_20').setChecked(true);
	       }else if(settime=='1500000'){
	    	   Ext.getCmp('time_25').setChecked(true);
	       }else if(settime=='1800000'){
	    	   Ext.getCmp('time_30').setChecked(true);
	       }else if(settime=='2100000'){
	    	   Ext.getCmp('time_35').setChecked(true);
	       }else if(settime=='2400000'){
	    	   Ext.getCmp('time_40').setChecked(true);
	       }else if(settime=='2700000'){
	    	   Ext.getCmp('time_45').setChecked(true);
	       }else if(settime=='3000000'){
	    	   Ext.getCmp('time_50').setChecked(true);
	       }else if(settime=='3300000'){
	    	   Ext.getCmp('time_55').setChecked(true);
	       }else if(settime=='3600000'){
	    	   Ext.getCmp('time_60').setChecked(true);
	       } 
	 	   
	    }
	    
	    function onReadFailure(status){
	 	   console.log('进入定时页面获取定时失败'); 
	    }
 }
 
    

});
