package com.fiberlink.maas360.android.appSdkSampleApp.listeners;

import com.fiberlink.maas360.android.appSdkSampleApp.PolicyAutoEnforceInfo;

import android.view.View;
import android.widget.AdapterView;

public class AutoEnforceRestrictCopyPasteListener extends AbstractAutoEnforceListener
{
    
    private static AutoEnforceRestrictCopyPasteListener instance = new AutoEnforceRestrictCopyPasteListener();

    
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id)
    {
        super.onItemSelected(parent, view, position, id);
        PolicyAutoEnforceInfo.getInstance().setAutoEnforceRestrictCopyPaste(this.isAutoEnforced());
    }

   

    public static AutoEnforceRestrictCopyPasteListener getInstance() {
        return instance;
    }
    
}
