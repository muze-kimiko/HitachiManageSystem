package com.fiberlink.maas360.android.appSdkSampleApp;

import android.app.Activity;
import android.widget.Spinner;

import com.fiberlink.maas360.android.appSdkSampleApp.listeners.AutoEnforceEnterpriseGatewayListener;
import com.fiberlink.maas360.android.appSdkSampleApp.listeners.AutoEnforceRestrictCopyPasteListener;
import com.fiberlink.maas360.android.appSdkSampleApp.listeners.AutoEnforceRestrictExportListener;
import com.fiberlink.maas360.android.appSdkSampleApp.listeners.AutoEnforceSSOCheckListener;
import com.fiberlink.maas360.android.appSdkSampleApp.listeners.AutoEnforceScreenshotListener;
import com.fiberlink.maas360.android.appSdkSampleApp.listeners.AutoEnforceSelectiveWipeListener;
import com.HelcOA.R;

public class ActivityUtils
{

    public static void setAutoEnforceView(Activity activity) {
        Spinner autoEnforceRestrictScreenShot = (Spinner) activity.findViewById(R.id.selectAutorestrictScreenShot);
        Spinner autoEnforceRestrictCopyPaste = (Spinner) activity.findViewById(R.id.selectAutorestrictCopyPaste);
        Spinner autoEnforceRestrictExport = (Spinner) activity.findViewById(R.id.selectAutorestrictExport);
        Spinner autoEnforceEnterpriseGateway = (Spinner) activity.findViewById(R.id.selectAutoEnforceEnterpriseGateway);
        Spinner autoEnforceSelectiveWipe = (Spinner) activity.findViewById(R.id.selectAutoEnforceSelectiveWipe);
        Spinner autoEnforceSSOCheck = (Spinner) activity.findViewById(R.id.selectAutoEnforceSSOCheck);
        
        autoEnforceRestrictScreenShot.setSelection(AutoEnforceScreenshotListener.getInstance().isAutoEnforced() ? 0 : 1);
        autoEnforceRestrictCopyPaste.setSelection(AutoEnforceRestrictCopyPasteListener.getInstance().isAutoEnforced() ? 0 : 1);
        autoEnforceRestrictExport.setSelection(AutoEnforceRestrictExportListener.getInstance().isAutoEnforced() ? 0 : 1);
        autoEnforceEnterpriseGateway.setSelection(AutoEnforceEnterpriseGatewayListener.getInstance().isAutoEnforced() ? 0 : 1);
        autoEnforceSelectiveWipe.setSelection(AutoEnforceSelectiveWipeListener.getInstance().isAutoEnforced() ? 0 : 1);
        autoEnforceSSOCheck.setSelection(AutoEnforceSSOCheckListener.getInstance().isAutoEnforced() ? 0 : 1);
        
        autoEnforceRestrictScreenShot.setOnItemSelectedListener(AutoEnforceScreenshotListener.getInstance());

        autoEnforceRestrictCopyPaste.setOnItemSelectedListener(AutoEnforceRestrictCopyPasteListener.getInstance());

        autoEnforceRestrictExport.setOnItemSelectedListener(AutoEnforceRestrictExportListener.getInstance());

        autoEnforceEnterpriseGateway.setOnItemSelectedListener(AutoEnforceEnterpriseGatewayListener.getInstance());
        
        autoEnforceSelectiveWipe.setOnItemSelectedListener(AutoEnforceSelectiveWipeListener.getInstance());
        
        autoEnforceSSOCheck.setOnItemSelectedListener(AutoEnforceSSOCheckListener.getInstance());
        
        return;
    }
    
    
}
