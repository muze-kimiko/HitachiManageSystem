package com.MyApp;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.webkit.WebView;

import com.worklight.androidgap.WLDroidGap;

/* To simplify integration of native code in app startup and runtime,
   replace deprecated class WLDroidGap according to the Information Center article "Migrating Application Classes" */
public class MyApp extends WLDroidGap {
	
	@Override
	public void onCreate(Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		System.out.println("onCreate");
		/*//接受参数
		Bundle bundle = this.getIntent().getExtras();
		System.out.println("name|"+bundle.getString("name"));*/
	}
	
	/**
     * onWLInitCompleted is called when the Worklight runtime framework initialization is complete
     */
	@Override
	public void onWLInitCompleted(Bundle savedInstanceState){
		//接受参数
		/*Bundle bundle = this.getIntent().getExtras();
		System.out.println("onWLInitCompleted name|"+bundle.getString("name"));
		System.out.println("getWebMainFilePath|"+getWebMainFilePath());*/
		super.loadUrl(getWebMainFilePath());
		System.out.println("onWLInitCompleted");
		// Add custom initialization code after this line
	}
	
	@Override
	public void onResume() {  
		super.onResume();
		//接受参数
		System.out.println("onResume");
		Bundle bundle = getIntent().getExtras();
		System.out.println("name|"+bundle.getString("name"));
		if(bundle.getString("name")!=null){
			appView.getSettings().setJavaScriptEnabled(true);
			appView.addJavascriptInterface(new JavaScriptInterface(this), "jsInterface");
			appView.loadUrl("javascript:jump2otherappSuccess('aaa')");
		}
	}  
	
	@Override  
	protected void onNewIntent(Intent intent) {  
		super.onNewIntent(intent);
		setIntent(intent);
	}  
}

