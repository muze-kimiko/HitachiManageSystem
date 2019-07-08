/**
 * JianKongCtr
 */
Ext.define("Helcss.controller.JianKongCtr", {
	extend : "Helcss.controller.ApplicationController", 
	config : {
		   refs : {  
			       jk_back:'button[id=jk_back]' 
				  },
		control : {  
			jk_back:{
				        tap : 'jk_back'
			}
 
		}
	},
	
 
	   jk_back : function() { 
		   var invocationData={adapter : 'HttpAdapter',
		            procedure : 'getStories',
		            parameters : ['ele_monitorAction.do?method=toKillThread',"{'thread_id':"+"'"+thread_id+"'}"] 
	         };
			
			 WL.Client.invokeProcedure(invocationData, { 
				onSuccess : httpoverSuccess,
		        onFailure : overFailure
		     }); 
		   
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
					}
					Ext.Viewport.setActiveItem(main); 
			 };

		 
		Ext.getCmp('jiankong').destroy();
	}
	 
}); 
 
function  httpoverSuccess(result){
	console.log("result:"+result);  
	myBusyIndicator.hide(); 
	var httpStatusCode = result.status;
	if (200 == httpStatusCode) {
        var invocationResult = result.invocationResult;
        console.log("invocationResult:"+invocationResult); 
        var isSuccessful = invocationResult.isSuccessful;
        if (true == isSuccessful) {
        	var status = invocationResult.status.code;  
        	if (status == 250) { 
//                var content = invocationResult.content; 
//                // 转化成JSON对象
//                var json = eval("("+ content +")"); 
//                var rows = json.rows[0].modulename;  
//                loginusername=json.rows[0].userid; 
                
                //获取JSON数组 
//                var role=json.role; 
//                for(var i = 0; i < role.length; ++i) {
//					var tmp = role[i];
//					// 循环输出，用变量替换template中的{{变量}}
//					Ext.Msg.alert("系统权限:"+tmp);   
//				}  
        	} else {
//        		var content = invocationResult.content; 
//        		var json = eval("("+ content +")"); 
//        		var msginfo=json.msginfo; 
//        		Ext.Msg.alert(msginfo);  
//        		me.getApplication().showMsg("登录信息提示:"+msginfo);
        	}
//        	client.unsubscribe("Hitachi/com.gzunicorn/"+client_id+"/#", {});
        } else {
        	Ext.Msg.alert("服务器出错！");  
        }
    } else {
    	Ext.Msg.alert("发送请求失败！");  
    }  
}

function  overFailure(){
	 myBusyIndicator.hide();
	 Ext.Msg.alert("服务器出错！");   
}