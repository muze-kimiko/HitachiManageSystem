package com.fiberlink.maas360.android.appSdkSampleApp.listeners;

import com.fiberlink.maas360.android.appSdkSampleApp.PolicyAutoEnforceInfo;

import android.view.View;
import android.widget.AdapterView;

public class AutoEnforceEnterpriseGatewayListener extends AbstractAutoEnforceListener
{
    
    private static AutoEnforceEnterpriseGatewayListener instance = new AutoEnforceEnterpriseGatewayListener();

    
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id)
    {
        super.onItemSelected(parent, view, position, id);
        PolicyAutoEnforceInfo.getInstance().setAutoEnforceEnterpriseGateway(this.isAutoEnforced());
    }

   

    public static AutoEnforceEnterpriseGatewayListener getInstance() {
        return instance;
    }
    
}
