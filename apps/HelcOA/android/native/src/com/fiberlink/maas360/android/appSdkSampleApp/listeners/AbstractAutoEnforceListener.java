package com.fiberlink.maas360.android.appSdkSampleApp.listeners;

import android.view.View;
import android.widget.AdapterView;

public class AbstractAutoEnforceListener implements AdapterView.OnItemSelectedListener
{

    private boolean isAutoEnforced;
    
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id)
    {
        switch (position)
        {
        case 0:
            isAutoEnforced = true;
            break;
        case 1:
            isAutoEnforced = false;
            break;
        }
       
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent)
    {
        // TODO Auto-generated method stub
        
    }

    public boolean isAutoEnforced() {
        return isAutoEnforced;
    }
    
}
