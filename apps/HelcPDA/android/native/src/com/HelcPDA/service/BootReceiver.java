package com.HelcPDA.service;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class BootReceiver extends BroadcastReceiver {
static final String ACTION="android.intent.action.BOOT_COMPLETED"; 

	@Override
    public void onReceive(Context context, Intent intent) {
		if(intent.getAction().equals(ACTION)){
			Intent bootStart = new Intent(context, JSBDLocationService.class);
			bootStart.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
			context.startService(bootStart);

			}
    }
}