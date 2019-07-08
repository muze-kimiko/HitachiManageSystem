/**
 * Copyright (c) Patrick, Weng Tat LEONG (wtleong@cn.ibm.com)
 * Copyright (c) 2013, IBM Corporation
 */
var MQTT = MQTT ? MQTT : {};
//MQTT.host = "172.32.231.133";  //TODO: Change host name and port.
//MQTT.host = "127.0.0.1";
MQTT.host = 'pda.hitachi-helc.com';
//MQTT.host = "www.hitachi-helc.com";
//MQTT.host = '106.187.44.108';
MQTT.port = 1884;
//MQTT.client = {};   //mqtt client instance.
MQTT.directory = null;   //current Directory.
MQTT.connectOptions = {cleanSession: false}; //Set clean session to false by default.
MQTT._isMqttClientInit = false;  //An internal variable to ensure initApplySub can be called only once.
var client = null;
var client_id = null;
//var LED_OFF = '-images/led_green.png';
//var LED_ON  = '-images/led_red.png';

var LED_OFF   = 'led led_off';
var LED_RED   = 'led led_red';
var LED_GREEN = 'led led_green';

MQTT.onMessageArrived = function(message) {
	if(PDsystem==1){
		 LED_OFF   = 'led_az led_off';
		 LED_RED   = 'led_az led_red';
		 LED_GREEN = 'led_az led_green';
	};
    //TODO: Write your message handling callback here. It is called whenever new message arrives.
    WL.Logger.debug("onMessageArrived:" + message.payloadString);
//    WL.Logger.debug("onMessageArrived:" + message.payloadBytes);
//    WL.Logger.debug("onMessageArrived:" + message.destinationName);
//    WL.Logger.debug("onMessageArrived:" + message.qos);
//    WL.Logger.debug("onMessageArrived:" + message.retained);
//    WL.Logger.debug("onMessageArrived:" + message.duplicate);
    
    var content=message.payloadString;
    var json = eval("("+ content +")"); 
    var msg=json.msg;
    var r_thread_id=json.thread_id;
    if(msg==undefined){
    	if(thread_id==r_thread_id||r_thread_id==undefined){
    		//开关门
            var check=null;
            if(json.door=='0'){ 
            	//判断开关门动画状态
            	if(vopen==null){ 
//            		vchangepick='images/elevator_3.gif';
            		vchangepick='DoorOpen';
            		check='Y';
//            	}else if(vchangepick=='images/elevator_4.gif'){
            	}else if(vchangepick=='DoorClose'){
//            		vchangepick='images/elevator_3.gif';
            		vchangepick='DoorOpen';
            		check='Y';
//            	}else if(vchangepick=='images/elevator_3.gif'){
            	}else if(vchangepick=='DoorOpen'){
//            		vchangepick='images/elevator_3.gif';
            		vchangepick='DoorOpen';
            		check='N';
            	}else{
            		console.log("都没进1："+vchangepick); 
            	}  
            	vopen=LED_GREEN;
            	vclose=LED_OFF;
            }else{ 
            	//判断开关门动画状态
            	if(vopen==null){ 
//            		vchangepick='images/elevator_4.gif';
            		vchangepick='DoorClose';
            		check='Y';
//            	}else if(vchangepick=='images/elevator_3.gif'){
            	}else if(vchangepick=='DoorOpen'){
//            		vchangepick='images/elevator_4.gif';
            		vchangepick='DoorClose';
            		check='Y';
//            	}else if(vchangepick=='images/elevator_4.gif'){
            	}else if(vchangepick=='DoorClose'){
//            		vchangepick='images/elevator_4.gif';
            		vchangepick='DoorClose';
            		check='N';
            	}else{
            		console.log("都没进2："+vchangepick);
            	}  
            	vopen=LED_OFF;
            	vclose=LED_GREEN; 
            }
             
            //上行  平层  下行
            console.log("vupOrdown:"+vupOrdown);  
            if(json.ud=='up'){
            	vup=LED_GREEN;
            	vdown=LED_OFF;
            	vupOrdown='images/arrow_up.png';
            }else if(json.ud=='down'){
            	vup=LED_OFF;
            	vdown=LED_GREEN;
            	vupOrdown='images/arrow_down.png';
            }else{
            	vup=LED_OFF;
            	vdown=LED_OFF;
            	vupOrdown='images/arrow_static.png';
            	 
//            	if(vupOrdown==null){
//            		vupOrdown='images/arrow_static.gif';
//            	}else if(vupOrdown=='arrow_up.gif'){
//            		vupOrdown='images/arrow_up.gif';
//            	}else{
//            		vupOrdown='images/arrow_down.gif';
//            	} 
            }
            
            //是否困人      
            if(json.iskr=='0'){
            	vtrapped_people=LED_OFF;
            }else{
            	vtrapped_people=LED_RED;
            }
           
            // 检修
            if(json.isjnjx=='0'){
            	voverhaul=LED_OFF;
            }else{
            	voverhaul=LED_GREEN;
            }
            
            // 电源异常
            if(json.power_err=='0'){
            	vpower_err=LED_OFF;
            }else{
            	vpower_err=LED_RED;
            }
            
            // 不能起动
            if(json.isstart=='0'){
            	visstart=LED_OFF;
            }else{
            	visstart=LED_RED;
            }
            
            // 开关门异常
            if(json.door_err=='0'){
            	vdoor_err=LED_OFF;
            }else{
            	vdoor_err=LED_RED;
            }
            
            Ext.getCmp('jk_status').setValue('已连接,正在监视电梯');
//            Ext.getCmp('jk_address').setValue(jk_address);
//            Ext.getCmp('jk_ele_no').setValue(jk_ele_no);
            
            Ext.getCmp('toppanel').setData({open:vopen,
        							        up:vup,
        							        close:vclose,
        							        down:vdown,
        							        trapped_people:vtrapped_people,
        							        overhaul:voverhaul,
        							        sbyx:LED_GREEN,
        		                            dyyc:vpower_err,
        		                            bnqd:visstart,
        		                            kgmyc:vdoor_err});
            
            Ext.getCmp('showfloor').setData({upOrdown:vupOrdown,floor:json.floor}); 
            if(check=='Y'){ 
//            	Ext.getCmp('showimage').setData({changepick:vchangepick});
            	document.querySelector('iframe').contentWindow.controller.goToSceneByName(vchangepick);
            	console.log("vchangepick:"+vchangepick);  
            }
    	}
    }else{
    	console.log("msg："+msg);
    	var t = Ext.getCmp('ssjs_over');
    	if(t)Ext.getCmp('ssjs_over').hide();
    	t = Ext.getCmp('ssjs');
    	if(t)Ext.getCmp('ssjs').show();  //ssjkflg='start'
    	t = Ext.getCmp('jk_status');
    	if(t)Ext.getCmp('jk_status').setValue('连接已断开');
    	t = Ext.getCmp('showfloor');
    	if(t)Ext.getCmp('showfloor').setData({upOrdown:'images/arrow_static.png',floor:'1'});
    	t = Ext.getCmp('showimage');
    	if(t)Ext.getCmp('showimage').setData({changepick:'images/elevator_2.png'});
    	t = Ext.getCmp('toppanel');
    	if(t){
    		Ext.getCmp('toppanel').setData({open:LED_OFF,
                up:LED_OFF,
                close:LED_OFF,
                down:LED_OFF,
                trapped_people:LED_OFF,
                overhaul:LED_OFF,
                sbyx:LED_OFF,
                dyyc:LED_OFF,
                bnqd:LED_OFF,
                kgmyc:LED_OFF});
    	}
    	ssjkflg='start';
    	client.unsubscribe("Hitachi/com.gzunicorn/"+client_id+"/#", {});
    	Ext.Msg.alert('提示','连接已断开，请重新连接！');  
    } 
    
};

MQTT.onConnectionLost = function(responseObject){
    // Set up a callBacks used when the connection is completed,
    // when a message arrives for this client and when the connection is lost.
    // WL.Logger.debug("Enter onConnectionLost");
    // if (responseObject.errorCode !== 0){
    //     WL.Logger.debug("onConnectionLost:" + responseObject.errorMessage);
    //     WL.Logger.debug("Try to reconnect");
    //     //TODO: You may enter some disconnect notification here.
    //     MQTT.client.connect(MQTT.connectOptions);
    // }
};

// function initClient(){
//     var client = new Messaging.Client(MQTT.host, Number(MQTT.port), MQTT.clientId);
//     client.onConnectionLost = MQTT.onConnectionLost;
//     client.onMessageArrived = MQTT.onMessageArrived;
//     MQTT.client = client;

//     return client;
// }

function initApplySub() {
    var setIOScallback = false;
    if (!MQTT._isMqttClientInit) {
        try {
            WL.Logger.debug("Start Mqtt Service in initApplySub");
            //Get Client Id on device.
            WL.Logger.debug("MQTT.environment = " + MQTT.environment);
            WL.Logger.debug("WL.Environment.PREVIEW = " + WL.Environment.PREVIEW);
//            WL.Logger.debug("device.uuid = " + device.uuid);
            if (MQTT.environment !== WL.Environment.PREVIEW) {
                var deviceId = device.uuid;
                if (deviceId.length > 23) {
                    //Sometimes, the hashcode is negative, and '-' is not a valid character as client id. So replace it.
                    deviceId = (device.uuid.hashCode() + '').replace(/-/g, '_');
                }
                MQTT.clientId = deviceId;
                WL.Logger.debug("Device Id = " + MQTT.clientId);
            }
            if (MQTT.clientId==undefined){
            	var deviceId = device.uuid;
                if (deviceId.length > 23) {
                    //Sometimes, the hashcode is negative, and '-' is not a valid character as client id. So replace it.
                    deviceId = (device.uuid.hashCode() + '').replace(/-/g, '_');
                }
                MQTT.clientId = deviceId;
                WL.Logger.debug("Device Id = " + MQTT.clientId);
            }
            WL.Logger.debug(MQTT.host + ":" + MQTT.port + " clientId=" + MQTT.clientId);
            client_id = MQTT.clientId;
//          var client = new Messaging.Client(MQTT.host, Number(MQTT.port), MQTT.clientId);
            client = new Messaging.Client(MQTT.host, Number(MQTT.port), MQTT.clientId);
            client.onConnectionLost = MQTT.onConnectionLost;
            client.onMessageArrived = MQTT.onMessageArrived;
            var onConnect = function() {
                // Once a connection has been made, make a subscription and send a message.
                WL.Logger.debug("=========MQTT Connect success=============");
//                client.subscribe("/world", {});
//                client.subscribe("Hitachi/com.gzunicorn/czq/#", {});
//                client.subscribe("Hitachi/com.gzunicorn/460019003768776/#", {});

                // Sample to publish new message.
//                 message = new Messaging.Message("Hello");
//                 message.qos = 2;
//                 message.destinationName = "/world";
//                 client.send(message);
                if (setIOScallback) {
                    return;
                }

                if (MQTT.environment === WL.Environment.IPAD ||
                        MQTT.environment === WL.Environment.IPHONE) {

                    var reconnect = function() {
                        WL.Logger.debug("Back to fore ground. Try to reconnect");
                        client.connect(MQTT.connectOptions);
                    };
                    WL.App.BackgroundHandler.setOnAppEnteringForeground(reconnect);

                    //When App go into background. Disconnect now. System will kill connect anyway.
                    //It is better to disconnect by itself.
                    var disconnect = function(){
                        WL.Logger.debug("Entering background. Disconnect.");
                        client.disconnect();
                    };
                    WL.App.BackgroundHandler.setOnAppEnteringBackground(disconnect);

                    WL.Logger.debug("Registered foreground & background handler");
                    setIOScallback = true;
                }
            };
            MQTT.connectOptions['onSuccess'] = onConnect;

            var onFailure = function(err) {
                WL.Logger.error("MQTT Connect failed.", err);
                alert("MQTT cannot connect to server."); //TODO: Change your error handling here.
            };
            MQTT.connectOptions['onFailure'] = onFailure;
            MQTT.connectOptions['cleanSession'] = true;
            client.connect(MQTT.connectOptions);
            MQTT.client = client; //Set to a global variable then all function can use this instance.
            MQTT._isMqttClientInit = true;
        }catch (err) {
            WL.Logger.debug("Error in initApplySub", err);
        }
    }
}
//Use mqttloader.js to dynamically load javascript file after deviceReady event.
initApplySub();
//if (MQTT.environment === WL.Environment.PREVIEW) {
//    MQTT.clientId = "webSocketClient1";    //TODO: Change this id manually to avoid client id collision.
//    initApplySub();
//}else {
//    //Run this program on device. Start MQTT client after Cordova initialization is done.
//    document.addEventListener("deviceready", initApplySub, false);
//}


