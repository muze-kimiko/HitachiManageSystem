package com.fiberlink.maas360.android.appSdkSampleApp.listeners;

import com.fiberlink.maas360.android.appSdkSampleApp.PolicyAutoEnforceInfo;

import android.view.View;
import android.widget.AdapterView;

public class AutoEnforceScreenshotListener extends AbstractAutoEnforceListener
{
    
    private static AutoEnforceScreenshotListener instance = new AutoEnforceScreenshotListener();

    
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id)
    {
        super.onItemSelected(parent, view, position, id);
        PolicyAutoEnforceInfo.getInstance().setAutoEnforceRestrictScreenShot(this.isAutoEnforced());
    }

   

    public static AutoEnforceScreenshotListener getInstance() {
        return instance;
    }
    
}
