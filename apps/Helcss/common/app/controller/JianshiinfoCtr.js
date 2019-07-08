
/**
 * JianshiinfoCtr
 */
Ext.define("Helcss.controller.JianshiinfoCtr", {
	extend : "Helcss.controller.ApplicationController", 
	config : {
		   refs : {  
			      jsinfo_back:'button[id=jsinfo_back]',
			      ssjs:'button[id=ssjs]',
			      ssjs_over:'button[id=ssjs_over]',
				  },
		control : {  
			jsinfo_back:{
				tap : 'jsinfo_back', 
			},
			ssjs:{
				tap : 'ssjs', 
			},
			ssjs_over:{
				tap : 'ssjs_over', 
			} 
		}
	},
	
 
	jsinfo_back : function() {   
		if(ssjkflg=='end'){
			ssjkflg='start';
			
			var invocationData={adapter : 'HttpAdapter',
		            procedure : 'getStories',
		            parameters : ['ele_monitorAction.do?method=toKillThread',"{'thread_id':"+"'"+thread_id+"'}"] 
	         };
			
			 WL.Client.invokeProcedure(invocationData, { 
				onSuccess : httpoverSuccess,
		        onFailure : overFailure
		     }); 
		} 
		
		if(jkflg=='xs'){
			var main = Ext.getCmp('xsghlist');
			if(!main){
				main = Ext.create('Helcss.view.XunshighListView');
			}
			Ext.Viewport.setActiveItem(main);
			main.stopxs_Interval_action();
		}else{
			var main = Ext.getCmp('jianshiList');
			if(!main){
				main = Ext.create('Helcss.view.JianshiView');
			}
			Ext.Viewport.setActiveItem(main);
			main.stopjs_Interval_action();
		}
		
		
		Ext.getCmp('city').setValue(null);
        Ext.getCmp('ele_domain').setValue(null);
        Ext.getCmp('ele_site').setValue(null);
        Ext.getCmp('ele_no').setValue(null);
        Ext.getCmp('ele_tyle').setValue(null);
        Ext.getCmp('ele_layer').setValue(null);
        Ext.getCmp('ele_checkdate').setValue(null);
        Ext.getCmp('ele_status').setValue(null);
		
		
		if(PDsystem==1){
			Ext.getCmp('jianshiinfo_az').destroy();
		}else{
			Ext.getCmp('jianshiinfo').destroy();
		};
	},
	ssjs:function() {
		myProcessing.show();
		var t_ele_no = Ext.getCmp('ele_no').getValue();
		var invocationData={adapter : 'HttpAdapter',
	            procedure : 'getStories',
//	            parameters : ['loginAction.do?method=toSearch',"{'username':"+"'"+username+"'"+",'password':"+"'"+password+"'}"]
//	            parameters : ['ele_monitorAction.do?method=toMonitor',"{'ele_id':'11G069449'}"] 
		        parameters : ['ele_monitorAction.do?method=toMonitor',"{'ele_id':'" + t_ele_no + "','client_id':'" + client_id + "'}"] 
         };
		
		 WL.Client.invokeProcedure(invocationData, { 
			onSuccess : httptestSuccess,
	        onFailure : testFailure
	     }); 
	},
	ssjs_over:function() {
		myProcessing.show();
		Ext.getCmp('ssjs_over').hide(); 
		Ext.getCmp('ssjs').show();  //ssjkflg='start'
	    ssjkflg='start';
		  
		 var invocationData={adapter : 'HttpAdapter',
		            procedure : 'getStories',
		            parameters : ['ele_monitorAction.do?method=toKillThread',"{'thread_id':"+"'"+thread_id+"'}"] 
	         };
			
			 WL.Client.invokeProcedure(invocationData, { 
				onSuccess : httpoverSuccess,
		        onFailure : overFailure
		     }); 
			 
		Ext.getCmp('jk_status').setValue('连接已断开'); 	 
		Ext.getCmp('showfloor').setData({upOrdown:'images/arrow_static.png',floor:'1'}); 
    	Ext.getCmp('showimage').setData({changepick:'images/elevator_2.png'});
    	if(PDsystem==1){
    		Ext.getCmp('toppanel').setData({open:'led_az led_off',
                up:'led_az led_off',
                close:'led_az led_off',
                down:'led_az led_off',
                trapped_people:'led_az led_off',
                overhaul:'led_az led_off',
                sbyx:'led_az led_off',
                dyyc:'led_az led_off',
                bnqd:'led_az led_off',
                kgmyc:'led_az led_off'}); 
    	}else{
    		Ext.getCmp('toppanel').setData({open:'led led_off',
                up:'led led_off',
                close:'led led_off',
                down:'led led_off',
                trapped_people:'led led_off',
                overhaul:'led led_off',
                sbyx:'led led_off',
                dyyc:'led led_off',
                bnqd:'led led_off',
                kgmyc:'led led_off'}); 
    	};
    	
	}
	 
});

function  httptestSuccess(result){ 
	myProcessing.hide(); 
	var httpStatusCode = result.status;
	if (200 == httpStatusCode) {
        var invocationResult = result.invocationResult;
        console.log("invocationResult:"+invocationResult); 
        var isSuccessful = invocationResult.isSuccessful;
        if (true == isSuccessful) {
        	var status = invocationResult.status.code;  
        	if (status == 250) { 
                var content = invocationResult.content; 
                console.log("content:"+content);  
                // 转化成JSON对象
                var json = eval("("+ content +")"); 
                thread_id=json.thread_id; 
                
                Ext.getCmp('jk_status').setValue('正在连接监视终端...');
                
                //监控请求成功后订阅监控数据
                WL.Logger.debug("========================BEFORE===============");
                client.subscribe("Hitachi/com.gzunicorn/"+client_id+"/#", {});
//                jk_address=json.ele_addr;
//                jk_ele_no=js_ele_no;
                WL.Logger.debug("========================HAHAHA===============");
//                console.log("thread_id:"+thread_id); 
//                
//                var main = Ext.getCmp('jiankong');
//        		if(!main){
//        			main = Ext.create('Helcss.view.JianKongView');
//        		}
//        		Ext.Viewport.setActiveItem(main);
//        		 
//        		Ext.getCmp('jianshiinfo').destroy();
                
                //获取JSON数组 
//                var role=json.role; 
//                for(var i = 0; i < role.length; ++i) {
//					var tmp = role[i];
//					// 循环输出，用变量替换template中的{{变量}}
//					Ext.Msg.alert("系统权限:"+tmp);   
//				}
                Ext.getCmp('ssjs').hide();  //ssjkflg='start'
        		Ext.getCmp('ssjs_over').show();
        		ssjkflg='end';
        	} else {
        		var content = invocationResult.content; 
        		var json = eval("("+ content +")"); 
        		var msginfo=json.msginfo; 
        		Ext.Msg.alert('提示',msginfo);  
//        		me.getApplication().showMsg("登录信息提示:"+msginfo);
        	}
        } else {
        	Ext.Msg.alert("服务器出错！");  
        }
    } else {
    	Ext.Msg.alert("发送请求失败！");  
    }  
}

function  testFailure(){
	myProcessing.hide();
	Ext.Msg.alert("服务器出错！");   
}

function  httpoverSuccess(result){
	console.log("result:"+result);  
	myProcessing.hide(); 
	var httpStatusCode = result.status;
	if (200 == httpStatusCode) {
        var invocationResult = result.invocationResult;
        console.log("invocationResult:"+invocationResult); 
        var isSuccessful = invocationResult.isSuccessful;
        if (true == isSuccessful) { 
//        	var status = invocationResult.status.code;  
//        	if (status == 250) {  
//        		
//        	} else { 
//        		
//        	}
        	
    	    
            //结束监控时退订
//            client.unsubscribe("Hitachi/com.gzunicorn/"+client_id+"/#", {});
        } else {
        	Ext.Msg.alert("服务器出错！");  
        }
    } else {
    	Ext.Msg.alert("发送请求失败！");  
    }  
}

function  overFailure(){
	myProcessing.hide();
	Ext.Msg.alert("服务器出错！");   
}