package com.fiberlink.maas360.android.appSdkSampleApp;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.fiberlink.maas360sdk.external.MaaS360SDK;
import com.HelcMES.R;

public class InitializeSDKActivity extends Activity
{

    private TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.initializesdk_layout);
        textView = (TextView) findViewById(R.id.textView);
        
        if (MaaS360SDK.isSDKActivated()) {
            logMessage("SDK already activated");
            Intent intent = new Intent(MainApplication.getApplication().getApplicationContext(),
                    MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            MainApplication.getApplication().getApplicationContext().startActivity(intent);
            finish();
            return;
        }

//       ActivityUtils.setAutoEnforceView(this);

        Button initButton = (Button) findViewById(R.id.init_button);
        initButton.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v)
            {

                if (!MaaS360SDK.isSDKActivated()) {
                    logMessage("Activating SDK.");
                    new ActivatorTask(InitializeSDKActivity.this, PolicyAutoEnforceInfo.getInstance()).execute();
                }
                else {
                    logMessage("SDK already activated");
                    Intent intent = new Intent(MainApplication.getApplication().getApplicationContext(),
                            MainActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    MainApplication.getApplication().getApplicationContext().startActivity(intent);
                    return;
                }

                logMessage("Activating MaaS360SDK version " + MaaS360SDK.getSDKVersion() + "...");

            }
        });
    }

    public void logMessage(final String text)
    {
        if (TextUtils.isEmpty(text)) return;

        runOnUiThread(new Runnable() {
            @Override
            public void run()
            {
                textView.append(text);
                textView.append("\n\n");
            }
        });
    }
}
