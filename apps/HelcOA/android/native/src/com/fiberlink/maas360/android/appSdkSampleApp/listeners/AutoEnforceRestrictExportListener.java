package com.fiberlink.maas360.android.appSdkSampleApp.listeners;

import com.fiberlink.maas360.android.appSdkSampleApp.PolicyAutoEnforceInfo;

import android.view.View;
import android.widget.AdapterView;

public class AutoEnforceRestrictExportListener extends AbstractAutoEnforceListener
{
    
    private static AutoEnforceRestrictExportListener instance = new AutoEnforceRestrictExportListener();

    
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id)
    {
        super.onItemSelected(parent, view, position, id);
        PolicyAutoEnforceInfo.getInstance().setAutoEnforceRestrictExport(this.isAutoEnforced());
    }

   

    public static AutoEnforceRestrictExportListener getInstance() {
        return instance;
    }
    
}
