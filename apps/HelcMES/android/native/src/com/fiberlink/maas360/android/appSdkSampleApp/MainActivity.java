package com.fiberlink.maas360.android.appSdkSampleApp;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import android.app.AlertDialog;
import android.app.Notification;
import android.app.PendingIntent;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.support.v4.app.NotificationCompat;
import android.text.TextUtils;
import android.view.View;
import android.view.View.OnClickListener;
import android.webkit.MimeTypeMap;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import ch.boye.httpclientandroidlib.HttpResponse;
import ch.boye.httpclientandroidlib.client.ClientProtocolException;
import ch.boye.httpclientandroidlib.client.methods.HttpGet;

//import com.fiberlink.maas360.android.appSdkSampleApp.listeners.NotificationConfig;
import com.fiberlink.maas360.android.dlpsdk.MaaS360DLPSDK;
import com.fiberlink.maas360.android.dlpsdk.MaaS360DLPSDKUtils;
import com.fiberlink.maas360.android.dlpsdk.eg.EnterpriseGatewayServiceState;
import com.fiberlink.maas360.android.dlpsdk.notification.NotificationManager;
import com.HelcMES.R;
import com.fiberlink.maas360.util.Maas360Logger;
import com.fiberlink.maas360sdk.exception.MaaS360SDKEnterpriseGatewayNotEnabledException;
import com.fiberlink.maas360sdk.exception.MaaS360SDKNotActivatedException;
import com.fiberlink.maas360sdk.external.MaaS360SDK;
import com.fiberlink.maas360sdk.external.MaaS360SSOActivity;
import com.fiberlink.maas360sdk.external.MaaS360SecureHttpClient;
import com.fiberlink.maas360sdk.service.IEnterpriseGatewayService;

public class MainActivity extends MaaS360SSOActivity
{
    private static final String LOG_TAG = MainActivity.class.getSimpleName();

    private TextView logView;
    private ProgressDialog mProgressDialog;
    private volatile boolean isInForeground;
    private static String usernameStr = "";
    private static String passwordStr = "";
    private static String domainStr = "";
    private AlertDialog dialog;

    private TextView legacyGatewayOpenURLResponse;

    private TextView maas360GatewayOpenURLResponse;

    private TextView gatewayStateValue;
    private TextView restrictScreenShotVal;
    private TextView restrictCopyPasteVal;
    private TextView restrictExportVal;
    private TextView selectedWhiteAppsVal;
    private static int notification_id = 0;
    private static String notificationStr = "Test";
    public static TextView containerLockBox;
    public static TextView hasSSOExpiredText;
    private static MainActivity mActivity;
    public static final String CONTAINER_LOCKED = "Container Locked";
    public static final String CONTAINER_UNLOCKED = "Container Unlocked";

    /**
     * {@inheritDoc}
     */
    @SuppressWarnings ("deprecation")
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        mActivity = this;
        setContentView(R.layout.activity_main);
        logView = (TextView) findViewById(R.id.textView);

        if (!MaaS360SDK.isSDKActivated()) {
            dialog = new AlertDialog.Builder(this).create();
            dialog.setTitle("MaaS360SDK Activation Error!!");
            dialog.setMessage(((SDKListener) MainApplication.getApplication().getSDKListener()).getAuthStatusMessage());
            dialog.setCancelable(false);
            dialog.setButton("Back", new DialogInterface.OnClickListener() {

                @Override
                public void onClick(DialogInterface dialog, int which)
                {
                    Intent intent = new Intent(MainApplication.getApplication().getApplicationContext(),
                            InitializeSDKActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    MainApplication.getApplication().getApplicationContext().startActivity(intent);
                    dialog.dismiss();
                    finish();
                }
            });
            dialog.show();

            return;
        }

//        ActivityUtils.setAutoEnforceView(this);

//        try {
//            MaaS360SDK.setBlockingNotification(new NotificationConfig());
//        }
//        catch (MaaS360SDKNotActivatedException e1) {
//            logMessage("SDK Not activated while setting blocking notification");
//        }

        restrictScreenShotVal = (TextView) findViewById(R.id.restrictScreenShotVal);
        restrictCopyPasteVal = (TextView) findViewById(R.id.restrictCopyPasteVal);
        restrictExportVal = (TextView) findViewById(R.id.restrictExportVal);
        selectedWhiteAppsVal = (TextView) findViewById(R.id.selectedWhiteListedAppsVal);
        legacyGatewayOpenURLResponse = (TextView) findViewById(R.id.legacyGatewayOpenURLResponse);
        maas360GatewayOpenURLResponse = (TextView) findViewById(R.id.maas360GatewayOpenURLResponse);
        gatewayStateValue = (TextView) findViewById(R.id.gatewayStateValue);
        updatePoliciesonUI();
        updateGatewayStatus();

        Button screenShot = (Button) findViewById(R.id.screenShotButton);
        screenShot.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View v)
            {
                Intent intent = new Intent(getApplicationContext(), ScreenshotActivity.class);
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
            public void onClick(View v)
            {
                boolean status = false;
                try {
                    status = MaaS360SDK.openURLInSecureBrowser(getApplicationContext(), "http://www.google.com");
                }
                catch (MaaS360SDKNotActivatedException e) {
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
            public void onClick(View v)
            {
                ArrayList<Uri> uris = new ArrayList<Uri>();
                uris.add(Uri.fromFile(new File(Environment.getExternalStorageDirectory().getAbsolutePath()
                        + File.separator + "TestFile.txt")));
                boolean status = false;
                try {
                    status = MaaS360SDK.composeInSecureMail(getApplicationContext(),
                            new String[] {"dsunder@fiberlink.com", "kprasanna@fiberlink.com" },
                            new String[] { "dsunder@fiberlink.com", "kprasanna@fiberlink.com" },
                            new String[] { "dsunder@fiberlink.com", "kprasanna@fiberlink.com" },
                            "Test email from SDK", "Testing", uris);
                }
                catch (MaaS360SDKNotActivatedException e) {
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

        Button legacyGatewayOpenURL = (Button) findViewById(R.id.legacyGatewayOpenURL);
        final EditText legacyGatewayEditText = (EditText) findViewById(R.id.urlEditTextLegacyGateway);
        legacyGatewayEditText.setText("http://jira.fiberlink.com");
        legacyGatewayOpenURL.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {
                Thread t = new Thread(new Runnable() {

                    @Override
                    public void run()
                    {

                        MaaS360SecureHttpClient client = new MaaS360SecureHttpClient();
                        String requestUrl = legacyGatewayEditText.getText().toString();
                        HttpGet httpget = new HttpGet(requestUrl);

                        try {
                            MaaS360SDK.getEnterpriseGatewayService().proxy(client);
                            HttpResponse rsp = client.execute(httpget);
                            updateTextView(legacyGatewayOpenURLResponse, getString(R.string.response)
                                    + rsp.getStatusLine().getStatusCode());
                            logMessage("Response : " + rsp.getStatusLine().getStatusCode());
                        }
                        catch (MaaS360SDKNotActivatedException e) {
                            updateTextView(legacyGatewayOpenURLResponse, getString(R.string.response)
                                    + "SDK Not Activated");
                            logMessage("Legacy Gateway: Open URL: SDK Not Activated");
                            Maas360Logger.e(LOG_TAG, e);
                        }
                        catch (ClientProtocolException e) {
                            updateTextView(legacyGatewayOpenURLResponse, getString(R.string.response)
                                    + "ClientProtocolException");
                            logMessage("Legacy Gateway: Open URL: ClientProtocolException");
                            Maas360Logger.e(LOG_TAG, e);
                        }
                        catch (IOException e) {
                            updateTextView(legacyGatewayOpenURLResponse, getString(R.string.response) + "IOException");
                            logMessage("Legacy Gateway: Open URL: IOException");
                            Maas360Logger.e(LOG_TAG, e);
                        }
                    }
                });

                t.start();

                /*
                 * Intent intent = new Intent(MainActivity.this, IntranetSiteLoaderActivity.class);
                 * startActivity(intent);
                 */
            }
        });

        Button connectMaaS360Gateway = (Button) findViewById(R.id.connectMaaS360Gateway);
        connectMaaS360Gateway.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {

                try {
                    showGatewayConnectingProgress();
                    IEnterpriseGatewayService enterpriseGatewayService = MaaS360SDK.getEnterpriseGatewayService();
                    enterpriseGatewayService.connect();
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

        Button shouldProxyUrl = (Button) findViewById(R.id.maaS360GatewayShouldProxyURL);
        shouldProxyUrl.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {
                EditText url = (EditText) findViewById(R.id.urlEditTextMaaS360Gateway);
                String requestUrl = url.getText().toString();
                try {
                    IEnterpriseGatewayService enterpriseGatewayService = MaaS360SDK.getEnterpriseGatewayService();
                    boolean shouldProxy = enterpriseGatewayService.shouldProxy(requestUrl);
                    logMessage("Should Proxy: " + shouldProxy);
                }
                catch (MaaS360SDKNotActivatedException e) {
                    logMessage("MaaS360 SDK not activated");
                    hideGatewayConnectingProgress();
                }
            }
        });

        Button maaS360GatewayOpenUrl = (Button) findViewById(R.id.maas360GatewayOpenURL);
        maaS360GatewayOpenUrl.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {
                Thread t = new Thread(new Runnable() {

                    @Override
                    public void run()
                    {
                        EditText url = (EditText) findViewById(R.id.urlEditTextMaaS360Gateway);

                        String requestUrl = url.getText().toString();
                        if (TextUtils.isEmpty(requestUrl)) {
                            updateTextView(maas360GatewayOpenURLResponse, getString(R.string.response) + "URL is empty!");
                            logMessage("URL is empty!");
                            return;
                        }

                        MaaS360SecureHttpClient client = new MaaS360SecureHttpClient();
                        HttpGet httpget = new HttpGet(requestUrl);

                        try {
                            MaaS360SDK.getEnterpriseGatewayService().proxy(client);
                            HttpResponse rsp = client.execute(httpget);
                            updateTextView(maas360GatewayOpenURLResponse, getString(R.string.response)
                                    + rsp.getStatusLine().getStatusCode());
                            logMessage("Response : " + rsp.getStatusLine().getStatusCode());
                        }
                        catch (MaaS360SDKNotActivatedException e) {
                            updateTextView(maas360GatewayOpenURLResponse, getString(R.string.response)
                                    + "SDK Not Activated");
                            logMessage("MaaS360 Gateway: Open URL: SDK Not Activated");
                            Maas360Logger.e(LOG_TAG, e);
                        }
                        catch (ClientProtocolException e) {
                            updateTextView(maas360GatewayOpenURLResponse, getString(R.string.response)
                                    + "ClientProtocolException");
                            logMessage("MaaS360 Gateway: Open URL: ClientProtocolException");
                            Maas360Logger.e(LOG_TAG, e);
                        }
                        catch (IOException e) {
                            updateTextView(maas360GatewayOpenURLResponse, getString(R.string.response) + "IOException");
                            logMessage("MaaS360 Gateway: Open URL: IOException");
                            Maas360Logger.e(LOG_TAG, e);
                        }
                    }
                });

                t.start();
            }
        });

        Button openSecureViewer = (Button) findViewById(R.id.viewInSecureViewer);
        openSecureViewer.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {
                Uri uri = Uri.fromFile(new File(Environment.getExternalStorageDirectory().getAbsolutePath()
                        + File.separator + "TestFile.txt"));

                try {
                    MaaS360SDK.viewDocument(getApplicationContext(), uri);
                }
                catch (MaaS360SDKNotActivatedException e) {
                }
            }
        });

        Button editSecureEditor = (Button) findViewById(R.id.openSecureEditor);
        editSecureEditor.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {
                Uri uri = Uri.fromFile(new File(Environment.getExternalStorageDirectory().getAbsolutePath()
                        + File.separator + "TestFile.txt"));

                try {
                    MaaS360SDK.editDocument(getApplicationContext(), uri);
                }
                catch (MaaS360SDKNotActivatedException e) {
                }
            }
        });

        Button saveToDocstore = (Button) findViewById(R.id.saveToDocstore);
        saveToDocstore.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {
                Uri uri = Uri.fromFile(new File(Environment.getExternalStorageDirectory().getAbsolutePath()
                        + File.separator + "TestFile.txt"));

                try {
                    MaaS360SDK.saveDocumentToDocStore(getApplicationContext(), uri);
                }
                catch (MaaS360SDKNotActivatedException e) {
                }
            }
        });

        Button docViewIntent = (Button) findViewById(R.id.viewIntent);
        docViewIntent.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {
                File file = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator
                        + "TestFile.txt");
                if (!file.exists()) {
                    Toast.makeText(MainActivity.this, R.string.file_does_not_exist, Toast.LENGTH_SHORT).show();
                    return;
                }
                Intent intent = new Intent(Intent.ACTION_VIEW);
                Uri contentUri = Uri.fromFile(file);

                String extension = MimeTypeMap.getFileExtensionFromUrl(file.getAbsolutePath());
                String mimeType = MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
                intent.setDataAndType(contentUri, mimeType);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                getApplicationContext().startActivity(intent);
            }
        });

        Button docEditIntent = (Button) findViewById(R.id.editIntent);
        docEditIntent.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {
                File file = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator
                        + "TestFile.txt");
                if (!file.exists()) {
                    Toast.makeText(MainActivity.this, R.string.file_does_not_exist, Toast.LENGTH_SHORT).show();
                    return;
                }
                Intent intent = new Intent(Intent.ACTION_EDIT);
                Uri contentUri = Uri.fromFile(file);

                String extension = MimeTypeMap.getFileExtensionFromUrl(file.getAbsolutePath());
                String mimeType = MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
                intent.setDataAndType(contentUri, mimeType);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);
            }
        });


        final EditText encEditText = (EditText) findViewById(R.id.encryptionTestEdit);

        Button encryptionTest = (Button) findViewById(R.id.encryptionTest);

        encryptionTest.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View v)
            {
//                try {
//                    String strToEncrypt = encEditText.getText().toString();
//                    if (TextUtils.isEmpty(strToEncrypt)) {
//                        logMessage("Empty text, skip encryption");
//                        return;
//                    }
//
//                    logMessage("Encryption Test : ");
//                    logMessage("\n EncryptionHelper : \n String used : " + strToEncrypt);
//                    logMessage("\n Encrypted String : " + EncryptionAPIs.encryptionHelperEncrypt(strToEncrypt));
//                    logMessage("\n Decrypt the string : " + EncryptionAPIs.encryptionHelperDecrypt(strToEncrypt));
//
//                    logMessage("\n Encrypted String, MaaSKeyManagement : "
//                            + EncryptionAPIs.encryptionHelperMaaSKeyManagementEncrypt(strToEncrypt));
//                    logMessage("\n Decrypt the string, MaaSKeyManagement : "
//                            + EncryptionAPIs.encryptionHelperMaaSKeyManagementDecrypt(strToEncrypt));
//
//                    // ECB Encryption
//                    logMessage("\n ECB File Encryption : \n "
//                            + EncryptionAPIs.maasSecureOutputStreamECBEncryption(strToEncrypt, false));
//
//                    logMessage("\n ECB File Decryption : \n Reading encrypted data from file : "
//                            + EncryptionAPIs.maasSecureInputStreamECBEncryption(strToEncrypt, false));
//
//                    logMessage("\n ECB File Encryption, MaaSKeyManagement : \n "
//                            + EncryptionAPIs.maasSecureOutputStreamECBEncryption(strToEncrypt, true));
//
//                    logMessage("\n ECB File Decryption, MaaSKeyManagement : \n Reading encrypted data from file : "
//                            + EncryptionAPIs.maasSecureInputStreamECBEncryption(strToEncrypt, true));
//
//                    // CBC Encryption
//                    logMessage("\n CBC File Encryption : \n "
//                            + EncryptionAPIs.maasSecureOutputStreamCBCEncryption(strToEncrypt, false));
//
//                    logMessage("\n CBC File Decryption : \n Reading encrypted data from file :  "
//                            + EncryptionAPIs.maasSecureInputStreamCBCEncryption(strToEncrypt, false));
//
//                    // CBC Encryption
//                    logMessage("\n CBC File Encryption, MaaSKeyManagement : \n "
//                            + EncryptionAPIs.maasSecureOutputStreamCBCEncryption(strToEncrypt, true));
//
//                    logMessage("\n CBC File Decryption, MaaSKeyManagement : \n Reading encrypted data from file :  "
//                            + EncryptionAPIs.maasSecureInputStreamCBCEncryption(strToEncrypt, true));
//                }
//                catch (Exception e) {
//                    logMessage("Exception in encryption :" + e.getMessage());
//                }

            }
        });

        final EditText enterBbDataText = (EditText) findViewById(R.id.addDataField);
        Button databaseTextButton = (Button) findViewById(R.id.addDataDB);

        databaseTextButton.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View v)
            {
//                EncryptionAPIs.createEncrypteDB();
//                String text = enterBbDataText.getText().toString();
//                if (!TextUtils.isEmpty(text)) {
//                    EncryptionAPIs.addDataToDB(text);
//                }
            }
        });

        Button getDBData = (Button) findViewById(R.id.getDataFromDB);

        getDBData.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View v)
            {
//                List<String> values = EncryptionAPIs.getDBData();
//                if (null == values) {
//                    logMessage("Empty database!");
//                    return;
//                }
//                logMessage("DB data : \n");
//                for (String val : values) {
//                    logMessage(val + "\n");
//                }
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

        Button readLogButton = (Button) findViewById(R.id.sdkLogFile);
        readLogButton.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {

//                Intent intent = new Intent(MainActivity.this, SDKLogActivity.class);
//                startActivity(intent);

            }
        });

        Button openExportChooser = (Button) findViewById(R.id.openWhiteListedApps);
        openExportChooser.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {

                Intent sourceIntent = new Intent(Intent.ACTION_VIEW);
                File fileToView = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator
                        + "TestFile.txt");
                sourceIntent.setDataAndType(Uri.fromFile(fileToView), "text/plain");

                Intent intent = MaaS360DLPSDKUtils.createChooser("Open With", sourceIntent);
                if (null == intent) {
                    logMessage("No white listed app to open the requested file.");
                }
                else {
                    startActivity(intent);
                }

            }
        });

        Button opeWithWhitelist = (Button) findViewById(R.id.startActivtyWithWhitelist);
        opeWithWhitelist.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {

                Intent sourceIntent = new Intent(Intent.ACTION_VIEW);
                File fileToView = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator
                        + "TestFile.txt");
                sourceIntent.setDataAndType(Uri.fromFile(fileToView), "text/plain");

                startActivity(sourceIntent);

            }
        });

        try {
            containerLockBox = (TextView) findViewById(R.id.containerLockText);
            containerLockBox.setText(MaaS360SDK.hasSSOTimerExpired() ? CONTAINER_LOCKED : CONTAINER_UNLOCKED);

            hasSSOExpiredText = (TextView) findViewById(R.id.hasSSOExpiredText);
            hasSSOExpiredText.setText(String.valueOf(MaaS360SDK.hasSSOTimerExpired()));
            Button refreshTimer = (Button) findViewById(R.id.refreshHasTimerExpired);
            refreshTimer.setOnClickListener(new OnClickListener() {

                @Override
                public void onClick(View v)
                {
                    try {
                        hasSSOExpiredText.setText(String.valueOf(MaaS360SDK.hasSSOTimerExpired()));
                    }
                    catch (MaaS360SDKNotActivatedException e) {
                        Maas360Logger.e("MaaSSDKSampleApp", e);
                    }
                }
            });
        }
        catch (MaaS360SDKNotActivatedException e) {
            Maas360Logger.e("MaaSSDKSampleApp", e);
        }

        Button addNotification = (Button) findViewById(R.id.addNotification);

        addNotification.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View v)
            {
            	NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
                notificationManager.notify(++notification_id, generateNotification());

            }
        });
    }

    private void showGatewayConnectingProgress()
    {
        mProgressDialog = new ProgressDialog(this);
        mProgressDialog.setTitle("Connecting to Gateway");
        mProgressDialog.setMessage("Connecting...");
        mProgressDialog.setCancelable(false);
        mProgressDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
        mProgressDialog.show();
    }

    private void hideGatewayConnectingProgress()
    {
        if (mProgressDialog != null) {
            mProgressDialog.dismiss();
        }
    }

    @Override
    protected void onResume()
    {
        super.onResume();

        if (!MaaS360SDK.isSDKActivated()) {
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

        if (!MaaS360SDK.isSDKActivated()) {
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
        case STATE_CONNECTED:
            logMessage("Gateway connected");
            break;
        case STATE_DISCONNECTED:
            logMessage("Gateway disconnected");
            break;
        case STATE_FAILED_AUTH:
            logMessage("Gateway failed auth");
            break;
        case STATE_FAILED_NO_CONNECTION:
            logMessage("Gateway connection failed");
            break;
        case STATE_REQUEST_TIMED_OUT:
            logMessage("Gateway connection timed out");
            break;
        case STATE_FAILED_BLOCKED:
            logMessage("Gateway connection failed. Device blocked.");
            break;
        case STATE_CONNECTING:
            logMessage("Gateway connecting...");
            break;
        case STATE_CANCELLED:
            logMessage("Gateway connection cancelled");
            break;
        case STATE_FAILED_TIMESTAMP:
            logMessage("Gateway connection failed as device time is invalid");
            break;
        }

        if (newState != EnterpriseGatewayServiceState.STATE_CONNECTING) {
            hideGatewayConnectingProgress();
        }
        updateGatewayStatus(newState);
    }

    public boolean isInForeground()
    {
        return isInForeground;
    }

    private void updateTextView(final TextView textView, final String message)
    {
        runOnUiThread(new Runnable() {
            @Override
            public void run()
            {
                textView.setText(message);
            }
        });
    }

    public void logMessage(final String text)
    {
        if (TextUtils.isEmpty(text)) {
            return;
        }

        runOnUiThread(new Runnable() {
            @Override
            public void run()
            {
                logView.append(text);
                logView.append("\n\n");
            }
        });
    }

    public void updatePoliciesonUI()
    {
        runOnUiThread(new Runnable() {
            @Override
            public void run()
            {
                try {
                    selectedWhiteAppsVal.setText("");
                    for (String app : MaaS360SDK.getPolicy().getWhiteListedApps()) {
                        selectedWhiteAppsVal.append("\n     " + app);
                    }
                }
                catch (MaaS360SDKNotActivatedException e1) {
                    logMessage("SDK not activated.");
                    return;
                }
                // Set the initial values
                restrictScreenShotVal.setText(MaaS360DLPSDK.getInstance().isRestrictScreenshot() ? " Yes" : " No");
                restrictCopyPasteVal.setText(MaaS360DLPSDK.getInstance().isRestrictCopyPaste() ? " Yes" : " No");
                restrictExportVal.setText(MaaS360DLPSDK.getInstance().isRestrictExport() ? " Yes" : " No");
            }
        });
    }

    private void updateGatewayStatus()
    {
        EnterpriseGatewayServiceState state = null;
        try {
            state = MaaS360SDK.getEnterpriseGatewayService().getState();
        }
        catch (MaaS360SDKEnterpriseGatewayNotEnabledException e) {
            Maas360Logger.e(LOG_TAG, "updateGatewayStatus : MaaS360SDKEnterpriseGatewayNotEnabledException.");
        }
        catch (MaaS360SDKNotActivatedException e) {
            Maas360Logger.e(LOG_TAG, "updateGatewayStatus : MaaS360SDKEnterpriseGatewayNotEnabledException.");
        }
        updateGatewayStatus(state);
    }

    private void updateGatewayStatus(final EnterpriseGatewayServiceState state)
    {
        runOnUiThread(new Runnable() {
            @Override
            public void run()
            {
                gatewayStateValue.setText(state == null ? "Null!!" : state.toString());
            }
        });
    }

    private Notification generateNotification()
    {
        Intent intent = new Intent(getApplicationContext(), NotificationActivity.class);
        PendingIntent contentIntent = PendingIntent.getActivity(getApplicationContext(), 1, intent,
                PendingIntent.FLAG_UPDATE_CURRENT);
        NotificationCompat.Builder builder = new NotificationCompat.Builder(getApplicationContext());
        builder.setContentTitle("Content title " + notification_id).setContentIntent(contentIntent)
                .setDeleteIntent(null).setSmallIcon(getApplicationInfo().icon)
                .setTicker("Ticker text" + notificationStr + notification_id);

        Notification blockingNotification = new NotificationCompat.InboxStyle(builder).build();
        return blockingNotification;
    }

    public static MainActivity getActivity()
    {
        return mActivity;
    }
}
