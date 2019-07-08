package com.gzunicorn.platform.util;

import java.lang.reflect.Method;
import java.util.ArrayList;

import org.apache.http.Header;

import android.app.Activity;
import android.os.Looper;

import com.HelcPDA.R;
import com.worklight.androidgap.WLDroidGap;
import com.worklight.wlclient.api.WLClient;
import com.worklight.wlclient.api.WLFailResponse;
import com.worklight.wlclient.api.WLProcedureInvocationData;
import com.worklight.wlclient.api.WLRequestOptions;
import com.worklight.wlclient.api.WLResponse;
import com.worklight.wlclient.api.WLResponseListener;

public class MyWLConnLis extends WLDroidGap  implements WLResponseListener {

	String url = "";
	String params_str = "";
	String class_name = "";
	String method = "";
	Activity ctx;
	String flag = "";
	public MyWLConnLis(String url, String params, String class_name, String method, Activity ctx, String flag) {
		this.url = url;
		this.params_str = params;
		this.class_name = class_name;
		this.method = method;
		this.ctx = ctx;
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
		wloption.setTimeout(60*1000);
		WLClient wlclient = WLClient.getInstance();
		wlclient.invokeProcedure(invkeData, new MyWLInvoke(class_name, method, ctx), wloption);
		System.out.println("wlconn11111------------------------------");
	
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
//			System.out.println("wlconn2222");
//			ctx.finish();
			/**/Method method = null;
			Class<?> obj = null;
			try {
				if (!class_name.equals("") && !method_name.equals("")) {
					if (Looper.myLooper() == null) {
						Looper.prepare();
					}
//					Looper.prepare();
					obj=Class.forName(class_name);
					method=obj.getMethod(method_name,String.class);
		            method.invoke(obj.newInstance(),arg0.getResponseText());
//		            Looper.loop();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}finally{
				/*if (!flag.equals("1")) {
					ctx.finish();
				}*/
			}
		}
	}
	
}