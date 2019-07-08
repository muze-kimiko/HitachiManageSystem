package com.HelcPDA;

import org.json.JSONObject;

import android.content.Intent;
import android.os.Bundle;

import com.fiberlink.maas360.android.appSdkSampleApp.MainApplication;
import com.fiberlink.maas360.android.appSdkSampleApp.PolicyAutoEnforceInfo;
import com.fiberlink.maas360sdk.exception.MaaS360SDKInitializationException;
import com.fiberlink.maas360sdk.external.MaaS360SDK;
import com.worklight.androidgap.api.WL;
import com.worklight.androidgap.WLDroidGap;

/* To simplify integration of native code in app startup and runtime,
   replace deprecated class WLDroidGap according to the Information Center article "Migrating Application Classes" */
public class HelcPDA extends WLDroidGap {
	
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
	
	protected void onNewIntent(Intent intent) {
		System.out.println("---------------Jump2JS(onNewIntent)");
		super.onNewIntent(intent);

		setIntent(intent);//must store the new intent unless getIntent() will return the old one

		//接受参数
		Bundle bundle = getIntent().getExtras();
		if(bundle!=null && bundle.getString("Ncontent")!=null){
			String v_Ncontent = bundle.getString("Ncontent");
			JSONObject data = new JSONObject();
			try{
				data.put("someProperty", v_Ncontent);
			}catch (Exception e){
				System.out.println("---"+e.getMessage());
		    }
			WL.getInstance().sendActionToJS("doSomething", data);
//			if(appView != null){
//				System.out.println("---------------appView != null");
//				appView.getSettings().setJavaScriptEnabled(true);
//				appView.addJavascriptInterface(new JavaScriptInterface(this), "jsInterface");
//				appView.loadUrl("javascript:jump2apptype('" + bundle.getString("apptype") + "')");
//			}else{
//				System.out.println("---------------appView = null");
//			}
		}else{
			System.out.println("---------------bundle is null");
		}
	}
}



