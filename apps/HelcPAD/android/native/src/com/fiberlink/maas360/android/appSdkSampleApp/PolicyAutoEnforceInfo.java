package com.fiberlink.maas360.android.appSdkSampleApp;

import com.fiberlink.maas360sdk.external.IMaaS360SDKPolicyAutoEnforceInfo;

/**
 * Policy auto enforcement info.
 * 
 * @author kramgopal
 */
public class PolicyAutoEnforceInfo implements IMaaS360SDKPolicyAutoEnforceInfo
{

    private boolean autoEnforceRestrictScreenShot;
    private boolean autoEnforceRestrictCopyPaste;
    private boolean autoEnforceEnterpriseGateway;
    private boolean autoEnforceRestrictExport;
    private boolean autoEnforceSelectiveWipe;
    private boolean autoEnforceSSOCheck;
    private boolean autoEnforceRestrictRootedDevice;
    /**
     * Shared instance.
     */
    private static final PolicyAutoEnforceInfo sharedInstance = new PolicyAutoEnforceInfo();

    /**
     * @return Shared instance.
     */
    public static PolicyAutoEnforceInfo getInstance()
    {
        return sharedInstance;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean shouldAutoEnforceRestrictCopyPaste()
    {
        return autoEnforceRestrictCopyPaste;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean shouldAutoEnforceRestrictScreenshot()
    {
        return autoEnforceRestrictScreenShot;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean shouldAutoEnforceEnterpriseGateway()
    {
        return autoEnforceEnterpriseGateway;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean shouldAutoEnforceSelectiveWipe()
    {
        return autoEnforceSelectiveWipe;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean shouldAutoEnforceRestrictExport()
    {
        return autoEnforceRestrictExport;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean shouldAutoEnforceSSO()
    {
        return autoEnforceSSOCheck;
    }

    @Override
    public boolean shouldAutoEnforceRootedDeviceRestriction()
    {
        return autoEnforceRestrictRootedDevice;
    }

    public void setAutoEnforceRestrictScreenShot(boolean autoEnforceRestrictScreenShot)
    {
        this.autoEnforceRestrictScreenShot = autoEnforceRestrictScreenShot;
    }

    public void setAutoEnforceRestrictCopyPaste(boolean autoEnforceRestrictCopyPaste)
    {
        this.autoEnforceRestrictCopyPaste = autoEnforceRestrictCopyPaste;
    }

    public void setAutoEnforceEnterpriseGateway(boolean autoEnforceEnterpriseGateway)
    {
        this.autoEnforceEnterpriseGateway = autoEnforceEnterpriseGateway;
    }

    public void setAutoEnforceRestrictExport(boolean autoEnforceRestrictExport)
    {
        this.autoEnforceRestrictExport = autoEnforceRestrictExport;
    }

    public void setAutoEnforceSelectiveWipe(boolean autoEnforceSelectiveWipe)
    {
        this.autoEnforceSelectiveWipe = autoEnforceSelectiveWipe;
    }

    public void setAutoEnforceSSOCheck(boolean autoEnforceSSOCheck)
    {
        this.autoEnforceSSOCheck = autoEnforceSSOCheck;
    }

    public void setAutoEnforceRestrictRootedDevices(boolean autoEnforceRestrictRootedDevices)
    {
        this.autoEnforceRestrictRootedDevice = autoEnforceRestrictRootedDevices;
    }
}