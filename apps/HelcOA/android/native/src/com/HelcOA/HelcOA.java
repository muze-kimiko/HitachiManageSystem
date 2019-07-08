package com.HelcOA;

import android.os.Bundle;
import android.util.Log;

import com.fiberlink.maas360.android.appSdkSampleApp.MainApplication;
import com.fiberlink.maas360.android.appSdkSampleApp.PolicyAutoEnforceInfo;
import com.fiberlink.maas360sdk.exception.MaaS360SDKInitializationException;
import com.fiberlink.maas360sdk.external.MaaS360SDK;
import com.worklight.androidgap.WLDroidGap;

/* To simplify integration of native code in app startup and runtime,
   replace deprecated class WLDroidGap according to the Information Center article "Migrating Application Classes" */
public class HelcOA extends WLDroidGap {
	
	@Override
	public void onCreate(Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
	}
	
	/**
     * onWLInitCompleted is called when the Worklight runtime framework initialization is complete
     */
	@Override
	public void onWLInitCompleted(Bundle savedInstanceState){
		super.loadUrl(getWebMainFilePath());
		try {
			MaaS360SDK.initSDK(MainApplication.getApplication(), "appKey", "licenseKey",  
			        MainApplication.getApplication().getSDKListener(), PolicyAutoEnforceInfo.getInstance());
		} catch (MaaS360SDKInitializationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// Add custom initialization code after this line
	}
	
}



