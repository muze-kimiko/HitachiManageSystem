package com.MyTest;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

public class CommonPlugin extends CordovaPlugin{
	public boolean execute(String action,JSONArray args,CallbackContext callbackContext)
			throws JSONException{
		System.out.println("CommonPlugin");
		System.out.println("action|"+action);
		if(action.equals("Jump2App")){
			try{
				Intent intent = cordova.getActivity().getPackageManager().getLaunchIntentForPackage("com.MyApp");
				if(intent != null){
					Bundle bundle = new Bundle();
					bundle.putString("name", "111");
					intent.putExtras(bundle);
					cordova.getActivity().startActivity(intent);
				}else {
					callbackContext.error("未找到该App，请先安装");
//					Toast.makeText(cordova.getActivity().getApplicationContext(), "noapp", Toast.LENGTH_LONG).show();
				}
			}catch(Exception e){
				e.printStackTrace();
			}
			return true;
		}
		return false;
	}
}
