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
MQTT.pluginConfig[WL.Environment.IPHONE] = "js/mqttws31.js";
MQTT.pluginConfig[WL.Environment.IPAD] = "js/mqttws31.js";
MQTT.pluginConfig[WL.Environment.PREVIEW] = "js/mqttws31.js";
MQTT.loadScripts = function(){
	MQTT.environment = WL.Client.getEnvironment();
	if(MQTT.environment == WL.Environment.PREVIEW)
		MQTT.isPlugin = false;
	
	//Use jQuery in worklight to load mqtt libraries one by one.
	var queue = [];
	queue.push(MQTT.pluginConfig[MQTT.environment]);
	//queue.push('js/mqttCordovaClient.js');
	queue.push('js/mqttConfig.js');
	
	var loadFiles = function(){
		if(queue.length > 0){
			var file = queue.shift();
			WLJQ.getScript(file).done(function(script, textStatus){
				WL.Logger.debug(textStatus);
				WL.Logger.debug("File " + file + " has been loaded.");
				loadFiles();
			}).fail(function(jqxhr, settings, exception){
				WL.Logger.error("Load file " + file + " failed.", exception);
			});
		}
	};
	loadFiles();
};
if (typeof cordova === 'undefined') {
	MQTT.clientId = "webSocketClient1";    //TODO: Change this id manually to avoid client id collision.
	MQTT.loadScripts();
}else {
	//Run this program on device. Start MQTT client after Cordova initialization is done.
	document.addEventListener("deviceready", MQTT.loadScripts, false);
}

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
