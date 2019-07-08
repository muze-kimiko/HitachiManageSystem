package com.HelcPDA.CommonPlugin;

import java.lang.reflect.Method;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.provider.Settings;
import android.telephony.TelephonyManager;

public class CommonInfo extends CordovaPlugin {
	public boolean execute(String action,JSONArray args,CallbackContext callbackContext)
			throws JSONException{
		if(action.equals("aaa")){
			try{
				// 
				TelephonyManager telephonyManager = (TelephonyManager)cordova.getActivity().getSystemService(Context.TELEPHONY_SERVICE);
				String str_imsi=null,str_baseband_version=null,str_android_version=null,str_phone_model=null;
				String str_imei = telephonyManager.getDeviceId(); // 获取IMEI
				String str_uuid = Settings.Secure.getString(cordova.getActivity().getContentResolver(), "android_id").toUpperCase();
				str_imsi = telephonyManager.getSubscriberId(); // 获取IMSI
				try {
					Class cl = Class.forName("android.os.SystemProperties");
					Object invoker = cl.newInstance();
					Method m = cl.getMethod("get", new Class[] {String.class,String.class});
					Object result = m.invoke(invoker, new Object[]{"gsm.version.baseband","no message"});
					
					str_baseband_version = (String)result;
				} catch (Exception e) {
					e.printStackTrace();
					// TODO: handle exception
				}
				str_android_version = android.os.Build.VERSION.RELEASE;
				str_phone_model = android.os.Build.MODEL;
				JSONObject jo_response = new JSONObject();
				jo_response.put("uuid", str_uuid);
				jo_response.put("imei", str_imei);
				jo_response.put("imsi", str_imsi);
				jo_response.put("baseband_version", str_baseband_version);
				jo_response.put("android_version", str_android_version);
				jo_response.put("phone_model", str_phone_model);
				callbackContext.success(jo_response.toString());
			}catch (Exception e){
				callbackContext.error("error");
			}
			return true;
		}
		
		return false;
	}
}
