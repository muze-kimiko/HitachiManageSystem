
/* JavaScript content from app/controller/HomeViewCtr.js in folder common */
Ext.define("MyApp.controller.HomeViewCtr", {
	extend : "Ext.app.Controller", 
	config : {
		refs : {  
			/*btn_AjaxGetData:'button[id=btn_AjaxGetData]', 
			btn_JsonPGetData:'button[id=btn_JsonPGetData]', 
			btn_JumpToOtherApp:'button[id=btn_JumpToOtherApp]', */
		},
		control : {  
			/*btn_AjaxGetData:{
				tap : 'btn_AjaxGetData'
			},
			btn_JsonPGetData:{
				tap : 'btn_JsonPGetData'
			},
			btn_JumpToOtherApp:{
				tap : 'btn_JumpToOtherApp'
			}*/
		}
	},
 
	/*btn_AjaxGetData : function() {
		console.log('btn_AjaxGetData');
		Ext.Ajax.request({
			url:'http://10.96.183.156:8888/ums/wl/loginAction.do?method=toSearch',
			scope:this,
			params:{
				username:'yk',
				password:'12345a',
			},
			method:'POST',
			timeout:3000,
			headers:{
				'Access-Control-Allow-Origin':"*",
				'Access-Control-Allow-Headers':"Origin,X-Requested-With,Content-Type,Accept",
			},
			success:function(response){
				console.log(response);
			},
			failure:function(){
				console.log('失败！');
			}
		});
	},*/
});
function jump2otherappSuccess(a){
	alert("jump2otherappSuccess111|"+a);
};
