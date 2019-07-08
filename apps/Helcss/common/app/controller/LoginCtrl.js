// ALEX140312: variable for LOGIN form.
var loginView;

Ext.define("Helcss.controller.LoginCtrl", {
	extend : "Helcss.controller.ApplicationController",
	config : {
		refs : {
			loginView :  'vlogin',
			mainTabView : {
				selector : 'vmaintab',
				xtype : 'vmaintab',
				autoCreate : true
			},
			loginButton : 'button[id=loginButton]'
		},

		control : {
			loginView : {
				initialize : 'onLoginViewInit',
				evtLogout : "doLogout"
			},
			loginButton : {
				tap : 'doLogin'
			},
			mainTabView : {
				evtLogout : "doLogout"
			}
		}
	},
	// Transitions
	slideLeftTransition : {
		type : 'slide',
		direction : 'left'
	},
	slideRightTransition : {
		type : 'slide',
		direction : 'right'
	},

	doLogin : function() {
		var username = Ext.getCmp('username').getValue();
		var password = Ext.getCmp('password').getValue();
		if (username == null || username == '') {
			Ext.Msg.alert('提示','请输入用户名!'); 
			return;
		}
		
		if (password == null || password == '') {
			Ext.Msg.alert('提示','请输入密码!'); 
			return;
		}
		
		// ALEX140312: disable current form(LOGIN), hide the keyboard.
		loginView = Ext.Viewport.getActiveItem();
		loginView.setDisabled(true);
		
		myBusyIndicator.show();
		
		var invocationData={adapter : 'HttpAdapter',
	            procedure : 'getStories',
	            parameters : ['loginAction.do?method=toSearch',"{'username':'"+username+"','password':'"+password+"'}"] 
         };
		
		 WL.Client.invokeProcedure(invocationData, { 
			onSuccess : httpSuccess,
	        onFailure : Failure
	     });
		 
	}  
});

function  httpSuccess(result){
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
                var content = invocationResult.content; 
                // 转化成JSON对象
                var json = eval("("+ content +")"); 
//                var rows = json.rows[0].modulename;  
                loginusername=json.rows[0].userid;
                
                var main = Ext.getCmp('mainmenu');
        		if(!main){
        			main = Ext.create('Helcss.view.MainMenu');
        		}
        		
        		// ALEX140312: login OK, goto to Mainmenu.
        		Ext.Viewport.setActiveItem(main);
 
        	   //登录成功后判断记录登录账号
        		var checkuser = Ext.getCmp('checkuser').getValue();
        		var username = Ext.getCmp('username').getValue(); 
        		if(checkuser==1){ 
        			WL.EncryptedCache.write("Loginuser", username, onWrite1Success, onWrite1Failure);
       	             function onWrite1Success(status){
       	        	   console.log('记录登录账号成功');  
       	            } 
                    function onWrite1Failure(status){
                   	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
                   		   console.log('记录登录账号失败');  
                   	   } 
       	           } 
        			
        		}else{ 
        			WL.EncryptedCache.write("Loginuser", null, onWrite0Success, onWrite0Failure);
      	             function onWrite0Success(status){
      	        	   console.log('删除上上次记录的账号成功');  
      	            } 
                   function onWrite0Failure(status){
                  	   if(status=WL.EncryptedCache.EOC_CLOSED){ 
                  		   console.log('删除上上次记录的账号失败');  
                  	   } 
      	           } 
        			
        		} 
              
        	} else {
        		var content = invocationResult.content; 
        		var json = eval("("+ content +")"); 
        		var msginfo=json.msginfo; 
        		Ext.Msg.alert(msginfo);  
        	}
        } else {
        	Ext.Msg.alert("服务器出错！");  
        }
    } else {
    	Ext.Msg.alert("发送请求失败！");  
    }  
	
	// ALEX140312: re-active Login form for next.
	loginView.setDisabled(false);
}

function  Failure(){
	 myBusyIndicator.hide();
	 Ext.Msg.alert("服务器出错！");
	 
	// ALEX140312: re-active Login form while login failure.
	 loginView.setDisabled(false);
}