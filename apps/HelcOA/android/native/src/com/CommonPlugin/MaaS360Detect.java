package com.CommonPlugin;

import java.text.SimpleDateFormat;  
import java.util.Calendar;  
import java.util.Date;  
import java.util.EmptyStackException;  
  
import java.util.Set;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
  
import org.apache.cordova.PluginResult;
import org.json.JSONArray;  
import org.json.JSONException;  
import org.json.JSONObject;  

import com.fiberlink.maas360.android.appSdkSampleApp.MainActivity;
import com.fiberlink.maas360.android.appSdkSampleApp.MainApplication;
import com.fiberlink.maas360.android.appSdkSampleApp.PolicyAutoEnforceInfo;
import com.fiberlink.maas360sdk.external.MaaS360SDK;

import android.content.Intent;  
import android.database.Cursor;  
import android.net.Uri;  
import android.provider.CallLog;  
import android.provider.ContactsContract;  
import android.text.format.DateFormat;  
import android.util.Log;  
  
/** 
 * Grab call log data 
 *  
 */  
public class MaaS360Detect extends CordovaPlugin {  
  
    /** List Action */  
    private static final String initSDK	 = "init";  
    private static final String MaaS360Detect = "userInfo";
    public static String IsMaaS360Activated = "";
    /* 
     * (non-Javadoc) 
     *  
     * @see com.phonegap.api.Plugin#execute(java.lang.String, 
     * org.json.JSONArray, java.lang.String) 
     */  
    @Override  
    public boolean execute(String action,JSONArray args,CallbackContext callbackContext)
			throws JSONException{  
        Log.i("TAG", "Plugin Called");  
        if (initSDK.equals(action)) {
        	 try {
//                 MaaS360SDK.initSDK(MainApplication.getApplication(), "appKey", "licenseKey",  
//                         MainApplication.getApplication().getSDKListener(), PolicyAutoEnforceInfo.getInstance());
                 //初始化成功/初始化失败
                 callbackContext.success(IsMaaS360Activated);
                 Log.i("~~~~~~~~~", "sss:"+IsMaaS360Activated);
            	 return true;
             }
             catch (Exception e) {
            	 Log.i("TAG", "e");  
            	 e.printStackTrace();
            	 callbackContext.error("MaaS360SDK faild");
            	 return false;  
             }
        }  
        return false;  
    }  
    
    public synchronized static void setIsSuccess(String SDKInfo){
    	IsMaaS360Activated = SDKInfo;
    }
    
    public synchronized static String getIsSuccess(){
    	return IsMaaS360Activated;
    }
}  