package com.HelcPDA.baidumap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.GeofenceClient;
import com.baidu.location.LocationClient;
import com.baidu.mapapi.SDKInitializer;
import com.fiberlink.maas360.android.appSdkSampleApp.MainApplication;

import android.app.Application;
import android.app.Service;
import android.content.Context;
import android.os.Vibrator;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.widget.Toast;

public class JSLocationApplication extends MainApplication {
	@Override
	public void onCreate() {
		super.onCreate();
		
	}
	
}
