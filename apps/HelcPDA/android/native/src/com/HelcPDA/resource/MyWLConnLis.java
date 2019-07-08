package com.HelcPDA.resource;

import java.lang.reflect.Method;
import java.util.ArrayList;

import org.apache.http.Header;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.content.Intent;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import com.HelcPDA.MapViewActivity;
import com.worklight.androidgap.WLDroidGap;
import com.worklight.wlclient.api.WLClient;
import com.worklight.wlclient.api.WLFailResponse;
import com.worklight.wlclient.api.WLProcedureInvocationData;
import com.worklight.wlclient.api.WLRequestOptions;
import com.worklight.wlclient.api.WLResponse;
import com.worklight.wlclient.api.WLResponseListener;

public class MyWLConnLis  implements WLResponseListener {

	String url = "";
	String params_str = "";
	String class_name = "";
	String method = "";
	Activity ctxn;
    Class Ntx;
	String flag = "";
	public MyWLConnLis(String url, String params, String class_name, String method, Activity ctx,Class Ntx, String flag) {
		this.url = url;
		this.params_str = params;
		this.class_name = class_name;
		this.method = method;
		this.ctxn = ctx;
		this.Ntx=Ntx;
		this.flag = flag;	
	}
	
	private void MyWLConnList() {
	}
	
	@Override
	public void onFailure(WLFailResponse arg0) {
	}

	@Override
	public void onSuccess(WLResponse arg0) {
		WLProcedureInvocationData invkeData = new WLProcedureInvocationData("HttpAdapter_PDA", "getStories_pda");
		Object[] params = new Object[]{url,params_str};
		invkeData.setParameters(params);
		WLRequestOptions wloption = new WLRequestOptions();
		wloption.setTimeout(180000);
		WLClient wlclient = WLClient.getInstance();
		ArrayList<Header> al = wloption.getHeaders();
		int length = al.size();
		wlclient.invokeProcedure(invkeData, new MyWLInvoke(class_name, method, ctxn), wloption);
	}
	
	private class MyWLInvoke implements WLResponseListener {

		String class_name = "";
		String method_name = "";
		Activity ctx;
		public MyWLInvoke(String class_name, String method, Activity ctx) {
			this.class_name = class_name;
			this.method_name = method;
			this.ctx = ctx;
		}
		
		private void MyWLInvoke() {
		}
		
		@Override
		public void onFailure(WLFailResponse arg0) {
		}

		@Override
		public void onSuccess(WLResponse arg0) {
			/**/Method method = null;
			Class<?> obj = null;
			try {
				if (!class_name.equals("") && !method_name.equals("")) {
					if (Looper.myLooper() == null) {
						Looper.prepare();
					}
					obj=Class.forName(class_name);
					method=obj.getMethod(method_name,String.class,Activity.class,Class.class);
		            method.invoke(obj.newInstance(),arg0.getResponseText(),ctx,Ntx);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}finally{
				if (flag.equals("0")) {
					ctx.finish();
				}
				else if(flag.equals("2")){
				}
				else if(flag.equals("3")){
		           String tempString=arg0.getResponseText();
				   String tempV=tempString.substring(tempString.indexOf("{msgid"),tempString.indexOf("responseID"));
				   String tempC=tempV.substring(0,tempV.indexOf("}"));
				   tempC=tempC+"}";
		           JSONObject obk;
			      try {
			    	//Log.e("result..bb", tempV);
			    	obk = new JSONObject(tempC);
			    	if("0".equals(obk.optString("msgid"))){
			    		MapViewActivity.toasty.show();
			    	}else{
			    		MapViewActivity.toastn.show();
			    	}
			        } catch (JSONException e) {
				      e.printStackTrace();
			     }
				}else{
					
				}
			}
		}
	}
	
}