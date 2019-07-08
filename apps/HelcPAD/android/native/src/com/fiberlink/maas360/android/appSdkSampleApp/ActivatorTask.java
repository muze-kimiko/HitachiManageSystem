package com.fiberlink.maas360.android.appSdkSampleApp;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;

import com.fiberlink.maas360sdk.external.MaaS360SDK;

public class ActivatorTask extends AsyncTask<Void, Void, Void>
{
    private final Activity mActivity;
    private ProgressDialog mProgressDialog;
    private PolicyAutoEnforceInfo policyAutoEnforceInfo;
    
    /**
     * Constructor
     */
    public ActivatorTask(Activity activity, PolicyAutoEnforceInfo policyAutoEnforceInfo)
    {
        this.mActivity = activity;
        this.policyAutoEnforceInfo = policyAutoEnforceInfo;
    }
    
    @Override
    protected void onPreExecute()
    {
        super.onPreExecute();
        
        if (!mActivity.isFinishing()) {
            mProgressDialog = new ProgressDialog(mActivity);
            mProgressDialog.setTitle("MaaS360SDK activation");
            mProgressDialog.setMessage("Activating...");
            mProgressDialog.setCancelable(false);
            mProgressDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
            mProgressDialog.show();   
        }
    }
    
    @Override
    protected Void doInBackground(Void... arg0)
    {
        try {
            MaaS360SDK.initSDK(MainApplication.getApplication(), "appKey", "licenseKey",  
                    MainApplication.getApplication().getSDKListener(), policyAutoEnforceInfo);
        }
        catch (Exception e) {
        }
        
        return null;
    }

    @Override
    protected void onPostExecute(Void result)
    {
        super.onPostExecute(result);
        if (!mActivity.isFinishing()) {
            mProgressDialog.dismiss();
        }
        
        Intent intent = new Intent(MainApplication.getApplication().getApplicationContext(), MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        MainApplication.getApplication().getApplicationContext().startActivity(intent);
    }
}
