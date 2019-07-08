
/* JavaScript content from app/controller/HomeViewCtr.js in folder common */
Ext.define("MyTest.controller.HomeViewCtr", {
	extend : "Ext.app.Controller", 
	config : {
		refs : {  
			btn_AjaxGetData:'button[id=btn_AjaxGetData]', 
			btn_JsonPGetData:'button[id=btn_JsonPGetData]', 
			btn_Jump2App:'button[id=btn_Jump2App]', 
			btn_getPhoto:'button[id=btn_getPhoto]', 
			btn_barcodescanner:'button[id=btn_barcodescanner]', 
			btn_jsontest:'button[id=btn_jsontest]', 
			btn_js2java:'button[id=btn_js2java]', 
		},
		control : {  
			btn_AjaxGetData:{
				tap : 'btn_AjaxGetData'
			},
			btn_JsonPGetData:{
				tap : 'btn_JsonPGetData'
			},
			btn_Jump2App:{
				tap : 'btn_Jump2App'
			},
			btn_getPhoto:{
				tap : 'btn_getPhoto'
			},
			btn_barcodescanner:{
				tap : 'btn_barcodescanner'
			},
			btn_jsontest:{
				tap : 'btn_jsontest'
			},
			btn_js2java:{
				tap : 'btn_js2java'
			}
		}
	},
 
	btn_AjaxGetData : function() {
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
	},
	btn_JsonPGetData : function() {
		console.log('btn_JsonPGetData');
		try{
			Ext.data.JsonP.request({
				url:'http://10.96.183.156:8888/ums/wl/wltestAction.do?method=toSearch',
//				url:'http://10.96.183.156:8888/ums/services/UserManagerData/CheckUser',
				params:{
//					username:'yk',
//					password:'12345a',
					content:"{username:'yk',password:'12345a'}",
//					UserID:'admin',
//					Password:'0',
//					AppID:'tbj',
				},
				callbackKey:'callback',
//				callbackName:'callback',
				timeout:3000,
				callback:callback,
//				success:function(response){
//					console.log(response);
//				},
//				failure:function(){
//					console.log('失败！');
//				}
			});
		}catch(e){
			console.log('e');
			console.log(e);
		}
	},
	btn_Jump2App : function() {
		console.log('btn_Jump2App');
		cordova.exec(jump2appSuccess,jump2appFailure,"CommonPlugin","Jump2App",['a']);
	},
	btn_getPhoto : function() {
		navigator.camera.getPicture(getPictureSuccess,getPictureError,{
			quality:75,
			destinationType:Camera.DestinationType.DATA_URL,
			sourceType:Camera.PictureSourceType.CAMERA,
			encodingType:Camera.EncodingType.JPEG,
			targetWidth:300,
			targetHeight:300,
		});
		
	},
	btn_barcodescanner : function() {
		console.log('btn_barcodescanner');
		cordova.exec(barcodescannerSuccess,barcodescannerFailure,"BarcodeScanner","scan",[]);
	},
	btn_jsontest : function() {
		console.log('btn_barcodescanner');
		var jsonobj = [{'textname':'textvalue','dataname':'datavalue'}];
		for (var i = 0;i<jsonobj.length;i++){
			console.log(jsonobj[i].textname);
			console.log(jsonobj[i].dataname);
		}
	},
	btn_js2java : function() {
		console.log('btn_js2java');
		var invocationData = {  
                adapter : 'HttpAdapter_GDEXP',  
                procedure : 'addTwoIntegers',
                parameters : [1,2] 
        };
		WL.Client.invokeProcedure(invocationData, {
    		timeout:60000,
            onSuccess : function (result) {
            	console.log('js2java success|'+result);
            },  
            onFailure : function () {
            	console.log('js2java failure!');
            }
        });
	}
}); 
var callback=function(success,result){
	console.log('callback');
	if(success){
		console.log(result);
	}else{
		console.log('失败！');
	}
};
function jump2appSuccess(data){
	console.log('jump2appSuccess');
};
function jump2appFailure(data){
	console.log('jump2appFailure');
//	Ext.Msg.alert('Ext.Msg.alert', data);
	WL.SimpleDialog.show(
			"WL.SimpleDialog.show",
			data,
			[
			 {text:"确定1",handler:function(){}},
			 {text:"确定2",handler:function(){}},
			]
	);
};
//function getPictureSuccess(imageURI){
function getPictureSuccess(imageData){
	console.log('getPictureSuccess');
//	console.log('getPictureSuccess|'+imageURI);
	console.log('getPictureSuccess|'+imageData);
};
function getPictureError(message){
	console.log('getPictureError');
	console.log(mesaage);
};
function barcodescannerSuccess(data){
	console.log('barcodescannerSuccess');
	Ext.Msg.alert('Ext.Msg.alert', data);
//	Ext.Msg.alert('Ext.Msg.alert', data[0]);
	/*for(var i = 0;i<data.length;i++){
		var item = data[i];
		Ext.Msg.alert('Ext.Msg.alert', item.text);
		Ext.Msg.alert('Ext.Msg.alert', item.format);
		Ext.Msg.alert('Ext.Msg.alert', item.cancelled);
	}*/
};
function barcodescannerFailure(data){
	console.log('barcodescannerFailure');
}