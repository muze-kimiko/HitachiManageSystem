package com.fiberlink.maas360.android.appSdkSampleApp.listeners;

import com.fiberlink.maas360.android.appSdkSampleApp.PolicyAutoEnforceInfo;

import android.view.View;
import android.widget.AdapterView;

public class AutoEnforceSSOCheckListener extends AbstractAutoEnforceListener
{
    
    private static AutoEnforceSSOCheckListener instance = new AutoEnforceSSOCheckListener();

    
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id)
    {
        super.onItemSelected(parent, view, position, id);
        PolicyAutoEnforceInfo.getInstance().setAutoEnforceSSOCheck(this.isAutoEnforced());
    }

   

    public static AutoEnforceSSOCheckListener getInstance() {
        return instance;
    }
    
}
