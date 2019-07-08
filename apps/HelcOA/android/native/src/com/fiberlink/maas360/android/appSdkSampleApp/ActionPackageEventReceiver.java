package com.fiberlink.maas360.android.appSdkSampleApp;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.fiberlink.maas360.util.Maas360Logger;

public class ActionPackageEventReceiver extends BroadcastReceiver
{

    private static final String loggerName = ActionPackageEventReceiver.class.getSimpleName();
    

    @Override
    public void onReceive(Context context, Intent intent)
    {
        String action = intent.getAction();
        Maas360Logger.i(loggerName, "Received intent : " + action);
        
        if(Intent.ACTION_PACKAGE_FULLY_REMOVED.equals(action)) {
            Uri uri = intent.getData();
            Log.e("App", "Got uninsttallation intent");
            Log.e("App", "URI : " + uri.getSchemeSpecificPart());
            String pkg = uri != null ? uri.getSchemeSpecificPart() : null;
//            MainApplication.getApplication().getDaoService().getSharedInterAppSecretDao().deleteKey(pkg);
        }
    }
    
}