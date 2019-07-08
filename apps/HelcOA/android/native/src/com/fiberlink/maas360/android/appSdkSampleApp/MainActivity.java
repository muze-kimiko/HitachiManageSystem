package com.fiberlink.maas360.android.appSdkSampleApp;

import java.io.File;
import java.util.ArrayList;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.text.TextUtils;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.fiberlink.maas360.android.dlpsdk.MaaS360DLPSDK;
import com.fiberlink.maas360.android.dlpsdk.MaaS360DLPSDKUtils;
import com.fiberlink.maas360.android.dlpsdk.eg.EnterpriseGatewayServiceState;
import com.fiberlink.maas360sdk.exception.MaaS360SDKEnterpriseGatewayNotEnabledException;
import com.fiberlink.maas360sdk.exception.MaaS360SDKNotActivatedException;
import com.fiberlink.maas360sdk.external.MaaS360SDK;
import com.fiberlink.maas360sdk.external.MaaS360SSOActivity;
import com.fiberlink.maas360sdk.service.IEnterpriseGatewayService;
import com.HelcOA.R;

public class MainActivity extends MaaS360SSOActivity
{
    private TextView logView;
    private ProgressDialog mGatewayProgressDialog;
    private volatile boolean isInForeground;
    private static String usernameStr;
    private static String passwordStr;
    private static String domainStr;
    private AlertDialog dialog;
    private static TextView restrictScreenShotVal;
    private static TextView restrictCopyPasteVal;
    private static TextView restrictExportVal;
    private static TextView selectedWhiteAppsVal;

    /**
     * {@inheritDoc}
     */
    @SuppressWarnings("deprecation")
	@Override
    protected void onCreate(Bundle savedInstanceState)
    {
		super.onCreate(savedInstanceState);

		if (!MaaS360SDK.isSDKActivated()) {
			dialog = new AlertDialog.Builder(this).create();
			dialog.setTitle("MaaS360SDK Activation Error!!");
			dialog.setMessage(((SDKListener) MainApplication.getApplication()
					.getSDKListener()).getAuthStatusMessage());
			dialog.setCancelable(false);
			dialog.setButton("Back", new DialogInterface.OnClickListener() {

				@Override
				public void onClick(DialogInterface dialog, int which) {
					Intent intent = new Intent(MainApplication.getApplication()
							.getApplicationContext(),
							InitializeSDKActivity.class);
					intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
					MainApplication.getApplication().getApplicationContext()
							.startActivity(intent);
					dialog.dismiss();
					finish();
				}
			});
			dialog.show();

			return;
		}
        
        setContentView(R.layout.activity_main);
        logView = (TextView) findViewById(R.id.textView);
        
        ActivityUtils.setAutoEnforceView(this);
        
		restrictScreenShotVal = (TextView) findViewById(R.id.restrictScreenShotVal);
		restrictCopyPasteVal = (TextView) findViewById(R.id.restrictCopyPasteVal);
		restrictExportVal = (TextView) findViewById(R.id.restrictExportVal);
		selectedWhiteAppsVal = (TextView) findViewById(R.id.selectedWhiteListedAppsVal);
		updatePoliciesonUI();

		Button screenShot = (Button) findViewById(R.id.screenShotButton);
		screenShot.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				Intent intent = new Intent(getApplicationContext(),
						ScreenshotActivity.class);
				intent.setAction(Intent.ACTION_DELETE);
				startActivity(intent);
			}
		});
		final EditText username = (EditText) findViewById(R.id.username);
		final EditText password = (EditText) findViewById(R.id.password);
		final EditText domain = (EditText) findViewById(R.id.domain);

		if (passwordStr != null) {
			password.setText(passwordStr);
		}

		if (usernameStr != null) {
			username.setText(usernameStr);
		}

		if (domainStr != null) {
			domain.setText(domainStr);
		}

		Button openSecureBrowser = (Button) findViewById(R.id.openBrowser);
		openSecureBrowser.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View v) {
				boolean status = false;
				try {
					status = MaaS360SDK.openURLInSecureBrowser(
							getApplicationContext(), "http://www.google.com");
				} catch (MaaS360SDKNotActivatedException e) {
					logMessage("MaaS360SDK Not Activated");
				}

				if (!status) {
					logMessage("Failed to open link in secure browser");
				}
			}
		});

		Button openSecureEmail = (Button) findViewById(R.id.openEmail);
		openSecureEmail.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View v) {
				ArrayList<Uri> uris = new ArrayList<Uri>();
				uris.add(Uri.fromFile(new File(Environment
						.getExternalStorageDirectory().getAbsolutePath()
						+ File.separator + "TestFile.txt")));
				boolean status = false;
				try {
					status = MaaS360SDK.composeInSecureMail(
							getApplicationContext(), new String[] {
									"dsunder@fiberlink.com",
									"kprasanna@fiberlink.com" }, new String[] {
									"dsunder@fiberlink.com",
									"kprasanna@fiberlink.com" }, new String[] {
									"dsunder@fiberlink.com",
									"kprasanna@fiberlink.com" },
							"Test email from SDK", "Testing", uris);
				} catch (MaaS360SDKNotActivatedException e) {
					logMessage("MaaS360SDK Not Activated");
				}

				if (!status) {
					logMessage("Failed to compose in secure mail");
				}
			}
		});

        Button connectGateway = (Button) findViewById(R.id.openEnterpriseGateway);
        connectGateway.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {
                
                try {
                    showGatewayConnectingProgress();
                    IEnterpriseGatewayService enterpriseGatewayService = MaaS360SDK.getEnterpriseGatewayService();
                    usernameStr = username.getText().toString();
                    passwordStr = password.getText().toString();
                    domainStr = domain.getText().toString();
                    enterpriseGatewayService.connect(domainStr, usernameStr, passwordStr);
                }
                catch (MaaS360SDKEnterpriseGatewayNotEnabledException e) {
                    logMessage("Enterprise Gateway not enabled in policy");
                    hideGatewayConnectingProgress();
                }
                catch (MaaS360SDKNotActivatedException e) {
                    logMessage("MaaS360 SDK not activated");
                    hideGatewayConnectingProgress();
                }
            }
        });   
        
        Button openJIRA = (Button) findViewById(R.id.openJIRA);
        openJIRA.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {
               Intent intent = new Intent(MainActivity.this, IntranetSiteLoaderActivity.class);
               startActivity(intent);
            }
        }); 
        
        
Button encryptionTest = (Button)findViewById(R.id.encryptionTest);
        
        encryptionTest.setOnClickListener(new OnClickListener() {
            
            @Override
            public void onClick(View v)
            {
//              try {
//                  logMessage("Encryption Test : ");
//                  logMessage("\n EncryptionHelper : \n String used : " + EncryptionAPIs.encrypt);
//                  logMessage("\n Encrypted String : " + EncryptionAPIs.encryptionHelperEncrypt());
//                  logMessage("\n Decrypt again : " + EncryptionAPIs.encryptionHelperDecrypt());
//                  
//                  // ECB Encryption
//                  logMessage("\n ECB File Encryption : \n " + EncryptionAPIs.maasSecureOutputStreamECBEncryption());
//
//                  logMessage("\n ECB File Decryption : \n Reading encrypted data from file : " + EncryptionAPIs.maasSecureInputStreamECBEncryption());
//                  
//                  // CBC Encryption
//                  logMessage("\n CBC File Encryption : \n " + EncryptionAPIs.maasSecureOutputStreamCBCEncryption());
//
//                  logMessage("\n CBC File Decryption : \n Reading encrypted data from file :  " + EncryptionAPIs.maasSecureInputStreamCBCEncryption());
//            }
//            catch (Exception e) {
//                logMessage("Exception in encryption :" + e.getMessage());
//            }
                
            }
        });
        
        Button clearLogs = (Button) findViewById(R.id.clearLogs);
        clearLogs.setText("Clear log");
        clearLogs.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {
                logView.setText("");
                MainApplication.getApplication().saveLog("");
            }
        }); 
        
        Button openExportChooser = (Button) findViewById(R.id.openWhiteListedApps);
        openExportChooser.setText("White Listed Apps");
        openExportChooser.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View v) {

				Intent sourceIntent = new Intent(Intent.ACTION_VIEW);
				File fileToView = new File(Environment
						.getExternalStorageDirectory().getAbsolutePath()
						+ File.separator + "TestSDKFile.txt");
				sourceIntent.setDataAndType(Uri.fromFile(fileToView),
						"text/plain");

				Intent intent = MaaS360DLPSDKUtils.createChooser("Open With",
						sourceIntent);
				if (null == intent) {
					logMessage("No white listed app to open the requested file.");
				} else {
					startActivity(intent);
				}

			}
		});
        
        Button disconnectMaas  = (Button) findViewById(R.id.unbindFromMaaS);
        disconnectMaas.setOnClickListener(new View.OnClickListener() {
            
            @Override
            public void onClick(View v)
            {
                try {
                    MaaS360SDK.unbindService();
                    Intent intent = new Intent(MainApplication.getApplication().getApplicationContext(), InitializeSDKActivity.class);
			        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
			        MainApplication.getApplication().getApplicationContext().startActivity(intent);
			        
                    logMessage("User request  : Disconnected from MaaS");
                }
                catch (MaaS360SDKNotActivatedException e) {
                    logMessage("SDK not Activated");
                }
            }
        });
    }
    
    private void showGatewayConnectingProgress()
    {
        mGatewayProgressDialog = new ProgressDialog(this);
        mGatewayProgressDialog.setTitle("Connecting to Gateway");
        mGatewayProgressDialog.setMessage("Connecting...");
        mGatewayProgressDialog.setCancelable(false);
        mGatewayProgressDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
        mGatewayProgressDialog.show(); 
    }
    
    private void hideGatewayConnectingProgress()
    {
        if (mGatewayProgressDialog != null) 
            mGatewayProgressDialog.dismiss();
    }
    
    @Override
    protected void onResume()
    {
    	
        super.onResume();
        
        if(!MaaS360SDK.isSDKActivated()) {
        	return;
        }
        
        isInForeground = true;
        
        MainApplication.getApplication().setForegroundActivity(this);        
        
        logView.setText("");
        logMessage(MainApplication.getApplication().readLog());
        
    }
    
    @Override
    protected void onPause()
    {
    	super.onPause();
    	
    	if(!MaaS360SDK.isSDKActivated()) {
        	return;
        }
    	
        isInForeground = false;
        
        MainApplication.getApplication().setForegroundActivity(null);        
        MainApplication.getApplication().saveLog(logView.getText().toString());
    }

    @Override
    public void onUserInteraction()
    {
        super.onUserInteraction();
    }
    
    public void onEnterpriseGatewayStateUpdated(EnterpriseGatewayServiceState newState)
    {
        switch (newState)
        {
        case STATE_CONNECTED : logMessage("Gateway connected");
                               break;
        case STATE_DISCONNECTED : logMessage("Gateway disconnected");
                                  break;
        case STATE_FAILED_AUTH : logMessage("Gateway failed auth");
                                 break;
        case STATE_FAILED_NO_CONNECTION : logMessage("Gateway connection failed");
                                           break;
        case STATE_REQUEST_TIMED_OUT : logMessage("Gateway connection timed out");
                                       break;
        case STATE_FAILED_BLOCKED : logMessage("Gateway connection failed. Device blocked.");
                                    break;
        case STATE_CONNECTING: logMessage("Gateway connecting...");
                               break;
        } 
        
        if (newState != EnterpriseGatewayServiceState.STATE_CONNECTING) {
            hideGatewayConnectingProgress();
        }
    }
    
    public boolean isInForeground()
    {
        return isInForeground;
    }

    public void logMessage(final String text)
    {
        if (TextUtils.isEmpty(text)) return;
        
        runOnUiThread(new Runnable() {
            @Override
            public void run()
            {
                logView.append(text);
                logView.append("\n\n");
            }
        });
    }
    
    public void updatePoliciesonUI() {
        try {
            selectedWhiteAppsVal.setText("");
            for (String app : MaaS360SDK.getPolicy().getWhiteListedApps()) {
                selectedWhiteAppsVal.append("\n     " + app);
            }
        } catch (MaaS360SDKNotActivatedException e1) {
            logMessage("SDK not activated.");
            return;
        }
        // Set the initial values
        restrictScreenShotVal.setText(MaaS360DLPSDK.getInstance()
                .isRestrictScreenshot() ? " Yes" : " No");
        restrictCopyPasteVal.setText(MaaS360DLPSDK.getInstance()
                .isRestrictCopyPaste() ? " Yes" : " No");
        restrictExportVal
                .setText(MaaS360DLPSDK.getInstance().isRestrictExport() ? " Yes"
                        : " No");
    }
}
