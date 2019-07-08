package com.fiberlink.maas360.android.appSdkSampleApp;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;

import com.fiberlink.maas360sdk.exception.MaaS360SDKNotActivatedException;
import com.fiberlink.maas360sdk.external.MaaS360SDK;
import com.fiberlink.maas360sdk.service.IEnterpriseGatewayService;
import com.HelcMES.R;

@SuppressLint ("SetJavaScriptEnabled")
public class IntranetSiteLoaderActivity extends Activity
{
    @Override
    public void onCreate(Bundle saBundle)
    {
        super.onCreate(saBundle);
        setContentView(R.layout.gateway);

        try {
            IEnterpriseGatewayService enterpriseGatewayService = MaaS360SDK.getEnterpriseGatewayService();
            WebView webView = (WebView) findViewById(R.id.webView1);
            webView.getSettings().setJavaScriptEnabled(true);
//            enterpriseGatewayService.proxy(webView);
            
            webView.setWebViewClient(new WebViewClient() {
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    view.loadUrl(url);
                    return true;
                };
            });
            
            final ProgressBar pb = (ProgressBar) findViewById(R.id.progressBar);
            pb.setVisibility(ProgressBar.GONE);
            
            webView.setWebChromeClient(new WebChromeClient() {
                public void onProgressChanged(WebView view, int progress) 
                   {
                   if(progress < 100 && pb.getVisibility() == ProgressBar.GONE){
                       pb.setVisibility(ProgressBar.VISIBLE);
                   }
                   pb.setProgress(progress);
                   if(progress == 100) {
                       pb.setVisibility(ProgressBar.GONE);
                   }
                }
            });
                    
            webView.loadUrl("http://jira.fiberlink.com");

        }
        catch (MaaS360SDKNotActivatedException e) {

        }
    }
}
