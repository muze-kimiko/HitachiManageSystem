package com.HelcPDA.CommonPlugin;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.telephony.TelephonyManager;

public class IMEI extends Activity{
	public static String imei;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		TelephonyManager telephonyManager = (TelephonyManager)getSystemService(Context.TELEPHONY_SERVICE);
//		imsi = telephonyManager.getSubscriberId();
		imei = telephonyManager.getDeviceId();
	}
}
