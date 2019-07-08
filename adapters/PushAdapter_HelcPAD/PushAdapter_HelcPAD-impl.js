
WL.Server.createEventSource({
	name: 'PushEventSource_HelcPAD',
	onDeviceSubscribe: 'deviceSubscribeFunc',
	onDeviceUnsubscribe: 'deviceUnsubscribeFunc',
	securityTest:'PushApplication-strong-mobile-securityTest'
});

function deviceSubscribeFunc(userSubscription, deviceSubscription){
	WL.Logger.debug(">> deviceSubscribeFunc");
	WL.Logger.debug(userSubscription);
	WL.Logger.debug(deviceSubscription);
}

function deviceUnsubscribeFunc(userSubscription, deviceSubscription){
	WL.Logger.debug(">> deviceUnsubscribeFunc");
	WL.Logger.debug(userSubscription);
	WL.Logger.debug(deviceSubscription);
}

function submitNotification(userId, notificationText, contentText){
	var userSubscription = WL.Server.getUserNotificationSubscription('PushAdapter_HelcPAD.PushEventSource_HelcPAD', userId);
	
	if (userSubscription==null){
		return { result: "No subscription found for user :: " + userId };
	}

	var badgeDigit = 1;
	
//	var notification = WL.Server.createDefaultNotification(notificationText, badgeDigit, {custom:"data"});
	
	var notification = WL.Server.createDefaultNotification(notificationText, badgeDigit, {custom:contentText});
	
	WL.Logger.debug("submitNotification >> userId :: " + userId + ", text :: " + notificationText);
	
	WL.Server.notifyAllDevices(userSubscription, notification);
	
	return { 
		result: "Notification sent to user :: " + userId 
	};
}