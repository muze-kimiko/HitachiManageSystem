package com.fiberlink.maas360.android.appSdkSampleApp;

import android.util.Log;

import com.CommonPlugin.MaaS360Detect;
import com.fiberlink.maas360.android.dlpsdk.eg.EnterpriseGatewayServiceState;
import com.fiberlink.maas360.android.ipc.model.v1.MaaS360AppConfig;
import com.fiberlink.maas360.android.ipc.model.v1.MaaS360Context;
import com.fiberlink.maas360.android.ipc.model.v1.MaaS360DeviceIdentityAttributes;
import com.fiberlink.maas360.android.ipc.model.v1.MaaS360DeviceSecurityInfo;
import com.fiberlink.maas360.android.ipc.model.v1.MaaS360Policy;
import com.fiberlink.maas360.android.ipc.model.v1.MaaS360SelectiveWipeStatus;
import com.fiberlink.maas360.android.ipc.model.v1.MaaS360UserInfo;
import com.fiberlink.maas360.android.ipc.util.AuthenticationStatus;
import com.fiberlink.maas360.android.ipc.util.DeactivationReason;
import com.fiberlink.maas360.util.Maas360Logger;
import com.fiberlink.maas360sdk.core.MaaS360SDKContextWrapper;
import com.fiberlink.maas360sdk.exception.MaaS360SDKNotActivatedException;
import com.fiberlink.maas360sdk.external.IMaaS360SDKListener;
import com.fiberlink.maas360sdk.external.MaaS360SDK;
import com.google.gson.Gson;

/**
 * The SDK listener.
 * 
 * @author kramgopal
 */
public class SDKListener implements IMaaS360SDKListener
{
    private static final String loggerName = SDKListener.class.getSimpleName();
    private static String authenticationStatus;
    @Override
    public void onActivationSuccess()
    {
    	Log.i("~~~~", "this is onActivationSuccess");
        Maas360Logger.d(loggerName, "SDK Activated successfully");
        logMessage("SDK Activated successfully");
//        if(MaaS360SDK.isSDKActivated()){
        	Log.i("~~~~", "on11	ActivationSuccess");
        	MaaS360Detect.IsMaaS360Activated="SDKisSuccess";
        	return;
//        	MaaS360Detect.setIsSuccess("SDKisSuccess!!");
//        }else{
//        	Log.i("~~~~", "no11	ActivationFailded");
//        	MaaS360Detect.IsMaaS360Activated="SDKisFailded!!";
////        	MaaS360Detect.setIsSuccess("SDKisFailded!!");
//        }
//        try {
//        	Log.i("~~~~", "checksso");
//            if (MaaS360SDKContextWrapper.getSharedInstance(true).getAutoEnforceInfo().shouldAutoEnforceSSO()) 
//            {
//                MaaS360SDK.checkForSSO();
//                Log.i("~~~~", "checksso ok");
//            }
//        }
//        catch (MaaS360SDKNotActivatedException e) {
//            Maas360Logger.e(loggerName, e);
//        }
    }

    @Override
    public void onActivationFailed(AuthenticationStatus authStatus)
    {
    	Log.i("~~~~", "this is onActivationFailed"); 
        Maas360Logger.d(loggerName, "SDK Activation failed");
        String reason = "";
        switch (authStatus)
        {
        case AUTHENTICATION_SUCCESSFUL:
            return;
        case AUTHENTICATION_SUCCESSFUL_KEY_EXCHANGE_NEEDED:
            return;
        case AUTHENTICATION_FAILED:
            reason = "Auth failed";
            break;
        case MAAS_NOT_ENROLLED:
            reason = "该设备没有注册MaaS360";
            break;
        case MAAS_NOT_INSTALLED:
            reason = "该设备没有安装MaaS360";
            break;
        case INVALID_SDK_VERSION:
            reason = "该设备MaaS360版本不符合";
            break;
        case UNABLE_TO_CONNECT_MAAS:
            reason = "Remote Connection to MaaS failed";
            break;
        case MAAS_NOT_INITIALIZED:
            reason = "MaaS360没有被初始化";
            break;
        case MAAS_CONTAINER_BLOCKED:
            reason = "MaaS app container blocked";
            break;
        default:
            break;
        }
        Log.i("~~~~", "status:"+reason); 
        MaaS360Detect.IsMaaS360Activated="SDKisFailded!!"+reason;
        authenticationStatus = reason;
        logMessage("SDK Activation failed; Reason :" + reason);
    }

    @Override
    public void onContextChange(MaaS360Context context)
    {
        Maas360Logger.d(loggerName, "Context changed");
        if (null != context) {
            String text = "Context: " + new Gson().toJson(context);            
            Maas360Logger.d(loggerName, text);
            logMessage(text);
        }
        else {
            Maas360Logger.d(loggerName, " Context info is null");
            logMessage("Context info is null");
        }
    }

    @Override
    public void onDeviceSecurityInfoChange(MaaS360DeviceSecurityInfo info)
    {
        Maas360Logger.d(loggerName, "Device secutiy info changed");
        if (null != info) {
            String text = "SecurityInfo: " + new Gson().toJson(info);
            Maas360Logger.d(loggerName, text);
            logMessage(text);
        }
        else {
            Maas360Logger.d(loggerName, "Device security info is null");
            logMessage("Device security info is null");
        }

    }

    @Override
    public void onPolicyChange(MaaS360Policy policy)
    {
        Maas360Logger.d(loggerName, "Policy changed");
        if (null != policy) {
            String text = "Policy: " +  new Gson().toJson(policy);
            Maas360Logger.d(loggerName, text);
            logMessage(text);
        }
        else {
            Maas360Logger.d(loggerName, "Policy is null");
            logMessage("Policy is null");
        }
        MainActivity activity = MainApplication.getApplication().getForegroundActivity();
        
        if (activity != null && activity.isInForeground()) {
            activity.updatePoliciesonUI();
        }
        
        
    }

    @Override
    public void onSelectiveWipeStatusChange(MaaS360SelectiveWipeStatus selectiveWipeStatus)
    {
        if (selectiveWipeStatus.isSelectiveWipeEnforced()) {
            Maas360Logger.d(loggerName, "Selective wiped. Reason: " + selectiveWipeStatus.getSelectiveWipeReason().name());      
            logMessage("Selective wipe applied. Reason: " + selectiveWipeStatus.getSelectiveWipeReason().name());
        }
        else {
            Maas360Logger.d(loggerName, "Selective wipe not applied");        
            logMessage("Selective wiped not applied");
        }
    }

    @Override
    public void onUserInfoChange(MaaS360UserInfo userInfo)
    {
        Maas360Logger.d(loggerName, "User info changed");
        if (null != userInfo) {
            String text = "User Info: " +  new Gson().toJson(userInfo);
            Maas360Logger.d(loggerName, text);
            logMessage(text);
        }
        else {
            Maas360Logger.d(loggerName, "User info is null");
            logMessage("User info is null");
        }

    }

    @Override
    public void onMaaSDeactivated(DeactivationReason reason)
    {
        Maas360Logger.i(loggerName, "MaaS removed MDM control" + reason.toString());
        logMessage("MaaS Deactivated : Reason - " + reason.toString());
    }

    @Override
    public void onEnterpriseGatewayStateUpdated(EnterpriseGatewayServiceState newState)
    {  
        MainActivity activity = MainApplication.getApplication().getForegroundActivity();
        if (activity != null) {
            activity.onEnterpriseGatewayStateUpdated(newState);
        }     
    }
    
    @Override
    public void onMaaSDisconnected()
    {
        logMessage("MaaS service disconnected");        
    }
    
    private void logMessage(String text)
    {
        MainActivity activity = MainApplication.getApplication().getForegroundActivity();
        if (activity != null && activity.isInForeground()) {
            activity.logMessage(text);
        }
        else {
            MainApplication.getApplication().appendLog(text);
        }
    }

    @Override
    public void onDeviceIdentityAttributesChange(MaaS360DeviceIdentityAttributes attributes)
    {
        Maas360Logger.d(loggerName, "Device identity attributes changed");
        if (null != attributes) {
            String text = "Device Identity Attributes: " +  new Gson().toJson(attributes);
            Maas360Logger.d(loggerName, text);
            logMessage(text);
        }
        else {
            Maas360Logger.d(loggerName, "Device Identity Attributes is null");
            logMessage("Device Identity Attributes is null");
        }
    }

    @Override
    public void onAppConfigUpdate(MaaS360AppConfig config)
    {
        Maas360Logger.d(loggerName, "App config updated");
        if (null != config) {
            String text = "App config: \n" +  new String(config.getConfig());
            Maas360Logger.d(loggerName, text);
            logMessage(text);
        }
        else {
            Maas360Logger.d(loggerName, "App config is null");
            logMessage("App config is null");
        }
    }
    
    public String getAuthStatusMessage() {
    	return authenticationStatus;
    }
}
