
/* JavaScript content from app/controller/UpdatePassworCtr.js in folder common */
/**
 * UpdatePassworCtr
 */
Ext.define("Helcss.controller.UpdatePassworCtr", {
	extend : "Helcss.controller.ApplicationController",
//	extend: 'Ext.Container', 
	requires: ['Ext.Menu'], 
	config : {
		   refs : {  
		   back_menu:'button[id=back_menu]',
		   update_button:'button[id=update_button]' 
		},
		control : {   
			back_menu:{
				tap : 'back_menu'
			},
			update_button:{
				tap : 'update_button'
			} 
		}
	},
	
 
	back_menu : function() { 
		var main = Ext.getCmp('mainmenu');
		if(!main){
			main = Ext.create('Helcss.view.MainMenu');
		}
		Ext.Viewport.setActiveItem(main);
		
		Ext.getCmp('oldpass').setValue(null);
		Ext.getCmp('newpass1').setValue(null);
		Ext.getCmp('newpass2').setValue(null);
		
		Ext.getCmp('updatepassword').destroy();
	},
	update_button : function() {  
		var oldpass = Ext.getCmp('oldpass').getValue();
		var newpass1 = Ext.getCmp('newpass1').getValue();
		var newpass2 = Ext.getCmp('newpass2').getValue();
		
		if(oldpass==null || oldpass==''){
			Ext.Msg.alert('请输入原始密码');
			return;
		}
		
		if(newpass1==null || newpass1==''){
			Ext.Msg.alert('请输入新密码');
			return;
		}
		
		if(newpass2==null || newpass2==''){
			Ext.Msg.alert('请再次输入新密码');
			return;
		}
		
		if(newpass1!=newpass2){
			Ext.Msg.alert('两次输入的新密码不一致!');
			return;
		} 
//		if(!newpass1.equals(newpass2)){
//			Ext.Msg.alert('两次输入的新密码不一致!');
//			return;
//		}  
		myProcessing.show();
		var invocationData={adapter : 'HttpAdapter',
	            procedure : 'getStories',
	            parameters : ['loginAction.do?method=toUpdatePassword',"{'USERID':"+"'"+loginusername+"'"+",'PWD':"+"'"+oldpass+"'"+",'NEW_PWD':"+"'"+newpass1+"'}"] 
         };
		
		 WL.Client.invokeProcedure(invocationData, { 
			onSuccess : httpUpssSuccess,
	        onFailure : httpUpssFailure, 
	     });
		
	} 

});

function  httpUpssSuccess(result){
	console.log("result:"+result); 
//	var me = this;
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
	       		var json = eval("("+ content +")"); 
	       		var msginfo=json.msginfo; 
	       		Ext.Msg.alert(msginfo);   
                
 
	       		Ext.getCmp('oldpass').setValue(null);
	    		Ext.getCmp('newpass1').setValue(null);
	    		Ext.getCmp('newpass2').setValue(null);
	    		
	    		var main = Ext.getCmp('login');
        		if(!main){
        			main = Ext.create('Helcss.view.LoginView');
        		}
        		Ext.Viewport.setActiveItem(main); 
              
        	} else {
        		var content = invocationResult.content;
        		 console.log("content:"+content);  
        		var json = eval("("+ content +")"); 
        		var msginfo=json.msginfo; 
        		Ext.Msg.alert(msginfo);  
//        		me.getApplication().showMsg("登录信息提示:"+msginfo);
        	}
        } else {
        	Ext.Msg.alert("服务器出错！");  
        }
    } else {
    	Ext.Msg.alert("发送请求失败！");  
    }  
}

function  httpUpssFailure(){
	myProcessing.hide(); 
	 Ext.Msg.alert("服务器出错！");   
}