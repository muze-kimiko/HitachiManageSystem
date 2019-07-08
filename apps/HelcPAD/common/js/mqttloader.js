
/* JavaScript content from js/mqttloader.js in folder common */
/*
============================================================================
Licensed Materials - Property of IBM
 
Copyright IBM Corp. 2013 All Rights Reserved.
 
US Government Users Restricted Rights - Use, duplication or
disclosure restricted by GSA ADP Schedule Contract with
IBM Corp.
============================================================================
*/

/**
 * A simple javascript loader. It configures which plugin should be used in
 * different environments. 
 */
var MQTT = MQTT ? MQTT : {};
//Config which plugin is going to use for different platforms.
MQTT.pluginConfig = {};
//MQTT.pluginConfig[WL.Environment.ANDROID] = 'js/mqttPlugin.js';
MQTT.pluginConfig[WL.Environment.ANDROID] = 'js/mqttCordovaClient.js';
//MQTT.pluginConfig[WL.Environment.IPHONE] = "js/mqttPlugin.js";
//MQTT.pluginConfig[WL.Environment.IPAD] = "js/mqttPlugin.js";
//MQTT.pluginConfig[WL.Environment.PREVIEW] = "js/mqttws31.js";

MQTT.isPlugin = true;


MQTT.loadScripts = function(){
	//WL.Toast.show("订阅开始1！");
	MQTT.environment = WL.Client.getEnvironment();
	if(MQTT.environment == WL.Environment.PREVIEW){
		MQTT.isPlugin = false;
	};
	
	//Use jQuery in worklight to load mqtt libraries one by one.  
	//使用jQuery的工作灯来逐个加载MQTT库。
	var queue = [];
	queue.push(MQTT.pluginConfig[MQTT.environment]);
	queue.push('js/mqttConfig.js');
	
	var loadFiles = function(){
		if(queue.length > 0){
			//shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
			var file = queue.shift();
			WLJQ.getScript(file).done(function(script, textStatus){
				WL.Logger.debug(textStatus);
				WL.Logger.debug("File " + file + " has been loaded.");
				loadFiles();
			}).fail(function(jqxhr, settings, exception){
				//在网页初始化报错的原因
				//报错：Load file undefined failed. SyntaxError: Unexpected token < 
				//file获得的值是undefined,只有在android手机上访问的时候才能通过（ANDROID表示安卓）
				//MQTT.pluginConfig[WL.Environment.ANDROID] = 'js/mqttCordovaClient.js';获得值
				WL.Logger.error("Load file " + file + " failed.", exception);
			});
		};
	};
	loadFiles();
};


//MQTT 第一步
if (typeof cordova === 'undefined') {
	//TODO: Change this id manually to avoid client id collision.
	//手动更改此ID，以避免客户端ID冲突。
	MQTT.clientId = "webSocketClient1";   
	MQTT.loadScripts();
}else {
	//Run this program on device. Start MQTT client after Cordova initialization is done.
	//运行设备此程序。Start MQTT 始化完成后启动MQTT客户端。
	document.addEventListener("deviceready", MQTT.loadScripts, false);
};

/*
 * Add a hash code method to
 *
 * @this {String}
 * @return {number} The 32bit hashCode of given string.
 */
String.prototype.hashCode = function() {
    var hash = 0, i, char;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
