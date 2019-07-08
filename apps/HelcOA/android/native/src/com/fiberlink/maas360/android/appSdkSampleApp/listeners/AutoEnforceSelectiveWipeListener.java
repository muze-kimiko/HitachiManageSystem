package com.fiberlink.maas360.android.appSdkSampleApp.listeners;

import com.fiberlink.maas360.android.appSdkSampleApp.PolicyAutoEnforceInfo;

import android.view.View;
import android.widget.AdapterView;

public class AutoEnforceSelectiveWipeListener extends AbstractAutoEnforceListener
{
    
    private static AutoEnforceSelectiveWipeListener instance = new AutoEnforceSelectiveWipeListener();

    
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id)
    {
        super.onItemSelected(parent, view, position, id);
        PolicyAutoEnforceInfo.getInstance().setAutoEnforceSelectiveWipe(this.isAutoEnforced());
    }

   

    public static AutoEnforceSelectiveWipeListener getInstance() {
        return instance;
    }
    
}
